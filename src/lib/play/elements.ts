import type { Rng } from "./generate";

/**
 * Element Hunt (2026-11-18), the /play Chemistry game: the periodic table is
 * the board and a clue names an element (its name, atomic number, group and
 * period, family, or a fact the exams ask). 60 seconds; a wrong tap costs 3.
 * Three worlds: periods 1-3, 1-4, then 1-6 (lanthanides left out, as most
 * exam tables do). Names and the metalloid list follow NCERT (Aluminium,
 * Sulphur, Caesium; Class 10's seven metalloids). Pure.
 */

export type Family =
  | "nonmetal"
  | "noble"
  | "halogen"
  | "alkali"
  | "alkaline"
  | "metalloid"
  | "dblock"
  | "post";

export type Element = { z: number; s: string; name: string; g: number; p: number; fam: Family };

type E = [z: number, s: string, name: string, g: number, p: number, fam: Family];
const RAW: E[] = [
  [1, "H", "Hydrogen", 1, 1, "nonmetal"], [2, "He", "Helium", 18, 1, "noble"],
  [3, "Li", "Lithium", 1, 2, "alkali"], [4, "Be", "Beryllium", 2, 2, "alkaline"], [5, "B", "Boron", 13, 2, "metalloid"],
  [6, "C", "Carbon", 14, 2, "nonmetal"], [7, "N", "Nitrogen", 15, 2, "nonmetal"], [8, "O", "Oxygen", 16, 2, "nonmetal"],
  [9, "F", "Fluorine", 17, 2, "halogen"], [10, "Ne", "Neon", 18, 2, "noble"],
  [11, "Na", "Sodium", 1, 3, "alkali"], [12, "Mg", "Magnesium", 2, 3, "alkaline"], [13, "Al", "Aluminium", 13, 3, "post"],
  [14, "Si", "Silicon", 14, 3, "metalloid"], [15, "P", "Phosphorus", 15, 3, "nonmetal"], [16, "S", "Sulphur", 16, 3, "nonmetal"],
  [17, "Cl", "Chlorine", 17, 3, "halogen"], [18, "Ar", "Argon", 18, 3, "noble"],
  [19, "K", "Potassium", 1, 4, "alkali"], [20, "Ca", "Calcium", 2, 4, "alkaline"], [21, "Sc", "Scandium", 3, 4, "dblock"],
  [22, "Ti", "Titanium", 4, 4, "dblock"], [23, "V", "Vanadium", 5, 4, "dblock"], [24, "Cr", "Chromium", 6, 4, "dblock"],
  [25, "Mn", "Manganese", 7, 4, "dblock"], [26, "Fe", "Iron", 8, 4, "dblock"], [27, "Co", "Cobalt", 9, 4, "dblock"],
  [28, "Ni", "Nickel", 10, 4, "dblock"], [29, "Cu", "Copper", 11, 4, "dblock"], [30, "Zn", "Zinc", 12, 4, "dblock"],
  [31, "Ga", "Gallium", 13, 4, "post"], [32, "Ge", "Germanium", 14, 4, "metalloid"], [33, "As", "Arsenic", 15, 4, "metalloid"],
  [34, "Se", "Selenium", 16, 4, "nonmetal"], [35, "Br", "Bromine", 17, 4, "halogen"], [36, "Kr", "Krypton", 18, 4, "noble"],
  [37, "Rb", "Rubidium", 1, 5, "alkali"], [38, "Sr", "Strontium", 2, 5, "alkaline"], [39, "Y", "Yttrium", 3, 5, "dblock"],
  [40, "Zr", "Zirconium", 4, 5, "dblock"], [41, "Nb", "Niobium", 5, 5, "dblock"], [42, "Mo", "Molybdenum", 6, 5, "dblock"],
  [43, "Tc", "Technetium", 7, 5, "dblock"], [44, "Ru", "Ruthenium", 8, 5, "dblock"], [45, "Rh", "Rhodium", 9, 5, "dblock"],
  [46, "Pd", "Palladium", 10, 5, "dblock"], [47, "Ag", "Silver", 11, 5, "dblock"], [48, "Cd", "Cadmium", 12, 5, "dblock"],
  [49, "In", "Indium", 13, 5, "post"], [50, "Sn", "Tin", 14, 5, "post"], [51, "Sb", "Antimony", 15, 5, "metalloid"],
  [52, "Te", "Tellurium", 16, 5, "metalloid"], [53, "I", "Iodine", 17, 5, "halogen"], [54, "Xe", "Xenon", 18, 5, "noble"],
  [55, "Cs", "Caesium", 1, 6, "alkali"], [56, "Ba", "Barium", 2, 6, "alkaline"], [57, "La", "Lanthanum", 3, 6, "dblock"],
  [72, "Hf", "Hafnium", 4, 6, "dblock"], [73, "Ta", "Tantalum", 5, 6, "dblock"], [74, "W", "Tungsten", 6, 6, "dblock"],
  [75, "Re", "Rhenium", 7, 6, "dblock"], [76, "Os", "Osmium", 8, 6, "dblock"], [77, "Ir", "Iridium", 9, 6, "dblock"],
  [78, "Pt", "Platinum", 10, 6, "dblock"], [79, "Au", "Gold", 11, 6, "dblock"], [80, "Hg", "Mercury", 12, 6, "dblock"],
  [81, "Tl", "Thallium", 13, 6, "post"], [82, "Pb", "Lead", 14, 6, "post"], [83, "Bi", "Bismuth", 15, 6, "post"],
  [84, "Po", "Polonium", 16, 6, "metalloid"], [85, "At", "Astatine", 17, 6, "halogen"], [86, "Rn", "Radon", 18, 6, "noble"],
];

export const ELEMENTS: Element[] = RAW.map(([z, s, name, g, p, fam]) => ({ z, s, name, g, p, fam }));
const BY_Z = new Map(ELEMENTS.map((e) => [e.z, e]));
export const elementByZ = (z: number) => BY_Z.get(z);

export type HuntWorld = 1 | 2 | 3;
export const HUNT_WORLDS: { id: HuntWorld; name: string; periods: number }[] = [
  { id: 1, name: "Periods 1 to 3", periods: 3 },
  { id: 2, name: "Periods 1 to 4", periods: 4 },
  { id: 3, name: "Periods 1 to 6", periods: 6 },
];

export function elementsForWorld(w: HuntWorld): Element[] {
  const periods = HUNT_WORLDS[w - 1].periods;
  return ELEMENTS.filter((e) => e.p <= periods);
}

const FAMILY_CLUE: { fam: Family; text: string; minWorld: HuntWorld }[] = [
  { fam: "noble", text: "a noble gas", minWorld: 1 },
  { fam: "halogen", text: "a halogen", minWorld: 1 },
  { fam: "alkali", text: "an alkali metal", minWorld: 1 },
  { fam: "alkaline", text: "an alkaline earth metal", minWorld: 1 },
  { fam: "metalloid", text: "a metalloid", minWorld: 1 },
  { fam: "dblock", text: "a d-block element", minWorld: 2 },
];

/**
 * Facts the exams ask, each naming every element that answers it. Checked by
 * two blind solvers before shipping (scripts/play/facts-check/).
 */
export const FACTS: { text: string; answers: number[] }[] = [
  { text: "The lightest element", answers: [1] },
  { text: "The most electronegative element", answers: [9] },
  { text: "The element with the highest first ionisation enthalpy", answers: [2] },
  { text: "The most abundant gas in air", answers: [7] },
  { text: "The most abundant element in the Earth's crust", answers: [8] },
  { text: "The most abundant metal in the Earth's crust", answers: [13] },
  { text: "Present in every organic compound", answers: [6] },
  { text: "The metal at the centre of chlorophyll", answers: [12] },
  { text: "The metal in haemoglobin", answers: [26] },
  { text: "The metal that is liquid at room temperature, used in thermometers", answers: [80] },
  { text: "A non-metal that is liquid at room temperature", answers: [35] },
  { text: "The best conductor of electricity of all metals", answers: [47] },
  { text: "The gas filled in balloons that will not catch fire", answers: [2] },
  { text: "The noble gas in red glowing advertising signs", answers: [10] },
  { text: "The radioactive noble gas in period 6", answers: [86] },
  { text: "Added to common salt to prevent goitre", answers: [53] },
  { text: "The main element in computer chips", answers: [14] },
  { text: "Coated on iron to galvanise it", answers: [30] },
  { text: "The largest atom in period 3, leaving out argon", answers: [11] },
  { text: "Kept under kerosene because it reacts with air and water", answers: [11, 19] },
  { text: "The metal in the filament of an electric bulb", answers: [74] },
];

export type Clue = { text: string; answers: number[]; kind: "name" | "number" | "place" | "family" | "fact" };

const pick = <T,>(rng: Rng, xs: readonly T[]): T => xs[Math.floor(rng() * xs.length)];

export function cluesForWorld(w: HuntWorld): Clue[] {
  const els = elementsForWorld(w);
  const inWorld = new Set(els.map((e) => e.z));
  const out: Clue[] = [];
  for (const e of els) {
    out.push({ text: e.name, answers: [e.z], kind: "name" });
    out.push({ text: `Atomic number ${e.z}`, answers: [e.z], kind: "number" });
    out.push({ text: `Group ${e.g}, period ${e.p}`, answers: [e.z], kind: "place" });
  }
  for (const f of FAMILY_CLUE) {
    if (f.minWorld > w) continue;
    const answers = els.filter((e) => e.fam === f.fam).map((e) => e.z);
    if (answers.length) out.push({ text: f.text, answers, kind: "family" });
  }
  for (const f of FACTS) {
    // A fact plays only where every answer is on the board.
    if (f.answers.every((z) => inWorld.has(z))) out.push({ text: f.text, answers: f.answers, kind: "fact" });
  }
  return out;
}

/** The next clue: a fact or family one time in three, never the same text twice in a row. */
export function nextClue(w: HuntWorld, rng: Rng, prev?: Clue): Clue {
  const all = cluesForWorld(w);
  const special = all.filter((c) => c.kind === "family" || c.kind === "fact");
  const plain = all.filter((c) => c.kind !== "family" && c.kind !== "fact");
  for (let i = 0; i < 20; i++) {
    const c = rng() < 0.33 ? pick(rng, special) : pick(rng, plain);
    if (c.text !== prev?.text) return c;
  }
  return pick(rng, plain);
}

// --- a round -----------------------------------------------------------------

export const HUNT_MS = 60_000;
export const WRONG_PENALTY_MS = 3000;

export type HuntState = {
  world: HuntWorld;
  clue: Clue;
  leftMs: number;
  score: number;
  combo: number;
  right: number;
  wrong: number;
  missed: { clue: string; answers: number[] }[];
  over: boolean;
};

export function huntMultiplier(k: number): number {
  return Math.min(5, 1 + Math.floor((Math.max(1, k) - 1) / 3));
}

export function startHunt(w: HuntWorld, rng: Rng): HuntState {
  return { world: w, clue: nextClue(w, rng), leftMs: HUNT_MS, score: 0, combo: 0, right: 0, wrong: 0, missed: [], over: false };
}

export function tickHunt(s: HuntState, dtMs: number): HuntState {
  if (s.over) return s;
  const leftMs = Math.max(0, s.leftMs - dtMs);
  return { ...s, leftMs, over: leftMs === 0 };
}

export function tapElement(s: HuntState, z: number, rng: Rng): { state: HuntState; right: boolean; points: number } {
  if (s.over) return { state: s, right: false, points: 0 };
  if (s.clue.answers.includes(z)) {
    const combo = s.combo + 1;
    const points = 10 * huntMultiplier(combo);
    return {
      state: { ...s, score: s.score + points, combo, right: s.right + 1, clue: nextClue(s.world, rng, s.clue) },
      right: true,
      points,
    };
  }
  const leftMs = Math.max(0, s.leftMs - WRONG_PENALTY_MS);
  return {
    state: {
      ...s,
      combo: 0,
      wrong: s.wrong + 1,
      leftMs,
      over: leftMs === 0,
      missed: [...s.missed, { clue: s.clue.text, answers: s.clue.answers }],
      clue: nextClue(s.world, rng, s.clue),
    },
    right: false,
    points: 0,
  };
}

// --- progress, kept in the browser ------------------------------------------

export const HUNT_KEY = "pyqv-element-hunt-v1";
/** A world's best score at or above this opens the next. A first guess. */
export const HUNT_TARGET = 250;
export type HuntProgress = { v: 1; best: Partial<Record<HuntWorld, number>> };

export function parseHuntProgress(raw: string | null): HuntProgress {
  const fresh: HuntProgress = { v: 1, best: {} };
  if (!raw) return fresh;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return fresh;
  }
  if (typeof o !== "object" || o === null) return fresh;
  const r = o as Record<string, unknown>;
  if (r.v !== 1 || typeof r.best !== "object" || r.best === null) return fresh;
  const best: HuntProgress["best"] = {};
  for (const [k, v] of Object.entries(r.best as Record<string, unknown>)) {
    const w = Number(k);
    if (w !== 1 && w !== 2 && w !== 3) continue;
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0) return fresh;
    best[w] = v;
  }
  return { v: 1, best };
}

export function serializeHuntProgress(p: HuntProgress): string {
  return JSON.stringify(p);
}

export function isHuntWorldOpen(p: HuntProgress, w: HuntWorld): boolean {
  return w === 1 || (p.best[(w - 1) as HuntWorld] ?? 0) >= HUNT_TARGET;
}

export function recordHunt(p: HuntProgress, w: HuntWorld, score: number): { progress: HuntProgress; newBest: boolean; opened: HuntWorld | null } {
  const newBest = score > (p.best[w] ?? 0);
  const progress: HuntProgress = newBest ? { v: 1, best: { ...p.best, [w]: score } } : p;
  const next = w < 3 ? ((w + 1) as HuntWorld) : null;
  const opened = next && !isHuntWorldOpen(p, next) && isHuntWorldOpen(progress, next) ? next : null;
  return { progress, newBest, opened };
}
