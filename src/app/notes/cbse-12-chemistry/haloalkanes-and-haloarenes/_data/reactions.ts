import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions",
  title: "Chemical Reactions: Substitution, Elimination, Metals and Haloarenes",
  oneLineDefinition:
    "Nucleophilic substitution and its reagents, the SN2 and SN1 mechanisms with their order of reactivity and stereochemistry, elimination by alcoholic KOH, Grignard reagents and coupling with sodium, and the nucleophilic and electrophilic substitution of haloarenes.",
  whyItMatters:
    "113 questions, the biggest page of the chapter. Ninety-three come from board papers, between 21 and 27 in each year from 2023 to 2026. Every year the board asks which of two halides reacts faster by SN1 or SN2 and why, why haloarenes resist nucleophilic substitution and what nitro groups do to that, a chirality or racemisation question, KCN against AgCN, what alcoholic KOH does, a Grignard reagent and a coupling with sodium (Wurtz, Fittig or Wurtz-Fittig). Why chlorine is ortho, para directing was asked in 2024 and 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcha-sn-reagents",
      name: "Nucleophilic substitution: reagents, products and ambident nucleophiles",
      intuition:
        "The carbon holding the halogen is slightly positive, so a nucleophile (a species with a spare electron pair) attacks it and pushes the halogen out as a halide ion. Change the nucleophile and the product changes: one alkyl halide can become an alcohol, an ether, an amine, a nitrile or a nitro compound. Cyanide and nitrite can attack through two different atoms, and the metal in the reagent decides which.",
      definition:
        "- **Nucleophilic substitution:** a nucleophile replaces the halogen, which departs as a halide ion (the **leaving group**): \\(\\text{Nu}^- + \\text{R-X} \\rightarrow \\text{R-Nu} + \\text{X}^-\\).\n" +
        "- **Ambident nucleophiles** have two nucleophilic centres: cyanide (through C or N) and nitrite (through O or N).\n" +
        "- **KCN** is predominantly ionic and gives free cyanide ions. Attack is mainly through **carbon**, since a C-C bond is more stable than a C-N bond: the product is an **alkyl cyanide (nitrile)**.\n" +
        "- **AgCN** is mainly covalent, so only the nitrogen is free to donate its electron pair: the main product is an **isocyanide**.\n" +
        "- In the same way **KNO₂** gives an **alkyl nitrite** (attack through O) and **AgNO₂** a **nitroalkane** (attack through N).\n" +
        "- A nitrile has **one carbon more** than the alkyl halide it came from.\n" +
        "- Aqueous KOH substitutes (gives an alcohol); alcoholic KOH eliminates (gives an alkene, see the elimination concept below).",
      table: {
        columns: ["Reagent", "Nucleophile", "Main product from R-X"],
        rows: [
          { cells: ["NaOH or KOH (aqueous)", "HO⁻", "Alcohol, R-OH"] },
          { cells: ["H₂O", "H₂O", "Alcohol, R-OH"] },
          { cells: ["NaOR'", "R'O⁻", "Ether, R-O-R'"] },
          { cells: ["NaI", "I⁻", "Alkyl iodide, R-I"] },
          { cells: ["NH₃", "NH₃", "Primary amine, R-NH₂"] },
          { cells: ["R'NH₂", "R'NH₂", "Secondary amine, R-NHR'"] },
          { cells: ["R'R''NH", "R'R''NH", "Tertiary amine, R-NR'R''"] },
          {
            cells: ["KCN", "Cyanide ion, attacking through C", "Nitrile (alkyl cyanide), R-CN"],
            pyqExampleId: "a3f1e5d7-0510-4f83-b56e-3e29d2d7c946",
            noteAmber: "Board 2024: butanenitrile comes from propyl chloride, because the cyanide brings the fourth carbon.",
          },
          {
            cells: ["AgCN", "Ag-CN, attacking through N", "Isocyanide (isonitrile), R-NC"],
            pyqExampleId: "f5bbfabb-d421-430b-bd75-4e0b7aae2051",
            noteAmber: "Board 2024 asked why AgCN gives the isocyanide as main product; KCN against AgCN came again in 2025 and 2026.",
          },
          { cells: ["KNO₂", "Nitrite ion, attacking through O", "Alkyl nitrite, R-O-N=O"] },
          { cells: ["AgNO₂", "Ag-O-N=O, attacking through N", "Nitroalkane, R-NO₂"] },
          { cells: ["R'COOAg", "R'COO⁻", "Ester, R'COOR"] },
          { cells: ["LiAlH₄", "H⁻", "Hydrocarbon, R-H"] },
        ],
        caption: "Table 6.4 of the NCERT chapter.",
      },
      selfCheckExample: {
        prompt: "Methyl iodide is treated separately with KCN and with AgCN. Write both products and give the reason for the difference.",
        steps: [
          "KCN is ionic; the cyanide ion attacks through carbon: \\(\\text{CH}_3\\text{I} + \\text{KCN} \\rightarrow \\text{CH}_3\\text{CN} + \\text{KI}\\) (ethanenitrile).",
          "AgCN is covalent; only nitrogen is free to attack: \\(\\text{CH}_3\\text{I} + \\text{AgCN} \\rightarrow \\text{CH}_3\\text{NC} + \\text{AgI}\\) (methyl isocyanide).",
        ],
        answer: "KCN gives CH₃CN (nitrile); AgCN gives CH₃NC (isocyanide)",
      },
      practiceSet: [
        { prompt: "Name the product of 1-bromopropane heated with aqueous KOH.", answer: "Propan-1-ol, CH₃CH₂CH₂OH" },
        { prompt: "Which reagent converts an alkyl halide into an ester?", answer: "The silver salt of a carboxylic acid, R'COOAg" },
        { prompt: "2-Chlorobutane is heated with alcoholic KCN. How many carbon atoms does the product have, and what is it called?", answer: "Five: CH₃CH(CN)CH₂CH₃, 2-methylbutanenitrile" },
      ],
      pyqExampleId: "d7594599-cc6d-46e2-9051-bc33daeea6fc",
      traps: [
        {
          title: "Potassium salt or silver salt",
          body: "KCN gives the nitrile and AgCN the isocyanide; KNO₂ gives the alkyl nitrite and AgNO₂ the nitroalkane. Look at the metal in the reagent before you write the product.",
        },
        {
          title: "Losing a carbon in a nitrile",
          body: "The CN group adds a carbon. A three-carbon halide gives a four-carbon nitrile, so its name ends in butanenitrile, not propanenitrile.",
        },
        {
          title: "A reason without the word ionic or covalent",
          body: "\"AgCN gives isocyanide\" is the fact, not the reason. The reason is that AgCN is mainly covalent, so only the nitrogen lone pair is free, while ionic KCN frees the cyanide ion to attack through carbon.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-sn1-sn2",
      name: "SN2 and SN1: mechanism and order of reactivity",
      intuition:
        "There are two routes. In SN2 the nucleophile pushes in from the back while the halide leaves, all in one step, so anything crowding that carbon slows it down: methyl and primary halides are fastest. In SN1 the halide leaves first and a carbocation forms; the more stable that carbocation, the faster the reaction, so tertiary, allylic and benzylic halides are fastest. The two orders for the alkyl group run opposite ways.",
      definition:
        "- **SN2 (substitution nucleophilic bimolecular):** for example \\(\\text{CH}_3\\text{Cl} + \\text{OH}^- \\rightarrow \\text{CH}_3\\text{OH} + \\text{Cl}^-\\). Second order: the rate depends on both reactants.\n" +
        "- SN2 happens in **one step**, with no intermediate. In the transition state the carbon is partly bonded to the incoming and the leaving group at once (five atoms in all), and the three other bonds lie in one plane.\n" +
        "- Bulky groups on or near the carbon block the nucleophile, so for SN2: **CH₃X > 1° > 2° > 3°**.\n" +
        "- **SN1 (substitution nucleophilic unimolecular):** for example \\((\\text{CH}_3)_3\\text{CBr} + \\text{OH}^- \\rightarrow (\\text{CH}_3)_3\\text{COH} + \\text{Br}^-\\). First order: the rate depends only on the alkyl halide.\n" +
        "- SN1 has **two steps**. Step I (slow): the C-X bond breaks to give a **carbocation** and a halide ion; the energy comes from solvation of the halide ion by the protic solvent. Step II (fast): the nucleophile attacks the carbocation.\n" +
        "- SN1 is carried out in **polar protic solvents** (water, alcohol, acetic acid). The more stable the carbocation, the faster the reaction: **3° > 2° > 1° > CH₃X**.\n" +
        "- **Allylic and benzylic halides** react fast by SN1 because their carbocations are stabilised by resonance.\n" +
        "- For a given alkyl group, the halogen order is the same in both: **R-I > R-Br > R-Cl >> R-F**.",
      table: {
        columns: ["Feature", "SN2", "SN1"],
        rows: [
          { cells: ["Steps", "One step, no intermediate", "Two steps, through a carbocation"] },
          { cells: ["Kinetics", "Second order: rate = k[RX][Nu⁻]", "First order: rate = k[RX]"] },
          {
            cells: ["Order for the alkyl group", "CH₃X > 1° > 2° > 3° (steric hindrance)", "3° > 2° > 1° > CH₃X (carbocation stability)"],
            pyqExampleId: "5fdacfef-65b7-4bb1-b3c0-cf3a6c237294",
            noteAmber: "Board 2024 asked which bromide is fastest by SN1; (CH₃)₃CCH₂Br looks crowded but is primary.",
          },
          {
            cells: ["Halides that react fast", "Methyl and primary halides", "Tertiary, allylic and benzylic halides"],
            pyqExampleId: "cbaff201-6b43-485d-bc9d-ffde7b8cc0bd",
            noteAmber: "Board 2023 set a pair for SN2: a ring carrying -CH₂Cl against a ring carrying -Cl.",
          },
          {
            cells: ["Order for the halogen", "R-I > R-Br > R-Cl >> R-F", "R-I > R-Br > R-Cl >> R-F"],
            pyqExampleId: "bf73c9ee-f78f-45a6-818f-bbdcfe1c40e2",
            noteAmber: "Board 2025 asked which of four ethyl halides is most reactive towards SN2: the iodide.",
          },
          { cells: ["Optically active halide gives", "Inversion of configuration", "Racemisation"] },
        ],
      },
      selfCheckExample: {
        prompt: "Arrange CH₃Br, (CH₃)₃CBr, CH₃CH₂Br and (CH₃)₂CHBr in increasing order of reactivity towards SN2.",
        steps: [
          "SN2 is slowed by crowding at the carbon that carries the bromine.",
          "(CH₃)₃CBr is tertiary (most crowded), (CH₃)₂CHBr secondary, CH₃CH₂Br primary and CH₃Br methyl (least crowded).",
        ],
        answer: "(CH₃)₃CBr < (CH₃)₂CHBr < CH₃CH₂Br < CH₃Br",
      },
      practiceSet: [
        { prompt: "The rate of hydrolysis of an alkyl halide depends only on the concentration of the halide. Which mechanism is it?", answer: "SN1 (first order kinetics)" },
        { prompt: "Which reacts faster by SN2, 1-bromopentane or 1-iodopentane, and why?", answer: "1-Iodopentane: the C-I bond is weaker, so iodide is the better leaving group" },
        { prompt: "Why are SN1 reactions carried out in polar protic solvents?", answer: "Solvation of the halide ion by the protic solvent supplies the energy to break the C-X bond" },
      ],
      pyqExampleId: "a2815c9d-3767-482d-b779-0703fed17b42",
      traps: [
        {
          title: "Using the SN1 order for an SN2 question",
          body: "For the alkyl group the two orders are opposite: tertiary is fastest by SN1 and slowest by SN2. Read which mechanism the question names before you write the order.",
        },
        {
          title: "Calling benzyl chloride slow because it is primary",
          body: "Benzyl and allyl chlorides are primary, yet they react fast by SN1: their carbocations are stabilised by resonance. Say \"resonance-stabilised carbocation\" in the reason.",
        },
        {
          title: "Judging crowding at the wrong carbon",
          body: "Count the alkyl groups on the carbon that holds the halogen. A primary halide with a branch on the next carbon is still primary, though that branch slows SN2.",
        },
        {
          title: "Differences that compare only one side",
          body: "\"SN1 is first order\" is half a difference. Write each point for both: SN1 first order, SN2 second order; SN1 racemisation, SN2 inversion; SN1 through a carbocation, SN2 in one step.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-stereo",
      name: "Chirality, enantiomers, inversion and racemisation",
      intuition:
        "Your left and right hands are mirror images that cannot be laid one on the other: they are chiral. A carbon with four different groups makes a molecule chiral in the same way, and such a molecule turns plane polarised light. In SN2 the nucleophile enters from the back, so the molecule turns inside out like an umbrella in the wind. In SN1 the flat carbocation can be attacked from either face, so both forms appear in equal amounts.",
      definition:
        "- **Optical activity:** a compound that rotates the plane of plane polarised light is optically active. Rotation to the right (clockwise) is **dextrorotatory**, d or (+); to the left is **laevorotatory**, l or (−). The rotation is measured with a polarimeter.\n" +
        "- **Chiral:** not superimposable on its mirror image. A carbon carrying four different groups is an **asymmetric carbon (stereocentre)**. Chiral molecules are optically active; achiral ones are not.\n" +
        "- **Enantiomers:** stereoisomers that are non-superimposable mirror images. They have identical physical properties (melting point, boiling point, refractive index) and differ only in the direction in which they rotate plane polarised light.\n" +
        "- **Racemic mixture:** the two enantiomers in equal proportions; zero optical rotation, written dl or (±). **Racemisation** is the conversion of an enantiomer into a racemic mixture.\n" +
        "- **Retention:** the spatial arrangement at the stereocentre is kept (no bond to it is broken). **Inversion:** it is turned over. A 50:50 mixture of the two is racemisation.\n" +
        "- **SN2:** optically active halides give **inversion**, because the nucleophile attaches on the side opposite the halogen: (−)-2-bromooctane with NaOH gives (+)-octan-2-ol.\n" +
        "- **SN1:** optically active halides give **racemisation**, because the carbocation is sp² and planar, and the nucleophile attacks from either side: optically active 2-bromobutane gives (±)-butan-2-ol.",
      table: {
        columns: ["Term", "What it means", "Example"],
        rows: [
          {
            cells: ["Chiral molecule", "Has a carbon with four different groups; not superimposable on its mirror image", "Butan-2-ol, 2-chlorobutane"],
            pyqExampleId: "3515c7d0-61d6-4b5c-8d38-d4c0aa115c18",
            noteAmber: "Board 2025 and 2026 asked which of four simple halides or alcohols is chiral.",
          },
          { cells: ["Achiral molecule", "Superimposable on its mirror image", "Propan-2-ol, 2-bromopropane (two identical CH₃ groups)"] },
          {
            cells: ["Enantiomers", "Non-superimposable mirror images; same physical properties; rotate light equally in opposite directions", "(+)- and (−)-butan-2-ol"],
            pyqExampleId: "88be1492-fe19-4e71-96d0-9e45fd778ac4",
            noteAmber: "Board 2023 and 2026 asked which statement about enantiomers is not true: they do not have the same specific rotation.",
          },
          { cells: ["Racemic mixture", "Equal amounts of the two enantiomers; optically inactive", "(±)-Butan-2-ol"] },
          {
            cells: ["Inversion", "Configuration at the stereocentre turned over; SN2", "(−)-2-Bromooctane with NaOH gives (+)-octan-2-ol"],
            pyqExampleId: "425a9634-2856-456b-b0a5-f9d86e23a41b",
            noteAmber: "Board 2023 asked in which reaction inversion occurs; 2024 and 2025 asked it again.",
          },
          {
            cells: ["Racemisation", "An enantiomer turns into a racemic mixture; SN1", "Optically active 2-bromobutane gives (±)-butan-2-ol"],
            pyqExampleId: "ad1e7526-c3a6-4b76-ad89-597f7be548d0",
            noteAmber: "Board 2023 asked in which reaction racemisation occurs.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which of 2-chloropropane and 2-chlorobutane is chiral? Give the reason.",
        steps: [
          "In 2-chloropropane the carbon holding Cl carries H, Cl and two identical CH₃ groups: not four different groups.",
          "In 2-chlorobutane that carbon carries H, Cl, CH₃ and C₂H₅: four different groups, so it is a stereocentre.",
        ],
        answer: "2-Chlorobutane is chiral; 2-chloropropane is achiral",
      },
      practiceSet: [
        { prompt: "Define racemisation.", answer: "The conversion of an enantiomer into a racemic mixture (equal amounts of both enantiomers)" },
        { prompt: "In which one property do two enantiomers differ?", answer: "The direction in which they rotate plane polarised light" },
        { prompt: "(−)-2-Bromooctane reacts with NaOH by SN2. What happens to the configuration?", answer: "It is inverted: (+)-octan-2-ol forms with -OH on the side opposite to where Br was" },
      ],
      pyqExampleId: "c821874d-981b-49d8-aff0-5f0b67cbe68a",
      traps: [
        {
          title: "Calling a racemic mixture achiral",
          body: "(±)-Butan-2-ol is optically inactive, yet every molecule in it is chiral. The rotations of the two enantiomers are equal and opposite and cancel.",
        },
        {
          title: "Linking the sign of rotation to the configuration",
          body: "The sign (+) or (−) is not necessarily related to the actual arrangement of groups. Two compounds with the same configuration can rotate light in opposite directions.",
        },
        {
          title: "Retention and the two mechanisms",
          body: "SN2 gives inversion only. In SN1 half of the product forms by attack from the same side, so a question asking where retention is seen points to SN1, never SN2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcha-elimination",
      name: "Elimination: alcoholic KOH and Saytzeff's rule",
      intuition:
        "Hydroxide in water attacks the carbon and swaps for the halogen. In alcohol the base is the stronger alkoxide, which grabs a hydrogen from the next carbon instead, and the halogen leaves with it: a double bond forms. When there is a choice of hydrogens, the alkene with more alkyl groups on its double bond wins.",
      definition:
        "- **Dehydrohalogenation (β-elimination):** a haloalkane with a β-hydrogen, heated with **alcoholic KOH**, loses H from the β-carbon and X from the α-carbon to give an alkene.\n" +
        "- The **α-carbon** carries the halogen; a **β-carbon** is any carbon next to it.\n" +
        "- **Saytzeff (Zaitsev) rule:** when more than one alkene can form, the preferred product is the alkene with the **greater number of alkyl groups on the doubly bonded carbons**.\n" +
        "- **Aqueous KOH** gives OH⁻, a nucleophile: **substitution**, an alcohol. **Alcoholic KOH** gives alkoxide ions, a stronger base: **elimination**, an alkene.\n" +
        "- Substitution and elimination compete. A bulkier base prefers to pull off a proton. A primary halide prefers SN2; a secondary one SN2 or elimination; a tertiary one SN1 or elimination.",
      formula: {
        label: "Dehydrohalogenation",
        latex: "\\text{R-CH}_2\\text{-CH}_2\\text{-X} + \\text{KOH (alc.)} \\xrightarrow{\\Delta} \\text{R-CH=CH}_2 + \\text{KX} + \\text{H}_2\\text{O}",
        symbols: [
          { symbol: "\\(\\text{X}\\)", meaning: "halogen on the α-carbon" },
        ],
      },
      authoredExample: {
        prompt: "2-Bromopentane is heated with alcoholic KOH. Write the alkenes that can form and name the major one.",
        steps: [
          "The α-carbon is C-2. Its neighbours C-1 (CH₃) and C-3 (CH₂) both carry β-hydrogens.",
          "H from C-1: \\(\\text{CH}_2\\text{=CHCH}_2\\text{CH}_2\\text{CH}_3\\), pent-1-ene, one alkyl group on the double bond.",
          "H from C-3: \\(\\text{CH}_3\\text{CH=CHCH}_2\\text{CH}_3\\), pent-2-ene, two alkyl groups on the double bond.",
          "By Saytzeff's rule the alkene with more alkyl groups on the double bond is preferred.",
        ],
        answer: "Pent-2-ene (major) and pent-1-ene (minor)",
      },
      selfCheckExample: {
        prompt: "Write the major product when 2-bromo-2-methylbutane is heated with alcoholic KOH.",
        steps: [
          "The α-carbon carries two CH₃ groups and a CH₂CH₃ group, so there are two kinds of β-hydrogen.",
          "H from a CH₃: \\(\\text{CH}_2\\text{=C(CH}_3)\\text{CH}_2\\text{CH}_3\\), 2-methylbut-1-ene (two alkyl groups on C=C).",
          "H from the CH₂: \\((\\text{CH}_3)_2\\text{C=CHCH}_3\\), 2-methylbut-2-ene (three alkyl groups on C=C), the Saytzeff product.",
        ],
        answer: "2-Methylbut-2-ene is the major product",
      },
      practiceSet: [
        { prompt: "Chloroethane is heated with alcoholic KOH. Name the organic product.", answer: "Ethene, CH₂=CH₂" },
        { prompt: "What type of reaction converts an alkyl halide into an alkene with alcoholic KOH?", answer: "Dehydrohalogenation (β-elimination)" },
        { prompt: "Which gives only one alkene with alcoholic KOH: 1-chlorobutane or 2-chlorobutane?", answer: "1-Chlorobutane (only but-1-ene); 2-chlorobutane gives but-2-ene and but-1-ene" },
      ],
      pyqExampleId: "ebca44e6-615f-4979-a085-3091dd0118dc",
      traps: [
        {
          title: "Aqueous or alcoholic",
          body: "The same KOH gives an alcohol in water and an alkene in alcohol. Check the solvent written with the reagent; \"KOH, ethanol, heat\" means elimination.",
        },
        {
          title: "Counting hydrogens instead of alkyl groups",
          body: "Saytzeff's rule picks the alkene with more alkyl groups on the two doubly bonded carbons (the more substituted alkene). Count the groups attached to C=C, not the hydrogens removed.",
        },
        {
          title: "A β-carbon with no hydrogen",
          body: "Elimination needs a hydrogen on the β-carbon. A neighbouring quaternary carbon cannot give a double bond, so leave it out when you list the alkenes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcha-metals",
      name: "Reactions with metals: Grignard, Wurtz, Wurtz-Fittig and Fittig",
      intuition:
        "Magnesium slips in between the carbon and the halogen and makes a Grignard reagent, whose carbon is so electron-rich that even water gives it a proton. Sodium does something different: it pulls the halogens off two molecules and joins the two carbon groups together. Alkyl plus alkyl is Wurtz, aryl plus alkyl is Wurtz-Fittig, aryl plus aryl is Fittig.",
      definition:
        "- Chlorides, bromides and iodides react with some metals to give **organometallic compounds** (compounds with carbon-metal bonds).\n" +
        "- **Grignard reagent, RMgX:** made from a haloalkane and magnesium in **dry ether**. The C-Mg bond is covalent but highly polar (carbon pulls electrons from Mg); the Mg-X bond is essentially ionic.\n" +
        "- Grignard reagents react with **any source of proton** (water, alcohols, amines) to give hydrocarbons: \\(\\text{RMgX} + \\text{H}_2\\text{O} \\rightarrow \\text{RH} + \\text{Mg(OH)X}\\). So even traces of moisture must be kept out, and the reaction is done in dry ether.\n" +
        "- **Wurtz reaction:** alkyl halides with sodium in dry ether give a hydrocarbon with **double the number of carbon atoms**.\n" +
        "- **Wurtz-Fittig reaction:** an alkyl halide and an aryl halide with sodium in dry ether give an **alkylarene**.\n" +
        "- **Fittig reaction:** aryl halides alone with sodium in dry ether join two aryl groups (a biaryl).",
      formula: {
        label: "Grignard, Wurtz, Wurtz-Fittig and Fittig",
        latex: "\\begin{aligned} &\\text{R-X} + \\text{Mg} \\xrightarrow{\\text{dry ether}} \\text{R-MgX} \\\\ &2\\text{R-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{R-R} + 2\\text{NaX} \\\\ &\\text{Ar-X} + \\text{R-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{Ar-R} + 2\\text{NaX} \\\\ &2\\text{Ar-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{Ar-Ar} + 2\\text{NaX} \\end{aligned}",
        symbols: [
          { symbol: "\\(\\text{R}\\)", meaning: "an alkyl group" },
          { symbol: "\\(\\text{Ar}\\)", meaning: "an aryl group, such as C₆H₅" },
        ],
      },
      authoredExample: {
        prompt: "Bromoethane is converted into a Grignard reagent, which is then treated with water. Write both equations and name the final product.",
        steps: [
          "With magnesium in dry ether: \\(\\text{CH}_3\\text{CH}_2\\text{Br} + \\text{Mg} \\xrightarrow{\\text{dry ether}} \\text{CH}_3\\text{CH}_2\\text{MgBr}\\) (ethylmagnesium bromide).",
          "Water gives a proton to the carbon bonded to Mg: \\(\\text{CH}_3\\text{CH}_2\\text{MgBr} + \\text{H}_2\\text{O} \\rightarrow \\text{CH}_3\\text{CH}_3 + \\text{Mg(OH)Br}\\).",
        ],
        answer: "Ethylmagnesium bromide, then ethane",
      },
      selfCheckExample: {
        prompt: "Bromobenzene and bromoethane are heated together with sodium in dry ether. Name the reaction and the main product.",
        steps: [
          "One aryl halide and one alkyl halide with sodium in dry ether: the Wurtz-Fittig reaction.",
          "\\(\\text{C}_6\\text{H}_5\\text{Br} + \\text{C}_2\\text{H}_5\\text{Br} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{C}_6\\text{H}_5\\text{C}_2\\text{H}_5 + 2\\text{NaBr}\\)",
        ],
        answer: "Wurtz-Fittig reaction; ethylbenzene",
      },
      practiceSet: [
        { prompt: "What forms when bromobenzene alone is heated with sodium in dry ether? Name the reaction.", answer: "Biphenyl, C₆H₅-C₆H₅; Fittig reaction" },
        { prompt: "Why must a Grignard reagent be prepared under anhydrous conditions?", answer: "It reacts with any source of proton, even water, and is turned into a hydrocarbon" },
        { prompt: "Which hydrocarbon forms when CH₃MgI reacts with water?", answer: "Methane, CH₄" },
      ],
      pyqExampleId: "fbae1632-3787-4938-9216-caeef7f8b1dd",
      traps: [
        {
          title: "Grignard reagent and water give an alcohol",
          body: "Water does not add -OH to the alkyl group. It gives a proton to the carbon, so RMgX with water gives the alkane RH.",
        },
        {
          title: "Working a Wurtz product backwards",
          body: "A Wurtz product is two identical alkyl groups joined at the carbons that held the halogen. Cut the product into two equal halves; each half is the alkyl group of the halide.",
        },
        {
          title: "Mixing up the three sodium reactions",
          body: "Alkyl + alkyl is Wurtz; aryl + alkyl is Wurtz-Fittig; aryl + aryl is Fittig. All three use sodium in dry ether.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-arene-reactions",
      name: "Reactions of haloarenes: why nucleophiles fail, nitro groups, electrophilic substitution",
      intuition:
        "A halogen on a benzene ring is held by a short, strong bond and sits on an electron-rich ring, so nucleophiles hardly touch it: chlorobenzene needs 623 K and 300 atmospheres to become phenol. Put nitro groups at the ortho and para positions and the ring can hold the extra negative charge, so the swap gets much easier. Electrophiles still attack the ring, slowly, at the ortho and para positions.",
      definition:
        "- Haloarenes are **extremely less reactive** towards nucleophilic substitution because of:\n" +
        "- (i) **Resonance:** the halogen's lone pairs are in conjugation with the ring, so the C-X bond has partial double bond character and is hard to break.\n" +
        "- (ii) **Hybridisation:** the carbon is sp², more electronegative, holding the bond pair tightly; C-Cl is 169 pm against 177 pm in a haloalkane.\n" +
        "- (iii) **Unstable phenyl cation:** it is not stabilised by resonance, so the SN1 route is ruled out.\n" +
        "- (iv) **Repulsion:** the electron-rich nucleophile is unlikely to approach the electron-rich ring.\n" +
        "- **Nitro groups at ortho and para positions** withdraw electron density and stabilise, by resonance, the negative charge of the carbanion formed when the nucleophile attacks. A nitro group at the **meta** position has no effect, because no resonance structure puts the negative charge on the carbon bearing it.\n" +
        "- **Electrophilic substitution** (halogenation, nitration, sulphonation, Friedel-Crafts): the halogen is slightly deactivating through its **-I effect**, so these reactions are slower than for benzene; but resonance raises the electron density more at the **ortho and para** positions, so the halogen is **o, p-directing**. Reactivity is controlled by the stronger inductive effect, orientation by resonance.",
      table: {
        columns: ["Reaction", "Reagent and condition", "Main products"],
        rows: [
          { cells: ["Hydrolysis of chlorobenzene", "Aqueous NaOH, 623 K, 300 atm, then H⁺", "Phenol"] },
          {
            cells: ["Hydrolysis with nitro groups at o and p positions", "One para NO₂: NaOH at 443 K. Two (2,4): 368 K. Three (2,4,6): warm water", "Nitrophenols; easier with each extra o or p nitro group"],
            pyqExampleId: "a00b58fa-a38e-4f37-a513-64996ed82d15",
            noteAmber: "Board 2026 asked the order of ease for four chloronitrobenzenes; 2023 to 2025 asked the hydrolysis product or the reason.",
          },
          { cells: ["Halogenation", "Cl₂, anhydrous FeCl₃", "1,2- and 1,4-dichlorobenzene"] },
          { cells: ["Nitration", "Conc. HNO₃ and conc. H₂SO₄", "1-Chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene"] },
          { cells: ["Sulphonation", "Conc. H₂SO₄", "2- and 4-chlorobenzenesulphonic acid"] },
          { cells: ["Friedel-Crafts alkylation", "CH₃Cl, anhydrous AlCl₃", "1-Chloro-2-methylbenzene and 1-chloro-4-methylbenzene"] },
          { cells: ["Friedel-Crafts acylation", "CH₃COCl, anhydrous AlCl₃", "2- and 4-chloroacetophenone"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why does a nitro group at the meta position not make chlorobenzene more reactive towards OH⁻?",
        steps: [
          "When OH⁻ attacks, a carbanion forms; its negative charge appears at the ortho and para positions with respect to the halogen.",
          "A nitro group at an ortho or para position can take this charge by resonance and stabilise it.",
          "From the meta position none of the resonance structures puts the negative charge on the carbon carrying the NO₂ group, so it gives no such help.",
        ],
        answer: "A meta nitro group cannot stabilise the negative charge of the intermediate by resonance",
      },
      practiceSet: [
        { prompt: "Under what conditions is chlorobenzene converted into phenol?", answer: "Heating with aqueous NaOH at 623 K and 300 atmospheres, then acidifying" },
        { prompt: "Why is the SN1 route ruled out for haloarenes?", answer: "The phenyl cation that would form is not stabilised by resonance" },
        { prompt: "Name the main products of chlorobenzene with conc. HNO₃ and conc. H₂SO₄.", answer: "1-Chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene" },
      ],
      pyqExampleId: "2e50231b-e9cb-4a8e-ba03-3e138fa5598b",
      traps: [
        {
          title: "Using one reason for both kinds of substitution",
          body: "Partial double bond character explains why NUCLEOPHILIC substitution is hard. The -I effect of chlorine explains why ELECTROPHILIC substitution is slow. A 2023 assertion-reason item joined the two: both statements true, but the Reason does not explain the Assertion (code B).",
        },
        {
          title: "Two reasons that are really one",
          body: "\"Resonance\" and \"partial double bond character\" are the same reason. For two marks give two different ones, such as resonance and sp² hybridisation.",
        },
        {
          title: "Deactivating, so meta-directing",
          body: "Chlorine is deactivating yet ortho, para directing. Say both halves: the -I effect lowers the rate, resonance (+R) decides the position.",
        },
      ],
    },
  ],
};
