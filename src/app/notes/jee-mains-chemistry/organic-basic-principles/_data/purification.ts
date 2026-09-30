import type { SubtopicNote } from "@/app/notes/_types";

export const PURIFICATION_GOC_NOTE: SubtopicNote = {
  subtopicName: "Methods of Purification",
  title: "Methods of Purification",
  oneLineDefinition:
    "Each purification method exploits the one property in which the compound and its impurity differ: boiling point for the distillations, volatility in steam for steam distillation, solubility for crystallisation and extraction, and a direct change from solid to vapour for sublimation.",
  whyItMatters:
    "Twenty-five PYQs, all of them multiple choice, and six from 2026. Sixteen pick the right distillation for a mixture, most often in a match list: simple, fractional, under reduced pressure or with steam. Nine cover crystallisation, sublimation and extraction, including an acid–base separation in a separating funnel and the principle each method rests on.",
  concepts: [
    // C1 — distillation methods
    {
      kind: "reference" as const,
      slug: "jcgoc-distillation",
      name: "Choosing a distillation method",
      intuition:
        "Distillation separates liquids by boiling point. The only question is which kind to use, and three things decide it: how far apart the boiling points are, whether the liquid survives being heated to its own boiling point, and whether the substance is volatile in steam but does not mix with water.",
      definition:
        "- **Simple distillation**: boiling points far apart, or a liquid from a non-volatile solid. Chloroform (b.p. 334 K) and aniline (b.p. 457 K) separate this way.\n" +
        "- **Fractional distillation**: boiling points close together. A fractionating column gives many rounds of evaporation and condensation. The higher-boiling vapour condenses first, so the vapour rising up the column gets richer in the LOWER-boiling liquid. Crude oil is separated into its fractions this way.\n" +
        "- **Distillation under reduced pressure**: for a liquid that decomposes at or below its normal boiling point. Lowering the pressure lowers the boiling point. Glycerol is recovered from spent lye in soap making this way.\n" +
        "- **Steam distillation**: for a substance that is volatile in steam and immiscible with water. The mixture boils when the two vapour pressures together reach atmospheric pressure, so the substance distils below its own boiling point and below 373 K. Aniline, essential oils and o-nitrophenol are purified this way.\n" +
        "- o-Nitrophenol is steam volatile because its hydrogen bond is intramolecular; p-nitrophenol forms intermolecular hydrogen bonds and stays behind.\n" +
        "- An **azeotrope** (a constant-boiling mixture) boils without changing composition, so fractional distillation cannot separate it.",
      table: {
        columns: ["Method", "Use when", "Classic example"],
        rows: [
          { cells: ["Simple distillation", "Boiling points far apart, or a liquid from a non-volatile solid", "Chloroform from aniline"] },
          { cells: ["Fractional distillation", "Liquids with close boiling points", "Crude oil into petrol, kerosene and diesel fractions"] },
          { cells: ["Distillation under reduced pressure", "The liquid decomposes at its normal boiling point", "Glycerol from spent lye"] },
          {
            cells: ["Steam distillation", "Steam-volatile substance, immiscible with water", "Aniline from an aniline–water mixture; o-nitrophenol from p-nitrophenol"],
            noteAmber: "The substance distils below its own boiling point because the two vapour pressures add up.",
          },
          { cells: ["Azeotropic distillation", "A constant-boiling mixture that fractional distillation cannot split", "Water removed from ethanol by adding benzene"] },
        ],
        caption: "Name the property that differs, and the method follows.",
      },
      selfCheckExample: {
        prompt:
          "Which method separates benzene (b.p. 353 K) from toluene (b.p. 384 K), and which liquid collects first?",
        steps: [
          "The boiling points are close, so a single vaporisation cannot separate them: use fractional distillation.",
          "The vapour rising up the column gets richer in the lower-boiling liquid, so it distils first.",
        ],
        answer: "Fractional distillation; benzene collects first.",
      },
      practiceSet: [
        { prompt: "Which method purifies a liquid that decomposes at its normal boiling point?", answer: "Distillation under reduced pressure" },
        { prompt: "Which method separates aniline from water?", answer: "Steam distillation" },
        { prompt: "Which of o-nitrophenol and p-nitrophenol is volatile in steam?", answer: "o-Nitrophenol (intramolecular hydrogen bond)" },
        { prompt: "Can fractional distillation separate an azeotrope?", answer: "No" },
      ],
      pyqExampleId: "b6a3ae11-6e43-4024-8591-f7f0a0d065b3", // 2026 — match four distillation methods to their uses
      traps: [
        {
          title: "Lower pressure means a lower boiling point",
          body: "Distillation under reduced pressure works because the boiling point FALLS as the pressure falls. The liquid then boils below the temperature at which it would decompose.",
        },
        {
          title: "The rising vapour gets richer in the lower-boiling liquid",
          body: "In a fractionating column the higher-boiling component condenses first and runs back down. The vapour that reaches the top is richer in the more volatile component.",
        },
        {
          title: "Steam distillation needs a water-immiscible substance",
          body: "Steam distillation works only if the substance does not mix with water and has an appreciable vapour pressure near 373 K. A water-soluble compound, or a non-volatile one, cannot be steam distilled.",
        },
      ],
    },

    // C2 — crystallisation, sublimation and extraction
    {
      kind: "reference" as const,
      slug: "jcgoc-crystal-extract",
      name: "Crystallisation, sublimation and extraction",
      intuition:
        "When the mixture is solid, or when one component can be moved into another solvent, boiling points no longer help. The solubility of each component, and whether a solid can turn straight into vapour, decide the method instead.",
      definition:
        "- **Crystallisation**: dissolve in a hot solvent in which the compound is only sparingly soluble when cold. On cooling the compound crystallises and the impurity stays in solution. Activated charcoal removes coloured impurities. Repeated (fractional) crystallisation separates two compounds of similar solubility.\n" +
        "- **Sublimation**: a solid that turns straight into vapour on heating, without melting, is separated from a solid that does not. The method rests on this solid-to-vapour change, not on a low melting point.\n" +
        "- **Differential extraction**: the compound is more soluble in an organic solvent that does not mix with water. The two layers are shaken in a separating funnel and run off separately. Several small extractions beat one large one.\n" +
        "- **Acid–base extraction**: aqueous NaOH turns an acid (a carboxylic acid, a phenol) into its water-soluble sodium salt; dilute HCl turns an amine into its water-soluble ammonium salt. Neutral compounds stay in the organic layer.\n" +
        "- The right method depends on the nature of BOTH the compound and the impurity.\n" +
        "- Purity check: a sharp melting point that does not change when the sample is mixed with the pure substance (a mixed melting point).",
      table: {
        columns: ["Method", "Property exploited", "Example"],
        rows: [
          { cells: ["Crystallisation", "Solubility in one solvent, hot against cold", "Benzoic acid recrystallised from hot water"] },
          { cells: ["Fractional crystallisation", "A small difference in solubility, used repeatedly", "Two solids of similar solubility separated in stages"] },
          { cells: ["Sublimation", "Solid changes directly to vapour", "Naphthalene or camphor separated from sodium chloride"] },
          { cells: ["Differential extraction", "Different solubility in two immiscible solvents", "An organic compound extracted from water into ether"] },
          {
            cells: ["Acid–base extraction", "An acid or base turned into a water-soluble salt", "Phenol pulled from a toluene solution into aqueous NaOH"],
            noteAmber: "NaOH extracts acids and phenols; dilute HCl extracts amines. Neither extracts a neutral compound.",
          },
        ],
        caption: "All five work on solids or solutions, where the distillations cannot help.",
      },
      selfCheckExample: {
        prompt:
          "A solution of aniline and chlorobenzene in ether is shaken with dilute HCl in a separating funnel. Which compound ends up in the water layer, and in what form?",
        steps: [
          "Aniline is a base: HCl turns it into anilinium chloride, \\(\\mathrm{C_6H_5NH_3^+Cl^-}\\), an ionic salt that dissolves in water.",
          "Chlorobenzene is neutral: it does not react and stays in the ether layer.",
        ],
        answer: "Aniline, as anilinium chloride.",
      },
      practiceSet: [
        { prompt: "Which method separates camphor from sand?", answer: "Sublimation" },
        { prompt: "Which aqueous reagent pulls phenol out of an ether solution?", answer: "Aqueous NaOH" },
        { prompt: "What is the principle of differential extraction?", answer: "Different solubility in two immiscible solvents" },
        { prompt: "What removes coloured impurities during crystallisation?", answer: "Activated charcoal" },
      ],
      pyqExampleId: "72399689-23b1-42e3-a479-3c41ffe06fc1", // 2025 — NaOH extraction of chlorobenzene, aniline and benzoic acid
      traps: [
        {
          title: "Sublimation is about solid to vapour, not a low melting point",
          body: "Sublimation separates a solid that passes straight into vapour from one that does not. A statement that sublimation is used for compounds with a low melting point is false.",
        },
        {
          title: "NaOH does not extract an amine",
          body: "An amine is a base, so a base cannot turn it into a salt. With aqueous NaOH, aniline stays in the organic layer along with any neutral compound.",
        },
        {
          title: "The impurity matters as much as the compound",
          body: "Methods of purification depend on the nature of the compound AND of the impurity. The same compound may need a different method when the impurity changes.",
        },
      ],
    },
  ],
};
