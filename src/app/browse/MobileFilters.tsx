"use client";

import { useState } from "react";
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
import type { Filters } from "@/lib/questions/filters";

type Option = { id: string; name: string };

type Props = {
  filters: Filters;
  exams: Option[];
  subjects: Option[];
  chapters: Option[];
  subtopics: Option[];
  activeCount: number;
};

export default function MobileFilters({
  filters,
  exams,
  subjects,
  chapters,
  subtopics,
  activeCount,
}: Props) {
  const [open, setOpen] = useState(false);

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
        className="w-full overflow-y-auto sm:max-w-sm"
      >
        <SheetHeader className="mb-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <FilterBar
          filters={filters}
          exams={exams}
          subjects={subjects}
          chapters={chapters}
          subtopics={subtopics}
          onApply={() => setOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
}
