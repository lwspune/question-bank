import type { SubtopicNote } from "@/app/notes/_types";

export const ETHERS_ALC_NOTE: SubtopicNote = {
  subtopicName: "Ethers: Williamson Synthesis and Cleavage",
  title: "Ethers: Williamson Synthesis and Cleavage",
  oneLineDefinition:
    "Ethers are made by the Williamson synthesis, an SN2 reaction of an alkoxide or phenoxide with a methyl or primary halide, and are split by HI or HBr: iodide attacks the smaller alkyl group, a tertiary group leaves as a cation, and the aryl–oxygen bond never breaks.",
  whyItMatters:
    "Nineteen PYQs, seventeen of them multiple choice, and two from 2026. Six are about making ethers: which halide and alkoxide to pair, SN2 on an allylic bromide, and ethers formed from enol ethers and alcohols in acid. Nine ask which C–O bond HI or HBr breaks and what the fragments become. Four follow an aryl ether through ring substitution or a structure proof, and two of those ask for a number.",
  concepts: [
    // C1 — making ethers
    {
      kind: "formula" as const,
      slug: "jcalc-ether-formation",
      name: "Making ethers: Williamson synthesis and acid routes",
      intuition:
        "In the Williamson synthesis an alkoxide or phenoxide ion attacks the carbon of an alkyl halide from the back (SN2). That carbon must be easy to reach, so the halide should be methyl or primary. Put any bulky group on the alkoxide side. A tertiary halide would lose HBr instead, and an aryl halide does not react at all.",
      definition:
        "- \\(\\mathrm{RO^-Na^+ + R'X \\to ROR' + NaX}\\), with \\(\\mathrm{R'}\\) methyl or primary.\n" +
        "- Aryl alkyl ethers: phenoxide + alkyl halide, e.g. \\(\\mathrm{C_6H_5O^-Na^+ + CH_3I}\\) → anisole. Never aryl halide + alkoxide.\n" +
        "- A tertiary halide with an alkoxide gives an alkene (elimination).\n" +
        "- Symmetrical ethers: a primary alcohol with conc. \\(\\mathrm{H_2SO_4}\\) at 413 K (ethanol gives ethoxyethane); at 443 K the alkene forms instead.\n" +
        "- SN2 on an allylic halide keeps the double bond where it was: phenoxide + \\(\\mathrm{(CH_3)_2C{=}CHCH_2Br}\\) gives \\(\\mathrm{C_6H_5OCH_2CH{=}C(CH_3)_2}\\).\n" +
        "- In acid, an alcohol adds to an enol ether: 3,4-dihydro-2H-pyran + ROH gives a THP ether (an acetal). \\(\\mathrm{Br_2}\\) in methanol on an enol ether puts OCH₃ on the carbon next to the ring oxygen, trans to Br. An OH in the same molecule can trap a carbocation and close a cyclic ether.",
      formula: {
        label: "Williamson synthesis",
        latex:
          "\\mathrm{R{-}O^-Na^+ + R'{-}X \\xrightarrow{S_N2} R{-}O{-}R' + NaX} \\qquad (\\mathrm{R'} = \\mathrm{CH_3} \\text{ or primary; never aryl})",
      },
      authoredExample: {
        prompt: "Plan a Williamson synthesis of 2-ethoxy-2-methylpropane, \\(\\mathrm{(CH_3)_3C{-}O{-}CH_2CH_3}\\), and say which pairing fails.",
        steps: [
          "The ether can be cut at either C–O bond, giving two possible pairings.",
          "Pairing 1: \\(\\mathrm{(CH_3)_3CO^-Na^+ + CH_3CH_2Br}\\). The halide is primary, so SN2 works.",
          "Pairing 2: \\(\\mathrm{CH_3CH_2O^-Na^+ + (CH_3)_3CBr}\\). The halide is tertiary; ethoxide acts as a base and 2-methylpropene forms.",
        ],
        answer: "Sodium tert-butoxide + ethyl bromide; ethoxide + tert-butyl bromide gives an alkene instead.",
      },
      selfCheckExample: {
        prompt: "Choose the halide and alkoxide for making 2-methoxypropane, \\(\\mathrm{(CH_3)_2CH{-}O{-}CH_3}\\).",
        steps: [
          "Keep the halide as simple as possible: methyl iodide cannot eliminate.",
          "The alkoxide is then sodium propan-2-oxide, \\(\\mathrm{(CH_3)_2CHO^-Na^+}\\).",
          "The other pairing, methoxide + 2-bromopropane, uses a secondary halide and gives much propene.",
        ],
        answer: "\\(\\mathrm{(CH_3)_2CHO^-Na^+ + CH_3I}\\).",
      },
      practiceSet: [
        { prompt: "Can bromobenzene and sodium ethoxide give ethyl phenyl ether?", answer: "No; use sodium phenoxide and ethyl bromide" },
        { prompt: "At what temperature does ethanol with conc. \\(\\mathrm{H_2SO_4}\\) give ethoxyethane?", answer: "413 K" },
        { prompt: "What does tert-butyl bromide give with sodium methoxide?", answer: "Mainly 2-methylpropene (elimination)" },
        { prompt: "What kind of compound is the THP ether formed from an alcohol and dihydropyran?", answer: "An acetal" },
      ],
      pyqExampleId: "0ec3ef02-9018-4ff9-bb6a-f0b509afe541", // 2023 — anisole from sodium phenoxide and methyl bromide
      traps: [
        {
          title: "The halide side must be simple",
          body: "The alkoxide can be as bulky as you like; the halide cannot. A tertiary halide eliminates and an aryl halide does not undergo SN2.",
        },
        {
          title: "SN2 does not move the double bond",
          body: "With an allylic bromide, the SN2 product has oxygen on the carbon that carried Br. The product with oxygen on the far end of the old C=C comes from SN1 or SN2′ and is the usual wrong option.",
        },
      ],
    },

    // C2 — cleavage by HI / HBr
    {
      kind: "formula" as const,
      slug: "jcalc-ether-cleavage",
      name: "Cleaving ethers with HI and HBr",
      intuition:
        "The acid protonates the ether oxygen, turning an alcohol into a leaving group. Then iodide attacks. If both groups are methyl or primary, it attacks the less hindered one (SN2). If one group is tertiary, that group leaves as a stable cation (SN1) and ends up as the iodide. An aryl–oxygen bond is never broken.",
      definition:
        "- Reactivity: HI > HBr > HCl.\n" +
        "- Methyl or primary groups: SN2 at the smaller one. \\(\\mathrm{CH_3OCH_2CH_3 + HI \\to CH_3I + CH_3CH_2OH}\\).\n" +
        "- A tertiary (or other stable-cation) group: SN1, the halide goes to that carbon. \\(\\mathrm{(CH_3)_3COCH_3 + HI \\to (CH_3)_3CI + CH_3OH}\\).\n" +
        "- Aryl alkyl ethers give a phenol and an alkyl halide: \\(\\mathrm{C_6H_5OCH_3 + HI \\to C_6H_5OH + CH_3I}\\). No iodobenzene forms, and the phenol reacts no further.\n" +
        "- Excess hot HI converts the alcohol fragment into a second alkyl iodide as well.\n" +
        "- In a molecule with another reactive group, such as a C=C, excess HBr reacts there too.",
      formula: {
        label: "Which bond HI breaks",
        latex:
          "\\mathrm{Ar{-}O{-}R + HI \\to Ar{-}OH + R{-}I} \\qquad \\mathrm{R_3C{-}O{-}R' + HI \\to R_3C{-}I + R'{-}OH}",
      },
      authoredExample: {
        prompt:
          "Give the products of one equivalent of hot HI with (a) methoxyethane, (b) ethoxybenzene and (c) 2-ethoxy-2-methylpropane.",
        steps: [
          "(a) Both groups are unhindered; iodide attacks the smaller methyl group by SN2: \\(\\mathrm{CH_3I + CH_3CH_2OH}\\).",
          "(b) The aryl–O bond cannot break, so iodide attacks the ethyl group: \\(\\mathrm{C_6H_5OH + CH_3CH_2I}\\).",
          "(c) The tert-butyl group leaves as a stable cation (SN1), which iodide then captures: \\(\\mathrm{(CH_3)_3CI + CH_3CH_2OH}\\).",
        ],
        answer: "(a) Iodomethane + ethanol; (b) phenol + iodoethane; (c) 2-iodo-2-methylpropane + ethanol.",
      },
      selfCheckExample: {
        prompt:
          "An ether \\(\\mathrm{C_4H_{10}O}\\) gives only one alkyl iodide with excess hot HI. The iodide with aqueous NaOH gives an alcohol that gives a yellow precipitate with NaOI. Identify the ether.",
        steps: [
          "The \\(\\mathrm{C_4H_{10}O}\\) ethers are 1-methoxypropane, 2-methoxypropane and ethoxyethane.",
          "Only ethoxyethane has two identical groups, so only it gives a single iodide, iodoethane.",
          "Iodoethane gives ethanol, which has the \\(\\mathrm{CH_3CH(OH)}\\)– unit and gives iodoform.",
        ],
        answer: "Ethoxyethane, \\(\\mathrm{CH_3CH_2OCH_2CH_3}\\).",
      },
      practiceSet: [
        { prompt: "What does anisole give with hot HI?", answer: "Phenol and iodomethane" },
        { prompt: "Can iodobenzene form when an aryl alkyl ether is heated with HI?", answer: "No; the aryl–O bond does not break" },
        { prompt: "What does benzyl phenyl ether give with HI?", answer: "Phenol and benzyl iodide" },
        { prompt: "Arrange HCl, HBr and HI by their ability to cleave ethers.", answer: "HI > HBr > HCl" },
      ],
      pyqExampleId: "a78e9c9d-0813-43ad-834c-9b9b38e541b8", // 2024 — cyclohexyl tert-butyl ether + HI: cyclohexanol + tert-butyl iodide
      traps: [
        {
          title: "A tertiary group reverses the 'smaller group' rule",
          body: "With a methyl or primary partner, iodide ends on the smaller group. When one group is tertiary, the iodide ends on the tertiary carbon, because that bond breaks first to give the cation.",
        },
        {
          title: "Phenol is the end of the line",
          body: "An aryl alkyl ether gives a phenol and an alkyl halide. Even with excess HI the phenol is not turned into an aryl iodide.",
        },
      ],
    },

    // C3 — aryl ether road maps
    {
      kind: "formula" as const,
      slug: "jcalc-aryl-ether-roadmaps",
      name: "Aryl ethers on the ring and in structure proofs",
      intuition:
        "An alkoxy group on a ring pushes electrons into it, like OH but less strongly. So anisole reacts with electrophiles at ortho and para, mostly para because the group is bulky. In a structure proof each reagent reports one feature: FeCl₃ a free phenolic OH, HI a methoxy group, KMnO₄ a C=C.",
      definition:
        "- \\(\\mathrm{OCH_3}\\) and \\(\\mathrm{OC_2H_5}\\) are activating, ortho/para directing; para is the major product.\n" +
        "- Anisole + \\(\\mathrm{Br_2}\\) in ethanoic acid (no \\(\\mathrm{FeBr_3}\\)) → mainly p-bromoanisole.\n" +
        "- Nitration (conc. \\(\\mathrm{HNO_3/H_2SO_4}\\)) → o- and p-nitroanisole, para major.\n" +
        "- Friedel–Crafts: \\(\\mathrm{CH_3Cl/AlCl_3}\\) → 2- and 4-methoxytoluene; \\(\\mathrm{CH_3COCl/AlCl_3}\\) → 2- and 4-methoxyacetophenone.\n" +
        "- When the para position is taken, the next group goes ortho to the alkoxy group, which is the stronger director.\n" +
        "- Clues in a structure proof: neutral \\(\\mathrm{FeCl_3}\\) colour, a free phenolic OH; NaOH + \\(\\mathrm{CH_3Br}\\) adding \\(\\mathrm{CH_2}\\) to the formula, one such OH; \\(\\mathrm{CH_3I}\\) from hot HI, a methoxy group; decolouring alkaline \\(\\mathrm{KMnO_4}\\), a C=C; hot alkali giving an isomer, an allyl side chain moving into conjugation.\n" +
        "- An aldehyde with no α-hydrogen + HCHO in conc. NaOH (crossed Cannizzaro) gives \\(\\mathrm{ArCH_2OH}\\), which can then be made into an ether.",
      formula: {
        label: "Degree of unsaturation (rings + π bonds)",
        latex: "\\text{DU} = \\dfrac{2C + 2 - H}{2} \\qquad (\\text{O atoms do not count})",
      },
      authoredExample: {
        prompt:
          "Compound A, \\(\\mathrm{C_7H_8O}\\), does not dissolve in NaOH and gives no colour with \\(\\mathrm{FeCl_3}\\). Hot HI converts it into \\(\\mathrm{CH_3I}\\) and B, which gives a violet colour with \\(\\mathrm{FeCl_3}\\). A with \\(\\mathrm{Br_2}\\) in ethanoic acid gives C. Identify A, B and C, and count the π bonds in A.",
        steps: [
          "No NaOH salt and no \\(\\mathrm{FeCl_3}\\) colour: A has no O–H.",
          "\\(\\mathrm{CH_3I}\\) from HI means a methoxy group; B, a phenol, is left: A is anisole, \\(\\mathrm{C_6H_5OCH_3}\\), and B is phenol.",
          "\\(\\mathrm{OCH_3}\\) directs para: C is p-bromoanisole.",
          "DU \\(= (14 + 2 - 8)/2 = 4\\): one ring and three π bonds.",
        ],
        answer: "A anisole, B phenol, C p-bromoanisole; A has 3 π bonds.",
      },
      selfCheckExample: {
        prompt:
          "Anisole is treated with \\(\\mathrm{CH_3COCl}\\) and \\(\\mathrm{AlCl_3}\\), and the major product is heated with HI. Name both products.",
        steps: [
          "Friedel–Crafts acylation goes mainly para to \\(\\mathrm{OCH_3}\\): 4-methoxyacetophenone.",
          "HI breaks the \\(\\mathrm{O{-}CH_3}\\) bond, not the aryl–O bond: 4-hydroxyacetophenone and \\(\\mathrm{CH_3I}\\).",
        ],
        answer: "4-Methoxyacetophenone, then 4-hydroxyacetophenone (with iodomethane).",
      },
      practiceSet: [
        { prompt: "What is the major product of anisole with \\(\\mathrm{Br_2}\\) in ethanoic acid?", answer: "p-Bromoanisole" },
        { prompt: "Is the methoxy group of anisole activating or deactivating?", answer: "Activating, ortho/para directing" },
        { prompt: "An unknown gives \\(\\mathrm{CH_3I}\\) when heated with HI. Which group does it contain?", answer: "A methoxy group, \\(\\mathrm{OCH_3}\\)" },
        { prompt: "What is the degree of unsaturation of \\(\\mathrm{C_8H_{10}O}\\)?", answer: "4" },
      ],
      pyqExampleId: "a3f139f3-1905-495e-a457-80ca3ac4dab2", // 2023 — eugenol from FeCl3, methylation, HI and isomerisation clues
      traps: [
        {
          title: "The ring is not a π bond",
          body: "The degree of unsaturation counts rings and π bonds together. A benzene ring uses four: one for the ring and three for its π bonds.",
        },
        {
          title: "Para blocked means ortho to the alkoxy group",
          body: "In 4-nitroanisole the next bromine goes ortho to \\(\\mathrm{OCH_3}\\), not ortho to \\(\\mathrm{NO_2}\\). The activating group wins the directing contest.",
        },
      ],
    },
  ],
};
