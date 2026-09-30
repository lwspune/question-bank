import type { SubtopicNote } from "@/app/notes/_types";

export const PROPERTIES_ALC_NOTE: SubtopicNote = {
  subtopicName: "Classification, Preparation and Physical Properties",
  title: "Classification, Preparation and Physical Properties",
  oneLineDefinition:
    "An alcohol is primary, secondary or tertiary by the number of carbons on the carbinol carbon; it is made by hydration, hydroboration, reduction or a Grignard reagent, and hydrogen bonding gives it a far higher boiling point than an ether or alkane of similar mass.",
  whyItMatters:
    "Thirteen PYQs, twelve of them multiple choice, and three from 2026. Five ask which route makes an alcohol, from Grignard reagents and hydroboration to the controlled oxidation of alkanes and fermentation, and which routes never do. Eight test the class of an alcohol, the common names of phenols, boiling points, solubility in water and the hydrogen bond in o-nitrophenol.",
  concepts: [
    // C1 — routes to alcohols
    {
      kind: "reference" as const,
      slug: "jcalc-alcohol-preparation",
      name: "Routes that make alcohols, and routes that do not",
      intuition:
        "An alcohol forms when an OH ends up on an sp³ carbon. Water can add across a C=C, hydride can add to a C=O, or a Grignard carbon can add to a C=O. Routes that break C=C bonds (ozonolysis) or add water to a C≡C (it tautomerises to a ketone) give carbonyl compounds instead.",
      definition:
        "- **Acid hydration** follows Markovnikov's rule through a carbocation, so the carbon skeleton can rearrange.\n" +
        "- **Hydroboration–oxidation** gives the anti-Markovnikov alcohol with no carbocation and no rearrangement.\n" +
        "- **Reduction**: aldehydes give 1° alcohols and ketones give 2° alcohols (\\(\\mathrm{H_2/Pd}\\), \\(\\mathrm{NaBH_4}\\), \\(\\mathrm{LiAlH_4}\\)). Acids need \\(\\mathrm{LiAlH_4}\\) or \\(\\mathrm{B_2H_6}\\); \\(\\mathrm{NaBH_4}\\) does not reduce them.\n" +
        "- **Grignard reagent + carbonyl**, then \\(\\mathrm{H_3O^+}\\): HCHO gives a 1°, any other aldehyde a 2°, a ketone a 3° alcohol.\n" +
        "- **Controlled oxidation of alkanes**: \\(\\mathrm{2CH_4 + O_2}\\) over Cu at 523 K and 100 atm gives \\(\\mathrm{CH_3OH}\\); \\(\\mathrm{(CH_3)_3CH}\\) with \\(\\mathrm{KMnO_4}\\) gives \\(\\mathrm{(CH_3)_3COH}\\).",
      table: {
        columns: ["Route", "Reagents", "Product", "Watch for"],
        rows: [
          { cells: ["Acid hydration of an alkene", "Dilute \\(\\mathrm{H_2SO_4}\\) (water, \\(\\mathrm{H^+}\\))", "Markovnikov alcohol: \\(\\mathrm{CH_3CH{=}CH_2 \\to CH_3CH(OH)CH_3}\\)", "Goes through a carbocation, so methyl and hydride shifts can occur"] },
          { cells: ["Hydroboration–oxidation", "\\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/OH^-}\\)", "Anti-Markovnikov alcohol: \\(\\mathrm{CH_3CH{=}CH_2 \\to CH_3CH_2CH_2OH}\\)", "No carbocation, so no rearrangement"] },
          { cells: ["Reduction of aldehydes and ketones", "\\(\\mathrm{H_2/Pd}\\), \\(\\mathrm{NaBH_4}\\) or \\(\\mathrm{LiAlH_4}\\)", "Aldehyde → 1° alcohol; ketone → 2° alcohol", "Hydrogen adds across the C=O"] },
          { cells: ["Reduction of acids and esters", "\\(\\mathrm{LiAlH_4}\\) or \\(\\mathrm{B_2H_6}\\) for acids; esters also by \\(\\mathrm{H_2}\\) over a catalyst", "Primary alcohol \\(\\mathrm{RCH_2OH}\\)", "\\(\\mathrm{NaBH_4}\\) leaves a COOH group alone"] },
          { cells: ["Grignard reagent + carbonyl", "RMgX in dry ether, then \\(\\mathrm{H_3O^+}\\)", "HCHO → 1°; RCHO → 2°; \\(\\mathrm{R_2CO}\\) → 3°", "The new C–C bond forms at the old carbonyl carbon"] },
          { cells: ["Hydrolysis of an alkyl halide", "Aqueous NaOH or KOH", "Alcohol with the OH where the halogen was", "Aryl halides do not react under these conditions"] },
          { cells: ["Controlled oxidation of alkanes", "\\(\\mathrm{2CH_4 + O_2}\\), Cu, 523 K, 100 atm; \\(\\mathrm{(CH_3)_3CH + KMnO_4}\\)", "\\(\\mathrm{CH_3OH}\\); \\(\\mathrm{(CH_3)_3COH}\\)", "With \\(\\mathrm{Mo_2O_3}\\) methane gives HCHO; with \\(\\mathrm{(CH_3COO)_2Mn}\\) alkanes give acids"] },
          { cells: ["Methanol from water gas", "\\(\\mathrm{CO + 2H_2}\\), \\(\\mathrm{ZnO{-}Cr_2O_3}\\), 573–673 K, 200–300 atm", "\\(\\mathrm{CH_3OH}\\)", "The industrial route to methanol"] },
          { cells: ["Fermentation", "Sugar with yeast (invertase, then zymase)", "Ethanol and \\(\\mathrm{CO_2}\\)", "Air must be kept out, or ethanol is oxidised to ethanoic acid"] },
          { cells: ["Ozonolysis of an alkene", "\\(\\mathrm{O_3}\\), then Zn and water", "Aldehydes and ketones", "Never an alcohol: the C=C is cut in two"] },
          { cells: ["Hydration of an alkyne", "Water with \\(\\mathrm{HgSO_4/H_2SO_4}\\)", "A ketone; ethyne alone gives the aldehyde ethanal", "The enol formed first tautomerises; no alcohol survives"] },
        ],
        caption: "Match the product class to the carbonyl: HCHO, other aldehydes and ketones give 1°, 2° and 3° alcohols with a Grignard reagent.",
      },
      selfCheckExample: {
        prompt: "Choose a Grignard reagent and a carbonyl compound that give 2-methylbutan-2-ol, \\(\\mathrm{(CH_3)_2C(OH)CH_2CH_3}\\), after hydrolysis.",
        steps: [
          "The product is a tertiary alcohol, so the carbonyl compound must be a ketone.",
          "Cut one of the three groups off the carbinol carbon. Removing the ethyl group leaves propanone, \\(\\mathrm{(CH_3)_2CO}\\).",
          "So ethylmagnesium bromide adds to propanone, and \\(\\mathrm{H_3O^+}\\) gives the alcohol.",
        ],
        answer: "\\(\\mathrm{CH_3CH_2MgBr}\\) + propanone (or \\(\\mathrm{CH_3MgBr}\\) + butan-2-one), then \\(\\mathrm{H_3O^+}\\).",
      },
      practiceSet: [
        { prompt: "Which route turns propene into propan-1-ol?", answer: "Hydroboration–oxidation (\\(\\mathrm{B_2H_6}\\), then \\(\\mathrm{H_2O_2/OH^-}\\))" },
        { prompt: "What does HCHO give with \\(\\mathrm{CH_3MgBr}\\), followed by hydrolysis?", answer: "Ethanol, a primary alcohol" },
        { prompt: "Can ozonolysis of an alkene give an alcohol?", answer: "No; it gives aldehydes and ketones" },
        { prompt: "Which alcohol forms when 2-methylpropane is oxidised by \\(\\mathrm{KMnO_4}\\)?", answer: "2-Methylpropan-2-ol, \\(\\mathrm{(CH_3)_3COH}\\)" },
      ],
      pyqExampleId: "4f4b89ce-eaf0-4b33-b75d-d8a23d4080cf", // 2023 — ozonolysis is not a route to alcohols
      traps: [
        {
          title: "Acid hydration can move a methyl group",
          body: "3,3-Dimethylbut-1-ene with dilute acid gives 2,3-dimethylbutan-2-ol, not 3,3-dimethylbutan-2-ol: the secondary cation takes a 1,2-methyl shift first. Hydroboration of the same alkene gives 3,3-dimethylbutan-1-ol, with no shift.",
        },
        {
          title: "NaBH₄ does not reduce a carboxylic acid",
          body: "An acid or ester needs \\(\\mathrm{LiAlH_4}\\) (or \\(\\mathrm{B_2H_6}\\) for an acid). \\(\\mathrm{NaBH_4}\\) reduces only aldehydes and ketones.",
        },
      ],
    },

    // C2 — classes, names, boiling points, solubility
    {
      kind: "formula" as const,
      slug: "jcalc-physical-properties",
      name: "Classes, common names and boiling points",
      intuition:
        "An alcohol's O–H hydrogen-bonds to the O of its neighbour, so its molecules stick together far more than those of an ether, aldehyde or alkane of the same size. Boiling point follows that stickiness. Water can hydrogen-bond to the same O, so small alcohols and ethers dissolve; a longer carbon chain drags solubility down.",
      definition:
        "- **1°, 2°, 3°**: count the carbons bonded to the carbinol carbon (ring carbons count). Cyclohexanol is 2°; 1-methylcyclohexan-1-ol is 3°.\n" +
        "- **Common names**: benzene-1,2-diol is catechol, benzene-1,3-diol is resorcinol, benzene-1,4-diol is quinol (hydroquinone); the methylphenols are the cresols.\n" +
        "- At similar molar mass the boiling point rises: alkane < ether < aldehyde or ketone < alcohol.\n" +
        "- Within a series the boiling point rises with the number of carbons and falls with branching.\n" +
        "- Ethoxyethane and butan-1-ol dissolve in water to a similar extent (about 7.5 and 9 g per 100 mL); solubility falls as the alkyl part grows.\n" +
        "- Sodium reacts with an alcohol (it gives \\(\\mathrm{H_2}\\)) but not with an ether, so sodium can dry ether but not ethanol.\n" +
        "- **o-Nitrophenol** has an intramolecular hydrogen bond: lower melting and boiling point than p-nitrophenol, and it is steam volatile.",
      formula: {
        label: "Boiling point at similar molar mass",
        latex:
          "\\text{alkane} < \\text{ether} < \\text{aldehyde, ketone} < \\text{alcohol} < \\text{carboxylic acid}",
      },
      authoredExample: {
        prompt:
          "Arrange propane, methoxymethane, ethanal and ethanol in increasing order of boiling point. Their molar masses are close (44 to 46 g mol\\(^{-1}\\)).",
        steps: [
          "With similar masses, the intermolecular forces decide.",
          "Propane has only dispersion forces: 231 K.",
          "Methoxymethane has a weak dipole but no O–H: 248 K.",
          "Ethanal has a stronger C=O dipole: 293 K.",
          "Ethanol hydrogen-bonds through its O–H: 351 K.",
        ],
        answer: "Propane < methoxymethane < ethanal < ethanol.",
      },
      selfCheckExample: {
        prompt:
          "Classify butan-1-ol, butan-2-ol and 2-methylpropan-2-ol as 1°, 2° or 3°, and arrange them in increasing order of boiling point.",
        steps: [
          "The carbinol carbon carries one, two and three other carbons: 1°, 2° and 3°.",
          "All three are \\(\\mathrm{C_4H_{10}O}\\) and all hydrogen-bond, so branching decides.",
          "More branching gives a more compact molecule, less surface contact and a lower boiling point (391 K, 373 K and 355 K).",
        ],
        answer: "2-Methylpropan-2-ol (3°) < butan-2-ol (2°) < butan-1-ol (1°).",
      },
      practiceSet: [
        { prompt: "What is the common name of benzene-1,3-diol?", answer: "Resorcinol" },
        { prompt: "Is cyclohexanol a primary, secondary or tertiary alcohol?", answer: "Secondary" },
        { prompt: "Which is steam volatile: o-nitrophenol or p-nitrophenol?", answer: "o-Nitrophenol" },
        { prompt: "Can sodium metal be used to dry ethanol?", answer: "No; it reacts with ethanol to give sodium ethoxide and \\(\\mathrm{H_2}\\)" },
      ],
      pyqExampleId: "fc5679a7-25ee-40ec-85bc-97aa3611c105", // 2023 — butan-1-ol boils above ethoxyethane (hydrogen bonding)
      traps: [
        {
          title: "Isomers can differ by 80 K",
          body: "Butan-1-ol (391 K) and ethoxyethane (308 K) have the same formula, \\(\\mathrm{C_4H_{10}O}\\). The gap comes only from hydrogen bonding between alcohol molecules.",
        },
        {
          title: "Ring carbons count as carbon neighbours",
          body: "A ring OH on a CH is secondary; a ring OH on a carbon that also carries a methyl group is tertiary. Count every carbon bonded to the carbinol carbon, inside the ring or outside it.",
        },
        {
          title: "The chelated isomer melts lower",
          body: "o-Nitrophenol (about 45 °C) melts far below p-nitrophenol (about 114 °C). Its hydrogen bond is inside one molecule, so it does not hold molecules together.",
        },
      ],
    },
  ],
};
