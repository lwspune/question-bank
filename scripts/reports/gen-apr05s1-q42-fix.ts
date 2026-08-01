/**
 * Rebuild JEE 2026 Apr05 S1 Q42, whose OPTION BLOCK is a grid table in the source.
 *
 *   npx tsx scripts/reports/gen-apr05s1-q42-fix.ts
 *     -> scripts/grounding/data/apr05s1-q42-2026-08-01.textfix.json
 *
 * Distinct from the shredded-header class: here the source's table is not part
 * of the stem at all, it IS the four options (each row gives reagent D and
 * product E). The extractor pushed the table's HEADER into the stem — leaving a
 * dangling `|  | D | E |` with no body rows and a trailing bare `|` — and left
 * raw `+---+` grid fragments inside each option's text.
 *
 * Source (5th april 2026 shift-1.docx):
 *   (a) Conc. H2SO4              | CH2=CH-CH(OH)/CH3
 *   (b) PCC                      | HO-CH2-CH2-CH=CH2
 *   (c) PCC                      | CH2=CH-CH=CH2
 *   (d) Conc. H2SO4 or H3PO4     | CH2=CH-CH=CH2
 *
 * The `/` printed in option (a) is an OCR slip for `-`: every sibling option
 * uses `-`, and the stored solution describes (a) as "an unsaturated alcohol",
 * i.e. CH2=CH-CH(OH)-CH3. Key (D) is unchanged and independently re-derived —
 * dehydration of pentan-1-ol needs a protic acid (so PCC is out), and excess
 * acid on butane-1,3-diol gives buta-1,3-diene.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const ID = "188221a0-014f-4787-b4f1-b2e10e22e0ab";
const OUT = join(process.cwd(), "scripts", "grounding", "data", "apr05s1-q42-2026-08-01.textfix.json");

const OPTIONS = [
  { label: "A", text: String.raw`Conc. \(H_{2}SO_{4}\); \(CH_{2}=CH-CH(OH)-CH_{3}\)` },
  { label: "B", text: String.raw`PCC; \(HO-CH_{2}-CH_{2}-CH=CH_{2}\)` },
  { label: "C", text: String.raw`PCC; \(CH_{2}=CH-CH=CH_{2}\)` },
  { label: "D", text: String.raw`Conc. \(H_{2}SO_{4}\) or \(H_{3}PO_{4}\); \(CH_{2}=CH-CH=CH_{2}\)` },
];

async function main() {
  loadEnv();
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { data, error } = await client.from("questions").select("id, text").eq("id", ID).maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("row not found");

  // Drop every table-ish line plus the trailing bare pipe; the table belonged to
  // the options, never to the stem.
  const kept = (data.text as string)
    .split("\n")
    .filter((l) => !/^\s*\|/.test(l))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd();

  if (kept === data.text) throw new Error("stem unchanged - expected the dangling table to be removed");
  if (kept.includes("|")) throw new Error("stem still contains a pipe after cleanup");

  writeFileSync(
    OUT,
    JSON.stringify([{ id: ID, text: kept, options: OPTIONS, note: "option block rebuilt from source grid table; dangling header table removed from stem" }], null, 2) + "\n",
    "utf8"
  );
  console.log(`wrote -> ${OUT}\n`);
  console.log("stem now ends:\n  ..." + kept.slice(-140));
  console.log("\noptions:");
  for (const o of OPTIONS) console.log(`  (${o.label}) ${o.text}`);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
