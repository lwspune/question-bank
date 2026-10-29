/**
 * A tiny, closed formula language for scenes that plot a function, so a
 * visual can store "16^(sin(x)^2)+16^(cos(x)^2)" and the scene can draw it.
 * Never eval: the source is tokenised and parsed into closures, and anything
 * outside the grammar is refused. Pure. Spec: tests/visuals-expr.test.ts.
 *
 *   expr    := term (('+' | '-') term)*
 *   term    := unary (('*' | '/') unary)*
 *   unary   := '-' unary | power
 *   power   := atom ('^' unary)?          right-associative; -x^2 = -(x^2)
 *   atom    := number | x | pi | e | name | fn '(' expr ')' | fn2 '(' expr ',' expr ')' | '(' expr ')'
 *
 * `name` is a named number, only when the caller passes them (the sketch
 * scene's vars); without them the language is exactly the formula-in-x one.
 * fn2 is atan2, min or max; deg and rad convert angles.
 *
 * Multiplication is always written (2*x, not 2x), so a typo cannot silently
 * change the meaning. `log` is the natural log, as in JEE and CET solutions.
 */

type Fn = (x: number) => number;

const FUNCTIONS: Record<string, (v: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  exp: Math.exp,
  log: Math.log,
  ln: Math.log,
  log10: Math.log10,
  sqrt: Math.sqrt,
  abs: Math.abs,
  deg: (v) => (v * 180) / Math.PI,
  rad: (v) => (v * Math.PI) / 180,
};

const FUNCTIONS2: Record<string, (a: number, b: number) => number> = {
  atan2: Math.atan2,
  min: Math.min,
  max: Math.max,
};

const MAX_LENGTH = 120;

type Token = { kind: "num"; value: number } | { kind: "id"; name: string } | { kind: "op"; op: string };

class ExprError extends Error {}

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === " ") {
      i++;
      continue;
    }
    const num = /^(\d+(\.\d*)?|\.\d+)/.exec(src.slice(i));
    if (num) {
      out.push({ kind: "num", value: Number(num[0]) });
      i += num[0].length;
      continue;
    }
    const id = /^[a-z][a-z0-9]*/.exec(src.slice(i));
    if (id) {
      out.push({ kind: "id", name: id[0] });
      i += id[0].length;
      continue;
    }
    if ("+-*/^(),".includes(c)) {
      out.push({ kind: "op", op: c });
      i++;
      continue;
    }
    throw new ExprError(`unexpected "${c}"`);
  }
  return out;
}

function parse(tokens: Token[], vars?: Readonly<Record<string, number>>): Fn {
  let pos = 0;
  const peekOp = (op: string) => {
    const t = tokens[pos];
    return t?.kind === "op" && t.op === op;
  };
  const expectOp = (op: string) => {
    if (!peekOp(op)) throw new ExprError(`expected "${op}"`);
    pos++;
  };

  function expr(): Fn {
    let left = term();
    while (peekOp("+") || peekOp("-")) {
      const op = (tokens[pos++] as { op: string }).op;
      const a = left;
      const b = term();
      left = op === "+" ? (x) => a(x) + b(x) : (x) => a(x) - b(x);
    }
    return left;
  }
  function term(): Fn {
    let left = unary();
    while (peekOp("*") || peekOp("/")) {
      const op = (tokens[pos++] as { op: string }).op;
      const a = left;
      const b = unary();
      left = op === "*" ? (x) => a(x) * b(x) : (x) => a(x) / b(x);
    }
    return left;
  }
  function unary(): Fn {
    if (peekOp("-")) {
      pos++;
      const a = unary();
      return (x) => -a(x);
    }
    return power();
  }
  function power(): Fn {
    const base = atom();
    if (peekOp("^")) {
      pos++;
      const exp = unary();
      return (x) => Math.pow(base(x), exp(x));
    }
    return base;
  }
  function atom(): Fn {
    const t = tokens[pos];
    if (!t) throw new ExprError("the formula ends too soon");
    if (t.kind === "num") {
      pos++;
      const v = t.value;
      return () => v;
    }
    if (t.kind === "id") {
      pos++;
      if (t.name === "x") return (x) => x;
      if (t.name === "pi") return () => Math.PI;
      if (t.name === "e") return () => Math.E;
      if (vars && Object.prototype.hasOwnProperty.call(vars, t.name) && !peekOp("(")) {
        const v = vars[t.name];
        return () => v;
      }
      const f2 = Object.prototype.hasOwnProperty.call(FUNCTIONS2, t.name) ? FUNCTIONS2[t.name] : undefined;
      if (f2) {
        expectOp("(");
        const a = expr();
        expectOp(",");
        const b = expr();
        expectOp(")");
        return (x) => f2(a(x), b(x));
      }
      const f = Object.prototype.hasOwnProperty.call(FUNCTIONS, t.name) ? FUNCTIONS[t.name] : undefined;
      if (!f) throw new ExprError(`unknown name "${t.name}"`);
      expectOp("(");
      const inner = expr();
      expectOp(")");
      return (x) => f(inner(x));
    }
    if (t.op === "(") {
      pos++;
      const inner = expr();
      expectOp(")");
      return inner;
    }
    throw new ExprError(`unexpected "${t.op}"`);
  }

  const fn = expr();
  if (pos !== tokens.length) throw new ExprError("unexpected text after the formula");
  return fn;
}

/** Compile a formula in x (and the given named numbers), or say what is wrong with it. */
export function compileExpr(src: unknown, vars?: Readonly<Record<string, number>>): { fn: Fn } | { error: string } {
  if (typeof src !== "string" || src.trim() === "") return { error: "the formula is empty" };
  if (src.length > MAX_LENGTH) return { error: `the formula is longer than ${MAX_LENGTH} characters` };
  try {
    return { fn: parse(tokenize(src), vars) };
  } catch (e) {
    if (e instanceof ExprError) return { error: e.message };
    throw e;
  }
}
