import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_OS_PERIODS_NOTE: SubtopicNote = {
  subtopicName: "Springs and Pendulums",
  title: "Springs and Pendulums",
  oneLineDefinition:
    "The period of a mass on a spring, T = 2π√(m/k), the same idea for any restoring force F = −kx such as a floating body, and the simple pendulum, T = 2π√(L/g).",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026, four of them from 2025 or later. Three are about a spring: a period from a stretch, amplitudes for equal top speeds, and a box leaking sand. One compares a floating cork's period in two liquids. Three use the pendulum: two pendulums coming back in step, a heavier bob on a shorter string, and a length found from a timing.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphos-spring",
      name: "Period of a mass on a spring",
      intuition:
        "A stretched spring pulls back with a force F = −kx. The force law of SHM is F = −mω²x, so the two match when \\(\\omega = \\sqrt{k/m}\\). A stiff spring makes the mass oscillate fast; a heavy mass makes it slow. The period does not depend on how far you pull the mass before letting go.",
      definition:
        "- Force constant from a steady stretch: \\(k = \\dfrac{F}{x}\\), in N/m.\n" +
        "- \\(\\omega = \\sqrt{\\dfrac{k}{m}}\\) and \\(T = 2\\pi\\sqrt{\\dfrac{m}{k}}\\).\n" +
        "- T does not depend on the amplitude, and not on g: a vertical spring has the same period as a horizontal one.\n" +
        "- \\(T \\propto \\sqrt{m}\\): four times the mass doubles the period. Less mass means a larger ω.\n" +
        "- Top speed \\(v_{max} = A\\omega = A\\sqrt{\\dfrac{k}{m}}\\).",
      formula: {
        label: "Spring and mass",
        latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}, \\qquad \\omega = \\sqrt{\\frac{k}{m}}, \\qquad k = \\frac{F}{x}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "force constant of the spring" },
          { symbol: "\\(m\\)", meaning: "mass attached" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.2 kg block on a spring of force constant 80 N/m is pulled 4 cm from its mean position and released. Find the period and the maximum speed.",
        steps: [
          "\\(\\omega = \\sqrt{\\dfrac{80}{0.2}} = \\sqrt{400} = 20\\) rad/s.",
          "\\(T = \\dfrac{2\\pi}{20} = \\dfrac{\\pi}{10} \\approx 0.314\\) s.",
          "\\(v_{max} = A\\omega = 0.04 \\times 20 = 0.8\\) m/s.",
        ],
        answer: "About 0.314 s and 0.8 m/s",
      },
      selfCheckExample: {
        prompt: "A mass m on a spring has a period of 2 s. What is the period when a mass 4m hangs on the same spring?",
        steps: [
          "\\(T \\propto \\sqrt{m}\\), so \\(\\dfrac{T'}{T} = \\sqrt{\\dfrac{4m}{m}} = 2\\).",
          "\\(T' = 2 \\times 2 = 4\\) s.",
        ],
        answer: "4 s",
      },
      practiceSet: [
        { prompt: "Does the period of a spring and mass change if the amplitude is doubled?", answer: "No" },
        { prompt: "Two masses in the ratio 1 : 9 hang on identical springs. What is the ratio of their periods?", answer: "1 : 3" },
        { prompt: "A spring and mass is taken to the Moon. Does its period change?", answer: "No; it does not depend on g" },
        { prompt: "Two identical masses on springs of force constants k and 4k oscillate with the same amplitude. Ratio of their maximum speeds?", answer: "1 : 2" },
      ],
      pyqExampleId: "429f9656-e5a8-492f-84b8-6db320fa6a75",
      traps: [
        {
          title: "Turn centimetres into metres before k = F/x",
          body: "A 10 N force stretching a spring by 5 cm gives \\(k = 10/0.05 = 200\\) N/m. Dividing by 5 gives 2 N/m and a period ten times too long.",
        },
        {
          title: "The period does not depend on the amplitude",
          body: "Pulling the mass further makes it move faster, not take longer. T depends only on m and k.",
        },
        {
          title: "Less mass, faster oscillation",
          body: "When sand leaks out of a box on a spring, m falls, so \\(\\omega = \\sqrt{k/m}\\) rises and the period falls.",
        },
        {
          title: "Equal top speeds do not mean equal amplitudes",
          body: "Since \\(v_{max} = A\\omega\\), equal top speeds need \\(A \\propto 1/\\omega\\). The softer spring, with the smaller ω, has the larger amplitude.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphos-restoring",
      name: "Any restoring force F = −kx",
      intuition:
        "A spring is only one way to get SHM. Whenever the net force on a body moved a small distance x from its rest position is proportional to x and points back, the body does SHM, and whatever stands in front of x plays the part of k. Push a floating body down by x and the liquid pushes it up with extra upthrust: that extra force grows with x, so the body bobs in SHM.",
      definition:
        "- Write the restoring force for a small displacement in the form \\(F = -kx\\). Then \\(T = 2\\pi\\sqrt{\\dfrac{m}{k}}\\).\n" +
        "- Floating cylinder of cross-section A in a liquid of density \\(\\rho\\): pushing it down by x adds upthrust \\(\\rho gAx\\), so \\(k = \\rho gA\\).\n" +
        "- Its period: \\(T = 2\\pi\\sqrt{\\dfrac{m}{\\rho gA}}\\). The same body in different liquids has \\(T \\propto \\dfrac{1}{\\sqrt{\\rho}}\\).\n" +
        "- A floating body has \\(m = \\rho Ah\\), with h the depth below the surface, so \\(T = 2\\pi\\sqrt{\\dfrac{h}{g}}\\).",
      formula: {
        label: "Restoring force and period",
        latex: "F = -kx \\;\\Rightarrow\\; T = 2\\pi\\sqrt{\\frac{m}{k}}, \\qquad \\text{floating body: } k = \\rho gA",
      },
      authoredExample: {
        prompt:
          "A wooden cylinder of mass 0.4 kg and cross-section \\(2 \\times 10^{-3}\\ \\text{m}^{2}\\) floats upright in water of density 1000 kg/m³. It is pushed down a little and released. Find its period (g = 10 m/s²).",
        steps: [
          "\\(k = \\rho gA = 1000 \\times 10 \\times 2 \\times 10^{-3} = 20\\) N/m.",
          "\\(T = 2\\pi\\sqrt{\\dfrac{0.4}{20}} = 2\\pi\\sqrt{0.02} \\approx 2\\pi \\times 0.141 \\approx 0.89\\) s.",
        ],
        answer: "About 0.89 s",
      },
      selfCheckExample: {
        prompt:
          "A cylinder floats upright with 10 cm of its length below the water surface. Find the period of its small up-and-down oscillations (g = 10 m/s²).",
        steps: [
          "For a floating body \\(T = 2\\pi\\sqrt{\\dfrac{h}{g}}\\), with h = 0.1 m.",
          "\\(T = 2\\pi\\sqrt{\\dfrac{0.1}{10}} = 2\\pi \\times 0.1 \\approx 0.628\\) s.",
        ],
        answer: "About 0.63 s",
      },
      practiceSet: [
        { prompt: "A 0.5 kg body moves under a force \\(F = -8x\\) N. What is its period?", answer: "\\(\\pi/2 \\approx 1.57\\) s" },
        { prompt: "What must the force on a body be like for its motion to be SHM?", answer: "Proportional to the displacement and directed towards the mean position" },
        { prompt: "A floating cylinder has cross-section 0.01 m² and floats in water of density 1000 kg/m³ (g = 10 m/s²). What is the force constant of its vertical oscillation?", answer: "100 N/m" },
        { prompt: "A body of mass 2 kg moves under \\(F = -50x\\) N. What is its angular frequency?", answer: "5 rad/s" },
      ],
      pyqExampleId: "7cfd3ff5-ad23-4372-9d09-5a2975da3051",
      traps: [
        {
          title: "The liquid's density sets k",
          body: "For a floating body \\(k = \\rho gA\\), where \\(\\rho\\) is the density of the liquid, not of the body. A denser liquid pushes back harder.",
        },
        {
          title: "A denser liquid gives a shorter period",
          body: "\\(T \\propto 1/\\sqrt{\\rho}\\). Doubling the period needs a liquid a quarter as dense, not half as dense.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphos-pendulum",
      name: "The simple pendulum",
      visualizationSlug: "osc-pendulum-restoring-force",
      intuition:
        "A small heavy bob on a light string swings about its lowest point. For small swings the pull of gravity back along the arc is about mgθ, which is proportional to the displacement, so the motion is SHM. The force constant works out as mg/L, and the mass cancels: the period depends only on the length and on g.",
      definition:
        "- \\(T = 2\\pi\\sqrt{\\dfrac{L}{g}}\\) and \\(\\omega = \\sqrt{\\dfrac{g}{L}}\\), for small angles of swing.\n" +
        "- T does not depend on the mass of the bob, nor on the amplitude while it stays small.\n" +
        "- \\(T \\propto \\sqrt{L}\\): four times the length doubles the period. \\(T \\propto \\dfrac{1}{\\sqrt{g}}\\).\n" +
        "- To find g or L from a timing: \\(T = \\dfrac{\\text{time}}{\\text{number of oscillations}}\\), then \\(g = \\dfrac{4\\pi^{2}L}{T^{2}}\\) or \\(L = \\dfrac{gT^{2}}{4\\pi^{2}}\\).\n" +
        "- Two pendulums started in step are next in step when \\(n_1T_1 = n_2T_2\\) for the smallest whole numbers. The shorter one has made one swing more.",
      formula: {
        label: "Simple pendulum",
        latex: "T = 2\\pi\\sqrt{\\frac{L}{g}}, \\qquad g = \\frac{4\\pi^{2}L}{T^{2}}",
        symbols: [
          { symbol: "\\(L\\)", meaning: "length from the support to the centre of the bob" },
          { symbol: "\\(g\\)", meaning: "acceleration due to gravity" },
        ],
      },
      authoredExample: {
        prompt:
          "A pendulum has a period of 1.5 s on the Earth. What is its period on a planet where g is one quarter of its value on the Earth?",
        steps: [
          "\\(T \\propto \\dfrac{1}{\\sqrt{g}}\\), so \\(\\dfrac{T'}{T} = \\sqrt{\\dfrac{g}{g/4}} = 2\\).",
          "\\(T' = 2 \\times 1.5 = 3\\) s.",
        ],
        answer: "3 s",
      },
      selfCheckExample: {
        prompt:
          "Two pendulums of lengths 64 cm and 49 cm start swinging together in the same phase. After how many oscillations of the shorter one are they next in the same phase?",
        steps: [
          "\\(T \\propto \\sqrt{L}\\): \\(\\dfrac{T_{long}}{T_{short}} = \\sqrt{\\dfrac{64}{49}} = \\dfrac{8}{7}\\).",
          "In step again when \\(n_{short} \\times 7 = n_{long} \\times 8\\): the smallest whole numbers are \\(n_{short} = 8\\), \\(n_{long} = 7\\).",
        ],
        answer: "8 oscillations",
      },
      practiceSet: [
        { prompt: "A pendulum makes 20 oscillations in 40 s. What is its period?", answer: "2 s" },
        { prompt: "A simple pendulum is 1.6 m long at a place where g = 10 m/s². What is its angular frequency?", answer: "2.5 rad/s" },
        { prompt: "What length of simple pendulum has a period of 1 s, taking \\(g = \\pi^{2}\\) m/s²?", answer: "0.25 m" },
        { prompt: "What is the period of a 2.5 m simple pendulum where g = 10 m/s²? (Take π = 3.14.)", answer: "3.14 s" },
      ],
      pyqExampleId: "fec2d11e-0ffb-4f4b-93c6-177c176cd106",
      traps: [
        {
          title: "The bob's mass does not matter",
          body: "A heavier bob feels a larger pull but also needs a larger force to move, so the mass cancels. Only L and g set the period.",
        },
        {
          title: "Halving the length does not halve the period",
          body: "\\(T \\propto \\sqrt{L}\\), so half the length gives \\(T/\\sqrt{2}\\), about 0.71T, not T/2.",
        },
        {
          title: "Divide the time by the number of oscillations",
          body: "30 oscillations in 60 s means T = 2 s. Using 60 s as the period, or counting each pass through the mean as an oscillation, gives the wrong length.",
        },
      ],
    },
  ],
};
