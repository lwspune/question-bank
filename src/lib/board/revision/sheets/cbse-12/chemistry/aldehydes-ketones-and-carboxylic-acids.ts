import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Chemistry, Aldehydes, Ketones and Carboxylic Acids (NCERT Part II,
 * Ch. 8). Name reactions and tests in NCERT's words; most-asked topics and
 * marks from the CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Aldehydes, Ketones and Carboxylic Acids",
  chapterSlug: "aldehydes-ketones-and-carboxylic-acids",
  source: "NCERT Chemistry Part II (CBSE Class 12), Chapter 8",
  keyPoints: [
    {
      term: "Structure of the carbonyl group",
      text: "The carbonyl carbon is \\(sp^2\\) hybridised: trigonal planar, bond angles about 120°. The C=O bond is polarised (O more electronegative), so the carbonyl carbon is an **electrophilic** (Lewis acid) centre and the oxygen a nucleophilic (Lewis base) centre.",
    },
    {
      term: "Boiling points and solubility",
      text: "Aldehydes and ketones boil higher than hydrocarbons and ethers of comparable mass (dipole-dipole association) but lower than alcohols (no intermolecular hydrogen bonds). Methanal, ethanal and propanone mix with water in all proportions (H-bonds with water); solubility falls as the alkyl chain grows.",
    },
    {
      term: "Aldehydes are more reactive than ketones",
      text: "**Steric:** two large groups in ketones hinder the nucleophile. **Electronic:** two alkyl groups reduce the electrophilicity of the carbonyl carbon more. Benzaldehyde is less reactive than propanal: resonance reduces the polarity of its C=O. Order towards HCN: HCHO > \\(\\ce{CH3CHO}\\) > \\(\\ce{CH3COCH3}\\).",
    },
    {
      term: "Addition of HCN and sodium hydrogensulphite",
      text: "HCN adds very slowly; a base generates \\(\\ce{CN-}\\), a stronger nucleophile, giving a **cyanohydrin**. \\(\\ce{NaHSO3}\\) adds to give a water soluble product that dilute acid or alkali turns back to the carbonyl compound: used to **separate and purify aldehydes**.",
    },
    {
      term: "Hemiacetal, acetal and ketal",
      text: "An aldehyde with one equivalent of alcohol and **dry HCl** gives a hemiacetal; a second molecule gives an **acetal** (gem-dialkoxy compound). Ketones with ethylene glycol give cyclic **ethylene glycol ketals**. Aqueous mineral acid hydrolyses them back.",
    },
    {
      term: "Ammonia derivatives (addition-elimination)",
      text: "\\(\\ce{>C=O + H2N-Z -> >C=N-Z + H2O}\\), acid catalysed. Hydroxylamine gives an **oxime**, hydrazine a **hydrazone**, phenylhydrazine a phenylhydrazone, semicarbazide a **semicarbazone**, 2,4-DNP a **2,4-dinitrophenylhydrazone** (yellow, orange or red solid).",
    },
    {
      term: "Reduction",
      text: "\\(\\ce{NaBH4}\\), \\(\\ce{LiAlH4}\\) or catalytic hydrogenation reduce aldehydes to primary and ketones to secondary alcohols. \\(\\ce{NaBH4}\\) **does not reduce the carboxyl group**; acids need \\(\\ce{LiAlH4}\\) or diborane. To reach \\(\\ce{-CH2-}\\) use Clemmensen or Wolff-Kishner.",
    },
    {
      term: "Tollens' and Fehling's tests",
      text: "**Tollens':** warming an aldehyde with ammoniacal silver nitrate gives a bright **silver mirror**. **Fehling:** solution A (aqueous copper sulphate) + solution B (alkaline sodium potassium tartrate, Rochelle salt); an aldehyde gives a **reddish brown precipitate**. Aromatic aldehydes do not respond to Fehling's test. Ketones give neither.",
    },
    {
      term: "Haloform (iodoform) reaction",
      text: "Aldehydes and ketones with at least one \\(\\ce{CH3}\\) on the carbonyl carbon (methyl ketones) are oxidised by sodium hypohalite to the salt of an acid with **one carbon less**, and the methyl group becomes haloform. With NaOI it detects \\(\\ce{CH3CO-}\\) or \\(\\ce{CH3CH(OH)-}\\): yellow iodoform.",
    },
    {
      term: "Acidity of α-hydrogens",
      text: "Due to the **strong electron withdrawing effect of the carbonyl group** and **resonance stabilisation of the conjugate base** (enolate). This is why aldehydes and ketones with an α-hydrogen give aldol condensation.",
    },
    {
      term: "Boiling points of carboxylic acids",
      text: "Higher than aldehydes, ketones and even alcohols of comparable mass: more extensive **intermolecular hydrogen bonding**; most exist as **dimers** in the vapour phase. Acids up to four carbons mix with water.",
    },
    {
      term: "Acidity of carboxylic acids",
      text: "Carboxylate ion is stabilised by **two equivalent resonance structures** (charge on the more electronegative O); phenoxide's are non-equivalent, so acids are stronger than phenols (pKa ~4.8 vs 10). Acids release \\(\\ce{CO2}\\) from \\(\\ce{NaHCO3}\\); phenols do not. EWG raise acidity, EDG lower it: \\(\\ce{FCH2COOH}\\) > \\(\\ce{ClCH2COOH}\\), HCOOH > \\(\\ce{CH3COOH}\\).",
    },
    {
      term: "Carboxyl group is not a true carbonyl",
      text: "The carboxylic carbon is **less electrophilic** than the carbonyl carbon because of resonance with the -OH, so acids do not give the nucleophilic addition reactions of aldehydes and ketones.",
    },
    {
      term: "Ring substitution and Friedel-Crafts",
      text: "-CHO, >C=O and -COOH are deactivating and **meta directing** (benzaldehyde with \\(\\ce{HNO3 + H2SO4}\\) at 273-283 K gives m-nitrobenzaldehyde). Benzoic acid **does not undergo Friedel-Crafts**: the ring is deactivated and \\(\\ce{AlCl3}\\) bonds to the carboxyl group.",
    },
  ],
  formulas: [
    { label: "Acid strength", latex: "\\mathrm{p}K_a = -\\log K_a \\qquad \\text{smaller } \\mathrm{p}K_a \\Rightarrow \\text{stronger acid}" },
    { label: "Effect of groups on acidity (increasing)", latex: "\\mathrm{Ph} < \\mathrm{I} < \\mathrm{Br} < \\mathrm{Cl} < \\mathrm{F} < \\mathrm{CN} < \\mathrm{NO_2} < \\mathrm{CF_3}" },
  ],
  derivations: [
    {
      title: "Mechanism of nucleophilic addition to the carbonyl group",
      steps: [
        "The nucleophile attacks the electrophilic carbonyl carbon from a direction about perpendicular to the plane of its \\(sp^2\\) orbitals.",
        "Carbon changes from \\(sp^2\\) to \\(sp^3\\): a tetrahedral alkoxide intermediate forms.",
        "The intermediate takes a proton from the medium: net addition of \\(\\ce{Nu-}\\) and \\(\\ce{H+}\\) across C=O.",
      ],
    },
    {
      title: "Rosenmund reduction and Stephen reaction",
      steps: [
        "Acyl chloride is hydrogenated over Pd on \\(\\ce{BaSO4}\\): \\(\\ce{C6H5COCl + H2 ->[Pd-BaSO4] C6H5CHO + HCl}\\).",
        "Stephen: nitrile reduced to imine by \\(\\ce{SnCl2}\\) and HCl, then hydrolysed: \\(\\ce{RCN + SnCl2 + 2HCl -> RCH=NH + SnCl4}\\); \\(\\ce{RCH=NH + H2O -> RCHO + NH3}\\).",
        "Nitriles (and esters) are also reduced to aldehydes by DIBAL-H, then \\(\\ce{H2O}\\): \\(\\ce{CH3CN ->[1. AlH(i-Bu)2][2. H2O] CH3CHO}\\).",
      ],
    },
    {
      title: "Aromatic aldehydes from hydrocarbons: Etard reaction, chromic oxide, Gatterman-Koch",
      steps: [
        "Etard: chromyl chloride oxidises the methyl group to a chromium complex; hydrolysis gives benzaldehyde: \\(\\ce{C6H5CH3 ->[1. CrO2Cl2, CS2][2. H3O+] C6H5CHO}\\).",
        "\\(\\ce{CrO3}\\) in acetic anhydride gives benzylidene diacetate, hydrolysed by aqueous acid to benzaldehyde.",
        "Side chain chlorination: toluene to benzal chloride, hydrolysed to benzaldehyde (commercial method).",
        "Gatterman-Koch: \\(\\ce{C6H6 + CO ->[HCl, anhyd. AlCl3/CuCl] C6H5CHO}\\).",
      ],
    },
    {
      title: "Preparation of ketones",
      steps: [
        "Dialkylcadmium: \\(\\ce{2CH3MgBr + CdCl2 -> (CH3)2Cd + 2MgBrCl}\\); \\(\\ce{2C6H5COCl + (CH3)2Cd -> 2C6H5COCH3 + CdCl2}\\).",
        "Nitrile + Grignard reagent, then hydrolysis: \\(\\ce{CH3CH2CN + C6H5MgBr ->[1. ether][2. H3O+] C6H5COCH2CH3}\\) (propiophenone).",
        "Friedel-Crafts acylation: \\(\\ce{C6H6 + CH3COCl ->[anhyd. AlCl3] C6H5COCH3 + HCl}\\).",
      ],
    },
    {
      title: "Clemmensen and Wolff-Kishner reduction",
      steps: [
        "Both reduce the carbonyl group to \\(\\ce{-CH2-}\\).",
        "Clemmensen (zinc amalgam, conc. HCl): \\(\\ce{CH3COCH3 + 4[H] ->[Zn-Hg, conc. HCl] CH3CH2CH3 + H2O}\\).",
        "Wolff-Kishner: hydrazine gives the hydrazone, \\(\\ce{>C=O + H2N-NH2 -> >C=N-NH2 + H2O}\\); then heat with KOH in ethylene glycol: \\(\\ce{>C=N-NH2 -> >CH2 + N2}\\).",
      ],
    },
    {
      title: "Aldol and cross aldol condensation",
      steps: [
        "Aldehydes and ketones with at least one α-hydrogen, dilute alkali: \\(\\ce{2CH3CHO ->[dil. NaOH] CH3CH(OH)CH2CHO}\\) (3-hydroxybutanal, the aldol).",
        "The aldol loses water: \\(\\ce{CH3CH(OH)CH2CHO ->[heat] CH3CH=CHCHO + H2O}\\) (but-2-enal, an α,β-unsaturated aldehyde).",
        "Cross aldol (two different carbonyl compounds; both with α-H gives four products): \\(\\ce{C6H5CHO + CH3COC6H5 ->[dil. NaOH, heat] C6H5CH=CHCOC6H5 + H2O}\\).",
      ],
    },
    {
      title: "Cannizzaro reaction",
      steps: [
        "Aldehydes with **no α-hydrogen**, heated with concentrated alkali, undergo self oxidation and reduction (disproportionation).",
        "\\(\\ce{2HCHO + KOH -> CH3OH + HCOOK}\\).",
        "\\(\\ce{2C6H5CHO + NaOH -> C6H5CH2OH + C6H5COONa}\\): one molecule becomes alcohol, the other the acid salt.",
      ],
    },
    {
      title: "Preparation of carboxylic acids",
      steps: [
        "Grignard reagent with dry ice, then acid: \\(\\ce{CH3MgBr + CO2 -> CH3COOMgBr ->[H3O+] CH3COOH}\\) (one carbon more than the halide).",
        "Alkylbenzenes, vigorous oxidation (whole side chain): \\(\\ce{C6H5CH2CH3 ->[KMnO4, KOH, heat][H3O+] C6H5COOH}\\).",
        "Nitriles hydrolysed via amides: \\(\\ce{CH3CN ->[H+, H2O] CH3CONH2 ->[H+, H2O] CH3COOH}\\).",
      ],
    },
    {
      title: "Reactions of carboxylic acids",
      steps: [
        "Anhydride: \\(\\ce{2CH3COOH ->[P2O5, heat] (CH3CO)2O + H2O}\\). Ester: \\(\\ce{CH3COOH + C2H5OH <=>[conc. H2SO4] CH3COOC2H5 + H2O}\\).",
        "\\(\\ce{CH3COOH + PCl5 -> CH3COCl + POCl3 + HCl}\\) (\\(\\ce{SOCl2}\\) preferred: by-products are gases).",
        "Amide: \\(\\ce{CH3COOH + NH3 <=> CH3COONH4 ->[heat] CH3CONH2 + H2O}\\). Reduction: \\(\\ce{LiAlH4}\\) or \\(\\ce{B2H6}\\) gives a 1° alcohol.",
      ],
    },
    {
      title: "Decarboxylation and Hell-Volhard-Zelinsky reaction",
      steps: [
        "Sodium salt heated with soda lime (NaOH : CaO = 3 : 1) loses \\(\\ce{CO2}\\): \\(\\ce{CH3COONa + NaOH ->[CaO, heat] CH4 + Na2CO3}\\); sodium benzoate gives benzene.",
        "HVZ: acids with an α-hydrogen, \\(\\ce{Cl2}\\) or \\(\\ce{Br2}\\) and a little red P, give α-halo acids: \\(\\ce{CH3CH2COOH ->[1. Cl2, red P][2. H2O] CH3CH(Cl)COOH}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Orbital diagram of the carbonyl group (Fig. 8.1)",
      labels: ["sp2 carbon, three sigma bonds", "pi bond from p orbitals of C and O", "two lone pairs on O", "bond angles about 120°"],
    },
    {
      title: "Nucleophilic attack on carbonyl carbon (Fig. 8.2)",
      labels: ["Nu attacking perpendicular to the plane", "planar sp2 reactant", "tetrahedral sp3 alkoxide intermediate", "proton added to O"],
    },
  ],
  mostAsked: [
    {
      topic: "Conversions in two or three steps (benzoic acid to benzaldehyde, ethanal to but-2-enal, toluene to benzoic acid, nitrile to ketone)",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Name reactions: Rosenmund, Stephen, Etard, Cannizzaro, aldol, Clemmensen, Wolff-Kishner, HVZ, decarboxylation",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Reactivity in nucleophilic addition (order towards HCN, benzaldehyde against propanal), its mechanism, and acidity of α-hydrogens",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Products with HCN, alcohols (acetal), NH2OH, semicarbazide, 2,4-DNP, Tollens' reagent and NaBH4",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Identify the compound from 2,4-DNP, Tollens', Fehling and iodoform results",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Chemical tests to distinguish pairs (Tollens', Fehling, iodoform, NaHCO3)",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Acid strength of carboxylic acids: halogen and nitro groups, formic against acetic, acid against phenol",
      marks: 1,
      years: [2026, 2024, 2023, 2022],
    },
    {
      topic: "Carboxyl group: no Friedel-Crafts, meta directing, no carbonyl reactions, high boiling point",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Giving Cannizzaro reaction for ethanal",
      body: "Cannizzaro needs an aldehyde with **no α-hydrogen** (HCHO, \\(\\ce{C6H5CHO}\\), \\(\\ce{(CH3)3CCHO}\\)) and concentrated alkali. Ethanal has α-hydrogens, so with dilute alkali it gives aldol condensation.",
    },
    {
      title: "Writing an alcohol for Clemmensen or Wolff-Kishner",
      body: "They reduce >C=O right down to \\(\\ce{-CH2-}\\): propanone gives **propane**. \\(\\ce{NaBH4}\\) or \\(\\ce{LiAlH4}\\) would give propan-2-ol.",
    },
    {
      title: "Using Fehling's test on benzaldehyde",
      body: "Aromatic aldehydes do not respond to Fehling's test. Use **Tollens'** for benzaldehyde against acetophenone, and **iodoform** for acetophenone against benzophenone, or pentan-2-one against pentan-3-one.",
    },
    {
      title: "Forgetting the poisoned catalyst in Rosenmund reduction",
      body: "Write **Pd-\\(\\ce{BaSO4}\\)**. The poisoned catalyst stops the reduction at the aldehyde; plain Pd would go on to the alcohol.",
    },
    {
      title: "Ordering acid strength the wrong way",
      body: "Smaller pKa means stronger acid. More electronegative or more halogens, and nearer to -COOH, means stronger: \\(\\ce{CF3COOH}\\) > \\(\\ce{CCl3COOH}\\); \\(\\ce{CH3CH(Br)COOH}\\) > \\(\\ce{BrCH2CH2COOH}\\). Alkyl groups weaken: \\(\\ce{(CH3)2CHCOOH}\\) is weakest.",
    },
    {
      title: "Using both -NH2 groups of semicarbazide",
      body: "Only the -NH2 away from C=O reacts: the one next to C=O has its lone pair in resonance with the carbonyl group. The product is \\(\\ce{>C=N-NH-CO-NH2}\\).",
    },
  ],
};

export default sheet;
