import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadRoster } from "@/lib/batches/invitesAdmin";
import { listBatchAssignments, readCompletionAttempts } from "@/lib/assignments/service";
import { assignmentState, completionFor, dueLabel } from "@/lib/assignments/core";
import { getPublishedMocks } from "@/lib/mocks/query";
import RosterClient from "./RosterClient";
import AssignmentsCard, { type AssignmentRow, type MockChoice } from "./AssignmentsCard";

export const dynamic = "force-dynamic";

/**
 * The roster for one batch: who joined, how they are doing, and who has been
 * invited but not answered.
 *
 * SCOPE COMES FROM RLS, not from a check here. The batch is read through the
 * caller's own client, so batches_select_scoped (0057) 404s a teacher looking
 * at another branch's batch — and loadRoster reads enrollments and attempts the
 * same way, so a mistake on this page cannot widen what it shows.
 */
export default async function RosterPage({ params }: { params: { id: string } }) {
  const member = await getSessionMember();
  if (!member) redirect("/login");

  const client = createSupabaseServerClient();
  const { data: batch } = await client
    .from("batches")
    .select("id, name, join_code, join_open, exam_id")
    .eq("id", params.id)
    .maybeSingle<{ id: string; name: string; join_code: string | null; join_open: boolean; exam_id: string | null }>();
  if (!batch) notFound();

  const { students, pendingInvites } = await loadRoster(client, batch.id);
  const active = students.filter((s) => s.attempts > 0).length;

  // Assigned papers (ENGAGEMENT_SPEC.md C1): the batch's assignments through
  // RLS, who has sat each (the 0083 attempts policy), and the picker of
  // published mocks with the batch's own exam first.
  const [assignments, published, examRow] = await Promise.all([
    listBatchAssignments(client, batch.id),
    getPublishedMocks(client),
    batch.exam_id
      ? client.from("exams").select("name").eq("id", batch.exam_id).maybeSingle<{ name: string }>()
      : Promise.resolve({ data: null }),
  ]);
  const examName = examRow.data?.name ?? null;
  const mocks: MockChoice[] = [...published]
    .sort((a, b) => Number(b.examName === examName) - Number(a.examName === examName))
    .map((m) => ({ id: m.id, title: m.title }));
  const completionAttempts = await readCompletionAttempts(
    client,
    students.map((st) => st.userId),
    assignments.map((a) => a.mockId)
  );
  const now = new Date();
  const byId = new Map(students.map((st) => [st.userId, st]));
  const assignmentRows: AssignmentRow[] = assignments.map((a) => {
    const c = completionFor(a.mockId, students, completionAttempts);
    return {
      id: a.id,
      mockTitle: a.mockTitle,
      mockSlug: a.mockSlug,
      dueAt: a.dueAt,
      note: a.note,
      label: dueLabel(a.dueAt, now),
      state: assignmentState(a.dueAt, now),
      done: c.done.length,
      total: students.length,
      pending: c.pending.map((id) => {
        const st = byId.get(id)!;
        return { userId: id, name: st.name, email: st.email };
      }),
    };
  });

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <div>
          <Link
            href="/dashboard/batches"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
            Batches
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{batch.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Students who accepted an invitation to this batch. A student joins by
            accepting — you cannot add one directly, and they can leave at any time.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <StatCard kind="numeric" value={students.length} label="Joined" />
          <StatCard kind="numeric" value={pendingInvites.length} label="Invited, no reply" />
          <StatCard kind="numeric" value={active} label="Have sat a mock" />
        </div>

        <AssignmentsCard batchId={batch.id} assignments={assignmentRows} mocks={mocks} />

        <RosterClient
          batchId={batch.id}
          joinCode={batch.join_code}
          joinOpen={batch.join_open}
          students={students}
          pendingInvites={pendingInvites}
        />
      </main>
    </>
  );
}
