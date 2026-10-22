import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_HE_TRANSFER_NOTE: SubtopicNote = {
  subtopicName: "Temperature and Heat Transfer",
  title: "Temperature and Heat Transfer",
  oneLineDefinition:
    "How the Kelvin, Celsius and Fahrenheit scales are linked, the three ways heat moves (conduction, convection and radiation), and the calorimetry rule that heat lost equals heat gained.",
  whyItMatters:
    "Eight CDS questions from 2018 (I) to 2026 (I). Three ask for the formula linking two temperature scales, four ask how heat moves in an everyday case, and one names the principle behind heat lost = heat gained.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphhe-scales",
      name: "Temperature scales: Kelvin, Celsius and Fahrenheit",
      intuition:
        "A temperature scale needs two fixed points. Celsius puts melting ice at 0 and boiling water at 100. Fahrenheit puts the same two points at 32 and 212, so 100 Celsius degrees cover 180 Fahrenheit degrees. Kelvin uses the Celsius degree but starts counting from absolute zero, the coldest possible temperature, which is 273.15 degrees below 0 °C.",
      definition:
        "The three scales and how to move between them:\n" +
        "- **Kelvin from Celsius**: add 273.15 (often rounded to 273). A Kelvin degree and a Celsius degree are the **same size**.\n" +
        "- **Absolute zero** is 0 K, which is \\(-273.15\\) °C. Nothing can be colder.\n" +
        "- **Fahrenheit from Celsius**: multiply by \\(\\tfrac{9}{5}\\), then add 32. The 9/5 comes from 180 F degrees for every 100 C degrees; the 32 is the ice point on the Fahrenheit scale.\n" +
        "- **Celsius from Fahrenheit**: subtract 32, then multiply by \\(\\tfrac{5}{9}\\).\n" +
        "- The Celsius and Fahrenheit readings are **equal at \\(-40\\)**.",
      formula: {
        label: "Converting between temperature scales",
        latex: "T = t_C + 273.15 \\qquad T_F = \\tfrac{9}{5}\\,T_C + 32 \\qquad T_C = \\tfrac{5}{9}\\,(T_F - 32)",
        symbols: [
          { symbol: "T", meaning: "temperature in kelvin" },
          { symbol: "\\(t_C,\\ T_C\\)", meaning: "temperature in degrees Celsius" },
          { symbol: "\\(T_F\\)", meaning: "temperature in degrees Fahrenheit" },
        ],
      },
      authoredExample: {
        prompt: "A cup of tea is at 50 °C. Write this temperature in kelvin and in degrees Fahrenheit.",
        steps: [
          "Kelvin: add 273.15, so \\(T = 50 + 273.15 = 323.15\\) K.",
          "Fahrenheit: multiply by 9/5 first, \\(\\tfrac{9}{5} \\times 50 = 90\\).",
          "Then add 32: \\(90 + 32 = 122\\).",
        ],
        answer: "323.15 K and 122 °F.",
      },
      selfCheckExample: {
        prompt: "A healthy body temperature is 98.6 °F. What is it in degrees Celsius?",
        steps: [
          "Subtract 32: \\(98.6 - 32 = 66.6\\).",
          "Multiply by 5/9: \\(66.6 \\times \\tfrac{5}{9} = 37\\).",
        ],
        answer: "37 °C.",
      },
      pyqExampleId: "35cc94d7-55c2-49ee-820f-4dccac2401ec",
      practiceSet: [
        { prompt: "What is absolute zero on the Celsius scale?", answer: "\\(-273.15\\) °C" },
        { prompt: "Water boils at 100 °C. What is this on the Fahrenheit scale?", answer: "212 °F", method: "\\(\\tfrac{9}{5} \\times 100 + 32\\)" },
        { prompt: "At what reading do the Celsius and Fahrenheit scales show the same number?", answer: "\\(-40\\)" },
        { prompt: "A room is at 300 K. What is its temperature in degrees Celsius, to the nearest degree?", answer: "27 °C", method: "\\(300 - 273 = 27\\)" },
      ],
      traps: [
        {
          title: "Add 273 to go from Celsius to Kelvin, never subtract",
          body: "The Kelvin number is always the **bigger** one, because the Kelvin scale starts lower, at absolute zero. So \\(T = t_C + 273\\). A relation such as \\(T = t_C - 273\\) or \\(T = 273 - t_C\\) gives a negative Kelvin reading for a warm day, which is impossible.",
        },
        {
          title: "The Fahrenheit constant is 32, and the factor is 9/5",
          body: "Ice melts at 32 °F, so the constant added is **32**, not 36. Each Celsius degree is **9/5** of a Fahrenheit degree, so the factor is 9/5, not 5/9 or 10/3. Check any formula with one point: 100 °C must give 212 °F.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphhe-modes",
      name: "Conduction, convection and radiation",
      intuition:
        "Heat always flows from hot to cold, and it has three ways to travel. In conduction, heat passes from particle to particle while the material stays where it is, as along a metal spoon. In convection, the warm fluid itself moves and carries the heat with it, as in a pot of boiling water. In radiation, heat travels as waves and needs no material at all, which is how the Sun warms the Earth across empty space.",
      definition:
        "The three modes and their tests:\n" +
        "- **Conduction**: heat passes through a material without the material moving. Best in **metals**, because of their free electrons. Copper conducts better than aluminium.\n" +
        "- **Convection**: a heated fluid becomes lighter and rises, cooler fluid sinks in its place, and the moving fluid carries the heat. Happens only in **liquids and gases**.\n" +
        "- **Radiation**: heat travels as electromagnetic waves (mostly infrared). Needs **no medium**, so it crosses a vacuum.\n" +
        "- **Poor conductors**: liquids are poor, gases are poorer. Even hydrogen, the best conducting gas, conducts far less than water.\n" +
        "- **Cooling quickly**: water carries heat away from a hot bowl much faster than air, and moving air (a fan) removes the warm, moist layer so the water keeps cooling by evaporation.",
      table: {
        columns: ["Everyday case", "Main mode of heat transfer"],
        rows: [
          { cells: ["Heating one end of a brass rod warms the other end", "Conduction"] },
          {
            cells: ["Water boiling in a pot on a gas stove", "Convection"],
            noteAmber: "CDS 2024 (II): boiling water in a pot is the example of convection.",
            pyqExampleId: "86a6408c-7382-47c5-b992-7bdb762dbf2f",
          },
          { cells: ["Land and sea breezes", "Convection"] },
          { cells: ["Warm air circulating round a blast furnace", "Convection"] },
          { cells: ["Feeling the warmth of the Sun", "Radiation"] },
          {
            cells: ["Glass of an electric bulb heated by the glowing filament", "Radiation"],
            noteAmber: "CDS 2018 (II): this is the one case in a list that is not convection.",
            pyqExampleId: "38f124a5-d8da-4a32-b5c6-f0c63f8d04dd",
          },
          {
            cells: ["Thermal conductivity, highest to lowest", "Copper, aluminium, water, hydrogen gas"],
            noteAmber: "CDS 2026 (I): hydrogen gas has the least thermal conductivity of these four.",
            pyqExampleId: "e6880d3d-278b-48e7-aa32-45074d570974",
          },
          {
            cells: ["Cooling a hot bowl of rice fast", "Stand it in water and run a fan at full speed"],
            noteAmber: "CDS 2024 (I): a water bath with a fast fan beats still air, a cooled room or water alone.",
            pyqExampleId: "d3bb1d89-8b87-4d44-bd3d-e642a652eff5",
          },
        ],
      },
      pyqExampleId: "86a6408c-7382-47c5-b992-7bdb762dbf2f",
      selfCheckExample: {
        prompt: "Why do the cooling coils of a refrigerator sit at the top of the food compartment and not at the bottom?",
        steps: [
          "Air cooled by the coils becomes denser and sinks.",
          "Warmer air from below rises to take its place, reaches the coils and is cooled in turn.",
          "This circulation of moving air is convection, and it only works if the cold surface is at the top.",
        ],
        answer: "So that the cooled air sinks and sets up a convection current through the whole compartment.",
      },
      practiceSet: [
        { prompt: "Which mode of heat transfer can work through a vacuum?", answer: "Radiation" },
        { prompt: "Why do metals conduct heat well?", answer: "They have free electrons that carry energy quickly through the metal" },
        { prompt: "In which states of matter can convection take place?", answer: "Liquids and gases (fluids) only" },
        { prompt: "Which conducts heat better: copper or aluminium?", answer: "Copper" },
      ],
      traps: [
        {
          title: "A microwave oven does not heat by convection",
          body: "The microwaves are absorbed by the water in the food, which heats the food from within. That is heating by **radiation** absorbed in the food, not by moving hot air. Convection needs a fluid that flows and carries the heat.",
        },
        {
          title: "Every gas is a poor conductor, even the best one",
          body: "Hydrogen conducts heat better than any other gas, but every gas conducts far less than water, and water far less than a metal. A question asking for the **least** conductor among metals, water and a gas wants the gas.",
        },
        {
          title: "Radiation needs no medium; conduction and convection do",
          body: "The Sun's heat crosses empty space, so it must be **radiation**. Conduction needs a material to pass through, and convection needs a fluid that can flow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphhe-calorimetry",
      name: "Specific heat and the principle of calorimetry",
      intuition:
        "Put a hot body and a cold body together, with no heat escaping, and heat flows from the hot one to the cold one until both are at the same temperature. No heat is made or lost, so all the heat the hot body gives out is taken in by the cold body. This is the principle of calorimetry. How much heat a body takes for each degree depends on its mass and on its material, through a number called the specific heat.",
      definition:
        "Heat and temperature change:\n" +
        "- **Heat taken in or given out**: \\(Q = mc\\,\\Delta T\\), where \\(c\\) is the **specific heat** of the material.\n" +
        "- **Specific heat** is the heat needed to raise 1 kg of a substance by 1 K. Its SI unit is J kg⁻¹ K⁻¹.\n" +
        "- **Water** has a very high specific heat, about 4200 J kg⁻¹ K⁻¹, so it is used as a coolant in car radiators.\n" +
        "- **Principle of calorimetry**: in an isolated mixture, **heat lost by the hot body = heat gained by the cold body**. It is the law of conservation of energy applied to heat.\n" +
        "- **Thermal equilibrium** is the end state of that exchange: both bodies at one common temperature.",
      formula: {
        label: "Heat for a temperature change, and the calorimetry balance",
        latex: "Q = m\\,c\\,\\Delta T \\qquad m_1 c_1 (T_1 - T) = m_2 c_2 (T - T_2)",
        symbols: [
          { symbol: "Q", meaning: "heat taken in or given out, in joules" },
          { symbol: "m", meaning: "mass, in kg" },
          { symbol: "c", meaning: "specific heat of the material" },
          { symbol: "\\(\\Delta T\\)", meaning: "change in temperature" },
          { symbol: "T", meaning: "the common final temperature of the mixture" },
        ],
      },
      authoredExample: {
        prompt: "200 g of water at 80 °C is mixed with 300 g of water at 20 °C. No heat escapes. Find the final temperature of the mixture.",
        steps: [
          "Call the final temperature \\(T\\). The hot water cools from 80 to \\(T\\); the cold water warms from 20 to \\(T\\).",
          "Both are water, so \\(c\\) cancels: heat lost = heat gained gives \\(200\\,(80 - T) = 300\\,(T - 20)\\).",
          "Expand: \\(16000 - 200T = 300T - 6000\\), so \\(500T = 22000\\).",
          "\\(T = 44\\).",
        ],
        answer: "44 °C.",
      },
      selfCheckExample: {
        prompt: "How much heat is needed to raise the temperature of 2 kg of water by 10 °C? Take the specific heat of water as 4200 J kg⁻¹ K⁻¹.",
        steps: [
          "Use \\(Q = mc\\,\\Delta T\\).",
          "\\(Q = 2 \\times 4200 \\times 10 = 84000\\) J.",
        ],
        answer: "84000 J, which is 84 kJ.",
      },
      pyqExampleId: "09000e12-356e-4d0f-89e8-718b1a6e4a97",
      practiceSet: [
        { prompt: "What is the SI unit of specific heat?", answer: "J kg⁻¹ K⁻¹" },
        { prompt: "Why is water used to cool car engines?", answer: "Its specific heat is very high, so it takes in a lot of heat for a small rise in temperature" },
        { prompt: "Two bodies in contact stop exchanging heat. What can you say about their temperatures?", answer: "They are equal: the bodies are in thermal equilibrium" },
        { prompt: "How much heat does 1 kg of water give out when it cools by 5 °C? Take its specific heat as 4200 J kg⁻¹ K⁻¹.", answer: "21000 J", method: "\\(1 \\times 4200 \\times 5\\)" },
      ],
      traps: [
        {
          title: "Calorimetry and thermal equilibrium are not the same name",
          body: "Heat lost = heat gained is the **principle of calorimetry**. Thermal equilibrium is only the final state, when the two temperatures have become equal. A question asking for the relation 'heat lost = heat gained' wants calorimetry.",
        },
      ],
    },
  ],
};
