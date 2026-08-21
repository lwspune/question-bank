import { notFound, redirect } from "next/navigation";
import { getSessionMember, getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import AppHeader from "@/components/AppHeader";
import { getSubtopicNotesEntry } from "@/lib/notes/subtopicSlugRegistry";
import { getTagsForQuestion } from "@/lib/tags/conceptTags";
import EditQuestionForm, {
  type ExistingQuestion,
  type NotesConceptsEntry,
  type SubjectTree,
} from "./EditQuestionForm";

type PageProps = { params: { id: string } };

type RawOption = {
  id: string;
  label: "A" | "B" | "C" | "D";
  text: string;
  is_correct: boolean;
  image_url: string | null;
};

type RawQuestion = {
  id: string;
  text: string;
  context: string | null;
  difficulty: "EASY" | "MODERATE" | "HARD";
  solution: string | null;
  image_url: string | null;
  org_id: string;
  exam_id: string;
  subject_id: string;
  chapter_id: string;
  subtopic_id: string | null;
  visibility: "PUBLIC" | "PRIVATE";
  set_id: string | null;
  last_edited_by: string | null;
  last_edited_at: string | null;
  options: RawOption[];
};

type RawSubtopic = { id: string; name: string };
type RawChapter = {
  id: string;
  name: string;
  order_index: number;
  subtopics: RawSubtopic[];
};
type RawSubject = { id: string; name: string; chapters: RawChapter[] };

export default async function EditQuestionPage({ params }: PageProps) {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  // Content editing is superadmin-only (migration 0056). The superadmin edits
  // within their own org here; cross-org edits go through the superadmin console.
  const superadmin = await getSessionSuperadmin();
  if (!superadmin) redirect("/browse");

  const supabase = createSupabaseServerClient();
  const { data: question } = await supabase
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution, image_url,
      org_id, exam_id, subject_id, chapter_id, subtopic_id, visibility, set_id,
      last_edited_by, last_edited_at,
      options(id, label, text, is_correct, image_url)
    `
    )
    .eq("id", params.id)
    .maybeSingle<RawQuestion>();

  if (!question) notFound();
  if (question.org_id !== member.orgId) redirect("/browse");

  const { data: subjects } = await supabase
    .from("subjects")
    .select(
      `
      id, name,
      chapters(id, name, order_index, subtopics(id, name))
    `
    )
    .eq("exam_id", question.exam_id)
    .order("name");

  const tree: SubjectTree[] = (subjects ?? []).map((s: RawSubject) => ({
    id: s.id,
    name: s.name,
    chapters: (s.chapters ?? [])
      .slice()
      .sort((a, b) => a.order_index - b.order_index)
      .map((c) => ({
        id: c.id,
        name: c.name,
        subtopics: (c.subtopics ?? [])
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((st) => ({ id: st.id, name: st.name })),
      })),
  }));

  const existing: ExistingQuestion = {
    id: question.id,
    text: question.text,
    context: question.context,
    difficulty: question.difficulty,
    solution: question.solution,
    imageUrl: question.image_url,
    subjectId: question.subject_id,
    chapterId: question.chapter_id,
    subtopicId: question.subtopic_id,
    visibility: question.visibility,
    options: ["A", "B", "C", "D"].map((label) => {
      const o = question.options.find((opt) => opt.label === label);
      return {
        label: label as "A" | "B" | "C" | "D",
        text: o?.text ?? "",
        imageUrl: o?.image_url ?? null,
        isCorrect: o?.is_correct ?? false,
      };
    }),
  };

  // If this question is part of a set, count the siblings so the form can
  // surface "editing context will update N questions" before the user types.
  let setMemberCount = 0;
  if (question.set_id) {
    const { count } = await supabase
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("set_id", question.set_id);
    setMemberCount = count ?? 0;
  }

  // Last-edited attribution: looked up via the service-role admin client
  // because `auth.users` isn't readable by the user-session client. Skipped
  // when the question has never been edited (last_edited_by is NULL on rows
  // created before migration 0025 or via /api/upload).
  let lastEdited: { label: string; iso: string } | null = null;
  if (question.last_edited_by && question.last_edited_at) {
    try {
      const adminClient = createSupabaseAdminClient();
      const { data: editor } = await adminClient.auth.admin.getUserById(
        question.last_edited_by
      );
      const meta = (editor.user?.user_metadata ?? {}) as { name?: string };
      const label = meta.name?.trim() || editor.user?.email || "an org member";
      lastEdited = { label, iso: question.last_edited_at };
    } catch {
      // Service-role lookup failure shouldn't block the edit page;
      // fall back to no attribution line.
    }
  }

  // Notes concept tagging: if the question's subtopic has notes content,
  // pass the concept list + current tags so the form can render a multi-select.
  let notesEntry: NotesConceptsEntry | null = null;
  let initialConceptSlugs: string[] = [];
  if (question.subtopic_id) {
    const [{ data: stRow }, { data: examRow }] = await Promise.all([
      supabase
        .from("subtopics")
        .select("name")
        .eq("id", question.subtopic_id)
        .maybeSingle<{ name: string }>(),
      supabase
        .from("exams")
        .select("name")
        .eq("id", question.exam_id)
        .maybeSingle<{ name: string }>(),
    ]);
    // A subtopic NAME does not identify a note — it repeats across exams
    // ("Integration by Parts") and across chapters of one subject ("Physical
    // vs Chemical Changes") — so the lookup is scoped by this question's own
    // (exam, subject, chapter). Unscoped, the concept multi-select could offer
    // another exam's concept list.
    const subjectNode = tree.find((s) => s.id === question.subject_id);
    const chapterName = subjectNode?.chapters.find(
      (c) => c.id === question.chapter_id
    )?.name;
    const entry =
      stRow && examRow && subjectNode && chapterName
        ? getSubtopicNotesEntry(
            {
              examName: examRow.name,
              subjectName: subjectNode.name,
              chapterName,
            },
            stRow.name
          )
        : null;
    if (entry) {
      notesEntry = {
        subtopicName: stRow!.name,
        subtopicSlug: entry.subtopicSlug,
        concepts: entry.concepts,
      };
      const tags = await getTagsForQuestion(supabase, question.id);
      initialConceptSlugs = tags
        .filter((t) => t.subtopicSlug === entry.subtopicSlug)
        .map((t) => t.conceptSlug);
    }
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl p-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Edit question</h1>
          {lastEdited && (
            <p className="mt-1 text-xs italic text-muted-foreground">
              Last edited by {lastEdited.label} · {relativeTime(lastEdited.iso)}
            </p>
          )}
        </header>
        <EditQuestionForm
          question={existing}
          subjects={tree}
          orgId={member.orgId}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
          setId={question.set_id}
          setMemberCount={setMemberCount}
          notesEntry={notesEntry}
          initialConceptSlugs={initialConceptSlugs}
          isAdmin={member.role === "ADMIN"}
        />
      </main>
    </>
  );
}

// Compact relative-time formatter for the "Last edited" line. Mirrors the
// dashboard's `timeAgo`; intentionally kept inline (two surfaces, bounded
// duplication — extract to a shared helper when a third caller arrives).
function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const min = Math.round(diffMs / 60_000);
  if (Math.abs(min) < 60) return rtf.format(-min, "minute");
  const hr = Math.round(diffMs / 3_600_000);
  if (Math.abs(hr) < 24) return rtf.format(-hr, "hour");
  const day = Math.round(diffMs / 86_400_000);
  if (Math.abs(day) < 30) return rtf.format(-day, "day");
  return rtf.format(-Math.round(day / 30), "month");
}
