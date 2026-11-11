// Helpers for the Apollo research summary (.docx). docx 9.7.1.
const D = require('docx');
const {
  Paragraph, TextRun, ExternalHyperlink, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, AlignmentType, VerticalAlign, PageBreak, TableLayoutType,
} = D;

const C = {
  ink: '1F2430', body: '30343C', muted: '6B7080', accent: '5E3A9C', accentSoft: 'F2EEF8',
  rule: 'DADCE2', zebra: 'F7F7F9', link: '5E3A9C', green: '2F6B4F',
};
const FONT = 'Calibri';
const W = 9638; // content width in DXA (A4, 2 cm margins)

// Inline markup:
//   **bold**   [label](url)   {tag}  (small grey evidence tag)
function runs(str, o = {}) {
  const size = o.size || 19, color = o.color || C.body, bold = !!o.bold, italics = !!o.italics;
  const out = [];
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:[^)\s]+)\)|\{([^}]+)\}/g;
  let last = 0, m;
  const plain = (t, b) => { if (t) out.push(new TextRun({ text: t, font: FONT, size, color, bold: b || bold, italics })); };
  while ((m = re.exec(str)) !== null) {
    plain(str.slice(last, m.index));
    if (m[1] !== undefined) plain(m[1], true);
    else if (m[2] !== undefined) {
      out.push(new ExternalHyperlink({ link: m[3], children: [new TextRun({ text: m[2], font: FONT, size: o.linkSize || size, color: C.link, bold })] }));
    } else if (m[4] !== undefined) {
      out.push(new TextRun({ text: ' ' + m[4], font: FONT, size: Math.max(size - 4, 14), color: C.muted, italics: true }));
    }
    last = re.lastIndex;
  }
  plain(str.slice(last));
  return out;
}

const P = (str, o = {}) => new Paragraph({
  children: runs(str, o),
  spacing: { before: o.before ?? 0, after: o.after ?? 80, line: o.line ?? 264 },
  alignment: o.align || AlignmentType.LEFT,
  keepNext: !!o.keepNext,
});

const H1 = (text, kicker) => [
  new Paragraph({
    children: [
      ...(kicker ? [new TextRun({ text: kicker + '   ', font: FONT, size: 18, color: C.accent, bold: true })] : []),
      new TextRun({ text, font: FONT, size: 30, color: C.ink, bold: true }),
    ],
    spacing: { before: 0, after: 140 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: C.accent, space: 4 } },
    keepNext: true,
  }),
];

const H2 = (text) => new Paragraph({
  children: [new TextRun({ text, font: FONT, size: 22, color: C.accent, bold: true })],
  spacing: { before: 160, after: 60 },
  keepNext: true,
});

const BUL = (str, o = {}) => new Paragraph({
  children: runs(str, o),
  numbering: { reference: 'bul', level: o.level || 0 },
  spacing: { before: 0, after: o.after ?? 50, line: 259 },
});

// Small grey source line
const SRC = (str) => new Paragraph({
  children: [new TextRun({ text: 'Sources: ', font: FONT, size: 15, color: C.muted, bold: true }), ...runs(str, { size: 15, color: C.muted })],
  spacing: { before: 40, after: 100 },
});

const NOTE = (str) => new Paragraph({
  children: runs(str, { size: 16, color: C.muted, italics: true }),
  spacing: { before: 30, after: 90 },
});

const thin = { style: BorderStyle.SINGLE, size: 4, color: C.rule };
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

function cell(str, width, o = {}) {
  const paras = String(str).split('\n').map((line) => new Paragraph({
    children: runs(line, { size: o.size || 16, bold: o.bold, color: o.color }),
    spacing: { before: 0, after: 0, line: 240 },
    alignment: o.align || AlignmentType.LEFT,
  }));
  return new TableCell({
    children: paras,
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    margins: { top: 50, bottom: 50, left: 90, right: 90 },
    verticalAlign: VerticalAlign.CENTER,
    borders: { top: none, left: none, right: none, bottom: thin },
    columnSpan: o.span,
  });
}

// Data table. headers: string[]; rows: string[][]; widths: fractions or DXA summing to W
function TBL(headers, rows, widths, o = {}) {
  const TW = o.w || W;
  const tot = widths.reduce((a, b) => a + b, 0);
  const w = widths.map((x) => Math.round((x / tot) * TW));
  w[w.length - 1] += TW - w.reduce((a, b) => a + b, 0);
  const size = o.size || 16;
  const head = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => cell(h, w[i], { bold: true, fill: C.accentSoft, size, color: C.ink, align: i > 0 && o.numeric?.includes(i) ? AlignmentType.RIGHT : undefined })),
  });
  const body = rows.map((r, ri) => new TableRow({
    cantSplit: true,
    children: r.map((c, i) => cell(c, w[i], {
      size,
      bold: o.boldFirst && i === 0,
      fill: o.highlightRows?.includes(ri) ? 'FBF8E9' : (ri % 2 === 1 ? C.zebra : undefined),
      align: o.numeric?.includes(i) ? AlignmentType.RIGHT : undefined,
    })),
  }));
  return new Table({
    width: { size: TW, type: WidthType.DXA },
    columnWidths: w,
    layout: TableLayoutType.FIXED,
    rows: [head, ...body],
    borders: { top: thin, bottom: thin, left: none, right: none, insideHorizontal: thin, insideVertical: none },
  });
}

// Stat strip: items = [[big, label, tag]]
function STATS(items) {
  const n = items.length;
  const w = Array(n).fill(Math.floor(W / n));
  w[n - 1] += W - w.reduce((a, b) => a + b, 0);
  const row = new TableRow({
    children: items.map(([big, label, tag], i) => new TableCell({
      width: { size: w[i], type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.accentSoft },
      margins: { top: 90, bottom: 90, left: 110, right: 90 },
      borders: { top: none, bottom: none, right: { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' }, left: none },
      children: [
        new Paragraph({ children: [new TextRun({ text: big, font: FONT, size: 30, bold: true, color: C.accent })], spacing: { after: 20 } }),
        new Paragraph({ children: runs(label, { size: 15, color: C.ink }), spacing: { after: 0, line: 230 } }),
        ...(tag ? [new Paragraph({ children: runs(tag, { size: 13, color: C.muted, italics: true, linkSize: 13 }), spacing: { before: 20, after: 0 } })] : []),
      ],
    })),
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: w, layout: TableLayoutType.FIXED, rows: [row],
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none } });
}

// Callout box (single cell, tinted, left accent bar)
function BOX(lines, o = {}) {
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W], layout: TableLayoutType.FIXED,
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: o.fill || C.accentSoft },
      margins: { top: 110, bottom: 110, left: 180, right: 160 },
      borders: { left: { style: BorderStyle.SINGLE, size: 24, color: C.accent }, top: none, bottom: none, right: none },
      children: lines.map((l, i) => new Paragraph({ children: runs(l, { size: o.size || 19, color: C.ink, bold: o.bold && i === 0 }), spacing: { after: i === lines.length - 1 ? 0 : 60, line: 264 } })),
    })] })],
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none },
  });
}

// Two side-by-side blocks of paragraphs (for the solution page)
function COLS(left, right, frac = 0.5, o = {}) {
  const a = Math.round(W * frac), b = W - a;
  const mk = (children, width, pad) => new TableCell({
    width: { size: width, type: WidthType.DXA }, children,
    margins: { top: 0, bottom: 0, left: pad[0], right: pad[1] },
    borders: { top: none, bottom: none, left: none, right: none },
  });
  return new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [a, b], layout: TableLayoutType.FIXED,
    rows: [new TableRow({ children: [mk(left, a, [0, 140]), mk(right, b, [140, 0])] })],
    borders: { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: o.divider ? thin : none } });
}

const SP = (after = 80) => new Paragraph({ children: [], spacing: { before: 0, after } });
const BREAK = () => new Paragraph({ children: [new PageBreak()], spacing: { before: 0, after: 0 } });

module.exports = { D, C, FONT, W, runs, P, H1, H2, BUL, SRC, NOTE, TBL, STATS, BOX, COLS, SP, BREAK };
