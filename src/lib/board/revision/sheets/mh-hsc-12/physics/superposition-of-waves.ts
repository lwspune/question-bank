import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 6 Superposition of Waves. Statements checked against
 * the Balbharati text (law wordings are the book's own); most-asked years from
 * 41 of the 42 board past-paper questions in the bank, 2016-2026 (a 2020
 * Doppler-effect question is left out: the current book does not teach it).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Superposition of Waves",
  chapterSlug: "superposition-of-waves",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Progressive wave",
      text: "A disturbance that travels continuously from one particle to another, without damping or obstruction. All particles vibrate with the same amplitude, period and frequency; the phase changes from particle to particle. \\(y = A\\sin(kx - \\omega t)\\) travels along +x, \\(y = A\\sin(kx + \\omega t)\\) along -x.",
    },
    {
      term: "Reflection of waves",
      text: "**Transverse**: from a denser medium (rigid support) a crest returns as a trough (phase change \\(\\pi\\)); from a rarer medium a crest returns as a crest. **Longitudinal**: from a denser medium a compression returns as a compression; from a rarer medium as a rarefaction (pressure phase changes by \\(\\pi\\)).",
    },
    {
      term: "Principle of superposition of waves",
      text: "When two or more waves pass through a common point, each wave produces its own displacement at that point, independent of the presence of the others. The resultant displacement is the vector sum of the individual displacements.",
    },
    {
      term: "Stationary (standing) wave",
      text: "Produced by the superposition of two identical waves (transverse or longitudinal) travelling along the same path in opposite directions. The disturbance remains in the region where it is produced: the wave does not move either way.",
    },
    {
      term: "Nodes and antinodes",
      text: "Nodes are points of minimum (zero) displacement; antinodes are points of maximum displacement. They are formed alternately. Successive nodes (or antinodes) are \\(\\frac{\\lambda}{2}\\) apart; a node and the adjacent antinode, \\(\\frac{\\lambda}{4}\\). All particles in one loop vibrate in phase; the phase reverses in the adjacent loop.",
    },
    {
      term: "Progressive and stationary waves compared",
      text: "Progressive: the disturbance travels with a definite velocity, all particles have the same amplitude, and energy is transferred. Stationary: the velocity of the wave is zero, the amplitude varies from zero (node) to maximum (antinode), and energy is not transferred.",
    },
    {
      term: "Free and forced vibrations, resonance",
      text: "**Free**: the body vibrates on its own with its natural frequency, and the amplitude slowly decreases. **Forced**: an external periodic force makes it vibrate with the frequency of the force. **Resonance**: when the natural frequency matches the frequency of the source, the body absorbs maximum energy.",
    },
    {
      term: "Harmonics and overtones",
      text: "The minimum natural frequency is the fundamental frequency, or first harmonic. Harmonics are integral multiples of it. The first frequency actually produced above the fundamental is the first overtone, the next the second overtone, and so on.",
    },
    {
      term: "End correction",
      text: "The distance between the open end of a pipe and the antinode just outside it. To a first approximation \\(e = 0.3d\\) (\\(d\\) = inner diameter). Corrected length: \\(L = l + e\\) (closed pipe), \\(L = l + 2e\\) (open pipe).",
    },
    {
      term: "Pipe closed at one end",
      text: "A node at the closed end and an antinode at the open end. Only odd harmonics are present: the frequencies are \\(n, 3n, 5n, \\dots\\)",
    },
    {
      term: "Pipe open at both ends",
      text: "Antinodes at both open ends. All harmonics are present as overtones: \\(n, 2n, 3n, \\dots\\) Its sound is richer in quality than that of a closed pipe of the same length.",
    },
    {
      term: "Vibrations of a stretched string",
      text: "The wave is reflected at the fixed ends with a phase change of \\(\\pi\\), so the ends are nodes. All harmonics are present: \\(n, 2n, 3n, \\dots\\)",
    },
    {
      term: "Laws of a vibrating string",
      text: "**Length**: \\(n \\propto \\frac{1}{l}\\) (T and m constant). **Tension**: \\(n \\propto \\sqrt{T}\\) (l and m constant). **Linear density**: \\(n \\propto \\frac{1}{\\sqrt{m}}\\) (T and l constant). The sonometer verifies these laws.",
    },
    {
      term: "Beats",
      text: "Two sound waves of the same amplitude and slightly different frequencies, travelling in the same direction, make the intensity rise and fall periodically. Maximum intensity is waxing, minimum is waning; one waxing and one waning make one beat. Beats per second = beat frequency.",
    },
  ],
  formulas: [
    { label: "Progressive wave", latex: "y = A\\sin(kx - \\omega t) \\qquad k = \\frac{2\\pi}{\\lambda} \\qquad v = \\frac{\\omega}{k} = n\\lambda" },
    { label: "Stationary wave", latex: "y = 2a\\cos\\frac{2\\pi x}{\\lambda}\\,\\sin\\omega t" },
    { label: "Positions of nodes and antinodes", latex: "x_{node} = (2p + 1)\\frac{\\lambda}{4} \\qquad x_{antinode} = \\frac{p\\lambda}{2} \\qquad p = 0, 1, 2, \\dots" },
    { label: "End correction", latex: "e = 0.3d \\qquad L_{closed} = l + e \\qquad L_{open} = l + 2e" },
    { label: "Pipe closed at one end", latex: "n = \\frac{v}{4L} \\qquad n_p = (2p + 1)\\,n \\text{ for the p-th overtone}" },
    { label: "Pipe open at both ends", latex: "n = \\frac{v}{2L} \\qquad n_p = (p + 1)\\,n \\text{ for the p-th overtone}" },
    {
      label: "End correction from two pipes",
      latex: "e_{open} = \\frac{n_2l_2 - n_1l_1}{2(n_1 - n_2)} \\qquad e_{closed} = \\frac{n_2l_2 - n_1l_1}{n_1 - n_2}",
    },
    {
      label: "Stretched string",
      latex: "v = \\sqrt{\\frac{T}{m}} \\qquad n = \\frac{1}{2l}\\sqrt{\\frac{T}{m}} \\qquad n_p = p\\,n",
      symbols: [
        { symbol: "m", meaning: "mass per unit length (kg/m)" },
        { symbol: "T", meaning: "tension" },
      ],
    },
    { label: "Laws of a vibrating string", latex: "n \\propto \\frac{1}{l} \\qquad n \\propto \\sqrt{T} \\qquad n \\propto \\frac{1}{\\sqrt{m}} \\qquad n \\propto \\frac{1}{r\\sqrt{\\rho}}" },
    { label: "Beats", latex: "N = n_1 - n_2 \\qquad \\text{time between two maxima} = \\frac{1}{n_1 - n_2}" },
  ],
  derivations: [
    {
      title: "Equation of a stationary wave; show that nodes and antinodes are equally spaced",
      steps: [
        "Two identical waves in opposite directions: \\(y_1 = a\\sin 2\\pi\\left(nt - \\frac{x}{\\lambda}\\right)\\), \\(y_2 = a\\sin 2\\pi\\left(nt + \\frac{x}{\\lambda}\\right)\\).",
        "Superposition: \\(y = y_1 + y_2 = 2a\\cos\\frac{2\\pi x}{\\lambda}\\sin 2\\pi nt\\), i.e. \\(y = A\\sin\\omega t\\) with \\(A = 2a\\cos\\frac{2\\pi x}{\\lambda}\\).",
        "x and t appear separately, not as \\((nt \\pm \\frac{x}{\\lambda})\\), so the wave is not progressive; the amplitude varies with position.",
        "Nodes: \\(A = 0\\), \\(x = \\frac{\\lambda}{4}, \\frac{3\\lambda}{4}, \\frac{5\\lambda}{4}, \\dots\\) Antinodes: \\(A = \\pm 2a\\), \\(x = 0, \\frac{\\lambda}{2}, \\lambda, \\dots\\)",
        "So successive nodes (or antinodes) are \\(\\frac{\\lambda}{2}\\) apart, and a node and the adjacent antinode \\(\\frac{\\lambda}{4}\\) apart.",
      ],
    },
    {
      title: "Show that only odd harmonics are present in an air column in a pipe closed at one end",
      steps: [
        "Node at the closed end, antinode at the open end. Fundamental: \\(L = \\frac{\\lambda}{4}\\), so \\(n = \\frac{v}{4L}\\).",
        "First overtone: \\(L = \\frac{3\\lambda_1}{4}\\), so \\(n_1 = \\frac{3v}{4L} = 3n\\) (third harmonic).",
        "Second overtone: \\(L = \\frac{5\\lambda_2}{4}\\), so \\(n_2 = 5n\\). In general \\(n_p = (2p + 1)n\\).",
        "Frequencies are \\(n, 3n, 5n, \\dots\\): only odd harmonics are present.",
      ],
    },
    {
      title: "Show that all harmonics are present in an air column in a pipe open at both ends",
      steps: [
        "Antinodes at both ends. Fundamental: one node in the middle, \\(L = \\frac{\\lambda}{2}\\), so \\(n = \\frac{v}{2L}\\).",
        "First overtone: two nodes, \\(L = \\lambda_1\\), so \\(n_1 = \\frac{v}{L} = 2n\\).",
        "Second overtone: three nodes, \\(L = \\frac{3\\lambda_2}{2}\\), so \\(n_2 = 3n\\). In general \\(n_p = (p + 1)n\\).",
        "Frequencies are \\(n, 2n, 3n, \\dots\\): all harmonics are present.",
      ],
    },
    {
      title: "Show that all harmonics are present in the vibrations of a stretched string",
      steps: [
        "The ends are nodes. Fundamental: one loop, \\(l = \\frac{\\lambda}{2}\\), so \\(n = \\frac{v}{2l} = \\frac{1}{2l}\\sqrt{\\frac{T}{m}}\\).",
        "Two loops: \\(l = \\lambda_1\\), so \\(n_1 = 2n\\) (second harmonic, first overtone).",
        "Three loops: \\(l = \\frac{3\\lambda_2}{2}\\), so \\(n_2 = 3n\\). In general \\(p\\) loops give \\(pn\\).",
        "Frequencies are \\(n, 2n, 3n, \\dots\\): all harmonics are present.",
      ],
    },
    {
      title: "Practical determination of end correction (open pipe and closed pipe)",
      steps: [
        "Take two pipes of the same diameter, lengths \\(l_1\\) and \\(l_2\\), resonating with forks of frequencies \\(n_1\\) and \\(n_2\\).",
        "Open pipe: \\(v = 2n_1(l_1 + 2e) = 2n_2(l_2 + 2e)\\), so \\(e = \\frac{n_2l_2 - n_1l_1}{2(n_1 - n_2)}\\).",
        "Closed pipe: \\(v = 4n_1(l_1 + e) = 4n_2(l_2 + e)\\), so \\(e = \\frac{n_2l_2 - n_1l_1}{n_1 - n_2}\\).",
      ],
    },
    {
      title: "Prove that the beat frequency equals the difference of the two frequencies",
      steps: [
        "At \\(x = 0\\): \\(y_1 = a\\sin 2\\pi n_1t\\), \\(y_2 = a\\sin 2\\pi n_2t\\).",
        "Superposition: \\(y = 2a\\cos\\pi(n_1 - n_2)t\\,\\sin\\pi(n_1 + n_2)t = A\\sin 2\\pi nt\\), with \\(n = \\frac{n_1 + n_2}{2}\\).",
        "Amplitude \\(A = 2a\\cos\\pi(n_1 - n_2)t\\) varies with time; intensity is maximum when \\(A = \\pm 2a\\).",
        "Maxima at \\(t = 0, \\frac{1}{n_1 - n_2}, \\frac{2}{n_1 - n_2}, \\dots\\): the period of beats is \\(\\frac{1}{n_1 - n_2}\\).",
        "So the beat frequency \\(N = n_1 - n_2\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Reflection of a wave pulse from a denser medium",
      labels: ["light string and rigid support", "incident crest", "reflected trough", "direction of travel"],
    },
    {
      title: "Formation of stationary waves on a string",
      labels: ["nodes N and antinodes A", "loops", "λ/2 between successive nodes", "λ/4 between a node and an antinode"],
    },
    {
      title: "Modes of an air column in a pipe closed at one end",
      labels: ["node at the closed end", "antinode just beyond the open end (end correction e)", "L = λ/4, 3λ/4, 5λ/4", "fundamental, first and second overtones"],
    },
    {
      title: "Modes of an air column in a pipe open at both ends",
      labels: ["antinodes at both ends", "one, two and three nodes", "L = λ/2, λ, 3λ/2", "end correction at each end"],
    },
    {
      title: "Modes of vibration of a stretched string",
      labels: ["nodes at both fixed ends", "one, two and three loops", "l = λ/2, λ, 3λ/2", "antinode at the middle of each loop"],
    },
    {
      title: "Sonometer",
      labels: ["hollow sound box", "wire AB over bridges P and Q", "hanger with weights (tension T)", "paper rider at the middle", "tuning fork on the box"],
    },
  ],
  mostAsked: [
    {
      topic: "Vibrating string and sonometer: all harmonics present, laws of a string, tension or frequency numericals",
      years: [2026, 2024, 2020, 2019, 2017, 2016],
    },
    {
      topic: "Beats: prove that beat frequency \\(= n_1 - n_2\\), or a numerical with two tuning forks or two notes",
      years: [2025, 2024, 2023, 2022, 2020, 2019, 2018, 2017],
    },
    { topic: "Stationary waves by the analytical method; distance between nodes and antinodes", years: [2025, 2024, 2019, 2018, 2017, 2016] },
    { topic: "Air column in a pipe: all harmonics in an open pipe, only odd harmonics in a closed pipe", years: [2026, 2024, 2020, 2019, 2018, 2016] },
    { topic: "Progressive waves: equation, speed, and how they differ from stationary waves", years: [2025, 2024, 2022, 2017] },
    { topic: "Harmonics and overtones: explain or distinguish", years: [2026, 2025, 2022] },
    { topic: "Reflection of transverse and longitudinal waves from a denser and a rarer medium", years: [2019, 2016] },
    { topic: "Practical determination of end correction for open and closed pipes", years: [2025] },
  ],
  mistakes: [
    {
      title: "Node to antinode as \\(\\frac{\\lambda}{2}\\)",
      body: "Node to the adjacent antinode is \\(\\frac{\\lambda}{4}\\); node to node (or antinode to antinode) is \\(\\frac{\\lambda}{2}\\). A string of length 2 m with 2 loops has \\(\\lambda = 2\\) m, so node to antinode is 0.5 m.",
    },
    {
      title: "Counting overtones as harmonics",
      body: "Closed pipe: the p-th overtone is the \\((2p + 1)\\)-th harmonic. Open pipe and string: the p-th overtone is the \\((p + 1)\\)-th harmonic. The third overtone of an open pipe is \\(4n\\), not \\(3n\\).",
    },
    {
      title: "Taking the tension change as the frequency change",
      body: "\\(n \\propto \\sqrt{T}\\). A 21% rise in tension multiplies \\(n\\) by \\(\\sqrt{1.21} = 1.1\\): the frequency rises 10%, not 21%.",
    },
    {
      title: "Using grams for linear density",
      body: "\\(m\\) is mass per unit length in kg/m: a 1 m wire of mass 2 g has \\(m = 2 \\times 10^{-3}\\) kg/m.",
    },
    {
      title: "Ignoring the end correction",
      body: "The antinode forms a little beyond the open end. Use the corrected length \\(L = l + e\\) for a closed pipe and \\(L = l + 2e\\) for an open pipe when the question gives \\(e\\) or the diameter.",
    },
    {
      title: "Mixing up reflection of the two kinds of wave",
      body: "From a denser medium, a transverse crest returns as a **trough**, but a longitudinal compression returns as a **compression**. From a rarer medium, it is the other way round.",
    },
  ],
};

export default sheet;
