import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_WERNER_NOTE: SubtopicNote = {
  subtopicName: "Werner’s Theory of Coordination Compounds",
  title: "Werner's Theory: Primary and Secondary Valence",
  oneLineDefinition:
    "Werner's postulates of primary and secondary valence, finding the formula of a complex from the moles of AgCl it precipitates, the number of ions it gives in water, and how a double salt differs from a complex.",
  whyItMatters:
    "30 questions, and twenty-six of them come from board papers, in every year from 2022 to 2026. The board asks the formula of a complex from the moles of AgCl precipitated (2022 to 2025), the moles of AgCl a given formula gives (2025), the number of ions in solution (2023), the order of conductivity (2025), the non-ionisable complex (2024), the secondary valency of the metal (2023 to 2026) the statements of Werner's theory (2025, 2026) and the difference between a complex and a double salt (2025). Most are one-mark MCQs that need one idea: only what is outside the square bracket ionises.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbccc-valences",
      name: "Primary and secondary valence",
      intuition:
        "Werner had no idea of electrons when he wrote his theory. He counted how much AgCl each cobalt chloride and ammonia compound gave with silver nitrate, and measured how well its solution conducted. The numbers told him the metal holds some groups loosely, as ions that leave in water, and some groups tightly, in a fixed shape around it. The loose bonds are the primary valence; the tight ones are the secondary valence.",
      definition:
        "Werner's postulates:\n" +
        "- In coordination compounds metals show two types of linkages (valences): **primary** and **secondary**.\n" +
        "- The primary valences are normally **ionisable** and are satisfied by **negative ions**.\n" +
        "- The secondary valences are **non-ionisable**. They are satisfied by **neutral molecules or negative ions**. The secondary valence is equal to the **coordination number** and is fixed for a metal.\n" +
        "- The ions or groups bound by the secondary linkages have characteristic **spatial arrangements** for each coordination number (octahedral, tetrahedral, square planar). Today these are called coordination polyhedra.\n" +
        "- In modern words, the primary valence is the **oxidation state** of the metal and the secondary valence is its coordination number.\n" +
        "- The species inside the square bracket is the coordination entity; the ions outside it are counter ions.",
      table: {
        columns: ["Point", "Primary valence", "Secondary valence"],
        rows: [
          { cells: ["Ionises in water?", "Yes, ionisable", "No, non-ionisable"] },
          { cells: ["Satisfied by", "Negative ions only", "Neutral molecules or negative ions"] },
          { cells: ["Modern name", "Oxidation state of the metal", "Coordination number of the metal"] },
          { cells: ["Direction in space", "Non-directional", "Directional: fixes the shape of the complex"] },
          {
            cells: ["In [Co(en)₃]Cl₃", "3: three Cl⁻ outside, cobalt is +3", "6: three didentate en give six donor atoms"],
            noteAmber: "Board 2025 asked this as an MCQ: primary 3, secondary 6.",
            pyqExampleId: "4bceac14-665b-4725-8516-95cfd0d0df0e",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Give the primary and the secondary valence of cobalt in \\([\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2\\).",
        steps: [
          "Five \\(\\text{NH}_3\\) are neutral, one \\(\\text{Cl}^{-}\\) is inside and two \\(\\text{Cl}^{-}\\) are outside, so cobalt is +3: primary valence 3.",
          "Inside the bracket, five \\(\\text{NH}_3\\) and one \\(\\text{Cl}^{-}\\) give six donor atoms: secondary valence 6.",
        ],
        answer: "Primary valence 3, secondary valence 6",
      },
      practiceSet: [
        { prompt: "Which valence of the metal can be satisfied by a neutral molecule such as water?", answer: "The secondary valence" },
        { prompt: "What is the secondary valence of platinum in \\([\\text{Pt}(\\text{NH}_3)_4]\\text{Cl}_2\\)?", answer: "4: four unidentate ammonia molecules are bound to platinum" },
        { prompt: "Which of Werner's two valences decides the shape of a complex?", answer: "The secondary valence: the groups it holds have a fixed arrangement in space" },
      ],
      pyqExampleId: "0f4b9983-8e61-47be-b2ca-68f36ee98297",
      traps: [
        {
          title: "Counting ligand molecules as the secondary valence",
          body: "Secondary valence is the coordination number, so count donor atoms. Each en or oxalate gives two. The board sets the number of ligand molecules as the wrong option every year.",
        },
        {
          title: "Giving neutral molecules to the primary valence",
          body: "The primary valence is satisfied by negative ions only. \"Neutral molecules or negative ions\" describes the secondary valence, and a 2026 MCQ used exactly that swap as a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbccc-agcl",
      name: "Formula of a complex from the AgCl it precipitates",
      intuition:
        "Silver nitrate can only reach a chloride ion that is free in the solution. A chloride held inside the square bracket is bonded to the metal and stays there. So the moles of AgCl formed per mole of compound tell you exactly how many chlorides sit outside the bracket. The rest of the chlorides, and the neutral molecules, go inside until the coordination number is filled.",
      definition:
        "- Only the counter ions, outside the square bracket, ionise in water. Ligands inside the bracket stay on the metal.\n" +
        "- **Moles of AgCl per mole of compound = number of \\(\\text{Cl}^{-}\\) outside the bracket.**\n" +
        "- The remaining chlorides are ligands. Add neutral molecules (\\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\)) until the coordination number is filled: 6 for \\(\\text{Co}^{3+}\\), \\(\\text{Cr}^{3+}\\), \\(\\text{Ni}^{2+}\\) with water, \\(\\text{Pt}^{4+}\\); 4 for \\(\\text{Pt}^{2+}\\) and \\(\\text{Pd}^{2+}\\).\n" +
        "- Water left over after the sphere is full is written outside as water of crystallisation, for example \\(\\cdot\\,\\text{H}_2\\text{O}\\).\n" +
        "- No AgCl at all means every chloride is inside. If the entity is then charged, the other ions (\\(\\text{K}^{+}\\), \\(\\text{H}^{+}\\)) are its counter ions.\n" +
        "- **Ions in solution = one complex ion + the counter ions.** More ions means higher conductivity. NCERT's cobalt complexes are 1:3, 1:2 and 1:1 electrolytes.",
      formula: {
        label: "What silver nitrate counts",
        latex: "\\text{mol AgCl per mol of compound} = \\text{number of } \\text{Cl}^{-} \\text{ outside the square bracket}",
      },
      authoredExample: {
        prompt: "The purple compound \\(\\text{CoCl}_3\\cdot 5\\text{NH}_3\\) gives two moles of AgCl per mole with excess \\(\\text{AgNO}_3\\). Write its formula, the secondary valence of cobalt and the number of ions it gives in water.",
        steps: [
          "Two moles of AgCl, so two \\(\\text{Cl}^{-}\\) are outside the bracket.",
          "The third chloride is a ligand. With five \\(\\text{NH}_3\\) it makes six groups around cobalt.",
          "Formula: \\([\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2\\). Secondary valence (coordination number) = 6.",
          "In water: \\([\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2 \\rightarrow [\\text{Co}(\\text{NH}_3)_5\\text{Cl}]^{2+} + 2\\text{Cl}^{-}\\), that is one complex ion and two chloride ions.",
        ],
        answer: "\\([\\text{Co}(\\text{NH}_3)_5\\text{Cl}]\\text{Cl}_2\\); secondary valence 6; three ions (a 1:2 electrolyte)",
      },
      selfCheckExample: {
        prompt: "\\(\\text{PtCl}_4\\cdot 2\\text{HCl}\\) gives no AgCl with excess \\(\\text{AgNO}_3\\). Write its formula and the secondary valence of platinum.",
        steps: [
          "No AgCl, so all six chlorides are inside the bracket: \\([\\text{PtCl}_6]^{2-}\\).",
          "The two \\(\\text{H}^{+}\\) are the counter ions.",
        ],
        answer: "\\(\\text{H}_2[\\text{PtCl}_6]\\); secondary valence 6",
      },
      practiceSet: [
        {
          prompt: "One mole of \\(\\text{CoCl}_3\\cdot 6\\text{NH}_3\\) gives three moles of AgCl with excess silver nitrate. Write its formula.",
          answer: "\\([\\text{Co}(\\text{NH}_3)_6]\\text{Cl}_3\\): all three chlorides are outside",
        },
        {
          prompt: "How many ions does \\([\\text{Pt}(\\text{NH}_3)_4]\\text{Cl}_2\\) give in water?",
          answer: "Three: \\([\\text{Pt}(\\text{NH}_3)_4]^{2+}\\) and two \\(\\text{Cl}^{-}\\)",
        },
        {
          prompt: "Solutions of equal concentration of \\([\\text{Co}(\\text{NH}_3)_6]\\text{Cl}_3\\) and \\([\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]\\text{Cl}\\) are compared. Which conducts better, and why?",
          answer: "\\([\\text{Co}(\\text{NH}_3)_6]\\text{Cl}_3\\): it gives four ions, the other gives two",
        },
      ],
      pyqExampleId: "61744249-0121-4e6b-8349-aa15c163b0d3",
      traps: [
        {
          title: "Counting every chlorine in the formula",
          body: "Silver nitrate precipitates only the chloride outside the bracket. \\([\\text{Co}(\\text{NH}_3)_3\\text{Cl}_3]\\) has three chlorines and gives no AgCl at all.",
        },
        {
          title: "Forgetting the water of crystallisation",
          body: "When one chloride moves inside, one water must leave the sphere, and it is still in the compound. Write it outside: \\([\\text{Cr}(\\text{H}_2\\text{O})_5\\text{Cl}]\\text{Cl}_2\\cdot\\text{H}_2\\text{O}\\), not \\([\\text{Cr}(\\text{H}_2\\text{O})_6\\text{Cl}]\\text{Cl}_2\\).",
        },
        {
          title: "Counting the ligands as ions",
          body: "Ammonia and water inside the bracket stay on the metal. \\([\\text{Ni}(\\text{NH}_3)_6]\\text{Cl}_2\\) gives three ions in water, not nine.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-doublesalt",
      name: "Double salt and complex",
      intuition:
        "Both are made by combining stable compounds in a fixed ratio, so in the bottle they look alike. Drop them in water and the difference shows. A double salt falls apart into the simple ions it was made from. A complex keeps its coordination entity whole, so the metal inside it never appears as a free ion.",
      definition:
        "- Both double salts and complexes are formed by the combination of two or more stable compounds in a **stoichiometric ratio**.\n" +
        "- A **double salt** dissociates **completely into simple ions** when dissolved in water. Examples: carnallite \\(\\text{KCl}\\cdot\\text{MgCl}_2\\cdot 6\\text{H}_2\\text{O}\\), Mohr's salt \\(\\text{FeSO}_4\\cdot(\\text{NH}_4)_2\\text{SO}_4\\cdot 6\\text{H}_2\\text{O}\\), potash alum \\(\\text{KAl(SO}_4)_2\\cdot 12\\text{H}_2\\text{O}\\).\n" +
        "- A **complex ion does not dissociate** into its parts. \\([\\text{Fe}(\\text{CN})_6]^{4-}\\) of \\(\\text{K}_4[\\text{Fe}(\\text{CN})_6]\\) does not give \\(\\text{Fe}^{2+}\\) and \\(\\text{CN}^{-}\\) ions.\n" +
        "- So a solution of a double salt gives the tests of all its simple ions; a solution of a complex does not give the test of the metal ion held inside.",
      table: {
        columns: ["Point", "Double salt", "Complex"],
        rows: [
          { cells: ["In water", "Dissociates completely into simple ions", "The complex ion stays whole"] },
          { cells: ["Test for the metal ion", "Given (Mohr's salt gives the Fe²⁺ test)", "Not given (K₄[Fe(CN)₆] gives no Fe²⁺ test)"] },
          { cells: ["Examples", "Carnallite, Mohr's salt, potash alum", "K₄[Fe(CN)₆], [Cu(NH₃)₄]SO₄"] },
        ],
      },
      selfCheckExample: {
        prompt: "A solution of potash alum gives the tests for \\(\\text{K}^{+}\\), \\(\\text{Al}^{3+}\\) and \\(\\text{SO}_4^{2-}\\). Is potash alum a double salt or a complex? Give the reason.",
        steps: [
          "Every simple ion it was made from is free in the solution.",
          "So it dissociated completely in water, which is the mark of a double salt.",
        ],
        answer: "A double salt, because it dissociates completely into its simple ions in water",
      },
      practiceSet: [
        { prompt: "Which ions does a solution of carnallite give?", answer: "\\(\\text{K}^{+}\\), \\(\\text{Mg}^{2+}\\) and \\(\\text{Cl}^{-}\\)" },
        { prompt: "Does a solution of \\(\\text{K}_4[\\text{Fe}(\\text{CN})_6]\\) give the test for \\(\\text{Fe}^{2+}\\)? Why?", answer: "No: the iron stays inside the complex ion \\([\\text{Fe}(\\text{CN})_6]^{4-}\\), which does not dissociate" },
        { prompt: "Name two double salts.", answer: "Any two of carnallite, Mohr's salt and potash alum" },
      ],
      pyqExampleId: "6dc81c4e-1b21-4d77-9dd6-207fe05955d3",
      traps: [
        {
          title: "Calling every compound of two salts a double salt",
          body: "\\(\\text{K}_4[\\text{Fe}(\\text{CN})_6]\\) holds two metals, potassium and iron, but it is a complex: its iron never becomes a free ion. Decide by what happens in water.",
        },
        {
          title: "A difference with one side only",
          body: "\"A double salt dissociates completely\" earns half the marks. Say also that the complex ion does not dissociate, and give an example of each.",
        },
      ],
    },
  ],
};
