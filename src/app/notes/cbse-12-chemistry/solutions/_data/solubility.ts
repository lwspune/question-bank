import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_SO_SOLUBILITY_NOTE: SubtopicNote = {
  subtopicName: "Solubility",
  title: "Solubility of Solids and Gases: Henry's Law",
  oneLineDefinition:
    "What decides how much of a solid or a gas dissolves in a liquid, Henry's law (p = KH × x) for gases and its numericals, and why temperature and pressure explain soda water, bends, anoxia and fish in cold water.",
  whyItMatters:
    "27 questions. Fifteen were set in board papers from 2023 to 2026 (none in 2024): state Henry's law (2023, 2025, 2026) and give an application (2023), explain why aquatic animals are more comfortable in cold water (2023, and twice in 2025), say how gas solubility and Henry's constant change with temperature (2023, 2025), explain low oxygen in the blood at high altitude (2023), pick the conditions in which ammonium chloride dissolves fastest (2023), find the moles of CO₂ in soda water (2025, in two sets with different numbers), comment that Raoult's law is a special case of Henry's law (2025), explain bends and anoxia (2026), and find the mole fraction of CO₂ under 760 mm Hg (2026). The NCERT examples and exercises add like-dissolves-like questions and Henry's law numericals.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcso-solid-solubility",
      name: "Solubility of a solid in a liquid",
      intuition:
        "A solute dissolves when the new attractions it forms with the solvent are like the ones it gives up, so polar dissolves in polar and non-polar in non-polar. Dissolving and crystallising go on together until they balance: that is a saturated solution. Heat helps a dissolution that absorbs heat and hinders one that gives heat out, as Le Chatelier's principle says.",
      definition:
        "- **Solubility:** the maximum amount of a substance that can be dissolved in a specified amount of solvent at a specified temperature.\n" +
        "- **Like dissolves like:** sodium chloride and sugar dissolve in water but not in benzene; naphthalene and anthracene dissolve in benzene but not in water.\n" +
        "- **Saturated solution:** one in dynamic equilibrium with undissolved solute, where dissolution and crystallisation go on at the same rate. No more solute dissolves at that temperature and pressure.\n" +
        "- **Temperature:** if dissolution is endothermic (ΔsolH > 0) solubility rises with temperature; if exothermic (ΔsolH < 0) it falls.\n" +
        "- **Pressure:** no significant effect, because solids and liquids are almost incompressible.",
      table: {
        columns: ["Factor", "Effect on a solid dissolving in a liquid", "Reason"],
        rows: [
          { cells: ["Nature of solute and solvent", "Polar solutes dissolve in polar solvents, non-polar in non-polar", "Dissolution happens when solute-solvent attractions are like those broken"] },
          { cells: ["Temperature, endothermic dissolution", "Solubility increases on heating", "Le Chatelier: heat drives a heat-absorbing change forward"] },
          { cells: ["Temperature, exothermic dissolution", "Solubility decreases on heating", "Le Chatelier: heat drives a heat-releasing change back"] },
          { cells: ["Pressure", "No significant effect", "Solids and liquids are highly incompressible"] },
          {
            cells: ["Powder or crystals", "A powder dissolves faster", "More surface is in contact with the solvent"],
            noteAmber: "Board 2023 asked when ammonium chloride, which cools the water as it dissolves, dissolves fastest: powdered salt in hot water.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Potassium nitrate absorbs heat when it dissolves in water. Does its solubility increase or decrease when the water is warmed? Give the reason.",
        steps: ["Dissolution absorbs heat, so ΔsolH > 0.", "By Le Chatelier's principle, raising the temperature favours the heat-absorbing change, so more dissolves."],
        answer: "It increases, because the dissolution is endothermic",
      },
      practiceSet: [
        { prompt: "Why is naphthalene soluble in benzene but not in water?", answer: "Naphthalene and benzene are both non-polar, so their attractions are alike (like dissolves like); water is polar" },
        { prompt: "Why does pressure have almost no effect on the solubility of a solid in a liquid?", answer: "Solids and liquids are almost incompressible, so a change of pressure hardly changes them" },
        { prompt: "What two processes are going on at the same rate in a saturated solution?", answer: "Dissolution and crystallisation" },
      ],
      pyqExampleId: "58e53e5b-4836-42bc-86c5-2a4967dd9e00",
      traps: [
        {
          title: "Mixing up how fast and how much",
          body: "Powdering a solid makes it dissolve faster but does not change how much can dissolve. Temperature changes both. Read whether the question asks about rate or about solubility.",
        },
        {
          title: "Saying pressure raises the solubility of solids",
          body: "Pressure matters for gases, not for solids in liquids. Writing that more salt dissolves under pressure loses the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcso-henry",
      name: "Henry's law and its numericals",
      intuition:
        "Squeeze more gas into the space above a liquid and more molecules strike the surface and enter it, so more gas dissolves. Henry's law makes this exact: the partial pressure of the gas is proportional to its mole fraction in the solution. The constant KH is large for a gas that dissolves poorly, because a large pressure is then needed to dissolve even a little.",
      definition:
        "- **Henry's law:** at a constant temperature, the solubility of a gas in a liquid is directly proportional to the partial pressure of the gas above the liquid. In the commonly used form, the partial pressure of the gas in the vapour phase is proportional to its mole fraction in the solution: \\(p = K_H\\,x\\).\n" +
        "- \\(K_H\\) depends on the nature of the gas, the solvent and the temperature. Since x has no unit, \\(K_H\\) has the unit of pressure (bar, kbar, Pa, mm Hg).\n" +
        "- The higher the value of \\(K_H\\) at a given pressure, the LOWER the solubility of the gas.\n" +
        "- **Numerical route:** \\(x = p/K_H\\), with p and \\(K_H\\) in the same unit. For a dilute solution \\(x \\approx n_{\\text{gas}}/n_{\\text{water}}\\), and 1 L of water is about 55.5 mol.\n" +
        "- **Raoult's law is a special case of Henry's law:** both say the partial pressure of a component is proportional to its mole fraction; in Raoult's law the constant is \\(p^{\\circ}\\), so Raoult's law is Henry's law with \\(K_H = p^{\\circ}\\).",
      formula: {
        label: "Henry's law",
        latex: "p = K_H\\,x, \\qquad x = \\frac{n_{\\text{gas}}}{n_{\\text{gas}} + n_{\\text{solvent}}} \\approx \\frac{n_{\\text{gas}}}{n_{\\text{solvent}}}",
        symbols: [
          { symbol: "\\(p\\)", meaning: "partial pressure of the gas above the solution" },
          { symbol: "\\(x\\)", meaning: "mole fraction of the gas in the solution" },
          { symbol: "\\(K_H\\)", meaning: "Henry's law constant, in a pressure unit" },
        ],
      },
      authoredExample: {
        prompt: "Oxygen exerts a partial pressure of 0.20 bar over water at 293 K. Henry's law constant for oxygen in water at 293 K is 34.86 kbar. How many millimoles of oxygen dissolve in 1 litre of water?",
        steps: [
          "Given: \\(p = 0.20\\) bar, \\(K_H = 34.86\\) kbar = 34 860 bar.",
          "Formula: \\(x = \\dfrac{p}{K_H} = \\dfrac{0.20}{34\\,860} = 5.74 \\times 10^{-6}\\).",
          "1 L of water is about 55.5 mol. The solution is very dilute, so \\(x = \\dfrac{n}{55.5}\\).",
          "\\(n = 5.74 \\times 10^{-6} \\times 55.5 = 3.18 \\times 10^{-4}\\) mol.",
          "In millimoles: \\(3.18 \\times 10^{-4} \\times 1000 = 0.318\\) mmol.",
        ],
        answer: "0.318 mmol of oxygen per litre",
      },
      selfCheckExample: {
        prompt: "A gas has a mole fraction of 2.0 × 10⁻⁵ in water when its partial pressure above the water is 0.80 bar. Calculate Henry's law constant.",
        steps: ["\\(K_H = \\dfrac{p}{x} = \\dfrac{0.80}{2.0 \\times 10^{-5}}\\).", "\\(K_H = 4.0 \\times 10^{4}\\) bar = 40 kbar."],
        answer: "4.0 × 10⁴ bar (40 kbar)",
      },
      practiceSet: [
        { prompt: "At a fixed temperature the partial pressure of a gas over water is doubled. What happens to its mole fraction in the water?", answer: "It doubles, since \\(x = p/K_H\\)" },
        { prompt: "Gas P has a larger value of \\(K_H\\) than gas Q in water at the same temperature. Which is more soluble?", answer: "Q, because a larger \\(K_H\\) means a lower solubility" },
        { prompt: "Why does \\(K_H\\) carry the unit of pressure?", answer: "In \\(p = K_H x\\) the mole fraction has no unit, so \\(K_H\\) must have the same unit as p" },
      ],
      pyqExampleId: "60bcca58-3a6f-4e64-b9d5-8350e4e19f2b",
      traps: [
        {
          title: "Mixing pressure units",
          body: "p and \\(K_H\\) must be in the same unit before you divide. Convert atm to Pa (1 atm = 1.013 × 10⁵ Pa) or kbar to bar first.",
        },
        {
          title: "Thinking a large Henry's constant means a soluble gas",
          body: "It is the other way round: \\(x = p/K_H\\), so the larger \\(K_H\\), the less gas dissolves. The board asked this as a one-mark question in 2025.",
        },
        {
          title: "Stopping at the mole fraction",
          body: "When the question asks for moles or grams of gas, multiply the mole fraction by the moles of water (mass of water / 18), then by the molar mass if grams are wanted.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcso-gas-temperature",
      name: "Temperature, pressure and gases in everyday life",
      intuition:
        "Dissolving a gas is like condensing it: heat is given out. So warming a solution pushes the gas back out, and a warm drink goes flat. The same law in reverse explains why a diver who comes up fast gets bubbles in the blood, and why climbers on high mountains get too little oxygen.",
      definition:
        "- **Effect of temperature:** dissolution of a gas is exothermic, so by Le Chatelier's principle the solubility of a gas DECREASES as the temperature rises.\n" +
        "- So \\(K_H\\) INCREASES with temperature (for oxygen in water: 34.86 kbar at 293 K, 46.82 kbar at 303 K).\n" +
        "- **Effect of pressure:** the solubility of a gas increases with the partial pressure of that gas (Henry's law).\n" +
        "- Each case in the table is explained by naming the law and the direction of the change.",
      table: {
        columns: ["Case", "What happens", "Explanation"],
        rows: [
          {
            cells: ["Aquatic species and warm water", "They are more comfortable in cold water", "Oxygen is more soluble in cold water; solubility of a gas falls as temperature rises"],
            noteAmber: "Board 2023 and 2025 asked this, once as an assertion-reason item with both true and the reason correct.",
            pyqExampleId: "e6516de3-f2d8-45df-99a8-dcba30033398",
          },
          { cells: ["Soft drinks and soda water", "Bottles are sealed under high pressure", "A high pressure of CO₂ increases its solubility"] },
          { cells: ["Bends in scuba divers", "Painful, dangerous blocking of capillaries", "At depth more nitrogen dissolves in blood; on rising, the pressure falls and nitrogen forms bubbles in the blood"] },
          { cells: ["Air in scuba tanks", "Diluted with helium (11.7% helium, 56.2% nitrogen, 32.1% oxygen)", "Avoids bends and the toxic effects of high nitrogen in the blood"] },
          {
            cells: ["Anoxia at high altitude", "Climbers become weak and unable to think clearly", "The partial pressure of oxygen is lower, so less oxygen dissolves in blood and tissues"],
            noteAmber: "Board 2023 asked the cause as an MCQ: low atmospheric pressure, not low temperature.",
            pyqExampleId: "d3b5ec2e-3902-4ab1-9878-3a45d91d0621",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Why does a bottle of soda water fizz as soon as its cap is opened?",
        steps: ["The bottle was sealed under a high pressure of CO₂.", "Opening it lowers the pressure above the liquid, so by Henry's law less CO₂ can stay dissolved and the extra escapes as bubbles."],
        answer: "The pressure falls, so the solubility of CO₂ falls and the excess gas bubbles out",
      },
      practiceSet: [
        { prompt: "How does Henry's law constant for oxygen in water change from 293 K to 303 K?", answer: "It increases (from 34.86 to 46.82 kbar), showing that oxygen is less soluble in warmer water" },
        { prompt: "Why are scuba diving tanks filled with air diluted with helium?", answer: "To avoid bends and the toxic effects of a high concentration of nitrogen in the blood" },
        { prompt: "Name the condition caused by low oxygen in the blood of people living at high altitude.", answer: "Anoxia" },
      ],
      pyqExampleId: "561e8061-cb7a-43cb-866a-1a107557355c",
      traps: [
        {
          title: "Saying Henry's constant falls as temperature rises",
          body: "Solubility of a gas falls with temperature, so \\(K_H\\) RISES. In the 2025 assertion-reason item the assertion that \\(K_H\\) decreases with temperature was false while the reason was true.",
        },
        {
          title: "Blaming the cold for anoxia",
          body: "Anoxia is caused by the low partial pressure of oxygen at high altitude, not by low temperature. Name Henry's law and the low partial pressure.",
        },
        {
          title: "Explaining bends without the pressure change",
          body: "Say both halves: more nitrogen dissolves at the high pressure under water, and it comes out as bubbles when the pressure falls on the way up. One half alone is not a full answer.",
        },
      ],
    },
  ],
};
