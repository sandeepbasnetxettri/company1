/**
 * SKB T-Shirt Printing — Dumkibas, Nepal
 * Production-Ready Vanilla JavaScript E-Commerce Engine
 * Location: Dumkibas, Nawalparasi, Nepal
 */

// ---------------------------------------------------------------------------
// 1. Dynamic Store Configuration & State
// ---------------------------------------------------------------------------
let STORE_CONFIG = {
  storeName: "SKB T-Shirt Printing Dumkibas",
  tagline: "Custom T-Shirts. Your Design. Your Style.",
  location: "Dumkibas, Nawalparasi, Nepal",
  whatsappNumber: "9779768827327",
  flatCodShipping: 100, // Flat COD rate in Rs. across Nepal
  freeShippingThreshold: 2000, // Free shipping for orders >= Rs. 2000
  codEnabled: true
};

let PRODUCTS_DATA = [];
let cart = [];
let activeCategory = "all";
let activeSearchQuery = "";
let activeGalleryCategory = "all";

// Studio Customizer State
const studioState = {
  tshirtType: "Round Neck Classic",
  baseColor: "#18181B",
  baseColorName: "Midnight Black",
  customText: "YOUR NAME HERE",
  fontFamily: "'Outfit', sans-serif",
  textColor: "#FFFFFF",
  photoDataUrl: null,
  placement: "chest", // 'chest', 'pocket', 'oversized', 'back', 'dual'
  currentViewSide: "front", // 'front' or 'back'
  size: "M",
  quantity: 1,
  notes: ""
};

// 31 Real Dumkibas Workshop Gallery Photos
const GALLERY_ITEMS_DATA = [
  { id: 1, img: "image/1.jpg", cat: "streetwear", title: "Cyber Graphic Streetwear Tee", desc: "High-density cyber streetwear graphic print on 220 GSM bio-washed combed cotton.", tag: "DTF Print", price: 899, active: true },
  { id: 2, img: "image/2.jpg", cat: "couple", title: "King & Queen Couple Pair", desc: "Matching King & Queen royal crown printed couple pair on premium combed cotton.", tag: "Couple Special", price: 1499, active: true },
  { id: 3, img: "image/3.jpg", cat: "photo", title: "HD Portrait Photo Print", desc: "Vibrant high-definition personalized portrait photo print with skin-tone precision.", tag: "Photo Print", price: 899, active: true },
  { id: 4, img: "image/4.jpg", cat: "streetwear", title: "Vintage Oversized Anime Graphic", desc: "Aesthetic vintage Japanese anime oversized streetwear fit with drop-shoulder cut.", tag: "Oversized", price: 999, active: true },
  { id: 5, img: "image/5.jpg", cat: "events", title: "Birthday Milestone 2000s Edition", desc: "Customized birthday milestone celebration team tee with personalized year.", tag: "Birthday", price: 850, active: true },
  { id: 6, img: "image/6.jpg", cat: "nepali", title: "Nepali Typography Devanagari", desc: "Cultural Nepali Devanagari script motivational typography with gold accent.", tag: "Nepali Pride", price: 850, active: true },
  { id: 7, img: "image/7.jpg", cat: "streetwear", title: "Monochrome Black Heavy Cotton", desc: "Clean minimalist monochrome black print on 240 GSM heavy combed cotton.", tag: "Bio-Washed", price: 899, active: true },
  { id: 8, img: "image/8.jpg", cat: "events", title: "Football Tournament Jersey Tee", desc: "Sublimated and DTF sports tournament team jersey with customized name & number.", tag: "Sports Event", price: 799, active: true },
  { id: 9, img: "image/9.jpg", cat: "photo", title: "Family Photo Memory Print", desc: "Cherished high-contrast family photo memory print with archival wash resistance.", tag: "Custom Photo", price: 899, active: true },
  { id: 10, img: "image/10.jpg", cat: "couple", title: "Matching Aesthetic Heartbeat", desc: "Heartbeat pulse graphic couple matching t-shirt pair for anniversaries.", tag: "Couple", price: 1499, active: true },
  { id: 11, img: "image/11.jpg", cat: "streetwear", title: "Himalayan Outdoor Adventure Tee", desc: "Himalayan trek and mountain explorer graphics printed with fade-proof DTF ink.", tag: "Streetwear", price: 899, active: true },
  { id: 12, img: "image/12.jpg", cat: "nepali", title: "Buddha Was Born In Nepal Print", desc: "Iconic Buddha peace artwork celebrating Nepal pride and national heritage.", tag: "Nepali Pride", price: 850, active: true },
  { id: 13, img: "image/13.jpg", cat: "events", title: "College IT Festival Committee Tee", desc: "Tech fest and college event organization committee jersey with sponsor logos.", tag: "Bulk Event", price: 750, active: true },
  { id: 14, img: "image/14.jpg", cat: "streetwear", title: "Retro Typography Skull Tee", desc: "Edgy grunge streetwear typography skull tee in boxy streetwear silhouette.", tag: "Streetwear", price: 950, active: true },
  { id: 15, img: "image/15.jpg", cat: "photo", title: "Pet Memorial HD Print", desc: "Full-color HD pet portrait print on soft breathable bio-washed white cotton.", tag: "Custom Photo", price: 899, active: true },
  { id: 16, img: "image/16.jpg", cat: "couple", title: "Mr & Mrs Matching Hoodies", desc: "Warm fleece couple hoodies with Mr. & Mrs. typography and anniversary dates.", tag: "Couple", price: 1699, active: true },
  { id: 17, img: "image/17.jpg", cat: "streetwear", title: "Minimalist Left Chest Logo", desc: "Understated clean left pocket branding print on executive combed tee.", tag: "Pocket Print", price: 799, active: true },
  { id: 18, img: "image/18.jpg", cat: "nepali", title: "Bir Gorkhali Traditional Crest", desc: "Bravery and heritage Gorkhali emblem print with crossed Khukuri graphics.", tag: "Nepali Pride", price: 850, active: true },
  { id: 19, img: "image/19.jpg", cat: "events", title: "Youth Club Dumkibas Volunteer Tee", desc: "Dumkibas local youth club volunteer event apparel with bold lettering.", tag: "Community", price: 750, active: true },
  { id: 20, img: "image/20.jpg", cat: "streetwear", title: "Dark Acid Wash Streetwear", desc: "Vintage acid wash boxy oversized graphic tee with distressed finish.", tag: "Streetwear", price: 999, active: true },
  { id: 21, img: "image/21.jpg", cat: "couple", title: "Soulmate Matching Minimal Tee", desc: "Minimalist soulmate lock-and-key design pair on 100% combed cotton.", tag: "Couple", price: 1499, active: true },
  { id: 22, img: "image/22.jpg", cat: "photo", title: "Anniversary Photo Collage Print", desc: "Collage of anniversary photos with golden date lettering and hearts.", tag: "Photo Print", price: 950, active: true },
  { id: 23, img: "image/23.jpg", cat: "streetwear", title: "Tokyo Vaporwave Cyberpunk", desc: "Neon cyberpunk futuristic graphic tee with vivid magenta and cyan inks.", tag: "Streetwear", price: 899, active: true },
  { id: 24, img: "image/24.jpg", cat: "nepali", title: "Namaste Traditional Script Tee", desc: "Warm cultural Namaste greeting in stylized lettering on midnight black.", tag: "Nepali Pride", price: 850, active: true },
  { id: 25, img: "image/25.jpg", cat: "events", title: "Music Band Tour Concert Tee", desc: "Rock and pop concert event merchandise tee with back tour dates.", tag: "Band Merch", price: 850, active: true },
  { id: 26, img: "image/26.jpg", cat: "streetwear", title: "Graffiti Spray Art Typography", desc: "Urban street art graffiti splash print with textured crackle effect.", tag: "Streetwear", price: 899, active: true },
  { id: 27, img: "image/27.jpg", cat: "couple", title: "His Queen & Her King Crown Set", desc: "Crown-themed romantic couple outfit printed with metallic gold ink.", tag: "Couple", price: 1499, active: true },
  { id: 28, img: "image/28.jpg", cat: "events", title: "Dumkibas Marathon Finisher Tee", desc: "Official athletic marathon finisher running tee with quick-dry fabric.", tag: "Event Sports", price: 799, active: true },
  { id: 29, img: "image/29.jpg", cat: "photo", title: "High-Contrast Monochrome Portrait", desc: "Artistic black-and-white portrait print with smooth gradients.", tag: "Photo Print", price: 899, active: true },
  { id: 30, img: "image/30.jpg", cat: "streetwear", title: "Oversized Boxy Dropped Shoulder", desc: "Heavy 240 GSM boxy streetwear tee with relaxed oversized comfort.", tag: "Oversized", price: 999, active: true },
  { id: 31, img: "image/31.jpg", cat: "nepali", title: "Nepal Flag Geometric Crest", desc: "Double-triangle Nepal flag modern geometric print with national colors.", tag: "Nepali Pride", price: 850, active: true }
];

// ---------------------------------------------------------------------------
// 2. Initialization
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", async () => {
  await fetchStoreSettings();
  await fetchProducts();
  await fetchGallery();
  loadCartFromStorage();
  renderProducts();
  renderWebsiteGallery();
  initStudioEventListeners();
  initNavigationEventListeners();
  initCartEventListeners();
  initNepalAddressSystem();
  initSearchEventListeners();
  initFaqAccordion();
  initGalleryKeyboardNav();
  updateStudioPreview();
  calculateStudioPrice();
});

// ---------------------------------------------------------------------------
// 2.1 Universal Resilient API Engine & Offline Order Store
// ---------------------------------------------------------------------------
async function apiFetch(endpoint, options = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // 1. Try relative endpoint first (works when served on http://localhost:3000 or production domain)
  if (typeof window !== 'undefined' && window.location && window.location.protocol !== 'file:') {
    try {
      const res = await fetch(cleanEndpoint, options);
      // Check if valid JSON/API response (not 404 HTML fallback from dev servers like Live Server)
      const cType = res.headers.get('content-type') || '';
      if (res.ok || (res.status < 500 && cType.includes('application/json'))) {
        return res;
      }
    } catch (e) {
      // Local origin request failed, fallback to node backend
    }
  }

  // 2. Direct Fallback to Node.js Backend Server at http://localhost:3000
  const localBackendUrl = `http://localhost:3000${cleanEndpoint}`;
  return fetch(localBackendUrl, options);
}

function saveLocalOrder(order) {
  try {
    const existing = JSON.parse(localStorage.getItem('skb_local_orders') || '[]');
    const filtered = existing.filter(o => o.id !== order.id);
    filtered.unshift(order);
    localStorage.setItem('skb_local_orders', JSON.stringify(filtered.slice(0, 50)));
  } catch (e) {
    console.warn('Could not save local order backup:', e);
  }
}

function getLocalOrders() {
  try {
    return JSON.parse(localStorage.getItem('skb_local_orders') || '[]');
  } catch (e) {
    return [];
  }
}

// ---------------------------------------------------------------------------
// 3. Dynamic Backend API Synchronization (Products, Settings & Gallery)
// ---------------------------------------------------------------------------
async function fetchStoreSettings() {
  try {
    const res = await apiFetch('/api/settings');
    if (res.ok) {
      const settings = await res.json();
      STORE_CONFIG.storeName = settings.businessName || STORE_CONFIG.storeName;
      STORE_CONFIG.whatsappNumber = settings.whatsapp || STORE_CONFIG.whatsappNumber;
      STORE_CONFIG.flatCodShipping = settings.flatDeliveryFee !== undefined ? settings.flatDeliveryFee : 100;
      STORE_CONFIG.freeShippingThreshold = settings.freeDeliveryThreshold !== undefined ? settings.freeDeliveryThreshold : 2000;
      STORE_CONFIG.codEnabled = settings.codEnabled !== false;

      // Update DOM Text dynamically
      if (settings.heroTitle && document.getElementById('heroTitleDisplay')) {
        document.getElementById('heroTitleDisplay').innerHTML = `${escapeHtml(settings.heroTitle)} <br><span class="hero-highlight">${escapeHtml(settings.heroHighlight || 'Made Your Way')}</span>`;
      }
      if (settings.heroSubtitle && document.getElementById('heroSubtitleDisplay')) {
        document.getElementById('heroSubtitleDisplay').textContent = settings.heroSubtitle;
      }
      if (settings.phone && document.getElementById('topbarWhatsappDisplay')) {
        document.getElementById('topbarWhatsappDisplay').textContent = settings.phone;
      }
      if (settings.address && document.getElementById('contactAddressDisplay')) {
        document.getElementById('contactAddressDisplay').textContent = settings.address;
      }
    }
  } catch (err) {
    console.warn('Using default store settings fallback:', err);
  }
}

async function fetchProducts() {
  try {
    const res = await apiFetch('/api/products');
    if (res.ok) {
      PRODUCTS_DATA = await res.json();
    }
  } catch (err) {
    console.warn('Error fetching live products from backend:', err);
  }
}

async function fetchGallery() {
  try {
    const res = await apiFetch('/api/gallery');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        GALLERY_ITEMS_DATA.length = 0;
        data.forEach(item => GALLERY_ITEMS_DATA.push(item));
      }
    }
  } catch (err) {
    console.warn('Using default gallery seed data:', err);
  }
}

// ---------------------------------------------------------------------------
// 4. Product Catalog Rendering & Filtering
// ---------------------------------------------------------------------------
function renderProducts() {
  const grid = document.getElementById("productGrid");
  const emptyState = document.getElementById("emptyProducts");
  if (!grid) return;

  const filtered = PRODUCTS_DATA.filter(prod => {
    const matchesCategory = activeCategory === "all" || prod.category === activeCategory;
    const matchesSearch = activeSearchQuery === "" ||
      prod.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      (prod.description && prod.description.toLowerCase().includes(activeSearchQuery.toLowerCase())) ||
      (prod.category && prod.category.toLowerCase().includes(activeSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  grid.innerHTML = filtered.map(product => {
    const isOutOfStock = product.stock !== undefined && Number(product.stock) <= 0;
    const stockBadge = isOutOfStock
      ? `<span class="out-of-stock-badge">OUT OF STOCK</span>`
      : (product.stock && product.stock <= 5 ? `<span class="out-of-stock-badge" style="background:#F59E0B;">Only ${product.stock} Left!</span>` : '');

    return `
      <article class="product-card ${isOutOfStock ? 'is-out-of-stock' : ''}" data-product-id="${product.id}">
        <div class="product-image-wrap" onclick="openQuickView('${product.id}')">
          <img src="${product.image}" alt="${escapeHtml(product.name)} - SKB T-Shirt Dumkibas" class="product-img" loading="lazy" decoding="async">
          ${product.badge ? `<span class="product-badge-pill highlight">${escapeHtml(product.badge)}</span>` : ''}
          ${stockBadge}
          <button type="button" class="quick-view-btn" aria-label="Quick View ${escapeHtml(product.name)}" onclick="event.stopPropagation(); openQuickView('${product.id}')">
            👁️ Quick View
          </button>
        </div>

        <div class="product-info">
          <div class="d-flex align-center justify-between">
            <span class="product-cat">${getCategoryLabel(product.category)}</span>
            <span class="stock-status-tag" style="font-size: 0.72rem; font-weight: 700; color: ${isOutOfStock ? '#EF4444' : '#10B981'};">
              ${isOutOfStock ? '• Sold Out' : '• In Stock (Dumkibas)'}
            </span>
          </div>

          <h3 class="product-name" onclick="openQuickView('${product.id}')" style="cursor: pointer;">${escapeHtml(product.name)}</h3>

          <div class="product-price-row">
            <span class="current-price">Rs. ${product.price.toLocaleString()}</span>
            ${product.discountPrice ? `
              <span class="original-price">Rs. ${product.discountPrice.toLocaleString()}</span>
              <span class="discount-badge">${calculateDiscountPercent(product.price, product.discountPrice)}% OFF</span>
            ` : ''}
          </div>

          <div class="product-options-row">
            <div class="size-dots-preview">
              ${(product.sizes || ["S", "M", "L", "XL", "XXL"]).map(s => `<span class="size-tag">${s}</span>`).join('')}
            </div>
            <div class="color-dots-preview">
              ${(product.colors || [{ name: 'Black', hex: '#18181B' }]).map(c => `<span class="mini-color-dot" style="background-color: ${c.hex || '#18181B'};" title="${c.name || c}"></span>`).join('')}
            </div>
          </div>

          <div class="product-actions">
            <button type="button" class="btn btn-card-cart ${isOutOfStock ? 'btn-disabled' : ''}" onclick="${isOutOfStock ? '' : `quickAddToCart('${product.id}')`}" ${isOutOfStock ? 'disabled aria-disabled="true"' : ''} title="${isOutOfStock ? 'Item is currently Out of Stock' : 'Add to Shopping Cart'}">
              🛒 Add to Cart
            </button>
            <button type="button" class="btn btn-success-cod ${isOutOfStock ? 'btn-disabled' : ''}" onclick="${isOutOfStock ? '' : `directBuyProduct('${product.id}')`}" ${isOutOfStock ? 'disabled aria-disabled="true"' : ''} title="${isOutOfStock ? 'Item is currently Out of Stock' : 'Instant Cash on Delivery Checkout'}">
              ⚡ Buy Now
            </button>
          </div>
          
          <div class="product-card-sub-actions mt-1" style="display: flex; gap: 0.35rem;">
            <button type="button" class="btn btn-outline btn-sm flex-1" onclick="customizeProductInStudio('${product.id}')" style="font-size: 0.76rem; padding: 0.3rem 0.4rem; min-height: 32px;" title="Customize with custom name or photo in Studio">
              ✨ Customize
            </button>
            <button type="button" class="btn btn-card-order btn-sm flex-1" onclick="orderProductOnWhatsApp('${product.id}')" style="font-size: 0.76rem; padding: 0.3rem 0.4rem; min-height: 32px;">
              💬 WhatsApp
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function directBuyProduct(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;
  if (prod.stock !== undefined && prod.stock <= 0) {
    showToast("This item is currently out of stock.", "error");
    return;
  }

  // Add default size item to cart and immediately open checkout modal
  const defaultSize = (prod.sizes && prod.sizes.length > 0) ? prod.sizes[0] : 'M';
  const defaultColor = (prod.colors && prod.colors.length > 0) ? (prod.colors[0].name || prod.colors[0]) : 'Midnight Black';

  const existing = cart.find(c => c.productId === prod.id && c.size === defaultSize && c.color === defaultColor);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      cartId: `${prod.id}-${defaultSize}-${Date.now()}`,
      productId: prod.id,
      name: prod.name,
      size: defaultSize,
      color: defaultColor,
      price: prod.price,
      quantity: 1,
      image: prod.image
    });
  }

  saveCartToStorage();
  updateCartUI();
  openCheckoutModal();
  showToast(`Proceeding to Nepal Doorstep COD Checkout for ${prod.name}! 🚀`, "success");
}

function customizeProductInStudio(productId) {
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  studioState.customText = prod.name.toUpperCase();
  studioState.notes = `Inspired by ready-made design: "${prod.name}" (${prod.category})`;
  if (prod.colors && prod.colors.length > 0 && prod.colors[0].hex) {
    studioState.baseColor = prod.colors[0].hex;
    studioState.baseColorName = prod.colors[0].name || 'Midnight Black';
  }

  const customTextInput = document.getElementById("customTextInput");
  if (customTextInput) customTextInput.value = studioState.customText;
  const customDesignNotes = document.getElementById("customDesignNotes");
  if (customDesignNotes) customDesignNotes.value = studioState.notes;

  updateStudioPreview();
  calculateStudioPrice();

  const studio = document.getElementById("custom-studio");
  if (studio) studio.scrollIntoView({ behavior: "smooth" });
  showToast(`Loaded "${prod.name}" into Custom Studio! ✨`, "info");
}

function getCategoryLabel(cat) {
  switch (cat) {
    case 'streetwear': return 'Graphic & Streetwear';
    case 'custom': return 'Custom Personalized';
    case 'nepali': return 'Nepali Pride Quote';
    case 'couple': return 'Couple Collection';
    case 'events': return 'Birthday & Team Event';
    case 'corporate': return 'Corporate / Bulk';
    default: return 'T-Shirt';
  }
}

function calculateDiscountPercent(curr, orig) {
  if (!orig || orig <= curr) return 0;
  return Math.round(((orig - curr) / orig) * 100);
}

// Category filter pills click handlers
document.querySelectorAll("#categoryFilterPills .filter-pill").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#categoryFilterPills .filter-pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts();
  });
});

function filterByCategory(cat) {
  activeCategory = cat;
  document.querySelectorAll("#categoryFilterPills .filter-pill").forEach(p => {
    if (p.dataset.category === cat) p.classList.add("active");
    else p.classList.remove("active");
  });
  renderProducts();
  const prodSec = document.getElementById("products");
  if (prodSec) prodSec.scrollIntoView({ behavior: "smooth" });
}

function resetFilters() {
  activeCategory = "all";
  activeSearchQuery = "";
  const statusBar = document.getElementById("searchStatusBar");
  if (statusBar) statusBar.style.display = "none";
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) searchInput.value = "";
  document.querySelectorAll("#categoryFilterPills .filter-pill").forEach(p => {
    if (p.dataset.category === "all") p.classList.add("active");
    else p.classList.remove("active");
  });
  renderProducts();
}

// ---------------------------------------------------------------------------
// 5. Search Functionality
// ---------------------------------------------------------------------------
function initSearchEventListeners() {
  const searchTriggerBtn = document.getElementById("searchTriggerBtn");
  const searchDropdown = document.getElementById("searchDropdown");
  const searchCloseBtn = document.getElementById("searchCloseBtn");
  const searchInput = document.getElementById("globalSearchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  const searchStatusBar = document.getElementById("searchStatusBar");
  const searchQueryDisplay = document.getElementById("searchQueryDisplay");

  if (searchTriggerBtn && searchDropdown) {
    searchTriggerBtn.addEventListener("click", () => {
      searchDropdown.classList.toggle("active");
      if (searchDropdown.classList.contains("active") && searchInput) {
        searchInput.focus();
      }
    });
  }

  if (searchCloseBtn && searchDropdown) {
    searchCloseBtn.addEventListener("click", () => searchDropdown.classList.remove("active"));
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value.trim();
      if (activeSearchQuery.length > 0) {
        searchStatusBar.style.display = "flex";
        searchQueryDisplay.textContent = `"${activeSearchQuery}"`;
      } else {
        searchStatusBar.style.display = "none";
      }
      renderProducts();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      activeSearchQuery = "";
      if (searchInput) searchInput.value = "";
      searchStatusBar.style.display = "none";
      renderProducts();
    });
  }
}

// ---------------------------------------------------------------------------
// 6. Interactive "Design Your Own" Studio Logic
// ---------------------------------------------------------------------------
function initStudioEventListeners() {
  const studioTeeBody = document.getElementById("studioTeeBody");
  const colorCircles = document.querySelectorAll(".color-circle");
  const selectedColorNameDisplay = document.getElementById("selectedColorNameDisplay");
  const customTextInput = document.getElementById("customTextInput");
  const fontSelect = document.getElementById("fontSelect");
  const textColorDots = document.querySelectorAll(".text-color-dot");
  const photoUpload = document.getElementById("customPhotoUpload");
  const removePhotoBtn = document.getElementById("removePhotoBtn");
  const printPlacementSelect = document.getElementById("printPlacementSelect");
  const studioTeeType = document.getElementById("studioTeeType");
  const sizePills = document.querySelectorAll("#studioSizePills .size-pill");
  const qtyMinus = document.getElementById("studioQtyMinus");
  const qtyPlus = document.getElementById("studioQtyPlus");
  const qtyInput = document.getElementById("studioQtyInput");
  const customDesignNotes = document.getElementById("customDesignNotes");
  const sendCustomWhatsAppBtn = document.getElementById("sendCustomWhatsAppBtn");
  const addCustomToCartBtn = document.getElementById("addCustomToCartBtn");
  const viewFrontBtn = document.getElementById("viewFrontBtn");
  const viewBackBtn = document.getElementById("viewBackBtn");

  // Front vs Back View Toggles
  if (viewFrontBtn && viewBackBtn) {
    viewFrontBtn.addEventListener("click", () => {
      viewFrontBtn.classList.add("active");
      viewBackBtn.classList.remove("active");
      studioState.currentViewSide = "front";
      document.getElementById('currentViewSideBadge').textContent = '⚡ Front Print Mode';
      updateStudioPreview();
    });
    viewBackBtn.addEventListener("click", () => {
      viewBackBtn.classList.add("active");
      viewFrontBtn.classList.remove("active");
      studioState.currentViewSide = "back";
      document.getElementById('currentViewSideBadge').textContent = '🔄 Back Print Mode';
      updateStudioPreview();
    });
  }

  // T-Shirt Type Change
  if (studioTeeType) {
    studioTeeType.addEventListener("change", (e) => {
      studioState.tshirtType = e.target.value;
      calculateStudioPrice();
    });
  }

  // Color circles
  colorCircles.forEach(circle => {
    circle.addEventListener("click", () => {
      colorCircles.forEach(c => c.classList.remove("active"));
      circle.classList.add("active");
      studioState.baseColor = circle.dataset.color;
      studioState.baseColorName = circle.dataset.colorName;
      if (selectedColorNameDisplay) {
        selectedColorNameDisplay.innerHTML = `Selected: <strong>${studioState.baseColorName}</strong>`;
      }
      updateStudioPreview();
    });
  });

  // Text input
  if (customTextInput) {
    customTextInput.addEventListener("input", (e) => {
      studioState.customText = e.target.value;
      updateStudioPreview();
    });
  }

  // Font style
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      studioState.fontFamily = e.target.value;
      updateStudioPreview();
    });
  }

  // Text color swatches
  textColorDots.forEach(dot => {
    dot.addEventListener("click", () => {
      textColorDots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
      studioState.textColor = dot.dataset.textColor;
      updateStudioPreview();
    });
  });

  // Photo upload
  if (photoUpload) {
    photoUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 15 * 1024 * 1024) {
          showToast("File is too large. Please select an image under 15MB.", "error");
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          studioState.photoDataUrl = event.target.result;
          updateStudioPreview();
          showToast("Image loaded onto T-Shirt mockup! 📸", "success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (removePhotoBtn) {
    removePhotoBtn.addEventListener("click", () => {
      studioState.photoDataUrl = null;
      if (photoUpload) photoUpload.value = "";
      updateStudioPreview();
    });
  }

  // Placement change with Front vs Back View Auto-Switch
  if (printPlacementSelect) {
    printPlacementSelect.addEventListener("change", (e) => {
      studioState.placement = e.target.value;
      if (studioState.placement === "back") {
        studioState.currentViewSide = "back";
        if (viewBackBtn) viewBackBtn.classList.add("active");
        if (viewFrontBtn) viewFrontBtn.classList.remove("active");
        const badge = document.getElementById('currentViewSideBadge');
        if (badge) badge.textContent = '🔄 Back Print Mode';
      } else if (studioState.placement === "dual") {
        const badge = document.getElementById('currentViewSideBadge');
        if (badge) badge.textContent = '👕 Front + 🔄 Back Dual Mode';
      } else {
        studioState.currentViewSide = "front";
        if (viewFrontBtn) viewFrontBtn.classList.add("active");
        if (viewBackBtn) viewBackBtn.classList.remove("active");
        const badge = document.getElementById('currentViewSideBadge');
        if (badge) badge.textContent = '⚡ Front Print Mode';
      }
      updateStudioPreview();
      calculateStudioPrice();
    });
  }

  // Size pills
  sizePills.forEach(pill => {
    pill.addEventListener("click", () => {
      sizePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      studioState.size = pill.dataset.size;
    });
  });

  // Quantity controls
  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        studioState.quantity = val - 1;
        calculateStudioPrice();
      }
    });
    qtyPlus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
      studioState.quantity = val + 1;
      calculateStudioPrice();
    });
    qtyInput.addEventListener("input", (e) => {
      let val = parseInt(e.target.value, 10) || 1;
      if (val < 1) val = 1;
      studioState.quantity = val;
      calculateStudioPrice();
    });
  }

  // Notes
  if (customDesignNotes) {
    customDesignNotes.addEventListener("input", (e) => {
      studioState.notes = e.target.value;
    });
  }

  // Action Buttons
  if (addCustomToCartBtn) {
    addCustomToCartBtn.addEventListener("click", handleAddCustomToCart);
  }
  const buyCustomNowBtn = document.getElementById("buyCustomNowBtn");
  if (buyCustomNowBtn) {
    buyCustomNowBtn.addEventListener("click", handleBuyCustomNow);
  }
  if (sendCustomWhatsAppBtn) {
    sendCustomWhatsAppBtn.addEventListener("click", handleCustomWhatsAppOrder);
  }
}

function updateStudioPreview() {
  const studioTeeBody = document.getElementById("studioTeeBody");
  const studioTeeBodyBack = document.getElementById("studioTeeBodyBack");
  const customTextPreview = document.getElementById("customTextPreview");
  const customPhotoPreviewWrap = document.getElementById("customPhotoPreviewWrap");
  const customPhotoImg = document.getElementById("customPhotoImg");
  const printableZone = document.getElementById("printableZone");
  const frontViewGroup = document.getElementById("studioFrontView");
  const backViewGroup = document.getElementById("studioBackView");
  const svgWrapper = document.getElementById("tshirtSvgWrapper");

  // Sync fill color to both front and back body paths
  if (studioTeeBody) {
    studioTeeBody.setAttribute("fill", studioState.baseColor);
  }
  if (studioTeeBodyBack) {
    studioTeeBodyBack.setAttribute("fill", studioState.baseColor);
  }

  // Toggle front/back view groups with flip animation
  if (frontViewGroup && backViewGroup && svgWrapper) {
    const isBack = studioState.currentViewSide === "back";

    // Check if a view change actually happened (to avoid re-triggering animation)
    const wasBack = backViewGroup.classList.contains("tee-view-active");
    if (isBack !== wasBack) {
      // Trigger flip animation
      svgWrapper.classList.add("tee-flip-animate");
      setTimeout(() => {
        frontViewGroup.classList.toggle("tee-view-active", !isBack);
        backViewGroup.classList.toggle("tee-view-active", isBack);
      }, 180); // halfway through flip
      setTimeout(() => {
        svgWrapper.classList.remove("tee-flip-animate");
      }, 400);
    } else {
      frontViewGroup.classList.toggle("tee-view-active", !isBack);
      backViewGroup.classList.toggle("tee-view-active", isBack);
    }
  }

  if (customTextPreview) {
    customTextPreview.textContent = studioState.customText || "YOUR TEXT HERE";
    customTextPreview.style.fontFamily = studioState.fontFamily;
    customTextPreview.style.color = studioState.textColor;
  }

  if (customPhotoPreviewWrap && customPhotoImg) {
    if (studioState.photoDataUrl) {
      customPhotoImg.src = studioState.photoDataUrl;
      customPhotoPreviewWrap.style.display = "block";
    } else {
      customPhotoPreviewWrap.style.display = "none";
    }
  }

  if (printableZone) {
    printableZone.className = "printable-zone";
    if (studioState.placement === "pocket") {
      printableZone.classList.add("print-pos-pocket");
    } else if (studioState.placement === "oversized") {
      printableZone.classList.add("print-pos-oversized");
    } else if (studioState.placement === "back") {
      printableZone.classList.add("print-pos-back");
    } else if (studioState.placement === "dual") {
      printableZone.classList.add("print-pos-oversized");
    } else {
      printableZone.classList.add("print-pos-chest");
    }
  }
}

function calculateStudioPrice() {
  let baseUnit = 899;
  if (studioState.tshirtType.includes("Oversized")) baseUnit = 999;
  if (studioState.tshirtType.includes("Polo")) baseUnit = 1099;
  if (studioState.tshirtType.includes("Hoodie")) baseUnit = 1699;

  // Placement surcharge for dual front+back print
  if (studioState.placement === "dual") {
    baseUnit += 200;
  }

  // Bulk Tiered Discount Calculator
  let discountRate = 0;
  const qty = studioState.quantity;
  if (qty >= 50) discountRate = 0.30;
  else if (qty >= 20) discountRate = 0.20;
  else if (qty >= 10) discountRate = 0.15;
  else if (qty >= 5) discountRate = 0.10;

  const discountedUnit = Math.round(baseUnit * (1 - discountRate));
  const grandTotal = discountedUnit * qty;

  const priceDisplay = document.getElementById("studioEstimatedPrice");
  if (priceDisplay) {
    priceDisplay.textContent = `Rs. ${grandTotal.toLocaleString()}`;
  }

  return grandTotal;
}

function getPlacementDetails(placementCode) {
  switch (placementCode) {
    case 'chest':
      return {
        name: 'Front Center Chest',
        viewSide: 'Front View',
        viewIcon: '👕',
        badgeClass: 'view-front',
        badgeText: '👕 Front View (Center Chest)'
      };
    case 'pocket':
      return {
        name: 'Left Chest Pocket',
        viewSide: 'Front View',
        viewIcon: '👕',
        badgeClass: 'view-front',
        badgeText: '👕 Front View (Pocket)'
      };
    case 'oversized':
      return {
        name: 'Full Front Graphic',
        viewSide: 'Front View',
        viewIcon: '👕',
        badgeClass: 'view-front',
        badgeText: '👕 Front View (Full Graphic)'
      };
    case 'back':
      return {
        name: 'Back Large Print',
        viewSide: 'Back View',
        viewIcon: '🔄',
        badgeClass: 'view-back',
        badgeText: '🔄 Back View (Large Print)'
      };
    case 'dual':
      return {
        name: 'Front + Back Dual Print',
        viewSide: 'Dual Side (Front + Back)',
        viewIcon: '👕+🔄',
        badgeClass: 'view-dual',
        badgeText: '👕 Front + 🔄 Back Dual View'
      };
    default:
      return {
        name: placementCode || 'Front Print',
        viewSide: 'Front View',
        viewIcon: '👕',
        badgeClass: 'view-front',
        badgeText: `👕 ${placementCode || 'Front View'}`
      };
  }
}

function handleAddCustomToCart() {
  const estimatedPrice = calculateStudioPrice();
  const unitPrice = Math.round(estimatedPrice / studioState.quantity);
  const placeInfo = getPlacementDetails(studioState.placement);

  const cartItem = {
    cartId: `custom-${Date.now()}`,
    productId: "custom-studio-item",
    name: `Custom ${studioState.tshirtType}`,
    size: studioState.size,
    color: studioState.baseColorName,
    price: unitPrice,
    quantity: studioState.quantity,
    image: studioState.photoDataUrl || "images/prod_oversized_tshirt.jpg",
    customText: studioState.customText,
    placement: studioState.placement,
    placementName: placeInfo.name,
    viewSide: placeInfo.viewSide,
    viewBadge: placeInfo.badgeText,
    badgeClass: placeInfo.badgeClass,
    font: studioState.fontFamily,
    textColor: studioState.textColor,
    notes: studioState.notes
  };

  cart.push(cartItem);
  saveCartToStorage();
  updateCartUI();
  openCartDrawer();
  showToast("Custom T-Shirt added to your shopping cart! 🛒", "success");

  // Send asynchronous custom request record to backend
  submitCustomRequestAsync(cartItem);
}

async function submitCustomRequestAsync(item) {
  try {
    const placeInfo = getPlacementDetails(item.placement || studioState.placement);
    await apiFetch('/api/custom-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Website Customizer Customer', phone: '9768827327' },
        tshirtType: studioState.tshirtType,
        color: studioState.baseColorName,
        size: studioState.size,
        quantity: studioState.quantity,
        placement: studioState.placement,
        placementName: placeInfo.name,
        viewSide: placeInfo.viewSide,
        viewBadge: placeInfo.badgeText,
        customText: studioState.customText,
        font: studioState.fontFamily,
        textColor: studioState.textColor,
        uploadedDesign: studioState.photoDataUrl || '',
        notes: studioState.notes,
        estimatedPrice: calculateStudioPrice()
      })
    });
  } catch (e) { }
}

function handleCustomWhatsAppOrder() {
  const total = calculateStudioPrice();
  const placeInfo = getPlacementDetails(studioState.placement);
  const msg =
    `*🎨 CUSTOM T-SHIRT ORDER INQUIRY — SKB DUMKIBAS*\n` +
    `-----------------------------------------\n` +
    `*T-Shirt Style:* ${studioState.tshirtType}\n` +
    `*Color:* ${studioState.baseColorName}\n` +
    `*Size:* ${studioState.size}\n` +
    `*Quantity:* ${studioState.quantity} pcs\n` +
    `*Print View & Placement:* ${placeInfo.badgeText}\n` +
    `*Custom Text:* "${studioState.customText}"\n` +
    `*Special Notes:* ${studioState.notes || 'None'}\n` +
    `*Estimated Total:* Rs. ${total.toLocaleString()} (Cash on Delivery Nepal)\n` +
    `-----------------------------------------\n` +
    `_Hello SKB Dumkibas team! Please verify my custom mockup & COD dispatch._`;

  const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");
}

function handleBuyCustomNow() {
  handleAddCustomToCart();
  closeCartDrawer();
  openCheckoutModal();
  showToast("Proceeding to instant COD Doorstep Checkout for your Custom Tee! ⚡", "success");
}

// ---------------------------------------------------------------------------
// 7. Design Gallery Showcase (31 Authentic Photos & Lightbox with Add to Cart)
// ---------------------------------------------------------------------------
let selectedLightboxSize = "M";
let currentLightboxGalleryId = null;
const galleryCardSelectedSizes = {};

function selectGalleryCardSize(galleryId, size, btn) {
  galleryCardSelectedSizes[galleryId] = size;
  const container = document.getElementById(`galSizeGroup_${galleryId}`);
  if (container) {
    container.querySelectorAll('.size-pill-mini').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
}

function handleGalleryCardAddToCart(galleryId) {
  const size = galleryCardSelectedSizes[galleryId] || "M";
  addGalleryItemToCart(galleryId, size);
}

function handleGalleryCardBuyNow(galleryId) {
  const size = galleryCardSelectedSizes[galleryId] || "M";
  buyNowGalleryItem(galleryId, size);
}

function renderWebsiteGallery() {
  const grid = document.getElementById("websiteGalleryGrid");
  if (!grid) return;

  const filtered = GALLERY_ITEMS_DATA.filter(item => {
    return activeGalleryCategory === "all" || item.cat === activeGalleryCategory;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-products" style="grid-column: 1 / -1; padding: 2.5rem 1rem;">
        <div class="empty-icon">🎨</div>
        <h3>No workshop designs in this category yet</h3>
        <p>Browse other categories or create your custom design in the Studio below!</p>
        <button class="btn btn-secondary mt-2" onclick="filterGalleryByCategory('all')">View All 31 Designs</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const chosenSize = galleryCardSelectedSizes[item.id] || "M";
    const itemPrice = item.price || 899;
    const origPrice = Math.round(itemPrice * 1.3);

    return `
      <article class="gallery-card" data-gallery-id="${item.id}">
        <div class="gallery-img-wrap" onclick="openGalleryLightbox(${item.id})">
          <img src="${item.img}" class="gallery-img" alt="${escapeHtml(item.title)} - Dumkibas Workshop Print" loading="lazy" decoding="async">
          <span class="gallery-overlay-badge">${escapeHtml(item.tag || 'DTF Print')}</span>
          <button type="button" class="quick-view-btn" aria-label="Quick View ${escapeHtml(item.title)}" onclick="event.stopPropagation(); openGalleryLightbox(${item.id})">
            👁️ Quick View
          </button>
        </div>
        <div class="gallery-info">
          <div class="d-flex align-center justify-between">
            <span class="gallery-cat-text">${getCategoryLabel(item.cat)}</span>
            <span class="stock-status-tag" style="font-size: 0.72rem; font-weight: 700; color: #10B981;">• In Stock (Dumkibas)</span>
          </div>
          
          <h3 class="gallery-title" onclick="openGalleryLightbox(${item.id})" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</h3>
          
          <div class="product-price-row mb-1">
            <span class="current-price" style="color: #10B981; font-weight: 800; font-size: 1.05rem;">Rs. ${itemPrice.toLocaleString()}</span>
            <span class="original-price" style="font-size: 0.8rem; color: #64748B; text-decoration: line-through;">Rs. ${origPrice.toLocaleString()}</span>
            <span class="discount-badge" style="font-size: 0.68rem; font-weight: 700; color: #15803D; background: #DCFCE7; padding: 0.1rem 0.35rem; border-radius: 4px;">25% OFF</span>
          </div>

          <!-- Size Selection on Card -->
          <div class="gallery-card-sizes">
            <span class="size-label-mini">Size:</span>
            <div class="size-pill-group-mini" id="galSizeGroup_${item.id}">
              ${["S", "M", "L", "XL", "XXL"].map(s => `
                <button type="button" class="size-pill-mini ${s === chosenSize ? 'active' : ''}" data-size="${s}" onclick="event.stopPropagation(); selectGalleryCardSize(${item.id}, '${s}', this)">${s}</button>
              `).join('')}
            </div>
          </div>
          
          <!-- Primary Action Buttons: Add to Cart & Buy Now -->
          <div class="gallery-card-actions">
            <button type="button" class="btn btn-card-cart btn-sm" onclick="event.stopPropagation(); handleGalleryCardAddToCart(${item.id})" title="Add this design (${chosenSize}) to Cart">
              🛒 Add to Cart
            </button>
            <button type="button" class="btn btn-success-cod btn-sm" onclick="event.stopPropagation(); handleGalleryCardBuyNow(${item.id})" title="Instant COD Doorstep Checkout (${chosenSize})">
              ⚡ Buy Now
            </button>
          </div>

          <!-- Secondary Action Buttons: Details & Customise -->
          <div class="gallery-card-sub-actions mt-1">
            <button type="button" class="btn btn-outline btn-xs flex-1" onclick="event.stopPropagation(); openGalleryLightbox(${item.id})" title="View High-Res Photo & Details">
              👁️ Details
            </button>
            <button type="button" class="btn btn-secondary btn-xs flex-1" onclick="event.stopPropagation(); orderSimilarGalleryItem(${item.id})" title="Customize this in Studio">
              ✨ Customise
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Gallery filter clicks
  document.querySelectorAll("#galleryFilterPills .filter-pill").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll("#galleryFilterPills .filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGalleryCategory = btn.dataset.galleryCat;
      renderWebsiteGallery();
    };
  });
}

function filterGalleryByCategory(cat) {
  activeGalleryCategory = cat;
  document.querySelectorAll("#galleryFilterPills .filter-pill").forEach(btn => {
    if (btn.dataset.galleryCat === cat) btn.classList.add("active");
    else btn.classList.remove("active");
  });
  renderWebsiteGallery();
}

function openGalleryLightbox(itemId) {
  const item = GALLERY_ITEMS_DATA.find(i => i.id === itemId);
  if (!item) return;

  currentLightboxGalleryId = item.id;
  selectedLightboxSize = "M";

  const modal = document.getElementById("galleryLightboxModal");
  const img = document.getElementById("lightboxImg");
  const tag = document.getElementById("lightboxTag");
  const title = document.getElementById("lightboxTitle");
  const desc = document.getElementById("lightboxDesc");
  const price = document.getElementById("lightboxPrice");
  const counter = document.getElementById("lightboxCounter");
  const similarBtn = document.getElementById("lightboxOrderSimilarBtn");
  const waBtn = document.getElementById("lightboxWaOrderBtn");
  const addToCartBtn = document.getElementById("lightboxAddToCartBtn");
  const buyNowBtn = document.getElementById("lightboxBuyNowBtn");

  const currentIndex = GALLERY_ITEMS_DATA.findIndex(i => i.id === itemId);
  if (counter && currentIndex !== -1) {
    counter.textContent = `Design ${currentIndex + 1} / ${GALLERY_ITEMS_DATA.length}`;
  }

  if (img) img.src = item.img;
  if (tag) tag.textContent = item.tag || getCategoryLabel(item.cat);
  if (title) title.textContent = item.title;
  if (price) price.textContent = `Rs. ${(item.price || 899).toLocaleString()}`;
  if (desc) desc.textContent = item.desc || `Authentic finished DTF print on 100% bio-washed combed cotton crafted at SKB T-Shirt Printing studio in Dumkibas, Nepal.`;

  // Size pill handlers in lightbox
  document.querySelectorAll("#lightboxSizes .size-pill").forEach(p => {
    p.classList.remove("active");
    if (p.dataset.size === "M") p.classList.add("active");
    p.onclick = () => {
      document.querySelectorAll("#lightboxSizes .size-pill").forEach(b => b.classList.remove("active"));
      p.classList.add("active");
      selectedLightboxSize = p.dataset.size;
      updateLightboxWhatsAppBtn(item);
    };
  });

  if (addToCartBtn) {
    addToCartBtn.onclick = () => {
      addGalleryItemToCart(item.id, selectedLightboxSize);
      closeGalleryLightbox();
    };
  }

  if (buyNowBtn) {
    buyNowBtn.onclick = () => {
      buyNowGalleryItem(item.id, selectedLightboxSize);
    };
  }

  if (similarBtn) {
    similarBtn.onclick = () => {
      orderSimilarGalleryItem(item.id);
    };
  }

  updateLightboxWhatsAppBtn(item);

  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function updateLightboxWhatsAppBtn(item) {
  const waBtn = document.getElementById("lightboxWaOrderBtn");
  if (waBtn && item) {
    const itemPrice = item.price || 899;
    const msg = `Namaste SKB Team! I want to order this design from your Dumkibas Gallery:\n` +
      `• Design #${item.id}: "${item.title}"\n` +
      `• Category: ${getCategoryLabel(item.cat)}\n` +
      `• Size: ${selectedLightboxSize}\n` +
      `• Price: Rs. ${itemPrice}\n` +
      `Please deliver via Cash on Delivery (COD) across Nepal.`;
    waBtn.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }
}

function prevGalleryLightbox() {
  if (GALLERY_ITEMS_DATA.length === 0) return;
  const currentIndex = GALLERY_ITEMS_DATA.findIndex(i => i.id === currentLightboxGalleryId);
  const prevIndex = (currentIndex - 1 + GALLERY_ITEMS_DATA.length) % GALLERY_ITEMS_DATA.length;
  openGalleryLightbox(GALLERY_ITEMS_DATA[prevIndex].id);
}

function nextGalleryLightbox() {
  if (GALLERY_ITEMS_DATA.length === 0) return;
  const currentIndex = GALLERY_ITEMS_DATA.findIndex(i => i.id === currentLightboxGalleryId);
  const nextIndex = (currentIndex + 1) % GALLERY_ITEMS_DATA.length;
  openGalleryLightbox(GALLERY_ITEMS_DATA[nextIndex].id);
}

function closeGalleryLightbox() {
  const modal = document.getElementById("galleryLightboxModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
}

function initGalleryKeyboardNav() {
  window.addEventListener("keydown", (e) => {
    const modal = document.getElementById("galleryLightboxModal");
    if (!modal || modal.style.display === "none") return;

    if (e.key === "Escape") {
      closeGalleryLightbox();
    } else if (e.key === "ArrowLeft") {
      prevGalleryLightbox();
    } else if (e.key === "ArrowRight") {
      nextGalleryLightbox();
    }
  });
}

function orderSimilarGalleryItem(galleryId) {
  const item = GALLERY_ITEMS_DATA.find(i => i.id === galleryId);
  if (!item) return;

  closeGalleryLightbox();

  studioState.customText = item.title.toUpperCase();
  studioState.notes = `I want a T-shirt similar to Design #${item.id}: "${item.title}" (${getCategoryLabel(item.cat)})`;

  const customTextInput = document.getElementById("customTextInput");
  if (customTextInput) customTextInput.value = studioState.customText;
  const customDesignNotes = document.getElementById("customDesignNotes");
  if (customDesignNotes) customDesignNotes.value = studioState.notes;

  updateStudioPreview();
  calculateStudioPrice();

  const studio = document.getElementById("custom-studio");
  if (studio) studio.scrollIntoView({ behavior: "smooth" });
  showToast(`✨ Loaded Design #${item.id} (${item.title}) into Custom Studio!`, "info");
}

function addGalleryItemToCart(galleryId, size = 'M') {
  const item = GALLERY_ITEMS_DATA.find(i => i.id === galleryId);
  if (!item) return;

  const itemPrice = item.price || 899;
  const existing = cart.find(c => c.productId === `gal-${item.id}` && c.size === size);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      cartId: `gal-${item.id}-${size}-${Date.now()}`,
      productId: `gal-${item.id}`,
      name: item.title,
      size: size,
      color: "Midnight Black",
      price: itemPrice,
      quantity: 1,
      image: item.img
    });
  }

  saveCartToStorage();
  updateCartUI();
  openCartDrawer();
  showToast(`Added Design #${item.id} (${item.title} - ${size}) to cart! 🛒`, "success");
}

function buyNowGalleryItem(galleryId, size = 'M') {
  addGalleryItemToCart(galleryId, size);
  closeGalleryLightbox();
  closeCartDrawer();
  openCheckoutModal();
  showToast(`Proceeding to instant COD Doorstep Checkout! ⚡`, "success");
}

// ---------------------------------------------------------------------------
// 8. Shopping Cart Engine (Dual Interface: Dedicated Section + Slide-in Drawer)
// ---------------------------------------------------------------------------
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem("skb_dumkibas_cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        cart = parsed.filter(item => item && item.cartId && item.name).map(item => ({
          cartId: item.cartId,
          productId: item.productId || 'skb-item',
          name: item.name,
          size: item.size || 'M',
          color: item.color || 'Midnight Black',
          price: Number(item.price) || 899,
          quantity: Math.max(1, parseInt(item.quantity, 10) || 1),
          image: item.image || 'images/prod_black_graphic.jpg',
          customText: item.customText || '',
          placement: item.placement || '',
          font: item.font || '',
          textColor: item.textColor || '',
          notes: item.notes || ''
        }));
      } else {
        cart = [];
      }
    } else {
      cart = [];
    }
  } catch (e) {
    console.warn("Failed to parse cart from storage, resetting cart:", e);
    cart = [];
  }
  updateCartUI();
}

function saveCartToStorage() {
  try {
    localStorage.setItem("skb_dumkibas_cart", JSON.stringify(cart));
  } catch (e) {
    console.warn("Failed to persist cart to storage:", e);
  }
}

function scrollToProductsAndCloseDrawer() {
  closeCartDrawer();
  const products = document.getElementById("products");
  if (products) {
    products.scrollIntoView({ behavior: "smooth" });
  }
}

function clearEntireCart() {
  if (!cart || cart.length === 0) return;
  cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast("Your shopping cart has been cleared.", "info");
}

function quickAddToCart(productId, chosenSize = null) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const sizeToUse = chosenSize || (product.sizes && product.sizes[0]) || "M";
  const existing = cart.find(item => item.productId === productId && item.size === sizeToUse);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      cartId: `prod-${product.id}-${sizeToUse}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      size: sizeToUse,
      color: (product.colors && product.colors[0] && product.colors[0].name) || "Midnight Black",
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }

  saveCartToStorage();
  updateCartUI();
  openCartDrawer();
  showToast(`Added "${product.name}" (${sizeToUse}) to cart! 🛒`, "success");
}

function buyNowProduct(productId, chosenSize = null) {
  quickAddToCart(productId, chosenSize);
  closeQuickView();
  closeCartDrawer();
  openCheckoutModal();
}

function updateCartUI() {
  const totalUnits = cart.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 1), 0);

  // Synchronize all Cart count badges
  const badge = document.getElementById("cartBadgeCount");
  const navCount = document.getElementById("navCartCount");
  const mobileDrawerCount = document.getElementById("mobileDrawerCartCount");
  const mobileBadge = document.getElementById("mobileCartCount");
  const drawerCount = document.getElementById("drawerCartCount");
  const sectionCount = document.getElementById("sectionSummaryCount");

  if (badge) badge.textContent = totalUnits;
  if (navCount) navCount.textContent = totalUnits;
  if (mobileDrawerCount) mobileDrawerCount.textContent = totalUnits;
  if (mobileBadge) mobileBadge.textContent = totalUnits;
  if (drawerCount) drawerCount.textContent = `${totalUnits} item${totalUnits === 1 ? '' : 's'}`;
  if (sectionCount) sectionCount.textContent = `${totalUnits} item${totalUnits === 1 ? '' : 's'}`;

  // Price calculations
  const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (parseInt(item.quantity, 10) || 1)), 0);
  const freeThreshold = STORE_CONFIG.freeShippingThreshold || 2000;
  const isFree = subtotal >= freeThreshold && subtotal > 0;
  const deliveryFee = (subtotal === 0 || isFree) ? 0 : (STORE_CONFIG.flatCodShipping || 100);
  const grandTotal = subtotal + deliveryFee;

  // 1. UPDATE DEDICATED #cart SECTION
  const emptySection = document.getElementById("sectionEmptyCartState");
  const populatedSection = document.getElementById("sectionPopulatedCartState");
  const sectionItemsList = document.getElementById("sectionCartItemsList");
  const sectionSubtotalEl = document.getElementById("sectionSummarySubtotal");
  const sectionDeliveryEl = document.getElementById("sectionSummaryDelivery");
  const sectionGrandTotalEl = document.getElementById("sectionSummaryGrandTotal");

  const sectionFreeShipText = document.getElementById("sectionFreeShipText");
  const sectionFreeShipFill = document.getElementById("sectionFreeShipFill");
  const sectionFreeShipWrap = document.getElementById("sectionFreeShipWrap");

  // Update Free Shipping Progress Bar
  const progressPercent = subtotal === 0 ? 0 : Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  if (sectionFreeShipFill) sectionFreeShipFill.style.width = `${progressPercent}%`;
  if (sectionFreeShipText) {
    if (subtotal === 0) {
      sectionFreeShipText.innerHTML = `Add Rs. 2,000 more for <strong>FREE Delivery</strong> across Nepal 🇳🇵`;
      sectionFreeShipWrap?.classList.remove("free-ship-unlocked");
    } else if (subtotal < freeThreshold) {
      const remaining = freeThreshold - subtotal;
      sectionFreeShipText.innerHTML = `Add <strong>Rs. ${remaining.toLocaleString()}</strong> more for <strong>FREE Delivery</strong> across Nepal 🇳🇵`;
      sectionFreeShipWrap?.classList.remove("free-ship-unlocked");
    } else {
      sectionFreeShipText.innerHTML = `🎉 <strong>You've unlocked FREE Delivery!</strong> across all Nepal 🇳🇵`;
      sectionFreeShipWrap?.classList.add("free-ship-unlocked");
    }
  }

  if (cart.length === 0) {
    if (emptySection) emptySection.style.display = "block";
    if (populatedSection) populatedSection.style.display = "none";
  } else {
    if (emptySection) emptySection.style.display = "none";
    if (populatedSection) populatedSection.style.display = "grid";

    if (sectionItemsList) {
      sectionItemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-cart-id="${item.cartId}">
          <img src="${item.image}" class="cart-item-img" alt="${escapeHtml(item.name)}">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <div class="cart-item-specs">
              <span class="cart-spec-pill">Size: <strong>${escapeHtml(item.size)}</strong></span>
              <span class="cart-spec-pill">Color: <strong>${escapeHtml(item.color)}</strong></span>
            </div>
            ${item.viewBadge ? `<div class="cart-view-badge ${item.badgeClass || 'view-front'}">${escapeHtml(item.viewBadge)}</div>` : (item.placement ? `<div class="custom-print-badge" style="background:#E0F2FE; color:#0369A1; border-color:#BAE6FD;">📍 Placement: ${escapeHtml(item.placement)}</div>` : '')}
            ${item.customText ? `<div class="custom-print-badge">✍️ Custom Text: "${escapeHtml(item.customText)}"</div>` : ''}
            <div class="cart-item-price-unit mt-1">Rs. ${item.price.toLocaleString()} each</div>
          </div>
          <div class="cart-qty-stepper">
            <button type="button" class="cart-qty-btn" onclick="changeCartQty('${item.cartId}', -1)" aria-label="Decrease quantity">−</button>
            <span class="cart-qty-num">${item.quantity}</span>
            <button type="button" class="cart-qty-btn" onclick="changeCartQty('${item.cartId}', 1)" aria-label="Increase quantity">+</button>
          </div>
          <div class="cart-item-total-col">
            <strong class="cart-item-total-price">Rs. ${(item.price * item.quantity).toLocaleString()}</strong>
            <button type="button" class="cart-remove-item-btn" onclick="removeCartItem('${item.cartId}')" title="Remove item from cart">
              &times; Remove
            </button>
          </div>
        </div>
      `).join('');
    }

    if (sectionSubtotalEl) sectionSubtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (sectionDeliveryEl) {
      sectionDeliveryEl.textContent = isFree ? "FREE (Promo 🇳🇵)" : `Rs. ${deliveryFee}`;
      sectionDeliveryEl.className = isFree ? "summary-delivery-tag font-bold text-green" : "summary-delivery-tag";
    }
    if (sectionGrandTotalEl) sectionGrandTotalEl.textContent = `Rs. ${grandTotal.toLocaleString()}`;
  }

  // 2. UPDATE SLIDE-IN CART DRAWER
  const drawerContainer = document.getElementById("cartItemsBody");
  const drawerSubtotalEl = document.getElementById("cartSubtotal");
  const drawerShippingText = document.getElementById("cartShippingText");
  const drawerGrandTotalEl = document.getElementById("cartGrandTotal");
  const drawerFreeShipText = document.getElementById("drawerFreeShipText");
  const drawerFreeShipFill = document.getElementById("drawerFreeShipFill");

  if (drawerFreeShipFill) drawerFreeShipFill.style.width = `${progressPercent}%`;
  if (drawerFreeShipText) {
    if (subtotal === 0) {
      drawerFreeShipText.innerHTML = `Add Rs. 2,000 more for <strong>FREE Delivery</strong>`;
    } else if (subtotal < freeThreshold) {
      const remaining = freeThreshold - subtotal;
      drawerFreeShipText.innerHTML = `Add <strong>Rs. ${remaining.toLocaleString()}</strong> more for <strong>FREE Delivery</strong>`;
    } else {
      drawerFreeShipText.innerHTML = `🎉 <strong>FREE Delivery Unlocked!</strong> 🇳🇵`;
    }
  }

  if (drawerSubtotalEl) drawerSubtotalEl.textContent = `Rs. ${subtotal.toLocaleString()}`;
  if (drawerShippingText) drawerShippingText.textContent = isFree ? "Free Delivery (Promo 🇳🇵)" : `Rs. ${deliveryFee}`;
  if (drawerGrandTotalEl) drawerGrandTotalEl.textContent = `Rs. ${grandTotal.toLocaleString()}`;

  if (drawerContainer) {
    if (cart.length === 0) {
      drawerContainer.innerHTML = `
        <div class="cart-empty-state-box" style="border:none; padding: 3rem 1rem; box-shadow:none;">
          <div class="cart-empty-illustration">
            <div class="floating-bag-anim">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="empty-bag-svg">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <div class="empty-bag-sparkle">✨</div>
            </div>
          </div>
          <h3 class="empty-cart-title" style="font-size: 1.25rem;">Your cart is empty</h3>
          <p class="empty-cart-subtitle" style="font-size: 0.88rem; margin-bottom: 1.5rem;">Explore our streetwear and custom tees.</p>
          <button type="button" class="btn btn-primary explore-products-btn" onclick="scrollToProductsAndCloseDrawer()">
            🛍️ Explore Products
          </button>
        </div>
      `;
    } else {
      drawerContainer.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-cart-id="${item.cartId}">
          <img src="${item.image}" class="cart-item-img" alt="${escapeHtml(item.name)}">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <div class="cart-item-specs">
              <span class="cart-spec-pill">${escapeHtml(item.size)}</span>
              <span class="cart-spec-pill">${escapeHtml(item.color)}</span>
            </div>
            ${item.viewBadge ? `<div class="cart-view-badge ${item.badgeClass || 'view-front'}" style="font-size: 0.68rem; padding: 0.1rem 0.4rem;">${escapeHtml(item.viewBadge)}</div>` : ''}
            ${item.customText ? `<div class="custom-print-badge" style="font-size: 0.7rem; padding: 0.1rem 0.35rem;">✨ "${escapeHtml(item.customText)}"</div>` : ''}
            <div class="cart-item-price mt-1">Rs. ${(item.price * item.quantity).toLocaleString()}</div>
          </div>
          <div class="cart-item-actions">
            <div class="cart-qty-stepper">
              <button type="button" class="cart-qty-btn" onclick="changeCartQty('${item.cartId}', -1)" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button type="button" class="cart-qty-btn" onclick="changeCartQty('${item.cartId}', 1)" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="cart-remove-item-btn" onclick="removeCartItem('${item.cartId}')" title="Remove item">
              &times;
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  // 3. SYNCHRONIZE CHECKOUT MODAL IF OPEN
  const checkoutItemsList = document.getElementById("checkoutItemsList");
  const billSubtotal = document.getElementById("billSubtotal");
  const billDeliveryFeeDisplay = document.getElementById("billDeliveryFeeDisplay");
  const billGrandTotal = document.getElementById("billGrandTotal");

  if (checkoutItemsList && cart.length > 0) {
    checkoutItemsList.innerHTML = cart.map(i => `
      <div class="checkout-item-card">
        <div class="checkout-item-details">
          <span class="checkout-item-name">${escapeHtml(i.name)} × ${i.quantity}</span>
          <span class="checkout-item-meta">Size: <strong>${escapeHtml(i.size)}</strong> | Color: <strong>${escapeHtml(i.color)}</strong></span>
          ${i.viewBadge ? `<div class="cart-view-badge ${i.badgeClass || 'view-front'}" style="font-size: 0.7rem; margin-top: 0.15rem;">${escapeHtml(i.viewBadge)}</div>` : ''}
          ${i.customText ? `<span class="checkout-item-meta" style="color:#B45309; font-weight:600;">✍️ "${escapeHtml(i.customText)}"</span>` : ''}
        </div>
        <strong style="color: var(--secondary); font-size: 0.85rem; white-space: nowrap;">Rs. ${(i.price * i.quantity).toLocaleString()}</strong>
      </div>
    `).join('');
    if (billSubtotal) billSubtotal.textContent = `Rs. ${subtotal.toLocaleString()}`;
    if (billDeliveryFeeDisplay) billDeliveryFeeDisplay.textContent = isFree ? "FREE (Promo 🇳🇵)" : `Rs. ${deliveryFee}`;
    if (billGrandTotal) billGrandTotal.textContent = `Rs. ${grandTotal.toLocaleString()}`;
  }
}

function changeCartQty(cartId, delta) {
  const item = cart.find(i => i.cartId === cartId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartId !== cartId);
    showToast("Item removed from cart.", "info");
  }
  saveCartToStorage();
  updateCartUI();
}

function removeCartItem(cartId) {
  const item = cart.find(i => i.cartId === cartId);
  const name = item ? item.name : "Item";
  cart = cart.filter(i => i.cartId !== cartId);
  saveCartToStorage();
  updateCartUI();
  showToast(`Removed "${name}" from cart.`, "info");
}

function handleProceedToCheckout() {
  if (!cart || cart.length === 0) {
    showToast("Your cart is empty! Explore our tees and add items first.", "info");
    scrollToProductsAndCloseDrawer();
    return;
  }
  closeCartDrawer();
  openCheckoutModal();
}

function handleProceedToWhatsAppOrder() {
  if (!cart || cart.length === 0) {
    showToast("Your cart is empty! Add products first.", "info");
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeThreshold = STORE_CONFIG.freeShippingThreshold || 2000;
  const isFree = subtotal >= freeThreshold;
  const deliveryFee = isFree ? 0 : (STORE_CONFIG.flatCodShipping || 100);
  const grandTotal = subtotal + deliveryFee;

  const lines = cart.map((i, idx) => {
    let customDetails = '';
    if (i.viewBadge) customDetails += ` | View: ${i.viewBadge}`;
    else if (i.placement) customDetails += ` | Placement: ${i.placement}`;
    if (i.customText) customDetails += ` | Custom Text: "${i.customText}"`;
    return `${idx + 1}. *${i.name}* (Size: ${i.size}, Color: ${i.color}${customDetails}) × ${i.quantity} = Rs. ${(i.price * i.quantity).toLocaleString()}`;
  }).join('\n');

  const msg = `*🛍️ NEW CASH ON DELIVERY (COD) ORDER — SKB DUMKIBAS*\n-----------------------------------------\n${lines}\n-----------------------------------------\n*Subtotal:* Rs. ${subtotal.toLocaleString()}\n*Nepal Delivery (COD):* ${isFree ? 'FREE (Unlocked 🇳🇵)' : `Rs. ${deliveryFee}`}\n*Grand Total:* Rs. ${grandTotal.toLocaleString()}\n*Payment Method:* Cash on Delivery (COD)\n-----------------------------------------\n_Namaste! Please confirm my order and dispatch to Nepal address._`;

  window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

function openCartDrawer() {
  document.getElementById("cartDrawer")?.classList.add("active");
  document.getElementById("cartOverlay")?.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  document.getElementById("cartDrawer")?.classList.remove("active");
  document.getElementById("cartOverlay")?.classList.remove("active");
  document.body.style.overflow = "";
}

function initCartEventListeners() {
  document.getElementById("cartOpenBtn")?.addEventListener("click", openCartDrawer);
  document.getElementById("cartCloseBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);
  document.getElementById("mobileBottomCartBtn")?.addEventListener("click", openCartDrawer);
}

// ---------------------------------------------------------------------------
// 9. Nepal Administrative Address Hierarchy System
// ---------------------------------------------------------------------------
const currentAddressState = {
  province: "",
  district: "",
  municipality: "",
  ward: "",
  tole: ""
};

let activeToleHighlightIndex = -1;

function initNepalAddressSystem() {
  if (typeof NEPAL_ADMIN_DATA === "undefined") {
    console.warn("NEPAL_ADMIN_DATA not loaded.");
    return;
  }

  // 1. Populate 7 Provinces Dropdown
  const provinceOptionsList = document.getElementById("provinceOptionsList");
  if (provinceOptionsList) {
    provinceOptionsList.innerHTML = NEPAL_ADMIN_DATA.provinces.map(p => `
      <div class="dropdown-option-item" onclick="selectProvince('${escapeHtml(p)}')">
        <span>${escapeHtml(p)}</span>
      </div>
    `).join('');
  }

  // Province Control Click
  document.getElementById("provinceControl")?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleDropdown("provinceDropdownMenu");
    setTimeout(() => document.getElementById("provinceFilterInput")?.focus(), 50);
  });

  // Province search filter
  document.getElementById("provinceFilterInput")?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll("#provinceOptionsList .dropdown-option-item").forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? "flex" : "none";
    });
  });

  // District Control Click
  document.getElementById("districtControl")?.addEventListener("click", (e) => {
    if (!currentAddressState.province) {
      showToast("Please select your Province first.", "info");
      return;
    }
    e.stopPropagation();
    toggleDropdown("districtDropdownMenu");
    setTimeout(() => document.getElementById("districtFilterInput")?.focus(), 50);
  });

  document.getElementById("districtFilterInput")?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll("#districtOptionsList .dropdown-option-item").forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? "flex" : "none";
    });
  });

  // Municipality Control Click
  document.getElementById("municipalityControl")?.addEventListener("click", (e) => {
    if (!currentAddressState.district) {
      showToast("Please select your District first.", "info");
      return;
    }
    e.stopPropagation();
    toggleDropdown("municipalityDropdownMenu");
    setTimeout(() => document.getElementById("municipalityFilterInput")?.focus(), 50);
  });

  document.getElementById("municipalityFilterInput")?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase().trim();
    document.querySelectorAll("#municipalityOptionsList .dropdown-option-item").forEach(item => {
      item.style.display = item.textContent.toLowerCase().includes(q) ? "flex" : "none";
    });
  });

  // Ward Control Click
  document.getElementById("wardControl")?.addEventListener("click", (e) => {
    if (!currentAddressState.municipality) {
      showToast("Please select your Municipality / City first.", "info");
      return;
    }
    e.stopPropagation();
    toggleDropdown("wardDropdownMenu");
  });

  // -------------------------------------------------------------------------
  // Tole / Street Autocomplete Handlers
  // -------------------------------------------------------------------------
  const toleInput = document.getElementById("custTole");
  const toleWrap = document.getElementById("toleSelectWrap");

  toleInput?.addEventListener("focus", (e) => {
    if (!currentAddressState.ward) {
      showToast("Please select your Municipality and Ward No. first.", "info");
      return;
    }
    renderToleSuggestions(e.target.value);
    toleWrap?.classList.add("open");
  });

  toleInput?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentAddressState.ward) {
      renderToleSuggestions(toleInput.value);
      toleWrap?.classList.add("open");
    }
  });

  toleInput?.addEventListener("input", (e) => {
    const val = e.target.value;
    currentAddressState.tole = val;
    activeToleHighlightIndex = -1;
    if (currentAddressState.ward) {
      renderToleSuggestions(val);
      toleWrap?.classList.add("open");
    }
    updateAddressPreview();
  });

  toleInput?.addEventListener("keydown", (e) => {
    const dropdown = document.getElementById("toleDropdownMenu");
    const isOpen = toleWrap?.classList.contains("open");
    const items = document.querySelectorAll("#toleOptionsList .dropdown-option-item");

    if (!isOpen || items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeToleHighlightIndex = (activeToleHighlightIndex + 1) % items.length;
      updateToleHighlight(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeToleHighlightIndex = (activeToleHighlightIndex - 1 + items.length) % items.length;
      updateToleHighlight(items);
    } else if (e.key === "Enter") {
      if (activeToleHighlightIndex >= 0 && activeToleHighlightIndex < items.length) {
        e.preventDefault();
        items[activeToleHighlightIndex].click();
      }
    } else if (e.key === "Escape") {
      toleWrap?.classList.remove("open");
    }
  });

  // Global click to close address dropdowns
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nepal-address-select-wrap")) {
      document.querySelectorAll(".nepal-address-dropdown-menu").forEach(m => m.style.display = "none");
    }
    if (!e.target.closest("#toleSelectWrap")) {
      toleWrap?.classList.remove("open");
    }
  });

  // Saved Address Handler
  loadSavedCustomerAddress();
}

function updateToleHighlight(items) {
  items.forEach((item, idx) => {
    if (idx === activeToleHighlightIndex) {
      item.classList.add("highlighted");
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } else {
      item.classList.remove("highlighted");
    }
  });
}

function renderToleSuggestions(query) {
  const optionsList = document.getElementById("toleOptionsList");
  const header = document.getElementById("toleDropdownHeader");
  const toleWrap = document.getElementById("toleSelectWrap");
  if (!optionsList) return;

  const { province, district, municipality, ward } = currentAddressState;
  if (!municipality || !ward) {
    optionsList.innerHTML = `<div class="dropdown-empty-state">Please select Municipality &amp; Ward No. first.</div>`;
    return;
  }

  if (header) {
    header.innerHTML = `<span>📍 Suggestions for ${escapeHtml(municipality)} (Ward ${ward})</span>`;
  }

  const suggestions = filterToleSuggestions(query, province, district, municipality, ward);
  const cleanQ = (query || "").trim().toLowerCase();

  let html = '';

  // If user typed a custom query and it's not strictly equal to the first result, show a custom entry chip option
  if (cleanQ && !suggestions.some(s => s.toLowerCase() === cleanQ)) {
    html += `
      <div class="dropdown-option-item custom-entry-item" onclick="selectTole('${escapeHtml(query.trim())}')">
        <div>
          <span class="custom-icon">✍️</span>
          <strong>Use exact: "${escapeHtml(query.trim())}"</strong>
        </div>
        <small class="text-muted">Custom Tole / Street</small>
      </div>
    `;
  }

  if (suggestions.length === 0 && !cleanQ) {
    html += `<div class="dropdown-empty-state">No predefined toles found. Freely type your exact tole/street name!</div>`;
  } else {
    suggestions.forEach(item => {
      // Highlight matching query substring
      let displayItem = escapeHtml(item);
      if (cleanQ) {
        const regex = new RegExp(`(${cleanQ.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        displayItem = displayItem.replace(regex, '<mark class="autocomplete-match">$1</mark>');
      }

      html += `
        <div class="dropdown-option-item" onclick="selectTole('${escapeHtml(item)}')">
          <span class="tole-name-text">${displayItem}</span>
          <span class="select-badge">Select ↵</span>
        </div>
      `;
    });
  }

  optionsList.innerHTML = html;
  activeToleHighlightIndex = -1;
  toleWrap?.classList.add("open");
}

function selectTole(toleName) {
  const cleanName = (toleName || "").trim();
  currentAddressState.tole = cleanName;

  const toleInput = document.getElementById("custTole");
  if (toleInput) {
    toleInput.value = cleanName;
  }

  document.getElementById("toleSelectWrap")?.classList.remove("open");
  updateAddressPreview();
}

function toggleDropdown(menuId) {
  const menu = document.getElementById(menuId);
  const isOpen = menu && menu.style.display === "flex";
  document.querySelectorAll(".nepal-address-dropdown-menu").forEach(m => m.style.display = "none");
  if (menu && !isOpen) menu.style.display = "flex";
}

function selectProvince(provinceName) {
  currentAddressState.province = provinceName;
  currentAddressState.district = "";
  currentAddressState.municipality = "";
  currentAddressState.ward = "";
  currentAddressState.tole = "";

  document.getElementById("custProvinceInput").value = provinceName;
  document.getElementById("custProvince").value = provinceName;
  document.getElementById("provinceDropdownMenu").style.display = "none";

  // Enable and Populate Districts
  const districtWrap = document.getElementById("districtSelectWrap");
  const districtInput = document.getElementById("custDistrictInput");
  districtWrap.classList.remove("disabled");
  districtInput.disabled = false;
  districtInput.value = "";
  document.getElementById("custDistrict").value = "";

  // Reset downstream
  resetAddressDownstream("district");

  const districts = (NEPAL_ADMIN_DATA.districtsByProvince && NEPAL_ADMIN_DATA.districtsByProvince[provinceName]) || [];
  const districtOptionsList = document.getElementById("districtOptionsList");
  districtOptionsList.innerHTML = districts.map(d => `
    <div class="dropdown-option-item" onclick="selectDistrict('${escapeHtml(d)}')">
      <span>${escapeHtml(d)}</span>
    </div>
  `).join('');

  updateAddressPreview();
}

function selectDistrict(districtName) {
  currentAddressState.district = districtName;
  currentAddressState.municipality = "";
  currentAddressState.ward = "";
  currentAddressState.tole = "";

  document.getElementById("custDistrictInput").value = districtName;
  document.getElementById("custDistrict").value = districtName;
  document.getElementById("districtDropdownMenu").style.display = "none";

  // Enable & Populate Municipalities
  const muniWrap = document.getElementById("municipalitySelectWrap");
  const muniInput = document.getElementById("custMunicipalityInput");
  muniWrap.classList.remove("disabled");
  muniInput.disabled = false;
  muniInput.value = "";
  document.getElementById("custMunicipality").value = "";

  resetAddressDownstream("municipality");

  const locals = (NEPAL_ADMIN_DATA.localLevelsByDistrict && NEPAL_ADMIN_DATA.localLevelsByDistrict[districtName]) || [];
  const muniOptionsList = document.getElementById("municipalityOptionsList");
  muniOptionsList.innerHTML = locals.map(m => {
    let badgeClass = "badge-mun";
    if (m.type.includes("Metropolitan") && !m.type.includes("Sub")) badgeClass = "badge-metro";
    else if (m.type.includes("Sub-Metropolitan")) badgeClass = "badge-submetro";
    else if (m.type.includes("Rural")) badgeClass = "badge-rural";

    return `
      <div class="dropdown-option-item" onclick="selectMunicipality('${escapeHtml(m.name)}', ${m.wards || 12})">
        <div>
          <span>${escapeHtml(m.name)}</span>
          <small class="local-type-badge ${badgeClass}" style="margin-left: 6px;">${m.type}</small>
        </div>
        <small style="color: #64748B;">${m.wards} Wards</small>
      </div>
    `;
  }).join('');

  updateAddressPreview();
}

function selectMunicipality(muniName, totalWards) {
  currentAddressState.municipality = muniName;
  currentAddressState.ward = "";
  currentAddressState.tole = "";

  document.getElementById("custMunicipalityInput").value = muniName;
  document.getElementById("custMunicipality").value = muniName;
  document.getElementById("municipalityDropdownMenu").style.display = "none";

  // Enable & Populate Wards
  const wardWrap = document.getElementById("wardSelectWrap");
  const wardInput = document.getElementById("custWardInput");
  wardWrap.classList.remove("disabled");
  wardInput.disabled = false;
  wardInput.value = "";
  document.getElementById("custWard").value = "";

  resetAddressDownstream("ward");

  const wardOptionsList = document.getElementById("wardOptionsList");
  const wardCount = totalWards || 15;
  let wardItemsHtml = '';
  for (let i = 1; i <= wardCount; i++) {
    wardItemsHtml += `
      <div class="dropdown-option-item ward-item" onclick="selectWard(${i})">
        <span>Ward ${i}</span>
      </div>
    `;
  }
  wardOptionsList.innerHTML = wardItemsHtml;

  updateAddressPreview();
}

function selectWard(wardNumber) {
  currentAddressState.ward = String(wardNumber);
  currentAddressState.tole = "";

  document.getElementById("custWardInput").value = `Ward ${wardNumber}`;
  document.getElementById("custWard").value = String(wardNumber);
  document.getElementById("wardDropdownMenu").style.display = "none";

  // Enable Tole input and reset value
  const toleInput = document.getElementById("custTole");
  toleInput.disabled = false;
  toleInput.value = "";
  toleInput.focus();

  // Load and show initial suggestions for this selected ward
  renderToleSuggestions("");
  document.getElementById("toleSelectWrap")?.classList.add("open");

  updateAddressPreview();
}

function resetAddressDownstream(level) {
  if (level === "district") {
    document.getElementById("municipalitySelectWrap").classList.add("disabled");
    document.getElementById("custMunicipalityInput").disabled = true;
    document.getElementById("custMunicipalityInput").value = "";
    document.getElementById("custMunicipality").value = "";
  }
  if (level === "district" || level === "municipality") {
    document.getElementById("wardSelectWrap").classList.add("disabled");
    document.getElementById("custWardInput").disabled = true;
    document.getElementById("custWardInput").value = "";
    document.getElementById("custWard").value = "";
  }
  const toleInput = document.getElementById("custTole");
  toleInput.disabled = true;
  toleInput.value = "";
  document.getElementById("toleSelectWrap")?.classList.remove("open");
  const optionsList = document.getElementById("toleOptionsList");
  if (optionsList) optionsList.innerHTML = "";
}

function updateAddressPreview() {
  const card = document.getElementById("addressPreviewCard");
  const body = document.getElementById("addressPreviewBody");
  const status = document.getElementById("previewStatus");
  if (!body) return;

  const { province, district, municipality, ward, tole } = currentAddressState;
  const isComplete = province && district && municipality && ward && tole;

  if (status) {
    status.textContent = isComplete ? "✓ Complete Destination" : "Incomplete";
    status.className = isComplete ? "preview-status complete" : "preview-status";
  }

  if (card) {
    if (isComplete) card.classList.add("complete");
    else card.classList.remove("complete");
  }

  if (!province && !district && !municipality) {
    body.innerHTML = `<p class="text-muted">Fill in your delivery address above to see the complete destination breakdown.</p>`;
    return;
  }

  body.innerHTML = `
    <div class="preview-line-tole">📍 <strong>${escapeHtml(tole || '[Tole / Street]')}</strong>, Ward ${ward || '[?]'}</div>
    <div class="preview-line-admin">🏛️ ${escapeHtml(municipality || '[Municipality / City]')}, ${escapeHtml(district || '[District]')}</div>
    <div class="preview-line-admin">🇳🇵 ${escapeHtml(province || '[Province]')}, Nepal</div>
  `;
}

function loadSavedCustomerAddress() {
  try {
    const saved = localStorage.getItem("skb_saved_address");
    if (saved) {
      const parsed = JSON.parse(saved);
      const chip = document.getElementById("savedAddressChip");
      const text = document.getElementById("savedAddressText");
      if (chip && text && parsed.tole) {
        text.textContent = `Saved: ${parsed.tole}, ${parsed.municipality || ''}`;
        chip.style.display = "inline-flex";

        document.getElementById("applySavedAddressBtn").onclick = () => {
          document.getElementById("custFullName").value = parsed.name || "";
          document.getElementById("custPhone").value = parsed.phone || "";
          document.getElementById("custEmail").value = parsed.email || "";
          if (parsed.province) selectProvince(parsed.province);
          if (parsed.district) selectDistrict(parsed.district);
          if (parsed.municipality) selectMunicipality(parsed.municipality, parsed.wards || 15);
          if (parsed.ward) selectWard(parsed.ward);
          if (parsed.tole) {
            selectTole(parsed.tole);
          }
          updateAddressPreview();
          showToast("Saved Nepal address applied! 📍", "success");
        };

        document.getElementById("clearSavedAddressBtn").onclick = () => {
          localStorage.removeItem("skb_saved_address");
          chip.style.display = "none";
        };
      }
    }
  } catch (e) { }
}

// ---------------------------------------------------------------------------
// 10. Checkout & Real Order Placement Engine
// ---------------------------------------------------------------------------
function openCheckoutModal() {
  const modal = document.getElementById("checkoutModalOverlay");
  if (!modal) return;

  // Render items summary
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeThreshold = STORE_CONFIG.freeShippingThreshold || 2000;
  const isFree = subtotal >= freeThreshold;
  const shippingFee = isFree ? 0 : (STORE_CONFIG.flatCodShipping || 100);
  const grandTotal = subtotal + shippingFee;

  document.getElementById("billSubtotal").textContent = `Rs. ${subtotal.toLocaleString()}`;
  document.getElementById("billDeliveryFeeDisplay").textContent = isFree ? "FREE (Orders Rs. 2,000+)" : `Rs. ${shippingFee}`;
  document.getElementById("billGrandTotal").textContent = `Rs. ${grandTotal.toLocaleString()}`;

  const itemsList = document.getElementById("checkoutItemsList");
  if (itemsList) {
    itemsList.innerHTML = cart.map(i => `
      <div class="checkout-item-card">
        <div class="checkout-item-details">
          <span class="checkout-item-name">${escapeHtml(i.name)} × ${i.quantity}</span>
          <span class="checkout-item-meta">Size: <strong>${escapeHtml(i.size)}</strong> | Color: <strong>${escapeHtml(i.color)}</strong></span>
          ${i.viewBadge ? `<div class="cart-view-badge ${i.badgeClass || 'view-front'}" style="font-size: 0.7rem; margin-top: 0.15rem;">${escapeHtml(i.viewBadge)}</div>` : ''}
          ${i.customText ? `<span class="checkout-item-meta" style="color:#B45309; font-weight:600;">✍️ "${escapeHtml(i.customText)}"</span>` : ''}
        </div>
        <strong style="color: var(--secondary); font-size: 0.85rem; white-space: nowrap;">Rs. ${(i.price * i.quantity).toLocaleString()}</strong>
      </div>
    `).join('');
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  document.getElementById("checkoutModalOverlay")?.classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("checkoutCloseBtn")?.addEventListener("click", closeCheckoutModal);

function validateNepalPhoneNumber(phone) {
  if (!phone) {
    return { valid: false, message: "Please enter your Nepal Mobile Number." };
  }
  const clean = String(phone).replace(/\s+/g, '').replace(/^[+]977/, '');
  if (!/^[0-9]{10}$/.test(clean)) {
    return { valid: false, message: "Please enter a valid 10-digit Nepal mobile number." };
  }
  if (!/^(98|97|96)/.test(clean)) {
    return { valid: false, message: "Nepal mobile numbers must start with 98 or 97." };
  }
  return { valid: true, normalized: clean };
}

// ---------------------------------------------------------------------------
// Direct Web3Forms Order Email Dispatcher
// ---------------------------------------------------------------------------
async function sendOrderWeb3FormsNotification(order) {
  try {
    const accessKey = "c5048706-1d4c-48cf-8e25-d4af4d140e4b";
    const itemsText = (order.items || []).map(i => {
      let customInfo = '';
      if (i.viewBadge) customInfo += ` [Print View: ${i.viewBadge}]`;
      else if (i.placement) customInfo += ` [Placement: ${i.placement}]`;
      if (i.customText) customInfo += ` [Custom Text: "${i.customText}"]`;
      return `• ${i.name} (Size: ${i.size}, Color: ${i.color}${customInfo}) × ${i.quantity} — Rs. ${(i.price * i.quantity).toLocaleString()}`;
    }).join('\n');

    const addressText = order.address?.formatted ||
      `${order.address?.tole || ''}, Ward ${order.address?.ward || ''}, ${order.address?.municipality || ''}, ${order.address?.district || ''}, ${order.address?.province || ''}, Nepal`;

    const payload = {
      access_key: accessKey,
      subject: `New Cash on Delivery Order #${order.id} (Rs. ${(order.grandTotal || 0).toLocaleString()}) - SKB Dumkibas`,
      from_name: "SKB T-Shirt Printing Online Store",
      order_id: order.id,
      customer_name: order.customer?.name,
      customer_phone: order.customer?.phone,
      customer_email: order.customer?.email || "N/A",
      delivery_address: addressText,
      ordered_items: itemsText,
      subtotal: `Rs. ${(order.subtotal || 0).toLocaleString()}`,
      delivery_fee: order.deliveryFee === 0 ? "FREE (Promo)" : `Rs. ${(order.deliveryFee || 0).toLocaleString()}`,
      grand_total: `Rs. ${(order.grandTotal || 0).toLocaleString()}`,
      payment_method: order.paymentMethod || "Cash on Delivery (COD)",
      customer_notes: order.notes || "None",
      order_timestamp: new Date(order.createdAt || Date.now()).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    try {
      return await res.json();
    } catch (e) {
      return { success: res.ok };
    }
  } catch (err) {
    console.warn("Client Web3Forms order dispatch warning:", err);
  }
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (!cart || cart.length === 0) {
    showToast("Your cart is empty! Please add products before checkout.", "error");
    closeCheckoutModal();
    scrollToProductsAndCloseDrawer();
    return;
  }

  const name = document.getElementById("custFullName").value.trim();
  const phone = document.getElementById("custPhone").value.trim();
  const email = document.getElementById("custEmail")?.value.trim() || "";
  const notes = document.getElementById("custOrderNotes")?.value.trim() || "";
  const saveAddress = document.getElementById("saveAddressCheckbox")?.checked;

  const toleInputVal = document.getElementById("custTole")?.value.trim() || "";
  const tole = currentAddressState.tole || toleInputVal;
  const { province, district, municipality, ward } = currentAddressState;

  if (!name) {
    showToast("Please enter your Full Name *.", "error");
    document.getElementById("custFullName")?.focus();
    return;
  }

  const phoneValidation = validateNepalPhoneNumber(phone);
  if (!phoneValidation.valid) {
    showToast(phoneValidation.message, "error");
    document.getElementById("custPhone")?.focus();
    return;
  }

  if (!province) {
    showToast("Please select your Province.", "error");
    return;
  }
  if (!district) {
    showToast("Please select your District.", "error");
    return;
  }
  if (!municipality) {
    showToast("Please select your Municipality / City.", "error");
    return;
  }
  if (!ward) {
    showToast("Please select your Ward No.", "error");
    return;
  }
  if (!tole) {
    showToast("Please enter or select your Tole / Street.", "error");
    document.getElementById("custTole")?.focus();
    return;
  }

  const formattedAddress = `${tole}, Ward ${ward}, ${municipality}, ${district}, ${province}, Nepal`;

  const placeBtn = document.getElementById("placeCodOrderBtn");
  if (placeBtn) {
    placeBtn.disabled = true;
    placeBtn.textContent = "Processing Order...";
  }

  if (saveAddress) {
    localStorage.setItem("skb_saved_address", JSON.stringify({
      name, phone, email, province, district, municipality, ward, tole
    }));
  }

  const orderPayload = {
    customer: { name, phone, email },
    address: {
      province,
      district,
      municipality,
      ward: String(ward),
      tole: tole,
      formatted: formattedAddress
    },
    items: cart,
    notes: notes
  };

  try {
    const res = await apiFetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload)
    });

    let data = null;
    try {
      data = await res.json();
    } catch (parseErr) {
      data = null;
    }

    if (res && res.ok && data && data.success) {
      // Dispatch Web3Forms notification
      sendOrderWeb3FormsNotification(data.order);

      // Clear Cart
      cart = [];
      saveCartToStorage();
      updateCartUI();
      closeCheckoutModal();

      // Save order to customer local history
      saveLocalOrder(data.order);

      // Show Order Confirmation
      showOrderConfirmation(data.order);
      return;
    } else if (data && data.error) {
      showToast(data.error, "error");
      return;
    }
    throw new Error(data && data.error ? data.error : "Backend order service unreachable");
  } catch (err) {
    console.warn("Order submission fallback triggered:", err);

    // Resilient Local Order Fallback
    const localIdCounter = (parseInt(localStorage.getItem('skb_local_counter') || '100', 10) + 1);
    localStorage.setItem('skb_local_counter', String(localIdCounter));
    const fallbackOrderId = `SKB-2026-${String(localIdCounter).padStart(6, '0')}`;

    const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (parseInt(item.quantity, 10) || 1)), 0);
    const freeThreshold = STORE_CONFIG.freeShippingThreshold || 2000;
    const isFree = subtotal >= freeThreshold;
    const deliveryFee = isFree ? 0 : (STORE_CONFIG.flatCodShipping || 100);
    const grandTotal = subtotal + deliveryFee;

    const localOrder = {
      id: fallbackOrderId,
      customer: { name, phone, email },
      address: {
        province,
        district,
        municipality,
        ward: String(ward),
        tole: tole,
        formatted: formattedAddress
      },
      items: JSON.parse(JSON.stringify(cart)),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: 0,
      grandTotal: grandTotal,
      paymentMethod: "Cash on Delivery (COD)",
      status: "Pending",
      notes: notes,
      courierNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isOffline: true
    };

    // Dispatch Web3Forms notification even in offline/client mode
    sendOrderWeb3FormsNotification(localOrder);

    // Save order locally for tracking & persistence
    saveLocalOrder(localOrder);

    // Clear Cart
    cart = [];
    saveCartToStorage();
    updateCartUI();
    closeCheckoutModal();

    // Show Order Confirmation Modal
    showOrderConfirmation(localOrder);
    showToast("Order placed successfully! Tap 'Confirm on WhatsApp' to dispatch 🚀", "success");
  } finally {
    if (placeBtn) {
      placeBtn.disabled = false;
      placeBtn.textContent = "🚀 Place Cash on Delivery Order";
    }
  }
}

function showOrderConfirmation(order) {
  const modal = document.getElementById("orderConfirmationModalOverlay");
  if (!modal) return;

  const orderIdEl = document.getElementById("confirmationOrderIdDisplay");
  if (orderIdEl) orderIdEl.textContent = `Order ID: ${order.id}`;

  const totalEl = document.getElementById("confirmationTotalAmount");
  if (totalEl) totalEl.textContent = `Rs. ${(order.grandTotal || 0).toLocaleString()}`;

  const summary = document.getElementById("confirmationDetailsSummary");
  if (summary) {
    const itemsListHtml = (order.items || []).map(i => {
      let customInfo = '';
      if (i.viewBadge) customInfo += ` <span style="display:inline-block; font-size:0.75rem; background:#E0F2FE; color:#0369A1; padding:0.1rem 0.4rem; border-radius:4px; margin-left:0.25rem; font-weight:600;">${escapeHtml(i.viewBadge)}</span>`;
      else if (i.placement) customInfo += ` <span style="display:inline-block; font-size:0.75rem; background:#E0F2FE; color:#0369A1; padding:0.1rem 0.4rem; border-radius:4px; margin-left:0.25rem; font-weight:600;">📍 ${escapeHtml(i.placement)}</span>`;
      if (i.customText) customInfo += ` <span style="color:#B45309; font-size:0.78rem;">(Text: "${escapeHtml(i.customText)}")</span>`;
      return `<li style="margin-bottom:0.35rem;"><strong>${escapeHtml(i.name)}</strong> (${escapeHtml(i.size)} / ${escapeHtml(i.color)}) × ${i.quantity} ${customInfo} &mdash; <strong>Rs. ${(i.price * i.quantity).toLocaleString()}</strong></li>`;
    }).join('');

    summary.innerHTML = `
      <div class="confirmation-info-block" style="font-size: 0.85rem; line-height: 1.6; text-align: left; background: #F8FAFC; padding: 1.15rem; border-radius: 10px; border: 1px solid #E2E8F0;">
        <div style="margin-bottom: 0.5rem;"><strong>👤 Customer:</strong> ${escapeHtml(order.customer.name)} (${escapeHtml(order.customer.phone)})</div>
        <div style="margin-bottom: 0.5rem;"><strong>📍 Delivery Address:</strong> ${escapeHtml(order.address.formatted || `${order.address.tole}, Ward ${order.address.ward}, ${order.address.municipality}, ${order.address.district}, ${order.address.province}, Nepal`)}</div>
        <div style="margin-bottom: 0.5rem;">
          <strong>👕 Ordered Products:</strong>
          <ul style="margin: 0.35rem 0 0.35rem 1.25rem; padding: 0; font-size: 0.82rem;">
            ${itemsListHtml}
          </ul>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px dashed #CBD5E1; padding-top: 0.4rem; margin-top: 0.4rem;">
          <span>Subtotal:</span>
          <strong>Rs. ${(order.subtotal || 0).toLocaleString()}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Nepal Delivery (COD):</span>
          <strong style="color: #059669;">${order.deliveryFee === 0 ? 'FREE (Promo 🇳🇵)' : `Rs. ${order.deliveryFee}`}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 800; border-top: 1px solid #CBD5E1; padding-top: 0.4rem; margin-top: 0.4rem; color: #0F172A;">
          <span>Grand Total (Pay at Doorstep):</span>
          <span>Rs. ${(order.grandTotal || 0).toLocaleString()}</span>
        </div>
        <div style="margin-top: 0.5rem; font-size: 0.78rem; color: #166534; background: #DCFCE7; padding: 0.3rem 0.6rem; border-radius: 6px; border: 1px solid #BBF7D0;">
          💵 <strong>Payment Method:</strong> Cash on Delivery (COD) &bull; Pay cash when package arrives at your doorstep
        </div>
      </div>
    `;
  }

  const waBtn = document.getElementById("orderConfirmationWaBtn");
  if (waBtn) {
    waBtn.onclick = () => {
      const itemsText = (order.items || []).map(i => {
        let customInfo = '';
        if (i.viewBadge) customInfo += ` [View: ${i.viewBadge}]`;
        else if (i.placement) customInfo += ` [Placement: ${i.placement}]`;
        if (i.customText) customInfo += ` [Text: "${i.customText}"]`;
        return `• ${i.name} (${i.size}, ${i.color}${customInfo}) × ${i.quantity}`;
      }).join('\n');
      const msg = `*🎉 CONFIRMING CASH ON DELIVERY ORDER — #${order.id}*\n-----------------------------------------\n*Customer:* ${order.customer.name} (${order.customer.phone})\n*Destination:* ${order.address.formatted || `${order.address.tole}, Ward ${order.address.ward}, ${order.address.municipality}, ${order.address.district}`}\n-----------------------------------------\n*Products:*\n${itemsText}\n-----------------------------------------\n*Total (COD):* Rs. ${(order.grandTotal || 0).toLocaleString()}\n\n_Namaste SKB T-Shirt Printing Dumkibas! I have placed this order on your website. Please verify and dispatch!_`;
      window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    };
  }

  const continueBtn = document.getElementById("orderConfirmationContinueBtn");
  if (continueBtn) {
    continueBtn.onclick = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
      scrollToProductsAndCloseDrawer();
    };
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// ---------------------------------------------------------------------------
// 11. Real Public Order Tracking Modal Engine
// ---------------------------------------------------------------------------
function openTrackOrderModal() {
  document.getElementById("trackOrderModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeTrackOrderModal() {
  document.getElementById("trackOrderModal").style.display = "none";
  document.body.style.overflow = "";
}

document.getElementById("openTrackOrderBtn")?.addEventListener("click", openTrackOrderModal);

async function handleTrackOrderSubmit(e) {
  e.preventDefault();
  const query = document.getElementById("trackQueryInput").value.trim();
  if (!query) return;

  const btn = document.getElementById("trackSearchBtn");
  const resultsWrap = document.getElementById("trackingResultsWrap");
  const emptyState = document.getElementById("trackingEmptyState");

  btn.disabled = true;
  btn.textContent = "Searching...";
  resultsWrap.style.display = "none";
  emptyState.style.display = "none";

  let serverData = [];
  try {
    const res = await apiFetch(`/api/orders/track/${encodeURIComponent(query)}`);
    if (res && res.ok) {
      serverData = await res.json();
    }
  } catch (err) {
    console.warn("Tracking server query note:", err);
  }

  // Merge with local orders
  const localOrders = getLocalOrders();
  const matchedLocal = localOrders.filter(o =>
    (o.id && o.id.toLowerCase() === query.toLowerCase()) ||
    (o.customer && o.customer.phone === query)
  ).map(o => ({
    id: o.id,
    status: o.status || "Pending",
    createdAt: o.createdAt || new Date().toISOString(),
    updatedAt: o.updatedAt || new Date().toISOString(),
    customerName: (o.customer?.name ? o.customer.name.split(' ')[0] : 'Customer') + ' ***',
    destination: o.address?.formatted || `${o.address?.municipality || ''}, ${o.address?.district || ''}, ${o.address?.province || ''}`,
    items: (o.items || []).map(it => ({
      name: it.name,
      size: it.size,
      color: it.color,
      quantity: it.quantity,
      image: it.image
    })),
    grandTotal: o.grandTotal,
    paymentMethod: o.paymentMethod || "Cash on Delivery (COD)",
    courierNotes: o.courierNotes || "Order recorded in Dumkibas system"
  }));

  const combined = Array.isArray(serverData) ? [...serverData] : [];
  matchedLocal.forEach(lo => {
    if (!combined.some(co => co.id === lo.id)) {
      combined.push(lo);
    }
  });

  if (combined.length > 0) {
    resultsWrap.style.display = "block";
    resultsWrap.innerHTML = combined.map(order => renderTrackingCard(order)).join('');
  } else {
    emptyState.style.display = "block";
    document.getElementById("trackingEmptyTitle").textContent = "No Order Found";
    document.getElementById("trackingEmptyText").textContent = `No active orders matching "${query}". Please check your Order ID or phone number.`;
  }
  btn.disabled = false;
  btn.textContent = "🔍 Search Status";
}

function renderTrackingCard(order) {
  const steps = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];
  const currIndex = steps.indexOf(order.status);
  const isCancelled = order.status === "Cancelled";

  return `
    <div class="tracking-card">
      <div class="tracking-header">
        <div>
          <h4 style="font-size: 1.1rem; color: #0F172A;">Order ${order.id}</h4>
          <small style="color: #64748B;">Placed on ${new Date(order.createdAt).toLocaleDateString()}</small>
        </div>
        <span class="status-pill ${order.status.toLowerCase()}">${order.status}</span>
      </div>

      ${isCancelled ? `
        <div style="background: rgba(239,68,68,0.1); color: #EF4444; padding: 1rem; border-radius: 8px; text-align: center; font-weight: 700;">
          ❌ This order was cancelled.
        </div>
      ` : `
        <div class="tracking-step-timeline">
          ${steps.map((step, idx) => {
    const isDone = idx < currIndex;
    const isActive = idx === currIndex;
    return `
              <div class="tracking-step ${isDone ? 'completed' : ''} ${isActive ? 'active' : ''}">
                <div class="step-circle">${isDone ? '✓' : (idx + 1)}</div>
                <div class="step-label">${step}</div>
              </div>
            `;
  }).join('')}
        </div>
      `}

      <div class="tracking-info-grid mt-3">
        <div>
          <small style="color: #64748B;">Destination:</small>
          <div><strong>📍 ${escapeHtml(order.destination)}</strong></div>
        </div>
        <div>
          <small style="color: #64748B;">Courier Tracking Note:</small>
          <div><strong>${order.courierNotes ? escapeHtml(order.courierNotes) : 'Dispatched from Dumkibas hub'}</strong></div>
        </div>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// 12. Quick View Modal & FAQ Accordion
// ---------------------------------------------------------------------------
function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  let selectedQuickSize = (product.sizes && product.sizes[0]) || "M";

  const content = document.getElementById("quickViewContent");
  content.innerHTML = `
      <div class="quick-view-img-col">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" class="quick-view-img">
      </div>
      <div class="quick-view-details-col">
        <span class="product-cat">${getCategoryLabel(product.category)}</span>
        <h2 style="font-size: 1.4rem; margin: 0.35rem 0;">${escapeHtml(product.name)}</h2>
        
        <div class="product-price-row mb-3">
          <span class="current-price" style="font-size: 1.35rem;">Rs. ${product.price.toLocaleString()}</span>
          ${product.discountPrice ? `<span class="original-price">Rs. ${product.discountPrice.toLocaleString()}</span>` : ''}
        </div>

        <p style="color: #475569; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.25rem;">
          ${escapeHtml(product.description)}
        </p>

        <div class="form-group">
          <label class="form-label">Select Size:</label>
          <div class="size-pill-group" id="quickViewSizes">
            ${(product.sizes || ["S", "M", "L", "XL", "XXL"]).map((s, idx) => `<button type="button" class="size-pill ${idx === 0 ? 'active' : ''}" data-size="${s}">${s}</button>`).join('')}
          </div>
        </div>

        <div class="mt-4" style="display: flex; flex-direction: column; gap: 0.6rem;">
          <div style="display: flex; gap: 0.6rem;">
            <button class="btn btn-primary btn-lg flex-1" id="quickViewAddBtn">
              🛒 Add to Cart
            </button>
            <button class="btn btn-secondary btn-lg flex-1" id="quickViewBuyBtn" style="background: #10B981; color: #FFFFFF; border-color: #10B981;">
              ⚡ Buy Now (COD)
            </button>
          </div>
          <button class="btn btn-whatsapp btn-lg w-100" onclick="orderProductOnWhatsApp('${product.id}');">
            💬 Order on WhatsApp
          </button>
        </div>
      </div>
    `;

  document.querySelectorAll("#quickViewSizes .size-pill").forEach(p => {
    p.addEventListener("click", () => {
      document.querySelectorAll("#quickViewSizes .size-pill").forEach(b => b.classList.remove("active"));
      p.classList.add("active");
      selectedQuickSize = p.dataset.size;
    });
  });

  document.getElementById("quickViewAddBtn").onclick = () => {
    quickAddToCart(product.id, selectedQuickSize);
    closeQuickView();
  };

  document.getElementById("quickViewBuyBtn").onclick = () => {
    buyNowProduct(product.id, selectedQuickSize);
  };

  const modal = document.getElementById("quickViewModalOverlay");
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  document.getElementById("quickViewModalOverlay")?.classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("quickViewCloseBtn")?.addEventListener("click", closeQuickView);

function initFaqAccordion() {
  document.querySelectorAll(".faq-question-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      item.classList.toggle("active");
    });
  });
}

function initNavigationEventListeners() {
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const drawerCloseBtn = document.getElementById("drawerCloseBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const drawerOverlay = document.getElementById("drawerOverlay");

  const toggle = (open) => {
    if (open) {
      mobileDrawer?.classList.add("active");
      drawerOverlay?.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      mobileDrawer?.classList.remove("active");
      drawerOverlay?.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  if (mobileBtn) mobileBtn.addEventListener("click", () => toggle(true));
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", () => toggle(false));
  if (drawerOverlay) drawerOverlay.addEventListener("click", () => toggle(false));

  document.querySelectorAll(".mobile-nav-link").forEach(l => l.addEventListener("click", () => toggle(false)));

  // Size Guide
  document.getElementById("openSizeGuideBtn")?.addEventListener("click", () => {
    document.getElementById("sizeGuideModalOverlay")?.classList.add("active");
  });
  document.getElementById("sizeGuideCloseBtn")?.addEventListener("click", () => {
    document.getElementById("sizeGuideModalOverlay")?.classList.remove("active");
  });
}

// WhatsApp Direct Product Action
function orderProductOnWhatsApp(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  const msg = `Namaste SKB Dumkibas! I want to order "${product.name}" for Rs. ${product.price} with Cash on Delivery (COD).`;
  window.open(`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Quick Contact Form Submit Handler
async function handleQuickContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("quickContactForm") || e.target;
  const submitBtn = form?.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : "Send Inquiry";

  const name = document.getElementById("contactName")?.value.trim() || "Customer";
  const phone = document.getElementById("contactPhone")?.value.trim() || "";
  const location = document.getElementById("contactLocation")?.value.trim() || "";
  const message = document.getElementById("contactMessage")?.value.trim() || "";

  if (submitBtn) {
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
  }

  try {
    const formData = new FormData(form);
    formData.append("access_key", "c5048706-1d4c-48cf-8e25-d4af4d140e4b");
    formData.append("subject", `New Inquiry from ${name} (${phone}) - SKB Dumkibas`);
    formData.append("from_name", "SKB Website Contact Form");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok && data.success) {
      showToast("Success! Your message has been sent to SKB Dumkibas.", "success");
      form?.reset();
    } else {
      showToast(data.message || "Message processed. Opening WhatsApp...", "info");
    }
  } catch (error) {
    console.warn("Contact form error:", error);
    showToast("Message recorded! Opening WhatsApp...", "info");
  } finally {
    if (submitBtn) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  }

  // Also open WhatsApp directly for instant communication
  const waMsg =
    `*💬 CUSTOMER INQUIRY — SKB T-SHIRT PRINTING DUMKIBAS*\n` +
    `-----------------------------------------\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Location/City:* ${location}\n` +
    `*Inquiry / Printing Request:*\n${message}\n` +
    `-----------------------------------------\n` +
    `_Sent via SKB Printing Website Contact Form_`;

  const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;
  window.open(waUrl, "_blank");
}

// Customer Account Modal
function openCustomerAccountModal() {
  document.getElementById("customerAccountModal").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeCustomerAccountModal() {
  document.getElementById("customerAccountModal").style.display = "none";
  document.body.style.overflow = "";
}

document.getElementById("openCustomerAccountBtn")?.addEventListener("click", openCustomerAccountModal);

async function lookupCustomerAccount() {
  const phone = document.getElementById("accountPhoneInput").value.trim();
  if (!phone || phone.length !== 10) {
    showToast("Please enter a valid 10-digit mobile phone number.", "error");
    return;
  }

  const display = document.getElementById("accountDetailsDisplay");
  display.style.display = "block";
  display.innerHTML = `<p class="text-muted">Loading account data...</p>`;

  let orders = [];
  try {
    const res = await apiFetch(`/api/orders/track/${encodeURIComponent(phone)}`);
    if (res && res.ok) {
      orders = await res.json();
    }
  } catch (e) {
    console.warn("Account lookup server note:", e);
  }

  // Merge with local orders
  const localOrders = getLocalOrders().filter(o => o.customer && o.customer.phone === phone);
  localOrders.forEach(lo => {
    if (!orders.some(o => o.id === lo.id)) {
      orders.push(lo);
    }
  });

  if (Array.isArray(orders) && orders.length > 0) {
    display.innerHTML = `
      <div style="background: #F8FAFC; padding: 1rem; border-radius: 8px; border: 1px solid #E2E8F0;">
        <h4 style="color: #0F172A; margin-bottom: 0.5rem;">Verified Customer Profile</h4>
        <div>📞 Mobile: <strong>${escapeHtml(phone)}</strong></div>
        <div>📦 Total Orders: <strong>${orders.length}</strong></div>
        <div class="mt-2" style="font-size: 0.8rem; color: #64748B;">
          <strong>Recent Orders:</strong>
          ${orders.map(o => `<div class="mt-1">• ${escapeHtml(o.id)} - ${escapeHtml(o.status || 'Pending')} (Rs. ${(o.grandTotal || 0).toLocaleString()})</div>`).join('')}
        </div>
      </div>
    `;
  } else {
    display.innerHTML = `<p class="text-muted">No orders associated with ${escapeHtml(phone)} yet. Place an order to create your customer history!</p>`;
  }
}

// Privacy & Terms Modals
function openPrivacyModal() { document.getElementById("privacyModal").style.display = "flex"; }
function closePrivacyModal() { document.getElementById("privacyModal").style.display = "none"; }
function openTermsModal() { document.getElementById("termsModal").style.display = "flex"; }
function closeTermsModal() { document.getElementById("termsModal").style.display = "none"; }

// Utilities
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type === 'success' ? 'toast-success' : (type === 'error' ? 'toast-error' : '')}`;

  const icon = type === 'success' ? '✅' : (type === 'error' ? '⚠️' : 'ℹ️');
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
