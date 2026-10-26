# -*- coding: utf-8 -*-
"""Hotel promo POP board (common, no QR). Five pocket copies -> pop_v1..v5.html + PDF + previews."""
import subprocess, shutil, tempfile, time, sys
from pathlib import Path
from PIL import Image

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"; OUT.mkdir(exist_ok=True)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DATE = "20261026"
COPIES = [
    ("V1", "Take One,<br>Book Anytime"),
    ("V2", "Take One &amp;<br>Scan to Book"),
    ("V3", "Please<br>Take One"),
    ("V4", "Grab a Card,<br>Book Later"),
    ("V5", "Take One,<br>Scan Later"),
]

def chrome_pdf(html_path, pdf_path):
    prof = tempfile.mkdtemp(prefix="pop_chrome_")
    try:
        subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
                        f"--user-data-dir={prof}", "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
                        "--virtual-time-budget=4000", f"--print-to-pdf={pdf_path}", html_path.as_uri()],
                       check=True, capture_output=True, timeout=90)
    finally:
        shutil.rmtree(prof, ignore_errors=True)

def kill_chrome():
    subprocess.run(["pkill", "-f", "Google Chrome.*--headless"], capture_output=True)
    time.sleep(0.5)
    n = subprocess.run(["pgrep", "-f", "Google Chrome.*--headless"], capture_output=True, text=True).stdout.strip()
    print("headless chrome left:", 0 if not n else len(n.splitlines()))

def preview(pdf, png, dpi=150):
    base = OUT / "_pv"
    subprocess.run(["pdftoppm", "-png", "-r", str(dpi), "-singlefile", str(pdf), str(base)], check=True)
    im = Image.open(str(base) + ".png")
    bl = round(3 / 25.4 * dpi)
    im.crop((bl, bl, im.width - bl, im.height - bl)).save(png)
    (OUT / "_pv.png").unlink()
    return png

def main():
    tpl = (HERE / "pop.tpl.html").read_text(encoding="utf-8")
    try:
        for tag, copy in COPIES:
            html = HERE / f"pop_{tag.lower()}.html"
            html.write_text(tpl.replace("{{TAG}}", tag).replace("{{POCKET_COPY}}", copy), encoding="utf-8")
            pdf = OUT / f"HotelPromoPOP_{tag}_{DATE}.pdf"
            chrome_pdf(html, pdf)
            preview(pdf, OUT / f"HotelPromoPOP_{tag}_{DATE}_preview.png")
            print("built", tag)
    finally:
        kill_chrome()

if __name__ == "__main__":
    main()
