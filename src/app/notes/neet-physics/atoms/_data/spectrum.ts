import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_AT_SPECTRUM_NOTE: SubtopicNote = {
  subtopicName: "Hydrogen Spectrum",
  title: "Hydrogen Spectrum",
  oneLineDefinition:
    "Each line of the hydrogen spectrum is a photon from a jump between two energy levels; the Rydberg formula gives its wavelength, and the lines ending on one level form a series.",
  whyItMatters:
    "Four NEET questions, all from 2023 and 2024, three of them from 2024. One compares the series limits of the Balmer and Brackett series, one matches the four visible Balmer lines to their transitions, one names the series whose lines end on n = 4, and one compares the wavelengths of three transitions in an energy-level figure.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphat-transitions",
      name: "Photons from jumps between levels",
      intuition:
        "When an electron falls from a higher level to a lower one, the atom gives out one photon carrying exactly the energy difference. A big fall gives a high-energy photon with a short wavelength; a small fall gives a long wavelength. Since the levels have fixed energies, only certain wavelengths can come out, and that is why the spectrum is a set of sharp lines. An atom can also take in a photon, but only one whose energy exactly matches a gap.",
      definition:
        "- **Emission:** \\(h\\nu = \\dfrac{hc}{\\lambda} = E_i - E_f\\), where \\(E_i\\) is the higher level.\n" +
        "- **Handy form:** \\(\\lambda\\) in nm \\(= \\dfrac{1240}{\\Delta E \\text{ in eV}}\\), since \\(hc \\approx 1240\\) eV nm.\n" +
        "- \\(\\lambda \\propto \\dfrac{1}{\\Delta E}\\): the bigger the energy gap, the shorter the wavelength.\n" +
        "- **Absorption:** a ground-state hydrogen atom takes in a photon only if its energy matches a gap: 10.2 eV to n = 2, 12.09 eV to n = 3, 12.75 eV to n = 4. Any photon above 13.6 eV can free the electron.\n" +
        "- **Number of lines:** many atoms excited to level n can give \\(\\dfrac{n(n - 1)}{2}\\) different lines. A single atom falling from level n gives at most \\(n - 1\\) photons, one per step down.",
      formula: {
        label: "Photon from a transition",
        latex: "\\frac{hc}{\\lambda} = E_i - E_f, \\qquad \\lambda\\ (\\text{nm}) = \\frac{1240}{\\Delta E\\ (\\text{eV})}",
      },
      authoredExample: {
        prompt:
          "The electron of a hydrogen atom falls from n = 3 to n = 2. Find the energy and the wavelength of the photon. The levels are −1.51 eV and −3.4 eV; take hc = 1240 eV nm.",
        steps: [
          "\\(\\Delta E = -1.51 - (-3.4) = 1.89\\) eV.",
          "\\(\\lambda = \\dfrac{1240}{1.89} \\approx 656\\) nm.",
          "This is red light, the brightest visible line of hydrogen.",
        ],
        answer: "1.89 eV and about 656 nm",
      },
      selfCheckExample: {
        prompt:
          "A hydrogen atom in its ground state takes in a photon of 12.09 eV. To which level does it rise, and what is the shortest wavelength it can then give out? Take hc = 1240 eV nm.",
        steps: [
          "12.09 eV is the gap from −13.6 eV to −1.51 eV, so the electron rises to n = 3.",
          "The shortest wavelength comes from the biggest fall, 3 → 1, which gives back the whole 12.09 eV.",
          "\\(\\lambda = \\dfrac{1240}{12.09} \\approx 102.6\\) nm, in the ultraviolet.",
        ],
        answer: "n = 3; about 102.6 nm",
      },
      practiceSet: [
        { prompt: "A hydrogen atom gives out a photon of 12.75 eV. Between which two levels did its electron jump?", answer: "From n = 4 to n = 1" },
        { prompt: "What is the wavelength of a photon of energy 2.48 eV? Take hc = 1240 eV nm.", answer: "500 nm" },
        { prompt: "A gas of hydrogen atoms is excited to n = 5. How many different spectral lines can it give?", answer: "10" },
        { prompt: "Can a hydrogen atom in its ground state take in a photon of 5 eV?", answer: "No: the smallest gap from the ground state is 10.2 eV." },
        { prompt: "A single hydrogen atom is in the level n = 4. At most how many photons can it give out on its way to the ground state?", answer: "3" },
      ],
      pyqExampleId: "d05ab109-b897-440c-a3bd-fa3c4d76a4d2",
      traps: [
        {
          title: "A bigger gap means a shorter wavelength",
          body: "\\(\\lambda = \\dfrac{hc}{\\Delta E}\\). The jump with the largest energy difference gives the shortest wavelength, not the longest.",
        },
        {
          title: "Counting n(n − 1)/2 lines needs many atoms",
          body: "A gas of atoms excited to level n can give \\(\\dfrac{n(n - 1)}{2}\\) lines. A single atom gives at most \\(n - 1\\) photons as it steps down.",
        },
        {
          title: "Absorption needs an exact gap",
          body: "A ground-state hydrogen atom cannot take in an 11 eV photon: no level lies 11 eV above the ground state. Only exact gaps, or more than 13.6 eV, are taken in.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphat-rydberg",
      name: "The Rydberg formula and series limits",
      intuition:
        "Put Bohr's energy levels into the photon rule and every line of hydrogen comes out of one formula, with a single constant R. Fix the lower level and let the upper level climb: the lines get closer and closer and pile up at a shortest wavelength, the series limit, which is a jump from n = ∞. The first line, from the level just above, is the smallest jump and so the longest wavelength. Because every wavelength is a simple fraction times 1/R, one given wavelength fixes all the others.",
      definition:
        "- **Rydberg formula:** \\(\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_f^{2}} - \\dfrac{1}{n_i^{2}}\\right)\\), with \\(n_f\\) the lower level and \\(R = 1.097 \\times 10^{7}\\ \\text{m}^{-1}\\).\n" +
        "- \\(\\dfrac{1}{\\lambda}\\) is the wave number. The frequency is \\(\\nu = \\dfrac{c}{\\lambda}\\).\n" +
        "- **First line** of a series (longest wavelength): \\(n_i = n_f + 1\\).\n" +
        "- **Series limit** (shortest wavelength): \\(n_i = \\infty\\), so \\(\\dfrac{1}{\\lambda} = \\dfrac{R}{n_f^{2}}\\) and \\(\\lambda = \\dfrac{n_f^{2}}{R}\\).\n" +
        "- **An ion with one electron:** multiply the right side by \\(Z^{2}\\), so every wavelength divides by \\(Z^{2}\\).",
      formula: {
        label: "Rydberg formula",
        latex: "\\frac{1}{\\lambda} = RZ^{2}\\left(\\frac{1}{n_f^{2}} - \\frac{1}{n_i^{2}}\\right), \\qquad \\lambda_{\\text{limit}} = \\frac{n_f^{2}}{RZ^{2}}",
        symbols: [
          { symbol: "\\(R\\)", meaning: "Rydberg constant, about 1.097 × 10⁷ per metre" },
          { symbol: "\\(n_f\\)", meaning: "the lower level, where the electron ends" },
          { symbol: "\\(n_i\\)", meaning: "the higher level, where the electron starts" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the wavelength of the first line of the Lyman series of hydrogen and of its series limit. Take \\(R = 1.097 \\times 10^{7}\\ \\text{m}^{-1}\\).",
        steps: [
          "The Lyman series ends on \\(n_f = 1\\). First line: \\(2 \\to 1\\), \\(\\dfrac{1}{\\lambda} = R\\left(1 - \\dfrac{1}{4}\\right) = \\dfrac{3R}{4}\\).",
          "\\(\\lambda = \\dfrac{4}{3R} = \\dfrac{4}{3 \\times 1.097 \\times 10^{7}} \\approx 1.215 \\times 10^{-7}\\) m, about 121.5 nm.",
          "Series limit: \\(\\lambda = \\dfrac{1}{R} \\approx 9.12 \\times 10^{-8}\\) m, about 91.2 nm.",
        ],
        answer: "About 121.5 nm and 91.2 nm",
      },
      selfCheckExample: {
        prompt: "What is the ratio of the longest to the shortest wavelength in the Balmer series of hydrogen?",
        steps: [
          "Longest: \\(3 \\to 2\\), \\(\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{4} - \\dfrac{1}{9}\\right) = \\dfrac{5R}{36}\\), so \\(\\lambda = \\dfrac{36}{5R}\\).",
          "Shortest: \\(\\infty \\to 2\\), \\(\\lambda = \\dfrac{4}{R}\\).",
          "Ratio \\(= \\dfrac{36}{5} \\div 4 = \\dfrac{9}{5}\\).",
        ],
        answer: "9 : 5",
      },
      practiceSet: [
        { prompt: "Wave number of the first line of the Balmer series of hydrogen, in terms of R?", answer: "\\(\\dfrac{5R}{36}\\)" },
        { prompt: "Longest wavelength of the Paschen series of hydrogen, in terms of R?", answer: "\\(\\dfrac{144}{7R}\\)" },
        { prompt: "A line of hydrogen has wave number \\(\\dfrac{3R}{16}\\). Which jump gives it?", answer: "From n = 4 to n = 2" },
        { prompt: "How does the wavelength of the \\(2 \\to 1\\) line of He⁺ compare with the same line of hydrogen?", answer: "It is one quarter as long \\((Z^{2} = 4)\\)." },
      ],
      pyqExampleId: "0458bdc1-dade-4516-ae51-f26a4f0cdd19",
      traps: [
        {
          title: "The formula gives 1/λ, not λ",
          body: "\\(R\\left(\\dfrac{1}{n_f^{2}} - \\dfrac{1}{n_i^{2}}\\right)\\) is the wave number. Turn it upside down at the end to get the wavelength.",
        },
        {
          title: "The series limit is the shortest wavelength",
          body: "The limit, from \\(n_i = \\infty\\), is the biggest jump into the level and so the shortest wavelength, \\(\\dfrac{n_f^{2}}{R}\\). The first line is the longest.",
        },
        {
          title: "Put the lower level first",
          body: "In \\(\\dfrac{1}{n_f^{2}} - \\dfrac{1}{n_i^{2}}\\), \\(n_f\\) is the level the electron ends on. Swapping them gives a negative wave number.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphat-series",
      name: "The spectral series of hydrogen",
      visualizationSlug: "cet-hydrogen-series",
      intuition:
        "All the lines that end on the same lower level make up one series, named after the scientist who found it. Lines ending on n = 1 are big jumps and lie in the ultraviolet; lines ending on n = 2 are the visible ones; lines ending on n = 3, 4 and 5 are small jumps and lie in the infrared. Learn the order of the lower levels, 1 to 5: Lyman, Balmer, Paschen, Brackett, Pfund.",
      definition:
        "- **A series** is the set of lines whose transitions end on the same lower level.\n" +
        "- **The visible Balmer lines:** Hα 656.3 nm (3 → 2), Hβ 486.1 nm (4 → 2), Hγ 434.1 nm (5 → 2), Hδ 410.2 nm (6 → 2).\n" +
        "- Going up the series the lines crowd together towards the Balmer limit, 364.6 nm, which is just into the ultraviolet.\n" +
        "- In every series the first line has the longest wavelength and the series limit the shortest.",
      table: {
        columns: ["Series", "Electron falls to", "Electron falls from", "Region"],
        rows: [
          { cells: ["Lyman", "n = 1", "n = 2, 3, 4 and higher", "Ultraviolet"] },
          {
            cells: ["Balmer", "n = 2", "n = 3, 4, 5 and higher", "Visible"],
            noteAmber: "NEET 2024: the four visible Balmer lines matched to their jumps, 3 → 2 at 656.3 nm, 4 → 2 at 486.1 nm, 5 → 2 at 434.1 nm and 6 → 2 at 410.2 nm.",
            pyqExampleId: "4724fd66-b02e-4127-985e-beffa0a5a87a",
          },
          { cells: ["Paschen", "n = 3", "n = 4, 5, 6 and higher", "Infrared"] },
          {
            cells: ["Brackett", "n = 4", "n = 5, 6, 7 and higher", "Infrared"],
            noteAmber: "Re-NEET 2024: the series made by jumps from n = 5, 6 and higher down to n = 4 is the Brackett series.",
          },
          { cells: ["Pfund", "n = 5", "n = 6, 7, 8 and higher", "Infrared"] },
        ],
        caption: "The lower level fixes the series; the upper level picks the line within it.",
      },
      selfCheckExample: {
        prompt:
          "Balmer's lines are called the visible series. Is the Balmer series limit visible? Take \\(R = 1.097 \\times 10^{7}\\ \\text{m}^{-1}\\) and visible light as 400 nm to 700 nm.",
        steps: [
          "The limit is \\(\\infty \\to 2\\): \\(\\lambda = \\dfrac{4}{R} = \\dfrac{4}{1.097 \\times 10^{7}} \\approx 3.65 \\times 10^{-7}\\) m.",
          "365 nm is shorter than 400 nm, so it lies in the ultraviolet.",
        ],
        answer: "No: about 365 nm, just into the ultraviolet",
      },
      practiceSet: [
        { prompt: "Which series of hydrogen lies wholly in the ultraviolet?", answer: "The Lyman series" },
        { prompt: "Which series of hydrogen lie in the infrared?", answer: "Paschen, Brackett and Pfund" },
        { prompt: "What are the wavelength and the jump of the Hβ line of hydrogen?", answer: "486.1 nm, from n = 4 to n = 2" },
        { prompt: "Which visible line of hydrogen has the longest wavelength?", answer: "Hα, 656.3 nm, from n = 3 to n = 2" },
      ],
      pyqExampleId: "dd81ef39-20e5-44d1-8547-295a264dc197",
      traps: [
        {
          title: "Lyman is ultraviolet, Balmer is visible",
          body: "The Lyman series, ending on n = 1, is all ultraviolet. The visible lines of hydrogen belong to the Balmer series, ending on n = 2.",
        },
        {
          title: "Brackett ends on 4, Pfund on 5",
          body: "The lower levels run Lyman 1, Balmer 2, Paschen 3, Brackett 4, Pfund 5. Swapping the last two is a common slip.",
        },
        {
          title: "Hα is the longest Balmer line, not the shortest",
          body: "Hα comes from the smallest Balmer jump, 3 → 2, so it has the longest wavelength, 656.3 nm. The lines get shorter going up the series.",
        },
      ],
    },
  ],
};
