import type { SubtopicNote } from "@/app/notes/_types";

export const PN_JUNCTION_NOTE: SubtopicNote = {
  subtopicName: "p-n Junction — Depletion Layer and Biasing",
  title: "The p-n Junction: Depletion Layer and Biasing",
  oneLineDefinition:
    "Where p and n meet, carriers diffuse across and leave a thin depletion layer of fixed ions whose field opposes further flow; forward bias shrinks that barrier and lets current through, reverse bias widens it and blocks current.",
  whyItMatters:
    "14 PYQs, none HARD. Two things are asked: what forms the depletion layer and which way its field points, " +
    "and what forward and reverse bias do to the barrier and the layer's width — including reading from a drawing whether a diode is forward or reverse biased.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-depletion-layer",
      name: "The Depletion Layer and Its Field",
      intuition:
        "Electrons diffuse from the n-side into the p-side and holes the other way; they recombine and leave behind uncovered ions — positive on the n-side, negative on the p-side. Those fixed charges make a field pointing from n to p, which stops further diffusion. The n-side ends up at the higher potential.",
      definition:
        "- The depletion layer forms by DIFFUSION of majority carriers; it holds only immobile ions — positive on the n-side, negative on the p-side.\n" +
        "- The barrier is due to that accumulation of positive and negative ions near the junction.\n" +
        "- Unbiased junction: field from the n-side to the p-side; the n-side is at the higher potential.\n" +
        "- The field is strongest inside the depletion layer.",
      formula: {
        label: "Barrier",
        latex: "\\vec E_{\\text{junction}}: \\; n \\to p, \\qquad V_n > V_p",
      },
      authoredExample: {
        prompt: "In an unbiased p-n junction, which side is at the higher potential, and which way does the junction field point?",
        steps: ["Positive ions remain on the n-side, negative on the p-side."],
        answer: "The n-side; from n to p",
      },
      selfCheckExample: {
        prompt: "What process creates the depletion layer — drift or diffusion?",
        steps: ["Carriers move from high to low concentration across the junction."],
        answer: "Diffusion",
      },
      practiceSet: [
        { prompt: "Where in a reverse-biased junction is the electric field greatest?", answer: "In the depletion layer" },
        { prompt: "What charges sit in the depletion layer?", answer: "Immobile ions: + on the n-side, − on the p-side" },
      ],
      pyqExampleId: "241fcd7e-9963-4ddd-b312-8274410c06fb",
      traps: [
        {
          title: "The p-side is at the higher potential",
          body:
            "The p-side LOST holes and holds negative ions, so it sits LOWER. The field runs from n to p; the options reverse both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-biasing",
      name: "Forward and Reverse Bias",
      intuition:
        "Push the p-side positive and the applied field opposes the junction's own: the barrier drops, the layer thins, and current flows. Push it negative and the two fields add: the barrier rises, the layer widens, and only a tiny minority-carrier current trickles through.",
      definition:
        "- Forward bias (p at the higher potential): barrier and width DECREASE; large current. Ideal diode: zero resistance.\n" +
        "- Reverse bias (p lower): barrier and width INCREASE; almost no current. Ideal diode: infinite resistance.\n" +
        "- Reading a drawing: the triangle's base is the p-side (anode). Forward if the voltage there is higher than at the bar, e.g. −1.0 V against −1.5 V.\n" +
        "- A device that passes 10 mA one way and almost nothing when reversed is a p-n junction diode.",
      formula: {
        label: "Bias rule",
        latex: "V_p > V_n \\Rightarrow \\text{forward}, \\qquad V_p < V_n \\Rightarrow \\text{reverse}",
      },
      authoredExample: {
        prompt: "A diode's p-side is at 2 V and its n-side at 5 V. Biased which way, and what happens to its depletion layer?",
        steps: ["\\(V_p < V_n\\): reverse bias, so the layer widens."],
        answer: "Reverse; wider",
      },
      selfCheckExample: {
        prompt: "Forward bias is applied. What happens to the barrier potential and the depletion width?",
        steps: ["Both fall."],
        answer: "Both decrease",
      },
      practiceSet: [
        { prompt: "Resistance of an ideal diode forward and reverse?", answer: "Zero; infinite" },
        { prompt: "p-side at −2 V, n-side at 0 V: forward or reverse?", answer: "Reverse" },
      ],
      pyqExampleId: "e9d9b720-556b-40e5-b996-3bbd492f0c2e",
      traps: [
        {
          title: "Comparing the sizes of negative voltages",
          body:
            "−1.0 V is HIGHER than −1.5 V. A drawing with −1.0 V on the p-side and −1.5 V on the n-side is forward biased; the minus signs are there to trip the eye.",
        },
      ],
    },
  ],
  related: [
    { label: "Diode Circuits and Rectifiers", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-diode-circuits" },
    { label: "Energy Bands and Doping", href: "/notes/mht-cet-physics/semiconductor-devices/cetp-band-theory" },
  ],
};
