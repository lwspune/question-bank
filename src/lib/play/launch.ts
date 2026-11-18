/**
 * Launch (2026-11-18), the /play Physics game: set an angle and a speed, fire,
 * hit the target. Real units and g = 10 m/s², the value NDA, JEE and board
 * papers use, so what a student learns by playing is what the exam asks:
 * 45° goes farthest on flat ground, angles that add to 90° land together, a
 * wall needs a steeper shot, a tower adds range. Pure: the page animates the
 * `path` this returns.
 */

export const G = 10;
export const ANGLE_MIN = 5;
export const ANGLE_MAX = 85;
export const SPEED_MIN = 10;
export const SPEED_MAX = 40;
export const SHOTS = 3;
/** The field drawn on screen, in metres. */
export const FIELD = 120;

export type Box = { x: number; w: number; h: number };
export type LaunchLevel = {
  id: number;
  name: string;
  /** Height of the launcher above the ground (a tower), metres. */
  launchHeight: number;
  /** The target sits on the ground (y 0) or on a cliff top (y = its height). */
  target: { x: number; w: number; y: number };
  walls: Box[];
  cliffs: Box[];
  hoop?: { x: number; y: number; r: number };
};

export type Outcome = "hit" | "short" | "long" | "wall" | "cliff" | "hoop" | "off";
export type Shot = {
  outcome: Outcome;
  landX: number;
  landY: number;
  peak: number;
  /** Seconds in the air. */
  time: number;
  /** Sampled every 0.02 s for drawing. */
  path: { x: number; y: number }[];
  throughHoop: boolean;
};

const rad = (d: number) => (d * Math.PI) / 180;

export function rangeOnFlat(angleDeg: number, u: number): number {
  return (u * u * Math.sin(2 * rad(angleDeg))) / G;
}

export function maxHeight(angleDeg: number, u: number): number {
  return (u * u * Math.sin(rad(angleDeg)) ** 2) / (2 * G);
}

export function timeOfFlight(angleDeg: number, u: number): number {
  return (2 * u * Math.sin(rad(angleDeg))) / G;
}

const DT = 0.002;

export function simulateShot(L: LaunchLevel, angleDeg: number, u: number): Shot {
  const a = rad(angleDeg);
  const vx = u * Math.cos(a);
  const vy = u * Math.sin(a);
  const y0 = L.launchHeight;
  const path: { x: number; y: number }[] = [{ x: 0, y: y0 }];
  let peak = y0;
  let through = false;
  let px = 0;
  let py = y0;
  const done = (outcome: Outcome, x: number, y: number, t: number): Shot => {
    path.push({ x, y });
    let o = outcome;
    if (o === "hit" && L.hoop && !through) o = "hoop";
    return { outcome: o, landX: x, landY: y, peak, time: t, path, throughHoop: through };
  };
  for (let i = 1; i < 200_000; i++) {
    const t = i * DT;
    const x = vx * t;
    const y = y0 + vy * t - (G / 2) * t * t;
    peak = Math.max(peak, y);
    if (i % 10 === 0) path.push({ x, y });
    if (L.hoop && Math.hypot(x - L.hoop.x, y - L.hoop.y) <= L.hoop.r) through = true;
    for (const w of L.walls) if (x >= w.x && x <= w.x + w.w && y <= w.h) return done("wall", x, y, t);
    for (const c of L.cliffs) {
      if (x >= c.x && x <= c.x + c.w && y <= c.h) {
        // From above (it was over the top a moment ago): it lands on the top.
        if (py > c.h && px >= c.x - 1e-9) {
          const onTarget = L.target.y === c.h && x >= L.target.x && x <= L.target.x + L.target.w;
          return done(onTarget ? "hit" : x < L.target.x ? "short" : "long", x, c.h, t);
        }
        return done("cliff", x, y, t);
      }
    }
    if (y <= 0) {
      // Interpolate to the ground so the landing point is exact to the step.
      const f = py / (py - y);
      const lx = px + (x - px) * f;
      if (L.target.y === 0 && lx >= L.target.x && lx <= L.target.x + L.target.w) return done("hit", lx, 0, t);
      return done(lx < L.target.x ? "short" : "long", lx, 0, t);
    }
    if (x > FIELD + 30) return done("off", x, y, t);
    px = x;
    py = y;
  }
  return done("off", px, py, 0);
}

export function starsFor(shotNumber: number): number {
  return Math.max(1, 4 - shotNumber);
}

// --- levels ------------------------------------------------------------------

type Def = Omit<LaunchLevel, "id" | "walls" | "cliffs"> & { walls?: Box[]; cliffs?: Box[] };
const DEFS: Def[] = [
  { name: "First shot", launchHeight: 0, target: { x: 40, w: 8, y: 0 } },
  { name: "Further out", launchHeight: 0, target: { x: 75, w: 8, y: 0 } },
  { name: "Long range", launchHeight: 0, target: { x: 95, w: 8, y: 0 } },
  { name: "Close in", launchHeight: 0, target: { x: 22, w: 5, y: 0 } },
  { name: "As far as it goes", launchHeight: 0, target: { x: 110, w: 8, y: 0 } },
  { name: "Over the wall", launchHeight: 0, target: { x: 48, w: 8, y: 0 }, walls: [{ x: 30, w: 3, h: 15 }] },
  { name: "Higher wall", launchHeight: 0, target: { x: 76, w: 8, y: 0 }, walls: [{ x: 42, w: 3, h: 25 }] },
  { name: "Wall by the target", launchHeight: 0, target: { x: 72, w: 8, y: 0 }, walls: [{ x: 62, w: 3, h: 28 }] },
  { name: "From the tower", launchHeight: 20, target: { x: 55, w: 7, y: 0 } },
  { name: "High tower, far target", launchHeight: 30, target: { x: 95, w: 8, y: 0 } },
  { name: "Onto the cliff", launchHeight: 0, target: { x: 66, w: 8, y: 12 }, cliffs: [{ x: 60, w: 40, h: 12 }] },
  { name: "Higher cliff", launchHeight: 0, target: { x: 80, w: 8, y: 20 }, cliffs: [{ x: 50, w: 50, h: 20 }] },
  { name: "Below the cliff", launchHeight: 0, target: { x: 38, w: 7, y: 0 }, cliffs: [{ x: 47, w: 40, h: 18 }] },
  { name: "Through the hoop", launchHeight: 0, target: { x: 52, w: 8, y: 0 }, hoop: { x: 26, y: 13, r: 3 } },
  { name: "High hoop", launchHeight: 0, target: { x: 82, w: 8, y: 0 }, hoop: { x: 41, y: 26, r: 3 } },
  { name: "Two walls", launchHeight: 0, target: { x: 88, w: 8, y: 0 }, walls: [{ x: 30, w: 3, h: 12 }, { x: 60, w: 3, h: 22 }] },
  { name: "Tower and wall", launchHeight: 25, target: { x: 72, w: 8, y: 0 }, walls: [{ x: 40, w: 3, h: 32 }] },
  { name: "Straight down", launchHeight: 40, target: { x: 26, w: 6, y: 0 } },
  { name: "Top of the mesa", launchHeight: 0, target: { x: 84, w: 8, y: 30 }, cliffs: [{ x: 72, w: 38, h: 30 }] },
  { name: "Low hoop", launchHeight: 0, target: { x: 76, w: 8, y: 0 }, hoop: { x: 38, y: 9, r: 3 } },
  { name: "Edge of the field", launchHeight: 0, target: { x: 112, w: 6, y: 0 } },
  { name: "Lob it", launchHeight: 0, target: { x: 46, w: 7, y: 0 }, walls: [{ x: 22, w: 3, h: 35 }] },
  { name: "Tower to cliff", launchHeight: 15, target: { x: 76, w: 8, y: 25 }, cliffs: [{ x: 62, w: 45, h: 25 }] },
  { name: "Up through the hoop", launchHeight: 0, target: { x: 98, w: 8, y: 0 }, hoop: { x: 50, y: 34, r: 4 } },
  { name: "Small target", launchHeight: 0, target: { x: 70, w: 4, y: 0 } },
  { name: "Wall then ledge", launchHeight: 0, target: { x: 92, w: 8, y: 10 }, walls: [{ x: 48, w: 3, h: 20 }], cliffs: [{ x: 82, w: 30, h: 10 }] },
  { name: "Drop shot", launchHeight: 50, target: { x: 18, w: 5, y: 0 } },
  { name: "Hoop and wall", launchHeight: 0, target: { x: 90, w: 8, y: 0 }, hoop: { x: 26, y: 18, r: 3.5 }, walls: [{ x: 60, w: 3, h: 18 }] },
  { name: "Near edge of the cliff", launchHeight: 0, target: { x: 41, w: 6, y: 35 }, cliffs: [{ x: 40, w: 40, h: 35 }] },
  { name: "The long way round", launchHeight: 10, target: { x: 104, w: 7, y: 0 }, walls: [{ x: 40, w: 3, h: 28 }], hoop: { x: 80, y: 20, r: 4 } },
];

export const LAUNCH_LEVELS: LaunchLevel[] = DEFS.map((d, i) => ({ walls: [], cliffs: [], ...d, id: i + 1 }));

// --- progress, kept in the browser ------------------------------------------

export const LAUNCH_KEY = "pyqv-launch-v1";
export type LaunchProgress = { v: 1; stars: Record<number, number> };

export function parseLaunchProgress(raw: string | null): LaunchProgress {
  const fresh: LaunchProgress = { v: 1, stars: {} };
  if (!raw) return fresh;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return fresh;
  }
  if (typeof o !== "object" || o === null) return fresh;
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || typeof r.stars !== "object" || r.stars === null) return fresh;
  const stars: Record<number, number> = {};
  for (const [k, v] of Object.entries(r.stars as Record<string, unknown>)) {
    const id = Number(k);
    if (!Number.isInteger(id) || id < 1 || id > LAUNCH_LEVELS.length) continue;
    if (typeof v !== "number" || !Number.isInteger(v) || v < 1 || v > 3) return fresh;
    stars[id] = v;
  }
  return { v: 1, stars };
}

export function serializeLaunchProgress(p: LaunchProgress): string {
  return JSON.stringify(p);
}

export function isLaunchOpen(p: LaunchProgress, id: number): boolean {
  return id === 1 || (p.stars[id - 1] ?? 0) >= 1;
}

export function recordLaunch(p: LaunchProgress, id: number, stars: number): LaunchProgress {
  if ((p.stars[id] ?? 0) >= stars) return p;
  return { v: 1, stars: { ...p.stars, [id]: stars } };
}
