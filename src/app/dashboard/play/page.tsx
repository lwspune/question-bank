import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import StatCard from "@/app/dashboard/StatCard";
import { getSessionSuperadmin } from "@/lib/auth";
import { createTypedAdminClient } from "@/lib/supabase/admin";
import { loadPlayStats } from "@/lib/play/adminQuery";
import {
  EASY_FIRST_TRY_PCT,
  GAME_LABEL,
  HARD_CLEAR_PCT,
  HINT_MIN_FIRST_TRIES,
  PER_DAY_DAYS,
  type PlayStats,
} from "@/lib/play/adminStats";
import { PLAY_PLAYERS_MIN } from "@/lib/growth/registry";

/**
 * /dashboard/play: who plays the /play games and how the levels are pitched,
 * from user_activity play_round rows (migration 0267). Signed-in students only,
 * staff left out. Names, so superadmin only. Dynamic and auth-gated, so `next
 * build` never renders it: the numbers are proven by
 * tests/play-admin-stats.test.ts and `npm run play:smoke`, the layout only in
 * a browser.
 */
export const dynamic = "force-dynamic";

export const metadata = { title: "Play", robots: { index: false } };

const NONE = "n/a";

function fmtTime(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso));
}

function fmtDay(day: string): string {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "UTC", weekday: "short", day: "numeric", month: "short" }).format(
    new Date(`${day}T00:00:00Z`)
  );
}

function pctText(v: number | null): string {
  return v === null ? NONE : `${v}%`;
}

const th = "px-3 py-2 text-left font-medium";
const thR = "px-3 py-2 text-right font-medium";
const td = "px-3 py-2";
const tdR = "px-3 py-2 text-right tabular-nums";

export default async function PlayDashboardPage() {
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let stats: PlayStats | null = null;
  try {
    stats = await loadPlayStats(createTypedAdminClient());
  } catch (err) {
    console.error("dashboard/play:", err);
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Play</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Rounds of the{" "}
            <Link href="/play" className="underline underline-offset-2 hover:text-foreground">
              /play
            </Link>{" "}
            games by signed-in students (staff left out). Times are India time. A round played signed out writes no
            row here: Vercel counts those as <code className="rounded bg-muted px-1 py-0.5 text-xs">play_round_end</code>.
          </p>
        </header>

        {!stats ? (
          <p role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            Could not load the rounds. Reload the page; if it keeps failing, the server log says why.
          </p>
        ) : (
          <Body s={stats} />
        )}
      </main>
    </>
  );
}

function Body({ s }: { s: PlayStats }) {
  const maxDay = Math.max(1, ...s.perDay.map((d) => d.rounds));
  const e = s.experiment;
  return (
    <>
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Summary">
        <StatCard kind="numeric" value={s.summary.players} label="Players" />
        <StatCard kind="numeric" value={s.summary.rounds} label="Rounds" />
        <StatCard kind="numeric" value={s.summary.roundsToday} label={`Rounds today (${s.summary.playersToday} players)`} />
        <StatCard kind="numeric" value={s.summary.cameBack} label="Played on 2+ days" />
      </section>
      <p className="-mt-4 text-xs text-muted-foreground">
        Last round: {s.summary.lastRoundAt ? fmtTime(s.summary.lastRoundAt) : "none yet"}
        {s.games.length > 0 && <> · {s.games.map((g) => `${g.label} ${g.rounds} rounds, ${g.players} players`).join(" · ")}</>}
      </p>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Does playing lead to more study?</h2>
        <div className="rounded-lg border bg-card p-4 text-sm">
          <p>
            Players: <span className="font-medium tabular-nums">{e.players}</span> of the {PLAY_PLAYERS_MIN} the{" "}
            <Link href="/dashboard/growth" className="underline underline-offset-2 hover:text-foreground">
              play-games
            </Link>{" "}
            readout waits for. Back on a second day: {pctText(e.cameBackPct)}.
          </p>
          <p className="mt-2">
            {e.compared === 0 ? (
              <span className="text-muted-foreground">
                No player is 7 days past their first round yet, so nothing to compare.
              </span>
            ) : (
              <>
                {e.compared} {e.compared === 1 ? "player is" : "players are"} 7 days past their first round. Median
                study days: <span className="font-medium tabular-nums">{e.medianBefore ?? NONE}</span> in the week
                before, <span className="font-medium tabular-nums">{e.medianAfter ?? NONE}</span> in the week after.{" "}
                {e.studiedMore} studied more, {e.studiedLess} less, {e.compared - e.studiedMore - e.studiedLess} the
                same.
              </>
            )}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Study = mocks, bank answers, drills and notes checkpoints, counted in days (India time), as{" "}
            <code className="rounded bg-muted px-1 py-0.5">scripts/play/readout.sql</code> does.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Calculation levels</h2>
        <p className="text-xs text-muted-foreground">
          A first try is a player&apos;s first round on that level. With {HINT_MIN_FIRST_TRIES}+ first tries, a level is
          marked easy when {EASY_FIRST_TRY_PCT}%+ of first tries clear it, and hard when under {HARD_CLEAR_PCT}% of
          its rounds clear. Targets live in <code className="rounded bg-muted px-1 py-0.5">src/lib/play/levels.ts</code>.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className={th}>Level</th>
                <th className={thR}>Rounds</th>
                <th className={thR}>Players</th>
                <th className={thR}>Cleared</th>
                <th className={thR}>First try cleared</th>
                <th className={thR}>Median right</th>
                <th className={thR}>Target</th>
                <th className={thR}>Median accuracy</th>
                <th className={th}>Target looks</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {s.levels.map((l) => (
                <tr key={l.id} className={l.rounds === 0 ? "text-muted-foreground" : undefined}>
                  <td className={td}>
                    {l.id}. {l.name}
                  </td>
                  <td className={tdR}>{l.rounds}</td>
                  <td className={tdR}>{l.players}</td>
                  <td className={tdR}>
                    {l.cleared} ({pctText(l.clearedPct)})
                  </td>
                  <td className={tdR}>
                    {l.firstTryCleared} of {l.firstTries}
                  </td>
                  <td className={tdR}>{l.medianCorrect ?? NONE}</td>
                  <td className={tdR}>{l.target}</td>
                  <td className={tdR}>{pctText(l.medianAccuracyPct)}</td>
                  <td className={td}>
                    {l.hint === "easy" ? (
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900 dark:bg-amber-900/40 dark:text-amber-100">
                        Easy: raise it
                      </span>
                    ) : l.hint === "hard" ? (
                      <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-900 dark:bg-red-900/40 dark:text-red-100">
                        Hard: lower it
                      </span>
                    ) : l.firstTries > 0 && l.firstTries < HINT_MIN_FIRST_TRIES ? (
                      <span className="text-xs text-muted-foreground">Too few tries</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {(s.wordBuilder.rounds > 0 || s.dailyWord.rounds > 0) && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold">English games</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {s.wordBuilder.rounds > 0 && (
              <div className="rounded-lg border bg-card p-4 text-sm">
                <p className="font-medium">{GAME_LABEL.word_builder}</p>
                <p className="mt-1 text-muted-foreground">
                  {s.wordBuilder.rounds} rounds · median {s.wordBuilder.medianCorrect ?? NONE} of 10 right first try ·{" "}
                  {s.wordBuilder.mastered} words mastered
                </p>
              </div>
            )}
            {s.dailyWord.rounds > 0 && (
              <div className="rounded-lg border bg-card p-4 text-sm">
                <p className="font-medium">{GAME_LABEL.daily_word}</p>
                <p className="mt-1 text-muted-foreground">
                  {s.dailyWord.rounds} played · {s.dailyWord.solved} solved ({pctText(s.dailyWord.solvedPct)}) · median{" "}
                  {s.dailyWord.medianGuesses ?? NONE} guesses when solved
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Rounds per day (last {PER_DAY_DAYS} days)</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className={th}>Day</th>
                <th className={thR}>Rounds</th>
                <th className={thR}>Players</th>
                <th className={`${th} w-1/2`}>
                  <span className="sr-only">Bar</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {s.perDay.map((d) => (
                <tr key={d.day} className={d.rounds === 0 ? "text-muted-foreground" : undefined}>
                  <td className={`${td} whitespace-nowrap`}>{fmtDay(d.day)}</td>
                  <td className={tdR}>{d.rounds}</td>
                  <td className={tdR}>{d.players}</td>
                  <td className={td}>
                    <div
                      aria-hidden
                      className="h-2 rounded bg-brand"
                      style={{ width: `${(100 * d.rounds) / maxDay}%`, minWidth: d.rounds ? 4 : 0 }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Players</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className={th}>Student</th>
                <th className={th}>First round</th>
                <th className={th}>Last round</th>
                <th className={thR}>Rounds</th>
                <th className={thR}>Days</th>
                <th className={th}>Games</th>
                <th className={thR}>Top level</th>
                <th className={thR}>Levels cleared</th>
                <th className={thR}>Study days before / after</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {s.players.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-4 text-center text-muted-foreground">
                    No signed-in student has played yet.
                  </td>
                </tr>
              )}
              {s.players.map((p) => (
                <tr key={p.userId}>
                  <td className={td}>
                    <Link
                      href={`/dashboard/students/${p.userId}`}
                      prefetch={false}
                      className="underline-offset-2 hover:underline"
                    >
                      {p.name}
                    </Link>
                  </td>
                  <td className={`${td} whitespace-nowrap`}>{fmtTime(p.firstRoundAt)}</td>
                  <td className={`${td} whitespace-nowrap`}>{fmtTime(p.lastRoundAt)}</td>
                  <td className={tdR}>{p.rounds}</td>
                  <td className={tdR}>{p.days}</td>
                  <td className={td}>{p.games.map((g) => GAME_LABEL[g]).join(", ")}</td>
                  <td className={tdR}>{p.topLevel ?? NONE}</td>
                  <td className={tdR}>{p.levelsCleared}</td>
                  <td className={tdR}>
                    {p.studyBefore} / {p.studyAfter}
                    {!p.weekAfterDone && <span className="ml-1 text-xs text-muted-foreground">(week not over)</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold">Latest rounds</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className={th}>When</th>
                <th className={th}>Student</th>
                <th className={th}>Game</th>
                <th className={th}>Result</th>
                <th className={th}>Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {s.recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-muted-foreground">
                    No rounds yet.
                  </td>
                </tr>
              )}
              {s.recent.map((r, i) => (
                <tr key={`${r.at}-${r.userId}-${i}`}>
                  <td className={`${td} whitespace-nowrap`}>{fmtTime(r.at)}</td>
                  <td className={td}>{r.name}</td>
                  <td className={td}>{GAME_LABEL[r.game]}</td>
                  <td className={td}>{r.result}</td>
                  <td className={td}>
                    {r.cleared === true ? (
                      <span className="text-emerald-700 dark:text-emerald-400">{r.game === "daily_word" ? "Solved" : "Cleared"}</span>
                    ) : r.cleared === false ? (
                      <span className="text-muted-foreground">{r.game === "daily_word" ? "Not solved" : "Not cleared"}</span>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
