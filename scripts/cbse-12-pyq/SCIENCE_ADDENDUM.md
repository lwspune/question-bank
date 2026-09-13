# CBSE Class-12 PHYSICS + CHEMISTRY — addendum to the transcription contract

Read `TRANSCRIPTION_BRIEF.md` first. **Everything in it still applies** — the
bilingual page-parity rules, the "read the page, never the text layer" rule, the
`\( … \)` maths convention, the set/`context` handling, the internal-choice
(`OR`) handling and the JSON shape are all unchanged.

This file records only what is **different for the two sciences**, and every
item was measured off the real papers.

---

## 0. ⚠ READ THIS FIRST: every measurement here is per (SUBJECT, PATTERN), and often per YEAR

**The recurring defect in this file has never been a wrong fact. It is a fact
measured on ONE SUBJECT and written as though it described the pattern.** Five
separate instances were found and fixed during the wave-4 ingest, and they ran
in BOTH directions:

| the claim | measured on | false for |
|---|---|---|
| *"`term2_sci` has no MCQs at all"* | Chemistry | **Physics** — Q12 is five keyed MCQs |
| *"`term2_sci` papers print no internal-choice instruction"* | Chemistry (8 of 8) | **Physics** — it is instruction (vi) |
| *"the marking scheme is one merged 3-in-1 PDF"* | Physics | **Chemistry** — never merged, 0 of 78 |
| *"the case-study sub-parts are keyed MCQs"* | `full70` | **`full70_phy_2023`** — they are subjective |
| *"2026 marking schemes are page images with no answers in the text layer"* | Physics | **Chemistry** — its 2026 schemes extract ~13k chars INCLUDING every answer |

Each cost an agent real time, and two of them would have DISCARDED CBSE's own
keys had the agents not refused the instruction and read the page.

> **So: a claim in this file without a subject attached is a bug in this file.**
> If you are about to write one, either measure the other subject or say
> outright which one you measured. *"Measured on Chemistry; Physics unchecked"*
> is a useful sentence. *"The science papers do X"* usually is not.

The same applies to YEAR. `full70` covers 2024, 2025 and 2026, and Chemistry's
row shape is **not constant across them** (§1). Nothing in the pipeline notices
when a year-specific number is applied to the wrong year.

---

## 1. The paper is 70 marks, and its shape changes by YEAR and by SUBJECT

Do not carry the Maths structure over. `sectionForQuestion` already knows the
right table; what you must not do is assume a band from a neighbouring year.

| pattern | who | shape |
|---|---|---|
| `term2_sci` | **2022**, both subjects | 12 q / 35 marks / 3 sections. A: Q1-3 (2 mk) · B: Q4-11 (3 mk) · C: Q12 case study (5 mk). **Section A and B are subjective — but see the warning below: in PHYSICS the Q12 case study is FIVE keyed MCQs.** |
| `full70_phy_2023` | **Physics 2023** | 35 q. A: Q1-15 MCQ, **Q16-18 assertion-reason** · B: 19-25 (2) · C: 26-30 (3) · **D: 31-33 LONG ANSWER (5)** · **E: 34-35 case (4)** |
| `full70_chem_2023` | **Chemistry 2023** | 35 q. A: Q1-14 MCQ, **Q15-18 assertion-reason** · B: 19-25 (2) · C: 26-30 (3) · **D: 31-32 CASE (4)** · **E: 33-35 long answer (5)** |
| `full70` | **2024, 2025, 2026**, both subjects | 33 q. A: Q1-12 MCQ, **Q13-16 assertion-reason** · B: 17-21 (2) · C: 22-28 (3) · D: 29-30 case (4) · E: 31-33 LA (5) |

⚠ **AND THE 2022 PAPERS ARE NOT THE SAME EXAM EITHER — the same trap, a year
earlier.** `term2_sci` is shared by Physics and Chemistry, and its Q12 case
study differs by SUBJECT:

* **Physics** — Q12 is **FIVE 1-mark MCQs** with four printed options each, and
  the marking scheme KEYS all five in its own **SECTION-C** table. Measured on
  all five openers: 5 keyed answers per paper, so **75 across the 15 papers**.
* **Chemistry** — Q12 is **four** SUBJECTIVE sub-parts (a)-(d), with (d)
  carrying an `OR`. Verified against all 15 committed `2022-56-*` files: 0 MCQs,
  and four sub-parts in every one. (An earlier version said five.)
* **Maths** — subjective, 1-2 rows.

Both totals are 35, so a marks check cannot catch it. **An earlier version of
this file, and `lib.ts`'s own `term2_sci` comment, both asserted "NO MCQs at
all" for 2022** — measured on Chemistry and generalised. Five agents met the
Physics MCQs independently and each refused to force them subjective, which
would have discarded CBSE's own keys.

⚠ **The Section-C key uses a DIFFERENT labelling convention in every series**,
so no single pattern reads them all — measured: `I (B)`, `(I) ( B )`,
`a) (iii)`, `(a) (iv)`, `(i)—a`. Where the options are printed `(i)-(iv)` or
`a-d`, map them POSITIONALLY onto A-D.

### Where the keyed MCQs live, per (pattern, subject) — MEASURED across all 52 openers, 2026-09-11

The count a dispatch quotes for "Section A" is a FLOOR, not the total. A brief
that says "there should be 16 entries" is right about Section A and wrong about
the paper, and an agent that stops there **discards CBSE's own keys** — which
`validate.ts` catches only if the rows ship answerless, and nothing catches if
they ship derived.

| pattern | Physics | Chemistry |
|---|---|---|
| `term2_sci` (2022) | Section A **none** + **Section C = 5** ⇒ 5 keyed | **0 keyed** — no MCQs anywhere |
| `full70_phy_2023` | Section A 18, **nothing outside it** | — |
| `full70_chem_2023` | — | Section A 18, **nothing outside it** |
| `full70` (2024/25/26) | Section A 16 + **Section D = 10** (8 sub-parts + 2 keyed OR-branches) ⇒ 26 keyed | Section A 16, **nothing outside it** |

So: **Physics keeps keyed MCQs outside Section A in `term2_sci` (C) and `full70`
(D) but NOT in `full70_phy_2023`; Chemistry never does.** Derived by counting
`format:"mcq"` rows outside section A in every committed opener — the split is
clean, with no paper deviating from its (pattern, subject) cell.

### Row shapes, per (subject, YEAR) — RE-MEASURED 2026-09-13 across all 156 committed science papers

Counted off all 78 Physics + 78 Chemistry committed JSONs, not off a sample.
**Every one of the ten cells is uniform across all 15 (or 18) papers of its
year**, so a paper that does not match its cell is a finding, not a variant.

| subject | year | primary rows by section | primary | alts | ROWS | keyed MCQs |
|---|---|---|---|---|---|---|
| Physics | 2022 | A3/B8/C5 | 16 | 3 | **19** | 5 (all in **C**) |
| Physics | 2023 | A18/B7/C5/D3/E6 | 39 | 9 | **48** | 18 (all in A) |
| Physics | 2024 · 2025 · 2026 | A16/B5/C7/D8/E3 | 39 | 7 | **46** | 24 primary + 2 alt = **26 rows** (A16 + D10) |
| Chemistry | 2022 | A3/B8/C4 | 15 | 5 | **20** | 0 |
| Chemistry | 2023 | A18/B7/C5/D6/E3 | 39 | 7 | **46** | 18 (all in A) |
| Chemistry | 2024 | A16/B5/C7/D6/E3 | 37 | 5 | **42** | 16 (all in A) |
| Chemistry | 2025 · 2026 | A16/B5/C7/D6/E3 | 37 | 7 | **44** | 16 (all in A) |

Three things this table corrects, each of which had been quoted as fact:

- **Chemistry `full70` is 42 rows in 2024 and 44 in 2025/2026** — a clean YEAR
  split, not the *"42-44"* range the previous version printed. The primary
  shape is identical in all three years; only the alternative count moves
  (5 → 7). A 2025 paper coming in at 42 has dropped two alternatives, and §5b
  explains why the marks sum cannot see that.
- **Chemistry 2022 Q12 has FOUR sub-parts, not five** — (a), (b), (c), (d),
  with (d) carrying the `OR`. The previous version said five.
- **Physics `full70` Section D is 10 ROWS = 8 MCQ sub-parts + 2 keyed
  alternatives.** Both branches of a case-study internal choice are printed and
  keyed, so 26 keyed rows over 24 distinct questions. Which leads to:

> ⚠ **A `full70` Physics case study carries an internal choice ON AN MCQ
> SUB-PART, and it is in every paper measured.** 2025 55/1/1 prints Q29 (iv)(a)
> *OR* (iv)(b) and Q30 (iii)(a) *OR* (iii)(b) — four printed options each, both
> branches keyed in the scheme's Section-D block. Ingest both as ordinary
> alternatives (`_alternativeTo`). An agent expecting "case studies are 5
> sub-parts" will read (iv)(a) and (iv)(b) as sub-parts (iv) and (v), which
> mis-numbers the tail of the paper and loses the alternative relationship.

### The decimal convention is PER PAPER, and the paper may disagree with its own scheme

Do not carry it from a sibling, a year or a pattern. Measured in wave 1:
2023 56/2/2 and 56/5/2 print ordinary baseline dots while 56/4/2 prints raised
ones — same year, same pattern. Physics 2026 splits by series: 55/1 and 55/2
ordinary, 55/3 55/4 55/5 raised. **Four papers print ordinary dots while their
own marking scheme prints raised ones.** The stem is hashed, so guessing wrong
silently blocks dedup against the sibling that guessed right. Read it off the
page at magnification, per paper, and follow the PAPER.

⚠ **The two 2023 papers are not the same exam.** Sections D and E are swapped
between the subjects and the assertion-reason band starts a question earlier in
Chemistry. **Both total 70**, so a marks check cannot catch a mix-up — only the
printed instructions can, and they have been read.

---

## 2. Section A's answer comes from the OFFICIAL MARKING SCHEME, never derived

This is the single biggest quality difference between this ingest and the bank's
key-less board corpora. The marking scheme is rendered beside the paper under
`out/<paperId>/ms/`. Its Section-A block is a plain table:

```
SECTION-A
1.   (a)   1
2.   (c)   1
```

Take the letter verbatim and **uppercase** it (the bank stores A/B/C/D upper;
CBSE prints either case by year).

> **The letter is trustworthy; the text beside it is not.** Measured: the
> corruption in these PDFs hits SYMBOLS, so `8 μF` extracts as `8 F` and a
> vector arrow vanishes. Use the letter. If CBSE also prints the answer's value,
> use it only as a sanity check that you matched the right option.

### How far the machine-readable key actually reaches — measured 2026-09-10

`npx tsx scripts/cbse-12-pyq/keys.ts --subject=<s>` is the live answer; this is
the shape of it, so nobody re-investigates a known gap.

⚠ **These counts are PAPERS, not answers.** A `full70` paper has 16 Section-A
entries and a `full70_phy_2023` one has 18 — so "2025: 18 of 18" means
eighteen papers keyed, not eighteen answers. An agent read it the other way and
went looking for two Section-A entries that do not exist. `keys.ts` also prints
a per-subject SUMMARY, not a per-paper line, so grepping it for one paper id
returns nothing — read the marking scheme page.

| year | Physics PAPERS keyed | why the gaps |
|---|---|---|
| 2022 | 0 of 15 | ⚠ **A REAL GAP, not a true negative.** `expectedSectionA` counts only `mcq`/`assertion_reason` BANDS, and `term2_sci` declares none — so keys.ts never looks at SECTION C, where Physics prints **5 keyed answers per paper (75 in all)**. Read them off the scheme's Section-C table. |
| 2023 | 9 of 15 | 3 refuse on a medium-scoped award; 3 lost entries to a collapsed two-column layout. |
| 2024 | 14 of 15 | |
| 2025 | 18 of 18 | |
| 2026 | 0 of 15 | **The whole marking scheme is page IMAGES.** |

⚠ **2026 is the one to understand before you open it — AND IT SPLITS BY
SUBJECT.** This was written as a pattern-wide fact and is a **Physics** one.

* **PHYSICS 2026 — genuinely image-only.** The text layer is not empty; it runs
  ~350 chars/page and contains the *numbering scaffold only*: a `SECTION-A`
  heading followed by `1.` `2.` … `16.` with **no answers**, plus a contents
  page and repeated `HOME` navigation furniture. Every answer is inside the page
  image, so `keys.ts` correctly reports "read 0 of 16". **The numbers being
  present is not evidence the answers are.**
* **CHEMISTRY 2026 — the text layer carries the answers.** Measured
  independently by three papers (`2026-56-1-3`, `2026-56-2-3`, `2026-56-5-2`):
  the scheme extracts at **~13,000 chars including every Section-A letter and
  the answer prose**. So it is the rule for 2026 Chemistry, not an exception.

**Routing is unchanged — read the key by VISION first on both subjects**, since
vision is correct either way and the text layer is not available on Physics. But
on Chemistry the text layer is a **free second independent read**: extract it
and diff the 16 letters against what you read off the image. Where the two agree
the key is corroborated twice; where they disagree, stop and report. Papers that
did this reported 16 of 16 agreement.

### ⚠ CBSE sometimes VOIDS its own question — capture it, do not silently key it

Real, and on the pilot paper. The marking scheme prints:

```
6.   (c) / Full mark to be awarded for any option        1
13.  (c) / Award full mark if attempted (Printing error) 1
```

These are questions **the Board itself declared defective** and awarded to
everyone. Set `_cbseVoided: "<the printed note verbatim>"` on those rows and
keep the printed letter as `answer`. Do not "fix" the question, and do not drop
it — a defective question with an unexplained key is exactly what this flag
exists to prevent.

### ⚠ A VOID CAN SIT OUTSIDE SECTION A — measured, and it is not rare

Everything below is written in Section-A language because that is where voids
were first found. **They are not confined to it.** Measured across all 78
Physics marking schemes: **14 void notes, 11 in Section A and 3 outside** on a
narrow scan; widened to any award-regardless wording, **11 sit outside Section A
across 8 papers** — 2023 55/4/2 (Section B), the whole 2024 55/2 series and the
whole 2025 55/2 series (Section D), and 2025 55/5/3.

**So SCAN THE WHOLE MARKING SCHEME, not just its Section-A table.** An agent who
reads 16 clean letters and stops will ship a Section-D sub-part with either no
answer (which `validate.ts` catches) or a DERIVED one (which nothing catches).

Two consequences worth stating outright:

- **Case-study sub-parts may ALSO be keyed MCQs — but ONLY on `full70`.** On
  2024/2025/2026 papers the case studies are Section D and their sub-parts
  are MCQs, so the scheme's Section-D block holds ten more answers per paper:
  take them verbatim, same rules. **On `full70_phy_2023` this is FALSE** —
  the case studies are Section E and their sub-parts are SUBJECTIVE, answered
  with mark splits and worked working rather than option letters. Such a
  paper has exactly 18 keyed answers, all in Section A. An earlier version of
  this bullet stated the `full70` shape as though it were universal.
- **A merged scheme renumbers the same void.** 2024 55/2/1's void is Q30(i);
  in its siblings the identical question is Q29(i). A page-range slip therefore
  attaches a void to the wrong question rather than failing loudly.

### ⚠ PHYSICS ADDS THREE MORE VOID SHAPES — measured, and none occurs in Chemistry

Taken in order of how often they turn up. All three are real on Physics papers
transcribed for this ingest.

**(a) The KEYLESS void — CBSE prints NO letter, because no option is right.**
Real, seven questions across five Physics papers:

```
4.   Since no option is correct award 1 mark even if student does not attempt.
11.  No option is correct, award 1 mark.
2.   No option is correct. [Award one mark to each student]
```

There is no letter to keep. Set **`_noCorrectOption: true`**, leave `answer`
absent, and put the printed note in `_cbseVoided`. `commit.ts` and
`validate.ts` both accept that combination — an MCQ with no answer is a hard
error *unless* `_noCorrectOption` says so explicitly, so the assertion has to
be made rather than implied by an empty field.

**(b) The MEDIUM-SCOPED void — the dangerous one. STOP and report it.**
CBSE sometimes voids a question for ONE language edition only, and the two
directions look alike while meaning opposite things:

```
2.   In Hindi version none of the answer is correct, Therefore award 1 mark.
        → the ENGLISH key STANDS. Voiding this row throws away a good question.

11.  (c) ... for students who have opted to answer the question in Hindi
     medium only. English medium students - There is misprint in the English
     version ... full mark to be awarded to each student who have opted to
     answer the question in English medium.
        → the printed letter is the HINDI answer. Keying it asserts an answer
          CBSE explicitly VOIDED for the paper you are transcribing.
```

**We ingest the ENGLISH paper**, so getting this backwards is silently wrong in
both directions. `parseSectionAKey` refuses these outright rather than guessing,
which is why such a paper reaches you flagged for vision. Read the marking
scheme page, decide which edition the clause governs, and **say so in your
report** — do not resolve it quietly.

---

**(c) The DUAL KEY — CBSE accepts EITHER of two options.** The Section-A cell
prints two letters and no prose note, in any of four measured spellings:
`(A) resistor / (C) capacitor` · `(A) / (B)` · `(a) / (b)` · `A OR B`.

This is **not** a keyless void — two options are accepted, so
`_noCorrectOption` would assert something false — and not the letter-plus-note
shape either. Record the cell verbatim in `_cbseVoided`, ship ONE letter as
`answer`, and **flag it**: nobody was disadvantaged in the exam, but the bank
displays a single answer and that choice is a teaching decision.

> Ship the letter that **teaches the syllabus point**, not simply the first
> printed. 2025 55/2/1 Q12 asks what a p-n junction with a high p-to-n
> resistance acts as, accepting *resistor* or *capacitor*: "resistor" restates
> the stem's own premise, while "capacitor" is the depletion-layer capacitance
> the chapter exists to teach. Shipped as C. **The three dual keys in the
> committed Chemistry corpus predate this rule and ship the first-printed
> letter** — re-adjudicating them is a logged backfill candidate, not something
> to change in passing.

---

**(d) THE GRACE NOTE ON A SUBJECTIVE SUB-PART — and the one rule that decides
every case above.** The commonest award-regardless wording is not about an MCQ
at all. It sits under a worked answer in Section B, D or E:

```
Note: Full credit to be given for part (b) for mere attempt.
Note: Full credit of 1 1/2 marks is to be awarded for part (iii) even if a
      student does not attempt this part.
(Note : Award full credit of this part if a student merely attempts this part.)
```

There is no key to void and the scheme still prints a correct worked answer, so
it is tempting to treat these as prose and leave them in `_flag`. **Do not.**
Measured across the Physics corpus 2026-09-12, that judgement call had already
been made both ways on ONE PRINTED QUESTION: 2024 55/1/1 Q26, 55/1/2 Q27 and
55/1/3 Q28 are byte-identical stems carrying the identical note, and two of the
three shipped without `_cbseVoided`.

**THE RULE, and it is the same axis for all four shapes — it is not a new one:**

| the note is... | example | field |
|---|---|---|
| **UNCONDITIONAL** — credit irrespective of correctness or of attempt | *"for mere attempt"* · *"even if a student does not attempt"* · *"no option is correct, award 1 mark"* | **`_cbseVoided`** (verbatim) |
| **CONDITIONAL** on the student's work being right | *"if a student writes only one value of angle"* · *"if the student takes A other than 60 degrees and traces the path correctly"* | `_flag` only |
| **EITHER OF TWO answers accepted** (dual key, any format) | *"(A) resistor / (C) capacitor"* · *"full credit for taking n = 3 or n = 4"* | **`_cbseVoided`** + ship one answer |

An unconditional award is the Board declaring the question defective — usually
because the paper omitted data the question needed — **even when the scheme
prints a full worked answer beside it**. A conditional one is ordinary marking
latitude and asserts nothing about the question. Scope the note to the SUB-PART
it names: *"full credit for part (b)"* voids 2 of 3 marks, not the row.

`_cbseVoided` is read by no code today and is not hashed, so it is documentation
— which is exactly why it has to be applied mechanically off the wording rather
than re-derived per row. Nothing will catch you getting it wrong.

## 2c. Reading the scheme: four disciplines, each of which cost a real investigation

None of these is about what the marking scheme SAYS. They are about how it is
read, and every one produced a confident wrong answer before it was written down.

**(a) `msPages` in `_papers.<subject>.json` is 0-BASED, and nothing said so.**
`2022-55-3-2` records `msPages {from: 8, to: 15}`. Read as 1-based, that pulls
in the SIBLING 55/3/1's page and drops this paper's own — and the agent that did
so manufactured a phantom finding, briefly concluding CBSE had mis-printed a
footer. `prep.py` extracts correctly, so the rendered `ms/p00…` were right all
along; **the trap only bites an agent that goes back to the raw index**, which
is exactly what an agent chasing a discrepancy does. This has now produced two
false defect reports.

**(b) Whether the scheme is MERGED is a (subject, year) fact — measured
2026-09-13 across all 156 science papers:**

| | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|
| **Physics** | merged | merged | merged | merged | **per-set** |
| **Chemistry** | per-set | per-set | per-set | per-set | per-set |

**Chemistry marking schemes are NEVER merged — 0 of 78.** Physics is merged in
63 of 78, everything except 2026. So `msPages` is a Physics-2022-to-2025
concern and nothing else, and an agent on a Chemistry paper who goes looking for
a page range is looking for something that does not exist.

**Verify a merged scheme PER PAGE by its own printed footer.** Every
rendered page of a merged scheme prints its own set id — `042_55/2/2_Physics #
Page-N`. Map all of them before reading a single key. On 55/2/2 that gave
`55/2/2` on 10 of 10 pages and zero occurrences of either sibling, which is
positive proof no key or void came off the wrong set. It is also the check that
would have caught (a) immediately, and it costs one pass over the text layer.
This matters because §2's own warning is that a page-range slip **attaches a
void to the wrong question rather than failing loudly** — the sets are
reshuffled, so the same printed question carries a different number in each.

**(c) The contact sheet is a MAP, not a SOURCE. Use it to decide WHERE to look,
never WHAT is there.** Measured misreads at thumbnail size, on real papers:
`6.5 × 10⁻¹⁹ J` reading as `10⁻¹⁵`; a page count off by five; and — the one
that matters most — **a digit inside a stem**. At least eight separate
thumbnail misreads were logged across the wave, several of which would have
changed a number in a committed question or a formula in a solution. Re-render
the single page at full size before recording anything you read off a sheet.

**(d) FIXTURE-VALIDATE a void scanner BEFORE you trust its output. Five of five
failed.** Every void-detection scanner examined during the wave — five, written
independently by five agents — **was defective on its first fixture run**, and
four of the five would have shipped a paper as "no voids found". The natural
blind spots turned out to be shared rather than random:

* `even if **a** student does not attempt` vs `even if student does not attempt`
  (two scanners, independently);
* a note **split across a page break**, so it exists in neither page's text;
* the either-of-two-answers shape, which carries no *award* wording at all.

**This file's own printed examples are a ready-made fixture set** — there are 16
of them, all verbatim from real schemes. Run your scanner over those plus a
handful of NEGATIVE controls (conditional notes from §2's rule table, which must
NOT fire), page-joined and whitespace-flattened, and only then over the paper.
A scanner that has never been shown to go red on a known positive is evidence of
nothing.

> The same rule applies to the decimal check. A mechanical scan for `·`
> (U+00B7) is cheaper and better than eyeballing dot height — but it has been
> wrong twice: one paper encodes its raised dots as **U+F0D7** (a private-use
> Symbol-font codepoint) and another mis-encodes a single token while the rest
> of the page is clean. Treat a U+00B7 hit as proof of raised dots; treat its
> ABSENCE as unproven, and go to the page.

---

## 3. Chemistry notation

- **Formulas go in maths zones**: `\(\mathrm{C_2H_5NH_2}\)`, `\(\mathrm{NH_4^+}\)`,
  `\(\mathrm{[Co(NH_3)_6]^{3+}}\)`. Use `\mathrm{}` so they do not render
  italic — an italic `\(C\)` reads as a variable, not carbon.
- **Charges and oxidation states**: `\(\mathrm{Fe^{2+}}\)`, `\(\mathrm{Cr_2O_7^{2-}}\)`.
- **Reaction arrows**: `\(\rightarrow\)`, `\(\xrightarrow{\text{reagent}}\)`,
  equilibrium `\(\rightleftharpoons\)`.
- **Greek**: `\(\alpha\)`, `\(\beta\)`, `\(\Delta\)`, `\(\lambda\)`, `\(\pi\)`.
- **Units** stay plain text outside the maths zone where they follow a number in
  prose, exactly as the Maths brief says.


### Structures and mechanisms are FIGURES

An organic structure, a mechanism, or a coordination-geometry drawing **cannot
be typed**. Do not attempt an ASCII or LaTeX approximation — it will be wrong
and it will look authoritative.

Flag the row with **`_figure`** — that exact field name, and it MUST open with
one of three classifications. The pipeline reads no other field:

```
"_figure": "REQUIRED — all four options are drawn benzene rings; the stem
            names nothing. Page idx 8."
```

| classification | meaning | what happens |
|---|---|---|
| `REQUIRED` | the figure **is** the question — options are drawings, or the stem names nothing | cropped and attached, **and** the dedup guard fires |
| `ILLUSTRATIVE` | the compound is named losslessly in the stem, so the row is answerable from text, but the drawing is worth showing | cropped and attached |
| `DECORATIVE` | carries no data (a captioned photograph) | not attached |

Always include **`Page idx N`** — the crop step parses the page out of this note
and otherwise gets `null`.

> ⚠ **`REQUIRED` is a correctness guard, not just a cropping hint.** `commit.ts`
> uses it for a hash-collision pre-flight, because where the figure IS the
> question two genuinely DIFFERENT questions can carry a byte-identical
> `content_hash`. The documented case is Maths 65/7/1 Q1 and 65/7/3 Q1: same
> stem, same four option texts, same key (A) — but one graph is tan⁻¹ and the
> other sec⁻¹. Such a row is refused rather than silently deduped. Marking a
> merely-illustrative figure REQUIRED costs nothing (the guard only bites on a
> real collision); failing to mark a load-bearing one merges two different
> questions silently. **When unsure, choose REQUIRED.**
>
> An earlier version of this file said `_needsFigure`. Nothing reads that, so 13
> papers' figure flags were invisible to both the crop step and the guard.

**Naming vs describing — the distinction that decides an MCQ.** Naming a compound
the paper draws (`but-2-ene`, `phenol`) is a lossless *reading*, not an
approximation, and is preferred. But if the options are drawings and naming them
would **state the answer**, describe the drawings instead without naming them,
so the discrimination the question tests survives. Say which you did.

## 4. Physics notation

- **Vectors**: `\(\vec{E}\)`, `\(\hat{i}\)`. The Symbol-font corruption eats
  these in the text layer, so they must come off the page.
- **Units**: `\(\mu\mathrm{F}\)`, `\(\Omega\)`, `\(\mathrm{Wb\,m^{-2}}\)`.
- **Circuit diagrams, ray diagrams, field sketches and graphs are FIGURES** —
  same rule as above, and they are far more common here than in Chemistry.

  ⚠ **Figure load is a PER-PAPER fact, not a Physics constant.** Do not budget
  effort from another paper's count, and do not go hunting for figures a paper
  does not have. Measured across the eleven papers transcribed so far, the
  figure-flagged rows run **1 to 12**: 2025 55/7/1 has ONE figure in the whole
  paper, while 2025 55/4/1 and 2025 55/1/1 have twelve. Sections B, C, D and E
  all carry them — they are not front-loaded.

  Every *"draw a labelled diagram / plot a graph / show graphically"*
  instruction is the STUDENT drawing, not a printed figure. Do not flag those.

### ⚠ In Physics the figure usually IS the discriminator — describing it can hand over the answer

§3's "naming vs describing" rule is Chemistry-shaped. Naming a drawn compound
(`but-2-ene`) is a lossless reading and costs nothing. Physics is different: on
**6 of the pilot's 8 figures**, a complete verbal description would have stated
the answer outright, because what the question tests is exactly what the drawing
carries — field direction, winding sense, current sense, circuit topology.

The resolution, which worked and is now the rule:

> **Describe the LABELLING AND LAYOUT; withhold the one directed quantity under
> test — and say in the note which you did.**

Worked examples from the pilot:

| what is drawn | describe | withhold |
|---|---|---|
| charge moving in a field region | that there are axes, a field region, a particle | the direction of **B** and of **v** — every option names a plane |
| three bulbs and a key | that there are three identical bulbs, a battery, a key | which bulbs are parallel, and which branch the key sits in |
| two coils | the terminals M/N/O/P and the components | the winding sense of each coil |
| an I–t graph | the axes, their units, the tick values, the shape | the comparison the question asks for |

Where nothing can safely be said, say nothing and mark it `REQUIRED` — that is
the correct outcome, not a failure.

### A figure shared by a CASE STUDY goes on EVERY sibling

A Section-D case study is one passage with several sub-parts, and its figure
routinely carries a quantity the passage never states. On the pilot, Q29's plate
separation `d` appears in **every option of every sub-part** and is defined only
in the drawing — so all five siblings are unanswerable without it.

**Flag `_figure` on every sibling that needs it, not just the first.** Rows are
attached individually (`image_url` is per question, and there is no per-context
image), so a sibling without the flag renders without the figure.

The cost is bounded and is worth paying: `figure-groups.ts` keys on
`content_hash`, and siblings hash differently, so they become separate groups.
The crop step can point them all at ONE crop file, so the expensive part —
cropping and eyeballing it — happens once no matter how many siblings cite it.

---

## 5. Chapters

Use the exam's existing chapter list **verbatim**, because a chapter name
differing by a single space silently forks the corpus in two.

> ⚠ **NOTHING AT COMMIT TIME WILL SAVE YOU FROM A TYPO HERE.** An earlier
> version of this file claimed `commit.ts` "validates against it and refuses an
> unknown name". It does not — its own header says the opposite: *"this script
> does not re-check chapter/subtopic names, and a bad chapter name AUTO-CREATES
> a duplicate chapter rather than failing."* The only thing that catches it is
> **`validate.ts`, and only if you run it**, which is why running it and
> reporting its output verbatim is a required step rather than a courtesy.
> Subtopics are worse: they auto-create with no check anywhere.

**Get the live chapter AND subtopic axis from the database rather than from a
list in a document** — a hand-copied taxonomy is exactly what goes stale:

```
npx tsx scripts/cbse-12-pyq/axis.ts --subject=physics
```

The chapter list below is kept for orientation. The script is the truth.

**Chemistry (10):** Alcohols, Phenols and Ethers · Aldehydes, Ketones and
Carboxylic Acids · Amines · Biomolecules · Chemical Kinetics · Coordination
Compounds · Electrochemistry · Haloalkanes and Haloarenes · Solutions ·
The d-and f-Block Elements

**Physics (14):** Alternating Current · Atoms · Current Electricity · Dual
Nature of Radiation and Matter · Electric Charges and Fields · Electromagnetic
Induction · Electromagnetic Waves · Electrostatic Potential and Capacitance ·
Magnetism and Matter · Moving Charges and Magnetism · Nuclei · Ray Optics and
Optical Instruments · Semiconductor Electronics: Materials, Devices and Simple
Circuits · Wave Optics

### ⚠ The 2022 Term-II paper predates NCERT's rationalisation

It examines content the current chapters no longer cover, and there is exactly
**one** such chapter — measured across all 15 of that year's marking schemes,
word-boundary matched:

**Chemistry → `Surface Chemistry [Outdated]`.** Use that string verbatim; it is
in the chapter list above. It covers colloids (lyophilic/lyophobic, coagulation,
Tyndall, emulsions, micelles), adsorption, and physisorption vs chemisorption.

**Physics needs no such chapter** — every topic its 2022 papers examine has a
live chapter. If you believe you have found an exception, say so rather than
inventing a name.

Do **not** file one of these onto a plausible-looking neighbour like Solutions
or Electrochemistry because it looks adjacent: that is quietly wrong, and a
student practising it would have no way to know the content was dropped.

> ⚠ **Never put `[Outdated]` in a question's STEM.** The stem is the faithful
> transcription of a real board paper and is part of `content_hash`, so editing
> it would both falsify the record and change the row's identity. The marker
> lives in the CHAPTER NAME (where a student sees it before starting) and the
> 2022 provenance note is added automatically at commit.

If you meet a 2022 question whose topic fits **neither** the ten live chapters
nor Surface Chemistry, do not guess: flag it `_outOfSyllabus: "<the topic>"`,
leave `chapter` empty, and report it. That is a finding, not a blocker.

---

## 5b. ⚠ The marking scheme's `OR` means TWO different things

The printed instructions usually give no internal-choice count ("in few
questions in all the Sections except Section A"), so the count has to come from
walking the marking scheme for `OR`. **But a scheme `OR` is ambiguous:**

* an **internal choice** — a whole alternative question, which IS a row; and
* an **equivalent form of the answer** — `P = VI cos φ OR P = I² Z cos φ`,
  which is not.

Measured on 2024 55/1/1: two of its scheme ORs sit INSIDE an answer, and a
naive scan would have invented an alternative for Q25. Take only a **bare `OR`
on its own line**, and confirm each against a printed `OR` (and its Hindi
`अथवा`) on the paper itself.

> **The marks sum cannot save you, and it fails asymmetrically.** An
> alternative is not a primary branch, so a DROPPED one still totals 70 and is
> invisible; an UNMARKED one inflates the total and is caught. Two agents hit
> the second case (71 and 75) and found it only because they summed.

## 6. Dedup is TEXT-based here — the Maths image-hash stage does NOT apply

The Maths pipeline's stage-1 dedup hashes the marking scheme's per-question
IMAGES. **Measured: Physics and Chemistry marking schemes have no such images.**
They are text documents whose figures sit inside the ANSWERS, so hashing them
would measure figure reuse and silently under-detect question reuse.

So there is no `plan.txt` skip list to work from. **Transcribe every question on
the paper.** A true duplicate costs nothing — `content_hash` collapses it at
commit — whereas a wrongly-skipped question is lost silently.

When you are given an opener set's JSON to compare against, match on **content**
and report the overlap you found. Do not compare position-by-position: the sets
are RESHUFFLED, so block 1 against block 1 can only match by coincidence.

### ⚠ CBSE RE-AUTHORS questions between sets — a follower is not a shuffled opener

This is the single most consequential thing the wave-4 follower ingest measured,
and it governs how much of an opener you may reuse: **none of it.** Across the
44 follower papers transcribed, ten reported substantive re-authoring, and
**not one Chemistry follower turned out to be a pure reshuffle of its opener.**
A follower set routinely carries the same *topic* with different numbers,
different options, a different sub-part split, or a different question entirely.

So the comparison is a DEDUP AID, never a transcription shortcut. Transcribe
the paper in front of you. Three refinements earned the hard way:

- **Matching on an assertion alone is a trap.** An assertion-reason pair reuses
  a stock assertion across sets while changing the REASON, which is the half the
  question actually tests. Two rows matching on assertion text can be different
  questions with different keys. Match on the pair.
- **A key DISAGREEMENT is strong evidence the questions DIFFER.** If two rows
  look identical and the two schemes key different letters, the default reading
  is *different question, or reordered options* — not *one scheme is wrong*.
  Check the option ORDER before you consider a key error.
- **A key AGREEMENT means nothing.** With four options a coincidental match runs
  at 25%, and stock topics cluster on the same answer. Agreement is not evidence
  of identity; only the stem and option TEXTS are.

Where two rows are genuinely the same question, `content_hash` collapses them at
commit and you need do nothing. **The exception is a figure-dependent row** —
see §3's `REQUIRED` guard, which exists precisely because two genuinely
different questions can carry a byte-identical hash when the discriminator is in
the drawing. Those must be adjudicated in `data/hash-collisions.json` rather
than deduped on sight.
