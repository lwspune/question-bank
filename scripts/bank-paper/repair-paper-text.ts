/**
 * Apply the paper-text repairs the audit (./paper-text.ts) surfaced.
 *
 *   npx tsx scripts/bank-paper/repair-paper-text.ts          # dry run
 *   npx tsx scripts/bank-paper/repair-paper-text.ts --apply
 *
 * THREE KINDS OF EDIT, all to the STEM:
 *   - P2  five match-lists rebuilt as GFM pipe-tables (the separator row is what
 *         makes one; without it `parseTableBlocks` refuses and the pipes print raw)
 *   - P5  eight prose figure descriptions removed, where the figure is attached
 *   - P4  Q28 gains its real four-panel diagram and loses the prose that
 *         described (and gave away) it
 *
 * WHY IN-PLACE, NOT DELETE-AND-RE-COMMIT. `content_hash` covers the stem, so any
 * of these moves a row's identity. The ingestion pipelines handle that by
 * deleting the source's rows and re-committing — but these rows are ALREADY
 * committed and referenced by two papers, and a re-commit mints fresh uuids,
 * which would leave `paper_questions` pointing at rows that no longer exist. A
 * dangling paper ref renders a BLANK question with no error and marks every
 * attempt wrong. So the stem is updated in place and the hash re-stamped with
 * the real `contentHash` helper — the same move `scripts/cds/fix-keys.ts` makes
 * for a key flip.
 *
 * GUARDS, each of which has a failure it is protecting against:
 *   - the row's CURRENT stored hash must recompute from its own stored fields,
 *     so we never "repair" a row whose identity is already inconsistent
 *   - the NEW hash must not collide with another row in the same (org, exam),
 *     which is a real unique index and would fail the write mid-batch
 *   - every edit must actually change the text, and match its expected shape;
 *     a no-op "repair" that reports success is worse than an error
 *   - the repaired stem is re-audited through the REAL rule module, so a fix
 *     cannot silently leave the violation in place
 */
import { join } from "node:path";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import { contentHash } from "../../src/lib/upload/hash";
import { normalizeNewlines } from "../../src/lib/text/normalizeNewlines";
import { auditPaperText, type PaperTextRow } from "./paper-text";
import { recordReviews } from "../../src/lib/reviews/service";

const RUN_LABEL = "bank-paper:paper-text-repair-2026-08-23";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
const apply = process.argv.includes("--apply");

const FIG_PATH =
  "C:/Users/vilas/AppData/Local/Temp/claude/c--Users-vilas-Downloads-Question-Bank/ff20f15a-789c-436b-b451-e48b9330a4fa/scratchpad/q28_fig.png";
const Q28 = "05db2f2c-14da-4b33-b4ed-cb5f543d2a68";

/** Rows whose prose figure description is removed. The figure is attached and
 *  was checked against the text before agreeing to this — Q8's four graphs and
 *  Q26's directions were opened and matched their parentheticals exactly. */
const STRIP_PROSE = [
  "6608d5f0-b36e-4abb-b648-59d6413a19c0", // Q43 circuit
  "07ba8fe1-80ac-49fe-b52e-c88eb9407e98", // Q69 six resistances
  "0fc0d37f-9e8b-400f-bdba-49fced75f560", // Q1  starch leaf
  "015b88ef-2fe0-471f-8903-d933562da704", // Q4  broken mirror
  "14501d5e-c401-4718-9beb-2117ff36a1d7", // Q3  positron
  "051583a6-df6e-4a39-9dc0-7e5dd1f51276", // Q26 alpha particle
  "02b60740-9da7-4a05-b2b9-44558289117c", // Q8  four T-vs-t graphs
  "0720f741-4761-4e51-bbaf-6af604c349c4", // Q54 eye defect
];

/** Full replacement stems for the five match-lists. */
const TABLES: Record<string, string> = {
  // Ancient India Q138 — had pipes, no separator row.
  "75f3f5ec-acee-474c-91e9-ef5b78da05be":
    "Match List-I with List-II and select the correct answer using the code given below the Lists :\n\n" +
    "| List-I (Mahamatta) | List-II (Function) |\n|---|---|\n" +
    "| A. Anta-mahamatta | 1. Women's welfare |\n" +
    "| B. Ithijhakha-mahamatta | 2. Spread of Dhamma |\n" +
    "| C. Dhamma-mahamatta | 3. Associated with city administration |\n" +
    "| D. Nagalaviyohalaka-mahamatta | 4. In-charge of frontier areas |\n\nCode:",
  // Constitution Q112 — space-aligned columns. The trailing "A B C D" line is
  // KEPT and load-bearing: this row's options are bare number sequences
  // ("4  1  3  2"), so that header is what maps them onto A-D.
  "05a3b2f0-1457-4d72-afff-0ebf5fbfdf7e":
    "Match List I with List II and select the correct answer using the code given below the Lists :\n\n" +
    "| List I (Amendment to the Constitution of India) | List II (Subject) |\n|---|---|\n" +
    "| A. 52nd Amendment Act, 1985 | 1. Reduction of voting age from 21 to 18 |\n" +
    "| B. 73rd Amendment Act, 1992 | 2. Right to Education |\n" +
    "| C. 61st Amendment Act, 1988 | 3. Panchayati Raj |\n" +
    "| D. 86th Amendment Act, 2006 | 4. Disqualification on grounds of defection |\n\n" +
    "Code (the four numbers correspond to A, B, C, D in that order) :",
  // Railway zones Q59 — had pipes, no separator row.
  "49d8fa99-19c2-4fd5-bcca-6ea8c5eda57f":
    "Match List-I with List-II and select the correct answer using the code given below the Lists :\n\n" +
    "| List-I (Railway Zone) | List-II (Headquarters) |\n|---|---|\n" +
    "| A. East Central | 1. Gorakhpur |\n" +
    "| B. North Eastern | 2. Jaipur |\n" +
    "| C. Northeast Frontier | 3. Hajipur |\n" +
    "| D. North Western | 4. Maligaon |\n\nCode:",
  // Ports Q101 — two separate lists, no pipes at all. Pairing is POSITIONAL
  // (A with 1, B with 2 ...), which is how the source prints them.
  "4a8de603-a03b-439f-850f-3c02d8fa84a8":
    "Match List-I with List-II and select the correct answer using the code given below the Lists :\n\n" +
    "| List-I (Major Port) | List-II (Location) |\n|---|---|\n" +
    "| A. Kolkata | 1. Landlocked area |\n" +
    "| B. Mormugao | 2. In the delta region |\n" +
    "| C. Visakhapatnam | 3. On the riverside |\n" +
    "| D. Paradip | 4. On the entrance of the estuary |",
  // River basins Q96 — same shape as Q101.
  "7695c15c-ba6a-4dcc-91b4-b6856a7015e4":
    "Match List-I with List-II and select the correct answer using the code given below the Lists :\n\n" +
    "| List-I (River Basin) | List-II (Town) |\n|---|---|\n" +
    "| A. Bhagirathi | 1. Lansdowne |\n" +
    "| B. Alaknanda | 2. Narendra Nagar |\n" +
    "| C. Nayar | 3. Uttarkashi |\n" +
    "| D. Ganga | 4. Pauri |",
};

const Q28_STEM =
  "Which of the following diagrams gives a correct picture of the refraction of parallel rays " +
  "of light through a convex (converging) lens?";

/** Remove a trailing "(The figure ...)" / "(In the figure ...)" paragraph. */
function stripFigureProse(stem: string): string {
  return stem
    .replace(/\n{1,2}\((?:The|In the)\s+figures?\b[^)]*\)\s*/gis, "\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

type Row = {
  id: string; text: string; content_hash: string; question_number: string | null;
  image_url: string | null;
  options: { label: string; text: string; is_correct: boolean }[];
  chapters: { name: string } | null;
};

async function main() {
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const ids = [...new Set([Q28, ...STRIP_PROSE, ...Object.keys(TABLES)])];

  const { data, error } = await db
    .from("questions")
    .select("id, text, content_hash, question_number, image_url, org_id, exam_id, chapters(name), options(label, text, is_correct)")
    .in("id", ids);
  if (error) throw new Error(error.message);
  const rows = (data ?? []) as unknown as (Row & { org_id: string; exam_id: string })[];
  if (rows.length !== ids.length) throw new Error(`expected ${ids.length} rows, got ${rows.length}`);

  const problems: string[] = [];
  const plan: { row: typeof rows[number]; next: string; newHash: string; kind: string }[] = [];

  for (const r of rows) {
    const before = r.text;
    let next = before;
    let kind = "";
    if (r.id === Q28) { next = Q28_STEM; kind = "figure+trim"; }
    else if (TABLES[r.id]) { next = TABLES[r.id]; kind = "matchlist->table"; }
    else { next = stripFigureProse(before); kind = "strip-figure-prose"; }

    next = normalizeNewlines(next);
    if (next === before) { problems.push(`${r.id} (${kind}): edit is a no-op`); continue; }
    if (!next.trim()) { problems.push(`${r.id}: stem would be empty`); continue; }

    // The row's identity must be consistent BEFORE we touch it.
    const opts = r.options.slice().sort((a, b) => a.label.localeCompare(b.label));
    const answer = opts.find((o) => o.is_correct)?.label ?? "";
    const recomputed = contentHash(before, opts.map((o) => o.text), answer);
    if (recomputed !== r.content_hash) {
      problems.push(`${r.id}: stored content_hash does not recompute — refusing to touch it`);
      continue;
    }
    const newHash = contentHash(next, opts.map((o) => o.text), answer);
    plan.push({ row: r, next, newHash, kind });
  }

  // A new hash must not collide with an existing row in the same (org, exam).
  for (const p of plan) {
    const { data: clash } = await db
      .from("questions").select("id")
      .eq("org_id", (p.row as any).org_id).eq("exam_id", (p.row as any).exam_id)
      .eq("content_hash", p.newHash).neq("id", p.row.id).limit(1);
    if (clash?.length) problems.push(`${p.row.id}: new hash collides with ${clash[0].id}`);
  }

  // Re-audit the repaired text through the REAL rules.
  const after = auditPaperText(plan.map((p): PaperTextRow => ({
    id: p.row.id,
    where: `${p.row.chapters?.name ?? "?"} Q${p.row.question_number ?? "?"}`,
    stem: p.next,
    context: null,
    solution: null,
    optionsText: p.row.options.map((o) => o.text).join(" || "),
    hasImage: p.row.id === Q28 ? true : !!p.row.image_url,
  })));
  for (const v of after.filter((v) => v.blocking)) {
    problems.push(`${v.id}: STILL violates ${v.rule} after repair — ${v.detail}`);
  }

  for (const p of plan) {
    console.log(`${p.kind.padEnd(20)} ${p.row.chapters?.name ?? "?"} Q${p.row.question_number}`);
    console.log(`   -${p.row.text.length - p.next.length} chars   hash ${p.row.content_hash.slice(0, 8)} -> ${p.newHash.slice(0, 8)}`);
  }
  console.log(`\n${plan.length} row(s) planned, ${problems.length} problem(s)`);
  for (const x of problems) console.log(`  FAIL ${x}`);
  if (problems.length) { console.log("\nnothing written."); process.exit(1); }
  if (!apply) { console.log("\n[dry-run] pass --apply to write."); return; }

  // Q28's figure first: if the upload fails we must not ship a trimmed stem
  // whose descriptions are gone AND whose diagram never arrived.
  const q28 = plan.find((p) => p.row.id === Q28)!;
  const bytes = readFileSync(FIG_PATH);
  const objectPath = `${(q28.row as any).org_id}/q28-convex-lens-${Date.now()}.png`;
  const up = await db.storage.from("question-images").upload(objectPath, bytes, { contentType: "image/png" });
  if (up.error) throw new Error(`figure upload: ${up.error.message}`);
  const setImg = await db.from("questions").update({ image_url: objectPath }).eq("id", Q28);
  if (setImg.error) throw new Error(`image_url: ${setImg.error.message}`);
  console.log(`figure attached: ${objectPath}`);

  for (const p of plan) {
    const { error: uErr } = await db
      .from("questions")
      .update({ text: p.next, content_hash: p.newHash })
      .eq("id", p.row.id);
    if (uErr) throw new Error(`${p.row.id}: ${uErr.message}`);
  }
  console.log(`${plan.length} stem(s) updated with hashes re-stamped.`);

  // Moving the hash makes every EXISTING review of these rows queryably stale —
  // which is exactly what `reviewed_content_hash` is for, and correct: the row
  // is not the one that was reviewed. But the edit was presentational (the
  // options and the answer are untouched), so record what happened rather than
  // leaving the rows looking unreviewed. `stem_fixed` is the verdict that says
  // "the stem was repaired", stamped with the hash AFTER this script's own edit.
  const res = await recordReviews(
    db,
    plan.map((p) => ({
      questionId: p.row.id,
      reviewedContentHash: p.newHash,
      method: "structural_probe",
      verdict: "stem_fixed",
      runLabel: RUN_LABEL,
      note:
        `Paper-text repair (${p.kind}): ` +
        (p.kind === "matchlist->table"
          ? "List-I/List-II prose rebuilt as a GFM pipe-table; without a |---| separator row parseTableBlocks refuses and the pipes print raw on web and in Word."
          : p.kind === "figure+trim"
            ? "the real four-panel diagram was attached from the source worksheet and the prose descriptions of it removed — those descriptions gave the answer away."
            : "a prose re-description of the attached figure was removed; the image was opened and checked against the text first.") +
        " Options and answer are UNCHANGED, so any earlier key verdict still holds on the merits.",
    }))
  );
  console.log(`reviews: attempted ${res.attempted} · accepted ${res.accepted} · written ${res.written}`);
  for (const r of res.rejected) console.log(`   REJECTED ${JSON.stringify(r)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
