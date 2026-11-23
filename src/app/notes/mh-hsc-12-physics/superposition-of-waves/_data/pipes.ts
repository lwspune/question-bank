import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_PIPES_NOTE: SubtopicNote = {
  subtopicName: "Vibrations of Air Columns",
  title: "Vibrations of Air Columns: Closed and Open Pipes",
  oneLineDefinition:
    "Stationary sound waves in a pipe: why a pipe closed at one end gives only odd harmonics, why a pipe open at both ends gives all of them, and how to compare the two.",
  whyItMatters:
    "15 questions. Six were set in board papers: show that a closed pipe gives only odd harmonics (2018) and an open pipe all harmonics (2019, 2020, 2026), the frequency of a closed pipe with two nodes (2024), and the ratio of the lengths of a closed and an open pipe in unison (2016). The textbook adds fundamental and overtone frequencies, the fundamental from three given overtones, pipes with equal overtones and the proof that a closed and an open pipe of the same length share no mode.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpsw-closed-pipe",
      name: "Pipe closed at one end",
      intuition:
        "At the closed end the air cannot move, so there is always a node. At the open end the air moves most freely, so there is always an antinode. A node at one end and an antinode at the other means the air column holds an odd number of quarter wavelengths, and that rules out every even harmonic.",
      definition:
        "- Closed end: node; open end: antinode. Corrected length \\(L = l + e\\).\n" +
        "- **Fundamental:** \\(L = \\dfrac{\\lambda}{4}\\), so \\(n = \\dfrac{v}{4L}\\).\n" +
        "- **First overtone:** \\(L = \\dfrac{3\\lambda_1}{4}\\), so \\(n_1 = \\dfrac{3v}{4L} = 3n\\).\n" +
        "- **Second overtone:** \\(L = \\dfrac{5\\lambda_2}{4}\\), so \\(n_2 = \\dfrac{5v}{4L} = 5n\\).\n" +
        "- In general the p-th overtone is \\(n_p = (2p + 1)n\\), with \\(p = 0, 1, 2, \\dots\\) So the frequencies are \\(n, 3n, 5n, \\dots\\): only odd harmonics are present.\n" +
        "- The closed end is itself a node, so the fundamental has one node, the first overtone two and the second overtone three.\n" +
        "- Draw the air column for each mode with N and A marked; the board gives marks for these diagrams.",
      formula: {
        label: "Closed pipe",
        latex: "n = \\frac{v}{4L}, \\qquad n_p = (2p + 1)\\,n, \\qquad L = l + e",
      },
      authoredExample: {
        prompt:
          "A pipe closed at one end is 25 cm long. Taking the speed of sound as 340 m/s and neglecting the end correction, find its fundamental frequency and its first two overtones.",
        steps: [
          "Given: \\(L = 25\\) cm \\(= 0.25\\) m, \\(v = 340\\) m/s.",
          "Formula: \\(n = \\dfrac{v}{4L} = \\dfrac{340}{4 \\times 0.25} = 340\\) Hz.",
          "First overtone: \\(3n = 1020\\) Hz. Second overtone: \\(5n = 1700\\) Hz.",
        ],
        answer: "340 Hz, 1020 Hz and 1700 Hz",
      },
      selfCheckExample: {
        prompt: "The second overtone of a pipe closed at one end is 1500 Hz. Find its fundamental frequency.",
        steps: ["The second overtone of a closed pipe is the fifth harmonic, 5n.", "\\(n = \\dfrac{1500}{5} = 300\\) Hz."],
        answer: "300 Hz",
      },
      practiceSet: [
        { prompt: "Which harmonics are missing from the sound of a pipe closed at one end?", answer: "The even harmonics (2n, 4n, ...)" },
        { prompt: "A pipe closed at one end has two consecutive overtones at 750 Hz and 1050 Hz. Find its fundamental.", answer: "They differ by 2n = 300 Hz, so n = 150 Hz" },
        { prompt: "Write the length of the air column of a closed pipe in its fundamental mode, in terms of \\(\\lambda\\).", answer: "\\(\\dfrac{\\lambda}{4}\\)" },
      ],
      pyqExampleId: "f4a95f7d-96a5-4f66-b3ee-befef41de51b",
      traps: [
        {
          title: "Giving a closed pipe an even harmonic",
          body: "A closed pipe can never sound 2n or 4n. If an answer for a closed pipe comes out an even multiple of the fundamental, the mode is wrong.",
        },
        {
          title: "Forgetting that the closed end is a node",
          body: "Count the closed end among the nodes. A closed pipe with two nodes is in its first overtone, 3n, not its second.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-open-pipe",
      name: "Pipe open at both ends",
      intuition:
        "Both ends are open, so both are antinodes. Between two antinodes the air column must hold a whole number of half wavelengths, and every whole number is allowed. So every harmonic is present.",
      definition:
        "- Both ends: antinodes. Corrected length \\(L = l + 2e\\).\n" +
        "- **Fundamental:** one node in the middle, \\(L = \\dfrac{\\lambda}{2}\\), so \\(n = \\dfrac{v}{2L}\\).\n" +
        "- **First overtone:** two nodes, \\(L = \\lambda_1\\), so \\(n_1 = \\dfrac{v}{L} = 2n\\).\n" +
        "- **Second overtone:** three nodes, \\(L = \\dfrac{3\\lambda_2}{2}\\), so \\(n_2 = \\dfrac{3v}{2L} = 3n\\).\n" +
        "- In general \\(n_p = (p + 1)n\\), with \\(p = 0, 1, 2, \\dots\\) So the frequencies are in the ratio \\(1 : 2 : 3 : \\dots\\) and all harmonics, even and odd, are present.",
      formula: {
        label: "Open pipe",
        latex: "n = \\frac{v}{2L}, \\qquad n_p = (p + 1)\\,n, \\qquad L = l + 2e",
      },
      authoredExample: {
        prompt:
          "A pipe open at both ends is 34 cm long. Taking the speed of sound as 340 m/s and neglecting the end corrections, find its fundamental frequency and the frequency of its third overtone.",
        steps: [
          "Given: \\(L = 34\\) cm \\(= 0.34\\) m, \\(v = 340\\) m/s.",
          "Formula: \\(n = \\dfrac{v}{2L} = \\dfrac{340}{2 \\times 0.34} = 500\\) Hz.",
          "Third overtone: \\(n_3 = (3 + 1)n = 4 \\times 500 = 2000\\) Hz.",
        ],
        answer: "500 Hz and 2000 Hz",
      },
      selfCheckExample: {
        prompt: "A pipe open at both ends has a fundamental frequency of 400 Hz where sound travels at 320 m/s. Find its length, neglecting end corrections.",
        steps: ["\\(L = \\dfrac{v}{2n} = \\dfrac{320}{2 \\times 400} = 0.4\\) m."],
        answer: "0.4 m (40 cm)",
      },
      practiceSet: [
        { prompt: "Is there a node or an antinode at each end of a pipe open at both ends?", answer: "An antinode" },
        { prompt: "The first overtone of a pipe open at both ends is 600 Hz. What is its fundamental?", answer: "300 Hz" },
        { prompt: "Give the ratio of the frequencies of the first three modes of a pipe open at both ends.", answer: "1 : 2 : 3" },
      ],
      pyqExampleId: "6a11541e-f209-495c-98cd-81b94f1895e4",
      traps: [
        {
          title: "Using v/4L for an open pipe",
          body: "\\(\\dfrac{v}{4L}\\) belongs to a closed pipe. An open pipe holds half a wavelength in its fundamental, so \\(n = \\dfrac{v}{2L}\\).",
        },
        {
          title: "Showing only the fundamental",
          body: "To 'show that all harmonics are present' you must work at least the fundamental and two overtones, then write the general result \\(n_p = (p + 1)n\\) and the ratio \\(1 : 2 : 3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-pipes-compared",
      name: "Comparing a closed and an open pipe",
      intuition:
        "When a closed and an open pipe are compared, write each pipe's frequency from its own formula and only then set them equal. For the same length, a closed pipe's fundamental is half an open pipe's, because it holds a quarter wavelength instead of a half.",
      definition:
        "- Same length L: closed pipe \\(n_c = \\dfrac{v}{4L}\\), open pipe \\(n_o = \\dfrac{v}{2L}\\), so \\(n_o = 2n_c\\).\n" +
        "- A closed pipe and an open pipe have the same fundamental when the open pipe is twice as long.\n" +
        "- For 'in unison' or 'same overtone' questions: write the required mode of each pipe (closed: \\((2p + 1)\\dfrac{v}{4L_c}\\); open: \\((p + 1)\\dfrac{v}{2L_o}\\)), equate, and solve for the lengths.\n" +
        "- A closed and an open pipe of the same length never share a mode (Solved Ex. 6.5): \\(\\lambda_c = \\dfrac{4L}{2p + 1}\\) and \\(\\lambda_o = \\dfrac{2L}{m + 1}\\) would need \\(2(m + 1) = 2p + 1\\), an even number equal to an odd one.",
      formula: {
        label: "Equal frequencies",
        latex: "(2p + 1)\\frac{v}{4L_c} = (m + 1)\\frac{v}{2L_o}",
      },
      authoredExample: {
        prompt:
          "A pipe closed at one end is 20 cm long and a pipe open at both ends is 40 cm long. Sound travels at 320 m/s. Show that they have the same fundamental frequency, and say which of them can also sound 800 Hz. Neglect end corrections.",
        steps: [
          "Closed pipe: \\(n_c = \\dfrac{v}{4L_c} = \\dfrac{320}{4 \\times 0.2} = 400\\) Hz.",
          "Open pipe: \\(n_o = \\dfrac{v}{2L_o} = \\dfrac{320}{2 \\times 0.4} = 400\\) Hz. The fundamentals are equal.",
          "Open pipe frequencies: 400, 800, 1200 Hz, ... Closed pipe frequencies: 400, 1200, 2000 Hz, ...",
          "800 Hz is twice the fundamental, an even harmonic, so only the open pipe can sound it.",
        ],
        answer: "Both 400 Hz; only the open pipe can sound 800 Hz",
      },
      selfCheckExample: {
        prompt: "A pipe open at both ends has a fundamental of 300 Hz. What is the fundamental of a pipe closed at one end of the same length?",
        steps: ["Same length: \\(n_c = \\dfrac{v}{4L} = \\dfrac{1}{2} \\times \\dfrac{v}{2L}\\)."],
        answer: "150 Hz",
      },
      practiceSet: [
        { prompt: "Can a closed pipe and an open pipe of the same length sound a note of the same frequency?", answer: "No: no mode of one matches a mode of the other" },
        { prompt: "The fundamental of a pipe closed at one end is 250 Hz. List the first three frequencies it can produce.", answer: "250, 750 and 1250 Hz" },
        { prompt: "The fundamental of a pipe open at both ends is 250 Hz. List the first three frequencies it can produce.", answer: "250, 500 and 750 Hz" },
      ],
      pyqExampleId: "5b83ab7a-faf7-41e4-afd9-00afd49f088a",
      traps: [
        {
          title: "Equating the wrong modes",
          body: "Turn the overtone number into a harmonic for each pipe first. The first overtone of a closed pipe is \\(3\\dfrac{v}{4L}\\); of an open pipe, \\(2\\dfrac{v}{2L}\\).",
        },
        {
          title: "A ratio with no labels",
          body: "Write which pipe is which, for example 'closed : open = 3 : 2'. A bare ratio such as 2 : 3 cannot be marked right.",
        },
      ],
    },
  ],
};
