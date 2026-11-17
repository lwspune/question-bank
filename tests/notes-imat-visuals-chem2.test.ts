import { describe, expect, it } from "vitest";
import {
  AXIS_MAX,
  BOYLE,
  PV_CONST,
  V_RANGE,
  curvePoints,
  pressureAt,
} from "../src/app/notes/_components/visualizations/ImatBoyleCurve";
import {
  ABSOLUTE_ZERO_C,
  MARKED,
  MEASURED_FROM_C,
  SAMPLES,
  T_AXIS,
  toKelvin,
  volumeAt,
} from "../src/app/notes/_components/visualizations/ImatCharlesLine";
import { GEOM, WATER, meltingXAt, vapourXAt } from "../src/app/notes/_components/visualizations/ImatPhaseDiagram";
import {
  ANODE,
  BRIDGE_IONS,
  CATHODE,
  FLOWS,
  LAYOUT,
} from "../src/app/notes/_components/visualizations/ImatGalvanicCell";
import {
  GROUPS,
  LEFT,
  RIGHT,
  type Bond,
  handedness,
  mirror,
} from "../src/app/notes/_components/visualizations/ImatChiralityMirror";
import { ISOMERS, methylsSameSide } from "../src/app/notes/_components/visualizations/ImatCisTrans";
import {
  IE_ALUMINIUM,
  Y_MAX,
  electronsBeforeJump,
  groupFromOuterElectrons,
  steps,
} from "../src/app/notes/_components/visualizations/ImatIonisationJumps";

// Seven IMAT chemistry figures. Each draws its concept's own example, so the
// numbers, signs and directions are pinned here against the concept's text.

describe("imat-boyle-curve (concept imat-gas-boyle)", () => {
  it("draws the worked example: 60 cm³ at 100 kPa pushed to 24 cm³ gives 250 kPa", () => {
    expect(BOYLE).toEqual({ p1: 100, v1: 60, v2: 24 });
    expect(PV_CONST).toBe(6000);
    expect(pressureAt(BOYLE.v1)).toBe(100);
    expect(pressureAt(BOYLE.v2)).toBe(250);
    // the volume fell by a factor of 2.5 and the pressure rose by the same factor
    expect(BOYLE.v1 / BOYLE.v2).toBe(2.5);
    expect(pressureAt(BOYLE.v2) / BOYLE.p1).toBe(2.5);
  });

  it("keeps P × V the same at every point of the curve (inverse proportion)", () => {
    for (const pt of curvePoints()) expect(pt.p * pt.v).toBeCloseTo(6000, 9);
    expect(pressureAt(120)).toBe(pressureAt(60) / 2); // double V, half P
    expect(pressureAt(20)).toBe(3 * pressureAt(60)); // a third of V, three times P
  });

  it("lets the slider land on both marked volumes and keeps the curve inside the axes", () => {
    expect((BOYLE.v1 - V_RANGE.min) % V_RANGE.step).toBe(0);
    expect((BOYLE.v2 - V_RANGE.min) % V_RANGE.step).toBe(0);
    expect(pressureAt(V_RANGE.min)).toBeLessThanOrEqual(AXIS_MAX.p);
    expect(V_RANGE.max).toBeLessThanOrEqual(AXIS_MAX.v);
  });
});

describe("imat-charles-line (concept imat-gas-temperature-laws)", () => {
  const [a, b] = SAMPLES;

  it("draws the self-check: 500 cm³ at 7 °C becomes 625 cm³ at 77 °C", () => {
    expect([a.v0, a.t0C]).toEqual([500, 7]);
    expect(toKelvin(7)).toBe(280);
    expect(toKelvin(77)).toBe(350);
    expect(volumeAt(a, 77)).toBeCloseTo(625, 9);
    for (const m of MARKED) expect(volumeAt(a, m.tC)).toBeCloseTo(m.v, 9);
  });

  it("meets zero volume at −273 °C, which is 0 K, for both samples", () => {
    expect(ABSOLUTE_ZERO_C).toBe(-273);
    expect(toKelvin(ABSOLUTE_ZERO_C)).toBe(0);
    for (const s of SAMPLES) expect(volumeAt(s, ABSOLUTE_ZERO_C)).toBeCloseTo(0, 9);
    expect(T_AXIS.min).toBeLessThan(ABSOLUTE_ZERO_C);
    expect(MEASURED_FROM_C).toBeGreaterThan(ABSOLUTE_ZERO_C); // the dashed part is the extension
  });

  it("keeps V/T constant in kelvin, with two different lines", () => {
    for (const s of SAMPLES) {
      const k = volumeAt(s, -50) / toKelvin(-50);
      expect(volumeAt(s, 0) / toKelvin(0)).toBeCloseTo(k, 9);
      expect(volumeAt(s, 100) / toKelvin(100)).toBeCloseTo(k, 9);
    }
    expect(volumeAt(a, 100)).toBeGreaterThan(volumeAt(b, 100));
  });

  it("shows the caption's trap: the volume ratio is the kelvin ratio, not the Celsius one", () => {
    expect(625 / 500).toBe(1.25);
    expect(350 / 280).toBe(1.25);
    expect(77 / 7).toBe(11);
  });
});

describe("imat-phase-diagram (concept imat-gas-phase-diagram)", () => {
  const { triple, critical, meltTop, subEnd, oneAtmY } = GEOM;

  it("uses the concept's values for water", () => {
    expect(WATER).toEqual({
      triple: { tC: 0.01, atm: 0.006 },
      critical: { tC: 374, atm: 218 },
      normalMeltingC: 0,
      normalBoilingC: 100,
    });
  });

  it("leans the solid to liquid line LEFT: more pressure, lower melting point", () => {
    expect(meltTop.y).toBeLessThan(triple.y); // higher up = higher pressure
    expect(meltTop.x).toBeLessThan(triple.x); // and lower temperature
    // so at 1 atm it melts just below the triple-point temperature: 0 °C < 0.01 °C
    expect(meltingXAt(oneAtmY)).toBeLessThan(triple.x);
  });

  it("puts the triple point below 1 atm and the critical point above it", () => {
    expect(WATER.triple.atm).toBeLessThan(1);
    expect(WATER.critical.atm).toBeGreaterThan(1);
    expect(triple.y).toBeGreaterThan(oneAtmY);
    expect(critical.y).toBeLessThan(oneAtmY);
  });

  it("orders the four temperatures as the numbers do: 0 °C < 0.01 °C < 100 °C < 374 °C", () => {
    const xs = [meltingXAt(oneAtmY), triple.x, vapourXAt(oneAtmY), critical.x];
    const ts = [WATER.normalMeltingC, WATER.triple.tC, WATER.normalBoilingC, WATER.critical.tC];
    for (let i = 1; i < 4; i++) {
      expect(xs[i]).toBeGreaterThan(xs[i - 1]);
      expect(ts[i]).toBeGreaterThan(ts[i - 1]);
    }
  });

  it("runs the vapour pressure curve from the triple point to the critical point, rising with temperature", () => {
    expect(vapourXAt(triple.y)).toBeCloseTo(triple.x, 6);
    expect(vapourXAt(critical.y)).toBeCloseTo(critical.x, 6);
    expect(vapourXAt(80)).toBeGreaterThan(vapourXAt(120)); // higher pressure, higher boiling point
    expect(subEnd.x).toBeLessThan(triple.x);
    expect(subEnd.y).toBeGreaterThan(triple.y);
  });
});

describe("imat-galvanic-cell (concept imat-rdx-cell-types)", () => {
  it("makes zinc the anode: oxidation, negative in a galvanic cell", () => {
    expect(ANODE).toMatchObject({ metal: "Zn", role: "anode", process: "oxidation", sign: "−" });
    expect(CATHODE).toMatchObject({ metal: "Cu", role: "cathode", process: "reduction", sign: "+" });
  });

  it("writes half-equations that release electrons at the anode and take them in at the cathode", () => {
    expect(ANODE.half).toBe("Zn → Zn²⁺ + 2e⁻");
    expect(CATHODE.half).toBe("Cu²⁺ + 2e⁻ → Cu");
    expect(ANODE.half.split("→")[1]).toContain("2e⁻");
    expect(CATHODE.half.split("→")[0]).toContain("2e⁻");
    expect(ANODE.electrons + CATHODE.electrons).toBe(0);
  });

  it("sends electrons through the wire from anode to cathode, drawn left to right", () => {
    expect(FLOWS.electronsInWire).toEqual({ from: "anode", to: "cathode" });
    expect(LAYOUT.anodeX).toBeLessThan(LAYOUT.cathodeX);
  });

  it("moves positive bridge ions to the cathode and negative ones to the anode", () => {
    expect(FLOWS.bridgeCations.towards).toBe("cathode");
    expect(FLOWS.bridgeAnions.towards).toBe("anode");
    expect(BRIDGE_IONS.cation).toContain("⁺");
    expect(BRIDGE_IONS.anion).toContain("⁻");
  });
});

describe("imat-chirality-mirror (concept imat-org-chirality)", () => {
  it("puts four different groups on the carbon of butan-2-ol", () => {
    expect([...GROUPS].sort()).toEqual(["C₂H₅", "CH₃", "H", "OH"].sort());
    expect(new Set(LEFT.map((b) => b.group))).toEqual(new Set(GROUPS));
    expect(LEFT.filter((b) => b.depth === "wedge")).toHaveLength(1);
    expect(LEFT.filter((b) => b.depth === "dash")).toHaveLength(1);
  });

  it("draws the right molecule as the left one's reflection", () => {
    expect(RIGHT).toEqual(mirror(LEFT));
    LEFT.forEach((b, i) => {
      expect(RIGHT[i].dx).toBe(-b.dx);
      expect(RIGHT[i].dy).toBe(b.dy);
      expect(RIGHT[i].depth).toBe(b.depth);
    });
  });

  it("gives the two mirror images opposite handedness, which no rotation can change", () => {
    const h = handedness(LEFT);
    expect(h).not.toBe(0);
    expect(handedness(RIGHT)).toBe(-h);
    // Turn the left molecule half a turn in the page: same handedness.
    const spun: Bond[] = LEFT.map((b) => ({ ...b, dx: -b.dx, dy: -b.dy }));
    expect(handedness(spun)).toBe(h);
    // Turn it round to face the other way: front and back swap, still the same handedness.
    const swap = { wedge: "dash", dash: "wedge", plane: "plane" } as const;
    const turned: Bond[] = LEFT.map((b) => ({ ...b, dx: -b.dx, depth: swap[b.depth] }));
    expect(handedness(turned)).toBe(h);
    expect(handedness(turned)).not.toBe(handedness(RIGHT)); // so it is not superimposable
  });
});

describe("imat-cis-trans (concept imat-org-cis-trans)", () => {
  const [cis, trans] = ISOMERS;

  it("draws cis- and trans-but-2-ene with the same atoms", () => {
    expect([cis.name, trans.name]).toEqual(["cis-but-2-ene", "trans-but-2-ene"]);
    for (const iso of ISOMERS) expect(Object.values(iso.slots).sort()).toEqual(["CH₃", "CH₃", "H", "H"]);
  });

  it("has two different groups on each carbon of the C=C", () => {
    for (const { slots } of ISOMERS) {
      expect(slots.upLeft).not.toBe(slots.downLeft);
      expect(slots.upRight).not.toBe(slots.downRight);
    }
  });

  it("puts the CH₃ groups on the same side in cis and on opposite sides in trans", () => {
    expect(methylsSameSide(cis.slots)).toBe(true);
    expect(methylsSameSide(trans.slots)).toBe(false);
  });

  it("gives them different boiling points (cis 3.7 °C, trans 0.9 °C)", () => {
    expect(cis.boilingPointC).toBe(3.7);
    expect(trans.boilingPointC).toBe(0.9);
    expect(Math.round(cis.boilingPointC)).toBe(4);
    expect(Math.round(trans.boilingPointC)).toBe(1);
  });
});

describe("imat-ionisation-jumps (concept imat-ptb-ionisation-energy)", () => {
  it("draws the worked example's values for aluminium, kJ/mol", () => {
    expect([...IE_ALUMINIUM]).toEqual([578, 1817, 2745, 11577]);
    expect(Y_MAX).toBeGreaterThanOrEqual(Math.max(...IE_ALUMINIUM)); // one linear axis holds every bar
  });

  it("shows the worked example's rises, every one positive", () => {
    expect(steps(IE_ALUMINIUM)).toEqual([1239, 928, 8832]);
    for (const s of steps(IE_ALUMINIUM)) expect(s).toBeGreaterThan(0);
    expect(IE_ALUMINIUM[3] / IE_ALUMINIUM[2]).toBeGreaterThan(4); // "over four times the third"
  });

  it("finds the big jump after the 3rd electron: group 13", () => {
    expect(electronsBeforeJump(IE_ALUMINIUM)).toBe(3);
    expect(groupFromOuterElectrons(3)).toBe(13);
  });

  it("reads a group 2 element the way the practice set does (jump between the 2nd and 3rd)", () => {
    const magnesium = [738, 1451, 7733]; // kJ/mol
    expect(electronsBeforeJump(magnesium)).toBe(2);
    expect(groupFromOuterElectrons(2)).toBe(2);
  });
});
