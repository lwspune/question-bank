import type { SubtopicNote } from "@/app/notes/_types";

export const STATIONARY_WAVES_NOTE: SubtopicNote = {
  subtopicName: "Stationary Waves and Vibrating Strings",
  title: "Stationary Waves and Vibrating Strings",
  oneLineDefinition:
    "Two equal waves running opposite ways make a stationary wave, y = 2A sin kx cos ωt, with fixed nodes λ/2 apart; a string fixed at both ends fits a whole number of loops, so it vibrates only at n = (p/2L)√(T/μ).",
  whyItMatters:
    "36 PYQs, seven HARD — the largest page in the chapter. Two shapes: the pattern itself (node and antinode spacing, counting nodes and loops, reading λ off a standing-wave equation), " +
    "and the string's frequencies — how they scale with length, tension, radius and density, which harmonic two consecutive resonances are, and matching overtones of two wires.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-standing-wave-basics",
      name: "Nodes, Antinodes and the Standing-Wave Equation",
      intuition:
        "In a stationary wave nothing travels: some points (nodes) never move and those halfway between (antinodes) swing hardest. Neighbouring nodes are half a wavelength apart, which is also the length of one loop.",
      definition:
        "- \\(y = 2A\\sin kx\\cos\\omega t\\): amplitude \\(2A\\sin kx\\) varies with position; \\(\\lambda = \\dfrac{2\\pi}{k}\\).\n" +
        "- Node to node (or antinode to antinode) \\(= \\dfrac{\\lambda}{2}\\); node to next antinode \\(= \\dfrac{\\lambda}{4}\\).\n" +
        "- String fixed at both ends: nodes at the ends. \\(x\\) nodes means \\(x - 1\\) loops, so \\(L = (x - 1)\\dfrac{\\lambda}{2}\\). The \\(p\\)th overtone has \\(p + 1\\) loops.\n" +
        "- Waves on a stretched string are stationary TRANSVERSE waves; stationary waves form in solids, liquids and gases.\n" +
        "- Sound reflected by a wall: node at the wall, first antinode \\(\\dfrac{\\lambda}{4}\\) away.",
      formula: {
        label: "Stationary wave",
        latex: "y = 2A\\sin kx\\cos\\omega t, \\qquad \\text{node spacing} = \\frac{\\lambda}{2}",
      },
      authoredExample: {
        prompt: "\\(y = 4\\sin\\left(\\dfrac{\\pi x}{5}\\right)\\cos(100\\pi t)\\), x in cm. Distance between consecutive nodes?",
        steps: ["\\(k = \\dfrac{\\pi}{5}\\), so \\(\\lambda = 10\\) cm.", "Node spacing \\(\\dfrac{\\lambda}{2} = 5\\) cm."],
        answer: "5 cm",
      },
      selfCheckExample: {
        prompt: "A string vibrates in its third overtone. How many nodes and antinodes?",
        steps: ["Third overtone = 4th harmonic: 4 loops."],
        answer: "5 nodes, 4 antinodes",
      },
      practiceSet: [
        { prompt: "Three nodes along a 90 cm string. Wavelength?", answer: "90 cm" },
        { prompt: "Waves of speed 12 m/s and frequency n meet head-on. Node spacing?", answer: "\\(\\dfrac{6}{n}\\)" },
        { prompt: "Is a node formed at the open end of an open pipe?", answer: "No — an antinode" },
      ],
      pyqExampleId: "df406ca3-7ef3-4b9b-a83a-3d1fab0136b4",
      traps: [
        {
          title: "Taking the node spacing as λ",
          body:
            "Nodes are HALF a wavelength apart. From \\(\\sin\\frac{\\pi x}{4}\\), \\(\\lambda = 8\\) cm but the nodes are 4 cm apart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-string-frequency",
      name: "Frequencies of a Stretched String",
      intuition:
        "The fundamental fits half a wavelength into the string: n = v/2L with v = √(T/μ). Every other mode is a whole multiple. So frequency rises with tension (as √T), falls with length, and falls with thickness and density (μ = πr²ρ).",
      definition:
        "- \\(n_p = \\dfrac{p}{2L}\\sqrt{\\dfrac{T}{\\mu}}\\), \\(\\mu = \\pi r^2\\rho\\), so \\(n \\propto \\dfrac{1}{Lr}\\sqrt{\\dfrac{T}{\\rho}}\\). First overtone = 2nd harmonic.\n" +
        "- Two consecutive resonances \\(n_p, n_{p+1}\\): fundamental \\(= n_{p+1} - n_p\\) (320 and 400 Hz ⇒ 80 Hz, \\(p = 4\\)).\n" +
        "- Length −40% and tension +44%: \\(\\dfrac{1.2}{0.6} = 2\\). Radius and length doubled: \\(\\dfrac{n}{4}\\).\n" +
        "- Segments of one wire: \\(\\dfrac{1}{n} = \\dfrac{1}{n_1} + \\dfrac{1}{n_2} + \\dfrac{1}{n_3}\\); bridges for 1 : 2 : 3 divide it 6 : 3 : 2.\n" +
        "- Hanging bob immersed: \\(\\dfrac{n_1^2}{n_2^2} = \\dfrac{W}{W - \\text{upthrust}}\\), so relative density \\(= \\dfrac{n_1^2}{n_1^2 - n_2^2}\\).",
      formula: {
        label: "String harmonics",
        latex: "n_p = \\frac{p}{2L}\\sqrt{\\frac{T}{\\mu}}",
      },
      authoredExample: {
        prompt: "A 0.5 m string with \\(\\mu = 0.01\\) kg/m is under 100 N. Fundamental frequency? And with four times the tension?",
        steps: ["\\(v = \\sqrt{\\dfrac{100}{0.01}} = 100\\) m/s; \\(n = \\dfrac{100}{2 \\times 0.5} = 100\\) Hz.", "\\(T \\times 4\\) ⇒ \\(n \\times 2 = 200\\) Hz."],
        answer: "100 Hz; 200 Hz",
      },
      selfCheckExample: {
        prompt: "A string resonates at 300 Hz and next at 360 Hz. Fundamental, and which harmonic is 300 Hz?",
        steps: ["\\(360 - 300 = 60\\) Hz; \\(300 = 5 \\times 60\\)."],
        answer: "60 Hz; the 5th",
      },
      practiceSet: [
        { prompt: "Tension raised 44%, length and μ fixed. Frequency ratio new : old?", answer: "6 : 5" },
        { prompt: "No resonance between 315 Hz and 420 Hz on a string. Lowest resonant frequency?", answer: "105 Hz" },
        { prompt: "At the equator (lower g) a hanging-weight sonometer must be retuned how?", answer: "Shorten the vibrating length" },
      ],
      pyqExampleId: "475d3614-628f-49e1-821a-92e9a23ea469",
      traps: [
        {
          title: "Frequency proportional to tension",
          body:
            "\\(n \\propto \\sqrt{T}\\). A 44% rise in tension raises the frequency by 20% (\\(\\sqrt{1.44} = 1.2\\)), not 44%.",
        },
      ],
    },
  ],
  related: [
    { label: "Organ Pipes and the Doppler Effect", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-pipes-doppler" },
    { label: "Beats — sonometers with tuning forks", href: "/notes/mht-cet-physics/superposition-of-waves/cetp-beats" },
  ],
};
