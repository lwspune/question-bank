import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Scale, Target, TrendingUp } from "lucide-react";
import { formatMarks } from "@/lib/email/mockReport";
import { goPracticeHref } from "@/lib/performance/links";
import { drillHref } from "@/lib/drill/from";
import type { ScorePlan } from "@/lib/mocks/scorePlan";

/**
 * "How to raise your score" (owner, 2026-11-10): the result card for a fair,
 * full past paper, in place of "What to fix next" (Findings.tsx), which a
 * chapter test, a custom test or a rushed or abandoned attempt still gets.
 * Every figure comes from lib/mocks/scorePlan.ts, built by code, never by V.
 *
 * At most three actions are shown, each valued in marks where the plan can
 * show the marks; the section table and the strategy working fold away under
 * "More detail", so a phone is not flooded. It names questions and sections,
 * never another student.
 */

const mins = (m: number) => (m < 10 ? formatMarks(m) : String(Math.round(m)));

type Action = { key: string; icon: typeof Target; title: string; body: React.ReactNode };

export default function ScorePlanCard({ plan, attemptId }: { plan: ScorePlan; attemptId: string }) {
  const actions: Action[] = [];

  if (plan.easy) {
    actions.push({
      key: "easy",
      icon: Target,
      title: `${plan.easy.count} easy questions you got wrong: about +${plan.easy.gain} marks if you fix half of them`,
      body: (
        <>
          <p className="text-sm text-muted-foreground">
            Each one is worth {formatMarks(plan.easy.valueEach)} marks to you: the marks you would gain, plus the penalty you
            would not lose.
          </p>
          <p className="mt-1 text-sm">{plan.easy.bySection.map((b) => `${b.section} ${b.count}`).join(" · ")}</p>
        </>
      ),
    });
  }

  if (plan.strategy && plan.strategy.kind === "fewer_guesses") {
    const s = plan.strategy;
    actions.push({
      key: "guess",
      icon: Scale,
      title: `Answers below the 1 in ${s.breakEvenOneIn} this marking needs cost you ${formatMarks(s.marksAtStake)} marks`,
      body: (
        <p className="text-sm text-muted-foreground">
          {s.fastTotal >= 10
            ? `Your quick answers were right ${s.fastRight} times out of ${s.fastTotal}. `
            : `You were right ${s.accuracyPct}% of the time. `}
          Leave a question blank unless you can rule out options.
        </p>
      ),
    });
  }

  if (plan.time) {
    const t = plan.time;
    actions.push({
      key: "time",
      icon: Clock,
      title: `${t.section} took ${mins(t.mins)} of your ${mins(t.totalMins)} minutes`,
      body: (
        <p className="text-sm text-muted-foreground">
          That is {t.secsPerQ} seconds a question, against {t.paperSecsPerQ} for the paper as a whole. {t.slowWrong} questions
          there took over {t.capSecs} seconds each and were still wrong:{" "}
          <span className="font-medium text-foreground">{mins(t.slowWrongMins)} minutes for no marks</span>. Next time, if a{" "}
          {t.section} question passes {t.capSecs} seconds, mark it and move on.
        </p>
      ),
    });
  }

  if (plan.topics.length > 0) {
    actions.push({
      key: "topics",
      icon: ArrowRight,
      title: "The chapters that cost you the most marks",
      body: (
        <ul className="space-y-1.5">
          {plan.topics.map((t) => (
            <li key={`${t.subject}-${t.chapter}`} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm">
              <span className="font-medium">{t.chapter}</span>
              <span className="text-muted-foreground">
                {t.right} of {t.asked} right, {formatMarks(t.marksLost)} marks lost
                {t.qPerPaper !== null && t.qPerPaper >= 1 ? ` · about ${Math.round(t.qPerPaper)} questions a paper` : ""}
              </span>
              <Link
                href={goPracticeHref(plan.examName, t.subject, t.chapter)}
                prefetch={false}
                className="text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
              >
                Practise this
              </Link>
            </li>
          ))}
        </ul>
      ),
    });
  }

  const shown = actions.slice(0, 3);
  const top = plan.topics[0];
  const rule = plan.time
    ? `In the next mock: if a ${plan.time.section} question passes ${plan.time.capSecs} seconds, mark it and move on`
    : plan.strategy?.kind === "fewer_guesses"
      ? "In the next mock: leave a question blank unless you can rule out options"
      : plan.strategy?.kind === "never_blank"
        ? "In the next mock: never leave a question blank"
        : null;

  return (
    <section className="mt-6 rounded-xl border bg-card p-6" aria-labelledby="score-plan-heading">
      <h2 id="score-plan-heading" className="text-lg font-semibold">
        How to raise your score
      </h2>
      {plan.headlineGain > 0 && (
        <p className="mt-1 text-sm text-muted-foreground">
          Up to <span className="font-semibold text-foreground">+{plan.headlineGain} marks</span> are within reach. Here is where.
        </p>
      )}

      {plan.wentWell && (
        <p className="mt-4 flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
          <span>
            <span className="font-medium">What went well:</span> {plan.wentWell.section}.{" "}
            {plan.wentWell.right === plan.wentWell.answered
              ? `All ${plan.wentWell.answered} you answered were right`
              : `${plan.wentWell.right} of the ${plan.wentWell.answered} you answered were right`}
            , in {mins(plan.wentWell.mins)} minutes.
          </span>
        </p>
      )}

      {plan.progress && (
        <p className="mt-2 flex items-start gap-2 text-sm">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" aria-hidden />
          <span>
            {plan.progress.kind === "same_paper" ? "Last time on this paper" : `Your last ${plan.examName} paper`}:{" "}
            {formatMarks(plan.progress.previous)}, now {formatMarks(plan.score)} ({plan.progress.delta >= 0 ? "+" : ""}
            {formatMarks(plan.progress.delta)})
            {plan.progress.sections.length > 0 &&
              `. ${plan.progress.sections
                .slice(0, 2)
                .map((x) => `${x.section} ${x.delta >= 0 ? "+" : ""}${formatMarks(x.delta)}`)
                .join(", ")}`}
          </span>
        </p>
      )}

      <ol className="mt-5 space-y-5">
        {shown.map((a, i) => (
          <li key={a.key} className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-semibold text-brand-accent">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h3 className="flex items-start gap-1.5 text-sm font-semibold">
                <a.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                {a.title}
              </h3>
              <div className="mt-1">{a.body}</div>
            </div>
          </li>
        ))}
      </ol>

      <details className="mt-5 rounded-lg border px-4 py-3 text-sm">
        <summary className="cursor-pointer font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          More detail
        </summary>
        <div className="mt-3 space-y-3">
          {plan.strategy && plan.strategy.kind !== "never_blank" && plan.strategy.kind !== "fewer_guesses" && (
            <p className="text-muted-foreground">
              {plan.strategy.kind === "keep"
                ? plan.strategy.seenBlank === 0
                  ? "You were right to answer every question. "
                  : "Keep attempting. "
                : `You left ${plan.strategy.seenBlank} questions you looked at blank. `}
              At this marking, an answer gains marks if you are right more than 1 time in {plan.strategy.breakEvenOneIn}. You were
              right {plan.strategy.accuracyPct}% of the time, so each answer was worth about +{formatMarks(plan.strategy.perAnswer)}{" "}
              marks
              {plan.strategy.kind === "attempt_more" ? ": try the ones where you can rule out an option." : "."}
              {plan.strategy.fastTotal >= 10 &&
                ` Even your quick answers were right ${plan.strategy.fastRight} times out of ${plan.strategy.fastTotal}: net ${plan.strategy.fastNet >= 0 ? "+" : ""}${formatMarks(plan.strategy.fastNet)} marks.`}
            </p>
          )}
          {plan.strategy && plan.strategy.kind === "never_blank" && (
            <p className="text-muted-foreground">
              {plan.examName} has no negative marking, so a blank question is a mark given away. You left {plan.strategy.blanks}{" "}
              blank: always mark an answer.
            </p>
          )}
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th scope="col" className="py-1 font-medium">Section</th>
                <th scope="col" className="py-1 font-medium">Right</th>
                <th scope="col" className="py-1 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {plan.sections.map((x) => (
                <tr key={x.section} className="border-t">
                  <td className="py-1 pr-2">{x.section}</td>
                  <td className="py-1 pr-2 tabular-nums">
                    {x.right} / {x.questions}
                  </td>
                  <td className="py-1 tabular-nums">{mins(x.mins)} min</td>
                </tr>
              ))}
            </tbody>
          </table>
          {plan.progress === null && (
            <p className="text-xs text-muted-foreground">
              Based on this paper. Your next {plan.examName} paper will show what changed.
            </p>
          )}
        </div>
      </details>

      <div className="mt-5">
        <h3 className="text-sm font-semibold">Before your next mock</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
          {plan.wrong > 0 && (
            <li>
              <Link
                href={drillHref("score_plan", attemptId)}
                prefetch={false}
                className="text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
              >
                Fix this paper&apos;s {plan.wrong} mistakes
              </Link>
              , five at a time
            </li>
          )}
          {top && (
            <li>
              <Link
                href={goPracticeHref(plan.examName, top.subject, top.chapter)}
                prefetch={false}
                className="text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
              >
                One practice set on {top.chapter}
              </Link>
            </li>
          )}
          {rule && <li>{rule}</li>}
        </ol>
      </div>

      <Link
        href="/performance"
        prefetch={false}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:underline"
      >
        Your full performance across all papers
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Link>
    </section>
  );
}
