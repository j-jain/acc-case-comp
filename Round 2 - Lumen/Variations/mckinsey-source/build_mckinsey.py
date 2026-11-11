"""Lumen Round 2 one-slide answer, rebuilt in the sruthir28/enterprise-ai-skills
McKinsey style (deck-pipeline Builder + mckinsey-charts).

All slide words are the approved v5 text (Lumen-v4-marp-source.md), verbatim.

Usage:
    python build_mckinsey.py <out.pptx>
"""

import sys
import copy
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import charts
from charts import new_deck, NAVY, HIGHLIGHT, GREY, DARK_GREY, SOURCE_GREY, WHITE
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR, MSO_AUTO_SIZE
from pptx.enum.shapes import MSO_SHAPE, MSO_CONNECTOR
from pptx.enum.chart import XL_CHART_TYPE
from pptx.chart.data import CategoryChartData
from pptx.oxml.ns import qn
from lxml import etree

# Inter is invisible to PowerPoint on this machine; Arial is the neutral grotesque every judge has.
charts.FONT_NAME = "Arial"
FONT = charts.FONT_NAME

TEXT = RGBColor(0x33, 0x33, 0x33)      # body copy
LIGHT = RGBColor(0xD9, 0xD9, 0xD9)     # charts.py grey ramp, lightest
MID = RGBColor(0xA6, 0xA6, 0xA6)       # charts.py grey ramp, mid
PANEL = RGBColor(0xF2, 0xF2, 0xF2)     # cell / box fill
RULE = RGBColor(0xD9, 0xD9, 0xD9)

# ---------------------------------------------------------------------------
# Geometry (inches)
# ---------------------------------------------------------------------------
L = 0.40
COLS = [(0.40, 4.03), (4.65, 3.06), (7.93, 5.00)]   # x, width; right edge 12.93
R = 12.93

Y_RULE = 1.17
Y_WHY, H_WHY = 1.30, 0.56
Y_NAME = 1.96
Y_HAIR1 = 2.57
Y_EXH = 2.62
Y_HAIR2 = 3.36
Y_BUL, H_BUL = 3.47, 1.72
Y_BEL, H_BEL = 5.24, 0.75
Y_BOTTOM_RULE = 6.07
Y_BOT = 6.15
Y_EXH_TOP_LABEL = 2.63     # exhibit labels above the graphic, all three columns
Y_EXH_SUB_LABEL = 3.16     # exhibit labels below the graphic, all three columns

BODY_PT = 9
BEL_PT = 8.5


# ---------------------------------------------------------------------------
# Low-level helpers
# ---------------------------------------------------------------------------
def I(v):
    return Inches(v)


def _strip_style(shape):
    st = shape._element.find(qn("p:style"))
    if st is not None:
        shape._element.remove(st)


def box(slide, x, y, w, h, fill=None, line=None, line_w=0.75, shape=MSO_SHAPE.RECTANGLE):
    sp = slide.shapes.add_shape(shape, I(x), I(y), I(w), I(h))
    _strip_style(sp)
    if fill is None:
        sp.fill.background()
    else:
        sp.fill.solid()
        sp.fill.fore_color.rgb = fill
    if line is None:
        sp.line.fill.background()
    else:
        sp.line.color.rgb = line
        sp.line.width = Pt(line_w)
    return sp


def oval(slide, cx, cy, d, fill=None, line=None, line_w=0.75):
    return box(slide, cx - d / 2, cy - d / 2, d, d, fill, line, line_w, MSO_SHAPE.OVAL)


def line(slide, x1, y1, x2, y2, color=RULE, w=0.75):
    ln = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, I(x1), I(y1), I(x2), I(y2))
    _strip_style(ln)
    ln.line.color.rgb = color
    ln.line.width = Pt(w)
    return ln


def _style_run(run, size, bold=False, italic=False, color=TEXT, spacing=None):
    f = run.font
    f.name = FONT
    f.size = Pt(size)
    f.bold = bold
    f.italic = italic
    f.color.rgb = color
    if spacing is not None:
        run._r.get_or_add_rPr().set("spc", str(spacing))


def _bullet(paragraph, indent_in=0.13, char="▪", color=NAVY):
    pPr = paragraph._p.get_or_add_pPr()
    pPr.set("marL", str(int(Inches(indent_in))))
    pPr.set("indent", str(-int(Inches(indent_in))))
    buClr = etree.SubElement(pPr, qn("a:buClr"))
    srgb = etree.SubElement(buClr, qn("a:srgbClr"))
    srgb.set("val", str(color))
    buSz = etree.SubElement(pPr, qn("a:buSzPct"))
    buSz.set("val", "100000")
    buFont = etree.SubElement(pPr, qn("a:buFont"))
    buFont.set("typeface", FONT)
    buChar = etree.SubElement(pPr, qn("a:buChar"))
    buChar.set("char", char)


def text(slide, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP,
         wrap=True, space_after=0, bullets=False, line_spacing=None, name=None):
    """paras: list of paragraphs; each paragraph is a list of (text, style-dict) runs."""
    tb = slide.shapes.add_textbox(I(x), I(y), I(w), I(h))
    if name:
        tb.name = name
    tf = tb.text_frame
    tf.word_wrap = wrap
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    for i, runs in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        if space_after:
            p.space_after = Pt(space_after)
        if line_spacing:
            p.line_spacing = line_spacing
        for t, st in runs:
            r = p.add_run()
            r.text = t
            _style_run(r, **st)
        if bullets:
            _bullet(p)
    return tb


def S(size=BODY_PT, **kw):
    d = dict(size=size)
    d.update(kw)
    return d


def LABEL(color=SOURCE_GREY, size=7.5):
    return dict(size=size, bold=True, color=color, spacing=120)


B = S(bold=True, color=NAVY)     # bold key phrase inside body copy
N = S()                          # normal body copy


# ---------------------------------------------------------------------------
# Content (verbatim v5 text)
# ---------------------------------------------------------------------------
PILLARS = [
    dict(
        why=("No shared past", " (no history)"),
        so="the family, across time",
        kind="TRADITION", name="The Four Letters", tag="A shared past",
        bullets=[
            [("Every Lumenite writes ", N), ("four letters in a life", B),
             (", each at home with the household gathered, on the day they reach that age.", N)],
            [("Letters 1–3 ", N), ("stay sealed", B),
             (". At 250 you open them, read your life back, and write the fourth.", N)],
            [("The 250 letter is ", N), ("for your children and theirs", B),
             (", kept with your photo as the family’s record of who you were.", N)],
            [("After death, the letters go to the ", N), ("Lumen Archive", B),
             (", open to any future Lumenite if the writer allowed it while alive.", N)],
            [("In Year 1, the ", N), ("~8,300 Lumenites", B),
             (" already past 250 write first, so history starts on day one.", N)],
        ],
        belonging=" every family gains a written past, and the Archive grows into the whole planet’s shared history.",
        only=" a 300-year life lets you open your own letters 225 years after the first.",
    ),
    dict(
        why=("No shared place", " (nothing smaller than a city of 50,000 to belong to)"),
        so="the district, once a year",
        kind="FESTIVAL", name="The Carrying", tag="A shared place · Day 1 of the 13th moon",
        bullets=[
            [("Each of the 100 districts carries ", N), ("one flame to every home", B),
             (" it has: ~125 homes, door to door from first light.", N)],
            [("Every household adds what fuel it can. Fuel is ", N), ("precious gas", B),
             (", so each home gives part of its wealth.", N)],
            [("At dusk", B),
             (" the flame is set in the district square for all 500 to see. It burns through the night "
              "for as long as the district’s gift lasts.", N)],
        ],
        belonging=" the flame exists only because every door gave. Fire stands for hope and togetherness.",
        only=" the fuel is the currency itself, and a 15-hour night gives the flame its stage.",
    ),
    dict(
        why=("No shared rhythm", " (nothing to look forward to, so work fills the time)"),
        so="the whole planet, every week",
        kind="ENTERTAINMENT", name="The Hidden Head League", tag="A shared rhythm · Every week",
        bullets=[
            [("Each season, every district draws ", N), ("20 champions by lot", B),
             ("; one is secretly the leader.", N)],
            [("Each week the districts ", N), ("play in pairs (50 matches)", B), (".", N)],
            [("Each round, the ", N), ("hidden leader quietly steers", B),
             (" their side through a task; the other side watches who the players follow and names one "
              "suspect. A wrong name clears that suspect and costs the next guess; the first side to name "
              "the other’s leader wins.", N)],
            [("Moons 1–12 are the league; in the 13th moon the ", N), ("top 16 play a knockout", B),
             (", with the final on the last night of the year.", N)],
            [("Spectators bet in gas on the leader: ", N), ("the earlier the bet, the bigger the payout", B),
             (" (up to 20× in round 1, falling as suspects are cleared). Stakes are capped; the house "
              "cut pays the champion district’s prize.", N)],
        ],
        belonging=" a weekly reason to leave work and stand with your district. Every adult plays about 12 seasons in a life.",
        only=" the planet’s real leader is secret, so its favourite game is finding one.",
    ),
]

ASSUMPTIONS = [
    "Ages are in Lumen years (50 = Earth 18, so 25 ≈ Earth 9).",
    "The moon cycle is 32 days, giving 13 moons a year (13 × 32 = 416 days). A week is 8 days, giving 52 weeks.",
    "There are 100 districts of 500 people, with ~4 per home, so ~125 homes each.",
    "Precious gases also burn as fuel, so fuel is money.",
    "Ages are spread evenly, about 167 people per birth-year, so ~8,300 people are already past 250.",
    "Open-air squares hold a whole district. The 1,000-seat Hall hosts the playoffs.",
    "Betting is legal (the economy is capitalist), with a cap per person.",
]


# ---------------------------------------------------------------------------
# Sections
# ---------------------------------------------------------------------------
def title_band(slide):
    text(slide, L, 0.28, 7.3, 0.46,
         [[("Lumen’s real problem is ", S(24, bold=True, color=NAVY)),
           ("belonging.", S(24, bold=True, color=HIGHLIGHT))]],
         anchor=MSO_ANCHOR.BOTTOM, name="Title")
    text(slide, L, 0.80, 7.3, 0.26,
         [[("We give every Lumenite a shared past, a shared place and a shared weekly rhythm",
            S(12.5, color=DARK_GREY))]], name="Subtitle")

    # WHAT WE SEE: the situation, as a call-out with the one highlight bar
    x, w = COLS[2]
    box(slide, x, 0.30, 0.055, 0.76, fill=NAVY)
    text(slide, x + 0.18, 0.30, w - 0.18, 0.78,
         [[("WHAT WE SEE", LABEL())],
          [("People finish work and go home alone. Gatherings are empty. Life is", S(9.5, color=DARK_GREY))],
          [("“functional but empty”", S(19, bold=True, color=NAVY))]],
         anchor=MSO_ANCHOR.MIDDLE, space_after=1, name="WhatWeSee")

    # Title rule = the root of the issue tree
    line(slide, L, Y_RULE, R, Y_RULE, color=NAVY, w=1.0)


def scale_icon(slide, cx, cy, level):
    """Nested rings: inner = family, middle = district, outer = planet. `level` ring is the highlight."""
    rings = [0.10, 0.22, 0.34]
    for i, d in enumerate(reversed(rings)):
        idx = 2 - i
        if idx == level:
            if idx == 0:
                oval(slide, cx, cy, d, fill=HIGHLIGHT)
            else:
                oval(slide, cx, cy, d - 0.03, line=HIGHLIGHT, line_w=2.75)
        else:
            oval(slide, cx, cy, d, line=MID, line_w=0.75)


def pillar_header(slide, i, p):
    x, w = COLS[i]
    cx = x + w / 2
    # issue-tree branch: rule -> WHY cell
    line(slide, cx, Y_RULE, cx, Y_WHY, color=NAVY, w=1.0)
    oval(slide, cx, Y_RULE, 0.07, fill=NAVY)

    box(slide, x, Y_WHY, w, H_WHY, fill=PANEL)
    scale_icon(slide, x + 0.28, Y_WHY + H_WHY / 2, i)
    # WHY top-anchored and SO bottom-anchored, so both rows share a baseline across the three cells
    text(slide, x + 0.56, Y_WHY + 0.047, w - 0.66, 0.30,
         [[("WHY  ", LABEL()), (p["why"][0], S(8.5, bold=True, color=NAVY)), (p["why"][1], S(8.5, color=DARK_GREY))]],
         name=f"Why{i+1}")
    text(slide, x + 0.56, Y_WHY + 0.32, w - 0.66, 0.1925,
         [[("SO  ", LABEL()), (p["so"], S(8.5, color=NAVY))]],
         anchor=MSO_ANCHOR.BOTTOM, name=f"So{i+1}")

    text(slide, x, Y_NAME, w, 0.58,
         [[(p["kind"], LABEL())],
          [(p["name"], S(15, bold=True, color=NAVY))],
          [(p["tag"], S(8.5, italic=True, color=DARK_GREY))]],
         space_after=0, name=f"Name{i+1}")

    line(slide, x, Y_HAIR1, x + w, Y_HAIR1)
    line(slide, x, Y_HAIR2, x + w, Y_HAIR2)


def pillar_body(slide, i, p):
    x, w = COLS[i]
    text(slide, x, Y_BUL, w, H_BUL, p["bullets"], bullets=True, space_after=3, name=f"Bullets{i+1}")

    box(slide, x, Y_BEL, w, H_BEL, fill=PANEL)
    box(slide, x, Y_BEL, 0.04, H_BEL, fill=NAVY)
    text(slide, x + 0.14, Y_BEL + 0.07, w - 0.24, H_BEL - 0.12,
         [[("Belonging:", S(BEL_PT, bold=True, color=NAVY)), (p["belonging"], S(BEL_PT))],
          [("Only on Lumen:", S(BEL_PT, bold=True, color=HIGHLIGHT)), (p["only"], S(BEL_PT))]],
         space_after=2, name=f"Belonging{i+1}")


# ---- Exhibit 1: true-scale lifeline -------------------------------------------------
def exhibit_lifeline(slide):
    x, w = COLS[0]
    xa, xb = x + 0.12, x + w - 0.22
    yl = 2.97
    pos = lambda age: xa + (xb - xa) * age / 300.0

    line(slide, xa, yl, pos(250), yl, color=MID, w=1.5)
    line(slide, pos(250), yl, xb, yl, color=HIGHLIGHT, w=2.0)
    for age in (25, 50, 150):
        oval(slide, pos(age), yl, 0.16, fill=WHITE, line=MID, line_w=1.25)
        oval(slide, pos(age), yl, 0.06, fill=MID)
    oval(slide, pos(250), yl, 0.2, fill=HIGHLIGHT, line=WHITE, line_w=1.0)
    box(slide, xb - 0.1, yl - 0.1, 0.2, 0.2, fill=NAVY)

    num = lambda s: (s, S(8, bold=True, color=NAVY))
    word = lambda s: (s, S(8, color=DARK_GREY))
    up, down, hgt = Y_EXH_TOP_LABEL, Y_EXH_SUB_LABEL, 0.16
    text(slide, pos(25) - 0.5, up, 1.0, hgt, [[num("25"), word(" childhood")]], align=PP_ALIGN.CENTER, name="Life25")
    text(slide, pos(50) - 0.5, down, 1.0, hgt, [[num("50"), word(" adulthood")]], align=PP_ALIGN.CENTER, name="Life50")
    text(slide, pos(150) - 0.5, up, 1.0, hgt, [[num("150"), word(" midlife")]], align=PP_ALIGN.CENTER, name="Life150")
    text(slide, pos(250) - 0.6, down, 1.2, hgt, [[num("250"), word(" end of work")]], align=PP_ALIGN.CENTER, name="Life250")
    text(slide, xb - 0.9, up, 1.0, hgt, [[("Archive", S(8, bold=True, color=HIGHLIGHT))]],
         align=PP_ALIGN.RIGHT, name="LifeArchive")


# ---- Exhibit 2: native stacked bar of the 30 h day (mckinsey-charts styling) ---------
def _manual_plot_layout(chart):
    plotArea = chart._chartSpace.find(qn("c:chart")).find(qn("c:plotArea"))
    layout = plotArea.find(qn("c:layout"))
    if layout is None:
        layout = etree.SubElement(plotArea, qn("c:layout"))
        plotArea.insert(0, layout)
    for c in list(layout):
        layout.remove(c)
    ml = etree.SubElement(layout, qn("c:manualLayout"))
    for tag, val in (("layoutTarget", "inner"), ("xMode", "edge"), ("yMode", "edge"),
                     ("x", "0"), ("y", "0"), ("w", "1"), ("h", "1")):
        etree.SubElement(ml, qn(f"c:{tag}")).set("val", val)


def _no_chart_fill(chart):
    cs = chart._chartSpace
    chart_el = cs.find(qn("c:chart"))
    spPr = etree.Element(qn("c:spPr"))
    etree.SubElement(spPr, qn("a:noFill"))
    ln = etree.SubElement(spPr, qn("a:ln"))
    etree.SubElement(ln, qn("a:noFill"))
    chart_el.addnext(spPr)
    plotArea = chart_el.find(qn("c:plotArea"))
    pspPr = copy.deepcopy(spPr)
    plotArea.append(pspPr)


def exhibit_day_bar(slide):
    x, w = COLS[1]
    bx, bw = x + 0.10, w - 0.20
    by, bh = 2.80, 0.32
    hx = lambda h: bx + bw * h / 30.0

    data = CategoryChartData()
    data.categories = ["30 h day"]
    data.add_series("Light", [15])
    data.add_series("Dark", [15])
    gf = slide.shapes.add_chart(XL_CHART_TYPE.BAR_STACKED, I(bx), I(by), I(bw), I(bh), data)
    gf.name = "DayChart"
    chart = gf.chart
    charts._style_chart(chart, show_legend=False)
    plot = chart.plots[0]
    plot.gap_width = 0
    plot.overlap = 100
    charts._set_series_color(plot.series[0], LIGHT)
    charts._set_series_color(plot.series[1], NAVY)
    va = chart.value_axis
    va.minimum_scale, va.maximum_scale = 0, 30
    va.visible = False
    chart.category_axis.visible = False
    _manual_plot_layout(chart)
    _no_chart_fill(chart)

    # sun ticks at 5 h and 10 h, flame (the one highlight) at dusk
    for h in (5, 10):
        line(slide, hx(h), by - 0.05, hx(h), by, color=MID, w=0.75)
        text(slide, hx(h) - 0.3, Y_EXH_TOP_LABEL, 0.6, 0.15, [[(f"{h} h", S(8, bold=True, color=DARK_GREY))]],
             align=PP_ALIGN.CENTER, name=f"Tick{h}")
    line(slide, hx(15), 2.73, hx(15), by + bh + 0.02, color=HIGHLIGHT, w=2.0)
    oval(slide, hx(15), 2.70, 0.12, fill=HIGHLIGHT)

    text(slide, bx + 0.03, by, bw / 2 - 0.06, bh,
         [[("15 h light: ", S(8, bold=True, color=NAVY)), ("door to door", S(8, color=NAVY))]],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, name="LightLabel")
    text(slide, hx(15) + 0.03, by, bw / 2 - 0.06, bh,
         [[("15 h dark:", S(8, bold=True, color=WHITE))],
          [("burns while the fuel lasts", S(8, color=WHITE))]],
         align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, name="DarkLabel")

    text(slide, bx, Y_EXH_SUB_LABEL, 1.3, 0.16,
         [[("first light", S(8, color=DARK_GREY)), (" · 0 h", S(8, bold=True, color=DARK_GREY))]],
         name="FirstLight")
    text(slide, hx(15) - 0.6, Y_EXH_SUB_LABEL, 1.2, 0.16,
         [[("dusk", S(8, bold=True, color=HIGHLIGHT)), (" · 15 h", S(8, bold=True, color=NAVY))]],
         align=PP_ALIGN.CENTER, name="Dusk")


# ---- Exhibit 3: 20 champions, one hidden leader -------------------------------------
def exhibit_champions(slide):
    x, w = COLS[2]
    x0 = x + 0.12
    pitch = (w - 0.24) / 20
    leader = 14
    for k in range(20):
        cx = x0 + pitch * (k + 0.5)
        if k == leader:
            continue
        oval(slide, cx, 2.70, 0.085, fill=GREY)
        body = box(slide, cx - 0.075, 2.755, 0.15, 0.085, fill=GREY, shape=MSO_SHAPE.ROUND_2_SAME_RECTANGLE)
        body.adjustments[0] = 0.5
    lcx = x0 + pitch * (leader + 0.5)
    lead = oval(slide, lcx, 2.75, 0.24, fill=HIGHLIGHT)
    tf = lead.text_frame
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "?"
    _style_run(r, 10, bold=True, color=WHITE)

    yb = 3.03
    line(slide, x0, yb, x0 + pitch * 20, yb, color=MID)
    line(slide, x0, yb - 0.04, x0, yb, color=MID)
    line(slide, x0 + pitch * 20, yb - 0.04, x0 + pitch * 20, yb, color=MID)
    line(slide, lcx, 2.87, lcx, Y_EXH_SUB_LABEL - 0.02, color=HIGHLIGHT, w=1.0)
    text(slide, x0 + pitch * 7 - 0.6, Y_EXH_SUB_LABEL, 1.2, 0.16, [[("20 champions", S(8, bold=True, color=NAVY))]],
         align=PP_ALIGN.CENTER, name="Champions")
    text(slide, lcx - 0.65, Y_EXH_SUB_LABEL, 1.3, 0.16, [[("1 hidden leader", S(8, bold=True, color=HIGHLIGHT))]],
         align=PP_ALIGN.CENTER, name="HiddenLeader")


# ---- Bottom band: one Lumen year + key assumptions ---------------------------------
def bottom_band(slide):
    line(slide, L, Y_BOTTOM_RULE, R, Y_BOTTOM_RULE, color=MID, w=0.75)

    # ---- One Lumen year: caption on the band's baseline, then 13 equal moons + a zoom on moon 13
    x, w = COLS[0]
    text(slide, x, Y_BOT, w, 0.30,
         [[("ONE LUMEN YEAR  ", LABEL(NAVY)),
           ("The 13th moon is Lumen’s high season: it opens with the Carrying (day 1) and closes "
            "with the league final (day 32).", S(8, color=TEXT))]],
         name="OneYear")

    sq, pitch = 0.17, 0.205
    y_sq = 6.78
    for k in range(12):
        box(slide, x + pitch * k, y_sq, sq, sq, fill=LIGHT)
    league_w = pitch * 11 + sq
    line(slide, x, y_sq - 0.05, x + league_w, y_sq - 0.05, color=MID)
    line(slide, x, y_sq - 0.05, x, y_sq - 0.02, color=MID)
    line(slide, x + league_w, y_sq - 0.05, x + league_w, y_sq - 0.02, color=MID)
    text(slide, x, y_sq - 0.22, league_w, 0.15, [[("League (moons 1–12)", S(8, color=DARK_GREY))]],
         align=PP_ALIGN.CENTER, name="LeagueMoons")

    m13x = x + pitch * 12
    m = box(slide, m13x, y_sq, sq, sq, fill=HIGHLIGHT)
    tf = m.text_frame
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    p = tf.paragraphs[0]
    p.alignment = PP_ALIGN.CENTER
    r = p.add_run()
    r.text = "13"
    _style_run(r, 7, bold=True, color=WHITE)

    # zoom wedge: moon 13 opened up into its 32 days
    zx, zw, zy, zh = m13x + sq + 0.22, w - (m13x + sq + 0.22 - x), y_sq - 0.10, sq + 0.20
    line(slide, m13x + sq, y_sq, zx, zy, color=MID, w=0.5)
    line(slide, m13x + sq, y_sq + sq, zx, zy + zh, color=MID, w=0.5)
    box(slide, zx, zy, zw, zh, fill=WHITE, line=HIGHLIGHT, line_w=1.0)
    text(slide, zx + 0.07, zy, zw / 2, zh, [[("day 1", S(8, bold=True, color=NAVY))]],
         anchor=MSO_ANCHOR.MIDDLE, name="Day1")
    text(slide, zx + zw / 2 - 0.07, zy, zw / 2, zh, [[("day 32", S(8, bold=True, color=NAVY))]],
         align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE, name="Day32")

    # ---- Key assumptions: footnote block, one numbered line each, in two sub-columns on the grid
    text(slide, COLS[1][0], Y_BOT, COLS[1][1], 0.16, [[("KEY ASSUMPTIONS", LABEL(NAVY))]], name="AssumeLabel")
    split = 3
    for (cx, cw), items, start in ((COLS[1], ASSUMPTIONS[:split], 1), (COLS[2], ASSUMPTIONS[split:], split + 1)):
        paras = [[(f"{n}\t", S(8, bold=True, color=NAVY)), (a, S(8, color=DARK_GREY))]
                 for n, a in enumerate(items, start)]
        tb = text(slide, cx, Y_BOT + 0.19, cw, 7.30 - (Y_BOT + 0.19), paras, space_after=1.5, name=f"Assume{start}")
        for para in tb.text_frame.paragraphs:
            pPr = para._p.get_or_add_pPr()
            pPr.set("marL", str(int(Inches(0.14))))
            pPr.set("indent", str(-int(Inches(0.14))))


def build(out):
    prs = new_deck()
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    title_band(slide)
    for i, p in enumerate(PILLARS):
        pillar_header(slide, i, p)
        pillar_body(slide, i, p)
    exhibit_lifeline(slide)
    exhibit_day_bar(slide)
    exhibit_champions(slide)
    bottom_band(slide)
    prs.core_properties.title = "TeamName_ACC_Round2"
    prs.core_properties.author = ""
    prs.save(out)
    print(f"Wrote {out}  ({Path(out).stat().st_size // 1024} KB, {len(slide.shapes)} shapes)")


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "lumen_mckinsey.pptx")
