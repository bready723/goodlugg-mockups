# -*- coding: utf-8 -*-
"""Hotel promo card (65x100 trim, 3 mm bleed). Master + one card per partner, only the front QR changes.
Run inside ~/.venvs/office312:  python build.py
Outputs in out/: card_{slug}.pdf (2 pages), card_{slug}_A4.pdf (front sheet + mirrored back sheet, 4-up),
preview_{slug}.png (front | back side by side), plus master (blank QR)."""
import json, os, subprocess, sys, tempfile, shutil, time
from pathlib import Path
import qrcode
from PIL import Image
import cv2
from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
OUT = HERE / "out"; OUT.mkdir(exist_ok=True)
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DATE = "20261022"

HEAD = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{t}</title><link rel="stylesheet" href="card.css">{extra}</head><body>'
TAIL = '</body></html>'
FRONT_TPL = (HERE / "front.tpl.html").read_text()
BACK = (HERE / "back.html").read_text()

A4_STYLE = """<style>
@page{size:A4;margin:0} body{background:#fff}
.sheet{position:relative;width:210mm;height:297mm;overflow:hidden;page-break-after:always} .sheet:last-child{page-break-after:auto}
.slot{position:absolute} .slot .page{page-break-after:auto}
.m{position:absolute;background:#000}
</style>"""
# 2 x 2 slots of 71 x 106 mm, centred on A4
SLOT_W, SLOT_H, B = 71, 106, 3
COLS, ROWS, G = 2, 2, 10  # G = gutter between slots (mm) so crop marks stay clear of the neighbour
X0 = (210 - COLS * SLOT_W - (COLS - 1) * G) / 2
Y0 = (297 - ROWS * SLOT_H - (ROWS - 1) * G) / 2
SLOTS = [(X0 + c * (SLOT_W + G), Y0 + r * (SLOT_H + G)) for r in range(ROWS) for c in range(COLS)]
SLOTS_MIRROR = [(X0 + (COLS - 1 - c) * (SLOT_W + G), Y0 + r * (SLOT_H + G)) for r in range(ROWS) for c in range(COLS)]

def crop_marks(x, y):
    """Trim-line crop marks (5 mm long, 0.2 mm) outside the bleed of a slot at (x,y) mm."""
    tx, ty, tw, th = x + B, y + B, SLOT_W - 2 * B, SLOT_H - 2 * B
    m = []
    for cx in (tx, tx + tw):
        for cy in (ty, ty + th):
            m.append(f'<div class="m" style="left:{cx-0.1:.2f}mm;top:{cy-8:.2f}mm;width:0.2mm;height:5mm"></div>')
            m.append(f'<div class="m" style="left:{cx-0.1:.2f}mm;top:{cy+3:.2f}mm;width:0.2mm;height:5mm"></div>')
            m.append(f'<div class="m" style="left:{cx-8:.2f}mm;top:{cy-0.1:.2f}mm;width:5mm;height:0.2mm"></div>')
            m.append(f'<div class="m" style="left:{cx+3:.2f}mm;top:{cy-0.1:.2f}mm;width:5mm;height:0.2mm"></div>')
    return "".join(m)

def qr_png(url, path):
    q = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=12, border=0)
    q.add_data(url); q.make(fit=True)
    img = q.make_image(fill_color="black", back_color="white").convert("RGB")
    img.save(path)
    return q.modules_count

def front_html(qr_src):
    block = f'<div class="qrbox"><img src="{qr_src}" alt="Book QR"></div>'
    return FRONT_TPL.replace("{{QR_BLOCK}}", block)

def write_html(name, title, body, extra=""):
    p = HERE / name
    p.write_text(HEAD.format(t=title, extra=extra) + body + TAIL)
    return p

def chrome_pdf(html_path, pdf_path):
    prof = tempfile.mkdtemp(prefix="hc_chrome_")
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

def preview(pdf, png):
    base = OUT / "_pv"
    subprocess.run(["pdftoppm", "-png", "-r", "160", str(pdf), str(base)], check=True)
    pages = sorted(OUT.glob("_pv-*.png"))
    ims = [Image.open(p).convert("RGB") for p in pages]
    gap = 24
    w = sum(i.width for i in ims) + gap * (len(ims) - 1); h = max(i.height for i in ims)
    canvas = Image.new("RGB", (w, h), (235, 232, 226))
    x = 0
    for i in ims:
        canvas.paste(i, (x, 0)); x += i.width + gap
    canvas.save(png)
    for p in pages: p.unlink()

def verify_qr(pdf, expect_front):
    base = OUT / "_vq"
    subprocess.run(["pdftoppm", "-png", "-r", "600", str(pdf), str(base)], check=True)
    pages = sorted(OUT.glob("_vq-*.png"))
    dets = [cv2.QRCodeDetector(), cv2.QRCodeDetectorAruco()]  # std detector is flaky on some symbols; Aruco is the fallback
    found = []
    for p in pages:
        img = cv2.imread(str(p)); got = []
        for det in dets:
            ok, decoded, pts, _ = det.detectAndDecodeMulti(img)
            got = sorted({d for d in (decoded if ok else []) if d})
            if got: break
        found.append(got)
        p.unlink()
    print("  QR front:", found[0], "\n  QR back :", found[1])
    if expect_front is not None:
        assert found[0] == [expect_front], f"front QR mismatch: {found[0]} != {expect_front}"
    assert sorted(found[1]) == sorted(["https://wa.me/821086930419?text=", "https://pf.kakao.com/_AxoCxeC?from=qr"]) or len(found[1]) == 2, found[1]

def build_one(slug, qr_src, expect_url):
    tag = slug or "master"
    body = front_html(qr_src) + BACK
    card_html = write_html(f"card_{tag}.html", f"Hotel promo card: {tag}", body)
    card_pdf = OUT / f"HotelPromoCard_{tag}_{DATE}.pdf"
    chrome_pdf(card_html, card_pdf)
    # A4: sheet 1 fronts, sheet 2 backs mirrored (flip on long edge)
    fr = front_html(qr_src); bk = BACK
    s1 = "".join(f'<div class="slot" style="left:{x}mm;top:{y}mm">{fr}</div>{crop_marks(x,y)}' for x, y in SLOTS)
    s2 = "".join(f'<div class="slot" style="left:{x}mm;top:{y}mm">{bk}</div>{crop_marks(x,y)}' for x, y in SLOTS_MIRROR)
    a4_html = write_html(f"a4_{tag}.html", f"Hotel promo card A4: {tag}", f'<div class="sheet">{s1}</div><div class="sheet">{s2}</div>', A4_STYLE)
    a4_pdf = OUT / f"HotelPromoCard_{tag}_{DATE}_A4.pdf"
    chrome_pdf(a4_html, a4_pdf)
    preview(card_pdf, OUT / f"HotelPromoCard_{tag}_{DATE}_preview.png")
    r = PdfReader(str(card_pdf)); b = r.pages[0].mediabox
    print(f"[{tag}] pages={len(r.pages)} size={float(b.width)/72*25.4:.1f}x{float(b.height)/72*25.4:.1f}mm  A4 pages={len(PdfReader(str(a4_pdf)).pages)}")
    verify_qr(card_pdf, expect_url)

def main():
    partners = json.loads((HERE / "partners.json").read_text())
    try:
        ex_url = "https://www.goodlugg.com/luggage-delivery/korea-door-to-door?utm_source=card"  # example QR on the master
        n = qr_png(ex_url, HERE / "assets" / "qr_example.png"); print(f"[master] example QR {n} modules")
        build_one(None, "assets/qr_example.png", ex_url)
        for p in partners:
            qr = HERE / "assets" / f"qr_{p['slug']}.png"
            n = qr_png(p["url"], qr)
            print(f"[{p['slug']}] QR {n} modules -> {18/n:.3f} mm/module")
            build_one(p["slug"], f"assets/qr_{p['slug']}.png", p["url"])
    finally:
        kill_chrome()

if __name__ == "__main__":
    main()
