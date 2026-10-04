# CLAUDE.md

## Project Overview

Goodlugg Mockups — high-fidelity static HTML mockups for **Goodlugg**, a luggage delivery service for travelers in Korea. The service lets travelers ship bags between hotels, airports, and custom locations so they can explore hands-free.

## Project Structure

```
goodlugg_korea_delivery.html      # Main delivery service page (English)
goodlugg_korea_delivery_kr.html   # Main delivery service page (Korean)
korea_door_to_door.html           # Door-to-door custom route page (English)
korea_door_to_door_kr.html        # Door-to-door custom route page (Korean)
```

## Tech Stack

- Pure HTML5 with inline CSS and vanilla JavaScript (no frameworks or build tools)
- Google Fonts: `Noto Sans KR` (Korean), `Plus Jakarta Sans` (English)
- Mobile-first responsive design
- No package manager, bundler, or linter — files open directly in a browser

## Conventions

- Each page exists in two languages (English `_en` suffix or no suffix, Korean `_kr` suffix). Changes to one language version should be mirrored in the other.
- All CSS and JS are inline within each HTML file (no external stylesheets or scripts).
- The design targets mobile viewports primarily.
- External links point to `goodlugg.com` and social channels (KakaoTalk, WhatsApp, Instagram).

## Working with These Files

- No build step — just edit HTML and open in a browser to preview.
- When modifying styles or behavior, update both the English and Korean versions of the affected page.
- Preserve the existing inline structure; do not extract CSS/JS into separate files unless explicitly asked.
