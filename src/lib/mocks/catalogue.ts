/**
 * The TYPE axis of the /mock catalogue: past papers · practice mocks ·
 * sectional tests.
 *
 * WHY THIS EXISTS. /mock/exam/[slug] used to be one flat, year-grouped list of
 * everything an exam had. That worked while every mock was the same kind of
 * thing — a real sitting served whole — and breaks twice the moment it is not:
 *
 *  1. It becomes a wall. NDA is 36 cards under 10 year headings today; the
 *     assembled papers already sitting in `papers` would take it past 60. That
 *     is exactly the wall the 2026-08-29 picker rewrite removed one level up,
 *     recurring one level down.
 *  2. Year is the SECTION HEADING, and an assembled paper has no sitting. The
 *     page would have to print a year it does not have.
 *
 * So an exam's mocks are navigated by TYPE first, and each type gets its own
 * static route with its own grouping rule.
 *
 * TYPE IS DERIVED FROM TWO COLUMNS, NOT ONE (migration 0088). `source` says
 * where the questions came from and `scope` says how much of the exam is
 * covered, and they vary independently — a sectional test can be built from
 * real PYQs or from assembled ones. Navigation follows `scope` first because
 * that is the axis that decides whether a student needs three hours or thirty
 * minutes; `source` is shown as a badge where the two mix.
 *
 * Pure — no DB, no React. Unit-tested in tests/mock-catalogue.test.ts.
 */

import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { getBlueprint } from "./blueprints";
import type { MockListItem, MockScope, MockSource } from "./query";

export type MockTypeSlug = "past-papers" | "practice" | "sectional";

export type MockTypeDef = {
  slug: MockTypeSlug;
  /** Card title + list-page heading, e.g. "Past papers". */
  label: string;
  /** Short qualifier printed above the label on the picker card. */
  tagline: string;
  /** What this type IS — the picker card body and the list page's subtitle. */
  blurb: string;
};

/**
 * The three navigable types, in the order a student meets them.
 *
 * Past papers lead because fidelity is the product's whole premise; sectional
 * is last because it is the smallest commitment, not because it matters least.
 * Copy is deliberately QUALITATIVE — every number on the picker is derived from
 * the rows the page already fetched, so nothing here can go stale.
 */
export const MOCK_TYPES: readonly MockTypeDef[] = [
  {
    slug: "past-papers",
    label: "Past papers",
    tagline: "The real thing",
    blurb:
      "The actual papers, served whole — the exact questions of each sitting in their printed order, on the official marking scheme.",
  },
  {
    slug: "practice",
    label: "Practice mocks",
    tagline: "Full length",
    blurb:
      "Full-length papers built from the question bank to the exam's own blueprint. Same shape, same marking, questions you have not sat before.",
  },
  {
    slug: "sectional",
    label: "Sectional tests",
    tagline: "By topic",
    blurb:
      "Shorter timed drills on a single chapter or section — for when you want to test one thing rather than a whole paper.",
  },
];

/** One declared type by slug; null for anything not declared. */
export function parseMockType(slug: string): MockTypeDef | null {
  return MOCK_TYPES.find((t) => t.slug === slug) ?? null;
}

/**
 * The type a mock belongs to.
 *
 * SCOPE WINS over source: a sectional test is a sectional test whichever bank
 * its questions came from. Filing a PYQ-sourced sectional drill under "Past
 * papers" would put a 25-question chapter test in a list of three-hour papers,
 * which is the one thing the navigation exists to prevent.
 */
export function mockTypeOf(m: {
  source: MockSource;
  scope: MockScope;
}): MockTypeSlug {
  if (m.scope === "sectional") return "sectional";
  return m.source === "practice" ? "practice" : "past-papers";
}

/** The subset of `mocks` belonging to one type. */
export function mocksOfType(
  mocks: MockListItem[],
  type: MockTypeSlug
): MockListItem[] {
  return mocks.filter((m) => mockTypeOf(m) === type);
}

/** The route for one exam's list of one type. */
export function mockTypeHref(examSlug: string, type: MockTypeSlug): string {
  return `/mock/exam/${examSlug}/${type}`;
}

export type MockTypeCard = MockTypeDef & {
  /** How many of this type this exam has published. 0 renders "Coming soon". */
  count: number;
  /**
   * Oldest / newest SITTING, both 0 when this type has none. Read only off
   * past papers: no other type has a sitting, so folding their years into a
   * span would advertise sittings that never happened.
   */
  firstYear: number;
  lastYear: number;
  /** Distinct papers involved — NDA 2 (Maths + GAT), CDS/NEET 1. */
  paperCount: number;
};

/** One card per type for the exam page's picker, in MOCK_TYPES order. */
export function buildMockTypeCards(mocks: MockListItem[]): MockTypeCard[] {
  return MOCK_TYPES.map((t) => {
    const mine = mocksOfType(mocks, t.slug);
    // Only a past paper has a sitting — see MockTypeCard.firstYear.
    const years =
      t.slug === "past-papers"
        ? mine
            .map((m) => m.pyqYear)
            .filter((y): y is number => typeof y === "number")
        : [];
    return {
      ...t,
      count: mine.length,
      firstYear: years.length ? Math.min(...years) : 0,
      lastYear: years.length ? Math.max(...years) : 0,
      paperCount: new Set(mine.map((m) => m.paperCode)).size,
    };
  });
}

/** A labelled block of cards on a type's list page. */
export type MockGroup = {
  /** Stable React key — unique within the returned list. */
  key: string;
  label: string;
  items: MockListItem[];
};

/**
 * Order two undated mocks.
 *
 * Slug, compared NUMERICALLY. An assembled paper has no sitting to sort by, and
 * `updated_at` is the wrong proxy — it moves on every rebuild, so re-running
 * the builder would reshuffle the list under a student mid-course. A numeric
 * compare also means the build script need not remember to zero-pad: "…-2"
 * still sorts before "…-10".
 */
function bySlugNatural(a: MockListItem, b: MockListItem): number {
  return a.slug.localeCompare(b.slug, undefined, { numeric: true });
}

/** The blueprint's human paper label, or the raw code when none is registered. */
function paperLabel(m: MockListItem): string {
  const exam = EXAM_REGISTRY.find((e) => e.examName === m.examName);
  const bp = exam ? getBlueprint(exam.slug, m.paperCode) : null;
  return bp?.paperLabel ?? m.paperCode;
}

/** Collect into insertion-ordered groups keyed by `key(item)`. */
function collect(
  items: MockListItem[],
  key: (m: MockListItem) => string,
  label: (m: MockListItem) => string
): MockGroup[] {
  const out = new Map<string, MockGroup>();
  for (const m of items) {
    const k = key(m);
    const g = out.get(k) ?? { key: k, label: label(m), items: [] };
    g.items.push(m);
    out.set(k, g);
  }
  return [...out.values()];
}

/**
 * Group one type's mocks for display. The grouping key is per-type because the
 * types have genuinely different structure — only past papers have a year.
 *
 * Every rule is total: no input row is dropped, whatever shape it is in. A mock
 * missing the field its group is keyed on is surfaced under an explicit label
 * ("Undated", "Other") rather than hidden, because such a row is a DEFECT and
 * the catalogue is where it becomes visible.
 */
export function groupMocksForType(
  type: MockTypeSlug,
  mocks: MockListItem[]
): MockGroup[] {
  if (mocks.length === 0) return [];

  if (type === "past-papers") {
    const groups = collect(
      mocks,
      (m) => (typeof m.pyqYear === "number" ? String(m.pyqYear) : "undated"),
      (m) => (typeof m.pyqYear === "number" ? String(m.pyqYear) : "Undated")
    );
    // Newest sitting first; an undated row (a DB CHECK makes it impossible)
    // sorts last so it reads as the anomaly it is rather than leading the page.
    return groups.sort((a, b) => {
      if (a.key === "undated") return 1;
      if (b.key === "undated") return -1;
      return Number(b.key) - Number(a.key);
    });
  }

  if (type === "practice") {
    const groups = collect(mocks, (m) => m.paperCode, paperLabel);
    // By LABEL, not code: "Paper I — Mathematics" before "Paper II — …", where
    // the codes would put "gat" before "maths" and invert the printed order.
    groups.sort((a, b) => a.label.localeCompare(b.label));
    for (const g of groups) g.items.sort(bySlugNatural);
    return groups;
  }

  // Sectional — grouped by the drill's own section, which is the only subject
  // signal a mock row carries.
  const groups = collect(
    mocks,
    (m) => m.sections[0]?.label ?? "other",
    (m) => m.sections[0]?.label ?? "Other"
  );
  groups.sort((a, b) => a.label.localeCompare(b.label));
  for (const g of groups) g.items.sort(bySlugNatural);
  return groups;
}

/**
 * The one-sentence "what this is" line on a mock's instructions page.
 *
 * EVERY type gets one, including a past paper. Labelling only the practice
 * mocks would make the ABSENCE of a note mean "this is the real thing" — a
 * claim carried by omission, on the one screen someone reaches from a shared
 * link with no route context to tell them otherwise. Stating it in all four
 * cases costs one line and removes the inference.
 *
 * Derived like markingCopy(), not typed per mock, so it cannot drift from what
 * the row actually is.
 */
export function mockKindNote(m: {
  source: MockSource;
  scope: MockScope;
  examName: string;
  totalQuestions: number;
}): string {
  if (m.scope === "sectional") {
    const from =
      m.source === "pyq"
        ? `${m.totalQuestions} past-paper questions`
        : `${m.totalQuestions} questions from the question bank`;
    return `A sectional test: ${from} on one part of the ${m.examName} syllabus — not a full paper.`;
  }
  if (m.source === "practice") {
    return `A full-length practice paper built to the ${m.examName} blueprint — the real pattern, timing and marking, but it is not a past paper.`;
  }
  return `The real ${m.examName} paper, served whole — the same questions in the same order, on the official marking scheme.`;
}
