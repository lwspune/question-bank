import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AT_MODELS_NOTE: SubtopicNote = {
  subtopicName: "Atomic Models",
  title: "Atomic Models: Dalton to Bohr",
  oneLineDefinition:
    "What Dalton's theory explained and could not, what Rutherford's gold-foil experiment found, and the one problem Bohr's model fixed.",
  whyItMatters:
    "Six CDS questions, three of them in a single 2025 (I) paper. Three ask what the gold-foil experiment discovered (the nucleus), and two ask what a model could NOT explain.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschat-dalton",
      name: "Dalton's atomic theory and its limits",
      intuition:
        "Dalton pictured each atom as a tiny, solid, indivisible ball. That picture was enough to explain why elements combine in fixed ratios. It could say nothing about electrons, protons or neutrons, because for Dalton there was nothing inside an atom.",
      definition:
        "Dalton's theory (1808):\n" +
        "- Matter is made of **indivisible atoms**; atoms of one element are identical in mass and properties.\n" +
        "- Atoms combine in **simple whole-number ratios** and are neither created nor destroyed in a reaction.\n" +
        "- So it **explains** the laws of **conservation of mass**, **constant composition** and **multiple proportions**.\n" +
        "- It does **not** explain **sub-atomic particles** or isotopes, because it treats the atom as indivisible.\n" +
        "- Dalton was also the first to use **symbols** for elements (circles with marks). The letter symbols used today (H, O, Na) were proposed later by **Berzelius**.",
      table: {
        columns: ["Statement", "Explained by Dalton's theory?"],
        rows: [
          { cells: ["Law of conservation of mass", "Yes"] },
          { cells: ["Law of constant composition", "Yes"] },
          { cells: ["Law of multiple proportions", "Yes"] },
          {
            cells: ["Atoms contain electrons, protons and neutrons", "No — the atom is indivisible in this theory"],
            noteAmber: "CDS 2025 (I): the presence of sub-atomic particles is what Dalton's theory does not explain.",
            pyqExampleId: "3a6cde57-6784-407a-8b7c-e806faf4c578",
          },
        ],
      },
      pyqExampleId: "3a6cde57-6784-407a-8b7c-e806faf4c578",
      practiceSet: [
        { prompt: "According to Dalton, can an atom be divided?", answer: "No — he took atoms to be indivisible" },
        { prompt: "Name one law that Dalton's atomic theory explains.", answer: "Conservation of mass (or constant composition, or multiple proportions)" },
        { prompt: "Who first used symbols, drawn as circles, to stand for elements?", answer: "John Dalton" },
        { prompt: "Who proposed the letter symbols used today, such as Na and O?", answer: "Berzelius" },
      ],
      traps: [
        {
          title: "Dalton's symbols versus today's symbols",
          body: "A question asking who introduced the symbol of an element usually wants **Dalton**, who first used symbols. The one- and two-letter symbols in use today came later, from **Berzelius**. Read the stem for which one it means.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschat-rutherford",
      name: "Rutherford's gold-foil experiment and its limit",
      intuition:
        "Rutherford fired alpha particles at a very thin gold foil. Most went straight through, so an atom is mostly empty space. A very few bounced back, so all the positive charge and almost all the mass sit in a tiny centre: the nucleus. But an electron circling a nucleus should lose energy and spiral in, and this model had no answer to that.",
      definition:
        "The experiment and the models around it:\n" +
        "- **Thomson** (plum pudding): electrons sit in a sphere of positive charge. Thomson also **discovered the electron**.\n" +
        "- **Rutherford** (gold foil, alpha particles): most pass straight through, a few are deflected through large angles, about 1 in 20,000 bounces back. Conclusion: a **small, dense, positively charged nucleus** at the centre.\n" +
        "- What Rutherford's model **could not explain**: the **stability of the atom**. A circling electron is accelerating, so it should radiate energy and fall into the nucleus.\n" +
        "- **Bohr** fixed this: electrons move only in **fixed orbits (energy levels)** and do not radiate while in one.\n" +
        "- **Chadwick** discovered the neutron (1932); **Goldstein**'s canal rays led to the proton.",
      table: {
        columns: ["Scientist", "Key result"],
        rows: [
          { cells: ["J. J. Thomson", "Discovered the electron; plum-pudding model"] },
          {
            cells: ["Ernest Rutherford", "Gold-foil experiment: discovered the atomic nucleus"],
            noteAmber: "Asked three times: CDS 2019 (II), 2020 (I) and 2025 (I). The answer is always the nucleus, never the proton or neutron.",
            pyqExampleId: "71a91f68-733a-4b2d-9709-04576414da21",
          },
          {
            cells: ["Niels Bohr", "Fixed orbits; explains why the atom is stable"],
            noteAmber: "CDS 2025 (I): Rutherford's model could not explain the stability of the atom.",
            pyqExampleId: "2f7a62d9-b774-4555-b4cc-9d6f1d03fe83",
          },
          { cells: ["James Chadwick", "Discovered the neutron"] },
        ],
      },
      pyqExampleId: "4240fc9e-8857-4a9c-b427-6875a58df34e",
      selfCheckExample: {
        prompt: "In the gold-foil experiment, most alpha particles passed straight through the foil. What did this one observation show?",
        steps: [
          "A particle passes undeflected only if it meets nothing in its path.",
          "Since most passed, most of the volume of each atom has nothing in it.",
        ],
        answer: "An atom is mostly empty space.",
      },
      practiceSet: [
        { prompt: "What did Rutherford's alpha-scattering experiment discover?", answer: "The atomic nucleus" },
        { prompt: "Which particle did J. J. Thomson discover?", answer: "The electron" },
        { prompt: "Who discovered the neutron?", answer: "James Chadwick" },
        { prompt: "Which feature of the atom could Rutherford's model not explain?", answer: "Its stability" },
      ],
      traps: [
        {
          title: "Gold foil found the nucleus, not the proton",
          body: "The large deflections showed a **positively charged nucleus**. Options naming the electron, proton, neutron or 'isotopes of gold' are distractors.",
        },
        {
          title: "Rutherford's weakness is stability",
          body: "Rutherford's model **does** explain the nucleus, its positive charge and its small size compared with the atom. It does **not** explain why the circling electron does not fall in: the stability of the atom.",
        },
      ],
    },
  ],
};
