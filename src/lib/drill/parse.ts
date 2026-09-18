/**
 * Request parsing for the drill's two POST routes — the one place an untrusted
 * body becomes trusted values.
 *
 * Pure, so the boundary rules are unit-testable without a request. Same shape
 * as `parsePracticeBatch`: a discriminated result, never a throw, and never a
 * silent default for a missing field. Spec: tests/drill-parse.test.ts.
 */
import { DRILL_SIZE } from "./select";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

/** The bank stores MCQ option labels as A-D uppercase. */
const LABELS = new Set(["A", "B", "C", "D"]);

export type ParsedAnswer =
  | { ok: true; questionId: string; label: string }
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

  const rawLabel = raw.label;
  if (typeof rawLabel !== "string") return { ok: false, error: "label is required." };
  const label = rawLabel.trim().toUpperCase();
  // Checked against the real label set rather than merely non-empty: the grader
  // compares labels, so an unrecognised one would not match the key and would
  // quietly record a WRONG answer the student never gave.
  if (!LABELS.has(label)) return { ok: false, error: "label must be one of A-D." };

  return { ok: true, questionId: id.trim().toLowerCase(), label };
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
