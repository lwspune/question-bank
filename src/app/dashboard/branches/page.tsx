import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { listBranches } from "@/lib/branches/admin";
import { splitBranches } from "@/lib/branches/validate";
import BranchesClient from "./BranchesClient";

export const dynamic = "force-dynamic";

export default async function BranchesPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  // Branch management is admin-only; teachers get sent to the bank.
  if (member.role !== "ADMIN") redirect("/browse");

  const client = createSupabaseServerClient();
  const { active, archived } = splitBranches(await listBranches(client));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Branches</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A branch is a physical location of {member.orgName} (e.g. &ldquo;FC Road&rdquo;).
            Batches belong to a branch, and teachers are assigned to one or more
            branches. Only an admin can manage branches.
          </p>
        </header>

        <BranchesClient active={active} archived={archived} />
      </main>
    </>
  );
}
