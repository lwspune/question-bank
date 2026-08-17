// The Maharashtra Class-10 TEXTBOOK pipeline reuses the State Board pure core
// VERBATIM — buckets, buildRecords, assignSections, latexImbalances are all
// exam-agnostic (a Class-10 Balbharati textbook question becomes a bank row the
// same way a Class-12 one does). Re-exported here so the Class-10 textbook IO
// scripts import from `./lib` like their State Board / Class-9 / Class-11 / NCERT
// twins, and the shipped pipelines stay untouched. Unit-tested via
// tests/stateboard-lib.test.ts.
//
// NOTE this is the TEXTBOOK half of exam `mh-ssc-10` (question_kind='practice').
// The PYQ half lives in ../mh-ssc-10, which has its OWN pure core because a board
// PAPER spans many chapters and each question must carry its own chapter+subtopic.
export * from "../stateboard/lib";
