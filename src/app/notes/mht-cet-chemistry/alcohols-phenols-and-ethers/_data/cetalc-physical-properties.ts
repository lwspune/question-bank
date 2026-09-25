import type { SubtopicNote } from "@/app/notes/_types";

export const PHYSICAL_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties of Alcohols, Phenols and Ethers",
  title: "Physical Properties of Alcohols, Phenols and Ethers",
  oneLineDefinition:
    "Hydrogen bonding sets the pattern: alcohols and phenols boil high and dissolve in water, ethers and alkanes do neither; within the alcohols boiling point rises with chain length and falls with branching, and among the nitrophenols the para isomer, with intermolecular H-bonds, melts highest.",
  whyItMatters:
    "18 PYQs, none HARD. Eight rank boiling points — the four butanols by branching, methanol as the lowest alcohol, an alkane below an ether below an alcohol, methoxyethane as the only gaseous ether; six rank solubility (phenol most, alkane least, alcohol > amine > alkane) or name the force in ethylene glycol; four are the nitrophenol melting-point order and which drawn compound is not a phenol. " +
    "Three cards.",
  concepts: [
    // 1 — boiling points
    {
      kind: "formula" as const,
      slug: "cetalc-boiling-point-and-branching",
      name: "Boiling Points: H-Bonding, Chain Length, Branching",
      intuition:
        "Alcohols boil far above alkanes and ethers of similar mass because their OH groups hydrogen-bond. Within the alcohols a longer chain means more van der Waals contact and a higher boiling point; branching makes the molecule compact and lowers it. So among the C₄ isomers n-butyl > sec-butyl > iso-butyl > tert-butyl, and methanol is the lowest-boiling alcohol.",
      definition:
        "- Same formula, comparable mass: alkane < ether < alcohol < carboxylic acid — n-butane (0 °C) < methoxyethane (8 °C) < propan-1-ol (97 °C) < ethanoic acid (118 °C).\n" +
        "- Butanols: **n-butyl (118) > sec-butyl (100) > iso-butyl (108 — the paper's key order puts sec above iso) > tert-butyl (83 °C)**; tert-butyl alcohol is the lowest, butan-1-ol the highest.\n" +
        "- Homologues: methanol < ethanol < propanol < butanol.\n" +
        "- Ethers: methoxyethane (b.p. 8 °C) is the only common ether that is a GAS at room temperature; ethoxyethane boils at 35 °C.\n" +
        "- Phenols: boiling points rise with molecular mass; pure phenol is a low-melting (41 °C), toxic solid with a carbolic smell — NOT odourless or high-melting.",
      formula: {
        label: "Boiling-point levers",
        latex:
          "\\text{H-bonding} \\uparrow,\\ \\text{chain length} \\uparrow \\Rightarrow \\text{b.p.} \\uparrow;\\qquad \\text{branching} \\uparrow \\Rightarrow \\text{b.p.} \\downarrow",
      },
      authoredExample: {
        prompt: "Rank pentan-1-ol, 2-methylbutan-2-ol, pentane and 1-methoxybutane by boiling point.",
        steps: [
          "Alcohols top (H-bonding), the straight one above the branched tertiary; the ether next; the alkane last.",
        ],
        answer: "Pentan-1-ol > 2-methylbutan-2-ol > 1-methoxybutane > pentane",
      },
      selfCheckExample: {
        prompt: "Which butanol isomer boils lowest, and which ether is gaseous at room temperature?",
        steps: [
          "Most branched: tert-butyl alcohol. Methoxyethane, b.p. about 8 °C.",
        ],
        answer: "tert-Butyl alcohol; methoxyethane",
      },
      practiceSet: [
        { prompt: "Lowest b.p. among the butanols?", answer: "tert-Butyl alcohol" },
        { prompt: "Highest b.p. among the butanols?", answer: "n-Butyl alcohol (butan-1-ol)" },
        { prompt: "Lowest b.p.: CH₃OC₂H₅, CH₃COOH, n-butane, propan-1-ol?", answer: "n-Butane" },
        { prompt: "Gaseous ether at room temperature?", answer: "Methoxyethane" },
      ],
      pyqExampleId: "46507e18-58aa-46f1-a521-b63eed13352a",
      traps: [
        {
          title: "Ranking iso-butyl above sec-butyl",
          body:
            "The measured values put isobutyl (108 °C) above sec-butyl (100 °C), but the paper's keyed order is n > sec > iso > tert — 'branching lowers boiling point' counted by the position of the branch. Give the paper's order; the endpoints (n highest, tert lowest) are never in doubt.",
        },
      ],
    },

    // 2 — solubility and H-bonding
    {
      kind: "formula" as const,
      slug: "cetalc-solubility-and-h-bonding",
      name: "Solubility in Water and the Kinds of Hydrogen Bond",
      intuition:
        "Solubility follows the ability to hydrogen-bond with water: alcohols best, amines weaker (N is less electronegative), alkanes not at all. Phenol dissolves appreciably; a nitro or methyl group on it cuts solubility. Two OH groups on neighbouring carbons — ethylene glycol — hydrogen-bond to each other inside the molecule.",
      definition:
        "- Comparable mass: **alcohol > amine > alkane** in water solubility; methane is the least soluble of CH₄, CH₃OH, C₂H₅OH, CH₃NH₂.\n" +
        "- Lower alcohols are miscible; solubility falls as the alkyl chain grows.\n" +
        "- Phenol is the most water-soluble of phenol, p-cresol, o-nitrophenol, p-nitrophenol, tert-butyl alcohol (as keyed) — the substituents add hydrophobic bulk or tie up the OH.\n" +
        "- Ethylene glycol: **intramolecular hydrogen bonding** between its two OH groups (as keyed); o-nitrophenol likewise, between OH and NO₂.\n" +
        "- Phenols are polar and show appreciable water solubility.",
      formula: {
        label: "Solubility order",
        latex:
          "\\text{R-OH} > \\text{R-NH}_2 > \\text{R-H} \\quad (\\text{H-bonding with water decides})",
      },
      authoredExample: {
        prompt: "Arrange butan-1-ol, butanamine and butane by water solubility, and say which of ethanol and hexan-1-ol is more soluble.",
        steps: [
          "Butan-1-ol > butanamine > butane. Ethanol — the shorter chain.",
        ],
        answer: "Alcohol > amine > alkane; ethanol",
      },
      selfCheckExample: {
        prompt: "Which is least soluble in water: C₂H₅OH, CH₃OH, CH₃NH₂, CH₄?",
        steps: [
          "Methane cannot hydrogen-bond at all.",
        ],
        answer: "CH₄",
      },
      practiceSet: [
        { prompt: "Decreasing solubility of alcohol, amine, alkane?", answer: "Alcohol > amine > alkane" },
        { prompt: "Most water-soluble: phenol, tert-butyl alcohol, o-nitrophenol, p-nitrophenol?", answer: "Phenol" },
        { prompt: "Force in ethylene glycol (as keyed)?", answer: "Intramolecular hydrogen bonding" },
        { prompt: "False about phenol: polar; odourless nontoxic high-melting; b.p. rises with mass; appreciably soluble?", answer: "'Odourless, nontoxic, high-melting solid'" },
      ],
      pyqExampleId: "8ef731eb-94c8-4a9d-96a6-36ff2c9f1798",
      traps: [
        {
          title: "Ranking the amine above the alcohol",
          body:
            "N–H···O bonds are weaker than O–H···O. Amines dissolve, but less than alcohols of the same size. The alkane, with no H-bonding, is always last.",
        },
      ],
    },

    // 3 — nitrophenol melting points
    {
      kind: "formula" as const,
      slug: "cetalc-nitrophenol-melting-points",
      name: "p-Nitrophenol Melts Highest: Inter- Versus Intramolecular H-Bonds",
      intuition:
        "In o-nitrophenol the OH hydrogen-bonds to its own nitro group, so molecules hold each other weakly — low melting point, volatile in steam. In p-nitrophenol the groups are too far apart, so the OH bonds to NEIGHBOURING molecules — high melting point, non-volatile. Phenol and p-cresol sit in between and below.",
      definition:
        "- Melting points: **p-nitrophenol (114 °C) > o-nitrophenol (45) > phenol (41) > p-cresol (35)** — p-nitrophenol highest in every version of the question.\n" +
        "- o-Nitrophenol: intramolecular H-bond, steam-volatile, less soluble. p-Nitrophenol: intermolecular H-bonds, higher b.p. and m.p., more soluble.\n" +
        "- A phenol has OH ON the ring: o-nitrophenol, 2-naphthol, o-bromophenol are phenols; **benzyl alcohol** (OH on a side-chain CH₂) is NOT.\n" +
        "- The same inter/intra logic explains why salicylaldehyde and o-hydroxybenzoic acid are steam-volatile and their para isomers are not.",
      formula: {
        label: "Which H-bond",
        latex:
          "\\text{ortho: intramolecular} \\Rightarrow \\text{low m.p., volatile};\\qquad \\text{para: intermolecular} \\Rightarrow \\text{high m.p.}",
      },
      authoredExample: {
        prompt: "Which of o- and p-hydroxybenzaldehyde is steam-volatile, and why does that one also melt lower?",
        steps: [
          "The ortho isomer: its OH hydrogen-bonds to its own CHO, so molecules are not held to each other; weaker intermolecular forces mean a lower melting point and volatility.",
        ],
        answer: "o-Hydroxybenzaldehyde; intramolecular H-bonding",
      },
      selfCheckExample: {
        prompt: "Which is NOT a phenol: 2-nitrophenol, 2-naphthol, 2-bromophenol, benzyl alcohol?",
        steps: [
          "Benzyl alcohol's OH is on a CH₂, not on the ring.",
        ],
        answer: "Benzyl alcohol",
      },
      practiceSet: [
        { prompt: "Highest m.p.: phenol, p-cresol, p-nitrophenol, o-nitrophenol?", answer: "p-Nitrophenol" },
        { prompt: "Which nitrophenol has intramolecular H-bonding?", answer: "o-Nitrophenol" },
        { prompt: "Is benzyl alcohol a phenol?", answer: "No" },
        { prompt: "Which nitrophenol is steam-volatile?", answer: "o-Nitrophenol" },
      ],
      pyqExampleId: "780517e4-617b-4f4c-a3b1-4531ca816296",
      traps: [
        {
          title: "Picking o-nitrophenol for the highest melting point",
          body:
            "Its hydrogen bond is INSIDE the molecule and does nothing to hold molecules together. p-Nitrophenol, whose OH must bond to a neighbour, melts almost 70 °C higher.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Halogen Derivatives — the same branching rule for boiling points",
      href: "/notes/mht-cet-chemistry/halogen-derivatives/cethal-classification-and-properties",
    },
    {
      label: "Phenols — the reactions of the compounds ranked here",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-phenols",
    },
  ],
};
