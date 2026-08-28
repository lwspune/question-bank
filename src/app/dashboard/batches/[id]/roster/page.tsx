import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadRoster } from "@/lib/batches/invitesAdmin";
import RosterClient from "./RosterClient";

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
    .select("id, name, join_code, join_open")
    .eq("id", params.id)
    .maybeSingle<{ id: string; name: string; join_code: string | null; join_open: boolean }>();
  if (!batch) notFound();

  const { students, pendingInvites } = await loadRoster(client, batch.id);
  const active = students.filter((s) => s.attempts > 0).length;

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
