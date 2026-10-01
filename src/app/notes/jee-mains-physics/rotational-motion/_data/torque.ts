import type { SubtopicNote } from "@/app/notes/_types";

export const TORQUE_ROT_NOTE: SubtopicNote = {
  subtopicName: "Rotational Kinematics, Torque and Equilibrium",
  title: "Rotational Kinematics, Torque and Equilibrium",
  oneLineDefinition:
    "Angles, angular speeds and angular accelerations follow the same equations as straight-line motion; torque, r × F, is what turns a body, and a body in equilibrium has zero net force and zero net torque.",
  whyItMatters:
    "Seventeen PYQs, fourteen of them multiple choice, and three from 2026. Five are rotational kinematics, with a constant or a time-varying angular acceleration. Eight find a torque from r × F or pick out the correct expressions for it. Four balance a rod, a metre scale or a plate.",
  concepts: [
    // C1 — rotational kinematics
    {
      kind: "formula" as const,
      slug: "jprot-kinematics",
      name: "Rotational kinematics with constant and varying angular acceleration",
      intuition:
        "Rotation about a fixed axis is one-dimensional motion in disguise: angle θ plays the part of distance, ω of speed and α of acceleration. With α constant, the three equations of motion carry over letter for letter. With α changing in time, differentiate or integrate instead.",
      definition:
        "- Constant α: \\(\\omega = \\omega_0 + \\alpha t\\), \\(\\theta = \\omega_0t + \\tfrac{1}{2}\\alpha t^{2}\\), \\(\\omega^{2} = \\omega_0^{2} + 2\\alpha\\theta\\), and \\(\\theta = \\tfrac{1}{2}(\\omega_0 + \\omega)t\\).\n" +
        "- From rest, the angles turned in successive equal time intervals are in the ratio 1 : 3 : 5 : 7.\n" +
        "- Varying α: \\(\\omega = d\\theta/dt\\), \\(\\alpha = d\\omega/dt\\). Given \\(\\alpha(t)\\), integrate twice, using the starting ω and θ as the constants.\n" +
        "- Units: revolutions \\(= \\theta/2\\pi\\); \\(1\\ \\text{rpm} = \\dfrac{2\\pi}{60}\\) rad/s.",
      formula: {
        label: "Equations of rotation with constant angular acceleration",
        latex:
          "\\omega = \\omega_0 + \\alpha t \\qquad \\theta = \\omega_0t + \\tfrac{1}{2}\\alpha t^{2} \\qquad \\omega^{2} = \\omega_0^{2} + 2\\alpha\\theta",
      },
      authoredExample: {
        prompt:
          "A disc spinning at 600 rpm speeds up uniformly to 1200 rpm in 5 s. Find its angular acceleration and the number of revolutions it makes in those 5 s.",
        steps: [
          "Convert: \\(\\omega_0 = 600 \\times \\dfrac{2\\pi}{60} = 20\\pi\\) rad/s and \\(\\omega = 40\\pi\\) rad/s.",
          "\\(\\alpha = \\dfrac{40\\pi - 20\\pi}{5} = 4\\pi\\) rad/s².",
          "\\(\\theta = \\tfrac{1}{2}(\\omega_0 + \\omega)t = \\tfrac{1}{2}(60\\pi)(5) = 150\\pi\\) rad.",
          "Revolutions \\(= 150\\pi/2\\pi = 75\\).",
        ],
        answer: "\\(4\\pi\\) rad/s²; 75 revolutions",
      },
      selfCheckExample: {
        prompt:
          "A body turns through \\(\\theta = 2t^{3} - 3t^{2}\\) radians, with t in seconds. Find its angular velocity and angular acceleration at t = 2 s.",
        steps: [
          "\\(\\omega = \\dfrac{d\\theta}{dt} = 6t^{2} - 6t = 24 - 12 = 12\\) rad/s.",
          "\\(\\alpha = \\dfrac{d\\omega}{dt} = 12t - 6 = 18\\) rad/s².",
        ],
        answer: "12 rad/s; 18 rad/s²",
      },
      practiceSet: [
        { prompt: "Starting from rest with constant α, a wheel turns 4 rad in the first second. The angle it turns in the third second?", answer: "20 rad", method: "1 : 3 : 5" },
        { prompt: "Convert 300 rpm to rad/s.", answer: "\\(10\\pi\\) rad/s" },
        { prompt: "\\(\\alpha = 4t\\) rad/s² and \\(\\omega_0 = 2\\) rad/s. Find ω at t = 3 s.", answer: "20 rad/s", method: "\\(\\omega = 2 + 2t^{2}\\)" },
        { prompt: "A wheel at 20 rad/s slows uniformly to rest in 4 s. The angle it turns?", answer: "40 rad" },
      ],
      pyqExampleId: "88d19b1e-87f1-4eb3-ba2a-48d83925ff4f", // 2026: from rest, angle in the next 2 s over the first 2 s
      traps: [
        {
          title: "rpm left unconverted",
          body: "The equations need ω in rad/s. 600 rpm is 20π rad/s, not 600 and not 10 (that is revolutions per second, still to be multiplied by 2π).",
        },
        {
          title: "The angle in an interval is a difference",
          body: "The angle turned 'in the next 2 s' is θ(4) − θ(2), not θ(2) again with a new start. From rest, consecutive equal intervals give angles in the ratio 1 : 3 : 5.",
        },
      ],
    },

    // C2 — torque as a vector
    {
      kind: "formula" as const,
      slug: "jprot-torque-vector",
      name: "Torque as the cross product of position and force",
      intuition:
        "A force turns a body more when it is applied further from the axis and more nearly at right angles to the line from the axis. The cross product r × F captures both. A force whose line passes through the point gives no torque about it.",
      definition:
        "- \\(\\vec\\tau = \\vec r \\times \\vec F\\), with \\(\\vec r\\) from the chosen point to where the force acts; \\(|\\vec\\tau| = rF\\sin\\theta\\).\n" +
        "- About a point P: \\(\\vec r = \\vec r_{\\text{force}} - \\vec r_P\\).\n" +
        "- In a plane: \\(\\tau_z = xF_y - yF_x\\).\n" +
        "- \\(\\vec\\tau\\) is perpendicular to both \\(\\vec r\\) and \\(\\vec F\\).\n" +
        "- Correct expressions for torque: \\(\\vec r \\times \\vec F\\), \\(\\dfrac{d\\vec L}{dt}\\), \\(\\vec r \\times \\dfrac{d\\vec p}{dt}\\), and Iα for a fixed axis (I is the moment of inertia, met on the next pages). \\(\\vec r \\times \\vec L\\) is NOT a torque.",
      formula: {
        label: "Torque",
        latex:
          "\\vec\\tau = \\vec r \\times \\vec F = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ x & y & z \\\\ F_x & F_y & F_z \\end{vmatrix}",
      },
      authoredExample: {
        prompt:
          "A force \\(\\vec F = (2\\hat i + 3\\hat j - \\hat k)\\) N acts at the point \\(\\vec r = (\\hat i - \\hat j + 2\\hat k)\\) m. Find the torque about the origin.",
        steps: [
          "\\(\\hat i\\): \\((-1)(-1) - (2)(3) = 1 - 6 = -5\\).",
          "\\(\\hat j\\): \\(-[(1)(-1) - (2)(2)] = -[-1 - 4] = 5\\).",
          "\\(\\hat k\\): \\((1)(3) - (-1)(2) = 3 + 2 = 5\\).",
          "\\(\\vec\\tau = (-5\\hat i + 5\\hat j + 5\\hat k)\\) N m, of magnitude \\(5\\sqrt{3}\\) N m.",
        ],
        answer: "\\((-5\\hat i + 5\\hat j + 5\\hat k)\\) N m",
      },
      selfCheckExample: {
        prompt:
          "A force \\((3\\hat i + 4\\hat j)\\) N acts at the point (2, 1) m. Find its torque about the point (−1, 3) m.",
        steps: [
          "\\(\\vec r = (2 - (-1))\\hat i + (1 - 3)\\hat j = 3\\hat i - 2\\hat j\\).",
          "\\(\\tau_z = xF_y - yF_x = (3)(4) - (-2)(3) = 12 + 6 = 18\\).",
        ],
        answer: "\\(18\\hat k\\) N m",
      },
      practiceSet: [
        { prompt: "A force \\(4\\hat j\\) N acts at \\(3\\hat i\\) m. Torque about the origin?", answer: "\\(12\\hat k\\) N m" },
        { prompt: "A force acts along a line through the origin. Its torque about the origin?", answer: "Zero" },
        { prompt: "Which of r × F, dL/dt, r × L and Iα is NOT an expression for torque?", answer: "r × L" },
        { prompt: "A 10 N force acts 0.5 m from a pivot at 30° to the line joining them. Size of the torque?", answer: "2.5 N m" },
      ],
      pyqExampleId: "f832b7c0-3df8-450a-9e5d-3048ad8c5123", // 2026: p, F, L and τ of a particle at t = 1 s
      traps: [
        {
          title: "F × r has the wrong sign",
          body: "The torque is r × F. Writing F × r reverses every component. Keep r in the middle row of the determinant and F in the bottom row.",
        },
        {
          title: "Torque about a point that is not the origin",
          body: "Use the vector from that point to where the force acts, r − r_P. Using the force point's own position vector gives the torque about the origin instead.",
        },
        {
          title: "The middle term of the determinant",
          body: "The ĵ component is −(xF_z − zF_x). Dropping that minus sign is the most common slip in a three-dimensional torque.",
        },
      ],
    },

    // C3 — equilibrium
    {
      kind: "formula" as const,
      slug: "jprot-equilibrium",
      name: "Equilibrium of a rigid body",
      intuition:
        "A body stays at rest only if the forces balance AND the turning effects balance. Torques can be taken about any point, so pick the point where an unknown force acts: that force then drops out. A uniform rod's own weight acts at its middle and must be counted.",
      definition:
        "- \\(\\sum\\vec F = 0\\) and \\(\\sum\\vec\\tau = 0\\) about any point.\n" +
        "- Take torques about the point where an unknown force acts, such as a pivot or a support.\n" +
        "- A uniform rod or metre scale: its weight acts at its centre (the 50 cm mark of a metre scale).\n" +
        "- A uniform bar resting on the ground at one end and held up by a vertical force at the other: torques about the ground end give the holder W/2, at any angle.\n" +
        "- A net force of zero with a nonzero torque (a couple) still turns the body.",
      formula: {
        label: "Conditions for equilibrium",
        latex: "\\sum\\vec F = 0 \\qquad \\sum\\vec\\tau_{\\text{about any point}} = 0",
      },
      authoredExample: {
        prompt:
          "A uniform metre rule of mass 120 g is pivoted at its 30 cm mark. Where must a 300 g mass hang to keep it level?",
        steps: [
          "The rule's weight acts at the 50 cm mark, 20 cm to the right of the pivot: torque \\(120 \\times 20 = 2400\\) g cm.",
          "The 300 g mass must hang to the left, at a distance d: \\(300d = 2400\\), so \\(d = 8\\) cm.",
          "\\(30 - 8 = 22\\).",
        ],
        answer: "At the 22 cm mark",
      },
      selfCheckExample: {
        prompt:
          "A metre scale balances on a knife edge at its 50 cm mark. Two 5 g coins, one on top of the other, are put at the 20 cm mark, and the balance point moves to the 45 cm mark. Find the mass of the scale.",
        steps: [
          "About the new pivot (45 cm), the 10 g of coins is 25 cm to the left: torque 250 g cm.",
          "The scale's weight is at 50 cm, 5 cm to the right: \\(5M = 250\\).",
        ],
        answer: "\\(M = 50\\) g",
      },
      practiceSet: [
        { prompt: "A 2 m uniform plank weighing 200 N rests on supports at its ends. A 100 N load sits 0.5 m from the left end. Force from each support?", answer: "Left 175 N, right 125 N" },
        { prompt: "A uniform bar of weight W has one end on the ground; a person holds the other end up with a vertical force. That force?", answer: "W/2, at any angle" },
        { prompt: "Children of 30 kg and 20 kg balance on a seesaw. The 30 kg child sits 2 m from the pivot. Where does the other sit?", answer: "3 m on the other side" },
        { prompt: "Can a body with zero net force rotate faster and faster?", answer: "Yes, if a couple gives it a net torque" },
      ],
      pyqExampleId: "71fb9a65-2c63-4719-87bf-ebb6afb94acb", // 2025: rod balanced at the 40 cm mark, 400 g at 10 cm
      traps: [
        {
          title: "Forgetting the rod's own weight",
          body: "A metre scale pivoted anywhere but its centre has its own weight acting off the pivot. Leaving it out balances only the hanging masses and gives a wrong answer that is usually among the options.",
        },
        {
          title: "Distances from the end, not from the pivot",
          body: "A mark on a scale is a position. The lever arm is the distance from that mark to the pivot: a mass at the 10 cm mark with the pivot at 40 cm has a 30 cm arm.",
        },
      ],
    },
  ],
};
