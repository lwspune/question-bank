import type { SubtopicNote } from "@/app/notes/_types";

export const ELECTRONIC_CONFIG_NOTE: SubtopicNote = {
  subtopicName: "Electronic Configuration and Pauli/Hund Rules",
  title: "Electronic Configuration and Pauli/Hund Rules",
  oneLineDefinition:
    "Three rules govern how electrons fill orbitals — Aufbau (lowest energy first), Pauli (no two electrons share all four quantum numbers), and Hund (singly fill degenerate orbitals before pairing) — and from a ground-state configuration you can read off the number of unpaired electrons.",
  whyItMatters:
    "Six PYQs, and they split cleanly two ways. Half are pure name-the-rule recall — quote the Pauli exclusion principle or Hund's rule verbatim from its statement, worth an easy mark every year. " +
    "The other half ask you to write a ground-state configuration and count unpaired electrons (nitrogen, copper, zinc), which is where the Cr/Cu half-filled/fully-filled anomaly and Hund's rule earn their keep. " +
    "Learn the three rules by name and by statement, learn to build configurations, and this whole subtopic is reliable marks.",
  concepts: [
    // The three filling rules — reference table (tests both Pauli + the Hund statement)
    {
      kind: "reference" as const,
      slug: "cetsoa-ec-filling-rules",
      name: "The three orbital-filling rules",
      intuition:
        "Filling an atom's orbitals is like seating people in a theatre: you take the cheapest seats first (Aufbau), no seat holds more than two people and they must face opposite ways (Pauli), and you spread out across empty seats in a row before doubling up (Hund). " +
        "The bank tests these mostly as name-the-rule recall, so learn each rule's exact statement.",
      definition:
        "Three rules decide the ground-state configuration of every atom:\n" +
        "- **Aufbau principle** — orbitals fill in order of **increasing energy**, lowest first. The order follows the **(n + l) rule**: lower \\((n+l)\\) fills first, and for a tie the lower \\(n\\) fills first. This gives \\(1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, \\dots\\)\n" +
        "- **Pauli's exclusion principle** — no two electrons in an atom can have the **same set of all four quantum numbers**. Consequence: an orbital holds at most **2 electrons**, and they must have **opposite spins**.\n" +
        "- **Hund's rule of maximum multiplicity** — electrons occupy **degenerate** orbitals (same subshell) **singly first**, all with parallel spin, and pairing begins only after every such orbital has one electron.",
      table: {
        columns: ["Rule", "Statement", "Consequence"],
        rows: [
          {
            cells: [
              "Aufbau principle",
              "Orbitals are filled in order of increasing energy (the \\((n+l)\\) rule).",
              "Filling order \\(1s, 2s, 2p, 3s, 3p, 4s, 3d, \\dots\\)",
            ],
          },
          {
            cells: [
              "Pauli's exclusion principle",
              "No two electrons in an atom can have the same set of all four quantum numbers.",
              "Max **2 electrons** per orbital, with **opposite spins**.",
            ],
            noteAmber:
              "The bank quotes this one almost verbatim — 'no two electrons ... identical set of four quantum numbers' is always Pauli, never Heisenberg's uncertainty principle.",
            pyqExampleId: "7359938b-b0cb-47ee-b0b5-242a3ba7908f",
          },
          {
            cells: [
              "Hund's rule",
              "Degenerate orbitals are singly occupied before any pairing begins.",
              "Maximum number of **parallel-spin unpaired** electrons in a subshell.",
            ],
            noteAmber:
              "Watch the phrasing: 'pairing does not occur unless each orbital of the subshell has one electron' is Hund's rule.",
            pyqExampleId: "0a605e9c-c53f-4733-bb9d-de8927b13a28",
          },
        ],
        caption:
          "Aufbau sets the order, Pauli caps each orbital at two, Hund spreads before it pairs.",
      },
      pyqExampleId: "7359938b-b0cb-47ee-b0b5-242a3ba7908f", // Pauli statement (four quantum numbers)
      selfCheckExample: {
        prompt:
          "State which rule each describes: (i) an orbital can hold at most two electrons of opposite spin; (ii) the 2p orbitals each take one electron before any takes a second.",
        steps: [
          "The two-per-orbital, opposite-spin cap follows directly from no two electrons sharing all four quantum numbers.",
          "Singly filling the degenerate 2p orbitals before pairing is the maximum-multiplicity rule.",
        ],
        answer: "(i) Pauli's exclusion principle; (ii) Hund's rule.",
      },
      practiceSet: [
        {
          prompt: "Which rule says orbitals fill from lowest energy first?",
          answer: "Aufbau principle",
        },
        {
          prompt: "Which rule limits an orbital to two electrons of opposite spin?",
          answer: "Pauli's exclusion principle",
        },
        {
          prompt: "Which rule fills degenerate orbitals singly before pairing?",
          answer: "Hund's rule of maximum multiplicity",
        },
        {
          prompt: "By the (n + l) rule, which fills first — 4s or 3d?",
          answer: "4s (n + l = 4) fills before 3d (n + l = 5)",
        },
      ],
      traps: [
        {
          title: "Pauli is about four quantum numbers, not position",
          body:
            "The Pauli exclusion principle is stated in terms of the **four quantum numbers** \\((n, l, m_l, m_s)\\) — two electrons in the same orbital already share \\(n, l, m_l\\), so they must differ in spin \\(m_s\\). Do not confuse it with the **Heisenberg uncertainty principle**, which is about position and momentum, a common distractor.",
        },
        {
          title: "Hund means all singly first, then pair",
          body:
            "For \\(2p^3\\) (nitrogen) Hund's rule gives \\(\\uparrow\\ \\uparrow\\ \\uparrow\\) — three unpaired electrons — not \\(\\uparrow\\downarrow\\ \\uparrow\\ \\_\\,\\). Pairing in a subshell begins **only after** every degenerate orbital already holds one electron.",
        },
      ],
    },

    // Ground-state configurations + Cr/Cu anomaly (FORMULA) — tests the Cu question
    {
      kind: "formula" as const,
      slug: "cetsoa-ec-ground-state-anomaly",
      name: "Ground-state configurations and the half-filled/fully-filled anomaly",
      intuition:
        "Apply Aufbau, Pauli and Hund in turn and you get the ground-state configuration for most atoms. " +
        "But two nearby subshells like 4s and 3d are so close in energy that an atom will 'borrow' one electron from 4s to make 3d exactly half-filled (\\(3d^5\\)) or exactly full (\\(3d^{10}\\)) — because those symmetric arrangements are unusually stable.",
      definition:
        "Writing a ground-state configuration, and the two anomalies:\n" +
        "- Fill in Aufbau order, obeying Pauli (2 per orbital) and Hund (singly first): e.g. nitrogen \\((Z=7)\\) is \\(1s^2\\,2s^2\\,2p^3\\).\n" +
        "- **Extra-stability rule:** exactly **half-filled** \\((p^3, d^5, f^7)\\) and **fully-filled** \\((p^6, d^{10}, f^{14})\\) subshells are especially stable (symmetric distribution + favourable exchange energy).\n" +
        "- **Chromium** \\((Z=24)\\) is \\([\\text{Ar}]\\,4s^1\\,3d^5\\), **not** \\(4s^2\\,3d^4\\) — one 4s electron shifts to give a half-filled \\(3d^5\\).\n" +
        "- **Copper** \\((Z=29)\\) is \\([\\text{Ar}]\\,4s^1\\,3d^{10}\\), **not** \\(4s^2\\,3d^9\\) — the shift gives a fully-filled \\(3d^{10}\\).",
      formula: {
        label: "The stable-subshell anomaly (Cr, Cu)",
        latex:
          "\\text{Cr}: [\\text{Ar}]\\,4s^1 3d^5 \\qquad \\text{Cu}: [\\text{Ar}]\\,4s^1 3d^{10}",
      },
      pyqExampleId: "9ce7cb45-adce-4fa8-993a-3d3444a7993f", // Cu unpaired electrons = 1
      authoredExample: {
        prompt:
          "Write the ground-state configuration of chromium (Z = 24) and state how many unpaired electrons it has.",
        steps: [
          "Naive Aufbau order would give \\([\\text{Ar}]\\,4s^2\\,3d^4\\).",
          "But a half-filled \\(3d^5\\) is more stable, so one 4s electron moves to 3d: the true configuration is \\([\\text{Ar}]\\,4s^1\\,3d^5\\).",
          "Count unpaired: \\(4s^1\\) has 1, and \\(3d^5\\) has 5 (each of the five d orbitals singly filled by Hund).",
          "Total unpaired \\(= 1 + 5 = 6\\).",
        ],
        answer: "\\([\\text{Ar}]\\,4s^1\\,3d^5\\); 6 unpaired electrons.",
      },
      selfCheckExample: {
        prompt:
          "Write the ground-state configuration of copper (Z = 29) and find its number of unpaired electrons.",
        steps: [
          "Naive Aufbau would give \\([\\text{Ar}]\\,4s^2\\,3d^9\\).",
          "A fully-filled \\(3d^{10}\\) is more stable, so one 4s electron moves to 3d: the true configuration is \\([\\text{Ar}]\\,4s^1\\,3d^{10}\\).",
          "The \\(3d^{10}\\) subshell is completely paired; only the lone \\(4s^1\\) electron is unpaired.",
        ],
        answer: "\\([\\text{Ar}]\\,4s^1\\,3d^{10}\\); 1 unpaired electron.",
      },
      practiceSet: [
        {
          prompt: "Ground-state configuration of chromium (Z = 24)?",
          answer: "\\([\\text{Ar}]\\,4s^1\\,3d^5\\)",
          method: "half-filled 3d5 is more stable than 4s2 3d4",
        },
        {
          prompt: "Ground-state configuration of copper (Z = 29)?",
          answer: "\\([\\text{Ar}]\\,4s^1\\,3d^{10}\\)",
          method: "fully-filled 3d10 is more stable than 4s2 3d9",
        },
        {
          prompt: "Which two d-subshell fillings are extra-stable?",
          answer: "half-filled \\(d^5\\) and fully-filled \\(d^{10}\\)",
        },
      ],
      traps: [
        {
          title: "Chromium is 3d⁵4s¹, not 3d⁴4s²",
          body:
            "The single most-tested anomaly: chromium's ground state is \\([\\text{Ar}]\\,4s^1\\,3d^5\\), giving a stable half-filled d-subshell. Writing \\(4s^2\\,3d^4\\) (naive Aufbau) is the classic error — and it changes the unpaired count from the correct **6** to a wrong **4**.",
        },
        {
          title: "Copper's 4s is singly occupied",
          body:
            "Copper is \\([\\text{Ar}]\\,4s^1\\,3d^{10}\\), not \\(4s^2\\,3d^9\\). Because \\(3d^{10}\\) is completely paired, copper has only **1** unpaired electron (the lone 4s), not 2 or more.",
        },
      ],
    },

    // Counting unpaired electrons (FORMULA) — tests the N and Zn questions
    {
      kind: "formula" as const,
      slug: "cetsoa-ec-unpaired-count",
      name: "Counting unpaired electrons",
      intuition:
        "To count unpaired electrons, write the configuration, then draw the last, partly-filled subshell as boxes and fill it by Hund's rule — singly first, then pair. " +
        "Whatever electrons stay alone are the unpaired ones; a completely filled or completely empty subshell contributes none.",
      definition:
        "The counting procedure:\n" +
        "- Write the ground-state configuration; only the **incompletely filled** subshell(s) can carry unpaired electrons.\n" +
        "- Fill that subshell's degenerate orbitals by **Hund's rule** (singly, parallel spin, before pairing) and count the singly-occupied boxes.\n" +
        "- For a subshell holding \\(k\\) electrons in \\(N\\) orbitals: if \\(k \\le N\\), all \\(k\\) are unpaired; if \\(k > N\\), the number unpaired is \\(2N - k\\).\n" +
        "- A **fully-filled** subshell \\((p^6, d^{10}, s^2)\\) has **zero** unpaired electrons — e.g. zinc's \\(3d^{10}4s^2\\) is entirely paired.",
      formula: {
        label: "Unpaired electrons in a subshell",
        latex:
          "\\text{unpaired} = \\begin{cases} k, & k \\le N \\\\ 2N - k, & k > N \\end{cases}",
        symbols: [
          { symbol: "k", meaning: "electrons in the subshell" },
          { symbol: "N", meaning: "number of orbitals in the subshell (p:3, d:5, f:7)" },
        ],
      },
      pyqExampleId: "3694c97d-3f0f-4533-be4c-71c45baa9f84", // N has max unpaired (3)
      authoredExample: {
        prompt:
          "Which of these has the most unpaired electrons: fluorine (Z = 9), sodium (Z = 11), nitrogen (Z = 7), oxygen (Z = 8)?",
        steps: [
          "Nitrogen: \\(1s^2\\,2s^2\\,2p^3\\). The \\(2p^3\\) is singly filled by Hund \\((\\uparrow\\ \\uparrow\\ \\uparrow)\\) → 3 unpaired.",
          "Oxygen: \\(2p^4 = (\\uparrow\\downarrow\\ \\uparrow\\ \\uparrow)\\) → 2 unpaired.",
          "Fluorine: \\(2p^5 = (\\uparrow\\downarrow\\ \\uparrow\\downarrow\\ \\uparrow)\\) → 1 unpaired.",
          "Sodium: \\(3s^1\\) → 1 unpaired.",
        ],
        answer: "Nitrogen, with 3 unpaired electrons.",
      },
      selfCheckExample: {
        prompt:
          "How many unpaired electrons does the element in period 4, group 12 have (in ground or excited state)?",
        steps: [
          "Period 4, group 12 is zinc \\((Z=30)\\): \\([\\text{Ar}]\\,3d^{10}\\,4s^2\\).",
          "Both the \\(3d^{10}\\) and the \\(4s^2\\) subshells are completely filled, so every electron is paired.",
          "There is no low-lying way to unpair them either — the count stays zero in the excited state too.",
        ],
        answer: "Zero unpaired electrons.",
      },
      practiceSet: [
        {
          prompt: "Number of unpaired electrons in nitrogen (2p³)?",
          answer: "3",
          method: "each of the three 2p orbitals singly filled (Hund)",
        },
        {
          prompt: "Number of unpaired electrons in oxygen (2p⁴)?",
          answer: "2",
          method: "2N − k = 6 − 4 = 2",
        },
        {
          prompt: "Number of unpaired electrons in zinc ([Ar]3d¹⁰4s²)?",
          answer: "0",
          method: "both subshells fully filled",
        },
        {
          prompt: "Number of unpaired electrons in fluorine (2p⁵)?",
          answer: "1",
          method: "2N − k = 6 − 5 = 1",
        },
      ],
      traps: [
        {
          title: "Half-filled subshells hold the most unpaired electrons",
          body:
            "Among second-period atoms, nitrogen \\((2p^3)\\) beats oxygen \\((2p^4)\\) and fluorine \\((2p^5)\\) — a half-filled \\(p^3\\) is where every orbital is singly occupied, giving the maximum 3 unpaired. More total electrons does **not** mean more unpaired.",
        },
        {
          title: "Fully-filled means zero unpaired",
          body:
            "Zinc's \\(3d^{10}4s^2\\) has all subshells complete, so it has **zero** unpaired electrons — and no accessible excited state changes that. A filled \\(d^{10}\\) or \\(s^2\\) contributes nothing to the unpaired count.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Electron Configuration and Valence Shells (NDA Chemistry)",
      href: "/notes/nda-chemistry/atomic-structure/atom-electron-config",
    },
  ],
};
