import { describe, expect, it } from "vitest";
import {
  CHROMOSOMES,
  COUNTS,
  MEIOSIS_STEPS,
  cellsAt,
  chromatidPose,
  countLabel as meiosisLabel,
  meiosisCounts,
} from "../src/app/notes/_components/visualizations/ImatMeiosisCounts";
import {
  FORK_STEPS,
  STRANDS,
  armPoint,
  builtAt,
  type Strand,
} from "../src/app/notes/_components/visualizations/ImatReplicationFork";
import {
  CODING,
  ENDS,
  MADE,
  MRNA,
  POLYMERASE_AT,
  TEMPLATE,
  TRANSCRIPTION_STEPS,
  dnaComplement,
  isOpen,
  rnaBase,
  rnaComplement,
} from "../src/app/notes/_components/visualizations/ImatTranscription";
import {
  CHAIN,
  CODONS,
  P_SITE_AT,
  TRANSLATION_STEPS,
  TRNA_STATES,
  aminoAcidPose,
} from "../src/app/notes/_components/visualizations/ImatTranslation";
import {
  ACTIVE_STAGE,
  CYCLES_DONE,
  PCR_STEPS,
  STAGES,
  copies,
  countLabel as pcrLabel,
} from "../src/app/notes/_components/visualizations/ImatPcrCycles";
import { LADDER, LANES, WELL_Y, bandY } from "../src/app/notes/_components/visualizations/ImatGelElectrophoresis";

// IMAT notes figures, task "biomol" (scripts/imat/NOTES_VISUALS_BRIEF.md).
// Each block pins what makes its figure TRUE: the concept's numbers, the order
// of events and the base pairing, not pixel positions for their own sake.

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
const sides = [0, 1] as const;

describe("IMAT meiosis counts (imat-cdr-meiosis-numbers)", () => {
  it("walks the stages the concept counts, in order", () => {
    expect(MEIOSIS_STEPS.map((s) => s.title)).toEqual([
      "After S phase",
      "Prophase I",
      "Metaphase I",
      "Telophase I",
      "Metaphase II",
      "Telophase II",
    ]);
  });

  it("gives the worked example's numbers for 2n = 14", () => {
    const c = meiosisCounts(14);
    // After S phase: 14 chromosomes, 28 chromatids, 4c.
    expect([c[0].chromosomes, c[0].chromatids, c[0].dna]).toEqual([14, 28, 4]);
    // After meiosis I: 2 cells of 7 chromosomes, 14 chromatids, 2c.
    expect([c[3].cells, c[3].chromosomes, c[3].chromatids, c[3].dna]).toEqual([2, 7, 14, 2]);
    // After meiosis II: 4 cells of 7 chromosomes, 7 chromatids, 1c.
    expect([c[5].cells, c[5].chromosomes, c[5].chromatids, c[5].dna]).toEqual([4, 7, 7, 1]);
  });

  it("gives the self-check's metaphase II answer for 2n = 24 (12 chromosomes, 24 chromatids)", () => {
    const m2 = meiosisCounts(24)[4];
    expect([m2.chromosomes, m2.chromatids]).toEqual([12, 24]);
  });

  it("follows 2n, 4c → n, 2c → n, 1c, with c = one unreplicated set (n chromatids)", () => {
    expect(COUNTS.map((c) => `${c.ploidy},${c.dna}c`)).toEqual(["2n,4c", "2n,4c", "2n,4c", "n,2c", "n,2c", "n,1c"]);
    for (const c of COUNTS) expect(c.dna * 2).toBe(c.chromatids); // n = 2
    // The four cells together hold 4n = 8 chromosomes, double the original 2n.
    expect(COUNTS[5].cells * COUNTS[5].chromosomes).toBe(8);
  });

  it("prints the counts as labels", () => {
    expect(meiosisLabel(COUNTS[0])).toBe("The cell: 2n = 4 · 8 chromatids · 4c");
    expect(meiosisLabel(COUNTS[3])).toBe("Each of 2 cells: n = 2 · 4 chromatids · 2c");
    expect(meiosisLabel(COUNTS[5])).toBe("Each of 4 cells: n = 2 · 2 chromatids · 1c");
  });

  it("draws in each cell exactly the chromatids and chromosomes the label counts", () => {
    for (let step = 0; step < MEIOSIS_STEPS.length; step++) {
      const cells = cellsAt(step);
      expect(cells).toHaveLength(COUNTS[step].cells);
      const inCell = cells.map(() => [] as { i: number; side: number }[]);
      for (let i = 0; i < CHROMOSOMES.length; i++) {
        for (const side of sides) {
          const p = chromatidPose(step, i, side);
          const d = cells.map((c) => dist(c, p));
          const k = d.indexOf(Math.min(...d));
          expect(d[k]).toBeLessThan(step <= 2 ? 60 : step <= 4 ? 50 : 24);
          inCell[k].push({ i, side });
        }
      }
      for (const group of inCell) {
        expect(group).toHaveLength(COUNTS[step].chromatids);
        expect(new Set(group.map((g) => g.i)).size).toBe(COUNTS[step].chromosomes);
        if (step >= 3) {
          // Haploid: one chromosome of each homologous pair.
          expect(group.map((g) => CHROMOSOMES[g.i].pair).sort()).toEqual(
            step === 5 ? ["long", "short"] : ["long", "long", "short", "short"],
          );
        }
      }
    }
  });

  it("keeps sister chromatids together until anaphase II", () => {
    for (const step of [0, 1, 2, 3, 4]) for (let i = 0; i < 4; i++) expect(dist(chromatidPose(step, i, 0), chromatidPose(step, i, 1))).toBeLessThanOrEqual(6);
  });

  it("lines up PAIRS on the equator in metaphase I: homologues face opposite poles", () => {
    const side = (i: number) => Math.sign(chromatidPose(2, i, 0).x - 160);
    for (let i = 0; i < 4; i++) {
      expect(Math.sign(chromatidPose(2, i, 1).x - 160)).toBe(side(i));
      for (const s of sides) expect(Math.abs(chromatidPose(2, i, s).x - 160)).toBeLessThanOrEqual(10);
    }
    expect(side(0)).toBe(-side(1)); // the long pair
    expect(side(2)).toBe(-side(3)); // the short pair
  });

  it("lines up chromosomes SINGLY in metaphase II, sisters facing opposite poles", () => {
    for (let i = 0; i < 4; i++) {
      const up = chromatidPose(4, i, 0);
      const down = chromatidPose(4, i, 1);
      expect(Math.abs(up.y - 120)).toBeLessThanOrEqual(3);
      expect(up.y).toBeLessThan(120);
      expect(down.y).toBeGreaterThan(120);
    }
  });

  it("says there is no S phase between the divisions", () => {
    expect(MEIOSIS_STEPS[4].caption).toMatch(/no S phase/);
  });
});

describe("IMAT replication fork (imat-mol-leading-lagging)", () => {
  const titles = FORK_STEPS.map((s) => s.title);
  const templateOf = (s: Strand) => STRANDS.find((t) => t.kind === "template" && t.arm === s.arm)!;
  const made = STRANDS.filter((s) => s.kind !== "template");

  it("opens the fork, primes, builds leading then lagging, then joins", () => {
    expect(titles.indexOf("Helicase opens the fork")).toBeLessThan(titles.indexOf("Primase makes RNA primers"));
    expect(titles.indexOf("Primase makes RNA primers")).toBeLessThan(titles.indexOf("Leading strand"));
    expect(titles.indexOf("Leading strand")).toBeLessThan(titles.indexOf("Lagging strand"));
    expect(titles[titles.length - 1]).toBe("Fragments joined");
    expect(FORK_STEPS[5].caption).toMatch(/DNA ligase/);
  });

  it("has antiparallel parent strands", () => {
    const [top, bottom] = STRANDS.filter((s) => s.kind === "template");
    expect(Math.sign(top.three - top.five)).toBe(-Math.sign(bottom.three - bottom.five));
  });

  it("builds every new strand 5′→3′, antiparallel to its template", () => {
    for (const s of made) {
      const t = templateOf(s);
      // New strand runs 5′→3′ towards the template's 5′ end.
      expect(Math.sign(s.three - s.five)).toBe(Math.sign(t.five - t.three));
    }
  });

  it("grows the leading strand towards the fork (d = 0) and each Okazaki fragment away from it", () => {
    const leading = made.filter((s) => s.kind === "leading");
    expect(leading).toHaveLength(1);
    expect(leading[0].three).toBeLessThan(leading[0].five);
    const frags = made.filter((s) => s.kind === "okazaki");
    expect(frags.length).toBeGreaterThanOrEqual(3);
    for (const f of frags) expect(f.three).toBeGreaterThan(f.five);
  });

  it("puts the lagging fragments end to end with only a small gap for ligase to seal", () => {
    const frags = made.filter((s) => s.kind === "okazaki").sort((a, b) => a.five - b.five);
    for (let k = 1; k < frags.length; k++) {
      const gap = frags[k].five - frags[k - 1].three;
      expect(gap).toBeGreaterThan(0);
      expect(gap).toBeLessThanOrEqual(4);
    }
  });

  it("makes the leading strand before the lagging fragments", () => {
    const leading = made.find((s) => s.kind === "leading")!;
    const frag = made.find((s) => s.kind === "okazaki")!;
    expect(builtAt(leading, 2)).toBe(false);
    expect(builtAt(leading, 3)).toBe(true);
    expect(builtAt(frag, 3)).toBe(false);
    expect(builtAt(frag, 4)).toBe(true);
  });

  it("draws a straight helix when closed and a fork that widens away from the fork point when open", () => {
    const closed = armPoint("top", 100, 0, false);
    expect(closed.x).toBeCloseTo(100);
    expect(closed.y).toBeCloseTo(104);
    expect(armPoint("bottom", 100, 0, false).y).toBeCloseTo(116);
    const gap = (d: number) => armPoint("bottom", d, 0).y - armPoint("top", d, 0).y;
    expect(gap(150)).toBeGreaterThan(gap(50));
    expect(gap(50)).toBeGreaterThan(12);
  });

  it("puts each new strand on the inside of the fork, between the templates", () => {
    expect(armPoint("top", 100, -9).y).toBeGreaterThan(armPoint("top", 100, 0).y);
    expect(armPoint("bottom", 100, 9).y).toBeLessThan(armPoint("bottom", 100, 0).y);
  });
});

describe("IMAT transcription (imat-mol-transcription-steps)", () => {
  it("uses the notes' worked example: template 3′-TACCGGATT-5′", () => {
    expect(TEMPLATE).toBe("TACCGGATT");
    expect(MRNA).toBe("AUGGCCUAA");
    expect(CODING).toBe("ATGGCCTAA");
  });

  it("makes the mRNA as the complement of the template, U opposite A", () => {
    expect(rnaComplement(TEMPLATE)).toBe(MRNA);
    expect(rnaComplement("GCATTAC")).toBe("CGUAAUG"); // the concept's self-check
    for (let i = 0; i < TEMPLATE.length; i++) if (TEMPLATE[i] === "A") expect(MRNA[i]).toBe("U");
  });

  it("matches the coding strand with U for T", () => {
    expect(dnaComplement(TEMPLATE)).toBe(CODING);
    expect(CODING.replace(/T/g, "U")).toBe(MRNA);
    // Number of U in the mRNA = number of A in the template.
    expect([...MRNA].filter((b) => b === "U").length).toBe([...TEMPLATE].filter((b) => b === "A").length);
  });

  it("labels the ends antiparallel: template 3′ on the left, mRNA and coding strand 5′", () => {
    expect(ENDS.template).toEqual(["3′", "5′"]);
    expect(ENDS.mrna).toEqual(["5′", "3′"]);
    expect(ENDS.coding).toEqual(["5′", "3′"]);
  });

  it("moves the polymerase along the template towards its 5′ end, reading 3′→5′", () => {
    for (let s = 1; s < POLYMERASE_AT.length; s++) expect(POLYMERASE_AT[s]).toBeGreaterThan(POLYMERASE_AT[s - 1]);
    expect(POLYMERASE_AT[0]).toBeLessThan(0); // on the promoter, before the gene
  });

  it("grows the mRNA 5′→3′: the 5′ base first, never a gap", () => {
    expect(MADE[0]).toBe(0);
    expect(MADE[MADE.length - 1]).toBe(MRNA.length);
    for (let s = 0; s < MADE.length; s++) {
      if (s > 0) expect(MADE[s]).toBeGreaterThanOrEqual(MADE[s - 1]);
      for (let i = 1; i < MRNA.length; i++) if (rnaBase(s, i).made) expect(rnaBase(s, i - 1).made).toBe(true);
    }
  });

  it("pairs the RNA with the template only inside the open bubble", () => {
    for (let s = 0; s < TRANSCRIPTION_STEPS.length; s++) {
      for (let i = 0; i < MRNA.length; i++) if (rnaBase(s, i).paired) expect(isOpen(s, i)).toBe(true);
    }
  });

  it("releases the whole mRNA at termination, with the DNA closed again", () => {
    const last = TRANSCRIPTION_STEPS.length - 1;
    expect(TRANSCRIPTION_STEPS[last].title).toBe("Termination");
    for (let i = 0; i < MRNA.length; i++) {
      expect(rnaBase(last, i)).toMatchObject({ made: true, paired: false });
      expect(isOpen(last, i)).toBe(false);
    }
  });
});

describe("IMAT translation (imat-mol-translation-steps)", () => {
  // From the standard genetic code: AUG Met (start), CCN Pro, GAA/GAG Glu, UAA stop.
  const CODE: Record<string, string | null> = { AUG: "Met", CCU: "Pro", GAA: "Glu", UAA: null };
  const PAIR: Record<string, string> = { A: "U", U: "A", G: "C", C: "G" };

  it("reads AUG CCU GAA UAA with the standard genetic code", () => {
    expect(CODONS.map((c) => c.codon).join(" ")).toBe("AUG CCU GAA UAA");
    for (const c of CODONS) expect(c.aminoAcid).toBe(CODE[c.codon]);
    expect(CODONS[0].codon).toBe("AUG");
    expect(CODONS[CODONS.length - 1].aminoAcid).toBeNull();
  });

  it("gives each tRNA the anticodon that is its codon's complement (the concept's UAC GGA CUU)", () => {
    for (const c of CODONS.slice(0, 3)) expect(c.anticodon).toBe([...c.codon].map((b) => PAIR[b]).join(""));
    expect(CODONS.slice(0, 3).map((c) => c.anticodon).join(" ")).toBe("UAC GGA CUU");
    expect(CODONS[3].anticodon).toBe(""); // no tRNA reads a stop codon
  });

  it("starts with the initiator tRNA in the P site and ends with termination", () => {
    expect(TRANSLATION_STEPS[0].title).toBe("Initiation");
    expect(TRNA_STATES[0]).toEqual(["bound", "waiting", "waiting"]);
    expect(P_SITE_AT[0]).toBe(0);
    expect(TRANSLATION_STEPS[TRANSLATION_STEPS.length - 1].title).toBe("Termination");
  });

  it("moves the ribosome 5′→3′, one codon at a time", () => {
    for (let s = 1; s < P_SITE_AT.length; s++) expect([0, 1]).toContain(P_SITE_AT[s] - P_SITE_AT[s - 1]);
  });

  it("only binds tRNAs in the E, P and A sites, and never one on the stop codon", () => {
    TRNA_STATES.forEach((row, s) =>
      row.forEach((state, i) => {
        if (state === "bound") {
          expect(i).toBeGreaterThanOrEqual(P_SITE_AT[s]);
          expect(i).toBeLessThanOrEqual(P_SITE_AT[s] + 1);
        }
        if (state === "leaving") expect(i).toBe(P_SITE_AT[s] - 1); // from the E site
      }),
    );
    expect(TRNA_STATES[0]).toHaveLength(3);
  });

  it("brings the stop codon into the A site before termination", () => {
    const stop = CODONS.findIndex((c) => c.aminoAcid === null);
    expect(P_SITE_AT[5] + 1).toBe(stop);
    expect(TRANSLATION_STEPS[5].caption).toMatch(/release factor/);
  });

  it("grows the chain Met, Met-Pro, Met-Pro-Glu on the tRNA that holds it, then frees it", () => {
    const lengths = CHAIN.map((c) => (c ? c.length : null));
    expect(lengths).toEqual([1, 1, 2, 2, 3, 3, null]);
    CHAIN.forEach((c, s) => {
      if (c) expect(TRNA_STATES[s][c.holder]).toBe("bound");
    });
    const last = CHAIN.length - 1;
    const xs = [0, 1, 2].map((j) => aminoAcidPose(last, j).x);
    expect(xs[0]).toBeLessThan(xs[1]);
    expect(xs[1]).toBeLessThan(xs[2]); // N end (Met) on the left
  });
});

describe("IMAT PCR cycles (imat-mbt-pcr)", () => {
  it("runs denaturation, annealing, extension at the concept's temperatures", () => {
    expect(STAGES.map((s) => s.name)).toEqual(["Denaturation", "Annealing", "Extension"]);
    const [den, ann, ext] = STAGES;
    expect([den.min, den.max]).toEqual([95, 95]);
    expect([ann.min, ann.max]).toEqual([50, 65]);
    expect([ext.min, ext.max]).toEqual([72, 72]);
    // Annealing is the coolest step (the trap); denaturation the hottest.
    expect(ann.max).toBeLessThan(ext.min);
    expect(ext.max).toBeLessThan(den.min);
  });

  it("lights each step in turn, then the whole cycle as it repeats", () => {
    expect(ACTIVE_STAGE).toEqual([null, 0, 1, 2, "all", "all"]);
    expect(PCR_STEPS[1].title).toMatch(/95 °C/);
    expect(PCR_STEPS[2].title).toMatch(/50 to 65 °C/);
    expect(PCR_STEPS[3].title).toMatch(/72 °C/);
  });

  it("doubles the copies each cycle: 1 → 2 → 4 → 8", () => {
    expect(CYCLES_DONE).toEqual([0, 0, 0, 1, 2, 3]);
    expect(CYCLES_DONE.map((n) => copies(1, n))).toEqual([1, 1, 1, 2, 4, 8]);
    expect(pcrLabel(0)).toBe("Start: N₀ = 1 copy");
    expect(pcrLabel(3)).toBe("After 1 cycle: 2¹ = 2 copies");
    expect(pcrLabel(5)).toBe("After 3 cycles: 2³ = 8 copies");
  });

  it("matches the concept's worked numbers", () => {
    expect(copies(1, 25)).toBe(33_554_432); // ≈ 3.4 × 10⁷
    expect(copies(50, 10)).toBe(51_200); // ≈ 5.1 × 10⁴
    expect(copies(1, 4)).toBe(16);
  });
});

describe("IMAT gel electrophoresis (imat-mbt-gel)", () => {
  it("sends smaller fragments further from the wells", () => {
    const sizes = [1000, 800, 600, 400, 300, 200];
    for (let k = 1; k < sizes.length; k++) expect(bandY(sizes[k])).toBeGreaterThan(bandY(sizes[k - 1]));
    for (const lane of LANES) for (const s of lane.bands) expect(bandY(s)).toBeGreaterThan(WELL_Y + 6);
  });

  it("runs a ladder that brackets every sample band", () => {
    expect(LANES[0].ladder).toBe(true);
    expect(LANES[0].bands).toEqual(LADDER);
    const samples = LANES.slice(1).flatMap((l) => l.bands);
    expect(Math.min(...LADDER)).toBeLessThanOrEqual(Math.min(...samples));
    expect(Math.max(...LADDER)).toBeGreaterThanOrEqual(Math.max(...samples));
  });

  it("is a valid paternity result: every child band matches a parent, one from each", () => {
    const lane = (name: string) => LANES.find((l) => l.name === name)!;
    const mother = lane("Mother").bands;
    const father = lane("Father").bands;
    const child = lane("Child").bands;
    for (const b of child) expect(mother.includes(b) || father.includes(b)).toBe(true);
    expect(child.filter((b) => mother.includes(b))).toHaveLength(1);
    expect(child.filter((b) => father.includes(b))).toHaveLength(1);
  });
});
