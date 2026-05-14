"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterBar from "./FilterBar";
import {
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";

type Option = { id: string; name: string; count?: number };

type Props = {
  filters: Filters;
  exams: Option[];
  subjects: Option[];
  chapters: Option[];
  subtopics: Option[];
  pyqYears: number[];
  activeCount: number;
};

export default function MobileFilters({
  filters,
  exams,
  subjects,
  chapters,
  subtopics,
  pyqYears,
  activeCount,
}: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [staged, setStaged] = useState<Filters>(filters);

  // Reseed staged buffer whenever the sheet opens, so reopening after a
  // commit (or after a back/forward navigation) starts from the live URL
  // state — not whatever was left behind from a previous abandoned edit.
  useEffect(() => {
    if (open) setStaged(filters);
  }, [open, filters]);

  const isDirty = useMemo(
    () => JSON.stringify(staged) !== JSON.stringify(filters),
    [staged, filters]
  );

  // Cascading fields drive server-fetched option lists (subjects depend on
  // examId; chapters on subjectId; subtopics on chapterIds). Without a route
  // push, the dependent dropdowns would show stale options. So when these
  // fields change, push the URL silently — the sheet stays open and the page
  // re-renders with refreshed option lists. Non-cascading fields stay staged
  // and only commit on Apply.
  function handleChange(next: Filters) {
    setStaged(next);
    const cascadeChanged =
      next.examId !== staged.examId ||
      next.subjectId !== staged.subjectId ||
      !sameIds(next.chapterIds, staged.chapterIds);
    if (cascadeChanged) {
      router.push(`/browse?${buildSearchParams(next).toString()}`);
    }
  }

  function onApply() {
    router.push(`/browse?${buildSearchParams(staged).toString()}`);
    setOpen(false);
  }

  function onReset() {
    setStaged(filters);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <SlidersHorizontal className="h-4 w-4" aria-hidden />
          Filters
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b px-6 pb-4 pt-6">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <FilterBar
            filters={staged}
            exams={exams}
            subjects={subjects}
            chapters={chapters}
            subtopics={subtopics}
            pyqYears={pyqYears}
            mode="staged"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2 border-t bg-background p-3">
          <Button
            variant="outline"
            onClick={onReset}
            disabled={!isDirty}
            className="min-w-20"
          >
            Reset
          </Button>
          <Button onClick={onApply} className="flex-1">
            Show results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function sameIds(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  for (const x of a) if (!setB.has(x)) return false;
  return true;
}
