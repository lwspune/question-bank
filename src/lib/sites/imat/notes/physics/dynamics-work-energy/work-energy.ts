import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_WORK_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Work and Energy",
  title: "Work, Kinetic Energy, Potential Energy and Springs",
  oneLineDefinition:
    "A force does work when it moves its point of action along its own direction; that work becomes kinetic energy, gravitational potential energy or energy stored in a stretched spring.",
  whyItMatters:
    "The 2026 ministry paper asked for a kinetic energy from a mass and a speed in km/h. The older papers asked which quantity can be measured in joules per metre (2016) and for the mass of a block stopped by a resistive force over a given distance (2022).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dyn-work",
      name: "Work done by a force",
      intuition:
        "In physics, work is done only when a force moves something along the direction of the force. Holding a heavy bag still does no work on it, however tiring it feels. If the force is at an angle to the motion, only the part of the force along the motion counts.",
      definition:
        "- **Work** \\(W = Fs\\cos\\theta\\), where \\(\\theta\\) is the angle between the force and the displacement. A scalar, in **joules**: \\(1\\ \\text{J} = 1\\ \\text{N m}\\).\n" +
        "- \\(\\theta = 0\\): \\(W = Fs\\). \\(\\theta = 90^\\circ\\): no work (for example the centripetal force, or the normal reaction on a body sliding on a level floor).\n" +
        "- A force against the motion (friction, braking) does **negative** work: it takes energy away.\n" +
        "- Rearranged, force = work ÷ distance, so a newton is a joule per metre.",
      formula: {
        label: "Work",
        latex: "W = Fs\\cos\\theta",
        symbols: [
          { symbol: "\\(F\\)", meaning: "size of the force, in N" },
          { symbol: "\\(s\\)", meaning: "displacement, in m" },
          { symbol: "\\(\\theta\\)", meaning: "angle between force and displacement" },
        ],
      },
      authoredExample: {
        prompt:
          "A rope pulls a sledge 50 m along level snow with a force of 80 N at 60° above the horizontal. How much work does the rope do?",
        steps: [
          "Only the component along the motion does work: \\(80 \\cos 60^\\circ = 40\\ \\text{N}\\).",
          "\\(W = 40 \\times 50 = 2000\\ \\text{J}\\).",
          "The vertical component, \\(80 \\sin 60^\\circ\\), does no work because the sledge does not move up.",
        ],
        answer: "2000 J",
      },
      selfCheckExample: {
        prompt: "In which one of the following situations does the named force do NO work?",
        options: [
          "friction on a box sliding across a floor",
          "the tension in a string keeping a ball moving at constant speed in a horizontal circle",
          "gravity on an apple falling from a tree",
          "a person's upward force on a bag lifted from the floor to a table",
          "the braking force on a car slowing down",
        ],
        steps: [
          "In uniform circular motion the tension points to the centre, at 90° to the velocity, so \\(\\cos 90^\\circ = 0\\): no work, and the speed stays constant.",
          "In A and E the force opposes the motion (negative work). In C and D the force is along the motion (positive work).",
        ],
        answer: "(B) the tension in a string keeping a ball moving at constant speed in a horizontal circle",
      },
      practiceSet: [
        { prompt: "A 25 N push moves a trolley 4.0 m in the direction of the push. How much work is done?", answer: "100 J", method: "\\(W = Fs\\)" },
        { prompt: "How much work is done lifting a 3.0 kg box 2.0 m at a steady speed? Take \\(g = 10\\ \\text{N/kg}\\).", answer: "60 J", method: "Force \\(mg = 30\\ \\text{N}\\), times 2.0 m" },
        { prompt: "A waiter carries a tray horizontally at constant velocity. How much work does his upward force on the tray do?", answer: "None", method: "Force at 90° to the motion" },
      ],
      traps: [
        {
          title: "No movement along the force means no work",
          body: "A force that is perpendicular to the motion, or that moves nothing, does zero work, however large it is. Effort and tiredness are not work in the physics sense.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-ke-pe",
      name: "Kinetic and gravitational potential energy, and the work-energy theorem",
      intuition:
        "Doing work on a body hands it energy. Speeding it up stores the energy as kinetic energy, which grows with the square of the speed. Lifting it stores the energy as gravitational potential energy, which grows with height. The work done by the resultant force equals exactly the change in kinetic energy.",
      definition:
        "- **Kinetic energy** \\(E_k = \\tfrac{1}{2}mv^2\\): double the speed, four times the energy.\n" +
        "- **Gravitational potential energy** change \\(\\Delta E_p = mg\\Delta h\\) near the Earth's surface (only changes in height matter).\n" +
        "- **Work-energy theorem**: the total work done by the resultant force equals the change of kinetic energy, \\(W_{\\text{net}} = \\Delta E_k\\).\n" +
        "- So a constant resistive force \\(F\\) stopping a body over a distance \\(s\\) satisfies \\(Fs = \\tfrac{1}{2}mv^2\\).\n" +
        "- Convert speeds in km/h to m/s first: divide by 3.6.",
      formula: {
        label: "Kinetic and potential energy",
        latex: "E_k = \\tfrac{1}{2}mv^2 \\qquad \\Delta E_p = mg\\,\\Delta h \\qquad W_{\\text{net}} = \\Delta E_k",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass, in kg" },
          { symbol: "\\(v\\)", meaning: "speed, in m/s" },
          { symbol: "\\(\\Delta h\\)", meaning: "change of height, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.50 kg ball is 12 m above the ground and moving at 8.0 m/s. Taking \\(g = 10\\ \\text{N/kg}\\) and the ground as zero height, find its kinetic and its gravitational potential energy.",
        steps: [
          "\\(E_k = \\tfrac{1}{2} \\times 0.50 \\times 8.0^2 = 0.25 \\times 64 = 16\\ \\text{J}\\).",
          "\\(E_p = mgh = 0.50 \\times 10 \\times 12 = 60\\ \\text{J}\\).",
        ],
        answer: "\\(E_k = 16\\ \\text{J}\\); \\(E_p = 60\\ \\text{J}\\)",
      },
      selfCheckExample: {
        prompt:
          "A 60 kg skier glides at 10 m/s onto flat snow, where a constant resistive force of 300 N acts on her. How far does she glide before stopping?",
        options: ["20 m", "2.0 m", "5.0 m", "10 m", "100 m"],
        steps: [
          "Kinetic energy: \\(\\tfrac{1}{2} \\times 60 \\times 10^2 = 3000\\ \\text{J}\\).",
          "The resistive force removes it all: \\(300 \\times s = 3000\\), so \\(s = 10\\ \\text{m}\\).",
          "A forgets the \\(\\tfrac{1}{2}\\) in the kinetic energy. B divides momentum (600 kg m/s) by the force, which gives a time, not a distance.",
        ],
        answer: "(D) 10 m",
      },
      practiceSet: [
        { prompt: "What is the kinetic energy of a 1500 kg car at 72 km/h?", answer: "\\(3.0 \\times 10^5\\ \\text{J}\\)", method: "72 km/h = 20 m/s; \\(\\tfrac{1}{2} \\times 1500 \\times 400\\)" },
        { prompt: "A runner halves her speed. What happens to her kinetic energy?", answer: "It falls to a quarter", method: "\\(E_k \\propto v^2\\)" },
        { prompt: "What potential energy does a 5.0 kg box gain when lifted 4.0 m? Take \\(g = 10\\ \\text{N/kg}\\).", answer: "200 J", method: "\\(mg\\Delta h\\)" },
      ],
      traps: [
        {
          title: "Kinetic energy goes with the square of the speed",
          body: "Doubling the speed multiplies the kinetic energy by four, and a speed left in km/h makes the answer \\(3.6^2 \\approx 13\\) times too large. Convert to m/s first, then square.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-hooke",
      name: "Hooke's law and elastic potential energy",
      intuition:
        "Pull a spring twice as hard and it stretches twice as far, as long as you do not overstretch it. The work you do stretching it is stored, ready to be given back. Because the force grows from zero as you stretch, the stored energy is the average force times the extension, which is half the final force times the extension.",
      definition:
        "- **Hooke's law**: the extension (or compression) \\(x\\) of a spring is proportional to the force, \\(F = kx\\), up to the **limit of proportionality**.\n" +
        "- \\(k\\) is the **spring constant** in N/m: a stiffer spring has a larger \\(k\\).\n" +
        "- Beyond the **elastic limit** the spring is permanently deformed and does not return to its original length.\n" +
        "- **Elastic potential energy** stored: \\(E = \\tfrac{1}{2}kx^2 = \\tfrac{1}{2}Fx\\), the area under the force-extension graph.",
      formula: {
        label: "Hooke's law and stored energy",
        latex: "F = kx \\qquad E_{\\text{el}} = \\tfrac{1}{2}kx^2",
        symbols: [
          { symbol: "\\(k\\)", meaning: "spring constant, in N/m" },
          { symbol: "\\(x\\)", meaning: "extension or compression, in m" },
        ],
      },
      authoredExample: {
        prompt:
          "A spring with \\(k = 200\\ \\text{N/m}\\) is stretched by 0.15 m. Find the force needed and the energy stored.",
        steps: [
          "\\(F = kx = 200 \\times 0.15 = 30\\ \\text{N}\\).",
          "\\(E = \\tfrac{1}{2}kx^2 = \\tfrac{1}{2} \\times 200 \\times 0.15^2 = 100 \\times 0.0225 = 2.25\\ \\text{J}\\).",
          "Check: \\(\\tfrac{1}{2}Fx = \\tfrac{1}{2} \\times 30 \\times 0.15 = 2.25\\ \\text{J}\\).",
        ],
        answer: "30 N; 2.25 J",
      },
      selfCheckExample: {
        prompt:
          "A spring stretches by 4.0 cm when it holds a 6.0 N weight. How much elastic energy does it store when stretched by 8.0 cm, within its limit of proportionality?",
        options: ["0.24 J", "0.96 J", "0.48 J", "48 J", "0.12 J"],
        steps: [
          "\\(k = F/x = 6.0/0.040 = 150\\ \\text{N/m}\\).",
          "\\(E = \\tfrac{1}{2} \\times 150 \\times 0.080^2 = 75 \\times 0.0064 = 0.48\\ \\text{J}\\).",
          "A uses \\(\\tfrac{1}{2}Fx\\) with the old 6.0 N force, but at 8.0 cm the force is 12 N. B forgets the \\(\\tfrac{1}{2}\\). D leaves the extension in cm. E is the energy at 4.0 cm.",
        ],
        answer: "(C) 0.48 J",
      },
      practiceSet: [
        { prompt: "A 10 N force stretches a spring by 5.0 cm. What is the spring constant?", answer: "200 N/m", method: "\\(k = 10/0.050\\)" },
        { prompt: "A spring with \\(k = 400\\ \\text{N/m}\\) is compressed by 0.10 m. How much energy does it store?", answer: "2.0 J", method: "\\(\\tfrac{1}{2} \\times 400 \\times 0.010\\)" },
        { prompt: "The extension of a spring doubles, within its limit. How does the stored energy change?", answer: "It becomes four times as large", method: "\\(E \\propto x^2\\)" },
      ],
      traps: [
        {
          title: "Stored energy is half force times extension, not force times extension",
          body: "The force grows from zero to \\(kx\\) during the stretch, so the work done is the area of a triangle: \\(\\tfrac{1}{2}kx^2\\). Using \\(Fx\\) with the final force doubles the answer.",
        },
      ],
    },
  ],
};
