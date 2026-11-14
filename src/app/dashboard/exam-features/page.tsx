import { redirect } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import StatCard from "@/app/dashboard/StatCard";
import BackToDashboard from "@/app/dashboard/BackToDashboard";
import { getSessionSuperadmin } from "@/lib/auth";
import { getExamFeatures } from "@/lib/examFeatures/adminStats";
import { coverageSummary, featureCoverage, type CoverageResult } from "@/lib/examFeatures/build";
import { EXAM_GOALS, GOAL_LABEL } from "@/lib/exam/examGoals";
import ExamFeaturesTable from "./ExamFeaturesTable";

export const dynamic = "force-dynamic";

export default async function ExamFeaturesPage() {
  // Platform-wide student counts (not org-scoped): superadmin only.
  if (!(await getSessionSuperadmin())) redirect("/browse");

  let result: CoverageResult | null = null;
  try {
    result = await getExamFeatures();
  } catch (err) {
    console.error("dashboard/exam-features:", err);
  }

  return (
    <>
      <AppHeader />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <BackToDashboard />
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Exam features</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            What each exam has (notes, guides, mocks, homework and more) beside how many students picked it, so the
            next piece of work can go where the students are. Live on every visit.
          </p>
        </header>

        {!result ? (
          <p role="alert" className="rounded-lg border border-destructive/40 p-4 text-sm text-destructive">
            Could not load the exam counts. Reload the page; if it keeps failing, the server log says why.
          </p>
        ) : (
          <Body result={result} />
        )}
      </main>
    </>
  );
}

function Body({ result }: { result: CoverageResult }) {
  const { rows, unmatched } = result;
  const sum = coverageSummary(rows);
  const features = featureCoverage(rows);
  const top = rows[0];
  const goals = EXAM_GOALS.filter((g) => rows.some((r) => r.goal === g)).map((g) => ({ value: g, label: GOAL_LABEL[g] }));

  return (
    <>
      {top && (
        <p className="max-w-3xl text-base leading-relaxed">
          <strong className="font-semibold">{top.exam}</strong> has the most students ({top.students.toLocaleString("en-IN")}).
          Of the 10 exams with the most students, <strong className="font-semibold">{sum.top10NoNotes}</strong> have no
          notes and <strong className="font-semibold">{sum.top10NoGuides}</strong> have no strategy guide.{" "}
          {sum.noStudents > 0 && (
            <>
              {sum.noStudents} {sum.noStudents === 1 ? "exam has" : "exams have"} no students yet.
            </>
          )}
        </p>
      )}

      <section aria-label="Summary" className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard kind="numeric" value={sum.exams} label="Exams" />
        <StatCard kind="numeric" value={sum.withMocks} label="With published mocks" />
        <StatCard kind="numeric" value={sum.withNotes} label="With notes" />
        <StatCard kind="numeric" value={sum.withGuides} label="With strategy guides" />
        <StatCard kind="numeric" value={sum.withHomework} label="With homework plans" />
      </section>

      {(unmatched.examNames.length > 0 || unmatched.targetSlugs.length > 0) && (
        <p className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 text-sm text-amber-800 dark:text-amber-300">
          <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Not shown, because no exam in the code matches them:
            {unmatched.examNames.length > 0 && <> exams in the database ({unmatched.examNames.join(", ")})</>}
            {unmatched.examNames.length > 0 && unmatched.targetSlugs.length > 0 && ";"}
            {unmatched.targetSlugs.length > 0 && <> exams students picked ({unmatched.targetSlugs.join(", ")})</>}.
          </span>
        </p>
      )}

      <section aria-labelledby="features-heading" className="space-y-3">
        <div>
          <h2 id="features-heading" className="text-lg font-semibold">
            How many exams have each feature
          </h2>
          <p className="text-sm text-muted-foreground">
            The share of students counts every exam a student picked, so a student with two exams counts twice.
          </p>
        </div>
        <ul className="space-y-2.5 rounded-lg border bg-card p-4 sm:p-5">
          {features.map((f) => (
            <li key={f.key} className="grid gap-x-3 gap-y-1 sm:grid-cols-[12rem_1fr_9rem] sm:items-center">
              <span className="text-sm font-medium">{f.label}</span>
              <span aria-hidden className="block h-2.5 overflow-hidden rounded-full bg-muted">
                <span
                  className="block h-full rounded-full bg-brand"
                  style={{ width: `${f.total ? (f.exams / f.total) * 100 : 0}%` }}
                />
              </span>
              <span className="text-sm tabular-nums sm:text-right">
                {f.exams} of {f.total} exams · {f.pickShare}% of picks
              </span>
              {f.missingTop.length > 0 && (
                <span className="text-xs text-muted-foreground sm:col-start-2 sm:col-span-2">
                  Biggest without it: {f.missingTop.join(", ")}
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="table-heading" className="space-y-3">
        <div>
          <h2 id="table-heading" className="text-lg font-semibold">
            Every exam, most students first
          </h2>
          <p className="text-sm text-muted-foreground">Click a column heading to sort by it.</p>
        </div>
        <ExamFeaturesTable rows={rows} goals={goals} />
      </section>

      <details className="rounded-lg border p-4 text-sm">
        <summary className="cursor-pointer font-medium">What each column means</summary>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted-foreground">
          <li>
            <b>Students</b>: signed-in students (staff left out) who picked the exam as a target. One student can pick
            several exams, so the column adds up to more than the number of students.
          </li>
          <li>
            <b>Active 30d</b>: of those, the students who did anything recorded on the site in the last 30 days.
          </li>
          <li>
            <b>Sat a mock</b>: students who ever started one of the exam&apos;s mocks, picked or not.
          </li>
          <li>
            <b>PYQs</b> and <b>Practice</b>: public questions in the bank.
          </li>
          <li>
            <b>Full mocks</b>: published full papers (&quot;drafts&quot; when only unpublished ones exist).{" "}
            <b>Chapter tests</b>: published chapter or section tests.
          </li>
          <li>
            <b>Notes</b>: notes chapters, which also make the formula pages. <b>Guides</b>: strategy guides on /guide.{" "}
            <b>Homework</b>: published daily homework plans.
          </li>
          <li>
            <b>Board reader</b>: the book-order reader on /board. <b>Board papers</b>: published past papers on
            /question-papers.
          </li>
          <li>
            <b>Animated</b>: questions with an animated solution. <b>Learn</b>: Learn tab lessons.{" "}
            <b>NDA twins</b>: board questions with an &quot;Asked in NDA&quot; link (on NDA, the questions they link
            to). <b>Bilingual</b>: Marathi and English.
          </li>
          <li>
            Every exam also has the question bank, chapter pages, Ask V, Fix your mistakes and the progress map, so
            those are not listed. &quot;intl&quot; marks an exam on intl.pyqvault.com.
          </li>
        </ul>
      </details>
    </>
  );
}
