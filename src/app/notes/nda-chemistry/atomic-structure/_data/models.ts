import type { SubtopicNote } from "@/app/notes/_types";

export const MODELS_NOTE: SubtopicNote = {
  subtopicName: "Atomic Models: Dalton, Rutherford, Bohr",
  title: "Atomic Models — Dalton, Thomson, Rutherford, Bohr",
  oneLineDefinition:
    "Our picture of the atom was built in stages — Dalton's indivisible ball, Thomson's plum pudding, Rutherford's tiny dense nucleus, and Bohr's electrons in fixed energy orbits — each fixing a flaw in the one before.",
  whyItMatters:
    "6 PYQs, and the bank tests this two ways: a straight 'who discovered X' recall (Chadwick → neutron, Rutherford → nucleus) and a 'which finding is NOT part of this model' trap that swaps a Bohr idea into Rutherford's model. " +
    "Learn each scientist's one contribution and the one thing their model could NOT explain, and every question here is a gift.",
  concepts: [
    // who discovered what (REFERENCE)
    {
      kind: "reference" as const,
      slug: "discoveries-and-particles",
      name: "Who discovered each subatomic particle and model",
      intuition:
        "Each subatomic particle and each model is tied to one scientist. The NDA asks 'who discovered the neutron?' or 'whose experiment found the nucleus?' as a pure recall. " +
        "The single most-asked pair is Chadwick → neutron; the second is Rutherford's gold-foil (alpha-scattering) experiment → the nucleus.",
      definition:
        "The discoveries the bank tests:\n" +
        "- **Electron** — discovered by **J. J. Thomson** (cathode-ray experiments).\n" +
        "- **Proton** — discovered by **E. Goldstein** (canal rays); the positive charge of the nucleus.\n" +
        "- **Neutron** — discovered by **James Chadwick** (1932); neutral, in the nucleus.\n" +
        "- **Nucleus** — discovered by **Ernest Rutherford** from the **alpha-particle scattering** (gold-foil) experiment.",
      table: {
        columns: ["Discovery", "Scientist", "Experiment / note"],
        rows: [
          { cells: ["Electron", "J. J. Thomson", "Cathode rays; proposed the plum-pudding model"] },
          { cells: ["Proton", "E. Goldstein", "Canal rays (anode rays)"] },
          {
            cells: ["Neutron", "James Chadwick", "1932; neutral particle in the nucleus"],
            noteAmber: "NDA 2025 + 2020 — the neutron was discovered by James Chadwick.",
          },
          {
            cells: ["Nucleus", "Ernest Rutherford", "Alpha-particle (gold-foil) scattering experiment"],
            noteAmber: "NDA 2017 — Rutherford's alpha-scattering experiment discovered the nucleus.",
          },
        ],
      },
      pyqExampleId: "d7880097-d823-4a9f-bca9-878e3ac1195f", // Chadwick → neutron
      selfCheckExample: {
        prompt: "Whose experiment, using a beam of alpha particles fired at a thin gold foil, led to the discovery of the atomic nucleus?",
        steps: [
          "A beam of positive alpha particles was fired at thin gold foil.",
          "Most passed straight through, but a few bounced sharply back.",
          "Only a tiny, dense, positive centre could deflect them — Rutherford named it the nucleus.",
        ],
        answer: "Ernest Rutherford — the alpha-particle scattering (gold-foil) experiment.",
      },
      practiceSet: [
        { prompt: "Who discovered the neutron?", answer: "James Chadwick" },
        { prompt: "Who discovered the electron?", answer: "J. J. Thomson" },
        { prompt: "Rutherford's alpha-particle scattering experiment discovered which part of the atom?", answer: "The nucleus" },
        { prompt: "Which subatomic particle did E. Goldstein discover?", answer: "The proton" },
      ],
      traps: [
        {
          title: "Chadwick = neutron, not Rutherford",
          body:
            "Rutherford discovered the **nucleus**; the **neutron** was discovered later by **James Chadwick** (1932). Don't credit Rutherford with the neutron.",
        },
      ],
    },

    // the models and their failures (REFERENCE)
    {
      kind: "reference" as const,
      slug: "the-four-models",
      name: "The four atomic models and what each could not explain",
      intuition:
        "Each model fixed a flaw in the one before. Dalton's solid ball had no internal parts; Thomson's plum pudding had no dense centre; Rutherford's nuclear atom could not say where the electrons sat; Bohr's fixed orbits finally placed the electrons. " +
        "The bank's favourite trap is the 'which finding is NOT part of Rutherford's model' question — and the answer is always a Bohr idea (fixed energy orbits) or a wrong charge on the nucleus.",
      definition:
        "The models in order, and the key claim of each:\n" +
        "- **Dalton** — the atom is a tiny, **indivisible, solid sphere**; all atoms of an element are identical.\n" +
        "- **Thomson (plum pudding)** — a sphere of **positive charge** with **electrons embedded** in it, like plums in a pudding.\n" +
        "- **Rutherford (nuclear)** — a tiny, dense, **positively-charged nucleus** holds nearly all the mass; electrons revolve around it; most of the atom is **empty space**. It did **NOT** explain fixed electron paths.\n" +
        "- **Bohr** — electrons revolve only in **fixed circular orbits of definite energy** (shells); they neither gain nor lose energy while in an orbit.",
      table: {
        columns: ["Model", "Key claim", "Could NOT explain"],
        rows: [
          { cells: ["Dalton", "Indivisible solid sphere; identical atoms", "Subatomic particles (electrons, nucleus)"] },
          { cells: ["Thomson (plum pudding)", "Positive sphere with electrons embedded", "The dense nucleus / scattering of alpha particles"] },
          {
            cells: ["Rutherford (nuclear)", "Tiny dense POSITIVE nucleus; mostly empty space", "Why electrons don't spiral in; fixed energy orbits"],
            noteAmber: "Rutherford's nucleus is POSITIVELY charged, not neutral. Fixed energy orbits are a BOHR idea, not Rutherford's.",
          },
          { cells: ["Bohr", "Electrons in fixed circular orbits of definite energy", "Spectra of multi-electron atoms (refined later)"] },
        ],
        caption: "Fixed energy orbits = Bohr. Nucleus = Rutherford. Plum pudding = Thomson. Indivisible sphere = Dalton.",
      },
      pyqExampleId: "cd31c001-abe1-4050-b913-01996ed6cc26", // Rutherford NOT finding (neutral nucleus)
      selfCheckExample: {
        prompt: "Which one finding is NOT a conclusion of Rutherford's alpha-particle scattering experiment: (a) most of the atom is empty space, (b) nearly all the mass is in the nucleus, (c) electrons move in fixed-energy orbits, (d) the nucleus is very small compared to the atom?",
        steps: [
          "Rutherford's experiment established a tiny dense positive nucleus, mostly empty space, with electrons revolving around it.",
          "It said nothing about the energy of those electron paths.",
          "Fixed-energy orbits (shells) were proposed by Bohr, not Rutherford.",
        ],
        answer: "(c) Electrons move in fixed-energy orbits — that is Bohr's idea, not a Rutherford conclusion.",
      },
      practiceSet: [
        { prompt: "Which model describes the atom as a positive sphere with electrons embedded like plums in a pudding?", answer: "Thomson's plum-pudding model" },
        { prompt: "Which scientist proposed that electrons revolve in fixed circular orbits of definite energy?", answer: "Niels Bohr" },
        { prompt: "Is the nucleus in Rutherford's model positive, negative, or neutral?", answer: "Positively charged" },
        { prompt: "Which model treated the atom as an indivisible solid sphere?", answer: "Dalton's model" },
      ],
      traps: [
        {
          title: "Rutherford's nucleus is positive, not neutral",
          body:
            "A statement that 'there is a neutral centre in an atom called the nucleus' is **NOT** part of Rutherford's model — his nucleus carries the atom's **positive** charge.",
        },
        {
          title: "Fixed-energy orbits belong to Bohr",
          body:
            "When a question asks what Rutherford's model could NOT explain (or which finding is not his), the answer is almost always **electrons in fixed-energy orbits** — that came from **Bohr**.",
        },
      ],
    },

    // Dalton's pictorial symbols (REFERENCE)
    {
      kind: "reference" as const,
      slug: "dalton-symbols",
      name: "Dalton's pictorial element symbols",
      intuition:
        "Before letter symbols (H, O, P), Dalton drew each element as a small circle with a mark inside. The NDA has shown the actual pictures and asked which one is phosphorus. " +
        "You only need the handful the bank reuses — phosphorus is a circle with a cross (+) inside it.",
      definition:
        "Dalton represented elements as circles with distinguishing marks:\n" +
        "- **Phosphorus** — a circle with a **cross (+)** inscribed inside (a circled cross).\n" +
        "- **Oxygen** — a plain open circle.\n" +
        "- **Hydrogen** — a circle with a central dot.\n" +
        "- **Sulphur** — a circle with a letter mark inside.\n" +
        "These are pictorial conventions; the bank's question shows the drawings and asks you to match phosphorus.",
      table: {
        columns: ["Element", "Dalton's symbol"],
        rows: [
          {
            cells: ["Phosphorus", "Circle with a cross (+) inside (circled cross)"],
            noteAmber: "NDA 2023 — Dalton's phosphorus is the circle with the + sign inside.",
          },
          { cells: ["Oxygen", "A plain open circle"] },
          { cells: ["Hydrogen", "A circle with a central dot"] },
          { cells: ["Sulphur", "A circle with a letter mark inside"] },
        ],
      },
      pyqExampleId: "9d0f9315-635e-459f-b8f5-f0371a943159", // Dalton symbol phosphorus
      practiceSet: [
        { prompt: "In Dalton's pictorial notation, which element is a circle with a cross (+) inside it?", answer: "Phosphorus" },
        { prompt: "Before letter symbols, how did Dalton represent each element?", answer: "As a small circle with a distinguishing mark inside" },
      ],
    },
  ],
};
