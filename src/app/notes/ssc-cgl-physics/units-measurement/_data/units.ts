import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FUN_UNITS_NOTE: SubtopicNote = {
  subtopicName: "Units, Dimensions and Measuring",
  title: "Units, Dimensions and Measuring",
  oneLineDefinition:
    "The SI units SSC matches to quantities, units that sound like something else (light year, nit, newton), quantities with the same dimensions, and the parts of a vernier calliper.",
  whyItMatters:
    "Seven questions in the bank: two from the 2023 shifts and five from the 2024 shifts, six of them EASY. Each is a unit-to-quantity match, so the table is the whole page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscfunun-units",
      name: "Units and what they measure",
      intuition:
        "Most unit questions hand you a list and ask which one is out of place. Know which quantity each unit belongs to and the odd one is plain.",
      definition:
        "Electrical units: current **ampere** (an SI base unit), voltage **volt**, capacitance **farad**, magnetic field **tesla**.\n\n" +
        "Units that mislead:\n" +
        "- A **light year** is a **distance** (about 9.46 x 10^15 m), not a time.\n" +
        "- The **angstrom** (10^-10 m) is a length.\n" +
        "- The **nit** (candela per square metre) measures **luminance**.\n" +
        "- Joule, kilowatt-hour and calorie measure **energy**; the **newton** measures **force**.",
      table: {
        columns: ["Quantity", "Unit"],
        rows: [
          { cells: ["Current", "Ampere"], pyqExampleId: "fdbb6aa7-fcf3-49ed-971d-aab6546deb45" },
          { cells: ["Capacitance", "Farad"] },
          { cells: ["Luminance", "Nit"], pyqExampleId: "c932dbf7-fd6d-41ca-a037-7b1b855bdf4e" },
          { cells: ["Distance", "Light year"], pyqExampleId: "79b3ce9d-28d5-46e5-b266-5975d3764bde" },
          { cells: ["Force, not energy", "Newton"], pyqExampleId: "993c6443-f988-43d9-88f0-cc6de591d407" },
        ],
      },
      pyqExampleId: "b462366c-a12f-4bdc-aa53-47321a0743d4",
      selfCheckExample: {
        prompt: "Pick the odd one out: joule, calorie, newton, kilowatt-hour.",
        steps: ["Joule, calorie and kilowatt-hour all measure energy.", "The newton measures force."],
        answer: "Newton.",
      },
      practiceSet: [
        { prompt: "What does a light year measure?", answer: "Distance" },
        { prompt: "What is the unit of magnetic field?", answer: "Tesla" },
        { prompt: "How many joules are in one kilowatt-hour?", answer: "3.6 x 10^6" },
      ],
      traps: [
        {
          title: "A light year is not time",
          body: "The word **year** tempts you towards time, but a **light year** is the **distance** light travels in a year.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfunun-dimensions",
      name: "Dimensions and the vernier calliper",
      intuition:
        "Two quantities share dimensions when they are built the same way from mass, length and time. Work and torque are both force times a distance.",
      definition:
        "Dimensions:\n" +
        "- **Work** and **torque** both have dimensions [ML^2 T^-2].\n" +
        "- Power is [ML^2 T^-3]; moment of inertia [ML^2]; angle has none.\n\n" +
        "Vernier calliper:\n" +
        "- **Internal jaws**: the **inside diameter** of a hollow cylinder or pipe.\n" +
        "- External jaws: the length of a rod or the diameter of a sphere.\n" +
        "- Depth bar: the depth of a beaker.",
      table: {
        columns: ["Part", "Measures"],
        rows: [
          { cells: ["Internal jaws", "Inside diameter of a pipe"], pyqExampleId: "f6510d47-909b-4d57-9c77-d85149383ea3" },
          { cells: ["External jaws", "Diameter of a sphere"] },
          { cells: ["Depth bar", "Depth of a beaker"] },
        ],
      },
      pyqExampleId: "0daea665-1b85-4c7f-9a29-09d4396589b6",
      selfCheckExample: {
        prompt: "Which part of a vernier calliper measures the depth of a beaker?",
        steps: ["The jaws grip inside or outside an object.", "Depth is read with the thin depth bar that slides out of the end."],
        answer: "The depth bar.",
      },
      practiceSet: [
        { prompt: "Do work and torque have the same dimensions?", answer: "Yes" },
        { prompt: "What are the dimensions of power?", answer: "ML^2 T^-3" },
        { prompt: "Which jaws measure the diameter of a sphere?", answer: "The external jaws" },
      ],
      traps: [
        {
          title: "Power is not work",
          body: "**Power** is work per second, so it carries an extra T^-1. Only **torque** matches work.",
        },
      ],
    },
  ],
};
