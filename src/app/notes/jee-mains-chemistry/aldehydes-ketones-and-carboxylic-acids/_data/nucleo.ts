import type { SubtopicNote } from "@/app/notes/_types";

export const NUCLEO_ALD_NOTE: SubtopicNote = {
  subtopicName: "Nucleophilic Addition and Carbonyl Derivatives",
  title: "Nucleophilic Addition and Carbonyl Derivatives",
  oneLineDefinition:
    "A nucleophile attacks the carbonyl carbon; aldehydes react faster than ketones, and the products include cyanohydrins, bisulphite adducts, acetals, oximes, hydrazones, semicarbazones, imines and enamines.",
  whyItMatters:
    "Twenty-one PYQs, two numerical, two from 2026. Five rank carbonyl compounds by reactivity or ask about hydrates and bisulphite adducts; seven follow a cyanohydrin through hydrolysis or reduction; nine form an acetal, an oxime, a semicarbazone or an enamine.",
  concepts: [
    // C1 — reactivity order
    {
      kind: "formula" as const,
      slug: "jcald-reactivity",
      name: "Reactivity towards nucleophilic addition",
      intuition:
        "A nucleophile attacks the carbonyl carbon because it carries a partial positive charge. Anything that makes that charge larger speeds up addition. Anything that feeds electrons in, or crowds the carbon, slows it down.",
      definition:
        "- Aldehydes are more reactive than ketones. One alkyl group instead of two means less electron donation (+I) and less crowding at the carbon.\n" +
        "- Methanal, with no alkyl group, is the most reactive. Among ketones, bigger groups are slower: propanone reacts faster than a ketone carrying a tert-butyl group.\n" +
        "- Aromatic aldehydes and ketones are less reactive than aliphatic ones. The ring conjugates with the C=O and lowers the positive charge on the carbon.\n" +
        "- On the ring, an electron-withdrawing group (\\(\\mathrm{{-}NO_2}\\), \\(\\mathrm{{-}CN}\\), \\(\\mathrm{{-}Cl}\\)) raises reactivity; a donor (\\(\\mathrm{{-}CH_3}\\), \\(\\mathrm{{-}OCH_3}\\)) lowers it.\n" +
        "- Hydration shows the same order. Methanal is mostly hydrated in water; propanone hardly at all. Strong −I groups give a stable hydrate: chloral forms chloral hydrate, \\(\\mathrm{Cl_3CCH(OH)_2}\\).\n" +
        "- \\(\\mathrm{NaHSO_3}\\) adds to aldehydes and unhindered ketones to give a crystalline bisulphite adduct. Dilute acid or alkali gives the carbonyl compound back, so the adduct is used to purify it.",
      formula: {
        label: "Order of reactivity towards nucleophiles",
        latex:
          "\\mathrm{HCHO > RCHO > RCOR'} \\qquad \\mathrm{RCHO > ArCHO} \\qquad \\text{ring: EWG} > \\text{H} > \\text{EDG}",
      },
      authoredExample: {
        prompt: "Arrange in order of reactivity towards HCN: propanone, methanal, ethanal, 3,3-dimethylbutan-2-one.",
        steps: [
          "Methanal has no alkyl group: the carbon is the most positive and the least crowded.",
          "Ethanal has one methyl group, which donates a little electron density and adds a little bulk.",
          "The two ketones each have two alkyl groups. In 3,3-dimethylbutan-2-one one of them is a bulky tert-butyl group, which blocks the approach of the nucleophile.",
        ],
        answer: "Methanal > ethanal > propanone > 3,3-dimethylbutan-2-one",
      },
      selfCheckExample: {
        prompt: "Arrange in order of reactivity towards nucleophilic addition: 4-methoxybenzaldehyde, 4-chlorobenzaldehyde, 4-formylbenzonitrile.",
        steps: [
          "All three are aromatic aldehydes; only the para group differs.",
          "CN withdraws strongly (−I and −R), Cl withdraws a little overall (its −I beats its +R), and \\(\\mathrm{OCH_3}\\) donates (+R).",
          "The more the group withdraws, the more positive the carbonyl carbon.",
        ],
        answer: "4-Formylbenzonitrile > 4-chlorobenzaldehyde > 4-methoxybenzaldehyde",
      },
      practiceSet: [
        { prompt: "Which adds HCN faster: propanal or propanone?", answer: "Propanal" },
        { prompt: "Which is more reactive: propanal or benzaldehyde?", answer: "Propanal: the ring's conjugation lowers the reactivity of benzaldehyde" },
        { prompt: "Why does chloral form a stable hydrate?", answer: "Three chlorines (−I) make the carbonyl carbon very electron-poor, so the gem-diol is favoured" },
        { prompt: "How is an aldehyde recovered from its bisulphite adduct?", answer: "By warming with dilute acid or dilute alkali" },
      ],
      pyqExampleId: "50c893a1-6001-4633-aeaa-bf1e19060f23", // 2025 — acetophenone, tolualdehyde, benzaldehyde and nitrobenzaldehyde ranked
      traps: [
        {
          title: "A small donor group still slows addition",
          body: "A para-methyl group donates electrons by hyperconjugation, so 4-methylbenzaldehyde is less reactive than benzaldehyde. Do not rank by size of the molecule; rank by the charge on the carbonyl carbon.",
        },
        {
          title: "Aryl ketones are the slowest",
          body: "An aryl ketone has both handicaps: two groups on the carbon and a ring in conjugation. It sits below every aldehyde and below simple dialkyl ketones.",
        },
      ],
    },

    // C2 — cyanohydrins
    {
      kind: "formula" as const,
      slug: "jcald-cyanohydrin",
      name: "Cyanohydrins and what they turn into",
      intuition:
        "Cyanide adds to the carbonyl carbon and the oxygen picks up a proton. The CN group is then a handle: hydrolysis turns it into COOH, and reduction turns it into \\(\\mathrm{CH_2NH_2}\\).",
      definition:
        "- HCN is a weak acid and adds slowly on its own. A trace of base makes \\(\\mathrm{CN^-}\\), the real nucleophile.\n" +
        "- The product \\(\\mathrm{R_2C(OH)CN}\\) is a cyanohydrin. Hydrolysis (acid, or base then acid) gives the 2-hydroxy acid \\(\\mathrm{R_2C(OH)COOH}\\).\n" +
        "- \\(\\mathrm{LiAlH_4}\\) reduces the CN group and gives the 2-amino alcohol \\(\\mathrm{R_2C(OH)CH_2NH_2}\\).\n" +
        "- Hot concentrated \\(\\mathrm{H_2SO_4}\\) hydrolyses and also dehydrates: acetone cyanohydrin gives methacrylic acid, \\(\\mathrm{CH_2{=}C(CH_3)COOH}\\).\n" +
        "- The bisulphite adduct \\(\\mathrm{RCH(OH)SO_3Na}\\) reacts with NaCN to give the same cyanohydrin, without handling HCN.\n" +
        "- When the two groups on the C=O differ, the new carbon is a stereocentre. Cyanide attacks both faces of the flat carbonyl equally, so the product is racemic.",
      formula: {
        label: "Cyanohydrin, then hydrolysis or reduction",
        latex:
          "\\mathrm{R_2C{=}O \\xrightarrow{HCN,\\ OH^-} R_2C(OH)CN} \\qquad \\xrightarrow{H_3O^+} \\mathrm{R_2C(OH)COOH} \\qquad \\xrightarrow{LiAlH_4} \\mathrm{R_2C(OH)CH_2NH_2}",
      },
      authoredExample: {
        prompt: "Propanone is treated with HCN and a little NaOH, and the product is heated with dilute acid. Give the final product and say whether it is optically active.",
        steps: [
          "Cyanide adds to the carbonyl carbon: \\(\\mathrm{(CH_3)_2C(OH)CN}\\), acetone cyanohydrin.",
          "Acid hydrolysis turns CN into COOH: \\(\\mathrm{(CH_3)_2C(OH)COOH}\\).",
          "The central carbon carries two identical methyl groups, so it is not a stereocentre.",
        ],
        answer: "2-Hydroxy-2-methylpropanoic acid, \\(\\mathrm{(CH_3)_2C(OH)COOH}\\); optically inactive",
      },
      selfCheckExample: {
        prompt: "Benzaldehyde is treated with HCN and a trace of base, then with \\(\\mathrm{LiAlH_4}\\) and water. Give the product and say whether it rotates plane-polarised light.",
        steps: [
          "The cyanohydrin is \\(\\mathrm{C_6H_5CH(OH)CN}\\).",
          "\\(\\mathrm{LiAlH_4}\\) turns CN into \\(\\mathrm{CH_2NH_2}\\): \\(\\mathrm{C_6H_5CH(OH)CH_2NH_2}\\).",
          "The carbinol carbon is a new stereocentre, formed equally from both faces.",
        ],
        answer: "2-Amino-1-phenylethan-1-ol, \\(\\mathrm{C_6H_5CH(OH)CH_2NH_2}\\); racemic, so no net rotation",
      },
      practiceSet: [
        { prompt: "What does the cyanohydrin of propanal give on acid hydrolysis?", answer: "2-Hydroxybutanoic acid, \\(\\mathrm{CH_3CH_2CH(OH)COOH}\\)" },
        { prompt: "Why is a little base added to HCN?", answer: "To produce \\(\\mathrm{CN^-}\\), the nucleophile that attacks the carbonyl carbon" },
        { prompt: "Is the cyanohydrin of butanone optically active as formed?", answer: "No: it is racemic" },
        { prompt: "What does the cyanohydrin of methanal give with \\(\\mathrm{LiAlH_4}\\)?", answer: "2-Aminoethanol, \\(\\mathrm{HOCH_2CH_2NH_2}\\)" },
      ],
      pyqExampleId: "6ffae277-3b8d-44fd-be55-d437b35e1b1c", // 2024 — acid, LiAlH4, PCC, HCN, hydrolysis: the hydroxy acid
      traps: [
        {
          title: "HCN addition does not give an amine",
          body: "The product of HCN with a carbonyl compound is the cyanohydrin. An amine appears only after a separate reduction of the CN group, for example with \\(\\mathrm{LiAlH_4}\\).",
        },
        {
          title: "Racemic, not optically active",
          body: "A cyanohydrin with a new stereocentre is formed as a 50:50 mixture of enantiomers. Unless a chiral reagent is used, the product shows no optical rotation.",
        },
      ],
    },

    // C3 — acetals, imines and relatives
    {
      kind: "reference" as const,
      slug: "jcald-acetal-imine",
      name: "Acetals, oximes, hydrazones, semicarbazones and enamines",
      intuition:
        "An alcohol or an ammonia derivative adds to the C=O, and then water is lost. With alcohols the product keeps two C–O bonds (an acetal); with nitrogen nucleophiles the oxygen is replaced by a C=N bond.",
      definition:
        "- One alcohol gives a **hemiacetal** (OH and OR on one carbon), which usually reverts. A second alcohol, with dry HCl, gives the **acetal** \\(\\mathrm{R_2C(OR')_2}\\).\n" +
        "- An acetal is stable to base, because the group that would have to leave is an alkoxide, a poor leaving group. Dilute aqueous acid hydrolyses it back to the carbonyl compound, so acetals are used to protect a C=O.\n" +
        "- Ammonia derivatives \\(\\mathrm{H_2N{-}Z}\\) add and then lose water to give \\(\\mathrm{R_2C{=}N{-}Z}\\). The reaction works best in weak acid (pH about 4 to 5): enough acid to activate the C=O, not so much that the amine is protonated.\n" +
        "- In semicarbazide, \\(\\mathrm{H_2N{-}NH{-}CO{-}NH_2}\\), only the NH₂ on the NH attacks. The other NH₂ is an amide nitrogen, and its lone pair is delocalised onto the C=O.\n" +
        "- A secondary amine cannot form C=N. If the carbonyl compound has an α-hydrogen, it loses that H instead and gives an **enamine**.",
      table: {
        columns: ["Reagent", "Product with a carbonyl compound", "What to remember"],
        rows: [
          { cells: ["One \\(\\mathrm{R'OH}\\), dry HCl", "Hemiacetal \\(\\mathrm{R_2C(OH)OR'}\\)", "Usually reverts; cyclic hemiacetals (sugars, lactols) are stable"] },
          { cells: ["Two \\(\\mathrm{R'OH}\\), dry HCl", "Acetal (from a ketone, a ketal) \\(\\mathrm{R_2C(OR')_2}\\)", "Stable to base; dilute acid gives the carbonyl back"] },
          { cells: ["Ethane-1,2-diol, dry HCl", "Cyclic acetal (ethylene ketal)", "Protects a C=O while another group reacts"] },
          { cells: ["Hydroxylamine \\(\\mathrm{NH_2OH}\\)", "Oxime \\(\\mathrm{R_2C{=}NOH}\\)", "An aldoxime loses water with \\(\\mathrm{P_2O_5}\\) to give a nitrile"] },
          { cells: ["Hydrazine \\(\\mathrm{NH_2NH_2}\\)", "Hydrazone \\(\\mathrm{R_2C{=}NNH_2}\\)", "First step of the Wolff–Kishner reduction"] },
          { cells: ["Phenylhydrazine \\(\\mathrm{C_6H_5NHNH_2}\\)", "Phenylhydrazone \\(\\mathrm{R_2C{=}NNHC_6H_5}\\)", "Crystalline; used to identify the carbonyl compound"] },
          { cells: ["2,4-Dinitrophenylhydrazine (2,4-DNP)", "2,4-Dinitrophenylhydrazone", "Yellow to orange precipitate: the test for any aldehyde or ketone"] },
          { cells: ["Semicarbazide \\(\\mathrm{NH_2NHCONH_2}\\)", "Semicarbazone \\(\\mathrm{R_2C{=}NNHCONH_2}\\)", "Bonds through the NH₂ of the NH–NH₂ end; the product keeps all three N"] },
          { cells: ["Primary amine \\(\\mathrm{R'NH_2}\\)", "Imine (Schiff base) \\(\\mathrm{R_2C{=}NR'}\\)", "The C=N carries the amine's R group"] },
          { cells: ["Secondary amine \\(\\mathrm{R'_2NH}\\)", "Enamine, C=C–NR′₂", "Needs an α-hydrogen on the carbonyl compound"] },
        ],
        caption: "Every entry is addition to C=O followed by loss of water.",
      },
      selfCheckExample: {
        prompt: "Propanal is treated separately with hydroxylamine, and with methanol (two moles) and dry HCl. Give both products, and say what aqueous NaOH and dilute HCl each do to the second product.",
        steps: [
          "Hydroxylamine replaces the O by N–OH: the oxime \\(\\mathrm{CH_3CH_2CH{=}NOH}\\).",
          "Two methanols with dry HCl give the acetal \\(\\mathrm{CH_3CH_2CH(OCH_3)_2}\\), 1,1-dimethoxypropane.",
          "In base the acetal would have to lose methoxide, a poor leaving group, so nothing happens. In dilute acid a protonated OCH₃ leaves as methanol, and water gives propanal back.",
        ],
        answer: "Propanal oxime and 1,1-dimethoxypropane; NaOH leaves the acetal unchanged, dilute HCl hydrolyses it to propanal and methanol",
      },
      practiceSet: [
        { prompt: "Why is an acetal unchanged by aqueous NaOH?", answer: "Hydrolysis would need an alkoxide to leave, and alkoxide is a poor leaving group" },
        { prompt: "How many nitrogen atoms are in the semicarbazone of propanone?", answer: "Three" },
        { prompt: "What does cyclohexanone give with pyrrolidine, a secondary amine?", answer: "An enamine, 1-(cyclohex-1-en-1-yl)pyrrolidine" },
        { prompt: "Which reagent gives a yellow-orange precipitate with any aldehyde or ketone?", answer: "2,4-Dinitrophenylhydrazine (2,4-DNP)" },
      ],
      pyqExampleId: "e6090858-062c-465f-a691-71a4e6c38cb7", // 2023 — acetal stable in base; alkoxide a poor leaving group
      traps: [
        {
          title: "Acetals survive base because alkoxide leaves badly",
          body: "An assertion–reason item may say acetals are stable in base because alkoxide leaves easily. The reason is reversed: they are stable because alkoxide is a poor leaving group.",
        },
        {
          title: "Which end of semicarbazide bonds",
          body: "The product is \\(\\mathrm{R_2C{=}N{-}NH{-}CO{-}NH_2}\\). A structure written as \\(\\mathrm{R_2C{=}N{-}CO{-}NH{-}NH_2}\\) has bonded through the amide nitrogen, which is not nucleophilic.",
        },
      ],
    },
  ],
};
