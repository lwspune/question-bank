import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_ATS_ORBITALS_NOTE: SubtopicNote = {
  subtopicName: "Orbitals and Configurations",
  title: "Shells, Orbitals and Electron Configurations",
  oneLineDefinition:
    "Electrons sit in shells, split into s, p, d and f subshells of orbitals; they fill the lowest energy orbitals first, two per orbital, spreading out before pairing.",
  whyItMatters:
    "The 2014 paper asked which atomic number gives a configuration ending in p⁵, and the 2025 ministry paper asked how many electrons one orbital can hold and with what spins. Every ion configuration question on the next page also starts here.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ats-shells-subshells",
      name: "Shells, subshells and orbitals, and how many electrons each holds",
      intuition:
        "Electrons do not orbit like planets. Each one occupies an orbital, a region of space where it is likely to be found, and each orbital holds at most two electrons. Orbitals of the same shape and energy form a subshell, and the subshells of one energy level form a shell.",
      definition:
        "- A **shell** (energy level) has a number \\(n = 1, 2, 3, \\dots\\); higher \\(n\\) means further from the nucleus and higher energy.\n" +
        "- Each shell splits into **subshells** labelled s, p, d, f. Shell \\(n\\) has \\(n\\) kinds of subshell.\n" +
        "- An **orbital** holds at most 2 electrons. s orbitals are spherical; p orbitals are dumbbell-shaped, three of them at right angles.\n" +
        "- Shell \\(n\\) holds at most \\(2n^2\\) electrons: 2, 8, 18, 32.",
      table: {
        columns: ["Subshell", "Orbitals in it", "Maximum electrons", "First shell that has it"],
        rows: [
          { cells: ["s", "1", "2", "n = 1"] },
          { cells: ["p", "3", "6", "n = 2"] },
          { cells: ["d", "5", "10", "n = 3"] },
          { cells: ["f", "7", "14", "n = 4"] },
        ],
        caption: "Shell 3 has 3s, 3p and 3d: 1 + 3 + 5 = 9 orbitals, so up to 18 electrons.",
      },
      selfCheckExample: {
        prompt: "What is the maximum number of electrons that the shell with \\(n = 3\\) can hold?",
        options: ["8", "18", "9", "32", "6"],
        steps: [
          "Shell 3 has 3s (1 orbital), 3p (3) and 3d (5): 9 orbitals, each holding 2 electrons, so 18. This is \\(2n^2 = 2 \\times 9\\).",
          "A counts only 3s and 3p (period 3 has 8 elements, but the 3d fills later, in period 4).",
          "C is the number of orbitals, not electrons. D is shell 4. E is the 3p subshell alone.",
        ],
        answer: "(B) 18",
      },
      practiceSet: [
        { prompt: "How many orbitals are in the shell with \\(n = 2\\)?", answer: "4", method: "One 2s and three 2p" },
        { prompt: "How many electrons fill a complete f subshell?", answer: "14", method: "7 orbitals × 2" },
        { prompt: "What is the maximum number of electrons in the shell with \\(n = 4\\)?", answer: "32", method: "\\(2n^2 = 2 \\times 16\\)" },
      ],
      traps: [
        {
          title: "Period 3 has 8 elements, but shell 3 holds 18 electrons",
          body: "The 3d subshell only starts filling after 4s, in period 4. So the third row of the table stops at 8 elements, while the third shell can eventually hold \\(2 \\times 3^2 = 18\\) electrons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ats-quantum-numbers",
      name: "Quantum numbers and the Pauli exclusion principle",
      intuition:
        "Four numbers describe each electron in an atom, like an address: the shell, the subshell, the particular orbital, and the spin. The Pauli principle says no two electrons in an atom share the same full address. Since an orbital fixes the first three numbers, only the spin is left to tell its two electrons apart.",
      definition:
        "- The **Pauli exclusion principle**: no two electrons in one atom have the same four quantum numbers.\n" +
        "- So an orbital holds **at most two electrons, with opposite (antiparallel) spins**.\n" +
        "- The allowed values depend on each other: \\(l\\) runs from 0 to \\(n - 1\\), and \\(m_l\\) runs from \\(-l\\) to \\(+l\\).\n" +
        "- The number of \\(m_l\\) values (\\(2l + 1\\)) is the number of orbitals in the subshell: 1, 3, 5, 7.",
      table: {
        columns: ["Quantum number", "Symbol", "Allowed values", "What it describes"],
        rows: [
          { cells: ["Principal", "\\(n\\)", "1, 2, 3, ...", "The shell: energy and size"] },
          { cells: ["Angular momentum (azimuthal)", "\\(l\\)", "0 to \\(n - 1\\) (0 = s, 1 = p, 2 = d, 3 = f)", "The subshell: orbital shape"] },
          { cells: ["Magnetic", "\\(m_l\\)", "\\(-l\\) to \\(+l\\), whole numbers", "Which orbital: its orientation"] },
          { cells: ["Spin", "\\(m_s\\)", "\\(+\\tfrac{1}{2}\\) or \\(-\\tfrac{1}{2}\\)", "The direction of the electron's spin"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which set of quantum numbers \\((n,\\ l,\\ m_l,\\ m_s)\\) is NOT possible for an electron in an atom?",
        options: [
          "\\((2,\\ 1,\\ 0,\\ +\\tfrac{1}{2})\\)",
          "\\((3,\\ 2,\\ -2,\\ -\\tfrac{1}{2})\\)",
          "\\((1,\\ 0,\\ 0,\\ +\\tfrac{1}{2})\\)",
          "\\((2,\\ 2,\\ 1,\\ +\\tfrac{1}{2})\\)",
          "\\((4,\\ 3,\\ 3,\\ -\\tfrac{1}{2})\\)",
        ],
        steps: [
          "\\(l\\) must be at most \\(n - 1\\). In D, \\(n = 2\\) allows \\(l = 0\\) or 1 only, so \\(l = 2\\) (a 2d subshell) does not exist.",
          "A is a 2p electron, B a 3d electron, C a 1s electron and E a 4f electron; in each, \\(m_l\\) lies between \\(-l\\) and \\(+l\\).",
        ],
        answer: "(D) \\((2,\\ 2,\\ 1,\\ +\\tfrac{1}{2})\\)",
      },
      practiceSet: [
        { prompt: "Which values of \\(l\\) are allowed when \\(n = 3\\)?", answer: "0, 1 and 2 (3s, 3p, 3d)" },
        { prompt: "How many electrons can have \\(n = 2\\) and \\(l = 1\\)?", answer: "6", method: "Three 2p orbitals, two electrons each" },
        { prompt: "Two electrons share one orbital. Which quantum number must differ?", answer: "The spin, \\(m_s\\)" },
      ],
      traps: [
        {
          title: "Two electrons in one orbital have opposite spins",
          body: "An orbital holds two electrons at most, and they must have antiparallel (opposite) spins, by the Pauli principle. Options with two parallel spins, one electron only, or three or four electrons per orbital are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ats-aufbau-hund",
      name: "Writing electron configurations with the Aufbau principle and Hund's rule",
      intuition:
        "Electrons go into the lowest energy orbitals available, like water filling the lowest part of a container first. The surprise is that 4s is slightly lower in energy than 3d in an empty atom, so it fills first. Inside a subshell, electrons repel each other, so they spread out one per orbital before any pair up.",
      definition:
        "- **Aufbau principle**: fill subshells in order of increasing energy.\n" +
        "- **Hund's rule**: in a set of equal-energy orbitals (a p, d or f subshell), electrons occupy separate orbitals with parallel spins before pairing.\n" +
        "- A configuration lists subshells with the electron count as a superscript: \\(1s^2\\,2s^2\\,2p^3\\) for nitrogen. The superscripts add up to the number of electrons.\n" +
        "- **Noble-gas shorthand**: \\([\\mathrm{Ne}]\\) stands for \\(1s^2\\,2s^2\\,2p^6\\) and \\([\\mathrm{Ar}]\\) for \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\).\n" +
        "- For d-block atoms, \\([\\mathrm{Ar}]\\,3d^6\\,4s^2\\) and \\([\\mathrm{Ar}]\\,4s^2\\,3d^6\\) mean the same thing.",
      formula: {
        label: "Order of filling",
        latex: "1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p < 5s < 4d < 5p",
        symbols: [
          { symbol: "\\(<\\)", meaning: "lower in energy, so filled first" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the ground-state configurations of phosphorus (\\(Z = 15\\)) and iron (\\(Z = 26\\)), and give the number of unpaired electrons in each.",
        steps: [
          "Phosphorus, 15 electrons: \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^3\\). Check: \\(2 + 2 + 6 + 2 + 3 = 15\\).",
          "By Hund's rule the three 3p electrons go one into each 3p orbital, all unpaired: 3 unpaired electrons.",
          "Iron, 26 electrons: after \\([\\mathrm{Ar}]\\) (18), 4s takes 2 and 3d takes the remaining 6: \\([\\mathrm{Ar}]\\,3d^6\\,4s^2\\).",
          "Six electrons in five d orbitals: five go in singly and the sixth pairs up, leaving 4 unpaired.",
        ],
        answer: "P: \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^3\\), 3 unpaired. Fe: \\([\\mathrm{Ar}]\\,3d^6\\,4s^2\\), 4 unpaired",
      },
      selfCheckExample: {
        prompt: "How many unpaired electrons does an oxygen atom (\\(Z = 8\\)) have in its ground state?",
        options: ["2", "0", "4", "1", "6"],
        steps: [
          "Oxygen: \\(1s^2\\,2s^2\\,2p^4\\).",
          "Four electrons in three 2p orbitals: three go in singly (Hund's rule), and the fourth pairs with one of them. That leaves 2 unpaired.",
          "C forgets the pairing. B assumes every electron is paired. E is the number of valence electrons, not unpaired ones.",
        ],
        answer: "(A) 2",
      },
      practiceSet: [
        { prompt: "Write the configuration of chlorine (\\(Z = 17\\)).", answer: "\\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^5\\)" },
        { prompt: "Which atomic number has the ground-state configuration \\([\\mathrm{Ar}]\\,3d^3\\,4s^2\\)?", answer: "23 (vanadium)", method: "\\(18 + 3 + 2\\)" },
        { prompt: "Which atomic number is the first to have a configuration ending in \\(4p^1\\)?", answer: "31 (gallium)", method: "\\([\\mathrm{Ar}]\\) 18, then \\(4s^2\\) and \\(3d^{10}\\) make 30, then one more" },
      ],
      traps: [
        {
          title: "4s fills before 3d",
          body: "After 3p comes 4s, not 3d. Potassium is \\([\\mathrm{Ar}]\\,4s^1\\), not \\([\\mathrm{Ar}]\\,3d^1\\). The 3d subshell starts filling only at scandium, \\(Z = 21\\).",
        },
        {
          title: "Hund's rule: a p⁴ subshell has two unpaired electrons, not four",
          body: "Three p orbitals take one electron each first; a fourth electron must pair. So \\(p^4\\) has 2 unpaired electrons and \\(p^3\\) has 3, the most a p subshell can have.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ats-cr-cu-exceptions",
      name: "The chromium and copper exceptions to the filling order",
      intuition:
        "A half-filled or completely filled d subshell is especially stable. For chromium and copper, moving one electron from 4s into 3d reaches one of these arrangements, and the energy gained outweighs the small cost of the move. So their real configurations break the simple filling order by one electron.",
      definition:
        "- **Chromium** (\\(Z = 24\\)) is \\([\\mathrm{Ar}]\\,3d^5\\,4s^1\\): a half-filled 3d subshell and six unpaired electrons.\n" +
        "- **Copper** (\\(Z = 29\\)) is \\([\\mathrm{Ar}]\\,3d^{10}\\,4s^1\\): a full 3d subshell.\n" +
        "- The elements below them in the same groups often show the same pattern (molybdenum, silver, gold).\n" +
        "- These are the two exceptions IMAT expects you to know. All other atoms in periods 1 to 4 follow the Aufbau order.",
      table: {
        columns: ["Element", "Predicted by the filling order", "Actual ground state", "Why"],
        rows: [
          { cells: ["Chromium, Z = 24", "\\([\\mathrm{Ar}]\\,3d^4\\,4s^2\\)", "\\([\\mathrm{Ar}]\\,3d^5\\,4s^1\\)", "Half-filled 3d subshell is extra stable"] },
          { cells: ["Copper, Z = 29", "\\([\\mathrm{Ar}]\\,3d^9\\,4s^2\\)", "\\([\\mathrm{Ar}]\\,3d^{10}\\,4s^1\\)", "Full 3d subshell is extra stable"] },
          { cells: ["Molybdenum, Z = 42", "\\([\\mathrm{Kr}]\\,4d^4\\,5s^2\\)", "\\([\\mathrm{Kr}]\\,4d^5\\,5s^1\\)", "Same pattern as chromium (same group)"] },
          { cells: ["Silver, Z = 47", "\\([\\mathrm{Kr}]\\,4d^9\\,5s^2\\)", "\\([\\mathrm{Kr}]\\,4d^{10}\\,5s^1\\)", "Same pattern as copper (same group)"] },
        ],
      },
      selfCheckExample: {
        prompt: "What is the ground-state electron configuration of a chromium atom (\\(Z = 24\\))?",
        options: [
          "\\([\\mathrm{Ar}]\\,3d^4\\,4s^2\\)",
          "\\([\\mathrm{Ar}]\\,3d^6\\)",
          "\\([\\mathrm{Ar}]\\,3d^5\\,4s^1\\)",
          "\\([\\mathrm{Ar}]\\,4s^2\\,4p^4\\)",
          "\\([\\mathrm{Ar}]\\,3d^3\\,4s^2\\,4p^1\\)",
        ],
        steps: [
          "Chromium is one of the two exceptions: one 4s electron moves to 3d to give a half-filled \\(3d^5\\).",
          "A is what the simple filling order predicts, and it is the tempting wrong answer.",
          "B empties 4s completely; D and E put electrons into 4p before 3d is filled.",
        ],
        answer: "(C) \\([\\mathrm{Ar}]\\,3d^5\\,4s^1\\)",
      },
      practiceSet: [
        { prompt: "Write the ground-state configuration of copper (\\(Z = 29\\)).", answer: "\\([\\mathrm{Ar}]\\,3d^{10}\\,4s^1\\)" },
        { prompt: "How many unpaired electrons does a chromium atom have?", answer: "6", method: "Five single 3d electrons plus one 4s electron" },
        { prompt: "How many unpaired electrons does a copper atom have?", answer: "1", method: "3d is full; only the 4s electron is single" },
      ],
    },
  ],
};
