import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WV_TRAVELLING_NOTE: SubtopicNote = {
  subtopicName: "Travelling Waves and Wave Speed",
  title: "Travelling Waves and Wave Speed",
  oneLineDefinition:
    "The equation y = a sin(kx − ωt) of a travelling wave, how to read its wavelength, frequency, speed and the phase difference between two points from it, and what sets the speed of a wave on a string and of sound in a gas.",
  whyItMatters:
    "Three NEET questions, from 2022, Re-NEET 2024 and NEET 2026. Two read a wave equation: the frequency of a wave written as y = C sin(2π/λ)(at − x) (Re-NEET 2024), and the phase difference between two points 0.5 m apart on a wave written in centimetres (NEET 2026). One asks how the speed of a wave on a string changes when the tension is doubled (2022).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwv-equation",
      name: "The equation of a travelling wave",
      intuition:
        "As a wave passes along a string, every point on it moves up and down in simple harmonic motion, but each point is a little behind the one before it. The wave equation says both things at once: the term in t tells how fast each point oscillates, and the term in x tells how far along the string you must go for the motion to repeat. The speed of the wave is the ratio of the two. Two points a distance apart are out of step by a phase that grows with that distance.",
      definition:
        "- A wave travelling along +x: \\(y = a\\sin(kx - \\omega t)\\), or equally \\(y = a\\sin(\\omega t - kx)\\). When the x and t terms have the same sign, \\(y = a\\sin(kx + \\omega t)\\), the wave travels along \\(-x\\).\n" +
        "- Angular wave number \\(k = \\dfrac{2\\pi}{\\lambda}\\); angular frequency \\(\\omega = 2\\pi f = \\dfrac{2\\pi}{T}\\).\n" +
        "- Wave speed: \\(v = \\dfrac{\\omega}{k} = f\\lambda\\).\n" +
        "- Phase difference between two points a distance \\(\\Delta x\\) apart: \\(\\Delta\\phi = k\\Delta x = \\dfrac{2\\pi}{\\lambda}\\Delta x\\). Use the same unit of length for k and \\(\\Delta x\\).\n" +
        "- A wave written as \\(y = a\\sin 2\\pi\\left(ft - \\dfrac{x}{\\lambda}\\right)\\) has f before t and \\(\\dfrac{1}{\\lambda}\\) before x inside the bracket.",
      formula: {
        label: "Travelling wave",
        latex:
          "y = a\\sin(kx - \\omega t), \\qquad k = \\frac{2\\pi}{\\lambda}, \\qquad \\omega = 2\\pi f, \\qquad v = \\frac{\\omega}{k} = f\\lambda, \\qquad \\Delta\\phi = k\\,\\Delta x",
        symbols: [
          { symbol: "\\(k\\)", meaning: "angular wave number, in rad per unit length" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency, in rad/s" },
          { symbol: "\\(\\Delta\\phi\\)", meaning: "phase difference between two points" },
        ],
      },
      authoredExample: {
        prompt:
          "A wave is given by \\(y = 0.03\\sin(200\\pi t - 0.5\\pi x)\\), with x and y in metres and t in seconds. Find its wavelength, frequency, speed and direction of travel.",
        steps: [
          "\\(k = 0.5\\pi\\) rad/m, so \\(\\lambda = \\dfrac{2\\pi}{k} = \\dfrac{2\\pi}{0.5\\pi} = 4\\) m.",
          "\\(\\omega = 200\\pi\\) rad/s, so \\(f = \\dfrac{\\omega}{2\\pi} = 100\\) Hz.",
          "\\(v = f\\lambda = 100 \\times 4 = 400\\) m/s.",
          "The t and x terms have opposite signs, so the wave travels along +x.",
        ],
        answer: "4 m, 100 Hz, 400 m/s, along +x",
      },
      selfCheckExample: {
        prompt:
          "A wave is given by \\(y = 0.02\\sin(4x + 100t)\\), in SI units. In which direction does it travel, and at what speed?",
        steps: [
          "The x and t terms have the same sign, so the wave travels along \\(-x\\).",
          "\\(v = \\dfrac{\\omega}{k} = \\dfrac{100}{4} = 25\\) m/s.",
        ],
        answer: "Along \\(-x\\), at 25 m/s",
      },
      practiceSet: [
        { prompt: "A wave has wavelength 0.5 m. What is its angular wave number k?", answer: "\\(4\\pi\\) rad/m" },
        { prompt: "A wave has angular frequency \\(100\\pi\\) rad/s. What is its frequency?", answer: "50 Hz" },
        { prompt: "A sound wave has frequency 500 Hz and wavelength 0.68 m. What is its speed?", answer: "340 m/s" },
        { prompt: "In which direction does the wave \\(y = a\\sin(kx - \\omega t)\\) travel?", answer: "Along +x" },
      ],
      pyqExampleId: "e5f6cdcc-ddf0-4b2b-b5a0-631a6988a094",
      traps: [
        {
          title: "Match the units before finding a phase difference",
          body: "When x is in centimetres, k is in radians per centimetre. Turn the distance into centimetres too before using \\(\\Delta\\phi = k\\Delta x\\); mixing metres and centimetres puts the answer out by a factor of 100.",
        },
        {
          title: "The signs decide the direction",
          body: "Opposite signs on the x and t terms mean the wave moves along +x; the same sign means it moves along \\(-x\\).",
        },
        {
          title: "The number before t may be f, not ω",
          body: "In \\(y = a\\sin 2\\pi(ft - x/\\lambda)\\) the 2π is taken outside, so the number before t is the frequency itself. Multiply by 2π only when you want \\(\\omega\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwv-speed",
      name: "Wave speed on a string and in a gas",
      intuition:
        "How fast a wave runs depends on the medium, not on the source. On a string, a tighter string pulls each bit back faster, so the wave is quicker, while a heavier string is slower to move. Sound in a gas travels faster when the gas is hotter. The source sets only the frequency, and the frequency stays the same when the wave passes into a new medium; the wavelength changes to fit the new speed.",
      definition:
        "- Transverse wave on a stretched string: \\(v = \\sqrt{\\dfrac{T}{\\mu}}\\), where T is the tension and \\(\\mu\\) the mass per unit length, \\(\\mu = \\dfrac{m}{L}\\).\n" +
        "- For a wire of one material, \\(\\mu\\) goes as the square of the diameter.\n" +
        "- Sound in a fluid: \\(v = \\sqrt{\\dfrac{B}{\\rho}}\\), with B the bulk modulus and \\(\\rho\\) the density.\n" +
        "- In a gas, Newton took the compressions as isothermal and got \\(v = \\sqrt{P/\\rho}\\), which is too small. Laplace's correction (adiabatic): \\(v = \\sqrt{\\dfrac{\\gamma P}{\\rho}}\\).\n" +
        "- For an ideal gas, \\(v = \\sqrt{\\dfrac{\\gamma RT}{M}}\\), so \\(v \\propto \\sqrt{T}\\) with T in kelvin.\n" +
        "- The frequency is fixed by the source; in a new medium \\(v\\) and \\(\\lambda\\) change together, \\(v = f\\lambda\\).",
      formula: {
        label: "Wave speed",
        latex:
          "v_{string} = \\sqrt{\\frac{T}{\\mu}}, \\qquad v_{gas} = \\sqrt{\\frac{\\gamma P}{\\rho}} = \\sqrt{\\frac{\\gamma RT}{M}}",
        symbols: [
          { symbol: "\\(T\\)", meaning: "tension in the string (in the gas formula, the temperature in kelvin)" },
          { symbol: "\\(\\mu\\)", meaning: "mass per unit length of the string" },
          { symbol: "\\(\\gamma\\)", meaning: "ratio of the specific heats of the gas" },
        ],
      },
      authoredExample: {
        prompt:
          "Two wires of the same metal are under the same tension. One has twice the diameter of the other. Find the ratio of the wave speeds, thick wire to thin wire.",
        steps: [
          "Same metal: \\(\\mu = \\rho A\\), and A goes as \\(d^{2}\\). So the thick wire has 4 times the mass per unit length.",
          "\\(v = \\sqrt{T/\\mu}\\) with T the same, so \\(v \\propto \\dfrac{1}{\\sqrt{\\mu}} \\propto \\dfrac{1}{d}\\).",
          "Thick : thin = 1 : 2.",
        ],
        answer: "1 : 2",
      },
      selfCheckExample: {
        prompt: "A wire 2 m long has a mass of 20 g and is under a tension of 200 N. Find the speed of a transverse wave on it.",
        steps: [
          "\\(\\mu = \\dfrac{0.02}{2} = 0.01\\) kg/m.",
          "\\(v = \\sqrt{\\dfrac{200}{0.01}} = \\sqrt{20000} = 100\\sqrt{2} \\approx 141\\) m/s.",
        ],
        answer: "\\(100\\sqrt{2} \\approx 141\\) m/s",
      },
      practiceSet: [
        { prompt: "A string has mass per unit length 0.04 kg/m and tension 16 N. What is the wave speed on it?", answer: "20 m/s" },
        { prompt: "The temperature of a gas is raised from 300 K to 1200 K. By what factor does the speed of sound in it change?", answer: "It doubles" },
        { prompt: "Write Laplace's formula for the speed of sound in a gas at pressure P and density ρ.", answer: "\\(v = \\sqrt{\\gamma P/\\rho}\\)" },
        { prompt: "A wave on a light string passes into a heavier string joined to it. Which stays the same: frequency, wavelength or speed?", answer: "Frequency" },
      ],
      pyqExampleId: "4a5d0467-da34-4779-ab45-2c5381d34d63",
      traps: [
        {
          title: "Speed goes as the square root of tension",
          body: "Doubling the tension on a string multiplies the wave speed by \\(\\sqrt{2}\\), not by 2. To double the speed, the tension must be made four times.",
        },
        {
          title: "Frequency does not set the speed",
          body: "Raising the frequency of a source does not make its wave faster; the medium fixes the speed, so the wavelength gets shorter instead.",
        },
        {
          title: "Use kelvin for the speed of sound",
          body: "The speed of sound in a gas goes as \\(\\sqrt{T}\\) with T in kelvin. Going from 27 °C to 54 °C does not multiply it by \\(\\sqrt{2}\\).",
        },
      ],
    },
  ],
};
