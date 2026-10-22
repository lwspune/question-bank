import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AB_SALTS_NOTE: SubtopicNote = {
  subtopicName: "Salts and Their Uses",
  title: "Salts and Their Uses",
  oneLineDefinition:
    "A salt is what is left when an acid's hydrogen is replaced by a metal or ammonium ion; its parent acid and base decide whether its solution is acidic, neutral or basic.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE: picking the acid salt, the salt whose solution turns blue litmus red, the formula of baking soda, what common salt is used to make, and the ion the brown ring test finds. Most are a name or formula to recall, and one needs the strong-or-weak rule.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiabsa-nature",
      name: "Normal salts, acid salts and the nature of a salt solution",
      intuition:
        "Every salt has a parent acid and a parent base. If both are strong, they cancel and the solution is neutral. If one is stronger, the solution leans its way: a strong acid makes it acidic, a strong base makes it basic.",
      definition:
        "- A **normal salt** has all the acid's replaceable hydrogen replaced: \\(\\mathrm{NaCl}\\), \\(\\mathrm{Na_2SO_4}\\).\n" +
        "- An **acid salt** still has some replaceable hydrogen: \\(\\mathrm{NaHCO_3}\\), \\(\\mathrm{NaHSO_4}\\). It comes from partly neutralising an acid that has two hydrogens to give.\n" +
        "- Strong acid + strong base gives a **neutral** solution (pH 7).\n" +
        "- Strong acid + weak base gives an **acidic** solution (pH below 7): it turns blue litmus red.\n" +
        "- Weak acid + strong base gives a **basic** solution (pH above 7).",
      table: {
        columns: ["Parent acid", "Parent base", "Solution", "Example"],
        rows: [
          { cells: ["Strong", "Strong", "Neutral, pH 7", "Sodium chloride, potassium nitrate"] },
          {
            cells: ["Strong", "Weak", "Acidic, pH below 7", "Ammonium sulphate, \\(\\mathrm{(NH_4)_2SO_4}\\)"],
            noteAmber: "Ammonium salts of strong acids are acidic: ammonium hydroxide is a weak base.",
          },
          { cells: ["Weak", "Strong", "Basic, pH above 7", "Sodium carbonate, sodium ethanoate"] },
        ],
        caption: "The stronger parent decides which way the solution leans.",
      },
      selfCheckExample: {
        prompt: "Sodium carbonate is the salt of carbonic acid and sodium hydroxide. Is its solution acidic, neutral or basic?",
        steps: ["Carbonic acid is weak and sodium hydroxide is strong.", "The strong base wins."],
        answer: "Basic",
      },
      practiceSet: [
        { prompt: "Is a solution of potassium nitrate acidic, basic or neutral?", answer: "Neutral (nitric acid and potassium hydroxide are both strong)" },
        { prompt: "Which of \\(\\mathrm{NaCl}\\) and \\(\\mathrm{NaHSO_4}\\) is an acid salt?", answer: "\\(\\mathrm{NaHSO_4}\\)" },
        { prompt: "What is the pH of a sodium chloride solution?", answer: "7" },
        {
          prompt: "Ammonium nitrate is the salt of nitric acid and ammonium hydroxide. Does its solution turn blue litmus red?",
          answer: "Yes: strong acid with weak base gives an acidic solution",
        },
      ],
      pyqExampleId: "9495e56a-bdf2-40af-a5cc-33d70952d191",
      traps: [
        {
          title: "Expecting an acid salt to give an acidic solution",
          body:
            "An acid salt is named for the replaceable hydrogen it keeps. Sodium hydrogencarbonate is an acid salt, yet its solution is mildly basic, because its parent acid (carbonic acid) is weak.",
        },
        {
          title: "Calling every salt neutral",
          body:
            "Only a salt of a strong acid and a strong base is neutral. A salt of a strong acid and a weak base is acidic, and a salt of a weak acid and a strong base is basic.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiabsa-common",
      name: "Salts made from common salt",
      intuition:
        "Common salt, sodium chloride, is the starting point for many everyday chemicals. Electrolysis of brine gives sodium hydroxide, chlorine and hydrogen; brine with ammonia and carbon dioxide gives baking soda, and baking soda gives washing soda.",
      definition:
        "- **Chlor-alkali process**: electricity through brine gives sodium hydroxide, chlorine gas and hydrogen gas: \\(\\mathrm{2NaCl + 2H_2O \\rightarrow 2NaOH + Cl_2 + H_2}\\).\n" +
        "- **Baking soda**, sodium hydrogencarbonate \\(\\mathrm{NaHCO_3}\\): from brine, ammonia and carbon dioxide. On heating it gives off carbon dioxide.\n" +
        "- **Washing soda**, \\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\): baking soda is heated to sodium carbonate, which is crystallised from water.\n" +
        "- **Bleaching powder**, \\(\\mathrm{CaOCl_2}\\): chlorine (from brine) passed over dry slaked lime.\n" +
        "- **Plaster of Paris**, \\(\\mathrm{CaSO_4 \\cdot \\frac{1}{2}H_2O}\\), is made by heating gypsum, not from common salt.",
      table: {
        columns: ["Common name", "Formula", "Made from", "Used for"],
        rows: [
          { cells: ["Caustic soda", "\\(\\mathrm{NaOH}\\)", "Electrolysis of brine", "Soaps, paper"] },
          { cells: ["Baking soda", "\\(\\mathrm{NaHCO_3}\\)", "Brine, ammonia and carbon dioxide", "Baking powder, antacid"] },
          {
            cells: ["Washing soda", "\\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\)", "Heating baking soda, then crystallising", "Cleaning, removing hardness of water"],
            noteAmber: "Washing soda is a carbonate; baking soda is a hydrogencarbonate.",
          },
          { cells: ["Bleaching powder", "\\(\\mathrm{CaOCl_2}\\)", "Chlorine and dry slaked lime", "Bleaching cloth, disinfecting water"] },
          { cells: ["Plaster of Paris", "\\(\\mathrm{CaSO_4 \\cdot \\frac{1}{2}H_2O}\\)", "Heating gypsum at 373 K", "Plaster for broken bones"] },
        ],
        caption: "The first four start from common salt; plaster of Paris does not.",
      },
      selfCheckExample: {
        prompt: "Baking soda is heated. Which gas is given off, and which salt is left behind?",
        steps: ["\\(\\mathrm{2NaHCO_3 \\rightarrow Na_2CO_3 + H_2O + CO_2}\\)."],
        answer: "Carbon dioxide is given off; sodium carbonate is left.",
      },
      practiceSet: [
        { prompt: "What is the chemical name of washing soda?", answer: "Sodium carbonate (decahydrate)" },
        { prompt: "Name the three products of the electrolysis of brine.", answer: "Sodium hydroxide, chlorine and hydrogen" },
        { prompt: "What is the formula of bleaching powder?", answer: "\\(\\mathrm{CaOCl_2}\\)" },
        { prompt: "Which salt is used to set broken bones?", answer: "Plaster of Paris" },
        { prompt: "How many molecules of water of crystallisation does washing soda have?", answer: "10" },
      ],
      pyqExampleId: "ccd4c87d-9702-4ba9-9568-ff82d43436e3",
      traps: [
        {
          title: "Swapping baking soda and washing soda",
          body:
            "Baking soda is sodium hydrogencarbonate, \\(\\mathrm{NaHCO_3}\\). Washing soda is sodium carbonate with ten waters, \\(\\mathrm{Na_2CO_3 \\cdot 10H_2O}\\).",
        },
        {
          title: "Thinking slaked lime comes from common salt",
          body:
            "Slaked lime, \\(\\mathrm{Ca(OH)_2}\\), is made from limestone (quicklime and water). Bleaching powder uses slaked lime, but only its chlorine comes from common salt.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiabsa-tests",
      name: "Tests for ions and gases",
      intuition:
        "Each common ion or gas has one test with a result you can see: a coloured ring, a white precipitate, milky lime water or a pop. Learn the test and its result as a pair.",
      definition:
        "- **Nitrate**: the **brown ring test**. Add fresh iron(II) sulphate solution, then pour concentrated sulphuric acid down the side: a brown ring forms where the layers meet.\n" +
        "- **Sulphate**: barium chloride solution gives a **white precipitate** that does not dissolve in dilute hydrochloric acid.\n" +
        "- **Chloride**: silver nitrate solution gives a **white precipitate**.\n" +
        "- **Carbonate**: a dilute acid gives a gas that turns **lime water milky** (carbon dioxide).\n" +
        "- **Hydrogen** burns with a **pop** when a burning splinter is brought near.",
      table: {
        columns: ["Looking for", "Add or do", "You see"],
        rows: [
          {
            cells: ["Nitrate", "Iron(II) sulphate, then concentrated sulphuric acid", "A brown ring"],
            noteAmber: "The sulphate here is part of the reagent: the test finds nitrate.",
          },
          { cells: ["Sulphate", "Barium chloride solution", "White precipitate"] },
          { cells: ["Chloride", "Silver nitrate solution", "White precipitate"] },
          { cells: ["Carbonate", "Dilute acid, gas through lime water", "Lime water turns milky"] },
          { cells: ["Hydrogen gas", "A burning splinter", "A pop sound"] },
        ],
        caption: "Barium for sulphate, silver for chloride, iron(II) sulphate for nitrate.",
      },
      selfCheckExample: {
        prompt:
          "Barium chloride solution is added to a salt solution. A white precipitate forms that does not dissolve in dilute hydrochloric acid. Which ion is present?",
        steps: ["Barium chloride is the test for sulphate."],
        answer: "Sulphate",
      },
      practiceSet: [
        { prompt: "Which solution gives a white precipitate with a chloride?", answer: "Silver nitrate solution" },
        { prompt: "A gas turns lime water milky. Name the gas.", answer: "Carbon dioxide" },
        { prompt: "A gas burns with a pop. Name the gas.", answer: "Hydrogen" },
        {
          prompt: "A dilute acid added to a salt gives a gas that turns lime water milky. Which ion was in the salt?",
          answer: "Carbonate (or hydrogencarbonate)",
        },
      ],
      pyqExampleId: "4dc1c0ce-2738-4250-8be4-26ae6625b890",
      traps: [
        {
          title: "Swapping the sulphate and chloride tests",
          body: "Barium chloride finds sulphate. Silver nitrate finds chloride. Both give a white precipitate, so the reagent is what tells them apart.",
        },
        {
          title: "Reading the brown ring as a sulphate test",
          body:
            "The brown ring test uses iron(II) sulphate and sulphuric acid as reagents, but the ion it detects is nitrate.",
        },
      ],
    },
  ],
};
