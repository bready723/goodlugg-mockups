#!/usr/bin/env python3
"""Builds the Discover Seoul Pass banner copy versions (1600x1100, 16:11) and the gallery page."""
import atexit, html, pathlib, subprocess, tempfile

HERE = pathlib.Path(__file__).resolve().parent
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DATE = "20261117"
W, H = 1600, 1100
ROUTE = "Seoul Hotel ↔ Busan Hotel"

# (version, label, [(text, size class)])  size classes: xl / l / m / s
VERSIONS = [
    ("A", "Route + Time", [("Same-Day Luggage Delivery", "l"), (ROUTE, "m"), ("10% Off", "xl hi"), ("Drop Off at 10 AM, Get It by 10 PM", "s")]),
    ("C", "Offer First", [("10% Off", "xl hi"), ("Same-Day Luggage Delivery", "l"), (ROUTE, "m")]),
    ("D", "Travel Bagless", [("Travel Bagless", "h"), ("10% Off", "xl hi"), ("Same-Day Delivery", "l"), (ROUTE, "s")]),
    ("E", "Time", [("Same-Day Luggage Delivery", "l"), ("10% Off", "xl hi"), ("Drop Off at Seoul Hotel by 10 AM", "t"), ("Receive at Busan Hotel by 10 PM Same Day", "t")]),
    ("F", "App Download", [("Same-Day Luggage Delivery", "l"), ("10% Off", "xl hi"), (ROUTE, "s"), ("Download the Goodlugg App", "s")]),
    ("G", "Bagless + App", [("Travel Bagless", "h"), (ROUTE, "m"), ("10% Off", "xl hi"), ("Download the Goodlugg App", "s")]),
]

CSS = """
@font-face{font-family:Pretendard;font-weight:600;src:url(../fonts/Pretendard-SemiBold.otf)}
@font-face{font-family:Pretendard;font-weight:700;src:url(../fonts/Pretendard-Bold.otf)}
@font-face{font-family:Pretendard;font-weight:800;src:url(../fonts/Pretendard-ExtraBold.otf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:1100px;overflow:hidden;background:#000}
.root{position:relative;width:1600px;height:1100px;overflow:hidden;font-family:Pretendard,sans-serif;-webkit-font-smoothing:antialiased}
.ph{position:absolute;top:0;width:800px;height:1100px;background-size:cover}
.seoul{left:0;background-image:url(seoul.jpg);background-position:50% 50%}
.busan{left:800px;background-image:url(busan.jpg);background-position:50% 50%}
.ov{position:absolute;inset:0;background:linear-gradient(rgba(0,0,0,.36),rgba(0,0,0,.36) 70%,rgba(0,0,0,.18))}
.logo{position:absolute;top:40px;left:50%;height:104px;transform:translateX(-50%)}
.copy{position:absolute;left:0;right:0;top:158px;height:770px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.55),0 0 3px rgba(0,0,0,.4)}
.ln{display:block;white-space:nowrap;line-height:1.1;letter-spacing:-.015em;font-weight:800}
.xl{font-size:230px;line-height:1}.h{font-size:176px}.l{font-size:112px}.l2{font-size:88px}.t{font-size:74px;font-weight:700}.m{font-size:104px;font-weight:700}.s{font-size:80px;font-weight:700;margin-top:6px}
.hi{color:#c7c22e}
.app{color:#fff}
.t1{position:absolute;left:36px;bottom:28px;height:120px}
.t2{position:absolute;right:36px;bottom:26px;height:215px}
"""

def banner_html(lines):
    spans = "".join(f'<span class="ln {c}" contenteditable="plaintext-only" spellcheck="false">{html.escape(t)}</span>' for t, c in lines)
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Goodlugg DSP banner</title><style>{CSS}</style></head>
<body><div class="root"><div class="ph seoul"></div><div class="ph busan"></div><div class="ov"></div>
<img class="logo" src="logo_white.png" alt="Goodlugg"><div class="copy">{spans}</div>
<img class="t1" src="tiger_sit.png" alt=""><img class="t2" src="tiger_move.png" alt=""></div></body></html>
"""

def shoot(src, out, profile):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
                    "--allow-file-access-from-files", "--force-device-scale-factor=1",
                    f"--user-data-dir={profile}", "--virtual-time-budget=8000",
                    f"--window-size={W},{H}", f"--screenshot={out}", src.as_uri()],
                   check=True, capture_output=True, timeout=120)

def kill_headless():
    subprocess.run(["pkill", "-f", "Google Chrome.*--headless"], capture_output=True)

def main():
    atexit.register(kill_headless)
    cards = []
    with tempfile.TemporaryDirectory() as profile:
        for v, label, lines in VERSIONS:
            page = HERE / f"banner_{v}.html"
            png = HERE / f"DSP_SeoulBusan_{v}_{DATE}.png"
            page.write_text(banner_html(lines), encoding="utf-8")
            shoot(page, png, profile)
            cards.append(f'<figure><a href="{page.name}"><img src="{png.name}" width="800" height="550" alt="Version {v}"></a>'
                         f'<figcaption><b>{v}</b> {html.escape(label)}<a class="dl" href="{png.name}" download>PNG</a></figcaption></figure>')
    (HERE / "index.html").write_text(f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Discover Seoul Pass banner</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
<style>
body{{margin:0;padding:32px;font-family:Pretendard,-apple-system,sans-serif;color:#222;background:#fff}}
h1{{font-size:24px;margin:0 0 20px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,520px),1fr));gap:24px}}
figure{{margin:0}}figure img{{display:block;width:100%;height:auto;outline:1px solid #ddd}}
figcaption{{display:flex;align-items:center;gap:8px;font-size:15px;margin-top:8px}}
.dl{{margin-left:auto;color:#512a72;font-weight:700;text-decoration:none;border:1px solid #512a72;border-radius:6px;padding:4px 12px}}
@media (max-width:700px){{body{{padding:16px}}}}
</style></head><body><h1>Discover Seoul Pass banner</h1><div class="grid">
{chr(10).join(cards)}
</div></body></html>
""", encoding="utf-8")

if __name__ == "__main__":
    main()
