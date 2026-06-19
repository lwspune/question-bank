/**
 * Apply source-verified audit fixes (key flips AND stem/option corrections).
 *   npx tsx scripts/grounding/apply-fix.ts <name>           # dry-run
 *   npx tsx scripts/grounding/apply-fix.ts <name> --apply   # write
 *
 * Reads scripts/grounding/data/<name>.fixes.json:
 *   [{ "id",
 *      "text": "<corrected stem or omit>",
 *      "context": "<corrected shared context or omit>",
 *      "options": [{"label","text"}, ...] (full set, or omit),
 *      "new_label": "A|B|C|D",
 *      "solution": "corrected prose (LaTeX, no unicode math)" }]
 *
 * For each: optionally rewrites text/context/options, flips is_correct to
 * new_label, rewrites the solution, and recomputes content_hash from the FINAL
 * (text, option texts, new_label). Warns on a same-(org,exam) hash collision.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}
const DATA = join(process.cwd(), "scripts", "grounding", "data");

interface Fix {
  id: string;
  text?: string;
  context?: string;
  options?: { label: string; text: string }[];
  new_label: string;
  solution: string;
}

async function main() {
  loadEnv();
  const name = process.argv[2];
  if (!name || name.startsWith("--")) throw new Error("usage: apply-fix.ts <name> [--apply]");
  const apply = process.argv.includes("--apply");
  const fixes: Fix[] = JSON.parse(readFileSync(join(DATA, `${name}.fixes.json`), "utf8"));

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
    if (!q) { console.warn(`  ! ${fix.id}: not found`); continue; }

    const dbOpts = (q.options ?? []) as { label: string; text: string; is_correct: boolean }[];
    // Final option texts (apply override by label if provided).
    const overrideByLabel = new Map((fix.options ?? []).map((o) => [o.label, o.text]));
    const finalOptTexts = dbOpts.map((o) => overrideByLabel.get(o.label) ?? o.text);
    const finalText = fix.text ?? q.text;
    if (!dbOpts.some((o) => o.label === fix.new_label)) { console.warn(`  ! ${fix.id}: no option ${fix.new_label}`); continue; }
    const oldLabel = dbOpts.find((o) => o.is_correct)?.label ?? "?";
    const newHash = contentHash(finalText, finalOptTexts, fix.new_label);

    const { data: clash } = await client
      .from("questions").select("id")
      .eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", newHash).neq("id", q.id);
    const collides = (clash ?? []).length > 0;
    const tags = [fix.text && "stem", fix.context && "context", fix.options && "options"].filter(Boolean).join("+") || "key";
    console.log(`  ${fix.id}: ${oldLabel}->${fix.new_label} [${tags}] ${q.content_hash.slice(0,8)}..->${newHash.slice(0,8)}..${collides ? " ⚠COLLISION" : ""}`);
    if (!apply) continue;

    // Option text overrides.
    for (const o of fix.options ?? []) {
      await client.from("options").update({ text: o.text }).eq("question_id", q.id).eq("label", o.label);
    }
    // Key flip.
    await client.from("options").update({ is_correct: false }).eq("question_id", q.id).eq("is_correct", true);
    await client.from("options").update({ is_correct: true }).eq("question_id", q.id).eq("label", fix.new_label);
    // Question fields.
    const update: Record<string, unknown> = { solution: fix.solution };
    if (fix.text !== undefined) update.text = fix.text;
    if (fix.context !== undefined) update.context = fix.context;
    if (!collides) update.content_hash = newHash;
    await client.from("questions").update(update).eq("id", q.id);
    done++;
  }
  console.log(apply ? `applied ${done} fixes` : `dry-run (${fixes.length}) — re-run with --apply`);
}

main().catch((e) => { console.error(e); process.exit(1); });
