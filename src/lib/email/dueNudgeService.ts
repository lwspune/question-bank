/**
 * Service-role reads for the due-queue nudge. The DECISION lives in the pure
 * dueNudge.ts; this module fetches rows and nothing else.
 *
 * NOT marked "server-only" so the tsx runner can import it, and it takes the
 * supabase client as a PARAMETER — the mockReportService.ts precedent.
 *
 * ONE PASS OVER THE LOG, NOT ONE READ PER STUDENT. The drill's own read
 * (`loadDrillEvents`) is per student, which is right for a page and wrong for
 * a batch: 391 accounts would be 391 paged queries plus 391 taxonomy lookups.
 * Instead every answer event is paged once (~11k rows today, twelve pages),
 * grouped in memory, folded per student with the SAME `dueQuestions` the drill
 * uses, and the taxonomy is resolved once over the UNION of due ids. The
 * ladder is therefore identical to what /drill would serve — a nudge can never
 * name a question the drill would not.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { attachRefs, dueQuestions, type DrillEvent } from "@/lib/drill/select";
import { loadQuestionRefs } from "@/lib/drill/query";
import type { NudgeCandidate } from "./dueNudge";

const PAGE = 1000;

type Row = {
  user_id: string;
  kind: string;
  ref_id: string | null;
  created_at: string;
  surface: string | null;
};

/**
 * Every student's due pool and last drill activity, in one pass.
 *
 * Ordered by (created_at, id) so a page boundary cannot split two rows with
 * the same timestamp differently between runs — the fold sorts anyway, but a
 * paged read with no total order can drop or duplicate a row at the seam.
 */
export async function readDueCandidates(
  db: SupabaseClient,
  now: Date = new Date()
): Promise<NudgeCandidate[]> {
  const eventsByUser = new Map<string, DrillEvent[]>();
  const lastDrillByUser = new Map<string, string>();

  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("user_id, kind, ref_id, created_at, surface:metadata->>surface")
      .in("kind", ["answer_wrong", "answer_correct", "drill_completed"])
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`readDueCandidates: ${error.message}`);
    const rows = (data ?? []) as unknown as Row[];

    for (const r of rows) {
      const isDrillActivity = r.kind === "drill_completed" || r.surface === "drill";
      if (isDrillActivity) {
        const prev = lastDrillByUser.get(r.user_id);
        if (prev === undefined || r.created_at > prev) lastDrillByUser.set(r.user_id, r.created_at);
      }
      if (r.kind === "drill_completed" || r.ref_id === null) continue;
      const list = eventsByUser.get(r.user_id);
      const ev: DrillEvent = { questionId: r.ref_id, correct: r.kind === "answer_correct", at: r.created_at };
      if (list) list.push(ev);
      else eventsByUser.set(r.user_id, [ev]);
    }
    if (rows.length < PAGE) break;
  }

  // Fold per student, then resolve taxonomy ONCE over the union of due ids.
  const dueByUser = new Map<string, ReturnType<typeof dueQuestions>>();
  const allDueIds = new Set<string>();
  for (const [userId, events] of eventsByUser) {
    const due = dueQuestions(events, now);
    dueByUser.set(userId, due);
    for (const d of due) allDueIds.add(d.questionId);
  }
  const refs = await loadQuestionRefs(db, [...allDueIds]);

  const out: NudgeCandidate[] = [];
  for (const [userId, due] of dueByUser) {
    out.push({
      userId,
      due: attachRefs(due, refs),
      lastDrillAt: lastDrillByUser.get(userId) ?? null,
    });
  }
  return out;
}

/**
 * How many nudge recipients drilled within `hours` of their send — the one
 * number that says whether the channel works. Read-only; a report, not a gate.
 */
export async function readNudgeConversion(
  db: SupabaseClient,
  hours = 24
): Promise<{ sent: number; drilledAfter: number }> {
  const { data: sends, error } = await db
    .from("email_sends")
    .select("user_id, created_at")
    .eq("kind", "due_nudge")
    .eq("status", "sent")
    .order("created_at", { ascending: true })
    .range(0, PAGE - 1);
  if (error) throw new Error(`readNudgeConversion sends: ${error.message}`);
  const rows = (sends ?? []) as { user_id: string; created_at: string }[];
  if (rows.length === 0) return { sent: 0, drilledAfter: 0 };

  const earliest = rows[0].created_at;
  const { data: drills, error: dErr } = await db
    .from("user_activity")
    .select("user_id, created_at")
    .eq("kind", "drill_completed")
    .gte("created_at", earliest)
    .order("created_at", { ascending: true })
    .range(0, PAGE - 1);
  if (dErr) throw new Error(`readNudgeConversion drills: ${dErr.message}`);
  const byUser = new Map<string, number[]>();
  for (const d of (drills ?? []) as { user_id: string; created_at: string }[]) {
    const list = byUser.get(d.user_id) ?? [];
    list.push(Date.parse(d.created_at));
    byUser.set(d.user_id, list);
  }

  let drilledAfter = 0;
  for (const s of rows) {
    const t = Date.parse(s.created_at);
    const times = byUser.get(s.user_id) ?? [];
    if (times.some((x) => x >= t && x - t <= hours * 3_600_000)) drilledAfter++;
  }
  return { sent: rows.length, drilledAfter };
}
