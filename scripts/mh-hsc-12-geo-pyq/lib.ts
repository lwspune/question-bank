/**
 * Pure core for the MH HSC Class-12 Geography board-PYQ lane.
 *
 * RE-EXPORTED VERBATIM from scripts/mh-ssc-10/lib.ts, which is already the
 * board-PAPER core: a paper spans many chapters, so each question carries its
 * OWN chapter and subtopic, the chapter HARD-validated against the subject
 * catalog and an off-catalog subtopic left as a soft flag. That is exactly this
 * corpus's shape, and `buildPaperRecords`'s own docstring names Geography as its
 * single-subject case.
 *
 * Re-exporting rather than copying is the pattern the repo already uses for this
 * situation — `scripts/ncert/lib.ts` and `scripts/mh-sb-9/lib.ts` both re-export
 * `scripts/stateboard/lib` the same way — and it means this lane is covered by
 * `tests/mh-ssc-10-lib.test.ts` without a second spec that could drift from it.
 *
 * NOT re-exported from scripts/mh-hsc-12-pyq/lib.ts, the OTHER board-PYQ lane on
 * this same exam: its `buildPyqRecords` takes one chapter for a whole file,
 * because its source is a chapterwise compilation rather than a paper. Using it
 * here would force every question in a paper into a single chapter.
 */
export * from "../mh-ssc-10/lib";
