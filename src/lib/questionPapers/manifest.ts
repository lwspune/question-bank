/**
 * A board past paper as it was printed, built from its transcription (2026-10-09).
 *
 * The question bank stores each question once, so a paper cannot be read back
 * from it: a CBSE set shares most of its questions with the other two sets of
 * its group, and a shared question was committed only against the first set.
 * Every paper's full transcription survives in its pipeline's data folder,
 * with printed numbers, sections and marks. This turns one transcription into
 * the ordered item list /question-papers stores (migration 0146), each item
 * naming its bank question by the same fingerprint the commit used.
 *
 * PURE. The builder script (scripts/question-papers/build.ts) reads the files
 * and resolves the fingerprints to question ids.
 * Spec: tests/question-papers-manifest.test.ts.
 */
import { contentHash, subjectiveContentHash } from "@/lib/upload/hash";

/** One question as a CBSE transcription records it (scripts/cbse-12-pyq/data). */
export type SourceQuestion = {
  ref: string;
  questionNumber: string;
  section: string;
  marks: number;
  format: string;
  stem: string;
  context?: string | null;
  options?: { label: string; text: string }[];
  answer?: string;
  setId?: string | null;
  _alternativeTo?: string | null;
};

export type SourcePaper = {
  /** As printed: "55/1/2". */
  paper: string;
  year: number;
  pattern: string;
  questions: SourceQuestion[];
};

export type PaperItem = {
  position: number;
  /** As printed on the paper: "18 (b)", "29 (iv) (a)". */
  printedNumber: string;
  section: string;
  /** Null on a part of a question (`partOf`): the question carries its marks. */
  marks: number | null;
  /** The position this "OR" alternative replaces; null for an ordinary question. */
  alternativeTo: number | null;
  /** The question this item is a part of (Maharashtra papers, 0147); null otherwise. */
  partOf: number | null;
  /** Shared by a case study's parts, so its passage prints once. */
  caseKey: string | null;
  contentHash: string;
};

export type PaperSection = { key: string; title: string; note: string };

export type PaperManifest = {
  slug: string;
  /** A CBSE set group ("2025-55-1"): one page shows its three sets. */
  groupSlug: string;
  /** A CBSE set (1-3); null on a paper printed in one version (Maharashtra). */
  setNumber: number | null;
  paperCode: string | null;
  year: number;
  title: string;
  totalMarks: number;
  durationMinutes: number;
  sections: PaperSection[];
  items: PaperItem[];
};

export type ManifestResult = { ok: true; manifest: PaperManifest } | { ok: false; reason: string };

/** Printed maximum marks and time, by the transcription's `pattern`. */
export type PatternTotals = Record<string, { marks: number; minutes: number }>;

/**
 * CBSE Class 12's patterns 2022-2026. The 2022 papers are Term 2 papers (half
 * the syllabus, two hours); from 2023 a paper is 70 marks, or 80 for Maths.
 */
export const CBSE_12_PATTERNS: PatternTotals = {
  term2: { marks: 40, minutes: 120 },
  term2_sci: { marks: 35, minutes: 120 },
  term2_bio: { marks: 35, minutes: 120 },
  full70: { marks: 70, minutes: 180 },
  full70_phy_2023: { marks: 70, minutes: 180 },
  full70_chem_2023: { marks: 70, minutes: 180 },
  full80: { marks: 80, minutes: 180 },
};

/**
 * What a student can score: an "OR" alternative is a choice, not more marks,
 * so only the question it replaces counts.
 */
export function marksTotal(items: Pick<PaperItem, "marks" | "alternativeTo">[]): number {
  return items.reduce((sum, it) => (it.alternativeTo === null && it.marks !== null ? sum + it.marks : sum), 0);
}

function fingerprint(q: SourceQuestion): string {
  if (q.format === "subjective") return subjectiveContentHash(q.stem, q.context ?? null);
  return contentHash(q.stem, (q.options ?? []).map((o) => o.text), q.answer ?? "");
}

/** "Section B · 2 marks each" when every question in it carries the same marks. */
function sectionsOf(items: PaperItem[]): PaperSection[] {
  const order: string[] = [];
  const marks = new Map<string, Set<number>>();
  for (const it of items) {
    if (!marks.has(it.section)) {
      order.push(it.section);
      marks.set(it.section, new Set());
    }
    if (it.alternativeTo === null && it.marks !== null) marks.get(it.section)!.add(it.marks);
  }
  return order.map((key) => {
    const set = marks.get(key)!;
    const only = set.size === 1 ? [...set][0] : null;
    return {
      key,
      title: `Section ${key}`,
      note: only === null ? "" : `${only} mark${only === 1 ? "" : "s"} each`,
    };
  });
}

export function cbseManifest(
  src: SourcePaper,
  opts: { subjectName: string; totals?: PatternTotals }
): ManifestResult {
  const totals = (opts.totals ?? CBSE_12_PATTERNS)[src.pattern];
  if (!totals) return { ok: false, reason: `${src.paper} ${src.year}: unknown pattern "${src.pattern}"` };
  const code = src.paper.split("/");
  if (code.length !== 3 || code.some((c) => !/^\d+$/.test(c))) {
    return { ok: false, reason: `${src.year} "${src.paper}": a CBSE paper code is three numbers` };
  }
  const slug = `${src.year}-${code.join("-")}`;

  const positionOf = new Map<string, number>();
  const items: PaperItem[] = [];
  for (const [i, q] of src.questions.entries()) {
    const position = i + 1;
    let alternativeTo: number | null = null;
    if (q._alternativeTo) {
      const target = positionOf.get(q._alternativeTo);
      if (target === undefined) {
        return { ok: false, reason: `${slug} ${q.ref}: "OR" names ${q._alternativeTo}, which is not before it` };
      }
      alternativeTo = target;
    }
    if (!(q.marks > 0)) return { ok: false, reason: `${slug} ${q.ref}: no marks` };
    positionOf.set(q.ref, position);
    items.push({
      position,
      printedNumber: q.questionNumber,
      section: q.section,
      marks: q.marks,
      alternativeTo,
      partOf: null,
      caseKey: q.setId ?? null,
      contentHash: fingerprint(q),
    });
  }

  const total = marksTotal(items);
  if (total !== totals.marks) {
    return { ok: false, reason: `${slug}: marks add up to ${total}, the paper prints ${totals.marks}` };
  }

  return {
    ok: true,
    manifest: {
      slug,
      groupSlug: `${src.year}-${code[0]}-${code[1]}`,
      setNumber: Number(code[2]),
      paperCode: src.paper,
      year: src.year,
      title: `CBSE Class 12 ${opts.subjectName} ${src.year} (${src.paper})`,
      totalMarks: totals.marks,
      durationMinutes: totals.minutes,
      sections: sectionsOf(items),
      items,
    },
  };
}
