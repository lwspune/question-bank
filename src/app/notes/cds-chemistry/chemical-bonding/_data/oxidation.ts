import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_BO_OXIDATION_NOTE: SubtopicNote = {
  subtopicName: "Valency, Oxidation States and Molecular Formula",
  title: "Valency and Oxidation Numbers",
  oneLineDefinition:
    "The rules for working out an oxidation number, why hydrogen and nitrogen take several, and which elements show more than one valency.",
  whyItMatters:
    "Four CDS questions, the largest page in the chapter. Two ask which element or oxide has several or the highest oxidation states; two ask for valencies that change (phosphorus 3 and 5, iron 2 and 3).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschbo-oxidation-numbers",
      name: "Working out oxidation numbers",
      intuition:
        "An oxidation number is the charge an atom would carry if every bond were fully ionic. A few fixed values (oxygen −2, hydrogen +1) let you find any unknown, because the numbers in a neutral molecule must add up to zero.",
      definition:
        "The rules:\n" +
        "- A free element is **0** (O₂, Na, H₂).\n" +
        "- **Oxygen** is usually **−2** (−1 in peroxides).\n" +
        "- **Hydrogen** is **+1** with non-metals (H₂O, HCl) but **−1 in metal hydrides** (NaH). So hydrogen has **more than one** oxidation number.\n" +
        "- The numbers in a neutral compound **add up to 0**; in an ion, to its charge.\n" +
        "- Nitrogen in its oxides: N₂O **+1**, NO **+2**, N₂O₃ +3, NO₂ **+4**, N₂O₅ **+5** (its highest).",
      formula: {
        label: "Sum rule",
        latex: "\\sum (\\text{oxidation numbers}) = \\text{charge on the species}",
      },
      authoredExample: {
        prompt: "Find the oxidation number of sulphur in H₂SO₄.",
        steps: [
          "Let sulphur be x. Hydrogen is +1, oxygen −2.",
          "2(+1) + x + 4(−2) = 0.",
          "x = +6.",
        ],
        answer: "+6.",
      },
      selfCheckExample: {
        prompt: "Find the oxidation number of manganese in KMnO₄.",
        steps: [
          "K is +1, O is −2; let Mn be x.",
          "+1 + x + 4(−2) = 0.",
          "x = +7.",
        ],
        answer: "+7.",
      },
      pyqExampleId: "be5b4d77-1ee0-4558-883a-f274fc09aa31",
      practiceSet: [
        { prompt: "What is the oxidation number of hydrogen in sodium hydride, NaH?", answer: "−1" },
        { prompt: "What is the oxidation number of carbon in CO₂?", answer: "+4" },
        { prompt: "What is the oxidation number of oxygen in O₂?", answer: "0" },
      ],
      traps: [
        {
          title: "Hydrogen is not always +1",
          body: "Hydrogen is +1 with non-metals, **−1** in metal hydrides such as NaH, and 0 in H₂. 'Hydrogen can have more than one oxidation number' is the true statement.",
        },
        {
          title: "N₂O₅ is +5, the highest for nitrogen",
          body: "Work each oxide out with oxygen at −2: N₂O is +1, NO +2, NO₂ +4, N₂O₅ +5. Do not judge by the number of oxygen atoms alone.",
        },
        {
          title: "Peroxide oxygen is −1",
          body: "In hydrogen peroxide, H₂O₂, each oxygen is −1, not −2, because the two oxygens are bonded to each other.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschbo-variable-valency",
      name: "Elements with more than one valency",
      intuition:
        "Some elements can use different numbers of electrons to bond. Phosphorus can share three or all five of its outer electrons. Transition metals such as iron can lose two or three, because their outer s and inner d electrons are close in energy.",
      definition:
        "The facts:\n" +
        "- **Phosphorus**: valency **3 and 5** (PCl₃ and PCl₅). It can expand its octet using d orbitals.\n" +
        "- **Sulphur**: 2, 4 and 6 (H₂S, SO₂, SO₃).\n" +
        "- **Transition metals** show **variable oxidation states**: **iron +2 and +3**, copper +1 and +2.\n" +
        "- Alkali and alkaline earth metals have **one** state: Na and Li +1, Ca and Mg +2.",
      table: {
        columns: ["Element", "Valencies or oxidation states", "Examples"],
        rows: [
          {
            cells: ["Phosphorus", "3 and 5", "PCl₃, PCl₅"],
            pyqExampleId: "cfe61850-7780-4af1-b3b3-048a5f1eeba6",
          },
          { cells: ["Sulphur", "2, 4, 6", "H₂S, SO₂, SO₃"] },
          { cells: ["Iron", "+2 and +3", "FeSO₄, FeCl₃"] },
          { cells: ["Copper", "+1 and +2", "Cu₂O, CuO"] },
          { cells: ["Sodium, lithium", "+1 only", "NaCl, LiCl"] },
          { cells: ["Calcium", "+2 only", "CaCl₂"] },
        ],
      },
      pyqExampleId: "69b8e798-5d64-4760-bfb4-9cf635b9805d",
      practiceSet: [
        { prompt: "Give the three common valencies of sulphur.", answer: "2, 4 and 6" },
        { prompt: "What are the two common oxidation states of copper?", answer: "+1 and +2" },
      ],
      traps: [
        {
          title: "Only the transition metal varies",
          body: "Among sodium, calcium, lithium and iron, only **iron** (a transition metal) shows variable oxidation states. The others have one each.",
        },
        {
          title: "Phosphorus is 3 and 5, not 3 and 4",
          body: "Phosphorus shares three electrons (PCl₃) or all five (PCl₅). Pairs such as 2, 3 or 4, 5 are distractors.",
        },
      ],
    },
  ],
};
