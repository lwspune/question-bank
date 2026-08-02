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
  buildGapView,
  chapterKey,
  parseChapterKey,
  type ChapterStatus,
  type ConceptStatus,
} from "@/lib/syllabus/summary";

export const dynamic = "force-dynamic";

type Search = { chapter?: string; gap?: string };

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

  // Only a known exam may drive the gap view; an unrecognised ?gap= falls back
  // to no selection rather than rendering an all-unassessed table that would
  // read as "this exam needs nothing".
  const gapExam =
    searchParams.gap && (SYLLABUS_EXAMS as readonly string[]).includes(searchParams.gap)
      ? (searchParams.gap as (typeof SYLLABUS_EXAMS)[number])
      : null;
  const gap = gapExam ? buildGapView(matrix.chapters, gapExam) : null;

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

        {/* gap view — what the State Board teaches that an exam does not need */}
        <section aria-labelledby="gap" className="mb-8">
          <h2 id="gap" className="mb-1 text-sm font-semibold">
            Gap view — taught by the State Board, not required by
          </h2>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {SYLLABUS_EXAMS.filter((e) => e !== "MH State Board").map((exam) => {
              const active = gapExam === exam;
              return (
                <Link
                  key={exam}
                  href={active ? "/dashboard/syllabus" : `/dashboard/syllabus?gap=${encodeURIComponent(exam)}`}
                  scroll={false}
                  aria-pressed={active}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    active
                      ? "bg-brand text-brand-foreground border-transparent"
                      : "hover:bg-muted"
                  }`}
                >
                  {exam}
                </Link>
              );
            })}
          </div>

          {!gapExam ? (
            <p className="text-sm text-muted-foreground">
              Pick an exam to list the State Board chapters it does not require.
            </p>
          ) : (
            <>
              <p className="mb-3 text-sm">
                <strong className="tabular-nums">{gap!.notConcepts}</strong> of{" "}
                <span className="tabular-nums">{matrix.totalConcepts}</span> concepts (
                {Math.round((gap!.notConcepts / matrix.totalConcepts) * 100)}%) are taught by
                the State Board but never required by {gapExam}
                {gap!.partlyConcepts > 0 && (
                  <>
                    ; a further{" "}
                    <strong className="tabular-nums">{gap!.partlyConcepts}</strong> are only
                    partly required
                  </>
                )}
                .
              </p>

              {gap!.unassessedConcepts > 0 && (
                <p className="mb-3 rounded-md border border-amber-300 bg-amber-50 p-2 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                  {gap!.unassessedConcepts} concepts have no ruling for {gapExam} yet. They are
                  listed separately below and must not be read as skippable.
                </p>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {(
                  [
                    ["Not required", gap!.notRequired, "text-muted-foreground"],
                    ["Partly required", gap!.partlyRequired, "text-amber-700 dark:text-amber-300"],
                    ...(gap!.unassessed.length
                      ? ([["Not yet assessed", gap!.unassessed, "text-amber-700 dark:text-amber-300"]] as const)
                      : []),
                  ] as const
                ).map(([label, list, tone]) => (
                  <div key={label} className="rounded-md border">
                    <h3 className={`border-b bg-muted/40 p-2 text-xs font-semibold ${tone}`}>
                      {label} — {list.length} chapter{list.length === 1 ? "" : "s"}
                    </h3>
                    {list.length === 0 ? (
                      <p className="p-3 text-xs text-muted-foreground">None.</p>
                    ) : (
                      <ul className="divide-y">
                        {list.map((c) => (
                          <li
                            key={`${c.cls}-${c.chapterNo}`}
                            className="flex items-baseline justify-between gap-3 p-2 text-sm"
                          >
                            <span>
                              <span className="mr-2 text-xs text-muted-foreground">
                                Std {c.cls === 11 ? "XI" : "XII"} · {c.chapterNo}
                              </span>
                              {c.chapterName}
                            </span>
                            <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
                              {c.conceptCount}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
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
                    <th scope="col" className="p-3 text-left font-medium w-14">Ref</th>
                    <th scope="col" className="p-3 text-left font-medium">Chapter / section</th>
                    <th scope="col" className="p-3 text-right font-medium w-16">Concepts</th>
                    {SYLLABUS_EXAMS.map((exam) => (
                      <th key={exam} scope="col" className="p-3 text-center font-medium">
                        {exam.replace("MH State Board", "State Board").replace(" Class 12", "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.flatMap((row) => {
                    const key = chapterKey(row.cls, row.chapterNo);
                    const isOpen = searchParams.chapter === key;

                    const chapterRow = (
                      <tr key={key} className="border-t bg-muted/30">
                        <td className="p-3 tabular-nums font-semibold">{row.chapterNo}</td>
                        <th scope="row" className="p-3 text-left font-semibold">
                          <Link
                            href={
                              isOpen
                                ? "/dashboard/syllabus"
                                : `/dashboard/syllabus?chapter=${key}`
                            }
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
                                className={`inline-block w-full rounded px-2 py-1 text-xs font-semibold ${
                                  CELL[s ?? "none"]
                                }`}
                              >
                                <span className="sr-only">
                                  {row.chapterName} overall — {exam}: {cellTitle(s)}.{" "}
                                </span>
                                <span aria-hidden>{cellText(s)}</span>
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );

                    const sectionRows = row.sections.map((sec) => (
                      <tr key={`${key}-${sec.sectionNo}`} className="border-t">
                        <td className="py-2 pl-3 pr-1 text-right font-mono text-[11px] text-muted-foreground">
                          {sec.sectionNo}
                        </td>
                        <th scope="row" className="py-2 pl-4 pr-3 text-left font-normal font-serif">
                          {sec.title}
                          {sec.conceptCount > 1 && (
                            <span className="ml-2 text-[11px] text-muted-foreground">
                              +{sec.conceptCount - 1} sub
                            </span>
                          )}
                        </th>
                        <td className="p-3 text-right tabular-nums text-muted-foreground">
                          {sec.conceptCount}
                        </td>
                        {SYLLABUS_EXAMS.map((exam) => {
                          const s = sec.status[exam];
                          return (
                            <td key={exam} className="p-1.5 text-center">
                              <span
                                title={cellTitle(s)}
                                className={`inline-block w-full rounded px-2 py-0.5 text-xs ${
                                  CELL[s ?? "none"]
                                }`}
                              >
                                <span className="sr-only">
                                  {sec.sectionNo} {sec.title} — {exam}: {cellTitle(s)}.{" "}
                                </span>
                                <span aria-hidden>{cellText(s)}</span>
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ));

                    return [chapterRow, ...sectionRows];
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
