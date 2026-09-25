/**
 * The exam feed: which exams a signed-in student sees first, and which collapse
 * under "Other exams" (EXAM_TIER_SPEC.md §3.3). Pure — no I/O.
 *
 * The tier COLLAPSES the other tiers, it never deletes them, and a student's
 * chosen targets are always shown even when they sit outside the tier. That
 * union rule is what keeps the CDS + NDA student (25 of the 34 cross-tier
 * students measured on 2026-09-25) from losing half their plan.
 *
 * Every function takes the registry as an argument so the tests can pass a
 * synthetic list — asserting only against the real registry would pass
 * vacuously for any rule the live data happens not to exercise.
 */
import {
  EXAM_REGISTRY,
  type ExamEntry,
  type ExamSlug,
  type ExamTier,
} from "@/lib/exam/examContext";
import { tierOfStage, type Stage } from "@/lib/profile/onboarding";

export type FeedInput = {
  stage: Stage | null;
  /** Already sanitised (sanitizeTargetExams). Unknown slugs are dropped anyway. */
  targetExams: readonly ExamSlug[];
};

export type ExamFeed = {
  /** null = nothing known; show everything in registry order. */
  tier: ExamTier | null;
  /** Shown first: target exams in their stored order, then the rest of the
   *  tier in registry order. Never contains a noPublicContent exam. */
  primary: ExamSlug[];
  /** Collapsed under "Other exams". Registry order. Never noPublicContent. */
  other: ExamSlug[];
};

/**
 * The student's tier. A stated stage outranks an inferred one; without a stage,
 * the tier held by the most targets wins, and a tie goes to the FIRST target
 * (the same "first is primary" rule `primaryExam` uses). 255 of 394 profiles
 * have no stage, which is why the inference exists at all.
 */
export function resolveStudentTier(
  input: FeedInput,
  entries: readonly ExamEntry[]
): ExamTier | null {
  const stated = tierOfStage(input.stage);
  if (stated) return stated;

  const tierOf = new Map(entries.map((e) => [e.slug, e.tier]));
  const counts = new Map<ExamTier, number>();
  let first: ExamTier | null = null;
  for (const slug of input.targetExams) {
    const tier = tierOf.get(slug);
    if (!tier) continue;
    first ??= tier;
    counts.set(tier, (counts.get(tier) ?? 0) + 1);
  }
  if (!first) return null;

  let best = first;
  for (const [tier, n] of counts) {
    if (n > (counts.get(best) ?? 0)) best = tier;
  }
  return best;
}

/** Everything public, in registry order: what an anonymous visitor sees. */
export function anonFeedFor(entries: readonly ExamEntry[]): ExamFeed {
  return {
    tier: null,
    primary: entries.filter((e) => !e.noPublicContent).map((e) => e.slug),
    other: [],
  };
}

export const ANON_FEED: ExamFeed = anonFeedFor(EXAM_REGISTRY);

export function resolveExamFeed(input: FeedInput, entries: readonly ExamEntry[]): ExamFeed {
  const tier = resolveStudentTier(input, entries);
  const publicEntries = entries.filter((e) => !e.noPublicContent);
  const publicSlugs = new Set(publicEntries.map((e) => e.slug));

  const primary: ExamSlug[] = [];
  const seen = new Set<ExamSlug>();
  const add = (slug: ExamSlug) => {
    if (seen.has(slug) || !publicSlugs.has(slug)) return;
    seen.add(slug);
    primary.push(slug);
  };

  for (const slug of input.targetExams) add(slug);
  for (const e of publicEntries) {
    if (tier === null || e.tier === tier) add(e.slug);
  }

  const other = publicEntries.map((e) => e.slug).filter((s) => !seen.has(s));
  return { tier, primary, other };
}

/**
 * Split a page's cards into the "Your exams" group and the "Other exams" group.
 *
 * `slugOf` returns one slug, a FAMILY's member slugs (CBSE, Maharashtra State
 * Board, IPMAT), or null. A family is primary when ANY member is, ranked by its
 * best-placed member, and is never split across the two groups. An item with no
 * slug stays in primary after the ranked ones: an unknown must never be hidden.
 *
 * `primary` follows the feed's order; `other` keeps the input order.
 */
export function splitByFeed<T>(
  items: readonly T[],
  slugOf: (item: T) => ExamSlug | readonly ExamSlug[] | null,
  feed: ExamFeed
): { primary: T[]; other: T[] } {
  const rank = new Map(feed.primary.map((s, i) => [s, i]));
  const ranked: { item: T; rank: number }[] = [];
  const unknown: T[] = [];
  const other: T[] = [];

  for (const item of items) {
    const raw = slugOf(item);
    if (raw === null) {
      unknown.push(item);
      continue;
    }
    const slugs: readonly ExamSlug[] = typeof raw === "string" ? [raw] : raw;
    const best = Math.min(...slugs.map((s) => rank.get(s) ?? Infinity));
    if (best === Infinity) other.push(item);
    else ranked.push({ item, rank: best });
  }

  ranked.sort((a, b) => a.rank - b.rank);
  return { primary: [...ranked.map((r) => r.item), ...unknown], other };
}
