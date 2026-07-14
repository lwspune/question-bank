import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { listBatches } from "@/lib/batches/admin";
import { splitBatches } from "@/lib/batches/validate";
import { listBranches } from "@/lib/branches/admin";
import { splitBranches } from "@/lib/branches/validate";
import BatchesClient from "./BatchesClient";

export const dynamic = "force-dynamic";

export default async function BatchesPage() {
  const member = await getSessionMember();
  // Org tool — any org member (ADMIN or TEACHER) can manage cohort batches.
  if (!member) redirect("/login");

  const client = createSupabaseServerClient();
  const { active, archived } = splitBatches(await listBatches(client));
  const { active: branches } = splitBranches(await listBranches(client));
  const { data: exams } = await client.from("exams").select("id, name").order("name");

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Batches</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A batch is a student cohort (e.g. &ldquo;NDA 2026 Morning&rdquo;) that belongs
            to a branch. When you build a paper for a batch, the editor warns you if
            a question was already used for that same batch — so you don&apos;t repeat
            questions for one cohort. The same question can still be reused across
            different batches.
          </p>
        </header>

        {branches.length === 0 && (
          <div className="rounded-lg border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
            No branches yet. You can still create unbranched batches, or add branches
            first in{" "}
            <a href="/dashboard/branches" className="font-medium text-brand-accent underline">
              Branches
            </a>
            .
          </div>
        )}

        <BatchesClient
          active={active}
          archived={archived}
          branches={branches.map((b) => ({ id: b.id, name: b.name }))}
          exams={(exams ?? []) as { id: string; name: string }[]}
        />
      </main>
    </>
  );
}
