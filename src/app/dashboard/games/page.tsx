import Link from "next/link";
import { redirect } from "next/navigation";
import { ExternalLink } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import { SourceLinks, linkClass } from "@/app/dashboard/world-exams/parts";
import { getSessionSuperadmin } from "@/lib/auth";
import { getExamBySlug } from "@/lib/exam/examContext";
import { GOAL_LABEL } from "@/lib/exam/examGoals";
import { getGames } from "@/lib/games/adminStats";
import {
  EVIDENCE,
  GATE_VERDICTS,
  MECHANICS,
  PLATFORMS,
  STRENGTHS,
  SUBJECTS,
  type Game,
  type GameNote,
} from "@/lib/games/model";
import { buildMatrix, filterGames, gateCounts, parseFilters, sortGames, type Filters } from "@/lib/games/view";
import { EvidenceBadge, GateBadge, badge } from "./parts";

/**
 * /dashboard/games: learning games that already exist, mapped to our exams
 * and subjects (migration 0268), so we can keep revisiting what is out there.
 *
 * READ-ONLY. The rows live in the database, not in code, because the owner
 * keeps the list private and the repo is public; they change through
 * `npm run games:load` from a file kept outside the repo. Superadmin-only and
 * dynamic, so `next build` never renders it: the data rules are proven by
 * tests/games-catalogue*.test.ts, the layout only in a browser.
 */
export const dynamic = "force-dynamic";

export const metadata = { title: "Learning games", robots: { index: false } };

type Search = Record<string, string | string[] | undefined>;

export default async function GamesPage(props: { searchParams: Promise<Search> }) {
  const searchParams = await props.searchParams;
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let data: { games: Game[]; notes: GameNote[] } | null = null;
  try {
    data = await getGames();
  } catch (err) {
    console.error("dashboard/games:", err);
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Learning games</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Games that already exist, which of our exams and subjects they fit, what the research says, and whether
            they pass our engagement gate. Read-only: the rows live in the database (never in the public repo) and
            change through <code className="rounded bg-muted px-1 py-0.5 text-xs">npm run games:load</code>.
          </p>
        </header>

        {!data ? (
          <p role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            Could not load the games list. Reload the page; if it keeps failing, the server log says why.
          </p>
        ) : data.games.length === 0 ? (
          <p className="rounded-lg border p-4 text-sm text-muted-foreground">
            No games loaded yet. Load them with the loader in{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">scripts/games/load.ts</code>.
          </p>
        ) : (
          <Body games={data.games} notes={data.notes} filters={parseFilters(searchParams)} />
        )}
      </main>
    </>
  );
}

function Body({ games, notes, filters }: { games: Game[]; notes: GameNote[]; filters: Filters }) {
  const counts = gateCounts(games);
  const matrix = buildMatrix(games);
  const shown = sortGames(filterGames(games, filters));
  const subjects = new Set(games.flatMap((g) => g.subjects)).size;

  return (
    <>
      <p className="max-w-3xl text-base leading-relaxed">
        <strong className="font-semibold">{games.length}</strong> games across{" "}
        <strong className="font-semibold">{subjects}</strong> subjects.{" "}
        <strong className="font-semibold">{counts.passes}</strong> pass our gate,{" "}
        <strong className="font-semibold">{counts.caution}</strong> need a second look and{" "}
        <strong className="font-semibold">{counts.fails}</strong> fail it.
      </p>

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

      <section aria-labelledby="matrix" className="space-y-3">
        <h2 id="matrix" className="text-lg font-semibold">
          Subjects by exam goal
        </h2>
        <p className="max-w-3xl text-sm text-muted-foreground">
          Each cell lists the games whose skill fits that subject for that kind of exam. Bold = core (the game&apos;s
          skill is a question type the exam asks). An empty cell is a gap: nothing out there fits it yet.
        </p>
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <caption className="sr-only">Games per subject and exam goal</caption>
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">Subject</th>
                {matrix.goals.map((g) => (
                  <th key={g} scope="col" className="px-3 py-2 font-medium">
                    {GOAL_LABEL[g]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((r) => (
                <tr key={r.subject} className="border-t align-top">
                  <th scope="row" className="px-3 py-2 font-medium">
                    {r.label}
                  </th>
                  {matrix.goals.map((g) => (
                    <td key={g} className="px-3 py-2">
                      {r.cells[g].length === 0 ? (
                        <span className="text-xs text-muted-foreground">None</span>
                      ) : (
                        <ul className="space-y-0.5">
                          {r.cells[g].map((c) => (
                            <li key={c.id}>
                              <a
                                href={`#game-${c.id}`}
                                className={`${linkClass} ${c.strength === "core" ? "font-semibold" : "text-muted-foreground"}`}
                              >
                                {c.name}
                              </a>
                              {c.strength === "core" && <span className="sr-only"> (core)</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="all-games" className="space-y-4">
        <h2 id="all-games" className="text-lg font-semibold">
          All games
        </h2>
        <FilterRow label="Subject" name="subject" filters={filters} options={SUBJECTS} />
        <FilterRow
          label="Goal"
          name="goal"
          filters={filters}
          options={matrix.goals.map((g) => ({ id: g, label: GOAL_LABEL[g] }))}
        />
        <FilterRow label="Gate" name="gate" filters={filters} options={GATE_VERDICTS} />
        <FilterRow label="Evidence" name="evidence" filters={filters} options={EVIDENCE} />
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {shown.length} of {games.length}, strongest evidence first.
        </p>
        <ul className="space-y-3">
          {shown.map((g) => (
            <GameCard key={g.id} g={g} />
          ))}
        </ul>
      </section>
    </>
  );
}

const label = <T extends { id: string; label: string }>(list: readonly T[], id: string) =>
  list.find((x) => x.id === id)?.label ?? id;

function GameCard({ g }: { g: Game }) {
  const meta = [g.maker, label(PLATFORMS, g.platform), g.price, g.audience && `Age ${g.audience}`].filter(Boolean);
  return (
    <li id={`game-${g.id}`} className="scroll-mt-20 rounded-lg border bg-card p-4">
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={g.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-semibold ${linkClass}`}
        >
          {g.name}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <GateBadge gate={g.gate} />
        <EvidenceBadge evidence={g.evidence} />
        {g.vendorFunded && <span className={`${badge} border-border text-muted-foreground`}>Maker-funded study</span>}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{meta.join(" · ")}</p>
      <p className="mt-2 text-sm">{g.howItPlays}</p>

      <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-medium">Subjects</dt>
          <dd className="text-muted-foreground">{g.subjects.map((s) => label(SUBJECTS, s)).join(", ")}</dd>
        </div>
        <div>
          <dt className="font-medium">Mechanics</dt>
          <dd className="text-muted-foreground">{g.mechanics.map((m) => label(MECHANICS, m)).join(", ")}</dd>
        </div>
        {g.evidenceNote && (
          <div>
            <dt className="font-medium">Evidence</dt>
            <dd className="text-muted-foreground">{g.evidenceNote}</dd>
          </div>
        )}
        {g.scale && (
          <div>
            <dt className="font-medium">Scale</dt>
            <dd className="text-muted-foreground">
              {g.scale}
              {g.scaleAsOf && ` (as of ${g.scaleAsOf})`}
            </dd>
          </div>
        )}
        {g.borrow && (
          <div className="sm:col-span-2">
            <dt className="font-medium">What we could borrow</dt>
            <dd className="text-muted-foreground">{g.borrow}</dd>
          </div>
        )}
      </dl>

      {g.fits.length > 0 && (
        <div className="mt-3">
          <h3 className="text-sm font-medium">Fits our exams</h3>
          <ul className="mt-1 space-y-1 text-sm">
            {g.fits.map((f) => (
              <li key={`${f.goal}/${f.subject}`}>
                <span className="font-medium">
                  {GOAL_LABEL[f.goal]} · {label(SUBJECTS, f.subject)}
                </span>{" "}
                <span className="text-xs text-muted-foreground">({label(STRENGTHS, f.strength)})</span>: {f.why}
                {f.exams.length > 0 && (
                  <span className="text-muted-foreground">
                    {" "}
                    ({f.exams.map((s) => getExamBySlug(s)?.displayName ?? s).join(", ")})
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <SourceLinks sources={g.sources} />
      <p className="mt-2 text-xs text-muted-foreground">Checked on {g.checkedOn}</p>
    </li>
  );
}

function FilterRow({
  label: rowLabel,
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
    return qs ? `/dashboard/games?${qs}#all-games` : "/dashboard/games#all-games";
  };
  const current = filters[name];
  const pill = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
      active ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"
    }`;
  return (
    <nav aria-label={`Filter by ${rowLabel.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="w-20 text-sm text-muted-foreground">{rowLabel}</span>
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
