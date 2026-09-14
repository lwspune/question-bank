/**
 * Is any question of this paper ALREADY in the bank?
 *
 *   npx tsx scripts/nda-gat/dedup-check.ts 2026-2
 *
 * RUN THIS BEFORE THE DERIVATION, not after. A question already in the bank is
 * two things at once:
 *
 *   (a) a silent `content_hash` skip at commit, which shortens the paper and
 *       makes /mock's hard count of 150 fail with an error that names neither
 *       the question nor the cause; and
 *   (b) a free answer — the existing row already carries one, so deriving it
 *       blind is wasted effort and a disagreement with it is a finding.
 *
 * ## Scope: the NDA exam only, and that is not an oversight
 *
 * `content_hash` is unique per `(org_id, exam_id, content_hash)` since migration
 * 0038. UPSC is known to reuse English items between NDA and CDS — and that is
 * exactly why the key is per-exam: the CDS copy and the NDA copy BOTH belong in
 * the bank. So a CDS match is not a collision and is not reported here. Only an
 * NDA-internal repeat, or an earlier commit of this same paper, can dedup.
 *
 * ## It reports two things and only ONE of them is trustworthy
 *
 * **EXACT normalised-stem match is decisive.** It over-approximates
 * `content_hash` (which also folds options and the answer), so it cannot MISS a
 * collision — anything it does not flag cannot dedup.
 *
 * **Fuzzy similarity is a reading list, and a weak one.** On the sibling NDA
 * Mathematics paper four successive fixes each improved it and none made it
 * decisive, because those stems are short and templated. GAT prose is a friendlier
 * corpus for it, but the templating problem is if anything WORSE here: a hundred
 * questions share the scaffold "Consider the following statements … Which of the
 * statements given above is/are correct?", so two questions about entirely
 * different subjects score high on shape alone. Read it as "similar SHAPE",
 * never "probable duplicate", and do NOT tighten the threshold to make the list
 * look clean.
 *
 * A POSITIVE CONTROL runs first. A probe that reports "0 matches" without having
 * proved it reached the data is indistinguishable from a broken query, and this
 * repo has shipped that exact false green before.
 */
import { config as loadEnv } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, dataPath, requirePaper } from "./config";
import { normalizeQuestions, type GatTQ } from "./lib";

loadEnv({ path: ".env.local", override: true });

/** Mirrors the spirit of contentHash's normalisation: case- and space-insensitive. */
const norm = (s: string) =>
  (s ?? "")
    .toLowerCase()
    .replace(/\\\(|\\\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

function trigrams(s: string): Set<string> {
  const out = new Set<string>();
  for (let i = 0; i + 3 <= s.length; i++) out.add(s.slice(i, i + 3));
  return out;
}
function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const g of a) if (b.has(g)) inter += 1;
  const uni = a.size + b.size - inter;
  return uni ? inter / uni : 0;
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  const qPath = dataPath(paper.id, "questions");
  if (!existsSync(qPath)) throw new Error(`missing ${qPath} — run merge.ts first`);
  const questions = normalizeQuestions(JSON.parse(readFileSync(qPath, "utf8"))) as GatTQ[];

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // Paged: a bare .select() is capped at 1000 rows by PostgREST, and this repo
  // has been bitten by that silently five times.
  const bank: { id: string; text: string; source_file: string | null; question_number: string | null }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb
      .from("questions")
      .select("id,text,source_file,question_number")
      .eq("exam_id", EXAM_ID)
      .neq("source_file", paper.sourceFile) // an earlier commit of THIS paper is reported separately
      .range(from, from + 999);
    if (error) throw error;
    bank.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  console.log(`scanned ${bank.length} existing NDA rows (all subjects, all kinds)`);

  // POSITIVE CONTROL — prove the query reached real data before trusting a zero.
  const control = bank.filter((r) => /consider the following statements/i.test(r.text ?? "")).length;
  console.log(`  positive control: ${control} row(s) contain "Consider the following statements"`);
  if (!bank.length || !control) {
    console.log(`\nCONTROL FAILED — the scan found no recognisable NDA content. Do not trust a clean result.`);
    process.exit(1);
  }

  const bankNorm = bank.map((r) => ({ ...r, n: norm(r.text ?? "") }));
  const byExact = new Map<string, typeof bankNorm>();
  for (const r of bankNorm) {
    if (!byExact.has(r.n)) byExact.set(r.n, []);
    byExact.get(r.n)!.push(r);
  }

  // PHASE 1 — stem-only candidates. Over-approximates, so it cannot MISS one.
  const candidates: { q: GatTQ; rows: typeof bankNorm }[] = [];
  for (const q of questions) {
    const hits = byExact.get(norm(q.stem)) ?? [];
    if (hits.length) candidates.push({ q, rows: hits });
  }
  const candidateRowIds = [...new Set(candidates.flatMap((c) => c.rows.map((r) => r.id)))];
  console.log(
    `\nstem-only candidates: ${candidates.length} question(s) against ${candidateRowIds.length} existing row(s)`
  );

  // PHASE 2 — the DECISIVE test. `content_hash` is sha256(stem + SORTED OPTIONS
  // + answer), so a shared stem alone proves nothing: this paper legitimately
  // carries five "Which is the correct sentence ?" items whose whole content is
  // in their options, and the previous sitting carries five more. Only a stem
  // AND option-set match can actually collide.
  //
  // The answer is deliberately left out of the comparison — it does not exist
  // yet (this runs BEFORE the derivation, by design). A stem+options match with
  // a different answer would not dedup, but it would be two near-identical rows
  // disagreeing about the answer, which is a worse problem and still wants
  // reporting.
  const opts = new Map<string, string[]>();
  for (let i = 0; i < candidateRowIds.length; i += 200) {
    // Chunked: `.in()` puts the list in the URL, and this repo has seen a bare
    // `Bad Request` at 833 ids. Paging a RESULT and chunking a FILTER are
    // different limits, and only one of them is 1000.
    const chunk = candidateRowIds.slice(i, i + 200);
    const { data, error } = await sb.from("options").select("question_id,text").in("question_id", chunk);
    if (error) throw error;
    for (const o of data ?? []) {
      if (!opts.has(o.question_id)) opts.set(o.question_id, []);
      opts.get(o.question_id)!.push(norm(o.text ?? ""));
    }
  }
  const optKey = (xs: string[]) => [...xs].sort().join("");

  const collisions: string[] = [];
  const stemOnly: string[] = [];
  for (const c of candidates) {
    const mine = optKey(c.q.options.map((o) => norm(o.text)));
    for (const r of c.rows) {
      const theirs = optKey(opts.get(r.id) ?? []);
      const where = `${r.source_file ?? "?"} Q${r.question_number ?? "?"}`;
      if (mine === theirs) collisions.push(`Q${c.q.number} == ${where} (row ${r.id})`);
      else stemOnly.push(`Q${c.q.number} ~ ${where} — same stem, DIFFERENT options`);
    }
  }

  console.log(`\nTRUE COLLISIONS (stem AND option set): ${collisions.length} — DECISIVE`);
  for (const e of collisions) console.log(`  ${e}`);
  if (!collisions.length) {
    console.log(`  none. Nothing in this paper can dedup against an existing NDA row.`);
  }
  if (stemOnly.length) {
    console.log(`\nshared stem, different options: ${stemOnly.length} — NOT a collision`);
    console.log(
      `  Expected on this paper: the "Which is the correct sentence ?" block carries its whole`
    );
    console.log(`  content in its options, so every such item shares one stem by construction.`);
    for (const e of stemOnly.slice(0, 8)) console.log(`  ${e}`);
    if (stemOnly.length > 8) console.log(`  … and ${stemOnly.length - 8} more`);
  }
  const exact = collisions;

  // The weak half. Capped and clearly labelled.
  const bankTri = bankNorm.map((r) => ({ ...r, t: trigrams(r.n) }));
  const fuzzy: { q: number; score: number; row: string }[] = [];
  for (const q of questions) {
    const t = trigrams(norm(q.stem));
    let best = { s: 0, row: "" };
    for (const r of bankTri) {
      const s = jaccard(t, r.t);
      if (s > best.s) best = { s, row: `${r.source_file ?? "?"} Q${r.question_number ?? "?"}` };
    }
    if (best.s >= 0.75) fuzzy.push({ q: q.number, score: best.s, row: best.row });
  }
  fuzzy.sort((a, b) => b.score - a.score);
  console.log(`\nFUZZY shape-similarity >= 0.75: ${fuzzy.length} — A READING LIST, NOT A VERDICT`);
  console.log(
    `  These stems SHARE A SHAPE with an existing row. On a paper where a hundred questions`
  );
  console.log(
    `  use one scaffold, that is expected and mostly meaningless. Do not act on it without reading.`
  );
  for (const f of fuzzy.slice(0, 15)) {
    console.log(`  Q${String(f.q).padEnd(4)} ${f.score.toFixed(3)}  ~ ${f.row}`);
  }
  if (fuzzy.length > 15) console.log(`  … and ${fuzzy.length - 15} more`);

  if (exact.length) {
    console.log(
      `\nACT ON THE EXACT LIST. Each of those will be silently skipped at commit, leaving the ` +
        `paper short and the /mock build failing on its hard count of 150.`
    );
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
