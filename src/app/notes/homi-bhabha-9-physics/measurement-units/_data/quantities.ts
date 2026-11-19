import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MU_QUANTITIES_NOTE: SubtopicNote = {
  subtopicName: "Physical Quantities, Units and Instruments",
  title: "Physical Quantities, Units and Instruments",
  oneLineDefinition:
    "A physical quantity is anything we can measure: seven fundamental quantities such as mass, length and time have their own SI units, every other quantity is derived from them, and each is measured with its own instrument.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE: pick the fundamental quantities, spot the wrong pair of quantity and unit (weight in kilograms), find the quantity not measured in joules, find the odd unit out among units of length, and name the instrument that measures wind speed.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9muqu-fundamental",
      name: "Fundamental and derived quantities",
      intuition:
        "Some quantities stand on their own: you cannot get a length out of a mass or a time. These are the fundamental quantities. Everything else is built from them: speed is a length divided by a time, and weight is a mass multiplied by g. Those are derived quantities.",
      definition:
        "- A **physical quantity** is anything that can be measured. It is written as a **number with a unit**.\n" +
        "- **Fundamental (base) quantities** do not depend on any other quantity. The SI system has **seven**.\n" +
        "- **Derived quantities** are made from fundamental ones: area, volume, speed, velocity, acceleration, force, **weight**, momentum, density, work and power.\n" +
        "- **Weight** is a force (mass times g), so it is **derived**, even though mass is fundamental.\n" +
        "- The **SI** system uses metre, kilogram and second. The older **CGS** system uses centimetre, gram and second.",
      table: {
        columns: ["Fundamental quantity", "SI unit", "Symbol"],
        rows: [
          { cells: ["Length", "metre", "m"] },
          { cells: ["Mass", "kilogram", "kg"] },
          { cells: ["Time", "second", "s"] },
          { cells: ["Temperature", "kelvin", "K"], noteAmber: "The degree Celsius is used every day, but the SI unit is the kelvin." },
          { cells: ["Electric current", "ampere", "A"] },
          { cells: ["Amount of substance", "mole", "mol"] },
          { cells: ["Luminous intensity", "candela", "cd"] },
        ],
        caption: "Any quantity not in this table is a derived quantity.",
      },
      selfCheckExample: {
        prompt: "Sort these into fundamental and derived quantities: time, speed, mass, area.",
        steps: ["Time and mass do not depend on other quantities.", "Speed is length divided by time; area is length times length."],
        answer: "Fundamental: time and mass. Derived: speed and area.",
      },
      practiceSet: [
        { prompt: "What is the SI unit of temperature?", answer: "The kelvin (K)" },
        { prompt: "Is velocity a fundamental or a derived quantity?", answer: "Derived: it is displacement divided by time" },
        { prompt: "How many fundamental quantities does the SI system have?", answer: "Seven" },
        { prompt: "What is the SI unit of electric current?", answer: "The ampere (A)" },
      ],
      pyqExampleId: "eb819246-30c3-4366-a779-d91a0678aff3",
      traps: [
        {
          title: "Calling weight a fundamental quantity",
          body: "Weight is the force of gravity on a mass, mass times g, so it is derived. Mass is the fundamental quantity.",
        },
        {
          title: "Giving °C as the SI unit of temperature",
          body: "The SI unit of temperature is the kelvin. The degree Celsius is a common unit, but not the SI one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9muqu-units",
      name: "Units of common quantities",
      intuition:
        "Every derived quantity gets a unit that tells you what kind of thing it is. Work, energy and heat are all energy, so they share the joule. Mass is in kilograms but weight, a force, is in newtons. A list of tiny length units is another favourite: learn which ones are lengths, and the one unit that sneaks in from somewhere else will stand out.",
      definition:
        "- **Mass** is measured in **kilograms**; **weight** is a force and is measured in **newtons**.\n" +
        "- **Work, energy and heat** are all measured in **joules (J)**. **Specific heat** is heat per kilogram per degree, so its unit is **J/(kg °C)**, not the joule.\n" +
        "- **Power** is measured in **watts (W)**, 1 W = 1 J/s; the **horse power** is also a unit of power.\n" +
        "- The **kilowatt hour (kWh)** is a unit of electrical **energy**, not power: 1 kWh = 3.6 × 10⁶ J.\n" +
        "- **Small units of length**: 1 nanometre (nm) = \\(10^{-9}\\) m, 1 angstrom (Å) = \\(10^{-10}\\) m, 1 picometre (pm) = \\(10^{-12}\\) m. The **light year** is a long **distance**, not a time.\n" +
        "- The **atomic mass unit (u)** is a unit of **mass**, used for atoms.",
      table: {
        columns: ["Quantity", "SI unit", "Symbol or form"],
        rows: [
          { cells: ["Force and weight", "newton", "N"] },
          { cells: ["Work, energy and heat", "joule", "J"] },
          { cells: ["Power", "watt", "W, the same as J/s"] },
          { cells: ["Pressure", "pascal", "Pa, the same as N/m²"] },
          { cells: ["Density", "kilogram per cubic metre", "kg/m³"] },
          { cells: ["Velocity", "metre per second", "m/s"] },
          { cells: ["Acceleration", "metre per second squared", "m/s²"] },
          { cells: ["Momentum", "kilogram metre per second", "kg m/s"] },
          { cells: ["Specific heat", "joule per kilogram per degree", "J/(kg °C)"] },
        ],
        caption: "A pair with a mass unit beside a force, or a joule beside specific heat, is a wrong pair.",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: joule, kilowatt hour, watt, newton metre.",
        steps: ["The joule, the kilowatt hour and the newton metre are all units of energy.", "The watt is a joule per second, a unit of power."],
        answer: "Watt",
      },
      practiceSet: [
        { prompt: "What is the SI unit of weight?", answer: "The newton (N)" },
        { prompt: "How many metres make one nanometre?", answer: "One nanometre is \\(10^{-9}\\) m" },
        { prompt: "Which quantity is measured in the atomic mass unit (u)?", answer: "Mass (of atoms and molecules)" },
        { prompt: "What is the SI unit of power?", answer: "The watt (W), one joule per second" },
      ],
      pyqExampleId: "be3fd652-32de-4d5d-ad6c-4d4532b19630",
      traps: [
        {
          title: "Measuring weight in kilograms",
          body: "In daily life we say a bag weighs 5 kg, but in physics the kilogram is the unit of mass. Weight is a force and its SI unit is the newton.",
        },
        {
          title: "Giving specific heat the unit joule",
          body: "Specific heat is the heat needed for 1 kg to warm by 1 degree, so its unit is J/(kg °C). Work, energy and heat are the ones measured in plain joules.",
        },
        {
          title: "Taking u for a unit of length",
          body: "The pm, nm and Å are all lengths, but u, the atomic mass unit, measures mass.",
        },
        {
          title: "Thinking a light year measures time",
          body: "A light year is the distance light travels in one year, so it is a unit of length.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9muqu-instruments",
      name: "Measuring instruments",
      intuition:
        "Most instrument names tell you what they do once you know the Greek or Latin start: anemo means wind, baro means weight or pressure, hygro means moisture and hydro means water. Learn the list in pairs that look alike, because the papers love to put a hygrometer next to a hydrometer.",
      definition:
        "- An **anemometer** measures the **speed of the wind**; a **wind vane** shows its **direction**.\n" +
        "- A **barometer** measures **atmospheric pressure**.\n" +
        "- A **hygrometer** measures **humidity** (moisture in the air); a **hydrometer** measures the **density of a liquid**.\n" +
        "- A **lactometer** checks the **purity of milk** from its density.\n" +
        "- A **seismograph** records **earthquake waves**; an **altimeter** shows **height above sea level**.",
      table: {
        columns: ["Instrument", "What it measures"],
        rows: [
          { cells: ["Anemometer", "Speed of the wind"] },
          { cells: ["Wind vane", "Direction of the wind"] },
          { cells: ["Barometer", "Atmospheric pressure"] },
          { cells: ["Hygrometer", "Humidity of the air"] },
          { cells: ["Rain gauge", "Rainfall"] },
          { cells: ["Thermometer", "Temperature"] },
          { cells: ["Hydrometer", "Density of a liquid"] },
          { cells: ["Lactometer", "Purity of milk"] },
          { cells: ["Radiometer", "Radiation (radiant energy)"] },
          { cells: ["Seismograph", "Earthquake waves"] },
          { cells: ["Altimeter", "Height above sea level"] },
          { cells: ["Odometer", "Distance travelled by a vehicle"] },
          { cells: ["Speedometer", "Speed of a vehicle"] },
          { cells: ["Ammeter", "Electric current"] },
          { cells: ["Voltmeter", "Potential difference"] },
        ],
        caption: "The first five are the instruments of a weather station.",
      },
      selfCheckExample: {
        prompt: "A weather station wants to know how much moisture there is in the air. Which instrument does it use?",
        steps: ["Moisture in the air is humidity.", "Humidity is measured by a hygrometer."],
        answer: "A hygrometer",
      },
      practiceSet: [
        { prompt: "What does a barometer measure?", answer: "Atmospheric pressure" },
        { prompt: "Which instrument shows the direction from which the wind blows?", answer: "A wind vane" },
        { prompt: "What does a lactometer test?", answer: "The purity of milk, from its density" },
        { prompt: "Which instrument records the waves of an earthquake?", answer: "A seismograph" },
      ],
      pyqExampleId: "3efc2bc1-e405-4255-821c-4e968bed8fc1",
      traps: [
        {
          title: "Mixing up the anemometer and the wind vane",
          body: "The anemometer, with its spinning cups, measures how fast the wind blows. The wind vane only shows which way it blows.",
        },
        {
          title: "Mixing up the hygrometer and the hydrometer",
          body: "A hygrometer measures the moisture in the air. A hydrometer floats in a liquid and measures the liquid's density.",
        },
      ],
    },
  ],
};
