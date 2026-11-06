/**
 * Class 9-10 downloads need the pass, like every exam's (owner, 2026-11-05).
 *
 * Migration 0210 (2026-11-02) made the six Class 9-10 exams free, downloads
 * included: each download route and /browse ORed "this paper is a free exam's"
 * into `hasDownloadPass`. The owner's rule of 2026-11-04 is that a download
 * needs the pass for every exam, because each PDF is printed on the server.
 * Online use (answers, mocks, tests, saves, V) stays free for those exams.
 *
 * A route test cannot reach past the gate here (no signed-in session, see
 * export-route-kind.test.ts), so this pins the SOURCE: no download path asks
 * whether the exam is free. A signed-in student of a free exam then meets the
 * same gate as anyone: pass, staff, or the one free paper / formula sheet.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");

/** The places that decide whether a download is unlocked. */
const DOWNLOAD_GATES = [
  "src/app/api/export/route.ts",
  "src/app/api/export/access/route.ts",
  "src/app/api/export/formula-sheet/route.ts",
  "src/app/browse/page.tsx",
  "src/app/browse/renderBrowse.tsx",
];

const FREE_EXAM_UNLOCK = /\b(examFree|downloadIsFree|formulaSheetIsFree|isFreeExamName)\b/;

function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...sourceFiles(p));
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}

describe("Class 9-10 downloads need the pass", () => {
  it.each(DOWNLOAD_GATES)("%s does not unlock a download because the exam is free", (file) => {
    const text = readFileSync(join(ROOT, file), "utf8");
    expect(text).not.toMatch(FREE_EXAM_UNLOCK);
  });

  it("nothing in src imports the free-exam download check", () => {
    const users = sourceFiles(join(ROOT, "src")).filter((f) =>
      readFileSync(f, "utf8").includes("lib/export/freeExamDownload")
    );
    expect(users).toEqual([]);
  });
});
