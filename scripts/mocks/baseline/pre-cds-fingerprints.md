# Mock snapshot fingerprints

Acceptance criterion for any change to the shared build path in
`scripts/mocks/build.ts`: re-running the build must leave the ALREADY-SHIPPED
mocks byte-identical. Capture before, capture after, diff.

## ⚠ Two fingerprints exist and they are NOT comparable to each other

They hash the same fields but render them differently — Postgres `jsonb::text`
normalises and re-orders object keys, `JSON.stringify` does not — so the same
unchanged row yields a different digest under each. Comparing across the two
looks exactly like a regression and is not one. **Always diff a baseline against
a re-measurement taken THE SAME WAY.**

| method | how | status |
|---|---|---|
| SQL | `md5(string_agg(... marking::text ... md5(questions::text) ...))` in the SQL editor | historical — used for the 2026-08-25 refactor proof |
| script | `npx tsx scripts/mocks/fingerprint.ts` | **current** — use this from now on |

## Baseline — SQL method, taken 2026-08-25 BEFORE the CDS work

| family | rows | fingerprint |
|--------|------|----------------------------------|
| nda    | 36   | d959e8ef9bfce4cc42491bfa80bf62a0 |
| neet   | 8    | 685b722c2d2af053593e6e31ef02aa2f |

**Result of the refactor (extracting the shared source_file-keyed builder so CDS
could reuse it): both re-measured IDENTICAL after re-running
`--paper=maths|gat|neet --apply --publish`.** An unchanged fingerprint can also
mean the write never happened, so the witness was checked too: `updated_at`
moved on all 44 rows (NDA 15:05:57–15:06:10Z, NEET 15:06:13–15:06:14Z). The rows
were genuinely rewritten and every fingerprinted field came back the same.

## Baseline — script method, taken 2026-08-25 AFTER the CDS mocks shipped

| family | rows | fingerprint                      | newest write (UTC)        |
|--------|------|----------------------------------|---------------------------|
| cds    | 19   | 4d3a3ce71b70728bf83acbabea2b1176 | 2026-08-25T16:25:54Z      |
| nda    | 36   | 56ec4b9cefe7651ec73f4582b78991b9 | 2026-08-25T15:06:10Z      |
| neet   | 8    | e8f508a13edb677b1d6285f288f2a850 | 2026-08-25T15:06:14Z      |

Note the NDA/NEET write timestamps are still the refactor-verification run above
— nothing has touched them since, which is the independent confirmation that
publishing 19 CDS mocks did not disturb the other 44.
