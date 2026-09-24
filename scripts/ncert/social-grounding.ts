/**
 * GROUNDING GATE for the Class 10 Social Science lane.
 *
 *   npx tsx scripts/ncert/social-grounding.ts <chapterId>
 *
 * WHY THIS CARRIES THE WHOLE WEIGHT HERE, AND NOT PART OF IT.
 *
 * Every other book on this pipeline has something to check an answer against.
 * Maths and Physics have a key and sympy. Class 10 Science has a two-page key
 * covering about a fifth of its questions. These four books have **nothing**:
 * there is no answer key for History, Geography, Political Science or Economics,
 * and no file resembling one exists in any of the four source folders. The
 * end-of-book cross-check that is step 6 of the textbook runbook cannot be run
 * at all.
 *
 * So the only defensible standard is that every authored answer is traceable to
 * a passage of its own chapter, and that the trace RESOLVES. This is a gate
 * (exit 1) rather than triage because an ungrounded answer here is
 * indistinguishable from an invented one, and triage nobody runs is how a
 * corpus of assertions ships.
 *
 * WHY IT DOES NOT REUSE science-grounding.ts. That script mints an anchor from
 * any dotted number at the start of a line. Three of these four books number no
 * sections at all, so on Polity's prose it would mint "43.63" and "8.03" and on
 * Economics "50.2" — phantom anchors, and a phantom anchor lets an invented
 * citation resolve. Anchors here are the chapter's own HEADING TEXT, read off
 * font weight and size by `headingAnchors`. The generic half IS shared:
 * `groundingViolations` is imported, not copied.
 *
 * WHAT IT DOES NOT CLAIM. A resolving citation proves the answer was written
 * against a real passage of this chapter. It does NOT prove the answer is
 * correct, and here there is nothing else that could. Say "grounded", never
 * "verified".
 */
import { readFileSync, existsSync } from "node:fs";
import { requireChapter, questionsJsonPath } from "./config";
import { chapterLines } from "./socialPdf";
import { groundingViolations, type GroundedRow } from "./scienceLib";
import {
  headingAnchors,
  figureTableAnchors,
  parseSocialCitations,
} from "./socialLib";

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);

  // `--anchors` prints the citable list and exits, with no transcription needed.
  // An author cannot cite a heading they cannot see, and making them merge a
  // file first just to find out what is citable is how citations get guessed.
  const anchorsOnly = process.argv.includes("--anchors");

  const path = questionsJsonPath(id);
  if (!anchorsOnly && !existsSync(path)) {
    throw new Error(`no merged transcription at ${path} — run merge.ts first`);
  }
  const rows: GroundedRow[] = anchorsOnly || !existsSync(path)
    ? []
    : JSON.parse(readFileSync(path, "utf8"));

  if (ch.chapterNo == null) throw new Error(`chapter "${id}" has no chapterNo in config.ts`);
  const { body, lines } = chapterLines(ch.pdf);
  // Headings AND the chapter's own figure/table references. The pilot chapter
  // is why the second half is here: the citation parser accepts "Fig. 1.4" but
  // headingAnchors never emits one, so every figure citation failed the gate
  // however correct it was.
  const anchors = [
    ...headingAnchors(lines, body),
    ...figureTableAnchors(lines.map((l) => l.text).join("\n"), ch.chapterNo),
  ];

  console.log(
    `\n${id}: ${rows.length} rows, ${anchors.length} heading anchors ` +
      `(body ${body}pt, ${lines.length} lines)`
  );

  if (anchorsOnly) {
    console.log(`
  Citable anchors (${anchors.length}) — cite as: § <heading> — why
`);
    for (const a of anchors) console.log(`    § ${a}`);
    console.log("");
    return;
  }

  const violations = groundingViolations(rows, anchors, parseSocialCitations);
  if (violations.length === 0) {
    console.log("  GROUNDING OK — every row cites a heading of this chapter that resolves.");
    console.log("  (grounded, NOT verified: this book has no answer key, so nothing here");
    console.log("   checks whether the answer is RIGHT — only that it was written from the page.)");
    return;
  }

  console.log(`\n  ${violations.length} GROUNDING VIOLATION(S):`);
  for (const v of violations) console.log(`    ${v.ref.padEnd(16)} ${v.reason}`);
  console.log(`\n  Anchors this chapter declares (${anchors.length}):`);
  console.log("    " + anchors.map((a) => `[${a}]`).join(" "));
  console.log(
    "\n  A citation must name a heading EXACTLY as printed, after case and\n" +
      "  punctuation are normalised, and must be separated from what follows\n" +
      "  by an em dash or a semicolon. Write it as: § Major Crops — explanation.\n"
  );
  process.exitCode = 1;
}

main();
