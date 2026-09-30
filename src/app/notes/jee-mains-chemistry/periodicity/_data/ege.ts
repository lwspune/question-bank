import type { SubtopicNote } from "@/app/notes/_types";

export const EGE_PER_NOTE: SubtopicNote = {
  subtopicName: "Electron Gain Enthalpy",
  title: "Electron Gain Enthalpy",
  oneLineDefinition:
    "Electron gain enthalpy is the enthalpy change when a gaseous atom takes an electron; it is negative for most atoms, positive for noble gases, and Cl, not F, has the most negative value.",
  whyItMatters:
    "Sixteen PYQs, all multiple choice, and three from 2026. Six turn on the sign: which atoms release energy on gaining an electron and how the noble gases rank. Ten rank groups 16 and 17, where F and O break the trend, and the options often differ only in whether the order is read on signed values or on magnitudes.",
  concepts: [
    // C1 — the sign of electron gain enthalpy
    {
      kind: "reference" as const,
      slug: "jcper-ege-sign",
      name: "When electron gain releases energy and when it costs energy",
      intuition:
        "An atom that is one or two electrons short of a noble-gas shell welcomes an extra electron and gives out energy, so its electron gain enthalpy is negative. A noble gas would have to put the electron into a new, higher shell, so energy must be supplied and the value is positive. An anion repels a second electron, so O⁻ → O²⁻ also costs energy.",
      definition:
        "- \\(\\Delta_{eg}H\\) **negative** = exothermic; **positive** = endothermic.\n" +
        "- Positive for all noble gases, and for Be (filled \\(2s^2\\)), N (half-filled \\(2p^3\\)) and the second electron added to \\(\\mathrm{O^-}\\).\n" +
        "- Negative for the alkali metals (Na −53) and for Al, though small.\n" +
        "- Across a period \\(\\Delta_{eg}H\\) becomes **more negative**; down a group it becomes **less negative**.\n" +
        "- **Electron affinity** is quoted as energy released, so its sign is the opposite: a negative electron affinity means the process is endothermic.",
      table: {
        columns: ["Atom", "Electron gain enthalpy (kJ mol⁻¹)", "Sign", "Why"],
        rows: [
          { cells: ["He", "+48", "Endothermic", "Electron must enter the \\(2s\\) shell"] },
          { cells: ["Ne", "+116", "Endothermic", "Most positive noble gas; the electron enters \\(3s\\)"] },
          { cells: ["Ar", "+96", "Endothermic", "Same value as Kr"] },
          { cells: ["Kr", "+96", "Endothermic", "Same value as Ar"] },
          { cells: ["Xe", "+77", "Endothermic", "Larger atom, smaller cost"] },
          { cells: ["Li", "−60", "Exothermic", "Half-filled \\(2s\\) takes a second s electron"] },
          { cells: ["Na", "−53", "Exothermic", "Small but negative"] },
          { cells: ["Cl", "−349", "Exothermic", "Most negative of all elements"] },
        ],
        caption: "The largest gap between two elements is Ne and Cl: \\(116 - (-349) = 465\\) kJ mol⁻¹.",
      },
      selfCheckExample: {
        prompt:
          "Which of these processes release energy: Na → Na⁻, Ar → Ar⁻, Cl → Cl⁻, O⁻ → O²⁻?",
        steps: [
          "Na: −53, exothermic. Cl: −349, exothermic.",
          "Ar: +96, endothermic. \\(\\mathrm{O^-}\\) repels the incoming electron, endothermic.",
        ],
        answer: "Na → Na⁻ and Cl → Cl⁻.",
      },
      practiceSet: [
        { prompt: "Is adding an electron to a neutral gaseous atom always exothermic?", answer: "No; it is endothermic for the noble gases, Be and N" },
        { prompt: "Is removing an electron from a gaseous atom always endothermic?", answer: "Yes" },
        { prompt: "Difference between the electron gain enthalpies of Ar and F?", answer: "\\(96 - (-328) = 424\\) kJ mol⁻¹" },
        { prompt: "Which pair has nearly equal values: Rb and Cs, or Na and K?", answer: "Rb and Cs (−47 and −46)" },
      ],
      pyqExampleId: "475838c6-f1ea-4c82-b063-e95a46302386", // 2023 — order of the positive values of the noble gases
      traps: [
        {
          title: "Neon, not helium, is the most positive",
          body: "Helium's value (+48) is the smallest of the noble gases, and neon's (+116) the largest. Ar and Kr are equal at +96, which is why options that separate them need care.",
        },
        {
          title: "Electron affinity flips the sign",
          body: "A question that says the electron affinity is negative for Be, N and O → O²⁻ means those processes absorb energy. Electron affinity counts energy released, so it has the opposite sign to \\(\\Delta_{eg}H\\).",
        },
      ],
    },

    // C2 — groups 16 and 17 and their anomalies
    {
      kind: "reference" as const,
      slug: "jcper-ege-anomaly",
      name: "Groups 16 and 17: why Cl beats F and S beats O",
      intuition:
        "F and O are so small that their 2p shell is crowded. An incoming electron is repelled by the electrons already packed in, so less energy is released than for the next element down. That is why Cl has the most negative value of all, and O has the least negative value in its group.",
      definition:
        "- **Group 17 by magnitude**: Cl > F > Br > I > At.\n" +
        "- **Group 16 by magnitude**: S > Se > Te > Po > O.\n" +
        "- Across a period the halogen is the most negative element; the alkali metal has the lowest ionization enthalpy.\n" +
        "- On **signed** values, \"less than\" means more negative: \\(\\Delta_{eg}H(\\mathrm{Cl}) < \\Delta_{eg}H(\\mathrm{F})\\) is true.\n" +
        "- Some papers write the order by **magnitude** (Cl > F). Before choosing, check which reading the options use.",
      table: {
        columns: ["Group", "Electron gain enthalpy (kJ mol⁻¹)", "Order by magnitude"],
        rows: [
          { cells: ["17", "F −328, Cl −349, Br −325, I −295, At −270", "Cl > F > Br > I > At"], noteAmber: "F is second, not first. Cl is the most negative element in the table." },
          { cells: ["16", "O −141, S −200, Se −195, Te −190, Po −174", "S > Se > Te > Po > O"], noteAmber: "O is the least negative in group 16, below even Po." },
          { cells: ["1", "Li −60, Na −53, K −48, Rb −47, Cs −46", "Li > Na > K > Rb ≈ Cs"] },
          { cells: ["Hydrogen", "H −73", "More negative than any alkali metal"] },
        ],
        caption: "Down each group the value becomes less negative, except that the first member of groups 16 and 17 is out of place.",
      },
      selfCheckExample: {
        prompt:
          "Using signed values, decide whether each is true: (i) \\(\\Delta_{eg}H(\\mathrm{Br}) < \\Delta_{eg}H(\\mathrm{I})\\); (ii) \\(\\Delta_{eg}H(\\mathrm{O}) < \\Delta_{eg}H(\\mathrm{Se})\\).",
        steps: [
          "(i) Br is −325 and I is −295; −325 is smaller, so true.",
          "(ii) O is −141 and Se is −195; −141 is not smaller than −195, so false.",
        ],
        answer: "(i) true, (ii) false.",
      },
      practiceSet: [
        { prompt: "Most negative electron gain enthalpy in group 17?", answer: "Cl" },
        { prompt: "Least negative electron gain enthalpy in group 16?", answer: "O" },
        { prompt: "Arrange Na, Li, F, Cl by magnitude of negative electron gain enthalpy.", answer: "Na < Li < F < Cl" },
        { prompt: "In a period, which element has the most negative electron gain enthalpy?", answer: "The halogen" },
      ],
      pyqExampleId: "07df24c3-cb36-41b2-a73b-202579c30b5e", // 2023 — the incorrect signed comparison
      traps: [
        {
          title: "F is not the most negative",
          body: "Fluorine has the highest electronegativity, but not the most negative electron gain enthalpy. Its small \\(2p\\) shell repels the added electron. Any statement that F's value is more negative than Cl's is false.",
        },
        {
          title: "Signed or magnitude",
          body: "\"S > Se > Te > O\" is right by magnitude and wrong on signed values. When one option is the exact reverse of another, the paper is testing which reading it means; pick the one consistent with the other statements in the question.",
        },
      ],
    },
  ],
};
