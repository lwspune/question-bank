/**
 * Pure ordering core for the NDA/CDS English PYQ master book.
 *
 * A chapter of the book reads: "NDA PYQ" -> every NDA question for that
 * chapter, oldest first, then "CDS PYQ" -> every CDS question, oldest first.
 * This module turns a flat bag of question metadata into exactly that shape.
 * It does no I/O; the caller supplies the rows and renders the result.
 *
 * Two properties of the bank drive every decision here — see
 * tests/books-order.test.ts, which pins both.
 *
 * THE TWO EXAMS NEED OPPOSITE SORT KEYS. NDA carries `pyq_month` on all 900
 * English PYQ rows (Apr = NDA 1, Sep = NDA 2) while its 18 source filenames
 * follow eight different conventions — `GAT_2017_NDA1_QuestionBank.xlsx`,
 * `GAT_NDA2_2017_PYQ.xlsx`, `NDA1_2019_GAT_PYQ.xlsx`, `NDA_II_2024_GAT_...`.
 * CDS is the exact mirror: `pyq_month` is NULL on all 2,280 rows and the
 * sitting is legible only from a uniform `Eng_CDS_<year>_<sitting>.pdf`.
 * Applying either exam's rule to the other silently mis-orders it; in NDA 2019
 * a filename sort actively inverts the two sittings, because
 * "GAT_NDA2_2019..." sorts before "NDA1_2019...".
 *
 * SETS ARE ATOMIC. 3,175 of the 3,180 questions sit in a shared-`context` set
 * (a Directions block); in Reading Comprehension one passage feeds five or more
 * questions. So the unit of ordering is the SET, never the question — a
 * question separated from its set is separated from the passage it needs, and
 * nothing downstream would notice, because every question is still present.
 */

/** The two exams this book draws from. */
export type BookExam = "NDA" | "CDS";

/** The ordering fields — deliberately narrow, so this stays testable without a DB. */
export type BookQuestionMeta = {
  id: string;
  exam: BookExam;
  /** Shared-passage / shared-Directions group. Null = a standalone question. */
  setId: string | null;
  /** Position in the source paper. NDA rows start at 2 (Excel header), CDS at 1. */
  sourceRow: number | null;
  pyqYear: number | null;
  /** "Apr" | "Sep" for NDA; always null for CDS. */
  pyqMonth: string | null;
  /** `Eng_CDS_<year>_<sitting>.pdf` for CDS; an inconsistent .xlsx name for NDA. */
  sourceFile: string | null;
};

/** One passage/Directions group, rendered as a unit. */
export type BookSet = {
  setId: string | null;
  /** Stable, content-derived React key. Unique within a chapter. */
  key: string;
  questionIds: string[];
  year: number | null;
  sitting: number | null;
  /** Provenance shown above the group, e.g. "NDA 1 · 2019" or "CDS 2019 (II)". */
  label: string;
};

export type BookSectionKey = "nda" | "cds";

export type BookSection = {
  key: BookSectionKey;
  exam: BookExam;
  /** The heading printed above the half. */
  title: string;
  sets: BookSet[];
  /** Questions, not sets — the number a reader expects to see. */
  questionCount: number;
};

/**
 * The chapter layout, fixed. Both sections are ALWAYS returned, in this order,
 * even when one is empty: a heading over a zero says "we looked and there are
 * none", whereas a missing heading says "this chapter has no such half". Those
 * are different claims and only one of them is ours to make.
 */
const SECTIONS: { key: BookSectionKey; exam: BookExam; title: string }[] = [
  { key: "nda", exam: "NDA", title: "NDA PYQ" },
  { key: "cds", exam: "CDS", title: "CDS PYQ" },
];

/**
 * NDA's two annual sittings, by the month stamped on the row. Both the short
 * and long spellings are accepted: the English bank stores "Apr"/"Sep" today,
 * but other exams in this bank store "April", and a future ingest using the
 * long form should not silently lose its sitting.
 */
const NDA_SITTING_BY_MONTH: Record<string, number> = {
  apr: 1,
  april: 1,
  sep: 2,
  sept: 2,
  september: 2,
};

/**
 * `Eng_CDS_2017_1.pdf` -> 1. The four-digit year group is load-bearing, not
 * decoration: without it `Eng_CDS_2017.pdf` would match on its YEAR and report
 * sitting 2017.
 */
const CDS_SITTING_RE = /_(\d{4})_(\d{1,2})\.pdf$/i;

/** Sorts a missing value last instead of first, without dropping the row. */
const LAST = Number.MAX_SAFE_INTEGER;

/**
 * Which sitting of its year a question came from, or null when that genuinely
 * cannot be read. Null is a real answer here — a guessed sitting would order
 * the book confidently and wrongly.
 */
export function sittingOrdinal(meta: BookQuestionMeta): number | null {
  if (meta.exam === "NDA") {
    const month = meta.pyqMonth?.trim().toLowerCase();
    if (!month) return null;
    return NDA_SITTING_BY_MONTH[month] ?? null;
  }
  const match = meta.sourceFile?.match(CDS_SITTING_RE);
  if (!match) return null;
  const sitting = Number(match[2]);
  return Number.isFinite(sitting) && sitting > 0 ? sitting : null;
}

const ROMAN = ["", "I", "II", "III", "IV"];

/**
 * How a sitting is named in the book's provenance line. The two exams are
 * spoken about differently — an NDA paper is "NDA 1 / NDA 2", a CDS paper is
 * "2019 (I) / 2019 (II)" — so the label follows the exam rather than imposing
 * one house style on both.
 */
export function sittingLabel(
  exam: BookExam,
  year: number | null,
  sitting: number | null
): string {
  const yearText = year == null ? "" : String(year);
  if (exam === "NDA") {
    if (sitting == null) return yearText ? `NDA ${yearText}` : "NDA";
    return yearText ? `NDA ${sitting} · ${yearText}` : `NDA ${sitting}`;
  }
  const edition = sitting != null && ROMAN[sitting] ? ` (${ROMAN[sitting]})` : "";
  return yearText ? `CDS ${yearText}${edition}` : `CDS${edition}`;
}

/**
 * The grouping key for a set.
 *
 * `set_id` is unique per paper in the bank today, but this must not depend on
 * that: welding two papers' sets together would put one paper's questions under
 * another paper's passage. So the paper is part of the key — by filename where
 * there is one, else by the (year, sitting) that identifies it.
 */
function groupKey(meta: BookQuestionMeta, sitting: number | null): string {
  const paper = meta.sourceFile ?? `${meta.pyqYear ?? ""}-${sitting ?? ""}`;
  if (meta.setId == null) return `${meta.exam}|solo|${meta.id}`;
  return `${meta.exam}|${paper}|${meta.setId}`;
}

type Group = {
  key: string;
  setId: string | null;
  year: number | null;
  sitting: number | null;
  /** The set's position in its paper — its EARLIEST question, never its last. */
  anchorRow: number;
  rows: { id: string; sourceRow: number }[];
};

/**
 * Group a chapter's questions into the book's two halves.
 *
 * Ordering within a half: year ascending, then sitting, then the set's earliest
 * question, then paper order inside the set. The comparator is TOTAL — every
 * tie falls through to the group key — so the output depends only on the
 * content of the input, never on the order it arrived in.
 */
export function buildChapterSections(metas: BookQuestionMeta[]): BookSection[] {
  return SECTIONS.map(({ key, exam, title }) => {
    const groups = new Map<string, Group>();

    for (const meta of metas) {
      if (meta.exam !== exam) continue;
      const sitting = sittingOrdinal(meta);
      const gk = groupKey(meta, sitting);
      const row = meta.sourceRow ?? LAST;
      const existing = groups.get(gk);
      if (existing) {
        existing.rows.push({ id: meta.id, sourceRow: row });
        existing.anchorRow = Math.min(existing.anchorRow, row);
      } else {
        groups.set(gk, {
          key: gk,
          setId: meta.setId,
          year: meta.pyqYear,
          sitting,
          anchorRow: row,
          rows: [{ id: meta.id, sourceRow: row }],
        });
      }
    }

    const sets: BookSet[] = Array.from(groups.values())
      .sort(
        (a, b) =>
          (a.year ?? LAST) - (b.year ?? LAST) ||
          (a.sitting ?? LAST) - (b.sitting ?? LAST) ||
          a.anchorRow - b.anchorRow ||
          a.key.localeCompare(b.key)
      )
      .map((group) => ({
        setId: group.setId,
        key: group.key,
        questionIds: group.rows
          .sort((a, b) => a.sourceRow - b.sourceRow || a.id.localeCompare(b.id))
          .map((r) => r.id),
        year: group.year,
        sitting: group.sitting,
        label: sittingLabel(exam, group.year, group.sitting),
      }));

    return {
      key,
      exam,
      title,
      sets,
      questionCount: sets.reduce((n, s) => n + s.questionIds.length, 0),
    };
  });
}

/** A question's placement, as `book_questions` records it. */
export type StoredPlacement = {
  questionId: string;
  sectionKey: BookSectionKey;
};

/** The ordering facts a stored row needs but does not itself carry. */
export type SetMeta = {
  setId: string | null;
  year: number | null;
  sitting: number | null;
};

/**
 * Rebuild the two sections from the STORED order.
 *
 * Once a book is assembled, `book_questions` is the source of truth for what is
 * in it and in what order — that is the point of materialising it. But sets
 * still have to be reconstructed for rendering, because a passage prints once
 * above the questions that share it.
 *
 * Grouping is on CONSECUTIVE rows carrying the same `set_id`, never on the set
 * id alone. That difference is deliberate: if a reorder separates two siblings,
 * the book genuinely says they are apart, and re-welding them would hide that
 * from the person reviewing it. The reader shows what the book says.
 *
 * A row whose question has no metadata is SKIPPED rather than rendered blank —
 * that only happens when a question left the book's scope between the two
 * reads, and half a question on screen is worse than none.
 */
export function buildStoredSections(
  ordered: StoredPlacement[],
  metaById: Map<string, SetMeta>
): BookSection[] {
  return SECTIONS.map(({ key, exam, title }) => {
    const sets: BookSet[] = [];
    let current: BookSet | null = null;
    let currentSetId: string | null = null;

    for (const row of ordered) {
      if (row.sectionKey !== key) continue;
      const meta = metaById.get(row.questionId);
      if (!meta) continue;

      const continues =
        current !== null && meta.setId !== null && meta.setId === currentSetId;
      if (continues) {
        current!.questionIds.push(row.questionId);
        continue;
      }

      current = {
        setId: meta.setId,
        key: `${key}|${meta.setId ?? "solo"}|${row.questionId}`,
        questionIds: [row.questionId],
        year: meta.year,
        sitting: meta.sitting,
        label: sittingLabel(exam, meta.year, meta.sitting),
      };
      currentSetId = meta.setId;
      sets.push(current);
    }

    return {
      key,
      exam,
      title,
      sets,
      questionCount: sets.reduce((n, s) => n + s.questionIds.length, 0),
    };
  });
}
