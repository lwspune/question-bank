import { Info } from "lucide-react";
import type { FitCoverage } from "@/lib/relevance/fit";

/**
 * States the real scope of the syllabus-fit screen.
 *
 * The screen is an exclusion list over chapters that have actually been
 * adjudicated. A chapter nobody has screened yet has no exclusions, so it would
 * pass through the filter looking vetted. That silence is the failure mode this
 * component exists to prevent — an unscreened chapter says so out loud.
 */
export default function FitCoverageNote({
  coverage,
  chapterName,
}: {
  coverage: FitCoverage;
  chapterName: (id: string) => string;
}) {
  if (coverage.kind === "inactive" || coverage.kind === "full") return null;

  const message =
    coverage.kind === "partial"
      ? `${coverage.unreviewed
          .map(chapterName)
          .join(", ")} ${coverage.unreviewed.length === 1 ? "has" : "have"} not been screened yet — questions from ${coverage.unreviewed.length === 1 ? "it" : "them"} are shown unfiltered.`
      : `Screened so far: ${coverage.reviewedNames.join(", ")}. Every other chapter is shown unfiltered — pick a screened chapter to apply the filter.`;

  return (
    <div
      role="status"
      className="mb-4 flex items-start gap-2 rounded-md border border-amber-300/60 bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-amber-200"
    >
      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
