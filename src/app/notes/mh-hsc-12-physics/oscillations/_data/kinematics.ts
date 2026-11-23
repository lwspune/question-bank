import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_KINEMATICS_NOTE: SubtopicNote = {
  subtopicName: "Acceleration, Velocity and Displacement in S.H.M.",
  title: "Acceleration, Velocity and Displacement in S.H.M.",
  oneLineDefinition:
    "The expressions for the acceleration, velocity and displacement of a particle in linear S.H.M., obtained from the differential equation, and how to use them at any point or any instant.",
  whyItMatters:
    "20 questions, eight of them from board papers from 2016 to 2026. The board asks you to obtain the expressions for acceleration, velocity and displacement from the differential equation (2019, 2023, 2026), and to calculate a velocity at a given displacement or time (2016, 2023), the amplitude and period from the maximum velocity and acceleration (2018), the maximum velocity (2026) and the velocity at an extreme position (2025). The textbook adds problems on the time taken to reach a point.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-expressions",
      name: "Obtaining a, v and x from the differential equation",
      intuition:
        "The differential equation already gives the acceleration. Write the acceleration as v dv/dx and integrate once to get the velocity at any displacement. Write the velocity as dx/dt and integrate again to get the displacement at any time. The two constants of integration are fixed by what happens at the extreme position and by where the particle starts.",
      definition:
        "- **Acceleration:** \\(a = \\dfrac{d^{2}x}{dt^{2}} = -\\omega^{2}x\\). It is zero at the mean position and greatest, \\(\\omega^{2}A\\), at the extremes.\n" +
        "- **Velocity:** write \\(a = v\\dfrac{dv}{dx}\\), so \\(v\\,dv = -\\omega^{2}x\\,dx\\). Integrating, \\(\\dfrac{v^{2}}{2} = -\\dfrac{\\omega^{2}x^{2}}{2} + C\\).\n" +
        "- At an extreme position \\(v = 0\\) when \\(x = A\\), so \\(C = \\dfrac{\\omega^{2}A^{2}}{2}\\) and \\(v = \\pm\\,\\omega\\sqrt{A^{2} - x^{2}}\\).\n" +
        "- **Displacement:** put \\(v = \\dfrac{dx}{dt}\\): \\(\\dfrac{dx}{\\sqrt{A^{2} - x^{2}}} = \\omega\\,dt\\). Integrating, \\(\\sin^{-1}\\left(\\dfrac{x}{A}\\right) = \\omega t + \\phi\\), so \\(x = A\\sin(\\omega t + \\phi)\\).\n" +
        "- \\(\\phi\\) is the initial phase (epoch). The \\(\\pm\\) sign in \\(v\\) shows that the particle passes each point twice in an oscillation, once in each direction.",
      formula: {
        label: "a, v and x in linear S.H.M.",
        latex: "a = -\\omega^{2}x, \\qquad v = \\pm\\,\\omega\\sqrt{A^{2} - x^{2}}, \\qquad x = A\\sin(\\omega t + \\phi)",
        symbols: [
          { symbol: "\\(A\\)", meaning: "amplitude" },
          { symbol: "\\(x\\)", meaning: "displacement from the mean position" },
          { symbol: "\\(\\phi\\)", meaning: "initial phase (epoch)" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle performs linear S.H.M. of amplitude 5 cm and angular frequency 4 rad/s. Find its speed and the magnitude of its acceleration when it is 3 cm from the mean position.",
        steps: [
          "Given: \\(A = 5\\) cm, \\(\\omega = 4\\) rad/s, \\(x = 3\\) cm.",
          "Speed: \\(v = \\omega\\sqrt{A^{2} - x^{2}} = 4\\sqrt{25 - 9} = 4 \\times 4 = 16\\) cm/s.",
          "Acceleration: \\(|a| = \\omega^{2}x = 16 \\times 3 = 48\\) cm/s², directed towards the mean position.",
        ],
        answer: "Speed 16 cm/s; acceleration 48 cm/s² towards the mean position",
      },
      selfCheckExample: {
        prompt:
          "Using \\(v = \\omega\\sqrt{A^{2} - x^{2}}\\), find the speed of a particle in linear S.H.M. at its mean position and at an extreme position.",
        steps: ["Mean position, \\(x = 0\\): \\(v = \\omega A\\).", "Extreme position, \\(x = A\\): \\(v = \\omega\\sqrt{A^{2} - A^{2}} = 0\\)."],
        answer: "\\(\\omega A\\) at the mean position; zero at an extreme",
      },
      practiceSet: [
        { prompt: "Why does the expression for the velocity in S.H.M. carry a \\(\\pm\\) sign?", answer: "The particle passes each point twice in an oscillation, once in each direction" },
        { prompt: "Which condition fixes the constant of integration when the velocity expression is derived?", answer: "At an extreme position, \\(v = 0\\) when \\(x = A\\)" },
        { prompt: "Where is the acceleration of a particle in S.H.M. greatest, and what is its magnitude there?", answer: "At the extreme positions; \\(\\omega^{2}A\\)" },
      ],
      pyqExampleId: "fe76835f-df58-485c-a6a4-9bc0387436fe",
      traps: [
        {
          title: "Skipping the constant of integration",
          body: "Writing \\(v^{2} = \\omega^{2}(A^{2} - x^{2})\\) straight after integrating loses the step mark. Show \\(C\\) and the condition \\(v = 0\\) at \\(x = A\\) that fixes it.",
        },
        {
          title: "Dropping the minus sign in the acceleration",
          body: "Without the minus sign in \\(a = -\\omega^{2}x\\), the acceleration would point away from the mean position. The sign is what makes the motion S.H.M.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-max-values",
      name: "Maximum velocity and maximum acceleration",
      intuition:
        "The speed is greatest where the restoring force is zero, at the mean position. The acceleration is greatest where the force is largest, at the extremes. Both maxima contain the amplitude, so dividing one by the other gives ω directly. The path length, from one extreme to the other, is twice the amplitude.",
      definition:
        "- \\(v_{\\max} = A\\omega\\), at the mean position. At the extremes \\(v = 0\\).\n" +
        "- \\(a_{\\max} = A\\omega^{2}\\), at the extremes. At the mean position \\(a = 0\\).\n" +
        "- \\(\\dfrac{a_{\\max}}{v_{\\max}} = \\omega\\) and \\(\\dfrac{v_{\\max}^{2}}{a_{\\max}} = A\\).\n" +
        "- Path length \\(= 2A\\). Use \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi n\\) to bring in the period or the frequency.\n" +
        "- A block resting on a piston that vibrates up and down stays in contact only while the piston's greatest downward acceleration is no more than g: \\(\\omega^{2}A \\le g\\).",
      formula: {
        label: "Maximum values",
        latex: "v_{\\max} = A\\omega, \\qquad a_{\\max} = A\\omega^{2}",
      },
      authoredExample: {
        prompt:
          "A particle performs linear S.H.M. of amplitude 2 cm and frequency 5 Hz. Find its maximum velocity and maximum acceleration. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(A = 2\\) cm \\(= 0.02\\) m, \\(n = 5\\) Hz.",
          "\\(\\omega = 2\\pi n = 2 \\times 3.142 \\times 5 = 31.42\\) rad/s.",
          "\\(v_{\\max} = A\\omega = 0.02 \\times 31.42 = 0.6284\\) m/s.",
          "\\(a_{\\max} = A\\omega^{2} = 0.02 \\times (31.42)^{2} = 0.02 \\times 987.2 = 19.74\\) m/s².",
        ],
        answer: "Maximum velocity 0.628 m/s; maximum acceleration 19.74 m/s²",
      },
      selfCheckExample: {
        prompt: "The maximum speed of a particle in S.H.M. is 10 cm/s and its angular frequency is 2 rad/s. Find the length of its path.",
        steps: ["\\(A = \\dfrac{v_{\\max}}{\\omega} = \\dfrac{10}{2} = 5\\) cm.", "Path length \\(= 2A = 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "At which position is the speed of a particle in S.H.M. greatest?", answer: "At the mean position" },
        { prompt: "The path length of an S.H.M. is 12 cm. What is its amplitude?", answer: "6 cm" },
        { prompt: "A particle in S.H.M. has amplitude 0.1 m and \\(\\omega = 3\\) rad/s. Find its maximum acceleration.", answer: "0.9 m/s²" },
        { prompt: "At what displacement is the speed of a particle in S.H.M. half its maximum speed?", answer: "\\(x = \\dfrac{\\sqrt{3}}{2}A\\), about \\(0.866A\\)" },
      ],
      pyqExampleId: "7a05ab4a-e7bb-4d75-a053-cf5e2b89a0a4",
      traps: [
        {
          title: "Taking the path length as the amplitude",
          body: "The path runs from one extreme to the other, so it is \\(2A\\). A path of 16 cm means \\(A = 8\\) cm.",
        },
        {
          title: "Losing track of units",
          body: "If \\(v_{\\max}\\) is in cm/s and \\(a_{\\max}\\) in cm/s², their ratio still gives \\(\\omega\\) in rad/s, but \\(A\\) comes out in cm. Write the unit with every answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-time",
      name: "Displacement at any instant and the time to reach a point",
      intuition:
        "x = A sin(ωt + φ) tells you where the particle is at every instant. The initial phase φ depends on where the clock starts: φ = 0 if timing starts as the particle crosses the mean position moving to the positive side, and φ = π/2 if it starts at the positive extreme. Put in the displacement you want and solve for t.",
      definition:
        "- \\(x = A\\sin(\\omega t + \\phi)\\), with \\(\\omega = \\dfrac{2\\pi}{T}\\).\n" +
        "- Starting from the mean position: \\(\\phi = 0\\), so \\(x = A\\sin\\omega t\\).\n" +
        "- Starting from the positive extreme: \\(\\phi = \\dfrac{\\pi}{2}\\), so \\(x = A\\cos\\omega t\\).\n" +
        "- Velocity at time t: \\(v = \\dfrac{dx}{dt} = A\\omega\\cos(\\omega t + \\phi)\\). Acceleration: \\(a = -A\\omega^{2}\\sin(\\omega t + \\phi)\\).\n" +
        "- The angle \\(\\omega t\\) comes out in radian. Convert it to degrees before using sine tables.",
      formula: {
        label: "Displacement and velocity in time",
        latex: "x = A\\sin(\\omega t + \\phi), \\qquad v = A\\omega\\cos(\\omega t + \\phi)",
      },
      authoredExample: {
        prompt:
          "A particle performs linear S.H.M. of period 12 s and amplitude 6 cm, starting from the mean position. How long does it take to reach a point 3 cm from the mean position?",
        steps: [
          "Given: \\(T = 12\\) s, \\(A = 6\\) cm, \\(x = 3\\) cm, \\(\\phi = 0\\).",
          "\\(\\omega = \\dfrac{2\\pi}{T} = \\dfrac{2\\pi}{12} = \\dfrac{\\pi}{6}\\) rad/s.",
          "\\(x = A\\sin\\omega t\\): \\(3 = 6\\sin\\dfrac{\\pi t}{6}\\), so \\(\\sin\\dfrac{\\pi t}{6} = \\dfrac{1}{2}\\).",
          "\\(\\dfrac{\\pi t}{6} = \\dfrac{\\pi}{6}\\), so \\(t = 1\\) s.",
        ],
        answer: "1 s",
      },
      selfCheckExample: {
        prompt:
          "A particle performs linear S.H.M. of period 8 s and amplitude 10 cm, starting from the positive extreme position. Find its displacement after 1 s.",
        steps: [
          "\\(\\omega = \\dfrac{2\\pi}{8} = \\dfrac{\\pi}{4}\\) rad/s. Starting at the extreme, \\(x = A\\cos\\omega t\\).",
          "\\(x = 10\\cos\\dfrac{\\pi}{4} = 10 \\times 0.7071 = 7.071\\) cm.",
        ],
        answer: "7.07 cm on the positive side",
      },
      practiceSet: [
        { prompt: "What is the initial phase of a particle that starts from the positive extreme position?", answer: "\\(\\pi/2\\) rad" },
        { prompt: "The displacement of a particle is \\(x = 4\\sin(2t + \\pi/6)\\) m. State its amplitude, angular frequency and epoch.", answer: "4 m, 2 rad/s, \\(\\pi/6\\) rad" },
        { prompt: "A particle in S.H.M. of period 4 s starts from the mean position. After how long does it first reach an extreme position?", answer: "1 s, a quarter of the period" },
      ],
      pyqExampleId: "844495a9-f96e-49ab-b7dd-8d70b87bc8ec",
      traps: [
        {
          title: "Using sine when timing starts at an extreme",
          body: "From the positive extreme, \\(x = A\\cos\\omega t\\). Using \\(A\\sin\\omega t\\) puts the particle at the mean position at \\(t = 0\\), which is the wrong start.",
        },
        {
          title: "Degrees and radians mixed",
          body: "\\(\\omega t\\) comes out in radian. \\(\\sin(\\pi/3)\\) is 0.866, but typing \\(\\sin 1.047\\) on a calculator set to degrees gives 0.018.",
        },
      ],
    },
  ],
};
