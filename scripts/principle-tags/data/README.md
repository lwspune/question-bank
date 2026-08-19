# Principle-tag specs — evidence artifacts

One JSON per `question_principle_tags` write, named `<date>-<principle-slug>.json`, in the
shape `scripts/principle-tag-audit.ts` consumes:

```json
{ "principleSlug": "modulus-absolute-value", "candidateIds": ["<uuid>", "..."] }
```

**Why these are committed.** `principle-tag-audit.ts` was written to print a summary for a
chat approval message, and the spec itself was transient — so the question set behind a
tag write existed only in a conversation. These files make that set re-runnable and
diffable: `npx tsx scripts/principle-tag-audit.ts <file>` against a spec that matches the
live DB reports **0 pending / 0 unresolved**, which is a standing check that the tag
table still says what the spec says. Same reasoning as `scripts/reviews/data/`.

A spec is a RECORD OF A DECISION, not a generator. Re-running the audit never writes; the
INSERT/DELETE stays a reviewed step.

## Files

- `2026-08-19-modulus-absolute-value.json` (87) — narrowed from the old 106-question
  umbrella to strict `|·|`, plus 4 hidden-modulus rows a pipe-based scan cannot find
  (`√(f²) = |f|`).
- `2026-08-19-greatest-integer-function.json` (29) — new.
- `2026-08-19-piecewise-defined-functions.json` (23) — new; 3 of these are prose-defined
  piecewise with no `\begin{cases}`, so a LaTeX-shape scan alone misses them.

All three came out of splitting `modulus-absolute-value` three ways and folding
`differentiability-conditions` away (23 of its 24 questions were already tagged modulus).
See the 2026-08-19 Decisions-log entry in `CLAUDE.md`.

## Two traps these specs were built around

1. **Word-shaped terms over-match.** `greatest integer` and `integral part` also occur as
   ordinary English — "a positive **integral value** at random", "the **greatest integer**
   by which 5⁵+7⁵ is divisible". Four such rows were committed and then removed; the GIF
   spec's `_note` records it. Require a real marker (`[x]`, `[·]`, `[.]`, "greatest
   integer **function**", "integral **part**"), never the bare phrase.
2. **`\begin{cases}` is also a system of equations.** It is a reliable piecewise signal
   here only because this bank's systems are written inline; check, don't assume.
