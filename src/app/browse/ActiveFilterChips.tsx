"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Check, Filter, Link as LinkIcon, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  buildSearchParams,
  type Filters,
} from "@/lib/questions/filters";
import { buildShareUrl } from "@/lib/questions/buildShareUrl";
import { buildActiveChips, type ChipLabels } from "./buildActiveChips";
import { useState } from "react";

type Option = { id: string; name: string };

type Props = {
  filters: Filters;
  exams: Option[];
  subjects: Option[];
  chapters: Option[];
  subtopics: Option[];
  className?: string;
};

function makeLookup(options: Option[]): (id: string) => string {
  const map = new Map(options.map((o) => [o.id, o.name]));
  return (id) => map.get(id) ?? id;
}

export default function ActiveFilterChips({
  filters,
  exams,
  subjects,
  chapters,
  subtopics,
  className,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  async function onCopyLink() {
    if (typeof window === "undefined") return;
    const url = buildShareUrl(filters, window.location.origin);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied — share it anywhere");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy link");
    }
  }

  const labels: ChipLabels = {
    examName: makeLookup(exams),
    subjectName: makeLookup(subjects),
    chapterName: makeLookup(chapters),
    subtopicName: makeLookup(subtopics),
  };

  const chips = buildActiveChips(filters, labels);

  if (chips.length === 0) return null;

  const cleared: Filters = {
    examId: null,
    subjectId: null,
    chapterIds: [],
    subtopicIds: [],
    difficulties: [],
    pyqYears: [],
    q: "",
    page: 1,
  };

  function navigate(next: Filters) {
    startTransition(() => {
      router.push(`/browse?${buildSearchParams(next).toString()}`);
    });
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 overflow-x-auto sm:flex-wrap sm:overflow-visible",
        pending && "pointer-events-none opacity-60",
        className
      )}
      aria-label="Active filters"
    >
      {/* Mobile: compact funnel icon. Desktop: full "Filtering by:" label. */}
      <Filter
        className="h-3.5 w-3.5 shrink-0 text-muted-foreground sm:hidden"
        aria-hidden
      />
      <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
        Filtering by:
      </span>
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => navigate(c.nextFilters())}
          className="inline-flex shrink-0 items-center gap-1 rounded-full border bg-card px-2.5 py-0.5 text-xs font-medium transition-colors hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`Remove filter: ${c.label}`}
        >
          <span>{c.label}</span>
          <X className="h-3 w-3 text-muted-foreground" aria-hidden />
        </button>
      ))}
      <button
        type="button"
        onClick={() => navigate(cleared)}
        className="ml-1 shrink-0 text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:underline"
      >
        Clear all
      </button>
      <button
        type="button"
        onClick={onCopyLink}
        aria-label="Copy share link"
        className="inline-flex shrink-0 items-center gap-1 rounded-full border bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3" aria-hidden />
            <span>Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-3 w-3" aria-hidden />
            <span>Copy link</span>
          </>
        )}
      </button>
    </div>
  );
}
