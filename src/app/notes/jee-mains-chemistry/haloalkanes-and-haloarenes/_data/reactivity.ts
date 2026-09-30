import type { SubtopicNote } from "@/app/notes/_types";

export const REACTIVITY_HALO_NOTE: SubtopicNote = {
  subtopicName: "Reactivity Order in Nucleophilic Substitution",
  title: "Reactivity Order in Nucleophilic Substitution",
  oneLineDefinition:
    "Rank halides for SN1 by the stability of the carbocation they would form, and for SN2 by how open the carbon is to backside attack; vinylic, aryl and bridgehead halides cannot form a usable cation at all.",
  whyItMatters:
    "Sixteen PYQs, one numerical, three from 2026, the largest page in the chapter. Seven rank halides for SN1 by the stability of the cation they form; four ask which halides cannot ionise at all or give no precipitate with silver nitrate; five compare SN2 rates, where crowding, a benzylic carbon, a neighbouring group or an adjacent oxygen changes the answer.",
  concepts: [
    // C1 — SN1 order
    {
      kind: "formula" as const,
      slug: "jchalo-sn1-order",
      name: "SN1 reactivity: ranking halides by carbocation stability",
      intuition:
        "The slow step of SN1 is the halide leaving, so whatever makes the carbocation more stable makes the reaction faster. Resonance stabilises most (benzylic, allylic, a lone pair on an adjacent oxygen); alkyl groups help through hyperconjugation and their +I effect; electron-withdrawing groups make the cation worse.",
      definition:
        "- Alkyl cations: 3° > 2° > 1° > \\(\\mathrm{CH_3^+}\\), by hyperconjugation and the +I effect.\n" +
        "- Resonance: benzylic and allylic cations are stabilised, and each extra phenyl helps more: \\(\\mathrm{(C_6H_5)_3C^+ > (C_6H_5)_2CH^+ > C_6H_5CH_2^+}\\). A cation that is both 3° and allylic is better still.\n" +
        "- Ring substituents on a benzyl halide: \\(\\mathrm{p{-}OCH_3 > p{-}CH_3 > H > p{-}Cl > p{-}NO_2}\\). A donor para to the \\(\\mathrm{CH_2}\\) feeds the cation; a nitro group drains it.\n" +
        "- An oxygen next to the carbon, as in \\(\\mathrm{CH_3O{-}CH_2{-}Cl}\\), gives the cation \\(\\mathrm{CH_3O^+{=}CH_2}\\), so this primary halide ionises readily.\n" +
        "- For the same carbon skeleton, the leaving group decides: R–I > R–Br > R–Cl > R–F.",
      formula: {
        label: "SN1 order of alkyl halides; stability of phenyl-substituted cations",
        latex:
          "\\text{SN1: } 3^\\circ > 2^\\circ > 1^\\circ > \\mathrm{CH_3X} \\qquad \\mathrm{(C_6H_5)_3C^+ > (C_6H_5)_2CH^+ > C_6H_5CH_2^+}",
      },
      authoredExample: {
        prompt: "Arrange for SN1 hydrolysis in aqueous ethanol: bromomethane, 1-bromopropane, 2-bromopropane, 2-bromo-2-methylpropane.",
        steps: [
          "Write the cation each would give: \\(\\mathrm{CH_3^+}\\), \\(\\mathrm{CH_3CH_2CH_2^+}\\) (1°), \\(\\mathrm{(CH_3)_2CH^+}\\) (2°), \\(\\mathrm{(CH_3)_3C^+}\\) (3°).",
          "More alkyl groups on the positive carbon mean more hyperconjugation and more +I donation, so more stability.",
          "The rate follows cation stability.",
        ],
        answer: "2-Bromo-2-methylpropane > 2-bromopropane > 1-bromopropane > bromomethane",
      },
      selfCheckExample: {
        prompt: "Arrange for SN1: 4-methylbenzyl bromide, 4-nitrobenzyl bromide and benzyl bromide.",
        steps: [
          "All three give benzyl cations; only the para group differs.",
          "\\(\\mathrm{CH_3}\\) donates electrons (hyperconjugation and +I) and stabilises the cation; \\(\\mathrm{NO_2}\\) withdraws them (−I and −R) and destabilises it.",
        ],
        answer: "4-Methylbenzyl bromide > benzyl bromide > 4-nitrobenzyl bromide",
      },
      practiceSet: [
        { prompt: "Which ionises faster: \\(\\mathrm{CH_3OCH_2Cl}\\) or \\(\\mathrm{CH_3CH_2CH_2Cl}\\)?", answer: "\\(\\mathrm{CH_3OCH_2Cl}\\): the oxygen lone pair stabilises the cation" },
        { prompt: "Which is faster by SN1: 2-chloro-2-methylpropane or 3-chloro-3-methylbut-1-ene?", answer: "3-Chloro-3-methylbut-1-ene: its cation is both 3° and allylic" },
        { prompt: "Which is faster by SN1: \\(\\mathrm{(C_6H_5)_2CHCl}\\) or \\(\\mathrm{C_6H_5CH_2Cl}\\)?", answer: "\\(\\mathrm{(C_6H_5)_2CHCl}\\)" },
        { prompt: "Which is faster by SN1: tert-butyl iodide or tert-butyl chloride?", answer: "tert-Butyl iodide (better leaving group)" },
      ],
      pyqExampleId: "74fe92d7-4f5a-47a5-a132-369b78ea3e8d", // 2026 — benzyl chloride against ethyl chloride
      traps: [
        {
          title: "A para-chloro group slows SN1",
          body: "Chlorine donates a lone pair (+R) but withdraws more strongly through its −I effect, so 4-chlorobenzyl chloride ionises a little more slowly than benzyl chloride. It is still much faster than 4-nitrobenzyl chloride.",
        },
        {
          title: "Primary halides can still go SN1",
          body: "The rule 3° > 2° > 1° applies to plain alkyl halides. A primary halide whose cation is stabilised by resonance, such as benzyl chloride, allyl chloride or \\(\\mathrm{CH_3OCH_2Cl}\\), ionises readily.",
        },
      ],
    },

    // C2 — halides that cannot ionise
    {
      kind: "reference" as const,
      slug: "jchalo-ionisation-limits",
      name: "Halides that cannot ionise: vinylic, aryl and bridgehead",
      intuition:
        "SN1 needs a flat carbocation with an empty p orbital. A vinylic or aryl halide has a strong, partly double C–X bond and would give a very unstable cation. A halogen at the bridgehead of a small cage cannot leave either, because the cage cannot flatten. Silver nitrate makes the test visible: AgX precipitates only when the C–X bond ionises.",
      definition:
        "- With alcoholic \\(\\mathrm{AgNO_3}\\): \\(\\mathrm{R{-}X + Ag^+ \\to R^+ + AgX\\downarrow}\\). A precipitate forms at once with 3°, benzylic and allylic halides, slowly with 1°, and not at all with vinylic, aryl or bridgehead halides.\n" +
        "- Vinylic halides would give a cation on an sp carbon; aryl halides would give a phenyl cation whose empty orbital lies in the ring plane, away from the π system. Neither forms.\n" +
        "- Bridgehead halides in rigid bicyclic cages (Bredt's rule): the smaller the cage, the slower. 1-Halobicyclo[2.2.1]heptanes are slower than 1-halobicyclo[2.2.2]octanes, and both are far slower than an open-chain tertiary halide.\n" +
        "- The exception runs the other way: a halide whose cation is aromatic ionises very easily. 3-Bromocyclopropene gives the cyclopropenyl cation (2 π electrons) and 7-bromocycloheptatriene gives the tropylium cation (6 π electrons).",
      table: {
        columns: ["Halide", "Cation it would give", "SN1 and the AgNO₃ test"],
        rows: [
          { cells: ["\\(\\mathrm{(CH_3)_3C{-}Cl}\\)", "3° cation, stabilised by hyperconjugation", "Fast; AgCl precipitates at once"] },
          { cells: ["\\(\\mathrm{C_6H_5CH_2Cl}\\)", "Benzyl cation, stabilised by resonance", "Fast; AgCl precipitates"] },
          { cells: ["\\(\\mathrm{CH_2{=}CHCH_2Cl}\\)", "Allyl cation, stabilised by resonance", "Fast; AgCl precipitates"] },
          { cells: ["\\(\\mathrm{CH_3CH_2CH_2CH_2Cl}\\)", "1° cation, unstable", "Very slow; precipitate only on long warming"] },
          { cells: ["\\(\\mathrm{CH_2{=}CHCl}\\)", "Vinyl cation, charge on an sp carbon", "No SN1; no precipitate"] },
          { cells: ["\\(\\mathrm{C_6H_5Cl}\\)", "Phenyl cation, empty orbital in the ring plane", "No SN1; no precipitate"] },
          { cells: ["1-Bromobicyclo[2.2.2]octane", "Bridgehead cation that cannot become planar", "Extremely slow; no practical SN1"] },
          { cells: ["3-Bromocyclopropene", "Cyclopropenyl cation, aromatic with 2 π electrons", "Ionises readily; AgBr precipitates"] },
        ],
        caption: "Being tertiary is not enough: the cation must also be able to become planar.",
      },
      selfCheckExample: {
        prompt: "Which of these gives a precipitate with alcoholic \\(\\mathrm{AgNO_3}\\) on warming: bromobenzene, 1-bromoprop-1-ene or 3-bromoprop-1-ene?",
        steps: [
          "Bromobenzene is an aryl halide and 1-bromoprop-1-ene (\\(\\mathrm{CH_3CH{=}CHBr}\\)) is a vinylic halide; neither ionises.",
          "3-Bromoprop-1-ene (\\(\\mathrm{CH_2{=}CHCH_2Br}\\)) is allylic and gives the resonance-stabilised allyl cation.",
        ],
        answer: "Only 3-bromoprop-1-ene (allyl bromide)",
      },
      practiceSet: [
        { prompt: "Why does chlorobenzene give no precipitate with \\(\\mathrm{AgNO_3}\\)?", answer: "Its C–Cl bond has partial double-bond character and the phenyl cation is very unstable" },
        { prompt: "Which reacts with \\(\\mathrm{AgNO_3}\\): 1-chlorocyclohexene or 3-chlorocyclohexene?", answer: "3-Chlorocyclohexene (allylic)" },
        { prompt: "Does 7-bromocyclohepta-1,3,5-triene ionise easily?", answer: "Yes: it gives the aromatic tropylium cation" },
        { prompt: "Why is a bridgehead halide in a small bicyclic cage inert to SN1?", answer: "The bridgehead cation cannot become planar" },
      ],
      pyqExampleId: "b82474dc-9914-4f70-8621-db25e4b81b8f", // 2022 — which compound is inactive towards SN1
      traps: [
        {
          title: "A tertiary bridgehead halide does not ionise",
          body: "A halogen at the bridgehead of a small cage is tertiary, yet it barely reacts by SN1: the cage holds the carbon pyramidal, so the cation cannot flatten.",
        },
        {
          title: "Some cyclic halides ionise because the cation is aromatic",
          body: "3-Bromocyclopropene and 7-bromocycloheptatriene look like awkward substrates, but their cations are aromatic. They precipitate silver bromide readily.",
        },
      ],
    },

    // C3 — SN2 order
    {
      kind: "formula" as const,
      slug: "jchalo-sn2-order",
      name: "SN2 reactivity: crowding, neighbouring groups and benzylic halides",
      intuition:
        "SN2 needs room behind the carbon for the nucleophile to come in. Every alkyl group on that carbon, or on the carbon next to it, gets in the way. Two effects speed SN2 up: a π system next to the carbon, which overlaps the p orbital of the transition state, and a lone pair inside the molecule that can attack first.",
      definition:
        "- \\(\\mathrm{CH_3X}\\) > 1° > 2° > 3°; tertiary halides practically do not react by SN2.\n" +
        "- Branching on the next carbon also slows SN2: neopentyl halides \\(\\mathrm{(CH_3)_3C{-}CH_2X}\\) are primary but react very slowly.\n" +
        "- Benzylic and allylic halides react faster than ethyl halides by SN2, because the ring or C=C conjugates with the p orbital of the five-coordinate transition state.\n" +
        "- **Neighbouring group participation**: in \\(\\mathrm{Et_2N{-}CH_2CH_2{-}Cl}\\) the nitrogen lone pair displaces chloride first, inside the molecule, to give a three-membered aziridinium ion; hydroxide then opens it. This makes it hydrolyse faster than \\(\\mathrm{Et_2CH{-}CH_2CH_2{-}Cl}\\).\n" +
        "- The leaving group matters too: R–I > R–Br > R–Cl > R–F.",
      formula: {
        label: "SN2 order of alkyl halides; leaving-group order",
        latex:
          "\\text{SN2: } \\mathrm{CH_3X} > 1^\\circ > 2^\\circ > 3^\\circ \\qquad \\mathrm{R{-}I > R{-}Br > R{-}Cl > R{-}F}",
      },
      authoredExample: {
        prompt: "Arrange for reaction with NaI in acetone: chloromethane, 1-chlorobutane, 2-chlorobutane, 2-chloro-2-methylpropane.",
        steps: [
          "NaI in acetone is a strong nucleophile in an aprotic solvent: SN2.",
          "Count the alkyl groups on the carbon holding Cl: none, one, two, three.",
          "Each extra group blocks backside attack more, so the rate falls.",
        ],
        answer: "Chloromethane > 1-chlorobutane > 2-chlorobutane > 2-chloro-2-methylpropane",
      },
      selfCheckExample: {
        prompt: "Which reacts faster with \\(\\mathrm{I^-}\\) in acetone: 3-chloroprop-1-ene or 1-chloropropane? Give the reason.",
        steps: [
          "Both are primary chlorides with the same number of carbons, so crowding is about the same.",
          "In 3-chloroprop-1-ene the C=C sits next to the reacting carbon and overlaps the p orbital that forms in the transition state, lowering its energy.",
        ],
        answer: "3-Chloroprop-1-ene (allyl chloride): its transition state is stabilised by conjugation with the C=C.",
      },
      practiceSet: [
        { prompt: "Which is faster by SN2: 1-bromobutane or 1-chlorobutane?", answer: "1-Bromobutane (better leaving group)" },
        { prompt: "Why is \\(\\mathrm{(CH_3)_3C{-}CH_2Br}\\) slow in SN2 although it is primary?", answer: "The bulky tert-butyl group on the next carbon blocks backside attack" },
        { prompt: "Which is faster by SN2: 1-bromobutane or 2-bromobutane?", answer: "1-Bromobutane" },
        { prompt: "Why does \\(\\mathrm{ClCH_2CH_2{-}S{-}CH_2CH_3}\\) hydrolyse unusually fast?", answer: "The sulfur lone pair displaces chloride first, forming a cyclic sulfonium ion that water then opens" },
      ],
      pyqExampleId: "c444623d-bb09-4b6e-a12c-29bf98fb62d9", // 2024 — benzyl bromide against ethyl bromide in SN2
      traps: [
        {
          title: "Primary does not guarantee fast SN2",
          body: "Neopentyl halides are primary, but the tert-butyl group next door blocks the back of the carbon. They react far more slowly than 1-halobutanes.",
        },
        {
          title: "Benzylic halides are fast by both mechanisms",
          body: "Benzyl halides ionise easily (SN1) and also react fast by SN2, because the ring stabilises both the cation and the SN2 transition state. Do not assume that fast SN1 means slow SN2.",
        },
      ],
    },
  ],
};
