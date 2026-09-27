import type { SubtopicNote } from "@/app/notes/_types";

export const TRANSISTORS_NOTE: SubtopicNote = {
  subtopicName: "Transistors — BJT, CE Amplifier, and Gain",
  title: "The Transistor and the Common-Emitter Amplifier",
  oneLineDefinition:
    "In a transistor the emitter current splits into a small base current and a large collector current, I_E = I_B + I_C; the ratios α = I_C/I_E and β = I_C/I_B describe it, and in common-emitter mode it amplifies with a gain of β R_L/R_in and a 180° phase reversal.",
  whyItMatters:
    "29 PYQs, none HARD — steady marks for anyone who keeps α and β apart. Three shapes: the current ratios and their identities, " +
    "the common-emitter amplifier's voltage and power gain and its phase, and how an n-p-n transistor differs from a p-n-p one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-alpha-beta",
      name: "Current Ratios α and β",
      intuition:
        "Almost every carrier the emitter sends reaches the collector; a few recombine in the thin base. So α = I_C/I_E is just under 1, and β = I_C/I_B, collector current per base current, is large. Every relation between them comes from I_E = I_B + I_C.",
      definition:
        "- \\(I_E = I_B + I_C\\); \\(\\alpha = \\dfrac{I_C}{I_E} < 1\\); \\(\\beta = \\dfrac{I_C}{I_B} > 1\\).\n" +
        "- \\(\\beta = \\dfrac{\\alpha}{1 - \\alpha}\\), \\(\\alpha = \\dfrac{\\beta}{1 + \\beta}\\), \\(\\dfrac{1}{\\alpha} - \\dfrac{1}{\\beta} = 1\\), \\(\\dfrac{\\beta - \\alpha}{\\alpha\\beta} = 1\\).\n" +
        "- '80% of the emitted electrons reach the collector' means \\(\\alpha = 0.8\\), so \\(\\beta = 4\\).\n" +
        "- \\(\\Delta I_C = \\beta\\,\\Delta I_B\\).",
      formula: {
        label: "Current gains",
        latex: "\\alpha = \\frac{I_C}{I_E}, \\quad \\beta = \\frac{I_C}{I_B}, \\quad \\beta = \\frac{\\alpha}{1 - \\alpha}",
      },
      authoredExample: {
        prompt: "A transistor has \\(I_E = 10\\) mA and \\(I_B = 0.2\\) mA. Find \\(I_C\\), α and β.",
        steps: ["\\(I_C = 9.8\\) mA.", "\\(\\alpha = \\dfrac{9.8}{10} = 0.98\\); \\(\\beta = \\dfrac{9.8}{0.2} = 49\\)."],
        answer: "9.8 mA; 0.98; 49",
      },
      selfCheckExample: {
        prompt: "α = 0.9. β?",
        steps: ["\\(\\beta = \\dfrac{0.9}{0.1}\\)."],
        answer: "9",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{I_C}{I_E} = 0.95\\). Current gain β?", answer: "19" },
        { prompt: "Collector current 28 mA with 80% of electrons reaching it. Base current?", answer: "7 mA" },
        { prompt: "Which relation is WRONG: \\(\\alpha = \\dfrac{\\beta}{1+\\beta}\\) or \\(\\alpha = \\dfrac{\\beta}{1-\\beta}\\)?", answer: "\\(\\alpha = \\dfrac{\\beta}{1-\\beta}\\)" },
      ],
      pyqExampleId: "5b7b4562-c79c-4077-95ec-f9c2538800cc",
      traps: [
        {
          title: "Calling the collector fraction β",
          body:
            "'90% reach the collector' is α = 0.9, and β is \\(\\frac{0.9}{0.1} = 9\\) — not 90. The options offer α and β both ways round.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ce-amplifier",
      name: "The Common-Emitter Amplifier",
      intuition:
        "The input goes in between base and emitter, the output comes out between collector and emitter. A small change in base current makes a β-times larger change in collector current, and the load turns that into a large voltage — upside down, because more collector current means more drop across the load and less voltage at the collector.",
      definition:
        "- Voltage gain \\(A_V = \\beta\\,\\dfrac{R_L}{R_{\\text{in}}}\\); power gain \\(= \\beta \\times A_V = \\beta^2\\dfrac{R_L}{R_{\\text{in}}}\\); so power gain / voltage gain \\(= \\beta\\).\n" +
        "- Given the voltage gain: power gain \\(= A_V^2\\dfrac{R_{\\text{in}}}{R_{\\text{out}}}\\).\n" +
        "- Output is \\(180^\\circ\\) (\\(\\pi\\)) out of phase: \\(V_i = 2\\cos(\\omega t + \\phi)\\) with gain 126 gives \\(252\\cos(\\omega t + \\phi + \\pi)\\).\n" +
        "- Base–emitter junction forward biased, collector–base reverse biased.\n" +
        "- Saturation: \\(I_{C,\\text{sat}} = \\dfrac{V_{CC}}{R_C}\\), least base current \\(\\dfrac{I_{C,\\text{sat}}}{\\beta}\\).",
      formula: {
        label: "CE amplifier",
        latex: "A_V = \\beta\\,\\frac{R_L}{R_{\\text{in}}}, \\qquad A_P = \\beta\\,A_V",
      },
      authoredExample: {
        prompt: "β = 50, \\(R_L = 4\\,\\text{k}\\Omega\\), \\(R_{\\text{in}} = 1\\,\\text{k}\\Omega\\). Voltage gain, power gain, and the output for a 5 mV input?",
        steps: ["\\(A_V = 50 \\times 4 = 200\\); \\(A_P = 50 \\times 200 = 10\\,000\\).", "Output \\(= 200 \\times 5\\) mV \\(= 1\\) V, inverted."],
        answer: "200; 10 000; 1 V (inverted)",
      },
      selfCheckExample: {
        prompt: "Phase difference between the output and input voltages of a CE amplifier?",
        steps: ["Rising base current lowers the collector voltage."],
        answer: "π (180°)",
      },
      practiceSet: [
        { prompt: "β = 62, \\(R_C = 5\\,\\text{k}\\Omega\\), \\(R_{\\text{in}} = 500\\,\\Omega\\), input 0.01 V. Output?", answer: "6.2 V" },
        { prompt: "Current gain 8, \\(R_{\\text{in}} = 25\\,\\text{k}\\Omega\\), \\(R_L = 75\\,\\text{k}\\Omega\\). Power gain?", answer: "192" },
        { prompt: "Ratio of power gain to voltage gain in CE mode?", answer: "β" },
      ],
      pyqExampleId: "20b79898-df49-409c-a817-b7d2f9c804a2",
      traps: [
        {
          title: "Squaring β in the voltage gain",
          body:
            "Voltage gain has ONE factor of β; power gain has two. \\(78 \\times \\frac{6.5}{1.3} = 390\\) is the voltage gain; \\(78^2 \\times 5\\) would be the power gain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-npn-pnp",
      name: "n-p-n and p-n-p Transistors",
      intuition:
        "Both work the same way; only the carriers swap. An n-p-n emitter pushes electrons into a p-type base; a p-n-p emitter pushes holes into an n-type base. Seen as two diodes, the base is the shared middle.",
      definition:
        "- n-p-n: emitter injects ELECTRONS into the base; p-n-p: emitter injects HOLES.\n" +
        "- Two-diode picture of an n-p-n: both diodes have their p-side (anode) at the base, pointing out to E and to C.\n" +
        "- In either, the emitter–base junction is forward biased in normal operation.",
      formula: {
        label: "Currents",
        latex: "I_E = I_B + I_C",
      },
      authoredExample: {
        prompt: "What does the emitter inject into the base in a p-n-p transistor, and in an n-p-n?",
        steps: ["The emitter's majority carriers: holes in p-type, electrons in n-type."],
        answer: "Holes; electrons",
      },
      selfCheckExample: {
        prompt: "In the two-diode picture of an n-p-n transistor, which terminal holds both anodes?",
        steps: ["The base is p-type."],
        answer: "The base",
      },
      practiceSet: [
        { prompt: "Is the emitter–base junction forward or reverse biased in an amplifier?", answer: "Forward" },
      ],
      pyqExampleId: "7d1cfde2-29d9-4d61-8795-1fa02fa5653f",
      traps: [
        {
          title: "Drawing the diodes pointing inward",
          body:
            "An n-p-n's base is p-type, so the diode arrows point OUT from the base to E and C. Arrows pointing into the base describe a p-n-p.",
        },
      ],
    },
  ],
  related: [
    { label: "Logic Gates and Boolean Algebra", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-logic-gates" },
    { label: "Special Diodes", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-special-diodes" },
  ],
};
