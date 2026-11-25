import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AT_SERIES_NOTE: SubtopicNote = {
  subtopicName: "Line Spectra of the Hydrogen Atom",
  title: "The Line Spectra of the Hydrogen Atom",
  oneLineDefinition:
    "The photon given out in a jump between two levels, the Lyman, Balmer and Paschen series, and the energy level diagram that shows them.",
  whyItMatters:
    "24 questions, twenty-two of them from board papers. The board asked the wavelength or frequency of the photon from a jump between two levels in every year from 2022 to 2026, a ratio of two wavelengths or frequencies (2022, 2023, 2025, 2026), a named line of a series (2023, 2024), which series a line belongs to and where it lies (2024, 2025, 2026) and the energy level diagram with the series marked (2022, 2023, 2024). One MCQ, the wavelength for 5 to 2 given the wavelength for 5 to 1, was set in 2023 and again in 2026.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpat-photon-transition",
      name: "The photon given out or taken in by a jump",
      intuition:
        "An electron falling from a higher level to a lower one throws out the difference as one photon. A big drop gives a high-energy photon of short wavelength; a small drop gives a long wavelength. To go up, the atom must take in a photon of exactly the right size.",
      definition:
        "- **Emission:** a jump from \\(n_i\\) down to \\(n_f\\) gives a photon with \\(h\\nu = E_{n_i} - E_{n_f}\\), so \\(\\lambda = \\dfrac{hc}{E_{n_i} - E_{n_f}}\\). Since n is a whole number, only certain frequencies come out: a line spectrum.\n" +
        "- **Absorption:** the atom takes in a photon only if its energy exactly equals the gap to a higher level.\n" +
        "- **Shortcut:** \\(hc \\approx 1240\\) eV nm, so \\(\\lambda\\) (in nm) \\(\\approx \\dfrac{1240}{\\Delta E\\ (\\text{in eV})}\\).\n" +
        "- The largest energy gap gives the shortest wavelength and the highest frequency.\n" +
        "- **Number of lines** a sample of atoms can give when their electrons start in level n: \\(\\dfrac{n(n - 1)}{2}\\). A single atom gives at most \\(n - 1\\) photons on its way down.\n" +
        "- At room temperature nearly all hydrogen atoms are in the ground state, so electrons fired at the gas must bring at least 10.2 eV to excite them.",
      formula: {
        label: "Photon from a jump between two levels",
        latex: "h\\nu = \\frac{hc}{\\lambda} = E_{n_i} - E_{n_f}, \\qquad E_n = -\\frac{13.6}{n^2}\\ \\text{eV}",
      },
      authoredExample: {
        prompt: "The electron of a hydrogen atom jumps from the n = 5 level (−0.544 eV) to the n = 4 level (−0.85 eV). Find the wavelength of the photon given out. Take \\(h = 6.63 \\times 10^{-34}\\) J s.",
        steps: [
          "Given: \\(E_5 = -0.544\\) eV, \\(E_4 = -0.85\\) eV.",
          "\\(\\Delta E = -0.544 - (-0.85) = 0.306\\) eV \\(= 0.306 \\times 1.6 \\times 10^{-19} = 4.90 \\times 10^{-20}\\) J.",
          "Formula: \\(\\lambda = \\dfrac{hc}{\\Delta E} = \\dfrac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{4.90 \\times 10^{-20}}\\).",
          "\\(\\lambda = 4.06 \\times 10^{-6}\\) m, in the infrared.",
        ],
        answer: "\\(\\lambda = 4.06 \\times 10^{-6}\\) m",
      },
      selfCheckExample: {
        prompt: "The electrons in a sample of hydrogen atoms are all raised to the n = 5 level. How many different spectral lines can the sample give out?",
        steps: ["Number of lines \\(= \\dfrac{n(n - 1)}{2}\\) with n = 5.", "\\(\\dfrac{5 \\times 4}{2} = 10\\)."],
        answer: "10 lines",
      },
      practiceSet: [
        { prompt: "Why does hydrogen give a line spectrum and not a continuous one?", answer: "n takes only whole-number values, so only certain energy gaps, and so only certain wavelengths, are possible" },
        { prompt: "Which jump in hydrogen gives the longer wavelength: 3 to 2 or 2 to 1?", answer: "3 to 2, the smaller energy gap" },
        { prompt: "Electrons of 11 eV strike hydrogen gas at room temperature. What is the highest level the atoms can reach?", answer: "n = 2 (reaching n = 3 needs 12.09 eV)" },
      ],
      pyqExampleId: "7e8b356b-f360-4865-8b2f-179810b812ac",
      traps: [
        {
          title: "Subtracting two negative energies",
          body: "\\(\\Delta E = E_i - E_f\\) for emission must come out positive. With two negative levels, write the brackets: \\(-0.85 - (-13.6) = +12.75\\) eV for the jump 4 to 1.",
        },
        {
          title: "eV left in the formula",
          body: "With h in J s, change ΔE to joules first (\\(\\times 1.6 \\times 10^{-19}\\)). Or use \\(\\lambda \\approx 1240/\\Delta E\\) nm with ΔE in eV. Mixing the two gives an answer wrong by \\(10^{19}\\).",
        },
        {
          title: "'Maximum number of lines' for one atom",
          body: "\\(n(n - 1)/2\\) counts every possible jump, which a sample of many atoms can show. One atom on its own gives at most \\(n - 1\\) photons. Answer the case the question asks.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpat-spectral-series",
      name: "The Lyman, Balmer and Paschen series",
      intuition:
        "Group the lines by the level the electron lands on. All the jumps that end on n = 1 form one family, the Lyman series; those ending on n = 2 form the Balmer series, the one you can see. Within a family, the smallest jump gives the longest wavelength and the lines bunch up towards a shortest one, the series limit.",
      definition:
        "- **Rydberg formula:** \\(\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)\\), with \\(R = 1.097 \\times 10^7\\) m⁻¹. It is the same as \\(h\\nu = E_{n_i} - E_{n_f}\\) with \\(E_n = -13.6/n^2\\) eV.\n" +
        "- **Lyman series:** ends on \\(n_f = 1\\), from \\(n_i = 2, 3, ...\\); ultraviolet.\n" +
        "- **Balmer series:** ends on \\(n_f = 2\\), from \\(n_i = 3, 4, ...\\); its first lines are visible (656 nm red, 486 nm, 434 nm, 410 nm).\n" +
        "- **Paschen series:** ends on \\(n_f = 3\\); infrared.\n" +
        "- **First line** of a series: \\(n_i = n_f + 1\\), the longest wavelength. The second line is \\(n_i = n_f + 2\\). **Series limit:** \\(n_i = \\infty\\), the shortest wavelength, \\(\\lambda = n_f^2/R\\).\n" +
        "- Towards the series limit the lines come closer together and grow weaker.\n" +
        "- **Ratio of the longest to the shortest wavelength** of a series: Lyman 4 : 3, Balmer 9 : 5, Paschen 16 : 7.\n" +
        "- The present NCERT book does not name these series or give the Rydberg formula, but the board asked them in every year from 2022 to 2026.",
      formula: {
        label: "Rydberg formula for hydrogen",
        latex: "\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right), \\qquad R = 1.097 \\times 10^{7}\\ \\text{m}^{-1}",
      },
      authoredExample: {
        prompt: "Find the wavelength of the first line of the Balmer series of hydrogen. Take \\(R = 1.097 \\times 10^7\\) m⁻¹.",
        steps: [
          "The first Balmer line is the jump \\(n_i = 3\\) to \\(n_f = 2\\).",
          "\\(\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{4} - \\dfrac{1}{9}\\right) = \\dfrac{5R}{36}\\).",
          "\\(\\lambda = \\dfrac{36}{5 \\times 1.097 \\times 10^7} = 6.56 \\times 10^{-7}\\) m.",
          "656 nm is red light, in the visible region.",
        ],
        answer: "\\(\\lambda = 6.56 \\times 10^{-7}\\) m (656 nm)",
      },
      selfCheckExample: {
        prompt: "Find the ratio of the longest to the shortest wavelength of the Paschen series of hydrogen.",
        steps: [
          "Longest, 4 to 3: \\(\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{9} - \\dfrac{1}{16}\\right) = \\dfrac{7R}{144}\\), so \\(\\lambda_{\\max} = \\dfrac{144}{7R}\\).",
          "Shortest, ∞ to 3: \\(\\dfrac{1}{\\lambda} = \\dfrac{R}{9}\\), so \\(\\lambda_{\\min} = \\dfrac{9}{R}\\).",
          "\\(\\dfrac{\\lambda_{\\max}}{\\lambda_{\\min}} = \\dfrac{144}{7 \\times 9} = \\dfrac{16}{7}\\).",
        ],
        answer: "16 : 7",
      },
      practiceSet: [
        { prompt: "Which series of hydrogen lies partly in the visible region?", answer: "The Balmer series" },
        { prompt: "Which jump gives the second line of the Balmer series?", answer: "\\(n_i = 4\\) to \\(n_f = 2\\)" },
        { prompt: "In which region of the spectrum does the Lyman series lie?", answer: "The ultraviolet" },
      ],
      pyqExampleId: "3f3548d0-611c-4052-bd5e-a83f0c89c5ab",
      traps: [
        {
          title: "A series named after the starting level",
          body: "A series is fixed by the level the electron lands on. The Balmer series ends on n = 2, not the ground state; jumps to n = 1 are the Lyman series.",
        },
        {
          title: "The 'second line' read as \\(n_i = 2\\)",
          body: "Lines are counted from the longest wavelength. The second line of the Balmer series is 4 to 2, of the Paschen series 5 to 3.",
        },
        {
          title: "Longest and shortest swapped",
          body: "The longest wavelength comes from the SMALLEST jump (\\(n_i = n_f + 1\\)); the shortest from the series limit \\(n_i = \\infty\\). Check which one the question puts on top of the ratio.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpat-level-diagram",
      name: "The energy level diagram of hydrogen",
      intuition:
        "Picture a ladder whose rungs get closer and closer near the top. The bottom rung is the ground state at −13.6 eV, the top is 0 eV where the electron is free. Every spectral line is an arrow from one rung down to another.",
      definition:
        "- Draw a vertical energy axis in eV and a horizontal line for each level at \\(E_n = -13.6/n^2\\) eV, labelled with n and its energy.\n" +
        "- The lines crowd together as n grows and meet at E = 0 (n = ∞). Above E = 0 the electron is free and can have any energy: a continuum.\n" +
        "- Show emission lines as downward arrows. Group the arrows that end on the same level and label each group with its series and region.\n" +
        "- The energy level diagram cannot be drawn here. The table gives every label your diagram needs.",
      table: {
        columns: ["Level", "Energy", "Lines that end here", "Region"],
        rows: [
          {
            cells: ["n = 1, ground state", "−13.6 eV", "Lyman series", "Ultraviolet"],
            noteAmber: "Board 2024 asked the origin of the lines from Bohr's theory together with this diagram.",
            pyqExampleId: "a2965102-4a82-4878-b993-552ce1255379",
          },
          { cells: ["n = 2, first excited state", "−3.40 eV", "Balmer series", "Visible (its first lines)"] },
          { cells: ["n = 3", "−1.51 eV", "Paschen series", "Infrared"] },
          { cells: ["n = 4", "−0.85 eV", "Brackett series", "Infrared"] },
          { cells: ["n = ∞", "0 eV", "Series limit of every series", "Electron free: the atom is ionised"] },
        ],
        caption: "Energies from \\(E_n = -13.6/n^2\\) eV. The gap from n = 1 to n = 2 (10.2 eV) is far bigger than any gap above it.",
      },
      selfCheckExample: {
        prompt: "On the energy level diagram of hydrogen, which arrow gives the shortest wavelength of the Balmer series?",
        steps: ["The shortest wavelength is the largest jump that ends on n = 2.", "That is the arrow from n = ∞ to n = 2, the series limit."],
        answer: "The arrow from n = ∞ down to n = 2",
      },
      practiceSet: [
        { prompt: "What is the energy of the n = 3 level of hydrogen?", answer: "−1.51 eV" },
        { prompt: "What does the region above E = 0 on the energy level diagram stand for?", answer: "A free electron, which can have any energy: a continuum" },
        { prompt: "On which level do all the arrows of the Paschen series end?", answer: "n = 3" },
      ],
      pyqExampleId: "a9b094c2-75a8-4046-bdd9-aebb67b0c10c",
      traps: [
        {
          title: "Levels drawn equally spaced",
          body: "The diagram carries marks only if the levels crowd together towards E = 0. Draw n = 1 far below the rest and the upper levels closer and closer.",
        },
        {
          title: "Arrows without labels",
          body: "Mark each group of arrows with its series name and its region (ultraviolet, visible, infrared) and write each level's energy. Unlabelled arrows lose the marks for 'mark the transitions'.",
        },
      ],
    },
  ],
};
