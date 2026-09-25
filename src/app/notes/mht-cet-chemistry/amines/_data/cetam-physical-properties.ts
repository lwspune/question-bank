import type { SubtopicNote } from "@/app/notes/_types";

export const PHYSICAL_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties of Amines",
  title: "Physical Properties of Amines",
  oneLineDefinition:
    "Primary and secondary amines hydrogen-bond through N–H, tertiary amines cannot; so boiling points run primary > secondary > tertiary among isomers, amines sit below alcohols and far below carboxylic acids, and water solubility runs alcohol > amine > alkane.",
  whyItMatters:
    "8 PYQs, none HARD — one page, one idea. Two ask which C₄H₁₁N isomer boils highest (n-butylamine), two ask which compound has no intermolecular hydrogen bonding (trimethylamine), two ask the amine < alcohol < acid boiling-point order, two ask solubility (alcohol > amine > alkane; CH₄ least). " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetam-h-bonding-boiling-and-solubility",
      name: "N–H Hydrogen Bonding: Boiling Point and Solubility",
      intuition:
        "An N–H bond can donate a hydrogen bond; an O–H bond does it better because oxygen is more electronegative; a tertiary amine has no N–H and cannot donate at all. That single fact ranks everything: primary above secondary above tertiary isomers, alcohols above amines, acids (dimers) above both, and alcohols dissolving better than amines, which dissolve better than alkanes.",
      definition:
        "- Isomers of C₄H₁₁N: **n-butylamine** (1°, straight) > diethylamine (2°) > ethyldimethylamine (3°); tert-butylamine is low (1° but compact).\n" +
        "- Comparable mass: **amines < alcohols < carboxylic acids** in boiling point.\n" +
        "- No intermolecular H-bonding: **trimethylamine** (no N–H). Cyclohexylamine, allylamine, diphenylamine all have N–H.\n" +
        "- Solubility in water: **alcohols > amines > alkanes**; lower amines are soluble, solubility falls with chain length; CH₄ is the least soluble of CH₄, CH₃NH₂, CH₃OH, C₂H₅OH.\n" +
        "- Aniline is only slightly soluble (large hydrophobic ring).",
      formula: {
        label: "Two orders",
        latex:
          "\\text{b.p.: } 1^\\circ > 2^\\circ > 3^\\circ \\text{ (isomers)};\\quad \\text{amine} < \\text{alcohol} < \\text{acid};\\qquad \\text{solubility: alcohol} > \\text{amine} > \\text{alkane}",
      },
      authoredExample: {
        prompt: "Rank propan-1-amine, propan-1-ol, propanoic acid and butane by boiling point, and name the one with no hydrogen bonding at all.",
        steps: [
          "Acid (dimer) > alcohol > amine > alkane; butane has neither N–H nor O–H.",
        ],
        answer: "Propanoic acid > propan-1-ol > propan-1-amine > butane; butane",
      },
      selfCheckExample: {
        prompt: "Which cannot form intermolecular hydrogen bonds: cyclohexylamine, allylamine, trimethylamine, diphenylamine?",
        steps: [
          "Only the tertiary amine lacks N–H.",
        ],
        answer: "Trimethylamine",
      },
      practiceSet: [
        { prompt: "Highest b.p. among C₄H₁₁N isomers?", answer: "n-Butylamine" },
        { prompt: "Increasing b.p. of amines, alcohols, carboxylic acids?", answer: "Amines < alcohols < carboxylic acids" },
        { prompt: "Least soluble in water: C₂H₅OH, CH₃OH, CH₃NH₂, CH₄?", answer: "CH₄" },
        { prompt: "Decreasing water solubility: alcohols, amines, alkanes?", answer: "Alcohols > amines > alkanes" },
      ],
      pyqExampleId: "1807c2f6-a2a3-4c8e-9aad-1e4f4478e175",
      traps: [
        {
          title: "Ranking amines above alcohols because N is 'more basic'",
          body:
            "Basicity is not boiling point. O–H makes the stronger hydrogen bond, so alcohols boil higher and dissolve better; amines come second in both orders.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Alcohols — the same H-bonding logic on the oxygen side",
      href: "/notes/mht-cet-chemistry/alcohols-phenols-and-ethers/cetalc-physical-properties",
    },
    {
      label: "Nomenclature — which isomers are 1°, 2°, 3°",
      href: "/notes/mht-cet-chemistry/amines/cetam-nomenclature",
    },
  ],
};
