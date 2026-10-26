# Goodlugg Hotel POP Stand: print spec

## 1. Size

| Item | Value |
|---|---|
| Trim | A5, 148 x 210 mm (same as the Visa POP) |
| Bleed | 3 mm on all sides, page 154 x 216 mm |
| Safe area | 4 mm inside the trim line |
| Sides | 1 (board front) |

## 2. What changes

Nothing per hotel. The board is common: no QR, no hotel name. The hotel card (65 x 100) in the pocket carries the QR.

Only the pocket copy differs between V1 to V5. Pick one.

| File | Pocket copy |
|---|---|
| V1 | Take One, / Book Anytime |
| V2 | Take One & / Scan to Book |
| V3 | Please / Take One |
| V4 | Grab a Card, / Book Later |
| V5 | Take One, / Scan Later |

## 3. Colors

| Use | Hex |
|---|---|
| Yellow (board) | #F6ED14 (Visa POP proof) |
| Purple (headline, copy) | #742B97 |
| Pocket box | #5F2079 (Visa POP box) |
| Pocket copy | #F6ED14 on the box |

## 4. Type

Pretendard. Headline 27 pt ExtraBold, copy 20 pt Medium, pocket copy 23 pt ExtraBold.

## 5. Layout, top to bottom (from trim top)

| Element | Position |
|---|---|
| Dancheong strip, 8 mm visible, extended into the bleed | 0 to 8 mm, full width |
| Header (tiger, K-Luggage Hunter, Goodlugg, short rule), 124 mm wide, centered | 14 to 49 mm |
| `Same-day Luggage Delivery` / `across Korea` | 52 to 70 mm |
| `to your next hotel, airport,` / `and beyond` | 76.5 to 91 mm |
| Purple pocket box 70 x 77 mm, centered, same position as the Visa POP box | 123.3 to 200.3 mm, x 39 to 109 mm |
| Pocket copy, 2 lines, centered in the box | 154 to 171 mm |
| Dancheong strip | 202 to 210 mm, full width |

The copy ends at 91 mm so that a 65 x 100 card standing in the 77 mm pocket (top of card about 94 to 100 mm from the trim top) does not cover it.

## 6. Pocket

The pocket is a separate tray fixed to the board. If the tray front is printed separately, use the box area of the PDF (70 x 77 mm plus 3 mm bleed) at the same copy. Tray size is taken from the Visa POP proof; confirm with the fabricator before printing.

## 7. Files

| File | Use |
|---|---|
| `pop_v1.html` to `pop_v5.html` + `pop.css` + `assets/` | live HTML, 154 x 216 mm page |
| `HotelPromoPOP_V1_20261026.pdf` to `_V5_` | print PDF with bleed, one per copy option |
| `HotelPromoPOP_CopyOptions_20261026.png` | the five pockets side by side |
| `HotelPromoPOP_Assembled_20261026.png` | board with a card in the pocket, not for print |

Rebuild: `python build.py` (needs Google Chrome, Python packages Pillow, poppler pdftoppm).

## 8. Notes for the printer

- Dancheong strips, tiger and wordmark are raster captures for mock up. Use the agency vector originals for the final run.
- Match the yellow and the box purple to the Visa POP so the two stands sit together.
