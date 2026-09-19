/**
 * Rasterise an MH HSC Class-12 Maths board paper's pages for VISION
 * transcription, and VERIFY the printed cover against the manifest.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/render.ts <paperId>
 *   npx tsx scripts/mh-hsc-12-pyq/paper/render.ts --all
 *
 * Writes out/<id>/p-NN.png (gitignored) and out/<id>/text.md (the lossy text
 * layer — see dump-text.ts for what it is and is not good for).
 *
 * WHY THE COVER CHECK LIVES HERE. Two of the six source files are misnamed, both
 * calling a February sitting "March". The manifest records the cover's dates,
 * but a manifest is a CLAIM: nothing stopped it drifting from the PDFs, and a
 * wrong `pyq_month` is invisible once committed — it reads as a real sitting.
 * So the first step of the pipeline re-reads each cover and refuses to render a
 * paper whose cover disagrees with what the manifest says it is.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, PAPERS, requirePaper, type Paper } from "./config";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** Read (year, month, code) off the printed cover of a board paper. */
const COVER_PY = String.raw`
import fitz, sys, re, json
d = fitz.open(sys.argv[1])
txt = "\n".join(p.get_text() for p in d)
flat = re.sub(r"\s+", " ", txt)
ROM = {"I":1,"II":2,"III":3,"IV":4,"V":5,"VI":6,"VII":7,"VIII":8,"IX":9,"X":10,"XI":11,"XII":12}
out = {"year": None, "month": None, "code": None, "pages": len(d)}

# Layout 1 (J-165 / J-862 / J-174 / J-312 / J-384): a header box "YYYY <roman> DD".
m = re.search(r"(20\d\d)\s+([IVX]+)\s+(\d{1,2})\b", flat)
if m:
    out["year"] = int(m.group(1)); out["month"] = ROM.get(m.group(2))
# Layout 2 (J-276): an explicit "DATE : DD/MM/YYYY" line.
if out["year"] is None:
    m = re.search(r"DATE\s*:?\s*(\d{2})/(\d{2})/(20\d\d)", flat)
    if m:
        out["year"] = int(m.group(3)); out["month"] = int(m.group(2))
m = re.search(r"\b([A-Z])\s?-\s?(\d{3})\b", flat)
if m:
    out["code"] = m.group(1) + "-" + m.group(2)
print(json.dumps(out))
`;

const RENDER_PY = String.raw`
import fitz, sys
d = fitz.open(sys.argv[1]); outdir = sys.argv[2]
ZOOM = 3.0
for p in range(len(d)):
    d[p].get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM)).save(outdir + "/p-" + str(p + 1).zfill(2) + ".png")
print(len(d))
`;

function runPy(script: string, args: string[]): string {
  mkdirSync(OUT, { recursive: true });
  const file = join(OUT, `_py_${process.pid}.py`);
  writeFileSync(file, script);
  const res = spawnSync("python", [file, ...args], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  rmSync(file, { force: true });
  if (res.status !== 0) throw new Error(`python failed: ${res.stderr}`);
  return res.stdout.trim();
}

/** Refuse to proceed on a cover that disagrees with the manifest. */
function verifyCover(paper: Paper): { pages: number } {
  const cover = JSON.parse(runPy(COVER_PY, [paper.pdf])) as {
    year: number | null;
    month: number | null;
    code: string | null;
    pages: number;
  };

  const problems: string[] = [];
  if (cover.year === null || cover.month === null) {
    problems.push("could not read a date off the cover (neither layout matched)");
  } else {
    const month = MONTHS[cover.month - 1];
    if (cover.year !== paper.year) problems.push(`cover year ${cover.year} != manifest ${paper.year}`);
    if (month !== paper.month) problems.push(`cover month ${month} != manifest ${paper.month}`);
  }
  if (cover.code && cover.code !== paper.paperCode) {
    problems.push(`cover code ${cover.code} != manifest ${paper.paperCode}`);
  }

  if (problems.length) {
    throw new Error(
      `${paper.id}: printed cover disagrees with the manifest — ${problems.join("; ")}.\n` +
        `  file: ${paper.pdf}\n` +
        `  The COVER is truth. Fix scripts/mh-hsc-12-pyq/paper/config.ts, not the cover.`,
    );
  }
  return { pages: cover.pages };
}

function render(id: string) {
  const paper = requirePaper(id);
  const { pages } = verifyCover(paper);

  const dir = join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const n = Number(runPy(RENDER_PY, [paper.pdf, dir]));

  console.log(
    `${paper.id}  ${paper.month} ${paper.year}  ${paper.paperCode}  ` +
      `[cover VERIFIED]  ${n} pages -> ${dir}` +
      (paper.bankStatus === "reconcile" ? `  (reconcile: ${paper.bankRows} rows already in bank)` : ""),
  );
  if (pages !== n) console.warn(`  ⚠ page-count drift: cover probe saw ${pages}, render wrote ${n}`);
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/render.ts <paperId|--all>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
for (const id of arg === "--all" ? Object.keys(PAPERS) : [arg]) render(id);
