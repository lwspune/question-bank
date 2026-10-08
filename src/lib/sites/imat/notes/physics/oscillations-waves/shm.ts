import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_OSW_SHM_NOTE: SubtopicNote = {
  subtopicName: "Simple Harmonic Motion",
  title: "Simple Harmonic Motion and Pendulums",
  oneLineDefinition:
    "An object pulled back towards a centre by a force proportional to its distance from it swings to and fro with a fixed period: simple harmonic motion.",
  whyItMatters:
    "Five of the 6 past questions are on this page, two of them from the 2024 ministry paper: spotting which motion is simple harmonic, where the kinetic and potential energy peak, a pendulum's length from its timing, a velocity from a cosine law of motion, and what friction does to a swing.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-osw-shm-motion",
      name: "Simple harmonic motion: displacement, velocity and acceleration",
      intuition:
        "Pull a mass on a spring aside and let go. The further it is from the centre, the harder it is pulled back, so it speeds up towards the centre, overshoots, slows down, stops at the far end and comes back. That pattern traces a cosine curve in time. The speed is greatest in the middle and zero at the two ends; the acceleration is the opposite, zero in the middle and greatest at the ends.",
      definition:
        "- **Simple harmonic motion** (SHM): the acceleration is proportional to the displacement from a fixed centre and always points **towards** it: \\(a = -\\omega^2 x\\).\n" +
        "- **Amplitude** \\(A\\): the largest displacement. **Period** \\(T\\): the time for one full cycle. **Frequency** \\(f = 1/T\\), in hertz.\n" +
        "- **Angular frequency** \\(\\omega = 2\\pi f = 2\\pi/T\\), in rad/s.\n" +
        "- Starting from an end: \\(x = A\\cos(\\omega t)\\) and \\(v = -A\\omega\\sin(\\omega t)\\). The speed is greatest, \\(v_{\\max} = A\\omega\\), at the centre, and zero at \\(x = \\pm A\\).\n" +
        "- Not every repeated motion is SHM. A ball bouncing on the floor feels a constant force (its weight) between bounces, not one proportional to displacement, so it is periodic but not simple harmonic.",
      formula: {
        label: "SHM from an end position",
        latex: "x = A\\cos(\\omega t) \\qquad v = -A\\omega\\sin(\\omega t) \\qquad a = -\\omega^2 x \\qquad \\omega = \\frac{2\\pi}{T}",
        symbols: [
          { symbol: "\\(x\\)", meaning: "displacement from the centre, in m" },
          { symbol: "\\(A\\)", meaning: "amplitude, in m" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency, in rad/s" },
          { symbol: "\\(T\\)", meaning: "period, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "A point moves along a line with \\(x = 0.05\\cos(4\\pi t)\\), with \\(x\\) in metres and \\(t\\) in seconds. Find the amplitude, period, frequency and greatest speed, and the velocity at \\(t = 0.125\\ \\text{s}\\).",
        steps: [
          "Amplitude \\(A = 0.05\\ \\text{m}\\); \\(\\omega = 4\\pi\\ \\text{rad/s}\\).",
          "\\(T = 2\\pi/\\omega = 0.5\\ \\text{s}\\), so \\(f = 2\\ \\text{Hz}\\).",
          "\\(v_{\\max} = A\\omega = 0.05 \\times 4\\pi \\approx 0.63\\ \\text{m/s}\\).",
          "At \\(t = 0.125\\ \\text{s}\\), \\(\\omega t = \\pi/2\\): \\(x = 0\\) and \\(v = -0.05 \\times 4\\pi \\times \\sin(\\pi/2) \\approx -0.63\\ \\text{m/s}\\). The point is crossing the centre at full speed, moving in the negative direction.",
        ],
        answer: "0.05 m; 0.5 s; 2 Hz; 0.63 m/s; about −0.63 m/s",
      },
      selfCheckExample: {
        prompt:
          "A mass on a spring moves in simple harmonic motion with an amplitude of 0.20 m and a period of 2.0 s. What is its greatest speed?",
        options: ["0.10 m/s", "0.40 m/s", "0.63 m/s", "1.3 m/s", "zero"],
        steps: [
          "\\(\\omega = 2\\pi/T = \\pi\\ \\text{rad/s}\\).",
          "\\(v_{\\max} = A\\omega = 0.20\\pi \\approx 0.63\\ \\text{m/s}\\).",
          "Option A is amplitude over period and B amplitude times period; D takes \\(\\omega = 2\\pi\\) and forgets to divide by the period; E is the speed at the ends, not the greatest speed.",
        ],
        answer: "(C) 0.63 m/s",
      },
      practiceSet: [
        { prompt: "An oscillation has a period of 0.25 s. What is its frequency?", answer: "4 Hz", method: "\\(f = 1/T\\)" },
        { prompt: "Where in SHM is the speed greatest, and where is the acceleration greatest?", answer: "Speed at the centre; acceleration at the two ends" },
        { prompt: "For \\(x = 3\\cos(\\pi t)\\), with \\(x\\) in metres, what is \\(x\\) at \\(t = 1\\ \\text{s}\\)?", answer: "−3 m: the other end", method: "\\(\\cos\\pi = -1\\)" },
      ],
      traps: [
        {
          title: "Periodic is not the same as simple harmonic",
          body: "SHM needs a restoring force proportional to the displacement, giving a sine or cosine motion. A bouncing ball, or a puck sliding at steady speed between two walls, repeats itself but is not SHM.",
        },
        {
          title: "Velocity is zero at the ends, not at the centre",
          body: "At \\(x = \\pm A\\) the object stops for an instant and turns round, so \\(v = 0\\) there while the acceleration is largest. When \\(\\cos(\\omega t) = \\pm 1\\), \\(\\sin(\\omega t) = 0\\), so the velocity is zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-osw-shm-energy",
      name: "Energy in simple harmonic motion and damping",
      intuition:
        "An oscillator keeps swapping energy between motion and storage. At the centre it is all kinetic; at the ends the object is momentarily still and it is all potential. Without friction the total never changes, so the motion goes on for ever. Friction drains the total away, so the swings get smaller: the motion is damped.",
      definition:
        "- Total energy of a mass on a spring: \\(E = \\tfrac{1}{2}kA^2\\), constant if there is no friction.\n" +
        "- At displacement \\(x\\): potential energy \\(\\tfrac{1}{2}kx^2\\), kinetic energy \\(E - \\tfrac{1}{2}kx^2\\).\n" +
        "- **Kinetic** energy is greatest at the **centre**; **potential** energy is greatest at **both ends**. For a mass hanging on a vertical spring, measure from the equilibrium position: the total potential energy (elastic plus gravitational) is then greatest at the top and at the bottom.\n" +
        "- Energy goes as amplitude **squared**: double the amplitude, four times the energy.\n" +
        "- **Damping** (friction, air resistance) removes energy, so the amplitude shrinks and the motion stops. The period stays almost the same for light damping. With no friction there is no damping.",
      formula: {
        label: "Energy of a mass on a spring",
        latex: "E = \\tfrac{1}{2}kA^2 = \\tfrac{1}{2}m v_{\\max}^2",
        symbols: [
          { symbol: "\\(k\\)", meaning: "spring constant, in N/m" },
          { symbol: "\\(A\\)", meaning: "amplitude, in m" },
          { symbol: "\\(m\\)", meaning: "oscillating mass, in kg" },
          { symbol: "\\(v_{\\max}\\)", meaning: "speed at the centre, in m/s" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.50 kg mass on a spring with \\(k = 200\\ \\text{N/m}\\) oscillates with an amplitude of 0.10 m on a smooth table. Find the total energy, the greatest speed, and the kinetic energy when the mass is 0.05 m from the centre.",
        steps: [
          "\\(E = \\tfrac{1}{2} \\times 200 \\times 0.10^2 = 1.0\\ \\text{J}\\).",
          "At the centre all of it is kinetic: \\(\\tfrac{1}{2} \\times 0.50 \\times v^2 = 1.0\\), so \\(v_{\\max} = 2.0\\ \\text{m/s}\\).",
          "At \\(x = 0.05\\ \\text{m}\\): potential \\(\\tfrac{1}{2} \\times 200 \\times 0.05^2 = 0.25\\ \\text{J}\\), so kinetic \\(1.0 - 0.25 = 0.75\\ \\text{J}\\).",
        ],
        answer: "1.0 J; 2.0 m/s; 0.75 J",
      },
      selfCheckExample: {
        prompt:
          "A mass on a spring oscillates with a total energy of 0.80 J. It is restarted with twice the amplitude. What is the new total energy?",
        options: ["0.40 J", "0.80 J", "1.6 J", "3.2 J", "6.4 J"],
        steps: [
          "\\(E \\propto A^2\\), so doubling \\(A\\) multiplies the energy by 4.",
          "\\(0.80 \\times 4 = 3.2\\ \\text{J}\\).",
          "Option C doubles the energy as if it went with \\(A\\); E multiplies by 8.",
        ],
        answer: "(D) 3.2 J",
      },
      practiceSet: [
        { prompt: "At half the amplitude, what fraction of the total energy is kinetic?", answer: "Three quarters", method: "Potential is \\((1/2)^2 = 1/4\\) of the total" },
        { prompt: "A spring with \\(k = 50\\ \\text{N/m}\\) oscillates with amplitude 0.20 m. What is the total energy?", answer: "1.0 J", method: "\\(\\tfrac{1}{2} \\times 50 \\times 0.04\\)" },
        { prompt: "A pendulum swings in air. What decreases over time: the amplitude or the period?", answer: "The amplitude; the period stays almost the same" },
      ],
      traps: [
        {
          title: "Without friction an oscillator never stops",
          body: "Nothing removes energy from a frictionless oscillator, so it keeps swinging with the same amplitude for ever. Statements that a frictionless pendulum slows down and stops are false; stopping is what damping does.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-osw-periods",
      name: "The periods of a simple pendulum and a mass on a spring",
      intuition:
        "A longer pendulum takes longer to swing, and stronger gravity pulls it round faster. The mass of the bob does not matter, for the same reason all objects fall together. For a spring, a heavier mass is slower to get moving and a stiffer spring pulls harder, and gravity does not enter at all.",
      definition:
        "- **Simple pendulum** (small swings): \\(T = 2\\pi\\sqrt{L/g}\\). It does not depend on the mass of the bob or on the amplitude, as long as the swing is small.\n" +
        "- **Mass on a spring**: \\(T = 2\\pi\\sqrt{m/k}\\). It does not depend on \\(g\\), so it is the same on the Moon.\n" +
        "- A pendulum passes through the vertical **twice** in each period, so the time between two passes is \\(T/2\\).\n" +
        "- The bob of a pendulum moves along an arc of a circle. IMAT often takes \\(g = 10\\ \\text{N/kg}\\) and \\(\\pi^2 \\approx 10\\).",
      formula: {
        label: "Periods of the two standard oscillators",
        latex: "T_{\\text{pendulum}} = 2\\pi\\sqrt{\\frac{L}{g}} \\qquad T_{\\text{spring}} = 2\\pi\\sqrt{\\frac{m}{k}}",
        symbols: [
          { symbol: "\\(L\\)", meaning: "length of the pendulum, in m" },
          { symbol: "\\(g\\)", meaning: "gravitational field strength, in N/kg" },
          { symbol: "\\(m\\)", meaning: "mass on the spring, in kg" },
          { symbol: "\\(k\\)", meaning: "spring constant, in N/m" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the period of a pendulum 0.40 m long, and of a 0.50 kg mass on a spring with \\(k = 50\\ \\text{N/m}\\). Take \\(g = 10\\ \\text{N/kg}\\).",
        steps: [
          "Pendulum: \\(T = 2\\pi\\sqrt{0.40/10} = 2\\pi \\times 0.20 \\approx 1.26\\ \\text{s}\\).",
          "Spring: \\(T = 2\\pi\\sqrt{0.50/50} = 2\\pi \\times 0.10 \\approx 0.63\\ \\text{s}\\).",
        ],
        answer: "About 1.26 s and 0.63 s",
      },
      selfCheckExample: {
        prompt:
          "A mass on a spring has a period of 1.2 s. The mass is replaced by one four times as heavy. What is the new period?",
        options: ["0.30 s", "0.60 s", "1.2 s", "4.8 s", "2.4 s"],
        steps: [
          "\\(T \\propto \\sqrt{m}\\), so four times the mass gives \\(\\sqrt{4} = 2\\) times the period.",
          "\\(1.2 \\times 2 = 2.4\\ \\text{s}\\).",
          "Option D forgets the square root; B and A move the wrong way; C would be right for a pendulum, whose period ignores the mass.",
        ],
        answer: "(E) 2.4 s",
      },
      practiceSet: [
        { prompt: "A pendulum has a period of 4.0 s. Taking \\(g = 10\\ \\text{N/kg}\\) and \\(\\pi^2 = 10\\), how long is it?", answer: "4.0 m", method: "\\(L = gT^2/(4\\pi^2) = 10 \\times 16/40\\)" },
        { prompt: "A pendulum's length is made four times longer. What happens to its period?", answer: "It doubles" },
        { prompt: "The bob of a pendulum is replaced by one twice as heavy. What happens to the period?", answer: "Nothing: it does not depend on the mass" },
        { prompt: "A pendulum is taken to a place where \\(g\\) is smaller. Does its period go up or down?", answer: "Up", method: "\\(T \\propto 1/\\sqrt{g}\\)" },
      ],
      traps: [
        {
          title: "Passing the centre twice per period",
          body: "A pendulum crosses its lowest point once going each way, so successive crossings are half a period apart. If a question gives the time between crossings, double it before using \\(T = 2\\pi\\sqrt{L/g}\\).",
        },
        {
          title: "A heavier bob does not change a pendulum's period",
          body: "Mass cancels out of a pendulum's motion. It does matter for a mass on a spring, where \\(T \\propto \\sqrt{m}\\). Mixing up the two formulas is a common slip.",
        },
      ],
    },
  ],
};
