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
import { EXAM_REGISTRY, type Board, type ExamEntry } from "@/lib/exam/examContext";

export type ExamFamilyMember<T> = {
  /**
   * Sort position WITHIN the family. A board family uses the class number, so
   * the order is the one a student reads off a school ladder. A non-board
   * family has no such number, so it uses the member's position in the
   * registry — see rule 3 in `groupExamFamilies`.
   */
  order: number;
  /** `familyLabel`/`classLabel` from the registry, else the derived `Class <std>`. */
  label: string;
  item: T;
};

export type ExamFamilyNode<T> =
  | { kind: "flat"; item: T; entry: ExamEntry | null }
  | {
      kind: "family";
      /**
       * The grouping key: a `Board` name for a board family, or the registry's
       * `family` string ("IPMAT") for a non-board one. Deliberately `string`
       * and NOT `Board` — IPMAT Indore / Rohtak / Jammu are siblings that are
       * neither a board nor a class, and overloading `board` to carry them
       * would make the type lie about every non-board family that follows.
       */
      key: string;
      label: string;
      /**
       * The noun for the control that chooses between `members` — "Class" for a
       * board family, the registry's `familyAxis` otherwise. Rendered as that
       * control's label, so a wrong value here is a lying control.
       */
      memberAxis: string;
      members: ExamFamilyMember<T>[];
    };

/** Resolves one of a caller's rows to its registry entry, or null if unknown. */
export type ExamResolver<T> = (item: T) => ExamEntry | null;

/**
 * The family an entry belongs to, or null when it is not in one.
 *
 * Reads BOTH declarations rather than trusting one: `board`+`std` (a school
 * ladder) and `family`+`familyLabel` (anything else). An entry declaring
 * neither, or a half-declared one, falls through to a flat node — it must not
 * crash or produce a family keyed on undefined.
 */
function familyOf(
  entry: ExamEntry | null
): { key: string; label: string; memberAxis: string } | null {
  if (!entry) return null;
  if (entry.family)
    return {
      key: entry.family,
      label: entry.family,
      // "Exam" rather than throwing: a family that forgot to declare its axis
      // should render a generic-but-true label, not break the picker.
      memberAxis: entry.familyAxis ?? "Exam",
    };
  if (entry.board && entry.std)
    return { key: entry.board, label: entry.board, memberAxis: "Class" };
  return null;
}

/** The label a member carries inside its family. Derived unless overridden. */
export function classLabelFor(entry: ExamEntry): string {
  return entry.familyLabel ?? entry.classLabel ?? `Class ${entry.std}`;
}

/**
 * A family's value in a <Select>, namespaced so it can never be mistaken for an
 * exam UUID (which is what the same control's other options carry) nor for the
 * "__ALL__" sentinel.
 *
 * The prefix is `family:` rather than the original `board:` now that a family
 * need not be a board. Safe to rename because this value is never persisted
 * and never enters a URL: FilterBar computes it at render and maps it straight
 * to an `examId` on change.
 */
export function familyKey(key: Board | string): string {
  return `family:${key}`;
}

export function isFamilyKey(value: string | null | undefined): boolean {
  return typeof value === "string" && value.startsWith("family:");
}

export function boardFromFamilyKey(value: string): string {
  return value.slice("family:".length);
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
 * 3. POSITION IS THE FIRST MEMBER'S; MEMBERS SORT BY `order`. Each surface
 *    keeps whatever top-level order it has today (the dropdown DB-alphabetical,
 *    cards and pills in registry order) with the family sitting where its first
 *    member sat — so the only ordering that actually changes is within a
 *    family, which is the defect being fixed.
 *
 *    `order` is the CLASS NUMBER for a board family. A non-board family has no
 *    class number, so it uses the member's index in EXAM_REGISTRY: the registry
 *    is the one place that declares a deliberate sibling order, and taking it
 *    from the caller's array instead would let two surfaces that pass the same
 *    exams in different orders disagree about the family's internal order.
 */
export function groupExamFamilies<T>(
  items: readonly T[],
  resolve: ExamResolver<T>
): ExamFamilyNode<T>[] {
  const membersByKey = new Map<string, ExamFamilyMember<T>[]>();
  const entryOf = new Map<T, ExamEntry | null>();
  const familyByItem = new Map<
    T,
    { key: string; label: string; memberAxis: string } | null
  >();
  const registryIndex = new Map<string, number>(
    EXAM_REGISTRY.map((e, i) => [e.slug, i])
  );

  for (const item of items) {
    const entry = resolve(item);
    entryOf.set(item, entry);
    const family = familyOf(entry);
    familyByItem.set(item, family);
    if (!family || !entry) continue;
    const bucket = membersByKey.get(family.key) ?? [];
    bucket.push({
      order: entry.std ?? registryIndex.get(entry.slug) ?? Number.MAX_SAFE_INTEGER,
      label: classLabelFor(entry),
      item,
    });
    membersByKey.set(family.key, bucket);
  }

  // Rule 2 — a key that ended up with one member is not a family.
  for (const [key, members] of membersByKey) {
    if (members.length < 2) membersByKey.delete(key);
  }

  const nodes: ExamFamilyNode<T>[] = [];
  const emitted = new Set<string>();

  for (const item of items) {
    const entry = entryOf.get(item) ?? null;
    const family = familyByItem.get(item) ?? null;
    if (family && membersByKey.has(family.key)) {
      // Rule 3 — the family takes the position of its first member; later
      // members are absorbed rather than emitted again.
      if (emitted.has(family.key)) continue;
      emitted.add(family.key);
      const members = [...membersByKey.get(family.key)!].sort((a, b) => a.order - b.order);
      nodes.push({
        kind: "family",
        key: family.key,
        label: family.label,
        memberAxis: family.memberAxis,
        members,
      });
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
  return valueOf(node.members[0].item);
}

/**
 * Sum a family's members for a card or pill headline.
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
  return node.members.reduce((sum, c) => sum + countOf(c.item), 0);
}

export type FamilySelection = {
  /** Value for the top-level control: a family key, an exam value, or null. */
  topValue: string | null;
  /** Value for the member control; null when the selection is not in a family. */
  classValue: string | null;
  /** Options for the member control; empty when there is no family selected. */
  members: { order: number; label: string; value: string }[];
  /** Noun for the member control ("Class"); null when no family is selected. */
  memberAxis: string | null;
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
  const none: FamilySelection = {
    topValue: null,
    classValue: null,
    members: [],
    memberAxis: null,
  };
  if (!selectedValue) return none;

  for (const node of nodes) {
    if (node.kind === "flat") {
      if (valueOf(node.item) === selectedValue) {
        return {
          topValue: selectedValue,
          classValue: null,
          members: [],
          memberAxis: null,
        };
      }
      continue;
    }
    const members = node.members.map((c) => ({
      order: c.order,
      label: c.label,
      value: valueOf(c.item),
    }));
    if (members.some((c) => c.value === selectedValue)) {
      return {
        topValue: familyKey(node.key),
        classValue: selectedValue,
        members,
        memberAxis: node.memberAxis,
      };
    }
  }

  return none;
}

/** The member options for a family key, for rendering the second control. */
export function classesForFamilyKey<T>(
  nodes: readonly ExamFamilyNode<T>[],
  key: string | null,
  valueOf: (item: T) => string
): { order: number; label: string; value: string }[] {
  if (!key || !isFamilyKey(key)) return [];
  const wanted = boardFromFamilyKey(key);
  const node = nodes.find((n) => n.kind === "family" && n.key === wanted);
  if (!node || node.kind !== "family") return [];
  return node.members.map((c) => ({
    order: c.order,
    label: c.label,
    value: valueOf(c.item),
  }));
}
