import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/current-electricity";

export const POTENTIOMETER_NOTE: SubtopicNote = {
  subtopicName: "Potentiometer",
  title: "The Potentiometer",
  oneLineDefinition:
    "A steady current through a long uniform wire gives a constant potential drop per unit length, the potential gradient k; a cell connected against the wire balances at the length where kl equals its e.m.f., drawing no current, so the potentiometer measures e.m.f. directly and compares two cells by their balancing lengths.",
  whyItMatters:
    "18 PYQs, 5 of them HARD. Ten are the potential gradient — finding it when a series resistance shares the driving cell's voltage, the e.m.f. a length balances, and what happens to the null point when the wire is made longer. " +
    "Eight compare cells: the ratio of two e.m.f.s from their sum and difference, and a cell's internal resistance from the balancing lengths with two different shunts. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ce-potential-gradient",
      name: "Potential Gradient and the Balancing Length",
      intuition:
        "The driving cell sends a current I through the wire, whose resistance is R_w over its length L. The drop across the wire is IR_w, and it is spread evenly, so k = IR_w/L volts per metre. When a resistance sits in series with the wire, it takes its share of the driving voltage first: I = E/(R_w + R + r). A test cell of e.m.f. E′ balances at l = E′/k. Make the wire longer at the same voltage across it and k falls, so every balancing length grows in proportion. At balance the test cell carries no current, which is why the potentiometer reads e.m.f., not terminal voltage.",
      definition:
        "- \\(k = \\dfrac{V_{\\text{wire}}}{L} = \\dfrac{I R_w}{L}\\), with \\(I = \\dfrac{E}{R_w + R + r}\\).\n" +
        "- A cell balances at \\(l = \\dfrac{E'}{k}\\).\n" +
        "- **Wire lengthened**, same voltage across it: k falls, balancing length grows in proportion (L/5 on L ⇒ 3L/10 on 3L/2).\n" +
        "- Resistance per unit length given: \\(I = \\dfrac{E'}{l \\cdot (R/L)}\\).\n" +
        "- At balance the test cell draws **no current**: the reading is its e.m.f.",
      formula: {
        label: "Potential gradient",
        latex: "k = \\frac{E}{R_w + R + r} \\cdot \\frac{R_w}{L}, \\qquad E' = kl",
      },
      authoredExample: {
        prompt: "A 4 m wire of 8 Ω is driven by a 2 V cell through a 2 Ω resistor (no internal resistance). Gradient, and the e.m.f. balanced at 2.5 m?",
        steps: ["I = 2/(8 + 2) = 0.2 A; V across wire = 1.6 V.", "k = 1.6/4 = 0.4 V/m; E′ = 0.4 × 2.5 = 1.0 V."],
        answer: "0.4 V/m; 1.0 V",
      },
      selfCheckExample: {
        prompt: "A 6 m wire has 3 V across it. A cell balances at 150 cm. Its e.m.f.?",
        steps: ["k = 0.5 V/m; E′ = 0.5 × 1.5."],
        answer: "0.75 V",
      },
      practiceSet: [
        { prompt: "A 1 m wire in series with 495 Ω and a 2 V cell has a gradient of 0.2 mV/cm. Resistance of the wire?", answer: "5 Ω" },
        { prompt: "The wire is lengthened at the same voltage across it. The null point?", answer: "Moves to a larger distance" },
      ],
      pyqExampleId: "1028c835-e77b-4d2a-af42-57a34cefd1d1",
      traps: [
        {
          title: "Forgetting the series resistance in the gradient",
          body:
            "When a resistance is in series with the wire, only the wire's share of the driving voltage sets k. Find I from the whole circuit first, then k = IR_w/L.",
        },
        {
          title: "Thinking a longer wire moves the null point closer",
          body:
            "At the same voltage a longer wire has a smaller gradient, so a cell needs MORE length to balance. The null point moves further along.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ce-compare-emf-internal-r",
      name: "Comparing E.m.f.s and Finding Internal Resistance",
      intuition:
        "Balancing lengths are proportional to the e.m.f. balanced. Two cells assisting each other balance at l₁ ∝ E₁ + E₂; opposing, at l₂ ∝ E₁ − E₂. Divide: E₁/E₂ = (l₁ + l₂)/(l₁ − l₂). For internal resistance, the cell alone balances at l₀ ∝ E; shunted by R it drives a current and its terminal voltage ER/(R + r) balances at l, so r = R(l₀ − l)/l. If l₀ is not given, two shunts R₁ and R₂ give two equations: l ∝ ER/(R + r), and the ratio of the two eliminates E.",
      definition:
        "- **Sum and difference**: \\(\\dfrac{E_1}{E_2} = \\dfrac{l_1 + l_2}{l_1 - l_2}\\) (64 cm and 32 cm ⇒ 3:1).\n" +
        "- **One cell, then opposed**: \\(\\dfrac{E_1}{E_2} = \\dfrac{l_1}{l_1 - l_2}\\).\n" +
        "- **Internal resistance**: \\(r = R\\,\\dfrac{l_0 - l}{l}\\).\n" +
        "- **Two shunts**: \\(\\dfrac{l_1}{l_2} = \\dfrac{R_1(R_2 + r)}{R_2(R_1 + r)}\\); solve for r (5 Ω at 200 cm, 15 Ω at 300 cm ⇒ r = 5 Ω).",
      formula: {
        label: "Internal resistance",
        latex: "r = R\\,\\frac{l_0 - l}{l}",
      },
      authoredExample: {
        prompt: "Two cells balance at 75 cm assisting and 25 cm opposing. E₁/E₂?",
        steps: ["(75 + 25)/(75 − 25) = 100/50."],
        answer: "2 : 1",
      },
      selfCheckExample: {
        prompt: "Assisting, 100 cm; opposing, 20 cm. E₁/E₂?",
        steps: ["120/80."],
        answer: "3 : 2",
      },
      practiceSet: [
        { prompt: "A cell balances at 300 cm; shunted by 10 Ω, at 250 cm. Internal resistance?", answer: "2 Ω" },
        { prompt: "Balancing lengths 8 m in series and 4 m in opposition. E₁/E₂?", answer: "3 : 1" },
      ],
      pyqExampleId: "237ac801-bc0c-4fcf-be5e-3eb8418f7206",
      traps: [
        {
          title: "Using the sum formula for 'one cell, then opposed'",
          body:
            "If the first length is E₁ ALONE, the ratio is l₁/(l₁ − l₂), not (l₁ + l₂)/(l₁ − l₂). Read which combination each length balances.",
        },
        {
          title: "Taking the shunted length for the e.m.f.",
          body:
            "With a shunt the cell delivers current, so the balance reads its terminal voltage, smaller than E. Only the unshunted length l₀ measures E.",
        },
      ],
    },
  ],
  related: [
    { label: "Cells — e.m.f. and terminal voltage", href: `${BASE}/cetp-ce-cells` },
    { label: "Bridges — the other null-point method", href: `${BASE}/cetp-ce-bridges` },
  ],
};
