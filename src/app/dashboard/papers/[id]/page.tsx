import { notFound, redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { getPaperDetail } from "@/lib/papers/admin";
import { queryQuestionPreviewsByIds } from "@/lib/questions/query";
import PaperEditor from "./PaperEditor";

export const dynamic = "force-dynamic";

export default async function PaperEditorPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getSessionMember();
  if (!member) redirect("/login");

  const client = createSupabaseServerClient();
  const detail = await getPaperDetail(client, params.id);
  if (!detail) notFound();

  const previews = await queryQuestionPreviewsByIds(
    client,
    detail.membership.map((m) => m.questionId)
  );

  const { data: exams } = await client.from("exams").select("id, name").order("name");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <PaperEditor
          detail={detail}
          previews={previews}
          exams={(exams ?? []) as { id: string; name: string }[]}
        />
      </main>
    </>
  );
}
