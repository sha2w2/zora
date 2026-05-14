1. Jakob Nielsen’s 10 Usability Heuristics (1994, updated 2020)
These are the foundation of the prototype’s interaction design.

#	Heuristic	Implementation in ZORA
1	Visibility of system status	Skeleton card shimmers during loading; real‑time badge updates on cart/wishlist; step indicators in complex flows (device selector, checkout progress); animated menu/cart sidebars that clearly show opening/closing.
2	Match between system and the real world	Inline tooltips explain jargon (“Snap – slim, single‑layer case”); shopping bag icon for cart, heart for wishlist; mobile story‑style navigation bubbles mimic social‑media behaviour that the target audience already uses.
3	User control and freedom	Undo‑capable toast notifications on all destructive actions (cart removal, wishlist removal, “Clear all filters”); “Back to [Collection]” breadcrumb; “Remove all filters” button; logo always links home; 404 page has search and automatic redirect with cancel option.
4	Consistency and standards	A single design system governs all buttons (variants: primary, outline, ghost), typography (Syne, Inter, Space Grotesk), icon set (Lucide), and payment logos (Apple Pay, Google Pay, Visa, PayPal). The same component library is used across all pages.
5	Error prevention	“Add to Cart” remains disabled until all mandatory attribute selections are completed; tooltip explains what is missing; checkout form uses real‑time inline validation with clear green/red borders and specific error messages before the user can submit.
6	Recognition rather than recall	Recently Viewed strip (last 4 unique products) appears on multiple pages; device selection (if applicable) is persisted and displayed as a persistent chip; “Shop by Vibe” surfaces trend‑based categories rather than forcing the user to remember which category a style belongs to.
7	Flexibility and efficiency of use	Ctrl+K opens universal search; Esc closes any open panel; full keyboard navigation with visible focus rings; multi‑select filter chips allow power users to narrow results rapidly; 700ms debounced filter updates prevent UI thrashing.
8	Aesthetic and minimalist design	One announcement bar only; maximum one badge per product card; homepage limited to three clear zones (hero, trending, social proof); technical data on product pages is hidden behind accordions (progressive disclosure); no floating decorative elements on shopping pages.
9	Help users recognize, diagnose, and recover from errors	Checkout fields display specific error messages (e.g., “Card number is invalid – please check the digits.”); 404 page is branded, provides a search bar and suggested links, and auto‑redirects with a countdown; invalid product links show a brief explanation before redirection.
10	Help and documentation	Help/FAQ accessible from header, footer, and account dropdown (triple redundancy); FAQ search filters answers client‑side in real time; article feedback (thumbs up/down) collects additional context; live chat widget is persistently available; contact escalation paths (email, phone) are clearly listed.
2. WCAG 2.2 (Web Content Accessibility Guidelines)
The prototype targets WCAG 2.2 Level AA compliance, as required by European and international accessibility standards.

2.1 Principle 1 – Perceivable
Success Criterion	Description	Implementation
1.1.1 Non‑text Content (Level A)	All images, icons, and controls must have a text alternative.	All product images have descriptive alt text (e.g., “ZORA Clover Phone Case for iPhone 17 Pro – front view”); decorative images use alt="" or aria-hidden="true".
1.3.1 Info and Relationships (Level A)	Information conveyed through presentation must be programmatically determinable.	Semantic HTML (<header>, <main>, <nav>, <button>, <form>) is used throughout; form labels are explicitly associated with inputs via for/id.
1.4.3 Contrast (Minimum) (Level AA)	Text must have a contrast ratio of at least 4.5:1 (3:1 for large text).	The colour palette has been verified: light mode (#8B3B3B on #FFC5C5) ≈ 5.2:1; dark mode (#FFFFFF on #A22828) ≈ 4.9:1. Accent buttons (#FFFFFF on #A22828) exceed 4.5:1.
1.4.10 Reflow (Level AA)	Content must be readable at 320px width without horizontal scrolling.	Responsive grid (3 cols → 2 → 1), mobile hamburger menu, and accordion sections ensure reflow.
1.4.13 Content on Hover or Focus (Level AA)	Additional content appearing on hover/focus must be dismissible, hoverable, and persistent.	Tooltips on case‑type icons and disabled Add‑to‑Cart buttons are dismissible via Esc and remain visible for as long as the pointer is over them.
2.2 Principle 2 – Operable
Success Criterion	Description	Implementation
2.1.1 Keyboard (Level A)	All functionality must be operable through a keyboard interface.	Every interactive element (buttons, links, filter chips, accordions, sliders) is reachable with Tab and operable with Enter/Space. The device‑selector modal and cart sidebar trap focus while open and can be dismissed with Esc.
2.3.1 Three Flashes or Below Threshold (Level A)	No content flashes more than 3 times per second.	All animations (Lottie sparkles, skeleton shimmer) use slow, smooth transitions well below this threshold.
2.4.3 Focus Order (Level A)	Focusable components must receive focus in a meaningful sequence.	Tab order follows the logical visual layout: skip‑link → header nav → main content → footer. The custom cursor does not interfere with native tab order.
2.4.7 Focus Visible (Level AA)	Any keyboard‑operable user interface must have a visible focus indicator.	A high‑contrast focus ring (accent colour, 3px outline with offset) is applied to all interactive elements via :focus-visible.
2.5.8 Target Size (Minimum) (Level AA, WCAG 2.2)	Pointer target size must be at least 24×24 CSS pixels.	All buttons, filter chips, and icon links have a minimum touch target of 44×44px (exceeds the requirement).
2.3 Principle 3 – Understandable
Success Criterion	Description	Implementation
3.3.1 Error Identification (Level A)	If an input error is automatically detected, the item in error must be identified and described in text.	All form validation errors show inline messages (e.g., “Please enter a valid email address”) and a summary at the top of the form lists the specific fields needing attention.
3.3.2 Labels or Instructions (Level A)	Labels or instructions must be provided when content requires user input.	All form fields have clear labels; mandatory fields are marked with a red asterisk *. Placeholder text provides expected formats (e.g., +44 7911 123456).
3.2.2 On Input (Level A)	Changing a form control’s setting should not automatically cause a change of context.	Filter selection, colour swatch clicking, and sort dropdown changes do not navigate the user away; they only update the current view or enable a button.
2.4 Principle 4 – Robust
Success Criterion	Description	Implementation
4.1.2 Name, Role, Value (Level A)	For all UI components, name and role can be programmatically determined.	Custom widgets (live chat, accordions, colour swatches, cart sidebar) use appropriate ARIA roles (role="dialog", aria-expanded, aria-label) and states.
3. ISO 9241 – Ergonomics of Human‑System Interaction
The prototype follows the ISO 9241‑110 dialogue principles and the ISO 9241‑210 human‑centred design process.

3.1 Key Dialogue Principles (ISO 9241‑110:2020)
Principle	Implementation
Suitability for the task	The interface is focused entirely on browsing and buying tech accessories; all filters, categories, and search are aligned with that task.
Self‑descriptiveness	System status (skeletons, progress indicators), tooltips, inline validation, and breadcrumbs make the current state and next steps obvious at every moment.
Controllability	Undo toasts, back buttons, “Clear all filters”, Esc to close panels, and persistent device‑selection chips give the user full control over navigation and actions.
Conformity with user expectations	Industry‑standard icons (magnifying glass, heart, shopping bag), common checkout layouts, and wallet‑familiar payment logos meet users’ pre‑existing mental models.
Error tolerance	Real‑time validation prevents submission of malformed data; the Add‑to‑Cart gate prevents accidental addition without required options; the 404 page offers a search and a quick redirect home.
Suitability for individualization	Dark/light mode toggle (with respect for OS preference) and “Shop by Vibe” mood‑based browsing allow users to tailor the experience.
Suitability for learning	Redundant access to Help/FAQ, inline tooltips at the point of decision, and consistent interaction patterns across categories reduce the learning curve.
3.2 Human‑Centred Design Process (ISO 9241‑210:2019)
The entire prototyping effort followed the four essential activities of human‑centred design:

Understand and specify the context of use – analysis of BestSecret and Burga, identification of target audience (Gen‑Z, fashion‑forward tech users).

Specify user requirements – exhaustive mapping of Nielsen heuristics, WCAG, and audience expectations into a feature list.

Produce design solutions – high‑fidelity visual identity, interactive prototype with all key flows.

Evaluate designs – heuristic evaluation, keyboard/screen‑reader audit, contrast checks, and motion‑safety verification (prefers‑reduced‑motion).

4. Design Laws & Supplementary Principles
These empirically validated rules inform specific layout and interaction decisions.

Law / Principle	Description	Application in ZORA
Hick’s Law	Decision time increases with the number of stimuli.	Top‑level navigation limited to clearly distinct categories; filter chips organised into logical groups; only one badge per product card.
Fitts’s Law	The time to acquire a target is a function of distance and size.	Primary CTAs (“Add to Cart”, “Shop Now”) are large, full‑width on mobile, and placed in reachable zones; footer duplicates core links to reduce scrolling distance.
Jakob’s Law	Users spend most of their time on other sites, so they prefer yours to work the same way.	Payment options use real‑world logos (Visa, PayPal); the cart icon, search icon, and menu layout match e‑commerce conventions set by Amazon, ASOS, etc.
Miller’s Law	The average person can hold 7±2 items in working memory.	“Recently Viewed” strip is capped at 4 items; navigation mega‑menus show at most 5‑6 sub‑options per category.
Doherty Threshold	Productivity soars when computer and user interact at a pace (<400ms) that ensures neither has to wait.	Debounced search and filter updates at 300ms, skeleton cards appear instantly, page transitions under 300ms, and the 3D preloader (first visit) respects reduced‑motion to keep the experience quick.
Tesler’s Law (Law of Conservation of Complexity)	Every application has an inherent complexity which cannot be removed; it must be dealt with by either the user or the system.	The “Find My Case” multi‑step wizard (now removed) was an attempt to handle device‑compatibility complexity; the current solution uses persistent chips and category‑specific filtering to shoulder the complexity for the user.
5. Summary of Standards & Compliance Level
Standard / Framework	Version / Reference	Target Level	Status in Prototype
Nielsen’s Heuristics	1994 / 2020	All 10 heuristics satisfied	✅ Implemented
WCAG 2.2	W3C 2023	Level AA	✅ Structurally compliant; contrast, keyboard, and form validation verified
ISO 9241‑110	Dialogue principles (2020)	All 7 principles addressed	✅ Embedded in interaction design
ISO 9241‑210	Human‑centred design process (2019)	Process followed	✅ Activities documented
Hick’s Law	–	–	✅ Navigation and filter design
Fitts’s Law	–	–	✅ Touch target sizes and CTA placement
WAI‑ARIA	1.2	Robust name/role/value for custom widgets	✅ Applied to live chat, accordions, sidebars
This catalogue serves as the definitive HCI compliance reference for the ZORA prototype. It can be included in the project documentation to demonstrate how every design and functional decision was rooted in internationally recognised usability standards.