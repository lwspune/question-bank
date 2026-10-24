/**
 * Everything one AI answer from V needs, read live: the system prompt (exams,
 * passes, free limits, bank size, pages), the find_chapters and exam_strategy tools, and the set
 * of paths a reply may link. Moved here from the dormant /api/chat route
 * (2026-10-15) when the typing box started answering.
 *
 * The allowed paths GROW during the answer: each chapter the tool returns is
 * added, so V can link it and nothing else.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { listActivePlans, readFreeLimits } from "@/lib/billing/plansQuery";
import { getCachedExamCatalog, type ExamCatalog } from "@/lib/exam/allExamStats";
import { listChapterSearchRows } from "./subtopicIndex";
import {
  buildExamFacts,
  buildFreeFacts,
  buildPlanFacts,
  buildSystemPrompt,
  buildSystemTail,
  NAV_FACTS,
  GUIDE_FACTS,
  examFactFromEntry,
  buildNotesFacts,
} from "./facts";
import { getNotesExamGroups } from "@/lib/notes/notesNav";
import { chapterPath, findChapters, formatChapterHits, type ChapterSearchRow } from "./chapterSearch";
import { pathsInReply } from "./replyLinks";
import type { VTool } from "./anthropic";
import type { Performance } from "@/lib/performance/compute";
import type { PracticeCounts } from "@/lib/activity/practiceCounts";
import { progressTool } from "./progress";
import { pageContext } from "./pageContext";
import { questionTools, type QuestionToolDeps } from "./questionToolSet";
import { examStrategyTool, type StrategyData } from "./examStrategy";
import { loadExamStrategy } from "./examStrategyServer";
import { planTools, type PlanDeps } from "./weekPlan";
import { myQuestionTools, type MyQuestionDeps } from "./myQuestions";
import { GUIDE_CATALOG } from "@/lib/guide/guideCatalog";
import type { ExamSlug } from "@/lib/exam/examContext";
import { conceptTool, type ConceptToolDeps } from "./conceptSearch";

/** Profile slugs as the exam names V's facts use; a retired or unknown slug is dropped. */
export function profileExamNames(slugs: readonly string[]): string[] {
  return slugs.flatMap((s) => {
    const e = EXAM_REGISTRY.find((x) => x.slug === s);
    return e && e.noPublicContent !== true ? [e.displayName] : [];
  });
}

/** Signed out the plan tools answer "sign in" before reading anything, so these are never called. */
const SIGNED_OUT_PLAN: Omit<PlanDeps, "signedIn" | "loadChapters" | "loadStrategy"> = {
  now: () => new Date(),
  loadProfile: async () => ({ targetExams: [], examDate: null, weeklyGoal: null }),
  saveExamDate: async () => {},
  loadWeak: async () => [],
  loadDue: async () => 0,
  savePlan: async () => {},
  loadPlan: async () => null,
  loadPlanActivity: async () => ({ drills: 0, mocks: 0, chapterQuestions: {} }),
  onPlan: () => {},
};

const SIGNED_OUT_QUESTIONS: Omit<MyQuestionDeps, "signedIn"> = {
  now: () => new Date(),
  loadRecent: async () => [],
  save: async () => ({ kind: "missing" }),
};

/** `system` is the same for every question (cached); `systemTail` is this question's page and account state. */
export type VContext = { system: string; systemTail: string; tools: VTool[]; allowedPaths: Set<string> };

/**
 * `anon` reads only what the public may read: active plans, free limits, PUBLIC
 * count. `loadChapters` defaults to the cached chapter list with its subtopics; a script outside
 * Next passes the uncached one (scripts/chat/eval/run.ts). `page` is the
 * (already cleaned) path the student asked from; V is told it and may link it.
 */
export async function loadVContext(
  anon: SupabaseClient,
  opts: {
    loadChapters?: () => Promise<readonly ChapterSearchRow[]>;
    /** Per-chapter past-paper counts for exam_strategy; defaults to the day-cached read (a script passes the uncached one). */
    loadStrategy?: (examSlug: string) => Promise<StrategyData | null>;
    /** Each exam's past-year count for its fact; defaults to the day-cached catalogue (a script, outside Next, passes an uncached one). */
    loadExamCatalog?: () => Promise<ExamCatalog>;
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
    /** V plans the week (chat_settings.plan_enabled, 0170): the plan tools and rule 8a, signed in or not. */
    planEnabled?: boolean;
    /** The signed-in student's week-plan reads and writes (lib/chat/weekPlan.ts); absent when signed out. */
    plan?: Omit<PlanDeps, "signedIn" | "loadChapters" | "loadStrategy"> | null;
    /** The question the student tapped Ask V on, and the option they picked. */
    question?: { id: string; chose: string | null } | null;
    /** A notes practice question the student tapped Ask V on, as V is told it (lib/chat/notesItem.ts). */
    notesBrief?: string | null;
    /** explain_concept's data sources (lib/chat/conceptSearchServer.ts conceptSources); offered with the question tools. */
    concepts?: Pick<ConceptToolDeps, "searchBank" | "loadNotesIndex" | "loadNotesConcept"> | null;
    /** The signed-in student's recent questions and saves (lib/chat/myQuestions.ts); absent when signed out. */
    myQuestions?: Omit<MyQuestionDeps, "signedIn"> | null;
  } = {}
): Promise<VContext> {
  const loadChapters = opts.loadChapters ?? listChapterSearchRows;
  const [plans, limits, bankCount, pyqBySlug] = await Promise.all([
    listActivePlans(anon),
    readFreeLimits(anon),
    anon.from("questions").select("*", { count: "exact", head: true }).eq("visibility", "PUBLIC"),
    (opts.loadExamCatalog ?? getCachedExamCatalog)()
      .then((c) => new Map(c.exams.map((e) => [e.slug, e.counts.pyq] as const)))
      .catch((err) => {
        console.error("V: exam catalogue unavailable", err);
        return null;
      }),
  ]);

  const exams = buildExamFacts(EXAM_REGISTRY.map((e) => examFactFromEntry(e, pyqBySlug)));
  // Never an exam with nothing public: its notes would point a student at an exam we do not show.
  const notes = buildNotesFacts(
    getNotesExamGroups().filter((g) => EXAM_REGISTRY.find((e) => e.slug === g.slug)?.noPublicContent !== true)
  );
  const system = buildSystemPrompt({
    exams,
    plans: buildPlanFacts(plans),
    free: buildFreeFacts(limits),
    bankTotal: bankCount.count ?? 0,
    nav: NAV_FACTS,
    guides: GUIDE_FACTS,
    notes,
    explainEnabled: Boolean(opts.questionTools),
    planEnabled: opts.planEnabled === true,
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
    notesBrief: opts.questionTools ? (opts.notesBrief ?? null) : null,
  });

  const allowedPaths = new Set(pathsInReply([...NAV_FACTS, ...GUIDE_FACTS, ...exams, ...notes].join("\n")));
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
  const strategyTool = examStrategyTool({
    loadChapters,
    loadStrategy: opts.loadStrategy ?? loadExamStrategy,
    guidesFor: (slug) => (GUIDE_CATALOG[slug as ExamSlug] ?? []).map((g) => ({ href: g.href, label: g.exam })),
    onPaths: (paths) => paths.forEach((p) => allowedPaths.add(p)),
  });
  const loadStrategy = opts.loadStrategy ?? loadExamStrategy;
  // Signed out the plan tools are still offered (they say "sign in"), so the cached tool list depends on the switch alone.
  const plan = opts.planEnabled ? planTools({ ...(opts.plan ?? SIGNED_OUT_PLAN), signedIn: Boolean(opts.plan), loadChapters, loadStrategy }) : [];
  // Always offered (the tool list is cached); signed out they say "sign in" and touch nothing.
  const mine = myQuestionTools({ ...(opts.myQuestions ?? SIGNED_OUT_QUESTIONS), signedIn: Boolean(opts.myQuestions) });
  const tools = [findChaptersTool, progressTool(opts.loadOwnProgress, opts.loadOwnPractice), strategyTool, ...mine, ...plan];
  if (opts.questionTools) tools.push(...questionTools({ ...opts.questionTools, pageChapterId: pageInfo?.chapterId ?? null }));
  // V_SPEC.md step 2: concepts, with the question tools (the same switch), so the cached tool list depends on it alone.
  if (opts.questionTools && opts.concepts) {
    tools.push(
      conceptTool({
        ...opts.concepts,
        loadChapters,
        page: pageInfo ? { examName: pageInfo.examName, subjectName: pageInfo.subjectName } : null,
        onPaths: (paths) => paths.forEach((p) => allowedPaths.add(p)),
      })
    );
  }
  return { system, systemTail, tools, allowedPaths };
}
