# Current-Affairs pool — hindsight ledger

One row per sitting, appended by `scripts/current-affairs/hindsight.ts`.

**CANDIDATES IS NOT HITS.** A candidate is a pool question that shares subject tokens
with a paper question — a reading list. Whether it would actually have helped a student
is a judgement, so the script writes `—` in ADJUDICATED and a human fills it in after
reading `generated-papers/ca-hindsight-<slug>.md`. A row still showing `—` has been
measured but not read, and its rate means nothing yet.

| Sitting | Pool | Paper CA q | Candidates | Cand. rate | Adjudicated hits | Measured |
|---|---:|---:|---:|---:|---|---|
| NDA II 2026 (September) | 88 | 11 | 1 | 9% | **0** | 2026-09-15 |

**NDA II 2026 — adjudicated 2026-09-15.** The single candidate is a FALSE POSITIVE: the
March-2026 uranium question matched a UNESCO World Heritage Sites question on the tokens
`2026, india, world, natural`. Zero of the eleven questions had any real pool coverage.
That is the finding the pipeline exists to prevent repeating — not a defect in the matcher,
which surfaced one candidate out of 968 pairs and printed the shared tokens that made it
diagnosable at a glance.
