/**
 * Exam-context registry + pure URL/route resolvers used by the primary nav.
 *
 * The cookie-backed exam picker stores a stable slug (e.g. `"nda"`). UUIDs are
 * resolved at render time against the `exams` table by `loadActiveExam` so the
 * Bank tab can emit `/browse?examId=<uuid>` without hard-coding ids in TS.
 *
 * Exams that don't have a `/guide` subtree yet fall back to the `/guide`
 * index. Notes route to a per-exam hub (`/notes/<slug>`) that lists every
 * notes subject for that exam (or an honest "coming soon" when none have
 * shipped) — derived from NOTES_CHAPTERS, so a new exam needs no new page.
 */

export type ExamSlug =
  | "nda"
  | "mht-cet"
  | "jee-mains"
  | "cds"
  | "foundation-course"
  | "neet"
  | "mh-hsc-12";

export type ExamEntry = {
  /** URL-safe slug; the value stored in the `qb:exam` cookie. */
  slug: ExamSlug;
  /** Short label shown in the picker pill. */
  displayName: string;
  /** Canonical name in the `exams` DB table — used to resolve the UUID. */
  examName: string;
  /** `/guide/<slug>` subtree if shipped; null falls back to `/guide`. */
  guidesPath: string | null;
  /** Per-exam notes hub `/notes/<slug>`; null falls back to the `/notes` index. */
  notesPath: string | null;
  /**
   * Exam has NO past-year corpus — its bank is entirely `question_kind='practice'`
   * (e.g. the Foundation Course worksheets). `/browse` defaults the kind filter to
   * "practice" for it, so the default view isn't an empty PYQ list.
   */
  practiceOnly?: boolean;
};

export const EXAM_REGISTRY: readonly ExamEntry[] = [
  {
    slug: "nda",
    displayName: "NDA",
    examName: "NDA",
    guidesPath: "/guide/nda",
    notesPath: "/notes/nda", // exam hub: lists Maths + Physics + Biology notes
  },
  {
    slug: "mht-cet",
    displayName: "MHT-CET",
    examName: "MHT-CET",
    guidesPath: null,
    notesPath: "/notes/mht-cet", // exam hub: MHT-CET Maths notes
  },
  {
    slug: "jee-mains",
    displayName: "JEE Mains",
    examName: "JEE Mains", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/jee-mains", // exam hub: "coming soon" until JEE notes ship
  },
  {
    slug: "cds",
    displayName: "CDS",
    examName: "CDS", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/cds", // exam hub: "coming soon" until CDS notes ship
  },
  {
    slug: "foundation-course",
    displayName: "Foundation",
    examName: "Foundation Course", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree — falls back to the index
    notesPath: "/notes/foundation-course", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // worksheet-only corpus → /browse defaults to the Practice view
  },
  {
    slug: "neet",
    displayName: "NEET",
    examName: "NEET", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/neet", // exam hub: "coming soon" until NEET notes ship
  },
  {
    slug: "mh-hsc-12",
    displayName: "MH HSC 12",
    examName: "Maharashtra HSC Class 12", // must match the `exams` DB row exactly
    guidesPath: null, // no /guide subtree yet — falls back to the index
    notesPath: "/notes/mh-hsc-12", // exam hub: "coming soon" until notes ship
    practiceOnly: true, // textbook exercises/solved-examples corpus (board PYQs come later) → /browse defaults to Practice
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

/** True when an exam (by its DB name) has a practice-only corpus and should
 *  default the `/browse` kind filter to "practice" rather than "pyq". */
export function isPracticeOnlyExam(examName: string | null | undefined): boolean {
  if (!examName) return false;
  return EXAM_REGISTRY.some((e) => e.examName === examName && e.practiceOnly === true);
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

export type ActiveTab = "bank" | "guides" | "notes" | "papers";

/**
 * Maps a pathname to the primary-nav tab that owns it. Returns null for
 * routes outside the primary surfaces (bare dashboard, login, edit pages).
 *
 * Match is on path segments — `/browser-other` is not a `/browse` match.
 * `/dashboard/papers` is the collaborative paper builder (the Papers tab,
 * org-members only); bare `/dashboard` is admin tooling and owns no tab.
 */
export function getActiveTab(pathname: string): ActiveTab | null {
  const path = pathname.split("?")[0].split("#")[0];
  if (matchesSegment(path, "/browse")) return "bank";
  if (matchesSegment(path, "/guide")) return "guides";
  if (matchesSegment(path, "/notes")) return "notes";
  if (matchesSegment(path, "/dashboard/papers")) return "papers";
  return null;
}

function matchesSegment(path: string, prefix: string): boolean {
  if (path === prefix) return true;
  if (path.startsWith(`${prefix}/`)) return true;
  return false;
}
