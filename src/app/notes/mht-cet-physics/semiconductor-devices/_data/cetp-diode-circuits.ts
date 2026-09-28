import type { SubtopicNote } from "@/app/notes/_types";

export const DIODE_CIRCUITS_NOTE: SubtopicNote = {
  subtopicName: "Diode Circuits and Rectifiers",
  title: "Diode Circuits and Rectifiers",
  oneLineDefinition:
    "Solve a diode circuit by deciding which diodes are forward biased (a short, or a 0.7 V drop for silicon) and which reverse (an open switch); a rectifier uses the same one-way action to turn a.c. into pulsating d.c.",
  whyItMatters:
    "18 PYQs, one HARD. Two shapes: the current in a circuit of ideal or silicon diodes with resistors — find the conducting branches first — " +
    "and the half-wave and full-wave rectifier: output frequency, efficiency, and the order rectifier → filter → regulator.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-diode-circuits",
      name: "Circuits With Diodes",
      intuition:
        "Before any arithmetic, decide each diode's state from the battery's polarity. A forward-biased ideal diode is a plain wire; a reverse-biased one is a gap, so its whole branch drops out. What is left is an ordinary resistor circuit.",
      definition:
        "- Ideal diode: forward = short circuit, reverse = open circuit. Silicon diode: forward drop 0.7 V.\n" +
        "- A diode's forward resistance, if given, simply adds to its branch.\n" +
        "- Between two points: a diode in one of two parallel branches makes \\(R_{\\text{forward}}\\) the parallel value and \\(R_{\\text{reverse}}\\) the other branch alone.\n" +
        "- Current from a higher to a lower voltage through a forward diode: \\(I = \\dfrac{V_1 - V_2}{R}\\).",
      formula: {
        label: "Silicon diode in series",
        latex: "I = \\frac{V - 0.7}{R}",
      },
      authoredExample: {
        prompt: "A 12 V battery drives current through a forward-biased diode and a \\(3\\,\\text{k}\\Omega\\) resistor. Current if the diode is ideal, and if it is silicon?",
        steps: ["Ideal: \\(I = \\dfrac{12}{3000} = 4\\) mA.", "Silicon: \\(I = \\dfrac{12 - 0.7}{3000} \\approx 3.77\\) mA."],
        answer: "4 mA; ≈ 3.77 mA",
      },
      selfCheckExample: {
        prompt: "Two \\(60\\,\\Omega\\) resistors are in parallel between A and B, one of them in series with an ideal diode. Ratio of the resistance with the diode forward to that with it reverse?",
        steps: ["Forward: \\(30\\,\\Omega\\); reverse: the diode branch is open, \\(60\\,\\Omega\\)."],
        answer: "1 : 2",
      },
      practiceSet: [
        { prompt: "3 V → forward ideal diode → \\(100\\,\\Omega\\) → 1 V. Current?", answer: "20 mA" },
        { prompt: "−2 V → \\(500\\,\\Omega\\) → n-side; p-side at −5 V. Current?", answer: "Zero (reverse biased)" },
      ],
      pyqExampleId: "27e4d2ad-8250-44e5-ac35-accd65299748",
      traps: [
        {
          title: "Including a reverse-biased branch",
          body:
            "A reverse-biased ideal diode carries NO current, so everything in series with it vanishes from the circuit. Adding its resistor in parallel is the most common wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-rectifiers",
      name: "Half-Wave and Full-Wave Rectifiers",
      intuition:
        "A single diode passes only one half of each cycle: half-wave output, pulsing at the supply frequency. Two diodes with a centre-tapped transformer (or a bridge) pass both halves the same way round, so the pulses come twice as often and the efficiency doubles.",
      definition:
        "- Half-wave: output frequency = input frequency; maximum efficiency 40.6%.\n" +
        "- Full-wave: pulsating d.c. at TWICE the input frequency; maximum efficiency 81.2% — so \\(x = 2y\\).\n" +
        "- Centre-tap: each diode sees half the secondary, \\(\\dfrac{V_s}{2}\\).\n" +
        "- A diode alone gives pulsating d.c., not steady d.c.; the order for steady d.c. is rectifier → filter → regulator.",
      formula: {
        label: "Output frequency",
        latex: "f_{\\text{half}} = f, \\qquad f_{\\text{full}} = 2f",
      },
      authoredExample: {
        prompt: "A 60 Hz supply feeds a half-wave and a full-wave rectifier. Output ripple frequencies?",
        steps: ["Half-wave keeps 60 Hz; full-wave doubles it."],
        answer: "60 Hz; 120 Hz",
      },
      selfCheckExample: {
        prompt: "Maximum efficiency of a full-wave rectifier compared with a half-wave one?",
        steps: ["81.2% against 40.6%."],
        answer: "Twice",
      },
      practiceSet: [
        { prompt: "Output of a full-wave rectifier without a filter?", answer: "Pulsating d.c. at twice the input frequency" },
        { prompt: "Order of blocks to get steady d.c. from a.c.?", answer: "Rectifier, filter, regulator" },
      ],
      pyqExampleId: "2bb303d5-8c9a-4a95-8d7a-244a4d524583",
      traps: [
        {
          title: "Full-wave keeps the input frequency",
          body:
            "Each half-cycle becomes a pulse, so a 50 Hz input gives 100 pulses a second. Answering 50 Hz for both rectifiers is the planted option.",
        },
      ],
    },
  ],
  related: [
    { label: "The p-n Junction — biasing", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-pn-junction" },
    { label: "Special Diodes — the Zener regulator", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-special-diodes" },
  ],
};
