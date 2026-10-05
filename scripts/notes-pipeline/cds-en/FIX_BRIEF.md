# CDS English — FIX SPEC BRIEF (for prep agents, round 2)

The main session has reviewed your dispute list and verified the key changes against the printed pages.
Your job now: write ONE fix spec for your slice, `generated-papers/_fix-cdsen-<code>.json`, and VALIDATE it with a DRY RUN.
You must NOT pass `--apply`, must not write to the DB, and must not edit scripts/cds/data/* yourself (the tool does that on apply).

## Spec format (array of entries; read scripts/cds/apply-notes-fixes.ts header first)
{ "id": "<FULL uuid from generated-papers/_cdsk_en-*.json>", "paper": "2019-2", "q": 38,
  "verdict": "key_fixed" | "stem_fixed" | "solution_rewritten",
  "from": "A",                       // REQUIRED only when set.answer changes the key: the bank's CURRENT key
  "set": {
    "answer": "C",                   // only for a key change
    "reasoning": "...",              // the new solution body. Plain sentences. Do NOT start with "Answer: X." (the tool adds it).
    "stem": "...",                   // the SOURCE stem as printed (plain text, no underline markup)
    "options": { "B": "composed" },  // printed option text, only the labels that change
    "underline": "impugned"          // single-underline token (synonym/antonym/part-of-speech/sentence-improvement rows)
  },
  "why": "<one or two sentences: what was wrong and the page evidence>" }

Rules:
- `verdict`: key_fixed when the key changes; stem_fixed when stem/options/underline change but the key stays; solution_rewritten when only reasoning changes.
- Every key change must ALSO carry new `reasoning` that argues the new answer.
- Reasoning is what students read: no internal notes ("KEY FIX PENDING", "scan", "OCR", "bank", "transcribed", "refit", "mis-slot",
  page numbers, tool names). Explain the English only. Where a row is flawed as printed (two defensible answers / none), say so
  plainly for a student ("Both (b) and (c) are defensible; (c) is the keyed answer because …").
- For spotting-error rows the stem is BUILT from options A–C (or A–D when D is a sentence part), so fix the OPTION texts, not the stem.
- A row whose ONLY problem is a stale internal note in its solution: verdict solution_rewritten, set.reasoning = the cleaned explanation.
- Text taken from the page must be exactly what is printed (keep printed typos only when the question turns on them, e.g. "advicing").

## Validate
Run: `npx tsx scripts/cds/apply-notes-fixes.ts generated-papers/_fix-cdsen-<code>.json`   (dry run, no --apply)
It must end with "N fix(es)" and "dry run — add --apply to write", with no error. If an entry errors, fix the entry and re-run.
Keep tool outputs small.

## Final message
Three lines: entries written (by verdict), dry-run result, anything you could not express in the spec.

## Punctuation: no em dashes in what you WRITE (2026-10-05)

Do not use an em dash (—) anywhere in text you write: solutions, model answers, explanations, notes. Our readers type on phone keyboards that have no em dash, so text full of them reads as machine-written (printed exam papers run 0.11 per 1,000 words; our older solutions ran up to 12). Use a full stop, a colon, a comma or brackets instead. Rewrite the sentence; do not swap in " – " or " -- ", which read the same way. An en dash in a range (2017–2024) is fine.

This rule is for YOUR words only. Text you COPY from the source paper or book keeps its own punctuation exactly. After a commit, `npm run audit:voice -- --solutions` reports the rate per exam.
