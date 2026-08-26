/**
 * Gate for the CDS passage backfill: is every passage-dependent question
 * actually answerable from the passage stored with it?
 *
 *   npx tsx scripts/cds/audit-passages.ts            # every paper
 *   npx tsx scripts/cds/audit-passages.ts 2024-2 ... # named papers
 *
 * WHY THIS EXISTS. A truncated passage looks exactly like a complete one. On the
 * pilot, reading only the right-hand column of a two-column page produced a
 * passage that read perfectly end to end — and the word its question asked about
 * sat in the left column. Nothing about the result looked wrong; the only way to
 * catch it was to ask whether the specific text each answer depends on was
 * present. This automates the half of that check a machine can do.
 *
 *   P-PLACEHOLDER   the section still holds the "not stored" stub
 *   P-WORD-MISSING  a stem asks what a quoted word means, and it is not there
 *   P-THIN          a passage implausibly short for the questions it serves
 *
 * P-WORD-MISSING is the load-bearing rule and the reason the file is worth
 * having: it is exact, it needs no judgement, and it fires precisely on the
 * truncation case. P-THIN is a heuristic and only ever triage.
 *
 * What it CANNOT check: whether an inferential question's answer is supported.
 * That needs a reader. A clean run here is necessary, never sufficient — the
 * same relationship `snapcrop`'s `ok` has to a correct crop.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { DATA, PAPERS } from "./config";

type Section = { setLabel?: string; type: string; qFrom: number; qTo: number; passage?: string; directions?: string };
type Q = { number: number; stem: string; options?: { label: string; text: string }[]; answer?: string };

/**
 * What a vocabulary stem implies must be present in the passage.
 *
 * TWO OPPOSITE SHAPES, and conflating them makes the gate fire on every
 * correctly transcribed passage:
 *
 *   "What is the meaning of the word 'dilettantes' in the passage?"
 *        -> the QUOTED word is in the passage; the options are glosses.
 *
 *   "Which word in the passage means 'bias'?"
 *        -> the quoted word is the GLOSS and is NOT in the passage;
 *           the KEYED OPTION ("prejudice") is what must appear.
 *
 * Measured: reading only the first shape produced four findings on this corpus
 * and every one was a false positive of the second shape.
 */
export type Expect = { kind: "quoted" | "answer"; word: string };

export function expectedInPassage(stem: string, keyedOption?: string): Expect | null {
  // Shape B first — it is the more specific pattern, and its quoted word would
  // otherwise be misread as shape A.
  if (/\bwhich\s+word|\bword\s*\(s\)\b/i.test(stem) && /\bin\s+the\s+passage\b|\bfrom\s+the\s+passage\b/i.test(stem)) {
    const opt = (keyedOption ?? "").trim();
    // Only a single word can be looked up verbatim; a phrase-length option is
    // a paraphrase of an idea, not a token in the text.
    return opt && opt.split(/\s+/).length === 1 ? { kind: "answer", word: opt } : null;
  }
  const m = stem.match(/\b(?:word|phrase|expression)s?\b[^"'“‘]{0,24}["'“‘]([^"'”’]{2,40})["'”’]/i);
  if (!m) return null;
  const w = m[1].trim();
  // A multi-word quote is usually the ASSERTION being paraphrased ("all events
  // and human actions are ..."), not a word to find verbatim in the passage.
  return w.split(/\s+/).length <= 2 ? { kind: "quoted", word: w } : null;
}

/** Back-compat shim for the shape-A case; prefer expectedInPassage. */
export function askedWord(stem: string): string | null {
  const e = expectedInPassage(stem);
  return e && e.kind === "quoted" ? e.word : null;
}

export type Finding = { rule: string; paper: string; set: string; detail: string };

export function auditPaper(paperId: string, sections: Section[], questions: Q[]): Finding[] {
  const out: Finding[] = [];
  const byNum = new Map(questions.map((q) => [q.number, q]));
  for (const s of sections) {
    if (s.passage === undefined) continue;
    const label = `${s.setLabel ?? "?"} (${s.qFrom}-${s.qTo})`;
    const p = (s.passage ?? "").trim();
    const n = s.qTo - s.qFrom + 1;

    if (/not stored/i.test(p) || p.length < 300) {
      out.push({ rule: "P-PLACEHOLDER", paper: paperId, set: label, detail: `passage is ${p.length} chars — never transcribed` });
      continue;
    }
    // A cloze paragraph is legitimately short — it carries one blank every ~80
    // characters — so the RC-calibrated ratio fires on every correct cloze.
    // Measured: at 90 chars/question it flagged 6 sections, all of them cloze,
    // all of them fine.
    const perQ = /cloze/i.test(s.type) ? 40 : 90;
    if (p.length < n * perQ) {
      out.push({ rule: "P-THIN", paper: paperId, set: label, detail: `${p.length} chars serving ${n} ${s.type} questions` });
    }
    const hay = p.toLowerCase();
    for (let i = s.qFrom; i <= s.qTo; i++) {
      const q = byNum.get(i);
      if (!q) continue;
      const keyed = q.options?.find((o) => o.label === q.answer)?.text;
      const e = expectedInPassage(q.stem, keyed);
      if (e && !hay.includes(e.word.toLowerCase())) {
        const why = e.kind === "quoted"
          ? `Q${i} asks what ${JSON.stringify(e.word)} means — that word is absent from the passage`
          : `Q${i} asks which word means ${JSON.stringify(e.word)}; its keyed answer is absent from the passage`;
        out.push({ rule: "P-WORD-MISSING", paper: paperId, set: label, detail: why });
      }
    }
  }
  return out;
}

function main() {
  const named = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const ids = named.length ? named : Object.keys(PAPERS);
  const all: Finding[] = [];
  let scanned = 0;
  for (const id of ids) {
    const sp = join(DATA, `${id}.sections.json`);
    const qp = join(DATA, `${id}.questions.json`);
    if (!existsSync(sp) || !existsSync(qp)) { console.log(`${id}: no transcription files`); continue; }
    const sections = JSON.parse(readFileSync(sp, "utf8")) as Section[];
    const questions = JSON.parse(readFileSync(qp, "utf8")) as Q[];
    scanned += sections.filter((s) => s.passage !== undefined).length;
    all.push(...auditPaper(id, sections, questions));
  }

  const byRule = new Map<string, Finding[]>();
  for (const f of all) byRule.set(f.rule, [...(byRule.get(f.rule) ?? []), f]);
  console.log(`scanned ${scanned} passage section(s) across ${ids.length} paper(s)\n`);
  for (const rule of ["P-PLACEHOLDER", "P-WORD-MISSING", "P-THIN"]) {
    const fs = byRule.get(rule) ?? [];
    console.log(`${rule}: ${fs.length}`);
    for (const f of fs) console.log(`   ${f.paper} ${f.set.padEnd(18)} ${f.detail}`);
  }
  const blocking = (byRule.get("P-PLACEHOLDER") ?? []).length + (byRule.get("P-WORD-MISSING") ?? []).length;
  console.log(`\n${blocking} blocking finding(s).`);
  console.log(`NOTE: a clean run means no MECHANICAL gap. It cannot tell you an`);
  console.log(`inferential question's answer is supported — that still needs a reader.`);
  if (blocking) process.exitCode = 1;
}

if (require.main === module) main();
