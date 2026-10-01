import type { SubtopicNote } from "@/app/notes/_types";

export const EQUATION_WAVE_NOTE: SubtopicNote = {
  subtopicName: "Wave Equation and Particle Motion",
  title: "Wave Equation and Particle Motion",
  oneLineDefinition:
    "A travelling wave y = A sin(ωt − kx) carries its frequency in ω = 2πf, its wavelength in k = 2π/λ and its speed in ω/k; each particle only oscillates in place.",
  whyItMatters:
    "Nineteen PYQs, five of them asking for a number, and three from 2026. Ten read a speed, frequency, wavelength or phase difference off a given equation; four build the equation from a description or ask which function is a travelling wave; five are about how fast the particles move, or how intensity falls away from a point source. The reading is quick once the coefficients are pulled out cleanly; marks go on units and on the direction of travel.",
  concepts: [
    // C1 — reading ω, k, f, λ and v off an equation
    {
      kind: "formula" as const,
      slug: "jpwave-read-equation",
      name: "Reading speed, frequency and wavelength from a wave equation",
      intuition:
        "In \\(y = A\\sin(\\omega t - kx)\\) the number in front of t says how fast each point oscillates, and the number in front of x says how fast the phase changes along the string. Their ratio is the speed. Expand any common factor such as \\(\\pi\\) or \\(2\\pi\\) first, and put x and t in the units you want the answer in.",
      definition:
        "- \\(\\omega = 2\\pi f\\), \\(k = \\dfrac{2\\pi}{\\lambda}\\), and the wave speed is \\(v = \\dfrac{\\omega}{k} = f\\lambda\\).\n" +
        "- **Direction**: opposite signs on the x and t terms, as in \\(\\omega t - kx\\), mean travel along +x. The same sign, as in \\(\\omega t + kx\\), means travel along −x.\n" +
        "- In the form \\(A\\sin\\dfrac{2\\pi}{\\lambda}(vt - x)\\) the speed is the number in front of t inside the bracket.\n" +
        "- In \\(A\\sin 2\\pi(ft - x/\\lambda)\\) the frequency and wavelength can be read directly.\n" +
        "- A constant added inside the bracket is only a starting phase; it does not change f, λ or v.\n" +
        "- **Phase difference** between two points \\(\\Delta x\\) apart: \\(\\Delta\\phi = k\\,\\Delta x = \\dfrac{2\\pi}{\\lambda}\\Delta x\\).\n" +
        "- If x is in cm, k is in cm⁻¹, and \\(\\omega/k\\) comes out in cm/s. Divide by 100 for m/s; multiply m/s by 18/5 for km/h.",
      formula: {
        label: "Wave speed from the equation",
        latex: "v = \\frac{\\omega}{k} = f\\lambda \\qquad \\omega = 2\\pi f \\qquad k = \\frac{2\\pi}{\\lambda} \\qquad \\Delta\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x",
      },
      authoredExample: {
        prompt:
          "A wave is given by \\(y = 2\\sin\\pi\\left(100t - \\dfrac{x}{40}\\right)\\), with x and y in cm and t in s. Find its frequency, wavelength, speed in m/s and direction of travel.",
        steps: [
          "Expand the \\(\\pi\\): \\(\\omega = 100\\pi\\ \\text{rad/s}\\) and \\(k = \\dfrac{\\pi}{40}\\ \\text{cm}^{-1}\\).",
          "\\(f = \\dfrac{\\omega}{2\\pi} = 50\\ \\text{Hz}\\) and \\(\\lambda = \\dfrac{2\\pi}{k} = 80\\ \\text{cm}\\).",
          "\\(v = f\\lambda = 50 \\times 80 = 4000\\ \\text{cm/s} = 40\\ \\text{m/s}\\). Check: \\(\\omega/k = 100\\pi \\times 40/\\pi = 4000\\ \\text{cm/s}\\).",
          "The t and x terms have opposite signs, so the wave travels along +x.",
        ],
        answer: "50 Hz, 80 cm, \\(40\\ \\text{m/s}\\) along +x",
      },
      selfCheckExample: {
        prompt:
          "In a wave of frequency 400 Hz, two points 25 cm apart differ in phase by 90°. Find the wavelength and the wave speed.",
        steps: [
          "\\(\\Delta\\phi = \\dfrac{2\\pi}{\\lambda}\\Delta x\\), so \\(\\dfrac{\\pi}{2} = \\dfrac{2\\pi}{\\lambda} \\times 25\\) and \\(\\lambda = 100\\ \\text{cm} = 1\\ \\text{m}\\).",
          "\\(v = f\\lambda = 400 \\times 1 = 400\\ \\text{m/s}\\).",
        ],
        answer: "1 m and \\(400\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "\\(y = 3\\cos 2\\pi\\left(250t - \\dfrac{x}{2}\\right)\\), x in m. Frequency and wavelength?", answer: "250 Hz and 2 m" },
        { prompt: "\\(y = 0.1\\sin(50t + 2x)\\) in SI units. Speed and direction?", answer: "\\(25\\ \\text{m/s}\\) along −x" },
        { prompt: "A wave has \\(\\omega = 40\\ \\text{rad/s}\\) and \\(k = 0.02\\ \\text{cm}^{-1}\\). Its speed in m/s?", answer: "\\(20\\ \\text{m/s}\\)", method: "\\(40/0.02 = 2000\\ \\text{cm/s}\\)" },
        { prompt: "A wave travels at \\(25\\ \\text{m/s}\\). Its speed in km/h?", answer: "90 km/h" },
      ],
      pyqExampleId: "f20d10f7-9c47-4d07-9ee7-66b815646afe", // 2 Apr 2026 S1: y = 5 cos π(200t − x/150), x in cm, speed in m/s
      traps: [
        {
          title: "k in cm⁻¹ gives a speed in cm/s",
          body: "When x is measured in cm, ω/k is in cm/s. Answer options in m/s are then 100 times smaller. Convert k to m⁻¹, or convert the speed at the end.",
        },
        {
          title: "Expand the common factor before reading",
          body: "In y = A sin π(300t − x/60) the coefficient of t is 300π, not 300, and that of x is π/60. Here the π cancels in ω/k, but in the frequency f = ω/2π it does not: f is 150 Hz, not 300/2π.",
        },
        {
          title: "Same signs mean travel along −x",
          body: "In y = A sin(kx + ωt) the wave moves towards −x, so a velocity asked with its sign is negative. Opposite signs mean +x.",
        },
      ],
    },

    // C2 — building the equation, and what counts as a travelling wave
    {
      kind: "formula" as const,
      slug: "jpwave-build-equation",
      name: "Writing the equation of a travelling wave",
      intuition:
        "Any shape that slides along without changing form is a function of \\(x - vt\\) (moving +x) or \\(x + vt\\) (moving −x). For a sine wave, four facts fix the equation: the amplitude, ω, k, and where a particle is at t = 0. A crest at the origin at t = 0 calls for a cosine; a particle at its mean position calls for a sine.",
      definition:
        "- **Amplitude** = half the total to-and-fro distance of a particle.\n" +
        "- \\(\\omega = 2\\pi f\\) and \\(k = \\dfrac{\\omega}{v} = \\dfrac{2\\pi}{\\lambda}\\).\n" +
        "- Travelling along +x: \\(y = A\\cos(kx - \\omega t)\\) or \\(A\\sin(\\omega t - kx)\\). Along −x: change the sign between the two terms.\n" +
        "- Crest (\\(y = +A\\)) at x = 0, t = 0: use a cosine. Mean position at x = 0, t = 0: use a sine, with the sign set by which way that particle moves next.\n" +
        "- A pulse \\(y = f(x)\\) at t = 0 that becomes \\(f(x - d)\\) at time t has moved a distance d along +x: \\(v = d/t\\). If it becomes \\(f(x + d)\\), it moved along −x.\n" +
        "- \\(A\\sin kx\\cos\\omega t\\) is a standing wave, not a travelling one: x and t are in separate factors. A function of \\(x^{2}\\) and t separately, such as \\(e^{-x^{2}}\\cos t\\), is not travelling either.",
      formula: {
        label: "A travelling wave",
        latex: "y = f(x \\mp vt) \\qquad y = A\\sin(\\omega t - kx + \\phi_0) \\qquad k = \\frac{\\omega}{v}",
      },
      authoredExample: {
        prompt:
          "A wave of frequency 50 Hz travels along −x at \\(20\\ \\text{m/s}\\). Each particle moves through a total distance of 8 mm to and fro. At t = 0 the particle at x = 0 is at its mean position, moving in the +y direction. Write y(x, t) in metres.",
        steps: [
          "Amplitude \\(= 8/2 = 4\\ \\text{mm} = 0.004\\ \\text{m}\\).",
          "\\(\\omega = 2\\pi \\times 50 = 100\\pi\\ \\text{rad/s}\\) and \\(k = \\dfrac{\\omega}{v} = \\dfrac{100\\pi}{20} = 5\\pi\\ \\text{m}^{-1}\\).",
          "Travel along −x: the two terms take the same sign, \\(y = 0.004\\sin(100\\pi t + 5\\pi x)\\).",
          "Check t = 0, x = 0: y = 0, and \\(\\partial y/\\partial t = 0.004 \\times 100\\pi\\cos 0 > 0\\), so the particle moves up. ✓",
        ],
        answer: "\\(y = 0.004\\sin(100\\pi t + 5\\pi x)\\ \\text{m}\\)",
      },
      selfCheckExample: {
        prompt:
          "A pulse has the shape \\(y = \\dfrac{2}{4 + x^{2}}\\) at t = 0 and \\(y = \\dfrac{2}{4 + (x - 3)^{2}}\\) at t = 2 s, with x in cm. Find its speed and direction.",
        steps: [
          "The peak (where the bracket is zero) moves from x = 0 to x = 3 cm.",
          "It moves 3 cm in 2 s along +x: \\(v = 1.5\\ \\text{cm/s}\\).",
        ],
        answer: "\\(1.5\\ \\text{cm/s}\\) along +x",
      },
      practiceSet: [
        { prompt: "Which one is a travelling wave: \\(y = A\\sin(3x - 4t)\\) or \\(y = A\\sin 3x\\cos 4t\\)?", answer: "\\(A\\sin(3x - 4t)\\); the other is standing" },
        { prompt: "Each particle moves through a total of 10 cm to and fro. The amplitude?", answer: "5 cm" },
        { prompt: "A wave along +x has a crest at x = 0 at t = 0. Sine or cosine?", answer: "\\(y = A\\cos(kx - \\omega t)\\)" },
        { prompt: "\\(\\lambda = 0.5\\ \\text{m}\\) and \\(v = 100\\ \\text{m/s}\\). Find k and ω.", answer: "\\(k = 4\\pi\\ \\text{m}^{-1}\\), \\(\\omega = 400\\pi\\ \\text{rad/s}\\)" },
      ],
      pyqExampleId: "4b7c5f37-cd97-4633-b4e8-afafb638b03f", // 2 Apr 2025: λ 7.5 cm, crest at the origin, choose the equation
      traps: [
        {
          title: "The to-and-fro distance is twice the amplitude",
          body: "A particle that moves through a total of 6 cm swings 3 cm each side of its mean position. The amplitude is 3 cm, not 6 cm.",
        },
        {
          title: "A crest at the origin is a cosine",
          body: "At t = 0 a sine is zero at x = 0, so it cannot describe a crest there. When the stem puts a crest at the origin, the correct option is a cosine.",
        },
      ],
    },

    // C3 — particle velocity and intensity
    {
      kind: "formula" as const,
      slug: "jpwave-particle-intensity",
      name: "Particle velocity and intensity of a wave",
      intuition:
        "The wave moves along the string, but each particle only moves up and down. Its speed changes all the time and peaks at Aω as it passes the mean position. That peak, compared with the wave speed ω/k, is just Ak. For a point source, the energy spreads over a sphere, so the intensity falls as the square of the distance.",
      definition:
        "- Particle velocity \\(v_p = \\dfrac{\\partial y}{\\partial t}\\); its maximum is \\(A\\omega\\).\n" +
        "- \\(\\dfrac{\\partial y}{\\partial t} = -v\\,\\dfrac{\\partial y}{\\partial x}\\): the particle velocity is minus the wave speed times the slope of the string.\n" +
        "- \\(\\dfrac{v_{p,\\max}}{v} = \\dfrac{A\\omega}{\\omega/k} = Ak = \\dfrac{2\\pi A}{\\lambda}\\).\n" +
        "- Two points \\(\\lambda/2\\) apart always move with equal speeds in opposite directions.\n" +
        "- **Intensity** \\(I \\propto A^{2}\\omega^{2}\\). From a point source, \\(I = \\dfrac{P}{4\\pi r^{2}}\\), so \\(I \\propto \\dfrac{1}{r^{2}}\\).\n" +
        "- For a sphere around the source: area \\(\\propto r^{2}\\) and volume \\(\\propto r^{3}\\). Find r first, then I.",
      formula: {
        label: "Particle speed and intensity",
        latex: "v_{p,\\max} = A\\omega \\qquad \\frac{v_{p,\\max}}{v} = Ak = \\frac{2\\pi A}{\\lambda} \\qquad I = \\frac{P}{4\\pi r^{2}}",
      },
      authoredExample: {
        prompt:
          "A wave is \\(y = 3\\sin(60t - 0.5x)\\), with x and y in cm and t in s. Find the wave speed, the maximum particle speed and their ratio.",
        steps: [
          "Wave speed \\(v = \\dfrac{\\omega}{k} = \\dfrac{60}{0.5} = 120\\ \\text{cm/s}\\).",
          "\\(v_p = \\dfrac{\\partial y}{\\partial t} = 180\\cos(60t - 0.5x)\\), so \\(v_{p,\\max} = A\\omega = 180\\ \\text{cm/s}\\).",
          "Ratio \\(= Ak = 3 \\times 0.5 = 1.5\\). Check: \\(180/120 = 1.5\\).",
        ],
        answer: "\\(120\\ \\text{cm/s}\\), \\(180\\ \\text{cm/s}\\), ratio 1.5",
      },
      selfCheckExample: {
        prompt:
          "A point source gives an intensity of \\(8 \\times 10^{-6}\\ \\text{W/m}^{2}\\) at 3 m. Find the intensity at 6 m and at 12 m.",
        steps: [
          "\\(I \\propto 1/r^{2}\\). Doubling r divides I by 4: \\(2 \\times 10^{-6}\\ \\text{W/m}^{2}\\) at 6 m.",
          "Four times r divides I by 16: \\(0.5 \\times 10^{-6}\\ \\text{W/m}^{2}\\) at 12 m.",
        ],
        answer: "\\(2 \\times 10^{-6}\\) and \\(0.5 \\times 10^{-6}\\ \\text{W/m}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A = 0.5 cm and \\(\\omega = 200\\ \\text{rad/s}\\). Maximum particle speed?", answer: "\\(100\\ \\text{cm/s} = 1\\ \\text{m/s}\\)" },
        { prompt: "A = 1 cm. For what wavelength is the maximum particle speed twice the wave speed?", answer: "\\(\\pi\\) cm", method: "\\(Ak = 2\\), so \\(k = 2\\ \\text{cm}^{-1}\\)" },
        { prompt: "The distance from a point source is tripled. The intensity becomes?", answer: "One ninth" },
        { prompt: "The amplitude of a wave is doubled at the same frequency. The intensity becomes?", answer: "Four times" },
      ],
      pyqExampleId: "eef81381-f9bd-489a-954b-c72d3b17caaf", // 26 Jul 2022: wavelength for which wave speed = max particle speed
      traps: [
        {
          title: "Particle velocity is not wave velocity",
          body: "The wave speed ω/k is the same everywhere. The particle velocity ∂y/∂t changes from zero to Aω in every cycle. A question on 'maximum particle velocity' wants Aω.",
        },
        {
          title: "Scale the radius, not the area or volume",
          body: "Intensity goes as 1/r². If a sphere's surface area grows 9 times, r grows 3 times and I falls to one ninth, not to one eighty-first.",
        },
      ],
    },
  ],
};
