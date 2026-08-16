/**
 * DUP LETTER-ORDER GUARD for an /lws-test-ingest run.
 *
 * A `status:"dup"` record inherits its matched bank row's classification and
 * solution. The trap: an answer is stored BY LETTER, and a twin question very
 * often lists the same four options in a DIFFERENT order. Inheriting the twin's
 * letter — or trusting that the printed paper's letter agrees with it — then
 * silently mis-keys the row, and nothing downstream can see it.
 *
 * So this compares, per duplicate pair, the TEXT the bank's correct option
 * carries against the TEXT the printed paper's own key points at. It reports;
 * it never edits.
 *
 *   npx tsx scripts/practice-paper/check-dup-keys.ts <extractJson> <dupMapJson>
 *
 *   <extractJson>  [{ n, optA..optD, printedKey }, ...]   the new paper
 *   <dupMapJson>   { "<n>": "<bank id prefix>", ... }     the dedup result
 *
 * Tooling for the manual ingest core, NOT a committed data artifact.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const [extractPath, dupPath] = process.argv.slice(2);
if (!extractPath || !dupPath) {
  throw new Error("usage: check-dup-keys.ts <extractJson> <dupMapJson>");
}

/** Loose comparison: option wording drifts between papers ("Temperate
 *  coniferous" vs "Temperate coniferous forest"), so compare on a normalised
 *  alphanumeric core and accept a containment either way. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\\\(|\\\)|\\text|\\underline|[{}]/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function agrees(a: string, b: string): boolean {
  const x = norm(a);
  const y = norm(b);
  if (!x || !y) return false;
  return x === y || x.includes(y) || y.includes(x);
}

type Rec = { n: number; optA: string; optB: string; optC: string; optD: string; printedKey: string };

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const recs: Rec[] = JSON.parse(readFileSync(extractPath, "utf8"));
  const byN = new Map(recs.map((r) => [r.n, r]));
  const dupMap: Record<string, string> = JSON.parse(readFileSync(dupPath, "utf8"));

  const { data, error } = await db
    .from("questions")
    .select("id, options(text, is_correct)")
    .in(
      "id",
      // resolved full ids are required; fetch by prefix via a text filter is
      // unavailable on a uuid column, so the caller passes full ids where known.
      Object.values(dupMap).filter((v) => v.length === 36),
    );
  if (error) throw new Error(error.message);

  const rows = new Map(
    ((data ?? []) as { id: string; options: { text: string; is_correct: boolean }[] }[]).map((r) => [
      r.id,
      r.options.find((o) => o.is_correct)?.text ?? "",
    ]),
  );

  let agree = 0;
  const mismatches: string[] = [];
  for (const [nStr, id] of Object.entries(dupMap)) {
    const n = Number(nStr);
    const rec = byN.get(n);
    const bankText = rows.get(id);
    if (!rec || bankText === undefined) {
      mismatches.push(`Q${n}: unresolved (id ${id})`);
      continue;
    }
    const printedText = rec[("opt" + rec.printedKey) as "optA"];
    if (agrees(printedText, bankText)) {
      agree += 1;
    } else {
      mismatches.push(
        `Q${n}: printed key ${rec.printedKey} = "${printedText.slice(0, 60)}"` +
          ` BUT bank correct option = "${bankText.slice(0, 60)}"`,
      );
    }
  }

  console.log(`agree: ${agree} / ${Object.keys(dupMap).length}`);
  if (mismatches.length) {
    console.log("\nNEEDS A HUMAN CALL (letter order or a genuine key disagreement):");
    for (const m of mismatches) console.log("  " + m);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
