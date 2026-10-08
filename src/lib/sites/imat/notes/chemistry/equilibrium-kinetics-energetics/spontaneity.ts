import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_EQK_SPONTANEITY_NOTE: SubtopicNote = {
  subtopicName: "Entropy and Spontaneity",
  title: "Entropy, Gibbs Free Energy and Spontaneous Change",
  oneLineDefinition:
    "Whether a reaction can happen by itself depends on both its enthalpy change and its entropy change, combined in the Gibbs free energy ΔG = ΔH − TΔS.",
  whyItMatters:
    "No past IMAT question has been set on this page yet, but entropy and free energy are in the official syllabus. Expect a qualitative question: the sign of an entropy change, or whether a reaction is spontaneous at high or low temperature.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-eqk-entropy",
      name: "Entropy: a measure of the spreading of matter and energy",
      intuition:
        "A drop of ink spreads through water and never gathers back into a drop by itself. There are vastly more ways for the particles to be spread out than gathered up, so spreading is overwhelmingly likely. Entropy measures how many ways the particles and their energy can be arranged: the more spread out, the higher the entropy.",
      definition:
        "- **Entropy** \\(S\\) measures the dispersal (often called the disorder) of particles and energy. Units: J/(K mol).\n" +
        "- Entropy increases from **solid to liquid to gas**, with a big jump on forming a gas.\n" +
        "- A reaction that **increases the number of moles of gas** usually has \\(\\Delta S > 0\\). Dissolving, mixing and heating also increase entropy.\n" +
        "- The **second law of thermodynamics**: in a spontaneous change, the **total** entropy of the system plus surroundings increases. The entropy of the system alone can fall, if enough heat is released to the surroundings.",
      table: {
        columns: ["Change", "Entropy of the system", "Why"],
        rows: [
          { cells: ["Ice melting", "Increases", "Particles become free to move"] },
          { cells: ["Steam condensing", "Decreases", "Gas becomes liquid"] },
          { cells: ["\\(\\mathrm{CaCO_3(s) \\rightarrow CaO(s) + CO_2(g)}\\)", "Increases", "A gas is produced from a solid"] },
          { cells: ["\\(\\mathrm{N_2(g) + 3H_2(g) \\rightarrow 2NH_3(g)}\\)", "Decreases", "4 mol of gas become 2 mol"] },
          { cells: ["Salt dissolving in water", "Usually increases", "Ions spread through the solution"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which change gives the largest increase in the entropy of the system?",
        options: [
          "\\(\\mathrm{H_2O(g) \\rightarrow H_2O(l)}\\)",
          "\\(\\mathrm{N_2(g) + 3H_2(g) \\rightarrow 2NH_3(g)}\\)",
          "\\(\\mathrm{2NaHCO_3(s) \\rightarrow Na_2CO_3(s) + H_2O(g) + CO_2(g)}\\)",
          "\\(\\mathrm{C(s) + O_2(g) \\rightarrow CO_2(g)}\\)",
          "\\(\\mathrm{Ag^+(aq) + Cl^-(aq) \\rightarrow AgCl(s)}\\)",
        ],
        steps: [
          "Look at the moles of gas on each side. C turns a solid into 2 mol of gas: a large increase.",
          "D has 1 mol of gas on each side, so its entropy change is small. A, B and E all reduce disorder: a gas condenses, gas moles fall, or ions come out of solution as a solid.",
        ],
        answer: "(C) \\(\\mathrm{2NaHCO_3(s) \\rightarrow Na_2CO_3(s) + H_2O(g) + CO_2(g)}\\)",
      },
      practiceSet: [
        { prompt: "What is the sign of ΔS when water evaporates?", answer: "Positive" },
        { prompt: "What is the sign of ΔS for \\(\\mathrm{2SO_2(g) + O_2(g) \\rightarrow 2SO_3(g)}\\)?", answer: "Negative", method: "3 mol of gas become 2 mol" },
        { prompt: "Which has the higher entropy: 1 mol of steam at 100 °C or 1 mol of liquid water at 100 °C?", answer: "The steam" },
      ],
      traps: [
        {
          title: "The entropy of the system can fall in a spontaneous change",
          body: "Water freezes spontaneously below 0 °C although its entropy falls. The heat released raises the entropy of the surroundings by more. The second law is about the total entropy, not the system alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eqk-gibbs",
      name: "Gibbs free energy and whether a reaction is spontaneous",
      intuition:
        "Two tendencies drive chemical change: to release energy (negative ΔH) and to spread out (positive ΔS). The Gibbs free energy weighs them against each other, with temperature deciding how much the entropy term counts. When ΔG is negative the reaction can go by itself.",
      definition:
        "- \\(\\Delta G = \\Delta H - T\\Delta S\\), with \\(T\\) in kelvin. Convert \\(\\Delta S\\) from J to kJ before combining it with \\(\\Delta H\\) in kJ.\n" +
        "- \\(\\Delta G < 0\\): the reaction is **spontaneous** (feasible). \\(\\Delta G > 0\\): not spontaneous; the reverse reaction is. \\(\\Delta G = 0\\): at equilibrium.\n" +
        "- \\(\\Delta H < 0\\) and \\(\\Delta S > 0\\): spontaneous at **all** temperatures.\n" +
        "- \\(\\Delta H > 0\\) and \\(\\Delta S < 0\\): **never** spontaneous.\n" +
        "- \\(\\Delta H < 0\\) and \\(\\Delta S < 0\\): spontaneous only at **low** temperature. \\(\\Delta H > 0\\) and \\(\\Delta S > 0\\): only at **high** temperature. The switch happens at \\(T = \\Delta H / \\Delta S\\).\n" +
        "- Spontaneous says nothing about speed: diamond turning into graphite has \\(\\Delta G < 0\\) but is far too slow to see.",
      formula: {
        label: "Gibbs free energy",
        latex: "\\Delta G = \\Delta H - T\\Delta S",
        symbols: [
          { symbol: "\\(\\Delta G\\)", meaning: "free energy change, in kJ/mol" },
          { symbol: "\\(\\Delta H\\)", meaning: "enthalpy change, in kJ/mol" },
          { symbol: "\\(T\\)", meaning: "absolute temperature, in K" },
          { symbol: "\\(\\Delta S\\)", meaning: "entropy change, in kJ/(K mol) when combined with ΔH in kJ" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(\\mathrm{CaCO_3(s) \\rightarrow CaO(s) + CO_2(g)}\\), \\(\\Delta H = +178\\ \\text{kJ/mol}\\) and \\(\\Delta S = +161\\ \\text{J K}^{-1}\\text{mol}^{-1}\\). Is it spontaneous at 298 K? Above what temperature does it become spontaneous?",
        steps: [
          "Convert: \\(\\Delta S = 0.161\\ \\text{kJ K}^{-1}\\text{mol}^{-1}\\).",
          "At 298 K: \\(\\Delta G = 178 - 298 \\times 0.161 = 178 - 48 = +130\\ \\text{kJ/mol}\\). Positive, so not spontaneous: limestone does not decompose at room temperature.",
          "\\(\\Delta G = 0\\) when \\(T = \\Delta H/\\Delta S = 178 / 0.161 \\approx 1106\\ \\text{K}\\), about 830 °C. Above this, \\(T\\Delta S\\) outweighs \\(\\Delta H\\).",
        ],
        answer: "Not spontaneous at 298 K; spontaneous above about 1100 K",
      },
      selfCheckExample: {
        prompt:
          "A reaction has \\(\\Delta H = -100\\ \\text{kJ/mol}\\) and \\(\\Delta S = -200\\ \\text{J K}^{-1}\\text{mol}^{-1}\\). Which statement is correct?",
        options: [
          "It is spontaneous at all temperatures",
          "It is spontaneous only below 500 K",
          "It is spontaneous only above 500 K",
          "It is never spontaneous",
          "It is spontaneous only below 0.5 K",
        ],
        steps: [
          "Both signs are negative, so the enthalpy term favours the reaction and the entropy term opposes it. The entropy term grows with temperature, so the reaction works only when it is cold enough.",
          "Switch temperature: \\(T = \\Delta H/\\Delta S = 100 / 0.200 = 500\\ \\text{K}\\). Below 500 K, \\(\\Delta G < 0\\).",
          "E forgets to convert J to kJ (\\(100/200\\)). C gets the direction backwards.",
        ],
        answer: "(B) It is spontaneous only below 500 K",
      },
      practiceSet: [
        { prompt: "A reaction is exothermic and its entropy increases. At what temperatures is it spontaneous?", answer: "At all temperatures" },
        { prompt: "\\(\\Delta H = +40\\ \\text{kJ/mol}\\) and \\(\\Delta S = +100\\ \\text{J K}^{-1}\\text{mol}^{-1}\\). Find \\(\\Delta G\\) at 300 K and at 500 K.", answer: "+10 kJ/mol at 300 K (not spontaneous); −10 kJ/mol at 500 K (spontaneous)", method: "\\(40 - T \\times 0.100\\)" },
        { prompt: "Does a negative ΔG tell you that a reaction is fast?", answer: "No: it tells you the reaction is possible, not its rate" },
      ],
      traps: [
        {
          title: "Endothermic reactions can be spontaneous",
          body: "Ice melting above 0 °C and ammonium nitrate dissolving are endothermic yet happen by themselves, because their entropy increase is large enough. A positive ΔH alone does not rule out a spontaneous change.",
        },
        {
          title: "Spontaneous does not mean fast",
          body: "ΔG tells you whether a reaction can go, not how quickly. A mixture of hydrogen and oxygen has a very negative ΔG for forming water, yet it can sit unchanged for years until a spark supplies the activation energy.",
        },
      ],
    },
  ],
};
