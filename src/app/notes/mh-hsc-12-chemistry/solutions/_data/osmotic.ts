import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SO_OSMOTIC_NOTE: SubtopicNote = {
  subtopicName: "Osmotic Pressure",
  title: "Osmosis and Osmotic Pressure",
  oneLineDefinition:
    "How solvent flows through a semipermeable membrane, the osmotic pressure that stops it, the equation π = MRT, isotonic solutions, reverse osmosis and the molar mass of a solute from osmotic pressure.",
  whyItMatters:
    "24 questions, the most of any page in this chapter. Twelve were set in board papers: define osmosis (2023), osmotic pressure (2020, 2024 and 2025) and isotonic solutions (2022 and 2026); the concentration unit used for osmotic pressure (2022); the condition for reverse osmosis (2024); derive or explain the molar mass expression (2022 and 2024); find a molar mass from an osmotic pressure (2017); the osmotic pressure of a sucrose solution (2026); and derive van't Hoff's general solution equation (2019). The textbook adds glucose isotonic with blood, hypertonic solutions, which colligative property is best for finding molar mass, and a molar mass found from both osmotic pressure and freezing point.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccso-osmosis",
      name: "Osmosis, osmotic pressure and reverse osmosis",
      intuition:
        "A semipermeable membrane is like a sieve that lets the small solvent molecules through but holds back the solute. Solvent crosses both ways, but more crosses into the solution, so the solution side fills up. Push back on the solution hard enough and the flow stops; push harder still and it runs backwards.",
      definition:
        "- **Semipermeable membrane:** a film such as cellophane, with pores large enough for solvent molecules but too small for large solute molecules or ions to pass.\n" +
        "- **Osmosis:** the net spontaneous flow of solvent molecules through a semipermeable membrane into the solution, or from a more dilute solution into a more concentrated one.\n" +
        "- Solvent passes through the membrane in **both** directions, since solvent is on both sides; but the rate into the solution is greater, because the vapour pressure of the solvent is greater than that of the solution.\n" +
        "- **Osmotic pressure (π):** the hydrostatic pressure that stops osmosis. In the thistle tube set-up (Fig. 2.9) the liquid in the tube rises until solvent leaves and enters the solution at the same rate; this hydrostatic pressure is \\(h\\rho g\\).\n" +
        "- Osmotic pressure is **not** a pressure produced by the solution: it exists only when the solution is separated from the solvent by a suitable semipermeable membrane.\n" +
        "- **Reverse osmosis:** applying to the solution a pressure larger than its osmotic pressure reverses the flow, and pure solvent passes from the solution into the pure solvent (Fig. 2.10: fresh water from salt water).",
      table: {
        columns: ["Term", "What happens", "Condition or key words"],
        rows: [
          { cells: ["Osmosis", "Net flow of solvent through a semipermeable membrane into the solution", "Membrane between solvent and solution, or between a dilute and a concentrated solution"] },
          {
            cells: ["Osmotic pressure", "The hydrostatic pressure that stops osmosis", "Equal to \\(h\\rho g\\) in the thistle tube; exists only across a semipermeable membrane"],
            pyqExampleId: "6520aaf8-6b07-4381-968c-1b57cae02ce0",
            noteAmber: "Board 2020, 2024 and 2025 asked for this definition.",
          },
          { cells: ["Equilibrium in Fig. 2.9", "Solvent enters and leaves the solution at the same rate; the liquid column stops rising", "Hydrostatic pressure has stopped osmosis"] },
          {
            cells: ["Reverse osmosis", "Pure solvent flows out of the solution, through the membrane, into the solvent", "Pressure applied to the solution greater than its osmotic pressure"],
            pyqExampleId: "351288e5-5edb-4bb7-a9f6-f71039c7e7eb",
            noteAmber: "Board 2024 asked for the condition of reverse osmosis.",
          },
        ],
      },
      practiceSet: [
        { prompt: "A solvent and a solution are separated by a semipermeable membrane. Does solvent pass through in one direction only?", answer: "No. It passes both ways, but faster into the solution, so the net flow is into the solution" },
        { prompt: "Name a material that acts as a semipermeable membrane.", answer: "Cellophane" },
        { prompt: "In which direction does the solvent flow during reverse osmosis?", answer: "From the solution, through the membrane, into the pure solvent" },
      ],
      pyqExampleId: "6503d90d-d360-4a9a-b848-157b6794bd43",
      traps: [
        {
          title: "Osmosis as a flow of solute",
          body: "The membrane holds the solute back. Osmosis is a flow of solvent, into the solution or from the dilute solution into the concentrated one.",
        },
        {
          title: "Osmotic pressure as a pressure the solution exerts",
          body: "A solution in a beaker has no osmotic pressure acting anywhere. It appears only across a semipermeable membrane with solvent on the other side; say so in a definition.",
        },
        {
          title: "Equal is not enough for reverse osmosis",
          body: "A pressure equal to the osmotic pressure only stops osmosis. Reverse osmosis needs a pressure greater than the osmotic pressure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-vant-hoff-equation",
      name: "Osmotic pressure and concentration: π = MRT",
      intuition:
        "Osmotic pressure follows the same pattern as the pressure of a gas: more moles of solute in a given volume, or a higher temperature, gives a larger pressure. That is why the equation looks just like the ideal gas equation.",
      definition:
        "- For very dilute solutions \\(\\pi = \\dfrac{n_2RT}{V}\\), where \\(V\\) is the volume of solution in dm³ containing \\(n_2\\) moles of nonvolatile solute, \\(R = 0.08206\\) dm³ atm K⁻¹ mol⁻¹ and \\(\\pi\\) is in atm.\n" +
        "- \\(n_2/V\\) is the molarity \\(M\\), so \\(\\pi = MRT\\).\n" +
        "- **Why molarity, not molality:** osmotic pressure is measured at one specific constant temperature, so a temperature-independent unit like molality is not needed.\n" +
        "- If \\(R\\) is given in J K⁻¹ mol⁻¹, take \\(\\pi\\) in Pa and \\(V\\) in m³.\n" +
        "- **Older papers:** Board 2019 asked to derive van't Hoff's general solution equation \\(\\pi V = nRT\\) by combining \\(\\pi \\propto 1/V\\) at constant temperature (van't Hoff-Boyle law) and \\(\\pi \\propto T\\) at constant concentration (van't Hoff-Charles law). Board 2020 asked for van't Hoff-Avogadro's law: equal volumes of solutions with the same osmotic pressure at the same temperature contain the same number of moles of solute. The present textbook does not teach these laws, so give them less time.",
      formula: {
        label: "Osmotic pressure",
        latex: "\\pi = \\frac{n_2RT}{V} = MRT",
      },
      authoredExample: {
        prompt:
          "Calculate the osmotic pressure at 300 K of a solution containing 0.050 mol of a nonvolatile nonelectrolyte in 500 mL of solution. \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹.",
        steps: [
          "Given: \\(n_2 = 0.050\\) mol, \\(V = 500\\) mL \\(= 0.500\\) dm³, \\(T = 300\\) K, \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹.",
          "Formula: \\(\\pi = \\dfrac{n_2RT}{V}\\).",
          "Substitution: \\(\\pi = \\dfrac{0.050\\ \\text{mol} \\times 0.0821\\ \\text{dm}^3\\ \\text{atm K}^{-1}\\ \\text{mol}^{-1} \\times 300\\ \\text{K}}{0.500\\ \\text{dm}^3}\\).",
          "\\(\\pi = 2.46\\) atm.",
        ],
        answer: "Osmotic pressure = 2.46 atm",
      },
      selfCheckExample: {
        prompt: "Find the osmotic pressure at 310 K of a 0.15 M glucose solution. \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹.",
        steps: ["\\(\\pi = MRT = 0.15 \\times 0.0821 \\times 310\\).", "\\(\\pi = 3.82\\) atm."],
        answer: "3.82 atm",
      },
      practiceSet: [
        { prompt: "An osmotic pressure is measured as 152 mm Hg. Express it in atm.", answer: "\\(152/760 = 0.20\\) atm" },
        { prompt: "Write 250 mL in dm³.", answer: "0.250 dm³" },
        { prompt: "What is the value of R in dm³ atm K⁻¹ mol⁻¹ used in the textbook?", answer: "0.08206" },
      ],
      pyqExampleId: "0a7e7123-d187-4839-b8e6-bec0c2b1f413",
      traps: [
        {
          title: "Volume left in mL",
          body: "With \\(R\\) in dm³ atm K⁻¹ mol⁻¹, the volume must be in dm³. 300 mL is 0.300 dm³; putting in 300 makes \\(\\pi\\) a thousand times too small.",
        },
        {
          title: "Units of R that do not match",
          body: "With \\(R = 8.314\\) J K⁻¹ mol⁻¹, \\(\\pi\\) must be in Pa and \\(V\\) in m³. With \\(R = 0.0821\\), use atm and dm³. Never mix the two sets.",
        },
        {
          title: "Temperature in °C",
          body: "\\(T\\) in \\(\\pi = MRT\\) is in kelvin. Add 273 to a Celsius temperature first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccso-isotonic",
      name: "Isotonic, hypertonic and hypotonic solutions",
      intuition:
        "Two solutions with the same osmotic pressure are evenly matched: put a membrane between them and nothing flows either way. If one has the higher osmotic pressure, solvent flows into it from the other.",
      definition:
        "- **Isotonic solutions:** two or more solutions having the same osmotic pressure. For example 0.1 M urea and 0.1 M sucrose: the same molar concentration, but different concentrations in g/L. Separated by a semipermeable membrane, there is no flow of solvent in either direction.\n" +
        "- **Hypertonic solution:** of two solutions with unequal osmotic pressures, the more concentrated one, with the higher osmotic pressure.\n" +
        "- **Hypotonic solution:** the more dilute one, with the lower osmotic pressure.\n" +
        "- For nonelectrolytes at the same temperature, equal molarity means equal osmotic pressure, since \\(\\pi = MRT\\).",
      table: {
        columns: ["Solution", "Osmotic pressure compared with the other", "Example"],
        rows: [
          {
            cells: ["Isotonic", "Equal", "0.1 M urea and 0.1 M sucrose"],
            pyqExampleId: "21f0ce0d-916d-4f42-9b9a-91dbf66f233e",
            noteAmber: "Board 2022 and 2026 asked you to define an isotonic solution.",
          },
          { cells: ["Hypertonic", "Higher", "0.2 M urea, compared with 0.1 M sucrose"] },
          { cells: ["Hypotonic", "Lower", "0.1 M sucrose, compared with 0.2 M urea"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A glucose solution is to be isotonic with a solution whose osmotic pressure is 4.92 atm at 300 K. What molarity of glucose is needed? \\(R = 0.082\\) dm³ atm K⁻¹ mol⁻¹.",
        steps: ["Isotonic means the same osmotic pressure: \\(M = \\dfrac{\\pi}{RT} = \\dfrac{4.92}{0.082 \\times 300}\\).", "\\(M = 0.20\\) M."],
        answer: "0.20 M glucose",
      },
      practiceSet: [
        { prompt: "Are 0.05 M glucose and 0.05 M urea solutions isotonic at the same temperature?", answer: "Yes. Both are nonelectrolytes at the same molarity" },
        { prompt: "Which is hypertonic: 0.2 M sucrose or 0.1 M glucose?", answer: "0.2 M sucrose, the one with the higher osmotic pressure" },
        { prompt: "Do isotonic solutions of urea and sucrose have the same concentration in g/L?", answer: "No. Only their molar concentrations are equal" },
      ],
      pyqExampleId: "22a781bd-c5d8-4986-9b7d-9869fca89e7e",
      traps: [
        {
          title: "Isotonic means equal mass per litre",
          body: "Isotonic solutions have equal osmotic pressure. Urea and sucrose solutions of equal molarity are isotonic even though the sucrose solution holds far more grams per litre.",
        },
        {
          title: "Swapping hyper and hypo",
          body: "Hyper means more: the hypertonic solution has the higher osmotic pressure. Hypo means less: the hypotonic one has the lower.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccso-osmotic-molar-mass",
      name: "Molar mass from osmotic pressure",
      intuition:
        "Measure the osmotic pressure of a solution made from a weighed mass of solute, and \\(\\pi = n_2RT/V\\) tells you how many moles that mass was. Because osmotic pressure is large even for a very dilute solution, a tiny amount of solute is enough.",
      definition:
        "- **Step 1:** \\(\\pi = \\dfrac{n_2RT}{V}\\).\n" +
        "- **Step 2:** if the mass of solute in \\(V\\) litres of solution is \\(W_2\\) and its molar mass is \\(M_2\\), then \\(n_2 = W_2/M_2\\).\n" +
        "- **Step 3:** \\(\\pi = \\dfrac{W_2RT}{M_2V}\\).\n" +
        "- **Step 4:** \\(M_2 = \\dfrac{W_2RT}{\\pi V}\\).\n" +
        "- **Why it is preferred:** osmotic pressure is much larger, and so more precisely measurable, than the other colligative properties. It is used to find the molar masses of very expensive substances and of substances that can be prepared only in small quantities.",
      formula: {
        label: "Molar mass from osmotic pressure",
        latex: "M_2 = \\frac{W_2RT}{\\pi V}",
      },
      authoredExample: {
        prompt:
          "3.0 g of a nonvolatile solute is dissolved to make 500 mL of solution. Its osmotic pressure at 300 K is 0.82 atm. Calculate the molar mass of the solute. \\(R = 0.082\\) dm³ atm K⁻¹ mol⁻¹.",
        steps: [
          "Given: \\(W_2 = 3.0\\) g, \\(V = 500\\) mL \\(= 0.500\\) dm³, \\(\\pi = 0.82\\) atm, \\(T = 300\\) K, \\(R = 0.082\\) dm³ atm K⁻¹ mol⁻¹.",
          "Formula: \\(M_2 = \\dfrac{W_2RT}{\\pi V}\\).",
          "Substitution: \\(M_2 = \\dfrac{3.0\\ \\text{g} \\times 0.082\\ \\text{dm}^3\\ \\text{atm K}^{-1}\\ \\text{mol}^{-1} \\times 300\\ \\text{K}}{0.82\\ \\text{atm} \\times 0.500\\ \\text{dm}^3} = \\dfrac{73.8}{0.41}\\) g mol⁻¹.",
          "\\(M_2 = 180\\) g mol⁻¹.",
        ],
        answer: "Molar mass of the solute = 180 g mol⁻¹",
      },
      selfCheckExample: {
        prompt:
          "0.50 g of a substance is dissolved to make 100 mL of solution, which has an osmotic pressure of 0.0821 atm at 300 K. Find its molar mass. \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹.",
        steps: [
          "\\(M_2 = \\dfrac{0.50 \\times 0.0821 \\times 300}{0.0821 \\times 0.100}\\).",
          "\\(M_2 = \\dfrac{0.50 \\times 300}{0.100} = 1500\\) g mol⁻¹.",
        ],
        answer: "1500 g mol⁻¹",
      },
      practiceSet: [
        { prompt: "Why is the osmotic pressure method used for very expensive substances?", answer: "Osmotic pressure is large and precisely measurable, so only a small amount of substance is needed" },
        { prompt: "In \\(M_2 = W_2RT/(\\pi V)\\) with \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹, in what units must \\(\\pi\\) and \\(V\\) be?", answer: "\\(\\pi\\) in atm and \\(V\\) in dm³" },
        { prompt: "1.0 g of a solute in 1.0 dm³ of solution gives an osmotic pressure of 0.0246 atm at 300 K. Find its molar mass (\\(R = 0.082\\) dm³ atm K⁻¹ mol⁻¹).", answer: "\\(M_2 = \\dfrac{1.0 \\times 0.082 \\times 300}{0.0246 \\times 1.0} = 1000\\) g mol⁻¹" },
      ],
      pyqExampleId: "db3b5522-a978-43a6-9499-d7d4bc4e4d26",
      traps: [
        {
          title: "An osmotic pressure left in mm Hg",
          body: "Divide mm Hg by 760 to get atm before using \\(R = 0.0821\\) dm³ atm K⁻¹ mol⁻¹.",
        },
        {
          title: "Molality slipped into the osmotic formula",
          body: "This formula is built on the volume of solution, \\(V\\), not on the mass of solvent. Do not use the \\(1000\\,W_2/(M_2W_1)\\) form here.",
        },
      ],
    },
  ],
};
