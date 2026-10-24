import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_UN_SI_NOTE: SubtopicNote = {
  subtopicName: "SI Units, Prefixes and Conversions",
  title: "SI Units, Prefixes and Conversions",
  oneLineDefinition:
    "SI has seven base units such as the metre, kilogram and second; other units like the newton and joule are built from them, prefixes such as milli and micro scale them by powers of ten, and CGS units convert to SI the same way.",
  whyItMatters:
    "Five questions in the bank, all EASY, and two of them are from the 2022 paper: the joule in ergs and the newton in dynes. The others ask the SI unit of mass, the unit of frequency, and the values of mA and μA. Every one is a unit name or a power of ten, so the tables here are the whole job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiunsi-units",
      name: "SI base units and derived units",
      intuition:
        "SI picks one unit for each basic quantity: length, mass, time and four more. Every other unit is made by multiplying or dividing these, so a newton is really a kilogram metre per second squared.",
      definition:
        "- SI has **seven base units**: metre, kilogram, second, ampere, kelvin, mole and candela.\n" +
        "- **Derived units** are built from them: speed in m/s, force in newtons, energy in joules.\n" +
        "- The SI unit of mass is the **kilogram**, not the gram. Quintal (100 kg) and tonne (1000 kg) are trade units.\n" +
        "- **Frequency** is oscillations per second, so its unit, the **hertz**, is \\(\\text{s}^{-1}\\).",
      table: {
        columns: ["Quantity", "SI unit", "Symbol and meaning"],
        rows: [
          { cells: ["Length", "metre", "m"] },
          { cells: ["Mass", "kilogram", "kg"] },
          { cells: ["Time", "second", "s"] },
          { cells: ["Electric current", "ampere", "A"] },
          { cells: ["Temperature", "kelvin", "K"] },
          { cells: ["Amount of substance", "mole", "mol"] },
          { cells: ["Luminous intensity", "candela", "cd"] },
          { cells: ["Force", "newton", "N, which is kg m/s²"] },
          { cells: ["Work and energy", "joule", "J, which is N m"] },
          { cells: ["Power", "watt", "W, which is J/s"] },
          {
            cells: ["Frequency", "hertz", "Hz, which is per second (s⁻¹)"],
            noteAmber: "Per second, not second and not second squared.",
          },
          { cells: ["Pressure", "pascal", "Pa, which is N/m²"] },
        ],
        caption: "The first seven rows are the base units; the rest are derived from them.",
      },
      selfCheckExample: {
        prompt: "What is the SI unit of power, and what is it in terms of the joule?",
        steps: ["Power is energy used per second.", "Its unit is the watt: 1 W = 1 J/s."],
        answer: "The watt, one joule per second",
      },
      practiceSet: [
        { prompt: "What is the SI unit of temperature?", answer: "The kelvin" },
        { prompt: "How many base units does SI have?", answer: "Seven" },
        { prompt: "Write the newton in terms of base units.", answer: "kg m/s²" },
        { prompt: "What is the SI unit of pressure?", answer: "The pascal (N/m²)" },
      ],
      pyqExampleId: "ac23617c-145e-45ae-803c-883ffa072c0f",
      traps: [
        {
          title: "The gram as the SI unit of mass",
          body: "The SI unit of mass is the kilogram. The gram is one thousandth of it and belongs to the CGS system.",
        },
        {
          title: "Celsius as the SI unit of temperature",
          body: "The SI base unit of temperature is the kelvin. The degree Celsius is in daily use, but it is not the SI unit.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiunsi-prefixes",
      name: "Prefixes: powers of ten",
      intuition:
        "A prefix is a short way to write a power of ten in front of a unit. A kilometre is a thousand metres; a milliampere is a thousandth of an ampere. Learn the ladder once and every conversion is a shift of the decimal point.",
      definition:
        "- Big prefixes multiply: kilo (\\(10^3\\)), mega (\\(10^6\\)), giga (\\(10^9\\)).\n" +
        "- Small prefixes divide: centi (\\(10^{-2}\\)), milli (\\(10^{-3}\\)), micro (\\(10^{-6}\\)), nano (\\(10^{-9}\\)).\n" +
        "- Capital **M** is mega; small **m** is milli. The Greek letter **μ** is micro.",
      table: {
        columns: ["Prefix", "Symbol", "Value"],
        rows: [
          { cells: ["giga", "G", "\\(10^9\\)"] },
          { cells: ["mega", "M", "\\(10^6\\)"] },
          { cells: ["kilo", "k", "\\(10^3\\)"] },
          { cells: ["centi", "c", "\\(10^{-2}\\)"] },
          { cells: ["milli", "m", "\\(10^{-3}\\)"] },
          {
            cells: ["micro", "μ", "\\(10^{-6}\\)"],
            noteAmber: "Micro is a thousand times smaller than milli.",
          },
          { cells: ["nano", "n", "\\(10^{-9}\\)"] },
        ],
        caption: "Each step from kilo down to nano (missing out centi) is a factor of 1000.",
      },
      selfCheckExample: {
        prompt: "Write 5 kilometres in metres.",
        steps: ["Kilo means \\(10^3\\).", "\\(5 \\times 1000 = 5000\\) m."],
        answer: "5000 m",
      },
      practiceSet: [
        { prompt: "Write 1 microsecond in seconds.", answer: "\\(10^{-6}\\) s" },
        { prompt: "Write 2 MW in watts.", answer: "\\(2 \\times 10^6\\) W" },
        { prompt: "Write 3 mm in metres.", answer: "0.003 m" },
        { prompt: "Write 1 nanometre in metres.", answer: "\\(10^{-9}\\) m" },
      ],
      pyqExampleId: "b688952b-3f5f-4ae2-bad6-8aab6c41f4f3",
      traps: [
        {
          title: "Swapping milli and micro",
          body: "Milli is \\(10^{-3}\\) and micro is \\(10^{-6}\\). A microampere is a thousandth of a milliampere.",
        },
        {
          title: "Reading capital M as milli",
          body: "Capital M is mega (\\(10^6\\)); small m is milli (\\(10^{-3}\\)). 1 MW is a million watts, not a thousandth of a watt.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiunsi-cgs",
      name: "Converting CGS units to SI",
      intuition:
        "The CGS system uses the centimetre, the gram and the second. Its units are smaller than the SI ones, so one SI unit equals many CGS units. Write the SI unit in kilograms and metres, swap each for grams and centimetres, and multiply out.",
      definition:
        "- \\(1\\text{ kg} = 1000\\text{ g} = 10^3\\text{ g}\\) and \\(1\\text{ m} = 100\\text{ cm} = 10^2\\text{ cm}\\).\n" +
        "- Force: \\(1\\text{ N} = 1\\text{ kg m/s}^2 = 10^3\\text{ g} \\times 10^2\\text{ cm/s}^2 = 10^5\\) dyne.\n" +
        "- Work and energy: \\(1\\text{ J} = 1\\text{ N} \\times 1\\text{ m} = 10^5\\text{ dyne} \\times 10^2\\text{ cm} = 10^7\\) erg.\n" +
        "- For an area or volume, convert each length: \\(1\\text{ m}^2 = 10^4\\text{ cm}^2\\), \\(1\\text{ m}^3 = 10^6\\text{ cm}^3\\).",
      formula: {
        label: "CGS and SI",
        latex: "1\\text{ N} = 10^5\\text{ dyne} \\qquad 1\\text{ J} = 10^7\\text{ erg} \\qquad 1\\text{ m}^2 = 10^4\\text{ cm}^2",
      },
      authoredExample: {
        prompt: "The SI unit of pressure is the pascal, 1 N/m². Express 1 Pa in dyne per square centimetre.",
        steps: [
          "\\(1\\text{ N} = 10^5\\) dyne.",
          "\\(1\\text{ m}^2 = 100\\text{ cm} \\times 100\\text{ cm} = 10^4\\text{ cm}^2\\).",
          "\\(1\\text{ Pa} = \\frac{10^5}{10^4} = 10\\) dyne/cm².",
        ],
        answer: "10 dyne/cm²",
      },
      selfCheckExample: {
        prompt: "Water has a density of 1 g/cm³. Express it in kg/m³.",
        steps: [
          "\\(1\\text{ g} = 10^{-3}\\text{ kg}\\) and \\(1\\text{ cm}^3 = 10^{-6}\\text{ m}^3\\).",
          "\\(\\frac{10^{-3}}{10^{-6}} = 10^3\\) kg/m³.",
        ],
        answer: "1000 kg/m³",
      },
      practiceSet: [
        { prompt: "How many dynes make one newton?", answer: "\\(10^5\\)" },
        { prompt: "How many square centimetres are there in one square metre?", answer: "\\(10^4\\)" },
        { prompt: "Write 3 m/s² in cm/s².", answer: "300 cm/s²" },
        { prompt: "Write 72 km/h in m/s.", answer: "\\(72 \\times \\frac{1000}{3600} = 20\\) m/s" },
      ],
      pyqExampleId: "ba1f890f-8f49-496a-bfe5-6edc3e025aac",
      traps: [
        {
          title: "Converting an area with the length factor",
          body: "1 m is 100 cm, but 1 m² is \\(100 \\times 100 = 10^4\\) cm², not 100 cm².",
        },
        {
          title: "Getting the direction backwards",
          body: "The SI unit is the bigger one: one newton is \\(10^5\\) dynes, so a dyne is \\(10^{-5}\\) N, not \\(10^5\\) N.",
        },
        {
          title: "Mixing up dyne and erg",
          body: "The dyne is the CGS unit of force and the erg is the CGS unit of energy. They pair with the newton and the joule.",
        },
      ],
    },
  ],
};
