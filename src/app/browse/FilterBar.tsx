"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  buildSearchParams,
  type Difficulty,
  type Filters,
} from "@/lib/questions/filters";

type Option = { id: string; name: string };

type Props = {
  filters: Filters;
  exams: Option[];
  subjects: Option[];
  chapters: Option[];
  subtopics: Option[];
};

const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];

export default function FilterBar({
  filters,
  exams,
  subjects,
  chapters,
  subtopics,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(filters.q);

  useEffect(() => {
    setSearchInput(filters.q);
  }, [filters.q]);

  function applyFilters(next: Filters) {
    const url = `/browse?${buildSearchParams(next).toString()}`;
    startTransition(() => router.push(url));
  }

  function update(partial: Partial<Filters>) {
    let next: Filters = { ...filters, ...partial, page: 1 };
    if ("examId" in partial && partial.examId !== filters.examId) {
      next = { ...next, subjectId: null, chapterIds: [], subtopicIds: [] };
    }
    if ("subjectId" in partial && partial.subjectId !== filters.subjectId) {
      next = { ...next, chapterIds: [], subtopicIds: [] };
    }
    if ("chapterIds" in partial) {
      next = { ...next, subtopicIds: [] };
    }
    applyFilters(next);
  }

  function toggleInArray<T>(arr: T[], value: T): T[] {
    return arr.includes(value)
      ? arr.filter((x) => x !== value)
      : [...arr, value];
  }

  function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    update({ q: searchInput.trim() });
  }

  const cleared: Filters = {
    examId: null,
    subjectId: null,
    chapterIds: [],
    subtopicIds: [],
    difficulties: [],
    q: "",
    page: 1,
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 space-y-4",
        pending && "opacity-60 pointer-events-none"
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="exam">Exam</Label>
          <select
            id="exam"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={filters.examId ?? ""}
            onChange={(e) => update({ examId: e.target.value || null })}
          >
            <option value="">All exams</option>
            {exams.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject">Subject</Label>
          <select
            id="subject"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={filters.subjectId ?? ""}
            onChange={(e) => update({ subjectId: e.target.value || null })}
            disabled={!filters.examId}
          >
            <option value="">
              {filters.examId ? "All subjects" : "Pick an exam first"}
            </option>
            {subjects.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CheckboxGroup
        label="Chapters"
        emptyMessage={
          filters.subjectId
            ? "No chapters yet"
            : "Pick a subject to see chapters"
        }
        options={chapters}
        selected={filters.chapterIds}
        disabled={!filters.subjectId}
        onChange={(id) =>
          update({ chapterIds: toggleInArray(filters.chapterIds, id) })
        }
      />

      <CheckboxGroup
        label="Subtopics"
        emptyMessage={
          filters.chapterIds.length > 0
            ? "No subtopics in selected chapters"
            : "Pick at least one chapter"
        }
        options={subtopics}
        selected={filters.subtopicIds}
        disabled={filters.chapterIds.length === 0}
        onChange={(id) =>
          update({ subtopicIds: toggleInArray(filters.subtopicIds, id) })
        }
      />

      <div className="space-y-1.5">
        <Label>Difficulty</Label>
        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => {
            const on = filters.difficulties.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() =>
                  update({
                    difficulties: toggleInArray(filters.difficulties, d),
                  })
                }
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                  on
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-input hover:bg-accent"
                )}
                aria-pressed={on}
              >
                {d}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={onSearchSubmit} className="space-y-1.5">
        <Label htmlFor="q">Search</Label>
        <div className="flex gap-2">
          <Input
            id="q"
            placeholder="Search question text and solution…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </div>
      </form>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => applyFilters(cleared)}
          disabled={
            !filters.examId &&
            !filters.subjectId &&
            filters.chapterIds.length === 0 &&
            filters.subtopicIds.length === 0 &&
            filters.difficulties.length === 0 &&
            !filters.q
          }
        >
          Clear all filters
        </Button>
      </div>
    </div>
  );
}

function CheckboxGroup({
  label,
  emptyMessage,
  options,
  selected,
  disabled,
  onChange,
}: {
  label: string;
  emptyMessage: string;
  options: Option[];
  selected: string[];
  disabled: boolean;
  onChange: (id: string) => void;
}) {
  const summary =
    selected.length === 0
      ? "All"
      : `${selected.length} selected`;

  return (
    <details className="group">
      <summary
        className={cn(
          "cursor-pointer list-none flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent",
          disabled && "cursor-not-allowed opacity-50 pointer-events-none"
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{summary}</span>
      </summary>
      <div className="mt-2 max-h-60 overflow-y-auto rounded-md border bg-background p-3">
        {options.length === 0 ? (
          <p className="text-xs text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ul className="space-y-1.5">
            {options.map((o) => (
              <li key={o.id}>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selected.includes(o.id)}
                    onChange={() => onChange(o.id)}
                    className="h-4 w-4 rounded border-input"
                  />
                  <span>{o.name}</span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
