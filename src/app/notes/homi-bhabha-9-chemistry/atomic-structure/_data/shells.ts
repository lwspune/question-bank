import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AT_SHELLS_NOTE: SubtopicNote = {
  subtopicName: "Electron Shells and Ions",
  title: "Electron Shells and Ions",
  oneLineDefinition:
    "Electrons fill the shells K, L, M and N in order, at most 2n² in shell n; the electrons in the outermost shell are the valence electrons, and an atom becomes an ion by losing or gaining electrons while its protons stay the same.",
  whyItMatters:
    "Six questions in the bank, two EASY and four MODERATE. Three ask for the electrons in one shell or the valence electrons (zinc's N shell, the L shell of atomic numbers 18 to 20, three elements given as Z + 4, Z and Z − 8), and three count the particles of an ion or compare two ions with the same electrons.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9atsh-config",
      name: "Electronic configuration and valence electrons",
      intuition:
        "Electrons fill the shells from the inside out, like people filling the front rows of a hall first. The first shell takes only 2, the second 8. For the first twenty elements, the third shell stops at 8 and the fourth begins. The electrons left in the last shell, the valence electrons, decide how the atom reacts.",
      definition:
        "- The shells, from the nucleus outwards, are **K, L, M, N** (n = 1, 2, 3, 4).\n" +
        "- A shell can hold at most **2n²** electrons: K **2**, L **8**, M **18**, N **32**.\n" +
        "- For atomic numbers up to 20, the M shell takes only 8 before the N shell starts: potassium (19) is 2, 8, 8, 1 and calcium (20) is 2, 8, 8, 2.\n" +
        "- Heavier atoms fill M up to 18: zinc (30) is **2, 8, 18, 2**.\n" +
        "- **Valence electrons** are the electrons in the **outermost** shell.",
      formula: {
        label: "Most electrons in a shell",
        latex: "N_{max} = 2n^2",
        symbols: [
          { symbol: "n", meaning: "shell number: 1 for K, 2 for L, 3 for M, 4 for N" },
          { symbol: "Nmax", meaning: "the largest number of electrons the shell can hold" },
        ],
      },
      authoredExample: {
        prompt: "Write the electronic configurations of the elements with atomic numbers 17 and 19, and give the valence electrons of each.",
        steps: [
          "17: K takes 2, L takes 8, and the remaining 7 go to M: 2, 8, 7. Valence electrons 7.",
          "19: 2, 8, 8 fills K, L and M up to 8, and the last electron starts N: 2, 8, 8, 1. Valence electrons 1.",
        ],
        answer: "17: 2, 8, 7 (7 valence electrons); 19: 2, 8, 8, 1 (1 valence electron)",
      },
      selfCheckExample: {
        prompt: "What is the electronic configuration of the element with atomic number 15, and how many valence electrons does it have?",
        steps: ["K takes 2, L takes 8, and the remaining 5 go to M."],
        answer: "2, 8, 5; 5 valence electrons",
      },
      practiceSet: [
        { prompt: "What is the largest number of electrons the M shell can hold?", answer: "\\(2 \\times 3^2 = 18\\)" },
        { prompt: "How many electrons are in the L shell of the element with atomic number 13?", answer: "8 (its configuration is 2, 8, 3)" },
        { prompt: "Which element has the configuration 2, 8, 6?", answer: "Sulphur (atomic number 16)" },
        { prompt: "How many valence electrons does magnesium (atomic number 12) have?", answer: "2 (its configuration is 2, 8, 2)" },
      ],
      pyqExampleId: "8104861d-08fd-4255-97b6-87dabff3f90a",
      traps: [
        {
          title: "Putting a ninth electron into M for potassium",
          body: "For atomic numbers 19 and 20 the extra electrons go to the N shell: potassium is 2, 8, 8, 1, not 2, 8, 9.",
        },
        {
          title: "Counting all electrons as valence electrons",
          body: "Only the electrons of the outermost shell are valence electrons. Magnesium has 12 electrons but 2 valence electrons.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9atsh-ions",
      name: "Protons, electrons and neutrons in an ion",
      intuition:
        "An ion is an atom that has lost or gained electrons. The nucleus does not change, so the protons and neutrons stay exactly the same. A positive ion has lost electrons; a negative ion has gained them. Count the electrons from the charge and you have the whole ion.",
      definition:
        "- Forming an ion changes only the **electrons**. Protons and neutrons stay the same.\n" +
        "- A **positive** ion of charge +q has **lost q electrons**: electrons \\(= Z - q\\).\n" +
        "- A **negative** ion of charge −q has **gained q electrons**: electrons \\(= Z + q\\).\n" +
        "- Ions such as \\(\\mathrm{K^+}\\) and \\(\\mathrm{Cl^-}\\) can have the **same number of electrons** (18) and the same configuration (2, 8, 8).\n" +
        "- Of two such ions, the one with **more protons** pulls the electrons in harder and is **smaller**: \\(\\mathrm{Cl^-}\\) (17 protons) is bigger than \\(\\mathrm{K^+}\\) (19 protons).",
      formula: {
        label: "Electrons in an ion",
        latex: "e = Z - q \\;(\\text{positive ion}) \\qquad e = Z + q \\;(\\text{negative ion}) \\qquad n = A - Z",
        symbols: [
          { symbol: "e", meaning: "number of electrons in the ion" },
          { symbol: "Z", meaning: "atomic number (protons)" },
          { symbol: "q", meaning: "size of the charge on the ion" },
          { symbol: "A", meaning: "mass number" },
        ],
      },
      authoredExample: {
        prompt: "A magnesium ion \\(\\mathrm{Mg^{2+}}\\) is formed from an atom of mass number 24 and atomic number 12. Find its protons, electrons and neutrons, and its electronic configuration.",
        steps: [
          "Protons = 12; neutrons \\(= 24 - 12 = 12\\). Neither changes.",
          "Charge +2 means 2 electrons lost: \\(12 - 2 = 10\\) electrons.",
          "10 electrons are arranged as 2, 8.",
        ],
        answer: "12 protons, 10 electrons, 12 neutrons; configuration 2, 8",
      },
      selfCheckExample: {
        prompt: "How many electrons are there in the sulphide ion, \\(\\mathrm{S^{2-}}\\)? (Atomic number of sulphur: 16)",
        steps: ["A charge of −2 means 2 electrons gained: \\(16 + 2 = 18\\)."],
        answer: "18",
      },
      practiceSet: [
        { prompt: "How many electrons are there in a sodium ion, Na⁺? (Atomic number of sodium: 11)", answer: "10" },
        { prompt: "How many electrons are there in a calcium ion, Ca²⁺? (Atomic number of calcium: 20)", answer: "18" },
        { prompt: "Na⁺ and F⁻ both have 10 electrons. Which is the bigger ion? (Atomic numbers: Na 11, F 9)", answer: "F⁻, because it has fewer protons pulling on the same 10 electrons" },
        { prompt: "An ion with a charge of −1 has 18 electrons. What is the atomic number of its element?", answer: "17 (chlorine)" },
      ],
      pyqExampleId: "40a6f569-b58e-4c40-9af0-4de9d285e8e9",
      traps: [
        {
          title: "Changing the protons when an ion forms",
          body: "An ion forms by losing or gaining electrons only. The number of protons, and so the element, stays the same.",
        },
        {
          title: "Adding electrons for a positive ion",
          body: "A positive charge means electrons were lost. \\(\\mathrm{Fe^{3+}}\\) (atomic number 26) has \\(26 - 3 = 23\\) electrons, not 29.",
        },
        {
          title: "Thinking the ion with more protons is bigger",
          body: "When two ions have the same number of electrons, more protons pull the electrons closer, so that ion is smaller.",
        },
      ],
    },
  ],
};
