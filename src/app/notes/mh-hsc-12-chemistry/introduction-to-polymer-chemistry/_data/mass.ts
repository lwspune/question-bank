import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_PO_MASS_NOTE: SubtopicNote = {
  subtopicName: "Molecular Mass and Degree of Polymerization",
  title: "Molecular Mass and Degree of Polymerization",
  oneLineDefinition:
    "Why a polymer's molecular mass is an average, the degree of polymerization (DP), how molecular mass and DP are linked, and why each polymer needs a critical DP.",
  whyItMatters:
    "One question: the textbook's solved problem asking why the critical degree of polymerization is low for nylon 6 and high for polythene. No board paper in this bank has set this section, so give it less time than the other two pages, but learn the definitions and the reason, which link back to intermolecular forces.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccpo-degree-polymerization",
      name: "Degree of polymerization and critical DP",
      intuition:
        "A polymer sample is not made of identical molecules: some chains are longer, some shorter. So its molecular mass is an average. The degree of polymerization counts how many monomer units a chain holds. Too short a chain and the material is brittle; too long and it becomes tough and unmanageable. Each use needs at least a certain chain length, the critical DP.",
      definition:
        "- A polymer is usually a complex mixture of molecules of different molecular masses, so the **molecular mass of a polymer is an average** of the molecular masses of its molecules.\n" +
        "- **Degree of polymerization (DP)** is the number of monomer units in a polymer molecule. The molecular mass of a polymer depends on its DP: molecular mass = DP × mass of one repeating unit.\n" +
        "- Most mechanical properties depend on molecular mass. Low molecular mass polymers tend to be **brittle** with low mechanical strength; a polymer allowed to reach a very high molecular mass becomes **tough and unmanageable**. Both ends are undesirable.\n" +
        "- A polymer must have a molecular mass above a certain minimum to show the properties needed for a use. This minimum corresponds to the **critical degree of polymerization**, and the polymerization has to be controlled after a certain stage.\n" +
        "- For polymers with **hydrogen bonding** the critical DP is **lower** than for polymers with weak intermolecular forces.",
      formula: {
        label: "Degree of polymerization",
        latex: "\\text{DP} = \\frac{\\text{molecular mass of polymer}}{\\text{mass of one repeating unit}}",
        symbols: [
          { symbol: "\\(\\text{DP}\\)", meaning: "degree of polymerization, the number of monomer units in one molecule (no unit)" },
        ],
      },
      authoredExample: {
        prompt: "A sample of polythene has an average molecular mass of 56,000 u. Calculate its degree of polymerization. (C = 12, H = 1)",
        steps: [
          "Given: molecular mass of polymer = 56,000 u. Repeating unit \\({-}\\text{CH}_2{-}\\text{CH}_2{-}\\) = \\(2 \\times 12 + 4 \\times 1 = 28\\) u.",
          "Formula: \\(\\text{DP} = \\dfrac{\\text{molecular mass of polymer}}{\\text{mass of one repeating unit}}\\).",
          "Substitution: \\(\\text{DP} = \\dfrac{56000\\ \\text{u}}{28\\ \\text{u}} = 2000\\).",
        ],
        answer: "Degree of polymerization = 2000",
      },
      selfCheckExample: {
        prompt: "A teflon molecule has a degree of polymerization of 3000. Find its molecular mass. (C = 12, F = 19)",
        steps: ["Repeating unit \\({-}\\text{CF}_2{-}\\text{CF}_2{-}\\) = \\(2 \\times 12 + 4 \\times 19 = 100\\) u.", "Molecular mass = \\(3000 \\times 100 = 300000\\) u."],
        answer: "300,000 u",
      },
      practiceSet: [
        { prompt: "A PVC sample has an average molecular mass of 31,250 u. The repeating unit \\({-}\\text{CH}_2{-}\\text{CHCl}{-}\\) has a mass of 62.5 u. Find the DP.", answer: "\\(31250 / 62.5 = 500\\)" },
        { prompt: "A polystyrene molecule has DP = 400 and repeating unit mass 104 u. Find its molecular mass.", answer: "\\(400 \\times 104 = 41600\\) u" },
        { prompt: "Why is the molecular mass of a polymer stated as an average?", answer: "A polymer sample is a mixture of molecules of different molecular masses" },
        { prompt: "Why is a polymer of very high molecular mass undesirable?", answer: "It becomes tough and unmanageable" },
      ],
      pyqExampleId: "27790e5b-1cfb-4e7a-b29c-0731cd9fdefc",
      traps: [
        {
          title: "Adding the monomer masses for a condensation polymer",
          body: "In a condensation polymer water is lost at every link, so the repeating unit is lighter than the monomers together. The nylon 6,6 unit is \\(146 + 116 - 2 \\times 18 = 226\\) u, not 262 u.",
        },
        {
          title: "Giving DP a unit",
          body: "DP is a count of monomer units, a pure number. Molecular mass carries the unit u; DP does not.",
        },
      ],
    },
  ],
};
