1. REMOVAL: “FIND MY CASE” & DEVICE‑SELECTOR WIZARD
Decision: The multi‑step device selector modal is permanently removed.

Delete device.js and any associated HTML/overlay.

Remove the hero button labelled “Find My Case”.

Remove the persistent device chip from collection pages.

Remove compatibility‑warning logic on product pages (e.g., MagSafe mismatch).

Why: It created implementation weight disproportionate to user benefit in a prototype. The category navigation and filter system already guide users to the right products efficiently.

2. PROPER POPULATION — REALISTIC INVENTORY PER CATEGORY
Each main category must contain enough items to demonstrate breadcrumbs, filters, and category‑specific imagery without overwhelming the prototype. The rule: 3–5 sub‑groups per category, with distinct product counts as described. All images must be royalty‑free (Unsplash), never shared between products. Every product has two images: a main product shot and a secondary “detail” zoom (a tightly cropped or angle‑shifted version of the same image).

2.1 Product Count Breakdown (adjusted for prototype clarity)
Category	Sub‑groups	Items per sub‑group	Total per category
Phone Cases	iPhone (15, 16, 17 Pro) — 3 models
Samsung (Galaxy S24, S25) — 2 models
Google (Pixel 8a, 9) — 2 models	2 designs each	14
Charging	Power Banks (2), Wireless Chargers (2), Cables (1)	1–2 each	5
Ring Holders	MagSafe (2), Universal (2)	2 each	4
Drinkware	Tumblers (2), Mugs (2), Bottles (1)	1–2 each	5
Earbuds Cases	AirPods Pro 2 (2), AirPods 3 (1), Galaxy Buds (1)	1–2 each	4
Tablet Cases	iPad Pro 2024 (2), iPad Air (1), Galaxy Tab S10 (1)	1–2 each	4
Kindle Cases	Paperwhite (2), Oasis (1)	1–2 each	3
Laptop Protection	MacBook Air 15″ (2), HP Spectre (1), Dell XPS (1)	1–2 each	4
Watch Bands	Apple Watch Series 9 (2), Ultra 2 (1), Galaxy Watch6 (1)	1–2 each	4
Phone Straps	Wristlets (1), Crossbody (1)	1 each	2
Notebooks & Planners	A5 Notebook (1), Dated Planner (1)	1 each	2
Eyewear	Blue Light (1), Sunglasses (1)	1 each	2
Bundles	Phone + Earbud set (2), Phone + Watch band (1)	1–2 each	3
Accessories	Screen Protectors (2), Lens Protectors (1), Charms (1)	1–2 each	4
Collaborations	Artist Collab 1 (1), Artist Collab 2 (1)	1 each	2
Clearance	End‑of‑season designs (2)	2	2
Total products: ~64 items.
Every product entry includes: category, subcategory, vibe, colours, caseTypes (if applicable), and two distinct image paths (images.main, images.detail).

Image sourcing: Use Unsplash searches like:

“phone case flatlay” for phone cases

“airpods case” for earbuds

“laptop sleeve” for laptop protection

“insulated tumbler” for drinkware
The “detail” image can be a cropped close‑up of the same photograph, created manually or via CSS zoom‑effect on the product page.

3. SCROLL POSITION RESET ON PAGE NAVIGATION
All internal page links must scroll the window to the top immediately.

Implementation:

Add a global event listener for link clicks that navigate to new pages (not in‑page anchors).

Before navigation, set window.scrollTo(0,0) or use history.scrollRestoration = 'auto' in the new page’s <script>.

For single‑page‑app‑like transitions (if View Transitions API is used), ensure the new view always starts at y:0.

The result: user never lands mid‑page after clicking a category or product.

4. ABOUT PAGE & CAREERS PAGE
These are critical additions, and the exact copy must be implemented as provided.

4.1 About Page (about.html)
Accessible from the footer (text link “About”) and potentially the account dropdown.

Header: Same global header with centred main ZORA logo.

Content:

The alt logo (star + Z) floats gently in the left column (as previously designed for About).

Right column displays the mission statement exactly:

“Shanice C S, the author, is a student who is constantly on the path to merge Human Computer Interaction Compliance with Aesthetic Appeal. As a consumer of many platforms on the beautiful web, her inspiration comes from existing platforms as she studies them beyond the average consumer perspective. Of course, for the sake of integrity, these prototypes, whilst being based on existing platforms, are fictional and only serve the purpose of demonstrating how UI elements can be enhanced to improve user experience whilst staying stylish. She is very appreciative of your time here and hopes you had fun with this fictional prototype.”

Below that: A large, accent‑coloured button → “Careers at ZORA” (links to careers.html).

Visuals: A grid of brand images (lifestyle shots from the prototype) below the text to keep the page engaging.

4.2 Careers Page (careers.html)
Header: Same global header.

Content:

The alt logo (star + Z) is used at the top of the page (not just plain text “ZORA”).

Message:

“ZORA is a fictional company created purely as a Human‑Computer Interaction prototype. There are no current career opportunities. Instead, you can reach out to the author, Shanice C. Sagonda, or explore her work below.”

Three clearly labelled buttons (or stylised cards) with icons:

LinkedIn → https://www.linkedin.com/in/shanicecsagonda/
GitHub → https://github.com/sha2w2
Portfolio → https://2025digitalcontent-portfolio.vercel.app/
All links open in a new tab (target="_blank").

Back link: “← Back to About” for user control.

5. INCORPORATING BURGA’S SOCIAL‑ALIGNMENT FEATURES
We keep ZORA’s existing aesthetic (colour, typography, motion) but enrich the experience with these social‑commerce components.

5.1 Shoppable Social / Community Gallery
Where: After the “Shop by Vibe” section on the homepage, or on its own dedicated “Inspiration” section.
Content: A mosaic grid of user‑generated‑style photos (sourced from free stock images that look like lifestyle shots, or generated placeholders). Each photo is tagged with a product name and a clickable hotspot that leads to that product’s page.
Effect: Mirrors an Instagram feed without leaving the site, making the transition from “scroll” to “shop” seamless.

5.2 Trend‑Based Categorisation (Already Present, Now Refined)
The “Shop by Vibe” section already exists. Enhance it by adding trend‑aligned labels like “Quiet Luxury”, “Y2K Pop”, “Clean Girl” – small sub‑labels under each vibe card.

These vibe filters must work across all categories (e.g., show all “Soft & Floral” items, whether phone case or notebook).

5.3 Lifestyle Photography Swaps (Enhanced)
Product cards already swap to a lifestyle image on hover. Extend this: on collection pages, the primary image can be a lifestyle shot for a more editorial feel, with the product‑only shot as the secondary. This aligns with Burga’s “high‑gloss” approach.

5.4 Social Proof & Press Badges
Where: Footer or a small strip below the homepage hero.

Display “As Seen In” logos (use generic placeholder names like “The Design Edit”, “TechStyle Mag”, “Digital Trends” – purely decorative, using simple typography or SVG icons).

Add a static “Community Favourites” badge on a few products (e.g., a small fire emoji with “Trending now”).

5.5 Story‑Style Navigation (Mobile)
On mobile viewports (< 768px), replace the traditional horizontal nav with a row of circular highlight bubbles above the main content. Each bubble represents a top category (e.g., Phone Cases, Earbuds, Bundles) and uses a cropped lifestyle thumbnail.

Tapping a bubble filters the page to that category.

This simulates Instagram story behaviour while remaining static (no auto‑play).

5.6 Vertical Video Product Descriptions
On the product detail page, one of the thumbnails can be a looping short video (GIF or MP4) showing the product being handled, instead of a static image.

Source free vertical short clips from royalty‑free sites like Mixkit, then embed with a small “play” overlay.

If video is too heavy for the prototype, use an animated GIF that simulates a Reel (e.g., product tilting, light reflection).

5.7 Interactive Customisation (Design‑Your‑Own)
Add a button on the collection page or a dedicated “Customise” page that leads to a simple pattern layering tool.

This tool uses HTML5 Canvas or CSS overlays: user picks a base product, selects a “vibe” theme, and sees a real‑time preview of colours/patterns combined.

The output is not buyable (prototype), but it demonstrates “interactive social creativity”.

Technical note: Use GSAP or native CSS transitions for smooth swaps.

5.8 Social Engagement Loops
On product cards or the detail page, show a “🔥 X saved this recently” counter (e.g., 248 people). This is a static number, randomised on page load to simulate real‑time data.

A small “Share” button (already planned) can copy a short product description to clipboard.

5.9 Transparent Technical Specs Toggle
Already present as accordion sections on product pages; now refine them to include “Materials & Origin” with a short note on sustainability (even if fictional).

Maintain clean modular formatting.

6. PRESERVING THE EXISTING AESTHETIC
All new features must strictly adhere to ZORA’s design tokens:

Colours: Light mode #FFC5C5 background, #8B3B3B text, #A22828 accent; dark mode inverted.

Typography: Syne (hero/headings), Inter (body), Space Grotesk (labels).

Motion tokens: 150ms fast, 300ms smooth, 400ms bounce; all respect prefers-reduced-motion.

No floating blobs or distracting 3D elements on shopping pages – the alt logo only appears on About and the preloader.

The new social gallery and story bubbles will use soft rounded corners and subtle shadows that match existing card styles.

7. VERIFICATION CHECKLIST (Post‑Implementation)
“Find My Case” button and all related UI removed; no broken references remain.

Every category link leads to the correct collection page with distinct products.

Each product has two unique royalty‑free images (main + detail).

Clicking any product navigates to its page scrolled to the top.

About page exists (footer link) and contains the exact mission text + Careers button.

Careers page shows ZORA alt logo and the three author links, all in new tabs.

Homepage includes shoppable social gallery (static but interactive) and “As Seen In” badges.

Mobile view shows story‑style navigation bubbles.

At least one product page uses a video/GIF instead of a static secondary image.

Product detail page shows a “🔥 saved” social counter and has a “Design Your Own” button (linking to customisation tool).

Customisation tool allows real‑time colour/pattern preview.

No aesthetic drift – colours, type, and motion remain unchanged.

Full keyboard accessibility and prefers-reduced-motion compliance for all new animations.