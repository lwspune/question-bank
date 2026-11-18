import type { Rng } from "./generate";

/**
 * Pin It (2026-11-18), the /play Geography game: "Where is Kaziranga?" Tap
 * the India map; the closer the pin, the more points. The map is Survey of
 * India's official outline (scripts/play/build-india-map.ts), drawn in SoI's
 * own projection, so places go onto it through the same Lambert Conformal
 * Conic and a tap comes back through its inverse. Distances are on the globe
 * (haversine), never on the flat map. Pure.
 */

// Survey of India's projection for Outline_of_India (its .prj), WGS 84.
const A = 6378137.0;
const F = 1 / 298.257223563;
const E = Math.sqrt(2 * F - F * F);
const LAT0 = 24;
const LON0 = 80;
const P1 = 12.472944;
const P2 = 35.172806;
const FE = 4_000_000;
const FN = 4_000_000;

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const m = (ph: number) => Math.cos(ph) / Math.sqrt(1 - (E * Math.sin(ph)) ** 2);
const t = (ph: number) => Math.tan(Math.PI / 4 - ph / 2) / ((1 - E * Math.sin(ph)) / (1 + E * Math.sin(ph))) ** (E / 2);
const N = (Math.log(m(rad(P1))) - Math.log(m(rad(P2)))) / (Math.log(t(rad(P1))) - Math.log(t(rad(P2))));
const FF = m(rad(P1)) / (N * t(rad(P1)) ** N);
const R0 = A * FF * t(rad(LAT0)) ** N;

/** Latitude/longitude to SoI map metres. */
export function lccForward(lat: number, lon: number): { x: number; y: number } {
  const r = A * FF * t(rad(lat)) ** N;
  const th = N * rad(lon - LON0);
  return { x: FE + r * Math.sin(th), y: FN + R0 - r * Math.cos(th) };
}

/** SoI map metres back to latitude/longitude. */
export function lccInverse(x: number, y: number): { lat: number; lon: number } {
  const dx = x - FE;
  const dy = R0 - (y - FN);
  const r = Math.sign(N) * Math.hypot(dx, dy);
  const tt = (r / (A * FF)) ** (1 / N);
  const th = Math.atan2(dx, dy);
  let ph = Math.PI / 2 - 2 * Math.atan(tt);
  for (let i = 0; i < 8; i++) {
    const es = E * Math.sin(ph);
    ph = Math.PI / 2 - 2 * Math.atan(tt * ((1 - es) / (1 + es)) ** (E / 2));
  }
  return { lat: deg(ph), lon: LON0 + deg(th / N) };
}

export function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dl = rad(lat2 - lat1);
  const dn = rad(lon2 - lon1);
  const h = Math.sin(dl / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** 1,000 points within 25 km, falling to 0 at 800 km. */
export const BULLSEYE_KM = 25;
export function pinPoints(km: number): number {
  if (km <= BULLSEYE_KM) return 1000;
  return Math.round(1000 * Math.max(0, 1 - (km - BULLSEYE_KM) / (800 - BULLSEYE_KM)));
}

export type Place = { name: string; state: string; lat: number; lon: number };
export type PlacePack = { id: string; name: string; places: Place[] };

export const PLACES_PER_ROUND = 5;

export type PinResult = { place: Place; km: number; points: number; guess: { lat: number; lon: number } };
export type PinState = { packId: string; places: Place[]; i: number; results: PinResult[]; over: boolean };

export function startPin(p: PlacePack, rng: Rng): PinState {
  const a = [...p.places];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return { packId: p.id, places: a.slice(0, PLACES_PER_ROUND), i: 0, results: [], over: false };
}

export function pinGuess(s: PinState, lat: number, lon: number): { state: PinState; result: PinResult | null } {
  if (s.over || s.results.length > s.i) return { state: s, result: null };
  const place = s.places[s.i];
  const km = haversineKm(lat, lon, place.lat, place.lon);
  const result: PinResult = { place, km, points: pinPoints(km), guess: { lat, lon } };
  return { state: { ...s, results: [...s.results, result] }, result };
}

/** After a guess: the next place, or the end of the round. */
export function pinNext(s: PinState): PinState {
  if (s.results.length <= s.i) return s;
  const i = s.i + 1;
  return { ...s, i, over: i >= s.places.length };
}

export const pinTotal = (s: PinState) => s.results.reduce((n, r) => n + r.points, 0);

// --- best per pack, kept in the browser -------------------------------------

export const PIN_KEY = "pyqv-pin-it-v1";
export type PinProgress = { v: 1; best: Record<string, number> };

export function parsePinProgress(raw: string | null): PinProgress {
  const fresh: PinProgress = { v: 1, best: {} };
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
  const best: Record<string, number> = {};
  for (const [k, v] of Object.entries(r.best as Record<string, unknown>)) {
    if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v > PLACES_PER_ROUND * 1000) return fresh;
    best[k] = v;
  }
  return { v: 1, best };
}

export function serializePinProgress(p: PinProgress): string {
  return JSON.stringify(p);
}

export function recordPin(p: PinProgress, packId: string, score: number): PinProgress {
  if ((p.best[packId] ?? 0) >= score) return p;
  return { v: 1, best: { ...p.best, [packId]: score } };
}
