import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_PREPARATION_NOTE: SubtopicNote = {
  subtopicName: "Methods of Preparation of Haloalkanes",
  title: "Preparation of Haloalkanes",
  oneLineDefinition:
    "Haloalkanes from alcohols (halogen acids, phosphorus halides, thionyl chloride), from alkanes by free radical halogenation, from alkenes by adding HX or X₂, and by halogen exchange (Finkelstein and Swarts reactions).",
  whyItMatters:
    "18 questions, eleven of them from board papers from 2023 to 2026. The board asks which reaction best makes an alkyl fluoride (2023, 2025) or an alkyl iodide (2023, 2026), the major product of bromination in UV light (2024), side-chain bromination with heat (2025), Markovnikov and peroxide addition of HBr and HI (2024, 2025), and what thionyl chloride or HCl does to 4-(hydroxymethyl)phenol (2024, 2025). The textbook adds monochlorination isomers and why sulphuric acid is not used with KI.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcha-from-alcohols",
      name: "From alcohols: halogen acids, phosphorus halides and thionyl chloride",
      intuition:
        "Alcohols are easy to get, so they are the best starting point. Each reagent swaps the -OH for a halogen. Thionyl chloride is the favourite because its two by-products are gases that bubble away, leaving the alkyl chloride pure. A phenol's -OH does not react this way: its C-O bond is too strong.",
      definition:
        "- The -OH of an alcohol is replaced by a halogen with **concentrated halogen acids, phosphorus halides or thionyl chloride**.\n" +
        "- Primary and secondary alcohols need **ZnCl₂** as catalyst with HCl; a tertiary alcohol reacts on simply shaking with concentrated HCl at room temperature.\n" +
        "- Order of reactivity of alcohols with a given halogen acid: **3° > 2° > 1°**.\n" +
        "- Constant boiling HBr (48%) gives alkyl bromides. PBr₃ and PI₃ are made in the flask from red phosphorus with bromine or iodine.\n" +
        "- Alkyl iodides: heat the alcohol with NaI or KI in 95% orthophosphoric acid.\n" +
        "- **Thionyl chloride is preferred:** the by-products SO₂ and HCl are gases and escape, so the alkyl halide is pure.\n" +
        "- These methods do **not** give aryl halides: the C-O bond of a phenol has partial double bond character and is hard to break.",
      table: {
        columns: ["Reagent", "Reaction", "Point to remember"],
        rows: [
          { cells: ["Conc. HCl with ZnCl₂", "\\(\\text{R-OH} + \\text{HCl} \\xrightarrow{\\text{ZnCl}_2} \\text{R-Cl} + \\text{H}_2\\text{O}\\)", "Needed for 1° and 2° alcohols; a 3° alcohol needs no catalyst"] },
          { cells: ["PCl₅", "\\(\\text{R-OH} + \\text{PCl}_5 \\rightarrow \\text{R-Cl} + \\text{POCl}_3 + \\text{HCl}\\)", "POCl₃ and HCl are the by-products"] },
          { cells: ["PBr₃ (red P and Br₂)", "\\(3\\text{R-OH} + \\text{PBr}_3 \\rightarrow 3\\text{R-Br} + \\text{H}_3\\text{PO}_3\\)", "PBr₃ is made in the flask"] },
          {
            cells: ["SOCl₂", "\\(\\text{R-OH} + \\text{SOCl}_2 \\rightarrow \\text{R-Cl} + \\text{SO}_2\\uparrow + \\text{HCl}\\uparrow\\)", "Preferred: both by-products are gases, so the product is pure"],
            pyqExampleId: "160bd9ca-db2c-40bf-a928-a7a445908a4e",
            noteAmber: "Board 2025 asked again for the product of 4-(hydroxymethyl)phenol with SOCl₂: only the alcoholic -OH is replaced.",
          },
          { cells: ["NaI or KI with H₃PO₄", "\\(\\text{R-OH} + \\text{KI} + \\text{H}_3\\text{PO}_4 \\rightarrow \\text{R-I} + \\text{KH}_2\\text{PO}_4 + \\text{H}_2\\text{O}\\)", "H₂SO₄ cannot be used: it oxidises the HI to I₂"] },
        ],
      },
      selfCheckExample: {
        prompt: "Write the equation for making 2-bromopropane from propan-2-ol with phosphorus tribromide.",
        steps: [
          "PBr₃ replaces the -OH of three alcohol molecules by -Br.",
          "\\(3(\\text{CH}_3)_2\\text{CHOH} + \\text{PBr}_3 \\rightarrow 3(\\text{CH}_3)_2\\text{CHBr} + \\text{H}_3\\text{PO}_3\\)",
        ],
        answer: "3(CH₃)₂CHOH + PBr₃ → 3(CH₃)₂CHBr + H₃PO₃",
      },
      practiceSet: [
        { prompt: "Why is thionyl chloride preferred for making alkyl chlorides from alcohols?", answer: "Its by-products SO₂ and HCl are gases that escape, leaving a pure alkyl chloride" },
        { prompt: "Which alcohol reacts with concentrated HCl at room temperature without ZnCl₂: 1°, 2° or 3°?", answer: "A tertiary alcohol" },
        { prompt: "Why can chlorobenzene not be made by heating phenol with HCl?", answer: "The C-O bond of phenol has partial double bond character and is too strong to break" },
      ],
      pyqExampleId: "d0e8b878-79cb-4d14-ba07-ce57c807c612",
      traps: [
        {
          title: "Using sulphuric acid with KI",
          body: "H₂SO₄ oxidises the HI formed from KI to iodine, so little alkyl iodide forms. Use 95% orthophosphoric acid, which is not an oxidising acid.",
        },
        {
          title: "Replacing the phenolic -OH too",
          body: "When a molecule carries both an alcoholic -OH and a phenolic -OH, SOCl₂, PCl₅ or HCl replaces only the alcoholic one. The ring -OH stays because its C-O bond has partial double bond character.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcha-free-radical",
      name: "From hydrocarbons: free radical halogenation",
      intuition:
        "Light or heat splits a halogen molecule into atoms, and a halogen atom pulls off a hydrogen from the hydrocarbon. Every different kind of hydrogen can be replaced, so an alkane gives a mixture. With an alkene or an alkylbenzene, the hydrogen next to the double bond or the ring is the one taken, because the radical left behind is the most stable.",
      definition:
        "- Free radical chlorination or bromination of an alkane gives a **complex mixture** of isomeric mono- and polyhaloalkanes that is hard to separate, so the yield of any one compound is low.\n" +
        "- The number of monohalo isomers equals the number of **different kinds of hydrogen** in the molecule.\n" +
        "- With bromine, the major product comes from the hydrogen whose removal leaves the most stable radical: a tertiary hydrogen in an alkane, an **allylic** hydrogen in an alkene, a **benzylic** hydrogen in an alkylbenzene.\n" +
        "- Br₂ with heat or UV light on cyclohexene gives **3-bromocyclohexene** (substitution next to the double bond, not addition).\n" +
        "- Br₂ or Cl₂ with heat or UV light on an alkylbenzene substitutes the **side chain** at the benzylic carbon; the ring is not touched.",
      formula: {
        label: "Free radical halogenation",
        latex: "\\text{R-H} + \\text{X}_2 \\xrightarrow{\\text{UV light or heat}} \\text{R-X} + \\text{HX}",
        symbols: [
          { symbol: "\\(\\text{X}_2\\)", meaning: "chlorine or bromine" },
        ],
      },
      authoredExample: {
        prompt: "How many monochloro products does 2-methylpropane, (CH₃)₃CH, give on free radical chlorination? Name them.",
        steps: [
          "Count the kinds of hydrogen: the nine on the three equivalent CH₃ groups, and the one on the central carbon. Two kinds.",
          "Replacing a CH₃ hydrogen: \\((\\text{CH}_3)_2\\text{CHCH}_2\\text{Cl}\\), 1-chloro-2-methylpropane.",
          "Replacing the central hydrogen: \\((\\text{CH}_3)_3\\text{CCl}\\), 2-chloro-2-methylpropane.",
        ],
        answer: "Two: 1-chloro-2-methylpropane and 2-chloro-2-methylpropane",
      },
      selfCheckExample: {
        prompt: "Toluene is treated with chlorine in sunlight. Write the main monochloro product.",
        steps: [
          "Sunlight means free radical conditions, so the side chain is attacked, not the ring.",
          "The hydrogen taken is on the CH₃ carbon attached to the ring (the benzylic carbon).",
          "\\(\\text{C}_6\\text{H}_5\\text{CH}_3 + \\text{Cl}_2 \\xrightarrow{h\\nu} \\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl} + \\text{HCl}\\)",
        ],
        answer: "Benzyl chloride, C₆H₅CH₂Cl",
      },
      practiceSet: [
        { prompt: "Why does free radical chlorination of an alkane give a low yield of any single haloalkane?", answer: "It gives a complex mixture of isomeric mono- and polyhaloalkanes that is hard to separate" },
        { prompt: "Name the major product of cyclohexene with Br₂ under UV light.", answer: "3-Bromocyclohexene: substitution at the allylic carbon" },
        { prompt: "Ethylbenzene is treated with Cl₂ in UV light. On which carbon does chlorine go?", answer: "On the CH₂ carbon attached to the ring (benzylic): C₆H₅CH(Cl)CH₃" },
      ],
      pyqExampleId: "7b109b7a-7ffb-4036-af23-2ff7c501febd",
      traps: [
        {
          title: "Adding bromine across the double bond",
          body: "Br₂ in CCl₄ adds across a C=C. Br₂ with heat or UV light is a free radical reaction and substitutes the allylic hydrogen instead. Read the condition over the arrow first.",
        },
        {
          title: "Putting the halogen on the ring",
          body: "Heat or UV light sends the halogen to the side chain of an alkylbenzene. The ring is substituted only with a Lewis acid catalyst (Fe or FeCl₃) in the dark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcha-from-alkenes",
      name: "From alkenes: adding HX and X₂",
      intuition:
        "A hydrogen halide adds across a double bond. When the alkene is unsymmetrical there are two possible products, and Markovnikov's rule picks the main one: the halogen ends up on the carbon that has fewer hydrogens. With HBr and a peroxide the addition goes the other way.",
      definition:
        "- **Addition of HX:** an alkene gives an alkyl halide with HCl, HBr or HI.\n" +
        "- **Markovnikov's rule:** the hydrogen adds to the doubly bonded carbon that already has more hydrogens, so the halogen goes to the more substituted carbon (the one giving the more stable carbocation).\n" +
        "- **Peroxide effect:** HBr in the presence of a peroxide adds the other way (anti-Markovnikov), putting Br on the end carbon. This works for HBr only.\n" +
        "- **Addition of halogens:** Br₂ in CCl₄ adds to give a colourless vic-dibromide; the reddish brown colour of bromine is discharged, which is a test for a double bond.",
      formula: {
        label: "Markovnikov and anti-Markovnikov addition of HBr",
        latex: "\\text{CH}_3\\text{CH=CH}_2 \\xrightarrow{\\text{HBr}} \\text{CH}_3\\text{CH(Br)CH}_3 \\qquad \\text{CH}_3\\text{CH=CH}_2 \\xrightarrow{\\text{HBr, peroxide}} \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Br}",
      },
      authoredExample: {
        prompt: "Write the product of 2-methylpropene, (CH₃)₂C=CH₂, with HBr (a) in the dark without peroxide, (b) in the presence of a peroxide.",
        steps: [
          "(a) Markovnikov: H goes to the CH₂ carbon (more hydrogens), Br to the carbon carrying the two methyl groups.",
          "\\((\\text{CH}_3)_2\\text{C=CH}_2 + \\text{HBr} \\rightarrow (\\text{CH}_3)_3\\text{CBr}\\), 2-bromo-2-methylpropane.",
          "(b) With peroxide the addition is anti-Markovnikov, so Br goes to the end CH₂ carbon.",
          "\\((\\text{CH}_3)_2\\text{C=CH}_2 + \\text{HBr} \\xrightarrow{\\text{peroxide}} (\\text{CH}_3)_2\\text{CHCH}_2\\text{Br}\\), 1-bromo-2-methylpropane.",
        ],
        answer: "(a) 2-Bromo-2-methylpropane; (b) 1-bromo-2-methylpropane",
      },
      selfCheckExample: {
        prompt: "Write the main product of pent-1-ene with HCl.",
        steps: [
          "Pent-1-ene is \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH=CH}_2\\).",
          "By Markovnikov's rule H goes to the end CH₂ carbon and Cl to C-2.",
        ],
        answer: "2-Chloropentane, CH₃CH₂CH₂CH(Cl)CH₃",
      },
      practiceSet: [
        { prompt: "Which hydrogen halide shows the peroxide effect?", answer: "HBr only" },
        { prompt: "Ethene is passed into bromine in CCl₄. Name the product and the colour change.", answer: "1,2-Dibromoethane; the reddish brown colour of bromine disappears" },
        { prompt: "Convert propene into 1-iodopropane.", answer: "HBr with peroxide gives 1-bromopropane; then NaI in dry acetone (Finkelstein) gives 1-iodopropane" },
      ],
      pyqExampleId: "3be06416-8659-4692-b572-c2742006ee3b",
      traps: [
        {
          title: "Peroxide with HCl or HI",
          body: "Only HBr adds anti-Markovnikov in the presence of a peroxide. HCl and HI follow Markovnikov's rule whether or not a peroxide is present.",
        },
        {
          title: "Halogen on the carbon with more hydrogens",
          body: "Markovnikov's rule sends the HYDROGEN to the carbon that has more hydrogens. The halogen goes to the other, more substituted carbon.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcha-exchange",
      name: "Halogen exchange: Finkelstein and Swarts reactions",
      intuition:
        "Iodides and fluorides are awkward to make directly, so we swap a halogen that is already there. In the Finkelstein reaction sodium iodide in dry acetone replaces Cl or Br by I; the NaCl or NaBr formed does not dissolve in dry acetone and settles out, which keeps the reaction going forward. In the Swarts reaction a metallic fluoride puts in fluorine.",
      definition:
        "- **Finkelstein reaction:** an alkyl chloride or bromide with **NaI in dry acetone** gives the alkyl iodide.\n" +
        "- NaCl or NaBr formed is **precipitated in dry acetone**, which pushes the reaction forward (Le Chatelier's principle).\n" +
        "- **Swarts reaction:** heating an alkyl chloride or bromide with a metallic fluoride such as **AgF, Hg₂F₂, CoF₂ or SbF₃** gives the alkyl fluoride. It is the best way to make alkyl fluorides.\n" +
        "- Freon 12 (CCl₂F₂) is made from tetrachloromethane by the Swarts reaction.",
      formula: {
        label: "Finkelstein and Swarts reactions",
        latex: "\\text{R-X} + \\text{NaI} \\xrightarrow{\\text{dry acetone}} \\text{R-I} + \\text{NaX}\\downarrow \\qquad \\text{R-X} + \\text{AgF} \\rightarrow \\text{R-F} + \\text{AgX}",
        symbols: [
          { symbol: "\\(\\text{X}\\)", meaning: "Cl or Br" },
        ],
      },
      authoredExample: {
        prompt: "Write the equation for preparing fluoroethane from bromoethane, and name the reaction.",
        steps: [
          "A fluoride is made by halogen exchange with a metallic fluoride: the Swarts reaction.",
          "\\(\\text{CH}_3\\text{CH}_2\\text{Br} + \\text{AgF} \\xrightarrow{\\Delta} \\text{CH}_3\\text{CH}_2\\text{F} + \\text{AgBr}\\)",
        ],
        answer: "Swarts reaction: CH₃CH₂Br + AgF → CH₃CH₂F + AgBr",
      },
      selfCheckExample: {
        prompt: "Why must the acetone be dry in the Finkelstein reaction?",
        steps: [
          "NaI dissolves in dry acetone, but the NaCl or NaBr formed does not, so it precipitates.",
          "Removing the product salt pulls the equilibrium forward (Le Chatelier's principle).",
          "Water would dissolve the NaCl or NaBr, and that push would be lost.",
        ],
        answer: "Only in dry acetone does NaCl or NaBr precipitate and drive the reaction forward",
      },
      practiceSet: [
        { prompt: "Name four metallic fluorides used in the Swarts reaction.", answer: "AgF, Hg₂F₂, CoF₂ and SbF₃" },
        { prompt: "Which two kinds of haloalkane are best prepared by halogen exchange?", answer: "Alkyl iodides (Finkelstein) and alkyl fluorides (Swarts)" },
        { prompt: "From which compound is freon 12 made by the Swarts reaction?", answer: "Tetrachloromethane, CCl₄" },
      ],
      pyqExampleId: "95d223c5-d824-479e-952e-8abee7878471",
      traps: [
        {
          title: "Swapping the two names",
          body: "Finkelstein makes IODIDES (NaI, dry acetone). Swarts makes FLUORIDES (AgF, Hg₂F₂, CoF₂, SbF₃). Sandmeyer is a different reaction altogether: it makes aryl halides from diazonium salts.",
        },
        {
          title: "Forgetting why the reaction goes",
          body: "In a \"give reason\" answer on the Finkelstein reaction, say that NaCl or NaBr precipitates in dry acetone and so the forward reaction is favoured. Writing only the equation loses the reason mark.",
        },
      ],
    },
  ],
};
