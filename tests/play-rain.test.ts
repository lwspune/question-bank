import { describe, it, expect } from "vitest";
import { seededRng } from "@/lib/play/generate";
import { LEVELS } from "@/lib/play/levels";
import {
  START_LIVES,
  FREEZE_MS,
  SPEED_UP_EVERY,
  WORLD_TARGET,
  GENTLE_BLASTS,
  GENTLE_SPEED,
  RAIN_STARS,
  EASY_FIRST_SUMS,
  rainStars,
  nextStarAt,
  fallSecondsFor,
  rainMultiplier,
  startRain,
  tick,
  typeAnswer,
  parseRainProgress,
  serializeRainProgress,
  recordRainScore,
  isWorldOpen,
  type RainState,
} from "@/lib/play/rain";

const rng = () => seededRng(7);

/** "43 + 25" or "78 − 35" with two-digit numbers and no carry or borrow in any column. */
function isNoCarry(prompt: string): boolean {
  const m = /^(\d+) ([+−]) (\d+)$/.exec(prompt);
  if (!m) return false;
  const a = Number(m[1]), b = Number(m[3]);
  if (a < 10 || a > 99 || b < 10 || b > 99) return false;
  const [at, au, bt, bu] = [Math.floor(a / 10), a % 10, Math.floor(b / 10), b % 10];
  return m[2] === "+" ? au + bu <= 9 && at + bt <= 9 : au >= bu && at > bt;
}

/** A state with the given drops on screen and no spawn due. */
function withDrops(s: RainState, drops: { prompt: string; answer: number; y: number; gold?: boolean }[]): RainState {
  return {
    ...s,
    sinceSpawn: 0,
    drops: drops.map((d, i) => ({ id: i + 1, x: 0.1 * (i + 1), gold: false, ...d })),
    nextId: drops.length + 1,
  };
}

describe("Number Rain: a fresh game", () => {
  it("starts with 3 lives, no score and an empty sky", () => {
    const s = startRain(1);
    expect(START_LIVES).toBe(3);
    expect(s.lives).toBe(3);
    expect(s.score).toBe(0);
    expect(s.drops).toEqual([]);
    expect(s.over).toBe(false);
  });

  it("the first tick drops a sum at once, and its answer is what the prompt equals", () => {
    const { state, events } = tick(startRain(2), 16, rng());
    expect(state.drops).toHaveLength(1);
    const d = state.drops[0];
    const [a, b] = d.prompt.split("×").map((x) => Number(x.trim()));
    expect(a * b).toBe(d.answer);
    expect(events.some((e) => e.type === "spawn")).toBe(true);
  });

  it("each world falls more slowly as its sums get harder", () => {
    for (let i = 1; i < LEVELS.length; i++) {
      expect(fallSecondsFor(LEVELS[i].id)).toBeGreaterThanOrEqual(fallSecondsFor(LEVELS[i - 1].id));
    }
  });
});

describe("falling", () => {
  it("a drop falls by its speed times the time passed", () => {
    const s = { ...withDrops(startRain(1), [{ prompt: "2 + 3", answer: 5, y: 0 }]), blasts: GENTLE_BLASTS };
    const { state } = tick(s, 1000, rng());
    expect(state.drops[0].y).toBeCloseTo(1 / fallSecondsFor(1), 5);
  });

  it("a drop that reaches the ground costs a life, ends the combo and is listed as missed", () => {
    const s = { ...withDrops(startRain(1), [{ prompt: "9 + 8", answer: 17, y: 0.999 }]), combo: 4 };
    const { state, events } = tick(s, 500, rng());
    expect(state.lives).toBe(2);
    expect(state.combo).toBe(0);
    expect(state.missed).toEqual([{ prompt: "9 + 8", answer: 17 }]);
    expect(state.drops.find((d) => d.prompt === "9 + 8")).toBeUndefined();
    expect(events.some((e) => e.type === "landed")).toBe(true);
  });

  it("the last life lost ends the game, and an ended game no longer moves", () => {
    const s = { ...withDrops(startRain(1), [{ prompt: "9 + 8", answer: 17, y: 0.999 }]), lives: 1 };
    const end = tick(s, 500, rng());
    expect(end.state.over).toBe(true);
    expect(end.events.some((e) => e.type === "over")).toBe(true);
    const after = tick(end.state, 5000, rng());
    expect(after.state).toBe(end.state);
  });

  it("never has two sums with the same answer on screen at once", () => {
    let s = startRain(1);
    const r = rng();
    for (let i = 0; i < 400; i++) {
      s = tick(s, 400, r).state;
      if (s.over) s = { ...s, over: false, lives: 3 };
      const answers = s.drops.map((d) => d.answer);
      expect(new Set(answers).size).toBe(answers.length);
    }
  });
});

describe("a gentle start (2026-11-23: 4 of 11 players scored under 150 and left)", () => {
  it("until the first few blasts, sums fall slower", () => {
    const s = withDrops(startRain(1), [{ prompt: "2 + 3", answer: 5, y: 0 }]);
    const { state } = tick(s, 1000, rng());
    expect(GENTLE_SPEED).toBeLessThan(1);
    expect(state.drops[0].y).toBeCloseTo(GENTLE_SPEED / fallSecondsFor(1), 5);
  });

  it("until then, one sum at a time: no new sum while one is falling", () => {
    const s = { ...withDrops(startRain(1), [{ prompt: "2 + 3", answer: 5, y: 0.1 }]), sinceSpawn: 99_999 };
    expect(tick(s, 16, rng()).state.drops).toHaveLength(1);
    const after = { ...s, blasts: GENTLE_BLASTS };
    expect(tick(after, 16, rng()).state.drops.length).toBeGreaterThan(1);
  });

  it("the blast that ends the gentle start says the rain is coming", () => {
    const s = { ...withDrops(startRain(1), [{ prompt: "7 + 5", answer: 12, y: 0.2 }]), blasts: GENTLE_BLASTS - 1 };
    const { events } = typeAnswer(s, "12", rng());
    expect(events.some((e) => e.type === "ramp")).toBe(true);
    const later = { ...s, blasts: GENTLE_BLASTS };
    expect(typeAnswer(later, "12", rng()).events.some((e) => e.type === "ramp")).toBe(false);
  });
});

describe("the two-digit worlds (2026-11-23: two strong players scored 0 to 80 in world 4)", () => {
  it("from world 4 a sum takes at least 15 s to fall", () => {
    for (const l of LEVELS) if (l.id >= 4) expect(fallSecondsFor(l.id)).toBeGreaterThanOrEqual(15);
  });

  it("from world 4 at most 4 sums are on screen until 10 blasts, then up to 6", () => {
    const four = [1, 2, 3, 4].map((i) => ({ prompt: `${10 + i} + 10`, answer: 20 + i, y: 0.1 }));
    const crowded = (blasts: number): RainState => ({ ...withDrops(startRain(4), four), blasts, sinceSpawn: 99_999 });
    expect(tick(crowded(GENTLE_BLASTS), 16, rng()).state.drops).toHaveLength(4);
    expect(tick(crowded(9), 16, rng()).state.drops).toHaveLength(4);
    expect(tick(crowded(10), 16, rng()).state.drops).toHaveLength(5);
    const world1 = { ...withDrops(startRain(1), four), blasts: GENTLE_BLASTS, sinceSpawn: 99_999 };
    expect(tick(world1, 16, rng()).state.drops).toHaveLength(5);
  });

  it("world 4's first sums need no carrying or borrowing", () => {
    for (let seed = 1; seed < 30; seed++) {
      let s: RainState = { ...startRain(4), blasts: 10 };
      const r = seededRng(seed);
      let checked = 0;
      for (let i = 0; i < 400 && checked < 12; i++) {
        const t = tick(s, 300, r);
        for (const e of t.events) {
          if (e.type !== "spawn") continue;
          checked++;
          if (e.drop.id <= EASY_FIRST_SUMS) expect(isNoCarry(e.drop.prompt), e.drop.prompt).toBe(true);
        }
        s = t.state.over ? { ...t.state, over: false, lives: 3 } : t.state;
      }
      expect(checked).toBeGreaterThan(EASY_FIRST_SUMS);
    }
  });
});

describe("stars per world", () => {
  it("1 star at the score that opens the next world, then 2 and 3", () => {
    expect(RAIN_STARS[0]).toBe(WORLD_TARGET);
    expect([0, 299, 300, 999, 1000, 1999, 2000, 9000].map(rainStars)).toEqual([0, 0, 1, 1, 2, 2, 3, 3]);
  });

  it("names the score for the next star, and none after the third", () => {
    expect(nextStarAt(0)).toBe(300);
    expect(nextStarAt(1500)).toBe(2000);
    expect(nextStarAt(2000)).toBeNull();
  });
});

describe("typing an answer", () => {
  const base = withDrops(startRain(1), [
    { prompt: "7 + 5", answer: 12, y: 0.2 },
    { prompt: "9 + 6", answer: 15, y: 0.6 },
  ]);

  it("the right answer blasts that sum and scores", () => {
    const { state, result } = typeAnswer(base, "15", rng());
    expect(result).toBe("blast");
    expect(state.drops.map((d) => d.answer)).toEqual([12]);
    expect(state.score).toBe(10);
    expect(state.blasts).toBe(1);
    expect(state.combo).toBe(1);
  });

  it("the start of an answer waits for more digits and changes nothing", () => {
    const { state, result } = typeAnswer(base, "1", rng());
    expect(result).toBe("partial");
    expect(state).toBe(base);
  });

  it("digits no sum on screen starts with are wrong and end the combo", () => {
    const { state, result } = typeAnswer({ ...base, combo: 5 }, "9", rng());
    expect(result).toBe("wrong");
    expect(state.combo).toBe(0);
    expect(state.drops).toHaveLength(2);
  });

  it("the combo pays more: blasts 1-3 x1, 4-6 x2, up to x5", () => {
    expect([1, 3, 4, 6, 7, 10, 13, 40].map(rainMultiplier)).toEqual([1, 1, 2, 2, 3, 4, 5, 5]);
    const s = { ...base, combo: 3 };
    expect(typeAnswer(s, "12", rng()).state.score).toBe(20);
  });

  it("every few blasts the rain speeds up and says so", () => {
    const s = { ...base, blasts: SPEED_UP_EVERY - 1 };
    const { state, events } = typeAnswer(s, "12", rng());
    expect(state.speedLevel).toBe(base.speedLevel + 1);
    expect(events.some((e) => e.type === "faster")).toBe(true);
  });
});

describe("gold drops", () => {
  it("a gold drop's power is a freeze or a blast of the whole sky", () => {
    const kinds = new Set<string>();
    for (let seed = 1; seed < 40; seed++) {
      const s = withDrops(startRain(1), [
        { prompt: "2 + 2", answer: 4, y: 0.5, gold: true },
        { prompt: "3 + 5", answer: 8, y: 0.3 },
        { prompt: "6 + 7", answer: 13, y: 0.1 },
      ]);
      const { state, events } = typeAnswer(s, "4", seededRng(seed));
      const power = events.find((e) => e.type === "power");
      expect(power).toBeDefined();
      if (power?.type === "power") {
        kinds.add(power.power);
        if (power.power === "freeze") {
          expect(state.frozenMs).toBe(FREEZE_MS);
          expect(state.drops).toHaveLength(2);
        } else {
          expect(state.drops).toHaveLength(0);
          expect(state.blasts).toBe(3);
        }
      }
    }
    expect(kinds).toEqual(new Set(["freeze", "bomb"]));
  });

  it("while frozen nothing falls and nothing new drops", () => {
    const s = { ...withDrops(startRain(1), [{ prompt: "2 + 3", answer: 5, y: 0.5 }]), frozenMs: FREEZE_MS, sinceSpawn: 99_999 };
    const { state } = tick(s, 1000, rng());
    expect(state.drops).toHaveLength(1);
    expect(state.drops[0].y).toBe(0.5);
    expect(state.frozenMs).toBe(FREEZE_MS - 1000);
  });
});

describe("worlds and best scores (kept in the browser)", () => {
  it("only world 1 is open at first; a world's target score opens the next", () => {
    const p = parseRainProgress(null);
    expect(isWorldOpen(p, 1)).toBe(true);
    expect(isWorldOpen(p, 2)).toBe(false);
    const r = recordRainScore(p, 1, WORLD_TARGET);
    expect(r.newBest).toBe(true);
    expect(r.opened).toBe(2);
    expect(isWorldOpen(r.progress, 2)).toBe(true);
  });

  it("keeps the best score per world, and a lower score is not a new best", () => {
    const p = recordRainScore(parseRainProgress(null), 1, 120).progress;
    const r = recordRainScore(p, 1, 80);
    expect(r.newBest).toBe(false);
    expect(r.progress.best[1]).toBe(120);
    expect(r.opened).toBeNull();
  });

  it("round-trips, and anything unreadable is a fresh start", () => {
    const p = recordRainScore(parseRainProgress(null), 3, 410).progress;
    expect(parseRainProgress(serializeRainProgress(p))).toEqual(p);
    expect(parseRainProgress("not json")).toEqual(parseRainProgress(null));
    expect(parseRainProgress('{"v":1,"best":{"1":-5}}')).toEqual(parseRainProgress(null));
  });
});
