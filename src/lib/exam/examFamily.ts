/**
 * Grouping the exam pickers by board family — the pure core shared by all four
 * surfaces that list exams (the /browse filter, the profile chips on
 * /welcome + /account, the homepage cards, the /browse landing pills).
 *
 * WHY: the bank carries 13 exams and 6 of them are (board, class) pairs — CBSE
 * 11/12 and Maharashtra 9/10/11/12. Listed flat they are two-thirds of the
 * picker, and they do not even sort together: the /browse list is
 * DB-alphabetical on exam NAME, which reads
 *   "…Class 10, …Class 11, …Class 9"   (9 last)
 * and files "Maharashtra HSC Class 12" under M-a-h-a-r-a-s-h-t-r-a-**H**, in a
 * separate run from its three "…State Board…" siblings. Grouping on the
 * registry's `board` field fixes both, and is why grouping cannot be done by
 * name prefix.
 *
 * WHAT THIS IS NOT: a family is a PRESENTATION grouping, never a filter value.
 * `Filters.examId` stays a single UUID, `?examId=` is unchanged, and every
 * surface still links to exactly the destination it linked to before. The
 * reason is structural rather than conservatism — the taxonomy BELOW exam is
 * per-exam, so "Mathematics" is four distinct subject rows across the four
 * Maharashtra exams and two across CBSE. A board with no class selected has no
 * coherent subject list, so a class must always be resolved.
 *
 * Generic over the item type: each caller passes its own rows plus a resolver,
 * so the ordering and degeneracy rules are tested once (tests/exam-family)
 * instead of being re-implemented per surface.
 */
import type { Board, ExamEntry, Std } from "@/lib/exam/examContext";

export type ExamFamilyClass<T> = {
  std: Std;
  /** `classLabel` from the registry, else the derived `Class <std>`. */
  label: string;
  item: T;
};

export type ExamFamilyNode<T> =
  | { kind: "flat"; item: T; entry: ExamEntry | null }
  | { kind: "family"; board: Board; label: string; classes: ExamFamilyClass<T>[] };

/** Resolves one of a caller's rows to its registry entry, or null if unknown. */
export type ExamResolver<T> = (item: T) => ExamEntry | null;

/** The label a class carries inside its family. Derived unless overridden. */
export function classLabelFor(entry: ExamEntry): string {
  return entry.classLabel ?? `Class ${entry.std}`;
}

/**
 * A family's value in a <Select>, namespaced so it can never be mistaken for an
 * exam UUID (which is what the same control's other options carry) nor for the
 * "__ALL__" sentinel.
 */
export function familyKey(board: Board | string): string {
  return `board:${board}`;
}

export function isFamilyKey(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("board:");
}

export function boardFromFamilyKey(value: string): string {
  return value.slice("board:".length);
}

/**
 * Group a caller's exam list into flat entries + board families.
 *
 * Three rules, each spec'd:
 *
 * 1. FAIL OPEN. An item whose resolver returns null — an exam in the DB that
 *    nobody has added to EXAM_REGISTRY yet — stays a flat top-level entry.
 *    Driving the list off the registry instead would make a newly-ingested
 *    exam silently VANISH from every picker until someone edits TypeScript.
 *    Same polarity as needsBuild's allowlist-of-skips: the unknown case must
 *    degrade to the safe, visible behaviour.
 *
 * 2. A FAMILY OF ONE DEGRADES TO FLAT. A one-option Class dropdown is noise,
 *    and this is reachable today rather than hypothetical: the landing pills
 *    drop any exam with zero questions in the default view, so a family can
 *    arrive here having lost every sibling but one.
 *
 * 3. POSITION IS THE FIRST MEMBER'S; CLASSES SORT NUMERICALLY. Each surface
 *    keeps whatever top-level order it has today (the dropdown DB-alphabetical,
 *    cards and pills in registry order) with the family sitting where its first
 *    member sat — so the only ordering that actually changes is within a
 *    family, which is the defect being fixed.
 */
export function groupExamFamilies<T>(
  items: readonly T[],
  resolve: ExamResolver<T>
): ExamFamilyNode<T>[] {
  const membersByBoard = new Map<Board, ExamFamilyClass<T>[]>();
  const entryOf = new Map<T, ExamEntry | null>();

  for (const item of items) {
    const entry = resolve(item);
    entryOf.set(item, entry);
    // `board` and `std` are declared together or not at all (asserted in
    // tests/exam-context), but this reads both rather than trusting one: a
    // half-declared entry must fall through to flat, not crash or produce a
    // family keyed on undefined.
    if (!entry?.board || !entry.std) continue;
    const bucket = membersByBoard.get(entry.board) ?? [];
    bucket.push({ std: entry.std, label: classLabelFor(entry), item });
    membersByBoard.set(entry.board, bucket);
  }

  // Rule 2 — a board that ended up with one member is not a family.
  for (const [board, members] of membersByBoard) {
    if (members.length < 2) membersByBoard.delete(board);
  }

  const nodes: ExamFamilyNode<T>[] = [];
  const emitted = new Set<Board>();

  for (const item of items) {
    const entry = entryOf.get(item) ?? null;
    const board = entry?.board;
    if (board && membersByBoard.has(board)) {
      // Rule 3 — the family takes the position of its first member; later
      // members are absorbed rather than emitted again.
      if (emitted.has(board)) continue;
      emitted.add(board);
      const classes = [...membersByBoard.get(board)!].sort((a, b) => a.std - b.std);
      nodes.push({ kind: "family", board, label: board, classes });
      continue;
    }
    nodes.push({ kind: "flat", item, entry });
  }

  return nodes;
}

/**
 * The value a family commits when it is picked: its LOWEST class.
 *
 * Selecting "CBSE" has to land on a concrete exam. There is no
 * board-with-no-class state the bank can express (see the module note), and
 * leaving the selection empty would show the whole bank under a trigger reading
 * "CBSE" — the same lying-control failure `shouldShowFormatFilter` exists to
 * prevent. Committing a real, immediately-changeable narrowing is the honest
 * option of the two.
 */
export function familyDefaultValue<T>(
  node: Extract<ExamFamilyNode<T>, { kind: "family" }>,
  valueOf: (item: T) => string
): string {
  return valueOf(node.classes[0].item);
}

/**
 * Sum a family's classes for a card or pill headline.
 *
 * `countOf` is a parameter rather than a fixed field ON PURPOSE — the two
 * surfaces that show a count do NOT count the same thing, and conflating them
 * is a mistake this codebase has already made once. The homepage cards use
 * total PUBLIC (pyq + practice); the /browse landing pills use the DEFAULT-VIEW
 * count, because they link to `?examId=…`, which opens on PYQ only. Hard-wiring
 * either would advertise a number the destination then contradicts — NDA once
 * read 8,259 on a pill that landed on 4,860.
 */
export function familyTotal<T>(
  node: Extract<ExamFamilyNode<T>, { kind: "family" }>,
  countOf: (item: T) => number
): number {
  return node.classes.reduce((sum, c) => sum + countOf(c.item), 0);
}

export type FamilySelection = {
  /** Value for the top-level control: a family key, an exam value, or null. */
  topValue: string | null;
  /** Value for the Class control; null when the selection is not in a family. */
  classValue: string | null;
  /** Options for the Class control; empty when there is no family selected. */
  classes: { std: Std; label: string; value: string }[];
};

/**
 * Derive both controls' state from the ONE value the caller already has.
 *
 * This is what keeps the feature free of new state and a new URL param: the
 * family is a pure function of the selected exam, so a shared `?examId=` link
 * re-opens with the right family showing and nothing has to be remembered
 * across a navigation.
 *
 * An unknown value resolves to "nothing selected" rather than throwing — a
 * stale link to a withdrawn exam should render an unset picker, not a crash.
 */
export function resolveFamilySelection<T>(
  nodes: readonly ExamFamilyNode<T>[],
  selectedValue: string | null,
  valueOf: (item: T) => string
): FamilySelection {
  const none: FamilySelection = { topValue: null, classValue: null, classes: [] };
  if (!selectedValue) return none;

  for (const node of nodes) {
    if (node.kind === "flat") {
      if (valueOf(node.item) === selectedValue) {
        return { topValue: selectedValue, classValue: null, classes: [] };
      }
      continue;
    }
    const classes = node.classes.map((c) => ({
      std: c.std,
      label: c.label,
      value: valueOf(c.item),
    }));
    if (classes.some((c) => c.value === selectedValue)) {
      return {
        topValue: familyKey(node.board),
        classValue: selectedValue,
        classes,
      };
    }
  }

  return none;
}

/** The class options for a family key, for rendering the Class control. */
export function classesForFamilyKey<T>(
  nodes: readonly ExamFamilyNode<T>[],
  key: string | null,
  valueOf: (item: T) => string
): { std: Std; label: string; value: string }[] {
  if (!key || !isFamilyKey(key)) return [];
  const board = boardFromFamilyKey(key);
  const node = nodes.find((n) => n.kind === "family" && n.board === board);
  if (!node || node.kind !== "family") return [];
  return node.classes.map((c) => ({
    std: c.std,
    label: c.label,
    value: valueOf(c.item),
  }));
}
