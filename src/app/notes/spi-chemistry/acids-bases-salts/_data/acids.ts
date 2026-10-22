import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_AB_ACIDS_NOTE: SubtopicNote = {
  subtopicName: "Acids, Bases and Indicators",
  title: "Acids, Bases and Indicators",
  oneLineDefinition:
    "An acid gives hydrogen ions in water and a base gives hydroxide ions; how fully they split decides their strength, and an indicator shows which one you have.",
  whyItMatters:
    "Three questions in the bank, all EASY: what an acid contains that a base does not, the name for an acid that splits completely in water, and the indicator used most in the laboratory. Each is one definition, so the only risk is mixing up two similar words.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiabac-acids",
      name: "What acids and bases are",
      intuition:
        "Acids taste sour and bases taste bitter and feel soapy, but the real test is what they give in water. An acid gives hydrogen ions. A base gives hydroxide ions. Put the two together and they cancel into a salt and water.",
      definition:
        "- An **acid** contains **replaceable hydrogen**: a metal can take its place. In water it gives \\(\\mathrm{H^+}\\) ions (as \\(\\mathrm{H_3O^+}\\)).\n" +
        "- A **base** reacts with an acid to give a salt and water. A base that dissolves in water is an **alkali** and gives \\(\\mathrm{OH^-}\\) ions.\n" +
        "- **Neutralisation**: acid + base gives salt + water.\n" +
        "- Acid + reactive metal gives salt + hydrogen. Acid + carbonate or hydrogencarbonate gives salt + water + carbon dioxide.",
      formula: {
        label: "Reactions of an acid",
        latex:
          "\\text{acid} + \\text{base} \\rightarrow \\text{salt} + \\text{water} \\qquad \\text{acid} + \\text{metal} \\rightarrow \\text{salt} + \\mathrm{H_2}",
      },
      authoredExample: {
        prompt: "Hydrochloric acid reacts with sodium hydroxide. Write the balanced equation and name the products.",
        steps: [
          "Acid + base gives salt + water.",
          "The sodium takes the place of the acid's hydrogen: the salt is sodium chloride.",
          "\\(\\mathrm{HCl + NaOH \\rightarrow NaCl + H_2O}\\).",
        ],
        answer: "Sodium chloride and water.",
      },
      selfCheckExample: {
        prompt: "Magnesium ribbon is added to dilute hydrochloric acid. Name the gas and the salt formed.",
        steps: [
          "A reactive metal replaces the hydrogen of the acid, which is given off as a gas.",
          "\\(\\mathrm{Mg + 2HCl \\rightarrow MgCl_2 + H_2}\\).",
        ],
        answer: "Hydrogen gas and magnesium chloride.",
      },
      practiceSet: [
        { prompt: "Which ion do all acids give in water?", answer: "The hydrogen ion, \\(\\mathrm{H^+}\\) (as \\(\\mathrm{H_3O^+}\\))" },
        { prompt: "What is a base that dissolves in water called?", answer: "An alkali" },
        { prompt: "What are the products when an acid reacts with a metal carbonate?", answer: "A salt, water and carbon dioxide" },
        { prompt: "Which ion does an alkali give in water?", answer: "The hydroxide ion, \\(\\mathrm{OH^-}\\)" },
        { prompt: "What is the reaction of an acid with a base called?", answer: "Neutralisation" },
      ],
      pyqExampleId: "c45a1ab6-b499-493a-ba67-96b451f1c5fa",
      traps: [
        {
          title: "Calling every base an alkali",
          body:
            "An alkali is a base that dissolves in water. Copper oxide is a base but does not dissolve, so it is not an alkali. Every alkali is a base; not every base is an alkali.",
        },
        {
          title: "Forgetting that acids need water",
          body:
            "An acid shows its acidic nature only in water, where it gives \\(\\mathrm{H^+}\\) ions. Dry hydrogen chloride gas does not change the colour of dry blue litmus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiabac-strength",
      name: "Strong and weak acids and bases, and the pH scale",
      intuition:
        "Strength is about how completely an acid or base splits into ions in water. A strong acid splits almost completely, a weak one only partly. The pH scale turns that into a number.",
      definition:
        "- A **strong acid** dissociates **completely** in water: hydrochloric, sulphuric, nitric acid.\n" +
        "- A **weak acid** dissociates only **partly**: ethanoic acid, carbonic acid.\n" +
        "- Strong bases: sodium hydroxide, potassium hydroxide. Weak base: ammonium hydroxide.\n" +
        "- **pH** runs from 0 to 14: below 7 acidic, 7 neutral, above 7 basic. The lower the pH, the stronger the acid.\n" +
        "- A **hydracid** has no oxygen (\\(\\mathrm{HCl}\\)); an **oxyacid** has oxygen (\\(\\mathrm{H_2SO_4}\\)). This names what is in the acid, not its strength.",
      table: {
        columns: ["Substance", "Strong or weak", "Kind"],
        rows: [
          { cells: ["Hydrochloric acid, \\(\\mathrm{HCl}\\)", "Strong acid", "Hydracid (no oxygen)"] },
          { cells: ["Sulphuric acid, \\(\\mathrm{H_2SO_4}\\)", "Strong acid", "Oxyacid"] },
          { cells: ["Nitric acid, \\(\\mathrm{HNO_3}\\)", "Strong acid", "Oxyacid"] },
          { cells: ["Ethanoic acid, \\(\\mathrm{CH_3COOH}\\)", "Weak acid", "Organic acid"] },
          { cells: ["Carbonic acid, \\(\\mathrm{H_2CO_3}\\)", "Weak acid", "Oxyacid"] },
          { cells: ["Sodium hydroxide, \\(\\mathrm{NaOH}\\)", "Strong base", "Alkali"] },
          {
            cells: ["Ammonium hydroxide, \\(\\mathrm{NH_4OH}\\)", "Weak base", "Alkali"],
            noteAmber: "The one weak base to remember.",
          },
        ],
        caption: "Strong or weak is about splitting into ions, not about how much acid is in the water.",
      },
      selfCheckExample: {
        prompt: "Two acid solutions of the same concentration have pH 1 and pH 4. Which one is the strong acid?",
        steps: ["A strong acid gives more hydrogen ions.", "More hydrogen ions means a lower pH."],
        answer: "The one with pH 1.",
      },
      practiceSet: [
        { prompt: "Is ammonium hydroxide a strong base or a weak base?", answer: "A weak base" },
        { prompt: "What is the pH of pure water?", answer: "7" },
        { prompt: "An acid that contains oxygen, such as nitric acid, is called what kind of acid?", answer: "An oxyacid" },
        { prompt: "A solution has pH 11. Is it acidic or basic?", answer: "Basic" },
        { prompt: "Is ethanoic acid a strong acid or a weak acid?", answer: "A weak acid" },
      ],
      pyqExampleId: "e5298e29-714e-4098-b222-6ee33627c763",
      traps: [
        {
          title: "Confusing concentrated with strong",
          body:
            "Concentrated means a lot of acid in a little water. Strong means the acid splits completely into ions. Dilute hydrochloric acid is still a strong acid.",
        },
        {
          title: "Reading oxyacid or hydracid as a strength",
          body:
            "Those words only say whether the acid contains oxygen. Hydrochloric acid is a hydracid and strong; carbonic acid is an oxyacid and weak.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiabac-indicators",
      name: "Indicators",
      intuition:
        "An indicator is a dye that changes colour with acids and bases. Litmus is the everyday laboratory choice; others are used when you need a clearer colour change or a pH value.",
      definition:
        "- **Litmus** is a purple dye from lichens. It is the indicator used most in the laboratory: blue litmus turns **red** in an acid, red litmus turns **blue** in a base.\n" +
        "- **Phenolphthalein** is colourless in acid and **pink** in base. **Methyl orange** is red in acid and yellow in base. Both are used in titrations.\n" +
        "- **Turmeric** is yellow and turns reddish brown in a base.\n" +
        "- **Universal indicator** shows a range of colours, so it gives the pH value, not just acid or base.\n" +
        "- **Olfactory indicators** (onion, vanilla, clove) lose their smell in a base.",
      table: {
        columns: ["Indicator", "In an acid", "In a base"],
        rows: [
          { cells: ["Blue litmus", "Turns red", "Stays blue"] },
          { cells: ["Red litmus", "Stays red", "Turns blue"] },
          {
            cells: ["Phenolphthalein", "Colourless", "Pink"],
            noteAmber: "Colourless with phenolphthalein can mean acidic or neutral.",
          },
          { cells: ["Methyl orange", "Red", "Yellow"] },
          { cells: ["Turmeric", "Stays yellow", "Reddish brown"] },
          { cells: ["Universal indicator", "Red to orange (pH below 7)", "Blue to violet (pH above 7)"] },
        ],
        caption: "Universal indicator is green at pH 7.",
      },
      selfCheckExample: {
        prompt: "A colourless solution turns phenolphthalein pink. Is the solution acidic, neutral or basic?",
        steps: ["Phenolphthalein turns pink only in a base."],
        answer: "Basic",
      },
      practiceSet: [
        { prompt: "What colour does methyl orange show in an acid?", answer: "Red" },
        { prompt: "Which natural indicator turns reddish brown in a base?", answer: "Turmeric" },
        { prompt: "Which indicator gives the pH value of a solution, not just acid or base?", answer: "Universal indicator" },
        { prompt: "From what is litmus obtained?", answer: "Lichens" },
        { prompt: "Name one indicator that works by smell.", answer: "Onion, vanilla or clove" },
      ],
      pyqExampleId: "11559c0a-6f9f-4f5b-836d-2c3fcd85769f",
      traps: [
        {
          title: "Testing an acid with red litmus",
          body:
            "Red litmus stays red in an acid, so it shows nothing. Use blue litmus to detect an acid and red litmus to detect a base.",
        },
        {
          title: "Taking 'no colour' with phenolphthalein as neutral",
          body: "Phenolphthalein is colourless in both acids and neutral solutions. Only pink tells you something for certain: the solution is basic.",
        },
      ],
    },
  ],
};
