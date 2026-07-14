/**
 * One-off: apply source-verified corrections to practice questions surfaced by
 * the Mock-4 / 6M-Mock solution review. Each fix may rewrite the stem, rewrite
 * individual option texts, and/or move the correct-answer flag — then recompute
 * content_hash (collision-guarded, per the 0038 per-exam unique key).
 *
 *   npx tsx scripts/practice/apply-source-fixes.ts <fixes.json>            # dry-run
 *   npx tsx scripts/practice/apply-source-fixes.ts <fixes.json> --apply    # write
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

interface Fix {
  id: string;
  qnum: string;
  chapter: string;
  correct: string;
  solution: string;
  note: string;
  text?: string;
  options?: Record<string, string>;
}

async function main() {
  const path = process.argv[2];
  if (!path || path.startsWith("--")) throw new Error("usage: apply-source-fixes.ts <fixes.json> [--apply]");
  const apply = process.argv.includes("--apply");
  const fixes: Fix[] = JSON.parse(readFileSync(path, "utf8"));

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  let ok = 0;
  const problems: string[] = [];
  for (const fix of fixes) {
    const { data: q, error } = await db
      .from("questions")
      .select("id, text, org_id, exam_id, content_hash, options(id, label, text, is_correct)")
      .eq("id", fix.id)
      .maybeSingle();
    if (error) throw error;
    if (!q) { problems.push(`${fix.qnum}: NOT FOUND`); continue; }

    const opts = (q.options ?? []) as { id: string; label: string; text: string; is_correct: boolean }[];
    opts.sort((a, b) => a.label.localeCompare(b.label));
    const finalText = fix.text ?? q.text;
    const finalOpts = opts.map((o) => ({ ...o, text: fix.options?.[o.label] ?? o.text }));
    const target = finalOpts.find((o) => o.label === fix.correct);
    if (!target) { problems.push(`${fix.qnum}: correct label ${fix.correct} missing`); continue; }

    // integrity: exactly one correct after the move; no two options end up identical
    const texts = finalOpts.map((o) => o.text.trim());
    const dupes = texts.filter((t, i) => texts.indexOf(t) !== i);
    const oldLabel = opts.find((o) => o.is_correct)?.label ?? "?";
    const newHash = contentHash(finalText, finalOpts.map((o) => o.text), fix.correct);

    const { data: clash } = await db
      .from("questions").select("id")
      .eq("org_id", q.org_id).eq("exam_id", q.exam_id).eq("content_hash", newHash).neq("id", q.id);
    const collides = (clash ?? []).length > 0;

    const changedOpts = finalOpts.filter((o, i) => o.text !== opts[i].text).map((o) => o.label);
    const stemChg = finalText !== q.text;
    console.log(
      `[${fix.qnum} ${fix.chapter}] key ${oldLabel}->${fix.correct}` +
      `${stemChg ? "  stem✎" : ""}${changedOpts.length ? `  opts✎[${changedOpts.join(",")}]` : ""}` +
      `${dupes.length ? `  ⚠DUP_OPTS[${[...new Set(dupes)].join(" | ")}]` : ""}` +
      `${collides ? "  ⚠HASH_COLLISION" : ""}  — ${fix.note}`
    );
    if (dupes.length) problems.push(`${fix.qnum}: duplicate option text remains`);

    if (!apply) { ok++; continue; }

    // options: text edits
    for (const o of finalOpts) {
      if (fix.options?.[o.label] !== undefined && fix.options[o.label] !== opts.find((p) => p.label === o.label)!.text) {
        const { error: e } = await db.from("options").update({ text: o.text }).eq("id", o.id);
        if (e) throw e;
      }
    }
    // key move
    await db.from("options").update({ is_correct: false }).eq("question_id", q.id).eq("is_correct", true);
    const { error: e2 } = await db.from("options").update({ is_correct: true }).eq("question_id", q.id).eq("label", fix.correct);
    if (e2) throw e2;
    // question fields
    const upd: Record<string, unknown> = { solution: fix.solution };
    if (stemChg) upd.text = finalText;
    if (!collides) upd.content_hash = newHash;
    const { error: e3 } = await db.from("questions").update(upd).eq("id", q.id);
    if (e3) throw e3;
    ok++;
  }

  console.log(`\n${apply ? "APPLIED" : "dry-run OK for"} ${ok}/${fixes.length} fixes`);
  if (problems.length) { console.log("PROBLEMS:"); problems.forEach((p) => console.log("  - " + p)); }
}

main().catch((e) => { console.error(e); process.exit(1); });
