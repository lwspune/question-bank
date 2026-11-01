/**
 * The free-exam download check (2026-11-02, migration 0210): the parts that
 * need no database. A board paper names its exam's slug and a formula sheet
 * its notes chapter; both resolve through the registry. The database parts
 * are pinned in tests/free-exams.integration.test.ts.
 */
import { describe, it, expect } from "vitest";
import { downloadIsFree, formulaSheetExamName } from "@/lib/export/freeExamDownload";
import { NOTES_NAV_INDEX } from "@/lib/notes/notesNavIndex.generated";

// Never called: these targets must be answered without a database read.
const noDb = new Proxy({}, { get: () => { throw new Error("no database read expected"); } }) as never;

describe("downloadIsFree without a database", () => {
  it("a board paper of a free exam is free; of a paid exam is not", async () => {
    expect(await downloadIsFree(noDb, { examSlug: "cbse-10" })).toBe(true);
    expect(await downloadIsFree(noDb, { examSlug: "mh-ssc-10" })).toBe(true);
    expect(await downloadIsFree(noDb, { examSlug: "cbse-12" })).toBe(false);
    expect(await downloadIsFree(noDb, { examSlug: "no-such-exam" })).toBe(false);
  });

  it("a formula sheet takes its notes chapter's exam", async () => {
    const spi = NOTES_NAV_INDEX.find((e) => e.examName === "SPI");
    const nda = NOTES_NAV_INDEX.find((e) => e.examName === "NDA");
    expect(spi && nda).toBeTruthy();
    expect(formulaSheetExamName({ subjectRoute: spi!.subjectRoute, chapterSlug: spi!.chapterSlug })).toBe("SPI");
    expect(await downloadIsFree(noDb, { formula: { subjectRoute: spi!.subjectRoute, chapterSlug: spi!.chapterSlug } })).toBe(true);
    expect(await downloadIsFree(noDb, { formula: { subjectRoute: nda!.subjectRoute, chapterSlug: nda!.chapterSlug } })).toBe(false);
    expect(await downloadIsFree(noDb, { formula: { subjectRoute: "nope", chapterSlug: "nope" } })).toBe(false);
  });

  it("an empty target is not free", async () => {
    expect(await downloadIsFree(noDb, {})).toBe(false);
  });
});
