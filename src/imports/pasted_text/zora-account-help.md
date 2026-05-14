ZORA — FUNCTIONAL PROTOTYPE: ACCOUNT SYSTEM & MAXIMUM-ASSISTANCE HELP
This addition transforms ZORA from a guest-only shell into a fully navigable prototype with a simulated but believable account experience, and a help centre modelled on the Vaulté prototype’s comprehensive support architecture.

1. SIGN IN & REGISTER — WORKING PROTOTYPE PAGES
1.1 Pages Required
signin.html — Sign In

register.html — Create Account

forgot-password.html — Password Reset (optional but adds realism)

1.2 Sign In Page (signin.html)
Layout:

Centred card on the same themed background (light/dark).

ZORA main logo at top.

Email input (with real‑time validation).

Password input (with show/hide toggle).

“Sign In” button (full width, accent background).

Link to “Create an account” (navigates to register.html).

Link to “Forgot password?” (navigates to forgot-password.html).

Fake‑data‑friendly behaviour:

Accept any valid‑looking email and any password of ≥ 6 characters.

On “Sign In” click:

Check if the email is registered in localStorage (zora-users array).
If not, show inline error: “No account found with that email. Create one?” with a link.
If password doesn’t match stored hash (prototype: just compare plain text), show error “Incorrect password.”
On success:
Save current user object to localStorage (zora-current-user).
Update the header account icon to show user’s first name initial.
Redirect to the page they came from (or home).
The header account dropdown must now reflect the logged‑in state.

1.3 Register Page (register.html)
Form fields:

First Name

Last Name

Email

Password (min 6 chars, with strength indicator visual bar)

Confirm Password

Validation rules (HCI‑compliant):

All fields required.

Email: valid format.

Password: at least 6 chars.

Confirm password must match.

Real‑time green/red borders as user types.

On submit:

Store user in localStorage (zora-users array with email, password, name, loyaltyPoints: 0).

Auto sign‑in (set zora-current-user).

Redirect to home.

Show toast: “Welcome, [First Name]!”

1.4 Forgot Password (forgot-password.html)
Email input → on submit, show a confirmation message: “If that email is registered, we’ve sent a reset link.” (Prototype: no actual email, just simulates.)

1.5 Account Dropdown — Expanded Menu Options
The account icon (👤) opens a dropdown that changes based on login state.

Logged‑out state:

Sign In

Register

─────────

Wishlist (♡)

Help & FAQ

Orders & Returns

Loyalty Points

─────────

Dark/Light mode toggle (remove from separate header button? – Keep separate header toggle, but include here too for redundancy. The earlier plan said the theme toggle in header is prominent; we can keep it there and here for flexibility. HCI redundancy is good.)

Logged‑in state:

👤 Hi, [First Name] (non‑clickable)

My Orders

Returns

Wishlist (♡)

Loyalty Points (with balance, e.g., “230 points”)

Help & FAQ

─────────

Sign Out

Implementation:

The dropdown is generated dynamically via JS based on zora-current-user.

“Wishlist” here is an additional pathway to wishlist.html – this is deliberate redundancy so users who expect to find their saved items under the account menu can do so. The standalone heart icon in the header remains unchanged.

Sign Out:

Clears zora-current-user.

Updates UI immediately.

Redirects to home.

2. HELP & FAQ — MAXIMUM ASSISTANCE (VAULTÉ‑INSPIRED)
We’ll rebuild the Help page to match the depth found in the Vaulté prototype, following the button analysis provided.

2.1 Help Page Structure (help.html)
Header: Same global header; Help link now goes here directly.

Three redundant entry points (HCI principle from your Vaulté presentation):

Header ❓ icon (already there).
Account dropdown (now added).
Footer link (already there).
2.2 Page Components
a) Search FAQ (Client‑side Instant Search)
Large text input at the top with magnifying glass icon.

As user types, FAQ list filters in real time (no server call).

No results: “No articles match your search. Try different keywords or contact us below.”

b) Categorized FAQ Accordions
Group questions under:

Orders & Payment

Shipping & Delivery

Returns & Exchanges

Product Compatibility

Account & Loyalty

Each category has 4‑6 questions. Click to expand/collapse accordion items. Only one open at a time within a category (optional).

c) Article Feedback (from Vaulté analysis)
After each expanded answer, show:
“Was this helpful? 👍 Yes | 👎 No”
If “Yes” clicked → brief confirmation: “Thanks for your feedback!”
If “No” clicked → expand a small text area: “What were you looking for? (optional)” and a “Submit” button. Then thank them and suggest live chat.

This directly maps to the Vaulté feedback buttons and improves H9 (Help users recover from errors) and H10.

d) Live Chat Widget (Persistent, All Pages)
Already planned, but now ensure it’s fully integrated with the help page. The widget shows:

Initial message: “Hi! 👋 Have a question? We’re here to help.”

Pre‑scripted responses that link to FAQ answers (e.g., “How do I return an item?” → opens relevant FAQ accordion).

Option to leave a message if no answer found (prototype: just shows “We’ll get back to you at [email]”).

Online/offline indicator (green dot) for perceived availability.

e) Contact Escalation Path
At the bottom of the FAQ, before the footer:
“Still need help?
📧 Email us at support@zorastore.com
💬 Start a live chat (bottom‑right corner)
📞 Call us: +44 20 7946 0958 (Mon‑Fri, 9am‑5pm)”

f) Back to Top Button
Fixed button in bottom‑right (beside chat) that appears after scrolling 300px, smooth‑scrolls to top.

2.3 Help Page HCI Compliance
H1: Instant search feedback, loading spinner if heavy content (prototype: none needed).

H3: Always a way back to home/shopping; live chat minimizable.

H4: Consistent icons, colours.

H9: Helpful error recovery: if search yields no results, offer contact methods.

H10: Help is easy to find, focused on user tasks, and offers concrete steps (just like Vaulté’s deep‑linked help center).

3. LOYALTY POINTS — SIMPLE SIMULATION
3.1 Display
In account dropdown (logged in): “Loyalty Points: 230”

On a simple loyalty.html page (linkable from account dropdown):

Shows current points balance.

History: “+10 points for signing up”, “+50 points for first purchase”, etc. (static data for prototype).

Explanation of how to earn/redeem (text only).

3.2 Purpose
Adds realism and shows the account dropdown is fully functional.

4. ORDERS & RETURNS — STATIC PAGES FOR COMPLETENESS
4.1 orders.html
Accessible from account dropdown (logged in) and footer.

For prototype: shows a table with 1‑3 fake past orders.

Order number, date, items (names only), total, status (“Delivered”).

“View Details” button (shows a dummy detail card).

If not logged in, redirect to sign‑in page with a toast: “Please sign in to view your orders.”

4.2 returns.html
Accessible from account dropdown and footer.

Explains the return policy (text pulled from FAQ returns section).

Includes a “Start a Return” button that, when logged in, shows a fake return form (order number, reason dropdown). On submit: “Return request submitted. We’ll email you a label.”

Not logged in → sign‑in redirect.

These pages make the prototype feel complete and support the full shopping experience.

5. INTEGRATION & PRESERVING AESTHETICS
All new pages (signin.html, register.html, forgot-password.html, orders.html, returns.html, loyalty.html, updated help.html) must use the same CSS framework (global.css, components.css, layout.css, existing colour variables).

The header remains unchanged (still centred logo, left nav, right utilities).

The standalone theme toggle (sun/moon) stays in the header for visibility; the account dropdown includes it for redundancy.

No new animations that violate prefers-reduced-motion; the existing motion library is reused.

All new buttons use the same Lucide icon set and follow the defined states (hover, active, focus ring).

6. UPDATED IMPLEMENTATION ORDER (Add to previous plan)
After the core functional prototype is built, add these steps:

Build signin.html and register.html with form validation and localStorage auth simulation.

Add forgot-password.html with static message.

Update nav.js / account dropdown to render correct menu based on login state and include all options: Orders, Returns, Wishlist, Loyalty, Help & FAQ, Sign Out.

Create orders.html with fake order table.

Create returns.html with policy text and dummy form.

Create loyalty.html with points display.

Rebuild help.html with search, categorized accordions, article feedback, live chat integration, and contact escalation.

Wire all links from account dropdown to these pages, and ensure footer links them as well.

Test the full flow:

Register → sign in → see name initial in header.

Add items to cart → proceed to checkout (guest or logged in).

After purchase, go to Order History (simulated).

Browse help, search FAQ, give feedback.

Sign out and verify UI reverts.

7. VERIFICATION CHECKLIST (Account & Help)
Sign In page works with fake but valid email/password; errors display correctly.

Register page creates account and auto‑signs in.

Account dropdown shows all options when logged in / out.

“Wishlist” in account dropdown navigates to wishlist.html.

“Sign Out” clears session and updates header.

Help page has FAQ search that filters in real time.

FAQ items expand/collapse smoothly.

Feedback buttons (Yes/No) work and display appropriate messages.

Live chat widget is present and offers contextual help links.

Contact escalation (email/phone) is displayed.

Orders page shows dummy orders; returns page has a functional dummy form.

Loyalty page shows points.

No visual regressions; theme toggle works on all new pages.

All new pages are keyboard accessible and screen‑reader friendly (use semantic HTML, ARIA labels).

This extension makes ZORA not just a visual prototype but a full experience, with account management, comprehensive help, and the ability to complete an entire simulated purchase loop—exactly what you need for a convincing HCI demonstration.