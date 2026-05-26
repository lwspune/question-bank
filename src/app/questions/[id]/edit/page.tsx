import { notFound, redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
  // Both ADMIN and TEACHER can reach the edit form. Admin-only chrome
  // (Delete, Visibility toggle) is hidden client-side via `isAdmin`.
  if (member.role !== "ADMIN" && member.role !== "TEACHER") {
    redirect("/browse");
  }

  const supabase = createSupabaseServerClient();
  const { data: question } = await supabase
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution, image_url,
      org_id, exam_id, subject_id, chapter_id, subtopic_id, visibility, set_id,
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

  // Notes concept tagging: if the question's subtopic has notes content,
  // pass the concept list + current tags so the form can render a multi-select.
  let notesEntry: NotesConceptsEntry | null = null;
  let initialConceptSlugs: string[] = [];
  if (question.subtopic_id) {
    const { data: stRow } = await supabase
      .from("subtopics")
      .select("name")
      .eq("id", question.subtopic_id)
      .maybeSingle<{ name: string }>();
    const entry = stRow ? getSubtopicNotesEntry(stRow.name) : null;
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
