/**
 * Reconcile a chapter's TRANSCRIBED item list against the ANSWER KEY's item list,
 * BOTH WAYS, and report anything present in one and missing from the other.
 *
 *   npx tsx scripts/ncert/key-items.ts <chapterId>
 *
 * WHY THIS EXISTS. Twice in the Class-10 run a numbered exercise item was dropped
 * because it OVERFLOWED onto the next printed page, and both times the page-scoped
 * read looked complete while the key quietly disagreed:
 *
 *   - Ch.3 Ex 3.2 Q3 has SIX sub-parts; (vi) sits alone at the top of the next
 *     page. The stem dump showed five and read as a finished list.
 *   - Ch.7 Ex 7.1 has TEN questions; Q9 and Q10 sit above the next section
 *     heading on the following page. The stem dump showed eight.
 *
 * Neither was found by reading harder. Both were found because the KEY listed an
 * answer for an item the transcription had no row for. So the key is not only the
 * correctness gate (step 6) -- it is the COMPLETENESS gate, and this probe is the
 * mechanical form of that. Run it BEFORE authoring solutions, when a missing stem
 * is cheap to add.
 *
 * TRIAGE, NOT A GATE -- it always exits 0. Item-number extraction from a
 * two-column answer key is a heuristic: an answer's own digits ("2. 39; 39 km")
 * can look like a label, and a chapter may legitimately have items the key skips
 * (Ch.1 Ex 1.2 has no key block at all; Ch.6 is 24% covered). A hit is a question
 * to go and check in the PDF, never a verdict.
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { requireChapter, questionsJsonPath } from "./config";

type Row = { ref: string };

/** Pull the answer-key pages' text via PyMuPDF, the same way render.ts rasterises. */
function keyText(pdf: string, pages: number[]): string {
  // Write BYTES, not str: this console is cp1252 and the key is full of U+2212
  // MINUS SIGN, so sys.stdout.write() dies on the first negative answer.
  const py = `
import fitz, json, sys
args = json.loads(sys.argv[1])
d = fitz.open(args["pdf"])
out = []
for p in args["pages"]:
    out.append(d[p].get_text())
d.close()
sys.stdout.buffer.write("\\n".join(out).encode("utf-8"))
`;
  const r = spawnSync("python", ["-c", py, JSON.stringify({ pdf, pages })], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (r.status !== 0) throw new Error(`python failed: ${r.stderr}`);
  return r.stdout;
}

const ROMAN_ORDER = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii",
  "ix", "x", "xi", "xii", "xiii", "xiv", "xv", "xvi"] as const;
const ROMAN = new RegExp(`^(${ROMAN_ORDER.join("|")})$`);

/**
 * Split the key text into per-EXERCISE blocks, then read each block's item labels.
 * Top-level items are `N.`; sub-items are `(roman)`. We keep only the LONGEST RUN
 * starting at 1 and increasing by 1, which is what discards an answer's own digits.
 */
function parseKey(text: string): Map<string, { items: number[]; subs: Map<number, string[]> }> {
  const out = new Map<string, { items: number[]; subs: Map<number, string[]> }>();
  const parts = text.split(/EXERCISE\s+(\d+\.\d+)/);
  for (let i = 1; i < parts.length; i += 2) {
    const ex = parts[i];
    const body = parts[i + 1] ?? "";
    // Candidate top-level labels, in reading order. Anchored to the START OF A
    // LINE: the key prints item numbers there, whereas a sentence-final number
    // ("...the number; 18.") ends one. Without the anchor that 18 extended Ex
    // 3.3's run to a phantom Q3.
    const nums: { n: number; at: number }[] = [];
    const re = /^[ \t]*(\d{1,2})\.(?=[\s\n])/gm;
    let m: RegExpExecArray | null;
    while ((m = re.exec(body))) nums.push({ n: Number(m[1]), at: m.index });
    // Longest increasing run beginning at 1, allowing GAPS. A key legitimately
    // skips items it cannot adjudicate — Ch.8's Ex 8.1 omits Q6 ("show that
    // angle A = angle B") — and a strict +1 rule stopped dead at Q5 there, hiding
    // the six items after the gap. Ch.10's Ex 10.2 then needed a bigger allowance
    // still: it keys 1,2,3,6,7,12 and skips SEVEN "Prove that ..." items, so the
    // run has to step 7 -> 12. Six is the widest real gap in this book; the
    // line-start anchor, not this bound, is what keeps an answer's own digits out.
    const MAX_GAP = 6;
    let best: { n: number; at: number }[] = [];
    for (let s = 0; s < nums.length; s++) {
      if (nums[s].n !== 1) continue;
      const run = [nums[s]];
      for (let k = s + 1; k < nums.length; k++) {
        const last = run[run.length - 1].n;
        if (nums[k].n > last && nums[k].n <= last + MAX_GAP) run.push(nums[k]);
      }
      if (run.length > best.length) best = run;
    }
    const subs = new Map<number, string[]>();
    for (let k = 0; k < best.length; k++) {
      const from = best[k].at;
      const to = k + 1 < best.length ? best[k + 1].at : body.length;
      const seg = body.slice(from, to);
      const found = new Set<string>();
      const sre = /\(([ivx]{1,5})\)/g;
      let s2: RegExpExecArray | null;
      while ((s2 = sre.exec(seg))) if (ROMAN.test(s2[1])) found.add(s2[1]);
      // Keep only the CONTIGUOUS PREFIX i, ii, iii, ... A sub-item list always
      // starts at (i) and never skips; a bare "(x)" is the key naming a VARIABLE
      // ("where x and y are the ages ... Age of Nuri (x) = 50"), which is how
      // Ex 3.3 Q2 reported a missing sub-part that does not exist.
      const seq: string[] = [];
      for (const r of ROMAN_ORDER) {
        if (!found.has(r)) break;
        seq.push(r);
      }
      subs.set(best[k].n, seq);
    }
    out.set(ex, { items: best.map((b) => b.n), subs });
  }
  return out;
}

/** Read the transcription's own item list from the merged questions JSON. */
function parseData(rows: Row[]): Map<string, { items: Set<number>; subs: Map<number, Set<string>> }> {
  const out = new Map<string, { items: Set<number>; subs: Map<number, Set<string>> }>();
  for (const r of rows) {
    const m = /^Ex\s+(\d+\.\d+)\s+Q(\d+)(?:\s*\(([ivx]+)\))?/.exec(r.ref);
    if (!m) continue; // solved examples carry a different ref shape
    const [, ex, nStr, sub] = m;
    if (!out.has(ex)) out.set(ex, { items: new Set(), subs: new Map() });
    const e = out.get(ex)!;
    const n = Number(nStr);
    e.items.add(n);
    if (sub) {
      if (!e.subs.has(n)) e.subs.set(n, new Set());
      e.subs.get(n)!.add(sub);
    }
  }
  return out;
}

function main() {
  const id = process.argv[2];
  const ch = requireChapter(id);
  if (!ch.answersPdf || !ch.answerPages?.length) {
    console.log(`${id}: no answersPdf / answerPages in config — nothing to reconcile.`);
    return;
  }
  const dataPath = questionsJsonPath(id);
  if (!existsSync(dataPath)) {
    console.log(`${id}: ${dataPath} not found — run merge.ts first.`);
    return;
  }
  const rows = JSON.parse(readFileSync(dataPath, "utf8")) as Row[];
  const key = parseKey(keyText(ch.answersPdf, ch.answerPages));
  const data = parseData(rows);

  console.log(`\nkey-items — ${ch.chapterName} (${rows.length} transcribed rows)\n`);
  let flags = 0;

  // Only reconcile exercises this chapter actually owns. The key pages are shared,
  // so a neighbouring chapter's EXERCISE block is in the same text and is NOT ours.
  const mine = new Set([...data.keys()]);
  for (const ex of [...key.keys()].filter((e) => mine.has(e)).sort()) {
    const k = key.get(ex)!;
    const d = data.get(ex)!;
    const kSet = new Set(k.items);
    const missingHere = k.items.filter((n) => !d.items.has(n));
    const extraHere = [...d.items].filter((n) => !kSet.has(n)).sort((a, b) => a - b);
    const subLines: string[] = [];
    for (const [n, list] of k.subs) {
      if (!list.length || !d.items.has(n)) continue;
      const have = d.subs.get(n) ?? new Set<string>();
      const miss = list.filter((s) => !have.has(s));
      // a keyed item with NO sub-rows at all is one undivided row, which is fine
      if (have.size && miss.length) subLines.push(`      Q${n}: key has (${miss.join(") (")}) with no row`);
    }
    const ok = !missingHere.length && !extraHere.length && !subLines.length;
    console.log(`  Exercise ${ex}  key=${k.items.length} items · transcribed=${d.items.size} items  ${ok ? "OK" : "CHECK"}`);
    if (missingHere.length) {
      console.log(`      KEY HAS, TRANSCRIPTION LACKS: Q${missingHere.join(", Q")}`);
      flags += missingHere.length;
    }
    if (extraHere.length) {
      console.log(`      TRANSCRIBED, KEY LACKS: Q${extraHere.join(", Q")}  (may be legitimate — unkeyed items are normal here)`);
    }
    for (const l of subLines) {
      console.log(l);
      flags++;
    }
  }
  const unseen = [...mine].filter((e) => !key.has(e)).sort();
  if (unseen.length) console.log(`\n  exercises with NO key block on these pages: ${unseen.join(", ")}`);
  console.log(`\n  ${flags} item(s) to check in the PDF.\n`);
}

main();
