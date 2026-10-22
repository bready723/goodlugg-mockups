# Goodlugg Hotel Promo Card: print spec

## 1. Size

| Item | Value |
|---|---|
| Trim | 65 x 100 mm (same as the Visa 1 bag free card) |
| Bleed | 3 mm on all sides, page 71 x 106 mm |
| Safe area | 4 mm inside the trim line |
| Resolution | Vector PDF (text, shapes), raster art at 300 dpi |
| Sides | 2, flip on long edge |

## 2. What changes per partner

Only the front QR code. Everything else (both sides) is identical for every hotel or partner.

| File | QR target |
|---|---|
| Master | example QR, `https://www.goodlugg.com/luggage-delivery/korea-door-to-door?utm_source=card` (replace with the partner QR) |
| Each partner | `https://www.goodlugg.com/luggage-delivery/korea-door-to-door/qr/{slug}?utm_source=card` |

QR: 18 x 18 mm code on a 22 x 22 mm white box (2 mm quiet zone), centered, error correction M, 41 modules at 0.44 mm per module. Keep the URL under 100 characters so the code stays at 41 modules or fewer.

## 3. Colors

| Use | Hex |
|---|---|
| Yellow (front) | #F1EF1D |
| Purple (headline, copy, labels, step circles) | #742B97 |
| Body text, BOOK IN 1 Min., deferred delivery copy, footnotes | #1D1D1F |
| QR box, partner code box | #FFFFFF |

## 4. Type

Pretendard. Headline 13 pt ExtraBold, copy 9.8 pt Bold, back steps 8.6 pt SemiBold, notes 5.9 to 7.4 pt.

## 5. Front, top to bottom (from trim top)

| Element | Position |
|---|---|
| Dancheong strip, same crop and scale as the Visa card (the 3 mm bleed above it is a flat extension of the strip edge) | 0 to 5.2 mm, full bleed |
| Header (tiger, K-Luggage Hunter, Goodlugg, short rule) | 9.4 to 28.5 mm, 60 mm wide, centered |
| Headline `Same-day Luggage Delivery` / `across Korea`, both lines 13 pt | 33.2 mm |
| Copy `to your next hotel, airport,` / `and beyond`, no box | 47.4 mm |
| QR box 22 x 22 mm, QR 18 mm | 59.4 mm, centered |
| `BOOK IN 1 Min.` | 83.2 mm |
| Dancheong strip | 94.8 to 100 mm, full bleed |

## 6. Back, top to bottom (from trim top), same format as the Visa card back

| Element | Position |
|---|---|
| `How It Works` + rule | 5.4 mm, left margin 5 mm |
| Steps 1 to 3 (purple circle, yellow number) | 13.8 mm, 6.7 mm row pitch |
| `Want It Delivered Later?` + rule (same style as How It Works) | 37.2 mm |
| `Deferred delivery available:` / `pick your delivery date while booking.` / `Storage: first day complimentary,` / `then ₩5,000/bag per day.` (black, 7.2 pt) | 44.4 mm |
| `Contact Us` / `via Live Chat` label left, WhatsApp QR and KakaoTalk QR 13.5 mm with captions right | 61.6 mm |
| `Partner` / `Code` label left, white box 8.2 mm high with 0.25 mm grey border right (Memo row format) | 81 mm |
| `* Sign-up / log-in required` / `* Apply at Discount / Partner Code at checkout` (5.9 pt) | 91.2 mm |

Back QR targets: KakaoTalk `https://pf.kakao.com/_AxoCxeC?from=qr`, WhatsApp `https://wa.me/821086930419?text=`.

## 7. Files

| File | Use |
|---|---|
| `HotelPromoCard_Master_20261022.pdf` | 2 pages, example QR, for the agency to swap in a partner QR |
| `HotelPromoCard_{Partner}_20261022.pdf` | 2 pages, partner QR placed, print ready with bleed |
| `HotelPromoCard_{Partner}_20261022_A4.pdf` | A4 sheet, 4 up, page 1 fronts, page 2 backs mirrored for long edge duplex, crop marks |
| `HotelPromoCard_{Partner}_20261022_preview.png` | review image, front and back, cropped to trim |

Rebuild: `python build.py` (needs Google Chrome, Python packages qrcode, opencv, pypdf, Pillow). Add partners in `partners.json`.

## 8. Notes for the printer

- The dancheong strips are cropped from the Visa card proof at 300 dpi, and the tiger and wordmark are raster captures. Use the agency vector originals for the final run.
- Match the yellow to the existing card stock so the new card sits next to the cards already placed in hotels.
