import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_CATALYST_NOTE: SubtopicNote = {
  subtopicName: "Effect of a Catalyst on the Rate of Reaction",
  title: "How a Catalyst Speeds Up a Reaction",
  oneLineDefinition:
    "What a catalyst is, how it gives an alternative pathway with a lower activation energy, and the two graphs that show its effect: the potential energy diagram and the energy distribution of molecules.",
  whyItMatters:
    "2 questions, both from the textbook: explain how a catalyst increases the rate with the potential energy diagram for catalysed and uncatalysed reactions, and explain the effect of a catalyst graphically with the energy distribution of molecules. No board question in this bank is filed on this page; both answers need a labelled graph.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccck-catalyst-pathway",
      name: "Catalyst: an alternative pathway with lower activation energy",
      intuition:
        "A catalyst does not push the molecules harder; it finds them a lower pass over the hill. With a lower barrier, many more molecules already have enough energy to cross, so the reaction goes faster, and the catalyst comes out at the end unchanged.",
      definition:
        "- **Catalyst:** a substance added to the reactants that increases the rate of the reaction without itself being consumed in the reaction.\n" +
        "- Example: \\(2\\text{KClO}_3(\\text{s}) \\xrightarrow{\\text{MnO}_2} 2\\text{KCl}(\\text{s}) + 3\\text{O}_2(\\text{g})\\). MnO₂ is the catalyst; the decomposition is faster when it is added.\n" +
        "- A catalyst provides an **alternative pathway associated with a lower activation energy**.\n" +
        "- **Potential energy diagram (Fig. 6.10):** energy (y-axis) against reaction coordinate (x-axis). Both curves start at the same reactant energy and end at the same product energy; the barrier for the uncatalysed reaction, \\((E_a)_1\\), is higher than that for the catalysed reaction, \\((E_a)_2\\).\n" +
        "- Book example: \\(2\\text{H}_2\\text{O}_2(\\text{l}) \\xrightarrow{\\text{I}^-} 2\\text{H}_2\\text{O}(\\text{l}) + \\text{O}_2(\\text{g})\\). Without a catalyst \\(E_a = 76\\) kJ mol⁻¹; with iodide ions \\(E_a = 57\\) kJ mol⁻¹, and the reaction is faster.\n" +
        "- Since the fraction of molecules with energy at least \\(E_a\\) is \\(f = e^{-E_a/RT}\\), lowering \\(E_a\\) raises that fraction by the factor \\(e^{[(E_a)_1 - (E_a)_2]/RT}\\).",
      formula: {
        label: "Fraction of molecules able to cross the barrier",
        latex: "\\frac{f_{\\text{catalysed}}}{f_{\\text{uncatalysed}}} = e^{[(E_a)_1 - (E_a)_2]/RT}",
      },
      authoredExample: {
        prompt:
          "The decomposition of H₂O₂ has an activation energy of 76 kJ mol⁻¹, which falls to 57 kJ mol⁻¹ when iodide ions are added. By what factor does the fraction of molecules with energy at least \\(E_a\\) increase at 298 K? (R = 8.314 J K⁻¹ mol⁻¹)",
        steps: [
          "Given: \\((E_a)_1 = 76\\) kJ mol⁻¹, \\((E_a)_2 = 57\\) kJ mol⁻¹, so the barrier falls by \\(19 \\times 10^3\\) J mol⁻¹; \\(T = 298\\) K.",
          "Formula: \\(\\dfrac{f_2}{f_1} = e^{[(E_a)_1 - (E_a)_2]/RT}\\).",
          "Exponent: \\(\\dfrac{19 \\times 10^3\\ \\text{J mol}^{-1}}{8.314\\ \\text{J K}^{-1}\\ \\text{mol}^{-1} \\times 298\\ \\text{K}} = 7.67\\).",
          "\\(\\dfrac{f_2}{f_1} = e^{7.67} = 2.1 \\times 10^{3}\\).",
        ],
        answer: "About 2100 times as many molecules can cross the lower barrier",
      },
      selfCheckExample: {
        prompt: "A catalyst lowers the activation energy of a reaction by 10 kJ mol⁻¹ at 300 K. By what factor does the fraction of molecules with energy at least Eₐ increase?",
        steps: ["Exponent \\(= \\dfrac{10 \\times 10^3}{8.314 \\times 300} = 4.01\\).", "Factor \\(= e^{4.01} = 55\\)."],
        answer: "About 55 times",
      },
      practiceSet: [
        { prompt: "Is a catalyst used up in the reaction it speeds up?", answer: "No. It increases the rate without itself being consumed" },
        { prompt: "Which catalyst is used in the decomposition of KClO₃ in the textbook?", answer: "MnO₂" },
        { prompt: "On the potential energy diagram, does a catalyst change the energies of the reactants and products?", answer: "No. Both curves start and end at the same energies; only the barrier is lower" },
      ],
      pyqExampleId: "a46bea3d-db6f-4342-b85f-c566958fdad3",
      traps: [
        {
          title: "A catalyst gives the molecules more energy",
          body: "A catalyst does not raise the energy of the molecules or the temperature. It lowers the activation energy by providing a different pathway.",
        },
        {
          title: "Unlabelled energy diagram",
          body: "Label both barriers, \\((E_a)_1\\) for the uncatalysed and \\((E_a)_2\\) for the catalysed reaction, the reactants, the products and both axes. An unlabelled curve earns little.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccck-catalyst-graph",
      name: "The effect of a catalyst shown graphically",
      intuition:
        "Keep the temperature fixed and the spread of molecular energies stays exactly the same. The catalyst only moves the finishing line to the left, so a bigger share of the same crowd is already past it.",
      definition:
        "- **Graph (Fig. 6.11):** fraction of molecules (y-axis) against energy (x-axis), one distribution curve, since a catalyst does not change the temperature.\n" +
        "- Mark the threshold \\((E_a)_1\\) without the catalyst and the lower threshold \\((E_a)_2\\) with it, to its left.\n" +
        "- A catalyst lowers the threshold energy, so more molecules acquire the minimum energy and tend to cross the energy barrier.\n" +
        "- The fraction of activated molecules is greater for the catalysed reaction, so its rate is larger than that of the reaction with no catalyst.",
      table: {
        columns: ["Graph", "Axes", "What it shows"],
        rows: [
          {
            cells: ["Potential energy diagram (Fig. 6.10)", "Energy against reaction coordinate", "Two barriers between the same reactants and products; the catalysed barrier \\((E_a)_2\\) is lower than \\((E_a)_1\\)"],
          },
          {
            cells: ["Energy distribution (Fig. 6.11)", "Fraction of molecules against energy", "One curve with two thresholds; the area beyond \\((E_a)_2\\) is larger than beyond \\((E_a)_1\\), so more molecules are activated"],
          },
          {
            cells: ["Temperature effect (Fig. 6.9), for contrast", "Fraction of molecules against kinetic energy", "Two curves at \\(T_1\\) and \\(T_2\\) with one threshold \\(E_a\\); here the curve changes, not the threshold"],
          },
        ],
      },
      practiceSet: [
        { prompt: "Why is only one distribution curve drawn when showing the effect of a catalyst?", answer: "The catalyst does not change the temperature, so the energy distribution of the molecules stays the same" },
        { prompt: "In the energy distribution graph, which way does the threshold move when a catalyst is added?", answer: "To lower energy, to the left" },
        { prompt: "How does the catalyst graph differ from the temperature graph?", answer: "With a catalyst the threshold moves and the curve stays; with a temperature rise the curve changes and the threshold stays" },
      ],
      pyqExampleId: "396ae496-c1ef-4a8c-be0a-f9dd15c25817",
      traps: [
        {
          title: "Drawing two curves for a catalyst",
          body: "Two curves belong to the temperature graph. For a catalyst, draw one curve and two threshold lines.",
        },
      ],
    },
  ],
};
