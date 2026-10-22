import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_CR_OXIDATION_NOTE: SubtopicNote = {
  subtopicName: "Oxidation, Corrosion and Rancidity",
  title: "Oxidation, Corrosion and Rancidity",
  oneLineDefinition:
    "Oxidation is gain of oxygen or loss of hydrogen, reduction is the reverse, and slow oxidation by air rusts iron and spoils oily food.",
  whyItMatters:
    "Two questions in the bank, both EASY, and one is from the 2022 paper: what makes oily food go rancid and how to stop it, and what rust is chemically. Both are the same idea at work, oxidation by the air.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spicrox-redox",
      name: "Oxidation and reduction",
      intuition:
        "Follow the oxygen. The substance that gains oxygen is oxidised; the one that loses it is reduced. The two always happen together in one reaction, so such reactions are called redox reactions.",
      definition:
        "- **Oxidation**: gain of oxygen or loss of hydrogen.\n" +
        "- **Reduction**: loss of oxygen or gain of hydrogen.\n" +
        "- The **oxidising agent** gives oxygen (or takes hydrogen); it is itself reduced.\n" +
        "- The **reducing agent** takes oxygen (or gives hydrogen); it is itself oxidised.",
      formula: {
        label: "Redox in one line",
        latex: "\\text{oxidation} = +\\,\\mathrm{O} \\text{ or } -\\,\\mathrm{H} \\qquad \\text{reduction} = -\\,\\mathrm{O} \\text{ or } +\\,\\mathrm{H}",
      },
      authoredExample: {
        prompt: "In \\(\\mathrm{CuO + H_2 \\rightarrow Cu + H_2O}\\), which substance is oxidised and which is reduced?",
        steps: [
          "\\(\\mathrm{H_2}\\) gains oxygen and becomes \\(\\mathrm{H_2O}\\): it is oxidised.",
          "\\(\\mathrm{CuO}\\) loses oxygen and becomes Cu: it is reduced.",
        ],
        answer: "Hydrogen is oxidised; copper oxide is reduced.",
      },
      selfCheckExample: {
        prompt: "In \\(\\mathrm{ZnO + C \\rightarrow Zn + CO}\\), which substance is the oxidising agent?",
        steps: [
          "Carbon gains oxygen, so carbon is oxidised.",
          "Zinc oxide gives that oxygen and is reduced, so it is the oxidising agent.",
        ],
        answer: "Zinc oxide, \\(\\mathrm{ZnO}\\)",
      },
      practiceSet: [
        { prompt: "Is the gain of hydrogen oxidation or reduction?", answer: "Reduction" },
        { prompt: "Is the loss of oxygen oxidation or reduction?", answer: "Reduction" },
        { prompt: "What is a substance that gives oxygen to another substance called?", answer: "An oxidising agent" },
        { prompt: "Magnesium burns in oxygen to form magnesium oxide. Is magnesium oxidised or reduced?", answer: "Oxidised (it gains oxygen)" },
      ],
      traps: [
        {
          title: "Looking for oxidation on its own",
          body:
            "Oxidation and reduction always happen together. If one substance gains oxygen, another in the same reaction has lost it.",
        },
        {
          title: "Saying the oxidising agent is oxidised",
          body:
            "The oxidising agent gives away oxygen, so it is reduced. The substance it oxidises is the one that gains oxygen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicrox-corrosion",
      name: "Corrosion and rusting",
      intuition:
        "Metals left in air slowly react with oxygen, water and other gases and are eaten away. For iron this is rusting, and it needs both air and water at the same time.",
      definition:
        "- **Corrosion** is the slow eating away of a metal by air, moisture or chemicals around it.\n" +
        "- **Rust** is **hydrated iron(III) oxide**, \\(\\mathrm{Fe_2O_3 \\cdot xH_2O}\\), a reddish brown flaky solid.\n" +
        "- Iron rusts only when **both air (oxygen) and water** are present.\n" +
        "- Rusting is prevented by painting, oiling or greasing, **galvanising** (a coat of zinc), chrome plating and making alloys such as stainless steel.",
      table: {
        columns: ["Metal", "Coating that forms", "Colour"],
        rows: [
          {
            cells: ["Iron", "Hydrated iron(III) oxide (rust)", "Reddish brown"],
            noteAmber: "Ferric means iron(III); rust carries water, so plain ferric oxide is not rust.",
          },
          { cells: ["Silver", "Silver sulphide", "Black"] },
          { cells: ["Copper", "Basic copper carbonate", "Green"] },
        ],
        caption: "Galvanising coats iron with zinc; the zinc corrodes first and protects the iron.",
      },
      selfCheckExample: {
        prompt: "An iron nail is kept in boiled water with a layer of oil on top. Will it rust? Why?",
        steps: ["Boiling drives out the dissolved air, and the oil stops air getting back in.", "Rusting needs both air and water."],
        answer: "No: there is water but no air.",
      },
      practiceSet: [
        { prompt: "Which metal is coated on iron in galvanising?", answer: "Zinc" },
        { prompt: "What colour does silver turn when it corrodes in air?", answer: "Black (silver sulphide)" },
        { prompt: "What is the green coating that forms on old copper vessels?", answer: "Basic copper carbonate" },
        { prompt: "Name the two things iron needs in order to rust.", answer: "Air (oxygen) and water" },
      ],
      pyqExampleId: "27ffc336-bbb7-42c0-9d39-9c3544bbb613",
      traps: [
        {
          title: "Calling rust plain ferric oxide",
          body: "Rust is hydrated ferric oxide, \\(\\mathrm{Fe_2O_3 \\cdot xH_2O}\\). Leaving out the water of hydration gives a different compound.",
        },
        {
          title: "Thinking water alone rusts iron",
          body: "Iron needs air and water together. In dry air, or in water with no dissolved air, it does not rust.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spicrox-rancidity",
      name: "Rancidity and how to prevent it",
      intuition:
        "Fried food left open for days smells and tastes bad. The fats and oils in it have been oxidised by the air. Anything that keeps oxygen away, or slows the reaction, keeps the food fresh longer.",
      definition:
        "- **Rancidity**: fats and oils in food are **oxidised** by air, so their smell and taste turn unpleasant.\n" +
        "- **Antioxidants** added to food slow down this oxidation.\n" +
        "- Packets of chips are filled with **nitrogen**, an unreactive gas, so no oxygen is left inside.\n" +
        "- Airtight containers, refrigeration and keeping food away from light also slow it down.",
      table: {
        columns: ["Method", "How it helps"],
        rows: [
          { cells: ["Adding antioxidants", "They slow the oxidation of fats and oils"] },
          {
            cells: ["Filling packets with nitrogen", "Nitrogen pushes out the air, so no oxygen reaches the oil"],
            noteAmber: "Nitrogen, not oxygen: it is chosen because it does not react.",
          },
          { cells: ["Airtight containers", "Less air reaches the food"] },
          { cells: ["Refrigeration", "Low temperature slows the reaction"] },
        ],
        caption: "Every method either keeps oxygen out or slows the oxidation down.",
      },
      selfCheckExample: {
        prompt: "Why are packets of potato chips filled with nitrogen gas?",
        steps: ["Oxygen in air would oxidise the oil in the chips.", "Nitrogen is unreactive and leaves no room for oxygen."],
        answer: "To keep oxygen out so the oil in the chips does not turn rancid.",
      },
      practiceSet: [
        { prompt: "What happens to the smell and taste of fats and oils when they turn rancid?", answer: "They become unpleasant" },
        { prompt: "How does keeping food in a refrigerator slow down rancidity?", answer: "The low temperature slows the oxidation" },
        { prompt: "Name the gas used to fill packets of chips.", answer: "Nitrogen" },
        { prompt: "Why should cooked oily food be kept in an airtight container?", answer: "To keep air (oxygen) away from the oil" },
      ],
      pyqExampleId: "35be49f2-e70a-4b46-be8c-cb3845b9232a",
      traps: [
        {
          title: "Blaming bacteria for rancidity",
          body:
            "Rancidity is the oxidation of fats and oils by air, not the work of bacteria. Antioxidants stop it; antibiotics would not.",
        },
        {
          title: "Thinking any gas will do in a chips packet",
          body: "The gas must be unreactive. Nitrogen is used because it does not react with the oil and keeps oxygen out.",
        },
      ],
    },
  ],
};
