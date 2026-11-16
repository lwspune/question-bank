/**
 * How /dashboard/games arranges the catalogue: the subject x goal matrix,
 * filters, order and counts. Pure; the rows come from model.ts already checked.
 */
import type { ExamGoal } from "@/lib/exam/examContext";
import { EXAM_GOALS } from "@/lib/exam/examGoals";
import {
  EVIDENCE,
  GATE_VERDICTS,
  STRENGTHS,
  SUBJECTS,
  type EvidenceId,
  type Game,
  type GateId,
  type StrengthId,
  type SubjectId,
} from "./model";

export type Filters = { subject?: SubjectId; goal?: ExamGoal; gate?: GateId; evidence?: EvidenceId };

/** Only the values the page knows; anything else is dropped, never an error. */
export function parseFilters(params: Record<string, string | string[] | undefined>): Filters {
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const out: Filters = {};
  const subject = one(params.subject);
  const goal = one(params.goal);
  const gate = one(params.gate);
  const evidence = one(params.evidence);
  if (subject && SUBJECTS.some((s) => s.id === subject)) out.subject = subject as SubjectId;
  if (goal && (EXAM_GOALS as readonly string[]).includes(goal)) out.goal = goal as ExamGoal;
  if (gate && GATE_VERDICTS.some((g) => g.id === gate)) out.gate = gate as GateId;
  if (evidence && EVIDENCE.some((e) => e.id === evidence)) out.evidence = evidence as EvidenceId;
  return out;
}

/** A game matches a subject it teaches or one it is mapped to, and a goal it is mapped to. */
export function filterGames(games: Game[], f: Filters): Game[] {
  return games.filter(
    (g) =>
      (!f.subject || g.subjects.includes(f.subject) || g.fits.some((x) => x.subject === f.subject)) &&
      (!f.goal || g.fits.some((x) => x.goal === f.goal)) &&
      (!f.gate || g.gate.verdict === f.gate) &&
      (!f.evidence || g.evidence === f.evidence),
  );
}

const EVIDENCE_ORDER = EVIDENCE.map((e) => e.id) as EvidenceId[];
const STRENGTH_ORDER = STRENGTHS.map((s) => s.id) as StrengthId[];

/** Strongest evidence first, then by name. */
export function sortGames(games: Game[]): Game[] {
  return [...games].sort(
    (a, b) => EVIDENCE_ORDER.indexOf(a.evidence) - EVIDENCE_ORDER.indexOf(b.evidence) || a.name.localeCompare(b.name),
  );
}

export type MatrixCell = { id: string; name: string; strength: StrengthId };
export type MatrixRow = { subject: SubjectId; label: string; cells: Record<ExamGoal, MatrixCell[]> };

/**
 * One row per subject (SUBJECTS order), one cell per goal (EXAM_GOALS order),
 * holding every game mapped there: core first, then good, then stretch, then
 * by name. An empty cell is a gap: nothing out there fits it yet.
 */
export function buildMatrix(games: Game[]): { goals: readonly ExamGoal[]; rows: MatrixRow[] } {
  const rows = SUBJECTS.map((s) => {
    const cells = Object.fromEntries(EXAM_GOALS.map((g) => [g, [] as MatrixCell[]])) as Record<ExamGoal, MatrixCell[]>;
    for (const game of games) {
      for (const fit of game.fits) {
        if (fit.subject === s.id) cells[fit.goal].push({ id: game.id, name: game.name, strength: fit.strength });
      }
    }
    for (const g of EXAM_GOALS) {
      cells[g].sort(
        (a, b) => STRENGTH_ORDER.indexOf(a.strength) - STRENGTH_ORDER.indexOf(b.strength) || a.name.localeCompare(b.name),
      );
    }
    return { subject: s.id, label: s.label, cells };
  });
  return { goals: EXAM_GOALS, rows };
}

export function gateCounts(games: Game[]): Record<GateId, number> {
  const counts = Object.fromEntries(GATE_VERDICTS.map((g) => [g.id, 0])) as Record<GateId, number>;
  for (const g of games) counts[g.gate.verdict] += 1;
  return counts;
}
