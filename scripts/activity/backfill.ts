/**
 * Backfill the engagement activity spine (user_activity, migration 0052) from
 * the pre-existing signals so the usage-shape readout + progress cockpit aren't
 * empty on day one.
 *
 * IDEMPOTENT: every derived row carries a deterministic `dedupe_key`
 * ("<kind>:<source_row_id>") and is upserted ON CONFLICT (dedupe_key) DO
 * NOTHING — re-running inserts zero rows. Live events (written by the app) leave
 * dedupe_key NULL, so they are never touched by this script.
 *
 * SOURCES (summary/milestone-grade events only — the app captures fine-grained
 * answer_wrong going forward; historical per-answer grading is deliberately not
 * reconstructed here):
 *   - mock_attempts (submitted|expired)      → mock_submitted
 *   - notes_progress.mastered_at             → chapter_mastered
 *   - notes_progress.checkpoint_at           → note_checkpoint
 *   - question_bookmarks                     → question_bookmarked
 *
 * Writes via the service-role client (bypasses RLS by design — same as the other
 * ingest/build scripts). created_at is set to the SOURCE row's timestamp so the
 * historical feed is chronologically honest.
 *
 *   npx tsx scripts/activity/backfill.ts            # dry-run (counts only)
 *   npx tsx scripts/activity/backfill.ts --apply    # upsert the rows
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ACTIVITY_KINDS, type ActivityKind } from "../../src/lib/activity/events";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const PAGE = 1000;

type BackfillRow = {
  user_id: string;
  kind: ActivityKind;
  ref_id: string | null;
  ref_kind: string | null;
  metadata: Record<string, unknown>;
  dedupe_key: string;
  created_at: string;
};

function admin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Page through a table past the PostgREST 1000-row cap via keyset on created_at+id. */
async function* pageAll(
  db: SupabaseClient,
  table: string,
  columns: string
): AsyncGenerator<Record<string, unknown>[]> {
  let offset = 0;
  for (;;) {
    const { data, error } = await db
      .from(table)
      .select(columns)
      .order("created_at", { ascending: true })
      .range(offset, offset + PAGE - 1);
    if (error) throw new Error(`${table}: ${error.message}`);
    // Dynamic-column select loses the row type → cast through unknown.
    const rows = (data ?? []) as unknown as Record<string, unknown>[];
    if (rows.length === 0) return;
    yield rows;
    if (rows.length < PAGE) return;
    offset += PAGE;
  }
}

async function collect(db: SupabaseClient): Promise<BackfillRow[]> {
  const out: BackfillRow[] = [];

  // mock_submitted — one per terminal attempt.
  for await (const rows of pageAll(
    db,
    "mock_attempts",
    "id, user_id, mock_id, status, score, max_score, correct_count, wrong_count, skipped_count, submitted_at, created_at"
  )) {
    for (const r of rows) {
      const status = r.status as string;
      if (status !== "submitted" && status !== "expired") continue;
      out.push({
        user_id: r.user_id as string,
        kind: "mock_submitted",
        ref_id: r.id as string,
        ref_kind: "mock_attempt",
        metadata: {
          mockId: r.mock_id,
          score: r.score,
          maxScore: r.max_score,
          correct: r.correct_count,
          wrong: r.wrong_count,
          skipped: r.skipped_count,
        },
        dedupe_key: `mock_submitted:${r.id}`,
        created_at: (r.submitted_at as string | null) ?? (r.created_at as string),
      });
    }
  }

  // chapter_mastered + note_checkpoint — from the notes track layer.
  for await (const rows of pageAll(
    db,
    "notes_progress",
    "user_id, subtopic_slug, chapter_slug, subject_route, mastered_at, checkpoint_score, checkpoint_total, checkpoint_at"
  )) {
    for (const r of rows) {
      const uid = r.user_id as string;
      const slug = r.subtopic_slug as string;
      if (r.mastered_at) {
        out.push({
          user_id: uid,
          kind: "chapter_mastered",
          ref_id: slug,
          ref_kind: "notes_subtopic",
          metadata: { chapterSlug: r.chapter_slug, subjectRoute: r.subject_route },
          dedupe_key: `chapter_mastered:${uid}:${slug}`,
          created_at: r.mastered_at as string,
        });
      }
      if (r.checkpoint_at) {
        out.push({
          user_id: uid,
          kind: "note_checkpoint",
          ref_id: slug,
          ref_kind: "notes_subtopic",
          metadata: {
            chapterSlug: r.chapter_slug,
            subjectRoute: r.subject_route,
            score: r.checkpoint_score,
            total: r.checkpoint_total,
          },
          // Only the latest checkpoint is stored per row, so key by (user, slug).
          dedupe_key: `note_checkpoint:${uid}:${slug}`,
          created_at: r.checkpoint_at as string,
        });
      }
    }
  }

  // question_bookmarked — one per saved question.
  for await (const rows of pageAll(db, "question_bookmarks", "user_id, question_id, created_at")) {
    for (const r of rows) {
      const uid = r.user_id as string;
      const qid = r.question_id as string;
      out.push({
        user_id: uid,
        kind: "question_bookmarked",
        ref_id: qid,
        ref_kind: "question",
        metadata: {},
        dedupe_key: `question_bookmarked:${uid}:${qid}`,
        created_at: r.created_at as string,
      });
    }
  }

  return out;
}

async function main() {
  const db = admin();
  const rows = await collect(db);

  const byKind: Record<string, number> = {};
  for (const r of rows) byKind[r.kind] = (byKind[r.kind] ?? 0) + 1;
  console.log(`Derived ${rows.length} activity rows:`);
  for (const k of ACTIVITY_KINDS) if (byKind[k]) console.log(`  ${k}: ${byKind[k]}`);

  if (!APPLY) {
    console.log("\nDry run — pass --apply to upsert. (Existing rows no-op via dedupe_key.)");
    return;
  }

  let inserted = 0;
  for (let i = 0; i < rows.length; i += PAGE) {
    const chunk = rows.slice(i, i + PAGE);
    const { error, count } = await db
      .from("user_activity")
      .upsert(chunk, { onConflict: "dedupe_key", ignoreDuplicates: true, count: "exact" });
    if (error) throw new Error(`upsert: ${error.message}`);
    inserted += count ?? 0;
  }
  console.log(`\nUpserted. New rows inserted: ${inserted} (re-runs of existing keys were ignored).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
