import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_OXOACIDS_NOTE: SubtopicNote = {
  subtopicName: "Oxoacids",
  title: "Oxoacids of Sulfur and the Halogens",
  oneLineDefinition:
    "The names, formulae and structures of the oxoacids of sulfur and of the halogens, how acid strength changes with oxidation state, and how to find the oxidation state of the central atom.",
  whyItMatters:
    "9 questions. Seven were set in board papers, and six of those ask you to draw structures: four sulfur oxoacids including two the present textbook does not teach (2015), chloric and peroxydisulfuric acids (2023), peroxymonosulfuric acid (2024), sulfuric and thiosulfuric acids (2025), chlorous and perchloric acids (2025), and perchloric acid (2026). The seventh asked the oxidation state of bromine in an oxoacid (2026). The textbook adds the oxoacids of chlorine and the oxidation state of sulfur in a pyro acid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgp-sulfur-oxoacids",
      name: "Oxoacids of sulfur",
      intuition:
        "Every sulfur oxoacid is built from the same piece: a sulfur atom with oxygens around it, some as S=O and some as S-OH. The acidic hydrogens always sit on oxygen. The acids differ only in how two such pieces are joined: through one oxygen (pyro), through an O-O peroxide link (peroxy), or with one oxygen swapped for a sulfur (thio).",
      definition:
        "- Many sulfur oxoacids are unstable and exist only in solution or as their salts. The textbook gives six structures.\n" +
        "- In every structure the ionisable hydrogen is on an oxygen, as \\(-\\text{OH}\\), never on sulfur.\n" +
        "- **Pyro (di):** two \\(-\\text{SO}_3\\text{H}\\) units joined through one bridging oxygen, \\(\\text{S}-\\text{O}-\\text{S}\\).\n" +
        "- **Peroxy:** contains a peroxide link \\(-\\text{O}-\\text{O}-\\); in peroxydisulfuric acid it joins the two sulfurs, in peroxymonosulfuric acid it ends in \\(-\\text{O}-\\text{O}-\\text{H}\\).\n" +
        "- **Thio:** one doubly bonded oxygen of sulfuric acid is replaced by a sulfur atom.\n" +
        "- Board 2015 also asked **dithionic acid** \\(\\text{H}_2\\text{S}_2\\text{O}_6\\), \\(\\text{HO}-\\text{SO}_2-\\text{SO}_2-\\text{OH}\\) with a direct S-S bond, and **dithionous acid** \\(\\text{H}_2\\text{S}_2\\text{O}_4\\), \\(\\text{HO}-\\text{SO}-\\text{SO}-\\text{OH}\\). The present textbook does not teach these two, so give them less time.",
      table: {
        columns: ["Acid", "Formula", "Structure (condensed)", "Oxidation state of S"],
        rows: [
          { cells: ["Sulfurous acid", "\\(\\text{H}_2\\text{SO}_3\\)", "\\(\\text{HO}-\\text{S}(=\\text{O})-\\text{OH}\\), one lone pair on S", "\\(+4\\)"] },
          { cells: ["Sulfuric acid", "\\(\\text{H}_2\\text{SO}_4\\)", "\\(\\text{HO}-\\text{SO}_2-\\text{OH}\\): two S=O and two S-OH, tetrahedral", "\\(+6\\)"] },
          { cells: ["Pyrosulfuric (disulfuric) acid", "\\(\\text{H}_2\\text{S}_2\\text{O}_7\\)", "\\(\\text{HO}-\\text{SO}_2-\\text{O}-\\text{SO}_2-\\text{OH}\\)", "\\(+6\\)"] },
          {
            cells: ["Peroxymonosulfuric acid", "\\(\\text{H}_2\\text{SO}_5\\)", "\\(\\text{HO}-\\text{O}-\\text{SO}_2-\\text{OH}\\)", "\\(+6\\)"],
            pyqExampleId: "73fd1f85-7954-4844-80c1-26fdee55673c",
            noteAmber: "Board 2024 asked you to draw this structure.",
          },
          { cells: ["Peroxydisulfuric acid", "\\(\\text{H}_2\\text{S}_2\\text{O}_8\\)", "\\(\\text{HO}-\\text{SO}_2-\\text{O}-\\text{O}-\\text{SO}_2-\\text{OH}\\)", "\\(+6\\)"] },
          { cells: ["Thiosulfuric acid", "\\(\\text{H}_2\\text{S}_2\\text{O}_3\\)", "\\(\\text{HO}-\\text{S}(=\\text{O})(=\\text{S})-\\text{OH}\\)", "\\(+2\\) on average"] },
        ],
      },
      practiceSet: [
        { prompt: "Which sulfur oxoacid has a peroxide link joining two sulfur atoms?", answer: "Peroxydisulfuric acid, \\(\\text{H}_2\\text{S}_2\\text{O}_8\\)" },
        { prompt: "Which oxoacid of sulfur is formed when SO₃ dissolves in concentrated sulfuric acid?", answer: "Pyrosulfuric acid (oleum), \\(\\text{H}_2\\text{S}_2\\text{O}_7\\)" },
        { prompt: "Give the oxidation state of sulfur in sulfurous acid.", answer: "\\(+4\\)" },
        { prompt: "How many S=O double bonds does each sulfur atom carry in pyrosulfuric acid?", answer: "Two" },
      ],
      pyqExampleId: "90ccd471-52d1-4a4f-820d-36aa296a0b3b",
      traps: [
        {
          title: "Hydrogen drawn on sulfur",
          body: "In every oxoacid the acidic hydrogen is bonded to oxygen. Drawing an S-H bond in sulfuric acid loses the structure mark.",
        },
        {
          title: "Pyro against peroxy",
          body: "Pyrosulfuric acid has one oxygen between the sulfurs, \\(\\text{S}-\\text{O}-\\text{S}\\). Peroxydisulfuric acid has two, \\(\\text{S}-\\text{O}-\\text{O}-\\text{S}\\). Count the bridge.",
        },
        {
          title: "Thio means sulfur for oxygen",
          body: "Thiosulfuric acid is sulfuric acid with one doubly bonded oxygen replaced by sulfur. It is not sulfuric acid with an extra sulfur added.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-halogen-oxoacids",
      name: "Oxoacids of the halogens",
      intuition:
        "Start from HOCl and keep adding oxygen atoms to the chlorine as Cl=O bonds: HOClO, HOClO₂, HOClO₃. Each added oxygen pulls electrons away from the O-H bond, so the hydrogen leaves more easily. The more oxygens on the halogen, the higher its oxidation state and the stronger the acid.",
      definition:
        "- Four types: hypohalous \\(\\text{HOX}\\) (\\(+1\\)), halous \\(\\text{HOXO}\\) (\\(+3\\)), halic \\(\\text{HOXO}_2\\) (\\(+5\\)), perhalic \\(\\text{HOXO}_3\\) (\\(+7\\)).\n" +
        "- Fluorine forms only \\(\\text{HOF}\\). Chlorine forms all four. Bromine forms \\(\\text{HOBr}\\), \\(\\text{HOBrO}_2\\) and \\(\\text{HOBrO}_3\\); iodine forms \\(\\text{HOI}\\), \\(\\text{HOIO}_2\\) and \\(\\text{HOIO}_3\\).\n" +
        "- Few are isolated pure, among them \\(\\text{HOF}\\), \\(\\text{HClO}_4\\) and \\(\\text{HIO}_3\\); the others are stable only in solution or as salts.\n" +
        "- **Acid strength increases with the oxidation state of the halogen:** \\(\\text{HOCl} < \\text{HClO}_2 < \\text{HClO}_3 < \\text{HClO}_4\\), from a weak acid (\\(K_a = 3.5 \\times 10^{-8}\\)) to a very strong one (\\(K_a \\gg 1\\)).\n" +
        "- **Drawing them:** the hydrogen is on an oxygen, \\(\\text{H}-\\text{O}-\\text{Cl}\\); the remaining oxygens are joined to chlorine by double bonds.",
      table: {
        columns: ["Name", "Formula", "Oxidation state of Cl", "Structure"],
        rows: [
          { cells: ["Hypochlorous acid", "\\(\\text{HOCl}\\)", "\\(+1\\)", "\\(\\text{H}-\\text{O}-\\text{Cl}\\)"] },
          {
            cells: ["Chlorous acid", "\\(\\text{HOClO}\\) or \\(\\text{HClO}_2\\)", "\\(+3\\)", "\\(\\text{H}-\\text{O}-\\text{Cl}=\\text{O}\\)"],
            pyqExampleId: "a766e6f2-fffd-440c-901c-39b7a4d65471",
            noteAmber: "Board 2025 asked the structures of chlorous and perchloric acids, with uses of helium.",
          },
          { cells: ["Chloric acid", "\\(\\text{HClO}_3\\)", "\\(+5\\)", "\\(\\text{H}-\\text{O}-\\text{Cl}(=\\text{O})_2\\)"] },
          { cells: ["Perchloric acid", "\\(\\text{HClO}_4\\)", "\\(+7\\)", "\\(\\text{H}-\\text{O}-\\text{Cl}(=\\text{O})_3\\), tetrahedral about Cl"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the only oxoacid of chlorine in this list that has been isolated in pure form.", answer: "Perchloric acid, \\(\\text{HClO}_4\\)" },
        { prompt: "Give the oxidation state of iodine in HOIO₃.", answer: "\\(+7\\)" },
        { prompt: "Which halous acid exists for chlorine but not for bromine?", answer: "Chlorous acid, \\(\\text{HOClO}\\); bromine has no \\(\\text{HOBrO}\\)" },
        { prompt: "Why is HClO₄ a stronger acid than HOCl?", answer: "Chlorine is in a higher oxidation state (+7), and acid strength rises with the oxidation state" },
      ],
      pyqExampleId: "0e32c892-1db9-4a85-a7a4-11ec520ce5ab",
      traps: [
        {
          title: "H on chlorine",
          body: "Write \\(\\text{H}-\\text{O}-\\text{Cl}\\), not \\(\\text{H}-\\text{Cl}-\\text{O}\\). The formula is written \\(\\text{HClO}_4\\), but the hydrogen sits on an oxygen.",
        },
        {
          title: "Strength runs with oxidation state",
          body: "More oxygens on the halogen means a higher oxidation state and a stronger acid. Hypochlorous acid is the weakest, not the strongest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-oxoacid-oxidation",
      name: "Oxidation state of the central atom in an oxoacid",
      intuition:
        "An oxoacid is neutral, so the oxidation states add to zero. Count every hydrogen as +1 and every oxygen as −2, and what is left belongs to the central atom. The only catch is a peroxide link: its two oxygens are −1 each, and forgetting this gives sulfur an impossible +7.",
      definition:
        "- Let the central atom be \\(x\\). Hydrogen is \\(+1\\); each ordinary oxygen \\(-2\\); each oxygen of an \\(-\\text{O}-\\text{O}-\\) link \\(-1\\). The sum is zero.\n" +
        "- Count **all** oxygens, including the one in each \\(-\\text{OH}\\). A formula written to show the structure, such as \\(\\text{HOClO}_2\\), still has three oxygens.\n" +
        "- Sulfur's highest state is \\(+6\\) and a halogen's \\(+7\\). An answer above these means a peroxide oxygen was counted as \\(-2\\).\n" +
        "- When two sulfurs are not alike (thiosulfuric acid), the formula gives only their **average**.",
      formula: {
        label: "Oxidation state in an oxoacid",
        latex: "(\\text{number of H})(+1) + x + (\\text{ordinary O})(-2) + (\\text{peroxide O})(-1) = 0",
      },
      authoredExample: {
        prompt: "Find the oxidation state of sulfur in peroxydisulfuric acid, H₂S₂O₈.",
        steps: [
          "Structure \\(\\text{HO}-\\text{SO}_2-\\text{O}-\\text{O}-\\text{SO}_2-\\text{OH}\\): two of the eight oxygens form the peroxide link and are \\(-1\\); the other six are \\(-2\\).",
          "Let each sulfur be \\(x\\): \\(2(+1) + 2x + 6(-2) + 2(-1) = 0\\).",
          "\\(2 + 2x - 12 - 2 = 0\\), so \\(2x = 12\\) and \\(x = +6\\).",
          "Check: counting all eight oxygens as \\(-2\\) would give \\(+7\\), above sulfur's maximum of \\(+6\\). The peroxide link must be counted.",
        ],
        answer: "+6 for each sulfur",
      },
      selfCheckExample: {
        prompt: "Find the oxidation state of sulfur in sulfurous acid, H₂SO₃.",
        steps: ["\\(2(+1) + x + 3(-2) = 0\\).", "\\(x = 6 - 2 = +4\\)."],
        answer: "+4",
      },
      practiceSet: [
        { prompt: "Find the average oxidation state of sulfur in thiosulfuric acid, H₂S₂O₃.", answer: "\\(+2\\), since \\(2 + 2x - 6 = 0\\)" },
        { prompt: "Find the oxidation state of sulfur in pyrosulfuric acid, H₂S₂O₇.", answer: "\\(+6\\), since \\(2 + 2x - 14 = 0\\)" },
        { prompt: "Which oxygen atoms of peroxymonosulfuric acid, H₂SO₅, are counted as minus one?", answer: "The two oxygens of the \\(-\\text{O}-\\text{O}-\\) peroxide link" },
        { prompt: "What is the highest oxidation state sulfur can show?", answer: "\\(+6\\)" },
      ],
      pyqExampleId: "1d38918a-670f-4b9f-bab1-a8735f841a38",
      traps: [
        {
          title: "Peroxide oxygen counted as minus two",
          body: "In \\(\\text{H}_2\\text{SO}_5\\) and \\(\\text{H}_2\\text{S}_2\\text{O}_8\\) two oxygens form a peroxide link and are \\(-1\\) each. Counting them as \\(-2\\) gives a state above \\(+6\\), which sulfur never shows.",
        },
        {
          title: "Average is not each atom",
          body: "In thiosulfuric acid the formula gives \\(+2\\), but that is the average of two different sulfurs. Say 'average' if you quote it.",
        },
      ],
    },
  ],
};
