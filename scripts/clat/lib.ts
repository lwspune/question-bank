/**
 * The CLAT lane's pure core. Spec: tests/clat-lib.test.ts.
 *
 * ── WHERE EACH PART OF A ROW COMES FROM ──────────────────────────────────────
 *   passage, stem, options        extract.py, from the Consortium's Set A booklet
 *                                 (text layer; 2022 repaired from OCR), never retyped,
 *                                 plus data/<year>.fixes.json for anything misread
 *   subject                       the printed section the question number falls in
 *   answer                        the Consortium's FINAL key for Set A (key.py)
 *   chapter, subtopic, solution,  a blind solver who never sees the key
 *   difficulty
 *
 * Owner policy 2026-10-29, as it applies here:
 *   - solver agrees with the key: the key's answer.
 *   - solver disagrees: a person reads it. The key stays and the solution is
 *     rewritten to teach it, OR (certain) the key is corrected with a notice.
 *   - the Consortium withdrew it, or accepted two options: one answer kept (the
 *     solver's, one the Consortium accepted), a notice above the solution, grace
 *     in every mock.
 */
import { textIssues } from "../cisce-pyq/lib";
import { styleIssues } from "../ugc-net/lib";
import { CLAT_TAXONOMY } from "./taxonomy";

export const LABELS = ["A", "B", "C", "D"] as const;
export type Label = (typeof LABELS)[number];
const DIFFICULTIES = ["Easy", "Moderate", "Hard"] as const;

export type ClatPassage = { id: string; printed: string; page: number; text: string };
export type ClatRow = { ref: string; section: string; page: number; passage: string | null; text: string; options: string[] };
export type ClatPaper = {
  year: number;
  source?: string;
  passages: ClatPassage[];
  /** Section directions printed between questions, e.g. 2023's "Assume that the statements ... are the applicable law." */
  directions: { beforeRef: string; text: string }[];
  rows: ClatRow[];
  anomalies?: string[];
};

/** Set A final key, question number -> "A".."D" | "W" (withdrawn) | "C/D" (either accepted). */
export type ClatKey = Record<string, string>;

export type KeyNotice = { withdrawn: string[]; either?: Record<string, string[]>; changed?: Record<string, string>; source: string };

const show = (v: string | undefined) => (v === "W" ? "Withdrawn" : (v ?? "nothing"));

/** The key TABLE (read by position) against what the final-key NOTIFICATION says changed. */
export function keyNoticeIssues(key: ClatKey, notice: KeyNotice): string[] {
  const out: string[] = [];
  for (const q of notice.withdrawn) if (key[q] !== "W") out.push(`Q${q}: the notice withdraws it, the key table reads ${show(key[q])}`);
  for (const [q, v] of Object.entries(key)) {
    if (v === "W" && !notice.withdrawn.includes(q)) out.push(`Q${q}: the key table reads Withdrawn, the notice does not list it`);
  }
  for (const [q, opts] of Object.entries(notice.either ?? {})) {
    if (key[q] !== opts.join("/")) out.push(`Q${q}: the notice accepts ${opts.join(" or ")}, the key table reads ${show(key[q])}`);
  }
  for (const [q, v] of Object.entries(notice.changed ?? {})) {
    if (key[q] !== v) out.push(`Q${q}: the notice sets ${v}, the key table reads ${show(key[q])}`);
  }
  return out;
}

export function paperIssues(paper: ClatPaper, sections: [string, number, number][]): string[] {
  const out: string[] = [];
  const n = sections[sections.length - 1][2];
  const passages = new Set(paper.passages.map((p) => p.id));
  for (const r of paper.rows) {
    const want = sections.find(([, a, b]) => Number(r.ref) >= a && Number(r.ref) <= b)?.[0];
    if (want && r.section !== want) out.push(`Q${r.ref}: section ${r.section}, years.json puts it in ${want}`);
  }
  const refs = paper.rows.map((r) => r.ref);
  if (refs.length !== n || refs.some((r, i) => r !== String(i + 1))) out.push(`rows run ${refs.join(", ")}; expected 1..${n} in order`);
  for (const r of paper.rows) {
    const at = `Q${r.ref}`;
    if (r.passage && !passages.has(r.passage)) out.push(`${at}: passage ${r.passage} does not exist`);
    if (r.options?.length !== 4) out.push(`${at}: needs 4 options, has ${r.options?.length ?? 0}`);
    else if (r.options.some((o) => !o.trim())) out.push(`${at}: empty option`);
    else if (new Set(r.options.map((o) => o.trim())).size !== 4) out.push(`${at}: duplicate option text`);
    if (!r.text?.trim()) out.push(`${at}: empty stem`);
    out.push(...textIssues(`${at} text`, r.text));
    for (const [i, o] of (r.options ?? []).entries()) out.push(...textIssues(`${at} option ${LABELS[i]}`, o));
  }
  for (const p of paper.passages) out.push(...textIssues(`${p.id}`, p.text));
  return out;
}

export type Fix = { target: string; field?: "text" | Label; find: string; replace: string; why: string };

function countOf(hay: string, needle: string): number {
  let n = 0;
  for (let i = hay.indexOf(needle); i >= 0; i = hay.indexOf(needle, i + 1)) n++;
  return n;
}

/**
 * Corrections to the extracted text, each a find that must occur EXACTLY once in
 * the named field, so a re-extraction that moves the text makes a fix fail loudly
 * instead of landing somewhere else. Targets: "P03" (a passage) or "Q12" (a stem,
 * or with `field` an option).
 */
export function applyFixes(paper: ClatPaper, fixes: readonly Fix[]): ClatPaper {
  const out: ClatPaper = structuredClone(paper);
  for (const f of fixes) {
    const field = f.field ?? "text";
    let get: () => string;
    let set: (s: string) => void;
    if (/^P\d+$/.test(f.target)) {
      const p = out.passages.find((x) => x.id === f.target);
      if (!p) throw new Error(`fix: no passage ${f.target}`);
      get = () => p.text;
      set = (s) => (p.text = s);
    } else {
      const r = out.rows.find((x) => `Q${x.ref}` === f.target);
      if (!r) throw new Error(`fix: no question ${f.target}`);
      if (field === "text") {
        get = () => r.text;
        set = (s) => (r.text = s);
      } else {
        const i = LABELS.indexOf(field);
        get = () => r.options[i];
        set = (s) => (r.options[i] = s);
      }
    }
    const n = countOf(get(), f.find);
    if (n !== 1) throw new Error(`fix ${f.target} ${field}: "${f.find}" occurs ${n} times (must be exactly once)`);
    set(get().replace(f.find, f.replace));
  }
  return out;
}

export type Confidence = "HIGH" | "MEDIUM" | "LOW";
export type DerivedEntry = {
  ref: string;
  label: string;
  working: string;
  difficulty: string;
  confidence: Confidence;
  chapter: string;
  subtopic: string;
  flag?: string;
  /** The solver's note on a misread word in the extracted text. */
  textFlag?: string;
};

export function derivedIssues(paper: ClatPaper, derived: readonly DerivedEntry[]): string[] {
  const out: string[] = [];
  const by = new Map(derived.map((x) => [x.ref, x]));
  for (const r of paper.rows) {
    const x = by.get(r.ref);
    const at = `Q${r.ref}`;
    if (!x) {
      out.push(`${at}: no derivation`);
      continue;
    }
    if (!LABELS.includes(x.label?.trim().toUpperCase() as Label)) out.push(`${at}: label "${x.label}" is not A-D`);
    if (!DIFFICULTIES.includes(x.difficulty as (typeof DIFFICULTIES)[number])) out.push(`${at}: difficulty "${x.difficulty}" is not Easy / Moderate / Hard`);
    const subject = CLAT_TAXONOMY.find((s) => s.name === r.section);
    const ch = subject?.chapters.find((c) => c.name === x.chapter);
    if (!ch) out.push(`${at}: chapter "${x.chapter}" is not a ${r.section} chapter`);
    else if (!ch.subtopics.includes(x.subtopic)) out.push(`${at}: subtopic "${x.subtopic}" is not one of ${x.chapter}'s`);
  }
  return out;
}

/** What a solver sees: passages, directions and questions. No answer-shaped field. */
export function blindPayload(paper: ClatPaper) {
  return {
    year: paper.year,
    passages: paper.passages.map((p) => ({ id: p.id, printed: p.printed, text: p.text })),
    directions: paper.directions,
    rows: paper.rows.map((r) => ({ ref: r.ref, section: r.section, passage: r.passage, text: r.text, options: r.options })),
  };
}

export type Verdict = "AGREE" | "DISAGREE" | "WITHDRAWN" | "EITHER" | "MISSING";

export function crosscheck(paper: ClatPaper, key: ClatKey, derived: readonly DerivedEntry[]) {
  const by = new Map(derived.map((x) => [x.ref, x]));
  const rows = paper.rows.map((r) => {
    const mine = by.get(r.ref)?.label?.trim().toUpperCase();
    const k = key[r.ref];
    let verdict: Verdict;
    if (!mine || !k) verdict = "MISSING";
    else if (k === "W") verdict = "WITHDRAWN";
    else if (k.includes("/")) verdict = "EITHER";
    else verdict = mine === k ? "AGREE" : "DISAGREE";
    return { ref: r.ref, section: r.section, verdict, derived: mine, key: k, confidence: by.get(r.ref)?.confidence, flag: by.get(r.ref)?.flag };
  });
  const agree = rows.filter((r) => r.verdict === "AGREE").length;
  const disagree = rows.filter((r) => r.verdict === "DISAGREE").length;
  return { rows, agree, disagree, scored: agree + disagree };
}

export type Adjudication = {
  ref: string;
  /** Replaces the solver's working; the key stays. The usual answer to a disagreement. */
  solution?: string;
  /** The key is wrong and the answer certain: the corrected letter. Needs a notice. */
  correctKey?: Label;
  /** For a withdrawn or either-answer question: the one answer to keep. */
  answer?: Label;
  /** Shown above the solution as "**Note:** ...". */
  notice?: string;
  /** Defective as printed: everyone gets its mark in a mock. Needs a notice. */
  grace?: true;
  /** Replaces the solver's taxonomy. */
  chapter?: string;
  subtopic?: string;
  why?: string;
};

export type AssembledRow = {
  ref: string;
  subject: string;
  chapter: string;
  subtopic: string;
  difficulty: (typeof DIFFICULTIES)[number];
  context?: string;
  text: string;
  solution: string;
  answer: Label;
  options: { label: Label; text: string; isCorrect: boolean }[];
  grace?: true;
};

/** The passage a row hangs off, led by any section directions printed before it. */
function contextOf(paper: ClatPaper, r: ClatRow): string | undefined {
  const passage = paper.passages.find((p) => p.id === r.passage)?.text;
  const dir = [...paper.directions]
    .filter((d) => Number(d.beforeRef) <= Number(r.ref))
    .filter((d) => paper.rows.find((x) => x.ref === d.beforeRef)?.section === r.section)
    .map((d) => d.text);
  const parts = [...dir, ...(passage ? [passage] : [])];
  return parts.length ? parts.join("\n\n") : undefined;
}

export function assembleYear(input: {
  paper: ClatPaper;
  key: ClatKey;
  derived: readonly DerivedEntry[];
  adjudications?: readonly Adjudication[];
}): { rows: AssembledRow[]; issues: string[] } {
  const issues: string[] = [];
  const rows: AssembledRow[] = [];
  const derived = new Map(input.derived.map((x) => [x.ref, x]));
  const adj = new Map((input.adjudications ?? []).map((x) => [x.ref, x]));

  for (const r of input.paper.rows) {
    const at = `Q${r.ref}`;
    const d = derived.get(r.ref);
    const a = adj.get(r.ref);
    if (!d) {
      issues.push(`${at}: no derivation`);
      continue;
    }
    const k = input.key[r.ref];
    if (!k) {
      issues.push(`${at}: not in the key`);
      continue;
    }
    const mine = d.label?.trim().toUpperCase() as Label;
    let answer: Label | undefined;
    let notice = a?.notice;
    let grace = a?.grace;

    if (k === "W") {
      answer = a?.answer ?? mine;
      notice ??=
        "The Consortium withdrew this question in its final answer key, so it was not scored in CLAT. The working below gives the answer it was set for.";
      grace = true;
    } else if (k.includes("/")) {
      const accepted = k.split("/") as Label[];
      answer = a?.answer ?? mine;
      if (!accepted.includes(answer)) {
        issues.push(`${at}: the Consortium accepted ${accepted.join(" and ")}; the kept answer (${answer}) must be one of them`);
        continue;
      }
      notice ??= `The Consortium's final answer key accepted both (${accepted.join(") and (")}) for this question.`;
      grace = true;
    } else if (a?.correctKey) {
      if (!a.notice?.trim()) {
        issues.push(`${at}: correcting the Consortium's key (${k} -> ${a.correctKey}) needs a notice`);
        continue;
      }
      answer = a.correctKey;
    } else if (mine !== k && !a?.solution) {
      issues.push(`${at}: solver ${mine} and the Consortium's key ${k} disagree; adjudicate`);
      continue;
    } else answer = k as Label;

    if (!answer || !LABELS.includes(answer)) {
      issues.push(`${at}: answer "${answer ?? ""}" names no option`);
      continue;
    }
    if (grace && !notice?.trim()) {
      issues.push(`${at}: grace needs a notice telling students why`);
      continue;
    }
    let solution = a?.solution ?? d.working;
    if (notice) solution = `**Note:** ${notice}\n\n${solution}`;
    const bad = [...textIssues(`${at} solution`, solution), ...styleIssues(`${at} solution`, solution)];
    if (!solution?.trim()) bad.push(`${at}: empty solution`);
    if (bad.length) {
      issues.push(...bad);
      continue;
    }
    const context = contextOf(input.paper, r);
    rows.push({
      ref: r.ref,
      subject: r.section,
      chapter: a?.chapter ?? d.chapter,
      subtopic: a?.subtopic ?? d.subtopic,
      difficulty: d.difficulty as AssembledRow["difficulty"],
      ...(context ? { context } : {}),
      text: r.text,
      solution,
      answer,
      options: r.options.map((text, i) => ({ label: LABELS[i], text, isCorrect: LABELS[i] === answer })),
      ...(grace ? { grace: true as const } : {}),
    });
  }
  return { rows, issues };
}
