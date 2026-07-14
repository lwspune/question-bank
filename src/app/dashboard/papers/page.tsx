import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { listPapers } from "@/lib/papers/admin";
import { listBatches } from "@/lib/batches/admin";
import { splitBatches, formatBatchLabel } from "@/lib/batches/validate";
import PapersListClient from "./PapersListClient";

export const dynamic = "force-dynamic";

export default async function PapersPage() {
  const member = await getSessionMember();
  // Collaborative tool — any org member (ADMIN or TEACHER) can use it.
  if (!member) redirect("/login");

  const client = createSupabaseServerClient();
  const papers = await listPapers(client);
  const { active: batches } = splitBatches(await listBatches(client));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Papers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Build an exam paper together. Each teacher fills their subject&apos;s
            section; the whole {member.orgName} team contributes to one paper, then
            you finalize and download it as Word.
          </p>
        </header>

        <PapersListClient
          initialPapers={papers}
          batches={batches.map((b) => ({ id: b.id, label: formatBatchLabel(b) }))}
        />
      </main>
    </>
  );
}
