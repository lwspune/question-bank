/**
 * Dual-blind check on the Part 4 idioms nobody could key.
 *
 *   npx tsx scripts/vocab/verify-idioms.ts dump [n-of-m]   # blind packets
 *   npx tsx scripts/vocab/verify-idioms.ts crosstab        # compare
 *
 * WHY THIS EXISTS. Every idiom in Part 4's "papers" section carries the meaning
 * a real question keyed, so it is checkable. The coaching-deck section has no
 * question, no key and no distractor set behind it, which means a confident
 * wrong meaning ships and nothing downstream can see it. The authors were
 * required to NAME what they were unsure of; this re-derives exactly those,
 * independently, and puts the two readings side by side.
 *
 * THE DUMP WITHHOLDS THE AUTHORED MEANING, and that is the whole point. A
 * verifier shown the first answer agrees with it -- this repo has measured that
 * failure directly, on a blind re-derivation that "confirmed" 89 keys while
 * reading a corrupted option set. Withheld at dump time rather than by asking
 * the agent not to look, because an instruction is not a control.
 *
 * IT PRODUCES A WORK LIST, NEVER A VERDICT. Agreement here is weaker evidence
 * than it looks: two passes can reach the same wrong meaning from the same
 * general knowledge, and on a corpus with no key there is nothing to break the
 * tie. A DISAGREEMENT is the useful output -- it marks an idiom where two
 * careful readings diverged, which is where a human should look first.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DATA = join(__dirname, "data");
const OUT = join(__dirname, "out");
const cmd = process.argv[2];

const flagged = JSON.parse(readFileSync(join(DATA, "idiom-flagged.json"), "utf8")) as string[];

/** The authored meanings, keyed on the headword exactly as stored. */
function authored(): Map<string, string> {
  const m = new Map<string, string>();
  for (const f of readdirSync(DATA).filter((f) => /^idioms-practice.+\.json$/.test(f))) {
    for (const e of JSON.parse(readFileSync(join(DATA, f), "utf8")) as { idiom: string; meaning: string }[]) {
      m.set(e.idiom, e.meaning);
    }
  }
  return m;
}

if (cmd === "dump") {
  const [n, of] = (process.argv[3] ?? "1-1").split("-").map(Number);
  const size = Math.ceil(flagged.length / of);
  const mine = flagged.slice((n - 1) * size, n * size);
  const lines = [
    `# Blind re-derivation — packet ${n} of ${of}`,
    ``,
    `${mine.length} idioms. For each, write what it means. You are NOT being shown`,
    `an existing meaning, and there is none to look up in this repo — that is`,
    `deliberate, so your reading is independent.`,
    ``,
    `Some of these headings are corrupt or non-standard (a deck typo, a truncation,`,
    `a phrase lifted mid-sentence). Where you believe the heading is a corruption of`,
    `a real idiom, SAY SO and give the real idiom's meaning. Where you genuinely do`,
    `not know, write "UNKNOWN" — that is a result, not a failure, and it is worth`,
    `more than a plausible guess.`,
    ``,
    `Answer as JSON: [{"idiom":"…","meaning":"…","confident":true|false,"note":"…"}]`,
    `Write to scripts/vocab/data/idiom-verify-${n}.json`,
    ``,
  ];
  for (const i of mine) lines.push(`## ${i}`, ``);
  const f = join(OUT, `idiom-verify-${n}.md`);
  writeFileSync(f, lines.join("\n"), "utf8");
  console.log(`wrote idiom-verify-${n}.md  (${mine.length} idioms)`);
} else if (cmd === "crosstab") {
  const auth = authored();
  const second = new Map<string, { meaning: string; confident: boolean; note?: string }>();
  for (const f of readdirSync(DATA).filter((f) => /^idiom-verify-\d+\.json$/.test(f))) {
    for (const e of JSON.parse(readFileSync(join(DATA, f), "utf8")) as any[]) {
      second.set(e.idiom, { meaning: e.meaning, confident: e.confident, note: e.note });
    }
  }
  const stop = new Set(["a","an","the","to","be","is","of","in","on","at","and","or","that","one","ones",
    "someone","something","who","which","with","for","from","by","it","its","as","so","not","without","up"]);
  /**
   * CRUDE STEMMING IS LOAD-BEARING, not a refinement. Without it this compares
   * the WORDS two people chose, not what they said: "smooth, insincere
   * flattery" and "smooth, flattering speech that is not sincere" are the same
   * meaning and share one token. On the first run that over-reported
   * divergence roughly fourfold, which would have sent a reviewer to read
   * thirteen entries that agree.
   */
  const stem = (w: string) =>
    w.replace(/ies$/, "y").replace(/(ing|edly|ed|es|s|ly|ness|ity|ance|ence|ation|tion)$/, "");
  const bag = (s: string) =>
    new Set(
      s.toLowerCase().replace(/[^a-z ]/g, " ").split(/\s+/)
        .filter((w) => w.length > 2 && !stop.has(w))
        .map(stem)
        .filter((w) => w.length > 2)
    );
  let agree = 0, diverge = 0, unknown = 0, missing = 0, soft = 0;
  const softRows: string[] = [];
  const rows: string[] = [];
  for (const i of flagged) {
    const a = auth.get(i), b = second.get(i);
    if (!a) { console.log(`  ?? ${i}: no authored meaning`); missing++; continue; }
    if (!b) { missing++; continue; }
    if (/^unknown/i.test(b.meaning.trim())) { unknown++; rows.push(`UNKNOWN   ${i}\n    authored: ${a}`); continue; }
    const [A, B] = [bag(a), bag(b.meaning)];
    const shared = [...A].filter((w) => B.has(w)).length;
    const overlap = shared / Math.max(1, Math.min(A.size, B.size));
    /**
     * TWO DIFFERENT OUTCOMES, and reporting them as one number overstates the
     * work. A LOW overlap means the two readings genuinely disagree about what
     * the idiom means -- that is the work list. A high overlap where pass 2 was
     * merely unsure of ITSELF means both passes said the same thing and one of
     * them flagged it; useful, but much weaker, and burying the first in the
     * second is how a real finding gets skimmed past.
     */
    if (overlap >= 0.34 && b.confident) { agree++; continue; }
    if (overlap >= 0.34) {
      soft++;
      softRows.push(`FLAGGED   ${i}   (agrees ${(overlap*100).toFixed(0)}%, pass 2 unsure)\n    authored: ${a}\n    pass 2  : ${b.meaning}`);
      continue;
    }
    diverge++;
    rows.push(
      `DIVERGE   ${i}   (overlap ${(overlap * 100).toFixed(0)}%${b.confident ? "" : ", pass 2 NOT confident"})\n` +
        `    authored: ${a}\n    pass 2  : ${b.meaning}${b.note ? `\n    note    : ${b.note}` : ""}`
    );
  }
  for (const r of rows) console.log(r + "\n");
  console.log("\n--- both passes AGREE, pass 2 flagged itself as unsure ---\n");
  for (const r of softRows) console.log(r + "\n");
  console.log(`agree=${agree}  SEMANTIC-DIVERGENCE=${diverge}  agree-but-flagged=${soft}  unknown=${unknown}  unanswered=${missing}  of ${flagged.length}`);
  console.log(`\nAgreement is NOT proof — two passes can be wrong the same way, and this`);
  console.log(`corpus has no key to break the tie. The divergences are the work list.`);
} else {
  throw new Error("usage: verify-idioms.ts dump <n-of-m> | crosstab");
}
