/**
 * Everything one AI answer from V needs, read live: the system prompt (exams,
 * passes, free limits, bank size, pages), the find_chapters tool, and the set
 * of paths a reply may link. Moved here from the dormant /api/chat route
 * (2026-10-15) when the typing box started answering.
 *
 * The allowed paths GROW during the answer: each chapter the tool returns is
 * added, so V can link it and nothing else.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { listActivePlans, readFreeLimits } from "@/lib/billing/plansQuery";
import { getCachedExamCatalog } from "@/lib/exam/allExamStats";
import { listChapterSearchRows } from "./subtopicIndex";
import {
  buildExamFacts,
  buildFreeFacts,
  buildPlanFacts,
  buildSystemPrompt,
  buildSystemTail,
  NAV_FACTS,
  GUIDE_FACTS,
  type ChatExamFact,
} from "./facts";
import { chapterPath, findChapters, formatChapterHits, type ChapterSearchRow } from "./chapterSearch";
import { pathsInReply } from "./replyLinks";
import type { VTool } from "./anthropic";
import type { Performance } from "@/lib/performance/compute";
import type { PracticeCounts } from "@/lib/activity/practiceCounts";
import { progressTool } from "./progress";
import { pageContext } from "./pageContext";
import { questionTools, type QuestionToolDeps } from "./questionToolSet";

/** Profile slugs as the exam names V's facts use; a retired or unknown slug is dropped. */
export function profileExamNames(slugs: readonly string[]): string[] {
  return slugs.flatMap((s) => {
    const e = EXAM_REGISTRY.find((x) => x.slug === s);
    return e && e.noPublicContent !== true ? [e.displayName] : [];
  });
}

function toExamFact(e: (typeof EXAM_REGISTRY)[number], pyqBySlug: Map<string, number> | null): ChatExamFact {
  return {
    slug: e.slug,
    displayName: e.displayName,
    tier: e.tier,
    hasMocks: e.hasMocks === true,
    boardExam: e.boardExam === true,
    practiceOnly: e.practiceOnly === true,
    // null = the count could not be read: claim nothing about past-year papers.
    hasPastYearQuestions: pyqBySlug ? (pyqBySlug.get(e.slug) ?? 0) > 0 : undefined,
    noPublicContent: e.noPublicContent === true,
  };
}

/** `system` is the same for every question (cached); `systemTail` is this question's page and account state. */
export type VContext = { system: string; systemTail: string; tools: VTool[]; allowedPaths: Set<string> };

/**
 * `anon` reads only what the public may read: active plans, free limits, PUBLIC
 * count. `loadChapters` defaults to the cached chapter list with its subtopics; a script outside
 * Next passes the uncached one (scripts/chat/replay-typed.ts). `page` is the
 * (already cleaned) path the student asked from; V is told it and may link it.
 */
export async function loadVContext(
  anon: SupabaseClient,
  opts: {
    loadChapters?: () => Promise<readonly ChapterSearchRow[]>;
    page?: string | null;
    /** False: a signed-out visitor, whose question is their only one (lib/chat/anonLimit.ts). */
    signedIn?: boolean;
    /** The student's own results, for my_progress (lib/chat/progress.ts). Absent when signed out. */
    loadOwnProgress?: () => Promise<Performance | null>;
    /** The student's practice outside mocks, for the same tool (lib/activity/practiceCounts.ts). */
    loadOwnPractice?: () => Promise<PracticeCounts>;
    /** student_profiles.target_exams: V uses them when the student names no exam. */
    profileExamSlugs?: readonly string[];
    /** "Ask V about this question" (0168): its tools' data sources, present only while it is switched on. */
    questionTools?: QuestionToolDeps | null;
    /** The question the student tapped Ask V on, and the option they picked. */
    question?: { id: string; chose: string | null } | null;
  } = {}
): Promise<VContext> {
  const loadChapters = opts.loadChapters ?? listChapterSearchRows;
  const [plans, limits, bankCount, pyqBySlug] = await Promise.all([
    listActivePlans(anon),
    readFreeLimits(anon),
    anon.from("questions").select("*", { count: "exact", head: true }).eq("visibility", "PUBLIC"),
    getCachedExamCatalog()
      .then((c) => new Map(c.exams.map((e) => [e.slug, e.counts.pyq] as const)))
      .catch((err) => {
        console.error("V: exam catalogue unavailable", err);
        return null;
      }),
  ]);

  const exams = buildExamFacts(EXAM_REGISTRY.map((e) => toExamFact(e, pyqBySlug)));
  const system = buildSystemPrompt({
    exams,
    plans: buildPlanFacts(plans),
    free: buildFreeFacts(limits),
    bankTotal: bankCount.count ?? 0,
    nav: NAV_FACTS,
    guides: GUIDE_FACTS,
    explainEnabled: Boolean(opts.questionTools),
  });
  // The search list is cached, so reading it for the page costs no database read.
  const pageInfo = opts.page
    ? pageContext(
        opts.page,
        await loadChapters().catch((err) => {
          console.error("V: chapter list unavailable for the page", err);
          return [];
        })
      )
    : null;
  const systemTail = buildSystemTail({
    page: opts.page ?? null,
    signedIn: opts.signedIn ?? true,
    pageInfo,
    profileExams: profileExamNames(opts.profileExamSlugs ?? []),
    question: opts.questionTools ? (opts.question ?? null) : null,
  });

  const allowedPaths = new Set(pathsInReply([...NAV_FACTS, ...GUIDE_FACTS, ...exams].join("\n")));
  if (opts.page) allowedPaths.add(opts.page);

  const findChaptersTool: VTool = {
    name: "find_chapters",
    // What the search found is kept with the reply (migration 0167), so a "not found" can be explained.
    logResult: true,
    description:
      "Find chapter pages on PYQ Vault. Give the chapter or subject in full words (query) and, if the student named one, the exam (exam). Returns up to 20 chapters, each with its question count and page path.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Chapter or subject name in full words, e.g. 'laws of motion' or 'science 2'." },
        exam: { type: "string", description: "Exam name if the student gave one, e.g. 'CBSE Class 12', 'NEET', 'MHT-CET'." },
      },
      required: ["query"],
    },
    run: async (input) => {
      const i = (input ?? {}) as { query?: unknown; exam?: unknown };
      const query = typeof i.query === "string" ? i.query : "";
      const exam = typeof i.exam === "string" ? i.exam : undefined;
      const { hits, missedExam } = findChapters(await loadChapters(), { query, exam });
      for (const h of hits) allowedPaths.add(chapterPath(h));
      return formatChapterHits(hits, { missedExam });
    },
  };

  // Always offered, signed in or not: the tool list is part of the cached prefix.
  const tools = [findChaptersTool, progressTool(opts.loadOwnProgress, opts.loadOwnPractice)];
  if (opts.questionTools) tools.push(...questionTools(opts.questionTools));
  return { system, systemTail, tools, allowedPaths };
}
