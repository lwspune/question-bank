import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_CMS_OFFICE_NOTE: SubtopicNote = {
  subtopicName: "Word, Excel and PowerPoint",
  title: "Word, Excel and PowerPoint",
  oneLineDefinition:
    "Keyboard shortcuts, tabs and tools in MS Word, what Excel's functions return, and the basics of building a PowerPoint presentation.",
  whyItMatters:
    "39 questions in the Tier II bank, 24 EASY and 15 MODERATE. Keyboard shortcuts alone account for 10 of them, and SSC names a version (2010, 365) that rarely changes the answer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2cmsof-word",
      name: "MS Word",
      intuition:
        "Word questions ask for a shortcut, the place a setting lives (a tab or a dialog box), or what a feature is for. Most shortcuts are Ctrl plus a letter.",
      definition:
        "Key facts:\n" +
        "- **Styles** give headings and titles a consistent look; direct formatting changes only the selected text.\n" +
        "- **Section break (next page)** lets the new section have its own orientation and margins.\n" +
        "- **Page Setup** is under the Layout tab.\n" +
        "- **Quick Access Toolbar** shows Save, Undo and Redo by default.\n" +
        "- **Shading** colours the background behind the selected text.",
      table: {
        columns: ["Task in Word", "Shortcut or tool", "Asked in"],
        rows: [
          { cells: ["Insert a hyperlink", "Ctrl + K", "2022"] },
          { cells: ["Centre-align text", "Ctrl + E", "2022"] },
          { cells: ["Close the document window", "Alt + F4", "2022"] },
          { cells: ["Add bullets (Word 2010)", "Ctrl + Shift + L", "2024"] },
          { cells: ["Increase indent", "Ctrl + M", "2024"] },
          { cells: ["Print only some pages", "Custom Print", "2022"] },
          { cells: ["See the page as printed", "Print Preview", "2023"] },
          { cells: ["Consistent headings", "Styles", "2024"] },
          { cells: ["Change one heading only", "Direct formatting", "2025"] },
        ],
      },
      pyqExampleId: "17c7a419-efbe-4b36-9b44-f84c40549223",
      selfCheckExample: {
        prompt: "Which tab in Word holds the Page Setup dialog box? (a) Home (b) Insert (c) Layout (d) View",
        steps: ["Margins, orientation and size are page layout settings."],
        answer: "(c) Layout",
      },
      practiceSet: [
        { prompt: "Which shortcut increases a paragraph's indent in Word?", answer: "Ctrl + M" },
        { prompt: "Which feature keeps every heading's look consistent?", answer: "Styles" },
        { prompt: "Which three buttons are on Word 2010's Quick Access Toolbar by default?", answer: "Save, Undo and Redo" },
      ],
      traps: [
        {
          title: "Using Ctrl + C for centre",
          body: "Ctrl + C copies. Centre alignment is Ctrl + E (left is Ctrl + L, right is Ctrl + R, justify is Ctrl + J).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2cmsof-excel",
      name: "MS Excel",
      visualizationSlug: "ssc-t2-excel-range",
      intuition:
        "A cell is where a column and a row meet, named by column letter then row number (B7). Functions take a range and return one answer: SUM adds, COUNT counts numbers, COUNTIF counts the cells that meet a condition.",
      definition:
        "Key facts:\n" +
        "- **Cell reference:** column letter then row number (A10).\n" +
        "- **Ribbon:** the strip of tabs and commands below the title bar.\n" +
        "- **MATCH(value, array, 1)** gives the position of the largest value not more than the one sought.\n" +
        "- **Filter** hides rows that do not meet a condition without deleting them.\n" +
        "- **Inserting a row** shifts the rows below it down.",
      table: {
        columns: ["Task in Excel", "Shortcut or function", "Asked in"],
        rows: [
          { cells: ["New blank workbook", "Ctrl + N", "2022"] },
          { cells: ["Select the whole row", "Shift + Spacebar", "2022"] },
          { cells: ["Adjust column width", "Alt + H + O + W", "2024"] },
          { cells: ["Line break inside a cell", "Alt + Enter", "2025"] },
          { cells: ["Add a range", "SUM", "2023"] },
          { cells: ["Count cells with numbers", "COUNT", "2024"] },
          { cells: ["Count cells meeting a condition", "COUNTIF", "2025"] },
          { cells: ["Show only rows above a mark", "Filter", "2025"] },
          { cells: ["A math function", "ABS", "2022"] },
          { cells: ["Column width limit (Excel 2003)", "255 characters", "2024"] },
        ],
      },
      pyqExampleId: "e5f41d92-3d78-4c53-a069-0decc06873cc",
      selfCheckExample: {
        prompt: "What does =SUM(B2:B5) do? (a) Counts the cells (b) Adds the values in B2 to B5 (c) Finds the largest value (d) Averages the values",
        steps: ["SUM adds every value in the range."],
        answer: "(b) Adds the values in B2 to B5",
      },
      practiceSet: [
        { prompt: "How is the cell in column C and row 4 written?", answer: "C4" },
        { prompt: "Which shortcut starts a new line inside the same cell?", answer: "Alt + Enter" },
        { prompt: "Which tool shows only the rows you want without deleting the rest?", answer: "Filter" },
      ],
      traps: [
        {
          title: "Confusing COUNT with COUNTIF",
          body: "COUNT counts every cell that holds a number. COUNTIF counts only the cells that meet the condition you give, such as greater than 10.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2cmsof-ppt",
      name: "MS PowerPoint",
      intuition:
        "PowerPoint questions are about building a presentation: starting one, keeping its look consistent, and running the slide show.",
      definition:
        "Key facts:\n" +
        "- **Templates** keep a presentation's design consistent.\n" +
        "- **Placeholders** keep text in place when content changes; loose text boxes drift.\n" +
        "- **Esc** ends a slide show and returns to editing.\n" +
        "- **New blank presentation:** File, New, Blank Presentation.",
      table: {
        columns: ["Task in PowerPoint", "How", "Asked in"],
        rows: [
          { cells: ["Leave the slide show", "Press Esc", "2024"] },
          { cells: ["Start a blank presentation", "File, New, Blank Presentation", "2024"] },
          { cells: ["Keep a consistent design", "Use a template", "2024"] },
          { cells: ["Reorganise content", "Insert and delete slides", "2024"] },
          { cells: ["Stop text boxes moving", "Use placeholders", "2025"] },
        ],
      },
      pyqExampleId: "6ef22749-efeb-4110-ae25-8f10600f8a58",
      selfCheckExample: {
        prompt: "What keeps the fonts and colours of every slide the same? (a) A placeholder (b) A template (c) Slide sorter (d) Animation",
        steps: ["A template carries one design across all slides."],
        answer: "(b) A template",
      },
      practiceSet: [
        { prompt: "Which key starts a slide show from the first slide in PowerPoint?", answer: "F5" },
        { prompt: "Why use placeholders?", answer: "They keep text in its place when content is edited" },
        { prompt: "What is the menu path for a blank presentation?", answer: "File, New, Blank Presentation" },
      ],
      traps: [
        {
          title: "Thinking Esc closes PowerPoint",
          body: "Esc only ends the slide show; the presentation stays open for editing.",
        },
      ],
    },
  ],
};
