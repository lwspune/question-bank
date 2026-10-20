/**
 * Write a shift's Hindi reading onto its English rows (question_translations /
 * option_translations, lang 'hi', migrations 0118 + 0171).
 *
 *   npx tsx scripts/ssc-cgl/hi-commit.ts <shiftId>... [--apply]
 *
 * DRY RUN by default. Refuses a shift whose check (hi-check.ts) has an error.
 * The English row is never touched, so hash, key, stats and mocks are
 * unchanged. A question SSC repeated across shifts is one row: the first shift
 * given wins, and a row that ALREADY carries a Hindi reading that reads
 * differently is reported and left alone, never silently overwritten.
 * Idempotent: put_question_translation upserts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { checkMarathiPaper, planTranslations } from "../mh-ssc-10/marathi";
import { requireShift } from "./config";
import { parseHindiDraft } from "./hindi";
import { hindiPath, loadEnglishRows, type EnglishRow } from "./hi-rows";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const shifts = args.filter((a) => !a.startsWith("--")).map((id) => requireShift(id));
  if (!shifts.length) throw new Error("usage: tsx scripts/ssc-cgl/hi-commit.ts <shiftId>... [--apply]");
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const entries: Parameters<typeof planTranslations>[0] = [];
  const rowById = new Map<string, EnglishRow>();
  for (const shift of shifts) {
    const hindi = parseHindiDraft(readFileSync(hindiPath(shift.id), "utf8"));
    const rows = await loadEnglishRows(client, shift);
    const errors = checkMarathiPaper(rows.map((r) => r.paper), hindi, { requireSolution: false }).filter(
      (f) => f.level === "error"
    );
    if (errors.length) throw new Error(`${shift.id}: ${errors.length} check error(s); run hi-check.ts`);
    const byNumber = new Map(rows.map((r) => [String(r.number), r]));
    for (const q of hindi) {
      const row = byNumber.get(q.ref)!;
      rowById.set(row.questionId, row);
      entries.push({ paperId: shift.id, questionId: row.questionId, question: q });
    }
  }
  const { writes, conflicts } = planTranslations(entries);
  for (const c of conflicts) console.log(`CONFLICT Q${c.ref}: ${c.questionId} read differently in ${c.kept} and ${c.other}; kept ${c.kept}`);

  const ids = writes.map((w) => w.questionId);
  const existing = new Map<string, string>();
  for (let i = 0; i < ids.length; i += 200) {
    const { data, error } = await client
      .from("question_translations")
      .select("question_id, text")
      .eq("lang", "hi")
      .in("question_id", ids.slice(i, i + 200));
    if (error) throw new Error(`read existing: ${error.message}`);
    for (const t of data ?? []) existing.set(t.question_id, t.text);
  }

  let written = 0;
  let same = 0;
  let skipped = 0;
  for (const w of writes) {
    const prev = existing.get(w.questionId);
    if (prev !== undefined && squash(prev) !== squash(w.stem)) {
      console.log(`SKIP ${w.paperId} Q${w.ref}: ${w.questionId} already has a different Hindi stem`);
      skipped++;
      continue;
    }
    if (prev !== undefined) same++;
    if (!apply) continue;
    const row = rowById.get(w.questionId)!;
    const { error } = await client.rpc("put_question_translation", {
      p_question_id: w.questionId,
      p_lang: "hi",
      p_text: w.stem,
      p_context: w.context,
      p_solution: null,
      p_options: w.options.map((o) => ({ option_id: row.optionIds[o.label], text: o.text })),
    });
    if (error) throw new Error(`${w.paperId} Q${w.ref}: ${error.message}`);
    written++;
  }
  console.log(
    `${apply ? "WROTE" : "DRY RUN"}: ${writes.length} question(s) planned, ${same} already identical, ${skipped} skipped, ${written} written`
  );
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
