import type { SubtopicNote } from "@/app/notes/_types";

export const IE_PER_NOTE: SubtopicNote = {
  subtopicName: "Ionization Enthalpy",
  title: "Ionization Enthalpy",
  oneLineDefinition:
    "Ionization enthalpy is the energy needed to remove the most loosely held electron from an isolated gaseous atom; it rises across a period with two dips, falls down a group with a few exceptions, and jumps sharply once the valence electrons are gone.",
  whyItMatters:
    "Twenty-seven PYQs, the largest page, twenty-six of them multiple choice, and nine from 2026. Fifteen rank the first ionization enthalpies of a period, where the marks go on the two dips; four compare elements down groups 13 and 14; eight use second and later ionization enthalpies, to name a group from a jump or to find the energy for a mass of atoms.",
  concepts: [
    // C1 — first ionization enthalpy across a period
    {
      kind: "reference" as const,
      slug: "jcper-ie-period",
      name: "First ionization enthalpy across a period",
      intuition:
        "Across a period the nuclear charge rises on the same shell, so electrons get harder to pull off. The rise is broken twice. Group 13 dips below group 2, because its first p electron is held less tightly than an s electron. Group 16 dips below group 15, because its fourth p electron shares an orbital and is pushed out by the partner.",
      definition:
        "- \\(\\Delta_i H\\) is always positive: removing an electron always takes energy.\n" +
        "- **Across a period**: rises overall, from the alkali metal (lowest) to the noble gas (highest).\n" +
        "- **Dip 1, group 2 > group 13**: Be > B and Mg > Al; a \\(2p\\) electron penetrates less than a \\(2s\\) electron.\n" +
        "- **Dip 2, group 15 > group 16**: N > O and P > S; the half-filled \\(np^3\\) is stable and the paired electron in \\(np^4\\) is repelled.\n" +
        "- Period 2 in order: Li < B < Be < C < O < N < F < Ne.\n" +
        "- Period 3 in order: Na < Al < Mg < Si < S < P < Cl < Ar.",
      table: {
        columns: ["Group", "Period 2 (kJ mol⁻¹)", "Period 3 (kJ mol⁻¹)", "Why"],
        rows: [
          { cells: ["1", "Li 520", "Na 496", "One s electron outside a noble-gas core: lowest in the period"] },
          { cells: ["2", "Be 899", "Mg 737", "Filled \\(ns^2\\) subshell"] },
          { cells: ["13", "B 801", "Al 577", "Dip: the lone \\(np\\) electron is less penetrating"], noteAmber: "Group 13 sits BELOW group 2. The option with a smooth rise (Be < B) is the trap." },
          { cells: ["14", "C 1086", "Si 786", "Rises again"] },
          { cells: ["15", "N 1402", "P 1012", "Half-filled \\(np^3\\): extra stable"] },
          { cells: ["16", "O 1314", "S 1000", "Dip: pairing in \\(np^4\\) adds repulsion"], noteAmber: "Group 16 sits BELOW group 15: N > O and P > S." },
          { cells: ["17", "F 1681", "Cl 1256", "Rises again"] },
          { cells: ["18", "Ne 2080", "Ar 1520", "Filled shell: highest in the period"] },
        ],
        caption: "Read down each column for the period order; the two amber rows are the exceptions every question tests.",
      },
      selfCheckExample: {
        prompt: "Arrange B, C, N and O in increasing first ionization enthalpy.",
        steps: [
          "The overall trend puts B lowest.",
          "N (half-filled \\(2p^3\\)) is above O (paired \\(2p^4\\)).",
          "C (1086) is below O (1314).",
        ],
        answer: "B < C < O < N",
      },
      practiceSet: [
        { prompt: "Which is higher, Be or B?", answer: "Be (899 against 801 kJ mol⁻¹)" },
        { prompt: "Which is higher, P or S?", answer: "P" },
        { prompt: "Highest first ionization enthalpy in period 3?", answer: "Ar" },
        { prompt: "Does the first ionization enthalpy decrease across a period?", answer: "No; it increases overall, because the nuclear charge outweighs the shielding" },
      ],
      pyqExampleId: "ee06903d-c482-4b97-bc9b-47760e02d953", // 2026 — trend across period 3
      traps: [
        {
          title: "The smooth order is the wrong option",
          body: "Li < Be < B < C < N < O < F looks right and is always offered. It misses both dips. The true order swaps two pairs: Li < B < Be < C < O < N < F.",
        },
      ],
    },

    // C2 — down a group, with the exceptions
    {
      kind: "reference" as const,
      slug: "jcper-ie-group",
      name: "Down a group, and where it fails",
      intuition:
        "Down a group the outer electron sits in a bigger shell, so it is easier to remove. After the d and f subshells fill, though, those inner electrons shield the nucleus badly. The heavier element then holds its outer electrons more tightly than expected, and the trend stalls or reverses.",
      definition:
        "- Groups 1, 2 and 18 fall steadily: Li > Na > K; Rn is the lowest noble gas.\n" +
        "- **Group 13**: Ga (579) is just above Al (577) because of ten poorly shielding \\(3d\\) electrons; Tl (589) is above In (558) because of the \\(4f\\) electrons.\n" +
        "- Second ionization enthalpy in group 13 follows **B > Ga > Al**.\n" +
        "- **Group 14**: Pb (715) is above Sn (708); the order is C > Si > Ge > Pb > Sn.\n" +
        "- Across period 4, Zn (906, filled \\(3d^{10}4s^2\\)) is far above Ga (579).",
      table: {
        columns: ["Group", "First ionization enthalpy (kJ mol⁻¹)", "Order and exception"],
        rows: [
          { cells: ["1", "Li 520, Na 496, K 419, Rb 403, Cs 376", "Steady fall"] },
          { cells: ["2", "Be 899, Mg 737, Ca 590, Sr 549, Ba 503", "Steady fall"] },
          { cells: ["13", "B 801, Al 577, Ga 579, In 558, Tl 589", "B > Tl > Ga > Al > In"], noteAmber: "Ga is not below Al, and Tl is above both." },
          { cells: ["13, second", "B 2427, Al 1816, Ga 1979, In 1820, Tl 1971", "B > Ga > Tl > In > Al"] },
          { cells: ["14", "C 1086, Si 786, Ge 761, Sn 708, Pb 715", "C > Si > Ge > Pb > Sn"], noteAmber: "Pb is above Sn." },
          { cells: ["18", "He 2372, Ne 2080, Ar 1520, Kr 1351, Xe 1170, Rn 1037", "Steady fall; Rn lowest"] },
        ],
        caption: "The exceptions appear only after a filled d or f subshell: from Ga, Tl and Pb onwards.",
      },
      selfCheckExample: {
        prompt: "Which is higher in each pair: the first ionization enthalpy of Tl or In, and the second ionization enthalpy of Ga or Al?",
        steps: [
          "Tl has a filled \\(4f\\) subshell that shields poorly: Tl 589 against In 558.",
          "Ga has a filled \\(3d\\) subshell: its second ionization enthalpy is 1979 against Al's 1816.",
        ],
        answer: "Tl, and Ga.",
      },
      practiceSet: [
        { prompt: "Lowest first ionization enthalpy in group 18?", answer: "Rn" },
        { prompt: "Which is higher, Zn or Ga?", answer: "Zn" },
        { prompt: "Which is higher, Ge or Sn?", answer: "Ge (761 against 708 kJ mol⁻¹)" },
        { prompt: "Which is higher, Na or K?", answer: "Na" },
      ],
      pyqExampleId: "5983584d-1c8f-4434-a595-c0473a7fc56f", // 2025 — Pb against Sn, Ge against Si
      traps: [
        {
          title: "A simple fall down group 13 or 14 is wrong",
          body: "An order like Al > Ga or Sn > Pb applies the group rule blindly. Poor shielding by d and f electrons lifts Ga and Pb. Check these two pairs before choosing.",
        },
      ],
    },

    // C3 — successive ionization enthalpies
    {
      kind: "formula" as const,
      slug: "jcper-successive-ie",
      name: "Successive ionization enthalpies and the energy for a mass",
      intuition:
        "Each electron removed leaves a more positive ion, so the next one is harder to pull off: IE₂ is always larger than IE₁. Once all the valence electrons are gone, the next one comes from a noble-gas core, and the value jumps several times over. The position of that jump counts the valence electrons.",
      definition:
        "- \\(\\Delta_i H_1 < \\Delta_i H_2 < \\Delta_i H_3 < \\dots\\), all positive.\n" +
        "- A **large jump** between \\(\\Delta_i H_k\\) and \\(\\Delta_i H_{k+1}\\) means \\(k\\) valence electrons: group \\(k\\) for s-block, group \\(10 + k\\) for p-block.\n" +
        "- Second ionization enthalpies compare the \\(\\mathrm{M^+}\\) ions: Na > Mg, because \\(\\mathrm{Na^+}\\) has a neon core; for C, N, O, F the order is C < N < F < O, because \\(\\mathrm{O^+}\\) is a half-filled \\(2p^3\\).\n" +
        "- Ca has a very high third ionization enthalpy: \\(\\mathrm{Ca^{2+}}\\) has the argon configuration.\n" +
        "- Energy for a given mass = moles × the sum of the enthalpies for the electrons removed.",
      formula: {
        label: "Energy to ionize a mass of gaseous atoms",
        latex: "E = \\frac{m}{M}\\,\\left(\\Delta_i H_1 + \\Delta_i H_2 + \\dots\\right)",
        symbols: [
          { symbol: "m", meaning: "mass of the gaseous atoms, in g" },
          { symbol: "M", meaning: "molar mass, in g mol⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "An element's first four ionization enthalpies are 577, 1816, 2744 and 11577 kJ mol⁻¹. Find its group and the ion it forms.",
        steps: [
          "Gaps: \\(1816 - 577 = 1239\\), \\(2744 - 1816 = 928\\), then \\(11577 - 2744 = 8833\\).",
          "The big jump is after the third electron, so there are three valence electrons.",
          "Three valence electrons with a p electron among them: group \\(10 + 3 = 13\\). This is aluminium.",
        ],
        answer: "Group 13 (aluminium); it forms \\(\\mathrm{M^{3+}}\\).",
      },
      selfCheckExample: {
        prompt:
          "How much energy converts 4.8 mg of gaseous Mg into \\(\\mathrm{Mg^{2+}}\\)? Take \\(\\Delta_i H_1 = 737\\), \\(\\Delta_i H_2 = 1450\\) kJ mol⁻¹ and \\(M = 24\\) g mol⁻¹.",
        steps: [
          "Moles: \\(4.8 \\times 10^{-3} / 24 = 2.0 \\times 10^{-4}\\) mol.",
          "Energy per mole for both electrons: \\(737 + 1450 = 2187\\) kJ.",
          "\\(E = 2.0 \\times 10^{-4} \\times 2187 = 0.437\\) kJ.",
        ],
        answer: "About 0.44 kJ.",
      },
      practiceSet: [
        { prompt: "Can a second ionization enthalpy be smaller than the first?", answer: "No; it is always larger" },
        { prompt: "Which has the larger second ionization enthalpy, Na or Mg?", answer: "Na" },
        { prompt: "Successive values 899, 1757 and then a huge jump. Which group?", answer: "Group 2 (beryllium)" },
        { prompt: "Among Ca, Al, Fe and B, which has an unusually high third ionization enthalpy?", answer: "Ca" },
      ],
      pyqExampleId: "8a5307a5-4554-4224-bf24-cd6ab124f192", // identify X and Y from first and second ionization energies
      traps: [
        {
          title: "Negative or smaller second values",
          body: "Options such as −856 kJ mol⁻¹ or 590 kJ mol⁻¹ for the second ionization enthalpy of Mg are impossible. The second value must be positive and larger than 737.",
        },
        {
          title: "Second ionization compares the cations",
          body: "For IE₂, look at the ion that loses the electron. \\(\\mathrm{O^+}\\) is \\(2p^3\\) and \\(\\mathrm{N^+}\\) is \\(2p^2\\), so the dip moves one place: O is above F for IE₂, the reverse of the first ionization order.",
        },
      ],
    },
  ],
};
