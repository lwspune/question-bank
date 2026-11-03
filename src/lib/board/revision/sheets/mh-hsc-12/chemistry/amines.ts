import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Amines (Balbharati Ch. 13). Definitions and name
 * reactions in the book's own words; most-asked years from the board
 * past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Amines",
  chapterSlug: "amines",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 13",
  keyPoints: [
    {
      term: "Classification of amines",
      text: "Primary, secondary and tertiary amines: one, two or three H atoms of \\(\\ce{NH3}\\) replaced by alkyl/aryl groups (\\(\\ce{RNH2}\\), \\(\\ce{R2NH}\\), \\(\\ce{R3N}\\)). When all groups on N are the same it is a **simple** amine; if different, a **mixed** amine. Aliphatic or aromatic by the groups on N.",
    },
    {
      term: "Nomenclature",
      text: "IUPAC: replace the ending 'e' of the alkane by 'amine'; groups on N are prefixed N-. \\(\\ce{(CH3)2N-C2H5}\\) is N,N-dimethylethanamine; \\(\\ce{C6H5-NH-CH3}\\) (methylphenylamine) is N-methylaniline (N-methylbenzenamine).",
    },
    {
      term: "Hydrogen bonding",
      text: "The N-H bond is polar, so primary and secondary amines have intermolecular hydrogen bonding (tertiary amines have no N-H). Lower aliphatic amines are soluble in water because they hydrogen bond with water.",
    },
    {
      term: "Why amines are basic",
      text: "The basic nature of amines is due to the **lone pair of electrons on nitrogen**: a Lewis base shares it, a Lowry-Bronsted base accepts \\(\\ce{H+}\\). Strength is given by \\(K_b\\) or pKb: the larger \\(K_b\\) (smaller pKb), the stronger the base.",
    },
    {
      term: "Basic strength of aliphatic amines",
      text: "In water: \\(\\ce{R2NH > RNH2 > R3N > NH3}\\) (for methyl groups). +I effect of alkyl groups stabilizes the conjugate acid; solvation by hydrogen bonding works the other way and is very poor for \\(\\ce{R3NH+}\\), so a 3° amine is a weaker base than a 2° amine.",
    },
    {
      term: "Arylamines are weaker bases",
      text: "In aniline the lone pair on N is conjugated with the ring and less available for protonation. Aniline has five resonance structures, the anilinium ion only two, so arylamines are weaker bases than ammonia and aliphatic amines.",
    },
    {
      term: "Exhaustive alkylation",
      text: "A primary amine heated with excess alkyl halide gives secondary and tertiary amines and finally a **quaternary ammonium salt**. Primary, secondary and tertiary amines consume three, two and one moles of alkyl halide: \\(\\ce{CH3NH2 + 3CH3I -> (CH3)4N+I- + 2HI}\\).",
    },
    {
      term: "Acylation",
      text: "Primary and secondary amines have replaceable H on nitrogen; acetyl chloride or acetic anhydride replaces it by an acyl group to give an **amide** (N-substituted). Tertiary amines do not react.",
    },
    {
      term: "Carbylamine reaction",
      text: "Aliphatic or aromatic primary amines on heating with chloroform and alcoholic KOH give foul smelling **isocyanides (carbylamines)**: \\(\\ce{C2H5NH2 + CHCl3 + 3KOH -> C2H5NC + 3KCl + 3H2O}\\). A test for primary amines only.",
    },
    {
      term: "Primary amines and nitrous acid",
      text: "\\(\\ce{HNO2}\\) is made in situ from \\(\\ce{NaNO2}\\) and HCl. Aliphatic primary amines give an alcohol and \\(\\ce{N2}\\): \\(\\ce{C2H5NH2 + HNO2 -> C2H5OH + N2 + H2O}\\). Aromatic primary amines give diazonium salts, stable at 273 K.",
    },
    {
      term: "Hinsberg's test",
      text: "Benzenesulfonyl chloride (\\(\\ce{C6H5SO2Cl}\\)) is Hinsberg's reagent. Ethylamine gives N-ethylbenzenesulfonamide, **soluble in alkali** (acidic H on N). Diethylamine gives N,N-diethylbenzenesulfonamide, insoluble in alkali (no H on N).",
    },
    {
      term: "Coupling reactions of diazonium salts",
      text: "Arene diazonium salts with phenols or aromatic amines give **azo compounds** (-N=N- joining two rings). With phenol in alkaline medium: p-hydroxyazobenzene. With β-naphthol in NaOH: an orange dye, the test for primary aromatic amines.",
    },
    {
      term: "Sulfanilic acid (zwitter ion)",
      text: "Aniline with conc. \\(\\ce{H2SO4}\\), heated at 453-473 K, gives sulfanilic acid. It exists as a salt called a **dipolar ion or zwitter ion**, \\(\\ce{^+H3N-C6H4-SO3^-}\\), formed by reaction between an acidic group and a basic group in the same molecule.",
    },
    {
      term: "Electrophilic substitution in aniline",
      text: "-NH2 is ortho and para directing and a powerful ring activating group. Aniline with bromine water at room temperature gives a white precipitate of 2,4,6-tribromoaniline.",
    },
  ],
  formulas: [{ label: "Base strength", latex: "\\mathrm{p}K_b = -\\log K_b \\qquad \\text{smaller } \\mathrm{p}K_b \\Rightarrow \\text{stronger base}" }],
  derivations: [
    {
      title: "Hofmann bromamide degradation",
      steps: [
        "An amide is warmed with bromine and concentrated aqueous KOH: it gives a primary amine with **one carbon less** (a step down reaction).",
        "\\(\\ce{CH3CONH2 + Br2 + 4KOH -> CH3NH2 + K2CO3 + 2KBr + 2H2O}\\).",
        "Acetamide gives methanamine (methylamine); benzamide gives aniline.",
      ],
    },
    {
      title: "Reduction of nitriles (Mendius reduction) and of amides",
      steps: [
        "Nitrile with sodium and ethanol (or \\(\\ce{LiAlH4}\\)): \\(\\ce{CH3CN + 4[H] ->[Na/C2H5OH] CH3CH2NH2}\\) (acetonitrile to ethanamine).",
        "Ethyl cyanide gives propan-1-amine (n-propylamine): \\(\\ce{C2H5CN + 4[H] -> C2H5CH2NH2}\\).",
        "Amide with \\(\\ce{LiAlH4}\\) in ether (or Na/\\(\\ce{C2H5OH}\\)): \\(\\ce{CH3CONH2 + 4[H] -> CH3CH2NH2 + H2O}\\) (same number of carbons).",
      ],
    },
    {
      title: "Gabriel phthalimide synthesis",
      steps: [
        "Phthalimide with alcoholic KOH gives potassium phthalimide.",
        "Heating with an alkyl halide gives N-alkylphthalimide.",
        "Alkaline hydrolysis gives the primary amine and sodium phthalate.",
        "Aromatic amines cannot be made this way: aryl halides do not undergo nucleophilic substitution with the phthalimide anion.",
      ],
    },
    {
      title: "Ammonolysis of alkyl halides",
      steps: [
        "Alkyl halide heated with alcoholic excess \\(\\ce{NH3}\\) in a sealed tube at 373 K: \\(\\ce{C2H5Br + NH3 -> C2H5NH2 + HBr}\\).",
        "Without excess \\(\\ce{NH3}\\), it continues to \\(\\ce{(C2H5)2NH}\\), \\(\\ce{(C2H5)3N}\\) and \\(\\ce{(C2H5)4N+Br-}\\).",
      ],
    },
    {
      title: "Reactions of benzene diazonium chloride",
      steps: [
        "Made from aniline with \\(\\ce{NaNO2}\\) and HCl at 273 K (diazotization).",
        "Sandmeyer: CuCl/HCl or CuBr/HBr gives chloro- or bromobenzene; Gatterman: Cu powder with HCl or HBr.",
        "To benzene: \\(\\ce{C6H5N2Cl + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}\\).",
        "With water, phenol; with KI, iodobenzene; with \\(\\ce{HBF4}\\) then heat, fluorobenzene.",
        "Coupling with phenol in alkaline medium: \\(\\ce{C6H5N2Cl + C6H5OH ->[OH-] C6H5-N=N-C6H4OH + HCl}\\) (p-hydroxyazobenzene).",
      ],
    },
  ],
  diagrams: [
    { title: "Intermolecular hydrogen bonding in primary amines", labels: ["N-H bond", "lone pair on N", "dotted hydrogen bonds between molecules"] },
    { title: "Hydrogen bonding between amine and water", labels: ["N...H-O bond", "N-H...O bond", "water molecule"] },
    { title: "Zwitter ion of sulfanilic acid", labels: ["benzene ring", "NH3+ group", "SO3- group para to it"] },
  ],
  mostAsked: [
    {
      topic: "Reduction to amines: acetonitrile or ethyl cyanide (Na/alcohol, Mendius), acetamide (LiAlH4) to ethylamine",
      years: [2026, 2025, 2024, 2023],
    },
    { topic: "Hofmann bromamide degradation (acetamide)", years: [2025, 2024, 2018, 2017] },
    { topic: "Action of nitrous acid, or chloroform and KOH (carbylamine), on ethylamine", years: [2026, 2023, 2017, 2016] },
    { topic: "Classification and naming of amines: what amines are, secondary amine, N,N-dimethylethanamine, methylphenylamine", years: [2025, 2023, 2019] },
    { topic: "Ethylamine with Hinsberg's reagent or excess alkyl halide (quaternary salt); basicity order", years: [2025, 2024, 2020] },
    { topic: "Basic strength of amines and ammonia: why amines are basic, order, pKb", years: [2026, 2024, 2014] },
    { topic: "Benzene diazonium chloride to benzene, or coupling with phenol; zwitter ion of sulfanilic acid", years: [2026, 2024] },
    { topic: "Write a note on Gabriel phthalimide synthesis", years: [2015] },
  ],
  mistakes: [
    {
      title: "Keeping the carbon count in Hofmann bromamide degradation",
      body: "The amine has **one carbon less** than the amide: acetamide gives **methylamine**, not ethylamine. Reduction of acetamide with \\(\\ce{LiAlH4}\\) keeps the carbons and gives ethylamine.",
    },
    {
      title: "Writing a diazonium salt for ethylamine and nitrous acid",
      body: "Aliphatic diazonium salts decompose at once: ethylamine gives **ethanol** and \\(\\ce{N2}\\). Only aromatic primary amines give a stable diazonium salt, and only at 273 K.",
    },
    {
      title: "Ordering basicity by the number of alkyl groups alone",
      body: "In water the 2° amine is the strongest: \\(\\ce{(CH3)2NH > CH3NH2 > (CH3)3N > NH3}\\), and aniline is weaker than all of them.",
    },
    {
      title: "Giving the carbylamine test for a secondary amine",
      body: "Only primary amines (aliphatic or aromatic) give the foul smelling isocyanide with \\(\\ce{CHCl3}\\) and KOH.",
    },
    {
      title: "Mixing up Hinsberg products",
      body: "The primary amine's sulfonamide still has an H on N, so it **dissolves in alkali**. The secondary amine's sulfonamide has none and does not.",
    },
    {
      title: "Drawing sulfanilic acid without charges",
      body: "Draw the zwitter ion: \\(\\ce{-NH3+}\\) and \\(\\ce{-SO3-}\\) para to each other on the ring.",
    },
  ],
};

export default sheet;
