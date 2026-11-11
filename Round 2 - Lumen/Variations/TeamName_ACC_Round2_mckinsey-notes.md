# Lumen Round 2: McKinsey variation, pipeline notes

**Built:** 3 Nov 2026.
**Skill:** sruthir28/enterprise-ai-skills. It runs `deck-pipeline` (Strategist → Builder → Critic → Fixer), with `mckinsey-charts` (native python-pptx) and `mckinsey-critic`.

**Files**
- `TeamName_ACC_Round2_mckinsey.pptx`: editable; 148 native objects, 1 native chart, no pictures.
- `TeamName_ACC_Round2_mckinsey.pdf`: exported through PowerPoint; fonts are Arial only.
- `TeamName_ACC_Round2_mckinsey-preview.png`
- `mckinsey-source\`: the builder (`build_mckinsey.py`) and the repo's own `charts.py` (MIT licence included). The check scripts are `fit_export.ps1`, `worddiff.py` and `render.py`.

**Rebuild:** `python build_mckinsey.py out.pptx`, then `fit_export.ps1 -Pptx out.pptx -Pdf out.pdf`.

**Text rule.** Every word is the approved live text. `worddiff.py` compares the slide against `Lumen-v4-marp-source.md`: 707 words before, 707 after, 0 added, 0 removed. The critic's wording fixes are listed at the end and were **not** applied.

---

## 1. Strategist: one-slide storyline

- **Audience:** the ACC Round 2 judges. They score creative / authentic / well-structured, read one slide, and reject Earth-festival copies.
- **Governing thought:** the title, kept as approved: "Lumen's real problem is belonging."

| Layer | On the slide | Role |
|---|---|---|
| Governing thought | Title + subtitle (shared past, place, weekly rhythm) | The answer first |
| Situation | WHAT WE SEE: home alone, empty gatherings, "functional but empty" | Evidence from the case |
| Complication (3 MECE branches) | WHY: no shared past / place / rhythm | Split by time (life, year, week) and scale (family, district, planet) |
| Resolution | The Four Letters / The Carrying / The Hidden Head League | One design per branch, covering the case's three asks |
| Proof per branch | Belonging + Only on Lumen boxes | So-what and the authenticity defence |
| Support | One Lumen year + 7 key assumptions | The calendar fits; every number can be traced |

**Exhibits.** Each shows one thing in blue and everything else in grey.
- **True-scale 0–300 lifeline:** blue from 250 onward.
- **Native stacked bar of the 30 h day:** a blue dusk marker.
- **20 champions:** one blue "?".
- **13 moons:** moon 13 is blue, and a zoom box shows its days 1 to 32.

## 2. Builder: what the skill changed versus v5

- **Colours:** white canvas, navy type, and one highlight (`006EB6`). Everything else is grey, so the three pillar colours are gone ("McKinsey decks don't rainbow").
- **Issue tree:** the title rule is the root, and three navy branches drop to the WHY cells.
- **Layout:** the columns form a table-aligned framework, with hairline rules between the header, exhibit, bullets and Belonging rows.
- **Native chart:** the Carrying day bar is a real PowerPoint chart (right-click → Edit Data), styled with charts.py's `_style_chart` / `_set_series_color`. It has no gridlines, axes or legend.
- **Font:** Arial. charts.py specifies Inter, but PowerPoint cannot see Inter on this laptop.

## 3. Critic: blind review, verbatim

The critic was a separate agent. It saw only the render, the case PDF and the skill; it did not see the storyline.

> **Grade: YELLOW. The thinking is already Green: a tight issue tree, every number reconciles, and each column passes its own authenticity test. The page is not yet as precise as the McKinsey style it borrows. There is an empty band mid-page, four rows are out of line, the smallest text is 7pt, and the brief's headline item (the festival) is the thinnest and most Earth-like column. About one evening of work from Green.**

| Section | Status | Issue (condensed) |
|---|---|---|
| Title band | Green | A claim title that reframes "no culture" as "belonging"; the subtitle gives the answer in column order |
| What we see | Yellow (minor) | "Gatherings are empty" overstates the brief's "close to empty" [WORDING]; blue spent on a label |
| WHY/SO cells | Yellow | Col 2's WHY wraps, so with centre anchoring the WHY/SO lines sit at different heights across the three cells |
| Col 1 exhibit | Yellow | "25 childhood" sits 16pt off its dot; the 225-year gap is not marked [WORDING] |
| Col 1 bullets / Belonging | Green | One bold hook per bullet; the ~8,300 cold-start fix; the 225-year line is uniquely Lumen |
| Col 2 exhibit | Yellow | The 5 h / 10 h ticks mark nothing [WORDING]; the dark-half label is 7pt; it proves timing, not "every door gave" |
| Col 2 bullets / Belonging | Yellow | Only 3 bullets, so a 45pt empty band; "Fire stands for hope and togetherness" is the one generic, Earth-sounding line [WORDING] |
| Col 3 exhibit / bullets | Green | The best exhibit; bullet 3 needs a second read |
| Col 3 Belonging | Yellow (layout) | Centre-anchored, so its text starts 5pt lower than cols 1–2 |
| One Lumen Year | Yellow | Header below the strip; moon 13 drawn 4.7× wide with no zoom cue; text 7.5–8pt |
| Key assumptions | Yellow (form) | A 7.5pt run-on paragraph with 7 blue numbers |
| Overall | Yellow | Uneven vertical spacing; blue used 27 times; the smallest text is 7pt |

**Top 3 fixes**
1. **[WORDING] Make the festival unmistakably Lumen's.** (a) Delete "Fire stands for hope and togetherness." (b) Add a 4th bullet on why Day 1, e.g. that Day 1 is a new moon, so all 100 flames can be seen across the city at once. (c) Extend assumption 2 with "each moon begins at new moon".
2. **[LAYOUT] Close the empty band above the Belonging boxes**, and spend the freed space on legibility: at least 8pt type, assumptions as a numbered list in two sub-columns.
3. **[LAYOUT] Snap the misaligned rows to the grid:** WHY/SO baselines, Belonging anchors, the bottom-band headers, "25 childhood", and the exhibit sub-label row.

**Best layout-only fixes (wording locked):** Fix 2; Fix 3; spend blue only on the argument. Runner-up: equal-width moons with a zoom wedge.

**One thing that works:** the WHY → SO → design → "Only on Lumen" spine. The concentric rings move outward from family to district to planet, and every number on the slide reconciles. "Do not let polish cut the WHY/SO row or the Only-on-Lumen lines."

## 4. Fixer: change log (applied, no words changed)

| # | Before | After |
|---|---|---|
| 1 | Bullets 7.6pt under the exhibit rule; 28–45pt empty above the Belonging boxes | Bullets at 3.47 in; Belonging boxes moved up to 5.24 in; bottom band moved up to 6.07 in. The gap is now about 7pt in cols 1/3 and 24pt in col 2 |
| 2 | Smallest reading text 7pt (dark-half label) and 7.5pt (assumptions, moon labels) | Every reading label is 8pt or larger; only the letter-spaced caps labels stay at 7.5pt |
| 3 | Key assumptions as one 7.5pt run-on paragraph | A numbered list with hanging numbers, items 1–3 under col 2 and 4–7 under col 3, on the grid |
| 4 | WHY/SO centre-anchored, so col 2 was out of line | WHY boxes top-anchored and SO boxes bottom-anchored; all three cells share both baselines |
| 5 | Belonging text centre-anchored, so col 3 started 5pt low | Top-anchored in all three columns |
| 6 | Exhibit labels at 3 different heights; "25 childhood" off its dot | Shared label rows at 2.63 in and 3.16 in; "25 childhood" centred on its dot |
| 7 | ONE LUMEN YEAR caption below the strip | Caption on the band's top line, level with KEY ASSUMPTIONS |
| 8 | Moon 13 drawn 4.7× wide | 13 equal moons (13 in blue) plus a zoom wedge into a "day 1 … day 32" box |
| 9 | Blue on the WHAT WE SEE label and bar, the 7 assumption numbers, and "day 1" | All of those now navy or grey. Blue stays only on: "belonging.", the ring highlights, one mark per exhibit, moon 13, and the three "Only on Lumen:" labels |

## 5. Suggested text changes (NOT applied: your call)

1. **"Gatherings are empty"** → "Gatherings are close to empty". The brief says "community gatherings are close to empty" (checked in `Lumen-Case-Facts.md`).
2. **Carrying Belonging:** drop "Fire stands for hope and togetherness." It is the one generic, Earth-sounding line, and it sits on the idea judges are most likely to match to an Earth festival.
3. **A 4th Carrying bullet on why Day 1.** For example: "Day 1 is a new moon, so on that moonless night all 100 district flames can be seen across the city at once." This uses the brief's astronomical-events fact, which the slide never uses. If you adopt it, add "each moon begins at new moon" to assumption 2.
4. **Lifeline:** add a "225 years" bracket from 25 to 250, so the exhibit proves the "Only on Lumen" line.
5. **"(no history)"** repeats "No shared past"; it could go.
6. **The 5 h / 10 h ticks** carry no meaning; they could be deleted.
7. **A source line** (the skill makes it mandatory): "Source: Mini Case Lumen (ACC Round 2); team analysis", in 9pt grey italic at the bottom.
