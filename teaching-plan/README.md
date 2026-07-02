# Teaching Plan — build runbook & distilled learnings

A **unified teaching plan** per subject-grade that maps the Maharashtra State Board syllabus to
NCERT and to the **PYQ-weighted reality** of the target exams (CET, NDA, …). It is authored as
data (two JSON files) and rendered to **one combined Word file**.

Built so far: **Maths XI** (27 units) and **Maths XII** (22 units).
This doc is the recipe for doing **Physics** and **Chemistry** the same way.

---

## 1. Architecture — two JSON layers → one Word file

Per subject-grade, identified by a **slug** `<subject>-<grade>` (e.g. `maths-xi`, `physics-xii`):

| File | Role |
|---|---|
| `<slug>-spiral-plan.json` | **Spine** — the units in teaching order + metadata (the "what order & why"). |
| `<slug>-deep-dive.json` | **Deep-dive** — per-unit subtopic → concept → 4-source mapping (the "what maps to what"). |
| `build-docx.py` | Generator (shared, subject-agnostic). |
| `<slug>-teaching-plan.docx` | **Output** — one combined file: plan (portrait) → section break → mapping (landscape). |

Run: `python build-docx.py <slug>` → writes `<slug>-teaching-plan.docx` only.
The JSON is the source of truth; the `.docx` is a throwaway render. Regenerate any time.

The two JSONs are joined by **`unit_no`**: the deep-dive stores only `unit_no` + `rows`; unit
metadata (title/board_source/phase/sessions) lives once in the spine and is joined at render time.

---

## 2. JSON schemas

### Spine (`<slug>-spiral-plan.json`)
```jsonc
{
  "grade": 11, "subject": "Mathematics",
  "board": "...", "textbook": "...", "plan_title": "...",
  "total_teaching_sessions": 145,      // or null if no session source (renders "TBD")
  "buffer_sessions": 35, "academic_year_sessions": 180,
  "notes": ["..."],                    // NOT rendered in the doc; keep synced anyway
  "guiding_principles": [{ "principle": "...", "meaning": "..." }],
  "phases": [{ "phase": 1, "name": "...", "blurb": "..." }],
  "units": [
    { "unit_no": "1", "title": "...", "board_source": "...",
      "sessions": 6,                   // or null -> "TBD" (supplementary/no-session units)
      "phase": 1,
      "nda_supplementary": true,       // optional: mark units NOT from the board textbook
      "why_here": "..." }
  ],
  "supplementary_nda_topics": [{ "topic": "...", "status": "...", "note": "..." }]  // optional record
}
```

### Deep-dive (`<slug>-deep-dive.json`)
```jsonc
{
  "grade": 11, "subject": "Mathematics",
  "sources": { "state_board": "...", "cet": "...", "ncert": "...", "nda": "..." },
  "legend": { "relevance": "...", "pyq_count": "...", "flags": "..." },
  "units": [
    { "unit_no": "1", "rows": [
      { "id": "1.1", "subtopic": "...",
        "concepts": ["...", "..."],
        "state_board": { "section": "§x.y ...", "exercise": "Ex x.y", "note": null },  // section=null => GAP
        "cet":  { "pyq_count": 22, "topic": "<bank subtopic name>", "relevance": "high", "note": null },
        "ncert":{ "section": "...", "exercise": "...", "note": "GAP - ..." },
        "nda":  { "pyq_count": 76, "topic": "...", "relevance": "high", "note": null },
        "flags": ["nda_anchor"] }
    ]}
  ]
}
```
**Flags** (rendered as chips): `nda_anchor`/`cet_anchor` (primary exam focus) · `ncert_gap` (not in
rationalised NCERT) · `ncert_aligned` (clean 1:1) · `sb_split` · `cet_only` (droppable for NDA) ·
`cet_leaning`. `relevance` ∈ low | med | med-high | high | none.

---

## 3. Sources & the hard rules

| Column | Source | Location |
|---|---|---|
| **State Board** | Balbharati chapterwise PDFs | **Maths:** `C:/tmp/PYQPs/MHT-CET/State_Board/<grade>/…`  · **Chemistry:** `C:/tmp/Practice/Chem/{11th,12th}/`  · **Physics:** `C:/tmp/Practice/Physics/{11th_Topics,12th_Topics}/` (the `00. *_SB_*.pdf` is the full book; `01..N` are chapterwise). |
| **NCERT** | NCERT textbook PDFs (rationalised) | `C:/Vilas/LWS_Pune/NDA_Subjects_Content/Subjects/NCERT/Books/<grade>/<Subject>/` — Maths, Physics, Chemistry all present (11th/12th). |
| **CET** | MHT-CET PYQ frequency | PYQ question bank (Supabase), exam `MHT-CET`. |
| **NDA** | NDA PYQ frequency | PYQ question bank (Supabase), exam `NDA`. |

> Columns are fixed at **State Board / CET / NCERT / NDA** for every subject (Physics & Chemistry too — no NEET/JEE column, even though the bank has them).

**Exam PYQ weights come from the bank; the OUTPUT files must NEVER reference it.**
- In JSON/docx, label weights as *"PYQ frequency from official past papers"* — never "bank", "PYQ Vault", or "PUBLIC".
- `pyq_count` = past-year-question count for the **topic cluster** (a cluster spans several rows, so counts repeat and must not be summed).
- The bank subject name differs by exam: NDA uses **`Mathematics`**, MHT-CET uses **`Maths`**. **Verify the subject string per exam** (for Phy/Chem, confirm each exam's exact subject name).

Bank SQL to pull weights (per exam+subject):
```sql
select e.name exam, ch.name chapter, st.name subtopic,
  count(q.id) filter (where q.visibility='PUBLIC' and q.question_kind='pyq') pyq
from subtopics st join chapters ch on ch.id=st.chapter_id
join subjects sub on sub.id=ch.subject_id join exams e on e.id=sub.exam_id
where (e.name='NDA' and sub.name='<subj>') or (e.name='MHT-CET' and sub.name='<subj>')
group by e.name, ch.name, st.name having count(...) > 0 order by e.name, pyq desc;
```

---

## 4. Build workflow

1. **Locate sources** — State Board + NCERT PDFs on disk; confirm the bank exam/subject strings.
2. **Extract textbook TOCs** — PyMuPDF (`fitz`) scan for section headings (`^N\.\d`) + `EXERCISE`/`Miscellaneous`.
   *Gotcha:* inside a bash heredoc, embed **`C:/...`** paths (MSYS does not convert `/c/...` there).
3. **Pull exam PYQ weights** — the SQL above (all chapters/subtopics, one pass).
4. **Author the spine** — units in teaching order (see §5). Split fused board chapters into pedagogical units.
5. **Author the deep-dive** — one row per subtopic; fill all 4 source columns; flag gaps. Source `topic` names from the bank subtopics so the exam column is an explicit anchor.
6. **Generate** — `python build-docx.py <slug>`.
7. **Audit coverage** (see §6) and fix gaps; regenerate.

Row IDs are `"<unit_no>.<k>"`; keep spine and deep-dive `unit_no` lists identical & in the same order.

---

## 5. Design principles (the pedagogy encoded)

- **NDA-first ordering.** NDA-tested content leads (phase 1 = NDA core); chapters/subtopics NDA does
  NOT test go to a **deferred CET block** (phase 2). *A pure-NDA student can stop after the NDA core.*
  Rationale: LWS is NDA-first, and the board order front-loads CET-only chapters that delay NDA content.
- **Subtopic-level split.** Inside an NDA chapter, split off CET-only subtopics into a deferred
  "… — CET Extension" unit (e.g. Maths XII split Application of Derivatives → NDA core + Rolle/MVT/approx).
- **NDA-supplementary units.** Topics NDA tests but the board omits (Binary Numbers, Sphere, Height &
  Distance) or only embeds (Logarithms) → add as units, sourced from NDA PYQs (board/NCERT/CET columns = GAP).
- **Split fused board chapters** into coherent teaching units (Maths XII: Trig Functions → equations +
  solution-of-triangles + inverse-trig; Differentiation 64pp → 3 stages).
- **Spiral / spacing / interleaving.** Front-load numerical/foundational content; teach a prerequisite
  early and revisit later (Maths: Statistics I central tendency early → Dispersion later). Interleaving &
  distributed practice beat blocked practice for retention.
- **Numbering.** Units are `1..N` sequential in teaching order; the board chapter reference lives in
  `board_source`, not the number.

---

## 6. Audit methodology (do NOT skip — breadth ≠ depth)

The automated keyword check proves **breadth** ("is every subtopic present?") but is blind to
**depth** ("is a heavy subtopic taught properly, or folded into a 'revision' line?"). Run both.

- **Breadth** — for every bank subtopic with PYQ>0, confirm a plan row covers it. Keyword-diff bank
  subtopics vs the plan text; anything unmatched is a gap. (Chapter-level: every bank chapter → a unit.)
- **Depth** — for every **heavy** subtopic (≥20 PYQ), confirm it is an **explicit anchor** in a row
  AND concept-rich (not just name-dropped). Match bank subtopic names vs the plan's `nda.topic`/`cet.topic`.
- **The recurring gap pattern:** SSC-rooted, board-de-emphasized, exam-heavy topics get under-weighted
  (Maths examples found this way: mean/median/mode 75 PYQ, coordinate-geometry-of-polygons 32, special
  determinants 20). Probe for these deliberately.
- **Verify NCERT gaps against the actual PDF text (grep), not the TOC** — the 2020 rationalisation
  removed a lot (Maths XII: planes, triple product, binomial distribution, tangents/Rolle). A keyword
  miss OR hit needs a context check (false alarms: terminology mismatch e.g. "sin(x+y)" not "compound";
  stale cross-refs; historical notes).
- **After every change:** spine↔deep-dive `unit_no` in sync · no non-numeric `unit_no` left · no
  "bank"/"pyq vault"/"public" string in either JSON · regenerate the docx.

Audit scripts (run from the **repo root** so `node_modules`/`@supabase/supabase-js` resolves; delete
after use): a breadth diff and a `≥20 PYQ` depth diff — both query the bank, load the plan JSONs, and
keyword-match. See the git history / prior session for `coverage.mjs`.

---

## 7. Physics & Chemistry — what will differ from Maths

**All four sources are available** (State Board under `Practice/`, NCERT present, CET+NDA in the bank),
and the columns stay **State Board / CET / NCERT / NDA** (no NEET/JEE) — so it's the same build as Maths.
State Board chapter counts on disk: Chemistry XI 16 / XII 16 · Physics XI 14 / XII 16.

Differences to expect:
0. **NDA-first vs board-order is a PER-SUBJECT decision — check the NDA level first.** Maths NDA is
   full +2 depth, so NDA-first ordering + CET tail applies. **Chemistry NDA is BASIC general science
   (Class 9-10, small weight) while CET is full +2** — so `chemistry-xi` uses **board-order spine +
   CET-primary weight + NDA as a light overlay** (no NDA-first reorder, no CET tail; the NDA column just
   flags the basic slice). Before building each subject, pull NDA vs CET weights and decide: if NDA tests
   the subject at +2 depth → NDA-first (Maths pattern); if NDA is basic → board-order/CET-primary
   (Chemistry pattern). Physics NDA is mid-way (14 ch, mechanics/optics/electricity at ~+1 level) — check
   its weights before choosing.
1. **Less "numerical foundation" framing; more concept/derivation/diagram.** The numerical-front-loading
   principle is Maths-specific. For Phy/Chem the analogues are formula/derivation-heavy vs recall-heavy
   chapters and diagram-dependent topics.
2. **NDA is a smaller subset** of Phy/Chem than of Maths (NDA Physics 14 ch / Chemistry 12 ch vs MHT-CET
   Physics 24 / Chemistry 29) — so the "NDA core" is narrower and the deferred "CET-only" block is larger.
   The audit's job (NDA-heavy topics the board de-emphasizes; board/CET topics NDA skips) is unchanged.
3. **Verify the bank subject string per exam** before pulling weights (Maths was `Mathematics` for NDA but
   `Maths` for MHT-CET; confirm Physics/Chemistry names the same way).

Slugs to use: `physics-xi`, `physics-xii`, `chemistry-xi`, `chemistry-xii`. Same generator, same schema.
