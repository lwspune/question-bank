/**
 * NTA's JEE Main answer key, read from the text of NTA's public PDF
 * (`pdftotext -layout`), and the rule that marks one answer against it.
 *
 * WHAT NTA PRINTS. Per shift and per region ("For Centers in India" / "For
 * Centers Outside India", which carry DIFFERENT question IDs), three columns
 * (MATHEMATICS, PHYSICS, CHEMISTRY in the 2026 print), each row
 * "<question id> <answer>". An answer is one of:
 *   - an option ID (MCQ) or a number (numeric questions), e.g. 6911213, 126
 *   - several accepted ones: "6911214242, 6911214244" or "41 or 42"
 *   - "Dropped"
 *   - "Any non -negative Integer"
 * All seen in the real 2026 Session 2 final key (tests/score-calc-nta-key.test.ts).
 *
 * WHY A GRAMMAR, NOT COLUMN POSITIONS. The column offsets drift from block to
 * block, and a long answer ("Any non -negative Integer") pushes the next column
 * right. Entries strictly alternate question ID / answer, and a multi-value
 * answer always says so ("," or "or"), so reading entries in order is exact.
 *
 * WHY IT THROWS. Every subject of every shift must come out at 25 questions;
 * a page break or a new print quirk that loses one fails the key load loudly
 * instead of scoring students against a short key.
 */

export type NtaSubject = "maths" | "physics" | "chemistry";

export type NtaAnswer =
  | { kind: "values"; values: string[] }
  | { kind: "dropped" }
  | { kind: "any-non-negative-integer" };

export interface NtaKeyEntry {
  subject: NtaSubject;
  answer: NtaAnswer;
}

export interface NtaKeyShift {
  region: "india" | "outside";
  /** ISO date, e.g. "2026-04-02". */
  date: string;
  /** 1 = First, 2 = Second. */
  shift: number;
  /** Question ID -> entry. */
  entries: Map<string, NtaKeyEntry>;
}

const QUESTIONS_PER_SUBJECT = 25;
const ANY_TOKEN = "__ANY_NON_NEGATIVE_INTEGER__";
const SUBJECT_NAMES: Record<string, NtaSubject> = {
  MATHEMATICS: "maths",
  PHYSICS: "physics",
  CHEMISTRY: "chemistry",
};
const SHIFT_WORDS: Record<string, number> = { first: 1, second: 2 };

function readEntries(line: string): { qid: string; answer: NtaAnswer }[] {
  const tokens = line
    .replace(/Any\s+non\s*-\s*negative\s+Integer/gi, ` ${ANY_TOKEN} `)
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const out: { qid: string; answer: NtaAnswer }[] = [];
  let i = 0;
  while (i < tokens.length) {
    const qid = tokens[i++];
    if (!/^\d{5,}$/.test(qid)) throw new Error(`Expected a question ID, found "${qid}" in: ${line.trim()}`);
    const first = tokens[i];
    if (first === undefined) throw new Error(`Question ${qid} has no answer in: ${line.trim()}`);
    if (/^dropped$/i.test(first)) {
      out.push({ qid, answer: { kind: "dropped" } });
      i += 1;
      continue;
    }
    if (first === ANY_TOKEN) {
      out.push({ qid, answer: { kind: "any-non-negative-integer" } });
      i += 1;
      continue;
    }
    const values: string[] = [];
    for (;;) {
      const tok = tokens[i++];
      if (tok === undefined) throw new Error(`Question ${qid} ends mid-answer in: ${line.trim()}`);
      const more = tok.endsWith(",");
      const value = tok.replace(/,$/, "");
      if (!/^-?\d+(\.\d+)?$/.test(value)) throw new Error(`Question ${qid} has answer "${tok}" in: ${line.trim()}`);
      values.push(value);
      if (more) continue;
      if (tokens[i]?.toLowerCase() === "or") {
        i += 1;
        continue;
      }
      break;
    }
    out.push({ qid, answer: { kind: "values", values } });
  }
  return out;
}

function checkShift(s: NtaKeyShift): void {
  const counts: Record<NtaSubject, number> = { maths: 0, physics: 0, chemistry: 0 };
  for (const e of s.entries.values()) counts[e.subject] += 1;
  for (const [subject, n] of Object.entries(counts)) {
    if (n !== QUESTIONS_PER_SUBJECT) {
      throw new Error(
        `Key for ${s.date} shift ${s.shift} (${s.region}): ${subject} has ${n} questions, expected ${QUESTIONS_PER_SUBJECT}.`,
      );
    }
  }
}

export function parseNtaKeyText(text: string): NtaKeyShift[] {
  const shifts: NtaKeyShift[] = [];
  let region: NtaKeyShift["region"] | null = null;
  let current: NtaKeyShift | null = null;
  let subjects: NtaSubject[] | null = null;

  const finish = () => {
    if (current) {
      checkShift(current);
      shifts.push(current);
    }
    current = null;
    subjects = null;
  };

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;

    const regionMatch = /For Centers (in|Outside) India/i.exec(line);
    if (regionMatch) {
      region = regionMatch[1].toLowerCase() === "in" ? "india" : "outside";
      continue;
    }

    const head = /Exam Date\s*:\s*(\d{2})\.(\d{2})\.(\d{4})\s+Exam Shift\s*:\s*(\w+)/i.exec(line);
    if (head) {
      const shiftNo = SHIFT_WORDS[head[4].toLowerCase()];
      if (!region) throw new Error(`Shift header before any "For Centers" line: ${line}`);
      if (!shiftNo) throw new Error(`Unknown shift "${head[4]}" in: ${line}`);
      const date = `${head[3]}-${head[2]}-${head[1]}`;
      // A shift continued over a page repeats its header: keep adding to it.
      if (current && current.region === region && current.date === date && current.shift === shiftNo) continue;
      finish();
      current = { region, date, shift: shiftNo, entries: new Map() };
      continue;
    }

    if (/^\(\s*[A-Z]/.test(line)) {
      const names = [...line.matchAll(/\(\s*([A-Z]+)\s*\)/g)].map((m) => SUBJECT_NAMES[m[1]]);
      if (names.length && names.every(Boolean)) subjects = names as NtaSubject[];
      continue;
    }

    if (!/^\d{5,}\s/.test(line)) continue; // titles, page numbers, column headings
    if (!current || !subjects) throw new Error(`Answer row outside a shift block: ${line}`);
    const shiftNow: NtaKeyShift = current;
    const cols: NtaSubject[] = subjects;
    const entries = readEntries(line);
    if (entries.length > cols.length) throw new Error(`More entries than subject columns in: ${line}`);
    entries.forEach((e, idx) => {
      if (shiftNow.entries.has(e.qid)) throw new Error(`Question ${e.qid} appears twice in ${shiftNow.date}.`);
      shiftNow.entries.set(e.qid, { subject: cols[idx], answer: e.answer });
    });
  }
  finish();
  return shifts;
}

/** Same number? Compares numerically when both sides are numbers ("41.00" = "41"). */
function sameValue(a: string, b: string): boolean {
  const num = /^-?\d+(\.\d+)?$/;
  if (num.test(a) && num.test(b)) return Number(a) === Number(b);
  return a === b;
}

/**
 * Mark one answer. `chosen` is the option ID (MCQ) or the typed number
 * (numeric), null when the student left it. `dropPolicy` is NTA's rule for a
 * dropped question: full marks to every candidate ("all") or only to those who
 * attempted it; it is a parameter until NTA's bulletin for the sitting is read.
 */
export function gradeNtaItem(
  answer: NtaAnswer,
  chosen: string | null,
  dropPolicy: "all" | "attempted" = "all",
): "right" | "wrong" | "blank" | "bonus" {
  const attempted = chosen !== null && chosen.trim() !== "";
  if (answer.kind === "dropped") return dropPolicy === "all" || attempted ? "bonus" : "blank";
  if (!attempted) return "blank";
  const given = chosen!.trim();
  if (answer.kind === "any-non-negative-integer") return /^\d+$/.test(given) ? "right" : "wrong";
  return answer.values.some((v) => sameValue(v, given)) ? "right" : "wrong";
}
