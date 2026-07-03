import type { SubtopicNote } from "@/app/notes/_types";

export const HYDROGEN_SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Hydrogen Spectrum and Rydberg Equation",
  title: "Hydrogen Spectrum and the Rydberg Equation",
  oneLineDefinition:
    "When an excited electron in a hydrogen atom falls to a lower orbit it emits a photon of a definite wavelength; the Rydberg equation gives the wavenumber of every such line, and the lines group into named series (Lyman, Balmer, Paschen, and so on) by the orbit they land on.",
  whyItMatters:
    "This is one of the most dependable scoring blocks in MHT-CET Structure of Atom. Most PYQs are one-step plug-ins into the Rydberg equation to get a line's wavenumber, plus a straight recall of which series lands where (Balmer is visible, Lyman is UV). " +
    "Learn the Rydberg formula with the fraction ordering fixed, memorise the five series and their regions, and every question here becomes an on-sight tick.",
  concepts: [
    // Rydberg equation — wavenumber of a line
    {
      kind: "formula" as const,
      slug: "cetsoa-hspec-rydberg",
      name: "Rydberg equation — wavenumber of a spectral line",
      intuition:
        "An electron sitting in an outer orbit is unstable; when it drops to a lower orbit it dumps the energy difference as one photon. The Rydberg equation converts the two orbit numbers straight into the photon's wavenumber (lines per centimetre). " +
        "The one rule that fixes every calculation: put the SMALLER orbit number as n1 (the first, positive fraction) and the LARGER as n2, so the bracket stays positive.",
      definition:
        "The Rydberg equation for a hydrogen-like line:\n" +
        "- Wavenumber \\(\\bar{\\nu} = \\dfrac{1}{\\lambda} = R_H\\, Z^2\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\), with \\(n_1 < n_2\\).\n" +
        "- For hydrogen \\(Z = 1\\), so \\(\\bar{\\nu} = R_H\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\).\n" +
        "- \\(R_H\\) is the **Rydberg constant**: \\(1.097\\times 10^{7}\\ \\text{m}^{-1}\\), i.e. \\(109677\\ \\text{cm}^{-1}\\) (MHT-CET papers almost always give it in \\(\\text{cm}^{-1}\\)).\n" +
        "- **Wavenumber** \\(\\bar{\\nu}\\) has units of \\(\\text{cm}^{-1}\\) (or \\(\\text{m}^{-1}\\)); the **wavelength** is its reciprocal, \\(\\lambda = 1/\\bar{\\nu}\\).\n" +
        "- \\(n_1\\) is always the **lower** orbit (the one the electron falls TO); \\(n_2\\) is the **upper** orbit (the one it falls FROM).",
      formula: {
        label: "Rydberg equation",
        latex:
          "\\bar{\\nu} = \\dfrac{1}{\\lambda} = R_H\\, Z^2\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right) \\qquad (n_1 < n_2)",
        symbols: [
          { symbol: "\\bar{\\nu}", meaning: "wavenumber of the line (cm^-1 or m^-1)" },
          { symbol: "\\lambda", meaning: "wavelength of the line" },
          { symbol: "R_H", meaning: "Rydberg constant = 1.097 x 10^7 m^-1 = 109677 cm^-1" },
          { symbol: "Z", meaning: "atomic number (Z = 1 for hydrogen)" },
          { symbol: "n_1", meaning: "lower orbit (fallen TO), the larger positive fraction" },
          { symbol: "n_2", meaning: "upper orbit (fallen FROM)" },
        ],
      },
      pyqExampleId: "33376d8e-519b-4c96-8863-a4435337f1a3", // wavenumber n=5 -> n=2, 23032 cm^-1
      authoredExample: {
        prompt:
          "Find the wavenumber of the line emitted when an electron in a hydrogen atom falls from n = 4 to n = 2. (RH = 109677 cm^-1)",
        steps: [
          "The lower orbit is \\(n_1 = 2\\) and the upper is \\(n_2 = 4\\).",
          "\\(\\bar{\\nu} = R_H\\left(\\dfrac{1}{2^2} - \\dfrac{1}{4^2}\\right) = 109677\\left(\\dfrac{1}{4} - \\dfrac{1}{16}\\right)\\).",
          "\\(\\dfrac{1}{4} - \\dfrac{1}{16} = \\dfrac{4 - 1}{16} = \\dfrac{3}{16}\\).",
          "\\(\\bar{\\nu} = 109677 \\times \\dfrac{3}{16} = 109677 \\times 0.1875\\).",
        ],
        answer: "\\(\\bar{\\nu} \\approx 20564\\ \\text{cm}^{-1}\\).",
      },
      selfCheckExample: {
        prompt:
          "Calculate the wavenumber of the photon emitted when the electron drops from n = 3 to n = 1 in a hydrogen atom. (RH = 109677 cm^-1)",
        steps: [
          "Lower orbit \\(n_1 = 1\\), upper orbit \\(n_2 = 3\\).",
          "\\(\\bar{\\nu} = 109677\\left(\\dfrac{1}{1^2} - \\dfrac{1}{3^2}\\right) = 109677\\left(1 - \\dfrac{1}{9}\\right)\\).",
          "\\(1 - \\dfrac{1}{9} = \\dfrac{8}{9}\\), so \\(\\bar{\\nu} = 109677 \\times \\dfrac{8}{9}\\).",
        ],
        answer: "\\(\\bar{\\nu} \\approx 97491\\ \\text{cm}^{-1}\\).",
      },
      practiceSet: [
        {
          prompt: "Wavenumber of the n = 3 to n = 2 line in hydrogen? (RH = 109677 cm^-1)",
          answer: "\\(\\approx 15233\\ \\text{cm}^{-1}\\)",
          method: "\\(R_H\\left(\\tfrac{1}{4} - \\tfrac{1}{9}\\right) = R_H \\times \\tfrac{5}{36}\\)",
        },
        {
          prompt: "Wavenumber of the n = 2 to n = 1 line? (RH = 109677 cm^-1)",
          answer: "\\(82258\\ \\text{cm}^{-1}\\)",
          method: "\\(R_H\\left(1 - \\tfrac{1}{4}\\right) = \\tfrac{3R_H}{4}\\)",
        },
        {
          prompt: "In the Rydberg equation, which orbit number is n1 for a fall from n = 6 to n = 3?",
          answer: "\\(n_1 = 3\\) (the lower orbit)",
        },
        {
          prompt: "Value of the Rydberg constant in cm^-1?",
          answer: "\\(109677\\ \\text{cm}^{-1}\\) (\\(= 1.097 \\times 10^7\\ \\text{m}^{-1}\\))",
        },
      ],
      traps: [
        {
          title: "n1 is the smaller orbit — keep the bracket positive",
          body:
            "\\(\\bar{\\nu} = R_H\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{n_2^2}\\right)\\) with \\(n_1 < n_2\\). For a fall from \\(n = 5\\) to \\(n = 2\\), use \\(n_1 = 2, n_2 = 5\\) — NOT the reverse. Swapping them flips the sign and gives a negative (wrong) wavenumber.",
        },
        {
          title: "Wavenumber and wavelength are reciprocals",
          body:
            "\\(\\bar{\\nu} = 1/\\lambda\\). If a question asks for the **wavelength**, compute \\(\\bar{\\nu}\\) first, then take its reciprocal. Reporting \\(\\bar{\\nu}\\) as the wavelength (or vice versa) is a classic careless slip.",
        },
      ],
    },

    // Spectral series — reference table
    {
      kind: "reference" as const,
      slug: "cetsoa-hspec-series",
      name: "The spectral series of hydrogen",
      intuition:
        "Every line for which the electron lands on the SAME final orbit belongs to one named series. Falls to n = 1 make the Lyman series, falls to n = 2 make the Balmer series, and so on. " +
        "The single most-tested fact: Balmer (to n = 2) is the only series in the VISIBLE region; Lyman (to n = 1) is ultraviolet; everything landing on n = 3 or higher is infrared.",
      definition:
        "Each series is named by its lower orbit \\(n_1\\) (the orbit the electron falls to):\n" +
        "- **Lyman** — \\(n_1 = 1\\), **ultraviolet (UV)**.\n" +
        "- **Balmer** — \\(n_1 = 2\\), **visible** (the only visible series).\n" +
        "- **Paschen** — \\(n_1 = 3\\), **infrared (IR)**.\n" +
        "- **Brackett** — \\(n_1 = 4\\), infrared.\n" +
        "- **Pfund** — \\(n_1 = 5\\), infrared.",
      table: {
        columns: ["Series", "Falls to (n1)", "From (n2)", "Region"],
        rows: [
          {
            cells: ["Lyman", "1", "2, 3, 4, ...", "Ultraviolet (UV)"],
            noteAmber: "MHT-CET 2024 — the series for a jump from n2 = infinity to n1 = 1 is the Lyman series.",
            pyqExampleId: "8c623195-4200-4729-980e-fe7a0d8db13d",
          },
          {
            cells: ["Balmer", "2", "3, 4, 5, ...", "Visible"],
            noteAmber: "MHT-CET 2023 + 2021 — Balmer is the ONLY series in the visible region.",
            pyqExampleId: "527f3d77-e807-48d6-8b45-ba3d1a496c43",
          },
          { cells: ["Paschen", "3", "4, 5, 6, ...", "Infrared (IR)"] },
          { cells: ["Brackett", "4", "5, 6, 7, ...", "Infrared (IR)"] },
          { cells: ["Pfund", "5", "6, 7, 8, ...", "Infrared (IR)"] },
        ],
        caption:
          "Memory aid: La-Ba-Pa-Bra-Pf for n1 = 1, 2, 3, 4, 5. Only Balmer (n1 = 2) is visible; Lyman is UV; the rest are IR.",
      },
      pyqExampleId: "9d5a49f5-be1a-44d4-98e0-c296a5b2de91", // which series is visible -> Balmer
      selfCheckExample: {
        prompt:
          "An electron jumps from n = infinity to n = 1 in a hydrogen atom. Which spectral series does the emitted line belong to, and in which region does it lie?",
        steps: [
          "The series is named by the orbit the electron falls TO, i.e. \\(n_1 = 1\\).",
          "The series landing on \\(n_1 = 1\\) is the Lyman series.",
          "Lyman lines lie in the ultraviolet region.",
        ],
        answer: "Lyman series, in the ultraviolet (UV) region.",
      },
      practiceSet: [
        { prompt: "Which hydrogen series lies in the visible region?", answer: "Balmer series (n1 = 2)" },
        { prompt: "Which series lands on n = 1 and lies in the UV?", answer: "Lyman series" },
        { prompt: "The Paschen series corresponds to falls to which orbit?", answer: "n1 = 3 (infrared region)" },
        { prompt: "Name the series for transitions ending at n = 5.", answer: "Pfund series (infrared)" },
      ],
      traps: [
        {
          title: "Balmer is visible, Lyman is not",
          body:
            "The visible series is **Balmer** (falls to n = 2). Lyman (falls to n = 1) is **ultraviolet**. A large share of MHT-CET marks are lost by picking Lyman for the 'visible region' question.",
        },
        {
          title: "The series is named by the LOWER orbit, not the upper one",
          body:
            "A jump 'from n = 4 to n = 2' is a **Balmer** line, because it lands on \\(n_1 = 2\\). Don't name a series by the starting (upper) orbit — always look at where the electron finishes.",
        },
      ],
    },

    // Limiting lines / series limit + number of lines
    {
      kind: "formula" as const,
      slug: "cetsoa-hspec-limiting-lines",
      name: "Longest wavelength, series limit, and number of spectral lines",
      intuition:
        "Within one series the transition with the smallest energy gap gives the LONGEST wavelength (the first line, from the very next orbit); the transition from n2 = infinity gives the SHORTEST wavelength — the series limit. " +
        "Separately, if an electron is excited to orbit n and can cascade down in every possible way, the total number of distinct lines emitted is a fixed count, n(n-1)/2.",
      definition:
        "Two recurring sub-results:\n" +
        "- **Longest wavelength (first line) of a series**: smallest gap, so \\(n_2 = n_1 + 1\\). Its wavenumber is \\(\\bar{\\nu} = R_H\\left(\\dfrac{1}{n_1^2} - \\dfrac{1}{(n_1+1)^2}\\right)\\), and \\(\\lambda_{\\max} = 1/\\bar{\\nu}\\).\n" +
        "- **Series limit (shortest wavelength)**: \\(n_2 = \\infty\\), so \\(\\dfrac{1}{n_2^2} \\to 0\\) and \\(\\bar{\\nu}_{\\max} = \\dfrac{R_H}{n_1^2}\\).\n" +
        "- **Number of spectral lines** when an electron de-excites from orbit \\(n\\) down to the ground state (all possible jumps): \\(\\dfrac{n(n-1)}{2}\\).",
      formula: {
        label: "Number of spectral lines from orbit n",
        latex: "\\text{No. of lines} = \\dfrac{n(n-1)}{2}",
        symbols: [
          { symbol: "n", meaning: "highest orbit the electron is excited to" },
        ],
      },
      pyqExampleId: "9d9419db-9b0d-4157-b6b0-eef28b416e51", // longest wavelength Lyman -> 1.216 x 10^-5 cm
      authoredExample: {
        prompt:
          "Calculate the longest wavelength line of the Balmer series of hydrogen. (RH = 109677 cm^-1)",
        steps: [
          "Longest wavelength = smallest energy gap = the first line, \\(n_2 = n_1 + 1\\).",
          "For Balmer \\(n_1 = 2\\), so the first line is \\(n_2 = 3 \\to n_1 = 2\\).",
          "\\(\\bar{\\nu} = 109677\\left(\\dfrac{1}{2^2} - \\dfrac{1}{3^2}\\right) = 109677\\left(\\dfrac{1}{4} - \\dfrac{1}{9}\\right) = 109677 \\times \\dfrac{5}{36} \\approx 15233\\ \\text{cm}^{-1}\\).",
          "\\(\\lambda = \\dfrac{1}{\\bar{\\nu}} = \\dfrac{1}{15233}\\ \\text{cm}\\).",
        ],
        answer: "\\(\\lambda \\approx 6.565 \\times 10^{-5}\\ \\text{cm}\\) (about 656 nm, the red H-alpha line).",
      },
      selfCheckExample: {
        prompt:
          "An electron in a hydrogen atom is excited to the n = 4 orbit. How many spectral lines can be emitted as it returns to the ground state?",
        steps: [
          "Use the count of all possible downward jumps: \\(\\dfrac{n(n-1)}{2}\\).",
          "Here \\(n = 4\\), so \\(\\dfrac{4 \\times 3}{2}\\).",
        ],
        answer: "\\(6\\) spectral lines.",
      },
      practiceSet: [
        {
          prompt: "Series limit (shortest-wavelength) wavenumber of the Lyman series?",
          answer: "\\(R_H = 109677\\ \\text{cm}^{-1}\\)",
          method: "\\(n_2 = \\infty\\): \\(\\bar{\\nu} = R_H/1^2\\)",
        },
        {
          prompt: "Number of spectral lines emitted from the n = 5 orbit to the ground state?",
          answer: "10",
          method: "\\(\\tfrac{5 \\times 4}{2}\\)",
        },
        {
          prompt: "Within a series, which transition gives the longest wavelength?",
          answer: "The one with the smallest energy gap: n2 = n1 + 1 (the first line)",
        },
        {
          prompt: "Series limit of the Balmer series (wavenumber)?",
          answer: "\\(R_H/4 = 27419\\ \\text{cm}^{-1}\\)",
          method: "\\(n_1 = 2,\\ n_2 = \\infty\\): \\(\\bar{\\nu} = R_H/2^2\\)",
        },
      ],
      traps: [
        {
          title: "Longest wavelength = smallest gap, not the biggest jump",
          body:
            "The **longest** wavelength corresponds to the **least** energy, i.e. the closest pair of orbits (\\(n_2 = n_1 + 1\\)). Students often plug in \\(n_2 = \\infty\\) — that gives the SHORTEST wavelength (the series limit), the exact opposite.",
        },
        {
          title: "n(n-1)/2 counts every downward jump",
          body:
            "The formula \\(\\dfrac{n(n-1)}{2}\\) is the number of distinct lines when the electron can cascade down in ALL possible ways from orbit \\(n\\). For \\(n = 4\\) that is 6, not 3.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Atomic models — Dalton, Rutherford, Bohr",
      href: "/notes/nda-chemistry/atomic-structure",
    },
  ],
};
