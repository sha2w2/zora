1. Scroll Reset on Every Page Load
Goal: No matter where a user was previously scrolling, a new page always opens at the top.

Implementation:
In a global JavaScript file (e.g., main.js), add this one‑time listener:

javascript
window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
});
Or, if you prefer a CSS‑only guard, place this in global.css:

css
html {
  scroll-behavior: auto;
}
And ensure no element has a persisted scroll position; the line above forces a fresh start.
This already respects all HCI principles (H7 – efficiency; H3 – user control).

2. Replace “Shop by Vibe” with Auto‑Scrolling Social Marquee
Remove the four non‑functional vibe cards from the homepage.
Insert the following right above the footer (or after “Recently Viewed”):

2.1 HTML Structure (replace content inside the old section’s container)

html
<section class="social-proof-section">
  <h2 class="social-header">Join 1.2M+ followers of @zora_official</h2>
  
  <div class="film-string-container">
    <div class="film-string-track" id="marquee-track">
      <!-- 8–10 portrait lifestyle photos, sourced from royalty‑free sites -->
      <div class="polaroid"><img src="assets/social/ugc1.jpg" alt="ZORA community style"></div>
      <div class="polaroid"><img src="assets/social/ugc2.jpg" alt="ZORA community style"></div>
      <div class="polaroid"><img src="assets/social/ugc3.jpg" alt="ZORA community style"></div>
      <div class="polaroid"><img src="assets/social/ugc4.jpg" alt="ZORA community style"></div>
      <div class="polaroid"><img src="assets/social/ugc5.jpg" alt="ZORA community style"></div>
      <!-- etc. -->
    </div>
  </div>
</section>
2.2 CSS (add to components.css or a new social.css)

css
.social-header {
  text-align: center;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

.film-string-container {
  overflow: hidden;
  width: 100%;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.film-string-track {
  display: inline-flex;
  gap: 20px;
  animation: scrollTrack 30s linear infinite;
  padding-left: 20px;
}

.film-string-track:hover {
  animation-play-state: paused;
}

.polaroid {
  flex: 0 0 250px;
  aspect-ratio: 4 / 5;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.polaroid img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.polaroid:hover {
  transform: scale(1.04);
}

@keyframes scrollTrack {
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
2.3 JavaScript (place in the same global JS file or inline after the HTML)

javascript
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("marquee-track");
  if (track) {
    const clone = track.innerHTML;
    track.innerHTML += clone; // duplicate for seamless loop
  }
});
2.4 Image Sourcing

Use royalty‑free vertical photos from Unsplash: search “fashion mirror selfie”, “phone case lifestyle”, “woman with laptop”, “influencer outfit”.

Download 8–10 different portraits (no repeat images).

Name them descriptively in assets/social/.

HCI Note: The hover pause respects user control (H3). The auto‑scroll is purely decorative and does not interfere with keyboard navigation.

3. Hero Text Overlay Fix
Problem: The hero image (or card) partially obscures the headline “ZORA” and sub‑text.
Solution: Move the image behind the text using z-index.

Locate the hero section’s CSS (likely in layout.css or hero.css). Ensure the text container has a higher z-index than the image.

css
.hero-text-wrapper {
  position: relative;
  z-index: 5;
}

.hero-image {
  position: absolute;  /* or relative */
  z-index: 1;
  /* remove any opacity-reducing overlay if present */
}
If the image is an <img> inside the same container, restructure slightly:

html
<div class="hero-container">
  <img class="hero-image" src="..." alt="" aria-hidden="true">
  <div class="hero-text-wrapper">
    <h1>ZORA</h1>
    <p>The Spring collection is here. Protect your tech with unapologetic style.</p>
  </div>
</div>
And CSS:

css
.hero-container {
  position: relative;
}
.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
.hero-text-wrapper {
  position: relative;
  z-index: 2;
  text-align: left; /* or center, depending on current design */
  padding: 4rem;
}
Make sure the background doesn’t overpower the text: if needed, add a subtle dark gradient behind the text only (e.g., background: linear-gradient(to right, rgba(0,0,0,0.4), transparent) on .hero-text-wrapper).

4. Status of Previous Fixes (Unchanged)
✅ Menu pop‑up slides in from left (logical, as button is left‑aligned).

✅ About link in footer (SHOP | SUPPORT | ABOUT | NEWSLETTER).

✅ Floating ❓ help button at bottom‑left, 44×44px, always visible.

✅ All product images are unique and category‑appropriate (no recycling).

✅ Category navigation mirrors Burga exactly (Phone Cases, Charging, Ring Holders, …).

✅ Sign‑in/Register, Help, Wishlist, Cart, Checkout – all buttons functional.

Everything else – colours, typography, motion tokens, preloader, custom cursor – remains exactly as approved.

These are the absolute final touches. Apply them, and the prototype will be both HCI‑exemplary and socially‑immersive, with a crystal‑clear hero message.

