import { notFound, redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { getPaperDetail } from "@/lib/papers/admin";
import { getQuestionUsage } from "@/lib/papers/usage";
import { listBatches } from "@/lib/batches/admin";
import { splitBatches } from "@/lib/batches/validate";
import { listMembers } from "@/lib/members/admin";
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

  const membershipIds = detail.membership.map((m) => m.questionId);
  const previews = await queryQuestionPreviewsByIds(client, membershipIds);

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

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <PaperEditor
          detail={detail}
          previews={previews}
          usage={usage}
          exams={(exams ?? []) as { id: string; name: string }[]}
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
