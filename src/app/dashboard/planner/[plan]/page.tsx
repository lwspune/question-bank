import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarClock } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CollapsibleSection from "../../syllabus/CollapsibleSection";
import { chapterTotals, numberSessions, planTotals } from "@/lib/planner/plan";
import { loadPlanContext, type PlanContext } from "@/lib/planner/query";
import { resolvePlan } from "@/lib/planner/registry";
import type { PlannedChapter, PlannedSession } from "@/lib/planner/types";

export const dynamic = "force-dynamic";

type Params = { plan: string };

/**
 * Extra badges carry a TEXT label, never colour alone — the whole page is a
 * grid of small cells and a colour-blind reader must still be able to tell an
 * NDA top-up from a CBSE one.
 */
const EXTRA_STYLE: Record<"NDA" | "CBSE", string> = {
  NDA: "bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:ring-amber-900",
  CBSE: "bg-sky-50 text-sky-900 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-200 dark:ring-sky-900",
};

function Stat({ value, label, hint }: { value: string | number; label: string; hint?: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-2xl font-semibold tabular-nums text-brand-accent">{value}</div>
      <div className="mt-0.5 text-sm font-medium">{label}</div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

/** Resolve a list of refs to "§no Title", dropping anything the spine lost. */
function titles(refs: string[], ctx: PlanContext): { ref: string; title: string }[] {
  return refs
    .map((ref) => ({ ref, title: ctx.sections.get(ref)?.title ?? "" }))
    .filter((r) => r.title);
}

/** Total PYQ behind a session, de-duplicated so a parent+child pair counts once. */
function sessionWeight(session: PlannedSession, ctx: PlanContext): Record<string, number> {
  const out: Record<string, number> = {};
  // Concepts first: where a session cites both §2.1 and §2.1.1, the parent's
  // total already INCLUDES the child, so adding both would double-count. Only
  // the most specific ref of each family contributes.
  const refs = [...session.subtopics, ...session.concepts];
  const specific = refs.filter((r) => !refs.some((o) => o !== r && o.startsWith(`${r}.`)));
  for (const ref of specific) {
    const section = ctx.sections.get(ref);
    if (!section) continue;
    for (const [exam, pyq] of Object.entries(section.pyqByExam)) {
      out[exam] = (out[exam] ?? 0) + pyq;
    }
  }
  return out;
}

function SessionRow({
  number,
  session,
  ctx,
}: {
  number: number;
  session: PlannedSession;
  ctx: PlanContext;
}) {
  const subtopics = titles(session.subtopics, ctx);
  const concepts = titles(session.concepts, ctx);
  const weight = sessionWeight(session, ctx);
  const extra = session.extra;

  return (
    <tr className="border-t align-top">
      <td className="whitespace-nowrap py-2 pr-3 text-sm font-medium tabular-nums">
        {number}
        {extra && (
          <span
            className={`ml-2 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ring-1 ${EXTRA_STYLE[extra.source]}`}
          >
            {extra.source}
          </span>
        )}
      </td>

      <td className="py-2 pr-3 text-sm">
        {extra ? (
          <span className="font-medium">{extra.title}</span>
        ) : subtopics.length ? (
          <ul className="space-y-0.5">
            {subtopics.map((s) => (
              <li key={s.ref}>
                <span className="text-muted-foreground tabular-nums">§{s.ref}</span> {s.title}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </td>

      <td className="py-2 pr-3 text-sm">
        <ul className="space-y-0.5">
          {concepts.map((c) => (
            <li key={c.ref}>
              <span className="text-muted-foreground tabular-nums">§{c.ref}</span> {c.title}
            </li>
          ))}
          {session.beats?.map((b) => (
            <li key={b} className="text-muted-foreground">
              {b}
            </li>
          ))}
          {!concepts.length && !session.beats?.length && (
            <li className="text-muted-foreground">—</li>
          )}
        </ul>
      </td>

      <td className="py-2 pr-3 text-xs tabular-nums text-muted-foreground">
        {extra ? (
          extra.pyq ? (
            <span title="PYQ in the exam bank this topic is worth">{extra.pyq} PYQ at stake</span>
          ) : (
            // Deliberately blank rather than 0: the ruling behind this session
            // records no separable PYQ figure, and printing 0 would claim the
            // topic is never asked.
            <span className="italic">not counted</span>
          )
        ) : (
          <ul className="space-y-0.5">
            {Object.entries(weight)
              .sort((a, b) => b[1] - a[1])
              .map(([exam, pyq]) => (
                <li key={exam}>
                  {exam} {pyq}
                </li>
              ))}
          </ul>
        )}
      </td>

      <td className="py-2 text-xs text-muted-foreground">
        {extra ? extra.reason : session.note}
      </td>
    </tr>
  );
}

function ChapterBlock({ chapter, ctx }: { chapter: PlannedChapter; ctx: PlanContext }) {
  const totals = chapterTotals(chapter);
  const name =
    chapter.chapterNo === null
      ? (chapter.title ?? "Untitled")
      : (ctx.chapterNames.get(chapter.chapterNo) ?? `Chapter ${chapter.chapterNo}`);
  const heading = chapter.chapterNo === null ? name : `Ch.${chapter.chapterNo} ${name}`;

  const leaves = chapter.chapterNo === null ? 0 : (ctx.leafCount.get(chapter.chapterNo) ?? 0);
  const practice = ctx.practiceByChapter.get(chapter.bankChapterName ?? name);

  return (
    <CollapsibleSection
      id={`ch-${chapter.chapterNo ?? "extra"}`}
      title={heading}
      count={totals.sessions}
      countLabel={totals.sessions === 1 ? "hour" : "hours"}
      description={
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {leaves > 0 && <span>{leaves} book sections to teach</span>}
          {totals.extra > 0 && (
            <span>
              {totals.core} from the book + {totals.extra} added
              {totals.extraPyq > 0 && ` (${totals.extraPyq} PYQ at stake)`}
            </span>
          )}
          {practice !== undefined && practice > 0 && (
            <span>{practice.toLocaleString()} questions in the bank for practice</span>
          )}
        </div>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[56rem] border-collapse text-left">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted-foreground">
              <th className="w-14 pb-2 pr-3 font-medium">Session</th>
              <th className="w-1/4 pb-2 pr-3 font-medium">Subtopics</th>
              <th className="w-1/3 pb-2 pr-3 font-medium">Concepts</th>
              <th className="w-28 pb-2 pr-3 font-medium">Weightage</th>
              <th className="pb-2 font-medium">Teaching note</th>
            </tr>
          </thead>
          <tbody>
            {numberSessions(chapter).map(({ number, session }) => (
              <SessionRow key={session.id} number={number} session={session} ctx={ctx} />
            ))}
          </tbody>
        </table>
      </div>
    </CollapsibleSection>
  );
}

export default async function PlannerPage({ params }: { params: Params }) {
  const member = await getSessionMember();
  if (!member) redirect("/login");

  const plan = resolvePlan(params.plan);
  if (!plan) notFound();

  const ctx = await loadPlanContext(createSupabaseServerClient(), plan);
  const totals = planTotals(plan);

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl p-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Dashboard
        </Link>

        <div className="mb-2 flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-brand-accent" aria-hidden="true" />
          <h1 className="text-2xl font-semibold">{plan.label} — session plan</h1>
        </div>
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          The {plan.source} book, cut into one-hour sessions, with the topics NDA and CBSE
          ask that this book does not fully teach folded in where they belong. One session =
          one hour.
        </p>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={totals.chapters} label="Chapters" hint="in book order" />
          <Stat
            value={totals.sessions}
            label="Sessions"
            hint={`${totals.core} from the book, ${totals.extra} added`}
          />
          <Stat
            value={totals.nda}
            label="NDA top-ups"
            hint={`${totals.extraPyq} PYQ the book leaves short`}
          />
          <Stat value={totals.cbse} label="CBSE top-ups" hint="NCERT teaches, this book does not" />
        </div>

        <div className="mb-6 rounded-lg border bg-muted/30 p-4 text-sm">
          <p className="mb-2 font-medium">How to read this</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Subtopics and Concepts</span> are the
              book&apos;s own numbered sections, read live from the syllabus map — so a correction
              to the map reaches this plan without anyone editing it. Lines without a § are
              teaching beats the book has no heading for.
            </li>
            <li>
              <span className="font-medium text-foreground">Weightage</span> is past-year questions
              from each exam bank that map onto those sections. It is why some sections get two
              hours and some share one.
            </li>
            <li>
              <span className="font-medium text-foreground">Badged sessions</span> are gaps, not
              book content. <span className="font-medium">NDA</span> means the exam asks it and
              this book does not teach it; <span className="font-medium">CBSE</span> means NCERT
              teaches it and this book does not. Each one states the finding it came from, so you
              can disagree with it on the evidence.
            </li>
            <li>
              Session numbers are positions, so inserting a class renumbers the ones after it.
              Teaching notes will attach to the session itself, not to its number.
            </li>
          </ul>
        </div>

        {plan.chapters.map((chapter) => (
          <ChapterBlock key={chapter.chapterNo ?? "extra"} chapter={chapter} ctx={ctx} />
        ))}

        <p className="mt-6 text-xs text-muted-foreground">
          Pacing runs at roughly 1.3&ndash;1.6 book sections per hour, weighted by exam demand.
          It is a starting point for a teacher to argue with, not a measurement — and it is a
          Maths rate, so it says nothing about Physics or Chemistry.
        </p>
      </main>
    </>
  );
}
