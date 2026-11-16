import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_OS_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Energy in SHM",
  title: "Energy in SHM",
  oneLineDefinition:
    "Kinetic energy ½mv² and potential energy ½kx² passing back and forth while the total ½kA² stays fixed, and how each energy changes with time at twice the frequency of the motion.",
  whyItMatters:
    "Five NEET questions from 2021 to 2026, three of them from 2026. Three split the energy: where kinetic and potential energy are equal (Re-NEET 2024), a bob's speed at the mean position from its total energy (NEET 2026), and when the graph of v against x is a circle (Re-NEET 2026). Two ask how energy changes with time: the frequency of the potential energy (NEET 2021) and the shape of a pendulum's kinetic energy graph (NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphos-energy",
      name: "Kinetic, potential and total energy",
      intuition:
        "A stretched spring stores potential energy, and the moving mass has kinetic energy. As the particle swings, energy passes from one form to the other, but with no friction the total stays the same. At the mean position it is all kinetic; at the extremes, where the particle stops for an instant, it is all potential.",
      definition:
        "- Potential energy \\(U = \\tfrac{1}{2}kx^{2}\\); kinetic energy \\(K = \\tfrac{1}{2}mv^{2} = \\tfrac{1}{2}k(A^{2} - x^{2})\\).\n" +
        "- Total energy \\(E = K + U = \\tfrac{1}{2}kA^{2} = \\tfrac{1}{2}m\\omega^{2}A^{2}\\), the same at every point (here \\(k = m\\omega^{2}\\)).\n" +
        "- At the mean position \\(K = E\\), so \\(\\tfrac{1}{2}mv_{max}^{2} = E\\). At the extremes \\(U = E\\).\n" +
        "- K = U at \\(x = \\pm\\dfrac{A}{\\sqrt{2}}\\). At \\(x = \\dfrac{A}{2}\\), \\(U = \\dfrac{E}{4}\\) and \\(K = \\dfrac{3E}{4}\\).\n" +
        "- \\(E \\propto A^{2}\\): doubling the amplitude makes the energy four times.\n" +
        "- Writing \\(\\tfrac{1}{2}mv^{2} + \\tfrac{1}{2}kx^{2} = E\\) as \\(\\dfrac{x^{2}}{2E/k} + \\dfrac{v^{2}}{2E/m} = 1\\) shows that the v against x graph is an ellipse. It becomes a circle only when the two denominators are equal, that is when k and m have the same number.",
      formula: {
        label: "Energy in SHM",
        latex: "E = \\frac{1}{2}kA^{2} = \\frac{1}{2}m\\omega^{2}A^{2}, \\qquad U = \\frac{1}{2}kx^{2}, \\qquad K = \\frac{1}{2}k\\left(A^{2} - x^{2}\\right)",
      },
      authoredExample: {
        prompt:
          "A 0.1 kg mass on a spring of force constant 40 N/m oscillates with amplitude 5 cm. Find the total energy and the kinetic energy at x = 3 cm.",
        steps: [
          "\\(E = \\tfrac{1}{2}kA^{2} = \\tfrac{1}{2} \\times 40 \\times 0.05^{2} = 20 \\times 0.0025 = 0.05\\) J.",
          "\\(K = \\tfrac{1}{2}k(A^{2} - x^{2}) = 20 \\times (0.0025 - 0.0009) = 20 \\times 0.0016 = 0.032\\) J.",
        ],
        answer: "0.05 J in all; 0.032 J of it is kinetic at x = 3 cm",
      },
      selfCheckExample: {
        prompt:
          "A 50 g pendulum bob passes its lowest point at 2 m/s. What is its total energy, and how much of it is potential (measured from the lowest point) when its speed is 1 m/s?",
        steps: [
          "At the lowest point all the energy is kinetic: \\(E = \\tfrac{1}{2} \\times 0.05 \\times 2^{2} = 0.1\\) J.",
          "At 1 m/s: \\(K = \\tfrac{1}{2} \\times 0.05 \\times 1^{2} = 0.025\\) J.",
          "\\(U = E - K = 0.1 - 0.025 = 0.075\\) J.",
        ],
        answer: "0.1 J in all; 0.075 J potential",
      },
      practiceSet: [
        { prompt: "The amplitude of an oscillator is doubled. By what factor does its total energy change?", answer: "It becomes four times" },
        { prompt: "What fraction of the total energy of a particle in SHM is potential at half the amplitude?", answer: "One quarter" },
        { prompt: "At which point of SHM is the kinetic energy largest?", answer: "At the mean position" },
        { prompt: "A 0.2 kg particle in SHM has a total energy of 0.4 J. What is its speed at the mean position?", answer: "2 m/s" },
      ],
      pyqExampleId: "e85cacf3-a1b9-4ad6-86cd-6aa77d6dd34d",
      traps: [
        {
          title: "The energies are equal at A/√2, not at A/2",
          body: "At half the amplitude the potential energy is only a quarter of the total. Kinetic and potential energy are equal at \\(x = A/\\sqrt{2}\\), about 0.71A.",
        },
        {
          title: "Energy goes as the square of the amplitude",
          body: "\\(E = \\tfrac{1}{2}kA^{2}\\), so twice the amplitude stores four times the energy, not twice.",
        },
        {
          title: "Turn grams into kilograms",
          body: "A 20 g bob is 0.02 kg. Putting 20 into \\(\\tfrac{1}{2}mv^{2}\\) makes the speed about 32 times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphos-energy-time",
      name: "Energy against time",
      intuition:
        "The displacement goes as a sine of time, so the potential energy goes as a sine squared and the kinetic energy as a cosine squared. A squared sine repeats twice in each cycle and never goes below zero. So each energy rises and falls twice per oscillation, between 0 and E, while their sum stays a flat line.",
      definition:
        "- Starting at the mean position: \\(U = E\\sin^{2}\\omega t = \\dfrac{E}{2}(1 - \\cos 2\\omega t)\\) and \\(K = E\\cos^{2}\\omega t = \\dfrac{E}{2}(1 + \\cos 2\\omega t)\\).\n" +
        "- Each energy varies with frequency \\(2\\nu\\) and period \\(\\dfrac{T}{2}\\).\n" +
        "- K is zero at the extremes and equal to E at the mean, each twice per period. Neither energy is ever negative.\n" +
        "- Averaged over a period, K and U are each \\(\\dfrac{E}{2}\\).\n" +
        "- Released from an extreme at t = 0, a pendulum has K = 0 at t = 0, T/2 and T, and K = E at T/4 and 3T/4.",
      formula: {
        label: "Energy against time",
        latex: "U = E\\sin^{2}\\omega t = \\frac{E}{2}\\left(1 - \\cos 2\\omega t\\right), \\qquad K = E\\cos^{2}\\omega t = \\frac{E}{2}\\left(1 + \\cos 2\\omega t\\right)",
      },
      authoredExample: {
        prompt:
          "An oscillator of period 0.6 s and total energy 0.8 J starts at its mean position. Find its kinetic energy at t = 0.1 s, and the first time after t = 0 at which its kinetic energy is zero.",
        steps: [
          "\\(\\omega t = \\dfrac{2\\pi}{0.6} \\times 0.1 = \\dfrac{\\pi}{3}\\).",
          "\\(K = E\\cos^{2}\\dfrac{\\pi}{3} = 0.8 \\times \\dfrac{1}{4} = 0.2\\) J.",
          "K is first zero at the extreme, reached at \\(\\dfrac{T}{4} = 0.15\\) s.",
        ],
        answer: "0.2 J; at 0.15 s",
      },
      selfCheckExample: {
        prompt:
          "A particle in SHM starts at its mean position. In one period T of the motion, how many times does its potential energy reach its largest value, and when?",
        steps: [
          "\\(U = E\\sin^{2}\\omega t\\) is largest when \\(\\sin\\omega t = \\pm 1\\), at the two extremes.",
          "\\(\\omega t = \\dfrac{\\pi}{2}\\) and \\(\\dfrac{3\\pi}{2}\\), that is \\(t = \\dfrac{T}{4}\\) and \\(\\dfrac{3T}{4}\\).",
        ],
        answer: "Twice: at T/4 and 3T/4",
      },
      practiceSet: [
        { prompt: "The total energy of an oscillator is E. What is its average kinetic energy over one period?", answer: "\\(E/2\\)" },
        { prompt: "Taking the mean position as zero, can the potential energy of a particle in SHM be negative?", answer: "No" },
        { prompt: "A pendulum of period T is released from rest at an extreme at t = 0. When is its kinetic energy first largest?", answer: "At \\(t = T/4\\)" },
        { prompt: "What is the shape of the graph of total energy against time in SHM?", answer: "A horizontal straight line" },
      ],
      pyqExampleId: "3586d2c7-91b0-4c1f-890d-c000afcd887d",
      traps: [
        {
          title: "Energy repeats twice per oscillation",
          body: "Kinetic and potential energy each vary at frequency \\(2\\nu\\), with period T/2. Giving them the oscillator's own frequency \\(\\nu\\) is wrong.",
        },
        {
          title: "A kinetic energy graph never dips below zero",
          body: "\\(K = E\\cos^{2}\\omega t\\) is a row of humps touching zero. A graph that swings below the axis like a plain sine cannot be kinetic energy.",
        },
        {
          title: "The starting point sets where K is zero",
          body: "Released from an extreme, K is zero at 0, T/2 and T. Started from the mean position, K is zero at T/4 and 3T/4.",
        },
      ],
    },
  ],
};
