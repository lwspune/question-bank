import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCULAR_KINEMATICS_NOTE: SubtopicNote = {
  subtopicName: "Kinematics of Circular Motion",
  title: "Kinematics of Circular Motion",
  oneLineDefinition:
    "Motion on a circle is described by an angle: angular velocity ω = 2πn links it to the linear speed v = ωr, and with a constant angular acceleration the angle obeys the same equations as distance in a straight line.",
  whyItMatters:
    "17 PYQs, three HARD. Three shapes: comparing speeds or accelerations of bodies that share a period, the angle turned in a given second under constant angular acceleration, " +
    "and the moment the tangential and centripetal accelerations become equal.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-angular-velocity",
      name: "Angular Velocity, Linear Speed and Centripetal Acceleration",
      intuition:
        "Every point of a turning body sweeps the same angle in the same time, so the angular velocity is shared; the linear speed grows with the distance from the axis. Two bodies with the same period therefore have the same ω, and their speeds and centripetal accelerations are in the ratio of their radii.",
      definition:
        "- \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi n\\); \\(v = \\omega r\\); \\(a_c = \\dfrac{v^2}{r} = \\omega^2 r\\), directed to the centre.\n" +
        "- Same period ⇒ same \\(\\omega\\) ⇒ \\(v \\propto r\\) and \\(a_c \\propto r\\), whatever the masses.\n" +
        "- \\(\\dfrac{a_c}{r} = 4\\pi^2n^2 \\propto n^2\\).\n" +
        "- A point at latitude \\(\\lambda\\) on the spinning Earth circles at radius \\(R\\cos\\lambda\\): speed \\(V\\cos\\lambda\\).\n" +
        "- Uniform circular motion: velocity tangent to the circle, acceleration toward the centre, the two perpendicular. The acceleration is NOT tangent to the circle.",
      formula: {
        label: "Circular motion",
        latex: "\\omega = 2\\pi n, \\qquad v = \\omega r, \\qquad a_c = \\omega^2 r = \\frac{v^2}{r}",
      },
      authoredExample: {
        prompt: "A wheel of radius 0.5 m turns at 120 rpm. Find ω, the rim speed and the rim's centripetal acceleration.",
        steps: [
          "\\(n = 2\\) rev/s, so \\(\\omega = 4\\pi\\) rad/s.",
          "\\(v = \\omega r = 2\\pi \\approx 6.28\\) m/s; \\(a_c = \\omega^2 r = 16\\pi^2 \\times 0.5 = 8\\pi^2 \\approx 79\\) m/s².",
        ],
        answer: "\\(4\\pi\\) rad/s; 6.28 m/s; 79 m/s²",
      },
      selfCheckExample: {
        prompt: "A point on the equator moves at speed V due to the Earth's spin. Speed of a point at latitude 60°?",
        steps: ["Radius of its circle \\(R\\cos 60^\\circ = \\dfrac{R}{2}\\), same ω."],
        answer: "\\(\\dfrac{V}{2}\\)",
      },
      practiceSet: [
        { prompt: "Angular speed of a clock's minute hand?", answer: "\\(\\dfrac{\\pi}{1800}\\) rad/s" },
        { prompt: "Two bodies circle radii R and r with the same period. Ratio of centripetal accelerations?", answer: "R : r" },
        { prompt: "Uniform circular motion: is the acceleration tangent to the circle?", answer: "No — it points to the centre" },
        { prompt: "x revolutions in time t on radius π/2 m. Speed?", answer: "\\(\\dfrac{\\pi^2x}{t}\\)" },
      ],
      pyqExampleId: "75c429b2-cfec-4572-8b54-760fd192a393",
      traps: [
        {
          title: "Letting the masses matter",
          body:
            "Same period means same ω; speed ratio is the radius ratio. The masses in the stem are there to be picked by mistake, and 'm₁ : m₂' is always an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-angular-kinematics",
      name: "Constant Angular Acceleration",
      intuition:
        "Swap distance for angle, speed for angular velocity and acceleration for angular acceleration, and the straight-line equations of motion work unchanged. The angle turned in the nth second from rest grows as the odd numbers 1, 3, 5, …",
      definition:
        "- \\(\\omega = \\omega_0 + \\alpha t\\), \\(\\theta = \\omega_0 t + \\dfrac{1}{2}\\alpha t^2\\), \\(\\omega^2 = \\omega_0^2 + 2\\alpha\\theta\\).\n" +
        "- From rest, angle in the \\(n\\)th second: \\(\\theta_n = \\dfrac{\\alpha}{2}(2n - 1)\\); consecutive seconds go 1 : 3 : 5 …, and equal intervals from rest 1 : 3.\n" +
        "- A fan slowing uniformly: \\(\\omega^2 = \\omega_0^2 - 2\\alpha\\theta\\) tells how many more turns it makes.\n" +
        "- Non-uniform: \\(\\omega(t) = \\alpha - \\beta t\\) stops at \\(t = \\dfrac{\\alpha}{\\beta}\\) after turning \\(\\displaystyle\\int\\omega\\,dt = \\dfrac{\\alpha^2}{2\\beta}\\).",
      formula: {
        label: "Angle in the nth second, from rest",
        latex: "\\theta_n = \\frac{\\alpha}{2}(2n - 1)",
      },
      authoredExample: {
        prompt: "A wheel starts from rest with α = 2 rad/s². Angle turned in the 3rd second, and in the first 4 seconds?",
        steps: ["\\(\\theta_3 = \\dfrac{2}{2}(2 \\times 3 - 1) = 5\\) rad.", "\\(\\theta = \\dfrac{1}{2} \\times 2 \\times 16 = 16\\) rad."],
        answer: "5 rad; 16 rad",
      },
      selfCheckExample: {
        prompt: "A switched-off fan slows to half its speed in 30 rotations. How many more rotations before it stops?",
        steps: [
          "\\(\\dfrac{\\omega_0^2}{4} = \\omega_0^2 - 2\\alpha(30)\\), so \\(2\\alpha = \\dfrac{3\\omega_0^2}{4 \\times 30}\\).",
          "From \\(\\dfrac{\\omega_0}{2}\\) to rest: \\(\\theta = \\dfrac{\\omega_0^2/4}{2\\alpha} = 10\\) rotations.",
        ],
        answer: "10",
      },
      practiceSet: [
        { prompt: "From rest: ratio of angles in the first 3 s and the next 3 s?", answer: "1 : 3" },
        { prompt: "ω = 6 − 2t rad/s. Angle turned before it stops?", answer: "9 rad" },
        { prompt: "Ratio of angles in the 2nd and 3rd seconds from rest?", answer: "3 : 5" },
      ],
      pyqExampleId: "8116da54-ee66-4568-9f8f-e140ccc26222",
      traps: [
        {
          title: "Angle in the nth second versus angle in n seconds",
          body:
            "'In the 3rd second' is one second's worth, \\(\\frac{\\alpha}{2}(2n - 1)\\); 'in 3 seconds' is \\(\\frac{1}{2}\\alpha(9)\\). Both land on options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-tangential-centripetal",
      name: "Tangential and Centripetal Acceleration Together",
      intuition:
        "A speeding-up particle on a circle has two accelerations at right angles: tangential, which changes the speed, and centripetal, which turns it. The tangential one is fixed at rα; the centripetal one grows as ω² — so from rest they become equal when ω² = α.",
      definition:
        "- \\(a_t = r\\alpha\\) (along the path); \\(a_c = \\omega^2 r\\) (to the centre); net \\(a = \\sqrt{a_t^2 + a_c^2}\\).\n" +
        "- From rest, \\(\\omega = \\alpha t\\): \\(a_c = a_t\\) when \\(\\alpha^2t^2 = \\alpha\\), i.e. \\(t = \\dfrac{1}{\\sqrt{\\alpha}}\\).\n" +
        "- Net force \\(= ma\\), using both components.",
      formula: {
        label: "Net acceleration on a circle",
        latex: "a = \\sqrt{(r\\alpha)^2 + (\\omega^2 r)^2}",
      },
      authoredExample: {
        prompt: "From rest with α = 9 rad/s². When are the tangential and centripetal accelerations equal?",
        steps: ["\\(\\omega^2 = \\alpha \\Rightarrow \\omega = 3\\) rad/s.", "\\(t = \\dfrac{\\omega}{\\alpha} = \\dfrac{1}{3}\\) s."],
        answer: "\\(\\dfrac{1}{3}\\) s",
      },
      selfCheckExample: {
        prompt: "On a 0.5 m circle a particle has speed 2 m/s and tangential acceleration 3 m/s². Net acceleration?",
        steps: ["\\(a_c = \\dfrac{4}{0.5} = 8\\); \\(a = \\sqrt{9 + 64} = \\sqrt{73} \\approx 8.5\\) m/s²."],
        answer: "≈ 8.5 m/s²",
      },
      practiceSet: [
        { prompt: "α = 16 rad/s² from rest: time when a_t = a_c?", answer: "0.25 s" },
        { prompt: "Direction of the net acceleration of a particle speeding up on a circle?", answer: "Between the tangent and the radius, inward" },
      ],
      pyqExampleId: "0fb53716-577a-4d7b-91a3-99fabb08ba5d",
      traps: [
        {
          title: "Using only the centripetal part for the net force",
          body:
            "When the speed changes, the net force needs both components. 5 kg at \\(a_t = 4\\), \\(a_c = 20\\) m/s² feels \\(5\\sqrt{416} = 20\\sqrt{26}\\) N, not 100 N.",
        },
      ],
    },
  ],
  related: [
    { label: "Dynamics of Circular Motion — the forces that supply a_c", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-circular-dynamics" },
    { label: "Angular Momentum and Torque", href: "/notes/mht-cet-physics/rotational-dynamics/cetp-angular-momentum" },
  ],
};
