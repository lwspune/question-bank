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
