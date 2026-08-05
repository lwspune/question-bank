/**
 * Re-tag a 2021 COMPILATION's records by its printed PART banners.
 *
 *   npx tsx scripts/jee/retag-compilation.ts <paperId> [--apply]
 *
 * The extractor assigns subject POSITIONALLY, assuming a 30/30/30 paper. A
 * compilation is not one: 2021-p16 prints 17 Physics, 24 Chemistry and 20
 * Mathematics questions, so its "Chemistry" block (records 31-60) actually holds
 * 7 Physics questions at the front and 13 Mathematics at the back. Dumping that
 * hands an agent integrals, determinants and circle tangents to classify as
 * Chemistry, and `commit.ts` would then file them under Chemistry chapters.
 *
 * The source markdown states the truth explicitly — `**PART-II CHEMISTRY**` —
 * so this counts the numbered questions between banners and re-assigns `subject`
 * in sequential order.
 *
 * SAFETY: it refuses unless the banner totals reconcile EXACTLY with the record
 * count. Records are emitted in source order, so position -> subject is only
 * sound when nothing was dropped or added along the way; a mismatch means the
 * assumption does not hold for this paper and a silent re-tag would be worse
 * than the positional one it replaces.
 *
 * Verify with the already-shipped p11/p12, which an earlier pass classified BY
 * CONTENT: they hold 21 and 19 Chemistry rows against banner counts of 22 and
 * 20 — i.e. the banners agree with a human-verified result to within the rows
 * that pass were right to drop.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { recordsPath, requirePaperId } from "./config";

/** JEE's part order is always Physics, Chemistry, Mathematics. */
const BANNER_TO_SUBJECT: Record<string, string> = {
  PHYSICS: "Physics",
  CHEMISTRY: "Chemistry",
  MATHEMATICS: "Maths",
  MATHS: "Maths",
};

export type Region = { subject: string; count: number };

/** Count numbered questions between each `**PART-N SUBJECT**` banner. */
export function bannerRegions(md: string): Region[] {
  const lines = md.split("\n");
  const banners: { line: number; subject: string }[] = [];
  lines.forEach((l, i) => {
    const m = l.match(/\*\*PART-[IVX]+\s+([A-Z]+)\*\*/);
    const subject = m && BANNER_TO_SUBJECT[m[1]];
    if (subject) banners.push({ line: i, subject });
  });
  return banners.map((b, k) => {
    const end = k + 1 < banners.length ? banners[k + 1].line : lines.length;
    let count = 0;
    for (let i = b.line + 1; i < end; i++) if (/^\s*\d+\.\s/.test(lines[i])) count++;
    return { subject: b.subject, count };
  });
}

/** Expand regions into a flat per-position subject list. */
export function subjectByPosition(regions: Region[]): string[] {
  return regions.flatMap((r) => Array<string>(r.count).fill(r.subject));
}

function main() {
  const paperId = requirePaperId(process.argv, 2, "retag-compilation.ts <paperId> [--apply]");
  const apply = process.argv.includes("--apply");

  const md = readFileSync(join("scripts/jee/out", `${paperId}.md`), "utf8");
  const regions = bannerRegions(md);
  if (regions.length < 2) throw new Error(`${paperId}: found ${regions.length} PART banners — not a compilation?`);

  const path = recordsPath(paperId);
  const records = JSON.parse(readFileSync(path, "utf8")) as { questionNumber: number; subject: string }[];
  const wanted = subjectByPosition(regions);

  console.log(`${paperId} banners: ${regions.map((r) => `${r.subject}=${r.count}`).join(" ")} (total ${wanted.length})`);
  console.log(`${paperId} records: ${records.length}`);

  if (wanted.length !== records.length) {
    throw new Error(
      `${paperId}: banner total ${wanted.length} != ${records.length} records. Position -> subject is only ` +
        `sound when they reconcile exactly; refusing to re-tag on an assumption that does not hold here.`,
    );
  }

  const before: Record<string, number> = {};
  const after: Record<string, number> = {};
  let moved = 0;
  records.forEach((r, i) => {
    before[r.subject] = (before[r.subject] ?? 0) + 1;
    after[wanted[i]] = (after[wanted[i]] ?? 0) + 1;
    if (r.subject !== wanted[i]) moved++;
  });

  console.log(`  before: ${JSON.stringify(before)}`);
  console.log(`  after:  ${JSON.stringify(after)}`);
  console.log(`  ${apply ? "re-tagged" : "would re-tag"} ${moved} record(s)`);

  if (apply) {
    records.forEach((r, i) => { r.subject = wanted[i]; });
    writeFileSync(path, JSON.stringify(records, null, 2) + "\n");
  }
}

if (require.main === module) main();
