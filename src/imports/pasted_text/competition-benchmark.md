PART 1: LEARNING FROM THE COMPETITION — A DEEP BENCHMARK
1.1 The Reference Points We're Using
Source	Role in this Plan	What We Extract
Burga	HCI baseline with explicit failures to fix	The exhaustive 40-point gap analysis already documented—every fix is mandatory
BestSecret	Secondary HCI benchmark	The scored heuristic evaluation from your Practical 1 slides—especially its strengths in visual consistency (1.0), error prevention (0.85), and real-world language (0.9), and its critical weaknesses in accessibility (0.4) and recognition-over-recall (0.5)
Vaulté	Functional and architectural benchmark	The state management patterns (14-action Reducer, mutual exclusion, 700ms debounce), the exact button inventory and their behaviours, and the HCI justification framework from your Practical 2 documentation
Outfit (HelloHello)	Aesthetic and motion benchmark	The full animation vocabulary described in your breakdown, adapted into ZORA's brand language
1.2 Burga's HCI Failures — The Master Remediation Map
Your previous documentation already exhaustively mapped every Burga failure to a ZORA fix across all 10 heuristics. Those 40 specific remediation points remain the non-negotiable HCI foundation. We will not repeat them in full here, but every single one is carried forward into the implementation map in Part 4 below. The critical additions you've now requested are:

Theme toggle visibility (was: buried in account dropdown → now: persistent, prominent switch in header)

Breadcrumb population (was: thin product set → now: minimum 24+ products to exercise full breadcrumb trails)

Familiar icon adoption everywhere (was: ambiguous icons → now: standardized, platform-conventional icons for payment, account, cart, wishlist, help, search, etc.)

Payment iconography (was: generic → now: Visa, Mastercard, Apple Pay, Google Pay, PayPal logos at checkout)

PART 2: THE OUTFIT-OF-HELLOHELLO ANIMATION VOCABULARY — FULLY ADAPTED FOR ZORA
This is the core new intellectual content of this plan. You've described six categories of animation from Outfit. Here is exactly how each maps into ZORA, with compliance guardrails to ensure HCI is never sacrificed for spectacle.

2.1 The "Hero" Entrance Sequence (Layered Intro)
What Outfit does: Z-index staggering, scale-and-move interpolation, typographic masking.

How ZORA adapts it:

Outfit Technique	ZORA Implementation	HCI Safety Guard
Z-index staggering — images fly in from edges, tucking behind certain letters	On first visit only, the ZORA preloader assembles the alt logo (star + Z) from scattered geometric fragments. Product images do not fly around on the homepage.	The preloader is a full-screen overlay that vanishes entirely before any interactive UI appears. It respects prefers-reduced-motion by fading instantly. It never replays during the same session (sessionStorage flag).
Scale-and-move interpolation with "elastic" settle	The alt logo in the preloader and on the About page uses a CSS cubic-bezier(0.34, 1.56, 0.64, 1) spring curve, giving it a "settling" feel. Product cards on the collection page scale in from 0.95→1 with the same easing when they transition from skeleton to real content.	All elastic animations are under 400ms. They communicate "content has arrived" (H1: Visibility of System Status) without delaying interaction.
Typographic masking — images clipped or layered to create a 3D "sandwich"	Not used on transactional pages. On the About page only, the alt logo can have a subtle parallax relationship with background text.	The About page is the brand's narrative space. No product discovery is interrupted.
2.2 Page-to-Page Transitions (The "Wipe")
What Outfit does: Curtain wipe, staggered UI exit, shared element transition.

How ZORA adapts it:

Outfit Technique	ZORA Implementation	HCI Safety Guard
"Curtain" effect — a solid colour or blurred next page wipes across the screen (vertical or center-out)	ZORA uses the View Transitions API (document.startViewTransition()) when navigating between collection pages and from collection → product. A subtle 300ms cross-fade with a slight scale (old page: 1→0.98, new page: 1.02→1) creates the sense of spatial continuity.	Fallback: if the browser doesn't support View Transitions, a simple CSS opacity cross-fade is used. The transition is always under 300ms — never delaying task completion.
Staggered UI exit — current page elements fall or fade out sequentially before the new page appears	Not used. Sequential exit animations would delay navigation and violate H3 (User Control — users want instant response to clicks). ZORA prioritizes perceived speed over spectacle.	The moment a user clicks a navigation link, the transition begins immediately. The skeleton loading on the destination page provides the "something is happening" feedback (H1).
Shared element transition — the clicked product image stays on screen and moves/scales to its new position on the product page	This is the hero interaction. When clicking a product card on the collection page, the product image smoothly scales and repositions to its location on the product detail page while the rest of the layout builds around it. Implemented via the View Transitions API with a view-transition-name on the product image.	The transition is 300ms. The image's view-transition-name is dynamically assigned on click to ensure only the relevant image participates.
2.3 Interactive "Liquid" Cursor
What Outfit does: Magnetic attraction, dynamic scaling, inversion filter.

How ZORA adapts it:

Outfit Technique	ZORA Implementation	HCI Safety Guard
Magnetic attraction — elements "lean" toward the mouse	ZORA uses a subtle magnetic effect on the primary CTAs only ("Add to Cart", "Shop Phone Cases"). The button shifts up to 4px toward the cursor when hovered. Implemented via a mousemove listener within a 60px radius.	All magnetic effects are disabled on touch devices (no hover). The effect is purely cosmetic — the hit area remains static and predictable.
Dynamic scaling — cursor circle expands into a "View" or "Add" bubble	ZORA's custom cursor (visible on desktop only) expands from 12px to 48px when hovering over product cards, with the text "View" appearing inside. Over "Add to Cart" buttons, it expands to "Add".	The custom cursor is hidden on touch devices. The native cursor remains the fallback. The expanded cursor does not obscure the element it's hovering over (positioned with a slight offset). Respects prefers-reduced-motion.
Inversion filter — mix-blend-mode: difference as cursor moves over text	Applied to the custom cursor when it passes over dark or light backgrounds to maintain visibility. The cursor uses mix-blend-mode: difference so it's always legible against both the #FFC5C5 light background and the #A22828 dark background.	Purely a visibility enhancement — it ensures the cursor never disappears against variable backgrounds (H1: System Status for the pointer itself).
2.4 Product Hover & Catalogue Transitions
What Outfit does: Tilt and parallax, image swapping flash, smooth layout shifts.

How ZORA adapts it:

Outfit Technique	ZORA Implementation	HCI Safety Guard
Tilt & parallax — hovering over a product causes the image to tilt based on mouse position	Product cards on the collection page have a subtle 3D tilt (max 8° rotation on X and Y axes) when hovered. Implemented via CSS transform: perspective(600px) rotateX() rotateY() driven by mousemove.	Disabled on touch devices. The tilt is subtle and does not distort the product image beyond recognition. The card's interactive elements (heart, Quick Add) remain perfectly clickable.
Image swapping "flash" — secondary lifestyle image flashes in on hover	Product cards swap from the product-only image to the lifestyle (on-device) image on hover. The swap uses a 150ms opacity cross-fade — fast enough to feel like a "camera shutter" without being disorienting.	The transition is quick enough to not delay the user's scanning. If the user's prefers-reduced-motion is set, the swap is instant.
Smooth layout shifts — filtered items glide to new grid positions	When filters are applied, products that remain in the grid smoothly animate to their new positions using the View Transitions API or, as fallback, a CSS transition on transform. Items being removed fade out; items being added fade in. This replaces the abrupt grid refresh that Burga and BestSecret both suffer from.	The animation is 300ms and non-blocking. The user can interact with the new grid immediately. The skeleton-to-content transition still provides the loading state for async data.
2.5 Scroll-Based Motion (Scrollytelling)
What Outfit does: Inertial smooth scroll, reveal on scroll, floating typography parallax.

How ZORA adapts it:

Outfit Technique	ZORA Implementation	HCI Safety Guard
Inertial smooth scroll — mouse wheel momentum	ZORA uses Lenis (the same library Outfit uses) for smooth scrolling with momentum. The scroll container has lenis lenis-smooth applied.	Lenis respects prefers-reduced-motion and falls back to native browser scrolling. The momentum is subtle (0.1 lerp factor) — it enhances the feel without making the page feel "slippery."
Reveal on scroll — images "unfold" or slide up from an invisible clipping mask	The Recently Viewed strip, "Complete Your Look" cross-sell, and About page imagery all use Intersection Observer-triggered reveal animations. Images slide up 30px and fade in over 400ms when they enter the viewport.	All reveals use prefers-reduced-motion fallback (instant appearance). The reveal distance is small (30px) so content is never far from its final position.
Floating typography parallax — large background text moves at a slower speed than foreground images	Not used on the homepage or product pages. On the About page only, the alt logo can have a subtle parallax scroll effect (moves at 0.5x the scroll speed).	Confined to the About page. Never competes with product imagery or CTAs.
2.6 Micro-Interactions
What Outfit does: Text scramble/hover, button squish.

How ZORA adapts it:

Outfit Technique	ZORA Implementation	HCI Safety Guard
Text scramble/hover — characters cycle rapidly before settling	Not used. This effect, while visually striking, is actively hostile to readability and accessibility. It violates H7 (Flexibility and Efficiency) and WCAG guidelines.	Omitted entirely. ZORA's brand energy is expressed through colour, typography, and the other animations — not through text that is temporarily illegible.
Button squish — momentary scale(0.95) on click	All buttons in ZORA use a :active state of scale(0.97) with a 100ms transition, providing the tactile "press" sensation. This applies to "Add to Cart", "Shop Now", filter chips, and navigation links.	The scale-down is minimal (3%) so the button doesn't appear to shrink away from the user's cursor/finger. It returns to scale(1) on release.
PART 3: THEME TOGGLE — PROMINENT AND UNMISSABLE
3.1 The Problem
In the previous ZORA plan, the theme toggle was inside the Account dropdown. This violates recognition-over-recall (H6) — users shouldn't have to discover a hidden toggle. Burga and BestSecret also bury their theme controls (if they have them at all).

3.2 The Solution
The theme toggle moves to the header itself — a standalone icon button positioned between the Search icon and the Account icon.

Design specification:

Attribute	Light Mode	Dark Mode
Icon	☀️ sun (indicating "switch to dark")	🌙 moon (indicating "switch to light")
Position	Header right, between Search and Wishlist	Same
Tooltip on hover	"Switch to Dark Mode"	"Switch to Light Mode"
Transition	300ms rotate + scale on icon swap	Same
Persistence	localStorage key zora-theme	Same
Default	System preference via prefers-color-scheme media query	Same
Updated header icon order (left to right):
[Search 🔍] [Theme ☀️/🌙] [Account 👤] [Wishlist ♡] [Cart 🛍]

This gives the theme toggle equal visual weight to the other utility icons and ensures it's discoverable on first visit.

PART 4: FAMILIAR ICONS — HCI COMPLIANCE THROUGH CONVENTION
4.1 The Principle
Nielsen's Heuristic #4 (Consistency and Standards) states: "Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions."

Your BestSecret analysis praised its use of "standard e-commerce icons (the generic user icon for the account panel, the padlock and id icon for password and contact information...)" — scoring it 1.0/1.0 on Consistency. This is the standard ZORA must meet.

4.2 Complete Icon Map
Function	Icon	Source / Style	HCI Justification
Search	🔍 magnifying glass	Lucide Search icon	Universal search icon — no user has ever been confused by a magnifying glass
Theme Toggle	☀️ sun / 🌙 moon	Lucide Sun / Moon	Platform-standard dark mode indicators
Account	👤 person silhouette	Lucide User	The generic user icon that BestSecret was praised for — universally understood
Wishlist (empty)	♡ outline heart	Lucide Heart	Heart = save/favourite — convention across all e-commerce
Wishlist (filled)	❤️ filled heart, accent colour	Lucide Heart filled	Same convention, filled state communicates "saved"
Cart	🛍 shopping bag	Lucide ShoppingBag	The bag icon matches real-world retail — praised in your BestSecret analysis
Help / FAQ	❓ question mark circle	Lucide HelpCircle	Question mark = help — the most universal symbol in UI design
Menu (mobile)	☰ hamburger	Lucide Menu	Industry-standard mobile navigation indicator
Close / Dismiss	✕ cross	Lucide X	Universal close symbol
Back Arrow	← left arrow	Lucide ArrowLeft	Universal "go back" indicator
Undo	↩️ undo arrow	Lucide Undo	Matches the Undo mental model from desktop applications
Filter	🔽 sliders	Lucide SlidersHorizontal	Standard filter icon across e-commerce
Add to Cart	🛍 + plus	Lucide ShoppingBag + Plus	Bag + plus = "add to bag" — self-explanatory
Quick Add	👁️ eye	Lucide Eye	Eye = "quick view" — standard across fashion e-commerce
Remove / Delete	🗑️ trash	Lucide Trash2	Trash = delete — universal across all software
Share	↗️ share arrow	Lucide Share	Standard share icon
Live Chat	💬 message bubble	Lucide MessageCircle	Speech bubble = chat — universal
Expand (accordion)	▶ chevron right	Lucide ChevronRight (rotates 90° on expand)	Standard expand/collapse indicator
Loading	🔄 spinning circle	Custom CSS spinner using ZORA accent colours	Spinner = loading — universal system status indicator
Error	⚠️ alert triangle	Lucide AlertTriangle	Triangle + exclamation = warning — universal
Success	✅ checkmark	Lucide Check	Checkmark = success — universal
Info / Tooltip	ℹ️ info circle	Lucide Info	"i" in circle = more information — universal
4.3 Payment Icons (Checkout Page)
This is a specific requirement you've raised. The checkout must display familiar, high-trust payment logos.

Payment Method	Icon Display	Implementation
Visa	Full Visa logo (blue and gold)	SVG from Visa brand assets
Mastercard	Full Mastercard logo (red and yellow circles)	SVG from Mastercard brand assets
Apple Pay	Apple Pay logo (black or white, depending on theme)	SVG from Apple brand assets
Google Pay	Google Pay logo	SVG from Google brand assets
PayPal	PayPal logo	SVG from PayPal brand assets
These appear:

In the footer — a "We Accept" strip with all five logos, building trust before checkout.

On the checkout page — as selectable payment method options (radio buttons with logos beside them).

In the cart sidebar summary — a smaller "Secure Checkout" strip with the logos.

4.4 Social Icons (Footer)
Standard, instantly recognizable social media icons (Instagram, TikTok, X/Twitter, Pinterest) using their respective brand SVGs or the Lucide equivalents. These are non-interactive for the prototype (links to #), but visually conform to platform conventions.

PART 5: PRODUCT POPULATION — MAKING BREADCRUMBS WORK
5.1 The Problem
A prototype with 8 products cannot demonstrate the full power of breadcrumbs, filters, and recently viewed functionality. The user needs to see:

Breadcrumb trails with 3+ levels (Home › Category › Subcategory › Product)

Filters that actually narrow a meaningful set

Recently Viewed that rotates as the user browses

Pagination or Load More functionality

5.2 The Solution
The products.json data file must contain a minimum of 32 products distributed as follows:

Category	Subcategory	Product Count
Phone Cases	iPhone 16 Pro	8
Phone Cases	iPhone 16	6
Phone Cases	iPhone 15 Pro	6
Phone Cases	Samsung Galaxy S25	4
AirPods Cases	AirPods Pro 2	4
iPad Cases	iPad Pro 2024	2
Watch Bands	Apple Watch Series 9	2
This yields a total of 32 products. With 32 products:

Filters (by vibe, colour, case type) will produce meaningful subsets (e.g., "Dark & Moody iPhone 16 Pro cases: 3 results").

Breadcrumbs will have full depth: Home › Phone Cases › iPhone 16 Pro › Clover Design.

Recently Viewed will rotate naturally as the user browses more than 4 items.

The "247 designs" count (or whatever total) will feel legitimate.

5.3 Product Data Schema
Each product in products.json must include:

json
{
  "id": "zora-iphone16pro-clover",
  "name": "Clover Design",
  "category": "phone-cases",
  "subcategory": "iphone-16-pro",
  "vibe": "soft-floral",
  "colours": ["#FFD6E0", "#C8F23C", "#7B5CF0"],
  "caseTypes": ["snap", "tough", "elite-magsafe"],
  "price": 39.99,
  "images": {
    "product": "/assets/products/clover-product.jpg",
    "lifestyle": "/assets/products/clover-lifestyle.jpg"
  },
  "alt": "ZORA Clover Phone Case for iPhone 16 Pro — front view",
  "inStock": true,
  "isNew": true,
  "isOnSale": false
}
PART 6: COMPLETE BUTTON INVENTORY — ALL LOCATIONS, ALL FUNCTIONALITIES
This section consolidates every interactive element in ZORA with its exact location, behaviour, and states. The Account icon is now explicitly included. Buttons that were previously non-functional are now specified with their full functionality.

6.1 Global Header (Every Page)
#	Element	Location	Functionality	Visual States	Keyboard
H1	Main Logo (logo light / logo dark)	Header centre	Links to /index.html. Switches variant based on active theme.	Hover: subtle scale 1.02. Active: no change (it's a link).	Tab reachable. Enter activates.
H2	Navigation: Phone Cases	Header left	Dropdown mega-menu: iPhone 16 Pro, iPhone 16, iPhone 15 Pro, Samsung Galaxy S25. Clicking category name shows all; clicking subcategory filters.	Active section: bold + accent underline. Hover: colour shift to accent. Dropdown: fade-in + slide-down 200ms.	Tab reachable. Enter/Space opens dropdown. Arrow keys navigate sub-items. Esc closes.
H3	Navigation: AirPods	Beside Phone Cases	Links to /collection/airpods. Dropdown with sub-models.	Same as above.	Same as above.
H4	Navigation: iPad	Beside AirPods	Links to /collection/ipad. Dropdown with sub-models.	Same as above.	Same as above.
H5	Navigation: Watch	Beside iPad	Links to /collection/watch. Dropdown with sub-models.	Same as above.	Same as above.
H6	Navigation: Accessories	Beside Watch	Links to /collection/accessories. Includes Power Banks, Screen Protectors, Ring Holders.	Same as above.	Same as above.
H7	Navigation: Sale	Beside Accessories	Links to /collection/sale. Pre-filtered to items with isOnSale: true.	Sale text in hot pink (#FF6B9D) regardless of theme.	Same as above.
H8	Search Icon (🔍)	Header right, first icon	Click opens search overlay. Ctrl+K / Cmd+K keyboard shortcut activates. Typing in the overlay triggers a 300ms debounced search across product names, categories, and vibes. Results appear in a dropdown below the search bar.	Overlay: full-screen semi-transparent backdrop + centred search bar. Bar: focused state with accent glow ring. Results: list with product thumbnails, names, and prices. Empty state: "No results for '[query]'."	Ctrl+K opens. Esc closes. Arrow keys navigate results. Enter selects.
H9	Theme Toggle (☀️/🌙)	Header right, between Search and Account	Click toggles between light mode (#FFC5C5 bg, #8B3B3B text) and dark mode (#A22828 bg, #FFFFFF text). Persisted in localStorage (zora-theme). Default: follows prefers-color-scheme.	Icon: sun (☀️) in light mode, moon (🌙) in dark mode. Hover tooltip: "Switch to Dark Mode" / "Switch to Light Mode". Transition: 300ms rotate + scale on icon swap. Body class toggles between theme-light and theme-dark.	Tab reachable. Enter/Space toggles.
H10	Account Icon (👤)	Header right, between Theme Toggle and Wishlist	MUST BE PRESENT — was missing in previous builds. Opens account dropdown: "Sign In" / "Register" (logged out) or "My Orders" / "Settings" / "Logout" (logged in). For prototype: shows logged-out state with Sign In and Register links (both go to a placeholder auth page or trigger a toast "Account system coming soon").	Icon: generic user silhouette (Lucide User). Dropdown: fade-in + slide-down 200ms, 200px wide. Links: hover with accent background.	Tab reachable. Enter/Space opens dropdown. Arrow keys navigate items. Esc closes.
H11	Wishlist Icon (♡)	Header right, between Account and Cart	Links to /wishlist.html. Displays superscript badge with item count. Badge appears only when count > 0.	Empty: outline heart (Lucide Heart). Items present: filled heart in accent colour + superscript badge. Badge: bounces on add (115% scale burst, 400ms spring easing).	Tab reachable. Enter activates link.
H12	Cart Icon (🛍)	Header right, last icon	Opens cart slide-out sidebar from the right. Displays superscript badge with item count. Badge appears only when count > 0.	Empty: bag outline (Lucide ShoppingBag). Items present: filled bag + superscript badge. Badge: bounces on add. Sidebar: slides in from right (300ms), backdrop fades in.	Tab reachable. Enter/Space opens sidebar. When sidebar is open, focus is trapped inside. Esc closes sidebar.
H13	Help Icon (❓)	Header right, beside or within Account dropdown	Links to /help.html. Also accessible from footer.	Question mark circle (Lucide HelpCircle). Hover: subtle pulse.	Tab reachable. Enter activates.
H14	Hamburger Menu (☰)	Header left (mobile only, breakpoint < 768px)	Opens mobile navigation drawer sliding in from the left. Contains all category links, account, wishlist, cart, help, and theme toggle.	Closed: hamburger icon (Lucide Menu). Open: ✕ close icon (Lucide X). Drawer: slides in from left (300ms), backdrop blur.	Tab reachable. Enter/Space opens. When open, focus is trapped inside drawer. Esc closes.
H15	Skip to Content Link	First tabbable element, visually hidden until focused	Jumps to <main id="main-content">.	Hidden off-screen. On Tab focus: slides down from top, white text on accent background.	Automatically focused on first Tab press. Enter jumps to main.
6.2 Homepage (index.html)
#	Element	Location	Functionality	Visual States
HP1	Hero CTA — "Shop Phone Cases"	Hero centre	Links to /collection/phone-cases.	Primary button, accent background, white text. Hover: background darkens slightly, scale 1.03. Active: scale 0.97 "squish."
HP2	Hero CTA — "Find My Case"	Hero centre, beside primary CTA	Opens device selector modal (Step 1).	Secondary button, outline style. Hover: outline glows, background fills 10%.
HP3	Device Selector Modal	Overlay, triggered by HP2	Multi-step modal. Step 1: "Select Your Brand" (Apple, Samsung, Google, Other). Step 2: "Select Your Model" (dynamic list based on brand). Selection persisted in localStorage (zora-device).	Step indicator at top ("Step 1 of 2"). Progress bar animates from 50% to 100%. Selected option: filled accent. "Continue" button enabled only when selection is made. "Skip" link closes modal without selection. Backdrop blur + scale-fade entrance (300ms).
HP4	Trending Now — Horizontal Scroll	Below hero, full width	8 product cards in a horizontally scrollable container. Left/right arrow buttons at the edges of the container.	Cards: skeleton shimmer on load, cross-fade to product image. Hover: swap to lifestyle image (150ms flash), show Quick Add button, card tilts 3° toward cursor. Arrow buttons: semi-transparent circles, fully opaque on hover.
HP5	Shop by Vibe — 4-Card Grid	Below Trending	4 mood-based category cards: "Dark & Moody" (deep purple #2D0A4E border), "Soft & Floral" (blush #FFD6E0 border), "Clean & Minimal" (light grey #E8E8E8 border), "Bold & Loud" (orange-red #FF3D00 border). Each links to the collection page pre-filtered to that vibe.	Card: dark background (#1A1A1A), accent border (3px), vibe name + 3 emoji icons representing the mood. Hover: card lifts 8px, border glows, Lottie sparkle plays on the emoji.
HP6	Recently Viewed Strip	Bottom of homepage	Shows the last 4 unique products visited, pulled from localStorage (zora-recently-viewed). Each card is identical to a collection card but smaller.	Empty: strip hidden entirely. Items present: strip slides in from left as user scrolls into view (Intersection Observer). Maximum 4 items. Duplicate visits move the item to position 1.
HP7	Footer	Page bottom	Full-width dark footer. "We Accept" payment strip (Visa, MC, Apple Pay, Google Pay, PayPal logos). Duplicated nav links. Social media icons. "© 2026 ZORA."	Links: muted text, hover to accent colour. Payment logos: greyscale, colour on hover. Social icons: circles, fill on hover.
6.3 Collection Page (collection.html)
#	Element	Location	Functionality	Visual States
C1	Persistent Device Chip	Below header, above filter bar	"Showing cases for: iPhone 16 Pro ✕ change." Appears only when a device is selected (from localStorage). Clicking ✕ clears the device selection and shows all products. Clicking "change" reopens the device selector modal.	Chip: accent background, white text. ✕ and "change" are clickable spans. Entrance: fade-in + slide-down 200ms. Exit: fade-out + slide-up.
C2	Filter Bar	Below device chip (or header if no device selected)	Multi-select filter chips in categories: Vibe (Dark & Moody, Soft & Floral, Clean & Minimal, Bold & Loud), Colour (pink, green, violet, etc.), Case Type (Snap, Tough, Elite, MagSafe), Price (Under €30, €30-€50, €50+). Chips can be combined across categories.	Inactive chips: outline style. Active chips: filled accent background + ✕ dismiss icon. Chips scale-in 200ms on activation, fade-out 150ms on removal. "Clear All Filters" button appears when any filter is active. Clicking Clear All shows undo toast.
C3	Product Count + Active Summary	Beside filter bar	"32 designs" — updates dynamically as filters are applied. Below count: active filter summary text: "Filtered by: Dark & Moody + MagSafe"	Count: fades to new number on change. Summary: appears when filters active, hidden when none.
C4	Sort Dropdown	Filter bar, right-aligned	Dropdown: Featured, Newest, Price: Low-High, Price: High-Low.	Selected option: bold + checkmark. Dropdown: fade-in + slide-down 150ms.
C5	Product Grid (3 columns desktop, 2 tablet, 1 mobile)	Main content area	Product cards with skeleton loading on initial load, filter change, and sort change. 700ms debounced grid update to allow skeleton to be perceived. Total: 32 products across all categories (or filtered subset).	Loading: 3xN grid of shimmer skeleton cards. Loaded: product image, design name, price, heart toggle (top-right), Quick Add button (appears on hover). Card: tilt 3° on hover toward cursor. Image: swaps to lifestyle shot on hover (150ms flash).
C6	Product Card — Heart Toggle	Top-right corner of each card	Click toggles wishlist state. Filled heart = in wishlist.	Not wishlisted: outline heart (subtle grey). Wishlisted: filled heart in accent colour. On add: Lottie sparkle animation plays (200ms). On remove: heart deflates to outline — no sparkle.
C7	Product Card — Quick Add	Bottom of card, appears on hover	Adds the product to cart with default variant (first colour, Snap case type). If device not selected, shows tooltip: "Select your device first."	Button: accent background, "Quick Add" text + bag icon. Appears with fade-in + slide-up 150ms on card hover. Click: badge bounce + toast confirmation + cart sidebar slides in.
C8	Product Card — Click (Anywhere Else)	Entire card is clickable	Navigates to the product detail page (product.html?id=zora-...). Triggers the shared element transition (image moves to PDP).	Cursor: custom cursor expands to "View" bubble on hover. Native fallback: pointer cursor.
C9	Pagination / Load More	Below grid	"Load More" button. Loads the next 12 products (if more than 12 exist in the current filter set).	Button: outline style. Click: shows skeleton cards below while "loading," then new cards cross-fade in. If all products shown: button disappears, "Showing all [N] designs" text.
6.4 Product Detail Page (product.html)
#	Element	Location	Functionality	Visual States
P1	Breadcrumb	Top of page, below header	"Home › Phone Cases › iPhone 16 Pro › Clover Design." Each segment is a clickable link except the current product. The device chip may appear above the breadcrumb if a device is selected.	Segments: muted text. Hover: accent underline. Current product: bold, not clickable. Separator: › chevron.
P2	← Back to [Collection]	Above breadcrumb	Returns to the previous collection page. If the user arrived from a filtered collection, the filters are preserved (via URL params or sessionStorage).	Button: text link with ← arrow (Lucide ArrowLeft). Hover: arrow shifts left 4px.
P3	Product Image Gallery	Left column (60% width on desktop)	Large main image (product shot) + 4 thumbnails below it (product, lifestyle, detail, on-device). Clicking a thumbnail swaps the main image with a 200ms cross-fade. Hovering on the main image activates a CSS zoom lens effect (image scales 1.5x, follows cursor within the container).	Main image: cursor = zoom lens indicator. Active thumbnail: highlighted border (2px accent). Thumbnails: opacity 0.7, hover to 1.0.
P4	Device Model Selector	Right column, top of purchase panel	Dropdown selector. If the user arrived with a device already selected (from localStorage or collection page), it's pre-filled. Options correspond to available models for this product.	Pre-filled: chip display with "✓ iPhone 16 Pro" + "change" link. Empty: dropdown placeholder "Select your device model." Required field indicator: small red asterisk.
P5	Case Type Selector	Right column, below device	Chip selector: Snap, Tough, Elite, Tough MagSafe, Elite MagSafe. Each chip has an ℹ icon (Lucide Info). Hovering ℹ shows a tooltip explaining the case type.	Selected chip: filled accent. Unselected: outline. ℹ tooltip: appears on hover with 200ms fade-in, 250px wide, positioned above the chip.
P6	Colour Variant Swatches	Right column, below case type	Circular colour swatches. Clicking selects the colour. Multiple can be selected? No — single selection.	Selected swatch: 3px ring + checkmark icon inside (if light colour, checkmark is dark; if dark, white). Out of stock: swatch crossed out with a diagonal line, not clickable.
P7	Quantity Selector	Right column, below colour	- / + stepper with quantity display. Min: 1. Max: 10.	- button: disabled at 1 (greyed out, not clickable). + button: disabled at 10. Number display: centred between buttons.
P8	Add to Cart Button	Right column, prominent, full-width	CRITICAL: DISABLED until Device Model + Case Type + Colour are ALL selected. Tooltip on disabled hover explains what's missing. When enabled: adds item to cart, triggers scale burst animation, badge bounce, cart sidebar slide-in, and toast confirmation.	Disabled: greyed out (#666 background), cursor = not-allowed. Tooltip on hover: "Select your device model" / "Choose a case type" / "Pick a colour." Enabled: full accent background, cursor = pointer. On click: button text changes to "✓ Added" for 1 second, then reverts to "Add to Cart." Loading state: spinner inside button.
P9	Wishlist Toggle	Beside Add to Cart (or below)	Heart button. Toggles wishlist state.	Active: filled heart in accent. Inactive: outline heart. On add: Lottie sparkle + toast. On remove: toast with undo.
P10	Compatibility Warning	Below Add to Cart (conditional)	Appears if user selects a MagSafe case type but has a non-MagSafe device selected. Yellow/orange banner: "⚠️ This case requires MagSafe. Your selected device (iPhone XR) does not support MagSafe charging. The case will still fit, but MagSafe accessories won't attach."	Banner: yellow background (#FFF3CD), dark text, warning icon (Lucide AlertTriangle). Fade-in 200ms. Dismissible with ✕.
P11	Accordion Sections	Below the fold, full width	Four expandable sections: Product Details (description, materials, weight), Compatibility (device models, MagSafe info), Care Instructions (cleaning, durability), Shipping & Returns (delivery times, return policy). Only one open at a time (optional).	Closed: ▶ chevron, heading only. Open: ▼ chevron (rotated 90°), content slides down 300ms. Section headings: clickable, hover accent underline.
P12	"Complete Your Look" Cross-Sell	Below accordions	Horizontal carousel of 4 complementary products (screen protector, ring holder, matching AirPods case, power bank). Each card has image, name, price, and "Add" button.	Carousel: left/right arrow navigation. Cards: slide in as arrows are clicked. "Add" button: adds directly to cart (all variants default).
P13	"Sold Out — See Similar" (conditional)	Replaces Add to Cart if inStock: false	Carousel of similar in-stock designs (same vibe, same device model). "Notify Me When Back in Stock" button below it.	Sold Out badge on product image. Add to Cart replaced with "Sold Out" text + Notify Me button. Similar carousel: same style as Complete Your Look. Notify Me: email input + submit button. For prototype: shows toast "You'll be notified when this is back in stock."
P14	Recently Viewed Strip	Bottom of page	Identical to homepage HP6.	Same behaviour.
6.5 Cart Sidebar (Slide-Out Panel)
#	Element	Location	Functionality	Visual States
CT1	Cart Panel	Slides in from right edge	Overlay with backdrop blur. Width: 400px desktop, 100vw mobile. Triggered by: clicking header cart icon (H12), clicking "Quick Add", clicking "Add to Cart". Closed by: ✕ button, Esc key, clicking backdrop.	Entrance: slide-in-right + backdrop fade 300ms. Exit: slide-out-right + backdrop unfade 200ms. Empty state (shown when cart has 0 items): "Your cart is empty." + illustration + "Start Shopping" button linking to /collection/phone-cases.
CT2	Cart Item Row	Inside panel, scrollable list	Each row: 60px product thumbnail, product name + variant summary (e.g., "iPhone 16 Pro · Snap · Clover"), quantity stepper (- / +), line total, remove ✕ button.	Remove triggers undo toast (see CT4). Quantity changes update the subtotal in real time.
CT3	Cart Expiry Notice	Top of panel, below header	"Items reserved for 1 hour" with a live countdown timer (MM:SS format).	Visible only when cart has items. Timer: counts down from 60:00. At 0:00: text changes to "Reservation expired. Items may be removed at checkout." (prototype: no actual removal).
CT4	Undo Toast (on remove)	Bottom of panel	When an item is removed (✕), a toast slides up: "Removed [Product Name]. Undo?" The "Undo" link restores the item. Toast auto-dismisses after 5 seconds.	Toast: dark background, white text, accent "Undo" link. Slide-up entrance 300ms, bounce easing. Fade-out after 5s countdown (progress bar). Stacking: if multiple items removed, toasts stack vertically.
CT5	Subtotal + "Go to Checkout"	Bottom of panel, sticky	Displays: "Subtotal (N items): €XX.XX". Below: "Shipping calculated at checkout." Below: "Go to Checkout" button (full width, accent background). Below button: "We Accept" payment logo strip.	Subtotal updates in real time as quantities change and items are added/removed. Checkout button: always active if cart has items. Click: navigates to /checkout.html.
CT6	"Continue Shopping" Link	Below checkout button	Text link: "← Continue Shopping." Closes the cart sidebar.	Hover: arrow shifts left 4px.
6.6 Checkout Page (checkout.html)
#	Element	Location	Functionality	Visual States
CK1	Progress Indicator	Top of page	Step indicator: "Shipping → Payment → Confirmation." Current step highlighted.	Steps: circles connected by lines. Completed: filled accent + checkmark. Current: accent outline + pulsing. Future: grey.
CK2	Shipping Form	Left column	Fields: Full Name, Email, Phone, Address Line 1, Address Line 2, City, Postcode, Country (dropdown). All with real-time inline validation (green/red borders).	Valid: green border + checkmark icon. Invalid: red border + error message below field ("Please enter a valid email address"). Empty: default border.
CK3	Payment Method Selector	Left column, below shipping	Radio buttons with payment logos: Visa, Mastercard, Apple Pay, Google Pay, PayPal. Selecting a method shows the relevant payment fields (card number input for Visa/MC, or "Pay with Apple Pay" button).	Radio buttons: custom styled (circle, accent fill when selected). Payment logos: 40px wide, greyscale until selected, then full colour.
CK4	Order Summary	Right column	Same items as cart sidebar, but read-only (no quantity changes, no removal). Shows: subtotal, shipping cost, estimated tax, total. "Place Order" button at bottom.	Read-only list. "Place Order": primary button, full width. Click (prototype): shows success state.
CK5	Success State	Replaces checkout content	"✅ Order Confirmed!" + order number + "We'll send a confirmation to [email]." + "Continue Shopping" button.	Success icon: Lottie checkmark animation.
6.7 Wishlist Page (wishlist.html)
#	Element	Location	Functionality	Visual States
W1	Wishlist Grid	Main content	Product cards (same as collection cards) for all wishlisted items.	Remove: ✕ icon on card hover, triggers undo toast.
W2	"Add All to Cart"	Top of grid (if items exist)	Adds all in-stock wishlist items to cart. Items already in cart are skipped.	Button: secondary style. Click: badge bounce + toast: "N items added to cart." Items remain in wishlist (don't remove — that's a separate action).
W3	Empty State	When wishlist empty	"Your wishlist is empty. 💔" + "Browse our collections to find designs you'll love." + CTA to Shop Phone Cases.	Illustration: empty heart. CTA: primary button.
W4	Share Wishlist	Top of grid (if items exist)	"Share" button. For prototype: copies a dummy link to clipboard + toast "Link copied!"	Button: outline + share icon.
6.8 Help Page (help.html)
#	Element	Location	Functionality	Visual States
HL1	Search FAQ	Top of page	Text input. As user types, FAQ accordion items are filtered in real time (client-side).	Input: magnifying glass icon inside. Empty state: "Type to search FAQs..." No results: "No results for '[query]'. Try a different search or contact us."
HL2	FAQ Accordion	Below search	Grouped by topic: Orders, Shipping & Delivery, Returns & Exchanges, Product Compatibility, Account & Payment. Each topic has multiple Q&A items. Only one Q&A open at a time per topic (or all independently — topic determines).	Closed: ▶ chevron + question text. Open: ▼ chevron + answer text slides down 250ms.
HL3	Live Chat Widget	Bottom-right corner, all pages	Expandable chat bubble. Minimised: 💬 icon in a circle (56px). Expanded: chat window (360px × 480px) with header, message area, and input. Prototype: simulated conversation with preset responses about case types, shipping, returns.	Minimised: pulse animation on the bubble (subtle, 2s interval). Expanded: scale-up from bottom-right 300ms spring easing. Close: scale-down.
HL4	Contact Escalation	Bottom of FAQ, below last accordion	"Can't find what you're looking for? Chat with us in the bottom-right corner or email support@zorastore.com." Email link opens default mail client.	Email: accent underline, hover brightens.
6.9 About Page (about.html)
#	Element	Location	Functionality	Visual States
A1	Alt Logo (Star + Z)	Left column, hero area	The floating alt logo — the one previously on the homepage, now in its proper home. Slow rotation (360° over 20 seconds) + gentle float (translateY ±10px over 4 seconds, ease-in-out infinite).	Logo: #C8F23C (electric lime) colour against the dark background, or #A22828 (crimson) on light. Respects prefers-reduced-motion: static if reduced, no animation.
A2	Brand Story	Right column	"Our Story" heading + 2-3 paragraphs about ZORA's mission, design philosophy, and commitment to accessibility.	Typography: Syne for heading, Inter for body.
A3	Brand Imagery Grid	Below hero	3×2 grid of conceptual imagery (behind-the-scenes, design process, product-in-use). Images lazy-load with Intersection Observer reveal.	Images: slide-up 30px + fade-in 400ms on scroll into view.
6.10 404 Page (404.html)
#	Element	Location	Functionality	Visual States
E1	404 Message	Centre of page	Branded heading: "Looks like this case is out of stock... and so is this page." Subtitle: "The page you're looking for doesn't exist or has been moved."	Typography: Syne heading, playful but informative.
E2	Search Bar	Below message	Lets users search for products directly from the 404 page.	Same styling as header search overlay, but inline.
E3	Suggested Links	Below search	Quick links: "Shop Phone Cases" / "Shop AirPods Cases" / "Go Home."	Buttons: outline style, hover fills.
E4	Countdown Redirect	Bottom of page	"Redirecting you home in 7 seconds..." Auto-redirects to /index.html. User can click "Cancel" to stay on the 404 page.	Countdown: numbers animate (fade between digits). Cancel: text link.
PART 7: IMPLEMENTATION INSTRUCTION SET (REFINED BUILD ORDER)
This build order is sequential and cumulative. Each step builds on the previous.

Phase 0: Asset Preparation
Download all required Lottie JSON files to /assets/lottie/ (preloader shapes, sparkle).

Download or create SVG payment logos (Visa, Mastercard, Apple Pay, Google Pay, PayPal) to /assets/icons/.

Prepare 32 product images (product shot + lifestyle shot for each) — these can be placeholder images from Unsplash or generated via AI for the prototype. Name them descriptively (e.g., clover-product.jpg, clover-lifestyle.jpg).

Write products.json with all 32 products, following the schema in Section 5.3.

Phase 1: Foundation
global.css — CSS custom properties for both themes (theme-light, theme-dark), typography (Syne, Inter, Space Grotesk), reset, prefers-reduced-motion media query, focus ring styles.

motion.css — Shared animation utility classes: .slide-in-right, .slide-out-right, .slide-in-left, .scale-bounce, .fade-in, .skeleton-shimmer, .tilt-hover.

Phase 2: Core JavaScript
state.js — localStorage persistence engine for: cart (zora-cart), wishlist (zora-wishlist), recently viewed (zora-recently-viewed, max 4), device selection (zora-device), theme preference (zora-theme). Exports getter/setter functions for each.

toast.js — Undo-capable toast system. Functions: showToast(message, action, onUndo, duration=5000). Handles stacking, countdown progress bar, and removal.

nav.js — Header interaction orchestrator. Mutual exclusion: opening one panel closes others. Keyboard listeners: Escape closes all, Ctrl+K opens search. Hamburger menu toggle (mobile). Theme toggle click handler. Cart sidebar open/close. Focus trapping in open panels.

Phase 3: Page Shells
index.html — Header (with all H1–H14 buttons, fully functional), hero section (clean, no floating shapes, two CTAs), Trending Now section, Shop by Vibe section, Recently Viewed placeholder, footer (with payment logos, social icons, duplicated nav).

collection.html — Device chip, filter bar, sort dropdown, product grid (with skeleton loading), pagination. Filter logic in filters.js.

product.html — Image gallery, purchase panel (device, case type, colour, quantity, Add to Cart gate), accordion sections, cross-sell carousel, recently viewed strip.

checkout.html — Progress indicator, shipping form with inline validation, payment method selector, order summary.

wishlist.html — Product grid from localStorage, Add All to Cart, empty state.

help.html — FAQ accordion with search, live chat widget.

about.html — Floating alt logo (gentle animation), brand story, imagery grid.

404.html — Branded message, search, suggested links, countdown redirect.

Phase 4: Animation & Polish
preloader.js — First-visit loading animation. Full-screen overlay, alt logo assembles, Lottie shapes morph, 2-second duration, sessionStorage flag, prefers-reduced-motion fallback.

cursor.js — Custom cursor (desktop only). Magnetic effect on CTAs (60px radius), expansion to "View" / "Add" on product cards and buttons, mix-blend-mode: difference for visibility.

transitions.js — View Transitions API setup for page-to-page navigation. Shared element transition for collection → product. Fallback CSS cross-fade.

Lenis smooth scroll initialization — In main.js or inline script. Configured with lerp: 0.1, respects prefers-reduced-motion.

Phase 5: Testing & Compliance
Keyboard audit — Tab through every page. Verify every interactive element is reachable, visible focus ring is present, no focus traps except intentional ones (modals, sidebar).

Screen reader audit — Verify all images have descriptive alt text, all form inputs have labels, ARIA roles are correct on custom widgets (live chat, accordions).

Reduced motion audit — Enable prefers-reduced-motion: reduce in browser/OS settings. Verify all animations are disabled, all content is still accessible.

Cross-browser test — Chrome, Firefox, Safari, Edge. Verify View Transitions API fallback works.

PART 8: VERIFICATION CHECKLIST
This is the final "did we build the right thing?" checklist.

Account icon (👤) is present in the header on every page and opens a functional dropdown.

Theme toggle (☀️/🌙) is in the header, clearly visible, and switches between light/dark modes with smooth transition.

All 14 header buttons are clickable and perform their documented functions.

Mobile hamburger opens a drawer with all navigation + utility links.

Cart sidebar slides in/out smoothly; items can be added, quantity changed, and removed with undo.

Add to Cart is disabled until device model + case type + colour are selected.

Tooltip on disabled Add to Cart explains what's needed.

Wishlist heart toggles and shows Lottie sparkle.

Undo toast works on cart removal, wishlist removal, and "Clear All Filters."

Recently Viewed strip appears and updates across pages (max 4 items).

Device selection persists in localStorage and shows as a chip on the collection page.

Breadcrumbs show full path: Home › Category › Subcategory › Product Name.

Filters work in combination (multi-select) and survive browser back navigation.

Product count updates dynamically with filter changes.

"Clear All Filters" button appears when any filter is active and triggers undo toast.

Ctrl+K (or Cmd+K) opens search. Esc closes any open panel.

Tab navigation reaches every interactive element with visible focus ring.

Skeleton cards appear during page loads and filter changes.

Shared element transition works when clicking from collection to product page (images smoothly repositions).

Product image gallery: thumbnails swap main image, hover zoom works.

Compatibility warning appears when MagSafe case + non-MagSafe device.

"Sold Out" products show similar items carousel and Notify Me button.

Accordion sections on PDP expand/collapse smoothly.

"Complete Your Look" cross-sell carousel is present and functional.

404 page is branded with search + countdown redirect.

Payment logos (Visa, MC, Apple Pay, Google Pay, PayPal) appear in footer, cart, and checkout.

Checkout form fields have real-time inline validation (green/red borders).

FAQ page has search and accordion that filter in real time.

Live chat widget is present on all pages, expandable, with simulated responses.

All animations are disabled when prefers-reduced-motion: reduce is active.

Custom cursor works on desktop and is hidden on touch devices.

Preloader plays on first visit only, respects reduced motion, and does not block subsequent visits.

Alt logo floating animation is on the About page and preloader — not on the homepage.

Homepage is clean and shopping-focused — no floating shapes, no visual noise.

All 32 products are in the data file, enabling full breadcrumb paths and meaningful filter results.

All icons are from a consistent icon library (Lucide) and follow platform conventions.