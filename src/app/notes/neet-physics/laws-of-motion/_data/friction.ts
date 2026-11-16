import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_LM_FRICTION_NOTE: SubtopicNote = {
  subtopicName: "Connected Bodies and Friction",
  title: "Connected Bodies and Friction",
  oneLineDefinition:
    "Bodies that move together share one acceleration, static friction holds a body up to a limit, and on a slope the weight splits into a part along it and a part into it.",
  whyItMatters:
    "Five NEET questions from 2023 to 2026, four of them from 2024 or later. One finds the push between two blocks (NEET 2024), two find the largest acceleration a vehicle can have before a box on its floor slips (2023 and 2026), and two work on a slope: a box pulled up a smooth one by a cord (Re-NEET 2024) and a friction coefficient from the times taken down a smooth and a rough slope (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphlm-connected",
      name: "Connected bodies, tension and contact force",
      intuition:
        "When blocks are pushed together, or tied by strings, they move as one. So first treat the whole group as a single body to find the shared acceleration. Then look at one block alone: the force on it from its neighbour is exactly what that block needs to have that acceleration.",
      definition:
        "- Bodies moving together share one acceleration: \\(a = \\dfrac{F_{\\text{net}}}{m_{\\text{total}}}\\), using only forces from outside the group.\n" +
        "- Then take one body alone. The force between two blocks, or the tension in a string, equals the mass it moves times a: \\(N = m_{\\text{moved}}\\,a\\).\n" +
        "- A light string has the same tension all along it, and the same on both sides of a smooth light pulley.\n" +
        "- Two masses over a fixed pulley (\\(m_1 > m_2\\)): \\(a = \\dfrac{(m_1 - m_2)g}{m_1 + m_2}\\) and \\(T = \\dfrac{2m_1m_2g}{m_1 + m_2}\\).\n" +
        "- A string or a weighing scale holding a body in a lift reads \\(m(g + a)\\) when the lift accelerates upward, \\(m(g - a)\\) when it accelerates downward, mg at constant velocity, and zero in free fall.\n" +
        "- **Equilibrium:** the net force is zero, so all the forces on the body add up to zero as vectors.",
      formula: {
        label: "Connected bodies",
        latex: "a = \\frac{F}{m_1 + m_2}, \\qquad N = m_2 a, \\qquad a_{\\text{pulley}} = \\frac{(m_1 - m_2)g}{m_1 + m_2}",
      },
      authoredExample: {
        prompt:
          "Masses of 5 kg and 3 kg hang from the two ends of a light string over a smooth fixed pulley. Find the acceleration and the tension (g = 10 m/s²).",
        steps: [
          "\\(a = \\dfrac{(5 - 3) \\times 10}{5 + 3} = 2.5\\ \\text{m/s}^{2}\\).",
          "\\(T = \\dfrac{2 \\times 5 \\times 3 \\times 10}{8} = 37.5\\) N.",
          "Check on the 3 kg mass, which rises: \\(T = 3(10 + 2.5) = 37.5\\) N.",
        ],
        answer: "\\(2.5\\ \\text{m/s}^{2}\\) and 37.5 N",
      },
      selfCheckExample: {
        prompt:
          "Blocks of 1 kg, 3 kg and 4 kg are tied in a line by light strings on a smooth table. A force of 24 N pulls the 4 kg block. Find the tension in each string.",
        steps: [
          "All three move together: \\(a = \\dfrac{24}{1 + 3 + 4} = 3\\ \\text{m/s}^{2}\\).",
          "The string between the 1 kg and 3 kg blocks moves only the 1 kg block: \\(T = 1 \\times 3 = 3\\) N.",
          "The string between the 3 kg and 4 kg blocks moves 1 + 3 = 4 kg: \\(T = 4 \\times 3 = 12\\) N.",
        ],
        answer: "3 N and 12 N",
      },
      practiceSet: [
        { prompt: "A 2 kg body hangs by a string in a lift moving up at constant velocity. What is the tension (g = 10 m/s²)?", answer: "20 N" },
        { prompt: "A body hangs from a spring balance in a lift that falls freely. What does the balance read?", answer: "Zero" },
        { prompt: "A string breaks at 60 N. What is the largest upward acceleration with which it can lift a 4 kg mass (g = 10 m/s²)?", answer: "\\(5\\ \\text{m/s}^{2}\\)" },
        { prompt: "A body is at rest under three forces. What is the vector sum of the three forces?", answer: "Zero" },
      ],
      pyqExampleId: "be33d2ee-56fd-49a7-bc96-939b75f1fe9b",
      traps: [
        {
          title: "The front block does not get the whole push",
          body: "A push on the rear block moves both blocks. The block in front receives only its own mass times the shared acceleration, which is less than the applied force.",
        },
        {
          title: "Only acceleration changes the reading",
          body: "In a lift moving at constant velocity, up or down, a string holding a body still reads mg. Only an acceleration makes it \\(m(g + a)\\) or \\(m(g - a)\\).",
        },
        {
          title: "The tension is not the hanging weight",
          body: "Over a pulley with unequal masses, the tension lies between the two weights: less than \\(m_1g\\) and more than \\(m_2g\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphlm-friction",
      name: "Static and kinetic friction",
      intuition:
        "Push a heavy box gently and it does not move: the floor pushes back with friction just as hard as you push. Static friction grows with your push only up to a limit. Push past that limit and the box slides, and a slightly smaller kinetic friction then acts on it.",
      definition:
        "- **Static friction** adjusts itself to stop sliding, up to a limit: \\(f_s \\le \\mu_s N\\). Below the limit it equals the applied force.\n" +
        "- **Kinetic friction** acts while sliding: \\(f_k = \\mu_k N\\), and \\(\\mu_k < \\mu_s\\).\n" +
        "- Friction does not depend on the area of contact. On a level surface with no other vertical force, N = mg.\n" +
        "- A box on the floor of a vehicle moves with it only through static friction: \\(ma \\le \\mu_s mg\\), so \\(a_{\\max} = \\mu_s g\\), whatever the box's mass.\n" +
        "- A vehicle braking or speeding up through friction alone has an acceleration of size \\(\\mu g\\).",
      formula: {
        label: "Friction",
        latex: "f_s \\le \\mu_s N, \\qquad f_k = \\mu_k N, \\qquad a_{\\max} = \\mu_s g",
      },
      authoredExample: {
        prompt:
          "A 2 kg block lies on a floor with \\(\\mu_s = 0.5\\) and \\(\\mu_k = 0.4\\). Find the friction on it when it is pushed sideways with 6 N, and its acceleration when it is pushed with 12 N (g = 10 m/s²).",
        steps: [
          "Limiting friction: \\(\\mu_s mg = 0.5 \\times 20 = 10\\) N.",
          "6 N is below the limit, so the block stays at rest and the friction is 6 N.",
          "12 N is above the limit, so it slides. Kinetic friction: \\(0.4 \\times 20 = 8\\) N.",
          "\\(a = \\dfrac{12 - 8}{2} = 2\\ \\text{m/s}^{2}\\).",
        ],
        answer: "6 N; then \\(2\\ \\text{m/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A car moving at 20 m/s brakes hard and skids, with \\(\\mu_k = 0.5\\) between the tyres and the road. How far does it go before stopping (g = 10 m/s²)?",
        steps: [
          "The retardation is \\(\\mu_k g = 0.5 \\times 10 = 5\\ \\text{m/s}^{2}\\).",
          "\\(s = \\dfrac{u^{2}}{2a} = \\dfrac{400}{10} = 40\\) m.",
        ],
        answer: "40 m",
      },
      practiceSet: [
        { prompt: "Does the limiting friction between two surfaces depend on the area of contact?", answer: "No" },
        { prompt: "For a given pair of surfaces, which is larger: \\(\\mu_s\\) or \\(\\mu_k\\)?", answer: "\\(\\mu_s\\)" },
        { prompt: "A 5 kg box rests on a floor with \\(\\mu_s = 0.4\\). What is the largest sideways push it can take without moving (g = 10 m/s²)?", answer: "20 N" },
        { prompt: "A 3 kg block on a floor with \\(\\mu_s = 0.5\\) is pushed sideways with 9 N. What is the friction on it (g = 10 m/s²)?", answer: "9 N (the block does not move)" },
      ],
      pyqExampleId: "064e5eb4-f135-4dbb-bb0d-e93a7734fae9",
      traps: [
        {
          title: "Static friction is only as big as it needs to be",
          body: "Below the limit, static friction equals the applied force, not \\(\\mu_s N\\). A 2.5 N push on a block whose limit is 10 N meets 2.5 N of friction.",
        },
        {
          title: "The mass cancels",
          body: "The largest acceleration before a box on a vehicle's floor slips is \\(\\mu_s g\\). The box's mass does not enter, so a given mass in the question is not needed.",
        },
        {
          title: "Sliding friction is smaller",
          body: "Once a body slides, friction drops from the limit \\(\\mu_s N\\) to \\(\\mu_k N\\). Use \\(\\mu_k\\) for anything that is already moving.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphlm-incline",
      name: "Motion on an inclined plane",
      intuition:
        "On a slope, split the weight into two parts. One part pulls the body down along the slope; the other presses it into the slope and sets the normal reaction. On a smooth slope only the first part matters. On a rough slope friction also acts along the slope, against the motion, and it is set by the second part.",
      definition:
        "- Weight along the slope: \\(mg\\sin\\theta\\). Weight into the slope: \\(mg\\cos\\theta\\), so \\(N = mg\\cos\\theta\\) when nothing else pushes across the slope.\n" +
        "- Smooth slope, sliding down: \\(a = g\\sin\\theta\\). Pulled up along the slope by a cord of tension T: \\(T - mg\\sin\\theta = ma\\).\n" +
        "- Rough slope, sliding down: \\(a = g(\\sin\\theta - \\mu_k\\cos\\theta)\\). Moving up: the retardation is \\(g(\\sin\\theta + \\mu_k\\cos\\theta)\\).\n" +
        "- **Angle of repose:** a block just begins to slide when \\(\\tan\\theta = \\mu_s\\).\n" +
        "- From rest down a length L: \\(L = \\tfrac{1}{2}at^{2}\\), so \\(t \\propto \\dfrac{1}{\\sqrt{a}}\\).",
      formula: {
        label: "Inclined plane",
        latex: "a_{\\text{down}} = g(\\sin\\theta - \\mu_k\\cos\\theta), \\qquad N = mg\\cos\\theta, \\qquad \\tan\\theta_{\\text{repose}} = \\mu_s",
      },
      authoredExample: {
        prompt:
          "A block slides down a rough slope with \\(\\sin\\theta = 0.6\\) and \\(\\cos\\theta = 0.8\\). If \\(\\mu_k = 0.5\\), find its acceleration (g = 10 m/s²).",
        steps: [
          "\\(a = g(\\sin\\theta - \\mu_k\\cos\\theta) = 10(0.6 - 0.5 \\times 0.8)\\).",
          "\\(a = 10 \\times 0.2 = 2\\ \\text{m/s}^{2}\\).",
        ],
        answer: "\\(2\\ \\text{m/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A block is sent up a rough slope of 30°, with \\(\\mu_k = 0.2\\sqrt{3}\\). Find its retardation while it moves up (g = 10 m/s²).",
        steps: [
          "Going up, gravity's part and friction both act down the slope.",
          "\\(g(\\sin 30^\\circ + \\mu_k\\cos 30^\\circ) = 10\\left(0.5 + 0.2\\sqrt{3} \\times \\dfrac{\\sqrt{3}}{2}\\right) = 10(0.5 + 0.3)\\).",
          "Retardation \\(= 8\\ \\text{m/s}^{2}\\).",
        ],
        answer: "\\(8\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A block just begins to slide when a rough slope is raised to 45°. What is \\(\\mu_s\\)?", answer: "1" },
        { prompt: "A 2 kg block rests on a smooth slope of 60°. What is the normal reaction on it (g = 10 m/s²)?", answer: "10 N" },
        { prompt: "What is the acceleration of a block sliding down a smooth slope of 30° (g = 10 m/s²)?", answer: "\\(5\\ \\text{m/s}^{2}\\)" },
        { prompt: "What force along a smooth 30° slope holds a 2 kg box at rest (g = 10 m/s²)?", answer: "10 N, up the slope" },
      ],
      pyqExampleId: "6f83bb00-03f5-469d-a65a-16d1add60d4f",
      traps: [
        {
          title: "Times compare as square roots",
          body: "From rest over the same length, \\(t \\propto 1/\\sqrt{a}\\). Taking twice as long means a quarter of the acceleration, not half.",
        },
        {
          title: "Friction on a slope uses cos θ",
          body: "On a slope \\(N = mg\\cos\\theta\\), so friction is \\(\\mu mg\\cos\\theta\\), not \\(\\mu mg\\).",
        },
        {
          title: "Going up, both forces slow it",
          body: "A body moving up a rough slope has gravity's part and friction both pointing down the slope, so the retardation is \\(g(\\sin\\theta + \\mu_k\\cos\\theta)\\), with a plus sign.",
        },
      ],
    },
  ],
};
