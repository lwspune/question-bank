import { describe, it, expect } from "vitest";
import { seededRng } from "@/lib/play/generate";
import {
  BULLSEYE_KM,
  PLACES_PER_ROUND,
  lccForward,
  lccInverse,
  haversineKm,
  pinPoints,
  startPin,
  pinGuess,
  pinNext,
  pinTotal,
  parsePinProgress,
  serializePinProgress,
  recordPin,
} from "@/lib/play/pin";
import { PLACE_PACKS, LANDMARKS } from "@/lib/play/data/places";
import { INDIA_FRAME, INDIA_PATH } from "@/lib/play/data/indiaOutline.generated";

/** The outline's rings back in map kilometres (the SVG path's own frame). */
function rings(): [number, number][][] {
  return INDIA_PATH.split("Z")
    .filter(Boolean)
    .map((r) =>
      r
        .replace(/^M/, "")
        .split("L")
        .map((p) => p.split(" ").map(Number) as [number, number])
    );
}

function toMapKm(lat: number, lon: number): [number, number] {
  const { x, y } = lccForward(lat, lon);
  return [(x - INDIA_FRAME.minX) / 1000, (INDIA_FRAME.maxY - y) / 1000];
}

function inside([x, y]: [number, number], rs: [number, number][][]): boolean {
  let n = 0;
  for (const r of rs)
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [xi, yi] = r[i];
      const [xj, yj] = r[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) n++;
    }
  return n % 2 === 1;
}

function kmToEdge([x, y]: [number, number], rs: [number, number][][]): number {
  let best = Infinity;
  for (const r of rs)
    for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
      const [x1, y1] = r[j];
      const [x2, y2] = r[i];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const L2 = dx * dx + dy * dy || 1e-9;
      const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / L2));
      best = Math.min(best, Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)));
    }
  return best;
}

describe("Survey of India's projection", () => {
  it("puts the projection's origin at its false easting and northing", () => {
    const o = lccForward(24, 80);
    expect(o.x).toBeCloseTo(4_000_000, 3);
    expect(o.y).toBeCloseTo(4_000_000, 3);
  });

  it("goes there and back to within a metre", () => {
    for (const [lat, lon] of [[8.08, 77.54], [34.15, 77.58], [27.59, 91.86], [23.02, 70.22], [11.62, 92.73]]) {
      const { x, y } = lccForward(lat, lon);
      const back = lccInverse(x, y);
      expect(haversineKm(lat, lon, back.lat, back.lon)).toBeLessThan(0.001);
    }
  });
});

describe("the official outline", () => {
  const rs = rings();

  it("has India's full official boundary: Aksai Chin, Gilgit, Siachen and Tawang inside; Lahore, Kathmandu, Lhasa outside", () => {
    for (const [lat, lon] of [[35.0, 79.0], [35.92, 74.31], [35.4, 77.1], [27.59, 91.86], [34.37, 73.47]]) {
      expect(inside(toMapKm(lat, lon), rs), `${lat},${lon}`).toBe(true);
    }
    for (const [lat, lon] of [[31.55, 74.34], [27.71, 85.32], [29.65, 91.12], [6.93, 79.85]]) {
      expect(inside(toMapKm(lat, lon), rs), `${lat},${lon}`).toBe(false);
    }
  });

  it("keeps the island groups: Lakshadweep and the Andamans", () => {
    expect(kmToEdge(toMapKm(10.57, 72.64), rs)).toBeLessThan(5);
    expect(inside(toMapKm(11.62, 92.73), rs) || kmToEdge(toMapKm(11.62, 92.73), rs) < 3).toBe(true);
  });

  it("every place and landmark is on the map (inland ones inside, coastal ones within 8 km of the coast)", () => {
    const off: string[] = [];
    const all = [...PLACE_PACKS.flatMap((p) => p.places), ...LANDMARKS];
    for (const pl of all) {
      const pt = toMapKm(pl.lat, pl.lon);
      if (!inside(pt, rs) && kmToEdge(pt, rs) > 8) off.push(pl.name);
    }
    expect(off).toEqual([]);
  });
});

describe("places", () => {
  it("each pack has enough places for two different rounds, with no name twice", () => {
    for (const p of PLACE_PACKS) expect(p.places.length, p.name).toBeGreaterThanOrEqual(PLACES_PER_ROUND * 2);
    const names = PLACE_PACKS.flatMap((p) => p.places.map((x) => x.name));
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("scoring", () => {
  it("measures on the globe: Delhi to Mumbai is about 1,150 km", () => {
    expect(haversineKm(28.61, 77.21, 19.08, 72.88)).toBeGreaterThan(1130);
    expect(haversineKm(28.61, 77.21, 19.08, 72.88)).toBeLessThan(1170);
  });

  it("1,000 inside 25 km, nothing from 800 km, falling in between", () => {
    expect(pinPoints(0)).toBe(1000);
    expect(pinPoints(BULLSEYE_KM)).toBe(1000);
    expect(pinPoints(800)).toBe(0);
    expect(pinPoints(2000)).toBe(0);
    expect(pinPoints(412.5)).toBe(500);
  });

  it("a round is five places, one guess each, then over", () => {
    let s = startPin(PLACE_PACKS[0], seededRng(3));
    expect(s.places).toHaveLength(PLACES_PER_ROUND);
    for (let i = 0; i < PLACES_PER_ROUND; i++) {
      const pl = s.places[s.i];
      const g = pinGuess(s, pl.lat, pl.lon);
      expect(g.result?.points).toBe(1000);
      expect(pinGuess(g.state, 0, 0).result).toBeNull();
      s = pinNext(g.state);
    }
    expect(s.over).toBe(true);
    expect(pinTotal(s)).toBe(5000);
  });

  it("keeps the best per pack", () => {
    let p = recordPin(parsePinProgress(null), "parks", 3200);
    p = recordPin(p, "parks", 1000);
    expect(p.best.parks).toBe(3200);
    expect(parsePinProgress(serializePinProgress(p))).toEqual(p);
    expect(parsePinProgress('{"v":1,"best":{"parks":99999}}')).toEqual(parsePinProgress(null));
  });
});
