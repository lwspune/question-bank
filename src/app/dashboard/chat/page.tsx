import { redirect } from "next/navigation";
import { getSessionSuperadmin } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { listChatInteractions } from "@/lib/chat/interactionsAdmin";
import { summarizeChatInteractions } from "@/lib/chat/interactions";

export const dynamic = "force-dynamic";

export default async function ChatUsagePage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const summary = summarizeChatInteractions(await listChatInteractions());
  const askRate =
    summary.totalOpens > 0 ? `${Math.round((summary.totalClicks / summary.totalOpens) * 100)}%` : "—";

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">V usage</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How often visitors open V and which questions they ask. Counts are a floor — a
            blocked or dropped request leaves no row.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <StatCard kind="numeric" value={summary.totalOpens} label="Times opened" />
          <StatCard kind="numeric" value={summary.totalClicks} label="Questions asked" />
          <StatCard kind="text" value={askRate} label="Questions per open" />
        </div>

        <section className="rounded-lg border">
          <h2 className="border-b px-4 py-3 text-sm font-semibold">Questions by clicks</h2>
          {summary.byQuestion.length === 0 ? (
            <p className="px-4 py-6 text-sm text-muted-foreground">No questions asked yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground">
                  <th scope="col" className="px-4 py-2 font-medium">Question</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {summary.byQuestion.map((q) => (
                  <tr key={q.id} className="border-t">
                    <td className="px-4 py-2">{q.label}</td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums">
                      {q.count.toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
}
