import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_IDEAL_NOTE: SubtopicNote = {
  subtopicName: "Ideal and Non-ideal Solutions",
  title: "Ideal and Non-ideal Solutions, Deviations and Azeotropes",
  oneLineDefinition:
    "Ideal solutions that obey Raoult's law with ΔmixH = 0 and ΔmixV = 0, positive and negative deviations and the molecular reason for each, testing a mixture against Raoult's law, and minimum and maximum boiling azeotropes.",
  whyItMatters:
    "40 questions, and thirty-seven of them come from board papers, in every year from 2023 to 2026. This is the most-asked page of the chapter after colligative properties. The board asks assertion-reason items on ΔmixH and ΔmixV of ideal and non-ideal solutions (2023, 2024); the type of deviation and its reason for ethanol and acetone (2023 to 2026), chloroform and acetone (2024 to 2026) and phenol and aniline (2026); what a volume change or temperature change on mixing tells you (2023, 2024, 2025); whether a mixture is ideal from its vapour pressure (2023, 2026); and azeotropes: their definition and the type formed by negative deviation (2023, asked again in 2025), which deviation gives a higher or lower boiling azeotrope (2023, 2024, 2026) and why they cannot be separated by fractional distillation (2025, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcso-ideal",
      name: "Ideal and non-ideal solutions",
      intuition:
        "If an A molecule cannot tell whether its neighbour is A or B, because all the attractions are the same, mixing changes nothing: no heat, no change of volume, and each liquid escapes exactly as Raoult's law says. That is an ideal solution. When the A-B attraction is weaker or stronger than A-A and B-B, the solution is non-ideal and its vapour pressure leaves the Raoult line.",
      definition:
        "- **Ideal solution:** obeys Raoult's law over the entire range of concentration. Also \\(\\Delta_{\\text{mix}}H = 0\\) and \\(\\Delta_{\\text{mix}}V = 0\\): no heat is absorbed or evolved on mixing, and the volume of the solution equals the sum of the volumes of the components.\n" +
        "- At molecular level: the A-B attractions are nearly equal to the A-A and B-B attractions.\n" +
        "- A perfectly ideal solution is rare. Nearly ideal: n-hexane and n-heptane, bromoethane and chloroethane, benzene and toluene.\n" +
        "- **Non-ideal solution:** does not obey Raoult's law over the entire range of concentration. Its vapour pressure is higher (positive deviation) or lower (negative deviation) than Raoult's law predicts.",
      table: {
        columns: ["Point", "Ideal solution", "Non-ideal solution"],
        rows: [
          { cells: ["Raoult's law", "Obeyed over the entire range of concentration", "Not obeyed"] },
          { cells: ["Enthalpy of mixing", "ΔmixH = 0", "ΔmixH is not zero"] },
          { cells: ["Volume of mixing", "ΔmixV = 0", "ΔmixV is not zero"] },
          { cells: ["A-B attractions", "Nearly equal to A-A and B-B", "Weaker or stronger than A-A and B-B"] },
          { cells: ["Vapour pressure", "Equal to the Raoult's law value", "Higher (positive deviation) or lower (negative deviation)"] },
          { cells: ["Example", "Benzene and toluene; n-hexane and n-heptane", "Ethanol and acetone; chloroform and acetone"] },
        ],
      },
      selfCheckExample: {
        prompt: "100 mL of n-hexane is mixed with 100 mL of n-heptane. What would you expect the volume of the solution to be, and will the mixture warm up or cool down?",
        steps: ["n-hexane and n-heptane form a nearly ideal solution, so ΔmixV = 0 and ΔmixH = 0.", "So the volume is about 200 mL and the temperature does not change."],
        answer: "About 200 mL, with no change of temperature",
      },
      practiceSet: [
        { prompt: "Name two pairs of liquids that form nearly ideal solutions.", answer: "Any two of benzene and toluene, n-hexane and n-heptane, bromoethane and chloroethane" },
        { prompt: "Why is ΔmixH zero for an ideal solution?", answer: "The A-B attractions formed are equal to the A-A and B-B attractions broken, so no energy is left over" },
        { prompt: "What is the full definition of an ideal solution in terms of Raoult's law?", answer: "A solution that obeys Raoult's law over the entire range of concentration" },
      ],
      pyqExampleId: "c12f1882-2f0b-435e-9166-2bbc651df497",
      traps: [
        {
          title: "Saying the A-B attractions are stronger in an ideal solution",
          body: "In an ideal solution the A-B attractions are about EQUAL to A-A and B-B. Stronger A-B attractions mean negative deviation. A 2023 reason that said \"stronger\" was false.",
        },
        {
          title: "Giving ΔmixH = 0 to non-ideal solutions",
          body: "ΔmixH = 0 and ΔmixV = 0 belong to ideal solutions only. A 2024 assertion that gave them to non-ideal solutions was false while its reason was true.",
        },
        {
          title: "Using one property to explain another",
          body: "Obeying Raoult's law and having ΔmixH = 0 are both properties of an ideal solution; neither explains the other. Both follow from equal A-B and A-A, B-B attractions. The 2024 assertion-reason item on this was code (B).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-raoult-test",
      name: "Testing a mixture against Raoult's law",
      intuition:
        "To decide whether a mixture is ideal, work out what Raoult's law predicts from the mole fractions, then compare it with the vapour pressure actually measured. Equal means ideal, higher means positive deviation, lower means negative deviation.",
      definition:
        "- Find the mole fractions from the moles of each liquid.\n" +
        "- Raoult's law value: \\(p_{\\text{ideal}} = x_A p_A^{\\circ} + x_B p_B^{\\circ}\\).\n" +
        "- Observed = \\(p_{\\text{ideal}}\\): ideal solution.\n" +
        "- Observed > \\(p_{\\text{ideal}}\\): positive deviation (A-B attractions weaker).\n" +
        "- Observed < \\(p_{\\text{ideal}}\\): negative deviation (A-B attractions stronger).\n" +
        "- The same test works for one component: compare its measured partial pressure with \\(x\\,p^{\\circ}\\).",
      formula: {
        label: "Raoult's law value for comparison",
        latex: "p_{\\text{ideal}} = x_A p_A^{\\circ} + x_B p_B^{\\circ}",
      },
      authoredExample: {
        prompt: "2 mol of liquid A and 3 mol of liquid B are mixed. The vapour pressures of pure A and pure B are 50 torr and 100 torr. The measured vapour pressure of the mixture is 70 torr. What kind of solution is it?",
        steps: [
          "Mole fractions: \\(x_A = \\dfrac{2}{5} = 0.4\\), \\(x_B = \\dfrac{3}{5} = 0.6\\).",
          "Raoult's law value: \\(p_{\\text{ideal}} = 0.4 \\times 50 + 0.6 \\times 100 = 20 + 60 = 80\\) torr.",
          "Measured 70 torr is LOWER than 80 torr.",
          "So the solution shows negative deviation: the A-B attractions are stronger than A-A and B-B.",
        ],
        answer: "Non-ideal, with negative deviation from Raoult's law",
      },
      selfCheckExample: {
        prompt: "In a solution the mole fraction of A is 0.5 and pure A has a vapour pressure of 50 torr. The measured partial pressure of A over the solution is 32 torr. Does the solution show positive or negative deviation?",
        steps: ["Raoult's law value for A: \\(0.5 \\times 50 = 25\\) torr.", "Measured 32 torr is higher than 25 torr."],
        answer: "Positive deviation",
      },
      practiceSet: [
        { prompt: "A mixture's measured vapour pressure equals the Raoult's law value at every composition. What kind of solution is it?", answer: "An ideal solution" },
        { prompt: "A mixture's measured vapour pressure lies below the Raoult's law line. Is mixing exothermic or endothermic?", answer: "Exothermic: lower vapour pressure means negative deviation, with stronger A-B attractions and heat released" },
        { prompt: "Why must masses be turned into moles before using Raoult's law?", answer: "Raoult's law uses mole fractions, and equal masses of different liquids are not equal numbers of moles" },
      ],
      pyqExampleId: "2fd1e980-e750-4219-ad22-6106ebafbf50",
      traps: [
        {
          title: "Matching the vapour pressures to the wrong liquids",
          body: "Board 2023 and 2026 set the same mixture with the two pure vapour pressures swapped, and the two answers differ. Pair each mole fraction with its own liquid's vapour pressure.",
        },
        {
          title: "Reading higher vapour pressure as negative deviation",
          body: "Higher than Raoult's value is POSITIVE deviation; lower is NEGATIVE. Decide by comparing, not by guessing from the liquids' names.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcso-deviation",
      name: "Positive and negative deviation: reasons and examples",
      intuition:
        "When unlike molecules hold each other less tightly than they held their own kind, they escape more easily: vapour pressure rises above Raoult's value. Breaking the stronger attractions takes in heat, so the mixture cools and spreads out. When unlike molecules hold each other more tightly, everything goes the other way: lower vapour pressure, heat given out, a smaller volume.",
      definition:
        "- **Positive deviation:** A-B attractions are weaker than A-A or B-B, so molecules escape more easily and the vapour pressure is higher than Raoult's law predicts.\n" +
        "- Ethanol and acetone: pure ethanol is hydrogen bonded; acetone molecules get in between and break some of these hydrogen bonds. Carbon disulphide and acetone also show positive deviation.\n" +
        "- **Negative deviation:** A-B attractions are stronger than A-A and B-B, so the escaping tendency falls and the vapour pressure is lower than Raoult's law predicts.\n" +
        "- Phenol and aniline: the hydrogen bond between the phenolic proton and the lone pair on the nitrogen of aniline is stronger than the hydrogen bonding between like molecules. Chloroform and acetone: a chloroform molecule forms a hydrogen bond with an acetone molecule.\n" +
        "- **Signs of ΔmixH and ΔmixV:** positive deviation, both positive (heat absorbed, the mixture cools and expands); negative deviation, both negative (heat released, it warms and contracts). The present NCERT text states ΔmixH = 0 and ΔmixV = 0 only for ideal solutions; the signs for non-ideal ones are asked in its Exercise 1.14 and in the 2023, 2024 and 2025 board papers, so learn them.",
      table: {
        columns: ["Point", "Positive deviation", "Negative deviation"],
        rows: [
          { cells: ["Vapour pressure", "Higher than Raoult's law value", "Lower than Raoult's law value"] },
          { cells: ["A-B attractions", "Weaker than A-A and B-B", "Stronger than A-A and B-B"] },
          { cells: ["Enthalpy of mixing", "ΔmixH > 0: heat absorbed, the mixture cools", "ΔmixH < 0: heat released, the mixture warms"] },
          { cells: ["Volume of mixing", "ΔmixV > 0: volume increases", "ΔmixV < 0: volume decreases"] },
          { cells: ["Boiling point of the mixture", "Higher vapour pressure, so it boils at a lower temperature than expected", "Lower vapour pressure, so it boils at a higher temperature than expected"] },
          { cells: ["Examples", "Ethanol and acetone; carbon disulphide and acetone", "Phenol and aniline; chloroform and acetone; nitric acid and water"] },
          {
            cells: ["Azeotrope formed (large deviation)", "Minimum boiling azeotrope", "Maximum boiling azeotrope"],
          },
        ],
      },
      selfCheckExample: {
        prompt: "Two liquids are mixed and the mixture becomes cold. Which deviation from Raoult's law does the solution show, and will its volume be more or less than the sum of the two volumes?",
        steps: ["Cooling means heat was absorbed: ΔmixH > 0.", "That is positive deviation, with weaker A-B attractions, so the molecules spread out: ΔmixV > 0."],
        answer: "Positive deviation; the volume is slightly more than the sum",
      },
      practiceSet: [
        { prompt: "Apart from ethanol and acetone, name a pair of liquids that shows positive deviation.", answer: "Carbon disulphide and acetone" },
        { prompt: "Why does a mixture of chloroform and acetone show negative deviation?", answer: "A chloroform molecule forms a hydrogen bond with an acetone molecule, so A-B attractions are stronger and the vapour pressure falls" },
        { prompt: "On mixing two liquids the total volume decreases. Which deviation is shown?", answer: "Negative deviation (ΔmixV < 0)" },
      ],
      pyqExampleId: "635dc226-3095-47d9-a065-ef99e0e53b0c",
      traps: [
        {
          title: "A reason without the attractions",
          body: "\"Give reason\" means compare the A-B attractions with A-A and B-B, and say what happens to the escaping tendency and the vapour pressure. Naming the deviation alone gets only the first mark.",
        },
        {
          title: "Getting the sign of the temperature change backwards",
          body: "Negative deviation releases heat, so the mixture WARMS; positive deviation absorbs heat, so it COOLS. Tie the sign to the strength of the new attractions, not to the word negative.",
        },
        {
          title: "Saying chloroform and acetone cannot hydrogen bond",
          body: "Neither liquid hydrogen bonds with itself, but chloroform does form a hydrogen bond with acetone. That new bond is the reason for the negative deviation.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcso-azeotrope",
      name: "Azeotropes",
      intuition:
        "Fractional distillation works because the vapour is richer in the more volatile liquid. At one special composition a strongly non-ideal mixture gives a vapour of exactly the same composition as the liquid. Boiling then changes nothing, so the two can no longer be separated by distillation.",
      definition:
        "- **Azeotropes:** binary mixtures having the same composition in liquid and vapour phase, which boil at a constant temperature. It is not possible to separate their components by fractional distillation.\n" +
        "- **Minimum boiling azeotrope:** formed by solutions showing a large positive deviation, at a specific composition. Ethanol and water: fractional distillation gives about 95% ethanol by volume and no further.\n" +
        "- **Maximum boiling azeotrope:** formed by solutions showing a large negative deviation. Nitric acid and water: about 68% nitric acid and 32% water by mass, boiling point 393.5 K.",
      table: {
        columns: ["Type", "Formed by", "Boiling point", "Example"],
        rows: [
          { cells: ["Minimum boiling azeotrope", "Large positive deviation", "Lower than either pure component", "Ethanol and water, about 95% ethanol by volume"] },
          { cells: ["Maximum boiling azeotrope", "Large negative deviation", "Higher than either pure component", "Nitric acid and water, about 68% nitric acid by mass, 393.5 K"] },
        ],
      },
      selfCheckExample: {
        prompt: "Fermented sugar solution is distilled again and again, but the ethanol never becomes purer than about 95% by volume. Why?",
        steps: ["At about 95% ethanol, ethanol and water form an azeotrope.", "Its vapour has the same composition as the liquid, so further distillation cannot enrich it."],
        answer: "It forms a minimum boiling azeotrope whose vapour has the same composition as the liquid",
      },
      practiceSet: [
        { prompt: "Which deviation from Raoult's law gives an azeotrope that boils lower than either component?", answer: "Large positive deviation (minimum boiling azeotrope)" },
        { prompt: "Give the approximate composition and boiling point of the nitric acid and water azeotrope.", answer: "About 68% nitric acid and 32% water by mass, boiling at 393.5 K" },
        { prompt: "Why can fractional distillation separate an ordinary mixture of two liquids?", answer: "Its vapour is richer in the more volatile liquid, so each vaporisation and condensation enriches it" },
      ],
      pyqExampleId: "e8e5ca4c-cd18-4a17-acd0-6ee1fb5bcb1a",
      traps: [
        {
          title: "A true reason that does not explain",
          body: "In 2026 the assertion \"azeotropes cannot be separated by fractional distillation\" came with the reason \"minimum boiling azeotropes form from large positive deviation\". Both are true, but only \"same composition in liquid and vapour\" explains the assertion, so the code was (B).",
        },
        {
          title: "Pairing the deviation with the wrong azeotrope",
          body: "Positive deviation raises the vapour pressure, so the mixture boils LOWER: minimum boiling. Negative deviation gives maximum boiling. Reason it out from the vapour pressure each time.",
        },
        {
          title: "Defining an azeotrope by its boiling point alone",
          body: "The definition needs both parts: the same composition in the liquid and the vapour, and boiling at a constant temperature. Add the consequence that it cannot be separated by fractional distillation.",
        },
      ],
    },
  ],
};
