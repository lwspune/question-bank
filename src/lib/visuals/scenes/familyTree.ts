/**
 * Blood relations (owner, 2026-10-31): a family tree built one statement at a
 * time, then the route from one person to the other, then the option.
 *
 *   people   up to 12 of { id, sex: m | f | ?, label? } (label, at most 12
 *            characters, is what the box shows; id is how facts name them).
 *   facts    { rel: parent | spouse | sibling, a, b, step }: a is b's parent,
 *            a and b are married, a and b are siblings. `step` (f1..f8) is the
 *            beat that draws it; a person appears with the first fact naming them.
 *   rows     the generations, top first, each left to right. A child sits one
 *            row below its parent, spouses side by side, siblings on one row.
 *   ask      { who, of }: how `who` is related to `of`; the route is drawn.
 *   options  as printed, each with `means`: { rel: "father-in-law" } (a word
 *            lib/visuals/kinship defines), { chain: ["son", "wife"] }, { any:
 *            [...] }, { self: true }, optionally with its own who/of; or
 *            { undetermined: true } for "Cannot be determined".
 *
 * The check FOLLOWS every option on the tree (lib/visuals/kinship). A person
 * whose sex is not stated is tried both ways, and an option holds only if it
 * holds for every sex the tree allows; "cannot be determined" holds only when
 * no other option does. The answer is the one option that holds, 0 if none or
 * several. Beats: f1..f8, path, answer.
 */
import { buildFamily, holds, KinError, pathBetween, STEPS, type Family, type Fact, type Meaning, type Person, type Step } from "../kinship";
import { progressOf, round, text } from "../geometry";
import { obj, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape, Tone } from "../types";

const FACT_BEATS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"] as const;
const BEATS = [...FACT_BEATS, "path", "answer"];

interface Option {
  text: string;
  who: string;
  of: string;
  means: Meaning | "undetermined";
  holds: boolean;
}

export interface TreeParams {
  people: (Person & { label: string })[];
  facts: (Fact & { step: string })[];
  rows: string[][];
  ask: { who: string; of: string };
  options: Option[];
  answer: number;
  /** The route from ask.of to ask.who, each step named. */
  route: { to: string; step: Step }[];
  /** People whose unstated sex changes some option's truth. */
  decisive: string[];
}

const W_MIN = 360;
const W_MAX = 440;
const PAD = 12;
const BH = 26;
const HG = 24;
const ROWH = 76;
const TOP = 18;
const LINE = 18;

const boxW = (label: string) => Math.max(44, Math.min(100, label.length * 7.3 + 16));
const letterOf = (k: number) => "ABCDE"[k - 1];

function width(p: Pick<TreeParams, "rows" | "people">) {
  const lab = new Map(p.people.map((x) => [x.id, x.label]));
  const rowW = (r: string[]) => r.reduce((s, id) => s + boxW(lab.get(id)!), 0) + (r.length - 1) * HG;
  return Math.max(W_MIN, ...p.rows.map((r) => rowW(r) + 2 * PAD));
}

function layout(p: TreeParams) {
  const W = width(p);
  const lab = new Map(p.people.map((x) => [x.id, x.label]));
  const at = new Map<string, { x: number; y: number; w: number; row: number }>();
  p.rows.forEach((r, ri) => {
    const total = r.reduce((s, id) => s + boxW(lab.get(id)!), 0) + (r.length - 1) * HG;
    let x = (W - total) / 2;
    for (const id of r) {
      const w = boxW(lab.get(id)!);
      at.set(id, { x, y: TOP + ri * ROWH, w, row: ri });
      x += w + HG;
    }
  });
  const treeBottom = TOP + (p.rows.length - 1) * ROWH + BH;
  const lines = 2 + (p.options[p.answer - 1]?.means === "undetermined" ? 1 : 0);
  const h = treeBottom + 16 + lines * LINE + 24;
  return { W, at, treeBottom, h };
}

function readMeaning(raw: unknown, field: string, depth = 0): Meaning {
  const m = obj(raw);
  if (m.self === true) return { self: true };
  if (typeof m.rel === "string") return { rel: plainLabel(m.rel, `${field}.rel`, 30) };
  if (Array.isArray(m.chain)) {
    if (m.chain.length < 1 || m.chain.length > 6 || !m.chain.every((s) => STEPS.includes(s as Step))) throw new ParamError(`${field}.chain must be 1 to 6 of ${STEPS.join(", ")}`);
    return { chain: m.chain as Step[] };
  }
  if (Array.isArray(m.any) && depth === 0) {
    if (m.any.length < 2 || m.any.length > 4) throw new ParamError(`${field}.any must list 2 to 4 meanings`);
    return { any: m.any.map((x, i) => readMeaning(x, `${field}.any[${i}]`, 1)) };
  }
  throw new ParamError(`${field} must be { rel }, { chain }, { any }, { self: true } or { undetermined: true }`);
}

/** Every family the statements allow, one per way of filling in the unstated sexes. */
function worlds(people: Person[], facts: Fact[]): { fam: Family; sexes: Map<string, "m" | "f"> }[] {
  const open = people.filter((p) => p.sex === "?").map((p) => p.id);
  const out: { fam: Family; sexes: Map<string, "m" | "f"> }[] = [];
  for (let mask = 0; mask < 1 << open.length; mask++) {
    const sexes = new Map(open.map((id, i) => [id, (mask >> i) & 1 ? "f" : "m"] as const));
    try {
      out.push({ fam: buildFamily(people.map((p) => (sexes.has(p.id) ? { id: p.id, sex: sexes.get(p.id)! } : p)), facts), sexes });
    } catch (e) {
      if (!(e instanceof KinError)) throw e;
    }
  }
  return out;
}

export const familyTree: Scene<TreeParams> = {
  id: "familyTree",
  beats: BEATS,

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      if (!Array.isArray(o.people) || o.people.length < 2 || o.people.length > 12) throw new ParamError("people must be a list of 2 to 12");
      const people = o.people.map((r, i) => {
        const x = obj(r);
        const id = plainLabel(x.id, `people[${i}].id`, 12);
        if (x.sex !== "m" && x.sex !== "f" && x.sex !== "?") throw new ParamError(`people[${i}].sex must be m, f or ?`);
        return { id, sex: x.sex as Person["sex"], label: x.label === undefined ? id : plainLabel(x.label, `people[${i}].label`, 12) };
      });
      const ids = new Set(people.map((x) => x.id));
      if (ids.size !== people.length) throw new ParamError("two people share an id");
      if (people.filter((x) => x.sex === "?").length > 6) throw new ParamError("at most 6 people may have an unstated sex");
      if (!Array.isArray(o.facts) || o.facts.length < 1 || o.facts.length > 12) throw new ParamError("facts must be a list of 1 to 12");
      const facts = o.facts.map((r, i) => {
        const x = obj(r);
        if (x.rel !== "parent" && x.rel !== "spouse" && x.rel !== "sibling") throw new ParamError(`facts[${i}].rel must be parent, spouse or sibling`);
        for (const k of ["a", "b"]) if (!ids.has(x[k] as string)) throw new ParamError(`facts[${i}].${k}: ${String(x[k])} is not among the people`);
        if (!FACT_BEATS.includes(x.step as (typeof FACT_BEATS)[number])) throw new ParamError(`facts[${i}].step must be f1 to f8`);
        return { rel: x.rel as Fact["rel"], a: x.a as string, b: x.b as string, step: x.step as string };
      });
      for (const x of people) if (!facts.some((f) => f.a === x.id || f.b === x.id)) throw new ParamError(`${x.id} is in no statement`);

      // Rows: the picture must agree with the facts.
      if (!Array.isArray(o.rows) || o.rows.length < 1 || o.rows.length > 5) throw new ParamError("rows must be a list of 1 to 5");
      const rows = o.rows.map((r, i) => {
        if (!Array.isArray(r) || r.length < 1 || r.length > 5) throw new ParamError(`rows[${i}] must list 1 to 5 people`);
        return r.map((id) => {
          if (!ids.has(id as string)) throw new ParamError(`rows[${i}]: ${String(id)} is not among the people`);
          return id as string;
        });
      });
      const where = new Map<string, [number, number]>();
      rows.forEach((r, ri) => r.forEach((id, ci) => {
        if (where.has(id)) throw new ParamError(`${id} is in two rows`);
        where.set(id, [ri, ci]);
      }));
      for (const x of people) if (!where.has(x.id)) throw new ParamError(`${x.id} is in no row`);
      for (const f of facts) {
        const [ra, ca] = where.get(f.a)!;
        const [rb, cb] = where.get(f.b)!;
        if (f.rel === "parent" && rb !== ra + 1) throw new ParamError(`${f.b} must sit one row below ${f.a}, their parent`);
        if (f.rel === "sibling" && ra !== rb) throw new ParamError(`siblings ${f.a} and ${f.b} must share a row`);
        if (f.rel === "spouse" && (ra !== rb || Math.abs(ca - cb) !== 1)) throw new ParamError(`spouses ${f.a} and ${f.b} must sit side by side in one row`);
      }

      let base: Family;
      try {
        base = buildFamily(people, facts);
      } catch (e) {
        if (e instanceof KinError) throw new ParamError(e.message);
        throw e;
      }
      const ws = worlds(people, facts);
      if (!ws.length) throw new ParamError("no way of filling in the unstated sexes fits the statements");

      const a = obj(o.ask);
      for (const k of ["who", "of"]) if (!ids.has(a[k] as string)) throw new ParamError(`ask.${k}: ${String(a[k])} is not among the people`);
      const ask = { who: a.who as string, of: a.of as string };

      if (!Array.isArray(o.options) || o.options.length < 2 || o.options.length > 5) throw new ParamError("options must be a list of 2 to 5");
      const truth = (who: string, of: string, m: Meaning) => {
        try {
          return ws.map((w) => holds(w.fam, who, of, m));
        } catch (e) {
          if (e instanceof KinError) throw new ParamError(e.message);
          throw e;
        }
      };
      const perWorld: boolean[][] = [];
      const options: Option[] = o.options.map((r, i) => {
        const x = obj(r);
        const textOf = plainLabel(String(x.text ?? ""), `options[${i}].text`, 48);
        const m = obj(x.means);
        if (m.undetermined === true) {
          perWorld.push([]);
          return { text: textOf, who: ask.who, of: ask.of, means: "undetermined" as const, holds: false };
        }
        const who = m.who === undefined ? ask.who : (m.who as string);
        const of = m.of === undefined ? ask.of : (m.of as string);
        if (!ids.has(who) || !ids.has(of)) throw new ParamError(`options[${i}].means names someone not among the people`);
        const meaning = readMeaning(m, `options[${i}].means`);
        const t = truth(who, of, meaning);
        perWorld.push(t);
        return { text: textOf, who, of, means: meaning, holds: t.every(Boolean) };
      });
      const settled = options.some((x) => x.holds);
      for (const x of options) if (x.means === "undetermined") x.holds = !settled;
      const hits = options.map((x, i) => (x.holds ? i + 1 : 0)).filter(Boolean);
      const answer = hits.length === 1 ? hits[0] : 0;

      // An unstated sex is decisive when changing it alone changes some option's truth.
      const open = people.filter((x) => x.sex === "?").map((x) => x.id);
      const key = (w: (typeof ws)[number], skip: string) => open.filter((id) => id !== skip).map((id) => w.sexes.get(id)).join("");
      const decisive = open.filter((u) =>
        ws.some((w1, i) => ws.some((w2, j) => i < j && key(w1, u) === key(w2, u) && w1.sexes.get(u) !== w2.sexes.get(u) && perWorld.some((t) => t.length && t[i] !== t[j]))),
      );

      // Name the route's steps by sex, counting a sex every allowed family agrees on
      // (a husband's wife is a woman, though the question never says so).
      const settledSex = (x: Person): Person["sex"] => {
        if (x.sex !== "?") return x.sex;
        const seen = new Set(ws.map((w) => w.sexes.get(x.id)));
        return seen.size === 1 ? [...seen][0]! : "?";
      };
      const route = pathBetween(buildFamily(people.map((x) => ({ id: x.id, sex: settledSex(x) })), facts), ask.of, ask.who);
      const p: TreeParams = { people, facts, rows, ask, options, answer, route, decisive };
      if (width(p) > W_MAX) throw new ParamError("a row is too wide to draw: shorten the labels or split the row");
      return p;
    }),

  check: (p) => p.answer,

  checkText: (p, value) => {
    if (!value) return "Following each option on the tree, no single option holds.";
    const opt = p.options[value - 1];
    if (opt.means === "undetermined") {
      const names = p.decisive.length ? p.decisive.map((id) => label(p, id)).join(" and ") : "someone";
      return `${names}'s sex is not stated, and no option holds either way, so it cannot be determined (option ${letterOf(value)}).`;
    }
    return `Following each option on the tree, only option ${letterOf(value)} holds: ${opt.text}.`;
  },

  viewBox: (p) => {
    const L = layout(p);
    return { w: L.W, h: L.h };
  },

  duration: (beat) => (beat === "path" ? 2400 : beat === "answer" ? 1200 : 1400),

  frame(p, { played, t }) {
    const out: Shape[] = [];
    const L = layout(p);
    const shown = new Map<string, number>();
    for (const f of p.facts) {
      const v = prog(f.step);
      for (const id of [f.a, f.b]) shown.set(id, Math.max(shown.get(id) ?? 0, v));
    }
    const box = (id: string) => L.at.get(id)!;
    const cx = (id: string) => box(id).x + box(id).w / 2;

    // Links, under the boxes.
    for (const f of p.facts) {
      const v = prog(f.step);
      if (v <= 0) continue;
      const style = { stroke: "line" as Tone, width: 1.6, opacity: v };
      const A = box(f.a);
      const B = box(f.b);
      if (f.rel === "spouse") {
        const [l, r] = A.x < B.x ? [A, B] : [B, A];
        for (const dy of [-2, 2]) out.push({ kind: "line", x1: round(l.x + l.w), y1: round(l.y + BH / 2 + dy), x2: round(r.x), y2: round(r.y + BH / 2 + dy), ...style, stroke: "fg" });
      } else if (f.rel === "sibling") {
        const bar = A.y - 12;
        out.push({ kind: "polyline", points: [[round(cx(f.a)), A.y], [round(cx(f.a)), bar], [round(cx(f.b)), bar], [round(cx(f.b)), B.y]], ...style, stroke: "fg" });
      } else {
        // From the couple's middle when the parent's marriage is already drawn.
        const spouse = p.facts.find((g) => g.rel === "spouse" && (g.a === f.a || g.b === f.a) && prog(g.step) > 0);
        const other = spouse ? (spouse.a === f.a ? spouse.b : spouse.a) : undefined;
        const sx = other ? (cx(f.a) + cx(other)) / 2 : cx(f.a);
        const sy = other ? A.y + BH / 2 + 2 : A.y + BH;
        const bar = B.y - 12;
        out.push({ kind: "polyline", points: [[round(sx), round(sy)], [round(sx), bar], [round(cx(f.b)), bar], [round(cx(f.b)), B.y]], ...style, stroke: "fg" });
      }
    }

    // People.
    const pa = prog("path");
    const routeIds = [p.ask.of, ...p.route.map((r) => r.to)];
    for (const x of p.people) {
      const v = shown.get(x.id) ?? 0;
      if (v <= 0) continue;
      const b = box(x.id);
      const stroke: Tone = x.sex === "m" ? "brand" : x.sex === "f" ? "amber" : "muted";
      out.push({ kind: "rect", x: round(b.x), y: b.y, w: round(b.w), h: BH, rx: x.sex === "f" ? 13 : 3, stroke, fill: "card", width: 1.6, dash: x.sex === "?" ? "4 3" : undefined, opacity: v });
      out.push(text(round(b.x + b.w / 2), b.y + BH / 2 + 4.5, x.label, { tone: "fg", size: 12, weight: 700, anchor: "middle", opacity: v }));
      const k = routeIds.indexOf(x.id);
      if (k >= 0 && pa * routeIds.length > k) {
        out.push({ kind: "rect", x: round(b.x - 3), y: b.y - 3, w: round(b.w + 6), h: BH + 6, rx: x.sex === "f" ? 15 : 5, stroke: "good", width: 2.4 });
        out.push(text(round(b.x + b.w + 1), b.y - 4, String(k + 1), { tone: "good", size: 10, weight: 700, anchor: "middle" }));
      }
    }

    let y = L.treeBottom + 16 + 12;
    const name = (id: string) => label(p, id);
    if (pa > 0.3) {
      const self = ({ m: "himself", f: "herself" } as Record<string, string>)[p.people.find((x) => x.id === p.ask.who)?.sex ?? "?"] ?? "themself";
      const words = p.route.length
        ? `${possessive(name(p.ask.of))} ${p.route.map((r) => r.step).join("'s ")} is ${name(p.ask.who)}`
        : p.ask.who === p.ask.of
          ? `${name(p.ask.who)} ${self}`
          : `no route from ${name(p.ask.of)} to ${name(p.ask.who)}`;
      out.push(text(L.W / 2, y, words, { tone: "good", size: words.length > 46 ? 10.5 : 12, weight: 700, anchor: "middle", opacity: Math.min(1, (pa - 0.3) * 3) }));
    }
    y += LINE;
    const pn = prog("answer");
    if (pn > 0) {
      const op = Math.min(1, pn * 2);
      const opt = p.options[p.answer - 1];
      if (opt?.means === "undetermined") {
        const names = p.decisive.map(name).join(" and ") || "a sex";
        out.push(text(L.W / 2, y, `${names}: sex not stated, no option holds both ways`, { tone: "amber", size: 11, weight: 600, anchor: "middle", opacity: op }));
        y += LINE;
      }
      const msg = opt ? `option ${letterOf(p.answer)}: ${opt.text}` : "no single option holds";
      out.push(text(L.W / 2, y, msg, { tone: opt ? "good" : "bad", size: msg.length > 46 ? 10.5 : 12.5, weight: 700, anchor: "middle", opacity: op }));
    }

    // A legend, so the box shapes are not left to guess.
    const ly = L.h - 8;
    const items: [string, Tone, number, string | undefined][] = [["man", "brand", 3, undefined], ["woman", "amber", 7, undefined]];
    if (p.people.some((x) => x.sex === "?")) items.push(["sex not stated", "muted", 3, "4 3"]);
    const gap = (w: string) => 34 + w.length * 6;
    let lx = L.W / 2 - items.reduce((s, [w]) => s + gap(w), 0) / 2;
    for (const [word, tone, rx, dash] of items) {
      out.push({ kind: "rect", x: round(lx), y: ly - 9, w: 18, h: 11, rx, stroke: tone, width: 1.3, dash });
      out.push(text(round(lx + 22), ly, word, { tone: "muted", size: 10 }));
      lx += gap(word);
    }
    return out;

    function prog(beat: string) {
      const later = BEATS.slice(BEATS.indexOf(beat) + 1);
      if (!played.includes(beat) && later.some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    }
  },
};

/** "your father", "my father", "Ravi's father". */
function possessive(name: string) {
  const own: Record<string, string> = { you: "your", I: "my", me: "my" };
  return own[name] ?? own[name.toLowerCase()] ?? `${name}'s`;
}

function label(p: TreeParams, id: string) {
  return p.people.find((x) => x.id === id)?.label ?? id;
}
