/**
 * Show UPSC's raised-dot decimals as decimals in 24 questions (2026-10-04,
 * the owner's go after the SUGGESTIONS.md ledger row).
 *
 *   npx tsx scripts/reviews/apply-cdot-decimals-fix.ts            # dry run
 *   npx tsx scripts/reviews/apply-cdot-decimals-fix.ts --apply
 *
 * WHY. UPSC prints 1.5 as "1·5". In these 24 NDA/CDS questions the dot was
 * stored as LaTeX \cdot (and once as \(\cdot\) between digits), which KaTeX
 * renders as a spaced multiplication sign: "1 · 5" reads as 1 x 5. Worst
 * cases: sin^-1(1/9·8) read as 1/9 x 8, P(A) = 0·6 read as 0 x 6 = 0,
 * 1·5 <= x <= 4·5 read as 5 to 20.
 *
 * EVERY DOT WAS CHECKED to be a decimal before this was written: each row's
 * stored solution computes with the decimal value (0.6, 9.8, 1.5, 16.5,
 * 2.4 x 10^-5 ...), and none of the 76 marked occurrences is a product. The
 * other 14 bank rows matching digit\cdot digit are left alone: 8 genuine
 * products (2·3^x, 4·10^4, 1·3 + 2·3^2) and 6 hydrate dots (CaSO4·2H2O).
 * The ~140 rows that carry UPSC's dot as a plain typed "·" are also left: it
 * renders tight, as on the paper. Within these 24 rows a typed "·" between
 * digits is converted too, so each question reads one way.
 *
 * HASH: content_hash covers the stem, options and key letter. Where the
 * stored hash is reproducible from the live row it is recomputed; where it is
 * not (a pipeline that hashes its source text), it is left as it is, the
 * convention those pipelines use. Collisions refuse. Solutions are fixed too
 * (not hashed). The uuid is kept; no key changes, so no mock regrade.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const APPLY = process.argv.includes("--apply");
const RUN_LABEL = "cdot-decimal-fix-2026-10-04";

const IDS = [
  "017c88ba-7854-49b1-b03e-05e0705f5b48", "06e4e3a9-3901-4763-a461-e3e2a7ba5162", "11963628-732e-458a-a31b-d22d73770e2e",
  "1225123f-6ea0-4cdd-9a16-6b35b5bd715f", "19065b8b-9760-4faa-94ee-92af46c67366", "20b21533-8a4e-4214-a995-7c5fd90c70ed",
  "231635ab-b2bc-43a5-affc-a2419520c300", "284ff557-4f15-4d3b-acc5-a8038d581abe", "2c209a5a-5b0f-45b1-ab9f-7a6edcfe5b1f",
  "356de9fd-15b2-4807-b4d9-3cf8156095e2", "437a4ace-43c9-48bb-9c70-ac17c6d12a39", "439c4c2e-ff85-4fa0-8c8d-6648e63649d7",
  "48fd2332-42d2-4d6f-afb1-1ac1aba686db", "4dcdbe92-1a8c-4764-947e-4746c517c583", "61fa214c-6eb3-4e26-bb46-bb94bed6cd0d",
  "7ec3d1eb-1e5c-413a-968c-244de1da8aaf", "8820356f-1542-4d22-ab6c-73e5acfcaa87", "b1e3df7c-b8e0-4254-b540-0801b074c985",
  "c0aa2cc4-9520-455e-86dc-d288da7b3f6e", "cfe76a78-a005-40ff-8783-3fc2d994dd9b", "dfd0f189-dc08-43a6-9a76-a4c21461e276",
  "f7d1eaf3-d56c-49a7-87d6-020f96740472", "fb40d7d6-07cd-473e-b0d9-593e191f6931", "ff9c1d41-b06d-46f5-b04d-033d911b13a2",
];

/** Digit-dot-digit only: a \cdot next to a letter, a bracket or a fraction is
 *  a real product or notation ([\cdot], b_{xy}\cdot b_{yx}) and is left. */
export function fixDecimals(s: string): string {
  return s
    .replace(/(\d)\\\(\\cdot\\\)(\d)/g, "$1.$2")
    .replace(/(\d)\\cdot ?(\d)/g, "$1.$2")
    .replace(/(\d)·(\d)/g, "$1.$2");
}

type Opt = { id: string; label: string; text: string; is_correct: boolean };
type Row = { id: string; text: string; context: string | null; solution: string | null; content_hash: string; options: Opt[] };

const fail = (msg: string): never => {
  console.error("REFUSING: " + msg);
  process.exit(1);
};

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await db
    .from("questions")
    .select("id, text, context, solution, content_hash, options(id, label, text, is_correct)")
    .in("id", IDS);
  if (error) throw error;
  const rows = (data ?? []) as Row[];
  if (rows.length !== IDS.length) fail(`read ${rows.length} of ${IDS.length}`);

  const plan: { row: Row; text: string; context: string | null; solution: string | null; opts: Opt[]; hashAfter: string; rehash: boolean }[] = [];
  for (const row of rows) {
    const opts = [...row.options].sort((a, b) => a.label.localeCompare(b.label));
    const key = opts.filter((o) => o.is_correct).map((o) => o.label);
    if (key.length !== 1) fail(`${row.id} has ${key.length} keyed options`);
    const reproducible = contentHash(row.text, opts.map((o) => o.text), key[0]) === row.content_hash;

    const text = fixDecimals(row.text);
    const context = row.context === null ? null : fixDecimals(row.context);
    const solution = row.solution === null ? null : fixDecimals(row.solution);
    const newOpts = opts.map((o) => ({ ...o, text: fixDecimals(o.text) }));
    const changed = text !== row.text || newOpts.some((o, i) => o.text !== opts[i].text) || context !== row.context;
    if (!changed) fail(`${row.id} has no decimal to fix in stem/options/context`);

    const hashAfter = reproducible ? contentHash(text, newOpts.map((o) => o.text), key[0]) : row.content_hash;
    if (reproducible) {
      const { data: clash } = await db.from("questions").select("id").eq("content_hash", hashAfter).neq("id", row.id);
      if ((clash ?? []).length > 0) fail(`${row.id} new hash collides with ${(clash ?? []).map((c) => c.id).join(",")}`);
    }
    plan.push({ row, text, context, solution, opts: newOpts, hashAfter, rehash: reproducible });
    const n = (row.text + (row.context ?? "") + opts.map((o) => o.text).join("")).match(/(\d)(\\\(\\cdot\\\)|\\cdot ?|·)(\d)/g)?.length ?? 0;
    console.log(`${row.id.slice(0, 8)}  ${n} decimal(s)  hash ${reproducible ? "recomputed" : "kept (not reproducible)"}`);
  }

  if (!APPLY) {
    console.log(`\nDRY RUN: ${plan.length} rows. Re-run with --apply to write.`);
    return;
  }

  for (const p of plan) {
    for (let i = 0; i < p.opts.length; i++) {
      const o = p.opts[i];
      const before = p.row.options.find((x) => x.id === o.id)!;
      if (o.text === before.text) continue;
      const { error: oErr } = await db.from("options").update({ text: o.text }).eq("id", o.id);
      if (oErr) throw oErr;
    }
    const patch: Record<string, string | null> = { text: p.text, context: p.context, solution: p.solution, content_hash: p.hashAfter };
    const { error: qErr } = await db.from("questions").update(patch).eq("id", p.row.id);
    if (qErr) throw qErr;
  }

  const { error: rErr } = await db.from("question_reviews").upsert(
    plan.map((p) => ({
      question_id: p.row.id,
      reviewed_content_hash: p.hashAfter,
      method: "structural_probe",
      verdict: "stem_fixed",
      run_label: RUN_LABEL,
      derived_model: "claude-opus-5-5",
      source: "live",
      note: "UPSC raised-dot decimal stored as \\cdot (rendered as multiplication) shown as a decimal point; every dot checked against the row's own solution.",
    })),
    { onConflict: "question_id,run_label,reviewed_content_hash", ignoreDuplicates: true }
  );
  if (rErr) throw rErr;
  console.log(`\nwritten: ${plan.length} rows`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
