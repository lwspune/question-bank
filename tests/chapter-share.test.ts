/**
 * The chapter share card ("Studying this with friends?") was removed on
 * 2026-11-11 under its experiment's rule: 4 signups in six weeks, the bar was
 * 5. Only the campaign name stays, because the growth readout still counts the
 * signups the card brought in.
 */
import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import * as chapterShare from "@/lib/share/chapterShare";

const root = process.cwd();

describe("the chapter share card is gone", () => {
  it("keeps only the campaign name the growth readout counts", () => {
    expect(chapterShare.CHAPTER_SHARE_CAMPAIGN).toBe("chapter-share");
    expect(Object.keys(chapterShare)).toEqual(["CHAPTER_SHARE_CAMPAIGN"]);
  });

  it("no chapter page renders it, and the component is deleted", () => {
    for (const f of [
      "src/app/questions/[examSlug]/[subjectSlug]/[chapterSlug]/page.tsx",
      "src/app/notes/_components/NotesChapterLanding.tsx",
    ]) {
      expect(readFileSync(join(root, f), "utf8")).not.toMatch(/ChapterShareCard/);
    }
    expect(existsSync(join(root, "src/components/ChapterShareCard.tsx"))).toBe(false);
  });
});
