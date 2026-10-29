/**
 * Switching circuit (owner, 2026-10-29): the circuit is drawn from its formula,
 * never by hand. ∧ puts switches in series, ∨ in parallel, ∼p is the switch
 * S′ (closed exactly when S is open). Then the truth-table rows play: the
 * switches open and close and the lamp lights on exactly the rows where the
 * formula is T.
 *
 *   circuits  [{ f, label? }]  one or two (a circuit and its simplified form),
 *                              written with ∧ ∨ ∼ only, ∼ on single letters
 *   equals    the statement the solution names (any connectives, → and ↔ too):
 *             every circuit must have its truth table, or the check fails
 *   names     { p: "S1" }      the switch for each letter; default S1, S2, ...
 *                              in letter order
 *
 * Beats: build (the first circuit appears), rows (the rows play), answer (the
 * second circuit, and what the check found).
 */
import { dot, line, progressOf, text } from "../geometry";
import { equivalent, evaluate, parseLogic, rows as allRows, showLogic, varsOf, type Logic } from "../logic";
import { obj, optionalLabel, ParamError, plainLabel, safely } from "../params";
import type { Scene, Shape } from "../types";

/** A switch block: wire, terminal, lever, terminal, wire. */
const SW = 50;
const SH = 30;
const SMID = 19;
/** A plain wire (a constant T). */
const WW = 24;
const RAIL = 10;
const GAP = 6;
const LEFT = 26;
const RIGHT = 26;
const HEAD = 24;
const LABEL = 16;
const MAX_W = 440;
const MIN_W = 300;

type Node = { k: "lit"; v: string; neg: boolean } | { k: "wire" } | { k: "series" | "parallel"; kids: Node[] };

export interface PlacedSwitch {
  x: number;
  y: number;
  v: string;
  neg: boolean;
}

export interface CircuitLayout {
  w: number;
  h: number;
  /** The height, from the top, of the wire that feeds the circuit. */
  mid: number;
  switches: PlacedSwitch[];
  wires: [number, number, number, number][];
}

function toNode(f: Logic): Node {
  switch (f.k) {
    case "var":
      return { k: "lit", v: f.n, neg: false };
    case "not":
      if (f.a.k === "var") return { k: "lit", v: f.a.n, neg: true };
      throw new ParamError("a ∼ over a bracket is not a single switch: open it first (De Morgan), so ∼ sits on single letters");
    case "const":
      if (f.v) return { k: "wire" };
      throw new ParamError("F is an open gap, not a circuit: simplify it away");
    case "and":
    case "or": {
      const k = f.k === "and" ? "series" : "parallel";
      const kids: Node[] = [];
      const take = (g: Logic) => {
        if (g.k === f.k) {
          take(g.a);
          take(g.b);
        } else kids.push(toNode(g));
      };
      take(f);
      return { k, kids };
    }
    default:
      throw new ParamError("a circuit is written with ∧ ∨ ∼ only: rewrite → and ↔ first, as the solution does");
  }
}

function size(n: Node): { w: number; h: number; mid: number } {
  if (n.k === "lit") return { w: SW, h: SH, mid: SMID };
  if (n.k === "wire") return { w: WW, h: 12, mid: 6 };
  const ks = n.kids.map(size);
  if (n.k === "series") {
    const up = Math.max(...ks.map((k) => k.mid));
    const down = Math.max(...ks.map((k) => k.h - k.mid));
    return { w: ks.reduce((s, k) => s + k.w, 0), h: up + down, mid: up };
  }
  const h = ks.reduce((s, k) => s + k.h, 0) + GAP * (ks.length - 1);
  const first = ks[0].mid;
  let top = 0;
  for (let i = 0; i < ks.length - 1; i++) top += ks[i].h + GAP;
  const last = top + ks[ks.length - 1].mid;
  return { w: Math.max(...ks.map((k) => k.w)) + 2 * RAIL, h, mid: (first + last) / 2 };
}

function place(n: Node, x: number, y: number, out: CircuitLayout): void {
  const s = size(n);
  if (n.k === "lit") {
    out.switches.push({ x, y: y + s.mid, v: n.v, neg: n.neg });
    return;
  }
  if (n.k === "wire") {
    out.wires.push([x, y + s.mid, x + s.w, y + s.mid]);
    return;
  }
  if (n.k === "series") {
    let cx = x;
    for (const kid of n.kids) {
      const ks = size(kid);
      place(kid, cx, y + s.mid - ks.mid, out);
      cx += ks.w;
    }
    return;
  }
  let cy = y;
  const ys: number[] = [];
  for (const kid of n.kids) {
    const ks = size(kid);
    const by = cy + ks.mid;
    ys.push(by);
    out.wires.push([x, by, x + RAIL, by]);
    place(kid, x + RAIL, cy, out);
    out.wires.push([x + RAIL + ks.w, by, x + s.w, by]);
    cy += ks.h + GAP;
  }
  out.wires.push([x, ys[0], x, ys[ys.length - 1]]);
  out.wires.push([x + s.w, ys[0], x + s.w, ys[ys.length - 1]]);
}

/** Where every switch and wire of the circuit for `f` goes, from (0, 0). Pure. */
export function layoutCircuit(f: Logic): CircuitLayout {
  const n = toNode(f);
  const s = size(n);
  const out: CircuitLayout = { ...s, switches: [], wires: [] };
  place(n, 0, 0, out);
  return out;
}

interface Circuit {
  f: Logic;
  label?: string;
  layout: CircuitLayout;
}

export interface CircuitParams {
  circuits: Circuit[];
  equals: Logic;
  vars: string[];
  names: Record<string, string>;
  askLabel: string | undefined;
}

const blockW = (c: Circuit) => c.layout.w + LEFT + RIGHT + 16;
const blockH = (c: Circuit) => c.layout.h + 34;

function box(p: CircuitParams): { w: number; h: number } {
  const w = Math.max(MIN_W, ...p.circuits.map(blockW));
  const h = HEAD + p.circuits.reduce((s, c, i) => s + blockH(c) + (i > 0 ? LABEL : 0), 0) + 6;
  return { w, h };
}

const switchName = (p: CircuitParams, s: { v: string; neg: boolean }) => p.names[s.v] + (s.neg ? "′" : "");

export const switchCircuit: Scene<CircuitParams> = {
  id: "switchCircuit",
  beats: ["build", "rows", "answer"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const formula = (v: unknown, field: string): Logic => {
        if (typeof v !== "string") throw new ParamError(`${field} must be a formula`);
        try {
          return parseLogic(v);
        } catch (e) {
          throw new ParamError(`${field}: ${(e as Error).message}`);
        }
      };
      if (!Array.isArray(o.circuits) || o.circuits.length < 1 || o.circuits.length > 2) throw new ParamError("circuits must be a list of one or two");
      const circuits: Circuit[] = o.circuits.map((raw2, i) => {
        const c = obj(raw2);
        const f = formula(c.f, `circuits[${i}].f`);
        let layout: CircuitLayout;
        try {
          layout = layoutCircuit(f);
        } catch (e) {
          throw new ParamError(`circuits[${i}]: ${(e as Error).message}`);
        }
        return { f, label: optionalLabel(c, "label", 40), layout };
      });
      const equals = formula(o.equals, "equals");
      const vars = varsOf(equals, ...circuits.map((c) => c.f)).sort();
      if (vars.length > 4) throw new ParamError(`at most 4 switch letters (this has ${vars.join(", ")})`);
      const names: Record<string, string> = {};
      const given = o.names === undefined ? {} : obj(o.names);
      vars.forEach((v, i) => (names[v] = given[v] === undefined ? `S${i + 1}` : plainLabel(given[v], `names.${v}`, 4)));
      for (const c of circuits) if (blockW(c) > MAX_W) throw new ParamError(`the circuit is too wide to draw (${blockW(c)} px)`);
      return { circuits, equals, vars, names, askLabel: optionalLabel(o, "label", 40) };
    }),

  check: (p) => (p.circuits.every((c) => equivalent(c.f, p.equals)) ? 1 : 0),

  checkText: (p, value) =>
    value
      ? `Every circuit drawn has the same truth table as ${showLogic(p.equals)}.`
      : `A circuit drawn does not have the truth table of ${showLogic(p.equals)}.`,

  viewBox: (p) => box(p),

  duration: (beat) => ({ build: 1600, rows: 4000, answer: 1400 })[beat] ?? 1400,

  frame(p, { played, t }) {
    const { w } = box(p);
    const out: Shape[] = [];
    const rows = allRows(p.vars);
    const pb = prog("build");
    const pr = prog("rows");
    const pa = prog("answer");
    // The row the switches show: none until the rows play, then one row after another.
    // In the answer, the first row that lights the lamp, so the finished picture shows current flowing.
    const lightRow = rows.findIndex((row) => evaluate(p.circuits[0].f, row));
    const r = pa > 0 && lightRow >= 0 ? lightRow : pr > 0 ? Math.min(rows.length - 1, Math.floor(pr * rows.length)) : -1;
    const env = r >= 0 ? rows[r] : undefined;

    let y = HEAD;
    p.circuits.forEach((c, i) => {
      const show = i === 0 ? pb : pa;
      if (i > 0) y += LABEL;
      if (show > 0) {
        if (i > 0 && c.label) out.push(text(w / 2, y - 4, c.label, { tone: "amber", size: 11.5, weight: 600, anchor: "middle" }));
        else if (i === 0 && c.label) out.push(text(8, y - 4, c.label, { tone: "amber", size: 11.5, weight: 600 }));
      }
      // The first circuit's loop shows faintly from the start, so the picture is never blank; its switches appear as it builds.
      if (show > 0 || i === 0) drawCircuit(c, (w - blockW(c)) / 2 + 8, y, i === 0 ? Math.max(show, 0.15) : show, show);
      y += blockH(c);
    });

    if (env) {
      const states = p.vars.map((v) => `${p.names[v]} ${env[v] ? "on" : "off"}`).join(", ");
      const lit = evaluate(p.circuits[0].f, env);
      if (pa < 0.6) out.push(text(w / 2, 16, `${states}: lamp ${lit ? "on" : "off"}`, { tone: lit ? "good" : "muted", size: 12, weight: 700, anchor: "middle" }));
    }
    if (pa > 0.6) {
      const same = p.circuits.every((c) => equivalent(c.f, p.equals));
      out.push(text(w / 2, 16, p.askLabel ?? (same ? "same truth table: the circuits are equivalent" : "the truth tables differ"), { tone: same ? "good" : "bad", size: 12, weight: 700, anchor: "middle" }));
    }
    return out;

    function drawCircuit(c: Circuit, x0: number, y0: number, opacity: number, built: number) {
      const L = c.layout;
      const nx = x0 + LEFT;
      const topY = y0 + L.mid;
      const leftX = x0;
      const rightX = nx + L.w + RIGHT;
      const botY = y0 + L.h + 20;
      const lit = env ? evaluate(c.f, env) : false;
      const wire = (x1: number, y1: number, x2: number, y2: number) => out.push(line(x1, y1, x2, y2, { stroke: "fg", width: 1.6, opacity }));
      // The loop: in, the network, out, down, back along the bottom past the lamp and the cell.
      wire(leftX, topY, nx, topY);
      wire(nx + L.w, topY, rightX, topY);
      wire(leftX, topY, leftX, botY);
      wire(rightX, topY, rightX, botY);
      const lampX = (leftX + rightX) / 2;
      const cellX = leftX + 34;
      wire(leftX, botY, cellX - 3, botY);
      wire(cellX + 8, botY, lampX - 9, botY);
      wire(lampX + 9, botY, rightX, botY);
      // The cell: a long plate and a short one.
      out.push(line(cellX - 3, botY - 9, cellX - 3, botY + 9, { stroke: "fg", width: 2, opacity }));
      out.push(line(cellX + 8, botY - 5, cellX + 8, botY + 5, { stroke: "fg", width: 3, opacity }));
      // The lamp: a circle with a cross, filled when current flows.
      out.push({ kind: "circle", cx: lampX, cy: botY, r: 9, fill: lit ? "amber" : "card", stroke: "fg", width: 1.6, opacity });
      out.push(line(lampX - 6, botY - 6, lampX + 6, botY + 6, { stroke: "fg", width: 1.2, opacity }));
      out.push(line(lampX - 6, botY + 6, lampX + 6, botY - 6, { stroke: "fg", width: 1.2, opacity }));
      for (const [x1, y1, x2, y2] of L.wires) wire(nx + x1, y0 + y1, nx + x2, y0 + y2);
      L.switches.forEach((s, k) => {
        // While building, the switches appear one after another.
        const appear = Math.max(0, Math.min(1, built * L.switches.length - k));
        if (appear <= 0) return;
        const sx = nx + s.x;
        const sy = y0 + s.y;
        const closed = env ? (s.neg ? !env[s.v] : env[s.v]) : undefined;
        const tone = closed === undefined ? "fg" : closed ? "good" : "muted";
        out.push(line(sx, sy, sx + 12, sy, { stroke: "fg", width: 1.6, opacity: appear }));
        out.push(line(sx + 38, sy, sx + SW, sy, { stroke: "fg", width: 1.6, opacity: appear }));
        out.push(dot(sx + 12, sy, 2.6, "fg", { opacity: appear }));
        out.push(dot(sx + 38, sy, 2.6, "fg", { opacity: appear }));
        out.push(closed ? line(sx + 12, sy, sx + 38, sy, { stroke: tone, width: 2.4, opacity: appear }) : line(sx + 12, sy, sx + 35, sy - 10, { stroke: tone, width: 2.4, opacity: appear }));
        out.push(text(sx + 25, sy - 11, switchName(p, s), { tone: closed ? "good" : "fg", size: 11, weight: 700, anchor: "middle", opacity: appear }));
      });
    }

    function prog(beat: string) {
      const order = ["build", "rows", "answer"];
      const later = order.slice(order.indexOf(beat) + 1);
      if (!played.includes(beat) && later.some((b) => played.includes(b))) return 1;
      return progressOf(beat, played, t);
    }
  },
};
