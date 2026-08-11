/**
 * Diff a blind re-derivation against the stored keys.
 *
 *   npx tsx scripts/reviews/diff-blind.ts
 *
 * Reads every scripts/reviews/data/blind/batch-*.json (each row carries `ref`,
 * `paper`, `derived_answer`, `confidence`, `working`) and compares the derived
 * letter to the live `options.is_correct` for that question.
 *
 * A DISAGREEMENT IS A WORK ITEM, NOT A VERDICT. This project's history is that
 * most apparent disagreements dissolve on inspection — equivalent forms,
 * interval conventions, "None of these" judgement calls — and that an agent's
 * confident "our answer is wrong" has twice been the BOOK being wrong instead.
 * So every row this prints must be adjudicated against the source by hand
 * before anything is flipped. See [[audit-probe-symmetry]].
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const BLIND = join(process.cwd(), "scripts", "reviews", "data", "blind");
const IN_CHUNK = 200;

type BlindRow = {
  paper: string;
  ref: string;
  derived_answer: string;
  confidence: string;
  working: string;
};

const PAPERS: Record<string, string> = {
  dc8435b7: "dc8435b7-5b7d-4183-934e-1e9555ff0c46",
  bbf7d08b: "bbf7d08b-33a9-4dfd-8ade-36cb9c0a5859",
};

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const rows: BlindRow[] = [];
  const files = readdirSync(BLIND).filter((f) => f.startsWith("batch-") && f.endsWith(".json"));
  for (const f of files) rows.push(...JSON.parse(readFileSync(join(BLIND, f), "utf8")));

  // live keys, per paper, keyed by question_number
  const keyByPaperRef = new Map<string, { id: string; key: string | null }>();
  for (const [short, paperId] of Object.entries(PAPERS)) {
    const { data: pq, error } = await db
      .from("paper_questions")
      .select("question_id")
      .eq("paper_id", paperId);
    if (error) throw error;
    const ids = (pq ?? []).map((p) => p.question_id as string);
    for (let i = 0; i < ids.length; i += IN_CHUNK) {
      const { data, error: qErr } = await db
        .from("questions")
        .select("id, question_number, options(label, is_correct)")
        .in("id", ids.slice(i, i + IN_CHUNK));
      if (qErr) throw qErr;
      for (const q of data ?? []) {
        const opts = (q.options ?? []) as { label: string; is_correct: boolean }[];
        keyByPaperRef.set(`${short}||${q.question_number}`, {
          id: q.id as string,
          key: opts.find((o) => o.is_correct)?.label ?? null,
        });
      }
    }
  }

  let agree = 0;
  let blank = 0;
  const disagree: (BlindRow & { key: string | null; id: string })[] = [];
  const missing: string[] = [];

  for (const r of rows) {
    const hit = keyByPaperRef.get(`${r.paper}||${r.ref}`);
    if (!hit) {
      missing.push(`${r.paper}/${r.ref}`);
      continue;
    }
    const derived = (r.derived_answer ?? "").trim().toUpperCase();
    if (!derived) {
      blank++;
      continue;
    }
    if (derived === hit.key) agree++;
    else disagree.push({ ...r, key: hit.key, id: hit.id });
  }

  console.log(`\nblind rows: ${rows.length} across ${files.length} batches`);
  console.log(`  agree      : ${agree}`);
  console.log(`  DISAGREE   : ${disagree.length}`);
  console.log(`  left blank : ${blank}`);
  if (missing.length) console.log(`  unresolved refs: ${missing.length} (${missing.slice(0, 5).join(", ")})`);

  if (disagree.length) {
    console.log(`\n=== DISAGREEMENTS — adjudicate each against the source, do NOT bulk-flip ===`);
    for (const d of disagree.sort((a, b) => a.confidence.localeCompare(b.confidence))) {
      console.log(`\n  ${d.paper}/Q${d.ref}   stored=${d.key}  derived=${d.derived_answer}  [${d.confidence}]`);
      console.log(`    id: ${d.id}`);
      console.log(`    ${(d.working ?? "").replace(/\s+/g, " ").slice(0, 400)}`);
    }
  }

  const byConf = new Map<string, number>();
  for (const r of rows) byConf.set(r.confidence || "(none)", (byConf.get(r.confidence || "(none)") ?? 0) + 1);
  console.log(`\nconfidence: ${[...byConf].map(([k, v]) => `${k}=${v}`).join("  ")}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
