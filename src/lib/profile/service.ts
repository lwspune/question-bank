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
};

export async function getOwnProfile(
  db: SupabaseClient,
  userId: string
): Promise<ProfileRow> {
  const { data } = await db
    .from("student_profiles")
    .select(
      "mobile, consent, target_exams, stage, medium, academic_stream, city, goal, onboarded_at, whatsapp_opt_in, whatsapp_prompted_at"
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
  if (patch.whatsappOptIn !== undefined) {
    row.whatsapp_opt_in = patch.whatsappOptIn;
    row.whatsapp_prompted_at = new Date().toISOString(); // decided → ask once
  }

  const { error } = await db.from("student_profiles").upsert(row, { onConflict: "user_id" });
  if (error) throw new Error(error.message);
}

/** Just the fields the post-signup onboarding gate reads. `onboardedAt` null
 *  (or no row) ⇒ the student still needs the intent screen. */
export async function getOnboardingState(
  db: SupabaseClient,
  userId: string
): Promise<{ targetExams: string[]; stage: string | null; onboardedAt: string | null }> {
  const { data } = await db
    .from("student_profiles")
    .select("target_exams, stage, onboarded_at")
    .eq("user_id", userId)
    .maybeSingle();
  return {
    targetExams: (data?.target_exams as string[] | undefined) ?? [],
    stage: (data?.stage as string | undefined) ?? null,
    onboardedAt: (data?.onboarded_at as string | undefined) ?? null,
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
