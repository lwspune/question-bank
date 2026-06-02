/**
 * Shared types for the concept-reports feature. Mirrors the
 * `concept_report_category` enum in migration 0028. The STATUS enum is
 * REUSED from the question-reports feature (`report_status`, migration 0024)
 * — the open → in-review → resolved/wont-fix/duplicate lifecycle is identical,
 * so the status helpers are re-exported here for a single import surface.
 */

export {
  REPORT_STATUSES,
  REPORT_STATUS_LABELS,
  isReportStatus,
  REPORT_DETAILS_MAX,
  REPORT_RESOLUTION_NOTE_MAX,
  type ReportStatus,
} from "@/lib/reports/types";

export const CONCEPT_REPORT_CATEGORIES = [
  "incorrect-content",
  "confusing-explanation",
  "typo-or-formatting",
  "broken-visualization",
  "wrong-example",
  "other",
] as const;

export type ConceptReportCategory = (typeof CONCEPT_REPORT_CATEGORIES)[number];

/** Human-readable label per category — for the dialog dropdown + triage rows. */
export const CONCEPT_REPORT_CATEGORY_LABELS: Record<
  ConceptReportCategory,
  string
> = {
  "incorrect-content": "Incorrect content",
  "confusing-explanation": "Confusing explanation",
  "typo-or-formatting": "Typo or formatting",
  "broken-visualization": "Broken diagram",
  "wrong-example": "Wrong worked example",
  other: "Other",
};

export function isConceptReportCategory(
  value: unknown
): value is ConceptReportCategory {
  return (
    typeof value === "string" &&
    (CONCEPT_REPORT_CATEGORIES as readonly string[]).includes(value)
  );
}
