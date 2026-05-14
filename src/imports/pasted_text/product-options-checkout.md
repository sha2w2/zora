. Product‑Specific Option Maps
All options are defined in products.json and handled dynamically on the product detail page. The Add‑to‑Cart gate now varies by category: the mandatory selections change depending on what kind of product the user is viewing.

Category	Required selections	Options (type / size / colour)	Notes
Phone Cases	Device Model, Case Type, Colour	Case Type: Snap, Tough, Elite, MagSafe (if compatible). Device Model: iPhone 17 Pro, Galaxy S25, etc.	Same as before; dropdowns/chips.
Charging	Colour (if applicable)	Options: Power Bank 10K mAh, Wireless Charger, USB‑C Cable. Colour: Black, White, ZORA Green.	No case type; model is pre‑set.
Ring Holders	Type, Colour	Type: MagSafe Ring, Universal Clip Ring. Colour variants.	
Drinkware	Product Type, Colour	Type: Travel Mug (12 oz), Leakproof Tumbler (16 oz), Water Bottle (20 oz). Colour: Midnight, Blush, Lime.	Capacity included in option label.
Earbuds Cases	Device Model, Case Type, Colour	Device: AirPods Pro 2, AirPods 3, Galaxy Buds Pro. Case Type: Snap, Tough. Colour.	Only case types applicable to earbuds.
Tablet Cases	Device Model, Case Type, Colour	Similar to phone cases but for tablets.	
Kindle Cases	Kindle Model, Case Type, Colour	Model: Paperwhite, Oasis. Case Type: Snap, Folio.	
Laptop Protection	Laptop Brand, Type, Colour	Brand: Apple, HP, Dell, Lenovo. Type: Hardshell Case, Sleeve. Colour.	No exact model selection; just brand.
Watch Bands	Watch Model, Band Size, Colour	Model: Apple Watch Series 9, Ultra 2, Galaxy Watch6. Size: 40mm, 44mm, 45mm, etc. (depending on model). Colour.	
Phone Straps	Strap Type, Colour	Type: Wristlet, Crossbody. Colour.	
Notebooks & Planners	Product Type, Colour	Type: A5 Hardcover Notebook, Dated Planner. Colour.	
Eyewear	Frame Style, Lens Type	Style: Classic, Round. Lens: Blue Light, Sunglasses.	No colour; lens type is the variant.
Bundles	Bundle Combination, Colour Theme	Combination: Phone+Earbuds, Phone+Watch Band. Colour Theme: Clover, Floral, etc.	Only colour theme is selectable; items are pre‑matched.
Accessories	Product Type, Colour (if any)	Type: Screen Protector, Lens Protector, Charm.	
Collaborations	Design, Colour	Design: Artist Collab 1, Collab 2. Colour.	
Clearance	(Same options as original category)		
Implementation:
In product.html, read the product’s category and dynamically render the correct selector row(s). For example:

javascript
if (product.category === 'drinkware') {
  showDrinkwareOptions(); // renders type + colour
} else if (product.category === 'phone-cases') {
  showCaseOptions(); // renders device model + case type + colour
}
Each mandatory field must be satisfied before the Add to Cart button becomes enabled. A tooltip on the disabled button clarifies what’s missing.

2. Checkout Flow – Full Fake Purchase Simulation
The existing checkout page (checkout.html) is extended with the following behaviours.

2.1 User Auto‑Fill (Logged‑in only)
If the user is signed in (check localStorage for zora-current-user):

Full Name = currentUser.firstName + ' ' + currentUser.lastName

Email = currentUser.email
Both fields are pre‑filled and editable. If the user is a guest, fields are empty.

2.2 Payment Method Selector
Display four clearly labelled payment options with real brand logos (SVG icons):

Apple Pay (Apple logo)

Google Pay (Google “G” logo)

Visa / Credit Card (Visa logo)

PayPal (PP monogram)

Only the selected method reveals its specific input fields. Others are hidden.

Apple Pay / Google Pay:

Clicking their buttons instantly triggers a “Processing…” animation, then shows a success toast: “Apple Pay payment simulated – order placed!”

No additional fields needed.

Visa / Credit Card:

Shows fields: Card Number, Expiry Date (MM/YY), CVV.

Real‑time validation with Luhn algorithm for card number plausibility.

Display format: as user types, spaces are automatically added every 4 digits (e.g., 4111 1111 1111 1111).

Example valid fake number: 4111 1111 1111 1111 (passes Luhn, recognized as Visa test number).

Expiry must be in the future, format validated. CVV: 3 digits.

Error messages are precise:

“Card number is invalid – please check the digits.”

“Expiry date must be in MM/YY format and not in the past.”

“CVV must be exactly 3 digits.”

PayPal:

Shows a simulated PayPal email field: “PayPal account email”.

Validate email format.

A fake “Log in to PayPal” button (non‑functional) then simulates approval with a loading state and success message.

Error: “Please enter a valid email address.”

2.3 Shipping Address & Contact
Fields: Full Name, Email, Phone, Address Line 1, Address Line 2, City, Postcode, Country (dropdown).

Real‑time inline validation with green/red borders.

Specific error messages:

“Please enter a valid UK phone number (e.g., +44 7911 123456).”

“Postcode must be in the correct format (e.g., SW1A 1AA).”

Fake but believable examples are displayed as placeholder hints:

Phone: +44 7911 123456

Postcode: SW1A 1AA

Address: 123 Oxford Street, London

2.4 Order Review & Place Order
Review section shows cart items, shipping method (free over €40), totals.

“Place Order” button runs final validation. On success, show a confirmation page with a fake order number (e.g., ZORA-2026-0087) and a “Continue Shopping” button.

2.5 Error Prevention & Guidance (HCI #5, #9)
All fields validate on blur and on submit.

A summary of errors is shown at the top if the user tries to submit with invalid fields: “Please correct the 3 errors below before placing your order.”

Individual field errors are removed as soon as the user corrects them.

3. Implementation Notes (Zero Visual Changes)
The payment logos (Apple, Google, Visa, PayPal) should be clean SVG files sourced from brand assets or simple custom SVGs; they will match the current monochrome icon style.

All new interaction follows the existing CSS variables, typography, and motion tokens.

The checkout page still uses the same header/footer and responds to theme toggle.

The “Add to Cart” disabling logic on product pages now references the category‑specific mandatory options.

These are the absolute final mechanical additions. The prototype will now offer a complete, HCI‑sound, and aesthetically consistent shopping journey from product selection to fake payment. No other aspects are changed.