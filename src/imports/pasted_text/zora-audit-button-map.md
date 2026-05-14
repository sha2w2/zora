ZORA — FUNCTIONAL PROTOTYPE HCI AUDIT & BUTTON MAP
═══════════════════════════════════════════════════
PART 1: BURGA HCI ISSUES → ZORA FIXES
H1 — Visibility of System Status (Burga Rating: ~0.6 / 1.0)
#	Burga Failure	ZORA Fix
1.1	No skeleton loading screens — product grids vanish to a white screen during filtering, leaving users uncertain if the system is working.	Skeleton cards with shimmer animation on every collection load and filter change.
1.2	Zero cart-add feedback animation — the cart slide-out simply appears; no micro-interaction confirms the item was added.	Badge superscript bounces on add (115% scale burst). Lottie sparkle on wishlist toggle. Slide-in cart panel with backdrop fade.
1.3	Device selector gives no progress indication — users don't know how many steps remain before reaching products.	Step indicator: "Step 1 of 2: Select Your Device" with a progress bar.
1.4	No loading spinner or throbber during any async operation.	Global loading indicator (subtle top-bar spinner) for all fetch operations.
H2 — Match Between System and Real World (Burga Rating: ~0.7 / 1.0)
#	Burga Failure	ZORA Fix
2.1	"Snap" vs "Tough" vs "Elite" jargon unexplained at decision point — first-time buyers must visit a separate guide page to understand case types.	Inline tooltip on each case-type option: "Snap — slim, one-piece hard shell" / "Tough — dual-layer silicone + hard shell."
2.2	MagSafe filtering buried — compatibility info hidden in product descriptions.	MagSafe badge clearly visible on compatible products in the collection grid. Filter chip "MagSafe Compatible" prominent in filter bar.
H3 — User Control and Freedom (Burga Rating: ~0.5 / 1.0)
#	Burga Failure	ZORA Fix
3.1	No undo on wishlist removal — once the heart is toggled off, the item is gone.	5-second undo toast on all removals (cart item, wishlist item, filter clear).
3.2	No "Back to Results" button on product pages — users must rely entirely on browser back.	Explicit "← Back to [Collection Name]" breadcrumb button at the top of every product detail page.
3.3	Cart is session-only with a buried disclaimer — items silently vanish.	Persistent localStorage cart with a visible expiry notice: "Items reserved for 1 hour" with countdown timer.
3.4	"Remove All Filters" absent from some collection views — users get trapped in zero-result states.	"Clear All Filters" button always visible when any filter is active.
H4 — Consistency and Standards (Burga Rating: ~0.6 / 1.0)
#	Burga Failure	ZORA Fix
4.1	ALL CAPS labels used inconsistently — some buttons are caps, some aren't.	Unified button style system: Sentence case for buttons, ALL CAPS only for category labels.
4.2	Device selector flow uses a different UI pattern for AirPods/iPad vs Phone Cases — different modal style, different step structure.	One reusable device-selector component used identically across all product categories.
4.3	"RECOMMENDED FOR YOU" vs "PERFECT MATCH" — the same cross-sell widget is labelled differently on different pages.	Single label: "Complete Your Look" on all product pages.
4.4	Account icon missing entirely on some breakpoints / page types.	Account icon always present in the header, with a dropdown when logged in.
H5 — Error Prevention (Burga Rating: ~0.4 / 1.0)
#	Burga Failure	ZORA Fix
5.1	Users can reach the cart without selecting a device model — results in a generic product being added with no model specified.	"Add to Cart" stays disabled (greyed out) until device model is selected, with tooltip: "Select your device model first."
5.2	No confirmation before removing items from cart or wishlist.	Confirmation toast with undo on every removal.
5.3	Checkout fields have no real-time validation — errors only shown after submission attempt.	Inline real-time validation with green/red borders on phone, email, and address fields.
5.4	No compatibility warning when a MagSafe-only case is added for a non-MagSafe device.	Warning banner on product page: "This case requires MagSafe. Your selected device does not support MagSafe."
H6 — Recognition Rather Than Recall (Burga Rating: ~0.3 / 1.0)
#	Burga Failure	ZORA Fix
6.1	No "Recently Viewed" section anywhere on the site.	"Recently Viewed" strip at the bottom of every product page and homepage, pulling the last 4 unique products from localStorage.
6.2	Device model selection resets on navigation — if you browse away and return, you must re-select.	Device selection persisted in localStorage and displayed as a persistent chip: "Showing cases for: iPhone 16 Pro ✕ change."
6.3	Active filters not persistently prominent — applied filters are shown but easy to miss.	Sticky filter chip bar below the header, showing all active filters with individual ✕ dismiss buttons.
H7 — Flexibility and Efficiency of Use (Burga Rating: ~0.3 / 1.0)
#	Burga Failure	ZORA Fix
7.1	No keyboard shortcuts of any kind.	Ctrl+K global search shortcut, / to focus the filter search, Esc to close any open panel.
7.2	Tab navigation is broken on the device selector modal — focus trapped, elements unreachable.	Full Tab operability on every interactive element. Visible gold/amber focus rings (matching ZORA accent). Skip-to-content link as the first tabbable element.
7.3	Alt text is generic ("product image") or missing entirely.	Descriptive alt text on every image: "ZORA Clover Phone Case for iPhone 16 Pro — front view."
7.4	Power users cannot filter by multiple attributes simultaneously — style, colour, and case type require sequential filtering.	Multi-select filter chips — all attributes selectable simultaneously with instant grid update.
H8 — Aesthetic and Minimalist Design (Burga Rating: ~0.5 / 1.0)
#	Burga Failure	ZORA Fix
8.1	Promotional banner + announcement bar stack with the nav — consuming nearly 15% of above-the-fold space before any product is visible.	One announcement bar only: "Free shipping over €40 · New drops every Friday."
8.2	Product cards have up to three overlapping badges (SOLD OUT + LIMITED EDITION + MORE COLORS) on a single card.	Maximum one badge per card. Priority: "Sold Out" > "New" > "Sale."
8.3	Homepage is overcrowded — promotional banners, sale badges, countdown timers, trending strips, and editorial content compete simultaneously.	Three clean homepage zones: Hero, Trending Now, Shop by Vibe. No visual noise.
8.4	Product detail pages crowd all information — materials, care, fit, and shipping compete for attention.	Accordion progressive disclosure for all technical data below the fold.
H9 — Help Users Recognize, Diagnose, and Recover from Errors (Burga Rating: ~0.5 / 1.0)
#	Burga Failure	ZORA Fix
9.1	"SOLD OUT" shown with no alternative — no similar products, no restock notification offered proactively.	"Sold Out — See Similar Designs" carousel below the product. "Notify Me When Back in Stock" button.
9.2	404 page is the default Shopify template — no brand personality, no search bar, no redirect.	Branded ZORA 404 page with search bar, suggested categories, and a 7-second countdown redirect to homepage.
9.3	Invalid device + case compatibility gives no clear warning before purchase.	Compatibility warning banner on product page before Add to Cart.
9.4	Silent redirects from invalid product links — no feedback to the user.	Brief flash message: "This product is no longer available. Redirecting you to similar items..."
H10 — Help and Documentation (Burga Rating: ~0.4 / 1.0)
#	Burga Failure	ZORA Fix
10.1	Help centre is at support.burga.com — a completely separate domain, not integrated into the shopping experience.	Help accessible from the main header (question-mark icon), footer, and a dedicated /help page within the same domain.
10.2	FAQ not accessible from the main nav — only found in the footer.	FAQ link in header, account dropdown, and footer (triple redundancy).
10.3	Case-type comparison (Snap vs Tough vs Elite) requires visiting a separate guide page — not surfaced at the point of decision.	Inline tooltip explainers on the product page (see H2).
10.4	Live chat widget not consistently available across all pages.	Persistent live chat widget (bottom-right corner) on every page, collapsible.
10.5	Contact form reported broken by customers — no escalation path.	Working contact form on the Help page + live chat + email link: "support@zorastore.com."
PART 2: FUNCTIONAL PROTOTYPE — BUTTON INVENTORY & FUNCTIONALITY MAP
2.1 Global Header (All Pages)
#	Element	Location	Functionality	States
H1	Main Logo (logo light / logo dark)	Header centre	Links to homepage. Switches variant based on theme (light/dark).	Hover: subtle scale 1.02
H2	Navigation Categories	Header left	Phone Cases, AirPods, iPad, Watch, Accessories, Sale. Dropdown mega-menu on hover/click with subcategories.	Active page: bold + underline accent. Hover: colour shift.
H3	Search Icon / Bar	Header right	Click opens search overlay. Ctrl+K keyboard shortcut activates. Debounced 300ms search as user types. Results appear in dropdown.	Empty: placeholder "Search ZORA...". Active: focused with glow ring.
H4	Account Icon (👤)	Header right, between Search and Wishlist	MISSING in current build — MUST BE ADDED. Opens account dropdown: Sign In / Register (if logged out) or My Orders / Settings / Logout (if logged in).	Logged out: generic user icon. Logged in: initials avatar.
H5	Wishlist Heart Icon (♡)	Header right, between Account and Cart	Links to /wishlist. Displays superscript badge with item count. Heart toggles filled/empty on the product page.	Empty: outline heart. Items present: filled heart + badge. Badge bounces on add.
H6	Cart Bag Icon (🛍)	Header right, last item	Opens cart slide-out sidebar (right). Displays superscript badge with item count.	Empty: bag outline. Items present: filled bag + badge. Badge bounces on add.
H7	Theme Toggle	Inside Account dropdown or footer	Switches between light mode (#FFC5C5 bg) and dark mode (#A22828 bg). Persisted in localStorage.	Sun icon (light) / Moon icon (dark).
H8	Help Icon ( ? )	Header right (or in Account dropdown)	Links to /help.	Always visible.
H9	Announcement Bar	Above header, full width	"Free shipping over €40 · New drops every Friday." Dismissible with ✕ (persisted in sessionStorage).	Visible on first visit; dismissible.
H10	Skip-to-Content Link	First tabbable element (visually hidden until focused)	Jumps to <main> content.	Hidden; visible on Tab focus.
H11	Hamburger Menu (☰)	Header left (mobile only, < 768px)	Opens mobile navigation drawer (slides in from left). Contains all category links + account + help.	Closed: hamburger. Open: ✕ close icon.
2.2 Homepage (index.html)
#	Element	Location	Functionality	States
HP1	Hero CTA — "Shop Phone Cases"	Hero section, centre	Links to /collection/phone-cases.	Hover: background colour swap, scale 1.03.
HP2	Hero CTA — "Find My Case"	Hero section, beside primary CTA	Opens the device selector modal (step 1).	Hover: outline glow.
HP3	Device Selector Modal	Overlay, triggered by HP2 or nav	Step 1: Select brand (Apple, Samsung, Google). Step 2: Select model. Persists selection in localStorage.	Step indicator at top. Selected option highlighted. "Continue" button enabled only after selection.
HP4	Trending Now — Horizontal Scroll	Below hero	8 product cards in a horizontally scrollable row. Left/right arrow buttons at edges.	Cards: skeleton on load, then cross-fade to image. Hover: swap to lifestyle image, show Quick Add button.
HP5	Shop by Vibe — Grid	Below Trending	4 category cards: Dark & Moody, Soft & Floral, Clean & Minimal, Bold & Loud. Each links to a pre-filtered collection.	Hover: card lifts slightly, accent border glows.
HP6	Recently Viewed Strip	Bottom of homepage	Shows last 4 viewed products from localStorage. Slides in from left on scroll into view.	Empty: hidden entirely. Items present: horizontal scroll.
HP7	Footer Navigation	Page bottom	Duplicated category links + Wishlist + Help + FAQ + Shipping + Returns + Contact.	Links styled in muted text; hover: accent colour.
2.3 Collection Page (collection.html)
#	Element	Location	Functionality	States
C1	Persistent Device Chip	Below header	"Showing cases for: iPhone 16 Pro ✕ change." Clicking ✕ clears selection. Clicking "change" reopens device modal.	Visible only when a device is selected.
C2	Filter Bar	Below device chip	Multi-select filter chips: Vibe, Colour, Case Type (Snap/Tough/Elite/MagSafe), Price Range.	Active filters: accent background, ✕ dismiss. "Clear All" button visible when any filter active. Undo toast on clear all.
C3	Product Count	Beside filter bar	"247 designs" — updates dynamically as filters are applied.	Updates in real time.
C4	Sort Dropdown	Filter bar, right-aligned	"Sort by: Featured / Newest / Price: Low-High / Price: High-Low."	Active sort: bold.
C5	Product Grid (3 columns)	Main content area	Product cards with skeleton loading on filter change. 700ms debounced grid update.	Loading: shimmer skeleton. Loaded: image + name + price + Quick Add on hover.
C6	Product Card — Heart Toggle	Top-right of each card	Adds/removes from wishlist. Filled heart = in wishlist. Lottie sparkle animation on add.	Not wishlisted: outline. Wishlisted: filled accent colour.
C7	Product Card — Quick Add	Appears on hover, bottom of card	Adds item directly to cart (with default size/colour or prompts selection).	Hidden until hover. Click: badge bounce + toast.
C8	Pagination / Load More	Below grid	"Load More" button or infinite scroll. Skeleton cards appear while loading.	Button visible if more items exist.
2.4 Product Detail Page (product.html)
#	Element	Location	Functionality	States
P1	Breadcrumb	Top of page	"Home › Phone Cases › Floral › Clover Design." Each segment is clickable.	Hover: underline. Current page: not clickable.
P2	← Back to Collection	Above breadcrumb	Returns to the previous collection page with filters preserved.	Hover: shifts left slightly.
P3	Product Image Gallery	Left column	Large main image + thumbnails below. Click thumbnail → main image swaps. Hover on main image → zoom lens.	Active thumbnail: highlighted border.
P4	Device Model Selector	Right column, top	Dropdown or chip selector. Persisted from collection or homepage selection.	Disabled state before selection. "Select your device" placeholder.
P5	Case Type Selector	Right column, below device	Radio buttons or chip selector: Snap / Tough / Elite / Tough MagSafe / Elite MagSafe. Each has an inline tooltip (ℹ icon) explaining the type.	Selected: filled accent. Tooltip: appears on ℹ hover.
P6	Colour Variant Swatches	Right column, below case type	Circular swatches. Click selects the colour; clicking the same colour again deselects.	Selected: ring + checkmark. Out of stock: crossed out.
P7	Quantity Selector	Right column	- / + stepper. Min 1, max 10.	Disabled - at 1. Disabled + at 10.
P8	Add to Cart Button	Right column, prominent	DISABLED UNTIL DEVICE MODEL + CASE TYPE + COLOUR ARE SELECTED. Tooltip on disabled hover: "Select your device model first" or "Choose a case type." Enabled: full accent colour, click triggers scale burst + cart badge bounce + sidebar slide-in.	Disabled: greyed out. Enabled: accent colour. Loading: spinner inside button. Added: brief "✓ Added" state.
P9	Wishlist Toggle	Beside Add to Cart	Heart icon. Toggles wishlist. Lottie sparkle on add. Toast on removal with undo.	Active: filled heart. Inactive: outline.
P10	Compatibility Warning Banner	Below Add to Cart (conditional)	Appears if MagSafe case + non-MagSafe device. "This case requires MagSafe. Your selected device does not support MagSafe."	Hidden if compatible. Yellow warning style if incompatible.
P11	Accordion Sections	Below the fold	Product Details, Compatibility, Care Instructions, Shipping & Returns. Click header to expand/collapse. Only one section open at a time (optional).	Collapsed: ▶ arrow. Expanded: ▼ arrow + content.
P12	"Complete Your Look" Cross-Sell	Below accordions	Carousel of complementary products (screen protector, ring holder, matching AirPods case).	Scroll arrows. Add to Cart on each item.
P13	"Sold Out — See Similar" Carousel	Replaces Add to Cart if item sold out	Shows similar in-stock designs.	"Notify Me" button below.
P14	Recently Viewed Strip	Bottom of page	Same as homepage HP6.	Same behaviour.
2.5 Cart Sidebar (Slide-Out Panel)
#	Element	Location	Functionality	States
CT1	Cart Panel	Slides in from the right	Overlay with backdrop blur. Contains item list + summary + CTA. Triggered by header cart icon. Close with ✕, Esc key, or clicking backdrop.	Entrance: slide-in-right + backdrop fade. Exit: slide-out-right.
CT2	Cart Item Row	Inside panel	Product image, name, selected variant, quantity stepper, price, remove ✕.	Remove triggers undo toast.
CT3	Cart Expiry Notice	Top of panel (conditional)	"Items reserved for 1 hour" with countdown timer.	Always visible when cart has items.
CT4	Subtotal + "Go to Checkout" Button	Bottom of panel	Displays subtotal. Button links to checkout flow.	Button always active if cart has items.
CT5	Empty Cart State	Panel when empty	"Your cart is empty." + "Start Shopping" link.	Shown when cart has 0 items.
2.6 Wishlist Page (wishlist.html)
#	Element	Location	Functionality	States
W1	Wishlist Grid	Main content	Product cards with image, name, price, Add to Cart, Remove.	Remove: undo toast.
W2	Empty Wishlist State	When no items	"Your wishlist is empty. Browse our collections to find designs you'll love." + CTA to Shop Phone Cases.	Shown when wishlist is empty.
W3	"Add All to Cart"	Top of grid (conditional)	Adds all in-stock wishlist items to cart.	Visible only when wishlist has items.
2.7 Help Page (help.html)
#	Element	Location	Functionality	States
HL1	FAQ Accordion	Main content	Grouped by topic: Orders, Shipping, Returns, Compatibility, Account. Click to expand/collapse. Client-side search at top.	Search filters accordion items in real time.
HL2	Live Chat Widget	Bottom-right, all pages	Expandable chat interface. Minimised by default.	Minimised: chat bubble icon. Expanded: chat window.
HL3	Contact Form / Email Link	Below FAQ	Fallback escalation: "Can't find your answer? Chat with us or email support@zorastore.com."	Email link opens mail client.
2.8 404 Page (404.html)
#	Element	Location	Functionality	States
E1	404 Message	Centre	Branded: "Looks like this case is out of stock... and so is this page."	–
E2	Search Bar	Below message	Lets user search from the 404 page.	–
E3	Suggested Links	Below search	Phone Cases, AirPods Cases, Home.	Hover: accent underline.
E4	Countdown Redirect	Bottom	"Redirecting you home in 7 seconds..." Auto-redirects to homepage.	Countdown visible; click to cancel.
2.9 About Page (about.html)
#	Element	Location	Functionality	States
A1	Alt Logo (Star + Z)	Left column, hero	Floating animation — the alt logo that was previously misplaced on the homepage. Slowly rotates, gentle float.	Respects prefers-reduced-motion: static if reduced.
A2	Brand Story	Right column	"Our Story" — brand mission, values, design philosophy.	–
A3	Brand Imagery	Below hero	Grid of behind-the-scenes and product-in-use photos. Lazy loaded.	–
PART 3: AESTHETIC UPHOLDING — outfit.hellohello.is INSPIRATION
What ZORA Carries Forward from the Inspiration
Loading Animation (First Visit Only): Full-screen overlay with morphing 3D shapes and the alt logo (Z in star) assembling from scattered fragments. The animation respects prefers-reduced-motion and never replays during the same session. This mirrors outfit's theatrical entrance while being HCI-compliant.

Bold Colour Blocking: The light/dark mode tokens (#FFC5C5 / #A22828) create the same confident, Gen-Z energy as outfit's palette — but applied to cards, buttons, and accents rather than background shapes.

Typography as Identity: Syne for hero headlines mirrors outfit's editorial, geometric feel. Inter for body ensures readability. Space Grotesk for accent labels adds the tech-tinged edge.

Playful Micro-Interactions: Lottie sparkles, badge bounces, and smooth sidebar transitions bring the same sense of "aliveness" that outfit achieves with its 3D elements — but ZORA's animations are confined to feedback moments, not persistent noise.

The Alt Logo's Home: The floating star logo (previously on the homepage) now lives on the About page — freed to express brand personality without interfering with the shopping task flow.

What ZORA Intentionally Leaves Out
No floating 3D objects on the homepage or product pages. The homepage is clean, structured, and shopping-optimised — exactly like Vaulté's Women landing.

No background geometry competing with product images. Cards sit on solid backgrounds. Vibrancy comes from the colour tokens, not ambient decoration.

No persistent motion. Animations fire on interaction, then rest — they communicate state, not distract.

PART 4: BUILD ORDER (Functional Prototype)
global.css — CSS variables, typography, prefers-reduced-motion shield, light/dark mode tokens.

motion.css — Shared transition classes (slide-in-right, slide-out-right, scale-bounce, fade-in, skeleton shimmer).

preloader.css + preloader.js — First-visit loading animation with alt logo assembly.

state.js — localStorage persistence engine for cart, wishlist, recently viewed, device selection, theme preference.

toast.js — Undo-capable toast system with slide-up animation and 5-second lifetime.

nav.js — Header interactions, mobile hamburger, mutual exclusion of open panels, Ctrl+K listener, Esc listener, skip-link.

filters.js — Multi-select filter logic, chip management, clear-all with undo, 700ms debounced grid update.

device.js — Device selector modal, step indicator, persistence, compatibility checking.

components.css + layout.css — Buttons, cards, badges, accordions, product grids, cart sidebar, footer.

index.html — Homepage assembly: header, hero (clean, no floating shapes), trending, shop-by-vibe, recently viewed, footer.

collection.html — Product grid with skeleton loading, filter bar, device chip.

product.html — PDP with disabled Add-to-Cart gate, accordions, cross-sell, breadcrumb, back button.

cart-sidebar.html (partial, injected) — Slide-out cart with undo, expiry timer, empty state.

wishlist.html — Saved items grid with undo.

about.html — Alt logo floating animation + brand story.

help.html — FAQ accordion with search + contact escalation.

404.html — Branded error page with search + redirect.

spline.js (optional) — 3D scene loader for About page alt logo.

PART 5: VERIFICATION CHECKLIST
Account icon present in the header on all pages.

All header buttons (Search, Account, Wishlist, Cart, Help, Theme Toggle) are clickable and perform their function.

Mobile hamburger menu opens and closes with smooth slide animation.

Cart sidebar slides in/out smoothly; backdrop is clickable to dismiss.

Add to Cart is disabled until device + case type + colour are all selected.

Tooltip appears on hover over the disabled Add to Cart button.

Wishlist heart toggles state and shows Lottie sparkle on add.

Toast appears on cart/wishlist removal with a 5-second undo link.

Undo actually restores the item.

Recently Viewed strip appears and updates as the user browses.

Device selection persists across page navigations.

Filters survive browser back navigation.

Ctrl+K opens search. Esc closes any open panel.

Tab navigation reaches every interactive element with a visible focus ring.

Skeleton cards appear during filter changes and page loads.

404 page shows branded message with search and countdown.

All animations are disabled when prefers-reduced-motion: reduce.

Alt logo floating animation is only on the About page and loading screen — not on homepage.

Homepage is clean and shopping-focused — no floating shapes.

Light/dark mode toggle works and persists across sessions.