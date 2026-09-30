import type { SubtopicNote } from "@/app/notes/_types";

export const CARBONYL_ORM_NOTE: SubtopicNote = {
  subtopicName: "Carbonyl Reactions: Enolates, Haloform and Cannizzaro",
  title: "Carbonyl Reactions: Enolates, Haloform and Cannizzaro",
  oneLineDefinition:
    "A carbonyl compound with an α-hydrogen forms an enolate that attacks another carbonyl, an ester or a C=C next to a C=O; one with a CH₃CO group loses that carbon in the haloform reaction; one with no α-hydrogen disproportionates in the Cannizzaro reaction.",
  whyItMatters:
    "Eight PYQs, two of them asking for a number. Four are enolate chemistry: a Claisen-Schmidt yield where two molecules of benzaldehyde condense with one of acetone, a ring closed by an intramolecular Claisen, a thiol adding to acrylonitrile, and an amino alcohol closed into a cyclic carbamate. Four cut carbons or shift a hydride: the haloform reaction of a methyl ketone, an intramolecular Cannizzaro, a haloform followed by soda-lime decarboxylation, and a 1,2-diol heated with oxalic acid.",
  concepts: [
    // C1 — enolate chemistry
    {
      kind: "formula" as const,
      slug: "jcorm-enolate-condensation",
      name: "Aldol, Claisen-Schmidt, Claisen and Michael reactions",
      intuition:
        "A hydrogen on the carbon next to a C=O (the α-carbon) is acidic, because the anion left behind spreads its charge onto the oxygen. Base removes it and gives an enolate, a carbon nucleophile. The enolate can attack the C=O of another aldehyde or ketone (aldol), the C=O of an ester (Claisen), or the far carbon of a C=C that is joined to a C=O or C≡N (Michael). On heating, an aldol product loses water and becomes an α,β-unsaturated carbonyl.",
      definition:
        "- **Aldol**: two carbonyl compounds with α-H, dilute NaOH: a β-hydroxy aldehyde or ketone; heat removes water to give the α,β-unsaturated compound.\n" +
        "- **Claisen-Schmidt**: an aromatic aldehyde (no α-H, so it only accepts) with a ketone or aldehyde that has α-H. Acetone has α-H on BOTH sides, so with excess ArCHO both sides react: \\(\\mathrm{2\\,C_6H_5CHO + CH_3COCH_3 \\to C_6H_5CH{=}CHCOCH{=}CHC_6H_5 + 2H_2O}\\) (dibenzalacetone).\n" +
        "- **Claisen condensation**: an enolate attacks an ester and ethoxide leaves, giving a 1,3-dicarbonyl. Done inside one molecule (Dieckmann), it closes the five- or six-membered ring.\n" +
        "- **Intramolecular aldol**: a diketone closes the five- or six-membered ring too; smaller rings do not form.\n" +
        "- **Michael (conjugate) addition**: a nucleophile adds to the β-carbon of \\(\\mathrm{C{=}C{-}C{=}O}\\) or \\(\\mathrm{C{=}C{-}C{\\equiv}N}\\). Sulfur is a better nucleophile than oxygen, so a thiol adds through S.\n" +
        "- **Amine before alcohol**: \\(\\mathrm{-NH_2}\\) attacks a carbonyl faster than \\(\\mathrm{-OH}\\). A 1,2-amino alcohol with diethyl carbonate gives a five-membered cyclic carbamate (an oxazolidin-2-one) and two ethanol.\n" +
        "- **Percentage yield** = actual mass ÷ theoretical mass × 100, with the theoretical mass from the limiting reagent and the balanced equation.",
      formula: {
        label: "Claisen-Schmidt condensation and percentage yield",
        latex:
          "\\mathrm{ArCHO + CH_3COR \\xrightarrow{OH^-} ArCH{=}CHCOR + H_2O} \\qquad \\%\\,\\text{yield} = \\dfrac{\\text{actual mass}}{\\text{theoretical mass}} \\times 100",
      },
      authoredExample: {
        prompt:
          "6.0 g of 4-methylbenzaldehyde (M = 120 g/mol) is condensed with excess acetophenone in dilute NaOH, and 8.88 g of the chalcone \\(\\mathrm{CH_3C_6H_4CH{=}CHCOC_6H_5}\\) is collected. Find the percentage yield.",
        steps: [
          "Acetophenone, \\(\\mathrm{C_6H_5COCH_3}\\), has α-H on one side only, so one aldehyde reacts per ketone: a 1:1 reaction.",
          "Moles of aldehyde: \\(6.0/120 = 0.050\\) mol, so at most 0.050 mol of product.",
          "The chalcone is \\(\\mathrm{C_{16}H_{14}O}\\): \\(16(12) + 14(1) + 16 = 222\\) g/mol. Theoretical mass \\(= 0.050 \\times 222 = 11.1\\) g.",
          "Yield \\(= \\dfrac{8.88}{11.1} \\times 100 = 80\\%\\).",
        ],
        answer: "80%",
      },
      selfCheckExample: {
        prompt:
          "Heptane-2,6-dione, \\(\\mathrm{CH_3CO(CH_2)_3COCH_3}\\), is warmed with dilute NaOH. Which cyclic product forms?",
        steps: [
          "Base forms an enolate at a terminal \\(\\mathrm{CH_3}\\). That carbon attacks the far C=O.",
          "Count the ring: the \\(\\mathrm{CH_2}\\) of the enolate, its C=O, three \\(\\mathrm{CH_2}\\) groups, and the attacked carbon make six atoms. An enolate at an inner \\(\\mathrm{CH_2}\\) would close a four-membered ring, which does not form.",
          "The β-hydroxy ketone loses water to put the C=C next to the C=O.",
        ],
        answer: "3-Methylcyclohex-2-en-1-one, a six-membered ring.",
      },
      practiceSet: [
        { prompt: "Benzaldehyde and acetone react in a 1:1 ratio in dilute NaOH. What forms?", answer: "Benzalacetone, \\(\\mathrm{C_6H_5CH{=}CHCOCH_3}\\)" },
        { prompt: "Ethanethiol adds to but-3-en-2-one, \\(\\mathrm{CH_2{=}CHCOCH_3}\\), with a base catalyst. What forms?", answer: "\\(\\mathrm{CH_3CH_2SCH_2CH_2COCH_3}\\), by conjugate addition through sulfur" },
        { prompt: "Diethyl hexanedioate (diethyl adipate) is treated with sodium ethoxide. What size of ring closes?", answer: "Five-membered: ethyl 2-oxocyclopentane-1-carboxylate (Dieckmann)" },
        { prompt: "2-Aminoethanol is heated with diethyl carbonate. What forms?", answer: "Oxazolidin-2-one, a five-membered cyclic carbamate, and two molecules of ethanol" },
      ],
      pyqExampleId: "1e7e1575-a920-49ab-b92e-0d5cf28a7380", // 2025 — dibenzalacetone yield (NAT)
      traps: [
        {
          title: "Acetone condenses on both sides",
          body: "With excess aromatic aldehyde, both \\(\\mathrm{CH_3}\\) groups of acetone react, so two moles of aldehyde make one mole of dibenzalacetone. Taking a 1:1 ratio doubles the theoretical yield and halves the percentage.",
        },
        {
          title: "Benzaldehyde cannot form an enolate",
          body: "Benzaldehyde has no α-hydrogen. In a crossed aldol it can only be attacked; with concentrated alkali and nothing else, it undergoes the Cannizzaro reaction instead.",
        },
        {
          title: "Michael addition goes to the β-carbon",
          body: "A soft nucleophile such as a thiolate adds to the carbon at the far end of the C=C, not to the C=O or the C≡N. Acrylonitrile, \\(\\mathrm{CH_2{=}CHCN}\\), gains the new group on its \\(\\mathrm{CH_2}\\).",
        },
      ],
    },

    // C2 — haloform, Cannizzaro and carbon-cutting steps
    {
      kind: "formula" as const,
      slug: "jcorm-haloform-cannizzaro",
      name: "Haloform, Cannizzaro and decarboxylation",
      intuition:
        "Two reactions of a carbonyl in strong base change the count of carbons or the oxidation state. In the haloform reaction, the three H of a \\(\\mathrm{CH_3CO}\\) group are replaced by halogen one at a time, and hydroxide then cuts off \\(\\mathrm{CX_3^-}\\): the chain loses one carbon and becomes a carboxylate. In the Cannizzaro reaction, an aldehyde with no α-H cannot form an enolate, so hydroxide adds to it and the adduct passes a hydride to a second aldehyde: one molecule is oxidised, the other reduced.",
      definition:
        "- **Haloform**: needs \\(\\mathrm{CH_3CO{-}}\\), or \\(\\mathrm{CH_3CH(OH){-}}\\), which the hypohalite first oxidises to \\(\\mathrm{CH_3CO{-}}\\). Products: \\(\\mathrm{CHX_3}\\) and a carboxylate with one carbon fewer. Iodoform is a yellow precipitate.\n" +
        "- The reaction happens at the \\(\\mathrm{CH_3}\\) next to C=O; an aromatic ring in the molecule is not halogenated.\n" +
        "- A tertiary alcohol, or a ketone with no \\(\\mathrm{CH_3CO}\\) group (pentan-3-one), gives no haloform.\n" +
        "- **Soda-lime decarboxylation**: \\(\\mathrm{RCOONa + NaOH \\xrightarrow{CaO,\\ heat} RH + Na_2CO_3}\\); one more carbon is lost.\n" +
        "- **Cannizzaro**: an aldehyde with no α-H (HCHO, \\(\\mathrm{C_6H_5CHO}\\), \\(\\mathrm{(CH_3)_3CCHO}\\)) in concentrated NaOH gives the alcohol and the carboxylate. In a crossed Cannizzaro, HCHO is the one oxidised, to formate.\n" +
        "- An α-keto aldehyde does the Cannizzaro reaction inside one molecule: the CHO becomes \\(\\mathrm{COO^-}\\) and the C=O next to it becomes CH(OH).\n" +
        "- **1,2-Diol with oxalic acid, strongly heated**: both OH are removed and the two carbons become a C=C (glycerol gives allyl alcohol at about 530 K).",
      formula: {
        label: "Haloform and Cannizzaro equations",
        latex:
          "\\mathrm{RCOCH_3 + 3X_2 + 4NaOH \\to RCOONa + CHX_3 + 3NaX + 3H_2O} \\qquad \\mathrm{2\\,ArCHO + NaOH \\to ArCH_2OH + ArCOONa}",
      },
      authoredExample: {
        prompt:
          "Pentan-2-ol is warmed with iodine and NaOH, and the organic salt formed is then heated with soda lime. Name the precipitate and the final organic product.",
        steps: [
          "Pentan-2-ol, \\(\\mathrm{CH_3CH(OH)CH_2CH_2CH_3}\\), has the \\(\\mathrm{CH_3CH(OH){-}}\\) unit. Hypoiodite oxidises it to pentan-2-one, \\(\\mathrm{CH_3COCH_2CH_2CH_3}\\).",
          "The \\(\\mathrm{CH_3}\\) is iodinated three times and cut off as \\(\\mathrm{CHI_3}\\), a yellow precipitate. The rest is sodium butanoate, \\(\\mathrm{CH_3CH_2CH_2COONa}\\): four carbons from five.",
          "Soda lime removes \\(\\mathrm{CO_2}\\) as \\(\\mathrm{Na_2CO_3}\\), leaving \\(\\mathrm{CH_3CH_2CH_3}\\).",
        ],
        answer: "Iodoform, \\(\\mathrm{CHI_3}\\); the final product is propane.",
      },
      selfCheckExample: {
        prompt:
          "4-Methoxybenzaldehyde and formaldehyde are heated together with concentrated NaOH. Which compound is reduced, and what are the two products?",
        steps: [
          "Neither aldehyde has an α-H, so this is a crossed Cannizzaro reaction.",
          "HCHO is the more reactive carbonyl: hydroxide adds to it, and it passes a hydride to the aromatic aldehyde. HCHO is oxidised to formate.",
        ],
        answer:
          "4-Methoxybenzaldehyde is reduced to 4-methoxybenzyl alcohol, \\(\\mathrm{CH_3OC_6H_4CH_2OH}\\); formaldehyde becomes sodium formate, HCOONa.",
      },
      practiceSet: [
        { prompt: "Which of propan-1-ol, propan-2-ol and pentan-3-one gives iodoform?", answer: "Propan-2-ol" },
        { prompt: "Sodium butanoate is heated with soda lime. What forms?", answer: "Propane and sodium carbonate" },
        { prompt: "2,2-Dimethylpropanal is heated with concentrated NaOH. What forms?", answer: "2,2-Dimethylpropan-1-ol and sodium 2,2-dimethylpropanoate (Cannizzaro)" },
        { prompt: "Propane-1,2-diol is strongly heated with oxalic acid. What forms?", answer: "Propene; both OH groups are removed and the two carbons become a C=C" },
      ],
      pyqExampleId: "54959a84-e642-419c-97e7-60bca53b7a41", // 2021 — haloform of acetophenone with Br2/KOH
      traps: [
        {
          title: "The haloform reaction removes one carbon only",
          body: "Only the \\(\\mathrm{CH_3}\\) of the \\(\\mathrm{CH_3CO}\\) group leaves, as \\(\\mathrm{CHX_3}\\). A methyl ketone with n carbons gives a carboxylate with n − 1 carbons; soda lime then removes one more.",
        },
        {
          title: "Cannizzaro needs an aldehyde with no α-hydrogen",
          body: "Ethanal or propanal in alkali forms an enolate and gives an aldol product, not a Cannizzaro mixture. Formaldehyde, benzaldehyde and 2,2-dimethylpropanal have no α-H and disproportionate.",
        },
        {
          title: "In a crossed Cannizzaro, formaldehyde is oxidised",
          body: "Formaldehyde is the most reactive aldehyde, so hydroxide adds to it first and it gives up the hydride. It ends as formate, and the other aldehyde ends as the alcohol.",
        },
      ],
    },
  ],
};
