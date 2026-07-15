import { notFound, redirect } from "next/navigation";
import { getSessionMember, getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { getPaperDetail } from "@/lib/papers/admin";
import { getQuestionUsage } from "@/lib/papers/usage";
import { listBatches } from "@/lib/batches/admin";
import { splitBatches } from "@/lib/batches/validate";
import { listMembers } from "@/lib/members/admin";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { dominantExamId } from "@/lib/papers/exam";
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

  const membershipIds = detail.membership.map((m) => m.questionId);
  // Full rows (options + solution), not the slim preview shape: the editor now
  // renders the same QuestionCard as /browse, so a teacher can actually read and
  // verify a question before shipping the paper. Bounded by the 200/paper export
  // cap, and this page is force-dynamic + admin-gated, so the payload is fine.
  const questions = await queryQuestionsByIds(client, membershipIds);

  // Soft-warn: which of this paper's questions also live in OTHER papers (this
  // paper excluded). Batch-scoped when the paper targets a batch (repeat for the
  // cohort), else org-wide. Informational chips in the editor.
  const usage = Object.fromEntries(
    await getQuestionUsage(client, membershipIds, detail.id, detail.batchId)
  );

  // Active batches feed the paper's batch selector (archived cohorts hidden).
  const { active: batches } = splitBatches(await listBatches(client));

  const { data: exams } = await client.from("exams").select("id, name").order("name");

  // Org members (service-role, scoped to this org) — for the section-assignee
  // picker + "added by" labels. org_members read RLS is admin-only, so the
  // service-role helper is how a TEACHER also gets names.
  const membersResult = await listMembers(member.orgId);
  const orgMembers =
    membersResult.kind === "ok"
      ? membersResult.members.map((m) => ({ id: m.userId, label: m.name || m.email }))
      : [];

  // Content editing is superadmin-only (migration 0056) — mirrors /browse, which
  // gates the per-question Edit affordance the same way.
  const canEditContent = !!(await getSessionSuperadmin());

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <PaperEditor
          detail={detail}
          questions={questions}
          usage={usage}
          exams={(exams ?? []) as { id: string; name: string }[]}
          defaultExamId={dominantExamId(questions)}
          canEditContent={canEditContent}
          supabaseUrl={process.env.NEXT_PUBLIC_SUPABASE_URL!}
          orgMembers={orgMembers}
          batches={batches.map((b) => ({
            id: b.id,
            name: b.name,
            branchId: b.branchId,
            branchName: b.branchName,
          }))}
        />
      </main>
    </>
  );
}
