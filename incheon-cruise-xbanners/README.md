# Incheon Cruise Goodlugg Zone X-banner gallery

Updated 9 October 2026 (New York). Review gallery at `https://bready723.github.io/goodlugg-mockups/incheon-cruise-xbanners/`.

## Review options

55 combinations: booking copies A–C × T1–T5; storage copies A–D × T1–T5; staff desk copies A–D × T1–T5. Each kind's selector applies the same copy to all five backgrounds. The preview-size slider changes only the gallery scale.

- T1: purple with lime rounded card (luggage-center reference).
- T2: reference yellow with the original traditional border at top and bottom.
- T3: purple arch over white.
- T4: purple with lime bottom band.
- T5: plain white.

Full-size view: `?only=1A&theme=T1`, `?only=2B&theme=T2`, `?only=3C&theme=T5`. The compact form `?only=1A-T1` is also supported. Legacy `?only=1A` chooses T4. Printing uses a 600 × 1800 mm page with zero margins. Review assets remain provisional for production.

## Artwork and typography

Existing tiger_move.png, tiger_sit.png and QR assets were retained. The delivery tiger is beside the logo; storage tiger is on the left, facing right, without mirroring; desk has no tiger. Footer contains only goodlugg.com. Desktop/gallery text uses locally bundled Pretendard fonts with the original SIL Open Font License. Brand colors follow workspace guidance: purple #512a72, lime #c7c22e. Additional yellow #efee5d follows Sara's reference-theme request.

Traditional border is shown using CSS background positioning of pattern-reference.png, the unmodified image17.png embedded in Designs/20260207_디자인파일.pptx. Only its top/bottom ornamental strips are displayed. The older banner text is not used as current operational guidance.

## Before print

Confirm the real terminal booking QR, meaning of the 3:00 PM storage cutoff (KST), printer corner-hole/finishing margins and physical dimensions, and original high-resolution/vector tiger artwork. Card/cash copy follows Sara's supplied brief. The current qr.png is the existing review asset and must be verified for the final terminal destination.

## Quality checks

Every background × copy is captured in headless Google Chrome at 600 × 1800. Checks cover overflow, canvas size, loaded images, tiger placement, footer, copy selectors, and gallery scaling. Headless Chrome is closed afterward and the task's remaining browser process count is confirmed as zero. The Drive archive contains the resulting QA report and preview contact sheets.
