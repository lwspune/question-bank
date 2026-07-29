/**
 * Pure, client-safe resolution of the primary nav from the active exam.
 *
 * This is the browser-side replacement for `loadActiveExamContext()`, which did
 * the same job on the server by reading `cookies()` — and in doing so forced
 * EVERY page on the site to render per-request, since AppHeader is on all of
 * them. Nothing here touches cookies(), the network, or the DB: the exam-id map
 * is passed in, because it is public taxonomy identical for every visitor and
 * can therefore be computed once on the server and cached.
 */
import {
  DEFAULT_EXAM_SLUG,
  isExamSlug,
  resolveBankHref,
  resolveGuidesHref,
  resolveNotesHref,
  resolveBoardHref,
  examHasMocks,
  type ExamSlug,
} from "@/lib/exam/examContext";

export const EXAM_COOKIE_NAME = "qb_exam";

/** slug → the exam's DB uuid (null when registered in code but not seeded). */
export type ExamIdMap = Record<string, string | null>;

export type ExamNav = {
  slug: ExamSlug;
  bankHref: string;
  guidesHref: string;
  notesHref: string;
  boardHref: string;
  showMocks: boolean;
};

/** Same output shape `loadActiveExamContext()` produced, without the I/O. */
export function resolveExamNav(
  rawSlug: string | null | undefined,
  examIds: ExamIdMap
): ExamNav {
  const slug: ExamSlug = isExamSlug(rawSlug) ? rawSlug : DEFAULT_EXAM_SLUG;
  return {
    slug,
    bankHref: resolveBankHref(examIds[slug] ?? null),
    guidesHref: resolveGuidesHref(slug),
    notesHref: resolveNotesHref(slug),
    boardHref: resolveBoardHref(slug),
    showMocks: examHasMocks(slug),
  };
}

/**
 * Pull the active exam out of a `document.cookie` string. Split out from the
 * DOM so it can be tested — the parsing is fiddlier than it looks (browsers
 * join with "; ", values are url-encoded, and a suffix match would let
 * `xqb_exam` impersonate `qb_exam`).
 */
export function readExamSlugFromCookieString(cookieString: string): ExamSlug {
  for (const part of cookieString.split(";")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) !== EXAM_COOKIE_NAME) continue;
    const raw = decodeURIComponent(trimmed.slice(eq + 1));
    return isExamSlug(raw) ? raw : DEFAULT_EXAM_SLUG;
  }
  return DEFAULT_EXAM_SLUG;
}
