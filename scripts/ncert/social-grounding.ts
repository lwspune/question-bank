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
import { spawnSync } from "node:child_process";
import { requireChapter, questionsJsonPath } from "./config";
import { groundingViolations, type GroundedRow } from "./scienceLib";
import { headingAnchors, parseSocialCitations, type HeadingLine } from "./socialLib";

/**
 * Every line of the chapter with its size, page and whether it is WHOLLY bold.
 *
 * Wholly, not partly: body prose bolds a term inline constantly, and a line
 * carrying one bold word is not a heading. The body size is the modal size
 * weighted by character count, so a chapter of mostly-display pages cannot drag
 * the baseline up and hide its own headings.
 */
function chapterLines(pdf: string): { body: number; lines: HeadingLine[] } {
  const py = [
    "import fitz, sys, json, collections",
    "doc = fitz.open(sys.argv[1])",
    "lines=[]; sizes=collections.Counter()",
    "def heavy(f):",
    "    f=f.lower()",
    "    return ('bold' in f) or ('demi' in f) or ('black' in f) or ('heavy' in f)",
    "for pi,p in enumerate(doc):",
    "    for b in p.get_text('dict')['blocks']:",
    "        for l in b.get('lines', []):",
    "            sp=l['spans']",
    "            txt=''.join(s['text'] for s in sp).strip()",
    "            if not txt: continue",
    "            mx=max(s['size'] for s in sp)",
    "            sizes[round(mx,1)] += len(txt)",
    "            lines.append({'text':txt,'size':round(mx,1),'page':pi,",
    "                          'bold': all(heavy(s['font']) or (s['flags'] & 16) for s in sp)})",
    "doc.close()",
    "body = sizes.most_common(1)[0][0] if sizes else 0",
    "sys.stdout.buffer.write(json.dumps({'body':body,'lines':lines}).encode('utf-8'))",
  ].join("\n");

  const r = spawnSync("python", ["-c", py, pdf], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`pdf line extraction failed: ${r.stderr}`);
  return JSON.parse(r.stdout);
}

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);

  const path = questionsJsonPath(id);
  if (!existsSync(path)) {
    throw new Error(`no merged transcription at ${path} — run merge.ts first`);
  }
  const rows: GroundedRow[] = JSON.parse(readFileSync(path, "utf8"));

  const { body, lines } = chapterLines(ch.pdf);
  const anchors = headingAnchors(lines, body);

  console.log(
    `\n${id}: ${rows.length} rows, ${anchors.length} heading anchors ` +
      `(body ${body}pt, ${lines.length} lines)`
  );

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
