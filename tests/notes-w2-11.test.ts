import { describe, expect, it } from "vitest";
import { PANELS, SIDES, iC, osmosisTowards } from "../src/app/notes/_components/visualizations/JeeOsmosisDirection";
import { PLATE, SOLVENT_FRONT, SPOTS, elutesFirst, morePolar, rf, yAt } from "../src/app/notes/_components/visualizations/JeeTlcRf";
import {
  CHARGE_BALANCE,
  ELECTRODES,
  ELECTRONS_PER_GAS,
  NOT_DEPOSITED,
  OH_PER_ELECTRON,
} from "../src/app/notes/_components/visualizations/JeeBrineElectrolysis";
import { BONDS, MOLECULES, bondArrow, lonePairArrow, nAt } from "../src/app/notes/_components/visualizations/JeeNh3Nf3Dipoles";
import {
  G_CURVE,
  LINE,
  POINTS,
  TRIANGLE,
  deltaH,
  deltaS,
  equilibriumExtent,
  gibbs,
  gibbsSlope,
  logK,
  twoPointThreeR,
} from "../src/app/notes/_components/visualizations/JeeGibbsGraphs";
import { ENERGY_GAP } from "../src/app/notes/_components/visualizations/NeetEthaneConformations";
import { ALKANES_HC_NOTE } from "../src/app/notes/jee-mains-chemistry/hydrocarbons/_data/alkanes";

describe("jee-osmosis-direction (jcsol-osmosis-direction)", () => {
  it("uses the self-check's solutions: glucose iC 0.15 M, NaCl iC 0.2 M", () => {
    expect(SIDES.glucose.molarity).toBe(0.15);
    expect(SIDES.nacl.molarity).toBe(0.1);
    expect(SIDES.nacl.i).toBe(2);
    expect(iC("glucose")).toBe(0.15);
    expect(iC("nacl")).toBe(0.2);
  });

  it("osmosis carries water towards the higher iC (NaCl), whose level rises", () => {
    expect(osmosisTowards()).toBe("nacl");
    const osm = PANELS[0];
    expect(osm.id).toBe("osmosis");
    expect(osm.flowTo).toBe(osmosisTowards());
    expect(osm.pressureOn).toBeNull();
    expect(osm.levels.nacl).toBeLessThan(osm.levels.glucose); // smaller y = higher
  });

  it("reverse osmosis pushes on the concentrated side and sends water back", () => {
    const ro = PANELS[1];
    expect(ro.id).toBe("reverse");
    expect(ro.pressureOn).toBe(osmosisTowards());
    expect(ro.flowTo).toBe("glucose");
    expect(ro.levels.glucose).toBeLessThan(ro.levels.nacl);
  });
});

describe("jee-tlc-rf (jcgoc-rf)", () => {
  it("draws the worked example: front 8.0 cm, A 3.2 cm, B 6.0 cm", () => {
    expect(SOLVENT_FRONT).toBe(8.0);
    expect(SPOTS.map((s) => [s.id, s.distance])).toEqual([
      ["A", 3.2],
      ["B", 6.0],
    ]);
  });

  it("Rf(A) = 0.40, Rf(B) = 0.75, both between 0 and 1", () => {
    expect(rf(3.2)).toBe(0.4);
    expect(rf(6.0)).toBe(0.75);
    for (const s of SPOTS) {
      expect(rf(s.distance)).toBeGreaterThan(0);
      expect(rf(s.distance)).toBeLessThan(1);
    }
  });

  it("A is the more polar; B elutes first", () => {
    expect(morePolar()).toBe("A");
    expect(elutesFirst()).toBe("B");
  });

  it("measures from the base line, which sits above the bottom edge", () => {
    expect(yAt(0)).toBe(PLATE.baseline);
    expect(PLATE.baseline).toBeLessThan(PLATE.bottom);
    expect(yAt(SOLVENT_FRONT)).toBeGreaterThan(PLATE.top);
  });
});

describe("jee-brine-electrolysis (jcelec-products)", () => {
  it("matches the concept's brine row: Cl₂ at the anode, H₂ with OH⁻ at the cathode", () => {
    expect(ELECTRODES.anode.product).toBe("Cl₂");
    expect(ELECTRODES.cathode.product).toBe("H₂");
    expect(ELECTRODES.cathode.half).toBe("2H₂O + 2e⁻ → H₂ + 2OH⁻");
    expect(ELECTRODES.anode.half).toBe("2Cl⁻ → Cl₂ + 2e⁻");
    expect(NOT_DEPOSITED).toBe("Na⁺");
  });

  it("anode is +, oxidation; cathode is −, reduction", () => {
    expect(ELECTRODES.anode.sign).toBe("+");
    expect(ELECTRODES.anode.process).toBe("oxidation");
    expect(ELECTRODES.cathode.sign).toBe("−");
    expect(ELECTRODES.cathode.process).toBe("reduction");
  });

  it("half-equations balance in charge, with 2 electrons per gas molecule", () => {
    expect(CHARGE_BALANCE.anode.left).toBe(CHARGE_BALANCE.anode.right);
    expect(CHARGE_BALANCE.cathode.left).toBe(CHARGE_BALANCE.cathode.right);
    expect(ELECTRONS_PER_GAS["Cl₂"]).toBe(2);
    expect(ELECTRONS_PER_GAS["H₂"]).toBe(2);
  });

  it("one OH⁻ per electron reproduces the concept's self-check (pH 13, 500 mL, 965 s gives 5 A)", () => {
    const molOH = 0.1 * 0.5;
    const faradays = molOH / OH_PER_ELECTRON;
    const q = faradays * 96500;
    expect(q).toBeCloseTo(4825, 6);
    expect(q / 965).toBeCloseTo(5, 9);
  });
});

describe("jee-nh3-nf3-dipoles (jcbond-dipole-direction)", () => {
  const mu = (id: string) => MOLECULES.find((m) => m.id === id)!.mu as number;

  it("uses the concept's values: NH₃ 1.47 D > NF₃ 0.23 D", () => {
    expect(mu("NH3")).toBe(1.47);
    expect(mu("NF3")).toBe(0.23);
    expect(mu("NH3")).toBeGreaterThan(mu("NF3"));
  });

  it("N–H moments point towards N, N–F moments away from N", () => {
    for (const id of ["NH3", "NF3"] as const) {
      const n = nAt(id);
      for (let k = 0; k < BONDS.length; k++) {
        const a = bondArrow(id, k);
        const dHead = Math.hypot(a.head.x - n.x, a.head.y - n.y);
        const dTail = Math.hypot(a.tail.x - n.x, a.tail.y - n.y);
        if (id === "NH3") expect(dHead).toBeLessThan(dTail);
        else expect(dHead).toBeGreaterThan(dTail);
      }
    }
  });

  it("bond moments add to the lone-pair moment in NH₃ and oppose it in NF₃", () => {
    const lp = lonePairArrow("NH3");
    expect(lp.head.y).toBeLessThan(lp.tail.y); // up, into the lone pair
    for (let k = 0; k < BONDS.length; k++) {
      const h = bondArrow("NH3", k);
      expect(h.head.y).toBeLessThan(h.tail.y);
      const f = bondArrow("NF3", k);
      expect(f.head.y).toBeGreaterThan(f.tail.y);
    }
  });

  it("each arrow sits beside its bond (offset perpendicular to it)", () => {
    for (const b of BONDS) {
      const dot = (b.dx * b.off.x + b.dy * b.off.y) / Math.hypot(b.dx, b.dy);
      expect(Math.abs(dot)).toBeLessThan(0.05);
    }
  });
});

describe("jee-gibbs-graphs (jcthermo-g-graphs)", () => {
  it("draws the worked example's line: slope −2000 K, intercept 3.0", () => {
    expect(LINE.slopeK).toBe(-2000);
    expect(LINE.intercept).toBe(3.0);
    expect(logK(0)).toBe(3);
    expect(logK(1.5)).toBeCloseTo(0, 12);
    expect(logK(TRIANGLE.to) - logK(TRIANGLE.from)).toBeCloseTo(-2.0, 12);
    expect(TRIANGLE.to - TRIANGLE.from).toBe(1);
  });

  it("gives ΔH° = +38.3 kJ mol⁻¹ and ΔS° = +57.4 J K⁻¹ mol⁻¹, as the worked example", () => {
    expect(twoPointThreeR()).toBeCloseTo(19.15, 2);
    expect(deltaH().toFixed(1)).toBe("38.3");
    expect(deltaS().toFixed(1)).toBe("57.4");
    expect(deltaH()).toBeGreaterThan(0); // the line falls: endothermic
  });

  it("G has its minimum at Q, with P downhill forward and R downhill reverse", () => {
    const [p, q, r] = POINTS;
    expect([p.id, q.id, r.id]).toEqual(["P", "Q", "R"]);
    expect(p.xi).toBeLessThan(q.xi);
    expect(q.xi).toBeLessThan(r.xi);
    expect(q.xi).toBe(equilibriumExtent());
    expect(Math.abs(gibbsSlope(q.xi))).toBeLessThan(1e-9);
    expect(gibbs(q.xi)).toBeLessThan(gibbs(q.xi - 0.01));
    expect(gibbs(q.xi)).toBeLessThan(gibbs(q.xi + 0.01));
    expect(gibbsSlope(p.xi)).toBeLessThan(0); // G falls going forward
    expect(gibbsSlope(r.xi)).toBeGreaterThan(0); // G falls going back
    expect(q.xi).toBeGreaterThan(0);
    expect(q.xi).toBeLessThan(1);
  });

  it("ΔG° = G(pure products) − G(pure reactants)", () => {
    expect(gibbs(1) - gibbs(0)).toBeCloseTo(G_CURVE.dG0, 12);
  });
});

describe("neet-ethane-conformations borrowed for jchc-alkane-structure", () => {
  it("the figure's 12.5 kJ mol⁻¹ and angles are the JEE concept's own", () => {
    const concept = ALKANES_HC_NOTE.concepts.find((c) => c.slug === "jchc-alkane-structure");
    expect(concept).toBeDefined();
    const text = JSON.stringify(concept);
    expect(ENERGY_GAP).toBe(12.5);
    expect(text).toContain("12.5 kJ mol⁻¹");
    expect(text).toContain("staggered (dihedral angle 60°)");
    expect(text).toContain("eclipsed (0°)");
  });
});
