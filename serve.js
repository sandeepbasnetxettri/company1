/**
 * SKB T-Shirt Printing Dumkibas — Unified Backend Server & REST API Engine
 * Platform: Node.js (Standard Built-in Library)
 * Location: Dumkibas, Nawalparasi, Nepal
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'data', 'db.json');
const DB_TMP_PATH = path.join(__dirname, 'data', 'db.json.tmp');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure required directories exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-Memory Session Store & Rate Limiting
const activeSessions = new Map(); // token -> { username, createdAt, expiresAt }
const loginRateLimit = new Map(); // ip -> { count, lastAttempt, lockedUntil }
let dbWriteLock = Promise.resolve();

// MIME Types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain; charset=utf-8'
};

// ---------------------------------------------------------------------------
// 1. Password Hashing & Crypto Security (Node crypto.scrypt)
// ---------------------------------------------------------------------------
function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password, hash, salt) {
  try {
    const derived = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(derived, 'hex'), Buffer.from(hash, 'hex'));
  } catch (e) {
    return false;
  }
}

function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

// ---------------------------------------------------------------------------
// 2. Atomic Database Engine
// ---------------------------------------------------------------------------
function readDatabase() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      initDefaultDatabase();
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading database:', err);
    return null;
  }
}

function writeDatabaseAtomic(data) {
  dbWriteLock = dbWriteLock.then(() => {
    return new Promise((resolve, reject) => {
      try {
        const json = JSON.stringify(data, null, 2);
        fs.writeFileSync(DB_TMP_PATH, json, 'utf-8');
        fs.renameSync(DB_TMP_PATH, DB_PATH);
        resolve(true);
      } catch (err) {
        console.error('Error atomic writing database:', err);
        reject(err);
      }
    });
  });
  return dbWriteLock;
}

function initDefaultDatabase() {
  const initialPass = process.env.ADMIN_INITIAL_PASSWORD || 'skbAdmin2026!';
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(initialPass, salt);

  const defaultDb = {
    settings: {
      businessName: "SKB T-Shirt Printing Dumkibas",
      tagline: "Custom T-Shirts. Your Design. Your Style.",
      logo: "images/logo.svg",
      phone: "+977 9768827327",
      whatsapp: "9779768827327",
      email: "skbtshirtprinting@gmail.com",
      address: "Dumkibas Main Bazaar, Nawalparasi, Gandaki Province, Nepal",
      flatDeliveryFee: 100,
      freeDeliveryThreshold: 2000,
      codEnabled: true,
      heroTitle: "Custom T-Shirts",
      heroHighlight: "Made Your Way",
      heroSubtitle: "Premium T-Shirt Printing in Dumkibas — Delivered Across Nepal with Cash on Delivery (COD).",
      facebookUrl: "https://www.facebook.com/profile.php?id=61590619139371",
      instagramUrl: "https://www.instagram.com/skb_t_shirt_printing/",
      tiktokUrl: "https://www.tiktok.com/@skb_t_shirt_printing"
    },
    admin: {
      username: "skbtshirtprinting@gmail.com",
      salt: salt,
      passwordHash: hash,
      isFirstLogin: true,
      updatedAt: new Date().toISOString()
    },
    orderCounter: 100,
    products: [],
    orders: [],
    customRequests: [],
    customers: []
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(defaultDb, null, 2), 'utf-8');
}

// ---------------------------------------------------------------------------
// 3. Helper Utilities & Middleware
// ---------------------------------------------------------------------------
function parseCookies(req) {
  const list = {};
  const rc = req.headers.cookie;
  if (rc) {
    rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const name = parts.shift().trim();
      const val = decodeURIComponent(parts.join('='));
      list[name] = val;
    });
  }
  return list;
}

function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
}

function authenticateAdmin(req) {
  const cookies = parseCookies(req);
  let token = cookies['skb_admin_session'];

  // Support Authorization: Bearer <token> header as well
  const authHeader = req.headers['authorization'];
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }

  if (!token || !activeSessions.has(token)) {
    return null;
  }

  const session = activeSessions.get(token);
  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  // Slide expiration window (24 hours)
  session.expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  return session;
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) { // 25MB max
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      try {
        if (!body.trim()) return resolve({});
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
}

function sendJson(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    ...headers
  });
  res.end(JSON.stringify(data));
}

// ---------------------------------------------------------------------------
// 4. Background Email Dispatcher
// ---------------------------------------------------------------------------
async function dispatchOrderNotificationEmail(order) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || 'c5048706-1d4c-48cf-8e25-d4af4d140e4b';
  const targetEmail = process.env.BUSINESS_EMAIL || 'skbtshirtprinting@gmail.com';

  const orderSummaryText = order.items.map(it =>
    `• ${it.name} | Qty: ${it.quantity} | Size: ${it.size} | Color: ${it.color} | Rs. ${it.price * it.quantity}`
  ).join('\n');

  const emailBody = {
    access_key: accessKey,
    subject: `New SKB T-Shirt Order #${order.id} - Rs. ${order.grandTotal}`,
    from_name: "SKB T-Shirt Printing Website",
    to: targetEmail,
    message: `
NEW CASH ON DELIVERY (COD) ORDER RECEIVED!

Order ID: ${order.id}
Customer Name: ${order.customer.name}
Phone: ${order.customer.phone}
Email: ${order.customer.email || 'N/A'}

Delivery Address:
${order.address.formatted || `${order.address.tole}, Ward ${order.address.ward}, ${order.address.municipality}, ${order.address.district}, ${order.address.province}`}

Ordered Items:
${orderSummaryText}

Subtotal: Rs. ${order.subtotal}
Delivery Fee: Rs. ${order.deliveryFee}
Grand Total: Rs. ${order.grandTotal}
Payment Method: ${order.paymentMethod}
Customer Notes: ${order.notes || 'None'}

Date: ${new Date(order.createdAt).toLocaleString('en-US', { timeZone: 'Asia/Kathmandu' })}
    `
  };

  try {
    const postData = JSON.stringify(emailBody);
    const options = {
      hostname: 'api.web3forms.com',
      port: 443,
      path: '/submit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };

    const https = require('https');
    const req = https.request(options, (res) => {
      // Consume response quietly
      res.on('data', () => { });
    });

    req.on('error', (e) => {
      console.warn('Order notification email attempt warning:', e.message);
    });

    req.write(postData);
    req.end();
  } catch (err) {
    console.warn('Silent email notification error:', err.message);
  }
}

// ---------------------------------------------------------------------------
// 5. Main HTTP Request Router
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  const clientIp = getClientIp(req);

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }

  // =========================================================================
  // API ROUTING (/api/*)
  // =========================================================================
  if (pathname.startsWith('/api/')) {

    // -----------------------------------------------------------------------
    // A. Admin Authentication Routes
    // -----------------------------------------------------------------------
    if (pathname === '/api/admin/login' && method === 'POST') {
      // Rate limiting check
      const rate = loginRateLimit.get(clientIp) || { count: 0, lastAttempt: 0, lockedUntil: 0 };
      if (Date.now() < rate.lockedUntil) {
        const remainingMinutes = Math.ceil((rate.lockedUntil - Date.now()) / 60000);
        return sendJson(res, 429, {
          error: `Too many failed attempts. Please try again in ${remainingMinutes} minute(s).`
        });
      }

      try {
        const body = await readJsonBody(req);
        const { username, password } = body;

        if (!username || !password) {
          return sendJson(res, 400, { error: 'Username and password are required.' });
        }

        const db = readDatabase();
        if (!db || !db.admin) {
          return sendJson(res, 500, { error: 'Database authentication table missing.' });
        }

        const adminUser = db.admin.username;
        const isUserMatch = username.trim().toLowerCase() === adminUser.toLowerCase();
        const isPassMatch = isUserMatch && verifyPassword(password, db.admin.passwordHash, db.admin.salt);

        if (!isUserMatch || !isPassMatch) {
          rate.count += 1;
          rate.lastAttempt = Date.now();
          if (rate.count >= 5) {
            rate.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 min lock
          }
          loginRateLimit.set(clientIp, rate);
          return sendJson(res, 401, { error: 'Invalid email or password.' });
        }

        // Reset rate limit on success
        loginRateLimit.delete(clientIp);

        // Generate session
        const sessionToken = generateSecureToken();
        const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        activeSessions.set(sessionToken, {
          username: adminUser,
          createdAt: Date.now(),
          expiresAt: expiresAt
        });

        // Set HttpOnly secure cookie
        const cookieHeader = `skb_admin_session=${sessionToken}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400`;

        return sendJson(res, 200, {
          success: true,
          token: sessionToken,
          isFirstLogin: !!db.admin.isFirstLogin,
          message: 'Admin login successful.'
        }, { 'Set-Cookie': cookieHeader });

      } catch (err) {
        return sendJson(res, 400, { error: 'Invalid JSON request payload.' });
      }
    }

    if (pathname === '/api/admin/verify' && method === 'GET') {
      const session = authenticateAdmin(req);
      if (!session) {
        return sendJson(res, 401, { authenticated: false, error: 'Session invalid or expired.' });
      }
      const db = readDatabase();
      return sendJson(res, 200, {
        authenticated: true,
        username: session.username,
        isFirstLogin: !!(db && db.admin && db.admin.isFirstLogin)
      });
    }

    if (pathname === '/api/admin/change-password' && method === 'POST') {
      const session = authenticateAdmin(req);
      if (!session) {
        return sendJson(res, 401, { error: 'Unauthorized. Please log in first.' });
      }

      try {
        const body = await readJsonBody(req);
        const { currentPassword, newPassword } = body;

        if (!newPassword || newPassword.length < 6) {
          return sendJson(res, 400, { error: 'New password must be at least 6 characters long.' });
        }

        const db = readDatabase();
        // If not first login, verify current password
        if (!db.admin.isFirstLogin) {
          if (!currentPassword || !verifyPassword(currentPassword, db.admin.passwordHash, db.admin.salt)) {
            return sendJson(res, 400, { error: 'Current password is incorrect.' });
          }
        }

        const newSalt = crypto.randomBytes(16).toString('hex');
        const newHash = hashPassword(newPassword, newSalt);

        db.admin.salt = newSalt;
        db.admin.passwordHash = newHash;
        db.admin.isFirstLogin = false;
        db.admin.updatedAt = new Date().toISOString();

        await writeDatabaseAtomic(db);

        return sendJson(res, 200, {
          success: true,
          message: 'Password changed successfully.'
        });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to update password.' });
      }
    }

    if (pathname === '/api/admin/logout' && method === 'POST') {
      const cookies = parseCookies(req);
      const token = cookies['skb_admin_session'];
      if (token) activeSessions.delete(token);

      const clearCookie = 'skb_admin_session=; HttpOnly; SameSite=Lax; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return sendJson(res, 200, { success: true, message: 'Logged out successfully.' }, { 'Set-Cookie': clearCookie });
    }

    if (pathname === '/api/admin/stats' && method === 'GET') {
      const session = authenticateAdmin(req);
      if (!session) {
        return sendJson(res, 401, { error: 'Unauthorized.' });
      }

      const db = readDatabase();
      const orders = db.products ? (db.orders || []) : [];
      const products = db.products || [];
      const customRequests = db.customRequests || [];

      // Calculate totals
      let totalSales = 0;
      const statusCounts = {
        Pending: 0,
        Confirmed: 0,
        Processing: 0,
        Shipped: 0,
        Delivered: 0,
        Cancelled: 0
      };

      orders.forEach(o => {
        if (o.status !== 'Cancelled') {
          totalSales += (o.grandTotal || 0);
        }
        if (statusCounts[o.status] !== undefined) {
          statusCounts[o.status]++;
        } else {
          statusCounts[o.status] = 1;
        }
      });

      const lowStockCount = products.filter(p => (p.stock || 0) <= 5).length;

      // Group orders for chart (last 7 days or recent dates)
      const salesByDate = {};
      orders.forEach(o => {
        const dateKey = (o.createdAt || new Date().toISOString()).split('T')[0];
        if (!salesByDate[dateKey]) salesByDate[dateKey] = { date: dateKey, sales: 0, orders: 0 };
        if (o.status !== 'Cancelled') salesByDate[dateKey].sales += (o.grandTotal || 0);
        salesByDate[dateKey].orders += 1;
      });

      return sendJson(res, 200, {
        totalSales,
        totalOrders: orders.length,
        pendingOrders: statusCounts.Pending || 0,
        confirmedOrders: statusCounts.Confirmed || 0,
        processingOrders: statusCounts.Processing || 0,
        shippedOrders: statusCounts.Shipped || 0,
        deliveredOrders: statusCounts.Delivered || 0,
        cancelledOrders: statusCounts.Cancelled || 0,
        totalProducts: products.length,
        lowStockProducts: lowStockCount,
        customRequestsCount: customRequests.length,
        customPendingCount: customRequests.filter(c => c.status === 'Pending').length,
        chartData: Object.values(salesByDate).slice(-10)
      });
    }

    // -----------------------------------------------------------------------
    // B. Product Management APIs
    // -----------------------------------------------------------------------
    if (pathname === '/api/products' && method === 'GET') {
      const db = readDatabase();
      let products = db.products || [];

      const category = parsedUrl.query.category;
      const search = parsedUrl.query.search;
      const activeOnly = parsedUrl.query.admin !== 'true';

      if (activeOnly) {
        products = products.filter(p => p.active !== false);
      }

      if (category && category !== 'all') {
        products = products.filter(p => p.category === category);
      }

      if (search) {
        const s = search.toLowerCase();
        products = products.filter(p =>
          (p.name && p.name.toLowerCase().includes(s)) ||
          (p.description && p.description.toLowerCase().includes(s))
        );
      }

      return sendJson(res, 200, products);
    }

    if (pathname === '/api/products' && method === 'POST') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      try {
        const body = await readJsonBody(req);
        if (!body.name || !body.price) {
          return sendJson(res, 400, { error: 'Product name and price are required.' });
        }

        const db = readDatabase();
        const newProduct = {
          id: body.id || `skb-${Date.now().toString().slice(-4)}`,
          name: body.name.trim(),
          category: body.category || 'streetwear',
          description: body.description || '',
          price: Number(body.price) || 0,
          discountPrice: body.discountPrice ? Number(body.discountPrice) : null,
          stock: body.stock !== undefined ? Number(body.stock) : 50,
          sizes: Array.isArray(body.sizes) ? body.sizes : ["S", "M", "L", "XL", "XXL"],
          colors: Array.isArray(body.colors) ? body.colors : [{ name: "Black", hex: "#18181B" }],
          image: body.image || 'images/prod_black_graphic.jpg',
          featured: !!body.featured,
          active: body.active !== undefined ? !!body.active : true,
          badge: body.badge || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.products.unshift(newProduct);
        await writeDatabaseAtomic(db);

        return sendJson(res, 201, { success: true, product: newProduct });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to create product.' });
      }
    }

    if (pathname.startsWith('/api/products/') && method === 'PUT') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const prodId = pathname.replace('/api/products/', '');
      try {
        const body = await readJsonBody(req);
        const db = readDatabase();
        const index = db.products.findIndex(p => p.id === prodId);

        if (index === -1) {
          return sendJson(res, 404, { error: 'Product not found.' });
        }

        const existing = db.products[index];
        db.products[index] = {
          ...existing,
          ...body,
          id: existing.id, // Immutable ID
          price: body.price !== undefined ? Number(body.price) : existing.price,
          discountPrice: body.discountPrice !== undefined ? (body.discountPrice ? Number(body.discountPrice) : null) : existing.discountPrice,
          stock: body.stock !== undefined ? Number(body.stock) : existing.stock,
          updatedAt: new Date().toISOString()
        };

        await writeDatabaseAtomic(db);
        return sendJson(res, 200, { success: true, product: db.products[index] });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to update product.' });
      }
    }

    if (pathname.startsWith('/api/products/') && method === 'DELETE') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const prodId = pathname.replace('/api/products/', '');
      const db = readDatabase();
      const initLen = db.products.length;
      db.products = db.products.filter(p => p.id !== prodId);

      if (db.products.length === initLen) {
        return sendJson(res, 404, { error: 'Product not found.' });
      }

      await writeDatabaseAtomic(db);
      return sendJson(res, 200, { success: true, message: 'Product deleted.' });
    }

    // -----------------------------------------------------------------------
    // B2. Authentic Workshop Gallery Management APIs
    // -----------------------------------------------------------------------
    if (pathname === '/api/gallery' && method === 'GET') {
      const db = readDatabase();
      let gallery = db.gallery || [];

      const category = parsedUrl.query.category;
      const search = parsedUrl.query.search;
      const activeOnly = parsedUrl.query.admin !== 'true';

      if (activeOnly) {
        gallery = gallery.filter(item => item.active !== false);
      }

      if (category && category !== 'all') {
        gallery = gallery.filter(item => item.cat === category);
      }

      if (search) {
        const s = search.toLowerCase();
        gallery = gallery.filter(item =>
          (item.title && item.title.toLowerCase().includes(s)) ||
          (item.desc && item.desc.toLowerCase().includes(s)) ||
          (item.tag && item.tag.toLowerCase().includes(s))
        );
      }

      return sendJson(res, 200, gallery);
    }

    if (pathname === '/api/gallery' && method === 'POST') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      try {
        const body = await readJsonBody(req);
        if (!body.title || !body.img) {
          return sendJson(res, 400, { error: 'Gallery title and image path are required.' });
        }

        const db = readDatabase();
        if (!db.gallery) db.gallery = [];

        const maxId = db.gallery.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
        const newItem = {
          id: maxId + 1,
          img: body.img.trim(),
          cat: body.cat || 'streetwear',
          title: body.title.trim(),
          desc: body.desc || '',
          tag: body.tag || 'DTF Print',
          price: body.price !== undefined ? Number(body.price) : 899,
          active: body.active !== undefined ? !!body.active : true,
          createdAt: new Date().toISOString()
        };

        db.gallery.push(newItem);
        await writeDatabaseAtomic(db);

        return sendJson(res, 201, { success: true, item: newItem });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to create gallery item.' });
      }
    }

    if (pathname.startsWith('/api/gallery/') && method === 'PUT') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const itemId = Number(pathname.replace('/api/gallery/', ''));
      try {
        const body = await readJsonBody(req);
        const db = readDatabase();
        if (!db.gallery) db.gallery = [];

        const index = db.gallery.findIndex(item => Number(item.id) === itemId);
        if (index === -1) {
          return sendJson(res, 404, { error: 'Gallery item not found.' });
        }

        const existing = db.gallery[index];
        db.gallery[index] = {
          ...existing,
          ...body,
          id: existing.id, // Immutable ID
          price: body.price !== undefined ? Number(body.price) : existing.price,
          active: body.active !== undefined ? !!body.active : existing.active,
          updatedAt: new Date().toISOString()
        };

        await writeDatabaseAtomic(db);
        return sendJson(res, 200, { success: true, item: db.gallery[index] });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to update gallery item.' });
      }
    }

    if (pathname.startsWith('/api/gallery/') && method === 'DELETE') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const itemId = Number(pathname.replace('/api/gallery/', ''));
      const db = readDatabase();
      if (!db.gallery) db.gallery = [];

      const initLen = db.gallery.length;
      db.gallery = db.gallery.filter(item => Number(item.id) !== itemId);

      if (db.gallery.length === initLen) {
        return sendJson(res, 404, { error: 'Gallery item not found.' });
      }

      await writeDatabaseAtomic(db);
      return sendJson(res, 200, { success: true, message: 'Gallery item deleted.' });
    }

    // -----------------------------------------------------------------------
    // C. Order Management & Tracking APIs
    // -----------------------------------------------------------------------
    if (pathname === '/api/orders' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const { customer, address, items, notes } = body;

        // Validation
        if (!customer || !customer.name || !customer.phone) {
          return sendJson(res, 400, { error: 'Customer name and 10-digit mobile number are required.' });
        }
        if (!address || !address.province || !address.district || !address.municipality || !address.ward || !address.tole) {
          return sendJson(res, 400, { error: 'All Nepal delivery address fields are strictly required.' });
        }
        if (!items || !Array.isArray(items) || items.length === 0) {
          return sendJson(res, 400, { error: 'Order must contain at least one item.' });
        }

        const db = readDatabase();
        const settings = db.settings || {};

        // Recalculate Subtotal Server-Side to guarantee price integrity
        let calculatedSubtotal = 0;
        const verifiedItems = items.map(item => {
          let itemPrice = Number(item.price) || 899;

          // Match with catalog price if standard product
          if (item.productId && !item.productId.startsWith('custom-')) {
            const catalogProd = (db.products || []).find(p => p.id === item.productId);
            if (catalogProd && catalogProd.price) {
              itemPrice = catalogProd.price;
            }
          }

          const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
          const itemTotal = itemPrice * qty;
          calculatedSubtotal += itemTotal;

          return {
            productId: item.productId || 'skb-custom',
            name: item.name || 'SKB T-Shirt',
            size: item.size || 'M',
            color: item.color || 'Black',
            price: itemPrice,
            quantity: qty,
            total: itemTotal,
            image: item.image || 'images/prod_black_graphic.jpg',
            customText: item.customText || '',
            placement: item.placement || '',
            font: item.font || '',
            textColor: item.textColor || ''
          };
        });

        // Delivery Fee Calculation (Flat Rs 100, Free if Subtotal >= Rs 2,000)
        const freeThreshold = settings.freeDeliveryThreshold !== undefined ? settings.freeDeliveryThreshold : 2000;
        const flatDelivery = settings.flatDeliveryFee !== undefined ? settings.flatDeliveryFee : 100;
        const deliveryFee = (calculatedSubtotal >= freeThreshold) ? 0 : flatDelivery;
        const grandTotal = calculatedSubtotal + deliveryFee;

        // Generate Unique Order ID: SKB-2026-000001
        db.orderCounter = (db.orderCounter || 100) + 1;
        const paddedId = String(db.orderCounter).padStart(6, '0');
        const orderId = `SKB-2026-${paddedId}`;

        const formattedAddress = address.formatted ||
          `${address.tole.trim()}, Ward ${address.ward}, ${address.municipality}, ${address.district}, ${address.province}, Nepal`;

        const newOrder = {
          id: orderId,
          customer: {
            name: customer.name.trim(),
            phone: customer.phone.trim(),
            email: (customer.email || '').trim()
          },
          address: {
            province: address.province,
            district: address.district,
            municipality: address.municipality,
            ward: String(address.ward),
            tole: address.tole.trim(),
            formatted: formattedAddress
          },
          items: verifiedItems,
          subtotal: calculatedSubtotal,
          deliveryFee: deliveryFee,
          discount: 0,
          grandTotal: grandTotal,
          paymentMethod: "Cash on Delivery (COD)",
          status: "Pending",
          notes: notes || '',
          courierNotes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Update Customers Directory
        if (!db.customers) db.customers = [];
        const custPhone = customer.phone.trim();
        const existingCustIndex = db.customers.findIndex(c => c.phone === custPhone);
        if (existingCustIndex >= 0) {
          db.customers[existingCustIndex].totalOrders = (db.customers[existingCustIndex].totalOrders || 0) + 1;
          db.customers[existingCustIndex].lifetimeSpend = (db.customers[existingCustIndex].lifetimeSpend || 0) + grandTotal;
          db.customers[existingCustIndex].lastOrderDate = new Date().toISOString();
          db.customers[existingCustIndex].name = customer.name.trim();
          db.customers[existingCustIndex].province = address.province;
          db.customers[existingCustIndex].district = address.district;
          db.customers[existingCustIndex].municipality = address.municipality;
          db.customers[existingCustIndex].ward = String(address.ward);
          db.customers[existingCustIndex].tole = address.tole.trim();
        } else {
          db.customers.push({
            id: `cust-${custPhone}`,
            name: customer.name.trim(),
            phone: custPhone,
            email: customer.email || '',
            province: address.province,
            district: address.district,
            municipality: address.municipality,
            ward: String(address.ward),
            tole: address.tole.trim(),
            totalOrders: 1,
            lifetimeSpend: grandTotal,
            lastOrderDate: new Date().toISOString(),
            status: "Active"
          });
        }

        // Deduct Inventory
        verifiedItems.forEach(it => {
          const prod = (db.products || []).find(p => p.id === it.productId);
          if (prod && prod.stock) {
            prod.stock = Math.max(0, prod.stock - it.quantity);
          }
        });

        db.orders.unshift(newOrder);
        await writeDatabaseAtomic(db);

        // Send Email Notification in background (fail-safe)
        dispatchOrderNotificationEmail(newOrder);

        return sendJson(res, 201, {
          success: true,
          orderId: newOrder.id,
          order: newOrder,
          message: 'Order created successfully.'
        });

      } catch (err) {
        console.error('Order creation error:', err);
        return sendJson(res, 500, { error: 'Failed to place order. Please try again.' });
      }
    }

    if (pathname === '/api/orders' && method === 'GET') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const db = readDatabase();
      let orders = db.orders || [];

      const status = parsedUrl.query.status;
      const search = parsedUrl.query.search;

      if (status && status !== 'all') {
        orders = orders.filter(o => o.status === status);
      }

      if (search) {
        const s = search.toLowerCase();
        orders = orders.filter(o =>
          (o.id && o.id.toLowerCase().includes(s)) ||
          (o.customer && o.customer.name && o.customer.name.toLowerCase().includes(s)) ||
          (o.customer && o.customer.phone && o.customer.phone.includes(s)) ||
          (o.address && o.address.formatted && o.address.formatted.toLowerCase().includes(s))
        );
      }

      return sendJson(res, 200, orders);
    }

    if (pathname.startsWith('/api/orders/track/') && method === 'GET') {
      const query = decodeURIComponent(pathname.replace('/api/orders/track/', '')).trim();
      if (!query) return sendJson(res, 400, { error: 'Order ID or phone number is required.' });

      const db = readDatabase();
      const orders = db.orders || [];

      // Find by Order ID (exact/case-insensitive) or Phone
      const matched = orders.filter(o =>
        (o.id && o.id.toLowerCase() === query.toLowerCase()) ||
        (o.customer && o.customer.phone === query)
      );

      if (matched.length === 0) {
        return sendJson(res, 404, { error: `No order found for "${query}". Please check your Order ID or phone number.` });
      }

      // Sanitize output for public viewing (protect customer full privacy)
      const sanitizedList = matched.map(order => ({
        id: order.id,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        customerName: order.customer.name.split(' ')[0] + ' ***', // Partial name
        destination: `${order.address.municipality}, ${order.address.district}, ${order.address.province}`,
        items: order.items.map(it => ({
          name: it.name,
          size: it.size,
          color: it.color,
          quantity: it.quantity,
          image: it.image
        })),
        grandTotal: order.grandTotal,
        paymentMethod: order.paymentMethod,
        courierNotes: order.courierNotes || ''
      }));

      return sendJson(res, 200, sanitizedList);
    }

    if (pathname.startsWith('/api/orders/') && pathname.endsWith('/status') && method === 'PUT') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const orderId = pathname.replace('/api/orders/', '').replace('/status', '');
      try {
        const body = await readJsonBody(req);
        const { status, courierNotes } = body;

        const db = readDatabase();
        const order = (db.orders || []).find(o => o.id === orderId);

        if (!order) {
          return sendJson(res, 404, { error: 'Order not found.' });
        }

        if (status) order.status = status;
        if (courierNotes !== undefined) order.courierNotes = courierNotes;
        order.updatedAt = new Date().toISOString();

        await writeDatabaseAtomic(db);
        return sendJson(res, 200, { success: true, order });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to update order status.' });
      }
    }

    if (pathname.startsWith('/api/orders/') && method === 'DELETE') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const orderId = pathname.replace('/api/orders/', '');
      const db = readDatabase();
      const initLen = db.orders.length;
      db.orders = db.orders.filter(o => o.id !== orderId);

      if (db.orders.length === initLen) {
        return sendJson(res, 404, { error: 'Order not found.' });
      }

      await writeDatabaseAtomic(db);
      return sendJson(res, 200, { success: true, message: 'Order deleted.' });
    }

    // -----------------------------------------------------------------------
    // D. Custom Design Requests
    // -----------------------------------------------------------------------
    if (pathname === '/api/custom-requests' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const { customer, tshirtType, color, size, quantity, placement, customText, font, textColor, uploadedDesign, notes, estimatedPrice } = body;

        if (!customer || !customer.name || !customer.phone) {
          return sendJson(res, 400, { error: 'Customer name and phone are required.' });
        }

        const db = readDatabase();
        if (!db.customRequests) db.customRequests = [];

        const newRequest = {
          id: `CUST-${Date.now().toString().slice(-6)}`,
          customer: {
            name: customer.name.trim(),
            phone: customer.phone.trim(),
            email: customer.email || ''
          },
          tshirtType: tshirtType || 'Round Neck Classic',
          color: color || 'Midnight Black',
          size: size || 'M',
          quantity: parseInt(quantity, 10) || 1,
          placement: placement || 'Front Center Chest',
          customText: customText || '',
          font: font || "'Outfit', sans-serif",
          textColor: textColor || '#FFFFFF',
          uploadedDesign: uploadedDesign || '',
          notes: notes || '',
          estimatedPrice: Number(estimatedPrice) || 899,
          status: 'Pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        db.customRequests.unshift(newRequest);
        await writeDatabaseAtomic(db);

        return sendJson(res, 201, { success: true, customRequest: newRequest });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to submit custom request.' });
      }
    }

    if (pathname === '/api/custom-requests' && method === 'GET') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const db = readDatabase();
      return sendJson(res, 200, db.customRequests || []);
    }

    if (pathname.startsWith('/api/custom-requests/') && pathname.endsWith('/status') && method === 'PUT') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const reqId = pathname.replace('/api/custom-requests/', '').replace('/status', '');
      try {
        const body = await readJsonBody(req);
        const db = readDatabase();
        const request = (db.customRequests || []).find(r => r.id === reqId);

        if (!request) return sendJson(res, 404, { error: 'Custom request not found.' });

        if (body.status) request.status = body.status;
        request.updatedAt = new Date().toISOString();

        await writeDatabaseAtomic(db);
        return sendJson(res, 200, { success: true, customRequest: request });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to update custom request.' });
      }
    }

    // -----------------------------------------------------------------------
    // E. Customers Directory API
    // -----------------------------------------------------------------------
    if (pathname === '/api/customers' && method === 'GET') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      const db = readDatabase();
      return sendJson(res, 200, db.customers || []);
    }

    // -----------------------------------------------------------------------
    // F. Website Settings API
    // -----------------------------------------------------------------------
    if (pathname === '/api/settings' && method === 'GET') {
      const db = readDatabase();
      return sendJson(res, 200, db.settings || {});
    }

    if (pathname === '/api/settings' && method === 'PUT') {
      const session = authenticateAdmin(req);
      if (!session) return sendJson(res, 401, { error: 'Unauthorized.' });

      try {
        const body = await readJsonBody(req);
        const db = readDatabase();
        db.settings = {
          ...db.settings,
          ...body
        };
        await writeDatabaseAtomic(db);
        return sendJson(res, 200, { success: true, settings: db.settings });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to update website settings.' });
      }
    }

    // -----------------------------------------------------------------------
    // G. File Upload API (Base64 or Multipart)
    // -----------------------------------------------------------------------
    if (pathname === '/api/upload' && method === 'POST') {
      try {
        const body = await readJsonBody(req);
        const { imageBase64, filename } = body;

        if (!imageBase64) {
          return sendJson(res, 400, { error: 'Base64 image data is required.' });
        }

        const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          return sendJson(res, 400, { error: 'Invalid Base64 image format.' });
        }

        const ext = matches[1].split('/')[1] || 'jpg';
        const buffer = Buffer.from(matches[2], 'base64');
        const safeName = `upload_${Date.now()}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
        const filePath = path.join(UPLOADS_DIR, safeName);

        fs.writeFileSync(filePath, buffer);
        const fileUrl = `uploads/${safeName}`;

        return sendJson(res, 200, { success: true, url: fileUrl });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to process file upload.' });
      }
    }

    // 404 for unknown API
    return sendJson(res, 404, { error: 'API route not found.' });
  }

  // =========================================================================
  // STATIC ASSET SERVING
  // =========================================================================
  let safePath = pathname;
  if (safePath === '/' || safePath === '') {
    safePath = '/index.html';
  } else if (safePath === '/admin') {
    safePath = '/admin.html';
  }

  const normalizedPath = path.normalize(safePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, normalizedPath);

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for 404
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>404 Not Found</h1><p>SKB T-Shirt Printing Dumkibas</p>');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`👕 SKB T-Shirt Printing Dumkibas — Full Server Running!`);
  console.log(`🌐 Customer Website: http://localhost:${PORT}/`);
  console.log(`🔐 Admin Dashboard:  http://localhost:${PORT}/admin.html`);
  console.log(`================================================================`);
});
