/**
 * Admin read for the /dashboard/students/[id] per-student page. Service-role:
 * reads any student's profile (auth admin API), premium status (entitlements),
 * and their mock attempts across ALL mocks (getUserAttempts, RLS bypassed by the
 * service-role client). Mirrors the other admin reads.
 */
import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { getUserAttempts, type UserAttempt } from "@/lib/mocks/query";
import { displayName, providerLabel } from "./derive";

export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  provider: string;
  createdAt: string;
};

export type StudentPremium = { active: boolean; source: string | null; expiresAt: string | null };

export type StudentAttemptSummary = { taken: number; bestPct: number | null; avgPct: number | null };

export type StudentDetail = {
  profile: StudentProfile;
  premium: StudentPremium;
  attempts: UserAttempt[];
  summary: StudentAttemptSummary;
};

/** Percentage for one graded attempt, or null if ungraded. */
function pct(a: UserAttempt): number | null {
  if (a.score == null || !a.maxScore) return null;
  return (a.score / a.maxScore) * 100;
}

export async function getStudentDetail(userId: string): Promise<StudentDetail | null> {
  const db = createSupabaseAdminClient();

  const { data: userRes, error: uErr } = await db.auth.admin.getUserById(userId);
  if (uErr || !userRes?.user) return null;
  const u = userRes.user;
  const profile: StudentProfile = {
    id: u.id,
    name: displayName((u.user_metadata as { full_name?: string; name?: string } | null) ?? null, u.email ?? null),
    email: u.email ?? "(no email)",
    provider: providerLabel((u.app_metadata as { provider?: string } | null)?.provider),
    createdAt: u.created_at,
  };

  const [{ data: ents }, attempts] = await Promise.all([
    db.from("entitlements").select("source, status, expires_at").eq("user_id", userId).eq("status", "active"),
    getUserAttempts(db, userId),
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

  const graded = attempts.map(pct).filter((p): p is number => p != null);
  const summary: StudentAttemptSummary = {
    taken: graded.length,
    bestPct: graded.length ? Math.round(Math.max(...graded)) : null,
    avgPct: graded.length ? Math.round(graded.reduce((s, p) => s + p, 0) / graded.length) : null,
  };

  return { profile, premium, attempts, summary };
}
