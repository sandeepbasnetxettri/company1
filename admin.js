/**
 * SKB T-Shirt Printing Dumkibas — Admin Dashboard Frontend Engine
 * Location: Dumkibas, Nawalparasi, Nepal
 */

// Global State
let currentAdminView = 'dashboard';
let currentAdminUser = null;
let isFirstLoginEnforced = false;
let allOrdersCache = [];
let allProductsCache = [];
let salesChartInstance = null;
let statusChartInstance = null;

// 31 Real Dumkibas Workshop Gallery Photos Map
const GALLERY_ITEMS_DATA = [
  { id: 1, img: "image/1.jpg", cat: "streetwear", title: "Cyber Graphic Streetwear Tee", tag: "DTF Print" },
  { id: 2, img: "image/2.jpg", cat: "couple", title: "King & Queen Couple Pair", tag: "Couple Special" },
  { id: 3, img: "image/3.jpg", cat: "photo", title: "HD Portrait Photo Print", tag: "Photo Print" },
  { id: 4, img: "image/4.jpg", cat: "streetwear", title: "Vintage Oversized Anime Graphic", tag: "Oversized" },
  { id: 5, img: "image/5.jpg", cat: "events", title: "Birthday Milestone 2000s Edition", tag: "Birthday" },
  { id: 6, img: "image/6.jpg", cat: "nepali", title: "Nepali Typography Devanagari", tag: "Nepali Pride" },
  { id: 7, img: "image/7.jpg", cat: "streetwear", title: "Monochrome Black Heavy Cotton", tag: "Bio-Washed" },
  { id: 8, img: "image/8.jpg", cat: "events", title: "Football Tournament Jersey Tee", tag: "Sports Event" },
  { id: 9, img: "image/9.jpg", cat: "photo", title: "Family Photo Memory Print", tag: "Custom Photo" },
  { id: 10, img: "image/10.jpg", cat: "couple", title: "Matching Aesthetic Heartbeat", tag: "Couple" },
  { id: 11, img: "image/11.jpg", cat: "streetwear", title: "Himalayan Outdoor Adventure Tee", tag: "Streetwear" },
  { id: 12, img: "image/12.jpg", cat: "nepali", title: "Buddha Was Born In Nepal Print", tag: "Nepali Pride" },
  { id: 13, img: "image/13.jpg", cat: "events", title: "College IT Festival Committee Tee", tag: "Bulk Event" },
  { id: 14, img: "image/14.jpg", cat: "streetwear", title: "Retro Typography Skull Tee", tag: "Streetwear" },
  { id: 15, img: "image/15.jpg", cat: "photo", title: "Pet Memorial HD Print", tag: "Custom Photo" },
  { id: 16, img: "image/16.jpg", cat: "couple", title: "Mr & Mrs Matching Hoodies", tag: "Couple" },
  { id: 17, img: "image/17.jpg", cat: "streetwear", title: "Minimalist Left Chest Logo", tag: "Pocket Print" },
  { id: 18, img: "image/18.jpg", cat: "nepali", title: "Bir Gorkhali Traditional Crest", tag: "Nepali Pride" },
  { id: 19, img: "image/19.jpg", cat: "events", title: "Youth Club Dumkibas Volunteer Tee", tag: "Community" },
  { id: 20, img: "image/20.jpg", cat: "streetwear", title: "Dark Acid Wash Streetwear", tag: "Streetwear" },
  { id: 21, img: "image/21.jpg", cat: "couple", title: "Soulmate Matching Minimal Tee", tag: "Couple" },
  { id: 22, img: "image/22.jpg", cat: "photo", title: "Anniversary Photo Collage Print", tag: "Photo Print" },
  { id: 23, img: "image/23.jpg", cat: "streetwear", title: "Tokyo Vaporwave Cyberpunk", tag: "Streetwear" },
  { id: 24, img: "image/24.jpg", cat: "nepali", title: "Namaste Traditional Script Tee", tag: "Nepali Pride" },
  { id: 25, img: "image/25.jpg", cat: "events", title: "Music Band Tour Concert Tee", tag: "Band Merch" },
  { id: 26, img: "image/26.jpg", cat: "streetwear", title: "Graffiti Spray Art Typography", tag: "Streetwear" },
  { id: 27, img: "image/27.jpg", cat: "couple", title: "His Queen & Her King Crown Set", tag: "Couple" },
  { id: 28, img: "image/28.jpg", cat: "events", title: "Dumkibas Marathon Finisher Tee", tag: "Event Sports" },
  { id: 29, img: "image/29.jpg", cat: "photo", title: "High-Contrast Monochrome Portrait", tag: "Photo Print" },
  { id: 30, img: "image/30.jpg", cat: "streetwear", title: "Oversized Boxy Dropped Shoulder", tag: "Oversized" },
  { id: 31, img: "image/31.jpg", cat: "nepali", title: "Nepal Flag Geometric Crest", tag: "Nepali Pride" }
];

// ===========================================================================
// 0. RESILIENT ADMIN API ENGINE
// ===========================================================================
async function adminApiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const token = localStorage.getItem('skb_admin_token') || '';

  const headers = {
    ...(options.headers || {})
  };
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const reqOptions = {
    ...options,
    headers,
    credentials: 'omit'
  };

  // 1. Try relative endpoint first if not file:
  if (typeof window !== 'undefined' && window.location && window.location.protocol !== 'file:') {
    try {
      const res = await fetch(cleanEndpoint, reqOptions);
      const cType = res.headers.get('content-type') || '';
      if (res.ok || (res.status < 500 && cType.includes('application/json'))) {
        return res;
      }
    } catch (e) {}
  }

  // 2. Direct Fallback to Node.js Backend Server at http://localhost:3000
  const localBackendUrl = `http://localhost:3000${cleanEndpoint}`;
  return fetch(localBackendUrl, reqOptions);
}

// ===========================================================================
// 1. INITIALIZATION & SESSION VERIFICATION
// ===========================================================================
document.addEventListener('DOMContentLoaded', () => {
  verifyAdminSession();
  initSidebarNavigation();
  initEventListeners();
});

async function verifyAdminSession() {
  try {
    const res = await adminApiFetch('/api/admin/verify');
    if (res.ok) {
      const data = await res.json();
      currentAdminUser = data.username;
      document.getElementById('sidebarAdminEmail').textContent = data.username;
      document.getElementById('accAdminUsername').textContent = data.username;

      if (data.isFirstLogin) {
        // Enforce password change
        isFirstLoginEnforced = true;
        document.getElementById('firstLoginModal').style.display = 'flex';
      } else {
        showAdminApp();
      }
    } else {
      showLoginScreen();
    }
  } catch (err) {
    showLoginScreen();
  }
}

function showLoginScreen() {
  document.getElementById('adminLoginScreen').style.display = 'flex';
  document.getElementById('adminAppLayout').style.display = 'none';
  document.getElementById('firstLoginModal').style.display = 'none';
}

function showAdminApp() {
  document.getElementById('adminLoginScreen').style.display = 'none';
  document.getElementById('firstLoginModal').style.display = 'none';
  document.getElementById('adminAppLayout').style.display = 'flex';
  switchView('dashboard');
}

// ===========================================================================
// 2. ADMIN AUTHENTICATION HANDLERS
// ===========================================================================
async function handleAdminLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPassword');
  const errorMsg = document.getElementById('loginErrorMsg');
  const submitBtn = document.getElementById('loginSubmitBtn');

  errorMsg.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Verifying Credentials...';

  try {
    const res = await adminApiFetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: emailInput.value.trim(),
        password: passInput.value
      })
    });

    const data = await res.json();

    if (res.ok && data.success) {
      if (data.token) {
        localStorage.setItem('skb_admin_token', data.token);
      }
      if (data.isFirstLogin) {
        document.getElementById('adminLoginScreen').style.display = 'none';
        document.getElementById('firstLoginModal').style.display = 'flex';
        isFirstLoginEnforced = true;
      } else {
        showToast('Login successful! Welcome back.', 'success');
        showAdminApp();
      }
    } else {
      errorMsg.textContent = data.error || 'Invalid username or password.';
      errorMsg.style.display = 'block';
    }
  } catch (err) {
    errorMsg.textContent = 'Server connection error. Please try again.';
    errorMsg.style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '🔐 Log In to Dashboard';
  }
}

async function handleForcePasswordChange(e) {
  e.preventDefault();
  const newPass = document.getElementById('newAdminPassword').value;
  const confirmPass = document.getElementById('confirmAdminPassword').value;
  const errorMsg = document.getElementById('changePassErrorMsg');
  const btn = document.getElementById('saveNewPasswordBtn');

  if (newPass !== confirmPass) {
    errorMsg.textContent = 'Passwords do not match.';
    errorMsg.style.display = 'block';
    return;
  }
  if (newPass.length < 6) {
    errorMsg.textContent = 'Password must be at least 6 characters.';
    errorMsg.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Updating Password...';

  try {
    const res = await adminApiFetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword: newPass })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Permanent password set successfully! Welcome to SKB Admin.', 'success');
      document.getElementById('firstLoginModal').style.display = 'none';
      isFirstLoginEnforced = false;
      showAdminApp();
    } else {
      errorMsg.textContent = data.error || 'Failed to update password.';
      errorMsg.style.display = 'block';
    }
  } catch (err) {
    errorMsg.textContent = 'Server error during password update.';
    errorMsg.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = '✅ Update Password & Enter Dashboard';
  }
}

async function handleChangePassword(e) {
  e.preventDefault();
  const currentPass = document.getElementById('accCurrentPassword').value;
  const newPass = document.getElementById('accNewPassword').value;
  const confirmPass = document.getElementById('accConfirmPassword').value;
  const errorMsg = document.getElementById('accPassErrorMsg');
  const btn = document.getElementById('updatePasswordSubmitBtn');

  if (newPass !== confirmPass) {
    errorMsg.textContent = 'New passwords do not match.';
    errorMsg.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Updating...';

  try {
    const res = await adminApiFetch('/api/admin/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Admin password updated successfully!', 'success');
      errorMsg.style.display = 'none';
      document.getElementById('changeAdminPasswordForm').reset();
    } else {
      errorMsg.textContent = data.error || 'Failed to update password.';
      errorMsg.style.display = 'block';
    }
  } catch (err) {
    errorMsg.textContent = 'Network error while updating password.';
    errorMsg.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Update Password';
  }
}

async function handleAdminLogout() {
  try {
    await adminApiFetch('/api/admin/logout', { method: 'POST' });
  } catch (e) {}
  localStorage.removeItem('skb_admin_token');
  showToast('Logged out safely.', 'info');
  showLoginScreen();
}

// Password toggle helper
document.getElementById('togglePasswordBtn')?.addEventListener('click', () => {
  const passInput = document.getElementById('loginPassword');
  if (passInput) {
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  }
});

// ===========================================================================
// 3. NAVIGATION & VIEW SWITCHER
// ===========================================================================
function initSidebarNavigation() {
  const navBtns = document.querySelectorAll('.nav-item-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (view) switchView(view);
    });
  });

  // Mobile drawer controls
  const toggleBtn = document.getElementById('sidebarToggleBtn');
  const closeBtn = document.getElementById('sidebarCloseBtn');
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');

  const toggleSidebar = (open) => {
    if (sidebar && overlay) {
      if (open) {
        sidebar.classList.add('open');
        overlay.classList.add('active');
      } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      }
    }
  };

  if (toggleBtn) toggleBtn.addEventListener('click', () => toggleSidebar(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleSidebar(false));
  if (overlay) overlay.addEventListener('click', () => toggleSidebar(false));
}

function switchView(viewName) {
  currentAdminView = viewName;

  // Update Nav links active state
  document.querySelectorAll('.nav-item-btn').forEach(btn => {
    if (btn.dataset.view === viewName) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // Show Active View Container
  document.querySelectorAll('.admin-view').forEach(view => {
    view.classList.remove('active');
  });
  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  // Update Topbar Title
  const titles = {
    dashboard: 'Dashboard Overview',
    orders: 'Orders Management',
    products: 'Product Catalog',
    'custom-requests': 'Custom Studio Requests',
    customers: 'Customer Directory',
    gallery: 'Dumkibas Print Gallery',
    settings: 'Website Configuration',
    account: 'Admin Security'
  };
  document.getElementById('pageTitleHeading').textContent = titles[viewName] || 'Admin Dashboard';

  // Close mobile sidebar if open
  document.getElementById('adminSidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('active');

  // Load View Data
  switch (viewName) {
    case 'dashboard': loadDashboardData(); break;
    case 'orders': loadOrdersData(); break;
    case 'products': loadProductsData(); break;
    case 'custom-requests': loadCustomRequestsData(); break;
    case 'customers': loadCustomersData(); break;
    case 'gallery': renderGalleryGrid(); break;
    case 'settings': loadSettingsData(); break;
    case 'account': break;
  }
}

function refreshCurrentView() {
  switchView(currentAdminView);
  showToast('Refreshed data.', 'info');
}

// ===========================================================================
// 4. VIEW 1: DASHBOARD ANALYTICS & STATS
// ===========================================================================
async function loadDashboardData() {
  try {
    const res = await adminApiFetch('/api/admin/stats');
    if (!res.ok) return;
    const stats = await res.json();

    // Update KPI numbers
    document.getElementById('kpiTotalSales').textContent = `Rs. ${(stats.totalSales || 0).toLocaleString()}`;
    document.getElementById('kpiTotalOrders').textContent = stats.totalOrders || 0;
    document.getElementById('kpiPendingOrders').textContent = stats.pendingOrders || 0;
    document.getElementById('kpiShippedOrders').textContent = stats.shippedOrders || 0;
    document.getElementById('kpiDeliveredOrders').textContent = stats.deliveredOrders || 0;
    document.getElementById('kpiTotalProducts').textContent = stats.totalProducts || 0;
    document.getElementById('kpiLowStockText').textContent = `${stats.lowStockProducts || 0} low stock items`;

    // Badges in sidebar
    const pendingBadge = document.getElementById('pendingOrdersBadge');
    if (stats.pendingOrders > 0) {
      pendingBadge.textContent = stats.pendingOrders;
      pendingBadge.style.display = 'inline-block';
    } else {
      pendingBadge.style.display = 'none';
    }

    const customBadge = document.getElementById('pendingCustomBadge');
    if (stats.customPendingCount > 0) {
      customBadge.textContent = stats.customPendingCount;
      customBadge.style.display = 'inline-block';
    } else {
      customBadge.style.display = 'none';
    }

    // Render Charts
    renderSalesChart(stats.chartData || []);
    renderStatusDonutChart(stats);

    // Load recent orders table
    const ordersRes = await adminApiFetch('/api/orders');
    if (ordersRes.ok) {
      const orders = await ordersRes.json();
      renderDashboardRecentOrders(orders.slice(0, 6));
    }
  } catch (err) {
    console.error('Error loading dashboard stats:', err);
  }
}

function renderSalesChart(dataPoints) {
  const ctx = document.getElementById('salesTrendsChart');
  if (!ctx) return;

  if (salesChartInstance) salesChartInstance.destroy();

  const labels = dataPoints.length > 0 ? dataPoints.map(d => d.date) : ['Today'];
  const sales = dataPoints.length > 0 ? dataPoints.map(d => d.sales) : [0];

  salesChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Sales Revenue (Rs.)',
        data: sales,
        borderColor: '#E63946',
        backgroundColor: 'rgba(230, 57, 70, 0.15)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#FFFFFF',
        pointBorderColor: '#E63946',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#94A3B8' } }
      },
      scales: {
        x: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.05)' } }
      }
    }
  });
}

function renderStatusDonutChart(stats) {
  const ctx = document.getElementById('orderStatusChart');
  if (!ctx) return;

  if (statusChartInstance) statusChartInstance.destroy();

  statusChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      datasets: [{
        data: [
          stats.pendingOrders || 0,
          stats.confirmedOrders || 0,
          stats.processingOrders || 0,
          stats.shippedOrders || 0,
          stats.deliveredOrders || 0,
          stats.cancelledOrders || 0
        ],
        backgroundColor: [
          '#F59E0B',
          '#3B82F6',
          '#8B5CF6',
          '#0EA5E9',
          '#10B981',
          '#EF4444'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#94A3B8', boxWidth: 12 } }
      },
      cutout: '70%'
    }
  });
}

function renderDashboardRecentOrders(orders) {
  const tbody = document.getElementById('dashboardRecentOrdersTbody');
  if (!tbody) return;

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-3 text-muted">No orders found in database.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td data-label="Order ID"><strong>${o.id}</strong></td>
      <td data-label="Customer">
        <div><strong>${escapeHtml(o.customer.name)}</strong></div>
        <small class="text-muted">📞 ${o.customer.phone}</small>
      </td>
      <td data-label="Destination">
        <small>${escapeHtml(o.address.municipality || '')}, ${escapeHtml(o.address.district || '')}</small>
      </td>
      <td data-label="Items">${o.items.length} item(s)</td>
      <td data-label="Total"><strong>Rs. ${o.grandTotal.toLocaleString()}</strong></td>
      <td data-label="Status">${getStatusBadgeHtml(o.status)}</td>
      <td data-label="Date"><small class="text-muted">${formatDate(o.createdAt)}</small></td>
      <td data-label="Action">
        <button class="btn btn-secondary btn-sm" onclick="openOrderDetailsModal('${o.id}')">View</button>
      </td>
    </tr>
  `).join('');
}

// ===========================================================================
// 5. VIEW 2: ORDER MANAGEMENT
// ===========================================================================
let activeOrderStatusFilter = 'all';

async function loadOrdersData() {
  try {
    const res = await adminApiFetch('/api/orders');
    if (!res.ok) return;
    allOrdersCache = await res.json();
    renderOrdersTable();
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
}

function renderOrdersTable() {
  const tbody = document.getElementById('ordersTableBody');
  const emptyState = document.getElementById('emptyOrdersState');
  const searchVal = (document.getElementById('orderSearchInput')?.value || '').toLowerCase().trim();

  let filtered = allOrdersCache.filter(o => {
    const matchesStatus = activeOrderStatusFilter === 'all' || o.status === activeOrderStatusFilter;
    const matchesSearch = !searchVal ||
      o.id.toLowerCase().includes(searchVal) ||
      o.customer.name.toLowerCase().includes(searchVal) ||
      o.customer.phone.includes(searchVal) ||
      (o.address.formatted && o.address.formatted.toLowerCase().includes(searchVal));
    return matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  tbody.innerHTML = filtered.map(order => `
    <tr>
      <td data-label="Order ID">
        <strong>${order.id}</strong>
        <div class="mt-1"><span class="badge-cod">💵 COD Nepal</span></div>
      </td>
      <td data-label="Customer">
        <div><strong>${escapeHtml(order.customer.name)}</strong></div>
        <small class="text-muted">📞 ${order.customer.phone}</small>
        ${order.customer.email ? `<small class="text-muted d-block">✉️ ${escapeHtml(order.customer.email)}</small>` : ''}
      </td>
      <td data-label="Destination">
        <div style="max-width: 240px; font-size: 0.825rem;">
          ${escapeHtml(order.address.formatted || `${order.address.tole}, ${order.address.municipality}, ${order.address.district}`)}
        </div>
      </td>
      <td data-label="Items">
        <div><strong>${order.items.length} item(s)</strong></div>
        <small class="text-muted">${escapeHtml(order.items.map(it => `${it.name} (${it.size})`).join(', '))}</small>
      </td>
      <td data-label="Grand Total">
        <strong style="color: #10B981; font-size: 0.95rem;">Rs. ${order.grandTotal.toLocaleString()}</strong>
        <small class="text-muted d-block">Delivery: Rs. ${order.deliveryFee}</small>
      </td>
      <td data-label="Status">
        ${getStatusBadgeHtml(order.status)}
      </td>
      <td data-label="Date">
        <small class="text-muted">${formatDate(order.createdAt)}</small>
      </td>
      <td data-label="Actions">
        <div class="table-btn-group">
          <button class="btn btn-secondary btn-sm" onclick="openOrderDetailsModal('${order.id}')" title="Inspect Order & Change Status">
            👁️ Details
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteOrder('${order.id}')" title="Delete Order">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openOrderDetailsModal(orderId) {
  const order = allOrdersCache.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById('orderDetailsModal');
  const modalTitle = document.getElementById('orderModalTitle');
  const modalDate = document.getElementById('orderModalDate');
  const modalBody = document.getElementById('orderDetailsModalBody');

  modalTitle.textContent = `Order Details: ${order.id}`;
  modalDate.textContent = `Placed on ${new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}`;

  const itemsHtml = order.items.map(item => `
    <div class="order-item-row">
      <img src="${item.image || 'images/prod_black_graphic.jpg'}" class="prod-thumb" alt="${item.name}">
      <div class="flex-1">
        <strong>${escapeHtml(item.name)}</strong>
        <div style="font-size: 0.775rem; color: #94A3B8;">
          Size: <strong>${item.size}</strong> | Color: <strong>${item.color}</strong> | Qty: <strong>${item.quantity}</strong>
        </div>
        ${item.customText ? `<div style="font-size: 0.75rem; color: #FBBF24;">✨ Custom Text: "${escapeHtml(item.customText)}" (${item.placement || 'Front'})</div>` : ''}
      </div>
      <div style="font-weight: 700; color: #FFFFFF;">
        Rs. ${(item.price * item.quantity).toLocaleString()}
      </div>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <div class="order-modal-grid">
      <!-- Left Column: Customer & Delivery Address -->
      <div class="order-sec-box">
        <h4>1. Customer &amp; Delivery Destination</h4>
        <div class="order-detail-line"><strong>Name:</strong> ${escapeHtml(order.customer.name)}</div>
        <div class="order-detail-line"><strong>Phone:</strong> <a href="tel:${order.customer.phone}" class="text-blue">${order.customer.phone}</a></div>
        ${order.customer.email ? `<div class="order-detail-line"><strong>Email:</strong> ${escapeHtml(order.customer.email)}</div>` : ''}
        
        <div class="mt-3" style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.5rem;">
          <div class="order-detail-line"><strong>Province:</strong> ${escapeHtml(order.address.province)}</div>
          <div class="order-detail-line"><strong>District:</strong> ${escapeHtml(order.address.district)}</div>
          <div class="order-detail-line"><strong>Municipality / City:</strong> ${escapeHtml(order.address.municipality)}</div>
          <div class="order-detail-line"><strong>Ward No.:</strong> ${escapeHtml(order.address.ward)}</div>
          <div class="order-detail-line"><strong>Tole / Street:</strong> ${escapeHtml(order.address.tole)}</div>
        </div>

        ${order.notes ? `<div class="mt-2" style="background: rgba(245,158,11,0.1); padding: 0.5rem; border-radius: 4px; font-size: 0.8rem; color: #FBBF24;"><strong>Customer Note:</strong> ${escapeHtml(order.notes)}</div>` : ''}
      </div>

      <!-- Right Column: Status Updater & Payment -->
      <div class="order-sec-box">
        <h4>2. Update Status &amp; Tracking Note</h4>
        
        <div class="form-group">
          <label class="form-label" for="modalOrderStatusSelect">Order Status:</label>
          <select id="modalOrderStatusSelect" class="form-select">
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>⏳ Pending (Awaiting Review)</option>
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>📞 Confirmed (Verified with Customer)</option>
            <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>🖨️ Processing (Printing in Dumkibas)</option>
            <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>🚚 Shipped (Handed over to Courier)</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered (COD Cash Collected)</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="modalCourierNotesInput">Courier / Tracking Note:</label>
          <input type="text" id="modalCourierNotesInput" class="form-input" 
            placeholder="e.g. Sundar Express Pokhara AWB: PKH-88129" 
            value="${escapeHtml(order.courierNotes || '')}">
        </div>

        <button type="button" class="btn btn-primary btn-block" onclick="saveOrderStatusChanges('${order.id}')">
          💾 Save Status &amp; Notes
        </button>

        <div class="mt-3">
          <a href="https://wa.me/977${order.customer.phone}?text=${encodeURIComponent(`Namaste ${order.customer.name}! This is SKB T-Shirt Printing Dumkibas regarding your order ${order.id}. Current status: ${order.status}.`)}" 
             target="_blank" class="btn btn-secondary btn-block" style="background: #25D366; color: #FFFFFF;">
            💬 WhatsApp Customer Directly
          </a>
        </div>
      </div>
    </div>

    <!-- Items Breakdown -->
    <div class="order-sec-box mt-3">
      <h4>3. Ordered Products (${order.items.length})</h4>
      <div class="order-items-scroll">
        ${itemsHtml}
      </div>

      <div class="mt-3" style="display: flex; justify-content: flex-end; gap: 2rem; font-size: 0.9rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.75rem;">
        <div>Subtotal: <strong>Rs. ${order.subtotal.toLocaleString()}</strong></div>
        <div>Delivery: <strong>Rs. ${order.deliveryFee}</strong></div>
        <div style="font-size: 1.1rem; color: #10B981;">Grand Total (COD): <strong>Rs. ${order.grandTotal.toLocaleString()}</strong></div>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

function closeOrderModal() {
  document.getElementById('orderDetailsModal').style.display = 'none';
}

async function saveOrderStatusChanges(orderId) {
  const status = document.getElementById('modalOrderStatusSelect').value;
  const courierNotes = document.getElementById('modalCourierNotesInput').value.trim();

  try {
    const res = await adminApiFetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, courierNotes })
    });

    if (res.ok) {
      showToast(`Order ${orderId} updated to ${status}!`, 'success');
      closeOrderModal();
      loadOrdersData();
    } else {
      showToast('Failed to update status.', 'error');
    }
  } catch (err) {
    showToast('Network error updating status.', 'error');
  }
}

async function deleteOrder(orderId) {
  if (!confirm(`Are you sure you want to permanently delete order ${orderId}?`)) return;

  try {
    const res = await adminApiFetch(`/api/orders/${orderId}`, { method: 'DELETE' });
    if (res.ok) {
      showToast(`Order ${orderId} deleted.`, 'success');
      loadOrdersData();
    } else {
      showToast('Failed to delete order.', 'error');
    }
  } catch (err) {
    showToast('Network error deleting order.', 'error');
  }
}

// ===========================================================================
// 6. VIEW 3: PRODUCT CATALOG MANAGEMENT
// ===========================================================================
let activeProdCategory = 'all';

async function loadProductsData() {
  try {
    const res = await adminApiFetch('/api/products?admin=true');
    if (!res.ok) return;
    allProductsCache = await res.json();
    renderProductsTable();
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

function renderProductsTable() {
  const tbody = document.getElementById('productsTableBody');
  const searchVal = (document.getElementById('productSearchInput')?.value || '').toLowerCase().trim();

  let filtered = allProductsCache.filter(p => {
    const matchesCat = activeProdCategory === 'all' || p.category === activeProdCategory;
    const matchesSearch = !searchVal ||
      p.name.toLowerCase().includes(searchVal) ||
      (p.description && p.description.toLowerCase().includes(searchVal));
    return matchesCat && matchesSearch;
  });

  tbody.innerHTML = filtered.map(prod => `
    <tr>
      <td data-label="Product">
        <div class="prod-table-cell">
          <img src="${prod.image}" class="prod-thumb" alt="${prod.name}">
          <div class="prod-title-group">
            <strong>${escapeHtml(prod.name)}</strong>
            <small>${prod.badge || ''}</small>
          </div>
        </div>
      </td>
      <td data-label="Category">
        <span class="filter-btn btn-sm" style="background: rgba(255,255,255,0.05);">${prod.category}</span>
      </td>
      <td data-label="Price"><strong>Rs. ${prod.price.toLocaleString()}</strong></td>
      <td data-label="Discount">
        ${prod.discountPrice ? `<span class="text-muted" style="text-decoration: line-through;">Rs. ${prod.discountPrice}</span>` : '—'}
      </td>
      <td data-label="Stock">
        <span class="status-pill ${prod.stock > 10 ? 'delivered' : 'pending'}">${prod.stock} in stock</span>
      </td>
      <td data-label="Sizes & Colors">
        <div style="font-size: 0.75rem;">
          <div>Sizes: ${(prod.sizes || []).join(', ')}</div>
          <div>Colors: ${(prod.colors || []).map(c => c.name || c).join(', ')}</div>
        </div>
      </td>
      <td data-label="Featured">${prod.featured ? '⭐ Featured' : '—'}</td>
      <td data-label="Status">
        <span class="status-pill ${prod.active !== false ? 'delivered' : 'cancelled'}">
          ${prod.active !== false ? 'Active' : 'Inactive'}
        </span>
      </td>
      <td data-label="Actions">
        <div class="table-btn-group">
          <button class="btn btn-secondary btn-sm" onclick="openEditProductModal('${prod.id}')">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${prod.id}')">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddProductModal() {
  document.getElementById('prodEditId').value = '';
  document.getElementById('productModalTitle').textContent = 'Add New T-Shirt to Store';
  document.getElementById('productForm').reset();
  document.getElementById('productFormModal').style.display = 'flex';
}

function openEditProductModal(prodId) {
  const prod = allProductsCache.find(p => p.id === prodId);
  if (!prod) return;

  document.getElementById('prodEditId').value = prod.id;
  document.getElementById('productModalTitle').textContent = `Edit Product: ${prod.name}`;
  document.getElementById('prodName').value = prod.name;
  document.getElementById('prodCategory').value = prod.category;
  document.getElementById('prodPrice').value = prod.price;
  document.getElementById('prodDiscountPrice').value = prod.discountPrice || '';
  document.getElementById('prodStock').value = prod.stock || 50;
  document.getElementById('prodDescription').value = prod.description || '';
  document.getElementById('prodImageUrl').value = prod.image || '';
  document.getElementById('prodBadge').value = prod.badge || '';
  document.getElementById('prodFeatured').checked = !!prod.featured;
  document.getElementById('prodActive').checked = prod.active !== false;

  // Colors
  const colorsText = (prod.colors || []).map(c => typeof c === 'object' ? c.name : c).join(', ');
  document.getElementById('prodColorsInput').value = colorsText;

  // Sizes
  const sizes = prod.sizes || [];
  document.querySelectorAll('input[name="prodSizes"]').forEach(cb => {
    cb.checked = sizes.includes(cb.value);
  });

  document.getElementById('productFormModal').style.display = 'flex';
}

function closeProductModal() {
  document.getElementById('productFormModal').style.display = 'none';
}

async function handleProductFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('prodEditId').value;
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const price = Number(document.getElementById('prodPrice').value);
  const discountPrice = document.getElementById('prodDiscountPrice').value ? Number(document.getElementById('prodDiscountPrice').value) : null;
  const stock = Number(document.getElementById('prodStock').value);
  const description = document.getElementById('prodDescription').value.trim();
  let image = document.getElementById('prodImageUrl').value.trim();
  const badge = document.getElementById('prodBadge').value.trim();
  const featured = document.getElementById('prodFeatured').checked;
  const active = document.getElementById('prodActive').checked;

  const sizes = Array.from(document.querySelectorAll('input[name="prodSizes"]:checked')).map(cb => cb.value);
  const colors = document.getElementById('prodColorsInput').value.split(',').map(c => ({ name: c.trim(), hex: '#18181B' })).filter(c => c.name);

  // File upload check if file selected
  const fileInput = document.getElementById('prodImageFile');
  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const base64 = await toBase64(file);
    try {
      const upRes = await adminApiFetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, filename: file.name })
      });
      if (upRes.ok) {
        const upData = await upRes.json();
        image = upData.url;
      }
    } catch (e) {
      console.warn('Image upload error:', e);
    }
  }

  const payload = {
    name, category, price, discountPrice, stock, description, image, badge, featured, active, sizes, colors
  };

  try {
    let res;
    if (editId) {
      res = await adminApiFetch(`/api/products/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } else {
      res = await adminApiFetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    if (res.ok) {
      showToast(editId ? 'Product updated successfully!' : 'Product added to store catalog!', 'success');
      closeProductModal();
      loadProductsData();
    } else {
      showToast('Error saving product.', 'error');
    }
  } catch (err) {
    showToast('Network error saving product.', 'error');
  }
}

async function deleteProduct(prodId) {
  if (!confirm(`Are you sure you want to delete this product?`)) return;
  try {
    const res = await adminApiFetch(`/api/products/${prodId}`, { method: 'DELETE' });
    if (res.ok) {
      showToast('Product deleted.', 'success');
      loadProductsData();
    }
  } catch (err) {
    showToast('Error deleting product.', 'error');
  }
}

// ===========================================================================
// 7. VIEW 4: CUSTOM STUDIO REQUESTS
// ===========================================================================
let activeCustomFilter = 'all';

async function loadCustomRequestsData() {
  try {
    const res = await adminApiFetch('/api/custom-requests');
    if (!res.ok) return;
    const requests = await res.json();

    const tbody = document.getElementById('customRequestsTableBody');
    const emptyState = document.getElementById('emptyCustomState');

    let filtered = requests.filter(r => activeCustomFilter === 'all' || r.status === activeCustomFilter);

    if (filtered.length === 0) {
      tbody.innerHTML = '';
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    tbody.innerHTML = filtered.map(req => `
      <tr>
        <td data-label="Req ID"><strong>${req.id}</strong></td>
        <td data-label="Customer">
          <div><strong>${escapeHtml(req.customer.name)}</strong></div>
          <small class="text-muted">📞 ${req.customer.phone}</small>
        </td>
        <td data-label="Specs">
          <div><strong>${req.tshirtType}</strong></div>
          <small>Size: ${req.size} | Color: ${req.color}</small>
        </td>
        <td data-label="Design">
          ${req.uploadedDesign ? `<img src="${req.uploadedDesign}" class="prod-thumb" alt="Custom Design">` : '<span class="text-muted">No image (Text only)</span>'}
        </td>
        <td data-label="Placement & Text">
          <div><strong>${req.placement}</strong></div>
          ${req.customText ? `<small style="color: #FBBF24;">"${escapeHtml(req.customText)}"</small>` : ''}
          ${req.notes ? `<div style="font-size: 0.75rem; color: #94A3B8;">Note: ${escapeHtml(req.notes)}</div>` : ''}
        </td>
        <td data-label="Qty"><strong>${req.quantity} pcs</strong></td>
        <td data-label="Est. Total"><strong class="text-green">Rs. ${(req.estimatedPrice || 899).toLocaleString()}</strong></td>
        <td data-label="Status">${getStatusBadgeHtml(req.status)}</td>
        <td data-label="Actions">
          <div class="table-btn-group">
            <select class="form-select" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onchange="updateCustomReqStatus('${req.id}', this.value)">
              <option value="Pending" ${req.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Approved" ${req.status === 'Approved' ? 'selected' : ''}>Approved</option>
              <option value="Processing" ${req.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Completed" ${req.status === 'Completed' ? 'selected' : ''}>Completed</option>
              <option value="Rejected" ${req.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
            <a href="https://wa.me/977${req.customer.phone}?text=${encodeURIComponent(`Hello ${req.customer.name}! We received your custom design order on SKB Dumkibas.`)}" target="_blank" class="btn btn-secondary btn-sm" title="Chat on WhatsApp">💬</a>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error fetching custom requests:', err);
  }
}

async function updateCustomReqStatus(reqId, status) {
  try {
    const res = await adminApiFetch(`/api/custom-requests/${reqId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      showToast(`Request ${reqId} marked as ${status}.`, 'success');
      loadCustomRequestsData();
    }
  } catch (e) {
    showToast('Error updating status.', 'error');
  }
}

// ===========================================================================
// 8. VIEW 5: CUSTOMER DIRECTORY
// ===========================================================================
async function loadCustomersData() {
  try {
    const res = await adminApiFetch('/api/customers');
    if (!res.ok) return;
    const customers = await res.json();

    const tbody = document.getElementById('customersTableBody');
    const searchVal = (document.getElementById('customerSearchInput')?.value || '').toLowerCase().trim();

    let filtered = customers.filter(c => {
      return !searchVal ||
        c.name.toLowerCase().includes(searchVal) ||
        c.phone.includes(searchVal) ||
        (c.municipality && c.municipality.toLowerCase().includes(searchVal));
    });

    tbody.innerHTML = filtered.map(c => `
      <tr>
        <td data-label="Customer Name"><strong>${escapeHtml(c.name)}</strong></td>
        <td data-label="Mobile Phone">📞 <a href="tel:${c.phone}" class="text-blue">${c.phone}</a></td>
        <td data-label="Email">${c.email ? escapeHtml(c.email) : '<span class="text-muted">—</span>'}</td>
        <td data-label="Location">
          ${escapeHtml(c.municipality || '')}, ${escapeHtml(c.district || '')}, ${escapeHtml(c.province || '')}
        </td>
        <td data-label="Orders"><strong>${c.totalOrders || 1}</strong></td>
        <td data-label="Lifetime Spend"><strong style="color: #10B981;">Rs. ${(c.lifetimeSpend || 0).toLocaleString()}</strong></td>
        <td data-label="Last Order"><small class="text-muted">${formatDate(c.lastOrderDate)}</small></td>
        <td data-label="Action">
          <a href="https://wa.me/977${c.phone}" target="_blank" class="btn btn-secondary btn-sm" style="background: #25D366; color: #FFFFFF;">
            💬 WhatsApp
          </a>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error('Error fetching customers:', err);
  }
}

// ===========================================================================
// 9. VIEW 6: GALLERY SHOWCASE
// ===========================================================================
let activeGalleryCat = 'all';

async function renderGalleryGrid() {
  const grid = document.getElementById('adminGalleryGrid');
  if (!grid) return;

  try {
    const res = await adminApiFetch('/api/gallery');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        GALLERY_ITEMS_DATA.length = 0;
        data.forEach(item => GALLERY_ITEMS_DATA.push(item));
      }
    }
  } catch (e) {
    console.warn('Using local gallery cache in admin');
  }

  const filtered = GALLERY_ITEMS_DATA.filter(item => {
    return activeGalleryCat === 'all' || item.cat === activeGalleryCat;
  });

  grid.innerHTML = filtered.map(item => `
    <div class="admin-gal-card">
      <div style="position: relative; aspect-ratio: 1/1; background: #0F172A; border-radius: 8px; overflow: hidden;">
        <img src="${item.img}" class="admin-gal-img" alt="${escapeHtml(item.title)}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
        <span class="admin-gal-tag" style="position: absolute; top: 6px; left: 6px; background: rgba(15, 23, 42, 0.85); color: #FFF; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px;">${escapeHtml(item.tag || 'DTF Print')}</span>
      </div>
      <div class="admin-gal-info mt-1" style="padding: 0.5rem 0.2rem;">
        <div class="d-flex align-center justify-between">
          <span style="font-size: 0.72rem; color: #94A3B8; font-weight: 700; text-transform: uppercase;">${item.cat}</span>
          <span style="color: #10B981; font-weight: 800; font-size: 0.82rem;">Rs. ${(item.price || 899).toLocaleString()}</span>
        </div>
        <div style="font-weight: 700; font-size: 0.85rem; color: #F8FAFC; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHtml(item.title)}">
          #${item.id} ${escapeHtml(item.title)}
        </div>
      </div>
    </div>
  `).join('');

  // Setup admin gallery filter listeners
  document.querySelectorAll('[data-gal-cat]').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('[data-gal-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGalleryCat = btn.dataset.galCat;
      renderGalleryGrid();
    };
  });
}

// ===========================================================================
// 10. VIEW 7: WEBSITE SETTINGS
// ===========================================================================
async function loadSettingsData() {
  try {
    const res = await adminApiFetch('/api/settings');
    if (!res.ok) return;
    const settings = await res.json();

    document.getElementById('settingBusinessName').value = settings.businessName || '';
    document.getElementById('settingTagline').value = settings.tagline || '';
    document.getElementById('settingAddress').value = settings.address || '';
    document.getElementById('settingPhone').value = settings.phone || '';
    document.getElementById('settingWhatsapp').value = settings.whatsapp || '';
    document.getElementById('settingEmail').value = settings.email || '';
    document.getElementById('settingDeliveryFee').value = settings.flatDeliveryFee !== undefined ? settings.flatDeliveryFee : 100;
    document.getElementById('settingFreeThreshold').value = settings.freeDeliveryThreshold !== undefined ? settings.freeDeliveryThreshold : 2000;
    document.getElementById('settingCodEnabled').checked = settings.codEnabled !== false;
    document.getElementById('settingHeroTitle').value = settings.heroTitle || '';
    document.getElementById('settingHeroHighlight').value = settings.heroHighlight || '';
    document.getElementById('settingHeroSubtitle').value = settings.heroSubtitle || '';
    document.getElementById('settingFacebook').value = settings.facebookUrl || '';
    document.getElementById('settingInstagram').value = settings.instagramUrl || '';
  } catch (err) {
    console.error('Error fetching settings:', err);
  }
}

async function handleSaveSettings(e) {
  e.preventDefault();
  const btn = document.getElementById('saveSettingsBtn');
  btn.disabled = true;
  btn.textContent = 'Saving Changes...';

  const settings = {
    businessName: document.getElementById('settingBusinessName').value.trim(),
    tagline: document.getElementById('settingTagline').value.trim(),
    address: document.getElementById('settingAddress').value.trim(),
    phone: document.getElementById('settingPhone').value.trim(),
    whatsapp: document.getElementById('settingWhatsapp').value.trim(),
    email: document.getElementById('settingEmail').value.trim(),
    flatDeliveryFee: Number(document.getElementById('settingDeliveryFee').value),
    freeDeliveryThreshold: Number(document.getElementById('settingFreeThreshold').value),
    codEnabled: document.getElementById('settingCodEnabled').checked,
    heroTitle: document.getElementById('settingHeroTitle').value.trim(),
    heroHighlight: document.getElementById('settingHeroHighlight').value.trim(),
    heroSubtitle: document.getElementById('settingHeroSubtitle').value.trim(),
    facebookUrl: document.getElementById('settingFacebook').value.trim(),
    instagramUrl: document.getElementById('settingInstagram').value.trim()
  };

  try {
    const res = await adminApiFetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });

    if (res.ok) {
      showToast('Website settings saved! Live storefront updated.', 'success');
    } else {
      showToast('Failed to save settings.', 'error');
    }
  } catch (err) {
    showToast('Network error saving settings.', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = '💾 Save All Website Settings';
  }
}

// ===========================================================================
// 11. GENERAL HELPERS & LISTENERS
// ===========================================================================
function initEventListeners() {
  // Order Status Filters
  document.querySelectorAll('#orderStatusFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#orderStatusFilters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeOrderStatusFilter = btn.dataset.status;
      renderOrdersTable();
    });
  });

  document.getElementById('orderSearchInput')?.addEventListener('input', renderOrdersTable);

  // Product Category Filter
  document.getElementById('productCategoryFilter')?.addEventListener('change', (e) => {
    activeProdCategory = e.target.value;
    renderProductsTable();
  });
  document.getElementById('productSearchInput')?.addEventListener('input', renderProductsTable);

  // Custom Studio Status Filters
  document.querySelectorAll('#customStatusFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#customStatusFilters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCustomFilter = btn.dataset.customStatus;
      loadCustomRequestsData();
    });
  });

  // Gallery Category Filters
  document.querySelectorAll('#adminGalleryFilters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#adminGalleryFilters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGalleryCat = btn.dataset.galCat;
      renderGalleryGrid();
    });
  });

  document.getElementById('customerSearchInput')?.addEventListener('input', loadCustomersData);
}

function getStatusBadgeHtml(status) {
  const s = (status || 'Pending').toLowerCase();
  let label = status;
  if (status === 'Pending') label = '⏳ Pending';
  if (status === 'Confirmed') label = '📞 Confirmed';
  if (status === 'Processing') label = '🖨️ Processing';
  if (status === 'Shipped') label = '🚚 Shipped';
  if (status === 'Delivered') label = '✅ Delivered';
  if (status === 'Cancelled') label = '❌ Cancelled';
  if (status === 'Approved') label = '✨ Approved';
  if (status === 'Completed') label = '✅ Completed';
  if (status === 'Rejected') label = '❌ Rejected';
  return `<span class="status-pill ${s}">${label}</span>`;
}

function formatDate(isoStr) {
  if (!isoStr) return '—';
  try {
    const d = new Date(isoStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch (e) {
    return isoStr;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function showToast(message, type = 'info') {
  const container = document.getElementById('adminToastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : (type === 'error' ? 'toast-error' : '')}`;
  const icon = type === 'success' ? '✅' : (type === 'error' ? '⚠️' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
