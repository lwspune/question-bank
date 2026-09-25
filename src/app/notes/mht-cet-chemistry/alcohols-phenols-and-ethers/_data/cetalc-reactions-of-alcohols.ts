import type { SubtopicNote } from "@/app/notes/_types";

export const REACTIONS_OF_ALCOHOLS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Reactions of Alcohols and Acidity",
  title: "Chemical Reactions of Alcohols and Acidity",
  oneLineDefinition:
    "An alcohol reacts by breaking its O–H bond (esterification, acidity) or its C–O bond (HX, PX₃, dehydration); tertiary alcohols react fastest with HX and Lucas reagent through a carbocation, dehydration follows Saytzeff with hydride shifts, and Grignard reagents build alcohols from carbonyls.",
  whyItMatters:
    "14 PYQs, 2 HARD. Five are Lucas reagent and the HX reactivity order (tertiary first), plus which reaction breaks C–O; five are dehydration — hot Cu on a tertiary alcohol, the Saytzeff alkene from 2-methylhexan-3-ol with a hydride shift, the two-step propan-1-ol → propene → propan-2-ol; four are the Grignard back-calculation, which alcohol methanal cannot give, and acidity (p-nitrophenol strongest). " +
    "Three cards.",
  concepts: [
    // 1 — Lucas and HX
    {
      kind: "formula" as const,
      slug: "cetalc-lucas-and-hx",
      name: "Lucas Reagent and the HX Reactivity Order",
      intuition:
        "Lucas reagent is concentrated HCl with anhydrous ZnCl₂. It swaps OH for Cl through a carbocation, so the alcohol that makes the most stable cation reacts fastest: tertiary turns cloudy at once, secondary in minutes, primary not at room temperature. Any reaction that replaces OH — HX, PCl₃, PCl₅, SOCl₂ — breaks the C–O bond; esterification with an acid, anhydride or acyl chloride breaks the O–H bond.",
      definition:
        "- **Lucas reagent** = conc. HCl + anhydrous \\(\\text{ZnCl}_2\\). Reactivity: **3° > 2° > 1°**; with halo acids methanol is slowest of all: 3° > 2° > \\(\\text{CH}_3\\text{CH}_2\\text{OH}\\) > \\(\\text{CH}_3\\text{OH}\\).\n" +
        "- **C–O bond breaks**: \\(\\text{R-OH} + \\text{PCl}_3\\), \\(\\text{PCl}_5\\), \\(\\text{SOCl}_2\\), HX, dehydration. **O–H bond breaks**: reaction with Na, with carboxylic acids, acetic anhydride, acetyl chloride (esters).\n" +
        "- PCC oxidises a 1° alcohol to the ALDEHYDE only: propan-1-ol → propanal (C₃H₆O) and, with PCl₃, → 1-chloropropane (C₃H₇Cl). Acidified dichromate takes it on to the acid.\n" +
        "- Distinguishing test in one line: Lucas — turbidity time.",
      formula: {
        label: "Lucas test",
        latex:
          "\\text{R-OH} \\xrightarrow{\\text{conc. HCl / ZnCl}_2} \\text{R-Cl}\\ (\\text{turbid});\\quad 3^\\circ \\text{ instant} > 2^\\circ \\text{ minutes} > 1^\\circ \\text{ none}",
      },
      authoredExample: {
        prompt: "Three unlabelled alcohols are butan-1-ol, butan-2-ol and 2-methylpropan-2-ol. How does the Lucas test tell them apart?",
        steps: [
          "2-Methylpropan-2-ol (3°) turns turbid immediately; butan-2-ol (2°) after about five minutes; butan-1-ol (1°) stays clear at room temperature.",
        ],
        answer: "Immediate / minutes / no turbidity = 3° / 2° / 1°",
      },
      selfCheckExample: {
        prompt: "Which of these breaks the C–O bond of an alcohol: reaction with propanoic acid, with acetic anhydride, with PCl₃, with acetyl chloride?",
        steps: [
          "The three esterifications keep the alcohol's oxygen; PCl₃ replaces OH by Cl.",
        ],
        answer: "Reaction with PCl₃",
      },
      practiceSet: [
        { prompt: "Lucas reagent is?", answer: "Conc. HCl + ZnCl₂" },
        { prompt: "Order of reactivity with Lucas reagent?", answer: "3° > 2° > 1°" },
        { prompt: "Alcohol giving C₃H₇Cl with PCl₃ and an aldehyde with PCC?", answer: "Propan-1-ol" },
        { prompt: "Slowest with a halo acid: methanol, ethanol, 2°, 3°?", answer: "Methanol" },
      ],
      pyqExampleId: "8b9bcbf3-57f9-4661-8897-bad6fccb362a",
      traps: [
        {
          title: "Marking esterification as C–O cleavage",
          body:
            "In R–OH + R'COOH the alcohol keeps its oxygen (the ester is R'CO–O–R); it is the O–H bond that breaks. C–O breaks only when the whole OH leaves — HX, PX₃, SOCl₂, dehydration.",
        },
      ],
    },

    // 2 — dehydration and oxidation
    {
      kind: "formula" as const,
      slug: "cetalc-dehydration-and-oxidation",
      name: "Dehydration (Saytzeff, With Rearrangement) and Oxidation",
      intuition:
        "Concentrated H₂SO₄, or Al₂O₃ at 623 K, or hot copper for a tertiary alcohol, removes water to give an alkene — the more substituted one (Saytzeff). Because the route runs through a carbocation, a 1,2-hydride shift to a more stable cation happens first: 2-methylhexan-3-ol gives 2-methylhex-2-ene, not hex-3-ene. Hot copper dehydrogenates 1° and 2° alcohols instead (to aldehyde and ketone) and dehydrates 3° ones.",
      definition:
        "- 2-Methylhexan-3-ol + conc. \\(\\text{H}_2\\text{SO}_4\\): 2° cation at C3 → hydride shift → 3° cation at C2 → **2-methylhex-2-ene** \\((\\text{CH}_3)_2\\text{C=CH-CH}_2\\text{CH}_2\\text{CH}_3\\).\n" +
        "- 2-Methylbutan-2-ol (or -1-ol via a shift) → 2-methylbut-2-ene; 2-methylpropan-2-ol vapour over hot Cu → **2-methylpropene**.\n" +
        "- Propan-1-ol \\(\\xrightarrow{\\text{Al}_2\\text{O}_3, 623\\text{ K}}\\) propene \\(\\xrightarrow{\\text{H}_2\\text{SO}_4;\\ \\text{H}_2\\text{O}}\\) **propan-2-ol** (Markovnikov re-hydration).\n" +
        "- Hot Cu, 573 K: 1° → aldehyde, 2° → ketone, 3° → alkene. PCC: 1° → aldehyde. \\(\\text{K}_2\\text{Cr}_2\\text{O}_7/\\text{H}^+\\): 1° → acid.",
      formula: {
        label: "Dehydration",
        latex:
          "\\text{R}_2\\text{CH-CH(OH)R} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4,\\ \\Delta} \\text{R}_2\\text{C=CHR} + \\text{H}_2\\text{O} \\quad (\\text{Saytzeff, after any hydride shift})",
      },
      authoredExample: {
        prompt: "Give the major alkene from 3-methylbutan-2-ol with concentrated H₂SO₄.",
        steps: [
          "2° cation at C2 → hydride shift from C3 → 3° cation at C3 → loss of H⁺ gives the trisubstituted 2-methylbut-2-ene.",
        ],
        answer: "2-Methylbut-2-ene",
      },
      selfCheckExample: {
        prompt: "Vapours of butan-2-ol and of 2-methylpropan-2-ol are passed over hot copper. Name each product.",
        steps: [
          "The secondary alcohol is dehydrogenated to butanone; the tertiary one is dehydrated to 2-methylpropene.",
        ],
        answer: "Butanone; 2-methylpropene",
      },
      practiceSet: [
        { prompt: "2-Methylpropan-2-ol over hot Cu gives?", answer: "2-Methylpropene" },
        { prompt: "Major product of 2-methylhexan-3-ol with conc. H₂SO₄?", answer: "2-Methylhex-2-ene" },
        { prompt: "Propan-1-ol → (Al₂O₃) A → (H₂SO₄, H₂O) B: B?", answer: "Propan-2-ol" },
        { prompt: "Alcohol that gives 2-methylbut-2-ene on dehydration?", answer: "2-Methylbutan-2-ol (or -1-ol via a shift)" },
      ],
      pyqExampleId: "65d32617-598e-45ce-ad42-6c1f867de365",
      traps: [
        {
          title: "Eliminating from the carbon that carried the OH",
          body:
            "The secondary cation rearranges before it loses a proton. Hex-3-ene from 2-methylhexan-3-ol is the drawing beside the right answer; the hydride shift moves the double bond to the branched carbon.",
        },
      ],
    },

    // 3 — Grignard and acidity
    {
      kind: "formula" as const,
      slug: "cetalc-grignard-and-acidity",
      name: "Alcohols From Grignard Reagents; Acidity of Alcohols and Phenols",
      intuition:
        "R–MgX adds R to a carbonyl carbon: methanal gives a PRIMARY alcohol (R–CH₂OH), another aldehyde a secondary one, a ketone a tertiary one. Working backwards, 3-methylpentan-3-ol with an ethyl Grignard came from butanone. Acidity runs phenol far above water, which sits above the alcohols, and an electron-withdrawing nitro group makes p-nitrophenol the strongest of the lot.",
      definition:
        "- \\(\\text{HCHO} + \\text{RMgX} \\to \\text{RCH}_2\\text{OH}\\) (1°): ethanol, propan-1-ol, butan-1-ol — but never propan-2-ol, which needs ethanal + \\(\\text{CH}_3\\text{MgX}\\).\n" +
        "- \\(\\text{RCHO} + \\text{R'MgX} \\to\\) 2° alcohol; \\(\\text{R}_2\\text{CO} + \\text{R'MgX} \\to\\) 3° alcohol. 3-Methylpentan-3-ol = butanone + \\(\\text{C}_2\\text{H}_5\\text{MgBr}\\).\n" +
        "- Acidity: **p-nitrophenol > phenol > water > ethanol > tert-butyl alcohol** — alkyl groups (+I) weaken, nitro (−R) strengthens by stabilising the phenoxide.\n" +
        "- Alcohols react with Na to give H₂ (O–H cleavage); with \\(\\text{H}_2\\text{SO}_4\\) at low temperature an alkyl hydrogen sulphate — sodium lauryl sulphate \\(\\text{C}_{12}\\text{H}_{25}\\text{OSO}_3^-\\text{Na}^+\\), an ANIONIC detergent used in toothpaste and shampoo, is such an ester.",
      formula: {
        label: "Grignard to alcohol",
        latex:
          "\\text{HCHO} \\to 1^\\circ;\\quad \\text{RCHO} \\to 2^\\circ;\\quad \\text{R}_2\\text{CO} \\to 3^\\circ \\quad (\\text{then H}_3\\text{O}^+)",
      },
      authoredExample: {
        prompt: "Which carbonyl and Grignard pair gives 2-methylbutan-2-ol, and which gives butan-2-ol?",
        steps: [
          "3° alcohol from a ketone: propanone + \\(\\text{C}_2\\text{H}_5\\text{MgBr}\\) (or butanone + \\(\\text{CH}_3\\text{MgBr}\\)). 2° alcohol from an aldehyde: ethanal + \\(\\text{C}_2\\text{H}_5\\text{MgBr}\\) (or propanal + \\(\\text{CH}_3\\text{MgBr}\\)).",
        ],
        answer: "Propanone + EtMgBr; ethanal + EtMgBr",
      },
      selfCheckExample: {
        prompt: "Rank ethanol, phenol, p-nitrophenol and tert-butyl alcohol by acidity.",
        steps: [
          "Nitro-stabilised phenoxide first, phenol next, then the alcohols with tert-butyl (three +I methyls) last.",
        ],
        answer: "p-Nitrophenol > phenol > ethanol > tert-butyl alcohol",
      },
      practiceSet: [
        { prompt: "A + C₂H₅MgBr, then H₃O⁺ → 3-methylpentan-3-ol: A?", answer: "Butanone" },
        { prompt: "NOT made from a Grignard on methanal: ethanol, propan-1-ol, propan-2-ol, butan-1-ol?", answer: "Propan-2-ol" },
        { prompt: "Most acidic: ethanol, t-butyl alcohol, phenol, p-nitrophenol?", answer: "p-Nitrophenol" },
        { prompt: "Sodium lauryl sulphate is which kind of detergent?", answer: "Anionic (used in toothpaste)" },
      ],
      pyqExampleId: "aebaae45-a2cc-4634-af2f-8d87ba396ec3",
      traps: [
        {
          title: "Counting the Grignard carbon into the wrong place",
          body:
            "3-Methylpentan-3-ol has C3 bearing OH, methyl, ethyl, ethyl. One ethyl came from the Grignard, so the ketone had methyl + ethyl on the carbonyl: butanone, not propanone.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Halogen Derivatives — the SN1 carbocation behind the Lucas order",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-nucleophilic-substitution",
    },
    {
      label: "Phenols — the acidity comparison continued",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-phenols",
    },
  ],
};
