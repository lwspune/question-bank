import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HE_TEMPERATURE_NOTE: SubtopicNote = {
  subtopicName: "Temperature and Its Scales",
  title: "Temperature and Its Scales",
  oneLineDefinition:
    "Temperature tells how hot a body is and measures the average kinetic energy of its molecules; it is read in °C, °F or kelvin, with F = 9C/5 + 32 and K = C + 273.",
  whyItMatters:
    "The busiest page of the chapter: nine questions, six EASY, two MODERATE and one HARD. Seven convert between °C, °F and kelvin (freezing point, body temperature, −40 °F, a change of 20 °C, a night in Pune). Two ask what temperature really is: what it depends on, and how long a Fahrenheit thermometer is beside a Celsius one, the HARD one.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9hete-meaning",
      name: "Heat, temperature and the thermometer",
      intuition:
        "Fill a cup and a bucket from the same tap of warm water. Both are equally hot, so they have the same temperature. But the bucket has far more water, so it holds far more heat. Temperature is about how fast the molecules jiggle on average; heat is the energy that flows from a hotter body to a colder one.",
      definition:
        "- **Heat** is a form of energy that flows from a **hotter** body to a **colder** one. Units: **joule (J)** and **calorie (cal)**; 1 cal is about 4.18 J.\n" +
        "- **Temperature** tells how hot a body is. It depends on the **average kinetic energy** (and so the **average velocity**) of the molecules, **not** on how many molecules there are or their shape.\n" +
        "- The SI unit of temperature is the **kelvin (K)**.\n" +
        "- A thermometer works because mercury or alcohol **expands** evenly on heating.\n" +
        "- Between the melting point of ice and the boiling point of water there are **100** divisions on the Celsius scale and **180** on the Fahrenheit scale. Two thermometers made for the **same temperature range** can have tubes of the **same length**; only the markings differ.",
      table: {
        columns: ["Quantity", "What it measures", "Units"],
        rows: [
          { cells: ["Heat", "Energy that flows from a hot body to a cold one", "Joule (J), calorie (cal)"] },
          { cells: ["Temperature", "How hot a body is: the average kinetic energy of its molecules", "Kelvin (K), °C, °F"] },
        ],
        caption: "Same temperature does not mean same heat: a bigger body at the same temperature holds more heat.",
      },
      selfCheckExample: {
        prompt: "A cup and a bucket are filled with water from the same tap at 30 °C. Which has the higher temperature, and which holds more heat?",
        steps: ["Both are at 30 °C, so their temperatures are equal.", "The bucket has far more water, so it holds more heat."],
        answer: "Equal temperature; the bucket holds more heat",
      },
      practiceSet: [
        { prompt: "When a gas is heated, what happens to the average speed of its molecules?", answer: "It increases" },
        { prompt: "A hot spoon is dipped into cold water. In which direction does heat flow?", answer: "From the hot spoon to the cold water" },
        { prompt: "What is the SI unit of temperature?", answer: "The kelvin (K)" },
        { prompt: "How many divisions lie between the melting point of ice and the boiling point of water on the Celsius scale and on the Fahrenheit scale?", answer: "100 on the Celsius scale and 180 on the Fahrenheit scale" },
      ],
      pyqExampleId: "8f31c308-e10b-4dff-9fbb-34ded0dd6413",
      traps: [
        {
          title: "Thinking a bigger body is hotter",
          body: "Temperature depends on the average kinetic energy of the molecules, not on how many there are. A bucket and a cup of water from the same tap are equally hot.",
        },
        {
          title: "Mixing up heat and temperature",
          body: "Heat is energy that flows; temperature tells how hot a body is. Heat is measured in joules or calories, temperature in kelvin or degrees.",
        },
        {
          title: "Thinking a Fahrenheit thermometer must be longer",
          body: "For the same temperature range the mercury rises the same amount, so the tubes can be the same length. The Fahrenheit tube just has 180 divisions instead of 100.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9hete-scales",
      name: "Converting between Celsius, Fahrenheit and kelvin",
      intuition:
        "The three scales measure the same hotness with different numbers. Celsius calls melting ice 0 and boiling water 100. Fahrenheit calls them 32 and 212, so each Fahrenheit degree is smaller. Kelvin uses Celsius-sized steps but starts 273 lower, at absolute zero, so it has no negative numbers.",
      definition:
        "- **Celsius to Fahrenheit**: \\(F = \\frac{9}{5}C + 32\\). **Fahrenheit to Celsius**: \\(C = \\frac{5}{9}(F - 32)\\): subtract 32 first.\n" +
        "- **Celsius to kelvin**: \\(K = C + 273\\) (more exactly 273.15). Kelvin is written K, with no degree sign.\n" +
        "- A **change** of 1 °C is a change of **1 K** and of **1.8 °F**. Never add 273 to a change.\n" +
        "- Fixed points: ice melts at 0 °C = 32 °F = 273 K; water boils at 100 °C = 212 °F = 373 K.\n" +
        "- Normal body temperature: 37 °C = 98.6 °F = 310 K.\n" +
        "- At **−40** the Celsius and Fahrenheit scales read the same: −40 °C = −40 °F.",
      formula: {
        label: "Temperature scales",
        latex: "F = \\frac{9}{5}C + 32 \\qquad C = \\frac{5}{9}(F - 32) \\qquad K = C + 273 \\qquad \\Delta K = \\Delta C",
        symbols: [
          { symbol: "C", meaning: "temperature in degrees Celsius" },
          { symbol: "F", meaning: "temperature in degrees Fahrenheit" },
          { symbol: "K", meaning: "temperature in kelvin" },
        ],
      },
      authoredExample: {
        prompt: "Convert 50 °F into degrees Celsius and into kelvin. If the temperature then rises by 10 °C, by how many kelvin and how many °F has it risen?",
        steps: [
          "\\(C = \\frac{5}{9}(50 - 32) = \\frac{5}{9} \\times 18 = 10\\) °C.",
          "\\(K = 10 + 273 = 283\\) K.",
          "A rise of 10 °C is a rise of 10 K, and of \\(10 \\times 1.8 = 18\\) °F.",
        ],
        answer: "10 °C and 283 K; the rise is 10 K or 18 °F",
      },
      selfCheckExample: {
        prompt: "Convert 100 °C into degrees Fahrenheit and into kelvin.",
        steps: ["\\(F = \\frac{9}{5} \\times 100 + 32 = 180 + 32 = 212\\) °F.", "\\(K = 100 + 273 = 373\\) K."],
        answer: "212 °F and 373 K",
      },
      practiceSet: [
        { prompt: "Normal human body temperature is 37 °C. What is it in degrees Fahrenheit?", answer: "\\(\\frac{9}{5} \\times 37 + 32 = 66.6 + 32 = 98.6\\) °F" },
        { prompt: "The temperature of a body rises by 15 °C. What is the rise in kelvin?", answer: "15 K" },
        { prompt: "Convert 300 K into degrees Celsius.", answer: "\\(300 - 273 = 27\\) °C" },
        { prompt: "Convert 77 °F into degrees Celsius.", answer: "\\(\\frac{5}{9}(77 - 32) = \\frac{5}{9} \\times 45 = 25\\) °C" },
      ],
      pyqExampleId: "1f636f32-91fb-4809-909e-2121d98776c3",
      traps: [
        {
          title: "Adding 273 to a change of temperature",
          body: "A change of 20 °C is a change of 20 K. Add 273 only to a reading: 20 °C reads 293 K.",
        },
        {
          title: "Multiplying before subtracting 32",
          body: "From Fahrenheit, subtract 32 first and then multiply by \\(\\frac{5}{9}\\). 95 °F is \\(\\frac{5}{9} \\times 63 = 35\\) °C.",
        },
        {
          title: "Using 9/5 the wrong way round",
          body: "Going from °C to °F multiply by \\(\\frac{9}{5}\\) and add 32; going from °F to °C subtract 32 and multiply by \\(\\frac{5}{9}\\). Check with 100 °C = 212 °F.",
        },
      ],
    },
  ],
};
