// The NCERT textbook pipeline reuses the State Board pure core VERBATIM — buckets,
// buildRecords, assignSections, latexImbalances are all exam-agnostic (no NCERT vs
// State Board difference in how a textbook question becomes a bank row). Re-exported
// here so the NCERT IO scripts import from `./lib` like their State Board twins, and
// the shipped State Board pipeline stays untouched. Unit-tested via tests/stateboard-lib.test.ts.
export * from "../stateboard/lib";
