// The Maharashtra State Board Class-11 pipeline reuses the State Board pure core
// VERBATIM — buckets, buildRecords, assignSections, latexImbalances are all
// exam-agnostic (a Class-11 Balbharati textbook question becomes a bank row the
// same way a Class-12 or Class-9 one does). Re-exported here so the Class-11 IO
// scripts import from `./lib` like their State Board / Class-9 / NCERT twins, and
// the shipped pipelines stay untouched. Unit-tested via tests/stateboard-lib.test.ts.
export * from "../stateboard/lib";
