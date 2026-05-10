import type { ParsedRow } from "./parser";

export type RowError = { sourceRow: number; message: string };

export type PropagateResult =
  | { ok: true; rows: ParsedRow[] }
  | { ok: false; errors: RowError[] };

/**
 * Within each set (rows sharing the same trimmed `setLabel`), propagate the
 * first row's `context` to subsequent rows whose context is blank.
 *
 * Errors:
 *  - Set has no non-blank context on any row → error on the FIRST row of the set
 *  - Two rows in the same set declare different non-blank contexts → error on
 *    the row that drifts (so the user sees which row to fix).
 *
 * Standalone rows (no setLabel) are left untouched. The result preserves
 * input order.
 */
export function propagateSetContext(rows: ParsedRow[]): PropagateResult {
  const out: ParsedRow[] = rows.map((r) => ({ ...r }));
  const errors: RowError[] = [];

  type SetState = { firstSourceRow: number; canonical: string | null };
  const states = new Map<string, SetState>();

  // First pass: discover canonical context per set + flag drift.
  for (const r of out) {
    const label = r.setLabel?.trim();
    if (!label) continue;
    const ctx = (r.context ?? "").trim();
    let state = states.get(label);
    if (!state) {
      state = { firstSourceRow: r.sourceRow, canonical: ctx ? ctx : null };
      states.set(label, state);
      continue;
    }
    if (!ctx) continue;
    if (state.canonical === null) {
      // Earlier rows of the set were blank — this is the first one with a
      // value, adopt it as canonical.
      state.canonical = ctx;
      continue;
    }
    if (state.canonical !== ctx) {
      errors.push({
        sourceRow: r.sourceRow,
        message: `Set '${label}' on row ${r.sourceRow} has a different context than the first row of the set (row ${state.firstSourceRow}). Type the context once on the first row of the set; leave subsequent rows blank.`,
      });
    }
  }

  // Sets with no canonical context anywhere → row-level error on the FIRST
  // row of the set.
  for (const [label, state] of states) {
    if (state.canonical === null) {
      errors.push({
        sourceRow: state.firstSourceRow,
        message: `Set '${label}' has no Question Context on any of its rows — type it on the first row of the set.`,
      });
    }
  }

  if (errors.length > 0) {
    errors.sort((a, b) => a.sourceRow - b.sourceRow);
    return { ok: false, errors };
  }

  // Second pass: propagate canonical onto every row in the set.
  for (const r of out) {
    const label = r.setLabel?.trim();
    if (!label) continue;
    const state = states.get(label)!;
    r.setLabel = label; // store the trimmed label
    r.context = state.canonical!;
  }

  return { ok: true, rows: out };
}
