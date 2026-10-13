/**
 * Corrections found by the OFFICIAL-COPY cross-check (2026-10-13,
 * OFFICIAL_CROSSCHECK_BRIEF.md, findings in data/<id>.official.json): the March
 * 2024-2026 papers were transcribed from scans, and the board's own born-digital
 * copies showed four places where a shipped row is wrong. Owner approved
 * 2026-10-13. The ledger row is in SUGGESTIONS.md.
 *
 *   npx tsx scripts/mh-ssc-10/apply-official-fixes.ts            # dry run
 *   npx tsx scripts/mh-ssc-10/apply-official-fixes.ts --apply
 *
 * Writes BOTH places, the transcription JSON (every data/<id>.*.json holding the
 * ref, so a re-merge or re-commit cannot bring the old text back) and the bank
 * row, in place: the row keeps its id. Only one fix touches a fingerprinted
 * field (an option's text); after it, run
 *   npx tsx scripts/mh-ssc-10/refresh-hash.ts geog-2024 "Q1(1)" --apply
 * which recomputes content_hash with the lane's own builder.
 * Idempotent: a field already holding the new value is skipped.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { DATA, EXAM_ID, requirePaper } from "./config";

const APPLY = process.argv.includes("--apply");

type Fix = {
  paper: string;
  ref: string;
  why: string;
  solution?: string;
  figureNote?: string;
  /** Option text by label (fingerprinted: refresh the hash after). */
  options?: Record<string, { from: string; to: string }>;
};

const FIXES: Fix[] = [
  {
    paper: "sci2-2025",
    ref: "Q3(vii)",
    why: "The printed grid gives (3) and (4) seven boxes each; the stored RECREATION and MEDITATION have ten letters and do not fit.",
    solution:
      "(1) ADDICTION (across, printed in the grid): the continuous, uncontrolled consumption of alcohol and tobacco materials.\n\n" +
      "(2) FACEBOOK (down, 8 letters, its 3rd letter is the C of ADDICTION): a social-media app whose misuse can lead to cyber crimes.\n\n" +
      "(3) SINGING (down, 7 letters, its 6th letter is the N of ADDICTION): singing and listening to music keep us happy and drive away stress.\n\n" +
      "(4) MINDSET (down, 7 letters, its 4th letter is the second D of ADDICTION): a positive mindset is needed for a stress-free life; music, hobbies and time in nature help to create it.",
  },
  {
    paper: "geog-2024",
    ref: "Q1(1)",
    why: "The option is printed 'huge anacondas'; the scan was misread as 'hugo'. The key (C) is unchanged.",
    options: { C: { from: "hugo anacondas", to: "huge anacondas" } },
    solution:
      "**(C)** huge anacondas\n\nThe Pantanal, in south-western Brazil, is the world's largest tropical wetland. Its marshes and seasonally flooded grasslands are the home of the huge anaconda, the world's heaviest snake. The condor belongs to the Andes, the pink river dolphin to the Amazon river channels and macaws to the Amazon rainforest canopy, so none of these is the Pantanal's own animal.",
  },
  {
    paper: "geog-2024",
    ref: "Q6(B)(3)",
    why: "On the official graph Brazil's primary band ends exactly on the 10 per cent line, not 15; the paper's own Q6(B)(6) ('19% population of Brazil', 29 - 10) agrees.",
    solution:
      "About 10 per cent of the population of Brazil is engaged in the primary sector. In the fourth bar of the graph the blank (primary) portion rises from 0 to 10 per cent, and the dotted secondary portion runs from 10 to about 29 per cent above it.",
    figureNote:
      "Four 100-per-cent bar graphs, p-06. Brazil, population engaged: primary 0 to 10 per cent, secondary 10 to about 29 per cent, tertiary above.",
  },
  {
    paper: "geog-2024",
    ref: "Q6(B)(6)",
    why: "The working gave Brazil's secondary band as 15 to 34 per cent; the official graph shows 10 to 29 per cent. The answer (secondary) is unchanged.",
    solution:
      "The secondary sector. About 19 per cent of the population of Brazil is engaged in it: in the fourth bar of the graph the dotted (secondary) portion runs from 10 per cent up to about 29 per cent, a band of roughly 19 per cent.",
    figureNote:
      "Four 100-per-cent bar graphs, p-06. Brazil, population engaged: primary 0 to 10 per cent, secondary 10 to about 29 per cent (19 per cent), tertiary above.",
  },
  {
    paper: "hist-2026",
    ref: "Q8(B)(2)",
    why: "The stored places (Adilabad, Chandrapur, Ranchi) are not the textbook's. The prescribed book pairs Kolam with Chota Nagpur, Gond with Orissa, Ramoshi with Maharashtra and Munda with Bihar.",
    solution:
      "Tribal uprisings during the pre-independence period and their places:\n\n" +
      "| Uprising | Place |\n|---|---|\n| Ramoshi | Maharashtra |\n| Gond | Orissa |\n| Kolam | Chota Nagpur |\n| Munda | Bihar |\n\n" +
      "In the pre-independence period the British government deprived tribal people of their right to a livelihood from forest resources, and these uprisings were their response.",
  },
];

/** Every data/<paper>.*.json array that holds the ref (fragments and the merged file). */
function sourceFiles(paper: string): string[] {
  return readdirSync(DATA).filter(
    (f) => f.startsWith(`${paper}.`) && f.endsWith(".json") && !/(official|crosscheck|blind|anchors|fig)\.json$/.test(f),
  );
}

function patchJson(fix: Fix): string[] {
  const touched: string[] = [];
  for (const f of sourceFiles(fix.paper)) {
    const path = join(DATA, f);
    const raw = JSON.parse(readFileSync(path, "utf8"));
    const list = Array.isArray(raw) ? raw : raw.questions;
    if (!Array.isArray(list)) continue;
    const q = list.find((x: { ref?: string }) => x.ref === fix.ref);
    if (!q) continue;
    let changed = false;
    if (fix.solution !== undefined && q.solution !== fix.solution) (q.solution = fix.solution), (changed = true);
    if (fix.figureNote !== undefined && q.figureNote !== fix.figureNote) (q.figureNote = fix.figureNote), (changed = true);
    for (const [label, { from, to }] of Object.entries(fix.options ?? {})) {
      const o = (q.options ?? []).find((x: { label: string }) => x.label === label);
      if (!o) throw new Error(`${fix.paper} ${fix.ref}: no option ${label} in ${f}`);
      if (o.text === from) (o.text = to), (changed = true);
      else if (o.text !== to) throw new Error(`${fix.paper} ${fix.ref} option ${label} in ${f} reads "${o.text}", expected "${from}"`);
    }
    if (changed) {
      touched.push(f);
      if (APPLY) writeFileSync(path, JSON.stringify(raw, null, 2) + "\n", "utf8");
    }
  }
  return touched;
}

async function main() {
  const envLocal = join(process.cwd(), ".env.local");
  if (existsSync(envLocal)) require("dotenv").config({ path: envLocal, override: true });
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  for (const fix of FIXES) {
    const paper = requirePaper(fix.paper);
    const files = patchJson(fix);
    if (!files.length && !fix.solution && !fix.options) throw new Error(`${fix.paper} ${fix.ref}: not found in any source file`);

    const { data, error } = await db
      .from("questions")
      .select("id, solution, options(id, label, text)")
      .eq("exam_id", EXAM_ID)
      .eq("source_file", paper.sourceFile)
      .eq("question_number", fix.ref);
    if (error) throw new Error(error.message);
    if (data?.length !== 1) throw new Error(`${fix.paper} ${fix.ref}: ${data?.length ?? 0} bank rows, expected 1`);
    const row = data[0] as unknown as { id: string; solution: string | null; options: { id: string; label: string; text: string }[] };

    const plan: string[] = [];
    if (fix.solution !== undefined && row.solution !== normalizeNewlines(fix.solution)) plan.push("solution");
    const optionEdits = Object.entries(fix.options ?? {}).flatMap(([label, { from, to }]) => {
      const o = row.options.find((x) => x.label === label);
      if (!o) throw new Error(`${fix.paper} ${fix.ref}: bank row has no option ${label}`);
      if (o.text === to) return [];
      if (o.text !== from) throw new Error(`${fix.paper} ${fix.ref}: bank option ${label} reads "${o.text}", expected "${from}"`);
      return [{ id: o.id, to }];
    });
    if (optionEdits.length) plan.push(`option ${Object.keys(fix.options!).join(",")}`);

    console.log(`${fix.paper} ${fix.ref}: json ${files.length ? files.join(", ") : "already current"}; bank ${plan.length ? plan.join(" + ") : "already current"}`);
    console.log(`  why: ${fix.why}`);
    if (!APPLY || !plan.length) continue;

    if (plan.includes("solution")) {
      const { error: e } = await db.from("questions").update({ solution: normalizeNewlines(fix.solution!) }).eq("id", row.id);
      if (e) throw new Error(`${fix.paper} ${fix.ref} solution: ${e.message}`);
    }
    for (const o of optionEdits) {
      const { error: e } = await db.from("options").update({ text: o.to }).eq("id", o.id);
      if (e) throw new Error(`${fix.paper} ${fix.ref} option: ${e.message}`);
    }
  }
  console.log(APPLY ? "\napplied. Now refresh the one changed fingerprint (see header)." : "\n[dry-run] pass --apply to write.");
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
