import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_COS_OS_NOTE: SubtopicNote = {
  subtopicName: "Windows, Shortcuts and Kinds of Software",
  title: "Windows, Shortcuts and Kinds of Software",
  oneLineDefinition:
    "Keyboard shortcuts in Windows and browsers, the Windows tools for settings and files, and how system and application software differ.",
  whyItMatters:
    "21 questions in the Tier II bank, 13 EASY, 7 MODERATE and 1 HARD. Shortcut questions are pure recall, and File Explorer and Control Panel questions come back across years.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2cosos-shortcut",
      name: "Keyboard shortcuts",
      intuition:
        "Windows shortcuts often pair the Windows key with a letter (E for Explorer), and browser shortcuts pair Ctrl with a letter (D for bookmark). A few use function keys (F5 to reload).",
      definition:
        "Patterns that help:\n" +
        "- **Windows key + letter** opens a Windows feature.\n" +
        "- **Ctrl + letter** acts inside a program (copy, bookmark).\n" +
        "- **Alt + Enter** opens Properties for the selected item.",
      table: {
        columns: ["Task", "Shortcut", "Asked in"],
        rows: [
          { cells: ["Open File Explorer", "Windows key + E", "2022"] },
          { cells: ["Properties of the selected item", "Alt + Enter", "2022"] },
          { cells: ["Reload the current page", "F5", "2022"] },
          { cells: ["Bookmark the current page", "Ctrl + D", "2022"] },
          { cells: ["Copy", "Ctrl + C", "2023"] },
          { cells: ["Show all subfolders (File Explorer)", "Num Lock + *", "2023"] },
          { cells: ["Cycle through taskbar apps", "Windows key + T", "2025"] },
        ],
      },
      pyqExampleId: "f2810022-8d30-43e4-908c-161be438056a",
      selfCheckExample: {
        prompt: "Which shortcut saves the current web page as a bookmark? (a) Ctrl + B (b) Ctrl + D (c) Ctrl + S (d) F5",
        steps: ["D for bookmark is the standard browser shortcut."],
        answer: "(b) Ctrl + D",
      },
      practiceSet: [
        { prompt: "Which key reloads a web page?", answer: "F5" },
        { prompt: "Which shortcut opens File Explorer?", answer: "Windows key + E" },
        { prompt: "Which shortcut opens the Properties of a selected file?", answer: "Alt + Enter" },
      ],
      traps: [
        {
          title: "Ctrl + B for bookmark",
          body: "Ctrl + B makes text bold in editors. Bookmarking in a browser is Ctrl + D.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2cosos-windows",
      name: "Windows tools and settings",
      intuition:
        "Windows keeps settings in Control Panel, files in File Explorer and running programs in Task Manager. Each has panes and tabs that SSC asks about.",
      definition:
        "Key facts:\n" +
        "- **Control Panel** lists utilities to configure the system and install hardware and software.\n" +
        "- **File Explorer:** the Navigation pane is on the LEFT; the View tab has the hidden items option.\n" +
        "- **User Account Control** asks permission before system-wide changes.\n" +
        "- **Task Manager tabs:** Startup manages programs that run at start-up.\n" +
        "- **.exe** is the usual extension for Windows installers.",
      table: {
        columns: ["Tool or term", "Fact asked", "Asked in"],
        rows: [
          { cells: ["Control Panel", "Utilities to configure the system", "2022"] },
          { cells: ["Navigation pane", "The left pane of File Explorer", "2022"] },
          { cells: ["View tab (Windows 11)", "Holds the hidden items option", "2023"] },
          { cells: [".exe", "Windows installation files", "2024"] },
          { cells: ["User Account Control", "Prompts before system-wide changes", "2024"] },
          { cells: ["Startup tab (Task Manager)", "Programs that run at start-up", "2024"] },
          { cells: ["File Explorer", "Move, copy or delete files", "2024"] },
        ],
      },
      pyqExampleId: "84892b8c-8227-47ad-890a-9590ab780f5c",
      selfCheckExample: {
        prompt: "Which Windows tool lists utilities to change system settings and add hardware? (a) Notepad (b) Control Panel (c) Paint (d) Recycle Bin",
        steps: ["System settings and hardware installation live in Control Panel."],
        answer: "(b) Control Panel",
      },
      practiceSet: [
        { prompt: "Which side of File Explorer is the Navigation pane on?", answer: "The left" },
        { prompt: "What does User Account Control do?", answer: "Asks permission before system-wide changes" },
        { prompt: "Which file extension do Windows installers usually use?", answer: ".exe" },
      ],
      traps: [
        {
          title: "Putting the Navigation pane on the right",
          body: "The Navigation pane (folders and drives) is on the left; the right side shows the contents of the selected folder.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2cosos-software",
      name: "Kinds of software",
      intuition:
        "System software runs the computer (the operating system, utilities); application software does a user's task (a word processor, a browser). Applications depend on the system software underneath them.",
      definition:
        "Key facts:\n" +
        "- **LibreOffice** has Writer, Calc and Impress; there is no 'LibreOffice Excel'.\n" +
        "- **Application server:** components developers reach through the platform's API.\n" +
        "- **Interdependence:** an antivirus uses system utilities to scan disks.\n" +
        "- **COM** handles object linking in OLE.",
      table: {
        columns: ["Term", "Fact asked", "Asked in"],
        rows: [
          { cells: ["LibreOffice suite", "Writer, Calc, Impress (no Excel)", "2022"] },
          { cells: ["Application server", "Components reached through an API", "2022"] },
          { cells: ["System and application software", "An antivirus relies on system utilities", "2024"] },
          { cells: ["Component Object Model (COM)", "Handles object linking in OLE", "2025"] },
        ],
      },
      pyqExampleId: "b67e10ba-60ff-446b-aa01-6af8356eb857",
      selfCheckExample: {
        prompt: "Which is system software? (a) MS Word (b) Windows 11 (c) Chrome (d) VLC player",
        steps: ["Windows runs the computer itself.", "The others are applications."],
        answer: "(b) Windows 11",
      },
      practiceSet: [
        { prompt: "What is LibreOffice's spreadsheet program called?", answer: "Calc" },
        { prompt: "Is a web browser system software or application software?", answer: "Application software" },
        { prompt: "Which kind of software do applications depend on?", answer: "System software" },
      ],
      traps: [
        {
          title: "Borrowing Microsoft names for other suites",
          body: "LibreOffice's programs have their own names: Writer, Calc and Impress. 'LibreOffice Excel' does not exist.",
        },
      ],
    },
  ],
};
