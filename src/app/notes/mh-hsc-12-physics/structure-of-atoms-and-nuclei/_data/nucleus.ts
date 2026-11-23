import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AN_NUCLEUS_NOTE: SubtopicNote = {
  subtopicName: "Atomic Nucleus: Constituents, Size and Forces",
  title: "The Nucleus: Constituents, Size and Forces",
  oneLineDefinition:
    "What a nucleus is made of, isotopes, isobars and isotones, the unified atomic mass unit, how the radius of a nucleus grows with its mass number, why every nucleus has the same density, and the nuclear force that holds it together.",
  whyItMatters:
    "4 questions. One was set in a board paper: name atoms with the same number of protons but different numbers of neutrons (2024, a one-mark MCQ). The textbook adds the radius and density of a germanium nucleus, why density does not depend on the mass number, and finding the abundances of magnesium's isotopes from its average atomic mass.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpan-constituents",
      name: "Nucleons, isotopes, isobars and isotones",
      intuition:
        "A nucleus is built from protons and neutrons, together called nucleons. The number of protons decides which element it is. The neutrons can vary, so one element can come in several varieties of different mass. Three words name the three ways two nuclei can match: same protons, same total nucleons, or same neutrons.",
      definition:
        "- **Atomic number Z:** number of protons (equal to the number of electrons in the neutral atom). **Neutron number N.** **Mass number A = Z + N**, the total number of nucleons. A nucleus is written \\(^{A}_{Z}X\\).\n" +
        "- **Unified atomic mass unit:** 1 u is one twelfth of the mass of a neutral carbon-12 atom, \\(1\\) u \\(= 1.66 \\times 10^{-27}\\) kg, equivalent to 931.5 MeV/c².\n" +
        "- In energy units: proton 938.28 MeV/c², neutron 939.57 MeV/c², electron 0.511 MeV/c².\n" +
        "- **Average atomic mass** of an element = the abundance-weighted mean of its isotopes' masses; the abundances add up to 1 (100%).",
      table: {
        columns: ["Name", "Same", "Different", "Example"],
        rows: [
          {
            cells: ["Isotopes", "Atomic number Z (protons)", "Neutron number N and mass number A", "¹H, ²H (deuterium), ³H (tritium)"],
            pyqExampleId: "5008fb21-b1a2-49c3-b2dd-54208048d9c4",
            noteAmber: "Board 2024 asked for this name as a one-mark MCQ.",
          },
          { cells: ["Isobars", "Mass number A", "Atomic number Z and neutron number N", "³H and ³He"] },
          { cells: ["Isotones", "Neutron number N", "Atomic number Z and mass number A", "³H and ⁴He"] },
        ],
      },
      practiceSet: [
        { prompt: "How many neutrons does the nucleus \\(^{235}_{92}\\text{U}\\) contain?", answer: "143" },
        { prompt: "Are \\(^{14}_{6}\\text{C}\\) and \\(^{14}_{7}\\text{N}\\) isotopes, isobars or isotones?", answer: "Isobars (same mass number 14)" },
        { prompt: "What is 1 u in MeV/c²?", answer: "931.5 MeV/c²" },
      ],
      traps: [
        {
          title: "Swapping isotopes and isobars",
          body: "Isotopes share the atomic number (same element); isobars share the mass number (different elements). A memory hook: isotopes, same protons (both have a p).",
        },
        {
          title: "Taking the mass number as the mass",
          body: "A is a count of nucleons, a whole number. The mass of the nucleus in u is close to A but not equal to it, and that small difference is the mass defect.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpan-nuclear-size",
      name: "Size, density and the nuclear force",
      intuition:
        "Nucleons pack together like marbles in a bag: each takes up about the same room. So the volume of a nucleus grows in step with A, and the radius grows only as the cube root of A. Because mass and volume both grow as A, the density comes out the same for every nucleus, and it is enormous. What holds the protons together against their repulsion is the nuclear force, very strong but felt only over a few femtometres.",
      definition:
        "- **Radius:** \\(R = R_0 A^{1/3}\\), with \\(R_0 = 1.2 \\times 10^{-15}\\) m (1.2 fm).\n" +
        "- **Volume:** \\(\\dfrac{4}{3}\\pi R^3 = \\dfrac{4}{3}\\pi R_0^3 A\\), so volume \\(\\propto A\\).\n" +
        "- **Density:** \\(\\rho = \\dfrac{mA}{\\frac{4}{3}\\pi R_0^3 A} = \\dfrac{3m}{4\\pi R_0^3}\\), where m is the mass of a nucleon. A cancels, so every nucleus has about the same density, \\(2.3 \\times 10^{17}\\) kg/m³. (Osmium, the densest element, is only \\(2.2 \\times 10^4\\) kg/m³.)\n" +
        "- **Nuclear force:** (1) the strongest force between subatomic particles, about 50 to 60 times the electrostatic force; (2) very short range, a few fm, negligible beyond; (3) independent of charge: the same between two protons, two neutrons, or a proton and a neutron at the same separation. It is mostly attractive, and it overcomes the repulsion between the protons.",
      formula: {
        label: "Radius and density of a nucleus",
        latex: "R = R_0 A^{1/3}, \\qquad \\rho = \\frac{3m}{4\\pi R_0^3}",
        symbols: [
          { symbol: "\\(R_0\\)", meaning: "1.2 × 10⁻¹⁵ m (1.2 fm)" },
          { symbol: "\\(A\\)", meaning: "mass number" },
          { symbol: "\\(m\\)", meaning: "mass of one nucleon" },
        ],
      },
      authoredExample: {
        prompt: "Find the radii of the nuclei \\(^{27}\\text{Al}\\) and \\(^{216}\\text{Po}\\). (\\(R_0 = 1.2\\) fm)",
        steps: [
          "Given: \\(A = 27\\) and \\(A = 216\\); \\(R_0 = 1.2\\) fm.",
          "Formula: \\(R = R_0 A^{1/3}\\).",
          "Aluminium: \\(27^{1/3} = 3\\), so \\(R = 1.2 \\times 3 = 3.6\\) fm \\(= 3.6 \\times 10^{-15}\\) m.",
          "Polonium: \\(216^{1/3} = 6\\), so \\(R = 1.2 \\times 6 = 7.2\\) fm. Eight times the nucleons, only twice the radius.",
        ],
        answer: "3.6 fm and 7.2 fm",
      },
      selfCheckExample: {
        prompt: "Find the ratio of the radii of two nuclei of mass numbers 8 and 125.",
        steps: ["\\(\\dfrac{R_1}{R_2} = \\left(\\dfrac{8}{125}\\right)^{1/3}\\).", "\\(= \\dfrac{2}{5}\\)."],
        answer: "2 : 5",
      },
      practiceSet: [
        { prompt: "The radius of a nucleus is 3R₀. What is its mass number?", answer: "27" },
        { prompt: "How does the volume of a nucleus depend on its mass number A?", answer: "It is directly proportional to A" },
        { prompt: "State two properties of the nuclear force.", answer: "Any two: strongest force (about 50 to 60 times the electrostatic force); range of a few fm; independent of charge" },
      ],
      pyqExampleId: "383cdea8-ce67-4240-92b7-42a3d95614a6",
      traps: [
        {
          title: "Taking the radius proportional to A",
          body: "It is the cube root: \\(R \\propto A^{1/3}\\). It is the volume that is proportional to A.",
        },
        {
          title: "Saying the nuclear force acts only on protons",
          body: "It acts between all nucleons and does not depend on charge: proton and proton, neutron and neutron, proton and neutron alike.",
        },
      ],
    },
  ],
};
