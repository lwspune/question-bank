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

/** Parse `vars`: in order, each from the ones before it. */
export function parseVars(raw: unknown, limit: number): Record<string, number> {
  const vars: Record<string, number> = {};
  const src = raw === undefined ? {} : obj(raw);
  const names = Object.keys(src);
  if (names.length > limit) throw new ParamError(`at most ${limit} vars`);
  for (const n of names) {
    if (!/^[A-Za-z][A-Za-z0-9]{0,11}$/.test(n) || RESERVED.has(n)) throw new ParamError(`"${n}" cannot be a var name (letters and digits, not x, pi, e or a function)`);
    vars[n] = value(src[n], vars, `vars.${n}`);
  }
  return vars;
}
