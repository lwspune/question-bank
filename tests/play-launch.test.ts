import { describe, it, expect } from "vitest";
import {
  G,
  ANGLE_MIN,
  ANGLE_MAX,
  SPEED_MIN,
  SPEED_MAX,
  LAUNCH_LEVELS,
  rangeOnFlat,
  maxHeight,
  simulateShot,
  starsFor,
  parseLaunchProgress,
  serializeLaunchProgress,
  recordLaunch,
  isLaunchOpen,
  type LaunchLevel,
} from "@/lib/play/launch";

/** A flat level with its target CENTRED on x. */
const flat = (x: number, w = 6): LaunchLevel => ({ id: 0, name: "t", launchHeight: 0, target: { x: x - w / 2, w, y: 0 }, walls: [], cliffs: [] });

describe("the physics students meet in the exam", () => {
  it("uses g = 10 m/s², the value in NDA and board papers", () => {
    expect(G).toBe(10);
  });

  it("on flat ground a shot lands at R = u²·sin2θ / g", () => {
    for (const [a, u] of [[30, 20], [45, 25], [60, 33], [15, 38]]) {
      const shot = simulateShot(flat(500), a, u);
      expect(shot.landX).toBeCloseTo(rangeOnFlat(a, u), 0);
    }
  });

  it("45° goes farthest, and angles that add to 90° land together", () => {
    expect(rangeOnFlat(45, 30)).toBeGreaterThan(rangeOnFlat(40, 30));
    expect(rangeOnFlat(45, 30)).toBeGreaterThan(rangeOnFlat(50, 30));
    expect(rangeOnFlat(30, 30)).toBeCloseTo(rangeOnFlat(60, 30), 6);
  });

  it("the highest point is u²·sin²θ / 2g, and the path reaches it", () => {
    const shot = simulateShot(flat(500), 60, 30);
    expect(shot.peak).toBeCloseTo(maxHeight(60, 30), 0);
    expect(maxHeight(60, 30)).toBeCloseTo((900 * 0.75) / 20, 6);
  });
});

describe("what a shot hits", () => {
  it("a shot landing on the target is a hit; otherwise it is short or long", () => {
    const L = flat(rangeOnFlat(45, 20));
    expect(simulateShot(L, 45, 20).outcome).toBe("hit");
    expect(simulateShot(L, 45, 15).outcome).toBe("short");
    expect(simulateShot(L, 45, 26).outcome).toBe("long");
  });

  it("a wall stops a low shot and a high shot clears it", () => {
    const L: LaunchLevel = { ...flat(rangeOnFlat(60, 30), 8), walls: [{ x: 42, w: 3, h: 22 }] };
    expect(simulateShot(L, 45, 28).outcome).toBe("wall");
    expect(simulateShot(L, 60, 30).outcome).toBe("hit");
  });

  it("landing on top of a cliff counts; hitting its face does not", () => {
    const L: LaunchLevel = { ...flat(0), target: { x: 75, w: 8, y: 16 }, cliffs: [{ x: 70, w: 32, h: 16 }] };
    expect(simulateShot(L, 50, 31.2).outcome).toBe("hit");
    expect(simulateShot(L, 15, 40).outcome).toBe("cliff");
  });

  it("from a tower the shot starts at the tower's height", () => {
    const L: LaunchLevel = { ...flat(500), launchHeight: 20 };
    const shot = simulateShot(L, 0.0001 + 45, 20);
    expect(shot.landX).toBeGreaterThan(rangeOnFlat(45, 20));
    expect(shot.path[0].y).toBe(20);
  });

  it("a hoop must be flown through before the target counts", () => {
    const L: LaunchLevel = { ...flat(rangeOnFlat(45, 25), 8), hoop: { x: 20, y: 40, r: 3 } };
    expect(simulateShot(L, 45, 25).outcome).toBe("hoop");
  });
});

describe("every level", () => {
  it("is numbered 1..N with at least 30 levels", () => {
    expect(LAUNCH_LEVELS.length).toBeGreaterThanOrEqual(30);
    LAUNCH_LEVELS.forEach((l, i) => expect(l.id).toBe(i + 1));
  });

  it("can be won with whole-number settings, and the default 45° · 25 m/s does not win it", () => {
    const bad: string[] = [];
    for (const L of LAUNCH_LEVELS) {
      let wins = 0;
      for (let a = ANGLE_MIN; a <= ANGLE_MAX; a++)
        for (let u = SPEED_MIN; u <= SPEED_MAX; u++) if (simulateShot(L, a, u).outcome === "hit") wins++;
      if (wins === 0) bad.push(`level ${L.id} ${L.name}: no winning setting`);
      if (simulateShot(L, 45, 25).outcome === "hit") bad.push(`level ${L.id} ${L.name}: won by the default`);
    }
    expect(bad).toEqual([]);
  });
});

describe("stars and progress", () => {
  it("first shot 3 stars, second 2, third 1", () => {
    expect([1, 2, 3].map(starsFor)).toEqual([3, 2, 1]);
  });

  it("winning a level opens the next and keeps the best stars", () => {
    let p = parseLaunchProgress(null);
    expect(isLaunchOpen(p, 1)).toBe(true);
    expect(isLaunchOpen(p, 2)).toBe(false);
    p = recordLaunch(p, 1, 2);
    expect(isLaunchOpen(p, 2)).toBe(true);
    p = recordLaunch(p, 1, 1);
    expect(p.stars[1]).toBe(2);
    expect(parseLaunchProgress(serializeLaunchProgress(p))).toEqual(p);
    expect(parseLaunchProgress('{"v":1,"stars":{"1":9}}')).toEqual(parseLaunchProgress(null));
  });
});
