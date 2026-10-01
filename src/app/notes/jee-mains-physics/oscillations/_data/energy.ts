import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_OSC_NOTE: SubtopicNote = {
  subtopicName: "Energy in SHM, Amplitude Changes and Damping",
  title: "Energy in SHM, Amplitude Changes and Damping",
  oneLineDefinition:
    "The total energy ½kA² stays fixed while it passes between kinetic and potential, so the split at any point depends only on x/A; a sudden push, an added mass or damping changes the amplitude.",
  whyItMatters:
    "Twenty-five PYQs, seventeen of them multiple choice, and two from 2026. Thirteen split the energy at a point between kinetic and potential; six pick an energy graph or an average over a period; six change the amplitude, by a sudden push, by a mass dropped on at the mean position, or by damping.",
  concepts: [
    // C1 — the split at a point
    {
      kind: "formula" as const,
      slug: "jposc-energy-split",
      name: "Kinetic and potential energy at a displacement in SHM",
      intuition:
        "The total energy is fixed at \\(\\tfrac{1}{2}kA^{2}\\). The potential energy is the fraction \\((x/A)^{2}\\) of it and the kinetic energy is the rest. So the split depends only on how far out the particle is compared with the amplitude.",
      definition:
        "- \\(U = \\tfrac{1}{2}kx^{2}\\), \\(K = \\tfrac{1}{2}k(A^{2} - x^{2})\\), \\(E = \\tfrac{1}{2}kA^{2} = \\tfrac{1}{2}m\\omega^{2}A^{2}\\).\n" +
        "- \\(\\dfrac{U}{E} = \\dfrac{x^{2}}{A^{2}}\\) and \\(\\dfrac{K}{E} = 1 - \\dfrac{x^{2}}{A^{2}}\\).\n" +
        "- K = U at \\(x = A/\\sqrt{2}\\). At \\(x = A/2\\): \\(U = E/4\\), \\(K = 3E/4\\). At \\(x = A/3\\): \\(K = 8E/9\\).\n" +
        "- At any point, \\(E = K + U\\) there; then \\(A^{2} = 2E/k\\).\n" +
        "- For a spring, E depends on k and A only. Doubling the mass at the same amplitude leaves E unchanged; only ω falls.\n" +
        "- **Vertical spring**: the energy stored in the spring at the lowest point includes the static stretch Δ: \\(\\tfrac{1}{2}k(\\Delta + A)^{2}\\), more than the oscillation energy \\(\\tfrac{1}{2}kA^{2}\\).",
      formula: {
        label: "Energy in SHM",
        latex: "E = \\frac{1}{2}kA^{2} = \\frac{1}{2}m\\omega^{2}A^{2} \\qquad U = \\frac{1}{2}kx^{2} \\qquad K = \\frac{1}{2}k\\left(A^{2} - x^{2}\\right)",
      },
      authoredExample: {
        prompt:
          "A 0.5 kg block on a spring oscillates with \\(\\omega = 20\\) rad/s. At \\(x = 3\\) cm its kinetic energy is 0.16 J. Find the potential energy there, the total energy and the amplitude.",
        steps: [
          "\\(k = m\\omega^{2} = 0.5 \\times 400 = 200\\) N/m.",
          "\\(U = \\tfrac{1}{2} \\times 200 \\times 0.03^{2} = 0.09\\) J.",
          "\\(E = 0.16 + 0.09 = 0.25\\) J.",
          "\\(A^{2} = \\dfrac{2E}{k} = \\dfrac{0.5}{200} = 0.0025\\), so \\(A = 0.05\\) m.",
        ],
        answer: "\\(U = 0.09\\) J, \\(E = 0.25\\) J, \\(A = 5\\) cm.",
      },
      selfCheckExample: {
        prompt:
          "A particle does SHM with amplitude 6 cm. At what displacement is its kinetic energy 8 times its potential energy?",
        steps: [
          "\\(K = 8U\\) means \\(E = 9U\\), so \\(\\dfrac{x^{2}}{A^{2}} = \\dfrac{1}{9}\\).",
          "\\(x = \\dfrac{A}{3} = 2\\) cm.",
        ],
        answer: "\\(2\\) cm",
      },
      practiceSet: [
        { prompt: "Ratio of kinetic to potential energy at half the amplitude?", answer: "\\(3 : 1\\)" },
        { prompt: "At what displacement are the kinetic and potential energies equal?", answer: "\\(x = \\pm A/\\sqrt{2}\\)" },
        { prompt: "The maximum potential energy is 40 J. What is the kinetic energy at \\(x = A/2\\)?", answer: "\\(30\\) J" },
        { prompt: "A 200 N/m spring oscillates with amplitude 0.1 m. The mass is doubled at the same amplitude. Total energy?", answer: "Unchanged, 1 J" },
      ],
      pyqExampleId: "578ca727-d20d-4cfb-9829-057c981564a5", // 2024: KE 0.5 J and PE 0.4 J at x = 0.04 m give the amplitude
      traps: [
        {
          title: "The energies are equal at A/√2, not at A/2",
          body: "At half the amplitude the potential energy is only a quarter of the total. Kinetic and potential are equal at x = A/√2, about 0.71A.",
        },
        {
          title: "A spring's energy does not depend on the mass",
          body: "E = ½kA² holds for any mass. A heavier block at the same amplitude has the same energy, a lower ω and a lower top speed.",
        },
        {
          title: "\"Energy of the block\" at a point is the total",
          body: "When a question gives the block's energy at some x, it means K + U, which equals ½kA². Do not set it equal to ½kx².",
        },
      ],
    },

    // C2 — graphs and averages
    {
      kind: "reference" as const,
      slug: "jposc-energy-graphs",
      name: "Graphs and averages of energy in SHM",
      intuition:
        "Kinetic and potential energy go as \\(\\cos^{2}\\) and \\(\\sin^{2}\\) of the phase, so each repeats twice per oscillation and is never negative. Against displacement they are two parabolas that add to a flat line. Most graph questions are answered by the shape and by where each curve is zero.",
      definition:
        "- From the mean, \\(U = \\dfrac{E}{2}(1 - \\cos 2\\omega t)\\) and \\(K = \\dfrac{E}{2}(1 + \\cos 2\\omega t)\\).\n" +
        "- Both energies oscillate with angular frequency \\(2\\omega\\): frequency \\(2f\\), period \\(T/2\\).\n" +
        "- Over one period, the average kinetic and potential energies are each \\(E/2 = \\tfrac{1}{4}kA^{2}\\).\n" +
        "- K equals U only at four instants per period (at \\(x = \\pm A/\\sqrt{2}\\)), not all the time.\n" +
        "- \\(E - U\\) is K, so its graph against x is the K graph.",
      table: {
        columns: ["Quantity", "Against displacement x", "Against time t (starting at the mean)", "Average over a period"],
        rows: [
          { cells: ["Potential energy U", "Upward parabola \\(\\tfrac{1}{2}kx^{2}\\): zero at x = 0, E at \\(x = \\pm A\\)", "\\(\\tfrac{E}{2}(1 - \\cos 2\\omega t)\\): zero at t = 0, peak E at T/4, repeats every T/2", "\\(E/2\\)"] },
          { cells: ["Kinetic energy K", "Downward parabola \\(\\tfrac{1}{2}k(A^{2} - x^{2})\\): E at x = 0, zero at \\(x = \\pm A\\)", "\\(\\tfrac{E}{2}(1 + \\cos 2\\omega t)\\): E at t = 0, zero at T/4, repeats every T/2", "\\(E/2\\)"], noteAmber: "E − U against x is this same downward parabola." },
          { cells: ["Total energy E", "Horizontal line at \\(\\tfrac{1}{2}kA^{2}\\)", "Horizontal line at \\(\\tfrac{1}{2}kA^{2}\\)", "\\(E\\)"] },
          { cells: ["Velocity v", "Ellipse \\(\\dfrac{x^{2}}{A^{2}} + \\dfrac{v^{2}}{A^{2}\\omega^{2}} = 1\\)", "\\(A\\omega\\cos\\omega t\\), repeats every T", "Zero (average speed \\(2A\\omega/\\pi\\))"] },
          { cells: ["Acceleration a", "Straight line \\(a = -\\omega^{2}x\\) through the origin", "\\(-\\omega^{2}A\\sin\\omega t\\), repeats every T", "Zero"] },
        ],
        caption: "Energies repeat at twice the oscillator's frequency and never go below zero.",
      },
      selfCheckExample: {
        prompt:
          "The kinetic energy of an oscillator in SHM returns to its maximum value every 0.1 s. Find the period and the frequency of the oscillator.",
        steps: [
          "Kinetic energy repeats every half period, so \\(T/2 = 0.1\\) s.",
          "\\(T = 0.2\\) s and \\(f = 5\\) Hz.",
        ],
        answer: "\\(T = 0.2\\) s, \\(f = 5\\) Hz.",
      },
      practiceSet: [
        { prompt: "An oscillator has frequency 3 Hz. At what frequency does its potential energy vary?", answer: "\\(6\\) Hz" },
        { prompt: "The total energy of an oscillator is 8 J. What is its average kinetic energy over one period?", answer: "\\(4\\) J" },
        { prompt: "What is the shape of the graph of (total energy − potential energy) against displacement?", answer: "A downward parabola, zero at \\(x = \\pm A\\)" },
        { prompt: "Is the kinetic energy of an oscillator in SHM equal to its potential energy at all times?", answer: "No; only at four instants per period, at \\(x = \\pm A/\\sqrt{2}\\)" },
      ],
      pyqExampleId: "3a6ce008-bd8b-4716-820e-c52072b27ced", // 2026: kinetic energy oscillates at 176 rad/s; oscillator frequency 14 Hz
      traps: [
        {
          title: "Energy oscillates at twice the frequency",
          body: "If the kinetic energy varies at angular frequency Ω, the oscillator's own angular frequency is Ω/2. Taking them equal doubles the answer.",
        },
        {
          title: "Potential energy is never negative",
          body: "U = ½kx² is zero at the mean position and positive on both sides. A U–t graph that dips below zero, or a U–x graph that is a straight line, is wrong.",
        },
      ],
    },

    // C3 — amplitude changes
    {
      kind: "formula" as const,
      slug: "jposc-amplitude",
      name: "New amplitude after a push or an added mass, and decay by damping",
      intuition:
        "A sudden change keeps the particle where it is but changes its speed, and perhaps its ω. Use the new speed and ω at that point to find the new amplitude. Damping instead drains the energy slowly, and the amplitude falls by the same factor in each equal interval of time.",
      definition:
        "- **Sudden change at x**: \\(A'^{2} = x^{2} + \\dfrac{v'^{2}}{\\omega'^{2}}\\), with the new speed and new ω.\n" +
        "- Speed multiplied by n at x (same ω): \\(v'^{2} = n^{2}\\omega^{2}(A^{2} - x^{2})\\).\n" +
        "- **Mass m placed gently on M at the mean**: momentum is conserved, \\((M + m)v' = Mv_{max}\\), and \\(\\omega' = \\sqrt{k/(M + m)}\\). So \\(A' = A\\sqrt{\\dfrac{M}{M + m}}\\).\n" +
        "- **Mass added at an extreme**: the speed is already zero, so the amplitude stays A; only the period changes.\n" +
        "- **Damping** \\(F = -bv\\): \\(A = A_0e^{-bt/2m}\\). The energy goes as \\(A^{2}\\), so \\(E = E_0e^{-bt/m}\\).\n" +
        "- Time for the amplitude to halve: \\(t = \\dfrac{2m\\ln 2}{b}\\); for the energy to halve: \\(\\dfrac{m\\ln 2}{b}\\).",
      formula: {
        label: "Amplitude after a sudden change, and damped amplitude",
        latex: "A'^{2} = x^{2} + \\frac{v'^{2}}{\\omega'^{2}} \\qquad A = A_0e^{-bt/2m}",
      },
      authoredExample: {
        prompt:
          "A particle does SHM with amplitude 5 cm. As it passes \\(x = 3\\) cm, its speed is suddenly doubled. Find the new amplitude.",
        steps: [
          "Speed at 3 cm before the push: \\(v^{2} = \\omega^{2}(25 - 9) = 16\\omega^{2}\\).",
          "After doubling: \\(v'^{2} = 4 \\times 16\\omega^{2} = 64\\omega^{2}\\); ω is unchanged.",
          "\\(A'^{2} = 3^{2} + \\dfrac{64\\omega^{2}}{\\omega^{2}} = 9 + 64 = 73\\), so \\(A' = \\sqrt{73} \\approx 8.5\\) cm.",
        ],
        answer: "\\(\\sqrt{73} \\approx 8.5\\) cm",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg mass on a spring is damped with damping constant \\(b = 0.1\\) kg/s. How long does its amplitude take to halve, and how long its energy? (\\(\\ln 2 = 0.693\\))",
        steps: [
          "Amplitude: \\(t = \\dfrac{2m\\ln 2}{b} = \\dfrac{2 \\times 2 \\times 0.693}{0.1} = 27.7\\) s.",
          "Energy goes as \\(A^{2}\\), so it halves in half that time: \\(\\dfrac{m\\ln 2}{b} = 13.9\\) s.",
        ],
        answer: "About 27.7 s for the amplitude; about 13.9 s for the energy.",
      },
      practiceSet: [
        { prompt: "A block of mass M passes through the mean position; an equal mass M is placed gently on it. New amplitude?", answer: "\\(A/\\sqrt{2}\\)" },
        { prompt: "A mass is placed gently on an oscillating block at its extreme. What happens to the amplitude?", answer: "It stays the same" },
        { prompt: "A damped amplitude halves in 10 s. What fraction remains after 30 s?", answer: "\\(1/8\\)" },
        { prompt: "When the amplitude of an oscillator has halved, what fraction of its energy is left?", answer: "\\(1/4\\)" },
      ],
      pyqExampleId: "3c4de331-443e-48ed-999a-3469e1561337", // 2024: speed tripled at 2A/3; new amplitude 7A/3
      traps: [
        {
          title: "Where the mass is added decides the new amplitude",
          body: "Added at the mean, momentum is shared and the amplitude drops to A√(M/(M + m)). Added at an extreme, the block is at rest there, so the amplitude stays A.",
        },
        {
          title: "Multiply the speed, not the energy",
          body: "Tripling the speed at x multiplies the kinetic energy there by 9. The new amplitude comes from A'² = x² + v'²/ω², not from tripling A.",
        },
        {
          title: "Energy decays twice as fast as amplitude",
          body: "A = A₀e^(−bt/2m) but E = E₀e^(−bt/m). The energy halves in half the time the amplitude takes.",
        },
      ],
    },
  ],
};
