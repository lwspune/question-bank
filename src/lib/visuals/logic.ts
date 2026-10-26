/**
 * Statement logic for the truth-table scene: a closed formula language, never
 * eval. A visual stores "(p & ~q) -> r" (or the bank's own ∼ ∧ ∨ → ↔), the
 * scene parses it, fills every row of its truth table and answers from that.
 * Pure. Spec: tests/visuals-logic.test.ts.
 *
 *   iff   := imp ('<->' imp)*          left to right
 *   imp   := or ('->' imp)?            right-associative: p -> q -> r = p -> (q -> r)
 *   or    := and ('|' and)*
 *   and   := not ('&' not)*
 *   not   := '~' not | atom
 *   atom  := a single letter p..z | T | F | '(' iff ')'
 *
 * The bank's symbols are accepted as written: ∼ ¬ for not, ∧ for and, ∨ for
 * or, → ⇒ for implies, ↔ ⇔ for iff. `v` is a variable, never "or".
 */

export type Logic =
  | { k: "var"; n: string }
  | { k: "const"; v: boolean }
  | { k: "not"; a: Logic }
  | { k: "and" | "or" | "imp" | "iff"; a: Logic; b: Logic };

export type Transform = "negation" | "converse" | "inverse" | "contrapositive" | "dual";

const MAX_LENGTH = 140;

class LogicError extends Error {}

type Tok = { t: "var"; n: string } | { t: "const"; v: boolean } | { t: "op"; o: "~" | "&" | "|" | "->" | "<->" | "(" | ")" };

function tokenize(src: string): Tok[] {
  if (src.length > MAX_LENGTH) throw new LogicError(`formula is longer than ${MAX_LENGTH} characters`);
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (src.startsWith("<->", i)) {
      out.push({ t: "op", o: "<->" });
      i += 3;
    } else if (src.startsWith("->", i)) {
      out.push({ t: "op", o: "->" });
      i += 2;
    } else if (c === "↔" || c === "⇔") {
      out.push({ t: "op", o: "<->" });
      i++;
    } else if (c === "→" || c === "⇒") {
      out.push({ t: "op", o: "->" });
      i++;
    } else if (c === "~" || c === "∼" || c === "¬") {
      out.push({ t: "op", o: "~" });
      i++;
    } else if (c === "&" || c === "∧") {
      out.push({ t: "op", o: "&" });
      i++;
    } else if (c === "|" || c === "∨") {
      out.push({ t: "op", o: "|" });
      i++;
    } else if (c === "(" || c === ")") {
      out.push({ t: "op", o: c });
      i++;
    } else if (/[a-zA-Z]/.test(c)) {
      // One letter per name: "pq" is two names side by side, which the grammar refuses.
      if (i + 1 < src.length && /[a-zA-Z0-9]/.test(src[i + 1])) throw new LogicError(`"${src.slice(i).match(/^[a-zA-Z0-9]+/)![0]}" is not a single-letter statement`);
      if (c === "T" || c === "F") out.push({ t: "const", v: c === "T" });
      else if (/[p-z]/.test(c)) out.push({ t: "var", n: c });
      else throw new LogicError(`statement letters run p to z, not "${c}"`);
      i++;
    } else {
      throw new LogicError(`unexpected "${c}"`);
    }
  }
  return out;
}

export function parseLogic(src: string): Logic {
  const toks = tokenize(src);
  if (!toks.length) throw new LogicError("empty formula");
  let i = 0;
  const peek = () => toks[i];
  const isOp = (o: string) => {
    const t = toks[i];
    return t !== undefined && t.t === "op" && t.o === o;
  };
  const iff = (): Logic => {
    let a = imp();
    while (isOp("<->")) {
      i++;
      a = { k: "iff", a, b: imp() };
    }
    return a;
  };
  const imp = (): Logic => {
    const a = or();
    if (isOp("->")) {
      i++;
      return { k: "imp", a, b: imp() };
    }
    return a;
  };
  const or = (): Logic => {
    let a = and();
    while (isOp("|")) {
      i++;
      a = { k: "or", a, b: and() };
    }
    return a;
  };
  const and = (): Logic => {
    let a = not();
    while (isOp("&")) {
      i++;
      a = { k: "and", a, b: not() };
    }
    return a;
  };
  const not = (): Logic => {
    if (isOp("~")) {
      i++;
      return { k: "not", a: not() };
    }
    return atom();
  };
  const atom = (): Logic => {
    const t = peek();
    if (!t) throw new LogicError("formula ends too early");
    if (t.t === "var") {
      i++;
      return { k: "var", n: t.n };
    }
    if (t.t === "const") {
      i++;
      return { k: "const", v: t.v };
    }
    if (t.o === "(") {
      i++;
      const e = iff();
      if (!isOp(")")) throw new LogicError("a bracket is not closed");
      i++;
      return e;
    }
    throw new LogicError(`unexpected "${t.o}"`);
  };
  const e = iff();
  if (i !== toks.length) throw new LogicError("unexpected text after the formula");
  return e;
}

export function evaluate(f: Logic, env: Record<string, boolean>): boolean {
  switch (f.k) {
    case "var":
      if (!(f.n in env)) throw new LogicError(`no value for ${f.n}`);
      return env[f.n];
    case "const":
      return f.v;
    case "not":
      return !evaluate(f.a, env);
    case "and":
      return evaluate(f.a, env) && evaluate(f.b, env);
    case "or":
      return evaluate(f.a, env) || evaluate(f.b, env);
    case "imp":
      return !evaluate(f.a, env) || evaluate(f.b, env);
    case "iff":
      return evaluate(f.a, env) === evaluate(f.b, env);
  }
}

export function varsOf(...fs: Logic[]): string[] {
  const seen = new Set<string>();
  const walk = (f: Logic) => {
    if (f.k === "var") seen.add(f.n);
    else if (f.k === "not") walk(f.a);
    else if (f.k !== "const") {
      walk(f.a);
      walk(f.b);
    }
  };
  fs.forEach(walk);
  return [...seen].sort();
}

/** Every assignment of the variables, in the textbook's order: all T first, the last variable alternating fastest. */
export function rows(vars: string[]): Record<string, boolean>[] {
  const out: Record<string, boolean>[] = [];
  const n = vars.length;
  for (let m = 0; m < 1 << n; m++) {
    const env: Record<string, boolean> = {};
    vars.forEach((v, j) => (env[v] = ((m >> (n - 1 - j)) & 1) === 0));
    out.push(env);
  }
  return out;
}

export function equivalent(a: Logic, b: Logic): boolean {
  return rows(varsOf(a, b)).every((env) => evaluate(a, env) === evaluate(b, env));
}

export function classify(f: Logic): "tautology" | "contradiction" | "contingency" {
  const vals = rows(varsOf(f)).map((env) => evaluate(f, env));
  return vals.every(Boolean) ? "tautology" : vals.some(Boolean) ? "contingency" : "contradiction";
}

const not = (a: Logic): Logic => ({ k: "not", a });

/** a | b read as ~a -> b, so a disjunction has a converse and a contrapositive the way the textbook forms them. */
function asImplication(f: Logic): { a: Logic; b: Logic } {
  if (f.k === "imp") return { a: f.a, b: f.b };
  if (f.k === "or") return { a: f.a.k === "not" ? f.a.a : not(f.a), b: f.b };
  throw new LogicError("only an implication (or an or-statement) has a converse, inverse or contrapositive");
}

/** Implications and biconditionals rewritten with not, and, or. */
function withoutArrows(f: Logic): Logic {
  switch (f.k) {
    case "var":
    case "const":
      return f;
    case "not":
      return not(withoutArrows(f.a));
    case "and":
    case "or":
      return { k: f.k, a: withoutArrows(f.a), b: withoutArrows(f.b) };
    case "imp":
      return { k: "or", a: not(withoutArrows(f.a)), b: withoutArrows(f.b) };
    case "iff": {
      const [a, b] = [withoutArrows(f.a), withoutArrows(f.b)];
      return { k: "and", a: { k: "or", a: not(a), b }, b: { k: "or", a, b: not(b) } };
    }
  }
}

function swapDual(f: Logic): Logic {
  switch (f.k) {
    case "var":
      return f;
    case "const":
      return { k: "const", v: !f.v };
    case "not":
      return not(swapDual(f.a));
    case "and":
      return { k: "or", a: swapDual(f.a), b: swapDual(f.b) };
    case "or":
      return { k: "and", a: swapDual(f.a), b: swapDual(f.b) };
    default:
      throw new LogicError("unreachable: arrows are removed before a dual");
  }
}

export function transform(f: Logic, op: Transform): Logic {
  switch (op) {
    case "negation":
      return not(f);
    case "dual":
      // Equivalent formulas have equivalent duals, so any arrow-free form gives the same dual up to equivalence.
      return swapDual(withoutArrows(f));
    default: {
      const { a, b } = asImplication(f);
      if (op === "converse") return { k: "imp", a: b, b: a };
      if (op === "inverse") return { k: "imp", a: not(a), b: not(b) };
      return { k: "imp", a: not(b), b: not(a) };
    }
  }
}

const RANK: Record<Logic["k"], number> = { var: 5, const: 5, not: 4, and: 3, or: 2, imp: 1, iff: 0 };
const SYMBOL = { and: "∧", or: "∨", imp: "→", iff: "↔" } as const;

/** The formula in the bank's symbols, with brackets wherever a part is not a single letter or a negation. */
export function showLogic(f: Logic): string {
  // Brackets round any compound part of a binary connective (the textbook writes (p ∧ q) → r, never p ∧ q → r).
  const part = (g: Logic): string => (RANK[g.k] < RANK.not ? `(${showLogic(g)})` : showLogic(g));
  switch (f.k) {
    case "var":
      return f.n;
    case "const":
      return f.v ? "T" : "F";
    case "not":
      return RANK[f.a.k] >= RANK.not ? `∼${showLogic(f.a)}` : `∼(${showLogic(f.a)})`;
    default:
      return `${part(f.a)} ${SYMBOL[f.k]} ${part(f.b)}`;
  }
}

export { LogicError };
