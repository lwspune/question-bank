/**
 * Shared types for the question-reports feature. Mirrors the
 * `report_category` and `report_status` enums in migration 0024.
 */

export const REPORT_CATEGORIES = [
  "wrong-answer",
  "typo-or-formatting",
  "broken-image",
  "wrong-taxonomy",
  "duplicate",
  "wrong-pyq-year",
  "incorrect-solution",
  "other",
] as const;

export type ReportCategory = (typeof REPORT_CATEGORIES)[number];

export const REPORT_STATUSES = [
  "open",
  "in-review",
  "resolved",
  "wont-fix",
  "duplicate",
] as const;

export type ReportStatus = (typeof REPORT_STATUSES)[number];

/** Human-readable label per category — for dropdowns and triage list rendering. */
export const REPORT_CATEGORY_LABELS: Record<ReportCategory, string> = {
  "wrong-answer": "Wrong answer",
  "typo-or-formatting": "Typo or formatting",
  "broken-image": "Broken image",
  "wrong-taxonomy": "Wrong chapter or subtopic",
  duplicate: "Duplicate question",
  "wrong-pyq-year": "Wrong PYQ year",
  "incorrect-solution": "Incorrect solution",
  other: "Other",
};

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  open: "Open",
  "in-review": "In review",
  resolved: "Resolved",
  "wont-fix": "Won't fix",
  duplicate: "Duplicate report",
};

export function isReportCategory(value: unknown): value is ReportCategory {
  return (
    typeof value === "string" &&
    (REPORT_CATEGORIES as readonly string[]).includes(value)
  );
}

export function isReportStatus(value: unknown): value is ReportStatus {
  return (
    typeof value === "string" &&
    (REPORT_STATUSES as readonly string[]).includes(value)
  );
}

export const REPORT_DETAILS_MAX = 2000;
export const REPORT_RESOLUTION_NOTE_MAX = 2000;
