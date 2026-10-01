import type { SubtopicNote } from "@/app/notes/_types";

export const WORK_WEP_NOTE: SubtopicNote = {
  subtopicName: "Work Done by Constant and Variable Forces",
  title: "Work Done by Constant and Variable Forces",
  oneLineDefinition:
    "Work is force times displacement along the force: a dot product for a constant force, and an integral of F dx when the force changes with position.",
  whyItMatters:
    "Nineteen PYQs, nine of them multiple choice, and one from 2026. Five take the dot product of a constant force with a displacement or judge the sign of a work; ten integrate a force that changes with position, six of them along a line, two in a plane, one as areas under F–x graphs and one with a force that turns as it moves; four slow a block with a force that grows with distance. More than half ask for a number, so the arithmetic has to be exact.",
  concepts: [
    // C1 — constant force
    {
      kind: "formula" as const,
      slug: "jpwep-constant-force",
      name: "Work done by a constant force",
      intuition:
        "Only the part of a force that lies along the displacement does work. That is why work is a dot product: a force along the motion does positive work, a force against it does negative work, and a force at right angles does none. Work is a scalar, so with several forces you may add the forces first or add their works; the answer is the same.",
      definition:
        "- \\(W = \\vec F\\cdot\\vec s = Fs\\cos\\theta = F_x s_x + F_y s_y + F_z s_z\\).\n" +
        "- The displacement is final position minus initial position: \\(\\vec s = \\vec r_2 - \\vec r_1\\).\n" +
        "- A distance d along a direction \\(\\vec a\\) is \\(\\vec s = d\\,\\dfrac{\\vec a}{|\\vec a|}\\): 10 m along \\(3\\hat i + 4\\hat j\\) is \\(6\\hat i + 8\\hat j\\).\n" +
        "- Several forces: \\(W = (\\vec F_1 + \\vec F_2)\\cdot\\vec s = W_1 + W_2\\).\n" +
        "- Sign: \\(\\theta < 90^{\\circ}\\) positive, \\(\\theta = 90^{\\circ}\\) zero, \\(\\theta > 90^{\\circ}\\) negative.\n" +
        "- Gravity on a bucket being lifted does negative work; the person lifting does positive work. Kinetic friction on a sliding body and air resistance on a swinging pendulum do negative work.\n" +
        "- Zero work means \\(\\vec F \\perp \\vec s\\): set \\(\\vec F\\cdot\\vec s = 0\\) to find an unknown component.",
      formula: {
        label: "Work by a constant force",
        latex: "W = \\vec F\\cdot\\vec s = Fs\\cos\\theta = F_x s_x + F_y s_y + F_z s_z",
      },
      authoredExample: {
        prompt:
          "A constant force \\(\\vec F = (4\\hat i - 2\\hat j + 3\\hat k)\\) N moves a particle from the point \\((1, 2, 0)\\) m to the point \\((3, -1, 2)\\) m. Find the work done.",
        steps: [
          "Displacement: \\(\\vec s = (3 - 1)\\hat i + (-1 - 2)\\hat j + (2 - 0)\\hat k = 2\\hat i - 3\\hat j + 2\\hat k\\) m.",
          "\\(W = (4)(2) + (-2)(-3) + (3)(2) = 8 + 6 + 6\\).",
        ],
        answer: "\\(20\\) J",
      },
      selfCheckExample: {
        prompt:
          "Two forces \\((2\\hat i + \\hat j)\\) N and \\((\\hat i + 3\\hat j + 2\\hat k)\\) N act together on a body, which moves 15 m along the direction \\(4\\hat i + 3\\hat j\\). Find the total work done.",
        steps: [
          "Net force: \\(3\\hat i + 4\\hat j + 2\\hat k\\) N.",
          "Unit vector along \\(4\\hat i + 3\\hat j\\): \\((4\\hat i + 3\\hat j)/5\\), so \\(\\vec s = 12\\hat i + 9\\hat j\\) m.",
          "\\(W = (3)(12) + (4)(9) + (2)(0) = 36 + 36\\).",
        ],
        answer: "\\(72\\) J",
      },
      practiceSet: [
        { prompt: "A force \\((2\\hat i + 3\\hat j)\\) N acts through a displacement \\((4\\hat i - \\hat j)\\) m. Find the work.", answer: "\\(5\\) J" },
        { prompt: "A 10 N force acts at 60° to a displacement of 4 m. Find the work.", answer: "\\(20\\) J" },
        { prompt: "\\(\\vec F = (\\hat i + b\\hat j + 2\\hat k)\\) N and \\(\\vec s = (3\\hat i + 2\\hat j - \\hat k)\\) m. The work is zero. Find b.", answer: "\\(b = -\\tfrac{1}{2}\\)" },
        { prompt: "A ball is thrown straight up. What is the sign of the work done by gravity while it rises?", answer: "Negative" },
      ],
      pyqExampleId: "534a8114-ca50-48a8-870f-8389e67eb72e", // 4 Apr 2026 S1: two forces, 25 m along a direction
      traps: [
        {
          title: "A distance along a direction needs the unit vector",
          body: "Moving 10 m along 3î + 4ĵ means a displacement of 6î + 8ĵ, because |3î + 4ĵ| = 5. Multiplying the direction vector by 10 gives 30î + 40ĵ, a displacement five times too long.",
        },
        {
          title: "A force that balances friction does positive work",
          body: "A box pulled at constant velocity on a rough floor has zero net work done on it. The pull still does positive work; friction does an equal negative work. Saying the applied force does zero work confuses one force's work with the net work.",
        },
      ],
    },

    // C2 — variable force
    {
      kind: "formula" as const,
      slug: "jpwep-force-integral",
      name: "Work done by a force that varies with position",
      intuition:
        "When the force changes as the body moves, cut the path into small steps. Each step does F dx of work, and adding the steps is an integral. On an F–x graph the same sum is the area under the curve. In a plane, the x-part of the force works only through dx and the y-part only through dy.",
      definition:
        "- One dimension: \\(W = \\displaystyle\\int_{x_1}^{x_2} F(x)\\,dx\\).\n" +
        "- On an F–x graph, W is the area between the curve and the x-axis. Area below the axis counts as negative work.\n" +
        "- In a plane: \\(W = \\displaystyle\\int \\vec F\\cdot d\\vec r = \\int F_x\\,dx + \\int F_y\\,dy\\).\n" +
        "- If \\(F_x\\) depends only on x and \\(F_y\\) only on y, each integral runs between its own end values and the path does not matter.\n" +
        "- If \\(F_x\\) contains y (such as \\(x^{2}y\\)), the work depends on the path: put the path's equation in before integrating.\n" +
        "- A force of fixed size F whose direction makes an angle \\(\\theta(x)\\) with the motion: \\(W = \\displaystyle\\int F\\cos\\theta(x)\\,dx\\).\n" +
        "- When this is the only force that does work, the same integral is the change in kinetic energy.",
      formula: {
        label: "Work by a variable force",
        latex: "W = \\int_{x_1}^{x_2} F(x)\\,dx \\qquad W = \\int F_x\\,dx + \\int F_y\\,dy",
      },
      authoredExample: {
        prompt:
          "A force \\(F = (6x^{2} - 4x)\\) N acts along the x-axis. Find the work it does as the body moves from \\(x = 1\\) m to \\(x = 3\\) m.",
        steps: [
          "\\(W = \\displaystyle\\int_{1}^{3}(6x^{2} - 4x)\\,dx = \\Big[2x^{3} - 2x^{2}\\Big]_{1}^{3}\\).",
          "At \\(x = 3\\): \\(54 - 18 = 36\\). At \\(x = 1\\): \\(2 - 2 = 0\\).",
          "\\(W = 36 - 0\\).",
        ],
        answer: "\\(36\\) J",
      },
      selfCheckExample: {
        prompt:
          "A force \\(\\vec F = (2x\\,\\hat i + 3y^{2}\\,\\hat j)\\) N acts on a particle that moves in the xy-plane from \\((1, 0)\\) m to \\((2, 2)\\) m. Find the work done.",
        steps: [
          "\\(F_x\\) depends only on x and \\(F_y\\) only on y, so each integral uses its own limits.",
          "\\(\\displaystyle\\int_{1}^{2} 2x\\,dx = \\Big[x^{2}\\Big]_{1}^{2} = 4 - 1 = 3\\) J.",
          "\\(\\displaystyle\\int_{0}^{2} 3y^{2}\\,dy = \\Big[y^{3}\\Big]_{0}^{2} = 8\\) J.",
          "\\(W = 3 + 8\\).",
        ],
        answer: "\\(11\\) J",
      },
      practiceSet: [
        { prompt: "\\(F = 3x^{2}\\) N acts from \\(x = 0\\) to \\(x = 2\\) m. Find the work.", answer: "\\(8\\) J" },
        { prompt: "\\(F = (2 + 4x)\\) N acts from \\(x = 1\\) m to \\(x = 3\\) m. Find the work.", answer: "\\(20\\) J" },
        { prompt: "A force is 10 N from \\(x = 0\\) to 2 m and \\(-5\\) N from \\(x = 2\\) to 4 m. Find the total work.", answer: "\\(10\\) J" },
        { prompt: "\\(F = a + bx^{2}\\) with \\(a = 2\\) N does 15 J of work over the first 3 m from the origin. Find b.", answer: "\\(b = 1\\ \\text{N/m}^{2}\\)" },
      ],
      pyqExampleId: "983da4ec-b1e9-464a-8496-639d771d7ac9", // 24 Jan 2025: F = α + βx², find β from the work
      traps: [
        {
          title: "Area below the axis is negative work",
          body: "On an F–x graph, the parts of the curve below the x-axis are a force opposing the motion. Their area is subtracted. Adding every area as positive puts the graphs in the wrong order.",
        },
        {
          title: "A force like x²y î depends on the path",
          body: "If the x-component of a force contains y, the integral of Fₓ dx cannot be done until y is written in terms of x along the path. Integrating it with y held constant gives a number that belongs to no path.",
        },
      ],
    },

    // C3 — retarding force that grows with distance
    {
      kind: "formula" as const,
      slug: "jpwep-retarding-force",
      name: "Slowing down under a retarding force that depends on position",
      intuition:
        "A rough patch or a damping force that grows with distance takes kinetic energy away, and the amount it takes is the work it does. So the speed after the patch comes from one energy balance, and the stopping point is where that work has used up all the starting kinetic energy.",
      definition:
        "- Retarding force \\(F = -kx\\) between \\(x = a\\) and \\(x = b\\): work \\(= -\\dfrac{k}{2}(b^{2} - a^{2})\\).\n" +
        "- Speed after the patch: \\(\\tfrac12 mv^{2} = \\tfrac12 mu^{2} - \\dfrac{k}{2}(b^{2} - a^{2})\\).\n" +
        "- Stopping distance from the origin with \\(ma = -\\alpha x^{n}\\): \\(\\dfrac{\\alpha x^{n+1}}{n+1} = \\tfrac12 mv_0^{2}\\).\n" +
        "- A retardation \\(a(x)\\) given per unit mass: loss of kinetic energy \\(= m\\displaystyle\\int a\\,dx\\).\n" +
        "- The same result comes from \\(v\\,\\dfrac{dv}{dx} = a\\), integrated on both sides.",
      formula: {
        label: "Energy after a position-dependent retarding force",
        latex: "\\tfrac12 mv^{2} = \\tfrac12 mu^{2} - \\int_{a}^{b}|F(x)|\\,dx",
      },
      authoredExample: {
        prompt:
          "A 2 kg block moving at 5 m/s enters a rough patch that runs from \\(x = 1\\) m to \\(x = 3\\) m. In the patch the retarding force is \\(F = -3x\\) N. Find the block's speed as it leaves the patch.",
        steps: [
          "Work by the force: \\(-\\displaystyle\\int_{1}^{3} 3x\\,dx = -\\tfrac{3}{2}(9 - 1) = -12\\) J.",
          "Starting kinetic energy: \\(\\tfrac12 (2)(5)^{2} = 25\\) J.",
          "Final kinetic energy: \\(25 - 12 = 13\\) J, so \\(\\tfrac12 (2)v^{2} = 13\\) and \\(v^{2} = 13\\).",
        ],
        answer: "\\(v = \\sqrt{13} \\approx 3.6\\) m/s",
      },
      selfCheckExample: {
        prompt:
          "A 0.5 kg particle leaves the origin at 4 m/s along the x-axis. A retarding force of size \\(2x^{3}\\) N acts on it. Where does it stop?",
        steps: [
          "Work against the force up to x: \\(\\displaystyle\\int_{0}^{x} 2x^{3}\\,dx = \\dfrac{x^{4}}{2}\\).",
          "Starting kinetic energy: \\(\\tfrac12 (0.5)(16) = 4\\) J.",
          "\\(\\dfrac{x^{4}}{2} = 4 \\Rightarrow x^{4} = 8\\).",
        ],
        answer: "\\(x = 8^{1/4} \\approx 1.68\\) m",
      },
      practiceSet: [
        { prompt: "\\(F = -4x\\) N acts from \\(x = 0\\) to \\(x = 2\\) m. Find the work it does.", answer: "\\(-8\\) J" },
        { prompt: "A 1 kg block at 6 m/s loses 10 J crossing a rough patch. Find its speed after the patch.", answer: "\\(4\\) m/s" },
        { prompt: "A body of mass m starts at the origin with speed \\(v_0\\), and \\(ma = -kx\\). How far does it go before it stops?", answer: "\\(v_0\\sqrt{m/k}\\)" },
        { prompt: "A 2 kg body has a retardation of \\(3x\\) m/s² (x in metres). Find its loss of kinetic energy over the first 2 m.", answer: "\\(12\\) J" },
      ],
      pyqExampleId: "2d7466af-639d-4806-b9dc-1782d5701425", // 3 Apr 2025: rough region with F = −kx between two x-values
      traps: [
        {
          title: "Use the patch's end points, not its length",
          body: "For F = −kx between x = 1 m and x = 3 m, the work is (k/2)(3² − 1²) = 4k. Using the length, (k/2)(2)² = 2k, treats the patch as if it began at the origin.",
        },
        {
          title: "A retarding force takes energy away",
          body: "Its work is subtracted from the starting kinetic energy. Adding it gives a final speed larger than the starting speed, which a slowing force can never produce.",
        },
      ],
    },
  ],
};
