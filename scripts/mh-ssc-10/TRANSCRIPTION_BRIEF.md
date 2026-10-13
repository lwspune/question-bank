# MH-SSC-10 board-paper VISION transcription brief

You transcribe ONE Maharashtra SSC (Class 10) board question paper into a
JSON array of `PaperQuestion` objects. The rendered pages are PNGs at
`scripts/mh-ssc-10/out/<paperId>/p-NN.png` (one per PDF page, high-DPI). Read
**every** page. Most March papers are scans with NO text layer; the
supplementary papers are not (next section).

## Supplementary papers (`<id>-jul`, `<id>-jun`): text layer for words, image for maths

The July 2024, July 2025 and June 2026 papers come from the board's own site as
born-digital PDFs, dumped to `out/<paperId>/text.md`. Use it, but know what it
loses:

- **Prose, numbering and marks survive intact.** Take question wording from the
  text layer, not from reading the image, which is slower and worse.
- **Maths does NOT survive.** Measured on `alg-2024-jul` Q1(A)(i): option (D)
  `-1/7` arrives as `1/7` (the minus is gone) and every fraction is split across
  lines. Read EVERY formula, number with a sign, fraction, power, root, chemical
  formula and equation from the PNG, never from `text.md`.
- **Figures, tables and boxed activities** come from the PNG.
- The June 2026 papers use a denser 4-6 page layout with "Page No. 2/4" headers
  and "End of Page 2" footers. These are page furniture, not question text.

**Structure: copy the shipped March paper of the same subject.** Read
`data/<subject>-<year>.questions.json` (e.g. `sci1-2026.questions.json` for
`sci1-2026-jun`) before you start, and use the same `ref` scheme, `setLabel`
habits and row granularity: one row per printed sub-question `(i)`, with its
`(a)/(b)` parts inside that one row. The `/question-papers` builder sums the
printed marks over these refs, so a different granularity is refused there.

**The chapter/subtopic lists below are a snapshot.** `config.ts` `CATALOG` is the
authority (several subtopics were renamed to the textbook's own headings on
2026-08-02), and `commit.ts` validates chapters against it. Read it.

## Output

Write `scripts/mh-ssc-10/data/<paperId>.<block>.json` — a JSON array. Split by
question block so blocks can be merged (e.g. `<id>.q1.json` = Q1(A)+Q1(B),
`<id>.q2.json` = Q2, …). Every `ref` must be globally unique within the paper.

Each element (see `scripts/mh-ssc-10/lib.ts` `PaperQuestion`):

```jsonc
{
  "ref": "Q1(A)(i)",              // provenance; unique. Use the paper's own numbering.
  "format": "mcq",                // "mcq" | "subjective"
  "chapter": "Quadratic Equations",   // MUST be an exact catalog chapter (below)
  "subtopic": "Roots of a Quadratic Equation", // prefer a catalog subtopic; else your best concept name
  "difficulty": "EASY",           // EASY | MODERATE | HARD (board-paper level: mostly EASY/MODERATE)
  "stem": "If 3 is a root of \\(kx^2 - 7x + 12 = 0\\) then \\(k =\\) ____.",
  "options": [                    // MCQ ONLY, exactly 4, labels A-D
    {"label":"A","text":"1"}, {"label":"B","text":"-1"},
    {"label":"C","text":"3"}, {"label":"D","text":"-3"}
  ],
  "answer": "A",                  // MCQ ONLY — the DERIVED correct letter. Solve it yourself.
  "solution": "Substitute x=3: 9k-21+12=0 ⟹ k=1.",  // AUTHORED model answer (see below)
  "reviewFlag": true,             // ALWAYS true — every answer is AI-derived, awaiting human check
  "hasFigure": false,             // true if the question shows/needs a diagram
  "figureNote": ""                // if hasFigure: what the figure is + which page (e.g. "right triangle ABC, p-04")
}
```

For a SET (a shared instruction with sub-items `i) ii) iii)`), put the shared
instruction in `context`, give each sub-item its own row, and set the same
`setLabel` on all siblings.

## Rules

1. **Internal choice** ("Solve any two of the following", "attempt any four") →
   transcribe **ALL** sub-questions as independent rows. The choice is a delivery
   concern, not a bank concern. Never drop the un-chosen alternatives.
2. **"Complete the following activity"** (fill-in-the-blank worked solutions) →
   transcribe the activity as the `stem` WITHOUT the blanks pre-filled (keep it a
   question: "Complete the activity to find …"), and put the FILLED, complete
   worked solution in `solution`. Do not ship blanks (`____`, boxes) in the answer.
3. **Math** → LaTeX inside `\(...\)` (inline). Convert every unicode math glyph
   (× ÷ ≤ ≥ √ ² ³ π θ ∴ ∵ → etc.) to LaTeX; never leave raw unicode in `stem`,
   `options`, or `solution`. Fractions `\frac{}{}`, roots `\sqrt{}`.
4. **Tables** → GFM pipe-tables (header row + `|---|` separator). Used for
   Statistics frequency tables and Probability sample-space tables.
5. **format** — `Q1(A)` is the MCQ block → `format:"mcq"` with 4 options + a
   derived `answer`. Everything else is `format:"subjective"` (no options; a
   model answer in `solution`).
6. **Answers** — this paper has NO answer key. SOLVE each MCQ and put the correct
   letter in `answer`. AUTHOR a model answer for each subjective question in
   `solution`, in the format of **Model answers** below. Set `reviewFlag:true` on
   every row.
7. **chapter** is HARD-validated against the catalog — use an EXACT string.
   **subtopic**: use a catalog subtopic when one fits; otherwise your best
   concise concept name (off-catalog is allowed, just flagged).
8. **Figures** — set `hasFigure:true` + a `figureNote` naming the diagram and its
   page; do NOT try to describe the figure inside the stem. (A later pass crops
   and attaches the image.)
9. Do NOT invent questions or options. If a glyph is genuinely unreadable, make
   your best faithful reading and note the uncertainty in `figureNote`/context.

## Model answers (2026-10-13; every paper from the supplementary sittings on)

A solution is read by a Class 10 student preparing for this exam, so it is **the
answer they would write to score the marks**: state the principle, show every
step, close on the result. It is not a note to the marker and not a comment on
the question. `merge.ts` runs `scripts/lib/boardAnswerStyle.ts` over every
solution and refuses the paper on an error, so these are checked, not advice.

- **One voice.** Never write "also acceptable", "worth noting", "an aside",
  "note the question asks", "by the standard result", "it can be shown that".
  Each was written by a real authoring pass and caught in review.
- **MCQ: open with `**(B)** <the option's text>`**, the letter matching `answer`,
  then the working. Name NO other option by its letter anywhere: call a
  distractor by its value ("the value 7 is \(D_x/D_y\) inverted, not \(x\)").
  `audit:keys` reads the LAST letter a solution names as its conclusion, so a
  closing "(option D is wrong because…)" reports a correct key as wrong. For the
  same reason do not write "Hence B …" when B is a point, a matrix or a set.
- **Maths** inside `\( … \)`, no Unicode maths symbols anywhere (write
  `\(\pi\)`, `\(\sqrt{3}\)`, `\(\le\)`, `\(\times\)`, `\(^\circ\)`). Put
  `\therefore` before the concluding step of a calculation, close a numerical
  with a check (substitute back, or bound it), and leave surds exact
  (`\(6\sqrt{3}\)`, not 10.39).
- **Science numericals** carry units on every quantity and in the result.
- **Activities, concept maps, timelines, tables to complete:** answer with the
  FILLED structure, as a GFM pipe-table (the `|---|` separator row is
  mandatory, or the site prints raw pipes) or a labelled list.
- **Length follows the marks and the instruction.** 1 mark: a line or two.
  "Give scientific reasons" / "give reasons": state the actual reason, 2-4
  sentences. "Explain" / "answer in brief" (3 marks): 4-6 sentences or the
  full working. 5 marks: the complete answer.
- **True/false with reason:** begin `True.` or `False.`, then the reason.
- **Ground recall answers in the Balbharati textbook.** The four books are
  dumped, with `===== PDF PAGE n =====` markers, at
  `scripts/mh-ssc-10/out/_books/10th_{Hist,Geog,Sci_Part1,Sci_Part2}_SB.txt`.
  Search the chapter for the topic and write the answer the chapter supports.
  Do NOT add a name, date, figure or example the book does not give. **Where
  the board's wording and the textbook disagree, the textbook wins**: board
  questions are often lifted from the chapter's own exercises, and on
  Historiography the textbook settled a question two board papers had keyed
  differently.
- **No em dashes** in anything you write (phone keyboards have none, so they
  read as machine-written). Use a full stop, colon, comma or brackets. Text you
  COPY from the paper keeps its own punctuation.

## Algebra catalog (chapter → subtopics)

- **Linear Equations in Two Variables**: Methods of Solving Linear Equations ·
  Determinant Method (Cramer's Rule) · Equations Reducible to Linear Form ·
  Graph of Linear Equations · Word Problems and Applications
- **Quadratic Equations**: Roots of a Quadratic Equation · Solving by
  Factorisation · Solving by Formula and Completing the Square · Nature of Roots
  (Discriminant) · Relation between Roots and Coefficients · Word Problems and
  Applications
- **Arithmetic Progression**: nth Term of an A.P. · Sum of n Terms of an A.P. ·
  Word Problems and Applications
- **Financial Planning**: Goods and Services Tax (GST) · Shares — Face Value,
  Market Value, Brokerage · Mutual Funds and SIP
- **Probability**: Sample Space and Events · Probability of an Event
- **Statistics**: Mean, Median and Mode of Grouped Data · Pictorial
  Representation of Statistical Data

## Geometry catalog (chapter → subtopics)

- **Similarity**: Ratio of Areas of Two Triangles · Basic Proportionality
  Theorem · Tests of Similarity of Triangles · Theorem of Areas of Similar
  Triangles
- **Pythagoras Theorem**: Pythagoras Theorem and its Converse · Similarity in
  Right Angled Triangles · Applications of Pythagoras Theorem
- **Circle**: Tangent and Secant to a Circle · Tangent Segment Theorem ·
  Inscribed Angle and Intercepted Arc · Cyclic Quadrilateral · Theorems on Chords
  and Tangents
- **Geometric Constructions**: Division of a Line Segment · Construction of a
  Similar Triangle · Construction of a Tangent to a Circle
- **Co-ordinate Geometry**: Distance Formula · Section Formula · Slope of a Line
- **Trigonometry**: Trigonometric Ratios and Identities · Heights and Distances
- **Mensuration**: Surface Area and Volume of Solids · Combination of Solids and
  Frustum · Area of Sector and Segment of a Circle

## Science paper structure (Science and Technology I & II)

Different from Maths: **Q1(A) = 5 MCQs** (not 4), then Q1(B) short-answer (do as
directed / name / match), then Q2/Q3/Q4/Q5 subjective with internal choice ("answer
any five", "answer any one"). Science I = Physics + Chemistry; Science II = Biology.
Many Science questions are recall (no figure); flag only genuine diagrams (circuit,
ray diagram, apparatus, biology figure) with `hasFigure:true` + `figureNote`.
"Complete the following / label the diagram / balance the equation" activities →
fill them in the `solution`. Give scientific-reasons / distinguish / define
questions are subjective with an authored model answer.

## Science and Technology I catalog (chapter → subtopics)

- **Gravitation**: Newton's Law of Gravitation · Free Fall and Acceleration due to Gravity · Kepler's Laws of Planetary Motion · Escape Velocity and Satellites
- **Periodic Classification of Elements**: Early Attempts and Mendeleev's Periodic Table · Modern Periodic Table · Periodic Trends
- **Chemical Reactions and Equations**: Balancing Chemical Equations · Types of Chemical Reactions · Oxidation, Reduction and Corrosion
- **Effects of Electric Current**: Magnetic Effect of Electric Current · Electromagnetic Induction · Electric Motor and Generator · Domestic Electric Circuits and Safety
- **Heat**: Specific Heat Capacity · Latent Heat and Change of State · Anomalous Behaviour of Water
- **Refraction of Light**: Refraction and Refractive Index · Total Internal Reflection · Applications of Refraction
- **Lenses**: Types of Lenses and Terminology · Image Formation by Lenses · Lens Formula and Magnification · Human Eye and Defects of Vision
- **Metallurgy**: Properties of Metals and Non-Metals · Reactivity Series and Ionic Compounds · Extraction of Metals · Corrosion and Alloys
- **Carbon Compounds**: Covalent Bonding in Carbon · Hydrocarbons and Functional Groups · Nomenclature and Isomerism · Important Organic Compounds
- **Space Missions**: Satellites and Orbits · Launch Vehicles · Space Missions of India

## Science and Technology II catalog (chapter → subtopics)

- **Heredity and Evolution**: Heredity and Variation · Mendel's Laws of Inheritance · Evolution and its Theories · Speciation and Evidences of Evolution
- **Life Processes in Living Organisms Part 1**: Cell Division — Mitosis and Meiosis · Nutrition in Living Organisms · Cellular Respiration
- **Life Processes in Living Organisms Part 2**: Types of Reproduction · Human Reproductive System · Reproductive Health
- **Environmental Management**: Ecosystem and Ecological Balance · Biodiversity and Conservation · Environmental Conservation
- **Towards Green Energy**: Energy Sources · Renewable and Non-Renewable Energy · Green Energy Technologies
- **Animal Classification**: Basis of Classification · Non-Chordates · Chordates
- **Introduction to Microbiology**: Types of Microorganisms · Useful Microorganisms · Industrial and Applied Microbiology
- **Cell Biology and Biotechnology**: Cell Structure and Organelles · Biotechnology and its Applications · Genetic Engineering
- **Social Health**: Health and Disease · Social Health and Issues · Addiction and Stress Management
- **Disaster Management**: Types of Disasters · Disaster Management and Mitigation · First Aid

## Social Sciences papers (Geography · History and Political Science)

**These are the ONLY papers where `subject` matters.** Everything above assumed
one subject per paper. Social Sciences **Paper I carries TWO disciplines in one
printed paper** — the paper's own note says so: *"Question Nos. 1 to 5 are based
on History and Question Nos. 6 to 9 are based on Political Science."*

- `hist-<year>` → set **`"subject": "History"`** on Q1–Q5 rows and
  **`"subject": "Political Science"`** on Q6–Q9 rows. It is HARD-validated, and a
  chapter is checked against **that subject's** catalog only — a History chapter
  named under Political Science is an error, not a pass.
- `geog-<year>` → single subject; **omit `subject`** (it defaults to Geography).

Only the REVISED COURSE (2020+) is in scope. If a paper you are given mentions
**Economics**, or its cover says anything other than "(REVISED COURSE)", stop and
report it — you have the wrong paper.

### Geography paper structure

Q1 MCQ (4) · Q2 odd-one-out / match · Q3 one-sentence answers · **Q4(A) map
marking** · **Q4(B) map reading** · Q5 geographical reasons · **Q6(A) graph
drawing from a data table** · **Q6(B) graph reading** · Q7 detailed answers.
The whole course is **comparative India vs Brazil** — a question may span both
countries; file it under its THEME chapter, never by country.

### Four Geography question types that need special handling

1. **Q4(B) map reading / Q6(B) graph reading** — the map or graph is PRINTED in
   the paper and the sub-questions are unanswerable without it. This is a SET:
   put the instruction ("Observe the map of India and answer the following") in
   `context`, one row per sub-question, same `setLabel`, and set
   `hasFigure:true` + a `figureNote` naming the figure and its page on **every**
   sibling. Still answer each sub-question in `solution` — you can read the map.
2. **Q4(A) map marking** ("Mark the following on the outline map of India/Brazil,
   write the names and give index") — one row per item. The outline map is
   supplied separately and is NOT in the paper, so do **not** set `hasFigure`.
   Author a **locate-and-describe** `solution`: where the feature is, with the
   bearings a student would use to place it — e.g. *"Sikkim — a small state in
   the north-east Himalayas, bounded by Nepal (west), China/Tibet (north), Bhutan
   (east) and West Bengal (south); mark and shade it, and add it to the index."*
   Name real neighbours/latitudes/coasts; never write "mark it on the map".
3. **Q6(A) graph drawing** — the data table is printed in the paper. Put the
   table in the `stem` as a **GFM pipe-table** (header + `|---|` separator) and
   keep the instruction ("prepare a simple bar graph and answer the following").
   The printed sub-questions each become their own row (answerable from the
   table). In the `solution` for the drawing instruction itself, state the graph
   type, what goes on each axis with its scale, and the plotted values.
4. **Q2 "Match the following" / odd-one-out** — one row per pair or per item,
   not one row for the whole block. Give each row enough of the shared list in
   `context` to be answerable on its own.

### History and Political Science paper structure

Q1(A) MCQ · Q1(B) match/odd-one-out · Q2 **concept map** + short answers · Q3
"give reasons" · **Q4 source-passage** · Q5 detailed answers → all History.
Q6 fill-in-the-blanks · Q7 one-sentence · Q8 true/false-with-reason (+ concept
map) · Q9 detailed → all Political Science.

- **Source-passage questions (Q4)** — put the whole printed extract in `context`,
  one row per sub-question, same `setLabel`. The passage is TEXT, not a figure:
  transcribe it, do **not** set `hasFigure`.
- **Concept-map questions** ("write the appropriate answers in the concept map")
  — the printed empty concept map is a blank the student fills, so treat it like
  a "complete the activity": keep the instruction in the `stem`, and give the
  FILLED answer in `solution` as a labelled list or a pipe-table. Do not ship an
  empty box. `hasFigure:false`.
- These papers are almost entirely text — flag `hasFigure` only for a genuine
  printed picture/map/timeline the question actually refers to.

## Geography catalog (chapter → subtopics)

- **Field Visit**: Purpose and Planning of a Field Visit · Observation and Recording · Questionnaire and Report Writing
- **Location and Extent**: Latitudinal and Longitudinal Extent · Neighbouring Countries and Boundaries · Area, Shape and Standard Time
- **Physiography and Drainage**: Physiographic Divisions · Mountains, Plateaus and Plains · Coastal Plains and Islands · River Systems and Drainage Basins
- **Climate**: Factors Affecting Climate · Temperature and Rainfall Distribution · Winds and Monsoon · Climatic Regions
- **Natural Vegetation and Wildlife**: Types of Natural Vegetation · Distribution of Forests · Wildlife and Biodiversity · Conservation of Vegetation and Wildlife
- **Population**: Distribution and Density of Population · Population Growth and Composition · Sex Ratio, Literacy and Life Expectancy · Migration and Urbanisation
- **Human Settlements**: Rural and Urban Settlements · Settlement Patterns · Factors Affecting Settlement
- **Economy and Occupations**: Primary, Secondary and Tertiary Activities · Agriculture and Allied Occupations · Minerals, Industries and Manufacturing · Types of Economy and National Income
- **Tourism, Transport and Communication**: Types of Tourism · Land, Water and Air Transport · Communication and Media · Tourism and the Economy

## History catalog (chapter → subtopics)

- **Historiography: Development in the West**: Tradition of Historiography · Modern Historiography · Development of Scientific Perspective in Europe and Historiography · Notable Scholars
- **Historiography: Indian Tradition**: Tradition of Indian Historiography · Tradition of Indian Historiography · Indian Historiography: Various Ideological Frameworks
- **Applied History**: What is Applied History · Applied History and Research in Various Fields · Applied History and Our Present · Management of Cultural and Natural Heritage
- **History of Indian Arts**: What is Art · Indian Traditions of Visual Arts · Indian Traditions of Performing Arts · Art, Applied Art and Professional Opportunities
- **Mass Media and History**: Introduction to Mass Media · History of Mass Media · Newspapers, Radio and Television · Critical Understanding of Mass Media
- **Entertainment and History**: Why do we need Entertainment · Folk Theatre and Puppetry · Marathi Theatre · Indian Film Industry · Entertainment and Professional Opportunities
- **Sports and History**: Importance and Types of Sports · Globalisation of Sports · Game Materials and Toys · Literature and Movies on Sports · Sports and Professional Opportunities
- **Tourism and History**: Tourism in the Past · Types of Tourism · Development of Tourism · Conservation and Preservation of Historical Places
- **Heritage Management**: Sources of History, their Conservation and Preservation · Museums · Libraries and Archives · Heritage Management and Professional Opportunities

## Political Science catalog (chapter → subtopics)

- **Working of the Constitution**: Democracy and Political Maturity · Right to Vote · Social Justice and Equality · Role of Judiciary
- **The Electoral Process**: Election Commission · Representation and Constituencies · Conduct of Elections · Electoral Reforms
- **Political Parties**: Characteristics and Functions of Political Parties · National and Regional Parties · Party Systems · Ruling Party and Opposition
- **Social and Political Movements**: Why Movements Arise · Types of Movements · Movements and Democracy
- **Challenges faced by Indian Democracy**: Challenges before Democracy at the Global Level · Casteism, Communalism and Regionalism · Corruption and Criminalisation of Politics · Deepening of Democracy

## After writing

Run `npx tsx scripts/mh-ssc-10/merge.ts <paperId>` then
`npx tsx scripts/mh-ssc-10/commit.ts <paperId>` (dry-run) and report the by-chapter
counts, format split, flags, and any LaTeX imbalance so the reviewer can QA.
