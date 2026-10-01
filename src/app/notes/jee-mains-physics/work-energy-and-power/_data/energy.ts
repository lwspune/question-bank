import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_WEP_NOTE: SubtopicNote = {
  subtopicName: "Potential Energy and Conservation of Mechanical Energy",
  title: "Potential Energy and Conservation of Mechanical Energy",
  oneLineDefinition:
    "A conservative force stores the work it does as potential energy, with F = −dU/dx, and where only such forces do work, kinetic plus potential energy stays constant.",
  whyItMatters:
    "Twenty-six PYQs, twenty-one of them multiple choice, and five from 2026; sixteen carry a figure. Eight are about conservative forces and potential energy, from F = −dU/dx and equilibrium to reading a U(x) graph; seven store energy in a spring, from a hanging mass to a block that slides or falls onto it; eleven conserve mechanical energy on tracks, pulleys, pendulums and vertical circles. The figure usually gives the heights, so read it before writing any equation.",
  concepts: [
    // C1 — conservative forces and U
    {
      kind: "formula" as const,
      slug: "jpwep-conservative",
      name: "Conservative forces and potential energy",
      intuition:
        "The work done by a conservative force depends only on where the body starts and ends, not on the path between. That makes it possible to store the work as a potential energy U. The force then points downhill on the U curve, and its size is the slope.",
      definition:
        "- \\(W_{\\text{cons}} = -\\Delta U = U_i - U_f\\), the same along every path, and zero round a closed path.\n" +
        "- \\(F = -\\dfrac{dU}{dx}\\); in three dimensions \\(F_x = -\\dfrac{\\partial U}{\\partial x}\\), and likewise for y and z.\n" +
        "- Conservative: gravity, the spring force, the electrostatic force and any central force \\(F(r)\\hat r\\). Not conservative: friction and air drag, which have no potential energy.\n" +
        "- Equilibrium where \\(dU/dx = 0\\): stable at a minimum of U, unstable at a maximum.\n" +
        "- On a U(x) graph, the size of the force is the size of the slope; a flat stretch has zero force.\n" +
        "- \\(K = E - U\\): the body can be only where \\(U \\le E\\), it stops where \\(U = E\\), and it is fastest where U is lowest.\n" +
        "- Interatomic \\(U = \\dfrac{A}{r^{n}} - \\dfrac{B}{r^{m}}\\): set \\(dU/dr = 0\\) for the equilibrium separation.",
      formula: {
        label: "Force from potential energy",
        latex: "F = -\\frac{dU}{dx} \\qquad F_x = -\\frac{\\partial U}{\\partial x} \\qquad W_{\\text{cons}} = -\\Delta U",
      },
      authoredExample: {
        prompt:
          "The potential energy of two atoms at separation r is \\(U = \\dfrac{a}{r^{12}} - \\dfrac{b}{r^{6}}\\), with a and b positive. Find the equilibrium separation.",
        steps: [
          "\\(\\dfrac{dU}{dr} = -\\dfrac{12a}{r^{13}} + \\dfrac{6b}{r^{7}}\\).",
          "At equilibrium this is zero: \\(\\dfrac{12a}{r^{13}} = \\dfrac{6b}{r^{7}} \\Rightarrow r^{6} = \\dfrac{2a}{b}\\).",
          "Closer than this the force \\(-dU/dr\\) is positive (repulsive); farther, it is negative (attractive).",
        ],
        answer: "\\(r = \\left(\\dfrac{2a}{b}\\right)^{1/6}\\)",
      },
      selfCheckExample: {
        prompt:
          "The potential energy of a particle is \\(U = (3x^{2} + 2y^{3} - 4z)\\) J, with x, y, z in metres. Find the force on it at the point \\((1, 1, 2)\\) m and its magnitude.",
        steps: [
          "\\(F_x = -6x = -6\\) N, \\(F_y = -6y^{2} = -6\\) N, \\(F_z = +4\\) N.",
          "\\(|\\vec F| = \\sqrt{36 + 36 + 16} = \\sqrt{88}\\).",
        ],
        answer: "\\(\\vec F = (-6\\hat i - 6\\hat j + 4\\hat k)\\) N, about 9.4 N.",
      },
      practiceSet: [
        { prompt: "\\(U = 5x^{2}\\) J. Find the force at \\(x = 2\\) m.", answer: "\\(-20\\) N" },
        { prompt: "Which of these has no potential energy: gravity, the spring force, friction, the Coulomb force?", answer: "Friction" },
        { prompt: "\\(U = x^{3} - 3x\\). Find the equilibrium points and say which is stable.", answer: "\\(x = 1\\) (stable) and \\(x = -1\\) (unstable)" },
        { prompt: "A particle has total mechanical energy 10 J. At a point where U = 7 J, what is its kinetic energy?", answer: "\\(3\\) J" },
      ],
      pyqExampleId: "13024bcb-e1d9-4f0c-a080-8a106429a3e7", // 14 Jun 2022: equilibrium of U = A/r^10 − B/r^5
      traps: [
        {
          title: "Work is the integral of F·dr; the minus sign belongs to ΔU",
          body: "The work done by a force from r₁ to r₂ is W = ∫F·dr. It is the change in potential energy that carries the minus sign: ΔU = −∫F·dr. A statement that writes W = −∫F·dr is false.",
        },
        {
          title: "The force is the slope, not the height",
          body: "On a U(x) graph, a steep stretch means a strong force and a flat stretch means no force, however high it sits. Ranking forces by the height of U instead of the steepness gives the wrong order.",
        },
        {
          title: "Friction has no potential energy",
          body: "The work done by friction depends on the path, so no function U can store it. Coulomb, gravitational and spring forces all have a potential energy; friction does not.",
        },
      ],
    },

    // C2 — springs
    {
      kind: "formula" as const,
      slug: "jpwep-spring",
      name: "Potential energy of a spring",
      intuition:
        "Stretching or compressing a spring by x stores ½kx² of energy. The force grows from zero to kx as the spring is pushed, so the energy is the area of a triangle, half of kx times x. A moving block that hits a spring turns its kinetic energy into this stored energy.",
      definition:
        "- \\(U = \\tfrac12 kx^{2}\\), with x measured from the natural length.\n" +
        "- Stretching from \\(x_1\\) to \\(x_2\\) takes \\(\\tfrac12 k(x_2^{2} - x_1^{2})\\).\n" +
        "- A mass m hanging at rest stretches the spring by \\(mg/k\\) and stores \\(\\dfrac{m^{2}g^{2}}{2k}\\): for the same mass, \\(U \\propto 1/k\\); for the same spring, \\(U \\propto m^{2}\\).\n" +
        "- A block at speed u on a smooth floor: \\(\\tfrac12 mu^{2} = \\tfrac12 kx_{\\max}^{2}\\). When its speed has fallen to v: \\(\\tfrac12 m(u^{2} - v^{2}) = \\tfrac12 kx^{2}\\).\n" +
        "- A ball dropped from height h onto a platform on a spring falls \\(h + x\\): \\(mg(h + x) = \\tfrac12 kx^{2}\\).\n" +
        "- With friction on the way: \\(\\tfrac12 kx^{2} = \\) energy at the start \\(- \\mu mg\\,d\\).",
      formula: {
        label: "Spring potential energy",
        latex: "U = \\tfrac12 kx^{2} \\qquad W_{x_1 \\to x_2} = \\tfrac12 k\\left(x_2^{2} - x_1^{2}\\right)",
      },
      authoredExample: {
        prompt:
          "A 2 kg block sliding at 4 m/s on a smooth floor hits a spring of force constant 800 N/m. Find (a) the maximum compression and (b) the compression when the block's speed has fallen to 2 m/s.",
        steps: [
          "(a) \\(\\tfrac12 (2)(4)^{2} = 16\\) J \\(= \\tfrac12 (800)x^{2} = 400x^{2}\\), so \\(x^{2} = 0.04\\) and \\(x = 0.2\\) m.",
          "(b) Energy given to the spring so far: \\(\\tfrac12 (2)(16 - 4) = 12\\) J.",
          "\\(400x^{2} = 12 \\Rightarrow x^{2} = 0.03\\), so \\(x \\approx 0.17\\) m.",
        ],
        answer: "(a) 0.2 m; (b) about 0.17 m.",
      },
      selfCheckExample: {
        prompt:
          "A 0.2 kg ball is dropped from 20 cm above a light platform fixed on top of a vertical spring. It stays on the platform and pushes it down by 10 cm. Find the spring constant. (\\(g = 10\\) m/s²)",
        steps: [
          "The ball falls \\(0.2 + 0.1 = 0.3\\) m in all: \\(mg(h + x) = 0.2 \\times 10 \\times 0.3 = 0.6\\) J.",
          "\\(\\tfrac12 k(0.1)^{2} = 0.6 \\Rightarrow k = \\dfrac{1.2}{0.01}\\).",
        ],
        answer: "\\(120\\) N/m",
      },
      practiceSet: [
        { prompt: "A spring of force constant 200 N/m is stretched by 5 cm. Find the energy stored.", answer: "\\(0.25\\) J" },
        { prompt: "Find the work needed to stretch a 500 N/m spring from an extension of 2 cm to 4 cm.", answer: "\\(0.3\\) J" },
        { prompt: "A 1 kg mass hangs at rest from a spring of force constant 100 N/m. Find the energy stored. (\\(g = 10\\) m/s²)", answer: "\\(0.5\\) J" },
        { prompt: "The same mass hangs at rest from a spring of constant k and from one of constant 2k. Find the ratio of the energies stored.", answer: "\\(2 : 1\\)" },
      ],
      pyqExampleId: "f9f24cb1-9f19-496a-bcf9-cbcb56cc308a", // 25 Jun 2022: block compresses a spring until its speed halves
      traps: [
        {
          title: "Spring energy is half of force times stretch",
          body: "The spring force grows from 0 to kx as it is stretched, so the stored energy is ½kx², not kx·x. Writing kx² doubles every answer.",
        },
        {
          title: "A dropped ball falls the extra compression too",
          body: "A ball dropped from h onto a spring platform loses mg(h + x) of potential energy by the lowest point, not mgh. Using mgh gives a spring constant that is too small.",
        },
        {
          title: "Energy between two stretches uses x₂² − x₁²",
          body: "Stretching from 2 cm to 4 cm takes ½k(4² − 2²) in cm², not ½k(4 − 2)². Every extension is measured from the natural length.",
        },
      ],
    },

    // C3 — conservation of mechanical energy
    {
      kind: "formula" as const,
      slug: "jpwep-mech-energy",
      name: "Conservation of mechanical energy",
      intuition:
        "Normal reactions and the tension in an inextensible string are always at right angles to the motion, so they do no work. When only gravity and springs do work, kinetic plus potential energy stays the same. The speed at a point then depends only on how far the body has dropped, not on the shape of the track.",
      definition:
        "- \\(K_1 + U_1 = K_2 + U_2\\); on a smooth track \\(v^{2} = u^{2} + 2g(h_1 - h_2)\\).\n" +
        "- Dropped from height S: at height h, \\(v^{2} = 2g(S - h)\\). K equals n times U at \\(h = \\dfrac{S}{n + 1}\\).\n" +
        "- Pendulum at angle θ from the vertical: it is \\(l(1 - \\cos\\theta)\\) above the lowest point.\n" +
        "- Projectile: at the top \\(K = \\tfrac12 m(u\\cos\\theta)^{2}\\), so the kinetic energy lost on the way up is \\(\\tfrac12 mu^{2}\\sin^{2}\\theta\\).\n" +
        "- Two masses over a light pulley: \\((m_1 - m_2)gh = \\tfrac12 (m_1 + m_2)v^{2}\\); both masses move.\n" +
        "- Vertical circle on a string (from Laws of Motion: at the top \\(T + mg = mv^{2}/L\\)): just completing it needs \\(v_{\\text{top}}^{2} = gL\\) and \\(v_{\\text{bottom}}^{2} = 5gL\\), so \\(K_{\\text{bottom}} : K_{\\text{top}} = 5 : 1\\).\n" +
        "- On a rigid rod the top speed can be zero, so \\(v_{\\text{bottom}}^{2} = 4gL\\) is enough.\n" +
        "- A point at angle θ from the bottom of a circle of radius R is \\(R(1 - \\cos\\theta)\\) above the bottom.\n" +
        "- A fraction f of the energy kept (the rest lost to air): \\(f\\,mgh = \\tfrac12 mv^{2}\\).",
      formula: {
        label: "Mechanical energy conserved",
        latex: "\\tfrac12 mv_1^{2} + mgh_1 = \\tfrac12 mv_2^{2} + mgh_2 \\qquad v_{\\text{bottom}}^{2} = 5gL",
      },
      authoredExample: {
        prompt:
          "A 2 kg bob hangs on a string 1.6 m long. It is pulled aside until the string makes 60° with the vertical and released. Find its speed (a) at the lowest point and (b) when the string makes 37° with the vertical (cos 37° = 0.8). (\\(g = 10\\) m/s²)",
        steps: [
          "Heights above the lowest point: at 60°, \\(1.6(1 - 0.5) = 0.8\\) m; at 37°, \\(1.6(1 - 0.8) = 0.32\\) m.",
          "(a) Drop 0.8 m: \\(v^{2} = 2 \\times 10 \\times 0.8 = 16\\), \\(v = 4\\) m/s.",
          "(b) Drop \\(0.8 - 0.32 = 0.48\\) m: \\(v^{2} = 9.6\\), \\(v \\approx 3.1\\) m/s.",
          "The mass cancels: it appears in every term.",
        ],
        answer: "(a) 4 m/s; (b) about 3.1 m/s.",
      },
      selfCheckExample: {
        prompt:
          "A bob on a string 0.9 m long just manages to complete a vertical circle. Find its speed at the top and at the bottom, and the ratio of its kinetic energies there. (\\(g = 10\\) m/s²)",
        steps: [
          "At the top the tension is just zero: \\(v_{\\text{top}}^{2} = gL = 9\\), so \\(v_{\\text{top}} = 3\\) m/s.",
          "Energy from top to bottom, a drop of 2L: \\(v_{\\text{bottom}}^{2} = 9 + 2 \\times 10 \\times 1.8 = 45\\), so \\(v_{\\text{bottom}} \\approx 6.7\\) m/s.",
          "\\(K_{\\text{bottom}} : K_{\\text{top}} = 45 : 9\\).",
        ],
        answer: "3 m/s and about 6.7 m/s; 5 : 1.",
      },
      practiceSet: [
        { prompt: "A stone is dropped from 45 m. At what height is its kinetic energy twice its potential energy?", answer: "\\(15\\) m" },
        { prompt: "A 0.2 kg ball is thrown at 20 m/s at 30° to the horizontal. Find the kinetic energy it loses on the way to the top.", answer: "\\(10\\) J" },
        { prompt: "Masses of 3 kg and 1 kg hang over a light pulley and are released. Find their speed when the heavier one has fallen 2 m. (\\(g = 10\\) m/s²)", answer: "\\(\\sqrt{20} \\approx 4.5\\) m/s" },
        { prompt: "A body slides from rest down a smooth curved track 5 m high. Find its speed at the bottom. (\\(g = 10\\) m/s²)", answer: "\\(10\\) m/s" },
      ],
      pyqExampleId: "985fdb1a-7a85-47dd-bcc6-438c4d897ead", // 3 Apr 2025: released from S, height where K = 3U
      traps: [
        {
          title: "A rod is not a string",
          body: "A bob on a string needs a speed of √(gL) at the top, so √(5gL) at the bottom. A bob on a rigid rod can reach the top with zero speed, so √(4gL) at the bottom is enough.",
        },
        {
          title: "Measure every height from one level",
          body: "Pick the lowest point as zero and keep it. On a circle of radius R, a point at angle θ from the bottom is R(1 − cos θ) up; a point at angle θ from the top is R(1 + cos θ) up.",
        },
        {
          title: "Both masses on a pulley carry kinetic energy",
          body: "When one mass falls and the other rises, the energy released, (m₁ − m₂)gh, is shared by both: ½(m₁ + m₂)v². Giving it all to the falling mass makes the speed too large.",
        },
      ],
    },
  ],
};
