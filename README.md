# Soffice Essenza

Storefront for **Soffice Essenza by Paola**, artisan candles handmade in Dublin, Ireland. A seasonal home page that opens onto the collections.

Minimalist, editorial design (inspired by premium candle brands like Osar): off-white background, generous whitespace, refined serif + clean sans typography, subtle gold accents, product-centric grid. The home page adds modern, interactive movement for the season on show.

Live at **https://sofficeessenza.ie** (custom domain, `CNAME`).

## Pages
- **Autumn** (`index.html`) — **home / seasonal landing**. 🍂
  - **Six scents**: Pumpkin Spice, Warming Cashmere, Espresso Martini, Dark Honey & Tobacco, Wood Fire, Cinnamon & Apple.
  - **Seven shapes**: Jesmonite Pumpkin, Wax Pumpkin, Mushroom, Zen Ghost, Ghost, Ghost Dog, Ghost Cat. The Jesmonite Pumpkin and the Mushroom are cast in **jesmonite**; the pumpkin is a lidded vessel with soy wax and a wooden wick (115 g / 4 oz) and has real photos (`images/autumn-pumpkin*.jpg`, shot on white). The rest are inline SVG illustrations until photos exist.
  - The autumn shapes take **only** those six scents — the 30+ menu is for the other collections. Each card's `data-scents` enforces it, and the chatbot's autumn flow has no way out to the full list.
  - No fixed prices — every card says "Ask for a price" and the price is confirmed on WhatsApp.
  - Warm aurora, falling leaves, flowing gradient headline, mouse parallax, marquee, autumn palette, how-to-order, portal to the other collections.
- **Mini Pets** (`minipets.html`) — warm taupe accent, give-back (supports animals).
- **Namaste** (`namaste.html`) — sage accent, meditative.
- **Carezza** (`carezza.html`) — wellness and massage candles, soy & shea.
- **Old Collections** (`old-collections.html`) — the archive of past seasons, in the nav between Carezza and Scents. Two cards lead to the collections that are out of season but still made to order:
  - **Mare** (`mare.html`) — Summer Edition, sea, dusty-blue accent.
  - **Light Your Pride** (`pride.html`) — the Pride collection. Decorative, unscented soy-wax candles in the six rainbow-flag colours: The Arc (157 g · €8), The Trunk (195 g · €10), The Pillar (187 g · €9). **10% of every sale** goes to **Outhouse LGBTQ+ Centre, Dublin** (outhouse.ie). Returns to the home page each June.

  Both pages keep a `.season-note` bar under the header pointing back here, and their nav highlights **Old Collections**.
- **Scents** (`scents.html`) — full fragrance menu (30+ scents, 7 families) with live search, category filter and per-scent ordering. Linked from the nav on every page.

Instagram: **@soffice.essenza** · WhatsApp: **+353 83 440 8449** · Dublin, Ireland.

## Shared scripts (on every page)
- `cart.js` — site-wide cart in `localStorage`. Auto-wires every `.product` card: clicking opens a configurator (scent + colour + quantity), then a slide-in drawer checks out through WhatsApp. Cards may declare `data-scents="A|B|C"` to limit the scent list and `data-nocolour="1"` to skip the colour step; a card with no `.product-price` simply carries no price.
- `widget.js` — floating WhatsApp button and chatbot. Name capture, page-aware shortcut, scent search, the Autumn flow, custom orders, quick FAQ; configured candles go into the same cart. UI is localised, the WhatsApp order message stays English.
- `i18n.js` — EN (default) / IT / PT-BR. Injects the EN·IT·PT switcher into `.nav`, translates text nodes through the dictionary `D` (English source → `{it, pt}`), and remembers the choice. Proper nouns — collection names, scent names, colours — stay English by design.

Load order on every page: `i18n.js`, then `cart.js`, then `widget.js` (all `defer`).

## Swapping the seasonal home page
The home page is whichever collection is in season. To rotate it: rename the current `index.html` to its own page (as `pride.html` was), drop the new landing in as `index.html`, then update the nav link and the footer "Collections" list on every page. The collection leaving the spotlight joins `old-collections.html` — add a card there and a `.season-note` bar to its page.

Collection pages: sticky header with the **Soffice Essenza by Paola** logo, split hero, brand statement, 3-product grid, specs strip and footer. Shared identity: official logo (`images/logo.png`), gold scallop-shell divider, gold accents.

Product images are elegant placeholders (minimal inline-SVG candle in a tinted tile). Swap any for a real photo: replace the inline `<svg class="shape">` / `<svg class="candle">` with `<img src="images/your-photo.jpg" alt="">`.

## Stack
Plain HTML/CSS/JS, single file per page, no build step. Google Fonts: Cormorant Garamond, Inter, Pinyon Script. Flame favicon: `favicon.svg`.

## Hosting
GitHub Pages, custom domain `sofficeessenza.ie`.
