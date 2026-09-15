/**
 * The /dashboard/students/[id] loader, with the Supabase client INJECTED so
 * `npm run students:smoke` can drive this exact code path outside Next. The
 * `server-only` wrapper that supplies the service-role client is detail.ts.
 * Same split as rosterQuery.ts ← admin.ts.
 *
 * Admin read for the per-student page. Service-role:
 * reads any student's profile (auth admin API), premium status (entitlements),
 * their captured profile (student_profiles), their engagement counts, and their
 * mock attempts across ALL mocks (getUserAttempts, RLS bypassed by the
 * service-role client). Mirrors the other admin reads.
 *
 * ENGAGEMENT COUNTS COME FROM get_student_roster() (migration 0098), the SAME
 * aggregate the roster list renders — filtered server-side to one row. Two
 * reasons, and the first is the bug this page had:
 *
 *   1. NO DRIFT. This page previously read only auth.users + entitlements +
 *      attempts, so the roster ROW you click carried strictly more information
 *      than the page it opened. Sharing one aggregate makes that impossible
 *      rather than merely fixed.
 *   2. NO ROW CAP. Counting notes_progress / bookmarks from a row payload would
 *      re-open the PostgREST 1000-row trap — small per student today (max 164
 *      notes rows), but there are ~6,800 subtopics, so the ceiling is real.
 *
 * The RPC is set-returning, so PostgREST applies .eq()/.maybeSingle() to its
 * result: the aggregate stays in SQL and one row crosses the wire.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserAttempts, type UserAttempt } from "@/lib/mocks/query";
import { displayName, providerLabel } from "./derive";
import type { RosterRpcRow } from "./rosterQuery";

export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  provider: string;
  createdAt: string;
  lastSignInAt: string | null;
};

export type StudentPremium = { active: boolean; source: string | null; expiresAt: string | null };

/**
 * What the student has told us. Every field is nullable because every one of
 * them is optional by design — /welcome is skippable and /account is never
 * gated — so a null means "never answered", NOT a default.
 */
export type StudentCapture = {
  mobile: string | null;
  consent: boolean;
  targetExams: string[];
  stage: string | null;
  medium: string | null;
  stream: string | null;
  city: string | null;
  goal: string | null;
  whatsappOptIn: boolean;
  whatsappPromptedAt: string | null;
  emailOptOut: boolean;
  onboardedAt: string | null;
  /** False when the student has no student_profiles row at all (4 of 316). */
  hasProfile: boolean;
};

/** Engagement counts, straight from the roster aggregate. */
export type StudentEngagement = {
  mocksStarted: number;
  mocksSubmitted: number;
  qsAnswered: number;
  notesSubtopics: number;
  notesSubjects: number;
  notesMastered: number;
  notesCheckpoints: number;
  bookmarks: number;
  lastActive: string | null;
};

export type StudentActivityEntry = {
  id: string;
  kind: string;
  refId: string | null;
  refKind: string | null;
  createdAt: string;
};

export type StudentAttemptSummary = { taken: number; bestPct: number | null; avgPct: number | null };

export type StudentDetail = {
  profile: StudentProfile;
  premium: StudentPremium;
  capture: StudentCapture;
  engagement: StudentEngagement;
  attempts: UserAttempt[];
  summary: StudentAttemptSummary;
  activity: StudentActivityEntry[];
  /** Total events ever, via count:"exact" — NOT activity.length, which is capped. */
  activityTotal: number;
};

/** How many timeline events the page renders. The total is counted separately. */
const ACTIVITY_LIMIT = 20;

/** Percentage for one graded attempt, or null if ungraded. */
function pct(a: UserAttempt): number | null {
  if (a.score == null || !a.maxScore) return null;
  return (a.score / a.maxScore) * 100;
}

/** A student with no student_profiles row — every answer absent, nothing assumed. */
const EMPTY_CAPTURE: StudentCapture = {
  mobile: null,
  consent: false,
  targetExams: [],
  stage: null,
  medium: null,
  stream: null,
  city: null,
  goal: null,
  whatsappOptIn: false,
  whatsappPromptedAt: null,
  emailOptOut: false,
  onboardedAt: null,
  hasProfile: false,
};

/** Zeroed engagement — used only when the roster aggregate has no row for the
 *  user (a brand-new account). Counts are genuinely 0 here; lastActive stays
 *  null because "never acted" is not "acted at the epoch". */
const EMPTY_ENGAGEMENT: StudentEngagement = {
  mocksStarted: 0,
  mocksSubmitted: 0,
  qsAnswered: 0,
  notesSubtopics: 0,
  notesSubjects: 0,
  notesMastered: 0,
  notesCheckpoints: 0,
  bookmarks: 0,
  lastActive: null,
};

type ProfileRowShape = {
  mobile: string | null;
  consent: boolean | null;
  target_exams: string[] | null;
  stage: string | null;
  medium: string | null;
  academic_stream: string | null;
  city: string | null;
  goal: string | null;
  whatsapp_opt_in: boolean | null;
  whatsapp_prompted_at: string | null;
  email_opt_out: boolean | null;
  onboarded_at: string | null;
};

export async function fetchStudentDetail(
  db: SupabaseClient,
  userId: string
): Promise<StudentDetail | null> {
  const { data: userRes, error: uErr } = await db.auth.admin.getUserById(userId);
  if (uErr || !userRes?.user) return null;
  const u = userRes.user;
  const profile: StudentProfile = {
    id: u.id,
    name: displayName((u.user_metadata as { full_name?: string; name?: string } | null) ?? null, u.email ?? null),
    email: u.email ?? "(no email)",
    provider: providerLabel((u.app_metadata as { provider?: string } | null)?.provider),
    createdAt: u.created_at,
    lastSignInAt: u.last_sign_in_at ?? null,
  };

  const [{ data: ents }, attempts, { data: profileRow }, { data: rosterRow }, activityRes] =
    await Promise.all([
      db.from("entitlements").select("source, status, expires_at").eq("user_id", userId).eq("status", "active"),
      getUserAttempts(db, userId),
      db
        .from("student_profiles")
        .select(
          "mobile, consent, target_exams, stage, medium, academic_stream, city, goal, whatsapp_opt_in, whatsapp_prompted_at, email_opt_out, onboarded_at"
        )
        .eq("user_id", userId)
        .maybeSingle(),
      // Cast: the generated DB types don't carry this RPC's signature. Shape is
      // asserted by the migration's RETURNS TABLE and exercised by students:smoke.
      db.rpc("get_student_roster").eq("user_id", userId).maybeSingle() as unknown as Promise<{
        data: RosterRpcRow | null;
      }>,
      db
        .from("user_activity")
        .select("id, kind, ref_id, ref_kind, created_at", { count: "exact" })
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(ACTIVITY_LIMIT),
    ]);

  const now = Date.now();
  const activeEnt = (ents ?? []).find(
    (e) => !e.expires_at || Date.parse(e.expires_at as string) > now
  );
  const premium: StudentPremium = {
    active: Boolean(activeEnt),
    source: (activeEnt?.source as string | null) ?? null,
    expiresAt: (activeEnt?.expires_at as string | null) ?? null,
  };

  const p = profileRow as ProfileRowShape | null;
  const capture: StudentCapture = p
    ? {
        mobile: p.mobile,
        consent: Boolean(p.consent),
        targetExams: p.target_exams ?? [],
        stage: p.stage,
        medium: p.medium,
        stream: p.academic_stream,
        city: p.city,
        goal: p.goal,
        whatsappOptIn: Boolean(p.whatsapp_opt_in),
        whatsappPromptedAt: p.whatsapp_prompted_at,
        emailOptOut: Boolean(p.email_opt_out),
        onboardedAt: p.onboarded_at,
        hasProfile: true,
      }
    : EMPTY_CAPTURE;

  const r = rosterRow;
  const engagement: StudentEngagement = r
    ? {
        mocksStarted: r.mocks_started,
        mocksSubmitted: r.mocks_submitted,
        qsAnswered: r.qs_answered,
        notesSubtopics: r.notes_subtopics,
        notesSubjects: r.notes_subjects,
        notesMastered: r.notes_mastered,
        notesCheckpoints: r.notes_checkpoints,
        bookmarks: r.bookmarks,
        lastActive: r.last_active,
      }
    : EMPTY_ENGAGEMENT;

  const graded = attempts.map(pct).filter((p): p is number => p != null);
  const summary: StudentAttemptSummary = {
    taken: graded.length,
    bestPct: graded.length ? Math.round(Math.max(...graded)) : null,
    avgPct: graded.length ? Math.round(graded.reduce((s, p) => s + p, 0) / graded.length) : null,
  };

  const activity: StudentActivityEntry[] = (
    (activityRes.data ?? []) as {
      id: string;
      kind: string;
      ref_id: string | null;
      ref_kind: string | null;
      created_at: string;
    }[]
  ).map((a) => ({
    id: a.id,
    kind: a.kind,
    refId: a.ref_id,
    refKind: a.ref_kind,
    createdAt: a.created_at,
  }));

  return {
    profile,
    premium,
    capture,
    engagement,
    attempts,
    summary,
    activity,
    activityTotal: activityRes.count ?? activity.length,
  };
}
