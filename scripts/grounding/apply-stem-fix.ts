/**
 * One-off: apply a full stem+options+key rewrite for a question whose stored
 * stem/options were corrupted (recovered from the source paper). Updates the
 * question text, overwrites each option's text by label, flips is_correct to
 * the new correct label, rewrites the solution, and recomputes content_hash
 * (collision-guarded, per the 0038 per-exam unique key).
 *
 *   npx tsx scripts/grounding/apply-stem-fix.ts <name>           # dry-run
 *   npx tsx scripts/grounding/apply-stem-fix.ts <name> --apply
 *
 * Reads scripts/grounding/data/<name>.stemfix.json:
 *   [{ "id", "text", "options": {"A":"...","B":"...","C":"...","D":"..."},
 *      "correct": "A|B|C|D", "solution": "..." }]
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
const DATA = join(process.cwd(), "scripts", "grounding", "data");

interface StemFix {
  id: string;
  text: string;
  options: Record<string, string>;
  correct: string;
  solution: string;
}

async function main() {
  const name = process.argv[2];
  if (!name || name.startsWith("--")) throw new Error("usage: apply-stem-fix.ts <name> [--apply]");
  const apply = process.argv.includes("--apply");
  const fixes: StemFix[] = JSON.parse(readFileSync(join(DATA, `${name}.stemfix.json`), "utf8"));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const fix of fixes) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, org_id, exam_id, content_hash, options(id, label, text, is_correct)")
      .eq("id", fix.id)
      .maybeSingle();
    if (error) throw error;
    if (!q) { console.warn(`  ! ${fix.id}: not found`); continue; }

    const opts = (q.options ?? []) as { id: string; label: string; text: string; is_correct: boolean }[];
    const labels = opts.map((o) => o.label).sort();
    const newOptTexts = labels.map((l) => fix.options[l]);
    if (newOptTexts.some((t) => t == null)) {
      console.warn(`  ! ${fix.id}: missing option text for some of ${labels.join(",")}`); continue;
    }
    if (!labels.includes(fix.correct)) { console.warn(`  ! ${fix.id}: correct ${fix.correct} not an option`); continue; }

    const newHash = contentHash(fix.text, newOptTexts, fix.correct);
    const { data: clash } = await client
      .from("questions").select("id")
      .eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", newHash).neq("id", q.id);
    const collides = (clash ?? []).length > 0;
    const oldCorrect = opts.find((o) => o.is_correct)?.label ?? "?";
    console.log(`  ${fix.id}: key ${oldCorrect}->${fix.correct}  hash ${q.content_hash.slice(0,8)}..->${newHash.slice(0,8)}..${collides ? "  ⚠ COLLISION" : ""}`);
    if (!apply) continue;

    // rewrite each option text + correctness
    for (const o of opts) {
      await client.from("options").update({
        text: fix.options[o.label],
        is_correct: o.label === fix.correct,
      }).eq("id", o.id);
    }
    const update: Record<string, unknown> = { text: fix.text, solution: fix.solution };
    if (!collides) update.content_hash = newHash;
    await client.from("questions").update(update).eq("id", fix.id);
    console.log(`    applied`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
