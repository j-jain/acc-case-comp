"""Compare the visible words of the new pptx with the approved v5 Marp source.
Usage: python worddiff.py <v5 marp .md> <new .pptx>"""
import html
import re
import sys
from collections import Counter

from pptx import Presentation
from pptx.enum.shapes import MSO_SHAPE_TYPE

TOKEN = re.compile(r"[\w~×≈–’'\-]+|\?")


def tokens(s):
    s = html.unescape(s).replace(" ", " ").lower()
    return [t.strip("–-’'") or t for t in TOKEN.findall(s)]


def v5_words(md_path):
    body = open(md_path, encoding="utf-8").read().split("\n---\n", 1)[1]
    body = re.sub(r"<style.*?</style>", " ", body, flags=re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    return Counter(tokens(body))


def pptx_words(path):
    prs = Presentation(path)
    c = Counter()
    pics = charts = 0
    for shp in prs.slides[0].shapes:
        if shp.shape_type == MSO_SHAPE_TYPE.PICTURE:
            pics += 1
        if getattr(shp, "has_chart", False) and shp.has_chart:
            charts += 1
        if shp.has_text_frame:
            c.update(tokens(shp.text_frame.text))
    return c, pics, charts


old = v5_words(sys.argv[1])
new, pics, charts = pptx_words(sys.argv[2])
print(f"v5 words={sum(old.values())}  new words={sum(new.values())}  pictures={pics}  native charts={charts}")
added, removed = new - old, old - new
print("ADDED:  ", dict(added) or "none")
print("REMOVED:", dict(removed) or "none")
