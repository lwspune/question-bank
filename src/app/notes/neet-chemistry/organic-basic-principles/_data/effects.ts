import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_OC_EFFECTS_NOTE: SubtopicNote = {
  subtopicName: "Electronic Effects",
  title: "Electronic Effects",
  oneLineDefinition:
    "How a bond breaks into free radicals or ions, the carbocations, carbanions, nucleophiles and electrophiles that result, the four ways electrons shift inside a molecule, and how hyperconjugation and resonance steady a carbocation.",
  whyItMatters:
    "Three NEET questions, all from 2024 or later, and every one is about a carbocation. NEET 2024 asked which of four carbocations is the most stable, settled by counting α-hydrogens. Re-NEET 2024 asked which effect lets a methyl group steady a carbocation. Re-NEET 2026 asked which filled orbitals steady the 1-phenylethyl cation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchoc-intermediates",
      name: "Bond fission, reactive intermediates and reagents",
      intuition:
        "A covalent bond is a shared pair of electrons, and it can break in two ways. If each atom keeps one electron, you get two neutral free radicals. If one atom takes both electrons, you get ions: a carbon that lost the pair becomes a carbocation, a carbon that kept it becomes a carbanion. These species live only for a moment, so they are called reactive intermediates. A reagent attacks them, or a molecule, according to where the electrons are.",
      definition:
        "- **Homolysis**: each atom keeps one electron of the bond. It gives **free radicals** and needs heat or light.\n" +
        "- **Heterolysis**: one atom keeps both electrons. It gives a **carbocation** (carbon with six electrons in its outer shell, positive) or a **carbanion** (carbon with eight, one of them a lone pair, negative).\n" +
        "- A carbocation is sp² and flat, with an **empty p orbital** at right angles to its plane. A carbanion is sp³ and holds its lone pair in one of the four orbitals.\n" +
        "- Stability of alkyl carbocations: \\(\\text{(CH}_3\\text{)}_3\\text{C}^+ > \\text{(CH}_3\\text{)}_2\\text{CH}^+ > \\text{CH}_3\\text{CH}_2^+ > \\text{CH}_3^+\\), that is 3° > 2° > 1° > methyl. Alkyl free radicals follow the same order, 3° > 2° > 1°.\n" +
        "- A **nucleophile** (nucleus seeking) brings an electron pair. An **electrophile** (electron seeking) takes one.",
      table: {
        columns: ["Species", "Charge", "What it is", "Example"],
        rows: [
          {
            cells: ["Carbocation", "Positive", "Carbon with six outer electrons, sp², flat, with an empty p orbital", "\\(\\text{(CH}_3\\text{)}_3\\text{C}^+\\)"],
            noteAmber: "NEET 2024 asked which of four carbocations, drawn as structures, is the most stable.",
          },
          { cells: ["Carbanion", "Negative", "Carbon with eight outer electrons, one pair of them a lone pair, sp³", "\\(\\text{CH}_3^-\\)"] },
          { cells: ["Free radical", "Neutral", "Carbon with one unpaired electron, made by homolysis", "\\(\\text{CH}_3^{\\bullet}\\) (methyl radical)"] },
          { cells: ["Nucleophile", "Negative or neutral", "Gives an electron pair to an electron-poor atom", "\\(\\text{HO}^-\\), \\(\\text{CN}^-\\), \\(\\text{H}_2\\text{O}\\), \\(\\text{NH}_3\\)"] },
          { cells: ["Electrophile", "Positive or neutral", "Takes an electron pair from an electron-rich atom", "Carbocations, and the carbon of a C=O group"] },
        ],
        caption: "A neutral molecule with a lone pair is a nucleophile; a neutral molecule with an electron-poor carbon is an electrophile.",
      },
      pyqExampleId: "03b743c2-db29-4628-9694-2620b600c6cf",
      selfCheckExample: {
        prompt: "Which kind of bond fission gives free radicals, and what does it usually need?",
        steps: [
          "Free radicals have an unpaired electron, so each atom must keep one electron of the broken bond.",
          "That is homolysis, which is started by heat or light.",
        ],
        answer: "Homolysis, started by heat or light",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of the positive carbon of a carbocation?", answer: "sp²" },
        { prompt: "Is ammonia, \\(\\text{NH}_3\\), a nucleophile or an electrophile?", answer: "A nucleophile (it has a lone pair to give)" },
        { prompt: "How many electrons are in the outer shell of the negative carbon of a carbanion?", answer: "Eight" },
        { prompt: "A C-Br bond breaks so that Br leaves with both electrons. What does the carbon become?", answer: "A carbocation" },
      ],
      traps: [
        {
          title: "A carbocation has six electrons, not eight",
          body: "The positive carbon has only three bonds and an empty p orbital, so it is sp² and flat. The sp³ carbon with eight electrons is the carbanion.",
        },
        {
          title: "Electrophiles can be neutral",
          body: "An electrophile only needs an electron-poor atom. The carbon of a C=O group is one, even though the molecule carries no charge.",
        },
        {
          title: "The methyl cation is the least stable",
          body: "\\(\\text{CH}_3^+\\) has no alkyl group to help it, so it comes last: 3° > 2° > 1° > methyl.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchoc-effects",
      name: "The four electronic effects",
      intuition:
        "Electrons in a molecule are not shared evenly, and they shift in four ways. The inductive effect pulls or pushes them along the σ bonds. Resonance spreads π electrons and lone pairs over a conjugated system. The electromeric effect moves a whole π pair to one atom, but only while a reagent attacks. Hyperconjugation lets the σ electrons of a C-H bond spread into a neighbouring π bond or empty p orbital. Only the electromeric effect is temporary.",
      definition:
        "- **Inductive effect (I)**: a permanent shift of σ electrons towards the more electronegative atom, passed along the chain and fading quickly with distance. **-I groups** pull electrons: halogens, \\(\\text{-NO}_2\\), \\(\\text{-CN}\\), \\(\\text{-COOH}\\), \\(\\text{-COOR}\\). **+I groups** push them: alkyl groups such as methyl and ethyl.\n" +
        "- **Resonance**: when one structure cannot show a molecule, it is drawn as several **canonical structures**. None of them exists on its own; the real molecule is the **resonance hybrid**, more stable than any of them. The extra stability is the **resonance energy**.\n" +
        "- **Resonance effect (R)**: the shift of π electrons or lone pairs through a conjugated system. **+R**: halogens, -OH, -OR, \\(\\text{-NH}_2\\) give electrons to it. **-R**: -COOH, -CHO, >C=O, -CN, \\(\\text{-NO}_2\\) take electrons from it.\n" +
        "- **Electromeric effect (E)**: a temporary, complete move of a π pair to one atom of a multiple bond when a reagent attacks. When it works against the inductive effect, the electromeric effect wins.\n" +
        "- **Hyperconjugation**: the σ electrons of a C-H bond on the carbon next to a π bond or an empty p orbital spread into it. It is also called no-bond resonance.",
      table: {
        columns: ["Effect", "Electrons move through", "How long it lasts", "Example"],
        rows: [
          { cells: ["Inductive", "σ bonds, weaker with each bond along the chain", "Permanent", "Cl pulls electrons along the chain of \\(\\text{CH}_3\\text{CH}_2\\text{Cl}\\)"] },
          { cells: ["Resonance", "π electrons and lone pairs of a conjugated system", "Permanent", "The -OH lone pair spreads into the ring of phenol"] },
          { cells: ["Electromeric", "One π bond, whose pair moves fully to one atom", "Only while the reagent is attacking", "\\(\\text{H}^+\\) adding to a C=C bond"] },
          {
            cells: ["Hyperconjugation", "C-H σ bonds next to a π bond or an empty p orbital", "Permanent", "A methyl group on a carbocation or on a C=C"],
            noteAmber: "Re-NEET 2024: hyperconjugation is how a methyl group on the positive carbon steadies a carbocation.",
          },
        ],
      },
      pyqExampleId: "45c3f4b8-8609-480b-ba37-2931147f9fa5",
      selfCheckExample: {
        prompt: "Which electronic effect disappears as soon as the attacking reagent is taken away?",
        steps: [
          "The inductive effect, resonance and hyperconjugation are features of the molecule itself.",
          "Only the electromeric effect needs a reagent to be present.",
        ],
        answer: "The electromeric effect",
      },
      practiceSet: [
        { prompt: "Does a nitro group show a +I or a -I effect?", answer: "-I (it pulls electrons)" },
        { prompt: "Does an -OH group on a benzene ring show a +R or a -R effect?", answer: "+R (its lone pair spreads into the ring)" },
        { prompt: "Through which kind of bond does the inductive effect pass?", answer: "σ bonds" },
        { prompt: "What is the real structure of a molecule drawn as several canonical structures called?", answer: "The resonance hybrid" },
      ],
      traps: [
        {
          title: "Only the electromeric effect is temporary",
          body: "The inductive effect, resonance and hyperconjugation are always present. The electromeric effect exists only while a reagent attacks a multiple bond.",
        },
        {
          title: "A halogen is -I but +R",
          body: "A halogen pulls σ electrons because it is electronegative (-I), yet its lone pairs can spread into a π system (+R). The two effects act in opposite directions.",
        },
        {
          title: "Canonical structures are not real molecules",
          body: "No single resonance structure exists. The molecule is always the hybrid, and it is more stable than any one structure drawn for it.",
        },
        {
          title: "Methyl is +I, never -I",
          body: "An alkyl group pushes electrons. A methyl group on a carbocation helps it by its +I effect and by hyperconjugation, not by pulling electrons away.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchoc-carbocation",
      name: "What makes a carbocation stable",
      visualizationSlug: "neet-carbocation-stability",
      intuition:
        "The positive carbon has an empty p orbital. Anything that can feed electrons into that orbital spreads the positive charge and steadies the ion. A C-H bond on the next carbon can lean its σ electrons into it: that is hyperconjugation, and more such hydrogens means more help. A double bond or a benzene ring next to the positive carbon can feed in its π electrons: that is resonance. Either way the electrons must come from a filled orbital, because an empty orbital has nothing to give.",
      definition:
        "- An **α-carbon** is a carbon joined to the positive carbon. Each H on an α-carbon is an **α-hydrogen**, and each can take part in hyperconjugation.\n" +
        "- More α-hydrogens, more hyperconjugation, a more stable carbocation: \\(\\text{CH}_3^+\\) has 0, \\(\\text{CH}_3\\text{CH}_2^+\\) 3, \\(\\text{(CH}_3\\text{)}_2\\text{CH}^+\\) 6 and \\(\\text{(CH}_3\\text{)}_3\\text{C}^+\\) 9. This is why 3° > 2° > 1° > methyl.\n" +
        "- A C=C bond or a benzene ring joined to the positive carbon spreads the charge by **resonance**, so allylic (\\(\\text{CH}_2{=}\\text{CH-CH}_2^+\\)) and benzylic (\\(\\text{C}_6\\text{H}_5\\text{CH}_2^+\\)) carbocations are stabilised.\n" +
        "- The empty p orbital takes electrons only from **filled** orbitals: filled C-H σ orbitals (hyperconjugation) and filled π orbitals (resonance).",
      formula: {
        label: "Hyperconjugation count",
        latex: "\\text{number of hyperconjugating H} = \\text{number of } \\alpha\\text{-hydrogens}",
      },
      authoredExample: {
        prompt:
          "Count the α-hydrogens in \\(\\text{(CH}_3\\text{)}_2\\text{CH}^+\\) and in \\(\\text{(CH}_3\\text{)}_3\\text{C}^+\\), and say which carbocation is more stable.",
        steps: [
          "In \\(\\text{(CH}_3\\text{)}_2\\text{CH}^+\\) the positive carbon is joined to two \\(\\text{CH}_3\\) groups: 2 × 3 = 6 α-hydrogens. Its own H is not counted.",
          "In \\(\\text{(CH}_3\\text{)}_3\\text{C}^+\\) it is joined to three \\(\\text{CH}_3\\) groups: 3 × 3 = 9 α-hydrogens.",
          "More α-hydrogens means more hyperconjugation and a more stable ion.",
        ],
        answer: "6 and 9; \\(\\text{(CH}_3\\text{)}_3\\text{C}^+\\) is more stable",
      },
      selfCheckExample: {
        prompt: "Which is more stable, \\(\\text{CH}_3\\text{CH}_2^+\\) or the allyl cation \\(\\text{CH}_2{=}\\text{CH-CH}_2^+\\)? Give the reason.",
        steps: [
          "The ethyl cation is helped only by hyperconjugation with three α-hydrogens.",
          "In the allyl cation the π electrons of the C=C can move towards the positive carbon, so the charge is shared over two end carbons by resonance.",
        ],
        answer: "The allyl cation, because resonance spreads its positive charge",
      },
      practiceSet: [
        { prompt: "How many α-hydrogens does the ethyl cation, \\(\\text{CH}_3\\text{CH}_2^+\\), have?", answer: "3" },
        { prompt: "Why does the methyl cation, \\(\\text{CH}_3^+\\), get no help from hyperconjugation?", answer: "It has no α-carbon, so it has no α-hydrogens" },
        { prompt: "Count the α-hydrogens in \\(\\text{(CH}_3\\text{)}_2\\text{C}^+\\text{-CH}_2\\text{CH}_3\\).", answer: "8 (3 + 3 from the two methyl groups and 2 from the \\(\\text{CH}_2\\))" },
        { prompt: "Which orbital of a carbocation receives electrons in both hyperconjugation and resonance?", answer: "The empty p orbital of the positive carbon" },
      ],
      pyqExampleId: "1654ee55-326f-4cd9-8b1e-377622dd8278",
      traps: [
        {
          title: "Count the H atoms on the next carbon, not on the positive one",
          body: "A hydrogen on the positive carbon itself cannot hyperconjugate. Only hydrogens on carbons joined to it count.",
        },
        {
          title: "Only filled orbitals give electrons",
          body: "The empty p orbital is steadied by filled σ and filled π orbitals. Empty orbitals such as \\(\\sigma^*\\) and \\(\\pi^*\\) have no electrons to give it.",
        },
        {
          title: "Next to a ring or a C=C, count resonance too",
          body: "A carbocation joined to a benzene ring or a C=C bond is also steadied by resonance, so do not judge it by its α-hydrogens alone.",
        },
      ],
    },
  ],
};
