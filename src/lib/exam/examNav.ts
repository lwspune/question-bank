/**
 * Pure, client-safe resolution of the primary nav from the active exam.
 *
 * This is the browser-side replacement for `loadActiveExamContext()`, which did
 * the same job on the server by reading `cookies()` — and in doing so forced
 * EVERY page on the site to render per-request, since AppHeader is on all of
 * them. Nothing here touches cookies(), the network, or the DB: the exam-id map
 * is passed in, because it is public taxonomy identical for every visitor and
 * can therefore be computed once on the server and cached.
 *
 * NULL IS A REAL STATE, not a missing value (2026-08-21). The header's exam
 * pill is gone, so `qb_exam` is written only by /welcome and /account — both
 * behind sign-in. "No cookie" therefore means "nobody ever told us an exam",
 * which is true of every anonymous visitor, i.e. most of the traffic. Defaulting
 * those to NDA would drop a JEE visitor into the NDA bank with no control left
 * on the page to correct it; the indexes (/browse's exam panel, /notes, /board)
 * are built to ask the question properly.
 */
import {
  isExamSlug,
  resolveBankHref,
  resolveGuidesHref,
  resolveBoardHref,
  type ExamSlug,
} from "@/lib/exam/examContext";
import { mockCatalogueHref, notesHubHref } from "@/lib/exam/examLinks";

export const EXAM_COOKIE_NAME = "qb_exam";

/** slug → the exam's DB uuid (null when registered in code but not seeded). */
export type ExamIdMap = Record<string, string | null>;

export type ExamNav = {
  bankHref: string;
  guidesHref: string;
  notesHref: string;
  mockHref: string;
  boardHref: string;
};

/**
 * The primary-nav hrefs for a visitor's chosen exam (or null for no choice).
 *
 * Every tab personalises, but only to a page with something on it
 * (EXAM_TIER_SPEC.md §4.5). Notes goes to `/notes/<slug>` ONLY when the exam is
 * in `notesSlugs` — the hub renders "coming soon" for an exam without notes,
 * and that dead end is why this tab used to never personalise. Mocks goes to
 * `/mock/exam/<slug>` only when the exam has mocks.
 *
 * `notesSlugs` is passed in (computed once on the server by AppHeader) so this
 * module, and HeaderBar with it, never bundles the NOTES_CHAPTERS registry.
 * Omitted, Notes stays on the index.
 */
export function resolveExamNav(
  rawSlug: string | null | undefined,
  examIds: ExamIdMap,
  notesSlugs: readonly ExamSlug[] = []
): ExamNav {
  const slug: ExamSlug | null = isExamSlug(rawSlug) ? rawSlug : null;
  return {
    bankHref: resolveBankHref(slug ? examIds[slug] ?? null : null),
    guidesHref: resolveGuidesHref(slug),
    notesHref: notesHubHref(slug, new Set(notesSlugs)),
    mockHref: mockCatalogueHref(slug),
    boardHref: resolveBoardHref(slug),
  };
}

/**
 * Pull the active exam out of a `document.cookie` string, or null when the
 * visitor has never chosen one. Split out from the DOM so it can be tested —
 * the parsing is fiddlier than it looks (browsers join with "; ", values are
 * url-encoded, and a suffix match would let `xqb_exam` impersonate `qb_exam`).
 *
 * An unknown value returns null rather than the default: a slug retired from
 * the registry should read as "no choice", never as somebody else's exam.
 */
export function readExamSlugFromCookieString(
  cookieString: string
): ExamSlug | null {
  for (const part of cookieString.split(";")) {
    const trimmed = part.trim();
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    if (trimmed.slice(0, eq) !== EXAM_COOKIE_NAME) continue;
    const raw = decodeURIComponent(trimmed.slice(eq + 1));
    return isExamSlug(raw) ? raw : null;
  }
  return null;
}
