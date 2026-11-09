/**
 * The exam carousel in the homepage's navy panel (2026-11-09).
 *
 * Pure, so the SERVER places every card: each card's offset from the front one
 * becomes CSS custom properties, and the page is complete before any
 * JavaScript runs (no layout shift, and crawlers see every exam link). The
 * client only moves which card is in front. Spec: tests/browse-showcase.test.ts.
 */
import type { ExamEntry, ExamGoal, ExamSlug } from "@/lib/exam/examContext";
import { classLabelFor, familyTotal, type ExamFamilyNode, type ExamResolver } from "@/lib/exam/examFamily";
import { landingHref, type ChapterLanding } from "@/lib/questions/landing";
import type { ExamCatalogItem } from "@/lib/exam/allExamStats";

// The position maths lives apart, with no imports, so the client carousel can
// load it without pulling in the registry or the chapter-list loader.
export { wrapOffset, slotStyle, type SlotStyle } from "./showcaseSlots";

/** One exam as the carousel needs it; the homepage builds these from its catalog. */
export type ShowcaseItem = {
  slug: string;
  displayName: string;
  /** Past-year questions, or practice for a practice-only exam. */
  questionCount: number;
  /** Which of the two `questionCount` is. */
  kind: "pyq" | "practice";
  /** The exam's own page. */
  href: string;
};

export type ExamFacts = {
  /** Biggest first, by the questions their chapters hold; at most `subjects`. */
  subjects: string[];
  /** The exam's biggest chapter, linked to its /questions landing page. */
  topChapter: { name: string; href: string; count: number } | null;
};

/**
 * What each exam's showcase card says about it, from the cached chapter list
 * (listChapterLandings, already paid for by /questions and the sitemap). An exam whose chapters hold no
 * questions is left out, so its card shows nothing rather than an empty line.
 * Ties break on name, as in pickStarterChapters, so a rebuild cannot reshuffle.
 */
export function examFactsFromLandings(
  landings: readonly ChapterLanding[],
  { subjects: maxSubjects = 4 }: { subjects?: number } = {}
): Record<string, ExamFacts> {
  const bySlug = new Map<string, { subjects: Map<string, number>; top: ChapterLanding | null }>();
  for (const l of landings) {
    if (l.questionCount <= 0) continue;
    const e = bySlug.get(l.examSlug) ?? { subjects: new Map(), top: null };
    e.subjects.set(l.subjectName, (e.subjects.get(l.subjectName) ?? 0) + l.questionCount);
    if (
      !e.top ||
      l.questionCount > e.top.questionCount ||
      (l.questionCount === e.top.questionCount && l.chapterName.localeCompare(e.top.chapterName) < 0)
    ) {
      e.top = l;
    }
    bySlug.set(l.examSlug, e);
  }
  const out: Record<string, ExamFacts> = {};
  for (const [slug, e] of bySlug) {
    out[slug] = {
      subjects: [...e.subjects.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, maxSubjects)
        .map(([name]) => name),
      topChapter: e.top
        ? { name: e.top.chapterName, href: landingHref(e.top), count: e.top.questionCount }
        : null,
    };
  }
  return out;
}


/**
 * The homepage catalog as carousel items. The count is past-year questions,
 * or practice for a practice-only exam (the same basis as each exam's own
 * bank view); an exam with none of that kind has nothing to show and is left
 * out. The link is the exam's own page, as on its "Choose your exam" card.
 */
export function showcaseItemsFromCatalog(exams: readonly ExamCatalogItem[]): ShowcaseItem[] {
  const items: ShowcaseItem[] = [];
  for (const e of exams) {
    const questionCount = e.practiceOnly ? e.counts.practice : e.counts.pyq;
    if (questionCount <= 0) continue;
    items.push({ slug: e.slug, displayName: e.displayName, questionCount, kind: e.practiceOnly ? "practice" : "pyq", href: e.href });
  }
  return items;
}

/** Cards in the ring. Nine fill both sides of the front card on a desktop. */
export const SHOWCASE_LIMIT = 9;
/** Member links a family card shows before "more". MPSC alone has nine papers. */
export const MEMBER_LIMIT = 4;
/**
 * A year with fewer questions than this is not shown as covered. JEE Mains
 * holds 9 real AIEEE / JEE Main questions from 2012 to 2020, reprinted in a
 * coaching module, but no paper from those years: "Past papers 2012 to 2026"
 * would claim papers the bank does not have. 20 keeps a genuine small year
 * (MHT-CET 2021 has 150) and drops scattered reprints.
 */
export const MIN_YEAR_QUESTIONS = 20;

export type YearBar = { year: number; count: number; /** 0 to 1, against the busiest year. */ height: number };
export type YearBars = {
  /** First and last year the exam has papers for (the bars may start later). */
  from: number;
  to: number;
  bars: YearBar[];
};
export type YearCountRow = { exam_id: string; pyq_year: number; questions: number };

function barsFromCounts(counts: Map<number, number>, maxBars: number): YearBars | null {
  if (counts.size === 0) return null;
  const years = [...counts.keys()];
  const from = Math.min(...years);
  const to = Math.max(...years);
  const shown: { year: number; count: number }[] = [];
  for (let y = Math.max(from, to - maxBars + 1); y <= to; y++) shown.push({ year: y, count: counts.get(y) ?? 0 });
  const peak = Math.max(...shown.map((b) => b.count), 1);
  return { from, to, bars: shown.map((b) => ({ ...b, height: Math.round((b.count / peak) * 1000) / 1000 })) };
}

/**
 * Per-exam "questions by year" bars from public_pyq_year_counts (0248): one
 * bar per year from the first to the last, a year with no paper at 0, the
 * latest `maxBars` years only. Years under MIN_YEAR_QUESTIONS are left out
 * before the range is taken. An exam id with no slug is ignored.
 */
export function yearBarsFrom(
  rows: readonly YearCountRow[],
  slugById: Readonly<Record<string, string>>,
  maxBars = 10
): Record<string, YearBars> {
  const bySlug = new Map<string, Map<number, number>>();
  for (const r of rows) {
    const slug = slugById[r.exam_id];
    if (!slug) continue;
    const m = bySlug.get(slug) ?? new Map<number, number>();
    m.set(r.pyq_year, (m.get(r.pyq_year) ?? 0) + r.questions);
    bySlug.set(slug, m);
  }
  const out: Record<string, YearBars> = {};
  for (const [slug, all] of bySlug) {
    const m = new Map([...all].filter(([, n]) => n >= MIN_YEAR_QUESTIONS));
    const bars = barsFromCounts(m, maxBars);
    if (bars) out[slug] = bars;
  }
  return out;
}

/** A family's bars: its members added year by year, re-sized together. */
export function mergeYearBars(list: readonly YearBars[], maxBars = 10): YearBars | null {
  const counts = new Map<number, number>();
  for (const yb of list) for (const b of yb.bars) counts.set(b.year, (counts.get(b.year) ?? 0) + b.count);
  const merged = barsFromCounts(counts, maxBars);
  if (!merged) return null;
  return { ...merged, from: Math.min(...list.map((x) => x.from)), to: Math.max(...list.map((x) => x.to)) };
}

export type ShowcaseCard = {
  /** The exam slug, or the family key ("CBSE", "MPSC"). */
  key: string;
  name: string;
  goal: ExamGoal;
  count: number;
  /** What `count` counts; "mixed" when a family adds a practice-only class to past papers. */
  countKind: "pyq" | "practice" | "mixed";
  /** A single exam's own page; null on a family card, which links its members. */
  href: string | null;
  /** The exam a tap on `href` remembers as the visitor's choice; null on a family. */
  rememberSlug: ExamSlug | null;
  members: { label: string; href: string }[];
  /** Members beyond MEMBER_LIMIT, which the exam list below shows in full. */
  moreMembers: number;
  /** Where "+N more" goes: the page sets it to the family's full listing. */
  moreHref?: string;
  subjects: string[];
  topChapter: ExamFacts["topChapter"];
  years: YearBars | null;
};

function kindOf(kinds: readonly ("pyq" | "practice")[]): ShowcaseCard["countKind"] {
  return kinds.every((k) => k === kinds[0]) ? kinds[0] ?? "pyq" : "mixed";
}

/**
 * One card per node, in the order given, up to `limit`. A family card adds up
 * its members' questions and years, merges their subjects in member order, and
 * names the biggest chapter any member has.
 */
export function buildShowcaseCards(
  nodes: readonly ExamFamilyNode<ShowcaseItem>[],
  resolve: ExamResolver<ShowcaseItem>,
  facts: Readonly<Record<string, ExamFacts>>,
  bars: Readonly<Record<string, YearBars>>,
  limit = SHOWCASE_LIMIT
): ShowcaseCard[] {
  const cards: ShowcaseCard[] = [];
  for (const node of nodes) {
    if (cards.length >= limit) break;
    if (node.kind === "flat") {
      const entry: ExamEntry | null = node.entry;
      if (!entry) continue;
      const f = facts[node.item.slug];
      cards.push({
        key: node.item.slug,
        name: node.item.displayName,
        goal: entry.goal,
        count: node.item.questionCount,
        countKind: node.item.kind,
        href: node.item.href,
        rememberSlug: entry.slug,
        members: [],
        moreMembers: 0,
        subjects: f?.subjects ?? [],
        topChapter: f?.topChapter ?? null,
        years: bars[node.item.slug] ?? null,
      });
      continue;
    }
    const entries = node.members.map((m) => resolve(m.item));
    const goal = entries[0]?.goal;
    if (!goal) continue;
    const memberFacts = node.members.map((m) => facts[m.item.slug]).filter((x): x is ExamFacts => !!x);
    const subjects: string[] = [];
    for (const f of memberFacts) for (const s of f.subjects) if (!subjects.includes(s)) subjects.push(s);
    const top = memberFacts
      .map((f) => f.topChapter)
      .filter((t): t is NonNullable<typeof t> => !!t)
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))[0] ?? null;
    const memberBars = node.members.map((m) => bars[m.item.slug]).filter((x): x is YearBars => !!x);
    cards.push({
      key: node.key,
      name: node.label,
      goal,
      count: familyTotal(node, (s) => s.questionCount),
      countKind: kindOf(node.members.map((m) => m.item.kind)),
      href: null,
      rememberSlug: null,
      members: node.members.slice(0, MEMBER_LIMIT).map((m, i) => ({
        label: entries[i] ? classLabelFor(entries[i]!) : m.label,
        href: m.item.href,
      })),
      moreMembers: Math.max(0, node.members.length - MEMBER_LIMIT),
      subjects: subjects.slice(0, 4),
      topChapter: top,
      years: mergeYearBars(memberBars),
    });
  }
  return cards;
}
