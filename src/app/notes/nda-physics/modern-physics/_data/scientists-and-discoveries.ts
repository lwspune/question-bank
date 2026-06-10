import type { SubtopicNote } from "@/app/notes/_types";

export const SCIENTISTS_AND_DISCOVERIES_NOTE: SubtopicNote = {
  subtopicName: "Scientists and Discoveries",
  title: "Scientists and Discoveries: Match the Pair",
  oneLineDefinition:
    "A pure-recall table of who discovered or explained what in modern physics — Chadwick (neutron), Einstein (photoelectric effect, relativity), Marie Curie (radium), and the LIGO confirmation of gravitational waves.",
  whyItMatters:
    "Three PYQs, all match-the-pair recall. " +
    "The NDA presents a list of scientist-discovery pairs and asks which are correctly matched, so the only preparation is memorising the table cold. " +
    "Get the famous swaps right (Chadwick = neutron, not photoelectric effect) and these are free marks.",
  concepts: [
    // Concept 1 — discoveries reference table
    {
      kind: "reference" as const,
      slug: "key-discoveries",
      name: "Key modern-physics discoveries and their scientists",
      intuition:
        "Almost every modern-physics recall question reduces to matching a person to their landmark result. " +
        "Build the table once, in order, and the match-the-pair questions become a lookup. " +
        "Pay special attention to the famous swaps the exam plants — Chadwick discovered the neutron, Einstein explained the photoelectric effect, Marie Curie discovered radium.",
      definition:
        "Landmark discoveries and their scientists:\n" +
        "- **James Chadwick** — discovered the **neutron**.\n" +
        "- **Albert Einstein** — explained the **photoelectric effect**; gave **relativity** and \\(E = mc^2\\).\n" +
        "- **Marie Curie** — discovered **radium** (and polonium); pioneered radioactivity research.\n" +
        "- **Rutherford** — discovered the **nucleus** (alpha scattering).\n" +
        "- **J. J. Thomson** — discovered the **electron**.\n" +
        "- **Niels Bohr** — model of **stable electron orbits**.",
      table: {
        columns: ["Scientist", "Discovery / contribution"],
        rows: [
          { cells: ["James Chadwick", "Neutron"] },
          { cells: ["Albert Einstein", "Photoelectric effect explanation; relativity (E = mc²)"] },
          {
            cells: ["Marie Curie", "Radium (and polonium); radioactivity"],
            noteAmber: "NDA 2021 — in the match list, only \"Marie Curie : Radium\" was correctly matched (Chadwick was wrongly paired with photoelectric effect, Einstein with neutron).",
          },
          { cells: ["Ernest Rutherford", "Atomic nucleus (alpha scattering)"] },
          { cells: ["J. J. Thomson", "Electron (cathode rays)"] },
          { cells: ["Niels Bohr", "Stable electron orbits (Bohr model)"] },
        ],
        caption:
          "The exam plants swaps: Chadwick is the NEUTRON (not photoelectric), Einstein is the PHOTOELECTRIC EFFECT (not the neutron), Curie is RADIUM.",
      },
      selfCheckExample: {
        prompt:
          "In the list — 1. Chadwick : Photoelectric effect, 2. Einstein : Neutron, 3. Marie Curie : Radium — which pairs are correctly matched?",
        steps: [
          "Chadwick discovered the neutron, not the photoelectric effect — pair 1 is wrong.",
          "Einstein explained the photoelectric effect, not the neutron — pair 2 is wrong.",
          "Marie Curie discovered radium — pair 3 is correct.",
        ],
        answer: "Only pair 3 (Marie Curie : Radium) is correctly matched.",
      },
      practiceSet: [
        { prompt: "Who discovered the neutron?", answer: "James Chadwick" },
        { prompt: "Who discovered radium?", answer: "Marie Curie" },
        { prompt: "Who explained the photoelectric effect?", answer: "Albert Einstein" },
        { prompt: "Who discovered the electron?", answer: "J. J. Thomson" },
      ],
      pyqExampleId: "68f56d32-48d5-41ff-b482-dc682a92ac40", // 2021 MOD — Chadwick/Einstein/Curie match
      traps: [
        {
          title: "Chadwick = neutron, Einstein = photoelectric effect",
          body:
            "The favourite swap pairs Chadwick with the photoelectric effect and Einstein with the neutron — both wrong. Chadwick discovered the neutron; Einstein explained the photoelectric effect.",
        },
      ],
    },

    // Concept 2 — LIGO and gravitational waves
    {
      kind: "reference" as const,
      slug: "ligo-gravitational-waves",
      name: "LIGO — confirming gravitational waves and general relativity",
      intuition:
        "Einstein's general theory of relativity (1915) predicted that violent cosmic events should ripple spacetime, producing gravitational waves. " +
        "A century later, the LIGO detectors directly measured such a ripple from two merging black holes, confirming the prediction. " +
        "The exam tests what LIGO confirmed (general relativity) and, alongside, its full form as an acronym.",
      definition:
        "**LIGO** = **Laser Interferometer Gravitational-wave Observatory**.\n" +
        "- LIGO made the **first direct detection of gravitational waves** (2015).\n" +
        "- This confirmed a key prediction of **Einstein's General Theory of Relativity**.\n" +
        "- A separate but related recall fact: **LED = Light Emitting Diode** (a semiconductor device that emits light when current flows).",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["LIGO full form", "Laser Interferometer Gravitational-wave Observatory"] },
          {
            cells: ["LIGO confirmed", "Gravitational waves predicted by Einstein's General Theory of Relativity"],
            noteAmber: "NDA 2024 — the LIGO experiment confirmed a prediction of the General Theory of Relativity.",
          },
          {
            cells: ["LED full form", "Light Emitting Diode (a semiconductor device)"],
            pyqExampleId: "db08197b-3f28-4ca6-b621-a02d7ca4b6e2",
          },
        ],
        caption:
          "LIGO detected gravitational waves and so confirmed General Relativity. LED is a Light Emitting Diode.",
      },
      selfCheckExample: {
        prompt:
          "The LIGO experiment confirmed a prediction of which theory?",
        steps: [
          "LIGO directly detected gravitational waves — ripples in spacetime.",
          "Gravitational waves were predicted by Einstein's General Theory of Relativity.",
        ],
        answer: "Einstein's General Theory of Relativity.",
      },
      practiceSet: [
        { prompt: "LIGO confirmed a prediction of which theory?", answer: "General Theory of Relativity" },
        { prompt: "What does LIGO stand for?", answer: "Laser Interferometer Gravitational-wave Observatory" },
        { prompt: "What did LIGO directly detect?", answer: "Gravitational waves" },
        { prompt: "What does LED stand for?", answer: "Light Emitting Diode" },
      ],
      pyqExampleId: "7521e0f5-668e-47eb-83cd-866ec16f6533", // 2024 — LIGO confirmed general relativity
      traps: [
        {
          title: "LIGO confirmed GENERAL relativity (via gravitational waves)",
          body:
            "Gravitational waves are a prediction of the GENERAL theory of relativity (the one about gravity and spacetime), not the special theory. LIGO's detection confirmed general relativity.",
        },
      ],
    },
  ],
};
