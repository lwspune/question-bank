"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  buildSearchParams,
  type Difficulty,
  type Filters,
} from "@/lib/questions/filters";
import { applyPartial } from "@/lib/questions/applyPartial";
import { selectRecentYears } from "@/lib/questions/selectRecentYears";

type Option = { id: string; name: string; count?: number };

type Props = {
  filters: Filters;
  exams: Option[];
  subjects: Option[];
  chapters: Option[];
  subtopics: Option[];
  pyqYears: number[];
  /**
   * "live"   — each change commits to the URL immediately (desktop sidebar).
   * "staged" — each change calls onChange(next); nothing routes. Used by
   *            MobileFilters which buffers staged changes and commits on
   *            an explicit Apply.
   */
  mode?: "live" | "staged";
  onChange?: (next: Filters) => void;
  onApply?: () => void;
};

const DIFFICULTIES: Difficulty[] = ["EASY", "MODERATE", "HARD"];
const ALL = "__ALL__";

export default function FilterBar({
  filters,
  exams,
  subjects,
  chapters,
  subtopics,
  pyqYears,
  mode = "live",
  onChange,
  onApply,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(filters.q);

  useEffect(() => {
    setSearchInput(filters.q);
  }, [filters.q]);

  function applyFilters(next: Filters) {
    const url = `/browse?${buildSearchParams(next).toString()}`;
    startTransition(() => {
      router.push(url);
      onApply?.();
    });
  }

  /** Either commit to URL (live) or hand to parent (staged). */
  function commit(next: Filters) {
    if (mode === "staged") {
      onChange?.(next);
    } else {
      applyFilters(next);
    }
  }

  function update(partial: Partial<Filters>) {
    commit(applyPartial(filters, partial));
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
    pyqYears: [],
    extraIds: [],
    principleSlug: null,
    q: "",
    page: 1,
  };

  const hasAnyFilter =
    !!filters.examId ||
    !!filters.subjectId ||
    filters.chapterIds.length > 0 ||
    filters.subtopicIds.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.pyqYears.length > 0 ||
    !!filters.q;

  // Sections keyed for ordered rendering. Mobile sheet leads with difficulty
  // and PYQ year (the multi-pick filters teachers reach for most), pushing
  // the long chapter/subtopic accordions below the fold.
  const sections: Record<SectionKey, JSX.Element> = {
    exam: (
      <div className="space-y-1.5">
        <Label htmlFor="exam">Exam</Label>
        <Select
          value={filters.examId ?? ALL}
          onValueChange={(v) => update({ examId: v === ALL ? null : v })}
        >
          <SelectTrigger id="exam">
            <SelectValue placeholder="All exams" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All exams</SelectItem>
            {exams.map((x) => (
              <SelectItem key={x.id} value={x.id}>
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    subject: (
      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Select
          value={filters.subjectId ?? ALL}
          onValueChange={(v) => update({ subjectId: v === ALL ? null : v })}
          disabled={!filters.examId}
        >
          <SelectTrigger id="subject">
            <SelectValue
              placeholder={
                filters.examId ? "All subjects" : "Pick an exam first"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All subjects</SelectItem>
            {subjects.map((x) => (
              <SelectItem key={x.id} value={x.id}>
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    ),
    chapters: (
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
        onClear={
          filters.chapterIds.length > 0
            ? () => update({ chapterIds: [] })
            : undefined
        }
      />
    ),
    subtopics: (
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
        onClear={
          filters.subtopicIds.length > 0
            ? () => update({ subtopicIds: [] })
            : undefined
        }
      />
    ),
    pyqYears:
      pyqYears.length > 0 ? (
        <div className="space-y-1.5">
          <Label>PYQ year</Label>
          {/* Presets: most teachers want the recent 3 / 5 years. Saves 3-5 individual taps. */}
          <div className="mb-1 flex flex-wrap gap-1.5">
            <PresetChip
              label="Last 3 years"
              onClick={() =>
                update({ pyqYears: selectRecentYears(pyqYears, 3) })
              }
            />
            <PresetChip
              label="Last 5 years"
              onClick={() =>
                update({ pyqYears: selectRecentYears(pyqYears, 5) })
              }
            />
            {filters.pyqYears.length > 0 && (
              <PresetChip
                label="All years"
                onClick={() => update({ pyqYears: [] })}
              />
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {pyqYears.map((year) => {
              const on = filters.pyqYears.includes(year);
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() =>
                    update({ pyqYears: toggleInArray(filters.pyqYears, year) })
                  }
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-xs font-medium tabular-nums transition-colors",
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-muted-foreground hover:text-foreground"
                  )}
                  aria-pressed={on}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      ),
    difficulty: (
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <Label>Difficulty</Label>
          {filters.difficulties.length === 0 && (
            <span className="text-[11px] text-muted-foreground/80">
              All
            </span>
          )}
        </div>
        <div
          role="group"
          aria-label="Difficulty"
          className="inline-flex w-full rounded-md border border-input bg-background p-0.5"
        >
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
                  "flex-1 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors",
                  on
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={on}
              >
                {d.charAt(0) + d.slice(1).toLowerCase()}
              </button>
            );
          })}
        </div>
      </div>
    ),
    search: (
      <form onSubmit={onSearchSubmit} className="space-y-1.5">
        <Label htmlFor="q">Search</Label>
        <div className="flex gap-2">
          <Input
            id="q"
            placeholder="Search question text…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            inputMode="search"
            autoCapitalize="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
          />
          <Button
            type="submit"
            variant="outline"
            size="icon"
            aria-label="Search"
          >
            <Search className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </form>
    ),
  };

  const order: SectionKey[] =
    mode === "staged" ? STAGED_ORDER : LIVE_ORDER;

  return (
    <div
      className={cn(
        "space-y-5 rounded-lg border bg-card p-5 shadow-sm",
        pending && "pointer-events-none opacity-60"
      )}
    >
      {order.map((key) => (
        <div key={key}>{sections[key]}</div>
      ))}
      <div className="border-t pt-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => commit(cleared)}
          disabled={!hasAnyFilter}
          className="w-full justify-center"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
          Clear all filters
        </Button>
      </div>
    </div>
  );
}

type SectionKey =
  | "exam"
  | "subject"
  | "chapters"
  | "subtopics"
  | "pyqYears"
  | "difficulty"
  | "search";

const LIVE_ORDER: SectionKey[] = [
  "exam",
  "subject",
  "chapters",
  "subtopics",
  "pyqYears",
  "difficulty",
  "search",
];

const STAGED_ORDER: SectionKey[] = [
  "exam",
  "subject",
  "difficulty",
  "pyqYears",
  "chapters",
  "subtopics",
  "search",
];

function PresetChip({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-dashed border-primary/40 bg-primary/[0.04] px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
    >
      {label}
    </button>
  );
}

function CheckboxGroup({
  label,
  emptyMessage,
  options,
  selected,
  disabled,
  onChange,
  onClear,
}: {
  label: string;
  emptyMessage: string;
  options: Option[];
  selected: string[];
  disabled: boolean;
  onChange: (id: string) => void;
  onClear?: () => void;
}) {
  const summary =
    selected.length === 0 ? "All" : `${selected.length} selected`;

  return (
    <details className="group">
      <summary
        className={cn(
          "flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-accent",
          disabled && "pointer-events-none cursor-not-allowed opacity-50"
        )}
      >
        <span className="font-medium">{label}</span>
        <span className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{summary}</span>
          {onClear && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClear();
              }}
              aria-label={`Clear ${label.toLowerCase()}`}
              className="rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          )}
          <ChevronDown
            className="h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-180"
            aria-hidden
          />
        </span>
      </summary>
      <div className="mt-2 max-h-60 overflow-y-auto rounded-md border bg-background p-3">
        {options.length === 0 ? (
          <p className="text-xs text-muted-foreground">{emptyMessage}</p>
        ) : (
          <ul className="space-y-1.5">
            {options.map((o) => (
              <li key={o.id}>
                <label className="flex cursor-pointer items-center justify-between gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(o.id)}
                      onChange={() => onChange(o.id)}
                      className="h-4 w-4 shrink-0 rounded border-input"
                    />
                    <span className="truncate">{o.name}</span>
                  </span>
                  {o.count != null && (
                    <span className="shrink-0 tabular-nums text-xs text-muted-foreground">
                      ({o.count})
                    </span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
