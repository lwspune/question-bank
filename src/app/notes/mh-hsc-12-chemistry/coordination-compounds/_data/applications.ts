import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Coordination Compounds",
  title: "Uses of Coordination Compounds",
  oneLineDefinition:
    "Where complexes are used: in biology, in medicine, to estimate the hardness of water and in electroplating, with two named complexes the board has asked about, the brown ring complex and cryolite.",
  whyItMatters:
    "5 questions. Four were set in board papers: the brown complex formed from Fe²⁺ and nitric oxide (2017), the platinum complex used to treat cancer (2023), the composition of cryolite (2023), and examples of metal complexes in biology (2026). The textbook adds: mention two applications of coordination compounds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscccc-uses",
      name: "Applications in biology, medicine, water testing and electroplating",
      intuition:
        "A complex holds a metal ion firmly but gently. Nature uses that to hold magnesium in chlorophyll and iron in haemoglobin; doctors use it to pull lead out of the body or to bind platinum to cancer cells; chemists use it to count the calcium and magnesium ions in hard water; and electroplaters use it to release metal ions slowly so the coating comes out smooth.",
      definition:
        "- **In biology:** several important natural compounds are metal complexes. Chlorophyll in plants is a complex of magnesium; haemoglobin in blood is a complex of iron.\n" +
        "- **In medicine:** the platinum complex **cisplatin**, cis \\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\), is used to treat cancer; **EDTA** is used to treat lead poisoning.\n" +
        "- **Hardness of water:** hardness is due to \\(\\text{Ca}^{2+}\\) and \\(\\text{Mg}^{2+}\\) ions. EDTA forms stable complexes with both, so it is used to estimate hardness.\n" +
        "- **Electroplating:** a stable complex dissociates only slightly and gives a controlled supply of metal ions, and its ligands keep the metal atoms apart, so a smooth protective layer forms. \\(\\text{K[Ag(CN)}_2]\\) and \\(\\text{K[Au(CN)}_2]\\) are used to plate silver and gold.",
      table: {
        columns: ["Field", "Complex used", "Why"],
        rows: [
          {
            cells: ["Biology", "Chlorophyll (Mg), haemoglobin (Fe)", "Natural metal complexes that do the work of photosynthesis and of carrying oxygen"],
            pyqExampleId: "f068d44f-13da-4061-9fa9-97fef81d09aa",
            noteAmber: "Board 2026 asked for examples of metal complexes in biology: name the metal in each.",
          },
          { cells: ["Medicine", "Cisplatin; EDTA", "Cisplatin treats cancer; EDTA treats lead poisoning"] },
          { cells: ["Hardness of water", "EDTA", "Forms stable complexes with \\(\\text{Ca}^{2+}\\) and \\(\\text{Mg}^{2+}\\)"] },
          { cells: ["Electroplating", "\\(\\text{K[Ag(CN)}_2]\\), \\(\\text{K[Au(CN)}_2]\\)", "A controlled supply of \\(\\text{Ag}^+\\) or \\(\\text{Au}^+\\) gives an even coating"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why can EDTA be used to estimate the hardness of water?",
        steps: ["Hardness is caused by \\(\\text{Ca}^{2+}\\) and \\(\\text{Mg}^{2+}\\) ions.", "EDTA forms stable complexes with both, so the amount of EDTA they take up measures them."],
        answer: "EDTA forms stable complexes with the Ca²⁺ and Mg²⁺ ions that cause hardness",
      },
      practiceSet: [
        { prompt: "Name the metal present in chlorophyll.", answer: "Magnesium" },
        { prompt: "Name the complexes used to electroplate silver and gold.", answer: "\\(\\text{K[Ag(CN)}_2]\\) and \\(\\text{K[Au(CN)}_2]\\)" },
        { prompt: "Name a use of EDTA in medicine.", answer: "Treating lead poisoning" },
      ],
      pyqExampleId: "4420701e-f97d-4561-a8d5-2454a7b3845a",
      traps: [
        {
          title: "Cisplatin without the word cis",
          body: "Only the cis isomer of \\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\) is the anticancer drug; the trans isomer is physiologically inactive. Write cisplatin, or cis diamminedichloroplatinum(II).",
        },
        {
          title: "An application with no example",
          body: "'Mention applications' wants the field and a named complex for each: medicine, cisplatin; hardness of water, EDTA. A field alone earns little.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-named-complexes",
      name: "The brown ring complex and cryolite",
      intuition:
        "Two complexes turn up in other chapters and in the board's one-mark questions: the brown ring that proves a nitrate is present, and cryolite, the aluminium complex used in extracting aluminium. Read each formula the way this chapter taught you: find the metal, its ligands and the charge.",
      definition:
        "- This chapter of the present textbook does not teach the brown ring test or the use of cryolite; the board asked them in 2017 and 2023. Learn the two facts below, but give them less time than the rest of the chapter.\n" +
        "- **Brown ring test for a nitrate:** freshly made iron(II) sulphate solution is added, then concentrated sulphuric acid is poured down the side of the tube. The acid and \\(\\text{Fe}^{2+}\\) reduce some nitrate to nitric oxide, NO, which replaces one water molecule of \\(\\text{[Fe(H}_2\\text{O)}_6]^{2+}\\): \\(\\text{[Fe(H}_2\\text{O)}_6]^{2+} + \\text{NO} \\to \\text{[Fe(H}_2\\text{O)}_5\\text{(NO)]}^{2+} + \\text{H}_2\\text{O}\\). This brown complex forms a ring where the two layers meet.\n" +
        "- **Cryolite** is \\(\\text{Na}_3\\text{[AlF}_6]\\), sodium hexafluoroaluminate(III): an anionic complex in which \\(\\text{Al}^{3+}\\) is surrounded by six \\(\\text{F}^-\\). Molten cryolite is the solvent in which alumina is electrolysed to extract aluminium.",
      table: {
        columns: ["Complex", "Formula", "Where it appears"],
        rows: [
          {
            cells: ["Brown ring complex", "\\(\\text{[Fe(H}_2\\text{O)}_5\\text{(NO)]}^{2+}\\)", "Test for nitrate ions"],
            pyqExampleId: "b1a9971b-3202-4863-9e8b-a53d715b673f",
            noteAmber: "Board 2017 asked this as an MCQ: the other ligands are water, because iron enters as its aqua complex.",
          },
          { cells: ["Cryolite", "\\(\\text{Na}_3\\text{[AlF}_6]\\), sodium hexafluoroaluminate(III)", "Solvent for alumina in the extraction of aluminium"] },
        ],
      },
      selfCheckExample: {
        prompt: "In the brown ring test, which ligand of \\(\\text{[Fe(H}_2\\text{O)}_6]^{2+}\\) is replaced, and by what?",
        steps: ["Nitric oxide, NO, from the reduction of nitrate, takes the place of one water molecule."],
        answer: "One H₂O ligand is replaced by NO, giving [Fe(H₂O)₅(NO)]²⁺",
      },
      practiceSet: [
        { prompt: "What is the coordination number of aluminium in cryolite?", answer: "6" },
        { prompt: "In the brown ring test, which reagent is poured slowly down the side of the test tube?", answer: "Concentrated sulphuric acid" },
      ],
      pyqExampleId: "f6217866-bfb9-44fd-8fb1-b59e7d86be2b",
      traps: [
        {
          title: "Naming aluminium without 'ate'",
          body: "In \\(\\text{Na}_3\\text{[AlF}_6]\\) the sphere \\(\\text{[AlF}_6]^{3-}\\) is an anion, so aluminium becomes aluminate: sodium hexafluoroaluminate(III), not sodium hexafluoroaluminium(III).",
        },
      ],
    },
  ],
};
