import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionMember } from "@/lib/auth";
import { getMockPerformance } from "@/lib/mocks/adminStats";

export const dynamic = "force-dynamic";

export default async function MockPerformancePage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const rows = await getMockPerformance();
  const totalAttempts = rows.reduce((s, r) => s + r.count, 0);
  const withActivity = rows.filter((r) => r.count > 0).length;

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Mock Performance</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How students are doing on each published mock. Tap a mock to see every attempt.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-3">
          <StatCard kind="numeric" value={rows.length} label="Published mocks" />
          <StatCard kind="numeric" value={totalAttempts} label="Total attempts" />
          <StatCard kind="numeric" value={withActivity} label="Mocks with activity" />
        </div>

        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Mock</th>
                <th className="px-3 py-2 text-right font-medium">Attempts</th>
                <th className="hidden px-3 py-2 text-right font-medium sm:table-cell">Students</th>
                <th className="px-3 py-2 text-right font-medium">Avg</th>
                <th className="px-3 py-2 text-right font-medium">Top</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => (
                <tr key={r.slug} className="group hover:bg-accent/40">
                  <td className="px-3 py-2">
                    <Link href={`/dashboard/mocks/${r.slug}`} className="block font-medium hover:text-brand-accent">
                      {r.title}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.count}</td>
                  <td className="hidden px-3 py-2 text-right tabular-nums sm:table-cell">{r.students}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                    {r.count > 0 ? `${r.avgScore}/${r.totalMarks}` : "—"}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                    {r.count > 0 ? r.topScore : "—"}
                  </td>
                  <td className="px-2">
                    <Link href={`/dashboard/mocks/${r.slug}`} aria-label={`Attempts for ${r.title}`}>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/60 group-hover:text-muted-foreground" aria-hidden />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
