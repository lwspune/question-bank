import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_GALVANIC_NOTE: SubtopicNote = {
  subtopicName: "Galvanic or Voltaic Cell",
  title: "Galvanic Cells, the Salt Bridge and Cell Notation",
  oneLineDefinition:
    "How two half cells joined by a salt bridge make a galvanic cell, what the salt bridge does, and how to write a cell formula and its cell reaction.",
  whyItMatters:
    "5 questions. One was set in a board paper: what a salt bridge is and its functions (2025). The textbook adds the salt bridge again, the meaning of the single and double vertical lines, and writing a cell from two electrode reactions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccec-salt-bridge",
      name: "The galvanic cell and its salt bridge",
      intuition:
        "A galvanic cell keeps the two halves of a redox reaction apart, so the electrons must travel through a wire to get from one to the other, and that flow is the current. But the circuit is not complete until ions can also move between the two solutions. The salt bridge is that path for ions, and it keeps each solution electrically neutral.",
      definition:
        "- A **galvanic (voltaic) cell** produces electricity from a spontaneous redox reaction: chemical energy becomes electrical energy. Its anode is negative and its cathode positive.\n" +
        "- It has two **half cells**, each a metal strip in a solution of its own ions of known concentration, for example zinc in 1 M Zn²⁺.\n" +
        "- **Salt bridge:** a U tube holding a saturated solution of an inert electrolyte such as KCl or NH₄NO₃ with 5% agar. It is filled hot; on cooling it sets to a gel that does not run out when the tube is turned over. Its ions do not react with the electrode solutions or the electrodes.\n" +
        "- When not in use it is kept dipped in distilled water.",
      table: {
        columns: ["Function of the salt bridge", "What it means"],
        rows: [
          {
            cells: ["Completes the circuit", "It provides electrical contact between the two solutions"],
            pyqExampleId: "233716ec-bdb6-4382-8dbd-1cefe2413dd8",
            noteAmber: "Board 2025 asked what a salt bridge is and its functions: give the description and all three functions.",
          },
          { cells: ["Prevents mixing", "The two solutions stay in their own beakers"] },
          { cells: ["Keeps both solutions neutral", "Ions move out of the bridge to balance the charge building up in each solution"] },
        ],
      },
      practiceSet: [
        { prompt: "Name two electrolytes used in a salt bridge.", answer: "KCl and NH₄NO₃" },
        { prompt: "Why is agar added to the salt bridge solution?", answer: "It sets into a gel, so the solution does not run out of the inverted U tube" },
        { prompt: "In a galvanic cell, which electrode is negative?", answer: "The anode" },
      ],
      pyqExampleId: "233716ec-bdb6-4382-8dbd-1cefe2413dd8",
      traps: [
        {
          title: "Saying the salt bridge carries electrons",
          body: "Electrons flow only through the external wire. The salt bridge carries ions.",
        },
        {
          title: "Listing one function for 'functions'",
          body: "The board's 'write the functions' wants all three: completing the circuit, preventing mixing, and keeping both solutions neutral.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-cell-notation",
      name: "Writing a cell formula and its cell reaction",
      intuition:
        "A cell formula is a picture in one line, read from left to right like a journey: from the anode metal, into its solution, across the salt bridge, into the other solution and onto the cathode. Once you trust that the left side is the anode, the cell reaction writes itself: oxidation on the left, reduction on the right.",
      definition:
        "- The anode (−) is written at the extreme left and the cathode (+) at the extreme right; the electrodes are at the two ends.\n" +
        "- Insoluble species and gases sit next to their metal electrodes; the solutions of ions sit in the middle.\n" +
        "- A **single vertical line** marks a phase boundary: the two phases are in direct contact.\n" +
        "- A **double vertical line** means the two solutions are joined by a salt bridge.\n" +
        "- Concentrations and gas pressures are written in brackets.\n" +
        "- **Cell reaction:** write oxidation for the left electrode and reduction for the right electrode, multiply so the electrons are equal, and add. No electrons appear in the overall reaction.",
      formula: {
        label: "Cell notation",
        latex: "\\text{anode} \\mid \\text{anode solution} \\parallel \\text{cathode solution} \\mid \\text{cathode}",
      },
      authoredExample: {
        prompt:
          "Formulate the cell in which these electrode reactions occur, and write the overall cell reaction: \\(\\text{Zn}(s) \\to \\text{Zn}^{2+}(aq) + 2e^-\\) and \\(\\text{Ag}^+(aq) + e^- \\to \\text{Ag}(s)\\).",
        steps: [
          "Electrons are released by zinc, so zinc is oxidised: the zinc electrode is the anode (−).",
          "Ag⁺ takes up electrons and is reduced: the silver electrode is the cathode (+).",
          "Cell formula: \\(\\text{Zn}(s) \\mid \\text{Zn}^{2+}(aq) \\parallel \\text{Ag}^+(aq) \\mid \\text{Ag}(s)\\).",
          "Multiply the silver reaction by 2 to balance the electrons and add: \\(\\text{Zn}(s) + 2\\text{Ag}^+(aq) \\to \\text{Zn}^{2+}(aq) + 2\\text{Ag}(s)\\).",
        ],
        answer: "Zn(s) | Zn²⁺(aq) || Ag⁺(aq) | Ag(s); Zn + 2Ag⁺ → Zn²⁺ + 2Ag",
      },
      selfCheckExample: {
        prompt: "Write the cell reaction for the cell Ni(s) | Ni²⁺(1 M) || Cu²⁺(1 M) | Cu(s).",
        steps: ["Left (anode): \\(\\text{Ni} \\to \\text{Ni}^{2+} + 2e^-\\). Right (cathode): \\(\\text{Cu}^{2+} + 2e^- \\to \\text{Cu}\\).", "Add: \\(\\text{Ni}(s) + \\text{Cu}^{2+}(aq) \\to \\text{Ni}^{2+}(aq) + \\text{Cu}(s)\\)."],
        answer: "Ni + Cu²⁺ → Ni²⁺ + Cu",
      },
      practiceSet: [
        { prompt: "What does a double vertical line in a cell formula show?", answer: "The two solutions are connected by a salt bridge" },
        { prompt: "Write the cell formula of the Daniell cell with 1 M solutions.", answer: "\\(\\text{Zn}(s) \\mid \\text{Zn}^{2+}(1\\ \\text{M}) \\parallel \\text{Cu}^{2+}(1\\ \\text{M}) \\mid \\text{Cu}(s)\\)" },
        { prompt: "On which side of a cell formula is the electrode where reduction occurs?", answer: "The right" },
      ],
      pyqExampleId: "c71fbf0c-5e9a-47ea-89f5-881932648b1e",
      traps: [
        {
          title: "Electrons left in the overall reaction",
          body: "Multiply the half reactions so the electrons lost equal the electrons gained before adding. Electrons never appear in the net cell reaction.",
        },
        {
          title: "Cathode written on the left",
          body: "The anode always goes on the left. Writing the cathode first reverses the cell reaction and the sign of the cell potential.",
        },
      ],
    },
  ],
};
