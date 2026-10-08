import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ATS_ISOTOPES_NOTE: SubtopicNote = {
  subtopicName: "Isotopes and Atomic Mass",
  title: "Isotopes and Relative Atomic Mass",
  oneLineDefinition:
    "Isotopes are atoms of one element with different numbers of neutrons; the relative atomic mass is the abundance-weighted average of their masses.",
  whyItMatters:
    "Isotopes turn up inside the counting questions (an oxygen isotope in 2017, a bromine isotope in 2022), and the 2019 paper asked for the relative atomic mass of a mixture of two hydrogen isotopes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ats-isotope-facts",
      name: "Isotopes: same element, different number of neutrons",
      intuition:
        "Chemistry is decided by electrons, and the number of electrons in a neutral atom equals the number of protons. Extra neutrons add mass but no charge, so they change almost nothing chemically. That is why isotopes of an element react in the same way but have different masses.",
      definition:
        "**Isotopes** are atoms with the same atomic number \\(Z\\) but different mass numbers \\(A\\), so different numbers of neutrons.\n" +
        "- Same number of protons and electrons, same electron configuration, same **chemical** properties.\n" +
        "- Different mass, so slightly different **physical** properties (density, rate of diffusion).\n" +
        "- Some isotopes are **radioactive** (tritium, carbon-14), most are stable.\n" +
        "- An isotope is named by its mass number: chlorine-37 or \\({}^{37}\\mathrm{Cl}\\).",
      table: {
        columns: ["Isotope", "Protons", "Neutrons", "Note"],
        rows: [
          { cells: ["Hydrogen-1 (protium)", "1", "0", "Over 99.9% of natural hydrogen; the only atom with no neutron"] },
          { cells: ["Hydrogen-2 (deuterium, D)", "1", "1", "Stable; \\(\\mathrm{D_2O}\\) is heavy water"] },
          { cells: ["Hydrogen-3 (tritium, T)", "1", "2", "Radioactive (beta emitter)"] },
          { cells: ["Carbon-12", "6", "6", "Defines the atomic mass scale: exactly 12"] },
          { cells: ["Carbon-14", "6", "8", "Radioactive; used to date once-living material"] },
          { cells: ["Chlorine-35", "17", "18", "About 75% of natural chlorine"] },
          { cells: ["Chlorine-37", "17", "20", "About 25% of natural chlorine"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which property is different for atoms of chlorine-35 and chlorine-37?",
        options: [
          "The number of protons",
          "The electron configuration",
          "The way they react with sodium",
          "The number of electrons in the neutral atom",
          "The number of neutrons",
        ],
        steps: [
          "Both are chlorine, so both have 17 protons and, as neutral atoms, 17 electrons in the same configuration.",
          "Same electrons means the same chemistry, so they react with sodium in the same way.",
          "Only the mass number differs: \\(35 - 17 = 18\\) neutrons against \\(37 - 17 = 20\\).",
        ],
        answer: "(E) The number of neutrons",
      },
      practiceSet: [
        { prompt: "How many neutrons are in a tritium atom?", answer: "2", method: "\\(3 - 1\\)" },
        { prompt: "Are \\({}^{14}_{6}\\mathrm{C}\\) and \\({}^{14}_{7}\\mathrm{N}\\) isotopes?", answer: "No: they have different atomic numbers, so they are different elements" },
        { prompt: "What is the relative molecular mass of heavy water, \\(\\mathrm{D_2O}\\)? (Take D = 2, O = 16.)", answer: "20", method: "\\(2 \\times 2 + 16\\)" },
      ],
      traps: [
        {
          title: "Same mass number does not make two atoms isotopes",
          body: "Isotopes share the atomic number, not the mass number. Carbon-14 and nitrogen-14 have the same mass number but are different elements. Two atoms with the same \\(Z\\) and different \\(A\\) are isotopes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-relative-atomic-mass",
      name: "Relative atomic mass from isotope abundances",
      intuition:
        "A sample of an element is a mixture of its isotopes, so its average atom is a weighted mix. Each isotope pulls the average towards its own mass in proportion to how common it is. The result always lies between the lightest and heaviest isotope, closer to the more abundant one.",
      definition:
        "The **relative atomic mass** \\(A_r\\) is the average mass of the atoms of an element, weighted by abundance, on a scale where one atom of carbon-12 is exactly 12.\n" +
        "- It has **no units** (it is a ratio).\n" +
        "- It is usually not a whole number, because it averages several isotopes.\n" +
        "- For a diatomic gas, the relative **molecular** mass is twice \\(A_r\\) (\\(\\mathrm{Cl_2}\\): 71), but \\(A_r\\) itself is per atom.\n" +
        "- With two isotopes you can also work backwards: from \\(A_r\\) to the abundances.",
      formula: {
        label: "Relative atomic mass",
        latex: "A_r = \\frac{\\sum (\\text{isotope mass} \\times \\%\\ \\text{abundance})}{100}",
        symbols: [
          { symbol: "isotope mass", meaning: "relative mass of each isotope, close to its mass number" },
          { symbol: "% abundance", meaning: "percentage of atoms of that isotope in the natural element" },
        ],
      },
      authoredExample: {
        prompt:
          "Natural chlorine is 75% chlorine-35 and 25% chlorine-37. Find its relative atomic mass.",
        steps: [
          "\\(A_r = (35 \\times 75 + 37 \\times 25) / 100\\).",
          "\\(= (2625 + 925) / 100 = 3550 / 100 = 35.5\\).",
          "Check: 35.5 lies between 35 and 37, nearer 35, which is the more common isotope.",
        ],
        answer: "35.5",
      },
      selfCheckExample: {
        prompt:
          "Natural boron contains 20% boron-10 and 80% boron-11. What is the relative atomic mass of boron?",
        options: ["10.2", "10.5", "10.8", "11.0", "21.0"],
        steps: [
          "\\(A_r = (10 \\times 20 + 11 \\times 80) / 100 = (200 + 880) / 100 = 10.8\\).",
          "A swaps the abundances. B is the plain average of 10 and 11, which ignores abundance.",
          "D rounds to the heavier isotope. E adds the two masses without weighting.",
        ],
        answer: "(C) 10.8",
      },
      practiceSet: [
        { prompt: "Neon is 90% neon-20 and 10% neon-22. Find its relative atomic mass.", answer: "20.2", method: "\\((20 \\times 90 + 22 \\times 10)/100\\)" },
        {
          prompt: "Copper has isotopes of mass 63 and 65 and a relative atomic mass of 63.55. What percentage is copper-63?",
          answer: "72.5%",
          method: "Let \\(x\\) be the fraction of copper-63: \\(63x + 65(1 - x) = 63.55\\), so \\(x = 1.45/2\\)",
        },
        { prompt: "Gallium has isotopes of mass 69 and 71, and \\(A_r = 69.7\\). Which isotope is more abundant?", answer: "Gallium-69", method: "The average lies nearer 69" },
      ],
      traps: [
        {
          title: "A simple average ignores abundance",
          body: "The relative atomic mass is a WEIGHTED average. Only when the two isotopes are equally common does it equal the simple average of their masses. An option exactly halfway between two isotope masses is a trap unless the abundances are equal.",
        },
        {
          title: "Relative atomic mass is per atom, not per molecule",
          body: "For hydrogen, chlorine or any diatomic gas, the relative atomic mass refers to one atom. Doubling it gives the relative molecular mass of the gas. Check which one the question asks for before choosing.",
        },
      ],
    },
  ],
};
