# ZORA — E-Commerce Prototype

**A high-fidelity Gen-Z tech accessory store built on HCI-first principles, fluid motion design, and vanilla web technologies.**

---

## Table of Contents

- [Project Overview](#project-overview)
- [System Concept & Purpose](#system-concept--purpose)
- [HCI Compliance](#hci-compliance)
- [File Breakdown](#file-breakdown)
- [Architecture: Natural Language to Code](#architecture-natural-language-to-code)
- [Technical Stack](#technical-stack)
- [Entry Points & Initialization Flow](#entry-points--initialization-flow)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Attributions](#attributions)

---

## Project Overview

ZORA is a fully-functional e-commerce prototype specializing in tech accessories, be it phone cases, charging gear, drinkware, wearable protection, and lifestyle stationery. The project consists of **17 core files** across 8 HTML pages, 4 CSS stylesheets, 4 JavaScript logic files, and 1 JSON data file.

**Live audit score: 85% HCI compliance** (post-remediation), up from a baseline of 68%.

---

## System Concept & Purpose

ZORA addresses common e-commerce friction points through three deliberate design strategies:

### 1. Vibe-Based Discovery

Beyond traditional category navigation, users can shop by aesthetic profile from "dark-moody" to "clean-minimal" or even "colour-pop", matching how Gen-Z consumers naturally browse. Each vibe filters the catalog by visual character rather than product type alone. The `collection.html` page accepts URL parameters for both category and vibe filtering, with debounced multi-select logic in `filters.js`.

### 2. Mobile-First, Desktop-Complete

The experience scales from thumb-friendly mobile layouts to immersive desktop views without compromise. Smooth animations (CSS-driven, defined in `motion.css`), a theatrical preloader (`preloader.css`, `preloader.js`), and a slide-out cart sidebar (`cart-sidebar.html`) ensure polish at every breakpoint.

### 3. HCI-Verified Interactions

Every interaction pattern, from the mega-menu to the checkout flow to the product gallery, has been audited against a 25-rule HCI framework derived from Miller, Norman, Fitts, Abowd & Beale, and Wason. Violations were systematically remediated.

---

## HCI Compliance

ZORA was audited against **25 HCI rules** across five categories:

| Section | Pre-Remediation | Post-Remediation |
|---------|-----------------|------------------|
| Cognitive Load & Memory | 60% | 100% |
| Physical Interaction | 50% | 100% |
| Visual Perception | 67% | 100% |
| Feedback & Error Recovery | 100% | 100% |
| Design Process | 33% | 33% |
| **Overall** | **68%** | **85%** |

**Key remediations applied:**

| Issue | Rule | Fix |
|-------|------|-----|
| Navigation exceeded 7±2 cognitive limit | Miller's Law | Consolidated to mega-categories with progressive disclosure |
| No search autocomplete forced recall | Recognition over Recall | Autocomplete with recents, product, and category suggestions |
| Checkout data lost on tab switch | Interlaced Browsing | localStorage auto-save with draft recovery in `state.js` |
| Cursor promised zoom with no function | Direct Manipulation | Implemented lightbox zoom on product images |
| Prose lines exceeded readable character range | Saccade Optimization | Constrained text containers on `about.html` and `help.html` |

---

## File Breakdown

### HTML Pages (Structure)

| File | Purpose |
|------|---------|
| `index.html` | Homepage: hero section, trending products, "Shop by Vibe" grid |
| `collection.html` | Dynamic product grid filtered by URL parameters (category, vibe) |
| `product.html` | Product Detail Page: image gallery, variant selectors, add-to-cart |
| `wishlist.html` | Saved items display powered by localStorage |
| `cart-sidebar.html` | Slide-out shopping cart injected into page layout |
| `checkout.html` | Multi-step shipping and payment simulation with auto-save |
| `about.html` | Brand mission statement with decorative floating Alt Logo |
| `help.html` | Help center with FAQ accordion and embedded search |
| `404.html` | Branded error page with search bar and automatic redirect |

### Stylesheets (Aesthetics)

| File | Purpose |
|------|---------|
| `global.css` | Design system: typography (Syne, Inter), Light/Dark mode color tokens |
| `motion.css` | Shared animation utilities: sidebars, toasts, skeleton shimmers |
| `components.css` | Button, card, and interactive element styling |
| `layout.css` | Grid systems, container constraints, responsive breakpoints |
| `preloader.css` | Theatrical first-visit loading overlay with Alt Logo assembly |

### JavaScript (Logic)

| File | Purpose |
|------|---------|
| `state.js` | Persistence engine: cart, wishlist, theme preferences in localStorage |
| `nav.js` | Header interactions, mobile hamburger menu, panel exclusion logic |
| `filters.js` | Multi-select filtering with debounced grid updates on collection page |
| `toast.js` | Undo-capable notification system for cart removals |
| `preloader.js` | Controls the Alt Logo assembly animation on first visit |

### Data

| File | Purpose |
|------|---------|
| `products.json` | Central database: ~64 product entries with categories, vibes, image paths, and pricing |

### Notes

- The `device.js` wizard logic was removed to reduce implementation weight.
- Lottie JSON files and SVG assets live in `assets/` but are not counted as functional code files.

---

## Architecture: Natural Language to Code

Mapping functional requirements to implementation:

| Requirement | Implementation | Files |
|-------------|---------------|-------|
| "Shop by aesthetic" | Vibe filter with URL query parameters | `collection.html`, `filters.js` |
| "Cart should persist across tabs" | localStorage with expiry logic | `state.js` |
| "Search should suggest, not demand" | Autocomplete with category and product hints | `help.html` (search section) |
| "Checkout data must survive tab close" | Auto-save on field change, restore on load | `checkout.html`, `state.js` |
| "Product images should zoom" | Lightbox-style image expansion | `product.html` |
| "Navigation must respect cognitive limits" | Structured mega-categories with progressive disclosure | `nav.js` |
| "Remove items without fear" | Undo-capable toast notifications | `toast.js` |
| "First visit should feel cinematic" | Alt Logo preloader sequence | `preloader.js`, `preloader.css` |

---

## Technical Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Structure** | HTML5 | Semantic page architecture |
| **Styling** | CSS3 | Design system, animations, responsive layouts |
| **Logic** | Vanilla JavaScript (ES6+) | State management, filtering, navigation |
| **Data** | JSON | Product catalog with 64 entries |
| **Fonts** | Syne, Inter (Google Fonts) | Brand typography with variable weight support |
| **Assets** | Lottie, SVG | Animated icons and decorative elements |

---

## Entry Points & Initialization Flow
index.html
├── global.css ← Design tokens, typography, colour scheme
├── components.css ← Button, card, form element styles
├── layout.css ← Grid and responsive container rules
├── motion.css ← Animation definitions
├── preloader.css ← First-visit loading overlay styles
├── state.js ← Cart, wishlist, theme initialization
├── nav.js ← Header, hamburger, and panel bindings
├── toast.js ← Notification system binding
└── preloader.js ← Alt Logo animation trigger

text

All HTML pages share the same CSS and JS pipeline. `state.js` initializes first to hydrate localStorage data before any UI renders. `nav.js` and `toast.js` bind to DOM elements across all pages. `filters.js` loads conditionally on `collection.html`.

---

## Key Features

### HCI-Verified Interactions
- **Mega-category navigation** respecting Miller's 7±2 cognitive limit (`nav.js`)
- **Autocomplete search** with keyboard accessibility (`help.html`)
- **Undo cart removal** via toast notification with timeout (`toast.js`)
- **Auto-saving checkout** with localStorage draft recovery (`state.js`, `checkout.html`)
- **Product image zoom** replacing false zoom affordance (`product.html`)
- **Constrained prose** for optimal saccadic reading (`about.html`, `help.html`)

### Visual Polish
- Custom cursor with hover states
- Smooth sidebar and toast animations (`motion.css`)
- Theatrical preloader with Alt Logo assembly (`preloader.css`, `preloader.js`)
- Skeleton shimmer loading states (`motion.css`)
- Light/Dark mode with persisted preference (`global.css`, `state.js`)

### Performance
- Debounced filter queries preventing layout thrash (`filters.js`)
- Centralized JSON data reducing network requests (`products.json`)
- CSS-only animations where possible (GPU-composited, no JS overhead)
- Optimistic UI updates on cart and wishlist operations (`state.js`)

---

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd zora

# Serve locally (any static server works)
npx serve .
# or
python3 -m http.server 8000

```
Prerequisites: None. ZORA runs on static HTML, CSS, and vanilla JavaScript. No build step, no package manager, no framework.

Open http://localhost:8000 in any modern browser.

## Attributions
Typography: Syne and Inter (Google Fonts)

Icons: SVG assets in assets/ directory

Animation: Lottie for complex vector motion

Design inspiration: BURGA e-commerce patterns (non-affiliated)
