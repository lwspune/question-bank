import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTRON_CONFIG_NOTE: SubtopicNote = {
  subtopicName: "Electron Configuration and Valence Shells",
  title: "Electron Configuration and Valence Shells",
  oneLineDefinition:
    "Electrons fill shells from the inside out, each shell holding up to 2n² electrons; the outermost (valence) shell decides how the atom bonds.",
  whyItMatters:
    "4 PYQs built on one rule — the maximum electrons a shell can hold is 2n². " +
    "From that rule the bank asks the cap of a named shell (K, L, M, N), or works out the valence-shell count of an element from its atomic number. Learn 2n² and you cover the whole subtopic.",
  concepts: [
    // shell capacity 2n^2 (FORMULA)
    {
      kind: "formula" as const,
      slug: "shell-capacity-2n2",
      name: "Maximum electrons in a shell (the 2n² rule)",
      intuition:
        "Electrons live in shells labelled K, L, M, N (n = 1, 2, 3, 4). Each shell can hold at most 2n² electrons — so the more we go outward, the more room there is. " +
        "The first shell holds 2, the next 8, then 18, then 32.",
      definition:
        "The shell-capacity rule and the resulting caps:\n" +
        "- The maximum number of electrons a shell can hold is **2n²**, where n is the shell number.\n" +
        "- **K shell (n = 1)** → 2(1)² = **2** electrons.\n" +
        "- **L shell (n = 2)** → 2(2)² = **8** electrons.\n" +
        "- **M shell (n = 3)** → 2(3)² = **18** electrons.\n" +
        "- **N shell (n = 4)** → 2(4)² = **32** electrons.",
      formula: {
        label: "Maximum electrons per shell",
        latex: "\\text{Maximum electrons} = 2n^2",
        symbols: [{ symbol: "n", meaning: "shell number (K=1, L=2, M=3, N=4)" }],
      },
      pyqExampleId: "714c4a1b-e852-4c11-9eda-8ab1bf3fe68e", // N shell = 32
      authoredExample: {
        prompt: "What is the maximum number of electrons that the N shell can hold?",
        steps: [
          "The N shell is the fourth shell, so n = 4.",
          "Apply the rule: maximum = 2n² = 2 × 4² = 2 × 16.",
          "= 32 electrons.",
        ],
        answer: "32 electrons.",
      },
      selfCheckExample: {
        prompt: "What is the maximum number of electrons the M shell (third shell) can hold?",
        steps: [
          "The M shell is the third shell, so n = 3.",
          "Maximum = 2n² = 2 × 3² = 2 × 9.",
          "= 18 electrons.",
        ],
        answer: "18 electrons.",
      },
      practiceSet: [
        { prompt: "Maximum electrons in the first (K) shell?", answer: "2", method: "2n² with n = 1" },
        { prompt: "Maximum electrons in the N shell?", answer: "32", method: "2n² with n = 4" },
        { prompt: "Maximum electrons in the L shell?", answer: "8", method: "2n² with n = 2" },
        { prompt: "Maximum electrons in the M shell?", answer: "18", method: "2n² with n = 3" },
      ],
      traps: [
        {
          title: "2n² is a CAP, not the actual filling",
          body:
            "The 2n² rule gives the **maximum** a shell can hold. In real atoms the outermost shell never holds more than 8 before the next shell starts filling — but the capacity question asks for the cap (M = 18, N = 32).",
        },
      ],
    },

    // valence shell from atomic number (FORMULA)
    {
      kind: "formula" as const,
      slug: "valence-shell-electrons",
      name: "Valence-shell electrons and bonding from the configuration",
      intuition:
        "Write the configuration by filling 2, 8, 8, 18… from the inside, and the electrons left in the outermost shell are the valence electrons. " +
        "Those decide the valency — how many electrons the atom gains, loses or shares to reach a full octet.",
      definition:
        "How to read bonding from the configuration:\n" +
        "- Fill shells in order 2, 8, 8, 18 (using the Bohr filling scheme); the **outermost** shell's electrons are the valence electrons.\n" +
        "- Bromine (Z = 35): config **2, 8, 18, 7** → valence shell has **7** electrons.\n" +
        "- An atom with **6** valence electrons (Z = 8, oxygen: 2, 6) needs to **gain 2** to complete its octet — so it gains 2 electrons (e.g. when bonding with sodium to form Na₂O).\n" +
        "- Valency = electrons gained, lost or shared to reach 8 in the outer shell.",
      formula: {
        label: "Electrons gained/lost to reach an octet",
        latex: "\\text{Valency} = 8 - (\\text{valence electrons}) \\;\\text{ or }\\; (\\text{valence electrons})",
      },
      pyqExampleId: "2a3c0977-7f0b-4c78-87d2-c430894b2f56", // Z=35 valence 7
      authoredExample: {
        prompt: "An element has atomic number 35. Using the Bohr filling scheme, how many electrons are in its valence shell?",
        steps: [
          "Fill shells from the inside: 2 (K) + 8 (L) + 18 (M) = 28 electrons used.",
          "Remaining electrons: 35 − 28 = 7, which go into the N shell.",
          "So the configuration is 2, 8, 18, 7 — the valence shell holds 7 electrons.",
        ],
        answer: "7 valence electrons (it is bromine, a halogen).",
      },
      selfCheckExample: {
        prompt: "An element has atomic number 8. How many electrons must it gain to form a compound with sodium?",
        steps: [
          "Configuration of Z = 8 (oxygen): 2, 6 — six electrons in the outer shell.",
          "It needs 8 in the outer shell, so it must gain 2 electrons.",
          "It therefore gains 2 electrons, forming O²⁻ (and Na₂O with sodium).",
        ],
        answer: "Two electrons.",
      },
      practiceSet: [
        { prompt: "How many valence electrons does an atom with atomic number 35 have?", answer: "7", method: "config 2, 8, 18, 7" },
        { prompt: "An atom with configuration 2, 6 gains how many electrons to complete its octet?", answer: "2", method: "needs 8 in the outer shell, has 6" },
        { prompt: "How many valence electrons does an atom with atomic number 11 (sodium) have?", answer: "1", method: "config 2, 8, 1" },
      ],
      traps: [
        {
          title: "Valence electrons live in the OUTERMOST shell only",
          body:
            "For Z = 35 the configuration is 2, 8, 18, 7 — the M shell holds 18, but the **valence** shell is the N shell with **7**. Count only the outermost shell, not the largest.",
        },
      ],
    },
  ],
};
