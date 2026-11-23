import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_STATIONARY_NOTE: SubtopicNote = {
  subtopicName: "Stationary Waves",
  title: "Stationary Waves: Formation, Nodes and Antinodes",
  oneLineDefinition:
    "Two identical waves travelling in opposite directions add up to a wave that does not travel: reflection at a boundary, the equation of a stationary wave, where its nodes and antinodes sit, and how it differs from a progressive wave.",
  whyItMatters:
    "18 questions. Twelve were set in board papers, more than on any other page of this chapter: derive the equation of a stationary wave and show where the nodes and antinodes are (2016, 2017, 2019, 2024), distinguish progressive and stationary waves (2024), explain reflection from a denser and a rarer medium (2016, 2019), and short questions on the node to antinode distance, its phase difference, wave speed and a string with one free end (2018, 2020, 2024, 2025, 2026). The textbook adds the characteristics of stationary waves and where a vibrating string can be touched.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpsw-reflection",
      name: "Reflection from a denser and a rarer medium",
      intuition:
        "A stationary wave needs a wave and its reflection. At a rigid (denser) boundary the medium cannot move, so the reflected wave must cancel the incoming displacement there: the wave comes back turned over. At a free (rarer) boundary the medium moves freely, and the wave comes back the same way up.",
      definition:
        "- **Denser medium (rigid boundary):** the reflected wave suffers a phase change of \\(\\pi\\) rad.\n" +
        "- **Rarer medium (free boundary):** there is no phase change.\n" +
        "- In both cases the reflected wave has the same speed, frequency and wavelength as the incident wave, since it travels in the same medium.\n" +
        "- A rigid boundary becomes a **node** of the stationary wave and a free boundary an **antinode**.",
      table: {
        columns: ["Wave", "Reflected from a denser medium", "Reflected from a rarer medium"],
        rows: [
          {
            cells: ["Phase change", "\\(\\pi\\) rad", "None"],
            pyqExampleId: "4a555b6a-3c4b-48b9-a06a-3bb1303e2621",
            noteAmber: "Board 2016 asked for the phase change on reflection from a denser medium.",
          },
          { cells: ["Transverse wave", "A crest returns as a trough", "A crest returns as a crest"] },
          { cells: ["Longitudinal wave", "A compression returns as a compression", "A compression returns as a rarefaction"] },
          { cells: ["Speed, frequency, wavelength", "Unchanged", "Unchanged"] },
        ],
      },
      practiceSet: [
        { prompt: "What phase change does a wave suffer on reflection from a rarer medium?", answer: "None" },
        { prompt: "A crest of a transverse wave on a string reaches a rigid support. What comes back?", answer: "A trough" },
        { prompt: "Does the wavelength change when a wave is reflected?", answer: "No. It travels back in the same medium, so speed, frequency and wavelength are unchanged" },
      ],
      pyqExampleId: "0a95318e-1227-4509-88ea-689622c7e4eb",
      traps: [
        {
          title: "The longitudinal rule runs the other way",
          body: "At a denser medium a crest returns as a trough, but a compression returns as a compression. At a rarer medium a compression returns as a rarefaction. Learn the two rows separately.",
        },
        {
          title: "Covering only one kind of wave",
          body: "When the board asks for the reflection of transverse and longitudinal waves, write both media for both waves. Four short statements earn the marks; two earn half.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-stationary-equation",
      name: "Equation of a stationary wave",
      intuition:
        "Send a wave along a string and let it reflect from the far end. The wave going out and the wave coming back have the same amplitude and frequency and move in opposite directions. Where they always cancel, the string never moves (a node); where they always add, it swings hardest (an antinode). The pattern only grows and shrinks in place, so the wave is called stationary.",
      definition:
        "- Two identical waves in opposite directions: \\(y_1 = a\\sin 2\\pi\\left(nt - \\dfrac{x}{\\lambda}\\right)\\) and \\(y_2 = a\\sin 2\\pi\\left(nt + \\dfrac{x}{\\lambda}\\right)\\).\n" +
        "- By the principle of superposition, \\(y = y_1 + y_2\\). Use \\(\\sin C + \\sin D = 2\\sin\\dfrac{C + D}{2}\\cos\\dfrac{C - D}{2}\\).\n" +
        "- This gives \\(y = 2a\\cos\\dfrac{2\\pi x}{\\lambda}\\sin 2\\pi nt\\). Put \\(A = 2a\\cos\\dfrac{2\\pi x}{\\lambda}\\), so \\(y = A\\sin\\omega t\\).\n" +
        "- The amplitude A depends on x but not on t, and x and t sit in separate factors, so the wave does not advance.\n" +
        "- **Nodes** (A = 0): \\(\\cos\\dfrac{2\\pi x}{\\lambda} = 0\\), so \\(x = \\dfrac{\\lambda}{4}, \\dfrac{3\\lambda}{4}, \\dfrac{5\\lambda}{4}, \\dots\\)\n" +
        "- **Antinodes** (\\(|A| = 2a\\)): \\(\\cos\\dfrac{2\\pi x}{\\lambda} = \\pm 1\\), so \\(x = 0, \\dfrac{\\lambda}{2}, \\lambda, \\dfrac{3\\lambda}{2}, \\dots\\)\n" +
        "- Successive nodes, and successive antinodes, are \\(\\dfrac{\\lambda}{2}\\) apart; so nodes and antinodes are equally spaced.\n" +
        "- When the board asks for a diagram, draw the two component waves and their resultant at \\(t = 0, \\dfrac{T}{4}, \\dfrac{T}{2}\\), and mark N and A.",
      formula: {
        label: "Stationary wave",
        latex: "y = 2a\\cos\\frac{2\\pi x}{\\lambda}\\,\\sin 2\\pi n t",
      },
      authoredExample: {
        prompt:
          "A stationary wave on a string is \\(y = 0.04\\cos(5\\pi x)\\sin(100\\pi t)\\), with x and y in metres and t in seconds. Find the amplitude, wavelength and frequency of the two waves that formed it, their speed, and the positions of the first two nodes from x = 0.",
        steps: [
          "Given: compare with \\(y = 2a\\cos\\dfrac{2\\pi x}{\\lambda}\\sin 2\\pi nt\\).",
          "\\(2a = 0.04\\) m, so \\(a = 0.02\\) m.",
          "\\(\\dfrac{2\\pi}{\\lambda} = 5\\pi\\), so \\(\\lambda = 0.4\\) m; \\(2\\pi n = 100\\pi\\), so \\(n = 50\\) Hz.",
          "Speed: \\(v = n\\lambda = 50 \\times 0.4 = 20\\) m/s.",
          "Nodes at \\(x = \\dfrac{\\lambda}{4} = 0.1\\) m and \\(\\dfrac{3\\lambda}{4} = 0.3\\) m.",
        ],
        answer: "a = 0.02 m, λ = 0.4 m, n = 50 Hz, v = 20 m/s; nodes at 0.1 m and 0.3 m",
      },
      selfCheckExample: {
        prompt: "In the stationary wave \\(y = 2a\\cos\\dfrac{2\\pi x}{\\lambda}\\sin 2\\pi nt\\), what is the amplitude of the particle at \\(x = \\dfrac{\\lambda}{8}\\)?",
        steps: ["\\(A = 2a\\cos\\dfrac{2\\pi}{\\lambda}\\cdot\\dfrac{\\lambda}{8} = 2a\\cos\\dfrac{\\pi}{4} = \\dfrac{2a}{\\sqrt{2}}\\)."],
        answer: "\\(\\sqrt{2}\\,a\\), about 1.41a",
      },
      practiceSet: [
        { prompt: "In \\(y = 2a\\cos\\dfrac{2\\pi x}{\\lambda}\\sin 2\\pi nt\\), what is the amplitude at an antinode?", answer: "2a" },
        { prompt: "A stationary wave is \\(y = 0.1\\cos(2\\pi x)\\sin(40\\pi t)\\) in SI units. Find its frequency.", answer: "20 Hz" },
        { prompt: "Why is a stationary wave called stationary?", answer: "Its amplitude depends only on position, so the pattern does not move along the medium and carries no energy along it" },
      ],
      pyqExampleId: "e8533907-bfa3-4b50-88ac-9543db2a3bcf",
      traps: [
        {
          title: "Jumping to the answer",
          body: "Write the two waves, state the principle of superposition, quote \\(\\sin C + \\sin D\\) and then the result. Going straight to \\(y = 2a\\cos\\dfrac{2\\pi x}{\\lambda}\\sin 2\\pi nt\\) loses most of the derivation marks.",
        },
        {
          title: "No diagram when one is asked",
          body: "'Show diagrammatically' needs the component waves and their resultant drawn at a few instants, with nodes and antinodes labelled. A description in words alone does not earn that part.",
        },
        {
          title: "Putting a node at x = 0",
          body: "With the waves written as above, \\(x = 0\\) is an antinode and the first node is at \\(\\dfrac{\\lambda}{4}\\). Check the cosine before you list positions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-nodes-antinodes",
      name: "Spacing of nodes and antinodes",
      intuition:
        "Nodes and antinodes take turns along the medium. The stretch between two nodes is one loop, and one loop is half a wavelength. So count loops, and you have the wavelength; then the speed follows from v = nλ.",
      definition:
        "- Node to next node \\(= \\dfrac{\\lambda}{2}\\); antinode to next antinode \\(= \\dfrac{\\lambda}{2}\\); node to adjacent antinode \\(= \\dfrac{\\lambda}{4}\\).\n" +
        "- A string of length L vibrating in p loops: \\(L = p\\dfrac{\\lambda}{2}\\).\n" +
        "- The stationary wave has the same frequency and wavelength as the waves that form it, so \\(v = n\\lambda\\).\n" +
        "- A fixed end is a node and a free end is an antinode. A string fixed at one end and free at the other has \\(L = \\dfrac{\\lambda}{4}, \\dfrac{3\\lambda}{4}, \\dfrac{5\\lambda}{4}, \\dots\\), an odd multiple of \\(\\dfrac{\\lambda}{4}\\).\n" +
        "- The board's 2024 key takes the phase difference between a node and the next antinode as \\(\\dfrac{2\\pi}{\\lambda} \\times \\dfrac{\\lambda}{4} = \\dfrac{\\pi}{2}\\).",
      formula: {
        label: "Spacing",
        latex: "\\text{node to node} = \\frac{\\lambda}{2}, \\qquad \\text{node to antinode} = \\frac{\\lambda}{4}, \\qquad v = n\\lambda",
      },
      authoredExample: {
        prompt:
          "In a stationary wave on a string the nodes are 15 cm apart. The waves that form it travel at 60 m/s. Find the wavelength, the frequency, and the distance between a node and the next antinode.",
        steps: [
          "Given: node to node \\(= 15\\) cm, \\(v = 60\\) m/s.",
          "\\(\\dfrac{\\lambda}{2} = 15\\) cm, so \\(\\lambda = 30\\) cm \\(= 0.3\\) m.",
          "\\(n = \\dfrac{v}{\\lambda} = \\dfrac{60}{0.3} = 200\\) Hz.",
          "Node to antinode \\(= \\dfrac{\\lambda}{4} = 7.5\\) cm.",
        ],
        answer: "λ = 0.3 m, n = 200 Hz, node to antinode 7.5 cm",
      },
      selfCheckExample: {
        prompt: "Antinodes in a stationary wave are 0.25 m apart and the frequency is 680 Hz. Find the speed of the waves that form it.",
        steps: ["\\(\\dfrac{\\lambda}{2} = 0.25\\) m, so \\(\\lambda = 0.5\\) m.", "\\(v = n\\lambda = 680 \\times 0.5 = 340\\) m/s."],
        answer: "340 m/s",
      },
      practiceSet: [
        { prompt: "Name the points of a stationary wave that are permanently at rest.", answer: "Nodes" },
        { prompt: "A string fixed at one end and free at the other vibrates in its simplest mode. It is 0.3 m long. Find the wavelength.", answer: "\\(L = \\dfrac{\\lambda}{4}\\), so 1.2 m" },
        { prompt: "Find the distance between the first and the fourth node of a stationary wave of wavelength 0.6 m.", answer: "Three gaps of 0.3 m: 0.9 m" },
      ],
      pyqExampleId: "a522f9c8-8fa9-49b3-bd59-7403db449bea",
      traps: [
        {
          title: "Taking one loop as a whole wavelength",
          body: "One loop, from node to node, is \\(\\dfrac{\\lambda}{2}\\). A string in two loops holds one wavelength, not two.",
        },
        {
          title: "Treating a free end as a node",
          body: "A free end is an antinode. With one end fixed and one free, the length is an odd multiple of \\(\\dfrac{\\lambda}{4}\\), not a multiple of \\(\\dfrac{\\lambda}{2}\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpsw-stationary-vs-progressive",
      name: "Stationary and progressive waves compared",
      intuition:
        "A progressive wave moves along and carries energy with it. A stationary wave is the sum of two such waves going opposite ways, so it stays in place, has points that never move, and carries no energy along the medium.",
      definition:
        "- The textbook asks for the characteristics of stationary waves; the board asks you to distinguish the two kinds. Write each point as a comparison of both.\n" +
        "- All particles cross their mean positions at the same instant in a stationary wave, twice in each period.",
      table: {
        columns: ["Point", "Progressive wave", "Stationary wave"],
        rows: [
          {
            cells: ["Travel", "The disturbance moves forward with a definite speed", "The disturbance does not travel; the pattern stays in place"],
            noteAmber: "Board 2024 asked you to distinguish progressive and stationary waves.",
          },
          { cells: ["Energy", "Carried along the direction of the wave", "Not carried along the medium"] },
          { cells: ["Amplitude", "The same for every particle", "Zero at the nodes, largest (2a) at the antinodes"] },
          { cells: ["Particles at rest", "None is permanently at rest", "Particles at the nodes are always at rest"] },
          { cells: ["Phase", "Changes continuously from particle to particle", "The same for all particles in one loop; opposite in the next loop"] },
          { cells: ["Formation", "One wave travelling through the medium", "Two identical waves travelling in opposite directions"] },
        ],
      },
      practiceSet: [
        { prompt: "In which kind of wave do all the particles in one loop vibrate in phase?", answer: "A stationary wave" },
        { prompt: "Does a stationary wave carry energy along the medium?", answer: "No" },
        { prompt: "What is the amplitude of a particle at a node?", answer: "Zero" },
      ],
      pyqExampleId: "867ae177-ca62-4082-a264-3c1dabb6b032",
      traps: [
        {
          title: "One-sided points",
          body: "Each point of a 'distinguish' answer must say what happens in both waves. 'Stationary waves have nodes' without the progressive side earns half the mark.",
        },
      ],
    },
  ],
};
