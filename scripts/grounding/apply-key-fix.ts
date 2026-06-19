/**
 * Apply audited wrong-key fixes surfaced by the grounding blind-rederivation
 * audit (the HELD queue from commit.ts). Each fix flips the correct option,
 * rewrites the solution prose, and recomputes content_hash — the /solution-
 * cleanup discipline, scripted.
 *
 *   npx tsx scripts/grounding/apply-key-fix.ts <name>           # dry-run
 *   npx tsx scripts/grounding/apply-key-fix.ts <name> --apply   # write
 *
 * Reads scripts/grounding/data/<name>.keyfix.json:
 *   [{ "id", "new_label": "A|B|C|D", "solution": "corrected prose (LaTeX, no unicode math)" }]
 *
 * For each: verifies new_label is a real option, flips is_correct, updates the
 * solution, recomputes content_hash = contentHash(text, optionTexts, new_label),
 * and warns on any same-(org,exam) content_hash collision before writing.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const DATA = join(process.cwd(), "scripts", "grounding", "data");

interface KeyFix {
  id: string;
  new_label: string;
  solution: string;
}

async function main() {
  loadEnv();
  const name = process.argv[2];
  if (!name || name.startsWith("--")) throw new Error("usage: apply-key-fix.ts <name> [--apply]");
  const apply = process.argv.includes("--apply");
  const fixes: KeyFix[] = JSON.parse(readFileSync(join(DATA, `${name}.keyfix.json`), "utf8"));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let done = 0;
  for (const fix of fixes) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, text, org_id, exam_id, content_hash, options(label, text, is_correct)")
      .eq("id", fix.id)
      .maybeSingle();
    if (error) throw error;
    if (!q) {
      console.warn(`  ! ${fix.id}: not found, skipping`);
      continue;
    }
    const opts = (q.options ?? []) as { label: string; text: string; is_correct: boolean }[];
    const target = opts.find((o) => o.label === fix.new_label);
    if (!target) {
      console.warn(`  ! ${fix.id}: option ${fix.new_label} not found, skipping`);
      continue;
    }
    const oldLabel = opts.find((o) => o.is_correct)?.label ?? "?";
    const newHash = contentHash(q.text, opts.map((o) => o.text), fix.new_label);

    // Collision guard (per-exam, per the 0038 unique key).
    const { data: clash } = await client
      .from("questions")
      .select("id")
      .eq("org_id", q.org_id)
      .eq("exam_id", q.exam_id)
      .eq("content_hash", newHash)
      .neq("id", q.id);
    const collides = (clash ?? []).length > 0;

    console.log(`  ${fix.id}: ${oldLabel} -> ${fix.new_label}  hash ${q.content_hash.slice(0, 8)}..->${newHash.slice(0, 8)}..${collides ? "  ⚠ COLLISION" : ""}`);
    if (collides) {
      console.warn(`    skipping content_hash update (would collide); flipping key + solution only`);
    }
    if (!apply) continue;

    await client.from("options").update({ is_correct: false }).eq("question_id", q.id).eq("is_correct", true);
    await client.from("options").update({ is_correct: true }).eq("question_id", q.id).eq("label", fix.new_label);
    const update: Record<string, unknown> = { solution: fix.solution };
    if (!collides) update.content_hash = newHash;
    await client.from("questions").update(update).eq("id", q.id);
    done++;
  }

  console.log(`${apply ? `applied ${done} key fixes` : `dry-run (${fixes.length} fixes) — re-run with --apply`}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
