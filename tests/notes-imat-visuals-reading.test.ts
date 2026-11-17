import { describe, expect, it } from "vitest";
import {
  AXES,
  FROST,
  SHIFT_RANGE,
  demandSegment,
  equilibrium,
  outcome,
  supplySegment,
} from "../src/app/notes/_components/visualizations/ImatSupplyDemand";
import { HEIGHT, MILESTONES, rowHeight, rowTops } from "../src/app/notes/_components/visualizations/ImatEuTimeline";
import {
  BOXES,
  CHAMBERS,
  FACTS,
  LINKS,
  onBorder,
} from "../src/app/notes/_components/visualizations/ImatItalianInstitutions";

// Three IMAT reading figures (politics, economics, history). Each draws only
// what its concept states, so the directions, dates and numbers are pinned
// here against the concept's own text.

const SHIFTS: number[] = [];
for (let v = SHIFT_RANGE.min; v <= SHIFT_RANGE.max; v += SHIFT_RANGE.step) SHIFTS.push(v);

describe("imat-supply-demand (concept imat-pes-markets)", () => {
  it("starts at price 6, quantity 4, where demand Qd = 10 − P meets supply Qs = P − 2", () => {
    expect(equilibrium(0, 0)).toEqual({ p: 6, q: 4 });
    expect(10 - 6).toBe(6 - 2); // both sides give quantity 4
  });

  it("the crossing is exact for every slider position: quantity demanded = quantity supplied", () => {
    for (const d of SHIFTS) {
      for (const s of SHIFTS) {
        const e = equilibrium(d, s);
        expect(10 - e.p + d).toBeCloseTo(e.p - 2 + s, 12);
        expect(10 - e.p + d).toBeCloseTo(e.q, 12);
        // and it stays on the drawn axes
        expect(e.q).toBeGreaterThan(0);
        expect(e.q).toBeLessThanOrEqual(AXES.q);
        expect(e.p).toBeGreaterThan(0);
        expect(e.p).toBeLessThanOrEqual(AXES.p);
      }
    }
  });

  it("matches the concept's table row by row", () => {
    // Demand rises: price rises, quantity rises
    expect(equilibrium(1, 0)).toEqual({ p: 6.5, q: 4.5 });
    expect(outcome(1, 0)).toMatchObject({ price: "rises", quantity: "rises" });
    expect(outcome(1, 0).sentence).toBe("Demand rises: price and quantity both rise.");
    // Demand falls: price falls, quantity falls
    expect(equilibrium(-1, 0)).toEqual({ p: 5.5, q: 3.5 });
    expect(outcome(-1, 0)).toMatchObject({ price: "falls", quantity: "falls" });
    expect(outcome(-1, 0).sentence).toBe("Demand falls: price and quantity both fall.");
    // Supply rises: price falls, quantity rises
    expect(equilibrium(0, 1)).toEqual({ p: 5.5, q: 4.5 });
    expect(outcome(0, 1)).toMatchObject({ price: "falls", quantity: "rises" });
    // Supply falls: price rises, quantity falls
    expect(equilibrium(0, -1)).toEqual({ p: 6.5, q: 3.5 });
    expect(outcome(0, -1)).toMatchObject({ price: "rises", quantity: "falls" });
  });

  it("first render is the self-check: a frost cuts supply, demand unchanged, so the price rises and the quantity sold falls (D)", () => {
    expect(FROST).toEqual({ d: 0, s: -2 });
    expect(equilibrium(FROST.d, FROST.s)).toEqual({ p: 7, q: 3 });
    expect(outcome(FROST.d, FROST.s).sentence).toBe("Supply falls: price rises, quantity falls.");
  });

  it("says so when the two shifts cancel on one side", () => {
    // demand up 1 and supply down 1: P = (12 + 1 + 1) / 2 = 7, Q = (8 + 1 − 1) / 2 = 4
    expect(equilibrium(1, -1)).toEqual({ p: 7, q: 4 });
    expect(outcome(1, -1).sentence).toBe("Demand rises and supply falls: price rises, quantity stays the same.");
    expect(outcome(0, 0).price).toBe("stays the same");
  });

  it("draws a downward demand line and an upward supply line inside the axes", () => {
    for (const v of SHIFTS) {
      const [d0, d1] = demandSegment(v);
      const [s0, s1] = supplySegment(v);
      expect(d1.p).toBeLessThan(d0.p); // demand slopes down
      expect(s1.p).toBeGreaterThan(s0.p); // supply slopes up
      for (const pt of [d0, d1]) expect(pt.p).toBeCloseTo(10 + v - pt.q, 12);
      for (const pt of [s0, s1]) expect(pt.p).toBeCloseTo(pt.q + 2 - v, 12);
      for (const pt of [d0, d1, s0, s1]) {
        expect(pt.q).toBeGreaterThanOrEqual(0);
        expect(pt.q).toBeLessThanOrEqual(AXES.q);
        expect(pt.p).toBeGreaterThanOrEqual(0);
        expect(pt.p).toBeLessThanOrEqual(AXES.p);
      }
    }
  });
});

describe("imat-eu-timeline (concept imat-his-eu-history)", () => {
  it("lists the concept's ten rows, in its order and with its years", () => {
    expect(MILESTONES.map((m) => m.year)).toEqual([1951, 1957, 1973, 1979, 1985, 1992, 1999, 2004, 2007, 2020]);
    expect(MILESTONES.map((m) => m.name)).toEqual([
      "Treaty of Paris",
      "Treaties of Rome",
      "First enlargement",
      "First direct elections",
      "Schengen Agreement",
      "Treaty of Maastricht",
      "Euro launched",
      "Largest enlargement",
      "Treaty of Lisbon",
      "Brexit",
    ]);
    for (let i = 1; i < MILESTONES.length; i++) expect(MILESTONES[i].year).toBeGreaterThan(MILESTONES[i - 1].year);
  });

  it("keeps the second dates the concept gives", () => {
    const note = (name: string) => MILESTONES.find((m) => m.name === name)?.yearNote;
    expect(note("Schengen Agreement")).toBe("in force 1995");
    expect(note("Treaty of Maastricht")).toBe("in force 1993");
    expect(note("Treaty of Lisbon")).toBe("in force 2009");
    expect(note("Euro launched")).toBe("and 2002");
    expect(note("Brexit")).toBe("31 January");
  });

  it("does not swap Paris and Rome (the concept's trap), and Maastricht made the EU", () => {
    const text = (name: string) => MILESTONES.find((m) => m.name === name)!.note.join(" ");
    expect(text("Treaty of Paris")).toContain("Coal and Steel Community (ECSC)");
    expect(text("Treaty of Paris")).not.toContain("EEC");
    expect(text("Treaties of Rome")).toContain("Economic Community (EEC) and Euratom");
    expect(text("Treaty of Maastricht")).toContain("Created the European Union");
    expect(text("Treaty of Maastricht")).toContain("euro");
    expect(text("First enlargement")).toBe("United Kingdom, Ireland and Denmark join");
    expect(text("Largest enlargement")).toContain("Ten countries");
    expect(text("Euro launched")).toContain("1 January 2002");
    expect(text("Brexit")).toContain("27 members remain");
  });

  it("marks exactly the four city treaties as treaties", () => {
    expect(MILESTONES.filter((m) => m.treaty).map((m) => m.name)).toEqual([
      "Treaty of Paris",
      "Treaties of Rome",
      "Treaty of Maastricht",
      "Treaty of Lisbon",
    ]);
  });

  it("stacks the rows top to bottom inside the picture", () => {
    const tops = rowTops();
    for (let i = 1; i < tops.length; i++) expect(tops[i]).toBe(tops[i - 1] + rowHeight(MILESTONES[i - 1]));
    expect(HEIGHT).toBeGreaterThan(tops[tops.length - 1] + rowHeight(MILESTONES[MILESTONES.length - 1]) - 1);
  });
});

describe("imat-italian-institutions (concept imat-pes-italian-institutions)", () => {
  it("prints the concept's numbers", () => {
    expect(FACTS).toEqual({
      deputies: 400,
      senatorsElected: 200,
      parliamentTermYears: 5,
      presidentTermYears: 7,
      presidentMinAge: 50,
      regionalDelegates: 58,
      voterMinAge: 18,
    });
    expect(CHAMBERS.map((c) => [c.name, c.seats])).toEqual([
      ["Chamber of Deputies", 400],
      ["Senate of the Republic", 200],
    ]);
    expect(CHAMBERS[0].lines).toContain("400 members");
    expect(CHAMBERS[1].lines).toContain("200 elected members");
    expect(CHAMBERS[1].lines).toContain("+ senators for life");
    expect(BOXES.parliament.lines).toContain("elected for 5 years");
    expect(BOXES.president.lines).toContain("7 years, aged 50+");
    expect(BOXES.citizens.lines).toContain("voters aged 18+");
    expect(BOXES.government.lines).toContain("Prime Minister");
  });

  it("draws the chain: citizens elect Parliament, Parliament elects the President, the President appoints the Prime Minister, Parliament gives confidence", () => {
    expect(LINKS.map((l) => [l.from, l.to, l.verb])).toEqual([
      ["citizens", "parliament", "elect directly"],
      ["parliament", "president", "elects"],
      ["parliament", "government", "gives or withdraws confidence"],
      ["president", "government", "appoints"],
    ]);
    expect(LINKS.find((l) => l.to === "president")!.label.join(" ")).toContain("58 regional delegates");
    expect(LINKS.find((l) => l.to === "president")!.label.join(" ")).toContain("joint session");
    expect(LINKS.find((l) => l.verb.includes("confidence"))!.label.join(" ")).toContain("both chambers");
  });

  it("avoids the trap: citizens elect neither the President nor the Prime Minister directly", () => {
    const fromCitizens = LINKS.filter((l) => l.from === "citizens");
    expect(fromCitizens.map((l) => l.to)).toEqual(["parliament"]);
  });

  it("starts and ends each arrow on the right box", () => {
    for (const l of LINKS) {
      expect(onBorder(l.points[0], BOXES[l.from])).toBe(true);
      expect(onBorder(l.points[l.points.length - 1], BOXES[l.to])).toBe(true);
    }
  });

  it("draws both chambers inside the Parliament box", () => {
    const p = BOXES.parliament;
    for (const c of CHAMBERS) {
      expect(c.x).toBeGreaterThanOrEqual(p.x);
      expect(c.x + c.w).toBeLessThanOrEqual(p.x + p.w);
      expect(c.y).toBeGreaterThanOrEqual(p.y);
      expect(c.y + c.h).toBeLessThanOrEqual(p.y + p.h);
    }
  });
});
