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
import { readFileSync, existsSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname, extname } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { uploadImage, MAX_SIZE_BYTES } from "../../src/lib/storage/images";
import { literalNewlineFields } from "../../src/lib/upload/textGuard";
import { cropFigures, type FigSpec } from "../lib/figures/crop";
import { stripFigureDescriptions, removeExactlyOnce } from "../lib/figures/strip";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** "all" clears the field: for a pictured option whose text is only a description. */
type StripStep = "brackets" | "all" | { remove: string; with?: string };
/** One step, or several applied in order (a bracket block plus a table the
 *  transcriber added after it). Each `remove` must match exactly once. */
type Strip = StripStep | StripStep[] | null;
type ManifestRow = {
  id: string;
  /** Key into `figures`. Omitted when the source prints no figure and the fix
   *  is only to remove a description the transcriber invented. */
  figure?: string;
  /** How to remove the prose stand-in from `text`; null keeps the text. */
  stripText?: Strip;
  /** Same for `context` (a set's shared passage is stored on every member). */
  stripContext?: Strip;
  /** Option label -> figure key, when the OPTIONS are pictures. */
  options?: Record<string, string>;
  /** How to remove each pictured option's prose stand-in. */
  stripOptions?: Strip;
  /** Option label -> new text, when the stored option text was itself a
   *  description and the printed label is all that should remain. */
  optionText?: Record<string, string>;
  /** Same for the Marathi translation's text (question_translations, lang 'mr'),
   *  which carries its own copy of the stand-in on bilingual exams. */
  stripTranslation?: Strip;
  note?: string;
};
/** A region of the batch PDF, or an image embedded in a Word file (used when a
 *  converted PDF dropped the picture: the .docx still holds the original). */
/** `scale` enlarges a tiny embedded raster by whole pixels, keeping thin lines sharp. */
type FigPart = FigSpec | { docx: string; media: string; scale?: number };
/** `existing` reuses a storage path a set sibling already carries (nothing is
 *  uploaded). Otherwise one part, or several joined into one image: top to bottom by default (an
 *  example citing two printed figures), side by side with `row`. */
type FigureEntry = FigPart | { stack: FigPart[]; row?: boolean } | { existing: string };
type Manifest = { batch: string; pdf?: string; figures: Record<string, FigureEntry>; rows: ManifestRow[] };

const safe = (key: string) => key.replace(/[^A-Za-z0-9]+/g, "_");
const isDocx = (p: FigPart): p is { docx: string; media: string; scale?: number } => "docx" in p;

function python(script: string[], args: string[], what: string): void {
  const res = spawnSync("python", ["-c", script.join(String.fromCharCode(10)), ...args], { encoding: "utf8" });
  if (res.status !== 0) throw new Error(`${what} failed: ${res.stderr}`);
}

/** Produce one image file per figure key. */
function cropAll(pdf: string | undefined, figures: Record<string, FigureEntry>, outDir: string): Record<string, string> {
  mkdirSync(outDir, { recursive: true });
  const parts = new Map<string, FigPart[]>();
  for (const [key, f] of Object.entries(figures)) if (!("existing" in f)) parts.set(key, "stack" in f ? f.stack : [f]);

  const flat: Record<string, FigSpec> = {};
  const files: Record<string, string> = {};
  for (const [key, list] of parts) {
    list.forEach((part, i) => {
      const id = list.length > 1 ? `${key}__part${i}` : key;
      if (!isDocx(part)) {
        flat[id] = part;
        return;
      }
      if (!existsSync(part.docx)) throw new Error(`source .docx not found: ${part.docx}`);
      const target = join(outDir, `fig-${safe(id)}${extname(part.media)}`);
      python([
        "import sys, io, zipfile",
        "from PIL import Image",
        "raw=zipfile.ZipFile(sys.argv[2]).read('word/media/'+sys.argv[3]); k=int(sys.argv[4])",
        "if k<=1: open(sys.argv[1],'wb').write(raw)",
        "else:",
        "    im=Image.open(io.BytesIO(raw)); im.resize((im.width*k,im.height*k),Image.NEAREST).save(sys.argv[1])",
      ], [target, part.docx, part.media, String(part.scale ?? 1)], `extracting ${part.media}`);
      files[id] = target;
    });
  }
  if (Object.keys(flat).length) {
    // A part may name its own `pdf` (a question citing figures from two
    // chapters); everything else crops from the batch PDF.
    const byPdf = new Map<string, Record<string, FigSpec>>();
    for (const [id, spec] of Object.entries(flat)) {
      const src = (spec as FigSpec & { pdf?: string }).pdf ?? pdf;
      if (!src || !existsSync(src)) throw new Error(`source PDF not found: ${src}`);
      (byPdf.get(src) ?? byPdf.set(src, {}).get(src)!)[id] = spec;
    }
    for (const [src, specs] of byPdf) Object.assign(files, cropFigures(src, specs, outDir));
    // Paint `mask` regions white, then apply `rotate`. Masks: body text that sits beside a margin figure
    // and that no rectangle can leave out. Masks are page fractions, like bbox.
    for (const [id, spec] of Object.entries(flat)) {
      const masks = (spec as FigSpec & { mask?: number[][] }).mask;
      const turn = (spec as FigSpec & { rotate?: number }).rotate;
      if (!masks?.length && !turn) continue;
      python([
        "import sys, json",
        "from PIL import Image, ImageDraw",
        "im=Image.open(sys.argv[1]).convert('RGB'); b=json.loads(sys.argv[2]); W,H=im.size",
        "fx=lambda v:(v-b[0])/(b[2]-b[0])*W; fy=lambda v:(v-b[1])/(b[3]-b[1])*H",
        "dr=ImageDraw.Draw(im)",
        "for m in json.loads(sys.argv[3]): dr.rectangle([fx(m[0]),fy(m[1]),fx(m[2]),fy(m[3])], fill='white')",
        // `rotate` turns a figure printed sideways upright: degrees clockwise.
        "k=int(sys.argv[4])",
        "im=im.rotate(-k, expand=True) if k else im",
        "im.save(sys.argv[1])",
      ], [files[id], JSON.stringify(spec.bbox), JSON.stringify(masks ?? []), String(turn ?? 0)], `post-processing ${id}`);
    }
  }

  const out: Record<string, string> = {};
  for (const [key, f] of Object.entries(figures)) {
    if ("existing" in f) continue;
    if (!("stack" in f)) {
      out[key] = files[key];
      continue;
    }
    const target = join(outDir, `fig-${safe(key)}.png`);
    python([
      "import sys",
      "from PIL import Image",
      "row=sys.argv[2]=='row'; ims=[Image.open(p).convert('RGB') for p in sys.argv[3:]]; gap=24",
      "w=sum(i.width for i in ims)+gap*(len(ims)-1) if row else max(i.width for i in ims)",
      "h=max(i.height for i in ims) if row else sum(i.height for i in ims)+gap*(len(ims)-1)",
      "c=Image.new('RGB',(w,h),'white'); o=0",
      "for i in ims:",
      "    c.paste(i,(o,(h-i.height)//2) if row else ((w-i.width)//2,o)); o+=(i.width if row else i.height)+gap",
      "c.save(sys.argv[1], optimize=True)",
    ], [target, f.row ? "row" : "column", ...f.stack.map((_, i) => files[`${key}__part${i}`])], `joining ${key}`);
    out[key] = target;
  }
  // Storage refuses objects over 1 MB (MAX_SIZE_BYTES). A large map at 4x is
  // over it: reduce to a 256-colour PNG first (lossless enough for line art and
  // flat map colours), and to JPEG only if that is still too big.
  for (const [key, file] of Object.entries(out)) {
    if (statSync(file).size <= MAX_SIZE_BYTES * 0.95) continue;
    const small = file.replace(/\.(png|jpe?g)$/i, "") + ".small";
    python([
      "import sys, os",
      "from PIL import Image",
      "src, base, limit = sys.argv[1], sys.argv[2], int(sys.argv[3])",
      "im = Image.open(src).convert('RGB')",
      "while True:",
      "    im.quantize(256, method=Image.Quantize.MEDIANCUT).save(base + '.png', optimize=True)",
      "    if os.path.getsize(base + '.png') <= limit: print(base + '.png'); break",
      "    im.save(base + '.jpg', quality=85, optimize=True)",
      "    if os.path.getsize(base + '.jpg') <= limit: print(base + '.jpg'); break",
      "    im = im.resize((im.width * 4 // 5, im.height * 4 // 5), Image.LANCZOS)",
    ], [file, small, String(Math.floor(MAX_SIZE_BYTES * 0.95))], `shrinking ${key}`);
    const png = `${small}.png`, jpg = `${small}.jpg`;
    out[key] = existsSync(png) && statSync(png).size <= MAX_SIZE_BYTES * 0.95 ? png : jpg;
  }
  return out;
}

function applyStrip(value: string | null, strip: Strip | undefined): string | null {
  if (!value || !strip) return value;
  let out = value;
  for (const step of Array.isArray(strip) ? strip : [strip]) {
    if (step === "all") out = "";
    else if (step === "brackets") out = stripFigureDescriptions(out);
    else if (step.with === undefined) out = removeExactlyOnce(out, step.remove);
    else {
      // Replace, keeping what the description also carried that is not about the figure.
      const n = out.split(step.remove).length - 1;
      // Already replaced on an earlier run (a batch that stopped part-way).
      if (n === 0 && out.includes(step.with)) continue;
      if (n !== 1) throw new Error(`replace target found ${n} times: ${step.remove.slice(0, 60)}`);
      out = out.replace(step.remove, () => step.with as string);
    }
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
  for (const r of m.rows) {
    if (!r.figure && !r.stripText && !r.stripContext) throw new Error(`row ${r.id} has neither a figure nor a strip`);
    for (const key of [...(r.figure ? [r.figure] : []), ...Object.values(r.options ?? {})]) {
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
  const withOptions = m.rows.filter((r) => r.options || r.optionText).map((r) => r.id);
  const { data: optRows, error: oErr } = withOptions.length
    ? await db.from("options").select("id, question_id, label, text, image_url").in("question_id", withOptions)
    : { data: [], error: null };
  if (oErr) throw new Error(oErr.message);
  const withTr = m.rows.filter((r) => r.stripTranslation).map((r) => r.id);
  const { data: trRows, error: tErr } = withTr.length
    ? await db.from("question_translations").select("question_id, text").eq("lang", "mr").in("question_id", withTr)
    : { data: [], error: null };
  if (tErr) throw new Error(tErr.message);

  // Plan every change first, so a bad row stops the batch before any write.
  const plan = m.rows.map((r) => {
    const q = byId.get(r.id);
    if (!q) throw new Error(`question ${r.id} not found`);
    const text = applyStrip(q.text as string | null, r.stripText);
    const context = applyStrip(q.context as string | null, r.stripContext);
    const bad = literalNewlineFields({ text: text ?? "", context: context ?? "", solution: "" });
    if (bad.length) throw new Error(`${r.id}: stripping left a literal \\n in ${bad.join(", ")}`);
    const labels = new Set([...Object.keys(r.options ?? {}), ...Object.keys(r.optionText ?? {})]);
    const opts = [...labels].sort().map((label) => {
      const o = (optRows ?? []).find((x) => x.question_id === r.id && x.label === label);
      if (!o) throw new Error(`${r.id}: no option ${label}`);
      const key = r.options?.[label] ?? null;
      const text = r.optionText?.[label] ?? applyStrip(o.text as string | null, r.stripOptions) ?? "";
      return { o, key, text };
    });
    let tr: { before: string; after: string } | null = null;
    if (r.stripTranslation) {
      const t = (trRows ?? []).find((x) => x.question_id === r.id);
      if (!t) throw new Error(`${r.id}: stripTranslation set but no 'mr' translation`);
      const after = applyStrip(t.text as string, r.stripTranslation) ?? "";
      if (!after.trim()) throw new Error(`${r.id}: stripping would empty the translation`);
      tr = { before: t.text as string, after };
    }
    return { r, q, text, context, opts, tr };
  });

  // Keep the rows exactly as they were before the first --apply, so a batch can
  // be reverted. Written once; a re-run never overwrites the original state.
  const backup = join(__dirname, "backup", `${batch}.before.json`);
  if (apply && !existsSync(backup)) {
    mkdirSync(dirname(backup), { recursive: true });
    const before = plan.map(({ q, opts, tr }) => ({
      id: q.id,
      ...(tr ? { translation_mr: tr.before } : {}),
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
    // A set sibling may already carry the figure: reuse its stored object.
    const f = m.figures[key];
    if ("existing" in f) return f.existing;
    let path = uploaded.get(key);
    if (!path) {
      const img = crops[key];
      path = await uploadImage(db, orgId, readFileSync(img), img.endsWith(".jpg") ? "image/jpeg" : "image/png");
      uploaded.set(key, path);
    }
    return path;
  };
  for (const { r, q, text, context, opts, tr } of plan) {
    const textChanged = text !== q.text;
    const contextChanged = context !== q.context;
    console.log(`\n[${q.question_number ?? "?"}] ${r.id}  figure=${r.figure ?? "none"}${q.image_url ? "  (image already set)" : ""}`);
    if (textChanged) console.log(`  text:    ${String(q.text).replace(/\s+/g, " ").slice(0, 140)}\n       -> ${String(text).replace(/\s+/g, " ").slice(0, 140)}`);
    if (contextChanged) console.log(`  context: ${String(q.context).replace(/\s+/g, " ").slice(0, 140)}\n       -> ${String(context).replace(/\s+/g, " ").slice(0, 140)}`);
    for (const { o, key, text: ot } of opts) {
      console.log(`  option ${o.label}: figure=${key ?? "-"}${o.image_url ? " (image already set)" : ""}${ot !== o.text ? `  text -> ${JSON.stringify(ot.slice(0, 60))}` : ""}`);
    }
    if (tr && tr.after !== tr.before) console.log(`  mr text: ${tr.before.replace(/\s+/g, " ").slice(0, 100)}\n       -> ${tr.after.replace(/\s+/g, " ").slice(0, 100)}`);
    if (!apply) continue;

    if (tr && tr.after !== tr.before) {
      const { error: e3 } = await db.from("question_translations").update({ text: tr.after }).eq("question_id", r.id).eq("lang", "mr");
      if (e3) throw new Error(`${r.id} translation: ${e3.message}`);
      console.log("  applied: translation text");
    }

    for (const { o, key, text: ot } of opts) {
      const oPatch: Record<string, string> = {};
      if (key && !o.image_url) oPatch.image_url = await upload(key, q.org_id as string);
      if (ot !== o.text) oPatch.text = ot;
      if (Object.keys(oPatch).length === 0) continue;
      const { error: e2 } = await db.from("options").update(oPatch).eq("id", o.id);
      if (e2) throw new Error(`${r.id} option ${o.label}: ${e2.message}`);
    }
    const patch: Record<string, string | null> = {};
    if (r.figure && !q.image_url) patch.image_url = await upload(r.figure, q.org_id as string);
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
