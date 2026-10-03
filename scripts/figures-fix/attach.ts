/**
 * Give figure questions their real figure, across corpora.
 *
 *   npx tsx scripts/figures-fix/attach.ts <batch>           # dry run: crop + show every change
 *   npx tsx scripts/figures-fix/attach.ts <batch> --apply   # upload, link, strip the prose stand-in
 *
 * Reads scripts/figures-fix/manifest/<batch>.json, the source of record for
 * this fix (see README.md for the shape). Each figure is cropped from the
 * original paper or book with the shared cropper, so the bytes uploaded are
 * from the same box the visual check looked at.
 *
 * LOOK AT THE CROPS BEFORE --apply. The dry run writes them to
 * generated-papers/figures-fix/<batch>/; a crop box can clip pale line art and
 * nothing automatic notices (scripts/lib/figures/README.md).
 *
 * Idempotent: a row whose image_url is already set keeps it, so a re-run cannot
 * orphan a storage object; stripping is a no-op once the prose is gone.
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage } from "../../src/lib/storage/images";
import { literalNewlineFields } from "../../src/lib/upload/textGuard";
import { cropFigures, type FigSpec } from "../lib/figures/crop";
import { stripFigureDescriptions, removeExactlyOnce } from "../lib/figures/strip";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type StripStep = "brackets" | { remove: string };
/** One step, or several applied in order (a bracket block plus a table the
 *  transcriber added after it). Each `remove` must match exactly once. */
type Strip = StripStep | StripStep[] | null;
type ManifestRow = {
  id: string;
  /** Key into `figures`. */
  figure: string;
  /** How to remove the prose stand-in from `text`; null keeps the text. */
  stripText?: Strip;
  /** Same for `context` (a set's shared passage is stored on every member). */
  stripContext?: Strip;
  /** Option label -> figure key, when the OPTIONS are pictures. */
  options?: Record<string, string>;
  /** How to remove each pictured option's prose stand-in. */
  stripOptions?: Strip;
  note?: string;
};
/** A single region, or several regions of the same PDF stacked top to bottom
 *  into one image (an example that cites two printed figures). */
type FigureEntry = FigSpec | { stack: FigSpec[] };
type Manifest = { batch: string; pdf: string; figures: Record<string, FigureEntry>; rows: ManifestRow[] };

/** Crop every figure; a stacked figure's parts are cropped, then joined into one PNG. */
function cropAll(pdf: string, figures: Record<string, FigureEntry>, outDir: string): Record<string, string> {
  const flat: Record<string, FigSpec> = {};
  for (const [key, f] of Object.entries(figures)) {
    if ("stack" in f) f.stack.forEach((part, i) => (flat[`${key}__part${i}`] = part));
    else flat[key] = f;
  }
  const crops = cropFigures(pdf, flat, outDir);
  const out: Record<string, string> = {};
  for (const [key, f] of Object.entries(figures)) {
    if (!("stack" in f)) {
      out[key] = crops[key];
      continue;
    }
    const parts = f.stack.map((_, i) => crops[`${key}__part${i}`]);
    const target = join(outDir, `fig-${key.replace(/[^A-Za-z0-9]+/g, "_")}.png`);
    const py = [
      "import sys",
      "from PIL import Image",
      "ims=[Image.open(p).convert('RGB') for p in sys.argv[2:]]",
      "w=max(i.width for i in ims); gap=24",
      "h=sum(i.height for i in ims)+gap*(len(ims)-1)",
      "c=Image.new('RGB',(w,h),'white'); y=0",
      "for i in ims:",
      "    c.paste(i,((w-i.width)//2,y)); y+=i.height+gap",
      "c.save(sys.argv[1], optimize=True)",
    ].join(String.fromCharCode(10));
    const res = spawnSync("python", ["-c", py, target, ...parts], { encoding: "utf8" });
    if (res.status !== 0) throw new Error(`stacking ${key} failed: ${res.stderr}`);
    out[key] = target;
  }
  return out;
}

function applyStrip(value: string | null, strip: Strip | undefined): string | null {
  if (!value || !strip) return value;
  let out = value;
  for (const step of Array.isArray(strip) ? strip : [strip]) {
    out = step === "brackets" ? stripFigureDescriptions(out) : removeExactlyOnce(out, step.remove);
  }
  return out;
}

async function main() {
  const [batch, ...flags] = process.argv.slice(2);
  if (!batch) throw new Error("usage: attach.ts <batch> [--apply]");
  const apply = flags.includes("--apply");
  const file = join(__dirname, "manifest", `${batch}.json`);
  if (!existsSync(file)) throw new Error(`no manifest at ${file}`);
  const m: Manifest = JSON.parse(readFileSync(file, "utf8"));
  if (!existsSync(m.pdf)) throw new Error(`source PDF not found: ${m.pdf}`);

  for (const r of m.rows) {
    for (const key of [r.figure, ...Object.values(r.options ?? {})]) {
      if (!m.figures[key]) throw new Error(`row ${r.id} names unknown figure ${key}`);
    }
  }

  const outDir = join(process.cwd(), "generated-papers", "figures-fix", batch);
  const crops = cropAll(m.pdf, m.figures, outDir);
  console.log(`cropped ${Object.keys(crops).length} figure(s) -> ${outDir}`);

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data, error } = await db
    .from("questions")
    .select("id, org_id, text, context, image_url, question_number, visibility")
    .in("id", m.rows.map((r) => r.id));
  if (error) throw new Error(error.message);
  const byId = new Map((data ?? []).map((q) => [q.id as string, q]));
  const withOptions = m.rows.filter((r) => r.options).map((r) => r.id);
  const { data: optRows, error: oErr } = withOptions.length
    ? await db.from("options").select("id, question_id, label, text, image_url").in("question_id", withOptions)
    : { data: [], error: null };
  if (oErr) throw new Error(oErr.message);

  // Plan every change first, so a bad row stops the batch before any write.
  const plan = m.rows.map((r) => {
    const q = byId.get(r.id);
    if (!q) throw new Error(`question ${r.id} not found`);
    const text = applyStrip(q.text as string | null, r.stripText);
    const context = applyStrip(q.context as string | null, r.stripContext);
    const bad = literalNewlineFields({ text: text ?? "", context: context ?? "", solution: "" });
    if (bad.length) throw new Error(`${r.id}: stripping left a literal \\n in ${bad.join(", ")}`);
    const opts = Object.entries(r.options ?? {}).map(([label, key]) => {
      const o = (optRows ?? []).find((x) => x.question_id === r.id && x.label === label);
      if (!o) throw new Error(`${r.id}: no option ${label}`);
      return { o, key, text: applyStrip(o.text as string | null, r.stripOptions) ?? "" };
    });
    return { r, q, text, context, opts };
  });

  // Keep the rows exactly as they were before the first --apply, so a batch can
  // be reverted. Written once; a re-run never overwrites the original state.
  const backup = join(__dirname, "backup", `${batch}.before.json`);
  if (apply && !existsSync(backup)) {
    mkdirSync(dirname(backup), { recursive: true });
    const before = plan.map(({ q, opts }) => ({
      id: q.id,
      text: q.text,
      context: q.context,
      image_url: q.image_url,
      options: opts.map(({ o }) => ({ id: o.id, label: o.label, text: o.text, image_url: o.image_url })),
    }));
    writeFileSync(backup, JSON.stringify(before, null, 2) + "\n");
    console.log(`saved the before-state to ${backup}`);
  }

  // One upload per figure, shared by every row that uses it (a set's members).
  const uploaded = new Map<string, string>();
  const upload = async (key: string, orgId: string): Promise<string> => {
    let path = uploaded.get(key);
    if (!path) {
      const img = crops[key];
      path = await uploadImage(db, orgId, readFileSync(img), img.endsWith(".jpg") ? "image/jpeg" : "image/png");
      uploaded.set(key, path);
    }
    return path;
  };
  for (const { r, q, text, context, opts } of plan) {
    const textChanged = text !== q.text;
    const contextChanged = context !== q.context;
    console.log(`\n[${q.question_number ?? "?"}] ${r.id}  figure=${r.figure}${q.image_url ? "  (image already set)" : ""}`);
    if (textChanged) console.log(`  text:    ${String(q.text).replace(/\s+/g, " ").slice(0, 140)}\n       -> ${String(text).replace(/\s+/g, " ").slice(0, 140)}`);
    if (contextChanged) console.log(`  context: ${String(q.context).replace(/\s+/g, " ").slice(0, 140)}\n       -> ${String(context).replace(/\s+/g, " ").slice(0, 140)}`);
    for (const { o, key, text: ot } of opts) {
      console.log(`  option ${o.label}: figure=${key}${o.image_url ? " (image already set)" : ""}${ot !== o.text ? `  text -> ${JSON.stringify(ot.slice(0, 60))}` : ""}`);
    }
    if (!apply) continue;

    for (const { o, key, text: ot } of opts) {
      const oPatch: Record<string, string> = {};
      if (!o.image_url) oPatch.image_url = await upload(key, q.org_id as string);
      if (ot !== o.text) oPatch.text = ot;
      if (Object.keys(oPatch).length === 0) continue;
      const { error: e2 } = await db.from("options").update(oPatch).eq("id", o.id);
      if (e2) throw new Error(`${r.id} option ${o.label}: ${e2.message}`);
    }
    const patch: Record<string, string | null> = {};
    if (!q.image_url) patch.image_url = await upload(r.figure, q.org_id as string);
    if (textChanged) patch.text = text;
    if (contextChanged) patch.context = context;
    if (Object.keys(patch).length === 0) continue;
    const { error: uErr } = await db.from("questions").update(patch).eq("id", r.id);
    if (uErr) throw new Error(`${r.id}: ${uErr.message}`);
    console.log(`  applied: ${Object.keys(patch).join(", ")}`);
  }
  console.log(apply ? `\ndone: ${plan.length} row(s)` : `\ndry run: ${plan.length} row(s). Look at the crops, then re-run with --apply.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
