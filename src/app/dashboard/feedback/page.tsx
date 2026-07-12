import Link from "next/link";
import { redirect } from "next/navigation";
import { Lightbulb, MessageSquareHeart } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionMember } from "@/lib/auth";
import { getFeedbackOverview, type FeedbackItem } from "@/lib/feedback/adminStats";

export const dynamic = "force-dynamic";

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default async function FeedbackDashboardPage() {
  const member = await getSessionMember();
  if (!member) redirect("/login");
  if (member.role !== "ADMIN") redirect("/browse");

  const { nps, npsComments, featureRequests } = await getFeedbackOverview();

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-8 px-6 py-8">
        <div>
          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
            ← Dashboard
          </Link>
          <h1 className="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <MessageSquareHeart className="h-6 w-6 text-brand-accent" aria-hidden />
            Feedback
          </h1>
        </div>

        {/* NPS */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground/80">Net Promoter Score</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard kind="numeric" value={nps.score} label="NPS" />
            <StatCard kind="text" value={`${nps.promoters}`} label="Promoters (9–10)" />
            <StatCard kind="text" value={`${nps.passives}`} label="Passives (7–8)" />
            <StatCard kind="text" value={`${nps.detractors}`} label="Detractors (0–6)" />
          </div>
          {nps.count === 0 && (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No NPS responses yet — the prompt shows to students after 2 completed mocks.
            </p>
          )}
          {npsComments.length > 0 && (
            <ul className="space-y-2">
              {npsComments.map((c, i) => (
                <NpsComment key={i} c={c} />
              ))}
            </ul>
          )}
        </section>

        {/* Feature requests */}
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <Lightbulb className="h-4 w-4" aria-hidden />
            Feature requests ({featureRequests.length})
          </h2>
          {featureRequests.length === 0 ? (
            <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              No suggestions yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {featureRequests.map((f, i) => (
                <li key={i} className="rounded-lg border bg-card p-3 text-sm">
                  <p className="text-foreground">{f.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {f.who} · {fmtDate(f.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function NpsComment({ c }: { c: FeedbackItem }) {
  const tone =
    c.score != null && c.score >= 9
      ? "text-emerald-700 dark:text-emerald-400"
      : c.score != null && c.score <= 6
        ? "text-red-700 dark:text-red-400"
        : "text-muted-foreground";
  return (
    <li className="rounded-lg border bg-card p-3 text-sm">
      <div className="flex items-start gap-2">
        <span className={`shrink-0 font-mono text-xs font-semibold tabular-nums ${tone}`}>
          {c.score}
        </span>
        <div className="min-w-0">
          <p className="text-foreground">{c.message}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {c.who} · {fmtDate(c.createdAt)}
          </p>
        </div>
      </div>
    </li>
  );
}
