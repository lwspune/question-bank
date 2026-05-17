/**
 * Principle-tag audit (read-only, pre-INSERT safety net).
 *
 * Given a JSON spec describing a proposed batch of principle tags, this script
 * pulls live taxonomy + existing-tag state from Supabase and prints a markdown
 * summary suitable for pasting into the chat approval message. Catches the
 * COUNT-by-subtopic miscount class of bug surfaced during Phase 2 (eyeballing
 * a candidate JSON undercounted Modulus by 14 stems mid-INSERT).
 *
 * Does NOT INSERT. The atomic INSERT stays in chat with the user's defensive
 * `DO $$` count check.
 *
 * Usage:
 *   npx tsx scripts/principle-tag-audit.ts audit-spec.json
 *   npm run tags:audit -- audit-spec.json
 *
 * Spec format (JSON):
 *   {
 *     "principleSlug": "differentiability-conditions",
 *     "candidateIds": [
 *       "38463584-55cd-44b3-bf0d-2ddb49e7a945",
 *       ...
 *     ]
 *   }
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY in env (or
 * service role for PRIVATE-tag visibility). See `[[principle-tag-survey-methodology]]`
 * for the editorial rules this audit supports.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  aggregateAudit,
  type QuestionRecord,
} from "../src/lib/tags/principleAuditAggregator";

function loadEnv() {
  const local = path.join(process.cwd(), ".env.local");
  if (fs.existsSync(local)) {
    const dotenv = require("dotenv");
    dotenv.config({ path: local, override: true });
  }
}

type Spec = { principleSlug: string; candidateIds: string[] };

function readSpec(specPath: string): Spec {
  if (!fs.existsSync(specPath)) {
    throw new Error(`spec file not found: ${specPath}`);
  }
  const raw = JSON.parse(fs.readFileSync(specPath, "utf-8")) as Spec;
  if (!raw.principleSlug || typeof raw.principleSlug !== "string") {
    throw new Error('spec missing "principleSlug" (kebab-case string)');
  }
  if (!Array.isArray(raw.candidateIds) || raw.candidateIds.length === 0) {
    throw new Error('spec missing non-empty "candidateIds" array');
  }
  return raw;
}

async function fetchRecords(
  client: SupabaseClient,
  ids: string[]
): Promise<QuestionRecord[]> {
  const { data, error } = await client
    .from("questions")
    .select(
      "id, difficulty, chapter:chapters(name), subtopic:subtopics(name)"
    )
    .in("id", ids);
  if (error) throw new Error(`fetchRecords: ${error.message}`);
  return (data ?? []).map((r) => {
    const row = r as {
      id: string;
      difficulty: "EASY" | "MODERATE" | "HARD";
      chapter: { name: string } | { name: string }[] | null;
      subtopic: { name: string } | { name: string }[] | null;
    };
    const chapter = Array.isArray(row.chapter) ? row.chapter[0] : row.chapter;
    const subtopic = Array.isArray(row.subtopic)
      ? row.subtopic[0]
      : row.subtopic;
    return {
      id: row.id,
      chapter: chapter?.name ?? "(unknown chapter)",
      subtopic: subtopic?.name ?? "(unknown subtopic)",
      difficulty: row.difficulty,
    };
  });
}

async function fetchAlreadyTagged(
  client: SupabaseClient,
  principleSlug: string,
  candidateIds: string[]
): Promise<string[]> {
  const { data, error } = await client
    .from("question_principle_tags")
    .select("question_id")
    .eq("principle_slug", principleSlug)
    .in("question_id", candidateIds);
  if (error) throw new Error(`fetchAlreadyTagged: ${error.message}`);
  return (data ?? []).map((r) => (r as { question_id: string }).question_id);
}

function renderMarkdown(spec: Spec, result: ReturnType<typeof aggregateAudit>) {
  const lines: string[] = [];
  lines.push(`# Principle-tag audit: \`${spec.principleSlug}\``);
  lines.push("");
  lines.push(`- **Total candidates:** ${result.totalCandidates}`);
  lines.push(`- **Pending INSERT:** ${result.pendingTagged.length}`);
  lines.push(`- **Already tagged (would be no-op):** ${result.alreadyTagged.length}`);
  lines.push(`- **Unresolved UUIDs (not in PUBLIC bank):** ${result.unresolvedIds.length}`);
  lines.push(`- **Chapter spread:** ${result.chapterSpread} ${result.chapterSpread >= 2 ? "✅" : "⚠️ FAILS ≥2 cross-chapter rule"}`);
  lines.push("");

  if (result.byChapter.length > 0) {
    lines.push("## Per-chapter / per-subtopic breakdown");
    lines.push("");
    lines.push("| Chapter | Subtopic | Count | IDs |");
    lines.push("|---|---|---|---|");
    for (const ch of result.byChapter) {
      ch.subtopics.forEach((sub, i) => {
        const chapterCell = i === 0 ? `**${ch.chapter}** (${ch.total})` : "";
        lines.push(
          `| ${chapterCell} | ${sub.subtopic} | ${sub.count} | ${sub.ids.map((id) => id.slice(0, 8)).join(", ")} |`
        );
      });
    }
    lines.push("");
  }

  if (result.alreadyTagged.length > 0) {
    lines.push("## ⚠️ Already tagged (re-INSERT will be no-op via ON CONFLICT)");
    lines.push("");
    for (const id of result.alreadyTagged) lines.push(`- ${id}`);
    lines.push("");
  }

  if (result.unresolvedIds.length > 0) {
    lines.push("## ⚠️ Unresolved UUIDs");
    lines.push("");
    lines.push("These IDs are in the spec but not visible under current RLS (deleted, PRIVATE, typo, or wrong-org):");
    lines.push("");
    for (const id of result.unresolvedIds) lines.push(`- ${id}`);
    lines.push("");
  }

  if (result.pendingTagged.length === 0) {
    lines.push("## Defensive INSERT block");
    lines.push("");
    lines.push("_(skipped — no pending tags to insert)_");
    return lines.join("\n");
  }

  lines.push("## Defensive INSERT block");
  lines.push("");
  lines.push("```sql");
  lines.push("DO $$");
  lines.push("DECLARE inserted_count int;");
  lines.push("BEGIN");
  lines.push("  INSERT INTO question_principle_tags (question_id, principle_slug, tagged_by_llm)");
  lines.push("  VALUES");
  const valuesRows = result.pendingTagged.map(
    (id) => `    ('${id}'::uuid, '${spec.principleSlug}', true)`
  );
  lines.push(valuesRows.join(",\n"));
  lines.push("  ON CONFLICT (question_id, principle_slug) DO NOTHING;");
  lines.push("  GET DIAGNOSTICS inserted_count = ROW_COUNT;");
  lines.push(`  IF inserted_count != ${result.pendingTagged.length} THEN`);
  lines.push(`    RAISE EXCEPTION 'Expected ${result.pendingTagged.length} inserts, got %', inserted_count;`);
  lines.push("  END IF;");
  lines.push("END $$;");
  lines.push("```");

  return lines.join("\n");
}

async function main() {
  loadEnv();
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("Usage: tsx scripts/principle-tag-audit.ts <spec.json>");
    process.exit(2);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or *_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY in env"
    );
    process.exit(2);
  }

  const spec = readSpec(specPath);
  const client = createClient(url, key);

  const [records, alreadyTagged] = await Promise.all([
    fetchRecords(client, spec.candidateIds),
    fetchAlreadyTagged(client, spec.principleSlug, spec.candidateIds),
  ]);

  const result = aggregateAudit(spec.candidateIds, records, alreadyTagged);
  console.log(renderMarkdown(spec, result));

  if (result.chapterSpread < 2) {
    console.error(
      "\n[FAIL] Chapter spread < 2 — principle not horizontal. See [[principle-tag-survey-methodology]] rule 5."
    );
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
