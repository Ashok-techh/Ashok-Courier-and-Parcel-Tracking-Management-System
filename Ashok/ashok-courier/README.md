# ASHOK COURIER SERVICES
### Modern Courier & Parcel Tracking Management System

A modern, responsive, and feature-complete **Courier and Parcel Tracking Management System** for **ASHOK COURIER SERVICES**.

Built using **HTML5, CSS3, JavaScript, Bootstrap 5, and Font Awesome**. This application runs **entirely in the web browser** without requiring any backend server, Node.js, Python, PHP, or external database. All persistent operations (tracking state, consignment booking, user authentication, customer inquiries) are seamlessly managed using client-side JavaScript and browser `localStorage`.

---

## 🚀 Key Features

- **Branded Design Language:** Premium Navy Blue (`#0B2545`, `#133E87`), White, and Express Orange (`#FF6B00`) color palette.
- **10 Dedicated Pages:** Every page is designed with rich imagery, responsive layouts, interactive elements, and realistic logistics data.
- **Visual 5-Step Parcel Tracking Stepper:**
  1. `Order Booked`
  2. `Parcel Picked Up`
  3. `In Transit`
  4. `Out for Delivery`
  5. `Delivered`
- **Dynamic Waybill Search:** Search preloaded shipments or newly booked consignments. Supports direct URL deep-linking (`tracking.html?id=ACS-89421-IN`).
- **Interactive Courier Booking Engine:** Form validation, live freight cost calculation (base fee + weight charges + speed priority multiplier + 18% GST), auto-generation of unique tracking IDs (`ACS-XXXXX-IN`), and instant localStorage booking history.
- **Printable Consignment Slips:** Easily generate and print clean waybill slips directly from the tracking page.
- **Shipping Rates & Volumetric Calculator:** Interactive quote estimator, dimensional weight calculator formula (`L × W × H / 5000`), and tier comparison tables.
- **Branch Locator & Logistics Network:** Interactive India route network visual with clickable city hubs, city-based search filtering, and 10 detailed branch cards across India.
- **Client Shipper Portal (Simulated Auth):** Pre-seeded demo shipper account with 1-click auto-fill, new user registration, and header authentication state synchronization.
- **Interactive Contact & FAQ:** Inquiry submission saved directly to localStorage, emergency priority cargo desk, and searchable FAQ accordion.

---

## 📂 Project Structure

```text
ashok-courier/
├── index.html            # Home page with hero, tracking search, stats counter, & services
├── about.html            # Company history, mission, vision, milestones, & leadership team
├── services.html         # 6 Core logistics services, comparison matrix, & packing guidelines
├── tracking.html         # Visual parcel tracking timeline, status logs, & print receipt
├── booking.html          # Courier booking form, live fare calculator, & booking history
├── rates.html            # Shipping rates, dimensional weight tool, & international price cards
├── branches.html         # India network map visual, city search, & 10 nationwide branch hubs
├── contact.html          # Contact form, 24/7 hotline cards, & frequently asked questions
├── login.html            # Shipper client login with 1-click demo credential autofill
├── register.html         # New client account registration with password validation
├── css/
│   └── style.css         # Complete responsive styles, theme tokens, animations, & steppers
├── js/
│   ├── script.js         # Global navigation, mobile toggle, counters, toast alerts, & auth sync
│   ├── tracking.js       # Parcel tracking engine, default records, stepper rendering, & printing
│   ├── booking.js        # Courier booking calculation, validation, ID generation, & history
│   └── auth.js           # Client authentication simulation with localStorage session handling
└── images/
    └── logo.svg          # Custom vector brand logo for Ashok Courier Services
```

---

## 📦 Preloaded Sample Tracking IDs

Test the parcel tracking functionality immediately on `tracking.html` or the home page search box using any of these preloaded numbers:

| Tracking Number | Status | Origin | Destination | Active Timeline Step |
|---|---|---|---|---|
| `ACS-89421-IN` | **In Transit** | New Delhi | Mumbai | Step 3 of 5 |
| `ACS-65102-EXP` | **Out for Delivery** | Bengaluru | Whitefield | Step 4 of 5 |
| `ACS-44319-INT` | **Delivered** | New York, USA | Hyderabad | Step 5 of 5 (Completed) |
| `ACS-10293-DEL` | **Order Booked** | Chennai | Kolkata | Step 1 of 5 |
| `ACS-55820-PKD` | **Parcel Picked Up** | Pune | Ahmedabad | Step 2 of 5 |

> **Note:** Whenever you book a new courier via `booking.html`, a new tracking ID (e.g. `ACS-74912-IN`) is automatically registered in your browser's `localStorage` and can be immediately tracked on `tracking.html`!

---

## 👤 Demo Shipper Login

To test the authenticated Shipper Portal, navigate to `login.html`:

- **Email:** `ashok.client@courier.com`
- **Password:** `password123`
- **Quick Action:** Click the **"1-Click Auto-Fill"** button on the login card to fill credentials automatically!

---

## 💻 How to Run Locally

Because this project is built entirely on standard modern web technologies (HTML5, CSS3, vanilla JavaScript) with public CDN assets for Bootstrap 5 and Font Awesome 6, **no compilation, installation, or server runtime is required.**

### Method 1: Direct Browser Launch (Easiest)
1. Navigate to the project folder (`ashok-courier/`).
2. Double-click on `index.html`.
3. The website will open in your default browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Method 2: VS Code Live Server
1. Open the `ashok-courier` folder in **Visual Studio Code**.
2. Right-click on `index.html`.
3. Select **"Open with Live Server"** (if the Live Server extension is installed).

### Method 3: Any Static HTTP Server (Optional)
If you prefer running via a local HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve .
```
Then visit `http://localhost:8000` in your web browser.

---

## 🎨 Technology Stack

- **HTML5:** Semantic markup, accessibility features, meta viewports.
- **CSS3:** Custom CSS variables, Flexbox & Grid layouts, keyframe animations, glassmorphism cards.
- **Bootstrap 5.3.3:** Responsive grid system, accordions, modals, and helper utilities.
- **Font Awesome 6.5.1:** Logistics, freight, status, and navigation iconography.
- **Google Fonts:** `Outfit` (Headings) and `Plus Jakarta Sans` (Body & UI text).
- **JavaScript (ES6+):** Pure vanilla JavaScript without heavy frameworks for maximum speed and simplicity.
- **Browser localStorage:** Persistent state simulation for bookings, messages, and user sessions.

---

## 📄 License & Credits
Developed for **ASHOK COURIER SERVICES**. All rights reserved &copy; 2026.

