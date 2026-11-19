import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AB_PH_NOTE: SubtopicNote = {
  subtopicName: "Indicators and the pH Scale",
  title: "Indicators and the pH Scale",
  oneLineDefinition:
    "An indicator changes colour in an acid or a base; the pH scale from 0 to 14 says how acidic or basic a solution is, with 7 neutral, below 7 acidic and above 7 basic, and each step of 1 is a tenfold change in H⁺ ions.",
  whyItMatters:
    "The busiest page of the chapter: thirteen questions, one EASY, eleven MODERATE and one HARD. Four ask the colour of an indicator, three are pH sums (a tenfold change for each unit of pH), and six ask the pH of everyday things such as curd, blood, vinegar and acid rain, or how soil is tested.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9abph-indicators",
      name: "Indicators and their colours",
      intuition:
        "An indicator is a dye that wears one colour in an acid and another in a base. Litmus is the best known: blue litmus goes red in an acid, red litmus goes blue in a base. Even the colour of tea is an indicator: squeeze a lemon into it and it turns lighter.",
      definition:
        "- An **indicator** shows by its **colour** whether a solution is acidic, basic or neutral.\n" +
        "- **Natural** indicators: litmus (from lichens), turmeric, red cabbage, China rose petals, and the colouring of tea.\n" +
        "- **Synthetic** indicators: **phenolphthalein**, **methyl orange**, **methyl red**.\n" +
        "- **Universal indicator** is a mixture of dyes that gives a different colour at each pH: **red** in strong acid, **orange**, **yellow**, **green at pH 7**, **blue**, then **purple (violet)** in strong base.",
      table: {
        columns: ["Indicator", "In an acid", "In a base", "In a neutral solution"],
        rows: [
          { cells: ["Blue litmus", "Turns red", "Stays blue", "Stays blue"] },
          { cells: ["Red litmus", "Stays red", "Turns blue", "Stays red"] },
          { cells: ["Phenolphthalein", "Colourless", "Pink", "Colourless"], noteAmber: "Colourless in an acid AND in a neutral solution: it only picks out a base." },
          { cells: ["Methyl orange", "Red", "Yellow", "Orange"] },
          { cells: ["Methyl red", "Red", "Yellow", "Yellow"] },
          { cells: ["Turmeric", "Stays yellow", "Turns reddish brown", "Stays yellow"] },
          { cells: ["Universal indicator", "Red to orange or yellow", "Blue to purple", "Green"] },
        ],
        caption: "Learn which indicators turn red in an acid: blue litmus, methyl orange, methyl red and universal indicator.",
      },
      selfCheckExample: {
        prompt: "A drop of methyl orange is added to dilute nitric acid and to potassium hydroxide solution. What colour does it show in each?",
        steps: ["Methyl orange is red in an acid.", "It is yellow in a base."],
        answer: "Red in the nitric acid, yellow in the potassium hydroxide solution",
      },
      practiceSet: [
        { prompt: "What colour does red litmus turn in lime water?", answer: "Blue, because lime water is a base" },
        { prompt: "What colour is universal indicator in pure water?", answer: "Green" },
        { prompt: "What colour does turmeric turn when soap solution is put on it?", answer: "Reddish brown, because soap solution is basic" },
        { prompt: "Why does tea become lighter in colour when lemon juice is added to it?", answer: "The citric acid of the lemon lowers the pH, and the colouring of tea is lighter in an acid" },
      ],
      pyqExampleId: "bb7a66d7-7d22-45a7-82ec-d8badf6e04c4",
      traps: [
        {
          title: "Expecting phenolphthalein to turn red in an acid",
          body: "Phenolphthalein stays colourless in an acid and in a neutral solution. It turns pink only in a base.",
        },
        {
          title: "Expecting turmeric to change in an acid",
          body: "Turmeric stays yellow in an acid. It turns reddish brown only in a base, such as soap solution.",
        },
        {
          title: "Getting the universal indicator order backwards",
          body: "As the pH rises, universal indicator goes red, orange, yellow, green, blue, purple. Red is the strong acid end, purple the strong base end.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9abph-calc",
      name: "pH from the concentration of H⁺ or OH⁻ ions",
      intuition:
        "The pH is a short way of writing a very small number. If a solution has 0.001 mol of H⁺ ions in a litre, that is 10 to the power minus 3, and its pH is simply 3. So a smaller pH means more H⁺ ions, and each step down the scale means ten times as many.",
      definition:
        "- If \\([\\mathrm{H^+}] = 10^{-n}\\) mol/L, then **pH = n**. So \\(\\mathrm{pH} = -\\log[\\mathrm{H^+}]\\).\n" +
        "- In the same way, if \\([\\mathrm{OH^-}] = 10^{-n}\\) mol/L, then **pOH = n**, and **pH + pOH = 14**.\n" +
        "- For a base, find the pOH first, then **pH = 14 − pOH**.\n" +
        "- A change of **1 pH unit** is a **10 times** change in \\([\\mathrm{H^+}]\\). A **higher** pH means **fewer** H⁺ ions.\n" +
        "- A strong acid like HCl gives one H⁺ per molecule, so 0.01 M HCl has \\([\\mathrm{H^+}] = 10^{-2}\\) and pH 2. In the same way 0.01 M NaOH has \\([\\mathrm{OH^-}] = 10^{-2}\\).",
      formula: {
        label: "pH",
        latex: "\\mathrm{pH} = -\\log[\\mathrm{H^+}] \\qquad [\\mathrm{H^+}] = 10^{-\\mathrm{pH}} \\qquad \\mathrm{pH} + \\mathrm{pOH} = 14",
        symbols: [
          { symbol: "[H⁺]", meaning: "concentration of hydrogen ions, in mol/L" },
          { symbol: "pOH", meaning: "the same measure worked out from the OH⁻ ion concentration" },
        ],
      },
      authoredExample: {
        prompt: "A solution of nitric acid has 0.001 mol of H⁺ ions in each litre. Find its pH. Then find the pH of a 0.01 M potassium hydroxide solution.",
        steps: [
          "\\([\\mathrm{H^+}] = 0.001 = 10^{-3}\\) mol/L, so the pH of the acid is 3.",
          "KOH gives one OH⁻ per unit, so \\([\\mathrm{OH^-}] = 0.01 = 10^{-2}\\) mol/L and the pOH is 2.",
          "pH = 14 − 2 = 12.",
        ],
        answer: "The nitric acid has pH 3; the potassium hydroxide solution has pH 12.",
      },
      selfCheckExample: {
        prompt: "What is the pH of 0.1 M hydrochloric acid?",
        steps: ["HCl gives one H⁺ per molecule, so \\([\\mathrm{H^+}] = 0.1 = 10^{-1}\\) mol/L."],
        answer: "pH 1",
      },
      practiceSet: [
        { prompt: "What is the pH of 0.01 M hydrochloric acid?", answer: "2" },
        { prompt: "A solution has pH 4. What is its H⁺ ion concentration?", answer: "\\(10^{-4}\\) mol/L, that is 0.0001 mol/L" },
        { prompt: "The pH of a solution falls from 7 to 5. How does its H⁺ ion concentration change?", answer: "It becomes 100 times larger" },
        { prompt: "The pOH of a solution is 3. What is its pH?", answer: "14 − 3 = 11" },
      ],
      pyqExampleId: "cded85ac-f901-424e-892c-46326d514bd0",
      traps: [
        {
          title: "Thinking a pH change of 3 means 3 times",
          body: "Each unit of pH is a factor of 10. A change of 3 units is \\(10 \\times 10 \\times 10 = 1000\\) times.",
        },
        {
          title: "Taking the pOH of a base as its pH",
          body: "For a base, the power of ten gives the pOH. Subtract it from 14: 0.001 M NaOH has pOH 3 and pH 11.",
        },
        {
          title: "Thinking a higher pH means more H⁺ ions",
          body: "It is the reverse. As the pH rises, the H⁺ ion concentration falls.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9abph-everyday",
      name: "pH of everyday substances and of soil",
      intuition:
        "Your stomach makes strong acid, vinegar and lemon juice are clearly acidic, milk is only just acidic, blood is just on the basic side, and soap and lime water are basic. Putting a few of these in order is a favourite question, so learn roughly where each one sits.",
      definition:
        "- **pH 7** is neutral (pure water). **Below 7** is acidic, **above 7** is basic.\n" +
        "- Rain with a pH **below 5.6** is called **acid rain**.\n" +
        "- Milk (about 6.5) turns into curd (about 4.5 to 5.5) as bacteria make lactic acid, so curd is **more acidic** than milk.\n" +
        "- A **mixture** of two solutions has a pH **between** their two pH values.\n" +
        "- **Testing soil**: shake the soil with about **twice its volume of water**, let it settle, and test the clear water with universal indicator or pH paper. Acidic soil is treated with **lime**.",
      table: {
        columns: ["Substance", "Approximate pH", "Nature"],
        rows: [
          { cells: ["Gastric juice", "1 to 2", "Strongly acidic"] },
          { cells: ["Lemon juice", "About 2.5", "Acidic"] },
          { cells: ["Vinegar", "About 3", "Acidic"] },
          { cells: ["Apple juice", "About 3.5", "Acidic"] },
          { cells: ["Curd", "4.5 to 5.5", "Acidic"] },
          { cells: ["Black coffee", "About 5", "Acidic"] },
          { cells: ["Acid rain", "Below 5.6", "Acidic"] },
          { cells: ["Urine", "About 6", "Slightly acidic"] },
          { cells: ["Milk", "6.4 to 6.8", "Slightly acidic"] },
          { cells: ["Pure water", "7", "Neutral"] },
          { cells: ["Blood", "About 7.4", "Slightly basic"], noteAmber: "The usual odd one out among body fluids and drinks: it is basic." },
          { cells: ["Sea water", "About 8", "Slightly basic"] },
          { cells: ["Milk of magnesia", "About 10", "Basic"] },
          { cells: ["Lime water", "About 12", "Basic"] },
        ],
        caption: "Exact values vary a little; the order is what the papers test.",
      },
      selfCheckExample: {
        prompt: "Arrange in increasing order of pH: milk of magnesia, lemon juice, pure water, milk.",
        steps: ["Lemon juice is clearly acidic (about 2.5) and milk slightly acidic (about 6.5).", "Pure water is 7 and milk of magnesia is basic (about 10)."],
        answer: "Lemon juice, milk, pure water, milk of magnesia",
      },
      practiceSet: [
        { prompt: "Is human blood slightly acidic or slightly basic?", answer: "Slightly basic, with a pH of about 7.4" },
        { prompt: "Which is more acidic, fresh milk or curd?", answer: "Curd" },
        { prompt: "Below what pH is rain called acid rain?", answer: "5.6" },
        { prompt: "How is the pH of a soil sample found?", answer: "Shake the soil with water, let it settle, and test the clear water with universal indicator or pH paper" },
      ],
      pyqExampleId: "b4f26341-cd89-4af1-b4c1-942f7090b216",
      traps: [
        {
          title: "Calling blood acidic",
          body: "Blood has a pH of about 7.4, slightly above 7, so it is slightly basic.",
        },
        {
          title: "Thinking a mixture takes the pH of one part",
          body: "Mixing two solutions gives a pH between theirs. Coffee mixed with milk is less acidic than the coffee alone.",
        },
        {
          title: "Reading descending order as ascending",
          body: "Descending order of pH starts with the most basic substance and ends with the most acidic, such as gastric juice.",
        },
      ],
    },
  ],
};
