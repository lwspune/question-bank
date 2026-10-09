/**
 * A Maharashtra board paper (HSC Class 12, SSC Class 10) as printed, built
 * from its transcription and its MARKS PATTERN (2026-10-10). PURE.
 * Spec: tests/question-papers-mh-pattern.test.ts.
 *
 * Unlike a CBSE transcription, a Maharashtra one records no marks. Each paper
 * prints them per GROUP of questions: "Q. No. 3 to Q. No. 14 ... Two marks
 * each. (Attempt any Eight)", "2. (B) Solve the following (Any four) [8]". A
 * pattern (scripts/question-papers/patterns.ts) says that once per paper
 * family, as blocks:
 *
 *   { from: 3, to: 14, each: 2, attempt: 8 }  each main question is one question
 *   { ref: "Q2(B)", each: 2, attempt: 4 }      each sub-item of Q.2 (B) is one
 *   { ref: "Q4", marks: [1, 1, 2] }            marks printed per question
 *   { ref: "Q6", each: 6, or: true }           (A) OR (B)
 *
 * Within a block, a question is the ref one level below the block (or the main
 * number, for a range). Anything deeper is a PART of that question: a paper
 * prints "Q. 31 [4]" over "(i) derive ... (ii) calculate ..." and never says
 * how the 4 divide, so the question carries the marks and its parts none
 * (migration 0147).
 *
 * The check that keeps a pattern honest: the most a student can score under it
 * (attempt-any counted, one side of an OR) must equal the paper's printed
 * maximum. A paper whose questions do not fit is refused, never guessed.
 */
import type { ManifestResult, PaperItem, PaperSection, SourceQuestion } from "./manifest";

export type PatternBlock =
  | {
      ref: string;
      each?: number;
      marks?: number[];
      attempt?: number;
      or?: boolean;
      /** Every item is its own question, however deep (older SSC Science Q.1 (A)). */
      leaf?: boolean;
      section?: string;
    }
  | { from: number; to: number; each: number; attempt?: number; section?: string };

export type MarksPattern = {
  /** The printed "Max. Marks". */
  maxMarks: number;
  minutes: number;
  blocks: PatternBlock[];
  /** Named sections by main question range (HSC). Absent, each block heads itself. */
  sections?: { key: string; title: string; from: number; to: number }[];
};

export type MhPaperMeta = {
  slug: string;
  groupSlug: string;
  title: string;
  year: number;
  sitting: string | null;
  paperCode: string | null;
};

/**
 * "Q. 31(ii)" → ["31", "ii"]; "Q1(A)(i)" → ["1", "A", "i"]; "Q.1.i" (HSC
 * Chemistry's transcription) → ["1", "i"]; null if unreadable.
 */
export function parseRef(ref: string): string[] | null {
  const dotted = /^Q\.?\s*(\d+)((?:\.[A-Za-z0-9]+)+)$/.exec(ref.trim());
  if (dotted) return [dotted[1], ...dotted[2].split(".").filter(Boolean)];
  const m = /^Q\.?\s*(\d+)\.?\s*((?:\(\s*[A-Za-z0-9]+\s*\)\s*)*)$/.exec(ref.trim());
  if (!m) return null;
  const subs = [...m[2].matchAll(/\(\s*([A-Za-z0-9]+)\s*\)/g)].map((x) => x[1]);
  return [m[1], ...subs];
}

/** ["2", "A", "1"] → "2 (A) (1)", as the paper prints it. */
export function printedNumber(tokens: string[]): string {
  return [tokens[0], ...tokens.slice(1).map((t) => `(${t})`)].join(" ");
}

function marksWord(n: number): string {
  return `${n} ${n === 1 ? "mark" : "marks"}`;
}

type Matched = { block: PatternBlock; blockIndex: number; unit: string };

/** Which block an item belongs to (longest ref prefix, else a range), and its question. */
function match(tokens: string[], blocks: PatternBlock[]): Matched | null {
  let best: Matched | null = null;
  let bestLen = -1;
  blocks.forEach((b, blockIndex) => {
    if ("ref" in b) {
      const prefix = parseRef(b.ref);
      if (!prefix || prefix.length > tokens.length) return;
      if (prefix.some((t, i) => t !== tokens[i])) return;
      if (prefix.length > bestLen) {
        bestLen = prefix.length;
        const depth = b.leaf ? tokens.length : Math.min(tokens.length, prefix.length + 1);
        best = { block: b, blockIndex, unit: tokens.slice(0, depth).join("|") };
      }
    } else {
      const n = Number(tokens[0]);
      if (n >= b.from && n <= b.to && bestLen < 1) {
        bestLen = 0;
        best = { block: b, blockIndex, unit: tokens[0] };
      }
    }
  });
  return best;
}

function blockSectionKey(b: PatternBlock, sections: MarksPattern["sections"], firstTokens: string[]): string {
  if (b.section) return b.section;
  const main = Number(firstTokens[0]);
  const named = sections?.find((s) => main >= s.from && main <= s.to);
  if (named) return named.key;
  if ("ref" in b) return printedNumber(parseRef(b.ref)!);
  return String(b.from);
}

function blockNote(b: PatternBlock, units: number): string {
  if ("ref" in b && b.marks) return "marks as printed";
  const each = b.each!;
  if ("ref" in b && b.or) return `${marksWord(each)} · answer one`;
  const base = units === 1 ? marksWord(each) : `${marksWord(each)} each`;
  return b.attempt ? `${base} · attempt any ${b.attempt}` : base;
}

export function mhManifest(
  src: MhPaperMeta & { questions: SourceQuestion[] },
  pattern: MarksPattern,
  fingerprint: (q: SourceQuestion) => string
): ManifestResult {
  const refuse = (reason: string): ManifestResult => ({ ok: false, reason: `${src.slug}: ${reason}` });

  // 1. Every item to its block and question, in printed order.
  const rows: { q: SourceQuestion; tokens: string[]; m: Matched }[] = [];
  for (const q of src.questions) {
    const tokens = parseRef(q.ref);
    if (!tokens) return refuse(`cannot read the reference "${q.ref}"`);
    const m = match(tokens, pattern.blocks);
    if (!m) return refuse(`"${q.ref}" fits no block of the marks pattern`);
    rows.push({ q, tokens, m });
  }

  // 2. Each block's questions (units), in order of first appearance.
  const unitsOf = new Map<number, string[]>();
  for (const r of rows) {
    const list = unitsOf.get(r.m.blockIndex) ?? [];
    if (!list.includes(r.m.unit)) list.push(r.m.unit);
    unitsOf.set(r.m.blockIndex, list);
  }

  // 3. The pattern must hold for this paper: attempt-any within reach, printed
  //    marks one per question, and the best possible score = the printed maximum.
  let reachable = 0;
  for (const [i, b] of pattern.blocks.entries()) {
    const units = unitsOf.get(i)?.length ?? 0;
    if (units === 0) return refuse(`block ${JSON.stringify(b)} has no questions`);
    if ("ref" in b && b.marks) {
      if (b.marks.length !== units) return refuse(`${b.ref} prints ${b.marks.length} marks for ${units} questions`);
      if (b.attempt || b.or) return refuse(`${b.ref}: printed marks cannot also be a choice`);
      reachable += b.marks.reduce((a, x) => a + x, 0);
      continue;
    }
    if (!b.each || b.each <= 0) return refuse(`block ${JSON.stringify(b)} has no marks`);
    if ("ref" in b && b.or) {
      if (units < 2) return refuse(`${b.ref} is an OR with ${units} side`);
      reachable += b.each;
      continue;
    }
    if (b.attempt !== undefined && b.attempt > units) {
      return refuse(`block ${JSON.stringify(b)} asks for ${b.attempt} of ${units} questions`);
    }
    reachable += b.each * (b.attempt ?? units);
  }
  if (reachable !== pattern.maxMarks) {
    return refuse(`a student can score ${reachable} under this pattern, the paper prints ${pattern.maxMarks}`);
  }

  // 4. Items: a question's first item carries its marks, later ones are parts.
  const headOf = new Map<string, number>(); // blockIndex|unit → position
  const firstOrHead = new Map<number, number>(); // or-block → position of its first side
  const sectionOf = new Map<number, string>(); // blockIndex → section key
  const items: PaperItem[] = rows.map((r, i) => {
    const position = i + 1;
    const key = `${r.m.blockIndex}|${r.m.unit}`;
    const b = r.m.block;
    if (!sectionOf.has(r.m.blockIndex)) sectionOf.set(r.m.blockIndex, blockSectionKey(b, pattern.sections, r.tokens));
    const head = headOf.get(key);
    let marks: number | null = null;
    let alternativeTo: number | null = null;
    if (head === undefined) {
      headOf.set(key, position);
      const unitIndex = unitsOf.get(r.m.blockIndex)!.indexOf(r.m.unit);
      marks = "ref" in b && b.marks ? b.marks[unitIndex] : b.each!;
      if ("ref" in b && b.or) {
        if (!firstOrHead.has(r.m.blockIndex)) firstOrHead.set(r.m.blockIndex, position);
        else alternativeTo = firstOrHead.get(r.m.blockIndex)!;
      }
    }
    return {
      position,
      printedNumber: printedNumber(r.tokens),
      section: sectionOf.get(r.m.blockIndex)!,
      marks,
      alternativeTo,
      partOf: head ?? null,
      caseKey: r.q.setId ?? null,
      contentHash: fingerprint(r.q),
    };
  });

  // 5. Sections in printed order, each with how it is marked.
  const sections: PaperSection[] = [];
  for (const [i, b] of pattern.blocks.entries()) {
    const key = sectionOf.get(i)!;
    const note = blockNote(b, unitsOf.get(i)!.length);
    const existing = sections.find((s) => s.key === key);
    if (existing) {
      if (!existing.note.split("; ").includes(note)) existing.note = `${existing.note}; ${note}`;
      continue;
    }
    const named = pattern.sections?.find((s) => s.key === key);
    sections.push({ key, title: named?.title ?? `Q.${key}`, note });
  }
  // A section's place is its first item's position.
  const order = new Map<string, number>();
  for (const it of items) if (!order.has(it.section)) order.set(it.section, it.position);
  sections.sort((a, z) => (order.get(a.key) ?? 0) - (order.get(z.key) ?? 0));

  return {
    ok: true,
    manifest: {
      slug: src.slug,
      groupSlug: src.groupSlug,
      setNumber: null,
      paperCode: src.paperCode,
      year: src.year,
      sitting: src.sitting,
      title: src.title,
      totalMarks: pattern.maxMarks,
      durationMinutes: pattern.minutes,
      sections,
      items,
    },
  };
}
