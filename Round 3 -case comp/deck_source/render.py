import sys, os, fitz
pdf, outdir = sys.argv[1], sys.argv[2]
pages = sys.argv[3].split(',') if len(sys.argv) > 3 else None
os.makedirs(outdir, exist_ok=True)
doc = fitz.open(pdf)
for i, page in enumerate(doc, start=1):
    if pages and str(i) not in pages:
        continue
    pix = page.get_pixmap(dpi=110)
    p = os.path.join(outdir, f"s{i:02d}.png")
    pix.save(p)
    print(p)
print("pages", doc.page_count)
