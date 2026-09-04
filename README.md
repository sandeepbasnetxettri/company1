# SKB T-Shirt Printing Dumkibas — Full E-Commerce & Admin Platform 🇳🇵

Complete modern, professional, mobile-first e-commerce website and real secure Admin Dashboard for:
**Business:** SKB T-Shirt Printing Dumkibas  
**Location:** Dumkibas, Nawalparasi, Gandaki Province, Nepal  
**Specialties:** Custom T-Shirt Printing, Streetwear Graphics, Couple Sets, Bulk/Event Orders, and Nepal-Wide Cash on Delivery (COD).

---

## 🚀 Key Features

### 1. Customer Storefront (`index.html`)
- **Hero & Trust Badges:** High-converting hero section with instant WhatsApp ordering and COD highlight.
- **Product Catalog:** Real-time synced product catalog with search, category filtering, quick view, size/color selectors, and Add to Cart.
- **Interactive Custom T-Shirt Studio:**
  - Silhouette choices: Round Neck Classic, Oversized Streetwear, V-Neck, Polo, Hoodie.
  - Base color selector with live canvas tint.
  - Front / Back dual-side preview switcher.
  - Custom typography engine (Outfit, Jakarta Sans, Bebas Neue, Caveat) with color swatches.
  - Photo / logo upload with real-time mockup placement.
  - Live tiered pricing calculator before checkout.
- **Authentic Workshop Gallery:** Interactive showcase of all 31 real Dumkibas workshop print photos with category filters and lightbox view.
- **Hierarchical Nepal Delivery Address Cascade:**
  - 7 Provinces ➔ 77 Districts ➔ 753 Municipalities/Cities ➔ Ward No. ➔ Tole / Street required text input with smart ward-specific autocomplete.
  - Live Delivery Destination Preview card.
- **Mobile-First Cash on Delivery (COD) Checkout:** Server-recalculated billing (Rs. 100 flat delivery or FREE for orders over Rs. 2,000).
- **Public Order Tracking:** Real-time tracking step timeline (Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Delivered).
- **Customer Account Modal:** Phone-based past order lookup and saved delivery addresses.
- **Sticky Bottom Mobile Navigation Bar:** Quick access on mobile screens to Home, Shop, Studio, Track, and Cart.

### 2. Full-Featured Admin Dashboard (`admin.html`)
- **Secure Authentication:**
  - Login username: `skbtshirtprinting@gmail.com`
  - Initial setup password: `skbAdmin2026!` (configurable via `ADMIN_INITIAL_PASSWORD` env var).
  - First-time login forces password change to a permanent secure password.
  - Node.js `crypto.scrypt` password hashing + cryptographic salt.
  - In-memory session store with HttpOnly secure cookie and brute-force rate limiting (5 failed attempts = 15m lock).
- **Live KPI Dashboard & Charts:**
  - Total Revenue (Rs.), Total Orders, Pending Orders, Shipped Orders, Delivered Orders, Total Products, Low Stock alerts.
  - Interactive Sales & Order Trends line chart (Chart.js) and Status Donut breakdown.
- **Order Management:**
  - Search, filter by status, view complete order details with ordered custom specs and Nepal delivery address.
  - Change status (Pending ➔ Confirmed ➔ Processing ➔ Shipped ➔ Delivered ➔ Cancelled) and add courier tracking notes.
- **Product Management:** Add, edit, delete products, manage inventory stock, set prices/discounts, upload images, and toggle featured/active status.
- **Custom Design Requests:** Review customer customizer designs, artwork thumbnails, placement, and approve/process.
- **Customer Directory:** Aggregated customer spending, order count, and delivery destinations.
- **Website Configuration & Settings:** Manage business name, phone, WhatsApp number, email, address, delivery fees, and hero banners.

---

## 🛠️ Technology Stack

- **Backend:** Node.js HTTP/REST API engine (`serve.js`).
- **Database:** Atomic JSON database (`data/db.json`) with temporary file rename buffering to prevent corruption.
- **Frontend:** Pure Vanilla JavaScript (`script.js`, `admin.js`), Modern HTML5 (`index.html`, `admin.html`), and CSS3 (`style.css`, `admin.css`).
- **Typography:** Google Fonts (Outfit & Plus Jakarta Sans).
- **Charts:** Chart.js for Admin Analytics.
- **No external heavy framework required** — runs anywhere with standard Node.js.

---

## 🏁 Quick Start & Running Locally

### 1. Start the Server
```bash
node serve.js
```

### 2. Open in Browser
- **Customer Website:** [http://localhost:3000/](http://localhost:3000/)
- **Admin Dashboard:** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## 🔐 Default Admin Credentials
- **Username:** `skbtshirtprinting@gmail.com`
- **Initial Password:** `skbAdmin2026!`
*(Note: On your first login, the system will prompt you to set a new permanent password).*

---

## 🌐 Free-Tier Deployment Options

### Option A: Render / Railway / Glitch (Recommended for Full Stack)
1. Push the repository to GitHub.
2. Link the repository on [Render.com](https://render.com) or [Railway.app](https://railway.app) as a **Web Service**.
3. Set **Build Command:** *(leave blank or `npm install`)*.
4. Set **Start Command:** `node serve.js`.
5. Add Environment Variables:
   - `ADMIN_INITIAL_PASSWORD=YourCustomInitialPassword!`
   - `PORT=3000`

### Option B: VPS / Node Server
```bash
git clone <repo-url>
cd website
npm start
```
Use `pm2` or `systemd` to keep `serve.js` running in the background:
```bash
npm install -g pm2
pm2 start serve.js --name "skb-printing"
```
