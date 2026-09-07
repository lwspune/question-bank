/**
 * The ordering core behind the NDA/CDS English PYQ master book.
 *
 * The book lays each chapter out as: "NDA PYQ" heading -> every NDA question,
 * then "CDS PYQ" heading -> every CDS question, each half oldest-first. Two
 * facts about the bank make that harder than it sounds, and this suite pins
 * both because getting either wrong mis-orders the book SILENTLY — every
 * question is still present, so no count and no gate can see it.
 *
 * 1. THE TWO EXAMS NEED OPPOSITE SORT KEYS.
 *    NDA carries `pyq_month` on all 900 rows (Apr = NDA 1, Sep = NDA 2) and its
 *    source filenames follow eight different conventions across 18 files. CDS
 *    is the mirror image: `pyq_month` is NULL on all 2,280 rows and the sitting
 *    lives only in a perfectly uniform `Eng_CDS_<year>_<sitting>.pdf`.
 *    So NDA must sort on the month and CDS on the filename — and applying
 *    either rule to the other exam breaks it.
 *
 * 2. SETS ARE ATOMIC.
 *    3,175 of the 3,180 questions belong to a shared-`context` set (a Directions
 *    block). In Reading Comprehension one passage feeds five-plus questions, so
 *    a question that drifts away from its set is stranded from the passage it
 *    depends on and is simply unanswerable. Contiguity is the invariant.
 */
import { describe, it, expect } from "vitest";
import {
  sittingOrdinal,
  sittingLabel,
  buildChapterSections,
  buildStoredSections,
  type BookQuestionMeta,
  type BookSectionDef,
  type SetMeta,
  type StoredPlacement,
  type SubtopicGroupDef,
} from "../src/lib/books/order";

/**
 * Sections are per-BOOK now rather than hardcoded, so the suite supplies the
 * pair this book uses. The wrappers keep every case below reading as it did.
 */
const SECTIONS: BookSectionDef[] = [
  { key: "nda", title: "NDA PYQ", exam: "NDA" },
  { key: "cds", title: "CDS PYQ", exam: "CDS" },
];

const build = (metas: BookQuestionMeta[], groups?: SubtopicGroupDef[]) =>
  buildChapterSections(metas, SECTIONS, groups);

const buildStored = (
  ordered: StoredPlacement[],
  metaById: Map<string, SetMeta>,
  groups?: SubtopicGroupDef[]
) => buildStoredSections(ordered, metaById, SECTIONS, groups);

/** Terse builder so a case shows only the fields it is actually about. */
function q(over: Partial<BookQuestionMeta> & { id: string }): BookQuestionMeta {
  return {
    exam: "NDA",
    setId: null,
    sourceRow: 1,
    pyqYear: 2020,
    pyqMonth: "Apr",
    sourceFile: null,
    ...over,
  };
}

describe("sittingOrdinal", () => {
  it("reads NDA's sitting from the month (Apr = NDA 1, Sep = NDA 2)", () => {
    expect(sittingOrdinal(q({ id: "a", exam: "NDA", pyqMonth: "Apr" }))).toBe(1);
    expect(sittingOrdinal(q({ id: "b", exam: "NDA", pyqMonth: "Sep" }))).toBe(2);
  });

  it("reads CDS's sitting from the filename, since CDS has no month at all", () => {
    const base = { exam: "CDS" as const, pyqMonth: null };
    expect(sittingOrdinal(q({ id: "a", ...base, sourceFile: "Eng_CDS_2017_1.pdf" }))).toBe(1);
    expect(sittingOrdinal(q({ id: "b", ...base, sourceFile: "Eng_CDS_2025_2.pdf" }))).toBe(2);
  });

  // The load-bearing pair. These are the REAL 2019 filenames, and they are the
  // reason NDA cannot be sorted by filename: alphabetically "GAT_NDA2_2019"
  // sorts BEFORE "NDA1_2019", so a filename sort silently puts the second
  // sitting first. The month is the only field that gets this year right.
  it("ignores NDA's filename, which contradicts the real order in 2019", () => {
    const nda2 = q({
      id: "nda2",
      exam: "NDA",
      pyqMonth: "Sep",
      sourceFile: "GAT_NDA2_2019_PYQ.xlsx",
    });
    const nda1 = q({
      id: "nda1",
      exam: "NDA",
      pyqMonth: "Apr",
      sourceFile: "NDA1_2019_GAT_PYQ.xlsx",
    });
    expect(sittingOrdinal(nda2)).toBe(2);
    expect(sittingOrdinal(nda1)).toBe(1);
    // Sanity: the filenames really do sort the wrong way round, so this test
    // would pass trivially if the implementation used them.
    expect(nda2.sourceFile! < nda1.sourceFile!).toBe(true);
  });

  it("returns null rather than guessing when the sitting is unreadable", () => {
    expect(sittingOrdinal(q({ id: "a", exam: "NDA", pyqMonth: null }))).toBeNull();
    expect(sittingOrdinal(q({ id: "b", exam: "NDA", pyqMonth: "Jan" }))).toBeNull();
    expect(sittingOrdinal(q({ id: "c", exam: "CDS", pyqMonth: null, sourceFile: null }))).toBeNull();
    expect(
      sittingOrdinal(q({ id: "d", exam: "CDS", pyqMonth: null, sourceFile: "Eng_CDS_2017.pdf" }))
    ).toBeNull();
  });
});

describe("sittingLabel", () => {
  it("names an NDA sitting the way the papers are known", () => {
    expect(sittingLabel("NDA", 2019, 1)).toBe("NDA 1 · 2019");
    expect(sittingLabel("NDA", 2019, 2)).toBe("NDA 2 · 2019");
  });

  it("names a CDS sitting with its roman edition", () => {
    expect(sittingLabel("CDS", 2019, 1)).toBe("CDS 2019 (I)");
    expect(sittingLabel("CDS", 2019, 2)).toBe("CDS 2019 (II)");
  });

  it("degrades to the year alone rather than inventing a sitting", () => {
    expect(sittingLabel("NDA", 2019, null)).toBe("NDA 2019");
    expect(sittingLabel("CDS", null, null)).toBe("CDS");
  });
});

describe("buildChapterSections", () => {
  it("always returns both sections, in the fixed NDA-then-CDS order", () => {
    const sections = build([q({ id: "a", exam: "CDS", sourceFile: "Eng_CDS_2020_1.pdf", pyqMonth: null })]);
    expect(sections.map((s) => s.key)).toEqual(["nda", "cds"]);
    expect(sections.map((s) => s.title)).toEqual(["NDA PYQ", "CDS PYQ"]);
  });

  // An empty section must RENDER as zero, not vanish. A missing heading reads
  // as "this chapter has no NDA half"; a heading over a zero reads as "we
  // looked and there are none" — the same absence-vs-zero distinction the
  // errata report makes.
  it("keeps an empty section present with a zero count", () => {
    const sections = build([
      q({ id: "a", exam: "CDS", pyqMonth: null, sourceFile: "Eng_CDS_2020_1.pdf" }),
    ]);
    expect(sections[0].questionCount).toBe(0);
    expect(sections[0].sets).toEqual([]);
    expect(sections[1].questionCount).toBe(1);
  });

  it("never files a question into the other exam's section", () => {
    const sections = build([
      q({ id: "n1", exam: "NDA" }),
      q({ id: "c1", exam: "CDS", pyqMonth: null, sourceFile: "Eng_CDS_2020_1.pdf" }),
      q({ id: "n2", exam: "NDA" }),
    ]);
    expect(sections[0].sets.flatMap((s) => s.questionIds).sort()).toEqual(["n1", "n2"]);
    expect(sections[1].sets.flatMap((s) => s.questionIds)).toEqual(["c1"]);
  });

  it("orders a half oldest-first, and by sitting within a year", () => {
    const sections = build([
      q({ id: "2020sep", pyqYear: 2020, pyqMonth: "Sep" }),
      q({ id: "2019apr", pyqYear: 2019, pyqMonth: "Apr" }),
      q({ id: "2020apr", pyqYear: 2020, pyqMonth: "Apr" }),
      q({ id: "2019sep", pyqYear: 2019, pyqMonth: "Sep" }),
    ]);
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual([
      "2019apr",
      "2019sep",
      "2020apr",
      "2020sep",
    ]);
  });

  it("keeps a set's questions contiguous and in paper order", () => {
    // Two interleaved sets from one paper, deliberately supplied shuffled.
    const sections = build([
      q({ id: "b2", setId: "B", sourceRow: 21 }),
      q({ id: "a2", setId: "A", sourceRow: 11 }),
      q({ id: "b1", setId: "B", sourceRow: 20 }),
      q({ id: "a3", setId: "A", sourceRow: 12 }),
      q({ id: "a1", setId: "A", sourceRow: 10 }),
    ]);
    const ids = sections[0].sets.flatMap((s) => s.questionIds);
    expect(ids).toEqual(["a1", "a2", "a3", "b1", "b2"]);
    expect(sections[0].sets.map((s) => s.setId)).toEqual(["A", "B"]);
  });

  it("places a set by its earliest question, not its last", () => {
    // Set EARLY starts at row 5 but ends at row 40; set LATE spans 10-12 and
    // must still come second. Ordering on the max row would invert these.
    const sections = build([
      q({ id: "late1", setId: "LATE", sourceRow: 10 }),
      q({ id: "late2", setId: "LATE", sourceRow: 12 }),
      q({ id: "early1", setId: "EARLY", sourceRow: 5 }),
      q({ id: "early2", setId: "EARLY", sourceRow: 40 }),
    ]);
    expect(sections[0].sets.map((s) => s.setId)).toEqual(["EARLY", "LATE"]);
  });

  it("does not merge same-named sets from different papers", () => {
    // set_id is unique per paper in the bank, but the grouping key must not
    // assume that: two papers' sets must never be welded into one passage.
    const sections = build([
      q({ id: "y1", setId: "S", pyqYear: 2019, sourceRow: 3 }),
      q({ id: "y2", setId: "S", pyqYear: 2020, sourceRow: 3 }),
    ]);
    expect(sections[0].sets).toHaveLength(2);
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual(["y1", "y2"]);
  });

  it("carries standalone questions through as their own single-question sets", () => {
    const sections = build([
      q({ id: "solo1", setId: null, sourceRow: 7 }),
      q({ id: "solo2", setId: null, sourceRow: 2 }),
    ]);
    expect(sections[0].sets).toHaveLength(2);
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual(["solo2", "solo1"]);
    expect(sections[0].sets.every((s) => s.setId === null)).toBe(true);
  });

  it("gives every set a key that is unique within the chapter", () => {
    const sections = build([
      q({ id: "n", exam: "NDA", setId: "S", sourceRow: 1 }),
      q({ id: "c", exam: "CDS", setId: "S", pyqMonth: null, sourceFile: "Eng_CDS_2020_1.pdf", sourceRow: 1 }),
      q({ id: "s1", setId: null, sourceRow: 2 }),
      q({ id: "s2", setId: null, sourceRow: 3 }),
    ]);
    const keys = sections.flatMap((s) => s.sets.map((set) => set.key));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("counts questions, not sets", () => {
    const sections = build([
      q({ id: "a", setId: "S", sourceRow: 1 }),
      q({ id: "b", setId: "S", sourceRow: 2 }),
      q({ id: "c", setId: null, sourceRow: 3 }),
    ]);
    expect(sections[0].questionCount).toBe(3);
    expect(sections[0].sets).toHaveLength(2);
  });

  it("sorts rows with no year last rather than dropping them", () => {
    const sections = build([
      q({ id: "noyear", pyqYear: null, pyqMonth: null, sourceRow: 1 }),
      q({ id: "yes", pyqYear: 2017, sourceRow: 2 }),
    ]);
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual(["yes", "noyear"]);
    expect(sections[0].questionCount).toBe(2);
  });

  it("is a pure function of its input order", () => {
    const rows = [
      q({ id: "a", setId: "S", sourceRow: 2, pyqYear: 2018 }),
      q({ id: "b", setId: "S", sourceRow: 1, pyqYear: 2018 }),
      q({ id: "c", setId: null, sourceRow: 9, pyqYear: 2017 }),
    ];
    const forward = build(rows);
    const reversed = build([...rows].reverse());
    expect(JSON.stringify(reversed)).toEqual(JSON.stringify(forward));
  });
});

/**
 * Layout A: a section regrouped into subtopic blocks.
 *
 * A block is a HEADING in the printed book, and the contents table quotes its
 * question range, so a set filed under the wrong block is a printed claim that
 * is untrue — with every question still present, so no count can catch it.
 *
 * `members` exists because a subtopic split is not always a task split. CDS
 * Grammar prints one instruction, "fill the blank with the appropriate word",
 * over ten questions whose answers happen to be prepositions, connectors and
 * determiners; we tag those as three subtopics, and all 18 of the chapter's
 * mixed sets mix ONLY those three. Declaring them as one block's members makes
 * every set pure again, without splitting a set or re-tagging the bank.
 */
describe("subtopic blocks", () => {
  const sub = (id: string, subtopic: string, year: number, setId: string) =>
    q({ id, setId, subtopic, pyqYear: year, sourceRow: 1 });

  const PREP = "Preposition Usage";
  const DISC = "Discourse Markers and Connectors";
  const ART = "Articles, Determiners and Quantifiers";

  it("groups sets into the declared blocks, in the declared order", () => {
    const [nda] = build(
      [sub("a", "Antonyms", 2017, "S1"), sub("b", "Synonyms", 2018, "S2")],
      [{ name: "Synonyms" }, { name: "Antonyms" }]
    );
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Synonyms", "Antonyms"]);
    expect(nda.blocks?.map((b) => b.questionCount)).toEqual([1, 1]);
  });

  it("APPENDS a subtopic the registry forgot rather than dropping its questions", () => {
    const [nda] = build(
      [sub("a", "Synonyms", 2017, "S1"), sub("b", "Idioms", 2018, "S2")],
      [{ name: "Synonyms" }]
    );
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Synonyms", "Idioms"]);
    expect(nda.questionCount).toBe(2);
  });

  it("omits a declared block that has no questions", () => {
    const [nda] = build([sub("a", "Synonyms", 2017, "S1")], [
      { name: "Synonyms" },
      { name: "Antonyms" },
    ]);
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Synonyms"]);
  });

  it("files a question with no subtopic under Other instead of losing it", () => {
    const [nda] = build([q({ id: "a", setId: "S1", sourceRow: 1 })], [{ name: "Synonyms" }]);
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Other"]);
    expect(nda.questionCount).toBe(1);
  });

  it("carries an authored directions line onto its block", () => {
    const [nda] = build(
      [sub("a", "Synonyms", 2017, "S1")],
      [{ name: "Synonyms", directions: "Pick the nearest in meaning." }]
    );
    expect(nda.blocks?.[0].directions).toBe("Pick the nearest in meaning.");
  });

  it("merges every named member into ONE block under the block's own name", () => {
    const [nda] = build(
      [
        sub("a", PREP, 2017, "S1"),
        sub("b", DISC, 2018, "S2"),
        sub("c", ART, 2019, "S3"),
        sub("d", "Parts of Speech", 2020, "S4"),
      ],
      [
        { name: "Prepositions, Determiners and Connectors", members: [PREP, DISC, ART] },
        { name: "Parts of Speech" },
      ]
    );
    expect(nda.blocks?.map((b) => b.name)).toEqual([
      "Prepositions, Determiners and Connectors",
      "Parts of Speech",
    ]);
    expect(nda.blocks?.[0].questionCount).toBe(3);
  });

  /**
   * THE ONE THAT MATTERS. A merged block must keep the section's chronological
   * order, not read all of one member then all of the next — the halves are
   * printed oldest-first and a member-major order would silently shuffle them.
   */
  it("keeps a merged block in the section's own order, not member by member", () => {
    const [nda] = build(
      [
        sub("y2017", PREP, 2017, "S1"),
        sub("y2018", DISC, 2018, "S2"),
        sub("y2019", PREP, 2019, "S3"),
      ],
      [{ name: "Merged", members: [PREP, DISC] }]
    );
    expect(nda.blocks?.[0].sets.flatMap((s) => s.questionIds)).toEqual([
      "y2017",
      "y2018",
      "y2019",
    ]);
  });

  it("does not ALSO append a member as its own block", () => {
    const [nda] = build(
      [sub("a", PREP, 2017, "S1"), sub("b", DISC, 2018, "S2")],
      [{ name: "Merged", members: [PREP, DISC] }]
    );
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Merged"]);
    expect(nda.questionCount).toBe(2);
  });

  it("still renders a merged block when only some members have questions", () => {
    const [nda] = build([sub("a", PREP, 2017, "S1")], [
      { name: "Merged", members: [PREP, DISC, ART] },
    ]);
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Merged"]);
    expect(nda.blocks?.[0].questionCount).toBe(1);
  });

  it("accounts for every question exactly once across the blocks", () => {
    const metas = [
      sub("a", PREP, 2017, "S1"),
      sub("b", DISC, 2018, "S2"),
      sub("c", "Parts of Speech", 2019, "S3"),
      sub("d", "Unlisted", 2020, "S4"),
    ];
    const [nda] = build(metas, [
      { name: "Merged", members: [PREP, DISC] },
      { name: "Parts of Speech" },
    ]);
    const inBlocks = nda.blocks!.flatMap((b) => b.sets.flatMap((s) => s.questionIds));
    expect(inBlocks.sort()).toEqual(["a", "b", "c", "d"]);
    expect(new Set(inBlocks).size).toBe(4);
  });

  it("applies members to the STORED order too, not just the derived one", () => {
    // The reader runs off `book_questions`, so a rule that held only in
    // `buildChapterSections` would be invisible in the shipped book.
    const [nda] = buildStored(
      [
        { questionId: "a", sectionKey: "nda" },
        { questionId: "b", sectionKey: "nda" },
      ],
      new Map([
        ["a", { setId: "S1", year: 2017, sitting: 1, subtopic: PREP }],
        ["b", { setId: "S2", year: 2018, sitting: 1, subtopic: DISC }],
      ]),
      [{ name: "Merged", members: [PREP, DISC] }]
    );
    expect(nda.blocks?.map((b) => b.name)).toEqual(["Merged"]);
    expect(nda.blocks?.[0].questionCount).toBe(2);
  });
});

/**
 * Once a book is assembled, ORDER comes from `book_questions`, not from the
 * bank — that is the whole point of materialising it. But sets still have to be
 * rebuilt for rendering, because a passage must print once above the questions
 * that share it. So consecutive stored rows carrying the same `set_id` are
 * regrouped, and a reorder that splits a set apart is HONOURED rather than
 * silently re-welded: the reader shows what the book actually says.
 */
describe("buildStoredSections", () => {
  const meta = new Map([
    ["a", { setId: "S", year: 2019, sitting: 1 }],
    ["b", { setId: "S", year: 2019, sitting: 1 }],
    ["c", { setId: null, year: 2020, sitting: 2 }],
    ["d", { setId: "T", year: 2021, sitting: 1 }],
  ]);

  it("keeps both sections in NDA-then-CDS order regardless of input order", () => {
    const sections = buildStored(
      [
        { questionId: "c", sectionKey: "cds" },
        { questionId: "a", sectionKey: "nda" },
      ],
      meta
    );
    expect(sections.map((s) => s.key)).toEqual(["nda", "cds"]);
    expect(sections.map((s) => s.title)).toEqual(["NDA PYQ", "CDS PYQ"]);
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual(["a"]);
    expect(sections[1].sets.flatMap((s) => s.questionIds)).toEqual(["c"]);
  });

  it("preserves the stored order exactly, even against the bank's order", () => {
    const sections = buildStored(
      [
        { questionId: "d", sectionKey: "nda" },
        { questionId: "c", sectionKey: "nda" },
        { questionId: "a", sectionKey: "nda" },
      ],
      meta
    );
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual(["d", "c", "a"]);
  });

  it("groups CONSECUTIVE same-set rows into one set", () => {
    const sections = buildStored(
      [
        { questionId: "a", sectionKey: "nda" },
        { questionId: "b", sectionKey: "nda" },
        { questionId: "c", sectionKey: "nda" },
      ],
      meta
    );
    expect(sections[0].sets.map((s) => s.questionIds)).toEqual([["a", "b"], ["c"]]);
    expect(sections[0].sets[0].label).toBe("NDA 1 · 2019");
  });

  // A reorder that separates set siblings is a real, visible state — the book
  // says so. Re-welding them would hide the split from the person reviewing it.
  it("does not re-weld a set that a reorder split apart", () => {
    const sections = buildStored(
      [
        { questionId: "a", sectionKey: "nda" },
        { questionId: "c", sectionKey: "nda" },
        { questionId: "b", sectionKey: "nda" },
      ],
      meta
    );
    expect(sections[0].sets.map((s) => s.questionIds)).toEqual([["a"], ["c"], ["b"]]);
    expect(sections[0].questionCount).toBe(3);
  });

  it("gives every set a key unique within the chapter", () => {
    const sections = buildStored(
      [
        { questionId: "a", sectionKey: "nda" },
        { questionId: "c", sectionKey: "nda" },
        { questionId: "b", sectionKey: "cds" },
      ],
      meta
    );
    const keys = sections.flatMap((s) => s.sets.map((set) => set.key));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("skips a row with no metadata rather than rendering a blank", () => {
    const sections = buildStored(
      [
        { questionId: "a", sectionKey: "nda" },
        { questionId: "ghost", sectionKey: "nda" },
      ],
      meta
    );
    expect(sections[0].questionCount).toBe(1);
    expect(sections[0].sets.flatMap((s) => s.questionIds)).toEqual(["a"]);
  });
});

/**
 * MHT-CET is the first exam whose sitting is readable from NEITHER rule.
 *
 * `pyq_month` collapses its 45 source-file labels into 6 buckets — 17 share
 * (2023, "May") and 12 share (2024, "May") — and is ACTIVELY WRONG on one label
 * (`MHT_CET_2025_PCM.xlsx` is stamped May and is a second upload of an April
 * paper). The filename carries the date but in at least eight conventions, one
 * of them a typo, so no regex reads them all. Hence a third rule: a registry.
 */
describe("sittingOrdinal + sittingLabel for MHT-CET (registry rule)", () => {
  const cet = (sourceFile: string, pyqYear: number) =>
    q({ id: "x", exam: "MHT-CET", pyqYear, pyqMonth: "May", sourceFile });

  it("reads the sitting from the registry, not the month 17 papers share", () => {
    const may16 = sittingOrdinal(cet("MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx", 2023));
    const may09 = sittingOrdinal(cet("MHT_CET_9thMay2023_Shift1_QuestionBank.xlsx", 2023));
    expect(may16).not.toBeNull();
    expect(may09).not.toBeNull();
    expect(may16).not.toBe(may09);
  });

  it("orders sittings chronologically, so 16 May comes after 9 May", () => {
    expect(sittingOrdinal(cet("MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx", 2023))!)
      .toBeGreaterThan(
        sittingOrdinal(cet("MHT_CET_9thMay2023_Shift1_QuestionBank.xlsx", 2023))!
      );
  });

  /**
   * THE LOAD-BEARING CASE. Three papers were uploaded twice under different
   * labels. If the two labels read as two sittings, the book both mis-orders
   * them and — because the recurrence badge counts distinct sittings — claims
   * 90 questions were "asked twice" when they were asked once.
   */
  it("resolves a duplicate-upload label to the SAME sitting as the paper it duplicates", () => {
    const primary = sittingOrdinal(cet("MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx", 2023));
    const duplicate = sittingOrdinal(cet("MHT_CET_2023_Analysis.xlsx", 2023));
    // Asserted NOT-null first, or this passes trivially while no rule exists at
    // all and both sides read null — the failure it is here to catch.
    expect(primary).not.toBeNull();
    expect(duplicate).toBe(primary);

    const p24 = sittingOrdinal(cet("MHT_CET_12thMay2024_Shift2_QuestionBank.xlsx", 2024));
    const d24 = sittingOrdinal(cet("MHT_CET_13thMay2024_Shift1_QuestionBank.xlsx", 2024));
    expect(p24).not.toBeNull();
    expect(d24).toBe(p24);
  });

  it("returns null rather than guessing when the registry has never seen the file", () => {
    // Paired with a KNOWN file, so this cannot pass by the rule being absent.
    expect(sittingOrdinal(cet("MHT_CET_2021_Question_Bank.xlsx", 2021))).not.toBeNull();
    expect(sittingOrdinal(cet("MHT_CET_99thMay2099_Shift9.xlsx", 2099))).toBeNull();
  });

  it("names a sitting by its date, without repeating the exam on every line", () => {
    const meta = cet("MHT_CET_16thMay2023_Shift2_QuestionBank.xlsx", 2023);
    expect(sittingLabel("MHT-CET", 2023, sittingOrdinal(meta))).toBe("2023 · 16 May Shift 2");
  });

  it("degrades to the bare year where no date is established", () => {
    const meta = cet("MHT_CET_2021_Question_Bank.xlsx", 2021);
    expect(sittingLabel("MHT-CET", 2021, sittingOrdinal(meta))).toBe("2021");
  });
});
