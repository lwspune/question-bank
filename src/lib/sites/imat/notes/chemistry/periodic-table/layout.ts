import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_PTB_LAYOUT_NOTE: SubtopicNote = {
  subtopicName: "Layout of the Table",
  title: "Groups, Periods, Blocks and Typical Charges",
  oneLineDefinition:
    "The table orders elements by atomic number; rows (periods) give the outer shell, columns (groups) give the valence electrons, and the group predicts an element's usual charge.",
  whyItMatters:
    "The 2013 paper asked which of five formulas breaks the usual charges of main-group elements, and 2011 asked about the oxide and sulfate of a group 13 element. Both need the charge an element takes from its group.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ptb-groups-periods",
      name: "Groups, periods and blocks of the periodic table",
      intuition:
        "The table is built from electron configurations. A new row starts each time electrons begin a new shell, so the period number is the outer shell. Elements in one column have the same number of outer electrons, which is why they react alike. The block is simply the subshell that the last electron enters.",
      definition:
        "Elements are arranged in order of **atomic number** \\(Z\\). (Writing configurations is taught in the Atomic Structure chapter.)\n" +
        "- A **period** is a row. The period number equals the number of the outer shell: sodium, \\([\\mathrm{Ne}]\\,3s^1\\), is in period 3.\n" +
        "- A **group** is a column, numbered 1 to 18. Older books number the main groups I to VIII, so group 13 is III and group 17 is VII.\n" +
        "- Main-group valence electrons: groups 1 and 2 have 1 and 2; groups 13 to 18 have the group number minus 10.\n" +
        "- Family names: group 1 **alkali metals**, group 2 **alkaline earth metals**, group 17 **halogens**, group 18 **noble gases**; groups 3 to 12 are the **transition metals**.",
      table: {
        columns: ["Block", "Groups", "Subshell being filled", "Examples"],
        rows: [
          { cells: ["s-block", "Groups 1 and 2 (and helium)", "ns", "Na, Mg, Ca"] },
          { cells: ["p-block", "Groups 13 to 18", "np", "C, O, Cl, Ne"] },
          { cells: ["d-block", "Groups 3 to 12", "(n−1)d", "Fe, Cu, Zn"] },
          { cells: ["f-block", "Lanthanides and actinides, drawn as two rows below", "(n−2)f", "Ce, U"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "An atom has the ground-state configuration \\(1s^2\\,2s^2\\,2p^6\\,3s^2\\,3p^4\\). Where is it in the periodic table?",
        options: [
          "Period 3, group 16",
          "Period 4, group 16",
          "Period 3, group 14",
          "Period 3, group 4",
          "Period 2, group 16",
        ],
        steps: [
          "The outer shell is \\(n = 3\\), so it is in period 3.",
          "It has \\(2 + 4 = 6\\) outer electrons in s and p, so it is in group \\(6 + 10 = 16\\) (old group VI). It is sulfur.",
          "C adds 10 to the p electrons only and forgets the two 3s electrons. D uses the p count alone. B and E misread the shell number.",
        ],
        answer: "(A) Period 3, group 16",
      },
      practiceSet: [
        { prompt: "Give the period and group of calcium (\\(Z = 20\\)).", answer: "Period 4, group 2", method: "\\([\\mathrm{Ar}]\\,4s^2\\)" },
        { prompt: "Which element is in period 2, group 15?", answer: "Nitrogen" },
        { prompt: "In which block is iron?", answer: "The d-block" },
      ],
      traps: [
        {
          title: "Group 13 to 18 elements have the group number minus 10 valence electrons",
          body: "Chlorine is in group 17 but has 7 valence electrons, not 17. With the old numbering it is group VII, which gives 7 directly. Check which numbering the question uses.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-ptb-metals-nonmetals",
      name: "Metals, non-metals and metalloids",
      intuition:
        "Metal atoms hold their outer electrons loosely, so they lose them easily, form positive ions and share a sea of mobile electrons that conducts electricity. Non-metal atoms hold electrons tightly and tend to gain or share them. Along the boundary sit the metalloids, which are in between in both looks and behaviour.",
      definition:
        "- A staircase line runs from boron down to astatine. **Metals** lie to the left of it (most elements), **non-metals** to the right, plus hydrogen.\n" +
        "- **Metalloids** lie along the line: boron, silicon, germanium, arsenic, antimony and tellurium.\n" +
        "- **Metallic character** increases down a group and from right to left along a period, so the most metallic elements are at the bottom left.\n" +
        "- Metal oxides are **basic** (they react with acids). Non-metal oxides are **acidic** or neutral. A few oxides are **amphoteric** (react with both acids and bases): \\(\\mathrm{Al_2O_3}\\), \\(\\mathrm{ZnO}\\).",
      table: {
        columns: ["Class", "Where in the table", "Typical physical properties", "Oxides", "Examples"],
        rows: [
          { cells: ["Metals", "Left and centre, below the staircase", "Shiny, conduct heat and electricity, malleable; mostly solids (mercury is a liquid)", "Basic; a few amphoteric", "Na, Mg, Fe, Cu"] },
          { cells: ["Non-metals", "Right, above the staircase, plus hydrogen", "Dull, poor conductors (graphite conducts), brittle as solids; many are gases", "Acidic (\\(\\mathrm{CO_2}\\), \\(\\mathrm{SO_2}\\)) or neutral (CO, \\(\\mathrm{H_2O}\\))", "C, N, O, S, Cl"] },
          { cells: ["Metalloids", "Along the staircase", "Look metallic but are brittle; semiconductors", "Weakly acidic or amphoteric", "B, Si, Ge, As"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these elements is a metalloid?",
        options: ["Aluminium", "Magnesium", "Silicon", "Phosphorus", "Sulfur"],
        steps: [
          "Silicon is a semiconductor on the staircase line: a metalloid.",
          "Aluminium sits next to the line but is a metal (it conducts well and is malleable). Magnesium is a metal.",
          "Phosphorus and sulfur are non-metals.",
        ],
        answer: "(C) Silicon",
      },
      practiceSet: [
        { prompt: "Is sulfur dioxide an acidic or a basic oxide?", answer: "Acidic" },
        { prompt: "Which non-metal conducts electricity well?", answer: "Carbon, as graphite" },
        { prompt: "Which metal is a liquid at room temperature?", answer: "Mercury" },
      ],
      traps: [
        {
          title: "Aluminium is a metal, not a metalloid",
          body: "Aluminium touches the staircase line but is a good conductor and a typical metal. Its oxide is amphoteric, which can mislead. The metalloids are B, Si, Ge, As, Sb and Te.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ptb-typical-charges",
      name: "Typical ion charges from the group, and writing ionic formulas",
      intuition:
        "Main-group atoms gain or lose just enough electrons to reach the arrangement of the nearest noble gas. Metals on the left lose their few valence electrons; non-metals on the right gain the few they lack. Once you know the two charges, the formula is the smallest whole-number ratio that makes the total charge zero.",
      definition:
        "Typical charges (and oxidation states) of main-group elements:\n" +
        "- Group 1: **+1**. Group 2: **+2**. Group 13: **+3** (aluminium, gallium, indium; boron forms covalent compounds).\n" +
        "- Group 14: +4 in compounds such as \\(\\mathrm{SnS_2}\\); tin and lead also show +2.\n" +
        "- Group 15: **−3** in nitrides and phosphides. Group 16: **−2**. Group 17: **−1** in halides. Group 18: no ions.\n" +
        "- Common polyatomic ions: \\(\\mathrm{OH^-}\\), \\(\\mathrm{NO_3^-}\\), \\(\\mathrm{HCO_3^-}\\), \\(\\mathrm{SO_4^{2-}}\\), \\(\\mathrm{CO_3^{2-}}\\), \\(\\mathrm{PO_4^{3-}}\\), \\(\\mathrm{NH_4^+}\\).\n" +
        "- In metal hydrides such as \\(\\mathrm{NaH}\\), hydrogen is **−1**.",
      formula: {
        label: "Charge balance in an ionic formula",
        latex: "\\sum (\\text{ion charge} \\times \\text{number of ions}) = 0",
      },
      authoredExample: {
        prompt: "Write the formulas of aluminium sulfate and calcium nitride.",
        steps: [
          "Aluminium is group 13, so \\(\\mathrm{Al^{3+}}\\). Sulfate is \\(\\mathrm{SO_4^{2-}}\\). Two \\(\\mathrm{Al^{3+}}\\) give +6, three \\(\\mathrm{SO_4^{2-}}\\) give −6: \\(\\mathrm{Al_2(SO_4)_3}\\).",
          "Calcium is group 2, so \\(\\mathrm{Ca^{2+}}\\). Nitrogen is group 15, so \\(\\mathrm{N^{3-}}\\). Three \\(\\mathrm{Ca^{2+}}\\) give +6, two \\(\\mathrm{N^{3-}}\\) give −6: \\(\\mathrm{Ca_3N_2}\\).",
        ],
        answer: "\\(\\mathrm{Al_2(SO_4)_3}\\) and \\(\\mathrm{Ca_3N_2}\\)",
      },
      selfCheckExample: {
        prompt: "Which one of these formulas is NOT correct?",
        options: [
          "\\(\\mathrm{K_2SO_4}\\)",
          "\\(\\mathrm{MgCl_2}\\)",
          "\\(\\mathrm{AlPO_4}\\)",
          "\\(\\mathrm{SrNO_3}\\)",
          "\\(\\mathrm{Li_2O}\\)",
        ],
        steps: [
          "Strontium is in group 2, so it forms \\(\\mathrm{Sr^{2+}}\\). With nitrate \\(\\mathrm{NO_3^-}\\) it needs two: \\(\\mathrm{Sr(NO_3)_2}\\). So D is wrong.",
          "A: two \\(\\mathrm{K^+}\\) balance \\(\\mathrm{SO_4^{2-}}\\). B: \\(\\mathrm{Mg^{2+}}\\) with two \\(\\mathrm{Cl^-}\\). C: \\(\\mathrm{Al^{3+}}\\) with \\(\\mathrm{PO_4^{3-}}\\). E: two \\(\\mathrm{Li^+}\\) with \\(\\mathrm{O^{2-}}\\). All balance.",
        ],
        answer: "(D) \\(\\mathrm{SrNO_3}\\)",
      },
      practiceSet: [
        { prompt: "Write the formula of barium hydroxide.", answer: "\\(\\mathrm{Ba(OH)_2}\\)", method: "\\(\\mathrm{Ba^{2+}}\\) needs two \\(\\mathrm{OH^-}\\)" },
        { prompt: "Write the formula of indium oxide (indium is in group 13).", answer: "\\(\\mathrm{In_2O_3}\\)", method: "Two +3 balance three −2" },
        { prompt: "What is the oxidation state of hydrogen in lithium hydride, LiH?", answer: "−1", method: "Lithium is always +1" },
        { prompt: "Write the formula of potassium hydrogencarbonate.", answer: "\\(\\mathrm{KHCO_3}\\)" },
      ],
      traps: [
        {
          title: "Group 13 metals form 3+ ions",
          body: "Aluminium, gallium and indium form \\(\\mathrm{M^{3+}}\\), so their oxides are \\(\\mathrm{M_2O_3}\\), their sulfates \\(\\mathrm{M_2(SO_4)_3}\\) and their carbonates (where they exist) \\(\\mathrm{M_2(CO_3)_3}\\). A formula like \\(\\mathrm{AlSO_4}\\) treats the metal as 2+ and is wrong.",
        },
      ],
    },
  ],
};
