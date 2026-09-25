import type { SubtopicNote } from "@/app/notes/_types";

export const NOMENCLATURE_NOTE: SubtopicNote = {
  subtopicName: "IUPAC and Common Nomenclature of Alcohols, Phenols and Ethers",
  title: "IUPAC and Common Nomenclature of Alcohols, Phenols and Ethers",
  oneLineDefinition:
    "Alcohols are named three ways — carbinol (the C–OH carbon is 'carbinol', its groups are prefixes), common (tert-butyl alcohol) and IUPAC (-ol with the lowest locant); phenols have six common names to memorise against their benzene-diol/triol IUPAC names; ethers are alkoxyalkanes.",
  whyItMatters:
    "35 PYQs, 1 HARD — the largest page in the chapter and the most reliable mark. Thirteen are the named phenols in either direction (catechol ↔ benzene-1,2-diol and the rest), fifteen are an IUPAC name read off a drawn cyclopentanol, cyclobutane ether or alkenol, five are carbinol names, two are isomer pairs. " +
    "One table, one naming routine.",
  concepts: [
    // 1 — carbinol names
    {
      kind: "formula" as const,
      slug: "cetalc-carbinol-and-common-names",
      name: "Carbinol Names and the Butyl Alcohols",
      intuition:
        "In the carbinol system methanol is 'carbinol' and every other alcohol is carbinol with its alkyl groups as prefixes, named alphabetically. Count the groups on the C–OH carbon: isopropyl alcohol has two methyls — dimethyl carbinol; tert-butyl alcohol three — trimethyl carbinol; sec-butyl alcohol a methyl and an ethyl — ethyl methyl carbinol; isobutyl alcohol one isopropyl — isopropyl carbinol.",
      definition:
        "- **Methyl carbinol** = ethanol; **dimethyl carbinol** = isopropyl alcohol (propan-2-ol); **trimethyl carbinol** = tert-butyl alcohol (2-methylpropan-2-ol).\n" +
        "- **Ethyl methyl carbinol** = sec-butyl alcohol (butan-2-ol); **isopropyl carbinol** = isobutyl alcohol (2-methylpropan-1-ol); **propyl carbinol** = butan-1-ol.\n" +
        "- The four butyl alcohols: n-butyl (butan-1-ol, 1°), isobutyl (2-methylpropan-1-ol, 1°), sec-butyl (butan-2-ol, 2°), tert-butyl (2-methylpropan-2-ol, 3°).\n" +
        "- Groups on the carbinol carbon are listed alphabetically: ethyl before methyl.",
      formula: {
        label: "Carbinol rule",
        latex:
          "\\text{R}_1\\text{R}_2\\text{R}_3\\text{C-OH} \\to \\text{(R}_1\\text{ R}_2\\text{ R}_3\\text{) carbinol, alphabetical}",
      },
      authoredExample: {
        prompt: "Name pentan-3-ol and 2-methylbutan-2-ol in the carbinol system.",
        steps: [
          "Pentan-3-ol: two ethyls on C–OH — diethyl carbinol. 2-Methylbutan-2-ol: ethyl, methyl, methyl — ethyl dimethyl carbinol.",
        ],
        answer: "Diethyl carbinol; ethyl dimethyl carbinol",
      },
      selfCheckExample: {
        prompt: "Which alcohol is trimethyl carbinol, and what is the carbinol name of isobutyl alcohol?",
        steps: [
          "Three methyls on C–OH: tert-butyl alcohol. Isobutyl alcohol (CH₃)₂CHCH₂OH has one isopropyl group: isopropyl carbinol.",
        ],
        answer: "tert-Butyl alcohol; isopropyl carbinol",
      },
      practiceSet: [
        { prompt: "Carbinol name of tert-butyl alcohol?", answer: "Trimethyl carbinol" },
        { prompt: "Carbinol name of isopropyl alcohol?", answer: "Dimethyl carbinol" },
        { prompt: "Carbinol name of sec-butyl alcohol?", answer: "Ethyl methyl carbinol" },
        { prompt: "Carbinol name of isobutyl alcohol?", answer: "Isopropyl carbinol" },
      ],
      pyqExampleId: "4004a7fd-c1ea-4324-b1c0-1a9b0bff1f8c",
      traps: [
        {
          title: "Naming isobutyl alcohol 'isobutyl carbinol'",
          body:
            "The carbinol carbon is the CH₂OH; what hangs on it is an ISOPROPYL group. Isobutyl carbinol would be a five-carbon alcohol.",
        },
      ],
    },

    // 2 — named phenols (reference)
    {
      kind: "reference" as const,
      slug: "cetalc-named-phenols",
      name: "The Named Phenols: Common Name ↔ IUPAC Name",
      intuition:
        "Six benzene polyols and the cresols carry names the paper uses interchangeably with the IUPAC locants. The diols run ortho, meta, para — catechol, resorcinol, quinol; the triols 1,2,3 and 1,3,5 — pyrogallol and phloroglucinol. o-Cresol is 2-methylphenol, not a triol. A substituted phenol is named as a phenol: 4-bromophenol, not 1-bromo-4-hydroxybenzene — unless a higher group (COOH) is present, when OH becomes 'hydroxy'.",
      definition:
        "- Catechol = benzene-1,2-diol · resorcinol = benzene-1,3-diol · quinol (hydroquinone) = benzene-1,4-diol.\n" +
        "- Pyrogallol = benzene-1,2,3-triol · phloroglucinol = benzene-1,3,5-triol · o-cresol = 2-methylphenol.\n" +
        "- Glycerol ('propylene glycerol') = propane-1,2,3-triol; ethylene glycol = ethane-1,2-diol.\n" +
        "- Phenol as parent: **4-bromophenol**. Acid outranks OH: **3-ethyl-5-hydroxybenzoic acid** (locants tie at {3,5}; ethyl before hydroxy alphabetically).",
      table: {
        columns: ["Common name", "IUPAC name", "OH positions"],
        rows: [
          { cells: ["Catechol", "Benzene-1,2-diol", "ortho"] },
          { cells: ["Resorcinol", "Benzene-1,3-diol", "meta"] },
          { cells: ["Quinol (hydroquinone)", "Benzene-1,4-diol", "para"] },
          { cells: ["Pyrogallol", "Benzene-1,2,3-triol", "adjacent three"], noteAmber: "1,2,3 — not 1,3,5." },
          { cells: ["Phloroglucinol", "Benzene-1,3,5-triol", "alternate three"] },
          { cells: ["o-Cresol", "2-Methylphenol", "OH + CH₃ ortho"], noteAmber: "The planted wrong pairing is 'o-cresol : benzene-1,2,3-triol'." },
          { cells: ["Glycerol", "Propane-1,2,3-triol", "—"] },
        ],
        caption: "Diols: cat-ortho, res-meta, quin-para. Triols: pyro-1,2,3, phloro-1,3,5.",
      },
      selfCheckExample: {
        prompt: "Give the common names of benzene-1,3-diol and benzene-1,2,3-triol, and the IUPAC name of hydroquinone.",
        steps: [
          "Resorcinol; pyrogallol; benzene-1,4-diol.",
        ],
        answer: "Resorcinol; pyrogallol; benzene-1,4-diol",
      },
      practiceSet: [
        { prompt: "IUPAC name of catechol?", answer: "Benzene-1,2-diol" },
        { prompt: "Common name of benzene-1,4-diol?", answer: "Quinol" },
        { prompt: "IUPAC name of pyrogallol?", answer: "Benzene-1,2,3-triol" },
        { prompt: "IUPAC name of the para-bromo phenol?", answer: "4-Bromophenol" },
      ],
      pyqExampleId: "2b3abf88-8b18-4dec-a46f-99e34a82827a",
      traps: [
        {
          title: "Swapping pyrogallol and phloroglucinol",
          body:
            "Both are triols. Pyrogallol's three OH are ADJACENT (1,2,3); phloroglucinol's alternate (1,3,5). The two are always offered together.",
        },
      ],
    },

    // 3 — IUPAC from a drawn structure
    {
      kind: "formula" as const,
      slug: "cetalc-iupac-from-structure",
      name: "IUPAC Names From a Drawing: Ring Alcohols, Ring Ethers, Alkenols",
      intuition:
        "For a ring alcohol the OH carbon is C1 and the ring is numbered the way that gives the substituents the lowest set of locants — so ethyl and methyl on the two carbons flanking C1 are 2-ethyl-5-methyl, not 2-ethyl-3-methyl. For a ring ether the alkoxy group is a prefix like any other, and the lowest-locant SET wins: 3-methoxy-1,1-dimethylcyclobutane {1,1,3} beats 1-methoxy-3,3-dimethyl {1,3,3}. For an alkenol, OH takes the lowest locant, then the double bond.",
      definition:
        "- Cyclopentanol with ethyl and methyl on the carbons either side of C–OH: **2-ethyl-5-methylcyclopentanol** (from C1 go towards ethyl, the alphabetical first). Both on the same side (2 and 3): 2-ethyl-3-methylcyclopentanol.\n" +
        "- Cyclopentanol with methyls on both flanking carbons: **2,5-dimethylcyclopentanol**. A methyl across the ring: 3-methylcyclopentanol.\n" +
        "- Cyclobutane with OCH₃ and a gem-dimethyl opposite: **3-methoxy-1,1-dimethylcyclobutane**. Ethyl and methyl flanking a cyclobutanol: 2-ethyl-4-methylcyclobutanol.\n" +
        "- \\(\\text{CH}_3\\text{CH}_2\\text{CH(CH}_3)\\text{CH=CHCH(OH)CH}_2\\text{CH}_3\\): OH first → **6-methyloct-4-en-3-ol**. Crotonyl alcohol in bond-line: a four-carbon zigzag, C=C between C2 and C3, OH at the end (but-2-en-1-ol).\n" +
        "- Open chain ether: \\(\\text{CH}_3\\text{OCH}_2\\text{C(CH}_3)_2\\text{CH}_2\\text{CH}_3\\) = 1-methoxy-2,2-dimethylbutane. Propan-1-ol in bond-line: three carbons, OH at the end.",
      formula: {
        label: "Locant rules",
        latex:
          "\\text{OH carbon} = \\text{C1} \\to \\text{lowest locant SET for substituents} \\to \\text{alphabetical tie-break}",
      },
      authoredExample: {
        prompt: "Name a cyclohexanol carrying a methyl on C2 and a chlorine on C4 (numbered away from the methyl), and the alkenol \\(\\text{CH}_2\\text{=CH-CH(OH)-CH}_2\\text{CH}_3\\).",
        steps: [
          "Ring: OH at C1; numbering towards the methyl gives {2,4}, away gives {3,6}: 4-chloro-2-methylcyclohexanol. Chain: OH lowest → pent-1-en-3-ol.",
        ],
        answer: "4-Chloro-2-methylcyclohexanol; pent-1-en-3-ol",
      },
      selfCheckExample: {
        prompt: "A cyclopentanol has an ethyl on one carbon next to C–OH and a methyl on the other. Why is the name 2-ethyl-5-methyl and not 2-methyl-5-ethyl?",
        steps: [
          "Both directions give the locant set {2,5}; the tie goes to alphabetical order, so ethyl takes the lower number.",
        ],
        answer: "Alphabetical tie-break: ethyl gets locant 2",
      },
      practiceSet: [
        { prompt: "Cyclobutane, OCH₃ on C3, two CH₃ on C1: name?", answer: "3-Methoxy-1,1-dimethylcyclobutane" },
        { prompt: "\\(\\text{CH}_3\\text{CH}_2\\text{CH(CH}_3)\\text{CH=CHCH(OH)CH}_2\\text{CH}_3\\)?", answer: "6-Methyloct-4-en-3-ol" },
        { prompt: "Cyclopentanol with methyls on both carbons next to C1?", answer: "2,5-Dimethylcyclopentanol" },
        { prompt: "Bond-line of crotonyl alcohol shows the C=C at which carbons?", answer: "C2=C3, OH on C1" },
      ],
      pyqExampleId: "7dc2c6b3-6946-4e9d-9302-af902789da23",
      traps: [
        {
          title: "Numbering the ring the short way",
          body:
            "Going from C1 towards the methyl gives 2-methyl-5-ethyl — same locant set, wrong alphabetical order. The 2023 paper keyed 2-ethyl-3-methyl for a drawing with the groups on the same side and 2-ethyl-5-methyl for one with them on opposite sides; look at the drawing, not the option you remember.",
        },
      ],
    },

    // 4 — isomerism
    {
      kind: "formula" as const,
      slug: "cetalc-isomerism-of-alcohols-and-ethers",
      name: "Isomer Pairs: Alcohol–Ether, Position, Metamers",
      intuition:
        "An alcohol and an ether of the same formula are functional isomers (butan-1-ol and 1-methoxypropane, both \(\text{C}_4\text{H}_{10}\text{O}\)). Two ethers of the same formula with the alkyls redistributed are metamers (ethoxyethane and methoxypropane). A pair with DIFFERENT formulas is no pair of isomers at all — methoxyethane is \(\text{C}_3\text{H}_8\text{O}\), ethoxyethane \(\text{C}_4\text{H}_{10}\text{O}\).",
      definition:
        "- Functional: butan-1-ol / 1-methoxypropane; ethanol / methoxymethane.\n" +
        "- Metamerism: ethoxyethane / methoxypropane (both \\(\\text{C}_4\\text{H}_{10}\\text{O}\\)); 1-methoxypropane / ethoxyethane.\n" +
        "- Position: butan-1-ol / butan-2-ol; 1-methoxypropane / 2-methoxypropane. Chain: butan-2-ol / 2-methylpropan-1-ol.\n" +
        "- NOT isomers: methoxyethane and ethoxyethane (different formulas).",
      formula: {
        label: "Same formula, or no isomerism",
        latex:
          "\\text{C}_4\\text{H}_{10}\\text{O}: \\text{ butanols (alcohol)} \\leftrightarrow \\text{ethoxyethane / methoxypropane (ethers)}",
      },
      authoredExample: {
        prompt: "Which of these is NOT an isomer pair: pentan-1-ol and 1-ethoxypropane; 2-methoxypropane and 1-methoxypropane; propan-1-ol and ethoxyethane?",
        steps: [
          "C₅H₁₂O and C₅H₁₂O — functional isomers. C₄H₁₀O both — position isomers. C₃H₈O against C₄H₁₀O — not isomers.",
        ],
        answer: "Propan-1-ol and ethoxyethane",
      },
      selfCheckExample: {
        prompt: "What kind of isomerism do ethoxyethane and methoxypropane show?",
        steps: [
          "Same functional group, different alkyls around the oxygen: metamerism.",
        ],
        answer: "Metamerism",
      },
      practiceSet: [
        { prompt: "NOT an isomer pair: methoxyethane and ethoxyethane, or butan-1-ol and 1-methoxypropane?", answer: "Methoxyethane and ethoxyethane" },
        { prompt: "Metamers: ethoxyethane and?", answer: "Methoxypropane" },
        { prompt: "Butan-1-ol and 1-methoxypropane are?", answer: "Functional isomers" },
        { prompt: "Formula shared by the butanols and ethoxyethane?", answer: "\\(\\text{C}_4\\text{H}_{10}\\text{O}\\)" },
      ],
      pyqExampleId: "ab6ef24c-03d5-485a-b90b-84bb5eca67fc",
      traps: [
        {
          title: "Assuming any two ethers are metamers",
          body:
            "Metamers must share a molecular formula. Methoxyethane (C₃) and ethoxyethane (C₄) differ by a CH₂ — homologues, not isomers of any kind.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Classification — the classes the names describe",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-classification",
    },
    {
      label: "Basic Principles — the IUPAC priority order",
      href: "/notes/mht-cet-chemistry/basic-principles-of-organic-chemistry/cetbp-nomenclature-and-functional-groups",
    },
  ],
};
