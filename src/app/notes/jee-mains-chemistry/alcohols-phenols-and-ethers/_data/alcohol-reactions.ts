import type { SubtopicNote } from "@/app/notes/_types";

export const ALCOHOL_REACTIONS_ALC_NOTE: SubtopicNote = {
  subtopicName: "Reactions of Alcohols: Substitution, Dehydration and Rearrangement",
  title: "Reactions of Alcohols: Substitution, Dehydration and Rearrangement",
  oneLineDefinition:
    "An alcohol reacts at its O–H bond (esters, acetylation) or at its C–O bond once the OH is made a leaving group (halides, Lucas test, dehydration); in acid the carbocation shifts a hydride or methyl to become more stable before the most substituted alkene forms.",
  whyItMatters:
    "Fifteen PYQs, all multiple choice, and three from 2026; seven of them come from 2021 papers. Four ask what happens at the OH group: acetylation mass, thionyl chloride on a molecule with both an alcoholic and a phenolic OH, hot copper and the acrolein test. Eleven predict the alkene or halide formed through a carbocation, nearly all from an alcohol in acid, and most of them hinge on a hydride shift, a methyl shift or a ring expansion.",
  concepts: [
    // C1 — reactions at O–H and C–O
    {
      kind: "formula" as const,
      slug: "jcalc-oh-substitution",
      name: "Reactions at the O–H and C–O bonds of alcohols",
      intuition:
        "Two bonds can break. The O–H bond breaks when the alcohol acts as an acid or a nucleophile, as in ester formation and acetylation. The C–O bond breaks once the OH is turned into a leaving group, as with HX, PCl₅ or SOCl₂. In a phenol the C–O bond has partial double-bond character, so it does not break this way.",
      definition:
        "- **Acetylation** with acetic anhydride or \\(\\mathrm{CH_3COCl}\\): each OH becomes \\(\\mathrm{OCOCH_3}\\), so the molar mass rises by 42 g mol\\(^{-1}\\) per OH (\\(\\mathrm{CH_3CO}\\), 43, replaces H, 1).\n" +
        "- **Halides**: HX, \\(\\mathrm{PCl_3}\\), \\(\\mathrm{PCl_5}\\) and \\(\\mathrm{SOCl_2}\\) replace an alcoholic OH by halogen; \\(\\mathrm{SOCl_2}\\) releases \\(\\mathrm{SO_2}\\) and HCl as gases. A phenolic OH is untouched.\n" +
        "- **Lucas reagent** (conc. HCl + anhydrous \\(\\mathrm{ZnCl_2}\\)): a 3° alcohol turns cloudy at once, a 2° in about five minutes, a 1° gives no cloudiness at room temperature.\n" +
        "- **Oxidation**: 1° → aldehyde with PCC, → acid with \\(\\mathrm{KMnO_4}\\) or acidified dichromate; 2° → ketone; 3° resists.\n" +
        "- **Hot copper, 573 K**: 1° → aldehyde, 2° → ketone (dehydrogenation); 3° → alkene (dehydration), since it has no H on the carbinol carbon.\n" +
        "- **Glycerol + \\(\\mathrm{KHSO_4}\\)**, heat: loses two waters to give acrolein, \\(\\mathrm{CH_2{=}CH{-}CHO}\\), with a pungent smell. This is the test for glycerol.",
      formula: {
        label: "Molar mass after complete acetylation",
        latex: "M_{\\text{product}} = M + 42n \\qquad (n = \\text{number of OH groups})",
      },
      authoredExample: {
        prompt:
          "Sorbitol, \\(\\mathrm{C_6H_{14}O_6}\\) (molar mass 182 g mol\\(^{-1}\\)), is fully acetylated with excess acetic anhydride. The product has molar mass 434 g mol\\(^{-1}\\). How many OH groups does sorbitol have?",
        steps: [
          "Each acetylated OH adds 42 g mol\\(^{-1}\\).",
          "Total gain \\(= 434 - 182 = 252\\) g mol\\(^{-1}\\).",
          "\\(n = 252/42 = 6\\).",
        ],
        answer: "6 OH groups.",
      },
      selfCheckExample: {
        prompt:
          "Glycerol, \\(\\mathrm{HOCH_2CH(OH)CH_2OH}\\) (molar mass 92 g mol\\(^{-1}\\)), is fully acetylated. Find the molar mass of the product.",
        steps: [
          "Glycerol has three OH groups.",
          "\\(M = 92 + 3 \\times 42 = 218\\) g mol\\(^{-1}\\).",
        ],
        answer: "218 g mol\\(^{-1}\\) (glyceryl triacetate).",
      },
      practiceSet: [
        { prompt: "Which turns cloudy at once with Lucas reagent: propan-2-ol or 2-methylpropan-2-ol?", answer: "2-Methylpropan-2-ol" },
        { prompt: "Does \\(\\mathrm{SOCl_2}\\) convert phenol into chlorobenzene?", answer: "No; a phenolic OH is not replaced" },
        { prompt: "What does butan-2-ol give over copper at 573 K?", answer: "Butanone" },
        { prompt: "What forms when glycerol is heated with \\(\\mathrm{KHSO_4}\\)?", answer: "Acrolein, \\(\\mathrm{CH_2{=}CHCHO}\\)" },
      ],
      pyqExampleId: "ad640282-9981-4295-b6ad-bf2144789b66", // 2026 — acetylation mass gain gives the number of OH groups
      traps: [
        {
          title: "Ethanol is primary: no quick Lucas turbidity",
          body: "Only a tertiary alcohol clouds Lucas reagent at once. A primary alcohol such as ethanol stays clear at room temperature.",
        },
        {
          title: "Hot copper dehydrates a tertiary alcohol",
          body: "A 3° alcohol has no H on its carbinol carbon, so Cu at 573 K cannot make a ketone from it. \\(\\mathrm{(CH_3)_3COH}\\) gives 2-methylpropene instead, and that alkene can then react further in acid.",
        },
        {
          title: "Acrolein is pungent, not fruity",
          body: "The acrolein test for glycerol works by its sharp, irritating smell. Fruity smells belong to esters.",
        },
      ],
    },

    // C2 — dehydration and carbocation shifts
    {
      kind: "formula" as const,
      slug: "jcalc-dehydration-shifts",
      name: "Acid dehydration and carbocation shifts",
      intuition:
        "In acid the OH is protonated and leaves as water, and a carbocation is left behind. Before it loses a proton, the cation looks at its neighbours: if moving a hydride or a methyl group (or a ring bond) gives a more stable cation, it moves. Only then does it lose a β-hydrogen, to give the most substituted alkene.",
      definition:
        "- Ease of dehydration: 3° > 2° > 1°. Typical conditions: 1°, conc. \\(\\mathrm{H_2SO_4}\\) at 443 K; 2°, 85% \\(\\mathrm{H_3PO_4}\\) at 440 K; 3°, 20% \\(\\mathrm{H_3PO_4}\\) at 358 K.\n" +
        "- Mechanism (E1): protonate OH → lose \\(\\mathrm{H_2O}\\) → carbocation → lose \\(\\mathrm{H^+}\\).\n" +
        "- **1,2-shifts**: a hydride or methyl moves to the cationic carbon when that gives a 3° (or benzylic) cation.\n" +
        "- **Ring expansion**: a cation on a carbon next to a small ring can take a ring bond, turning a four-membered ring into a five-membered one or a five into a six.\n" +
        "- The alkene is the most substituted one (Saytzeff), trans rather than cis, and conjugated with a ring when it can be.\n" +
        "- A diol with excess acid loses two waters and gives a diene.\n" +
        "- The same shifts happen when HX adds to an alkene and when an alcohol reacts with HX by \\(\\mathrm{S_N1}\\).\n" +
        "- Contrast: a bulky base such as \\(\\mathrm{(CH_3)_3CO^-K^+}\\) on an alkyl halide gives the less substituted (Hofmann) alkene.",
      formula: {
        label: "E1 dehydration with a possible shift",
        latex:
          "\\mathrm{ROH} \\xrightarrow{\\mathrm{H^+}} \\mathrm{ROH_2^+} \\xrightarrow{-\\mathrm{H_2O}} \\mathrm{R^+} \\xrightarrow{\\text{1,2-shift if better}} \\mathrm{R'^+} \\xrightarrow{-\\mathrm{H^+}} \\text{most substituted alkene}",
      },
      authoredExample: {
        prompt: "Predict the major product when 3-methylbutan-2-ol, \\(\\mathrm{CH_3CH(OH)CH(CH_3)_2}\\), is heated with conc. \\(\\mathrm{H_2SO_4}\\).",
        steps: [
          "Loss of water leaves a 2° cation at C-2: \\(\\mathrm{CH_3\\overset{+}{C}HCH(CH_3)_2}\\).",
          "C-3 carries an H and two methyl groups. A 1,2-hydride shift puts the charge on C-3 and makes a 3° cation: \\(\\mathrm{CH_3CH_2\\overset{+}{C}(CH_3)_2}\\).",
          "Loss of \\(\\mathrm{H^+}\\) from the \\(\\mathrm{CH_2}\\) gives the trisubstituted alkene; loss from a methyl would give only a disubstituted one.",
        ],
        answer: "2-Methylbut-2-ene, \\(\\mathrm{(CH_3)_2C{=}CHCH_3}\\).",
      },
      selfCheckExample: {
        prompt: "Predict the major product when 2,2-dimethylcyclohexan-1-ol is heated with conc. \\(\\mathrm{H_2SO_4}\\).",
        steps: [
          "Loss of water gives a 2° cation at C-1, next to the ring carbon C-2 that carries two methyl groups.",
          "A 1,2-methyl shift from C-2 to C-1 gives a 3° cation at C-2.",
          "Loss of the H on C-1 gives a tetrasubstituted ring alkene with a methyl on each end of the C=C.",
        ],
        answer: "1,2-Dimethylcyclohexene.",
      },
      practiceSet: [
        { prompt: "Which dehydrates most easily: a 1°, 2° or 3° alcohol?", answer: "A 3° alcohol" },
        { prompt: "What is the major alkene from butan-2-ol and hot acid?", answer: "But-2-ene, mostly the trans isomer" },
        { prompt: "What does 1-phenylpropan-1-ol give with hot conc. \\(\\mathrm{H_2SO_4}\\)?", answer: "trans-1-Phenylprop-1-ene, conjugated with the ring" },
        { prompt: "Does potassium tert-butoxide on 2-bromo-2-methylbutane give mainly the more or the less substituted alkene?", answer: "The less substituted (Hofmann) alkene, 2-methylbut-1-ene" },
      ],
      pyqExampleId: "e712b421-1d9c-4dce-9d3b-9342178368d3", // 2021 — 3,3-dimethylbutan-2-ol: methyl shift to 2,3-dimethylbut-2-ene
      traps: [
        {
          title: "Check the neighbours before drawing the alkene",
          body: "If the carbon next to a 2° cation is tertiary or quaternary, expect a shift. The product then has a different carbon skeleton from the alcohol, and the unshifted alkene is always among the options.",
        },
        {
          title: "A primary alcohol can rearrange too",
          body: "Cyclohexylmethanol in hot acid does not stop at a primary cation. A 1,2-hydride shift from the ring carbon gives the 3° 1-methylcyclohexyl cation, and 1-methylcyclohexene forms.",
        },
        {
          title: "Acid on an alcohol is Saytzeff; a bulky base on a halide is Hofmann",
          body: "1-Methylcyclohexanol with \\(\\mathrm{H_3PO_4}\\) gives 1-methylcyclohexene (inside the ring). The matching chloride with \\(\\mathrm{(CH_3)_3COK}\\) gives mostly methylenecyclohexane (outside the ring).",
        },
      ],
    },
  ],
};
