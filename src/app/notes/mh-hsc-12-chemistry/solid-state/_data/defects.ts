import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_DEFECTS_NOTE: SubtopicNote = {
  subtopicName: "Crystal Defects and Imperfections",
  title: "Point Defects: Schottky, Frenkel, Impurity and Nonstoichiometric",
  oneLineDefinition:
    "The point defects of crystals: vacancy and self interstitial defects, the Schottky and Frenkel defects with their conditions and consequences, substitutional and interstitial impurities, and metal deficiency and metal excess defects including F-centres.",
  whyItMatters:
    "8 questions, four of them from board papers. The board asked you to define the Schottky defect (2026), name the crystal that does not show it (2025), explain substitutional and interstitial impurity defects (2023) and give the colour of NaCl caused by F-centres (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccss-schottky-frenkel",
      name: "Stoichiometric defects: Schottky and Frenkel",
      intuition:
        "In a stoichiometric defect the ratio of ions stays exactly as in the formula. In a Schottky defect a cation and an anion both leave the crystal, so the ratio holds but the crystal gets lighter. In a Frenkel defect an ion only moves from its site into a gap between sites, so nothing is lost at all.",
      definition:
        "- Real crystals have defects; they are fewer when crystallisation is slow. Whatever the defect, the solid stays electrically neutral.\n" +
        "- **Stoichiometric point defects** keep the ratio of the formula. There are four: vacancy, self interstitial, Schottky and Frenkel.\n" +
        "- **Vacancy defect:** a particle is missing from its site; mass falls, volume does not, so density **decreases**.\n" +
        "- **Self interstitial defect** (elemental solid): an extra particle in an interstitial space raises the density; a particle shifted from its own site into an interstitial space leaves the density unchanged.\n" +
        "- **Schottky defect:** equal numbers of cations and anions are missing from their lattice sites, two holes per ion pair lost. Conditions: high ionic character, high coordination number of the anion, cation and anion of similar size.\n" +
        "- **Frenkel defect:** an ion, usually the smaller cation, leaves its site and occupies an interstitial position: a vacancy and an interstitial defect together. Conditions: large difference in ion sizes, low coordination number. Not found in pure alkali metal halides, whose cations are too large.",
      table: {
        columns: ["Point", "Schottky defect", "Frenkel defect"],
        rows: [
          {
            cells: ["What happens", "Equal numbers of cations and anions are missing from their lattice sites", "An ion leaves its lattice site and occupies an interstitial position"],
            pyqExampleId: "be55cc68-4579-45cd-98e5-4f5a78256324",
            noteAmber: "Board 2026 asked you to define the Schottky defect.",
          },
          { cells: ["Conditions", "High ionic character, high coordination number, ions of similar size", "Large difference between ion sizes, low coordination number"] },
          { cells: ["Effect on density", "Decreases: mass falls, volume stays the same", "No change: no ion leaves the crystal"] },
          { cells: ["Electrical neutrality", "Preserved: equal numbers of cations and anions are missing", "Preserved: the ion is still in the crystal"] },
          {
            cells: ["Examples", "NaCl, KCl, AgBr", "ZnS, AgCl, AgBr, AgI, CaF₂"],
            pyqExampleId: "97c6fdca-0624-40d0-a346-6a0123312e47",
            noteAmber: "Board 2025 asked in which of NaCl, KCl, AgBr and NiO the Schottky defect is NOT seen: NiO.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which defect is a combination of a vacancy defect and an interstitial defect?", answer: "The Frenkel defect" },
        { prompt: "Why is the Frenkel defect not found in pure alkali metal halides?", answer: "Their cations are too large to fit into interstitial spaces" },
        { prompt: "Which crystal shows both the Schottky and the Frenkel defect?", answer: "AgBr" },
      ],
      traps: [
        {
          title: "Density in the Frenkel defect",
          body: "In a Frenkel defect no ion leaves the crystal, so the density does NOT change. Only the Schottky defect lowers the density.",
        },
        {
          title: "Saying a defect makes the crystal charged",
          body: "Every point defect leaves the crystal electrically neutral. In a Schottky defect it is because the missing cations and anions are equal in number.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-impurity",
      name: "Impurity defects: substitutional and interstitial",
      intuition:
        "An impurity defect means a foreign atom has got into the crystal. Either it takes the seat of a host atom (substitutional) or it squeezes into a gap between host atoms (interstitial). Alloys show both: brass is the first kind, steel the second.",
      definition:
        "- **Impurity defect:** foreign atoms, different from the host atoms, are present in the crystal lattice. There are two kinds.\n" +
        "- **Substitutional impurity defect:** foreign atoms occupy lattice sites in place of host atoms, displacing them. In brass, Zn atoms occupy regular sites of Cu atoms.\n" +
        "- **Vacancy through an aliovalent impurity:** an ion of a different oxidation state creates vacancies. When a little SrCl₂ is added to NaCl as it crystallises, each Sr²⁺ removes two Na⁺ ions to keep the crystal neutral; Sr²⁺ takes one of the two sites and the other stays vacant.\n" +
        "- **Interstitial impurity defect:** impurity atoms occupy interstitial spaces of the lattice. In steel, Fe atoms are at the lattice sites and C atoms are in the interstitial spaces.",
      table: {
        columns: ["Point", "Substitutional impurity defect", "Interstitial impurity defect"],
        rows: [
          {
            cells: ["Where the foreign atom sits", "At a regular lattice site, in place of a host atom", "In an interstitial space between the lattice sites"],
            pyqExampleId: "72cd74a4-f8ba-4704-8df3-8236432a7bf2",
            noteAmber: "Board 2023 asked you to explain both terms.",
          },
          { cells: ["Host atoms", "Some are displaced from their sites", "All stay at their sites"] },
          { cells: ["Example", "Brass: Zn atoms at Cu sites; Sr²⁺ at Na⁺ sites in NaCl", "Steel: C atoms in the spaces of the Fe lattice"] },
        ],
      },
      practiceSet: [
        { prompt: "What is an aliovalent ion?", answer: "An ion whose oxidation state differs from that of the host ion" },
        { prompt: "How many cation vacancies does each Sr²⁺ ion create in NaCl?", answer: "One (it removes two Na⁺ and takes one of the two sites)" },
        { prompt: "Which kind of impurity defect is present in steel?", answer: "Interstitial impurity defect (C atoms in the Fe lattice)" },
      ],
      traps: [
        {
          title: "Saying Sr²⁺ replaces one Na⁺",
          body: "Each Sr²⁺ removes TWO Na⁺ ions, to keep the charge balanced. It occupies one site; the other stays vacant. That vacancy is the point of the example.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-nonstoichiometric",
      name: "Nonstoichiometric defects and F-centres",
      intuition:
        "In a nonstoichiometric defect the ratio of the ions changes from the formula, though the crystal structure does not. Either the metal is short (some metal ions missing, others raised to a higher charge to make up) or the metal is in excess (extra metal atoms or ions, with their electrons trapped in the crystal). An electron trapped in an empty anion site absorbs light and gives the crystal a colour.",
      definition:
        "- **Metal deficiency defect:** possible only for metals with variable oxidation states. Some metal ions are missing; the lost positive charge is made up by ions of the same metal in a higher oxidation state.\n" +
        "- **Metal excess defect, first kind:** a neutral atom or an extra cation sits in an interstitial position (ZnO).\n" +
        "- **Metal excess defect, second kind (F-centres):** when NaCl is heated in sodium vapour, Na atoms deposit on the surface. Cl⁻ ions diffuse to the surface and combine with them to form NaCl, the Na atoms giving up electrons. These electrons diffuse into the crystal and occupy the anion vacancies. An anion vacancy occupied by an electron is an **F-centre** (colour centre).",
      table: {
        columns: ["Defect", "What happens", "Example and formula"],
        rows: [
          { cells: ["Metal deficiency", "One Ni²⁺ is missing; two Ni³⁺ ions at other Ni²⁺ sites make up the charge", "NiO becomes Ni₀.₉₇O₁.₀"] },
          { cells: ["Metal excess (interstitial)", "A neutral Zn atom, or Zn²⁺ ions with electrons, occupy interstitial sites", "ZnO becomes Zn₁₊ₓO₁.₀"] },
          {
            cells: ["Metal excess (F-centres)", "Electrons occupy the anion vacancies; the crystal is coloured", "NaCl turns yellow and becomes Na₁₊ₓCl₁.₀"],
            pyqExampleId: "34b9a2d8-5857-4a1c-9b99-f707808f7f16",
            noteAmber: "Board 2025 asked which colour NaCl shows because of F-centres: yellow.",
          },
        ],
      },
      practiceSet: [
        { prompt: "For which metals is a metal deficiency defect possible?", answer: "Metals that show variable oxidation states" },
        { prompt: "What is an F-centre?", answer: "An anion vacancy occupied by an electron" },
        { prompt: "Does a nonstoichiometric defect change the crystal structure?", answer: "No, only the ratio of the ions changes" },
      ],
      traps: [
        {
          title: "Calling NiO a Schottky crystal",
          body: "In NiO the nickel ions alone are missing and Ni³⁺ makes up the charge. The ratio of ions changes, so it is a metal deficiency (nonstoichiometric) defect, not a Schottky defect.",
        },
        {
          title: "The F-centre without the electron",
          body: "An empty anion site alone is a vacancy. It is an F-centre only when an electron occupies it, and that electron gives the colour.",
        },
      ],
    },
  ],
};
