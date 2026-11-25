import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_NU_SIZE_NOTE: SubtopicNote = {
  subtopicName: "Size of the Nucleus",
  title: "Size of the Nucleus",
  oneLineDefinition:
    "How the size of a nucleus is measured, the relation R = R₀A^(1/3) between its radius and mass number, and the proof that nuclear density is the same for every nucleus.",
  whyItMatters:
    "16 questions, thirteen of them from board papers. The proof that nuclear density does not depend on the mass number is the most repeated derivation of the chapter: three 2023 papers, one in 2024 and two in 2026 asked it. The board also asks the ratio of the radii of two nuclei (2023, 2025, 2026), how nuclear density depends on A or the ratio of two densities (three MCQs in 2023), the radius of the nucleus with A = 125 (2026), how the size of a nucleus is found by experiment (2023) and why a nucleus is so much denser than its atom (2024). The textbook adds the density of an iron nucleus, the ratio of the radii of gold and silver nuclei, and the same density proof.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpnu-radius",
      name: "Nuclear radius and mass number",
      intuition:
        "Nucleons pack together like marbles in a bag, each taking up the same small volume. So the volume of a nucleus grows in step with the number of nucleons A, and the radius grows only as the cube root of A. Eight times the nucleons gives just twice the radius.",
      definition:
        "- **How the size is found:** in the Geiger and Marsden experiment, alpha particles of 5.5 MeV came no closer than about \\(4.0 \\times 10^{-14}\\) m to a gold nucleus, so the nucleus must be smaller than that. With faster alpha particles the scattering stops following Rutherford's Coulomb-only calculation once the nuclear force acts, and the distance where this starts gives the size. Accurate sizes come from **scattering fast electrons** off targets.\n" +
        "- **Result:** \\(R = R_0 A^{1/3}\\), with \\(R_0 = 1.2 \\times 10^{-15}\\) m \\(= 1.2\\) fm (1 fm \\(= 10^{-15}\\) m).\n" +
        "- The radius depends on the mass number only, not on Z. Two different nuclei with the same A (isobars) have the same radius.\n" +
        "- For a ratio, \\(R_0\\) cancels: \\(\\dfrac{R_1}{R_2} = \\left(\\dfrac{A_1}{A_2}\\right)^{1/3}\\). Volume goes as \\(R^3\\), so \\(\\dfrac{V_1}{V_2} = \\dfrac{A_1}{A_2}\\).",
      formula: {
        label: "Nuclear radius",
        latex: "R = R_0 A^{1/3}, \\qquad R_0 = 1.2\\ \\text{fm}, \\qquad \\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3}",
        symbols: [
          { symbol: "\\(R\\)", meaning: "radius of the nucleus" },
          { symbol: "\\(A\\)", meaning: "mass number (number of nucleons)" },
          { symbol: "\\(R_0\\)", meaning: "a constant, the same for all nuclei, 1.2 fm" },
        ],
      },
      authoredExample: {
        prompt: "The radius of a nucleus is 3.6 fm. Taking \\(R_0 = 1.2\\) fm, find its mass number.",
        steps: [
          "Given: \\(R = 3.6\\) fm, \\(R_0 = 1.2\\) fm.",
          "Formula: \\(R = R_0 A^{1/3}\\), so \\(A^{1/3} = \\dfrac{R}{R_0}\\).",
          "\\(A^{1/3} = \\dfrac{3.6}{1.2} = 3\\).",
          "\\(A = 3^3 = 27\\).",
        ],
        answer: "A = 27 (an aluminium nucleus)",
      },
      selfCheckExample: {
        prompt: "Which nucleus has a radius twice that of \\({}^{7}_{3}\\text{Li}\\)? Give its mass number.",
        steps: [
          "\\(\\dfrac{R}{R_{\\text{Li}}} = 2 = \\left(\\dfrac{A}{7}\\right)^{1/3}\\).",
          "\\(\\dfrac{A}{7} = 2^3 = 8\\), so \\(A = 56\\).",
        ],
        answer: "A = 56, an iron nucleus",
      },
      practiceSet: [
        { prompt: "Find the ratio of the volumes of two nuclei of mass numbers 8 and 64.", answer: "1 : 8, since volume is proportional to A" },
        { prompt: "Find the ratio of the radii of two nuclei of mass numbers 1 and 1000.", answer: "1 : 10" },
        { prompt: "Two nuclei have the same mass number but different atomic numbers. Compare their radii.", answer: "Equal, because the radius depends only on A" },
      ],
      pyqExampleId: "5c6165b8-e9c2-4137-9507-ac936a734e54",
      traps: [
        {
          title: "Using the atomic number",
          body: "The radius depends on A only. In \\({}^{A}_{Z}\\text{X}\\) the lower number Z is there to name the element; putting Z into \\(R = R_0 A^{1/3}\\) is the distractor the board builds its options on.",
        },
        {
          title: "Forgetting the cube root",
          body: "The ratio of radii is \\((A_1/A_2)^{1/3}\\), not \\(A_1/A_2\\). The plain ratio of mass numbers is the ratio of VOLUMES.",
        },
        {
          title: "No value of R₀ and no unit",
          body: "Write \\(R_0 = 1.2\\) fm \\(= 1.2 \\times 10^{-15}\\) m with your working and give the radius in fm or m. A bare number loses the mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpnu-density",
      name: "Nuclear density is the same for all nuclei",
      intuition:
        "Both the mass and the volume of a nucleus are proportional to A, so their ratio cannot depend on A. Every nucleus, from hydrogen to uranium, is a drop of the same incredibly dense matter. An atom is mostly empty space, which is why ordinary matter is so much lighter.",
      definition:
        "**Proof that nuclear density does not depend on A** (one step a line):\n" +
        "- Mass of the nucleus: \\(M = A m\\), where \\(m\\) is the mass of one nucleon (the mass defect is too small to matter here).\n" +
        "- Radius: \\(R = R_0 A^{1/3}\\).\n" +
        "- Volume: \\(V = \\dfrac{4}{3}\\pi R^3 = \\dfrac{4}{3}\\pi \\left(R_0 A^{1/3}\\right)^3 = \\dfrac{4}{3}\\pi R_0^3 A\\).\n" +
        "- Density: \\(\\rho = \\dfrac{M}{V} = \\dfrac{A m}{\\frac{4}{3}\\pi R_0^3 A} = \\dfrac{3m}{4\\pi R_0^3}\\).\n" +
        "- \\(m\\) and \\(R_0\\) are constants and A has cancelled, so \\(\\rho\\) is the same for all nuclei.\n" +
        "- Its value is about \\(2.3 \\times 10^{17}\\ \\text{kg m}^{-3}\\), against \\(10^{3}\\ \\text{kg m}^{-3}\\) for water. Matter in neutron stars has a density comparable to this.\n" +
        "- The density of an ATOM does not follow this rule: an atom is mostly empty space, and nearly all its mass sits in the tiny nucleus.",
      formula: {
        label: "Nuclear density",
        latex: "\\rho = \\frac{Am}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3m}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17}\\ \\text{kg m}^{-3}",
        symbols: [
          { symbol: "\\(m\\)", meaning: "mass of one nucleon, about 1.67 × 10⁻²⁷ kg" },
          { symbol: "\\(R_0\\)", meaning: "the constant in R = R₀A^(1/3), 1.2 × 10⁻¹⁵ m" },
        ],
      },
      authoredExample: {
        prompt:
          "Taking the mass of a nucleon as \\(1.67 \\times 10^{-27}\\) kg and \\(R_0 = 1.2 \\times 10^{-15}\\) m, find the value of the density of nuclear matter.",
        steps: [
          "Given: \\(m = 1.67 \\times 10^{-27}\\) kg, \\(R_0 = 1.2 \\times 10^{-15}\\) m.",
          "Formula: \\(\\rho = \\dfrac{3m}{4\\pi R_0^3}\\).",
          "\\(R_0^3 = 1.728 \\times 10^{-45}\\ \\text{m}^3\\), so \\(4\\pi R_0^3 = 2.17 \\times 10^{-44}\\ \\text{m}^3\\).",
          "\\(\\rho = \\dfrac{3 \\times 1.67 \\times 10^{-27}}{2.17 \\times 10^{-44}} = \\dfrac{5.01 \\times 10^{-27}}{2.17 \\times 10^{-44}}\\).",
          "\\(\\rho = 2.3 \\times 10^{17}\\ \\text{kg m}^{-3}\\).",
        ],
        answer: "\\(\\rho \\approx 2.3 \\times 10^{17}\\ \\text{kg m}^{-3}\\), the same for every nucleus",
      },
      selfCheckExample: {
        prompt: "Two nuclei have mass numbers 1 and 216. Find the ratio of their nuclear densities.",
        steps: ["Nuclear density does not depend on A.", "So the ratio is 1 : 1, whatever the mass numbers."],
        answer: "1 : 1",
      },
      practiceSet: [
        { prompt: "About how many times denser than water is nuclear matter?", answer: "About \\(2.3 \\times 10^{14}\\) times (\\(2.3 \\times 10^{17}\\) against \\(10^{3}\\ \\text{kg m}^{-3}\\))" },
        { prompt: "Why is the density of a nucleus much greater than the density of the atom it belongs to?", answer: "Almost all the mass of the atom is in the nucleus, but the nucleus is about \\(10^{4}\\) times smaller in radius; the rest of the atom is mostly empty space" },
        { prompt: "Name an astronomical object whose matter has a density comparable to nuclear density.", answer: "A neutron star" },
      ],
      pyqExampleId: "ac322783-5944-4e02-b216-14709765002c",
      traps: [
        {
          title: "Skipping the cube step",
          body: "The mark is for showing \\((R_0 A^{1/3})^3 = R_0^3 A\\), so the volume is proportional to A. Writing \"so the density is constant\" without that line is not a proof.",
        },
        {
          title: "Saying density increases with A",
          body: "A bigger nucleus is bigger, not denser. Mass and volume both go up in proportion to A, so the density stays the same.",
        },
        {
          title: "Applying the rule to atoms",
          body: "Only NUCLEAR density is independent of A. The density of atoms and of ordinary matter varies widely, because atoms are mostly empty space.",
        },
      ],
    },
  ],
};
