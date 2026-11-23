import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_SW_HARMONICS_NOTE: SubtopicNote = {
  subtopicName: "Harmonics, Overtones and End Correction",
  title: "Harmonics, Overtones and End Correction",
  oneLineDefinition:
    "The natural frequencies of a string or an air column: the fundamental, harmonics and overtones and how they differ, and the end correction that makes an air column vibrate as if it were a little longer than its pipe.",
  whyItMatters:
    "5 questions. Four were set in board papers: explain or distinguish harmonics and overtones (2022, 2025, 2026) and obtain an expression for the end correction of an open and a closed pipe from two resonating lengths (2025). The textbook adds the same harmonics and overtones question in brief.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpsw-harmonics-overtones",
      name: "Harmonics and overtones",
      intuition:
        "A string or an air column, once disturbed, can vibrate only at certain natural frequencies, because its ends must be nodes or antinodes. The lowest of these is the fundamental. Harmonics are a list you can write down from the fundamental alone; overtones are what the system actually produces above the fundamental. The two lists match for a string but not for a closed pipe.",
      definition:
        "- **Fundamental frequency:** the lowest natural frequency of the system. It is also called the **first harmonic**.\n" +
        "- **Harmonics:** frequencies that are integral multiples of the fundamental: \\(n, 2n, 3n, \\dots\\) The p-th harmonic has frequency \\(pn\\).\n" +
        "- **Overtones:** frequencies higher than the fundamental that are actually present in the sound, numbered in increasing order.\n" +
        "- String fixed at both ends, and pipe open at both ends: all harmonics are present, so the first overtone is the second harmonic.\n" +
        "- Pipe closed at one end: only odd harmonics are present, so the first overtone is the third harmonic.",
      table: {
        columns: ["Point", "Harmonics", "Overtones"],
        rows: [
          {
            cells: ["Meaning", "Integral multiples of the fundamental frequency", "Frequencies above the fundamental that are actually produced"],
            noteAmber: "Board 2026 asked for two points of difference; 2022 and 2025 asked you to explain the two.",
          },
          { cells: ["Where the count starts", "The fundamental itself is the first harmonic", "The first frequency above the fundamental is the first overtone"] },
          { cells: ["Which ones occur", "The whole set n, 2n, 3n is fixed by the fundamental", "Depends on the system: all harmonics for a string or an open pipe, odd ones only for a closed pipe"] },
          { cells: ["Closed pipe example", "n, 2n, 3n, 4n, 5n are its first five harmonics", "Its first overtone is 3n, the third harmonic"] },
        ],
      },
      selfCheckExample: {
        prompt: "A pipe closed at one end has a fundamental frequency of 200 Hz. Find its first and second overtones.",
        steps: ["Only odd harmonics occur: 200, 600, 1000 Hz, ...", "First overtone = third harmonic; second overtone = fifth harmonic."],
        answer: "600 Hz and 1000 Hz",
      },
      practiceSet: [
        { prompt: "What is the fundamental frequency also called?", answer: "The first harmonic" },
        { prompt: "A string has a fundamental frequency of 150 Hz. What is its third harmonic?", answer: "450 Hz" },
        { prompt: "For a string fixed at both ends, the first overtone is which harmonic?", answer: "The second harmonic" },
      ],
      pyqExampleId: "9583c3eb-70e1-4cde-abea-350c6745669b",
      traps: [
        {
          title: "Numbering overtones like harmonics",
          body: "The fundamental is the first harmonic but not an overtone. So the first overtone is never the first harmonic; for a string it is the second.",
        },
        {
          title: "Closed pipe's first overtone",
          body: "A closed pipe has no even harmonics, so its first overtone is the third harmonic, 3n, not 2n.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpsw-end-correction",
      name: "End correction",
      intuition:
        "At an open end the air just outside the pipe also takes part in the vibration, so the antinode forms a little beyond the end rather than exactly at it. The vibrating air column is therefore a little longer than the pipe. That extra length is the end correction, and it must be added once for each open end.",
      definition:
        "- **End correction e:** the distance of the antinode beyond the open end of a pipe. It is found to be \\(e = 0.3d\\), where d is the inner diameter of the pipe.\n" +
        "- Corrected length: closed pipe \\(L = l + e\\); open pipe \\(L = l + 2e\\).\n" +
        "- **Closed pipe, two resonating lengths with one fork:** fundamental \\(l_1 + e = \\dfrac{\\lambda}{4}\\); first overtone \\(l_2 + e = \\dfrac{3\\lambda}{4}\\). So \\(l_2 + e = 3(l_1 + e)\\), giving \\(e = \\dfrac{l_2 - 3l_1}{2}\\).\n" +
        "- **Open pipe, two resonating lengths with one fork:** fundamental \\(l_1 + 2e = \\dfrac{\\lambda}{2}\\); first overtone \\(l_2 + 2e = \\lambda\\). So \\(l_2 + 2e = 2(l_1 + 2e)\\), giving \\(e = \\dfrac{l_2 - 2l_1}{2}\\).\n" +
        "- The same fork is used for both lengths, so \\(\\lambda\\) is the same in both equations; that is why the two can be equated.",
      formula: {
        label: "End correction",
        latex: "e = 0.3\\,d, \\qquad e = \\frac{l_2 - 3l_1}{2}\\ (\\text{closed}), \\qquad e = \\frac{l_2 - 2l_1}{2}\\ (\\text{open})",
      },
      authoredExample: {
        prompt:
          "A pipe closed at one end resonates with a tuning fork when the air column is 16 cm long (fundamental) and again at 50 cm (first overtone). Find the end correction, the wavelength and, if sound travels at 340 m/s, the frequency of the fork.",
        steps: [
          "Given: \\(l_1 = 16\\) cm, \\(l_2 = 50\\) cm, \\(v = 340\\) m/s.",
          "Formula: \\(e = \\dfrac{l_2 - 3l_1}{2} = \\dfrac{50 - 48}{2} = 1\\) cm.",
          "\\(\\lambda = 4(l_1 + e) = 4 \\times 17 = 68\\) cm \\(= 0.68\\) m. Check: \\(\\dfrac{3\\lambda}{4} = 51\\) cm \\(= l_2 + e\\).",
          "\\(n = \\dfrac{v}{\\lambda} = \\dfrac{340}{0.68} = 500\\) Hz.",
        ],
        answer: "e = 1 cm, λ = 68 cm, fork frequency 500 Hz",
      },
      selfCheckExample: {
        prompt: "A pipe open at both ends is 50 cm long and has an inner diameter of 4 cm. Find its end correction and the corrected length of its air column.",
        steps: ["\\(e = 0.3d = 0.3 \\times 4 = 1.2\\) cm.", "Open at both ends: \\(L = l + 2e = 50 + 2.4 = 52.4\\) cm."],
        answer: "e = 1.2 cm; L = 52.4 cm",
      },
      practiceSet: [
        { prompt: "Where does the antinode at the open end of a pipe actually form?", answer: "Slightly outside the open end" },
        { prompt: "Write the corrected length of a pipe of length l closed at one end, with end correction e.", answer: "l + e" },
        { prompt: "An open pipe has an end correction of 0.6 cm at each end. By how much is its vibrating air column longer than the pipe?", answer: "1.2 cm" },
      ],
      pyqExampleId: "fb0e3d49-55f1-427a-993d-be9563ec079e",
      traps: [
        {
          title: "Adding e once for an open pipe",
          body: "An open pipe has two open ends, so its correction is 2e. A closed pipe has one open end and takes e.",
        },
        {
          title: "Mixing the two results",
          body: "The closed pipe result has \\(3l_1\\) (first overtone is the third harmonic); the open pipe result has \\(2l_1\\). Derive each from its own pair of equations rather than recalling one and guessing the other.",
        },
      ],
    },
  ],
};
