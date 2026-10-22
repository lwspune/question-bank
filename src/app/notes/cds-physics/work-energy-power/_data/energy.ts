import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_WO_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Work, Energy and Power",
  title: "Work, Energy and Power",
  oneLineDefinition:
    "When a force does work and when it does none, kinetic and potential energy and how they trade places, and power as work done per second.",
  whyItMatters:
    "Five CDS questions from 2020 (II) to 2025 (II), three of them in the two 2025 papers. Two are short power sums, and the other three each test one idea: zero work, energy and momentum, and potential energy in a pendulum.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphwo-work",
      name: "Work done by a force",
      intuition:
        "In physics, work is done only when a force moves something along the direction of the force. Push a box across the floor and you do work. Hold a heavy bag still and you get tired, but you do no work on the bag, because it does not move. A force at right angles to the motion also does no work: it can turn the motion, but it cannot speed it up or slow it down.",
      definition:
        "Work and its sign:\n" +
        "- \\(W = Fs\\cos\\theta\\), where \\(\\theta\\) is the angle between the force and the displacement. Unit: the **joule** (1 J = 1 N m).\n" +
        "- **Positive** work: force along the motion (\\(\\theta < 90°\\)), the body speeds up.\n" +
        "- **Zero** work: force **perpendicular** to the motion (\\(\\theta = 90°\\)), or no displacement at all.\n" +
        "- **Negative** work: force against the motion (\\(\\theta > 90°\\)), as friction does.\n" +
        "- In circular motion the string's pull points to the centre, at right angles to the motion all the way round, so it does **no work**.",
      formula: {
        label: "Work done by a constant force",
        latex: "W = Fs\\cos\\theta",
        symbols: [
          { symbol: "F", meaning: "size of the force" },
          { symbol: "s", meaning: "size of the displacement" },
          { symbol: "θ", meaning: "angle between the force and the displacement" },
        ],
      },
      authoredExample: {
        prompt: "A rope pulls a box 10 m along level ground. The pull is 50 N, at 60° to the ground. How much work does the rope do?",
        steps: [
          "\\(W = Fs\\cos\\theta = 50 \\times 10 \\times \\cos 60°\\).",
          "\\(\\cos 60° = \\tfrac{1}{2}\\), so \\(W = 500 \\times \\tfrac{1}{2} = 250\\) J.",
        ],
        answer: "250 J.",
      },
      selfCheckExample: {
        prompt: "A porter carries a suitcase on his head and walks 20 m along a level platform. How much work does the upward force of his head do on the suitcase?",
        steps: [
          "The force on the suitcase is upward; the suitcase moves horizontally.",
          "The angle between them is 90°, and \\(\\cos 90° = 0\\).",
        ],
        answer: "Zero.",
      },
      pyqExampleId: "4b3cdc03-dec1-4024-8d28-cc8e48801fa5",
      practiceSet: [
        { prompt: "A force of 20 N moves a body 3 m in its own direction. How much work does it do?", answer: "60 J" },
        { prompt: "Is the work done by friction on a sliding block positive, negative or zero?", answer: "Negative, because friction acts against the motion" },
        { prompt: "A person pushes hard against a wall that does not move. How much work is done on the wall?", answer: "Zero, since there is no displacement" },
        { prompt: "What is the SI unit of work?", answer: "The joule" },
      ],
      traps: [
        {
          title: "Effort is not work",
          body: "Work needs a **displacement along the force**. Holding a load still, or carrying it on a level path, does no work against gravity, however tiring it feels.",
        },
        {
          title: "A centre-pointing force does no work",
          body: "The pull of a string on a whirled stone, and the gravity on a body moving in a circle about it, point to the centre, at **90°** to the motion. The work done is **zero**, not positive and not dependent on the mass.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphwo-energy",
      name: "Kinetic and potential energy",
      intuition:
        "Kinetic energy is the energy a body has because it is moving; potential energy is the energy it has because of its height. A swinging pendulum keeps trading one for the other: at the ends of the swing it stops for an instant and all its energy is potential, at the lowest point it moves fastest and its potential energy is least. Because kinetic energy depends on the square of the speed, doubling the speed makes it four times as large.",
      definition:
        "The two forms and how they link:\n" +
        "- **Kinetic energy** \\(K = \\tfrac{1}{2}mv^{2}\\). In terms of momentum \\(p = mv\\): \\(K = \\dfrac{p^{2}}{2m}\\), and \\(p = \\sqrt{2mK}\\).\n" +
        "- So at fixed mass, \\(K\\) goes as \\(v^{2}\\) and as \\(p^{2}\\).\n" +
        "- **Potential energy** near the ground \\(U = mgh\\): it depends on the **height** above the chosen level.\n" +
        "- **Conservation**: with no friction, \\(K + U\\) stays constant. A body falling from height \\(h\\) reaches \\(v = \\sqrt{2gh}\\).\n" +
        "- **Pendulum**: potential energy is **least at the mean (lowest) position** and greatest at the two ends; kinetic energy is the other way round.\n" +
        "- **Work-energy theorem**: the net work done on a body equals its change in kinetic energy.",
      formula: {
        label: "Kinetic and potential energy",
        latex: "K = \\tfrac{1}{2}mv^{2} = \\dfrac{p^{2}}{2m} \\qquad U = mgh \\qquad K + U = \\text{constant} \\qquad v = \\sqrt{2gh}",
        symbols: [
          { symbol: "K", meaning: "kinetic energy" },
          { symbol: "U", meaning: "potential energy" },
          { symbol: "p", meaning: "momentum" },
          { symbol: "h", meaning: "height above the reference level" },
        ],
      },
      authoredExample: {
        prompt: "A 2 kg ball moves at 3 m/s. Find its kinetic energy. What does the kinetic energy become if the speed is tripled?",
        steps: [
          "\\(K = \\tfrac{1}{2} \\times 2 \\times 3^{2} = 9\\) J.",
          "Kinetic energy goes as \\(v^{2}\\). Tripling the speed multiplies it by \\(3^{2} = 9\\).",
          "New kinetic energy: \\(9 \\times 9 = 81\\) J. Check: \\(\\tfrac{1}{2} \\times 2 \\times 9^{2} = 81\\) J.",
        ],
        answer: "9 J, rising to 81 J.",
      },
      selfCheckExample: {
        prompt: "A 1 kg ball is dropped from a height of 5 m. Using conservation of energy, find its speed just before it hits the ground. (Take \\(g = 10\\) m/s².)",
        steps: [
          "Potential energy lost: \\(mgh = 1 \\times 10 \\times 5 = 50\\) J.",
          "All of it becomes kinetic energy: \\(\\tfrac{1}{2} \\times 1 \\times v^{2} = 50\\), so \\(v^{2} = 100\\).",
        ],
        answer: "10 m/s.",
      },
      pyqExampleId: "4d0e8475-f382-4818-b368-9286b96fb39d",
      practiceSet: [
        { prompt: "What is the potential energy of a 2 kg mass held 10 m above the ground? (Take \\(g = 10\\) m/s².)", answer: "200 J" },
        { prompt: "At which point of its swing does a pendulum bob have its greatest kinetic energy?", answer: "At the mean (lowest) position" },
        { prompt: "Two bodies of masses 1 kg and 4 kg have the same kinetic energy. What is the ratio of their momenta?", answer: "1 : 2", method: "\\(p = \\sqrt{2mK}\\), so \\(p\\) goes as \\(\\sqrt{m}\\)" },
        { prompt: "A 4 kg body has 50 J of kinetic energy. What is its speed?", answer: "5 m/s", method: "\\(\\tfrac{1}{2} \\times 4 \\times v^{2} = 50\\)" },
      ],
      traps: [
        {
          title: "Kinetic energy follows the square",
          body: "Doubling the speed or the momentum (at the same mass) makes the kinetic energy **four** times, not two times. Halving them makes it one quarter.",
        },
        {
          title: "Lowest point, least potential energy",
          body: "A pendulum bob has the **least potential energy at its mean position**, the lowest point, and the most at the two extreme positions where it is highest. Its kinetic energy is the opposite.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphwo-power",
      name: "Power",
      intuition:
        "Power is how fast work gets done. Two people can lift the same load up the same stairs, but the one who does it in less time has more power. The least work needed to lift a load is the potential energy it gains, so the least power is that energy divided by the time taken.",
      definition:
        "Power and its units:\n" +
        "- \\(P = \\dfrac{W}{t}\\). Unit: the **watt** (1 W = 1 J/s); 1 kW = 1000 W; 1 horsepower is about 746 W.\n" +
        "- **Lifting**: the least power to raise mass \\(m\\) through height \\(h\\) in time \\(t\\) is \\(P = \\dfrac{mgh}{t}\\).\n" +
        "- At the same work, **power and time are inversely related**: half the time means twice the power.\n" +
        "- The **kilowatt hour** (kWh) is a unit of **energy**, not power: 1 kWh = \\(3.6 \\times 10^{6}\\) J.\n" +
        "- If the time is given in minutes, either convert it to seconds or keep the answer in joules per minute: compare like with like.",
      formula: {
        label: "Power",
        latex: "P = \\dfrac{W}{t} \\qquad P_{\\text{lift}} = \\dfrac{mgh}{t} \\qquad 1\\ \\text{kWh} = 3.6 \\times 10^{6}\\ \\text{J}",
        symbols: [
          { symbol: "P", meaning: "power" },
          { symbol: "W", meaning: "work done" },
          { symbol: "t", meaning: "time taken" },
        ],
      },
      authoredExample: {
        prompt: "A pump lifts 200 kg of water to a tank 15 m high in one minute. What is the least power it must deliver? (Take \\(g = 10\\) m/s².)",
        steps: [
          "Work needed: \\(mgh = 200 \\times 10 \\times 15 = 30000\\) J.",
          "Time: one minute = 60 s.",
          "\\(P = 30000 \\div 60 = 500\\) W.",
        ],
        answer: "500 W.",
      },
      selfCheckExample: {
        prompt: "Machine X does 1200 J of work in 6 s. Machine Y does 1200 J of work in 3 s. Compare their powers.",
        steps: [
          "X: \\(1200 \\div 6 = 200\\) W. Y: \\(1200 \\div 3 = 400\\) W.",
          "Same work in half the time gives twice the power.",
        ],
        answer: "Y has twice the power of X.",
      },
      pyqExampleId: "7a08331b-31e2-4f8a-965b-45c6e343ccb6",
      practiceSet: [
        { prompt: "A motor does 3000 J of work in one minute. What is its power in watts?", answer: "50 W" },
        { prompt: "Is the kilowatt hour a unit of power or of energy?", answer: "Energy" },
        { prompt: "How many joules make one kilowatt hour?", answer: "\\(3.6 \\times 10^{6}\\) J" },
        { prompt: "A girl of mass 40 kg climbs 6 m of stairs in 12 s. What is her least power? (Take \\(g = 10\\) m/s².)", answer: "200 W" },
      ],
      traps: [
        {
          title: "kW is power, kWh is energy",
          body: "The **kilowatt** measures power; the **kilowatt hour** measures energy (power × time). An electricity bill counts kWh, the energy used.",
        },
        {
          title: "Least power uses the potential energy gained",
          body: "To lift a load at the least power, the work is just \\(mgh\\). Do not add the kinetic energy unless the question says the load ends up moving.",
        },
      ],
    },
  ],
};
