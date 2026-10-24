import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CB_OSMOSIS_NOTE: SubtopicNote = {
  subtopicName: "Diffusion and Osmosis",
  title: "Diffusion and Osmosis",
  oneLineDefinition:
    "Osmosis is the movement of water through a selectively permeable membrane from the weaker solution to the stronger one.",
  whyItMatters:
    "Two questions in the bank, both EASY: what a cell does in a hypotonic solution and which way water moves in a hypertonic one. Both are won by one rule, water moves towards the stronger solution, and lost by mixing up the two words.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicbos-diffusion",
      name: "Diffusion: from more to less",
      intuition:
        "Open a bottle of scent in one corner and soon the whole room smells of it. The scent spreads from where there is a lot of it to where there is little, until it is even everywhere. That spreading is diffusion.",
      definition:
        "- **Diffusion**: substances move from a region of **higher concentration** to a region of **lower concentration**.\n" +
        "- It needs no energy and goes on until the concentration is the same everywhere.\n" +
        "- Oxygen and carbon dioxide enter and leave cells by diffusion.\n" +
        "- **Osmosis** is diffusion of **water** alone, across a **selectively permeable membrane**.",
      authoredExample: {
        prompt: "A drop of ink is put in a glass of still water. What happens, and why?",
        steps: [
          "At first the ink is all in one place, so its concentration there is high.",
          "Ink particles spread to where there are fewer of them.",
          "In time the whole glass turns evenly coloured.",
        ],
        answer: "The ink spreads through the water by diffusion, from higher to lower concentration.",
      },
      selfCheckExample: {
        prompt: "Oxygen is plentiful in the blood and scarce inside a body cell. Which way does oxygen move, and by what process?",
        steps: ["Higher concentration: the blood. Lower: the cell.", "Movement from higher to lower concentration is diffusion."],
        answer: "From the blood into the cell, by diffusion.",
      },
      practiceSet: [
        { prompt: "Does diffusion need energy from the cell?", answer: "No" },
        { prompt: "Diffusion of which substance alone, across a selectively permeable membrane, is called osmosis?", answer: "Water" },
        { prompt: "In diffusion, do particles move from higher to lower concentration, or from lower to higher?", answer: "From higher to lower" },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicbos-osmosis",
      name: "Hypotonic, isotonic and hypertonic solutions",
      intuition:
        "Water moves towards the side that has more dissolved substance, as if to dilute it. So first decide which side is stronger, the cell or the solution, and water goes that way.",
      definition:
        "- **Hypotonic** solution: weaker (more dilute) than the cell. Water moves **into** the cell; the cell **swells**. An animal cell may burst; a plant cell becomes stiff (turgid), held by its wall.\n" +
        "- **Isotonic** solution: same strength as the cell. No net movement; the cell **stays the same**.\n" +
        "- **Hypertonic** solution: stronger than the cell. Water moves **out of** the cell; the cell **shrinks**.\n" +
        "- A plant cell shrinking away from its wall in a hypertonic solution is called **plasmolysis**.",
      table: {
        columns: ["Solution outside", "Compared with the cell", "Water moves", "The cell"],
        rows: [
          { cells: ["Hypotonic (for example pure water)", "Weaker", "Into the cell", "Swells"] },
          { cells: ["Isotonic", "Same", "No net movement", "Stays the same"] },
          {
            cells: ["Hypertonic (for example strong salt or sugar solution)", "Stronger", "Out of the cell", "Shrinks"],
            noteAmber: "Hyper means more: more salt outside, so water leaves.",
          },
        ],
        caption: "Water always moves towards the stronger solution.",
      },
      selfCheckExample: {
        prompt: "Raisins are soaked overnight in plain water. Why do they swell?",
        steps: [
          "The inside of a raisin is a strong sugar solution.",
          "Plain water is weaker, so it is hypotonic to the raisin's cells.",
          "Water moves into the cells by osmosis and they swell.",
        ],
        answer: "Water enters the raisin by osmosis because plain water is hypotonic to its cells.",
      },
      practiceSet: [
        { prompt: "Water moves across a membrane from a weaker solution to a stronger one. What is this called?", answer: "Osmosis" },
        { prompt: "What happens to a cell placed in an isotonic solution?", answer: "It stays the same: no net movement of water" },
        { prompt: "What happens to a red blood cell placed in pure water?", answer: "It takes in water, swells and may burst" },
        { prompt: "What is the shrinking of a plant cell's contents away from its wall called?", answer: "Plasmolysis" },
        { prompt: "Salt is sprinkled on slices of cucumber. Which way does water move?", answer: "Out of the cucumber cells (salt makes a hypertonic solution)" },
      ],
      pyqExampleId: "80cd8e98-ab8f-400b-9d2b-b199c3c078e4",
      traps: [
        {
          title: "Swapping hypo and hyper",
          body:
            "Hypo means less, hyper means more. In a hypotonic solution the cell gains water and swells; in a hypertonic solution it loses water and shrinks.",
        },
        {
          title: "Water following the weaker side",
          body:
            "Water moves towards the stronger solution, the side with more dissolved substance, not away from it. Decide which side is stronger before you pick a direction.",
        },
      ],
    },
  ],
};
