import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_CCR_REACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Types of Reactions, Redox and Rates",
  title: "Types of Reactions, Redox and Rates",
  oneLineDefinition:
    "Combination and decomposition reactions with the textbook examples, physical and chemical changes, rancidity, oxidation and reduction, and the order of a reaction.",
  whyItMatters:
    "Sixteen questions in the bank: one from the 2023 shifts and 15 from the 2024 shifts. Most describe an experiment from the school textbook and ask its type or its product, so the examples table is the core.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssccrre-types",
      name: "Types of reaction and their examples",
      intuition:
        "Count reactants and products. Two things joining into one is combination; one thing splitting into several is decomposition, whether heat, light or electricity does the splitting.",
      definition:
        "Combination: **quicklime + water**: CaO + H2O gives **Ca(OH)2** (slaked lime), with heat.\n\n" +
        "Decomposition:\n" +
        "- By **heat**: lead nitrate gives **brown nitrogen dioxide** fumes.\n" +
        "- By **light**: white **silver chloride** turns **grey** as it splits into silver and chlorine.\n" +
        "- By **electricity**: water splits into hydrogen and oxygen.\n\n" +
        "Changes:\n" +
        "- **Curdling milk** is a **chemical** change. Heating iron red hot, evaporating diesel and subliming NH4Cl are physical.\n" +
        "- **Rancidity** (rancidification): fats and oils are **oxidised** and smell bad. Antioxidants and **nitrogen** in chip packets prevent it.\n\n" +
        "Named reaction: **Sandmeyer**: a diazonium salt to an aryl halide with a **copper(I) halide**.",
      table: {
        columns: ["Example", "Type or product"],
        rows: [
          { cells: ["Quicklime and water", "Combination; Ca(OH)2"], pyqExampleId: "ac171777-9bfc-4ce8-98ff-c313b1647c0c" },
          { cells: ["Heating lead nitrate", "Brown NO2 fumes"], pyqExampleId: "1152a555-9c45-4223-bf0d-557b7dc30fc8" },
          { cells: ["Silver chloride in sunlight", "Decomposes; turns grey"], pyqExampleId: "8c9f846e-1671-454e-b7d6-d5698c593fdc" },
          { cells: ["Curdling of milk", "Chemical change"], pyqExampleId: "83081a7a-e67e-4821-b5fa-ebaafd0a4a87" },
          { cells: ["Fats going bad", "Rancidification"], pyqExampleId: "9cee3d68-d134-4188-bceb-87074c6cf2bf" },
          { cells: ["Diazonium salt with CuCl", "Sandmeyer reaction"], pyqExampleId: "726321e3-5152-4615-bf53-c9a135a66032" },
        ],
      },
      pyqExampleId: "a4c11da6-8a92-4b0e-b151-3086f9dbf42c",
      selfCheckExample: {
        prompt: "Why do chip makers fill packets with nitrogen?",
        steps: ["Fats in the chips go rancid when oxygen oxidises them.", "Nitrogen pushes out the oxygen, so the fats are not oxidised."],
        answer: "To keep oxygen out and stop the fats going rancid.",
      },
      practiceSet: [
        { prompt: "What is slaked lime?", answer: "Calcium hydroxide, Ca(OH)2" },
        { prompt: "What colour are the fumes from heated lead nitrate?", answer: "Brown" },
        { prompt: "Is evaporation of diesel a physical or chemical change?", answer: "Physical" },
      ],
      traps: [
        {
          title: "Rancid fats are oxidised",
          body: "Fats go rancid by **oxidation**. A statement that they get **reduced** over time is the false one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccrre-redox",
      name: "Oxidation and reduction",
      intuition:
        "In a redox reaction electrons pass from one reactant to another. Track the oxidation numbers: the one that rises was oxidised, the one that falls was reduced.",
      definition:
        "The rules:\n" +
        "- A redox reaction is the **transfer of electrons between reactants**.\n" +
        "- Oxidation: oxidation number **rises** (electrons lost). Reduction: it **falls** (electrons gained).\n" +
        "- In 4NH3 + 5O2 giving 4NO + 6H2O, **nitrogen** goes from minus 3 to plus 2 (**oxidised**) and **oxygen** from 0 to minus 2 (**reduced**).\n" +
        "- **CaCO3** splitting into CaO and CO2 is **not** redox: no oxidation number changes.\n\n" +
        "History: **Lavoisier** showed that combustion is reaction with **oxygen**, ending the phlogiston theory.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["In NH3 burning", "N oxidised, O reduced"], pyqExampleId: "2a4c44aa-deb2-46f1-9e9f-051a531f0d2d" },
          { cells: ["Not a redox decomposition", "Calcium carbonate"], pyqExampleId: "4ddbf056-1eb8-4f1f-871c-903c8d7ca93f" },
          { cells: ["Combustion with oxygen", "Lavoisier"], pyqExampleId: "9977674a-7947-4deb-b2f6-12f4d16a7803" },
        ],
      },
      pyqExampleId: "09901e21-2637-417b-a5c9-770b52d0a194",
      selfCheckExample: {
        prompt: "In CuO + H2 giving Cu + H2O, which substance is oxidised and which reduced?",
        steps: ["Copper goes from plus 2 to 0: its number falls, so CuO is reduced.", "Hydrogen goes from 0 to plus 1: its number rises, so H2 is oxidised."],
        answer: "H2 is oxidised; CuO is reduced.",
      },
      practiceSet: [
        { prompt: "Is losing electrons oxidation or reduction?", answer: "Oxidation" },
        { prompt: "Which theory did Lavoisier overturn?", answer: "The phlogiston theory" },
        { prompt: "Does the oxidation number rise or fall on reduction?", answer: "It falls" },
      ],
      traps: [
        {
          title: "Not every decomposition is redox",
          body: "**Calcium carbonate** breaks down with every oxidation number unchanged, so it is **not** redox, unlike NaH or KClO3.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssccrre-rates",
      name: "Order of a reaction and temperature",
      intuition:
        "The order says how the rate depends on concentration. When a catalyst surface is full, adding more reactant changes nothing: that is zero order.",
      definition:
        "Orders:\n" +
        "- **Zero order**: rate does not depend on concentration. It happens when a surface or catalyst is **saturated**, as with **ammonia on hot platinum** at high pressure.\n" +
        "- **First order**: rate proportional to the **first power** of concentration.\n" +
        "- Second and third order: the second and third powers.\n\n" +
        "Temperature: a **10 degree** rise roughly **doubles** the rate constant.",
      table: {
        columns: ["Order", "Rate depends on"],
        rows: [
          { cells: ["Zero", "Nothing; surface saturated"], pyqExampleId: "7a45d565-05fd-4020-82fd-7ccfda611899" },
          { cells: ["First", "Concentration to the power 1"] },
          { cells: ["NH3 on hot Pt", "Zero order"], pyqExampleId: "278edb88-ffac-43c8-ace5-9d0206607f48" },
          { cells: ["10 degree rise", "Rate constant about doubles"], pyqExampleId: "e3a873dd-200b-4522-9d9d-aff8b805cbf9" },
        ],
      },
      pyqExampleId: "780329ca-a0ca-46c3-9959-6b87aa1d9736",
      selfCheckExample: {
        prompt: "A rate constant is k at 25 degrees. About what is it at 45 degrees?",
        steps: ["Each 10 degree rise roughly doubles k.", "Two rises: k becomes about 2 x 2 = 4 times as large."],
        answer: "About 4k.",
      },
      practiceSet: [
        { prompt: "What order is a reaction whose rate is independent of concentration?", answer: "Zero order" },
        { prompt: "Is ammonia decomposition on hot platinum zero or first order at high pressure?", answer: "Zero order" },
        { prompt: "By about how much does a 10 degree rise change the rate constant?", answer: "It nearly doubles" },
      ],
      traps: [
        {
          title: "Saturated surface means zero order",
          body: "When the catalyst surface is **saturated**, the reaction is **zero** order. Options offering first order are the decoy.",
        },
      ],
    },
  ],
};
