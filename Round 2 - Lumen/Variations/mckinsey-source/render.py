"""Render page 1 of a PDF to PNG and list its fonts.  Usage: python render.py in.pdf out.png [zoom]"""
import sys
import fitz

pdf, png = sys.argv[1], sys.argv[2]
zoom = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
doc = fitz.open(pdf)
page = doc[0]
page.get_pixmap(matrix=fitz.Matrix(zoom, zoom)).save(png)
print(f"pages={len(doc)} size={page.rect.width:.0f}x{page.rect.height:.0f}pt -> {png}")
print("fonts:", sorted({f[3] for f in page.get_fonts()}))
