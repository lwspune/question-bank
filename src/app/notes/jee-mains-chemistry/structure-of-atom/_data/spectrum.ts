import type { SubtopicNote } from "@/app/notes/_types";

export const SPECTRUM_ATOM_NOTE: SubtopicNote = {
  subtopicName: "Hydrogen Spectrum and Spectral Series",
  title: "Hydrogen Spectrum and Spectral Series",
  oneLineDefinition:
    "When the electron of a hydrogen-like species drops between orbits it emits one line; the Rydberg equation gives each line's wavenumber, and the lines group into series by the orbit they land on.",
  whyItMatters:
    "Eighteen PYQs, thirteen of them multiple choice, and eight from 2026 — the page most tilted to recent papers. Ten use the Rydberg equation with Z² to find a line's energy, wavenumber or wavelength, or to compare two lines; eight name a series and its region, count lines, or test line spectra and Moseley's law. Two ideas cover the page.",
  concepts: [
    // C1 — Rydberg equation with Z^2
    {
      kind: "formula" as const,
      slug: "jcatom-rydberg",
      name: "Rydberg equation for hydrogen-like species",
      intuition:
        "A line's energy is the gap between two Bohr levels. Since \\(E_n\\propto Z^2/n^2\\), the wavenumber is \\(RZ^2\\) times the difference of \\(1/n^2\\) for the two levels. Most questions compare two lines, so \\(R\\) cancels and only the brackets matter. Two lines from different species match when \\(Z^2\\) times the bracket is the same.",
      definition:
        "- \\(\\bar\\nu=\\dfrac{1}{\\lambda}=RZ^2\\left(\\dfrac{1}{n_1^2}-\\dfrac{1}{n_2^2}\\right)\\), \\(n_1<n_2\\).\n" +
        "- \\(R=1.097\\times10^{7}\\ \\mathrm{m^{-1}}=109677\\ \\mathrm{cm^{-1}}\\).\n" +
        "- Energy of the line: \\(E=hc\\bar\\nu\\), so \\(E\\propto\\bar\\nu\\propto1/\\lambda\\).\n" +
        "- The **k-th line** of a series with lower level \\(n_1\\) comes from \\(n_2=n_1+k\\).\n" +
        "- The **first line** has the lowest energy and the longest wavelength. The **series limit** (\\(n_2=\\infty\\)) has the highest energy and the shortest wavelength.",
      formula: {
        label: "Rydberg equation",
        latex: "\\bar\\nu=RZ^2\\left(\\frac{1}{n_1^2}-\\frac{1}{n_2^2}\\right)",
      },
      authoredExample: {
        prompt: "Find the ratio of the wavelength of the first Lyman line to that of the first Balmer line of hydrogen.",
        steps: [
          "First Lyman line, \\(2\\to1\\): \\(\\bar\\nu_L=R\\left(1-\\dfrac14\\right)=\\dfrac{3R}{4}\\).",
          "First Balmer line, \\(3\\to2\\): \\(\\bar\\nu_B=R\\left(\\dfrac14-\\dfrac19\\right)=\\dfrac{5R}{36}\\).",
          "Wavelength is the inverse of wavenumber: \\(\\dfrac{\\lambda_L}{\\lambda_B}=\\dfrac{\\bar\\nu_B}{\\bar\\nu_L}=\\dfrac{5/36}{3/4}=\\dfrac{5}{27}\\).",
        ],
        answer: "\\(5:27\\).",
      },
      selfCheckExample: {
        prompt: "Which line of hydrogen has the same wavelength as the \\(6\\to4\\) line of \\(\\mathrm{He^+}\\)?",
        steps: [
          "\\(\\mathrm{He^+}\\): \\(Z^2\\left(\\dfrac{1}{16}-\\dfrac{1}{36}\\right)=4\\times\\dfrac{20}{576}=\\dfrac{5}{36}\\).",
          "Hydrogen needs \\(\\dfrac{1}{n_1^2}-\\dfrac{1}{n_2^2}=\\dfrac{5}{36}=\\dfrac14-\\dfrac19\\).",
        ],
        answer: "The \\(3\\to2\\) line (first Balmer line).",
      },
      practiceSet: [
        { prompt: "Wavenumber of the H line \\(4\\to2\\), in terms of \\(R\\)?", answer: "\\(\\dfrac{3R}{16}\\)" },
        { prompt: "Wavenumber of the Lyman series limit of H?", answer: "\\(109677\\ \\mathrm{cm^{-1}}\\) (\\(\\lambda\\approx91.2\\ \\mathrm{nm}\\))" },
        { prompt: "Which transition gives the longest-wavelength Paschen line?", answer: "\\(4\\to3\\)" },
        {
          prompt: "The H line \\(2\\to1\\) has energy \\(E\\). Energy of the \\(3\\to1\\) line?",
          answer: "\\(\\dfrac{32}{27}E\\)",
          method: "\\(\\dfrac{8/9}{3/4}\\)",
        },
      ],
      pyqExampleId: "1762cf1c-19b8-4910-ae77-780e334737c5", // 2026 — second Balmer line energy in terms of the first
      traps: [
        {
          title: "Count lines from the landing level",
          body: "The third Paschen line is \\(6\\to3\\), not \\(3\\to\\ldots\\) or \\(5\\to3\\). The k-th line of a series starts from \\(n_1+k\\).",
        },
        {
          title: "Longest wavelength is the first line",
          body: "The first line of a series has the smallest energy gap, so the longest wavelength. The shortest wavelength is the series limit, from \\(n_2=\\infty\\).",
        },
      ],
    },

    // C2 — series, regions, line counts, other spectra (reference)
    {
      kind: "reference" as const,
      slug: "jcatom-series-lines",
      name: "Spectral series, line counts and other spectra",
      intuition:
        "Lines that land on the same lower orbit form one series. Lyman lands on \\(n=1\\) and is ultraviolet; Balmer lands on \\(n=2\\) and is the only visible series; the rest are infrared. Many atoms together can show every possible drop, but a single electron takes one path down.",
      definition:
        "- Many atoms falling from \\(n_2\\) to \\(n_1\\): number of lines \\(=\\dfrac{\\Delta n(\\Delta n+1)}{2}\\), \\(\\Delta n=n_2-n_1\\). From \\(n\\) to the ground state this is \\(\\dfrac{n(n-1)}{2}\\).\n" +
        "- One electron falling from \\(n_2\\) to \\(n_1\\): at most \\(n_2-n_1\\) lines.\n" +
        "- An **emission** spectrum of a gas-phase atom has bright lines, not a continuous spread. An **absorption** spectrum is its photographic negative: dark lines on a bright background. Line spectra identify elements; helium was found in the sun this way.\n" +
        "- **Moseley's law**: \\(\\sqrt{\\nu}=a(Z-b)\\) for X-ray lines. \\(\\sqrt\\nu\\) against atomic **number** is a straight line. \\(\\nu\\) against \\(Z\\) is a parabola, and atomic mass gives no straight line.",
      table: {
        columns: ["Series", "Lands on (n₁)", "First line", "Series limit", "Region"],
        rows: [
          {
            cells: ["Lyman", "1", "2 → 1, about 122 nm", "∞ → 1, about 91 nm", "Ultraviolet"],
            pyqExampleId: "4ee7dedd-446e-4097-bb40-3253c7b54983",
          },
          { cells: ["Balmer", "2", "3 → 2, about 656 nm", "∞ → 2, about 365 nm", "Visible"] },
          {
            cells: ["Paschen", "3", "4 → 3, about 1875 nm", "∞ → 3, about 821 nm", "Infrared"],
            noteAmber: "With R rounded to 10⁵ cm⁻¹, the Paschen limit ∞ → 3 is 9/R = 900 nm, the infrared used for heat therapy.",
            pyqExampleId: "0e285775-f6ac-4d81-803e-46b9074a0939",
          },
          { cells: ["Brackett", "4", "5 → 4, about 4052 nm", "∞ → 4, about 1459 nm", "Infrared"] },
          { cells: ["Pfund", "5", "6 → 5, about 7460 nm", "∞ → 5, about 2280 nm", "Infrared"] },
        ],
        caption: "Wavelengths are for hydrogen, from \\(1/R=91.2\\ \\mathrm{nm}\\). For a hydrogen-like ion divide by \\(Z^2\\).",
      },
      selfCheckExample: {
        prompt:
          "Electrons in many \\(\\mathrm{He^+}\\) ions fall from \\(n=5\\) to \\(n=2\\). How many lines appear? How many could one electron give?",
        steps: [
          "\\(\\Delta n=5-2=3\\), so many ions give \\(\\dfrac{3\\times4}{2}=6\\) lines.",
          "One electron can stop at each level on the way: \\(5\\to4\\to3\\to2\\), at most 3 lines.",
        ],
        answer: "6 lines; at most 3 from one electron.",
      },
      practiceSet: [
        { prompt: "Lines from many H atoms falling from \\(n=4\\) to \\(n=1\\)?", answer: "6" },
        { prompt: "Which series of hydrogen lies in the visible region?", answer: "Balmer" },
        { prompt: "In Moseley's law, which plot is a straight line?", answer: "\\(\\sqrt\\nu\\) against atomic number \\(Z\\)" },
        { prompt: "What does an absorption spectrum look like?", answer: "Dark lines on a bright continuous background" },
      ],
      pyqExampleId: "28b8d9be-27b2-437e-8633-52805d3d1b00", // 2026 — pick the set of wavenumbers that are all Balmer lines
      traps: [
        {
          title: "One electron is not many atoms",
          body: "\\(\\dfrac{n(n-1)}{2}\\) counts every drop a large sample can make. A single electron cascading from \\(n=5\\) to the ground state gives at most 4 lines.",
        },
        {
          title: "Moseley used atomic number, not mass",
          body: "\\(\\sqrt\\nu\\) is linear in \\(Z\\). A statement that \\(\\sqrt\\nu\\) against atomic mass, or \\(\\nu\\) against \\(Z\\), is a straight line is false.",
        },
      ],
    },
  ],
};
