/**
 * The performance diagnosis, rendered — shared by the STAFF route
 * (/dashboard/students/[id]/performance) and the STUDENT route (/performance).
 *
 * Extracted 2026-09-18 when the student-facing version shipped. It is one
 * component rather than two pages because the two differ only in who is allowed
 * to ask and whose name is on it: every number, every caveat and every
 * disclosure below is the same claim whoever reads it. This repo has paid twice
 * for the alternative — a contract with two renderers drifts, and the half
 * nobody is looking at is the half that goes wrong (the docx solution-table
 * regression ran for a year).
 *
 * AUTHORIZATION IS NOT HERE, exactly as it is not in compute.ts. Each route
 * decides who may read, fetches the payload with the right client, and hands
 * this component data it is already entitled to see.
 *
 * `viewer` changes SECOND PERSON ONLY — "questions you saw and left blank" vs
 * "questions they saw". It must never gate a number: a student seeing a kinder
 * subset of their own diagnosis than their teacher sees is how a readout stops
 * being trusted.
 *
 * REDESIGNED 2026-10-08 for a premium read (owner-approved mockup). The
 * numbers are unchanged; the page now leads with one brand band (the projected
 * score for the chosen exam and subject, beside three facts about every paper),
 * names what went well before what to fix, ends every finding in an action, and
 * says each thing in plain English (lib/performance/highlights). The projected
 * score sits ABOVE the exam and subject pills now, which is why it is labelled
 * with its exam and subject: unlabelled up there it would read as a total
 * across every paper, which it is not.
 */
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, Crosshair, Dumbbell, TrendingUp } from "lucide-react";
import ChapterAccordion from "@/components/performance/ChapterAccordion";
import AuditList from "@/components/performance/AuditList";
import ProjectionList from "@/components/performance/ProjectionList";
import { cn } from "@/lib/utils";
import { EMPTY_TAXONOMY_LINKS, browseExtrasHref, openLabel, topicHref, type TaxonomyLinks } from "@/lib/performance/links";
import type { Lane, Performance, Summary } from "@/lib/performance/compute";
import { buildFocusAreas } from "@/lib/performance/focusAreas";
import type { LaneNav } from "@/lib/performance/laneNav";
import {
  clockAdvice,
  countingNote,
  fixNext,
  paceLine,
  steadiness,
  trendLine,
  wentWell,
  type FixItem,
  type Viewer,
} from "@/lib/performance/highlights";
import { DASH } from "@/lib/students/profileView";

export type { Viewer };

export default function PerformanceBody({
  perf,
  nav,
  links = EMPTY_TAXONOMY_LINKS,
  basePath,
  viewer,
  projectionLocked,
  projectionNote,
  starter,
  headerAction,
}: {
  perf: Performance;
  nav: LaneNav;
  links?: TaxonomyLinks;
  /** Route the exam/subject pills link back to, without a query string. */
  basePath: string;
  viewer: Viewer;
  /** The projected score is behind the trial (migration 0134): shown in place
   *  of the score in the band. The page has already left the projection out of `perf`. */
  projectionLocked?: ReactNode;
  /** A running trial: a chip in the band ("Free for 3 more days"). */
  projectionNote?: string;
  /** What the empty page offers instead (the student's own page only). */
  starter?: ReactNode;
  /** A link in the band's top corner (the student page: "All your papers"). */
  headerAction?: ReactNode;
}) {
  const { summary } = perf;
  const selected = nav.selected;
  const hrefFor = (exam: string, subject?: string) => {
    const qs = new URLSearchParams({ exam });
    if (subject) qs.set("subject", subject);
    return `${basePath}?${qs.toString()}`;
  };

  if (summary.graded === 0) {
    return (
      <EmptyState
        inProgress={summary.inProgress}
        excluded={summary.retakesDropped + summary.belowFloor}
        starter={starter}
      />
    );
  }

  return (
    <>
      <Hero
        summary={summary}
        lane={selected}
        viewer={viewer}
        projectionLocked={projectionLocked}
        projectionNote={projectionNote}
        headerAction={headerAction}
      />

      {(nav.exams.length > 1 || nav.subjects.length > 1) && (
        <div className="space-y-3">
          {/* Exam first, subject second. The exam row appears only for a
              student who has sat more than one — 112 of the 124 students with
              submitted attempts have exactly one, and a single-option filter
              is furniture. */}
          {nav.exams.length > 1 && (
            <nav aria-label="Exam" className="inline-flex flex-wrap gap-1 rounded-full border bg-card p-1">
              {nav.exams.map((e) => (
                <Pill
                  key={e.exam}
                  // No subject: switching exam lands on that exam's busiest
                  // lane rather than carrying a subject the exam may not have.
                  href={hrefFor(e.exam)}
                  active={e.exam === nav.selectedExam}
                  variant="segment"
                >
                  {e.exam}
                </Pill>
              ))}
            </nav>
          )}
          {nav.subjects.length > 1 && (
            // One row that scrolls sideways on a phone, instead of wrapping
            // into four rows above the content.
            <nav
              aria-label="Subject"
              className="-mx-4 flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
            >
              {nav.subjects.map((l) => (
                <Pill
                  key={`${l.exam}-${l.subject}`}
                  href={hrefFor(l.exam, l.subject)}
                  active={l === selected}
                  variant="chip"
                >
                  {l.subject}
                </Pill>
              ))}
            </nav>
          )}
        </div>
      )}

      {selected && <LaneView lane={selected} links={links} viewer={viewer} />}
    </>
  );
}

/**
 * The page's one brand moment. Left: the projected score for the chosen exam
 * and subject (or the unlock card when it is locked, or the lane's accuracy
 * when there is no projection). Right: three facts about every paper.
 */
function Hero({
  summary,
  lane,
  viewer,
  projectionLocked,
  projectionNote,
  headerAction,
}: {
  summary: Summary;
  lane: Lane | null;
  viewer: Viewer;
  projectionLocked?: ReactNode;
  projectionNote?: string;
  headerAction?: ReactNode;
}) {
  const trend = trendLine(summary, viewer);
  const spread = steadiness(summary.consistency);
  const projection = lane?.projection ?? null;
  const topGap = projection?.rows[0];
  const laneName = lane ? `${lane.exam} ${lane.subject}` : null;
  const Heading = viewer === "self" ? "h1" : "p";

  return (
    <section className="hero-brand rounded-3xl p-5 sm:p-8" aria-label="Summary">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <Heading className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
          {viewer === "self" ? "Your performance" : "Performance"}
        </Heading>
        {headerAction}
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div>
          {projectionLocked ? (
            <>
              {laneName && (
                <p className="text-sm text-blue-100">
                  Projected score · <span className="font-semibold text-white">{laneName}</span>
                </p>
              )}
              {/* The unlock card is a light card inside the band: it must
                  not inherit the band's white text (its title vanished). */}
              <div className="text-card-foreground">{projectionLocked}</div>
            </>
          ) : (
            lane && (
              <div className="flex items-center gap-5">
                {projection ? (
                  <Ring value={projection.total} max={projection.ceiling} caption={`of ${projection.ceiling}`} />
                ) : (
                  <Ring value={lane.accuracy ?? 0} max={100} caption="right" suffix="%" />
                )}
                <div className="min-w-0">
                  <p className="text-sm text-blue-100">
                    {projection ? "Projected score" : "Answers right"} ·{" "}
                    <span className="font-semibold text-white">{laneName}</span>
                  </p>
                  {projection && topGap && topGap.gap >= 1 ? (
                    <p className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
                      {viewer === "self" ? "You" : "They"} could add{" "}
                      <span className="text-cyan-200">{Math.round(topGap.gap)} marks</span> in {topGap.chapter} alone.
                    </p>
                  ) : (
                    <p className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
                      {lane.judged} questions answered across {lane.attempts} paper{lane.attempts === 1 ? "" : "s"}.
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {trend && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/20 px-2.5 py-1 text-xs font-semibold text-emerald-50 ring-1 ring-emerald-300/40">
                        <TrendingUp className="h-3.5 w-3.5" aria-hidden />
                        {trend}
                      </span>
                    )}
                    {projection && projectionNote && (
                      <span className="inline-flex rounded-full bg-amber-300/20 px-2.5 py-1 text-xs font-semibold text-amber-50 ring-1 ring-amber-200/40">
                        {projectionNote.replace(/\.$/, "")}
                      </span>
                    )}
                    {lane.thin && (
                      <span className="inline-flex rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-blue-50 ring-1 ring-white/25">
                        Too few answers to call yet
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-blue-100">All {viewer === "self" ? "your" : "their"} papers</p>
          <dl className="mt-2 grid grid-cols-3 gap-2 sm:gap-3">
            <HeroFact
              label="Last paper"
              value={summary.latest ? `${summary.latest.pct}%` : DASH}
              note={summary.latest?.title ?? ""}
            />
            <HeroFact
              label="Answers right"
              value={summary.attemptQuality === null ? DASH : `${summary.attemptQuality}%`}
              note={`of the ones ${viewer === "self" ? "you" : "they"} tried`}
            />
            <HeroFact
              label="Steadiness"
              value={spread ?? DASH}
              note={spread ? "points between papers" : "needs 2 papers"}
            />
          </dl>
          <p className="mt-3 text-[11px] text-blue-100 sm:text-xs">{countingNote(summary, viewer)}</p>
        </div>
      </div>
    </section>
  );
}

function HeroFact({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="min-w-0 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15 sm:p-4">
      <dt className="text-xs text-blue-100">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tabular-nums sm:text-3xl">{value}</dd>
      <dd className="mt-0.5 line-clamp-3 text-[11px] leading-snug text-blue-100 sm:text-xs">{note}</dd>
    </div>
  );
}

/** A score ring. Decorative: the number is in the text beside it too. */
function Ring({ value, max, caption, suffix = "" }: { value: number; max: number; caption: string; suffix?: string }) {
  const r = 50;
  const c = 2 * Math.PI * r;
  const share = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <svg viewBox="0 0 120 120" className="h-28 w-28 shrink-0 sm:h-36 sm:w-36" role="img" aria-label={`${value}${suffix} ${caption}`}>
      <circle cx="60" cy="60" r={r} fill="none" strokeWidth="12" stroke="rgb(255 255 255 / 0.18)" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="#67e8f9"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - share)}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y="60" textAnchor="middle" fill="#fff" fontSize="30" fontWeight="800">
        {value}
        {suffix}
      </text>
      <text x="60" y="79" textAnchor="middle" fill="#bae6fd" fontSize="12">
        {caption}
      </text>
    </svg>
  );
}

function LaneView({ lane, links, viewer }: { lane: Lane; links: TaxonomyLinks; viewer: Viewer }) {
  const focus = buildFocusAreas(lane.exam, lane.subject, lane.chapters);
  const well = wentWell(lane);
  const fixes = fixNext(lane, viewer);
  const yours = viewer === "self" ? "your" : "their";

  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        {lane.attempts} paper{lane.attempts === 1 ? "" : "s"},{" "}
        {lane.judged === 0 ? "nothing answered yet" : `${lane.judged} ${lane.subject} questions answered`}.
      </p>

      {(well.length > 0 || fixes.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {well.length > 0 && (
            <Card>
              <CardTitle icon={<Check className="h-4 w-4" aria-hidden />} tone="good">
                What went well
              </CardTitle>
              <ul className="mt-4 space-y-3 text-sm">
                {well.map((w) => (
                  <li key={w.strong} className="flex gap-3">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                    <span>
                      <span className="font-semibold">{w.strong}</span>
                      {w.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
          {fixes.length > 0 && (
            <Card className={well.length === 0 ? "md:col-span-2" : undefined}>
              <CardTitle icon={<Crosshair className="h-4 w-4" aria-hidden />}>Fix next</CardTitle>
              <ul className="mt-3 divide-y text-sm">
                {fixes.map((f) => (
                  <FixRow key={f.kind} item={f} links={links} />
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}

      {lane.projection && (
        <Section
          title={`Where ${yours} missing marks are`}
          note={`Biggest gain first. The bar is what ${viewer === "self" ? "you score" : "they score"} now out of what the chapter is worth.`}
        >
          <ProjectionList projection={lane.projection} links={links} />
        </Section>
      )}

      <ClockCard lane={lane} viewer={viewer} />

      {focus && (focus.startHere.length > 0 || focus.readyToLearn.length > 0) && (
        <Section
          title="Where to start"
          note="The weakest chapter that other weak chapters build on. Fix it first and the others get easier."
        >
          {focus.startHere.length > 0 && (
            <ul className="space-y-2">
              {focus.startHere.map((f) => (
                <li key={f.chapter} className="rounded-2xl border bg-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium">{f.chapter}</span>
                    <span className="text-sm tabular-nums text-muted-foreground">
                      {f.accuracy === null ? DASH : `${f.accuracy}% right`}
                    </span>
                  </div>
                  {f.unlocks.length > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">Also holding back: {f.unlocks.join(", ")}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Chip href={f.learnHref} icon={BookOpen}>
                      Learn
                    </Chip>
                    <Chip href={f.practiceHref} icon={Dumbbell}>
                      Practise
                    </Chip>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {focus.readyToLearn.length > 0 && (
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Ready to learn next:</span>{" "}
              {focus.readyToLearn.slice(0, 6).map((r) => r.chapter).join(" · ")}
            </p>
          )}
        </Section>
      )}

      <Section title={`${viewer === "self" ? "Your" : "Their"} chapters`} note="Weakest first. Recent papers count more.">
        <ChapterAccordion chapters={lane.chapters} />
      </Section>

      {(lane.wrongAudit.length > 0 || lane.skipAudit.length > 0) && (
        <div className="grid gap-6 md:grid-cols-2">
          {lane.wrongAudit.length > 0 && (
            <Section title="Most mistakes" note={`Topics where ${viewer === "self" ? "you" : "they"} lose the most marks.`}>
              <AuditList rows={lane.wrongAudit} kind="wrong" />
            </Section>
          )}
          {lane.skipAudit.length > 0 && (
            <Section
              title="Left blank"
              note={`Questions ${viewer === "self" ? "you" : "they"} saw but skipped. Questions never reached are in the clock section.`}
            >
              <AuditList rows={lane.skipAudit} kind="skipped" />
            </Section>
          )}
        </div>
      )}

      <Section title="By difficulty">
        <dl className="grid grid-cols-3 gap-3">
          {lane.difficulty.map((d) => (
            <div key={d.difficulty} className="rounded-2xl border bg-card p-4 text-center">
              <dt className="text-xs capitalize text-muted-foreground">{d.difficulty.toLowerCase()}</dt>
              <dd className="mt-1 text-2xl font-bold tabular-nums">{d.accuracy === null ? DASH : `${d.accuracy}%`}</dd>
              <dd className="text-xs text-muted-foreground">{d.answered === 0 ? "none answered" : `${d.answered} answered`}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </div>
  );
}

/** One "Fix next" row: what, why, and the one button that does something about it. */
function FixRow({ item, links }: { item: FixItem; links: TaxonomyLinks }) {
  let action: ReactNode = null;
  if (item.kind === "mistakes" && item.questionIds) {
    const href = browseExtrasHref(item.questionIds);
    if (href)
      action = (
        <ActionLink href={href} primary label={`Practise the ${item.title} questions`}>
          {openLabel(item.questionIds.length, "Practise")}
        </ActionLink>
      );
  } else if (item.kind === "chapter" && item.chapter) {
    const href = topicHref(links, item.chapter);
    if (href)
      action = (
        <ActionLink href={href} label={`Practise ${item.title} in the question bank`}>
          Practise
        </ActionLink>
      );
  } else if (item.kind === "speed") {
    action = (
      <ActionLink href="#clock" label="See how the clock was used">
        See time
      </ActionLink>
    );
  }
  return (
    <li className="flex items-center justify-between gap-3 py-3 first:pt-1 last:pb-0">
      <span className="min-w-0">
        <span className="block font-semibold">{item.title}</span>
        <span className="block text-muted-foreground">{item.detail}</span>
      </span>
      {action}
    </li>
  );
}

function ActionLink({
  href,
  primary = false,
  label,
  children,
}: {
  href: string;
  primary?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      prefetch={false}
      href={href}
      aria-label={label}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        primary ? "bg-brand text-brand-foreground hover:bg-brand/90" : "border hover:bg-accent"
      )}
    >
      {children}
      {primary && <ArrowRight className="h-3.5 w-3.5" aria-hidden />}
    </Link>
  );
}

/**
 * How the clock was used. The coverage bar (answered / left blank / not
 * reached) and the time split share one card now: they answer one question,
 * "did the paper run out before the student did?".
 *
 * Every time figure is a MEDIAN, because dwell is wall-clock and includes idle:
 * production holds a single question at 6,131 seconds, which moves a mean and
 * not a median. Measured across 300 submitted attempts, per-question dwell sums
 * to the attempt's own wall clock (median ratio 0.95, never above 1.01), so the
 * shares partition the real sitting rather than sampling it.
 */
function ClockCard({ lane, viewer }: { lane: Lane; viewer: Viewer }) {
  const t = lane.time;
  const cov = lane.coverage;
  const advice = clockAdvice(lane, viewer);
  const pace = paceLine(cov);
  const timed = t.totalSecs > 0;

  return (
    <section id="clock" className="scroll-mt-20">
      <h2 className="section-title text-lg font-semibold">How {viewer === "self" ? "you" : "they"} used the clock</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {timed ? `${fmtDuration(t.totalSecs)} across ${lane.attempts} paper${lane.attempts === 1 ? "" : "s"}.` : "No time was recorded."}
      </p>
      <div className="mt-3 space-y-5 rounded-2xl border bg-card p-5">
        <div>
          <p className="text-sm">
            Of <span className="font-semibold">{cov.inPaper}</span> questions:{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{cov.answered} answered</span>,{" "}
            <span className="font-semibold text-amber-700 dark:text-amber-400">{cov.seenBlank} left blank</span>,{" "}
            <span className="font-semibold text-muted-foreground">{cov.neverReached} not reached</span>.
          </p>
          <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden>
            <Segment n={cov.answered} total={cov.inPaper} className="bg-emerald-500" />
            <Segment n={cov.seenBlank} total={cov.inPaper} className="bg-amber-500" />
          </div>
        </div>

        {timed && (
          <div>
            <p className="text-xs font-medium text-muted-foreground">Where the time went</p>
            <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-muted" aria-hidden>
              <Segment n={t.correctSecs} total={t.totalSecs} className="bg-emerald-500" />
              <Segment n={t.wrongSecs} total={t.totalSecs} className="bg-red-500" />
              <Segment n={t.blankSecs} total={t.totalSecs} className="bg-amber-500" />
              <Segment n={t.unjudgedSecs} total={t.totalSecs} className="bg-muted-foreground/30" />
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-sm">
              <TimeMetric label="on right answers" secs={t.correctSecs} total={t.totalSecs} median={t.medianCorrectSecs} tone="text-emerald-700 dark:text-emerald-400" />
              <TimeMetric label="on wrong answers" secs={t.wrongSecs} total={t.totalSecs} median={t.medianWrongSecs} tone="text-red-600 dark:text-red-400" />
              <TimeMetric label="on blanks" secs={t.blankSecs} total={t.totalSecs} median={t.medianBlankSecs} tone="text-amber-700 dark:text-amber-400" />
            </dl>
          </div>
        )}

        {(advice || pace) && (
          <div className="rounded-xl bg-accent p-4 text-sm">
            {advice && (
              <p>
                <span className="font-semibold">{advice.strong}</span>
                {advice.rest}
              </p>
            )}
            {pace && <p className={cn(advice && "mt-2 text-muted-foreground")}>{pace}</p>}
          </div>
        )}

        {t.slowest.length > 0 && (
          <div>
            <p className="text-sm font-semibold">Where {viewer === "self" ? "you" : "they"} slow down</p>
            <ul className="mt-1 divide-y text-sm">
              {t.slowest.map((c) => (
                <li key={c.chapter} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0">{c.chapter}</span>
                  <span className="flex shrink-0 items-center gap-2 tabular-nums">
                    <span className="font-semibold">{c.medianSecs} s</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-semibold",
                        c.accuracy === null || c.thin
                          ? "bg-muted text-muted-foreground"
                          : c.accuracy >= 70
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200"
                      )}
                    >
                      {c.accuracy === null ? "not answered" : `${c.accuracy}% right`}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {t.zeroDwell > 0 && (
          // Absence is not zero: a reached question with no recorded time is a
          // measurement gap, and counting it as a 0-second solve would assert
          // something we never observed.
          <p className="text-xs text-muted-foreground">
            {t.zeroDwell} question{t.zeroDwell === 1 ? "" : "s"} recorded no time and{" "}
            {t.zeroDwell === 1 ? "is" : "are"} left out of these figures.
          </p>
        )}
      </div>
    </section>
  );
}

/** A time bucket: share of the clock, then the median question inside it. */
function TimeMetric({
  label,
  secs,
  total,
  median,
  tone,
}: {
  label: string;
  secs: number;
  total: number;
  median: number | null;
  tone: string;
}) {
  return (
    <div>
      <dd className={cn("text-xl font-bold tabular-nums", tone)}>
        {total > 0 ? `${Math.round((secs / total) * 100)}%` : DASH}
      </dd>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      {median !== null && <dd className="text-xs tabular-nums text-muted-foreground">{median} s each</dd>}
    </div>
  );
}

/** Seconds as something read at a glance: 45s, 12 minutes, 3 hours 19 minutes. */
function fmtDuration(secs: number): string {
  if (secs < 60) return `${Math.round(secs)} seconds`;
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"}`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h} hour${h === 1 ? "" : "s"}${m ? ` ${m} minute${m === 1 ? "" : "s"}` : ""}`;
}

/** One filter pill, shared by the exam and subject rows so the two axes cannot
 *  drift apart: `segment` sits inside the exam switcher, `chip` in the subject row. */
function Pill({
  href,
  active,
  variant,
  children,
}: {
  href: string;
  active: boolean;
  variant: "segment" | "chip";
  children: React.ReactNode;
}) {
  return (
    <Link
      // NEVER prefetch. These pills are query-param links on THIS route, so
      // there is no loading boundary for a prefetch to stop at — each one is a
      // FULL page render, and each render is a ~500 ms / 1.27 MB RPC. The
      // heaviest student carries 13 of them; on 2026-09-15 that made 18 of 24
      // calls in one minute time out (57014) and the page 500. Measured:
      // 5 concurrent 0/5 fail, 9 concurrent 7/9, 12 concurrent 12/12.
      prefetch={false}
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "shrink-0 rounded-full text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "segment"
          ? cn("px-4 py-1.5", active ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground")
          : cn("border px-3.5 py-1.5", active ? "border-foreground bg-foreground text-background" : "bg-card hover:bg-accent")
      )}
    >
      {children}
    </Link>
  );
}

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="section-title text-lg font-semibold">{title}</h2>
      {note && <p className="mt-1 text-sm text-muted-foreground">{note}</p>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border bg-card p-5", className)}>{children}</div>;
}

function CardTitle({ icon, tone, children }: { icon: ReactNode; tone?: "good"; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-2 text-base font-semibold">
      <span
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-lg",
          tone === "good" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "icon-tile"
        )}
      >
        {icon}
      </span>
      {children}
    </h2>
  );
}

function Segment({ n, total, className }: { n: number; total: number; className: string }) {
  if (n <= 0 || total <= 0) return null;
  return <span className={className} style={{ width: `${(n / total) * 100}%` }} />;
}

function Chip({ href, icon: Icon, children }: { href: string; icon: typeof BookOpen; children: React.ReactNode }) {
  return (
    <Link
      prefetch={false}
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </Link>
  );
}

function EmptyState({ inProgress, excluded, starter }: { inProgress: number; excluded: number; starter?: ReactNode }) {
  return (
    <div className="space-y-4">
      <div className={cn("rounded-2xl border border-dashed text-center", starter ? "p-4" : "p-8")}>
        <p className="text-sm text-muted-foreground">
          No marked paper to look at yet.
          {inProgress > 0 && ` ${inProgress} attempt${inProgress === 1 ? " is" : "s are"} still in progress.`}
        </p>
        {excluded > 0 && (
          // Saying so matters: otherwise a student with attempts on the roster
          // shows an empty page here and it reads as a broken query.
          <p className="mt-1 text-xs text-muted-foreground">
            {excluded} attempt{excluded === 1 ? " was" : "s were"} left out as a retake or as left early (under
            20% answered).
          </p>
        )}
      </div>
      {starter}
    </div>
  );
}
