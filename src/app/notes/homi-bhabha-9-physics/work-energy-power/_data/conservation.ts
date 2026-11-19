import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_WE_CONSERVATION_NOTE: SubtopicNote = {
  subtopicName: "Conservation of Energy",
  title: "Conservation of Energy",
  oneLineDefinition:
    "Energy is never created or destroyed, only changed from one form to another: a falling body turns potential energy mgh into kinetic energy while their total stays the same, and every machine is a chain of such changes.",
  whyItMatters:
    "Five questions in the bank, four MODERATE and one HARD. Two follow a body as potential energy turns into kinetic energy (a body thrown up, and a body dropped on the Moon, the HARD one); one picks the graph of total energy against height for a falling body; two name the energy changes in a device or in a steam power station.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9weco-falling",
      name: "Potential energy turning into kinetic energy",
      intuition:
        "A stone held high has energy stored because of its height. Let it go: as it falls it loses height and gains speed, so potential energy turns into kinetic energy. Just before it lands, all the stored energy has become kinetic. At every point on the way down, the two add up to the same total. Throw a ball up and the same thing happens in reverse.",
      definition:
        "- **Potential energy** of a body at height h: \\(E_p = mgh\\).\n" +
        "- **Law of conservation of energy**: energy cannot be created or destroyed; it only changes form. The total energy stays constant.\n" +
        "- For a freely falling body (no air resistance): \\(E_p + E_k\\) is the **same at every height**. A graph of total energy against height is a **horizontal straight line**.\n" +
        "- Just before landing: \\(E_k = mgh\\) (all the potential energy lost), so \\(v = \\sqrt{2gh}\\).\n" +
        "- A body thrown up with kinetic energy \\(E\\) rises until all of it has become potential energy: \\(h = \\frac{E}{mg}\\).\n" +
        "- On the **Moon**, g is about **one sixth** of the Earth's. The **mass** of a body stays the same; its **weight** becomes one sixth.\n" +
        "- A weight W in newtons is a mass \\(\\frac{W}{g}\\) in kilograms.",
      formula: {
        label: "Potential energy and conservation",
        latex: "E_p = mgh \\qquad E_p + E_k = \\text{constant} \\qquad v = \\sqrt{2gh} \\qquad g_{moon} = \\frac{g}{6}",
        symbols: [
          { symbol: "Ep", meaning: "potential energy, in joules" },
          { symbol: "Ek", meaning: "kinetic energy, in joules" },
          { symbol: "h", meaning: "height above the ground, in metres" },
          { symbol: "v", meaning: "speed just before landing, in m/s" },
        ],
      },
      authoredExample: {
        prompt: "A 4 kg stone is dropped from a height of 45 m. Take g = 10 m/s². Find its potential and kinetic energy at the top, at a height of 20 m, and just before it lands, and its landing speed.",
        steps: [
          "At the top: \\(E_p = 4 \\times 10 \\times 45 = 1800\\) J, \\(E_k = 0\\). Total 1800 J.",
          "At 20 m: \\(E_p = 4 \\times 10 \\times 20 = 800\\) J, so \\(E_k = 1800 - 800 = 1000\\) J.",
          "Just before landing: \\(E_p = 0\\), \\(E_k = 1800\\) J.",
          "\\(\\frac{1}{2} \\times 4 \\times v^2 = 1800\\), so \\(v^2 = 900\\) and \\(v = 30\\) m/s.",
        ],
        answer: "Total 1800 J throughout; 1000 J kinetic at 20 m; lands at 30 m/s",
      },
      selfCheckExample: {
        prompt: "A 1 kg ball is thrown straight up with 200 J of kinetic energy. How high does it rise? Take g = 10 m/s².",
        steps: ["At the top all 200 J is potential energy: \\(mgh = 200\\).", "\\(h = \\frac{200}{1 \\times 10} = 20\\) m."],
        answer: "20 m",
      },
      practiceSet: [
        { prompt: "A 3 kg flower pot stands on a ledge 4 m above the ground. What is its potential energy? Take g = 10 m/s².", answer: "\\(3 \\times 10 \\times 4 = 120\\) J" },
        { prompt: "As a body falls freely, what happens to the sum of its kinetic and potential energy?", answer: "It stays the same" },
        { prompt: "A 5 kg body falls freely from 8 m. What is its kinetic energy just before it hits the ground? Take g = 10 m/s².", answer: "\\(5 \\times 10 \\times 8 = 400\\) J" },
        { prompt: "A body weighs 60 N on the Earth. What does it weigh on the Moon?", answer: "10 N, one sixth of its weight on the Earth" },
      ],
      pyqExampleId: "91f6d14f-1fed-45f5-b3d2-433a3d38655e",
      traps: [
        {
          title: "Thinking the total energy falls as the body falls",
          body: "Potential energy falls and kinetic energy rises by the same amount. The total stays constant, so its graph against height is a flat line.",
        },
        {
          title: "Using the Earth's g on the Moon",
          body: "On the Moon g is about one sixth of the Earth's, so a body dropped from the same height gains only one sixth as much kinetic energy. Its mass does not change.",
        },
        {
          title: "Treating a weight as a mass",
          body: "A weight in newtons must be divided by g to give the mass. A body weighing 49 N has a mass of 5 kg (with g = 9.8 m/s²), not 49 kg.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9weco-forms",
      name: "Forms of energy and energy changes in devices",
      intuition:
        "Energy comes in many forms: heat, light, sound, electrical, chemical, and the mechanical energy of moving or raised things. A device is useful because it changes one form into another. A microphone turns your voice into an electrical signal; a loudspeaker turns the signal back into sound. A power station is a long chain of such changes.",
      definition:
        "- **Forms of energy**: mechanical (kinetic and potential), heat, light, sound, electrical, chemical, nuclear.\n" +
        "- A device **changes** energy from one form to another; the energy is not used up.\n" +
        "- **Steam (thermal) power station**: burning coal gives **heat** to water in the boiler; the jet of steam has **kinetic** energy; it spins the **turbine** (mechanical energy); the **generator** turns that into **electrical** energy, which a bulb turns into light.\n" +
        "- Microphone and loudspeaker do opposite jobs: sound to electrical, and electrical to sound.",
      table: {
        columns: ["Device", "Energy taken in", "Energy given out"],
        rows: [
          { cells: ["Microphone", "Sound", "Electrical"] },
          { cells: ["Electronic stethoscope", "Sound", "Electrical (then amplified)"] },
          { cells: ["Loudspeaker", "Electrical", "Sound"] },
          { cells: ["Electric bulb", "Electrical", "Light (and heat)"] },
          { cells: ["Electric fan or motor", "Electrical", "Mechanical (kinetic)"] },
          { cells: ["Generator (dynamo)", "Mechanical", "Electrical"] },
          { cells: ["Solar cell", "Light", "Electrical"] },
          { cells: ["Battery or cell", "Chemical", "Electrical"] },
          { cells: ["Electric iron or heater", "Electrical", "Heat"] },
          { cells: ["Steam turbine", "Kinetic energy of steam", "Mechanical (turning)"] },
        ],
        caption: "In a chain, the energy given out by one part is the energy taken in by the next.",
      },
      selfCheckExample: {
        prompt: "What energy change takes place in an electric fan?",
        steps: ["Electricity goes in; the blades turn."],
        answer: "Electrical energy into mechanical (kinetic) energy",
      },
      practiceSet: [
        { prompt: "What energy change takes place in a loudspeaker?", answer: "Electrical energy into sound energy" },
        { prompt: "What energy change takes place in a solar cell?", answer: "Light energy into electrical energy" },
        { prompt: "In a power station, which machine changes mechanical energy into electrical energy?", answer: "The generator" },
        { prompt: "What energy changes take place when a battery lights a torch bulb?", answer: "Chemical energy into electrical energy, and then into light (and heat)" },
      ],
      pyqExampleId: "1f832bfe-700e-4140-89ee-9647f239ca5f",
      traps: [
        {
          title: "Mixing up a microphone and a loudspeaker",
          body: "A microphone turns sound into electrical energy. A loudspeaker does the reverse, electrical energy into sound.",
        },
        {
          title: "Thinking the turbine makes the electricity",
          body: "Steam turns the turbine, giving mechanical energy. The generator joined to the turbine changes that into electrical energy.",
        },
        {
          title: "Thinking energy gets used up",
          body: "Energy only changes form. In any change the total amount stays the same, even if some of it becomes heat that is not useful.",
        },
      ],
    },
  ],
};
