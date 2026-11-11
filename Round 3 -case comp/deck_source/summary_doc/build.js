// Builds Apollo_Round3_Research_Summary.docx
const fs = require('fs');
const path = require('path');
const { D, C, FONT, W, runs, P, H1, H2, BUL, SRC, NOTE, TBL, STATS, BOX, COLS, SP, BREAK } = require('./lib');
const { Document, Packer, Paragraph, TextRun, Header, Footer, AlignmentType, LevelFormat, PageNumber, BorderStyle } = D;
const U = require('./urls');

const missing = new Set();
const L = (label, key) => {
  if (U[key]) return `[${label}](${U[key]})`;
  missing.add(key);
  return label;
};

const children = [];
const add = (...xs) => xs.flat().forEach((x) => children.push(x));

// ───────────────────────── PAGE 1: cover + answer ─────────────────────────
add(new Paragraph({ children: [new TextRun({ text: 'ACC CASE COMPETITION · ROUND 3 · RESEARCH SUMMARY', font: FONT, size: 16, bold: true, color: C.accent, characterSpacing: 20 })], spacing: { after: 60 } }));
add(new Paragraph({ children: [new TextRun({ text: 'Apollo Tyres and Team India: winning the tractor owner', font: FONT, size: 44, bold: true, color: C.ink })], spacing: { after: 60 } }));
add(P('Everything researched and analysed to date, in one place. Prepared 7 November 2026.', { size: 19, color: C.muted, after: 160 }));

add(H2('The question'));
add(P('How can Apollo use cricket, including its Team India sponsorship, to become the first tyre brand farmers think of, and turn that into tractor and farm tyre sales in rural India, affordably and measurably?', { italics: true, after: 120 }));

add(H2('Our answer'));
add(BOX([
  '**Apollo’s tractor tyres are fitted at the factory and lost at the first replacement.** Apollo should win that replacement with a guaranteed tyre life and a paid dealer and mechanic, and use the Team India jersey as its mark of trust at the counter.',
  'It costs about **Rs 11 crore to March 2028**, the national offer pays for itself at **one point of market share**, and a four-arm test from **21 January 2027** proves the rest before the sponsorship comes up for renewal.',
]));
add(SP(140));

add(H2('The numbers that carry the case'));
add(STATS([
  ['Rs 3,300 cr', 'Tractor-tyre replacement market a year (range Rs 2,500–4,000 cr)', `estimate, on ${L('CRISIL units', 'tolins')}`],
  ['~9%', 'Apollo’s share of that market, against ~20% in car tyres', `estimate, on ${L('Motilal note', 'motilal')}`],
  ['Rs 33 cr', 'Revenue from each extra point of replacement share', 'estimate'],
  ['14.8%', 'Apollo’s share of tractor-tyre searches; MRF 47%', `proxy: ${L('Google Trends', 'trends')}, 8 states`],
]));
add(SP(60));
add(STATS([
  ['6%', 'Farm’s share of Apollo India revenue (~Rs 1,200 cr), not the 8–10% in the brief', `verified: ${L('CRISIL', 'crisilApollo')}`],
  ['38%', 'Owners who chose the tyre brand on their new tractor', `${L('J.D. Power 2018', 'jdp')}`],
  ['Rs 1,255', 'Cost of the full offer per extra rear tyre (~9% of price)', 'estimate'],
  ['Rs 11 cr', 'Total spend to March 2028; worst case loses ~Rs 10 cr', 'estimate'],
]));
add(SP(140));

add(H2('How to read this document'));
add(P('Purple text is a link to the source. Small grey tags give the strength of each figure: **verified** (primary source read, or two sources); **1 source**; **press** (reported, not confirmed by the parties); **proxy** (our own count from public data, not a survey); **estimate** (our arithmetic on sourced figures and stated assumptions); **forecast**. Where no reliable figure exists the text says so. Full register of 396+ sources: file 17 of the research set.', { size: 17 }));
add(SP(60));
add(TBL(['Section', 'What it covers', 'Page'], [
  ['1. Apollo today', 'Company, farm business, facts that correct the brief', '2'],
  ['2. The market', 'Size, Apollo’s position, value of a share point, supply', '3'],
  ['3. Where the tractors are', 'States, districts, the 30 first-wave districts', '4'],
  ['4. The farmer and the purchase', 'Segments, decision journey, what owners say', '5'],
  ['5. Competitors', 'MRF, Goodyear, BKT, CEAT, JK: share claims, cricket, price, warranty', '6'],
  ['6. Cricket and the sponsorship', 'Rights, search data, rivals’ cricket, calendar, what to back', '7'],
  ['7. Trends to 2028 and what we do not know', 'Demand, media, policy; open questions', '8'],
  ['8. Our solution', 'The full plan on one page', '9'],
  ['9. Economics, test and first 100 days', 'Business case, gates, timeline, risks', '10'],
], [2.2, 5.2, 0.6], { size: 16, numeric: [2] }));

// ───────────────────────── PAGE 2: Apollo today ─────────────────────────
add(BREAK());
add(H1('Apollo Tyres today', '1'));
add(TBL(['Metric', 'Figure', 'Source'], [
  ['Group revenue, FY26', 'Rs 28,471 cr (+9.0%); EBITDA margin 14.6%; PAT Rs 1,372 cr {verified}', L('Q4 FY26 investor deck', 'q4deck')],
  ['India (standalone) revenue, FY26', 'Rs 19,816 cr; India is 63% of group revenue {verified}', L('Q4 FY26 deck', 'q4deck') + ' · ' + L('FY26 annual report', 'ar26')],
  ['Latest quarter, Q2 FY27 (Jul–Sep 2026)', 'Revenue Rs 7,968 cr (+16.7%); net profit Rs 292 cr (+13.3%); operating margin ~11% {1 source}', L('Q2 FY27 results coverage', 'q2fy27')],
  ['Farm share of India revenue', '6% in FY26 (5% in FY24 and FY25) = about Rs 1,200 cr {verified}', L('CRISIL rating, Aug 2026', 'crisilApollo')],
  ['India channel mix, FY26', 'Replacement 63% · tractor/vehicle makers 24% · exports 13% {verified}', L('CRISIL rating, Aug 2026', 'crisilApollo')],
  ['Farm sales that are replacement', '"Only approximately 25%" (broker note of a meeting with management, 27 Dec 2025) {1 source}', L('Motilal Oswal note', 'motilal')],
  ['Dealer network', 'About 6,500 dealerships; Rs 1,315 cr of dealer deposits (~Rs 20 lakh each) {1 source}', L('CRISIL rating', 'crisilApollo')],
  ['Advertising and promotion, FY26', 'Rs 524 cr standalone, up 38% with the jersey deal; to return to "around 2.5% plus" of sales {verified}', L('Q4 FY26 call', 'q4call')],
  ['Farm capacity', 'Farm named among categories in shortage (Feb 2026); plants above 90%; the Rs 5,810 cr expansion is for car and truck tyres {verified}', L('Q3 FY26 call', 'q3call') + ' · ' + L('capex', 'capex')],
  ['Tractor-maker customers', 'Mahindra is the only one confirmed; it held 43.6% of tractor sales in Jan–Mar 2026 {1 source}', L('Mahindra share', 'mahindraShare')],
  ['Farm warranty', '7 years on manufacturing defects, all farm tyres {verified}', L('Apollo warranty page', 'apolloWarranty')],
  ['Rural push already under way', 'Head of Rural Sales; "One District, One ARD"; 25 rural mobile stores planned; rural van pilot from 20 May 2026 {verified}', L('FY26 annual report', 'ar26') + ' · ' + L('rural van', 'ruralVan')],
], [2.3, 5.3, 2.0], { size: 16, boldFirst: true }));
add(SP(80));

add(H2('Farm range'));
add(P('**Virat** (20 lugs, field and road) · **Virat 23** (hard soil) · **Krishak Gold** (entry) · **Farm King** radial (340/85 R28) · **FX 222** (wet paddy) · **Dhruv** · steel-breaker rear tyres added in FY26 for stubble and stony ground. Apollo also sells Vredestein farm tyres in Europe. The Dutch plant at Enschede stopped production on 30 June 2026, and some farm output is moving to India.', { size: 18 }));
add(SRC(`${L('FY26 annual report', 'ar26')} · ${L('Motilal note (Dutch farm output, outsourcing)', 'motilal')}`));

add(H2('Five facts that correct the case brief'));
add(TBL(['The brief, or the common belief', 'What the evidence shows', 'Source'], [
  ['Farm is 8–10% of Apollo’s revenue', '6% of India revenue in FY26; 8–10% is a 2019 figure {verified}', L('CRISIL', 'crisilApollo')],
  ['The sponsorship costs Rs 579 cr', 'Reported by the press; neither Apollo nor the BCCI has confirmed it {press}', L('Press report', 'press579')],
  ['The deal comes with wide rights', 'Only the jersey logo is confirmed. The BCCI named Muthoot FinCorp home title sponsor on 26 Sep 2026 {verified}', L('Apollo', 'bcci') + ' · ' + L('Business Today', 'muthoot')],
  ['Rivals win on the new tractor', 'About three-quarters of Apollo’s farm sales go to tractor makers and export (read from the 25%): Apollo is on the new tractor and loses the owner at replacement {estimate}', L('Motilal', 'motilal')],
  ['Farmers’ tyre buying is well studied', 'No published study of how Indian farmers buy tractor tyres was found; the closest is J.D. Power 2018 {verified that none exists}', L('J.D. Power 2018', 'jdp')],
], [2.4, 5.0, 2.2], { size: 16 }));

// ───────────────────────── PAGE 3: the market ─────────────────────────
add(BREAK());
add(H1('The market and Apollo’s position', '2'));
add(H2('Domestic tractor tyres, million units'));
add(TBL(['', 'FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24'], [
  ['To tractor makers', '3.5', '3.1', '3.9', '3.8', '4.3', '3.8'],
  ['Replacement', '2.8', '2.2', '2.3', '3.5', '3.7', '**3.9**'],
  ['**Total**', '6.3', '5.2', '6.2', '7.4', '8.0', '**7.7**'],
  ['Replacement share', '44%', '42%', '37%', '47%', '46%', '**51%**'],
], [2.6, 1, 1, 1, 1, 1, 1], { size: 16, numeric: [1, 2, 3, 4, 5, 6] }));
add(SRC(`CRISIL industry report (Aug 2024) in the ${L('Tolins Tyres prospectus', 'tolins')} {1 source}. Exports a further 5.6 m (large tyres for Europe and the US); imports negligible. CRISIL outlook FY29: 8.5–12 m tyres, replacement 4–6 m {forecast}.`));

add(COLS([
  H2('What the replacement market is worth'),
  BUL('**About Rs 3,300 cr a year** at manufacturers’ prices (range Rs 2,500–4,000 cr): 3.9–4.6 m tyres × ~Rs 8,500 average {estimate}'),
  BUL(`Rear 13.6-28 retails at Rs 16,000–17,700; front 6.00-16 at Rs 3,000–3,600 {portal prices}`),
  BUL('No source gives the market in rupees; vendor reports differ fourfold and are not used'),
  BUL(`Tractors sold FY26: 11.6 lakh wholesale (+23.5%); retail above 10 lakh for the first time {1 source} ${L('Autocar Pro', 'autocarTractor')}`),
  BUL('Working tractors ~8.5 m (7–11 m); each buys ~0.5 tyres a year, ~Rs 3,900 {estimate}'),
], [
  H2('Where Apollo stands'),
  BUL(`About **25%** of Apollo’s farm sales are replacement, against **51%** for the industry (CRISIL units) ${L('Motilal', 'motilal')}`),
  BUL('That puts Apollo at **~9%** of replacement (7–12%), against **20–21%** in car tyres and **~29%** in truck-bus radials {estimate}'),
  BUL(`J.D. Power 2018 (3,768 owners): only **38%** chose the tyre on their new tractor; after uneven wear only **18%** would buy that brand again ${L('J.D. Power', 'jdp')}`),
  BUL(`Published scores: MRF 848, CEAT 830, Goodyear 828 (average 834). **Apollo not among them** ${L('MRF release', 'mrfJdp')}`),
], 0.5));
add(SP(60));
add(BOX(['**Diagnosis.** Apollo is on the tractor when it leaves the factory, then is not sought, not vouched for and not bought. The break is between the factory and the first replacement.'], { size: 18 }));
add(SP(60));

add(H2('What a point of share is worth'));
add(TBL(['Gain in replacement share', 'Extra revenue a year', 'Extra contribution a year (30%)', 'Tyres a year'], [
  ['1 point', 'Rs 33 cr', 'Rs 10 cr', '~42,000'],
  ['3 points (9% to 12%)', 'Rs 100 cr', 'Rs 30 cr', '~126,000'],
  ['6 points (to 15%, half the gap to its car-tyre share)', 'Rs 200 cr', 'Rs 60 cr', '~250,000'],
  ['11 points (to 20%, its car-tyre share)', 'Rs 360 cr', 'Rs 110 cr', '~460,000'],
], [3.6, 1.6, 2.2, 1.4], { size: 16, numeric: [1, 2, 3] }));
add(NOTE('All estimates. The 30% contribution assumes raw materials at ~55% of revenue (mid-2026) plus 12–15% other variable costs.'));

add(COLS([
  H2('Supply limits the prize'),
  BUL('Six points needs ~9,300 tonnes a year: 1.3% of Apollo’s 732,097 t output'),
  BUL('Building it new would cost Rs 430–790 cr for Rs 60–110 cr a year: **no new line**'),
  BUL('Instead: dealer priority when short, farm output moving from the Dutch plant, outsourced entry tyres, small debottlenecking'),
], [
  H2('The wider rural wallet'),
  P(`Rural share of new-vehicle sales, FY26 ${L('FADA', 'fada')}:`, { size: 18, after: 40 }),
  BUL('Tractors **81.0%** · two-wheelers 57.8% · commercial 48.9% · cars 39.7%'),
  BUL('Tractor tyres are about a fifth of the rural tyre wallet at the same dealers; one rear tyre is worth ~5 motorcycle tyres'),
], 0.5));

// ───────────────────────── PAGE 4: where ─────────────────────────
add(BREAK());
add(H1('Where the tractors are', '3'));
add(TBL(['State', 'Rural households with a tractor', 'Owner households', 'Registrations FY26', 'Men: TV weekly', 'Men: no regular media', 'Men: used internet'], [
  ['Uttar Pradesh', '5.6%', '~14.3 lakh', '1,46,811', '42.0%', '45.4%', '59.1%'],
  ['Madhya Pradesh', '7.6%', '~8.4 lakh', '1,20,956', '47.7%', '43.6%', '55.7%'],
  ['Rajasthan', '8.3%', '~7.9 lakh', '1,30,540', '43.6%', '41.3%', '65.2%'],
  ['Punjab', '**13.9%**', '~4.7 lakh', 'n/a', '54.8%', '36.1%', '**78.2%**'],
  ['Gujarat', '6.7%', '~4.5 lakh', '92,529', '55.2%', '33.5%', '52.6%'],
  ['Maharashtra', '3.3%', '~4.4 lakh', '1,46,810', '64.5%', '22.3%', '52.9%'],
  ['Haryana', '**9.9%**', '~3.0 lakh', 'n/a', '52.7%', '36.6%', '72.4%'],
  ['**India**', '3.9%', '~65.6 lakh', '10,30,895', '55.9%', '31.6%', '51.2%'],
], [1.8, 1.5, 1.3, 1.4, 1.2, 1.4, 1.3], { size: 15, numeric: [1, 2, 3, 4, 5, 6], boldFirst: true }));
add(SRC(`${L('NFHS-5 (2019–21)', 'nfhs')} {verified}; household counts are our estimate on 2011 counts; registrations from transport-ministry data via ${L('a tractor portal', 'regStates')} {1 source}`));

add(COLS([
  H2('What the data says'),
  BUL('**UP, MP and Rajasthan hold 47% of owner households**; Punjab and Haryana are dense but only 12%'),
  BUL(`**The prize is spread out:** the 20 largest districts take only **11.5%** of registrations (99,915 of 8,69,874, FY25) ${L('Tractor Gyan', 'regTop20')}`),
  BUL(`Registrations overstate working tractors by ~1.5×: Haryana had 4.53 lakh registered, 3.02 lakh in use ${L('Haryana Statistical Abstract', 'haryanaAbstract')}`),
  BUL('**TV cricket reaches fewest men where owners are most numerous:** in UP 42% of men watch TV weekly and 45% see no regular media'),
  BUL('So the offer must be **national**; field teams go only to dense tehsils'),
], [
  H2('Largest districts on official counts'),
  TBL(['Haryana, tractors in use 2022-23', 'Count'], [
    ['Sirsa', '32,309'], ['Hisar', '28,587'], ['Bhiwani', '24,373'], ['Sonipat', '19,487'], ['Fatehabad', '19,175'], ['Jind', '18,587'],
  ], [2.6, 1], { size: 15, numeric: [1], w: 4050 }),
  P(`Punjab, tractors per 1,000 ha sown: Sri Muktsar Sahib 123, Moga 120, Patiala 118; state 81 ${L('Punjab Statistical Abstract 2025', 'punjabAbstract')}`, { size: 15, before: 60 }),
  P('A district of 30,000 working tractors is a replacement market of ~Rs 12 cr a year; one point there is ~Rs 12 lakh {estimate}', { size: 15 }),
], 0.56));
add(SP(60));

add(H2('The first wave: 30 districts in three belts'));
add(TBL(['Belt', 'Districts', 'Why'], [
  ['**Cotton belt** (Punjab, Haryana, Rajasthan)', 'Bathinda, Mansa, Sri Muktsar Sahib, Sangrur, Barnala, Fazilka; Sirsa, Fatehabad, Hisar; Hanumangarh, Sri Ganganagar', 'Dense, irrigated, large tractors; Apollo’s weakest search state (8–9% in Punjab); village cricket documented'],
  ['**Rohilkhand and western UP**', 'Bareilly, Badaun, Pilibhit, Shahjahanpur, Rampur, Moradabad, Aligarh', 'Most owners; small holdings; lowest TV reach; the brief’s own example'],
  ['**Rajasthan and Madhya Pradesh**', 'Bikaner, Nagaur, Jodhpur, Alwar, Chittorgarh; Shivpuri, Vidisha, Raisen', 'Largest registrations in Hindi-speaking states; hard soil for Virat 23'],
  ['**Haryana**', 'Bhiwani, Jind, Karnal, Sonipat', 'Official counts of 18,000–24,000 each'],
], [2.2, 4.2, 3.6], { size: 15 }));
add(NOTE('Our selection, to be confirmed on Apollo’s billing and dealer data. Gujarat and Maharashtra (Banaskantha, Nashik, Ahmednagar) join in wave two with Gujarati and Marathi material.'));

// ───────────────────────── PAGE 5: customer ─────────────────────────
add(BREAK());
add(H1('The farmer and the purchase', '4'));
add(H2('Who buys: segments sized by tyre purchases'));
add(TBL(['Segment', 'Who', 'Owners', 'Tractor hours (tyre wear)', 'How they buy', 'Priority'], [
  ['**A. Heavy users**', 'Medium and large farms; owners who hire out and haul; 600–1,000 hours a year', '~4 in 10', '**~two-thirds**', 'Planned, before the season; in pairs; count hours', '**1**'],
  ['**B. Light users, first-hand tractor**', 'Semi-medium farms; ~350 hours a year', '~3 in 10', '~a quarter', 'Rarely, often when a tyre fails; lean on shop and mechanic', '2'],
  ['**C. Small owners, second-hand tractor**', 'Marginal and small farms; under 250 hours', '~3 in 10', '~a tenth', 'On price: cheap pairs, retreads, used tyres', 'Not targeted'],
  ['**D. New-tractor buyers**', '~11 lakh a year', '–', 'None for years', 'Tyres come fitted; six in ten do not choose them', 'Via tractor makers'],
  ['**E. Fleets**', 'Hiring centres, contractors', 'Small', 'Small, rising', 'On cost and service', 'Key accounts'],
], [2.1, 2.6, 0.9, 1.2, 2.4, 1.1], { size: 15 }));
add(SRC(`Punjab cotton-belt survey of 520 households: hours a year from 73 (marginal) to 977 (large); 64% of tractors bought second-hand ${L('Kaur, J. National Development, 2024', 'kaur')} {1 source}. Agriculture is 70–75% of tractor demand, the rest construction ${L('CRISIL Ratings, Apr 2025', 'crisil7075')}. Shares of hours stand in for tyre purchases; sizes are indicative.`));

add(COLS([
  H2('Two ways a tyre is bought'),
  BUL('**Planned** (heavy users, before the season): two or three brands considered (the one on the tractor, the one neighbours praise, the one the shop pushes); advice from owners, the mechanic and videos; decided at the usual shop on pair price, guarantee and credit'),
  BUL('**Urgent** (a tyre fails in season): the mechanic decides repair, retread or replace; bought at the nearest shop with stock'),
  P(`McKinsey’s ${L('consumer decision journey', 'mckCDJ')}: brands in the first consideration set are up to **3×** more likely to be bought; **two-thirds** of touch points in evaluation are word of mouth, the shop and past experience.`, { size: 17, before: 40 }),
], [
  H2('Where Apollo drops out'),
  TBL(['Stage', 'Apollo', 'Leader'], [
    ['On the new tractor', '~3/4 of farm sales to makers and export', 'Goodyear: 6 tractor makers'],
    ['In mind (search share)', '~14%', 'MRF ~47%'],
    ['Rated by owners (J.D. Power)', 'Not published', 'MRF 848'],
    ['Praised with reasons', '19 positive, 13 with no reason', 'Goodyear 29, MRF 20'],
    ['Bought at replacement', '~9%', 'Not published'],
  ], [1.8, 1.5, 1.5], { size: 15, w: 4600 }),
], 0.5));
add(SP(60));

add(H2('What owners, dealers and mechanics say'));
add(P('We read 486 top comments under 30 high-view Hindi and Punjabi videos on choosing tractor tyres; 131 judge a brand {proxy, one coder, not a survey}.', { size: 18 }));
add(COLS([
  BUL('**Tyre life** (in hours or years) is the commonest reason to praise or reject a brand'),
  BUL('**"The dealer refused the claim"** recurs across MRF, JK, BKT and Apollo'),
  BUL('About 23% of comments ask a price or where to buy; rear tyres are priced **by the pair**'),
  BUL('Loyalty is to a **shop** more than a brand; one request for a tyre that works on field and road drew 141 likes'),
], [
  BUL(`J.D. Power 2018: **durability** matters most and is rated lowest; **42%** got only a one-year tyre warranty on a new tractor ${L('J.D. Power', 'jdp')}`),
  BUL('A cheap tier sits below the brands: new rear pairs advertised at **Rs 16,000** (branded pair Rs 32,000–35,000); retreads Rs 6,000–8,500; second-hand "from Rs 700" (16 lakh views)'),
  BUL(`GST on retreaded tractor tyres fell from 18% to 5% on 1 Nov 2026 ${L('GST notice', 'retreadGst')}`),
], 0.5));

// ───────────────────────── PAGE 6: competitors ─────────────────────────
add(BREAK());
add(H1('Competitors', '5'));
add(TBL(['Brand', 'Farm position', 'Cricket', 'Warranty', 'Rear 13.6-28 price'], [
  ['**MRF**', `No.1 in J.D. Power 2018 (848), biggest lead on durability; searched 3× as often as Apollo ${L('MRF', 'mrfJdp')}`, `Bats of India’s top batters (Tendulkar; Kohli since 2014; Gill from 2025); pace academy since 1987 ${L('MRF cricket', 'mrfCricket')}`, `6 years ${L('MRF policy', 'mrfWarranty')}`, 'Rs 17,500–17,670'],
  ['**Goodyear**', `Original supplier to six tractor makers; "~30% share" (broker, 2022) ${L('HDFC Securities', 'hdfcGoodyear')}; farm ~half its revenue {analyst estimate, unverified}`, 'None', '6 years {portal}', 'Rs 16,999–17,440'],
  ['**BKT**', `Farm specialist; claims "over 20%" of India’s agri market (2026) ${L('EVO India', 'bktEvo')}`, `Tyre partner to 8 of 10 IPL teams, 2026 ${L('BKT IPL', 'bktIpl')}`, '–', '–'],
  ['**CEAT**', 'About 10% of revenue from farm; search share rising (8.9% to 10.8%)', `Cricket ratings since 1995; IPL strategic time-out since 2015 ${L('CEAT cricket', 'ceatCricket')}`, `7 years (made from Jan 2019) ${L('CEAT policy', 'ceatWarranty')}`, '–'],
  ['**JK Tyre**', 'Few owner comments; "claims not heard"', 'None found', '–', '–'],
  ['**Apollo**', '~9% of replacement; ~14% of searches', 'Team India lead sponsor since Sep 2025', `7 years ${L('Apollo', 'apolloWarranty')}`, '**Rs 16,000–16,400** (Krishak Gold)'],
], [1.1, 3.2, 3.0, 1.4, 1.5], { size: 15 }));
add(SRC(`Prices from ${L('tractor portals', 'portal')}, viewed 6 Nov 2026. Share figures are company or broker claims; no neutral share table exists.`));

add(COLS([
  H2('What this means'),
  BUL('**No neutral market-share figure for farm tyres is public.** Vendor market sizes differ fourfold (USD 270 m to 1.2 bn)'),
  BUL('**Warranty length does not separate brands:** Apollo 7, CEAT 7, MRF 6, all on defects only, pro-rata'),
  BUL('**Apollo already lists 6–10% below MRF and Goodyear.** A price cut is unaffordable and unnecessary'),
  BUL('**Cricket already belongs to other tyre brands** for 30 years: a new logo on the shirt can be credited to a rival'),
  BUL('No rival has published results of a farmer-marketing programme, and no case of retaliation in farm tyres was found'),
], [
  H2('Industry context'),
  BUL(`Replacement ~50% of all tyre volumes, OEM ~25%, exports ~25%; top six makers ~85% of a ~Rs 1.36 lakh cr sector ${L('CRISIL, Aug 2026', 'crisilTyre26')}`),
  BUL('FY27 tyre margins dip from ~14.2% to ~12% as input costs rise 35–40% {forecast}'),
  BUL(`Apollo, MRF, CEAT, JK and Birla held "over 90%" of production; the CCI fined them for cartelisation ${L('CCI order', 'cci')}`),
  BUL(`GST on tractor tyres cut from 18% to 5% on 22 Sep 2025 ${L('report', 'gst')}`),
], 0.5));
add(SP(60));
add(H2('Price per hour, not price per tyre'));
add(TBL(['Tyre', 'Price', 'Cost per hour at 1,500 h', 'At 2,000 h', 'At 2,500 h'], [
  ['Cheap market-channel tyre', 'Rs 8,000', 'Rs 5.33', 'Rs 4.00', 'Rs 3.20'],
  ['Apollo Krishak Gold', 'Rs 16,000', 'Rs 10.67', 'Rs 8.00', 'Rs 6.40'],
  ['MRF Shakti Super', 'Rs 17,670', 'Rs 11.78', 'Rs 8.84', 'Rs 7.07'],
], [2.6, 1.2, 1.8, 1.2, 1.2], { size: 15, numeric: [1, 2, 3, 4] }));
add(NOTE('Estimate. At equal life Apollo is ~9% cheaper per hour than MRF; it needs owners to believe its life is equal, not longer. Tyre life (1,500–4,000 h) is a maker claim; no Indian measurement exists.'));

// ───────────────────────── PAGE 7: cricket ─────────────────────────
add(BREAK());
add(H1('Cricket and the sponsorship', '6'));
add(TBL(['The deal', 'Figure', 'Source'], [
  ['Role and term', 'Lead (jersey) sponsor of Team India, September 2025 to March 2028 {verified}', L('Apollo announcement', 'bcci')],
  ['Reported fee', 'Rs 579 cr (~Rs 230 cr a year) {press}', L('Press report', 'press579')],
  ['Farm’s fair share', '~Rs 14 cr a year at 6% of India revenue; ~Rs 16 per working tractor {estimate}', '–'],
  ['Confirmed rights', 'Jersey logo only; contract not public. Home title sponsor is Muthoot FinCorp (26 Sep 2026) {verified}', L('Muthoot', 'muthoot')],
  ['Rights used so far', '"Champions offer", 7 Dec 2025–31 Mar 2026: match tickets, meeting players, fan shirts. **For car and motorcycle tyre buyers only; farm not mentioned** {1 source}', L('Apollo terms page', 'champions')],
], [1.8, 5.6, 2.2], { size: 16, boldFirst: true }));
add(SP(60));

add(COLS([
  H2('Has the jersey moved farm demand?'),
  TBL(['Share of tractor-tyre searches', 'Before', 'After', 'Change'], [
    ['MRF', '47.3%', '47.3%', '0.0'],
    ['BKT', '19.5%', '19.6%', '+0.1'],
    ['**Apollo**', '**14.0%**', '**14.8%**', '**+0.8**'],
    ['CEAT', '8.9%', '10.8%', '+1.9'],
    ['Goodyear', '10.4%', '7.6%', '−2.8'],
  ], [2.2, 1, 1, 1], { size: 15, numeric: [1, 2, 3], w: 4600 }),
  NOTE(`Our ${L('Google Trends', 'trends')} count, eight states; before = 1 Sep 2024–15 Sep 2025, after = 16 Sep 2025–5 Nov 2026 {proxy}. CEAT gained more without a jersey: no jersey effect is visible in farm.`),
], [
  H2('What the evidence on recall says'),
  BUL(`Tyre brands were the 2nd most recalled sponsor category among IPL viewers in 2025, ~1 in 3 recalled one ${L('report', 'iplRecall')} {1 source}`),
  BUL(`IPL viewers linked sponsors to the wrong team 8–17% of the time (2026 study) ${L('study', 'misattrib')} {1 source}`),
  BUL('**No recall study of any Team India jersey sponsor has ever been published.** Apollo can be the first to know'),
  BUL(`McKinsey, ${L('"Is sports sponsorship worth it?"', 'mckSponsor')}: sponsors spent $0.50–1.60 on activation per $1 of rights. For farm: Rs 7–22 cr a year`),
], 0.5));
add(SP(60));

add(H2('The cricket calendar against the farm calendar'));
add(TBL(['Window', 'Cricket', 'Farm', 'Use'], [
  ['21 Jan–3 Mar 2027', `Five home Tests v Australia ${L('BCCI', 'calendarAus')}`, 'Wheat standing; buying follows Apr–Jun', '**Launch the test**; match days at dealers'],
  ['10 Mar–15 May 2027', `IPL (not Apollo’s; India not playing) ${L('IPL', 'ipl2027')}`, 'Wheat harvest', 'No cricket activity'],
  ['2 Oct–21 Nov 2027', `Men’s ODI World Cup, southern Africa ${L('ICC', 'wc2027')}`, 'Paddy and cotton harvest; buying', 'Second window; **Team India marks only** (ICC owns World Cup marks)'],
  ['Early 2028', 'England Tests in India (reported)', 'Wheat standing', 'Last home window before renewal'],
], [1.6, 3.0, 2.3, 2.9], { size: 15 }));
add(SP(60));

add(H2('What to back, test and drop'));
add(TBL(['Back (cheap, at the point of sale)', 'Test (in the cricket arm)', 'Drop (costly, unproven)'], [
  ['"Team India’s sponsor" on dealer boards, guarantee cards and tyre labels', 'Match days at dealers during India’s matches', 'Farm TV advertising (slots are not in the rights)'],
  ['Tickets, team shirts, player meetings as rewards for dealers and mechanics, tied to registered sales', 'Support for one existing village tournament per tehsil', 'Player or ex-player appearances'],
  ['Hosting tractor makers and large dealers at home Tests', 'Tickets vs cash of equal value as the trade reward', 'New Apollo-built tournaments and finals days'],
  ['Short Hindi and Punjabi videos on tyre life, with the sponsor’s mark', '', 'IPL team deals (rivals crowd them)'],
], [3.4, 3.1, 3.1], { size: 15 }));
add(SP(40));
add(H2('Village cricket is already organised'));
add(BUL(`CricHeroes scored **4.87 m** matches in 2025, **68.6%** of them tennis-ball, with 1.24 crore active players (a metro-led app; no rural split) ${L('CricHeroes', 'cricheroes')} {1 source}`));
add(BUL(`In Sirsa, the Chakkan tournament drew **52 teams** from Haryana, Punjab and Rajasthan; a tournament at Badopal (Fatehabad) paid its winner **Rs 1.70 lakh** ${L('Tribune India', 'villageCricket')} {1 source}`));
add(BUL('So Apollo should **support tournaments that already exist** rather than build its own: the test’s cricket arm backs one per tehsil'));

// ───────────────────────── PAGE 8: trends + unknowns ─────────────────────────
add(BREAK());
add(H1('Trends to 2028 and what we do not know', '7'));
add(TBL(['Trend', 'What is happening', 'What it means for tyres', 'Source'], [
  ['Tractor sales flatten', 'FY26 a record (11.6 lakh, +23.5%); FY27 forecast 0–2% (CRISIL) and 1–4% (ICRA) {forecast}', 'New-tractor fitment flat; the large 2018-19 cohort is now due for replacement', L('Autocar Pro', 'autocarTractor') + ' · ' + L('CRISIL', 'crisilTractor27')],
  ['A hard farm year', '2026 monsoon ~13% below normal; rural FMCG volumes −5% (Apr–Jun 2026) {verified; 1 source}', 'Owners stretch tyres, retread, delay; credit matters more than price', L('UNI (monsoon)', 'monsoon') + ' · ' + L('NielsenIQ', 'nielsen')],
  ['Bigger tractors', '41–50 hp is nearly two-thirds of sales; farm-radial share last measured at 2–3% (2009)', 'Larger, more valuable tyres, slowly', L('Tractor mix', 'hpMix')],
  ['Phones everywhere, internet thin', '94.2% of rural homes have a phone; 49 internet subscriptions per 100 rural people vs 129 urban', 'Phone is the channel for registration, rewards and claims', L('Phone data', 'phones') + ' · ' + L('TRAI', 'trai')],
  ['TV shifts to free and connected', '193 m TV homes (2025); free TV 53 m; pay TV ~83 m by 2028 {forecast}', 'Free-to-air carriage decides the jersey’s rural reach', L('FICCI-EY 2026', 'ficci')],
  ['The dealer stays the shop', 'No agri-commerce platform found selling tractor tyres; Apollo rural van pilot from May 2026', 'Physical availability and the dealer’s word decide', L('Apollo van', 'ruralVan')],
  ['Policy', 'GST on tractor tyres 18% to 5% (Sep 2025); retreads to 5% (Nov 2026); mechanisation aid moving to hiring centres {partly unverified}', 'Price gap to retreads narrows; fleet buyers grow', L('GST', 'gst')],
], [1.6, 3.6, 2.8, 1.6], { size: 15, boldFirst: true }));
add(SP(80));

add(H2('Comparable programmes'));
add(BUL(`**Trelleborg** (Europe, Feb 2026): up to 5,000 hours of tread wear guaranteed on large tractor radials; credit for unused hours; proof by a photo of the hour meter. **No hours guarantee exists in India** ${L('Trelleborg terms', 'trelleborg')}`));
add(BUL(`**Castrol** mechanics’ programme: 1.5 lakh users by Sep 2019, reimbursing ~Rs 6 cr a month (~Rs 400 a user) ${L('Castrol', 'castrol')}`));
add(BUL(`**Dealer economics:** the only rated tyre distributor found (multi-brand, not a farm dealer) earned a 6.99% operating margin in FY20 ${L('CARE Ratings', 'celite')}; a dealer keeps ~Rs 630–1,000 on a Rs 16,400 rear tyre after 60 days’ stock {estimate}`));
add(BUL(`**Indian farmers** remain optimistic and increasingly digital, per McKinsey’s 2025 farmer survey ${L('McKinsey', 'mckFarmers')}`));
add(SP(80));

add(H2('What we do not know (and who can settle it)'));
add(TBL(['Unknown', 'Why it matters', 'How to settle it'], [
  ['**Apollo’s replacement share of farm sales** (the 25%)', 'The whole case turns on it: if much higher than 9%, cut to the offer alone', 'Apollo’s own books, in a week'],
  ['Tyre life in Indian conditions, by brand', 'Sets the guarantee’s hours', 'Apollo wear data; a two-year university trial'],
  ['Real dealer margins, credit terms, rivals’ schemes', 'Sizes the dealer reward', 'Survey of 40 dealers and 60 mechanics'],
  ['Guarantee claim rates', 'The 2% reserve is an assumption', 'Claims in the test'],
  ['Reach of cricket among tractor owners', 'Whether the jersey reaches the buyer', 'Owner survey, three waves'],
  ['Rights in the contract beyond the logo', 'Tickets, marks on labels, screenings', 'Apollo legal team, November 2026'],
  ['Dealers stocking farm tyres, by district', 'Where the offer can run', 'Apollo distribution data'],
], [2.8, 3.6, 2.8], { size: 15 }));
add(NOTE('For each: Data unavailable – requires primary research or company confirmation.'));

// ───────────────────────── PAGE 9: THE SOLUTION ─────────────────────────
add(BREAK());
add(H1('Our solution: "Lambi Paari", the long innings', '8'));
add(BOX(['**Stop asking cricket to sell the tyre.** Sell tyre life with a guarantee, pay the dealer and mechanic who advise the owner, and use the jersey for the two things only the sponsor has: **standing at the counter** and **rewards for the trade**. Start with owners whose tractors left the factory on Apollo tyres.'], { size: 17 }));
add(SP(70));

const s = 16; // solution page font size
const SB = (t) => BUL(t, { size: s, after: 30 });
const SH = (t) => new Paragraph({ children: [new TextRun({ text: t, font: FONT, size: 18, bold: true, color: C.accent })], spacing: { before: 70, after: 30 }, keepNext: true });
add(COLS([
  SH('1. The owner’s offer'),
  SB('**Lambi Paari guarantee** on rear Virat and Virat 23 first: a stated number of hours of tread life, set from Apollo’s own wear data (2,000 h used here only for arithmetic)'),
  SB('**If it falls short:** credit for the unused hours toward a new Apollo tyre, paid **at the home dealer within 7 days**, on the dealer’s own authority up to a cap'),
  SB('**Conditions:** registered at purchase with a photo of the hour meter; pressure checked at a health camp once a season. Season-based version where there is no meter. Excludes cuts, impact, quarry and mining'),
  SB('**Price held:** Krishak Gold Rs 16,000–16,400 vs MRF Rs 17,500+; no cut'),
  SB('**Harvest-timed credit:** six months on a rear pair via a small-ticket finance partner; Apollo absorbs ~Rs 750 of interest a tyre'),
  SB('**Exchange:** old tyres credited as retread casings (paid by the retreader). No gifts'),
  SB('**First replacement:** list tractor models fitted with Apollo at the factory; find them through tractor dealers’ service records and health camps; offer a returning-owner credit'),
  SH('2. The trade'),
  SB('**Mechanic:** Rs 300 per rear tyre referred, paid to his phone when the buyer registers (a pair = 2–8% of a month’s pay)'),
  SB('**Dealer:** Rs 400 per rear tyre above his baseline (+40–60% on what he keeps) and extended stock credit in the two buying seasons'),
  SB('**Cost per extra rear tyre: Rs 1,255** = 300 mechanic + 400 dealer + 225 credit + 280 guarantee reserve + 50 registration (~9% of Rs 14,200 realisation); it still leaves ~Rs 3,000 contribution'),
], [
  SH('3. The jersey’s job'),
  SB('**"Team India’s sponsor"** next to the word Apollo on ~2,000 dealer boards, the guarantee card and the tyre label'),
  SB('**Tickets, team shirts, player meetings** as rewards for dealers and mechanics, tied to registered sales'),
  SB('**Host tractor makers and big dealers** at home Tests (they drive three-quarters of farm sales)'),
  SB('**Short Hindi and Punjabi videos** on tyre life, with the sponsor’s mark'),
  SB('**Test only:** match days at dealers; one existing village tournament per tehsil. **Drop:** farm TV ads, player appearances, new tournaments'),
  SH('4. Brand and product'),
  SB('"Apollo" leads every rural use (**Apollo Virat**); no play on the word Virat; no player image without clearance'),
  SB('Virat leads (field and road); Virat 23 for hard soil; steel-breaker for stubble; FX 222 for paddy; Krishak Gold as entry with credit; Farm King radial only for the highest-hour users'),
  SH('5. Where and when'),
  SB('**Offer: national**, at every farm-tyre dealer, from October 2027 if Gate 1 passes'),
  SB('**Field engine** (coordinator, home dealer, 11 mechanics, 2 health camps a year): only tehsils with 5,000+ working tractors, run through Apollo’s rural sales team with car and bike tyres'),
  SB('**Test:** 30 districts, ~116 tehsils, from **21 Jan 2027** (first home Test v Australia); buying seasons Apr–Jun and Oct–Dec 2027; World Cup Oct–Nov 2027'),
], 0.5, { divider: true }));
add(SP(60));
add(TBL(['Layer', 'Cost', 'Pays for itself if it adds', 'Gate and decision'], [
  ['**National offer**', 'Rs 7 cr a year + Rs 1 cr one-time boards', '1 point of national share (~9,700 rear pairs a year)', '**Gate 1, Aug 2027:** +2 points in offer-only tehsils, claims within 2% → national in Oct 2027'],
  ['**Field engine**', 'Rs 1.31 lakh fixed (Rs 2.06 lakh full) per tehsil', '4.7 points in a 5,000-tractor tehsil (one more rear pair a fortnight)', '**Gate 2a, Jan 2028:** +5 points → fund 200 dense tehsils in FY29'],
  ['**Cricket layer**', 'Rs 1.2 lakh per tehsil', '3.0 more points', '**Gate 2b, Jan 2028:** +3 points → fund in field tehsils; else keep only the mark and rewards'],
], [1.4, 2.1, 2.6, 3.5], { size: 14 }));
add(SP(50));
add(COLS([
  SH('6. What we measure'),
  TBL(['Measure', 'Source', 'Use'], [
    ['**Apollo farm replacement sales per tehsil**', 'Apollo billing, monthly, 24-month baseline', 'Decides the gates'],
    ['Unaided first mention of Apollo', 'Owner survey: Jan, Jul, Dec 2027', 'Explains the result'],
    ['Belief that Apollo lasts as long as MRF', 'Owner survey', 'Explains'],
    ['Guarantee claim rate', 'Claims system', 'Within 2%; pause at 4%'],
    ['Apollo-fitted tractors replacing with Apollo', 'Health-camp register', 'First-replacement baseline'],
    ['Dealer and mechanic recommendation', 'Mystery visits', 'Explains'],
  ], [2.2, 1.9, 1.4], { size: 14, w: 4650 }),
], [
  SH('7. Decisions asked of management'),
  TBL(['Decision', 'By'], [
    ['Confirm the 9% and set the guarantee hours from Apollo’s own data', '20 Nov 2026'],
    ['Ring-fence ~300 t of farm tyres for the test; no new farm line', '4 Dec 2026'],
    ['Approve Rs 2.8 cr now; Rs 11 cr in four tranches to March 2028', 'Nov 2026'],
    ['Launch the four-arm test', '**21 Jan 2027**'],
    ['Gate 1: take the offer national at +2 points', 'Aug 2027'],
    ['Gate 2: field teams at +5 points, cricket at +3', 'Jan 2028'],
  ], [3.6, 1.1], { size: 14, w: 4650 }),
], 0.5));

// ───────────────────────── PAGE 10: economics + plan ─────────────────────────
add(BREAK());
add(H1('Economics, test and the first 100 days', '9'));
add(COLS([
  H2('What one extra tyre leaves (Rs)'),
  TBL(['', 'Rear', 'Front', 'Rear + front pairs'], [
    ['Apollo’s realisation', '14,200', '2,860', '34,120'],
    ['Contribution at 30%', '4,260', '858', '10,236'],
    ['Cost of the offer', '1,255', '50', '2,610'],
    ['**Net contribution**', '**3,005**', '**808**', '**7,626 (22%)**'],
  ], [1.9, 0.9, 0.9, 1.5], { size: 15, numeric: [1, 2, 3], w: 4600 }),
  P('One point of national share = Rs 33 cr revenue = **Rs 7.4 cr net contribution** a year.', { size: 16, before: 60 }),
], [
  H2('Spending (Rs cr)'),
  TBL(['', 'FY27', 'FY28', 'FY29'], [
    ['Set-up, test, surveys, team', '2.5', '4.8', '–'],
    ['National offer', '–', '2.75', '7.0'],
    ['Field engine + cricket (200 tehsils)', '–', '–', '0 to 6.7'],
    ['Contingency, 10%', '0.25', '0.75', '0.7 to 1.4'],
    ['**Total**', '**2.8**', '**8.3**', '**7.7 / 12.2 / 15.1**'],
  ], [2.2, 0.7, 0.7, 1.3], { size: 15, numeric: [1, 2, 3], w: 4600 }),
  P('About **Rs 11 cr to March 2028**: ~2% of one year’s A&P, under farm’s ~Rs 14 cr yearly share of the jersey.', { size: 16, before: 60 }),
], 0.5));
add(SP(40));

add(H2('Three cases'));
add(TBL(['', 'Low', 'Base', 'High'], [
  ['What passes its gate', 'The offer only', 'Offer + field engine', 'Offer + field + cricket'],
  ['Replacement share at March 2029 (today ~9%)', '~10.5%', '~12.5%', '~14.5%'],
  ['Extra revenue, FY29', 'Rs 33 cr', 'Rs 82 cr', 'Rs 132 cr'],
  ['Result at March 2028, cumulative', '−Rs 9.5 cr', '−Rs 7.3 cr', '−Rs 3.6 cr'],
  ['Result in FY29 alone', '−Rs 0.3 cr', '+Rs 6.2 cr', '+Rs 14.4 cr'],
  ['Result at March 2029, cumulative', '−Rs 9.8 cr', '−Rs 1.1 cr', '**+Rs 10.8 cr**'],
], [3.4, 1.7, 1.9, 2.0], { size: 15, numeric: [1, 2, 3] }));
add(NOTE('Estimates on stated assumptions, not forecasts. No case pays back by March 2028; the base case recovers its outlay early in FY30. The gates cap the loss at ~Rs 10 cr. Biggest swings: the share gain (1.5 points gives −Rs 1.2 cr in FY29; 3.5 points +Rs 13.6 cr) and the margin on extra tyres (outsourced at 20%: −Rs 2.0 cr).'));

add(COLS([
  H2('The four-arm test'),
  BUL('30 districts; in each, four tehsils drawn by lot: **0** nothing new · **1** offer · **2** offer + field engine · **3** all of that + cricket', { size: 16 }),
  BUL('Each arm gets the **roll-out version at roll-out cost**', { size: 16 }),
  BUL('Market towns 25 km apart; every registration records the village, so cross-buying is counted', { size: 16 }),
  BUL('Detects ~1.6–2.6 points of share; 40 owners a tehsil surveyed in Jan, Jul and Dec 2027', { size: 16 }),
  BUL('Gates set at the higher of full-cost break-even and what the test can detect; independent review before each', { size: 16 }),
], [
  H2('The first 100 days'),
  TBL(['When', 'Work'], [
    ['9–20 Nov 2026', 'Pull Apollo’s farm data (channel, district, fitment, wear, capacity); read the contract'],
    ['23 Nov–4 Dec', 'Supply for the test; set the guarantee hours; survey 40 dealers, 60 mechanics'],
    ['7–18 Dec', 'Draw tehsils; legal opinion; approve marks; finance and survey partners; build the claims system'],
    ['21 Dec–1 Jan 2027', 'Brief dealers; enrol mechanics; print cards and boards'],
    ['4–18 Jan', 'Baseline survey; billing baseline; dry run in two tehsils'],
    ['**21 Jan 2027**', '**Launch** with the first Test v Australia'],
  ], [1.3, 3.2], { size: 14, w: 4900 }),
], 0.47));
add(SP(50));

add(H2('Main risks and guards'));
add(TBL(['Risk', 'Guard'], [
  ['Farm tyres are short and the test starves', 'Supply decided first; fill rate tracked weekly; only Apollo-made tyres go under the guarantee'],
  ['The guarantee is abused (tampered meters, loose settlement)', 'Photo at registration and claim; cap per dealer; quarry use excluded; pause if claims pass 4% in a month'],
  ['Rights do not allow marks on labels or match screenings', 'Contract and approvals in weeks 1–6; the offer works without them'],
  ['Rivals match the trade terms', 'Do not follow on price; settle claims faster than anyone (half the gain lost = −Rs 3.0 cr in FY29)'],
  ['A weak farm year hides the effect', 'Every arm shares the same districts, so the comparison holds'],
], [3.4, 6.2], { size: 15 }));
add(NOTE('Full detail, every source and every assumption: the research set (files 01–17) and the analysis files M00–M10 in Apollo_Tyres_Round_3.'));

// ───────────────────────── document ─────────────────────────
const doc = new Document({
  creator: 'Team',
  title: 'Apollo Tyres: Round 3 research summary',
  styles: { default: { document: { run: { font: FONT, size: 19, color: C.body } } } },
  numbering: { config: [{ reference: 'bul', levels: [
    { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 260, hanging: 200 } }, run: { color: C.accent } } },
    { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 520, hanging: 200 } } } },
  ] }] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 900, left: 1134, right: 1134, header: 500, footer: 450 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Apollo Tyres · Round 3 · Research summary', font: FONT, size: 14, color: C.muted })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: C.muted })] })] }) },
    children,
  }],
});

const out = process.argv[2] || path.join(__dirname, 'summary.docx');
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(out, buf);
  console.log('wrote', out, buf.length, 'bytes');
  if (missing.size) console.log('MISSING URL KEYS:', [...missing].join(', '));
});
