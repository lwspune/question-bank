/**
 * Rank sitemap URLs for Search Console's manual "Request Indexing".
 *
 * WHY (2026-09-17). The crawl-stats export reads **21 discovery requests in 51
 * days** against a 1,424-URL discovered-not-crawled backlog — ~9.5 years. The
 * only lever Google offers to jump that queue is URL Inspection → Request
 * Indexing, capped at ~10–12 URLs per property per day. With 1,279 URLs that is
 * a 128-day queue, so **the order is the deliverable**, not the list.
 *
 * THE LOAD-BEARING RULE: rank by WINNABILITY, not by content depth.
 *
 * A JEE Mains chapter with 346 questions is a worse submission than an NDA
 * chapter with 63. The JEE SERP belongs to Allen, Vedantu, Physics Wallah and
 * Embibe; this domain went live 2026-06-04 with no backlinks and will not take
 * it, whatever the page contains. NDA and CDS SERPs are thin and this bank
 * competes in them today. Sorting by question count feels right and is wrong —
 * `tests/indexing-priority.test.ts` pins it so it is not re-derived.
 *
 * Corroborating evidence for the NDA tilt: every non-brand query Search Console
 * has recorded is NDA (`nda english pyq` pos 9 · `nda determinants pyq` 28 ·
 * `nda sequence and series pyq` 45 · `pnc weightage in nda` 45), and the pages
 * that would answer them are precisely the unindexed `/questions/nda/...` set.
 *
 * Pure — no fetch, no DB, no clock. `scripts/seo/indexing-worklist.ts` supplies
 * the URL list and the counts.
 */

/** Live URL prefixes to withhold, longest-match on a path BOUNDARY. */
export const DEFAULT_HOLD_PREFIXES = ["/formula"];

/**
 * How winnable an exam's SERP is at domain-authority zero. This is the single
 * most influential number here and it is a judgement, not a measurement.
 */
export const EXAM_WEIGHT: Record<string, number> = {
  nda: 1.0, // flagship; 10 guides, thinnest SERP, every recorded query
  cds: 0.92, // same audience, thinner still
  "mht-cet": 0.8,
  "mh-hsc-12": 0.68,
  "mh-ssc-10": 0.68,
  "mh-sb-11": 0.62,
  "mh-sb-9": 0.62,
  "foundation-course": 0.55,
  "cbse-12": 0.42,
  "cbse-11": 0.42,
  "cbse-10": 0.42,
  "jee-mains": 0.32, // Allen / PW / Vedantu own these
  neet: 0.32,
  "worksheets-11-12": 0.18, // LWS course material; no public search demand
};

/** Sorted longest-first so "mht-cet" wins over "mht" and "jee-mains" over "jee". */
const EXAM_SLUGS = Object.keys(EXAM_WEIGHT).sort((a, b) => b.length - a.length);

/** Substrings of a path that answer a query Search Console actually recorded. */
const PROVEN_INTENT = [
  "determinant", "probability", "sequence", "permutation", "combination",
  "english", "strategy", "matrices", "notes", "trigonometr",
];

export type RankInput = {
  /** Origin, no trailing slash, e.g. "https://www.pyqvault.com". */
  site: string;
  holdPrefixes: readonly string[];
  /** "<examSlug>/<subjectSlug>/<chapterSlug>" -> PUBLIC question count. */
  questionCounts: Record<string, number>;
};

export type RankedUrl = {
  /** Site-relative path. */
  path: string;
  url: string;
  score: number;
};

/** True when `path` is `prefix` or sits beneath it — never a mere string prefix. */
function isUnder(path: string, prefix: string): boolean {
  return path === prefix || path.startsWith(prefix + "/");
}

/** "nda-maths" -> "nda"; "mht-cet-chemistry" -> "mht-cet"; unknown -> null. */
export function examOfSegment(segment: string): string | null {
  for (const slug of EXAM_SLUGS) {
    if (segment === slug || segment.startsWith(slug + "-")) return slug;
  }
  return null;
}

function scorePath(path: string, counts: Record<string, number>): number {
  const seg = path.split("/").filter(Boolean);
  const depth = seg.length;
  const section = seg[0] ?? "";

  if (depth === 0) return 10000;
  // Real pages, but nobody searches them. Last, not absent.
  if (section === "privacy" || section === "request-access") return 5;
  if (depth === 1) return 9000;

  let base = 300;
  let exam: string | null = null;

  switch (section) {
    case "guide":
      exam = examOfSegment(seg[1]);
      base = depth === 2 ? 700 : depth === 3 ? 665 : 600;
      break;
    case "notes":
      exam = examOfSegment(seg[1]);
      // depth 3 is the 84 hand-authored CHAPTERS; depth 4 is 367 per-subtopic
      // pages, materially thinner.
      base = depth === 2 ? 640 : depth === 3 ? 620 : 380;
      break;
    case "questions": {
      exam = seg[1] ?? null;
      base = depth === 2 ? 600 : depth === 3 ? 570 : 500;
      if (depth === 4) {
        const n = counts[`${seg[1]}/${seg[2]}/${seg[3]}`];
        // Log-scaled so depth breaks ties WITHIN an exam without ever
        // outweighing the exam weight itself.
        if (n) base += 40 * Math.log10(Math.max(n, 10));
      }
      break;
    }
    case "mock":
      exam = depth >= 3 ? seg[2] : null;
      base = 580;
      break;
    case "blog":
      base = 760; // timely prose analysis, almost no competition
      break;
    case "quiz":
      base = 430;
      break;
    case "nda":
      exam = "nda";
      base = 640;
      break;
    case "about":
    case "browse":
      base = 620;
      break;
  }

  const weight = exam ? (EXAM_WEIGHT[exam] ?? 0.75) : 0.85;
  let score = base * weight;
  const lower = path.toLowerCase();
  if (PROVEN_INTENT.some((k) => lower.includes(k))) score += 45;
  return score;
}

export function rankForIndexing(urls: readonly string[], input: RankInput): RankedUrl[] {
  const seen = new Set<string>();
  const rows: RankedUrl[] = [];

  for (const url of urls) {
    if (!url.startsWith(input.site)) continue; // another origin; not ours to submit
    const path = url.slice(input.site.length) || "/";

    // The 192 individual mock pages left the sitemap on 2026-09-17 for being
    // 98-word near-duplicates. Spending a scarce manual submission on one would
    // undo that decision by hand.
    if (/^\/mock\/[a-z0-9-]+$/.test(path)) continue;
    if (input.holdPrefixes.some((p) => isUnder(path, p))) continue;

    if (seen.has(path)) continue;
    seen.add(path);
    rows.push({ path, url, score: scorePath(path, input.questionCounts) });
  }

  // Path as the tiebreak keeps the output deterministic across input orders.
  return rows.sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
}
