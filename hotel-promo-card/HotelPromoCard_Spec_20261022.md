# Goodlugg Hotel Promo Card: print spec

## 1. Size

| Item | Value |
|---|---|
| Trim | 65 x 100 mm (same as the Visa 1 bag free card) |
| Bleed | 3 mm on all sides, page 71 x 106 mm |
| Safe area | 4 mm inside the trim line |
| Resolution | Vector PDF (text, shapes), raster art at 300 dpi or above |
| Sides | 2, flip on long edge |

## 2. What changes per partner

Only the front QR code. Everything else (both sides) is identical for every hotel or partner.

| Partner | QR target |
|---|---|
| Master | blank 18 x 18 mm QR slot, dashed outline (remove the outline when placing a QR) |
| Each partner | `https://www.goodlugg.com/luggage-delivery/korea-door-to-door/qr/{slug}?utm_source=card` |

QR: 18 x 18 mm code on a 20 x 20 mm white box, centered, error correction M, 41 modules (0.44 mm per module). Keep the URL under 100 characters so the code stays at 41 modules or fewer.

## 3. Colors

| Use | Hex |
|---|---|
| Yellow (front, partner code band) | #F1EF1D |
| Purple (headings, pills text, labels) | #742B97 |
| Body text | #1D1D1F |
| Storage note (red) | #C0392B |
| Pills, QR box, partner code box | #FFFFFF |

## 4. Type

Pretendard. Headline 12.6 pt ExtraBold, pills 9.6 pt Bold, back steps 8.6 pt SemiBold, notes 6.4 to 7.2 pt.

## 5. Front, top to bottom (from trim top)

| Element | Position |
|---|---|
| Dancheong strip | 0 to 3.2 mm, full bleed |
| Header (tiger, K-Luggage Hunter, Goodlugg, short rule) | 6.3 to 25.4 mm, 60 mm wide, centered |
| Headline `Luggage Delivery` / `Same-day Across Korea` | 28.6 mm |
| Pill 1 `to your next hotel, airport,` | 43.6 mm, 57 x 5.6 mm |
| Pill 2 `& beyond` | 50.4 mm, 57 x 5.6 mm |
| QR box 20 x 20 mm | 59.6 mm, centered |
| `BOOK IN 1 Min.` | 81.3 mm |
| `Have a Goodlugg on Every Trip` | 87.9 mm |
| Dancheong strip | 96.8 to 100 mm, full bleed |

## 6. Back, top to bottom (from trim top)

| Element | Position |
|---|---|
| `How It Works` + rule | 5.2 mm, left margin 5 mm |
| Steps 1 to 3 (purple circle, yellow number) | 13.8 mm, 6.6 mm row pitch |
| Red note `* Later delivery? First storage day free, then ₩5,000/bag per day.` | 36.6 mm |
| `Contact Us via Live Chat` | 47.2 mm |
| KakaoTalk icon + QR 13 mm, WhatsApp icon + QR 13 mm | 53.6 mm |
| Yellow band with `Partner Code` label, white box 38.5 x 12 mm, note `* Enter at checkout: Discount / Partner Code` | 73 mm to trim bottom, full bleed |

Back QR targets: KakaoTalk `https://pf.kakao.com/_AxoCxeC?from=qr`, WhatsApp `https://wa.me/821086930419?text=`.

## 7. Files

| File | Use |
|---|---|
| `HotelPromoCard_Master_20261022.pdf` | 2 pages, blank QR slot, for the agency to place a partner QR |
| `HotelPromoCard_{Partner}_20261022.pdf` | 2 pages, QR placed, print ready with bleed |
| `HotelPromoCard_{Partner}_20261022_A4.pdf` | A4 sheet, 4 up, page 1 fronts, page 2 backs mirrored for long edge duplex, crop marks |
| `HotelPromoCard_{Partner}_20261022_preview.png` | review image, front and back |

Rebuild: `python build.py` (needs Google Chrome, Python packages qrcode, opencv, pypdf, Pillow). Add partners in `partners.json`.

## 8. Notes for the printer

- Dancheong strips, tiger and wordmark in these files are raster captures for mock up. Use the agency vector originals for the final run.
- Verify the yellow against the existing card stock so the new card matches the cards already placed in hotels.
