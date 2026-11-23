import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_TERMS_NOTE: SubtopicNote = {
  subtopicName: "Terms Used in Coordination Chemistry",
  title: "Coordination Sphere, Coordination Number, Werner's Theory and EAN",
  oneLineDefinition:
    "The coordination sphere and counter ions, the charge number and oxidation state of the metal, the coordination number, Werner's theory with double salts, and the effective atomic number rule.",
  whyItMatters:
    "21 questions. Fourteen were set in board papers, and the effective atomic number came six times: calculate the EAN of the metal in a complex (2014, 2017, 2019, 2024, 2026) and pick the ion whose EAN is 35 (2020). The board also asked Werner's postulates (2024, 2026), the oxidation state of Fe in [Fe(CN)₆]⁴⁻ (2025) and of Ni in [NiCl₄]²⁻ (2026), the definition of coordination number (2025, 2026) and of an ambidentate ligand (2026), which complex gives one mole of AgCl (2025), and the terms ligand, optical activity and interstitial compounds (2016). The textbook adds double salts, coordination numbers with bidentate ligands and the formula of a complex from its AgCl test.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscccc-charge-number",
      name: "Coordination sphere, counter ions and oxidation state",
      intuition:
        "Everything inside the square bracket travels together as one unit; everything outside floats off as separate ions when the compound dissolves. The bracket's charge is the metal's charge plus the ligands' charges, so if you know the bracket's charge you can work back to the metal's oxidation state. Silver nitrate sees only the chloride ions outside the bracket.",
      definition:
        "- **Coordination sphere:** the central metal ion and the ligands linked to it, written inside a square bracket. It is a discrete structural unit.\n" +
        "- **Complex ion:** a coordination sphere that carries a net charge.\n" +
        "- **Counter ions:** the ionisable groups written outside the bracket. \\(\\text{K}_4\\text{[Fe(CN)}_6] \\to 4\\text{K}^+ + \\text{[Fe(CN)}_6]^{4-}\\): \\(\\text{K}^+\\) are the counter ions.\n" +
        "- **Charge number** of a complex ion: its net charge, the algebraic sum of the charges on the metal ion and the ligands. The charge on the metal ion is its **oxidation state**.\n" +
        "- Ligand charges: \\(\\text{NH}_3\\), \\(\\text{H}_2\\text{O}\\), CO and en are 0; \\(\\text{Cl}^-\\), \\(\\text{Br}^-\\), \\(\\text{CN}^-\\), \\(\\text{NO}_2^-\\) are \\(-1\\); \\(\\text{C}_2\\text{O}_4^{2-}\\), \\(\\text{SO}_4^{2-}\\), \\(\\text{CO}_3^{2-}\\) are \\(-2\\).\n" +
        "- A complex dissolved in water does not give the tests of its metal ion or its ligands. \\(\\text{[Co(NH}_3)_6]\\text{Cl}_3\\) gives no test for \\(\\text{Co}^{3+}\\) or \\(\\text{NH}_3\\), but with \\(\\text{AgNO}_3\\) gives a curdy white precipitate of 3 mol AgCl: only the chlorides outside the bracket precipitate.",
      formula: {
        label: "Charge number of a complex ion",
        latex: "\\text{charge number} = \\text{O.S. of metal} + \\sum (\\text{charges of the ligands})",
      },
      authoredExample: {
        prompt: "Find the charge number of the complex ion and the oxidation state of chromium in \\(\\text{K}_3\\text{[Cr(C}_2\\text{O}_4)_3]\\).",
        steps: [
          "Given: three \\(\\text{K}^+\\) counter ions outside the bracket, so the complex ion is \\(\\text{[Cr(C}_2\\text{O}_4)_3]^{3-}\\): charge number \\(-3\\).",
          "Formula: charge number = O.S. of Cr + 3 × (charge of \\(\\text{C}_2\\text{O}_4^{2-}\\)).",
          "Substitution: \\(-3 = x + 3(-2)\\), so \\(x = -3 + 6 = +3\\).",
        ],
        answer: "Charge number −3; oxidation state of Cr = +3",
      },
      selfCheckExample: {
        prompt: "Find the oxidation state of chromium in \\(\\text{[Cr(H}_2\\text{O)}_4\\text{Cl}_2]\\text{Cl}\\), and the moles of AgCl one mole of it gives with excess \\(\\text{AgNO}_3\\).",
        steps: [
          "One \\(\\text{Cl}^-\\) outside, so the sphere is \\(+1\\): \\(x + 4(0) + 2(-1) = +1\\), \\(x = +3\\).",
          "Only the one chloride outside the bracket is ionisable, so 1 mol AgCl.",
        ],
        answer: "Cr is +3; 1 mol AgCl",
      },
      practiceSet: [
        { prompt: "Write the ionisation of \\(\\text{[Ni(NH}_3)_6]\\text{Cl}_2\\) in water and name its counter ions.", answer: "\\(\\text{[Ni(NH}_3)_6]\\text{Cl}_2 \\to \\text{[Ni(NH}_3)_6]^{2+} + 2\\text{Cl}^-\\); the \\(\\text{Cl}^-\\) ions are the counter ions" },
        { prompt: "A complex ion of Co(III) has four NH₃ molecules and two Cl⁻ ions as ligands. Give its charge number and formula.", answer: "Charge number +1; \\(\\text{[Co(NH}_3)_4\\text{Cl}_2]^{+}\\)" },
        { prompt: "Find the oxidation state of platinum in \\(\\text{[PtCl}_6]^{2-}\\).", answer: "\\(x + 6(-1) = -2\\), so +4" },
        { prompt: "One mole of a complex of CoCl₃ and NH₃ (coordination number 6) gives 3 mol AgCl with excess AgNO₃. Write its formula.", answer: "\\(\\text{[Co(NH}_3)_6]\\text{Cl}_3\\)" },
      ],
      pyqExampleId: "3f99791c-7935-448b-a711-ffcec35a1047",
      traps: [
        {
          title: "Taking the bracket's charge as the metal's charge",
          body: "The charge on the complex ion includes the ligands. In \\(\\text{[Cr(C}_2\\text{O}_4)_3]^{3-}\\) the ion is \\(-3\\) but chromium is \\(+3\\). Always write the sum and solve for \\(x\\).",
        },
        {
          title: "Counting every chloride in the AgCl test",
          body: "Chloride bound to the metal inside the bracket does not ionise and gives no AgCl. Count only the chlorides written outside the bracket.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscccc-coordination-number",
      name: "Coordination number",
      intuition:
        "The coordination number counts the bonds the metal makes with its ligands, which is the number of donor atoms touching it. With only monodentate ligands that is simply the number of ligands. A bidentate ligand like en or oxalate takes up two places, so three of them fill all six places round the metal.",
      definition:
        "- **Coordination number (C.N.)** of the metal ion: the number of ligand donor atoms directly attached to it, or the number of electron pairs in its coordinate bonds.\n" +
        "- With monodentate ligands only, C.N. = number of ligands: in \\(\\text{[Co(NH}_3)_4\\text{Cl}_2]^+\\) it is 6.\n" +
        "- A bidentate ligand counts 2: \\(\\text{[Fe(C}_2\\text{O}_4)_3]^{3-}\\) and \\(\\text{[Co(en)}_3]^{3+}\\) each have three ligands but C.N. 6.\n" +
        "- C.N. and shape: 6 gives an **octahedral** complex; 4 gives a **square planar** or a **tetrahedral** complex.\n" +
        "- In the solid state, coordination number means the number of nearest neighbours of a particle in the crystal. In complexes it counts ligand donor atoms.",
      formula: {
        label: "Coordination number",
        latex: "\\text{C.N.} = \\sum (\\text{number of ligands of a kind} \\times \\text{donor atoms each ligand uses})",
      },
      authoredExample: {
        prompt: "Find the coordination number and the oxidation state of iridium in \\(\\text{[Ir(C}_2\\text{O}_4)_2\\text{Cl}_2]^{3-}\\).",
        steps: [
          "Given: two oxalate ions (bidentate, charge \\(-2\\)) and two chloride ions (monodentate, charge \\(-1\\)); charge number \\(-3\\).",
          "C.N. \\(= 2 \\times 2 + 2 \\times 1 = 6\\).",
          "Oxidation state: \\(x + 2(-2) + 2(-1) = -3\\), so \\(x = -3 + 6 = +3\\).",
        ],
        answer: "C.N. = 6; oxidation state of Ir = +3",
      },
      selfCheckExample: {
        prompt: "Find the coordination number of cobalt in \\(\\text{[CoCl}_2\\text{(en)}_2]^{+}\\).",
        steps: ["Two \\(\\text{Cl}^-\\) give 2 donor atoms; two en give \\(2 \\times 2 = 4\\).", "C.N. \\(= 2 + 4 = 6\\)."],
        answer: "6",
      },
      practiceSet: [
        { prompt: "Find the coordination number of Pt in \\(\\text{[Pt(NO}_2)_2\\text{(NH}_3)_2]\\).", answer: "4" },
        { prompt: "What is the shape of a complex whose central metal ion has coordination number 6?", answer: "Octahedral" },
        { prompt: "Find the coordination number of Fe in \\(\\text{[Fe(C}_2\\text{O}_4)_3]^{3-}\\).", answer: "\\(3 \\times 2 = 6\\)" },
      ],
      pyqExampleId: "65e65b94-9d91-4019-84c8-9137cf53ba5d",
      traps: [
        {
          title: "Counting ligands instead of donor atoms",
          body: "Three en ligands give C.N. 6, not 3. Write the definition with the word donor atoms in it, or it loses the mark.",
        },
        {
          title: "Saying coordination number 4 means tetrahedral",
          body: "C.N. 4 can be square planar or tetrahedral. The shape depends on the metal ion and the ligands, so give both possibilities when no other data is given.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-werner",
      name: "Werner's theory and double salts",
      intuition:
        "Werner saw that the same metal salt holds some groups loosely and others tightly. The loose ones float away as ions in water; the tight ones stay bound and never show up in a test. He called these two kinds of hold the primary and secondary valencies. A double salt has only the loose kind, which is why it falls apart completely in water.",
      definition:
        "- Werner's theory was the first attempt to explain the bonding in coordination compounds. Its four postulates are in the table.\n" +
        "- In \\(\\text{[Co(NH}_3)_6]\\text{Cl}_3\\), the six \\(\\text{NH}_3\\) lie in the coordination (secondary) sphere and the three \\(\\text{Cl}^-\\) in the ionisation (primary) sphere.\n" +
        "- **Double salt:** two stable compounds combined in a fixed ratio that **dissociates completely into simple ions** in water. Mohr's salt: \\(\\text{FeSO}_4\\text{(NH}_4)_2\\text{SO}_4 \\cdot 6\\text{H}_2\\text{O} \\to \\text{Fe}^{2+} + 2\\text{NH}_4^+ + 2\\text{SO}_4^{2-}\\). Carnallite, \\(\\text{KCl} \\cdot \\text{MgCl}_2 \\cdot 6\\text{H}_2\\text{O}\\), is another.\n" +
        "- **Coordination complex:** it dissociates in water to give **at least one complex ion**: \\(\\text{K}_4\\text{[Fe(CN)}_6] \\to 4\\text{K}^+ + \\text{[Fe(CN)}_6]^{4-}\\).",
      table: {
        columns: ["Postulate", "What it says"],
        rows: [
          { cells: ["(i) Two valencies", "The metal in a complex has two types of valency: primary (ionisable) and secondary (non ionisable)"] },
          {
            cells: ["(ii) Primary valency", "Satisfied by the entities of the ionisation sphere, generally anions"],
            pyqExampleId: "3230d53f-acfa-4a4c-8cae-f7ec28430e7d",
            noteAmber: "Board 2024 asked the postulates with the name of a hexadentate ligand (EDTA).",
          },
          { cells: ["(iii) Secondary valency", "Satisfied by the entities of the coordination sphere, anions or neutral ligands; non ionisable; fixed for a metal ion and equal to its coordination number"] },
          { cells: ["(iv) Shape", "The secondary valencies have a fixed spatial arrangement round the metal ion, which gives the complex its shape"] },
        ],
      },
      selfCheckExample: {
        prompt: "In \\(\\text{[Co(NH}_3)_6]\\text{Cl}_3\\), which groups satisfy the primary valency and which satisfy the secondary valency of cobalt?",
        steps: ["Primary (ionisable): the three \\(\\text{Cl}^-\\) outside the bracket.", "Secondary (non ionisable): the six \\(\\text{NH}_3\\) inside the bracket."],
        answer: "Primary: 3 Cl⁻; secondary: 6 NH₃",
      },
      practiceSet: [
        { prompt: "The number of secondary valencies of a metal ion equals which quantity?", answer: "Its coordination number" },
        { prompt: "Which ions does Mohr's salt give in water?", answer: "\\(\\text{Fe}^{2+}\\), \\(\\text{NH}_4^+\\) and \\(\\text{SO}_4^{2-}\\)" },
        { prompt: "Why does a solution of K₄[Fe(CN)₆] give no test for Fe²⁺ ions?", answer: "The iron stays bound inside the complex ion \\(\\text{[Fe(CN)}_6]^{4-}\\), which does not break up in water" },
      ],
      pyqExampleId: "42ab91df-12c6-4e55-aca8-c4ec6221b035",
      traps: [
        {
          title: "Swapping primary and secondary",
          body: "Primary valency is the ionisable one, satisfied by anions in the ionisation sphere. Secondary valency is non ionisable, equals the coordination number and fixes the shape.",
        },
        {
          title: "A difference with one side only",
          body: "In 'double salt versus complex', state what each does in water and give an example of each with its dissociation equation. One side alone earns half the marks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscccc-ean",
      name: "Effective atomic number (EAN) rule",
      intuition:
        "Count the electrons round the metal after it has formed the complex: its own electrons, less the ones it lost to become an ion, plus two for every electron pair the ligands give it. Sidgwick noticed that in many stable complexes this total lands on the electron count of a noble gas.",
      definition:
        "- **EAN** is the total number of electrons round the central metal ion in the complex (Sidgwick).\n" +
        "- **EAN rule:** a metal ion goes on accepting electron pairs until it reaches the electronic configuration of the next noble gas. The rule is obeyed if EAN = 18 (Ar), 36 (Kr), 54 (Xe) or 86 (Rn).\n" +
        "- \\(\\text{EAN} = Z - X + Y\\): Z is the atomic number of the metal, X the electrons lost to form the ion (its oxidation state), Y the electrons donated by the ligands (2 per donor atom, so \\(2 \\times\\) C.N.).\n" +
        "- Obey the rule (EAN 36): \\(\\text{[Co(NH}_3)_6]^{3+}\\), \\(\\text{Cr(CO)}_6\\), \\(\\text{[Fe(CN)}_6]^{4-}\\).\n" +
        "- Do not obey it (EAN 35): \\(\\text{[Fe(CN)}_6]^{3-}\\) and \\(\\text{[Cu(NH}_3)_4]^{2+}\\).",
      formula: {
        label: "Effective atomic number",
        latex: "\\text{EAN} = Z - X + Y, \\qquad Y = 2 \\times \\text{C.N.}",
        symbols: [
          { symbol: "\\(Z\\)", meaning: "atomic number of the metal" },
          { symbol: "\\(X\\)", meaning: "electrons lost by the metal to form the ion (its oxidation state)" },
          { symbol: "\\(Y\\)", meaning: "electrons donated by the ligands" },
        ],
      },
      authoredExample: {
        prompt: "Calculate the EAN of nickel in \\(\\text{[Ni(CO)}_4]\\) (Z of Ni = 28). Does it obey the EAN rule?",
        steps: [
          "Given: Z = 28. CO is neutral and the complex is neutral, so Ni is in the 0 oxidation state: X = 0.",
          "Four CO ligands each donate one pair: C.N. = 4, so Y = \\(2 \\times 4 = 8\\).",
          "Formula: \\(\\text{EAN} = Z - X + Y\\).",
          "Substitution: \\(\\text{EAN} = 28 - 0 + 8 = 36\\).",
          "36 is the atomic number of krypton, so the rule is obeyed.",
        ],
        answer: "EAN = 36; the EAN rule is obeyed",
      },
      selfCheckExample: {
        prompt: "Calculate the EAN of platinum in \\(\\text{[PtCl}_6]^{2-}\\) (Z of Pt = 78).",
        steps: ["O.S. of Pt: \\(x + 6(-1) = -2\\), so X = 4. C.N. = 6, so Y = 12.", "\\(\\text{EAN} = 78 - 4 + 12 = 86\\), the electron count of radon."],
        answer: "EAN = 86; the rule is obeyed",
      },
      practiceSet: [
        { prompt: "Calculate the EAN of iron in Fe(CO)₅ (Z of Fe = 26).", answer: "\\(26 - 0 + 10 = 36\\)" },
        { prompt: "Calculate the EAN of nickel in \\(\\text{[Ni(CN)}_4]^{2-}\\) (Z = 28). Is the rule obeyed?", answer: "\\(28 - 2 + 8 = 34\\); not obeyed" },
        { prompt: "Calculate the EAN of silver in \\(\\text{[Ag(NH}_3)_2]^{+}\\) (Z of Ag = 47).", answer: "\\(47 - 1 + 4 = 50\\); not a noble gas number, so not obeyed" },
      ],
      pyqExampleId: "99dcb406-e6d6-41b0-ace4-711019a694cc",
      traps: [
        {
          title: "Adding one electron per ligand",
          body: "Each donor atom gives a pair, so Y is twice the coordination number. With bidentate en, three ligands give six pairs, Y = 12.",
        },
        {
          title: "Forgetting to subtract the oxidation state",
          body: "The metal ion has already lost electrons equal to its oxidation state. Work out the oxidation state from the charge on the complex first, then subtract it from Z.",
        },
      ],
    },
  ],
};
