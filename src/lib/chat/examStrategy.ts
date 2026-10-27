/**
 * V's exam_strategy tool (2026-10-19, study-partner Phase 2). Students ask
 * "weightage?", "which chapters matter most?" and "what will come in 2027?";
 * before this V could only link a guide, and for most subjects there is none.
 * Now it reads how many past-year questions each chapter carried, year by year
 * (lib/chat/examStrategyServer.ts, cached a day), and quotes:
 *
 * - with a subject: each chapter's share of the subject's last 3 years, and in
 *   how many of its last 5 years the chapter was asked, plus the chapters asked
 *   in every one of them (the honest answer to "what comes next year");
 * - without one, on a paper of several subjects: each subject's share;
 * - on a board exam without one: the subjects to pick from, since each is its
 *   own paper and a share across them means nothing.
 *
 * The years are the subject's own latest years in the bank, not the calendar,
 * so a subject added later or an exam with gaps is still read over real papers.
 * The numbers are shares of the bank's past papers, and V is told to say so.
 *
 * Pure apart from the injected loaders. Spec: tests/chat-exam-strategy.test.ts.
 */
import type { VTool } from "./anthropic";
import { chapterPath, examsNamed, nameHasWords, type ChapterSearchRow } from "./chapterSearch";

export type StrategyChapter = {
  id: string;
  name: string;
  subject: string;
  /** Past-year questions in this chapter by year ("2024" -> 12). JSON keys, since it is cached. */
  byYear: Record<string, number>;
};

export type StrategyData = { examName: string; board: boolean; chapters: StrategyChapter[] };

export type StrategyGuide = { href: string; label: string };

/** Years a share is taken over, and years "asked in N of" counts over. */
const RECENT_YEARS = 3;
const SPAN_YEARS = 5;
const MAX_CHAPTERS = 12;
const MAX_EVERY_YEAR = 8;
/** "Asked in every year" means little over one or two years. */
const MIN_YEARS_FOR_EVERY = 3;

/**
 * A paper made of several subjects, asked for by its own name. NDA's General
 * Ability Test is every NDA subject but Mathematics; "NDA GAT weightage" was a
 * real ask (2026-10-18), and shares of the whole NDA bank read as GAT shares.
 */
const PAPERS: readonly { examName: string; label: string; names: readonly string[]; excludes: readonly string[] }[] = [
  { examName: "NDA", label: "GAT", names: ["GAT", "General Ability Test", "General Ability"], excludes: ["Mathematics"] },
];

const NOT_OFFICIAL = "These are shares of the past-year questions in PYQ Vault's bank, not an official syllabus weight.";

function count(c: StrategyChapter, years: readonly number[]): number {
  return years.reduce((n, y) => n + (c.byYear[String(y)] ?? 0), 0);
}

/** The latest years with any question among these chapters, oldest first. */
function latestYears(chapters: readonly StrategyChapter[], n: number): number[] {
  const years = new Set<number>();
  for (const c of chapters) for (const [y, v] of Object.entries(c.byYear)) if (v > 0) years.add(Number(y));
  return [...years].sort((a, b) => a - b).slice(-n);
}

function yearsLabel(years: readonly number[]): string {
  if (years.length === 0) return "";
  const consecutive = years.every((y, i) => i === 0 || y === years[i - 1] + 1);
  return consecutive && years.length > 1 ? `${years[0]}-${years[years.length - 1]}` : years.join(", ");
}

function pct(part: number, whole: number): string {
  const p = (part / whole) * 100;
  return p > 0 && p < 1 ? "under 1%" : `${Math.round(p)}%`;
}

/** Subjects by how many past-year questions they hold, most first. */
export function subjectsOf(chapters: readonly StrategyChapter[]): string[] {
  const totals = new Map<string, number>();
  for (const c of chapters) totals.set(c.subject, (totals.get(c.subject) ?? 0) + Object.values(c.byYear).reduce((a, b) => a + b, 0));
  return [...totals].sort((a, b) => b[1] - a[1]).map(([s]) => s);
}

function guideFor(subject: string, guides: readonly StrategyGuide[]): StrategyGuide | null {
  return guides.find((g) => nameHasWords(g.label, subject)) ?? null;
}

function orList(names: readonly string[]): string {
  return names.length <= 1 ? (names[0] ?? "") : `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}

function chapterBreakdown(
  data: StrategyData,
  subject: string,
  opts: { guides: readonly StrategyGuide[]; pathOf: (id: string) => string | null }
): { text: string; paths: string[] } {
  const chapters = data.chapters.filter((c) => c.subject === subject);
  const span = latestYears(chapters, SPAN_YEARS);
  const recent = span.slice(-RECENT_YEARS);
  const total = chapters.reduce((n, c) => n + count(c, recent), 0);
  const paths: string[] = [];

  const ranked = chapters
    .map((c) => ({ c, recent: count(c, recent), all: count(c, span), asked: span.filter((y) => (c.byYear[String(y)] ?? 0) > 0).length }))
    .filter((r) => r.recent > 0)
    .sort((a, b) => b.recent - a.recent || b.all - a.all);

  const lines = [`${data.examName} ${subject}: past-year questions ${yearsLabel(recent)} (${total} questions), share by chapter:`];
  for (const r of ranked.slice(0, MAX_CHAPTERS)) {
    const path = opts.pathOf(r.c.id);
    if (path) paths.push(path);
    lines.push(`- ${r.c.name}: ${pct(r.recent, total)} (${r.recent}), asked in ${r.asked} of ${span.length} years${path ? ` ${path}` : ""}`);
  }
  if (ranked.length > MAX_CHAPTERS) lines.push(`(${ranked.length - MAX_CHAPTERS} smaller chapters not shown)`);

  if (span.length >= MIN_YEARS_FOR_EVERY) {
    const every = ranked
      .filter((r) => r.asked === span.length)
      .sort((a, b) => b.all - a.all)
      .slice(0, MAX_EVERY_YEAR)
      .map((r) => r.c.name);
    if (every.length > 0) lines.push(`Asked in every one of ${yearsLabel(span)}: ${every.join(", ")}.`);
  }

  const guide = guideFor(subject, opts.guides);
  if (guide) {
    paths.push(guide.href);
    lines.push(`Strategy guide for this subject: ${guide.href}`);
  }
  if (data.board) lines.push("Each chapter's Top 10 most-repeated PYQs are on /board.");
  lines.push(NOT_OFFICIAL);
  return { text: lines.join("\n"), paths };
}

/**
 * Chapters by their share of the latest 3 years, biggest first, within one
 * subject, a few subjects together, or (null) the whole exam: what the week
 * plan (weekPlan.ts) picks from after the student's weak chapters. Share is a
 * whole percent of the chosen subjects' questions.
 */
/**
 * Each chapter's past-year questions over the subject set's last 3 years, by
 * chapter id: the weight rankChapters shares out, unrounded. V's progress card
 * (lib/chat/progressCard.ts) sums it, so its "exam covered" and these shares agree.
 */
export function recentChapterCounts(data: StrategyData, subjects: readonly string[] | null): Map<string, number> {
  const chapters = subjects ? data.chapters.filter((c) => subjects.includes(c.subject)) : data.chapters;
  const recent = latestYears(chapters, RECENT_YEARS);
  return new Map(chapters.map((c) => [c.id, count(c, recent)]));
}

export function rankChapters(
  data: StrategyData,
  subject: string | readonly string[] | null
): { id: string; name: string; subject: string; share: number }[] {
  const chosen = subject === null ? null : typeof subject === "string" ? [subject] : subject;
  const counts = recentChapterCounts(data, chosen);
  const total = [...counts.values()].reduce((n, v) => n + v, 0);
  if (total === 0) return [];
  return data.chapters
    .map((c) => ({ c, n: counts.get(c.id) ?? 0 }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((r) => ({ id: r.c.id, name: r.c.name, subject: r.c.subject, share: Math.round((r.n / total) * 100) }));
}

/** The exam's subject named by the student's words, when exactly one fits. */
export function subjectNamed(data: StrategyData, asked: string): string | null {
  const subjects = subjectsOf(data.chapters);
  const matched = subjects.filter((s) => nameHasWords(s, asked));
  if (matched.length === 1) return matched[0];
  const exact = matched.filter((s) => nameHasWords(asked, s));
  return exact.length === 1 ? exact[0] : null;
}

export function strategyText(
  data: StrategyData,
  opts: { subject?: string; guides: readonly StrategyGuide[]; pathOf: (id: string) => string | null }
): { text: string; paths: string[] } {
  const subjects = subjectsOf(data.chapters);
  if (subjects.length === 0) {
    return { text: `${data.examName} has no past-year questions in the bank, so there are no shares to quote.`, paths: [] };
  }

  const asked = opts.subject?.trim();
  const paper = asked
    ? PAPERS.find((p) => p.examName === data.examName && p.names.some((n) => nameHasWords(n, asked) && nameHasWords(asked, n)))
    : undefined;
  if (paper) {
    const inPaper = subjects.filter((s) => !paper.excludes.includes(s));
    return subjectShares(data, inPaper, `${data.examName} ${paper.label}`, opts.guides);
  }

  if (asked) {
    const matched = subjects.filter((s) => nameHasWords(s, asked));
    if (matched.length === 0) {
      return {
        text: `${data.examName} has no past-year questions for ${asked} in the bank. Subjects with past papers: ${subjects.join(", ")}.`,
        paths: [],
      };
    }
    // "science 2" names one; "science" fits two, so ask unless one is named exactly.
    const exact = matched.filter((s) => nameHasWords(asked, s));
    const pick = matched.length === 1 ? matched[0] : exact.length === 1 ? exact[0] : null;
    if (!pick) return { text: `That fits ${orList(matched)} in ${data.examName}. Ask which one they mean.`, paths: [] };
    return chapterBreakdown(data, pick, opts);
  }

  if (subjects.length === 1) return chapterBreakdown(data, subjects[0], opts);

  if (data.board) {
    return {
      text: `${data.examName} is a board exam: each subject is its own paper. Ask which subject, then call again with it. Subjects: ${subjects.join(", ")}.`,
      paths: [],
    };
  }

  return subjectShares(data, subjects, data.examName, opts.guides);
}

/** Each subject's share of these subjects' past-year questions over their latest 3 years. */
function subjectShares(
  data: StrategyData,
  subjects: readonly string[],
  label: string,
  allGuides: readonly StrategyGuide[]
): { text: string; paths: string[] } {
  const chapters = data.chapters.filter((c) => subjects.includes(c.subject));
  const recent = latestYears(chapters, RECENT_YEARS);
  const bySubject = subjects.map((s) => ({ s, n: data.chapters.filter((c) => c.subject === s).reduce((a, c) => a + count(c, recent), 0) }));
  const total = bySubject.reduce((a, b) => a + b.n, 0);
  const shares = bySubject
    .filter((b) => b.n > 0)
    .sort((a, b) => b.n - a.n)
    .map((b) => `${b.s} ${pct(b.n, total)}`);
  const guides = subjects.flatMap((s) => {
    const g = guideFor(s, allGuides);
    return g ? [g] : [];
  });
  const lines = [
    `${label} past-year questions by subject, ${yearsLabel(recent)} (${total} questions): ${shares.join(", ")}.`,
    "Ask which subject to break down by chapter, then call again with it.",
  ];
  if (guides.length > 0) lines.push(`Strategy guides: ${guides.map((g) => `${g.label} ${g.href}`).join(", ")}`);
  lines.push(NOT_OFFICIAL);
  return { text: lines.join("\n"), paths: guides.map((g) => g.href) };
}

export type ExamStrategyDeps = {
  /** V's cached chapter list: exams are matched by name in it, and chapter pages come from it. */
  loadChapters: () => Promise<readonly ChapterSearchRow[]>;
  /** The exam's per-chapter, per-year counts; null when they cannot be read. */
  loadStrategy: (examSlug: string) => Promise<StrategyData | null>;
  guidesFor: (examSlug: string) => readonly StrategyGuide[];
  /** The pages the result names, which a reply may then link. */
  onPaths: (paths: readonly string[]) => void;
};

export function examStrategyTool(deps: ExamStrategyDeps): VTool {
  return {
    name: "exam_strategy",
    logResult: true,
    description:
      "Which chapters (or subjects) carry the most past-year questions in an exam: each one's share of the last 3 years, in how many of the last 5 years it was asked, its page, and the subject's guide. Use it for weightage, important chapters, what to study first, and what may come next year.",
    input_schema: {
      type: "object",
      properties: {
        exam: { type: "string", description: "The exam, e.g. 'NDA', 'MHT-CET', 'CBSE Class 12'." },
        subject: {
          type: "string",
          description:
            "One subject if the student named one, e.g. 'Physics'. For NDA's General Ability Test pass 'GAT'. Leave it out for the whole exam.",
        },
      },
      required: ["exam"],
    },
    run: async (input) => {
      const i = (input ?? {}) as { exam?: unknown; subject?: unknown };
      const exam = typeof i.exam === "string" ? i.exam.trim() : "";
      const subject = typeof i.subject === "string" ? i.subject : undefined;
      if (!exam) return "No exam was given. Ask which exam they are preparing for.";
      const rows = await deps.loadChapters();
      const exams = examsNamed(rows, exam);
      if (exams.length === 0) return `No exam matched "${exam}". Ask which exam they mean.`;
      if (exams.length > 1) return `That fits ${orList(exams.map((e) => e.name))}. Ask which one they mean.`;

      const slug = exams[0].slug;
      const data = await deps.loadStrategy(slug).catch((err) => {
        console.error("V: exam strategy unavailable", err);
        return null;
      });
      if (!data) return "The past-paper shares are unavailable right now. Point them to /guide instead.";

      const pathById = new Map(rows.filter((r) => r.examSlug === slug && r.chapterId).map((r) => [r.chapterId as string, chapterPath(r)]));
      const out = strategyText(data, { subject, guides: deps.guidesFor(slug), pathOf: (id) => pathById.get(id) ?? null });
      deps.onPaths(out.paths);
      return out.text;
    },
  };
}
