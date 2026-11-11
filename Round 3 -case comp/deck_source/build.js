// Apollo Tyres x ACC Round 3: 12-slide deck (plus title and appendix), built from the McKinsey-lens re-analysis.
// Run: node build.js <out.pptx>
const pptxgen = require('pptxgenjs');
const OUT = process.argv[2] || 'deck.pptx';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 in
pres.title = 'Win the first replacement';
pres.subject = 'Apollo Tyres x ACC Case Competition, Round 3';
pres.author = 'Team';
pres.company = 'ACC Case Competition';

const FH = 'Segoe UI Semibold';
const FB = 'Segoe UI';
pres.theme = { headFontFace: FH, bodyFontFace: FB };

const C = {
  ink: '1B1D2E', body: '33374B', sec: '555970', muted: '666A7D', rule: 'D9DBE3',
  panel: 'F5F3F9', panel2: 'F6F7F9', white: 'FFFFFF',
  purple: '5E3A9C', purpleTint: 'DCD1EF', purpleSoft: 'EEE8F7',
  teal: '007A6E', amber: '9C6300', amberMark: 'C98200', amberTint: 'F6E7C8',
  grey: 'B4B8C5', greyTint: 'E9EAEF', dark: '1A1330', darkText: 'E6E0F2', darkMuted: 'B9B0CF',
};

const X0 = 0.55, CW = 12.23, XR = X0 + CW;
const BODY_Y = 1.68, SO_Y = 6.08, SO_H = 0.5, SRC_Y = 6.7, SRC_H = 0.5;

pres.defineSlideMaster({
  title: 'CONTENT',
  background: { color: C.white },
  objects: [
    { placeholder: { options: { name: 'title', type: 'title', x: X0, y: 0.62, w: CW, h: 0.92, fontFace: FH, fontSize: 20, color: C.ink, valign: 'top', align: 'left', margin: 0 }, text: '' } },
  ],
});
pres.defineSlideMaster({ title: 'COVER', background: { color: C.dark }, objects: [] });

// ---------- helpers ----------
function T(s, text, o) {
  s.addText(text, Object.assign({ isTextBox: true, margin: 0, fontFace: FB, fontSize: 12, color: C.body, valign: 'top' }, o));
}
function box(s, x, y, w, h, fill, extra) {
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, Object.assign({ x, y, w, h, fill: { color: fill }, line: { type: 'none' }, rectRadius: 0.06 }, extra || {}));
}
function rect(s, x, y, w, h, fill, extra) {
  s.addShape(pres.shapes.RECTANGLE, Object.assign({ x, y, w, h, fill: { color: fill }, line: { type: 'none' } }, extra || {}));
}
function hline(s, x, y, w, color, width, dash) {
  s.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color: color || C.rule, width: width || 0.75, dashType: dash || 'solid' } });
}
function vline(s, x, y, h, color, width, dash) {
  s.addShape(pres.shapes.LINE, { x, y, w: 0, h, line: { color: color || C.rule, width: width || 0.75, dashType: dash || 'solid' } });
}
function tracker(s, num, label) {
  const pageNo = /^\d+$/.test(num) ? String(parseInt(num, 10)) : num;
  T(s, pageNo, { x: 12.08, y: 6.93, w: 0.7, h: 0.3, align: 'right', color: C.muted, fontSize: 12 });
  T(s, [{ text: num + '   ', options: { color: C.purple } }, { text: label.toUpperCase(), options: { color: C.purple } }],
    { x: X0, y: 0.3, w: 9, h: 0.26, fontFace: FH, fontSize: 12, charSpacing: 1 });
}
function title(s, text) { s.addText(text, { placeholder: 'title' }); }
function soWhat(s, text) {
  box(s, X0, SO_Y, CW, SO_H, C.purpleSoft);
  T(s, [{ text: 'So what   ', options: { fontFace: FH, color: C.purple } }, { text, options: { color: C.ink } }],
    { x: X0 + 0.2, y: SO_Y, w: CW - 0.4, h: SO_H, valign: 'middle', fontSize: 13 });
}
function source(s, text) { T(s, text, { x: X0, y: SRC_Y, w: 11.45, h: SRC_H, color: C.muted, fontSize: 12 }); }
function head(s, text, x, y, w, h, size) { T(s, text, { x, y, w, h, fontFace: FH, fontSize: size || 14, color: C.ink }); }
function kicker(s, text, x, y, w) { T(s, text.toUpperCase(), { x, y, w, h: 0.24, fontFace: FH, fontSize: 12, color: C.purple, charSpacing: 1 }); }
function bullets(items, color) {
  const out = [];
  items.forEach((it, i) => {
    const runs = Array.isArray(it) ? it : [{ text: it }];
    runs.forEach((r, j) => {
      const o = Object.assign({}, r.options || {});
      if (j === 0) { o.bullet = { indent: 12 }; o.paraSpaceAfter = 5; }
      if (j === runs.length - 1 && i < items.length - 1) o.breakLine = true;
      if (color && !o.color) o.color = color;
      out.push({ text: r.text, options: o });
    });
  });
  return out;
}
function notes(s, text) { s.addNotes(text); }

const SECTIONS = ['The answer', 'Diagnosis and target', 'The plan', 'Proof and money', 'Appendix'];
SECTIONS.forEach((t) => pres.addSection({ title: t }));
// keep "Rs" with its number, and a number with "crore"/"lakh", on one line
function nbText(t) { return t.replace(/Rs (?=[\d~])/g, 'Rs ').replace(/(\d) (crore|lakh)/g, '$1 $2'); }
function nbAny(x) {
  if (typeof x === 'string') return nbText(x);
  if (Array.isArray(x)) return x.map((r) => (r && typeof r.text === 'string' ? Object.assign({}, r, { text: nbText(r.text) }) : r));
  return x;
}
function wrapSlide(s) {
  const oT = s.addText.bind(s), oTb = s.addTable.bind(s);
  s.addText = (t, o) => oT(nbAny(t), o);
  s.addTable = (rows, o) => oTb(rows.map((row) => row.map((c) => (typeof c === 'string' ? nbText(c) : (c && typeof c.text === 'string' ? Object.assign({}, c, { text: nbText(c.text) }) : c)))), o);
  return s;
}
function newSlide(section) { return wrapSlide(pres.addSlide({ masterName: 'CONTENT', sectionTitle: section })); }

// ============ COVER ============
{
  const s = pres.addSlide({ masterName: 'COVER', sectionTitle: 'The answer' });
  // tyre drawn natively: tread lugs, sidewall, rim, hub
  const cx = 10.25, cy = 3.75;
  const nLugs = 34;
  for (let i = 0; i < nLugs; i++) {
    const a = (i / nLugs) * 2 * Math.PI;
    const r = 2.18;
    const w = 0.46, h = 0.17;
    const x = cx + r * Math.cos(a) - w / 2, y = cy + r * Math.sin(a) - h / 2;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: '3B2C5E' }, line: { type: 'none' }, rotate: (a * 180) / Math.PI + 28 });
  }
  s.addShape(pres.shapes.OVAL, { x: cx - 2.05, y: cy - 2.05, w: 4.1, h: 4.1, fill: { color: '2C2148' }, line: { type: 'none' } });
  s.addShape(pres.shapes.OVAL, { x: cx - 1.45, y: cy - 1.45, w: 2.9, h: 2.9, fill: { color: C.dark }, line: { type: 'none' } });
  s.addShape(pres.shapes.OVAL, { x: cx - 1.22, y: cy - 1.22, w: 2.44, h: 2.44, fill: { color: '6A3FA3' }, line: { type: 'none' } });
  s.addShape(pres.shapes.OVAL, { x: cx - 0.92, y: cy - 0.92, w: 1.84, h: 1.84, fill: { color: '4A2E7E' }, line: { type: 'none' } });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 2 * Math.PI;
    s.addShape(pres.shapes.OVAL, { x: cx + 0.6 * Math.cos(a) - 0.09, y: cy + 0.6 * Math.sin(a) - 0.09, w: 0.18, h: 0.18, fill: { color: C.dark }, line: { type: 'none' } });
  }
  s.addShape(pres.shapes.OVAL, { x: cx - 0.3, y: cy - 0.3, w: 0.6, h: 0.6, fill: { color: 'F2B33D' }, line: { type: 'none' } });

  T(s, 'APOLLO TYRES  ×  ACC CASE COMPETITION, ROUND 3', { x: 0.75, y: 1.2, w: 7.2, h: 0.3, fontFace: FH, fontSize: 13, color: 'F2B33D', charSpacing: 1.5 });
  T(s, 'Win the first replacement', { x: 0.75, y: 1.75, w: 7.0, h: 1.9, fontFace: FH, fontSize: 48, color: C.white, valign: 'top' });
  T(s, 'How Apollo Tyres can turn the Team India jersey into tractor-tyre sales in rural India, affordably and measurably',
    { x: 0.75, y: 3.85, w: 6.6, h: 1.0, fontSize: 18, color: C.darkText });
  T(s, 'A proposal in twelve slides, with an appendix   ·   November 2026', { x: 0.75, y: 6.35, w: 7.0, h: 0.3, fontSize: 13, color: C.darkMuted });
  notes(s, 'Title slide. No team names, per the brief. The deck follows the re-analysis (McKinsey_Lens M00 to M10).');
}

// ============ 1. EXECUTIVE SUMMARY ============
{
  const s = newSlide('The answer');
  tracker(s, '01', 'The answer');
  title(s, 'Apollo should win the first tyre replacement with a guaranteed tyre life and a paid dealer and mechanic, using the jersey as its mark of trust');
  const cols = [
    { n: '1', h: 'The prize is real, and Apollo is under-weight in it', b: [
      'Apollo is fitted at the factory, but holds only about 9%* of tractor-tyre replacement against about 20% in car tyres',
      'Each point of replacement share is worth about Rs 33 crore of revenue a year',
      'Fourteen months in, the jersey has not moved searches: Apollo 14.0% to 14.8%, MRF steady at 47%'] },
    { n: '2', h: "Owners buy tyre life on a trusted person's word", b: [
      "A stated number of hours, guaranteed, with the claim paid at the dealer within seven days, at today's price",
      'Rs 300 to the mechanic and Rs 400 to the dealer for each extra rear tyre, plus harvest-timed credit',
      "\"Team India's sponsor\" at the counter; match tickets and team shirts as rewards for the trade"] },
    { n: '3', h: 'It pays at one point of share, and a test sizes the rest', b: [
      'The national offer costs about Rs 7 crore a year and pays for itself at one point of share',
      'Field teams must add about five points in a dense tehsil to pay, and cricket events three more',
      'A four-arm test in 30 districts from 21 January 2027 decides both, at gates in August 2027 and January 2028'] },
  ];
  const cw = (CW - 0.5) / 3;
  cols.forEach((c, i) => {
    const x = X0 + i * (cw + 0.25), y = BODY_Y;
    box(s, x, y, cw, 3.02, C.panel2);
    s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.2, w: 0.42, h: 0.42, fill: { color: C.purple }, line: { type: 'none' } });
    T(s, c.n, { x: x + 0.2, y: y + 0.2, w: 0.42, h: 0.42, align: 'center', valign: 'middle', fontFace: FH, fontSize: 14, color: C.white });
    head(s, c.h, x + 0.78, y + 0.16, cw - 0.95, 0.56, 14);
    T(s, bullets(c.b), { x: x + 0.2, y: y + 0.86, w: cw - 0.38, h: 2.06, fontSize: 12, color: C.body });
  });
  // numbers strip
  const stats = [
    ['Rs 11 crore', 'to March 2028, released in tranches at gates'],
    ['1 point', 'of national share pays for the offer'],
    ['Rs 82 crore', 'extra revenue in FY29, base case*'],
    ['~12.5%', 'replacement share at March 2029, from ~9%*'],
    ['Rs 10 crore', 'most that can be lost, as gates stop what fails'],
  ];
  const sy = 4.86, sw = CW / 5;
  box(s, X0, sy, CW, 1.08, C.panel);
  stats.forEach((st, i) => {
    const x = X0 + i * sw;
    if (i > 0) vline(s, x, sy + 0.18, 0.72, C.purpleTint, 1);
    T(s, st[0], { x: x + 0.2, y: sy + 0.1, w: sw - 0.3, h: 0.42, fontFace: FH, fontSize: 22, color: C.purple });
    T(s, st[1], { x: x + 0.2, y: sy + 0.53, w: sw - 0.25, h: 0.48, fontSize: 12, color: C.sec });
  });
  soWhat(s, "Farm borrows the jersey's standing and pays only to use it: the guarantee and the trade do the selling, and cricket is the mark of trust.");
  source(s, 'Sources: team analysis; CRISIL in the Tolins Tyres prospectus (Aug 2024); Motilal Oswal note of a meeting with Apollo management (27 Dec 2025); Google Trends, eight states. * Computed on one broker note or on planning assumptions; the share gains are assumptions, not forecasts.');
  notes(s, 'The answer before the evidence. Governing thought: Apollo is fitted at the factory and lost at the first replacement. Win that replacement with a guaranteed tyre life and a paid dealer and mechanic; use the jersey as the mark of trust. About Rs 11 crore to March 2028; pays at one point of share; proved before the sponsorship comes up for renewal.');
}

// ============ 2. DIAGNOSIS ============
{
  const s = newSlide('Diagnosis and target');
  tracker(s, '02', 'Diagnosis');
  title(s, "Apollo's tractor tyres are fitted at the factory and lost at the first replacement, where each point of share is worth about Rs 33 crore a year");
  const py = BODY_Y, ph = 4.25;
  const pA = { x: X0, w: 3.85 }, pB = { x: X0 + 4.1, w: 3.85 }, pC = { x: X0 + 8.2, w: 4.03 };
  [pA, pB, pC].forEach((p) => box(s, p.x, py, p.w, ph, C.panel2));

  // A: fitted
  kicker(s, '1  Fitted', pA.x + 0.2, py + 0.18, 3);
  head(s, 'Apollo sells mostly to tractor makers, unlike the industry', pA.x + 0.2, py + 0.46, pA.w - 0.4, 0.62, 14);
  const bw = pA.w - 0.4;
  const barsA = [
    { lab: 'Industry: domestic tractor tyres, FY24', rep: 51 },
    { lab: "Apollo's farm sales, exports included*", rep: 25 },
  ];
  barsA.forEach((b, i) => {
    const y = py + 1.32 + i * 0.95;
    T(s, b.lab, { x: pA.x + 0.2, y, w: bw, h: 0.24, color: C.ink });
    const wR = (bw * b.rep) / 100;
    rect(s, pA.x + 0.2, y + 0.3, wR - 0.02, 0.42, C.purple);
    rect(s, pA.x + 0.2 + wR, y + 0.3, bw - wR, 0.42, C.grey);
    T(s, (i === 1 ? '~' : '') + b.rep + '%', { x: pA.x + 0.2, y: y + 0.3, w: wR - 0.02, h: 0.42, align: 'center', valign: 'middle', fontFace: FH, color: C.white });
    T(s, (i === 1 ? '~' : '') + (100 - b.rep) + '%', { x: pA.x + 0.2 + wR, y: y + 0.3, w: bw - wR, h: 0.42, align: 'center', valign: 'middle', fontFace: FH, color: C.ink });
  });
  // legend
  const ly = py + 3.06;
  rect(s, pA.x + 0.2, ly + 0.05, 0.16, 0.16, C.purple);
  T(s, 'Replacement', { x: pA.x + 0.44, y: ly, w: 2.8, h: 0.26 });
  rect(s, pA.x + 0.2, ly + 0.31, 0.16, 0.16, C.grey);
  T(s, 'Tractor makers (and export, for Apollo)', { x: pA.x + 0.44, y: ly + 0.26, w: 3.0, h: 0.26 });
  T(s, 'Only 38% of owners chose the tyre brand on their new tractor.', { x: pA.x + 0.2, y: py + 3.66, w: bw, h: 0.5, color: C.sec });

  // B: lost
  kicker(s, '2  Lost', pB.x + 0.2, py + 0.18, 3);
  head(s, "Its share of replacement is less than half its share in car tyres", pB.x + 0.2, py + 0.46, pB.w - 0.4, 0.62, 14);
  const colsB = [{ lab: 'Tractor', v: 9, t: '~9%*', c: C.purple }, { lab: 'Car', v: 20, t: '~20%', c: C.grey }, { lab: 'Truck-bus radial', v: 29, t: '~29%', c: C.grey }];
  const baseB = py + 3.28, maxH = 1.5, cwB = 0.78, gapB = (pB.w - 0.4 - 3 * cwB) / 2;
  colsB.forEach((c, i) => {
    const x = pB.x + 0.2 + i * (cwB + gapB);
    const h = (maxH * c.v) / 29;
    rect(s, x, baseB - h, cwB, h, c.c);
    T(s, c.t, { x: x - 0.2, y: baseB - h - 0.3, w: cwB + 0.4, h: 0.26, align: 'center', fontFace: FH, color: C.ink });
    T(s, c.lab, { x: x - 0.25, y: baseB + 0.06, w: cwB + 0.5, h: 0.26, align: 'center', color: C.ink });
  });
  hline(s, pB.x + 0.2, baseB, pB.w - 0.4, C.muted, 0.75);
  T(s, "Apollo's replacement share, by category", { x: pB.x + 0.2, y: py + 1.18, w: pB.w - 0.4, h: 0.24, color: C.sec });
  T(s, 'Where owners saw uneven wear, only 18% meant to buy that brand again.', { x: pB.x + 0.2, y: py + 3.66, w: pB.w - 0.4, h: 0.5, color: C.sec });

  // C: worth
  kicker(s, '3  Worth', pC.x + 0.2, py + 0.18, 3);
  head(s, 'Closing half the gap to its car-tyre share adds about Rs 200 crore a year*', pC.x + 0.2, py + 0.46, pC.w - 0.4, 0.62, 14);
  const rowsC = [
    { lab: 'Replacement share to 12%', v: 100 },
    { lab: 'To 15%: half the gap to car tyres', v: 200 },
    { lab: 'To 20%: its car-tyre share', v: 360 },
  ];
  const maxW = 2.4;
  rowsC.forEach((r, i) => {
    const y = py + 1.22 + i * 0.72;
    T(s, r.lab, { x: pC.x + 0.2, y, w: pC.w - 0.4, h: 0.24, color: C.ink });
    const w = (maxW * r.v) / 360;
    rect(s, pC.x + 0.2, y + 0.29, w, 0.3, C.purple);
    T(s, '+Rs ' + r.v + ' crore', { x: pC.x + 0.28 + w, y: y + 0.29, w: 1.3, h: 0.3, valign: 'middle', fontFace: FH, color: C.ink });
  });
  T(s, 'Extra revenue a year against ~9% today', { x: pC.x + 0.2, y: py + 3.36, w: pC.w - 0.4, h: 0.24, color: C.sec });
  T(s, 'Market about Rs 3,300 crore (2,500 to 4,000)*. Each point: Rs 33 crore of revenue, about Rs 10 crore of contribution.',
    { x: pC.x + 0.2, y: py + 3.6, w: pC.w - 0.4, h: 0.62, color: C.sec });

  soWhat(s, 'The problem is winning back owners at the first replacement, not awareness on new tractors. Apollo can confirm the 25% and the 9% from its own books in a week.');
  source(s, 'Sources: CRISIL in the Tolins Tyres prospectus (Aug 2024); Motilal Oswal note of a meeting with Apollo management (27 Dec 2025); Apollo FY26 annual report; broker notes (car, truck shares); J.D. Power 2018 India tractor tyre study. * Rests on one broker note, or on planning assumptions.');
  notes(s, 'Say plainly that the 9% rests on one broker note of a management meeting (about 25% of Apollo farm sales are replacement, against 51% for the industry). Apollo can confirm it from its own books in a week. This is the fact the whole case turns on. If Apollo is much higher than 9%, the prize is smaller and the plan shrinks to the offer alone.');
}

// ============ 3. THE JERSEY ============
{
  const s = newSlide('Diagnosis and target');
  tracker(s, '03', 'Why recall is weak');
  title(s, 'The jersey has not moved tractor-tyre demand in fourteen months, and cricket already belongs to MRF, CEAT and BKT');
  const pL = { x: X0, w: 6.05 }, pR = { x: X0 + 6.3, w: 5.93 }, py = BODY_Y, ph = 4.25;
  box(s, pL.x, py, pL.w, ph, C.panel2);
  box(s, pR.x, py, pR.w, ph, C.panel2);

  head(s, 'Apollo barely moved; CEAT gained more without a jersey', pL.x + 0.2, py + 0.18, pL.w - 0.4, 0.3, 14);
  T(s, "Share of five brands' tractor-tyre searches after the jersey, % (change in points against the year before)", { x: pL.x + 0.2, y: py + 0.52, w: pL.w - 0.4, h: 0.45, color: C.sec });
  s.addChart(pres.charts.BAR, [{ name: 'After the jersey', labels: ['MRF  (0.0)', 'BKT  (+0.1)', 'Apollo  (+0.8)', 'CEAT  (+1.9)', 'Goodyear  (−2.8)'], values: [47.3, 19.6, 14.8, 10.8, 7.6] }], {
    x: pL.x + 0.1, y: py + 0.98, w: pL.w - 0.3, h: 2.5, barDir: 'bar', catAxisOrientation: 'maxMin',
    chartColors: [C.grey, C.grey, C.purple, C.grey, C.grey], barGapWidthPct: 45,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0.0"%"', dataLabelFontSize: 12, dataLabelFontFace: FB, dataLabelColor: C.ink,
    catAxisLabelFontSize: 12, catAxisLabelFontFace: FB, catAxisLabelColor: C.ink, catAxisLineShow: false,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 56, valGridLine: { style: 'none' }, showLegend: false,
  });
  T(s, 'By state, Apollo rose in Haryana (10 to 15) and fell in Maharashtra (18 to 14); in Punjab and Uttar Pradesh it barely moved.', { x: pL.x + 0.2, y: py + 3.55, w: pL.w - 0.4, h: 0.5, color: C.sec });

  head(s, 'Rival tyre brands have held cricket for decades', pR.x + 0.2, py + 0.18, pR.w - 0.4, 0.3, 14);
  const tl = [
    ['1987', 'MRF founds its pace-bowling academy'],
    ['1995', 'CEAT starts its cricket ratings and awards'],
    ['2014', "MRF on Kohli's bat (Tendulkar's before him)"],
    ['2015', 'CEAT takes the IPL strategic time-out'],
    ['2020', "BKT's IPL deals begin: 8 of 10 teams by 2026"],
    ['2025', 'Gill moves his bat deal from CEAT to MRF'],
    ['Sep 2025', 'Apollo becomes lead sponsor of Team India'],
  ];
  const ty0 = py + 0.66, tp = 0.4, lx = pR.x + 1.25;
  vline(s, lx, ty0 + 0.12, tp * (tl.length - 1), C.purpleTint, 1.5);
  tl.forEach((r, i) => {
    const y = ty0 + i * tp;
    const last = i === tl.length - 1;
    s.addShape(pres.shapes.OVAL, { x: lx - 0.07, y: y + 0.05, w: 0.14, h: 0.14, fill: { color: last ? C.purple : C.grey }, line: { type: 'none' } });
    T(s, r[0], { x: pR.x + 0.2, y, w: 0.9, h: 0.26, fontFace: FH, color: last ? C.purple : C.ink, align: 'right' });
    T(s, r[1], { x: lx + 0.2, y, w: pR.w - 1.65, h: 0.26, fontFace: last ? FH : FB, color: last ? C.purple : C.body });
  });
  T(s, [
    { text: 'Reach is thinnest where owners are most numerous: ', options: { fontFace: FH, color: C.ink } },
    { text: 'in Uttar Pradesh 42% of men watch TV weekly. Apollo\'s 2025-26 "Champions offer" of tickets and team shirts covered car and motorcycle tyres only.' },
  ], { x: pR.x + 0.2, y: py + 3.5, w: pR.w - 0.4, h: 0.68, color: C.sec });

  soWhat(s, 'More cricket exposure is not the answer for farm. Attach the name where no rival can claim it: at the counter, on the guarantee card and on the tyre.');
  source(s, 'Sources: Google Trends, tractor-tyre searches for five brands in eight states, 1 Sep 2024 to 5 Nov 2026 (team count; online owners only; a signal, not a survey); MRF, CEAT, BKT and BCCI announcements; NFHS-5 state reports (2019-21); Apollo "Champions offer" terms.');
  notes(s, 'Label the search data as an outside-in signal among owners who use the internet. Do not claim the jersey failed; say no effect is visible in farm. MRF is searched about three times as often as Apollo: that is the gap in the owner\'s first thought.');
}

// ============ 4. CUSTOMER ============
{
  const s = newSlide('Diagnosis and target');
  tracker(s, '04', 'Target customer and journey');
  title(s, 'Owners buy on tyre life and on the word of a dealer or mechanic, and four in ten owners make about two-thirds of purchases');
  const pL = { x: X0, w: 3.95 }, pR = { x: X0 + 4.2, w: 8.03 }, py = BODY_Y, ph = 4.25;
  box(s, pL.x, py, pL.w, ph, C.panel2);
  box(s, pR.x, py, pR.w, ph, C.panel2);

  head(s, 'Heavy users carry the purchases*', pL.x + 0.2, py + 0.18, pL.w - 0.4, 0.3, 14);
  s.addChart(pres.charts.BAR, [
    { name: 'Share of owners', labels: ['Heavy users', 'Light users', 'Second-hand'], values: [40, 30, 30] },
    { name: 'Share of tyre purchases', labels: ['Heavy users', 'Light users', 'Second-hand'], values: [65, 25, 10] },
  ], {
    x: pL.x + 0.05, y: py + 0.5, w: pL.w - 0.1, h: 1.9, barDir: 'col', barGrouping: 'clustered', barGapWidthPct: 55,
    chartColors: [C.grey, C.purple], showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '0"%"', dataLabelFontSize: 12, dataLabelFontFace: FB, dataLabelColor: C.ink,
    catAxisLabelFontSize: 12, catAxisLabelFontFace: FB, catAxisLabelColor: C.ink, catAxisLineShow: true, catAxisLineColor: C.grey,
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 80, valGridLine: { style: 'none' },
    showLegend: true, legendPos: 't', legendFontSize: 12, legendFontFace: FB, legendColor: C.body,
  });
  T(s, bullets([
    [{ text: 'Target 1: ', options: { fontFace: FH, color: C.ink } }, { text: 'heavy users, 600 to 1,000 hours a year, who plan purchases' }],
    [{ text: 'Target 2: ', options: { fontFace: FH, color: C.ink } }, { text: 'owners of tractors that left the factory on Apollo tyres' }],
    [{ text: 'Advisers: ', options: { fontFace: FH, color: C.ink } }, { text: 'the dealer and the mechanic' }],
    [{ text: 'Not targeted: ', options: { fontFace: FH, color: C.ink } }, { text: 'small second-hand owners who buy on price' }],
  ]), { x: pL.x + 0.2, y: py + 2.45, w: pL.w - 0.35, h: 1.75, color: C.body });

  head(s, 'Where Apollo drops out of the purchase, and what the plan changes', pR.x + 0.2, py + 0.18, pR.w - 0.4, 0.3, 14);
  const labW = 1.05, gx = 0.07;
  const colW = (pR.w - 0.4 - labW - 4 * gx) / 4;
  const stages = ['In mind', 'Advice', 'At the counter', 'After purchase'];
  const x0 = pR.x + 0.2 + labW + gx;
  const sy = py + 0.56;
  stages.forEach((st, i) => {
    const x = x0 + i * (colW + gx);
    s.addText(st, { shape: pres.shapes.CHEVRON, x, y: sy, w: colW + 0.05, h: 0.36, fill: { color: C.ink }, line: { type: 'none' }, fontFace: FH, fontSize: 12, color: C.white, align: 'center', valign: 'middle', margin: 0 });
  });
  const rows = [
    { lab: 'Planned', sub: 'heavy users', h: 0.78, fill: C.white, color: C.body, cells: ['Tyre on the tractor, MRF, what the shop stocks', 'Other owners, the mechanic, market videos', 'Price per pair, guarantee years, credit', 'Hours achieved; claim honoured or not'] },
    { lab: 'Urgent', sub: 'a tyre fails', h: 0.6, fill: C.white, color: C.body, cells: ['A cut, burst or bald tyre in season', 'Mechanic: repair, retread or replace', 'Nearest shop with stock', 'The same test of tyre and claim'] },
    { lab: 'Apollo today', sub: '', h: 0.92, fill: C.greyTint, color: C.body, cells: ["Fitted, but 14% of searches against MRF's 47%", 'No mechanic programme; praise rarely gives a reason', 'No farm offer at the counter', 'No buyer record; refused claims top complaints'] },
    { lab: 'The plan', sub: '', h: 0.92, fill: C.purpleSoft, color: C.ink, cells: ["Sponsor's mark; camps find Apollo-fitted tractors", 'Rs 300 to the mechanic for each rear tyre referred', 'Hours guarantee, Rs 400 dealer bonus, harvest credit', 'Claim paid in seven days; buyer kept on record'] },
  ];
  let ry = sy + 0.44;
  rows.forEach((r) => {
    T(s, r.sub ? [{ text: r.lab, options: { fontFace: FH, color: C.ink, breakLine: true } }, { text: r.sub, options: { color: C.sec } }] : [{ text: r.lab, options: { fontFace: FH, color: r.lab === 'The plan' ? C.purple : C.ink } }],
      { x: pR.x + 0.2, y: ry + 0.06, w: labW, h: r.h - 0.1 });
    r.cells.forEach((c, i) => {
      const x = x0 + i * (colW + gx);
      box(s, x, ry, colW, r.h - 0.06, r.fill);
      T(s, c, { x: x + 0.08, y: ry + 0.05, w: colW - 0.14, h: r.h - 0.14, color: r.color });
    });
    ry += r.h;
  });
  soWhat(s, 'Aim at heavy users and at the advisers, and make tyre life a promise that is paid at the counter.');
  source(s, 'Sources: Kaur (2024), survey of 520 households in the Punjab cotton belt, 2016-17 (* segment sizes indicative); J.D. Power 2018; 131 coded brand comments under 30 Hindi and Punjabi videos (team count; not a survey); McKinsey consumer decision journey (2009), adapted.');
  notes(s, 'Say that the segment sizes come from one survey of four Punjab districts in 2016-17. The first replacement is where a brand is actually chosen: only 38% of owners chose the tyre on their new tractor. Owners argue about two things: how long the tyre lasted, and whether the claim was honoured.');
}

// ============ 5. THE OFFER ============
{
  const s = newSlide('The plan');
  tracker(s, '05', 'From recall to sales: the offer');
  title(s, 'Guarantee the hours and pay the dealer and mechanic for each extra tyre: the offer costs Rs 1,255 and still leaves about Rs 3,000 a tyre');
  const pL = { x: X0, w: 5.3 }, pR = { x: X0 + 5.55, w: 6.68 }, py = BODY_Y, ph = 4.25;
  box(s, pL.x, py, pL.w, ph, C.panel2);
  box(s, pR.x, py, pR.w, ph, C.panel2);

  head(s, [{ text: 'The Lambi Paari guarantee*  ' }, { text: '("the long innings")', options: { fontFace: FB, color: C.sec, fontSize: 12 } }], pL.x + 0.2, py + 0.18, pL.w - 0.4, 0.3, 14);
  const terms = [
    ['Promise', "A stated number of hours on rear Virat tyres, set from Apollo's own wear data"],
    ['Shortfall', 'Credit for the unused hours toward a new Apollo tyre'],
    ['Settlement', 'At the home-ground dealer, within seven days'],
    ['Conditions', 'Registered with an hour-meter photo; pressure checked each season; cuts and quarry haulage excluded'],
    ['Price', 'Unchanged: Apollo already lists 6 to 10% below MRF'],
    ['Value', 'At an equal 2,000 hours: Apollo Rs 8.00 an hour, MRF Rs 8.84'],
    ['Precedent', 'Trelleborg launched an hours guarantee in Europe in February 2026; none exists in India'],
  ];
  const heights = [0.5, 0.5, 0.5, 0.68, 0.5, 0.5, 0.5];
  let ty = py + 0.56;
  terms.forEach((t, i) => {
    T(s, t[0], { x: pL.x + 0.2, y: ty, w: 1.25, h: heights[i] - 0.04, fontFace: FH, color: C.purple });
    T(s, t[1], { x: pL.x + 1.5, y: ty, w: pL.w - 1.7, h: heights[i] - 0.04, color: C.body });
    ty += heights[i];
    if (i < terms.length - 1) hline(s, pL.x + 0.2, ty - 0.05, pL.w - 0.4, C.rule, 0.5);
  });

  head(s, 'What one extra rear tyre leaves Apollo, Rs*', pR.x + 0.2, py + 0.12, pR.w - 0.4, 0.3, 14);
  const steps = [
    { lab: 'Retail price with GST', top: 16400, bot: 0, val: '16,400', c: '8A8EA0', tc: C.white },
    { lab: 'GST', top: 16400, bot: 15620, val: '−780', c: C.grey },
    { lab: 'Dealer margin', top: 15620, bot: 14200, val: '−1,420', c: C.grey },
    { lab: 'The offer', top: 14200, bot: 12945, val: '−1,255', c: C.amberMark },
    { lab: 'Materials, variable cost', top: 12945, bot: 3005, val: '−9,940', c: C.grey },
    { lab: 'Left for Apollo', top: 3005, bot: 0, val: '3,005', c: C.purple },
  ];
  const base = py + 3.1, scale = 2.3 / 16400, bwid = 0.74, pitch = (pR.w - 0.4 - bwid) / 5;
  steps.forEach((st, i) => {
    const x = pR.x + 0.2 + i * pitch;
    const yTop = base - st.top * scale, h = (st.top - st.bot) * scale;
    rect(s, x, yTop, bwid, h, st.c);
    T(s, st.val, { x: x - 0.25, y: yTop - 0.27, w: bwid + 0.5, h: 0.25, align: 'center', fontFace: FH, color: C.ink });
    T(s, st.lab, { x: x - 0.2, y: base + 0.06, w: bwid + 0.4, h: 0.44, align: 'center', color: C.ink });
    if (i < steps.length - 1) {
      const nxt = steps[i + 1];
      const yc = base - (i === 0 ? st.top : st.bot) * scale;
      hline(s, x + bwid, yc, pitch - bwid, C.muted, 0.5, 'dash');
    }
  });
  hline(s, pR.x + 0.2, base, pR.w - 0.4, C.muted, 0.75);
  box(s, pR.x + 0.2, py + 3.62, pR.w - 0.4, 0.5, C.amberTint);
  T(s, [{ text: 'The offer per rear tyre: ', options: { fontFace: FH, color: C.ink } }, { text: 'mechanic Rs 300, dealer Rs 400, credit Rs 225, guarantee reserve Rs 280, registration Rs 50 (about 9% of price)' }],
    { x: pR.x + 0.32, y: py + 3.62, w: pR.w - 0.64, h: 0.5, valign: 'middle', color: C.body });

  soWhat(s, 'The offer is funded and needs no price cut: it costs money mainly when an extra tyre is sold, and every buyer is registered.');
  source(s, "Sources: tractor-portal prices for 13.6-28 rear tyres (viewed 6 Nov 2026); Trelleborg guarantee terms (25 Feb 2026). * Planning assumptions: 10% dealer margin; variable cost 70% of Apollo's invoice; 5% of guaranteed tyres claim at a 25% credit, so 2% is reserved.");
  notes(s, 'The hours figure on the guarantee is Apollo\'s to set from its wear data. Show 2,000 hours only as an illustration. Credit can be spent only on another Apollo tyre, so its cash cost is lower than its face value and it keeps the customer. A tyre sold without the programme leaves about Rs 4,260; a programme tyre about Rs 3,005.');
}

// ============ 6. FORMATS AND PROPERTIES ============
{
  const s = newSlide('The plan');
  tracker(s, '06', 'Formats and properties');
  title(s, 'Use the jersey where it cannot be mistaken: as the trust mark at the counter and as rewards for the trade');
  const verdictStyle = {
    Back: { fill: C.purple, color: C.white, face: FH },
    Test: { fill: C.amberTint, color: C.ink, face: FH },
    Drop: { fill: C.greyTint, color: C.sec, face: FB },
    Keep: { fill: C.white, color: C.ink, face: FB },
  };
  const data = [
    ['Logo on the shirt, on television', 'Owners who watch', 'Low', 'Sunk', 'Keep'],
    ["Sponsor's mark on boards, cards and tyres", 'Every buyer', 'High', 'Low', 'Back'],
    ['Tickets and team shirts for the trade', 'Dealers, mechanics', 'High', 'Low', 'Back'],
    ['Tractor makers hosted at home Tests', 'Few, high value', 'Medium', 'Low', 'Back'],
    ['Hindi and Punjabi videos on tyre life', 'Owners online', 'Medium', 'Low', 'Back'],
    ['Match screenings at dealers', 'Local', 'Unknown', 'Low', 'Test'],
    ['One existing village tournament a tehsil', 'Local, seasonal', 'Unknown', 'Medium', 'Test'],
    ['New Apollo tournaments with finals days', 'Local', 'Unknown', 'High', 'Drop'],
    ['Farm film on television during cricket', 'Owners who watch', 'Low', 'High', 'Drop'],
    ['Player appearances for farm', 'Few', 'Low', 'High', 'Drop'],
    ['IPL team deals', 'Wide, crowded', 'Low', 'High', 'Drop'],
  ];
  const hdr = ['Cricket activity', 'Reaches', 'Link to sales', 'Cost', 'Verdict'].map((t) => ({ text: t, options: { fontFace: FH, color: C.ink, fill: { color: C.panel }, border: [{ type: 'none' }, { type: 'none' }, { pt: 1, color: C.muted }, { type: 'none' }] } }));
  const rows = [hdr].concat(data.map((r) => r.map((cell, j) => {
    const o = { color: C.body, border: [{ type: 'none' }, { type: 'none' }, { pt: 0.5, color: C.rule }, { type: 'none' }] };
    if (j === 0) o.color = C.ink;
    if (j === 4) { const v = verdictStyle[cell]; o.fill = { color: v.fill }; o.color = v.color; o.fontFace = v.face; o.align = 'center'; }
    return { text: cell, options: o };
  })));
  s.addTable(rows, { x: X0, y: BODY_Y, w: 8.5, colW: [3.95, 1.75, 1.05, 0.9, 0.85], rowH: 0.345, fontFace: FB, fontSize: 12, valign: 'middle', margin: [1, 6, 1, 6] });

  const px = X0 + 8.75, pw = CW - 8.75;
  box(s, px, BODY_Y, pw, 4.25, C.panel);
  const blocks = [
    ['What only the sponsor has', 'Standing at the counter, and rewards the trade cannot buy elsewhere.'],
    ['Proof the rewards can be used', 'Apollo\'s 2025-26 "Champions offer" gave match tickets, player meetings or fan shirts to buyers of car and motorcycle tyres. Farm was left out.'],
    ['Ask at the 2028 renewal', "A trade allocation of tickets and shirts; the team's marks at the shop and on the tyre; regional-language content."],
    ['Renewal test for farm', "Cricket must add about two points of share beyond the offer: farm's Rs 14 crore share of the fee against Rs 7.4 crore a point."],
  ];
  const bh = [0.74, 1.12, 1.08, 1.12];
  let by = BODY_Y + 0.16;
  blocks.forEach((b, i) => {
    T(s, b[0], { x: px + 0.2, y: by, w: pw - 0.4, h: 0.26, fontFace: FH, color: C.purple });
    T(s, b[1], { x: px + 0.2, y: by + 0.27, w: pw - 0.4, h: bh[i] - 0.3, color: C.body });
    by += bh[i];
  });
  soWhat(s, 'Back the cheap uses that only the sponsor has, test match days and village tournaments, and drop finals days, films, appearances and IPL deals.');
  source(s, "Sources: team scoring on public evidence, using the five measures in McKinsey, \"Is sports sponsorship worth it?\" (2014); Apollo \"Champions offer\" terms (7 Dec 2025 to 31 Mar 2026); NFHS-5; fee of Rs 579 crore as reported by the press, farm's share at 6% of Indian revenue.");
  notes(s, "The team's marks at the shop and the use of tickets need the contract's confirmation. Apollo's own 2025-26 promotion for car and motorcycle tyres is the evidence that rewards are possible. Reward split to test: half the cricket-arm advisers are offered cash of equal value, so we learn whether a ticket moves a dealer more than money.");
}

// ============ 7. WHERE TO PLAY (tile map) ============
{
  const s = newSlide('The plan');
  tracker(s, '07', 'Focus geographies');
  title(s, 'The prize is spread across India, so the offer goes national, and field teams go only to dense tehsils in 30 first-wave districts');
  const G = { cotton: { fill: C.purple, color: C.white }, haryana: { fill: C.purpleTint, color: C.ink }, up: { fill: C.teal, color: C.white }, rjmp: { fill: C.amber, color: C.white }, ref: { fill: C.greyTint, color: C.sec } };
  const tiles = [
    // [name, col, row, group]
    ['Fazilka', 1, 0, 'cotton'], ['Muktsar', 2, 0, 'cotton'], ['Barnala', 4, 0, 'cotton'],
    ['Ganganagar', 1, 1, 'cotton'], ['Bathinda', 3, 1, 'cotton'], ['Mansa', 4, 1, 'cotton'], ['Sangrur', 5, 1, 'cotton'],
    ['Hanumangarh', 2, 2, 'cotton'], ['Sirsa', 3, 2, 'cotton'], ['Fatehabad', 4, 2, 'cotton'], ['Karnal', 7, 2, 'haryana'],
    ['Hisar', 5, 3, 'cotton'], ['Jind', 6, 3, 'haryana'], ['Sonipat', 7, 3, 'haryana'],
    ['Bhiwani', 6, 4, 'haryana'], ['Delhi', 7, 4, 'ref'], ['Moradabad', 8, 4, 'up'], ['Rampur', 9, 4, 'up'], ['Pilibhit', 10, 4, 'up'],
    ['Bikaner', 0, 5, 'rjmp'], ['Badaun', 9, 5, 'up'], ['Bareilly', 10, 5, 'up'],
    ['Alwar', 6, 6, 'rjmp'], ['Aligarh', 8, 6, 'up'], ['Shahjahanpur', 10, 6, 'up'],
    ['Jodhpur', 0, 7, 'rjmp'], ['Nagaur', 1, 7, 'rjmp'],
    ['Chittorgarh', 2, 8, 'rjmp'], ['Shivpuri', 8, 8, 'rjmp'],
    ['Raisen', 7, 9, 'rjmp'], ['Vidisha', 8, 9, 'rjmp'],
  ];
  const tw = 1.04, th = 0.36, px = 1.1, py = 0.425, gx0 = X0 + 0.02, gy0 = BODY_Y + 0.02;
  tiles.forEach((t) => {
    const g = G[t[3]];
    const wide = t[0].length >= 11, w = wide ? 1.1 : tw;
    const x = gx0 + t[1] * px - (wide ? 0.03 : 0), y = gy0 + t[2] * py;
    s.addText(t[0], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.05, x, y, w, h: th, fill: { color: g.fill }, line: { type: 'none' }, fontFace: FB, fontSize: 12, color: g.color, align: 'center', valign: 'middle', margin: 0 });
  });
  const stateLab = [['PUNJAB', 0, 0, 1.04], ['RAJASTHAN', 0, 2, 2.1], ['HARYANA', 6, 2, 1.04], ['UTTAR PRADESH', 9, 3, 2.1], ['RAJASTHAN', 0, 6, 2.1], ['MADHYA PRADESH', 9, 9, 2.1]];
  stateLab.forEach((l) => {
    T(s, l[0], { x: gx0 + l[1] * px, y: gy0 + l[2] * py, w: l[3], h: th, valign: 'middle', align: 'left', fontFace: FB, fontSize: 12, color: C.muted, charSpacing: 1 });
  });
  // legend, top right empty area
  const lgx = gx0 + 6 * px, lgy = gy0;
  const leg = [['cotton', 'Cotton belt (11)'], ['up', 'Rohilkhand and western UP (7)'], ['haryana', 'Haryana, official counts (4)'], ['rjmp', 'Rajasthan, Madhya Pradesh (8)']];
  leg.forEach((l, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = lgx + col * 2.7, y = lgy + row * 0.4 + 0.05;
    box(s, x, y + 0.03, 0.26, 0.22, G[l[0]].fill);
    T(s, l[1], { x: x + 0.36, y, w: 2.5, h: 0.28, valign: 'middle', color: C.ink });
  });
  // stats, bottom middle empty area
  const sx = gx0 + 3 * px, sy = gy0 + 6.95 * py, sw = 4.3;
  T(s, [
    { text: '11.5% ', options: { fontFace: FH, fontSize: 20, color: C.purple } },
    { text: 'of new tractor registrations sit in the 20 largest districts', options: { breakLine: true } },
    { text: '5,000+ ', options: { fontFace: FH, fontSize: 20, color: C.purple, paraSpaceBefore: 8 } },
    { text: 'working tractors in a tehsil before a field team is added; at 3,000 it needs 7.9 points to pay' },
  ], { x: sx, y: sy, w: sw, h: 1.38, color: C.body });
  T(s, [{ text: 'Second wave: ', options: { fontFace: FH, color: C.ink } }, { text: 'Gujarat and Maharashtra, which hold the largest districts' }],
    { x: gx0 + 9 * px, y: gy0 + 6.95 * py, w: 2.1, h: 0.82, color: C.body });
  soWhat(s, 'Geography picks where to test and where to add field teams, not where to sell: the guarantee and trade terms run at every Apollo farm-tyre dealer.');
  source(s, 'Schematic tile map: each district placed by its headquarters\' latitude and longitude; not to scale, no boundaries. Sources: tractor portal reports of transport-ministry registrations (FY25); Statistical Abstracts of Haryana (2022-23) and Punjab (2025); NFHS-5; team analysis (first wave is a planning assumption).');
  notes(s, 'By owners, Uttar Pradesh (about 14 lakh tractor-owning rural households), Madhya Pradesh and Rajasthan (about 8 lakh each) come first; by density, Punjab (13.9% of rural households) and Haryana (9.9%). The 30 districts are the test ground (one tehsil per arm per district). The Uttar Pradesh belt rests on two districts with data and five without; say so.');
}

// ============ 8. ACTIVATION PLAN ============
{
  const s = newSlide('The plan');
  tracker(s, '08', 'On-ground activation');
  title(s, 'On the ground, a home-ground dealer, eleven mechanics and two tyre camps a year do the selling, timed to India\'s matches and the buying seasons');
  const cards = [
    { h: "Dealer's counter, in town", who: 'Home-ground dealer, with Apollo rural sales', what: "Sponsor's board; registers each guarantee; settles claims in seven days; Rs 400 per extra rear tyre", p: 'Finance partner for six-month harvest credit' },
    { h: 'Mechanics, in villages', who: 'Eleven enrolled per dealer', what: 'Rs 300 for each rear tyre referred, paid to the phone at registration; one meet a year', p: 'Puncture shops and tractor mechanics' },
    { h: 'Tyre health camps', who: 'Coordinator (one per ten tehsils), with the dealer', what: 'Two a year, before each buying season: pressure and wear checks; finds Apollo-fitted tractors', p: "Tractor makers' dealers, Mahindra first" },
    { h: 'Cricket moments', who: 'Sponsorship team, with BCCI approval', what: 'Match screenings at dealers; one village tournament; tickets and shirts as trade rewards', p: 'Local tournament organisers' },
    { h: 'Digital and media', who: 'Farm marketing team', what: 'Short Hindi and Punjabi videos on tyre life before each season; messages to registered buyers; no farm TV', p: 'Agricultural university tyre-life trial' },
  ];
  const cw = (CW - 4 * 0.14) / 5, ch = 2.32;
  cards.forEach((c, i) => {
    const x = X0 + i * (cw + 0.14), y = BODY_Y;
    box(s, x, y, cw, ch, C.panel2);
    head(s, c.h, x + 0.14, y + 0.12, cw - 0.28, 0.28, 13);
    T(s, [
      { text: 'Who: ', options: { fontFace: FH, color: C.purple } }, { text: c.who, options: { breakLine: true } },
      { text: c.what, options: { breakLine: true, paraSpaceBefore: 5 } },
      { text: 'Partner: ', options: { fontFace: FH, color: C.purple, paraSpaceBefore: 5 } }, { text: c.p },
    ], { x: x + 0.14, y: y + 0.46, w: cw - 0.26, h: ch - 0.54, color: C.body });
  });
  // calendar
  const calY = BODY_Y + ch + 0.08, labW = 1.85, gx = X0 + labW, gw = CW - labW, nM = 15, mw = gw / nM;
  const months = ['Jan 27', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 28', 'Feb', 'Mar'];
  months.forEach((m, i) => {
    T(s, m, { x: gx + i * mw, y: calY, w: mw, h: 0.24, align: 'center', color: i === 0 || i === 12 ? C.ink : C.sec, fontFace: i === 0 || i === 12 ? FH : FB });
    if (i > 0) vline(s, gx + i * mw, calY + 0.26, 1.62, i === 12 ? C.muted : C.rule, i === 12 ? 1 : 0.5, i === 12 ? 'solid' : 'dash');
  });
  T(s, 'Activation calendar', { x: X0, y: calY, w: labW, h: 0.24, fontFace: FH, color: C.purple });
  const m2x = (m) => gx + m * mw; // m in months from 1 Jan 2027 (0 = 1 Jan)
  const rowsCal = ["India's cricket", 'Buying seasons', 'Dealer and mechanics', 'Tyre camps', 'Cricket moments', 'Videos'];
  const rp = 0.27, r0 = calY + 0.27;
  rowsCal.forEach((r, i) => T(s, r, { x: X0, y: r0 + i * rp, w: labW - 0.1, h: 0.26, valign: 'middle', fontFace: FH, color: C.ink }));
  function bar(row, m0, m1, text, fill, color) {
    const x = m2x(m0), w = m2x(m1) - x;
    s.addText(text, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.04, x, y: r0 + row * rp + 0.015, w, h: rp - 0.04, fill: { color: fill }, line: { type: 'none' }, fontSize: 12, fontFace: FB, color: color || C.white, align: 'center', valign: 'middle', margin: 0 });
  }
  bar(0, 0.65, 2.1, 'Tests v AUS', C.purple);
  bar(0, 2.3, 4.5, 'IPL: not Apollo\'s', C.greyTint, C.sec);
  bar(0, 9.05, 10.7, 'ODI World Cup', C.purple);
  bar(0, 12.0, 15.0, 'England Tests (reported)', C.purpleTint, C.ink);
  bar(1, 3.0, 6.0, 'Wheat buying', C.amberTint, C.ink);
  bar(1, 9.0, 12.0, 'Paddy and cotton buying', C.amberTint, C.ink);
  bar(2, 0.65, 15.0, 'Guarantee, rewards and registration: in test areas from 21 January, at every farm-tyre dealer from October', C.ink);
  bar(3, 2.0, 3.0, 'Camp', C.teal);
  bar(3, 8.0, 9.0, 'Camp', C.teal);
  bar(3, 14.0, 15.0, 'Camp', C.teal);
  bar(4, 0.65, 2.1, 'Match days', C.purpleTint, C.ink);
  bar(4, 9.05, 10.7, 'Match days', C.purpleTint, C.ink);
  bar(4, 12.0, 15.0, 'Hosting at Tests', C.purpleTint, C.ink);
  bar(5, 2.0, 3.0, 'Videos', C.amber);
  bar(5, 8.0, 9.0, 'Videos', C.amber);
  bar(5, 14.0, 15.0, 'Videos', C.amber);
  soWhat(s, 'Every activity is tied to a registered sale or a buying season, and cricket moments sit only where India actually plays.');
  source(s, 'Sources: team plan (planning assumptions); BCCI home season (five Tests v Australia, 21 Jan to 3 Mar 2027); ICC Men\'s ODI World Cup (2 Oct to 21 Nov 2027); England Tests in early 2028 as reported; IPL dates forecast. Cricket moments run first in the test\'s cricket arm.');
  notes(s, 'Partners named: home-ground dealers; enrolled mechanics and puncture shops; a small-ticket finance partner (one lender\'s tyre loans start at Rs 50,000, above a rear pair, so choose for small tickets); tractor makers\' dealers sharing service records, starting with Mahindra in ten districts; local organisers of existing village tournaments; BCCI for approvals of the team\'s marks; an agricultural university for a two-year tyre-life trial. World Cup marks belong to the ICC: use Team India marks only.');
}

// ============ 9. MEASUREMENT ============
{
  const s = newSlide('Proof and money');
  tracker(s, '09', 'Measurement framework');
  title(s, 'Four arms in 30 districts separate what the offer, the field team and cricket each add, measured on Apollo\'s own billing');
  const pL = { x: X0, w: 4.85 }, pR = { x: X0 + 5.1, w: 7.13 }, py = BODY_Y, ph = 4.25;
  box(s, pL.x, py, pL.w, ph, C.panel2);
  box(s, pR.x, py, pR.w, ph, C.panel2);
  head(s, 'One tehsil for each arm in every district, drawn by lot', pL.x + 0.2, py + 0.16, pL.w - 0.4, 0.55, 14);
  T(s, '30 districts, about 116 tehsils, about 29 in each arm', { x: pL.x + 0.2, y: py + 0.72, w: pL.w - 0.4, h: 0.26, color: C.sec });
  const arms = [
    { n: 'Arm 0', blocks: [] },
    { n: 'Arm 1', blocks: ['Offer'] },
    { n: 'Arm 2', blocks: ['Offer', 'Field team'] },
    { n: 'Arm 3', blocks: ['Offer', 'Field team', 'Cricket'] },
  ];
  const bf = { Offer: C.purple, 'Field team': C.teal, Cricket: C.amber };
  const aw = 0.98, ag = (pL.w - 0.4 - 4 * aw) / 3, abase = py + 2.62, bh = 0.4;
  arms.forEach((a, i) => {
    const x = pL.x + 0.2 + i * (aw + ag);
    if (a.blocks.length === 0) T(s, 'No change', { x, y: abase - bh, w: aw, h: bh, align: 'center', valign: 'middle', color: C.sec });
    a.blocks.forEach((b, j) => {
      s.addText(b, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.04, x, y: abase - (j + 1) * (bh + 0.04), w: aw, h: bh, fill: { color: bf[b] }, line: { type: 'none' }, fontSize: 12, fontFace: FH, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    });
    T(s, a.n, { x, y: abase + 0.06, w: aw, h: 0.26, align: 'center', fontFace: FH, color: C.ink });
  });
  hline(s, pL.x + 0.2, abase + 0.02, pL.w - 0.4, C.muted, 0.75);
  T(s, bullets([
    [{ text: 'Arm 1 against 0: ', options: { fontFace: FH, color: C.ink } }, { text: 'does the offer work alone?' }],
    [{ text: 'Arm 2 against 1: ', options: { fontFace: FH, color: C.ink } }, { text: 'does the field team pay?' }],
    [{ text: 'Arm 3 against 2: ', options: { fontFace: FH, color: C.ink } }, { text: 'does cricket pay?' }],
    'Same district, same weather and prices; difference-in-differences on 24 months of billing',
  ]), { x: pL.x + 0.2, y: py + 2.98, w: pL.w - 0.35, h: 1.22, color: C.body });

  head(s, 'From recall to sales: what is measured, against what baseline', pR.x + 0.2, py + 0.16, pR.w - 0.4, 0.3, 14);
  const hdr = ['Stage', 'Measure', 'Baseline', 'Source, how often'].map((t) => ({ text: t, options: { fontFace: FH, color: C.ink, border: [{ type: 'none' }, { type: 'none' }, { pt: 1, color: C.muted }, { type: 'none' }] } }));
  const kpi = [
    ['Recall', 'Unaided first mention of Apollo; jersey credited to Apollo', 'Survey, Jan 2027', '40 owners a tehsil: Jan, Jul, Dec'],
    ['Belief', 'Apollo "lasts as long as MRF"', 'Survey, Jan 2027', 'Same survey'],
    ['Advice', 'Dealers and mechanics recommending Apollo', 'Survey, Dec 2026', 'Mystery visits each season'],
    ['Sales (gate)', 'Apollo farm replacement sales per tehsil, in points of share', '24 months of billing', 'Billing monthly; registrations'],
    ['Retention', 'Apollo-fitted tractors replaced on Apollo', 'Camp register', 'Each camp'],
    ['Guarantee', 'Claims as a share of covered sales: 2% reserved, pause at 4%', 'Starts at zero', 'Claims system, monthly'],
  ];
  const rows = [hdr].concat(kpi.map((r) => r.map((c, j) => ({ text: c, options: { color: j === 0 ? (r[0].startsWith('Sales') ? C.purple : C.ink) : C.body, fontFace: j === 0 ? FH : FB, border: [{ type: 'none' }, { type: 'none' }, { pt: 0.5, color: C.rule }, { type: 'none' }] } }))));
  s.addTable(rows, { x: pR.x + 0.15, y: py + 0.5, w: pR.w - 0.3, colW: [1.15, 2.6, 1.4, 1.68], fontFace: FB, fontSize: 12, valign: 'middle', margin: [2, 5, 2, 5], rowH: [0.3, 0.5, 0.32, 0.5, 0.5, 0.5, 0.5] });
  box(s, pR.x + 0.2, py + 3.68, pR.w - 0.4, 0.5, C.purpleSoft);
  T(s, [{ text: 'The test can detect ', options: { fontFace: FH, color: C.ink } }, { text: 'a sales gain of 1.6 to 2.6 points of share and about 7 points of first mention. Recall explains; sales decide the gates.' }],
    { x: pR.x + 0.32, y: py + 3.68, w: pR.w - 0.64, h: 0.5, valign: 'middle', color: C.body });
  soWhat(s, 'Every gate is read on Apollo\'s own sales data, and each layer of spending has its own comparison group.');
  source(s, 'Sources: team design (planning assumptions). Detectable differences computed for 29 tehsils an arm paired within districts, and 1,160 owners an arm with a design effect of 2.95 (intra-cluster correlation 0.05); to be re-run on Apollo\'s billing before launch.');
  notes(s, 'Each tehsil gets the roll-out version at roll-out cost: Rs 1.31 lakh for the field engine, Rs 1.2 lakh for cricket. The first pilot spent about three times what the roll-out would. Pull-forward check: if sales in a treated tehsil fall below its comparison in the three months after a season, the gain is reduced by that fall.');
}

// ============ 10. COST-BENEFIT ============
{
  const s = newSlide('Proof and money');
  tracker(s, '10', 'Financial plan: cost and benefit');
  title(s, 'The offer pays at one point of share; a field team must add five points and cricket three more, and the worst case loses about Rs 10 crore');
  const pL = { x: X0, w: 5.95 }, pR = { x: X0 + 6.2, w: 6.03 }, py = BODY_Y, ph = 4.25;
  box(s, pL.x, py, pL.w, ph, C.panel2);
  box(s, pR.x, py, pR.w, ph, C.panel2);
  head(s, 'Points of share each layer must add to pay its full cost*', pL.x + 0.2, py + 0.16, pL.w - 0.4, 0.3, 14);
  const layers = [
    { n: 'National offer', c: 'Rs 7.0 crore a year, mostly per tyre sold', be: 1.0, gate: 2, beT: '1.0 point nationally', plain: 'About 9,700 more rear pairs a year across India' },
    { n: 'Field team', c: 'Rs 2.06 lakh a tehsil a year', be: 4.7, gate: 5, beT: '4.7 points in the tehsil', plain: 'One more rear pair a fortnight, where Apollo sells one a week' },
    { n: 'Cricket layer', c: 'Rs 1.30 lakh a tehsil a year', be: 3.0, gate: 3, beT: '3.0 points more', plain: 'Three more rear pairs every two months' },
  ];
  const bx = pL.x + 2.1, bwMax = pL.w - 2.1 - 0.35, per = bwMax / 5.6;
  layers.forEach((l, i) => {
    const y = py + 0.62 + i * 1.02;
    T(s, [{ text: l.n, options: { fontFace: FH, color: C.ink, breakLine: true } }, { text: l.c, options: { color: C.sec } }], { x: pL.x + 0.2, y, w: 1.8, h: 0.9 });
    rect(s, bx, y + 0.04, l.be * per, 0.3, C.purple);
    if (l.be * per > 1.7) T(s, l.beT, { x: bx + 0.1, y: y + 0.04, w: l.be * per - 0.15, h: 0.3, valign: 'middle', fontFace: FH, color: C.white });
    else T(s, l.beT, { x: bx + l.gate * per + 0.12, y: y + 0.04, w: 1.9, h: 0.3, valign: 'middle', fontFace: FH, color: C.ink });
    const gxp = bx + l.gate * per;
    rect(s, gxp - 0.025, y - 0.02, 0.05, 0.42, C.amberMark);
    T(s, l.plain, { x: bx, y: y + 0.42, w: bwMax, h: 0.46, color: C.sec });
  });
  rect(s, pL.x + 0.2, py + 3.63, 0.22, 0.16, C.purple);
  T(s, 'Full-cost break-even', { x: pL.x + 0.5, y: py + 3.58, w: 1.8, h: 0.26 });
  rect(s, pL.x + 2.38, py + 3.57, 0.05, 0.28, C.amberMark);
  T(s, 'Gate set in the test (2, 5 and 3 points)', { x: pL.x + 2.52, y: py + 3.58, w: 3.3, h: 0.26 });
  T(s, 'One point: Rs 33 crore of revenue, Rs 7.4 crore of net contribution a year.', { x: pL.x + 0.2, y: py + 3.86, w: pL.w - 0.3, h: 0.3, color: C.sec });

  head(s, 'Three cases, if the gates work as designed*', pR.x + 0.2, py + 0.16, pR.w - 0.4, 0.3, 14);
  const B = (t) => ({ text: t, options: { fontFace: FH, color: C.ink, align: 'center', border: [{ type: 'none' }, { type: 'none' }, { pt: 1, color: C.muted }, { type: 'none' }] } });
  const cell = (t, first) => ({ text: t, options: { color: first ? C.ink : C.body, align: first ? 'left' : 'center', border: [{ type: 'none' }, { type: 'none' }, { pt: 0.5, color: C.rule }, { type: 'none' }] } });
  const tbl = [
    [Object.assign(B(''), {}), B('Low'), B('Base'), B('High')],
    [cell('What passes its gate', 1), cell('Offer only'), cell('Offer and field teams'), cell('All three')],
    [cell('Share gain in FY29', 1), cell('1.0 point'), cell('2.5 points'), cell('4.0 points')],
    [cell('Share at March 2029', 1), cell('~10.5%'), cell('~12.5%'), cell('~14.5%')],
    [cell('Extra revenue, FY29', 1), cell('Rs 33 crore'), cell('Rs 82 crore'), cell('Rs 132 crore')],
    [cell('Spend to Mar 2028, FY29', 1), cell('11.0, 7.7'), cell('11.0, 12.2'), cell('11.0, 15.1')],
  ];
  s.addTable(tbl, { x: pR.x + 0.15, y: py + 0.52, w: pR.w - 0.3, colW: [2.1, 1.21, 1.21, 1.21], fontFace: FB, fontSize: 12, valign: 'middle', margin: [2, 4, 2, 4], rowH: [0.3, 0.5, 0.3, 0.3, 0.3, 0.3] });
  T(s, 'Cumulative result, Rs crore', { x: pR.x + 0.2, y: py + 2.74, w: 3, h: 0.26, fontFace: FH, color: C.ink });
  s.addChart(pres.charts.BAR, [
    { name: 'At March 2028', labels: ['Low', 'Base', 'High'], values: [-9.5, -7.3, -3.6] },
    { name: 'At March 2029', labels: ['Low', 'Base', 'High'], values: [-9.8, -1.1, 10.8] },
  ], {
    x: pR.x + 0.1, y: py + 2.94, w: pR.w - 0.2, h: 1.28, barDir: 'col', barGrouping: 'clustered', barGapWidthPct: 60,
    chartColors: [C.purpleTint, C.purple], invertedColors: undefined,
    showValue: true, dataLabelPosition: 'outEnd', dataLabelFormatCode: '+0.0;"−"0.0;0', dataLabelFontSize: 12, dataLabelFontFace: FB, dataLabelColor: C.ink,
    catAxisLabelFontSize: 12, catAxisLabelFontFace: FB, catAxisLabelColor: C.ink, catAxisLabelPos: 'low', catAxisLineShow: true, catAxisLineColor: C.muted,
    valAxisHidden: true, valAxisMinVal: -14, valAxisMaxVal: 15, valGridLine: { style: 'none' },
    showLegend: true, legendPos: 'r', legendFontSize: 12, legendFontFace: FB, legendColor: C.body,
  });
  soWhat(s, 'No case pays back by March 2028; the base case turns positive in FY29 and recovers its outlay early in FY30, and the gates cap the loss.');
  source(s, 'Sources: team analysis. * Planning assumptions: market Rs 3,300 crore; 30% contribution before the programme; offer cost Rs 1,255 a rear tyre; reference tehsil of 5,000 working tractors. The share gains are assumptions, not forecasts; no analogue gives a benchmark for a tyre maker.');
  notes(s, 'Plain terms: where Apollo sells one rear pair a week in a tehsil, a field team has to add one more a fortnight. Base case FY29 needs 2.5 points nationally: Rs 82 crore of revenue, about 97,000 tyres, of which about 24,000 rear pairs; the offer adds about 1.9 points and field tehsils 0.6. Low case: about Rs 10 crore lost if only the offer passes and gains one point. Sensitivities are in the appendix.');
}

// ============ 11. ROADMAP ============
{
  const s = newSlide('Proof and money');
  tracker(s, '11', 'Roll-out roadmap');
  title(s, 'The test starts on 21 January 2027 and both gates fall before the sponsorship ends, so scale and renewal are decided on evidence');
  const labW = 1.55, gx = X0 + labW, gw = CW - labW, nM = 17, mw = gw / nM; // Nov 2026 .. Mar 2028
  const ty = BODY_Y;
  const ml = ['Nov 26', 'Dec', 'Jan 27', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 28', 'Feb', 'Mar'];
  const rp = 0.36, r0 = ty + 0.3, nRows = 5;
  ml.forEach((m, i) => {
    const strong = i === 0 || i === 2 || i === 14;
    T(s, m, { x: gx + i * mw, y: ty, w: mw, h: 0.24, align: 'center', color: strong ? C.ink : C.sec, fontFace: strong ? FH : FB });
    if (i > 0) vline(s, gx + i * mw, ty + 0.27, nRows * rp + 0.04, (i === 2 || i === 14) ? C.muted : C.rule, (i === 2 || i === 14) ? 1 : 0.5, (i === 2 || i === 14) ? 'solid' : 'dash');
  });
  const mx = (m) => gx + m * mw; // m = months from 1 Nov 2026
  const rl = ['Test', 'Offer', 'Field teams', 'Gates', "India's cricket"];
  rl.forEach((r, i) => T(s, r, { x: X0, y: r0 + i * rp, w: labW - 0.1, h: rp - 0.04, valign: 'middle', fontFace: FH, color: C.ink }));
  function seg(row, m0, m1, text, fill, color) {
    s.addText(text, { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.04, x: mx(m0), y: r0 + row * rp + 0.03, w: mx(m1) - mx(m0), h: rp - 0.08, fill: { color: fill }, line: { type: 'none' }, fontSize: 12, fontFace: FH, color: color || C.white, align: 'center', valign: 'middle', margin: 0 });
  }
  seg(0, 0.27, 2.65, 'Prepare', C.grey, C.ink);
  seg(0, 2.67, 14.0, 'Four-arm test in 30 districts, through two buying seasons', C.purple);
  seg(1, 11.0, 17.0, 'At every farm-tyre dealer', C.ink);
  seg(2, 15.0, 17.0, 'Dense tehsils', C.teal);
  function gate(m, text) {
    const x = mx(m);
    s.addShape(pres.shapes.DIAMOND, { x: x - 0.13, y: r0 + 3 * rp + 0.04, w: 0.26, h: 0.26, fill: { color: C.amberMark }, line: { type: 'none' } });
    T(s, text, { x: x - 2.35, y: r0 + 3 * rp + 0.03, w: 2.15, h: 0.28, valign: 'middle', align: 'right', fontFace: FH, color: C.ink });
  }
  gate(9.5, 'Gate 1: the offer, Aug');
  gate(14.77, 'Gate 2: field, cricket, Jan');
  seg(4, 2.67, 4.1, 'Tests v AUS', C.purpleTint, C.ink);
  seg(4, 11.05, 12.7, 'World Cup', C.purpleTint, C.ink);
  seg(4, 14.0, 17.0, 'England Tests', C.purpleTint, C.ink);

  const cols = [
    { h: 'Prepare', d: 'Nov 2026 to 20 Jan 2027', t: "Apollo's data in two weeks; ~300 tonnes ring-fenced; contract and legal checks; tehsils drawn; dealers briefed, mechanics enrolled; baseline survey", m: 'Rs 2.8 crore' },
    { h: 'Test', d: 'From 21 Jan 2027', t: '30 districts, ~116 tehsils, four arms; two buying seasons and two India windows; each read-out checked independently', m: 'Rs 5.2 crore, from April' },
    { h: 'Gate 1: offer national', d: 'Aug, then Oct 2027', t: 'At 2+ points with claims within 2%, the offer goes to every farm-tyre dealer. At 1 to 2: a second season in 30 districts. Below 1: stop', m: 'Rs 3.0 crore' },
    { h: 'Gate 2: field scale', d: 'Jan 2028 on', t: 'Field teams in up to 200 dense tehsils at 5+ points; cricket events at 3+. Else keep per-tyre rewards and the mark. Results feed the renewal', m: 'FY29: Rs 7.7 to 15.1 crore' },
  ];
  const cy = r0 + nRows * rp + 0.14, cw = (CW - 3 * 0.16) / 4, chh = SO_Y - cy - 0.1;
  cols.forEach((c, i) => {
    const x = X0 + i * (cw + 0.16);
    box(s, x, cy, cw, chh, C.panel2);
    T(s, [{ text: c.h, options: { fontFace: FH, fontSize: 13, color: C.ink, breakLine: true } }, { text: c.d, options: { color: C.purple, fontFace: FH } }], { x: x + 0.16, y: cy + 0.1, w: cw - 0.3, h: 0.5 });
    T(s, c.t, { x: x + 0.16, y: cy + 0.64, w: cw - 0.3, h: chh - 1.04, color: C.body });
    T(s, c.m, { x: x + 0.16, y: cy + chh - 0.36, w: cw - 0.3, h: 0.26, fontFace: FH, color: C.purple });
  });
  soWhat(s, 'The strategy does not wait for the test; only the optional field and cricket spending does.');
  source(s, 'Sources: team plan (planning assumptions); fixtures as on slide 8. The sponsorship ends in March 2028; both gates fall before it, so the renewal can use the results.');
  notes(s, 'First 100 days: weeks 1-2 (9 to 20 Nov) pull Apollo data and read the contract; weeks 3-4 supply decision, set the hours, survey 40 dealers and 60 mechanics; weeks 5-6 draw tehsils, legal opinion by state, approvals for the marks, choose survey and finance partners, build registration and claims; weeks 7-8 brief dealers, enrol mechanics, print cards and boards; weeks 9-10 baseline survey and dry run; 21 January launch with the first Test at Nagpur. If launch slips, later Tests (Ranchi from 19 Feb, Ahmedabad from 27 Feb) still give a cricket window.');
}

// ============ 12. THE ASK ============
{
  const s = newSlide('Proof and money');
  tracker(s, '12', 'Budget and decisions');
  title(s, "The ask: Rs 11 crore to March 2028 released against gates, a supply decision now, and Apollo's own data within two weeks");
  const pL = { x: X0, w: 6.6 }, pR = { x: X0 + 6.85, w: 5.38 }, py = BODY_Y, ph = 4.25;
  box(s, pL.x, py, pL.w, ph, C.panel2);
  box(s, pR.x, py, pR.w, ph, C.panel2);
  head(s, 'Budget, Rs crore*', pL.x + 0.2, py + 0.16, 3, 0.3, 14);
  const H = (t, al) => ({ text: t, options: { fontFace: FH, color: C.ink, align: al || 'right', border: [{ type: 'none' }, { type: 'none' }, { pt: 1, color: C.muted }, { type: 'none' }] } });
  const R = (t, al, bold) => ({ text: t, options: { color: bold ? C.ink : C.body, fontFace: bold ? FH : FB, align: al || 'right', border: [{ type: 'none' }, { type: 'none' }, { pt: 0.5, color: C.rule }, { type: 'none' }] } });
  const lines = [
    ['Set-up: legal, guarantee system', '1.30', '–', '–'],
    ['Surveys and independent review', '0.56', '1.61', 'In tracking'],
    ['Test field costs, about 58 tehsils', '0.34', '1.45', '–'],
    ['Team, content, tyre-life trial', '0.30', '1.70', '–'],
    ['National offer, from October 2027', '–', '2.75', '7.00'],
    ['Field teams, 200 dense tehsils', '–', '–', '4.12'],
    ['Cricket layer, 200 tehsils', '–', '–', '2.60'],
    ['Contingency, 10%', '0.25', '0.75', '0.70 to 1.37'],
  ];
  const tb = [[H('Item', 'left'), H('FY27'), H('FY28'), H('FY29 if passed')]]
    .concat(lines.map((l) => [R(l[0], 'left'), R(l[1]), R(l[2]), R(l[3])]))
    .concat([[R('Total', 'left', 1), R('2.8', 'right', 1), R('8.3', 'right', 1), R('7.7 to 15.1', 'right', 1)]]);
  s.addTable(tb, { x: pL.x + 0.15, y: py + 0.5, w: pL.w - 0.3, colW: [3.25, 0.75, 0.75, 1.55], fontFace: FB, fontSize: 12, valign: 'middle', margin: [1, 5, 1, 5], rowH: 0.31 });
  T(s, "Rs 11 crore over seventeen months is about 2% of one year's advertising and promotion spend (Rs 524 crore in FY26).", { x: pL.x + 0.2, y: py + 3.66, w: pL.w - 0.4, h: 0.5, color: C.sec });

  head(s, 'Six decisions, each with a date', pR.x + 0.2, py + 0.16, pR.w - 0.4, 0.3, 14);
  const dec = [
    ['Nov 2026', 'Release tranche 1, Rs 2.8 crore, on approval of the plan'],
    ['20 Nov 2026', "Pull Apollo's data to confirm the 9% and set the guarantee's hours"],
    ['4 Dec 2026', 'Ring-fence about 300 tonnes of farm tyres for the test; build no new farm line'],
    ['21 Jan 2027', 'Launch the four-arm test; tranche 2, Rs 5.2 crore, in April if on time'],
    ['Aug 2027', 'Gate 1: take the offer national at two points; tranche 3, Rs 3.0 crore'],
    ['Jan 2028', 'Gate 2: fund field teams at five points and cricket at three, for FY29'],
  ];
  dec.forEach((d, i) => {
    const y = py + 0.58 + i * 0.6;
    s.addText(d[0], { shape: pres.shapes.ROUNDED_RECTANGLE, rectRadius: 0.05, x: pR.x + 0.2, y: y + 0.04, w: 1.25, h: 0.42, fill: { color: i >= 4 ? C.amberTint : C.purpleSoft }, line: { type: 'none' }, fontFace: FH, fontSize: 12, color: C.ink, align: 'center', valign: 'middle', margin: 0 });
    T(s, d[1], { x: pR.x + 1.6, y, w: pR.w - 1.8, h: 0.52, valign: 'middle', color: C.body });
  });
  soWhat(s, 'The most that can be lost is about Rs 10 crore, if only the offer passes and it gains one point.');
  source(s, "Sources: team budget (* planning assumptions; unit costs re-used from the first analysis and re-sized); Apollo FY26 annual report (advertising and promotion spend). Gates as on slides 9 and 10.");
  notes(s, "Show the low case: about Rs 10 crore lost if only the offer passes and it gains one point. For scale: farm's share of the jersey fee is about Rs 14 crore a year; McKinsey's sponsorship article reports activation spending of 0.5 to 1.6 times the rights fee, which would be Rs 7 to 22 crore here. The programme sits at the low end.");
}

// ============ APPENDIX ============
function appendixSlide(num, t) {
  const s = newSlide('Appendix');
  tracker(s, num, 'Appendix');
  title(s, t);
  return s;
}
const cellB = (t, o) => ({ text: t, options: Object.assign({ color: C.body, border: [{ type: 'none' }, { type: 'none' }, { pt: 0.5, color: C.rule }, { type: 'none' }] }, o || {}) });
const cellH = (t, o) => ({ text: t, options: Object.assign({ fontFace: FH, color: C.ink, border: [{ type: 'none' }, { type: 'none' }, { pt: 1, color: C.muted }, { type: 'none' }] }, o || {}) });

// A1 market and supply
{
  const s = appendixSlide('A1', 'Market build: about 7.7 million tractor tyres a year, half of them replacement, worth about Rs 3,300 crore; the extra tyres need no new line');
  head(s, 'Domestic tractor tyres, million (CRISIL)', X0, BODY_Y, 6, 0.3, 14);
  const yrs = ['FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24'];
  const t1 = [[cellH('')].concat(yrs.map((y) => cellH(y, { align: 'right' })))]
    .concat([
      [cellB('To tractor makers', { color: C.ink })].concat(['3.5', '3.1', '3.9', '3.8', '4.3', '3.8'].map((v) => cellB(v, { align: 'right' }))),
      [cellB('Replacement', { color: C.ink })].concat(['2.8', '2.2', '2.3', '3.5', '3.7', '3.9'].map((v) => cellB(v, { align: 'right' }))),
      [cellB('Total', { fontFace: FH, color: C.ink })].concat(['6.3', '5.2', '6.2', '7.4', '8.0', '7.7'].map((v) => cellB(v, { align: 'right', fontFace: FH, color: C.ink }))),
      [cellB('Replacement share', { color: C.ink })].concat(['44%', '42%', '37%', '47%', '46%', '51%'].map((v) => cellB(v, { align: 'right' }))),
    ]);
  s.addTable(t1, { x: X0, y: BODY_Y + 0.38, w: 6.0, colW: [1.92, 0.68, 0.68, 0.68, 0.68, 0.68, 0.68], fontFace: FB, fontSize: 12, valign: 'middle', rowH: 0.32, margin: [1, 5, 1, 5] });
  T(s, bullets([
    'Replacement tyres in FY26: 3.9 to 4.6 million*, at an average realisation of about Rs 8,500* (half rear, half front): Rs 3,300 to 3,900 crore. Working figure Rs 3,300 crore (Rs 2,500 to 4,000 crore), as cheap tiers pull the average down',
    'Working tractors about 8.5 million (7 to 11 million)*: about 0.5 tyres and Rs 3,900 a tractor a year',
    "Apollo's farm revenue about Rs 1,200 crore (6% of Indian revenue); about 25% replacement, about Rs 300 crore, about 9% of the market*",
  ]), { x: X0, y: BODY_Y + 2.15, w: 6.0, h: 2.15, color: C.body });

  const rx = X0 + 6.4, rw = CW - 6.4;
  head(s, 'Tyres needed, and where they come from', rx, BODY_Y, rw, 0.3, 14);
  const t2 = [[cellH('Need'), cellH('Tyres', { align: 'right' }), cellH('Tonnes', { align: 'right' }), cellH('When')],
    [cellB('The test', { color: C.ink }), cellB('~8,000', { align: 'right' }), cellB('~300', { align: 'right' }), cellB('Feb to Dec 2027')],
    [cellB('Base case, +2.5 points', { color: C.ink }), cellB('~97,000', { align: 'right' }), cellB('~3,600', { align: 'right' }), cellB('FY29')],
    [cellB('Aspiration, +6 points', { color: C.ink }), cellB('~250,000', { align: 'right' }), cellB('~9,300', { align: 'right' }), cellB('FY30')]];
  s.addTable(t2, { x: rx, y: BODY_Y + 0.38, w: rw, colW: [2.15, 1.05, 0.95, 1.68], fontFace: FB, fontSize: 12, valign: 'middle', rowH: 0.32, margin: [1, 5, 1, 5] });
  T(s, bullets([
    "Even 9,300 tonnes is 1.3% of Apollo's 732,097 tonnes of production in FY26",
    'A new farm line would cost Rs 430 to 790 crore for Rs 60 to 110 crore of contribution a year: no',
    'Instead: first call on farm tyres for test and priority dealers now; the farm output moving from the Dutch plant in FY28; debottlenecking decided at Gate 1; outsource only tyres outside the guarantee',
    'Rule: no tyre goes under the guarantee unless Apollo made it and holds its wear data',
  ]), { x: rx, y: BODY_Y + 1.82, w: rw, h: 2.5, color: C.body });
  source(s, 'Sources: CRISIL industry chapter in the Tolins Tyres prospectus (Aug 2024); Apollo FY26 annual report; broker notes on capacity (Dec 2025, Q1 FY27); tyre weight from one retailer listing (low reliability); team analysis. * Computed on planning assumptions.');
}

// A2 costs and sensitivities
{
  const s = appendixSlide('A2', 'Programme costs by layer, and how the FY29 result moves when one assumption changes');
  const colw = (CW - 0.5) / 3;
  const blocks = [
    { h: 'National offer, Rs crore a year', rows: [['Guarantee reserve on existing sales', '2.5'], ['Registering existing buyers', '0.5'], ['Team, claims system, content', '2.5'], ['Tracking research', '1.0'], ['Videos, board upkeep', '0.5'], ['Total a year', '7.0'], ['One-time: boards at ~2,000 dealers', '1.0']] },
    { h: 'Field team, Rs lakh a tehsil a year', rows: [['Dealer farm corner upkeep', '0.15'], ['One mechanic meet', '0.25'], ['Two tyre health camps', '0.30'], ['Coordinator, one-tenth share', '0.48'], ['Messaging and system', '0.13'], ['Fixed cost', '1.31'], ['Full, with team and measurement', '2.06']] },
    { h: 'Cricket layer, Rs lakh a tehsil a year', rows: [['One existing village tournament', '0.50'], ['Tickets, shirts, other rewards', '0.40'], ['Match days at the dealer', '0.20'], ["Sponsor's mark on local boards", '0.10'], ['Fixed cost', '1.20'], ['Full, with content', '1.30']] },
  ];
  blocks.forEach((b, i) => {
    const x = X0 + i * (colw + 0.25);
    head(s, b.h, x, BODY_Y, colw, 0.3, 13);
    const rows = b.rows.map((r) => {
      const strong = /^Total|^Fixed|^Full/.test(r[0]);
      return [cellB(r[0], { color: C.ink, fontFace: strong ? FH : FB }), cellB(r[1], { align: 'right', fontFace: strong ? FH : FB, color: strong ? C.ink : C.body })];
    });
    s.addTable(rows, { x, y: BODY_Y + 0.36, w: colw, colW: [colw - 0.75, 0.75], fontFace: FB, fontSize: 12, valign: 'middle', rowH: 0.3, margin: [1, 5, 1, 5] });
  });
  head(s, 'Base case FY29 result of +Rs 6.2 crore, with one input changed at a time', X0, BODY_Y + 2.62, CW, 0.3, 13);
  const sens = [
    ['Share gain 1.5 points, not 2.5', '−1.2'], ['Share gain 3.5 points', '+13.6'], ['Market Rs 2,500 crore, not 3,300', '+1.7'],
    ['Market Rs 4,000 crore', '+10.1'], ['Contribution 25%, not 30%', '+2.1'], ['Contribution 40%', '+14.5'],
    ['Extra tyres outsourced, earning 20%', '−2.0'], ['Claims at twice the reserve', '+2.3'], ['Rivals match; half the gain lost', '−3.0'],
  ];
  const third = (CW - 0.5) / 3;
  [0, 1, 2].forEach((k) => {
    const rows = sens.slice(k * 3, k * 3 + 3).map((r) => [cellB(r[0], { color: C.ink }), cellB(r[1], { align: 'right', fontFace: FH, color: r[1].startsWith('−') ? C.amber : C.purple })]);
    s.addTable(rows, { x: X0 + k * (third + 0.25), y: BODY_Y + 2.98, w: third, colW: [third - 0.8, 0.8], fontFace: FB, fontSize: 12, valign: 'middle', rowH: 0.3, margin: [1, 5, 1, 5] });
  });
  T(s, 'Break-even share gain in FY29: 1.0 point for the offer alone, 1.7 with the field team, 2.0 with all three. The two inputs that matter most are the share gain, which the test measures, and the margin on the extra tyres, which the supply decision sets.',
    { x: X0, y: BODY_Y + 4.0, w: CW, h: 0.5, color: C.sec });
  source(s, 'Sources: team analysis on planning assumptions; unit costs re-used from the first analysis and re-sized (proof tractors dropped, the tehsil final dropped, rewards moved to a cost per tyre).');
}

// A3 need to believe
{
  const s = appendixSlide('A3', 'What management would need to believe in the base case (+2.5 points in FY29), and how each belief is settled');
  const rows = [[cellH('#'), cellH('Belief'), cellH('In plain terms'), cellH('Evidence today'), cellH('Settled by')]].concat([
    ['1', 'The market is ~Rs 3,300 crore and Apollo holds ~9%', '–', 'One CRISIL chart; one broker note', "Apollo's own data, in a week"],
    ['2', 'The offer adds ~1.9 points without field teams', 'Nine or ten more rear pairs a year at each of ~2,000 farm-tyre dealers', 'An hours guarantee exists abroad; no Indian result', "The test's offer-only arm"],
    ['3', 'Field teams add five points in 200 dense tehsils', 'One more rear pair a fortnight in each', 'None for tyres', "The test's field arm"],
    ['4', 'Guarantee claims stay within 2% of covered sales', 'One tyre in twenty claims a quarter of its price', 'No maker publishes a claim rate', 'Claims in the test, by dealer'],
    ['5', '~97,000 more tyres can be supplied', '~3,600 tonnes: 0.5% of production', 'Farm tyres are short today', 'The supply decision, Dec 2026'],
    ['6', 'Rivals do not erase the gain within the year', '–', 'No retaliation case found in farm tyres', "Mystery visits; rivals' schemes"],
    ['7', 'Registered buyers come back', 'They buy Apollo again', 'Repurchase falls to 18% after uneven wear', 'Repurchase among registered owners, FY29'],
  ].map((r) => r.map((c, j) => cellB(c, { color: j <= 1 ? C.ink : C.body, fontFace: j === 0 ? FH : FB }))));
  s.addTable(rows, { x: X0, y: BODY_Y, w: CW, colW: [0.4, 3.3, 3.0, 2.85, 2.68], fontFace: FB, fontSize: 12, valign: 'middle', rowH: [0.32, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], margin: [2, 5, 2, 5] });
  T(s, 'The number of dealerships stocking farm tyres is not public: Data unavailable – requires primary research or company confirmation.', { x: X0, y: BODY_Y + 3.95, w: CW, h: 0.3, color: C.sec });
  source(s, 'Sources: team analysis; J.D. Power 2018 (repurchase after uneven wear); Trelleborg guarantee (Feb 2026); broker notes on capacity.');
}

// A4 risks and rivals
{
  const s = appendixSlide('A4', 'Risks and guards, and how rivals may respond');
  const lw = 6.3, rx = X0 + 6.55, rw = CW - 6.55;
  head(s, 'Risks and guards', X0, BODY_Y, lw, 0.3, 14);
  const risks = [[cellH('Risk'), cellH('Guard')]].concat([
    ['Farm tyres are short and the test starves', 'Supply decision first; fill rate tracked weekly'],
    ['The guarantee is abused', 'Photo at registration and claim; a cap per dealer; quarry and mining excluded'],
    ["The team's marks or screenings are not allowed", 'Contract and approvals in weeks 1 to 6; the offer works without them'],
    ['World Cup marks used by mistake', 'Team India marks only; tournament marks belong to the ICC'],
    ['Promotions law differs by state', 'Legal opinion; no draws of chance; rewards tied to registered sales'],
    ['A weak farm year hides the effect', 'Every arm shares the same districts, so the comparison holds'],
    ['Results read too early', 'Gate 1 checked for pull-forward; Gate 2 uses two seasons'],
  ].map((r) => [cellB(r[0], { color: C.ink }), cellB(r[1])]));
  s.addTable(risks, { x: X0, y: BODY_Y + 0.36, w: lw, colW: [2.75, 3.55], fontFace: FB, fontSize: 12, valign: 'middle', rowH: [0.3, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], margin: [2, 5, 2, 5] });
  head(s, 'Likely responses (our judgement)', rx, BODY_Y, rw, 0.3, 14);
  const riv = [[cellH('Rival'), cellH('Likely move'), cellH("Apollo's answer")]].concat([
    ['MRF', 'Dealer schemes where it loses sales', 'Do not follow on price; settle claims fastest'],
    ['CEAT', 'Stretch its warranty wording; more cricket', 'Registration and settlement speed'],
    ['BKT', 'Price and range', 'Hold the mixed-use tyre'],
    ['Goodyear', 'Defend fitment', "Work Apollo's own fitted tractors"],
    ['Retreads', 'Gain in a weak year (GST now 5%)', 'Do not chase; credit on the entry tyre'],
  ].map((r) => [cellB(r[0], { color: C.ink, fontFace: FH }), cellB(r[1]), cellB(r[2])]));
  s.addTable(riv, { x: rx, y: BODY_Y + 0.36, w: rw, colW: [1.05, 2.25, 2.38], fontFace: FB, fontSize: 12, valign: 'middle', rowH: [0.3, 0.5, 0.5, 0.5, 0.5, 0.5], margin: [2, 5, 2, 5] });
  T(s, "A matching hours guarantee costs most for the brand with the most tyres in use, which is MRF.", { x: rx, y: BODY_Y + 3.3, w: rw, h: 0.5, color: C.sec });
  source(s, 'Sources: team analysis; GST on retreaded tractor tyres cut to 5% from 1 Nov 2026. No case of one tyre maker answering another\'s farm-tyre push was found, so the right-hand table is judgement.');
}

// A5 unknowns and sources
{
  const s = appendixSlide('A5', 'What is still unknown, and the sources behind the numbers');
  const lw = 6.0, rx = X0 + 6.3, rw = CW - 6.3;
  head(s, 'Unknown today, and how it is settled', X0, BODY_Y, lw, 0.3, 14);
  const unk = [[cellH('Unknown'), cellH('Settled by')]].concat([
    ["Apollo's replacement share (the 25% and the 9%)", "Apollo's books, in a week"],
    ['Tyre life in Indian conditions', 'Wear data; a university trial'],
    ["Real dealer margins and rivals' schemes", 'Survey of 40 dealers'],
    ['Guarantee claim rates', 'Claims in the test'],
    ['Reach of cricket among tractor owners', 'Baseline owner survey'],
    ['Rights in the contract beyond the logo', 'Legal review, November 2026'],
    ['Dealers stocking farm tyres, by district', "Apollo's dealer data"],
  ].map((r) => [cellB(r[0], { color: C.ink }), cellB(r[1])]));
  s.addTable(unk, { x: X0, y: BODY_Y + 0.36, w: lw, colW: [3.5, 2.5], fontFace: FB, fontSize: 12, valign: 'middle', rowH: 0.36, margin: [2, 5, 2, 5] });
  T(s, 'For each today: Data unavailable – requires primary research or company confirmation.', { x: X0, y: BODY_Y + 3.48, w: lw, h: 0.5, color: C.sec });
  head(s, 'Main sources', rx, BODY_Y, rw, 0.3, 14);
  T(s, bullets([
    'CRISIL industry chapter, Tolins Tyres prospectus (Aug 2024)',
    'Motilal Oswal, note of a meeting with Apollo management (27 Dec 2025)',
    'Apollo Tyres FY26 annual report; broker notes on Q1 FY27',
    'J.D. Power 2018 India tractor tyre study (3,768 owners)',
    'NFHS-5 state reports (2019-21); FADA retail data (6 Apr 2026)',
    'Statistical Abstracts of Haryana (2022-23) and Punjab (2025)',
    'Kaur (2024), Punjab cotton-belt survey of 520 households',
    'Trelleborg tyre-life guarantee terms (25 Feb 2026)',
    'McKinsey: consumer decision journey (2009); sports sponsorship (2014)',
    'Google Trends: team count of tractor-tyre searches, Sep 2024 to Nov 2026',
  ]), { x: rx, y: BODY_Y + 0.38, w: rw, h: 3.9, color: C.body });
  source(s, 'Full source register with links and fact-check verdicts available on request. Labels used on the slides: * marks a planning assumption or a figure computed on one.');
}

pres.writeFile({ fileName: OUT }).then((f) => console.log('wrote', f));
