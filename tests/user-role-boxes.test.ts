/**
 * The teacher-or-student question must sit in EVERY download box, and only in
 * the download view: the pass offer is measured by running experiments
 * (box-buy, pass-tiers, why-not-buy, parent-pay), so nothing new goes there.
 *
 * A source scan (no jsdom here): each box renders <RoleQuestion …/> exactly
 * once, naming its own box, and PassOffer (the offer view) never does.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(__dirname, "..");
const read = (p: string) => readFileSync(join(ROOT, p), "utf8");

const BOXES: { file: string; box: RegExp }[] = [
  { file: "src/app/browse/DownloadDialog.tsx", box: /<RoleQuestion[^>]*box="browse"/ },
  { file: "src/app/mock/_components/PaperDownload.tsx", box: /<RoleQuestion[^>]*box=\{box\}/ },
  { file: "src/app/homework/_components/HomeworkDownload.tsx", box: /<RoleQuestion[^>]*box="homework"/ },
  { file: "src/components/export/SheetDownload.tsx", box: /<RoleQuestion[^>]*box=\{kind\}/ },
];

describe("teacher-or-student question in the download boxes", () => {
  for (const { file, box } of BOXES) {
    it(`${file} asks once, in its download view, naming its box`, () => {
      const src = read(file);
      expect(src.match(/<RoleQuestion\b/g)?.length ?? 0).toBe(1);
      expect(src).toMatch(box);
      // Rendered inside the download view's branch, never beside the offer.
      const at = src.indexOf("<RoleQuestion");
      const before = src.slice(0, at);
      expect(before.lastIndexOf("showDownloadView")).toBeGreaterThan(-1);
    });
  }

  it("is never in the pass offer", () => {
    expect(read("src/app/browse/PassOffer.tsx")).not.toMatch(/RoleQuestion/);
  });
});
