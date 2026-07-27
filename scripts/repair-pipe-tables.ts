/**
 * One-off repair for the 7 PUBLIC rows that `npm run audit:text` flagged as
 * TABLE_NO_SEPARATOR — pipe-delimited content with no `|---|` separator row, so
 * GFM (correctly) refuses to build a table and the student sees raw pipes.
 *
 *   npx tsx scripts/repair-pipe-tables.ts            # dry run
 *   npx tsx scripts/repair-pipe-tables.ts --apply
 *
 * The flag is one class; the REMEDY differs by row, which is why this wasn't
 * swept automatically:
 *
 * - ADD_SEPARATOR (1 row) — MHT-CET Q81 is a genuine 2-column data table with a
 *   real header row (`| Solid | E gap |`) and four data rows. It just lost its
 *   separator. Insert one; it becomes a native table on web and in Word.
 *
 * - LINEARISE (6 rows) — the Pariksha rows are label→text statement lists
 *   (`| Statement I: | The flower is epigynous |`) with NO header row: the first
 *   pipe line is already content. Adding a separator would promote the first
 *   statement into a table HEADER, styling it as a heading and the rest as body
 *   — semantically wrong and worse than the status quo. These are prose lists,
 *   so strip the pipes and let each label sit inline, matching the NDA Maths
 *   Statistics house style (240 of its 241 rows linearise rather than tabulate).
 *
 * Both edits change `text`, so `content_hash` is recomputed with the real helper
 * and collision-checked within (org_id, exam_id) before writing.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { contentHash, subjectiveContentHash, numericContentHash } from "../src/lib/upload/hash";

const APPLY = process.argv.includes("--apply");

const ADD_SEPARATOR: { source: string; qnum: string }[] = [
  { source: "MHT_CET_12thMay2024_Shift1.xlsx", qnum: "81" },
];
const LINEARISE: { source: string; qnum: string }[] = [
  "28", "29", "32", "33", "35", "40",
].map((qnum) => ({ source: "PARIKSHA_VV_13171.pdf", qnum }));

type Row = {
  id: string;
  org_id: string;
  exam_id: string;
  source_file: string;
  question_number: string;
  question_format: string | null;
  text: string;
  context: string | null;
  content_hash: string;
  options: { label: string; text: string; is_correct: boolean }[];
};

/** Insert a `|---|` row after the first pipe line (the header). */
function addSeparator(text: string): string {
  const lines = text.split("\n");
  const i = lines.findIndex((l) => l.trim().startsWith("|"));
  if (i === -1) return text;
  const cols = lines[i].trim().replace(/^\||\|$/g, "").split("|").length;
  if (lines[i + 1]?.trim().startsWith("|---")) return text; // already fixed
  const sep = "|" + Array(cols).fill("---").join("|") + "|";
  return [...lines.slice(0, i + 1), sep, ...lines.slice(i + 1)].join("\n");
}

/** `| Label: | Body |` → `Label: Body`, leaving non-pipe lines untouched. */
function linearise(text: string): string {
  return text
    .split("\n")
    .map((line) => {
      const t = line.trim();
      if (!t.startsWith("|") || !t.endsWith("|")) return line;
      const cells = t.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()).filter(Boolean);
      return cells.join(" ");
    })
    .join("\n");
}

function hashFor(r: Row, text: string): string {
  if (r.question_format === "subjective") return subjectiveContentHash(text, r.context);
  if (r.question_format === "numeric") return numericContentHash(text, r.context);
  const answer = r.options.find((o) => o.is_correct)?.label ?? "";
  return contentHash(text, r.options.map((o) => o.text), answer);
}

async function main() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  console.log(`${APPLY ? "APPLY" : "[dry-run]"} pipe-table repair\n`);
  const targets = [
    ...ADD_SEPARATOR.map((t) => ({ ...t, mode: "ADD_SEPARATOR" as const })),
    ...LINEARISE.map((t) => ({ ...t, mode: "LINEARISE" as const })),
  ];

  let changed = 0;
  for (const t of targets) {
    const { data, error } = await client
      .from("questions")
      .select(
        "id, org_id, exam_id, source_file, question_number, question_format, text, context, content_hash, options(label, text, is_correct)"
      )
      .eq("source_file", t.source)
      .eq("question_number", t.qnum);
    if (error) throw new Error(`read failed: ${error.message}`);
    const rows = (data ?? []) as unknown as Row[];
    if (rows.length !== 1) {
      console.log(`  ! ${t.source} ${t.qnum}: expected 1 row, got ${rows.length} — SKIPPED`);
      continue;
    }
    const r = rows[0];
    const next = t.mode === "ADD_SEPARATOR" ? addSeparator(r.text) : linearise(r.text);
    if (next === r.text) {
      console.log(`  = ${t.source} ${t.qnum}: already clean`);
      continue;
    }

    const nextHash = hashFor(r, next);
    if (nextHash !== r.content_hash) {
      const { data: clash, error: cErr } = await client
        .from("questions")
        .select("id, question_number")
        .eq("org_id", r.org_id)
        .eq("exam_id", r.exam_id)
        .eq("content_hash", nextHash)
        .neq("id", r.id);
      if (cErr) throw new Error(`collision check failed: ${cErr.message}`);
      if (clash && clash.length > 0) {
        console.log(`  ! ${t.source} ${t.qnum}: COLLISION with ${clash[0].question_number} — SKIPPED`);
        continue;
      }
    }

    changed++;
    console.log(`\n  [${t.mode}] ${t.source} ${t.qnum}`);
    console.log("   BEFORE: " + JSON.stringify(r.text.slice(0, 190)));
    console.log("   AFTER : " + JSON.stringify(next.slice(0, 190)));
    if (APPLY) {
      const { error: uErr } = await client
        .from("questions")
        .update({ text: next, content_hash: nextHash })
        .eq("id", r.id);
      if (uErr) throw new Error(`update ${r.id} failed: ${uErr.message}`);
    }
  }

  console.log(`\n${APPLY ? "applied" : "would repair"}: ${changed} row(s).`);
  if (!APPLY) console.log("pass --apply to write.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
