import type { SubtopicNote } from "@/app/notes/_types";

export const INTERMEDIATES_GOC_NOTE: SubtopicNote = {
  subtopicName: "Reaction Intermediates, Bond Fission and Reagents",
  title: "Reaction Intermediates, Bond Fission and Reagents",
  oneLineDefinition:
    "A covalent bond breaks evenly into two free radicals or unevenly into a carbocation and an anion; how stable these short-lived species are, and whether a reagent gives or takes an electron pair, decides how a reaction runs.",
  whyItMatters:
    "Twenty-four PYQs, four of them asking for a number, and one from 2026. Sixteen are about carbocations: their shape, their order of stability or of hydride affinity, how many hyperconjugating hydrogens hold one up, and the shifts and ring expansions that move the charge. Eight cover bond fission and the other species: which fission gives ions, free radicals and carbanions ranked by stability, nucleophiles and electrophilic centres counted, the radical from benzoyl peroxide, and a Grignard reagent destroyed by an O–H group.",
  concepts: [
    // C1 — carbocations
    {
      kind: "formula" as const,
      slug: "jcgoc-carbocation",
      name: "Carbocation stability, hydride affinity and rearrangement",
      intuition:
        "A carbocation is a carbon with only six electrons: sp², flat, with an empty p orbital, and hungry for electrons. Anything that feeds electron density into that empty orbital steadies it: alkyl groups through hyperconjugation and the +I effect, and a neighbouring π system or lone pair through resonance. The more stable the cation, the less energy it releases when it finally takes a hydride ion.",
      definition:
        "- Shape: sp², trigonal planar, with the empty p orbital at right angles to the plane. It is an electrophile.\n" +
        "- Alkyl order: \\(3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^+}\\), matching the α-hydrogens: 9 in tert-butyl, 6 in isopropyl, 3 in ethyl, none in methyl.\n" +
        "- Resonance outweighs hyperconjugation: benzylic and allylic cations are stabilised, and each extra phenyl ring helps more, \\(\\mathrm{Ph_3C^+ > Ph_2CH^+ > PhCH_2^+}\\).\n" +
        "- The tropylium ion, \\(\\mathrm{C_7H_7^+}\\), is aromatic (6 π electrons in a planar ring) and very stable. Cyclopropyl groups on the cationic carbon also stabilise it strongly: tricyclopropylmethyl is an exceptionally stable cation.\n" +
        "- A lone-pair donor that can reach the positive carbon (\\(\\mathrm{-OCH_3}\\), \\(\\mathrm{-NR_2}\\)) stabilises it by +R: a para \\(\\mathrm{-OCH_3}\\) on a benzyl cation helps, a meta one cannot reach the charge. A \\(\\mathrm{-NO_2}\\) group destabilises it.\n" +
        "- Vinyl \\(\\mathrm{CH_2{=}CH^+}\\) and ethynyl cations are very unstable: the charge sits on a carbon with more s-character.\n" +
        "- **Hydride affinity** is the energy released when a cation captures \\(\\mathrm{H^-}\\). The more stable the cation, the LOWER its hydride affinity.\n" +
        "- **Rearrangement**: a 1,2-hydride or 1,2-methyl shift turns a cation into a more stable one. A cation next to a cyclobutane ring expands it to a cyclopentane ring to relieve strain, and ring growth stops at six.",
      formula: {
        label: "Hyperconjugation count and alkyl order",
        latex:
          "\\text{hyperconjugating H} = \\text{number of } \\alpha\\text{-H} \\qquad 3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^+}",
      },
      authoredExample: {
        prompt:
          "Arrange \\(\\mathrm{(CH_3)_2CH^+}\\), \\(\\mathrm{CH_3CH_2^+}\\), \\(\\mathrm{(C_6H_5)_2CH^+}\\) and \\(\\mathrm{CH_3^+}\\) in decreasing order of stability, and then in decreasing order of hydride affinity.",
        steps: [
          "Diphenylmethyl: the positive charge spreads into two benzene rings by resonance. Most stable.",
          "Isopropyl has 6 α-hydrogens and ethyl has 3, so isopropyl is more stable than ethyl.",
          "Methyl has no α-hydrogen and no resonance: least stable.",
          "Hydride affinity is highest for the least stable cation, so it runs in the reverse order.",
        ],
        answer:
          "Stability: \\(\\mathrm{(C_6H_5)_2CH^+ > (CH_3)_2CH^+ > CH_3CH_2^+ > CH_3^+}\\). Hydride affinity: \\(\\mathrm{CH_3^+ > CH_3CH_2^+ > (CH_3)_2CH^+ > (C_6H_5)_2CH^+}\\).",
      },
      selfCheckExample: {
        prompt:
          "Which is more stable, the 4-methoxybenzyl cation or the 4-nitrobenzyl cation? Which of the two has the higher hydride affinity?",
        steps: [
          "The para \\(\\mathrm{-OCH_3}\\) group can push its oxygen lone pair through the ring onto the \\(\\mathrm{CH_2^+}\\) carbon (+R): stabilising.",
          "The para \\(\\mathrm{-NO_2}\\) group pulls electrons out of the ring (−R and −I): destabilising.",
          "The less stable cation releases more energy when it takes \\(\\mathrm{H^-}\\).",
        ],
        answer: "The 4-methoxybenzyl cation is more stable; the 4-nitrobenzyl cation has the higher hydride affinity.",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of the positive carbon of a carbocation?", answer: "sp², trigonal planar" },
        { prompt: "How many hyperconjugating hydrogens does the tert-butyl cation have?", answer: "9" },
        { prompt: "Is the tropylium ion, \\(\\mathrm{C_7H_7^+}\\), aromatic?", answer: "Yes; 6 π electrons in a planar ring" },
        { prompt: "What does a 1,2-hydride shift turn a secondary cation next to a tertiary C–H into?", answer: "A tertiary cation" },
      ],
      pyqExampleId: "9dcc42ad-3f66-486f-a5e4-733bd6119125", // 2023 — decreasing hydride affinity of four carbocations
      traps: [
        {
          title: "More stable means LOWER hydride affinity",
          body: "Hydride affinity measures how eagerly a cation grabs \\(\\mathrm{H^-}\\). A stable cation is not eager, so the order of hydride affinity is the reverse of the order of stability.",
        },
        {
          title: "A meta donor cannot reach the charge",
          body: "On a benzyl cation, the positive charge spreads only to the ortho and para ring carbons. An \\(\\mathrm{-OCH_3}\\) at the meta position cannot donate its lone pair to the charge, so it helps far less than a para one.",
        },
        {
          title: "The vinyl cation is not allylic",
          body: "In \\(\\mathrm{CH_2{=}CH^+}\\) the charge sits ON the double-bond carbon, which cannot spread it. In the allyl cation, \\(\\mathrm{CH_2{=}CH{-}CH_2^+}\\), it sits next to the double bond and is shared by resonance.",
        },
        {
          title: "The methyl cation has no hyperconjugation",
          body: "Hyperconjugation needs a C–H bond on the carbon NEXT to the cationic carbon. \\(\\mathrm{CH_3^+}\\) has no such carbon, so it has no hyperconjugating hydrogen at all.",
        },
      ],
    },

    // C2 — bond fission, radicals, carbanions and reagents
    {
      kind: "reference" as const,
      slug: "jcgoc-fission-reagents",
      name: "Bond fission, free radicals, carbanions and reagent types",
      intuition:
        "A covalent bond breaks in one of two ways. If each atom keeps one electron (homolysis), two free radicals form, usually with heat, light or a peroxide. If one atom keeps both electrons (heterolysis), ions form, and the reactions that follow are called ionic or polar reactions. A reagent then either brings an electron pair (a nucleophile) or looks for one (an electrophile).",
      definition:
        "- **Homolysis** → free radicals → free-radical reactions. **Heterolysis** → a carbocation and an anion, or a carbanion and a cation → ionic reactions.\n" +
        "- **Free radicals**: allylic, benzylic and propargylic radicals are the most stable (resonance); then \\(3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3^{\\bullet}}\\). A radical on an sp² or sp carbon (vinyl, ethynyl) is the least stable.\n" +
        "- **Carbanions**: sp³, pyramidal, with a lone pair; they are nucleophiles and bases. The alkyl order is reversed: \\(\\mathrm{CH_3^- > 1^\\circ > 2^\\circ > 3^\\circ}\\). −R groups (C=O, \\(\\mathrm{NO_2}\\), CN) stabilise them, and the aromatic cyclopentadienyl anion (6 π electrons) is very stable, while the antiaromatic cyclopropenyl anion is very unstable.\n" +
        "- **Nucleophiles** give an electron pair, from a lone pair or a π bond: \\(\\mathrm{OH^-}\\), \\(\\mathrm{CN^-}\\), \\(\\mathrm{NH_3}\\), \\(\\mathrm{H_2O}\\), RSH, \\(\\mathrm{R_2S}\\), C=C. **Electrophiles** accept a pair: \\(\\mathrm{H^+}\\), carbocations, \\(\\mathrm{BF_3}\\), \\(\\mathrm{AlCl_3}\\).\n" +
        "- Electrophilic centres in a molecule: the carbon of C=O, the carbon of C≡N, and the β-carbon of a C=C conjugated with C=O.\n" +
        "- Benzoyl peroxide gives benzoyloxy radicals, which lose \\(\\mathrm{CO_2}\\): \\(\\mathrm{(C_6H_5COO)_2 \\to 2\\,C_6H_5COO^{\\bullet} \\to 2\\,C_6H_5^{\\bullet} + 2\\,CO_2}\\).\n" +
        "- A Grignard reagent, RMgX, reacts as a carbanion. Any O–H or N–H group protonates it: with an alcohol it gives the alkane RH.",
      table: {
        columns: ["Species", "Formed by", "Carbon: hybridisation and shape", "Electrons on the carbon", "Behaves as"],
        rows: [
          { cells: ["Carbocation", "Heterolysis; carbon loses the pair", "sp², trigonal planar", "6 (a sextet)", "Electrophile"] },
          { cells: ["Carbanion", "Heterolysis; carbon keeps the pair", "sp³, pyramidal", "8, with one lone pair", "Nucleophile and base"] },
          {
            cells: ["Free radical", "Homolysis", "sp², nearly planar", "7, with one unpaired electron", "Neutral, very reactive; starts chain reactions"],
            noteAmber: "Radical and carbocation stability follow the same alkyl order; carbanion stability runs the other way.",
          },
        ],
        caption: "All three are short-lived intermediates; none is isolated in an ordinary reaction.",
      },
      selfCheckExample: {
        prompt:
          "Arrange the free radicals \\(\\mathrm{CH_3^{\\bullet}}\\), \\(\\mathrm{(CH_3)_3C^{\\bullet}}\\), \\(\\mathrm{CH_2{=}CH{-}CH_2^{\\bullet}}\\) and \\(\\mathrm{(CH_3)_2CH^{\\bullet}}\\) in decreasing order of stability.",
        steps: [
          "The allyl radical spreads its unpaired electron over two carbons by resonance: most stable.",
          "The alkyl radicals follow hyperconjugation: tertiary > secondary > methyl.",
        ],
        answer: "\\(\\mathrm{CH_2{=}CH{-}CH_2^{\\bullet} > (CH_3)_3C^{\\bullet} > (CH_3)_2CH^{\\bullet} > CH_3^{\\bullet}}\\).",
      },
      practiceSet: [
        { prompt: "Which kind of bond fission gives ions?", answer: "Heterolysis (heterolytic cleavage)" },
        { prompt: "What is the shape of a carbanion?", answer: "Pyramidal (sp³)" },
        { prompt: "Why is the cyclopentadienyl anion unusually stable?", answer: "It is aromatic, with 6 π electrons in a planar ring" },
        { prompt: "What does \\(\\mathrm{CH_3MgBr}\\) give with methanol?", answer: "Methane and Mg(OCH₃)Br" },
      ],
      pyqExampleId: "20875b67-2d67-4a7b-b6e9-878c53394de1", // 2024 — ionic reactions proceed through heterolytic cleavage
      traps: [
        {
          title: "Carbanion stability runs opposite to carbocation stability",
          body: "Alkyl groups push electrons towards the carbon. That helps a positive carbon and hurts a negative one, so the methyl carbanion is the most stable simple carbanion and the tertiary one the least.",
        },
        {
          title: "Ionic reactions come from heterolysis",
          body: "Homolysis gives neutral radicals, which lead to free-radical reactions. Only heterolysis gives the ions that ionic reactions need.",
        },
        {
          title: "A π bond can make a nucleophile",
          body: "Ethene has no lone pair and no charge, yet its π electrons attack electrophiles such as \\(\\mathrm{H^+}\\) and \\(\\mathrm{Br^+}\\). Count alkenes when a question asks for nucleophiles.",
        },
      ],
    },
  ],
};
