import { describe, expect, it } from "vitest";
import {
  OOCYTE_ARREST,
  OOGENESIS,
  SPERMATOGENESIS,
  STARTS,
} from "../src/app/notes/_components/visualizations/NeetGametogenesis";
import {
  BAR_X,
  CYCLE_ORDER,
  PCR_STEPS,
  PRIMER_LENGTH,
  STRETCH,
  barHighlight,
  newStrandLength,
  polymerasePose,
  primerOpacity,
  strandY,
} from "../src/app/notes/_components/visualizations/NeetPcrSteps";
import { BONES, DIGITS, LIMBS, boneTops, limbBottom } from "../src/app/notes/_components/visualizations/NeetForelimbHomology";
import {
  ENZYME_STEPS,
  EQUATION,
  HALF_WIDTH,
  MARKED_TERM,
  POCKET,
  bondOpacity,
  closed,
  halfPose,
} from "../src/app/notes/_components/visualizations/NeetEnzymeCycle";
import { CHROMOSOMES, TOP as CHROMO_TOP, arms, centromereY } from "../src/app/notes/_components/visualizations/NeetCentromereTypes";
import { ORDER, RF, UNIT, geneX } from "../src/app/notes/_components/visualizations/NeetGeneMap";
import { BARS, BASE_Y, SCALE, barTop, spinOnly } from "../src/app/notes/_components/visualizations/NeetSpinOnlyMoment";
import {
  BRYO_STEPS,
  MEIOSIS_ANGLE,
  SEGMENTS,
  STATIONS,
  markerAngle,
  ploidyAt,
  ringPoint,
} from "../src/app/notes/_components/visualizations/NeetBryophyteCycle";

describe("NeetGametogenesis (nzohr-oogenesis)", () => {
  it("spermatogenesis: 46, 46, then 23 from meiosis I on; 1 primary spermatocyte gives 4 spermatids and 4 sperms", () => {
    expect(SPERMATOGENESIS.map((s) => s.name)).toEqual([
      "spermatogonium",
      "primary spermatocyte",
      "secondary spermatocyte",
      "spermatid",
      "sperm",
    ]);
    expect(SPERMATOGENESIS.map((s) => s.chromosomes)).toEqual([46, 46, 23, 23, 23]);
    expect(SPERMATOGENESIS.map((s) => s.cells)).toEqual([1, 1, 2, 4, 4]);
    expect(SPERMATOGENESIS.map((s) => s.after ?? null)).toEqual([null, null, "meiosis I", "meiosis II", "spermiogenesis"]);
  });

  it("oogenesis: unequal divisions give one ovum and two polar bodies; the primary oocyte waits in prophase I", () => {
    expect(OOGENESIS.map((s) => s.name)).toEqual(["oogonium", "primary oocyte", "secondary oocyte", "ovum (ootid)"]);
    expect(OOGENESIS.map((s) => s.chromosomes)).toEqual([46, 46, 23, 23]);
    expect(OOGENESIS.every((s) => s.cells === 1)).toBe(true);
    expect(OOGENESIS.map((s) => s.polarBody ?? null)).toEqual([null, null, "first polar body", "second polar body"]);
    expect(OOGENESIS[2].after).toBe("meiosis I");
    expect(OOGENESIS[3].after).toBe("meiosis II");
    expect(OOCYTE_ARREST).toBe("prophase I");
  });

  it("starts at puberty in the male and in the embryo in the female", () => {
    expect(STARTS.spermatogenesis).toBe("at puberty");
    expect(STARTS.oogenesis).toBe("in the embryo");
  });
});

describe("NeetPcrSteps (nzobp-pcr-steps)", () => {
  it("runs denaturation, annealing, extension in that order, then many cycles", () => {
    expect(PCR_STEPS).toHaveLength(5);
    expect(PCR_STEPS.slice(1, 4).map((s) => s.title)).toEqual([...CYCLE_ORDER]);
    expect([...CYCLE_ORDER]).toEqual(["Denaturation", "Annealing", "Extension"]);
    expect(PCR_STEPS[4].caption).toMatch(/about a billion times/);
    expect(PCR_STEPS[1].caption).toMatch(/Thermus aquaticus/);
  });

  it("adds no temperature the concept does not give", () => {
    const words = PCR_STEPS.map((s) => `${s.title} ${s.caption}`).join(" ");
    expect(words).not.toMatch(/°|degree/i);
  });

  it("strands separate in denaturation; primers bind in annealing; new strands grow in extension", () => {
    expect(strandY("bottom", 0) - strandY("top", 0)).toBe(12);
    expect(strandY("bottom", 1) - strandY("top", 1)).toBe(72);
    expect([0, 1, 2, 3, 4].map(primerOpacity)).toEqual([0, 0, 1, 1, 1]);
    expect([0, 1, 2, 3, 4].map(newStrandLength)).toEqual([0, 0, 0, 166, 166]);
    // A primer plus its new strand spans the whole stretch.
    expect(PRIMER_LENGTH + newStrandLength(3)).toBe(STRETCH.to - STRETCH.from);
  });

  it("the polymerase ends at the far end of the stretch on each strand", () => {
    expect(polymerasePose("top", 2).opacity).toBe(0);
    expect(polymerasePose("top", 3)).toEqual({ x: STRETCH.from, y: 60, opacity: 1 });
    expect(polymerasePose("bottom", 3)).toEqual({ x: STRETCH.to, y: 108, opacity: 1 });
  });

  it("the step bar marks the current step of the cycle", () => {
    expect([1, 2, 3].map((s) => barHighlight(s).x)).toEqual([...BAR_X]);
    expect(barHighlight(0).opacity).toBe(0);
    expect(barHighlight(4).opacity).toBe(0);
  });
});

describe("NeetForelimbHomology (nzoev-homology)", () => {
  it("names the six kinds of bone NCERT lists, and the four animals", () => {
    expect([...BONES]).toEqual(["humerus", "radius", "ulna", "carpals", "metacarpals", "phalanges"]);
    expect(LIMBS.map((l) => l.animal)).toEqual(["Whale", "Bat", "Cheetah", "Human"]);
    expect(DIGITS).toBe(5);
  });

  it("every limb has the same bones in the same order", () => {
    for (const l of LIMBS) {
      const t = boneTops(l);
      expect(t.radius).toBe(t.ulna);
      expect(t.humerus).toBeLessThan(t.radius);
      expect(t.radius).toBeLessThan(t.carpals);
      expect(t.carpals).toBeLessThan(t.metacarpals);
      expect(t.metacarpals).toBeLessThan(t.phalanges);
      expect(limbBottom(l)).toBeLessThanOrEqual(222);
    }
    expect(limbBottom(LIMBS[1])).toBe(218);
  });
});

describe("NeetEnzymeCycle (nzobm-enzyme-action)", () => {
  it("follows the concept's four steps and its equation", () => {
    expect(ENZYME_STEPS.map((s) => s.title)).toEqual(["Binding", "Fitting tighter", "Bond breaking", "Release"]);
    expect(EQUATION.join(" ")).toBe("E + S ⇌ ES → EP → E + P");
    expect(MARKED_TERM.map((i) => EQUATION[i])).toEqual(["E + S", "ES", "EP", "E + P"]);
  });

  it("the substrate fits the site, the enzyme closes, the bond breaks, the products leave", () => {
    const l0 = halfPose("left", 0);
    const r0 = halfPose("right", 0);
    expect(r0.x - l0.x).toBe(HALF_WIDTH);
    expect(l0.x - HALF_WIDTH / 2).toBeGreaterThanOrEqual(POCKET.open.left);
    expect(r0.x + HALF_WIDTH / 2).toBeLessThanOrEqual(POCKET.open.right);
    const l2 = halfPose("left", 2);
    const r2 = halfPose("right", 2);
    expect(r2.x - l2.x).toBeGreaterThan(HALF_WIDTH);
    expect(l2.x - HALF_WIDTH / 2).toBeGreaterThanOrEqual(POCKET.closed.left);
    expect(r2.x + HALF_WIDTH / 2).toBeLessThanOrEqual(POCKET.closed.right);
    expect(halfPose("left", 3).y).toBeLessThan(104);
    expect([0, 1, 2, 3].map(bondOpacity)).toEqual([1, 1, 0, 0]);
    expect([0, 1, 2, 3].map(closed)).toEqual([false, true, true, false]);
  });
});

describe("NeetCentromereTypes (nboce-chromosomes)", () => {
  it("names the four types from the middle to the tip", () => {
    expect(CHROMOSOMES.map((c) => c.name)).toEqual(["Metacentric", "Sub-metacentric", "Acrocentric", "Telocentric"]);
    const f = CHROMOSOMES.map((c) => c.f);
    for (let i = 1; i < f.length; i++) expect(f[i]).toBeLessThan(f[i - 1]);
    expect(CHROMOSOMES.map((c) => c.drawn.join(""))).toEqual(CHROMOSOMES.map((c) => c.name));
  });

  it("arms: equal, one shorter, one extremely short, all on one side", () => {
    const [meta, sub, acro, telo] = CHROMOSOMES.map(arms);
    expect(meta.short).toBe(meta.long);
    expect(sub.short).toBeLessThan(sub.long);
    expect(acro.short).toBeLessThan(sub.short);
    expect(acro.short).toBeGreaterThan(0);
    expect(telo.short).toBe(0);
    expect(centromereY(CHROMOSOMES[3])).toBe(CHROMO_TOP);
    expect(CHROMOSOMES[3].position.join(" ")).toMatch(/terminal/);
    expect(CHROMOSOMES[0].position.join(" ")).toBe("in the middle");
  });
});

describe("NeetGeneMap (nbopi-gene-mapping)", () => {
  it("draws the worked example: 8% + 12% = 20%, so Q is in the middle", () => {
    expect(RF).toEqual({ PQ: 8, QR: 12, PR: 20 });
    expect(RF.PQ + RF.QR).toBe(RF.PR);
    expect(ORDER).toEqual(["P", "Q", "R"]);
    expect([geneX("P"), geneX("Q"), geneX("R")]).toEqual([40, 136, 280]);
    expect(geneX("R") - geneX("P")).toBe(RF.PR * UNIT);
  });
});

describe("NeetSpinOnlyMoment (nchdf-spin-only)", () => {
  it("gives the concept's five moments", () => {
    expect(BARS.map((b) => b.n)).toEqual([1, 2, 3, 4, 5]);
    expect(BARS.map((b) => spinOnly(b.n).toFixed(2))).toEqual(["1.73", "2.83", "3.87", "4.90", "5.92"]);
  });

  it("names only the ions the concept names", () => {
    expect(BARS.map((b) => b.ions.join(", "))).toEqual(["Ti³⁺, Cu²⁺", "V³⁺, Ni²⁺", "", "Cr²⁺, Fe²⁺", "Fe³⁺"]);
  });

  it("bar heights follow the moment, and the self-check goes back from 4.90 to n = 4", () => {
    expect(barTop(5)).toBeCloseTo(BASE_Y - 5.92 * SCALE, 2);
    for (let i = 1; i < BARS.length; i++) expect(barTop(BARS[i].n)).toBeLessThan(barTop(BARS[i - 1].n));
    expect(Math.round(4.9 ** 2)).toBe(4 * 6);
  });
});

describe("NeetBryophyteCycle (nbopk-bryo-features)", () => {
  it("goes gametophyte, fertilisation, zygote, sporophyte, spores, one station per step", () => {
    expect(STATIONS.map((s) => s.id)).toEqual(["gametophyte", "fertilisation", "zygote", "sporophyte", "spores"]);
    expect(BRYO_STEPS).toHaveLength(STATIONS.length);
    expect([0, 1, 2, 3, 4].map(markerAngle)).toEqual([0, 72, 144, 216, 288]);
  });

  it("the gametophyte and spores are haploid, the zygote and sporophyte diploid", () => {
    for (const s of STATIONS) if (s.ploidy !== "switch") expect(ploidyAt(s.angle)).toBe(s.ploidy);
    expect(STATIONS.map((s) => s.ploidy)).toEqual(["n", "switch", "2n", "2n", "n"]);
    expect(MEIOSIS_ANGLE).toBeGreaterThan(216);
    expect(MEIOSIS_ANGLE).toBeLessThan(288);
  });

  it("the ring segments run round the whole cycle, each coloured by its ploidy", () => {
    expect(SEGMENTS[0].from).toBe(0);
    expect(SEGMENTS[SEGMENTS.length - 1].to).toBe(360);
    for (let i = 1; i < SEGMENTS.length; i++) expect(SEGMENTS[i].from).toBe(SEGMENTS[i - 1].to);
    for (const s of SEGMENTS) expect(ploidyAt((s.from + s.to) / 2)).toBe(s.ploidy);
    expect(ringPoint(0)).toEqual({ x: 160, y: 48 });
  });

  it("says the sporophyte stays attached and spores come from meiosis", () => {
    expect(BRYO_STEPS[3].caption).toMatch(/attached to the photosynthetic gametophyte/);
    expect(BRYO_STEPS[4].caption).toMatch(/meiosis/);
    expect(BRYO_STEPS[2].caption).toMatch(/does not undergo meiosis at once/);
  });
});
