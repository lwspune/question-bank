/**
 * Crop, review and attach a batch of SOLUTION figures (plan.ts says what a batch is).
 *
 *   npx tsx scripts/solution-figures/run.ts <batch>            # crop + check every row + write out/<batch>/review.html; writes NOTHING
 *   npx tsx scripts/solution-figures/run.ts <batch> --apply    # also upload each figure once, set solution_image_url, apply the label edits
 *   ... --force                                                # replace a solution_image_url that is already set
 *
 * <batch> names data/<batch>.json. LOOK AT review.html before --apply: it shows
 * each crop beside the questions it will sit under, and only the eye can tell a
 * clipped label or a figure that answers a different question.
 *
 * Every row and every edit is checked before the first write, so a missing row,
 * a figure already set or an edit whose text is gone stops the run with nothing
 * written. A re-run after --apply reports everything as already done.
 */
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { planBatch, applyEdit, type Batch } from "./plan";

const LWS_ORG = "5d528776-1263-4d77-bc12-f2836fd6073f"; // the storage folder every other attach script writes to

type Row = {
  id: string;
  question_number: string | null;
  visibility: string;
  text: string;
  solution: string | null;
  solution_image_url: string | null;
  exams: { name: string } | null;
  chapters: { name: string } | null;
};

/** A write that failed in transit (`fetch failed`) is retried; an error the
 *  database returned is not, since repeating it would only repeat it. */
async function retry(what: string, write: () => PromiseLike<{ error: { message: string } | null }>) {
  for (let attempt = 1; ; attempt++) {
    try {
      const { error } = await write();
      if (error) throw new Error(`${what}: ${error.message}`);
      return;
    } catch (e) {
      const transit = e instanceof TypeError && /fetch failed/.test(e.message);
      if (!transit || attempt === 3) throw e instanceof TypeError ? new Error(`${what}: ${e.message}`) : e;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function main() {
  const name = process.argv[2];
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  if (!name || name.startsWith("--")) throw new Error("usage: run.ts <batch> [--apply] [--force]");
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

  const batch = JSON.parse(readFileSync(join(__dirname, "data", `${name}.json`), "utf8")) as Batch;
  const plan = planBatch(batch);
  if (plan.errors.length) {
    for (const e of plan.errors) console.log(`  !! ${e}`);
    process.exit(1);
  }

  // ── crop ──
  const outdir = join(__dirname, "out", name);
  mkdirSync(outdir, { recursive: true });
  const png = new Map<string, string>();
  for (const [pdf, jobs] of plan.cropsByPdf) {
    const spec = join(mkdtempSync(join(tmpdir(), "solfig-")), "jobs.json");
    writeFileSync(spec, JSON.stringify({ pdf, outdir, jobs }));
    const res = spawnSync("python", [join(__dirname, "..", "lib", "figures", "crop_answer_figs.py"), spec], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    if (res.status !== 0) throw new Error(`crop failed for ${pdf}: ${res.stderr}`);
    const crops = JSON.parse(res.stdout.trim().split("\n").pop()!) as Record<string, string>;
    for (const [key, path] of Object.entries(crops)) png.set(key, path);
  }

  // ── check every row ──
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const ids = plan.attach.map((a) => a.id);
  const rows = new Map<string, Row>();
  for (let i = 0; i < ids.length; i += 150) {
    const { data, error } = await client
      .from("questions")
      .select("id, question_number, visibility, text, solution, solution_image_url, exams(name), chapters(name)")
      .in("id", ids.slice(i, i + 150));
    if (error) throw new Error(`lookup: ${error.message}`);
    for (const r of data as unknown as Row[]) rows.set(r.id, r);
  }

  const problems: string[] = [];
  const toAttach: { id: string; key: string }[] = [];
  let already = 0;
  for (const a of plan.attach) {
    const r = rows.get(a.id);
    if (!r) { problems.push(`${a.id} (${a.key}): no such question`); continue; }
    if (r.solution_image_url && !force) { already++; continue; }
    toAttach.push(a);
  }
  const editsToWrite: { id: string; next: string }[] = [];
  const nextSolution = new Map<string, string>();
  let editsDone = 0;
  for (const e of plan.edits) {
    const r = rows.get(e.id);
    if (!r) continue; // reported above
    const current = nextSolution.get(e.id) ?? r.solution ?? "";
    const res = applyEdit(current, e.find, e.replace);
    if (res.status === "missing" || res.status === "ambiguous") problems.push(`edit ${e.id}: "${e.find.slice(0, 60)}" is ${res.status}`);
    else if (res.status === "done") editsDone++;
    else nextSolution.set(e.id, res.next);
  }
  for (const [id, next] of nextSolution) editsToWrite.push({ id, next });

  // ── review sheet ──
  const byKey = new Map<string, string[]>();
  for (const a of plan.attach) byKey.set(a.key, [...(byKey.get(a.key) ?? []), a.id]);
  const edited = new Set(plan.edits.map((e) => e.id));
  const sections = batch.figures.map((f) => {
    const items = (byKey.get(f.key) ?? []).map((id) => {
      const r = rows.get(id);
      if (!r) return `<li class="bad">${id}: no such question</li>`;
      const tag = `${r.exams?.name ?? "?"} · ${r.chapters?.name ?? "?"} · ${r.question_number ?? "?"}${r.visibility !== "PUBLIC" ? " · " + r.visibility : ""}`;
      const flags = [r.solution_image_url && !force ? "already has a figure, skipped" : "", edited.has(id) ? "labels edited to match" : ""].filter(Boolean).join("; ");
      return `<li><b>${esc(tag)}</b>${flags ? ` <i>(${flags})</i>` : ""}<br>${esc(r.text.replace(/\s+/g, " ").slice(0, 220))}</li>`;
    });
    const img = png.get(f.key);
    return `<section><h2>${esc(f.key)}</h2>${f.note ? `<p class="note">${esc(f.note)}</p>` : ""}<div class="row"><img src="${img ? relative(outdir, img).replace(/\\/g, "/") : ""}"><ol>${items.join("")}</ol></div></section>`;
  });
  const html = `<!doctype html><meta charset="utf-8"><title>${esc(name)}</title><style>body{font:14px system-ui;margin:24px;max-width:1200px}section{border-top:1px solid #ccc;padding:12px 0}.row{display:flex;gap:24px;align-items:flex-start}img{max-width:460px;border:1px solid #ddd}ol{margin:0}li{margin-bottom:8px}.note{color:#555}.bad{color:#b00}</style><h1>${esc(name)}: ${batch.figures.length} figures, ${plan.attach.length} questions, ${plan.edits.length} label edits</h1>${sections.join("")}`;
  const review = join(outdir, "review.html");
  writeFileSync(review, html);

  console.log(`${name}: ${batch.figures.length} figures, ${plan.attach.length} questions (${toAttach.length} to attach, ${already} already have one), ${plan.edits.length} edits (${editsToWrite.length} to write, ${editsDone} done)`);
  console.log(`review: ${review}`);
  if (problems.length) {
    for (const p of problems) console.log(`  !! ${p}`);
    process.exit(1);
  }
  if (!apply) {
    console.log("[dry run] look at the review sheet, then re-run with --apply.");
    return;
  }

  // ── write ──
  // Uploads are recorded as they happen, so a run cut short by the network
  // reuses them on the re-run instead of uploading every figure again and
  // leaving the first copies orphaned in storage.
  const ledger = join(outdir, "uploaded.json");
  const uploaded = new Map<string, string>(existsSync(ledger) ? Object.entries(JSON.parse(readFileSync(ledger, "utf8"))) : []);
  for (const key of new Set(toAttach.map((a) => a.key))) {
    if (uploaded.has(key) && !force) continue;
    uploaded.set(key, await uploadImage(client, LWS_ORG, readFileSync(png.get(key)!), "image/png"));
    writeFileSync(ledger, JSON.stringify(Object.fromEntries(uploaded), null, 2) + "\n");
    console.log(`  uploaded ${key} -> ${uploaded.get(key)}`);
  }
  for (const a of toAttach) {
    await retry(`${a.id} set solution_image_url`, () => {
      let q = client.from("questions").update({ solution_image_url: uploaded.get(a.key)! }).eq("id", a.id);
      if (!force) q = q.is("solution_image_url", null);
      return q;
    });
  }
  for (const e of editsToWrite) {
    await retry(`${e.id} edit`, () => client.from("questions").update({ solution: e.next }).eq("id", e.id));
  }
  console.log(`done: ${toAttach.length} attached, ${editsToWrite.length} solutions edited.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
