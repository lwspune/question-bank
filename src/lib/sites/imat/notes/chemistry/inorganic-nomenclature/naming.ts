import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_INO_NAMING_NOTE: SubtopicNote = {
  subtopicName: "Naming Inorganic Compounds",
  title: "IUPAC and Traditional Names of Inorganic Compounds",
  oneLineDefinition:
    "Names encode charges and oxidation numbers: Roman numerals or -ous and -ic for metals, -ite and -ate for oxoanions, prefixes for covalent compounds.",
  whyItMatters:
    "The 2025 ministry paper asked for the traditional name of an iron salt, with the -ous and -ic forms side by side as options. Translating between a name and a formula also underlies every formula question on the previous page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ino-binary-names",
      name: "Naming metal compounds and binary covalent compounds",
      intuition:
        "A name has to say everything the formula says. For a metal with only one possible charge, the name of the metal is enough. For a metal that can have two charges, the name must say which one, either with a Roman numeral or with an -ous or -ic ending. Between two non-metals there are no charges to balance, so prefixes count the atoms instead.",
      definition:
        "- **Ionic compounds**: cation name, then anion name. A simple anion ends in **-ide**: chloride, oxide, sulfide, nitride, hydride.\n" +
        "- **Stock (IUPAC) system**: a metal with more than one charge gets a Roman numeral for its charge: iron(II) chloride is \\(\\mathrm{FeCl_2}\\), iron(III) chloride \\(\\mathrm{FeCl_3}\\). Group 1, Group 2, Al, Zn and Ag need no numeral.\n" +
        "- **Traditional system**: the Latin root with **-ous** for the **lower** charge and **-ic** for the **higher**: ferrous (\\(\\mathrm{Fe^{2+}}\\)) and ferric (\\(\\mathrm{Fe^{3+}}\\)), cuprous (\\(\\mathrm{Cu^+}\\)) and cupric (\\(\\mathrm{Cu^{2+}}\\)), stannous and stannic (Sn 2+ and 4+), plumbous and plumbic (Pb 2+ and 4+), mercurous (\\(\\mathrm{Hg_2^{2+}}\\)) and mercuric (\\(\\mathrm{Hg^{2+}}\\)).\n" +
        "- **Binary covalent compounds** (two non-metals): Greek prefixes count the atoms: mono-, di-, tri-, tetra-, penta-, hexa-, hepta-. Mono- is dropped on the first element: CO is carbon monoxide, \\(\\mathrm{N_2O_5}\\) dinitrogen pentoxide, \\(\\mathrm{SF_6}\\) sulfur hexafluoride, \\(\\mathrm{PCl_3}\\) phosphorus trichloride.",
      table: {
        columns: ["Formula", "Stock (IUPAC) name", "Traditional name"],
        rows: [
          { cells: ["\\(\\mathrm{FeCl_2}\\)", "iron(II) chloride", "ferrous chloride"] },
          { cells: ["\\(\\mathrm{FeCl_3}\\)", "iron(III) chloride", "ferric chloride"] },
          { cells: ["\\(\\mathrm{Cu_2O}\\)", "copper(I) oxide", "cuprous oxide"] },
          { cells: ["CuO", "copper(II) oxide", "cupric oxide"] },
          { cells: ["\\(\\mathrm{SnCl_4}\\)", "tin(IV) chloride", "stannic chloride"] },
          { cells: ["PbO", "lead(II) oxide", "plumbous oxide"] },
          { cells: ["\\(\\mathrm{Hg_2Cl_2}\\)", "mercury(I) chloride", "mercurous chloride"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is the name of \\(\\mathrm{Fe_2(SO_4)_3}\\)?",
        options: [
          "iron(II) sulfate",
          "iron(III) sulfite",
          "ferrous sulfate",
          "iron(III) sulfate",
          "iron(II) sulfite",
        ],
        steps: [
          "Three sulfate ions carry \\(-6\\); two iron ions must carry \\(+6\\), so each is \\(\\mathrm{Fe^{3+}}\\): iron(III).",
          "\\(\\mathrm{SO_4^{2-}}\\) is sulfate (sulfite is \\(\\mathrm{SO_3^{2-}}\\)).",
          "A and C both mean \\(\\mathrm{Fe^{2+}}\\): ferrous is the -ous, lower charge. The traditional name of this compound is ferric sulfate.",
        ],
        answer: "(D) iron(III) sulfate",
      },
      practiceSet: [
        { prompt: "Traditional name of \\(\\mathrm{CuCl_2}\\)?", answer: "Cupric chloride", method: "Cu is \\(+2\\), the higher charge" },
        { prompt: "Formula of tin(II) fluoride?", answer: "\\(\\mathrm{SnF_2}\\)", method: "\\(\\mathrm{Sn^{2+}}\\) and two \\(\\mathrm{F^-}\\)" },
        { prompt: "Name \\(\\mathrm{N_2O_4}\\).", answer: "Dinitrogen tetroxide", method: "Prefixes for two non-metals" },
        { prompt: "Does magnesium chloride need a Roman numeral?", answer: "No", method: "Magnesium is always \\(+2\\)" },
      ],
      traps: [
        {
          title: "-ous and -ic on a metal give its charge, not the anion",
          body: "Ferrous means \\(\\mathrm{Fe^{2+}}\\) and ferric means \\(\\mathrm{Fe^{3+}}\\), whatever the anion. Do not confuse these endings with -ite and -ate, which belong to the anion. Ferrous sulfate is \\(\\mathrm{FeSO_4}\\); iron(II) sulfite is \\(\\mathrm{FeSO_3}\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ino-oxoanion-names",
      name: "Oxoacids and oxoanions: hypo-, -ous, -ic, per- and -ite, -ate",
      intuition:
        "Many non-metals form several oxoacids with different numbers of oxygen atoms. The names rank them by the oxidation number of the central atom: -ous for lower, -ic for higher, with hypo- below the lowest and per- above the highest. Each acid's anion follows the same pattern with -ite and -ate.",
      definition:
        "- Acid **-ic** gives anion **-ate**; acid **-ous** gives anion **-ite**; binary acid **hydro...ic** gives anion **-ide** (hydrochloric acid, chloride).\n" +
        "- With four oxoacids (chlorine, bromine, iodine): **hypo...ous** (lowest), **...ous**, **...ic**, **per...ic** (highest).\n" +
        "- With two (sulfur, nitrogen, phosphorus): just -ous and -ic.\n" +
        "- Memory aid: the -ate has more oxygen than the -ite of the same element.\n" +
        "- Salts take the anion name: \\(\\mathrm{NaClO}\\) is sodium hypochlorite, \\(\\mathrm{KNO_2}\\) potassium nitrite.",
      table: {
        columns: ["Acid", "Acid name", "Anion", "Anion name", "Oxidation number"],
        rows: [
          { cells: ["HClO", "hypochlorous acid", "\\(\\mathrm{ClO^-}\\)", "hypochlorite", "Cl +1"] },
          { cells: ["\\(\\mathrm{HClO_2}\\)", "chlorous acid", "\\(\\mathrm{ClO_2^-}\\)", "chlorite", "Cl +3"] },
          { cells: ["\\(\\mathrm{HClO_3}\\)", "chloric acid", "\\(\\mathrm{ClO_3^-}\\)", "chlorate", "Cl +5"] },
          { cells: ["\\(\\mathrm{HClO_4}\\)", "perchloric acid", "\\(\\mathrm{ClO_4^-}\\)", "perchlorate", "Cl +7"] },
          { cells: ["\\(\\mathrm{H_2SO_3}\\)", "sulfurous acid", "\\(\\mathrm{SO_3^{2-}}\\)", "sulfite", "S +4"] },
          { cells: ["\\(\\mathrm{H_2SO_4}\\)", "sulfuric acid", "\\(\\mathrm{SO_4^{2-}}\\)", "sulfate", "S +6"] },
          { cells: ["\\(\\mathrm{HNO_2}\\)", "nitrous acid", "\\(\\mathrm{NO_2^-}\\)", "nitrite", "N +3"] },
          { cells: ["\\(\\mathrm{HNO_3}\\)", "nitric acid", "\\(\\mathrm{NO_3^-}\\)", "nitrate", "N +5"] },
          { cells: ["\\(\\mathrm{H_3PO_4}\\)", "phosphoric acid", "\\(\\mathrm{PO_4^{3-}}\\)", "phosphate", "P +5"] },
          { cells: ["\\(\\mathrm{H_2CO_3}\\)", "carbonic acid", "\\(\\mathrm{CO_3^{2-}}\\)", "carbonate", "C +4"] },
          { cells: ["HCl", "hydrochloric acid", "\\(\\mathrm{Cl^-}\\)", "chloride", "Cl −1"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is the name of \\(\\mathrm{NaBrO_2}\\)?",
        options: [
          "sodium bromate",
          "sodium bromite",
          "sodium hypobromite",
          "sodium perbromate",
          "sodium bromide",
        ],
        steps: [
          "Br: \\(1 + x - 4 = 0\\), so \\(x = +3\\).",
          "Bromine follows chlorine's pattern: \\(+1\\) hypobromite, \\(+3\\) bromite, \\(+5\\) bromate, \\(+7\\) perbromate.",
          "Bromide (E) has no oxygen at all.",
        ],
        answer: "(B) sodium bromite",
      },
      practiceSet: [
        { prompt: "Name the acid HIO₄.", answer: "Periodic acid", method: "I is \\(+7\\), the highest: per...ic" },
        { prompt: "Name \\(\\mathrm{KClO_3}\\).", answer: "Potassium chlorate", method: "Cl \\(+5\\)" },
        { prompt: "What is the anion of nitrous acid?", answer: "Nitrite, \\(\\mathrm{NO_2^-}\\)", method: "-ous acid gives -ite" },
        { prompt: "Name the acid \\(\\mathrm{HBrO}\\).", answer: "Hypobromous acid", method: "Br \\(+1\\), the lowest" },
      ],
      traps: [
        {
          title: "-ite is the lower oxidation state, not the higher",
          body: "Sulfite (S \\(+4\\)) has one O fewer than sulfate (S \\(+6\\)); nitrite (N \\(+3\\)) one fewer than nitrate (N \\(+5\\)). Swapping the two endings gives a formula with the wrong number of oxygen atoms.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ino-name-formula",
      name: "From name to formula and from formula to name",
      intuition:
        "Going from a name to a formula is two lookups and one balance: identify each ion and its charge from the name, then balance the charges. Going back the other way, you work out the metal's charge from the anion first, and only then choose the ending.",
      definition:
        "**Name to formula**:\n" +
        "- Read the cation and its charge (a Roman numeral, or -ous/-ic, or the group).\n" +
        "- Read the anion and its charge (-ide, -ite, -ate, with hypo- or per-).\n" +
        "- Balance the charges, bracketing polyatomic ions when needed.\n" +
        "**Formula to name**:\n" +
        "- Identify the anion and its charge; from that, work out the metal's charge.\n" +
        "- Name the metal (with its numeral or -ous/-ic if it has more than one charge), then the anion.",
      formula: {
        label: "Charge on each metal ion",
        latex: "\\text{charge on each cation} = \\frac{\\text{number of anions} \\times |\\text{anion charge}|}{\\text{number of cations}}",
      },
      authoredExample: {
        prompt: "(a) Write the formula of calcium hypochlorite. (b) Name \\(\\mathrm{CuSO_4}\\) in both systems.",
        steps: [
          "(a) Calcium is \\(\\mathrm{Ca^{2+}}\\). Hypochlorite is \\(\\mathrm{ClO^-}\\) (Cl \\(+1\\)). Two hypochlorites balance one calcium: \\(\\mathrm{Ca(ClO)_2}\\).",
          "(b) Sulfate is \\(\\mathrm{SO_4^{2-}}\\), and there is one Cu, so Cu must be \\(+2\\).",
          "Stock name: copper(II) sulfate. Copper's charges are \\(+1\\) and \\(+2\\), so \\(+2\\) is the higher: cupric sulfate.",
        ],
        answer: "(a) \\(\\mathrm{Ca(ClO)_2}\\); (b) copper(II) sulfate, also called cupric sulfate",
      },
      selfCheckExample: {
        prompt: "What is the formula of cupric nitrite?",
        options: [
          "\\(\\mathrm{CuNO_2}\\)",
          "\\(\\mathrm{Cu(NO_3)_2}\\)",
          "\\(\\mathrm{Cu_2NO_2}\\)",
          "\\(\\mathrm{Cu(NO_2)_2}\\)",
          "\\(\\mathrm{CuNO_3}\\)",
        ],
        steps: [
          "Cupric is the higher copper charge: \\(\\mathrm{Cu^{2+}}\\).",
          "Nitrite is \\(\\mathrm{NO_2^-}\\). Two of them balance one \\(\\mathrm{Cu^{2+}}\\): \\(\\mathrm{Cu(NO_2)_2}\\).",
          "A treats cupric as \\(\\mathrm{Cu^+}\\) (that is cuprous nitrite). B is copper(II) nitrate, mixing up -ite and -ate. E makes both mistakes.",
        ],
        answer: "(D) \\(\\mathrm{Cu(NO_2)_2}\\)",
      },
      practiceSet: [
        { prompt: "Name \\(\\mathrm{Na_2SO_3}\\).", answer: "Sodium sulfite", method: "\\(\\mathrm{SO_3^{2-}}\\) is sulfite" },
        { prompt: "Formula of ferric hydroxide?", answer: "\\(\\mathrm{Fe(OH)_3}\\)", method: "Ferric is \\(\\mathrm{Fe^{3+}}\\)" },
        { prompt: "Formula of potassium perchlorate?", answer: "\\(\\mathrm{KClO_4}\\)", method: "Perchlorate is \\(\\mathrm{ClO_4^-}\\)" },
        { prompt: "Name \\(\\mathrm{SnO_2}\\) in both systems.", answer: "Tin(IV) oxide, stannic oxide", method: "Two \\(\\mathrm{O^{2-}}\\) need \\(\\mathrm{Sn^{4+}}\\)" },
      ],
      traps: [
        {
          title: "Work out the metal's charge from the anion first",
          body: "In \\(\\mathrm{Cu_2O}\\) the oxide is \\(-2\\), shared by two copper ions, so each is \\(+1\\): copper(I) oxide, cuprous oxide. The subscript 2 is not the charge. Always divide the anion charge by the number of metal atoms.",
        },
      ],
    },
  ],
};
