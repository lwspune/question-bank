import type { SubtopicNote } from "@/app/notes/_types";

export const RADII_PER_NOTE: SubtopicNote = {
  subtopicName: "Atomic and Ionic Radii",
  title: "Atomic and Ionic Radii",
  oneLineDefinition:
    "Atoms shrink across a period as the nuclear charge grows on the same shell and swell down a group as shells are added; a cation is smaller than its atom and an anion larger.",
  whyItMatters:
    "Twenty-one PYQs, nineteen of them multiple choice, and two from 2026. Seven rank atomic radii or ask what a covalent radius is; nine rank ions, most often an isoelectronic series; five count electrons and neutrons to decide which species are isoelectronic.",
  concepts: [
    // C1 — atomic radius trends
    {
      kind: "reference" as const,
      slug: "jcper-atomic-radius",
      name: "Atomic radius across a period and down a group",
      intuition:
        "Across a period each step adds one proton and one electron to the same shell. The extra pull wins, so the atom gets smaller. Down a group each step adds a whole shell, and the atom gets bigger even though the nuclear charge rises.",
      definition:
        "- **Covalent radius** = half the bond length in \\(\\mathrm{X_2}\\): the Cl–Cl bond is 198 pm, so \\(r_{\\mathrm{Cl}} = 99\\) pm.\n" +
        "- A bond between two different atoms is about \\(r_A + r_B\\) long.\n" +
        "- **Metallic radius** = half the distance between neighbouring nuclei in the metal crystal.\n" +
        "- Across a period the radius **falls**; down a group it **rises**.\n" +
        "- In period 4, K is the largest and Br the smallest; noble gases are left out, because their van der Waals radius is not comparable with a covalent radius.",
      table: {
        columns: ["Series", "Atomic radius (pm)", "Trend"],
        rows: [
          { cells: ["Period 2", "Li 152, Be 111, B 88, C 77, N 74, O 66, F 64", "Falls steadily across"] },
          { cells: ["Period 3", "Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99", "Falls steadily across"] },
          { cells: ["Group 1", "Li 152, Na 186, K 231, Rb 244, Cs 262", "Rises down the group"] },
          { cells: ["Group 17", "F 64, Cl 99, Br 114, I 133, At 140", "Rises down the group"] },
          { cells: ["Period 4 ends", "K 231, Br 114", "Largest and smallest in period 4, noble gas excluded"] },
        ],
        caption: "Compare the columns: Be (111) is smaller than Mg (160) and Mg is larger than Al (143).",
      },
      selfCheckExample: {
        prompt: "Arrange Cl, K, Na and F in increasing atomic radius.",
        steps: [
          "F and Cl are in group 17: F is one shell smaller.",
          "Na and Cl are in period 3: Na is at the left end, so larger.",
          "K is one period below Na, so larger still.",
        ],
        answer: "F < Cl < Na < K (64, 99, 186 and 231 pm).",
      },
      practiceSet: [
        { prompt: "The C–C bond is 154 pm. What is the covalent radius of carbon?", answer: "77 pm" },
        { prompt: "Estimate the C–Cl bond length from \\(r_{\\mathrm{C}} = 77\\) pm and \\(r_{\\mathrm{Cl}} = 99\\) pm.", answer: "About 176 pm" },
        { prompt: "Which is larger, Mg or Al?", answer: "Mg" },
        { prompt: "Smallest atom among Li, Be, Na, B?", answer: "B" },
      ],
      pyqExampleId: "6f8fbda2-79c3-4016-bb91-5efe705962d4", // 2025 — the incorrect decreasing order of atomic radii
      traps: [
        {
          title: "Half the bond, not double",
          body: "The covalent radius is half the distance between the two nuclei in \\(\\mathrm{Cl_2}\\). A statement that it is double the atomic radius has the relation upside down.",
        },
        {
          title: "Down a group beats across a period",
          body: "Be is at the left of period 2 but still smaller than Mg, which has one more shell. When an order mixes groups and periods, compare the shells first.",
        },
      ],
    },

    // C2 — ionic radius and isoelectronic series
    {
      kind: "reference" as const,
      slug: "jcper-ionic-radius",
      name: "Ionic radius and isoelectronic series",
      intuition:
        "Removing electrons leaves the same nucleus pulling fewer electrons, so a cation is smaller than its atom. Adding electrons adds repulsion with no extra pull, so an anion is larger. In an isoelectronic series every ion has the same electrons, and the one with more protons pulls them in tighter.",
      definition:
        "- **Cation < parent atom**: Na 186 pm, \\(\\mathrm{Na^+}\\) 102 pm.\n" +
        "- **Anion > parent atom**: Cl 99 pm, \\(\\mathrm{Cl^-}\\) 184 pm.\n" +
        "- **Isoelectronic species**: same number of electrons; the radius falls as \\(Z\\) rises.\n" +
        "- 10 electrons: \\(\\mathrm{N^{3-} > O^{2-} > F^- > Na^+ > Mg^{2+} > Al^{3+}}\\).\n" +
        "- 18 electrons: \\(\\mathrm{P^{3-} > S^{2-} > Cl^- > K^+ > Ca^{2+}}\\).\n" +
        "- Down a group, ions of the same charge grow: \\(\\mathrm{Li^+ < Na^+ < K^+}\\).",
      table: {
        columns: ["Species", "Protons", "Electrons", "Radius (pm)"],
        rows: [
          { cells: ["Na atom", "11", "11", "186"] },
          { cells: ["\\(\\mathrm{Na^+}\\)", "11", "10", "102"] },
          { cells: ["Cl atom", "17", "17", "99"] },
          { cells: ["\\(\\mathrm{Cl^-}\\)", "17", "18", "184"] },
          { cells: ["\\(\\mathrm{O^{2-}}\\)", "8", "10", "140"], noteAmber: "Isoelectronic with \\(\\mathrm{Mg^{2+}}\\) (72 pm), yet about twice as large: the same electrons do not mean the same size." },
          { cells: ["\\(\\mathrm{F^-}\\)", "9", "10", "133"] },
          { cells: ["\\(\\mathrm{Mg^{2+}}\\)", "12", "10", "72"] },
          { cells: ["\\(\\mathrm{Al^{3+}}\\)", "13", "10", "53.5"] },
          { cells: ["\\(\\mathrm{K^+}\\)", "19", "18", "138"] },
        ],
        caption: "Within the 10-electron rows, every extra proton makes the ion smaller.",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\mathrm{K^+}\\), \\(\\mathrm{P^{3-}}\\), \\(\\mathrm{Ca^{2+}}\\) and \\(\\mathrm{Cl^-}\\) in increasing size.",
        steps: [
          "All four have 18 electrons, so they are isoelectronic.",
          "Protons: P 15, Cl 17, K 19, Ca 20. More protons, smaller ion.",
        ],
        answer: "\\(\\mathrm{Ca^{2+} < K^+ < Cl^- < P^{3-}}\\)",
      },
      practiceSet: [
        { prompt: "Which is larger, \\(\\mathrm{K^+}\\) or \\(\\mathrm{Na^+}\\)?", answer: "\\(\\mathrm{K^+}\\) (138 pm against 102 pm)" },
        { prompt: "Is the ionic radius always smaller than the atomic radius?", answer: "No; it is larger for an anion" },
        { prompt: "What decides the size order in an isoelectronic series?", answer: "The nuclear charge Z" },
        { prompt: "Smallest of \\(\\mathrm{F^-}\\), \\(\\mathrm{Al^{3+}}\\), \\(\\mathrm{O^{2-}}\\)?", answer: "\\(\\mathrm{Al^{3+}}\\)" },
      ],
      pyqExampleId: "6c89e5c1-5f2a-4779-858c-58ce364088a0", // 2022 — increasing radii of a 10-electron series
      traps: [
        {
          title: "Isoelectronic does not mean the same size",
          body: "\\(\\mathrm{O^{2-}}\\) and \\(\\mathrm{Mg^{2+}}\\) both have 10 electrons, but Mg has 12 protons against oxygen's 8. The claim that their radii are equal is false even though the reason (both are isoelectronic) is true.",
        },
        {
          title: "Isoelectronic ions have different nuclear charges",
          body: "The whole point of the series is that Z changes while the electron count does not. A statement that \\(\\mathrm{O^{2-}}\\), \\(\\mathrm{F^-}\\), \\(\\mathrm{Na^+}\\) and \\(\\mathrm{Mg^{2+}}\\) have the same nuclear charge is false.",
        },
      ],
    },

    // C3 — counting electrons and neutrons
    {
      kind: "formula" as const,
      slug: "jcper-electron-count",
      name: "Counting electrons to find isoelectronic species",
      intuition:
        "Two species are isoelectronic when they carry the same number of electrons, whatever their nuclei. Count each one from Z and the charge, and the groups sort themselves out. Neutrons come from the mass number and play no part in being isoelectronic.",
      definition:
        "- Electrons = \\(Z - q\\): subtract a positive charge, add a negative one.\n" +
        "- Neutrons = \\(A - Z\\).\n" +
        "- Common 10-electron set: \\(\\mathrm{N^{3-}}\\), \\(\\mathrm{O^{2-}}\\), \\(\\mathrm{F^-}\\), Ne, \\(\\mathrm{Na^+}\\), \\(\\mathrm{Mg^{2+}}\\), \\(\\mathrm{Al^{3+}}\\).\n" +
        "- Common 18-electron set: \\(\\mathrm{P^{3-}}\\), \\(\\mathrm{S^{2-}}\\), \\(\\mathrm{Cl^-}\\), Ar, \\(\\mathrm{K^+}\\), \\(\\mathrm{Ca^{2+}}\\), \\(\\mathrm{Sc^{3+}}\\).\n" +
        "- Hydrogen isotopes: protium (0 neutrons), deuterium (1) and tritium (2); only tritium is radioactive.",
      formula: {
        label: "Counting particles",
        latex: "e^{-} = Z - q \\qquad n = A - Z",
        symbols: [
          { symbol: "q", meaning: "charge on the species, with its sign" },
          { symbol: "A", meaning: "mass number" },
        ],
      },
      authoredExample: {
        prompt:
          "For the ion \\(^{31}_{15}\\mathrm{P^{3-}}\\), find the protons, neutrons and electrons. Which of Ne, \\(\\mathrm{Na^+}\\), Ar and \\(\\mathrm{S^{2-}}\\) are isoelectronic with it?",
        steps: [
          "Protons = 15; neutrons = \\(31 - 15 = 16\\).",
          "Electrons = \\(15 - (-3) = 18\\).",
          "Ne has 10, \\(\\mathrm{Na^+}\\) has \\(11 - 1 = 10\\), Ar has 18, \\(\\mathrm{S^{2-}}\\) has \\(16 + 2 = 18\\).",
        ],
        answer: "15 protons, 16 neutrons, 18 electrons; isoelectronic with Ar and \\(\\mathrm{S^{2-}}\\).",
      },
      selfCheckExample: {
        prompt:
          "How many of these have 10 electrons: \\(\\mathrm{N^{3-}}\\), Ne, Na, \\(\\mathrm{Mg^{2+}}\\), F, \\(\\mathrm{Al^{3+}}\\)?",
        steps: [
          "\\(\\mathrm{N^{3-}}\\): 7 + 3 = 10. Ne: 10. Na: 11.",
          "\\(\\mathrm{Mg^{2+}}\\): 12 − 2 = 10. F: 9. \\(\\mathrm{Al^{3+}}\\): 13 − 3 = 10.",
        ],
        answer: "Four: \\(\\mathrm{N^{3-}}\\), Ne, \\(\\mathrm{Mg^{2+}}\\) and \\(\\mathrm{Al^{3+}}\\).",
      },
      practiceSet: [
        { prompt: "Electrons in \\(\\mathrm{Fe^{3+}}\\) (\\(Z = 26\\))?", answer: "23" },
        { prompt: "Neutrons in tritium?", answer: "2" },
        { prompt: "In \\(^{40}_{20}\\mathrm{Ca^{2+}}\\), by what percentage do the neutrons exceed the electrons?", answer: "About 11% (20 against 18)" },
        { prompt: "Which ion of period 3 is isoelectronic with Ne and carries a 3+ charge?", answer: "\\(\\mathrm{Al^{3+}}\\)" },
      ],
      pyqExampleId: "6058c5a7-ee57-4ea7-8ccf-46463318ed31", // 2023 — which set of ions is isoelectronic
      traps: [
        {
          title: "A neutral atom is not its ion",
          body: "Na has 11 electrons and \\(\\mathrm{Na^+}\\) has 10. In a list that mixes atoms and ions, count each one separately: Al and Mg are not in the 10-electron set, while \\(\\mathrm{Al^{3+}}\\) and \\(\\mathrm{Mg^{2+}}\\) are.",
        },
      ],
    },
  ],
};
