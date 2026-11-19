import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LP_RESPIRATION_NOTE: SubtopicNote = {
  subtopicName: "Respiration",
  title: "Respiration",
  oneLineDefinition:
    "In respiration cells slowly burn glucose for energy: with oxygen it gives 38 ATP, mostly in the mitochondria; without oxygen only 2 ATP in the cytoplasm; and animals take in oxygen through gills, lungs, skin or tracheae.",
  whyItMatters:
    "Four questions in the bank, all MODERATE: which reactions happen in the mitochondria, which stage of respiration the glucose equation describes, the wrong statements about anaerobic respiration, and which animals breathe with gills, lungs and skin.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9lpre-cell",
      name: "Aerobic and anaerobic respiration in the cell",
      intuition:
        "Glucose is the cell's fuel. With plenty of oxygen the cell breaks it all the way down to carbon dioxide and water and gets a lot of energy, stored as ATP. When oxygen runs short, as in a sprinter's legs, the cell breaks glucose only part of the way and gets far less energy.",
      definition:
        "- Respiration in humans has stages: **breathing** air in, **exchange of gases** in the lungs and tissues, **transport** of gases by blood, and **cellular respiration**, where dissolved glucose is **slowly burnt** inside cells.\n" +
        "- **Aerobic respiration** uses oxygen and gives **38 ATP** from one glucose molecule. **Glycolysis** happens in the **cytoplasm**; the **Krebs cycle** (in the matrix) and the **electron transport chain** (on the inner membrane) happen in the **mitochondria**, the powerhouses of the cell.\n" +
        "- **Anaerobic respiration** needs no oxygen, happens in the **cytoplasm only** and gives only **2 ATP** per glucose.\n" +
        "- In **muscles during hard exercise**, anaerobic respiration makes **lactic acid**, which makes the muscles ache. **Yeast** makes **ethanol** and carbon dioxide (fermentation).",
      formula: {
        label: "Respiration equations",
        latex:
          "\\mathrm{C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O} + \\text{38 ATP} \\qquad \\mathrm{C_6H_{12}O_6 \\rightarrow 2C_3H_6O_3} + \\text{2 ATP} \\qquad \\mathrm{C_6H_{12}O_6 \\rightarrow 2C_2H_5OH + 2CO_2} + \\text{2 ATP}",
        symbols: [
          { symbol: "C₆H₁₂O₆", meaning: "glucose" },
          { symbol: "C₃H₆O₃", meaning: "lactic acid (anaerobic, in muscles)" },
          { symbol: "C₂H₅OH", meaning: "ethanol (anaerobic, in yeast)" },
          { symbol: "ATP", meaning: "the energy carrier of the cell" },
        ],
      },
      authoredExample: {
        prompt: "How many ATP molecules can a cell get from 3 glucose molecules by aerobic respiration, and how many by anaerobic respiration?",
        steps: [
          "Aerobic: \\(3 \\times 38 = 114\\) ATP.",
          "Anaerobic: \\(3 \\times 2 = 6\\) ATP.",
        ],
        answer: "114 ATP aerobically, 6 ATP anaerobically",
      },
      selfCheckExample: {
        prompt: "A sprinter's leg muscles ache after a fast race. Which kind of respiration went on in them, and which substance built up?",
        steps: ["The muscles needed oxygen faster than the blood could bring it, so they respired without oxygen.", "Anaerobic respiration in muscles makes lactic acid."],
        answer: "Anaerobic respiration; lactic acid built up",
      },
      practiceSet: [
        { prompt: "What does yeast produce by anaerobic respiration?", answer: "Ethanol (alcohol) and carbon dioxide" },
        { prompt: "How many molecules of oxygen are used to respire one molecule of glucose aerobically?", answer: "6" },
        { prompt: "How many ATP molecules does anaerobic respiration give from one glucose molecule?", answer: "2" },
        { prompt: "In which tissue of the human body does anaerobic respiration happen during hard exercise?", answer: "In the muscles" },
      ],
      pyqExampleId: "9c5d2919-2ac0-4773-aac7-db3139e7eb98",
      traps: [
        {
          title: "Putting glycolysis in the mitochondria",
          body: "Glycolysis happens in the cytoplasm. Only the Krebs cycle and the electron transport chain happen in the mitochondria.",
        },
        {
          title: "Placing anaerobic respiration in the mitochondria",
          body: "Anaerobic respiration happens in the cytoplasm only, which is why it gives just 2 ATP.",
        },
        {
          title: "Calling breathing the same as respiration",
          body: "Breathing only moves air in and out. Cellular respiration is the slow burning of glucose inside cells, the step the glucose equation describes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lpre-organs",
      name: "Breathing organs of animals",
      intuition:
        "Every animal needs oxygen, but it gets it in the way that suits where it lives. Fish take oxygen dissolved in water through gills; animals on land use lungs; an earthworm, with its thin moist skin, simply soaks it in; insects pipe air straight to their cells through tiny tubes.",
      definition:
        "- **Gills** take oxygen dissolved in water: fish, prawns, sharks and **tadpoles**.\n" +
        "- **Lungs**: humans, birds, reptiles such as the crocodile, and the **whale** and dolphin, which are mammals and must come up to breathe air.\n" +
        "- **Moist skin**: the **earthworm**. A frog breathes through its skin too, besides its lungs.\n" +
        "- **Tracheae** (air tubes) that open at **spiracles**: cockroach, grasshopper and other insects.\n" +
        "- A tadpole breathes with gills; when it grows into a frog it breathes with lungs and skin.",
      table: {
        columns: ["Breathing organ", "Animals"],
        rows: [
          { cells: ["Gills", "Fish, prawn, shark, tadpole"] },
          { cells: ["Lungs", "Humans, birds, crocodile, whale, dolphin, adult frog"] },
          { cells: ["Moist skin", "Earthworm; frog and toad (with their lungs)"] },
          { cells: ["Tracheae, opening at spiracles", "Cockroach, grasshopper and other insects"] },
        ],
        caption: "A whale lives in water but is a mammal, so it breathes with lungs.",
      },
      selfCheckExample: {
        prompt: "A dolphin lives in the sea, yet it keeps coming up to the surface. Why?",
        steps: ["A dolphin is a mammal and breathes with lungs, not gills.", "It must come up to take in air."],
        answer: "It breathes air with lungs, so it must surface to breathe.",
      },
      practiceSet: [
        { prompt: "Through which openings does air enter the tracheae of a cockroach?", answer: "Through the spiracles" },
        { prompt: "How does an earthworm breathe?", answer: "Through its moist skin" },
        { prompt: "With which organ does a rohu fish breathe?", answer: "Gills" },
        { prompt: "How does a frog breathe while it stays under water?", answer: "Through its moist skin" },
      ],
      pyqExampleId: "fdb4b485-41af-436f-bd6b-f0b48b0e4c19",
      traps: [
        {
          title: "Thinking whales breathe with gills",
          body: "Whales and dolphins are mammals. They breathe air with lungs and come up to the surface to do it.",
        },
        {
          title: "Thinking a tadpole breathes like a frog",
          body: "A tadpole breathes with gills. The adult frog breathes with lungs and its moist skin.",
        },
        {
          title: "Thinking insects breathe through their skin",
          body: "Insects such as the cockroach breathe through tracheae, air tubes that open at spiracles on the body.",
        },
      ],
    },
  ],
};
