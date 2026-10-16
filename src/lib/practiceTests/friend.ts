/**
 * "Send to a friend" for V's practice tests (migration 0163, 2026-10-16).
 *
 * A student sends their practice test; the friend opens /practice/<code>,
 * signs in and gets their OWN copy: the same questions in the same order,
 * owned by the friend, with shared_from pointing at the ROOT test. The
 * original stays visible to its owner alone (0156), and every runner, grader
 * and result read works on the copy unchanged because the friend owns it.
 *
 * Cooperative, not a contest (owner's call): the message names the test and
 * never a score. The code IS the test's slug, which the build route makes as
 * "practice-" plus 12 random hex digits, so it cannot be guessed.
 *
 * Pure. Spec: tests/practice-friend.test.ts.
 */
import { SITE_URL, type ShareChannel } from "@/lib/mocks/share";

/** Every practice-test send rolls up under this campaign (migration 0106 reads it). */
export const PRACTICE_SHARE_CAMPAIGN = "practice-share";

const CODE = /^practice-[0-9a-f]{12}$/;

/** A practice test's slug, the only thing /practice/<code> will look up. */
export function isPracticeCode(value: unknown): value is string {
  return typeof value === "string" && CODE.test(value);
}

/** The friend page, tagged so a friend who signs up through it is attributed. */
export function buildPracticeShareUrl(code: string, channel: ShareChannel): string {
  const u = new URL(`${SITE_URL}/practice/${encodeURIComponent(code)}`);
  u.searchParams.set("utm_source", channel);
  u.searchParams.set("utm_medium", "share");
  u.searchParams.set("utm_campaign", PRACTICE_SHARE_CAMPAIGN);
  return u.toString();
}

export type PracticeShareTextInput = {
  code: string;
  title: string;
  questions: number;
  minutes: number;
  channel: ShareChannel;
};

/** The pre-filled message: the test, its size, free, then the link last. */
export function buildPracticeShareText(i: PracticeShareTextInput): string {
  return [
    "I made a practice test on PYQ Vault. Take it with me:",
    i.title,
    `${i.questions} questions · ${i.minutes} min · free`,
    "",
    buildPracticeShareUrl(i.code, i.channel),
  ].join("\n");
}

/** The columns of a practice test a friend's copy is made from. */
export type SharedPracticeTest = {
  id: string;
  slug: string;
  owner_id: string;
  shared_from: string | null;
  exam_id: string;
  paper_code: string;
  source: string;
  title: string;
  duration_secs: number;
  marking: unknown;
  sections: unknown;
  questions: readonly unknown[];
  total_questions: number;
  total_marks: number;
};

/** The columns read to make a copy, for the route's select. */
export const SHARED_TEST_COLUMNS =
  "id, slug, owner_id, shared_from, exam_id, paper_code, source, title, duration_secs, marking, sections, questions, total_questions, total_marks";

/** A friend's own copy of a practice test, ready to insert into mock_tests. */
export function friendCopyRow(
  src: SharedPracticeTest,
  i: { id: string; slug: string; ownerId: string; now: Date }
) {
  return {
    id: i.id,
    slug: i.slug,
    exam_id: src.exam_id,
    paper_code: src.paper_code,
    source: src.source,
    scope: "custom" as const,
    pyq_year: null,
    pyq_month: null,
    title: src.title,
    duration_secs: src.duration_secs,
    marking: src.marking,
    sections: src.sections,
    questions: src.questions.map((q) => (q && typeof q === "object" ? { ...q } : q)),
    total_questions: src.total_questions,
    total_marks: src.total_marks,
    status: "personal" as const,
    owner_id: i.ownerId,
    shared_from: src.shared_from ?? src.id,
    updated_at: i.now.toISOString(),
  };
}

export type JoinPlan = { kind: "open"; slug: string; own: boolean } | { kind: "copy"; rootId: string };

/**
 * What opening a sent test does: the student's own test opens as it is, a
 * friend who already has a copy reopens it, and anyone else gets a copy of the
 * ROOT test.
 */
export function joinPlan(
  src: Pick<SharedPracticeTest, "id" | "slug" | "owner_id" | "shared_from">,
  userId: string,
  existingCopySlug: string | null
): JoinPlan {
  if (src.owner_id === userId) return { kind: "open", slug: src.slug, own: true };
  if (existingCopySlug) return { kind: "open", slug: existingCopySlug, own: false };
  return { kind: "copy", rootId: src.shared_from ?? src.id };
}
