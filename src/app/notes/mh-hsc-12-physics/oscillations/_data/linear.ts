import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_LINEAR_NOTE: SubtopicNote = {
  subtopicName: "Periodic Motion and Linear S.H.M.",
  title: "Periodic Motion and Linear S.H.M.",
  oneLineDefinition:
    "What makes a motion periodic and oscillatory, the definition of linear S.H.M. through the restoring force F = -kx, and the differential equation that every linear S.H.M. obeys.",
  whyItMatters:
    "8 questions, six of them from board papers from 2017 to 2025. The board asks you to define linear S.H.M. (2020), obtain or write its differential equation (2017, 2020, 2024), find the force constant from a restoring force (2024, 2025), and find the frequency and period from a given differential equation (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-periodic",
      name: "Periodic motion and oscillation",
      intuition:
        "A motion that repeats itself after equal intervals of time is periodic: the hands of a clock, the earth going round the sun, a swinging pendulum. When the body moves to and fro about a fixed point, the motion is also oscillatory. Every oscillation needs a restoring force that pulls the body back towards the middle, and inertia that carries it past.",
      definition:
        "- **Periodic motion:** a motion that repeats itself after a fixed interval of time. That interval is the **period**.\n" +
        "- **Oscillatory motion:** a periodic motion in which the body moves to and fro about a fixed point, its **mean position** (equilibrium position).\n" +
        "- Every oscillatory motion is periodic, but a periodic motion need not be oscillatory. The earth going round the sun is periodic, not oscillatory.\n" +
        "- The **restoring force** always acts towards the mean position.\n" +
        "- In a real oscillator a resistive force such as air drag also acts, so the amplitude **gradually decreases**. Such an oscillation is damped (see the Free, Forced and Damped Vibrations page).",
      authoredExample: {
        prompt: "Classify each motion as periodic, oscillatory, both or neither: (a) the bob of a simple pendulum, (b) the hands of a clock, (c) a ball rolling down a slope.",
        steps: [
          "(a) The bob repeats its motion after equal intervals and moves to and fro about its mean position: both.",
          "(b) The hands repeat their motion every hour or every twelve hours, but never move back: periodic only.",
          "(c) The ball does not repeat its motion: neither.",
        ],
        answer: "(a) both, (b) periodic only, (c) neither",
      },
      selfCheckExample: {
        prompt: "Is the motion of the earth round the sun periodic, oscillatory, or both? Give a reason.",
        steps: [
          "It repeats itself every year, so it is periodic.",
          "The earth does not move to and fro about a mean position, so it is not oscillatory.",
        ],
        answer: "Periodic but not oscillatory",
      },
      practiceSet: [
        { prompt: "In which direction does the restoring force on an oscillating body always act?", answer: "Towards the mean position" },
        { prompt: "At which position would an oscillating body stay at rest if it were placed there at rest?", answer: "The mean (equilibrium) position" },
        { prompt: "Is the motion of a plucked guitar string periodic, oscillatory, or both?", answer: "Both. It moves to and fro about its rest position, repeating after equal intervals" },
      ],
      traps: [
        {
          title: "Calling every periodic motion oscillatory",
          body: "A motion is oscillatory only if the body moves to and fro about a mean position. The hands of a clock move periodically but never go back and forth.",
        },
        {
          title: "Mixing up where the force and the speed are largest",
          body: "The restoring force is zero at the mean position and greatest at the extremes. The body moves fastest at the mean position, where the force is zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-linear-shm",
      name: "Linear S.H.M. and the force constant",
      intuition:
        "Pull a mass on a spring to one side and the spring pulls it back. Pull it twice as far and the pull doubles. A straight-line motion driven by a force like this, always towards the mean position and growing in step with the displacement, is linear simple harmonic motion. The constant that links force and displacement, k, tells you how stiff the system is.",
      definition:
        "- **Linear S.H.M.:** the linear periodic motion of a body in which the restoring force is always directed towards the mean position and its magnitude is directly proportional to the displacement from the mean position.\n" +
        "- In symbols, \\(F \\propto -x\\), so \\(F = -kx\\). The minus sign shows that the force is opposite to the displacement.\n" +
        "- \\(k\\) is the **force constant**: the restoring force per unit displacement, \\(k = F/x\\), in N/m.\n" +
        "- Dividing by the mass, \\(a = -\\dfrac{k}{m}x = -\\omega^{2}x\\) with \\(\\omega = \\sqrt{k/m}\\). So linear S.H.M. can also be defined by its acceleration: proportional to the displacement and directed towards the mean position.\n" +
        "- At the mean position \\(x = 0\\), so the force and the acceleration are zero. Both are greatest at the extreme positions.",
      formula: {
        label: "Restoring force in linear S.H.M.",
        latex: "F = -kx, \\qquad a = -\\omega^{2}x, \\qquad \\omega = \\sqrt{\\frac{k}{m}}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "force constant, in N/m" },
          { symbol: "\\(x\\)", meaning: "displacement from the mean position" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency, in rad/s" },
        ],
      },
      authoredExample: {
        prompt:
          "A body of mass 0.5 kg performs linear S.H.M. with a force constant of 8 N/m. Find the restoring force on it and its acceleration when it is 5 cm from the mean position.",
        steps: [
          "Given: \\(m = 0.5\\) kg, \\(k = 8\\) N/m, \\(x = 5\\) cm \\(= 0.05\\) m.",
          "Formula: \\(F = -kx\\) and \\(a = F/m\\).",
          "\\(F = -8 \\times 0.05 = -0.4\\) N.",
          "\\(a = \\dfrac{-0.4}{0.5} = -0.8\\) m/s². The minus signs show that both point towards the mean position.",
        ],
        answer: "Restoring force 0.4 N and acceleration 0.8 m/s², both towards the mean position",
      },
      selfCheckExample: {
        prompt:
          "A particle in linear S.H.M. has an acceleration of 2 m/s² when it is 0.5 m from the mean position. Find its angular frequency.",
        steps: ["\\(a = \\omega^{2}x\\) in magnitude, so \\(\\omega^{2} = \\dfrac{2}{0.5} = 4\\ \\text{s}^{-2}\\).", "\\(\\omega = 2\\) rad/s."],
        answer: "2 rad/s",
      },
      practiceSet: [
        { prompt: "What is the SI unit of force constant?", answer: "N/m" },
        { prompt: "What is the restoring force on a body in linear S.H.M. when it is at the mean position?", answer: "Zero" },
        { prompt: "A body in linear S.H.M. is 3 cm to the right of its mean position. In which direction is its acceleration?", answer: "To the left, towards the mean position" },
        { prompt: "The displacement of a body in linear S.H.M. is doubled. What happens to the restoring force?", answer: "It doubles" },
      ],
      pyqExampleId: "392f268a-c111-4ffd-b069-1ccbde5b2869",
      traps: [
        {
          title: "Leaving the direction out of the definition",
          body: "A definition that says only 'force proportional to displacement' loses the mark. Say that the force is always directed towards the mean position, and write \\(F = -kx\\) with the minus sign explained.",
        },
        {
          title: "Dividing by a displacement in centimetres",
          body: "Convert the displacement to metres before finding \\(k = F/x\\). A force of 1 N at 2 cm gives \\(k = 50\\) N/m, not 0.5 N/m.",
        },
        {
          title: "Using the mass to find the force constant",
          body: "The force constant needs only the force and the displacement. The mass enters only when you go on to find \\(\\omega\\) or the period.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-diff-eq",
      name: "Differential equation of linear S.H.M.",
      intuition:
        "Newton's second law turns the definition into an equation. The restoring force is minus k times x, and it equals mass times acceleration. So the second derivative of x is a negative constant times x itself. Any equation of this shape describes S.H.M., and the constant in front of x is the square of the angular frequency.",
      definition:
        "- Restoring force: \\(F \\propto -x\\), so \\(F = -kx\\).\n" +
        "- Newton's second law: \\(F = ma = m\\dfrac{d^{2}x}{dt^{2}}\\).\n" +
        "- Equating the two: \\(m\\dfrac{d^{2}x}{dt^{2}} = -kx\\), so \\(\\dfrac{d^{2}x}{dt^{2}} = -\\dfrac{k}{m}x\\).\n" +
        "- \\(k/m\\) is a positive constant; put \\(\\dfrac{k}{m} = \\omega^{2}\\). Then \\(\\dfrac{d^{2}x}{dt^{2}} + \\omega^{2}x = 0\\). This is the **differential equation of linear S.H.M.**\n" +
        "- To read \\(\\omega\\) from a given equation, compare it with \\(\\dfrac{d^{2}x}{dt^{2}} = -\\omega^{2}x\\): the number in front of \\(x\\) is \\(\\omega^{2}\\).",
      formula: {
        label: "Differential equation of linear S.H.M.",
        latex: "\\frac{d^{2}x}{dt^{2}} + \\omega^{2}x = 0, \\qquad \\omega^{2} = \\frac{k}{m}",
      },
      authoredExample: {
        prompt:
          "A body of mass 2 kg is attached to a spring of force constant 50 N/m and set oscillating. Write the differential equation of its motion and find its period. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(m = 2\\) kg, \\(k = 50\\) N/m.",
          "\\(\\omega^{2} = \\dfrac{k}{m} = \\dfrac{50}{2} = 25\\ \\text{s}^{-2}\\).",
          "Differential equation: \\(\\dfrac{d^{2}x}{dt^{2}} + 25x = 0\\).",
          "\\(\\omega = 5\\) rad/s, so \\(T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2 \\times 3.142}{5} = 1.257\\) s.",
        ],
        answer: "\\(\\dfrac{d^{2}x}{dt^{2}} + 25x = 0\\); period 1.257 s",
      },
      selfCheckExample: {
        prompt:
          "The differential equation of a linear S.H.M. in SI units is \\(\\dfrac{d^{2}x}{dt^{2}} = -16x\\). Find its period. (\\(\\pi = 3.142\\))",
        steps: ["\\(\\omega^{2} = 16\\), so \\(\\omega = 4\\) rad/s.", "\\(T = \\dfrac{2\\pi}{4} = \\dfrac{6.284}{4} = 1.571\\) s."],
        answer: "1.571 s",
      },
      practiceSet: [
        { prompt: "For a mass m on a spring of force constant k, what does \\(\\omega^{2}\\) in the differential equation of S.H.M. equal?", answer: "\\(k/m\\)" },
        { prompt: "The equation of a linear S.H.M. is \\(\\dfrac{d^{2}x}{dt^{2}} = -100x\\) in SI units. Find \\(\\omega\\).", answer: "10 rad/s" },
        { prompt: "Which law of motion is used to obtain the differential equation of linear S.H.M.?", answer: "Newton's second law, \\(F = ma\\)" },
      ],
      pyqExampleId: "64ca7943-756d-49be-a81b-f493609978d5",
      traps: [
        {
          title: "Taking the number in front of x as ω",
          body: "In \\(\\dfrac{d^{2}x}{dt^{2}} = -49x\\), the 49 is \\(\\omega^{2}\\), so \\(\\omega = 7\\) rad/s. Using 49 as \\(\\omega\\) makes the period wrong by a factor of 7.",
        },
        {
          title: "Writing the equation without naming the symbols",
          body: "For full marks, say what the symbols mean after the equation: \\(x\\) is the displacement from the mean position and \\(\\omega\\) is the angular frequency, with \\(\\omega^{2} = k/m\\).",
        },
      ],
    },
  ],
};
