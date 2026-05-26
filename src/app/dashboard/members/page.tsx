import { redirect } from "next/navigation";
import { getSessionMember } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import { listMembers } from "@/lib/members/admin";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const result = await listMembers(member.orgId);
  const members = result.kind === "ok" ? result.members : [];
  const loadError = result.kind === "error" ? result.message : null;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Members</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {member.orgName} · Manage admins and teachers who can edit
            questions
          </p>
        </header>

        <MembersClient
          orgName={member.orgName}
          callerUserId={member.user.id}
          initialMembers={members}
          loadError={loadError}
        />
      </main>
    </>
  );
}
