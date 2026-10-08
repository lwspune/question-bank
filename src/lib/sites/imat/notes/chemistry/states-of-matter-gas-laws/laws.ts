import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_GAS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "The Gas Laws",
  title: "Pressure Units and the Gas Laws",
  oneLineDefinition:
    "For a fixed amount of gas, pressure and volume are inversely proportional at constant temperature, and each is directly proportional to the kelvin temperature when the other is held fixed.",
  whyItMatters:
    "This is the most asked page of the chapter. The 2018, 2023 and 2024 papers asked how the pressure of a gas in a rigid container changes when it is heated, which needs kelvin; the 2026 paper asked about volume and pressure at constant temperature, and the 2024 paper asked which value is not equal to 1 atm.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-gas-pressure-units",
      name: "Units of pressure and their values for one atmosphere",
      intuition:
        "Gas pressure comes from molecules hitting the walls of their container. It is measured in many units for historical reasons: pascals from physics, millimetres of mercury from the barometer, bars and millibars from weather maps. They all describe the same thing, so you only need the value of 1 atm in each one.",
      definition:
        "- The SI unit is the **pascal**: \\(1\\ \\text{Pa} = 1\\ \\text{N/m}^2\\). A kilopascal is \\(10^3\\ \\text{Pa}\\).\n" +
        "- **Standard atmospheric pressure**: \\(1\\ \\text{atm} = 101\\,325\\ \\text{Pa} = 101.325\\ \\text{kPa}\\).\n" +
        "- \\(1\\ \\text{bar} = 10^5\\ \\text{Pa}\\), so 1 atm is about 1.013 bar or 1013 millibar. A millibar equals a hectopascal (hPa).\n" +
        "- A barometer's column of mercury is 760 mm tall at 1 atm: \\(1\\ \\text{atm} = 760\\ \\text{mmHg} = 760\\ \\text{torr}\\).",
      table: {
        columns: ["Unit", "Symbol", "Value of 1 atm"],
        rows: [
          { cells: ["Pascal", "Pa", "101 325 Pa"] },
          { cells: ["Kilopascal", "kPa", "101.325 kPa"] },
          { cells: ["Bar", "bar", "1.01325 bar"] },
          { cells: ["Millibar (hectopascal)", "mbar or hPa", "1013.25 mbar"] },
          { cells: ["Millimetre of mercury", "mmHg", "760 mmHg"] },
          { cells: ["Torr", "Torr", "760 torr"] },
        ],
        caption: "Learn 101.3 kPa and 760 mmHg; the others follow from the prefixes.",
      },
      selfCheckExample: {
        prompt: "Which of the following pressures is the largest?",
        options: ["1.2 atm", "950 mmHg", "125 kPa", "1.10 bar", "1150 mbar"],
        steps: [
          "Convert everything to kPa. 1.2 atm is \\(1.2 \\times 101.3 \\approx 121.6\\ \\text{kPa}\\).",
          "950 mmHg is \\(950/760 = 1.25\\ \\text{atm} \\approx 126.7\\ \\text{kPa}\\).",
          "1.10 bar is 110 kPa, and 1150 mbar is 115 kPa. So 950 mmHg is the largest, just above 125 kPa.",
        ],
        answer: "(B) 950 mmHg",
      },
      practiceSet: [
        { prompt: "Express 2.0 atm in kilopascals.", answer: "About 203 kPa", method: "\\(2.0 \\times 101.3\\)" },
        { prompt: "Express 380 torr in atmospheres.", answer: "0.50 atm", method: "\\(380/760\\)" },
        { prompt: "Express 50 kPa in bar.", answer: "0.50 bar", method: "\\(1\\ \\text{bar} = 100\\ \\text{kPa}\\)" },
        { prompt: "About how many atmospheres is 1 bar?", answer: "About 0.987 atm" },
      ],
      traps: [
        {
          title: "1 atm is 101.3 kPa, not 1013 kPa",
          body: "The number 1013 belongs to millibars (or hectopascals): 1 atm is 1013 mbar = 101.3 kPa. A value of 1013 kPa is ten atmospheres. Watch which prefix goes with which number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-boyle",
      name: "Boyle's law: pressure and volume at constant temperature",
      intuition:
        "Squeeze a gas into half the volume and each molecule has half as far to travel between hits on the walls, while the same number of molecules now hit a smaller area. The wall gets hit twice as often per square metre, so the pressure doubles. The molecules are not moving any faster, because the temperature has not changed.",
      definition:
        "**Boyle's law**: for a fixed amount of gas at **constant temperature** (an **isothermal** change), the pressure is **inversely proportional** to the volume.\n" +
        "- \\(PV\\) stays constant: double the volume and the pressure halves; reduce the volume to a third and the pressure triples.\n" +
        "- A graph of \\(P\\) against \\(V\\) is a curve (a hyperbola); a graph of \\(P\\) against \\(1/V\\) is a straight line through the origin.\n" +
        "- Any pressure and volume units work, as long as the same units are used on both sides.",
      formula: {
        label: "Boyle's law",
        latex: "P_1 V_1 = P_2 V_2",
        symbols: [
          { symbol: "\\(P_1, V_1\\)", meaning: "pressure and volume before the change" },
          { symbol: "\\(P_2, V_2\\)", meaning: "pressure and volume after the change (same temperature, same amount of gas)" },
        ],
      },
      authoredExample: {
        prompt:
          "A syringe holds 60 cm³ of air at 100 kPa. The outlet is sealed and the plunger is pushed in slowly, so the temperature stays constant, until the volume is 24 cm³. What is the new pressure?",
        steps: [
          "Constant temperature and a fixed amount of air, so \\(P_1 V_1 = P_2 V_2\\).",
          "\\(P_2 = P_1 V_1 / V_2 = 100 \\times 60 / 24 = 250\\ \\text{kPa}\\).",
          "Check: the volume fell by a factor of 2.5, so the pressure rose by the same factor.",
        ],
        answer: "250 kPa",
      },
      selfCheckExample: {
        prompt:
          "A weather balloon holds 3.0 L of helium at 1.2 atm. It rises to a height where the pressure is 0.80 atm. Assuming the temperature does not change, what is its new volume?",
        options: ["2.0 L", "2.4 L", "3.0 L", "3.6 L", "4.5 L"],
        steps: [
          "\\(V_2 = P_1 V_1 / P_2 = 1.2 \\times 3.0 / 0.80 = 4.5\\ \\text{L}\\).",
          "The pressure fell, so the volume must rise: only D and E are larger, and D is just \\(1.2 \\times 3.0\\).",
          "A uses the pressure ratio upside down, as if pressure and volume were directly proportional. B multiplies 3.0 by 0.80.",
        ],
        answer: "(E) 4.5 L",
      },
      practiceSet: [
        { prompt: "The pressure on a gas is tripled at constant temperature. What happens to its volume?", answer: "It falls to one third" },
        { prompt: "5.0 L of a gas at 2.0 atm is compressed to 1.0 L at constant temperature. What is the new pressure?", answer: "10 atm", method: "\\(2.0 \\times 5.0 / 1.0\\)" },
        { prompt: "At constant temperature, what is the shape of a graph of pressure against 1/volume for a fixed amount of gas?", answer: "A straight line through the origin" },
      ],
      traps: [
        {
          title: "Inverse proportion, not a direct decrease",
          body: "When the volume increases at constant temperature, the pressure decreases in inverse proportion: double the volume, half the pressure, so \\(PV\\) is constant. Decreasing in direct proportion would mean \\(P/V\\) is constant, which is not true. The temperature does not change in an isothermal process.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-temperature-laws",
      name: "Charles's law and Gay-Lussac's law: the effect of temperature",
      intuition:
        "Heat a gas and its molecules move faster, hitting the walls harder and more often. If the container is rigid, the pressure rises. If the pressure is held constant, for example by a free piston, the gas expands instead. In both cases the change is proportional to the kelvin temperature, because that is what the kinetic energy follows.",
      definition:
        "For a fixed amount of gas, with the temperature always in **kelvin**:\n" +
        "- **Charles's law**: at constant pressure, the **volume** is directly proportional to the temperature: \\(V/T\\) is constant.\n" +
        "- **Gay-Lussac's law** (the pressure law): at constant volume, the **pressure** is directly proportional to the temperature: \\(P/T\\) is constant.\n" +
        "- Both lines, drawn against Celsius temperature, cross zero volume or zero pressure at absolute zero, \\(-273\\ ^\\circ\\text{C}\\).\n" +
        "- Together with Boyle's law they give the **combined gas law**, for when \\(P\\), \\(V\\) and \\(T\\) all change.",
      formula: {
        label: "Charles, Gay-Lussac and the combined gas law",
        latex: "\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\qquad \\frac{P_1}{T_1} = \\frac{P_2}{T_2} \\qquad \\frac{P_1 V_1}{T_1} = \\frac{P_2 V_2}{T_2}",
        symbols: [
          { symbol: "\\(T_1, T_2\\)", meaning: "absolute temperatures, in K" },
          { symbol: "\\(P, V\\)", meaning: "pressure and volume, in any units used consistently" },
        ],
      },
      authoredExample: {
        prompt:
          "A sealed aerosol can holds gas at 2.9 atm at 17 °C. It is left in a car where it warms to 87 °C. The volume of the can does not change. What is the new pressure?",
        steps: [
          "Constant volume, so \\(P/T\\) is constant. Convert to kelvin: \\(17 + 273 = 290\\ \\text{K}\\) and \\(87 + 273 = 360\\ \\text{K}\\).",
          "\\(P_2 = P_1 \\times T_2 / T_1 = 2.9 \\times 360 / 290 = 3.6\\ \\text{atm}\\).",
          "Using Celsius would give \\(2.9 \\times 87/17 \\approx 15\\ \\text{atm}\\), about four times too big. A warming of 70 degrees cannot do that.",
        ],
        answer: "3.6 atm",
      },
      selfCheckExample: {
        prompt:
          "A gas occupies 500 cm³ at 7 °C. It is warmed to 77 °C at constant pressure. What is its new volume?",
        options: ["400 cm³", "570 cm³", "625 cm³", "500 cm³", "5500 cm³"],
        steps: [
          "Constant pressure, so \\(V/T\\) is constant. \\(T_1 = 280\\ \\text{K}\\), \\(T_2 = 350\\ \\text{K}\\).",
          "\\(V_2 = 500 \\times 350 / 280 = 625\\ \\text{cm}^3\\).",
          "E uses the Celsius ratio 77/7. A turns the ratio upside down. B adds the 70 degree rise as if it were cubic centimetres. D forgets that a gas expands on warming.",
        ],
        answer: "(C) 625 cm³",
      },
      practiceSet: [
        { prompt: "In a rigid container a gas at 300 K and 2.0 atm is heated to 450 K. What is the new pressure?", answer: "3.0 atm", method: "\\(2.0 \\times 450/300\\)" },
        { prompt: "At constant pressure, the kelvin temperature of a gas is halved. What happens to the volume?", answer: "It halves" },
        { prompt: "What is absolute zero in degrees Celsius?", answer: "\\(-273.15\\ ^\\circ\\text{C}\\)" },
        { prompt: "10 L of a gas at 1.0 atm and 300 K is changed to 2.0 atm and 400 K. What is its new volume?", answer: "About 6.7 L", method: "\\(10 \\times \\tfrac{1.0}{2.0} \\times \\tfrac{400}{300}\\)" },
      ],
      traps: [
        {
          title: "Convert to kelvin before using any gas law ratio",
          body: "Doubling the Celsius temperature does not double the pressure. To double the pressure of a gas at 50 °C in a rigid container, the kelvin temperature must double, from 323 K to 646 K, which is 373 °C. Answers built on Celsius ratios are always among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-gas-avogadro",
      name: "Avogadro's law and the molar volume of a gas",
      intuition:
        "In a gas the molecules are so far apart that their own size hardly matters. So at the same temperature and pressure, the volume depends only on how many molecules there are, not on what they are. A mole of hydrogen and a mole of carbon dioxide take up the same space.",
      definition:
        "**Avogadro's law**: at the same temperature and pressure, **equal volumes of gases contain equal numbers of molecules**. So \\(V\\) is proportional to the amount \\(n\\).\n" +
        "- The **molar volume** \\(V_m\\) is the volume of one mole of any (ideal) gas:\n" +
        "- at **STP**, 0 °C and 1 atm, \\(V_m \\approx 22.4\\ \\text{L/mol}\\) (with the newer STP of 0 °C and 1 bar it is 22.7 L/mol);\n" +
        "- at **RTP**, room temperature and 1 atm, \\(V_m \\approx 24\\ \\text{L/mol}\\) (24.0 at 20 °C, 24.5 at 25 °C).\n" +
        "- For gases at the same conditions, **volume ratios in a reaction equal mole ratios** in the equation.",
      formula: {
        label: "Amount of gas from its volume",
        latex: "n = \\frac{V}{V_m}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "amount of gas, in mol" },
          { symbol: "\\(V\\)", meaning: "volume of the gas" },
          { symbol: "\\(V_m\\)", meaning: "molar volume at the stated conditions (22.4 L/mol at STP)" },
        ],
      },
      authoredExample: {
        prompt:
          "How many moles, and what mass, of carbon dioxide (\\(M = 44\\ \\text{g/mol}\\)) are in 5.6 L of the gas at STP?",
        steps: [
          "\\(n = V / V_m = 5.6 / 22.4 = 0.25\\ \\text{mol}\\).",
          "\\(m = n M = 0.25 \\times 44 = 11\\ \\text{g}\\).",
          "That is \\(0.25 \\times 6.02 \\times 10^{23} \\approx 1.5 \\times 10^{23}\\) molecules, the same number as in 5.6 L of any other gas at STP.",
        ],
        answer: "0.25 mol, 11 g",
      },
      selfCheckExample: {
        prompt:
          "At room temperature and pressure, the molar volume of a gas is 24 dm³/mol. What volume does 3.2 g of oxygen gas, \\(\\mathrm{O_2}\\), occupy? (O = 16)",
        options: ["2.4 dm³", "1.2 dm³", "4.8 dm³", "0.24 dm³", "77 dm³"],
        steps: [
          "Oxygen gas is \\(\\mathrm{O_2}\\), so \\(M = 32\\ \\text{g/mol}\\) and \\(n = 3.2/32 = 0.10\\ \\text{mol}\\).",
          "\\(V = 0.10 \\times 24 = 2.4\\ \\text{dm}^3\\).",
          "C uses \\(M = 16\\), forgetting that oxygen is diatomic. E multiplies the mass by the molar volume. B and D slip a factor of 2 or 10.",
        ],
        answer: "(A) 2.4 dm³",
      },
      practiceSet: [
        { prompt: "Hydrogen burns: \\(\\mathrm{2H_2(g) + O_2(g) \\rightarrow 2H_2O(g)}\\). What volume of oxygen reacts with 50 cm³ of hydrogen at the same temperature and pressure?", answer: "25 cm³", method: "Volume ratio = mole ratio, 2 : 1" },
        { prompt: "How many moles of an ideal gas are in 44.8 L at STP?", answer: "2.0 mol", method: "\\(44.8/22.4\\)" },
        { prompt: "Two flasks of the same size at the same temperature and pressure hold nitrogen and carbon dioxide. Do they hold the same number of molecules? The same mass?", answer: "Same number of molecules; different masses", method: "Avogadro's law" },
      ],
      traps: [
        {
          title: "Equal volumes mean equal moles, not equal masses",
          body: "At the same temperature and pressure, 1 L of hydrogen and 1 L of carbon dioxide contain the same number of molecules, but the carbon dioxide is 22 times heavier. Avogadro's law is about the number of particles.",
        },
      ],
    },
  ],
};
