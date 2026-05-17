/**
 * One-shot backfill: copy curated UUIDs from /notes editorial modules into
 * the question_concept_tags DB table (migration 0021).
 *
 * For each note's ConceptUnit:
 *   - pyqExampleId (if present) → tag with (subtopicSlug, conceptSlug)
 *   - every drillQuestionId → tag with (subtopicSlug, conceptSlug)
 *
 * Idempotent. Re-running inserts 0 new rows (PK collision → ON CONFLICT DO NOTHING).
 * Uses service-role client to bypass RLS (admin-only operation).
 *
 * Usage:
 *   npx tsx scripts/migrate-notes-drills-to-tags.ts            # dry-run, prints counts
 *   npx tsx scripts/migrate-notes-drills-to-tags.ts --apply    # commits inserts
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  STATISTICS_NOTES,
  STATISTICS_CHAPTER,
} from "../src/app/notes/nda-maths/statistics/_data";

type TagRow = {
  question_id: string;
  subtopic_slug: string;
  concept_slug: string;
  tagged_by_llm: boolean;
};

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

function collectTagRows(): TagRow[] {
  const rows: TagRow[] = [];
  const seen = new Set<string>();
  // Statistics chapter is the only chapter with notes today. As future
  // chapters ship, add their _data imports here and walk them the same way.
  for (const [subtopicSlug, note] of Object.entries(STATISTICS_NOTES)) {
    for (const concept of note.concepts) {
      const ids = new Set<string>();
      if (concept.pyqExampleId) ids.add(concept.pyqExampleId);
      for (const id of concept.drillQuestionIds ?? []) ids.add(id);
      for (const questionId of ids) {
        const key = `${questionId}|${subtopicSlug}|${concept.slug}`;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push({
          question_id: questionId,
          subtopic_slug: subtopicSlug,
          concept_slug: concept.slug,
          tagged_by_llm: false,
        });
      }
    }
  }
  return rows;
}

async function main() {
  loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) {
    console.error(
      "missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
    );
    process.exit(2);
  }
  const client: SupabaseClient = createClient(url, serviceRole, {
    auth: { persistSession: false },
  });

  const apply = process.argv.includes("--apply");
  const rows = collectTagRows();

  console.log(
    `notes drills → tags backfill: ${rows.length} candidate rows (across ${
      Object.keys(STATISTICS_NOTES).length
    } subtopics in ${STATISTICS_CHAPTER.chapterName})`
  );

  if (!apply) {
    console.log("(dry-run — pass --apply to commit)");
    console.log("sample rows:");
    for (const r of rows.slice(0, 3)) {
      console.log(
        `  ${r.question_id} → (${r.subtopic_slug}, ${r.concept_slug})`
      );
    }
    return;
  }

  // Chunk inserts to stay under PostgREST's request size limits. 200 rows per
  // call is conservative; the whole payload is small (~5 KB per chunk).
  const CHUNK = 200;
  let totalInserted = 0;
  let totalConflicts = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const chunk = rows.slice(i, i + CHUNK);
    // Two-step idempotency: first try a plain insert; if any rows are PK
    // duplicates, supabase-js returns an error. We handle that by upserting
    // with no-op DO NOTHING semantics via onConflict.
    const { error, count } = await client
      .from("question_concept_tags")
      .upsert(chunk, {
        onConflict: "question_id,subtopic_slug,concept_slug",
        ignoreDuplicates: true,
        count: "exact",
      });
    if (error) {
      console.error(`chunk ${i / CHUNK + 1} failed: ${error.message}`);
      process.exit(1);
    }
    const inserted = count ?? 0;
    totalInserted += inserted;
    totalConflicts += chunk.length - inserted;
  }

  console.log(
    `applied: ${totalInserted} new rows, ${totalConflicts} already-present (deduped via PK)`
  );
}

main().catch((err) => {
  console.error("backfill failed:", err);
  process.exit(2);
});
