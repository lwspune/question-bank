import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CC_STABILITY_NOTE: SubtopicNote = {
  subtopicName: "Stability of Coordination Compounds",
  title: "Stability Constants of Complexes",
  oneLineDefinition:
    "How the equilibrium constant of complex formation (the stability constant) measures the stability of a complex, and the two factors that govern it.",
  whyItMatters:
    "2 questions, both from the textbook exercise: explain stability in terms of the equilibrium constant, and name the factors that govern it. No board paper in this bank has asked this section, so learn the expression and the two factors and give it less time than the other pages.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscccc-stability-constant",
      name: "The stability constant K",
      intuition:
        "Forming a complex is an equilibrium: the metal ion and the ligands on one side, the complex on the other. If the equilibrium lies far to the right, nearly all the metal is held as the complex and the complex is stable. The equilibrium constant says how far right it lies, so a larger K means a more stable complex.",
      definition:
        "- Stability is governed by the metal and ligand interaction, a **Lewis acid and Lewis base** interaction: the stronger it is, the more stable the complex.\n" +
        "- For a metal ion \\(\\text{M}^{a+}\\) and \\(n\\) ligands \\(\\text{L}^{x-}\\): \\(\\text{M}^{a+} + n\\text{L}^{x-} \\rightleftharpoons \\text{[ML}_n]^{a+nx}\\), where \\(a+nx\\) is the charge on the complex.\n" +
        "- The equilibrium constant of this reaction is the **stability constant** K.\n" +
        "- **The higher the value of K, the greater the thermodynamic stability of the complex.**\n" +
        "- Textbook data: \\(\\text{[Ag(CN)}_2]^-\\), \\(\\text{[Cu(CN)}_4]^{2-}\\) and \\(\\text{[Co(NH}_3)_6]^{3+}\\) have increasing K, so \\(\\text{[Co(NH}_3)_6]^{3+}\\) is the most stable of the three.",
      formula: {
        label: "Stability constant",
        latex: "K = \\frac{[\\text{ML}_n^{\\,a+nx}]}{[\\text{M}^{a+}][\\text{L}^{x-}]^n}",
      },
      authoredExample: {
        prompt:
          "Write the stability constant for \\(\\text{Cu}^{2+} + 4\\text{NH}_3 \\rightleftharpoons \\text{[Cu(NH}_3)_4]^{2+}\\). Take its value as \\(1.0 \\times 10^{13}\\). Another complex of \\(\\text{Cu}^{2+}\\) has \\(K = 2.0 \\times 10^{18}\\). Which complex is more stable, and by what factor is its K larger?",
        steps: [
          "Formula: \\(K = \\dfrac{[\\text{[Cu(NH}_3)_4]^{2+}]}{[\\text{Cu}^{2+}][\\text{NH}_3]^4}\\).",
          "Compare: \\(2.0 \\times 10^{18} > 1.0 \\times 10^{13}\\).",
          "Factor: \\(\\dfrac{2.0 \\times 10^{18}}{1.0 \\times 10^{13}} = 2.0 \\times 10^{5}\\).",
          "The higher K, the greater the thermodynamic stability.",
        ],
        answer: "The complex with K = 2.0 × 10¹⁸ is more stable; its K is 2.0 × 10⁵ times larger",
      },
      selfCheckExample: {
        prompt: "Write the stability constant expression for \\(\\text{Fe}^{3+} + 6\\text{CN}^- \\rightleftharpoons \\text{[Fe(CN)}_6]^{3-}\\).",
        steps: ["Product over reactants, each concentration raised to its coefficient."],
        answer: "\\(K = \\dfrac{[\\text{[Fe(CN)}_6]^{3-}]}{[\\text{Fe}^{3+}][\\text{CN}^-]^6}\\)",
      },
      practiceSet: [
        { prompt: "A complex has a very small stability constant. Is the metal present mostly as the complex or as free ions?", answer: "Mostly as free metal ions and free ligands" },
        { prompt: "In the stability constant expression, to what power is the ligand concentration raised?", answer: "To n, the number of ligands in the complex" },
        { prompt: "Does the stability constant measure thermodynamic or kinetic stability?", answer: "Thermodynamic stability" },
      ],
      pyqExampleId: "79bd7b26-38d5-4481-8993-efde9b39f48a",
      traps: [
        {
          title: "Writing the expression upside down",
          body: "The stability constant has the complex on top and the free metal ion and ligands below. Turned over, a larger value would wrongly mean a less stable complex.",
        },
        {
          title: "Dropping the power n",
          body: "Four ligands means \\([\\text{L}]^4\\) in the denominator. Leaving out the power is the commonest slip in this expression.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscccc-stability-factors",
      name: "Factors that govern the stability of a complex",
      intuition:
        "A small, highly charged metal ion pulls the ligands' electron pairs in strongly; a ligand that gives up its lone pair easily bonds strongly. Either way the Lewis acid and base hold each other more firmly, and the complex is more stable.",
      definition:
        "- **(a) Charge to size ratio of the metal ion:** the higher the ratio, the greater the stability.\n" +
        "- For divalent metal ions the order of stability of their complexes is the **Irving-William order**: \\(\\text{Cu}^{2+} > \\text{Ni}^{2+} > \\text{Co}^{2+} > \\text{Fe}^{2+} > \\text{Mn}^{2+} > \\text{Cd}^{2+}\\).\n" +
        "- **(b) Nature of the ligand:** how easily the ligand donates its lone pair to the metal ion, that is, its **basicity**. Ligands that are stronger bases tend to form more stable complexes.",
      table: {
        columns: ["Factor", "Effect on stability", "Textbook illustration"],
        rows: [
          { cells: ["Charge to size ratio of the metal ion", "Higher ratio, more stable complex", "\\(\\text{Cu}^{2+}\\) (69 pm) and \\(\\text{Cd}^{2+}\\) (97 pm) have the same charge; \\(\\text{Cu}^{2+}\\) is smaller, so it forms more stable complexes"] },
          { cells: ["Nature (basicity) of the ligand", "Stronger base, more stable complex", "A ligand that gives up its lone pair more easily bonds more strongly to the metal ion"] },
        ],
      },
      selfCheckExample: {
        prompt: "Arrange the complexes of Mn²⁺, Cu²⁺ and Fe²⁺ (with the same ligand) in decreasing order of stability.",
        steps: ["Use the Irving-William order: \\(\\text{Cu}^{2+} > \\text{Ni}^{2+} > \\text{Co}^{2+} > \\text{Fe}^{2+} > \\text{Mn}^{2+} > \\text{Cd}^{2+}\\)."],
        answer: "Cu²⁺ > Fe²⁺ > Mn²⁺",
      },
      practiceSet: [
        { prompt: "Which forms more stable complexes, Ni²⁺ or Mn²⁺?", answer: "Ni²⁺ (it comes before Mn²⁺ in the Irving-William order)" },
        { prompt: "Does a ligand that is a stronger base form a more or a less stable complex?", answer: "A more stable complex" },
      ],
      pyqExampleId: "37a8db26-2cee-425b-b0bc-fcd6ac980ab4",
      traps: [
        {
          title: "Looking at charge alone",
          body: "Two ions of the same charge can differ in stability because of size. It is the charge to size ratio that matters: the smaller ion of the pair forms the more stable complexes.",
        },
      ],
    },
  ],
};
