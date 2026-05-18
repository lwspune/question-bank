/**
 * Exam-context registry + pure URL/route resolvers used by the primary nav.
 *
 * The cookie-backed exam picker stores a stable slug (e.g. `"nda"`). UUIDs are
 * resolved at render time against the `exams` table by `loadActiveExam` so the
 * Bank tab can emit `/browse?examId=<uuid>` without hard-coding ids in TS.
 *
 * Exams that don't have a `/guide` or `/notes` subtree yet (e.g. MHT-CET today)
 * fall back to the `/guide` and `/notes` indexes, both of which already
 * redirect to a sensible default.
 */

export type ExamSlug = "nda" | "mht-cet";

export type ExamEntry = {
  /** URL-safe slug; the value stored in the `qb:exam` cookie. */
  slug: ExamSlug;
  /** Short label shown in the picker pill. */
  displayName: string;
  /** Canonical name in the `exams` DB table — used to resolve the UUID. */
  examName: string;
  /** `/guide/<slug>` subtree if shipped; null falls back to `/guide`. */
  guidesPath: string | null;
  /** `/notes/<slug-subject>` default landing if shipped; null falls back to `/notes`. */
  notesPath: string | null;
};

export const EXAM_REGISTRY: readonly ExamEntry[] = [
  {
    slug: "nda",
    displayName: "NDA",
    examName: "NDA",
    guidesPath: "/guide/nda",
    notesPath: "/notes/nda-maths",
  },
  {
    slug: "mht-cet",
    displayName: "MHT-CET",
    examName: "MHT-CET",
    guidesPath: null,
    notesPath: null,
  },
] as const;

export const DEFAULT_EXAM_SLUG: ExamSlug = "nda";

const SLUG_SET = new Set<string>(EXAM_REGISTRY.map((e) => e.slug));

export function isExamSlug(value: unknown): value is ExamSlug {
  return typeof value === "string" && SLUG_SET.has(value);
}

export function getExamBySlug(slug: string | null | undefined): ExamEntry | null {
  if (!slug) return null;
  return EXAM_REGISTRY.find((e) => e.slug === slug) ?? null;
}

/**
 * Bank tab href. When the user has picked an exam, the link applies the
 * `examId` filter directly. Without an exam UUID, links to the bare bank.
 */
export function resolveBankHref(examUuid: string | null | undefined): string {
  if (!examUuid) return "/browse";
  const sp = new URLSearchParams();
  sp.set("examId", examUuid);
  return `/browse?${sp.toString()}`;
}

/** Guides tab href. Falls back to `/guide` when the exam has no subtree. */
export function resolveGuidesHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.guidesPath ?? "/guide";
}

/** Notes tab href. Falls back to `/notes` when the exam has no subtree. */
export function resolveNotesHref(slug: string | null | undefined): string {
  const exam = getExamBySlug(slug ?? null);
  return exam?.notesPath ?? "/notes";
}

export type ActiveTab = "bank" | "guides" | "notes";

/**
 * Maps a pathname to the primary-nav tab that owns it. Returns null for
 * routes outside the three primary surfaces (dashboard, login, edit pages).
 *
 * Match is on path segments — `/browser-other` is not a `/browse` match.
 */
export function getActiveTab(pathname: string): ActiveTab | null {
  const path = pathname.split("?")[0].split("#")[0];
  if (matchesSegment(path, "/browse")) return "bank";
  if (matchesSegment(path, "/guide")) return "guides";
  if (matchesSegment(path, "/notes")) return "notes";
  return null;
}

function matchesSegment(path: string, prefix: string): boolean {
  if (path === prefix) return true;
  if (path.startsWith(`${prefix}/`)) return true;
  return false;
}
