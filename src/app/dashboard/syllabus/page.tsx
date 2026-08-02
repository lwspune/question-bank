import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Table2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { loadSyllabusMatrix, loadChapterConcepts } from "@/lib/syllabus/query";
import {
  SYLLABUS_EXAMS,
  STATUS_LABEL,
  STATUS_SHORT,
  chapterKey,
  parseChapterKey,
  type ChapterStatus,
  type ConceptStatus,
} from "@/lib/syllabus/summary";

export const dynamic = "force-dynamic";

type Search = { chapter?: string };

/**
 * Status colours carry a text label too — never colour alone, since the whole
 * table is a grid of small cells and colour-blind readers must still read it.
 */
const CELL: Record<Exclude<ChapterStatus, null> | "none", string> = {
  full: "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200",
  partial: "bg-amber-50 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200",
  not: "bg-muted text-muted-foreground",
  mixed: "bg-sky-50 text-sky-900 dark:bg-sky-950/50 dark:text-sky-200",
  none: "bg-background text-muted-foreground",
};

function cellText(status: ChapterStatus): string {
  if (status === null) return "?";
  if (status === "mixed") return "Mixed";
  return STATUS_SHORT[status];
}

function cellTitle(status: ChapterStatus): string {
  if (status === null) return "Not yet assessed";
  if (status === "mixed") return "Concepts in this chapter differ — open the chapter";
  return STATUS_LABEL[status];
}

export default async function SyllabusMapPage({ searchParams }: { searchParams: Search }) {
  const member = await getSessionMember();
  if (!member) redirect("/login");

  const db = createSupabaseServerClient();
  const matrix = await loadSyllabusMatrix(db);

  const selected = searchParams.chapter ? parseChapterKey(searchParams.chapter) : null;
  const detail = selected
    ? await loadChapterConcepts(db, selected.cls, selected.chapterNo)
    : null;

  const byClass = [11, 12].map((cls) => ({
    cls,
    rows: matrix.chapters.filter((c) => c.cls === cls),
  }));

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl p-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
          Dashboard
        </Link>

        <div className="mb-2 flex items-center gap-2">
          <Table2 className="h-5 w-5 text-brand-accent" aria-hidden />
          <h1 className="text-2xl font-semibold">Syllabus map — Chemistry</h1>
        </div>
        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          Every numbered section of the Maharashtra State Board Std XI and XII Chemistry
          textbooks ({matrix.totalConcepts} concepts across {matrix.chapters.length}{" "}
          chapters), and whether each exam requires it. A blank ruling means{" "}
          <strong>not yet assessed</strong>, which is not the same as out of syllabus.
        </p>

        {/* coverage summary */}
        <section aria-labelledby="coverage" className="mb-8">
          <h2 id="coverage" className="mb-2 text-sm font-semibold">
            Coverage by exam
          </h2>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full min-w-[34rem] text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="p-3 text-left font-medium">Exam</th>
                  <th scope="col" className="p-3 text-right font-medium">In syllabus</th>
                  <th scope="col" className="p-3 text-right font-medium">Partly</th>
                  <th scope="col" className="p-3 text-right font-medium">Not</th>
                  <th scope="col" className="p-3 text-right font-medium">Unassessed</th>
                </tr>
              </thead>
              <tbody>
                {SYLLABUS_EXAMS.map((exam) => {
                  const t = matrix.tallies[exam];
                  return (
                    <tr key={exam} className="border-t">
                      <th scope="row" className="p-3 text-left font-medium">{exam}</th>
                      <td className="p-3 text-right tabular-nums">{t.full}</td>
                      <td className="p-3 text-right tabular-nums">{t.partial}</td>
                      <td className="p-3 text-right tabular-nums">{t.not}</td>
                      <td className="p-3 text-right tabular-nums text-muted-foreground">
                        {t.unassessed}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* chapter x exam matrix */}
        {byClass.map(({ cls, rows }) => (
          <section key={cls} aria-labelledby={`std-${cls}`} className="mb-8">
            <h2 id={`std-${cls}`} className="mb-2 text-sm font-semibold">
              Std {cls === 11 ? "XI" : "XII"} — {rows.length} chapters
            </h2>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full min-w-[46rem] text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="p-3 text-left font-medium w-10">#</th>
                    <th scope="col" className="p-3 text-left font-medium">Chapter</th>
                    <th scope="col" className="p-3 text-right font-medium w-16">Concepts</th>
                    {SYLLABUS_EXAMS.map((exam) => (
                      <th key={exam} scope="col" className="p-3 text-center font-medium">
                        {exam.replace("MH State Board", "State Board").replace(" Class 12", "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const key = chapterKey(row.cls, row.chapterNo);
                    const isOpen = searchParams.chapter === key;
                    return (
                      <tr key={key} className={`border-t ${isOpen ? "bg-brand/5" : ""}`}>
                        <td className="p-3 tabular-nums text-muted-foreground">
                          {row.chapterNo}
                        </td>
                        <th scope="row" className="p-3 text-left font-normal">
                          <Link
                            href={isOpen ? "/dashboard/syllabus" : `/dashboard/syllabus?chapter=${key}`}
                            scroll={false}
                            className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                            aria-expanded={isOpen}
                          >
                            {row.chapterName}
                          </Link>
                        </th>
                        <td className="p-3 text-right tabular-nums text-muted-foreground">
                          {row.conceptCount}
                        </td>
                        {SYLLABUS_EXAMS.map((exam) => {
                          const s = row.status[exam];
                          return (
                            <td key={exam} className="p-1.5 text-center">
                              <span
                                title={cellTitle(s)}
                                className={`inline-block w-full rounded px-2 py-1 text-xs font-medium ${
                                  CELL[s ?? "none"]
                                }`}
                              >
                                <span className="sr-only">
                                  {exam}: {cellTitle(s)}.{" "}
                                </span>
                                <span aria-hidden>{cellText(s)}</span>
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        {/* per-chapter detail */}
        {detail && selected && (
          <section aria-labelledby="detail" className="mb-8">
            <h2 id="detail" className="mb-2 text-sm font-semibold">
              Std {selected.cls === 11 ? "XI" : "XII"} Ch. {selected.chapterNo} —{" "}
              {detail.chapterName}
            </h2>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full min-w-[46rem] text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="p-3 text-left font-medium w-20">Section</th>
                    <th scope="col" className="p-3 text-left font-medium">Concept</th>
                    {SYLLABUS_EXAMS.map((exam) => (
                      <th key={exam} scope="col" className="p-3 text-center font-medium">
                        {exam.replace("MH State Board", "State Board").replace(" Class 12", "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detail.concepts.map((c) => (
                    <tr key={c.id} className="border-t">
                      <td className="p-3 font-mono text-xs text-muted-foreground">
                        {c.sectionNo}
                      </td>
                      <th scope="row" className="p-3 text-left font-normal font-serif">
                        {c.concept}
                      </th>
                      {SYLLABUS_EXAMS.map((exam) => {
                        const s: ConceptStatus | null = c.status[exam];
                        return (
                          <td key={exam} className="p-1.5 text-center">
                            <span
                              title={s ? STATUS_LABEL[s] : "Not yet assessed"}
                              className={`inline-block w-full rounded px-2 py-1 text-xs ${
                                CELL[s ?? "none"]
                              }`}
                            >
                              <span className="sr-only">
                                {exam}: {s ? STATUS_LABEL[s] : "Not yet assessed"}.{" "}
                              </span>
                              <span aria-hidden>{s ? STATUS_SHORT[s] : "?"}</span>
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* why: the ruling notes carry the evidence behind each status */}
            <div className="mt-3 space-y-2">
              {SYLLABUS_EXAMS.map((exam) => {
                const note = detail.concepts.find((c) => c.notes[exam])?.notes[exam];
                if (!note) return null;
                return (
                  <p key={exam} className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{exam}:</span> {note}
                  </p>
                );
              })}
            </div>
          </section>
        )}

        <p className="text-xs text-muted-foreground">
          Rulings are authored in <code>scripts/syllabus/data/</code> and committed with{" "}
          <code>commit-exam.ts</code>. Refresh the map with{" "}
          <code>npm run syllabus:gap</code>.
        </p>
      </main>
    </>
  );
}
