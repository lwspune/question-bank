/**
 * Pure ordering core for the books surface. No I/O.
 *
 * A chapter is laid out as an ordered list of SECTIONS — for the NDA/CDS
 * English master that is "NDA PYQ" then "CDS PYQ" — and, where a chapter opts
 * in, each section is further grouped by SUBTOPIC.
 *
 * NOTHING HERE IS BOOK-SPECIFIC. Sections are supplied by the caller from the
 * registry, and a sitting rule is a property of the EXAM rather than of a book,
 * so a second book that includes NDA inherits NDA's rule without restating it.
 * The first version of this file hardcoded `[nda, cds]` and a `"NDA" | "CDS"`
 * union, which book #2 could not have used.
 *
 * TWO MEASURED FACTS DRIVE THE REST — see tests/books-order.test.ts.
 *
 * EXAMS NEED DIFFERENT SORT KEYS. NDA carries `pyq_month` on all 900 English
 * PYQ rows (Apr = NDA 1, Sep = NDA 2) while its 18 source filenames follow
 * eight different conventions. CDS is the mirror: `pyq_month` is NULL on all
 * 2,280 and the sitting is legible only from a uniform
 * `Eng_CDS_<year>_<sitting>.pdf`. Applying either rule to the other exam
 * mis-orders it SILENTLY; in NDA 2019 a filename sort actively inverts the two
 * sittings, because `GAT_NDA2_2019...` sorts before `NDA1_2019...`.
 *
 * SETS ARE ATOMIC. 3,175 of the 3,180 questions sit in a shared-`context` set;
 * in Reading Comprehension one passage feeds five or more questions. So the
 * unit of ordering is the SET — a question separated from its set is separated
 * from the passage it needs, and nothing downstream would notice.
 */

/** A section of a chapter, declared by the book. `key` is stored in `book_questions.section_key`. */
export type BookSectionDef = {
  key: string;
  /** Heading printed above the half, e.g. "NDA PYQ". */
  title: string;
  /** Matched against `exams.name`. */
  exam: string;
};

/**
 * How to read which sitting of its year a question came from — a property of
 * the EXAM, so every book drawing on that exam gets the same answer.
 */
export type SittingRule =
  | { from: "month"; map: Record<string, number>; label: "numbered" }
  | { from: "sourceFile"; label: "roman" }
  | { from: "none" };

/**
 * `Eng_CDS_2017_1.pdf` -> 1. The four-digit year group is load-bearing, not
 * decoration: without it `Eng_CDS_2017.pdf` matches on its YEAR and reports
 * sitting 2017.
 */
const SOURCE_FILE_SITTING_RE = /_(\d{4})_(\d{1,2})\.pdf$/i;

/**
 * Both the short and long month spellings are accepted: the English bank stores
 * "Apr"/"Sep" today, but other exams in this bank store "April", and a future
 * ingest using the long form should not silently lose its sitting.
 */
export const EXAM_SITTING: Record<string, SittingRule> = {
  NDA: {
    from: "month",
    map: { apr: 1, april: 1, sep: 2, sept: 2, september: 2 },
    label: "numbered",
  },
  CDS: { from: "sourceFile", label: "roman" },
};

/** An exam with no declared rule has no readable sitting — stated, not guessed. */
const NO_SITTING: SittingRule = { from: "none" };

export function sittingRuleFor(exam: string): SittingRule {
  return EXAM_SITTING[exam] ?? NO_SITTING;
}

/** The ordering fields — deliberately narrow, so this stays testable without a DB. */
export type BookQuestionMeta = {
  id: string;
  exam: string;
  /** Shared-passage / shared-Directions group. Null = a standalone question. */
  setId: string | null;
  /** Position in the source paper. NDA rows start at 2 (Excel header), CDS at 1. */
  sourceRow: number | null;
  pyqYear: number | null;
  pyqMonth: string | null;
  sourceFile: string | null;
  /** Conceptual subtopic, used only when a chapter opts into grouping. */
  subtopic?: string | null;
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

/**
 * A subtopic block inside a section (layout A). Only present when the chapter
 * declares `groupSubtopics`; otherwise a section holds its sets directly.
 */
export type BookSubtopicBlock = {
  name: string;
  /**
   * One authored Directions line covering every set in the block. Present only
   * where every set genuinely shares an instruction — Synonyms and Antonyms do;
   * Word Definition mixes Match-List with plain meaning items and does not, so
   * those blocks keep their per-set Directions.
   */
  directions?: string;
  sets: BookSet[];
  questionCount: number;
};

export type BookSection = {
  key: string;
  exam: string;
  title: string;
  /** Flat set list. Always populated, so a consumer can ignore grouping. */
  sets: BookSet[];
  /** Non-null only when the chapter opts into subtopic grouping. */
  blocks: BookSubtopicBlock[] | null;
  /** Questions, not sets — the number a reader expects to see. */
  questionCount: number;
};

/**
 * A chapter's opt-in subtopic grouping, declared by the registry.
 *
 * `members` lets ONE printed block cover SEVERAL bank subtopics, and `name` is
 * then the block's own heading rather than a subtopic. It exists because a
 * subtopic split is not always a task split: CDS Grammar prints one
 * instruction — "fill the blank with the appropriate word" — over ten questions
 * whose answers happen to be prepositions, connectors and determiners, which we
 * tag as three subtopics. All 18 of that chapter's mixed sets mix ONLY those
 * three, so declaring them one block's members makes every set pure without
 * splitting a set or re-tagging the bank.
 *
 * Omit it and the block covers the single subtopic its `name` matches.
 */
export type SubtopicGroupDef = {
  name: string;
  /** Bank subtopic names this block absorbs. Defaults to `[name]`. */
  members?: string[];
  directions?: string;
};

/** Sorts a missing value last instead of first, without dropping the row. */
const LAST = Number.MAX_SAFE_INTEGER;

/**
 * Which sitting of its year a question came from, or null when that genuinely
 * cannot be read. Null is a real answer — a guessed sitting would order the
 * book confidently and wrongly.
 */
export function sittingOrdinal(meta: BookQuestionMeta): number | null {
  const rule = sittingRuleFor(meta.exam);
  if (rule.from === "month") {
    const month = meta.pyqMonth?.trim().toLowerCase();
    if (!month) return null;
    return rule.map[month] ?? null;
  }
  if (rule.from === "sourceFile") {
    const match = meta.sourceFile?.match(SOURCE_FILE_SITTING_RE);
    if (!match) return null;
    const sitting = Number(match[2]);
    return Number.isFinite(sitting) && sitting > 0 ? sitting : null;
  }
  return null;
}

const ROMAN = ["", "I", "II", "III", "IV"];

/**
 * How a sitting is named in the provenance line. The two styles exist because
 * the exams are spoken about differently — an NDA paper is "NDA 1 / NDA 2", a
 * CDS paper is "2019 (I) / 2019 (II)" — rather than imposing one house style.
 */
export function sittingLabel(
  exam: string,
  year: number | null,
  sitting: number | null
): string {
  const yearText = year == null ? "" : String(year);
  const rule = sittingRuleFor(exam);

  if (rule.from === "month" && rule.label === "numbered") {
    if (sitting == null) return yearText ? `${exam} ${yearText}` : exam;
    return yearText ? `${exam} ${sitting} · ${yearText}` : `${exam} ${sitting}`;
  }
  if (rule.from === "sourceFile" && rule.label === "roman") {
    const edition = sitting != null && ROMAN[sitting] ? ` (${ROMAN[sitting]})` : "";
    return yearText ? `${exam} ${yearText}${edition}` : `${exam}${edition}`;
  }
  return yearText ? `${exam} ${yearText}` : exam;
}

/**
 * The grouping key for a set.
 *
 * `set_id` is unique per paper in the bank today, but this must not depend on
 * that: welding two papers' sets together would put one paper's questions under
 * another paper's passage. So the paper is part of the key.
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
  subtopic: string | null;
  /** The set's position in its paper — its EARLIEST question, never its last. */
  anchorRow: number;
  rows: { id: string; sourceRow: number }[];
};

function toSet(group: Group, exam: string): BookSet {
  return {
    setId: group.setId,
    key: group.key,
    questionIds: group.rows
      .sort((a, b) => a.sourceRow - b.sourceRow || a.id.localeCompare(b.id))
      .map((r) => r.id),
    year: group.year,
    sitting: group.sitting,
    label: sittingLabel(exam, group.year, group.sitting),
  };
}

/**
 * Split a section's sets into subtopic blocks, in the order the chapter
 * declares.
 *
 * A subtopic present in the data but MISSING from the declared list is appended
 * rather than dropped — forgetting to list one must never silently remove
 * questions from the book. A set takes the subtopic of its first question;
 * that is safe only for chapters that opt in, which are exactly the ones
 * measured to have no set spanning a BLOCK.
 *
 * A block spans several subtopics when it declares `members`, and that is what
 * lets a chapter opt in whose bank subtopics interleave: Grammar's three
 * fill-a-blank subtopics mix inside 18 CDS sets and nowhere else, so merging
 * them makes every set pure. The measurement is therefore against blocks, not
 * raw subtopics — see scripts/books/subtopic-report.ts.
 */
function toBlocks(
  sets: BookSet[],
  subtopicOfSet: Map<string, string>,
  declared: SubtopicGroupDef[]
): BookSubtopicBlock[] {
  const nameOf = (set: BookSet) => subtopicOfSet.get(set.key) ?? "Other";
  const count = (found: BookSet[]) =>
    found.reduce((n, s) => n + s.questionIds.length, 0);

  const blocks: BookSubtopicBlock[] = [];
  const taken = new Set<string>();

  for (const def of declared) {
    const members = def.members ?? [def.name];
    const covered = new Set(members);
    // FILTERED from the ordered list, never concatenated per member: the half
    // prints oldest-first, and gathering all of one member then all of the next
    // would silently reorder a merged block's questions out of chronology.
    const found = sets.filter((set) => covered.has(nameOf(set)));
    if (found.length === 0) continue;
    // Every member is taken, including any with no sets of its own, so a
    // member can never also surface as its own appended block below.
    for (const member of members) taken.add(member);
    blocks.push({
      name: def.name,
      directions: def.directions,
      sets: found,
      questionCount: count(found),
    });
  }

  // Anything the registry did not declare is APPENDED rather than dropped —
  // forgetting to list a subtopic must never silently remove questions.
  const rest = new Map<string, BookSet[]>();
  for (const set of sets) {
    const name = nameOf(set);
    if (taken.has(name)) continue;
    const list = rest.get(name) ?? [];
    list.push(set);
    rest.set(name, list);
  }
  for (const [name, found] of Array.from(rest.entries()).sort((a, b) =>
    a[0].localeCompare(b[0])
  )) {
    blocks.push({ name, sets: found, questionCount: count(found) });
  }
  return blocks;
}

/**
 * Group a chapter's questions into the book's sections, from the BANK's order.
 *
 * Ordering within a section: year ascending, then sitting, then the set's
 * earliest question, then paper order inside the set. The comparator is TOTAL —
 * every tie falls through to the group key — so output depends only on the
 * content of the input, never the order it arrived in.
 */
export function buildChapterSections(
  metas: BookQuestionMeta[],
  sections: BookSectionDef[],
  groupSubtopics?: SubtopicGroupDef[]
): BookSection[] {
  return sections.map(({ key, exam, title }) => {
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
          subtopic: meta.subtopic ?? null,
          anchorRow: row,
          rows: [{ id: meta.id, sourceRow: row }],
        });
      }
    }

    const ordered = Array.from(groups.values()).sort(
      (a, b) =>
        (a.year ?? LAST) - (b.year ?? LAST) ||
        (a.sitting ?? LAST) - (b.sitting ?? LAST) ||
        a.anchorRow - b.anchorRow ||
        a.key.localeCompare(b.key)
    );

    const sets = ordered.map((g) => toSet(g, exam));
    const subtopicOfSet = new Map(
      ordered.map((g) => [g.key, g.subtopic ?? "Other"] as const)
    );

    return {
      key,
      exam,
      title,
      sets,
      blocks: groupSubtopics ? toBlocks(sets, subtopicOfSet, groupSubtopics) : null,
      questionCount: sets.reduce((n, s) => n + s.questionIds.length, 0),
    };
  });
}

/** A question's placement, as `book_questions` records it. */
export type StoredPlacement = {
  questionId: string;
  sectionKey: string;
};

/** The ordering facts a stored row needs but does not itself carry. */
export type SetMeta = {
  setId: string | null;
  year: number | null;
  sitting: number | null;
  subtopic?: string | null;
};

/**
 * Rebuild the sections from the STORED order.
 *
 * Once a book is assembled, `book_questions` is the source of truth for what is
 * in it and in what order. Sets are still reconstructed for rendering, because
 * a passage prints once above the questions that share it.
 *
 * Grouping is on CONSECUTIVE rows carrying the same `set_id`, never on the set
 * id alone: if a reorder separates two siblings, the book genuinely says they
 * are apart, and re-welding them would hide that from the person reviewing it.
 *
 * A row whose question has no metadata is SKIPPED rather than rendered blank —
 * that only happens when a question left the book's scope between two reads,
 * and half a question on screen is worse than none.
 */
export function buildStoredSections(
  ordered: StoredPlacement[],
  metaById: Map<string, SetMeta>,
  sections: BookSectionDef[],
  groupSubtopics?: SubtopicGroupDef[]
): BookSection[] {
  return sections.map(({ key, exam, title }) => {
    const sets: BookSet[] = [];
    const subtopicOfSet = new Map<string, string>();
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

      const setKey = `${key}|${meta.setId ?? "solo"}|${row.questionId}`;
      current = {
        setId: meta.setId,
        key: setKey,
        questionIds: [row.questionId],
        year: meta.year,
        sitting: meta.sitting,
        label: sittingLabel(exam, meta.year, meta.sitting),
      };
      currentSetId = meta.setId;
      subtopicOfSet.set(setKey, meta.subtopic ?? "Other");
      sets.push(current);
    }

    return {
      key,
      exam,
      title,
      sets,
      blocks: groupSubtopics ? toBlocks(sets, subtopicOfSet, groupSubtopics) : null,
      questionCount: sets.reduce((n, s) => n + s.questionIds.length, 0),
    };
  });
}
