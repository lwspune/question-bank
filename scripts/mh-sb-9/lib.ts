// The Maharashtra State Board Class-9 pipeline reuses the State Board pure core
// VERBATIM — buckets, buildRecords, assignSections, latexImbalances are all
// exam-agnostic (a Class-9 Balbharati textbook question becomes a bank row the
// same way a Class-12 one does). Re-exported here so the Class-9 IO scripts import
// from `./lib` like their State Board + NCERT twins, and the shipped State Board
// pipeline stays untouched. Unit-tested via tests/stateboard-lib.test.ts.
export * from "../stateboard/lib";
