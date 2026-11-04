import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Alcohols, Phenols and Ethers (Balbharati Ch. 11).
 * Definitions and name reactions in the book's own words; most-asked years
 * from the board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Alcohols, Phenols and Ethers",
  chapterSlug: "alcohols-phenols-and-ethers",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 11",
  keyPoints: [
    {
      term: "Alcohols and phenols",
      text: "Alcohols contain an -OH group attached to a **saturated** carbon atom. Phenols contain a hydroxyl group directly attached to the carbon atom of a **benzene ring**. Monohydric alcohols are primary, secondary or tertiary by the carbon carrying -OH.",
    },
    {
      term: "Classification of ethers",
      text: "**Symmetrical (simple)** ethers: both groups on oxygen the same, e.g. \\(\\ce{C2H5-O-C2H5}\\). **Unsymmetrical (mixed)** ethers: the two groups different, e.g. \\(\\ce{CH3-O-C2H5}\\), anisole \\(\\ce{C6H5-O-CH3}\\), methyl vinyl ether \\(\\ce{CH3-O-CH=CH2}\\).",
    },
    {
      term: "Hydrogen bonding and boiling point",
      text: "The polar -OH groups are held together by strong intermolecular **hydrogen bonding**, so ethanol boils far higher than ethane (only weak van der Waals forces). Boiling points rise with molecular mass and fall with branching.",
    },
    {
      term: "Acidic character of phenol",
      text: "Phenoxide ion, the conjugate base of phenol, is resonance stabilized by delocalization of the negative charge, so phenol is weakly acidic: it turns blue litmus red and reacts with NaOH but not with \\(\\ce{NaHCO3}\\). Alcohols are neutral: the +I effect of alkyl groups destabilizes the alkoxide ion.",
    },
    {
      term: "Test for phenol",
      text: "Phenols react with **neutral ferric chloride** solution to give a deep purple, violet or green colour of ferric phenoxide.",
    },
    {
      term: "Lucas test",
      text: "Lucas reagent (conc. HCl + anhydrous \\(\\ce{ZnCl2}\\)): the clear solution turns turbid as the alkyl chloride forms. Tertiary alcohols turn it turbid instantaneously, secondary slowly, and primary only on heating.",
    },
    {
      term: "Oxidation of alcohols",
      text: "Primary alcohol gives an aldehyde (CrO3 or PCC); with \\(\\ce{K2Cr2O7}\\) the oxidation does not stop at the aldehyde stage and gives a carboxylic acid. Secondary alcohol gives a ketone. Tertiary alcohols are difficult to oxidise (e.g. 2-methylpropan-2-ol).",
    },
    {
      term: "Heating with copper at 573 K",
      text: "Primary alcohol gives an **aldehyde**, secondary a **ketone** (dehydrogenation); tertiary alcohol gives an **alkene** (dehydration).",
    },
    {
      term: "Dehydration of ethanol",
      text: "With conc. \\(\\ce{H2SO4}\\), ethanol gives ethoxyethane at **413 K** and ethene at **443 K**. Higher temperature or secondary and tertiary alcohols give the alkene (more substituted alkene as the major product, by Saytzeff rule).",
    },
    {
      term: "Phenol in electrophilic substitution",
      text: "Phenol reacts more readily than benzene: the -OH group is ring activating and ortho/para directing. Sodium phenoxide is even more reactive, so it reacts with a weak electrophile like \\(\\ce{CO2}\\) (Kolbe reaction).",
    },
    {
      term: "Williamson synthesis",
      text: "Alkyl halide with sodium alkoxide or sodium phenoxide gives an ether, by **SN2** (backside attack of the alkoxide). The alkyl halide must be **primary**: secondary and tertiary halides give mainly alkene. Aryl halides do not give Williamson synthesis.",
    },
    {
      term: "Cleavage of ethers by HI",
      text: "Alkyl ethers react with hot concentrated HI or HBr to give an alcohol and an alkyl halide; the iodide forms on the **less substituted** carbon. An aryl alkyl ether breaks at the O-alkyl bond: anisole gives **phenol** and methyl iodide.",
    },
    {
      term: "Anisole in electrophilic substitution",
      text: "The -OCH3 group is ring activating and ortho/para directing (+R effect). Anisole is brominated by bromine in acetic acid even without \\(\\ce{FeBr3}\\), and the nitrating mixture gives o- and p-nitroanisole.",
    },
    {
      term: "Uses",
      text: "Methanol: solvent for paints and varnishes. Ethanol: antifreeze, solvent. **Phenol**: phenol formaldehyde resin (bakelite), antiseptics. Diethyl ether: once a general anaesthetic, now a solvent.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Preparation of phenol from cumene (isopropylbenzene)",
      steps: [
        "Cumene on air oxidation (423 K, Co-naphthenate) gives cumene hydroperoxide, \\(\\ce{C6H5C(CH3)2OOH}\\).",
        "Cumene hydroperoxide on decomposition with dilute acid gives phenol: \\(\\ce{C6H5C(CH3)2OOH ->[dil. HCl] C6H5OH + CH3COCH3}\\).",
        "Acetone is a valuable by-product. This is the commercial method.",
      ],
    },
    {
      title: "Dow process for preparation of phenol",
      steps: [
        "Chlorobenzene is fused with NaOH at 623 K and 300 atm: \\(\\ce{C6H5Cl + 2NaOH -> C6H5ONa + NaCl + H2O}\\).",
        "Sodium phenoxide is treated with dilute HCl: \\(\\ce{C6H5ONa + HCl -> C6H5OH + NaCl}\\).",
      ],
    },
    {
      title: "Phenol (carbolic acid) from benzene sulfonic acid",
      steps: [
        "Neutralize with NaOH: \\(\\ce{C6H5SO3H + NaOH -> C6H5SO3Na + H2O}\\).",
        "Fuse sodium benzene sulfonate with solid NaOH at 573 K: \\(\\ce{C6H5SO3Na + 2NaOH -> C6H5ONa + Na2SO3 + H2O}\\).",
        "Acidify the sodium phenoxide with dilute acid to get phenol.",
      ],
    },
    {
      title: "Reimer-Tiemann reaction",
      steps: [
        "Phenol is treated with chloroform in aqueous NaOH (dichlorocarbene is the electrophile), then hydrolysed with acid.",
        "Product: **salicylaldehyde** (o-hydroxybenzaldehyde), \\(\\ce{C6H5OH + CHCl3 ->[aq. NaOH][H3O+] o-HOC6H4CHO}\\).",
        "With carbon tetrachloride in place of chloroform, salicylic acid is formed.",
      ],
    },
    {
      title: "Kolbe reaction, and salicylic acid to aspirin",
      steps: [
        "Sodium phenoxide is treated with \\(\\ce{CO2}\\) at 398 K under 6 atm, then hydrolysed with acid.",
        "Product: **salicylic acid** (o-hydroxybenzoic acid), \\(\\ce{C6H5ONa + CO2 -> o-HOC6H4COONa ->[H3O+] o-HOC6H4COOH}\\).",
        "Acetylation with acetic anhydride gives aspirin (acetylsalicylic acid) and acetic acid.",
      ],
    },
    {
      title: "Reactions of phenol: bromine water, nitration, sulfonation, oxidation, reduction",
      steps: [
        "Bromine water gives 2,4,6-tribromophenol (white precipitate). Conc. \\(\\ce{HNO3}\\) gives 2,4,6-trinitrophenol (picric acid).",
        "Conc. \\(\\ce{H2SO4}\\): o-phenolsulfonic acid at room temperature, p-phenolsulfonic acid at 373 K.",
        "Oxidation with chromic anhydride or sodium dichromate and \\(\\ce{H2SO4}\\) gives **p-benzoquinone**.",
        "\\(\\ce{H2}\\) over nickel at 433 K gives **cyclohexanol**. Heating with **zinc dust** gives benzene: \\(\\ce{C6H5OH + Zn -> C6H6 + ZnO}\\).",
      ],
    },
    {
      title: "Preparation of alcohols from Grignard reagent",
      steps: [
        "Grignard reagent adds to an aldehyde or ketone to form an adduct, which on hydrolysis with dilute acid gives the alcohol.",
        "HCHO gives a primary alcohol, other aldehydes a secondary alcohol, ketones a tertiary alcohol.",
        "\\(\\ce{CH3CHO + CH3MgBr ->[dry ether] (CH3)2CHOMgBr ->[H3O+] (CH3)2CHOH}\\) (propan-2-ol, isopropyl alcohol).",
      ],
    },
    {
      title: "Williamson synthesis of ethers",
      steps: [
        "\\(\\ce{C2H5Br + C2H5ONa -> C2H5-O-C2H5 + NaBr}\\) (diethyl ether).",
        "\\(\\ce{C2H5Br + CH3ONa -> C2H5-O-CH3 + NaBr}\\) (ethyl methyl ether); methyl iodide with sodium ethoxide gives the same ether.",
        "Mechanism SN2; choose the primary halide and put the bulky group on the alkoxide.",
      ],
    },
    {
      title: "Reactions of ethers: dilute H2SO4, PCl5 and HI",
      steps: [
        "Hydrolysis (hot dilute \\(\\ce{H2SO4}\\), pressure): \\(\\ce{CH3-O-C2H5 + H2O -> CH3OH + C2H5OH}\\).",
        "\\(\\ce{PCl5}\\): \\(\\ce{CH3-O-C2H5 + PCl5 -> CH3Cl + C2H5Cl + POCl3}\\). Diethyl ether gives ethyl chloride.",
        "Hot HI: \\(\\ce{CH3-O-C2H5 + HI -> CH3I + C2H5OH}\\) (iodide on the smaller group).",
        "Anisole: \\(\\ce{C6H5-O-CH3 + HI ->[398 K] C6H5OH + CH3I}\\).",
      ],
    },
    {
      title: "Electrophilic substitution in anisole",
      steps: [
        "Bromine in acetic acid (no catalyst) gives p-bromoanisole (major) and o-bromoanisole.",
        "Nitrating mixture (conc. \\(\\ce{HNO3}\\) + conc. \\(\\ce{H2SO4}\\)) gives o-nitroanisole and p-nitroanisole.",
      ],
    },
  ],
  diagrams: [
    { title: "Ionization of phenol and resonance stabilization of phenoxide ion", labels: ["phenol and phenoxide equilibrium", "negative charge on O", "charge delocalized to ortho and para carbons", "curved arrows"] },
    { title: "Hydrogen bonding in o-nitrophenol and p-nitrophenol", labels: ["intramolecular H bond in o-nitrophenol", "intermolecular H bond in p-nitrophenol", "dotted hydrogen bonds"] },
  ],
  mostAsked: [
    {
      topic: "Reactions of ethers: hydrolysis, PCl5, hot HI (methoxyethane, anisole) or bromine in acetic acid on anisole",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Phenol to benzene (zinc dust), cyclohexanol (H2, Ni) or p-benzoquinone; ethanol to ethoxyethane; salicylic acid to aspirin",
      years: [2026, 2025, 2024, 2023, 2019],
    },
    { topic: "Preparation of phenol: from cumene, Dow process, or from benzene sulfonic acid", years: [2025, 2024, 2023, 2022, 2017] },
    {
      topic: "Reactions of alcohols: sodium, oxidation (hot Cu, K2Cr2O7, which alcohol resists), or made from acetaldehyde with CH3MgBr",
      years: [2025, 2024, 2020, 2019],
    },
    { topic: "Preparation of ethers by Williamson synthesis (diethyl ether, ethyl methyl ether)", years: [2024, 2022, 2014] },
    { topic: "Electrophilic substitution in phenol: nitrating mixture, sulfonation; ethanol to sodium ethoxide", years: [2026, 2025] },
    { topic: "Write a note on Reimer-Tiemann reaction or Kolbe reaction", years: [2026, 2025] },
    { topic: "Ethers and their classification; isomers of C3H8O; uses of phenol", years: [2019, 2014] },
  ],
  mistakes: [
    {
      title: "Putting the iodide on the wrong group when HI cleaves an ether",
      body: "In a mixed alkyl ether the iodide goes to the **less substituted** (smaller) group: methoxyethane gives \\(\\ce{CH3I}\\) and ethanol. Anisole gives phenol and \\(\\ce{CH3I}\\), never iodobenzene.",
    },
    {
      title: "Using a tertiary or aryl halide in Williamson synthesis",
      body: "A tertiary halide gives mainly alkene, and an aryl halide does not react. Use the primary halide with the other group as the alkoxide or phenoxide.",
    },
    {
      title: "Writing p-bromophenol for phenol and bromine water",
      body: "Aqueous bromine gives **2,4,6-tribromophenol**. Only bromine in acetic acid on anisole stops at p-bromo (major) and o-bromo products.",
    },
    {
      title: "Swapping the Kolbe and Reimer-Tiemann products",
      body: "Kolbe (sodium phenoxide + \\(\\ce{CO2}\\)) gives **salicylic acid**. Reimer-Tiemann (\\(\\ce{CHCl3}\\) + NaOH) gives **salicylaldehyde**.",
    },
    {
      title: "Forgetting the temperature in dehydration of ethanol",
      body: "Conc. \\(\\ce{H2SO4}\\) at 413 K gives ethoxyethane; at 443 K it gives ethene. Write the temperature over the arrow.",
    },
    {
      title: "Saying phenol reacts with sodium bicarbonate",
      body: "Phenol is a weak acid: it reacts with NaOH but not with \\(\\ce{NaHCO3}\\). Carboxylic acids react with both.",
    },
  ],
};

export default sheet;
