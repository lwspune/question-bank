import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/current-electricity";

export const KIRCHHOFF_NOTE: SubtopicNote = {
  subtopicName: "Kirchhoff's Laws and Circuit Analysis",
  title: "Kirchhoff's Current and Voltage Laws",
  oneLineDefinition:
    "At any junction the current flowing in equals the current flowing out (Kirchhoff's first law, conservation of charge), and round any closed loop the e.m.f.s add up to the voltage drops (the second law, conservation of energy); between them they solve any network of cells and resistors.",
  whyItMatters:
    "19 PYQs, 3 HARD, nearly all read from a circuit diagram. Eight are the junction law — the missing current at a point where several wires meet, and which conservation law each rule rests on; eleven are the loop law — the current in a loop with opposing cells, the potential difference between two points along a branch, two cells sharing a resistor, and the value of R that stops the current in a galvanometer. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ce-kcl",
      name: "The Junction Law",
      intuition:
        "Charge does not pile up at a junction, so whatever flows in must flow out: ΣI_in = ΣI_out. With several wires meeting at a point, add the arrows pointing in, add those pointing out, and the difference is the missing current — in the direction that balances them. In a network, walk from junction to junction carrying the running total. The first law is conservation of charge; the second, the loop law, is conservation of energy.",
      definition:
        "- \\(\\sum I_{\\text{in}} = \\sum I_{\\text{out}}\\) at every junction.\n" +
        "- In 10 + 2.5 + 5 A, out 6 A ⇒ the fifth wire carries **11.5 A outward**.\n" +
        "- Walk a network node by node: 20 A in, 15 A down one side ⇒ 5 A along; add 3 A ⇒ 8 A; ... the last node collects 18 A.\n" +
        "- **First law** ⇒ conservation of **charge**; **second law** ⇒ conservation of **energy**.",
      formula: {
        label: "Junction law",
        latex: "\\sum I_{\\text{in}} = \\sum I_{\\text{out}}",
      },
      authoredExample: {
        prompt: "At a junction, 3 A and 7 A flow in; 4 A and 1.5 A flow out along two wires. The fifth wire's current?",
        steps: ["In 10 A, out 5.5 A so far.", "The fifth wire carries 4.5 A out."],
        answer: "4.5 A outward",
      },
      selfCheckExample: {
        prompt: "5 A and 4 A flow into P; 5 A and 3 A flow out. Current in PQ?",
        steps: ["9 in, 8 out."],
        answer: "1 A from P to Q",
      },
      practiceSet: [
        { prompt: "Kirchhoff's voltage and current laws rest on conservation of?", answer: "Energy, charge" },
        { prompt: "2 A and 4 A flow into a line that then loses 1 A and 2 A. Remaining current I?", answer: "3 A" },
      ],
      pyqExampleId: "6341c22a-23d8-45ad-a10c-fcdecf9b8b32",
      traps: [
        {
          title: "Swapping the conservation laws",
          body:
            "The JUNCTION law conserves charge; the LOOP law conserves energy. 'Kirchhoff's second law' is the loop law.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ce-kvl",
      name: "The Loop Law and Potential Differences",
      intuition:
        "Walk round a loop and add the changes: through a resistor in the direction of the current the potential falls by IR; through a cell from − to + it rises by E. The total is zero. For the potential difference between two points on a branch, walk from A to B: V_A − V_B = sum of the drops on the way (IR for each resistor, E for each cell entered at its + end). Two cells opposing each other in one loop drive (E₁ − E₂)/R_total. When a branch with its own cell carries no current (a balanced galvanometer), that cell's e.m.f. equals the drop across the resistor it sits across.",
      definition:
        "- Round a loop: \\(\\sum E = \\sum IR\\).\n" +
        "- **Opposing cells**: \\(I = \\dfrac{E_1 - E_2}{R_{\\text{total}}}\\) (200 V against 10 V with 38 Ω ⇒ 5 A; 100 V against 5 V with 19 Ω ⇒ 5 A).\n" +
        "- **Along a branch**: \\(V_A - V_B = \\sum IR + \\sum E\\) for cells entered at +: 2 A through 2 Ω, a 3 V cell, 1 Ω ⇒ 9 V; 3 A through 4 Ω, 5 V, 2 Ω ⇒ 23 V.\n" +
        "- **Galvanometer null**: \\(\\dfrac{10R}{4 + R} = 6\\) ⇒ R = 6 Ω.\n" +
        "- **Equal parallel sources** feeding a load: combine to one source (3 V, 3 Ω twice ⇒ 3 V, 1.5 Ω; through 6 Ω ⇒ 0.4 A).",
      formula: {
        label: "Loop law",
        latex: "\\sum E = \\sum IR",
      },
      authoredExample: {
        prompt: "A 12 V cell and a 4 V cell oppose each other in a loop with 1 Ω, 1 Ω internal resistances and a 6 Ω resistor. Current, and the voltage across the 6 Ω?",
        steps: ["I = (12 − 4)/(1 + 1 + 6) = 1 A.", "V = 1 × 6 = 6 V."],
        answer: "1 A; 6 V",
      },
      selfCheckExample: {
        prompt: "Cells of 4 V (1 Ω) and 8 V (2 Ω) oppose in a loop with 9 Ω. Current and the p.d. across the 9 Ω?",
        steps: ["(8 − 4)/12 = 1/3 A."],
        answer: "1/3 A; 3 V",
      },
      practiceSet: [
        { prompt: "Cells 200 V and 10 V opposing, 38 Ω. Current?", answer: "5 A" },
        { prompt: "A→B: 3 A through 4 Ω, a 5 V cell entered at +, 2 Ω. V_A − V_B?", answer: "23 V" },
      ],
      pyqExampleId: "ba3553b2-34b6-4c2b-bf99-144adab2f66a",
      traps: [
        {
          title: "Getting the sign of a cell wrong along a branch",
          body:
            "Going from A to B, a cell entered at its + terminal is a DROP of E; entered at − it is a rise. Draw the path and mark each sign before adding.",
        },
      ],
    },
  ],
  related: [
    { label: "Cells — e.m.f. and internal resistance", href: `${BASE}/cetp-ce-cells` },
    { label: "Bridges — Kirchhoff's laws at balance", href: `${BASE}/cetp-ce-bridges` },
  ],
};
