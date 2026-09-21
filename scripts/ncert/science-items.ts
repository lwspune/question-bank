/**
 * COMPLETENESS reconcile for the Class 10 Science lane — the book's own item
 * numbering against what was transcribed, BOTH WAYS, plus the key.
 *
 *   npx tsx scripts/ncert/science-items.ts <chapterId>
 *
 * WHY THIS EXISTS RATHER THAN key-items.ts. That script is the Maths lane's
 * completeness gate and it is INOPERATIVE on this book: it looks for "EXERCISE
 * 1.1" blocks, and the Science key is headed "Chapter 1". Run on a Science
 * chapter it prints "0 item(s) to check" and exits 0 — a green that means
 * nothing was ever looked at. That is worse than no probe, so this is the
 * Science-shaped replacement.
 *
 * It reconciles THREE things, each in both directions:
 *
 *   1. Exercise items — the numbered 1..N run under the EXERCISES heading.
 *   2. In-text QUESTIONS boxes — how many boxes, and the 1..n run inside each.
 *   3. The answer key's entries for this chapter, against the transcribed rows
 *      that actually carry an answer.
 *
 * WHY BOTH WAYS. The Maths lane lost Ch.3 Ex 3.2 Q3(vi) and Ch.7 Ex 7.1 Q9-Q10
 * to page-scoped reads that looked complete; only the opposite direction found
 * them. A forward-only check cannot catch an omission.
 *
 * TRIAGE, NOT A GATE — it always exits 0. Item extraction from this book's text
 * layer is a heuristic and the layer is known-bad: reading order is broken by the
 * floating Activity boxes, and a stray "5." from a neighbouring block sits in
 * range of a numbered walk. A hit is a question to go and check on the rendered
 * page, never a verdict. The RENDER is the authority; this only says where to
 * look. (It has already earned that framing: a block-sorted dump of Ch.1 puts the
 * Group Activity between Q11 and Q12 when the book prints it after Q20.)
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { requireChapter, questionsJsonPath } from "./config";
import {
  spacedHeadingRe,
  questionBoxRe,
  contiguousRun,
  refStructure,
  reconcile,
  parseKeyChapters,
} from "./scienceLib";

/** Block-sorted page text — closer to reading order than a raw dump, not equal to it. */
function pdfText(pdf: string, sorted: boolean): string {
  const py = `
import fitz, sys, json
a = json.loads(sys.argv[1])
d = fitz.open(a["pdf"])
out = []
for p in d:
    if a["sorted"]:
        bs = p.get_text("blocks")
        bs.sort(key=lambda b: (round(b[1] / 8), b[0]))
        out.append("\\n".join(b[4] for b in bs))
    else:
        out.append(p.get_text())
d.close()
sys.stdout.buffer.write("\\n".join(out).encode("utf-8"))
`;
  const r = spawnSync("python", ["-c", py, JSON.stringify({ pdf, sorted })], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`pdf text extraction failed: ${r.stderr}`);
  return r.stdout;
}

// Same rule as the key parser: a label's dot is followed by whitespace, a
// decimal's is not. Ch.11 Q7 prints a DATA TABLE of I/V pairs, and its values
// ("10.2", "13.2") sit at the start of their own lines in the block-sorted dump
// — read as items 10 and 13, they broke the contiguous run at 7 and reported
// eleven transcribed questions as missing from a book that has them all.
const ITEM_RE = /^[ \t]*(\d{1,2})\.(?=[ \t]|$)/gm;
const lineItems = (s: string) => [...s.matchAll(new RegExp(ITEM_RE.source, "gm"))].map((m) => Number(m[1]));

function report(label: string, r: { missing: number[]; extra: number[] }) {
  if (!r.missing.length && !r.extra.length) {
    console.log(`  ${label.padEnd(30)} OK`);
    return false;
  }
  const bits: string[] = [];
  if (r.missing.length) bits.push(`in BOOK not transcribed: ${r.missing.join(", ")}`);
  if (r.extra.length) bits.push(`transcribed not in BOOK: ${r.extra.join(", ")}`);
  console.log(`  ${label.padEnd(30)} ${bits.join("  |  ")}`);
  return true;
}

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  if (ch.chapterNo == null) throw new Error(`chapter "${id}" has no chapterNo in config.ts`);

  const path = questionsJsonPath(id);
  if (!existsSync(path)) throw new Error(`no merged transcription at ${path} — run merge.ts first`);
  const rows: { ref: string; answer?: string; format?: string }[] = JSON.parse(readFileSync(path, "utf8"));
  const got = refStructure(rows.map((r) => r.ref));

  console.log(`\nscience-items — ${ch.chapterName} (${rows.length} transcribed rows)\n`);

  const text = pdfText(ch.pdf, true);
  const exHead = text.match(spacedHeadingRe("EXERCISES"));
  if (!exHead || exHead.index == null) {
    console.log(`  !! no EXERCISES heading found — the spaced-heading detector did not fire.`);
    console.log(`     Check the render before trusting anything else in this report.`);
    return;
  }
  const pre = text.slice(0, exHead.index);
  const exs = text.slice(exHead.index + exHead[0].length);

  // 1. Exercise items.
  const bookEx = contiguousRun(lineItems(exs));
  let hits = report(`exercise items (1..${bookEx.length || "?"})`, reconcile(bookEx, got.exercise));

  // 2. In-text boxes. Each box's items are its own leading 1..n run.
  //    questionBoxRe, NOT spacedHeadingRe("QUESTIONS"): a one-item box is headed
  //    QUESTION, singular, and this probe used to be blind to exactly the same
  //    two boxes my page survey was (Ch.2 p1, Ch.12 p1). Ch.12 shipped green.
  const parts = pre.split(new RegExp(questionBoxRe().source, "g")).slice(1);
  console.log(`  in-text boxes: book ${parts.length}, transcribed ${got.boxes.size}`);
  if (parts.length !== got.boxes.size) hits = true;
  parts.forEach((seg, i) => {
    const box = i + 1;
    const bookItems = contiguousRun(lineItems(seg.slice(0, 1400)));
    if (report(`  box ${box} items`, reconcile(bookItems, got.boxes.get(box) ?? []))) hits = true;
  });

  // 3. The key. Its entries are the ONLY externally-checkable answers this
  //    chapter has, and on Ch.1-8 + 13 they are just the leading MCQs.
  if (ch.answersPdf && ch.answerPages?.length) {
    const keyed = parseKeyChapters(pdfText(ch.answersPdf, false)).get(ch.chapterNo) ?? [];
    // Compare the key against EVERY transcribed exercise item, not only the rows
    // carrying an `answer` field. `answer` means "an MCQ letter", and outside
    // Ch.1-8's leading MCQs this key answers numericals and short-response
    // questions whose bank row is SUBJECTIVE with its answer in `solution`.
    // Filtering on `answer` reported all fourteen of Ch.11's keyed numericals as
    // untranscribed when every one of them was present.
    console.log("");
    const k = reconcile(keyed, got.exercise);
    // `missing` is the real signal: the key answers an item we have no row for.
    // `extra` is EXPECTED and is not an error — it is simply the items the key
    // does not cover, which on this book is most of them.
    console.log(
      `  ${"keyed items with no row".padEnd(30)} ${k.missing.length ? k.missing.join(", ") : "none"}`
    );
    if (k.extra.length) console.log(`  ${"unkeyed items (expected)".padEnd(30)} ${k.extra.join(", ")}`);
    if (k.missing.length) hits = true;
    const pct = bookEx.length ? Math.round((keyed.length / bookEx.length) * 100) : 0;
    console.log(
      `  KEY COVERAGE: ${keyed.length} of ${bookEx.length} exercise items (${pct}%) — ` +
        `0 of ${[...got.boxes.values()].reduce((n, v) => n + v.length, 0)} in-text items.`
    );
    console.log(`  Report THIS chapter's denominator, never the book's.`);
  }

  console.log(hits ? `\n  Items above need checking on the RENDER.\n` : `\n  Nothing to check.\n`);
}

main();
