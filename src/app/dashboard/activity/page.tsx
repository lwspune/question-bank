import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getActivityShape } from "@/lib/activity/adminStats";
import { classifyUsageShape, KIND_LABELS, type UsageVerdict } from "@/lib/activity/shape";
import type { ActivityKind } from "@/lib/activity/events";

export const dynamic = "force-dynamic";

const VERDICT_STYLE: Record<UsageVerdict, string> = {
  daily: "border-emerald-500/40 bg-emerald-500/5",
  burst: "border-amber-500/40 bg-amber-500/5",
  mixed: "border-sky-500/40 bg-sky-500/5",
  insufficient: "border-muted bg-muted/30",
};

const VERDICT_LABEL: Record<UsageVerdict, string> = {
  daily: "Daily usage",
  burst: "Burst usage",
  mixed: "Mixed usage",
  insufficient: "Not enough data yet",
};

function kindLabel(kind: string): string {
  return KIND_LABELS[kind as ActivityKind] ?? kind;
}

export default async function ActivityShapePage() {
  // Platform-wide data (not org-scoped) — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const shape = await getActivityShape(90);
  const verdict = classifyUsageShape(shape);
  const maxDay = Math.max(1, ...shape.dailyActive.map((d) => d.events));
  const gap = shape.sessions.gapBuckets;
  const gapRows: { label: string; n: number }[] = [
    { label: "Next day (1)", n: gap.sameNext },
    { label: "2–3 days", n: gap.d2_3 },
    { label: "4–7 days", n: gap.d4_7 },
    { label: "8–14 days", n: gap.d8_14 },
    { label: "15+ days", n: gap.d15plus },
  ];
  const maxGap = Math.max(1, ...gapRows.map((r) => r.n));

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Usage shape</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            How signed-in students actually use the app, from the activity spine. We read this{" "}
            <span className="font-medium">before</span> building any engagement mechanic — daily
            streaks misfire on burst-shaped usage. Window: last {shape.windowDays} days.
          </p>
        </header>

        {/* The verdict — the streak-vs-goal-progress call. */}
        <section className={`rounded-lg border p-5 ${VERDICT_STYLE[verdict.verdict]}`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Verdict
            </span>
            <span className="rounded-full border bg-background px-2 py-0.5 text-xs font-semibold">
              {VERDICT_LABEL[verdict.verdict]}
            </span>
          </div>
          <p className="mt-2 font-medium">{verdict.headline}</p>
          <p className="mt-1 text-sm text-muted-foreground">{verdict.recommendation}</p>
        </section>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard kind="numeric" value={shape.activeUsers} label="Active students (90d)" />
          <StatCard kind="numeric" value={shape.active7d} label="Active last 7d" />
          <StatCard kind="numeric" value={shape.sessions.multiDayUsers} label="Returned ≥2 days" />
          <StatCard kind="numeric" value={shape.totalEvents} label="Total events" />
        </div>

        {/* Which events actually fire — the AI Tutor's "3 kinds fired zero times" check. */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">What students do</h2>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Action</th>
                  <th className="px-3 py-2 text-right font-medium">Events</th>
                  <th className="px-3 py-2 text-right font-medium">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {shape.byKind.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-3 py-4 text-center text-muted-foreground">
                      No activity in this window yet.
                    </td>
                  </tr>
                )}
                {shape.byKind.map((k) => (
                  <tr key={k.kind}>
                    <td className="px-3 py-2">{kindLabel(k.kind)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{k.events}</td>
                    <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">{k.users}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Gap distribution — the burst-vs-daily evidence behind the verdict. */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">Gap between study days</h2>
          <p className="text-xs text-muted-foreground">
            Time between consecutive days a student was active. A pile-up on “next day” = daily
            habit; a spread toward the bottom = bursts. Median:{" "}
            <span className="font-medium text-foreground">
              {shape.sessions.medianGapDays == null ? "—" : `${shape.sessions.medianGapDays} days`}
            </span>
            .
          </p>
          <div className="space-y-1.5 rounded-lg border p-4">
            {gapRows.map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-xs text-muted-foreground">{r.label}</span>
                <div className="h-4 flex-1 overflow-hidden rounded bg-muted">
                  <div
                    className="h-full rounded bg-brand"
                    style={{ width: `${(r.n / maxGap) * 100}%` }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-xs tabular-nums">{r.n}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recency — are they coming back? */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">Last seen (active students)</h2>
          <div className="grid grid-cols-4 gap-3">
            <StatCard kind="numeric" value={shape.recency.d0_1} label="0–1 days ago" />
            <StatCard kind="numeric" value={shape.recency.d2_7} label="2–7 days ago" />
            <StatCard kind="numeric" value={shape.recency.d8_30} label="8–30 days ago" />
            <StatCard kind="numeric" value={shape.recency.d31plus} label="31+ days ago" />
          </div>
        </section>

        {/* Daily active — a simple sparkline table. */}
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">Activity by day (last 30d)</h2>
          <div className="space-y-1 rounded-lg border p-4">
            {shape.dailyActive.length === 0 && (
              <p className="text-center text-sm text-muted-foreground">No activity yet.</p>
            )}
            {shape.dailyActive.map((d) => (
              <div key={d.day} className="flex items-center gap-3">
                <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">{d.day}</span>
                <div className="h-4 flex-1 overflow-hidden rounded bg-muted">
                  <div
                    className="h-full rounded bg-brand-accent"
                    style={{ width: `${(d.events / maxDay) * 100}%` }}
                  />
                </div>
                <span className="w-16 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                  {d.users}u · {d.events}e
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
