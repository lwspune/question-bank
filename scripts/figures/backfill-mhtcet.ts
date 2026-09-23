/**
 * Attach missing MHT-CET stem figures from the SOURCE `.docx` exam papers.
 *
 *   npx tsx scripts/figures/backfill-mhtcet.ts            # plan + extract for review
 *   npx tsx scripts/figures/backfill-mhtcet.ts --apply    # upload + set image_url
 *
 * WHY A SEPARATE SCRIPT FROM `backfill.ts`, AND WHY IT IS THE BETTER ONE.
 * `backfill.ts` crops a rectangle out of a rendered PDF page, which is what you
 * must do when the figure exists only as ink on a page. MHT-CET does not need
 * that: its papers are born-digital `.docx` whose figures are EMBEDDED RASTERS,
 * so `pandoc --extract-media` hands back the exact picture the author inserted —
 * native resolution, and leak-free by construction rather than by a trim rule.
 * Every crop heuristic in `derive.py` exists to approximate what this gets for
 * free. Where a source offers the embedded object, take it.
 *
 * THE `.xlsx` IS NOT A SOURCE. `questions.source_file` for these rows names a
 * `*_QuestionBank.xlsx`, and it is tempting to look there. Those spreadsheets
 * ARE the bank's ingestion input — same garbled options, same key — so they can
 * only reproduce the gap. The rendered exam paper is the only authority, and it
 * is reached through `pyq_year` + `pyq_note`, not through the filename.
 *
 * THE FILENAME AND THE NOTE DISAGREE, AND NEITHER ONE WINS.
 * `MHT_CET_3rdMay2023_S1_QB.xlsx` holds a row whose `pyq_note` reads "3rd May
 * 2nd Shift". I first assumed the note was authoritative — it is the field that
 * describes the sitting, after all — and that was wrong: the question is printed
 * in SHIFT 1, so the filename was right and the note is a data defect.
 *
 * So the sitting is a HINT, never the answer. Both shifts of the noted day are
 * searched, and the authority is the STEM AND OPTIONS matching the paper. That
 * is the only signal that cannot be wrong about which picture belongs to which
 * question — which matters because the failure here is not a missing figure but
 * a figure from the wrong sitting, silently attached to a question it fits
 * superficially. Wrong is worse than absent.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { uploadImage } from "../../src/lib/storage/images";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const PYQ_ROOT = "C:\\Vilas\\LWS_Pune\\MHT-CET\\PYQPs";
const WORK = join(__dirname, "..", "lib", "figures", "out", "mhtcet");
const REVIEW = join(__dirname, "..", "lib", "figures", "figures-review", "mhtcet.json");
const TRIAGE = join(__dirname, "..", "lib", "figures", "triage");
const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
const EXAM_NAME = "MHT-CET";

type Row = {
  id: string;
  question_number: string | null;
  source_file: string | null;
  pyq_year: number | null;
  pyq_note: string | null;
  text: string | null;
};

/** "2nd May Shift 2" / "3rd May 2nd Shift" / "16th May Shift 2" → {day, shift}. */
export function parseSitting(note: string | null): { day: number; shift: number } | null {
  if (!note) return null;
  const day = note.match(/\b(\d{1,2})\s*(?:st|nd|rd|th)?\s+(?:may|april|apr)\b/i);
  // The shift is written either "Shift 2" or "2nd Shift" — both occur in the
  // same corpus, sometimes for the same date.
  const shift = note.match(/shift\s*(?:no\.?\s*)?([12IVi]+)\b/i) ?? note.match(/\b([12])\s*(?:st|nd|rd|th)?\s+shift\b/i);
  if (!day || !shift) return null;
  const s = shift[1].toUpperCase();
  const n = s === "I" ? 1 : s === "II" ? 2 : Number(s);
  if (!Number.isFinite(n) || (n !== 1 && n !== 2)) return null;
  return { day: Number(day[1]), shift: n };
}

/** The `(ques)` paper for a sitting, matched case- and spacing-insensitively —
 *  the folders mix "may"/"May" and "shift"/"Shift" freely. */
export function findPaper(year: number, day: number, shift: number): string | null {
  const dir = join(PYQ_ROOT, String(year));
  if (!existsSync(dir)) return null;
  const roman = shift === 1 ? "i" : "ii";
  for (const f of readdirSync(dir)) {
    const l = f.toLowerCase();
    if (!l.endsWith(".docx") || l.includes("(ans)") || l.includes("_ak")) continue;
    const d = l.match(/^(\d{1,2})\s*(?:st|nd|rd|th)?\s/);
    if (!d || Number(d[1]) !== day) continue;
    if (new RegExp(`shift\\s*(${shift}|${roman})\\b`).test(l)) return join(dir, f);
  }
  return null;
}

/** Convert once per paper; pandoc is slow and several rows share a sitting. */
function extract(paper: string, slug: string): string {
  const md = join(WORK, `${slug}.md`);
  if (existsSync(md)) return md;
  mkdirSync(WORK, { recursive: true });
  const res = spawnSync("pandoc", [paper, "-t", "markdown", `--extract-media=${join(WORK, slug)}`, "-o", md], {
    encoding: "utf8",
    maxBuffer: 128 * 1024 * 1024,
  });
  if (res.status !== 0) throw new Error(`pandoc failed on ${paper}: ${res.stderr}`);
  return md;
}

/**
 * The images inside one numbered question's block.
 *
 * A block runs from "NNN." at the start of a line to the next such marker, so
 * the options are included and the NEXT question's figure is not. Anchored on
 * the number AND verified against a prose fragment of the stem: paper numbering
 * and bank numbering agree on this corpus, but agreeing is not the same as being
 * guaranteed to agree, and attaching by a number that silently drifted is how
 * you ship the wrong picture.
 */
export function imagesForQuestion(md: string, qno: number, stem: string | null): { images: string[]; matchedStem: boolean } {
  const lines = md.split(/\r?\n/);
  const start = lines.findIndex((l) => new RegExp(`^\\s*${qno}\\.\\s`).test(l));
  if (start < 0) return { images: [], matchedStem: false };
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^\s*\d{1,3}\.\s/.test(lines[i])) { end = i; break; }
  }
  const block = lines.slice(start, end).join("\n");
  const images = [...block.matchAll(/!\[\]\(([^)]+?)\)(?:\{[^}]*\})?/g)].map((m) => m[1].trim());
  // A short distinctive run of the stem's own words, punctuation-insensitive.
  const probe = (stem ?? "").replace(/\\\(.*?\\\)/g, " ").replace(/[^a-z0-9 ]/gi, " ").split(/\s+/).filter((w) => w.length > 3).slice(0, 5);
  const flat = block.replace(/[^a-z0-9 ]/gi, " ").replace(/\s+/g, " ").toLowerCase();
  const matchedStem = probe.length >= 3 && probe.every((w) => flat.includes(w.toLowerCase()));
  return { images, matchedStem };
}

/** Stack a stem's several pictures into the one image the column can hold. */
function composite(images: string[], slug: string): string {
  const out = join(WORK, `${slug}.png`);
  const py = `
import sys, json
from PIL import Image
paths = json.loads(sys.argv[1]); out = sys.argv[2]
ims = [Image.open(p).convert("RGB") for p in paths]
GAP = 14
W = max(i.width for i in ims)
H = sum(i.height for i in ims) + GAP * (len(ims) - 1)
c = Image.new("RGB", (W, H), "white")
y = 0
for i in ims:
    c.paste(i, ((W - i.width) // 2, y))   # centred: the parts differ in width
    y += i.height + GAP
c.save(out)
`;
  const res = spawnSync("python", ["-c", py, JSON.stringify(images), out], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`composite failed: ${res.stderr}`);
  return out;
}

function triagedMisses(): Set<string> {
  const ids = new Set<string>();
  if (!existsSync(TRIAGE)) return ids;
  for (const f of readdirSync(TRIAGE).filter((x) => x.endsWith(".json"))) {
    const d = JSON.parse(readFileSync(join(TRIAGE, f), "utf8")) as { rows?: { id?: string; verdict?: string }[] };
    for (const r of d.rows ?? []) if (r.verdict === "MISS" && r.id) ids.add(r.id);
  }
  return ids;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY required");
  const c: SupabaseClient = createClient(url, key, { auth: { persistSession: false } });

  const { data: exam } = await c.from("exams").select("id").eq("name", EXAM_NAME).maybeSingle();
  if (!exam) throw new Error(`exam "${EXAM_NAME}" not found`);

  const misses = triagedMisses();
  // PAGED. MHT-CET has ~6,600 rows and thousands carry no image, so a bare
  // `.select()` silently returns the first 1000 by id and nothing says so — it
  // found 2 of the 11 triaged misses and reported that as the whole population.
  // This is the bank's oldest recurring trap and it has now bitten a sixth time.
  const all: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await c
      .from("questions")
      .select("id,question_number,source_file,pyq_year,pyq_note,text")
      .eq("exam_id", (exam as { id: string }).id)
      .is("image_url", null)
      .order("id")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    all.push(...((data ?? []) as Row[]));
    if (!data || data.length < 1000) break;
  }
  const rows = all.filter((r) => misses.has(r.id));
  if (rows.length !== misses.size) {
    // Not fatal — other exams' misses are in that set — but a silent shortfall
    // here is exactly what the unpaged read looked like, so say the number.
    console.log(`(${rows.length} of this exam's rows matched the ${misses.size} triaged misses across all exams)`);
  }
  console.log(`${rows.length} triaged MHT-CET miss(es)\n`);

  const review: { verified: string[]; rejected?: Record<string, string> } = existsSync(REVIEW)
    ? JSON.parse(readFileSync(REVIEW, "utf8"))
    : { verified: [] };
  const ok = new Set(review.verified);

  const plan: Array<{ id: string; ref: string; paper: string; image: string }> = [];
  for (const r of rows) {
    const label = `${r.pyq_year} ${r.pyq_note} Q${r.question_number}`;
    const sit = parseSitting(r.pyq_note);
    if (!sit || !r.pyq_year) { console.log(`  SKIP  ${label} — cannot read a sitting from pyq_note`); continue; }
    const qno = Number(r.question_number);
    if (!Number.isFinite(qno)) { console.log(`  SKIP  ${label} — no numeric question_number`); continue; }

    // BOTH SHIFTS OF THE NOTED DAY — the note is a hint, the stem is the proof.
    // Ordered so the noted shift is tried first, which keeps the common case
    // cheap without letting a wrong note decide the outcome.
    let found: { images: string[]; paper: string; shift: number } | null = null;
    const notes: string[] = [];
    for (const shift of [sit.shift, sit.shift === 1 ? 2 : 1]) {
      const paper = findPaper(r.pyq_year, sit.day, shift);
      if (!paper) { notes.push(`shift ${shift}: no paper on disk`); continue; }
      const md = extract(paper, `${r.pyq_year}-${sit.day}-s${shift}`);
      const { images, matchedStem } = imagesForQuestion(readFileSync(md, "utf8"), qno, r.text);
      if (!matchedStem) { notes.push(`shift ${shift}: Q${qno} is a different question`); continue; }
      if (!images.length) { notes.push(`shift ${shift}: stem matches but no image in the block`); continue; }
      found = { images, paper, shift };
      break;
    }
    if (!found) { console.log(`  SKIP  ${label} — ${notes.join("; ")}`); continue; }
    if (found.images.length > 1) {
      // A TWO-PART FIGURE IS ONE FIGURE. `questions.image_url` is a single
      // column, and these stems genuinely read two pictures at once — a logic
      // circuit AND its truth table, "figure (I) and (II)". Attaching only the
      // first would leave the question as unanswerable as attaching none, so
      // they are stacked in DOCUMENT ORDER, which is the order the stem names
      // them in. The stack still has to be looked at: order is the one thing a
      // composite can get wrong, and the review gate is where that is caught.
      found.images = [composite(found.images, `${r.id}-composite`)];
      console.log(`         (composited ${found.images.length ? "2+" : ""} parts into one image)`);
    }
    const wrongNote = found.shift !== sit.shift ? `  ⚠ pyq_note says shift ${sit.shift}, the question is in shift ${found.shift}` : "";
    plan.push({ id: r.id, ref: label, paper: found.paper, image: found.images[0] });
    console.log(`  OK    ${label} -> ${found.images[0].split(/[\\/]/).pop()}${ok.has(label) ? "  [reviewed]" : "  [awaiting review]"}${wrongNote}`);
  }

  writeFileSync(join(WORK, "_plan.json"), JSON.stringify(plan, null, 2) + "\n", "utf8");
  if (!apply) {
    console.log(`\n${plan.length} extractable. LOOK at each image, then list its ref in ${REVIEW} and re-run with --apply.`);
    return;
  }

  let attached = 0, held = 0;
  for (const p of plan) {
    if (!ok.has(p.ref)) { held++; continue; }
    const mime = p.image.toLowerCase().endsWith(".jpg") || p.image.toLowerCase().endsWith(".jpeg") ? "image/jpeg" : "image/png";
    const stored = await uploadImage(c, ORG_ID, readFileSync(p.image), mime);
    const { error: uErr } = await c.from("questions").update({ image_url: stored }).eq("id", p.id);
    if (uErr) throw new Error(`${p.ref}: ${uErr.message}`);
    console.log(`  attached ${p.ref}`);
    attached++;
  }
  console.log(`\ndone. attached ${attached}, held-for-review ${held}.`);
}

if (require.main === module) {
  main().catch((e) => { console.error(e?.message ?? e); process.exit(1); });
}
