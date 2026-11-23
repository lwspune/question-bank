import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "IUPAC Nomenclature of Coordination Compounds",
  title: "Naming Complexes and Writing Their Formulas",
  oneLineDefinition:
    "The IUPAC rules for naming a complex, the names of ligands and of metals in anionic complexes, and how to read a name back into a formula.",
  whyItMatters:
    "13 questions. Nine were set in board papers, and six of them gave a name and asked for the formula: tetraamminedichloroplatinum(IV) chloride (2016), copper(II) hexacyanoferrate(II) (2018), sodium hexacyanoferrate(III) (2022, 2026), tetraamminedibromoplatinum(IV) bromide (2023) and sodium hexanitrocobaltate(III) (2024). The other three went the other way: the IUPAC name of K₄[Fe(CN)₆] (2014), of Na₃[AlF₆] (2024) and of [Cu(NH₃)₄]²⁺ with Na₃[AlF₆] (2025). The textbook adds the name of [Pt(en)₂(SCN)₂]²⁺ and more formulas from names.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscccc-naming-rules",
      name: "IUPAC rules for naming a complex",
      intuition:
        "A complex's name is built in a fixed order, like an address. Name the ligands first, in alphabetical order, each with a number prefix; then the metal, with 'ate' on the end if the sphere is negative; then the metal's oxidation state in Roman numerals. In a salt, the cation is named first and the anion second, as in any ionic compound.",
      definition:
        "- **Rule 1:** name the ligands first and then the metal.\n" +
        "- **Rule 2:** anionic ligands change the ending -ide to -o and -ate to -ato (chloride to chloro, oxalate to oxalato).\n" +
        "- **Rule 3:** the name of the complex is one word, with no space between ligand names or between the ligand names and the metal.\n" +
        "- **Rule 4:** after the metal, write its oxidation state in Roman numerals in brackets, with no space: cobalt(III).\n" +
        "- **Rule 5:** more than one ligand of a type is shown by the prefixes di, tri, tetra, penta, hexa.\n" +
        "- **Rule 6:** different ligands are written in alphabetical order, ignoring the number prefixes: tetraaqua comes before dichloro.\n" +
        "- **Rule 7:** if a ligand name already contains a number prefix, use bis, tris, tetrakis and put the ligand in brackets: \\(\\text{(en)}_3\\) is tris(ethylenediamine).\n" +
        "- **Rule 8:** the metal keeps its usual name in a cationic or neutral complex; in an anionic complex its name ends in 'ate'.",
      formula: {
        label: "Order of a name",
        latex: "\\text{cation} \\;+\\; \\text{ligands (alphabetical, with prefixes)} \\,\\text{metal(O.S.)} \\;+\\; \\text{anion}",
      },
      authoredExample: {
        prompt: "Write the IUPAC name of \\(\\text{[Co(NH}_3)_5\\text{Cl]Cl}_2\\).",
        steps: [
          "Given: inside the sphere, five \\(\\text{NH}_3\\) (ammine) and one \\(\\text{Cl}^-\\) (chloro); two \\(\\text{Cl}^-\\) outside.",
          "Oxidation state: the sphere is \\(+2\\), so \\(x + 5(0) + (-1) = +2\\) and \\(x = +3\\).",
          "Ligands in alphabetical order: ammine (a) before chloro (c), so pentaamminechloro.",
          "The sphere is a cation, so cobalt keeps its name: pentaamminechlorocobalt(III).",
          "The anion outside is named last: chloride.",
        ],
        answer: "Pentaamminechlorocobalt(III) chloride",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{K}_3\\text{[Al(C}_2\\text{O}_4)_3]\\).",
        steps: [
          "Sphere \\(\\text{[Al(C}_2\\text{O}_4)_3]^{3-}\\): \\(x + 3(-2) = -3\\), so Al is +3.",
          "Three oxalato ligands: trioxalato. Anionic sphere: aluminate. Cation potassium first.",
        ],
        answer: "Potassium trioxalatoaluminate(III)",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of \\(\\text{[Ni(CN)}_4]^{2-}\\).", answer: "Tetracyanonickelate(II) ion" },
        { prompt: "Write the IUPAC name of \\(\\text{[Co(NH}_3)_5\\text{CO}_3]\\text{Cl}\\).", answer: "Pentaamminecarbonatocobalt(III) chloride" },
        { prompt: "Write the IUPAC name of Fe(CO)₅.", answer: "Pentacarbonyliron(0)" },
      ],
      pyqExampleId: "3bade89a-ddd2-4b40-a2f3-6c933572a37c",
      traps: [
        {
          title: "Alphabetising the prefix",
          body: "Order the ligands by their own names, not by di, tri or tetra. Tetraammine (a) still comes before dichloro (c).",
        },
        {
          title: "Leaving out the oxidation state",
          body: "The Roman numeral is part of the name, written straight after the metal: hexacyanoferrate(II), not hexacyanoferrate. Without it the name does not say which iron complex you mean.",
        },
        {
          title: "Putting 'ate' on a cationic complex",
          body: "'Ate' marks an anionic sphere only. \\(\\text{[Cu(NH}_3)_4]^{2+}\\) is tetraamminecopper(II), never tetraamminecuprate(II).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-ligand-names",
      name: "Names of ligands and of metals in anionic complexes",
      intuition:
        "Most of a name is look-up work. Learn the ligand names once (chloro, cyano, aqua, ammine) and the 'ate' names of the metals, several of which come from the Latin name of the metal: ferrate for iron, cuprate for copper, aurate for gold.",
      definition:
        "- Anionic ligands end in -o: bromo, chloro, fluoro, iodo, cyano, hydroxo, carbonato, sulphato, nitrato, oxalato.\n" +
        "- An ambidentate ligand is named by its donor atom: \\(\\text{NO}_2^-\\) bonded through N is nitro, through O nitrito; \\(\\text{SCN}^-\\) through S is thiocyanato, through N isothiocyanato.\n" +
        "- Neutral ligands: \\(\\text{NH}_3\\) ammine (two m), \\(\\text{H}_2\\text{O}\\) aqua, CO carbonyl, en ethylenediamine.\n" +
        "- In an anionic complex the metal's name ends in 'ate', as in the table.",
      table: {
        columns: ["Ligand or metal", "Name used in the complex"],
        rows: [
          { cells: ["\\(\\text{Cl}^-\\), \\(\\text{Br}^-\\), \\(\\text{F}^-\\), \\(\\text{I}^-\\)", "Chloro, bromo, fluoro, iodo"] },
          { cells: ["\\(\\text{CN}^-\\), \\(\\text{OH}^-\\)", "Cyano, hydroxo"] },
          { cells: ["\\(\\text{CO}_3^{2-}\\), \\(\\text{SO}_4^{2-}\\), \\(\\text{C}_2\\text{O}_4^{2-}\\)", "Carbonato, sulphato, oxalato"] },
          { cells: ["\\(\\text{NO}_2^-\\) (N bonded), \\(\\text{ONO}^-\\) (O bonded)", "Nitro, nitrito"] },
          { cells: ["\\(\\text{SCN}^-\\) (S bonded), \\(\\text{NCS}^-\\) (N bonded)", "Thiocyanato, isothiocyanato"] },
          { cells: ["\\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\), CO, en", "Ammine, aqua, carbonyl, ethylenediamine"] },
          {
            cells: ["Fe, Cu, Au, Co in an anionic complex", "Ferrate, cuprate, aurate, cobaltate"],
            pyqExampleId: "e397746b-c00c-43a5-a851-96c870bbdf36",
            noteAmber: "Board 2014 asked the IUPAC name of K₄[Fe(CN)₆]. Iron in an anion is ferrate.",
          },
          { cells: ["Al, Cr, Mn, Ni, Pt, Zn in an anionic complex", "Aluminate, chromate, manganate, nickelate, platinate, zincate"] },
        ],
      },
      selfCheckExample: {
        prompt: "Name the ligands \\(\\text{ONO}^-\\), bonded through oxygen, and \\(\\text{NCS}^-\\), bonded through nitrogen.",
        steps: ["\\(\\text{NO}_2^-\\) bonded through O is nitrito.", "\\(\\text{SCN}^-\\) bonded through N is isothiocyanato."],
        answer: "Nitrito and isothiocyanato",
      },
      practiceSet: [
        { prompt: "What is copper called in an anionic complex?", answer: "Cuprate" },
        { prompt: "How is NH₃ spelt when it is a ligand?", answer: "Ammine, with two m" },
        { prompt: "Why is \\(\\text{(en)}_2\\) named bis(ethylenediamine) and not diethylenediamine?", answer: "The name ethylenediamine already contains the prefix di, so bis is used and the ligand is put in brackets" },
      ],
      pyqExampleId: "e397746b-c00c-43a5-a851-96c870bbdf36",
      traps: [
        {
          title: "Ammine or amine",
          body: "The ligand \\(\\text{NH}_3\\) is ammine, with two m. Amine with one m is an organic compound.",
        },
        {
          title: "Using the English name of the metal in an anion",
          body: "Iron in an anionic complex is ferrate, not ironate; copper is cuprate and gold is aurate. Cobalt, nickel, platinum and zinc simply add 'ate'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscccc-formula-from-name",
      name: "Writing the formula from a name",
      intuition:
        "Read the name the way you built it, but backwards. The word at the end, if separate, is the counter ion. The ligand prefixes tell you what goes inside the bracket, and the Roman numeral gives the metal's charge. Add up the charges to get the charge on the sphere, then put enough counter ions outside to make the whole compound neutral.",
      definition:
        "- **Step 1:** pick out the metal and its oxidation state from the Roman numeral. 'Ate' on the metal means the sphere is an anion.\n" +
        "- **Step 2:** write each ligand with its number from the prefix, inside a square bracket with the metal symbol first.\n" +
        "- **Step 3:** find the charge on the sphere: O.S. of metal + sum of the ligand charges.\n" +
        "- **Step 4:** add counter ions (named first if they are cations, last if they are anions) until the compound is neutral. A complex ion named '... ion' is written with its charge and no counter ion.",
      formula: {
        label: "Charge on the sphere",
        latex: "\\text{charge on sphere} = \\text{O.S. of metal} + \\sum (\\text{charges of the ligands})",
      },
      authoredExample: {
        prompt: "Write the formula of tetraaquadichlorochromium(III) chloride.",
        steps: [
          "Given: chromium(III), so Cr is +3; tetraaqua is four \\(\\text{H}_2\\text{O}\\) (charge 0); dichloro is two \\(\\text{Cl}^-\\); 'chloride' at the end is the counter ion.",
          "Charge on the sphere: \\(+3 + 4(0) + 2(-1) = +1\\), so \\(\\text{[Cr(H}_2\\text{O)}_4\\text{Cl}_2]^{+}\\).",
          "One \\(\\text{Cl}^-\\) outside makes it neutral.",
        ],
        answer: "[Cr(H₂O)₄Cl₂]Cl",
      },
      selfCheckExample: {
        prompt: "Write the formula of the tricarbonatocobaltate(III) ion.",
        steps: ["Cobalt is +3; three \\(\\text{CO}_3^{2-}\\) give \\(-6\\).", "Charge \\(= +3 - 6 = -3\\)."],
        answer: "\\(\\text{[Co(CO}_3)_3]^{3-}\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of diamminedichloroplatinum(II).", answer: "\\(\\text{[Pt(NH}_3)_2\\text{Cl}_2]\\)" },
        { prompt: "Write the formula of the pentaaquaisothiocyanatoiron(III) ion.", answer: "\\(\\text{[Fe(H}_2\\text{O)}_5\\text{(NCS)]}^{2+}\\)" },
        { prompt: "Write the formula of the aquachlorobis(ethylenediamine)cobalt(III) ion.", answer: "\\(\\text{[CoCl(H}_2\\text{O)(en)}_2]^{2+}\\)" },
      ],
      pyqExampleId: "1e0ea1af-5b4d-43bd-a977-ac7248d393fe",
      traps: [
        {
          title: "A formula that is not neutral",
          body: "After writing the sphere, check that the counter ions cancel its charge. \\(\\text{[PtCl}_2\\text{(NH}_3)_4]\\text{Cl}\\) for a platinum(IV) complex leaves a charge of +1 and is wrong.",
        },
        {
          title: "Putting the counter ion inside the bracket",
          body: "The separate word at the start (sodium, potassium) or the end (chloride, bromide) is the counter ion and goes outside the bracket.",
        },
      ],
    },
  ],
};
