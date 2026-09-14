import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { listStudentRoster } from "@/lib/students/admin";
import StudentRosterClient from "./StudentRosterClient";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const rows = await listStudentRoster();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-7xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Registered Students</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Self-serve signups (accounts with no staff role) and how each one is using the app.
            Staff are managed under Members. &ldquo;Last active&rdquo; is the newest learning action —
            a mock, notes progress or a saved question — not a sign-in.
          </p>
        </header>

        {rows.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No students have registered yet.
          </p>
        ) : (
          <StudentRosterClient rows={rows} />
        )}
      </main>
    </>
  );
}
