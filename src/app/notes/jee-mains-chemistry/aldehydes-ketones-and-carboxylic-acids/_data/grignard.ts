import type { SubtopicNote } from "@/app/notes/_types";

export const GRIGNARD_ALD_NOTE: SubtopicNote = {
  subtopicName: "Grignard Reagents with Carbonyls and Nitriles",
  title: "Grignard Reagents with Carbonyls and Nitriles",
  oneLineDefinition:
    "A Grignard reagent adds an alkyl or aryl group to a carbonyl carbon: methanal gives a 1° alcohol, other aldehydes a 2° alcohol, ketones and esters a 3° alcohol, a nitrile gives a ketone and carbon dioxide an acid.",
  whyItMatters:
    "Seventeen PYQs, two numerical, one from 2026. Eleven add a Grignard reagent to an aldehyde, a ketone or an ester, or ask how many equivalents are used up; six add it to a nitrile, to carbon dioxide or to water.",
  concepts: [
    // C1 — carbonyls and esters
    {
      kind: "formula" as const,
      slug: "jcald-grignard-carbonyl",
      name: "Grignard addition to aldehydes, ketones and esters",
      intuition:
        "In RMgX the carbon bonded to magnesium carries a negative charge, so the reagent behaves like R⁻. It is a strong nucleophile, and it adds once to a C=O; water then turns the magnesium alkoxide into the alcohol. It is also a strong base, so any acidic hydrogen in the molecule destroys it first.",
      definition:
        "- Methanal gives a 1° alcohol, any other aldehyde a 2° alcohol, and a ketone a 3° alcohol.\n" +
        "- An ester uses **two** equivalents. The first adds and pushes out the alkoxide, which leaves a ketone; the ketone adds a second R. The 3° alcohol carries two identical R groups from the reagent.\n" +
        "- Each acidic hydrogen (OH, NH, COOH, or the H of a terminal alkyne) uses up one more equivalent, giving RH.\n" +
        "- **Working backwards**: a 3° alcohol has three groups on the carbinol carbon. Take any one of them as the R of the Grignard; the other two, with the carbinol carbon, form the ketone.\n" +
        "- A Grignard reagent cannot be made from a halide that also carries a C=O or an OH: it would react with that group in its own or a neighbouring molecule.\n" +
        "- With a copper(I) salt present, the reagent adds to the C=C end of an α,β-unsaturated ketone (1,4-addition) instead of to the C=O.",
      formula: {
        label: "Grignard addition, then hydrolysis",
        latex:
          "\\mathrm{R'COR'' \\xrightarrow{(i)\\ RMgX,\\ (ii)\\ H_3O^+} R'R''C(OH)R} \\qquad \\mathrm{HCHO} \\to 1^\\circ,\\ \\mathrm{R'CHO} \\to 2^\\circ,\\ \\text{ketone or ester} \\to 3^\\circ",
      },
      authoredExample: {
        prompt: "Give two combinations of a Grignard reagent and a ketone that make 3-methylpentan-3-ol, \\(\\mathrm{CH_3CH_2C(OH)(CH_3)CH_2CH_3}\\).",
        steps: [
          "The carbinol carbon carries CH₃, C₂H₅ and C₂H₅.",
          "Take CH₃ as the Grignard group: the other two groups and the carbinol carbon form pentan-3-one, \\(\\mathrm{CH_3CH_2COCH_2CH_3}\\).",
          "Take C₂H₅ as the Grignard group: the remaining CH₃ and C₂H₅ form butan-2-one, \\(\\mathrm{CH_3COCH_2CH_3}\\).",
        ],
        answer: "\\(\\mathrm{CH_3MgBr}\\) with pentan-3-one, or \\(\\mathrm{C_2H_5MgBr}\\) with butan-2-one",
      },
      selfCheckExample: {
        prompt: "How many moles of \\(\\mathrm{C_2H_5MgBr}\\) does one mole of ethyl 3-hydroxypropanoate, \\(\\mathrm{HOCH_2CH_2COOC_2H_5}\\), use up with excess reagent, and what is the product after hydrolysis?",
        steps: [
          "The OH is acidic: one mole is destroyed, giving ethane.",
          "The ester takes two moles: the first gives a ketone, the second adds to it.",
          "After hydrolysis the old ester carbon carries OH and two ethyl groups: \\(\\mathrm{HOCH_2CH_2C(OH)(C_2H_5)_2}\\).",
        ],
        answer: "Three moles; 3-ethylpentane-1,3-diol",
      },
      practiceSet: [
        { prompt: "Which class of alcohol does a Grignard reagent give with methanal?", answer: "Primary" },
        { prompt: "What does \\(\\mathrm{CH_3MgBr}\\) give with propanal, then \\(\\mathrm{H_3O^+}\\)?", answer: "Butan-2-ol, \\(\\mathrm{CH_3CH_2CH(OH)CH_3}\\)" },
        { prompt: "How many equivalents of \\(\\mathrm{C_6H_5MgBr}\\) turn methyl benzoate into triphenylmethanol?", answer: "Two" },
        { prompt: "Why can a Grignard reagent not be made from 4-bromobutan-1-ol?", answer: "The OH hydrogen is acidic and destroys the reagent as it forms" },
      ],
      pyqExampleId: "43c27eca-678b-48da-b7dc-da147a2e1156", // 2025 — C3H6O ketone, its alcohol, the bromide and the Grignard product
      traps: [
        {
          title: "Esters take two equivalents, plus one for each acidic H",
          body: "Count the ester first (two), then add one for every OH, NH, COOH or terminal alkyne C–H in the molecule. The acidic H reacts first, before any addition.",
        },
        {
          title: "A terminal alkyne is an acid to a Grignard",
          body: "\\(\\mathrm{RC{\\equiv}CH + CH_3MgBr \\to RC{\\equiv}CMgBr + CH_4}\\). The reagent is consumed and methane is given off, even though no C=O has reacted.",
        },
      ],
    },

    // C2 — nitriles, CO2 and water
    {
      kind: "formula" as const,
      slug: "jcald-grignard-nitrile",
      name: "Grignard reagents with nitriles, carbon dioxide and water",
      intuition:
        "A nitrile and carbon dioxide each take only one R group. The nitrile stops at an imine salt, which is not attacked again; water later turns it into a ketone. Carbon dioxide gives a carboxylate. Water simply protonates R to give the alkane.",
      definition:
        "- **Nitrile**: \\(\\mathrm{R'C{\\equiv}N + RMgX \\to R'C(R){=}NMgX}\\); hydrolysis gives the ketone \\(\\mathrm{R'COR}\\).\n" +
        "- **Carbon dioxide** (dry ice): \\(\\mathrm{RMgX + CO_2 \\to RCOOMgX}\\); acid gives \\(\\mathrm{RCOOH}\\), which has one carbon more than R.\n" +
        "- **Water**: \\(\\mathrm{RMgX + H_2O \\to RH + Mg(OH)X}\\). The gas RH identifies R: its molar mass is its mass × 22.4 L divided by its volume at STP.\n" +
        "- A methyl ketone made from a nitrile and \\(\\mathrm{CH_3MgBr}\\) gives the iodoform test; it does not give Tollens' or Fehling's test.",
      formula: {
        label: "One R group only: nitrile to ketone, CO₂ to acid",
        latex:
          "\\mathrm{R'C{\\equiv}N \\xrightarrow{(i)\\ RMgX,\\ (ii)\\ H_3O^+} R'COR} \\qquad \\mathrm{RMgX \\xrightarrow{(i)\\ CO_2,\\ (ii)\\ H_3O^+} RCOOH}",
      },
      authoredExample: {
        prompt: "A Grignard reagent RMgBr gives a gas with water; 7.5 g of the gas occupies 5.6 L at STP. Identify R, and give the products of RMgBr with dry ice (then acid) and with propanenitrile (then acid).",
        steps: [
          "Moles of gas \\(= 5.6/22.4 = 0.25\\); molar mass \\(= 7.5/0.25 = 30\\) g mol⁻¹, so the gas is ethane and R is \\(\\mathrm{C_2H_5}\\).",
          "With CO₂: \\(\\mathrm{C_2H_5COOH}\\), propanoic acid, one carbon more than R.",
          "With \\(\\mathrm{CH_3CH_2CN}\\): the imine salt hydrolyses to \\(\\mathrm{CH_3CH_2COCH_2CH_3}\\).",
        ],
        answer: "R = ethyl; propanoic acid; pentan-3-one",
      },
      selfCheckExample: {
        prompt: "What is formed when butanenitrile is treated with phenylmagnesium bromide and the product is hydrolysed?",
        steps: [
          "The phenyl group adds to the nitrile carbon, giving an imine salt.",
          "Hydrolysis replaces C=N by C=O.",
        ],
        answer: "1-Phenylbutan-1-one, \\(\\mathrm{C_6H_5COCH_2CH_2CH_3}\\)",
      },
      practiceSet: [
        { prompt: "What does \\(\\mathrm{C_6H_5MgBr}\\) give with dry ice, then \\(\\mathrm{H_3O^+}\\)?", answer: "Benzoic acid" },
        { prompt: "What does ethanenitrile give with \\(\\mathrm{C_2H_5MgBr}\\), then \\(\\mathrm{H_3O^+}\\)?", answer: "Butan-2-one" },
        { prompt: "Which gas does \\(\\mathrm{C_2H_5MgBr}\\) give with water?", answer: "Ethane" },
        { prompt: "Why does a second R group not add to a nitrile?", answer: "The imine salt carries a negative nitrogen and is not attacked again; the ketone appears only on hydrolysis" },
      ],
      pyqExampleId: "086a06ab-0d19-40e5-ad5a-4380566d78ab", // 2026 — gas volume identifies R; dry ice gives the acid
      traps: [
        {
          title: "The ketone appears only after water",
          body: "Before hydrolysis the product is the imine salt, so the ketone never meets the Grignard reagent. That is why a nitrile, unlike an ester, gives a ketone and not a 3° alcohol.",
        },
        {
          title: "Carbon dioxide adds a carbon",
          body: "The acid from \\(\\mathrm{RMgX}\\) and \\(\\mathrm{CO_2}\\) has one more carbon than R. Propylmagnesium bromide gives butanoic acid, not propanoic acid.",
        },
      ],
    },
  ],
};
