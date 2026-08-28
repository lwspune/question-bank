/**
 * Render check for alg-quadratic-equations-10 — pushes every math zone of every
 * long-form field through the SAME extractor and KaTeX the website uses, plus
 * control-char / U+FFFD / double-escape / literal-newline / balance probes.
 *
 *   npx tsx scripts/mh-ssc-10-text/data/alg-quadratic-equations-10.rendercheck.ts        # source files
 *   npx tsx scripts/mh-ssc-10-text/data/alg-quadratic-equations-10.rendercheck.ts --db   # the LIVE rows
 *
 * The literal-newline test uses the project's OWN normalizeNewlines (math zones
 * masked) rather than a hand-rolled regex — a bare /backslash-n/ scan fires on
 * every \neq and \nu, which is a probe artefact, not a finding.
 *
 * Read-only scratch probe, not part of the pipeline.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import katex from "katex";
import { createClient } from "@supabase/supabase-js";
import { parseLatex } from "../../../src/components/math/parseLatex";
import { normalizeNewlines } from "../../../src/lib/text/normalizeNewlines";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const DATA = __dirname;
const ID = "alg-quadratic-equations-10";
const EXAM_ID = "a41ef5c6-fa20-4bc1-be8b-ba4263d5afd2";
const SOURCE_FILE = "StateBoard_10_Algebra__Quadratic_Equations.pdf";

// Built from code points so no literal control byte ever enters this source.
const CONTROL_CODES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const CONTROL_CHARS = CONTROL_CODES.map((n) => String.fromCharCode(n));
const REPLACEMENT_CHAR = String.fromCharCode(0xfffd);
const BACKSLASH = String.fromCharCode(92);

type Field = { where: string; value: string };

function sourceFields(): Field[] {
  const out: Field[] = [];
  const qs = JSON.parse(readFileSync(join(DATA, `${ID}.questions.json`), "utf8")) as any[];
  for (const q of qs) {
    for (const k of ["stem", "context", "solution", "note"] as const) {
      if (typeof q[k] === "string") out.push({ where: `${q.ref}.${k}`, value: q[k] });
    }
    for (const o of q.options ?? []) out.push({ where: `${q.ref}.opt${o.label}`, value: o.text });
  }
  for (const f of [`${ID}.a.solutions.json`, `${ID}.b.solutions.json`]) {
    for (const r of JSON.parse(readFileSync(join(DATA, f), "utf8")) as any[]) {
      out.push({ where: `${r.ref}.solution(pending)`, value: r.solution });
    }
  }
  for (const r of JSON.parse(readFileSync(join(DATA, `${ID}.mcq-verify.json`), "utf8")) as any[]) {
    out.push({ where: `${r.ref}.mcqsolution(pending)`, value: r.solution });
  }
  return out;
}

async function dbFields(): Promise<Field[]> {
  const c = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await c
    .from("questions")
    .select("question_number, text, context, solution, options(label, text)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", SOURCE_FILE);
  if (error) throw error;
  console.log(`DB rows: ${(data ?? []).length}`);
  const out: Field[] = [];
  for (const q of (data ?? []) as any[]) {
    for (const k of ["text", "context", "solution"] as const) {
      if (typeof q[k] === "string") out.push({ where: `${q.question_number}.${k}`, value: q[k] });
    }
    for (const o of q.options ?? []) out.push({ where: `${q.question_number}.opt${o.label}`, value: o.text });
  }
  return out;
}

async function main() {
  const all = process.argv.includes("--db") ? await dbFields() : sourceFields();
  let zones = 0;
  const katexFails: string[] = [];
  const other: string[] = [];

  for (const f of all) {
    if (CONTROL_CHARS.some((ch) => f.value.includes(ch))) other.push(`CONTROL-CHAR  ${f.where}`);
    if (f.value.includes(REPLACEMENT_CHAR)) other.push(`U+FFFD        ${f.where}`);
    if (f.value.includes(BACKSLASH + BACKSLASH + "(")) other.push(`DOUBLE-ESCAPE ${f.where}`);
    if (normalizeNewlines(f.value) !== f.value) other.push(`LITERAL-NEWLINE ${f.where}`);
    const opens = (f.value.match(/\\\(/g) ?? []).length;
    const closes = (f.value.match(/\\\)/g) ?? []).length;
    if (opens !== closes) other.push(`IMBALANCE ${opens}/${closes}  ${f.where}`);

    for (const seg of parseLatex(f.value)) {
      if (seg.type === "text") continue;
      zones++;
      try {
        katex.renderToString(seg.content, { throwOnError: true, displayMode: seg.type === "block" });
      } catch (e: any) {
        katexFails.push(`${f.where}: ${String(e.message).slice(0, 140)}  ||  ${seg.content.slice(0, 90)}`);
      }
    }
  }

  console.log(`fields checked : ${all.length}`);
  console.log(`math zones     : ${zones}`);
  console.log(`KaTeX failures : ${katexFails.length}`);
  for (const k of katexFails) console.log("   " + k);
  console.log(`other flags    : ${other.length}`);
  for (const o of other) console.log("   " + o);
}

main().catch((e) => { console.error(e); process.exit(1); });
