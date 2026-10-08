/**
 * Student-profile reads/writes (server-only). Takes an RLS-bound Supabase client
 * + the acting userId; ownership is enforced by RLS on student_profiles (0045),
 * the explicit `.eq("user_id", …)` is belt-and-suspenders. Validation is the
 * pure helper in mobile.ts — this layer only does the DB round-trip.
 */
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ExamSlug } from "@/lib/exam/examContext";
import type { Stage } from "@/lib/profile/onboarding";
import type { ProfileDetails } from "@/lib/profile/fields";
import { logActivity } from "@/lib/activity/service";
import { isNewAccount } from "@/lib/auth/oneTap";
import { readAcquisitionCookie } from "@/lib/acquisition/cookie";

/** The student's stored contact mobile (canonical 91XXXXXXXXXX), or null if not
 *  yet captured. Used by the mock-result gate to decide whether to ask. */
export async function getOwnMobile(
  db: SupabaseClient,
  userId: string
): Promise<{ mobile: string | null }> {
  const { data } = await db
    .from("student_profiles")
    .select("mobile")
    .eq("user_id", userId)
    .maybeSingle();
  return { mobile: (data?.mobile as string | undefined) ?? null };
}

/** Upsert the student's own profile mobile + consent. `mobile` must already be
 *  the canonical form (validateMobileSubmission). Throws on DB error. */
export async function saveOwnMobile(
  db: SupabaseClient,
  userId: string,
  mobile: string,
  consent: boolean
): Promise<void> {
  const { error } = await db.from("student_profiles").upsert(
    {
      user_id: userId,
      mobile,
      consent,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) throw new Error(error.message);
}

/** The full profile the /account page reads (Phase 2). Maps the DB column
 *  `academic_stream` to the app field `stream`. Empty when no row yet. */
export type ProfileRow = {
  mobile: string | null;
  consent: boolean;
  targetExams: string[];
  stage: string | null;
  medium: string | null;
  stream: string | null;
  city: string | null;
  goal: string | null;
  onboardedAt: string | null;
  whatsappOptIn: boolean;
  whatsappPromptedAt: string | null;
  /** When the browser-push ask was answered (migration 0128); null = not yet. */
  pushPromptedAt: string | null;
  /** Weekly sittings goal (migration 0113); null = not chosen. */
  weeklyGoal: number | null;
  /** The student's own exam date, YYYY-MM-DD (migration 0116); null = derive. */
  examDate: string | null;
};

export async function getOwnProfile(
  db: SupabaseClient,
  userId: string
): Promise<ProfileRow> {
  const { data } = await db
    .from("student_profiles")
    .select(
      "mobile, consent, target_exams, stage, medium, academic_stream, city, goal, onboarded_at, whatsapp_opt_in, whatsapp_prompted_at, push_prompted_at, weekly_goal, exam_date"
    )
    .eq("user_id", userId)
    .maybeSingle();
  return {
    mobile: (data?.mobile as string | undefined) ?? null,
    consent: (data?.consent as boolean | undefined) ?? false,
    targetExams: (data?.target_exams as string[] | undefined) ?? [],
    stage: (data?.stage as string | undefined) ?? null,
    medium: (data?.medium as string | undefined) ?? null,
    stream: (data?.academic_stream as string | undefined) ?? null,
    city: (data?.city as string | undefined) ?? null,
    goal: (data?.goal as string | undefined) ?? null,
    onboardedAt: (data?.onboarded_at as string | undefined) ?? null,
    whatsappOptIn: (data?.whatsapp_opt_in as boolean | undefined) ?? false,
    whatsappPromptedAt: (data?.whatsapp_prompted_at as string | undefined) ?? null,
    pushPromptedAt: (data?.push_prompted_at as string | undefined) ?? null,
    weeklyGoal: (data?.weekly_goal as number | null | undefined) ?? null,
    examDate: (data?.exam_date as string | null | undefined) ?? null,
  };
}

/** A partial /account edit — any subset of the self-serve fields, plus mobile +
 *  consent (validated together upstream). Maps `stream` → `academic_stream`. */
export type ProfileUpdate = ProfileDetails & {
  mobile?: string;
  consent?: boolean;
  /** When present, sets the WhatsApp opt-in AND stamps whatsapp_prompted_at for
   *  either decision (true = opt in, false = decline) — the ask-once gate. */
  whatsappOptIn?: boolean;
  /** Stamps push_prompted_at: the browser-push ask was answered, either way. */
  pushPrompted?: true;
  /** Weekly sittings goal; null clears it. */
  weeklyGoal?: number | null;
  /** Own exam date (YYYY-MM-DD); null clears it so the calendar applies. */
  examDate?: string | null;
};

/**
 * Update only the fields present in the patch (own-row upsert). Never touches
 * `onboarded_at`, so an /account edit doesn't re-trigger the intent screen.
 */
export async function updateOwnProfile(
  db: SupabaseClient,
  userId: string,
  patch: ProfileUpdate
): Promise<void> {
  const row: Record<string, unknown> = {
    user_id: userId,
    updated_at: new Date().toISOString(),
  };
  if (patch.targetExams !== undefined) row.target_exams = patch.targetExams;
  if (patch.stage !== undefined) row.stage = patch.stage;
  if (patch.medium !== undefined) row.medium = patch.medium;
  if (patch.stream !== undefined) row.academic_stream = patch.stream;
  if (patch.city !== undefined) row.city = patch.city;
  if (patch.goal !== undefined) row.goal = patch.goal;
  if (patch.mobile !== undefined) row.mobile = patch.mobile;
  if (patch.consent !== undefined) row.consent = patch.consent;
  if (patch.weeklyGoal !== undefined) row.weekly_goal = patch.weeklyGoal;
  if (patch.examDate !== undefined) row.exam_date = patch.examDate;
  if (patch.whatsappOptIn !== undefined) {
    row.whatsapp_opt_in = patch.whatsappOptIn;
    row.whatsapp_prompted_at = new Date().toISOString(); // decided → ask once
  }
  if (patch.pushPrompted) row.push_prompted_at = new Date().toISOString();

  const { error } = await db.from("student_profiles").upsert(row, { onConflict: "user_id" });
  if (error) throw new Error(error.message);
  // The goal is state; choosing or changing it is the act worth a row (0 of
  // 400 profiles had one on 2026-09-27 and nothing said whether anyone tried).
  if (patch.weeklyGoal !== undefined) {
    await logActivity(db, userId, { kind: "goal_set", metadata: { goal: patch.weeklyGoal } });
  }
}

/** Just the fields the post-signup onboarding gate reads. `onboardedAt` null
 *  (or no row) ⇒ the student still needs the intent screen. */
export async function getOnboardingState(
  db: SupabaseClient,
  userId: string
): Promise<{ targetExams: string[]; stage: string | null; onboardedAt: string | null; pushPromptedAt: string | null }> {
  const { data } = await db
    .from("student_profiles")
    .select("target_exams, stage, onboarded_at, push_prompted_at")
    .eq("user_id", userId)
    .maybeSingle();
  return {
    targetExams: (data?.target_exams as string[] | undefined) ?? [],
    stage: (data?.stage as string | undefined) ?? null,
    onboardedAt: (data?.onboarded_at as string | undefined) ?? null,
    pushPromptedAt: (data?.push_prompted_at as string | undefined) ?? null,
  };
}

/**
 * Persist the student's intent capture (target exams + stage) and stamp
 * `onboarded_at` so we never ask again. Upsert on user_id: PostgREST updates
 * only the provided columns, so this never clobbers a mobile already on file
 * (and saveOwnMobile likewise won't clobber these). An empty `targetExams` +
 * null `stage` is a valid skip — it still stamps onboarded_at.
 */
export async function saveOnboarding(
  db: SupabaseClient,
  userId: string,
  input: { targetExams: ExamSlug[]; stage: Stage | null }
): Promise<void> {
  const { error } = await db.from("student_profiles").upsert(
    {
      user_id: userId,
      target_exams: input.targetExams,
      stage: input.stage,
      onboarded_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
  if (error) throw new Error(error.message);
}

/**
 * Persist first-touch acquisition onto the student's profile (migration 0106).
 *
 * WRITE-ONCE, ENFORCED IN THE QUERY: the `.is("acq_source", null)` guard means a
 * second call can never overwrite a stored first touch, even if a later visit
 * somehow carried a different cookie. The rule lives here rather than in a
 * read-then-write, which would race with itself.
 *
 * Best-effort by contract — the caller must not fail a student's onboarding
 * because an attribution write did not land.
 */
export async function persistAcquisition(
  db: SupabaseClient,
  userId: string,
  acq: { source: string; medium: string; campaign: string | null; landing: string; referrerHost: string | null }
): Promise<void> {
  // The row may not exist yet: at sign-in it never does, and the download box
  // signs people in without sending them to /welcome. Insert-or-nothing, so an
  // existing row (mobile, onboarding) is never touched.
  const { error: rowError } = await db
    .from("student_profiles")
    .upsert({ user_id: userId }, { onConflict: "user_id", ignoreDuplicates: true });
  if (rowError) throw new Error(rowError.message);

  const { error } = await db
    .from("student_profiles")
    .update({
      acq_source: acq.source,
      acq_medium: acq.medium,
      acq_campaign: acq.campaign,
      acq_landing: acq.landing,
      acq_referrer_host: acq.referrerHost,
      acq_captured_at: new Date().toISOString(),
    })
    .eq("user_id", userId)
    .is("acq_source", null);
  if (error) throw new Error(error.message);
}

/**
 * Save the first-touch channel parked in the `qb_acq` cookie when an account is
 * CREATED: called by the OAuth callback and after every in-page Google sign-in.
 *
 * It used to be saved only on the /welcome submit, so a signup that skipped
 * /welcome (the download box does, by design) never had its channel saved:
 * 9 of 16 accounts with no source in the three weeks to 2026-10-06.
 *
 * NEW ACCOUNTS ONLY: a returning student signing in on a new browser carries
 * that browser's first touch, which did not earn the account. An old account
 * with no channel stays without one ("never learned" is the honest value).
 *
 * Best-effort by contract, like persistAcquisition: the caller must not fail a
 * sign-in because this did not land.
 */
export async function saveFirstTouch(
  db: SupabaseClient,
  user: { id: string; created_at?: string | null; last_sign_in_at?: string | null },
  rawCookie: string | null | undefined
): Promise<void> {
  if (!isNewAccount(user.created_at, user.last_sign_in_at)) return;
  const acq = readAcquisitionCookie(rawCookie);
  if (!acq) return;
  await persistAcquisition(db, user.id, acq);
}

/**
 * Save the country an account was created from (migration 0142), from the
 * same sign-in paths as saveFirstTouch but NOT tied to its cookie: an account
 * with no channel still gets a country. `country` comes from `readCountry`.
 *
 * New accounts only, for the same reason as the channel: a returning student
 * signing in from somewhere else did not create the account there. Write-once
 * in the query. Best-effort by contract: never fail a sign-in over it.
 */
export async function saveSignupCountry(
  db: SupabaseClient,
  user: { id: string; created_at?: string | null; last_sign_in_at?: string | null },
  country: string | null
): Promise<void> {
  if (!country || !isNewAccount(user.created_at, user.last_sign_in_at)) return;
  const { error: rowError } = await db
    .from("student_profiles")
    .upsert({ user_id: user.id }, { onConflict: "user_id", ignoreDuplicates: true });
  if (rowError) throw new Error(rowError.message);

  const { error } = await db
    .from("student_profiles")
    .update({ signup_country: country })
    .eq("user_id", user.id)
    .is("signup_country", null);
  if (error) throw new Error(error.message);
}
