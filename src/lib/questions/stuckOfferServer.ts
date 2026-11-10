/**
 * The stuck offer's reads (rules: lib/questions/stuckOffer.ts). Called by POST
 * /api/activity/practice after it has saved a batch with a wrong bank answer,
 * so the answer that completes the streak is already in the history.
 *
 * Reads the student's own answers through their own login (user_activity is
 * own-row under RLS); other students' accuracy, used only to pick an easier
 * question on a subtopic whose labels are all the same, needs the service role
 * (question_item_stats is staff-read), as the result page reads it.
 *
 * Graded answers follow lib/chat/verifiedLearning.ts answerFromActivity: a
 * bank miss writes a verdict row AND a ladder row, and only the verdict counts;
 * self-marks never count (nobody checked them). The student's last RECENT_ROWS
 * answer rows are read: the last 4 on one subtopic sit in them for anyone
 * practising now.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { answerFromActivity } from "@/lib/chat/verifiedLearning";
import { readPeerAccuracy } from "@/lib/email/mockReportService";
import { readInChunks } from "@/lib/supabase/readInChunks";
import { newlyStuck, pickEasier, STUCK_WINDOW, type StuckOffer } from "./stuckOffer";

const RECENT_ROWS = 300;
const CANDIDATES = 80;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** The offer for the answer to `questionId`, or null (not newly stuck, or a failed read). */
export async function readStuckOffer(db: SupabaseClient, admin: SupabaseClient, userId: string, questionId: string): Promise<StuckOffer | null> {
  const { data: q, error: qErr } = await db.from("questions").select("subtopic_id").eq("id", questionId).maybeSingle();
  if (qErr || !q?.subtopic_id) return null;
  const subtopicId = q.subtopic_id as string;

  const { data: rows, error } = await db
    .from("user_activity")
    .select("kind, ref_id, metadata, created_at")
    .eq("user_id", userId)
    .in("kind", ["question_practiced", "answer_wrong", "answer_correct"])
    .order("created_at", { ascending: false })
    .limit(RECENT_ROWS);
  if (error) throw new Error(`stuck offer history: ${error.message}`);
  const graded = (rows ?? [])
    .map((r) => ({ id: r.ref_id as string, at: r.created_at as string, verdict: answerFromActivity({ kind: r.kind as string, metadata: r.metadata as Record<string, unknown> | null }) }))
    .filter((r): r is { id: string; at: string; verdict: { correct: boolean } } => r.verdict !== null && typeof r.id === "string" && UUID_RE.test(r.id));

  const subOf = new Map<string, string>();
  const subRows = await readInChunks<{ id: string; subtopic_id: string | null }>(
    graded.map((r) => r.id),
    (ids, from, to) => db.from("questions").select("id, subtopic_id").in("id", ids).order("id").range(from, to)
  );
  for (const r of subRows) if (r.subtopic_id) subOf.set(r.id, r.subtopic_id);

  // Newest first from the read; the rules want oldest first.
  const onSub = graded.filter((r) => subOf.get(r.id) === subtopicId).reverse();
  const history = onSub.map((r) => r.verdict.correct);
  if (!newlyStuck(history)) return null;

  const [{ data: name }, { data: cands }] = await Promise.all([
    db.from("subtopics").select("name").eq("id", subtopicId).maybeSingle(),
    db.from("questions").select("id, difficulty").eq("subtopic_id", subtopicId).eq("visibility", "PUBLIC").eq("question_format", "mcq").limit(CANDIDATES),
  ]);
  if (!name?.name) return null;
  const candidates = (cands ?? []).map((c) => ({ id: c.id as string, difficulty: String(c.difficulty), peerPct: null as number | null }));
  if (new Set(candidates.map((c) => c.difficulty)).size === 1 && candidates.length > 0) {
    const peer = await readPeerAccuracy(admin, candidates.map((c) => c.id)).catch(() => new Map<string, number>());
    for (const c of candidates) c.peerPct = peer.get(c.id) ?? null;
  }
  const answered = new Set(graded.map((r) => r.id));
  answered.add(questionId);

  return { questionId, subtopic: name.name as string, history: history.slice(-STUCK_WINDOW), easierId: pickEasier(candidates, answered) };
}
