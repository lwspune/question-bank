import type { SubtopicNote } from "@/app/notes/_types";

export const CHANGES_NOTE: SubtopicNote = {
  subtopicName: "Physical vs Chemical Changes",
  title: "Physical vs Chemical Changes",
  oneLineDefinition:
    "A physical change alters only the form or state of a substance and is usually reversible; a chemical change makes a brand-new substance with new properties and is usually irreversible.",
  whyItMatters:
    "Four PYQs, all EASY, all the same two shapes: 'which one is a chemical change?' and 'which statement is NOT correct?'. " +
    "The entire subtopic rests on one test — is a new substance formed? — plus knowing which everyday examples sit on each side. Souring of milk, rusting and burning are chemical; melting, boiling and dissolving are physical.",
  concepts: [
    // FOUNDATION — the one test (reference)
    {
      kind: "reference" as const,
      slug: "physical-vs-chemical-test",
      name: "The test: is a new substance formed?",
      intuition:
        "Only one question separates the two kinds of change: after the change, do you still have the same substance (just in a new form), or a completely new substance? Same substance = physical. New substance = chemical.",
      definition:
        "The distinguishing features:\n" +
        "- **Physical change** — only the **physical form or state** changes; **no new substance** is formed; the **chemical composition of the molecules stays the same**; usually **reversible**. Examples: melting, boiling, freezing, dissolving, cutting, magnetising.\n" +
        "- **Chemical change** — a **new substance** with **new properties** is formed; the **chemical composition changes**; usually **irreversible** and often releases or absorbs energy. Examples: rusting, burning, cooking, souring of milk.\n" +
        "- Some events involve **both**: a **burning candle** melts wax (physical) and burns the vapour (chemical) at the same time.\n" +
        "- The **interconversion of states of matter** (ice ⇌ water ⇌ steam) is a **physical change** — same H₂O molecules throughout.",
      table: {
        columns: ["Feature", "Physical change", "Chemical change"],
        rows: [
          { cells: ["New substance?", "No", "Yes"] },
          { cells: ["Molecular composition", "Unchanged", "Changed"] },
          { cells: ["Reversible?", "Usually yes", "Usually no"] },
          {
            cells: ["Examples", "Melting, boiling, dissolving", "Rusting, burning, souring"],
            noteAmber: "Burning a candle is BOTH: wax melting is physical, vapour burning is chemical.",
          },
        ],
        caption: "The whole distinction is one question: is a new substance formed?",
      },
      pyqExampleId: "58d6cf43-8462-4846-bf22-7e426c607d3b", // NOT correct: physical change composition changes
      selfCheckExample: {
        prompt:
          "Which statement is NOT correct? (a) Interconversion of states is a physical change (b) A burning candle shows both physical and chemical change (c) During a physical change, the chemical composition of molecules changes (d) Rusting of iron is a chemical change.",
        steps: [
          "Interconversion of states keeps the same molecules — physical change — so (a) is correct.",
          "A candle melts (physical) and burns (chemical) — so (b) is correct.",
          "In a physical change the composition does NOT change — so (c) is the false statement.",
          "Rusting forms a new substance (iron oxide) — chemical change — so (d) is correct.",
        ],
        answer: "Statement (c) — in a physical change the chemical composition does NOT change.",
      },
      practiceSet: [
        { prompt: "What is the single test that distinguishes a chemical change from a physical change?", answer: "Whether a new substance is formed" },
        { prompt: "Is melting of ice a physical or chemical change?", answer: "Physical", method: "same H₂O molecules, just a state change" },
        { prompt: "Does the molecular composition change in a physical change?", answer: "No" },
        { prompt: "Burning of a candle involves which kind(s) of change?", answer: "Both physical and chemical" },
      ],
      traps: [
        {
          title: "Physical change keeps the composition",
          body:
            "A common false statement is 'during a physical change, the chemical composition of molecules changes' — that is **NOT correct**. In a physical change the molecules are unchanged; only the form/state differs.",
        },
      ],
    },

    // examples on each side (reference)
    {
      kind: "reference" as const,
      slug: "change-examples",
      name: "Examples: which side is each change on?",
      intuition:
        "The bank simply lists four everyday events and asks which one is the chemical (or the only non-chemical) change. The trick events are the ones that look physical but make a new substance — souring of milk and the natural greying of hair.",
      definition:
        "Sort the common bank examples:\n" +
        "- **Chemical changes** (new substance formed): **rusting of iron**, **burning of coal/candle**, **souring of milk** (lactose → lactic acid by bacteria), **natural greying of hair** (loss of pigment by a chemical process), **cooking food**, **reaction of acid with base**, **digestion**.\n" +
        "- **Physical changes** (no new substance): **melting of ice**, **boiling of water**, **dissolving salt/sugar in water**, **cutting paper**, **magnetising iron**, **glowing of a bulb filament**.",
      table: {
        columns: ["Event", "Change type", "Why"],
        rows: [
          { cells: ["Rusting of iron", "Chemical", "Iron → iron oxide (new substance)"] },
          { cells: ["Burning of coal", "Chemical", "Carbon → CO₂ + ash"] },
          {
            cells: ["Souring of milk", "Chemical", "Bacteria turn lactose into lactic acid"],
            noteAmber: "Souring of milk LOOKS physical but is chemical — a new acid is formed.",
          },
          {
            cells: ["Greying of hair (natural)", "Chemical", "Pigment chemically lost — irreversible"],
            noteAmber: "Natural greying of hair is a chemical change, not a physical one.",
          },
          { cells: ["Melting of ice", "Physical", "Still H₂O, just a state change"] },
          { cells: ["Reaction of acid with base", "Chemical", "Forms salt + water"] },
        ],
      },
      pyqExampleId: "a09ae431-d3c8-4066-a834-89350da6c05c", // melting of ice = NOT chemical
      practiceSet: [
        { prompt: "Is souring of milk a physical or chemical change?", answer: "Chemical", method: "lactose is converted to lactic acid" },
        { prompt: "Is the natural greying of hair a physical or chemical change?", answer: "Chemical" },
        { prompt: "Of burning coal, rusting metal, melting ice and acid–base reaction, which is NOT a chemical change?", answer: "Melting of ice" },
        { prompt: "Is dissolving sugar in water a physical or chemical change?", answer: "Physical", method: "the sugar can be recovered by evaporation" },
      ],
      traps: [
        {
          title: "Souring and greying are chemical",
          body:
            "Souring of milk and natural greying of hair both **look** harmless and physical, but each forms a **new substance** — they are **chemical** changes. Melting, boiling and dissolving are the physical ones.",
        },
      ],
    },
  ],
};
