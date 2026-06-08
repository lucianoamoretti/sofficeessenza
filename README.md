# Soffice Essenza

Storefront for **Soffice Essenza by Paola**, artisan scented candles. A vibrant Pride home page that opens onto four collections.

Minimalist, editorial design (inspired by premium candle brands like Osar): off-white background, generous whitespace, refined serif + clean sans typography, subtle gold accents, product-centric grid. The home page adds modern, interactive movement for Pride Month.

## Pages
- **Orgoglio** (`index.html`) — **home / Pride Month** landing. Animated rainbow aurora, flowing gradient headline, mouse parallax, scrolling marquee, count-up 10% donation, Pride collection + a portal to the other collections. 🌈
- **Mare** (`mare.html`) — sea, dusty-blue accent.
- **Mini Pets** (`minipets.html`) — warm taupe accent, give-back (supports animals).
- **Namaste** (`namaste.html`) — sage accent, meditative.

**Orgoglio** is a limited Pride collection: **10% of every sale** is donated to an LGBTQIAP+ NGO. ⚠️ The NGO name (`Casa 1`) in `index.html` is a placeholder — confirm/replace it (search `TODO: confirm/replace NGO`).

Collection pages: sticky header with the **Soffice Essenza by Paola** logo, split hero, brand statement, 3-product grid (each "Buy" opens WhatsApp), specs strip and footer. Shared identity: official logo (`images/logo.png`), gold scallop-shell divider, gold accents, specs (Soy wax · 170 g · 20 h burn).

Product images are elegant placeholders (minimal CSS candle in a tinted tile). Swap any for a real photo: replace the inline `<svg class="candle">` with `<img src="images/your-photo.jpg" alt="">`.

## Stack
Plain HTML/CSS/JS, single file per page. Google Fonts: Cormorant Garamond, Inter, Pinyon Script. Brand logo: `images/logo.png`; flame favicon: `favicon.svg`.

## Hosting
Served via GitHub Pages.

## To customise
- Instagram / WhatsApp links in each page footer
- Candle names, scents and prices
- Replace `favicon.svg` with the official logo PNG if desired
