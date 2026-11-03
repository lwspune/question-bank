import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Chemistry, Amines (NCERT Part II, Ch. 9). Basicity, tests and
 * diazonium reactions in NCERT's words; most-asked topics and marks from the
 * CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Amines",
  chapterSlug: "amines",
  source: "NCERT Chemistry Part II (CBSE Class 12), Chapter 9",
  keyPoints: [
    {
      term: "Structure and classification",
      text: "N is \\(sp^3\\) with one lone pair, so amines are **pyramidal**; the C-N-C angle in trimethylamine is 108°. Replacing one, two or three H of \\(\\ce{NH3}\\) by R or Ar gives a **primary** (\\(\\ce{RNH2}\\)), **secondary** (\\(\\ce{R2NH}\\)) or **tertiary** (\\(\\ce{R3N}\\)) amine.",
    },
    {
      term: "Boiling points and solubility",
      text: "1° and 2° amines associate by hydrogen bonding; 1° more (two H on N); 3° cannot. Isomers: **1° > 2° > 3°**. Amines boil lower than alcohols (N less electronegative than O), so butan-1-ol is more soluble in water than butan-1-amine. Lower amines dissolve in water; aniline hardly does.",
    },
    {
      term: "Basic strength and pKb",
      text: "The lone pair on N makes amines Lewis bases. **Larger Kb, smaller pKb, stronger base.** Aliphatic amines are stronger bases than \\(\\ce{NH3}\\) (pKb 4.75): the +I effect of alkyl groups raises electron density on N and stabilises the ammonium ion.",
    },
    {
      term: "Order of basicity in water",
      text: "Set by +I effect, **solvation** of the cation by hydrogen bonding, and steric hindrance together: \\(\\ce{(CH3)2NH > CH3NH2 > (CH3)3N > NH3}\\); \\(\\ce{(C2H5)2NH > (C2H5)3N > C2H5NH2 > NH3}\\). In the **gaseous phase**: 3° > 2° > 1° > \\(\\ce{NH3}\\).",
    },
    {
      term: "Aniline is a weaker base",
      text: "The lone pair on N is in conjugation with the benzene ring, so it is less available for protonation; aniline has **five resonance structures**, anilinium ion only two. So pKb of aniline > methylamine. \\(\\ce{-OCH3}\\), \\(\\ce{-CH3}\\) raise basic strength; \\(\\ce{-NO2}\\), \\(\\ce{-SO3H}\\), -COOH, -X lower it. Acetanilide is less basic than aniline.",
    },
    {
      term: "Ammonolysis",
      text: "An alkyl halide with ethanolic \\(\\ce{NH3}\\) in a sealed tube at 373 K. Its disadvantage: a **mixture** of 1°, 2°, 3° amines and a quaternary ammonium salt. A **large excess of ammonia** gives the primary amine as the major product. Reactivity: RI > RBr > RCl.",
    },
    {
      term: "Gabriel phthalimide synthesis: scope",
      text: "Gives **primary** amines only. **Aromatic primary amines cannot be prepared** this way because aryl halides do not undergo nucleophilic substitution with the phthalimide anion.",
    },
    {
      term: "Hoffmann bromamide degradation",
      text: "An amide with \\(\\ce{Br2}\\) in aqueous or ethanolic NaOH: an alkyl or aryl group migrates from carbonyl carbon to N, giving a primary amine with **one carbon less** than the amide. The carbonyl carbon leaves as carbonate.",
    },
    {
      term: "Acylation",
      text: "1° and 2° amines react with acid chlorides, anhydrides and esters (nucleophilic substitution) to give **amides**: \\(\\ce{C2H5NH2 + CH3COCl -> C2H5NHCOCH3 + HCl}\\). A base stronger than the amine, such as **pyridine**, removes HCl and shifts the equilibrium. With \\(\\ce{C6H5COCl}\\) it is benzoylation.",
    },
    {
      term: "Carbylamine (isocyanide) test",
      text: "Aliphatic and aromatic **primary** amines heated with chloroform and ethanolic KOH form foul smelling isocyanides (carbylamines). Secondary and tertiary amines do not.",
    },
    {
      term: "Reaction with nitrous acid",
      text: "\\(\\ce{HNO2}\\) is made in situ from \\(\\ce{NaNO2}\\) and mineral acid. **Primary aliphatic** amines give unstable diazonium salts that release \\(\\ce{N2}\\) quantitatively and alcohols. **Aromatic** primary amines at 273-278 K give stable diazonium salts.",
    },
    {
      term: "Hinsberg's reagent",
      text: "Benzenesulphonyl chloride, \\(\\ce{C6H5SO2Cl}\\). 1° amine: N-alkylbenzenesulphonamide, **soluble in alkali** (acidic H on N). 2°: N,N-dialkylbenzenesulphonamide, **insoluble** in alkali (no H on N). 3°: **no reaction**. Used to distinguish and separate amines.",
    },
    {
      term: "Electrophilic substitution in aniline",
      text: "-NH2 is a powerful activating, ortho and para directing group. Bromine water gives **2,4,6-tribromoaniline** (white precipitate). Acetylation protects -NH2: the N lone pair is in resonance with C=O, so -NHCOCH3 activates less. Aniline gives **no Friedel-Crafts** reaction: it forms a salt with \\(\\ce{AlCl3}\\) and N turns deactivating.",
    },
    {
      term: "Stability of diazonium salts",
      text: "Arenediazonium salts are stable for a short time in cold solution (273-278 K); their stability is explained by **resonance**. Aliphatic diazonium salts are unstable. Benzenediazonium chloride decomposes easily when dry; the fluoroborate is stable at room temperature.",
    },
  ],
  formulas: [
    { label: "Basic strength", latex: "\\mathrm{p}K_b = -\\log K_b \\qquad \\text{smaller } \\mathrm{p}K_b \\Rightarrow \\text{stronger base}" },
  ],
  derivations: [
    {
      title: "Reduction of nitro compounds",
      steps: [
        "\\(\\ce{H2}\\) with finely divided Ni, Pd or Pt, or a metal in acid (Sn/HCl, Fe/HCl): \\(\\ce{C6H5NO2 + 6[H] -> C6H5NH2 + 2H2O}\\).",
        "Iron scrap and HCl is preferred: \\(\\ce{FeCl2}\\) formed is hydrolysed and releases HCl, so only a little HCl is needed to start.",
      ],
    },
    {
      title: "Reduction of nitriles and amides",
      steps: [
        "Nitriles with \\(\\ce{LiAlH4}\\) or catalytic hydrogenation give primary amines with one carbon **more**: \\(\\ce{CH3CN + 4[H] -> CH3CH2NH2}\\).",
        "Amides with \\(\\ce{LiAlH4}\\), then water: \\(\\ce{CH3CONH2 ->[1. LiAlH4][2. H2O] CH3CH2NH2}\\) (same carbon count).",
      ],
    },
    {
      title: "Gabriel phthalimide synthesis",
      steps: [
        "Phthalimide with ethanolic KOH: \\(\\ce{C6H4(CO)2NH + KOH -> C6H4(CO)2NK + H2O}\\).",
        "Heat with alkyl halide: \\(\\ce{C6H4(CO)2NK + R-X -> C6H4(CO)2NR + KX}\\).",
        "Alkaline hydrolysis: \\(\\ce{C6H4(CO)2NR + 2NaOH -> RNH2 + C6H4(COONa)2}\\) (primary amine + sodium phthalate).",
      ],
    },
    {
      title: "Hoffmann bromamide degradation",
      steps: [
        "\\(\\ce{RCONH2 + Br2 + 4NaOH -> RNH2 + Na2CO3 + 2NaBr + 2H2O}\\).",
        "Ethanamide gives methanamine; benzamide gives aniline (6 C from 7 C); propanamine needs butanamide.",
      ],
    },
    {
      title: "Carbylamine reaction",
      steps: [
        "\\(\\ce{R-NH2 + CHCl3 + 3KOH ->[heat] R-NC + 3KCl + 3H2O}\\).",
        "With aniline: phenyl isocyanide, \\(\\ce{C6H5NC}\\). The foul smell is the test for a primary amine.",
      ],
    },
    {
      title: "Hinsberg test reactions",
      steps: [
        "\\(\\ce{C6H5SO2Cl + C2H5NH2 -> C6H5SO2NHC2H5 + HCl}\\): the H on N is acidic, so it dissolves in alkali.",
        "\\(\\ce{C6H5SO2Cl + (C2H5)2NH -> C6H5SO2N(C2H5)2 + HCl}\\): no H on N, insoluble in alkali.",
        "\\(\\ce{(C2H5)3N}\\) does not react.",
      ],
    },
    {
      title: "Diazotisation of aniline",
      steps: [
        "Aniline with nitrous acid (\\(\\ce{NaNO2}\\) + HCl) at 273-278 K.",
        "\\(\\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2^+Cl^- + NaCl + 2H2O}\\) (benzenediazonium chloride).",
        "Use the solution at once: it is stable only in the cold.",
      ],
    },
    {
      title: "Replacing the diazonium group: Sandmeyer, Gattermann and others",
      steps: [
        "Sandmeyer (Cu(I)): \\(\\ce{C6H5N2^+Cl^- ->[CuCl/HCl] C6H5Cl + N2}\\); with CuBr/HBr gives \\(\\ce{C6H5Br}\\), with CuCN/KCN gives \\(\\ce{C6H5CN}\\).",
        "Gattermann: the halogen acid with copper powder, \\(\\ce{C6H5N2^+Cl^- ->[Cu/HCl] C6H5Cl + N2}\\). Sandmeyer gives the better yield.",
        "Iodide: \\(\\ce{C6H5N2^+Cl^- + KI -> C6H5I + KCl + N2}\\). Fluoride: \\(\\ce{HBF4}\\) gives the fluoroborate, which on heating gives \\(\\ce{C6H5F}\\).",
        "By H: \\(\\ce{C6H5N2^+Cl^- + H3PO2 + H2O -> C6H6 + N2 + H3PO3 + HCl}\\) (or ethanol, giving ethanal).",
        "By OH, warm to 283 K: \\(\\ce{C6H5N2^+Cl^- + H2O -> C6H5OH + N2 + HCl}\\).",
      ],
    },
    {
      title: "Coupling reactions (diazo group kept)",
      steps: [
        "With phenol (alkaline medium), coupling at the para position: \\(\\ce{C6H5N2^+Cl^- + C6H5OH ->[OH-] C6H5N=NC6H4OH + HCl}\\) (p-hydroxyazobenzene, orange dye).",
        "With aniline (mildly acidic): \\(\\ce{C6H5N2^+Cl^- + C6H5NH2 ->[H+] C6H5N=NC6H4NH2 + HCl}\\) (p-aminoazobenzene, yellow dye).",
        "The -N=N- link joins two rings in an extended conjugated system, so azo compounds are coloured.",
      ],
    },
    {
      title: "Nitration and sulphonation of aniline",
      steps: [
        "Direct nitration gives tarry oxidation products and, because aniline is protonated to **meta directing** anilinium ion, much m-nitroaniline (about 51% p, 47% m, 2% o).",
        "Protect first: aniline + \\(\\ce{(CH3CO)2O}\\) gives acetanilide; nitrate; hydrolyse to **p-nitroaniline** as the major product.",
        "Sulphonation: conc. \\(\\ce{H2SO4}\\) gives anilinium hydrogensulphate; heating at 453-473 K gives **sulphanilic acid** (p-aminobenzenesulphonic acid).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Pyramidal shape of trimethylamine (Fig. 9.1)",
      labels: ["sp3 nitrogen", "lone pair on N", "C-N-C angle 108°", "three CH3 groups"],
    },
    {
      title: "Intermolecular hydrogen bonding in primary amines (Fig. 9.2)",
      labels: ["N-H...N hydrogen bonds (dotted)", "two H on each N", "R groups"],
    },
  ],
  mostAsked: [
    {
      topic: "Basic strength: order of aliphatic amines in water, aniline against methylamine (pKb), substituted anilines, acetanilide",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Preparation: Gabriel phthalimide synthesis, Hoffmann bromamide degradation, ammonolysis, reduction of nitro compounds and nitriles",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Tests: Hinsberg's reagent, carbylamine reaction, nitrous acid with 1°, 2° and 3° amines",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Diazonium salts: Sandmeyer and Gattermann reactions, replacement by I, H, OH, CN, coupling with phenol or aniline, stability",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Structures of A, B and C in a reaction sequence, and conversions (benzoic acid or nitrobenzene to aniline, ethanoic acid to methanamine)",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Electrophilic substitution of aniline: bromination, nitration (meta product), sulphanilic acid, acetylation, no Friedel-Crafts",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Boiling points and solubility of amines (1°, 2°, 3° isomers; amine against alcohol)",
      marks: 1,
      years: [2026, 2025, 2024, 2022],
    },
    {
      topic: "Classification (1°, 2°, 3°) and IUPAC names of amines",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Making aniline by Gabriel synthesis",
      body: "Gabriel gives **aliphatic** primary amines only: aryl halides do not undergo nucleophilic substitution with phthalimide anion. Make aniline by reducing nitrobenzene, or by Hoffmann degradation of benzamide.",
    },
    {
      title: "Losing count of carbons",
      body: "Hoffmann bromamide gives an amine with **one carbon less** than the amide; nitrile reduction gives an amine with **one carbon more** than the halide used to make the nitrile. Write \\(\\ce{Na2CO3}\\) and 2NaBr in the Hoffmann equation.",
    },
    {
      title: "Using the gas phase order in water",
      body: "In water, solvation and steric effects matter: \\(\\ce{(CH3)2NH}\\) > \\(\\ce{CH3NH2}\\) > \\(\\ce{(CH3)3N}\\), and for ethyl: 2° > 3° > 1°. Only in the gaseous phase is 3° > 2° > 1°.",
    },
    {
      title: "Reversing the Hinsberg results",
      body: "Primary: product **dissolves** in alkali (H on N is acidic). Secondary: product does **not** dissolve. Tertiary: **no reaction**. Carbylamine is for primary amines only.",
    },
    {
      title: "Expecting only o- and p-nitroaniline",
      body: "In strong acid, aniline becomes anilinium ion, which is **meta directing**, so direct nitration gives a lot of m-nitroaniline. To get p-nitroaniline, acetylate first, nitrate, then hydrolyse.",
    },
    {
      title: "Letting the diazonium solution warm up",
      body: "Diazotise at **273-278 K**. If the solution rises to 283 K the salt is hydrolysed to phenol. With phenol, coupling is at the **para** position, giving an orange azo dye.",
    },
  ],
};

export default sheet;
