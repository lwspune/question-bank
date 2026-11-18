import { describe, it, expect } from "vitest";
import { seededRng } from "@/lib/play/generate";
import {
  ELEMENTS,
  FACTS,
  HUNT_MS,
  HUNT_TARGET,
  WRONG_PENALTY_MS,
  elementByZ,
  elementsForWorld,
  cluesForWorld,
  nextClue,
  startHunt,
  tickHunt,
  tapElement,
  huntMultiplier,
  parseHuntProgress,
  serializeHuntProgress,
  recordHunt,
  isHuntWorldOpen,
} from "@/lib/play/elements";

describe("the table", () => {
  it("has elements 1-57 and 72-86, each once, with no two in one cell", () => {
    const zs = ELEMENTS.map((e) => e.z);
    const want = [...Array.from({ length: 57 }, (_, i) => i + 1), ...Array.from({ length: 15 }, (_, i) => 72 + i)];
    expect(zs).toEqual(want);
    expect(new Set(ELEMENTS.map((e) => `${e.g}-${e.p}`)).size).toBe(ELEMENTS.length);
    expect(new Set(ELEMENTS.map((e) => e.s)).size).toBe(ELEMENTS.length);
  });

  it("places well-known elements where every table does", () => {
    const at = (s: string) => ELEMENTS.find((e) => e.s === s)!;
    expect([at("Fe").g, at("Fe").p, at("Fe").z]).toEqual([8, 4, 26]);
    expect([at("Au").g, at("Au").p, at("Au").z]).toEqual([11, 6, 79]);
    expect([at("Hg").g, at("Hg").z]).toEqual([12, 80]);
    expect([at("Cs").g, at("Cs").p]).toEqual([1, 6]);
    expect([at("Hf").g, at("Hf").z]).toEqual([4, 72]);
    expect(at("S").name).toBe("Sulphur");
    expect(at("Al").name).toBe("Aluminium");
  });

  it("each period fills from group 1 to 18 with the right counts", () => {
    const count = (p: number) => ELEMENTS.filter((e) => e.p === p).length;
    expect([1, 2, 3, 4, 5, 6].map(count)).toEqual([2, 8, 8, 18, 18, 18]);
    for (const e of ELEMENTS) {
      if (e.g === 18) expect(e.fam, e.name).toBe("noble");
      if (e.g === 17) expect(e.fam, e.name).toBe("halogen");
      if (e.g >= 3 && e.g <= 12) expect(e.fam, e.name).toBe("dblock");
    }
  });

  it("the metalloids are NCERT Class 10's seven", () => {
    expect(ELEMENTS.filter((e) => e.fam === "metalloid").map((e) => e.s).sort()).toEqual(["As", "B", "Ge", "Po", "Sb", "Si", "Te"].sort());
  });

  it("worlds grow: periods 1-3, then 1-4, then 1-6", () => {
    expect([1, 2, 3].map((w) => elementsForWorld(w as 1 | 2 | 3).length)).toEqual([18, 36, 72]);
  });
});

describe("clues", () => {
  it("every clue in a world is answered by elements on that world's board", () => {
    for (const w of [1, 2, 3] as const) {
      const on = new Set(elementsForWorld(w).map((e) => e.z));
      for (const c of cluesForWorld(w)) {
        expect(c.answers.length, c.text).toBeGreaterThan(0);
        for (const z of c.answers) expect(on.has(z), `${c.text} in world ${w}`).toBe(true);
      }
    }
  });

  it("a family clue names every member on the board", () => {
    const c = cluesForWorld(1).find((x) => x.text === "a noble gas")!;
    expect(c.answers.sort((a, b) => a - b)).toEqual([2, 10, 18]);
  });

  it("every fact names real elements, and a fact waits for a world that shows all its answers", () => {
    for (const f of FACTS) for (const z of f.answers) expect(elementByZ(z), f.text).toBeDefined();
    expect(cluesForWorld(1).some((c) => c.text.includes("liquid at room temperature"))).toBe(false);
    expect(cluesForWorld(3).some((c) => c.text.includes("metal that is liquid"))).toBe(true);
  });

  it("never gives the same clue twice in a row", () => {
    const rng = seededRng(3);
    let prev = nextClue(2, rng);
    for (let i = 0; i < 300; i++) {
      const c = nextClue(2, rng, prev);
      expect(c.text).not.toBe(prev.text);
      prev = c;
    }
  });
});

describe("a round", () => {
  it("lasts 60 seconds and ends when the time runs out", () => {
    const s = startHunt(1, seededRng(1));
    expect(s.leftMs).toBe(HUNT_MS);
    const end = tickHunt(s, HUNT_MS + 50);
    expect(end.over).toBe(true);
    expect(tickHunt(end, 100)).toBe(end);
  });

  it("a right tap scores with the combo and moves to a new clue", () => {
    const s = startHunt(1, seededRng(2));
    const z = s.clue.answers[0];
    const r = tapElement({ ...s, combo: 3 }, z, seededRng(5));
    expect(r.right).toBe(true);
    expect(r.points).toBe(10 * huntMultiplier(4));
    expect(r.state.right).toBe(1);
    expect(r.state.clue.text).not.toBe(s.clue.text);
  });

  it("a wrong tap costs 3 seconds, ends the combo and keeps the clue to look at later", () => {
    const s = { ...startHunt(1, seededRng(2)), combo: 4 };
    const wrongZ = elementsForWorld(1).find((e) => !s.clue.answers.includes(e.z))!.z;
    const r = tapElement(s, wrongZ, seededRng(5));
    expect(r.right).toBe(false);
    expect(r.state.leftMs).toBe(HUNT_MS - WRONG_PENALTY_MS);
    expect(r.state.combo).toBe(0);
    expect(r.state.missed).toEqual([{ clue: s.clue.text, answers: s.clue.answers }]);
  });
});

describe("worlds and best scores", () => {
  it("a world's target opens the next and the best is kept", () => {
    const p0 = parseHuntProgress(null);
    expect(isHuntWorldOpen(p0, 2)).toBe(false);
    const r = recordHunt(p0, 1, HUNT_TARGET);
    expect(r.opened).toBe(2);
    expect(recordHunt(r.progress, 1, 10).newBest).toBe(false);
    expect(parseHuntProgress(serializeHuntProgress(r.progress))).toEqual(r.progress);
    expect(parseHuntProgress("[")).toEqual(p0);
  });
});
