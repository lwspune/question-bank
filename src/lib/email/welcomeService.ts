/**
 * Service-role reads for the welcome email. The DECISION lives in the pure
 * welcome.ts; this module fetches rows and nothing else.
 *
 * NOT marked "server-only" so the tsx runner can import it, and it takes the
 * supabase client as a PARAMETER — the dueNudgeService.ts precedent.
 *
 * Paged reads: student_profiles is past 380 rows and grows, and a row-derived
 * answer from a truncated `.select()` is silently wrong (the 1000-row cap
 * pitfall in CLAUDE.md).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { isExamSlug, type ExamSlug } from "@/lib/exam/examContext";
import { WELCOME_KIND } from "./welcome";

const PAGE = 1000;

/**
 * userId → primary target exam (the first of `target_exams`), or null when the
 * profile exists but the student skipped. Absence from the map = no profile.
 * `isExamSlug` guards the stored value: an exam removed from the registry
 * must fall to the general loop, never crash the runner.
 */
export async function readPrimaryExams(db: SupabaseClient): Promise<Map<string, ExamSlug | null>> {
  const out = new Map<string, ExamSlug | null>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("student_profiles")
      .select("user_id, target_exams")
      .order("user_id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readPrimaryExams: ${error.message}`);
    const rows = (data ?? []) as { user_id: string; target_exams: unknown }[];
    for (const r of rows) {
      const first = Array.isArray(r.target_exams) ? r.target_exams[0] : null;
      out.set(r.user_id, isExamSlug(first) ? first : null);
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/**
 * How many welcome recipients recorded ANY activity within `hours` of their
 * send — the one number that says whether the mail moved anyone. Read-only;
 * a report, not a gate. Activity here is the signed-in log only, so a student
 * who read /start and left counts as nothing — this under-reports by design.
 */
export async function readWelcomeConversion(
  db: SupabaseClient,
  hours = 48
): Promise<{ sent: number; activeAfter: number }> {
  const sends: { user_id: string; created_at: string }[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("email_sends")
      .select("user_id, created_at")
      .eq("kind", WELCOME_KIND)
      .eq("status", "sent")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readWelcomeConversion sends: ${error.message}`);
    const rows = (data ?? []) as { user_id: string; created_at: string }[];
    sends.push(...rows);
    if (rows.length < PAGE) break;
  }
  if (sends.length === 0) return { sent: 0, activeAfter: 0 };

  const earliest = sends[0].created_at;
  const byUser = new Map<string, number[]>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("user_id, created_at")
      .gte("created_at", earliest)
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readWelcomeConversion activity: ${error.message}`);
    const rows = (data ?? []) as { user_id: string; created_at: string }[];
    for (const a of rows) {
      const list = byUser.get(a.user_id) ?? [];
      list.push(Date.parse(a.created_at));
      byUser.set(a.user_id, list);
    }
    if (rows.length < PAGE) break;
  }

  let activeAfter = 0;
  for (const s of sends) {
    const t = Date.parse(s.created_at);
    const times = byUser.get(s.user_id) ?? [];
    if (times.some((x) => x >= t && x - t <= hours * 3_600_000)) activeAfter++;
  }
  return { sent: sends.length, activeAfter };
}
