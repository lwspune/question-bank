/**
 * Circle diagrams (owner, 2026-10-31): syllogisms and "pick the Venn
 * diagram" questions. The statements draw the sets as circles; each
 * conclusion is then marked follows / does not follow; then the option.
 *
 *   sets         2 to 4 of { id, label, x, y, r, labelAt? } in a 100 x 60 box.
 *   statements   1 to 4 of { form, a, b, show, step: s1..s4 }; form is all,
 *                no, some, someNot (some a are not b) or overlap (partly
 *                both ways). The picture must agree with every statement:
 *                all = a's circle inside b's, no = apart, some = they meet,
 *                someNot = a not inside b, overlap = they meet, neither inside.
 *   conclusions  0 to 4 of { form, a, b, show, step: c1..c4, possible?, alt? };
 *                `alt` { set, x, y, r } moves one circle to show the verdict:
 *                a definite conclusion that does not follow is broken in it, a
 *                possibility that follows holds in it, and every statement
 *                still holds.
 *   options      { text, means: { follow: [..], either?: [i, j] } }: the
 *                conclusions that follow (1-based) and any either/or pair.
 *   figure       instead of options, for "which diagram": the option number
 *                whose figure the drawing is (checked by eye at review).
 *
 * The check does not trust the picture: lib/visuals/syllogism tries every
 * arrangement of the sets. A conclusion that follows must also hold in the
 * picture. Beats: s1..s4, c1..c4, answer.
 */
import { judge, SylError, FORMS, type Claim, type Form } from "../syllogism";
import { progressOf, round, text } from "../geometry";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape, Tone } from "../types";

const S_BEATS = ["s1", "s2", "s3", "s4"];
const C_BEATS = ["c1", "c2", "c3", "c4"];
const BEATS = [...S_BEATS, ...C_BEATS, "answer"];
const TONES: Tone[] = ["brand", "amber", "good", "fg"];
const ROMAN = ["I", "II", "III", "IV"];

interface Circle {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  labelAt?: [number, number];
}
interface Line extends Claim {
  show: string;
  step: string;
}
interface Conclusion extends Line {
  alt?: { set: string; x: number; y: number; r: number };
  follows: boolean;
}
interface Option {
  text: string;
  follow: number[];
  either?: [number, number];
}

export interface CircleParams {
  sets: Circle[];
  labels: LabelBox[];
  statements: Line[];
  conclusions: Conclusion[];
  options: Option[];
  figure: number | undefined;
  either: [number, number][];
  answer: number;
}

const W = 360;
const K = 3.4;
const OX = 10;
const TOP = 26;
const PIC = 60 * K;
const LINE = 18;
const EPS = 0.3;
const letterOf = (k: number) => "ABCDE"[k - 1];

/** Whether the picture shows the claim. */
function shows(sets: Map<string, Circle>, c: Pick<Claim, "form" | "a" | "b">): boolean {
  const A = sets.get(c.a)!;
  const B = sets.get(c.b)!;
  const d = Math.hypot(A.x - B.x, A.y - B.y);
  const inside = (P: Circle, Q: Circle) => d + P.r <= Q.r + 0.01;
  const meet = d < A.r + B.r - EPS;
  switch (c.form) {
    case "all":
      return inside(A, B);
    case "no":
      return d >= A.r + B.r + EPS;
    case "some":
      return meet;
    case "someNot":
      return !inside(A, B);
    case "overlap":
      return meet && !inside(A, B) && !inside(B, A);
  }
}

function readClaim(raw: unknown, f: string, ids: Set<string>, steps: string[]): Line & { possible?: boolean } {
  const o = obj(raw);
  if (!FORMS.includes(o.form as Form)) throw new ParamError(`${f}.form must be one of ${FORMS.join(", ")}`);
  for (const k of ["a", "b"]) if (!ids.has(o[k] as string)) throw new ParamError(`${f}.${k}: ${String(o[k])} is not among the sets`);
  if (o.a === o.b) throw new ParamError(`${f}: a and b are the same set`);
  if (!steps.includes(o.step as string)) throw new ParamError(`${f}.step must be one of ${steps.join(", ")}`);
  return { form: o.form as Form, a: o.a as string, b: o.b as string, show: plainLabel(o.show, `${f}.show`, 44), step: o.step as string, possible: o.possible === true };
}

function readCircle(raw: unknown, f: string): Circle {
  const o = obj(raw);
  const num = (k: string, lo: number, hi: number) => {
    const v = o[k];
    if (typeof v !== "number" || !Number.isFinite(v) || v < lo || v > hi) throw new ParamError(`${f}.${k} must be a number from ${lo} to ${hi}`);
    return v;
  };
  const c: Circle = { id: plainLabel(o.id, `${f}.id`, 16), label: plainLabel(o.label ?? o.id, `${f}.label`, 16), x: num("x", 0, 100), y: num("y", 0, 60), r: num("r", 3, 40) };
  if (c.x - c.r < -0.01 || c.x + c.r > 100.01 || c.y - c.r < -0.01 || c.y + c.r > 60.01) throw new ParamError(`${f}: the circle runs out of the 100 x 60 box`);
  if (o.labelAt !== undefined) {
    const v = o.labelAt;
    if (!Array.isArray(v) || v.length !== 2 || !v.every((x) => typeof x === "number")) throw new ParamError(`${f}.labelAt must be [x, y]`);
    c.labelAt = [v[0], v[1]];
  }
  return c;
}

export interface LabelBox {
  id: string;
  /** Centre x and baseline y, in px. */
  x: number;
  y: number;
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

/**
 * Where each label goes, in px: inside its own circle where the curve leaves
 * room (top, then centre, then bottom), else just outside it (above, below).
 * The first spot that crosses no circle's outline, sits in no circle that does
 * not hold its own, and touches no other label wins (owner, 2026-10-30: a
 * line through a label reads as struck out). `labelAt` is tried alone.
 */
export function labelBoxes(sets: readonly Pick<Circle, "id" | "label" | "x" | "y" | "r" | "labelAt">[]): LabelBox[] {
  const px = sets.map((c) => ({ id: c.id, cx: OX + c.x * K, cy: TOP + c.y * K, R: c.r * K }));
  const placed: LabelBox[] = [];
  const crosses = (b: LabelBox, c: (typeof px)[number]) => {
    const corners = [[b.x0, b.y0], [b.x1, b.y0], [b.x0, b.y1], [b.x1, b.y1]].map(([x, y]) => Math.hypot(x - c.cx, y - c.cy));
    const nx = Math.max(b.x0, Math.min(c.cx, b.x1));
    const ny = Math.max(b.y0, Math.min(c.cy, b.y1));
    const inside = corners.every((d) => d <= c.R - 1.5);
    const outside = Math.hypot(nx - c.cx, ny - c.cy) >= c.R + 1.5;
    return { inside, crossing: !inside && !outside };
  };
  sets.forEach((c, i) => {
    const me = px[i];
    const w = c.label.length * 6.4;
    const box = (x: number, y: number): LabelBox => ({ id: c.id, x, y, x0: x - w / 2, x1: x + w / 2, y0: y - 9, y1: y + 3 });
    const half = w / 2 + 3;
    const cands: LabelBox[] = [];
    if (c.labelAt) cands.push(box(OX + c.labelAt[0] * K, TOP + c.labelAt[1] * K));
    else {
      if (half < me.R - 2) {
        const d = Math.sqrt(me.R * me.R - half * half) - 1;
        cands.push(box(me.cx, me.cy - d + 10), box(me.cx, me.cy + 4), box(me.cx, me.cy + d - 4));
      }
      cands.push(box(me.cx, me.cy - me.R - 5), box(me.cx, me.cy + me.R + 12));
    }
    const holdsMe = (o: (typeof px)[number]) => Math.hypot(o.cx - me.cx, o.cy - me.cy) + me.R <= o.R + 0.5;
    const ok = cands.find(
      (b) =>
        b.x0 >= OX - 4 && b.x1 <= OX + 100 * K + 4 && b.y0 >= TOP - 6 && b.y1 <= TOP + PIC + 6 &&
        px.every((o) => {
          const r = crosses(b, o);
          if (r.crossing) return false;
          return o === me || !r.inside || holdsMe(o);
        }) &&
        placed.every((q) => !(b.x0 < q.x1 && q.x0 < b.x1 && b.y0 < q.y1 && q.y0 < b.y1)),
    );
    if (!ok) throw new ParamError(c.labelAt ? `the label of ${c.id} at labelAt crosses an outline or another label` : `no place for the label of ${c.id} clear of every outline: shorten it, make its circle bigger, or give labelAt`);
    placed.push(ok);
  });
  return placed;
}

export const circles: Scene<CircleParams> = {
  id: "circles",
  beats: BEATS,

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      if (!Array.isArray(o.sets) || o.sets.length < 2 || o.sets.length > 4) throw new ParamError("sets must be a list of 2 to 4");
      const sets = o.sets.map((s, i) => readCircle(s, `sets[${i}]`));
      const ids = new Set(sets.map((s) => s.id));
      if (ids.size !== sets.length) throw new ParamError("two sets share an id");
      const byId = new Map(sets.map((s) => [s.id, s]));

      if (!Array.isArray(o.statements) || o.statements.length < 1 || o.statements.length > 4) throw new ParamError("statements must be a list of 1 to 4");
      const statements = o.statements.map((s, i) => readClaim(s, `statements[${i}]`, ids, S_BEATS));
      for (const s of statements) if (!shows(byId, s)) throw new ParamError(`the picture does not show "${s.show}"`);
      for (const s of sets) if (!statements.some((x) => x.a === s.id || x.b === s.id) && !(o.conclusions as unknown[] | undefined)?.length) throw new ParamError(`${s.id} is in no statement`);

      const labels = labelBoxes(sets);

      const cRaw = o.conclusions ?? [];
      if (!Array.isArray(cRaw) || cRaw.length > 4) throw new ParamError("conclusions must be a list of up to 4");
      const read = cRaw.map((c, i) => ({ claim: readClaim(c, `conclusions[${i}]`, ids, C_BEATS), raw: obj(c) }));

      let verdict: ReturnType<typeof judge>;
      try {
        verdict = judge(sets.map((s) => s.id), statements, read.map((r) => r.claim));
      } catch (e) {
        if (e instanceof SylError) throw new ParamError(e.message);
        throw e;
      }

      const conclusions: Conclusion[] = read.map(({ claim, raw: rc }, i) => {
        const follows = verdict.follows[i];
        // A conclusion that follows for certain must hold in the picture too.
        if (follows && !claim.possible && !shows(byId, claim)) throw new ParamError(`${ROMAN[i]} follows, but the picture does not show "${claim.show}"`);
        let alt: Conclusion["alt"];
        if (rc.alt !== undefined) {
          const a = obj(rc.alt);
          if (!ids.has(a.set as string)) throw new ParamError(`conclusions[${i}].alt.set is not among the sets`);
          const moved = readCircle({ ...byId.get(a.set as string)!, x: a.x, y: a.y, r: a.r }, `conclusions[${i}].alt`);
          const altSets = new Map(byId);
          altSets.set(moved.id, moved);
          for (const s of statements) if (!shows(altSets, s)) throw new ParamError(`${ROMAN[i]}: the counter-picture breaks "${s.show}"`);
          const wanted = claim.possible ? true : false;
          if (claim.possible ? !follows : follows) throw new ParamError(`${ROMAN[i]}: a counter-picture is only for a conclusion that does not follow, or a possibility that does`);
          if (shows(altSets, claim) !== wanted) throw new ParamError(`${ROMAN[i]}: the counter-picture does not ${wanted ? "show" : "break"} "${claim.show}"`);
          alt = { set: moved.id, x: moved.x, y: moved.y, r: moved.r };
        }
        return { ...claim, follows, alt };
      });

      let options: Option[] = [];
      let figure: number | undefined;
      let answer = 0;
      if (o.figure !== undefined) {
        if (conclusions.length) throw new ParamError("give options or figure, not both");
        if (!Number.isInteger(o.figure) || (o.figure as number) < 1 || (o.figure as number) > 5) throw new ParamError("figure must be an option number, 1 to 5");
        figure = o.figure as number;
        answer = figure;
      } else {
        if (!conclusions.length) throw new ParamError("conclusions and options, or a figure");
        if (!Array.isArray(o.options) || o.options.length < 2 || o.options.length > 5) throw new ParamError("options must be a list of 2 to 5");
        const nC = conclusions.length;
        const okIdx = (v: unknown) => Number.isInteger(v) && (v as number) >= 1 && (v as number) <= nC;
        options = o.options.map((r, i) => {
          const x = obj(r);
          const m = obj(x.means);
          const follow = m.follow ?? [];
          if (!Array.isArray(follow) || !follow.every(okIdx)) throw new ParamError(`options[${i}].means.follow must list conclusion numbers 1 to ${nC}`);
          let either: [number, number] | undefined;
          if (m.either !== undefined) {
            if (!Array.isArray(m.either) || m.either.length !== 2 || !m.either.every(okIdx)) throw new ParamError(`options[${i}].means.either must be two conclusion numbers`);
            either = [Math.min(...(m.either as number[])), Math.max(...(m.either as number[]))];
          }
          return { text: plainLabel(String(x.text ?? ""), `options[${i}].text`, 60), follow: [...new Set(follow as number[])].sort(), either };
        });
        const got = conclusions.map((c, i) => (c.follows ? i + 1 : 0)).filter(Boolean);
        const holds = (op: Option) =>
          op.follow.length === got.length &&
          op.follow.every((v, i) => v === got[i]) &&
          (op.either ? verdict.either.some(([a, b]) => a === op.either![0] && b === op.either![1]) : verdict.either.length === 0);
        const hits = options.map((op, i) => (holds(op) ? i + 1 : 0)).filter(Boolean);
        answer = hits.length === 1 ? hits[0] : 0;
      }
      return { sets, labels, statements, conclusions, options, figure, either: verdict.either, answer };
    }),

  check: (p) => p.answer,

  checkText: (p, value) => {
    if (p.figure !== undefined) return `The circles satisfy every relation the question gives; this is the diagram in option ${letterOf(p.figure)}.`;
    if (!value) return "Trying every arrangement of the sets, no single option matches the conclusions that follow.";
    const got = p.conclusions.map((c, i) => (c.follows ? ROMAN[i] : "")).filter(Boolean);
    const eith = p.either.map(([a, b]) => `either ${ROMAN[a - 1]} or ${ROMAN[b - 1]}`).join(", ");
    const what = got.length ? `${got.join(" and ")} ${got.length > 1 ? "follow" : "follows"}` : eith ? eith : "none follows";
    return `Trying every arrangement of the sets: ${what}${got.length && eith ? `, and ${eith}` : ""}. Option ${letterOf(value)}.`;
  },

  viewBox: (p) => ({ w: W, h: TOP + PIC + 12 + p.conclusions.length * LINE + (p.either.length ? LINE : 0) + 30 }),

  duration: (beat) => (beat === "answer" ? 1200 : 1600),

  frame(p, { played, t }) {
    const out: Shape[] = [];
    const X = (x: number) => round(OX + x * K);
    const Y = (y: number) => round(TOP + y * K);
    const first = new Map<string, string>();
    for (const s of p.statements) for (const id of [s.a, s.b]) if (!first.has(id)) first.set(id, s.step);
    for (const c of p.conclusions) for (const id of [c.a, c.b]) if (!first.has(id)) first.set(id, c.step);

    // The box everything lives in, as a Venn diagram draws it.
    out.push({ kind: "rect", x: OX - 4, y: TOP - 4, w: round(100 * K + 8), h: round(PIC + 8), rx: 6, stroke: "line", width: 1 });

    // Caption: the statement now being drawn.
    const latestS = [...p.statements].reverse().find((s) => prog(s.step) > 0 && !played.some((b) => C_BEATS.includes(b) || b === "answer"));
    if (latestS) out.push(text(W / 2, 16, latestS.show, { tone: "amber", size: 11.5, weight: 700, anchor: "middle" }));

    p.sets.forEach((s, i) => {
      const v = prog(first.get(s.id) ?? "s1");
      if (v <= 0) return;
      const tone = TONES[i % TONES.length];
      out.push({ kind: "circle", cx: X(s.x), cy: Y(s.y), r: round(s.r * K), fill: tone, opacity: 0.08 * v });
      out.push({ kind: "circle", cx: X(s.x), cy: Y(s.y), r: round(s.r * K * (0.85 + 0.15 * v)), stroke: tone, width: 2, opacity: v });
      const lb = p.labels[i];
      out.push(text(round(lb.x), round(lb.y), s.label, { tone, size: 11, weight: 700, anchor: "middle", opacity: v }));
    });

    // Counter-pictures: the moved circle, dashed, while its conclusion plays.
    p.conclusions.forEach((c) => {
      if (!c.alt) return;
      const v = prog(c.step);
      if (v <= 0) return;
      const lastBeat = played[played.length - 1] === c.step;
      out.push({ kind: "circle", cx: X(c.alt.x), cy: Y(c.alt.y), r: round(c.alt.r * K), stroke: c.follows ? "good" : "bad", width: 2, dash: "5 4", opacity: lastBeat ? v : 0.3 });
    });

    let y = TOP + PIC + 12 + 12;
    p.conclusions.forEach((c) => {
      const v = prog(c.step);
      if (v > 0) {
        const verdict = c.follows ? (c.possible ? "follows (possible) ✓" : "follows ✓") : "does not follow ✗";
        const msg = `${c.show}: ${verdict}`;
        out.push(text(W / 2, y, msg, { tone: c.follows ? "good" : "bad", size: msg.length > 52 ? 10 : 11, weight: 600, anchor: "middle", opacity: Math.min(1, v * 2) }));
      }
      y += LINE;
    });
    const pa = prog("answer");
    if (p.either.length && (pa > 0 || p.conclusions.every((c) => prog(c.step) >= 1))) {
      const msg = p.either.map(([a, b]) => `either ${ROMAN[a - 1]} or ${ROMAN[b - 1]}: exactly one is always true`).join("; ");
      out.push(text(W / 2, y, msg, { tone: "amber", size: 10.5, weight: 600, anchor: "middle" }));
      y += LINE;
    }
    if (pa > 0) {
      const msg = p.figure !== undefined ? `the diagram in option ${letterOf(p.figure)}` : p.answer ? `option ${letterOf(p.answer)}: ${p.options[p.answer - 1].text}` : "no single option matches";
      out.push(text(W / 2, y + 4, msg, { tone: p.answer ? "good" : "bad", size: msg.length > 50 ? 10.5 : 12.5, weight: 700, anchor: "middle", opacity: Math.min(1, pa * 2) }));
    }
    return out;

    function prog(beat: string) {
      // A statement or conclusion shows when its own beat plays (solutions take
      // conclusions in any order), or at the answer if no step named it.
      if (beat !== "answer") return played.includes(beat) ? progressOf(beat, played, t) : played.includes("answer") ? 1 : 0;
      const later = BEATS.slice(BEATS.indexOf(beat) + 1);
      if (!played.includes(beat) && later.some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    }
  },
};
