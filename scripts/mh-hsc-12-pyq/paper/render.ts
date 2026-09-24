/**
 * Rasterise an MH HSC Class-12 board paper's pages for VISION transcription,
 * and VERIFY the printed cover against the manifest.
 *
 *   npx tsx scripts/mh-hsc-12-pyq/paper/render.ts <paperId>
 *   npx tsx scripts/mh-hsc-12-pyq/paper/render.ts --all
 *   npx tsx scripts/mh-hsc-12-pyq/paper/render.ts --subject=Physics
 *
 * Writes out/<id>/p-NN.png (gitignored) and out/<id>/text.md (the lossy text
 * layer — see dump-text.ts for what it is and is not good for).
 *
 * WHY THE COVER CHECK LIVES HERE. Six of the thirteen source files are misnamed.
 * Two Maths files call a February sitting "March"; Physics is worse — three of
 * its files do the same and a fourth calls the JULY supplementary "June". The
 * manifest records the cover's dates, but a manifest is a CLAIM: nothing stopped
 * it drifting from the PDFs, and a wrong `pyq_month` is invisible once committed
 * — it reads as a real sitting. So the first step of the pipeline re-reads each
 * cover and refuses to render a paper whose cover disagrees with the manifest.
 *
 * ONE PAPER HAS NO BOARD COVER TO READ. `phy-feb-2023` is a publisher
 * reproduction: no seat number, no subject code, no date box, just a
 * "Board Question Paper: February 2023" heading. It is verified against that
 * heading instead, and the weaker check is PRINTED rather than passed over in
 * silence — a run whose output does not distinguish the two has told you
 * nothing about which papers were actually cover-verified.
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
MON = ["January","February","March","April","May","June",
       "July","August","September","October","November","December"]
out = {"year": None, "month": None, "code": None, "pages": len(d), "layout": None}

# Layout 1 (J-165 / J-862 / J-174 / J-312 / J-384 / J-837 / J-287 / J-129 /
# J-339 / J-137): a header box "YYYY <roman> DD".
m = re.search(r"(20\d\d)\s+([IVX]+)\s+(\d{1,2})\b", flat)
if m:
    out["year"] = int(m.group(1)); out["month"] = ROM.get(m.group(2)); out["layout"] = "cover-box"
# Layout 2 (J-276 / J-229): an explicit "DATE : DD/MM/YYYY" line.
if out["year"] is None:
    m = re.search(r"DATE\s*:?\s*(\d{2})/(\d{2})/(20\d\d)", flat)
    if m:
        out["year"] = int(m.group(3)); out["month"] = int(m.group(2)); out["layout"] = "cover-date"
# Layout 3: NOT a board print. A publisher reproduction heads the paper
# "Board Question Paper: February 2023" and carries no seat number, subject
# code or date box. Reported as its own layout so the caller can refuse to
# treat it as a cover-verified sitting.
if out["year"] is None:
    m = re.search(r"Board Question Paper\s*:?\s*([A-Z][a-z]+)\s+(20\d\d)", flat)
    if m and m.group(1) in MON:
        out["year"] = int(m.group(2)); out["month"] = MON.index(m.group(1)) + 1
        out["layout"] = "reproduction-heading"
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
function verifyCover(paper: Paper): { pages: number; layout: string } {
  const cover = JSON.parse(runPy(COVER_PY, [paper.pdf])) as {
    year: number | null;
    month: number | null;
    code: string | null;
    pages: number;
    layout: string | null;
  };

  const problems: string[] = [];
  if (cover.year === null || cover.month === null) {
    problems.push("could not read a date off the cover (no layout matched)");
  } else {
    const month = MONTHS[cover.month - 1];
    if (cover.year !== paper.year) problems.push(`cover year ${cover.year} != manifest ${paper.year}`);
    if (month !== paper.month) problems.push(`cover month ${month} != manifest ${paper.month}`);
  }
  if (cover.code && paper.paperCode !== "n/a" && cover.code !== paper.paperCode) {
    problems.push(`cover code ${cover.code} != manifest ${paper.paperCode}`);
  }

  // The two claims must agree BOTH ways, or the flag is decoration. A board
  // print that fell back to the reproduction heading means the cover did not
  // parse; a flagged paper that produced a real cover is not a reproduction at
  // all, and its provenance caveat would be a lie carried on every row.
  const isReproduction = cover.layout === "reproduction-heading";
  if (paper.thirdParty && !isReproduction) {
    problems.push(`manifest flags this as a reproduction but it printed a real cover (${cover.layout})`);
  }
  if (!paper.thirdParty && isReproduction) {
    problems.push("no board cover found — only a publisher heading, so this is not the board print");
  }
  if (!paper.thirdParty && !cover.code) {
    problems.push("no subject code on the cover, so (year, month) has no independent cross-check");
  }

  if (problems.length) {
    throw new Error(
      `${paper.id}: printed cover disagrees with the manifest — ${problems.join("; ")}.\n` +
        `  file: ${paper.pdf}\n` +
        `  The COVER is truth. Fix scripts/mh-hsc-12-pyq/paper/config.ts, not the cover.`,
    );
  }
  return { pages: cover.pages, layout: cover.layout ?? "unknown" };
}

function render(id: string) {
  const paper = requirePaper(id);
  const { pages, layout } = verifyCover(paper);

  const dir = join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const n = Number(runPy(RENDER_PY, [paper.pdf, dir]));

  const verdict =
    layout === "reproduction-heading"
      ? "[heading only — NO BOARD COVER]"
      : `[cover VERIFIED · ${layout}]`;
  console.log(
    `${paper.id.padEnd(14)} ${paper.subject.padEnd(11)} ${`${paper.month} ${paper.year}`.padEnd(15)} ` +
      `${paper.paperCode.padEnd(5)} ${verdict}  ${n} pages -> ${dir}` +
      (paper.bankStatus === "reconcile" ? `  (reconcile: ${paper.bankRows} rows already in bank)` : ""),
  );
  if (pages !== n) console.warn(`  ⚠ page-count drift: cover probe saw ${pages}, render wrote ${n}`);
}

const arg = process.argv[2];
if (!arg) {
  console.error(`usage: tsx scripts/mh-hsc-12-pyq/paper/render.ts <paperId|--all|--subject=<name>>`);
  console.error(`known: ${Object.keys(PAPERS).join(", ")}`);
  process.exit(1);
}
const subject = arg.startsWith("--subject=") ? arg.slice("--subject=".length) : null;
const ids = subject
  ? Object.values(PAPERS).filter((p) => p.subject === subject).map((p) => p.id)
  : arg === "--all"
    ? Object.keys(PAPERS)
    : [arg];
if (!ids.length) throw new Error(`no papers for ${JSON.stringify(arg)}`);
for (const id of ids) render(id);
