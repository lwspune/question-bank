import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionMember } from "@/lib/auth";
import { listStudents } from "@/lib/students/admin";

export const dynamic = "force-dynamic";

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default async function StudentsPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const students = await listStudents();
  const googleCount = students.filter((s) => s.provider === "Google").length;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Registered Students</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Self-serve signups (accounts with no staff role). Staff are managed under Members.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3">
          <StatCard kind="numeric" value={students.length} label="Students" />
          <StatCard kind="numeric" value={googleCount} label="Google sign-in" />
          <StatCard kind="numeric" value={students.length - googleCount} label="Email sign-in" />
        </div>

        {students.length === 0 ? (
          <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No students have registered yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[480px] text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Student</th>
                  <th className="px-3 py-2 text-left font-medium">Sign-in</th>
                  <th className="px-3 py-2 text-left font-medium">Registered</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map((s) => (
                  <tr key={s.id} className="group hover:bg-accent/40">
                    <td className="max-w-[18rem] px-3 py-2">
                      <Link href={`/dashboard/students/${s.id}`} className="block min-w-0">
                        <span className="block truncate font-medium group-hover:text-brand-accent" title={s.name}>{s.name}</span>
                        {s.name !== s.email && (
                          <span className="block truncate text-xs text-muted-foreground" title={s.email}>{s.email}</span>
                        )}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{s.provider}</td>
                    <td className="px-3 py-2 text-muted-foreground">{fmtDate(s.createdAt)}</td>
                    <td className="px-2">
                      <Link href={`/dashboard/students/${s.id}`} aria-label={`Open ${s.name}`}>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-muted-foreground" aria-hidden />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
