/**
 * The numbering skeleton of one shift, for the agent reading its HINDI print.
 *
 *   npx tsx scripts/ssc-cgl/hi-skeleton.ts <shiftId> [first] [last]
 *
 * One block per question: number, whether the English row has a passage, the
 * English row's MATHS (so both prints write a formula alike) and its
 * language-neutral options (numbers, money, formulas: copy them as given).
 * Deliberately NO English wording: the reader reads the Hindi print, and a
 * reader holding the English drifts into translating it (hindi.ts).
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { requireShift } from "./config";
import { isLanguageNeutral, mathZones } from "./hindi";
import { loadEnglishRows } from "./hi-rows";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const shift = requireShift(process.argv[2]);
  const first = Number(process.argv[3] ?? 1);
  const last = Number(process.argv[4] ?? 75);
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const rows = (await loadEnglishRows(client, shift)).filter((r) => r.number >= first && r.number <= last);
  console.log(`# ${shift.id} · Hindi print · Q${first}-${last} · ${rows.length} questions`);
  for (const r of rows) {
    const p = r.paper;
    const lines = [`Q ${r.number}`];
    if (p.context?.trim()) lines.push("  passage: yes (write a context: line)");
    const zones = mathZones(p.stem);
    if (zones.length) lines.push(`  stem maths: ${zones.join("  ")}`);
    for (const o of p.options ?? []) if (isLanguageNeutral(o.text)) lines.push(`  ${o.label} as given: ${o.text}`);
    console.log(lines.join("\n"));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
