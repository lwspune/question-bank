/**
 * GROUNDING GATE for the Class 10 Science lane.
 *
 *   npx tsx scripts/ncert/science-grounding.ts <chapterId>
 *
 * WHY THIS EXISTS, AND WHY IT IS A GATE RATHER THAN TRIAGE.
 *
 * Every other book on this pipeline had an independent third ground truth for
 * the answers it shipped: the NCERT key gave a final value, and sympy re-derived
 * it off the stem, so "zero errata" was a measured claim. Class 10 Science does
 * not have that for most of its corpus. The key is TWO PAGES for the whole book —
 * ~73 keyed items against 341 questions — and its gap is bimodal by DISCIPLINE,
 * not by proof-ness: Ch.1-8 + 13 key only their 3-4 leading MCQs, Ch.9-12 key
 * their numericals too, and the 170 in-text QUESTIONS items are unkeyed in every
 * chapter. "Why is respiration considered an exothermic reaction?" has no key and
 * nothing to derive.
 *
 * So for roughly three-quarters of this corpus the honest standard is not
 * derivation but GROUNDING: the authored answer must be traceable to the
 * chapter's own prose, and the trace must RESOLVE. That is what this checks.
 * It is a gate because an ungrounded answer here is indistinguishable from an
 * asserted one, and triage that nobody runs is how a corpus of assertions ships.
 *
 * WHAT IT DOES NOT CLAIM. A resolving citation proves the answer was written
 * against a real passage of this chapter. It does NOT prove the answer is
 * correct, and it is not a substitute for the key cross-check where a key exists.
 * Grounding bounds invention; it does not bound misreading. Say "grounded", never
 * "verified".
 *
 * `groundedIn` lives on the transcription fragment and NEVER reaches the bank:
 * `buildRecords` assembles its payload from named fields, so the extra key is
 * dropped at commit. It is an authoring artifact, checked here and then inert.
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { requireChapter, questionsJsonPath } from "./config";
import { deriveAnchors, groundingViolations, type GroundedRow } from "./scienceLib";

/** Pull the chapter PDF's full text via PyMuPDF — the anchor source. */
function chapterText(pdf: string): string {
  // Write BYTES: this console is cp1252 and the book is full of Ω, →, ° and ≠.
  const py = `
import fitz, sys, json
d = fitz.open(json.loads(sys.argv[1]))
out = []
for p in d:
    out.append(p.get_text())
d.close()
sys.stdout.buffer.write("\\n".join(out).encode("utf-8"))
`;
  const r = spawnSync("python", ["-c", py, JSON.stringify(pdf)], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`pdf text extraction failed: ${r.stderr}`);
  return r.stdout;
}

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  if (ch.chapterNo == null) {
    throw new Error(
      `chapter "${id}" has no chapterNo in config.ts — the anchor filter needs it, ` +
        `and defaulting it would silently admit another chapter's sections.`
    );
  }

  const path = questionsJsonPath(id);
  if (!existsSync(path)) throw new Error(`no merged transcription at ${path} — run merge.ts first`);
  const rows: (GroundedRow & { bucket?: string })[] = JSON.parse(readFileSync(path, "utf8"));

  const anchors = deriveAnchors(chapterText(ch.pdf), ch.chapterNo);
  console.log(`${id}: ${rows.length} rows, ${anchors.length} anchors derived from the chapter PDF`);
  if (anchors.length <= 3) {
    // Not a pass. A chapter whose text yielded almost no anchors means the
    // extraction went wrong, and every row is about to "resolve" against nothing.
    console.log(`  anchors: ${anchors.join(", ") || "(none)"}`);
  }

  const violations = groundingViolations(rows, anchors);
  if (violations.length === 0) {
    console.log(`  GROUNDING OK — every row cites a passage of this chapter that resolves.`);
    console.log(`  (grounded, NOT verified: this bounds invention, not misreading.)`);
    return;
  }

  console.log(`\n  ${violations.length} of ${rows.length} rows fail grounding:\n`);
  for (const v of violations) console.log(`    ${v.ref.padEnd(20)} ${v.reason}`);
  console.log(`\n  Anchors available (${anchors.length}): ${anchors.join(", ")}`);
  process.exitCode = 1;
}

main();
