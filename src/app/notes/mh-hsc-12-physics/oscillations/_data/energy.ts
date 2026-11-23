import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Energy of a Particle Performing S.H.M.",
  title: "Energy in S.H.M.",
  oneLineDefinition:
    "The kinetic and potential energy of a particle in S.H.M. at any displacement, why their sum stays constant, and how the energy is shared between them across the path.",
  whyItMatters:
    "13 questions, seven of them from board papers from 2016 to 2025. The board asks you to obtain the potential energy (2019), prove that the total energy is conserved and show the energies on a graph (2017), draw the labelled energy diagram (2025), name where the energy is purely potential (2020), find where the kinetic energy is three times the potential energy (2024) and what fraction is kinetic at a third of the amplitude (2024), and compare the work done in stretching two springs (2016).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-ke-pe",
      name: "Kinetic and potential energy at a displacement",
      intuition:
        "As the particle moves out from the mean position, the restoring force works against it: it slows down, and its energy goes into potential form, like a spring being stretched. On the way back the potential energy turns into kinetic energy again.",
      definition:
        "- Velocity at displacement x: \\(v = \\omega\\sqrt{A^{2} - x^{2}}\\). So \\(\\text{K.E.} = \\dfrac{1}{2}mv^{2} = \\dfrac{1}{2}m\\omega^{2}(A^{2} - x^{2}) = \\dfrac{1}{2}k(A^{2} - x^{2})\\).\n" +
        "- **Potential energy:** to move the particle through dx against the restoring force, an external force \\(+kx\\) does work \\(dW = kx\\,dx\\). From the mean position to x: \\(W = \\int_{0}^{x} kx\\,dx = \\dfrac{1}{2}kx^{2}\\). This work is stored as P.E.\n" +
        "- \\(\\text{P.E.} = \\dfrac{1}{2}kx^{2} = \\dfrac{1}{2}m\\omega^{2}x^{2}\\).\n" +
        "- At the mean position, P.E. is zero and K.E. is greatest. At an extreme position, K.E. is zero and P.E. is greatest, equal to the total energy.\n" +
        "- Stretching a spring by x stores \\(\\dfrac{1}{2}kx^{2}\\) in the same way. For a given force F the extension is \\(F/k\\), so the work is \\(\\dfrac{F^{2}}{2k}\\): under the same force, the softer spring stores more energy.",
      formula: {
        label: "Energies at displacement x",
        latex: "\\text{K.E.} = \\frac{1}{2}m\\omega^{2}(A^{2} - x^{2}), \\qquad \\text{P.E.} = \\frac{1}{2}m\\omega^{2}x^{2}",
      },
      authoredExample: {
        prompt:
          "A particle of mass 0.1 kg performs S.H.M. of amplitude 0.2 m and angular frequency 5 rad/s. Find its kinetic and potential energy when it is 0.1 m from the mean position.",
        steps: [
          "Given: \\(m = 0.1\\) kg, \\(A = 0.2\\) m, \\(\\omega = 5\\) rad/s, \\(x = 0.1\\) m.",
          "\\(\\text{K.E.} = \\dfrac{1}{2}m\\omega^{2}(A^{2} - x^{2}) = \\dfrac{1}{2} \\times 0.1 \\times 25 \\times (0.04 - 0.01) = 0.0375\\) J.",
          "\\(\\text{P.E.} = \\dfrac{1}{2}m\\omega^{2}x^{2} = \\dfrac{1}{2} \\times 0.1 \\times 25 \\times 0.01 = 0.0125\\) J.",
          "Check: the sum, 0.05 J, equals \\(\\dfrac{1}{2}m\\omega^{2}A^{2} = \\dfrac{1}{2} \\times 0.1 \\times 25 \\times 0.04 = 0.05\\) J.",
        ],
        answer: "K.E. = 0.0375 J; P.E. = 0.0125 J",
      },
      selfCheckExample: {
        prompt: "A spring of force constant 200 N/m is stretched by 5 cm. How much potential energy does it store?",
        steps: ["\\(x = 0.05\\) m.", "\\(\\text{P.E.} = \\dfrac{1}{2}kx^{2} = \\dfrac{1}{2} \\times 200 \\times 0.0025 = 0.25\\) J."],
        answer: "0.25 J",
      },
      practiceSet: [
        { prompt: "The displacement of a particle in S.H.M. is doubled. By what factor does its potential energy change?", answer: "It becomes four times as large" },
        { prompt: "Two springs are stretched by the same force. Which stores more energy, the stiffer or the softer?", answer: "The softer one, since \\(W = F^{2}/2k\\)" },
        { prompt: "Write the kinetic energy of a particle in S.H.M. in terms of k, A and x.", answer: "\\(\\dfrac{1}{2}k(A^{2} - x^{2})\\)" },
      ],
      pyqExampleId: "9f56ced9-1be0-4d59-a790-986935b2e2c0",
      traps: [
        {
          title: "Integrating without limits",
          body: "Write \\(\\int_{0}^{x} kx\\,dx\\) with the lower limit at the mean position, where P.E. is taken as zero. Without the limits the step is incomplete.",
        },
        {
          title: "Getting a negative potential energy",
          body: "The external agent pushes with \\(+kx\\), against the restoring force \\(-kx\\). That is why the work, and so the P.E., comes out positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-total-energy",
      name: "Total energy and its conservation",
      intuition:
        "Add the two energies and the x terms cancel. What is left depends only on the mass, the angular frequency and the amplitude, which are fixed for a given motion. So the total energy is the same at every point: the energy only changes form.",
      definition:
        "- \\(E = \\text{K.E.} + \\text{P.E.} = \\dfrac{1}{2}m\\omega^{2}(A^{2} - x^{2}) + \\dfrac{1}{2}m\\omega^{2}x^{2} = \\dfrac{1}{2}m\\omega^{2}A^{2}\\).\n" +
        "- m, \\(\\omega\\) and A are constants, so E does not depend on x or on t: the **total energy is conserved**.\n" +
        "- With \\(\\omega = 2\\pi n\\): \\(E = 2\\pi^{2}mn^{2}A^{2}\\). So E depends on the mass (\\(E \\propto m\\)), the frequency (\\(E \\propto n^{2}\\)) and the amplitude (\\(E \\propto A^{2}\\)).\n" +
        "- At the mean position all of E is kinetic, so \\(E = \\dfrac{1}{2}mv_{\\max}^{2}\\).",
      formula: {
        label: "Total energy",
        latex: "E = \\frac{1}{2}m\\omega^{2}A^{2} = \\frac{1}{2}kA^{2} = 2\\pi^{2}mn^{2}A^{2}",
      },
      authoredExample: {
        prompt: "A body of mass 0.5 kg performs S.H.M. of amplitude 4 cm and frequency 2 Hz. Find its total energy. (\\(\\pi^{2} = 9.87\\))",
        steps: [
          "Given: \\(m = 0.5\\) kg, \\(A = 4\\) cm \\(= 0.04\\) m, \\(n = 2\\) Hz.",
          "Formula: \\(E = 2\\pi^{2}mn^{2}A^{2}\\).",
          "\\(E = 2 \\times 9.87 \\times 0.5 \\times 4 \\times 0.0016 = 0.0632\\) J.",
        ],
        answer: "0.0632 J",
      },
      selfCheckExample: {
        prompt: "The amplitude of an S.H.M. is doubled and nothing else changes. By what factor does the total energy change?",
        steps: ["\\(E \\propto A^{2}\\).", "\\(2^{2} = 4\\)."],
        answer: "It becomes four times as large",
      },
      practiceSet: [
        { prompt: "A particle of mass 0.2 kg in S.H.M. has total energy 0.4 J. Find its maximum speed.", answer: "2 m/s" },
        { prompt: "Does the total energy of a particle in S.H.M. depend on its displacement?", answer: "No. It is the same at every point of the path" },
        { prompt: "The frequency of an S.H.M. is halved, with the same mass and amplitude. What happens to the total energy?", answer: "It becomes one quarter" },
      ],
      pyqExampleId: "2f22e428-568b-4883-bf7c-9de00996822b",
      traps: [
        {
          title: "Stopping before 'hence conserved'",
          body: "After reaching \\(E = \\dfrac{1}{2}m\\omega^{2}A^{2}\\), say in words that m, \\(\\omega\\) and A are constant, so E does not depend on x or t. That sentence is the proof.",
        },
        {
          title: "Leaving the amplitude in centimetres",
          body: "In \\(E = \\dfrac{1}{2}m\\omega^{2}A^{2}\\), A must be in metres to get joules. 5 cm is 0.05 m; using 5 gives an answer 10 000 times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-energy-share",
      name: "How the energy is shared, and the energy graph",
      intuition:
        "P.E. grows as x² from zero at the centre, and K.E. is whatever is left of the fixed total. Plotted against x, they are two parabolas, one opening up and one opening down, that always add up to the flat line of total energy. They are equal at x = A/√2, not at half the amplitude.",
      definition:
        "- Fractions of the total energy: \\(\\dfrac{\\text{P.E.}}{E} = \\dfrac{x^{2}}{A^{2}}\\) and \\(\\dfrac{\\text{K.E.}}{E} = 1 - \\dfrac{x^{2}}{A^{2}}\\).\n" +
        "- K.E. equals P.E. at \\(x = \\pm\\dfrac{A}{\\sqrt{2}}\\). In general \\(\\text{K.E.} = N \\times \\text{P.E.}\\) at \\(x = \\pm\\dfrac{A}{\\sqrt{N + 1}}\\).\n" +
        "- **Graph:** displacement from \\(-A\\) to \\(+A\\) on the X axis, energy on the Y axis. P.E. is an upward parabola, zero at the mean position. K.E. is an inverted parabola, greatest at the mean position and zero at the extremes. The total energy is a horizontal straight line at \\(\\dfrac{1}{2}kA^{2}\\).\n" +
        "- Label all three curves, the mean position O and \\(\\pm A\\). The two parabolas cross at \\(\\pm A/\\sqrt{2}\\).",
      formula: {
        label: "Share of the energy",
        latex: "\\frac{\\text{K.E.}}{E} = 1 - \\frac{x^{2}}{A^{2}}, \\qquad \\frac{\\text{P.E.}}{E} = \\frac{x^{2}}{A^{2}}",
      },
      authoredExample: {
        prompt:
          "A particle performs S.H.M. of amplitude 8 cm. What fractions of its total energy are kinetic and potential when it is 2 cm from the mean position?",
        steps: [
          "Given: \\(A = 8\\) cm, \\(x = 2\\) cm.",
          "\\(\\dfrac{\\text{P.E.}}{E} = \\dfrac{x^{2}}{A^{2}} = \\dfrac{4}{64} = \\dfrac{1}{16}\\).",
          "\\(\\dfrac{\\text{K.E.}}{E} = 1 - \\dfrac{1}{16} = \\dfrac{15}{16}\\).",
        ],
        answer: "Kinetic 15/16, potential 1/16 of the total",
      },
      selfCheckExample: {
        prompt: "A particle performs S.H.M. of amplitude \\(4\\sqrt{2}\\) cm. At what distance from the mean position are its kinetic and potential energies equal?",
        steps: ["K.E. = P.E. at \\(x = \\dfrac{A}{\\sqrt{2}}\\).", "\\(x = \\dfrac{4\\sqrt{2}}{\\sqrt{2}} = 4\\) cm."],
        answer: "4 cm, on either side",
      },
      practiceSet: [
        { prompt: "At which position is the energy of a particle in S.H.M. wholly kinetic?", answer: "At the mean position" },
        { prompt: "At \\(x = A/5\\), what fraction of the total energy is potential?", answer: "1/25" },
        { prompt: "For amplitude A, where on the path is the kinetic energy three times the potential energy?", answer: "\\(x = \\pm A/2\\)" },
      ],
      pyqExampleId: "75fca274-2b50-42c1-ae28-e3c28c04da49",
      traps: [
        {
          title: "Equal energies at half the amplitude",
          body: "At \\(x = A/2\\) the P.E. is only a quarter of E. The energies are equal at \\(x = A/\\sqrt{2}\\), about \\(0.71A\\).",
        },
        {
          title: "A diagram with unlabelled curves",
          body: "Name each parabola (K.E. and P.E.), draw the total energy as a horizontal line, and mark \\(-A\\), O and \\(+A\\). An unlabelled sketch loses most of the marks.",
        },
      ],
    },
  ],
};
