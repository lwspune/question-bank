# Current-Affairs pool pipeline

Specifies, checks and looks back at the Current-Affairs question pool authored
ahead of each NDA sitting. The **consumption** side already existed —
`scripts/bank-paper/build.ts` pins its CA picks to one `sourceFile`, and
`NDA_GAT_BLUEPRINT.md` §8b explains why. This is the **production** side, which
did not.

## Why it exists

The Sep-2026 pool (`Current Affairs_Sep26.docx`, 88 rows) scored **zero** real
topic hits against the eleven Current-Affairs questions NDA II 2026 actually
set. Nothing was broken; there was simply no target to author against. Measured
after the fact, the pool missed on three independent axes:

| Axis | Pool | Blueprint | |
|---|---|---|---|
| Evergreen share | 19% | 40% | under by half |
| Defence seats | 22 | 15 | +7 |
| Science & Tech seats | 17 | 9 | +8 |
| International Affairs | 10 | 16 | −6 |
| Govt Schemes | 9 | 16 | −7 |

Every one of those numbers was computable in **August 2026**. `audit.ts` is the
command that would have printed them.

## The two findings that drive the design

**1. The window is 20 months, not 8.** Measured across 191 NDA Current-Affairs
PYQs: 56% reference the exam's own calendar year, a further 30% the year before,
14% older. For a September sitting that is 0–8 months and 9–20 months — so an
8-month reach covers ~56% and a 20-month reach ~86%. The other end matters too:
no PYQ dates fresher than 2 months before its exam (UPSC sets the paper ahead),
and NDA II 2026's freshest datable item was 6 months out. Window = **T−20m ..
T−2m**.

**2. Genre matters more than the window.** **40% of CA PYQs name no date at
all.** They are named-entity lookups — *REJUPAVE, PM MITRA Parks, Seva Bhoj
Yojana, UDAN, Square Kilometre Array*. Four of the eleven 2026-II questions are
exactly that shape (Ramanujan Fellowship, International Big Cat Alliance,
Neighbourhood First Policy, River Basin Management), and no amount of widening
the news window produces one. The rate is **per chapter** and the spread is the
point: Defence runs 64% evergreen, International Affairs 14%.

## Commands

```sh
npm run ca:brief -- nda-1-2027 [--size=100]   # the authoring brief
npm run ca:audit -- nda-2-2026                # score a built pool. TRIAGE, always exits 0
npm run ca:hindsight -- nda-2-2026            # after the sitting: what the paper actually touched
```

All three are read-only against the bank. `brief` and `hindsight` write to
`generated-papers/` (gitignored); `hindsight` also appends to `HINDSIGHT.md`
here, which IS committed.

## Order of operations

1. **`ca:brief <next sitting>`** — emits `generated-papers/ca-brief-<slug>.md`:
   the window in months, per-chapter seats split evergreen/dated, and every
   question already asked (all CA PYQs + the previous pool) so an author can see
   what not to repeat.
2. Author the pool to that brief; ingest it via the normal upload path.
3. Register its `poolSourceFile` in [`config.ts`](config.ts).
4. **`ca:audit <sitting>` — BEFORE THE EXAM.** Everything it checks was
   computable months ahead; running it afterwards only confirms a post-mortem.
5. After the sitting, once the real paper is ingested and registered as
   `paperSourceFile`: **`ca:hindsight <sitting>`**, then read the report and fill
   in the ADJUDICATED column of `HINDSIGHT.md` by hand.

## What each piece will not do

- **The audit never fails.** A pool that misses its blueprint may be deliberately
  skewed — an unusually busy defence calendar is a real reason to over-fill
  Defence. It prints numbers; a human decides. Sibling of `audit:text` and
  `audit:keys`, not of `board:lint`.
- **The genre classifier is a regex over year tokens**, so it is a heuristic. It
  declares its own soft spots via `evergreenCaveat` — a month with no year, a
  floating "recently/current", a two-digit fiscal span — and the audit prints
  those rows rather than folding them silently into a total.
- **A bare year is never promoted to a month.** Most dated questions give only a
  year, so inventing one would rest the majority of every report on precision the
  source never had. `windowVerdict` returns `"partial"` for a bare year that
  straddles a boundary, and `eventLag` returns a span.
- **The hindsight matcher is a reading list, never a verdict.** Scaffold is
  stripped ("Consider the following statements ... is/are correct" is shared by a
  large slice of the corpus and would otherwise dominate), but a score still only
  says two questions share subject words. On the one sitting it can be tested
  against it produced **one** candidate out of 968 pairs, and reading it showed a
  false positive. Do not lower the threshold to make a report look better — the
  zero was the finding.

## Where the code lives

| | |
|---|---|
| Pure core, TDD | `src/lib/currentAffairs/{types,window,blueprint,overlap}.ts` |
| Tests (61) | `tests/current-affairs-{window,blueprint,overlap}.test.ts` |
| Sitting registry | `scripts/current-affairs/config.ts` |
| Reads | `scripts/current-affairs/db.ts` |
| CLIs | `scripts/current-affairs/{brief,audit,hindsight}.ts` |

The blueprint is **derived from the PYQ history at run time**, never hand-typed,
so it re-derives as the bank grows. Re-run the measurements in
`window.ts`'s header before changing either constant.
