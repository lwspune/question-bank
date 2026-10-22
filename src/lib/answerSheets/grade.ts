/**
 * The grade checker for a checked answer sheet (migration 0153). PURE.
 * Spec: tests/answer-sheets-grade.test.ts.
 *
 * A grade is written by hand in a chat session (scripts/grading/GRADING.md),
 * so this is the gate before a student sees it: one grade per question that
 * carries marks, never more than its marks, at most one side of an OR scored,
 * feedback wherever marks were given or lost, and a total within the paper's
 * maximum. The database enforces the per-question bounds again (0153); this
 * names every problem at once so a whole file can be fixed in one pass.
 *
 * Every scored question that lost marks names ONE cause (and, for a concept
 * or steps left out, the topic to work on): the report adds the lost marks up
 * by cause, so the choice must be the same in every session (GRADING.md, "Why
 * marks were lost"; migration 0175).
 *
 * "Attempt any N" is NOT checked per section: the paper prints it only as a
 * note, and a wrong parse would refuse an honest grade. The total-within-
 * maximum rule catches a grade that counted too many; GRADING.md says how to
 * mark the extras (`not_counted`).
 */
import type { PaperItemRow } from "@/lib/questionPapers/listing";

export const OUTCOMES = ["scored", "not_attempted", "not_counted"] as const;
export type GradeOutcome = (typeof OUTCOMES)[number];

/** Why a scored question lost marks (migration 0175). */
export const CAUSES = ["concept", "incomplete", "careless", "misread", "mcq"] as const;
export type GradeCause = (typeof CAUSES)[number];
/** Causes whose report line needs a topic: the idea to relearn, the step to show. */
export const TOPIC_CAUSES: readonly GradeCause[] = ["concept", "incomplete"];

/** Mirrors the database CHECKs in 0153 and 0175. */
export const MAX_FEEDBACK_CHARS = 1000;
export const MAX_SUMMARY_CHARS = 1500;
export const MAX_TOPIC_CHARS = 60;

export type GradeEntry = {
  position: number;
  /** The question's marks as the template printed them: catches a stale file. */
  max: number;
  outcome: GradeOutcome | "";
  awarded: number | null;
  earned: string;
  missing: string;
  /** Absent in a file written before 0175; read as empty. */
  cause?: string;
  topic?: string;
};

export type GradeFile = {
  submissionId: string;
  wentWell: string;
  nextSteps: string;
  grades: GradeEntry[];
  /** Marks on the pages, checked by pageMarks.ts once the grades pass. */
  marks?: unknown[];
};

/** One row of answer_grades, as the commit RPC takes it. */
export type GradeRow = {
  position: number;
  printedNumber: string;
  questionId: string;
  maxMarks: number;
  outcome: GradeOutcome;
  awarded: number | null;
  earned: string | null;
  missing: string | null;
  cause: GradeCause | null;
  topic: string | null;
};

export type GradeCheck =
  | { ok: true; rows: GradeRow[]; totalAwarded: number; wentWell: string; nextSteps: string }
  | { ok: false; errors: string[] };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function text(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/** The first question of an OR chain: every alternative points at an earlier one. */
function orRoot(position: number, byPos: Map<number, PaperItemRow>): number {
  let at = position;
  for (let guard = 0; guard < 50; guard++) {
    const prev = byPos.get(at)?.alternativeTo ?? null;
    if (prev === null) return at;
    at = prev;
  }
  return at;
}

export function validateGrade(input: { items: PaperItemRow[]; totalMarks: number; file: unknown }): GradeCheck {
  const { items, totalMarks, file } = input;
  const errors: string[] = [];
  if (!isObject(file) || !Array.isArray(file.grades)) {
    return { ok: false, errors: ["The grade file needs a `grades` list."] };
  }

  const byPos = new Map(items.map((i) => [i.position, i]));
  const gradable = items.filter((i) => (i.partOf ?? null) === null && i.marks !== null);
  const label = (pos: number) => `Q.${byPos.get(pos)?.printedNumber ?? pos}`;

  const wentWell = text(file.wentWell);
  const nextSteps = text(file.nextSteps);
  if (!wentWell) errors.push("`wentWell` is empty: name what the student did well.");
  if (!nextSteps) errors.push("`nextSteps` is empty: name what to work on next.");
  if (wentWell.length > MAX_SUMMARY_CHARS) errors.push(`\`wentWell\` is over ${MAX_SUMMARY_CHARS} characters.`);
  if (nextSteps.length > MAX_SUMMARY_CHARS) errors.push(`\`nextSteps\` is over ${MAX_SUMMARY_CHARS} characters.`);

  const seen = new Set<number>();
  const rows: GradeRow[] = [];
  for (const raw of file.grades as unknown[]) {
    if (!isObject(raw) || typeof raw.position !== "number") {
      errors.push("A grade entry has no numeric `position`.");
      continue;
    }
    const pos = raw.position;
    const it = byPos.get(pos);
    if (!it) {
      errors.push(`Position ${pos} is not in this paper.`);
      continue;
    }
    if ((it.partOf ?? null) !== null || it.marks === null) {
      errors.push(`${label(pos)} is a part of Q.${byPos.get(it.partOf!)?.printedNumber}: grade the whole question there.`);
      continue;
    }
    if (seen.has(pos)) {
      errors.push(`${label(pos)} is graded twice.`);
      continue;
    }
    seen.add(pos);

    const max = it.marks;
    if (raw.max !== max) {
      errors.push(`${label(pos)} is worth ${max} marks in this paper, not ${String(raw.max)} (a stale template?).`);
    }

    const outcome = raw.outcome;
    if (!OUTCOMES.includes(outcome as GradeOutcome)) {
      errors.push(`${label(pos)}: outcome must be one of ${OUTCOMES.join(", ")}.`);
      continue;
    }
    const earned = text(raw.earned);
    const missing = text(raw.missing);
    const cause = text(raw.cause);
    const topic = text(raw.topic);
    if (earned.length > MAX_FEEDBACK_CHARS || missing.length > MAX_FEEDBACK_CHARS) {
      errors.push(`${label(pos)}: feedback is over ${MAX_FEEDBACK_CHARS} characters.`);
    }

    let awarded: number | null = null;
    if (outcome === "scored") {
      const a = raw.awarded;
      if (typeof a !== "number" || !Number.isFinite(a)) {
        errors.push(`${label(pos)}: a scored question needs numeric \`awarded\`.`);
        continue;
      }
      if (a < 0) errors.push(`${label(pos)}: marks cannot be negative.`);
      if (a > max) errors.push(`${label(pos)}: ${a} is more than its ${max} mark${max === 1 ? "" : "s"}.`);
      if (Math.round(a * 2) !== a * 2) errors.push(`${label(pos)}: marks go in halves (${a}).`);
      if (a < max && !missing) errors.push(`${label(pos)}: marks were lost, so say what was missing.`);
      if (a === max && missing) {
        errors.push(`${label(pos)}: full marks, so leave \`missing\` empty (a note beside full marks reads as lost marks; put advice in nextSteps).`);
      }
      if (a > 0 && !earned) errors.push(`${label(pos)}: marks were given, so say what earned them.`);
      if (a < max) {
        if (!cause) errors.push(`${label(pos)}: marks were lost, so name the cause (${CAUSES.join(", ")}).`);
        else if (!CAUSES.includes(cause as GradeCause)) errors.push(`${label(pos)}: cause must be one of ${CAUSES.join(", ")}.`);
        else if (TOPIC_CAUSES.includes(cause as GradeCause) && !topic) {
          errors.push(`${label(pos)}: a ${cause} cause needs a \`topic\`: what to ${cause === "concept" ? "relearn" : "show"}.`);
        }
        if (topic.length > MAX_TOPIC_CHARS) errors.push(`${label(pos)}: the topic is over ${MAX_TOPIC_CHARS} characters.`);
      } else if (cause || topic) {
        errors.push(`${label(pos)}: full marks, so no cause or topic.`);
      }
      awarded = a;
    } else {
      if (cause || topic) errors.push(`${label(pos)}: no cause or topic on a question that is ${outcome}.`);
      if (raw.awarded !== null && raw.awarded !== undefined) {
        errors.push(`${label(pos)}: \`awarded\` must be null when the question is ${outcome}.`);
      }
      if (outcome === "not_counted" && !missing) {
        errors.push(`${label(pos)}: say why it was not counted (in \`missing\`).`);
      }
    }

    rows.push({
      position: pos,
      printedNumber: it.printedNumber,
      questionId: it.questionId,
      maxMarks: max,
      outcome: outcome as GradeOutcome,
      awarded,
      earned: earned || null,
      missing: missing || null,
      cause: cause && awarded !== null && awarded < max ? (cause as GradeCause) : null,
      topic: topic && awarded !== null && awarded < max ? topic : null,
    });
  }

  for (const it of gradable) {
    if (!seen.has(it.position)) errors.push(`${label(it.position)} has no grade.`);
  }

  // At most one side of an OR is scored.
  const scoredByRoot = new Map<number, number[]>();
  for (const r of rows) {
    if (r.outcome !== "scored") continue;
    const root = orRoot(r.position, byPos);
    scoredByRoot.set(root, [...(scoredByRoot.get(root) ?? []), r.position]);
  }
  for (const [, positions] of scoredByRoot) {
    if (positions.length > 1) {
      errors.push(`${positions.map(label).join(" and ")} are two sides of one OR: score one, mark the other not_counted.`);
    }
  }

  const scored = rows.filter((r) => r.outcome === "scored");
  if (rows.length > 0 && scored.length === 0) {
    errors.push("Nothing is scored. A sheet with no gradable answer is a rejection: use --reject with a reason.");
  }
  const totalAwarded = scored.reduce((s, r) => s + (r.awarded ?? 0), 0);
  if (totalAwarded > totalMarks) {
    errors.push(`The total ${totalAwarded} is over the paper's maximum of ${totalMarks}: count only the questions the paper allows (attempt any N).`);
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, rows: rows.sort((a, b) => a.position - b.position), totalAwarded, wentWell, nextSteps };
}
