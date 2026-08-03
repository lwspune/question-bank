import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Table2 } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { getSessionMember } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  loadSyllabusMatrix,
  loadChapterConcepts,
  loadMappingRows,
  loadOldSyllabusChapters,
  loadAlignmentRows,
  loadExamSpineSummaries,
} from "@/lib/syllabus/query";
import { SPINE } from "@/lib/syllabus/summary";
import AlignmentTable from "./AlignmentTable";
import CollapsibleSection from "./CollapsibleSection";
import MappingTable from "./MappingTable";
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
  // Old-syllabus chapters are needed before the rows so the sort can sink them.
  const oldSyllabus = await loadOldSyllabusChapters(db);
  const [matrix, ncertRows, jeeRows, examSpines, alignRows] = await Promise.all([
    loadSyllabusMatrix(db),
    loadMappingRows(db, {
      spine: SPINE.ncert,
      books: ["MH State Board"],
      topLevelOnly: true,
    }),
    loadMappingRows(db, {
      spine: SPINE.jee,
      // Both books on one row, so "neither covers this" is visible at a glance.
      books: ["MH State Board", "CBSE Class 12"],
      oldSyllabus,
      // Chapters run in State Board book order rather than alphabetically, so
      // this reads as a teaching sequence. Deliberately NOT set on the NCERT
      // table above: that one keeps its own book order.
      orderByBook: "MH State Board",
    }),
    loadExamSpineSummaries(db, { oldSyllabus }),
    loadAlignmentRows(db, { oldSyllabus }),
  ]);

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
          <h2 id="coverage" className="mb-1 text-sm font-semibold">
            Does the State Board cover what each exam asks?
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Rows are each exam&rsquo;s OWN subtopics, taken from the question bank. This is the
            inverse of the chapter matrix below, and the only direction that can say &ldquo;the exam
            asks something the books never teach&rdquo;. Chapters an exam no longer sets are
            excluded &mdash; counting them inflates the gap with history.
          </p>
          <div className="overflow-x-auto rounded-md border">
            <table className="w-full min-w-[38rem] text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th scope="col" className="p-3 text-left font-medium">Exam</th>
                  <th scope="col" className="p-3 text-right font-medium">Its own subtopics</th>
                  <th scope="col" className="p-3 text-right font-medium">Covered</th>
                  <th scope="col" className="p-3 text-right font-medium">Partly</th>
                  <th scope="col" className="p-3 text-right font-medium">Not covered</th>
                </tr>
              </thead>
              <tbody>
                {examSpines.map((e) => (
                  <tr key={e.spine} className="border-t">
                    <th scope="row" className="p-3 text-left font-medium">
                      {e.label}
                      <span className="block text-xs font-normal text-muted-foreground">
                        from the question bank
                        {e.oldExcluded > 0 && ` · excludes ${e.oldExcluded} old-syllabus`}
                      </span>
                    </th>
                    <td className="p-3 text-right tabular-nums">{e.live}</td>
                    <td className="p-3 text-right tabular-nums">{e.full}</td>
                    <td className="p-3 text-right tabular-nums">{e.partial || "—"}</td>
                    <td
                      className={`p-3 text-right font-semibold tabular-nums ${
                        e.not ? "text-rose-700 dark:text-rose-300" : ""
                      }`}
                    >
                      {e.not}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="live-gaps" className="mb-8">
          <h2 id="live-gaps" className="mb-1 text-sm font-semibold">
            Live gaps &mdash; exam subtopics the State Board does not fully cover
          </h2>
          <p className="mb-3 text-xs text-muted-foreground">
            Rows are <strong>exam subtopics</strong>, split into those the State Board does not
            cover at all and those it covers only partly. Sorted by PYQ weight, so the most
            expensive gap is first. Old-syllabus chapters are not listed: they are history, and
            letting a dead chapter outrank a live one would misdirect the prioritisation this
            view exists to support.
          </p>
          <div className="space-y-4">
            {examSpines
              .filter((e) => e.gaps.length > 0 || e.partials.length > 0)
              .map((e) => (
                <div key={e.spine} className="rounded-md border">
                  <p className="border-b bg-muted/30 p-3 text-sm font-medium">{e.label}</p>
                  {(
                    [
                      ["Not covered", e.gaps, "text-rose-700 dark:text-rose-300"],
                      ["Partly covered", e.partials, "text-amber-700 dark:text-amber-300"],
                    ] as const
                  ).map(([label, list, tone]) =>
                    list.length === 0 ? null : (
                      <div key={label}>
                        <h3 className={`border-b bg-muted/10 px-3 py-2 text-xs font-semibold ${tone}`}>
                          {label} &mdash; {list.length} subtopic{list.length === 1 ? "" : "s"} (
                          {list.reduce((n, r) => n + r.pyq, 0)} PYQ)
                        </h3>
                        <ul className="divide-y">
                          {list.map((g) => (
                            <li key={g.id} className="flex gap-3 p-3 text-sm">
                              <span className="w-10 shrink-0 text-right tabular-nums text-muted-foreground">
                                {g.pyq || "—"}
                              </span>
                              <span className="min-w-0">
                                <span className="font-medium">{g.concept}</span>
                                <span className="ml-2 text-xs text-muted-foreground">
                                  {g.chapterName}
                                </span>
                                {/* Where it IS partly covered, the pointer is the
                                    actionable part — "partly" alone tells a teacher
                                    nothing about which section to open. */}
                                {g.covers["MH State Board"]?.refs.length > 0 && (
                                  <span className="mt-1 block text-xs text-muted-foreground">
                                    State Board:{" "}
                                    {g.covers["MH State Board"].refs
                                      .map((r) => (r.title ? `${r.no} ${r.title}` : r.no))
                                      .join(" · ")}
                                  </span>
                                )}
                                {g.covers["MH State Board"]?.note && (
                                  <span className="mt-1 block text-xs text-muted-foreground">
                                    {g.covers["MH State Board"].note}
                                  </span>
                                )}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </div>
              ))}
            {examSpines.every((e) => e.gaps.length === 0 && e.partials.length === 0) && (
              <p className="text-sm text-muted-foreground">
                No live gaps &mdash; every subtopic these exams set is fully taught by the State
                Board.
              </p>
            )}
          </div>
        </section>

        {/* gap view — what the State Board teaches that an exam does not need */}
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

        {([11, 12] as const).map((cls) => {
          const rows = alignRows.filter((r) => r.anchor.cls === cls);
          if (rows.length === 0) return null;
          return (
            <CollapsibleSection
              key={`align-${cls}`}
              id={`align-${cls}`}
              title={`Std ${cls === 11 ? "XI" : "XII"} — State Board · NCERT · JEE Mains, side by side`}
              count={rows.length}
              description={
                <>
                One subtopic per cell, in State Board book order. A subtopic <strong>repeats</strong>
                {" "}
                down a column when it answers more than one thing on the other side &mdash; that is
                what keeps every cell a single subtopic instead of a list. NCERT and JEE sit on the
                same row only where that pairing was <strong>authored</strong>; where it was not,
                each gets its own row rather than being paired off just for sharing a State Board
                section. The two blanks differ: &ldquo;not in NCERT&rdquo; is a checked claim, while
                &ldquo;not asked in the bank&rdquo; only means no past question has been sampled for
                it &mdash; not that JEE never asks it.
                </>
              }
            >
              <AlignmentTable rows={rows} />
            </CollapsibleSection>
          );
        })}

        {/* Split by YEAR, and in NCERT book order within each. One combined table
            could not be ordered honestly: both NCERT years number their chapters
            from 1, so a single sequence either interleaves two different Ch.1s or
            hides the year. */}
        {([11, 12] as const).map((cls) => {
          const rows = ncertRows.filter((r) => r.cls === cls);
          if (rows.length === 0) return null;
          return (
            <CollapsibleSection
              key={cls}
              id={`ncert-map-${cls}`}
              title={`NCERT Std ${cls === 11 ? "XI" : "XII"} — which State Board subtopic covers each`}
              count={rows.length}
              description={
                <>
                The question a CBSE student asks: I have this NCERT section, where is it in my
                State Board book? In NCERT book order. Top-level sections only; every pointer
                was read off both books.
                {/* Measured, not assumed: 12 of 72 Std XI rows cross into the Std
                    XII State Board book and every one of them is Thermodynamics
                    or Equilibrium. Std XII crosses back exactly once, so the
                    callout belongs on this year only. */}
                {cls === 11 &&
                  " Watch the year: NCERT teaches Thermodynamics and Equilibrium in Class 11, but the State Board holds them until Std XII — the mismatch there is timing, not absence."}
                </>
              }
            >
              <MappingTable
                rows={rows}
                rowLabel="NCERT subtopic"
                books={[{ exam: "MH State Board", label: "State Board" }]}
              />
            </CollapsibleSection>
          );
        })}

        <CollapsibleSection
          id="jee-map"
          title="JEE Mains — where each subtopic is taught"
          count={jeeRows.length}
          description={
            <>
            Rows are what JEE actually asked, from the question bank, so each carries its PYQ
            count. Chapters run in <strong>State Board book order</strong> — each sits at the
            State Board chapter holding most of its questions, named after the arrow, so you can
            read down the book you teach from. Where that chapter is chosen by a one- or
            two-question margin the placement is soft, so check the row itself before relying on
            it. Chapters JEE no longer sets are marked old syllabus and listed last. Because the
            spine is the bank rather than the official syllabus, a topic never sampled has no
            row — absence here is not evidence of absence from the exam.
            </>
          }
        >
          <MappingTable
            rows={jeeRows}
            rowLabel="JEE subtopic"
            showPyq
            books={[
              { exam: "MH State Board", label: "State Board" },
              { exam: "CBSE Class 12", label: "NCERT" },
            ]}
          />
        </CollapsibleSection>

        <p className="text-xs text-muted-foreground">
          Rulings are authored in <code>scripts/syllabus/data/</code> and committed with{" "}
          <code>commit-exam.ts</code>. Refresh the map with{" "}
          <code>npm run syllabus:gap</code>.
        </p>
      </main>
    </>
  );
}
