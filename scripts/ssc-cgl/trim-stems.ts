/**
 * Cut the question sentence out of shipped SSC CGL stem pictures (stemTrim.ts says why and how).
 *
 *   npx tsx scripts/ssc-cgl/trim-stems.ts               # dry run: candidates, report and every DB check, no writes
 *   npx tsx scripts/ssc-cgl/trim-stems.ts --apply       # upload, update the live rows, rewrite figures/
 *   ... --only=t1-2023-07-21-s1                         # one shift (repeatable as a comma list)
 *
 * Dry run writes generated-papers/ssc-stem-trim/<shift>/qNNN.png (before + after) and report.json:
 * LOOK at them before applying; a picture that must stay whole, or that loses a chart title, goes in
 * stem-trim-keep.json (stemTrimImage.ts says how).
 *
 * --apply, per live row: the content_hash rows.ts computes from the CURRENT picture must equal the
 * live hash (else the row has moved on since its commit, and is reported and left alone); the new
 * hash, computed the same way from the trimmed picture, must be free in the exam. Then the trimmed
 * picture is uploaded and image_url + content_hash set, the row keeping its id. Every stem file
 * is rewritten, a repeat's copy too (its live row is the twin's), so a re-commit hashes alike.
 * Old and new paths are logged to stem-trim-log.json, the way back; a file in that log is never
 * trimmed again (a second pass would cut a chart title that now sits at the top).
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { uploadImage } from "../../src/lib/storage/images";
import { FIGURES, ORG_ID, SHIFTS, requireExamId, tierOf } from "./config";
import { figureRow, rowHash } from "./liveFigures";
import { keepKey, loadKeep, trimStemPng } from "./stemTrimImage";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const REVIEW = join(process.cwd(), "generated-papers", "ssc-stem-trim");
const LOG = join(__dirname, "stem-trim-log.json");
const STEM = /^q(\d{3})\.png$/i;

type LogEntry = {
  id: string | null;
  shift: string;
  n: number;
  oldImage?: string;
  newImage?: string;
  oldHash?: string;
  newHash?: string;
  /** a repeat (its live row is the twin's) or a row already done: only the file was rewritten */
  fileOnly?: true;
  at: string;
};
type Candidate = { shift: string; n: number; file: string; png: Buffer; box: object };

async function main() {
  const apply = process.argv.includes("--apply");
  const only = (process.argv.find((a) => a.startsWith("--only="))?.split("=")[1] ?? "").split(",").filter(Boolean);
  const keep = loadKeep();
  // A trimmed picture can be trimmed AGAIN (a chart title now at its top reads as a sentence), so
  // every file this script has rewritten is in the log and never read a second time.
  const log: LogEntry[] = existsSync(LOG) ? JSON.parse(readFileSync(LOG, "utf8")) : [];
  const done = new Set(log.map((e) => keepKey(e.shift, e.n)));
  const shifts = readdirSync(FIGURES).filter((s) => SHIFTS[s] && (!only.length || only.includes(s))).sort();

  const cands: Candidate[] = [];
  const report: object[] = [];
  for (const shift of shifts) {
    for (const f of readdirSync(join(FIGURES, shift)).sort()) {
      const m = STEM.exec(f);
      if (!m) continue;
      const n = Number(m[1]);
      const decision = keep[keepKey(shift, n)];
      if (typeof decision === "string" || done.has(keepKey(shift, n))) continue;
      const file = join(FIGURES, shift, f);
      const before = readFileSync(file);
      const t = await trimStemPng(before, decision ?? {});
      if (!t) continue;
      mkdirSync(join(REVIEW, shift), { recursive: true });
      writeFileSync(join(REVIEW, shift, f.replace(".png", ".before.png")), before);
      writeFileSync(join(REVIEW, shift, f), t.png);
      cands.push({ shift, n, file, png: t.png, box: t.box });
      report.push({ shift, n, ...t.box });
    }
  }
  mkdirSync(REVIEW, { recursive: true });
  writeFileSync(join(REVIEW, "report.json"), JSON.stringify(report, null, 1));
  console.log(`${cands.length} stem picture(s) to trim across ${shifts.length} shift(s); review in ${REVIEW}`);

  // The dry run makes every check below too (reads only), so it says what --apply would do.
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  let updated = 0, filesOnly = 0;
  const verb = apply ? "" : "would be ";
  const skipped: string[] = [];
  for (const c of cands) {
    const shift = SHIFTS[c.shift];
    const examId = requireExamId(tierOf(c.shift));
    const { data: q, error } = await db
      .from("questions")
      .select("id, image_url, content_hash")
      .eq("exam_id", examId)
      .eq("source_file", shift.sourceFile)
      .eq("question_number", String(c.n))
      .maybeSingle();
    if (error) throw new Error(`${c.shift} Q${c.n}: ${error.message}`);
    const row = figureRow(c.shift, c.n);
    const oldHash = row?.figures.stem ? rowHash(row) : null;
    const newHash = row?.figures.stem ? rowHash(row, new Map([[row.figures.stem, c.png]])) : null;
    if (q && q.content_hash !== newHash) {
      if (!q.image_url) { skipped.push(`${c.shift} Q${c.n}: live row has no image_url`); continue; }
      if (!oldHash || !newHash) { skipped.push(`${c.shift} Q${c.n}: rows.json has no figure row for it`); continue; }
      if (q.content_hash !== oldHash) { skipped.push(`${c.shift} Q${c.n}: live content_hash is not the one its current picture gives`); continue; }
      const { data: twin } = await db.from("questions").select("id").eq("exam_id", examId).eq("content_hash", newHash).neq("id", q.id).limit(1);
      if (twin?.length) { skipped.push(`${c.shift} Q${c.n}: the new hash is already held by ${twin[0].id}`); continue; }
      updated++;
      if (!apply) continue;
      const path = await uploadImage(db, ORG_ID, c.png, "image/png");
      const { error: e, count } = await db
        .from("questions")
        .update({ image_url: path, content_hash: newHash }, { count: "exact" })
        .eq("id", q.id)
        .eq("content_hash", q.content_hash);
      if (e || count !== 1) throw new Error(`${c.shift} Q${c.n}: update failed (${e?.message ?? `${count} rows`})`);
      log.push({ id: q.id, shift: c.shift, n: c.n, oldImage: q.image_url, newImage: path, oldHash: q.content_hash, newHash, at: new Date().toISOString() });
    } else {
      filesOnly++;
      if (!apply) continue;
      log.push({ id: q?.id ?? null, shift: c.shift, n: c.n, fileOnly: true, at: new Date().toISOString() });
    }
    writeFileSync(c.file, c.png);
    writeFileSync(LOG, JSON.stringify(log, null, 1));
  }
  console.log(`${updated} live row(s) ${verb}updated, ${filesOnly} file(s) ${verb}rewritten without a row change (a repeat, or already done).`);
  if (skipped.length) console.log(`left alone (${skipped.length}):\n  ${skipped.join("\n  ")}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
