import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 9 Carbon Compounds. Statements
 * checked against the Balbharati text; equations rebuilt and balanced by hand
 * (the book's acetic acid and sodium carbonate equation is missing a 2);
 * most-asked years from the board past papers in the bank, 2019-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Carbon Compounds",
  chapterSlug: "carbon-compounds",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 9",
  keyPoints: [
    {
      term: "Covalent bond",
      text: "The chemical bond formed by sharing of two valence electrons between two atoms. One shared pair is one covalent bond. Shown by an electron-dot structure or a line.",
    },
    {
      term: "Catenation and tetravalency",
      text: "Carbon forms strong covalent bonds with other carbon atoms: **catenation**, giving chains and rings. Carbon is **tetravalent**: it forms four bonds. It can form single, double and triple bonds.",
    },
    {
      term: "Hydrocarbons",
      text: "Compounds containing carbon and hydrogen as the only two elements. **Saturated**: all single bonds (ethane). **Unsaturated**: a double or triple bond between carbon atoms (ethene, ethyne).",
    },
    {
      term: "Alkanes, alkenes, alkynes",
      text: "Alkanes \\(C_nH_{2n+2}\\), single bonds (methane, ethane). Alkenes \\(C_nH_{2n}\\), a C=C double bond (ethene). Alkynes \\(C_nH_{2n-2}\\), a C≡C triple bond (ethyne).",
    },
    {
      term: "Benzene",
      text: "\\(C_6H_6\\): a cyclic unsaturated hydrocarbon, a six-membered ring with three alternate double bonds. Compounds with this unit are **aromatic** compounds.",
    },
    {
      term: "Functional group",
      text: "A hetero atom, or group of atoms containing one, that gives a compound its specific chemical properties. Alcohol -OH, aldehyde -CHO, ketone -CO-, carboxylic acid -COOH, halogen -X.",
    },
    {
      term: "Homologous series",
      text: "Compounds with the same functional group and a similar chain. Each next member has one more -CH₂- unit, so molecular mass rises by 14 u. Similar chemical properties; gradation in physical properties.",
    },
    {
      term: "Combustion",
      text: "Carbon compounds burn in air to give carbon dioxide and water with heat and light. Propane (\\(C_3H_8\\)) is a combustible component of LPG; natural gas is mainly methane.",
    },
    {
      term: "Addition reaction and hydrogenation",
      text: "An unsaturated compound adds atoms to become saturated. Bromine or iodine colour vanishes with oils: a test for a double bond. Vegetable oil + hydrogen, nickel catalyst, gives **Vanaspati ghee**.",
    },
    {
      term: "Substitution reaction",
      text: "One atom or group in a reactant is replaced by another. Methane with chlorine in sunlight: chlorine atoms replace hydrogen atoms one by one.",
    },
    {
      term: "Ethanol",
      text: "A colourless liquid, boils at 78 °C, neutral, mixes with water. A clean fuel: added to petrol to raise its efficiency (**gasohol**). Ethanol mixed with poisonous methanol is denatured spirit.",
    },
    {
      term: "Ethanoic (acetic) acid",
      text: "\\(CH_3COOH\\), turns blue litmus red. **Vinegar** is a 5-8% solution, used as a preservative in pickles. Pure acid freezes at 17 °C (glacial acetic acid). With a carbonate it gives \\(CO_2\\).",
    },
    {
      term: "Esterification and saponification",
      text: "Acid + alcohol, with an acid catalyst, give a sweet-smelling ester. An ester with sodium hydroxide gives back the alcohol and the sodium salt of the acid: saponification, used to make soap.",
    },
    {
      term: "Polymers",
      text: "A macromolecule formed by regular repetition of a small unit, the **monomer**. Ethylene gives polyethylene. Natural: starch and cellulose (glucose), proteins (amino acids), DNA and RNA (nucleotides), rubber (isoprene).",
    },
  ],
  formulas: [
    { label: "General formulas", latex: "\\text{alkane } C_nH_{2n+2} \\qquad \\text{alkene } C_nH_{2n} \\qquad \\text{alkyne } C_nH_{2n-2}" },
    { label: "Combustion", latex: "\\ce{CH4 + 2O2 -> CO2 + 2H2O} \\qquad \\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}" },
    { label: "Combustion of ethanol", latex: "\\ce{CH3CH2OH + 3O2 -> 2CO2 + 3H2O}" },
    { label: "Oxidation of ethanol (alkaline KMnO4)", latex: "\\ce{CH3CH2OH + 2[O] -> CH3COOH + H2O}" },
    { label: "Hydrogenation (addition)", latex: "\\ce{CH2=CH2 + H2 ->[Ni] CH3-CH3}" },
    { label: "Substitution (chlorination of methane)", latex: "\\ce{CH4 + Cl2 ->[sunlight] CH3Cl + HCl}" },
    { label: "Ethanol with sodium", latex: "\\ce{2CH3CH2OH + 2Na -> 2CH3CH2ONa + H2 ^}" },
    { label: "Dehydration of ethanol", latex: "\\ce{CH3CH2OH ->[conc. H2SO4][170 ^\\circ C] CH2=CH2 + H2O}" },
    { label: "Acetic acid with sodium carbonate", latex: "\\ce{2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2 ^}" },
    { label: "Acetic acid with sodium bicarbonate", latex: "\\ce{CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2 ^}" },
    { label: "Esterification", latex: "\\ce{CH3COOH + CH3CH2OH ->[H+] CH3COOCH2CH3 + H2O}" },
    { label: "Polymerisation of ethylene", latex: "n\\,\\ce{CH2=CH2 -> (-CH2-CH2-)_{n}}" },
  ],
  derivations: [
    {
      title: "Draw an electron-dot structure (chlorine, methane, ethane)",
      steps: [
        "Write the electronic configuration: Cl (17) is 2, 8, 7, so 7 valence electrons; C is 2, 4; H is 1.",
        "Each atom shares electrons to complete its octet (duplet for H). Show each shared pair between the two symbols.",
        "\\(\\ce{Cl2}\\): one shared pair, a single covalent bond. \\(\\ce{CH4}\\): four C-H pairs. \\(\\ce{C2H6}\\): one C-C pair and six C-H pairs.",
      ],
    },
    {
      title: "Give the IUPAC name of a straight chain compound",
      steps: [
        "Step 1: count the carbon atoms in the chain and take the parent alkane name (3 carbons: propane).",
        "Step 2: for a functional group, replace the last 'e' of the parent by its suffix: -ol, -al, -one, -oic acid.",
        "Step 3: number the chain from the end nearer the functional group and write its position: \\(CH_3-CH(OH)-CH_3\\) is propan-2-ol.",
        "Examples: ethylene is ethene, acetylene is ethyne, acetic acid is ethanoic acid, methyl alcohol is methanol, acetone is propan-2-one.",
      ],
    },
    {
      title: "Reaction of acetic acid with sodium carbonate (experiment)",
      steps: [
        "Put sodium carbonate in a big test tube and add acetic acid: effervescence of carbon dioxide.",
        "Pass the gas through a delivery tube into freshly prepared lime water: it turns milky.",
        "Sodium bicarbonate can be used instead of sodium carbonate to get the same products.",
      ],
    },
  ],
  diagrams: [
    { title: "Electron-dot and line structure of methane", labels: ["carbon in the centre", "four shared electron pairs", "four H atoms", "line structure with four C-H bonds"] },
    { title: "Electron-dot structure of ethane", labels: ["two C atoms sharing one pair", "six C-H shared pairs", "all single bonds"] },
    { title: "Reaction of acetic acid and sodium carbonate", labels: ["big test tube with acetic acid and sodium carbonate", "cork and gas delivery tube", "small test tube with freshly prepared lime water", "stand"] },
  ],
  mostAsked: [
    { topic: "Hydrocarbons: saturated or unsaturated, alkane, alkene, alkyne, benzene, classification chart, LPG", marks: 1, years: [2026, 2024, 2023, 2022, 2020, 2019] },
    { topic: "Electron-dot structures: methane, ethane, ethene, chlorine", years: [2025, 2024, 2022] },
    { topic: "Homologous series: define it, names and formulas of the first members (alkanes, alcohols)", years: [2025, 2022, 2020, 2019] },
    { topic: "Ethanoic acid: functional group -COOH, formula, vinegar, reaction with sodium carbonate", marks: 1, years: [2026, 2024] },
    { topic: "Common names and IUPAC names of compounds", years: [2023, 2022, 2019] },
    { topic: "Uses of reactions: hydrogenation gives Vanaspati ghee, ethanol as an additive to petrol", marks: 2, years: [2026, 2025] },
    { topic: "Natural polymers: monomers and where they occur", marks: 3, years: [2026] },
  ],
  mistakes: [
    {
      title: "Wrong general formula",
      body: "Alkane \\(C_nH_{2n+2}\\), alkene \\(C_nH_{2n}\\), alkyne \\(C_nH_{2n-2}\\). Check with n = 2: ethane \\(C_2H_6\\), ethene \\(C_2H_4\\), ethyne \\(C_2H_2\\).",
    },
    {
      title: "Too few or too many bonds on carbon",
      body: "Every carbon in a structure must have exactly four bonds; every hydrogen exactly one. Count them in each structural formula.",
    },
    {
      title: "Electron-dot structure for a double bond",
      body: "In ethene the two carbon atoms share **two** pairs. Show both pairs between the C atoms, not one.",
    },
    {
      title: "Unbalanced acid-carbonate equation",
      body: "Two molecules of acetic acid react with one of sodium carbonate and give **two** of sodium acetate: \\(\\ce{2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2}\\).",
    },
    {
      title: "Mixing common and IUPAC names",
      body: "Acetic acid is the common name, ethanoic acid the IUPAC name. Methyl alcohol is methanol; ethylene is ethene; acetylene is ethyne.",
    },
  ],
};

export default sheet;
