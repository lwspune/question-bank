import type { SubtopicNote } from "@/app/notes/_types";

export const RESPIRATION_NOTE: SubtopicNote = {
  subtopicName: "Respiratory System",
  title: "The Respiratory System",
  oneLineDefinition:
    "Air travels down a branching airway to the alveoli, where gas exchange happens; the volumes of air moved are named, with tidal volume the smallest.",
  whyItMatters:
    "5 PYQs. Two ideas carry them: gas exchange happens ONLY in the alveoli (the bronchi just conduct air), and the lung-volume names — especially that tidal volume is the air of a normal quiet breath, and the lowest of the volumes.",
  concepts: [
    // airway & gas exchange (FORMULA + diagram)
    {
      kind: "formula" as const,
      slug: "airway-gas-exchange",
      name: "The airway and gas exchange in the alveoli",
      intuition:
        "Air flows in through a branching pipe system — nostrils, pharynx, larynx, trachea, bronchi, then ever-smaller bronchioles — ending in tiny balloons called alveoli. " +
        "Only the alveoli actually exchange gas with the blood; everything before them is just plumbing. " +
        "The alveoli are built for the job: ultra-thin walls, elastic fibres, and a dense capillary net.",
      definition:
        "The pathway and the exchange site:\n" +
        "- **Air path**: nostrils → pharynx → larynx → trachea → bronchi → bronchioles → **alveoli**.\n" +
        "- **Gas exchange happens ONLY in the alveoli** — the bronchi and bronchioles are conducting (air-transport) tubes only.\n" +
        "- Alveoli are efficient because (i) their epithelium is **very thin** (short diffusion distance), (ii) **elastic fibres** let them expand and recoil, and (iii) they are wrapped in **many blood capillaries** (steep concentration gradient).",
      visualizationSlug: "hp-alveolus-gas-exchange",
      authoredExample: {
        prompt:
          "Three features of an alveolus are given: thin epithelium, elastic fibres in the wall, and a surrounding capillary network. Which of these help gas exchange?",
        steps: [
          "Thin epithelium → a short distance for gases to diffuse across → helps.",
          "Elastic fibres → the alveolus expands on inhaling and recoils on exhaling → helps move air.",
          "Capillary network → keeps fresh blood next to the air, maintaining the concentration gradient → helps.",
          "All three features assist exchange.",
        ],
        answer: "All three — thin wall, elastic fibres, and capillary network all aid gas exchange.",
      },
      selfCheckExample: {
        prompt:
          "Which of these does NOT take part in gas exchange: alveoli of humans, bronchi of humans, skin of an earthworm?",
        steps: [
          "Alveoli are the human gas-exchange surface.",
          "An earthworm exchanges gases across its moist skin.",
          "The bronchi only CONDUCT air; no exchange happens there.",
        ],
        answer: "Bronchi of humans — they conduct air but do not exchange gas.",
      },
      practiceSet: [
        { prompt: "Where in the lungs does gas exchange occur?", answer: "Alveoli" },
        { prompt: "Do the bronchi exchange gas?", answer: "No", method: "they only conduct air" },
        { prompt: "Name one structural feature of alveoli that aids exchange.", answer: "Thin epithelium / elastic fibres / capillary network" },
      ],
      pyqExampleId: "d9ab8cef-58ff-4d32-8e38-4a37e2dbb02a", // alveoli properties (multi-statement)
      traps: [
        {
          title: "Bowman's capsule is NOT a breathing structure",
          body:
            "A 'which part does not take part in breathing' question slips in **Bowman's capsule** — that is part of the **nephron in the kidney**, not the respiratory system. Bronchi, trachea and diaphragm all do take part.",
        },
      ],
    },

    // lung volumes (REFERENCE + diagram)
    {
      kind: "reference" as const,
      slug: "lung-volumes",
      name: "Lung volumes and capacities",
      intuition:
        "The lungs move different amounts of air depending on how hard you breathe. A quiet resting breath moves only the tidal volume — the smallest of the named volumes. Forced breaths add the reserve volumes, and some air (residual volume) can never be expelled.",
      definition:
        "The named volumes, smallest to largest:\n" +
        "- **Tidal volume (TV)** — air in a normal quiet breath (~500 mL). The **lowest** of the volumes.\n" +
        "- **Expiratory reserve volume (ERV)** — extra air forced out after a normal breath (~1100 mL).\n" +
        "- **Residual volume (RV)** — air that always remains, cannot be exhaled (~1200 mL).\n" +
        "- **Inspiratory reserve volume (IRV)** — extra air forced in (~3000 mL).\n" +
        "- **Vital capacity** = TV + IRV + ERV (the maximum you can move).",
      visualizationSlug: "hp-lung-volumes",
      table: {
        columns: ["Volume", "Meaning", "Approx."],
        rows: [
          {
            cells: ["**Tidal volume**", "Normal quiet breath", "~500 mL (lowest)"],
            noteAmber: "NDA 2025/2026 — tidal volume is the air of a normal breath AND the smallest named volume.",
          },
          { cells: ["Expiratory reserve", "Extra forced out", "~1100 mL"] },
          { cells: ["Residual volume", "Always remains", "~1200 mL"] },
          { cells: ["Inspiratory reserve", "Extra forced in", "~3000 mL"] },
          { cells: ["Vital capacity", "TV + IRV + ERV", "~4600 mL"] },
        ],
      },
      practiceSet: [
        { prompt: "Air moved in a normal quiet breath is called?", answer: "Tidal volume" },
        { prompt: "Which respiratory volume is the lowest?", answer: "Tidal volume", method: "~500 mL" },
        { prompt: "What is vital capacity?", answer: "TV + IRV + ERV (maximum air moved)" },
      ],
      pyqExampleId: "52125192-be50-40da-9839-12de40221a73", // tidal volume normal breath
      traps: [
        {
          title: "Tidal volume is the smallest — not residual",
          body:
            "Among tidal, residual, IRV and ERV, **tidal volume (~500 mL)** is the lowest. Residual volume (~1200 mL) is larger and is the air you can never breathe out, so don't confuse 'cannot be exhaled' with 'smallest'.",
        },
      ],
    },
  ],
};
