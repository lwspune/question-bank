import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CP_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Electronegativity and Chemical Properties",
  title: "Electronegativity and Chemical Properties",
  oneLineDefinition:
    "Electron gain enthalpy and why chlorine beats fluorine, electronegativity on the Pauling scale with metallic and non-metallic character, and the chemical side of periodicity: valence, oxidation state, the nature of oxides, the anomalous second-period elements and the diagonal relationship.",
  whyItMatters:
    "Four NEET questions, from 2024 to 2026. One asks the trend in electron gain enthalpy of the halogens (Re-NEET 2026), one orders N, O, F, C and Si by electronegativity (2024), one orders Na, Be, P, Mg and Si by metallic character (2026), and one picks the incorrect statement from four on ionic size, an IUPAC name, the diagonal relationship of lithium with magnesium, and the oxidation state and covalency of aluminium in a complex ion (2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcp-electron-gain",
      name: "Electron gain enthalpy",
      intuition:
        "Electron gain enthalpy is the energy change when a gaseous atom takes in one extra electron. An atom one electron short of a noble gas configuration, a halogen, releases a lot of energy. A noble gas has to put the new electron into a fresh, higher shell, so it needs energy instead. Fluorine and oxygen are surprises: they are so small that the incoming electron is crowded by the electrons already in the n = 2 shell.",
      definition:
        "- **Electron gain enthalpy**, \\(\\Delta_{eg}H\\), is the enthalpy change when a neutral gaseous atom gains an electron: \\(\\text{X(g)} + e^- \\rightarrow \\text{X}^-\\text{(g)}\\).\n" +
        "- It is **negative** when energy is released and **positive** when energy must be supplied. A larger negative value means the atom gains the electron more readily.\n" +
        "- The halogens have very large negative values. The noble gases have large positive values, because the added electron must enter the next shell.\n" +
        "- It generally becomes more negative across a period and less negative down a group.\n" +
        "- **O and F are less negative than S and Cl:** the added electron enters the small n = 2 shell and is strongly repelled by the electrons already there. In S and Cl it goes into the larger n = 3 shell.",
      table: {
        columns: ["Group", "Electron gain enthalpy in kJ/mol", "Order, most negative first"],
        rows: [
          { cells: ["17", "F −328, Cl −349, Br −325, I −295", "Cl > F > Br > I"], pyqExampleId: "02539b01-3b77-40d4-b938-1e08686300cd", noteAmber: "Re-NEET 2026: the correct trend was Cl > F > Br > I, read as how negative the values are." },
          { cells: ["16", "O −141, S −200, Se −195, Te −190", "S > Se > Te > O"] },
          { cells: ["1", "Li −60, Na −53, K −48, Rb −47, Cs −46", "Li > Na > K > Rb > Cs"] },
          { cells: ["18", "He +48, Ne +116, Ar +96, Kr +96, Xe +77, Rn +68", "All positive: energy must be supplied"] },
        ],
        caption: "Chlorine has the most negative electron gain enthalpy of all the elements.",
      },
      pyqExampleId: "02539b01-3b77-40d4-b938-1e08686300cd",
      selfCheckExample: {
        prompt: "Why is the electron gain enthalpy of oxygen less negative than that of sulphur?",
        steps: [
          "In oxygen the added electron enters the n = 2 shell, which is small and already holds six electrons.",
          "The strong repulsion there means less energy is released. In sulphur the electron enters the larger n = 3 shell, where the repulsion is much less.",
        ],
        answer: "The added electron is crowded in oxygen's small n = 2 shell (−141 kJ/mol against −200 kJ/mol for sulphur)",
      },
      practiceSet: [
        { prompt: "Write the equation that defines the electron gain enthalpy of chlorine.", answer: "\\(\\text{Cl(g)} + e^- \\rightarrow \\text{Cl}^-\\text{(g)}\\)" },
        { prompt: "Is the electron gain enthalpy of neon positive or negative?", answer: "Positive (+116 kJ/mol)" },
        { prompt: "Which releases more energy on gaining an electron, lithium or caesium?", answer: "Lithium (−60 kJ/mol against −46 kJ/mol)" },
        { prompt: "Which group has the most negative electron gain enthalpies in each period, and why?", answer: "Group 17, the halogens: one more electron gives them a noble gas configuration" },
      ],
      traps: [
        {
          title: "Fluorine is second, not first",
          body: "Chlorine (−349 kJ/mol) has a more negative electron gain enthalpy than fluorine (−328 kJ/mol), because fluorine's small 2p shell repels the incoming electron.",
        },
        {
          title: "Noble gases need energy",
          body: "The electron gain enthalpy of a noble gas is positive. The new electron has to go into a higher shell, so the ion is unstable.",
        },
        {
          title: "Read the sign before the order",
          body: "A trend such as Cl > F > Br > I compares how negative the values are. On signed numbers, −349 is the smallest of the four.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcp-electronegativity",
      name: "Electronegativity and metallic character",
      visualizationSlug: "atom-periodic-trends",
      intuition:
        "Electronegativity is how strongly an atom in a molecule pulls a shared electron pair towards itself. Small atoms with a high effective nuclear charge pull hardest, so it rises across a period and falls down a group, with fluorine at the top. A metal is the opposite kind of atom: it loses electrons easily. So metallic character runs the other way, rising down a group and falling across a period.",
      definition:
        "- **Electronegativity** is a qualitative measure of the ability of an atom in a chemical compound to attract shared electrons to itself. It is not a measurable quantity and has no units.\n" +
        "- On the **Pauling scale** fluorine, the most electronegative element, is given 4.0.\n" +
        "- It **increases across a period** and **decreases down a group**.\n" +
        "- Non-metallic character is directly related to electronegativity, and metallic character is inversely related to it.\n" +
        "- **Metallic character** decreases across a period and increases down a group. Metals sit on the left of the table, non-metals at the top right.\n" +
        "- The elements along the border between them, silicon, germanium, arsenic, antimony and tellurium, are **metalloids** (semi-metals): they show properties of both.",
      table: {
        columns: ["Series", "Pauling electronegativity", "Trend"],
        rows: [
          { cells: ["Period 2", "Li 1.0, Be 1.5, B 2.0, C 2.5, N 3.0, O 3.5, F 4.0", "Rises across the period"], pyqExampleId: "e9d31c46-b6dc-434d-b9f6-384e465bc48d", noteAmber: "NEET 2024: the increasing order was Si < C < N < O < F." },
          { cells: ["Period 3", "Na 0.9, Mg 1.2, Al 1.5, Si 1.8, P 2.1, S 2.5, Cl 3.0", "Rises across the period"] },
          { cells: ["Group 1", "Li 1.0, Na 0.9, K 0.8, Rb 0.8, Cs 0.7", "Falls down the group"] },
          { cells: ["Group 17", "F 4.0, Cl 3.0, Br 2.8, I 2.5, At 2.2", "Falls down the group"] },
          { cells: ["Na, Mg, Be, Si, P", "Na 0.9, Mg 1.2, Be 1.5, Si 1.8, P 2.1", "Metallic character falls in this order: Na > Mg > Be > Si > P"], pyqExampleId: "f4e54f3d-7e12-4556-b68d-837b3271f6cf", noteAmber: "NEET 2026: the increasing order of metallic character was P < Si < Be < Mg < Na." },
        ],
      },
      pyqExampleId: "e9d31c46-b6dc-434d-b9f6-384e465bc48d",
      selfCheckExample: {
        prompt: "Which is more electronegative, chlorine or bromine, and why?",
        steps: [
          "Both are in group 17. Bromine is one period lower, so its outer shell is further from the nucleus and better shielded.",
          "Its pull on a shared pair is therefore weaker.",
        ],
        answer: "Chlorine (3.0 against 2.8 for bromine)",
      },
      practiceSet: [
        { prompt: "What value is given to fluorine on the Pauling electronegativity scale?", answer: "4.0" },
        { prompt: "Name three metalloids.", answer: "Any three of silicon, germanium, arsenic, antimony and tellurium" },
        { prompt: "Which has the greater metallic character, potassium or calcium?", answer: "Potassium, which is to the left of calcium in period 4" },
        { prompt: "How is the non-metallic character of an element related to its electronegativity?", answer: "Directly: the more electronegative, the more non-metallic" },
      ],
      traps: [
        {
          title: "Electronegativity is not electron gain enthalpy",
          body: "Electronegativity is the pull of a bonded atom on a shared pair, with no units. Electron gain enthalpy is the energy change when an isolated gaseous atom takes an electron, in kJ/mol. Fluorine has the highest electronegativity, but chlorine has the most negative electron gain enthalpy.",
        },
        {
          title: "Nitrogen and chlorine are equal",
          body: "On the Pauling scale nitrogen and chlorine both have 3.0, so a statement that their values differ is false.",
        },
        {
          title: "Beryllium is more metallic than silicon",
          body: "Silicon is a period lower, but it is far to the right in group 14 and is a metalloid. Beryllium, in group 2, is a metal, with the lower electronegativity (1.5 against 1.8).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcp-valence-oxides",
      name: "Valence, oxides and the second-period elements",
      intuition:
        "The outer electrons decide how many bonds an atom makes, so valence repeats along each period. Metals on the left give basic oxides and non-metals on the right give acidic ones. The first element of each group is unusually small, with only four orbitals in its valence shell, so it often behaves more like the element diagonally below it than like the rest of its own group.",
      definition:
        "- **Valence:** for groups 1, 2, 13 and 14 it equals the number of valence electrons; for groups 15, 16 and 17 it is 8 minus the number of valence electrons. So silicon and bromine give \\(\\text{SiBr}_4\\).\n" +
        "- **Oxidation state** depends on electronegativity: in \\(\\text{OF}_2\\) oxygen is +2 (fluorine is more electronegative), while in \\(\\text{Na}_2\\text{O}\\) oxygen is −2.\n" +
        "- **Oxides:** the oxide of the element on the extreme left of a period is the most basic, \\(\\text{Na}_2\\text{O} + \\text{H}_2\\text{O} \\rightarrow 2\\text{NaOH}\\). The one on the extreme right is the most acidic, \\(\\text{Cl}_2\\text{O}_7 + \\text{H}_2\\text{O} \\rightarrow 2\\text{HClO}_4\\). Oxides in the centre are amphoteric (\\(\\text{Al}_2\\text{O}_3\\), \\(\\text{As}_2\\text{O}_3\\)) or neutral (CO, NO, \\(\\text{N}_2\\text{O}\\)).\n" +
        "- **Anomalous second-period elements:** lithium, beryllium and boron to fluorine differ from the rest of their groups because of their small size, large charge to radius ratio and high electronegativity. They have only four valence orbitals (2s and 2p), so their maximum covalency is 4: boron forms \\([\\text{BF}_4]^-\\) while aluminium forms \\([\\text{AlF}_6]^{3-}\\). The p-block ones also form \\(p\\pi\\)-\\(p\\pi\\) multiple bonds with themselves and other second-period elements (C=C, C≡C, N≡N, C=O).\n" +
        "- **Diagonal relationship:** lithium behaves more like magnesium, and beryllium more like aluminium, than like the members of their own groups.",
      table: {
        columns: ["Property", "Rule", "Example"],
        rows: [
          { cells: ["Valence in groups 1, 2, 13, 14", "Equal to the number of valence electrons", "Na 1, Mg 2, Al 3, Si 4"] },
          { cells: ["Valence in groups 15, 16, 17", "8 minus the number of valence electrons", "N 3 in NH₃, O 2 in H₂O, F 1 in HF"] },
          { cells: ["Oxide on the far left", "Most basic", "Na₂O gives NaOH with water"] },
          { cells: ["Oxide on the far right", "Most acidic", "Cl₂O₇ gives HClO₄ with water"] },
          { cells: ["Oxides in the centre", "Amphoteric or neutral", "Al₂O₃ and As₂O₃ amphoteric; CO, NO and N₂O neutral"] },
          { cells: ["Maximum covalency in period 2", "4, from the 2s and 2p orbitals only", "Boron forms [BF₄]⁻; aluminium forms [AlF₆]³⁻"] },
          { cells: ["Diagonal relationship", "A second-period element resembles the element diagonally below it", "Li like Mg; Be like Al"], pyqExampleId: "977ccd66-55af-449e-b73e-6ee3103d6eac", noteAmber: "NEET 2026: the diagonal relationship of Li with Mg was a correct statement; the incorrect one claimed Al was the largest species among Mg, Mg²⁺, Al and Al³⁺ (the largest is Mg, the smallest Al³⁺)." },
        ],
      },
      pyqExampleId: "977ccd66-55af-449e-b73e-6ee3103d6eac",
      selfCheckExample: {
        prompt: "Predict the formula of the compound formed between aluminium and sulphur.",
        steps: [
          "Aluminium is in group 13, so its valence is 3.",
          "Sulphur is in group 16, so its valence is \\(8 - 6 = 2\\).",
          "Balance the valences: two Al (6) for three S (6).",
        ],
        answer: "\\(\\text{Al}_2\\text{S}_3\\)",
      },
      practiceSet: [
        { prompt: "Predict the formula of the compound formed between silicon and bromine.", answer: "\\(\\text{SiBr}_4\\)" },
        { prompt: "Which of Na₂O, Al₂O₃ and Cl₂O₇ is amphoteric?", answer: "\\(\\text{Al}_2\\text{O}_3\\)" },
        { prompt: "Why can boron form [BF₄]⁻ but not [BF₆]³⁻?", answer: "It has only four valence orbitals (2s and 2p), so its maximum covalency is 4" },
        { prompt: "Name a neutral oxide of nitrogen.", answer: "NO or \\(\\text{N}_2\\text{O}\\)" },
      ],
      traps: [
        {
          title: "Not every oxide is acidic or basic",
          body: "CO, NO and \\(\\text{N}_2\\text{O}\\) are neutral oxides, and \\(\\text{Al}_2\\text{O}_3\\) is amphoteric: it reacts with both acids and bases.",
        },
        {
          title: "Diagonal, not vertical",
          body: "Lithium resembles magnesium, the second element of group 2, not beryllium. Beryllium resembles aluminium.",
        },
        {
          title: "Oxidation state and covalency are different numbers",
          body: "Oxidation state is the charge an atom would carry; covalency is the number of bonds it forms. In \\([\\text{AlCl(H}_2\\text{O)}_5]^{2+}\\) aluminium is +3 but forms six bonds.",
        },
      ],
    },
  ],
};
