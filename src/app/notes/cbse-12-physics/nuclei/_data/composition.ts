import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_NU_COMPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Atomic Masses and Composition of the Nucleus",
  title: "Atomic Masses and Composition of the Nucleus",
  oneLineDefinition:
    "The atomic mass unit, the masses of the proton, neutron and electron, what Z, N and A count, how Chadwick found the neutron, and the three families of nuclides: isotopes, isobars and isotones.",
  whyItMatters:
    "7 questions, all from board papers (2022, 2023, 2025 and 2026). The board asks you to distinguish isotopes and isobars with an example (2022, and again in 2026), say what isotones share (2025, and again in 2026), say what the atomic number counts (2023), explain why Chadwick decided the neutral radiation was neutrons and not photons (2022), find the mass of an alpha particle in u (2025), and derive the relation between the atomic mass unit and the electron volt (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpnu-amu",
      name: "The atomic mass unit and the masses of the particles",
      intuition:
        "A kilogram is far too big for an atom, so atomic masses are measured in a tiny unit fixed by the carbon-12 atom. On this scale the proton and the neutron each weigh just over 1 u and the electron about two thousandths of that, so the mass of an atom in u is close to its number of nucleons.",
      definition:
        "- **Atomic mass unit:** 1 u is one twelfth of the mass of one neutral carbon-12 **atom**: \\(1\\ \\text{u} = \\dfrac{1.992647 \\times 10^{-26}}{12}\\ \\text{kg} = 1.660539 \\times 10^{-27}\\) kg.\n" +
        "- Masses to remember: proton \\(m_p = 1.00727\\) u, neutron \\(m_n = 1.00866\\) u, electron \\(m_e = 0.00055\\) u, hydrogen atom \\(m_H = 1.00783\\) u (a proton plus an electron).\n" +
        "- **Atom and nucleus:** an atomic mass includes the \\(Z\\) electrons, so the mass of the nucleus is the atomic mass minus \\(Z m_e\\).\n" +
        "- **Average atomic mass:** an element is a mixture of isotopes, so its atomic mass is the average of the isotope masses weighted by their abundances (chlorine comes out at 35.47 u).\n" +
        "- **u in energy units (derive it this way):**\n" +
        "- Step 1: \\(E = mc^2 = (1.6605 \\times 10^{-27}\\ \\text{kg})(2.9979 \\times 10^{8}\\ \\text{m s}^{-1})^2 = 1.4924 \\times 10^{-10}\\) J.\n" +
        "- Step 2: divide by \\(1.602 \\times 10^{-19}\\) J per eV: \\(E = 0.9315 \\times 10^{9}\\) eV \\(= 931.5\\) MeV.\n" +
        "- Step 3: so \\(1\\ \\text{u} = 931.5\\ \\text{MeV}/c^2\\).",
      formula: {
        label: "Atomic mass unit, and nuclear mass from atomic mass",
        latex: "1\\ \\text{u} = \\frac{m({}^{12}\\text{C atom})}{12} = 1.660539 \\times 10^{-27}\\ \\text{kg} \\equiv 931.5\\ \\text{MeV}/c^2, \\qquad M_{\\text{nucleus}} = M_{\\text{atom}} - Z m_e",
        symbols: [
          { symbol: "\\(M_{\\text{atom}}\\)", meaning: "mass of the neutral atom, including its electrons" },
          { symbol: "\\(Z\\)", meaning: "atomic number, the number of electrons in the neutral atom" },
          { symbol: "\\(m_e\\)", meaning: "mass of an electron, 0.00055 u" },
        ],
      },
      authoredExample: {
        prompt:
          "The mass of a proton is \\(1.67262 \\times 10^{-27}\\) kg. Express it in atomic mass units, and find its energy equivalent in MeV.",
        steps: [
          "Given: \\(m_p = 1.67262 \\times 10^{-27}\\) kg, \\(1\\ \\text{u} = 1.660539 \\times 10^{-27}\\) kg, \\(1\\ \\text{u} = 931.5\\ \\text{MeV}/c^2\\).",
          "In u: \\(m_p = \\dfrac{1.67262 \\times 10^{-27}}{1.660539 \\times 10^{-27}} = 1.00727\\) u.",
          "Energy equivalent: \\(E = 1.00727 \\times 931.5 = 938.3\\) MeV.",
        ],
        answer: "\\(m_p = 1.00727\\) u; energy equivalent 938.3 MeV",
      },
      selfCheckExample: {
        prompt:
          "Chlorine has two isotopes of masses 34.98 u and 36.98 u, with abundances of 75.4 per cent and 24.6 per cent. Find the average atomic mass of chlorine.",
        steps: [
          "Weighted average: \\(\\dfrac{75.4 \\times 34.98 + 24.6 \\times 36.98}{100}\\).",
          "\\(= \\dfrac{2637.49 + 909.71}{100} = 35.47\\) u.",
        ],
        answer: "35.47 u",
      },
      practiceSet: [
        { prompt: "Express the mass of a neutron, 1.00866 u, in kilograms.", answer: "\\(1.00866 \\times 1.660539 \\times 10^{-27} = 1.6749 \\times 10^{-27}\\) kg" },
        { prompt: "Find the energy equivalent of an electron, of mass 0.00055 u, in MeV.", answer: "\\(0.00055 \\times 931.5 = 0.512\\) MeV" },
        { prompt: "Why is the atomic mass of most nuclides, in u, close to a whole number?", answer: "Each nucleon has a mass of just over 1 u and the electrons add very little, so the mass in u is close to the mass number A" },
      ],
      pyqExampleId: "b76bc48e-b2db-44ba-bf38-c30cf6924bdd",
      traps: [
        {
          title: "One twelfth of the carbon nucleus",
          body: "The unit is defined from the carbon-12 ATOM, electrons included. Write \"one twelfth of the mass of one carbon-12 atom\" in a definition; leaving out the word atom, or the 12, loses the mark.",
        },
        {
          title: "Atomic mass used as nuclear mass",
          body: "An atomic mass carries \\(Z\\) electrons. When a question asks for the mass of a nucleus or of a bare particle such as an alpha particle, subtract \\(Z m_e\\) first.",
        },
        {
          title: "Stopping at joules in the u to MeV derivation",
          body: "The derivation has two steps: \\(E = mc^2\\) gives joules, then dividing by \\(1.602 \\times 10^{-19}\\) J per eV gives 931.5 MeV. End with \\(1\\ \\text{u} = 931.5\\ \\text{MeV}/c^2\\), with the \\(c^2\\).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpnu-composition",
      name: "What a nucleus is made of: Z, N, A and the neutron",
      intuition:
        "A nucleus holds protons and neutrons, together called nucleons. The number of protons fixes the element and the charge of the nucleus; the neutrons add mass and nuclear binding but no charge. The neutron was the last piece to be found, because a neutral particle leaves no track.",
      definition:
        "- The **nucleus** of an atom with atomic number \\(Z\\) carries charge \\(+Ze\\), so it holds exactly \\(Z\\) protons. Electrons are all outside the nucleus.\n" +
        "- A nuclide is written \\({}^{A}_{Z}\\text{X}\\): gold, \\({}^{197}_{79}\\text{Au}\\), has 197 nucleons, of which 79 are protons and 118 are neutrons.\n" +
        "- **Discovery of the neutron (Chadwick, 1932):** beryllium bombarded with alpha particles gave out a neutral radiation that knocked protons out of light nuclei. If it were photons, conservation of energy and momentum would need photon energies far higher than the bombardment could supply. So it had to be a new neutral particle, the neutron, with a mass very nearly that of the proton.",
      table: {
        columns: ["Term", "What it counts or means"],
        rows: [
          {
            cells: ["Atomic number \\(Z\\)", "Number of protons in the nucleus (equal to the number of electrons in the neutral atom)"],
            pyqExampleId: "acebaf83-c8c6-4749-aad4-f107716cc735",
            noteAmber: "Board 2023 asked what the atomic number represents: the number of protons in the nucleus, not protons plus neutrons.",
          },
          { cells: ["Neutron number \\(N\\)", "Number of neutrons in the nucleus, \\(N = A - Z\\)"] },
          { cells: ["Mass number \\(A\\)", "Total number of protons and neutrons, \\(A = Z + N\\)"] },
          { cells: ["Nucleon", "A proton or a neutron; a nucleus has \\(A\\) nucleons"] },
          { cells: ["Proton", "Charge \\(+e\\), mass 1.00727 u, stable"] },
          { cells: ["Neutron", "No charge, mass 1.00866 u; stable inside a nucleus, but a free neutron decays into a proton, an electron and an antineutrino, with a mean life of about 1000 s"] },
        ],
      },
      practiceSet: [
        { prompt: "How many protons and neutrons are there in \\({}^{235}_{92}\\text{U}\\)?", answer: "92 protons and 143 neutrons" },
        { prompt: "Find the charge on the nucleus of \\({}^{27}_{13}\\text{Al}\\), taking \\(e = 1.6 \\times 10^{-19}\\) C.", answer: "\\(+13e = 2.08 \\times 10^{-18}\\) C" },
        { prompt: "Is a free neutron stable?", answer: "No. A free neutron decays into a proton, an electron and an antineutrino; it is stable only inside a nucleus" },
      ],
      pyqExampleId: "2865e965-4b68-4e03-bd0f-c796a12a04fd",
      traps: [
        {
          title: "Swapping Z and A",
          body: "Z counts protons only; A counts protons and neutrons together. A one-mark MCQ puts both counts in the options, so read which one is asked.",
        },
        {
          title: "Chadwick's reason given as 'it was neutral'",
          body: "Being neutral did not rule out photons. The deciding argument was energy and momentum: photons would have needed far more energy than the alpha bombardment could give. State that argument for the marks.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpnu-isotopes",
      name: "Isotopes, isobars and isotones",
      intuition:
        "Nuclides are grouped by what they share. Same protons means same element: isotopes. Same total nucleons: isobars. Same neutrons: isotones. A memory hook: isotoNes share Neutrons, isobArs share A.",
      definition:
        "- **Isotopes** have the same \\(Z\\) but different \\(A\\). Their atoms have the same electronic structure, so they behave identically in chemistry and sit in the same place in the periodic table.\n" +
        "- **Isobars** have the same \\(A\\) but different \\(Z\\), so they are different elements.\n" +
        "- **Isotones** have the same \\(N\\) but different \\(Z\\).\n" +
        "- Two nuclei with different mass numbers are isotopes only if their atomic numbers are also the same.",
      table: {
        columns: ["Family", "Same", "Different", "Example"],
        rows: [
          { cells: ["Isotopes", "Atomic number \\(Z\\)", "\\(N\\) and \\(A\\)", "\\({}^{1}_{1}\\text{H}\\), \\({}^{2}_{1}\\text{H}\\), \\({}^{3}_{1}\\text{H}\\)"] },
          { cells: ["Isobars", "Mass number \\(A\\)", "\\(Z\\) and \\(N\\)", "\\({}^{3}_{1}\\text{H}\\) and \\({}^{3}_{2}\\text{He}\\)"] },
          {
            cells: ["Isotones", "Neutron number \\(N\\)", "\\(Z\\) and \\(A\\)", "\\({}^{198}_{80}\\text{Hg}\\) and \\({}^{197}_{79}\\text{Au}\\), both with 118 neutrons"],
            pyqExampleId: "5ab9ebb7-caf9-40ad-9530-1a52762748da",
            noteAmber: "Board 2025 and 2026 both asked what isotones have in common: the same number of neutrons.",
          },
        ],
      },
      practiceSet: [
        { prompt: "Are \\({}^{40}_{18}\\text{Ar}\\) and \\({}^{40}_{20}\\text{Ca}\\) isotopes, isobars or isotones?", answer: "Isobars: the same A = 40, different Z" },
        { prompt: "Show that \\({}^{13}_{6}\\text{C}\\) and \\({}^{14}_{7}\\text{N}\\) are isotones.", answer: "Each has 7 neutrons (\\(13 - 6 = 7\\) and \\(14 - 7 = 7\\)), with different Z" },
        { prompt: "Why do the isotopes of an element have the same chemical properties?", answer: "They have the same number of electrons, so the same electronic structure" },
      ],
      pyqExampleId: "4f0114a8-3be1-490c-a025-7940f92fa14b",
      traps: [
        {
          title: "A 'distinguish' that covers one side only",
          body: "Defining isotopes alone does not distinguish them from isobars. For each family say what is the same AND what differs, and give one example of each.",
        },
        {
          title: "Isotopes and isotones mixed up",
          body: "Isotopes share protons (the same element); isotones share neutrons (different elements). Count \\(N = A - Z\\) for each nuclide before you decide.",
        },
      ],
    },
  ],
};
