import type { SubtopicNote } from "@/app/notes/_types";

export const STEREO_GOC_NOTE: SubtopicNote = {
  subtopicName: "Stereoisomerism and Conformations",
  title: "Stereoisomerism and Conformations",
  oneLineDefinition:
    "Stereoisomers have the same bonds but a different arrangement in space: cis and trans forms about a C=C that cannot rotate, mirror-image enantiomers from a carbon with four different groups, and conformations that differ only by rotation about a single bond.",
  whyItMatters:
    "Thirty-two PYQs, sixteen of them asking for a number, and three from 2026. Fourteen decide whether a carbon or a molecule is chiral: counting chiral compounds in a list, spotting a meso form, telling identical drawings from enantiomers, or finding an optical purity. Nine count all the stereoisomers of a structure or the products of monochlorination. Nine test geometrical isomerism: five on cis and trans alkenes, four on the staggered and eclipsed conformations.",
  concepts: [
    // C1 — geometrical isomerism and conformations
    {
      kind: "formula" as const,
      slug: "jcgoc-geometrical",
      name: "Geometrical isomerism and conformations",
      intuition:
        "A C=C bond cannot rotate at room temperature. If each doubly bonded carbon carries two different groups, the groups can sit on the same side (cis) or on opposite sides (trans), and these are two separate compounds. A C–C single bond does rotate freely; the shapes it passes through are conformations, which cannot be separated.",
      definition:
        "- **Condition**: each carbon of the C=C must carry two DIFFERENT groups. A carbon with two identical groups, such as a terminal \\(\\mathrm{{=}CH_2}\\) or a \\(\\mathrm{{=}C(CH_3)_2}\\), rules it out.\n" +
        "- cis: like groups on the same side; trans: on opposite sides. When all four groups differ, use E and Z by CIP priority.\n" +
        "- A cis alkene has a dipole moment; in the trans form the two bond moments cancel. The trans form is more stable and packs better in a crystal, so it usually melts higher; the cis form usually boils higher.\n" +
        "- The isomers do not interconvert at room temperature.\n" +
        "- A C=C from a ring carbon to an outside carbon (an alkylidene ring) shows it only if the outside carbon carries two different groups AND the two ring arms differ: a substituent at C-3 of a cyclohexane ring makes them differ, one at C-4 does not.\n" +
        "- **Conformations of ethane**: staggered (dihedral angle 60°) and eclipsed (0°). Staggered is more stable, with less torsional strain. The two are rotamers, not isomers that can be isolated.\n" +
        "- **Butane**: the anti form, with the two \\(\\mathrm{CH_3}\\) groups at 180°, is the most stable; gauche has them at 60°; the fully eclipsed form (0°) is the least stable.",
      formula: {
        label: "Condition for cis–trans isomerism",
        latex: "\\mathrm{abC{=}Ccd}:\\quad a \\neq b \\ \\text{and}\\ c \\neq d",
      },
      authoredExample: {
        prompt:
          "Which of these show geometrical isomerism: pent-2-ene, 2-methylbut-1-ene, 1,2-dichloroethene and 1,1-dichloroethene?",
        steps: [
          "Pent-2-ene, \\(\\mathrm{CH_3CH{=}CHCH_2CH_3}\\): C-2 carries H and \\(\\mathrm{CH_3}\\); C-3 carries H and \\(\\mathrm{C_2H_5}\\). Both pairs differ: yes.",
          "2-Methylbut-1-ene, \\(\\mathrm{CH_2{=}C(CH_3)CH_2CH_3}\\): C-1 carries two hydrogens: no.",
          "1,2-Dichloroethene, ClCH=CHCl: each carbon carries H and Cl: yes.",
          "1,1-Dichloroethene, \\(\\mathrm{CH_2{=}CCl_2}\\): each carbon carries two identical atoms: no.",
        ],
        answer: "Pent-2-ene and 1,2-dichloroethene.",
      },
      selfCheckExample: {
        prompt: "Which conformation of butane is the most stable, and what is the dihedral angle between its two methyl groups?",
        steps: [
          "Look along the C-2 to C-3 bond. The two methyl groups are the bulkiest groups.",
          "They are furthest apart when they point in opposite directions, with every bond staggered.",
        ],
        answer: "The anti conformation, with the methyl groups at 180°.",
      },
      practiceSet: [
        { prompt: "Does propene show geometrical isomerism?", answer: "No; C-1 carries two hydrogens" },
        { prompt: "Which of cis- and trans-1,2-dichloroethene has zero dipole moment?", answer: "trans" },
        { prompt: "Can the staggered and eclipsed forms of ethane be separated?", answer: "No; they are conformations that interconvert by rotation" },
        { prompt: "Does but-2-yne show geometrical isomerism?", answer: "No; the C≡C unit is linear" },
      ],
      pyqExampleId: "2bc696d1-b04c-4094-82b1-6cb0bde46841", // 2025 — incorrect statements on geometrical isomerism
      traps: [
        {
          title: "Two identical groups on one carbon cancel it",
          body: "In 2-methylbut-2-ene, \\(\\mathrm{(CH_3)_2C{=}CHCH_3}\\), C-2 carries two methyl groups. Swapping them changes nothing, so there are no cis and trans forms.",
        },
        {
          title: "The trans isomer usually melts higher",
          body: "Trans alkenes pack more neatly in a crystal, so they generally have the HIGHER melting point. The cis isomer has the dipole moment and usually the higher boiling point.",
        },
        {
          title: "Conformations are not separable isomers",
          body: "Staggered and eclipsed ethane interconvert by rotation about a single bond. They are called rotamers or conformers, never enantiomers or geometrical isomers.",
        },
      ],
    },

    // C2 — chirality, meso compounds and optical purity
    {
      kind: "formula" as const,
      slug: "jcgoc-chirality",
      name: "Chiral centres, meso compounds and optical purity",
      intuition:
        "A carbon with four different groups has a mirror image that cannot be laid on top of it, like a left and a right hand. A molecule built on such a carbon is chiral and rotates plane-polarised light. A molecule with two chiral centres can still have a mirror plane; then it is its own mirror image, a meso compound, and it is optically inactive.",
      definition:
        "- **Chiral (asymmetric) carbon**: four different groups. Isotopes count as different, so a carbon carrying both H and D can be chiral.\n" +
        "- **Enantiomers**: non-superimposable mirror images, with equal and opposite rotations. **Diastereomers**: stereoisomers that are not mirror images.\n" +
        "- **Meso compound**: two or more chiral centres and an internal mirror plane, so it is optically inactive (meso-tartaric acid, cis-1,2-dimethylcyclopropane).\n" +
        "- To decide whether two drawings are identical or enantiomers, assign R or S to each centre in both drawings; never judge by eye.\n" +
        "- A racemic mixture (50 : 50) shows no rotation.\n" +
        "- **Optical purity** equals the enantiomeric excess: the observed rotation as a percentage of the pure enantiomer's rotation.",
      formula: {
        label: "Optical purity",
        latex:
          "\\text{optical purity}\\ (\\%) = \\dfrac{\\text{observed rotation}}{\\text{rotation of the pure enantiomer}} \\times 100",
      },
      authoredExample: {
        prompt:
          "How many chiral carbons does 2-chloro-3-methylpentane, \\(\\mathrm{CH_3{-}CHCl{-}CH(CH_3){-}CH_2CH_3}\\), have?",
        steps: [
          "C-2 carries H, Cl, \\(\\mathrm{CH_3}\\) and \\(\\mathrm{CH(CH_3)CH_2CH_3}\\): four different groups, chiral.",
          "C-3 carries H, \\(\\mathrm{CH_3}\\), \\(\\mathrm{CH_2CH_3}\\) and \\(\\mathrm{CHClCH_3}\\): four different groups, chiral.",
          "C-4 is a \\(\\mathrm{CH_2}\\) with two hydrogens, and C-1, C-5 and the methyl branch are \\(\\mathrm{CH_3}\\) groups: none is chiral.",
        ],
        answer: "2 chiral carbons (C-2 and C-3).",
      },
      selfCheckExample: {
        prompt:
          "A mixture of enantiomers rotates plane-polarised light by +6.0°. The pure (+) enantiomer rotates it by +20°. Find the optical purity and the percentage of each enantiomer.",
        steps: [
          "Optical purity \\(= \\dfrac{6.0}{20} \\times 100 = 30\\%\\): there is a 30% excess of the (+) form.",
          "The other 70% is racemic: 35% (+) and 35% (−).",
          "So (+) \\(= 30 + 35 = 65\\%\\) and (−) \\(= 35\\%\\).",
        ],
        answer: "Optical purity 30%; 65% (+) and 35% (−).",
      },
      practiceSet: [
        { prompt: "Is butan-2-ol chiral?", answer: "Yes; C-2 carries H, OH, \\(\\mathrm{CH_3}\\) and \\(\\mathrm{C_2H_5}\\)" },
        { prompt: "Is meso-tartaric acid optically active?", answer: "No; it has an internal mirror plane" },
        { prompt: "How many chiral carbons does 3-methylhexane have?", answer: "1 (C-3)" },
        { prompt: "What rotation does a racemic mixture show?", answer: "Zero" },
      ],
      pyqExampleId: "757e5f89-706c-4629-8359-d7185da0efdd", // 2023 — deuterated bromide with two chiral carbons
      traps: [
        {
          title: "Deuterium is different from hydrogen",
          body: "A \\(\\mathrm{CH_2D}\\) group is not a \\(\\mathrm{CH_3}\\) group, and a carbon carrying H and D can be a chiral centre. Treat D as a fourth, distinct group.",
        },
        {
          title: "Two chiral centres do not guarantee optical activity",
          body: "If the two halves of the molecule are identical and a mirror plane cuts between them, the compound is meso and optically inactive, as in meso-2,3-dibromobutane.",
        },
        {
          title: "Compare configurations, not drawings",
          body: "Two drawings that look like mirror images may be the same molecule turned round. Assign R or S to every centre in both before calling them enantiomers.",
        },
      ],
    },

    // C3 — counting stereoisomers
    {
      kind: "formula" as const,
      slug: "jcgoc-stereo-count",
      name: "Counting stereoisomers",
      intuition:
        "Each stereogenic unit, a chiral carbon or a C=C that shows cis and trans forms, has two settings. With n such units there are at most 2ⁿ stereoisomers. Symmetry lowers the count, because a meso form stands in for what would otherwise be a pair.",
      definition:
        "- **Stereogenic units**: chiral carbons, and C=C bonds with two different groups on each carbon.\n" +
        "- The maximum is \\(2^n\\). When the molecule has two identical halves, subtract the repeats: two identical chiral centres give 3 (a pair of enantiomers and one meso form).\n" +
        "- Rings count too: cis and trans ring substituents are stereoisomers. 1,2-Dimethylcyclopropane has a meso cis form and a pair of trans enantiomers.\n" +
        "- **Monochlorination**: list each distinct type of hydrogen (one product each), then count each product with a new chiral carbon twice. Butane gives 1-chlorobutane and 2-chlorobutane; the second is chiral, so there are 3 isomers in all.",
      formula: {
        label: "Maximum number of stereoisomers",
        latex: "N \\le 2^{n}, \\qquad n = \\text{chiral centres} + \\text{stereogenic C=C bonds}",
      },
      authoredExample: {
        prompt: "How many stereoisomers does 2,3-dibromobutane, \\(\\mathrm{CH_3CHBr{-}CHBrCH_3}\\), have?",
        steps: [
          "C-2 and C-3 each carry H, Br, \\(\\mathrm{CH_3}\\) and the other CHBr group: two chiral centres, so at most \\(2^2 = 4\\).",
          "The two halves are identical. (2R,3S) and (2S,3R) are one molecule with a mirror plane: the meso form.",
          "(2R,3R) and (2S,3S) remain as a pair of enantiomers.",
        ],
        answer: "3: one pair of enantiomers and one meso form.",
      },
      selfCheckExample: {
        prompt: "How many stereoisomers does 4-chloropent-2-ene, \\(\\mathrm{CH_3CH{=}CH{-}CHCl{-}CH_3}\\), have?",
        steps: [
          "C-4 carries H, Cl, \\(\\mathrm{CH_3}\\) and \\(\\mathrm{CH{=}CHCH_3}\\): one chiral centre.",
          "At the C=C, C-2 carries H and \\(\\mathrm{CH_3}\\), and C-3 carries H and \\(\\mathrm{CHClCH_3}\\): the double bond is stereogenic.",
          "The two ends of the molecule differ, so no meso form: \\(2^2 = 4\\).",
        ],
        answer: "4 (E and Z, each as R and S).",
      },
      practiceSet: [
        { prompt: "How many stereoisomers does 2-bromopentane have?", answer: "2" },
        { prompt: "How many stereoisomers does hepta-2,5-diene, \\(\\mathrm{CH_3CH{=}CHCH_2CH{=}CHCH_3}\\), have?", answer: "3 (E,E; Z,Z; E,Z)" },
        { prompt: "How many monochloro products, counting stereoisomers, does propane give?", answer: "2 (1- and 2-chloropropane, neither chiral)" },
        { prompt: "How many stereoisomers does 1,2-dimethylcyclobutane have?", answer: "3 (meso cis and a trans pair)" },
      ],
      pyqExampleId: "15153602-8e38-43ef-b256-47865ff0a60a", // 2025 — stereoisomers of 5-phenylpent-4-en-2-ol
      traps: [
        {
          title: "2ⁿ is a ceiling, not the answer",
          body: "Check for identical halves before writing 2ⁿ. Tartaric acid has two chiral centres but only 3 stereoisomers, because the meso form is its own mirror image.",
        },
        {
          title: "A double bond is a stereogenic unit too",
          body: "A C=C with two different groups on each carbon doubles the count, just like a chiral carbon. Counting only the chiral carbons halves the answer.",
        },
        {
          title: "Include stereoisomers only when asked",
          body: "When a question says 'including stereoisomers', a chiral monochloro product counts as two. When it asks only for structural isomers, it counts as one.",
        },
      ],
    },
  ],
};
