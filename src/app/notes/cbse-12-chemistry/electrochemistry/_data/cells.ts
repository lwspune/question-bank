import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_EC_CELLS_NOTE: SubtopicNote = {
  subtopicName: "Electrochemical Cells",
  title: "Electrochemical Cells: Galvanic and Electrolytic",
  oneLineDefinition:
    "The two kinds of electrochemical cell, and what happens to a Daniell cell when an outside voltage opposes its own: it keeps working, stops, or runs backwards as an electrolytic cell.",
  whyItMatters:
    "1 question, from the 2025 board paper: when does a galvanic cell behave like an electrolytic cell? The board asks the same idea on other pages too: as a case-study part in 2022 and 2024, as an assertion-reason item in 2024, and as half of a short answer in 2022. It is one fixed rule, so learn the three cases once.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcec-opposing-voltage",
      name: "A Daniell cell against an opposing voltage",
      intuition:
        "A galvanic cell pushes electrons out of its zinc electrode with a push of 1.1 V. Connect an outside supply that pushes the other way. While your push is weaker, the cell still wins. When the two pushes are equal, nothing moves. Push harder than the cell and you win: the electrons go backwards, the reactions reverse and the cell now uses electrical energy instead of giving it out.",
      definition:
        "- A **galvanic (voltaic) cell** turns the Gibbs energy of a spontaneous redox reaction into electrical energy. The Daniell cell, \\(\\text{Zn(s)} + \\text{Cu}^{2+}(aq) \\rightarrow \\text{Zn}^{2+}(aq) + \\text{Cu(s)}\\), has a potential of 1.1 V when both ion concentrations are 1 mol dm⁻³.\n" +
        "- An **electrolytic cell** uses electrical energy from outside to carry out a non-spontaneous reaction.\n" +
        "- Apply an external voltage \\(E_{ext}\\) that opposes the cell's own potential:\n" +
        "- \\(E_{ext} < 1.1\\) V: electrons flow from Zn to Cu (current from Cu to Zn); zinc dissolves and copper deposits. The cell works as a galvanic cell.\n" +
        "- \\(E_{ext} = 1.1\\) V: no current flows and no reaction takes place.\n" +
        "- \\(E_{ext} > 1.1\\) V: electrons flow from Cu to Zn (current from Zn to Cu); zinc deposits on the zinc electrode and copper dissolves. The cell now works as an **electrolytic cell**.",
      table: {
        columns: ["External opposing voltage", "Electrons flow", "At the electrodes", "The cell is"],
        rows: [
          {
            cells: ["Less than the cell potential", "From Zn to Cu", "Zn dissolves, Cu deposits", "Galvanic"],
          },
          {
            cells: ["Equal to the cell potential", "No flow", "No reaction", "At balance, giving no current"],
          },
          {
            cells: ["More than the cell potential", "From Cu to Zn", "Zn deposits, Cu dissolves", "Electrolytic"],
            noteAmber: "Board 2025 asked this as a one-mark MCQ: the answer is E(ext) greater than E(cell).",
          },
        ],
      },
      practiceSet: [
        {
          prompt: "A Daniell cell (1.1 V) is connected to an outside supply of 0.8 V that opposes it. Which way do electrons flow in the outer wire, and which metal dissolves?",
          answer: "From Zn to Cu; zinc dissolves, because 0.8 V is less than 1.1 V and the cell still works as a galvanic cell",
        },
        {
          prompt: "An opposing voltage of 1.5 V is applied to a Daniell cell. Name the metal that deposits and say what kind of cell it has become.",
          answer: "Zinc deposits on the zinc electrode; the cell works as an electrolytic cell",
        },
        {
          prompt: "What is observed when the opposing voltage exactly equals the potential of a Daniell cell?",
          answer: "No current flows and no chemical reaction takes place",
        },
      ],
      pyqExampleId: "e4659ecf-ad0d-4904-b180-969cd8d3e346",
      traps: [
        {
          title: "Calling the balance point electrolytic",
          body: "When the opposing voltage equals the cell potential the cell is neither giving nor taking energy: there is no current and no reaction. It becomes electrolytic only when the outside voltage is greater.",
        },
        {
          title: "Mixing up electron flow and current",
          body: "Current flows opposite to electrons. In the working Daniell cell electrons go from Zn to Cu, so the current goes from Cu to Zn. Say which one you mean.",
        },
      ],
    },
  ],
};
