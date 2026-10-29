/**
 * A claim about a set (owner, 2026-10-29): "∀x ∈ A, x + 1 ≥ 3", "∃n ∈ N such
 * that n + 8 > 11". Every listed member is tested in turn, ticked or crossed,
 * and the claim's truth value is read off: ∀ is T when every member passes,
 * ∃ when one does. The scene works every member out itself.
 *
 *   set     { name, members, infinite?, label? }  up to 12 members (numbers or
 *           formulas). An infinite set (N, Z) lists sample members, and then
 *           only a claim they settle is accepted: a ∀ with a member that fails,
 *           an ∃ with a member that passes.
 *   claims  1 to 4 of { quant: all | some, lhs, rel, rhs, show }: lhs and rhs
 *           are formulas in x (the member); rel is < <= > >= = !=; show is the
 *           claim as printed (plain text).
 *   ask     with several claims (a multiple-choice question), "true" or
 *           "false": the check is the number (1 to 4) of the only claim with
 *           that truth value, 0 when none or several have it.
 *
 * Beats: set, test, answer.
 */
import { compileExpr } from "../expr";
import { fracText, num, progressOf, text } from "../geometry";
import { value as numberOf } from "../namedVars";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape } from "../types";

type Rel = "<" | "<=" | ">" | ">=" | "=" | "!=";
const RELS: Rel[] = ["<", "<=", ">", ">=", "=", "!="];

interface Claim {
  quant: "all" | "some";
  show: string;
  /** Per member: the lhs value and whether the relation holds. */
  lhs: number[];
  holds: boolean[];
  truth: boolean;
}

export interface SetParams {
  label: string;
  members: number[];
  claims: Claim[];
  ask: "true" | "false" | undefined;
}

const PAD = 10;
const CHIP = 30;
const CGAP = 4;
const HEAD = 30;
const BLOCK = 66;
const MIN_W = 340;

const near = (a: number, b: number) => Math.abs(a - b) <= 1e-9 * (1 + Math.abs(a) + Math.abs(b));
function compare(a: number, rel: Rel, b: number): boolean {
  switch (rel) {
    case "<":
      return a < b && !near(a, b);
    case "<=":
      return a < b || near(a, b);
    case ">":
      return a > b && !near(a, b);
    case ">=":
      return a > b || near(a, b);
    case "=":
      return near(a, b);
    case "!=":
      return !near(a, b);
  }
}

function fn(src: unknown, field: string): (x: number) => number {
  const r = compileExpr(src, {});
  if ("error" in r) throw new ParamError(`${field}: ${r.error}`);
  return r.fn;
}

const answerOf = (p: SetParams) => {
  if (p.claims.length === 1) return p.claims[0].truth ? 1 : 0;
  const want = p.ask === "true";
  const hits = p.claims.map((c, i) => (c.truth === want ? i + 1 : 0)).filter(Boolean);
  return hits.length === 1 ? hits[0] : 0;
};

const shown = (v: number) => (Number.isInteger(v) ? num(v) : fracText(v));

function box(p: SetParams) {
  const w = Math.max(MIN_W, PAD * 2 + p.members.length * (CHIP + CGAP));
  return { w, h: HEAD + p.claims.length * BLOCK + (p.claims.length > 1 ? 22 : 0) + 4 };
}

function reason(c: Claim, members: number[]): string {
  const fail = c.holds.indexOf(false);
  const pass = c.holds.indexOf(true);
  if (c.quant === "all") return c.truth ? "T: every member passes" : `F: ${shown(members[fail])} fails`;
  return c.truth ? `T: ${shown(members[pass])} works` : "F: no member works";
}

export const setClaim: Scene<SetParams> = {
  id: "setClaim",
  beats: ["set", "test", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const s = obj(o.set);
      const name = plainLabel(s.name, "set.name", 4);
      if (!Array.isArray(s.members) || s.members.length < 1 || s.members.length > 12) throw new ParamError("set.members must be a list of 1 to 12");
      const members = s.members.map((m, i) => numberOf(m, {}, `set.members[${i}]`));
      const infinite = s.infinite === true;
      const label =
        s.label === undefined ? `${name} = {${members.map(shown).join(", ")}${infinite ? ", ..." : ""}}` : plainLabel(s.label, "set.label", 40);
      if (!Array.isArray(o.claims) || o.claims.length < 1 || o.claims.length > 4) throw new ParamError("claims must be a list of 1 to 4");
      const claims: Claim[] = o.claims.map((raw2, i) => {
        const c = obj(raw2);
        const f = `claims[${i}]`;
        if (c.quant !== "all" && c.quant !== "some") throw new ParamError(`${f}.quant must be "all" or "some"`);
        if (!RELS.includes(c.rel as Rel)) throw new ParamError(`${f}.rel must be one of ${RELS.join(" ")}`);
        const [l, r] = [fn(c.lhs, `${f}.lhs`), fn(c.rhs, `${f}.rhs`)];
        const lhs = members.map((m) => l(m));
        const rhs = members.map((m) => r(m));
        if (![...lhs, ...rhs].every(Number.isFinite)) throw new ParamError(`${f}: a member gives no number`);
        const holds = members.map((_, k) => compare(lhs[k], c.rel as Rel, rhs[k]));
        const truth = c.quant === "all" ? holds.every(Boolean) : holds.some(Boolean);
        // On an infinite set the listed members settle only a ∀ that fails or an ∃ that holds.
        if (infinite && (c.quant === "all" ? truth : !truth)) throw new ParamError(`${f}: the listed members cannot settle a claim about the whole of ${name}`);
        return { quant: c.quant, show: plainLabel(c.show, `${f}.show`, 30), lhs, holds, truth };
      });
      let ask: SetParams["ask"];
      if (claims.length > 1) {
        if (o.ask !== "true" && o.ask !== "false") throw new ParamError('with several claims, ask must be "true" or "false" (which one the question picks out)');
        ask = o.ask;
      }
      const p: SetParams = { label, members, claims, ask };
      if (box(p).w > 440) throw new ParamError("too many members to draw");
      return p;
    }),

  check: (p) => answerOf(p),

  checkText: (p, value) => {
    if (p.claims.length === 1) return `Testing every member: the claim is ${p.claims[0].truth ? "true" : "false"} (${reason(p.claims[0], p.members)}).`;
    return value ? `Only claim ${value} is ${p.ask}, member by member.` : `No single claim is ${p.ask}.`;
  },

  viewBox: (p) => box(p),

  duration: (beat) => ({ set: 1200, test: 3000, answer: 1200 })[beat] ?? 1200,

  frame(p, { played, t }) {
    const { w } = box(p);
    const out: Shape[] = [];
    const ps = prog("set");
    const pt = prog("test");
    const pa = prog("answer");
    out.push(text(w / 2, 18, p.label, { tone: "fg", size: 12.5, weight: 700, anchor: "middle", opacity: Math.max(ps, 0.3) }));
    const x0 = (w - p.members.length * (CHIP + CGAP) + CGAP) / 2;
    p.claims.forEach((c, i) => {
      const y = HEAD + i * BLOCK;
      const sym = c.quant === "all" ? "∀" : "∃";
      out.push(text(PAD, y + 12, /^[∀∃]/.test(c.show) ? c.show : `${sym}: ${c.show}`, { tone: "amber", size: 12, weight: 600 }));
      if (pa > 0.5) out.push(text(w - PAD, y + 12, reason(c, p.members), { tone: c.truth ? "good" : "bad", size: 12, weight: 700, anchor: "end", opacity: pa }));
      p.members.forEach((m, k) => {
        const appear = Math.max(0, Math.min(1, ps * p.members.length - k));
        if (appear <= 0) return;
        const tested = pt * p.members.length > k;
        const cx = x0 + k * (CHIP + CGAP);
        const cy = y + 20;
        const tone = tested ? (c.holds[k] ? "good" : "bad") : "line";
        out.push({ kind: "rect", x: cx, y: cy, w: CHIP, h: 36, rx: 5, stroke: tone, fill: tested && c.holds[k] ? "goodSoft" : "card", width: 1.5, opacity: appear });
        out.push(text(cx + CHIP / 2, cy + 14, shown(m), { tone: "fg", size: 12, weight: 700, anchor: "middle", opacity: appear }));
        if (tested) out.push(text(cx + CHIP / 2, cy + 29, `${shown(c.lhs[k])} ${c.holds[k] ? "✓" : "✗"}`, { tone, size: 9.5, weight: 600, anchor: "middle" }));
      });
    });
    if (p.claims.length > 1 && pa > 0.5) {
      const v = answerOf(p);
      out.push(text(w / 2, HEAD + p.claims.length * BLOCK + 14, v ? `only claim ${v} is ${p.ask}` : `no single claim is ${p.ask}`, { tone: v ? "good" : "bad", size: 12.5, weight: 700, anchor: "middle", opacity: pa }));
    }
    return out;

    function prog(beat: string) {
      const order = ["set", "test", "answer"];
      const later = order.slice(order.indexOf(beat) + 1);
      if (!played.includes(beat) && later.some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    }
  },
};
