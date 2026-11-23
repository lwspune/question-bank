import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_SOLUBILITY_NOTE: SubtopicNote = {
  subtopicName: "Solubility and Capacity to Dissolve Solute",
  title: "Solubility and Henry's Law",
  oneLineDefinition:
    "What a saturated solution is, how the nature of solute and solvent, temperature and pressure change solubility, and Henry's law for a gas dissolved in a liquid.",
  whyItMatters:
    "11 questions. Six were set in board papers: the solubility of methyl bromide from Henry's law (2022 and 2024), state Henry's law and give the unit of its constant (2025), and name the type of solution carbonated water is and the unit of Henry's constant again (2026). The textbook adds the solubility of nitrogen, the pressure of oxygen fish need, and how temperature changes the solubility of solids.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccso-solubility-factors",
      name: "Types of solutions and what decides solubility",
      intuition:
        "Keep adding sugar to a glass of water and stirring: it dissolves easily at first, then slowly, then not at all. The solution is now saturated. How much a solvent can hold depends on what the solute and solvent are, on the temperature and, for a gas, on the pressure.",
      definition:
        "- A solution is a homogeneous mixture. Solute and solvent may each be a solid, a liquid or a gas, so there are **nine types of solutions**. Name the state of the **solute** first, then of the solvent.\n" +
        "- **Saturated solution:** holds the maximum amount of solute in a given amount of solvent at a given temperature. Dissolution and crystallisation then go on at the same rate (a dynamic equilibrium).\n" +
        "- **Supersaturated solution:** holds more than the equilibrium amount of solute. It is unstable: a tiny crystal of solute makes the extra solute precipitate.\n" +
        "- **Solubility:** the amount of solute per unit volume of saturated solution at a specific temperature, its maximum concentration, expressed in mol L⁻¹.\n" +
        "- There is no direct link between solubility and the heat of solution: CaCl₂ dissolves with the release of heat and NH₄NO₃ with the absorption of heat, yet the solubility of both rises with temperature.",
      table: {
        columns: ["Factor", "What the textbook says", "Example"],
        rows: [
          {
            cells: ["Type of solution", "Named by the state of the solute, then of the solvent", "Carbonated water (CO₂ in water) is a gas in liquid solution; brass is a solid in solid"],
            pyqExampleId: "628af309-7fa2-48c7-aa77-3e7ad4616f30",
            noteAmber: "Board 2026 asked which type of solution carbonated water is.",
          },
          { cells: ["Nature of solute and solvent", "Like dissolves like: substances with similar intermolecular forces dissolve in each other", "NaCl and sugar dissolve in water; cholesterol dissolves in benzene"] },
          {
            cells: ["Temperature, endothermic dissolution", "Heat favours the endothermic process (Le Chatelier principle), so solubility rises with temperature", "KNO₃, NaNO₃ and KBr (Fig. 2.1)"],
            pyqExampleId: "c9a1039c-95d6-4011-b396-6b400a962615",
            noteAmber: "Textbook Exercise Q.5 asks the effect of temperature on the solubility of solids, with examples.",
          },
          { cells: ["Temperature, exothermic dissolution", "Solubility falls as temperature rises", "Na₂SO₄ (Fig. 2.1)"] },
          { cells: ["Temperature, little effect", "Solubility changes only slightly", "NaBr and NaCl (Fig. 2.1)"] },
          { cells: ["Temperature, gases", "Solubility of a gas usually falls as temperature rises, because dissolving a gas is like condensing it, which releases heat", "Hot water from industrial cooling holds less oxygen, which harms fish"] },
          { cells: ["Pressure", "No effect on solids and liquids, which are incompressible; the solubility of a gas rises with pressure", "Soft drink bottles are sealed under a high pressure of CO₂"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Anhydrous sodium sulphate dissolves in water with the evolution of heat. What is the effect of temperature on its solubility? Give the reason.",
        steps: [
          "Dissolving it releases heat, so the dissolution is exothermic.",
          "Raising the temperature adds heat, a stress that favours the reverse, endothermic change (Le Chatelier principle).",
          "So less of it stays dissolved at a higher temperature.",
        ],
        answer: "Its solubility decreases as the temperature rises",
      },
      practiceSet: [
        { prompt: "Define a saturated solution.", answer: "A solution that holds the maximum amount of solute in a given amount of solvent at a given temperature" },
        { prompt: "Why does naphthalene dissolve in benzene but not in water?", answer: "Both naphthalene and benzene are nonpolar (like dissolves like); water is polar" },
        { prompt: "Why does a tiny crystal added to a supersaturated solution make solid appear?", answer: "The solution holds more than the equilibrium amount, so the extra solute precipitates and the solution becomes saturated" },
        { prompt: "Pressure has no effect on the solubility of which kinds of solutes, and why?", answer: "Solids and liquids, because they are incompressible" },
      ],
      pyqExampleId: "628af309-7fa2-48c7-aa77-3e7ad4616f30",
      traps: [
        {
          title: "Naming the solvent's state first",
          body: "Iodine in air is a solid in gas solution, not a gas in solid one. Always name the state of the solute first, then of the solvent.",
        },
        {
          title: "Linking solubility simply to the heat of solution",
          body: "The textbook warns there is no direct correlation: CaCl₂ dissolves exothermically and NH₄NO₃ endothermically, yet both become more soluble as temperature rises. Quote this when asked for the effect of temperature.",
        },
        {
          title: "Treating gases like solids",
          body: "Most solids become more soluble in hot water, but gases become less soluble, because dissolving a gas is an exothermic condensation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-henry",
      name: "Henry's law",
      intuition:
        "Push harder on a gas sitting above a liquid and more of its molecules are driven into the liquid. Double the pressure and you double the amount that dissolves. That is why a soft drink bottle is sealed under pressure, and why it fizzes the moment the cap comes off.",
      definition:
        "- **Statement:** the solubility of a gas in a liquid is directly proportional to the pressure of the gas over the solution: \\(S \\propto P\\), or \\(S = K_HP\\).\n" +
        "- \\(S\\) is the solubility of the gas in mol L⁻¹, \\(P\\) the pressure of the gas in bar over the solution, \\(K_H\\) the Henry's law constant.\n" +
        "- Unit of \\(K_H\\): \\(K_H = S/P\\), so mol L⁻¹ bar⁻¹. When \\(P = 1\\) bar, \\(K_H = S\\): the Henry's law constant is the solubility of the gas when its pressure over the solution is 1 bar.\n" +
        "- **Demonstration:** a soft drink is bottled under a high partial pressure of CO₂, so more CO₂ dissolves than usual. On opening, the excess dissolved CO₂ comes out with effervescence.\n" +
        "- **Exceptions:** NH₃ and CO₂ react with water (\\(\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-\\), \\(\\text{CO}_2 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_2\\text{CO}_3\\)), so their solubilities are higher than Henry's law predicts.\n" +
        "- A pressure in mm Hg is converted first: \\(P\\ (\\text{atm}) = P\\ (\\text{mm Hg})/760\\), and 1 atm = 1.013 bar.",
      formula: {
        label: "Henry's law",
        latex: "S = K_HP, \\qquad K_H = \\frac{S}{P}\\ \\ (\\text{mol L}^{-1}\\ \\text{bar}^{-1})",
      },
      authoredExample: {
        prompt:
          "The Henry's law constant of oxygen in water at a certain temperature is \\(1.3 \\times 10^{-3}\\) mol L⁻¹ bar⁻¹. Find the solubility of oxygen in water at that temperature when its partial pressure over the water is 0.21 bar.",
        steps: [
          "Given: \\(K_H = 1.3 \\times 10^{-3}\\ \\text{mol L}^{-1}\\ \\text{bar}^{-1}\\), \\(P = 0.21\\ \\text{bar}\\).",
          "Formula: \\(S = K_HP\\).",
          "Substitution: \\(S = 1.3 \\times 10^{-3}\\ \\text{mol L}^{-1}\\ \\text{bar}^{-1} \\times 0.21\\ \\text{bar}\\).",
          "\\(S = 2.73 \\times 10^{-4}\\ \\text{mol L}^{-1}\\).",
        ],
        answer: "Solubility of oxygen = 2.73 × 10⁻⁴ mol L⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A gas has a solubility of \\(4.0 \\times 10^{-3}\\) mol L⁻¹ in water when its pressure is 2.0 bar. Find its Henry's law constant, and its solubility at 0.5 bar at the same temperature.",
        steps: [
          "\\(K_H = \\dfrac{S}{P} = \\dfrac{4.0 \\times 10^{-3}}{2.0} = 2.0 \\times 10^{-3}\\ \\text{mol L}^{-1}\\ \\text{bar}^{-1}\\).",
          "At 0.5 bar: \\(S = 2.0 \\times 10^{-3} \\times 0.5 = 1.0 \\times 10^{-3}\\ \\text{mol L}^{-1}\\).",
        ],
        answer: "K_H = 2.0 × 10⁻³ mol L⁻¹ bar⁻¹; solubility 1.0 × 10⁻³ mol L⁻¹",
      },
      practiceSet: [
        { prompt: "What is the unit of the Henry's law constant?", answer: "mol L⁻¹ bar⁻¹" },
        { prompt: "Name two gases that do not obey Henry's law, and give the reason.", answer: "NH₃ and CO₂, because they react with water" },
        { prompt: "Convert a gas pressure of 380 mm Hg into bar.", answer: "\\(380/760 = 0.5\\) atm \\(= 0.5 \\times 1.013 = 0.507\\) bar" },
        { prompt: "What does the Henry's law constant equal when the pressure of the gas is 1 bar?", answer: "The solubility of the gas" },
      ],
      pyqExampleId: "253b7935-524b-484e-99ad-f54f6b21e694",
      traps: [
        {
          title: "Leaving the pressure in mm Hg",
          body: "When \\(K_H\\) is per bar, the pressure must be in bar. Divide mm Hg by 760 to get atm, then multiply by 1.013 to get bar, before using \\(S = K_HP\\).",
        },
        {
          title: "Dividing instead of multiplying",
          body: "Solubility is \\(K_H \\times P\\). Check the units: mol L⁻¹ bar⁻¹ times bar leaves mol L⁻¹, a concentration. Any other unit means the formula was turned upside down.",
        },
        {
          title: "Half a statement",
          body: "Say what is proportional to what: the solubility of the gas in the liquid is directly proportional to the pressure of the gas over the solution. Then write \\(S = K_HP\\) and name each symbol.",
        },
      ],
    },
  ],
};
