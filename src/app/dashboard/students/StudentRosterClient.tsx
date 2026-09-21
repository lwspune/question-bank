"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronsUpDown, Download } from "lucide-react";
import StatCard from "@/app/dashboard/StatCard";
import WhatsappLink from "@/components/contact/WhatsappLink";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import {
  EXAM_UNSPECIFIED,
  filterRoster,
  formatMobile,
  sortRoster,
  summariseRoster,
  toRosterCsv,
  type DateField,
  type SortDir,
  type SortKey,
  type StudentRosterRow,
  type TimeWindow,
} from "@/lib/students/roster";

/** Stable, locale-independent (avoids hydration drift): YYYY-MM-DD. */
function fmtDate(iso: string | null): string {
  return iso ? iso.slice(0, 10) : "—";
}

const WINDOWS: { id: string; label: string; window: TimeWindow }[] = [
  { id: "all", label: "All time", window: { kind: "all" } },
  { id: "7", label: "7 days", window: { kind: "days", days: 7 } },
  { id: "30", label: "30 days", window: { kind: "days", days: 30 } },
  { id: "90", label: "90 days", window: { kind: "days", days: 90 } },
  { id: "never", label: "Never active", window: { kind: "never" } },
];

type Column = { key: SortKey; label: string; help: string; numeric: boolean };

const COLUMNS: Column[] = [
  { key: "name", label: "Student", help: "name", numeric: false },
  { key: "mocksSubmitted", label: "Mocks", help: "mocks submitted", numeric: true },
  { key: "avgPct", label: "Avg %", help: "average score", numeric: true },
  { key: "qsAnswered", label: "Questions", help: "questions answered", numeric: true },
  { key: "notesSubtopics", label: "Notes", help: "notes subtopics touched", numeric: true },
  { key: "bookmarks", label: "Saved", help: "bookmarked questions", numeric: true },
  { key: "lastActive", label: "Last active", help: "last learning action", numeric: true },
  { key: "signedUp", label: "Joined", help: "signup date", numeric: true },
];

export default function StudentRosterClient({ rows }: { rows: StudentRosterRow[] }) {
  const [exams, setExams] = useState<string[]>([]);
  const [windowId, setWindowId] = useState("all");
  const [dateField, setDateField] = useState<DateField>("lastActive");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("mocksSubmitted");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // One clock for filtering and the summary, so a row can't be "active" for one
  // and not the other. Recomputed per render, which is fine for a day-scale window.
  const now = useMemo(() => new Date(), []);
  const window = WINDOWS.find((w) => w.id === windowId)!.window;

  const visible = useMemo(() => {
    const filtered = filterRoster(rows, { exams, window, dateField, search }, now);
    return sortRoster(filtered, sortKey, sortDir);
  }, [rows, exams, window, dateField, search, sortKey, sortDir, now]);

  const summary = useMemo(() => summariseRoster(visible, now), [visible, now]);

  function toggleExam(slug: string) {
    setExams((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  function sortOn(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // Names read naturally A→Z; every metric is most interesting at the top.
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function exportCsv() {
    // Exports what is on screen — same filters, same order.
    const blob = new Blob([toRosterCsv(visible)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `students-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtering = exams.length > 0 || windowId !== "all" || search.trim() !== "";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard kind="numeric" value={summary.students} label={filtering ? "Students (filtered)" : "Students"} />
        <StatCard kind="numeric" value={summary.activeLast7} label="Active last 7 days" />
        <StatCard kind="numeric" value={summary.neverActive} label="Never active" />
        <StatCard kind="numeric" value={summary.totalMocksSubmitted} label="Mocks submitted" />
        <StatCard kind="text" value={summary.avgPct === null ? "—" : `${summary.avgPct}%`} label="Average score" />
        <StatCard kind="numeric" value={summary.withMobile} label="Mobile captured" />
      </div>

      <div className="space-y-3 rounded-lg border bg-card p-4">
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email or mobile…"
            aria-label="Search students"
            className="h-9 min-w-[16rem] flex-1 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <label className="sr-only" htmlFor="date-field">
            Date the time filter applies to
          </label>
          <select
            id="date-field"
            value={dateField}
            onChange={(e) => setDateField(e.target.value as DateField)}
            className="h-9 rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="lastActive">Active in</option>
            <option value="signedUp">Joined in</option>
          </select>
          <div className="flex flex-wrap gap-1" role="group" aria-label="Time window">
            {WINDOWS.filter((w) => !(w.id === "never" && dateField === "signedUp")).map((w) => (
              <button
                key={w.id}
                type="button"
                aria-pressed={windowId === w.id}
                onClick={() => setWindowId(w.id)}
                className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  windowId === w.id ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="h-4 w-4" aria-hidden /> CSV
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Filter by target exam">
          {EXAM_REGISTRY.map((e) => (
            <ExamChip key={e.slug} label={e.displayName} on={exams.includes(e.slug)} onClick={() => toggleExam(e.slug)} />
          ))}
          {/* Students who never named a target exam are a real, sizeable group —
              they get an explicit bucket rather than silently vanishing. */}
          <ExamChip
            label="Not specified"
            on={exams.includes(EXAM_UNSPECIFIED)}
            onClick={() => toggleExam(EXAM_UNSPECIFIED)}
          />
          {exams.length > 0 && (
            <button
              type="button"
              onClick={() => setExams([])}
              className="ml-1 rounded-md px-2 py-1 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Clear
            </button>
          )}
        </div>

        <p className="font-mono text-xs text-muted-foreground">
          {visible.length} of {rows.length} students
        </p>
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No students match these filters.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                {COLUMNS.map((c) => (
                  <SortHeader
                    key={c.key}
                    column={c}
                    active={sortKey === c.key}
                    dir={sortDir}
                    onClick={() => sortOn(c.key)}
                  />
                ))}
                <th scope="col" className="px-3 py-2 text-left font-medium">
                  Target exams
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {visible.map((s) => (
                <tr key={s.id} className="group hover:bg-accent/40">
                  <td className="max-w-[16rem] px-3 py-2">
                    <Link
                      // One per student — 315 rows today, each pointing at a
                      // page that re-reads that student whole. Prefetching the
                      // visible ones is a thundering herd; see
                      // tests/dashboard-students-no-prefetch.test.ts.
                      prefetch={false}
                      href={`/dashboard/students/${s.id}`}
                      className="block min-w-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="block truncate font-medium group-hover:text-brand-accent" title={s.name}>
                        {s.name}
                      </span>
                    </Link>
                    {/* Outside the row link on purpose: an anchor nested in an
                        anchor is invalid HTML, and this one has to be its own. */}
                    <span className="block truncate text-xs text-muted-foreground" title={s.email}>
                      <WhatsappLink mobile={s.mobile} icon={false}>
                        {formatMobile(s.mobile)}
                      </WhatsappLink>{" "}
                      · {s.email}
                    </span>
                  </td>
                  <td className="px-3 py-2 tabular-nums">
                    {s.mocksSubmitted}
                    {s.mocksStarted > s.mocksSubmitted && (
                      <span className="text-xs text-muted-foreground"> /{s.mocksStarted}</span>
                    )}
                  </td>
                  {/* No graded attempt is a dash, never 0% — "not scored yet" is not "scored zero". */}
                  <td className="px-3 py-2 tabular-nums">{s.avgPct === null ? "—" : `${s.avgPct}%`}</td>
                  <td className="px-3 py-2 tabular-nums">{s.qsAnswered.toLocaleString("en-IN")}</td>
                  <td className="px-3 py-2 tabular-nums">
                    {s.notesSubtopics}
                    {s.notesMastered > 0 && (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400"> ·{s.notesMastered}★</span>
                    )}
                  </td>
                  <td className="px-3 py-2 tabular-nums">{s.bookmarks}</td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">{fmtDate(s.lastActive)}</td>
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">{fmtDate(s.signedUp)}</td>
                  <td className="px-3 py-2">
                    {s.targetExams.length === 0 ? (
                      <span className="text-xs text-muted-foreground">—</span>
                    ) : (
                      <span className="flex flex-wrap gap-1">
                        {s.targetExams.map((x) => (
                          <span key={x} className="rounded border px-1.5 py-0.5 text-[11px] text-muted-foreground">
                            {x}
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ExamChip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        on ? "border-brand bg-brand text-brand-foreground" : "hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

function SortHeader({
  column,
  active,
  dir,
  onClick,
}: {
  column: Column;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  const Icon = !active ? ChevronsUpDown : dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th
      scope="col"
      // aria-sort on the header cell is what a screen reader announces.
      aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"}
      className={`px-3 py-2 font-medium ${column.numeric && column.key !== "name" ? "text-left" : "text-left"}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center gap-1 rounded-sm uppercase tracking-wide hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Sort by ${column.help}${active ? (dir === "asc" ? ", currently ascending" : ", currently descending") : ""}`}
      >
        {column.label}
        <Icon className={`h-3.5 w-3.5 ${active ? "text-brand-accent" : "text-muted-foreground/50"}`} aria-hidden />
      </button>
    </th>
  );
}
