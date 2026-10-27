/**
 * Request parsing for the drill's two POST routes — the one place an untrusted
 * body becomes trusted values.
 *
 * Pure, so the boundary rules are unit-testable without a request. Same shape
 * as `parsePracticeBatch`: a discriminated result, never a throw, and never a
 * silent default for a missing field. Spec: tests/drill-parse.test.ts.
 */
import { DRILL_SIZE } from "./select";
import { isSelfMark, type SelfMark } from "@/lib/questions/selfMark";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** The bank stores MCQ option labels as A-E uppercase (E: IMAT's fifth option). */
const LABELS = new Set(["A", "B", "C", "D", "E"]);

/** An MCQ answer carries the tapped `label`; a WRITTEN question's carries the
 *  student's own verdict, `selfMark` (lib/questions/selfMark, 2026-10-28). */
export type ParsedAnswer =
  | { ok: true; questionId: string; label: string; selfMark?: undefined }
  | { ok: true; questionId: string; selfMark: SelfMark; label?: undefined }
  | { ok: false; error: string };

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function parseDrillAnswer(raw: unknown): ParsedAnswer {
  if (!isObject(raw)) return { ok: false, error: "Invalid body." };

  const id = raw.questionId;
  if (typeof id !== "string" || !UUID_RE.test(id.trim().toLowerCase())) {
    return { ok: false, error: "questionId must be a uuid." };
  }

  const questionId = id.trim().toLowerCase();
  if (raw.selfMark !== undefined) {
    // Both at once: which one would be recorded? Neither guess is safe.
    if (raw.label !== undefined) return { ok: false, error: "Send label or selfMark, not both." };
    if (!isSelfMark(raw.selfMark)) return { ok: false, error: "selfMark must be understood or review." };
    return { ok: true, questionId, selfMark: raw.selfMark };
  }

  const rawLabel = raw.label;
  if (typeof rawLabel !== "string") return { ok: false, error: "label is required." };
  const label = rawLabel.trim().toUpperCase();
  // Checked against the real label set rather than merely non-empty: the grader
  // compares labels, so an unrecognised one would not match the key and would
  // quietly record a WRONG answer the student never gave.
  if (!LABELS.has(label)) return { ok: false, error: "label must be one of A-E." };

  return { ok: true, questionId, label };
}

export type ParsedComplete =
  | { ok: true; questionIds: string[] }
  | { ok: false; error: string };

/** A drill is DRILL_SIZE questions; the cap allows a little headroom in case
 *  the size ever changes, and refuses a caller inflating `size` in the log. */
const MAX_COMPLETE_IDS = DRILL_SIZE * 4;

export function parseDrillComplete(raw: unknown): ParsedComplete {
  if (!isObject(raw)) return { ok: false, error: "Invalid body." };
  const ids = raw.questionIds;
  if (!Array.isArray(ids)) return { ok: false, error: "questionIds must be an array." };

  const out: string[] = [];
  for (const v of ids) {
    if (typeof v !== "string") return { ok: false, error: "questionIds must be uuids." };
    const norm = v.trim().toLowerCase();
    if (!UUID_RE.test(norm)) return { ok: false, error: "questionIds must be uuids." };
    if (!out.includes(norm)) out.push(norm);
  }

  // Dedupe FIRST, cap second: a client that repeated one id has not completed a
  // 50-question drill, it has completed a 1-question one.
  if (out.length === 0) return { ok: false, error: "questionIds must not be empty." };
  if (out.length > MAX_COMPLETE_IDS) return { ok: false, error: "Too many questionIds." };

  return { ok: true, questionIds: out };
}
