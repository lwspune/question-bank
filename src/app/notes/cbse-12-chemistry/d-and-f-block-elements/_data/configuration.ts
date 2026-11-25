import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_DF_CONFIGURATION_NOTE: SubtopicNote = {
  subtopicName: "Electronic Configurations of the d-Block Elements",
  title: "Electronic Configurations of the d-Block Elements",
  oneLineDefinition:
    "The general configuration (n−1)d¹⁻¹⁰ns¹⁻², the chromium and copper exceptions, how to write the configuration of an ion, and how the configuration decides whether an element is a transition element.",
  whyItMatters:
    "14 questions. Eight were set in board papers, five of them in 2023: which ion is 3d⁶, which ion has the most unpaired d electrons, an MCQ on why zinc, cadmium and mercury do not behave like transition metals, and two assertion-reason items on copper and zinc. Then 2024 asked the general configuration of the d-block, 2025 which element is [Ar]3d¹⁰4s¹, and 2026 the configuration of chromium. The NCERT exercises add ion configurations, including lanthanoid and actinoid ions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcdf-config-atoms",
      name: "General configuration and the Cr and Cu exceptions",
      intuition:
        "In a transition element the last electron goes into the d orbitals of the shell below the outermost one, while the outermost s orbital keeps one or two electrons. The 3d and 4s energies are so close that a half-filled or completely filled d set can pull one electron out of 4s.",
      definition:
        "- The outer configuration of the d-block is \\((n-1)d^{1-10}ns^{1-2}\\). The \\((n-1)\\) shell holds the inner d orbitals (1 to 10 electrons); the outermost ns orbital holds one or two.\n" +
        "- **Exceptions** come from the very small energy gap between \\((n-1)d\\) and ns, and the extra stability of half-filled and completely filled sets.\n" +
        "- Chromium (24) is \\([\\text{Ar}]3d^54s^1\\), not \\(3d^44s^2\\). Copper (29) is \\([\\text{Ar}]3d^{10}4s^1\\), not \\(3d^94s^2\\).\n" +
        "- Palladium is \\(4d^{10}5s^0\\): no s electron at all.\n" +
        "- **Non-transition elements** add the last electron to the outermost shell (\\(ns\\) or \\(np\\)); transition elements add it to the inner \\((n-1)d\\) subshell.",
      formula: {
        label: "General outer configuration of d-block elements",
        latex: "(n-1)d^{1-10}\\,ns^{1-2}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "the outermost shell (4 for the 3d series)" },
          { symbol: "\\((n-1)d\\)", meaning: "the inner d orbitals, holding 1 to 10 electrons" },
        ],
      },
      authoredExample: {
        prompt: "Write the outer electronic configuration of copper (Z = 29) and explain why it is not 3d⁹4s².",
        steps: [
          "After argon (18), copper has 11 more electrons to place in 3d and 4s.",
          "Expected filling: \\(3d^94s^2\\).",
          "The 3d and 4s energies are very close, and a completely filled d set is extra stable, so one 4s electron moves into 3d.",
          "Configuration: \\([\\text{Ar}]3d^{10}4s^1\\).",
        ],
        answer: "[Ar]3d¹⁰4s¹, because a completely filled 3d set is more stable",
      },
      selfCheckExample: {
        prompt: "Which d-block element has no electron in its outermost s orbital in the ground state? Write its outer configuration.",
        steps: ["Palladium is the exception the book names: all ten electrons sit in 4d."],
        answer: "Palladium, 4d¹⁰5s⁰",
      },
      practiceSet: [
        { prompt: "Write the outer electronic configuration of manganese (Z = 25).", answer: "\\([\\text{Ar}]3d^54s^2\\)" },
        { prompt: "Which two elements of the 3d series have only one 4s electron?", answer: "Chromium and copper" },
        { prompt: "Into which subshell does the last electron go in a transition element?", answer: "The inner \\((n-1)d\\) subshell" },
      ],
      pyqExampleId: "a6ebbeba-5c3b-4e19-a730-21c32c4b4a6c",
      traps: [
        {
          title: "Filling chromium and copper by the usual order",
          body: "Chromium is 3d⁵4s¹ and copper is 3d¹⁰4s¹. The options 3d⁴4s² and 3d⁹4s² are set to catch you.",
        },
        {
          title: "Writing (n−1)d¹⁰ in the general formula",
          body: "The d subshell is being FILLED across the block, so its count runs from 1 to 10: \\((n-1)d^{1-10}ns^{1-2}\\). d¹⁰ describes only group 12.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcdf-config-ions",
      name: "Configurations of transition metal ions",
      intuition:
        "When a transition metal forms an ion, it loses its outer ns electrons first and only then its (n−1)d electrons. So every 3d ion with a charge of 2 or more has no 4s electron left, and its d count is easy to work out.",
      definition:
        "- Remove the ns electrons first, then as many \\((n-1)d\\) electrons as the charge still needs.\n" +
        "- For a 3d ion of charge +2 or more: number of 3d electrons \\(= Z - 18 - \\text{charge}\\).\n" +
        "- Start from the true atom: for chromium (\\(3d^54s^1\\)) remove the single 4s electron, then two 3d, so \\(\\text{Cr}^{3+}\\) is \\(3d^3\\).\n" +
        "- Unpaired electrons follow Hund's rule: up to five d electrons all stay unpaired; from the sixth they start pairing (\\(d^6\\): 4 unpaired, \\(d^7\\): 3, \\(d^8\\): 2, \\(d^9\\): 1, \\(d^{10}\\): 0).\n" +
        "- For lanthanoid and actinoid ions the 6s (or 7s) electrons go first, then the 5d (or 6d), then f.",
      formula: {
        label: "Number of 3d electrons in a 3d ion of charge +2 or more",
        latex: "n_{3d} = Z - 18 - \\text{charge}",
        symbols: [
          { symbol: "\\(Z\\)", meaning: "atomic number of the metal" },
          { symbol: "\\(18\\)", meaning: "the electrons of the argon core" },
        ],
      },
      authoredExample: {
        prompt: "Write the configurations of Fe³⁺ (Z = 26) and V²⁺ (Z = 23), and give the number of unpaired electrons in each.",
        steps: [
          "Fe is \\([\\text{Ar}]3d^64s^2\\). Remove two 4s, then one 3d: \\(\\text{Fe}^{3+} = [\\text{Ar}]3d^5\\). Check: \\(26 - 18 - 3 = 5\\).",
          "Five d electrons in five orbitals: 5 unpaired.",
          "V is \\([\\text{Ar}]3d^34s^2\\). Remove two 4s: \\(\\text{V}^{2+} = [\\text{Ar}]3d^3\\). Check: \\(23 - 18 - 2 = 3\\).",
          "Three d electrons: 3 unpaired.",
        ],
        answer: "Fe³⁺ = [Ar]3d⁵ (5 unpaired); V²⁺ = [Ar]3d³ (3 unpaired)",
      },
      selfCheckExample: {
        prompt: "How many 3d electrons does Cu²⁺ (Z = 29) have, and how many of them are unpaired?",
        steps: ["\\(29 - 18 - 2 = 9\\), so \\(\\text{Cu}^{2+}\\) is \\(3d^9\\).", "Nine electrons in five orbitals: four pairs and one single."],
        answer: "Nine 3d electrons, one unpaired",
      },
      practiceSet: [
        { prompt: "Write the configuration of Ti²⁺ (Z = 22).", answer: "\\([\\text{Ar}]3d^2\\)" },
        { prompt: "Which of Fe²⁺ and Fe³⁺ (Z = 26) has the configuration 3d⁵?", answer: "Fe³⁺" },
        { prompt: "Write the configuration of Ce⁴⁺ (Z = 58; Ce is [Xe]4f¹5d¹6s²).", answer: "\\([\\text{Xe}]\\), that is \\(4f^0\\)" },
      ],
      pyqExampleId: "922a22b1-47ce-4cc4-ae45-b0a655cf6a9f",
      traps: [
        {
          title: "Taking the d electrons off first",
          body: "Fe²⁺ is 3d⁶, not 3d⁴4s². The ns electrons always leave before the (n−1)d electrons.",
        },
        {
          title: "Starting chromium or copper from the wrong atom",
          body: "Work from 3d⁵4s¹ for chromium and 3d¹⁰4s¹ for copper. Cu⁺ is 3d¹⁰ (only the 4s electron lost), and Cu²⁺ is 3d⁹.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcdf-which-transition",
      name: "Transition element or not: scandium, copper, silver and zinc",
      intuition:
        "The definition has two doors: an incomplete d subshell in the atom, or in an ion. Scandium walks in through the atom, copper and silver through an ion, and zinc finds both doors shut.",
      definition:
        "- **Definition:** a transition element has an incompletely filled d subshell in its atom or in one of its common oxidation states.\n" +
        "- Check the atom first. If its d subshell is full, check the common ions.\n" +
        "- Zinc, cadmium and mercury are \\((n-1)d^{10}ns^2\\) and their +2 ions are \\(d^{10}\\): full in both, so they are not transition elements. Their compounds are white and diamagnetic.\n" +
        "- **Assertion-reason codes** in these papers: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) A false, R true. Decide A, then R, then whether R gives the cause of A.",
      table: {
        columns: ["Element", "Atom", "Ion that decides", "Transition element?"],
        rows: [
          { cells: ["Scandium (21)", "3d¹4s²: d incomplete", "Not needed (Sc³⁺ is 3d⁰)", "Yes, through the atom"] },
          {
            cells: ["Copper (29)", "3d¹⁰4s¹: d full", "Cu²⁺ is 3d⁹", "Yes, through the ion"],
            noteAmber: "Board 2023 set \"copper is a non-transition element\" as a false assertion with a true reason (code D).",
            pyqExampleId: "bd21cae5-5790-488f-a191-07bc5aaa67b5",
          },
          { cells: ["Silver (47)", "4d¹⁰5s¹: d full", "Ag²⁺ is 4d⁹", "Yes, through the ion"] },
          { cells: ["Zinc (30)", "3d¹⁰4s²: d full", "Zn²⁺ is 3d¹⁰: still full", "No"] },
        ],
        caption: "Cadmium and mercury behave exactly like zinc.",
      },
      selfCheckExample: {
        prompt: "Scandium forms only the ion Sc³⁺, which has no d electron. Why is scandium still a transition element?",
        steps: ["The definition is satisfied by the atom alone.", "The scandium atom is 3d¹4s², an incompletely filled 3d subshell."],
        answer: "Its atom has an incomplete 3d subshell (3d¹)",
      },
      practiceSet: [
        { prompt: "Write the configuration of Zn²⁺ (Z = 30).", answer: "\\([\\text{Ar}]3d^{10}\\)" },
        { prompt: "Through which ion does silver satisfy the definition of a transition element?", answer: "Ag²⁺, which is 4d⁹" },
        { prompt: "Choose the code. A: Copper is a transition element. R: Cu²⁺ has a 3d⁹ configuration.", answer: "(A): both true, and R explains A" },
      ],
      pyqExampleId: "c8de8224-f0cb-4c0c-b64c-3e956d4bd547",
      traps: [
        {
          title: "Judging copper by its atom alone",
          body: "Copper's atom has a full 3d subshell, but Cu²⁺ is 3d⁹. An answer that stops at the atom calls copper a non-transition element and loses the mark.",
        },
        {
          title: "Half a reason for zinc",
          body: "Say that the 3d subshell is full in the atom AND in Zn²⁺. The full-marks answer names both.",
        },
      ],
    },
  ],
};
