/**
 * How much is a GREEN grounding gate actually worth on a given chapter?
 *
 *   npx tsx scripts/ncert/social-anchor-strength.ts <chapterId> [...]
 *
 * WHY THIS EXISTS. `social-grounding.ts` reports that every citation RESOLVED.
 * It does not report what each one resolved ONTO, and those are different
 * claims. Geography sets its section heads as an oversized drop cap followed by
 * letter-spaced small caps, so a heading the eye reads as "Water Scarcity and
 * its Causes" reaches the text layer as several pieces. Some of those pieces are
 * single common words — measured across the seven Class 10 Geography chapters:
 * 16 of 194 anchors are one token of <= 8 characters, among them `water`,
 * `river`, `multi`, `species` and `need`.
 *
 * A single-common-word anchor is close to free to match. An answer that never
 * opened the chapter could cite "Water" and pass. That is the same failure the
 * heading rule was chosen to avoid in the first place: `science-grounding.ts`
 * was rejected here because it minted anchors from any dotted number, and a
 * phantom anchor lets an invented citation resolve. Shattering re-introduces a
 * weaker form of the same hole through the back door.
 *
 * So this reports the rows whose citations resolve ONLY onto weak anchors. Those
 * are the rows whose green says least, and they are the ones worth reading by
 * hand. A row that also resolves onto a real multi-word heading is not listed:
 * one solid anchor is enough.
 *
 * WHAT IT FOUND, and what fixed it. 10 of 61 rows were weak-only, 5 of them in
 * one chapter. The cause was not the citations but the EXTRACTOR: PyMuPDF was
 * emitting a small-caps heading as a dozen overlapping windows, so "WATER
 * SCARCITY AND THE NEED FOR WATER" reached the anchor list as `water`,
 * `scarcity`, `multi`, `river`. `stitchSmallCaps` rebuilds those, and the count
 * fell to 5 — all of them in Lifelines, and all of them FALSE: `roadways`,
 * `railways` and `airways` really are that chapter's printed section headings.
 * Short is not the same as generic, so read a hit before believing it.
 *
 * WHAT IT IS NOT. It is triage (exit 0), not a gate. A weak-only row is not
 * wrong — it is unmeasured, which is a different and quieter problem. It also
 * cannot see the opposite error: an answer that cites a strong heading it never
 * read. Nothing here bounds misreading; grounding never did.
 */
import { readFileSync, existsSync } from "node:fs";
import { requireChapter, questionsJsonPath } from "./config";
import { chapterLines } from "./socialPdf";
import {
  headingAnchors,
  figureTableAnchors,
  parseSocialCitations,
} from "./socialLib";

/**
 * One token, <= 8 characters. Deliberately crude, and deliberately not tuned:
 * the point is to name the rows worth re-reading, not to score them. A longer
 * single word ("manufacturing", "conservation") is specific enough to the
 * chapter that matching it by accident is not a realistic worry.
 */
export function isWeakAnchor(a: string): boolean {
  return a.split(/\s+/).length === 1 && a.length <= 8;
}

function main() {
  const ids = process.argv.slice(2);
  if (!ids.length) throw new Error("usage: social-anchor-strength.ts <chapterId> [...]");

  let rows = 0;
  let weakOnly = 0;
  let weakAnchors = 0;
  let allAnchors = 0;

  for (const id of ids) {
    const ch = requireChapter(id);
    const p = questionsJsonPath(id);
    if (!existsSync(p)) {
      console.log(`${id}: NOT MERGED — run merge.ts first`);
      continue;
    }
    const data = JSON.parse(readFileSync(p, "utf8"));
    const { body, lines } = chapterLines(ch.pdf);
    if (ch.chapterNo == null) throw new Error(`chapter "${id}" has no chapterNo`);
    const anchors = [
      ...headingAnchors(lines, body),
      ...figureTableAnchors(lines.map((l) => l.text).join("\n"), ch.chapterNo),
    ];
    const weak = anchors.filter(isWeakAnchor);
    weakAnchors += weak.length;
    allAnchors += anchors.length;

    const flagged: string[] = [];
    for (const r of data) {
      const cites = parseSocialCitations(r.groundedIn ?? "");
      // Mirror the gate's own resolution rule so the two cannot disagree.
      // EXACT membership, mirroring groundingViolations. The first version of
      // this probe used substring matching and was therefore MORE permissive
      // than the gate it measures — it would have reported a row as grounded
      // that the gate rejects. A probe that disagrees with the thing it
      // measures is worse than no probe.
      const known = new Set(anchors);
      const hits = cites.filter((c: string) => known.has(c));
      if (!hits.length) continue;
      rows++;
      if (hits.every(isWeakAnchor)) {
        weakOnly++;
        flagged.push(`    ${String(r.ref).padEnd(18)} -> [${[...new Set(hits)].join(", ")}]`);
      }
    }

    console.log(
      `\n${id}: ${data.length} rows, ${anchors.length} anchors ` +
        `(${weak.length} weak: ${weak.join(", ") || "none"})`
    );
    if (flagged.length) {
      console.log(`  ${flagged.length} row(s) resolving ONLY onto weak anchors:`);
      flagged.forEach((f) => console.log(f));
    } else {
      console.log("  every row resolves onto at least one strong anchor.");
    }
  }

  console.log(
    `\nTOTAL: ${rows} rows resolving · ${weakOnly} weak-only · ` +
      `${weakAnchors}/${allAnchors} anchors weak`
  );
  console.log(
    "Weak-only rows are UNMEASURED, not wrong — read them against the page.\n"
  );
}

main();
