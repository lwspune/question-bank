import { notFound, redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import EditQuestionForm, {
  type ExistingQuestion,
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
  if (member.role !== "ADMIN") redirect("/dashboard");

  const supabase = createSupabaseServerClient();
  const { data: question } = await supabase
    .from("questions")
    .select(
      `
      id, text, context, difficulty, solution, image_url,
      org_id, exam_id, subject_id, chapter_id, subtopic_id,
      options(id, label, text, is_correct, image_url)
    `
    )
    .eq("id", params.id)
    .maybeSingle<RawQuestion>();

  if (!question) notFound();
  if (question.org_id !== member.orgId) redirect("/dashboard");

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
        />
      </main>
    </>
  );
}
