/**
 * Every registered board revision sheet is clean, filed under its own
 * address, and prints (2026-11-03). And every sheet file on disk is
 * registered: a sheet written and never added to the registry would never
 * show, with nothing failing.
 */
import { describe, it, expect } from "vitest";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { REVISION_SHEET_KEYS, loadRevisionSheet, hasRevisionSheet, revisionKey } from "@/lib/board/revision/registry";
import { lintRevisionSheet } from "@/lib/board/revision/lint";
import { buildRevisionSheetHtml } from "@/lib/export/pdf/revisionSheetHtml";
import { BOARD_EXAMS } from "@/lib/exam/examContext";

const SHEETS_DIR = join(__dirname, "..", "src", "lib", "board", "revision", "sheets");

function sheetFiles(dir: string): string[] {
  let out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out = out.concat(sheetFiles(p));
    else if (name.endsWith(".ts")) out.push(relative(SHEETS_DIR, p).split(sep).join("/").replace(/\.ts$/, ""));
  }
  return out;
}

describe("board revision registry", () => {
  it("has at least one sheet", () => {
    expect(REVISION_SHEET_KEYS.length).toBeGreaterThan(0);
  });

  it("registers every sheet file, under the file's own path", () => {
    expect([...sheetFiles(SHEETS_DIR)].sort()).toEqual([...REVISION_SHEET_KEYS].sort());
  });

  it("answers for unknown chapters without throwing", async () => {
    const t = { examSlug: "mh-hsc-12", subjectRoute: "physics", chapterSlug: "no-such-chapter" };
    expect(hasRevisionSheet(t)).toBe(false);
    expect(await loadRevisionSheet(t)).toBeNull();
  });

  const boardSlugs = new Set<string>(BOARD_EXAMS.map((e) => e.slug));

  for (const key of REVISION_SHEET_KEYS) {
    describe(key, () => {
      it("is clean, filed at its own address, on a board exam, and prints", async () => {
        const [examSlug, subjectRoute, chapterSlug] = key.split("/");
        const sheet = await loadRevisionSheet({ examSlug, subjectRoute, chapterSlug });
        expect(sheet).not.toBeNull();
        if (!sheet) return;
        expect(lintRevisionSheet(sheet)).toEqual([]);
        expect(revisionKey(sheet)).toBe(key);
        expect(boardSlugs.has(sheet.examSlug)).toBe(true);
        const html = buildRevisionSheetHtml({ sheet, head: "", branded: true });
        expect(html).not.toMatch(/katex-error/);
      });
    });
  }
});
