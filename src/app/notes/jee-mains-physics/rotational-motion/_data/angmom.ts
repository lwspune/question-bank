import type { SubtopicNote } from "@/app/notes/_types";

export const ANGMOM_ROT_NOTE: SubtopicNote = {
  subtopicName: "Angular Momentum and Its Conservation",
  title: "Angular Momentum and Its Conservation",
  oneLineDefinition:
    "A particle's angular momentum about a point is r × p; a rigid body's about its axis is Iω; with no external torque it stays constant, so a change in I forces a change in ω.",
  whyItMatters:
    "Twenty-six PYQs, twelve of them asking for a number, and four from 2026. Twelve find a particle's angular momentum: along a straight line, in a circle, as a projectile, or from r × p in components. Fourteen conserve it: a disc dropped on a spinning disc, particles stuck on a ring, a shrinking earth, a moving body striking a rod.",
  concepts: [
    // C1 — angular momentum of a particle
    {
      kind: "formula" as const,
      slug: "jprot-l-particle",
      name: "Angular momentum of a particle",
      intuition:
        "Angular momentum measures how much a moving particle sweeps around a chosen point. It is the momentum times the perpendicular distance from the point to the line of motion. A particle moving in a straight line at constant speed keeps the same angular momentum, because that perpendicular distance never changes.",
      definition:
        "- \\(\\vec L = \\vec r \\times \\vec p = m(\\vec r \\times \\vec v)\\); its size is \\(mvd\\), where d is the perpendicular distance from the point to the line of motion.\n" +
        "- Straight-line motion at constant velocity: L about any fixed point is constant.\n" +
        "- Uniform circular motion: L about the centre is constant in size AND direction, \\(L = mvr\\).\n" +
        "- Of A about B: use \\(\\vec r_A - \\vec r_B\\) and \\(\\vec v_A - \\vec v_B\\). Two bodies on parallel lines a distance d apart: \\(L = m\\,v_{\\text{rel}}\\,d\\).\n" +
        "- Projectile, about the launch point, at the top: \\(L = m(u\\cos\\theta)H = \\dfrac{mu^{3}\\sin^{2}\\theta\\cos\\theta}{2g}\\). Gravity's torque about that point is mgx, so L grows as the projectile moves out: \\(dL/dt = \\tau\\).\n" +
        "- If \\(\\vec r \\to -\\vec r\\), then \\(\\vec v\\) and \\(\\vec p\\) reverse but \\(\\vec L = \\vec r \\times \\vec p\\) does not.",
      formula: {
        label: "Angular momentum of a particle, and of a projectile at its highest point",
        latex:
          "\\vec L = \\vec r \\times m\\vec v,\\ |\\vec L| = mvd \\qquad L_{\\text{top}} = \\frac{mu^{3}\\sin^{2}\\theta\\cos\\theta}{2g}",
      },
      authoredExample: {
        prompt:
          "A 2 kg particle moves at 3 m/s in the +x direction along the line y = 4 m. Find its angular momentum about the origin, and about the point (0, 1) m.",
        steps: [
          "About the origin, the line of motion is 4 m away: \\(L = mvd = 2 \\times 3 \\times 4 = 24\\) kg m²/s.",
          "Direction: \\(\\vec r \\times \\vec v = (x\\hat i + 4\\hat j) \\times 3\\hat i = -12\\hat k\\), so \\(\\vec L = -24\\hat k\\) kg m²/s.",
          "About (0, 1) the distance is 3 m: \\(L = 2 \\times 3 \\times 3 = 18\\) kg m²/s, again along \\(-\\hat k\\).",
          "Neither depends on x, so both stay constant as the particle moves.",
        ],
        answer: "\\(-24\\hat k\\) and \\(-18\\hat k\\) kg m²/s",
      },
      selfCheckExample: {
        prompt:
          "A 0.5 kg ball is thrown at 20 m/s at 30° above the horizontal (g = 10 m/s²). Find its angular momentum about the launch point when it is at its highest point.",
        steps: [
          "Horizontal speed \\(u\\cos 30^{\\circ} = 10\\sqrt{3}\\) m/s; at the top this is the whole velocity.",
          "Height \\(H = \\dfrac{u^{2}\\sin^{2}30^{\\circ}}{2g} = \\dfrac{400 \\times 0.25}{20} = 5\\) m: the perpendicular distance of the velocity line from the launch point.",
          "\\(L = 0.5 \\times 10\\sqrt{3} \\times 5 = 25\\sqrt{3}\\) kg m²/s.",
        ],
        answer: "\\(25\\sqrt{3} \\approx 43.3\\) kg m²/s",
      },
      practiceSet: [
        { prompt: "A 1 kg particle is at \\(\\vec r = 2\\hat i\\) m with \\(\\vec v = 3\\hat j\\) m/s. Its angular momentum about the origin?", answer: "\\(6\\hat k\\) kg m²/s" },
        { prompt: "A particle moves uniformly in a circle. What about its angular momentum about the centre stays constant?", answer: "Both its size and its direction" },
        { prompt: "If \\(\\vec r\\) changes to \\(-\\vec r\\), what happens to \\(\\vec L\\)?", answer: "Nothing; it is unchanged" },
        { prompt: "Two 1 kg bodies move the same way on parallel lines 2 m apart, at 5 m/s and 3 m/s. Angular momentum of the faster about the slower?", answer: "4 kg m²/s" },
      ],
      pyqExampleId: "b4ef1ce0-a05a-4280-a884-d841ba71a7e9", // 2026: two cars on parallel tracks 10 m apart, L of A about B
      traps: [
        {
          title: "Distance to the point, not to the line",
          body: "L = mvd uses the perpendicular distance from the point to the LINE of motion. The particle's straight-line distance from the point changes as it moves; d does not.",
        },
        {
          title: "Angular momentum about a moving body",
          body: "For one car about another, use the relative velocity. Using the first car's own speed gives its angular momentum about a fixed point beside the track.",
        },
        {
          title: "A projectile's L is not conserved about the launch point",
          body: "Gravity has a torque mgx about the launch point, so L changes along the path. Only about a point on the line of the force could L stay constant.",
        },
      ],
    },

    // C2 — conservation for rigid bodies
    {
      kind: "formula" as const,
      slug: "jprot-l-conserve",
      name: "Conservation of angular momentum",
      intuition:
        "With no external torque about an axis, Iω about that axis cannot change. Add mass far from the axis, or spread out, and the body slows; pull in, and it speeds up. Kinetic energy is NOT conserved in these changes: sticking two spinning bodies together always loses energy.",
      definition:
        "- Rigid body: \\(L = I\\omega\\). No external torque: \\(I_1\\omega_1 = I_2\\omega_2\\).\n" +
        "- A disc placed coaxially on a spinning disc: \\(\\omega' = \\dfrac{I_1\\omega}{I_1 + I_2}\\). Two particles m stuck on the rim of a ring M: \\(\\omega' = \\dfrac{M}{M + 2m}\\omega\\).\n" +
        "- Earth with its mass fixed: \\(I \\propto R^{2}\\), so the day length \\(T \\propto R^{2}\\). Radius to \\(\\tfrac{3}{4}\\): \\(24 \\times \\tfrac{9}{16} = 13.5\\) h. Volume to \\(\\tfrac{1}{64}\\) means radius to \\(\\tfrac{1}{4}\\): T to \\(\\tfrac{1}{16}\\).\n" +
        "- Kinetic energy \\(= L^{2}/2I\\): at fixed L, tripling I cuts the energy to a third.\n" +
        "- Energy lost when two coaxial discs lock together: \\(\\Delta K = \\dfrac{I_1I_2(\\omega_1 - \\omega_2)^{2}}{2(I_1 + I_2)}\\).\n" +
        "- A body striking a pivoted rod: L about the PIVOT is conserved through the impact (the pivot's force has no torque about itself). An impulse J at the end of a free rod: \\(J\\tfrac{L}{2} = \\tfrac{ML^{2}}{12}\\omega\\), so \\(\\omega = \\dfrac{6J}{ML}\\).",
      formula: {
        label: "Conservation of angular momentum, and energy lost on locking",
        latex: "I_1\\omega_1 = I_2\\omega_2 \\qquad \\Delta K = \\frac{I_1I_2(\\omega_1 - \\omega_2)^{2}}{2(I_1 + I_2)}",
      },
      authoredExample: {
        prompt:
          "A thin ring of mass 2 kg and radius 0.5 m spins at 12 rad/s about its axis. Two beads of 0.5 kg each are stuck on its rim. Find the new angular speed and the kinetic energy lost.",
        steps: [
          "\\(I_1 = 2 \\times 0.25 = 0.5\\) kg m². \\(I_2 = 0.5 + 2 \\times 0.5 \\times 0.25 = 0.75\\) kg m².",
          "\\(\\omega' = \\dfrac{0.5 \\times 12}{0.75} = 8\\) rad/s.",
          "Before: \\(\\tfrac{1}{2}(0.5)(144) = 36\\) J. After: \\(\\tfrac{1}{2}(0.75)(64) = 24\\) J.",
          "Lost: \\(36 - 24 = 12\\) J, which went into making the beads stick.",
        ],
        answer: "8 rad/s; 12 J lost",
      },
      selfCheckExample: {
        prompt:
          "If the earth's radius shrank to half its present value with no change in mass, how long would a day be?",
        steps: [
          "No external torque: \\(I\\omega\\) is constant, and \\(I \\propto R^{2}\\), so \\(T \\propto R^{2}\\).",
          "\\(T' = 24 \\times \\left(\\tfrac{1}{2}\\right)^{2} = 6\\) h.",
        ],
        answer: "6 hours",
      },
      practiceSet: [
        { prompt: "A disc with I = 3 kg m² spins at 8 rad/s. A disc with I = 1 kg m², at rest, is dropped onto it coaxially. Final angular speed?", answer: "6 rad/s" },
        { prompt: "A skater pulls her arms in and her moment of inertia halves. What happens to her kinetic energy?", answer: "It doubles", method: "\\(K = L^{2}/2I\\) at fixed L" },
        { prompt: "Discs with I = 2 kg m² each, one at 10 rad/s and one at rest, lock together. Energy lost?", answer: "50 J" },
        { prompt: "A free rod of mass M and length L gets a perpendicular impulse J at one end. Its angular speed?", answer: "\\(6J/(ML)\\)" },
      ],
      pyqExampleId: "a7c24628-05c9-4f0d-a576-c2f0a09c502a", // 2024: a disc of mass M/2 placed on a spinning disc of mass M
      traps: [
        {
          title: "Kinetic energy is not conserved when bodies stick",
          body: "When a disc lands on a spinning disc, or beads stick to a ring, angular momentum is conserved but kinetic energy is lost. Equating the energies gives ω' = ω√(I₁/(I₁ + I₂)), which is wrong.",
        },
        {
          title: "Day length goes with the radius squared",
          body: "With fixed mass, I ∝ R², so T ∝ R². A volume change must first become a radius change: a sixty-fourth of the volume is a quarter of the radius, and T falls to a sixteenth.",
        },
        {
          title: "About which point is L conserved?",
          body: "For a body striking a rod on a fixed pivot, the pivot pushes during the impact, so linear momentum is not conserved. Angular momentum about the pivot is, because the pivot's force has no lever arm there.",
        },
      ],
    },
  ],
};
