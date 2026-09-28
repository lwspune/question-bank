import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-materials";

export const CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification, Curie's Law, Hysteresis, and Shielding",
  title: "Dia-, Para- and Ferromagnets, Hysteresis and Shielding",
  oneLineDefinition:
    "Diamagnets have a small negative susceptibility that does not depend on temperature, paramagnets a small positive one that falls as 1/T (Curie's law), and ferromagnets a huge one that disappears above the Curie temperature; only ferromagnets show hysteresis, and soft ferromagnets are used for shielding and electromagnets.",
  whyItMatters:
    "10 PYQs, none HARD. Four classify materials — the sign of χ, a χ–T graph, Curie's law, and a ferromagnet above its Curie temperature. " +
    "Six are the hysteresis loop and its uses: retentivity and coercivity on a B–H curve, material for electromagnets, and what surrounds an instrument to shield it. Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetp-mm-classes-curie",
      name: "The Three Classes and Curie's Law",
      intuition:
        "Diamagnets are weakly repelled: χ is small and negative and, on a χ–T graph, a flat line just below zero. Paramagnets are weakly attracted: χ is small and positive and falls with temperature as C/T, so M = CB/T. Ferromagnets have aligned domains and an enormous χ; heated above the Curie temperature their domains become random and they behave as paramagnets.",
      definition:
        "- **Diamagnetic**: χ small, negative, independent of T.\n" +
        "- **Paramagnetic**: χ small, positive; Curie's law **χ = C/T**, so **M = CB/T**.\n" +
        "- **Ferromagnetic**: χ very large; above the Curie temperature the domains become random (paramagnetic).",
      table: {
        columns: ["Class", "Susceptibility", "Temperature"],
        rows: [
          { cells: ["Diamagnetic", "Small, negative", "Independent of T"] },
          { cells: ["Paramagnetic", "Small, positive", "χ = C/T (Curie's law)"] },
          { cells: ["Ferromagnetic", "Very large, positive", "Becomes paramagnetic above the Curie temperature"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which materials have a negative susceptibility?",
        steps: ["The weakly repelled class."],
        answer: "Diamagnetic",
      },
      practiceSet: [
        { prompt: "A ferromagnet heated above its Curie temperature. Its domains?", answer: "Become random" },
      ],
      pyqExampleId: "346d2a32-a82b-44c7-8669-5a4c104a8c21",
      traps: [
        {
          title: "Letting a diamagnet's χ change with temperature",
          body:
            "Diamagnetism comes from induced orbital moments and does not depend on temperature; the χ–T graph is a flat line below zero. Only paramagnets follow Curie's law.",
        },
        {
          title: "Writing Curie's law upside down",
          body:
            "Magnetisation grows with the applied field and falls with temperature: M = CB/T, so C = MT/B.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetp-mm-hysteresis-shielding",
      name: "Hysteresis, Electromagnets and Shielding",
      intuition:
        "Only ferromagnets show hysteresis: their B lags behind H round a loop. When H falls to zero, the B that remains is the retentivity; the reverse H needed to bring B to zero is the coercivity. Soft iron has a high retentivity but a low coercivity, so it is easy to magnetise and demagnetise — right for electromagnets. A permanent magnet needs both high. A soft ferromagnet around an instrument draws the field lines into itself and shields the inside.",
      definition:
        "- Retentivity: B at H = 0 (point on the B-axis). Coercivity: H at B = 0 (point on the H-axis).\n" +
        "- Hysteresis: **ferromagnets only**.\n" +
        "- Electromagnets: high retentivity, low coercivity (soft iron). Permanent magnets: both high.\n" +
        "- Shielding: surround with a **soft ferromagnetic** material (soft iron).",
      table: {
        columns: ["Use", "Retentivity", "Coercivity"],
        rows: [
          { cells: ["Electromagnet core (soft iron)", "High", "Low"] },
          { cells: ["Permanent magnet (steel, alnico)", "High", "High"] },
          { cells: ["Magnetic shield", "—", "Soft ferromagnet, high permeability"] },
        ],
      },
      selfCheckExample: {
        prompt: "On a hysteresis loop, what is the value of B left when H is brought to zero called?",
        steps: ["It is the magnetism retained."],
        answer: "Retentivity",
      },
      practiceSet: [
        { prompt: "Which materials show magnetic hysteresis?", answer: "Only ferromagnetic" },
      ],
      pyqExampleId: "4893185b-255d-4727-9b18-3719e382d54f",
      traps: [
        {
          title: "Swapping retentivity and coercivity on the loop",
          body:
            "Retentivity is where the loop crosses the B-axis (H = 0); coercivity where it crosses the H-axis (B = 0).",
        },
        {
          title: "Shielding with a diamagnet",
          body:
            "A diamagnet repels field lines only weakly. Shielding needs a soft ferromagnet, whose high permeability carries the field around the protected space.",
        },
      ],
    },
  ],
  related: [
    { label: "Magnetisation and Susceptibility", href: `${BASE}/cetp-mm-magnetisation` },
  ],
};
