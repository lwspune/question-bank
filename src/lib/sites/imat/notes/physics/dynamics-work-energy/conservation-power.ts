import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_CONSERVATION_POWER_NOTE: SubtopicNote = {
  subtopicName: "Energy Conservation and Power",
  title: "Conservation of Mechanical Energy, Power and Efficiency",
  oneLineDefinition:
    "Without friction, kinetic plus potential energy stays constant; with friction some becomes heat; power is how fast energy is transferred.",
  whyItMatters:
    "Two ministry papers asked here: what friction does to the mechanical energy of a body sliding down a slope (2026), and the power of a braking force (2024). The 2016 paper asked which statements about the energy and forces of a ball thrown upwards are true.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dyn-energy-conservation",
      name: "Conservation of mechanical energy, and what friction does",
      intuition:
        "Energy is never made or destroyed, only moved from one store to another. A falling ball swaps potential energy for kinetic energy, joule for joule. When friction or air resistance acts, some of that energy leaves the mechanical stores as heat, so the mechanical energy falls even though the total energy is still conserved.",
      definition:
        "- **Mechanical energy** = kinetic + potential energy (gravitational and elastic).\n" +
        "- If only gravity (or a spring) does work, mechanical energy is **conserved**: \\(\\tfrac{1}{2}mu^2 + mgh_1 = \\tfrac{1}{2}mv^2 + mgh_2\\).\n" +
        "- Falling from rest through a height \\(h\\): \\(v = \\sqrt{2gh}\\), the same for every mass.\n" +
        "- With friction or air resistance, mechanical energy **decreases**; the loss equals the work done against friction and becomes internal energy (heat).\n" +
        "- The **total** energy, including heat, is always conserved.",
      formula: {
        label: "Mechanical energy without friction",
        latex: "\\tfrac{1}{2}mv^2 + mgh = \\text{constant} \\qquad v = \\sqrt{2gh}\\ \\text{(from rest)}",
        symbols: [
          { symbol: "\\(h\\)", meaning: "height, in m" },
          { symbol: "\\(v\\)", meaning: "speed, in m/s" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2.0 kg ball is dropped from rest from a height of 5.0 m. Ignoring air resistance and taking \\(g = 10\\ \\text{m/s}^2\\), how fast is it moving just before it lands? Would a 4.0 kg ball land faster?",
        steps: [
          "Potential energy lost: \\(mgh = 2.0 \\times 10 \\times 5.0 = 100\\ \\text{J}\\), all turned into kinetic energy.",
          "\\(\\tfrac{1}{2} \\times 2.0 \\times v^2 = 100\\), so \\(v^2 = 100\\) and \\(v = 10\\ \\text{m/s}\\).",
          "The mass cancels from \\(mgh = \\tfrac{1}{2}mv^2\\), so the 4.0 kg ball also lands at 10 m/s.",
        ],
        answer: "10 m/s; no, the speed does not depend on the mass",
      },
      selfCheckExample: {
        prompt:
          "A pendulum bob is released from rest 0.45 m above the lowest point of its swing. Ignoring air resistance and taking \\(g = 10\\ \\text{m/s}^2\\), what is its speed at the lowest point?",
        options: ["9.0 m/s", "4.5 m/s", "2.1 m/s", "1.5 m/s", "3.0 m/s"],
        steps: [
          "\\(mgh = \\tfrac{1}{2}mv^2\\), so \\(v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 0.45} = \\sqrt{9.0} = 3.0\\ \\text{m/s}\\).",
          "A forgets the square root. B is \\(gh\\). C is \\(\\sqrt{gh}\\), which drops the 2.",
        ],
        answer: "(E) 3.0 m/s",
      },
      practiceSet: [
        { prompt: "A roller-coaster car starts from rest 20 m above the bottom of a frictionless track. How fast is it at the bottom? Take \\(g = 10\\ \\text{m/s}^2\\).", answer: "20 m/s", method: "\\(\\sqrt{2 \\times 10 \\times 20}\\)" },
        { prompt: "A 20 kg sledge starts from rest 10 m up a hill and reaches the bottom at 12 m/s. With \\(g = 10\\ \\text{m/s}^2\\), how much energy was lost to friction?", answer: "560 J", method: "2000 J of potential energy, 1440 J of kinetic energy" },
        { prompt: "A body slides down a rough slope. What happens to its mechanical energy?", answer: "It decreases", method: "Friction turns some into heat" },
        { prompt: "A ball is thrown straight up. Which energy store grows as it rises?", answer: "Gravitational potential energy", method: "Kinetic energy is being converted" },
      ],
      traps: [
        {
          title: "Friction lowers mechanical energy but not total energy",
          body: "On a rough slope the mechanical energy of a sliding body decreases; it does not stay constant, double or vanish. The missing amount has become heat, so the total energy is still conserved.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-power",
      name: "Power and efficiency",
      intuition:
        "Two people can climb the same stairs and do the same work, but the one who runs up has the higher power: power is how quickly work is done. No real machine hands on all the energy it takes in; efficiency is the fraction that comes out as the useful kind.",
      definition:
        "- **Power** is work done (or energy transferred) per unit time: \\(P = W/t\\), in **watts**, \\(1\\ \\text{W} = 1\\ \\text{J/s}\\).\n" +
        "- A force moving its point of action at speed \\(v\\) along the force has power \\(P = Fv\\).\n" +
        "- **Efficiency** = useful energy (or power) out ÷ total energy (or power) in, often as a percentage. It is always less than 100% in real machines.\n" +
        "- The **kilowatt-hour** is an energy unit: \\(1\\ \\text{kWh} = 1000\\ \\text{W} \\times 3600\\ \\text{s} = 3.6 \\times 10^6\\ \\text{J}\\).",
      formula: {
        label: "Power and efficiency",
        latex: "P = \\frac{W}{t} = Fv \\qquad \\eta = \\frac{\\text{useful output}}{\\text{total input}} \\times 100\\%",
        symbols: [
          { symbol: "\\(P\\)", meaning: "power, in W" },
          { symbol: "\\(W\\)", meaning: "work done or energy transferred, in J" },
          { symbol: "\\(\\eta\\)", meaning: "efficiency" },
        ],
      },
      authoredExample: {
        prompt:
          "An electric motor lifts a 50 kg load through 12 m in 20 s, drawing 400 W from the mains. Taking \\(g = 10\\ \\text{N/kg}\\), find the useful power output and the efficiency.",
        steps: [
          "Useful work: \\(mgh = 50 \\times 10 \\times 12 = 6000\\ \\text{J}\\).",
          "Useful power: \\(6000/20 = 300\\ \\text{W}\\).",
          "Efficiency: \\(300/400 = 0.75 = 75\\%\\). The other 100 W becomes heat and sound.",
        ],
        answer: "300 W; 75%",
      },
      selfCheckExample: {
        prompt:
          "A car moves at a steady 25 m/s on a level road against a total resistive force of 800 N. What power does the engine deliver to the wheels?",
        options: ["20 kW", "32 W", "10 kW", "200 kW", "0.80 kW"],
        steps: [
          "At steady speed the driving force equals the resistance, 800 N.",
          "\\(P = Fv = 800 \\times 25 = 20\\,000\\ \\text{W} = 20\\ \\text{kW}\\).",
          "B divides force by speed. C halves the answer, as if using an average of zero and 25 m/s. E gives the force as if it were a power.",
        ],
        answer: "(A) 20 kW",
      },
      practiceSet: [
        { prompt: "A 60 kg student climbs 3.0 m of stairs in 4.0 s. What is her useful power? Take \\(g = 10\\ \\text{N/kg}\\).", answer: "450 W", method: "\\(60 \\times 10 \\times 3.0 / 4.0\\)" },
        { prompt: "A lamp takes in 60 W and gives out 6.0 W of light. What is its efficiency?", answer: "10%", method: "\\(6.0/60\\)" },
        { prompt: "A 2.0 kW heater runs for 3.0 hours. How much energy does it use, in kWh and in joules?", answer: "6.0 kWh, \\(2.16 \\times 10^7\\ \\text{J}\\)", method: "\\(6.0 \\times 3.6 \\times 10^6\\)" },
      ],
      traps: [
        {
          title: "The kilowatt-hour is energy, not power",
          body: "A kilowatt is a rate; a kilowatt-hour is an amount of energy, \\(3.6 \\times 10^6\\ \\text{J}\\). Likewise a power needs a time or a speed: a force and a distance alone give work, not power.",
        },
      ],
    },
  ],
};
