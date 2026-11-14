"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import type { ExamCoverageRow } from "@/lib/examFeatures/build";

type Kind = "text" | "num" | "bool" | "students" | "mocks";
type Col = { key: keyof ExamCoverageRow; label: string; kind: Kind; split?: boolean };

/** Column order = the order of the page's definitions list. */
const COLS: Col[] = [
  { key: "exam", label: "Exam", kind: "text" },
  { key: "goalLabel", label: "Goal", kind: "text" },
  { key: "students", label: "Students", kind: "students", split: true },
  { key: "active30", label: "Active 30d", kind: "num" },
  { key: "mockTakers", label: "Sat a mock", kind: "num" },
  { key: "pyq", label: "PYQs", kind: "num", split: true },
  { key: "practice", label: "Practice", kind: "num" },
  { key: "fullMocks", label: "Full mocks", kind: "mocks", split: true },
  { key: "sectionMocks", label: "Chapter tests", kind: "num" },
  { key: "notes", label: "Notes", kind: "num", split: true },
  { key: "guides", label: "Guides", kind: "num" },
  { key: "homework", label: "Homework", kind: "num" },
  { key: "boardReader", label: "Board reader", kind: "bool", split: true },
  { key: "boardPapers", label: "Board papers", kind: "num" },
  { key: "animated", label: "Animated", kind: "num", split: true },
  { key: "learn", label: "Learn", kind: "bool" },
  { key: "ndaTwins", label: "NDA twins", kind: "num" },
  { key: "bilingual", label: "Bilingual", kind: "bool" },
];

type Sort = { key: keyof ExamCoverageRow; dir: "asc" | "desc" };

const fmt = (n: number) => n.toLocaleString("en-IN");

function None() {
  return (
    <>
      <span aria-hidden className="text-muted-foreground/50">
        ·
      </span>
      <span className="sr-only">None</span>
    </>
  );
}

function Cell({ col, row, max }: { col: Col; row: ExamCoverageRow; max: number }) {
  const v = row[col.key];
  if (col.key === "exam") {
    return (
      <span className="font-medium">
        {row.exam}
        {row.intl && (
          <span className="ml-1.5 rounded bg-muted px-1 py-0.5 text-[10px] font-normal uppercase tracking-wide text-muted-foreground">
            intl
          </span>
        )}
      </span>
    );
  }
  if (col.kind === "text") return <span className="text-muted-foreground">{String(v)}</span>;
  if (col.kind === "bool") {
    return v ? (
      <>
        <Check aria-hidden className="ml-auto h-4 w-4 text-emerald-600 dark:text-emerald-400" />
        <span className="sr-only">Yes</span>
      </>
    ) : (
      <None />
    );
  }
  const n = Number(v);
  if (col.kind === "students") {
    return (
      <span className="inline-flex items-center justify-end gap-2">
        <span aria-hidden className="inline-block h-1.5 w-16 overflow-hidden rounded-full bg-muted">
          <span className="block h-full rounded-full bg-brand" style={{ width: `${(n / max) * 100}%` }} />
        </span>
        <span className={n === 0 ? "text-muted-foreground" : undefined}>{fmt(n)}</span>
      </span>
    );
  }
  if (col.kind === "mocks" && n === 0 && row.draftMocks > 0) {
    return <span className="text-amber-700 dark:text-amber-400">{fmt(row.draftMocks)} drafts</span>;
  }
  return n > 0 ? <>{fmt(n)}</> : <None />;
}

export default function ExamFeaturesTable({
  rows,
  goals,
}: {
  rows: ExamCoverageRow[];
  goals: { value: string; label: string }[];
}) {
  const [sort, setSort] = useState<Sort>({ key: "students", dir: "desc" });
  const [goal, setGoal] = useState("all");
  const max = Math.max(1, ...rows.map((r) => r.students));

  const shown = useMemo(() => {
    const out = rows.filter((r) => goal === "all" || r.goal === goal);
    const col = COLS.find((c) => c.key === sort.key);
    const textual = col?.kind === "text";
    out.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      let c = textual ? String(av).localeCompare(String(bv)) : Number(av) - Number(bv);
      if (sort.dir === "desc") c = -c;
      return c || b.students - a.students || a.exam.localeCompare(b.exam);
    });
    return out;
  }, [rows, goal, sort]);

  const sortBy = (col: Col) =>
    setSort((s) =>
      s.key === col.key
        ? { key: col.key, dir: s.dir === "desc" ? "asc" : "desc" }
        : { key: col.key, dir: col.kind === "text" ? "asc" : "desc" },
    );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <label htmlFor="exam-features-goal" className="text-muted-foreground">
          Show
        </label>
        <select
          id="exam-features-goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="h-9 rounded-md border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All goals</option>
          {goals.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
        <span className="text-muted-foreground">
          {shown.length} {shown.length === 1 ? "exam" : "exams"}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-separate border-spacing-0 text-sm tabular-nums">
          <thead>
            <tr>
              {COLS.map((col, i) => {
                const active = sort.key === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    aria-sort={active ? (sort.dir === "desc" ? "descending" : "ascending") : "none"}
                    className={[
                      "whitespace-nowrap border-b bg-card px-3 py-2 align-bottom text-xs font-medium text-muted-foreground",
                      col.kind === "text" ? "text-left" : "text-right",
                      col.split ? "border-l" : "",
                      i === 0 ? "sticky left-0 z-10 border-r" : "",
                    ].join(" ")}
                  >
                    <button
                      type="button"
                      onClick={() => sortBy(col)}
                      className={[
                        "inline-flex items-center gap-1 rounded hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        active ? "text-foreground" : "",
                      ].join(" ")}
                    >
                      {col.label}
                      {active &&
                        (sort.dir === "desc" ? (
                          <ArrowDown aria-hidden className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowUp aria-hidden className="h-3.5 w-3.5" />
                        ))}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {shown.map((row) => (
              <tr key={row.slug} className="group">
                {COLS.map((col, i) => (
                  <td
                    key={col.key}
                    className={[
                      "whitespace-nowrap border-b px-3 py-2 group-last:border-b-0 group-hover:bg-muted/50",
                      col.kind === "text" ? "text-left" : "text-right",
                      col.split ? "border-l" : "",
                      i === 0 ? "sticky left-0 z-10 border-r bg-card" : "",
                    ].join(" ")}
                  >
                    {col.kind === "bool" ? (
                      <span className="flex justify-end">
                        <Cell col={col} row={row} max={max} />
                      </span>
                    ) : (
                      <Cell col={col} row={row} max={max} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
