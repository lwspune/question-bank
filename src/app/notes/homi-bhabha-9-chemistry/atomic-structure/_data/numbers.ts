import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AT_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Atomic Number, Mass Number and Isotopes",
  title: "Atomic Number, Mass Number and Isotopes",
  oneLineDefinition:
    "The atomic number is the number of protons (and of electrons in a neutral atom), the mass number is protons plus neutrons, and isotopes are atoms of one element with different numbers of neutrons.",
  whyItMatters:
    "Four questions in the bank, all EASY: one names the element from its atomic number, one asks which statements about atomic and mass number are true, and two are about isotopes (hydrogen, deuterium and tritium, and two oxygen atoms with 8 and 10 neutrons).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9atnu-numbers",
      name: "Atomic number and mass number",
      intuition:
        "Every element has its own number of protons: hydrogen 1, carbon 6, oxygen 8. That number is the atomic number, and it decides which element an atom is. Add the neutrons to the protons and you get the mass number, because protons and neutrons carry almost all the mass.",
      definition:
        "- **Atomic number (Z)** = number of **protons**. In a **neutral atom** it also equals the number of **electrons**.\n" +
        "- **Mass number (A)** = number of **protons + neutrons**.\n" +
        "- So **neutrons = A − Z**.\n" +
        "- In the symbol \\({}^{A}_{Z}\\mathrm{X}\\) the **upper** number is the mass number and the **lower** number is the atomic number.\n" +
        "- Atomic numbers 1 to 20: H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar, K, Ca.",
      formula: {
        label: "Atomic and mass number",
        latex: "Z = p = e \\;(\\text{neutral atom}) \\qquad A = p + n \\qquad n = A - Z",
        symbols: [
          { symbol: "Z", meaning: "atomic number" },
          { symbol: "A", meaning: "mass number" },
          { symbol: "p, n, e", meaning: "numbers of protons, neutrons and electrons" },
        ],
      },
      authoredExample: {
        prompt: "An atom of phosphorus is written \\({}^{31}_{15}\\mathrm{P}\\). How many protons, electrons and neutrons does it have?",
        steps: [
          "The lower number is the atomic number: 15 protons.",
          "A neutral atom has as many electrons as protons: 15 electrons.",
          "Neutrons \\(= A - Z = 31 - 15 = 16\\).",
        ],
        answer: "15 protons, 15 electrons, 16 neutrons",
      },
      selfCheckExample: {
        prompt: "An atom has 20 protons and 20 neutrons. What are its atomic number and mass number, and which element is it?",
        steps: ["Atomic number = protons = 20.", "Mass number = 20 + 20 = 40.", "The element with atomic number 20 is calcium."],
        answer: "Atomic number 20, mass number 40: calcium",
      },
      practiceSet: [
        { prompt: "An atom has mass number 23 and atomic number 11. How many neutrons does it have?", answer: "12" },
        { prompt: "Which element has atomic number 17?", answer: "Chlorine" },
        { prompt: "A neutral atom has 9 electrons and 10 neutrons. What is its mass number?", answer: "19" },
        { prompt: "In the symbol of an atom, is the atomic number written above or below?", answer: "Below; the mass number is written above" },
      ],
      pyqExampleId: "91b04646-303c-42e3-87cd-84e154a801f5",
      traps: [
        {
          title: "Adding electrons to get the atomic number",
          body: "The atomic number is the number of protons alone. Protons plus neutrons is the mass number.",
        },
        {
          title: "Reading the upper number as the atomic number",
          body: "In \\({}^{A}_{Z}\\mathrm{X}\\) the upper number is the mass number. The lower one, the atomic number, names the element.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9atnu-isotopes",
      name: "Isotopes and isobars",
      intuition:
        "Two atoms with the same number of protons are the same element, even if one carries a couple of extra neutrons. They react the same way, because reactions depend on electrons, but the heavier one weighs more. Those are isotopes. Atoms of different elements that happen to share a mass number are isobars.",
      definition:
        "- **Isotopes**: atoms of the **same element** with the **same atomic number** but **different mass numbers** (different numbers of neutrons).\n" +
        "- Isotopes have the **same chemical properties** (same electrons) but **different physical properties** such as mass and density.\n" +
        "- **Isobars**: atoms of **different elements** with the **same mass number** but different atomic numbers.\n" +
        "- Hydrogen has three isotopes: **protium** (H, 0 neutrons), **deuterium** (D, 1 neutron) and **tritium** (T, 2 neutrons).",
      table: {
        columns: ["Term", "Same", "Different", "Examples"],
        rows: [
          { cells: ["Isotopes", "Atomic number (same element)", "Mass number (neutrons)", "H, D, T; \\({}^{12}_{6}\\mathrm{C}\\) and \\({}^{14}_{6}\\mathrm{C}\\);\\({}^{35}_{17}\\mathrm{Cl}\\) and \\({}^{37}_{17}\\mathrm{Cl}\\)"] },
          { cells: ["Isobars", "Mass number", "Atomic number (different elements)", "\\({}^{40}_{18}\\mathrm{Ar}\\) and \\({}^{40}_{20}\\mathrm{Ca}\\); \\({}^{14}_{6}\\mathrm{C}\\) and \\({}^{14}_{7}\\mathrm{N}\\)"] },
        ],
        caption: "Isotopes: same place in the periodic table. Isobars: same weight, different elements.",
      },
      selfCheckExample: {
        prompt: "Carbon-12 and carbon-14 both have 6 protons. Are they isotopes or isobars, and do they react differently?",
        steps: ["Same atomic number, different mass numbers: isotopes.", "They have the same electrons, so their chemical properties are the same."],
        answer: "Isotopes; they react the same way, though carbon-14 is heavier.",
      },
      practiceSet: [
        { prompt: "How many neutrons does tritium have?", answer: "2" },
        { prompt: "What is the same in two isobars?", answer: "Their mass number" },
        { prompt: "Do isotopes of an element have the same or different chemical properties?", answer: "The same" },
        { prompt: "Are argon-40 and calcium-40 isotopes or isobars?", answer: "Isobars" },
      ],
      pyqExampleId: "cebc4c27-21a2-428b-be15-656b97d83c80",
      traps: [
        {
          title: "Saying isotopes differ in chemical properties",
          body: "Isotopes have the same number of electrons, so they react the same way. Only physical properties such as mass and density differ.",
        },
        {
          title: "Mixing up isotopes and isobars",
          body: "Isotopes share the atomic number (one element). Isobars share the mass number (different elements).",
        },
      ],
    },
  ],
};
