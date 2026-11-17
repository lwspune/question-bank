/**
 * A UP Board (UPMSP) paper as printed, built from its transcription for
 * /question-papers (2026-11-17). PURE. Spec: tests/question-papers-up.test.ts.
 *
 * A UP transcription carries marks on every row (like CBSE) and names an OR
 * alternative by the ref it replaces. What it does not carry is the printed
 * CHOICE of parts: "Do any five parts", at the head of a question whose six
 * parts are all transcribed. Those rules are read off the papers once
 * (scripts/up-board/data/attempt-rules.json) and passed in as `groups`, keyed
 * by the ref prefix of the question's part rows ("B2" for B2a ... B2f).
 *
 * The check that keeps the rules honest, as for Maharashtra (mhPattern.ts):
 * the most a student can score (a choice counted at `attempt` parts, one side
 * of each OR) must equal the paper's printed maximum. A paper that does not
 * fit is refused, never guessed.
 *
 * A part is every row under its letter: 2025 Maths 324 IZ prints Q9 (a) as one
 * 8-mark part and the transcription split it into (a) (i) + (a) (ii), so the
 * part is Q9a* and its marks are the sum, 4 + 4.
 *
 * An alternative may run over several rows (Chemistry 6 (a) OR (i)-(v)); each
 * names the same question it replaces, and the page prints OR once above them
 * (PaperViewItem.orBefore).
 */
import type { ManifestResult, PaperItem, PaperSection } from "./manifest";

export type UpSourceRow = {
  ref: string;
  /** As printed: "B2 (a)", "6 (a) (OR) (i)". */
  questionNumber: string;
  /** The printed section letter, or "" for a paper printed without sections. */
  section: string;
  marks: number;
  /** The ref of the question this OR alternative replaces. */
  alternativeTo?: string | null;
  setId?: string | null;
};

export type UpRules = {
  /** The printed maximum ("पूर्णांक"). */
  maxMarks: number;
  minutes: number;
  /** Questions that offer a choice of parts, by ref prefix. */
  groups?: Record<string, { attempt: number; each: number }>;
};

export type UpPaperMeta = { slug: string; groupSlug: string; title: string; year: number; paperCode: string | null };

const NO_SECTION = "Q";

/** The group a row's ref belongs to: the prefix followed by a part letter (B2 takes B2a, never B20a). */
function groupOf(ref: string, prefixes: string[]): string | null {
  return prefixes.find((p) => ref.startsWith(p) && /^[a-z]/.test(ref.slice(p.length))) ?? null;
}

/** A part's key: a roman numeral when the parts are numbered (B9ii), else its letter (Q9ai -> a). */
function partOf(rest: string): string {
  return /^(i|ii|iii|iv|v|vi|vii|viii|ix|x)$/.test(rest) ? rest : rest.slice(0, 1);
}

const marksWord = (n: number) => `${n} ${n === 1 ? "mark" : "marks"}`;

export function upManifest(meta: UpPaperMeta, rows: UpSourceRow[], fingerprints: string[], rules: UpRules): ManifestResult {
  const refuse = (reason: string): ManifestResult => ({ ok: false, reason: `${meta.slug}: ${reason}` });
  if (fingerprints.length !== rows.length) return refuse(`${fingerprints.length} fingerprints for ${rows.length} rows`);
  const groups = rules.groups ?? {};
  const prefixes = Object.keys(groups).sort((a, b) => b.length - a.length);

  // 1. Items in printed order; an OR points at the earlier question it replaces.
  const positionOf = new Map<string, number>();
  const items: PaperItem[] = [];
  for (const [i, r] of rows.entries()) {
    const position = i + 1;
    if (!(r.marks > 0)) return refuse(`${r.ref}: no marks`);
    let alternativeTo: number | null = null;
    if (r.alternativeTo) {
      const target = positionOf.get(r.alternativeTo);
      if (target === undefined) return refuse(`${r.ref}: "OR" names ${r.alternativeTo}, which is not before it`);
      alternativeTo = target;
    }
    positionOf.set(r.ref, position);
    items.push({
      position,
      printedNumber: r.questionNumber,
      section: r.section || NO_SECTION,
      marks: r.marks,
      alternativeTo,
      partOf: null,
      caseKey: r.setId ?? null,
      contentHash: fingerprints[i],
    });
  }

  // 2. Each choice must fit its parts: every part at `each` marks, `attempt` within reach.
  //    A part is keyed by the letter after the prefix, its marks summed over its rows.
  const parts = new Map<string, Map<string, number>>();
  for (const r of rows) {
    if (r.alternativeTo) continue;
    const g = groupOf(r.ref, prefixes);
    if (!g) continue;
    const mine = parts.get(g) ?? new Map<string, number>();
    const part = partOf(r.ref.slice(g.length));
    mine.set(part, (mine.get(part) ?? 0) + r.marks);
    parts.set(g, mine);
  }
  let reachable = 0;
  for (const [g, rule] of Object.entries(groups)) {
    const mine = parts.get(g);
    if (!mine) return refuse(`choice ${g} has no parts`);
    if (rule.attempt > mine.size) return refuse(`choice ${g} asks for ${rule.attempt} of ${mine.size} parts`);
    const odd = [...mine].find(([, m]) => m !== rule.each);
    if (odd) return refuse(`choice ${g}: part (${odd[0]}) carries ${odd[1]} marks, not ${rule.each}`);
    reachable += rule.attempt * rule.each;
  }

  // 3. Everything else counts once; an alternative not at all.
  for (const r of rows) if (!r.alternativeTo && !groupOf(r.ref, prefixes)) reachable += r.marks;
  if (reachable !== rules.maxMarks) {
    return refuse(`a student can score ${reachable} under these rules, the paper prints ${rules.maxMarks}`);
  }

  // 4. Sections in printed order: "N marks each" when uniform, and any choice in them.
  const order: string[] = [];
  for (const it of items) if (!order.includes(it.section)) order.push(it.section);
  const sections: PaperSection[] = order.map((key) => {
    const mine = rows.filter((r) => (r.section || NO_SECTION) === key && !r.alternativeTo);
    const marks = new Set(mine.map((r) => r.marks));
    const notes: string[] = [];
    const choices = Object.entries(groups).filter(([g]) => mine.some((r) => groupOf(r.ref, prefixes) === g));
    if (marks.size === 1 && choices.length === 0) notes.push(`${marksWord([...marks][0])} each`);
    for (const [g, rule] of choices) {
      const n = parts.get(g)!.size;
      notes.push(`Q.${g.replace(/^[A-Z]/, "")}: attempt any ${rule.attempt} of ${n} parts`);
    }
    return { key, title: key === NO_SECTION ? "Questions" : `Section ${key}`, note: notes.join("; ") };
  });

  return {
    ok: true,
    manifest: {
      slug: meta.slug,
      groupSlug: meta.groupSlug,
      setNumber: null,
      paperCode: meta.paperCode,
      year: meta.year,
      sitting: null,
      title: meta.title,
      totalMarks: rules.maxMarks,
      durationMinutes: rules.minutes,
      sections,
      items,
    },
  };
}
