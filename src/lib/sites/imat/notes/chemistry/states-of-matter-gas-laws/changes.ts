import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_GAS_CHANGES_NOTE: SubtopicNote = {
  subtopicName: "Changes of State",
  title: "Changes of State, Boiling and Phase Diagrams",
  oneLineDefinition:
    "A change of state happens at constant temperature while energy breaks or makes the attractions between particles; boiling happens when the vapour pressure reaches the outside pressure, and dissolved solutes move the freezing and boiling points.",
  whyItMatters:
    "The 2013 paper asked for the correct names of the changes of state. The 2019 and 2021 papers asked why a solute makes ice melt below 0 °C, and how the outside pressure changes the boiling point of water.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gas-phase-names",
      name: "The six changes of state and their energy",
      intuition:
        "To turn a solid into a liquid, or a liquid into a gas, the particles must be pulled further apart against their attractions, and that takes energy. Going the other way, the attractions pull the particles together and energy is given out. While the change is happening the energy goes into the attractions, so the temperature stays the same.",
      definition:
        "- Changes that **absorb** energy (endothermic): **melting** (fusion), **evaporation** or **boiling** (vaporisation), **sublimation**.\n" +
        "- Changes that **release** energy (exothermic): **freezing** (solidification), **condensation**, **deposition**.\n" +
        "- **Sublimation** goes straight from solid to gas (iodine, dry ice). **Deposition** goes straight from gas to solid (frost on a cold window).\n" +
        "- During a change of state of a pure substance at constant pressure, the **temperature stays constant**. The energy, called **latent heat**, changes the potential energy of the particles, not their kinetic energy.",
      table: {
        columns: ["Change", "Name", "Energy"],
        rows: [
          { cells: ["Solid to liquid", "Melting (fusion)", "Absorbed"] },
          { cells: ["Liquid to solid", "Freezing (solidification)", "Released"] },
          { cells: ["Liquid to gas", "Evaporation or boiling (vaporisation)", "Absorbed"] },
          { cells: ["Gas to liquid", "Condensation", "Released"] },
          { cells: ["Solid to gas", "Sublimation", "Absorbed"] },
          { cells: ["Gas to solid", "Deposition", "Released"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "On a cold night, frost forms directly on a window from the water vapour in the air, without passing through liquid water. What is this change called, and is energy absorbed or released by the water?",
        options: [
          "Deposition; energy is released",
          "Sublimation; energy is absorbed",
          "Condensation; energy is absorbed",
          "Freezing; energy is released",
          "Deposition; energy is absorbed",
        ],
        steps: [
          "Gas going straight to solid is deposition.",
          "The molecules are pulled together into a solid, so energy is released, as in condensation and freezing.",
          "B is the reverse change. C and D name changes that involve liquid water, which does not appear here. E has the energy backwards.",
        ],
        answer: "(A) Deposition; energy is released",
      },
      practiceSet: [
        { prompt: "Iodine crystals warmed gently give a violet vapour with no liquid. Name the change.", answer: "Sublimation" },
        { prompt: "Is energy absorbed or released when steam condenses on your skin?", answer: "Released, which is why steam burns are so severe", method: "Condensation is exothermic" },
        { prompt: "What happens to the temperature of pure ice at 1 atm while it is melting?", answer: "It stays at 0 °C until all the ice has melted", method: "The energy goes into breaking attractions" },
      ],
      traps: [
        {
          title: "Freezing means liquid to solid",
          body: "Freezing is the change from liquid to solid. A gas turning directly into a solid is deposition, and a solid turning directly into a gas is sublimation. Options that call gas to solid freezing are wrong.",
        },
        {
          title: "The temperature does not rise during melting or boiling",
          body: "While a pure substance melts or boils, the heat supplied breaks attractions between particles and the temperature stays constant. Only when the change is complete does the temperature start rising again.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gas-boiling",
      name: "Vapour pressure, evaporation and the boiling point",
      intuition:
        "At the surface of a liquid, the fastest molecules escape into the air, and in a closed container they build up a pressure of vapour. The hotter the liquid, the more molecules escape and the higher this vapour pressure. When it becomes as large as the pressure pushing down on the liquid, bubbles of vapour can form inside the liquid itself: that is boiling.",
      definition:
        "- **Vapour pressure**: the pressure of the vapour in equilibrium with its liquid in a closed container. It **rises steeply with temperature** and depends on the liquid: weaker attractions between molecules give a higher vapour pressure (a more **volatile** liquid).\n" +
        "- A liquid **boils** when its vapour pressure **equals the external pressure**. The **normal boiling point** is the boiling point at 1 atm (100 °C for water).\n" +
        "- **Higher external pressure raises the boiling point** (a pressure cooker at about 2 atm boils water near 120 °C). **Lower pressure lowers it** (high in the mountains water boils below 100 °C).\n" +
        "- **Evaporation** happens at the surface at any temperature. It **cools** the liquid left behind, because the fastest molecules leave.",
      table: {
        columns: ["Feature", "Evaporation", "Boiling"],
        rows: [
          { cells: ["Where", "At the surface only", "Throughout the liquid, with bubbles"] },
          { cells: ["Temperature", "Any temperature", "Only where vapour pressure equals the external pressure"] },
          { cells: ["Speeded up by", "Higher temperature, larger surface, wind", "Supplying heat faster (the temperature stays the same)"] },
          { cells: ["Effect on the liquid", "Cools the liquid left behind", "Temperature stays at the boiling point"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which change will raise the temperature at which a pan of water boils?",
        options: [
          "Taking the pan to a campsite high in the mountains",
          "Heating the pan more strongly",
          "Using a wider pan",
          "Increasing the pressure of the gas above the water",
          "Lowering the pressure above the water with a pump",
        ],
        steps: [
          "Water boils when its vapour pressure equals the pressure above it.",
          "If that outside pressure is larger, the water must be hotter before its vapour pressure catches up, so the boiling point rises.",
          "A and E lower the outside pressure and so lower the boiling point. B makes it boil sooner and faster, but at the same temperature. C changes nothing about the pressure.",
        ],
        answer: "(D) Increasing the pressure of the gas above the water",
      },
      practiceSet: [
        { prompt: "At 25 °C, liquid X has a higher vapour pressure than water. Which of the two has the lower boiling point?", answer: "X", method: "Higher vapour pressure reaches 1 atm at a lower temperature" },
        { prompt: "Water boils at about 90 °C at a high-altitude camp. Is the air pressure there more or less than 1 atm?", answer: "Less (about 0.7 atm)" },
        { prompt: "What is the vapour pressure of any liquid at its normal boiling point?", answer: "1 atm (101.3 kPa)" },
        { prompt: "Why does sweating cool the body?", answer: "The fastest molecules evaporate and take energy away, so the water left on the skin, and the skin, cool down.", method: "Evaporation absorbs energy" },
      ],
      traps: [
        {
          title: "More pressure on a liquid means a higher boiling point",
          body: "Raising the pressure above water from 100 kPa to more than that raises its boiling point; it does not lower it. That is how a pressure cooker cooks faster. Heating more strongly only makes the water boil faster, at the same temperature.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-gas-phase-diagram",
      name: "Phase diagrams in outline: triple point and critical point",
      intuition:
        "A phase diagram is a map with pressure up the side and temperature along the bottom. Each region shows which state is stable at that pressure and temperature, and the lines between regions are the conditions where two states can exist together. Reading it is just finding a point and seeing which region it is in.",
      definition:
        "- Three **regions**: solid (low temperature), liquid, gas (high temperature, low pressure).\n" +
        "- The **lines** show where two states coexist in equilibrium. The liquid to gas line is the **vapour pressure curve**: it shows the boiling point at each pressure.\n" +
        "- The **triple point** is the one pressure and temperature where solid, liquid and gas all coexist.\n" +
        "- Above the **critical point** there is no difference between liquid and gas, and the gas cannot be liquefied by pressure alone.\n" +
        "- For most substances the solid to liquid line leans to the right. For **water it leans to the left**, because ice is less dense: pressure favours the denser liquid and slightly lowers the melting point.",
      table: {
        columns: ["Feature", "Meaning", "Example values"],
        rows: [
          { cells: ["Triple point", "Solid, liquid and gas coexist", "Water: 0.01 °C and about 0.006 atm"] },
          { cells: ["Critical point", "End of the liquid to gas line", "Water: about 374 °C and 218 atm"] },
          { cells: ["Normal melting and boiling points", "Where the 1 atm line crosses the two lines", "Water: 0 °C and 100 °C"] },
          { cells: ["Triple point above 1 atm", "No liquid can exist at 1 atm; the solid sublimes", "Carbon dioxide: triple point 5.1 atm, so dry ice sublimes at about \\(-78\\ ^\\circ\\text{C}\\) at 1 atm"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "The triple point of carbon dioxide is at 5.1 atm and \\(-57\\ ^\\circ\\text{C}\\). What happens when solid carbon dioxide is warmed slowly at 1 atm?",
        options: [
          "It melts at \\(-57\\ ^\\circ\\text{C}\\) and then boils",
          "It turns directly into a gas",
          "It melts, but the liquid never boils",
          "It stays solid up to room temperature",
          "It condenses into a liquid",
        ],
        steps: [
          "Liquid carbon dioxide can only exist at pressures above the triple point pressure, 5.1 atm.",
          "At 1 atm, below that pressure, the horizontal line on the diagram passes straight from the solid region to the gas region.",
          "So the solid sublimes. A applies only above 5.1 atm. E describes gas to liquid, the wrong direction.",
        ],
        answer: "(B) It turns directly into a gas",
      },
      practiceSet: [
        { prompt: "What is meant by the triple point of a substance?", answer: "The single pressure and temperature at which its solid, liquid and gas coexist in equilibrium" },
        { prompt: "Above its critical temperature, can a gas be liquefied by increasing the pressure?", answer: "No" },
        { prompt: "Why does the solid to liquid line on the phase diagram of water slope backwards (to the left)?", answer: "Ice is less dense than water, so raising the pressure favours the liquid and lowers the melting point." },
      ],
      traps: [
        {
          title: "The triple point of water is not 0 °C at 1 atm",
          body: "0 °C at 1 atm is the normal melting point of ice. The triple point of water is at 0.01 °C and a very low pressure, about 0.006 atm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-colligative",
      name: "Solutes lower the freezing point and raise the boiling point",
      intuition:
        "Dissolved particles get in the way of the solvent molecules. They make it harder for water molecules to lock into ice, so the solution must be colder to freeze, and harder for water molecules to escape, so it must be hotter to boil. Only the number of dissolved particles matters, not what they are.",
      definition:
        "- A dissolved, non-volatile solute **lowers the freezing point** and **raises the boiling point** of a solvent, and lowers its vapour pressure. These are **colligative properties**: they depend on the **number of solute particles**, not their identity.\n" +
        "- **Molality** \\(m\\) is moles of solute per kilogram of solvent.\n" +
        "- Ionic solutes split into ions: NaCl gives 2 particles per formula unit (\\(i = 2\\)), \\(\\mathrm{CaCl_2}\\) gives 3. Sugar and urea stay as molecules (\\(i = 1\\)).\n" +
        "- Ice mixed with salt or sugar below 0 °C can melt if the freezing point of the mixture is below the current temperature. The energy to melt it comes from the surroundings, so the mixture gets colder: the solute supplies no energy.",
      formula: {
        label: "Freezing point depression",
        latex: "\\Delta T_f = i\\,K_f\\,m \\qquad \\Delta T_b = i\\,K_b\\,m",
        symbols: [
          { symbol: "\\(\\Delta T_f,\\ \\Delta T_b\\)", meaning: "fall in freezing point, rise in boiling point, in K" },
          { symbol: "\\(K_f,\\ K_b\\)", meaning: "constants for the solvent; for water 1.86 and 0.512 K kg/mol" },
          { symbol: "\\(m\\)", meaning: "molality, in mol of solute per kg of solvent" },
          { symbol: "\\(i\\)", meaning: "number of particles each formula unit gives in solution" },
        ],
      },
      authoredExample: {
        prompt:
          "0.50 mol of glucose is dissolved in 1.0 kg of water. Find the freezing point of the solution (\\(K_f = 1.86\\ \\text{K kg/mol}\\)). What would it be with 0.50 mol of sodium chloride instead?",
        steps: [
          "Glucose: \\(i = 1\\) and \\(m = 0.50\\ \\text{mol/kg}\\), so \\(\\Delta T_f = 1.86 \\times 0.50 = 0.93\\ \\text{K}\\). The solution freezes at \\(-0.93\\ ^\\circ\\text{C}\\).",
          "Sodium chloride: each NaCl gives \\(\\mathrm{Na^+}\\) and \\(\\mathrm{Cl^-}\\), so \\(i = 2\\) and \\(\\Delta T_f = 2 \\times 1.86 \\times 0.50 = 1.86\\ \\text{K}\\).",
          "The salt solution freezes at about \\(-1.86\\ ^\\circ\\text{C}\\): twice the effect, because twice as many particles.",
        ],
        answer: "\\(-0.93\\ ^\\circ\\text{C}\\) with glucose; \\(-1.86\\ ^\\circ\\text{C}\\) with sodium chloride",
      },
      selfCheckExample: {
        prompt:
          "Each solution below contains 0.10 mol of solute dissolved in 1 kg of water. Which has the lowest freezing point?",
        options: ["Glucose", "Sucrose", "Sodium chloride", "Calcium chloride", "Urea"],
        steps: [
          "The freezing point falls in proportion to the number of dissolved particles.",
          "Glucose, sucrose and urea stay as molecules: 0.10 mol of particles each. Sodium chloride gives 0.20 mol of ions. Calcium chloride gives \\(\\mathrm{Ca^{2+}}\\) and two \\(\\mathrm{Cl^-}\\): 0.30 mol of ions.",
          "Most particles means the largest drop: \\(3 \\times 1.86 \\times 0.10 \\approx 0.56\\ \\text{K}\\), so calcium chloride freezes lowest. The heavier sucrose molecule does not count for more.",
        ],
        answer: "(D) Calcium chloride",
      },
      practiceSet: [
        { prompt: "What is the freezing point of a solution of 0.20 mol of urea in 1.0 kg of water? (\\(K_f = 1.86\\ \\text{K kg/mol}\\))", answer: "About \\(-0.37\\ ^\\circ\\text{C}\\)", method: "\\(1.86 \\times 0.20\\)" },
        { prompt: "Does dissolving salt in water raise or lower its boiling point?", answer: "Raises it" },
        { prompt: "How many moles of ions does 1 mol of \\(\\mathrm{K_2SO_4}\\) give in solution?", answer: "3 mol", method: "\\(2\\mathrm{K^+} + \\mathrm{SO_4^{2-}}\\)" },
        { prompt: "Why is salt spread on icy roads?", answer: "It lowers the freezing point of water below the air temperature, so the ice melts." },
      ],
      traps: [
        {
          title: "A solute lowers the freezing point; it never raises it",
          body: "Adding salt or sugar to water lowers the temperature at which it freezes. Options saying a solute raises the freezing point, or raises the melting point of ice, are wrong.",
        },
        {
          title: "The solute does not supply the energy to melt ice",
          body: "When salt or sugar makes ice melt below 0 °C, the energy for melting comes from the surroundings and the mixture gets colder. The solute only changes the melting point; it gives the water molecules no energy.",
        },
      ],
    },
  ],
};
