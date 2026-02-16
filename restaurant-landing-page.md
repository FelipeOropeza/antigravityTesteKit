# Task: Restaurant Landing Page - "The Nocturnal Gastronomy"

## 🧠 Deep Design Thinking & Concept
**Style Selected:** Option A (Immersive Dark Mode) -> Refined to **"Nocturnal Gastronomy"**.

-   **Emotion:** Sophistication, Appetite, Exclusivity.
-   **Geometry:** **Sharp/Brutal (0px-2px)**. No soft rounded corners. We want a "knife-edge" precision look.
-   **Palette:**
    -   Background: `Rich Black (#0a0a0a)` or `Deep Charcoal (#121212)`.
    -   Text: `Off-White-Smoke (#e0e0e0)` (Never pure white).
    -   Accent: `Burnt Amber (#d35400)` or `Metallic Gold (#c5a059)`.
    -   **PURPLE BAN:** Strictly enforced.
-   **Typography:**
    -   Headlines: **Cinzel** or **Playfair Display** (Google Fonts) - Elegant, sharp serifs.
    -   Body: **Manrope** or **Space Grotesk** - Clean, technical sans.
-   **Layout Strategy (Anti-Safe Harbor):**
    -   **No Standard Split**: Hero will use a "Cinematic Full Overlay" or "Asymmetric Typography" where text interacts with the food image.
    -   **Overlap**: Menu items will overlap slightly to create depth.
    -   **Navigation**: Minimal floating bar or vertical text.

## 🛠️ Implementation Plan

### Phase 1: Setup & Assets
1.  **Project Initialization**: Create `index.html`, `css/styles.css`, `js/main.js`.
2.  **Asset Generation**: Use `generate_image` for:
    -   Hero Background (Dark, moody, high-end plated food).
    -   Signature Dish 1-3 (Plated, macro shots).
    -   Ambient Interior (Dark, candlelight).

### Phase 2: Structural Foundation (HTML)
1.  **Semantic Structure**: `<header>`, `<main>`, `<section id="hero">`, `<section id="menu">`, `<section id="reservation">`, `<footer>`.
2.  **Reservation Modal**: A dedicated dialog element or overlay that is accessible.

### Phase 3: Styling (CSS)
1.  **Variables & Base**: Define colors, typography, and specific easing curves (`cubic-bezier`).
2.  **Hero Section**: Implement the massive typographic layout.
3.  **Menu Section**: CSS Grid with "masonry" feel or horizontal scroll for mobile.
4.  **Glassmorphism (Refined)**: Use subtle noise textures + blur, not just standard generic glass. *Strict borders (1px solid).*
5.  **Animations**:
    -   Scroll-triggered reveals (IntersectionObserver).
    -   Magnetic buttons (optional).
    -   Parallax on images.

### Phase 4: Interactivity (JS)
1.  **Mobile Menu**: Smooth transition.
2.  **Reservation Logic**:
    -   Open/Close Modal.
    -   Standard form validation (no backend, just UI).
3.  **Scroll Effects**: Update navbar on scroll.

### Phase 5: Polish & Audit
1.  **Responsiveness**: Mobile check (Hamburger menu, touch targets).
2.  **Performance**: Image optimization basics.
3.  **Final "Wow" Check**: Does it look like a template? If yes, break it.

## 📂 File Structure
```
/ (root)
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── hero-bg.webp
    ├── dish-1.webp
    ├── dish-2.webp
    └── ...
```

## 📝 User Review Required
Please approve this plan to commence coding.
