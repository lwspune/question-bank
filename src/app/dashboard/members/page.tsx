import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AppHeader from "@/components/AppHeader";
import { listMembers } from "@/lib/members/admin";
import { listBranches } from "@/lib/branches/admin";
import { splitBranches } from "@/lib/branches/validate";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const result = await listMembers(member.orgId);
  const members = result.kind === "ok" ? result.members : [];
  const loadError = result.kind === "error" ? result.message : null;

  const { active: branches } = splitBranches(
    await listBranches(createSupabaseServerClient())
  );

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {member.orgName} · Add admins and teachers, and assign teachers to the
            branches they build papers for.
          </p>
        </header>

        <MembersClient
          orgName={member.orgName}
          callerUserId={member.user.id}
          initialMembers={members}
          branches={branches.map((b) => ({ id: b.id, name: b.name }))}
          loadError={loadError}
        />
      </main>
    </>
  );
}
