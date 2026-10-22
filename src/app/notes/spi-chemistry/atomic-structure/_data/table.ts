import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AT_TABLE_NOTE: SubtopicNote = {
  subtopicName: "The Periodic Table and Its Trends",
  title: "The Periodic Table and Its Trends",
  oneLineDefinition:
    "The modern periodic table puts the elements in order of atomic number, in 7 periods and 18 groups, so that size and metallic character change in a pattern you can predict.",
  whyItMatters:
    "Seven questions in the bank, three EASY and four MODERATE, one of them from the 2022 paper: Newlands' octaves, the number of periods, which elements share a period, the shell that period 2 fills, the group of an element from its chloride, and the trends in size and metallic character.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiatpt-early",
      name: "Early attempts: Döbereiner, Newlands and Mendeleev",
      intuition:
        "Before the modern table, chemists tried to sort elements by atomic mass and found patterns that worked only part of the way. Each attempt is remembered for one idea and one weakness.",
      definition:
        "- **Döbereiner's triads**: groups of three similar elements in which the middle one's atomic mass is about the average of the other two (Li 7, Na 23, K 39).\n" +
        "- **Newlands' law of octaves**: in order of atomic mass, every **eighth** element is like the first, as the eighth note of music repeats the first. Count the starting element as the first. It worked only up to **calcium**.\n" +
        "- **Mendeleev** arranged 63 elements by atomic mass and their properties, and left **gaps** for elements not yet found. Eka-aluminium and eka-silicon were later found as gallium and germanium.\n" +
        "- **Modern periodic law** (Moseley): properties repeat with **atomic number**, not atomic mass.",
      table: {
        columns: ["Attempt", "Basis", "Remembered for"],
        rows: [
          { cells: ["Döbereiner's triads", "Atomic mass, three at a time", "Middle mass is the average of the other two"] },
          {
            cells: ["Newlands' octaves", "Atomic mass", "Every eighth element is like the first"],
            noteAmber: "From hydrogen, counting it as the first, the eighth element is fluorine.",
          },
          { cells: ["Mendeleev's table", "Atomic mass and properties", "Gaps left for gallium and germanium"] },
          { cells: ["Modern periodic table", "Atomic number", "7 periods and 18 groups"] },
        ],
        caption: "Newlands' pattern breaks down after calcium.",
      },
      selfCheckExample: {
        prompt: "Calcium (atomic mass 40), strontium and barium (atomic mass 137) form a Döbereiner triad. Estimate the atomic mass of strontium.",
        steps: ["Take the average of the two ends: \\(\\frac{40 + 137}{2} = 88.5\\)."],
        answer: "About 88.5 (the real value is about 87.6).",
      },
      practiceSet: [
        { prompt: "Which scientist left gaps in his table for elements not yet discovered?", answer: "Mendeleev" },
        { prompt: "Up to which element did Newlands' law of octaves work?", answer: "Calcium" },
        { prompt: "What was Mendeleev's eka-silicon later named?", answer: "Germanium" },
        { prompt: "On what property is the modern periodic table based?", answer: "Atomic number" },
        { prompt: "In Newlands' octaves, counting lithium as the first, which element is the eighth?", answer: "Sodium" },
      ],
      pyqExampleId: "0152acbe-57a9-4106-8bc1-174823f0a911",
      traps: [
        {
          title: "Counting the eighth element wrongly",
          body:
            "In Newlands' octaves the starting element counts as the first. From lithium the order is Li, Be, B, C, N, O, F, Na, so sodium is the eighth, not fluorine.",
        },
        {
          title: "Saying Mendeleev used atomic number",
          body:
            "Mendeleev arranged the elements by atomic mass. The modern periodic table, based on atomic number, came later from Moseley's work.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiatpt-modern",
      name: "Periods, groups and shells in the modern table",
      intuition:
        "Write an element's electronic configuration and you can place it. The number of shells gives the period. The number of valence electrons gives the group, and elements in one group share their valency.",
      definition:
        "- A **period** is a horizontal row: there are **7**. A **group** is a vertical column: there are **18**.\n" +
        "- **Period number = number of shells.** All elements of period 2 fill the K and L shells, so their outer shell is L.\n" +
        "- Groups 1 and 2: group number = valence electrons. Groups 13 to 18: group number = valence electrons + 10.\n" +
        "- Elements in one group have the **same valence electrons and valency**, so their compounds have the same formula: \\(\\mathrm{MgCl_2}\\) and \\(\\mathrm{CaCl_2}\\).",
      table: {
        columns: ["Feature", "Fact", "Example"],
        rows: [
          { cells: ["Periods", "7 horizontal rows", "Period 3 runs from sodium to argon"] },
          { cells: ["Groups", "18 vertical columns", "Group 18 holds the noble gases"] },
          { cells: ["Period number", "Equals the number of shells", "Sulphur (2, 8, 6) has 3 shells: period 3"] },
          { cells: ["Group number, groups 1 and 2", "Equals the valence electrons", "Calcium (2, 8, 8, 2): group 2"] },
          { cells: ["Group number, groups 13 to 18", "Valence electrons plus 10", "Phosphorus (2, 8, 5): group 15"] },
          { cells: ["Elements in each period", "2, 8, 8, 18, 18, 32, 32", "Period 1 holds only hydrogen and helium"] },
          {
            cells: ["Same group", "Same valency, similar formulae", "Group 1: \\(\\mathrm{NaCl}\\) and \\(\\mathrm{KCl}\\)"],
            noteAmber: "A metal chloride \\(\\mathrm{XCl_2}\\) means valency 2: group 2.",
          },
        ],
        caption: "Shells give the period, valence electrons give the group.",
      },
      selfCheckExample: {
        prompt: "An element has atomic number 17. In which period and which group is it?",
        steps: [
          "Configuration: 2, 8, 7. Three shells, so period 3.",
          "Seven valence electrons, so group \\(7 + 10 = 17\\).",
        ],
        answer: "Period 3, group 17 (it is chlorine).",
      },
      practiceSet: [
        { prompt: "How many groups does the modern periodic table have?", answer: "18" },
        { prompt: "How many elements are there in period 3?", answer: "8" },
        { prompt: "An element has configuration 2, 8, 8, 1. Give its period and group.", answer: "Period 4, group 1" },
        { prompt: "An element of atomic number 12 is in which period?", answer: "Period 3 (it is 2, 8, 2)" },
        { prompt: "Sodium forms \\(\\mathrm{NaCl}\\). What is the formula of the chloride of potassium, which is in the same group?", answer: "\\(\\mathrm{KCl}\\)" },
      ],
      pyqExampleId: "b02d4059-b276-42f7-a97e-578efd2878e0",
      traps: [
        {
          title: "Swapping periods and groups",
          body: "The modern table has 7 periods (rows) and 18 groups (columns). An option of 18 for the number of periods is the count of groups.",
        },
        {
          title: "Reading the period from the electron count",
          body:
            "The period is the number of shells, not the number of electrons. Magnesium, 2, 8, 2, has three shells and is in period 3, even though its outer shell has 2 electrons.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiatpt-trends",
      name: "Trends across a period and down a group",
      intuition:
        "Across a period the shells stay the same but the nucleus gets more positive, so it pulls the electrons in tighter: atoms shrink and hold their electrons harder. Down a group a new shell is added each time: atoms grow and let go of electrons more easily.",
      definition:
        "- **Across a period (left to right)**: the number of shells stays the same, nuclear charge rises, **atomic radius decreases**, metallic character decreases.\n" +
        "- **Down a group**: a shell is added each step, **atomic radius increases**, metallic character increases.\n" +
        "- **Metallic character** is the ease of losing electrons. So the most metallic elements sit at the bottom left, and the most non-metallic at the top right (leaving out the noble gases).",
      table: {
        columns: ["Property", "Across a period, left to right", "Down a group"],
        rows: [
          { cells: ["Number of shells", "Stays the same", "Increases"] },
          { cells: ["Valence electrons", "Increase from 1 to 8", "Stay the same"] },
          {
            cells: ["Atomic radius", "Decreases", "Increases"],
            noteAmber: "Electrons are added across a period, but the radius still falls: the nucleus pulls harder.",
          },
          { cells: ["Metallic character", "Decreases", "Increases"] },
          { cells: ["Non-metallic character", "Increases", "Decreases"] },
          { cells: ["Ease of losing electrons", "Decreases", "Increases"] },
        ],
        caption: "Every row of the down-a-group column is the reverse of the across-a-period column, except valence electrons.",
      },
      selfCheckExample: {
        prompt: "Sodium, magnesium and chlorine are all in period 3. Arrange them in order of decreasing atomic radius.",
        steps: [
          "Across a period the radius falls from left to right.",
          "Left to right they are Na (group 1), Mg (group 2), Cl (group 17).",
        ],
        answer: "Na > Mg > Cl",
      },
      practiceSet: [
        { prompt: "Which is more metallic, sodium or potassium?", answer: "Potassium (it is lower in group 1)" },
        { prompt: "Which has the largest atom: lithium, sodium or potassium?", answer: "Potassium" },
        { prompt: "Which is more non-metallic, fluorine or chlorine?", answer: "Fluorine (it is higher in group 17)" },
        { prompt: "Going across period 3 from sodium to chlorine, does metallic character rise or fall?", answer: "It falls" },
      ],
      pyqExampleId: "aaa4a62f-cfad-426d-b092-acb0ed879e0b",
      traps: [
        {
          title: "Thinking more electrons means a bigger atom across a period",
          body:
            "Across a period electrons go into the same shell while the nuclear charge rises, so the atom gets smaller. The radius grows only down a group, where a new shell is added.",
        },
        {
          title: "Mixing up the direction of metallic character",
          body:
            "Metallic character falls from left to right and rises from top to bottom. Among elements of one period, the one furthest left is the most metallic.",
        },
      ],
    },
  ],
};
