import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_NU_SIZE_NOTE: SubtopicNote = {
  subtopicName: "Nuclear Size and Binding Energy",
  title: "Nuclear Size and Binding Energy",
  oneLineDefinition:
    "What a nucleus is made of, its radius R = R₀A^(1/3) and its constant density, then the mass defect, the binding energy it gives and the short-range nuclear force that holds the nucleus together.",
  whyItMatters:
    "Three NEET questions, one from 2022 and two from 2026. One asks the ratio of the radii of two nuclei made in a split (2022), one finds a mass number from the nuclear density (2026), and one asks how the volume of a nucleus grows with A and what the mass defect is (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphnu-size",
      name: "Composition, size and density of a nucleus",
      intuition:
        "A nucleus is a tight ball of protons and neutrons, the nucleons. Each nucleon takes up about the same small space, like marbles packed in a bag. So the volume of a nucleus grows in step with the number of nucleons A, and the radius grows only as the cube root of A. Mass and volume both grow as A, so every nucleus has the same density.",
      definition:
        "- A nucleus has Z protons and N neutrons. The mass number is \\(A = Z + N\\).\n" +
        "- **Isotopes** have the same Z, **isobars** the same A, **isotones** the same N.\n" +
        "- Radius: \\(R = R_0A^{1/3}\\), with \\(R_0 = 1.2 \\times 10^{-15}\\) m = 1.2 fm.\n" +
        "- Volume \\(\\tfrac{4}{3}\\pi R^{3} \\propto A\\), surface area \\(\\propto A^{2/3}\\), radius \\(\\propto A^{1/3}\\).\n" +
        "- Density: \\(\\rho = \\dfrac{\\text{mass}}{\\tfrac{4}{3}\\pi R_0^{3}A}\\). The mass is about A times the mass of one nucleon, so A cancels: every nucleus has a density of about \\(2.3 \\times 10^{17}\\ \\text{kg/m}^{3}\\).\n" +
        "- From a mass M and a density: \\(\\tfrac{4}{3}\\pi R_0^{3}A = \\dfrac{M}{\\rho}\\), so \\(A = \\dfrac{3M}{4\\pi R_0^{3}\\rho}\\).\n" +
        "- A nucleus at rest that splits in two: the pieces fly apart with equal and opposite momenta, so \\(\\dfrac{v_1}{v_2} = \\dfrac{A_2}{A_1}\\).",
      formula: {
        label: "Nuclear radius",
        latex: "R = R_0A^{1/3}, \\qquad V \\propto A, \\qquad \\rho = \\frac{3m}{4\\pi R_0^{3}}\\ \\text{(same for every nucleus)}",
        symbols: [
          { symbol: "\\(R_0\\)", meaning: "a constant, 1.2 fm" },
          { symbol: "\\(A\\)", meaning: "mass number, protons plus neutrons" },
          { symbol: "\\(m\\)", meaning: "mass of one nucleon" },
        ],
      },
      authoredExample: {
        prompt:
          "The nucleus \\(^{27}\\text{Al}\\) has a radius of 3.6 fm. Find \\(R_0\\), the radius of a nucleus with \\(A = 64\\), and the ratio of the volumes of the two nuclei.",
        steps: [
          "\\(27^{1/3} = 3\\), so \\(R_0 = \\dfrac{3.6}{3} = 1.2\\) fm.",
          "\\(64^{1/3} = 4\\), so \\(R = 1.2 \\times 4 = 4.8\\) fm.",
          "Volume goes as A, so the volumes are in the ratio 64 : 27.",
        ],
        answer: "\\(R_0 = 1.2\\) fm; 4.8 fm; volumes 64 : 27",
      },
      selfCheckExample: {
        prompt:
          "The radius of a nucleus X is twice the radius of \\(^{9}_{4}\\text{Be}\\). What is the mass number of X?",
        steps: [
          "\\(\\dfrac{R_X}{R_{Be}} = \\left(\\dfrac{A_X}{9}\\right)^{1/3} = 2\\).",
          "Cube both sides: \\(\\dfrac{A_X}{9} = 8\\), so \\(A_X = 72\\).",
        ],
        answer: "72",
      },
      practiceSet: [
        { prompt: "What is the ratio of the nuclear densities of \\(^{16}\\text{O}\\) and \\(^{208}\\text{Pb}\\)?", answer: "1 : 1" },
        { prompt: "Taking \\(R_0 = 1.2\\) fm, what is the radius of a nucleus with \\(A = 125\\)?", answer: "6 fm" },
        { prompt: "What is the ratio of the surface areas of nuclei with mass numbers 8 and 27?", answer: "4 : 9" },
        { prompt: "Are \\(^{13}_{6}\\text{C}\\) and \\(^{14}_{7}\\text{N}\\) isotopes, isobars or isotones?", answer: "Isotones: each has 7 neutrons" },
      ],
      pyqExampleId: "7c806960-c0fd-4f93-8efd-4bb839fed13b",
      traps: [
        {
          title: "Volume grows as A, not as the cube root of A",
          body: "The radius goes as \\(A^{1/3}\\), so the volume, which goes as \\(R^{3}\\), goes as A itself. A statement that the volume is proportional to \\(A^{1/3}\\) is false.",
        },
        {
          title: "Density does not depend on A",
          body: "A heavy nucleus is not denser than a light one. The A in the mass cancels the A in the volume, so every nucleus has about the same density.",
        },
        {
          title: "Cube root one way, cube the other way",
          body: "Going from mass numbers to radii, take the cube root of the ratio. Going from radii to mass numbers, cube the ratio: twice the radius means eight times the mass number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphnu-mass-defect",
      name: "Mass defect, binding energy and the nuclear force",
      intuition:
        "Weigh the free protons and neutrons, then weigh the nucleus they make: the nucleus is lighter. The missing mass left as energy when the nucleus formed, by E = mc². To pull the nucleus apart you must put that energy back. That energy is the binding energy, and the force that holds the nucleons together is the strong, short-range nuclear force.",
      definition:
        "- Mass defect: \\(\\Delta M = [Zm_p + (A - Z)m_n] - M\\), the mass of the free nucleons minus the mass M of the nucleus.\n" +
        "- Binding energy: \\(E_b = \\Delta M c^{2}\\). With masses in u, use \\(1\\ \\text{u} = 931.5\\ \\text{MeV}/c^{2}\\) (\\(1\\ \\text{u} = 1.66 \\times 10^{-27}\\) kg).\n" +
        "- Any mass m is equivalent to energy \\(mc^{2}\\): 1 g of mass is \\(9 \\times 10^{13}\\) J.\n" +
        "- **Binding energy per nucleon** \\(E_{bn} = E_b/A\\) tells how tightly a nucleus is held. Compare stability with it, not with the total.\n" +
        "- The curve of \\(E_{bn}\\) against A: low for light nuclei, nearly constant at about 8 MeV for \\(30 < A < 170\\), highest (about 8.75 MeV) near \\(A = 56\\), iron, and down to about 7.6 MeV at \\(A = 238\\).\n" +
        "- **Nuclear force:** much stronger than the Coulomb force, short ranged (a few fm), attractive beyond about 0.8 fm and strongly repulsive closer. It is about the same between two neutrons, two protons or a neutron and a proton: it does not depend on charge.",
      formula: {
        label: "Binding energy",
        latex: "\\Delta M = Zm_p + (A - Z)m_n - M, \\qquad E_b = \\Delta M c^{2}, \\qquad 1\\ \\text{u}\\,c^{2} = 931.5\\ \\text{MeV}",
      },
      authoredExample: {
        prompt:
          "A proton has mass 1.00728 u, a neutron 1.00866 u and a deuteron 2.01355 u. Find the binding energy of the deuteron and its binding energy per nucleon. (1 u = 931.5 MeV/\\(c^{2}\\))",
        steps: [
          "Free nucleons: \\(1.00728 + 1.00866 = 2.01594\\) u.",
          "\\(\\Delta M = 2.01594 - 2.01355 = 0.00239\\) u.",
          "\\(E_b = 0.00239 \\times 931.5 = 2.23\\) MeV.",
          "Per nucleon: \\(\\dfrac{2.23}{2} = 1.11\\) MeV.",
        ],
        answer: "About 2.23 MeV; about 1.11 MeV per nucleon",
      },
      selfCheckExample: {
        prompt:
          "The mass defect of a \\(^{4}_{2}\\text{He}\\) nucleus is 0.0304 u. What is its binding energy per nucleon? (1 u = 931.5 MeV/\\(c^{2}\\))",
        steps: [
          "\\(E_b = 0.0304 \\times 931.5 = 28.3\\) MeV.",
          "Four nucleons: \\(\\dfrac{28.3}{4} = 7.08\\) MeV.",
        ],
        answer: "About 7.08 MeV",
      },
      practiceSet: [
        { prompt: "What is the energy equivalent of 1 g of matter?", answer: "\\(9 \\times 10^{13}\\) J" },
        { prompt: "Near which mass number is the binding energy per nucleon largest?", answer: "About 56 (iron)" },
        { prompt: "At the same short separation, how does the nuclear force between two protons compare with that between two neutrons?", answer: "It is about the same" },
        { prompt: "A nucleus of \\(^{16}_{8}\\text{O}\\) has mass M. Write its binding energy in terms of \\(m_p\\), \\(m_n\\) and M.", answer: "\\((8m_p + 8m_n - M)c^{2}\\)" },
      ],
      pyqExampleId: "97046830-f8f6-4715-9383-77c292d104fb",
      traps: [
        {
          title: "The mass defect compares a nucleus with its free nucleons",
          body: "The mass defect is the free protons and neutrons minus the nucleus. The difference between an atom and its nucleus is just the mass of the electrons, and that is not the mass defect.",
        },
        {
          title: "Free nucleons are the heavier side",
          body: "Write the defect as (free nucleons) minus (nucleus). The other way round gives a negative binding energy.",
        },
        {
          title: "Stability is judged per nucleon",
          body: "A bigger nucleus nearly always has a bigger total binding energy. To say which nucleus is more stable, compare the binding energy per nucleon.",
        },
        {
          title: "Heavier is not always more tightly bound",
          body: "The binding energy per nucleon rises only up to about \\(A = 56\\) and then falls slowly. A claim that it keeps growing with mass number is false.",
        },
      ],
    },
  ],
};
