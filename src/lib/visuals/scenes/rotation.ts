/**
 * Rotation: a wheel turning, for "revolutions to radians / angular
 * displacement" questions. Params: `revolutions`, or `perSecond` and `seconds`.
 * Beats: spin (the wheel turns, counting time and turns), radiiRound (radius
 * lengths laid round the rim: 2π of them), oneTurn (one revolution = 2π),
 * total (a spiral adding the angle up to the answer).
 */
import { arcPath, dot, line, onCircle, progressOf, piMultiple, num, text, TAU } from "../geometry";
import { finite, obj, optionalFinite, ParamError, safely } from "../params";
import type { Scene, Shape } from "../types";

export interface RotationParams {
  revolutions: number;
  timed: { perSecond: number; seconds: number } | null;
}

const CX = 118;
const CY = 120;
const R = 62;
const PANEL = 238;
const MAX_DRAWN_TURNS = 4;

function wheel(phi: number): Shape[] {
  const out: Shape[] = [dot(CX, CY, R, "card", { stroke: "fg", width: 3 })];
  for (let j = 1; j < 8; j++) {
    const [x, y] = onCircle(CX, CY, R, phi + (j * Math.PI) / 4);
    out.push(line(CX, CY, x, y, { stroke: "line", width: 2 }));
  }
  const [x, y] = onCircle(CX, CY, R, phi);
  out.push(line(CX, CY, x, y, { stroke: "brand", width: 3.5, cap: "round" }), dot(x, y, 5, "brand"), dot(CX, CY, 5, "fg"));
  return out;
}

// Panel rows sit at the top and bottom of the box, leaving its middle band
// (y 90-160) clear for the turn markers the spiral labels at angle 0.
function panel(rows: [string, string][]): Shape[] {
  return rows.flatMap(([label, value], i) => [
    text(PANEL, 60 + i * 110, label, { tone: "muted", size: 11.5 }),
    text(PANEL, 82 + i * 110, value, { size: 19, weight: 700 }),
  ]);
}
const NOTE_Y = 226;

/** The spiral's radius at angle a: it widens by 24 px over the turns drawn, so each turn stands apart. */
const spiralR = (a: number, turns: number) => R + 12 + (a / (turns * TAU)) * 24;

function spiral(theta: number, turns: number): Shape {
  const pts: [number, number][] = [];
  for (let a = 0; a <= theta + 1e-9; a += 0.05) pts.push(onCircle(CX, CY, spiralR(a, turns), a));
  return { kind: "polyline", points: pts, stroke: "amber", width: 4, cap: "round" };
}

export const rotation: Scene<RotationParams> = {
  id: "rotation",
  beats: ["spin", "radiiRound", "oneTurn", "total"],

  parse: (raw) =>
    safely(() => {
      const o = obj(raw);
      const perSecond = optionalFinite(o, "perSecond", { min: 0 });
      const seconds = optionalFinite(o, "seconds", { min: 0 });
      let revolutions: number;
      let timed: RotationParams["timed"] = null;
      if (perSecond !== undefined || seconds !== undefined) {
        if (perSecond === undefined || seconds === undefined) throw new ParamError("perSecond and seconds go together");
        revolutions = perSecond * seconds;
        timed = { perSecond, seconds };
      } else {
        revolutions = finite(o, "revolutions");
      }
      if (!(revolutions > 0) || revolutions > 100) throw new ParamError("revolutions must be more than 0 and at most 100");
      return { revolutions, timed };
    }),

  check: (p) => p.revolutions * TAU,

  checkText: (p, value) => `The drawing turns ${num(p.revolutions)} × 2π = ${piMultiple(value)} rad.`,

  viewBox: () => ({ w: 340, h: 240 }),

  duration: (beat) => ({ spin: 2400, radiiRound: 2800, oneTurn: 1800, total: 2600 })[beat] ?? 1500,

  frame(p, { played, t }) {
    const mode = played[played.length - 1];
    const drawnTurns = Math.min(p.revolutions, MAX_DRAWN_TURNS);

    if (mode === "spin") {
      const rows: [string, string][] = p.timed
        ? [["time", `${(p.timed.seconds * t).toFixed(2)} s`], ["revolutions", (p.revolutions * t).toFixed(2)]]
        : [["revolutions", (p.revolutions * t).toFixed(2)]];
      const out = [...wheel(drawnTurns * TAU * t), ...panel(rows)];
      if (t === 1) out.push(text(PANEL, NOTE_Y, `${num(p.revolutions)} in all`, { tone: "amber", weight: 700 }));
      return out;
    }

    if (mode === "radiiRound") {
      const n = TAU * t;
      const out: Shape[] = [...wheel(0), text(CX + R / 2, CY - 8, "r", { tone: "brand", weight: 700, italic: true, anchor: "middle" })];
      for (let j = 0; j < 7; j++) {
        const a = j;
        const b = Math.min(j + 1, n, TAU);
        if (b <= a) break;
        out.push({ kind: "path", d: arcPath(CX, CY, R, a, b), stroke: j % 2 ? "amber" : "brand", width: 8 });
        if (b === j + 1 || b === TAU) {
          const [lx, ly] = onCircle(CX, CY, R + 18, (a + b) / 2);
          out.push(text(lx, ly + 4, j === 6 ? (TAU - 6).toFixed(2) : String(j + 1), { size: 12, weight: 600, anchor: "middle" }));
        }
      }
      out.push(...panel([["radii round the rim", n.toFixed(2)]]));
      if (t === 1) out.push(text(PANEL, 118, "= 2π", { size: 19, weight: 700, tone: "amber" }));
      return out;
    }

    if (mode === "oneTurn") {
      const phi = TAU * t;
      const out: Shape[] = [];
      if (phi > 1e-6) out.push({ kind: "path", d: arcPath(CX, CY, R + 12, 0, phi), stroke: "amber", width: 4, cap: "round" });
      out.push(...wheel(phi), ...panel([["revolutions", t.toFixed(2)], ["angle", t === 1 ? "2π rad" : `${piMultiple(phi)} rad`]]));
      if (t === 1) out.push(text(PANEL, NOTE_Y, "1 turn = 2π", { tone: "amber", weight: 700 }));
      return out;
    }

    // total
    const progress = progressOf("total", played, t);
    const theta = drawnTurns * TAU * progress;
    const out: Shape[] = [spiral(theta, drawnTurns), ...wheel(theta)];
    // Turn markers sit on the spiral at angle 0; labels go just outside it,
    // alternating above and below so neighbours never touch.
    for (let k = 1; k <= Math.floor(drawnTurns + 1e-9); k++) {
      if (theta + 1e-9 < k * TAU) break;
      const [x, y] = onCircle(CX, CY, spiralR(k * TAU, drawnTurns), k * TAU);
      out.push(dot(x, y, 4, "amber"), text(x + 7, k % 2 ? y - 7 : y + 15, piMultiple(k * TAU), { size: 12, weight: 700 }));
    }
    const angle = p.revolutions * TAU * progress;
    out.push(...panel([["revolutions", (p.revolutions * progress).toFixed(2)], ["angle", `${piMultiple(angle)} rad`]]));
    if (progress === 1) out.push(text(PANEL, NOTE_Y, `answer ${piMultiple(angle)}`, { tone: "good", weight: 700 }));
    return out;
  },
};
