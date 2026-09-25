import type { SubtopicNote } from "@/app/notes/_types";

export const ELIMINATION_AND_HALOARENES_NOTE: SubtopicNote = {
  subtopicName: "Elimination and Aromatic Nucleophilic Substitution",
  title: "Elimination and Aromatic Nucleophilic Substitution",
  oneLineDefinition:
    "A strong base in alcohol pulls HX off an alkyl halide to give the more substituted alkene (Saytzeff), fastest for tertiary halides; on a haloarene the C–X bond breaks only when nitro groups ortho or para to it stabilise the intermediate, while electrophiles still substitute the ring at ortho and para.",
  whyItMatters:
    "13 PYQs, 1 HARD. Six are nitro-activated substitution on chloroarenes — which has the greatest difficulty breaking C–Cl (the meta-nitro isomer), which is most reactive (2,4,6-trinitro), what substrate gives picric acid. Four are elimination — the 3° > 2° > 1° order, the Saytzeff alkene, which reagent or base eliminates. Three are haloarene reactions: Fittig and the o/p nitration of chlorobenzene.",
  concepts: [
    // 1 — dehydrohalogenation
    {
      kind: "formula" as const,
      slug: "cethal-dehydrohalogenation",
      name: "Dehydrohalogenation and the Saytzeff Rule",
      intuition:
        "A base takes a β-hydrogen while the halide leaves, making a C=C. The more substituted the halide, the easier (3° > 2° > 1°) and the more substituted the alkene, the more stable — so the major product carries the most alkyl groups on the double bond (Saytzeff). Alcoholic KOH, alcoholic NH₃ and sodium ethoxide are the eliminating bases; aqueous OH⁻ substitutes instead.",
      definition:
        "- Ease: \\(3^\\circ > 2^\\circ > 1^\\circ\\). tert-Butyl bromide + alc. NH₃ (or alc. KOH) → isobutylene (2-methylpropene).\n" +
        "- **Saytzeff**: the alkene with more alkyl groups on C=C forms most easily — \\(\\text{R}_2\\text{C=CR}_2 > \\text{R}_2\\text{C=CHR} > \\text{RCH=CHR} > \\text{RCH=CH}_2\\). 2-Bromobutane → but-2-ene (major), but-1-ene (minor).\n" +
        "- Bulky base (sodium ethoxide) on a secondary halide: elimination wins — isopropyl chloride + \\(\\text{C}_2\\text{H}_5\\text{ONa}\\) → propene + ethanol + NaCl.\n" +
        "- Aqueous KOH → alcohol (substitution); alcoholic KOH → alkene (elimination). The solvent is the whole question.",
      formula: {
        label: "β-Elimination",
        latex:
          "\\text{R}_2\\text{CH-CR}_2\\text{X} \\xrightarrow{\\text{alc. KOH}} \\text{R}_2\\text{C=CR}_2 + \\text{HX} \\quad (\\text{Saytzeff: more substituted alkene})",
      },
      authoredExample: {
        prompt: "Give the major alkene from 2-bromo-2-methylbutane with alcoholic KOH, and the product of the same halide with aqueous KOH.",
        steps: [
          "Elimination towards the more substituted side: 2-methylbut-2-ene (trisubstituted) over 2-methylbut-1-ene. Aqueous KOH substitutes: 2-methylbutan-2-ol.",
        ],
        answer: "2-Methylbut-2-ene; 2-methylbutan-2-ol",
      },
      selfCheckExample: {
        prompt: "Which alkene forms most easily by dehydrohalogenation: \\(\\text{R}_2\\text{C=CH}_2\\), \\(\\text{RCH=CHR}\\), \\(\\text{R}_2\\text{C=CHR}\\), \\(\\text{R}_2\\text{C=CR}_2\\)?",
        steps: [
          "Tetrasubstituted is most stable.",
        ],
        answer: "\\(\\text{R}_2\\text{C=CR}_2\\)",
      },
      practiceSet: [
        { prompt: "Order of ease of dehydrohalogenation?", answer: "3° > 2° > 1°" },
        { prompt: "Reagent to turn tert-butyl bromide into isobutylene?", answer: "Alcoholic NH₃ (or alc. KOH)" },
        { prompt: "Sodium ethoxide + isopropyl chloride → X?", answer: "Propene" },
        { prompt: "2-Bromobutane + aqueous NaOH gives?", answer: "Butan-2-ol (substitution)" },
      ],
      pyqExampleId: "a1ad74ae-3195-4896-b209-6b4dcd1f675d",
      traps: [
        {
          title: "Expecting the ether from ethoxide and a 2° halide",
          body:
            "Ethoxide is a strong base as well as a nucleophile; on a secondary or tertiary halide it eliminates. 2-Ethoxypropane is the offered wrong answer; propene is the product.",
        },
      ],
    },

    // 2 — aromatic nucleophilic substitution
    {
      kind: "formula" as const,
      slug: "cethal-aromatic-nucleophilic-substitution",
      name: "Nitro Groups Activate the C–X Bond of a Haloarene",
      intuition:
        "Chlorobenzene resists nucleophiles — the ring's electrons repel them and the C–Cl bond has partial double-bond character. A nitro group ORTHO or PARA to the chlorine can take the negative charge of the attacking intermediate by resonance, so each such nitro group speeds substitution enormously; a META nitro group cannot and does nothing. With three nitro groups (picryl chloride) even warm water substitutes, giving picric acid.",
      definition:
        "- Reactivity in C–X cleavage: 2,4,6-trinitrochlorobenzene > 2,4-dinitrochlorobenzene > p- (or o-) nitrochlorobenzene > chlorobenzene.\n" +
        "- Greatest DIFFICULTY among o-, m-, p-nitro and trinitro: **m-nitrochlorobenzene** — the meta nitro cannot delocalise the charge onto the C–Cl carbon.\n" +
        "- Conditions: chlorobenzene needs NaOH at 623 K and 300 atm (Dow); p-nitrochlorobenzene 15% NaOH at 433 K; 2,4-dinitro warm NaOH; 2,4,6-trinitro warm water.\n" +
        "- Picric acid (2,4,6-trinitrophenol) from picryl chloride and water — the substrate 'S' question.",
      formula: {
        label: "Activation by nitro groups",
        latex:
          "\\text{rate} \\uparrow \\text{ with each } -\\text{NO}_2 \\text{ at o/p};\\qquad m\\text{-NO}_2 \\text{ has no effect}",
      },
      authoredExample: {
        prompt: "Arrange chlorobenzene (I), 2,4-dinitrochlorobenzene (II) and 2,4,6-trinitrochlorobenzene (III) by reactivity towards OH⁻, and say which of o-, m-, p-nitrochlorobenzene reacts slowest.",
        steps: [
          "More o/p nitro groups, faster: III > II > I. Meta is the slow one.",
        ],
        answer: "III > II > I; m-nitrochlorobenzene",
      },
      selfCheckExample: {
        prompt: "Which substrate gives 2,4,6-trinitrophenol simply on warming with water?",
        steps: [
          "Three activating nitro groups: 2,4,6-trinitrochlorobenzene (picryl chloride).",
        ],
        answer: "2,4,6-Trinitrochlorobenzene",
      },
      practiceSet: [
        { prompt: "Greatest difficulty breaking C–Cl: o-, m-, p-nitro or trinitrochlorobenzene?", answer: "m-Nitrochlorobenzene" },
        { prompt: "Most reactive: chlorobenzene, p-nitro-, 2,4-dinitro-, 2,4,6-trinitrochlorobenzene?", answer: "2,4,6-Trinitrochlorobenzene" },
        { prompt: "Order for chlorobenzene (I), 2,4-dinitro (II), 2,4,6-trinitro (III)?", answer: "III > II > I" },
        { prompt: "Substrate that gives picric acid with water?", answer: "2,4,6-Trinitrochlorobenzene" },
      ],
      pyqExampleId: "eebf43a0-b4cf-44b1-8065-d5988a9f852b",
      traps: [
        {
          title: "Counting a meta nitro group as activating",
          body:
            "Only ortho and para positions put the ring's negative charge next to the C–Cl carbon. m-Nitrochlorobenzene behaves almost like chlorobenzene — it is the 'most difficult' answer, not p-nitro.",
        },
      ],
    },

    // 3 — haloarene reactions
    {
      kind: "formula" as const,
      slug: "cethal-haloarene-reactions",
      name: "Reactions of Haloarenes: Fittig and o/p Electrophilic Substitution",
      intuition:
        "The halogen on a benzene ring is a deactivating but ortho/para-directing group — its lone pair feeds the ring by resonance even as it withdraws by induction. So nitration, halogenation, sulphonation and Friedel–Crafts all give the ortho and para products, with para major. Sodium in dry ether couples two aryl halides to a biaryl (Fittig).",
      definition:
        "- Chlorobenzene + conc. HNO₃/H₂SO₄ → a MIXTURE of 1-chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene (para major); not the trinitro compound under ordinary conditions.\n" +
        "- Chlorobenzene + Cl₂/FeCl₃ → o- and p-dichlorobenzene; + CH₃Cl/AlCl₃ → o- and p-chlorotoluene.\n" +
        "- **Fittig**: \\(2\\text{Ar-X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} \\text{Ar-Ar}\\) — biphenyl from bromobenzene. Wurtz–Fittig (Ar-X + R-X) gives an alkylarene.\n" +
        "- Haloarenes do NOT undergo SN1/SN2 (sp² carbon, partial double bond); nucleophilic substitution needs o/p nitro activation.",
      formula: {
        label: "Halogen directs o/p",
        latex:
          "\\text{C}_6\\text{H}_5\\text{Cl} \\xrightarrow{\\text{HNO}_3/\\text{H}_2\\text{SO}_4} o\\text{- and } p\\text{-ClC}_6\\text{H}_4\\text{NO}_2;\\qquad 2\\text{ArX} + 2\\text{Na} \\to \\text{Ar-Ar}",
      },
      authoredExample: {
        prompt: "What does bromobenzene give with (i) Br₂/FeBr₃ and (ii) sodium in dry ether?",
        steps: [
          "(i) o- and p-dibromobenzene (para major). (ii) Biphenyl, the Fittig product.",
        ],
        answer: "o-/p-Dibromobenzene; biphenyl",
      },
      selfCheckExample: {
        prompt: "Chlorobenzene is heated with nitrating mixture. Only the para product, only the ortho, a mixture of both, or the 2,4,6-trinitro compound?",
        steps: [
          "Cl directs o/p; a mixture forms.",
        ],
        answer: "A mixture of 1-chloro-2-nitrobenzene and 1-chloro-4-nitrobenzene",
      },
      practiceSet: [
        { prompt: "Aryl halide + Na in dry ether → biphenyl is the?", answer: "Fittig reaction" },
        { prompt: "Product of chlorobenzene with nitrating mixture?", answer: "o- + p-chloronitrobenzene mixture" },
        { prompt: "Is Cl on a ring activating or deactivating?", answer: "Deactivating, o/p-directing" },
        { prompt: "Do haloarenes undergo SN2?", answer: "No" },
      ],
      pyqExampleId: "8b27d386-9214-4d2c-9e67-696b70a6d50a",
      traps: [
        {
          title: "Picking 'only para'",
          body:
            "Para is the MAJOR product, but the ortho isomer forms too and the paper asks for the mixture. 'Only 1-chloro-4-nitrobenzene' is the planted option.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Nucleophilic Substitution — the competing pathway for alkyl halides",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-nucleophilic-substitution",
    },
    {
      label: "Preparation — Fittig and Wurtz–Fittig coupling",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-preparation",
    },
  ],
};
