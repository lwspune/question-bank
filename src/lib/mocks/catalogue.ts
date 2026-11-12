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
      "Each paper exactly as it was set, marked the way the exam marks it.",
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

/**
 * The route for one exam's "Download past papers" page (2026-10-07): its past
 * papers, each downloadable whole as a PDF paper and answer key.
 */
export function mockDownloadHref(examSlug: string): string {
  return `/mock/exam/${examSlug}/download`;
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

/**
 * Types with tests render as cards; empty ones as one sentence under them.
 * Clarity (2026-10-01) showed a visitor tapping both faded "Coming soon" cards
 * on /mock/exam/cds, which are not links. An empty shelf stays visible (the
 * page's rule: never omit it silently) without looking like something to tap.
 */
export function splitMockTypeCards(cards: MockTypeCard[]): {
  open: MockTypeCard[];
  comingSoon: MockTypeCard[];
} {
  return {
    open: cards.filter((c) => c.count > 0),
    comingSoon: cards.filter((c) => c.count === 0),
  };
}

/** "Practice mocks and sectional tests are coming soon for CDS." Null if none. */
export function comingSoonLine(comingSoon: MockTypeCard[], examName: string): string | null {
  if (comingSoon.length === 0) return null;
  const names = comingSoon.map((c, i) => (i === 0 ? c.label : c.label.toLowerCase()));
  const list =
    names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  return `${list} are coming soon for ${examName}.`;
}

/**
 * The /mock/exam/<slug> subtitle, built from the types the exam HAS. It used to
 * promise "full past papers, plus practice papers" on every exam, including the
 * board exams with chapter tests alone, two lines above "Past papers and
 * practice mocks are coming soon" (2026-11-07).
 *
 * One short line since 2026-11-10 (owner): the list of types it carried after
 * the colon repeated the tabs right below it and ran four lines on a phone. It
 * still names no type an exam lacks, because it names no type at all.
 */
export function mockHubSubtitle(
  examName: string,
  openTypes: readonly MockTypeSlug[],
  boardExam: boolean
): string {
  const has = (t: MockTypeSlug) => openTypes.includes(t);
  if (!has("past-papers") && !has("practice")) {
    const sectional = boardExam ? "chapter tests" : "sectional tests";
    return `Timed ${examName} ${sectional}, marked for you.`;
  }
  return `Sit ${examName} papers online, timed and marked for you.`;
}

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

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

const ROMAN: Readonly<Record<string, number>> = { I: 1, II: 2, III: 3, IV: 4 };

/**
 * Where a past paper's title prints its sitting, as a number that grows with
 * the sitting: the day and month ("17 April", "5 Apr", "20 Sep 2025"), the
 * shift ("Shift II", "Shift 2") and a sitting numeral ("CDS (II) 2026"). 0 when
 * the title names none, so such papers keep their order. Titles are the only
 * place MHT-CET, JEE and SSC record a sitting finer than its year.
 */
export function sittingRankFromTitle(title: string): number {
  const date = title.match(/\b(\d{1,2})\s+([A-Za-z]{3})[a-z]*\b/);
  const month = date ? monthRank(date[2]) : 0;
  const day = month > 0 && date ? Number(date[1]) : 0;
  const shift = title.match(/\bShift\s+(IV|I{1,3}|\d)\b/);
  const shiftN = shift ? ROMAN[shift[1]] ?? Number(shift[1]) : 0;
  const sitting = title.match(/\((IV|I{1,3})\)/);
  const sittingN = sitting ? ROMAN[sitting[1]] : 0;
  return ((month * 100 + day) * 10 + shiftN) * 10 + sittingN;
}

/** The number a paper label prints ("GS Paper I" -> 1, "CSAT Paper II" -> 2); unnumbered labels sort after. */
function paperNumber(label: string): number {
  const m = label.match(/\bPaper\s+(IV|I{1,3}|\d)\b/);
  return m ? ROMAN[m[1]] ?? Number(m[1]) : 99;
}

/** Printed paper labels in paper order: by their number, then alphabetically. */
export function comparePaperLabels(a: string, b: string): number {
  return paperNumber(a) - paperNumber(b) || a.localeCompare(b);
}

/** 1-12 for a month name or abbreviation ("Sep", "September"), 0 when unknown. */
export function monthRank(month: string | null | undefined): number {
  return month ? MONTHS.indexOf(month.slice(0, 3).toLowerCase()) + 1 : 0;
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
    // Within a year, the later sitting first where the month is recorded (NDA
    // sits in Apr and Sep). An unknown month ranks as 0 alongside them.
    // Then by the sitting the title prints, newest first (MHT-CET, JEE and SSC
    // record no month), then by the printed paper label, so Paper I comes before
    // Paper II within a sitting (2026-11-10: the live NDA page printed 2024 (I)
    // GAT before Maths, and the MHT-CET list put 13 May between April shifts).
    for (const g of groups)
      g.items.sort(
        (a, b) =>
          monthRank(b.pyqMonth) - monthRank(a.pyqMonth) ||
          sittingRankFromTitle(b.title) - sittingRankFromTitle(a.title) ||
          comparePaperLabels(paperLabel(a), paperLabel(b))
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

export type SubjectFilterOption = { key: string; label: string; count: number };

/**
 * The subject buttons above a sectional list: one per group, in the list's own
 * order, with its test count.
 *
 * Empty when there is one subject or none, because a filter with a single
 * choice filters nothing. The page draws no filter at all then.
 */
export function subjectFilterOptions(groups: MockGroup[]): SubjectFilterOption[] {
  if (groups.length < 2) return [];
  return groups.map((g) => ({ key: g.key, label: g.label, count: g.items.length }));
}

/**
 * The subject to start on, from what this device remembered.
 *
 * There is no "All" choice (owner, 2026-10-18): the list always shows one
 * subject. Nothing stored, or a subject no longer on the list (renamed, or its
 * tests withdrawn), starts on the first one, so a stale memory can never open
 * the page on an empty list. Null only when there is nothing to pick.
 */
export function pickStoredSubject(
  stored: string | null,
  options: SubjectFilterOption[]
): string | null {
  if (stored !== null && options.some((o) => o.key === stored)) return stored;
  return options[0]?.key ?? null;
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
    return `A sectional test: ${from} on one part of the ${m.examName} syllabus, not a full paper.`;
  }
  if (m.source === "practice") {
    return `A full-length practice paper built to the ${m.examName} blueprint: the real pattern, timing and marking, but it is not a past paper.`;
  }
  return `The real ${m.examName} paper, served whole: the same questions in the same order, on the official marking scheme.`;
}
