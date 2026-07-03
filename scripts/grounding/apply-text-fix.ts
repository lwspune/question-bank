/**
 * Apply source-verified stem/option TEXT corrections (extraction defects where
 * the key letter is already right, or a stem needs completing). Sibling to
 * apply-key-fix.ts, which only flips the correct option + solution.
 *
 *   npx tsx scripts/grounding/apply-text-fix.ts <name>           # dry-run
 *   npx tsx scripts/grounding/apply-text-fix.ts <name> --apply   # write
 *
 * Reads scripts/grounding/data/<name>.textfix.json:
 *   [{ "id",
 *      "text"?: "new stem",
 *      "options"?: [{ "label": "A|B|C|D", "text": "new option text" }],
 *      "answer_label"?: "A|B|C|D",   // move is_correct here (optional)
 *      "solution"?: "corrected prose (LaTeX, no unicode math)",
 *      "visibility"?: "PUBLIC" | "PRIVATE" }]
 *
 * For each: applies the edits, recomputes content_hash from the post-edit
 * stem + option texts + correct label, and warns on any same-(org,exam)
 * content_hash collision (skips the hash update if it would collide).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const DATA = join(process.cwd(), "scripts", "grounding", "data");

interface OptEdit { label: string; text: string }
interface TextFix {
  id: string;
  text?: string;
  options?: OptEdit[];
  answer_label?: string;
  solution?: string;
  visibility?: "PUBLIC" | "PRIVATE";
}

async function main() {
  loadEnv();
  const name = process.argv[2];
  if (!name || name.startsWith("--")) throw new Error("usage: apply-text-fix.ts <name> [--apply]");
  const apply = process.argv.includes("--apply");
  const fixes: TextFix[] = JSON.parse(readFileSync(join(DATA, `${name}.textfix.json`), "utf8"));

  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let done = 0;
  for (const fix of fixes) {
    const { data: q, error } = await client
      .from("questions")
      .select("id, text, org_id, exam_id, content_hash, visibility, options(label, text, is_correct)")
      .eq("id", fix.id)
      .maybeSingle();
    if (error) throw error;
    if (!q) { console.warn(`  ! ${fix.id}: not found, skipping`); continue; }

    const opts = (q.options ?? []) as { label: string; text: string; is_correct: boolean }[];
    const editMap = new Map((fix.options ?? []).map((o) => [o.label, o.text]));
    const newText = fix.text ?? q.text;
    const newOptTexts = opts.map((o) => editMap.get(o.label) ?? o.text);
    const curCorrect = opts.find((o) => o.is_correct)?.label ?? "?";
    const newCorrect = fix.answer_label ?? curCorrect;

    const newHash = contentHash(newText, newOptTexts, newCorrect);
    const { data: clash } = await client
      .from("questions")
      .select("id")
      .eq("org_id", q.org_id)
      .eq("exam_id", q.exam_id)
      .eq("content_hash", newHash)
      .neq("id", q.id);
    const collides = (clash ?? []).length > 0;

    console.log(
      `  ${fix.id}: key ${curCorrect}->${newCorrect}  vis ${q.visibility}->${fix.visibility ?? q.visibility}  ` +
      `hash ${q.content_hash.slice(0, 8)}..->${newHash.slice(0, 8)}..${collides ? "  ⚠ COLLISION" : ""}`
    );
    if (fix.text) console.log(`      stem: ${fix.text.slice(0, 90)}...`);
    for (const o of fix.options ?? []) console.log(`      opt ${o.label}: ${o.text}`);
    if (collides) console.warn(`      skipping content_hash update (would collide)`);
    if (!apply) continue;

    if (fix.text && fix.text !== q.text) await client.from("questions").update({ text: fix.text }).eq("id", q.id);
    for (const o of fix.options ?? []) {
      await client.from("options").update({ text: o.text }).eq("question_id", q.id).eq("label", o.label);
    }
    if (fix.answer_label && fix.answer_label !== curCorrect) {
      await client.from("options").update({ is_correct: false }).eq("question_id", q.id).eq("is_correct", true);
      await client.from("options").update({ is_correct: true }).eq("question_id", q.id).eq("label", fix.answer_label);
    }
    const upd: Record<string, unknown> = {};
    if (fix.solution) upd.solution = fix.solution;
    if (fix.visibility) upd.visibility = fix.visibility;
    if (!collides) upd.content_hash = newHash;
    if (Object.keys(upd).length) await client.from("questions").update(upd).eq("id", q.id);
    done++;
  }

  console.log(apply ? `applied ${done} text fixes` : `dry-run (${fixes.length} fixes) — re-run with --apply`);
}

main().catch((e) => { console.error(e); process.exit(1); });
