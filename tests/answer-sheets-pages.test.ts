/**
 * scripts/grading/pages.py (answer-sheet grading, migration 0175): the
 * student's files made ready to mark (upright, PDFs split into pages, a grid
 * copy to read positions off), a page turned with its marks, the marks drawn,
 * and the report PDF. Runs the REAL script on made-up pages.
 *
 * Skipped where PyMuPDF and Pillow are not installed (the CI runner): grading
 * runs on the grader's Windows machine, and this test is the check there.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkSheet, reportPayload } from "@/lib/answerSheets/marking";
import type { PaperItemRow } from "@/lib/questionPapers/listing";

const SCRIPT = join(process.cwd(), "scripts", "grading", "pages.py");
const python = (args: string[]) => spawnSync("python", ["-E", "-P", ...args], { encoding: "utf8" });
const HAS_LIBS = python(["-c", "import fitz, PIL"]).status === 0;

// Two scans: a landscape photo and a two-page PDF, made by the libraries themselves.
const MAKE_SCANS = `
import sys, fitz
from PIL import Image
d = sys.argv[1]
Image.new('RGB', (900, 600), 'white').save(d + '/01.jpg')
doc = fitz.open()
for _ in range(2):
    doc.new_page(width=595, height=842)
doc.save(d + '/02.pdf')
`;

const run = (cmd: string, dir: string, ...rest: string[]) => {
  const r = python([SCRIPT, cmd, dir, ...rest]);
  if (r.status !== 0) throw new Error(`pages.py ${cmd}: ${r.stderr}`);
  return JSON.parse(r.stdout);
};

describe.skipIf(!HAS_LIBS)("pages.py", () => {
  let dir = "";

  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "grading-pages-"));
    mkdirSync(join(dir, "scans"));
    const made = python(["-c", MAKE_SCANS, join(dir, "scans")]);
    if (made.status !== 0) throw new Error(made.stderr);
  });

  afterAll(() => {
    if (dir) rmSync(dir, { recursive: true, force: true });
  });

  it("prepares every page: a photo as is, a PDF one image per page, each with a grid copy", () => {
    const pages = run("prepare", dir);
    expect(pages.map((p: { page: number; source: string }) => [p.page, p.source])).toEqual([
      [1, "scans/01.jpg"],
      [2, "scans/02.pdf#1"],
      [3, "scans/02.pdf#2"],
    ]);
    for (const n of ["01", "02", "03"]) {
      expect(existsSync(join(dir, "pages", `${n}.jpg`))).toBe(true);
      expect(existsSync(join(dir, "grid", `${n}.jpg`))).toBe(true);
    }
  });

  it("turns a sideways page and moves its marks with it", () => {
    writeFileSync(join(dir, "grade.json"), JSON.stringify({ marks: [{ page: 1, position: 1, kind: "tick", x: 10, y: 20 }] }));
    const r = run("rotate", dir, "1", "left");
    expect([r.width, r.height, r.marksMoved]).toEqual([600, 900, 1]);
    // Turning left, the right edge becomes the top: (x, y) -> (y, 100 - x).
    const g = JSON.parse(readFileSync(join(dir, "grade.json"), "utf8"));
    expect([g.marks[0].x, g.marks[0].y]).toEqual([20, 90]);
  });

  // A regrade prepares the pages again from the scans: the turns a grader made
  // are recorded (pages.json, then the database at commit) and applied again,
  // so saved marks land on the page they were placed on.
  it("records each page's quarter-turns clockwise, and applies them on a fresh prepare", () => {
    const turns = () => JSON.parse(readFileSync(join(dir, "pages", "pages.json"), "utf8")).map((p: { turns: number }) => p.turns);
    expect(turns()).toEqual([3, 0, 0]); // the left turn above
    run("rotate", dir, "2", "right");
    expect(turns()).toEqual([3, 1, 0]);

    const again = run("prepare", dir, "--turns=3,1,0");
    expect(again.map((p: { width: number; height: number; turns: number }) => [p.width, p.height, p.turns])).toEqual([
      [600, 900, 3],
      [1755, 1240, 1], // a PDF page renders at 150 dpi: 1240 x 1755
      [1240, 1755, 0],
    ]);
  });

  it("refuses turns that do not match the pages", () => {
    expect(python([SCRIPT, "prepare", dir, "--turns=1,0"]).status).not.toBe(0);
    expect(python([SCRIPT, "prepare", dir, "--turns=0,5,0"]).status).not.toBe(0);
    run("prepare", dir); // back to as-scanned for the drawing test
  });

  it("draws the marks and builds the report PDF: the summary, then every marked page", () => {
    const items: PaperItemRow[] = [1, 2].map((position) => ({
      position,
      printedNumber: String(position),
      section: "A",
      marks: 2,
      alternativeTo: null,
      partOf: null,
      caseKey: null,
      questionId: `q-${position}`,
    }));
    const file = {
      submissionId: "s",
      wentWell: "Neat working.",
      nextSteps: "Write the unit.",
      grades: [
        { position: 1, max: 2, outcome: "scored", awarded: 2, earned: "Right.", missing: "", cause: "", topic: "" },
        { position: 2, max: 2, outcome: "scored", awarded: 1, earned: "Method.", missing: "Δu ≠ 0 not stated.", cause: "incomplete", topic: "The condition Δu ≠ 0" },
      ],
      marks: [
        { page: 1, position: 1, kind: "tick", x: 30, y: 30 },
        { page: 1, position: 1, kind: "score", x: 80, y: 30 },
        { page: 3, position: 2, kind: "circle", x: 50, y: 50, w: 20, h: 6 },
        { page: 3, position: 2, kind: "note", x: 60, y: 70, text: "State Δu ≠ 0", to: { x: 50, y: 52 } },
        { page: 3, position: 2, kind: "score", x: 85, y: 50 },
      ],
    };
    const check = checkSheet({ items, totalMarks: 4, file, pageCount: 3 });
    if (!check.ok) throw new Error(check.errors.join("\n"));
    mkdirSync(join(dir, "preview"), { recursive: true });
    writeFileSync(join(dir, "preview", "marks.json"), check.payloadJson);
    expect(run("draw", dir)).toHaveLength(3);
    // The drawn page is not the clean page.
    expect(readFileSync(join(dir, "preview", "03.jpg")).equals(readFileSync(join(dir, "pages", "03.jpg")))).toBe(false);

    const payload = reportPayload({ title: "Test paper", gradedOn: "21 Oct 2026", totalMax: 4, check });
    writeFileSync(join(dir, "preview", "report.json"), JSON.stringify(payload));
    run("report", dir);
    const count = python(["-c", "import fitz,sys; print(fitz.open(sys.argv[1]).page_count)", join(dir, "preview", "report.pdf")]);
    expect(Number(count.stdout.trim())).toBeGreaterThanOrEqual(4); // summary page(s) + 3 marked pages
  });
});
