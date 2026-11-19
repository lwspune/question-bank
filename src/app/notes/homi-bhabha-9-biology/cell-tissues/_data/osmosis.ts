import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CT_OSMOSIS_NOTE: SubtopicNote = {
  subtopicName: "Cell Chemistry and Osmosis",
  title: "Cell Chemistry and Osmosis",
  oneLineDefinition:
    "A cell is mostly oxygen, carbon and hydrogen by mass, its enzymes work best at body temperature, and water moves in or out of it by osmosis depending on the solution around it.",
  whyItMatters:
    "Four questions in the bank, two MODERATE and two HARD: which element is scarce in the cytoplasm, the temperature at which enzymes work best (given in °F), which everyday example is not water leaving cells, and which drawn cell sits in a hypertonic solution.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ctos-chemistry",
      name: "Elements of the cell and the working temperature of enzymes",
      intuition:
        "About two thirds of a living body is water, and water is mostly oxygen by mass. That is why oxygen tops the list of elements in a cell, with carbon, the backbone of every food molecule, next. The enzymes that run the cell's chemistry are proteins, and they work fastest at the body's own temperature.",
      definition:
        "- By mass, living matter is about **oxygen 65%**, **carbon 18%**, **hydrogen 10%**, **nitrogen 3%**, then **calcium** and **phosphorus**.\n" +
        "- So among O, C, H and N, **nitrogen** is present in the **least** amount.\n" +
        "- The cell's main molecules are water, carbohydrates, proteins, fats (lipids) and nucleic acids.\n" +
        "- **Enzymes** are proteins that speed up the cell's reactions. Enzymes of the human body work best at normal **body temperature, 37 °C**, which is **98.6 °F**. Too much heat destroys them.\n" +
        "- To change °C to °F: \\(F = C \\times \\frac{9}{5} + 32\\).",
      table: {
        columns: ["Element", "Share of the body's mass", "Rank"],
        rows: [
          { cells: ["Oxygen", "About 65%", "First"] },
          { cells: ["Carbon", "About 18%", "Second"] },
          { cells: ["Hydrogen", "About 10%", "Third"] },
          { cells: ["Nitrogen", "About 3%", "Fourth"] },
          { cells: ["Calcium", "About 1.5%", "Fifth"] },
          { cells: ["Phosphorus", "About 1%", "Sixth"] },
        ],
        caption: "Hydrogen atoms are the most numerous, but they are so light that oxygen wins by mass.",
      },
      selfCheckExample: {
        prompt: "Which element makes up the largest part of the mass of a living cell?",
        steps: ["Most of a cell is water, and most of the mass of water is oxygen."],
        answer: "Oxygen (about 65%)",
      },
      practiceSet: [
        { prompt: "Which element comes second after oxygen in the mass of living matter?", answer: "Carbon (about 18%)" },
        { prompt: "What is normal human body temperature in degrees Fahrenheit?", answer: "98.6 °F (37 °C)" },
        { prompt: "What kind of substances are enzymes?", answer: "Proteins that speed up the reactions in a cell" },
        { prompt: "Convert 100 °C to °F.", answer: "\\(100 \\times \\frac{9}{5} + 32 = 212\\) °F" },
      ],
      pyqExampleId: "96cc7346-be88-428e-9f6f-65bdf838e688",
      traps: [
        {
          title: "Putting carbon first",
          body: "Carbon is the key element of food molecules, but by mass oxygen comes first (about 65%), because a cell is mostly water.",
        },
        {
          title: "Reading 37.6 °F as body temperature",
          body: "Body temperature is 37 °C, which is 98.6 °F. A temperature of 37.6 °F is only just above the freezing point of water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ctos-osmosis",
      name: "Osmosis: hypotonic, isotonic and hypertonic solutions",
      intuition:
        "Water always moves towards the saltier or sweeter side, as if trying to even things out. Put a cell in plain water and water rushes in; put it in strong salt or sugar water and water rushes out, and the cell shrinks. The cell membrane lets water through but holds most dissolved things back.",
      definition:
        "- **Osmosis** is the movement of **water** (the solvent) through a **semi-permeable membrane**, from a **dilute** solution to a **concentrated** one.\n" +
        "- **Endosmosis**: water enters the cell. **Exosmosis**: water leaves the cell.\n" +
        "- **Hypotonic** outside solution (more dilute than the cell): water **enters**, the vacuole swells and the cell becomes firm (**turgid**).\n" +
        "- **Isotonic** solution (same strength): water goes in and out equally, so there is no change.\n" +
        "- **Hypertonic** solution (more concentrated): water **leaves**, and the cytoplasm shrinks away from the cell wall (**plasmolysis**).\n" +
        "- **Imbibition** is different: dry seeds and pulses soak up water into their walls and swell, with no membrane needed.",
      table: {
        columns: ["Everyday example", "Which way water moves", "Why"],
        rows: [
          { cells: ["Salt sprinkled on an earthworm or a leech", "Out of its cells", "Salt makes a hypertonic layer on its moist skin"] },
          { cells: ["Fruit kept in thick sugar syrup, or pickles in salt", "Out of the fruit and of any germs", "Germs lose water and cannot grow, so the food keeps"] },
          { cells: ["Feeling thirsty after salty snacks", "Out of body cells", "Salt in the blood draws water from the cells"] },
          { cells: ["Raisins kept in water swell", "Into the raisin", "The water outside is hypotonic: endosmosis"] },
          {
            cells: ["Dry pulses or seeds swell when soaked", "Into the seed", "Imbibition by the dry seed coat and contents"],
            noteAmber: "This is water entering, the odd one out among the water-leaving examples.",
          },
        ],
        caption: "In a drawing, arrows pointing out with the contents pulled away from the wall mean hypertonic.",
      },
      selfCheckExample: {
        prompt: "A plant cell is placed in a very strong sugar solution. What happens to it, and what is this solution called?",
        steps: [
          "The sugar solution outside is more concentrated than the cell sap.",
          "Water leaves the cell by exosmosis and the cytoplasm shrinks away from the wall.",
        ],
        answer: "The cell loses water and its contents shrink (plasmolysis): the solution is hypertonic.",
      },
      practiceSet: [
        { prompt: "Through what kind of membrane does osmosis take place?", answer: "A semi-permeable membrane" },
        { prompt: "What happens to a plant cell kept in pure water?", answer: "Water enters by endosmosis and the cell swells and becomes turgid" },
        { prompt: "What is the name of a solution in which a cell neither gains nor loses water?", answer: "An isotonic solution" },
        { prompt: "Why does a leech fall off and shrivel when salt is sprinkled on it?", answer: "The salt draws water out of its body cells by exosmosis" },
      ],
      pyqExampleId: "26967da0-66dd-46f7-b2b2-54a297e7d1bf",
      traps: [
        {
          title: "Mixing up hypotonic and hypertonic",
          body: "Hyper means more: a hypertonic solution is more concentrated than the cell, so water leaves the cell. In a hypotonic solution water enters.",
        },
        {
          title: "Calling the swelling of dry seeds osmosis",
          body: "Dry seeds and pulses swell by imbibition, soaking water into their dry material. It is water entering, unlike salting or sugaring, which draw water out.",
        },
        {
          title: "Thinking salt moves into the cells",
          body: "In osmosis it is the water that moves, from the dilute side to the concentrated side. The salt or sugar stays outside.",
        },
      ],
    },
  ],
};
