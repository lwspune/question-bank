import type { SubtopicNote } from "@/app/notes/_types";

export const ALDOL_ALD_NOTE: SubtopicNote = {
  subtopicName: "Enols and Aldol Condensation",
  title: "Enols and Aldol Condensation",
  oneLineDefinition:
    "A hydrogen on the carbon next to a C=O is acidic; its enolate adds to a second carbonyl group (the aldol reaction), and the product loses water on heating, between two molecules or within one.",
  whyItMatters:
    "Seventeen PYQs, two numerical, two from 2026. Six rank α-hydrogen acidity or enol content; six predict the product of a self-aldol condensation; five close a ring by an intramolecular aldol condensation.",
  concepts: [
    // C1 — alpha-H acidity and enols
    {
      kind: "formula" as const,
      slug: "jcald-enols",
      name: "Acidity of α-hydrogens and enol content",
      intuition:
        "An α-hydrogen is acidic because the anion left behind, the enolate, spreads its negative charge onto the carbonyl oxygen. A second C=O on the same carbon spreads it further, so the hydrogen between two C=O groups is by far the most acidic.",
      definition:
        "- Approximate pKa of the α-H: β-diketone \\(\\mathrm{RCOCH_2COR}\\) about 9; β-keto ester about 11; malonic ester about 13; simple ketone about 19–20.\n" +
        "- An ester C=O acidifies less than a ketone C=O, because the OR oxygen already feeds electrons into it.\n" +
        "- Enol content follows the same features. Propanone contains only a trace of enol. Pentane-2,4-dione is largely enolised, because its enol is conjugated and held by an internal O–H···O hydrogen bond.\n" +
        "- Cyclohexane-1,3,5-trione exists almost entirely as its enol, benzene-1,3,5-triol (phloroglucinol), because that enol is aromatic.\n" +
        "- The enolate is a carbon nucleophile: with an alkyl halide it is alkylated on the α-carbon.",
      formula: {
        label: "Acidity of the α-hydrogen",
        latex:
          "\\mathrm{RCOCH_2COR > RCOCH_2COOR' > R'OOCCH_2COOR' > RCOCH_3}",
      },
      authoredExample: {
        prompt: "Arrange in order of acidity of the most acidic hydrogen: propanone, ethyl 3-oxobutanoate, pentane-2,4-dione, diethyl propanedioate.",
        steps: [
          "Propanone has only one C=O next to its α-carbon: least acidic.",
          "The other three each have a \\(\\mathrm{CH_2}\\) between two C=O groups.",
          "Two ketone C=O groups stabilise the anion most; one ketone and one ester less; two ester groups least.",
        ],
        answer: "Pentane-2,4-dione > ethyl 3-oxobutanoate > diethyl propanedioate > propanone",
      },
      selfCheckExample: {
        prompt: "Which has the higher enol content, cyclohexanone or cyclohexane-1,3-dione? Give the reason.",
        steps: [
          "In cyclohexane-1,3-dione the \\(\\mathrm{CH_2}\\) between the two C=O groups is very acidic.",
          "Its enol has a C=C conjugated with the remaining C=O, which stabilises it.",
          "Cyclohexanone's enol has no such conjugation.",
        ],
        answer: "Cyclohexane-1,3-dione: its enol is conjugated with the second C=O",
      },
      practiceSet: [
        { prompt: "Which hydrogen of ethyl 3-oxobutanoate is most acidic?", answer: "The \\(\\mathrm{CH_2}\\) hydrogens between the two C=O groups" },
        { prompt: "Which has more enol: propanone or pentane-2,4-dione?", answer: "Pentane-2,4-dione" },
        { prompt: "Why is phloroglucinol the stable form of cyclohexane-1,3,5-trione?", answer: "The enol form is an aromatic benzene ring" },
        { prompt: "What does the enolate of pentane-2,4-dione give with \\(\\mathrm{CH_3I}\\)?", answer: "3-Methylpentane-2,4-dione" },
      ],
      pyqExampleId: "6e3a54f6-3d47-4018-84a7-0f9c2f8a6ed9", // 2024 — which diketone has the most acidic hydrogen
      traps: [
        {
          title: "The most acidic H sits between two C=O groups",
          body: "In a 1,3-dicarbonyl compound the \\(\\mathrm{CH_2}\\) between the carbonyls is far more acidic than a terminal \\(\\mathrm{CH_3}\\) next to only one. In a 1,4- or 1,5-diketone no carbon has two C=O neighbours.",
        },
        {
          title: "An ester group helps less than a ketone group",
          body: "Replacing one ketone of a β-diketone by an ester lowers the acidity by about two pKa units, and replacing both lowers it further.",
        },
      ],
    },

    // C2 — self-aldol
    {
      kind: "formula" as const,
      slug: "jcald-aldol-self",
      name: "Self-aldol condensation: predicting the product",
      intuition:
        "Dilute base removes an α-hydrogen. The enolate carbon attacks the carbonyl carbon of a second molecule of the same compound, giving a β-hydroxy aldehyde or ketone (the aldol). On heating, the new OH and an α-hydrogen leave as water, and the C=C that forms is conjugated with the C=O.",
      definition:
        "- The new C–C bond joins the **α-carbon** of one molecule to the **carbonyl carbon** of the other.\n" +
        "- Aldol addition gives the β-hydroxy carbonyl compound; heating removes water to give the α,β-unsaturated compound. Addition plus dehydration is the aldol condensation.\n" +
        "- Ethanal gives 3-hydroxybutanal, then but-2-enal. Propanone with \\(\\mathrm{Ba(OH)_2}\\) gives 4-hydroxy-4-methylpentan-2-one (diacetone alcohol), then 4-methylpent-3-en-2-one (mesityl oxide).\n" +
        "- A cyclic ketone gives a C=C outside the ring it came from: cyclohexanone gives 2-cyclohexylidenecyclohexan-1-one.\n" +
        "- Dehydration needs a hydrogen on the α-carbon of the aldol. If that carbon ends up with no H, the product stays as the β-hydroxy compound.",
      formula: {
        label: "Aldol addition, then dehydration",
        latex:
          "\\mathrm{2\\,RCH_2CHO \\xrightarrow{dil.\\ OH^-} RCH_2CH(OH)CH(R)CHO \\xrightarrow{\\Delta,\\ -H_2O} RCH_2CH{=}C(R)CHO}",
      },
      authoredExample: {
        prompt: "Butanal is warmed with dilute NaOH. Give the aldol and the condensation product.",
        steps: [
          "The enolate forms at C-2 of butanal: \\(\\mathrm{CH_3CH_2CH^-{-}CHO}\\).",
          "It attacks C-1 of a second butanal: \\(\\mathrm{CH_3CH_2CH_2CH(OH){-}CH(C_2H_5){-}CHO}\\), 2-ethyl-3-hydroxyhexanal.",
          "Heating removes the OH and the H on C-2: \\(\\mathrm{CH_3CH_2CH_2CH{=}C(C_2H_5)CHO}\\).",
        ],
        answer: "2-Ethyl-3-hydroxyhexanal, then 2-ethylhex-2-enal",
      },
      selfCheckExample: {
        prompt: "2-Methylpropanal, \\(\\mathrm{(CH_3)_2CHCHO}\\), is treated with dilute NaOH and then heated. Give the product and say whether it dehydrates.",
        steps: [
          "The enolate carbon is \\(\\mathrm{(CH_3)_2C^-}\\); it attacks the CHO of a second molecule.",
          "The aldol is \\(\\mathrm{(CH_3)_2CH{-}CH(OH){-}C(CH_3)_2{-}CHO}\\).",
          "The carbon next to the CHO now has two methyls and no hydrogen, so water cannot be lost.",
        ],
        answer: "3-Hydroxy-2,2,4-trimethylpentanal; it does not dehydrate",
      },
      practiceSet: [
        { prompt: "What is the aldol of ethanal, and what does it give on heating?", answer: "3-Hydroxybutanal; but-2-enal" },
        { prompt: "Can methanal give a self-aldol reaction?", answer: "No: it has no α-hydrogen" },
        { prompt: "What does cyclopentanone give with dilute NaOH and heat?", answer: "2-Cyclopentylidenecyclopentan-1-one" },
        { prompt: "What is the common name of 4-hydroxy-4-methylpentan-2-one?", answer: "Diacetone alcohol" },
      ],
      pyqExampleId: "28e8bd32-b9d5-48e8-afd2-480fde206b69", // 2026 — two routes to propanone, then Ba(OH)2 and heat
      traps: [
        {
          title: "Number the product from the new chain",
          body: "Join the α-carbon of one molecule to the carbonyl carbon of the other, draw the whole chain, then number from the C=O that survives. Naming each half separately gives wrong locants.",
        },
        {
          title: "No α-hydrogen left, no dehydration",
          body: "Water leaves from the OH and an α-hydrogen. If the α-carbon of the aldol carries two alkyl groups and the C=O, the aldol cannot condense further.",
        },
      ],
    },

    // C3 — intramolecular aldol
    {
      kind: "formula" as const,
      slug: "jcald-aldol-intra",
      name: "Intramolecular aldol: which ring closes",
      intuition:
        "When one molecule carries two carbonyl groups, its own enolate can attack its other C=O. Several enolates are possible, but the ring that forms is the one with five or six atoms; three-, four- and seven-membered rings lose.",
      definition:
        "- Count the ring from the enolate carbon to the attacked carbonyl carbon, both included.\n" +
        "- A 1,4-diketone closes a five-membered ring (a cyclopentenone). A 1,5-diketone closes a six-membered ring (a cyclohexenone).\n" +
        "- A 1,6-dicarbonyl compound also closes a five-membered ring, with the other carbonyl group left outside the ring: hexanedial gives cyclopent-1-ene-1-carbaldehyde.\n" +
        "- Both carbons of the new C=C (the enolate carbon and the old carbonyl carbon) are ring atoms. So the C=C of an intramolecular aldol product is always in the ring; an exocyclic \\(\\mathrm{{=}CH_2}\\) next to the C=O cannot come from this reaction.",
      formula: {
        label: "Ring size",
        latex:
          "\\text{ring atoms} = \\text{enolate carbon to attacked carbonyl carbon, both counted}; \\quad 5 \\text{ or } 6 \\text{ wins}",
      },
      authoredExample: {
        prompt: "Heptane-2,6-dione is heated with dilute NaOH. Give the product.",
        steps: [
          "Write the chain \\(\\mathrm{CH_3COCH_2CH_2CH_2COCH_3}\\) and number it C-1 to C-7; the carbonyls are C-2 and C-6.",
          "The enolate at C-7 attacks C-2: the ring is C-2, C-3, C-4, C-5, C-6, C-7, six atoms. (The enolate at C-3 attacking C-6 would give only a four-membered ring.)",
          "Dehydration forms C-2=C-7 in the ring, conjugated with the C-6 carbonyl; C-1 stays as a methyl on C-2.",
        ],
        answer: "3-Methylcyclohex-2-en-1-one",
      },
      selfCheckExample: {
        prompt: "Hexane-2,5-dione is heated with dilute NaOH. Which ring forms, and what is the product?",
        steps: [
          "The enolate at C-1 attacks C-5: ring C-1 to C-5, five atoms.",
          "The enolate at C-3 attacking C-5 would give a three-membered ring, so it does not happen.",
          "Dehydration gives the C=C in the ring, conjugated with the ring C=O, with a methyl on the far end of the C=C.",
        ],
        answer: "A five-membered ring: 3-methylcyclopent-2-en-1-one",
      },
      practiceSet: [
        { prompt: "Which ring size does a 1,5-diketone close?", answer: "Six-membered" },
        { prompt: "What does hexanedial give with base?", answer: "Cyclopent-1-ene-1-carbaldehyde" },
        { prompt: "Why do three- and four-membered rings not form?", answer: "They are highly strained" },
        { prompt: "Can an intramolecular aldol put an exocyclic \\(\\mathrm{{=}CH_2}\\) next to the C=O?", answer: "No: both carbons of the new C=C are ring atoms" },
      ],
      pyqExampleId: "15de75fb-1b49-417d-af49-8f40dd581126", // 2025 — which enone cannot come from an intramolecular aldol
      traps: [
        {
          title: "Count atoms in the ring, not bonds",
          body: "Include both the enolate carbon and the carbonyl carbon. Miscounting by one turns a five-membered ring into a 'four' or a 'six' and sends you to the wrong option.",
        },
        {
          title: "Pick the enolate that makes a five- or six-membered ring",
          body: "A diketone usually has two or more α-carbons. Try each, count the ring, and keep only the one that gives five or six atoms.",
        },
      ],
    },
  ],
};
