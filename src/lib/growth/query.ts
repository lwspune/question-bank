/**
 * The growth snapshot read, as a plain function over a Supabase client.
 * Deliberately NOT `server-only`: `npm run growth:smoke` drives this against
 * live data, because /dashboard/growth is an auth-gated `ƒ` route that
 * `next build` never renders. The service-role wrapper is ./adminStats.ts —
 * the same split as lib/pmf.
 *
 * Every parameter comes from code (the registry, the exam registry, the share
 * campaign), so the SQL holds no list that could drift from the TypeScript.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { hasPaperMocks } from "@/lib/education/howItWorks";
import { CHAPTER_SHARE_CAMPAIGN } from "@/lib/share/chapterShare";
import { CHAPTER_TESTS_EXAM, EXPERIMENTS, NORTH_STAR_KINDS } from "./registry";
import type { ArmCounts, ChapterTestWeek, EmailDay, NorthStarWeek, SignupWeek } from "./snapshot";

export type GrowthSnapshotRaw = {
  weeks: NorthStarWeek[];
  signupWeeks: SignupWeek[];
  arms: ArmCounts[];
  chapterShare: { signups: number; signalled: number };
  chapterTests: ChapterTestWeek[];
  emailDays: EmailDay[];
};

export const GROWTH_WEEKS = 12;

/** Midnight IST at the start of an experiment's merge day. */
function istStart(isoDate: string): string {
  return `${isoDate}T00:00:00+05:30`;
}

function liveSince(readout: string): string {
  const e = EXPERIMENTS.find((x) => x.readout === readout);
  if (!e) throw new Error(`No experiment with readout ${readout}`);
  return istStart(e.liveSince);
}

export function growthParams(weeks = GROWTH_WEEKS) {
  return {
    p_weeks: weeks,
    p_kinds: [...NORTH_STAR_KINDS],
    p_onboarding_since: liveSince("onboarding-arms"),
    p_mock_exams: EXAM_REGISTRY.filter(hasPaperMocks).map((e) => e.slug),
    p_share_since: liveSince("chapter-share"),
    p_share_campaign: CHAPTER_SHARE_CAMPAIGN,
    p_chapter_exam: CHAPTER_TESTS_EXAM,
  };
}

export async function fetchGrowthSnapshot(
  db: SupabaseClient,
  weeks = GROWTH_WEEKS
): Promise<GrowthSnapshotRaw> {
  const { data, error } = await db.rpc("get_growth_snapshot", growthParams(weeks));
  if (error) throw new Error(`fetchGrowthSnapshot: ${error.message}`);
  const raw = (data ?? {}) as Partial<GrowthSnapshotRaw>;
  // Defaults so a field the DB has not started emitting cannot crash the render.
  return {
    weeks: raw.weeks ?? [],
    signupWeeks: raw.signupWeeks ?? [],
    arms: raw.arms ?? [],
    chapterShare: raw.chapterShare ?? { signups: 0, signalled: 0 },
    chapterTests: raw.chapterTests ?? [],
    emailDays: raw.emailDays ?? [],
  };
}
