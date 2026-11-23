import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MU_DERIVED_NOTE: SubtopicNote = {
  subtopicName: "Derived Units, Scalars and Vectors",
  title: "Derived Units, Scalars and Vectors",
  oneLineDefinition:
    "Every derived unit can be written in kilograms, metres and seconds by following the quantity's definition, and every quantity is either a scalar (size only) or a vector (size and direction).",
  whyItMatters:
    "Eight questions in the bank, three EASY and five MODERATE. Five ask you to write or recognise a unit in kg, m and s, and four of those five are about the unit of power. Three sort quantities into scalars and vectors, one of them while also checking the units in a table.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9mude-base",
      name: "Writing a unit in kg, m and s",
      intuition:
        "You never need to memorise a long unit. Start from what the quantity means and build it step by step. Force is mass times acceleration, so its unit is a kilogram times a metre per second squared. Work is force times distance, so multiply by one more metre. Power is work each second, so divide by one more second.",
      definition:
        "- Write each derived unit from the quantity's **definition**, using **kg, m and s**.\n" +
        "- A negative power means \"divided by\": \\(\\mathrm{s^{-2}} = \\frac{1}{\\mathrm{s^2}}\\).\n" +
        "- **Force** = mass × acceleration: \\(\\mathrm{kg\\,m\\,s^{-2}}\\), the newton.\n" +
        "- **Work** = force × distance: \\(\\mathrm{kg\\,m^2\\,s^{-2}}\\), the joule (also N m).\n" +
        "- **Power** = work ÷ time: \\(\\mathrm{kg\\,m^2\\,s^{-3}}\\), the watt (also J/s and N m s⁻¹, and horse power).\n" +
        "- **Pressure** = force ÷ area: \\(\\mathrm{kg\\,m^{-1}\\,s^{-2}}\\), the pascal (also N m⁻²).\n" +
        "- **Momentum** = mass × velocity: \\(\\mathrm{kg\\,m\\,s^{-1}}\\). **Density** = mass ÷ volume: \\(\\mathrm{kg\\,m^{-3}}\\).\n" +
        "- In **CGS**, put g for kg and cm for m: work is \\(\\mathrm{g\\,cm^2\\,s^{-2}}\\), power \\(\\mathrm{g\\,cm^2\\,s^{-3}}\\).",
      formula: {
        label: "Derived units in base units",
        latex:
          "\\mathrm{N} = \\mathrm{kg\\,m\\,s^{-2}} \\qquad \\mathrm{J} = \\mathrm{N\\,m} = \\mathrm{kg\\,m^2\\,s^{-2}} \\qquad \\mathrm{W} = \\mathrm{J\\,s^{-1}} = \\mathrm{kg\\,m^2\\,s^{-3}} \\qquad \\mathrm{Pa} = \\mathrm{N\\,m^{-2}} = \\mathrm{kg\\,m^{-1}\\,s^{-2}}",
        symbols: [
          { symbol: "N", meaning: "newton, the unit of force" },
          { symbol: "J", meaning: "joule, the unit of work, energy and heat" },
          { symbol: "W", meaning: "watt, the unit of power" },
          { symbol: "Pa", meaning: "pascal, the unit of pressure" },
          { symbol: "kg, m, s", meaning: "kilogram, metre and second, the SI base units" },
        ],
      },
      authoredExample: {
        prompt: "Write the SI unit of pressure in kg, m and s, and then its CGS unit in g, cm and s.",
        steps: [
          "Pressure = force ÷ area, and force is \\(\\mathrm{kg\\,m\\,s^{-2}}\\).",
          "Divide by an area in m²: \\(\\frac{\\mathrm{kg\\,m\\,s^{-2}}}{\\mathrm{m^2}} = \\mathrm{kg\\,m^{-1}\\,s^{-2}}\\).",
          "In CGS, put g for kg and cm for m: \\(\\mathrm{g\\,cm^{-1}\\,s^{-2}}\\).",
        ],
        answer: "\\(\\mathrm{kg\\,m^{-1}\\,s^{-2}}\\) in SI and \\(\\mathrm{g\\,cm^{-1}\\,s^{-2}}\\) in CGS",
      },
      selfCheckExample: {
        prompt: "Write the CGS unit of force in g, cm and s.",
        steps: ["Force = mass × acceleration.", "Mass in g, acceleration in cm per second squared."],
        answer: "\\(\\mathrm{g\\,cm\\,s^{-2}}\\)",
      },
      practiceSet: [
        { prompt: "Write the SI unit of work in kg, m and s.", answer: "\\(\\mathrm{kg\\,m^2\\,s^{-2}}\\)" },
        { prompt: "Which quantity has the SI unit \\(\\mathrm{kg\\,m\\,s^{-1}}\\)?", answer: "Momentum" },
        { prompt: "Write the SI unit of density in kg and m.", answer: "\\(\\mathrm{kg\\,m^{-3}}\\)" },
        { prompt: "Which quantity has the SI unit \\(\\mathrm{kg\\,m\\,s^{-2}}\\)?", answer: "Force (the newton)" },
      ],
      pyqExampleId: "93a70c57-8904-40f7-86a7-d1777282deb0",
      traps: [
        {
          title: "Writing the unit of pressure as N m²",
          body: "Pressure is force divided by area, so it is N m⁻² (newton per square metre), not N m².",
        },
        {
          title: "Getting the sign of the power of s wrong",
          body: "Dividing by time gives a negative power. Acceleration is \\(\\mathrm{m\\,s^{-2}}\\), not \\(\\mathrm{m\\,s^{2}}\\), so force is \\(\\mathrm{kg\\,m\\,s^{-2}}\\).",
        },
        {
          title: "Mixing up the units of power and pressure",
          body: "Power is \\(\\mathrm{kg\\,m^2\\,s^{-3}}\\) (J/s, N m s⁻¹, watt, horse power). Pressure is \\(\\mathrm{kg\\,m^{-1}\\,s^{-2}}\\) (N m⁻², pascal).",
        },
        {
          title: "Thinking a watt is a joule times a second",
          body: "A watt is a joule per second: power is work divided by time.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mude-vectors",
      name: "Scalars and vectors",
      intuition:
        "If someone says \"walk 5 km\", you still need to ask \"which way?\". Distance needs only a size, but displacement needs a size and a direction. A quantity that needs only a size is a scalar; one that also needs a direction is a vector.",
      definition:
        "- A **scalar** has only **magnitude** (size): mass, length, distance, time, temperature, speed, density, volume, work, energy, heat, power, pressure.\n" +
        "- A **vector** has **magnitude and direction**: displacement, velocity, acceleration, force, weight and momentum.\n" +
        "- **Work, energy and power are scalars**, even though force and displacement are vectors.\n" +
        "- Pairs to keep apart: distance (scalar) and displacement (vector); speed (scalar) and velocity (vector); mass (scalar) and weight (vector, it acts downwards).",
      table: {
        columns: ["Quantity", "Scalar or vector", "Why"],
        rows: [
          { cells: ["Distance, length", "Scalar", "Only how far"] },
          { cells: ["Displacement", "Vector", "How far and in which direction"] },
          { cells: ["Speed", "Scalar", "Only how fast"] },
          { cells: ["Velocity, acceleration", "Vector", "Have a direction of motion"] },
          { cells: ["Force, weight", "Vector", "Push or pull in a direction"] },
          { cells: ["Momentum", "Vector", "Mass times velocity, so it has velocity's direction"] },
          { cells: ["Mass, time, temperature, density", "Scalar", "Only a size"] },
          { cells: ["Work, energy, power", "Scalar", "Only a size, though made from vectors"] },
        ],
        caption: "If a quantity can point somewhere, it is a vector.",
      },
      selfCheckExample: {
        prompt: "Sort these into scalars and vectors: velocity, time, force, temperature.",
        steps: ["Velocity and force each have a direction.", "Time and temperature have only a size."],
        answer: "Vectors: velocity and force. Scalars: time and temperature.",
      },
      practiceSet: [
        { prompt: "Is distance a scalar or a vector?", answer: "A scalar" },
        { prompt: "Is work a scalar or a vector?", answer: "A scalar" },
        { prompt: "What does a vector quantity have that a scalar does not?", answer: "A direction" },
        { prompt: "Is weight a scalar or a vector?", answer: "A vector: it is a force acting downwards" },
      ],
      pyqExampleId: "937b5676-b3a0-4b99-bed1-14ff094ad87f",
      traps: [
        {
          title: "Calling work a vector",
          body: "Work is made from force and displacement, which are vectors, but work itself has no direction. Work, energy and power are scalars.",
        },
        {
          title: "Treating speed and velocity as the same",
          body: "Speed is a scalar. Velocity is speed in a stated direction, so it is a vector.",
        },
        {
          title: "Calling momentum a scalar",
          body: "Momentum is mass times velocity. Velocity has a direction, so momentum is a vector.",
        },
      ],
    },
  ],
};
