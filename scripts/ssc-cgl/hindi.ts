// Pure core for the HINDI print of the SSC CGL response sheets (2026-10-20).
// Unit-tested in tests/ssc-cgl-hindi.test.ts. No IO here.
//
// SSC prints every non-English question twice in one cell, English then Hindi.
// The Hindi is READ from SSC's own image, never written from the English, and
// stored as a translation (migrations 0118 + 0171) of the canonical English
// row, so the hash, key, stats and mocks are untouched. The checks that matter
// (structure, script share, numbers matching between the two prints, KaTeX)
// are the Marathi lane's `checkMarathiPaper` (scripts/mh-ssc-10/marathi.ts):
// they say nothing Marathi-specific, so they are reused, not copied.
import { maskMathZones } from "../../src/components/math/parseLatex";
import type { MarathiQuestion } from "../mh-ssc-10/marathi";

/**
 * The skeleton a reader gets carries NO English wording (the Marathi lane's
 * lesson: a reader holding the English drifts into translating it). It does
 * carry the English row's maths, so both prints write a formula the same way.
 */
export function mathZones(text: string): string[] {
  return text.match(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g) ?? [];
}

/** True when an option has no letters outside maths (a number, a ratio, a sum
 *  of money, a formula), so its English text is the Hindi text too. */
export function isLanguageNeutral(text: string): boolean {
  return !/[A-Za-zऀ-ॿ]/.test(maskMathZones(text).masked);
}

const FIELD = /^(stem|context|A|B|C|D|note):\s?(.*)$/;
const BLOCK = /^Q\s+(\d+)\s*$/;

type Field = "stem" | "context" | "A" | "B" | "C" | "D" | "note";

/**
 * A draft is plain text, one block per question, because agents writing JSON
 * with Devanagari and LaTeX lose backslashes:
 *
 *   Q 3
 *   stem: A, B की पत्नी है। ...
 *   A: पोती
 *   B: पुत्री
 *   C: बहन
 *   D: भतीजी
 *
 * A line that starts no field continues the one above (blank lines kept
 * inside, trimmed at the ends). `#` lines are comments.
 */
export function parseHindiDraft(text: string): MarathiQuestion[] {
  const out: MarathiQuestion[] = [];
  let ref: string | null = null;
  let fields = new Map<Field, string[]>();
  let current: Field | null = null;

  const flush = () => {
    if (ref === null) return;
    const get = (f: Field) => fields.get(f)?.join("\n").trim();
    const stem = get("stem");
    if (!stem) throw new Error(`Q ${ref}: no stem`);
    const options = (["A", "B", "C", "D"] as const)
      .filter((l) => fields.has(l))
      .map((label) => ({ label, text: get(label) ?? "" }));
    const q: MarathiQuestion = { ref, stem, ...(options.length ? { options } : {}) };
    const context = get("context");
    if (context) q.context = context;
    const note = get("note");
    if (note) q.note = note;
    out.push(q);
  };

  for (const line of text.replace(/\r\n/g, "\n").split("\n")) {
    if (line.startsWith("#")) continue;
    const block = line.match(BLOCK);
    if (block) {
      flush();
      ref = block[1];
      fields = new Map();
      current = null;
      continue;
    }
    const field = line.match(FIELD);
    if (field) {
      if (ref === null) throw new Error(`"${line.slice(0, 40)}" comes before the first "Q n" line`);
      const f = field[1] as Field;
      if (fields.has(f)) throw new Error(`Q ${ref}: ${f} given twice`);
      fields.set(f, [field[2]]);
      current = f;
      continue;
    }
    if (!line.trim() && current === null) continue;
    if (ref === null || current === null) {
      if (line.trim()) throw new Error(`"${line.slice(0, 40)}" comes before the first "Q n" line`);
      continue;
    }
    fields.get(current)!.push(line);
  }
  flush();
  return out;
}
