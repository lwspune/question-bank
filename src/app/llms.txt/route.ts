/**
 * GET /llms.txt — the language-model index, generated from the registry and
 * the cached catalogue (see lib/seo/llmsTxt.ts for why it is not a static
 * file). Anon data only, so it is safe to cache for a day like the other
 * public loaders.
 */
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { getCachedExamCatalog } from "@/lib/exam/allExamStats";
import { buildLlmsTxt } from "@/lib/seo/llmsTxt";

export const revalidate = 86400;

export async function GET() {
  const catalog = await getCachedExamCatalog();
  const noPublic = new Set<string>(
    EXAM_REGISTRY.filter((e) => e.noPublicContent).map((e) => e.slug)
  );
  const body = buildLlmsTxt({
    exams: catalog.exams.map((e) => ({
      slug: e.slug,
      displayName: e.displayName,
      examName: e.examName,
      totalPublicQuestions: e.totalPublicQuestions,
      practiceOnly: e.practiceOnly,
      noPublicContent: noPublic.has(e.slug),
    })),
    totalPublicQuestions: catalog.totalPublicQuestions,
  });
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
