import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WV_STANDING_NOTE: SubtopicNote = {
  subtopicName: "Standing Waves and Pipes",
  title: "Standing Waves and Pipes",
  oneLineDefinition:
    "Standing waves made by two waves running opposite ways, the nodes and antinodes they form, and the harmonics of a string fixed at both ends, a pipe open at both ends and a pipe closed at one end.",
  whyItMatters:
    "Three NEET questions, from 2023, 2025 and Re-NEET 2026, all about pipes: the ratio of the fundamental frequencies of an open and a closed pipe of the same length (2023), an open pipe dipped halfway into water (2025), and the number of nodes in the 5th harmonic of an open pipe and the 9th harmonic of a closed one (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwv-standing",
      name: "Harmonics of strings and pipes",
      intuition:
        "When a wave reflects from the end of a string or a pipe, the outgoing and the returning waves add up. At certain frequencies they make a standing wave: some points never move (nodes) and some move the most (antinodes). A fixed end of a string and the closed end of a pipe must be nodes; an open end of a pipe is an antinode. Only the wavelengths that fit these end conditions can stand, and that gives each string or pipe its own set of frequencies.",
      definition:
        "- Adjacent nodes are \\(\\dfrac{\\lambda}{2}\\) apart; a node and the next antinode are \\(\\dfrac{\\lambda}{4}\\) apart.\n" +
        "- **String fixed at both ends** (nodes at both ends): \\(L = n\\dfrac{\\lambda}{2}\\), so \\(f_n = \\dfrac{nv}{2L}\\), n = 1, 2, 3, ... All harmonics are present.\n" +
        "- **Pipe open at both ends** (antinodes at both ends): \\(f_n = \\dfrac{nv}{2L}\\), n = 1, 2, 3, ... All harmonics are present.\n" +
        "- **Pipe closed at one end** (node at the closed end, antinode at the open end): \\(L = (2n - 1)\\dfrac{\\lambda}{4}\\), so \\(f = \\dfrac{(2n - 1)v}{4L}\\). Only odd harmonics: \\(f_1, 3f_1, 5f_1, \\ldots\\)\n" +
        "- For the same length, the fundamental of an open pipe, \\(\\dfrac{v}{2L}\\), is twice that of a closed pipe, \\(\\dfrac{v}{4L}\\).",
      formula: {
        label: "Fundamental and harmonics",
        latex:
          "f_n = \\frac{nv}{2L}\\ \\text{(string, open pipe)}, \\qquad f = \\frac{(2n - 1)v}{4L}\\ \\text{(closed pipe)}",
        symbols: [
          { symbol: "\\(L\\)", meaning: "length of the string or of the air column" },
          { symbol: "\\(v\\)", meaning: "speed of the wave on the string, or of sound in the air" },
        ],
      },
      authoredExample: {
        prompt:
          "A string 0.5 m long is fixed at both ends, and waves travel on it at 100 m/s. Find its fundamental frequency and the next two frequencies it can vibrate at.",
        steps: [
          "\\(f_1 = \\dfrac{v}{2L} = \\dfrac{100}{2 \\times 0.5} = 100\\) Hz.",
          "A string fixed at both ends has all harmonics: \\(2f_1 = 200\\) Hz and \\(3f_1 = 300\\) Hz.",
        ],
        answer: "100 Hz, then 200 Hz and 300 Hz",
      },
      selfCheckExample: {
        prompt:
          "A pipe 17 cm long is closed at one end. The speed of sound is 340 m/s. Find its fundamental frequency and the next frequency at which it resonates.",
        steps: [
          "\\(f_1 = \\dfrac{v}{4L} = \\dfrac{340}{4 \\times 0.17} = \\dfrac{340}{0.68} = 500\\) Hz.",
          "A closed pipe has only odd harmonics, so the next one is \\(3f_1 = 1500\\) Hz.",
        ],
        answer: "500 Hz and 1500 Hz",
      },
      practiceSet: [
        { prompt: "A standing wave has wavelength 40 cm. How far apart are two adjacent nodes?", answer: "20 cm" },
        { prompt: "A pipe open at both ends is 85 cm long, and sound travels at 340 m/s. What is its fundamental frequency?", answer: "200 Hz" },
        { prompt: "Which harmonics can a pipe closed at one end produce?", answer: "Only the odd harmonics" },
        { prompt: "Is the closed end of a pipe a displacement node or a displacement antinode?", answer: "A node" },
      ],
      pyqExampleId: "6fbba926-0d8b-4f04-a786-1739e6ef1020",
      traps: [
        {
          title: "Water closes a pipe",
          body: "A pipe dipped into water has the water surface as a closed end. It becomes a closed pipe, and its length is only the part of the air column above the water.",
        },
        {
          title: "A closed pipe skips the even harmonics",
          body: "The next frequency above the fundamental \\(f_1\\) of a closed pipe is \\(3f_1\\), not \\(2f_1\\).",
        },
        {
          title: "Open pipe: two L, closed pipe: four L",
          body: "The fundamental of an open pipe is \\(\\dfrac{v}{2L}\\); that of a closed pipe is \\(\\dfrac{v}{4L}\\). Swapping them halves or doubles the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwv-nodes",
      name: "Counting nodes and antinodes",
      intuition:
        "Draw the standing wave and count. Each harmonic of a string or an open pipe adds one more half wavelength to the length, so one more loop. A closed pipe is built from quarter wavelengths, and only an odd number of them fits, so its harmonics go 1, 3, 5, ... and each step adds one node and one antinode. Counting is easy once you know what sits at each end.",
      definition:
        "- **String fixed at both ends**, nth harmonic: n loops, n + 1 nodes (both ends included) and n antinodes.\n" +
        "- **Open pipe**, nth harmonic: n nodes and n + 1 antinodes (both open ends are antinodes).\n" +
        "- **Closed pipe**: its harmonics are 1, 3, 5, ... The (2k − 1)th harmonic, the kth mode, has k nodes (the closed end included) and k antinodes (the open end included).\n" +
        "- So a closed pipe's 9th harmonic is its 5th mode, with 5 nodes and 5 antinodes.",
      formula: {
        label: "Nodes in the nth harmonic",
        latex:
          "\\text{string: } n + 1, \\qquad \\text{open pipe: } n, \\qquad \\text{closed pipe, harmonic } 2k - 1\\text{: } k",
      },
      authoredExample: {
        prompt:
          "A string 1.2 m long, fixed at both ends, vibrates in its 4th harmonic. How many nodes and antinodes does it have, and what is the wavelength?",
        steps: [
          "The 4th harmonic has 4 loops, so 4 + 1 = 5 nodes (the two ends included) and 4 antinodes.",
          "Each loop is half a wavelength: \\(4 \\times \\dfrac{\\lambda}{2} = 1.2\\) m, so \\(\\lambda = 0.6\\) m.",
        ],
        answer: "5 nodes, 4 antinodes, λ = 0.6 m",
      },
      selfCheckExample: {
        prompt:
          "A pipe 75 cm long, closed at one end, has 3 displacement nodes in it, the closed end included. Which harmonic is this, and what is the wavelength?",
        steps: [
          "k nodes means the kth mode, the (2k − 1)th harmonic: k = 3 gives the 5th harmonic.",
          "Then \\(L = 5\\dfrac{\\lambda}{4}\\), so \\(\\lambda = \\dfrac{4 \\times 75}{5} = 60\\) cm.",
        ],
        answer: "The 5th harmonic, λ = 60 cm",
      },
      practiceSet: [
        { prompt: "In a standing wave of wavelength 80 cm, how far is a node from the next antinode?", answer: "20 cm" },
        { prompt: "A string fixed at both ends vibrates in its 3rd harmonic. How many loops does it show?", answer: "3" },
        { prompt: "How many displacement nodes are there in a pipe open at both ends sounding its fundamental?", answer: "One, at the middle" },
        { prompt: "A pipe is closed at one end. Which harmonic is its second mode above the fundamental?", answer: "The 5th harmonic" },
      ],
      pyqExampleId: "c4c725ba-87dd-4bfd-81e6-8f1a67563286",
      traps: [
        {
          title: "A closed pipe's harmonic number is not its mode number",
          body: "A closed pipe has only odd harmonics, so its 9th harmonic is only its 5th mode. It has 5 nodes, not 9.",
        },
        {
          title: "What sits at the ends",
          body: "The fixed ends of a string are nodes, the open ends of a pipe are antinodes, and the closed end of a pipe is a node. Count the ends before counting the rest.",
        },
        {
          title: "Count the end nodes of a string",
          body: "A string in its nth harmonic has n + 1 nodes, because both fixed ends are nodes. Its fundamental has 2 nodes and 1 antinode.",
        },
      ],
    },
  ],
};
