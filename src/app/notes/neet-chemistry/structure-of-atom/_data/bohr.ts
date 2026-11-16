import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_SA_BOHR_NOTE: SubtopicNote = {
  subtopicName: "Bohr Model and Hydrogen Spectrum",
  title: "Bohr Model and Hydrogen Spectrum",
  oneLineDefinition:
    "Bohr's model for hydrogen and other one-electron species: the radius of an orbit (52.9 n²/Z pm), its energy (−2.18 × 10⁻¹⁸ Z²/n² J), and the lines of the hydrogen spectrum from the Rydberg equation.",
  whyItMatters:
    "Five NEET questions from 2022 to 2025. One finds the radius of the third orbit of Li²⁺ from the second orbit of He⁺ (2022), one finds the energy of Be³⁺ in n = 2 from the ground state energy of He⁺ (NEET 2024), one picks the energy and radius of the first orbit of He⁺ and Li²⁺ (2025), one finds the ratio of the wavelengths absorbed in two hydrogen transitions (2025), and one judges the lowest-energy Balmer line together with a statement on blackbody radiation (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchsa-bohr-radius",
      name: "Bohr orbits and their radius",
      intuition:
        "Bohr said the electron in hydrogen can move only in certain circular orbits, each with a fixed energy, and gives out no energy while it stays in one. Each allowed orbit has a number n. The orbit grows quickly as n rises, and a larger nuclear charge Z pulls it in.",
      definition:
        "- The electron moves in fixed circular orbits (**stationary states**) around the nucleus. Its energy does not change while it stays in an orbit.\n" +
        "- Only orbits with angular momentum \\(m_e v r = \\dfrac{nh}{2\\pi}\\) are allowed, with n = 1, 2, 3 and so on.\n" +
        "- Radius: \\(r_n = 52.9\\,\\dfrac{n^{2}}{Z}\\) pm. For hydrogen (Z = 1) the first orbit is 52.9 pm, the **Bohr radius** \\(a_0\\).\n" +
        "- The model works only for species with one electron: H, \\(\\text{He}^{+}\\), \\(\\text{Li}^{2+}\\), \\(\\text{Be}^{3+}\\).\n" +
        "- So the radius grows as \\(n^{2}\\) and shrinks as \\(\\dfrac{1}{Z}\\).",
      formula: {
        label: "Radius of the nth Bohr orbit",
        latex: "r_n = 52.9\\,\\frac{n^{2}}{Z}\\ \\text{pm}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of the orbit, 1, 2, 3 and so on" },
          { symbol: "\\(Z\\)", meaning: "atomic number of the one-electron species" },
        ],
      },
      authoredExample: {
        prompt: "Find the radius of the third Bohr orbit of hydrogen in pm and in Å.",
        steps: [
          "Hydrogen has Z = 1, and n = 3.",
          "\\(r_3 = 52.9 \\times \\dfrac{3^{2}}{1} = 52.9 \\times 9 = 476.1\\) pm.",
          "1 Å = 100 pm, so \\(r_3 = 4.761\\) Å.",
        ],
        answer: "476.1 pm, or 4.761 Å",
      },
      selfCheckExample: {
        prompt: "In the same hydrogen atom, by what factor is the radius of the third orbit larger than that of the first?",
        steps: [
          "Radius goes as \\(n^{2}\\), and Z is the same.",
          "\\(\\dfrac{r_3}{r_1} = \\dfrac{3^{2}}{1^{2}} = 9\\).",
        ],
        answer: "9 times",
      },
      practiceSet: [
        { prompt: "Find the radius of the first Bohr orbit of \\(\\text{Be}^{3+}\\).", answer: "13.2 pm" },
        { prompt: "Which Bohr orbit of \\(\\text{Be}^{3+}\\) has the same radius as the first orbit of hydrogen?", answer: "n = 2" },
        { prompt: "Find the ratio of the radii of the second and fourth Bohr orbits of hydrogen.", answer: "1 : 4" },
        { prompt: "For a fixed n, does the radius of a Bohr orbit rise or fall as Z rises?", answer: "It falls, as \\(\\dfrac{1}{Z}\\)" },
      ],
      pyqExampleId: "870cf51f-bb53-4f66-8fef-c5bb106c093c",
      traps: [
        {
          title: "Radius goes as n squared over Z",
          body: "\\(r_n \\propto \\dfrac{n^{2}}{Z}\\). Using n instead of \\(n^{2}\\), or multiplying by Z instead of dividing, gives one of the wrong options every time.",
        },
        {
          title: "One electron only",
          body: "Bohr's formulas hold for H, \\(\\text{He}^{+}\\), \\(\\text{Li}^{2+}\\) and \\(\\text{Be}^{3+}\\). They do not apply to He or Li atoms, which have more than one electron.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsa-bohr-energy",
      name: "Energy of a Bohr orbit",
      intuition:
        "A free electron far from the nucleus is given zero energy. A bound electron is held in, so its energy is below zero, that is, negative. The first orbit is the most negative and the most stable. Higher orbits climb towards zero and crowd closer together.",
      definition:
        "- \\(E_n = -2.18 \\times 10^{-18}\\,\\dfrac{Z^{2}}{n^{2}}\\) J. NCERT writes this as \\(E_n = -R_H\\,\\dfrac{Z^{2}}{n^{2}}\\), with \\(R_H = 2.18 \\times 10^{-18}\\) J.\n" +
        "- n = 1 is the **ground state**, the lowest energy. Higher n are **excited states**.\n" +
        "- At n = ∞ the electron is free and E = 0. So the energy to remove a hydrogen electron from its ground state is \\(2.18 \\times 10^{-18}\\) J per atom.\n" +
        "- Energy goes as \\(Z^{2}\\), so the same orbit of \\(\\text{He}^{+}\\) is 4 times and of \\(\\text{Li}^{2+}\\) 9 times as negative as in hydrogen.\n" +
        "- Energy needed for a jump: \\(\\Delta E = E_{\\text{final}} - E_{\\text{initial}}\\).",
      formula: {
        label: "Energy of the nth Bohr orbit",
        latex: "E_n = -2.18 \\times 10^{-18}\\,\\frac{Z^{2}}{n^{2}}\\ \\text{J}",
        symbols: [
          { symbol: "\\(E_n\\)", meaning: "energy of the electron in orbit n" },
          { symbol: "\\(Z\\)", meaning: "atomic number of the one-electron species" },
        ],
      },
      authoredExample: {
        prompt: "Find the energy of the electron in the n = 3 orbit of hydrogen, and the energy needed to remove it from there.",
        steps: [
          "\\(E_3 = -2.18 \\times 10^{-18} \\times \\dfrac{1^{2}}{3^{2}} = -\\dfrac{2.18 \\times 10^{-18}}{9}\\) J.",
          "\\(E_3 = -2.42 \\times 10^{-19}\\) J.",
          "Removing it takes the electron to E = 0, so the energy needed is \\(0 - (-2.42 \\times 10^{-19}) = 2.42 \\times 10^{-19}\\) J.",
        ],
        answer: "\\(-2.42 \\times 10^{-19}\\) J; \\(2.42 \\times 10^{-19}\\) J is needed",
      },
      selfCheckExample: {
        prompt: "How much energy is needed to remove the electron from a hydrogen atom in its ground state?",
        steps: [
          "\\(E_1 = -2.18 \\times 10^{-18}\\) J for Z = 1, n = 1.",
          "The free electron has E = 0, so the energy needed is \\(2.18 \\times 10^{-18}\\) J.",
        ],
        answer: "\\(2.18 \\times 10^{-18}\\) J per atom",
      },
      practiceSet: [
        { prompt: "Find the energy of the electron in the n = 3 orbit of \\(\\text{He}^{+}\\).", answer: "\\(-9.69 \\times 10^{-19}\\) J" },
        { prompt: "How much energy is needed to raise a hydrogen electron from n = 1 to n = 2?", answer: "\\(1.64 \\times 10^{-18}\\) J" },
        { prompt: "Why is the energy of an electron in a Bohr orbit negative?", answer: "A free electron (n = ∞) has zero energy, and a bound electron is lower in energy than that" },
        { prompt: "As n rises, do the energy levels of hydrogen get closer together or further apart?", answer: "Closer together" },
      ],
      pyqExampleId: "f436fe5c-50fd-40be-8b30-9262202fd7f4",
      traps: [
        {
          title: "Energy goes as Z squared",
          body: "Radius has Z to the first power, but energy has \\(Z^{2}\\). For \\(\\text{Li}^{2+}\\) the factor is 9, not 3.",
        },
        {
          title: "Less negative means higher",
          body: "\\(-2.42 \\times 10^{-19}\\) J is higher than \\(-2.18 \\times 10^{-18}\\) J. The outer orbits have the higher (less negative) energy, though the number in front looks smaller.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchsa-spectrum",
      name: "Hydrogen spectrum and the Rydberg equation",
      intuition:
        "When an electron drops from a higher orbit to a lower one, the energy difference leaves as one photon. Since the orbits have fixed energies, only certain wavelengths appear: the spectrum is a set of lines, not a rainbow. Every line that ends on the same lower orbit belongs to one series.",
      definition:
        "- For hydrogen: \\(\\bar{\\nu} = 109677\\left(\\dfrac{1}{n_1^{2}} - \\dfrac{1}{n_2^{2}}\\right)\\ \\text{cm}^{-1}\\), with \\(n_2 > n_1\\). For a one-electron ion, multiply by \\(Z^{2}\\).\n" +
        "- The constant 109677 \\(\\text{cm}^{-1}\\) is the Rydberg constant, also written \\(R_H\\). It is a different number from the \\(2.18 \\times 10^{-18}\\) J of the energy formula, though NCERT uses the same letter for both.\n" +
        "- The photon carries the energy gap: \\(\\Delta E = h\\nu = \\dfrac{hc}{\\lambda}\\). A bigger gap means a shorter wavelength.\n" +
        "- Series by the lower level \\(n_1\\): **Lyman** 1 (ultraviolet), **Balmer** 2 (visible), **Paschen** 3, **Brackett** 4 and **Pfund** 5 (all infrared).\n" +
        "- The first line of a series (lowest energy, longest wavelength) has \\(n_2 = n_1 + 1\\). The series limit has \\(n_2 = \\infty\\).\n" +
        "- Electrons falling from level n to the ground state can give \\(\\dfrac{n(n-1)}{2}\\) different lines.\n" +
        "- A line seen in emission is also absorbed when the electron jumps up between the same two levels.",
      formula: {
        label: "Rydberg equation",
        latex: "\\bar{\\nu} = \\frac{1}{\\lambda} = 109677\\,Z^{2}\\left(\\frac{1}{n_1^{2}} - \\frac{1}{n_2^{2}}\\right)\\ \\text{cm}^{-1}",
        symbols: [
          { symbol: "\\(n_1\\)", meaning: "lower level, which names the series" },
          { symbol: "\\(n_2\\)", meaning: "upper level, larger than the lower one" },
          { symbol: "\\(109677\\ \\text{cm}^{-1}\\)", meaning: "Rydberg constant for hydrogen" },
        ],
      },
      authoredExample: {
        prompt: "Find the wavelength of the light given out when the electron of a hydrogen atom drops from n = 4 to n = 2.",
        steps: [
          "\\(\\bar{\\nu} = 109677\\left(\\dfrac{1}{2^{2}} - \\dfrac{1}{4^{2}}\\right) = 109677 \\times \\dfrac{3}{16} = 20564\\ \\text{cm}^{-1}\\).",
          "\\(\\lambda = \\dfrac{1}{20564}\\) cm \\(= 4.863 \\times 10^{-5}\\) cm \\(= 486\\) nm.",
          "The lower level is 2, so this is a Balmer line, in the visible region.",
        ],
        answer: "About 486 nm (a visible Balmer line)",
      },
      selfCheckExample: {
        prompt: "Electrons in a sample of hydrogen atoms fall from n = 5 to the ground state. How many different spectral lines can appear?",
        steps: [
          "Number of lines \\(= \\dfrac{n(n-1)}{2}\\) with n = 5.",
          "\\(\\dfrac{5 \\times 4}{2} = 10\\).",
        ],
        answer: "10",
      },
      practiceSet: [
        { prompt: "Which series of the hydrogen spectrum lies in the visible region?", answer: "Balmer series" },
        { prompt: "Write the wavenumber of the first line of the Lyman series of hydrogen in terms of \\(R_H\\) (in \\(\\text{cm}^{-1}\\)).", answer: "\\(\\dfrac{3R_H}{4}\\)" },
        { prompt: "Find the wavenumber of the series limit of the Balmer series of hydrogen.", answer: "About 27419 \\(\\text{cm}^{-1}\\)" },
        { prompt: "For the same pair of levels, how does the wavenumber of a \\(\\text{He}^{+}\\) line compare with that of hydrogen?", answer: "4 times (\\(Z^{2} = 4\\))" },
      ],
      pyqExampleId: "e5289f7f-e436-4f31-bfbc-a78315da6206",
      traps: [
        {
          title: "Lowest energy line is the smallest jump",
          body: "The first line of the Balmer series is n = 3 to n = 2, giving \\(\\dfrac{5R_H}{36}\\). The series limit, from \\(n = \\infty\\), is the highest energy line.",
        },
        {
          title: "Wavelength is the reciprocal",
          body: "The Rydberg equation gives \\(\\dfrac{1}{\\lambda}\\). A ratio of wavelengths is the inverse of the ratio of the energy gaps, so turn the fraction over before choosing.",
        },
      ],
    },
  ],
};
