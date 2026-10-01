import type { SubtopicNote } from "@/app/notes/_types";

export const EQUILIBRIUM_LOM_NOTE: SubtopicNote = {
  subtopicName: "Equilibrium of Forces",
  title: "Equilibrium of Forces",
  oneLineDefinition:
    "A body at rest or moving at constant velocity has zero net force, so the forces along any two perpendicular directions each add to zero.",
  whyItMatters:
    "Seventeen PYQs, fourteen of them multiple choice, and one from 2026. Ten balance the strings, chains and forces that meet at a point: two strings from a ceiling, a rope pulled sideways at its middle, a hanging chain. Seven find a normal reaction or a support force: a roller pushed at an angle, a block held on a smooth incline, and three rigid bodies (a ladder, a hinged rod, a bar on a shoulder) that need moments as well.",
  concepts: [
    // C1 — forces meeting at a point
    {
      kind: "formula" as const,
      slug: "jplom-force-balance",
      name: "Strings, chains and forces at a point",
      intuition:
        "Pick the point or body that is at rest and resolve every force on it along two perpendicular lines, usually horizontal and vertical. The horizontal balance fixes how the tensions compare; the vertical balance fixes how big they are. A rope or chain can be cut anywhere: each piece is in equilibrium on its own.",
      definition:
        "- At rest: \\(\\sum F_x = 0\\) and \\(\\sum F_y = 0\\). Three forces in equilibrium form a closed triangle, head to tail.\n" +
        "- Two strings from a ceiling at \\(\\theta_1\\) and \\(\\theta_2\\) to the horizontal: \\(T_1\\cos\\theta_1 = T_2\\cos\\theta_2\\) and \\(T_1\\sin\\theta_1 + T_2\\sin\\theta_2 = mg\\). The steeper string carries more.\n" +
        "- A horizontal force F at a rope's midpoint: the lower half carries only mg, so the upper half makes \\(\\tan\\theta = F/mg\\) with the vertical.\n" +
        "- A chain of mass m hanging between two supports at \\(\\theta\\) to the horizontal: each half's weight is held by \\(T\\sin\\theta = mg/2\\); the tension at the lowest point is the horizontal part, \\(T_0 = T\\cos\\theta = \\tfrac{mg}{2}\\cot\\theta\\).\n" +
        "- A chain holding a load: the support carries the chain's weight plus the load.\n" +
        "- The force that restores equilibrium is minus the sum of the others.",
      formula: {
        label: "Equilibrium at a point",
        latex: "\\sum F_x = 0,\\quad \\sum F_y = 0, \\qquad T_0 = \\frac{mg}{2}\\cot\\theta",
      },
      authoredExample: {
        prompt:
          "A 6 kg lamp hangs from two strings that make \\(30^{\\circ}\\) and \\(60^{\\circ}\\) with the ceiling. Find both tensions. (g = 10 m/s²)",
        steps: [
          "Horizontal: \\(T_1\\cos 30^{\\circ} = T_2\\cos 60^{\\circ}\\), so \\(T_2 = \\sqrt{3}\\,T_1\\).",
          "Vertical: \\(T_1\\sin 30^{\\circ} + T_2\\sin 60^{\\circ} = 60\\), so \\(\\tfrac{1}{2}T_1 + \\tfrac{3}{2}T_1 = 60\\).",
          "\\(2T_1 = 60\\): \\(T_1 = 30\\) N in the \\(30^{\\circ}\\) string and \\(T_2 = 30\\sqrt{3} \\approx 52\\) N in the \\(60^{\\circ}\\) string.",
        ],
        answer: "30 N (the \\(30^{\\circ}\\) string) and \\(30\\sqrt{3}\\) N (the \\(60^{\\circ}\\) string).",
      },
      selfCheckExample: {
        prompt:
          "A 4 kg chain hangs between two hooks at the same level. At each hook it makes \\(45^{\\circ}\\) with the horizontal. Find the tension at a hook and at the lowest point. (g = 10 m/s²)",
        steps: [
          "Each half weighs 20 N: \\(T\\sin 45^{\\circ} = 20\\), so \\(T = 20\\sqrt{2} \\approx 28\\) N.",
          "Lowest point: \\(T_0 = T\\cos 45^{\\circ} = 20\\) N.",
        ],
        answer: "\\(20\\sqrt{2}\\) N at a hook; 20 N at the lowest point.",
      },
      practiceSet: [
        { prompt: "A 5 kg mass hangs on a rope. A horizontal 50 N force is applied at the rope's midpoint. Angle of the upper half with the vertical? (g = 10 m/s²)", answer: "\\(45^{\\circ}\\)" },
        { prompt: "A 20 N load hangs from a tree by a chain of mass 2 kg. Force on the branch? (g = 10 m/s²)", answer: "40 N" },
        { prompt: "Forces \\(3\\hat i\\) N and \\(-4\\hat j\\) N act on a body. What single extra force keeps it in equilibrium?", answer: "\\((-3\\hat i + 4\\hat j)\\) N, of size 5 N" },
        { prompt: "A string at \\(60^{\\circ}\\) to a vertical wall holds a 3 kg ball against a horizontal push F. Tension? (g = 10 m/s²)", answer: "60 N" },
      ],
      pyqExampleId: "1bf5edfa-81b4-43cc-857a-89cb723dcdaf", // 2026: chain at 30° to the horizontal, tension at the lowest point
      traps: [
        {
          title: "The lower half of the rope carries only the weight",
          body: "With a sideways force at the midpoint, the rope below that point still hangs straight and holds mg. Only the upper half tilts, and its angle comes from tan θ = F/mg.",
        },
        {
          title: "The lowest-point tension is not half the weight",
          body: "At the lowest point the chain is horizontal, so its tension is the horizontal part of the support tension, (mg/2) cot θ. Half the weight is the vertical part at each support.",
        },
        {
          title: "The steeper string carries more",
          body: "A string close to vertical does most of the lifting. If an answer gives the larger tension to the flatter string, the cosines have been swapped.",
        },
      ],
    },

    // C2 — normal reactions and supports
    {
      kind: "formula" as const,
      slug: "jplom-supports",
      name: "Normal reactions, smooth inclines and supports",
      intuition:
        "A surface pushes back with whatever force is needed to stop the body sinking into it, always perpendicular to the surface. So the normal reaction is not mg as soon as anything else presses or pulls. On a smooth incline the body stays still only if some force cancels the part of its weight along the slope.",
      definition:
        "- N is perpendicular to the surface and takes whatever value the other forces need.\n" +
        "- A force F at \\(\\theta\\) to a level floor: pushing down, \\(N = mg + F\\sin\\theta\\); pulling up, \\(N = mg - F\\sin\\theta\\).\n" +
        "- Smooth incline, block held by a horizontal force: \\(F\\cos\\theta = mg\\sin\\theta\\), so \\(F = mg\\tan\\theta\\) and \\(N = mg/\\cos\\theta\\).\n" +
        "- Smooth incline with a counter-mass hanging over a pulley, at rest: \\(m_2 g = m_1 g\\sin\\theta\\) and \\(N = m_1 g\\cos\\theta\\).\n" +
        "- Constant velocity is equilibrium: on a smooth slope the applied force cancels \\(mg\\sin\\theta\\).\n" +
        "- A ladder, rod or bar also needs zero turning effect: take moments about a point where an unknown force acts. A smooth wall or shoulder pushes perpendicular to its own surface.",
      formula: {
        label: "Normal reaction",
        latex: "N = mg \\pm F\\sin\\theta, \\qquad F_{\\text{horizontal}} = mg\\tan\\theta",
      },
      authoredExample: {
        prompt:
          "A 50 kg roller on level ground is acted on by a 300 N force at \\(37^{\\circ}\\) to the horizontal (\\(\\sin 37^{\\circ} = 0.6\\)). Find the normal reaction when the force (a) pulls upward and (b) pushes downward. (g = 10 m/s²)",
        steps: [
          "The vertical part of the force is \\(300 \\times 0.6 = 180\\) N.",
          "(a) Pulling up lifts part of the weight: \\(N = 500 - 180 = 320\\) N.",
          "(b) Pushing down adds to the weight: \\(N = 500 + 180 = 680\\) N.",
        ],
        answer: "(a) 320 N; (b) 680 N.",
      },
      selfCheckExample: {
        prompt:
          "A 0.5 kg block is held at rest on a smooth \\(30^{\\circ}\\) incline by a horizontal force. Find the force and the normal reaction. (g = 10 m/s²)",
        steps: [
          "Along the slope: \\(F\\cos 30^{\\circ} = mg\\sin 30^{\\circ}\\), so \\(F = 5\\tan 30^{\\circ} = 5/\\sqrt{3} \\approx 2.9\\) N.",
          "Perpendicular to the slope: \\(N = mg\\cos 30^{\\circ} + F\\sin 30^{\\circ} = mg/\\cos 30^{\\circ} = 10/\\sqrt{3} \\approx 5.8\\) N.",
        ],
        answer: "\\(F \\approx 2.9\\) N; \\(N \\approx 5.8\\) N.",
      },
      practiceSet: [
        { prompt: "On a smooth incline a 10 kg block is held by a string over a pulley at the top to a hanging 6 kg block, all at rest. sin θ and the normal reaction? (g = 10 m/s²)", answer: "\\(\\sin\\theta = 0.6\\); N = 80 N" },
        { prompt: "A 2 kg block is pushed at constant speed up a smooth \\(30^{\\circ}\\) slope by a force along the slope. The force? (g = 10 m/s²)", answer: "10 N" },
        { prompt: "A uniform 4 m ladder weighing 200 N leans on a smooth wall with its foot 2 m out. Push of the wall?", answer: "\\(100/\\sqrt{3} \\approx 58\\) N" },
        { prompt: "A 20 kg box is pulled by 100 N at \\(30^{\\circ}\\) above the horizontal. Normal reaction? (g = 10 m/s²)", answer: "150 N" },
      ],
      pyqExampleId: "9436a656-4baa-4158-9735-751e11e9a0d3", // 2023: garden roller pushed down at 30°, N = 800 N
      traps: [
        {
          title: "N is not always mg",
          body: "Any force with a vertical part changes the normal reaction. A push down at an angle adds F sin θ; a pull up takes it away. Writing N = mg here gives one of the wrong options.",
        },
        {
          title: "Constant velocity means zero net force",
          body: "A body moving at steady speed is in equilibrium, exactly as if it were at rest. The applied force only cancels the other forces; it does not exceed them.",
        },
        {
          title: "A smooth contact pushes perpendicular to the surface",
          body: "A bar on a smooth shoulder or a ladder on a smooth wall feels a force at right angles to the contact surface, not straight up. Taking it as vertical changes the answer.",
        },
      ],
    },
  ],
};
