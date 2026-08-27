# CDS General Knowledge — catalog fit survey

**Purpose.** Find where `scripts/cds-gs/catalog.json` (8 subjects · 59 chapters · 246 subtopics,
mirrored from the NDA General-Ability taxonomy) does NOT fit the CDS GK corpus, before scaling
from the 1-paper pilot to 19 papers.

**Method.** Four papers sampled across the decade — CDS (II) 2016, CDS (II) 2021, CDS (I) 2023,
CDS (II) 2025. Source PDFs are scanned images with **no text layer at all** (verified: `get_text()`
returns 0 characters on every page of all four), so pages were rendered at 2.4x with PyMuPDF and
read as images. **33 question pages read, ≈190 questions examined**, spread through each paper
rather than clustered at the front. `CDS GK 2018 I.pdf` was deliberately not opened (pilot paper,
being transcribed concurrently).

**Sampling bias — read this before using the subject mix.** Pages were deliberately weighted
toward the middle and back of each paper, where Polity, Economics, History and Defence cluster.
Only one page near the front of each paper was read. Physics, Chemistry and Biology are therefore
**under-represented below relative to the real papers**. The mix is a guide to *where the gaps are*,
not a blueprint for question counts.

---

## 1. Proposed catalog additions

Ordered by strength of evidence. Every proposal below carries **two or more verbatim examples**.
Single-example observations are quarantined in §4 and are **not** proposed.

### 1.1 Economics — the largest gap by a wide margin

Economics currently has **1 chapter and 3 subtopics** (`Indian Economy`: Five Year Plans ·
Government Schemes — Agriculture and Livestock · International Trade and Finance). Of the ~17
economics questions sampled, **only one** (2016-II Q110, NAFTA members) had a genuine home.
CDS asks textbook microeconomics, money and banking, public finance and national-income
statistics — none of which exists in the catalog.

#### NEW CHAPTER — `Microeconomics — Demand, Supply and Market Structure`

Proposed subtopics:
- `Basic Economic Concepts and Opportunity Cost`
- `Demand, Supply and Elasticity`
- `Market Structures and Types of Firms`

Evidence:

> **CDS (II) 2021, Q47** — "Which one of the following may lead to movement along the demand
> curve of a commodity ? (a) Change in its price (b) Change in price of the other commodities
> (c) Change in income of the consumer (d) Change in tastes and preferences of consumers"

> **CDS (II) 2021, Q48** — "Which one of the following is the opportunity cost of a chosen
> activity ? (a) Out of pocket cost (b) Out of pocket cost plus cost incurred by the Government
> (c) Value of all opportunities forgone (d) Value of next best alternative that is given up"

> **CDS (II) 2021, Q70** — "Which one of the following is a typical example of monopolistic
> competition ? (a) Retail vegetable markets (b) Market for soaps (c) Indian Railways
> (d) Labour market for software engineers"

> **CDS (II) 2025, Q71** — "Which one among the following pairs of type of firm and feature is
> **not** correctly matched ? (a) Oligopoly firm : Interdependence in decision-making
> (b) Monopolistic firm : Firm is a price setter (c) Monopoly firm : Produces an efficient level
> of output (d) Perfectly competitive firm : Produces socially optimum output"

#### NEW CHAPTER — `Money, Banking and Public Finance`

Proposed subtopics:
- `Money, Inflation and Price Behaviour`
- `Banking, RBI and Financial Institutions`
- `Taxation and GST`
- `Union Budget and Fiscal Policy`

Evidence:

> **CDS (II) 2016, Q107** — "In India, the term 'hot money' is used to refer to (a) Currency +
> Reserves with the RBI (b) Net GDR (c) Net Foreign Direct Investment (d) Foreign Portfolio
> Investment"

> **CDS (II) 2016, Q108** — "Which of the following is/are credit rating agency/agencies in India?
> (a) CRISIL (b) CARE (c) ICRA (d) All of the above"

> **CDS (II) 2021, Q71** — "Following the Constitution (One Hundred and First Amendment) Act,
> 2016, the Parliament of India enacted quite a few GST Acts in the year 2017. Which one of the
> following does **not** fall in this category ? (a) The Central Goods and Services Tax Act …"

> **CDS (II) 2025, Q72** — "Union Budget 2025 increased the Sectoral cap of FDI to 100 per cent
> from 74 per cent for : (a) Telecom Sector (b) Power Sector (c) Defence Sector (d) Insurance
> Sector"

> **CDS (II) 2025, Q73** — "The practice of reducing the size of a product while maintaining its
> sticker price is called : (a) Shrinkflation (b) Reflation (c) Disinflation (d) Deflation"

#### NEW CHAPTER — `National Income, Growth and Development Indicators`

Proposed subtopics:
- `National Income and Sectoral Composition`
- `Poverty, Employment and Human Development`
- `Economic Curves, Indices and Statistical Reports`

Evidence:

> **CDS (II) 2016, Q106** — "Which one of the following statements is correct with respect to the
> composition of national income in India? (a) The share of manufacturing sector has declined
> (b) The share of services sector has increased sharply (c) The share of agriculture has remained
> static (d) The share of services sector has declined"

> **CDS (II) 2021, Q69** — "Match List I with List II … List I (Curve): A. Lorenz curve
> B. Phillips curve C. Engel curve D. Laffer curve — List II (Indication): 1. Inflation and
> employment 2. Tax rates and tax revenue 3. Inequality in distribution of income or wealth
> 4. Income and proportion of expenditure on food"

> **CDS (I) 2023, Q96** — "According to the National Multi-dimensional Poverty Index (MPI)
> constructed by the NITI Aayog, a household is considered deprived if 1. a single member of the
> household is identified as under-nourished 2. the body mass index of a woman member, between
> 15 years and 49 years of age, is below 18.5 kg/m²"

> **CDS (II) 2025, Q79** — "Consider the following statements regarding Annual Periodic Labour
> Force Survey (PLFS) report 2023 – 24 by the National Statistical Organization (NSO) : 1. The
> agriculture sector remains dominant in employment, with its share rising from about 44 per cent
> in 2017 – 18 to about 46 per cent in 2023 – 24. …"

> **CDS (II) 2025, Q118** — "Which one of the following is a good statistic to evaluate where an
> economy stands in the financial cycle ? (a) Tax/GDP Ratio (b) Fiscal Deficit/GDP Ratio
> (c) Household Consumption/GDP Ratio (d) Credit/GDP Ratio"

---

### 1.2 Polity — three new subtopics under existing chapters

Polity's four chapters are structurally sound; three recurring CDS topics simply have no slot.

#### NEW SUBTOPIC — `Citizenship`
Under existing chapter `Indian Constitution — Making, Foundation and Amendments`.

> **CDS (II) 2016, Q69** — "A citizen of India will lose his or her citizenship if he or she
> 1. renounces Indian citizenship 2. voluntarily acquires the citizenship of another country
> 3. marries a citizen of another country 4. criticizes the Government"

> **CDS (I) 2023, Q95** — "The Citizenship Act, 1955 deals with the determination of citizenship
> on or after (a) 26th January, 1950 (b) 26th November, 1949 (c) 15th August, 1947
> (d) 14th August, 1947"

(A third, weaker instance: CDS (II) 2016 Q57 lists "Citizenship" among the provisions that came
into effect on 26 November 1949.)

#### NEW SUBTOPIC — `Emergency Provisions`
Under existing chapter `Indian Constitution — Making, Foundation and Amendments`.

> **CDS (II) 2016, Q96** — "Under Article 352 of the Constitution of India, an emergency can be
> declared if security of any part of India is threatened by 1. war 2. external aggression
> 3. armed rebellion 4. internal disturbance"

> **CDS (II) 2021, Q92** — "Which one of the following is **not** a circumstance for proclamation
> of Emergency by the President of India under Article 352 of the Constitution of India ?
> (a) War (b) External aggression (c) Internal disturbance (d) Armed rebellion"

Note both papers set essentially the same question nine years apart — this is a fixed CDS staple,
not a one-off.

#### NEW SUBTOPIC — `Statutory Bodies and Post-Independence Legislation`
Under existing chapter `Government Structure — Parliament, Judiciary and Constitutional Bodies`.

The catalog covers *constitutional* bodies and *colonial-era* Acts (History → Modern India →
"British Administration, Acts and Legislation"), but nothing for post-1947 statutes and the
non-constitutional agencies that enforce them.

> **CDS (II) 2016, Q97** — "Which one of the following statements is **not** true of the Protection
> of Women from Domestic Violence Act, 2005? (a) This Act provides civil remedies to protect a
> woman subjected to domestic violence. …"

> **CDS (II) 2016, Q111** — "Which of the following are constitutional provisions and laws for the
> protection of the rights of the Scheduled Castes in India? 1. Article 17 of the Constitution of
> India 2. The Protection of Civil Rights Act, 1955 3. The Scheduled Castes and the Scheduled
> Tribes (Prevention of Atrocities) Act, 1989"

> **CDS (II) 2021, Q72** — "Which one of the following is **not** correct in respect of Directorate
> of Enforcement ? (a) It is a specialized financial investigation agency under the Department of
> Revenue, Ministry of Finance. (b) It enforces the Foreign Exchange Management Act, 1999.
> (c) It enforces the Prevention of Money Laundering Act, 2002. …"

---

### 1.3 Defence — two new subtopics under the existing chapter

The suspicion was correct but the shape is specific. `Current Affairs → Defence and Military
Exercises` has four subtopics: Defence Awards/Books/Institutions · Defence Procurement and
Cooperation · Indian Navy — Ships, Vessels and Naval Policy · Military Exercises — Bilateral and
Multilateral.

**The exercise subtopic works well** (CDS (I) 2023 Q86 — the Surya Kiran Indo-Nepal jungle-warfare
exercise — lands cleanly). **The Navy subtopic works well** (CDS (II) 2025 Q112 — INS *Arnala*
anti-submarine warfare craft). What is missing is (a) an Army/Air Force equivalent for equipment,
and (b) anywhere at all for *operations* and *force organisation*, which "Exercises" is not.

#### NEW SUBTOPIC — `Armed Forces — Organisation, Commands and Operations`

> **CDS (II) 2016, Q99** — "Which one of the following is **not** correct in respect of Andaman and
> Nicobar Command? (a) It is the first integrated theatre command in India. (b) Its headquarters is
> at Port Blair. (c) It is commanded by a three-star officer. (d) It was set up by the British
> during the Second World War."

> **CDS (II) 2025, Q111** — "Which one of the following military operations was **not** undertaken
> by India ? (a) Operation Ablaze (b) Operation Spider's Web (c) Operation Trident
> (d) Operation Bandar"

#### NEW SUBTOPIC — `Weapon Systems, Missiles and Military Aircraft`

> **CDS (II) 2016, Q54** — "Which one of the following does **not** signify a battle tank?
> (a) T–55 (b) T–155 (c) T–72 (d) T–90"

> **CDS (II) 2021, Q105** — "Pinaka, developed in India, is a (a) battle tank. (b) multi-barrel
> rocket launcher. (c) anti-tank guided missile. (d) armoured utility vehicle."

> **CDS (II) 2021, Q107** — "What is the range capability of Agni-P Ballistic Missile ?
> (a) 1,000 – 2,000 km (b) 2,000 – 3,000 km (c) 3,000 – 4,000 km (d) 4,000 – 5,000 km"

*Honest caveat.* `Current Affairs → Science and Technology → DRDO, Defence and Marine Technology`
could absorb Pinaka and Agni-P. It cannot absorb the T-72 battle-tank question, which is pure
equipment recognition with no technology or current-affairs content. If the new subtopic is
adopted, decide explicitly whether DRDO-developed systems go here or stay under S&T, or the two
will split arbitrarily.

---

### 1.4 Physics — a new chapter for electronics and computing

Four **consecutive** questions in CDS (II) 2025 (Q81–Q84) are textbook computer science. Nothing
in the catalog covers them. The nearest slot, `Current Affairs → Science and Technology →
Information Technology and Railway Safety`, is a current-affairs subtopic — filing a 2's-complement
arithmetic question there would be wrong on both axes.

#### NEW CHAPTER — `Electronics and Computer Fundamentals` (under **Physics**)

Proposed subtopics:
- `Number Systems and Boolean Logic`
- `Computer Hardware, Software and Networking`
- `Semiconductors, Diodes and Transistors`

Evidence for `Number Systems and Boolean Logic`:

> **CDS (II) 2025, Q83** — "Assuming the computer is a 4-bit computer, what result is produced after
> subtraction of 3 from 5 using the 2's complement representation ? (a) 0101 (b) 10010 (c) 1101
> (d) 11001"

> **CDS (II) 2025, Q84** — "Which one of the following is **not** a logical operator ? (a) NOT
> (b) OR (c) AND (d) Division"

Evidence for `Computer Hardware, Software and Networking`:

> **CDS (II) 2025, Q81** — "Which language uses the symbolic representation of machine codes needed
> to program a particular processor or processor family ? (a) Machine Language (b) Assembly Language
> (c) High-Level Language (d) All of the above"

> **CDS (II) 2025, Q82** — "What are the uses of software ports ? 1. Connect client computer to
> server 2. Connect external devices to computer 3. Identify different services like email, file
> transfer 4. Connecting peripherals like cameras, scanners"

Evidence for `Semiconductors, Diodes and Transistors` is **single-instance** and therefore weak —
see §4. It is included in the proposal only because it is the natural sibling of the other two and
costs nothing; drop it if you prefer a strict two-example rule.

*Placement note.* Physics is proposed as the host because the catalog has no better one and
because semiconductors genuinely are physics. The alternative — a new subject — was ruled out per
the brief. If the corpus turns out to carry a large computing block in every recent paper (only
2025-II was observed to), revisit whether it deserves its own subject.

---

### 1.5 Geography — one new subtopic

#### NEW SUBTOPIC — `Disaster Management and Hazards`
Under existing chapter `Earth's Structure, Landforms and Geological Time`.

> **CDS (II) 2021, Q96** — "An avalanche is a type of which one of the following disasters ?
> (a) Atmospheric (b) Terrestrial (c) Aquatic (d) Biological"

> **CDS (II) 2021, Q95** — "The extent of damage caused by earthquake is **not** influenced by which
> one of the following ? (a) Strength of earthquake (b) Population density (c) Type of building
> (d) Climate of the area"

Q96 is a pure disaster-classification question with no physical-geography content — "Landforms and
Mass Movements" would file it by its *subject matter* (snow moving downhill) and lose what it is
actually testing. Q95 is arguable: it could sit under `Earthquakes and Seismic Waves`, but it asks
about *vulnerability* (population density, building type), not seismology. Both examples come from
the same paper, which is a weaker basis than the Economics or Polity proposals above.

---

## 2. Where the existing catalog fits fine

These subjects were **examined and found adequate** — this is a result, not an omission.

| Subject | Verdict | Basis |
|---|---|---|
| **Chemistry** | **Fits.** No gap found. | ~4 questions. Thermal decomposition of lead nitrate (2023-I Q13), oxidation reactions (2023-I Q14), soda-acid fire extinguisher (2023-I Q49), diluting concentrated nitric acid (2023-I Q50) — all landed cleanly on existing subtopics. Small sample; front-of-paper pages were under-sampled. |
| **Biology** | **Fits.** No gap found. | ~5 questions. Population vs community (2021-II Q16), double circulation (2021-II Q17), external digestion in fungi (2021-II Q18), insulin (2016-II Q22), endemic/epidemic/pandemic (2021-II Q97). Small sample. |
| **Physics** | **Fits for classical physics.** Gap is confined to electronics/computing (§1.4) and possibly elasticity (§4). | ~13 questions. Resistors in parallel, r.m.s. domestic supply, fission/fusion, wave types, kinematics, sound-wave speed, electrical power, gamma decay, Planck's-constant dimensions, mercury-column pressure — all fit. |
| **History** | **Fits.** No gap found — the strongest fit of any subject. | ~37 questions, the second-largest block sampled. Harappan, Sangam *tinai*, Prayaga Prashasti, Mahabhashya, Jain Acharyas, Vijayanagara travellers, Sufi biographies, Akbar's *farman*, Permanent Settlement, Dastak/Dadni, Ghadar Movement, Cripps Mission, Self-Respect Movement, Quit India martyrs, Tashkent Agreement — every one had a home. |
| **Geography** | **Fits, apart from disasters (§1.5).** | ~28 questions. Plate tectonics, Richter scale, glacial troughs, wind-erosion landforms, soils, Indian rivers and lakes, state boundaries, ports, forest cover, Golden Quadrilateral, power plants, climate classification, GMT/longitude, gas planets — all fit. |
| **Polity** | **Structurally sound.** Four chapters are the right shape; three subtopics missing (§1.2). | ~38 questions, the largest block sampled. Writs, fundamental rights and duties, Article 12 'State', schedules, zonal councils, Union/State/Concurrent lists, Article 368, Constituent Assembly, ECI and electoral rolls, Panchayati Raj reservations, NCST, DPSP, NAM, totalitarianism — all fit. |
| **Current Affairs** | **Fits well, and is the best-designed part of the mirrored taxonomy.** Only Defence (§1.3) needs widening. | ~42 questions. Its eight chapters absorbed world leaders, ministries, WHO certifications, Gandhi Peace Prize, UNESCO sites, Durand Cup, Olympics, Sahitya Akademi, National Education Policy, SWAYAM, U-WIN, PGI, SDG India Index, Wassenaar Arrangement, ASEAN/APEC/EU, international days, Indian-origin astronauts — with no strain. |

---

## 3. Rough subject mix

**Based on ≈190 questions across 33 pages** of four papers. Not extrapolated to a whole paper —
and see the sampling-bias warning at the top: the front of each paper (science-heavy) was
deliberately under-read.

| Subject | Approx. count in sample | Notes |
|---|---|---|
| Polity | ~38 | Largest block. Heavily sampled by design. |
| Current Affairs | ~42 | Includes ~8 defence/military questions. |
| History | ~37 | |
| Geography | ~28 | |
| Economics | ~17 | Against a 3-subtopic catalog — the core finding. |
| Physics | ~13 | Under-sampled. |
| Biology | ~5 | Under-sampled. |
| Chemistry | ~4 | Under-sampled. |
| **Computer Science / IT** | **~4** | **Has no catalog home at all.** All four from CDS (II) 2025, Q81–Q84. |

Two shape observations that a per-paper plan will need:

- **The Current Affairs tail is a 2021-onward feature, not a constant.** In CDS (II) 2021, (I) 2023
  and (II) 2025 the last ~15–20 questions are a near-solid Current Affairs block. CDS (II) 2016 has
  **no such tail** — it ends on Polity at Q120, with its current-affairs questions scattered
  (Q48, Q98, Q99).
- **Subjects are interleaved, and the order moves year to year.** There is no fixed section
  boundary. 2016 runs science → geography → polity → economics; 2025 opens with history and polity
  (Q11–17), returns to history at Q51–70, does economics at Q71–79, computing at Q81–84, geography
  at Q90–102, then defence and current affairs. **Do not build a question-number → subject mapping.**

---

## 4. Observed once — NOT proposed

Recorded so a later pass can confirm or discard them. Each has exactly one example, which is not
enough to justify a catalog change.

| Candidate | Single example | Comment |
|---|---|---|
| Physics → `Elasticity and Hooke's Law` | CDS (II) 2016 Q16 — "The spring constant of a spring depends on its (a) length only (b) material only (c) length and its diameter (d) thickness, its diameter and its material" | `Fluid Mechanics and Properties of Matter` holds only Buoyancy and Pressure/Surface Tension. Elasticity has no slot. Watch for a second instance. |
| Physics → `Semiconductors, Diodes and Transistors` | CDS (II) 2016 Q18 — "In a bipolar junction transistor …" | Folded into the §1.4 proposal as a sibling; drop it if you enforce two examples strictly. |
| Geography → `World Climate Regions, Biomes and Natural Vegetation` | CDS (II) 2025 Q93 — "Consider the following statements with reference to Mid-latitude deciduous forests …" | `World and Human Geography` has only 3 subtopics (population, coordinates, rivers). World vegetation currently has to borrow Biology → Ecology → "Ecosystems, Biomes and Ecological Interactions", which is a Biology home for a Geography question. |
| Geography → `Population, Census and Urbanisation of India` | CDS (II) 2025 Q101 — "Which among the following Classes of Towns in India holds the highest percentage of Urban Population as per the Census 2011 ?" | Currently must go to `World and Human Geography → Human Geography — Megacities and Population`, i.e. a *world* subtopic for an *Indian* census question. |
| History → temple architecture / Hindu devotional traditions | CDS (II) 2021 Q58 — "Which one among the following is a temple of the Vaishnavite tradition ? (a) Srirangam (b) Chidambaram (c) Gangaikonda Cholapuram (d) Thanjavur" | The only architecture subtopic is `Buddhism, Jainism and Religious Architecture` (Ancient India). It stretches to cover this, but awkwardly. |
| Current Affairs → agricultural and biotechnology research | CDS (II) 2025 Q117 — ICAR's genome-edited rice varieties (DRR Rice 100, Pusa DST Rice 1) | `Science and Technology` has DRDO, health tech, IT, nuclear/renewable and space — no biotech or agri-science slot. |

**Naming-only observations (no new subtopic needed, but the labels mislead):**

- `Current Affairs → National Events … → National Days, Festivals and Observances` receives
  *international* days (CDS (I) 2023 Q59: World Wetlands Day, International Tiger Day, World Water
  Day, International Mother Earth Day). Consider "National and International Days …".
- `History → Modern India → Freedom Movement — INC, Gandhi and Independence` must also hold the
  revolutionary stream (Ghadar Movement, 2025-II Q53) and the nationalist press (2025-II Q52:
  *Kudi Arasu*, *Kisan Bulletin*, *Bombay Chronicle*, *Bhawani Mandir*). The content fits; the
  label reads as excluding it.

---

## 5. Structural notes for the transcription pipeline

**No text layer, anywhere.** All four papers return zero characters from `page.get_text()`. Vision
transcription is mandatory for the whole corpus — there is no hybrid text-first path.

**Two-column layout, column-major flow.** Questions run down the **left** column then down the
**right**. A naive left-to-right, row-by-row read scrambles the numbering completely (e.g. on
CDS (I) 2023 p-13 the left column is Q71→Q73 and the right is Q74→Q76). Some questions also span
the column break.

**Question formats seen — five distinct shapes:**

1. **Plain single-best-answer MCQ** with options `(a)–(d)`.
2. **"Consider the following statements"** — a numbered list `1.`–`4.` followed by "Which of the
   statements given above is/are correct?" and a code. The numbered list is part of the *stem*, not
   the options.
3. **Match List-I with List-II** — two parallel lists (`A.`–`D.` and `1.`–`4.`) plus a `Code:` block
   in which **each option occupies two printed lines** (`A B C D` on one line, `4 3 2 1` beneath).
   This is the single most fragile layout for transcription — the option value is a mapping, not a
   string, and a line-oriented reader will split it.
4. **Chronological ordering** — "Chronologically arrange … beginning from the earliest" with codes
   like `4, 3, 2, 1` (CDS (II) 2025 Q54; CDS (II) 2021 Q110).
5. **Statement I / Statement II** (assertion–reason shape) — CDS (II) 2016 Q53. **Verify this one:**
   on the rendered page the two statements appear with **no visible option block** between them and
   Q54. Either the options are printed elsewhere, or the paper relies on a standing instruction in
   the cover page. Worth resolving before a bulk run, since it will look like a missing-options bug.

**Negative stems are pervasive** and are typeset as **bold italic `not`** ("Which one of the
following is *not* correct?"). Losing that emphasis inverts the answer. Roughly one question in
six sampled was a negative stem.

**Puzzle / narrative stems.** "Rani told her friends that last year she did boating in four
different lakes …" (2023-I Q17); "Manav is planning to visit all UNESCO World Heritage Sites in
Delhi" (2023-I Q56). Ordinary MCQs, but the stem is a paragraph and must not be truncated.

**Bilingual pages with heavy show-through.** CDS (II) 2021 is a bilingual (English + Hindi) booklet
and the Devanagari from the reverse side bleeds visibly through every page. CDS (I) 2023 and
CDS (II) 2025 show the same bleed in the gutter and margins. CDS (II) 2016 appears to be
English-only with clean pages. The bleed is legible enough that a vision model may transcribe
fragments of it — worth an explicit instruction to ignore reversed/mirrored Devanagari.

**Footers vary by year and encode the set.** `SDC–S–SND/1A` + a plain page number (2016);
`NYRG-B-GNL` + `( 7 – A )` (2021-II); `JNBY–D–GNL/59A` + page + `[ P.T.O.` (2023-I);
`ANFB-S-GKL` + `( 7 – A )` (2025-II). The `– A` suffix is the **question-paper set**, which matters
if multiple sets of the same sitting are ever ingested (option order differs between sets).

**Figures: none observed.** Across all 33 pages read — spanning four papers and all eight subjects
— there was **not one diagram, map, graph or image**. Every question is pure text, including the
geography and physics ones. This is good news: the CDS GS pipeline may not need a figure-crop and
attach stage at all. **Caveat:** 33 of roughly 85 question pages were read, so this is strong
evidence, not proof.

**Do not try to confirm this with `page.get_images()`** — it was tested and it cannot answer the
question. These are scanned PDFs, so every page is itself an image: the call returns 5 objects per
page for CDS (II) 2016 and 1 per page for CDS (I) 2023, on pages that carry no figure at all. A
figure here would be ink inside the page scan, invisible to any object-level probe. The only
reliable confirmation is to render the remaining pages and look at them, or to have the
transcription agents report any figure they encounter.
