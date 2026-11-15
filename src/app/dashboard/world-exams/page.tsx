import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getWorldExams } from "@/lib/worldExams/adminStats";
import { REGIONS, RIGHTS, RULES, VERDICTS, type WorldExam, type WorldExamNote } from "@/lib/worldExams/model";
import {
  filterExams,
  groupByRegion,
  parseFilters,
  revenueByCountry,
  shortlist,
  type Filters,
} from "@/lib/worldExams/view";
import { RightsBadge, SourceLinks, VerdictBadge } from "./parts";

/**
 * /dashboard/world-exams: the master list of exams worldwide screened as the
 * next PYQ Vault exam (migration 0260).
 *
 * READ-ONLY. The rows live in the database, not in code, because the repo is
 * public and the list carries rights analysis and revenue estimates; they
 * change through `npm run world-exams:load` from a file kept outside the repo.
 * Superadmin-only and dynamic, so `next build` never renders it: the data rules
 * are proven by tests/world-exams*.test.ts, the layout only in a browser.
 */
export const dynamic = "force-dynamic";

export const metadata = { title: "World exams", robots: { index: false } };

type Search = Record<string, string | string[] | undefined>;

export default async function WorldExamsPage(props: { searchParams: Promise<Search> }) {
  const searchParams = await props.searchParams;
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let data: { exams: WorldExam[]; notes: WorldExamNote[] } | null = null;
  try {
    data = await getWorldExams();
  } catch (err) {
    console.error("dashboard/world-exams:", err);
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">World exams</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Exams in other countries screened as the next one we add, with their rights, size and our verdict. Read-only:
            the rows live in the database (never in the public repo) and change through{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run world-exams:load</code>.
          </p>
        </header>

        {!data ? (
          <p role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            Could not load the world-exams list. Reload the page; if it keeps failing, the server log says why.
          </p>
        ) : data.exams.length === 0 ? (
          <p className="rounded-lg border p-4 text-sm text-muted-foreground">
            No exams loaded yet. Load them with the loader in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">scripts/world-exams/load.ts</code>.
          </p>
        ) : (
          <Body exams={data.exams} notes={data.notes} filters={parseFilters(searchParams)} />
        )}
      </main>
    </>
  );
}

function Body({ exams, notes, filters }: { exams: WorldExam[]; notes: WorldExamNote[]; filters: Filters }) {
  const top = shortlist(exams);
  const countries = new Set(exams.map((e) => e.country)).size;
  const shown = filterExams(exams, filters);
  const revenue = revenueByCountry(exams);
  const withRevenue = exams.filter((e) => e.revenue);

  return (
    <>
      <p className="max-w-3xl text-base leading-relaxed">
        <strong className="font-semibold">{exams.length}</strong> exams across{" "}
        <strong className="font-semibold">{countries}</strong> countries.{" "}
        <strong className="font-semibold">{top.length}</strong> pass all four rules and are on the shortlist.
      </p>

      <section aria-labelledby="shortlist" className="space-y-3">
        <h2 id="shortlist" className="text-lg font-semibold">
          Shortlist
        </h2>
        <ol className="space-y-3">
          {top.map((e) => (
            <li key={e.id} className="rounded-lg border bg-card p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-muted-foreground">#{e.shortlistRank}</span>
                <span className="font-semibold">{e.exam}</span>
                <span className="text-sm text-muted-foreground">{e.country}</span>
                <RightsBadge rights={e.rights} />
              </div>
              <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-medium">Why it passes</dt>
                  <dd className="text-muted-foreground">{e.whyPasses}</dd>
                </div>
                <div>
                  <dt className="font-medium">Main risk</dt>
                  <dd className="text-muted-foreground">{e.mainRisk}</dd>
                </div>
                <div>
                  <dt className="font-medium">Next step</dt>
                  <dd className="text-muted-foreground">{e.nextStep}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <details className="rounded-lg border bg-card p-4">
        <summary className="cursor-pointer font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          The four rules and the rights labels
        </summary>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
          {RULES.map((r) => (
            <li key={r.title}>
              <strong className="font-medium">{r.title}.</strong> {r.body}
            </li>
          ))}
        </ol>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          {RIGHTS.map((r) => (
            <div key={r.id} className="flex items-start gap-2">
              <dt>
                <RightsBadge rights={r.id} />
              </dt>
              <dd className="text-muted-foreground">{r.meaning}</dd>
            </div>
          ))}
        </dl>
      </details>

      <section aria-labelledby="all-exams" className="space-y-4">
        <h2 id="all-exams" className="text-lg font-semibold">
          All exams
        </h2>
        <FilterRow label="Region" name="region" filters={filters} options={REGIONS} />
        <FilterRow label="Verdict" name="verdict" filters={filters} options={VERDICTS} />
        <FilterRow label="Rights" name="rights" filters={filters} options={RIGHTS} />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {shown.length} of {exams.length}.
        </p>

        {groupByRegion(shown).map((g) => (
          <div key={g.region} className="space-y-4">
            <h3 className="text-base font-semibold">{g.label}</h3>
            {g.countries.map((c) => (
              <div key={c.country} className="overflow-x-auto rounded-lg border bg-card">
                <table className="w-full min-w-[56rem] text-left text-sm">
                  <caption className="px-3 pt-3 text-left font-semibold">{c.country}</caption>
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-3 py-2 font-medium">Exam</th>
                      <th scope="col" className="px-3 py-2 font-medium">Format</th>
                      <th scope="col" className="px-3 py-2 font-medium">Candidates</th>
                      <th scope="col" className="px-3 py-2 font-medium">Papers released</th>
                      <th scope="col" className="px-3 py-2 font-medium">Rights</th>
                      <th scope="col" className="px-3 py-2 font-medium">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {c.exams.map((e) => (
                      <tr key={e.id} className="border-t align-top">
                        <th scope="row" className="px-3 py-2 font-medium">
                          {e.exam}
                          {e.language && <div className="text-xs font-normal text-muted-foreground">{e.language}</div>}
                          {e.note && <div className="mt-1 text-xs font-normal text-muted-foreground">{e.note}</div>}
                          <SourceLinks sources={e.sources} />
                        </th>
                        <td className="px-3 py-2">{e.format}</td>
                        <td className="px-3 py-2">
                          {e.candidates}
                          {e.approximate && <div className="text-xs text-muted-foreground">approximate, from memory</div>}
                        </td>
                        <td className="px-3 py-2">{e.papersReleased}</td>
                        <td className="px-3 py-2">
                          <RightsBadge rights={e.rights} />
                          {e.rightsNote && <div className="mt-1 text-xs text-muted-foreground">{e.rightsNote}</div>}
                        </td>
                        <td className="px-3 py-2">
                          <VerdictBadge verdict={e.verdict} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
      </section>

      {revenue.length > 0 && (
        <section aria-labelledby="revenue" className="space-y-3">
          <h2 id="revenue" className="text-lg font-semibold">
            Revenue potential
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Estimates, not measurements: candidates a year × the share who pay × price. Gross USD a year, before VAT,
            payment fees and marketing.
          </p>
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">Revenue estimate per exam and per country, USD a year</caption>
              <thead className="text-xs text-muted-foreground">
                <tr>
                  <th scope="col" className="px-3 py-2 font-medium">Exam</th>
                  <th scope="col" className="px-3 py-2 text-right font-medium">Low</th>
                  <th scope="col" className="px-3 py-2 text-right font-medium">Mid</th>
                  <th scope="col" className="px-3 py-2 text-right font-medium">High</th>
                </tr>
              </thead>
              <tbody>
                {revenue.map((t) => (
                  <RevenueRows key={t.country} total={t} rows={withRevenue.filter((e) => e.country === t.country)} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {notes.map((n) => (
        <section key={n.id} aria-labelledby={`note-${n.id}`} className="space-y-2">
          <h2 id={`note-${n.id}`} className="text-lg font-semibold">
            {n.title}
          </h2>
          {n.paragraphs.map((p, i) => (
            <p key={i} className="max-w-3xl text-sm leading-relaxed">
              {p}
            </p>
          ))}
          {n.bullets.length > 0 && (
            <ul className="max-w-3xl list-disc space-y-1 pl-5 text-sm">
              {n.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
          <SourceLinks sources={n.sources} />
        </section>
      ))}
    </>
  );
}

const usd = (n: number) => `$${n >= 1000 ? `${Math.round(n / 1000)}k` : n}`;

function RevenueRows({ total, rows }: { total: { country: string; low: number; mid: number; high: number }; rows: WorldExam[] }) {
  return (
    <>
      {rows.map((e) => (
        <tr key={e.id} className="border-t">
          <th scope="row" className="px-3 py-2 font-normal">
            {e.exam} <span className="text-muted-foreground">({e.country})</span>
          </th>
          {(["low", "mid", "high"] as const).map((k) => (
            <td key={k} className="px-3 py-2 text-right tabular-nums">
              {usd(e.revenue![k].usd)}
              <div className="text-xs text-muted-foreground">
                {(e.revenue![k].share * 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}% × {e.revenue!.currency}{" "}
                {e.revenue![k].price}
              </div>
            </td>
          ))}
        </tr>
      ))}
      <tr className="border-t bg-muted/40 font-semibold">
        <th scope="row" className="px-3 py-2">
          {total.country} total
        </th>
        <td className="px-3 py-2 text-right tabular-nums">{usd(total.low)}</td>
        <td className="px-3 py-2 text-right tabular-nums">{usd(total.mid)}</td>
        <td className="px-3 py-2 text-right tabular-nums">{usd(total.high)}</td>
      </tr>
    </>
  );
}

function FilterRow({
  label,
  name,
  filters,
  options,
}: {
  label: string;
  name: keyof Filters;
  filters: Filters;
  options: readonly { id: string; label: string }[];
}) {
  const href = (value: string | undefined) => {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...filters, [name]: value })) if (v) next.set(k, v);
    const qs = next.toString();
    return qs ? `/dashboard/world-exams?${qs}` : "/dashboard/world-exams";
  };
  const current = filters[name];
  const pill = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      active ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"
    }`;
  return (
    <nav aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="w-16 text-sm text-muted-foreground">{label}</span>
      {/* Same-route query links: prefetch off, or every pill re-renders the page in the background. */}
      <Link href={href(undefined)} prefetch={false} aria-current={!current ? "page" : undefined} className={pill(!current)}>
        All
      </Link>
      {options.map((o) => (
        <Link
          key={o.id}
          href={href(o.id)}
          prefetch={false}
          aria-current={current === o.id ? "page" : undefined}
          className={pill(current === o.id)}
        >
          {o.label}
        </Link>
      ))}
    </nav>
  );
}
