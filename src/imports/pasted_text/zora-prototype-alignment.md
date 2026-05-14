ZORA — FULL PROTOTYPE ALIGNMENT WITH BURGA’S STRUCTURE
═══════════════════════════════════════
What’s Fixed / Upgraded Now
Navigation exactly mirrors Burga – all sections and subsections present.

“Menu” button triggers an animated filter popup – for vibe/colour/case‑type.

Every button leads to the correct, populated collection – no more “everything goes to phone cases”.

All categories populated – AirPods, tablets, laptops, drinkware, etc. with at least 48 items.

About page – with exact mission statement and a Careers button.

Careers page – explains ZORA is fictional, links to LinkedIn, GitHub, portfolio.

All previous HCI, animation, and aesthetic rules remain untouched.

1. FULL NAVIGATION STRUCTURE (Matching Burga)
1.1 Top‑Left Main Categories (Primary Optical Area)
Phone Cases

Charging

Ring Holders

Drinkware

Earbuds Cases

Tablet Cases

Kindle Cases

Laptop Protection

Watch Bands

Phone Straps

Notebooks & Planners

Eyewear

Bundles

Accessories

Collaborations

Clearance / Sale

1.2 Subcategories (dynamic mega‑menus)
Each of the above opens a dropdown with specific filters:

Main Category	Sub‑options (for collection URL)
Phone Cases	Apple (iPhone 17 Pro, iPhone 17, iPhone 16 Pro, etc.), Samsung (Galaxy S25, S24...), Google (Pixel 9...), Other
Charging	Power Banks, Wireless Chargers, Cables
Ring Holders	MagSafe, Universal
Drinkware	Tumblers, Mugs, Bottles
Earbuds Cases	AirPods (Pro 2, Pro 1, 3, 2, Max), Samsung Galaxy Buds
Tablet Cases	Apple (iPad Pro, iPad Air...), Samsung (Galaxy Tab S10...)
Kindle Cases	Kindle Paperwhite, Kindle Oasis, Kindle
Laptop Protection	MacBook (Air 15, Pro 14...), HP, Lenovo, Dell
Watch Bands	Apple Watch (Series 9, Ultra 2...), Samsung Galaxy Watch
Phone Straps	Wristlets, Crossbody
Notebooks & Planners	A5 Notebooks, Dated Planners
Eyewear	Blue Light Glasses, Sunglasses
Bundles	Phone + Earbuds, Phone + Watch etc.
Accessories	Screen Protectors, Lens Protectors, Charms
Collaborations	Current artist collab collections
Clearance	End‑of‑season, discontinued models
The “Find My Case” button on the hero now jumps to a general device selector that covers all major tech categories, not just phones.

2. THE “MENU” BUTTON — ANIMATED FILTER POPUP
2.1 Location
In the header, to the left of the cart / user icons, or directly below the main nav (Burga style).

Label: “Menu ☰” (like Burga).

It opens a full‑screen, animated overlay that acts as a filter hub.

2.2 Popup Content
Filter by Vibe – four mood cards: Dark & Moody, Soft & Floral, Clean & Minimal, Bold & Loud.

Filter by Device Type – quick jump to Phone, AirPods, Tablet, etc.

Filter by Case Type – Snap, Tough, Elite, MagSafe.

Quick Links – Sale, New Arrivals, Best Sellers.

A “Close” button (✕) + backdrop dismiss.

2.3 Animation
Overlay scales up from centre (300ms spring easing).

Each filter section fades in sequentially (50ms stagger).

Smooth exit when dismissed.

Respects prefers-reduced-motion (instant appear/disappear).

2.4 HCI Benefits
Provides an alternative, visual navigation path (H6 – Recognition).

Reduces time to filter (H7 – Accelerators).

Stays out of the way until invoked (H8 – Minimalist Design).

3. PRODUCT POPULATION — EVERY CATEGORY COVERED
Minimum 48 items distributed across all sections:

Category	Count	Example Item
Phone Cases	8	Clover iPhone 17 Pro, Galaxy S25 Snake
Charging	4	Power Bank 10k mAh
Ring Holders	4	MagSafe Clover Ring
Drinkware	4	Insulated Tumbler “Midnight”
Earbuds Cases	6	AirPods Pro 2 Floral, Galaxy Buds Pro
Tablet Cases	4	iPad Pro Floral, Galaxy Tab S10 Tough
Kindle Cases	2	Kindle Paperwhite Clover
Laptop Protection	4	MacBook Air 15″ Snap, Dell XPS Sleeve
Watch Bands	4	Apple Watch Series 9 Leather, Galaxy Watch6
Phone Straps	2	Crossbody Floral
Notebooks & Planners	2	A5 Floral Notebook
Eyewear	2	Blue Light Glasses “Clear”
Bundles	4	Phone + Earbud Set
Accessories	4	Screen Protector, Charms
Collaborations	2	Artist Collab 1
Clearance	2	Discontinued styles
Each product entry in products.json now has:

category – matches the main navigation slug (e.g., earbuds-cases)

subcategory – further breakdown (e.g., airpods-pro-2)

compatibility – deviceType, brand, model (null for non‑tech items)

Images, price, vibe, colours, caseTypes (where applicable)

4. ROUTE & BUTTON MAPPING — NO MORE DEAD ENDS
User Action	Resulting URL / Behaviour
Click “Phone Cases” in nav	/collection/phone-cases (shows all phone cases)
Hover “Phone Cases” → choose “iPhone 17 Pro”	/collection/phone-cases?model=iphone-17-pro
Click “Earbuds Cases”	/collection/earbuds-cases (shows all earbuds)
Choose “AirPods Pro 2” from dropdown	/collection/earbuds-cases?model=airpods-pro-2
Click “Drinkware”	/collection/drinkware
Use “Find My Case” → select “Laptop” → “Dell”	/collection/laptop-protection?brand=dell
“Menu” overlay → click “Soft & Floral” vibe	/collection?vibe=soft-floral (shows all items with that vibe across all categories)
Product card click (any category)	/product.html?id=...
Cart → Checkout	/checkout.html
Header ❓	/help.html
Footer “About”	/about.html
About page “Careers” button	/careers.html
All category pages are now generated by a single collection.html that reads the category URL parameter and filters the global product list. This ensures AirPods, tablets, drinkware, etc. all work.

5. ABOUT & CAREERS PAGES
5.1 About Page (about.html)
Contains the Alt Logo (Z in star) as a decorative floating element (the one previously planned for About).

Mission statement (exact text provided):

“Shanice C S, the author, is a student who is constantly on the path to merge Human Computer Interaction Compliance with Aesthetic Appeal. As a consumer of many platforms on the beautiful web, her inspiration comes from existing platforms as she studies them beyond the average consumer perspective. Of course, for the sake of integrity, these prototypes, whilst being based on existing platforms, are fictional and only serve the purpose of demonstrating how UI elements can be enhanced to improve user experience whilst staying stylish. She is very appreciative of your time here and hopes you had fun with this fictional prototype.”

“Careers” button (large, accent) → navigates to careers.html.

5.2 Careers Page (careers.html)
Shows the ZORA logo (star + Z) prominently.

Message:

“ZORA is a fictional company created purely as a Human‑Computer Interaction prototype. There are no current career opportunities. Instead, you can reach out to the author, Shanice C. Sagonda, or explore her work below.”

Three linked buttons:

LinkedIn → https://www.linkedin.com/in/shanicecsagonda/
GitHub → https://github.com/sha2w2
Portfolio → https://2025digitalcontent-portfolio.vercel.app/
A “Back to About” link for user control.

6. PRESERVATION OF EXISTING QUALITIES
Aesthetics: No change to colour tokens, typography, animations, preloader, About page floating logo, custom cursor, Lenis scroll, etc.

HCI Compliance: All previously mapped fixes for Burga’s failures remain; the new navigation and menu button also follow HCI principles (consistency, visibility, user freedom).

Functionality: Account, sign‑in, wishlist, cart, checkout, help, search all work exactly as defined in the previous plans.

7. BUILD ORDER (Final Revision)
Update products.json to include all 48+ items, correctly tagging each with its category, subcategory, and optional compatibility.

Rewrite collection.html to accept a ?category= parameter and filter accordingly. Add the ability to combine multiple params (e.g., ?category=phone-cases&model=iphone-17-pro).

Rebuild the main navigation to list all 16 categories with their sub‑options. Each link points to the correct URL.

Add the “Menu” button and its animated filter popup (HTML + CSS + JS).

Generate product images for the new categories (Unsplash / simple placeholder tiles).

Build About page with the exact mission text and Careers button.

Build Careers page with the ZORA logo and author links.

Test every link – Phone Cases, AirPods, Drinkware, etc. – to ensure they all show distinct, filtered product grids.

Integrate sign‑in/register flow, help, orders, and loyalty pages (as per previous extensions).

Full accessibility and motion‑safety audit on all new pages.