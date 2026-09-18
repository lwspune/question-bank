# Product roadmap

Pending features, data-model changes, and content work for Question Bank. Mirrors the "deferred" annotations scattered through the `CLAUDE.md` decisions log and consolidates them in one place.

**Live state** — for current bank size, per-subject counts, shipped features, test counts, and migration count, see the **"Live bank size"** line at the top of `CLAUDE.md` and the **Decisions log** section below it. Don't duplicate that here; it drifts on every upload.

---

## Classroom projection — the "Project" button goes icon-only

**Decided 2026-09-18, deferred to a later pass** (the overlay itself shipped the same day).

The trigger currently renders a `Presentation` icon **plus the word "Project"**. The word was
there for discoverability of an unfamiliar affordance; the decision is that the icon alone
carries it once teachers know the control, and the label costs horizontal room in a card meta
row that already holds a bookmark and a cart toggle — worst on `/board`, where it sits beside
the stem rather than in a dedicated row.

**What changes:** drop the text node in `PresentButton.tsx`. The button already carries
`aria-label="Project this question on the board"` and a `title`, so the accessible name and the
hover tooltip survive the change untouched — this is a visual-only edit, not an accessibility
one. Sizing wants a look at the same time: the control becomes an icon button and should match
the neighbouring icon controls rather than keep the label-shaped padding.

**Why not now:** it is a deliberate visual change to a control nobody has yet used on a real
panel, and the one thing that would inform it — whether the word is in fact needed for a
teacher to find the control — is answered by the browser pass that is still owed. Making it
icon-only before that pass would be guessing at the answer rather than reading it.

---

## Item statistics — what remains

**Built and live (2026-09-11/12).** Migrations 0095 + 0096, the pure core, the vault rollup,
the nda-tracker export + ingest, the `/browse` staff chip, `/dashboard/item-stats`, and
exposure in the paper builder. **8,984 sitting rows over 8,245 questions; 1,462 at n>=10, 625
at n>=20; 319 leads.** Spec: [ITEM_STATS.md](ITEM_STATS.md). Runbook: OPERATIONS.md.

Nothing here is blocked on code. What is left:

- **The browser click-through — owed, and only a human can do it.** Every surface is auth-gated
  `ƒ`, so the gate proves compilation and the two smokes prove the loaders; neither proves
  layout. Worth checking: the `/browse` card's expanded panel (five blocks now), the chip at
  360px, `/dashboard/item-stats` at 319 rows, and the two chips side by side in the paper
  editor and add panel — a question carrying both is the interesting case.
- **The weekly refresh is documented but NOT scheduled.** It is a genuine two-repo manual step
  (`node item_stats.js --out=…` there, then `itemstats:ingest` + `itemstats:rollup` here) and
  no single cron spans two repos. Either accept it as a Monday habit alongside `db:backup`, or
  decide to automate it — which needs the export committed somewhere both sides can reach.
- **The `/browse` leads filter**, deferred with reason: narrowing to leads needs the aggregate
  *before* the question query, i.e. an RPC or a full-table fetch on the hottest public page.
  Viable once a maintained aggregate exists — which decision 6 already anticipates for the
  read-path ceiling (~30-40 sittings on one question; ~1.3 today).
- **Difficulty promotion: deliberately NOT work.** `questions.difficulty` drives
  `selectByQuota` in every mock blueprint and is quoted as %HARD in 11 shipped guides;
  overwriting it from measurement would silently change which papers get built. If ever
  revisited, bands must be **per-format** — an MCQ p-value carries a ~25% guessing floor and a
  NAT one ~0%.

### Closed — the two MARK != KEY findings

Adjudicated 2026-09-12 (`question_reviews`, run `item-stats-leads:2026-09-12`): **both bank
keys are CORRECT**, verified by independent derivation. `∫₀⁴|x−1|dx` is 5, and the sentence
rearrangement's SPRQ is uniquely correct among its four options. Nothing in the bank needed
changing, and those two verdicts stand on their own.

The defects were institute-side grading — `Blueprint mock 1` q108 credited every attempter
though nobody chose the key, and `GAT MOCK W011` q25 denied every attempter including the four
who chose it. Measured impact: **14 student-questions, net −11.98 marks** (10 over-credited
3.33 each, 4 under-credited 5.33 each).

**Correcting those marks was considered and DELIBERATELY NOT DONE (user's call, 2026-09-12).**
Recorded here so it does not resurface as outstanding work. `nda-tracker/regrade_impact.js`
stays: it is read-only, wired into nothing, and reusable for the next finding —
`node regrade_impact.js --exam=<id> --q=<n>` reports who is mis-marked and by how much without
writing anything.

---

## Data model

### Cross-topic questions — decouple concept tags from the home subtopic (2-phase)

**Diagnosis (2026-06-07):** `subtopic_id` is overloaded — it does *filing/navigation* (where a question shows on `/browse`, which paper it belongs to) AND *concept membership* (because a concept tag is welded to the home subtopic: `question_concept_tags.subtopic_slug` must equal the question's subtopic). That weld causes every cross-topic friction point: the **same technique re-taught across N subtopics** (e.g. line-of-intersection = n₁×n₂ taught 3× in DC&Ratios/Straight-Line/Plane), **invisible cross-chapter prerequisites** (a Functions question needs `f'(1)` but links nowhere), and **move-as-the-only-fix** for mis-filing (move ⇒ forced retag). Today's footprint is small — 13 multi-concept-tag questions, 0 cross-subtopic tags (the wall holds), ~5–6 cross-chapter-prerequisite questions found in the MODERATE sweep.

**Ideal model (keep one canonical home; decouple membership):**
- Keep a **single canonical home** (chapter+subtopic) for navigation — `/browse`, the PYQ paper-builder, Word export, and guides all need one answer to "which paper/chapter." Do NOT multi-home or go fully tag-only; the chapter tree is load-bearing.
- **Drop `subtopic_slug` from the concept tag** (`concept_slug` is already globally unique; derive the subtopic from the concept). Then a question filed under *Functions/Domain* can point at the *Differentiation/derivative-at-a-point* concept without moving — kills the re-teaching duplication (one canonical teaching home per technique, removes **rename-rot** risk) and makes cross-chapter membership expressible.
- Add a **tag role** `primary | secondary | prerequisite`. Formalises the hand-applied rules: *home follows primary* (mis-filing mostly disappears); coverage gaps = primary/secondary not taught (prerequisites are expected-elsewhere, not flagged — automating the sweep's "exclude cross-chapter prerequisite" rule); and **prerequisite** unlocks the chip in Phase 1 below.
- Keep the **principles-vs-concepts authoring distinction** (curated/selective vs coverage/per-upload) — as a flag/role, not necessarily a merge; the authoring-loop reason for the wall is real.

**Phasing — trigger-gated, do NOT migrate preemptively:**
- **Phase 1 (cheap, no schema change to the home model): prerequisite links.** Surface "Needs: Differentiation →" cross-chapter pointers so a cross-topic question links the student to the missing prerequisite instead of stranding them. Curated TS map rendered through the existing `getQuestionResources` → `ResourceChip` cross-link infra; seed with the cross-topic questions already known (the `[d/dx]` Functions/Sequence ones, binomial-variance-in-Statistics, etc.). Highest UX value, no migration. **← do this first.**
- **Phase 2 (the decouple migration): only when rename-rot actually bites** — i.e. the first time renaming a shipped concept silently breaks its re-taught copies across subtopics. Drop `subtopic_slug` from the tag PK; rework `loadConceptDrills` / mastery-checkpoint queries / `getQuestionResources`; re-derive. Real regression surface for currently-low volume — the rename-rot incident is the trigger, not a calendar date.

### Cross-batch passage reuse — `passages` table (option C)

Promote `set_id` (currently a string `"<uploadJobId>:<setLabel>"`) into a real table so the same passage can be reused across batches. Tradeoff documented in the 2026-05-12 "Question sets" decision-log entry: option B (current per-upload scope) is sufficient for now; user said re-upload is their preferred backfill anyway. Migration B → C is mechanical when wanted.

### Audit columns: `updated_at`, `updated_by`

Per-question audit trail. Currently `created_at` + `created_by` only. Useful for "who touched this question last and when" once teacher accounts exist.

### Optimistic locking on edit

Currently no concurrency check — two admins editing the same question race the write. Low risk today (one admin per org), but add `version int` or `updated_at` check on PUT before opening teacher writes.

---

## Formula axis — next chapters, and the three things deferred at launch

`/formula` shipped 2026-09-17 with **one chapter**: Matrices & Determinants, 40 identities over 707 questions, every one of its 768 MCQs read individually. Pipeline + runbook: `scripts/formula/README.md`.

**Scaling it is a data project, and the honest cost is known.** A signature classifier scored against all 768 hand labels reached **59.2% precision / 45.0% recall**, with 1 of 79 identities clearing a 90%/85% bar (`npm run formula:score` re-runs it). So each chapter costs a full read of its solutions. The one thing that would change that is an **LLM tagging pass** — the reading done by the machinery the grounding and key-audit pipelines already run at scale, with a human-verified sample to measure it against these 768 labels as ground truth. Not built; this is the highest-leverage follow-up by a distance.

**Deferred at launch, in priority order:**

1. **Pagination on dense pages.** `/formula/cofactor-expansion` renders 99 question cards in one ~2.3 MB page. The exam and PYQ/Practice filters take the edge off, but the top few identities need paging before this is comfortable on a phone or worth pushing publicly. `lib/paging.ts` + the `Pager` pattern from `/dashboard/students/[id]/performance` is the precedent.
2. **A primary-nav tab.** Deliberately NOT added: the nav already carries 7 public tabs, and a "Formulas" tab promises site-wide coverage while one chapter of one subject is live — most visitors would dead-end. Entry points today are the footer, the sitemap (41 URLs) and a "Questions by formula" chip on any `/notes` chapter that has an index, derived from `FORMULA_CHAPTERS` so it appears automatically. Revisit once several chapters across more than one subject are done, which is also when a per-chapter or per-subject index page starts to earn its place over the single flat `/formula`.
3. **Shareable filtered views.** Filters are client-side and not in the URL, so `NDA + Past-year` cannot be linked. That is a deliberate trade (see the note in `src/lib/formula/filters.ts`) against two documented traps — the prerender bail and the same-route prefetch outage of 2026-09-15. If shareable links are wanted, the safe shape is a separate static route per combination, not a query param on this one.

**Also worth a look when a second chapter lands:** whether the flat global slug namespace holds. `det-2x2` is chapter-agnostic but `cofactor-expansion` may mean something slightly different in a Determinants chapter and a Linear Algebra one, and today a slug is global across all chapters.

## `/guide` expansion

**Nine guides shipped:** NDA Mathematics (Template A — principles-first), NDA English (Template B — playbooks-first), NDA PART B Physics (Template C — chapter-playbooks + skill-strand + formula compendium), NDA Chemistry (Template B variant — Recall/Rule/Calculate), NDA Biology (Template B variant — Recall/Apply/Verify), NDA Geography (Template B + non-flat %HARD variant), NDA History (Template B + tier-style strands variant — Cornerstone/Foundation Recall/Quick-Win), NDA Polity (Template B + tier-style strands variant 2 with INVERTED third-tier — Cornerstone/Foundation Recall/Specialist Wildcard), NDA Economics (single-page landing — deliberately thinner terminal node; bank too small for a multi-route guide). Template choice flow + per-template editorial shape: CLAUDE.md "Guide structure templates" section. Don't propose forcing one template onto a subject whose bank shape rejects it — see [[english-guide-structure-diverges]]. **NDA Current Affairs is explicitly deferred** (content half-life issue — see CLAUDE.md decisions log 2026-05-19).

### Guide-side Present mode (adapt `NotePresenter` for `/guide` playbook pages)

Today Present mode exists only on `/notes` subtopic pages (the slide deck derives from a `SubtopicNote` via `splitNoteIntoSlides`). Teachers projecting playbook content in class would benefit from the same overlay applied to playbook detail pages (trigger + story + sub-skills + traps + worked examples). Needs a playbook-shaped slide splitter (similar to `splitNoteIntoSlides` but consuming `PlaybookDetail`) + presenter wiring across all 7 playbook-bearing guide subtrees (English / Physics / Chemistry / Biology / Geography / History / Polity). ~2–3 hour build. Tier 4 scope per the 2026-05-18 Present-mode-discoverability ship which deliberately left this to a separate commit.

### MHT-CET strategy guides (Maths / Physics / Chemistry)

Reuse the shared infra (`_components/`, `resolveTaxonomy`, JSON-LD, OG image, sitemap pattern). Subject-level taxonomy cleanup must precede each guide — Physics + Chemistry still pending (see Taxonomy section below). MHT-CET Maths is already cleanly bucketed (248 q · 56 sub). Template choice per subject after a bank-shape analysis. **This is now the primary remaining `/guide` scope** — NDA guide coverage is effectively complete (9 of 10 NDA subjects guided; Current Affairs explicitly deferred).

### Future-exam guides

IPMAT, CUET, NEET, JEE Main — already shown in `/browse` Hero as "Coming soon." Each needs taxonomy seed + question bank + strategy guide.

---

## `/notes` graduated practice — L1/L2/L3 inline reps + practice sourcing (analysis done 2026-07-22; deferred)

**Trigger for revisit:** user flagged the current per-concept `practiceSet` as low quality and asked whether to (a) source practice from HSC/CBSE and (b) add L2/L3 tiers alongside L1 with 3 questions each. Analysed in detail, then parked as a "big change — sleep on it." Full reasoning in the 2026-07-22 chat; key facts distilled here so we don't re-derive.

**Two distinct problems, don't conflate:**
1. **L1 quality.** The authored `practiceSet` reps are deliberately trivial fluency items (e.g. "Order of a 3×5 matrix? → 3×5", "Iⁿ? → I") — vocabulary/one-step recall, not exam-representative. Fixable cheaply by rewriting them into genuine one-step *problems*; **no architecture change**. This is Phase 0.
2. **No graduated harder practice inline.** The only inline attemptable practice is the authored self-check (1) + `practiceSet` (L1). Real bank questions appear only as the single featured PYQ + a "Drill N more" link *out* to `/browse`. Adding inline L2/L3 is the real feature.

**Load-bearing constraint (the crux cost):** `question_concept_tags` holds **4,792 PYQ questions and 0 practice** — practice/board questions are never concept-tagged by design, because every tag-gated surface (notes drills, guide principles, quiz-harvest, worked examples) assumes **tag ⇒ PYQ**. To surface bank *practice*/board questions per concept you must either (a) concept-tag practice too + add a `kind`/exam guard at every PYQ-only consumer (invasive, regression-prone), or (b) build a **separate practice-tag axis** that never touches `question_concept_tags` (cleaner, more new code). Recommend (b).

**Source decision — NDA practice bank beats HSC/CBSE.** The NDA *practice* corpus (~219 practice q in Matrices alone, difficulty-labelled, MCQ, same exam) is the right primary source: aligned, correct format, no cross-exam mapping. Boards are ~90% **subjective** (CBSE Matrices+Determinants = 207 q but only 18 MCQ; State Board Matrices ~120 q subjective + error-prone keys, 151 errata bank-wide) → poor fit for MCQ short-reps; use CBSE **MCQ-only** as a thin supplement for genuinely thin concepts, skip HSC subjective.

**Feasibility of "3 per tier per concept":** EASY is thin at the *concept* level (Special Determinants: 1 PYQ-EASY + 2 practice-EASY for the whole 4-concept subtopic; Linear Systems 1+1) — that thinness is *why* L1 is authored. A rigid 3×3 won't fill uniformly. Prefer **variable counts** and/or tier at the **subtopic** level where volume exists.

**Recommended phasing when revisited:** Phase 0 = rewrite L1 reps to genuine problems (Matrices pilot, no schema). Phase 1 = pilot inline L2/L3 sourced from the NDA practice bank via a **separate practice-tag axis**, Matrices only, variable counts; measure effort/quality before bank-wide. Boards = targeted MCQ supplement only. Avoid duplicating the existing subtopic **mastery checkpoint** + per-concept **"Drill N more"** link — inline tiers must add *graduated attempt-then-check without leaving the page*.

**Type/UI implications:** `PracticeProblem` (prompt/answer/method) is too light for real MCQs — either extend it with a `tier`/`difficulty` and keep authoring, or reference bank UUIDs and render MCQ-style (options + reveal, like `WorkedExampleCard`). Open decisions for the user: primary source · tagging mechanism · tier rigidity · first-cut scope.

---

## Taxonomy cleanup (data work)

Per-chapter subtopic consolidation from question-leakage names ("Integral of 1/(1−cosx)") to technique-level canonicals ("Half-Angle Substitution"). Workflow documented in the [[reclassification-sql-pattern]] and [[taxonomy-inline-iteration]] memories. Done counts + per-subject narratives: CLAUDE.md "Cleaned subjects · post-delta sizing" table and [[taxonomy-cleanup-progress]] memory.

Pending:
- MHT-CET Chemistry (33 chapters · ~241 subtopics)
- MHT-CET Physics (27 chapters · ~243 subtopics)
All NDA cleanup complete. Phase B/C/D template fully stable.

---

## Content quality audits (data work)

Per-chapter sweep for LaTeX formatting, broken math, hallucinated solutions, and **wrong correct-answer keys**. The *primary* value of this audit is the last item — LaTeX prettification is a cleanup side-effect. Audit workflow is now stable: paired skills `/latex-cleanup` (mechanical, ASCII-safe) and `/solution-cleanup` (judgment-heavy, key flips need user approval), with autonomous gdrive PDF fetch for stem/option verification and screenshot fallback for diagram-dependent rows. See [[gdrive-pdf-fetch]] and [[unicode-in-solution-rewrites]] for the supporting workflow memories.

**Done — NDA bank-wide closed at probe-flagged surface (2026-05-27):**

| Subject | q | Wrong-key flips | Preserved paper defects | Notes |
|---|---|---|---|---|
| NDA Maths (full per-chapter) | 2,160 | ~82 | 2 (Functions Q77, IT Q42) | All 31 chapters individually audited |
| NDA English | 900 | 11 | 0 | Sentence Rearrangement dominated |
| NDA Physics | 449 | 10 | 1 (Work Q123) | First diagram-fallback usage (Q70 circuit + Q132 B-field) |
| NDA Geography | 345 | 8 | 0 | 1 judgment-flag flip (Q142 forest order — option set imperfect) |
| NDA Chemistry | 262 | 5 | 0 | Q140 self-inflicted unicode regression caught + fixed |
| NDA History | 260 | 3 | 1 (Ancient Q85 Senguttuvan) | First non-Maths preserved-defect |
| NDA Current Affairs | 180 | 4 | 0 | Combined-pass with Polity + Economics |
| NDA Biology | 190 | 1 | 0 | Cleanest subject (0.5% rate) |
| NDA Polity | 90 | 0 | 1 (Q150 NCAP options all seem valid) | Combined-pass |
| NDA Economics | 24 | 2 | 0 | Combined-pass |
| **NDA total** | **4,860** | **~126** | **5** | All 10 subjects probe-closed; ~51% of bank |

Per-subject narratives + per-row decisions are in CLAUDE.md "Decisions log" 2026-05-27 entries. Per-chapter / per-flip register in [[content-audit-progress]].

### Pending — JEE Mains content-correctness audit (its own future pass)

**The original 13 subjects are now BANK-WIDE CLOSED** at the no-source-needed surface (9,546 q, ~100%) — MHT-CET Maths (1,587) + Physics (1,574) closed 2026-06-02, **MHT-CET Chemistry (now 1,525) closed 2026-06-03** across three passes + a source-PDF verification pass (31 wrong-key flips, 24 dupes deleted, 3 → PRIVATE). See CLAUDE.md "Decisions log" 2026-06.

**The remaining audit frontier is JEE Mains.** The ingested JEE q (2021 Papers 1-4, 240 q / 239 PUBLIC as of 2026-06-03, growing toward all 26 papers of 2021) are **NOT** part of the bank-wide audit above — they carry source answer keys verified only against the source images during ingestion, plus 54 AI-authored solutions. **Schedule a JEE content-correctness audit as its own pass once the 2021 set is fully ingested.** It's tractable: the DOCX source papers are local (`C:\tmp\PYQPs\JEE_Mains\2021\`), so `/solution-cleanup`-style re-derivation + source-image verification applies. Known seeds already surfaced during ingestion: P2 Q1 wrong-keyed by a duplicate-numbered soln block (fixed via override), P3 Q37 incomplete → PRIVATE, P4 Q44 multi-figure stem fixed via composite image. See [[jee-mains-ingestion]].

**Pre-flagged rows deferred from closed audits — revisit on the next content pass:**
- MHT-CET Chemistry: ~6 image-based IUPAC-naming rows + 5 user-deferred conflicting-key dup-pairs + 32 same-stem/diff-option groups — all need the source PDF/figure, not derivation (see CLAUDE.md 2026-06-03 source-PDF verification entry).
- `5044c336` (MHT-CET Sequences & Series · "sin(θ−α), sinθ, sin(θ+α) in H.P. → cos²θ"): **probable wrong-key** (a stealth case — bank solution likely agrees with a wrong key, so the matches-option probe never flagged it). Surfaced 2026-06-02 by cross-referencing its Trig-II sibling `b358ae2f` ("…→ cos2θ", answer `(1−4cos²α)/2`): `5044c336`'s `(1−2cos²α)/2` doesn't reconcile. Also arguably misfiled to Sequences (it's a trigonometry question). Derive the HP→cos²θ result independently, flip the key if wrong, and consider moving it to Trigonometry-II. Not touched during the 2026-06-02 Sequences bank-hygiene fix (out of hygiene scope).

**Prerequisite for MHT-CET audit:** the gdrive `PYQPs/MHT-CET/` folder is enumerated (2026-05-27) with year sub-folders 2021–2025, but it's lightly populated — most years have `MHT_CET_{year}_QP.docx` + `_AK.docx` (annual), and 2025 has only 1 of ~14 per-shift PDFs (`MHT_CET_2025_14th_May_Shift_2_QP.pdf`). Compared with NDA gdrive (22 PDFs covering full years 2015–2026), MHT-CET source coverage is sparser. The audit can proceed where DB rows have year/shift metadata that matches an available source file; rows from unavailable shifts (~90% of 2025) will need to defer or rely on internal-consistency derivation only.

### Probes (stable workflow)

The audit uses two skills with probes baked in. Don't re-implement.

- **`/latex-cleanup <chapter>`** — Phase 1 probes: `unicode_in_qtext/solution/options`, `unbalanced_qtext/solution/options`, `pipe_cond_*`, `english_math_words_*`, `matches_option_disagrees_with_key`. Phase 4 applies Bucket A (mechanical) automatically; Bucket B (wrong_key / REVIEW / hedge / plain-text-heavy) defers.
- **`/solution-cleanup <chapter>`** — Phase 1 probes (content-correctness only, formatting assumed clean): `matches_option_disagrees_with_key`, `review_markers`, `hedge_phrases`, `plain_text_heavy_sol`, `broken_matrix_env`. Phase 3 STOPS on every DISAGREE / PRINTED-PAPER-ERROR / STEM-BROKEN row for user approval before flipping `is_correct`.

The 6-row PDF-vs-bank extraction-error taxonomy ([[gdrive-pdf-fetch]]) covers the resolution shapes: option-text / stem-text / context-text / set-context-overspecification / dropped-sign / preserved-paper-defect.

### Patterns observed across the NDA bank-wide audit

- **Wrong-key rate correlates with derivation complexity.** Math-derivation subjects (Maths 3.8%, Physics 2.2%) significantly higher than pure-recall subjects (Biology 0.5%, Polity 0%, History 1.2%). LLM extraction handles named facts better than algebraic chains.
- **Combined-pass for small subjects** works. Polity + Current Affairs + Economics (294 q across 13 chapters) ran in one consolidated DO block on 2026-05-27 — saves the per-subject latex+solution cleanup round-trip. Recommended pattern when individual subjects are <100 q.
- **Diagram-dependent rows need screenshot fallback.** gdrive PDF OCR captures text but not spatial info (arrow directions, circuit topology). Two NDA Physics rows (Q70 circuit + Q132 B-field) required user-pasted screenshots after gdrive returned only text-around-the-figure. Rule embedded in `/solution-cleanup` Phase 3.
- **Self-inflicted unicode regression risk.** When rewriting solution prose, NEVER write unicode math chars (`× ÷ ≈ ✓ ✗ → ² ³` etc.) — they'll be caught by next `/latex-cleanup`. Lesson recorded in [[unicode-in-solution-rewrites]] after the Q140 Chemistry incident.
- **Cluster pattern by paper-batch.** Wrong-keys often cluster within a single paper sitting (Statistics 2017-Sep all 5 keyed wrong, Trig Id 2020-Apr 6 of 6). Likely an extraction-prompt batch effect — worth flagging at upload-audit time on new MHT-CET batches.
- **Stealth wrong-key gap.** When bank's solution prose is mathematically wrong but lands on the same wrong value as the stored key, NO probe flags it. Only close-reading every flagged solution catches these (e.g. Definite Integration Q96 on 2026-05-27). For MHT-CET audits, plan to close-read every solution that surfaces for ANY reason, not just trust the matches-option probe.

### Future hardening

`npm run content:lint` script that gates the pre-push hook for new uploads (mostly the formatting probes — wrong-key is not auto-detectable without human derivation). Still deferred — but the audit-skill probes are stable enough that lifting them into a script is mechanical. ~2 hours when there's appetite to wire it up.

### Notes-coverage probe — ✅ SHIPPED 2026-06-07 (`npm run notes:coverage`)

`scripts/notes-coverage.ts [subjectRoute] [chapterSlug]` (default `nda-maths statistics`). Per `/notes`-covered subtopic, diffs the math in that subtopic's PUBLIC question SOLUTIONS against the math in its notes bodies (incl. `formula.latex` + reference-table cells, which are raw LaTeX outside `\(...\)`), reporting two token kinds appearing in ≥2 solutions but 0 notes: **macros** (`\[a-z]+`, minus a common/relational-operator allowlist) and **structural fragments** (operands abstracted to `@`, so `(20^2-1)/12` ≡ `(n^2-1)/12`). The macro channel is the high-signal one; structural fragments are noisy (generic arithmetic) → human-review triage, **not a gate**. Validated on Statistics (would have flagged the `(n²−1)/12` gap pre-fill; resolved post-fill) and run on **Matrices & Determinants → no gaps** (all flags triaged to notation variants `\Delta`/`\det`, cross-subtopic trig, and the ln-of-GP determinant which IS covered in prose). The Matrices run **hardened the probe**: (1) strip LaTeX row-breaks `\\` before tokenizing — a matrix row entry after `\\` was matching as a spurious `\p`/`\l` macro; (2) collect notes math from raw string fields (recursive walk), NOT `JSON.stringify` — the latter doubles backslashes, which `stripBreaks` then ate, dropping macros from notes-vocab and false-flagging `\sin`/`\cos`. **Remaining:** run across the other 10 noted chapters + triage. Inherently misses "present-but-under-emphasised" (finds ABSENCE) and semantic equivalents in different notation; the structural-fragment channel is noisy (human-read), the macro channel is the high-signal one.

---

## Content ingestion (source material)

### GRB IIT-JEE chemistry textbooks → JEE Mains practice bank (analysis done 2026-07-17; ingestion deferred)

Three GRB (G.R. Bathla) IIT-JEE chemistry textbooks sit at `C:\tmp\Practice\JEE_Mains\Chem\` — **GRB Physical (995pp · 15 ch), Organic (1,107pp · 18 ch), Inorganic (997pp · 19 ch)**, ~3,100 pages total. These are third-party **commercial** prep books, not PYQs; they'd land as `question_kind='practice'` under **JEE Mains → Chemistry**.

**Findings from the 2026-07-17 source probe (so a future session doesn't re-probe 3,100 pages):**
- **Fully scanned books with a GARBLED OCR text layer — unusable for parsing.** Every page is a full-page scan with a bad two-column OCR overlay (`"AroM1CSTRUC!LfFl~"`=ATOMIC STRUCTURE, `"4TtEo"`=4πε₀; stems + solutions shredded together). **Vision transcription is forced** — reuse the practice-PDF / NEET pipeline shape (per-column hi-DPI render → vision agents) at ~10× the scale.
- **Volume: ~1,400 exercise pages → roughly 15k–30k questions** (theory dominates the rest; exercises are 30–110pp blocks at chapter ends). Must be **phased** book-by-book / chapter-by-chapter, not one-shot.
- **Formats are diverse**: standard 4-option MCQ + assertion–reason (Statement-1/2) + statement (I/II/III) + List I–II matching + comprehension + subjective/numerical. Most carry (a)–(d) so model as MCQ; matching/subjective need special handling (subjective supported since 0041).
- **Answer keys present inline** (per-section ANSWERS blocks + `[Hint:…]` worked solutions) → vision-extractable; good for correctness + notes/RAG.
- **Figures baked into the page scans** (Organic especially — wall-to-wall structures) → snapCrop per question (no extractable image objects).

**Two open decisions (deferred by the user, to settle at pilot time):**
1. ⚠️ **Copyright / visibility.** Third-party commercially copyrighted content — publishing on public pyqvault.com is a real infringement/reputation risk against the PYQ-first positioning. Recommendation: **PRIVATE (org-staff practice) at most**, never PUBLIC. Confirm intent before ingesting.
2. **Scope + formats.** Recommendation: **pilot ONE chapter of ONE book** (e.g. Physical Ch.1 exercises), **MCQ-only** first, validate quality, then scale. Don't run all 3 books before a pilot proves the pipeline.

See [[practice-pdf-vision-ingestion]] + [[figure-snapcrop-verify]] + [[neet-ingestion]] for the reusable pipeline shape.

---

## Admin tooling

### `/dashboard/quizzes` — server-side filtering + pagination (past ~1000 quizzes)

`listAssembledQuizzes` now returns up to 1000 quizzes (raised from a silent 60-cap that hid older quizzes once the bank crossed 60 — fixed 2026-06-11) and `QuizBrowser` filters them client-side. This is fine at the current ~100 quizzes but ships every quiz's full `questions` snapshot to the client. Past ~1000 quizzes (the PostgREST page size) the list would silently truncate again. The scalable fix: push the exam/subject/chapter/theme/status filters into the query (server-side), drop the per-quiz `questions` payload from the list (lazy-load on row expand via a server action), and paginate. The "Quizzes built" stat already uses a true `count:"exact"` (`countAssembledQuizzes`), so it stays honest even if the list is capped.

### Per-question editing of upload-level metadata

`/questions/[id]/edit` doesn't currently expose `pyq_year`, `pyq_month`, `pyq_note`, or `question_number`. Those are set at upload time or via `/uploads/[id]` bulk-PATCH. Per-question override is sometimes needed (correcting a single row after upload).

### Set merge / split / move UI

Sets are immutable post-upload by design — to fix a structural mistake (wrong set membership, wrong context, etc.) the admin re-uploads. A first-class UI for set operations would avoid the re-upload cycle.

### Excel-embedded image extraction

Today teachers upload text-only Excels and add images via the per-question edit page. An xlsx-parser → exceljs swap would extract images directly from Excel cells. Smaller blast radius than doing it now, but real friction for teachers with diagram-heavy papers.

### Teacher invitation flow

First admin is seeded via SQL; teacher addition is manual. A proper "invite teacher" flow was gated on SMTP being available (see Auth section) — **that gate LIFTED 2026-07-16: Supabase Auth SMTP is wired to Resend and verified.** (Teachers are also created directly in `/dashboard/members` since 2026-05-26, so this is now about invitations rather than access.) **Inherit the caveat:** an invite mail uses the same `ConfirmationURL` mechanism as the reset mail, so it will carry the same cross-domain link that Gmail flags as phishing — do the `/auth/confirm` work under "Password reset flow" first, or the invite lands in spam too.

### Notes-lint guide-side rename validation — ✅ SHIPPED 2026-05-30

Done via an equivalent implementation to the originally-planned notes-lint extension. Every guide's drill targets now resolve against live taxonomy in a `describe.skipIf(!HAS_ENV)` test: `tests/guide-nda-<subject>-playbooks.test.ts` (English/Physics/Chemistry/Biology/Geography/History/Polity) validate each PLAYBOOK's `chapter` + `subtopics[]`; `tests/guide-nda-current-affairs-themes.test.ts` validates theme `chapter` + `drillSubtopics`; `tests/guide-nda-maths-taxonomy.test.ts` (added this session — Template A has no PLAYBOOKS array) validates principles/compounds/strategy drill targets. The `/notes`-side chapter + subtopic names are validated by `scripts/notes-lint.ts` check 1. The `/browse` backlink chips (`getQuestionResources`) build their guide maps from the same PLAYBOOKS arrays + the `NOTES_CHAPTERS` registry, so they're covered transitively; Economics/CA chips + landing CTAs key on `examId`/`subjectId`, not chapter names. `.github/workflows/ci.yml` runs all of these on every push/PR (requires the three Supabase repo secrets). The guard caught two real broken-CTA regressions in its first session (Sound + Probability — see Decisions log). Recurring-lesson memory: [[shipped-chapter-rename-downstream-sync]].

### Derive `/nda` NOTES_PREVIEWS array from `NOTES_CHAPTERS` registry

Mop-up of the 2026-05-18 registry refactor. The `/nda` exam home's `NOTES_PREVIEWS` array (chapter cards with hand-written blurbs + concept counts) is still hardcoded — derivable from `NOTES_CHAPTERS` if we add `blurb` + `conceptCount` accessors to the registry entries, or compute `conceptCount` live at render time. ~15 min cleanup; trivial but consolidates the new-chapter ritual further.

---

## Organic search + acquisition

### BASELINE — the first Search Console read (2026-09-17): 98% of search clicks are the brand name

Search Console was verified ~2026-07-27, so the export's "Last 3 months" filter **overstates the window** — there are 7 weeks of data (2026-07-27 → 2026-09-14), not 3 months. Raw totals: **751 clicks / 1,804 impressions**, India 750 of 751 (targeting is correct).

**The finding that reframes this whole section: 739 of 751 clicks (98%) land on the homepage, and `pyq vault` + `pyqvault` alone account for 530 of them at position ~1.0.** Those are navigational queries — people who already know the site using Google as an address bar. They are a *lagging indicator of word-of-mouth*, not acquisition. Strip them out and **non-brand organic acquisition is between 12 and 24 clicks in 7 weeks** — a range, not a figure, because `Pages.csv` over-attributes (see the correction below). It reports 763 clicks against the property's 751, spread as `/guide/nda-maths` 12, `/guide/nda-english` 9, `/browse` 2, `/questions/cds/english/reading-comprehension` 1 — while the property total leaves only **12** clicks off the homepage. **Every named non-brand query has zero clicks**: 770 of the 789 query-level impressions are brand, and the remaining 19 converted nothing. So the September signup surge (5 → 14 → 63 → 102 → 160/mo) is not organic search; it is arriving through some other channel, and migration 0106's first-touch attribution is what will name it.

**Coverage collapse — 25 of the 1,473 sitemap URLs (1.7%) got a single impression:**

| Section | URLs in sitemap | Impressions | Clicks |
|---|---|---|---|
| `/guide` | 160 | ~1,900 | 21 |
| `/questions` | 631 | 41 | 1 |
| `/mock` | 204 | 1 | 0 |
| `/notes` | 465 | **1** | **0** |

`/notes` is the largest content investment in the project — 84 hand-authored chapters, 559 prerendered pages — and it is **invisible in search**. `/questions` was built specifically for discovery and is not ranking either. `/guide` is the only section with any traction, which is worth noting: it is also the only section written as *prose a human would search for* rather than as a question listing.

**CORRECTED 2026-09-17 — the page-level CTR gap is mostly an ATTRIBUTION ARTEFACT, not a metadata problem.** The first read of this export called the CTR gap “the nearest-term opportunity … fixable in metadata alone”. Reading the export end-to-end contradicts that, and the contradiction is arithmetic: **`Pages.csv` sums to 4,169 impressions against a property total of 1,804 — 2.3×.** `Chart.csv`, `Devices.csv` and `Countries.csv` independently agree on 1,804, so the property figure is the sound one and the page-level one double-counts. A single property impression is therefore being attributed to two or three pages at once, which is what happens when several URLs from one site appear in the same result block.

The page-level evidence fits that and not the metadata story: **nine URLs sit above position 2.0 and draw 879 impressions and 3 clicks between them** — `/browse` 642 impressions at position 1.42, `/guide/mht-cet-maths/playbooks/complex-numbers` 102 at 1.34, `/guide/nda-maths/principles/double-angle` 58 at 1.31, `/questions/neet/zoology/human-reproduction` 39 at 1.23, `/quiz/nda-maths-vectors-computation-1` 33 at 1.88. A genuine position-1.3 ranking returns roughly 30% CTR; **0.3% across 879 impressions is not a title problem** — it is those pages riding along on brand searches rather than ranking on their own, and rewriting their metadata would change nothing. `Search appearance.csv` is empty, so the export cannot name the appearance type: **the arithmetic is the evidence here, not a GSC label**, and that is the honest limit of what this export proves.

**What survives the correction.** `/guide/nda-maths` (960 impressions, position 5.00) and `/guide/nda-english` (765, position 2.61) sit far enough down the page to be plausible long-tail rankings rather than tag-alongs; their impression counts are inflated by the same factor but not invented. Those two are worth a metadata read — **two pages, not a site-wide CTR programme.** See the Step 2.5 entry below for why even that is sequenced late.

**THE GATING QUESTION — ANSWERED 2026-09-17, and the answer is worse than either hypothesis.** The Coverage export (`pyqvault.com-Coverage-2026-09-17.zip`, scope "All known pages") reads: **12 pages indexed, 1,462 not.** The breakdown is `Discovered - currently not indexed` **1,424** · `Crawled - currently not indexed` 32 · `Blocked by robots.txt` 3 · `Page with redirect` 3 · `Duplicate without user-selected canonical` **0** (so the 2026-08-09 `/login` noindex fix is confirmed working).

**"Discovered - currently not indexed" means Google knows the URL from the sitemap and has decided not to spend the crawl on it — it has not fetched the page at all.** So this is not a ranking problem and not a content problem; 97% of the site has never been looked at. The `/notes` tree's single impression in 7 weeks is fully explained: those pages have not been crawled.

**The trend is the actionable part, and it runs the wrong way.** Indexed held at **20** from 2026-08-05 through 2026-09-04, then **fell to 12 on 2026-09-05** and has stayed there. Over the same window not-indexed climbed **961 → 1,462**. The 2026-09-05 step is +249 discovered URLs in one day (the MHT-CET/JEE/CDS mock ships of 2026-09-01→09-07) against −8 indexed. **Every batch of new URLs has so far made indexing worse, not better** — which is the empirical case for a publish freeze on new indexable surfaces, not merely a theoretical one.

**CRAWL STATS — read 2026-09-17, and this is the mechanism.** `pyqvault.com-Crawl-stats-2026-09-17.zip`, 51 days (2026-07-27 → 2026-09-15): **1,173 total crawl requests = 23.0/day.** The composition is the finding — **82.5% of that budget is not HTML**: JavaScript **49.45%** · JSON 12.28% · other 9.55% · CSS 7.84% · failed 3.32% · images 0.09%, leaving **HTML at 17.48% ≈ 4.0 page fetches per day**. By Googlebot type, **66.24% is "Page resource load"** against 28.13% real page crawls (Desktop 14.32 + Smartphone 13.81). By purpose: **Refresh 98.21%, Discovery 1.79% ≈ 0.41 requests/day.**

**The arithmetic explains the 12 indexed pages without appealing to quality at all.** At 4.0 HTML fetches/day, crawling all 1,474 known URLs **once** takes **367 days**. At 0.41 discovery requests/day, working through the 1,424 discovered-not-crawled backlog takes **~3,459 days — 9.5 years.** Google is not judging this content; it has not got to it, and at the current rate it will not.

**Cause 3 (host responsiveness) is CLEARED as a blocker and CONFIRMED as a contributor.** The Hosts table reports **"No problems"** for both `www.pyqvault.com` (1,126 requests) and `pyqvault.com` (47) — Google is not backing off over host errors, so the 57014-era history did not poison the crawl. But average response is **435 ms with 21 of 50 days above 500 ms** (peaks ~1.18 s), and since 82.5% of requests are fast CDN assets the HTML itself must be materially slower than that average. **Measured directly 2026-09-17:** a `/questions` landing page cold is **1.86–2.60 s**; the same URL warm is **0.23–0.27 s** (`X-Vercel-Cache: HIT`). That is a vicious circle worth naming — `generateStaticParams` prerenders only the top 40 of ~631 landings (`src/app/questions/[examSlug]/[subjectSlug]/[chapterSlug]/page.tsx:48`) and `revalidate = 86400` expires a day later, while Googlebot returns to any given URL months apart at 4 pages/day. **So essentially every Googlebot fetch of that section is a cold MISS paying the full ~2.5 s render**, which suppresses crawl rate, which lengthens the gap, which guarantees the next hit is cold too. A stratified 27-URL sample of the live sitemap returned **200 on every URL**, so sitemap rot is not among the causes.

**Cause, in descending confidence (revised).** (1) **Domain age + no external links.** `pyqvault.com` went live 2026-06-04, is ~3.5 months old, and has essentially no backlinks. Crawl budget on a young unlinked domain is minimal, and **this is the only item that raises the 23/day ceiling** — everything else merely redistributes it. (2) **Crawl depth and internal linking**, which is what starves Discovery down to 1.79%: the homepage links to exactly **two** internal destinations (`/browse` and `/guide/nda`); the Footer links the 10 guides, `/formula`, `/blog`, `/about` and two `/notes` hubs but **not `/questions`, `/mock`, `/board` or `/browse`**; `PrimaryNav` carries Bank · Guides · Notes · Mocks · Board · Blog · About but **no `/questions` tab**. The only crawlable path into the 631-page landing surface is `BrowseLanding.tsx:146`, leaving it **3 clicks deep behind a dynamic, uncacheable `/browse`**. (3) **Cold-render cost + crawl waste** — the ISR miss circle above, plus **8.3% of the budget (≈97 requests) spent on 301s (4.94%) and 404s (3.32%)**. No apex-domain URL is referenced anywhere in `src/`, so the 47 apex requests arrive from outside the codebase.

**What this changes.** Adding ~195 paper pages today would put them in a backlog Google is working through at 0.41 URLs/day. Revised order, cheapest first:

1. **Stop the waste (~8.3% of budget).** Find the 404s and the apex 301s. Nothing in `src/` links the apex, so those 47 requests come from outside — worth identifying rather than assuming.
2. **Make crawling cheap.** Raise the `.slice(0, 40)` prerender cap and lengthen `revalidate` well past 86400 (or revalidate on-demand after an ingest, which is when this content actually changes). Ending the guaranteed cold-MISS on `/questions` is the single most mechanical fix available, and it directly targets the 435 ms average.
3. **Fix internal linking and crawl depth**, which is what Discovery's 1.79% is measuring: a `/questions` entry in nav or footer, homepage links into the real content hubs, flatter paths to chapter pages.
4. **Submit a focused sitemap** of the ~100 best URLs. At 4 HTML fetches/day a 1,474-URL sitemap communicates no priority whatsoever.
5. **Earn external links.** Off-site, slow, and **the only lever that increases the 23/day budget rather than reallocating it.**
6. **Hand-request indexing** for the 10–20 pages that matter, via URL Inspection — to seed, not to scale.
7. **Only then add surfaces.**

**Do NOT `Disallow` `/_next/static` or the JS/CSS in `robots.txt`.** It is the intuitive reaction to "49% of crawl is JavaScript" and it is an own-goal: Google needs those resources to render and evaluate the page, and blocking them degrades how the page is understood rather than freeing budget for HTML.

Secondary observations, recorded so they are not re-derived: desktop ranks far worse than mobile (position 11.45 vs 3.75) on 725 impressions; ~150 impressions come from US/UA/VN/BR/DZ with zero clicks and are noise; and three `/browse?examId=…` filter URLs still draw impressions despite the `robots.txt` `Disallow: /browse?*` — correct behaviour, since Disallow prevents *crawling*, not the indexing of URLs Google already knows.

### Step 2.5 — metadata pass on the two pages that genuinely rank (RE-SCOPED 2026-09-17 after the attribution correction)

**Originally scoped as a site-wide CTR repair.** The attribution correction above removes most of it: `/browse` and the four other sub-position-2 pages are not under-converting good rankings, they are appearing beside the homepage on brand searches. There is nothing to fix in their titles.

**What is left is genuinely small** — `/guide/nda-maths` and `/guide/nda-english`, which plausibly rank on long-tail queries at positions 5.00 and 2.61.

**Why it is not actionable from the export.** Deciding whether their titles match intent needs the queries that surface *those specific pages*, and the bulk export cannot supply it: `Queries.csv` is property-wide, and **789 of 1,804 impressions (44%) are named while 56% sit in the anonymised long-tail bucket** that GSC withholds. So this is a Search Console UI task (Performance → filter by page → Queries) before it is a code task; the code change afterwards is two `generateMetadata` strings.

**Sequencing: after Step 2, and possibly not yet at all.** With non-brand acquisition at 12–24 clicks in 7 weeks there is no baseline to improve against — a CTR change on two pages would be indistinguishable from noise. Revisit once the crawl work has produced enough non-brand traffic to measure against.

### REVIEW — the external SEO brief `PYQVault_SEO_Recommendations_Claude_Code.md` (reviewed 2026-09-17): sound guardrails, wrong diagnosis, one dangerous section

Recorded so the reasoning is not re-derived if the document resurfaces. It is a competent generic SEO brief written without repo access or crawl-budget arithmetic; its **Guardrails** section is better than its prescriptions.

**1. The diagnosis inverts the constraint.** It reads the backlog as Google *judging* discovered URLs not worth indexing, and prescribes classifying 1,424 URLs into filter / pagination / duplicate / thin buckets. The crawl stats say Google has not *fetched* them: Discovery purpose is 1.79% of 23 requests/day ≈ **0.41 URLs/day**, so the backlog needs ~9.5 years at the current rate. “Discovered — currently not indexed” means known-and-uncrawled. The audit was run anyway across all 1,473 sitemap URLs: **1,470 × 200, 3 × 404**, zero filter URLs, zero pagination, zero parameters, zero duplicates. All eight of its categories collapse to one.

**2. Section 11 (JavaScript / rendering) is actively dangerous.** It reads the 49.45% JavaScript share as evidence of client-side rendering. That share is Googlebot fetching `/_next/static/*.js` — ordinary resource crawling for a server-rendered app. The remedy it points toward is `Disallow: /_next/static`, which would leave Google unable to render the site at all; the warning against exactly that is already recorded above. Section 3 (“make content available in initial HTML”) rests on the same wrong premise — there are **1,413 prerendered `.html` files on disk**, 630 of them `/questions` pages carrying stem, options and solution in the initial HTML.

**3. Sections 2, 5, 8, 9, 13 and 14 describe work already shipped.** §2 proposes `/nda/maths/probability/`; `/questions/<exam>/<subject>/<chapter>` already exists at 630 pages with per-chapter titles and descriptions — **adopting its scheme would mean 630 redirects and discarding what crawl history exists.** §5’s “topic hubs” are `/questions` + `/notes` (84 chapters) + `/guide` (11) + `/formula` (40) + `/board` + `/mock`. §8: 95 `alternates: { canonical }` declarations with `metadataBase` set. §9: `robots.ts` already blocks `/browse?*` while leaving bare `/browse` crawlable, asserted behaviourally by `tests/robots-rules.test.ts`. §13: JSON-LD across guides and blog.

**4. The omission that matters more than the document.** Seventeen sections, **no mention of domain age or backlinks**. A ~3.5-month-old domain with no external links is what sets the 23 requests/day ceiling; every section in the brief redistributes a fixed budget and none raises it.

**Worth taking:** §7 (sitemap strategy — already Step 2), §15 (search intent drives page creation), §16 (measurement — baseline above), and the Guardrails, especially *“do not assume ‘not indexed’ automatically means ‘technical bug’”*, which cuts against the brief’s own Phase 1. **Verdict: not adopted as a plan.** The existing sequence stands — Step 1 crawl entry points, Step 2 focused sitemap, Step 3 external links.

**One claim of the brief’s that CHECKS OUT:** mobile-first. **478 of 751 clicks (64%) are mobile**, 248 desktop, 25 tablet. Caveat — 98% of clicks are the brand-name homepage search, so this mostly says people type “pyq vault” on a phone.

### RETRACTED 2026-09-17 — "Bing has ~694 pages indexed" was NOISE. A `site:` count is not a measurement.

**This entry replaces a wrong one written an hour earlier.** It claimed Bing had **~694** pages indexed against Google's 12, called that "58x", and concluded the indexing problem was Google-specific. **The 694 was a single sample from a number that does not hold still.**

**The disproof, five consecutive runs of the IDENTICAL query** (`site:pyqvault.com`, no parameters, same minute, same user-agent):

| run | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| "results" | 54,700 | 110,000 | 51 | 32 | 54 |

Paging with `&first=N` is no better: 4,570 → 8,910 → 50 → 1 → 19,800. And the SERP HTML yields **no result URLs to count by enumeration** (JS-rendered), so there is no fallback. **A `site:` count cannot baseline anything, on Bing or Google.** It was already known to be approximate; it is worse than that — it varies by three orders of magnitude between back-to-back identical requests.

**A SECOND trap found on the way, worth its own line:** passing `&count=50` makes Bing answer *"About 50 results"*, which reads exactly like an index count and is really the page-size cap. Two different artefacts, both of which render as a plausible small integer.

**WHAT SURVIVES, because it rests on different evidence.** The claim "Bing serves this site better than Google does" still stands, but on **referral data, not index counts**: Vercel Analytics for the 30 days to 2026-09-17 records **bing.com 204 visitors** — the #3 referrer behind only Google and Reddit — against **~10 non-brand visitors from Google** (751 GSC clicks, 98% of them the brand query `pyq vault` at position 1.02). Those are counted visits, not an engine's estimate of its own index. **The multiple is unknown and must not be quoted.**

**HOW TO ACTUALLY MEASURE BING'S INDEX — there is exactly one way, and it is not scriptable from here.** **Bing Webmaster Tools**: *Site Explorer* gives a folder tree of the site with per-URL crawl/index state (drill into `/questions`, `/notes`, `/guide`); *URL Inspection* gives one page's live status; and the **IndexNow panel** shows the submitted URLs and what Bing did with each — the only direct read on whether the 2026-09-17 submission of 1,280 URLs landed. The property can be imported from Search Console. **Until BWT is set up, the honest answer to "how many pages does Bing have?" is that we do not know.**

**The generalisation, because this is the second time in one session the same mistake landed.** Earlier, `Pages.csv` positions of 1.2–1.3 were read as real rankings when they were a brand over-attribution artefact. Both failures are the same shape: **a number that renders plausibly is not thereby a measurement.** Before a figure is written down here, it needs a stated source and a reason to believe it is stable — and where cheap, a repeat reading. Five curls would have caught this one before it was ever said out loud.

### SHIPPED 2026-09-17 — the indexing diagnosis, IndexNow, and a ranked manual worklist

**THE NUMBER IS 21.** The crawl-stats export (`pyqvault.com-Crawl-stats-2026-09-17.zip`, 51 days, 2026-07-27 → 09-15, 1,173 requests) breaks down as **JavaScript 49.45% · HTML 17.48% · JSON 12.28% · CSS 7.84% · other 9.55% · failed 3.32%**, and Googlebot's own split is **66.24% "page resource load"** against 28.1% actual page crawls. Purpose is **98.21% Refresh / 1.79% Discovery** — so in 51 days Google made **21 discovery requests**, and the 1,424-URL discovered-not-crawled backlog clears in **~9.5 years**. **79% of a tiny budget is spent on bundles, not pages.**

**NOTHING IS BROKEN, WHICH IS THE POINT.** 91.73% of responses are 200; both hosts report "No problems"; `robots.ts` is clean; and the August `Duplicate without user-selected canonical` flag is **1 → 0**, confirming the 2026-08-09 `/login` noindex fix worked. Crawl is also **accelerating**: 19.9 → 17.3 → **31.8** requests/day across the three thirds of the window. This is not a misconfiguration to find. Crawl **capacity** is fine; crawl **demand** is the constraint, and demand is a function of external links and domain age — `pyqvault.com` has been live since 2026-06-04.

**A REVERSAL OF MY OWN READ, TWO HOURS OLD.** I quoted `Pages.csv` positions of 1.23–1.34 as evidence the content ranks where indexed. Those are the **brand over-attribution artefact** again. `Queries.csv` carries the real non-brand positions: `nda english pyq` **9**, `nda notes maths` **36**, `nda determinants pyq` **28**, `probability nda pyq` **34**, `nda sequence and series pyq` **45**, `pnc weightage in nda` **45**, `nda maths strategy` **41**. Meanwhile `pyq vault` sits at **1.02 with 87.32% CTR** and 489 of 751 clicks. **Indexing is a prerequisite, not a ranking fix** — expect impressions first and clicks only as authority arrives.

**What the queries DO prove is worth the work.** `nda determinants pyq`, `probability nda pyq` and `nda sequence and series pyq` are precisely what `/questions/nda/mathematics/<chapter>` exists to answer, and **those pages are not indexed** — Google is matching a generic page at position 28 because the specific one is invisible. **Demand cannot be read off these numbers**: impressions are suppressed at position 45, so low impressions mean low visibility, not low demand.

**TWO LEVERS SHIPPED, AND THEY REACH DIFFERENT ENGINES.**

1. **`npm run seo:indexnow`** (`src/lib/seo/indexnow.ts` pure core + 13 tests, `scripts/seo/indexnow.ts` CLI, dry-run by default like `email:send`). Pushes the live sitemap to **Bing, Yandex, Naver and Seznam**. **Google does not participate in IndexNow** — said three times in the code, because a green run invites exactly the opposite inference. Bing earns it independently: **204 visitors in the 30 days to 2026-09-17**, the #3 referrer behind only Google and Reddit, and Bing's index is what ChatGPT search reads (46 chatgpt.com referrals in the same window). The payload builder **throws on an off-host URL rather than filtering it**, because IndexNow 422s the WHOLE submission on one bad entry — and the case that matters most, an apex `pyqvault.com` URL, is visually identical to a human. The key is **public by design** (served at `/<key>.txt` as the ownership proof); it belongs in the repo and is not a leak — see `public/README-indexnow.md`.

2. **[SEO_INDEXING_WORKLIST.md](SEO_INDEXING_WORKLIST.md)** — 1,279 URLs ranked for Search Console's manual **Request Indexing**, batched 10/day against its ~10–12/day quota. Ranked by **winnability, not content depth**: at domain-authority zero a JEE or NEET page cannot outrank Allen or Physics Wallah whatever is on it, so exam weight outranks question count (NDA 1.00 · CDS 0.92 · MHT-CET 0.80 · JEE/NEET 0.32 · Worksheets 0.18, which are LWS course material with no public search demand). **The first 300 are 91% NDA by decision** — topical depth beats breadth for a new domain, and every recorded non-brand query is NDA. Reversible: it is one table in `scripts/` — regenerate to reweight.

**`/formula` IS EXCLUDED FROM BOTH.** It shipped hours earlier on 2026-09-17 and has had no browser pass. Asking an index to fetch an unverified surface is the definition-of-done failure in another costume. `HOLD_PREFIXES` in the CLI carries the removal condition, so it is a dated hold rather than a permanent rule.

**Wasted budget, measured but NOT the fix.** 39 requests died on 404s and 58 on 301s — **47 of those are the apex `pyqvault.com` host**, and our own OG social cards print the URL as `pyqvault.com/guide/nda-english` with no `www`, so every share teaches the redirecting form. Together ~8% of budget. Worth fixing, nowhere near a 10x.

**The JavaScript share was investigated and DEPRIORITISED.** 580 JS fetches against 205 HTML page crawls is **2.8 JS per page**, so Googlebot is caching chunks well (a page references 18). The residual tracks deploy churn — there were commits on **51 of 51 days** in the window, 1,278 of them, and every deploy re-mints content-hashed chunks. But resource loads are **subordinate to** page crawls, not competing with them: they are a consequence of crawling 205 pages, not the reason only 205 were crawled. Reducing chunks per page is a real but small lever. **Not worth the days it would cost** — recorded so it is not re-derived.

### SHIPPED 2026-09-17 — 192 thin mock pages leave the sitemap, and the “September 5 collapse” is explained

**The mock leaves came out: `/mock` goes from 204 sitemap URLs to 12** (index + 5 exam pages + 6 per-type listings). Measured against production, `/mock/nda-2017-apr-maths` renders **98 words** of body text, and across all 192 leaf pages the only things that differ are the paper name and four numbers — the prose and the whole Instructions block are byte-identical, because the questions sit behind sign-in. That is 13% of the sitemap spent advertising near-duplicate thin pages at a measured ~4 HTML fetches/day. **They stay reachable** through `/mock/exam/<exam>/<type>`; they are simply no longer advertised. Pure core `src/lib/mocks/sitemapEntries.ts` + `tests/mock-sitemap-entries.test.ts`.

**Why a pure core rather than an inline filter: the leaf rows are still what DATES the hubs.** `/mock/exam/nda` must carry the newest `updated_at` among NDA's mocks even though none of them is emitted — deleting the row loop would silently stamp every hub with the build clock, the exact defect `src/lib/seo/lastmod.ts` exists to prevent. A test pins it.

**THE SEPTEMBER 5 COVERAGE CHANGE — investigated, and the date is an artefact.** Coverage changed **9 times in 50 days**, and from mid-August every change lands on a **Saturday** (Aug 15 · Aug 22 · Aug 29 · Sep 5). The figure is recomputed weekly, so “September 5” is a REPORTING date, not an event date — any cause sits somewhere in the Aug 29–Sep 5 window, and Google's index state lags its crawl on top of that. **Investigating deployments “around Sep 5” aims at the wrong window.**

**The +249 not-indexed is content growth, not a regression.** That window holds **212 commits**, including `/mock` + 66 mock URLs entering the sitemap for the first time (`e6d2ff15`, Aug 29), 60 MHT-CET mock papers (`43e1d5d0`, Sep 1), MH State Board Std XII Physics (617 q / 16 ch), Std XI Physics (587 q / 14 ch) and MH State Board Chemistry (1,416 q / 32 ch). Every new chapter mints a `/questions` landing page and a `/board` page. **Rising “not indexed” is what shipping content looks like on a site with no crawl budget** — the denominator grew and the numerator could not.

**The 20 → 12 indexed drop has a named mechanism, NOT a proof.** The same Aug 29 commit that added mocks to the sitemap **removed 63 direct links from `/mock`**, turning a flat list into a picker; its own message anticipated this (“which would have left every mock two hops from an indexed page with no backstop”). Verified live: `/mock` emits five links, all `/mock/exam/<exam>`, and zero direct links to a mock. The real path is four levels — `/mock` → `/mock/exam/nda` → `/mock/exam/nda/past-papers` → `/mock/<slug>`. **Whether those 8 dropped pages were mocks is unprovable from the export, which carries aggregate counts and no URL list.** Recorded as a hypothesis with a mechanism.

**Two things ruled OUT while looking, so they are not re-investigated.** (1) **`lastmod` is sound** — `/questions` carries 45 distinct dates across 631 URLs and the sitemap spans June to September, so the site is not training Google to distrust it. (2) **Splitting the sitemap into a per-section index is NOT worth doing.** Google does not allocate crawl budget per sitemap file; the only gain was per-file index counts in Search Console, and with 12 indexed pages total that breakdown is already near-knowable from the Performance report. It was proposed here and withdrawn before any code.

**A verification trap worth keeping.** `listChapterLandings` is wrapped in `unstable_cache`, which needs a Next render context. Driven from a bare `tsx` script it throws, and the `catch` in `sitemap.ts` returns `[]` — so a smoke script reports **zero** `/questions` URLs and looks like a catastrophic regression. **Any `unstable_cache`-wrapped loader is invisible to the `*:smoke` script pattern**, and a swallowing `catch` renders that as empty data rather than as an error.

### Per-paper public route — `/past-papers/<examSlug>/<slug>` (analysis done 2026-09-17; SEQUENCED BEHIND the indexing check above)

**What it is.** The highest-intent query class in this market is the paper, not the chapter — *"NDA 2 2024 maths question paper with solutions"*, *"JEE Mains 2025 Jan 29 shift 1 solutions"*. The bank holds 189 such sittings fully reconstructed, and **not one of them has an indexable page**: `/mock/[slug]` renders only a stat strip and instructions, with every question behind sign-in, and `/questions` is addressed by chapter alone.

**Why it is cheap.** `mock_tests` already *is* a paper — `slug`, `pyq_year`, `paper_code`, `sections` jsonb and `questions` jsonb as an ordered question-ref snapshot, with the three sitting-discovery rules already resolved and frozen. `queryQuestionsByIds` in `src/lib/questions/query.ts` returns the same `QuestionRow` view-model `/browse` and `/questions` render. So the data path is **snapshot ids → `queryQuestionsByIds` → reorder by snapshot order → existing `QuestionList`**, which inherits `QuestionCard`, KaTeX/`BlockText`, the reveal meter, the backlink chips and numeric/subjective handling for free. No new renderer.

**Scope.** `/past-papers` index → `/past-papers/<examSlug>` (papers grouped by year — the ranking target for *"NDA previous year question papers"*) → `/past-papers/<examSlug>/<slug>`. 189 PYQ papers (NDA 38 · MHT-CET 64 · CDS 55 · JEE 24 · NEET 8) + 5 exam hubs + 1 index = **~195 URLs**, taking the sitemap to ~1,668. The 5 `source='practice'` mocks are excluded — they are not past papers, and the `source` column already discriminates. `/papers` is taken by the teacher builder, hence `/past-papers`, which is keyword-bearing anyway.

**SCOPE CONFIRMED AT ALL 189 (decided 2026-09-17), against a proposal to start with ~40.** Live usage: **183 of 344 accounts (53%) have attempted a mock**, 733 attempts / 617 submitted at 4.0 per student over 69 days — so this targets the most-used measured surface on the site. But the attempt distribution is steep: **125 of 194 published mocks have never been attempted once**, and **20 papers carry 75.4% of all attempts**. That was read here as an argument for shipping the ~40 papers with any attempts first and proving the format before minting 125 pages for papers nobody has opened.

**That argument was rejected, and it was wrong.** An internal attempt count measures what a signed-in student picked off a list; search demand measures what a stranger types into Google. **Different populations, different question** — a 2017 paper with zero internal attempts can still be exactly what someone searches for, and the long tail of “<exam> <year> question paper” is the whole point of the route. Do not re-derive the phasing proposal from the usage table; the usage table does not speak to search demand.

**Decisions taken.** (1) Answers ship *in the HTML*, gated only by the client reveal meter — `revealMeter.ts` is explicit that it is a soft nudge over PUBLIC content, so the page is fully indexable and still converts at 3 reveals. (2) The ~30 papers HELD from `/mock` for being 1–3 questions short are **out of v1**: a read-only page does not need the completeness a graded test does, but reaching them means querying the bank by sitting rather than reading a snapshot — a different data path, worth a phase 2 (+16% pages). (3) `queryQuestionsByIds` issues a single `.in("id", ids)` and pre-2025 NEET papers are 200 questions, right at the documented URL-overflow threshold — **chunk at 200 before relying on it here**.

**The product call to make before building.** A free, complete, indexable paper with answers competes with the timed mock, currently the most-used measured feature. The argument for shipping anyway: every one of these questions is *already* public on `/browse` and `/questions`, so this only reorganises them by sitting, and you cannot rank a page you do not serve — the mock keeps the timer, scoring and analysis. Not yet decided.

**Build order** (TDD, pure core first): `src/lib/papers/` pure helpers (slug↔route, snapshot→ordered view, section grouping, metadata/JSON-LD builders) → `listPapers`/`getPaper` loaders on the anon client cached like `listChapterLandings` → the three routes (`revalidate = 86400`, `generateStaticParams` prerendering the ~40 most recent, rest ISR, no `searchParams`) → plumbing (sitemap with `lastmod = mock_tests.updated_at`, Footer, nav, cross-link from `/mock/<slug>`) → DB-integration tests (anon reads a published PYQ paper; practice excluded; draft 404s). Roughly a day.

**READ THE USAGE CLAIM WITH ITS DATES.** “Mocks are the most-used surface” rests on 69 days of `mock_attempts` against **bank instrumentation that is hours old** — `question_practiced` (the `/browse` + `/questions` answer-reveal event, migrations 0104–0106) has a `first_seen` of **2026-09-17**. On its first partial day it recorded **55 reveals from 4 users** against 3 mock submissions from 3 users. So the two surfaces are NOT yet comparable, and anyone reading this after ~2026-10-01 should re-run the comparison rather than quote the 53% figure as a ranking. This is the same partly-instrumented reading the 2026-09-17 PMF entry already had to reverse once — see [[pmf-partial-instrumentation-is-a-floor]].

**Why it is not the top of this section.** The site has 1,474 known pages and **12 indexed** (2026-09-17 Coverage read above). Adding 195 more to a site whose existing inventory Google declines to crawl is treating a symptom — they would join the 1,424-URL discovered-not-indexed queue. Sequenced behind the crawl-depth and external-link work; the analysis here is complete and ready to build the moment indexing recovers.

---

## Tech debt / refactoring

### BACKFILL LEDGER — MHT-CET Maths trigonometry, PHASE 2: split the 94 mixed identity/equation questions (logged 2026-09-17)

Phase 1 shipped 2026-09-17: the Std XII chapter was renamed `Inverse Trigonometric Functions` →
**`Trigonometric Functions`**, and the two triangle subtopics (22 in Trigonometry - I + 52 in
Trigonometry - II) plus Trigonometry - II's 21 inverse questions were merged into it. That chapter
is now **168 q** — the 4th-largest in CET Maths — and the guide was re-tiered from Long Tail to
Cornerstone to match. Two of the three overlaps are gone.

**What is left: 94 questions in two subtopics that each MIX Std XI and Std XII material.**

| Subtopic | Chapter | q |
|---|---|---|
| `Trig Identities, Compound Angle, and Equations` | Trigonometry - I | 77 |
| `Trigonometric Identities and Compound/Half-Angle Formulas` | Trigonometry - II | 17 |

Both bundle Std XI identity work (allied / compound / multiple / half-angle, factorisation) with
Std XII **trigonometric equations and general solutions**, which are section 1 of Balbharati XII
Ch.3 and belong in `Trigonometric Functions`. Unlike Phase 1 this is **NOT a bulk UPDATE** — it
needs a per-question read of all 94 stems, because the split is within a subtopic, not between
subtopics.

**Target shape:** a new `Trigonometric Equations and General Solutions` subtopic under
`Trigonometric Functions` (matching the board's own section name); the residual identity rows
consolidate into `Trigonometry - II`, which is the Std XI identity chapter; `Trigonometry - I`
holds none of its own namesake material (unit circle, quadrant signs, domain/range, polar) — the
CET bank has **zero** questions on any of it — so once emptied that chapter should be DELETED.

**Downstream, all of it name-keyed and already proven to break loudly:** `src/lib/books/registry.ts`
(`tests/books-registry.test.ts`), the `/guide/mht-cet-maths` editorial across strategy / trends /
traps / playbooks / playbook-details-core+tail / formulas / mht-cet-maths.ts
(`tests/guide-mht-cet-maths-playbooks.test.ts`), and the `/questions/mht-cet/maths/<chapter>`
landing-page URLs. No chapter UUID is pinned anywhere in the repo — checked all three in Phase 1 —
and there are no CET trig `/notes` chapters, so the rot surface is those two files plus the guide.

**Before starting, confirm the carve against the official MHT-CET syllabus PDF.** Phase 1 inferred
it from the Balbharati spine in our own DB (`syllabus_concepts`, source `MH State Board`), which is
strong evidence but is not the syllabus document.

### BACKFILL LEDGER — 176 questions draw matrices in ROUND brackets (logged 2026-09-17)

Square bracket is the house style: after the 2026-09-17 repair, **884 question rows carry
`bmatrix` against 176 with `pmatrix`**. The 176 are the rows that are UNIFORMLY round — the 15
that disagreed with themselves were converted, and `audit:text`'s MIXED_MATRIX_DELIM class
(`mixedMatrixDelimiters` in `scripts/lib/textProbes.ts`) now reports 0 and will catch the next one
at ingest. Converting the remaining 176 is `npx tsx scripts/reviews/normalise-matrix-delimiters.ts`
with its probe-derived scope widened; it is deliberately NOT done.

**Recommendation: DECLINE unless the house style is ever enforced for another reason.** The
benefit is zero on screen — a uniformly round question has nothing to mismatch against, and both
fences render correctly in KaTeX and in Word (`wrapMatrixDelimiters` handles `(`, `[`, `|`, `{`,
`‖` symmetrically). The cost is not zero:

- `content_hash` is `sha256(stem + sorted options + answer)`, so each rewrite changes its preimage.
  Recomputing (the invariant every write path here maintains) desynchronises the hash from the
  source `.docx`/`.pdf`/`.xlsx` — which live OUTSIDE the repo, so there is nothing to fix alongside —
  and from nda-tracker's copy, where `applyMockSync` looks rows up by hash and would insert
  duplicates on the next sync.
- ~12 `question_reviews` and ~71 `question_item_stats` rows key on that hash and would flip to
  stale for content nobody re-verified.
- 8 `quizzes` rows hold FROZEN `stem` snapshots, so a bank UPDATE would not reach them and the two
  surfaces would disagree.

**Never convert** `\begin{pmatrix} n \\ k \end{pmatrix}` in Binomial Theorem — it is nCk, and JEE
2021 Paper19 Q62 defines `(n k)` and `[n k]` as two DIFFERENT symbols told apart by their brackets.
Both the probe and the repair carry that exemption (single-column AND the row mentions
combinations); measured bank-wide it exempts exactly the 3 rows that want exempting.

### ~~BACKFILL LEDGER — 28 files carry a RAW control byte~~ — DONE 2026-09-15

All 28 fixed the day after they were logged: 68 raw control bytes replaced with `\uXXXX` escapes,
the guard's allowlist deleted, and `tests/no-control-bytes.test.ts` now simply asserts none.

Two corrections to what this entry originally claimed, both found by measuring before editing:

- **It was not "every one the same pattern, a NUL separator".** Eight distinct bytes — 0x00 x24,
  0x01 x10, 0x08 x5, 0x0B x11, 0x0C x5, 0x0E x4, 0x1F x8, 0x7F x1 — across THREE classes:
  composite-key separators, control-char DETECTOR regexes (`/[\u0000-\u0008\u000B...]/`), and
  deliberate test FIXTURES (`"has a \u0001 byte"`). Escaping is behaviour-preserving for all three,
  but only the first class was the one this entry described.
- **The allowlist was breaking CI and the local gate could not see it.** 16 of its 28 paths were
  gitignored scratch files present only on this machine, so its "every entry still offends"
  assertion passed here and failed on a clean checkout — from the commit that introduced it.
  Proven by moving those 16 aside and re-running. A list of PATHS is a claim about a working tree,
  not about the repository.

Verification, since the risk was concentrated in one file: `lib/quiz/atoms.ts` feeds its separator
into a STORED sha1, and `fingerprint()` returns byte-identical output across 7 inputs before and
after; 13 character classes were rebuilt from both the escaped and the raw form and compared over
all 256 byte values (identical); typecheck and the full suite green.


Deferred remainder of the 2026-06-01 (later) tech-debt pass. That session shipped the guide component de-dup (12 parallel files → 2 generics), the `questionResources.ts` resolver registry, and cross-link + billing test coverage (see CLAUDE.md Decisions log). These three are the lower-urgency items it explicitly left out.

### Split `EditQuestionForm` (1,154-line god-component)

`src/app/questions/[id]/edit/EditQuestionForm.tsx` fuses form state, the exam→subject→chapter→subtopic cascade, concept tagging, image upload/preview/validation, set-membership, and role-gated visibility behind ~11 drilled props. Works + server-guarded, but untestable as a unit. Natural seams: `TaxonomyPicker`, `ImageSlot`, `ConceptTagger`, `VisibilityControl`. Tier-2 — do it when the edit page is next touched.

### Extract `docxBuilder` paragraph-construction helpers

`src/lib/export/docxBuilder.ts` (~468 lines) is dense imperative Word-layout code (numbering, set-banner + passage truncation, OMML placeholder-swap, image fitting). Cohesive but hard to follow — extract `buildSetBanner` / `buildOptions` / `applyOmmlPatch` opportunistically when next touched. Lower priority than the form split.

### Collapse the `/`→`/dashboard`→`/browse` double-redirect

`src/app/page.tsx` sends a signed-in org-less student to `/dashboard`, which then bounces them to `/browse` — a wasted hop, and the inline comment ("orphan-user state lives on /dashboard") is stale after the 2026-06-01 dashboard change. Route org-less users straight to `/browse` from `/`. Tier-3; ~5-minute fix.

---

## UI / IA polish

The 2026-05-18 Tier 1 IA + cross-linking ship (primary nav, exam pill, `/nda` exam home, backlink chips, click-to-reveal, filter recipes, in-app reports) left these student / teacher journey items as follow-ups.

### Brand link → exam home for non-admin viewers

`AppHeader` brand link currently goes to `/browse` for non-admins (and `/dashboard` for admins). Now that `/nda` exists, non-admin brand link should go to the cookie-active exam's home (`/nda` today; future `/mht-cet` etc.) so "go home" means "go to your exam's everything-page". Behaviour change worth its own commit; cost is ~10 minutes (one helper edit). Deferred from Tier 1 Phase 1.

### Per-exam `/browse` route

Today `/browse` is exam-agnostic and the user applies the exam filter via cookie / URL param. A `/nda/browse` route (and future `/mht-cet/browse`) that defaults to the exam's `examId` would drop the "pick exam" step for the 95% case and let direct deep-links carry exam context naturally. Plumbing: route alias + middleware default-filter injection. ~1 hour. Deferred from Tier 2 (the empty-state recipes ship was the smaller half of Tier 2 student journey).

### Cookie-driven resume

Last-read playbook / last-opened concept note / current cart as a tiny `qb_resume` cookie. Lets a returning student pick up where they left off without an account. No DB cost; ~1 hour. Deferred from Tier 2 student journey.

### Saved filter sets (DB-backed teacher infra) — Tier 3 scope

New `saved_filters(user_id, org_id, name, filters_jsonb, created_at)` table + a small UI under `/dashboard` (probably split into "Admin" + "Teach" tabs). Lets a teacher save the same recipe ("MHT-CET Physics HARD 2024") and reuse it weekly without rebuilding. Half-day; first new schema since the Tier 1 UI overhaul began. Needs a small product decision on UI placement (dashboard tab vs `/browse` toolbar vs cart-style panel) before scoping. Subsumes the existing "Optional user accounts — saved filters / history" entry below.

---

## Auth + accounts

### Custom SMTP for Supabase Auth — ✅ DONE 2026-07-16 (but the stock template gets flagged as phishing — see Password reset flow)

**Two different things share the name "Resend"; both are now live, but they are not the same system:**

| | What it is | State |
|---|---|---|
| **Resend API** | Our app POSTs to `api.resend.com` with `RESEND_API_KEY`. Powers the mock-recommendation campaign (migration 0059, `src/lib/email/`). | ✅ Shipped 2026-07-16 |
| **Supabase Auth SMTP** | Password-reset + magic-link + invite mail, sent by **Supabase**, not our code. | ✅ Wired 2026-07-16 |

**Config (Supabase → Authentication → Emails → SMTP Settings):** host `smtp.resend.com` · port 465 · username `resend` · password = a Resend API key · sender `noreply@pyqvault.com` / "PYQ Vault". **Enabling SMTP does not lift the throttle** — the separate `GOTRUE_RATE_LIMIT_EMAIL_SENT` was raised **2/1h → 30** (Authentication → Rate Limits). Both halves are needed; the old ~2/hour cap was the actual bug.

**Verified end-to-end**, not assumed: a live `POST /auth/v1/recover` produced `user_recovery_requested` with `status:200, error:null` and a **2.77s duration** (an SMTP round-trip, not a no-op), and the mail arrived with **SPF PASS · DKIM PASS (`pyqvault.com`) · DMARC PASS**, delivered in 1 second via `ap-northeast-1.amazonses.com`.

**⚠️ It arrives in SPAM with Gmail's red "This message might be dangerous" phishing banner** — and the cause is NOT deliverability. See "Password reset flow" below; the same-day campaign proves the domain is healthy (31/31 to inbox).

### Optional user accounts — recently-built papers, drill streaks

**Self-serve accounts now exist** (`/signup`, 2026-06-01) and the per-user `entitlements` table is live — so this is unblocked. Remaining: recently-built papers history, per-user drill streaks / progress, account-bound preferences (the "saved filters" half is a separate scope under **UI / IA polish**; the cross-device cart under **Cart / persistence** is also now unblocked). These attach to `auth.users(id)` the same way entitlements do.

### Password reset flow

No UI yet — admins reset directly via SQL (see CLAUDE.md Operations). Self-serve email/password students shipped 2026-06-01 and have no "forgot password" path; Google-OAuth students are unaffected. **The SMTP half is DONE (2026-07-16, above). What remains is code — and a hard requirement we now have evidence for.**

**THE FINDING (2026-07-16): Supabase's stock reset template gets flagged by Gmail as PHISHING, and it is a CONTENT problem, not a deliverability one.** The mail lands in **spam** under a red *"This message might be dangerous — messages like this one were used to steal personal information"* banner. Why: the stock template's `{{ .ConfirmationURL }}` always resolves to the **project domain** (`<ref>.supabase.co/auth/v1/verify?token=…`), so the email says `From: PYQ Vault <noreply@pyqvault.com>` and its only link points somewhere else entirely. A password-reset email whose link domain ≠ its From domain is the textbook credential-harvesting shape.

**The same-day natural experiment isolates it beyond doubt** — same domain, same hour, same provider, same auth result, only the content differs:

| | Mock campaign (our `src/lib/email/`) | Auth reset (Supabase stock template) |
|---|---|---|
| SPF / DKIM / DMARC | PASS / PASS / PASS | PASS / PASS / PASS |
| Links point to | `www.pyqvault.com` (= From domain) | `…supabase.co` (≠ From domain) |
| Outcome | ✅ **31/31 to INBOX** | ❌ spam + phishing banner |

So: do **not** chase DNS/warm-up/reputation. The fix is to make the link live on our domain.

**Scope (the documented Supabase pattern):**
1. Custom template → `<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">` (dashboard).
2. **`/auth/confirm`** route handler — `verifyOtp({token_hash, type})` → session → redirect. Validate `type` + the redirect target (open-redirect risk).
3. **`/reset-password`** page — new-password form (`updateUser({password})`).
4. **`/forgot-password`** page — the email input; today there is no UI at all (the 2026-07-16 test was a hand-rolled `POST /auth/v1/recover`).
5. Brand the auth templates while there — they're student-facing, so the same rule as the reply-to applies (PYQ Vault, not the tenant org).

Same treatment fixes magic-link + invite mail, which use the identical `ConfirmationURL` mechanism. **Deferred by the user 2026-07-16** ("we will take this in future") — nothing is broken that wasn't broken before; a student who forgets their password was already stuck, and is now stuck one step later (the mail sends, but lands in spam looking dangerous).

---

## Premium / paywall (Razorpay)

The 4-phase paywall shipped 2026-06-01 (signup → entitlements → comp-access UI → notes preview-gate → Razorpay checkout; see CLAUDE.md Decisions log + [[project-paywall-build]]). The code is complete and gate-green; these are the **open activation + follow-up** items.

### Activate Razorpay (the only thing blocking real transactions)

Checkout returns 503 until 4 env vars are set in Vercel + `.env.local`: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` (= key id), `RAZORPAY_WEBHOOK_SECRET`. Steps: create a Razorpay account (test mode needs **no KYC**) → generate test keys → create an `order.paid` webhook → `https://question-bank-sage.vercel.app/api/billing/webhook` → run a test-card payment → confirm an `entitlements` row + a paid chapter unlocks. **Open question (2026-06-01):** the user's existing Razorpay login looked like a partner-linked/Route account ("Registered By: CREATOR ECONOMY TECH", limited nav, no API-keys page) — may not expose standalone keys; a fresh direct razorpay.com merchant account may be required. Going live later = KYC + swap the 4 vars to `rzp_live_…` + repoint the webhook (no code change).

### Designate the first paid notes chapter

All 5 current `/notes` chapters are `free` — the preview-gate machinery is dormant. Making a future chapter premium = set `tier:"paid"` (+ optional `paidScope`/`previewConceptCount`) in the `NOTES_CHAPTERS` registry AND make its `[subtopicSlug]/page.tsx` wrapper `export const dynamic = "force-dynamic"` + drop `revalidate`/`generateStaticParams` (notes-lint enforces the contract). Product decision: which chapter, and confirm the 2-concept preview line reads well for it.

### Pro-plan hardening (when on Supabase Pro)

`auth_leaked_password_protection` (HaveIBeenPwned check on new passwords) is **Pro-only** and currently off — worth enabling now that strangers set passwords. On Free, the lever for abuse is Attack Protection → CAPTCHA (hCaptcha/Turnstile, free-tier) — only wire if bot signups appear.

### Per-chapter / multi-tier pricing (future)

The entitlement model already supports non-`'all'` scopes (`scope` is free-text), so selling individual chapters or tiers needs **no migration** — add `PLANS` entries + per-chapter `paidScope` + a richer `/pricing`. Single-tier (one ₹999/365 pass) is the current shipped shape; revisit only if the catalog of paid chapters grows enough to warrant à-la-carte.

### Receipts / invoices / GST (ops, not code)

Razorpay dashboard handles payment receipts; GST on the price itself (if LWS is GST-registered) is a CA/tax question, not a code change. Flag for the finance side before going live.

---

## Export quality

### Printable per-chapter `/notes` PDF — "Download PDF" button

Generate a printable PDF study booklet per `/notes` chapter, straight from the existing notes data (no new authoring — it's pure layout over `ChapterNote` → `SubtopicNote` → `ConceptUnit`). **Structure approved 2026-06-04** (full booklet ending in a revision sheet):

1. **Cover** — title · `subjectDisplay` · exam · PYQ Vault mark · chapter `intro` · stat band · short URL.
2. **Chapter map** — `subtopicOrder` contents + the auto-derived `ConceptWeightTable` (high-yield triage).
3. **Teaching body** — per subtopic → per concept: `name` → `intuition` → `definition` → boxed `formula`/`ReferenceTable` → worked example (`authoredExample`) → traps → `[Q# · month · year]` provenance. Static SVGs inline; rotatable ones print their default frame.
4. **Practice workbook** — every `selfCheckExample` + `practiceSet` rep as numbered problems, with…
5. **Answer key** — solutions at the back, back-referenced (so it's self-test-usable on paper).
6. **Revision sheet** — the auto-derived `ChapterRevisionSheet`, dense two-column finale.

**Delivery (decided):** a server-side **"Download PDF" button** on the chapter landing → headless-Chrome render of a dedicated print route → streamed `application/pdf`.

**Sample approved:** `C:\tmp\indefinite-integration-sample.pdf` (51 pages, MHT-CET Indefinite Integration), generated by a throwaway DB-light proof-of-concept (not kept — regenerable from this recipe: a `tsx` script reads the chapter's real `_data`, pre-renders each `\(...\)` zone with the bundled `katex` package's `renderToString`, emits print-styled HTML linking `node_modules/katex/dist/katex.min.css`, then `msedge --headless=new --no-pdf-header-footer --print-to-pdf=...`). Confirmed KaTeX math, formula boxes, worked examples, traps, and the two-column revision sheet all render cleanly.

**Architecture (single source of truth):**
- **Phase 1** — a print route `/notes/<subject>/<chapter>/print` (server component) renders the full booklet flat (non-interactive) via the existing `KatexRenderer`/`RichText`/diagram renderers + a print stylesheet. Independently viewable, so browser **Save-as-PDF is a zero-infra fallback**. TDD the pure helpers: `collectPrintBooklet(registration)` (ordered flattened sections), the **answer-key separation** (relocate every practice/self-check answer to the back, numbered + back-referenced), `pdfFilename(registration)`.
- **Phase 2** — a PDF API route (`/api/notes/[subject]/[chapter]/pdf`) launches headless Chrome, navigates the print route, waits for `document.fonts.ready` + KaTeX, `page.pdf()`, returns the buffer; plus the button, running headers / page numbers (Puppeteer `headerTemplate`/`footerTemplate`), the **real SVG diagrams** (replace the Phase-1 placeholders), and the **DB-backed featured PYQs + drill refs** (omitted in the sample).

**New dependency:** `puppeteer-core` + `@sparticuz/chromium` (no in-stack substitute — react-pdf can't render KaTeX; the docx pipeline is for question papers, not prose). Risks on the record: **Vercel Hobby 10s function timeout** (a 30–50 page render + cold start is the main risk; Pro lifts it to 60s — relevant to the pre-Razorpay Pro move), ~50 MB chromium bundle (fits Hobby, adds cold-start latency on a click-to-download path), and the Save-as-PDF fallback if it ever bites.

**Defaults taken:** A4, one PDF per chapter, button beside the existing Present-mode control. **Open product questions:** (a) **free vs entitlement-gated** download (decide at the button — ties into the paywall machinery); (b) **page length** — 51 pp is what "everything for one chapter" costs (biggest chapter); levers if too heavy are dropping the practice+answer-key section or making it opt-in.

### Auto-split exports (> 200 questions)

Current cap: 200 questions per export, enforced because of Vercel function timeout. Beyond that, the user gets a clear error ("narrow filters"). Auto-split (multiple Word files for one big request) was deliberately not built; revisit if a real teacher hits the cap.

### Custom-designed OG PNG

The dynamic `ImageResponse`-based OG image (both `/opengraph-image` and `/guide/opengraph-image`) renders fine but is less polished than a designer-built PNG. Cosmetic-only.

---

## Cart / persistence

### Cross-device cart sync (DB-backed paper drafts)

The paper cart is localStorage-only — per-browser, doesn't survive a phone-to-laptop switch. DB-backed drafts would let a teacher build a paper on phone, finish on desktop. Needs auth (sign-in to associate drafts to a user).

---

## Cross-app integration

### Phase B — direct API push of a built paper to nda-tracker (retire the tagged Excel)

User-confirmed long-term direction (2026-06-14). Phase A shipped the auto-generated **tagged sheet (.xlsx)** download (see the 2026-06-14 Decisions-log entry) — it kills the hand-typed-file error class but keeps a lossy, schema-coupled Excel bridge. Phase B removes the Excel:

- PYQ Vault pushes the built paper's tags (questions + options + answer + chapter/subtopic/difficulty/solution + **context + set grouping + images**) over the **existing cross-app Bearer-secret bridge** — same pattern as the Quiz Factory's `quiz-import` (`NDA_TRACKER_IMPORT_URL` + `QUIZ_IMPORT_SECRET`, deterministic id via `slugToUuid`).
- nda-tracker stores it keyed to a stable **paper id**; the upload wizard gains a "pick a pre-loaded paper" dropdown, so the operator uploads **only the Evalbee Results** (the OMR output, which can never come from PYQ Vault).
- Lossless: writes the same `exams.questions` **jsonb** the same way as the Tags path → **still no DB migration**. Re-push is idempotent (same paper id).
- Reuses everything Phase A built on the kept side (the nda-tracker `context` field + passage rendering + the Maths chapter-name sync). The only things retired are the `.xlsx` generation + the `parseTagsFile` context column (~5 lines).
- Effort is a two-app change (new nda-tracker endpoint + "imported papers" store + wizard dropdown branch) — same cross-app care as [[cross-app-feature-execution]]. Gate on actually wanting to drop the Tags upload; Phase A already removed the error class.

### MHT_CET_AI publisher button (explicitly deferred)

`POST /api/sync/mock` is the receiver side, already live. The publisher button inside MHT_CET_AI is a separate cross-project change. User explicitly chose "complete this project, defer cross-integration."

---

## Observability + ops

### Staging Supabase for the gate (tests first) + ECONNRESET retry hardening (analysis done 2026-08-05; deferred)

> **Largely superseded 2026-08-05 — MEASURE BEFORE BUILDING THIS.** Two things changed after this was written.
>
> **(a) The IO/ECONNRESET half is fixed at the cause** (`fa9b627`): `queryQuestions` was sorting the full row shape and spilling ~14 MB to disk per call — 99.4% of the project's temp writes, 1,097 GB lifetime — which drained the Disk IO Budget and made every burst fragile. The gate now passes with zero ECONNRESET/timeout signals, so item 4 below (retry hardening) has lost most of its urgency; it is now cheap insurance for Vercel deploy builds, not a live-failure fix.
>
> **(b) Egress was measured, and builds ARE the egress.** A `/questions` landing page response is 37 kB (25 rows, 1,506 bytes/question); a full build is ~25 MB; there were 145 pushes to main in 30 days × 3 builds each (pre-push, CI, Vercel) ≈ **10.9 GB/month against 11.48 GB observed.** That also explains the previously-unexplained flat ~200 MB daily plateau — it is a count of builds, not a mystery baseline.
>
> **What was done instead** (`918f0b5`): the pre-push and CI builds are now conditional on the changeset, since 78 of those 145 pushes changed nothing the compiler reads. That removes ~3.9 GB/month with **no** loss of gate coverage — strictly better than the "skip the local build" idea in item 5, which traded away protection. Combined with batching pushes (~5/day today), the free-tier allowance is clearable without staging at all.
>
> **So the remaining case for staging is: the test-flake fix, plus headroom that does not depend on push discipline.** Real, but much narrower than the "one fix, three symptoms" pitch below. Watch the egress chart for a week first — if normal-activity days settle under ~150 MB, do not build this. One cost the tables never captured: for CI's build to prerender against staging, staging needs a real content snapshot that stays in sync as the bank grows, or CI builds pages that do not match production.

**Problem:** the single shared prod Supabase is the binding constraint on the pre-push gate — now **three distinct symptoms of one root cause**: `/questions` prerender statement timeouts (2026-08-03, tuned away with `cpus: 4` + `staticPageGenerationTimeout: 180`), random DB-integration test flakes under concurrent-session load (2026-08-04 SUGGESTIONS ledger entry), and now **pool exhaustion** — a gate run where every stage passes alone but `build` immediately after `test` gets 344 ECONNRESETs (2 of 689 pages fail). Mechanism: 79 test files hammer the DB, `global-teardown` finishes with heavy cascade deletes, and the build then fires 4 prerender workers at ~317 DB-querying pages while the small shared instance is still saturated → the pooler/PostgREST resets connections. The existing retry in `queryQuestions` only matches SQLSTATE 57014 (a PostgREST error object); an ECONNRESET is a *thrown fetch-level network error* and nothing retries it. Each fix so far has tuned headroom against a moving target (bank growth + concurrent sessions), so the class recurs structurally.

**Plan (agreed 2026-08-05, deferred):**
1. **Second free-tier Supabase project** (user creates it — the MCP can't create projects); apply migrations 0001–0066 from the repo files + `db:seed`.
2. **Restore a snapshot of prod's content tables** (organizations → taxonomy → questions/options/tags; skip user-keyed tables — `org_members`, `mock_attempts`, `notes_progress`, etc. FK onto `auth.users` and tests create their own users). The "LWS Pune" org row must come along (DB tests `.eq("name","LWS Pune")`).
3. **Point tests at it**: `.env.test` preferred over `.env.local` in `tests/setup.ts`; flip the three CI secrets. Kills the global-teardown "sweep prod" fragility outright and lets `maxForks: 2` be raised (faster suite).
4. **Independently valuable, do even without staging:** extend the prerender retry (`queryQuestions` + landing-page loaders) to catch thrown fetch failures/ECONNRESET, not just 57014 — **Vercel deploy builds prerender the same 689 pages against prod by necessity, so an ECONNRESET burst can fail a production deploy today.**
5. Local/CI **build** stays on prod initially (build-alone has passed twice); phase 2 — export staging env for the gate's build stage too — only if build-vs-prod contention recurs. The local build artifact is discarded (Vercel builds the real deploy), so nothing depends on it hitting prod.

**Standing costs to accept:** migration discipline (every new migration applied to BOTH projects — checklist line or small script), and free-tier auto-pause after ~1 week idle (a stale staging project fails the gate confusingly; weekly keep-alive ping or manual wake). Alternatives considered + rejected: Supabase Pro upgrade (pays prod capacity to absorb test traffic — wrong shape, just moves the cliff); prerendering from a build-time JSON snapshot (largest change, fights the data-driven page design).

### Frontend error monitoring (Sentry or equivalent)

Currently relying on Vercel function logs (server-side `console.error` paths) + Vercel Analytics (pageview counts, cookieless). Frontend exceptions don't surface anywhere. Consider Sentry only if noise picks up — premature otherwise.

### Health-check endpoint

Premature without an external uptime watch. Wire if and when an uptime monitor (Better Uptime, etc.) is configured.

### About / FAQ pages

Content rather than infrastructure. Could live under `/about` and `/faq`. Not load-bearing for the paper-builder use case.

---

## Education-data asset — verified reasoning corpus + eval benchmark (far-horizon strategic bet)

Captured 2026-06-14 from a strategy brainstorm. This is **forward-looking, mostly un-built, and explicitly gated on a demand signal** — not near-term product work. Don't pour net-new hours into Phase 2 / workstream (a) until a buyer signal exists.

**The thesis.** The durable, AI-proof asset under everything is the **verified, concept-tagged, solution-rich PYQ corpus** — because AI commoditizes *generating* plausible content but not *verifying* it, so verified ground truth is the scarce complement. Productize it three ways, in this order of monetization but reverse order of build-dependency:
- **(a) Content + assessment API / white-label to other coaching institutes** — the near-term *cash* (warm distribution via LWS's network; institutes have students but not content rigor). **Deferred by user.** This is what funds the rest.
- **(b) Reasoning-trace + rationale schema** — the *foundation*; turns every verified solution into structured fine-tune/eval data. Nearly free to start.
- **(c) Eval benchmark** (held-out slice of (b) + a scoring rubric) — *credibility/inbound, not direct revenue*. Built on (b).
- The existing apps (PYQ Vault, nda-tracker, English tutor, quizzes) are the **data flywheel** that fills the corpus.

**Grounded baseline (measured 2026-06-14):** 13,304 PUBLIC q (10,264 PYQ + 3,040 practice); **13,303 have a solution (~99.99%)**; only **~150 (~1.1%) carry garbling signals** (104 stripped-backslash LaTeX, 34 hedge/defect markers, 17 trivially-short, 1 control-char) — **all probe-detectable**; 26% concept-tagged (the noted chapters); **~230 documented key-flips** (in the Decisions log, not a structured column) = ready-made ground truth for the key-audit task. The bank is essentially *built*, so the asset is locked in the existing corpus — which is why a **retrofit** is warranted, not just going-forward capture.

### (b) The record schema + phasing

One canonical structured record per question (`schema-version b-1.0`): identity/taxonomy + `concept_slugs` + `stem`/`context`/`options` (no `is_correct` in the payload) + `verified_answer` + `provenance` (ingested vs verified key, flip date, method) + `reasoning_trace` (ordered steps) + `distractor_rationales` (per wrong option: the misconception) + `source_hash` (staleness key) + `phase` tag. Each record projects into: an **SFT row** (messages format) and four **eval items** — **T1 answer-accuracy**, **T2 reasoning-faithfulness**, **T3 misconception-diagnosis**, **T4 key-audit**. T3 + T4 are the differentiated, moat-using tasks only this corpus can build (everyone solves the exam; almost nobody diagnoses or audits).

**Storage (decided):** files, not tables, for the derivable part. Phase 0 records + eval/SFT sets = **JSONL exports** regenerated from a query (don't store what you can derive; `source_hash` flags staleness). The **only** new persistent object in Phase 0 is a small `key_flips` lookup (CSV or tiny table) holding the ~230 flips' `ingested_key`/`flipped_on`/`note`, since flip history isn't a column today. Generated content (traces, rationales) lands in **one new table `question_traces (question_id FK, reasoning_trace, distractor_rationales, statuses…)`** in Phase 1/2 — **never** new columns on `questions`/`options`, so the live app is untouched and the whole asset is `DROP`-reversible.

- **Phase 0 — pure projection (free, near-zero risk).** Deterministic SQL → JSONL. Unlocks **T1**, **T4** (via the `key_flips` lookup = "0b"), and a **raw-prose SFT corpus**. No LLM, no authoring, no writes. **Status: Step 1 validated 2026-06-14 on the Gravitation chapter — 17/17 records emitted clean, exactly-one-correct gate green, session/hash/tags all populated, escape-speed flip (`95e70f86`, B→A) demonstrated the 0b path end-to-end.** Not yet generalized to 13,304.
- **Phase 1 — structure the solutions (cheap, ~2–3 focused days).** An LLM pass structures the ~99%-clean `solution` prose into `reasoning_trace`; gates = **G1 trace-conclusion == verified_answer** (which doubles as a bank-wide stealth-wrong-key probe — likely catches a few more), **G2 LaTeX integrity** (auto-repair the 104 known), **G3 grounding/hallucination** (sampled), **G4 non-triviality**, **G5 no-leakage** (projection-time). Cost is sampling QA (~350 traces for an error bar) + the ~150-row long-tail, *not* per-row review. Unlocks **T2** + a clean SFT corpus. Bonus: doubles as a latent solution-quality audit of the live product.
- **Phase 2 — distractor rationales (expensive, GATED on demand).** Author + human-verify the per-distractor misconception for the **high-value slice only** (HARD + the ~230 flips + benchmark items), NOT all 13k — LLM-drafted rationales risk poisoning the moat with plausible-but-wrong labels, so verification is the real cost. Unlocks **T3**.

### (c) The benchmark (IVERA-STEM)

A manifest (tasks T1–T4 + splits + contamination policy) + a held-out test split + a scoring rubric (T3 judged 1.0/0.5/0.0 on misconception specificity; T4 = wrong-key detection + a false-flag penalty). **Publish a small dev split** (gets cited, becomes a reference) + **hold a private test split** (the leverage; naturally refilled by each new exam year *before* public release → structurally uncontaminated, a thing scraped benchmarks can never have). Budget it as marketing/optionality, not income. The held-out split must be hand-verified (don't trust the Phase-1 auto-pass there).

### Standing recommendation + the trap

**Do Phases 0–1 as a self-funding asset+audit pass** (cheap, reversible, hardens the live bank via the G1 wrong-key gate) — justified even before a buyer. **Gate Phase 2 and workstream (a) on a real demand signal** (one conversation with one partner institute: "would you pay for verified, concept-tagged banks + auto-grading under your brand?"). The recurring trap across this whole thesis: the seductive framing (knowledge graph / "education OS" / your own fine-tuned model) is always one expensive abstraction layer *above* the real advantage (verified content + pedagogy). Keep (b)/(c) only as thick as a consumer needs — the schema is "done" the moment it emits a valid SFT row + an eval item, not when it's an elegant ontology. Do **not** build a benchmark *platform*, a knowledge-graph schema, or a from-scratch model. Ruled out explicitly: foundation-model training (unwinnable treadmill / capex), third-party developer platform (chicken-and-egg), speculative knowledge graph (build only when a feature pulls it).

---

**Decisions-log style note**: when an item ships, move its entry from this file into the `CLAUDE.md` Decisions log (with a `2026-MM-DD —` prefix and a "Why" sentence). Don't let ROADMAP.md and the decisions log diverge.
