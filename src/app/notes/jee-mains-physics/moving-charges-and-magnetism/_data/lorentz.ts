import type { SubtopicNote } from "@/app/notes/_types";

export const LORENTZ_MAG_NOTE: SubtopicNote = {
  subtopicName: "Lorentz Force and Crossed Fields",
  title: "Lorentz Force and Crossed Fields",
  oneLineDefinition:
    "A charge moving through fields feels F = q(E + v × B); the magnetic part is always perpendicular to the velocity, so it bends the path but never changes the speed.",
  whyItMatters:
    "Twenty-one PYQs, fifteen of them multiple choice, and four from 2026. Twelve are about the magnetic force alone: five work out q v × B or use the fact that the acceleration is perpendicular to B, five are statements about its direction and the fact that it does no work, and two put a charge near a current-carrying wire. Nine add an electric field: three are velocity selectors, three send a charge along a solenoid's axis, two ask when a charge can keep a constant velocity, and one finds the velocity from the total force.",
  concepts: [
    // C1 — magnetic force on a moving charge
    {
      kind: "formula" as const,
      slug: "jpmag-force-vector",
      name: "Magnetic force on a moving charge, F = q v × B",
      intuition:
        "A magnetic field pushes only on a moving charge, and it pushes sideways: at right angles both to the velocity and to the field. Because the push is always across the motion, it can turn the charge but never speed it up or slow it down. A charge moving along the field lines feels nothing at all.",
      definition:
        "- \\(\\vec F = q(\\vec v \\times \\vec B)\\), size \\(qvB\\sin\\theta\\), with \\(\\theta\\) the angle between \\(\\vec v\\) and \\(\\vec B\\).\n" +
        "- Direction: \\(\\vec v \\times \\vec B\\) for a positive charge; reversed for an electron, \\(\\vec F = -e(\\vec v \\times \\vec B)\\).\n" +
        "- Work it out by components: \\(\\vec v \\times \\vec B = (v_yB_z - v_zB_y)\\hat i - (v_xB_z - v_zB_x)\\hat j + (v_xB_y - v_yB_x)\\hat k\\).\n" +
        "- \\(\\vec F \\perp \\vec v\\) and \\(\\vec F \\perp \\vec B\\), so \\(\\vec a \\cdot \\vec B = 0\\) and \\(\\vec a \\cdot \\vec v = 0\\). No work is done: speed and kinetic energy stay constant.\n" +
        "- \\(\\vec v \\parallel \\vec B\\): no magnetic force.\n" +
        "- An electric force qE can change the speed; a magnetic force cannot.\n" +
        "- A positive charge moving parallel to a long current, in the same direction, is pulled towards the wire; moving against the current, it is pushed away.",
      formula: {
        label: "Magnetic force",
        latex: "\\vec F = q\\left(\\vec v \\times \\vec B\\right), \\qquad F = qvB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A charge of 2 μC moves with \\(\\vec v = (2\\hat i + 3\\hat j - \\hat k)\\) m/s in a field \\(\\vec B = (\\hat i - \\hat j + 2\\hat k)\\) T. Find the force on it and its size.",
        steps: [
          "\\(\\hat i\\): \\(v_yB_z - v_zB_y = 3(2) - (-1)(-1) = 5\\).",
          "\\(\\hat j\\): \\(-(v_xB_z - v_zB_x) = -(2(2) - (-1)(1)) = -5\\).",
          "\\(\\hat k\\): \\(v_xB_y - v_yB_x = 2(-1) - 3(1) = -5\\). So \\(\\vec v \\times \\vec B = 5\\hat i - 5\\hat j - 5\\hat k\\).",
          "Check: \\((5, -5, -5) \\cdot (2, 3, -1) = 10 - 15 + 5 = 0\\), so the force is perpendicular to v.",
          "\\(\\vec F = 2 \\times 10^{-6}(5\\hat i - 5\\hat j - 5\\hat k) = (10\\hat i - 10\\hat j - 10\\hat k) \\times 10^{-6}\\) N; size \\(10\\sqrt3 \\times 10^{-6} \\approx 1.73 \\times 10^{-5}\\) N.",
        ],
        answer: "\\((10\\hat i - 10\\hat j - 10\\hat k)\\ \\mu\\text{N}\\), size about \\(17.3\\ \\mu\\text{N}\\).",
      },
      selfCheckExample: {
        prompt:
          "A charged particle moves in a uniform field \\(\\vec B = (4\\hat i + 3\\hat j)\\) T and has acceleration \\(\\vec a = (3\\hat i + y\\hat j)\\ \\text{m/s}^{2}\\). Find y.",
        steps: [
          "The magnetic force, and so the acceleration, is perpendicular to B: \\(\\vec a \\cdot \\vec B = 0\\).",
          "\\(3(4) + y(3) = 0\\), so \\(y = -4\\).",
        ],
        answer: "\\(y = -4\\)",
      },
      practiceSet: [
        { prompt: "A proton moves along +x in a magnetic field along +y. In which direction is the magnetic force on it?", answer: "+z" },
        { prompt: "An electron moves along +y in a magnetic field along +z. In which direction is the magnetic force on it?", answer: "−x" },
        { prompt: "A 3 μC charge moves at \\(2 \\times 10^{5}\\) m/s at \\(30^{\\circ}\\) to a 0.5 T field. Size of the magnetic force?", answer: "0.15 N" },
        { prompt: "How much work does the magnetic force do on a charge that goes once round a circle in a uniform magnetic field?", answer: "Zero" },
      ],
      pyqExampleId: "92380662-8dca-4226-8691-02a72822cb71", // 2 Apr 2026 S1: 1 μC, v = (1, −2, 3), B = (2, 3, −5), |F| = √171 μN
      traps: [
        {
          title: "v × B is not B × v",
          body: "The cross product changes sign when the order is swapped. F = q v × B; writing B × v gives the force in exactly the opposite direction.",
        },
        {
          title: "An electron's force is reversed",
          body: "For an electron q = −e, so the force is along −(v × B). Finding the direction of v × B and stopping there gives the wrong answer for every electron question.",
        },
        {
          title: "The magnetic force never changes speed",
          body: "Because F is always perpendicular to v, it does no work. Speed and kinetic energy stay the same; only the direction of motion changes.",
        },
      ],
    },

    // C2 — E and B together
    {
      kind: "formula" as const,
      slug: "jpmag-crossed-fields",
      name: "Electric and magnetic forces together: the velocity selector",
      intuition:
        "With an electric field as well, the total force is the Lorentz force, q(E + v × B). If E and B are perpendicular to each other and to the velocity, the two forces can point in opposite directions. At one particular speed, v = E/B, they cancel, and the charge goes straight through. Faster or slower charges are bent aside, which is why this arrangement is called a velocity selector.",
      definition:
        "- Lorentz force: \\(\\vec F = q\\left(\\vec E + \\vec v \\times \\vec B\\right)\\).\n" +
        "- Velocity selector (E, B and v mutually perpendicular): undeflected when \\(qE = qvB\\), that is \\(v = E/B\\), whatever the charge or mass.\n" +
        "- A charge given kinetic energy K has \\(v = \\sqrt{2K/m}\\); accelerated from rest through V, \\(v = \\sqrt{2qV/m}\\).\n" +
        "- Switch E off and the charge circles with \\(r = mv/qB\\) (the next page); with \\(B = E/v\\) this is \\(r = \\dfrac{mv^{2}}{qE}\\).\n" +
        "- A charge keeps a constant velocity if E = 0 and B = 0; if E = 0 and v is parallel to B; or if E and B are both present and their forces balance. It cannot with E ≠ 0 and B = 0.\n" +
        "- Along the axis of a solenoid v is parallel to B, so there is no magnetic force; a charge there moves as it would with no field.",
      formula: {
        label: "Lorentz force and the selected speed",
        latex: "\\vec F = q\\left(\\vec E + \\vec v \\times \\vec B\\right) \\qquad v = \\frac{E}{B}",
      },
      authoredExample: {
        prompt:
          "Protons are accelerated from rest through 1250 V and then enter a region with a magnetic field of 0.06 T perpendicular to their path. What electric field, perpendicular to both, lets them pass undeflected? (proton mass \\(1.6 \\times 10^{-27}\\) kg, charge \\(1.6 \\times 10^{-19}\\) C)",
        steps: [
          "Speed: \\(v = \\sqrt{\\dfrac{2qV}{m}} = \\sqrt{\\dfrac{2 \\times 1.6 \\times 10^{-19} \\times 1250}{1.6 \\times 10^{-27}}} = \\sqrt{2.5 \\times 10^{11}} = 5 \\times 10^{5}\\) m/s.",
          "No deflection: \\(qE = qvB\\), so \\(E = vB = 5 \\times 10^{5} \\times 0.06 = 3 \\times 10^{4}\\) V/m.",
          "Its direction must make qE point opposite to the magnetic force \\(q\\vec v \\times \\vec B\\).",
        ],
        answer: "\\(3 \\times 10^{4}\\) V/m",
      },
      selfCheckExample: {
        prompt:
          "An electron moves along +x at \\(4 \\times 10^{6}\\) m/s through a magnetic field of 0.01 T along +z. Find the size and direction of the electric field that keeps it moving in a straight line.",
        steps: [
          "\\(\\vec v \\times \\vec B\\) points along \\(\\hat i \\times \\hat k = -\\hat j\\); the electron's charge is negative, so the magnetic force is along +y.",
          "The electric force must be along −y. For a negative charge that needs E along +y.",
          "\\(E = vB = 4 \\times 10^{6} \\times 0.01 = 4 \\times 10^{4}\\) V/m.",
        ],
        answer: "\\(4 \\times 10^{4}\\) V/m along +y",
      },
      practiceSet: [
        { prompt: "Crossed fields E = 1000 V/m and B = 0.05 T. Speed of a charge that passes undeflected?", answer: "\\(2 \\times 10^{4}\\) m/s" },
        { prompt: "In a velocity selector, is a particle slower than E/B bent towards the side the electric force pushes, or the side the magnetic force pushes?", answer: "The electric force's side, since qvB < qE" },
        { prompt: "A 2 μC charge moves with \\(3\\hat i\\) m/s in \\(\\vec E = 5\\hat j\\) V/m and \\(\\vec B = 2\\hat k\\) T. Total force on it?", answer: "\\(-2 \\times 10^{-6}\\hat j\\) N" },
        { prompt: "What magnetic force acts on a charge moving along the axis of a long current-carrying solenoid?", answer: "None: v is parallel to B" },
      ],
      pyqExampleId: "00574d07-aaf2-4598-8b33-199b2eb8b5f2", // 22 Jan 2025: proton undeflected at 2 × 10⁵ m/s, circle of 2 cm with E off, E = 2 × 10⁴ N/C
      traps: [
        {
          title: "The selector picks a speed, not a charge or a mass",
          body: "v = E/B has no q and no m in it. A proton, an electron and an alpha particle at the same speed all pass straight through the same crossed fields.",
        },
        {
          title: "Find v from the kinetic energy first",
          body: "When a question gives an energy in eV, convert it to joules and use v = √(2K/m) before putting v into E = vB. Using the energy directly as a speed gives nonsense.",
        },
        {
          title: "Constant velocity is impossible with only an electric field",
          body: "An electric field always pushes a charge, whatever its motion. A region with E ≠ 0 and B = 0 cannot let a charge move at constant velocity; a region with B alone can, if the charge moves along B.",
        },
      ],
    },
  ],
};
