import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 4 Carbon and its Compounds. Statements checked
 * against the NCERT text (definitions in the book's own words); every equation
 * rebuilt and its atoms counted. Most-asked years and marks from all 132 CBSE
 * board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Carbon and its Compounds",
  chapterSlug: "carbon-and-its-compounds",
  source: "NCERT Science (CBSE Class 10), Chapter 4",
  keyPoints: [
    {
      term: "Why carbon forms covalent bonds",
      text: "Carbon has 4 valence electrons (2,4). Gaining four to form \\(\\ce{C^4-}\\) is hard: six protons cannot hold ten electrons. Losing four to form \\(\\ce{C^4+}\\) needs too much energy. So carbon **shares** its valence electrons.",
    },
    {
      term: "Covalent bond",
      text: "A bond formed by the sharing of an electron pair between two atoms. Single bond: one shared pair (\\(\\ce{H2}\\), \\(\\ce{Cl2}\\), \\(\\ce{CH4}\\)). Double bond: two pairs (\\(\\ce{O2}\\)). Triple bond: three pairs (\\(\\ce{N2}\\), ethyne).",
    },
    {
      term: "Properties of covalent compounds",
      text: "Weak forces between molecules, so low melting and boiling points. No charged particles are formed, so they are generally poor conductors of electricity.",
    },
    {
      term: "Allotropes of carbon",
      text: "Diamond: each carbon bonded to four others in a rigid 3-D structure; the hardest substance, does not conduct. Graphite: each carbon bonded to three others in hexagonal layers; smooth, slippery, a good conductor. Fullerene \\(\\ce{C60}\\) is shaped like a football.",
    },
    {
      term: "Catenation and tetravalency",
      text: "Catenation: carbon's unique ability to bond with other carbon atoms, giving long chains, branches and rings. The C-C bond is very strong and stable. Tetravalency: four bonds with carbon or other atoms (H, O, N, S, Cl). Together they give a very large number of compounds.",
    },
    {
      term: "Saturated and unsaturated compounds",
      text: "Saturated: only single bonds between carbon atoms (alkanes, \\(C_nH_{2n+2}\\)). Unsaturated: double bonds (alkenes, \\(C_nH_{2n}\\)) or triple bonds (alkynes, \\(C_nH_{2n-2}\\)). Cyclohexane is a saturated ring; benzene \\(\\ce{C6H6}\\) is a ring with 3 double bonds.",
    },
    {
      term: "Structural isomers",
      text: "Compounds with identical molecular formula but different structures. Butane \\(\\ce{C4H10}\\): a straight chain (n-butane) and a branched chain (isobutane). Propanal and propanone (\\(\\ce{C3H6O}\\)) are also isomers. Methane, ethane and propane have no isomers.",
    },
    {
      term: "Functional groups",
      text: "An atom or group that replaces hydrogen (a heteroatom) and gives the compound its properties: halo -Cl, -Br (chloro-, bromo-); alcohol -OH (-ol); aldehyde -CHO (-al); ketone >C=O (-one); carboxylic acid -COOH (-oic acid).",
    },
    {
      term: "Homologous series",
      text: "A series of compounds in which the same functional group substitutes for hydrogen in a carbon chain. Successive members differ by a \\(\\ce{-CH2-}\\) unit (14 u). Chemical properties are alike; melting and boiling points rise with molecular mass.",
    },
    {
      term: "Combustion",
      text: "Carbon compounds burn in oxygen to give carbon dioxide, water, heat and light. Saturated hydrocarbons give a clean blue flame; unsaturated ones a yellow, sooty flame. Too little air makes even a saturated fuel burn sooty.",
    },
    {
      term: "Oxidation",
      text: "Alcohols are oxidised to carboxylic acids by **oxidising agents**: alkaline potassium permanganate or acidified potassium dichromate. Ethanol becomes ethanoic acid. The purple colour of \\(\\ce{KMnO4}\\) disappears while it is used up, and stays once ethanol runs out.",
    },
    {
      term: "Addition and substitution",
      text: "**Addition:** unsaturated hydrocarbons add hydrogen with a nickel or palladium catalyst; used to hydrogenate vegetable oils. Oils with unsaturated chains are healthier; animal fats are saturated. **Substitution:** in sunlight chlorine replaces hydrogen atoms of methane one by one.",
    },
    {
      term: "Ethanol and ethanoic acid",
      text: "Ethanol: a good solvent; with sodium gives hydrogen and sodium ethoxide; with hot conc. \\(\\ce{H2SO4}\\) at 443 K it loses water to give ethene. Ethanoic acid: a weak acid; 5 to 8 % solution is vinegar; pure acid freezes in winter (glacial acetic acid). With ethanol and an acid catalyst it gives a sweet-smelling ester.",
    },
    {
      term: "Soaps, detergents and micelles",
      text: "Soaps are sodium or potassium salts of long chain carboxylic acids: an ionic, hydrophilic end and a long hydrophobic tail. In water they form **micelles** with the oily dirt in the centre, which is rinsed away. In hard water soap forms scum with calcium and magnesium salts; detergents do not, so they work in hard water.",
    },
  ],
  formulas: [
    { label: "General formulas", latex: "\\text{alkane } C_nH_{2n+2} \\qquad \\text{alkene } C_nH_{2n} \\qquad \\text{alkyne } C_nH_{2n-2}" },
    { label: "Combustion of methane", latex: "\\ce{CH4 + 2O2 -> CO2 + 2H2O} + \\text{heat and light}" },
    { label: "Oxidation of ethanol", latex: "\\ce{CH3CH2OH + 2[O] ->[\\text{alkaline KMnO4 + heat}] CH3COOH + H2O}" },
    { label: "Addition (hydrogenation)", latex: "\\ce{CH2=CH2 + H2 ->[Ni] CH3-CH3}" },
    { label: "Substitution", latex: "\\ce{CH4 + Cl2 ->[sunlight] CH3Cl + HCl}" },
    { label: "Ethanol with sodium", latex: "\\ce{2Na + 2CH3CH2OH -> 2CH3CH2O^-Na^+ + H2}" },
    { label: "Dehydration of ethanol", latex: "\\ce{CH3-CH2OH ->[\\text{hot conc. H2SO4, 443 K}] CH2=CH2 + H2O}" },
    { label: "Esterification", latex: "\\ce{CH3COOH + CH3CH2OH ->[acid] CH3COOCH2CH3 + H2O}" },
    { label: "Saponification of an ester", latex: "\\ce{CH3COOC2H5 + NaOH -> C2H5OH + CH3COONa}" },
    { label: "Ethanoic acid with a base", latex: "\\ce{NaOH + CH3COOH -> CH3COONa + H2O}" },
    { label: "Ethanoic acid with carbonates", latex: "\\ce{2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2} \\qquad \\ce{CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2}" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Formation of micelles (Figure 4.12)",
      labels: ["ionic (hydrophilic) end facing water", "hydrocarbon (hydrophobic) tail in the oil", "oily dirt in the centre", "water around the micelle"],
    },
    {
      title: "Formation of ester (Figure 4.11)",
      labels: ["ethanol + glacial acetic acid + few drops of conc. H₂SO₄", "test tube in a beaker of warm water", "water bath heated by a burner", "sweet smell of ester"],
    },
    {
      title: "Electron dot structure for methane (Figure 4.5)",
      labels: ["carbon in the centre", "four hydrogen atoms", "four shared pairs", "four single bonds"],
    },
    {
      title: "Two isomers of butane (Figure 4.8)",
      labels: ["straight chain of 4 carbons", "branched chain: 3 carbons + 1 on the middle", "both C₄H₁₀", "each carbon with 4 bonds"],
    },
    {
      title: "Structure of benzene (Figure 4.10)",
      labels: ["six-carbon ring", "alternate single and double bonds", "one hydrogen on each carbon", "C₆H₆"],
    },
  ],
  mostAsked: [
    {
      topic: "Homologous series, functional groups and naming: define, give the next member, name a compound or its functional group",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Ethanol and ethanoic acid: with sodium, dehydration at 443 K, esterification, saponification of an ester, reaction with a carbonate; identify X and Y",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Structures and isomers: saturated and unsaturated hydrocarbons, isomers of butane, cyclohexane and benzene, counting bonds",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Why carbon forms covalent bonds and so many compounds: no \\(\\ce{C^4+}\\) or \\(\\ce{C^4-}\\) ions, tetravalency, catenation, allotropes",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Electron dot structures (\\(\\ce{Cl2}\\), \\(\\ce{O2}\\), \\(\\ce{NH3}\\), \\(\\ce{CH4}\\), ethyne) and why covalent compounds have low melting points and do not conduct",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Soaps and detergents: micelles and cleansing action, scum in hard water, why detergents work in hard water",
      marks: 5,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Reactions of carbon compounds: combustion, oxidation by alkaline \\(\\ce{KMnO4}\\), addition (hydrogenation of oils), substitution",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Counting bonds and electrons",
      body: "Ethyne \\(\\ce{HC#CH}\\): 3 shared pairs between the carbons, 5 pairs (10 electrons) shared in all. Benzene has 9 single bonds (6 C-H, 3 C-C) and 3 double bonds. Draw every pair in a dot structure.",
    },
    {
      title: "Carbon with five bonds",
      body: "Every carbon must have exactly four bonds. Check each carbon after drawing an isomer or a structure; a missing hydrogen or an extra bond loses the mark.",
    },
    {
      title: "Wrong names and suffixes",
      body: "Count the carbons for the stem: meth 1, eth 2, prop 3, but 4, pent 5. Then the suffix: \\(\\ce{CH3CH2CHO}\\) is propanal, \\(\\ce{CH3COCH3}\\) is propanone, \\(\\ce{CH3C#CH}\\) is propyne.",
    },
    {
      title: "Dehydration conditions",
      body: "Ethanol gives ethene with **excess hot concentrated** \\(\\ce{H2SO4}\\) at 443 K: the acid removes water (dehydrating agent). With only a few drops of acid and ethanoic acid, ethanol gives an ester instead.",
    },
    {
      title: "Mixing up esterification and saponification",
      body: "Esterification: acid + alcohol give ester + water (acid catalyst). Saponification: ester + NaOH give back the alcohol and the sodium salt of the acid; it is how soap is made.",
    },
    {
      title: "Micelle drawn the wrong way round",
      body: "The **hydrocarbon tails** point inwards into the oil; the **ionic heads** face the water outside. The oil sits in the centre.",
    },
  ],
};

export default sheet;
