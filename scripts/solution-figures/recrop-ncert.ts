/**
 * Backfill: re-crop shipped figures taken off NCERT pages before the watermark
 * was removed (SUGGESTIONS.md backfill ledger, approved 2026-10-19).
 *
 *   npx tsx scripts/solution-figures/recrop-ncert.ts            # measure every image, write the report, change nothing
 *   npx tsx scripts/solution-figures/recrop-ncert.ts --apply    # replace the ones the watermark crossed
 *   ... --only="<label part>" [--reviewed] [--keep-old]          # just the labels containing it; --reviewed also
 *       replaces a MISMATCH (someone has looked at new/ against live/); --keep-old leaves the old files in storage
 *
 * Three records name a figure's page and box, and are read here as they are:
 *   - scripts/ncert/data/<chapter>.*fig.json       stem figures (questions.image_url)
 *   - scripts/ncert/data/<chapter>.solution-images.json with page + bbox   (solution_image_url)
 *   - scripts/cbse-12-pyq/data/draw-figures.json   NCERT Biology book figures under board answers
 *     (marking-scheme crops are CBSE's own pages and carry no NCERT watermark: skipped)
 *
 * For each live image: re-crop it the OLD way (watermark kept) and compare with
 * the live file, then the NEW way and compare with the old. recrop.ts decides:
 * a record that no longer reproduces the live image is reported and left alone;
 * an image the watermark never crossed is left alone, and so is one an earlier run
 * already replaced ("done"); the rest are replaced
 * (new object, row repointed, old object deleted once nothing points at it).
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage, deleteImage } from "../../src/lib/storage/images";
import { contentHash, subjectiveContentHash } from "../../src/lib/upload/hash";
import { CHAPTERS, SOURCE_ROOT, EXAM_ID_CBSE_12 } from "../ncert/config";
import { decideRecrop } from "./recrop";

const LWS_ORG = "5d528776-1263-4d77-bc12-f2836fd6073f";
const NCERT_DATA = join(__dirname, "..", "ncert", "data");
const BIO_DATA = join(__dirname, "..", "cbse-12-pyq", "data");
const BIO_BOOKS = join(SOURCE_ROOT, "12th", "Biology");
const OUT = join(__dirname, "out", "recrop-ncert");
const PUBLIC_PREFIX = "/storage/v1/object/public/question-images/";

type Part = { page: number; bbox: number[]; mask?: number[][] };
type Job = {
  key: string; label: string; field: "image_url" | "solution_image_url"; pdf: string; parts: Part[];
  find: { examId: string; sourceFile: string; qn: string } | { examId: string; hash: string };
};

function ncertJobs(): Job[] {
  const jobs: Job[] = [];
  const files = readdirSync(NCERT_DATA);
  for (const [id, ch] of Object.entries(CHAPTERS as Record<string, { sourceFile: string; pdf: string; examId: string }>)) {
    for (const f of files.filter((f) => f.startsWith(`${id}.`) && (f.endsWith("fig.json") || f.endsWith(".solution-images.json")))) {
      const field = f.endsWith("fig.json") ? "image_url" : "solution_image_url";
      for (const e of JSON.parse(readFileSync(join(NCERT_DATA, f), "utf8")) as { ref: string; page?: number; bbox?: number[]; also?: { page: number; bbox: number[] } }[]) {
        if (typeof e.page !== "number" || !e.bbox) continue; // a pre-made file or a computed diagram: not a page crop
        // `also`: the second figure of a two-part image, stacked below the first.
        const parts = [{ page: e.page, bbox: e.bbox }, ...(e.also ? [{ page: e.also.page, bbox: e.also.bbox }] : [])];
        jobs.push({
          key: `${id}-${field === "image_url" ? "stem" : "sol"}-${e.ref}`.replace(/[^A-Za-z0-9]+/g, "_"),
          label: `${ch.sourceFile} ${e.ref} (${field})`, field, pdf: ch.pdf, parts,
          find: { examId: ch.examId, sourceFile: ch.sourceFile, qn: e.ref },
        });
      }
    }
  }
  return jobs;
}

/** The Biology board lane names a question by content_hash (attach-draw-figures.ts). */
function bioJobs(): Job[] {
  type Q = { ref: string; format: string; stem: string; context?: string; options?: { text: string }[]; answer?: string; _drawFigure?: string };
  const hashOf = new Map<string, string>();
  for (const f of readdirSync(BIO_DATA).filter((f) => /^\d{4}-57-\d-\d\.questions\.json$/.test(f))) {
    const paper = f.replace(".questions.json", "");
    for (const q of (JSON.parse(readFileSync(join(BIO_DATA, f), "utf8")).questions ?? []) as Q[]) {
      if (!q._drawFigure) continue;
      hashOf.set(`${paper}:${q.ref}`, q.format === "subjective" ? subjectiveContentHash(q.stem, q.context ?? null) : contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? ""));
    }
  }
  const jobs: Job[] = [];
  for (const e of JSON.parse(readFileSync(join(BIO_DATA, "draw-figures.json"), "utf8")) as { ref: string; book?: string; page?: number; bbox?: number[]; mask?: number[][] }[]) {
    if (!e.book || typeof e.page !== "number" || !e.bbox) continue; // marking-scheme crops and "none" decisions
    const hash = hashOf.get(e.ref);
    if (!hash) throw new Error(`draw-figures ref ${e.ref} has no transcribed question`);
    jobs.push({
      key: `bio-${e.ref}`.replace(/[^A-Za-z0-9]+/g, "_"), label: `CBSE 12 Biology board ${e.ref}`, field: "solution_image_url",
      pdf: join(BIO_BOOKS, e.book), parts: [{ page: e.page, bbox: e.bbox, ...(e.mask ? { mask: e.mask.map((m) => m.slice(0, 4)) } : {}) }],
      find: { examId: EXAM_ID_CBSE_12, hash },
    });
  }
  return jobs;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const only = process.argv.find((a) => a.startsWith("--only="))?.slice("--only=".length);
  const reviewed = process.argv.includes("--reviewed");
  const keepOld = process.argv.includes("--keep-old");
  if (reviewed && !only) throw new Error("--reviewed needs --only: a MISMATCH is replaced only after someone has looked at it");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const db = createClient(base, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  mkdirSync(join(OUT, "live"), { recursive: true });

  const jobs = [...ncertJobs(), ...bioJobs()].filter((j) => !only || j.label.includes(only));
  const rows = new Map<string, { id: string; value: string }[]>();
  for (const j of jobs) {
    let q = db.from("questions").select(`id, ${j.field}`).eq("exam_id", j.find.examId);
    q = "hash" in j.find ? q.eq("content_hash", j.find.hash) : q.eq("source_file", j.find.sourceFile).eq("question_number", j.find.qn);
    const { data, error } = await q;
    if (error) throw new Error(`${j.label}: ${error.message}`);
    rows.set(j.key, ((data ?? []) as unknown as Record<string, string>[]).filter((r) => r[j.field]).map((r) => ({ id: r.id, value: r[j.field] })));
  }

  // One live file per distinct stored value; a job whose rows disagree is reported.
  const live: { job: Job; value: string; ids: string[]; path: string }[] = [];
  const report: string[] = [];
  for (const j of jobs) {
    const rs = rows.get(j.key)!;
    if (!rs.length) { report.push(`no live image   ${j.label}`); continue; }
    const values = [...new Set(rs.map((r) => r.value))];
    if (values.length > 1) { report.push(`rows disagree   ${j.label}`); continue; }
    const value = values[0];
    const url = value.startsWith("http") ? value : `${base}${PUBLIC_PREFIX}${value}`;
    const res = await fetch(url);
    if (!res.ok) { report.push(`download ${res.status}  ${j.label}`); continue; }
    const path = join(OUT, "live", `${j.key}.png`);
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
    live.push({ job: j, value, ids: rs.map((r) => r.id), path });
  }

  const spec = join(mkdtempSync(join(tmpdir(), "recrop-")), "jobs.json");
  writeFileSync(spec, JSON.stringify({ outdir: join(OUT, "new"), jobs: live.map((l) => ({ key: l.job.key, pdf: l.job.pdf, parts: l.job.parts, live: l.path })) }));
  const res = spawnSync("python", [join(__dirname, "recrop_compare.py"), spec], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`recrop_compare failed: ${res.stderr}`);
  const metrics = JSON.parse(res.stdout.trim().split("\n").pop()!) as Record<string, { liveVsOld: number; oldVsNew: number; new: string }>;

  const tally: Record<string, number> = {};
  const toReplace: (typeof live[number] & { newPng: string })[] = [];
  for (const l of live) {
    const m = metrics[l.job.key];
    const d = decideRecrop(m);
    tally[d] = (tally[d] ?? 0) + 1;
    if (d === "mismatch") report.push(`MISMATCH (${m.liveVsOld})  ${l.job.label}`);
    if (d === "replace" || (d === "mismatch" && reviewed)) toReplace.push({ ...l, newPng: m.new });
  }
  writeFileSync(join(OUT, "metrics.json"), JSON.stringify(Object.fromEntries(live.map((l) => [l.job.label, { ...metrics[l.job.key], decision: decideRecrop(metrics[l.job.key]) }])), null, 1));
  writeFileSync(join(OUT, "report.txt"), report.join("\n") + "\n");
  console.log(`${jobs.length} records, ${live.length} live images measured: ${JSON.stringify(tally)}; ${report.length} notes in ${join(OUT, "report.txt")}`);
  if (!apply) { console.log("[dry run] look at out/recrop-ncert/new/ against live/, then --apply."); return; }

  let replaced = 0, deleted = 0;
  for (const r of toReplace) {
    const path = await uploadImage(db, LWS_ORG, readFileSync(r.newPng), "image/png");
    const { error } = await db.from("questions").update({ [r.job.field]: path }).in("id", r.ids).eq(r.job.field, r.value);
    if (error) throw new Error(`${r.job.label}: ${error.message}`);
    replaced += r.ids.length;
    const old = r.value.startsWith("http") ? r.value.split(PUBLIC_PREFIX)[1] : r.value;
    const { count } = await db.from("questions").select("id", { count: "exact", head: true }).or(`image_url.eq.${r.value},solution_image_url.eq.${r.value}`);
    if (keepOld) console.log(`kept old ${old} -> new ${path}  ${r.job.label}`);
    else if (old && count === 0 && existsSync(r.newPng)) { await deleteImage(db, old); deleted++; }
  }
  console.log(`done: ${replaced} rows repointed to ${toReplace.length} new images; ${deleted} old images deleted.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
