import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CR_EQUATIONS_NOTE: SubtopicNote = {
  subtopicName: "Chemical Equations and Types of Reactions",
  title: "Chemical Equations and Types of Reactions",
  oneLineDefinition:
    "A chemical equation shows reactants turning into products with the same atoms on both sides, and most reactions fall into a few named types.",
  whyItMatters:
    "Six questions in the bank, three EASY, two MODERATE and one HARD, one of them from the 2022 paper (naming a combination reaction). The rest ask for the word reactants, the right state symbols, what colliding molecules need, the light green crystals that leave a reddish brown residue, and the name for a settled solid.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicreq-equations",
      name: "Reactants, products and balanced equations",
      intuition:
        "In a reaction, atoms are not made or destroyed: they are only rearranged. So an equation must have the same number of each kind of atom on both sides. Balance it by changing the numbers in front of the formulae, never the formulae themselves.",
      definition:
        "- **Reactants** are the substances that react, written on the left. **Products** are the new substances, on the right.\n" +
        "- **State symbols**: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. They give the state at the temperature of the reaction.\n" +
        "- A **balanced** equation obeys the law of conservation of mass: each element has the same number of atoms on both sides.\n" +
        "- For a reaction to happen, reactant particles must **collide** with enough energy and with the **right orientation**.",
      formula: {
        label: "Balancing rule",
        latex: "\\text{atoms of each element on the left} = \\text{atoms of that element on the right}",
      },
      authoredExample: {
        prompt: "Balance the equation \\(\\mathrm{Fe + H_2O \\rightarrow Fe_3O_4 + H_2}\\).",
        steps: [
          "Iron: 3 on the right, so put 3 before Fe.",
          "Oxygen: 4 in \\(\\mathrm{Fe_3O_4}\\), so put 4 before \\(\\mathrm{H_2O}\\).",
          "Hydrogen: now 8 on the left, so put 4 before \\(\\mathrm{H_2}\\).",
          "Check: Fe 3 and 3, O 4 and 4, H 8 and 8.",
        ],
        answer: "\\(\\mathrm{3Fe + 4H_2O \\rightarrow Fe_3O_4 + 4H_2}\\)",
      },
      selfCheckExample: {
        prompt: "Balance the equation \\(\\mathrm{Na + H_2O \\rightarrow NaOH + H_2}\\).",
        steps: [
          "\\(\\mathrm{H_2}\\) gives 2 hydrogens and NaOH 1 more, so try 2 NaOH and 2 \\(\\mathrm{H_2O}\\).",
          "That needs 2 Na. Check: Na 2 and 2, O 2 and 2, H 4 and 4.",
        ],
        answer: "\\(\\mathrm{2Na + 2H_2O \\rightarrow 2NaOH + H_2}\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\mathrm{Zn + H_2SO_4 \\rightarrow ZnSO_4 + H_2}\\), which substances are the products?", answer: "\\(\\mathrm{ZnSO_4}\\) and \\(\\mathrm{H_2}\\)" },
        { prompt: "What does the state symbol (aq) mean?", answer: "Dissolved in water (aqueous solution)" },
        { prompt: "Balance \\(\\mathrm{H_2 + Cl_2 \\rightarrow HCl}\\).", answer: "\\(\\mathrm{H_2 + Cl_2 \\rightarrow 2HCl}\\)" },
        { prompt: "Which law requires a chemical equation to be balanced?", answer: "The law of conservation of mass" },
        { prompt: "Besides enough energy, what must colliding molecules have in order to react?", answer: "The right orientation" },
      ],
      pyqExampleId: "a998a84f-be8a-4a55-a92f-8700fa155934",
      traps: [
        {
          title: "Changing a formula to balance",
          body:
            "Only the numbers in front of the formulae may change. Turning \\(\\mathrm{H_2O}\\) into \\(\\mathrm{H_2O_2}\\) balances nothing: it writes a different substance.",
        },
        {
          title: "Writing the state at room temperature",
          body:
            "State symbols give the state at the reaction temperature. Hydrogen burning in oxygen releases so much heat that the water formed is steam, (g), not liquid.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicreq-combination",
      name: "Combination and decomposition",
      intuition:
        "Combination and decomposition are opposites. In combination, two or more substances join into one. In decomposition, one substance breaks into two or more, and it needs energy to do it: heat, light or electricity.",
      definition:
        "- **Combination**: \\(A + B \\rightarrow AB\\). Burning coal, \\(\\mathrm{C + O_2 \\rightarrow CO_2}\\), is one. Most give out heat (**exothermic**).\n" +
        "- **Decomposition**: \\(AB \\rightarrow A + B\\). Most take in energy (**endothermic**).\n" +
        "- **By heat** (thermal): light green ferrous sulphate crystals first lose their water, then give reddish brown ferric oxide and two oxides of sulphur with a burning-sulphur smell.\n" +
        "- **By light**: silver chloride turns grey in sunlight. **By electricity**: water splits into hydrogen and oxygen in the volume ratio 2 : 1.",
      table: {
        columns: ["Reaction", "Type", "Equation"],
        rows: [
          { cells: ["Quicklime and water", "Combination, exothermic", "\\(\\mathrm{CaO + H_2O \\rightarrow Ca(OH)_2}\\)"] },
          {
            cells: ["Heating ferrous sulphate", "Decomposition by heat", "\\(\\mathrm{2FeSO_4 \\rightarrow Fe_2O_3 + SO_2 + SO_3}\\)"],
            noteAmber: "Light green crystals, reddish brown residue, suffocating smell of sulphur dioxide.",
          },
          { cells: ["Heating limestone", "Decomposition by heat", "\\(\\mathrm{CaCO_3 \\rightarrow CaO + CO_2}\\)"] },
          { cells: ["Silver chloride in sunlight", "Decomposition by light", "\\(\\mathrm{2AgCl \\rightarrow 2Ag + Cl_2}\\)"] },
          { cells: ["Electrolysis of water", "Decomposition by electricity", "\\(\\mathrm{2H_2O \\rightarrow 2H_2 + O_2}\\)"] },
        ],
        caption: "Count the substances: many into one is combination, one into many is decomposition.",
      },
      selfCheckExample: {
        prompt: "Calcium carbonate is heated strongly and gives calcium oxide and carbon dioxide. Is this combination or decomposition, and what supplies the energy?",
        steps: ["One substance gives two: decomposition.", "The energy comes from heating."],
        answer: "Decomposition by heat (thermal decomposition).",
      },
      practiceSet: [
        { prompt: "Coal burns in oxygen to give carbon dioxide. What type of reaction is this?", answer: "Combination" },
        { prompt: "Silver chloride turns grey in sunlight. What type of reaction is this?", answer: "Decomposition by light" },
        { prompt: "Does quicklime react with water with heat given out or taken in?", answer: "Given out (exothermic)" },
        { prompt: "In the electrolysis of water, what is the volume ratio of hydrogen to oxygen?", answer: "2 : 1" },
      ],
      pyqExampleId: "4cfb78b0-bb4c-4be8-ad6e-905268cd81ed",
      traps: [
        {
          title: "Mixing up the two names",
          body:
            "Combination makes one product from two or more reactants. Decomposition starts from one reactant and gives two or more products.",
        },
        {
          title: "Thinking decomposition happens by itself",
          body:
            "A decomposition needs energy put in: heat for ferrous sulphate and limestone, light for silver chloride, electricity for water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicreq-displacement",
      name: "Displacement, double displacement and precipitation",
      intuition:
        "In displacement, a more reactive element pushes a less reactive one out of its compound. In double displacement, two compounds swap partners. When one new product does not dissolve, it appears as a solid in the solution and settles.",
      definition:
        "- **Displacement**: a more reactive metal takes the place of a less reactive one. Iron in copper sulphate: \\(\\mathrm{Fe + CuSO_4 \\rightarrow FeSO_4 + Cu}\\).\n" +
        "- **Double displacement**: two compounds exchange ions: \\(AB + CD \\rightarrow AD + CB\\).\n" +
        "- A **precipitate** is an insoluble solid formed in a solution during a reaction; it settles down. A reaction that gives one is a **precipitation** reaction.\n" +
        "- Neutralisation (acid + base) is also a double displacement.",
      table: {
        columns: ["Reaction", "Type", "What you see"],
        rows: [
          { cells: ["Iron nail in copper sulphate solution", "Displacement", "Brown copper coats the nail; blue solution turns pale green"] },
          {
            cells: ["Sodium sulphate and barium chloride", "Double displacement, precipitation", "White precipitate of barium sulphate"],
            noteAmber: "\\(\\mathrm{Na_2SO_4 + BaCl_2 \\rightarrow BaSO_4 + 2NaCl}\\)",
          },
          { cells: ["Lead nitrate and potassium iodide", "Double displacement, precipitation", "Yellow precipitate of lead iodide"] },
          { cells: ["Copper in iron sulphate solution", "No reaction", "Nothing: copper is less reactive than iron"] },
        ],
        caption: "A metal can push out only a metal less reactive than itself.",
      },
      selfCheckExample: {
        prompt: "A strip of zinc is placed in copper sulphate solution. Will a reaction happen, and of what type?",
        steps: ["Zinc is more reactive than copper.", "It takes copper's place: \\(\\mathrm{Zn + CuSO_4 \\rightarrow ZnSO_4 + Cu}\\)."],
        answer: "Yes: a displacement reaction.",
      },
      practiceSet: [
        { prompt: "What is a reaction in which two compounds exchange ions called?", answer: "Double displacement" },
        { prompt: "Will copper displace iron from iron sulphate solution?", answer: "No, copper is less reactive than iron" },
        { prompt: "Lead nitrate and potassium iodide solutions are mixed. What colour is the precipitate?", answer: "Yellow (lead iodide)" },
        { prompt: "What colour is the coating that forms on an iron nail in copper sulphate solution?", answer: "Brown (copper)" },
      ],
      pyqExampleId: "ce2469c5-8a3d-4052-a50b-0aa23b7175eb",
      traps: [
        {
          title: "Expecting any metal to displace any other",
          body:
            "Displacement goes one way only: a more reactive metal pushes out a less reactive one. Copper put into iron sulphate solution does nothing.",
        },
        {
          title: "Calling a precipitate a crystal",
          body:
            "The solid that settles out of a reacting solution is a precipitate, not a crystal. A precipitate is an insoluble product of the reaction; crystals grow slowly from a solution as it cools or evaporates.",
        },
      ],
    },
  ],
};
