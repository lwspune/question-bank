import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAnonClient } from "@/lib/supabase/server";
import { resolveTaxonomy } from "@/lib/guide/resolveTaxonomy";
import {
  canonicalSubjectName,
  corpusForSubject,
  getSubtopicBySlug,
} from "@/lib/notes/goLinks";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";

export const dynamic = "force-dynamic";

type Target = { chapterName: string; subtopicName: string };

/**
 * GET /go/practice
 *
 * Two ways in:
 *   • SLUG mode (quizzes + tagged exam questions): ?subtopic=<notes-slug>...
 *     Resolves each slug to its location via the notes registry.
 *   • NAME mode (exams without slugs): ?exam=NDA&subject=Maths&chapter=<name>&subtopic=<name>
 *     Resolves DB names directly. The subtopic is optional — chapter-only
 *     (the "Where to focus" path) lands on the chapter's whole practice set.
 *
 * Corpus is chosen by subject — Maths → the practice bank (fresh problems),
 * every other subject → the PYQ bank (no practice bank exists). Fallback chain
 * never dead-ends: unresolved name → chapter-level → bare /browse for the corpus.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const sp = url.searchParams;
  const subtopics = sp.getAll("subtopic").filter(Boolean);

  // SLUG mode — try every ?subtopic as a notes slug.
  const locs = subtopics
    .map((s) => getSubtopicBySlug(s))
    .filter((l): l is NonNullable<typeof l> => l !== null);

  if (locs.length > 0) {
    const { examName, subjectName } = locs[0];
    const group = locs.filter(
      (l) => l.examName === examName && l.subjectName === subjectName
    );
    return resolveAndRedirect(
      url,
      examName,
      subjectName,
      group.map((l) => ({
        chapterName: l.chapterName,
        subtopicName: l.subtopicName,
      })),
      corpusForSubject(subjectName)
    );
  }

  // NAME mode — exam path + the "Where to focus" chapter path. Needs subject +
  // chapter; the subtopic name is optional. With a subtopic the /browse filter
  // narrows to it; without one (chapter-only) it lands on the chapter's whole
  // practice set (empty subtopicIds → chapter-level browse).
  const subject = sp.get("subject");
  const chapter = sp.get("chapter");
  const subtopicName = subtopics[0] ?? "";
  const exam = sp.get("exam") || "NDA";
  if (subject && chapter) {
    return resolveAndRedirect(
      url,
      exam,
      canonicalSubjectName(subject),
      [{ chapterName: chapter, subtopicName }],
      corpusForSubject(subject)
    );
  }

  return NextResponse.redirect(new URL("/browse?kind=practice", url.origin));
}

async function resolveAndRedirect(
  url: URL,
  examName: string,
  subjectName: string,
  targets: Target[],
  kind: "practice" | "pyq"
): Promise<NextResponse> {
  // kind=pyq is the /browse default, so it's omitted from the URL; only set it
  // when narrowing to the practice bank.
  const kindParam = kind === "practice" ? { kind: "practice" as const } : {};
  try {
    const client = createSupabaseAnonClient();
    const tax = await resolveTaxonomy(client, examName, subjectName);

    const chapterIds = new Set<string>();
    const subtopicIds = new Set<string>();
    for (const t of targets) {
      const chapter = tax.chapters.get(t.chapterName);
      if (!chapter) continue;
      chapterIds.add(chapter.id);
      const subId = chapter.subtopics.get(t.subtopicName);
      if (subId) subtopicIds.add(subId);
    }

    const href = buildBrowseUrl({
      examId: tax.examId,
      subjectId: tax.subjectId,
      chapterIds: [...chapterIds],
      subtopicIds: subtopicIds.size > 0 ? [...subtopicIds] : [],
      ...kindParam,
    });
    return NextResponse.redirect(new URL(href, url.origin));
  } catch {
    const fallback = kind === "practice" ? "/browse?kind=practice" : "/browse";
    return NextResponse.redirect(new URL(fallback, url.origin));
  }
}
