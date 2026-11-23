import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName: "Classification of Complexes",
  title: "Classifying Complexes by Charge and by Ligands",
  oneLineDefinition:
    "Cationic, anionic and neutral sphere complexes, sorted by the charge on the coordination sphere, and homoleptic and heteroleptic complexes, sorted by the kinds of ligand round the metal.",
  whyItMatters:
    "6 questions. Three were set in board papers: explain cationic, anionic and neutral sphere complexes with examples (2022), pick the neutral complex from four (2024), and explain homoleptic and heteroleptic complexes with examples (2026). The textbook adds deciding whether [CoF₆] with cobalt in the +3 state is cationic or anionic, and sorting four complexes as homoleptic or heteroleptic.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscccc-sphere-charge",
      name: "Cationic, anionic and neutral sphere complexes",
      intuition:
        "Look only at the square bracket and ask what charge it carries. Positive, and it needs anions outside to balance it; negative, and it needs cations outside; zero, and nothing is written outside at all. The counter ions are a clue, but the class belongs to the sphere.",
      definition:
        "- The charge on the coordination sphere is the algebraic sum of the charge on the metal ion and the charges on the ligands.\n" +
        "- **Cationic sphere complex:** a positively charged coordination sphere, or a compound having one. Its counter ion is an anion.\n" +
        "- **Anionic sphere complex:** a negatively charged coordination sphere, or a compound having one. Its counter ion is a cation, and in its name the metal ends in 'ate'.\n" +
        "- **Neutral sphere complex:** the sphere has neither a positive nor a negative charge, so there is no counter ion.",
      table: {
        columns: ["Class", "Charge on the coordination sphere", "Examples from the textbook"],
        rows: [
          { cells: ["Cationic sphere", "Positive", "\\(\\text{[Zn(NH}_3)_4]^{2+}\\); \\(\\text{[Co(NH}_3)_5\\text{Cl]SO}_4\\), sphere \\(\\text{[Co(NH}_3)_5\\text{Cl]}^{2+}\\)"] },
          { cells: ["Anionic sphere", "Negative", "\\(\\text{[Ni(CN)}_4]^{2-}\\); \\(\\text{K}_3\\text{[Fe(CN)}_6]\\), sphere \\(\\text{[Fe(CN)}_6]^{3-}\\)"] },
          {
            cells: ["Neutral sphere", "Zero, no counter ion", "\\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\), \\(\\text{[Ni(CO)}_4]\\)"],
            pyqExampleId: "3232097a-93f0-49b4-8f5f-f7cdd41d6ba9",
            noteAmber: "Board 2024 asked which of four cobalt complexes is neutral: the one with nothing outside the bracket and no charge on it.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Classify Na₄[Fe(CN)₆], [Co(NH₃)₆]Cl₂ and Cr(CO)₆ as cationic, anionic or neutral sphere complexes.",
        steps: [
          "\\(\\text{Na}_4\\text{[Fe(CN)}_6]\\): four \\(\\text{Na}^+\\) outside, sphere \\(\\text{[Fe(CN)}_6]^{4-}\\): anionic.",
          "\\(\\text{[Co(NH}_3)_6]\\text{Cl}_2\\): two \\(\\text{Cl}^-\\) outside, sphere \\(\\text{[Co(NH}_3)_6]^{2+}\\): cationic.",
          "\\(\\text{Cr(CO)}_6\\): Cr(0) and six neutral CO: neutral.",
        ],
        answer: "Anionic; cationic; neutral",
      },
      practiceSet: [
        { prompt: "Chromium is +3 in \\(\\text{[Cr(H}_2\\text{O)}_2\\text{(C}_2\\text{O}_4)_2]\\). Find the charge on the sphere and classify it.", answer: "\\(+3 + 0 + 2(-2) = -1\\): anionic" },
        { prompt: "In an anionic sphere complex, what ending does the name of the metal take?", answer: "'ate' (ferrate, cobaltate, platinate)" },
        { prompt: "Does a neutral sphere complex have counter ions?", answer: "No; its sphere carries no charge to balance" },
      ],
      pyqExampleId: "5ccbf56f-53ad-4f9a-bf4c-a317f9a9e0fc",
      traps: [
        {
          title: "Classifying by the counter ion",
          body: "\\(\\text{K}_3\\text{[Fe(CN)}_6]\\) contains positive \\(\\text{K}^+\\), but it is an anionic sphere complex: the class is the charge on the bracket. Positive ions outside mean a negative sphere.",
        },
        {
          title: "An example without its charge",
          body: "When you give an example, write the sphere with its charge, \\(\\text{[Ni(CN)}_4]^{2-}\\), and show the sum that gives it. A bare formula does not show the examiner which class you mean.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-homo-hetero",
      name: "Homoleptic and heteroleptic complexes",
      intuition:
        "Look at the ligands inside the bracket. If they are all the same kind, the complex is homoleptic (homo means same). If two or more kinds are present, it is heteroleptic (hetero means different). Counter ions outside the bracket are not ligands, so they never count.",
      definition:
        "- **Homoleptic complexes:** the metal ion is bound to **only one type of ligand**. Example: \\(\\text{[Co(NH}_3)_6]^{3+}\\).\n" +
        "- **Heteroleptic complexes:** the metal ion is surrounded by **more than one type of ligand**. Example: \\(\\text{[Co(NH}_3)_4\\text{Cl}_2]^{+}\\), with \\(\\text{NH}_3\\) and \\(\\text{Cl}^-\\).\n" +
        "- Only what lies inside the coordination sphere counts.",
      table: {
        columns: ["Class", "Ligands round the metal", "Examples"],
        rows: [
          { cells: ["Homoleptic", "One type only", "\\(\\text{[Co(NH}_3)_6]^{3+}\\), \\(\\text{[Ni(CN)}_4]^{2-}\\), \\(\\text{[Ni(CO)}_4]\\)"] },
          { cells: ["Heteroleptic", "More than one type", "\\(\\text{[Co(NH}_3)_4\\text{Cl}_2]^{+}\\), \\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\), \\(\\text{[Co(NH}_3)_5\\text{Cl]SO}_4\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Classify \\(\\text{[Co(ONO)(NH}_3)_5]\\text{Cl}_2\\) and \\(\\text{[CoCl(NH}_3)\\text{(en)}_2]^{2+}\\) as homoleptic or heteroleptic.",
        steps: [
          "\\(\\text{[Co(ONO)(NH}_3)_5]\\text{Cl}_2\\): nitrito and ammine inside; the \\(\\text{Cl}^-\\) outside do not count. Two types: heteroleptic.",
          "\\(\\text{[CoCl(NH}_3)\\text{(en)}_2]^{2+}\\): chloro, ammine and en. Three types: heteroleptic.",
        ],
        answer: "Both heteroleptic",
      },
      practiceSet: [
        { prompt: "Is K₄[Fe(CN)₆] homoleptic or heteroleptic?", answer: "Homoleptic: only \\(\\text{CN}^-\\) is bound to iron; \\(\\text{K}^+\\) is a counter ion" },
        { prompt: "Is \\(\\text{[Cr(H}_2\\text{O)}_6]\\text{Cl}_3\\) homoleptic or heteroleptic?", answer: "Homoleptic: six aqua ligands only" },
      ],
      pyqExampleId: "5fdcb67c-7a07-406e-8017-1e5b9f42ff0a",
      traps: [
        {
          title: "Counting the counter ion as a ligand",
          body: "\\(\\text{[Cu(NH}_3)_4]\\text{SO}_4\\) has two kinds of species, but sulphate is outside the bracket, so the complex is homoleptic.",
        },
      ],
    },
  ],
};
