/**
 * Pre-flight for building PRACTICE mocks out of rows that already exist in the
 * bank (the "bank-mirrored" case — see .claude/commands/lws-test-ingest.md).
 *
 * WHY THIS RUNS BEFORE THE BUILDER. A mock stores question REFS and renders the
 * content live through the RLS-bound cookie client at delivery. So a ref to a
 * PRIVATE row does not error — `loadMockQuestionViews` falls back to `text: ""`
 * and the student is shown a BLANK question, while `loadAnswerKey` finds no key
 * and `verdictFor` scores it skipped. Every failure mode of a bad ref is silent.
 * The existing PYQ builder never has to think about this because its fetch is
 * hard-filtered to `visibility='PUBLIC'`; a bank-mirrored paper takes its ids
 * from a dedup pass that deliberately saw EVERY visibility, so the check has to
 * be re-asserted here.
 *
 *   npx tsx scripts/mocks/preflight-practice.ts <dedupDir>
 *
 * Reads <dedupDir>/dedup_*.json ({n, verdict, bankId}) and reports, per paper:
 * how many questions resolve to a live, PUBLIC, gradeable row — and names every
 * one that does not. Read-only; writes nothing.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Verdict = { n: number; verdict: "DUP" | "MAYBE" | "NEW"; bankId: string | null };

type BankRow = {
  id: string;
  visibility: string;
  question_kind: string;
  question_format: string | null;
  text: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

/** `.in()` puts the filter in the URL, so chunk it — a few hundred uuids
 *  exceeds the request-line limit and PostgREST answers a bare Bad Request. */
const CHUNK = 200;

async function fetchRows(db: SupabaseClient, ids: string[]): Promise<Map<string, BankRow>> {
  const out = new Map<string, BankRow>();
  for (let i = 0; i < ids.length; i += CHUNK) {
    const { data, error } = await db
      .from("questions")
      .select("id, visibility, question_kind, question_format, text, options(label, text, is_correct)")
      .in("id", ids.slice(i, i + CHUNK));
    if (error) throw new Error(`fetchRows: ${error.message}`);
    for (const r of (data ?? []) as unknown as BankRow[]) out.set(r.id, r);
  }
  return out;
}

/** Every reason this row could not back a mock question. Empty = fine. */
function problems(r: BankRow | undefined, id: string): string[] {
  if (!r) return [`${id}: NOT FOUND in the bank`];
  const p: string[] = [];
  if (r.visibility !== "PUBLIC") p.push(`${id}: ${r.visibility} — would render BLANK to a student`);
  if (r.question_format === "numeric") return p; // no options by design
  const opts = r.options ?? [];
  const correct = opts.filter((o) => o.is_correct).length;
  if (opts.length !== 4) p.push(`${id}: ${opts.length} options (expected 4)`);
  if (correct !== 1) p.push(`${id}: ${correct} correct options (expected exactly 1)`);
  const blank = opts.filter((o) => !o.text || o.text.trim().length === 0).length;
  if (blank > 0) p.push(`${id}: ${blank} option(s) with empty text`);
  const texts = opts.map((o) => (o.text ?? "").trim());
  if (new Set(texts).size !== texts.length) p.push(`${id}: duplicate option text`);
  if (!r.text || r.text.trim().length === 0) p.push(`${id}: empty stem`);
  return p;
}

async function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error("usage: preflight-practice.ts <dedupDir>");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  const db = createClient(url, key, { auth: { persistSession: false } });

  const files = readdirSync(dir).filter((f) => /^dedup_.*\.json$/.test(f)).sort();
  const all: { paper: string; rows: Verdict[] }[] = files.map((f) => ({
    paper: basename(f).replace(/^dedup_|\.json$/g, ""),
    rows: JSON.parse(readFileSync(join(dir, f), "utf8")) as Verdict[],
  }));

  const ids = [...new Set(all.flatMap((p) => p.rows.map((r) => r.bankId).filter((x): x is string => !!x)))];
  const bank = await fetchRows(db, ids);
  console.log(`resolved ${bank.size}/${ids.length} distinct bank ids\n`);

  let blocking = 0;
  for (const { paper, rows } of all) {
    const dup = rows.filter((r) => r.verdict === "DUP");
    const maybe = rows.filter((r) => r.verdict === "MAYBE");
    const neu = rows.filter((r) => r.verdict === "NEW");
    const issues: string[] = [];
    for (const r of [...dup, ...maybe]) {
      if (!r.bankId) { issues.push(`n=${r.n}: ${r.verdict} with no bankId`); continue; }
      for (const p of problems(bank.get(r.bankId), r.bankId)) issues.push(`n=${r.n}: ${p}`);
    }
    // A mock is the real paper or it is nothing: the same row twice would make
    // two printed questions one question, silently shortening the paper.
    const seen = new Map<string, number[]>();
    for (const r of rows) if (r.bankId) seen.set(r.bankId, [...(seen.get(r.bankId) ?? []), r.n]);
    for (const [id, ns] of seen) if (ns.length > 1) issues.push(`bank row ${id} claimed by n=${ns.join(",")}`);

    blocking += issues.length;
    console.log(
      `${paper}: ${rows.length} q — DUP ${dup.length} · MAYBE ${maybe.length} · NEW ${neu.length}` +
        `  =>  ${issues.length === 0 ? "all mirrored rows OK" : `${issues.length} PROBLEM(S)`}`
    );
    for (const i of issues.slice(0, 25)) console.log(`   ! ${i}`);
    if (issues.length > 25) console.log(`   … and ${issues.length - 25} more`);
    if (neu.length) console.log(`   + to transcribe: n=${neu.map((r) => r.n).join(", ")}`);
    if (maybe.length) console.log(`   ? to adjudicate: n=${maybe.map((r) => r.n).join(", ")}`);
  }
  console.log(`\n${blocking === 0 ? "PREFLIGHT OK" : `PREFLIGHT: ${blocking} problem(s) to resolve`}`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
