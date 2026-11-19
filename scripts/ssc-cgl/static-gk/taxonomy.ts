/**
 * The "Static GK" subject of the SSC exams (owner, 2026-11-19): the settled facts SSC's General
 * Awareness asks, which the CDS GK split had filed under Current Affairs (dances, festivals, books
 * and authors, sports, "firsts"). A Current Affairs question moves here only when its answer does
 * not depend on news; see README.md beside this file for the rule.
 *
 * Each subtopic carries a short CODE, the form decisions.json records a question's target in.
 * Chapter and subtopic order here is the order the bank shows them in.
 */
export const STATIC_GK_SUBJECT = "Static GK";

export type StaticChapter = { chapter: string; subtopics: { code: string; name: string }[] };

export const STATIC_GK: StaticChapter[] = [
  {
    chapter: "Art and Culture",
    subtopics: [
      { code: "AC-D", name: "Classical and Folk Dances" },
      { code: "AC-M", name: "Music, Musicians and Instruments" },
      { code: "AC-A", name: "Art, Architecture and Heritage" },
    ],
  },
  {
    chapter: "Festivals, Fairs and Important Days",
    subtopics: [
      { code: "FD-F", name: "Festivals and Fairs" },
      { code: "FD-D", name: "National and International Days" },
    ],
  },
  {
    chapter: "Books and Authors",
    subtopics: [{ code: "BA", name: "Books and Authors" }],
  },
  {
    chapter: "Awards and Honours",
    subtopics: [
      { code: "AW-N", name: "National Awards and Honours" },
      { code: "AW-F", name: "Film, Literature and Arts Awards" },
      { code: "AW-I", name: "International Awards and Prizes" },
    ],
  },
  {
    chapter: "Sports and Games",
    subtopics: [
      { code: "SP-T", name: "Sports Terms, Rules and Equipment" },
      { code: "SP-C", name: "Trophies, Tournaments and Venues" },
      { code: "SP-P", name: "Sportspersons and Records" },
    ],
  },
  {
    chapter: "Firsts, Symbols and Institutions",
    subtopics: [
      { code: "FI-F", name: "Firsts in India" },
      { code: "FI-S", name: "National Symbols" },
      { code: "FI-I", name: "Institutions, Organisations and Headquarters" },
      { code: "FI-P", name: "Famous Personalities and Titles" },
    ],
  },
  {
    chapter: "Science, Space and Environment Facts",
    subtopics: [
      { code: "SE-S", name: "Space and Science Milestones" },
      { code: "SE-E", name: "National Parks, Wildlife and Environment" },
    ],
  },
];

/** The decision for a question that stays in Current Affairs (its answer depends on news). */
export const STAYS = "CA";

export type Target = { chapter: string; subtopic: string };

/** code → its chapter and subtopic. */
export const TARGET_OF_CODE: ReadonlyMap<string, Target> = new Map(
  STATIC_GK.flatMap((c) => c.subtopics.map((s) => [s.code, { chapter: c.chapter, subtopic: s.name }] as const))
);
