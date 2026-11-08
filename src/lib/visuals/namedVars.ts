/**
 * Named numbers for the scenes built from formulas (sketch, algebraSteps):
 * each var is a number or a formula of the vars before it (lib/visuals/expr,
 * never eval), so every number a picture uses is computed from the question's
 * givens, not typed in as a worked-out decimal. Pure.
 */
import { compileExpr } from "./expr";
import { obj, ParamError } from "./params";

/** Names a var may not take: the curve variable, the constants and every function. */
export const RESERVED = new Set(["x", "pi", "e", "sin", "cos", "tan", "asin", "acos", "atan", "exp", "log", "ln", "log10", "sqrt", "abs", "deg", "rad", "atan2", "min", "max", "floor", "mod"]);

/** A number, or a formula of the vars so far, evaluated (x = 0 when it appears). */
export function value(src: unknown, vars: Readonly<Record<string, number>>, field: string): number {
  if (typeof src === "number") {
    if (!Number.isFinite(src)) throw new ParamError(`${field} must be finite`);
    return src;
  }
  const r = compileExpr(src, vars);
  if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
  const v = r.fn(0);
  if (!Number.isFinite(v)) throw new ParamError(`${field} is not a finite number`);
  return v;
}

/**
 * Parse `vars`: each is a number or a formula of other vars, worked out once
 * the vars it names are known. The written order does not matter, because a
 * visual stored as Postgres jsonb comes back with its keys re-sorted (shortest
 * first): reading in key order hid 1,180 stored visuals (2026-11-08). A name no
 * var defines, or vars that name each other in a circle, is refused.
 */
export function parseVars(raw: unknown, limit: number): Record<string, number> {
  const vars: Record<string, number> = {};
  const src = raw === undefined ? {} : obj(raw);
  const names = Object.keys(src);
  if (names.length > limit) throw new ParamError(`at most ${limit} vars`);
  for (const n of names) {
    if (!/^[A-Za-z][A-Za-z0-9]{0,11}$/.test(n) || RESERVED.has(n)) throw new ParamError(`"${n}" cannot be a var name (letters and digits, not x, pi, e or a function)`);
  }
  // With every var's name known, a formula that still does not compile names
  // something no var defines, or is not a formula at all: report it as written.
  // (Compiled, not evaluated: a stand-in value could make sqrt or log fail.)
  const allNames = Object.fromEntries(names.map((m) => [m, 1]));
  for (const n of names) {
    if (typeof src[n] === "number") continue;
    const r = compileExpr(src[n], allNames);
    if ("error" in r) throw new ParamError(`vars.${n}: ${r.error}`);
  }

  let left = names;
  while (left.length) {
    const waiting: string[] = [];
    for (const n of left) {
      try {
        vars[n] = value(src[n], vars, `vars.${n}`);
      } catch (e) {
        // A var waiting on one not worked out yet tries again next round. Any other
        // failure (not finite, divides by zero) is the var's own fault.
        if (!(e instanceof ParamError) || !/unknown name/.test(e.message)) throw e;
        waiting.push(n);
      }
    }
    if (waiting.length === left.length) throw new ParamError(`vars ${waiting.join(", ")} name each other in a circle`);
    left = waiting;
  }
  return vars;
}
