import type { SubtopicNote } from "@/app/notes/_types";

export const SPECTRA_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Spectral Series and Wavelength Ratios",
  title: "Spectral Series and Wavelength Ratios",
  oneLineDefinition:
    "Each hydrogen series is every jump down to one fixed lower level; 1/λ = RZ²(1/n_f² − 1/n_i²) gives every line, and the ratio of two lines needs only the brackets.",
  whyItMatters:
    "Twenty-three PYQs, thirteen of them multiple choice, and three from 2026. Eleven are about the series as a whole: which region a series lies in, its longest line and its limit, often scaled from one given wavelength, and one asks you to name lines on an energy-level diagram. Twelve take the ratio of two lines: two lines of one series, lines from two series, two frequencies in one ion, a line against its own series limit, or three levels whose lines combine.",
  concepts: [
    // C1 — the series, their longest lines and limits (reference)
    {
      kind: "reference" as const,
      slug: "jpatom-series-limits",
      name: "Hydrogen spectral series, first lines and series limits",
      intuition:
        "Fix the lower level and let the upper level run up the ladder: that family of lines is a series. The first line comes from the next level up, the smallest jump, so it has the least energy and the LONGEST wavelength. The series limit comes from n = ∞, the biggest jump into that level, so it has the SHORTEST wavelength. Every wavelength is a simple fraction times 1/R, so one given wavelength fixes all the others.",
      definition:
        "- **Rydberg formula:** \\(\\dfrac{1}{\\lambda} = RZ^2\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\), with \\(R = 1.097 \\times 10^{7}\\ \\text{m}^{-1}\\) and \\(1/R \\approx 91.2\\) nm.\n" +
        "- **First member** (longest λ): \\(n_f + 1 \\to n_f\\).\n" +
        "- **Series limit** (shortest λ): \\(\\infty \\to n_f\\), \\(\\dfrac{1}{\\lambda} = \\dfrac{R}{n_f^2}\\), so \\(\\lambda = \\dfrac{n_f^2}{R}\\).\n" +
        "- **The kth member** counts up from the longest line: it comes from \\(n_f + k\\). The third Balmer member is 5 → 2.\n" +
        "- **Scaling from one given line:** write the given wavelength as a multiple of 1/R, find 1/R, then build the line you need.",
      table: {
        columns: ["Series", "Lower level", "Region", "Longest line (first member)", "Shortest line (series limit)"],
        rows: [
          { cells: ["Lyman", "1", "Ultraviolet", "2 → 1: \\(4/3R\\), about 122 nm", "∞ → 1: \\(1/R\\), about 91 nm"] },
          {
            cells: ["Balmer", "2", "Visible", "3 → 2: \\(36/5R\\), about 656 nm", "∞ → 2: \\(4/R\\), about 365 nm"],
            noteAmber: "Balmer's first lines are visible, but its limit, 365 nm, is just into the ultraviolet.",
          },
          { cells: ["Paschen", "3", "Infrared", "4 → 3: \\(144/7R\\), about 1875 nm", "∞ → 3: \\(9/R\\), about 820 nm"] },
          { cells: ["Brackett", "4", "Infrared", "5 → 4: \\(400/9R\\), about 4050 nm", "∞ → 4: \\(16/R\\), about 1458 nm"] },
          { cells: ["Pfund", "5", "Far infrared", "6 → 5: \\(900/11R\\), about 7460 nm", "∞ → 5: \\(25/R\\), about 2280 nm"] },
        ],
        caption: "For a hydrogen-like ion divide every wavelength by Z².",
      },
      selfCheckExample: {
        prompt:
          "The shortest wavelength of the Balmer series of hydrogen is 365 nm. Find the longest wavelength of the Lyman series.",
        steps: [
          "The Balmer limit is \\(4/R\\), so \\(1/R = 365/4 = 91.25\\) nm.",
          "The longest Lyman line is \\(\\dfrac{4}{3R} = \\dfrac{4}{3} \\times 91.25 \\approx 121.7\\) nm.",
        ],
        answer: "About 121.7 nm",
      },
      practiceSet: [
        { prompt: "Which hydrogen series lies wholly in the ultraviolet?", answer: "Lyman" },
        { prompt: "Wavelength of the Brackett series limit, in terms of R?", answer: "\\(16/R\\)" },
        { prompt: "Which jump gives the third member of the Brackett series?", answer: "7 → 4" },
        { prompt: "Ratio of the longest to the shortest wavelength in the Balmer series?", answer: "9 : 5" },
      ],
      pyqExampleId: "83d3601a-aaae-44f7-b0e4-e4a012319e34", // 2026: Lyman limit 91 nm, Paschen longest minus Balmer longest
      traps: [
        {
          title: "The series limit is the shortest wavelength",
          body: "The limit comes from n = ∞, the biggest jump into that level, so it carries the most energy and the shortest wavelength. The first member is the longest.",
        },
        {
          title: "Each series has its own lower level",
          body: "Only Lyman ends on n = 1. The Balmer limit is 4/R, not 1/R, and the Paschen limit is 9/R. Fix n_f from the series name before substituting.",
        },
        {
          title: "Count members up from the longest line",
          body: "The first Balmer member is 3 → 2, the second 4 → 2, the third 5 → 2. Counting down from the series limit gives the wrong jump.",
        },
      ],
    },

    // C2 — ratios of two lines
    {
      kind: "formula" as const,
      slug: "jpatom-line-ratios",
      name: "Ratios of two spectral lines",
      intuition:
        "Write the Rydberg formula for each line and divide. R cancels, and Z cancels too when both lines come from one ion. What is left is a ratio of two brackets. Energy, frequency and photon momentum are all proportional to the bracket, so their ratio is the bracket ratio. Wavelength is its inverse, so the wavelength ratio is the bracket ratio turned upside down.",
      definition:
        "- \\(E\\), \\(\\nu\\) and \\(p = h/\\lambda\\) are all proportional to \\(Z^2\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\); λ is proportional to its inverse.\n" +
        "- **Brackets to know:** 2 → 1: \\(\\tfrac{3}{4}\\); 3 → 1: \\(\\tfrac{8}{9}\\); 4 → 1: \\(\\tfrac{15}{16}\\); 3 → 2: \\(\\tfrac{5}{36}\\); 4 → 2: \\(\\tfrac{3}{16}\\); 4 → 3: \\(\\tfrac{7}{144}\\).\n" +
        "- **A line against its own series limit:** divide its bracket by \\(\\dfrac{1}{n_f^2}\\).\n" +
        "- **Three levels A, B, C (A highest):** energies add, \\(E_{AC} = E_{AB} + E_{BC}\\), so \\(\\dfrac{1}{\\lambda_{AC}} = \\dfrac{1}{\\lambda_{AB}} + \\dfrac{1}{\\lambda_{BC}}\\).\n" +
        "- **Same jump in two ions:** \\(\\lambda \\propto \\dfrac{1}{Z^2}\\).",
      formula: {
        label: "Rydberg formula and combining lines",
        latex: "\\frac{1}{\\lambda} = RZ^2\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right), \\qquad \\frac{1}{\\lambda_{AC}} = \\frac{1}{\\lambda_{AB}} + \\frac{1}{\\lambda_{BC}}",
      },
      authoredExample: {
        prompt:
          "In hydrogen, the 4 → 3 line has wavelength λ₀. Find the wavelength of the 3 → 1 line in terms of λ₀, and the ratio of their frequencies.",
        steps: [
          "Brackets: 4 → 3 gives \\(\\dfrac{1}{9} - \\dfrac{1}{16} = \\dfrac{7}{144}\\); 3 → 1 gives \\(1 - \\dfrac{1}{9} = \\dfrac{8}{9} = \\dfrac{128}{144}\\).",
          "Wavelength is the inverse: \\(\\lambda_{3\\to1} = \\dfrac{7}{128}\\lambda_0\\).",
          "Frequency follows the bracket: \\(\\dfrac{\\nu_{3\\to1}}{\\nu_{4\\to3}} = \\dfrac{128}{7}\\).",
        ],
        answer: "\\(\\lambda = \\dfrac{7}{128}\\lambda_0\\); frequency ratio 128 : 7.",
      },
      selfCheckExample: {
        prompt:
          "An atom has three levels A, B and C, with A the highest. The A → B jump emits light of 500 nm and the B → C jump emits 250 nm. What wavelength does the A → C jump emit?",
        steps: [
          "Energies add, so \\(\\dfrac{1}{\\lambda_{AC}} = \\dfrac{1}{500} + \\dfrac{1}{250} = \\dfrac{3}{500}\\ \\text{nm}^{-1}\\).",
          "\\(\\lambda_{AC} = \\dfrac{500}{3} \\approx 167\\) nm.",
        ],
        answer: "About 167 nm",
      },
      practiceSet: [
        { prompt: "Ratio of the frequencies of the 4 → 1 and 2 → 1 lines in one hydrogen-like ion?", answer: "5 : 4" },
        { prompt: "The 2 → 1 jump in He⁺ and in hydrogen: ratio of wavelengths, He⁺ to H?", answer: "1 : 4" },
        { prompt: "Energy of the 4 → 3 photon in hydrogen as a fraction of the Paschen series limit?", answer: "7/16" },
        { prompt: "Ratio of photon momenta for the 5 → 3 and 4 → 3 lines of hydrogen?", answer: "256 : 175" },
      ],
      pyqExampleId: "117cd44f-0853-42f4-b6df-eb87f7f8cfff", // 2022: Paschen 3rd minus Balmer 2nd in units of Lyman 1st
      traps: [
        {
          title: "Turn the bracket ratio upside down for wavelength",
          body: "The bracket is 1/λ. A larger bracket means a shorter wavelength, so the wavelength ratio is the inverse of the bracket ratio. Energy, frequency and momentum ratios are not inverted.",
        },
        {
          title: "Energies add; wavelengths do not",
          body: "For levels A > B > C, E_AC = E_AB + E_BC. Adding the wavelengths instead gives a longer wavelength for the bigger jump, which is impossible.",
        },
        {
          title: "Z cancels only within one ion",
          body: "Two lines of the same ion share Z², so it cancels. The same jump in two different ions scales as Z², and forgetting it is off by a factor of 4 or 9.",
        },
      ],
    },
  ],
};
