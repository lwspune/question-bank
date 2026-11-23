import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_TR_CONFIGURATION_NOTE: SubtopicNote = {
  subtopicName: "Position in the Periodic Table and Electronic Configuration",
  title: "Position of the d-Block and Electronic Configuration",
  oneLineDefinition:
    "Where the transition elements sit in the periodic table, the general configuration of the four d series, why chromium and copper break the pattern, and how to write the configuration of an ion.",
  whyItMatters:
    "7 questions. Four were set in board papers: write the general electronic configuration of the 3d series (2025, and again in 2026 with two points on the colour of an ion), the configuration of the Zn²⁺ ion (2024), and the observed configuration of chromium with the magnetic moment of Ti³⁺ (2026). The textbook adds the configurations of chromium and copper, of Cu and Cu⁺, and the ions with a d⁰s⁰ configuration.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscctr-d-series",
      name: "The four d series and their general configuration",
      intuition:
        "The d-block sits in the middle of the periodic table, between the s-block on the left and the p-block on the right. Across each of these rows the outer s orbital is already filled, and the new electrons go into the d subshell one shell inside, the (n−1)d. Learn the pattern once and you can write any member, but learn the two exceptions too, because the board asks for the observed configuration.",
      definition:
        "- The **transition elements** are placed in periods 4 to 7 and groups 3 to 12. They form four series: 3d, 4d, 5d and 6d (Fig. 8.1).\n" +
        "- By the IUPAC convention, a transition metal atom has an **incomplete d subshell**, or gives cations with an incomplete d subshell.\n" +
        "- General configuration: \\((n-1)d^{1-10}\\,ns^{1-2}\\), where n is the outermost shell.\n" +
        "- The four series: 3d is \\([\\text{Ar}]\\,3d^{1-10}\\,4s^{2}\\) (Sc, Z = 21 to Zn, Z = 30); 4d is \\([\\text{Kr}]\\,4d^{1-10}\\,5s^{0-2}\\); 5d is \\([\\text{Xe}]\\,4f^{14}\\,5d^{1-10}\\,6s^{2}\\) (except La); 6d is \\([\\text{Rn}]\\,5f^{14}\\,6d^{1-10}\\,7s^{2}\\) (except Ac).\n" +
        "- **Chromium and copper are exceptions.** The 3d and 4s orbitals are close in energy, and a half filled or completely filled subshell has extra stability. So the last electron goes into 3d instead of 4s: Cr is \\([\\text{Ar}]\\,3d^{5}\\,4s^{1}\\) and Cu is \\([\\text{Ar}]\\,3d^{10}\\,4s^{1}\\).\n" +
        "- **Zinc, cadmium and mercury** are not regarded as transition elements: their d subshell is completely filled both in the ground state and in their common +2 state. Copper is, because Cu²⁺ has a partly filled 3d⁹ subshell.",
      formula: {
        label: "General configuration of the d-block",
        latex: "(n-1)d^{1-10}\\,ns^{1-2}; \\qquad 3d \\text{ series: } [\\text{Ar}]\\,3d^{1-10}\\,4s^{2}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the outermost (valence) shell" },
          { symbol: "\\([\\text{Ar}]\\)", meaning: "the argon core, 1s² 2s² 2p⁶ 3s² 3p⁶" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the expected and the observed electronic configurations of copper (Z = 29), and explain why they differ.",
        steps: [
          "Given: Z = 29. The argon core holds 18 electrons, so 11 electrons are left for the 3d and 4s orbitals.",
          "Expected, following the filling order: \\([\\text{Ar}]\\,3d^{9}\\,4s^{2}\\).",
          "Observed (Table 8.2): \\([\\text{Ar}]\\,3d^{10}\\,4s^{1}\\).",
          "Reason: the 3d and 4s orbitals are very close in energy. Moving one 4s electron into 3d gives a completely filled \\(3d^{10}\\) subshell, and a completely filled subshell has extra stability.",
        ],
        answer:
          "Expected \\([\\text{Ar}]\\,3d^{9}\\,4s^{2}\\); observed \\([\\text{Ar}]\\,3d^{10}\\,4s^{1}\\), because a completely filled 3d subshell is extra stable",
      },
      selfCheckExample: {
        prompt: "Write the electronic configuration of vanadium (Z = 23) in full and in the short form.",
        steps: [
          "23 electrons: 18 in the argon core and 5 more.",
          "The 4s fills first with 2, and 3 go into 3d.",
          "Full form: \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^6\\,3d^3\\,4s^2\\).",
        ],
        answer: "\\([\\text{Ar}]\\,3d^{3}\\,4s^{2}\\)",
      },
      practiceSet: [
        { prompt: "In which periods and groups of the periodic table are the transition elements placed?", answer: "Periods 4 to 7, groups 3 to 12" },
        { prompt: "Which element of the 3d series has the outer configuration \\(3d^{5}\\,4s^{2}\\)?", answer: "Manganese (Z = 25)" },
        { prompt: "Why is zinc not regarded as a transition element?", answer: "Its 3d subshell is completely filled in the ground state (3d¹⁰ 4s²) and in its common +2 state (3d¹⁰)" },
        { prompt: "Why is copper regarded as a transition element although the Cu atom has a filled 3d subshell?", answer: "In the +2 state, Cu²⁺ has a partly filled 3d⁹ subshell" },
      ],
      pyqExampleId: "4e0c0182-b16c-4bf3-a56f-6bf5f48c625f",
      traps: [
        {
          title: "Writing the expected configuration when the observed one is asked",
          body: "The board asks for the OBSERVED configuration of chromium. \\([\\text{Ar}]\\,3d^{4}\\,4s^{2}\\) is the expected one and loses the mark; write \\([\\text{Ar}]\\,3d^{5}\\,4s^{1}\\) and give the half-filled reason.",
        },
        {
          title: "Calling zinc a transition element",
          body: "Zinc, cadmium and mercury have a completely filled d subshell in the atom and in the +2 ion, so the textbook does not regard them as transition elements, though they sit in the d-block.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscctr-ion-config",
      name: "Electronic configuration of the ions",
      intuition:
        "The 4s orbital fills before 3d, but when the atom forms an ion the 4s electrons are the first to go. Think of 4s as the outer coat: it goes on first in the filling order, yet it is on the outside, so it comes off first. Only after both 4s electrons are gone does the ion start losing 3d electrons.",
      definition:
        "- Loss of one 4s electron gives \\(\\text{M}^{+}\\), loss of both 4s electrons gives \\(\\text{M}^{2+}\\), and loss of the 3d electrons as well gives \\(\\text{M}^{3+}\\), \\(\\text{M}^{4+}\\) and so on (Table 8.4).\n" +
        "- So write the observed configuration of the atom first, then remove the 4s electrons, then the 3d electrons.\n" +
        "- For a first-series ion that has lost both 4s electrons, the number of 3d electrons left is \\((Z - 18) - x\\), where x is the charge.\n" +
        "- An ion that has lost every electron outside the argon core has a \\(d^0 s^0\\) configuration: \\(\\text{Sc}^{3+}\\), \\(\\text{Ti}^{4+}\\) and \\(\\text{V}^{5+}\\).",
      formula: {
        label: "3d electrons in a first-series ion",
        latex: "\\text{3d electrons in } \\text{M}^{x+} = (Z - 18) - x \\qquad (x \\geq 2)",
        symbols: [
          { symbol: "\\(Z\\)", meaning: "atomic number of the element" },
          { symbol: "\\(x\\)", meaning: "charge on the ion" },
        ],
      },
      authoredExample: {
        prompt: "Write the electronic configurations of Ni²⁺ (Z = 28) and Mn⁴⁺ (Z = 25).",
        steps: [
          "Nickel: \\([\\text{Ar}]\\,3d^{8}\\,4s^{2}\\). Remove the two 4s electrons: \\(\\text{Ni}^{2+} = [\\text{Ar}]\\,3d^{8}\\).",
          "Check: \\((28 - 18) - 2 = 8\\) electrons in 3d.",
          "Manganese: \\([\\text{Ar}]\\,3d^{5}\\,4s^{2}\\). Remove two 4s electrons and then two 3d electrons: \\(\\text{Mn}^{4+} = [\\text{Ar}]\\,3d^{3}\\).",
          "Check: \\((25 - 18) - 4 = 3\\) electrons in 3d.",
        ],
        answer: "\\(\\text{Ni}^{2+} = [\\text{Ar}]\\,3d^{8}\\); \\(\\text{Mn}^{4+} = [\\text{Ar}]\\,3d^{3}\\)",
      },
      selfCheckExample: {
        prompt: "A student writes Fe²⁺ (Z of Fe = 26) as \\([\\text{Ar}]\\,3d^{4}\\,4s^{2}\\). Explain the mistake and correct it.",
        steps: [
          "Iron is \\([\\text{Ar}]\\,3d^{6}\\,4s^{2}\\).",
          "When an ion forms, the 4s electrons are lost first, not the 3d electrons.",
          "So both 4s electrons go and all six 3d electrons stay.",
        ],
        answer: "The 3d electrons were removed instead of the 4s; Fe²⁺ is \\([\\text{Ar}]\\,3d^{6}\\)",
      },
      practiceSet: [
        { prompt: "Name the 3d ion with a +2 charge and the configuration \\([\\text{Ar}]\\,3d^{8}\\).", answer: "Ni²⁺" },
        { prompt: "Which of Sc³⁺, Ti⁴⁺ and V⁵⁺ has the configuration \\(3d^0\\,4s^0\\)?", answer: "All three" },
        { prompt: "Which electron does a copper atom lose first when it forms Cu⁺?", answer: "Its single 4s electron" },
        { prompt: "How many unpaired electrons does an ion with the configuration \\([\\text{Ar}]\\,3d^{3}\\) have?", answer: "Three (one in each of three d orbitals)" },
      ],
      pyqExampleId: "7274f47c-c418-4e98-ac35-8bd90830eb40",
      traps: [
        {
          title: "Taking the 3d electrons out first",
          body: "The 4s orbital fills first but also empties first. Write the atom, remove the 4s electrons, and only then the 3d electrons.",
        },
        {
          title: "Starting from the expected configuration of Cr or Cu",
          body: "For a chromium or copper ion, begin from the observed atom (\\(3d^{5}\\,4s^{1}\\) or \\(3d^{10}\\,4s^{1}\\)). Starting from \\(3d^{4}\\,4s^{2}\\) gives the right count only by luck and the examiner looks at the working.",
        },
      ],
    },
  ],
};
