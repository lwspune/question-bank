import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_PTB_SIZE_NOTE: SubtopicNote = {
  subtopicName: "Atomic and Ionic Radius",
  title: "Atomic Radius and Ionic Radius",
  oneLineDefinition:
    "Atoms get smaller from left to right along a period and larger down a group; positive ions are smaller than their atoms and negative ions larger.",
  whyItMatters:
    "Atomic radius was asked in 2011 (the trend across period 4) and in the 2025 ministry paper (which way radius grows in both directions). The 2026 ministry paper asked whether Mg²⁺ is larger than the Mg atom.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ptb-atomic-radius",
      name: "Atomic radius across a period and down a group",
      intuition:
        "Two things set the size of an atom: how many shells it has, and how strongly the nucleus pulls on the outer shell. Along a period the electrons go into the same shell while the nuclear charge rises by one each step, so the outer shell is pulled in. Down a group each element has one more shell, so the atom is bigger even though the nucleus has more protons.",
      definition:
        "- **Across a period** (left to right): atomic radius **decreases**. Same number of shells, more protons, and the inner electrons shield about the same amount, so the **effective nuclear charge** on the outer electrons rises.\n" +
        "- **Down a group**: atomic radius **increases**, because each step adds a shell.\n" +
        "- So the largest atoms are at the bottom left (caesium, francium) and the smallest at the top right.\n" +
        "- In the d-block the radius falls only slightly, because the new electrons enter an inner (3d) shell. Across period 4, from potassium to bromine, the radius still falls throughout.\n" +
        "- Method for comparing atoms: compare the number of shells (the period) first; only within one period compare the atomic numbers.",
      authoredExample: {
        prompt:
          "Arrange sodium (\\(Z = 11\\)), magnesium (\\(Z = 12\\)), chlorine (\\(Z = 17\\)) and potassium (\\(Z = 19\\)) in order of decreasing atomic radius.",
        steps: [
          "Potassium is in period 4 (four shells); the other three are in period 3. So potassium is largest.",
          "Within period 3, a larger \\(Z\\) pulls the same third shell in harder: \\(\\mathrm{Na} > \\mathrm{Mg} > \\mathrm{Cl}\\).",
        ],
        answer: "\\(\\mathrm{K} > \\mathrm{Na} > \\mathrm{Mg} > \\mathrm{Cl}\\)",
      },
      selfCheckExample: {
        prompt: "Which list puts the atoms in order of INCREASING atomic radius?",
        options: [
          "Na < S < O < F",
          "F < O < S < Na",
          "O < F < S < Na",
          "F < O < Na < S",
          "S < F < O < Na",
        ],
        steps: [
          "F and O are in period 2, so they are smaller than S and Na in period 3. Within period 2, fluorine (higher \\(Z\\)) is smaller than oxygen.",
          "Within period 3, sodium (lower \\(Z\\)) is larger than sulfur. So \\(\\mathrm{F} < \\mathrm{O} < \\mathrm{S} < \\mathrm{Na}\\).",
          "A is the decreasing order. C and D each reverse one pair inside a period. E puts the period 3 atom S before the period 2 atoms.",
        ],
        answer: "(B) F < O < S < Na",
      },
      practiceSet: [
        { prompt: "Which atom is larger, lithium or caesium?", answer: "Caesium", method: "Further down group 1, more shells" },
        { prompt: "Which atom is larger, magnesium or chlorine?", answer: "Magnesium", method: "Same period, fewer protons" },
        { prompt: "How does atomic radius change from potassium to bromine in period 4?", answer: "It decreases throughout, slowly across the d-block" },
      ],
      traps: [
        {
          title: "An atom gets smaller across a period even though it gains electrons",
          body: "Adding electrons sounds like it should make an atom bigger, but along a period they go into the same shell while the nuclear charge rises. The stronger pull wins. Radius increases from right to left and from top to bottom.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ptb-ionic-radius",
      name: "Ionic radius compared with atomic radius",
      intuition:
        "When a metal atom loses its outer electrons, it usually loses a whole shell, and the same nuclear charge now pulls on fewer electrons: the ion is much smaller. When a non-metal atom gains electrons, the extra electrons repel each other while the nuclear charge stays the same: the ion is larger. In a set of ions with the same number of electrons, the one with most protons pulls hardest and is smallest.",
      definition:
        "- A **cation is smaller** than its atom: \\(\\mathrm{Na^+} < \\mathrm{Na}\\).\n" +
        "- An **anion is larger** than its atom: \\(\\mathrm{Cl^-} > \\mathrm{Cl}\\).\n" +
        "- In an **isoelectronic** series, radius decreases as \\(Z\\) increases: \\(\\mathrm{N^{3-}} > \\mathrm{O^{2-}} > \\mathrm{F^-} > \\mathrm{Na^+} > \\mathrm{Mg^{2+}} > \\mathrm{Al^{3+}}\\) (all 10 electrons).\n" +
        "- For one element, the higher the positive charge, the smaller the ion: \\(\\mathrm{Fe^{3+}} < \\mathrm{Fe^{2+}}\\).\n" +
        "- Down a group, ions of the same charge get larger: \\(\\mathrm{Li^+} < \\mathrm{Na^+} < \\mathrm{K^+}\\).",
      authoredExample: {
        prompt: "Compare the sizes of Na and \\(\\mathrm{Na^+}\\), of Cl and \\(\\mathrm{Cl^-}\\), and then of \\(\\mathrm{Na^+}\\) and \\(\\mathrm{Cl^-}\\).",
        steps: [
          "\\(\\mathrm{Na^+}\\) has lost its only shell-3 electron, so it has two shells instead of three: much smaller than Na.",
          "\\(\\mathrm{Cl^-}\\) has one extra electron in shell 3; repulsion grows with the same 17 protons: larger than Cl.",
          "\\(\\mathrm{Cl^-}\\) has three occupied shells and \\(\\mathrm{Na^+}\\) two, so \\(\\mathrm{Cl^-}\\) is the larger ion.",
        ],
        answer: "\\(\\mathrm{Na^+} < \\mathrm{Na}\\); \\(\\mathrm{Cl^-} > \\mathrm{Cl}\\); \\(\\mathrm{Cl^-} > \\mathrm{Na^+}\\)",
      },
      selfCheckExample: {
        prompt: "Which of these ions has the smallest radius?",
        options: [
          "\\(\\mathrm{O^{2-}}\\)",
          "\\(\\mathrm{F^-}\\)",
          "\\(\\mathrm{Na^+}\\)",
          "\\(\\mathrm{Mg^{2+}}\\)",
          "\\(\\mathrm{Al^{3+}}\\)",
        ],
        steps: [
          "All five have 10 electrons, so they form an isoelectronic series.",
          "The ion with the most protons pulls the same electrons in hardest: aluminium, \\(Z = 13\\).",
          "\\(\\mathrm{O^{2-}}\\) (\\(Z = 8\\)) is the largest of the five; choosing it reverses the trend.",
        ],
        answer: "(E) \\(\\mathrm{Al^{3+}}\\)",
      },
      practiceSet: [
        { prompt: "Which is larger, \\(\\mathrm{K^+}\\) or \\(\\mathrm{Cl^-}\\)?", answer: "\\(\\mathrm{Cl^-}\\)", method: "Both have 18 electrons; Cl has fewer protons" },
        { prompt: "Which is larger, \\(\\mathrm{Fe^{2+}}\\) or \\(\\mathrm{Fe^{3+}}\\)?", answer: "\\(\\mathrm{Fe^{2+}}\\)", method: "Fewer electrons for the same nucleus means a smaller ion" },
        { prompt: "Which is larger, an Mg atom or an \\(\\mathrm{Mg^{2+}}\\) ion?", answer: "The Mg atom", method: "The ion has lost its third shell" },
      ],
      traps: [
        {
          title: "A positive ion is smaller than its atom, never larger",
          body: "Losing electrons removes the outer shell and leaves the full nuclear charge pulling on fewer electrons. So \\(\\mathrm{Mg^{2+}}\\) is smaller than Mg. It is negative ions that are larger than their atoms.",
        },
      ],
    },
  ],
};
