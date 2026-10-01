import type { SubtopicNote } from "@/app/notes/_types";

export const PIPES_WAVE_NOTE: SubtopicNote = {
  subtopicName: "Organ Pipes and the Resonance Tube",
  title: "Organ Pipes and the Resonance Tube",
  oneLineDefinition:
    "An open pipe has antinodes at both ends and every harmonic nv/2L; a closed pipe has a node at the closed end and only odd harmonics (2n − 1)v/4L.",
  whyItMatters:
    "Fifteen PYQs, nine of them asking for a number, and two from 2026. Eleven compare harmonics and overtones of open and closed pipes, often of two pipes sounding the same note or a pipe being part-filled with water. Four are resonance-tube experiments, where the end correction moves every length. Nearly all of them come down to knowing which harmonics each pipe allows.",
  concepts: [
    // C1 — harmonics of strings, open pipes and closed pipes
    {
      kind: "reference" as const,
      slug: "jpwave-pipe-harmonics",
      name: "Harmonics and overtones of open and closed pipes",
      intuition:
        "An open end lets the air move freely, so it is an antinode; a closed end stops the air, so it is a node. A pipe open at both ends behaves like a string fixed at both ends: all harmonics. A pipe closed at one end fits only odd quarter-wavelengths, so its even harmonics are missing and its overtones skip numbers.",
      definition:
        "- **Open pipe**: \\(f_n = \\dfrac{nv}{2L}\\), n = 1, 2, 3, …; the kth overtone is the (k + 1)th harmonic.\n" +
        "- **Closed pipe**: \\(f = \\dfrac{(2n - 1)v}{4L}\\); only odd harmonics 1, 3, 5, …; the kth overtone is the (2k + 1)th harmonic.\n" +
        "- Resonances in the ratio 1 : 3 : 5 mark a closed pipe; 1 : 2 : 3 marks an open pipe or a string.\n" +
        "- Two pipes in unison: set the two frequency expressions equal; v cancels when both hold the same gas.\n" +
        "- Different gases with the same bulk modulus: \\(v = \\sqrt{B/\\rho}\\), so \\(v \\propto 1/\\sqrt{\\rho}\\).\n" +
        "- Pouring water into a closed pipe shortens its air column, which raises every frequency.",
      table: {
        columns: ["Vibrating system", "Fundamental", "Harmonics present", "First overtone", "kth overtone"],
        rows: [
          { cells: ["String fixed at both ends", "\\(v/2L\\) (\\(\\lambda = 2L\\))", "All: 1, 2, 3, …", "2nd harmonic, \\(2f_1\\)", "(k + 1)th harmonic"] },
          { cells: ["Pipe open at both ends", "\\(v/2L\\) (\\(\\lambda = 2L\\))", "All: 1, 2, 3, …", "2nd harmonic, \\(2f_1\\)", "(k + 1)th harmonic"] },
          {
            cells: ["Pipe closed at one end", "\\(v/4L\\) (\\(\\lambda = 4L\\))", "Odd only: 1, 3, 5, …", "3rd harmonic, \\(3f_1\\)", "(2k + 1)th harmonic"],
            noteAmber: "A closed pipe has no 2nd harmonic, so its first overtone is three times the fundamental.",
          },
        ],
        caption: "A closed pipe of length L has the same fundamental as an open pipe of length 2L.",
      },
      selfCheckExample: {
        prompt:
          "A pipe closed at one end is 85 cm long, and sound travels at \\(340\\ \\text{m/s}\\). Find its fundamental frequency and the frequency of its second overtone.",
        steps: [
          "\\(f_1 = \\dfrac{v}{4L} = \\dfrac{340}{4 \\times 0.85} = 100\\ \\text{Hz}\\).",
          "Second overtone of a closed pipe = 5th harmonic: \\(5 \\times 100 = 500\\ \\text{Hz}\\).",
        ],
        answer: "100 Hz and 500 Hz",
      },
      practiceSet: [
        { prompt: "An open pipe 50 cm long, \\(v = 340\\ \\text{m/s}\\). Its third harmonic?", answer: "1020 Hz" },
        { prompt: "A pipe's first three resonances are in the ratio 1 : 3 : 5. Open or closed?", answer: "Closed at one end" },
        { prompt: "A closed pipe is filled with water to one third of its length. The fundamental frequency changes by?", answer: "+50%", method: "Length becomes 2L/3, so f becomes 3f/2" },
        { prompt: "A closed pipe 24 cm long has the same fundamental as an open pipe. The open pipe's length?", answer: "48 cm" },
      ],
      pyqExampleId: "ece13554-8d5c-4412-a197-28e68c4f073e", // 8 Apr 2024: seventh overtones of a closed and an open pipe
      traps: [
        {
          title: "Overtone number is not harmonic number",
          body: "The first overtone is the first frequency above the fundamental. In an open pipe that is the 2nd harmonic; in a closed pipe it is the 3rd, because the 2nd does not exist.",
        },
        {
          title: "Water makes the closed pipe shorter",
          body: "Water poured into a closed pipe takes the place of air, so the vibrating column is shorter and the note is higher. Use the new air-column length, not the full pipe.",
        },
      ],
    },

    // C2 — the resonance tube and end correction
    {
      kind: "formula" as const,
      slug: "jpwave-resonance-tube",
      name: "Resonance tube and end correction",
      intuition:
        "A resonance tube is a closed pipe whose length you change by moving the water level. It resonates with a fork when the air column fits λ/4, then 3λ/4, then 5λ/4. The antinode sits a little outside the open end, so the effective length is the column plus an end correction e. Subtracting two resonance lengths cancels e.",
      definition:
        "- Resonances: \\(l_1 + e = \\dfrac{\\lambda}{4}\\), \\(l_2 + e = \\dfrac{3\\lambda}{4}\\), \\(l_3 + e = \\dfrac{5\\lambda}{4}\\).\n" +
        "- \\(l_2 - l_1 = \\dfrac{\\lambda}{2}\\), so \\(v = 2f(l_2 - l_1)\\) with no end correction needed.\n" +
        "- End correction: \\(e = \\dfrac{l_2 - 3l_1}{2}\\), or \\(e = 0.3d\\) for a tube of inner diameter d.\n" +
        "- Without end correction, the shortest closed pipe for a fork of frequency f is \\(\\dfrac{\\lambda}{4} = \\dfrac{v}{4f}\\).\n" +
        "- With a fixed fork, raising the water level skips from one resonance to the next shorter one: the column shortens by \\(\\lambda/2\\).",
      formula: {
        label: "Resonance tube",
        latex: "l_n + e = \\frac{(2n - 1)\\lambda}{4} \\qquad l_2 - l_1 = \\frac{\\lambda}{2} \\qquad e = 0.3d",
      },
      authoredExample: {
        prompt:
          "With a 480 Hz fork, a resonance tube gives its first two resonances at 16.6 cm and 52.6 cm. Find the wavelength, the speed of sound, the end correction and the length for the third resonance.",
        steps: [
          "\\(l_2 - l_1 = \\dfrac{\\lambda}{2} = 36\\ \\text{cm}\\), so \\(\\lambda = 72\\ \\text{cm}\\).",
          "\\(v = f\\lambda = 480 \\times 0.72 = 345.6\\ \\text{m/s}\\).",
          "\\(e = \\dfrac{\\lambda}{4} - l_1 = 18 - 16.6 = 1.4\\ \\text{cm}\\).",
          "\\(l_3 = \\dfrac{5\\lambda}{4} - e = 90 - 1.4 = 88.6\\ \\text{cm}\\).",
        ],
        answer: "72 cm, \\(345.6\\ \\text{m/s}\\), 1.4 cm, 88.6 cm",
      },
      selfCheckExample: {
        prompt:
          "A resonance tube has an inner diameter of 4 cm. A 500 Hz fork is used and sound travels at \\(340\\ \\text{m/s}\\). Find the shortest air column that resonates.",
        steps: [
          "\\(\\lambda = \\dfrac{340}{500} = 0.68\\ \\text{m}\\), so \\(\\lambda/4 = 17\\ \\text{cm}\\).",
          "\\(e = 0.3 \\times 4 = 1.2\\ \\text{cm}\\), so \\(l_1 = 17 - 1.2 = 15.8\\ \\text{cm}\\).",
        ],
        answer: "15.8 cm",
      },
      practiceSet: [
        { prompt: "Shortest closed pipe to resonate with a 425 Hz fork, \\(v = 340\\ \\text{m/s}\\), no end correction?", answer: "20 cm" },
        { prompt: "Successive resonance lengths are 24 cm and 72 cm. The wavelength?", answer: "96 cm" },
        { prompt: "End correction of a tube 5 cm in diameter?", answer: "1.5 cm" },
        { prompt: "With \\(\\lambda = 80\\ \\text{cm}\\), a 100 cm air column resonates. By how much must the water rise for the next resonance?", answer: "40 cm", method: "100 cm is \\(5\\lambda/4\\); the next is \\(3\\lambda/4 = 60\\ \\text{cm}\\)" },
      ],
      pyqExampleId: "af3322ae-b86e-41b1-b21f-69f17eb92663", // 29 Jun 2022: first resonance gives e, find the third resonance length
      traps: [
        {
          title: "The end correction is added, not subtracted, to the column",
          body: "The antinode is just outside the open end, so the effective length is l + e. The measured column is therefore shorter than λ/4 by e.",
        },
        {
          title: "Use the difference to get the speed",
          body: "v = 2f(l₂ − l₁) needs no end correction. Using v = 4f l₁ instead ignores e and gives a speed that is too low.",
        },
        {
          title: "0.3 times the diameter, not the radius",
          body: "The end correction is 0.3d, which is 0.6r. Using the radius in 0.3d halves the correction.",
        },
      ],
    },
  ],
};
