# CBSE Class-12 PHYSICS + CHEMISTRY — addendum to the transcription contract

Read `TRANSCRIPTION_BRIEF.md` first. **Everything in it still applies** — the
bilingual page-parity rules, the "read the page, never the text layer" rule, the
`\( … \)` maths convention, the set/`context` handling, the internal-choice
(`OR`) handling and the JSON shape are all unchanged.

This file records only what is **different for the two sciences**, and every
item was measured off the real papers on 2026-09-10.

---

## 1. The paper is 70 marks, and its shape changes by YEAR and by SUBJECT

Do not carry the Maths structure over. `sectionForQuestion` already knows the
right table; what you must not do is assume a band from a neighbouring year.

| pattern | who | shape |
|---|---|---|
| `term2_sci` | **2022**, both subjects | 12 q / 35 marks / 3 sections. A: Q1-3 (2 mk) · B: Q4-11 (3 mk) · C: Q12 case study (5 mk). **NO MCQs at all.** |
| `full70_phy_2023` | **Physics 2023** | 35 q. A: Q1-15 MCQ, **Q16-18 assertion-reason** · B: 19-25 (2) · C: 26-30 (3) · **D: 31-33 LONG ANSWER (5)** · **E: 34-35 case (4)** |
| `full70_chem_2023` | **Chemistry 2023** | 35 q. A: Q1-14 MCQ, **Q15-18 assertion-reason** · B: 19-25 (2) · C: 26-30 (3) · **D: 31-32 CASE (4)** · **E: 33-35 long answer (5)** |
| `full70` | **2024, 2025, 2026**, both subjects | 33 q. A: Q1-12 MCQ, **Q13-16 assertion-reason** · B: 17-21 (2) · C: 22-28 (3) · D: 29-30 case (4) · E: 31-33 LA (5) |

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

### ⚠ PHYSICS ADDS TWO MORE VOID SHAPES — measured, and neither occurs in Chemistry

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
  same rule as above, and they are FAR more common here: one 32-page Physics
  paper carries ~79 embedded images. Expect several per paper and flag each.

---

## 5. Chapters

Use the exam's existing chapter list **verbatim** — `commit.ts` validates against
it and refuses an unknown name rather than creating one, because a chapter name
differing by a single space silently forks the corpus in two.

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
