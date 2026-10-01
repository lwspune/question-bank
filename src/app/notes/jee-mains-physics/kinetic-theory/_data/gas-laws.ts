import type { SubtopicNote } from "@/app/notes/_types";

export const GAS_LAWS_KTG_NOTE: SubtopicNote = {
  subtopicName: "Ideal Gas Equation and Gas Laws",
  title: "Ideal Gas Equation and Gas Laws",
  oneLineDefinition:
    "An ideal gas obeys PV = nRT = NkT with T in kelvin; for a fixed amount of gas PV/T stays constant, and when gas flows between vessels it is the total number of moles that stays fixed.",
  whyItMatters:
    "Twenty-seven PYQs, five of them asking for a number, and seven from 2026. Nine follow a fixed amount of gas from one state to another, thirteen count moles in a mixture or in joined vessels, and five read a gas-law graph or a pressure that changes through the gas. Convert every temperature to kelvin before the first ratio: a Celsius temperature in a ratio is the commonest slip in this chapter.",
  concepts: [
    // C1 — one fixed amount of gas
    {
      kind: "formula" as const,
      slug: "jpktg-gas-law",
      name: "One fixed amount of gas: P₁V₁/T₁ = P₂V₂/T₂",
      intuition:
        "For a fixed amount of gas, PV/T equals nR and so never changes. Hold any one of P, V and T, and the other two are tied: in a rigid sealed vessel the pressure rises in step with the kelvin temperature, and at constant temperature the volume grows as the pressure falls. A bubble rising through water is the classic case: the pressure on it drops from the water pressure at depth to the air pressure at the top.",
      definition:
        "- \\(PV = nRT = NkT\\), with \\(R = 8.31\\ \\text{J mol}^{-1}\\text{K}^{-1}\\) and \\(k = R/N_A = 1.38 \\times 10^{-23}\\ \\text{J/K}\\).\n" +
        "- T is always in kelvin: \\(T = t + 273\\).\n" +
        "- Fixed amount of gas: \\(\\dfrac{P_1V_1}{T_1} = \\dfrac{P_2V_2}{T_2}\\).\n" +
        "- Rigid sealed vessel (V fixed): \\(P \\propto T\\), so for a small change \\(\\dfrac{\\Delta P}{P} = \\dfrac{\\Delta T}{T}\\).\n" +
        "- Under water at depth h: \\(P = P_0 + \\rho gh\\); at the surface only \\(P_0\\). Use the temperature at each level if the two differ.\n" +
        "- Density of a gas: \\(\\rho = \\dfrac{PM}{RT}\\). A balloon of fixed volume displaces less air where \\(P/T\\) is smaller, so it lifts less there.\n" +
        "- Doubling the temperature means doubling T in kelvin; doubling the Celsius figure is a much smaller change.",
      formula: {
        label: "Fixed amount of gas",
        latex: "PV = nRT = NkT \\qquad \\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}",
      },
      authoredExample: {
        prompt:
          "A cylinder holds 40 cm³ of gas at 1.5 atm and 27 °C. The gas is compressed to 15 cm³ and its temperature rises to 102 °C. Find the new pressure.",
        steps: [
          "Kelvin: \\(T_1 = 300\\ \\text{K}\\), \\(T_2 = 375\\ \\text{K}\\).",
          "\\(P_2 = P_1 \\times \\dfrac{V_1}{V_2} \\times \\dfrac{T_2}{T_1} = 1.5 \\times \\dfrac{40}{15} \\times \\dfrac{375}{300}\\).",
          "\\(= 1.5 \\times \\dfrac{8}{3} \\times \\dfrac{5}{4} = 5\\ \\text{atm}\\).",
        ],
        answer: "5 atm",
      },
      selfCheckExample: {
        prompt:
          "A bubble of volume 1.9 cm³ leaves the bottom of a lake 20 m deep, where the water is at 12 °C, and rises to the surface, where the water is at 27 °C. Find its volume at the surface. (Air pressure \\(10^{5}\\ \\text{Pa}\\), water density 1000 kg/m³, g = 10 m/s²)",
        steps: [
          "At the bottom: \\(P_1 = 10^{5} + 1000 \\times 10 \\times 20 = 3 \\times 10^{5}\\ \\text{Pa}\\), \\(T_1 = 285\\ \\text{K}\\).",
          "At the surface: \\(P_2 = 10^{5}\\ \\text{Pa}\\), \\(T_2 = 300\\ \\text{K}\\).",
          "\\(V_2 = 1.9 \\times \\dfrac{3 \\times 10^{5}}{10^{5}} \\times \\dfrac{300}{285} = 5.7 \\times \\dfrac{20}{19} = 6.0\\ \\text{cm}^{3}\\).",
        ],
        answer: "6.0 cm³",
      },
      practiceSet: [
        { prompt: "A rigid vessel holds gas at 27 °C and 200 kPa. Its pressure at 127 °C?", answer: "About 267 kPa", method: "\\(200 \\times 400/300\\)." },
        { prompt: "In a sealed rigid vessel the pressure rises by 0.5% when the gas is heated by 1 K. The initial temperature?", answer: "200 K", method: "\\(\\Delta T/T = 0.005\\) with \\(\\Delta T = 1\\ \\text{K}\\)." },
        { prompt: "At constant pressure, gas at 0 °C is heated to 273 °C. What happens to its volume?", answer: "It doubles (273 K to 546 K)" },
        { prompt: "Air at 300 K and 1 atm is compared with air at 270 K and 0.6 atm. Ratio of the second density to the first?", answer: "\\(2/3\\)", method: "\\(\\rho \\propto P/T\\): \\(0.6 \\times 300/270\\)." },
      ],
      pyqExampleId: "331dad46-7716-4db1-8807-df3dbb142ebe", // 23 Jan 2026 Shift 2: bubble rising from a 5 m pool
      traps: [
        {
          title: "A Celsius temperature in a ratio",
          body: "Going from 27 °C to 54 °C does not double anything: in kelvin it is 300 K to 327 K, a 9% rise. Convert first, every time.",
        },
        {
          title: "Leaving out the air pressure at depth",
          body: "The pressure on a bubble at depth h is P₀ + ρgh, not ρgh. Dropping P₀ gives a ratio that is far too large.",
        },
      ],
    },

    // C2 — counting moles
    {
      kind: "formula" as const,
      slug: "jpktg-moles",
      name: "Counting moles: mixtures and joined vessels",
      intuition:
        "When gas can flow from one vessel to another, or several gases share one vessel, the quantity that is kept is the number of moles, n = PV/RT. Add up n for every part before the change, and set it equal to the total after. In a mixture each gas pushes on the walls as if it were alone, so the partial pressures add.",
      definition:
        "- \\(n = \\dfrac{m}{M} = \\dfrac{N}{N_A} = \\dfrac{PV}{RT}\\).\n" +
        "- With the number density \\(n_V = N/V\\) (molecules per m³): \\(P = n_VkT\\).\n" +
        "- Dalton's law: \\(P = (n_1 + n_2 + \\dots)\\dfrac{RT}{V}\\); each gas adds its own partial pressure.\n" +
        "- Joined vessels reaching a common pressure P: \\(\\sum \\dfrac{P_iV_i}{T_i}\\) before \\(= P\\sum \\dfrac{V_i}{T_i'}\\) after.\n" +
        "- Two known gases with total mass m: \\(n_1 + n_2 = \\dfrac{PV}{RT}\\) and \\(n_1M_1 + n_2M_2 = m\\). Two equations, two unknowns.\n" +
        "- Same V and T: \\(P \\propto n = m/M\\), so equal masses of a light gas and a heavy gas give the light gas the higher pressure.\n" +
        "- A partition removed between two parts of the same kind of gas (same f) in an insulated container: the total internal energy \\(\\tfrac{f}{2}\\sum P_iV_i\\) is kept, so \\(P = \\dfrac{P_1V_1 + P_2V_2}{V_1 + V_2}\\).",
      formula: {
        label: "Moles are conserved",
        latex: "n = \\frac{PV}{RT} \\qquad \\sum_i \\frac{P_iV_i}{T_i} = \\text{constant}",
      },
      authoredExample: {
        prompt:
          "Two vessels of equal volume, joined by a thin tube, hold air at 120 kPa and 300 K. One vessel is then heated to 450 K while the other is kept at 300 K. Find the final pressure.",
        steps: [
          "Moles before \\(=\\) moles after: \\(\\dfrac{2 \\times 120\\,V}{300R} = \\dfrac{PV}{300R} + \\dfrac{PV}{450R}\\).",
          "Multiply by \\(900R/V\\): \\(720 = 3P + 2P\\).",
          "\\(P = 144\\ \\text{kPa}\\). The pressure is the same in both vessels; only the moles shift towards the cooler one.",
        ],
        answer: "144 kPa",
      },
      selfCheckExample: {
        prompt:
          "A mixture of helium and nitrogen has a mass of 8 g and occupies 11.2 litres at STP. How many moles of each gas does it contain?",
        steps: [
          "At STP one mole occupies 22.4 L, so \\(n_1 + n_2 = 0.5\\).",
          "Mass: \\(4n_1 + 28n_2 = 8\\).",
          "Substitute \\(n_1 = 0.5 - n_2\\): \\(2 + 24n_2 = 8\\), so \\(n_2 = 0.25\\) and \\(n_1 = 0.25\\).",
        ],
        answer: "0.25 mol of helium and 0.25 mol of nitrogen",
      },
      practiceSet: [
        { prompt: "1 g of helium and 1 g of hydrogen are in identical vessels at one temperature. Ratio \\(P_{He} : P_{H_2}\\)?", answer: "1 : 2", method: "Moles \\(1/4\\) and \\(1/2\\)." },
        { prompt: "1 mol of nitrogen and 2 mol of argon fill 8.31 litres at 400 K. Total pressure \\((R = 8.31)\\)?", answer: "\\(1.2 \\times 10^{6}\\ \\text{Pa}\\)" },
        { prompt: "Number of molecules per m³ at \\(1.38 \\times 10^{5}\\ \\text{Pa}\\) and 300 K \\((k = 1.38 \\times 10^{-23}\\ \\text{J/K})\\)?", answer: "About \\(3.3 \\times 10^{25}\\ \\text{m}^{-3}\\)", method: "\\(n_V = P/kT\\)." },
        { prompt: "A vessel holds 2 mol of gas. 1 mol of another gas is added at the same temperature. The pressure becomes?", answer: "1.5 times the original" },
      ],
      pyqExampleId: "784c47ac-ac44-4e7d-a2a8-f16b40bae1f0", // 6 Apr 2026 Shift 1: two joined vessels, one heated
      traps: [
        {
          title: "Adding pressures instead of moles",
          body: "When two vessels are joined, their pressures do not add. Their moles do. If the temperatures differ, write n = PV/RT for each part before you add.",
        },
        {
          title: "k with moles, or R with molecules",
          body: "P = n_V kT counts molecules per cubic metre; PV = nRT counts moles. Mixing them puts the answer off by a factor of 6 × 10²³.",
        },
      ],
    },

    // C3 — graphs and pressure that varies
    {
      kind: "formula" as const,
      slug: "jpktg-gas-graphs",
      name: "Gas-law graphs and pressure that changes through the gas",
      intuition:
        "Rearrange PV = nRT so that the two plotted quantities stand alone; whatever is left over is the slope. At constant volume, P = (nR/V)T is a straight line through absolute zero. At constant pressure, V = (nR/P)T, so a steeper line means a LOWER pressure. When the pressure is given as a function of volume, the temperature is T = PV/nR, so the hottest state is where the product PV is largest.",
      definition:
        "- P against T at constant V: a straight line through 0 K, slope \\(\\dfrac{nR}{V} = \\dfrac{\\rho R}{M}\\). For one gas, the steeper line is the denser sample.\n" +
        "- P against t in °C: the lines, extended back, reach \\(P = 0\\) at absolute zero, \\(-273\\ ^{\\circ}\\text{C}\\).\n" +
        "- V against T at constant P: slope \\(\\dfrac{nR}{P}\\), so the steeper line has the lower pressure.\n" +
        "- P against V at constant T: a hyperbola \\(PV = \\) constant; the curve farther from the axes is the hotter one.\n" +
        "- A given path \\(P(V)\\): \\(T = \\dfrac{PV}{nR}\\); find the hottest state from \\(\\dfrac{d(PV)}{dV} = 0\\).\n" +
        "- Pressure that varies through a gas (gravity, or a tube spun about one end): for a thin slice, \\(dP = \\rho a\\,dx\\) with \\(\\rho = \\dfrac{PM}{RT}\\), so \\(\\dfrac{dP}{P}\\) is proportional to \\(dx\\) and P varies exponentially. In an isothermal atmosphere \\(P = P_0e^{-Mgh/RT}\\); in a spinning tube the acceleration \\(\\omega^{2}x\\) replaces g.",
      formula: {
        label: "Hottest state on a path",
        latex: "T = \\frac{PV}{nR} \\qquad \\frac{d(PV)}{dV} = 0",
      },
      authoredExample: {
        prompt:
          "One mole of an ideal gas follows the straight-line path \\(P = P_0 - aV\\), with \\(P_0 = 2 \\times 10^{5}\\ \\text{Pa}\\) and \\(a = 10^{7}\\ \\text{Pa/m}^{3}\\). Find the highest temperature it reaches. \\((R = 8.31)\\)",
        steps: [
          "\\(PV = P_0V - aV^{2}\\). Set \\(\\dfrac{d(PV)}{dV} = P_0 - 2aV = 0\\): \\(V = \\dfrac{P_0}{2a} = 0.01\\ \\text{m}^{3}\\).",
          "There \\(P = 2 \\times 10^{5} - 10^{5} = 10^{5}\\ \\text{Pa}\\), so \\(PV = 1000\\ \\text{J}\\).",
          "\\(T_{max} = \\dfrac{PV}{R} = \\dfrac{1000}{8.31} \\approx 120\\ \\text{K}\\).",
        ],
        answer: "About 120 K",
      },
      selfCheckExample: {
        prompt:
          "Two V–T lines through the origin are drawn for the same amount of one gas, each at a constant pressure. Line A is three times as steep as line B. Find \\(P_A : P_B\\).",
        steps: [
          "\\(V = \\dfrac{nR}{P}T\\), so the slope is \\(\\dfrac{nR}{P}\\).",
          "Slope A \\(= 3 \\times\\) slope B means \\(P_A = \\dfrac{P_B}{3}\\).",
        ],
        answer: "1 : 3",
      },
      practiceSet: [
        { prompt: "Two P–T lines through the origin belong to the same mass of gas kept at two fixed volumes. Which line has the larger volume?", answer: "The less steep one", method: "Slope \\(= nR/V\\)." },
        { prompt: "A gas follows \\(P = P_0 - bV^{2}\\). At what volume is it hottest?", answer: "\\(V = \\sqrt{P_0/3b}\\)", method: "\\(PV = P_0V - bV^{3}\\); differentiate." },
        { prompt: "Two isotherms of the same gas on a P–V diagram: which one is hotter?", answer: "The one farther from the axes" },
        { prompt: "How does pressure vary with height in an isothermal column of air?", answer: "It falls exponentially: \\(P = P_0e^{-Mgh/RT}\\)" },
      ],
      pyqExampleId: "a5966066-ed2b-4e1d-997d-71c975ac4270", // 2021 Paper 22: dp/dv = -ap, greatest temperature
      traps: [
        {
          title: "Reading a V–T slope as pressure",
          body: "The slope of a V–T line is nR/P. A steeper line is a lower pressure, not a higher one.",
        },
        {
          title: "Expecting a Celsius graph to pass through the origin",
          body: "On a P–t graph with t in °C, the lines do not pass through zero. They meet the temperature axis at absolute zero, to the left of 0 °C.",
        },
      ],
    },
  ],
};
