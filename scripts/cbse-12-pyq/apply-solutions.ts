/**
 * Write authored solutions onto their committed rows.
 *
 *   npx tsx scripts/cbse-12-pyq/apply-solutions.ts 2023-65-1-1
 *   npx tsx scripts/cbse-12-pyq/apply-solutions.ts 2023-65-1-1 --apply
 *   npx tsx scripts/cbse-12-pyq/apply-solutions.ts --all --apply
 *
 * `solution` is NOT part of content_hash, so writing one updates the row in
 * place and can never orphan it or move its id. That is the whole reason this
 * step is safe to re-run.
 *
 * EVERY GUARD BELOW EXISTS BECAUSE THE FAILURE IT CATCHES HAS HAPPENED IN THIS
 * REPO, and each is a REFUSAL rather than a silent repair — repairing here would
 * leave the stored text disagreeing with the file that is supposed to be its
 * source of record:
 *
 *   • control characters — the signature of text authored through a shell
 *     heredoc, where one backslash is eaten and `\theta` arrives as TAB+"heta".
 *     It is invisible on inspection and survives every other check. TAB is
 *     included deliberately: it IS the corruption, not innocent whitespace.
 *   • double-escaped backslashes (`\\(`) — renders as a literal backslash on the
 *     page while satisfying any delimiter-balance check.
 *   • literal "\n" (backslash + n) — the DB must never carry one past a write
 *     boundary; the fix belongs in the source file.
 *   • unbalanced \( \) — ships raw LaTeX to the reader.
 *   • a hash that resolves to zero or several rows — a solution attached to the
 *     wrong question is undetectable afterwards.
 *
 * The pairing is checked per row rather than by counting: a dropped row that
 * shifts every later one is a PERMUTATION, so the count and the id SET both
 * still match while every solution lands on the wrong question.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { DATA, ORG_ID, EXAM_ID_CBSE_12 } from "./config";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";

type Row = { hash: string; ref: string; questionNumber: string; solution?: string };

function latexImbalance(s: string): string | null {
  let depth = 0;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] !== "\\") continue;
    if (s[i + 1] === "(") { if (++depth > 1) return "nested \\("; i++; }
    else if (s[i + 1] === ")") { if (--depth < 0) return "stray \\)"; i++; }
  }
  return depth === 0 ? null : "unclosed \\(";
}

function inspect(ref: string, text: string, bad: string[]) {
  // eslint-disable-next-line no-control-regex
  if (/[\x00-\x08\x09\x0b\x0c\x0e-\x1f]/.test(text)) {
    bad.push(`${ref}: control character (TAB or other) — the heredoc-corruption signature; fix the SOURCE`);
  }
  if (/\\\\[()[\]]/.test(text) || /\\\\(?:frac|sqrt|int|left|right|begin|end|text|tan|sin|cos|log)\b/.test(text)) {
    bad.push(`${ref}: double-escaped backslash — renders as a literal \\ on the page`);
  }
  if (normalizeNewlines(text) !== text) {
    bad.push(`${ref}: literal \\n — fix the SOURCE, the DB must not carry one`);
  }
  const im = latexImbalance(text);
  if (im) bad.push(`${ref}: ${im}`);
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const all = args.includes("--all");
  const one = args.find((a) => !a.startsWith("--"));
  if (!one && !all) throw new Error("usage: apply-solutions.ts <paperId>|--all [--apply]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const files = all
    ? readdirSync(DATA).filter((f) => f.endsWith(".topaper.json")).sort()
    : [`${one}.topaper.json`];

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const plan: { hash: string; ref: string; id: string; solution: string; file: string }[] = [];
  const bad: string[] = [];
  let blank = 0;

  for (const f of files) {
    const doc = JSON.parse(readFileSync(join(DATA, f), "utf8")) as { paperId: string; rows: Row[] };
    const rows = doc.rows.filter((r) => (r.solution ?? "").trim().length > 0);
    blank += doc.rows.length - rows.length;
    if (!rows.length) continue;

    for (const r of rows) inspect(`${doc.paperId}:${r.ref}`, r.solution!, bad);

    const hashes = rows.map((r) => r.hash);
    const byHash = new Map<string, string[]>();
    for (let i = 0; i < hashes.length; i += 100) {
      const { data, error } = await client.from("questions").select("id, content_hash")
        .eq("org_id", ORG_ID).eq("exam_id", EXAM_ID_CBSE_12).eq("question_kind", "pyq")
        .in("content_hash", hashes.slice(i, i + 100));
      if (error) throw new Error(error.message);
      for (const d of data!) {
        const k = d.content_hash as string;
        if (!byHash.has(k)) byHash.set(k, []);
        byHash.get(k)!.push(d.id as string);
      }
    }
    for (const r of rows) {
      const ids = byHash.get(r.hash) ?? [];
      if (ids.length !== 1) {
        bad.push(`${doc.paperId}:${r.ref}: hash resolves to ${ids.length} pyq rows — refusing`);
        continue;
      }
      plan.push({ hash: r.hash, ref: r.ref, id: ids[0], solution: r.solution!, file: doc.paperId });
    }
  }

  console.log(`${files.length} file(s) | ${plan.length} solution(s) ready | ${blank} row(s) still blank`);
  if (bad.length) {
    console.log(`\n${bad.length} problem(s) — nothing is repaired here, fix the source file:`);
    for (const b of bad) console.log(`  ${b}`);
  }
  if (!apply) { console.log(`\n[dry run] pass --apply to write.`); return; }
  if (bad.length) throw new Error("refusing to write — resolve the problems above first.");

  let n = 0;
  for (const p of plan) {
    const { error } = await client.from("questions").update({ solution: p.solution }).eq("id", p.id);
    if (error) throw new Error(`${p.ref}: ${error.message}`);
    n++;
  }
  console.log(`\ndone. ${n} solution(s) written.`);
}

main().catch((e) => { console.error(e.message ?? e); process.exit(1); });
