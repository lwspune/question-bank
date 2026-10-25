/** Param readers the scenes share. Each returns the value or throws a ParamError naming the field. Pure. */

export class ParamError extends Error {}

export function obj(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new ParamError("params must be an object");
  return raw as Record<string, unknown>;
}

export function finite(o: Record<string, unknown>, key: string, opts: { min?: number; max?: number; optional?: false } = {}): number {
  const v = o[key];
  if (typeof v !== "number" || !Number.isFinite(v)) throw new ParamError(`${key} must be a number`);
  if (opts.min !== undefined && v < opts.min) throw new ParamError(`${key} must be at least ${opts.min}`);
  if (opts.max !== undefined && v > opts.max) throw new ParamError(`${key} must be at most ${opts.max}`);
  return v;
}

export function optionalFinite(o: Record<string, unknown>, key: string, opts: { min?: number; max?: number } = {}): number | undefined {
  return o[key] === undefined ? undefined : finite(o, key, opts);
}

/**
 * A label drawn inside the SVG as plain text. No backslash (LaTeX belongs in the
 * solution, not the picture) and nothing shaped like a tag. A bare < or > is
 * fine: an interval reads "π/4 < x < π/2", and React escapes text anyway.
 */
export function plainLabel(v: unknown, field: string, max = 24): string {
  if (typeof v !== "string" || v.trim() === "") throw new ParamError(`${field} must be non-empty text`);
  if (v.length > max) throw new ParamError(`${field} is longer than ${max} characters`);
  // Only a whole tag is refused ("<b>", "<img …>"), so inequalities pass with or
  // without spaces: "π/4 < x", "1<x<8".
  if (/\\/.test(v) || /<\/?[a-z!][^<>]*>/i.test(v)) throw new ParamError(`${field} must be plain text, no LaTeX or markup`);
  return v;
}

export function optionalLabel(o: Record<string, unknown>, key: string, max = 24): string | undefined {
  return o[key] === undefined ? undefined : plainLabel(o[key], key, max);
}

export function pair(o: Record<string, unknown>, key: string): [number, number] {
  const v = o[key];
  if (!Array.isArray(v) || v.length !== 2 || !v.every((x) => typeof x === "number" && Number.isFinite(x))) {
    throw new ParamError(`${key} must be two numbers`);
  }
  return [v[0], v[1]];
}

/** Run a reader and turn a ParamError into the scene contract's { error }. */
export function safely<P>(read: () => P): P | { error: string } {
  try {
    return read();
  } catch (e) {
    if (e instanceof ParamError) return { error: e.message };
    throw e;
  }
}
