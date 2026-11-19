import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CR_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Chemical Reactions",
  title: "Types of Chemical Reactions",
  oneLineDefinition:
    "A chemical change makes new substances; reactions are sorted as combination, decomposition (by heat, light or electricity) and displacement, and as exothermic or endothermic by the heat they give out or take in.",
  whyItMatters:
    "Seven questions in the bank, three EASY and four MODERATE. Two ask whether a change is physical or chemical and which compound light breaks down, one is an electrolysis figure, and four ask whether a reaction gives out or takes in heat: ammonium chloride in water, compost, carbon disulphide and quicklime with water.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9crty-kinds",
      name: "Physical and chemical changes and the kinds of reaction",
      intuition:
        "Melting ice is still water, so that is a physical change. Burnt wood becomes ash, smoke and gases, which are new substances, so that is a chemical change. Chemical reactions are then sorted by what happens to the substances: two join into one, one breaks into two or more, or one element pushes another out of a compound.",
      definition:
        "- **Physical change**: no new substance forms; only the state, shape or size changes. Melting, boiling, dissolving sugar and grinding wood into sawdust are physical. Most can be undone, but not all: sawdust cannot become a log again.\n" +
        "- **Chemical change**: one or more **new substances** form. Burning, rusting, cooking food and curdling of milk are chemical, and most cannot be undone.\n" +
        "- **Combination**: two or more substances form **one** product.\n" +
        "- **Decomposition**: one substance breaks into two or more, using **heat**, **light** or **electricity**. Silver salts break up in light, so silver nitrate is stored in **dark brown bottles**.\n" +
        "- **Electrolysis** is decomposition by an electric current. The circuit must be **closed**. In copper chloride solution, **copper** is deposited on the **negative electrode (cathode)** and **chlorine** gas is given off at the **positive electrode (anode)**.\n" +
        "- **Displacement**: a more reactive element pushes a less reactive one out of its compound. **Double displacement**: two compounds swap their parts.",
      table: {
        columns: ["Kind of reaction", "What happens", "Example"],
        rows: [
          { cells: ["Combination", "Two or more substances form one product", "\\(\\mathrm{C + O_2 \\rightarrow CO_2}\\)"] },
          { cells: ["Decomposition by heat", "One substance breaks up when heated", "\\(\\mathrm{CaCO_3 \\rightarrow CaO + CO_2}\\)"] },
          { cells: ["Decomposition by light", "One substance breaks up in light", "\\(\\mathrm{2AgCl \\rightarrow 2Ag + Cl_2}\\)"] },
          { cells: ["Decomposition by electricity", "A current breaks the substance up", "\\(\\mathrm{2H_2O \\rightarrow 2H_2 + O_2}\\)"] },
          { cells: ["Displacement", "A more reactive metal pushes out a less reactive one", "\\(\\mathrm{Fe + CuSO_4 \\rightarrow FeSO_4 + Cu}\\)"] },
          { cells: ["Double displacement", "Two compounds swap their parts", "\\(\\mathrm{Na_2SO_4 + BaCl_2 \\rightarrow BaSO_4 + 2NaCl}\\)"] },
        ],
        caption: "A combination gives one product; decomposition and displacement give two or more.",
      },
      selfCheckExample: {
        prompt: "Is the melting of candle wax a physical or a chemical change, and can it be reversed?",
        steps: ["Melted wax is still wax: no new substance forms.", "On cooling it becomes solid wax again."],
        answer: "A physical change, and it is reversible.",
      },
      practiceSet: [
        { prompt: "Is the rusting of iron a physical or a chemical change?", answer: "A chemical change: a new substance, rust, is formed" },
        { prompt: "An iron nail is dipped in blue copper sulphate solution and gets a brown coat of copper. What type of reaction is this?", answer: "A displacement reaction" },
        { prompt: "In the electrolysis of copper chloride solution, on which electrode is copper deposited?", answer: "On the negative electrode (cathode)" },
        { prompt: "How many products does a combination reaction give?", answer: "One" },
      ],
      pyqExampleId: "b99afe87-d187-403f-ae35-3b2f2de0e2f5",
      traps: [
        {
          title: "Calling every irreversible change chemical",
          body: "Grinding wood into sawdust cannot be undone, but no new substance forms, so it is a physical change.",
        },
        {
          title: "Calling boiling a chemical change",
          body: "Steam is still water. Boiling only changes the state, so it is a physical change.",
        },
        {
          title: "Expecting electrolysis with the switch open",
          body: "No current flows in an open circuit, so nothing is deposited on either electrode. Check the switch in a circuit figure first.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9crty-heat",
      name: "Exothermic and endothermic reactions",
      intuition:
        "Touch the vessel. If it gets warm, the reaction is giving out heat: exothermic. If it gets cold, the reaction is taking heat from its surroundings: endothermic. A reaction that stops as soon as you stop heating it is also taking in heat.",
      definition:
        "- **Exothermic**: heat is **given out**. Burning, respiration, quicklime with water, dissolving sodium hydroxide, calcium chloride or concentrated sulphuric acid in water, neutralisation, and the rotting of plant waste into compost.\n" +
        "- **Endothermic**: heat is **taken in**. Dissolving ammonium chloride or potassium nitrate in water (the water turns cold), photosynthesis, breaking up calcium carbonate by heat, and carbon combining with sulphur to form carbon disulphide.\n" +
        "- **Compost** forms by **aerobic** decomposition (microbes use the air's oxygen) and gives out heat. **Anaerobic** decomposition, without air, gives **biogas**.\n" +
        "- Concentrated sulphuric acid is always added **slowly to water**, never water to the acid, because so much heat is given out.",
      table: {
        columns: ["Process", "Heat", "What you notice"],
        rows: [
          { cells: ["Quicklime (calcium oxide) with water", "Given out", "The water hisses and becomes very hot"] },
          { cells: ["Sodium hydroxide dissolving in water", "Given out", "The beaker becomes warm"] },
          { cells: ["Plant waste rotting into compost", "Given out", "The compost pit becomes warm"] },
          { cells: ["Ammonium chloride dissolving in water", "Taken in", "The beaker becomes cold"] },
          { cells: ["Carbon and sulphur forming carbon disulphide", "Taken in", "It continues only while heat is supplied"] },
          { cells: ["Photosynthesis", "Taken in", "It needs the energy of sunlight"] },
        ],
        caption: "Warm vessel: exothermic. Cold vessel, or heat needed all along: endothermic.",
      },
      selfCheckExample: {
        prompt: "When potassium nitrate is dissolved in water in a test tube, the test tube feels cold. Is the change exothermic or endothermic?",
        steps: ["The test tube is cold, so heat has been taken from the surroundings."],
        answer: "Endothermic",
      },
      practiceSet: [
        { prompt: "Is respiration an exothermic or an endothermic process?", answer: "Exothermic: it gives out energy" },
        { prompt: "Is the breaking up of calcium carbonate by heating exothermic or endothermic?", answer: "Endothermic: heat must be supplied all the time" },
        { prompt: "Why is concentrated sulphuric acid added slowly to water and not water to the acid?", answer: "Mixing gives out a lot of heat, which can boil the water and throw out acid" },
        { prompt: "Why does a compost pit become warm?", answer: "The aerobic decomposition of plant waste gives out heat" },
      ],
      pyqExampleId: "8d5e7a1d-d96d-4e90-8f4c-9b89e00a2289",
      traps: [
        {
          title: "Thinking any reaction that needs heating is endothermic",
          body: "Coal needs heat to catch fire, but once burning it gives out heat, so burning is exothermic. A reaction is endothermic when it keeps taking in heat.",
        },
        {
          title: "Thinking every substance warms the water it dissolves in",
          body: "Sodium hydroxide warms the water, but ammonium chloride and potassium nitrate make it cold.",
        },
        {
          title: "Calling composting anaerobic",
          body: "Compost forms with the air's oxygen, so it is aerobic decomposition. Decomposition without air gives biogas.",
        },
      ],
    },
  ],
};
