import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Chemistry, Alcohols, Phenols and Ethers (NCERT Part II, Ch. 7).
 * Mechanisms and name reactions in NCERT's words; most-asked topics and marks
 * from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Alcohols, Phenols and Ethers",
  chapterSlug: "alcohols-phenols-and-ethers",
  source: "NCERT Chemistry Part II (CBSE Class 12), Chapter 7",
  keyPoints: [
    {
      term: "Bond angles and bond lengths",
      text: "C-O-H angle in alcohols is slightly **less** than tetrahedral (repulsion of the lone pairs on O). C-O-C angle in ethers is slightly **greater** than tetrahedral (repulsion between the two bulky R groups). C-O in phenol (136 pm) is shorter than in methanol: partial double bond character from conjugation, and \\(sp^2\\) carbon.",
    },
    {
      term: "Boiling points and solubility",
      text: "Alcohols boil higher than hydrocarbons, ethers and haloalkanes of comparable mass because of **intermolecular hydrogen bonding**; boiling points rise with carbon number and fall with branching. Ethers have no O-H, so they boil much lower than alcohols. Lower alcohols dissolve in water by hydrogen bonding with water.",
    },
    {
      term: "Alcohols are Bronsted acids and bases",
      text: "They donate a proton to a stronger base (react with Na to give alkoxide and \\(\\ce{H2}\\)), and accept a proton through the **unshared electron pairs on oxygen**. Alcohols are weaker acids than water; alkoxides are stronger bases than hydroxide. Acid strength of alcohols: 1° > 2° > 3°.",
    },
    {
      term: "Phenol is more acidic than alcohols",
      text: "The \\(sp^2\\) carbon draws electron density from O, so the O-H bond is more polar. In the alkoxide ion the negative charge is **localised** on oxygen; in the **phenoxide ion it is delocalised** by resonance, so phenoxide is more stable. Phenol reacts with aqueous NaOH; ethanol does not.",
    },
    {
      term: "Substituents and acidity of phenols",
      text: "Electron withdrawing groups such as \\(\\ce{-NO2}\\) raise acidity, most at **ortho and para**. Electron releasing groups (alkyl) lower it: cresols are less acidic than phenol. Order: propan-1-ol < 4-methylphenol < phenol < 3-nitrophenol < 3,5-dinitrophenol < 2,4,6-trinitrophenol.",
    },
    {
      term: "Grignard reagent with carbonyl compounds",
      text: "Nucleophilic addition to C=O gives an adduct; hydrolysis gives the alcohol. **Methanal gives a primary alcohol**, other aldehydes secondary, **ketones tertiary**. E.g. \\(\\ce{CH3MgBr}\\) on propanone then \\(\\ce{H2O}\\) gives 2-methylpropan-2-ol.",
    },
    {
      term: "Lucas test",
      text: "Lucas reagent is conc. HCl and anhydrous \\(\\ce{ZnCl2}\\). Alcohols dissolve in it; their halides do not and make the solution turbid. **Tertiary: turbidity at once.** Primary: no turbidity at room temperature. Secondary lies between.",
    },
    {
      term: "Ease of dehydration",
      text: "Alcohols lose water to form alkenes with conc. \\(\\ce{H2SO4}\\), \\(\\ce{H3PO4}\\), anhydrous \\(\\ce{ZnCl2}\\) or alumina. Tertiary carbocations are most stable, so **tertiary > secondary > primary**. Ethanol needs conc. \\(\\ce{H2SO4}\\) at 443 K.",
    },
    {
      term: "Oxidation of alcohols",
      text: "1° alcohol to aldehyde: \\(\\ce{CrO3}\\) (anhydrous) or **PCC**; to acid: acidified \\(\\ce{KMnO4}\\). 2° alcohol to ketone: \\(\\ce{CrO3}\\). **3° alcohols do not undergo oxidation** (no H on the carbinol carbon). Over **heated Cu at 573 K**, 1° gives aldehyde, 2° gives ketone, 3° gives an alkene (dehydration).",
    },
    {
      term: "-OH activates the ring, ortho and para",
      text: "The -OH group activates the benzene ring and directs to ortho and para positions (resonance makes them electron rich). Bromine is polarised even **without a Lewis acid**. Br2 in \\(\\ce{CS2}\\) or \\(\\ce{CHCl3}\\) at low temperature gives monobromophenols; **bromine water gives 2,4,6-tribromophenol**, a white precipitate.",
    },
    {
      term: "Nitration and steam distillation",
      text: "Dilute \\(\\ce{HNO3}\\) at 298 K gives o- and p-nitrophenol. They are separated by **steam distillation**: o-nitrophenol is steam volatile (**intramolecular** H-bond); p-nitrophenol is less volatile (**intermolecular** H-bonding). Conc. \\(\\ce{HNO3}\\) gives 2,4,6-trinitrophenol (picric acid).",
    },
    {
      term: "Acetylation and aspirin",
      text: "Alcohols and phenols form esters with acids, acid chlorides and anhydrides (acid chloride with pyridine to remove HCl). Introducing \\(\\ce{CH3CO}\\) is **acetylation**; acetylation of salicylic acid gives **aspirin**: \\(\\ce{HOC6H4COOH + (CH3CO)2O ->[H+] CH3COOC6H4COOH + CH3COOH}\\).",
    },
    {
      term: "Phenols do not break the C-O bond",
      text: "Reactions involving cleavage of the C-O bond take place only in alcohols; phenols show them only with zinc (phenol to benzene). The C-O bond of phenol has partial double bond character, so phenol does not undergo nucleophilic substitution of -OH.",
    },
    {
      term: "Electrophilic substitution in anisole",
      text: "The alkoxy group is ortho, para directing and activating. Anisole is brominated in ethanoic acid without \\(\\ce{FeBr3}\\) (para 90%); gives Friedel-Crafts alkylation and acylation (anhydrous \\(\\ce{AlCl3}\\)) and nitration (conc. \\(\\ce{H2SO4}\\) + \\(\\ce{HNO3}\\)) at ortho and para.",
    },
  ],
  formulas: [
    { label: "Acid strength", latex: "\\text{phenol} > \\text{water} > \\text{ethanol}" },
    { label: "Ease of dehydration", latex: "3^\\circ > 2^\\circ > 1^\\circ" },
  ],
  derivations: [
    {
      title: "Mechanism of acid catalysed hydration of ethene",
      steps: [
        "Step 1, protonation of the alkene by \\(\\ce{H3O+}\\) to a carbocation: \\(\\ce{CH2=CH2 + H3O+ -> CH3-CH2+ + H2O}\\).",
        "Step 2, nucleophilic attack of water: \\(\\ce{CH3-CH2+ + H2O -> CH3CH2-OH2+}\\).",
        "Step 3, deprotonation: \\(\\ce{CH3CH2-OH2+ + H2O -> CH3CH2OH + H3O+}\\). Unsymmetrical alkenes add by Markovnikov's rule.",
      ],
    },
    {
      title: "Mechanism of dehydration of ethanol to ethene (conc. H2SO4, 443 K)",
      steps: [
        "Step 1, protonated alcohol forms (fast): \\(\\ce{CH3CH2OH + H+ -> CH3CH2-OH2+}\\).",
        "Step 2, carbocation forms (slowest, rate determining): \\(\\ce{CH3CH2-OH2+ -> CH3CH2+ + H2O}\\).",
        "Step 3, a proton is eliminated: \\(\\ce{CH3CH2+ -> CH2=CH2 + H+}\\). The acid used in step 1 is released in step 3; ethene is removed as it forms.",
      ],
    },
    {
      title: "Ether by dehydration of ethanol (conc. H2SO4, 413 K): SN2 mechanism",
      steps: [
        "Overall: \\(\\ce{2C2H5OH ->[conc. H2SO4][413 K] C2H5OC2H5 + H2O}\\).",
        "Step 1: \\(\\ce{C2H5OH + H+ -> C2H5-OH2+}\\). Step 2: a second ethanol attacks it (SN2), \\(\\ce{C2H5OH + C2H5-OH2+ -> (C2H5)2OH+ + H2O}\\).",
        "Step 3: \\(\\ce{(C2H5)2OH+ -> C2H5OC2H5 + H+}\\). Suits primary alcohols only; 2° and 3° alcohols give alkenes.",
      ],
    },
    {
      title: "Hydroboration-oxidation",
      steps: [
        "Diborane adds to the alkene, B going to the carbon with more H atoms: \\(\\ce{6CH3CH=CH2 + B2H6 -> 2(CH3CH2CH2)3B}\\).",
        "Oxidation by \\(\\ce{H2O2}\\) in aqueous NaOH: \\(\\ce{(CH3CH2CH2)3B + 3H2O2 ->[OH-] 3CH3CH2CH2OH + B(OH)3}\\).",
        "Propene gives **propan-1-ol**, as if water added against Markovnikov's rule, in excellent yield.",
      ],
    },
    {
      title: "Williamson synthesis",
      steps: [
        "An alkyl halide reacts with sodium alkoxide by SN2: \\(\\ce{R-X + R'-ONa -> R-O-R' + NaX}\\).",
        "The halide must be primary: \\(\\ce{(CH3)3C-ONa + CH3CH2Br -> (CH3)3C-O-CH2CH3 + NaBr}\\) (t-butyl ethyl ether).",
        "A tertiary halide gives only alkene, since alkoxide is also a strong base: \\(\\ce{(CH3)3C-Br + CH3ONa -> (CH3)2C=CH2 + CH3OH + NaBr}\\).",
        "Phenol reacts as phenoxide: \\(\\ce{C6H5ONa + CH3Br -> C6H5OCH3 + NaBr}\\) (anisole).",
      ],
    },
    {
      title: "Cleavage of ethers by HI",
      steps: [
        "Protonated ether is attacked by \\(\\ce{I-}\\) at the less substituted carbon (SN2): \\(\\ce{(CH3)2CH-O-CH3 + HI -> (CH3)2CH-OH + CH3I}\\).",
        "With a tertiary group the tertiary carbocation forms (SN1): \\(\\ce{(CH3)3C-O-CH3 + HI -> (CH3)3C-I + CH3OH}\\).",
        "Alkyl aryl ether breaks at the alkyl-oxygen bond: \\(\\ce{C6H5OCH3 + HI -> C6H5OH + CH3I}\\).",
        "Excess HI, heat: \\(\\ce{C2H5OC2H5 + 2HI -> 2C2H5I + H2O}\\).",
      ],
    },
    {
      title: "Reimer-Tiemann reaction",
      steps: [
        "Phenol with chloroform in sodium hydroxide: a -CHO group enters the **ortho** position.",
        "The substituted benzal chloride formed is hydrolysed by alkali; acidification gives **salicylaldehyde** (2-hydroxybenzaldehyde).",
        "Overall: \\(\\ce{C6H5OH + CHCl3 + 3NaOH -> HOC6H4CHO + 3NaCl + 2H2O}\\).",
      ],
    },
    {
      title: "Kolbe's reaction",
      steps: [
        "Phenol with NaOH gives phenoxide, more reactive than phenol; it reacts even with the weak electrophile \\(\\ce{CO2}\\).",
        "\\(\\ce{C6H5ONa + CO2 ->[heat, pressure] HOC6H4COONa}\\), then \\(\\ce{HOC6H4COONa + HCl -> HOC6H4COOH + NaCl}\\).",
        "Main product: ortho-hydroxybenzoic acid (**salicylic acid**).",
      ],
    },
    {
      title: "Preparation of phenol from cumene and from chlorobenzene",
      steps: [
        "Cumene is oxidised by air to cumene hydroperoxide: \\(\\ce{C6H5CH(CH3)2 + O2 -> C6H5C(CH3)2OOH}\\).",
        "Dilute acid splits it: \\(\\ce{C6H5C(CH3)2OOH ->[H+][H2O] C6H5OH + CH3COCH3}\\); **acetone** is the by-product.",
        "Chlorobenzene fused with NaOH at 623 K and 320 atm: \\(\\ce{C6H5Cl + 2NaOH -> C6H5ONa + NaCl + H2O}\\); acidify to phenol.",
      ],
    },
    {
      title: "Bromination and nitration of phenol",
      steps: [
        "Bromine water: \\(\\ce{C6H5OH + 3Br2 -> Br3C6H2OH + 3HBr}\\) (2,4,6-tribromophenol, white precipitate).",
        "Br2 in \\(\\ce{CS2}\\), low temperature: o-bromophenol and p-bromophenol (major).",
        "Conc. \\(\\ce{HNO3}\\): \\(\\ce{C6H5OH + 3HNO3 -> (NO2)3C6H2OH + 3H2O}\\) (picric acid, poor yield; now made via phenol-2,4-disulphonic acid).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Structures of methanol, phenol and methoxymethane (Fig. 7.1)",
      labels: ["C-O-H angle below 109°28' in methanol", "C-O 136 pm in phenol", "C-O-C angle above tetrahedral in ether", "two lone pairs on oxygen"],
    },
  ],
  mostAsked: [
    {
      topic: "Acidity: phenol against alcohol and water, effect of -NO2, -CH3 and -OCH3 groups; alcohols as Bronsted acids and bases",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Ethers: Williamson synthesis (which halide and alkoxide) and cleavage by HI (which iodide forms)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Phenol with bromine (water or CS2) and nitric acid (dilute or conc.); ortho, para direction; steam distillation of nitrophenols",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Mechanism: acid dehydration of ethanol (443 K to ethene, 413 K to ether) or acid catalysed hydration of ethene",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Oxidation and tests: PCC, CrO3, KMnO4, Cu at 573 K, Lucas test; tertiary alcohols resist oxidation",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Preparing alcohols and phenol: Grignard reagent with methanal or a ketone, hydroboration-oxidation, hydration, cumene",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Reimer-Tiemann and Kolbe reactions; acetylation of salicylic acid to aspirin",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Boiling points of alcohols and ethers, C-O-C bond angle, C-O bond of phenol",
      marks: 1,
      years: [2026, 2025, 2024],
    },
  ],
  mistakes: [
    {
      title: "Writing iodobenzene from anisole and HI",
      body: "The aryl-oxygen bond is stronger and an \\(sp^2\\) carbon resists SN2, so anisole gives **phenol and methyl iodide**, never iodobenzene and methanol.",
    },
    {
      title: "Using a tertiary halide in Williamson synthesis",
      body: "Alkoxide is a strong base: with t-butyl bromide it eliminates to 2-methylpropene. For t-butyl ethyl ether use **sodium t-butoxide + ethyl bromide** (primary halide).",
    },
    {
      title: "Mixing up 443 K and 413 K",
      body: "Ethanol with conc. \\(\\ce{H2SO4}\\): **443 K gives ethene**, **413 K gives ethoxyethane**. In the alkene mechanism the slow step is carbocation formation.",
    },
    {
      title: "Wrong bromination product",
      body: "Bromine **water** gives 2,4,6-tribromophenol (white precipitate). Br2 in \\(\\ce{CS2}\\) at low temperature gives mono-bromophenols. No Lewis acid is needed either way.",
    },
    {
      title: "Hydroboration and acid hydration give different alcohols",
      body: "Propene with dil. \\(\\ce{H2SO4}\\) gives **propan-2-ol** (Markovnikov); with \\(\\ce{B2H6}\\) then \\(\\ce{H2O2}\\)/\\(\\ce{OH-}\\) it gives **propan-1-ol**.",
    },
    {
      title: "Swapping Reimer-Tiemann and Kolbe products",
      body: "Reimer-Tiemann (\\(\\ce{CHCl3}\\), NaOH) puts **-CHO**: salicylaldehyde. Kolbe (\\(\\ce{CO2}\\) on phenoxide) puts **-COOH**: salicylic acid, which acetylates to aspirin.",
    },
  ],
};

export default sheet;
