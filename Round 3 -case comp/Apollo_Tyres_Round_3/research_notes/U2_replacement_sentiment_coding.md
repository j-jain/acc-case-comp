# U2. Why tractor owners rebuy or switch: a replacement-only coding of public owner voice (8 Nov 2026)
Research note for the replacement-decision analysis of the Apollo Round 3 case. Feeds `..\Replacement_Decision\`. Outside-in; not a survey.

**Files.** Coded corpus: `U2_replacement_sentiment_corpus.csv` (261 rows, one per item, 21 fields, UTF-8). This note summarises it.

**Labels.** [Outside-in count] for anything counted from the corpus; [Interpretation] for my reading; [Not found] for searches that returned nothing usable. Shares are shares of this corpus only. They are not estimates for Indian tractor owners.

**The answer in five lines**

1. Tyre life, stated in hours or years, is the reason owners give for rebuying, rejecting or switching: 109 of 261 items (42%) and 47 of 90 experience reports (52%) [Outside-in count].
2. Owners present the choice as their own. Where someone else is named, it is the tractor dealer when a factory-fitted tyre fails (14 of 44 after-failure items, 32%) and the tyre shop at the point of sale; the mechanic appears once [Outside-in count].
3. Explicit switching stories are rare: three switches and two same-brand rebuys in 261 items. Tyre life decides four of the five and shop stock the fifth; MRF is the destination of three of the five moves where both brands are named [Outside-in count].
4. Apollo draws 42 items, split evenly (14 positive, 13 negative, 15 neutral). Eight mention Apollo as the tyre that came on the tractor, and six of those eight are failure or claim stories. Nobody in the corpus says what he bought when his factory Apollo wore out [Outside-in count].
5. The "first replacement" problem shows up as a gap, not a quote: owners talk about the OE tyre when it fails early and about the replacement brand when it lasts, and the two conversations rarely meet [Interpretation].

---

## 1. Method and sources

**What was already done, and how this differs.** N3 (section Q3) read the top comments under 30 high-view videos (486 comments) and assigned 131 brand-direction codes by theme; Q2 covered purchase occasions from mandi videos. Q6 coded 39 tractor complaints on consumercomplaints.in and found no reviews on tractor portals, and no MouthShut, Reddit or Quora threads. M04 section 5 summarised both. This note builds a new corpus with a narrower rule: an item is coded only if a tractor owner (or someone speaking for one) talks about a replacement tyre decision or experience, or about choosing a replacement brand, and states something that bears on the choice. Bare votes ("Goodyear best"), price-only and location-only asks, and car or bike tyre talk were excluded.

**Sources tried and what they yielded** [Outside-in count]

| Source | What was done | Items coded |
|---|---|---|
| YouTube comments | 58 YouTube search queries (Hindi, Hinglish, Punjabi, Marathi, English); 56 videos not in N3 opened for comments; about 2,410 top-level comments read; one car-tyre video discarded | 218 from 35 videos |
| YouTube video titles and descriptions | About 25 further videos opened for title and description; owner, influencer and dealer videos that state a replacement act or a dealer pitch | 22 |
| Consumer court records (indiankanoon.org) | 4 queries, 3 result pages each; 36 judgments listed; 23 read in part | 19 |
| Portal reviews (Tyreplex) | 15 tractor-tyre URLs checked; only MRF pages show reviews | 2 |
| JustDial | Tractor tyre dealer lists for Karnal and Agra; 3 listings and about 30 reviews read | 0 (no review mentions a tractor) |
| Quora | One English thread loaded without login, no tractor answer; Hindi Quora search asks for login, not pursued | 0 |
| Reddit | Search tool refuses the domain; not reached | 0 |
| Amazon.in | Search for 13.6-28 rear tyres: no Indian tractor tyre listing with reviews | 0 |
| consumercomplaints.in, Voxya | Site search returns the 21 tractor items Q6 already coded (not re-coded); 11 Voxya complaints read, none about a tractor tyre | 0 |
| TractorGyan tyre pages | "Review this Tyre" button, no reviews | 0 |
| Facebook | Not attempted (needs login) | 0 |
| **Total** | | **261** |

**How YouTube was read.** In the in-app browser, on youtube.com, using the page's own data requests (the same request the page sends when a viewer scrolls the comments, and the same search request as the search box). Comments were read in YouTube's default "top comments" order, about 20 per page, five pages per video and up to 14 pages for three long threads. Each comment's ID was kept, so CSV rows from YT058 onward link to the comment itself (`&lc=`); rows YT001 to YT057 link to the video only (corrected 8 November 2026 after the round-8 fact-check). A keyword filter set aside about 360 bare votes; at least 60 more were set aside by hand; every remaining comment was read and coded by hand. Seven N3 videos (938 comments) were re-read only to look for explicit switching statements; none was found and nothing from them is coded. No transcripts were used.

**Budget used.** 9 of 35 standard web searches (one of them refused for Reddit); no WebFetch calls; the browser for everything else. No login, no consent banner accepted, nothing posted or liked.

**Additions to the scheme.** Two replacement statuses were added because they recur: "bought (prior brand not stated)" and "replaced (new brand not stated)". A timing field (planned, after failure, unknown) was added for section 4. OTHER covers grip, size or looks, fuel and gifts. Where a comment under a single-brand video says "this tyre", the brand is taken from the video and the row says so.

**Exclusions.** Five polished English comments on Apollo's own channel that read like seeded praise (for example a Sonalika owner calling the FX 222 "best for puddling operations"), five duplicate cross-posts by the same user, one court case that duplicates a twin judgment, two court cases already used in Q6, one car-tyre court case, and tractor-defect cases with no tyre claim.

**Selection biases.** Commenters choose to speak, and YouTube ranks threads by engagement. One video (Real Agriculture world, MRF vs Goodyear, 3.5 million views) supplies 55 items, 21% of the corpus. Complaint sources and court records carry only failures. Dealer channels and brand channels attract their own audiences. Commenters are self-deciders almost by definition (section 4).

**Recode agreement.** A random 15% (39 items, seed fixed) was recoded from the text and gloss alone, without reading the first codes [Outside-in count]:

| Field | Agreement | Disagreements |
|---|---|---|
| Item type | 38/39 (97%) | 1 (experience report or complaint) |
| Replacement status | 38/39 (97%) | 1 (two tractors on two brands read as a switch) |
| Drivers, exact set | 37/39 (95%) | 2 (OE added once; a bare "rubbish" given LIFE once) |
| Drivers, presence decisions (13 codes x 39) | 505/507 (99.6%) | |
| Who decided | 38/39 (97%) | 1 |
| Timing | 37/39 (95%) | 2 |
| Sentiment by brand | 37/39 (95%) | 2 (a bare purchase video read as + or 0) |
| Occasion | 38/39 (97%) | 1 |

The same coder recoded on the same day with the first codes partly in memory, so this is a consistency check, not inter-coder reliability. It will overstate agreement.

---

## 2. The corpus at a glance

**Items by source and type** [Outside-in count] (base n = 261)

| | Experience report | Recommendation | Question | Complaint | Dealer speaking | Total |
|---|---|---|---|---|---|---|
| YouTube comment | 77 | 63 | 51 | 22 | 5 | 218 (84%) |
| YouTube video | 11 | 2 | 0 | 0 | 9 | 22 (8%) |
| Court record | 0 | 0 | 0 | 19 | 0 | 19 (7%) |
| Portal review | 2 | 0 | 0 | 0 | 0 | 2 (1%) |
| **Total** | **90 (34%)** | **65 (25%)** | **51 (20%)** | **41 (16%)** | **14 (5%)** | **261** |

**Language** [Outside-in count] (n = 261): Hinglish (Hindi in Latin script) 164 (63%); Hindi in Devanagari 46 (18%); English 37 (14%); Punjabi 13 (5%: 9 romanised, 4 Gurmukhi); Gujarati, romanised, 1. Marathi: none. Marathi-language tyre videos carried 0 to 5 comments each; Maharashtra owners appear writing in Hindi and in five court records.

**Brands named** [Outside-in count] (an item can name several; base n = 261)

| Brand | Items | + | − | 0 | Likes on + items | Likes on − items |
|---|---|---|---|---|---|---|
| MRF | 75 (29%); the CSV recount gives 76 rows naming MRF | 35 | 26 | 14 | 127 | 675 |
| Goodyear | 73 (28%) | 45 | 23 | 5 | 839 | 8 |
| BKT | 44 (17%) | 17 | 11 | 16 | 23 | 38 |
| Apollo | 42 (16%) | 14 | 13 | 15 | 10 | 4 |
| CEAT | 10 (4%) | 3 | 7 | 0 | | |
| JK | 8 (3%) | 3 | 3 | 2 | | |
| Alliance | 4 (2%) | 3 | 0 | 1 | | |
| No tyre brand named | 57 (22%) | | | | | |

One comment with 528 likes ("MRF will get stuck in mud, Goodyear will not") drives both the Goodyear-positive and MRF-negative like totals.

**Replacement status** [Outside-in count] (n = 261): not stated 164 (63%); asks for advice 38 (15%); bought, prior brand not stated 28 (11%); intends to replace 17 (7%); replaced, new brand not stated 9 (3%); switched from A to B 3 (1%); replaced with the same brand 2 (1%).

**Occasion** [Outside-in count] (n = 261): not stated 209 (80%); field 16 (6%); haulage or trolley 14 (5%); mixed 13 (5%); puddling 9 (3%).

---

## 3. What drives the replacement choice

**Driver counts** [Outside-in count]. Items can carry up to three codes, so columns do not sum to the base.

| Driver | All items (n = 261) | Experience reports (n = 90) | Complaints (n = 41) | Questions (n = 51) | Switchers (n = 7) | Same-brand rebuys (n = 2) |
|---|---|---|---|---|---|---|
| LIFE | 109 (42%) | 47 (52%) | 15 (37%) | 11 (22%) | 5 | 2 |
| OCCASION | 44 (17%) | 8 (9%) | 2 (5%) | 20 (39%) | 1 | 0 |
| WARRANTY | 39 (15%) | 3 (3%) | 27 (66%) | 3 (6%) | 0 | 0 |
| OE | 35 (13%) | 9 (10%) | 20 (49%) | 3 (6%) | 0 | 1 |
| OTHER (grip, size, looks, fuel, gift) | 28 (11%) | 11 (12%) | 0 | 7 (14%) | 0 | 0 |
| PRICE | 24 (9%) | 9 (10%) | 3 (7%) | 5 (10%) | 0 | 0 |
| BRAND | 15 (6%) | 4 (4%) | 0 | 0 | 1 | 0 |
| VIDEO | 10 (4%) | 4 (4%) | 0 | 5 (10%) | 0 | 0 |
| DEALER | 10 (4%) | 3 (3%) | 3 (7%) | 1 (2%) | 0 | 0 |
| PEER | 5 (2%) | 1 (1%) | 1 (2%) | 2 (4%) | 0 | 0 |
| AVAILABILITY | 4 (2%) | 1 (1%) | 0 | 2 (4%) | 1 | 0 |
| CREDIT | 2 (1%) | 0 | 0 | 1 (2%) | 0 | 0 |
| MECHANIC | 1 (0.4%) | 0 | 1 (2%) | 0 | 0 | 0 |
| No driver stated | 17 (7%) | 13 (14%) | 0 | 4 (8%) | 1 | 0 |

"Switchers" are the three explicit switches plus four owners who say they will move to a different named brand. Both small columns are listed for completeness; they are too small for shares.

**What the table says** [Interpretation on an outside-in count]

- **Life is the currency.** Owners count hours ("Goodyear ... 4800 ghante mera tyre chala hai", gloss: my Goodyear has run 4,800 hours), years ("15 sal to MRF da chlde hun bdln wale hoe a", Punjabi; gloss: MRF has run 15 years, now due for changing) and percentage worn ("6महीने मे 150 घटे 50% घिस गये", gloss: 50% worn in six months and 150 hours, about BKT, 19 likes).
- **Questions are about fit for the job, not brand.** 20 of 51 questions (39%) ask whether a tyre suits puddling, hard soil, road haulage or a mixed duty, for example "trolley or kheti dono me chalana he to konse tyre dalvaye" (gloss: we run trolley and field both, which tyres should we fit?).
- **Complaints are about the claim on the factory tyre.** 27 of 41 complaints (66%) turn on warranty and 20 (49%) on the OE tyre. The court records follow one script: early failure (from four days to 900 hours), a company inspection, rejection on "application related irregular wear" or "Alternate Lug wear", and a forum order months or years later.
- **Price is present but secondary.** 24 items (9%) mention price; three of the four Apollo purchase reports state only what was paid (Rs 35,300 to 37,000 for rears). One owner buys JK because the showroom is dear: "सो रुम वाले बहुत जादा रेट लगाते है तो jk तयार ले लेता है" (gloss: the showroom charges too much, so I take JK).
- **Brand trust crosses categories.** Two owners bought MRF tractor tyres because MRF served them on a motorcycle: "Bike me mrf best hai to maine trector me 13.6.28 ka liya" (gloss: MRF is best on bikes, so I bought it for the tractor). Two others reject CEAT for tractors because of scooter or car tyres.
- **Advice from others is rare in what owners write.** Dealer advice (10, 4%), peers (5, 2%) and mechanics (1) are thin. The peer appears mostly as the audience of a question ("koi mere ko btao", gloss: someone tell me) and once as reassurance after a new-tractor purchase ("comment wale bhaiyo ne bta diya", gloss: the commenters told me Goodyear is better than MRF, 46 likes).

---

## 4. Who decides

**Who decided or influenced** [Outside-in count]

| Who | All items (n = 261) | YouTube comments (n = 218) | Court records (n = 19) | YouTube videos (n = 22) |
|---|---|---|---|---|
| Self / own experience | 159 (61%) | 149 (68%) | 2 (11%) | 6 (27%) |
| Unknown | 50 (19%) | 47 (22%) | 0 | 3 (14%) |
| Tyre dealer | 22 (8%) | 10 (5%) | 3 (16%) | 9 (41%) |
| Tractor dealer | 15 (6%) | 2 (1%) | 13 (68%) | 0 |
| Video / influencer | 10 (4%) | 6 (3%) | 0 | 4 (18%) |
| Peer | 4 (2%) | 4 (2%) | 0 | 0 |
| Mechanic | 1 (0.4%) | 0 | 1 (5%) | 0 |

**By timing** [Outside-in count]

| Who | Planned (n = 62) | After failure, all (n = 44) | After failure, YouTube only (n = 24) | After failure, court only (n = 19) |
|---|---|---|---|---|
| Self | 16 (26%) | 21 (48%) | 19 | 2 |
| Unknown | 25 (40%) | 4 (9%) | 4 | 0 |
| Video | 10 (16%) | 0 | 0 | 0 |
| Tyre dealer | 9 (15%) | 4 (9%) | 0 | 3 |
| Tractor dealer | 0 | 14 (32%) | 1 | 13 |
| Peer | 2 (3%) | 0 | 0 | 0 |
| Mechanic | 0 | 1 (2%) | 0 | 1 |

**Reading** [Interpretation]

- In 82% of experience reports (74 of 90) the owner speaks as the chooser. That is partly built in: people who comment under tyre videos are researching for themselves.
- **Planned purchases** are where video and the tyre shop show up. Owners ask the YouTuber to make a video on a size, to give a shop number, or to quote a price ("Aapka roj video dekhte hain ... alliance ka 13628 ka Do Joda tyre chahie", gloss: we watch your videos daily and need two pairs of Alliance 13.6-28).
- **After a failure** the named intermediary is the tractor dealer, because the failed tyre is usually the factory tyre and the tractor dealer takes the claim. In 13 of 19 court records the owner went first to the tractor dealer, who forwarded the claim to the tyre maker. One tractor dealer told a forum that "decision to sanction warranty claims rest only with tyre manufacturers".
- **The mechanic and the puncture shop are almost silent.** One court record has an owner taking punctured OE CEAT tyres to a local tyre works. No owner in the corpus says a mechanic recommended a brand.
- What owners do not say is who stood at the counter when they paid. 28 purchase reports (27 naming the brand) mention a dealer only for gifts or price; none says "the dealer told me to take it". Whether that is because owners choose or because they do not report the dealer's push cannot be told from public text [Interpretation].

---

## 5. Switching

**From-to matrix where both ends are stated** [Outside-in count] (n = 10 items)

| From | To | Items | Reason codes | Status |
|---|---|---|---|---|
| Goodyear | Goodyear | 2 | LIFE (2), OE (1) | Rebought: OE lasted 11 years, then Goodyear again; Goodyear fitted "for the second time" on a 1997 Swaraj |
| Goodyear | MRF | 1 | LIFE | Switched (Nepal; Goodyear bald in 10 months, MRF half-worn after two years) |
| BKT | MRF | 2 | LIFE (2), BRAND (1), OCCASION (1) | One switched, one intends |
| MRF (wanted) | other, unnamed | 1 | AVAILABILITY | 16.9-28 MRF not in stock in Jabalpur |
| Apollo | any other | 1 | LIFE | Intends: "all four on my tractor burst" |
| OE, brand not stated | bigger size, brand not stated | 2 | OE, OTHER (slip, size) | Replaced the factory tyre soon after purchase |
| OE, brand not stated | new tyres, brand not stated | 2 | WARRANTY, OE | Bought replacements after the claim was not met (court records) |

**Purchases where only the new brand is stated** [Outside-in count] (n = 28): MRF 9, Goodyear 6, BKT 5, Apollo 4, CEAT 1, JK 1, Alliance 1, not named 1. Their codes: PRICE 10, LIFE 7, WARRANTY 4, BRAND 3, DEALER 3, OTHER 3, OCCASION 1, VIDEO 1, none stated 3.

**Stated intentions** [Outside-in count] (n = 17): to BKT 4, MRF 3, Apollo 2, Alliance 1, "any other" 1, brand not stated 6.

**Reading** [Interpretation]. Public owner voice does not narrate switching. Across about 3,350 comments read, including the 938 N3 comments scanned for words such as "pehle", "wapis", "dobara", "is baar" and "badal", fewer than ten describe moving from one named brand to another. Where a move is stated, a life result decides it, in either direction: the tyre that lasted is rebought, the one that wore fast is dropped. MRF is the destination in three of the five brand-to-brand moves; the sample is far too small to read further.

---

## 6. Brand by brand, with Apollo in detail

**Sentiment and reasons by brand** [Outside-in count]

| Brand | Items | Experience reports and complaints: + / − / 0 | Main reasons when positive | Main reasons when negative |
|---|---|---|---|---|
| MRF | 75 | 15 / 12 / 7 (n = 34) | LIFE 24, OCCASION 7, BRAND 5 | LIFE 14 (cracks, hard rubber, lugs break), WARRANTY 7 |
| Goodyear | 73 | 19 / 13 / 1 (n = 33) | LIFE 25, OCCASION 9 (grip in mud), OE 6 | LIFE 19 (fast wear, 100 to 200 hour failures), OE 6, WARRANTY 5 |
| BKT | 44 | 11 / 8 / 5 (n = 24) | LIFE 4, PRICE 2, DEALER 2 | LIFE 9 (dries, wears), WARRANTY 2, PEER 2 |
| Apollo | 42 | 10 / 10 / 4 (n = 24) | LIFE 5, OCCASION 4 (load) | LIFE 8, WARRANTY 5, OE 5 |
| CEAT | 10 | 3 / 2 / 0 (n = 5) | LIFE 3 (one CEAT Samraat "13 saal") | LIFE 4, BRAND 2 (scooter and car tyres) |
| JK | 8 | 2 / 3 / 1 (n = 6) | WARRANTY 1 ("JK replaces on a cut") | WARRANTY 2, OE 2 |

MRF and Goodyear dominate because of one MRF-versus-Goodyear thread; their rivalry is argued on life and on grip in mud. BKT is praised by haulage owners ("mare sare tractars main bkt hai", gloss: all my tractors run BKT, building material haulage) and attacked on drying and wear.

**Apollo** [Outside-in count] (n = 42 items: 35 YouTube comments, 5 court records, 2 videos)

- *Sentiment:* 14 positive, 13 negative, 15 neutral. Among the 24 experience reports and complaints, 10 positive and 10 negative.
- *What positive owners say:* long life ("मेरे पास 2007 से अपोलो के रेडियल टायर डालें अभी 50% ही खत्म हुए है", gloss: Apollo radials since 2007, only 50% worn; "me appolo 10 sal c laga rha hu", gloss: I have fitted Apollo for 10 years), grip, and load ("Kheti ke liye Goodyear, load ke liye appollo", gloss: Goodyear for farming, Apollo for load). Two owners who had used several brands preferred Apollo, without saying why.
- *What negative owners say:* early failure and the dealer's silence ("dealer v Baad ch gl nai sunde", Punjabi; gloss: the dealer does not listen afterwards), cuts on Krishak Gold, and two attacks on the Virat line ("Apollo Virat lekar mat fhsna", gloss: do not get trapped buying Virat; "Esse accha BKT farm 2000 lagao", gloss: better to fit BKT Farm 2000).
- *At replacement time:* four purchase reports, all stating only the price paid (Rs 35,300, 36,000 and 37,000 for rears, and a video of four new tyres); two intentions, one prompted by a video and one asking whether a 9.5-20 front exists; five questions: whether Virat 23 suits paddy (two), how the Power Haul does on hire haulage, how long the warranty runs, and whether Krishak's tread is deeper than Goodyear's. No owner gives a reason for choosing Apollo at replacement.
- *Apollo on the tractor from the factory:* 8 items. One owner asks where to buy a tractor "Apollo Tyre wala" (gloss: fitted with Apollo, not another tyre). One records a Mahindra 575 DI on Apollo. One asks whether a cut on the Apollo of a four-month-old Mahindra Yuvo is under warranty. Five court records describe OE Apollo failing between four days and 900 hours, with the tractor dealer forwarding the claim; one tractor dealer had promised "they will run for 2400 hours". So six of the eight OE mentions are failure or claim stories. None says what the owner bought when the OE Apollo wore out.
- *Under Apollo's own videos:* competitors are recommended in the comments ("Always use Bkt commander", 7 likes; MRF Xtra for the Mahindra Arjun 555), and one dealer complains, in two comments, about Apollo's dealer density ("Each area they apointing more than five dealer"); those two rows are a dealer's view, not a replacement decision (round-8 fact-check).
- *Engagement:* Apollo items carry 28 likes in all (10 on positive, 4 on negative, 14 on neutral), against 839 on Goodyear-positive items alone [Outside-in count].

---

## 7. The dealer and mechanic voice

**Where dealers speak** [Outside-in count] (14 items: 5 comments, 9 dealer videos)

| What the dealer says | Items |
|---|---|
| Price: cheapest pair, "cheaper than second-hand", radial for Rs 33,000 | 4 |
| Brand advocacy (Goodyear 1, MRF 1, BKT 2) | 4 |
| Dealer economics (Apollo dealer density) | 2 |
| Guarantee: the shop's own "cut, burst, dried out: full guarantee"; an Apollo Virat warranty replacement filmed by a Bihar dealer | 2 |
| Credit: "all brands at zero down payment" | 1 |
| Matching the tyre to soil and trolley use | 1 |

Only one dealer says he chooses the brand: a Nagaur (Rajasthan) seller, "जो भी मेरे कस्टमर आते हैं में सब को यह देता हूं" (gloss: whichever customer comes, I give them all this, BKT). The dealer videos sell on price per pair, the shop's guarantee and credit, not on a brand's life record.

**Where owners talk about dealers** [Outside-in count] (7 items): MRF dealers "loot" farmers on a Rs 4,000 front tyre; radial dealers do not answer calls and "at least 50 shops" quote better; the showroom is dearer, so JK; an Apollo dealer "does not listen afterwards"; one buyer asks for a BKT salesman's number; a buyer got no gift from the BKT dealer; another got "700 का क्रिकेट बैट फ्री" (gloss: a Rs 700 cricket bat free) with two BKT tyres in Ranchi, the only item in the corpus that connects cricket and a tyre purchase (the comment does not say whether the shop or BKT gave the bat, and names no decider; its "dealer" code is doubtful, round-8 fact-check).

**Tractor dealers** [Outside-in count] (15 items): 13 court records plus two comments ("Agency wale to bolte hain ki tayre ki gauranty hoti h 1se 6 saal", gloss: the tractor agency says tyres carry a one-to-six-year guarantee). The tractor dealer promises the tyre's life at sale, takes the claim when it fails, and then tells the owner that only the tyre maker decides.

**Mechanics** [Outside-in count]: one item, a puncture repair on OE CEAT. [Not found]: any mechanic or puncture-shop owner speaking about brands.

---

## 8. What this does and does not show [Interpretation]

**It does show, for this corpus:**

- The replacement decision is argued on proven life. A brand is rebought when its tyre lasted and dropped when it wore or failed early. Promotional claims ("India's best") draw scepticism in the comments, and at least three commenters accuse presenters of being paid.
- The factory tyre is the first test, and its failure is handled through the tractor dealer and the tyre maker's engineer. The claim episode produces the strongest negative voice in the corpus, for every OE brand.
- At the point of sale, the tyre shop shapes the choice through stock, price per pair, guarantee and credit, more than through stated advice.
- For Apollo, the factory-fit link shows up mostly in failure stories, and the positive Apollo stories are not tied to the tractor's original tyre. This fits the diagnosis that Apollo is fitted and then not rebought, but it does not prove it.

**It does not show:**

- Any share of owners who rebuy, switch or let a dealer choose. Shares here describe who writes, where, and about what.
- How often the first replacement is planned or forced; 59% of items do not say.
- Whether owners who start on Apollo rebuy Apollo. No item tracks one owner from OE Apollo to his first replacement.
- Whether the cricket jersey has any effect: one cricket mention found in about 3,350 comments read, and it is a free bat with BKT [Outside-in count].

**For the replacement-decision work** [Interpretation]: the evidence points to two moments worth testing directly with owners and dealers. The first is the OE claim (who handles it, how fast, with what result). The second is the purchase at the shop (what is in stock, the price per pair, and the guarantee offered). It also suggests the brand message that travels between owners is a life number in hours or years, not a slogan.

---

## 9. What was looked for and not found [Not found]

- Any owner saying a tyre dealer or a mechanic told him which brand to buy.
- Any owner tracing his own path from a factory-fitted Apollo to his first replacement, in either direction.
- Marathi-language owner comments on tyre choice (Marathi videos carry almost no comments).
- Tractor-tyre reviews on JustDial (reviews read were generic and about cars or shops), Amazon.in, TractorGyan, and any Tyreplex tractor line other than MRF.
- Reddit, Quora (Hindi, behind login) and public Facebook posts on tractor tyre choice.
- New tractor-tyre complaints on consumercomplaints.in beyond the 21 Q6 already coded; tractor-tyre complaints on Voxya.
- Credit as a stated reason for an owner's choice (two items, both a question or a dealer pitch).
- Any link between cricket or the Team India jersey and a tyre choice, apart from one free bat.

For each: Data unavailable – requires primary research or company confirmation.

---

## 10. Cautions

- **Self-selection.** Commenters, complainants and litigants are not typical owners. Court records and complaints contain only failures; video comments skew to the engaged and the aggrieved.
- **Concentration.** 55 items (21%) come from one video; the top five sources give 106 items (41%). Brand counts reflect which threads exist, not market position.
- **Paid and brand content.** Several channels are dealers or sell placements; Apollo, JK and CEAT post their own videos. Five polished, likely seeded comments on Apollo's channel were excluded; others may remain. At least three commenters accused presenters of being paid.
- **One coder.** All coding and the recode were done by one person on one day; agreement figures are a consistency check only. Driver codes for terse comments ("bakwas", useless) involve judgement.
- **Language.** Hinglish, Punjabi and Gujarati spellings are irregular; glosses are mine. No Marathi sample.
- **Duplicates.** Five cross-posts were removed by reading; near-duplicates by different users were kept. A twin court case was counted once.
- **Dates.** YouTube shows relative dates ("2 years ago"), kept as shown; comments span roughly 2018 to 2026, so older items predate current warranties and the GST cut.
- **Names.** Commenters are not named. Individual parties in court records appear as initials. Channel names are kept as the publishers' public handles.
- **Overlap with earlier notes.** N3 coded brand themes in 30 other videos; Q6 coded complaint boards; this corpus avoids both, so the three should be read side by side, not added together.
