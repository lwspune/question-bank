import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_HC_ALKANES_NOTE: SubtopicNote = {
  subtopicName: "Alkanes",
  title: "Alkanes",
  oneLineDefinition:
    "How to name a branched alkane, the routes that make alkanes and what each does to the carbon count, why branching lowers the boiling point, the few reactions alkanes do give, and the conformations of ethane.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026. One names a branched alkane (NEET 2026). Three are about making alkanes: the missing reagent in soda lime decarboxylation (2021), the mass of methane from sodium ethanoate (2023) and a sequence that ends in a Wurtz-Fittig reaction (2023). Three are about properties and reactions: the boiling points of the three pentanes (NEET 2024), oxidising a tertiary C-H with KMnO₄ (Re-NEET 2024) and methane with steam (NEET 2026). One asks the dihedral angle of the least stable form of ethane (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchhc-naming",
      name: "Naming a branched alkane",
      intuition:
        "An IUPAC name is built in three moves. Find the longest carbon chain: it gives the parent name. Number it from the end that gives the branches the lowest numbers. Then write the branches in alphabetical order, each with its number. The longest chain is often bent on paper, so trace it through the branches before you count.",
      definition:
        "- **Parent chain**: the longest continuous chain of carbon atoms, wherever it bends.\n" +
        "- **Numbering**: start from the end that gives the substituents the lowest set of numbers (compare them at the first point of difference).\n" +
        "- **Order**: substituents are written in **alphabetical order** (ethyl before methyl). The prefixes di, tri and tetra are ignored when ordering.\n" +
        "- Only when both ends give the same set of numbers does the alphabet decide: the group named first gets the lower number.\n" +
        "- Repeated groups take di, tri, tetra with a number for each: 2,2-dimethyl, never 2-dimethyl.",
      authoredExample: {
        prompt: "Write the IUPAC name of \\(\\text{(CH}_3\\text{)}_2\\text{CH-CH}_2\\text{-CH(CH}_2\\text{CH}_3\\text{)-CH}_2\\text{CH}_3\\).",
        steps: [
          "The longest chain has 6 carbons (the ethyl branch is only as long as the end it competes with), so the parent is hexane.",
          "From the left, the branches sit on C2 (methyl) and C4 (ethyl): the set is 2, 4.",
          "From the right, they sit on C3 (ethyl) and C5 (methyl): the set is 3, 5.",
          "2 is lower than 3 at the first point of difference, so number from the left. Write ethyl before methyl.",
        ],
        answer: "4-Ethyl-2-methylhexane",
      },
      selfCheckExample: {
        prompt: "Write the IUPAC name of \\(\\text{(CH}_3\\text{)}_3\\text{C-CH}_2\\text{-CH}_3\\).",
        steps: [
          "The longest chain has 4 carbons: butane.",
          "Numbering from the left puts both methyl groups on C2. From the right they would be on C3.",
          "Two methyl groups on the same carbon: 2,2-dimethyl.",
        ],
        answer: "2,2-Dimethylbutane",
      },
      practiceSet: [
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{CH}_2\\text{CH(CH}_3\\text{)CH}_2\\text{CH}_3\\).", answer: "3-Methylpentane" },
        { prompt: "Write the IUPAC name of \\(\\text{CH}_3\\text{-CH(CH}_3\\text{)-CH(CH}_3\\text{)-CH}_3\\).", answer: "2,3-Dimethylbutane" },
        { prompt: "How many carbon atoms are there in the parent chain of 3-ethyl-2-methylpentane, and how many in the whole molecule?", answer: "5 in the parent chain, 8 in the molecule" },
        { prompt: "Why is 1-methylbutane not a correct IUPAC name?", answer: "A methyl on C1 lengthens the chain: the compound is pentane" },
      ],
      pyqExampleId: "46a7be9c-9785-4c48-a9a7-a7edc1b6e4b3",
      traps: [
        {
          title: "The longest chain may run through a branch",
          body: "Count every path from one end carbon to another. A chain drawn straight across the page is not always the longest one.",
        },
        {
          title: "Lowest numbers first, alphabet second",
          body: "Number the chain to give the lowest set of numbers. Only when both ends give the same set does the group that comes first in the alphabet get the lower number.",
        },
        {
          title: "Di and tri do not count in the alphabet",
          body: "In ordering, dimethyl is filed under m, so 3-ethyl-2,2-dimethylpentane writes ethyl first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchhc-alkane-prep",
      name: "Preparing alkanes",
      intuition:
        "Each route to an alkane does one of three things to the carbon chain. Adding hydrogen to an alkene or alkyne, or reducing an alkyl halide, keeps the chain the same length. The Wurtz reaction and Kolbe's electrolysis join two alkyl groups, so they double it. Heating the sodium salt of an acid with soda lime removes the COO part, so the alkane has one carbon fewer than the salt. Ask how many carbons the product needs before you pick a route.",
      definition:
        "- **Hydrogenation**: \\(\\text{H}_2\\) adds to an alkene or alkyne with finely divided Pt or Pd at room temperature, or Ni at higher temperature and pressure.\n" +
        "- **Reduction of alkyl halides** (not fluorides): zinc and dilute HCl give the alkane with the same carbons.\n" +
        "- **Wurtz reaction**: \\(2\\text{R-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{R-R} + 2\\text{NaX}\\). The alkane has twice the carbons of the halide.\n" +
        "- **Decarboxylation**: \\(\\text{RCOONa} + \\text{NaOH} \\xrightarrow[\\text{heat}]{\\text{CaO}} \\text{R-H} + \\text{Na}_2\\text{CO}_3\\). The mixture of NaOH and CaO is **soda lime**. One carbon fewer.\n" +
        "- **Kolbe's electrolysis**: an aqueous solution of the sodium or potassium salt of an acid is electrolysed; the alkane forms at the anode with twice the alkyl group, along with \\(\\text{CO}_2\\).\n" +
        "- **Wurtz-Fittig reaction** (NCERT Class 12): an alkyl halide and an aryl halide with sodium in dry ether give an alkylbenzene.",
      table: {
        columns: ["Route", "Reagent", "Carbon count", "Example"],
        rows: [
          { cells: ["Hydrogenation", "\\(\\text{H}_2\\) with Pt, Pd or Ni", "Same as the alkene", "Propene gives propane"] },
          { cells: ["Reduction of an alkyl halide", "Zn and dilute HCl", "Same as the halide", "\\(\\text{CH}_3\\text{Cl}\\) gives methane"] },
          { cells: ["Wurtz reaction", "Na in dry ether", "Twice the alkyl group", "\\(\\text{CH}_3\\text{Br}\\) gives ethane"] },
          { cells: ["Decarboxylation", "Soda lime (NaOH and CaO), heat", "One fewer than the salt", "Sodium propanoate gives ethane"], noteAmber: "NEET 2021: CaO was the missing reagent. NEET 2023: two moles of methane from sodium ethanoate weigh 32 g." },
          { cells: ["Kolbe's electrolysis", "Electrolysis of the aqueous sodium salt", "Twice the alkyl group", "Sodium ethanoate gives ethane"] },
          { cells: ["Wurtz-Fittig reaction", "Alkyl halide, aryl halide, Na in dry ether", "Alkyl group joined to the ring", "Bromoethane and bromobenzene give ethylbenzene"], noteAmber: "NEET 2023: the last step of a four-step sequence from ethanal." },
        ],
        caption: "Wurtz and Kolbe join two alkyl groups, so neither can make methane. Decarboxylation of sodium ethanoate can.",
      },
      pyqExampleId: "840a494b-7c66-411f-b653-97c887ba0d21",
      selfCheckExample: {
        prompt: "Which alkane forms at the anode when an aqueous solution of sodium propanoate is electrolysed?",
        steps: [
          "Kolbe's electrolysis joins two alkyl groups after each acid ion loses \\(\\text{CO}_2\\).",
          "The alkyl group of propanoate, \\(\\text{CH}_3\\text{CH}_2\\text{COO}^-\\), is ethyl.",
          "Two ethyl groups joined: \\(\\text{CH}_3\\text{CH}_2\\text{-CH}_2\\text{CH}_3\\).",
        ],
        answer: "Butane",
      },
      practiceSet: [
        { prompt: "Which alkane forms when bromoethane is treated with sodium in dry ether?", answer: "Butane" },
        { prompt: "Why can the Wurtz reaction not give methane?", answer: "It joins two alkyl groups, so the product has at least two carbons" },
        { prompt: "Which metal catalyst adds hydrogen to an alkene at room temperature: Ni, or Pt and Pd?", answer: "Pt and Pd (Ni needs higher temperature and pressure)" },
        { prompt: "What does a mixture of bromomethane and bromobenzene give with sodium in dry ether?", answer: "Toluene (methylbenzene), by the Wurtz-Fittig reaction" },
      ],
      traps: [
        {
          title: "Kolbe's electrolysis of sodium ethanoate gives ethane, not methane",
          body: "Two methyl groups join at the anode. Methane from sodium ethanoate needs soda lime.",
        },
        {
          title: "Soda lime removes a carbon",
          body: "Sodium propanoate (3 carbons) gives ethane (2 carbons) with soda lime, because the carbon of the COONa group leaves as \\(\\text{Na}_2\\text{CO}_3\\).",
        },
        {
          title: "Alkyl fluorides are not reduced",
          body: "Zinc and dilute HCl reduce alkyl chlorides, bromides and iodides to alkanes, but not fluorides.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchhc-alkane-reactions",
      name: "Boiling points and reactions of alkanes",
      intuition:
        "Alkanes are non-polar, so only weak forces hold their molecules together. A long straight chain touches its neighbours over a large area; a branched molecule is rounder, touches less, and boils lower. Alkanes are also unreactive: each reaction they give needs light, heat, a catalyst or a strong oxidant, and each is worth learning as a pair of reagent and product.",
      definition:
        "- **Boiling point** rises with molar mass. Among isomers, more branching means a more spherical molecule, less surface contact, weaker forces and a **lower** boiling point: pentane 309.1 K, 2-methylbutane 301 K, 2,2-dimethylpropane 282.5 K.\n" +
        "- **Halogenation** is a free radical substitution, started by light or heat. Hydrogens are replaced in the order 3° > 2° > 1°. Fluorine reacts too violently; iodination is slow and reversible.\n" +
        "- **Controlled oxidation**: an alkane with a **tertiary H** is oxidised by \\(\\text{KMnO}_4\\) to an alcohol. Other alkanes resist it.\n" +
        "- **Steam with methane**: over nickel at 1273 K, methane and steam give carbon monoxide and hydrogen.\n" +
        "- **Isomerisation**: n-alkanes heated with anhydrous \\(\\text{AlCl}_3\\) and HCl give branched isomers.\n" +
        "- **Aromatisation**: n-hexane over oxides of vanadium, molybdenum or chromium on alumina, at 773 K and 10 to 20 atm, gives benzene.",
      table: {
        columns: ["Reaction", "Conditions", "Product"],
        rows: [
          { cells: ["Isobutane, oxidation of the tertiary C-H", "\\(\\text{KMnO}_4\\)", "2-Methylpropan-2-ol, \\(\\text{(CH}_3\\text{)}_3\\text{COH}\\)"] },
          { cells: ["\\(2\\text{CH}_4 + \\text{O}_2\\)", "Cu, 523 K, 100 atm", "Methanol"] },
          { cells: ["\\(\\text{CH}_4 + \\text{O}_2\\)", "\\(\\text{Mo}_2\\text{O}_3\\), heat", "Methanal (HCHO) and water"] },
          { cells: ["\\(\\text{CH}_4 + \\text{H}_2\\text{O}\\)", "Ni, 1273 K", "\\(\\text{CO} + 3\\text{H}_2\\)"], noteAmber: "NEET 2026: methane and steam over nickel give CO and H₂." },
          { cells: ["\\(\\text{CH}_4 + \\text{Cl}_2\\)", "Light (hν)", "\\(\\text{CH}_3\\text{Cl}\\) and HCl, then more substituted products"] },
          { cells: ["n-Hexane, aromatisation", "Oxides of V, Mo or Cr on alumina, 773 K, 10 to 20 atm", "Benzene"] },
          { cells: ["Pentane isomers, boiling points", "Branching", "Pentane 309.1 K > 2-methylbutane 301 K > 2,2-dimethylpropane 282.5 K"], noteAmber: "NEET 2024: both statements, the order and the reason (spherical shape, less contact), were correct." },
        ],
      },
      pyqExampleId: "6a16fd60-efe1-4071-b748-cdf41d751831",
      selfCheckExample: {
        prompt: "Arrange hexane, 2-methylpentane and 2,2-dimethylbutane in order of decreasing boiling point.",
        steps: [
          "All three are \\(\\text{C}_6\\text{H}_{14}\\), so their molar masses are equal.",
          "Hexane is unbranched, 2-methylpentane has one branch, 2,2-dimethylbutane two on one carbon: the last is the most spherical.",
          "Less surface contact means weaker forces and a lower boiling point.",
        ],
        answer: "Hexane > 2-methylpentane > 2,2-dimethylbutane",
      },
      practiceSet: [
        { prompt: "In free radical chlorination of an alkane, which hydrogens are replaced most easily: primary, secondary or tertiary?", answer: "Tertiary (the order is 3° > 2° > 1°)" },
        { prompt: "Which halogen reacts with alkanes so violently that the reaction cannot be controlled?", answer: "Fluorine" },
        { prompt: "What does n-hexane give over chromium oxide on alumina at 773 K and 10 to 20 atm?", answer: "Benzene" },
        { prompt: "What does methane give with oxygen over \\(\\text{Mo}_2\\text{O}_3\\) on heating?", answer: "Methanal (formaldehyde) and water" },
      ],
      traps: [
        {
          title: "Only a tertiary H is oxidised by KMnO₄",
          body: "Isobutane, with one H on a carbon bonded to three others, gives 2-methylpropan-2-ol. Methane, ethane and propane have no tertiary H and resist \\(\\text{KMnO}_4\\).",
        },
        {
          title: "Branching lowers the boiling point",
          body: "Of isomers, the most branched boils lowest: 2,2-dimethylpropane boils at 282.5 K, pentane at 309.1 K.",
        },
        {
          title: "Steam gives CO, not CO₂",
          body: "Methane and steam over nickel at 1273 K give \\(\\text{CO} + 3\\text{H}_2\\). Carbon dioxide is not the product of this reaction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchhc-conformations",
      name: "Conformations of ethane",
      intuition:
        "The two carbons of ethane can turn about their single bond. Look straight down that bond. If the hydrogens of the back carbon sit exactly behind those of the front one, their bond pairs crowd each other: the eclipsed form. If they sit in the gaps, they are as far apart as they can be: the staggered form. The crowding is called torsional strain, so staggered is the most stable form and eclipsed the least.",
      definition:
        "- **Conformations** are the shapes a molecule takes by rotation about a C-C single bond. There are infinitely many between the two extremes.\n" +
        "- The **dihedral (torsional) angle** is the angle between a C-H bond on the front carbon and the nearest C-H bond on the back carbon.\n" +
        "- **Eclipsed**: dihedral angle 0°, maximum torsional strain, least stable. **Staggered**: dihedral angle 60°, minimum torsional strain, most stable.\n" +
        "- The energy difference is only about 12.5 kJ mol⁻¹, so the forms change into one another at room temperature and **cannot be separated**.\n" +
        "- Drawn as a **Sawhorse projection** (the C-C bond as a long slanting line) or a **Newman projection** (looking along the C-C bond: the front carbon a point, the back carbon a circle).",
      authoredExample: {
        prompt: "In the staggered form of ethane, the back carbon is turned by 60°, and then by a further 60°. Name the form after each turn and give its dihedral angle.",
        steps: [
          "Staggered: each back C-H sits 60° from the nearest front C-H.",
          "Turning by 60° brings each back C-H directly behind a front C-H: eclipsed, dihedral angle 0°.",
          "A further 60° moves them back into the gaps: staggered again, dihedral angle 60°.",
        ],
        answer: "First eclipsed (0°), then staggered again (60°)",
      },
      selfCheckExample: {
        prompt: "How much more energy does eclipsed ethane have than staggered ethane, and can the two forms be separated at room temperature?",
        steps: [
          "The difference is about 12.5 kJ mol⁻¹.",
          "That is small, so rotation is fast at room temperature and the forms keep changing into each other.",
        ],
        answer: "About 12.5 kJ mol⁻¹; no, they cannot be separated",
      },
      practiceSet: [
        { prompt: "In which projection is the front carbon of ethane shown as a point and the back carbon as a circle?", answer: "The Newman projection" },
        { prompt: "Which conformation of ethane has the least torsional strain?", answer: "Staggered" },
        { prompt: "What is the name for the repulsion between the bond pairs of C-H bonds on the two carbons of ethane?", answer: "Torsional strain" },
        { prompt: "In which projection of ethane is the C-C bond drawn as a long slanting line?", answer: "The Sawhorse projection" },
      ],
      pyqExampleId: "ec3426fa-cd65-49db-a703-4bd16bb20e6d",
      traps: [
        {
          title: "Eclipsed is 0°, not 180°",
          body: "The dihedral angle of eclipsed ethane is 0°, because each back C-H lies right behind a front C-H. Staggered ethane is 60°.",
        },
        {
          title: "Conformations are not isomers you can isolate",
          body: "Only 12.5 kJ mol⁻¹ separates eclipsed and staggered ethane, so they change into each other at room temperature and cannot be separated.",
        },
      ],
    },
  ],
};
