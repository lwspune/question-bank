import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getSessionSuperadmin } from "@/lib/auth";
import { getHealthPageData } from "@/lib/dbhealth/adminStats";
import { THRESHOLDS, type FlagLevel } from "@/lib/dbhealth/flags";
import { bytes } from "@/lib/dbhealth/format";

export const dynamic = "force-dynamic";

const FLAG_STYLE: Record<FlagLevel, string> = {
  critical: "border-red-500/40 bg-red-500/5",
  warn: "border-amber-500/40 bg-amber-500/5",
  info: "border-sky-500/40 bg-sky-500/5",
};

const FLAG_LABEL: Record<FlagLevel, string> = {
  critical: "Critical",
  warn: "Warning",
  info: "Note",
};

function when(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
}

/** A gauge that is meaningful only against a ceiling. */
function Meter({
  label,
  value,
  max,
  display,
  note,
}: {
  label: string;
  value: number;
  max: number;
  display: string;
  note?: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const tone = pct >= 90 ? "bg-red-500" : pct >= 80 ? "bg-amber-500" : "bg-brand";
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-brand-accent">{display}</div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted" aria-hidden="true">
        <div className={`h-full ${tone}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{note ?? `${pct}% of limit`}</div>
    </div>
  );
}

export default async function DatabaseHealthPage() {
  // Platform-wide telemetry, not org-scoped — superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  const { delta, flags, history, totalSnapshots } = await getHealthPageData(30);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl p-8">
        <h1 className="text-2xl font-semibold">Database health</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Postgres reports load as running totals with no dates in them, so a single reading cannot tell
          &ldquo;this happened last month&rdquo; from &ldquo;this is happening now&rdquo;. Every figure below is the
          difference between two snapshots. Snapshots are taken daily; you can also run{" "}
          <code className="rounded bg-muted px-1 py-0.5">npm run db:health</code>.
        </p>

        {delta === null ? (
          <div className="mt-8 rounded-lg border bg-muted/30 p-6 text-sm">
            No snapshots stored yet. The first one arrives with the next scheduled run, or run{" "}
            <code className="rounded bg-muted px-1 py-0.5">npm run db:health</code> to take one now.
          </div>
        ) : (
          <>
            <p className="mt-4 text-sm text-muted-foreground">
              {delta.isFirstRun || delta.from === null ? (
                <>Only one snapshot so far — there is no window to measure yet.</>
              ) : (
                <>
                  Window: {when(delta.from)} → {when(delta.to)} ({delta.elapsedHours.toFixed(1)} hours)
                </>
              )}
            </p>

            <section className="mt-8">
              <h2 className="text-lg font-medium">Findings</h2>
              {flags.length === 0 ? (
                <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-4 text-sm">
                  Nothing outside range. This means none of the rules fired — not that nothing is wrong.
                </div>
              ) : (
                <ul className="mt-3 space-y-2">
                  {flags.map((f, i) => (
                    <li key={`${f.code}-${i}`} className={`rounded-lg border p-4 text-sm ${FLAG_STYLE[f.level]}`}>
                      <div className="font-medium">
                        {FLAG_LABEL[f.level]} · {f.code}
                      </div>
                      <p className="mt-1 text-muted-foreground">{f.message}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-medium">Capacity</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Meter
                  label="Database size"
                  value={delta.dbSizeBytes}
                  max={THRESHOLDS.dbSizeCapBytes}
                  display={bytes(delta.dbSizeBytes)}
                  note={`of ${bytes(THRESHOLDS.dbSizeCapBytes)} plan cap`}
                />
                <Meter
                  label="Largest chapter"
                  value={delta.largestGroupRows}
                  max={1000}
                  display={delta.largestGroupRows.toLocaleString("en-IN")}
                  note="of the 1000-row response cap"
                />
                <Meter
                  label="Connections"
                  value={delta.connections}
                  max={delta.maxConnections}
                  display={`${delta.connections} / ${delta.maxConnections}`}
                />
                <Meter
                  label="Cache hit rate"
                  value={delta.cacheHitPct}
                  max={100}
                  display={`${delta.cacheHitPct}%`}
                  note="higher is better"
                />
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-medium">This window</h2>
              {!delta.counters.available ? (
                <p className="mt-3 rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Not measurable — {delta.counters.reason}
                </p>
              ) : (
                <dl className="mt-3 grid gap-4 sm:grid-cols-4">
                  {[
                    {
                      k: "Disk spill",
                      v: bytes(delta.tempBytesDelta),
                      sub: delta.windowTooShortForRates
                        ? "window too short for a daily rate"
                        : `${bytes(delta.tempBytesPerDay)}/day`,
                    },
                    { k: "Temp files", v: String(delta.tempFilesDelta ?? "—") },
                    { k: "Deadlocks", v: String(delta.deadlocksDelta ?? "—") },
                    { k: "Rolled-back txns", v: String(delta.rollbacksDelta ?? "—") },
                  ].map((s) => (
                    <div key={s.k} className="rounded-lg border p-4">
                      <dt className="text-sm text-muted-foreground">{s.k}</dt>
                      <dd className="mt-1 text-xl font-semibold">{s.v}</dd>
                      {s.sub ? <dd className="mt-1 text-xs text-muted-foreground">{s.sub}</dd> : null}
                    </div>
                  ))}
                </dl>
              )}
            </section>

            {delta.counters.available && delta.queries.some((q) => q.windowKnown && q.callsDelta > 0) ? (
              <section className="mt-8">
                <h2 className="text-lg font-medium">Busiest queries in this window</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ranked by activity in the window, never by lifetime total — otherwise a query fixed months ago
                  tops the list forever. Queries first seen in this snapshot are left out: their counters are
                  lifetime totals, so there is no honest way to say what they did in this window.
                </p>
                <div className="mt-3 overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-left">
                      <tr>
                        <th className="p-3 font-medium">Calls</th>
                        <th className="p-3 font-medium">Spill / call</th>
                        <th className="p-3 font-medium">Mean time</th>
                        <th className="p-3 font-medium">Query</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delta.queries
                        .filter((q) => q.windowKnown && q.callsDelta > 0)
                        .slice(0, 10)
                        .map((q) => (
                          <tr key={q.queryid} className="border-t align-top">
                            <td className="p-3 tabular-nums">{q.callsDelta.toLocaleString("en-IN")}</td>
                            <td className="p-3 tabular-nums">{bytes(q.tempBytesPerCall)}</td>
                            <td className="p-3 tabular-nums">{(q.meanMsPerCall ?? 0).toFixed(1)} ms</td>
                            <td className="p-3">
                              <code className="block max-w-xl truncate font-mono text-xs text-muted-foreground">
                                {q.label}
                              </code>
                              {q.suspectedReset ? (
                                <span className="mt-1 inline-block text-xs text-amber-600 dark:text-amber-400">
                                  counter restarted — under-counted
                                </span>
                              ) : null}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {delta.queries.filter((q) => !q.windowKnown).length > 0 ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {delta.queries.filter((q) => !q.windowKnown).length} newly-tracked queries are omitted — they were
                    first seen in this snapshot, so their counters are totals since the statistics were last reset, not
                    this window&rsquo;s activity.
                  </p>
                ) : null}
              </section>
            ) : null}

            <section className="mt-8">
              <h2 className="text-lg font-medium">History</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Last {history.length} of {totalSnapshots} snapshots. A blank rate means that window was too short,
                or the statistics were reset inside it.
              </p>
              <div className="mt-3 overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left">
                    <tr>
                      <th className="p-3 font-medium">Taken</th>
                      <th className="p-3 font-medium">Size</th>
                      <th className="p-3 font-medium">Growth</th>
                      <th className="p-3 font-medium">Spill / day</th>
                      <th className="p-3 font-medium">Largest chapter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h) => (
                      <tr key={h.capturedAt} className="border-t">
                        <td className="p-3 whitespace-nowrap">{when(h.capturedAt)}</td>
                        <td className="p-3 tabular-nums">{bytes(h.dbSizeBytes)}</td>
                        <td className="p-3 tabular-nums">
                          {h.dbSizeGrowthBytes === null ? "—" : bytes(h.dbSizeGrowthBytes)}
                        </td>
                        <td className="p-3 tabular-nums">
                          {h.tempBytesPerDay === null ? "—" : `${bytes(h.tempBytesPerDay)}/day`}
                        </td>
                        <td className="p-3 tabular-nums">{h.largestGroupRows.toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
