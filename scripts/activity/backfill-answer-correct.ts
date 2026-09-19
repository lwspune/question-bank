/**
 * Backfill `answer_correct` for mocks graded before the emitter existed.
 *
 * WHAT IT RECORDS, AND WHAT IT DELIBERATELY DOES NOT. A correct answer is
 * recorded only where the student had ALREADY missed that question — the rule in
 * lib/mocks/correctEvents.ts, measured before it was built: the symmetric
 * version costs 20,250 rows to change the drill pool by 484 questions (4.7% of
 * the 10,395 ever missed), because students rarely meet the same question twice.
 *
 * CHRONOLOGY IS LOAD-BEARING. "Previously missed" means *as of that attempt*,
 * not as of today. Attempts are walked OLDEST FIRST and the missed set grows as
 * the walk proceeds. Asking "has this student ever missed this?" against today's
 * data would let a mistake made in September justify a recovery recorded in
 * July — a claim about the past that was not true when it was made.
 *
 * IT RE-GRADES RATHER THAN RE-DERIVING. Correctness comes from `regradeAttempt`,
 * which runs the same getMockById -> loadAnswerKey -> loadSavedAnswers ->
 * gradeMock chain the live submit path uses. The cheap alternative — joining
 * attempt_answers to options.is_correct in SQL — is blind to JEE Section-B
 * numeric answers and knows nothing about GRACE questions, which `verdictFor`
 * scores as correct whether or not the student answered. That would have written
 * "you recovered this" for questions nobody attempted.
 *
 * IDEMPOTENT: every row carries `answer_correct:<attemptId>:<questionId>` and is
 * upserted ON CONFLICT (dedupe_key) DO NOTHING — the same key the LIVE emitter
 * writes, so a re-run after the feature ships cannot double-write.
 *
 * DRY RUN BY DEFAULT. `-- --apply` writes. `-- --limit=N` caps the walk.
 */
import { join } from "node:path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

// Must precede the lib/mocks/service import — that module is `server-only`.
import "../lib/serverOnly";

import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { regradeAttempt } from "@/lib/mocks/service";
import {
  selectAnswerCorrectEvents,
  answerCorrectDedupeKey,
} from "@/lib/mocks/correctEvents";

const APPLY = process.argv.includes("--apply");
const LIMIT = Number(process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1] ?? 0);
const PAGE = 1000;

type Attempt = { id: string; userId: string; mockId: string; submittedAt: string };

/** Every graded attempt, oldest first. Paged — 738 today and growing. */
async function loadGradedAttempts(db: SupabaseClient): Promise<Attempt[]> {
  const out: Attempt[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("mock_attempts")
      .select("id, user_id, mock_id, submitted_at")
      .in("status", ["submitted", "expired"])
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`loadGradedAttempts: ${error.message}`);
    const rows = (data ?? []) as Record<string, unknown>[];
    for (const r of rows) {
      out.push({
        id: r.id as string,
        userId: r.user_id as string,
        mockId: r.mock_id as string,
        submittedAt: r.submitted_at as string,
      });
    }
    if (rows.length < PAGE) break;
  }
  return out;
}

/**
 * Each student's missed questions AS RECORDED BY THE SPINE, with timestamps.
 *
 * Read from `user_activity` rather than re-derived from `attempt_answers`,
 * because those rows ARE what the drill ladder folds over — a second derivation
 * would be free to disagree with the thing it describes. This covers only the
 * spine's own era: the original backfill deliberately did not reconstruct
 * historical per-answer grading, so a mock sat before migration 0052 has no
 * answer_wrong rows and correctly yields no recoveries here.
 */
async function loadMissedTimeline(
  db: SupabaseClient
): Promise<Map<string, { questionId: string; at: string }[]>> {
  const byUser = new Map<string, { questionId: string; at: string }[]>();
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await db
      .from("user_activity")
      .select("user_id, ref_id, created_at")
      .eq("kind", "answer_wrong")
      .order("created_at", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`loadMissedTimeline: ${error.message}`);
    const rows = (data ?? []) as Record<string, unknown>[];
    for (const r of rows) {
      const uid = r.user_id as string;
      const entry = { questionId: r.ref_id as string, at: r.created_at as string };
      const list = byUser.get(uid);
      if (list) list.push(entry);
      else byUser.set(uid, [entry]);
    }
    if (rows.length < PAGE) break;
  }
  return byUser;
}

type Row = {
  user_id: string;
  kind: "answer_correct";
  ref_id: string;
  ref_kind: string;
  metadata: Record<string, unknown>;
  dedupe_key: string;
  created_at: string;
};

async function main() {
  const db = createSupabaseAdminClient();

  const attempts = await loadGradedAttempts(db);
  const missedTimeline = await loadMissedTimeline(db);
  const walk = LIMIT > 0 ? attempts.slice(0, LIMIT) : attempts;

  console.log(`${APPLY ? "APPLY" : "DRY RUN"} — ${walk.length} graded attempt(s), oldest first`);
  console.log(`students with recorded mistakes: ${missedTimeline.size}`);

  const rows: Row[] = [];
  let regradeFailures = 0;
  let considered = 0;

  for (const a of walk) {
    // The missed set AS OF THIS ATTEMPT — strictly before it, so a mistake made
    // later can never justify a recovery recorded earlier.
    const missedBefore = new Set(
      (missedTimeline.get(a.userId) ?? [])
        .filter((m) => m.at < a.submittedAt)
        .map((m) => m.questionId)
    );
    if (missedBefore.size === 0) continue;
    considered++;

    let graded;
    try {
      graded = await regradeAttempt(db, a.userId, a.id);
    } catch (e) {
      regradeFailures++;
      console.error(`  regrade failed ${a.id}: ${e instanceof Error ? e.message : String(e)}`);
      continue;
    }

    for (const ev of selectAnswerCorrectEvents(graded.questions, graded.verdicts, missedBefore)) {
      rows.push({
        user_id: a.userId,
        kind: "answer_correct",
        ref_id: ev.questionId,
        ref_kind: "question",
        metadata: { mockId: a.mockId, sectionKey: ev.sectionKey, backfilled: true },
        dedupe_key: answerCorrectDedupeKey(a.id, ev.questionId),
        // Chronologically honest: the recovery happened when the paper was sat.
        created_at: a.submittedAt,
      });
    }
  }

  const students = new Set(rows.map((r) => r.user_id));
  console.log(
    `\n${considered} attempt(s) had prior mistakes to check; ` +
      `${rows.length} recovery row(s) across ${students.size} student(s).`
  );
  if (regradeFailures > 0) {
    console.error(`!! ${regradeFailures} attempt(s) could not be re-graded and were SKIPPED.`);
    process.exitCode = 1;
  }

  if (rows.length === 0) {
    console.log("Nothing to write.");
    return;
  }
  for (const r of rows.slice(0, 8)) {
    console.log(`  ${r.user_id.slice(0, 8)}  q=${r.ref_id.slice(0, 8)}  at ${r.created_at}`);
  }
  if (rows.length > 8) console.log(`  … and ${rows.length - 8} more`);

  if (!APPLY) {
    console.log("\nDRY RUN — nothing written. Re-run with `-- --apply`.");
    return;
  }

  let written = 0;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    const { error } = await db
      .from("user_activity")
      .upsert(chunk, { onConflict: "dedupe_key", ignoreDuplicates: true });
    if (error) throw new Error(`upsert: ${error.message}`);
    written += chunk.length;
  }
  console.log(`\nUpserted ${written} row(s). Existing rows no-op via dedupe_key.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
