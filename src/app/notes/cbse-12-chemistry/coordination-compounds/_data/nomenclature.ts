import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CC_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature of Coordination Compounds",
  title: "IUPAC Names and Formulas of Coordination Compounds",
  oneLineDefinition:
    "The IUPAC rules for naming a coordination compound (cation first, ligands in alphabetical order, bis and tris, -ate for an anionic complex, the oxidation state in Roman numerals), the names of common ligands and metals, and writing the formula from a name.",
  whyItMatters:
    "33 questions, twenty-seven of them from board papers, in every year from 2022 to 2026. A two- or three-mark question asking the IUPAC names of two or three complexes comes every year from 2023 to 2026, and one-mark MCQs ask for the correct name (2025, 2026). The favourite complexes are anionic ones that need -ate (K₃[Fe(CN)₆], K₃[Cr(C₂O₄)₃], K₂[Zn(OH)₄], Na[Ag(CN)₂]), nitrite bound through N or O, and en with bis. The board also asks the formula from a name in every year from 2022 to 2026, including iron(III) hexacyanidoferrate(II) in 2023.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbccc-naming",
      name: "Naming a coordination compound",
      intuition:
        "A name is built in the same order every time, like filling a form. Cation first, anion second. Inside the complex, the ligands come first, sorted A to Z by their own names, then the metal, then its oxidation state in brackets. Work out the oxidation state before you write anything: a wrong Roman numeral costs the mark even when the rest is right.",
      definition:
        "- **Find the oxidation state** of the metal first from the charge balance.\n" +
        "- The **cation is named first**, whether the complex is the cation or the anion.\n" +
        "- The **ligands are named in alphabetical order** before the metal, whatever their charge. The prefixes di, tri, bis do not count in the order: ammine comes before aqua, and chlorido before ethane-1,2-diamine.\n" +
        "- Prefixes **di, tri, tetra** give the number of each simple ligand. When the ligand name already has a number in it (ethane-1,2-diamine), use **bis, tris, tetrakis** and put the ligand name in brackets.\n" +
        "- The oxidation state of the metal is a **Roman numeral in brackets**, with no space: cobalt(III).\n" +
        "- In a complex **cation** or a neutral complex the metal keeps its own name (cobalt, platinum). In a complex **anion** the metal name ends in **-ate** (cobaltate, platinate), and some metals take their Latin name (ferrate, argentate, cuprate).\n" +
        "- Words are joined with no gaps inside the complex: triamminetriaquachromium(III).",
      formula: {
        label: "Order of an IUPAC name",
        latex: "\\text{cation} \\;\\;\\text{then}\\;\\; \\underbrace{\\text{ligands, A to Z}}\\,\\underbrace{\\text{metal (-ate in an anion)}}\\,(\\text{oxidation state}) \\;\\;\\text{then}\\;\\; \\text{anion}",
      },
      authoredExample: {
        prompt: "Write the IUPAC name of \\([\\text{CoCl}_2(\\text{en})_2]\\text{Cl}\\).",
        steps: [
          "One \\(\\text{Cl}^{-}\\) outside, so the complex is a cation of charge +1.",
          "Oxidation state: \\(x + 2(-1) + 2(0) = +1\\), so \\(x = +3\\).",
          "Ligands in alphabetical order: chlorido (c) before ethane-1,2-diamine (e). Two chlorido: dichlorido. Two en: bis(ethane-1,2-diamine), since the name already has numbers.",
          "Cation, so the metal is cobalt. Then the anion: chloride.",
        ],
        answer: "Dichloridobis(ethane-1,2-diamine)cobalt(III) chloride",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\([\\text{Ni}(\\text{NH}_3)_6]\\text{Cl}_2\\).",
        steps: ["Two \\(\\text{Cl}^{-}\\) outside and six neutral \\(\\text{NH}_3\\): nickel is +2.", "Six ammine ligands: hexaammine. Cation, so the metal is nickel."],
        answer: "Hexaamminenickel(II) chloride",
      },
      practiceSet: [
        { prompt: "Name \\([\\text{Co}(\\text{NH}_3)_4(\\text{H}_2\\text{O})\\text{Cl}]\\text{Cl}_2\\).", answer: "Tetraammineaquachloridocobalt(III) chloride" },
        { prompt: "Name \\([\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2]\\).", answer: "Diamminedichloridoplatinum(II)" },
        { prompt: "Name \\([\\text{Co}(\\text{en})_3]_2(\\text{SO}_4)_3\\).", answer: "Tris(ethane-1,2-diamine)cobalt(III) sulphate" },
      ],
      pyqExampleId: "6e647867-5d0a-4333-95ef-8a2b0dcb533a",
      traps: [
        {
          title: "Ordering ligands by charge or by prefix",
          body: "Sort by the ligand's own name, ignoring di, tri and bis. \"Dichloridodiammineplatinum\" is wrong; ammine (a) comes before chlorido (c). A 2026 MCQ gave both orders as options.",
        },
        {
          title: "Putting -ate on a cation",
          body: "Only an anionic complex takes -ate. \\([\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2]^{2+}\\) is diamminedichloridoplatinum(IV), never platinate.",
        },
        {
          title: "One m in ammine",
          body: "Ammonia as a ligand is ammine, with two m. \"Amine\" is an organic compound and loses the mark.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbccc-names",
      name: "Names of ligands and of metals in anions",
      intuition:
        "Most of the naming marks are lost on single words: chloro for chlorido, nitro for nitrito-N, iron for ferrate. Learn this short list once. An anionic ligand ends in -ido or -o; four neutral ones have special names; an ambidentate ligand carries the letter of the atom it binds through.",
      definition:
        "- Names of **anionic ligands end in -o**; the 2004 IUPAC recommendation makes chloro into **chlorido**, cyano into **cyanido**, hydroxo into **hydroxido**.\n" +
        "- Neutral ligands keep their names, except **aqua** (\\(\\text{H}_2\\text{O}\\)), **ammine** (\\(\\text{NH}_3\\)), **carbonyl** (CO) and **nitrosyl** (NO).\n" +
        "- An ambidentate ligand shows its donor atom: \\(-\\text{NO}_2\\) bound through N is **nitrito-N**; \\(-\\text{ONO}\\) bound through O is **nitrito-O**; thiocyanate bound through S is **thiocyanato-S**.\n" +
        "- In a complex anion the metal ends in **-ate**. Some use the Latin name: iron becomes **ferrate**, silver **argentate**, copper **cuprate**. Others just add -ate: cobaltate, nickelate, platinate, palladate, zincate, chromate, aluminate.",
      table: {
        columns: ["Ligand or metal", "Name in a complex", "Example"],
        rows: [
          { cells: ["Cl⁻, Br⁻", "chlorido, bromido", "[PtCl₄]²⁻: tetrachloridoplatinate(II)"] },
          { cells: ["CN⁻, OH⁻", "cyanido, hydroxido", "[Zn(OH)₄]²⁻: tetrahydroxidozincate(II)"] },
          { cells: ["C₂O₄²⁻, CO₃²⁻", "oxalato, carbonato", "[Co(NH₃)₅(CO₃)]Cl: pentaamminecarbonatocobalt(III) chloride"] },
          { cells: ["H₂O, NH₃, CO, NO", "aqua, ammine, carbonyl, nitrosyl", "[Ni(CO)₄]: tetracarbonylnickel(0)"] },
          { cells: ["en", "ethane-1,2-diamine, with bis or tris", "[Co(en)₃]³⁺: tris(ethane-1,2-diamine)cobalt(III) ion"] },
          { cells: ["NO₂⁻ through N (written NO₂)", "nitrito-N", "[Co(NH₃)₅(NO₂)]²⁺: pentaamminenitrito-N-cobalt(III) ion"] },
          { cells: ["NO₂⁻ through O (written ONO)", "nitrito-O", "[Co(NH₃)₅(ONO)]²⁺: pentaamminenitrito-O-cobalt(III) ion"] },
          { cells: ["Fe, Ag, Cu in an anion", "ferrate, argentate, cuprate", "K₃[Fe(CN)₆]: potassium hexacyanidoferrate(III)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{K}_4[\\text{Fe}(\\text{CN})_6]\\).",
        steps: [
          "Four \\(\\text{K}^{+}\\) outside: the anion is \\([\\text{Fe}(\\text{CN})_6]^{4-}\\), and \\(x + 6(-1) = -4\\) gives iron +2.",
          "Six cyanido ligands. The complex is an anion, so iron becomes ferrate.",
          "Cation first: potassium.",
        ],
        answer: "Potassium hexacyanidoferrate(II)",
      },
      practiceSet: [
        { prompt: "Name \\(\\text{K}_2[\\text{Zn}(\\text{OH})_4]\\).", answer: "Potassium tetrahydroxidozincate(II)" },
        { prompt: "What is the name of \\(\\text{NH}_3\\) when it is a ligand?", answer: "Ammine (two m)" },
        { prompt: "Name the ion \\([\\text{Co}(\\text{NH}_3)_5(\\text{ONO})]^{2+}\\).", answer: "Pentaamminenitrito-O-cobalt(III) ion" },
      ],
      pyqExampleId: "e64e462e-329c-48da-a877-8cbab1145754",
      traps: [
        {
          title: "Reading the nitrite the wrong way round",
          body: "Look at how the ligand is written. \\(\\text{NO}_2\\) means it is bound through N: nitrito-N. \\(\\text{ONO}\\) means through O: nitrito-O. Its linkage isomer has the other letter.",
        },
        {
          title: "Using the English metal name in an anion",
          body: "Silver in an anion is argentate and iron is ferrate. \"Silverate\" or \"ironate\" scores nothing, and neither does leaving out -ate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbccc-formula",
      name: "Writing the formula from a name",
      intuition:
        "Run the name backwards. The words before the metal tell you what is inside the square bracket. The Roman numeral gives the metal's charge; add the ligand charges and you have the charge on the complex ion. Then add just enough counter ions, named outside the complex, to make the whole compound neutral.",
      definition:
        "- The **central atom is written first**, then the ligands in alphabetical order (an abbreviated ligand such as en is placed by its first letter).\n" +
        "- The whole coordination entity goes in **square brackets**; polyatomic ligands go in round brackets. No space between the ligands and the metal.\n" +
        "- The **charge on the entity** = oxidation state of the metal + sum of the ligand charges. A charged entity written alone shows its charge outside the bracket, number before sign: \\(^{3+}\\), \\(^{4-}\\).\n" +
        "- Add counter ions so that the **charge of the cation(s) balances the charge of the anion(s)**.\n" +
        "- An -ate name means the complex is the anion.",
      formula: {
        label: "Charge on the complex ion",
        latex: "\\text{charge on the entity} = (\\text{oxidation state of the metal}) + \\sum(\\text{charges of the ligands})",
      },
      authoredExample: {
        prompt: "Write the formula of potassium tetracyanidonickelate(II).",
        steps: [
          "Nickelate means the complex is the anion. Nickel is +2 and four \\(\\text{CN}^{-}\\) give \\(-4\\).",
          "Charge on the entity: \\(+2 - 4 = -2\\), so \\([\\text{Ni}(\\text{CN})_4]^{2-}\\).",
          "Two \\(\\text{K}^{+}\\) balance \\(-2\\).",
        ],
        answer: "\\(\\text{K}_2[\\text{Ni}(\\text{CN})_4]\\)",
      },
      selfCheckExample: {
        prompt: "Write the formula of tetraamminediaquacobalt(III) chloride.",
        steps: ["Cobalt is +3; four \\(\\text{NH}_3\\) and two \\(\\text{H}_2\\text{O}\\) are neutral, so the cation is \\(3+\\).", "Three \\(\\text{Cl}^{-}\\) balance it."],
        answer: "\\([\\text{Co}(\\text{NH}_3)_4(\\text{H}_2\\text{O})_2]\\text{Cl}_3\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of hexaamminecobalt(III) sulphate.", answer: "\\([\\text{Co}(\\text{NH}_3)_6]_2(\\text{SO}_4)_3\\): two \\(3+\\) cations balance three \\(2-\\) sulphates" },
        { prompt: "Write the formula of the tetrabromidocuprate(II) ion.", answer: "\\([\\text{CuBr}_4]^{2-}\\)" },
        { prompt: "Write the formula of diamminesilver(I) dicyanidoargentate(I).", answer: "\\([\\text{Ag}(\\text{NH}_3)_2][\\text{Ag}(\\text{CN})_2]\\)" },
      ],
      pyqExampleId: "80dd9b07-3afc-4171-8fbd-a8eaa8384b9a",
      traps: [
        {
          title: "Putting the counter ion inside the bracket",
          body: "Only the groups named before the metal are ligands. A nitrate or chloride named at the end is a counter ion and goes outside the square bracket.",
        },
        {
          title: "Not balancing the charges",
          body: "When both ions carry charges other than 1, find the lowest whole numbers that cancel, as in \\([\\text{Co}(\\text{NH}_3)_6]_2(\\text{SO}_4)_3\\). Check the total charge is zero before you move on.",
        },
      ],
    },
  ],
};
