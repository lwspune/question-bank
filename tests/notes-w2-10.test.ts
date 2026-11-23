import { describe, expect, it } from "vitest";
import { INCOME_EXAMPLE, incomeChain } from "../src/app/notes/_components/visualizations/SscIncomeAggregates";
import { PLAN_SPANS, plansCompletedBy, yearX } from "../src/app/notes/_components/visualizations/SscPlanTimeline";
import { BUDGET_EXAMPLE, deficits } from "../src/app/notes/_components/visualizations/SscBudgetDeficits";
import {
  ELASTICITY_POINTS,
  demandKind,
  elasticity,
  pointElasticity,
  pointLines,
} from "../src/app/notes/_components/visualizations/SscElasticityScale";
import {
  LEGEND,
  MARKED,
  familyOf,
  groupsInPeriod,
  shellsFor,
} from "../src/app/notes/_components/visualizations/SscPeriodicGroups";
import {
  HYDROCARBON_ROWS,
  carbonValences,
  hydrogensByRule,
} from "../src/app/notes/_components/visualizations/SscHydrocarbonFamilies";
import { REDOX_CHANGES, REDOX_EQUATION, redoxVerdict, signed } from "../src/app/notes/_components/visualizations/SscRedoxNumbers";
import { MILK, SLIGHTLY_ALKALINE, phSide, phX } from "../src/app/notes/_components/visualizations/SscMilkPh";
import { COMPOUNDS, composition, shown } from "../src/app/notes/_components/visualizations/SscMassPercent";
import { CROSS_CASES, crossCounts } from "../src/app/notes/_components/visualizations/SscValencyCross";
import { GEO_HEIGHT_KM, GEO_ORBIT, ORBITS, POLAR_ORBIT } from "../src/app/notes/_components/visualizations/SscSatelliteOrbits";
import { CALLIPER_PARTS, JAW_FACES, SPHERE } from "../src/app/notes/_components/visualizations/SscVernierParts";
import { MATKA_STEPS, POT, waterHalfWidth } from "../src/app/notes/_components/visualizations/SscMatkaCooling";
import { ROT_POINTS, TURN_DEG, arcLength, linearSpeed } from "../src/app/notes/_components/visualizations/SscRigidRotation";

// SSC CGL Chemistry, Physics and Economics notes figures, task w2-10
// (scripts/notes/CET_VISUALS_BRIEF.md). Each figure shows exactly what its concept states.

describe("GDP to national income (sscxnina-aggregates)", () => {
  it("uses the worked example: GDP 500, NFIA 20, depreciation 40, net indirect taxes 30", () => {
    expect(INCOME_EXAMPLE.gdpMp as number).toBe(500);
    expect(INCOME_EXAMPLE.nfia as number).toBe(20);
    expect(INCOME_EXAMPLE.depreciation as number).toBe(40);
    expect(INCOME_EXAMPLE.netIndirectTaxes as number).toBe(30);
  });

  it("walks 500 → 520 → 480 → 450, ending at NNP at factor cost = national income", () => {
    const rows = incomeChain(INCOME_EXAMPLE);
    expect(rows.map((r) => r.value)).toEqual([500, 520, 480, 450]);
    expect(rows.map((r) => r.name)).toEqual([
      "GDP at market prices",
      "GNP at market prices",
      "NNP at market prices",
      "NNP at factor cost = national income",
    ]);
    expect(rows.slice(1).map((r) => [r.step?.sign, r.step?.amount])).toEqual([
      [1, 20],
      [-1, 40],
      [-1, 30],
    ]);
  });
});

describe("the plans and the breaks (sscxiepl-later)", () => {
  it("carries the page's years for every plan and break", () => {
    expect(PLAN_SPANS.map((p) => [p.name, p.label])).toEqual([
      ["First", "1951-56"],
      ["Second", "1956-61"],
      ["Third", "1961-66"],
      ["Plan Holiday", "1966-69"],
      ["Fourth", "1969-74"],
      ["Fifth", "1974-79, ended 1978"],
      ["Rolling Plan", "1978-80"],
      ["Sixth", "1980-85"],
      ["Seventh", "1985-90"],
      ["Eighth", "1992-97"],
    ]);
    expect(PLAN_SPANS.filter((p) => p.isBreak).map((p) => p.name)).toEqual(["Plan Holiday", "Rolling Plan"]);
  });

  it("draws each bar from its start to its end, the Fifth stopping in 1978", () => {
    const fifth = PLAN_SPANS.find((p) => p.name === "Fifth");
    expect([fifth?.start, fifth?.end]).toEqual([1974, 1978]);
    // no gaps or overlaps from 1951 to 1990; the only gap is before the Eighth
    for (let i = 1; i < PLAN_SPANS.length - 1; i++) expect(PLAN_SPANS[i].start).toBe(PLAN_SPANS[i - 1].end);
    expect(PLAN_SPANS[PLAN_SPANS.length - 1].start).toBe(1992);
    expect(yearX(1990)).toBeLessThan(yearX(1992));
  });

  it("counts seven plans completed by 1990", () => {
    expect(plansCompletedBy(1990)).toBe(7);
  });
});

describe("fiscal and primary deficit (sscxmbbu-deficits)", () => {
  it("uses the worked example: 900, 600, 100 and interest 120", () => {
    expect(BUDGET_EXAMPLE.totalExpenditure as number).toBe(900);
    expect(BUDGET_EXAMPLE.revenueReceipts as number).toBe(600);
    expect(BUDGET_EXAMPLE.nonDebtCapitalReceipts as number).toBe(100);
    expect(BUDGET_EXAMPLE.interestPayments as number).toBe(120);
  });

  it("gives receipts 700, fiscal deficit 200 and primary deficit 80", () => {
    expect(deficits(BUDGET_EXAMPLE)).toEqual({ receiptsOtherThanBorrowings: 700, fiscal: 200, primary: 80 });
  });
});

describe("price elasticity of demand (sscxmimi-demand)", () => {
  it("places tea at 4 ÷ 8 = 0.5, the self-check at 5 ÷ 5 = 1 and the practice value at 3", () => {
    expect(ELASTICITY_POINTS.map(pointElasticity)).toEqual([0.5, 1, 3]);
    expect(elasticity(-4, 8)).toBe(0.5); // the minus sign is dropped
  });

  it("names below 1 inelastic, exactly 1 unitary, above 1 elastic", () => {
    expect([0.5, 1, 3].map(demandKind)).toEqual(["inelastic", "unitary", "elastic"]);
    expect(ELASTICITY_POINTS.map(pointLines)).toEqual([
      ["Tea: 4% ÷ 8%", "= 0.5, inelastic"],
      ["5% ÷ 5%", "= 1, unitary"],
      ["e = 3", "elastic"],
    ]);
  });
});

describe("periodic table families (ssccatpe-groups)", () => {
  it("names the concept's families and no others", () => {
    expect(LEGEND.map((l) => l.text)).toEqual([
      "Group 1: alkali metals",
      "Group 2: alkaline earth metals",
      "Groups 3 to 12: transition elements, d-block",
      "Group 16: chalcogens",
      "Group 17: halogens",
      "Group 18: noble gases",
      "Lanthanides: rare earths, f-block",
    ]);
  });

  it("colours group 1 as alkali metals below hydrogen only, and 3 to 12 as transition elements", () => {
    expect(familyOf(1, 1)).toBe("other");
    expect(familyOf(1, 3)).toBe("alkali");
    expect([3, 12].map((g) => familyOf(g, 4))).toEqual(["transition", "transition"]);
    expect([13, 14, 15].map((g) => familyOf(g, 3))).toEqual(["other", "other", "other"]);
    expect([16, 17, 18].map((g) => familyOf(g, 3))).toEqual(["chalcogen", "halogen", "noble"]);
  });

  it("draws the table's outline: 2 cells in period 1, 8 in periods 2 and 3, 18 from period 4", () => {
    expect(groupsInPeriod(1)).toEqual([1, 18]);
    expect(groupsInPeriod(2)).toHaveLength(8);
    expect(groupsInPeriod(3)).toHaveLength(8);
    expect(groupsInPeriod(4)).toHaveLength(18);
    // every period ends in group 18, the noble gases
    for (let p = 1; p <= 7; p++) expect(groupsInPeriod(p).slice(-1)[0]).toBe(18);
  });

  it("marks the self-check and the definition's examples", () => {
    expect(shellsFor(3, 2)).toEqual([2, 8, 2]);
    expect(shellsFor(3, 2).reduce((a, b) => a + b, 0)).toBe(12);
    expect(shellsFor(2, 17)).toEqual([2, 7]);
    expect(shellsFor(2, 17).reduce((a, b) => a + b, 0)).toBe(9);
    expect(MARKED.map((m) => [m.symbol, m.period as number, m.group as number])).toEqual([
      ["Mg", 3, 2],
      ["F", 2, 17],
      ["Xe", 5, 18],
    ]);
  });
});

describe("three hydrocarbon families (sscccchy-formulas)", () => {
  it("shows the concept's propane C₃H₈, propene C₃H₆ and propyne C₃H₄", () => {
    expect(HYDROCARBON_ROWS.map((r) => [r.family, r.name, r.formula])).toEqual([
      ["Alkane", "propane", "C₃H₈"],
      ["Alkene", "propene", "C₃H₆"],
      ["Alkyne", "propyne", "C₃H₄"],
    ]);
  });

  it("counts hydrogens that fit 2n + 2, 2n and 2n − 2 for n = 3", () => {
    for (const r of HYDROCARBON_ROWS) {
      expect(r.groups).toHaveLength(3);
      const h = r.groups.reduce((s, g) => s + g.hydrogens, 0);
      expect(h).toBe(hydrogensByRule(r.family, 3));
    }
    expect(HYDROCARBON_ROWS.map((r) => hydrogensByRule(r.family, 3))).toEqual([8, 6, 4]);
  });

  it("has single bonds only, then one double, then one triple bond, with four bonds on every carbon", () => {
    expect(HYDROCARBON_ROWS.map((r) => r.bonds)).toEqual([
      [1, 1],
      [2, 1],
      [3, 1],
    ]);
    for (const r of HYDROCARBON_ROWS) expect(carbonValences(r)).toEqual([4, 4, 4]);
  });
});

describe("oxidation numbers in the ammonia reaction (ssccrre-redox)", () => {
  it("uses the concept's equation and numbers", () => {
    expect(REDOX_EQUATION).toBe("4NH₃ + 5O₂ → 4NO + 6H₂O");
    expect(REDOX_CHANGES.map((c) => [c.element, c.from, c.to])).toEqual([
      ["Nitrogen", -3, 2],
      ["Oxygen", 0, -2],
    ]);
  });

  it("calls the rise oxidation and the fall reduction", () => {
    expect(REDOX_CHANGES.map(redoxVerdict)).toEqual(["oxidised", "reduced"]);
    expect([2, 0, -3].map(signed)).toEqual(["+2", "0", "−3"]);
  });
});

describe("baking soda and milk (ssccabac-daily)", () => {
  it("starts milk at about pH 6, on the acidic side", () => {
    expect(MILK.phBefore as number).toBe(6);
    expect(phSide(MILK.phBefore)).toBe("acidic");
  });

  it("ends slightly alkaline: just above 7, a higher pH than before", () => {
    expect(SLIGHTLY_ALKALINE.from as number).toBe(7);
    expect(SLIGHTLY_ALKALINE.to).toBeGreaterThan(7);
    expect(phSide((SLIGHTLY_ALKALINE.from + SLIGHTLY_ALKALINE.to) / 2)).toBe("alkaline");
    expect(phX(SLIGHTLY_ALKALINE.from)).toBeGreaterThan(phX(MILK.phBefore));
    expect(phX(7)).toBe((phX(0) + phX(14)) / 2);
  });
});

describe("percentage composition (ssccmomo-mole)", () => {
  it("gives H₂SO₃ a molar mass of 82, sulphur about 39%", () => {
    const c = composition(COMPOUNDS[0]);
    expect(c.molar).toBe(82);
    expect(c.parts.map((p) => [p.el, p.mass])).toEqual([
      ["H", 2],
      ["S", 32],
      ["O", 48],
    ]);
    expect(c.parts[1].percent).toBeCloseTo((32 / 82) * 100, 10);
    expect(c.parts.map((p) => shown(p.percent, COMPOUNDS[0].decimals))).toEqual(["2", "39", "59"]);
  });

  it("gives water a molar mass of 18, oxygen about 88.9%", () => {
    const c = composition(COMPOUNDS[1]);
    expect(c.molar).toBe(18);
    expect(c.parts.map((p) => shown(p.percent, COMPOUNDS[1].decimals))).toEqual(["11.1", "88.9"]);
  });

  it("prints shares that add to 100", () => {
    for (const comp of COMPOUNDS) {
      const c = composition(comp);
      expect(c.parts.reduce((s, p) => s + p.percent, 0)).toBeCloseTo(100, 10);
      expect(c.parts.reduce((s, p) => s + Number(shown(p.percent, comp.decimals)), 0)).toBeCloseTo(100, 10);
    }
  });
});

describe("crossing the valencies (ssccbbo-valency)", () => {
  it("crosses Al 3, O 2 to Al₂O₃ and Mg 2, OH 1 to Mg(OH)₂", () => {
    expect(CROSS_CASES.map((c) => [c.left, c.leftValency, c.right, c.rightValency, c.formula])).toEqual([
      ["Al", 3, "O", 2, "Al₂O₃"],
      ["Mg", 2, "OH", 1, "Mg(OH)₂"],
    ]);
    expect(CROSS_CASES.map(crossCounts)).toEqual([
      { left: 2, right: 3 },
      { left: 1, right: 2 },
    ]);
  });

  it("balances the charges: 2 × 3 = 3 × 2 = 6", () => {
    for (const c of CROSS_CASES) {
      const n = crossCounts(c);
      expect(n.left * c.leftValency).toBe(n.right * c.rightValency);
    }
    const al = crossCounts(CROSS_CASES[0]);
    expect(al.left * CROSS_CASES[0].leftValency).toBe(6);
  });
});

describe("two different orbits (sscfassp-satellites)", () => {
  it("states the concept's facts for each orbit", () => {
    expect(ORBITS.map((o) => [o.name, o.plane, o.height])).toEqual([
      ["Sun-synchronous", "near-polar", "low"],
      ["Geostationary", "over the equator", "about 36,000 km up"],
    ]);
    expect(GEO_HEIGHT_KM as number).toBe(36000);
  });

  it("draws the geostationary orbit far out and the sun-synchronous one close and near-polar", () => {
    expect(GEO_ORBIT.rx).toBeGreaterThan(POLAR_ORBIT.ry);
    expect(POLAR_ORBIT.ry).toBeGreaterThan(POLAR_ORBIT.rx); // runs up and down, over the poles
    expect(Math.abs(POLAR_ORBIT.tiltDeg)).toBeLessThan(20); // near-polar, not exactly polar
  });
});

describe("vernier calliper parts (sscfunun-dimensions)", () => {
  it("pairs each part with what the concept says it measures", () => {
    expect(CALLIPER_PARTS.map((p) => [p.part, p.measures])).toEqual([
      ["Internal jaws", "inside diameter of a pipe"],
      ["External jaws", "length of a rod, diameter of a sphere"],
      ["Depth bar", "depth of a beaker"],
    ]);
  });

  it("holds the sphere between the external jaws, touching both faces", () => {
    expect(SPHERE.x - SPHERE.r).toBe(JAW_FACES.fixed);
    expect(SPHERE.x + SPHERE.r).toBe(JAW_FACES.sliding);
  });
});

describe("the matka (sscfhthe-heat)", () => {
  it("tells the self-check's story in order", () => {
    expect([...MATKA_STEPS]).toEqual([
      "water seeps out through the pores",
      "it evaporates outside",
      "evaporation takes latent heat from the water inside",
    ]);
  });

  it("keeps the water inside the pot's hollow", () => {
    expect(POT.waterline as number).toBeGreaterThan(POT.y - POT.inner);
    expect(waterHalfWidth()).toBeCloseTo(Math.sqrt(55 * 55 - 40 * 40), 10);
    expect(waterHalfWidth()).toBeLessThan(POT.inner);
  });
});

describe("same angle, different speed (sscfkmmo-rotation)", () => {
  it("puts A at r and B on the rim at 2r", () => {
    const [a, b] = ROT_POINTS;
    expect(b.radius / a.radius).toBe(2);
    expect([a.distance, b.distance, a.speed, b.speed]).toEqual(["r", "2r", "v", "2v"]);
  });

  it("gives B twice A's linear speed and path for the same angle", () => {
    const [a, b] = ROT_POINTS;
    const omega = 1.7;
    expect(linearSpeed(omega, b.radius)).toBeCloseTo(2 * linearSpeed(omega, a.radius), 10);
    expect(arcLength(b.radius, TURN_DEG)).toBeCloseTo(2 * arcLength(a.radius, TURN_DEG), 10);
  });
});
