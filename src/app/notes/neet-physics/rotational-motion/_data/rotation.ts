import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_RM_ROTATION_NOTE: SubtopicNote = {
  subtopicName: "Rotation and Rolling",
  title: "Rotation and Rolling",
  oneLineDefinition:
    "Rotation about a fixed axis with constant angular acceleration, torque and angular momentum, the conservation of angular momentum, and a wheel that rolls without slipping.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. Three are rotational kinematics: a flywheel's angular acceleration (2022), the direction of angular acceleration (2023) and the turns made while speeding up (2026). Two are angular momentum: the Sun's period if it swelled (2025) and a spinning disc's angular momentum about two points (Re-NEET 2026). One is rolling: which point of a rolling wheel moves faster (2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphrm-kinematics",
      name: "Rotational kinematics",
      intuition:
        "When a rigid body turns about a fixed axis, every particle sweeps the same angle in the same time. So one angular velocity and one angular acceleration describe the whole body. With constant angular acceleration the equations are the same as for straight-line motion, with θ, ω and α in place of x, v and a.",
      definition:
        "- \\(\\omega = \\dfrac{d\\theta}{dt}\\), \\(\\alpha = \\dfrac{d\\omega}{dt}\\). For a fixed axis both point along the axis, by the right-hand rule.\n" +
        "- A particle at distance r from the axis: speed \\(v = \\omega r\\), tangential acceleration \\(a_t = \\alpha r\\), centripetal acceleration \\(\\omega^{2}r\\).\n" +
        "- Constant \\(\\alpha\\): \\(\\omega = \\omega_0 + \\alpha t\\), \\(\\theta = \\omega_0t + \\tfrac{1}{2}\\alpha t^{2}\\), \\(\\omega^{2} = \\omega_0^{2} + 2\\alpha\\theta\\).\n" +
        "- Convert first: \\(n\\) rpm \\(= n \\times \\dfrac{2\\pi}{60}\\) rad/s. Number of turns \\(= \\dfrac{\\theta}{2\\pi}\\).",
      formula: {
        label: "Constant angular acceleration",
        latex: "\\omega = \\omega_0 + \\alpha t, \\qquad \\theta = \\omega_0 t + \\tfrac{1}{2}\\alpha t^{2}, \\qquad \\omega^{2} = \\omega_0^{2} + 2\\alpha\\theta",
        symbols: [
          { symbol: "\\(\\omega_0\\)", meaning: "initial angular velocity" },
          { symbol: "\\(\\alpha\\)", meaning: "angular acceleration" },
          { symbol: "\\(\\theta\\)", meaning: "angle turned, in radians" },
        ],
      },
      authoredExample: {
        prompt:
          "A wheel starts from rest and reaches 20 rad/s in 4 s with uniform angular acceleration. Find the angular acceleration and the angle it turns through.",
        steps: [
          "\\(\\alpha = \\dfrac{20 - 0}{4} = 5\\ \\text{rad/s}^{2}\\).",
          "\\(\\theta = \\tfrac{1}{2}\\alpha t^{2} = \\tfrac{1}{2} \\times 5 \\times 16 = 40\\) rad.",
        ],
        answer: "5 rad/s² and 40 rad",
      },
      selfCheckExample: {
        prompt:
          "The angle turned by a wheel is \\(\\theta = 3t^{2} + 2t\\) rad, with t in seconds. Find its angular velocity and angular acceleration at t = 2 s.",
        steps: [
          "\\(\\omega = \\dfrac{d\\theta}{dt} = 6t + 2\\), so at t = 2 s, \\(\\omega = 14\\) rad/s.",
          "\\(\\alpha = \\dfrac{d\\omega}{dt} = 6\\ \\text{rad/s}^{2}\\), the same at every instant.",
        ],
        answer: "14 rad/s and 6 rad/s²",
      },
      practiceSet: [
        { prompt: "Convert 300 rpm to rad/s.", answer: "\\(10\\pi\\) rad/s" },
        { prompt: "A disc of radius 0.5 m spins at 4 rad/s. How fast does a point on its rim move?", answer: "2 m/s" },
        { prompt: "In which direction does the angular velocity of a wheel turning about a fixed axis point?", answer: "Along the axis, by the right-hand rule" },
        { prompt: "A wheel starts from rest with uniform angular acceleration and turns through 2 rad in the first second. Find its angular acceleration.", answer: "4 rad/s²" },
      ],
      pyqExampleId: "304a9799-e37a-4f1f-967b-af9c5b978d82",
      traps: [
        {
          title: "Convert rpm before you start",
          body: "The equations need radians and seconds. 900 rpm is \\(900 \\times \\dfrac{2\\pi}{60} = 30\\pi\\) rad/s; putting 900 straight in gives an answer wrong by a factor of about 10.",
        },
        {
          title: "Turns are not radians",
          body: "The equations give θ in radians. Divide by \\(2\\pi\\) to get the number of revolutions.",
        },
        {
          title: "Angular acceleration lies along the axis",
          body: "For rotation about a fixed axis, \\(\\vec{\\omega}\\) and \\(\\vec{\\alpha}\\) both point along the axis, not along the tangent or the radius of the circle a particle moves on.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphrm-angular-momentum",
      name: "Torque, angular momentum and its conservation",
      intuition:
        "Torque does for turning what force does for straight-line motion: it changes the angular momentum. With no outside torque, the angular momentum Iω cannot change. So when a spinning body pulls its mass in towards the axis, I falls and ω must rise, which is how a skater spins faster with her arms folded.",
      definition:
        "- Angular momentum of a particle: \\(\\vec{L} = \\vec{r} \\times \\vec{p}\\). For a particle moving in a straight line, \\(L = mv\\,d_{\\perp}\\), with \\(d_{\\perp}\\) the perpendicular distance from the point to the line.\n" +
        "- A rigid body about a fixed axis: \\(L = I\\omega\\).\n" +
        "- \\(\\vec{\\tau} = \\dfrac{d\\vec{L}}{dt}\\). About a fixed axis, \\(\\tau = I\\alpha\\).\n" +
        "- Rotational kinetic energy: \\(K = \\tfrac{1}{2}I\\omega^{2} = \\dfrac{L^{2}}{2I}\\). Work done by a torque \\(\\tau\\theta\\); power \\(\\tau\\omega\\).\n" +
        "- **Conservation**: if the external torque is zero, \\(I_1\\omega_1 = I_2\\omega_2\\). Since \\(\\omega = \\dfrac{2\\pi}{T}\\), the period T goes up in proportion to I.\n" +
        "- When I changes this way, L stays fixed but the kinetic energy does not.",
      formula: {
        label: "Rotational dynamics",
        latex: "L = I\\omega, \\qquad \\tau = I\\alpha = \\frac{dL}{dt}, \\qquad I_1\\omega_1 = I_2\\omega_2, \\qquad K = \\tfrac{1}{2}I\\omega^{2} = \\frac{L^{2}}{2I}",
        symbols: [
          { symbol: "\\(L\\)", meaning: "angular momentum" },
          { symbol: "\\(\\tau\\)", meaning: "torque about the axis" },
          { symbol: "\\(I\\)", meaning: "moment of inertia about the axis" },
        ],
      },
      authoredExample: {
        prompt:
          "A turntable of moment of inertia 0.4 kg m² spins freely at 10 rad/s. A lump of clay dropped onto it raises its moment of inertia to 0.5 kg m². Find the new angular speed and the change in kinetic energy.",
        steps: [
          "No external torque acts about the axis: \\(0.4 \\times 10 = 0.5\\,\\omega\\), so \\(\\omega = 8\\) rad/s.",
          "Before: \\(\\tfrac{1}{2}(0.4)(10)^{2} = 20\\) J. After: \\(\\tfrac{1}{2}(0.5)(8)^{2} = 16\\) J.",
          "The kinetic energy falls by 4 J; the angular momentum stays 4 kg m²/s.",
        ],
        answer: "8 rad/s, and the kinetic energy falls by 4 J",
      },
      selfCheckExample: {
        prompt:
          "A constant torque of 20 N m acts on a wheel of moment of inertia 4 kg m², starting from rest. Find its angular velocity and angular momentum after 3 s.",
        steps: [
          "\\(\\alpha = \\dfrac{\\tau}{I} = \\dfrac{20}{4} = 5\\ \\text{rad/s}^{2}\\), so \\(\\omega = 5 \\times 3 = 15\\) rad/s.",
          "\\(L = I\\omega = 4 \\times 15 = 60\\ \\text{kg m}^{2}\\text{/s}\\). Check: \\(\\tau t = 20 \\times 3 = 60\\).",
        ],
        answer: "15 rad/s and 60 kg m²/s",
      },
      practiceSet: [
        { prompt: "A skater spinning with arms stretched out pulls them in. What happens to her angular speed?", answer: "It increases" },
        { prompt: "Write the rotational kinetic energy of a body in terms of its angular momentum L and moment of inertia I.", answer: "\\(\\dfrac{L^{2}}{2I}\\)" },
        { prompt: "A 2 kg particle moves at 3 m/s along a straight line that passes 4 m from the origin. Find its angular momentum about the origin.", answer: "24 kg m²/s" },
        { prompt: "A wheel of moment of inertia 2 kg m² spins at 5 rad/s. Find its angular momentum.", answer: "10 kg m²/s" },
      ],
      pyqExampleId: "55790ae1-36ae-4dab-b495-40bba548dede",
      traps: [
        {
          title: "Angular momentum is kept, kinetic energy is not",
          body: "With no outside torque, \\(I\\omega\\) stays fixed while I changes. The kinetic energy \\(\\dfrac{L^{2}}{2I}\\) then changes, so do not use energy conservation in its place.",
        },
        {
          title: "Period goes with I, speed goes against it",
          body: "From \\(I\\omega = \\) constant, ω falls when I rises, so the period \\(T = \\dfrac{2\\pi}{\\omega}\\) rises in the same ratio as I.",
        },
        {
          title: "A straight-line motion can have angular momentum",
          body: "A particle moving in a straight line has angular momentum \\(mvd_{\\perp}\\) about any point off its line. It is zero only about points on the line itself.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphrm-rolling",
      name: "Rolling without slipping",
      intuition:
        "A rolling wheel moves forward and spins at the same time. Without slipping, these two motions cancel exactly where the wheel touches the ground, so that point is at rest for an instant, and they add at the top. Its kinetic energy has two parts too: the motion of the centre and the spin about it.",
      definition:
        "- Rolling without slipping: \\(v_{cm} = \\omega R\\).\n" +
        "- Speeds of points on the rim: the contact point 0, the centre \\(v_{cm}\\), the top \\(2v_{cm}\\), a rim point level with the centre \\(\\sqrt{2}\\,v_{cm}\\).\n" +
        "- Kinetic energy: \\(K = \\tfrac{1}{2}mv^{2} + \\tfrac{1}{2}I\\omega^{2} = \\tfrac{1}{2}mv^{2}\\left(1 + \\dfrac{k^{2}}{R^{2}}\\right)\\). Ring: \\(mv^{2}\\). Disc: \\(\\tfrac{3}{4}mv^{2}\\). Solid sphere: \\(\\tfrac{7}{10}mv^{2}\\).\n" +
        "- Rolling down a slope from rest through a height h: \\(v = \\sqrt{\\dfrac{2gh}{1 + k^{2}/R^{2}}}\\), and the acceleration is \\(\\dfrac{g\\sin\\theta}{1 + k^{2}/R^{2}}\\).\n" +
        "- The smaller \\(k^{2}/R^{2}\\), the faster it rolls: a solid sphere beats a disc, which beats a ring. Mass and radius do not matter.",
      formula: {
        label: "Rolling",
        latex: "v_{cm} = \\omega R, \\qquad K = \\tfrac{1}{2}mv^{2}\\left(1 + \\frac{k^{2}}{R^{2}}\\right), \\qquad v = \\sqrt{\\frac{2gh}{1 + k^{2}/R^{2}}}",
        symbols: [
          { symbol: "\\(v_{cm}\\)", meaning: "speed of the centre" },
          { symbol: "\\(k\\)", meaning: "radius of gyration about the centre" },
          { symbol: "\\(R\\)", meaning: "radius of the rolling body" },
        ],
      },
      authoredExample: {
        prompt:
          "A solid sphere rolls without slipping down a slope from rest, through a height of 1.4 m. Find its speed at the bottom. Take g = 10 m/s².",
        steps: [
          "For a solid sphere \\(k^{2}/R^{2} = \\tfrac{2}{5}\\), so \\(1 + k^{2}/R^{2} = 1.4\\).",
          "\\(v^{2} = \\dfrac{2 \\times 10 \\times 1.4}{1.4} = 20\\), so \\(v = 2\\sqrt{5} \\approx 4.5\\) m/s.",
        ],
        answer: "\\(2\\sqrt{5}\\) m/s, about 4.5 m/s",
      },
      selfCheckExample: {
        prompt:
          "A ring of mass 2 kg rolls without slipping with its centre moving at 3 m/s. Find its total kinetic energy and how much of it is rotational.",
        steps: [
          "For a ring \\(k = R\\), so \\(K = \\tfrac{1}{2}mv^{2}(1 + 1) = mv^{2} = 2 \\times 9 = 18\\) J.",
          "Rotational part: \\(\\tfrac{1}{2}I\\omega^{2} = \\tfrac{1}{2}mR^{2}\\dfrac{v^{2}}{R^{2}} = 9\\) J, half the total.",
        ],
        answer: "18 J in all, 9 J of it rotational",
      },
      practiceSet: [
        { prompt: "What fraction of the kinetic energy of a disc rolling without slipping is rotational?", answer: "One third" },
        { prompt: "A disc of mass 1 kg rolls without slipping at 2 m/s. Find its total kinetic energy.", answer: "3 J" },
        { prompt: "A ring, a disc and a solid sphere roll from rest down the same slope. Which reaches the bottom first?", answer: "The solid sphere" },
        { prompt: "A wheel of radius 0.5 m rolls without slipping at 10 rad/s. How fast does its centre move?", answer: "5 m/s" },
      ],
      pyqExampleId: "3e57f7e2-2cd6-4fd4-9a05-0480acba2228",
      traps: [
        {
          title: "Rolling energy includes the spin",
          body: "A rolling body's kinetic energy is \\(\\tfrac{1}{2}mv^{2}\\left(1 + k^{2}/R^{2}\\right)\\), not \\(\\tfrac{1}{2}mv^{2}\\). That is why a rolling body reaches the bottom of a slope slower than one sliding without friction.",
        },
        {
          title: "Shape decides the race, not mass",
          body: "Rolling speed and acceleration depend only on \\(k^{2}/R^{2}\\). A heavy disc and a light disc of any size reach the bottom together.",
        },
        {
          title: "Rolling needs friction",
          body: "On a perfectly smooth slope nothing makes the body spin, so it slides with acceleration \\(g\\sin\\theta\\). Rolling without slipping down a slope needs a rough surface.",
        },
      ],
    },
  ],
};
