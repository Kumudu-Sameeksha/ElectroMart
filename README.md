# ⚡ ElectroMart — Electronics E-Commerce Frontend

> A modern, fully responsive electronics e-commerce web application built with React, TypeScript, and Tailwind CSS. Inspired by premium e-commerce experiences like Apple Store and Best Buy.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS v3** | Utility-first styling |
| **React Router DOM v6** | Client-side routing |
| **Vite** | Build tool & dev server |
| **Context API** | Global cart & wishlist state |
| **localStorage** | Cart persistence across sessions |
| **Lucide React** | Icon library |

---

## ✨ Features

### 🛍️ Shopping Experience
- Browse **21 products** across **9 categories** — Smartphones, Laptops, Headphones, Tablets, Smartwatches, Cameras, Speakers, Gaming Accessories, Monitors
- Product cards with discount badges, trending labels, wishlist toggle, and stock status
- Full product detail page with image gallery, color selector, quantity picker, and specifications table
- Related products section on each product page

### 🔍 Search & Filtering
- Real-time search by product name
- Filter by category, brand, price range, and minimum rating
- Sort by featured, price (low/high), highest rated, and newest
- Mobile-friendly collapsible filter panel

### 🛒 Cart & Checkout
- Add, remove, and update quantities in cart
- Cart persisted in **localStorage** across browser sessions
- Free delivery logic (orders over $500)
- Full **3-step checkout flow** — Address → Payment → Review
- Live credit card preview that updates as you type
- Multiple payment options — Credit/Debit card, PayPal, Google Pay
- Order confirmation screen with unique order ID

### 👤 User Account
- Login & Signup pages with form validation and password strength meter
- Profile page with **5 tabs:**
  - **My Profile** — editable personal info, address, avatar color, stats
  - **Order History** — expandable order cards with status badges
  - **Wishlist** — saved items with remove and add-to-cart actions
  - **Security** — change password, 2FA toggle, active sessions
  - **Notifications** — toggle preferences for emails, SMS, push alerts

### ❤️ Wishlist
- Save products with heart icon from any page
- Dedicated wishlist page with sort options
- Add all wishlisted items to cart in one click
- Animated remove with smooth fade-out effect
- "You May Also Like" suggestions based on saved categories
- Stats bar showing total value, in-stock count, on-sale count

### 🏠 Homepage Sections
- Hero banner with CTA buttons
- Shop by Category grid (9 categories)
- Featured Products section
- Trending & Best Deals section
- Why Choose Us — 4 feature highlights
- Customer testimonials
- Email newsletter signup

### 📱 Responsive Design
- Mobile-first design that works on all screen sizes
- Hamburger menu with full mobile navigation
- Sticky navbar with search, cart badge, and wishlist count
- Responsive product grids (1 → 2 → 3 → 4 columns)

---

## 📁 Project Structure

```
src/
├── assets/          # Local product images
├── components/
│   ├── auth/        # AuthShell, Field, Checkbox
│   ├── cart/        # CartLine
│   ├── common/      # Button, SectionTitle, RatingStars, EmptyState, Toast, QuantitySelector
│   ├── home/        # HeroSection, CategoryCard, FeatureCard, TestimonialCard, Newsletter
│   └── products/    # ProductCard, SearchBar, FilterPanel
├── context/         # CartContext (global state + localStorage)
├── data/            # products.ts (21 products), categories.ts, testimonials.ts
├── layout/          # Navbar, Footer
├── pages/           # HomePage, ProductsPage, ProductDetailPage, CartPage,
│                    # CheckoutPage, AboutPage, ContactPage,
│                    # LoginPage, SignupPage, ProfilePage, WishlistPage
├── routes/          # AppRoutes.tsx
├── types/           # TypeScript interfaces (Product, CartItem, Category, etc.)
└── utils/           # formatPrice, getDiscountPct, stockInfo
```

---


## 📦 Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/products` | Products listing with filters |
| `/products/:slug` | Product detail |
| `/cart` | Shopping cart |
| `/checkout` | 3-step checkout |
| `/wishlist` | Saved items |
| `/profile` | User account & settings |
| `/login` | Login |
| `/signup` | Sign up |
| `/about` | About ElectroMart |
| `/contact` | Contact form |

---

## 🎨 Design Highlights
- Premium dark/light hybrid design inspired by Apple & Best Buy
- Indigo / Slate / White color palette
- Rounded cards with shadow and hover animations
- Smooth transitions and micro-interactions
- Toast notifications for cart and form actions

##Live Demo: https://nsbm365-my.sharepoint.com/:v:/g/personal/dkkskulasuriya_students_nsbm_ac_lk/IQDAZq6iuYcRTp4rNh3JDOvVAeHx6B1loWqE6QMphXzFe2g?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=XeaiiC
