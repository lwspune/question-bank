/**
 * Figure verification for a NEET paper — the un-skippable review step before
 * flip-public. It crops every figure's CURRENT bbox, builds a single contact-sheet
 * HTML (crop + Q# + subtopic + stem + correct answer + heuristic flags), and writes
 * data/<paper>.figure-verify.json recording a status per figure.
 *
 *   npx tsx scripts/neet/verify-figures.ts <paperId>              # build contact sheet + refresh verdict
 *   npx tsx scripts/neet/verify-figures.ts <paperId> --ok=3,5     # mark figures reviewed-OK
 *   npx tsx scripts/neet/verify-figures.ts <paperId> --ok=all     # mark ALL OK (after eyeballing the sheet)
 *   npx tsx scripts/neet/verify-figures.ts <paperId> --block=39   # keep a figure blocked
 *
 * Every figure starts "needs-review"; flip-public refuses to publish the paper until
 * all are "ok". Open the printed contact-sheet path, eyeball each crop (does it leak
 * the answer? clip the figure? show the wrong region?), then mark --ok / --block.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { createClient } from "@supabase/supabase-js";
import { EXAM_ID, OUT, DATA, requirePaper } from "./config";
import { figureFlags, bboxHeight, mergeVerify, blockedFigureQuestions, extractStemLabels, type FigureEntry, type VerifyRecord, type VerifyStatus } from "../lib/figures/verify";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}
function opt(name: string): string | undefined {
  const p = process.argv.find((a) => a.startsWith(`--${name}=`));
  return p ? p.slice(name.length + 3) : undefined;
}

function loadManifest(paperId: string): Record<string, FigureEntry> {
  const files = readdirSync(DATA).filter((f) => f.startsWith(`${paperId}.figures`) && f.endsWith(".json"));
  const out: Record<string, FigureEntry> = {};
  for (const f of files) Object.assign(out, JSON.parse(readFileSync(join(DATA, f), "utf8")));
  return out;
}

const verifyPath = (paperId: string) => join(DATA, `${paperId}.figure-verify.json`);

/** Crop each figure's current bbox: return base64 PNGs for the HTML AND write a
 *  labeled montage PNG (montagePath) for a quick single-image review. */
function cropBase64(pdf: string, figs: Record<string, FigureEntry>, montagePath: string): Record<string, string> {
  const py = `
import fitz, json, sys, base64
from PIL import Image, ImageDraw
pdf, figs, montage = sys.argv[1], json.loads(sys.argv[2]), sys.argv[3]
d = fitz.open(pdf); out = {}; cells = []
CW = 540
for q in sorted(figs, key=lambda x: int(x)):
    spec = figs[q]; pg = d[spec["page"]-1]; r = pg.rect; fx0,fy0,fx1,fy1 = spec["bbox"]
    clip = fitz.Rect(r.x0+fx0*r.width, r.y0+fy0*r.height, r.x0+fx1*r.width, r.y0+fy1*r.height)
    pix = pg.get_pixmap(matrix=fitz.Matrix(3,3), clip=clip)
    png = pix.tobytes("png"); out[q] = base64.b64encode(png).decode()
    im = Image.open(__import__("io").BytesIO(png)).convert("RGB")
    s = CW/im.width; im = im.resize((CW, max(1,int(im.height*s))))
    h = im.height + 20 + 6
    cell = Image.new("RGB", (CW+8, h), (255,255,255))
    dr = ImageDraw.Draw(cell); dr.rectangle([0,0,CW+7,h-1], outline=(210,210,210))
    dr.text((5,4), "Q%s  bbox=%s" % (q, spec["bbox"]), fill=(190,0,0))
    cell.paste(im, (4, 20)); cells.append(cell)
# two columns
COLW = CW+16; pairs = [cells[i:i+2] for i in range(0,len(cells),2)]; rows=[]
for p in pairs:
    hh = max(c.height for c in p); row = Image.new("RGB", (COLW*2, hh), (235,235,235))
    for j,c in enumerate(p): row.paste(c, (j*COLW+4, 4))
    rows.append(row)
H = sum(rr.height+8 for rr in rows) or 10
canvas = Image.new("RGB", (COLW*2, H), (235,235,235)); y=0
for rr in rows: canvas.paste(rr, (0,y)); y += rr.height+8
canvas.save(montage)
print(json.dumps(out))
`;
  const res = spawnSync("python", ["-c", py, pdf, JSON.stringify(figs), montagePath], { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (res.status !== 0) throw new Error(`crop failed: ${res.stderr}`);
  return JSON.parse(res.stdout.trim().split("\n").pop()!);
}

function esc(s: string): string {
  return (s || "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
}

async function main() {
  const paper = requirePaper(process.argv[2]);
  loadEnv();
  const manifest = loadManifest(paper.id);
  const nums = Object.keys(manifest).sort((a, b) => Number(a) - Number(b));

  const prior: Record<string, VerifyRecord> = existsSync(verifyPath(paper.id)) ? JSON.parse(readFileSync(verifyPath(paper.id), "utf8")) : {};

  // handle mark commands (--ok / --block), which just mutate statuses on the existing verdict
  const okArg = opt("ok");
  const blockArg = opt("block");
  if (okArg || blockArg) {
    const next = { ...prior };
    const setStatus = (list: string, status: VerifyStatus) => {
      const targets = list === "all" ? Object.keys(next) : list.split(",").map((s) => s.trim()).filter(Boolean);
      for (const q of targets) if (next[q]) next[q] = { ...next[q], status };
    };
    if (okArg) setStatus(okArg, "ok");
    if (blockArg) setStatus(blockArg, "blocked");
    writeFileSync(verifyPath(paper.id), JSON.stringify(next, null, 2) + "\n", "utf8");
    const blocked = blockedFigureQuestions(next);
    console.log(`marked. ${Object.keys(next).length - blocked.length}/${Object.keys(next).length} ok; ${blocked.length} not-ok${blocked.length ? `: Q${blocked.join(", Q")}` : ""}`);
    return;
  }

  // fetch DB metadata for the contact sheet
  const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
  const { data: rows, error } = await client
    .from("questions")
    .select("question_number, text, visibility, subtopics(name), options(label, is_correct)")
    .eq("exam_id", EXAM_ID)
    .eq("source_file", paper.sourceFile)
    .in("question_number", nums);
  if (error) throw new Error(`DB fetch: ${error.message}`);
  const meta = new Map<string, { stem: string; subtopic: string; answer: string; visibility: string }>();
  for (const r of rows ?? []) {
    const correct = (r.options as { label: string; is_correct: boolean }[] | null)?.find((o) => o.is_correct)?.label ?? "?";
    const sub = r.subtopics as unknown as { name: string } | { name: string }[] | null;
    meta.set(String(r.question_number), {
      stem: r.text ?? "",
      subtopic: (Array.isArray(sub) ? sub[0]?.name : sub?.name) ?? "",
      answer: correct,
      visibility: r.visibility as string,
    });
  }

  // compute flags + merge verdict
  const computed: Record<string, { bboxHeight: number; flags: string[] }> = {};
  for (const q of nums) computed[q] = { bboxHeight: bboxHeight(manifest[q].bbox), flags: figureFlags(manifest[q]) };
  const verdict = mergeVerify(computed, prior);
  writeFileSync(verifyPath(paper.id), JSON.stringify(verdict, null, 2) + "\n", "utf8");

  // build the contact sheet (+ a montage PNG for quick single-image review)
  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });
  const montagePath = join(OUT, `${paper.id}-figure-verify.png`);
  const crops = cropBase64(paper.pdf, manifest, montagePath);
  const cards = nums.map((q) => {
    const m = meta.get(q);
    const v = verdict[q];
    const flagHtml = v.flags.length ? `<div class="flags">⚠ ${v.flags.map(esc).join("<br>⚠ ")}</div>` : "";
    const badge = v.status === "ok" ? "🟢 ok" : v.status === "blocked" ? "🔴 blocked" : "🟡 needs-review";
    const labels = extractStemLabels(m?.stem ?? "");
    const labelHtml = labels.length
      ? `<div class="labels">✓ confirm present in crop: ${labels.map((l) => `<code>${esc(l)}</code>`).join(" ")}</div>`
      : "";
    return `<div class="card ${v.status}">
      <div class="hd">Q${q} · ${badge} · h=${v.bboxHeight} · ans <b>${esc(m?.answer ?? "?")}</b> · ${esc(m?.subtopic ?? "")}</div>
      <img src="data:image/png;base64,${crops[q] ?? ""}"/>
      ${flagHtml}
      ${labelHtml}
      <div class="stem">${esc((m?.stem ?? "").slice(0, 240))}</div>
    </div>`;
  }).join("\n");
  const html = `<!doctype html><meta charset="utf-8"><title>${paper.id} figure verify</title>
<style>body{font:13px system-ui;background:#f4f4f5;margin:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:12px}
.card{background:#fff;border:1px solid #ddd;border-radius:8px;padding:8px}
.card.needs-review{border-left:4px solid #f5a623}.card.blocked{border-left:4px solid #e0322f}.card.ok{border-left:4px solid #2ca24a}
.hd{font-weight:600;margin-bottom:6px}.stem{color:#555;margin-top:6px;font-family:Georgia,serif}
.flags{color:#b45309;background:#fffbeb;padding:4px 6px;border-radius:4px;margin-top:4px}
.labels{color:#3730a3;background:#eef2ff;padding:4px 6px;border-radius:4px;margin-top:4px;font-size:12px}
.labels code{background:#e0e7ff;padding:1px 4px;border-radius:3px;font-weight:600}
img{max-width:100%;border:1px solid #eee;background:#fff}</style>
<h2>NEET ${paper.id} — ${nums.length} figures — review each, then: verify-figures.ts ${paper.id} --ok=all (and --block=&lt;q&gt; for any bad ones)</h2>
<div class="grid">${cards}</div>`;
  const htmlPath = join(OUT, `${paper.id}-figure-verify.html`);
  writeFileSync(htmlPath, html, "utf8");

  const blocked = blockedFigureQuestions(verdict);
  const preflagged = nums.filter((q) => verdict[q].flags.length);
  console.log(`${paper.id}: ${nums.length} figures. Contact sheet -> ${htmlPath}`);
  console.log(`  montage (quick review) -> ${montagePath}`);
  if (preflagged.length) console.log(`  heuristic pre-flags (eyeball first): Q${preflagged.join(", Q")}`);
  console.log(`  gate: ${blocked.length ? `${blocked.length} not-ok (blocks flip-public): Q${blocked.join(", Q")}` : "all ok"}`);
  console.log(`  after review: verify-figures.ts ${paper.id} --ok=all  (then --block=<q> for any still-bad)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
