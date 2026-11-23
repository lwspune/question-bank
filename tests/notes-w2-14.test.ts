import { describe, expect, it } from "vitest";
import {
  COEFF,
  DEFAULT_H2,
  H2_RANGE,
  N2_SUPPLIED,
  combine,
  fmt,
  limitingLine,
} from "../src/app/notes/_components/visualizations/CetCombiningVolumes";
import {
  MOLECULES,
  classify,
  layoutRow,
  tokenWidth,
} from "../src/app/notes/_components/visualizations/CetAllylicBenzylicVinylic";
import {
  PANELS,
  ammineAngle,
  angleBetween,
  geometricIsomers,
} from "../src/app/notes/_components/visualizations/CetSquarePlanarIsomers";
import {
  ACETOPHENONE,
  ETHYLBENZENE,
  PHENYLETHANOL,
  PROPIOPHENONE,
  PROPYLBENZENE,
  ROUTES,
  toAlcohol,
  toMethylene,
} from "../src/app/notes/_components/visualizations/CetAcetophenoneReductions";

describe("CetCombiningVolumes (cetsbcc-stoich-combining-volumes)", () => {
  it("uses N₂ + 3H₂ → 2NH₃ and the worked example's 10 dm³ of N₂", () => {
    expect(COEFF).toEqual({ n2: 1, h2: 3, nh3: 2 });
    expect(N2_SUPPLIED).toBe(10);
    expect(DEFAULT_H2).toBe(30);
  });

  it("first render is the worked example: 10/1 = 30/3, both used, 20 dm³ of NH₃", () => {
    const o = combine(10, 30);
    expect(o.qN2).toBe(10);
    expect(o.qH2).toBe(10);
    expect(o.limiting).toBe("neither");
    expect(o.n2Left).toBe(0);
    expect(o.h2Left).toBe(0);
    expect(o.nh3).toBe(20);
    expect(limitingLine(o)).toContain("both are used up");
  });

  it("the trap: more H₂ leaves N₂ limiting and the ammonia still 20 dm³", () => {
    const o = combine(10, 39);
    expect(o.limiting).toBe("N₂");
    expect(o.nh3).toBe(20);
    expect(o.h2Left).toBe(9);
    const t = combine(10, 40); // the concept's own 40 dm³ case
    expect(t.limiting).toBe("N₂");
    expect(t.nh3).toBe(20);
  });

  it("too little H₂ makes H₂ limiting and leaves N₂ over", () => {
    const o = combine(10, 15);
    expect(o.limiting).toBe("H₂");
    expect(o.nh3).toBe(10);
    expect(o.n2Left).toBe(5);
    expect(limitingLine(o)).toBe("H₂ is limiting: 5 dm³ of N₂ is left over");
  });

  it("every slider stop has a whole H₂ quotient and the ammonia never passes 20 dm³", () => {
    const stops: number[] = [];
    for (let v = H2_RANGE.min as number; v <= H2_RANGE.max; v += H2_RANGE.step) stops.push(v);
    expect(stops).toContain(30);
    for (const h2 of stops) {
      const o = combine(10, h2);
      expect(Number.isInteger(o.qH2)).toBe(true);
      expect(o.nh3).toBe(2 * Math.min(o.qN2, o.qH2));
      expect(o.nh3).toBeLessThanOrEqual(20);
      expect(o.n2Used + o.n2Left).toBeCloseTo(10, 9);
      expect(o.h2Used + o.h2Left).toBeCloseTo(h2, 9);
    }
  });

  it("formats to one decimal without a trailing .0", () => {
    expect(fmt(20)).toBe("20");
    expect(fmt(50 / 3)).toBe("16.7");
  });
});

describe("CetAllylicBenzylicVinylic (cetalc-allylic-benzylic-vinylic)", () => {
  it("draws the concept's five molecules", () => {
    expect(MOLECULES.map((m) => m.name)).toEqual([
      "but-3-en-2-ol",
      "but-2-en-2-ol",
      "benzyl alcohol",
      "but-3-en-1-ol",
      "2-phenylethanol",
    ]);
    for (const m of MOLECULES) {
      expect(m.bonds.length).toBe(m.groups.length - 1);
      expect(m.groups.filter((g) => g.oh).length).toBe(1);
    }
  });

  it("classifies each as the concept does", () => {
    expect(MOLECULES.map((m) => classify(m).label)).toEqual([
      "2° allylic", // but-3-en-2-ol: secondary allylic
      "vinylic", // but-2-en-2-ol
      "1° benzylic", // C₆H₅CH₂OH
      "not allylic", // but-3-en-1-ol: OH two carbons from the C=C
      "not benzylic", // 2-phenylethanol
    ]);
    expect(classify(MOLECULES[3]).note).toBe("C=C two carbons away");
    expect(classify(MOLECULES[4]).note).toBe("ring two carbons away");
  });

  it("lays groups left to right without overlap", () => {
    for (const m of MOLECULES) {
      const lay = layoutRow(m);
      for (let i = 1; i < lay.groups.length; i++) {
        const gap = lay.groups[i] - lay.groups[i - 1] - (tokenWidth(m.groups[i].text) + tokenWidth(m.groups[i - 1].text)) / 2;
        expect(gap).toBeGreaterThan(0);
        expect(lay.bonds[i - 1]).toBeGreaterThan(lay.groups[i - 1]);
        expect(lay.bonds[i - 1]).toBeLessThan(lay.groups[i]);
      }
      expect(lay.groups[lay.groups.length - 1]).toBeLessThan(190);
    }
  });
});

describe("CetSquarePlanarIsomers (cetcc-geometric-isomerism)", () => {
  it("reproduces the concept's square planar counts", () => {
    expect(geometricIsomers(["A", "A", "A", "A"])).toBe(0);
    expect(geometricIsomers(["A", "A", "A", "B"])).toBe(0);
    expect(geometricIsomers(["A", "A", "B", "B"])).toBe(2);
    expect(geometricIsomers(["A", "A", "B", "C"])).toBe(2);
    expect(geometricIsomers(["A", "B", "C", "D"])).toBe(3);
  });

  it("cis puts the two NH₃ at 90°, trans at 180°", () => {
    expect(angleBetween(0, 1)).toBe(90);
    expect(angleBetween(0, 2)).toBe(180);
    expect(angleBetween(3, 0)).toBe(90);
    for (const row of PANELS) {
      expect(row.panels.map((p) => p.form)).toEqual(["cis", "trans"]);
      expect(row.panels.map(ammineAngle)).toEqual([90, 180]);
    }
  });

  it("draws cisplatin/transplatin and the worked example [Pt(NH₃)₂ClBr]", () => {
    expect(PANELS[0].title).toBe("MA₂B₂: [Pt(NH₃)₂Cl₂]");
    expect(PANELS[0].panels[0].tag).toContain("cisplatin");
    expect(PANELS[0].panels[1].tag).toBe("transplatin");
    for (const p of PANELS[0].panels) expect([...p.ligands].sort()).toEqual(["Cl", "Cl", "NH₃", "NH₃"]);
    expect(PANELS[1].title).toBe("MA₂BC: [Pt(NH₃)₂ClBr]");
    for (const p of PANELS[1].panels) expect([...p.ligands].sort()).toEqual(["Br", "Cl", "NH₃", "NH₃"]);
  });
});

describe("CetAcetophenoneReductions (cetald-clemmensen-wolff-kishner-and-hydride)", () => {
  it("C=O to CH₂ swaps O for two H: acetophenone to ethylbenzene", () => {
    expect(ACETOPHENONE).toEqual({ C: 8, H: 8, O: 1 });
    expect(toMethylene(ACETOPHENONE)).toEqual(ETHYLBENZENE);
    expect(ETHYLBENZENE).toEqual({ C: 8, H: 10, O: 0 });
  });

  it("NaBH₄ stops at the alcohol: 1-phenylethanol", () => {
    expect(toAlcohol(ACETOPHENONE)).toEqual(PHENYLETHANOL);
    expect(PHENYLETHANOL).toEqual({ C: 8, H: 10, O: 1 });
  });

  it("the trap: ethyl phenyl ketone keeps all its carbons, n-propylbenzene", () => {
    expect(toMethylene(PROPIOPHENONE)).toEqual(PROPYLBENZENE);
    expect(PROPYLBENZENE.C).toBe(9);
  });

  it("the three routes are the worked example's", () => {
    expect(ROUTES.map((r) => r.name)).toEqual(["Clemmensen", "Wolff–Kishner", "NaBH₄"]);
    expect(ROUTES.map((r) => r.medium)).toEqual(["acid", "base", "stops at alcohol"]);
    expect(ROUTES.map((r) => r.productName)).toEqual(["ethylbenzene", "ethylbenzene", "1-phenylethanol"]);
    expect(ROUTES.map((r) => r.result)).toEqual([ETHYLBENZENE, ETHYLBENZENE, PHENYLETHANOL]);
    expect(ROUTES[0].reagent.join(" ")).toBe("Zn–Hg / conc. HCl");
    for (const r of ROUTES) expect(r.result.C).toBe(ACETOPHENONE.C);
  });
});
