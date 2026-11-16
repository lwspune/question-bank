import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CC_WERNER_NOTE: SubtopicNote = {
  subtopicName: "Werner Theory, Ligands and Nomenclature",
  title: "Werner Theory, Ligands and Nomenclature",
  oneLineDefinition:
    "Werner's two valencies and how many ions a complex gives in water, the kinds of ligand (by donor atoms, chelating, ambidentate), and how to find the oxidation state and write the IUPAC name of a complex.",
  whyItMatters:
    "Eleven NEET questions from 2021 to 2026, the largest page of this chapter. Two count the ions outside the bracket: a 1 : 3 electrolyte (Re-NEET 2026) and the complex with the least conductance (2025). Seven are about ligands: EDTA is hexadentate (2021 and Re-NEET 2024), which ligand is or is not ambidentate (Re-NEET 2024 and NEET 2026), the most stable complex because it has a chelating ligand (2023), and homoleptic against heteroleptic complexes (2023 and NEET 2024). Two are about names: the IUPAC name of a silver complex (2022) and the formula from a name (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchcc-werner",
      name: "Werner's theory and the ions a complex gives",
      intuition:
        "Werner saw that cobalt chloride and ammonia form compounds like CoCl₃·6NH₃ and CoCl₃·5NH₃, and that silver nitrate pulls out a different number of chloride ions from each. His answer: some groups sit tightly on the metal (inside the square bracket) and never leave it in water, and the rest are ordinary ions outside the bracket. So every question here is one count: how many ions are outside the bracket?",
      definition:
        "- **Primary valency** = the oxidation state of the metal. It is ionisable and is satisfied by negative ions.\n" +
        "- **Secondary valency** = the coordination number: the number of donor atoms bonded to the metal. It is non-ionisable and fixes the shape.\n" +
        "- The metal and its ligands in the square bracket form the **coordination sphere**. Ions outside it are **counter ions**.\n" +
        "- Only a chloride outside the bracket gives AgCl with \\(\\text{AgNO}_3\\). A chloride inside the bracket does not.\n" +
        "- Ions per formula unit = 1 complex ion + the counter ions. More ions means higher conductance. A neutral complex gives no ions (a non-electrolyte).\n" +
        "- 1 : 1, 1 : 2, 1 : 3 electrolytes give 2, 3 and 4 ions: \\(\\text{[Co(NH}_3\\text{)}_6\\text{]Cl}_3\\) is 1 : 3.\n" +
        "- A double salt such as Mohr's salt, \\(\\text{FeSO}_4\\cdot(\\text{NH}_4)_2\\text{SO}_4\\cdot 6\\text{H}_2\\text{O}\\), gives all its simple ions in water. A complex such as \\(\\text{K}_4\\text{[Fe(CN)}_6\\text{]}\\) does not give \\(\\text{Fe}^{2+}\\) ions.",
      formula: {
        label: "Silver chloride from the chloride outside the bracket",
        latex:
          "n_{\\text{AgCl}} = n_{\\text{complex}} \\times (\\text{number of } \\text{Cl}^- \\text{ outside the bracket})",
        symbols: [
          { symbol: "\\(n_{\\text{AgCl}}\\)", meaning: "moles of silver chloride formed with excess silver nitrate" },
          { symbol: "\\(n_{\\text{complex}}\\)", meaning: "moles of the complex taken" },
        ],
      },
      authoredExample: {
        prompt:
          "0.10 mol of the octahedral complex PtCl₄·4NH₃ is treated with excess \\(\\text{AgNO}_3\\). Write its formula, find the moles of AgCl formed and say what type of electrolyte it is.",
        steps: [
          "Octahedral means 6 donor atoms on platinum: 4 \\(\\text{NH}_3\\) and 2 \\(\\text{Cl}\\) inside the bracket.",
          "The formula is \\(\\text{[Pt(NH}_3\\text{)}_4\\text{Cl}_2\\text{]Cl}_2\\): two chlorides are outside.",
          "\\(n_{\\text{AgCl}} = 0.10 \\times 2 = 0.20\\) mol.",
          "It gives 1 complex cation and 2 chloride ions, 3 ions in all: a 1 : 2 electrolyte.",
        ],
        answer: "\\(\\text{[Pt(NH}_3\\text{)}_4\\text{Cl}_2\\text{]Cl}_2\\); 0.20 mol AgCl; a 1 : 2 electrolyte",
      },
      selfCheckExample: {
        prompt:
          "One mole of the octahedral complex CoCl₃·4NH₃ is treated with excess \\(\\text{AgNO}_3\\). How many moles of AgCl form, and what type of electrolyte is it?",
        steps: [
          "Six donor atoms: 4 \\(\\text{NH}_3\\) and 2 \\(\\text{Cl}\\) inside, so the formula is \\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]Cl}\\).",
          "One chloride is outside, so 1 mol AgCl forms.",
          "One complex cation and one chloride ion: 2 ions.",
        ],
        answer: "1 mol AgCl; a 1 : 1 electrolyte",
      },
      practiceSet: [
        { prompt: "What are the primary and secondary valencies of cobalt in \\(\\text{[Co(NH}_3\\text{)}_5\\text{Cl]Cl}_2\\)?", answer: "Primary valency 3 (oxidation state +3), secondary valency 6 (coordination number)" },
        { prompt: "How many ions does one formula unit of \\(\\text{K}_4\\text{[Fe(CN)}_6\\text{]}\\) give in water?", answer: "5 (four \\(\\text{K}^+\\) and one \\(\\text{[Fe(CN)}_6\\text{]}^{4-}\\))" },
        { prompt: "The octahedral complex CoCl₃·3NH₃ gives no precipitate with silver nitrate. Write its formula.", answer: "\\(\\text{[Co(NH}_3\\text{)}_3\\text{Cl}_3\\text{]}\\), a non-electrolyte" },
        { prompt: "At equal concentration, which conducts better in water: \\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]Cl}\\) or \\(\\text{[Co(NH}_3\\text{)}_5\\text{Cl]Cl}_2\\)?", answer: "\\(\\text{[Co(NH}_3\\text{)}_5\\text{Cl]Cl}_2\\): it gives 3 ions, the other only 2" },
      ],
      pyqExampleId: "b29051a3-acf0-41f4-a5d7-818f3f6ef5e0",
      traps: [
        {
          title: "Chloride inside the bracket never precipitates",
          body: "In \\(\\text{[Co(NH}_3\\text{)}_5\\text{Cl]Cl}_2\\) only the two chlorides outside the bracket give AgCl. Counting all three is the usual slip.",
        },
        {
          title: "A neutral complex conducts least",
          body: "A complex with no counter ions, such as \\(\\text{[Co(NH}_3\\text{)}_3\\text{Cl}_3\\text{]}\\), gives no ions in water, so it has the lowest conductance of any in a list.",
        },
        {
          title: "Primary valency is not the coordination number",
          body: "Primary valency is the oxidation state (ionisable). Secondary valency is the coordination number (non-ionisable). In \\(\\text{[Co(NH}_3\\text{)}_6\\text{]Cl}_3\\) they are 3 and 6.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcc-ligands",
      name: "Ligands: denticity, chelates and ambidentate ligands",
      intuition:
        "A ligand is a molecule or ion that gives a lone pair of electrons to the metal. Count how many of its atoms bond to the metal at once: that is its denticity. A ligand that grips the metal with two or more atoms closes a ring, a chelate, and holds on much more firmly. A few small ligands have two different atoms that could bond, but use only one at a time: they are ambidentate.",
      definition:
        "- **Unidentate**: binds through one atom (\\(\\text{Cl}^-\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{NH}_3\\)).\n" +
        "- **Didentate**: two atoms (ethane-1,2-diamine, en, through two N; oxalate through two O). **Polydentate**: several atoms. EDTA⁴⁻ binds through 2 N and 4 O, so it is hexadentate.\n" +
        "- **Chelate**: a didentate or polydentate ligand bound through two or more atoms at once. Chelate complexes are more stable than complexes of similar unidentate ligands (the chelate effect).\n" +
        "- **Ambidentate**: can bind through two different atoms, but one at a time: \\(\\text{NO}_2^-\\) (through N or O), \\(\\text{SCN}^-\\) (through S or N).\n" +
        "- **Homoleptic**: only one kind of ligand (\\(\\text{[Co(NH}_3\\text{)}_6\\text{]}^{3+}\\)). **Heteroleptic**: more than one kind (\\(\\text{[Co(NH}_3\\text{)}_4\\text{Cl}_2\\text{]}^{+}\\)).",
      table: {
        columns: ["Ligand", "Donor atoms", "Type"],
        rows: [
          { cells: ["\\(\\text{Cl}^-\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{NH}_3\\)", "One (Cl, O, N)", "Unidentate"] },
          { cells: ["Ethane-1,2-diamine (en)", "Two N", "Didentate, chelating"] },
          { cells: ["Oxalate, \\(\\text{C}_2\\text{O}_4^{2-}\\)", "Two O", "Didentate, chelating"], noteAmber: "Re-NEET 2024: oxalate was the one ligand in the list that is NOT ambidentate." },
          { cells: ["EDTA⁴⁻", "Two N and four O", "Hexadentate"], noteAmber: "NEET 2021 and Re-NEET 2024 both asked that EDTA is hexadentate." },
          { cells: ["Nitrite, \\(\\text{NO}_2^-\\)", "N or O, one at a time", "Ambidentate"] },
          { cells: ["Thiocyanate, \\(\\text{SCN}^-\\)", "S or N, one at a time", "Ambidentate"] },
        ],
      },
      pyqExampleId: "d5f8d92e-0bb9-4cbb-a992-2fdf93ef1627",
      selfCheckExample: {
        prompt: "Which is more stable, \\(\\text{[Ni(NH}_3\\text{)}_6\\text{]}^{2+}\\) or \\(\\text{[Ni(en)}_3\\text{]}^{2+}\\), and why?",
        steps: [
          "Both have six N atoms on nickel.",
          "In the second, each en binds through two N atoms and closes a ring: a chelate.",
          "Chelate complexes are more stable than those of similar unidentate ligands.",
        ],
        answer: "\\(\\text{[Ni(en)}_3\\text{]}^{2+}\\), because en is a chelating ligand",
      },
      practiceSet: [
        { prompt: "How many donor atoms does ethane-1,2-diamine use when it binds a metal?", answer: "Two (both N atoms)" },
        { prompt: "Is \\(\\text{[Fe(CN)}_6\\text{]}^{4-}\\) homoleptic or heteroleptic?", answer: "Homoleptic (only one kind of ligand)" },
        { prompt: "How many donor atoms does the EDTA⁴⁻ ion use, and how many of them are oxygen?", answer: "Six, four of them oxygen" },
        { prompt: "Through which two atoms can the nitrite ion bind to a metal?", answer: "Through N or through O, one at a time" },
      ],
      traps: [
        {
          title: "Two donor atoms does not make a ligand ambidentate",
          body: "Oxalate has two oxygen donors, but it binds through both at once, so it is didentate. An ambidentate ligand has two DIFFERENT donor atoms and uses only one of them.",
        },
        {
          title: "EDTA has six donors, not four",
          body: "EDTA⁴⁻ binds through two nitrogen atoms as well as four oxygen atoms: hexadentate.",
        },
        {
          title: "The chelate wins on stability",
          body: "Of two complexes, the one with a chelating ligand such as en, oxalate or EDTA is the more stable, even when both have the same donor atoms.",
        },
        {
          title: "One kind of ligand, not one ligand",
          body: "Homoleptic means all the ligands are the same kind, however many there are. \\(\\text{[Co(NH}_3\\text{)}_6\\text{]}^{3+}\\) has six ligands and is homoleptic.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchcc-naming",
      name: "Oxidation state and IUPAC names of complexes",
      intuition:
        "First find the metal's oxidation state: the charges of the ligands and the metal must add up to the charge on the complex. Then name it the way IUPAC builds the name: ligands first in alphabetical order, then the metal with its oxidation state in Roman numerals. If the complex is an anion, the metal's name ends in -ate.",
      definition:
        "- Name the cation first, then the anion, as in any salt.\n" +
        "- Inside the complex: ligands in **alphabetical order**, then the metal. Prefixes (di, tri, tetra) are ignored when ordering.\n" +
        "- Anionic ligands end in -o: chlorido, cyanido, oxalato, nitrito-N. Neutral ligands keep their name, except **aqua** (\\(\\text{H}_2\\text{O}\\)), **ammine** (\\(\\text{NH}_3\\)), carbonyl (CO) and nitrosyl (NO).\n" +
        "- Oxidation state in Roman numerals in brackets after the metal: cobalt(III).\n" +
        "- Anionic complex: the metal name ends in **-ate**: ferrate (Fe), cuprate (Cu), argentate (Ag), aurate (Au), cobaltate (Co).\n" +
        "- In a formula, the counter ions balance the charge: a complex cation of charge 2+ needs two \\(\\text{Cl}^-\\) outside the bracket.",
      formula: {
        label: "Oxidation state of the central metal",
        latex: "x + \\sum q_{\\text{ligands}} = q_{\\text{complex}}",
        symbols: [
          { symbol: "\\(x\\)", meaning: "oxidation state of the metal" },
          { symbol: "\\(q_{\\text{ligands}}\\)", meaning: "charge on each ligand (0 for a neutral ligand)" },
          { symbol: "\\(q_{\\text{complex}}\\)", meaning: "charge on the whole complex ion" },
        ],
      },
      authoredExample: {
        prompt: "Find the oxidation state of iron in \\(\\text{K}_3\\text{[Fe(CN)}_6\\text{]}\\) and write its IUPAC name.",
        steps: [
          "Three \\(\\text{K}^+\\) outside, so the complex ion is \\(\\text{[Fe(CN)}_6\\text{]}^{3-}\\).",
          "\\(x + 6(-1) = -3\\), so \\(x = +3\\).",
          "Six cyanide ligands: hexacyanido. The complex is an anion, so iron becomes ferrate.",
        ],
        answer: "+3; potassium hexacyanidoferrate(III)",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{[Pt(NH}_3\\text{)}_2\\text{Cl(NO}_2\\text{)]}\\), where \\(\\text{NO}_2^-\\) binds through nitrogen.",
        steps: [
          "\\(x + 0 + (-1) + (-1) = 0\\), so platinum is +2.",
          "Ligands in alphabetical order: ammine, chlorido, nitrito-N.",
          "The complex is neutral, so the metal keeps its name: platinum.",
        ],
        answer: "Diamminechloridonitrito-N-platinum(II)",
      },
      practiceSet: [
        { prompt: "What is the oxidation state of nickel in \\(\\text{[Ni(CO)}_4\\text{]}\\)?", answer: "0" },
        { prompt: "What is the oxidation state of cobalt in \\(\\text{K}_3\\text{[Co(C}_2\\text{O}_4\\text{)}_3\\text{]}\\)?", answer: "+3" },
        { prompt: "Write the formula of potassium trioxalatoaluminate(III).", answer: "\\(\\text{K}_3\\text{[Al(C}_2\\text{O}_4\\text{)}_3\\text{]}\\)" },
        { prompt: "What is iron called in the name of an anionic complex?", answer: "Ferrate" },
      ],
      pyqExampleId: "a40b8818-9e26-4035-b16f-884b3d0359ff",
      traps: [
        {
          title: "Silver in an anion is argentate",
          body: "In an anionic complex silver is named argentate, as in dicyanidoargentate(I), not dicyanidosilver. Silver in a cationic or neutral complex stays silver.",
        },
        {
          title: "Ammine has two m's",
          body: "\\(\\text{NH}_3\\) as a ligand is ammine. Amine with one m is an organic compound.",
        },
        {
          title: "Count the counter ions from the charge",
          body: "Tetraammineaquachloridocobalt(III) has a charge of +2 (Co +3, one \\(\\text{Cl}^-\\) inside), so its chloride salt is \\(\\text{[Co(NH}_3\\text{)}_4\\text{(H}_2\\text{O)Cl]Cl}_2\\), with two chlorides outside.",
        },
      ],
    },
  ],
};
