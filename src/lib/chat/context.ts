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
import { listChapterLandings } from "@/lib/questions/landing";
import {
  buildExamFacts,
  buildFreeFacts,
  buildPlanFacts,
  buildSystemPrompt,
  NAV_FACTS,
  type ChatExamFact,
} from "./facts";
import { chapterPath, formatChapterHits, searchChapters, type ChapterSearchRow } from "./chapterSearch";
import { pathsInReply } from "./replyLinks";
import type { VTool } from "./anthropic";

function toExamFact(e: (typeof EXAM_REGISTRY)[number], pyqBySlug: Map<string, number> | null): ChatExamFact {
  return {
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

export type VContext = { system: string; tools: VTool[]; allowedPaths: Set<string> };

/**
 * `anon` reads only what the public may read: active plans, free limits, PUBLIC
 * count. `loadChapters` defaults to the cached landing list; a script outside
 * Next passes the uncached one (scripts/chat/replay-typed.ts). `page` is the
 * (already cleaned) path the student asked from; V is told it and may link it.
 */
export async function loadVContext(
  anon: SupabaseClient,
  opts: { loadChapters?: () => Promise<readonly ChapterSearchRow[]>; page?: string | null } = {}
): Promise<VContext> {
  const loadChapters = opts.loadChapters ?? listChapterLandings;
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
    page: opts.page ?? null,
  });

  const allowedPaths = new Set(pathsInReply([...NAV_FACTS, ...exams].join("\n")));
  if (opts.page) allowedPaths.add(opts.page);

  const findChapters: VTool = {
    name: "find_chapters",
    description:
      "Find chapter pages on PYQ Vault. Give the chapter or subject in full words (query) and, if the student named one, the exam (exam). Returns up to 10 chapters, each with its question count and page path.",
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
      const hits = searchChapters(await loadChapters(), { query, exam });
      for (const h of hits) allowedPaths.add(chapterPath(h));
      return formatChapterHits(hits);
    },
  };

  return { system, tools: [findChapters], allowedPaths };
}
