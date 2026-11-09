import Link from "next/link";
import { BookOpen, Briefcase, FlaskConical, Landmark, Layers, LibraryBig, Shield } from "lucide-react";
import type { ExamFamilyNode } from "@/lib/exam/examFamily";
import { membersByStage } from "@/lib/exam/examFamily";
import type { ExamGoal } from "@/lib/exam/examContext";
import { groupByGoal, goalGroupSummary } from "@/lib/exam/examGoals";
import {
  landingExamNodes,
  starterEntry,
  type ExamStarter,
  type StarterChapter,
} from "@/lib/questions/browseLanding";

/**
 * What bare `/browse` shows instead of 25 arbitrary questions.
 *
 * The old default listed the 25 most recently INGESTED questions
 * (`created_at DESC`), so the front door of the tool opened on whatever batch
 * landed last. Measured on 2026-08-13, that was 25 Maharashtra HSC Binomial
 * Distribution questions, on a site whose bank is mostly NDA and JEE.
 *
 * Every link here APPLIES A FILTER on this page rather than navigating away.
 * That is the distinction from `/` (exam cards to guides/notes) and
 * `/questions` (the exam, subject, chapter directory): those already exist
 * and this must not become a third copy of them. `/browse` is the tool; this
 * panel's whole job is to get you into it with one click.
 *
 * 2026-11-09: the exams are grouped by what the student is aiming for
 * (lib/exam/examGoals), in the homepage's order: most
 * chosen first, the visitor's own exam first.
 */
const GOAL_ICON: Record<ExamGoal, typeof Shield> = {
  defence: Shield,
  science: FlaskConical,
  government: Landmark,
  boards: BookOpen,
  management: Briefcase,
};

const pillClass =
  "inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-medium transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-brand-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const memberClass =
  "inline-flex items-center rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-brand-accent transition-colors hover:bg-brand hover:text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function ExamNode({ node }: { node: ExamFamilyNode<ExamStarter> }) {
  if (node.kind === "flat") {
    const exam = node.item;
    return (
      <li>
        <Link href={exam.href} className={pillClass}>
          {exam.displayName}
          <span className="text-xs tabular-nums text-brand-accent">{exam.questionCount.toLocaleString("en-IN")}</span>
        </Link>
      </li>
    );
  }
  // A family pill cannot apply a filter (`examId` is one UUID and there is no
  // family-level filter), so the family is a label and each member is its own
  // filter-applying link.
  return (
    <li className="inline-flex flex-wrap items-center gap-1.5 rounded-2xl border px-3 py-1.5 sm:rounded-full">
      <span className="text-sm font-semibold">{node.label}</span>
      {membersByStage(node).map((group) => (
        <span key={group.stage ?? "all"} className="inline-flex flex-wrap items-center gap-1">
          {group.stage && (
            <span className="ml-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
              {group.stage}
            </span>
          )}
          {group.members.map((m) => (
            <Link
              key={m.item.slug}
              href={m.item.href}
             
              aria-label={[node.label, group.stage, m.label].filter(Boolean).join(" ")}
              className={memberClass}
            >
              {m.label}
            </Link>
          ))}
        </span>
      ))}
    </li>
  );
}

export default function BrowseLanding({
  exams,
  chapters,
  chapterDirectoryCount,
  chosenSlug = null,
}: {
  exams: ExamStarter[];
  chapters: StarterChapter[];
  chapterDirectoryCount: number;
  /** The visitor's chosen exam (qb_exam), shown first. */
  chosenSlug?: string | null;
}) {
  const groups = groupByGoal(landingExamNodes(exams, chosenSlug), starterEntry);
  return (
    <div className="space-y-8">
      <section aria-labelledby="browse-start-exam">
        <h2 id="browse-start-exam" className="flex scroll-mt-24 items-center gap-2 text-sm font-semibold tracking-tight">
          <LibraryBig className="h-4 w-4 text-brand-accent" aria-hidden />
          All exams, by goal
        </h2>
        <ul className="mt-3 divide-y overflow-hidden rounded-2xl border bg-card shadow-sm">
          {groups.map((group, gi) => {
            const Icon = GOAL_ICON[group.goal];
            const sum = goalGroupSummary(group, (e) => e.questionCount);
            return (
              <li
                key={group.goal}
                className="grid animate-fade-in-up gap-2.5 p-3.5 sm:grid-cols-[13rem_minmax(0,1fr)] sm:items-center sm:px-4"
                style={{ animationDelay: `${120 + gi * 70}ms` }}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="icon-tile grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{group.label}</span>
                    <span className="block text-xs tabular-nums text-muted-foreground">
                      {sum.exams} {sum.unit} · {sum.questions.toLocaleString("en-IN")} questions
                    </span>
                  </span>
                </div>
                <ul className="flex min-w-0 flex-wrap gap-1.5" aria-label={group.label}>
                  {group.nodes.map((node) => (
                    <ExamNode key={node.kind === "family" ? node.key : node.item.slug} node={node} />
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>

      {chapters.length > 0 && (
        <section aria-labelledby="browse-start-chapter">
          <h2
            id="browse-start-chapter"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <Layers className="h-4 w-4 text-brand-accent" aria-hidden />
            Or jump straight into a chapter
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {chapters.map((chapter) => (
              <li key={chapter.chapterId}>
                <Link
                  href={chapter.href}
                  className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:border-brand-accent/60 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">
                      {chapter.chapterName}
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {chapter.examName} · {chapter.subjectName}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-brand-accent">
                    {chapter.questionCount.toLocaleString("en-IN")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-sm text-muted-foreground">
        Or use the filters to narrow by chapter, difficulty and year, or{" "}
        <Link
          href="/questions"
          className="font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          see all {chapterDirectoryCount.toLocaleString("en-IN")} chapters
        </Link>
        .
      </p>
    </div>
  );
}
