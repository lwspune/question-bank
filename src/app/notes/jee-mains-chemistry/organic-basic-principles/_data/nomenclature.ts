import type { SubtopicNote } from "@/app/notes/_types";

export const NOMENCLATURE_GOC_NOTE: SubtopicNote = {
  subtopicName: "Structure, Classification and IUPAC Nomenclature",
  title: "Structure, Classification and IUPAC Nomenclature",
  oneLineDefinition:
    "A carbon's hybridisation follows from its bonds, a molecule's σ and π bonds can be counted from its formula, and an IUPAC name is built by picking the senior functional group, choosing and numbering the parent chain, and listing the other groups as prefixes in alphabetical order.",
  whyItMatters:
    "Thirty-four PYQs, twenty-nine of them multiple choice, and two from 2026. Thirteen rank functional groups by seniority or name a compound that carries two or more of them. Eleven turn on choosing and numbering the parent chain, or on drawing a structure from its name. Ten count sp³, sp² and sp carbons, σ and π bonds or π electrons, or place a compound in the acyclic, alicyclic, aromatic or heterocyclic class.",
  concepts: [
    // C1 — hybridisation, sigma and pi counts, classification
    {
      kind: "formula" as const,
      slug: "jcgoc-structure",
      name: "Hybridisation and counting sigma and pi bonds",
      intuition:
        "Look at what each carbon is bonded to. Four single bonds make it sp³; one double bond makes it sp²; a triple bond, or two double bonds, makes it sp. Every bond between two atoms contains one σ bond. A double bond adds one π bond and a triple bond adds two. So once the structure is written out, every count in this block is simple bookkeeping.",
      definition:
        "- Four single bonds: **sp³**, tetrahedral, 109.5°. One double bond (C=C or C=O): **sp²**, trigonal planar, 120°. A triple bond (C≡C or C≡N), or two double bonds on one carbon: **sp**, linear, 180°.\n" +
        "- Count every carbon, including each \\(\\mathrm{CH_3}\\) branch: a branch carbon has only single bonds, so it is sp³.\n" +
        "- σ bonds in an open-chain molecule = number of atoms − 1. Each ring adds one more σ bond.\n" +
        "- π bonds = number of double bonds + 2 × number of triple bonds. Each π bond holds 2 π electrons; a benzene ring holds 6.\n" +
        "- **Classification**: acyclic (open chain); alicyclic (a ring that is not aromatic, such as cyclohexane or cyclohexene); aromatic benzenoid (a benzene ring); aromatic non-benzenoid (tropolone); heterocyclic (a ring containing N, O or S: furan, thiophene, pyridine).\n" +
        "- **Bond-line formula**: every corner and every line end is a carbon, and the hydrogens on carbon are not drawn. Heteroatoms and the H on them are written: OH, \\(\\mathrm{NH_2}\\), CN.\n" +
        "- **Homologous series**: successive members differ by \\(\\mathrm{CH_2}\\) and share one general formula. Methanoic acid, HCOOH, is the first monocarboxylic acid and ethanoic acid, \\(\\mathrm{CH_3COOH}\\), the second.",
      formula: {
        label: "Sigma and pi bond count",
        latex:
          "n_\\sigma = (\\text{number of atoms}) - 1 + (\\text{number of rings}) \\qquad n_\\pi = n_{\\text{double}} + 2\\,n_{\\text{triple}}",
      },
      authoredExample: {
        prompt:
          "For 2-methylhex-1-en-3-yne, \\(\\mathrm{CH_2{=}C(CH_3){-}C{\\equiv}C{-}CH_2CH_3}\\), find how many carbons are sp³, sp² and sp, and how many σ and π bonds the molecule has.",
        steps: [
          "C-1 (the \\(\\mathrm{CH_2{=}}\\) carbon) and C-2 carry the double bond: 2 sp² carbons.",
          "C-3 and C-4 carry the triple bond: 2 sp carbons.",
          "The methyl branch, C-5 and C-6 have only single bonds: 3 sp³ carbons.",
          "The formula is \\(\\mathrm{C_7H_{10}}\\): 17 atoms and no ring, so σ bonds \\(= 17 - 1 = 16\\).",
          "π bonds \\(= 1\\) (from the double bond) \\(+ 2\\) (from the triple bond) \\(= 3\\).",
        ],
        answer: "3 sp³, 2 sp² and 2 sp carbons; 16 σ bonds and 3 π bonds.",
      },
      selfCheckExample: {
        prompt:
          "How many σ bonds, π bonds and π electrons does acrylonitrile, \\(\\mathrm{CH_2{=}CH{-}C{\\equiv}N}\\), have, and what is the hybridisation of each carbon?",
        steps: [
          "The formula is \\(\\mathrm{C_3H_3N}\\): 7 atoms and no ring, so σ bonds \\(= 7 - 1 = 6\\).",
          "π bonds \\(= 1\\) (C=C) \\(+ 2\\) (C≡N) \\(= 3\\), so there are 6 π electrons.",
          "The two C=C carbons are sp²; the nitrile carbon is sp.",
        ],
        answer: "6 σ bonds, 3 π bonds and 6 π electrons; carbons sp², sp² and sp.",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of the carbon in a nitrile group, \\(\\mathrm{-C{\\equiv}N}\\)?", answer: "sp" },
        { prompt: "Is cyclohexene an alicyclic or an aromatic compound?", answer: "Alicyclic" },
        { prompt: "Which of furan, thiophene and pyridine has sulphur as its ring heteroatom?", answer: "Thiophene" },
        { prompt: "What is the second member of the alkyne homologous series?", answer: "Propyne, \\(\\mathrm{C_3H_4}\\)" },
      ],
      pyqExampleId: "0596aca8-0fc0-4e50-92cb-1519a7887272", // 2025 — sp3, sp2 and sp carbons in an en-yne
      traps: [
        {
          title: "Branch carbons count too",
          body: "A name such as 2,2-dimethylbutane carries two methyl carbons that the parent name hides. Each is a separate sp³ carbon. Write the full structure before you count.",
        },
        {
          title: "A carbonyl or nitrile carbon is not sp³",
          body: "The carbon of C=O, CHO and COOH is sp², and the carbon of C≡N is sp. Only a carbon with four single bonds is sp³.",
        },
        {
          title: "One ring double bond does not make a ring aromatic",
          body: "Cyclohexene has one C=C in a six-membered ring. It is alicyclic, not aromatic and not benzenoid.",
        },
      ],
    },

    // C2 — seniority of functional groups
    {
      kind: "reference" as const,
      slug: "jcgoc-fg-priority",
      name: "Seniority of functional groups in IUPAC names",
      intuition:
        "When a compound carries two or more functional groups, only one of them can give the suffix. It is the one highest in the seniority list; every other group becomes a prefix. Learn the list once and most naming questions reduce to reading it.",
      definition:
        "- The senior group is the **principal group**: it gives the suffix and takes the lowest possible locant.\n" +
        "- NCERT order: \\(\\mathrm{-COOH > -SO_3H > -COOR > -COCl > -CONH_2 > -CN > -CHO > {>}C{=}O > -OH > -NH_2 > C{=}C,\\ C{\\equiv}C}\\).\n" +
        "- Halo (–X), nitro (\\(\\mathrm{-NO_2}\\)) and alkoxy (–OR) groups are always prefixes.\n" +
        "- The carbon of –COOH, –COOR, –COCl, \\(\\mathrm{-CONH_2}\\), –CN and a chain-end –CHO is counted in the parent chain and numbered C-1.\n" +
        "- Esters are named alkyl alkanoate, the alkyl on oxygen first as a separate word: \\(\\mathrm{CH_3COOC_2H_5}\\) is ethyl ethanoate.\n" +
        "- Common names still appear: aniline and aminobenzene (benzenamine) are one compound.",
      table: {
        columns: ["Class", "Group", "Suffix when senior", "Prefix when not senior"],
        rows: [
          { cells: ["Carboxylic acid", "\\(\\mathrm{-COOH}\\)", "-oic acid", "carboxy"] },
          { cells: ["Sulphonic acid", "\\(\\mathrm{-SO_3H}\\)", "-sulphonic acid", "sulpho"] },
          { cells: ["Ester", "\\(\\mathrm{-COOR}\\)", "alkyl …-oate", "alkoxycarbonyl"] },
          { cells: ["Acid chloride", "\\(\\mathrm{-COCl}\\)", "-oyl chloride", "chlorocarbonyl"] },
          { cells: ["Amide", "\\(\\mathrm{-CONH_2}\\)", "-amide", "carbamoyl"] },
          { cells: ["Nitrile", "\\(\\mathrm{-C{\\equiv}N}\\)", "-nitrile", "cyano"] },
          {
            cells: ["Aldehyde", "\\(\\mathrm{-CHO}\\)", "-al", "formyl, or oxo when its carbon is in the chain"],
            noteAmber: "The aldehyde outranks the ketone: a compound with both is named as an -al with an oxo prefix.",
          },
          { cells: ["Ketone", "\\(\\mathrm{{>}C{=}O}\\)", "-one", "oxo"] },
          { cells: ["Alcohol", "\\(\\mathrm{-OH}\\)", "-ol", "hydroxy"] },
          { cells: ["Amine", "\\(\\mathrm{-NH_2}\\)", "-amine", "amino"] },
          { cells: ["Alkene, alkyne", "C=C, C≡C", "-ene, -yne", "Never a prefix; always part of the parent name"] },
          { cells: ["Halide, nitro, ether", "–X, \\(\\mathrm{-NO_2}\\), –OR", "Never a suffix", "halo, nitro, alkoxy"] },
        ],
        caption: "Seniority falls from the top row down. The last row never takes the suffix.",
      },
      selfCheckExample: {
        prompt: "Name \\(\\mathrm{OHC{-}CH_2{-}CH_2{-}COOH}\\).",
        steps: [
          "–COOH is the senior group, so the suffix is -oic acid and its carbon is C-1.",
          "The chain has four carbons: butanoic acid.",
          "The CHO carbon is C-4, inside the chain, so it is named with the prefix oxo.",
        ],
        answer: "4-Oxobutanoic acid.",
      },
      practiceSet: [
        { prompt: "Which is senior in an IUPAC name, –CHO or >C=O?", answer: "–CHO" },
        { prompt: "What prefix does –OH take when a –COOH group is also present?", answer: "hydroxy" },
        { prompt: "Name \\(\\mathrm{CH_3CH_2COOCH_3}\\).", answer: "Methyl propanoate" },
        { prompt: "Which is senior, –CN or \\(\\mathrm{-CONH_2}\\)?", answer: "\\(\\mathrm{-CONH_2}\\)" },
      ],
      pyqExampleId: "32f03342-7b77-4509-80d3-17756f1b92f9", // 2026 — decreasing priority of functional groups
      traps: [
        {
          title: "The ketone does not outrank the aldehyde",
          body: "–CHO comes before >C=O in the seniority list. An option that places the ketone first is wrong.",
        },
        {
          title: "The nitrile sits between the amide and the aldehyde",
          body: "The order runs \\(\\mathrm{-CONH_2 > -CN > -CHO}\\). An order that puts –CHO above –CN, or –CN above \\(\\mathrm{-CONH_2}\\), is wrong.",
        },
        {
          title: "The junior group never takes the suffix",
          body: "\\(\\mathrm{HOCH_2CH_2COCH_3}\\) is 4-hydroxybutan-2-one. A name such as 3-oxobutan-1-ol gives the suffix to the alcohol, which ranks below the ketone.",
        },
      ],
    },

    // C3 — parent chain and numbering
    {
      kind: "formula" as const,
      slug: "jcgoc-iupac-chain",
      name: "Choosing and numbering the parent chain",
      intuition:
        "Once the principal group is fixed, naming is a short series of tie-breaks: choose the chain, number it, then list the prefixes. Each rule matters only when the one before it gives a tie. Most wrong options in these questions break one rule while obeying the rest.",
      definition:
        "- **Parent chain**: the longest chain that contains the principal group and as many multiple bonds as possible. In a ring compound with a small side chain, the ring is the parent.\n" +
        "- **Numbering**: the principal group (the suffix) gets the lowest locant first; then the multiple bonds, taken together; then all the prefixes as one set.\n" +
        "- **Lowest locant set**: compare the sets term by term; the first point of difference decides. 2,4,4 is lower than 3,3,5 because 2 < 3.\n" +
        "- **ene and yne tie**: when the double and triple bonds get the same locant set from either end, the double bond takes the lower number.\n" +
        "- **Alphabetical order** of prefixes: ethyl before methyl. Multiplying prefixes (di-, tri-, tetra-) are ignored when alphabetising, as in 3-ethyl-2,2-dimethylpentane.\n" +
        "- 'ene' drops its final e before a vowel or 'y': hex-1-en-4-yne, pent-4-en-2-ol.\n" +
        "- In a ring, the carbon carrying the principal group is C-1: cyclopent-2-en-1-ol.",
      formula: {
        label: "Order of numbering decisions",
        latex:
          "\\text{principal group} \\;\\to\\; \\text{multiple bonds} \\;\\to\\; \\text{all prefixes (lowest set)} \\;\\to\\; \\text{alphabetical order}",
      },
      authoredExample: {
        prompt: "Name \\(\\mathrm{HC{\\equiv}C{-}CH(OH){-}CH_2{-}CH{=}CH_2}\\).",
        steps: [
          "The parent is the six-carbon chain carrying the OH, the C≡C and the C=C: hex-, with the suffix -ol.",
          "From the alkyne end the OH is on C-3; from the alkene end it is on C-4. The principal group decides first, so number from the alkyne end.",
          "The triple bond is then at C-1 and the double bond at C-5. The ene and yne tie rule never comes into play, because the OH has already fixed the numbering.",
          "Write ene before yne, with the suffix last.",
        ],
        answer: "Hex-5-en-1-yn-3-ol.",
      },
      selfCheckExample: {
        prompt: "Name \\(\\mathrm{HC{\\equiv}C{-}CH_2{-}CH{=}CH_2}\\).",
        steps: [
          "There is no suffix group, so the multiple bonds decide. The chain has five carbons: pent-.",
          "From either end the multiple bonds get the locants 1 and 4, a tie.",
          "The tie goes to the double bond, so number from the alkene end: the C=C is at C-1 and the C≡C at C-4.",
        ],
        answer: "Pent-1-en-4-yne.",
      },
      practiceSet: [
        { prompt: "Name \\(\\mathrm{(CH_3)_2CH{-}CH_2{-}CH_3}\\).", answer: "2-Methylbutane" },
        { prompt: "Which locant set is lower, 2,4,4 or 3,3,5?", answer: "2,4,4 (first point of difference: 2 < 3)" },
        { prompt: "Name a cyclopentene ring carrying an OH on the carbon next to the C=C.", answer: "Cyclopent-2-en-1-ol" },
        { prompt: "Is the correct name 3-ethyl-2,2-dimethylpentane or 2,2-dimethyl-3-ethylpentane?", answer: "3-Ethyl-2,2-dimethylpentane" },
      ],
      pyqExampleId: "d824ec57-d274-4028-80ad-5c2d346d8a9a", // 2025 — hept-1-en-6-yn-4-ol, the ene/yne tie
      traps: [
        {
          title: "Prefixes go in alphabetical order, not locant order",
          body: "1,1-Dimethyl-3-ethylcyclohexane lists the prefixes by number. The correct name is 3-ethyl-1,1-dimethylcyclohexane: e comes before m, and di is ignored.",
        },
        {
          title: "Compare the whole locant set",
          body: "2,3,6 beats 2,4,5 because the sets first differ at the second term, and 3 < 4. Adding up the locants, or looking only at the first one, gives the wrong numbering.",
        },
        {
          title: "The OH carbon is C-1 in a ring",
          body: "A cyclic alcohol with a ring double bond is named cyclohex-2-en-1-ol, never cyclohex-1-en-3-ol. The principal group takes C-1 before the double bond is numbered.",
        },
      ],
    },
  ],
};
