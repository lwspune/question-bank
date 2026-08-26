/**
 * Build an adjudication packet for the near-duplicates `dedup-scan.ts` reported.
 *
 * A STEM-only hit is the dangerous class: the stem matches a bank row but the options do
 * not, so `content_hash` will NOT dedup it and it lands as a second copy of a question the
 * bank already has. Whether that is right depends on WHY the options differ — a reworded
 * distractor is a duplicate, a genuinely different option set is a different question, and
 * only reading both settles it.
 *
 *   npx tsx scripts/practice-paper/dedup-packet.ts <dedupTxt> <outJson> <recordsDir>
 *
 * Tooling for the manual ingest core, NOT a committed data artifact.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const [dedupTxt, outJson, recDir] = process.argv.slice(2);
  if (!outJson) throw new Error("usage: dedup-packet.ts <dedupTxt> <outJson> <recordsDir>");

  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  // Parse the STEM-only hits out of the scan report.
  const lines = readFileSync(dedupTxt, "utf-8").split("\n");
  let cur = "";
  const hits: { tag: string; n: number; src: string; bn: string }[] = [];
  for (const L of lines) {
    const m = L.match(/^(lws\d)\.records\.json:/);
    if (m) {
      cur = m[1];
      continue;
    }
    const s = L.match(/^\s+STEM\s+Q(\d+)\s+<-\s+(\S+)\s+Q(\S+)/);
    if (s && cur) hits.push({ tag: cur, n: Number(s[1]), src: s[2], bn: s[3] });
  }

  const recs = new Map<string, any[]>();
  const out: any[] = [];
  for (const h of hits) {
    if (!recs.has(h.tag))
      recs.set(h.tag, JSON.parse(readFileSync(join(recDir, `${h.tag}.records.json`), "utf-8")));
    const mine = recs.get(h.tag)!.find((r: any) => r.n === h.n);
    if (!mine) continue;

    const { data: rows } = await db
      .from("questions")
      .select("id, text, source_file, question_number, solution, options(label, text, is_correct)")
      .eq("source_file", h.src)
      .eq("question_number", h.bn)
      .limit(1);
    const bank = rows?.[0] as any;
    if (!bank) continue;

    out.push({
      pair: `${h.tag}-Q${h.n}`,
      ours: {
        paper: h.tag,
        n: h.n,
        stem: mine.stem,
        options: { A: mine.optA, B: mine.optB, C: mine.optC, D: mine.optD },
        answer: mine.answer,
      },
      bank: {
        source: bank.source_file,
        n: bank.question_number,
        stem: bank.text,
        options: Object.fromEntries(
          (bank.options ?? []).map((o: any) => [o.label, o.text + (o.is_correct ? "  <== keyed" : "")]),
        ),
      },
    });
  }

  writeFileSync(outJson, JSON.stringify(out, null, 1), "utf-8");
  console.log(`wrote ${out.length} near-duplicate pairs -> ${outJson}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
