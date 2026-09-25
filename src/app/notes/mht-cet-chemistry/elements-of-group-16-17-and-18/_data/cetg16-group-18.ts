import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/elements-of-group-16-17-and-18";

export const GROUP_18_NOTE: SubtopicNote = {
  subtopicName: "Group 18 Noble Gases and Xenon Compounds",
  title: "Group 18: Noble Gases, Their Uses and the Shapes of Xenon Compounds",
  oneLineDefinition:
    "The noble gases He, Ne, Ar, Kr, Xe and Rn have filled valence shells and few compounds, but xenon combines with fluorine and oxygen, and the shape of each xenon compound follows from its bond pairs and lone pairs exactly as for an interhalogen.",
  whyItMatters:
    "3 PYQs, none HARD. Two are xenon shapes — the compound with one lone pair on Xe, and the one shaped like ClF₅ (XeOF₄ both times); one is a use — helium in MRI. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetg16-noble-gases-and-xenon",
      name: "Noble Gas Uses and Xenon Compound Shapes",
      intuition:
        "Xenon has eight valence electrons. Each Xe–F bond uses one of them, each Xe=O uses two, and what is left sits as lone pairs. XeF₂: 2 used, 6 left — three lone pairs, linear. XeF₄: 4 used — two lone pairs, square planar. XeF₆: 6 used — one lone pair, distorted octahedral. XeOF₄: 2 + 4 = 6 used — one lone pair, square pyramidal, the same shape as ClF₅ and BrF₅. XeO₃: 6 used — one lone pair, pyramidal. For uses, match the gas: liquid helium cools the superconducting magnets of MRI scanners.",
      definition:
        "- **Lone pairs on Xe**: XeF₂ **3** (linear); XeF₄ **2** (square planar); XeOF₂ 2 (T-shaped); XeF₆ **1** (distorted octahedral); XeO₃ 1 (pyramidal); **XeOF₄ 1 (square pyramidal)**.\n" +
        "- **Same shape as ClF₅** (square pyramidal): **XeOF₄**.\n" +
        "- **Uses**: **He** — MRI magnet cooling, balloons, diving gas mixtures; Ne — discharge signs; Ar — bulbs, inert atmosphere for welding; Xe — flash and arc lamps; Rn — radiotherapy.",
      formula: {
        label: "Lone pairs on xenon",
        latex: "\\text{lp} = \\frac{8 - n(\\text{Xe-F}) - 2\\,n(\\text{Xe=O})}{2}",
      },
      authoredExample: {
        prompt: "How many lone pairs does Xe carry in XeO₂F₂, and what is its electron geometry?",
        steps: [
          "Two Xe=O use 4 electrons, two Xe–F use 2: 8 − 6 = 2 electrons, one lone pair.",
          "Four bonded directions plus one lone pair: five electron domains, trigonal bipyramidal (a see-saw shape).",
        ],
        answer: "1 lone pair; trigonal bipyramidal (see-saw)",
      },
      selfCheckExample: {
        prompt: "In which compound does Xe carry one lone pair: XeF₂, XeF₄, XeOF₂, XeOF₄?",
        steps: [
          "(8 − 4 − 2)/2 = 1 for XeOF₄.",
        ],
        answer: "XeOF₄",
      },
      practiceSet: [
        { prompt: "Xenon compound with a ClF₅-like structure: XeF₄, XeF₆, XeO₃, XeOF₄?", answer: "XeOF₄" },
        { prompt: "Lone pairs on Xe in XeF₂?", answer: "3" },
        { prompt: "Inert gas used for magnetic resonance imaging?", answer: "He" },
      ],
      pyqExampleId: "835fdab4-a18f-4c1f-a179-a26b779bfa25",
      traps: [
        {
          title: "Counting an Xe=O bond as one electron",
          body:
            "A double bond to oxygen uses two of xenon's electrons. XeOF₂ therefore has two lone pairs, not three.",
        },
      ],
    },
  ],
  related: [
    { label: "Group 17 — the interhalogens with the same shapes", href: `${BASE}/cetg16-group-17` },
  ],
};
