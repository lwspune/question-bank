import { describe, expect, it } from "vitest";
import {
  AIR_WAVE_PX,
  BOUNDARY_X,
  SOUND,
  WATER_WAVE_PX,
  phaseAt,
  wavelengthM,
} from "../src/app/notes/_components/visualizations/SscSoundMedia";
import {
  GLYCOLYSIS_PRODUCT,
  NO_OXYGEN,
  OXYGEN_STEP,
  STAGES,
} from "../src/app/notes/_components/visualizations/SscRespirationStages";
import {
  DECAY_MODES,
  URANIUM_EXAMPLE,
  afterDecay,
  changeLabel,
} from "../src/app/notes/_components/visualizations/SscDecayModes";
import { PHYLLOTAXY, VENATION } from "../src/app/notes/_components/visualizations/SscLeafVenation";
import { OROGRAPHIC_SIDES, RAIN_TYPES } from "../src/app/notes/_components/visualizations/SscRainfallTypes";
import { STOMA_STATES, TRANSPIRATION } from "../src/app/notes/_components/visualizations/SscStomataTranspiration";
import {
  TRANSITION_STAGES,
  birthRate,
  deathRate,
  growthAt,
} from "../src/app/notes/_components/visualizations/SscDemographicTransition";
import { CAVE, CAVE_FORMS, ICE_FORMS, VALLEY } from "../src/app/notes/_components/visualizations/SscGlacialKarstLandforms";

// SSC CGL general-awareness notes figures, task gk (scripts/notes/CET_VISUALS_BRIEF.md).
// Each figure must show exactly what its concept states; the numbers are worked out here.

describe("sound from air into water (sscfsoso-waves)", () => {
  it("uses the self-check's numbers: 500 Hz, 340 m/s in air, 1,500 m/s in water", () => {
    expect(SOUND.frequencyHz as number).toBe(500);
    expect(SOUND.air.speed as number).toBe(340);
    expect(SOUND.water.speed as number).toBe(1500);
  });

  it("gives λ = v ÷ f: 0.68 m in air and 3 m in water", () => {
    expect(wavelengthM(SOUND.air.speed, SOUND.frequencyHz)).toBeCloseTo(0.68, 10);
    expect(wavelengthM(SOUND.water.speed, SOUND.frequencyHz)).toBeCloseTo(3, 10);
  });

  it("draws the water wavelength longer, in the true ratio 1,500 : 340", () => {
    expect(WATER_WAVE_PX).toBeGreaterThan(AIR_WAVE_PX);
    expect(WATER_WAVE_PX / AIR_WAVE_PX).toBeCloseTo(1500 / 340, 10);
    expect(WATER_WAVE_PX / AIR_WAVE_PX).toBeCloseTo(3 / 0.68, 10);
  });

  it("keeps the wave unbroken at the boundary (one frequency, no jump in phase)", () => {
    expect(phaseAt(BOUNDARY_X + 1e-9)).toBeCloseTo(phaseAt(BOUNDARY_X), 6);
    // a whole number of air cycles before the boundary, so the bracket and the wave line up
    expect(Number.isInteger(phaseAt(BOUNDARY_X))).toBe(true);
  });
});

describe("respiration: three steps by place (sscbcbpr-respiration)", () => {
  it("lists the concept's steps in order, each in its own place", () => {
    expect(STAGES.map((s) => [s.name, s.place])).toEqual([
      ["Glycolysis", "Cytoplasm"],
      ["Krebs cycle", "Mitochondrial matrix"],
      ["Electron transport chain", "Inner mitochondrial membrane"],
    ]);
  });

  it("carries the concept's ATP counts: net 2, about 2, about 32 to 34", () => {
    expect(STAGES.map((s) => s.atp)).toEqual(["net 2", "about 2", "about 32 to 34"]);
    expect(STAGES.map((s) => [s.atpLow, s.atpHigh])).toEqual([
      [2, 2],
      [2, 2],
      [32, 34],
    ]);
  });

  it("makes the electron transport chain the biggest step, more than the first two together", () => {
    const [gly, krebs, etc] = STAGES;
    expect(etc.atpLow).toBeGreaterThan(gly.atpHigh + krebs.atpHigh);
  });

  it("has glycolysis give pyruvic acid, oxygen become water, and yeast keep only 2 ATP", () => {
    expect(GLYCOLYSIS_PRODUCT).toBe("pyruvic acid");
    expect(OXYGEN_STEP).toEqual({ acceptor: "oxygen", becomes: "water" });
    expect(NO_OXYGEN.organism as string).toBe("yeast");
    expect(NO_OXYGEN.atp as number).toBe(STAGES[0].atpHigh);
  });
});

describe("radioactive decay (sscfmpmo-decay)", () => {
  it("shows exactly the concept's four modes and their changes in Z and A", () => {
    expect(DECAY_MODES.map((m) => [m.name, m.dZ, m.dA])).toEqual([
      ["Alpha", -2, -4],
      ["Beta-minus", 1, 0],
      ["Beta-plus", -1, 0],
      ["Gamma", 0, 0],
    ]);
  });

  it("does not give beta-plus the beta-minus change (the trap)", () => {
    const minus = DECAY_MODES.find((m) => m.name === "Beta-minus")!;
    const plus = DECAY_MODES.find((m) => m.name === "Beta-plus")!;
    expect(minus.dZ).toBe(1);
    expect(plus.dZ).toBe(-1);
    expect(minus.note).toBe("a neutron becomes a proton");
    expect(plus.note).toBe("a proton becomes a neutron");
  });

  it("works the self-check: uranium-238 (Z 92) after one alpha is Z 90, A 234", () => {
    const after = afterDecay(URANIUM_EXAMPLE.z, URANIUM_EXAMPLE.a, DECAY_MODES[0]);
    expect(after).toEqual({ z: 90, a: 234 });
    expect(URANIUM_EXAMPLE.daughter as string).toBe("thorium-234");
  });

  it("labels the changes with a true minus sign and leaves an unchanged number bare", () => {
    expect(changeLabel("Z", -2)).toBe("Z − 2");
    expect(changeLabel("A", -4)).toBe("A − 4");
    expect(changeLabel("Z", 1)).toBe("Z + 1");
    expect(changeLabel("A", 0)).toBe("A");
  });
});

describe("leaf venation and arrangement (sscbpbpl-form)", () => {
  it("pairs net veins with dicots and parallel veins with monocots, with the concept's plants", () => {
    expect(VENATION.map((v) => [v.name, v.group, [...v.examples]])).toEqual([
      ["Reticulate (net)", "dicots", ["tulsi", "coriander", "China rose"]],
      ["Parallel", "monocots", ["maize"]],
    ]);
  });

  it("names the three arrangements with the concept's plants", () => {
    expect(PHYLLOTAXY.map((p) => [p.name, [...p.examples]])).toEqual([
      ["Alternate", ["China rose", "mustard"]],
      ["Opposite", ["guava", "Calotropis"]],
      ["Whorled", ["Alstonia"]],
    ]);
  });

  it("draws one leaf a node for alternate, two for opposite, more than two for whorled", () => {
    for (const p of PHYLLOTAXY) {
      for (const node of p.angles) expect(node.length).toBe(p.leavesPerNode);
    }
    const [alt, opp, whorl] = PHYLLOTAXY;
    expect(alt.leavesPerNode as number).toBe(1);
    expect(opp.leavesPerNode as number).toBe(2);
    expect(whorl.leavesPerNode as number).toBeGreaterThan(2);
    // alternate leaves switch sides from node to node
    const sides = alt.angles.map((n) => (Math.cos((n[0] * Math.PI) / 180) > 0 ? "right" : "left"));
    expect(sides).toEqual(["right", "left", "right"]);
    // opposite leaves face each other at the same node
    for (const node of opp.angles) {
      expect(Math.sign(Math.cos((node[0] * Math.PI) / 180))).toBe(-Math.sign(Math.cos((node[1] * Math.PI) / 180)));
    }
  });
});

describe("kinds of rainfall (sscgclcl-rain)", () => {
  it("shows the concept's three kinds and why the air rises in each", () => {
    expect(RAIN_TYPES.map((r) => [r.name, r.whyAirRises])).toEqual([
      ["Convectional", "Heated by the ground"],
      ["Orographic", "Pushed up a mountain"],
      ["Frontal (cyclonic)", "Lifted over colder air"],
    ]);
  });

  it("puts the rain on the windward side and the rain shadow on the leeward side", () => {
    expect(OROGRAPHIC_SIDES.windward as string).toBe("rain");
    expect(OROGRAPHIC_SIDES.leeward as string).toBe("rain shadow");
  });
});

describe("stomata and transpiration (sscbpbpl-processes)", () => {
  it("opens the stoma when water flows into the guard cells and closes it when they lose water", () => {
    const [open, closed] = STOMA_STATES;
    expect(open.name).toBe("Stoma open");
    expect(open.water).toBe("in");
    expect(closed.name).toBe("Stoma closed");
    expect(closed.water).toBe("out");
  });

  it("draws the swollen guard cells bulging more, with a pore, and the closed pore shut", () => {
    const [open, closed] = STOMA_STATES;
    expect(open.bulge).toBeGreaterThan(closed.bulge);
    expect(open.gap).toBeGreaterThan(0);
    expect(closed.gap).toBe(0);
  });

  it("keeps the concept's transpiration facts", () => {
    expect(TRANSPIRATION).toEqual({
      fastestIn: "dry, windy weather",
      liftsSapBy: "cohesion-tension",
      wiltsWhen: "water loss is greater than uptake",
    });
  });
});

describe("demographic transition (sscgwhhu-transition)", () => {
  const mid = (stage: number) => stage + 0.5; // stage k (0-based) runs from t = k to k + 1

  it("has the concept's three stages with its births, deaths and growth", () => {
    expect(TRANSITION_STAGES.map((s) => [s.name, s.births, s.deaths, s.growth])).toEqual([
      ["First stage", "High", "High", "Slow"],
      ["Second stage", "High", "Falling fast", "Explosive"],
      ["Third stage", "Low", "Low", "Slow"],
    ]);
  });

  it("first stage: both rates high, a small gap", () => {
    expect(birthRate(mid(0))).toBeGreaterThan(0.7);
    expect(deathRate(mid(0))).toBeGreaterThan(0.7);
    expect(growthAt(mid(0))).toBeLessThan(0.1);
  });

  it("second stage: deaths fall fast while births stay high, the widest gap", () => {
    expect(deathRate(1.0)).toBeGreaterThan(0.7);
    expect(deathRate(1.6)).toBeLessThan(0.3);
    for (const t of [1.0, 1.5, 2.0]) expect(birthRate(t)).toBeGreaterThan(0.8);
    const widest = Math.max(...Array.from({ length: 301 }, (_, i) => growthAt(i / 100)));
    expect(growthAt(1.9)).toBeCloseTo(widest, 6);
    expect(growthAt(1.75)).toBeGreaterThan(5 * growthAt(mid(0)));
  });

  it("deaths fall first, births later", () => {
    const firstBelow = (f: (t: number) => number, level: number) => {
      for (let i = 0; i <= 300; i++) if (f(i / 100) < level) return i / 100;
      return Infinity;
    };
    expect(firstBelow(deathRate, 0.6)).toBeLessThan(firstBelow(birthRate, 0.6));
  });

  it("third stage: both rates low, a small gap again", () => {
    expect(birthRate(mid(2))).toBeLessThan(0.4);
    expect(deathRate(mid(2))).toBeLessThan(0.4);
    expect(growthAt(mid(2))).toBeLessThan(0.1);
    expect(growthAt(mid(2))).toBeGreaterThanOrEqual(0);
  });
});

describe("ice and limestone-cave landforms (sscgeslf-landforms)", () => {
  it("shows only the concept's ice forms and cave forms", () => {
    expect(ICE_FORMS.map((f) => f.name)).toEqual(["Hanging valley", "Truncated spur", "Till"]);
    expect(CAVE_FORMS.map((f) => [f.name, f.fact])).toEqual([
      ["Stalactite", "hangs down from the roof"],
      ["Stalagmite", "rises up from the floor"],
      ["Pillar", "the two meet"],
    ]);
    expect(ICE_FORMS.find((f) => f.name === "Till")!.fact).toBe("unsorted mix of clay, sand and boulders");
  });

  it("leaves the hanging valley's floor high above the main valley's floor", () => {
    expect(VALLEY.hangingFloorY as number).toBeLessThan(VALLEY.mainFloorY);
  });

  it("hangs the stalactite down from the roof and raises the stalagmite up from the floor, below it", () => {
    expect(CAVE.stalactiteTipY).toBeGreaterThan(CAVE.roofY);
    expect(CAVE.stalagmiteTipY).toBeLessThan(CAVE.floorY);
    expect(CAVE.stalactiteTipY).toBeLessThan(CAVE.stalagmiteTipY);
  });
});
