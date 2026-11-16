import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_HA_PREP_NOTE: SubtopicNote = {
  subtopicName: "Preparation and Properties",
  title: "Preparation and Properties",
  oneLineDefinition:
    "How organic halides are classified by the carbon that holds the halogen, what the C-X bond is like, how boiling point and density change, and how haloalkanes are made from alcohols, from hydrocarbons and by halogen exchange.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025. One asks the order of C-X bond enthalpy from CH₃-F to CH₃-I (2021), one asks the class of a halide whose halogen sits next to a C=C (2023), one asks the by-products of an alcohol with PCl₃ and with PCl₅ (2024), and one, marked HARD, counts the monochlorination products of 2-methylbutane, stereoisomers included (2025).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchha-classify",
      name: "Classifying organic halides",
      intuition:
        "To name the class of a halide, look only at the carbon that carries the halogen. Ask two things: is that carbon sp³ or sp², and what is it joined to? An sp³ carbon gives an alkyl, allylic or benzylic halide. An sp² carbon gives a vinylic or aryl halide. The rest of the molecule does not change the answer.",
      definition:
        "- By the number of halogen atoms, halides are **mono**, **di** or **poly** haloalkanes or haloarenes.\n" +
        "- **Alkyl halides** are primary (1°), secondary (2°) or tertiary (3°) by the number of carbon atoms joined to the carbon that holds X.\n" +
        "- **Allylic halide:** X is on an \\(sp^3\\) carbon next to a C=C double bond.\n" +
        "- **Benzylic halide:** X is on an \\(sp^3\\) carbon joined directly to a benzene ring.\n" +
        "- **Vinylic halide:** X is on an \\(sp^2\\) carbon of a C=C double bond.\n" +
        "- **Aryl halide:** X is on an \\(sp^2\\) carbon of a benzene ring.",
      table: {
        columns: ["Class", "Carbon that holds X", "Example"],
        rows: [
          { cells: ["Primary alkyl", "\\(sp^3\\) carbon joined to one other carbon", "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{Cl}\\)"] },
          { cells: ["Secondary alkyl", "\\(sp^3\\) carbon joined to two other carbons", "\\(\\text{CH}_3\\text{CHClCH}_3\\)"] },
          { cells: ["Tertiary alkyl", "\\(sp^3\\) carbon joined to three other carbons", "\\((\\text{CH}_3)_3\\text{CCl}\\)"] },
          { cells: ["Allylic", "\\(sp^3\\) carbon next to a C=C", "\\(\\text{CH}_2\\text{=CH-CH}_2\\text{Cl}\\)"], pyqExampleId: "a77e5f16-9385-40fe-8dd2-60b7624d4bd1", noteAmber: "NEET 2023: in C₆H₅-CH=CH-CH(X)-CH₂CH₃ the halogen is on an sp³ carbon next to the C=C, so the compound is an allylic halide." },
          { cells: ["Benzylic", "\\(sp^3\\) carbon joined to a benzene ring", "\\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}\\)"] },
          { cells: ["Vinylic", "\\(sp^2\\) carbon of a C=C", "\\(\\text{CH}_2\\text{=CHCl}\\)"] },
          { cells: ["Aryl", "\\(sp^2\\) carbon of a benzene ring", "\\(\\text{C}_6\\text{H}_5\\text{Cl}\\)"] },
        ],
        caption: "Allylic and benzylic halides are sp³ at the carbon that holds X; vinylic and aryl halides are sp².",
      },
      pyqExampleId: "a77e5f16-9385-40fe-8dd2-60b7624d4bd1",
      selfCheckExample: {
        prompt: "Classify C₆H₅CH(Cl)CH₃ and CH₃CH=CHCl by the carbon that holds the chlorine.",
        steps: [
          "In \\(\\text{C}_6\\text{H}_5\\text{CH(Cl)CH}_3\\) the chlorine is on an \\(sp^3\\) carbon joined directly to the benzene ring, so it is benzylic.",
          "In \\(\\text{CH}_3\\text{CH=CHCl}\\) the chlorine is on a carbon of the C=C itself, an \\(sp^2\\) carbon, so it is vinylic.",
        ],
        answer: "C₆H₅CH(Cl)CH₃ is a benzylic halide; CH₃CH=CHCl is a vinylic halide",
      },
      practiceSet: [
        { prompt: "Is the chlorine in 2-chloro-2-methylpropane, (CH₃)₃CCl, on a primary, secondary or tertiary carbon?", answer: "Tertiary: the carbon is joined to three other carbons" },
        { prompt: "Classify chlorobenzene, C₆H₅Cl, and benzyl chloride, C₆H₅CH₂Cl.", answer: "Chlorobenzene is an aryl halide; benzyl chloride is a benzylic halide" },
        { prompt: "What is the hybridisation of the carbon that holds the halogen in a vinylic halide?", answer: "\\(sp^2\\)" },
        { prompt: "Which one is a vinylic halide: CH₂=CHCl, CH₂=CH-CH₂Cl or C₆H₅CH₂Cl?", answer: "\\(\\text{CH}_2\\text{=CHCl}\\)" },
      ],
      traps: [
        {
          title: "A ring in the molecule does not make a halide benzylic",
          body: "A halide is benzylic only when the carbon that holds X is joined directly to the benzene ring. If that carbon sits next to a C=C instead, the halide is allylic, even when a ring is present further along the chain.",
        },
        {
          title: "Allylic and vinylic are not the same",
          body: "In a vinylic halide X is on a carbon of the double bond, an \\(sp^2\\) carbon. In an allylic halide X is on the \\(sp^3\\) carbon one step away from the double bond.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchha-bond",
      name: "The C-X bond and physical properties",
      intuition:
        "A halogen is more electronegative than carbon, so it pulls the bonding electrons towards itself and the C-X bond is polar. Going from fluorine to iodine the halogen atom gets bigger, so the bond gets longer and weaker. Bigger, heavier molecules also attract each other more strongly, which is why boiling point and density both rise as the halogen gets heavier.",
      definition:
        "- The C-X bond is **polar**: carbon carries a partial positive charge and the halogen a partial negative charge.\n" +
        "- From F to I the halogen atom gets larger, so the **bond length rises** and the **bond enthalpy falls**.\n" +
        "- Methyl chloride, methyl bromide, ethyl chloride and some chlorofluoromethanes are **gases** at room temperature; higher members are liquids or solids.\n" +
        "- Haloalkanes boil **higher than hydrocarbons** of comparable molecular mass, because of their greater polarity and higher molecular mass, which give stronger forces between molecules.\n" +
        "- For the same alkyl group the boiling point order is **RI > RBr > RCl > RF**.\n" +
        "- For isomers the boiling point **falls with branching**: 1-bromobutane > 2-bromobutane > 2-bromo-2-methylpropane. A branched molecule has less surface area, so the forces between molecules are weaker.\n" +
        "- Of the dichlorobenzenes the **para** isomer melts highest, because it is symmetric and fits the crystal lattice better.\n" +
        "- **Density** rises with the number of carbon atoms, the number of halogen atoms and the atomic mass of the halogen. Bromo, iodo and polychloro compounds are denser than water.\n" +
        "- Haloalkanes are only **slightly soluble in water** but dissolve in organic solvents.",
      table: {
        columns: ["Bond", "Bond length in pm", "Bond enthalpy in kJ/mol", "Dipole moment in D"],
        rows: [
          { cells: ["\\(\\text{CH}_3\\text{-F}\\)", "139", "452", "1.847"], pyqExampleId: "421337bf-8360-4054-9968-ad7c277af404", noteAmber: "NEET 2021: the bond enthalpy order asked was CH₃-F > CH₃-Cl > CH₃-Br > CH₃-I." },
          { cells: ["\\(\\text{CH}_3\\text{-Cl}\\)", "178", "351", "1.860"] },
          { cells: ["\\(\\text{CH}_3\\text{-Br}\\)", "193", "293", "1.830"] },
          { cells: ["\\(\\text{CH}_3\\text{-I}\\)", "214", "234", "1.636"] },
        ],
        caption: "The longest bond, C-I, is the weakest. The dipole moment is largest for C-Cl, not C-F.",
      },
      pyqExampleId: "421337bf-8360-4054-9968-ad7c277af404",
      selfCheckExample: {
        prompt: "Arrange 1-bromobutane, 2-bromobutane and 2-bromo-2-methylpropane in decreasing order of boiling point.",
        steps: [
          "All three have the formula \\(\\text{C}_4\\text{H}_9\\text{Br}\\), so they have the same molecular mass.",
          "The more branched the molecule, the smaller its surface area and the weaker the forces between molecules.",
          "1-Bromobutane is unbranched, 2-bromobutane is a little branched and 2-bromo-2-methylpropane is the most branched.",
        ],
        answer: "1-Bromobutane > 2-bromobutane > 2-bromo-2-methylpropane",
      },
      practiceSet: [
        { prompt: "Which boils higher: bromoethane, C₂H₅Br, or iodoethane, C₂H₅I?", answer: "Iodoethane: for the same alkyl group, RI > RBr > RCl > RF" },
        { prompt: "Is bromoethane denser or less dense than water?", answer: "Denser: bromo, iodo and polychloro compounds are heavier than water" },
        { prompt: "Which dichlorobenzene has the highest melting point?", answer: "1,4-Dichlorobenzene (the para isomer), because it is symmetric and packs best in the crystal" },
        { prompt: "Why do haloalkanes boil higher than hydrocarbons of comparable molecular mass?", answer: "Their greater polarity and higher molecular mass give stronger forces between molecules" },
      ],
      traps: [
        {
          title: "The largest dipole moment is C-Cl, not C-F",
          body: "Fluorine is the most electronegative halogen, but the C-F bond is very short. \\(\\text{CH}_3\\text{-Cl}\\) has the largest dipole moment (1.860 D), a little more than \\(\\text{CH}_3\\text{-F}\\) (1.847 D).",
        },
        {
          title: "Branching lowers the boiling point",
          body: "Isomers have the same molecular mass, so the boiling point is decided by surface area. The most branched isomer, such as 2-bromo-2-methylpropane, boils lowest.",
        },
        {
          title: "The longest C-X bond is the weakest",
          body: "Bond length rises from C-F (139 pm) to C-I (214 pm), and bond enthalpy falls from 452 to 234 kJ/mol. C-F is the shortest and strongest bond.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchha-from-alcohols",
      name: "Haloalkanes from alcohols",
      intuition:
        "An alcohol already has a group on the carbon where the halogen should go: the OH. Every method here swaps that OH for a halogen. The reagents differ in what is left over: water with HX, an acid of phosphorus with the phosphorus halides, and two gases with thionyl chloride.",
      definition:
        "- **Hydrogen halides:** primary and secondary alcohols need concentrated HCl with **anhydrous** \\(\\text{ZnCl}_2\\). Tertiary alcohols react with concentrated HCl simply by shaking at room temperature.\n" +
        "- The order of reactivity of alcohols with a halogen acid is **3° > 2° > 1°**.\n" +
        "- **Phosphorus trihalides:** \\(3\\,\\text{R-OH} + \\text{PX}_3 \\rightarrow 3\\,\\text{R-X} + \\text{H}_3\\text{PO}_3\\). \\(\\text{PBr}_3\\) and \\(\\text{PI}_3\\) are made in the flask from red phosphorus with bromine or iodine.\n" +
        "- **Phosphorus pentachloride:** \\(\\text{R-OH} + \\text{PCl}_5 \\rightarrow \\text{R-Cl} + \\text{POCl}_3 + \\text{HCl}\\).\n" +
        "- **Thionyl chloride** is preferred: both by-products, \\(\\text{SO}_2\\) and HCl, are gases that escape, leaving a pure alkyl chloride.\n" +
        "- These methods do **not** make aryl halides from phenols: the C-O bond of phenol has partial double bond character and is hard to break.",
      formula: {
        label: "Alcohol to alkyl chloride with thionyl chloride",
        latex: "\\text{R-OH} + \\text{SOCl}_2 \\rightarrow \\text{R-Cl} + \\text{SO}_2\\uparrow + \\text{HCl}\\uparrow",
        symbols: [
          { symbol: "\\(\\text{R-OH}\\)", meaning: "the alcohol" },
          { symbol: "\\(\\text{SO}_2\\text{ and HCl}\\)", meaning: "the two gaseous by-products, which escape" },
        ],
      },
      authoredExample: {
        prompt: "Butan-1-ol is converted into 1-chlorobutane with thionyl chloride. Write the equation and say why the product is easy to get pure.",
        steps: [
          "\\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{OH} + \\text{SOCl}_2 \\rightarrow \\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{CH}_2\\text{Cl} + \\text{SO}_2 + \\text{HCl}\\)",
          "Both by-products, \\(\\text{SO}_2\\) and HCl, are gases, so they leave the flask.",
          "Only the alkyl chloride is left, with nothing to separate from it.",
        ],
        answer: "1-Chlorobutane forms; SO₂ and HCl escape as gases, so the product is left pure",
      },
      selfCheckExample: {
        prompt: "Butan-1-ol and 2-methylpropan-2-ol are each shaken with concentrated HCl at room temperature, with no ZnCl₂. Which one gives an alkyl chloride?",
        steps: [
          "The order of reactivity of alcohols with a halogen acid is 3° > 2° > 1°.",
          "2-Methylpropan-2-ol, \\((\\text{CH}_3)_3\\text{COH}\\), is tertiary, so it reacts with concentrated HCl on shaking.",
          "Butan-1-ol is primary and needs anhydrous \\(\\text{ZnCl}_2\\) as well.",
        ],
        answer: "2-Methylpropan-2-ol, giving 2-chloro-2-methylpropane",
      },
      practiceSet: [
        { prompt: "Which two substances are mixed to make PI₃ for turning an alcohol into an alkyl iodide?", answer: "Red phosphorus and iodine" },
        { prompt: "Why does phenol not give chlorobenzene with concentrated HCl and ZnCl₂?", answer: "The C-O bond of phenol has partial double bond character, so it is stronger than a single bond and hard to break" },
        { prompt: "Which alkyl halide forms when propan-2-ol reacts with PBr₃?", answer: "2-Bromopropane, \\(\\text{CH}_3\\text{CHBrCH}_3\\)" },
        { prompt: "What organic product does benzyl alcohol, C₆H₅CH₂OH, give with SOCl₂?", answer: "Benzyl chloride, \\(\\text{C}_6\\text{H}_5\\text{CH}_2\\text{Cl}\\)" },
      ],
      pyqExampleId: "1da6b707-d245-4218-b7da-ca3051dbf55c",
      traps: [
        {
          title: "PCl₃ and PCl₅ leave different by-products",
          body: "An alcohol with \\(\\text{PCl}_3\\) gives \\(\\text{H}_3\\text{PO}_3\\) (phosphorous acid). An alcohol with \\(\\text{PCl}_5\\) gives \\(\\text{POCl}_3\\) and HCl.",
        },
        {
          title: "Tertiary alcohols do not need ZnCl₂",
          body: "A tertiary alcohol reacts with concentrated HCl on shaking at room temperature. Anhydrous \\(\\text{ZnCl}_2\\) is needed for primary and secondary alcohols.",
        },
        {
          title: "Phenols are not converted like alcohols",
          body: "The methods that turn an alcohol into an alkyl halide do not turn phenol into an aryl halide, because the C-O bond of phenol has partial double bond character.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchha-from-hydrocarbons",
      name: "Haloalkanes from hydrocarbons and by halogen exchange",
      intuition:
        "A halogen can also be put on a hydrocarbon. In light, chlorine replaces hydrogen atoms of an alkane one at a time, and it does not choose which, so you get a mixture. Across a C=C, HX or a halogen adds instead. And one halogen can be swapped for another: the reaction is pushed forward when the salt formed drops out of the solution.",
      definition:
        "- **Free radical halogenation:** an alkane with \\(\\text{Cl}_2\\) or \\(\\text{Br}_2\\) in light or heat gives a **mixture** of isomeric mono and polyhaloalkanes that is hard to separate. Butane gives both 1-chlorobutane and 2-chlorobutane.\n" +
        "- **Counting monochloro products:** each set of equivalent hydrogens gives one structural isomer. If any carbon of a product carries four different groups (a chiral carbon), that product exists as two mirror-image forms, and both are counted when stereoisomers are asked. The next page explains these forms.\n" +
        "- **HX to an alkene:** the addition follows Markovnikov's rule, so propene with HBr gives mainly 2-bromopropane. With a peroxide present, HBr adds the other way (the peroxide effect); HCl and HI do not show this effect.\n" +
        "- **Halogen to an alkene:** \\(\\text{Br}_2\\) in \\(\\text{CCl}_4\\) adds across the C=C to give a vicinal dibromide, and the reddish-brown colour of bromine disappears. This is a test for a C=C.\n" +
        "- **Finkelstein reaction:** an alkyl chloride or bromide with NaI in dry acetone gives the alkyl iodide. NaCl and NaBr do not dissolve in dry acetone, so they precipitate and the reaction goes forward.\n" +
        "- **Swarts reaction:** an alkyl chloride or bromide heated with a metal fluoride such as AgF, \\(\\text{Hg}_2\\text{F}_2\\), \\(\\text{CoF}_2\\) or \\(\\text{SbF}_3\\) gives the alkyl fluoride.",
      formula: {
        label: "Finkelstein reaction",
        latex: "\\text{R-X} + \\text{NaI} \\xrightarrow{\\text{dry acetone}} \\text{R-I} + \\text{NaX}\\downarrow \\quad (\\text{X} = \\text{Cl, Br})",
        symbols: [
          { symbol: "\\(\\text{R-X}\\)", meaning: "an alkyl chloride or bromide" },
          { symbol: "\\(\\text{NaX}\\)", meaning: "sodium chloride or bromide, which precipitates in dry acetone" },
        ],
      },
      authoredExample: {
        prompt: "Butane, CH₃CH₂CH₂CH₃, is chlorinated in light. How many monochloro products form, counting stereoisomers?",
        steps: [
          "Butane has two sets of equivalent hydrogens: the six on the two end \\(\\text{CH}_3\\) groups and the four on the two middle \\(\\text{CH}_2\\) groups.",
          "So there are two structural isomers: 1-chlorobutane, \\(\\text{ClCH}_2\\text{CH}_2\\text{CH}_2\\text{CH}_3\\), and 2-chlorobutane, \\(\\text{CH}_3\\text{CHClCH}_2\\text{CH}_3\\).",
          "In 1-chlorobutane no carbon has four different groups, so it has one form.",
          "In 2-chlorobutane, C-2 carries H, Cl, \\(\\text{CH}_3\\) and \\(\\text{C}_2\\text{H}_5\\): four different groups, so it exists as two mirror-image forms.",
          "Total: 1 + 2 = 3.",
        ],
        answer: "Three: 1-chlorobutane and the two mirror-image forms of 2-chlorobutane",
      },
      selfCheckExample: {
        prompt: "1-Bromopropane is heated with NaI in dry acetone. Name the product and say why the reaction goes to completion.",
        steps: [
          "This is the Finkelstein reaction: iodide replaces bromide, giving \\(\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{I}\\).",
          "The NaBr formed does not dissolve in dry acetone, so it precipitates and is removed from the reaction.",
        ],
        answer: "1-Iodopropane; NaBr precipitates in dry acetone, which drives the reaction forward",
      },
      practiceSet: [
        { prompt: "Which reaction, with which reagent, turns bromomethane into fluoromethane?", answer: "The Swarts reaction, with AgF (or \\(\\text{Hg}_2\\text{F}_2\\), \\(\\text{CoF}_2\\), \\(\\text{SbF}_3\\))" },
        { prompt: "What is the major product of but-1-ene with HBr when no peroxide is present?", answer: "2-Bromobutane (Markovnikov addition)" },
        { prompt: "What colour change shows that Br₂ in CCl₄ has added to an alkene?", answer: "The reddish-brown colour of bromine disappears" },
        { prompt: "Why is free radical chlorination of an alkane a poor way to make one pure haloalkane?", answer: "It gives a mixture of isomeric mono and polyhaloalkanes that is hard to separate" },
      ],
      pyqExampleId: "ee1eda8f-b7d6-411c-8863-3b8facdcb569",
      traps: [
        {
          title: "Count two mirror-image forms only at a chiral carbon",
          body: "A monochloro product gives two stereoisomers only if the carbon that took the chlorine, or another carbon, now has four different groups. 2-Chloropropane has two \\(\\text{CH}_3\\) groups on that carbon, so it has one form only.",
        },
        {
          title: "Finkelstein needs dry acetone",
          body: "The exchange goes forward because NaCl and NaBr are insoluble in dry acetone and precipitate. The solvent is part of the reason the reaction works.",
        },
        {
          title: "The peroxide effect is for HBr only",
          body: "A peroxide makes HBr add against Markovnikov's rule. HCl and HI still add by Markovnikov's rule when a peroxide is present.",
        },
      ],
    },
  ],
};
