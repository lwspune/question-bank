import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSIFY_HALO_NOTE: SubtopicNote = {
  subtopicName: "Classification, Structure and Physical Properties",
  title: "Classification, Structure and Physical Properties",
  oneLineDefinition:
    "An organic halide is named by the carbon that holds the halogen: sp³ for alkyl, allylic and benzylic halides, sp² for vinylic and aryl halides, whose C–X bond is shorter, stronger and less polar; boiling point and density rise with the size and number of halogen atoms.",
  whyItMatters:
    "Thirteen PYQs, all multiple choice, three from 2026. Five classify a halide by the carbon that holds the halogen or compare the C–Cl bond of an aryl halide with that of an alkyl halide; four compare boiling points, melting points, densities or polarity; four ask the formula or the use of a polyhalogen compound.",
  concepts: [
    // C1 — classes of halides and the aryl C–X bond
    {
      kind: "reference" as const,
      slug: "jchalo-classify-bond",
      name: "Types of organic halides and the aryl C–X bond",
      intuition:
        "Look only at the carbon that carries the halogen. If it is sp³, the halide is alkyl, allylic (that carbon sits next to a C=C) or benzylic (it sits next to a benzene ring). If it is sp², the halide is vinylic (on a C=C carbon) or aryl (on a ring carbon). In vinylic and aryl halides a lone pair of the halogen spreads into the π system, so the C–X bond gains some double-bond character.",
      definition:
        "- **Alkyl halides** are 1°, 2° or 3° by the number of carbons on the carbon that holds X.\n" +
        "- **Allylic**: X on an sp³ carbon next to C=C, as in \\(\\mathrm{CH_2{=}CH{-}CH_2{-}Cl}\\). **Benzylic**: X on an sp³ carbon attached to a ring, as in \\(\\mathrm{C_6H_5CH_2Cl}\\).\n" +
        "- **Vinylic**: X on an sp² carbon of C=C, as in \\(\\mathrm{CH_2{=}CHCl}\\). **Aryl**: X on a ring carbon, as in \\(\\mathrm{C_6H_5Cl}\\).\n" +
        "- **Geminal** dihalides (alkylidene halides) carry both X on one carbon; **vicinal** dihalides (alkylene halides) carry them on adjacent carbons.\n" +
        "- In an aryl or vinylic halide, resonance gives the C–X bond partial double-bond character, and the carbon is sp² (more s character). So the bond is **shorter and stronger** (C–Cl 169 pm in chlorobenzene against 177 pm in an alkyl chloride) and **less polar**, with less negative charge on the halogen.",
      table: {
        columns: ["Class", "Carbon that holds X", "Example", "What follows"],
        rows: [
          { cells: ["Alkyl, 1°", "sp³ carbon bonded to one other carbon", "\\(\\mathrm{CH_3CH_2CH_2Cl}\\)", "Reacts mainly by SN2"] },
          { cells: ["Alkyl, 3°", "sp³ carbon bonded to three other carbons", "\\(\\mathrm{(CH_3)_3C{-}Cl}\\)", "Reacts mainly by SN1 or elimination"] },
          { cells: ["Allylic", "sp³ carbon next to a C=C", "\\(\\mathrm{CH_2{=}CH{-}CH_2{-}Cl}\\)", "Ionises easily: the allyl cation is resonance-stabilised"] },
          { cells: ["Benzylic", "sp³ carbon attached to a benzene ring", "\\(\\mathrm{C_6H_5CH_2Cl}\\), \\(\\mathrm{C_6H_5CH(Cl)CH_3}\\)", "Ionises easily: the benzyl cation is resonance-stabilised"] },
          { cells: ["Vinylic", "sp² carbon of a C=C", "\\(\\mathrm{CH_2{=}CHCl}\\)", "Partial C=Cl character; no SN1 or SN2 under normal conditions"] },
          { cells: ["Aryl", "sp² carbon of a benzene ring", "\\(\\mathrm{C_6H_5Cl}\\)", "Partial C=Cl character; substituted only under harsh conditions or with nitro groups ortho or para"] },
          { cells: ["Geminal dihalide", "Both X on one carbon", "Ethylidene chloride, \\(\\mathrm{CH_3CHCl_2}\\) (1,1-dichloroethane)", "Common name ends in -idene"] },
          { cells: ["Vicinal dihalide", "X on two adjacent carbons", "Ethylene dichloride, \\(\\mathrm{ClCH_2CH_2Cl}\\) (1,2-dichloroethane)", "Common name ends in -ene"] },
        ],
        caption: "Allylic and benzylic halides are sp³ at the C–X carbon; vinylic and aryl halides are sp².",
      },
      selfCheckExample: {
        prompt: "Compare the C–Br bond in \\(\\mathrm{CH_2{=}CHBr}\\) with the C–Br bond in \\(\\mathrm{CH_3CH_2Br}\\). Which bond is shorter, and which is more polar?",
        steps: [
          "In vinyl bromide the bromine is on an sp² carbon and a lone pair of Br is delocalised into the C=C.",
          "That gives the C–Br bond partial double-bond character, so it is shorter and stronger.",
          "Delocalisation moves electron density away from Br, so the bond in vinyl bromide is less polar than in ethyl bromide.",
        ],
        answer: "The C–Br bond of vinyl bromide is shorter; the C–Br bond of ethyl bromide is more polar.",
      },
      practiceSet: [
        { prompt: "Classify \\(\\mathrm{C_6H_5CH_2Br}\\).", answer: "Benzylic halide (X on an sp³ carbon attached to the ring)" },
        { prompt: "Classify \\(\\mathrm{CH_3CH{=}CHCl}\\).", answer: "Vinylic halide" },
        { prompt: "What is the IUPAC name of ethylene dichloride?", answer: "1,2-Dichloroethane" },
        { prompt: "What is the hybridisation of the carbon that holds Cl in allyl chloride?", answer: "sp³" },
      ],
      pyqExampleId: "db63c7ee-7371-400a-8fd4-72922dadeddb", // 2026 — chlorobenzene against chlorocyclohexane
      traps: [
        {
          title: "Allylic is not vinylic",
          body: "In an allyl halide such as \\(\\mathrm{CH_2{=}CH{-}CH_2Cl}\\) the halogen is on the sp³ carbon next to the double bond. A statement that allylic halides carry X on an sp² carbon is false; that describes a vinylic halide.",
        },
        {
          title: "Ethylidene and ethylene dichloride",
          body: "The -idene name puts both halogens on one carbon: ethylidene chloride is 1,1-dichloroethane. Ethylene dichloride has them on adjacent carbons: 1,2-dichloroethane.",
        },
        {
          title: "Resonance makes the aryl C–Cl bond shorter and less polar",
          body: "Delocalisation of a chlorine lone pair into the ring gives the bond partial double-bond character. The bond gets shorter, not longer, and chlorine carries less negative charge than in an alkyl chloride.",
        },
      ],
    },

    // C2 — physical properties
    {
      kind: "reference" as const,
      slug: "jchalo-physical",
      name: "Boiling point, melting point, density and polarity of halides",
      intuition:
        "Boiling point follows the attraction between molecules. Larger, more polarisable halogens and longer chains give stronger van der Waals forces, so the boiling point rises; branching makes a molecule more compact and lowers it. Melting point also depends on how well molecules pack in a crystal, which is why a symmetric isomer can melt highest without boiling highest. Density rises as heavy halogen atoms replace hydrogen.",
      definition:
        "- Same alkyl group: \\(\\mathrm{R{-}I > R{-}Br > R{-}Cl > R{-}F}\\) in boiling point.\n" +
        "- Same halogen: boiling point rises with chain length and falls with branching: 1-bromobutane (375 K) > 2-bromobutane (364 K) > 2-bromo-2-methylpropane (346 K).\n" +
        "- Dichlorobenzenes: the para isomer melts highest (323 K) because it is the most symmetric and packs best; the ortho isomer boils highest (453 K) because it is the most polar.\n" +
        "- Density rises with the number and mass of halogen atoms: \\(\\mathrm{CH_2Cl_2 < CHCl_3 < CCl_4}\\), and \\(\\mathrm{n{-}C_3H_7Cl < n{-}C_3H_7Br < n{-}C_3H_7I}\\). Bromo, iodo and polychloro compounds are denser than water.\n" +
        "- In a 1,2-dihaloethene the two C–X dipoles add in the cis isomer and cancel in the trans isomer, so the cis isomer is polar and boils higher.\n" +
        "- Haloalkanes dissolve only slightly in water: breaking water's hydrogen bonds costs more energy than the new attractions release.",
      table: {
        columns: ["Property", "Trend", "Reason"],
        rows: [
          { cells: ["Boiling point, changing the halogen", "\\(\\mathrm{RI > RBr > RCl > RF}\\)", "A larger, more polarisable halogen gives stronger van der Waals forces"] },
          { cells: ["Boiling point, longer chain", "\\(\\mathrm{CH_3Cl < C_2H_5Cl < n{-}C_3H_7Cl}\\)", "A larger surface gives stronger London forces"] },
          { cells: ["Boiling point, branched isomers", "Falls with branching", "A branched molecule is more nearly spherical, with less contact area"] },
          { cells: ["Melting point of dichlorobenzenes", "para (323 K) > ortho (256 K) > meta (249 K)", "The symmetric para isomer packs best in the crystal"] },
          { cells: ["Boiling point of dichlorobenzenes", "ortho (453 K) > para (448 K) > meta (446 K)", "The ortho isomer has the largest dipole"] },
          { cells: ["Density", "\\(\\mathrm{CH_2Cl_2 < CHCl_3 < CCl_4}\\); iodides densest", "More and heavier halogen atoms in about the same volume"] },
          { cells: ["Dipole moment of \\(\\mathrm{CH_3X}\\)", "\\(\\mathrm{CH_3Cl > CH_3F > CH_3Br > CH_3I}\\)", "Charge × bond length is largest for C–Cl; the C–F bond is very short"] },
          { cells: ["cis against trans 1,2-dihaloethene", "cis is polar and boils higher; trans has almost no dipole", "In the trans isomer the two C–X dipoles point opposite ways and cancel"] },
        ],
        caption: "Symmetry raises the melting point; polarity and size raise the boiling point.",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{C_2H_5Cl}\\), \\(\\mathrm{C_2H_5Br}\\) and \\(\\mathrm{C_2H_5I}\\) in increasing density, and say which of them are denser than water.",
        steps: [
          "The alkyl group is the same, so density follows the mass of the halogen: Cl < Br < I.",
          "Bromo and iodo compounds are denser than water; ethyl chloride is lighter than water.",
        ],
        answer: "\\(\\mathrm{C_2H_5Cl < C_2H_5Br < C_2H_5I}\\); ethyl bromide and ethyl iodide are denser than water.",
      },
      practiceSet: [
        { prompt: "Which boils higher: 1-bromobutane or 2-bromo-2-methylpropane?", answer: "1-Bromobutane (unbranched)" },
        { prompt: "Which isomer of 1,2-dichloroethene has almost zero dipole moment?", answer: "trans-1,2-Dichloroethene" },
        { prompt: "Which is denser: \\(\\mathrm{CHCl_3}\\) or \\(\\mathrm{CH_2Cl_2}\\)?", answer: "\\(\\mathrm{CHCl_3}\\)" },
        { prompt: "Which methyl halide has the largest dipole moment?", answer: "\\(\\mathrm{CH_3Cl}\\)" },
      ],
      pyqExampleId: "47583fa4-e2c8-4270-badb-7a53414b49e6", // 2026 — alkyl iodide boiling points and dichlorobenzene isomers
      traps: [
        {
          title: "Symmetry raises the melting point, not the boiling point",
          body: "1,4-Dichlorobenzene melts far above its isomers because it packs well, yet it boils below 1,2-dichlorobenzene, which has the larger dipole. Do not carry the melting-point order over to boiling points.",
        },
        {
          title: "Methyl fluoride is not the most polar methyl halide",
          body: "Fluorine is the most electronegative halogen, but the C–F bond is so short that the dipole moment of \\(\\mathrm{CH_3F}\\) is slightly below that of \\(\\mathrm{CH_3Cl}\\).",
        },
        {
          title: "Iodides are the densest, not the lightest",
          body: "For the same alkyl group, density rises from chloride to bromide to iodide. An order that puts the iodo compound lowest has it backwards.",
        },
      ],
    },

    // C3 — polyhalogen compounds
    {
      kind: "reference" as const,
      slug: "jchalo-polyhalogen",
      name: "Polyhalogen compounds: formulas and uses",
      intuition:
        "A handful of compounds with several halogen atoms are asked as facts: what each is used for, and how many halogen atoms it carries. Write the formula first; the count and the use then follow.",
      definition:
        "- **Dichloromethane** \\(\\mathrm{CH_2Cl_2}\\): solvent, paint remover, aerosol propellant; harms the central nervous system.\n" +
        "- **Chloroform** \\(\\mathrm{CHCl_3}\\): solvent, once an anaesthetic. Air and light oxidise it to the poisonous gas phosgene, \\(\\mathrm{COCl_2}\\), so it is kept in dark bottles filled to the top.\n" +
        "- **Iodoform** \\(\\mathrm{CHI_3}\\): antiseptic, because of the iodine it releases.\n" +
        "- **Carbon tetrachloride** \\(\\mathrm{CCl_4}\\): solvent and raw material for freons; once used in fire extinguishers; it depletes ozone.\n" +
        "- **Freons** are chlorofluorocarbons, such as freon-12, \\(\\mathrm{CCl_2F_2}\\), made from \\(\\mathrm{CCl_4}\\) by the Swarts reaction: refrigerants and aerosol propellants.\n" +
        "- **DDT** \\(\\mathrm{(ClC_6H_4)_2CH{-}CCl_3}\\): insecticide; not biodegradable, so it builds up in fatty tissue.",
      table: {
        columns: ["Compound", "Formula", "Use or fact"],
        rows: [
          { cells: ["Dichloromethane (methylene chloride)", "\\(\\mathrm{CH_2Cl_2}\\)", "Paint remover, solvent and aerosol propellant"] },
          { cells: ["Trichloromethane (chloroform)", "\\(\\mathrm{CHCl_3}\\)", "Solvent; stored in dark, full bottles because air and light turn it into phosgene"] },
          { cells: ["Triiodomethane (iodoform)", "\\(\\mathrm{CHI_3}\\)", "Antiseptic, through the free iodine it releases"] },
          { cells: ["Tetrachloromethane (carbon tetrachloride)", "\\(\\mathrm{CCl_4}\\)", "Fire extinguisher (earlier), solvent, feedstock for freons"] },
          { cells: ["Freon-12 (dichlorodifluoromethane)", "\\(\\mathrm{CCl_2F_2}\\)", "Refrigerant and aerosol propellant; a CFC with 2 Cl"] },
          { cells: ["DDT (p,p′-dichlorodiphenyltrichloroethane)", "\\(\\mathrm{C_{14}H_9Cl_5}\\)", "Non-biodegradable insecticide; 5 Cl"] },
          { cells: ["Gammaxene (lindane, BHC)", "\\(\\mathrm{C_6H_6Cl_6}\\)", "Insecticide; 6 Cl"] },
          { cells: ["Chloropicrin (trichloronitromethane)", "\\(\\mathrm{CCl_3NO_2}\\)", "Insecticide and war gas; 3 Cl"] },
          { cells: ["Chloral (trichloroethanal)", "\\(\\mathrm{CCl_3CHO}\\)", "Raw material for DDT; 3 Cl"] },
        ],
        caption: "Learn each compound with its formula: most questions ask for a use or an atom count.",
      },
      selfCheckExample: {
        prompt: "How many chlorine atoms does one molecule of DDT contain, and why is its use restricted?",
        steps: [
          "DDT is \\(\\mathrm{(ClC_6H_4)_2CH{-}CCl_3}\\): one Cl on each of the two rings and three on the \\(\\mathrm{CCl_3}\\) group.",
          "It is not broken down in the environment and collects in the fat of animals, so it passes up food chains.",
        ],
        answer: "Five chlorine atoms; it is not biodegradable and accumulates in fatty tissue.",
      },
      practiceSet: [
        { prompt: "Which is used as an antiseptic: \\(\\mathrm{CHI_3}\\) or \\(\\mathrm{CHCl_3}\\)?", answer: "\\(\\mathrm{CHI_3}\\) (iodoform)" },
        { prompt: "What poisonous gas forms when chloroform stands in air and light?", answer: "Phosgene, \\(\\mathrm{COCl_2}\\)" },
        { prompt: "Which polyhalogen compound is used as a paint remover?", answer: "Dichloromethane, \\(\\mathrm{CH_2Cl_2}\\)" },
        { prompt: "Which reaction converts \\(\\mathrm{CCl_4}\\) into freons?", answer: "The Swarts reaction (a metal fluoride such as \\(\\mathrm{SbF_3}\\))" },
      ],
      pyqExampleId: "d4ce4356-60d4-4ecf-8c2f-98478359e70a", // 2023 — most chlorine atoms among four named compounds
      traps: [
        {
          title: "A freon needs both chlorine and fluorine",
          body: "Freons are chlorofluorocarbons. A compound with fluorine but no chlorine, such as \\(\\mathrm{C_2F_4}\\) or \\(\\mathrm{C_2HF_3}\\), is not a freon.",
        },
        {
          title: "Chloroform is kept full and dark",
          body: "Chloroform is stored in dark bottles filled to the brim to keep out air and light, which oxidise it to phosgene. The storage rule is a common statement question.",
        },
      ],
    },
  ],
};
