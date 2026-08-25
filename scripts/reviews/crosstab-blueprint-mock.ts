/**
 * Crosstab a blind re-derivation pass against a paper's stored keys.
 *
 *   npx tsx scripts/reviews/crosstab-blueprint-mock.ts <paperId> <resultsDir>
 *
 * Sibling of crosstab-paper.ts, which carries a hardcoded registry of the three
 * papers reviewed in the 2026-08-16 run. This one takes the paper id and the
 * directory of blind results as arguments so it works for any paper.
 *
 * NOT A VERDICT — a WORK LIST. A letter disagreement is a HYPOTHESIS about a
 * wrong key, and on this bank the hypothesis is wrong more often than right:
 * the dominant defect is the TWIN, where the correct answer is printed twice
 * and the deriver simply named the other copy. Repairing the KEY there makes
 * the row worse. Every non-AGREE row is opened by hand before anything changes.
 *
 * Bucket semantics are copied from crosstab-paper.ts so the two cannot drift.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type Blind = {
  q: string;
  derived: string;
  value?: string;
  confidence?: string;
  why?: string;
  flag?: string;
};

/** Loose normaliser for TWIN detection: two option texts that differ only in
 *  LaTeX wrapping/spacing are the same printed answer. */
const norm = (s: string): string =>
  (s ?? "")
    .replace(/\\(dfrac|frac|left|right|text|mathrm|displaystyle)/g, "")
    .replace(/[\s{}()\\$,]/g, "")
    .toLowerCase();

async function main() {
  const paperId = process.argv[2];
  const dir = process.argv[3];
  if (!paperId || !dir) {
    console.error("usage: crosstab-blueprint-mock.ts <paperId> <resultsDir>");
    process.exit(2);
  }

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  const { data: rows, error } = await db
    .from("paper_questions")
    .select("position, questions!inner(id, question_number, options(label, text, is_correct))")
    .eq("paper_id", paperId);
  if (error) throw error;

  const byQ = new Map<string, { pos: number; key: string | null; opts: Record<string, string> }>();
  for (const r of rows as any[]) {
    const q = r.questions;
    const opts: Record<string, string> = {};
    let key: string | null = null;
    for (const o of q.options) {
      opts[o.label] = o.text ?? "";
      if (o.is_correct) key = o.label;
    }
    byQ.set(String(q.question_number), { pos: r.position, key, opts });
  }

  const derived = new Map<string, Blind>();
  for (const f of readdirSync(dir).filter((f) => /^result\d+\.json$/.test(f))) {
    for (const b of JSON.parse(readFileSync(join(dir, f), "utf8")) as Blind[]) {
      derived.set(String(b.q), b);
    }
  }

  const buckets = new Map<string, string[]>();
  const push = (b: string, line: string) =>
    buckets.set(b, [...(buckets.get(b) ?? []), line]);

  for (const [q, meta] of [...byQ.entries()].sort((a, b) => a[1].pos - b[1].pos)) {
    const d = derived.get(q);
    const line = (b: string) =>
      `  pos ${String(meta.pos).padStart(3)}  Q${q.padEnd(7)} key=${meta.key ?? "?"}  blind=${
        d?.derived ?? "-"
      }  ${(d?.value || d?.why || "").slice(0, 120)}${d?.flag ? `  [${d.flag}]` : ""}`;
    if (!d) {
      push("MISSING", line("MISSING"));
      continue;
    }
    const got = (d.derived ?? "").trim().toUpperCase();
    const flag = (d.flag ?? "").toUpperCase();
    if (got === "NONE" || flag.includes("NO_OPTION")) push("NONE", line("NONE"));
    else if (got === "AMBIGUOUS" || flag.includes("MULTIPLE")) push("MULTI", line("MULTI"));
    else if (got === meta.key)
      push(d.confidence === "low" ? "LOWCONF" : "AGREE", line("AGREE"));
    else {
      const twin = norm(meta.opts[got] ?? "@") === norm(meta.opts[meta.key ?? "@"] ?? "#");
      push(twin ? "FLIP?TWIN" : "FLIP?", line("FLIP?"));
    }
  }

  const order = ["FLIP?", "NONE", "MULTI", "FLIP?TWIN", "LOWCONF", "MISSING", "AGREE"];
  console.log("=".repeat(80));
  for (const b of order) console.log(`${b.padEnd(11)} ${String(buckets.get(b)?.length ?? 0).padStart(3)}`);
  console.log("=".repeat(80));
  for (const b of order) {
    if (b === "AGREE") continue;
    const rows = buckets.get(b) ?? [];
    if (!rows.length) continue;
    console.log(`\n--- ${b} (${rows.length}) ---`);
    rows.forEach((r) => console.log(r));
  }
  const total = [...buckets.values()].reduce((a, v) => a + v.length, 0);
  console.log(`\ntotal ${total} (paper has ${byQ.size})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
