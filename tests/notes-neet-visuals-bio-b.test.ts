import { describe, expect, it } from "vitest";
import {
  BAND_COUNT,
  EXCHANGES,
  GRADIENT,
  LIMB_PERMEABILITY,
  TUBES,
  bandOpacity,
} from "../src/app/notes/_components/visualizations/NeetCountercurrent";
import {
  AV_NODE,
  AV_SEPTUM_Y,
  BUNDLE_OF_HIS,
  CONDUCTION_STEPS,
  ECG_HEIGHTS,
  ECG_PARTS,
  IV_SEPTUM_X,
  LEFT_ATRIUM,
  LEFT_BUNDLE,
  PATHWAY,
  PURKINJE_LEFT,
  PURKINJE_RIGHT,
  RIGHT_ATRIUM,
  RIGHT_BUNDLE,
  SA_NODE,
  SPLIT,
  ecgShown,
  impulsePose,
} from "../src/app/notes/_components/visualizations/NeetCardiacConduction";
import {
  CYCLE_DAYS,
  HORMONES,
  OVARY,
  OVULATION_T,
  PHASES,
  endometrium,
} from "../src/app/notes/_components/visualizations/NeetMenstrualCycle";
import {
  AXON_END,
  AXON_START,
  BODY,
  DENDRITES,
  KNOBS,
  MYELIN,
  NEURON_TYPES,
  NISSL,
  PART_LABELS,
  nodesOfRanvier,
} from "../src/app/notes/_components/visualizations/NeetNeuronStructure";
import {
  APEX,
  CENTER_X,
  CHIASMA,
  CHROMATIDS,
  CROSSOVER,
  PROPHASE_STEPS,
  armEnd,
  chromatidPose,
  envelopeOpacity,
  noduleOpacity,
  nucleolusOpacity,
  spindleOpacity,
  swapped,
  synaptonemalOpacity,
} from "../src/app/notes/_components/visualizations/NeetMeiosisProphase";
import {
  LUMEN_H,
  MEMBRANE,
  PARTS,
  PROTON_MOVES,
  STROMA_H,
  sideOf,
} from "../src/app/notes/_components/visualizations/NeetThylakoidChemiosmosis";

// NEET Biology figures, batch B (scripts/notes/CET_VISUALS_BRIEF.md, NEET
// variant). Each figure must say what its NEET concept says, in its words, and
// nothing more; the facts below are the concepts' own.

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

describe("counter current mechanism (nzoex-countercurrent)", () => {
  it("uses the concept's two values and unit: 300 in the cortex, about 1200 in the inner medulla", () => {
    expect(GRADIENT.cortex as number).toBe(300);
    expect(GRADIENT.innerMedulla as number).toBe(1200);
    expect(GRADIENT.unit as string).toBe("mOsmol L⁻¹");
  });

  it("shades the interstitium darker towards the inner medulla (the gradient rises inwards)", () => {
    for (let i = 1; i < BAND_COUNT; i++) expect(bandOpacity(i)).toBeGreaterThan(bandOpacity(i - 1));
  });

  it("runs both loops as counter currents: Henle's loop and the vasa recta", () => {
    const flow = (id: string) => TUBES.find((t) => t.id === id)?.flow;
    expect(flow("henle-desc")).toBe("down");
    expect(flow("henle-asc")).toBe("up");
    expect(flow("vr-desc")).toBe("down");
    expect(flow("vr-asc")).toBe("up");
  });

  it("states each limb's permeability as the concept does", () => {
    expect(LIMB_PERMEABILITY["henle-desc"].water as string).toBe("permeable");
    expect(LIMB_PERMEABILITY["henle-desc"].electrolytes as string).toBe("almost impermeable");
    expect(LIMB_PERMEABILITY["henle-asc"].water as string).toBe("impermeable");
    expect(LIMB_PERMEABILITY["henle-desc"].filtrate as string).toBe("concentrated");
    expect(LIMB_PERMEABILITY["henle-asc"].filtrate as string).toBe("diluted");
  });

  it("lets water out of the descending limb and the collecting duct, never the ascending limb", () => {
    const water = EXCHANGES.filter((e) => e.what === "H₂O").map((e) => e.from);
    expect(water).toEqual(["henle-desc", "cd"]);
  });

  it("moves NaCl and urea along the concept's route", () => {
    const has = (what: string, from: string, to: string) => EXCHANGES.some((e) => e.what === what && e.from === from && e.to === to);
    expect(has("NaCl", "henle-asc", "vr-desc")).toBe(true);
    expect(has("NaCl", "vr-asc", "interstitium")).toBe(true);
    expect(has("urea", "interstitium", "henle-asc")).toBe(true);
    expect(has("urea", "cd", "interstitium")).toBe(true);
    expect(EXCHANGES.some((e) => e.what === "NaCl" && e.from === "henle-desc")).toBe(false);
  });

  it("draws every arrow from the tube it leaves to the tube it enters", () => {
    const x = (id: string) => TUBES.find((t) => t.id === id)!.x;
    for (const e of EXCHANGES) {
      if (e.from !== "interstitium") expect(Math.abs(e.x1 - x(e.from))).toBeLessThanOrEqual(8);
      if (e.to !== "interstitium") expect(Math.abs(e.x2 - x(e.to))).toBeLessThanOrEqual(8);
      if (e.from !== "interstitium") expect(Math.abs(e.x2 - x(e.from))).toBeGreaterThan(Math.abs(e.x1 - x(e.from)));
    }
  });
});

describe("cardiac conduction and the ECG (nzobf-nodal-tissue, nzobf-ecg)", () => {
  it("follows the conduction path in order, with the bundle of His as the concept defines it", () => {
    expect([...PATHWAY]).toEqual(["SA node", "AV node", "AV bundle", "right and left bundles", "Purkinje fibres"]);
    expect([...BUNDLE_OF_HIS]).toEqual(["right and left bundles", "Purkinje fibres"]);
    expect(CONDUCTION_STEPS.map((s) => s.title)).toEqual(["SA node fires", "AV node", "AV bundle", "Bundle of His", "T wave", "T-P gap"]);
  });

  it("puts both nodes in the right atrium: SAN in its right upper corner, AVN in its lower left corner by the AV septum", () => {
    const inRA = (p: { x: number; y: number }) =>
      p.x > RIGHT_ATRIUM.x && p.x < RIGHT_ATRIUM.x + RIGHT_ATRIUM.w && p.y > RIGHT_ATRIUM.y && p.y < RIGHT_ATRIUM.y + RIGHT_ATRIUM.h;
    expect(inRA(SA_NODE)).toBe(true);
    expect(inRA(AV_NODE)).toBe(true);
    // Drawn from the front: the right atrium is on the reader's left, so its own right is the reader's left.
    expect(RIGHT_ATRIUM.x).toBeLessThan(LEFT_ATRIUM.x);
    const midX = RIGHT_ATRIUM.x + RIGHT_ATRIUM.w / 2;
    const midY = RIGHT_ATRIUM.y + RIGHT_ATRIUM.h / 2;
    expect(SA_NODE.x).toBeLessThan(midX);
    expect(SA_NODE.y).toBeLessThan(midY);
    expect(AV_NODE.x).toBeGreaterThan(midX);
    expect(AV_NODE.y).toBeGreaterThan(midY);
    expect(AV_SEPTUM_Y - AV_NODE.y).toBeLessThanOrEqual(12);
  });

  it("takes the AV bundle to the top of the inter-ventricular septum, then a bundle down each side, then the Purkinje fibres", () => {
    expect(SPLIT.x).toBe(IV_SEPTUM_X);
    expect(SPLIT.y).toBeGreaterThan(AV_SEPTUM_Y);
    for (const p of RIGHT_BUNDLE) expect(p.x).toBeLessThan(IV_SEPTUM_X);
    for (const p of LEFT_BUNDLE) expect(p.x).toBeGreaterThan(IV_SEPTUM_X);
    expect(PURKINJE_RIGHT[0]).toEqual(RIGHT_BUNDLE[RIGHT_BUNDLE.length - 1]);
    expect(PURKINJE_LEFT[0]).toEqual(LEFT_BUNDLE[LEFT_BUNDLE.length - 1]);
  });

  it("moves the impulse SAN, AVN, septum, then out to both ventricles", () => {
    expect(dist(impulsePose(0, 0), SA_NODE)).toBe(0);
    expect(dist(impulsePose(1, 1), AV_NODE)).toBe(0);
    expect(dist(impulsePose(2, 0), SPLIT)).toBe(0);
    expect(impulsePose(3, 0).x).toBeLessThan(IV_SEPTUM_X);
    expect(impulsePose(3, 1).x).toBeGreaterThan(IV_SEPTUM_X);
  });

  it("draws each ECG wave when its chambers are excited, in the order P, QRS, T, T-P gap", () => {
    expect(ecgShown(0)).toEqual(["P"]);
    expect(ecgShown(2)).toEqual(["P"]);
    expect(ecgShown(3)).toEqual(["P", "QRS"]);
    expect(ecgShown(4)).toEqual(["P", "QRS", "T"]);
    expect(ecgShown(5)).toEqual(["P", "QRS", "T", "gap"]);
    for (let i = 1; i < ECG_PARTS.length; i++) expect(ECG_PARTS[i].from).toBeGreaterThanOrEqual(ECG_PARTS[i - 1].to);
  });

  it("labels each part with what the concept says it marks", () => {
    const marks = Object.fromEntries(ECG_PARTS.map((p) => [p.id, p.marks]));
    expect(marks).toEqual({
      P: "atria depolarise",
      QRS: "ventricles depolarise",
      T: "ventricles repolarise",
      gap: "electrically silent",
    });
    const h = ECG_HEIGHTS as Record<string, number>;
    for (const k of ["P", "T", "Q", "S"]) expect(h.R).toBeGreaterThan(Math.abs(h[k]));
  });

  it("gives the SAN's rate as 70 to 75 and calls only the SAN the pacemaker", () => {
    expect(CONDUCTION_STEPS[0].caption).toMatch(/70 to 75 per minute/);
    expect(CONDUCTION_STEPS[0].caption).toMatch(/SA node, the pacemaker/);
    for (const s of CONDUCTION_STEPS.slice(1)) expect(s.caption).not.toMatch(/pacemaker/);
  });
});

describe("menstrual cycle (nzohr-cycle-phases)", () => {
  it("uses the concept's days: menstrual 1 to 5, follicular 6 to 13, ovulation about day 14, luteal 15 to 28", () => {
    expect(PHASES.map((p) => [p.id, p.firstDay, p.lastDay])).toEqual([
      ["menstrual", 1, 5],
      ["follicular", 6, 13],
      ["ovulatory", 14, 14],
      ["luteal", 15, 28],
    ]);
    for (let i = 1; i < PHASES.length; i++) expect(PHASES[i].firstDay).toBe(PHASES[i - 1].lastDay + 1);
    expect(PHASES[PHASES.length - 1].lastDay).toBe(CYCLE_DAYS);
    expect(PHASES.find((p) => p.id === "follicular")?.sub).toBe("(proliferative)");
    expect(PHASES.find((p) => p.id === "luteal")?.sub).toBe("(secretory)");
  });

  const argmax = (f: (t: number) => number, from = 0, to = CYCLE_DAYS) => {
    let best = from;
    for (let t = from; t <= to; t += 0.05) if (f(t) > f(best)) best = t;
    return best;
  };

  it("peaks LH and FSH together in day 14, LH the higher (the LH surge)", () => {
    expect(OVULATION_T).toBeGreaterThan(13);
    expect(OVULATION_T).toBeLessThan(14);
    for (const f of [HORMONES.LH, HORMONES.FSH]) {
      const t = argmax(f);
      expect(t).toBeGreaterThanOrEqual(13);
      expect(t).toBeLessThanOrEqual(14);
    }
    expect(HORMONES.LH(OVULATION_T)).toBeGreaterThan(HORMONES.FSH(OVULATION_T));
    expect(HORMONES.LH(OVULATION_T)).toBeLessThanOrEqual(1);
  });

  it("raises LH, FSH and estrogens gradually through the follicular phase", () => {
    for (const f of [HORMONES.LH, HORMONES.FSH]) expect(f(12)).toBeGreaterThan(f(5.5));
    expect(HORMONES.estrogens(12.5)).toBeGreaterThan(HORMONES.estrogens(5) + 0.3);
  });

  it("makes progesterone the luteal hormone, falling as the corpus luteum degenerates", () => {
    const t = argmax(HORMONES.progesterone);
    expect(t).toBeGreaterThan(14);
    expect(HORMONES.progesterone(21)).toBeGreaterThan(HORMONES.estrogens(21));
    expect(HORMONES.progesterone(21)).toBeGreaterThan(5 * HORMONES.progesterone(10));
    expect(HORMONES.progesterone(27.9)).toBeLessThan(HORMONES.progesterone(21) / 2);
  });

  it("orders the ovary: follicles, Graafian follicle, ovum at ovulation, corpus luteum, degeneration", () => {
    for (let i = 1; i < OVARY.length; i++) expect(OVARY[i].t).toBeGreaterThan(OVARY[i - 1].t);
    const t = (id: string) => OVARY.find((e) => e.id === id)!.t;
    expect(t("graafian")).toBeLessThan(OVULATION_T);
    expect(t("ovum")).toBe(OVULATION_T);
    expect(t("corpus-luteum")).toBeGreaterThan(OVULATION_T);
    expect(OVARY.map((e) => e.label).filter(Boolean)).toEqual([
      "primary follicles",
      "Graafian follicle",
      "ovum released",
      "corpus luteum",
      "degenerates",
    ]);
  });

  it("drops estrogens after the mid-cycle peak, then gives them a smaller luteal rise that falls by day 28", () => {
    const e = HORMONES.estrogens;
    expect(e(16.5)).toBeLessThan(e(21));
    expect(e(21)).toBeLessThan(e(13));
    expect(e(27.9)).toBeLessThan(e(21) / 2);
    expect(argmax(e, 15, CYCLE_DAYS)).toBeGreaterThan(17);
    expect(argmax(e, 15, CYCLE_DAYS)).toBeLessThan(26);
    for (const f of [HORMONES.LH, HORMONES.FSH]) expect(f(21)).toBeLessThan(f(OVULATION_T) / 3);
  });

  it("breaks the endometrium down, regenerates it, then maintains it", () => {
    expect(endometrium(5)).toBeLessThan(endometrium(0));
    expect(endometrium(13)).toBeGreaterThan(endometrium(5));
    expect(endometrium(20)).toBeGreaterThanOrEqual(endometrium(13));
  });
});

describe("neuron structure (nzonc-neuron)", () => {
  it("puts a node of Ranvier in each gap between two adjacent myelin sheaths, along the axon", () => {
    const nodes = nodesOfRanvier();
    expect(nodes).toHaveLength(MYELIN.length - 1);
    for (const n of nodes) expect(n.to).toBeGreaterThan(n.from);
    for (const m of MYELIN) {
      expect(m.from).toBeGreaterThanOrEqual(AXON_START);
      expect(m.to).toBeLessThanOrEqual(AXON_END);
    }
  });

  it("puts Nissl's granules in the cell body and in the dendrites", () => {
    for (const n of NISSL) {
      const d = dist(n, BODY);
      if (n.where === "cell body") expect(d).toBeLessThan(BODY.r);
      else expect(d).toBeGreaterThan(BODY.r);
    }
    expect(NISSL.some((n) => n.where === "dendrite")).toBe(true);
  });

  it("starts each dendrite at the cell body and ends the axon in synaptic knobs", () => {
    for (const d of DENDRITES) expect(dist(d.main[0], BODY)).toBeLessThanOrEqual(BODY.r + 3);
    for (const k of KNOBS) expect(k.x).toBeGreaterThan(AXON_END);
  });

  it("uses the concept's names and no others", () => {
    expect([...PART_LABELS]).toEqual(
      expect.arrayContaining(["Dendrites", "Cell body", "Nissl's granules", "Axon", "Myelin sheath", "Node of Ranvier", "Synaptic knob"]),
    );
    for (const l of PART_LABELS) expect(l).not.toMatch(/cyton|hillock/i);
  });

  it("draws the three types by their axons and dendrites, where the concept places them", () => {
    expect(NEURON_TYPES.map((t) => [t.name, t.axons, t.place])).toEqual([
      ["Multipolar", 1, "cerebral cortex"],
      ["Bipolar", 1, "retina"],
      ["Unipolar", 1, "embryonic stage"],
    ]);
    expect(NEURON_TYPES[0].dendrites).toBeGreaterThanOrEqual(2);
    expect(NEURON_TYPES[1].dendrites).toBe(1);
    expect(NEURON_TYPES[2].dendrites).toBe(0);
  });
});

describe("prophase I of meiosis (nbocc-prophase)", () => {
  const pose = (step: number, id: string) => chromatidPose(step, CHROMATIDS.findIndex((c) => c.id === id));

  it("walks the five substages in order", () => {
    expect(PROPHASE_STEPS.map((s) => s.title)).toEqual(["Leptotene", "Zygotene", "Pachytene", "Diplotene", "Diakinesis"]);
  });

  it("crosses over between non-sister chromatids of the homologous pair", () => {
    const parent = (id: string) => CHROMATIDS.find((c) => c.id === id)!.parent;
    expect(parent(CROSSOVER[0])).not.toBe(parent(CROSSOVER[1]));
  });

  it("keeps the homologues apart in leptotene and pairs them with the synaptonemal complex in zygotene", () => {
    expect(Math.abs(pose(0, "m1").pivot.x - pose(0, "p1").pivot.x)).toBeGreaterThanOrEqual(40);
    expect(Math.abs(pose(1, "m1").pivot.x - pose(1, "p1").pivot.x)).toBeLessThanOrEqual(20);
    expect([0, 1, 2, 3, 4].map(synaptonemalOpacity)).toEqual([0, 1, 1, 0, 0]);
  });

  it("shows the four chromatids distinct only from pachytene", () => {
    expect(pose(1, "m1").pivot).toEqual(pose(1, "m2").pivot);
    expect(new Set(CHROMATIDS.map((_, i) => chromatidPose(2, i).pivot.x)).size).toBe(4);
  });

  it("shows recombination nodules in pachytene only, with recombination complete by its end", () => {
    expect([0, 1, 2, 3, 4].map(noduleOpacity)).toEqual([0, 0, 1, 0, 0]);
    expect([0, 1, 2, 3, 4].map(swapped)).toEqual([false, false, true, true, true]);
  });

  it("holds the homologues together only at the X-shaped chiasma in diplotene", () => {
    expect(pose(3, "m2").pivot).toEqual(CHIASMA);
    expect(pose(3, "p1").pivot).toEqual(CHIASMA);
    expect(dist(pose(3, "m1").pivot, CHIASMA)).toBeGreaterThan(0);
    for (const arm of ["top", "bottom"] as const) {
      expect(dist(armEnd(pose(3, "m2"), arm), armEnd(pose(3, "p1"), arm))).toBeGreaterThan(10);
    }
    // The X: each crossed chromatid goes to the other side beyond the chiasma.
    expect(armEnd(pose(3, "m2"), "bottom").x).toBeLessThan(CENTER_X);
    expect(armEnd(pose(3, "m2"), "top").x).toBeGreaterThan(CENTER_X);
    expect(armEnd(pose(3, "p1"), "top").x).toBeLessThan(CENTER_X);
  });

  it("terminalises the chiasma in diakinesis: the homologues held at their ends, fully condensed", () => {
    const m2Top = armEnd(pose(4, "m2"), "top");
    const p1Top = armEnd(pose(4, "p1"), "top");
    expect(dist(m2Top, p1Top)).toBeLessThanOrEqual(6);
    expect(dist(m2Top, APEX)).toBeLessThanOrEqual(4);
    expect(dist(armEnd(pose(4, "m2"), "bottom"), armEnd(pose(4, "p1"), "bottom"))).toBeGreaterThan(30);
    const thick = [0, 1, 2, 3, 4].map((s) => chromatidPose(s, 0).thickness);
    for (let i = 1; i < thick.length; i++) expect(thick[i]).toBeGreaterThan(thick[i - 1]);
  });

  it("loses the nucleolus and nuclear envelope and assembles the spindle only in diakinesis", () => {
    expect([0, 1, 2, 3, 4].map(nucleolusOpacity)).toEqual([1, 1, 1, 1, 0]);
    expect(envelopeOpacity(3)).toBe(1);
    expect(envelopeOpacity(4)).toBeLessThan(1);
    expect([0, 1, 2, 3, 4].map(spindleOpacity)).toEqual([0, 0, 0, 0, 1]);
  });
});

describe("chemiosmosis in the thylakoid (nbops-chemiosmosis)", () => {
  it("embeds CF₀ in the membrane and puts CF₁ and NADP reductase on the stroma side", () => {
    const { cf0, cf1, nadpReductase, psII, psI } = PARTS;
    expect(sideOf(cf0.y, cf0.y + cf0.h)).toBe("membrane");
    expect(sideOf(cf1.cy - cf1.r, cf1.cy + cf1.r)).toBe("stroma");
    expect(sideOf(nadpReductase.y, nadpReductase.y + nadpReductase.h)).toBe("stroma");
    expect(sideOf(psII.y, psII.y + psII.h)).toBe("membrane");
    expect(sideOf(psI.y, psI.y + psI.h)).toBe("membrane");
    expect(cf1.cx).toBe(cf0.x + cf0.w / 2);
  });

  it("builds the gradient the concept's three ways and lets protons out only through CF₀", () => {
    expect(PROTON_MOVES.map((m) => [m.by, m.from, m.to])).toEqual([
      ["water splitting", "water", "lumen"],
      ["electron carrier", "stroma", "lumen"],
      ["NADP reductase", "stroma", "NADPH"],
      ["CF₀", "lumen", "stroma"],
    ]);
    expect(PROTON_MOVES.filter((m) => m.from === "lumen").map((m) => m.by)).toEqual(["CF₀"]);
  });

  it("piles protons up in the lumen, with few in the stroma", () => {
    expect(LUMEN_H.length).toBeGreaterThan(3 * STROMA_H.length);
    for (const h of LUMEN_H) expect(h.y).toBeGreaterThan(MEMBRANE.bottom);
    for (const h of STROMA_H) expect(h.y).toBeLessThan(MEMBRANE.top);
  });

  it("speaks of a proton gradient, never an electron gradient", () => {
    for (const m of PROTON_MOVES) expect(m.effect).not.toMatch(/electron gradient/);
  });
});
