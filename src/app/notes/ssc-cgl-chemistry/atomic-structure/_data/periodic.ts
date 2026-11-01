import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CAT_PERIODIC_NOTE: SubtopicNote = {
  subtopicName: "The Periodic Table",
  title: "The Periodic Table",
  oneLineDefinition:
    "Newlands' octaves and Mendeleev's table with their years and predictions, the group names and numbers, the blocks, and how atomic size changes across the table.",
  whyItMatters:
    "Twenty-one questions in the bank: 13 from the 2023 shifts and eight from the 2024 shifts, and none from the 2025 shifts. They ask a year, a group number or a family name, so the two tables here are the whole page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssccatpe-history",
      name: "Newlands and Mendeleev",
      intuition:
        "Two early tables ordered the elements by atomic mass. Newlands saw a repeat every eighth element; Mendeleev left gaps and predicted what would fill them.",
      definition:
        "**Newlands' Law of Octaves** (**1865**):\n" +
        "- The 56 known elements in order of atomic mass, from **hydrogen** (the lightest) to **thorium** (the 56th).\n" +
        "- Every **eighth** element resembles the first, like notes of music: **lithium** and **sodium** match.\n" +
        "- A flaw: **cobalt and nickel** sat under '**Do**' with the halogens.\n\n" +
        "**Mendeleev's table** (**1869**):\n" +
        "- 63 elements by atomic weight, with **gaps** for undiscovered ones.\n" +
        "- **Eka-aluminium** became **gallium** (predicted mass **68**); **eka-silicon** became **germanium** (72); eka-boron became scandium (44).",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Law of Octaves", "Newlands, 1865"], pyqExampleId: "9dad762c-055d-4f19-b45f-c45b9a84fe1d" },
          { cells: ["Octaves ran from", "Hydrogen to thorium, 56 elements"], pyqExampleId: "3a925d06-e9d9-4ef3-b089-960f99a355da" },
          { cells: ["Lithium matches", "Sodium"], pyqExampleId: "aeb27c43-9dc9-4f53-9297-5f3b67978806" },
          { cells: ["Co and Ni placed under", "Do, with the halogens"], pyqExampleId: "b7218201-17b3-4cc5-a7fd-faf98aac36d0" },
          { cells: ["Eka-aluminium", "Gallium, mass 68"], pyqExampleId: "010d500b-12ba-4b80-90c5-2226d80813a9" },
          { cells: ["Eka-silicon", "Germanium"], pyqExampleId: "f3493a4e-d3fb-46d2-9587-6b6c8cc1f828" },
        ],
      },
      pyqExampleId: "f2792712-0173-44ba-abd9-8459fb132fd4",
      selfCheckExample: {
        prompt: "Count eight from lithium in Newlands' order (Li, Be, B, C, N, O, F, ...). Which element comes eighth?",
        steps: ["Li, Be, B, C, N, O, F are the first seven.", "The eighth is sodium, which resembles lithium."],
        answer: "Sodium.",
      },
      practiceSet: [
        { prompt: "Which element did eka-silicon turn out to be?", answer: "Germanium" },
        { prompt: "With which element did Newlands start?", answer: "Hydrogen" },
        { prompt: "In what order did Mendeleev arrange the elements?", answer: "By atomic weight" },
      ],
      traps: [
        {
          title: "Hydrogen is the lightest, not the heaviest",
          body: "Newlands began with **hydrogen**, the element of **lowest** atomic mass. A statement calling it the highest is the false one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccatpe-groups",
      name: "Groups, periods, blocks and trends",
      intuition:
        "Each column is a family with a name; each row ends with a noble gas. A group number gives the valence electrons and a period number gives the shells, so the atomic number follows.",
      definition:
        "Families:\n" +
        "- **Group 1**: alkali metals, highly electropositive (sodium). **Group 2**: alkaline earth metals (Mg, Ca, Sr, Ba, Ra).\n" +
        "- **Group 16**: **chalcogens**. **Group 17**: halogens (F, Cl, Br, I). **Group 18**: noble gases (He, Xe).\n" +
        "- **Groups 3 to 12**: transition elements, the **d-block**. **Lanthanides**: the **rare earth elements** (f-block).\n\n" +
        "Rows and trends:\n" +
        "- Every period ends in a noble gas: **period 5** ends at **xenon**. **Period 6** holds tungsten, platinum; silicon is period 3.\n" +
        "- Atomic size **increases down a group** (a shell is added each step). Atomic radius is measured in **picometres**.\n" +
        "- **Fluorine** has electronegativity **4.0** on Pauling's scale, the highest.\n" +
        "- Period 2, group 17 means shells 2, 7: atomic number **9**.",
      table: {
        columns: ["Group", "Name"],
        rows: [
          { cells: ["1", "Alkali metals"] },
          { cells: ["2", "Alkaline earth metals"], pyqExampleId: "bfde7137-ffdf-4dd5-a0b5-d4d0668b61f6" },
          { cells: ["16", "Chalcogens"], pyqExampleId: "b923cfa1-2ea2-4438-b8df-c3b3b90d80e5" },
          { cells: ["17", "Halogens"], pyqExampleId: "bdf8b3a6-7803-4a0e-bbdf-5478663a1c5f" },
          { cells: ["18", "Noble gases"] },
          { cells: ["3 to 12", "Transition elements, d-block"], pyqExampleId: "f91e9f51-f34d-467c-b0f9-efd52b7dda6e" },
        ],
      },
      pyqExampleId: "3c83d146-b335-4f67-aab3-59f7f867b146",
      selfCheckExample: {
        prompt: "An element is in period 3 and group 2. What is its atomic number?",
        steps: ["Period 3 means three shells; group 2 means two electrons in the outer shell.", "2, 8, 2 adds to 12 (magnesium)."],
        answer: "12.",
      },
      practiceSet: [
        { prompt: "What happens to atomic size down a group?", answer: "It increases" },
        { prompt: "Which element ends the fifth period?", answer: "Xenon" },
        { prompt: "What are the lanthanides also called?", answer: "Rare earth elements" },
      ],
      traps: [
        {
          title: "Lanthanides are f-block",
          body: "The **lanthanides** are **f-block** rare earths, not d-block. The d-block is Groups 3 to 12.",
        },
      ],
    },
  ],
};
