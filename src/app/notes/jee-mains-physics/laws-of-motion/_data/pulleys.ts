import type { SubtopicNote } from "@/app/notes/_types";

export const PULLEYS_LOM_NOTE: SubtopicNote = {
  subtopicName: "Connected Bodies and Pulleys",
  title: "Connected Bodies and Pulleys",
  oneLineDefinition:
    "Bodies tied by a taut string move together, so treat them as one system to find the acceleration, then cut the string at one body to find the tension.",
  whyItMatters:
    "Twenty PYQs, sixteen of them multiple choice, and two from 2026. Twelve move as one system with one acceleration: Atwood machines (four of them ask only for a mass ratio), blocks pulled in a line, masses hanging in series, a chain over a pulley. Four add a movable pulley, where the bodies' accelerations differ; four add friction on a table or an incline.",
  concepts: [
    // C1 — one system, one acceleration
    {
      kind: "formula" as const,
      slug: "jplom-common-acceleration",
      name: "One acceleration, then one tension at a time",
      intuition:
        "If the string stays taut, every body on it moves with the same size of acceleration. So first take all of them together: the tensions inside the system cancel, and the acceleration is the net driving force over the total mass. Then cut the string next to one body and apply F = ma to that body alone to get the tension.",
      definition:
        "- System: \\(a = \\dfrac{\\text{net driving force}}{\\text{total mass}}\\). Tensions inside the system cancel.\n" +
        "- Atwood machine: \\(a = \\dfrac{(m_2 - m_1)g}{m_1 + m_2}\\), \\(T = \\dfrac{2m_1m_2g}{m_1 + m_2}\\).\n" +
        "- Blocks pulled in a line on a smooth floor: the tension in a string is the mass BEHIND it times a.\n" +
        "- A hanging body: \\(T = m(g - a)\\) if it accelerates down, \\(m(g + a)\\) if up. Masses hanging in series: the top string holds everything below it.\n" +
        "- Double incline: each block's weight is replaced by \\(mg\\sin\\theta\\) on its own face.\n" +
        "- Chain of length L over a pulley, l on the short side: \\(a = \\dfrac{(L - 2l)g}{L}\\). Balls or chain over a table edge: \\(a = \\dfrac{\\text{hanging mass}}{\\text{total mass}}\\,g\\).\n" +
        "- A spring between two bodies pushes or pulls both with the same force, in opposite directions.",
      formula: {
        label: "Atwood machine",
        latex: "a = \\frac{(m_2 - m_1)g}{m_1 + m_2}, \\qquad T = \\frac{2m_1m_2\\,g}{m_1 + m_2}",
      },
      authoredExample: {
        prompt:
          "Masses of 3 kg and 7 kg hang over a smooth pulley. A 2 kg mass hangs below the 7 kg mass on a second string. Find the acceleration and both tensions. (g = 10 m/s²)",
        steps: [
          "System: 9 kg on one side, 3 kg on the other, 12 kg in all. \\(a = \\dfrac{(9 - 3)(10)}{12} = 5\\ \\text{m/s}^{2}\\).",
          "Cut at the 3 kg mass, which rises: \\(T_1 = 3(10 + 5) = 45\\) N.",
          "Cut the lower string at the 2 kg mass, which falls: \\(T_2 = 2(10 - 5) = 10\\) N.",
          "Check the 7 kg mass: \\(70 + 10 - 45 = 35 = 7 \\times 5\\).",
        ],
        answer: "\\(5\\ \\text{m/s}^{2}\\); 45 N in the main string and 10 N in the lower string.",
      },
      selfCheckExample: {
        prompt:
          "A uniform chain 3 m long hangs over a smooth pulley, with 1 m on one side. Find its acceleration when it is released.",
        steps: [
          "The extra 1 m on the long side drives the whole chain: \\(a = \\dfrac{(L - 2l)g}{L} = \\dfrac{(3 - 2)g}{3}\\).",
        ],
        answer: "\\(g/3\\)",
      },
      practiceSet: [
        { prompt: "Blocks of 2 kg, 3 kg and 5 kg are tied in a line on a smooth floor and the 5 kg block is pulled with 40 N. Tension in the string between 2 kg and 3 kg?", answer: "8 N" },
        { prompt: "An Atwood machine accelerates at g/5. Ratio of the heavier mass to the lighter?", answer: "3 : 2" },
        { prompt: "Eight 1 kg balls are tied in a line on a smooth table; three hang over the edge. Acceleration?", answer: "\\(3g/8\\)" },
        { prompt: "Two 2 kg blocks are joined by a spring. A 20 N force pulls one; the other accelerates at \\(3\\ \\text{m/s}^{2}\\). Acceleration of the pulled block?", answer: "\\(7\\ \\text{m/s}^{2}\\)" },
      ],
      pyqExampleId: "e91e3e49-3609-44bb-b00a-5ddfae73f708", // 2022: chain over a pulley, a = g/2 when l = L/4
      traps: [
        {
          title: "The tension is not the hanging weight",
          body: "A hanging mass that accelerates down pulls with m(g − a), less than mg. Only when nothing moves is the tension equal to the weight.",
        },
        {
          title: "Divide by the total mass",
          body: "The driving force accelerates every body on the string. Dividing by the hanging mass alone gives an acceleration that is far too large.",
        },
        {
          title: "Read which ratio is asked",
          body: "Atwood questions ask for m₁/m₂ in one paper and m₂/m₁ in another, and the stem may name either mass as the heavier one. Decide which is heavier before writing the ratio: the heavier over the lighter is always above 1.",
        },
      ],
    },

    // C2 — constraints and movable pulleys
    {
      kind: "formula" as const,
      slug: "jplom-constraints",
      name: "Movable pulleys and string constraints",
      intuition:
        "A string does not stretch, so its total length is fixed. When a pulley hangs in a loop of the string, the load rises or falls by half as much as the free end moves, so its acceleration is half. Write this link between the accelerations first; then the force equations have only one unknown acceleration.",
      definition:
        "- Write the string's length in terms of the positions of the bodies, keep it constant, and differentiate twice.\n" +
        "- A movable pulley held by two segments of one string moves half as far as the free end: \\(a_{\\text{load}} = a_{\\text{end}}/2\\).\n" +
        "- The movable pulley is pulled by 2T (both segments), the free end's body by T.\n" +
        "- General rule: over every point a string pulls, \\(\\sum T_i a_i = 0\\), with each \\(a_i\\) measured along the string.\n" +
        "- A body resting on, or sliding along, a moving block shares that block's acceleration along the direction it cannot move relative to it.",
      formula: {
        label: "Constraint",
        latex: "\\sum T_i\\,a_i = 0, \\qquad a_{\\text{load}} = \\frac{a_{\\text{end}}}{2}",
      },
      authoredExample: {
        prompt:
          "A 6 kg block on a smooth table is tied to a string that runs over a pulley at the edge, down round a movable pulley carrying a 4 kg mass, and up to a fixed hook. Find the accelerations and the tension. (g = 10 m/s²)",
        steps: [
          "Constraint: if the 4 kg mass falls with a, the block moves with 2a.",
          "4 kg mass (pulled up by 2T): \\(40 - 2T = 4a\\).",
          "6 kg block: \\(T = 6(2a) = 12a\\).",
          "\\(40 - 24a = 4a\\), so \\(a = \\tfrac{10}{7} \\approx 1.43\\ \\text{m/s}^{2}\\), the block \\(\\tfrac{20}{7} \\approx 2.86\\ \\text{m/s}^{2}\\) and \\(T = \\tfrac{120}{7} \\approx 17.1\\) N.",
        ],
        answer: "Hanging mass \\(10/7\\ \\text{m/s}^{2}\\), block \\(20/7\\ \\text{m/s}^{2}\\), T ≈ 17.1 N.",
      },
      selfCheckExample: {
        prompt:
          "A 6 kg mass hangs from a movable pulley. One end of the string is fixed to the ceiling; the other passes over a fixed pulley and holds a 1 kg mass. Find both accelerations and the tension. (g = 10 m/s²)",
        steps: [
          "If the 6 kg mass falls with a, the 1 kg mass rises with 2a.",
          "6 kg: \\(60 - 2T = 6a\\). 1 kg: \\(T - 10 = 2a\\), so \\(T = 10 + 2a\\).",
          "\\(60 - 20 - 4a = 6a\\): \\(a = 4\\ \\text{m/s}^{2}\\), the 1 kg mass \\(8\\ \\text{m/s}^{2}\\) up, \\(T = 18\\) N.",
        ],
        answer: "\\(4\\ \\text{m/s}^{2}\\) down and \\(8\\ \\text{m/s}^{2}\\) up; T = 18 N.",
      },
      practiceSet: [
        { prompt: "The free end of a string under a movable pulley is pulled down 40 cm. How far does the load rise?", answer: "20 cm" },
        { prompt: "The free end accelerates at \\(6\\ \\text{m/s}^{2}\\). Acceleration of the load on the movable pulley?", answer: "\\(3\\ \\text{m/s}^{2}\\)" },
        { prompt: "A string pulls a pulley block with three segments of tension T. The block moves 1 cm. How far does the free end move?", answer: "3 cm" },
        { prompt: "With a movable pulley, a hanging 2 kg load is balanced by a mass on the free end. How large is that mass?", answer: "1 kg" },
      ],
      pyqExampleId: "84b1a230-e87e-472d-a639-4ddfb1e75132", // 2024: 2 kg on a 30° incline, 4 kg on a movable pulley, a = g/3
      traps: [
        {
          title: "Equal accelerations do not hold with a movable pulley",
          body: "Only bodies on the same straight run of string share an acceleration. The load on a movable pulley moves at half the rate of the free end; giving both the same a makes every option wrong.",
        },
        {
          title: "The movable pulley feels 2T",
          body: "Two segments of the string pull the movable pulley up, so its force equation has 2T. The body on the free end feels only T.",
        },
      ],
    },

    // C3 — friction inside a pulley system
    {
      kind: "formula" as const,
      slug: "jplom-pulley-friction",
      name: "Friction inside a pulley system",
      intuition:
        "Friction is one more resisting force in the system equation. First check that the system moves at all: if the driving force does not beat the largest static friction, nothing moves and the friction is only as large as the driving force. Friction acts only on surfaces that slide over each other.",
      definition:
        "- Check first: does the driving force exceed \\(\\mu_s N\\)? If not, a = 0 and the friction equals the driving force.\n" +
        "- If it moves: \\(a = \\dfrac{\\text{driving force} - \\mu_k N}{\\text{total mass}}\\). On a table, N is the weight of the block on it.\n" +
        "- Block on an incline tied to a hanging mass: the resisting forces are \\(mg\\sin\\theta\\) and \\(\\mu mg\\cos\\theta\\) if the block is dragged up.\n" +
        "- Stacked blocks: friction acts between two surfaces only if they slide or tend to slide. A free block riding on another at constant velocity feels none.",
      formula: {
        label: "Table block and hanging block",
        latex: "a = \\frac{m_h g - \\mu_k m_t g}{m_h + m_t}",
      },
      authoredExample: {
        prompt:
          "A 30 kg trolley on a table (\\(\\mu_k = 0.1\\)) is tied over a pulley at the edge to a hanging 10 kg block. Find the acceleration and the tension. (g = 10 m/s²)",
        steps: [
          "Driving force 100 N; friction \\(0.1 \\times 300 = 30\\) N.",
          "\\(a = \\dfrac{100 - 30}{40} = 1.75\\ \\text{m/s}^{2}\\).",
          "Hanging block: \\(T = 10(10 - 1.75) = 82.5\\) N. Check the trolley: \\(82.5 - 30 = 52.5 = 30 \\times 1.75\\).",
        ],
        answer: "\\(1.75\\ \\text{m/s}^{2}\\); 82.5 N.",
      },
      selfCheckExample: {
        prompt:
          "A 20 kg block on a table is tied over a pulley to a hanging 2 kg block. The coefficient of friction is 0.15. Does the system move? What is the friction? (g = 10 m/s²)",
        steps: [
          "Driving force: 20 N. Largest static friction: \\(0.15 \\times 200 = 30\\) N.",
          "20 N < 30 N, so nothing moves and the friction is only 20 N.",
        ],
        answer: "It stays at rest; friction 20 N, tension 20 N.",
      },
      practiceSet: [
        { prompt: "A 5 kg block on a \\(37^{\\circ}\\) incline (μ = 0.5) is dragged up by a hanging 6 kg block over a pulley at the top. Acceleration? (g = 10 m/s², sin 37° = 0.6)", answer: "\\(10/11 \\approx 0.91\\ \\text{m/s}^{2}\\)" },
        { prompt: "What hanging mass just starts a 20 kg block on a table with \\(\\mu_s = 0.25\\)?", answer: "5 kg" },
        { prompt: "A block rests freely on top of a block that slides at constant velocity. Friction between them?", answer: "Zero" },
      ],
      pyqExampleId: "baaea3d7-c6b1-42ff-ac78-9febccc63b1f", // 2022: 40 kg block, μ = 0.02, hanging 4 kg, a = 8/11 m/s²
      traps: [
        {
          title: "Check that it moves before using kinetic friction",
          body: "If the driving force is smaller than the largest static friction, the answer is a = 0. Subtracting μN anyway gives a negative acceleration, which means the check was skipped.",
        },
        {
          title: "No sliding, no friction",
          body: "A block lying freely on another block that moves at constant velocity feels no friction, because nothing tries to make it slide. Adding μmg there adds a force that is not present.",
        },
      ],
    },
  ],
};
