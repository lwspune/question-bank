import { Check, EyeOff, HelpCircle, Minus, X } from "lucide-react";
import {
  FEATURE_GROUPS,
  ideaScore,
  rankIdeas,
  type Audience,
  type CompetitorMark,
  type Feature,
  type IdeaStatus,
  type OurStatus,
} from "@/lib/competitors/model";

/** One audience of the competitor analysis. Server component; rendered by /dashboard/competitors. */

const MARK_VIEW: Record<CompetitorMark["mark"], { label: string; icon: typeof Check; tone: string }> = {
  yes: { label: "Yes", icon: Check, tone: "text-emerald-700 dark:text-emerald-400" },
  partial: { label: "Partly", icon: Minus, tone: "text-amber-700 dark:text-amber-400" },
  no: { label: "No", icon: X, tone: "text-red-700 dark:text-red-400" },
  unknown: { label: "Not seen", icon: HelpCircle, tone: "text-muted-foreground" },
};

const OURS_VIEW: Record<OurStatus, { label: string; icon: typeof Check; tone: string }> = {
  have: { label: "Have", icon: Check, tone: "text-emerald-700 dark:text-emerald-400" },
  hidden: { label: "Have, not found", icon: EyeOff, tone: "text-amber-700 dark:text-amber-400" },
  partial: { label: "Partly", icon: Minus, tone: "text-amber-700 dark:text-amber-400" },
  missing: { label: "Missing", icon: X, tone: "text-red-700 dark:text-red-400" },
};

const STATUS_LABEL: Record<IdeaStatus, string> = {
  proposed: "Proposed",
  planned: "Planned",
  building: "Building",
  shipped: "Shipped",
  declined: "Declined",
};

const KIND_LABEL = { app: "App", coaching: "Coaching", "content-site": "Content site", books: "Books" } as const;

function fmtDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const linkClass =
  "text-brand-accent underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm";

function MarkCell({ m, competitor, feature }: { m: CompetitorMark; competitor: string; feature: string }) {
  const v = MARK_VIEW[m.mark];
  const Icon = v.icon;
  const label = (
    <span className={`inline-flex items-center gap-1 font-medium ${v.tone}`}>
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {v.label}
    </span>
  );
  return (
    <td className="px-3 py-2 align-top">
      {m.evidence ? (
        <a
          href={m.evidence}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${competitor}, ${feature}: ${v.label}. Source, opens in a new tab`}
        >
          {label}
        </a>
      ) : (
        label
      )}
      {m.note && <div className="mt-0.5 text-xs text-muted-foreground">{m.note}</div>}
    </td>
  );
}

function OursCell({ f }: { f: Feature }) {
  const v = OURS_VIEW[f.ours];
  const Icon = v.icon;
  return (
    <td className="bg-brand/5 px-3 py-2 align-top">
      <span className={`inline-flex items-center gap-1 font-medium ${v.tone}`}>
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {v.label}
      </span>
      {f.oursWhere && <div className="mt-0.5 text-xs text-muted-foreground">{f.oursWhere}</div>}
      {f.oursNote && <div className="mt-0.5 text-xs text-muted-foreground">{f.oursNote}</div>}
    </td>
  );
}

export default function AudienceView({ a }: { a: Audience }) {
  const tally = (s: OurStatus) => a.features.filter((f) => f.ours === s).length;
  const ideas = rankIdeas(a.ideas);
  const featureName = new Map(a.features.map((f) => [f.id, f.name]));

  return (
    <>
      <section className="space-y-2 rounded-lg border p-5">
        <h2 className="text-sm font-semibold">Audience: {a.name}</h2>
        <p className="text-sm text-muted-foreground">{a.whyPicked}</p>
        <p className="text-xs text-muted-foreground">
          Exams: {a.exams.join(", ")} · Competitor facts read {fmtDate(a.checkedOn)}. &quot;Not seen&quot; means we
          could not see it, not that they lack it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">The competitors</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {a.competitors.map((c) => (
            <div key={c.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-medium ${linkClass}`}
                  aria-label={`${c.name}, opens in a new tab`}
                >
                  {c.name}
                </a>
                <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">{KIND_LABEL[c.kind]}</span>
              </div>
              <p className="mt-1 text-xs font-medium">{c.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold">Feature by feature</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Us: {tally("have")} have · {tally("hidden")} have but students do not find · {tally("partial")} partly ·{" "}
            {tally("missing")} missing. Tap a competitor&apos;s mark to open its source.
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[56rem] border-collapse text-sm">
            <caption className="sr-only">
              Features of {a.name} competitors compared with PYQ Vault, grouped by kind
            </caption>
            <thead>
              <tr className="border-b bg-muted/50 text-left text-xs">
                <th scope="col" className="sticky left-0 z-10 w-56 bg-muted px-3 py-2 font-semibold">
                  Feature
                </th>
                <th scope="col" className="bg-brand/10 px-3 py-2 font-semibold">
                  PYQ Vault
                </th>
                {a.competitors.map((c) => (
                  <th key={c.id} scope="col" className="px-3 py-2 font-semibold">
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            {FEATURE_GROUPS.map((g) => {
              const rows = a.features.filter((f) => f.group === g.id);
              if (rows.length === 0) return null;
              return (
                <tbody key={g.id}>
                  <tr className="border-b bg-muted/30">
                    <th
                      scope="colgroup"
                      colSpan={a.competitors.length + 2}
                      className="px-3 py-1.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                    >
                      {g.label}
                    </th>
                  </tr>
                  {rows.map((f) => (
                    <tr key={f.id} className="border-b last:border-b-0">
                      <th scope="row" className="sticky left-0 z-10 bg-card px-3 py-2 text-left align-top font-medium">
                        {f.name}
                      </th>
                      <OursCell f={f} />
                      {a.competitors.map((c) => (
                        <MarkCell key={c.id} m={f.marks[c.id]} competitor={c.name} feature={f.name} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              );
            })}
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-sm font-semibold">Shortlist, best first</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Score = demand × fit ÷ cost, each 1 to 5. Every idea still goes through a plan before any build.
          </p>
        </div>
        <ol className="space-y-3">
          {ideas.map((i, n) => (
            <li key={i.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="font-medium">
                  {n + 1}. {i.title}
                </h3>
                <span className="rounded bg-muted px-2 py-0.5 text-xs">{STATUS_LABEL[i.status]}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Score {ideaScore(i).toFixed(1)}</span> · demand{" "}
                {i.demand} · fit {i.fit} · cost {i.cost} · {i.featureIds.map((id) => featureName.get(id)).join(", ")}
              </p>
              <p className="mt-2 text-sm">{i.why}</p>
              <ul className="mt-2 list-disc space-y-0.5 pl-5 text-xs text-muted-foreground">
                {i.demandEvidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm">
                <span className="font-medium">Next:</span> {i.next}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {a.decidedAgainst.length > 0 && (
        <section className="space-y-2 rounded-lg border p-5">
          <h2 className="text-sm font-semibold">Decided against, even though rivals have it</h2>
          <ul className="space-y-2 text-sm">
            {a.decidedAgainst.map((d) => (
              <li key={d.featureId}>
                <span className="font-medium">{featureName.get(d.featureId)}:</span>{" "}
                <span className="text-muted-foreground">{d.reason}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="space-y-2 rounded-lg border p-5">
        <h2 className="text-sm font-semibold">What we learned</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {a.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      {a.toCheckByHand.length > 0 && (
        <section className="space-y-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-5">
          <h2 className="text-sm font-semibold">Still to check by hand</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {a.toCheckByHand.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
