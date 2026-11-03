import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Aldehydes, Ketones and Carboxylic Acids (Balbharati
 * Ch. 12). Name reactions and tests in the book's own words; most-asked years
 * from the board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Aldehydes, Ketones and Carboxylic Acids",
  chapterSlug: "aldehydes-ketones-and-carboxylic-acids",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 12",
  keyPoints: [
    {
      term: "Simple and mixed ketones",
      text: "Ketones in which both alkyl groups bonded to the carbonyl carbon are identical are **simple (symmetrical)** ketones, e.g. acetone \\(\\ce{CH3COCH3}\\). If the two groups differ they are **mixed (unsymmetrical)**, e.g. butanone. Acetophenone (pistachio flavour in ice cream) is an aromatic ketone.",
    },
    {
      term: "Aldehydes are more reactive than ketones",
      text: "Alkyl groups have a +I effect: a ketone has two, which lower the positive polarity of the carbonyl carbon, an aldehyde only one. Two bulky alkyl groups also cause **steric hindrance** to the nucleophile. So aldehydes are more easily attacked by nucleophiles.",
    },
    {
      term: "Boiling points and solubility",
      text: "Carbonyl compounds attract one another by dipole-dipole forces. Carboxylic acids have higher boiling points than alkanes, ethers, alcohols, aldehydes and ketones of comparable mass: in the liquid they form a **dimer** held by two hydrogen bonds. Lower aldehydes and ketones dissolve in water because the C=O oxygen hydrogen bonds with water.",
    },
    {
      term: "Tollens' test (silver mirror)",
      text: "When an aldehyde is boiled with Tollens' reagent (ammoniacal silver nitrate), a silver mirror is formed: the aldehyde is oxidized to carboxylate ion and \\(\\ce{Ag+}\\) is reduced to Ag. Ketones do not give it.",
    },
    {
      term: "Fehling test",
      text: "When a mixture of an aldehyde and Fehling solution is boiled in hot water, a **red precipitate of cuprous oxide** is formed (\\(\\ce{Cu^2+}\\) reduced to \\(\\ce{Cu+}\\)). Benzaldehyde does not give it.",
    },
    {
      term: "Sodium nitroprusside test (ketones)",
      text: "The anion of a ketone formed by alkali reacts with nitroprusside ion to form a **red coloured complex**, which shows a ketonic group.",
    },
    {
      term: "Haloform reaction",
      text: "Given by acetaldehyde, all methyl ketones (\\(\\ce{CH3-CO-R}\\)) and alcohols with a \\(\\ce{CH3CH(OH)-}\\) group. Warmed with NaOH and iodine (sodium hypoiodite in situ): a yellow precipitate of iodoform and the sodium salt of an acid with one carbon less.",
    },
    {
      term: "Acetals and cyclic ketals",
      text: "An aldehyde with two molecules of an anhydrous alcohol and dry HCl gives a hemiacetal, then an **acetal**. Ketones react with 1,2- or 1,3-diols and dry HCl to give five or six membered **cyclic ketals**: acetone + ethane-1,2-diol gives a cyclic ketal (a protecting group).",
    },
    {
      term: "Ammonia derivatives (addition-elimination)",
      text: "\\(\\ce{>C=O + H2N-Z -> >C=N-Z + H2O}\\). Hydroxylamine gives an **oxime** (acetaldehyde gives acetaldoxime), hydrazine a hydrazone, 2,4-dinitrophenylhydrazine a **2,4-dinitrophenylhydrazone**.",
    },
    {
      term: "Acidity of carboxylic acids",
      text: "The H of the -COOH group dissociates to give the resonance stabilized carboxylate ion. Lower pKa means a stronger acid. Electron withdrawing groups (halogens, -I effect) raise acidity; electron donating alkyl groups (+I) lower it. Acidity order: carboxylic acid > phenol > alcohol.",
    },
    {
      term: "Decarboxylation",
      text: "Sodium salts of carboxylic acids on heating with **soda lime** give hydrocarbons containing one carbon atom less: \\(\\ce{CH3COONa + NaOH ->[CaO][heat] CH4 + Na2CO3}\\).",
    },
    {
      term: "Reduction of carboxylic acids",
      text: "Carboxylic acids are reduced to primary alcohols by lithium aluminium hydride (or diborane): \\(\\ce{CH3COOH ->[LiAlH4][H3O+] CH3CH2OH}\\).",
    },
    {
      term: "Acid anhydrides",
      text: "Monocarboxylic acids heated with a strong dehydrating agent like \\(\\ce{P2O5}\\) or conc. \\(\\ce{H2SO4}\\) give acid anhydrides: \\(\\ce{2CH3COOH ->[P2O5][heat] (CH3CO)2O + H2O}\\). The reaction is reversible.",
    },
    {
      term: "Ring substitution of aromatic carbonyl compounds",
      text: "The -CHO and >C=O groups withdraw electrons by inductive and resonance effects, deactivate the ring at ortho and para positions, and so give the **meta** product in nitration, sulfonation and halogenation.",
    },
  ],
  formulas: [{ label: "Acid strength", latex: "\\mathrm{p}K_a = -\\log K_a \\qquad \\text{lower } \\mathrm{p}K_a \\Rightarrow \\text{stronger acid}" }],
  derivations: [
    {
      title: "Rosenmund reduction",
      steps: [
        "Acyl chloride is reduced by hydrogen over a palladium catalyst poisoned with barium sulfate.",
        "\\(\\ce{CH3COCl + H2 ->[Pd/BaSO4] CH3CHO + HCl}\\) (acetyl chloride to acetaldehyde).",
        "The poisoned catalyst stops the reduction at the aldehyde stage.",
      ],
    },
    {
      title: "Gatterman-Koch formylation",
      steps: [
        "Benzene is treated under high pressure with CO and HCl in presence of anhydrous \\(\\ce{AlCl3}\\) or CuCl.",
        "\\(\\ce{C6H6 + CO + HCl ->[anhyd. AlCl3/CuCl] C6H5CHO + HCl}\\) (benzaldehyde).",
      ],
    },
    {
      title: "Etard reaction (toluene to benzaldehyde)",
      steps: [
        "The methyl group of toluene is oxidized by chromyl chloride \\(\\ce{CrO2Cl2}\\) in \\(\\ce{CS2}\\) to a chromium complex.",
        "Acid hydrolysis of the complex gives benzaldehyde: \\(\\ce{C6H5CH3 ->[CrO2Cl2, CS2][H3O+] C6H5CHO}\\).",
      ],
    },
    {
      title: "Ketones from acyl chlorides and dialkyl cadmium",
      steps: [
        "Dialkyl cadmium is made from cadmium chloride and Grignard reagent: \\(\\ce{2CH3MgBr + CdCl2 -> (CH3)2Cd + 2MgBrCl}\\).",
        "\\(\\ce{2CH3COCl + (CH3)2Cd -> 2CH3COCH3 + CdCl2}\\) (ethanoyl chloride to propanone).",
      ],
    },
    {
      title: "Aldol condensation of ethanal",
      steps: [
        "Aldehydes with at least one α-hydrogen react in dilute alkali (NaOH, KOH or \\(\\ce{Na2CO3}\\)) to form a β-hydroxy aldehyde (aldol): an addition.",
        "\\(\\ce{2CH3CHO ->[dil. NaOH] CH3-CH(OH)-CH2-CHO}\\) (3-hydroxybutanal).",
        "On warming, aldol loses water: \\(\\ce{CH3-CH(OH)-CH2-CHO ->[heat] CH3-CH=CH-CHO + H2O}\\) (but-2-enal, an α,β-unsaturated aldehyde).",
        "The overall reaction is aldol condensation: a nucleophilic addition-elimination.",
      ],
    },
    {
      title: "Cannizzaro reaction and cross Cannizzaro reaction",
      steps: [
        "Given only by aldehydes with **no α-hydrogen**, on heating with concentrated alkali: self oxidation and reduction (disproportionation).",
        "\\(\\ce{2HCHO + NaOH -> HCOONa + CH3OH}\\); \\(\\ce{2C6H5CHO + NaOH -> C6H5COONa + C6H5CH2OH}\\).",
        "Cross Cannizzaro: formaldehyde with another non-enolisable aldehyde; formaldehyde is oxidized to formate and the other is reduced to alcohol.",
        "\\(\\ce{C6H5CHO + HCHO + NaOH -> C6H5CH2OH + HCOONa}\\).",
      ],
    },
    {
      title: "Clemmensen and Wolff-Kishner reduction",
      steps: [
        "The carbonyl group is reduced to a methylene (\\(\\ce{-CH2-}\\)) group.",
        "Clemmensen: zinc amalgam and conc. HCl, \\(\\ce{CH3COCH3 + 4[H] ->[Zn-Hg, conc. HCl] CH3CH2CH3 + H2O}\\) (propanone to propane).",
        "Wolff-Kishner: hydrazine gives the hydrazone, which is heated with KOH in ethylene glycol: \\(\\ce{>C=O -> >C=N-NH2 -> >CH2 + N2}\\).",
      ],
    },
    {
      title: "Carboxylic acids from Grignard reagent and from alkenes",
      steps: [
        "Grignard reagent in dry ether is added to dry ice; acid hydrolysis gives the acid: \\(\\ce{CH3MgBr + CO2 -> CH3COOMgBr ->[H3O+] CH3COOH}\\).",
        "Alkenes are oxidized by \\(\\ce{KMnO4}\\) in dilute \\(\\ce{H2SO4}\\): cyclohexene gives **adipic acid**, \\(\\ce{HOOC-(CH2)4-COOH}\\) (a dicarboxylic acid).",
      ],
    },
    {
      title: "Conversions of acetic acid",
      steps: [
        "To acetyl chloride: heat with \\(\\ce{PCl5}\\), \\(\\ce{PCl3}\\) or \\(\\ce{SOCl2}\\).",
        "To ethyl acetate (esterification): \\(\\ce{CH3COOH + C2H5OH <=>[conc. H2SO4] CH3COOC2H5 + H2O}\\).",
        "To acetamide: with \\(\\ce{NH3}\\) the ammonium salt forms, which on strong heating loses water; acetyl chloride with \\(\\ce{NH3}\\) also gives acetamide.",
        "To ethanol: \\(\\ce{LiAlH4}\\). To acetic anhydride: heat with \\(\\ce{P2O5}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Dimer of acetic acid", labels: ["two acetic acid molecules", "two hydrogen bonds (dotted)", "C=O and O-H of each"] },
    { title: "Polarity of carbonyl group", labels: ["partial positive charge on C", "partial negative charge on O", "resonance structures"] },
    { title: "2,4-Dinitrophenylhydrazone of acetaldehyde", labels: ["CH3-CH=N-NH- link", "benzene ring", "NO2 at positions 2 and 4"] },
  ],
  mostAsked: [
    {
      topic: "Preparation of aldehydes by name reactions: Rosenmund reduction, Gatterman-Koch formylation, Etard reaction",
      years: [2026, 2025, 2024, 2019],
    },
    {
      topic: "Conversions of acetic acid: to ethyl alcohol, acetic anhydride, ethyl acetate (esterification) or acetamide",
      years: [2026, 2025, 2023, 2020, 2019],
    },
    { topic: "Cannizzaro reaction (methanal, benzaldehyde) or cross Cannizzaro reaction", years: [2026, 2025, 2024, 2014] },
    { topic: "Aldol condensation of ethanal", years: [2026, 2025, 2023, 2014] },
    { topic: "Clemmensen reduction of propanone, or Wolff-Kishner reduction (with ketone from dimethyl cadmium)", years: [2026, 2025, 2024] },
    { topic: "Tests and derivatives: Tollens', Fehling, haloform (sodium hypoiodite on acetone), 2,4-DNP", years: [2026, 2025, 2022] },
    { topic: "Adipic acid: preparation from cyclohexene, structure, dicarboxylic acids", years: [2025, 2024, 2022] },
    { topic: "IUPAC name of a substituted benzaldehyde or acetophenone", years: [2026, 2025, 2019] },
  ],
  mistakes: [
    {
      title: "Giving Cannizzaro reaction for acetaldehyde",
      body: "Cannizzaro needs an aldehyde with **no α-hydrogen** (HCHO, benzaldehyde) and concentrated alkali. Acetaldehyde has α-hydrogens, so with dilute alkali it gives aldol condensation instead.",
    },
    {
      title: "Writing propanol for Clemmensen reduction of propanone",
      body: "Clemmensen and Wolff-Kishner reduce >C=O right down to \\(\\ce{-CH2-}\\): propanone gives **propane**. \\(\\ce{LiAlH4}\\) or \\(\\ce{H2/Ni}\\) would give propan-2-ol.",
    },
    {
      title: "Stopping aldol condensation at the aldol",
      body: "Aldol (3-hydroxybutanal) is the addition product. Condensation means the further loss of water on warming, to but-2-enal.",
    },
    {
      title: "Forgetting the poisoned catalyst in Rosenmund reduction",
      body: "Write \\(\\ce{Pd/BaSO4}\\). Unpoisoned palladium would reduce the aldehyde further to an alcohol.",
    },
    {
      title: "Ordering acidity the wrong way round",
      body: "A larger \\(K_a\\) and a smaller pKa mean a stronger acid. Electron withdrawing groups (Cl, \\(\\ce{NO2}\\)) strengthen an acid; alkyl groups weaken it.",
    },
    {
      title: "Losing the carbon count in haloform and decarboxylation",
      body: "Both give a product with **one carbon less**: acetone with NaOI gives sodium acetate and iodoform; sodium acetate with soda lime gives methane.",
    },
  ],
};

export default sheet;
