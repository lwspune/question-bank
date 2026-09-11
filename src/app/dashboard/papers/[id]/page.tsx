import { notFound, redirect } from "next/navigation";
import { getSessionMember, getSessionSuperadmin } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { getPaperDetail } from "@/lib/papers/admin";
import { getQuestionUsage } from "@/lib/papers/usage";
import { getConductedExposure } from "@/lib/papers/conducted";
import { listBatches } from "@/lib/batches/admin";
import { splitBatches } from "@/lib/batches/validate";
import { listMembers } from "@/lib/members/admin";
import { queryQuestionsByIds } from "@/lib/questions/query";
import { dominantExamId } from "@/lib/papers/exam";
import { hasTrackerTarget } from "@/lib/sync/trackerTarget";
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

  // The OTHER kind of repeat: papers the institute actually CONDUCTED, from the
  // nda-tracker item-statistics export. `usage` above answers "is this in
  // another vault paper" — a question can be there without a student ever
  // seeing it. Both matter and neither substitutes for the other.
  //
  // Degrades to no chips rather than failing the page: this is advisory, and a
  // teacher must still be able to edit a paper when the stats table is empty or
  // unreachable.
  const conducted = Object.fromEntries(
    await getConductedExposure(client, membershipIds, member.orgId).catch(() => new Map())
  );
  // The paper's batch NAME, because exposure is matched by the name the tracker
  // recorded. Resolved server-side; the client never supplies it.
  const paperBatchName =
    batches.find((b) => b.id === detail.batchId)?.name ?? null;

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

  // Gates the Push-to-tracker button. Presence of a tracker_sync_targets row is
  // the whole gate (migration 0094) — never an allow-list of institute names, so
  // it lights up by itself the day an institute is provisioned. The SECRET is
  // deliberately not read here; only at the moment of a push.
  const hasTracker = await hasTrackerTarget(member.orgId);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-5xl space-y-6 px-6 py-8">
        <PaperEditor
          detail={detail}
          questions={questions}
          usage={usage}
          conducted={conducted}
          paperBatchName={paperBatchName}
          exams={(exams ?? []) as { id: string; name: string }[]}
          defaultExamId={dominantExamId(questions)}
          canEditContent={canEditContent}
          hasTracker={hasTracker}
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
