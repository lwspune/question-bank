import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_SPECTRA_NOTE: SubtopicNote = {
  subtopicName: "Atomic Spectra",
  title: "The Hydrogen Spectrum and its Series",
  oneLineDefinition:
    "Why hydrogen gives a line spectrum, Bohr's formula for the wavelengths of its lines, the energy level diagram with the Lyman, Balmer, Paschen, Brackett and Pfund series, and how to find first lines and series limits.",
  whyItMatters:
    "15 questions. Ten were set in board papers from 2017 to 2026: draw the energy level diagram and explain two series (2017, 2018), derive the formula for the wavelengths of the spectral lines (2019, 2024), name the visible or the ultraviolet series (2020, 2026), and calculate first lines and series limits (2022, 2024, 2025, 2026). The textbook adds the first three Paschen lines, the transition with the longest wavelength and a proof about limiting frequencies.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpan-spectral-formula",
      name: "Bohr's formula for the spectral lines",
      intuition:
        "Heated hydrogen does not glow in all colours. It gives out only a few sharp wavelengths, a line spectrum. Bohr's third postulate explains why: light comes out only when the electron drops from one allowed orbit to a lower one, and each drop has its own fixed energy gap. Put the orbit energies into \\(h\\nu = E_m - E_n\\) and the wavelength of every line drops out, with one constant in front, Rydberg's constant.",
      definition:
        "**Derivation** (electron falls from orbit m to orbit n, m > n):\n" +
        "- Energy of the nth orbit: \\(E_n = -\\dfrac{m_e Z^2 e^4}{8\\varepsilon_0^2 h^2 n^2}\\).\n" +
        "- Third postulate: \\(h\\nu = E_m - E_n = \\dfrac{m_e Z^2 e^4}{8\\varepsilon_0^2 h^2}\\left(\\dfrac{1}{n^2} - \\dfrac{1}{m^2}\\right)\\).\n" +
        "- Put \\(\\nu = c/\\lambda\\): \\(\\dfrac{1}{\\lambda} = \\dfrac{m_e Z^2 e^4}{8c\\,\\varepsilon_0^2 h^3}\\left(\\dfrac{1}{n^2} - \\dfrac{1}{m^2}\\right)\\).\n" +
        "- Define **Rydberg's constant** \\(R_H = \\dfrac{m_e e^4}{8c\\,\\varepsilon_0^2 h^3} = 1.097 \\times 10^7\\ \\text{m}^{-1}\\).\n" +
        "- So \\(\\dfrac{1}{\\lambda} = R_H Z^2\\left(\\dfrac{1}{n^2} - \\dfrac{1}{m^2}\\right)\\); for hydrogen Z = 1.\n" +
        "- \\(1/\\lambda\\) is the **wave number** (unit m⁻¹). Each fixed n gives one series, with m = n + 1, n + 2, ...\n" +
        "- The wavelengths of each element's lines are unique, so an element can be identified from its spectrum. Rutherford's model could not explain line spectra at all.",
      formula: {
        label: "Wavelengths of the spectral lines",
        latex: "\\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n^2} - \\frac{1}{m^2}\\right), \\qquad R_H = \\frac{m_e e^4}{8c\\,\\varepsilon_0^2 h^3}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the lower orbit the electron falls to (fixed for a series)" },
          { symbol: "\\(m\\)", meaning: "the higher orbit it falls from, m greater than n" },
          { symbol: "\\(R_H\\)", meaning: "Rydberg's constant, 1.097 × 10⁷ m⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "Using \\(E_n = -13.6/n^2\\) eV, find the energy and the wavelength of the photon emitted when the electron of a hydrogen atom falls from n = 4 to n = 2. (\\(h = 6.63 \\times 10^{-34}\\) J s, \\(c = 3 \\times 10^8\\) m/s, 1 eV = \\(1.6 \\times 10^{-19}\\) J)",
        steps: [
          "Given: \\(E_4 = -13.6/16 = -0.85\\) eV, \\(E_2 = -13.6/4 = -3.4\\) eV.",
          "Formula: \\(h\\nu = E_4 - E_2\\) and \\(\\lambda = \\dfrac{hc}{h\\nu}\\).",
          "Photon energy: \\(-0.85 - (-3.4) = 2.55\\) eV \\(= 2.55 \\times 1.6 \\times 10^{-19} = 4.08 \\times 10^{-19}\\) J.",
          "\\(\\lambda = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{4.08 \\times 10^{-19}} = 4.875 \\times 10^{-7}\\) m.",
        ],
        answer: "2.55 eV; \\(4.875 \\times 10^{-7}\\) m (about 488 nm: the 486 nm Balmer line, as 13.6 eV is rounded)",
      },
      selfCheckExample: {
        prompt: "A hydrogen atom emits a photon of energy 10.2 eV. Between which two levels did its electron jump? (\\(E_n = -13.6/n^2\\) eV)",
        steps: ["\\(E_2 - E_1 = -3.4 - (-13.6) = 10.2\\) eV.", "So the electron fell from n = 2 to n = 1."],
        answer: "From n = 2 to n = 1 (the first Lyman line)",
      },
      practiceSet: [
        { prompt: "What is the SI unit of Rydberg's constant?", answer: "m⁻¹ (per metre)" },
        { prompt: "Which of Bohr's postulates gives \\(h\\nu = E_m - E_n\\)?", answer: "The third postulate" },
        { prompt: "For a hydrogen-like ion of atomic number Z, by what factor is the wave number of each line multiplied compared with hydrogen?", answer: "\\(Z^2\\)" },
      ],
      pyqExampleId: "99374de7-ba19-407c-b5f7-d0932ec9cc72",
      traps: [
        {
          title: "Using one letter m for two things",
          body: "The derivation has a mass and an orbit number. Write the mass as \\(m_e\\) and keep m for the orbit, or the final formula will not make sense to the examiner.",
        },
        {
          title: "Stopping at the frequency",
          body: "The question asks for the wavelength. After \\(h\\nu = E_m - E_n\\), put \\(\\nu = c/\\lambda\\) and name \\(R_H\\) with its value 1.097 × 10⁷ m⁻¹.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpan-series",
      name: "The series and the energy level diagram",
      intuition:
        "Group the lines by the orbit the electron lands on. All jumps that end on n = 1 form one family, the Lyman series; all that end on n = 2 form the Balmer series, and so on. Jumps into n = 1 are the biggest, so Lyman photons carry the most energy and lie in the ultraviolet. Jumps into n = 3 and above are small, so those series lie in the infrared. Only the Balmer series falls in the visible range.",
      definition:
        "**Drawing the energy level diagram:**\n" +
        "- Draw horizontal lines for n = 1, 2, 3, 4, 5, ... against a vertical energy axis in eV: \\(-13.6, -3.4, -1.51, -0.85, -0.54\\) eV. Draw n = ∞ at 0 eV.\n" +
        "- The lines crowd closer together as n increases, reaching the limit zero at n = ∞.\n" +
        "- Show each line of the spectrum as a downward arrow from the higher level to the lower one (a photon is emitted when the electron falls).\n" +
        "- Group and label the arrows by the level they end on: Lyman (n = 1), Balmer (n = 2), Paschen (n = 3), Brackett (n = 4), Pfund (n = 5).\n" +
        "- In each series the lines get closer together towards shorter wavelengths and reach a limiting value, the **series limit**.\n" +
        "- Visible hydrogen lines (Balmer): 656, 486, 434 and 410 nm.",
      table: {
        columns: ["Series", "Electron falls to", "Falls from", "Region"],
        rows: [
          {
            cells: ["Lyman", "n = 1", "m = 2, 3, 4, ...", "Ultraviolet"],
            pyqExampleId: "8b810c6f-6969-4cc8-86c0-a0f8d86a457b",
            noteAmber: "Board 2026 asked which series lies in the ultraviolet.",
          },
          {
            cells: ["Balmer", "n = 2", "m = 3, 4, 5, ...", "Visible"],
            pyqExampleId: "601ae87f-f5a7-43dc-844d-7e583cd21057",
            noteAmber: "Board 2020 asked you to name the visible series.",
          },
          {
            cells: ["Paschen", "n = 3", "m = 4, 5, 6, ...", "Infrared"],
            pyqExampleId: "feb304e6-e69c-4b0b-91bb-d775222f7c51",
            noteAmber: "Board 2017 asked for the energy level diagram and the series ending on n = 3 and n = 4.",
          },
          {
            cells: ["Brackett", "n = 4", "m = 5, 6, 7, ...", "Infrared"],
            pyqExampleId: "73aec3c2-a41d-4d96-a0f4-d30308f495cb",
            noteAmber: "Board 2018 asked for the diagram with the Balmer and Brackett series.",
          },
          { cells: ["Pfund", "n = 5", "m = 6, 7, 8, ...", "Infrared"] },
        ],
      },
      practiceSet: [
        { prompt: "In which region of the spectrum does the Paschen series of hydrogen lie?", answer: "Infrared" },
        { prompt: "Which transition in hydrogen gives the longer wavelength: n = 3 to n = 2, or n = 4 to n = 2?", answer: "n = 3 to n = 2 (the smaller energy gap)" },
        { prompt: "To which orbit does the electron fall in the Brackett series?", answer: "n = 4" },
      ],
      traps: [
        {
          title: "Arrows pointing upwards",
          body: "An upward arrow means a photon is absorbed. For the emission series the arrows go down, from the higher level to the lower.",
        },
        {
          title: "A diagram with no values",
          body: "Label every level with its n and its energy in eV, and label each group of arrows with the series name. An unlabelled ladder of lines earns little.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-wavelengths",
      name: "First lines, series limits and their wavelengths",
      intuition:
        "Inside one series the smallest jump is from the next orbit up, n + 1. It carries the least energy, so it is the longest wavelength: the first line. The biggest jump comes from far away, m = ∞. It carries the most energy, so it is the shortest wavelength: the series limit. Since the limit is \\(n^2/R_H\\), every series limit is just n² times the Lyman limit.",
      definition:
        "- **First line** (longest wavelength): \\(m = n + 1\\), \\(\\dfrac{1}{\\lambda} = R_H\\left(\\dfrac{1}{n^2} - \\dfrac{1}{(n+1)^2}\\right)\\).\n" +
        "- **Series limit** (shortest wavelength): \\(m \\to \\infty\\), \\(\\lambda = \\dfrac{n^2}{R_H}\\).\n" +
        "- Lyman limit \\(1/R_H = 911.6\\) Å. The others are \\(n^2\\) times it: Balmer 3646 Å, Paschen 8204 Å, Brackett 14586 Å.\n" +
        "- Limits of two series stand in the ratio of \\(n^2\\): Paschen to Balmer is 9 : 4.\n" +
        "- Frequency \\(\\nu = c/\\lambda\\): a series limit has \\(\\nu = R_H c/n^2\\). The first Lyman line's frequency equals the Lyman limit's frequency minus the Balmer limit's: \\(R_H c(1 - \\tfrac{1}{4})\\).\n" +
        "- 1 Å = \\(10^{-10}\\) m, 1 nm = \\(10^{-9}\\) m.",
      formula: {
        label: "Series limit and first line",
        latex: "\\lambda_{\\text{limit}} = \\frac{n^2}{R_H}, \\qquad \\frac{1}{\\lambda_{\\text{first}}} = R_H\\left(\\frac{1}{n^2} - \\frac{1}{(n+1)^2}\\right)",
      },
      authoredExample: {
        prompt:
          "Find the wavelength of the third line of the Balmer series of hydrogen. (\\(R_H = 1.097 \\times 10^7\\) m⁻¹)",
        steps: [
          "Given: Balmer series, n = 2. The third line comes from m = 5.",
          "Formula: \\(\\dfrac{1}{\\lambda} = R_H\\left(\\dfrac{1}{2^2} - \\dfrac{1}{5^2}\\right) = R_H \\times \\dfrac{21}{100}\\).",
          "Substitution: \\(\\lambda = \\dfrac{100}{21 \\times 1.097 \\times 10^7}\\).",
          "\\(\\lambda = 4.341 \\times 10^{-7}\\) m = 4341 Å, the 434 nm line of the visible spectrum.",
        ],
        answer: "\\(4.341 \\times 10^{-7}\\) m (4341 Å)",
      },
      selfCheckExample: {
        prompt: "The series limit of the Lyman series of hydrogen is 911.6 Å. Find the series limit of the Pfund series.",
        steps: ["Pfund: n = 5, and each limit is \\(n^2\\) times the Lyman limit.", "\\(25 \\times 911.6 = 22790\\) Å."],
        answer: "22790 Å",
      },
      practiceSet: [
        { prompt: "What is the ratio of the series limits of the Paschen and Balmer series of hydrogen?", answer: "9 : 4" },
        { prompt: "Which line of a spectral series has the longest wavelength?", answer: "The first line (from m = n + 1)" },
        { prompt: "Write the frequency of the Balmer series limit in terms of \\(R_H\\) and c.", answer: "\\(R_H c/4\\)" },
      ],
      pyqExampleId: "3d8667ee-7795-450e-a5b3-84438554d14f",
      traps: [
        {
          title: "Calling the series limit the longest wavelength",
          body: "The limit comes from \\(m \\to \\infty\\), the biggest jump, so it has the most energy and the **shortest** wavelength. The first line is the longest.",
        },
        {
          title: "Using n = 1 for every series",
          body: "Only the Lyman series ends on n = 1. Read the series name first: Balmer n = 2, Paschen n = 3, Brackett n = 4.",
        },
      ],
    },
  ],
};
