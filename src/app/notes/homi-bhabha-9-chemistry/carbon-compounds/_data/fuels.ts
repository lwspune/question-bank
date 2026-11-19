import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CC_FUELS_NOTE: SubtopicNote = {
  subtopicName: "Fuels and Combustion",
  title: "Fuels and Combustion",
  oneLineDefinition:
    "A fuel burns in oxygen to give heat; carbon fuels give carbon dioxide and water when they burn completely, and the gaseous fuels and petroleum products differ in what they contain and where they come from.",
  whyItMatters:
    "Ten questions in the bank, four EASY and six MODERATE. Four are about burning: what burning benzene or methane gives, ignition temperature and the zones of a candle flame. Four are about gaseous fuels such as LPG, CNG, biogas, natural gas, water gas and producer gas, and two ask which products come from petroleum.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ccfu-combustion",
      name: "Combustion, ignition temperature and the candle flame",
      intuition:
        "Burning is a fast reaction with oxygen that gives out heat and light. Every carbon fuel holds carbon and usually hydrogen, so with enough air its carbon ends up as carbon dioxide and its hydrogen as water. A fuel does not catch fire until it is hot enough: that temperature is its ignition temperature, low for petrol and high for wood.",
      definition:
        "- **Combustion**: a substance burning in **oxygen**, giving **heat and light**.\n" +
        "- **Complete combustion** of a hydrocarbon (plenty of air) gives **carbon dioxide and water**: \\(\\mathrm{CH_4 + 2O_2 \\rightarrow CO_2 + 2H_2O}\\).\n" +
        "- **Incomplete combustion** (too little air) also gives poisonous **carbon monoxide** and **soot** (unburnt carbon), with a smoky yellow flame. Any carbon fuel, such as benzene, still forms carbon dioxide when it burns.\n" +
        "- **Ignition temperature**: the **lowest temperature** at which a substance catches fire. **Inflammable** substances (petrol, LPG, alcohol, phosphorus) have a **low** one; **wood and coal** have a **high** one. Yellow (white) phosphorus catches fire in air at about 30 °C, so it is stored under water.\n" +
        "- **Methane** has one carbon for four hydrogens, the most hydrogen of any hydrocarbon, so it gives the least carbon dioxide for the heat it releases.",
      table: {
        columns: ["Zone of a candle flame", "Colour", "Burning", "Temperature"],
        rows: [
          { cells: ["Outermost zone", "Faint blue, non-luminous", "Complete combustion: plenty of air", "Hottest"] },
          { cells: ["Middle zone", "Bright yellow, luminous", "Partial combustion", "Moderately hot"] },
          { cells: ["Innermost zone", "Dark", "No burning: unburnt wax vapour", "Least hot"] },
        ],
        caption: "The zone that gets the most air burns completely and is the hottest.",
      },
      selfCheckExample: {
        prompt: "A goldsmith uses a blowpipe to direct the outermost part of a flame onto gold to melt it. Why that part of the flame?",
        steps: ["In the outermost zone the fuel gets plenty of air and burns completely.", "Complete combustion makes this the hottest zone."],
        answer: "The outermost zone is the hottest part of the flame.",
      },
      practiceSet: [
        { prompt: "What are the two products when methane burns completely in air?", answer: "Carbon dioxide and water" },
        { prompt: "Kerosene catches fire when warmed a little, but wood does not. Which has the higher ignition temperature?", answer: "Wood" },
        { prompt: "Which poisonous gas forms when a fuel burns in too little air?", answer: "Carbon monoxide" },
        { prompt: "What is the ignition temperature of a substance?", answer: "The lowest temperature at which it catches fire" },
      ],
      pyqExampleId: "1a2ce662-8716-4c93-8972-8ea0280b9ff4",
      traps: [
        {
          title: "Calling the bright yellow zone the hottest",
          body: "The yellow middle zone glows because its fuel burns only partly. The faint outermost zone burns completely and is the hottest.",
        },
        {
          title: "Thinking a smoky flame forms no carbon dioxide",
          body: "Even in too little air, part of the carbon of a fuel burns to carbon dioxide. Incomplete burning adds carbon monoxide and soot; it does not stop carbon dioxide forming.",
        },
        {
          title: "Thinking an inflammable substance has a high ignition temperature",
          body: "Inflammable means it catches fire easily, so its ignition temperature is low. Wood and coal, which are hard to light, have high ignition temperatures.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ccfu-gases",
      name: "Gaseous fuels: LPG, CNG, natural gas, biogas and others",
      intuition:
        "Gaseous fuels are easy to pipe or store in cylinders and burn without smoke or ash. Most are mainly methane: natural gas from under the ground, and biogas from rotting cattle dung. LPG is different: it is mainly butane, from petroleum. Water gas and producer gas are made by passing steam or air over red-hot coke.",
      definition:
        "- **Natural gas** is mostly **methane**. It is used to **generate electricity**, to **heat and cook in homes**, to make **fertilizers** and, compressed as **CNG**, to fuel buses, cars and autorickshaws.\n" +
        "- **CNG** (compressed natural gas) and **LNG** (natural gas cooled to a liquid) are both mainly **methane**.\n" +
        "- **Biogas** is mainly **methane**, made when bacteria break down cattle dung and plant waste **without air**.\n" +
        "- **LPG** (liquefied petroleum gas) is mainly **butane** with some **propane**. It has no smell, so **ethyl mercaptan**, which smells strongly, is added to warn of a leak.\n" +
        "- **Water gas** is \\(\\mathrm{CO + H_2}\\). **Producer gas** is \\(\\mathrm{CO + N_2}\\), with a little \\(\\mathrm{CO_2}\\) and \\(\\mathrm{H_2}\\).",
      table: {
        columns: ["Fuel", "Main gas or gases", "How it is obtained"],
        rows: [
          { cells: ["Natural gas", "Methane", "From wells under the ground, often with petroleum"] },
          { cells: ["CNG", "Methane", "Natural gas compressed at high pressure"] },
          { cells: ["LNG", "Methane", "Natural gas cooled until it becomes a liquid"] },
          { cells: ["Biogas", "Methane, with carbon dioxide", "Cattle dung and plant waste broken down by bacteria without air"] },
          { cells: ["LPG", "Butane and propane", "Refining petroleum"], noteAmber: "The one common household fuel that is not mainly methane." },
          { cells: ["Water gas", "\\(\\mathrm{CO}\\) and \\(\\mathrm{H_2}\\)", "Steam passed over red-hot coke"] },
          { cells: ["Producer gas", "\\(\\mathrm{CO}\\) and \\(\\mathrm{N_2}\\)", "Air passed over red-hot coke"] },
        ],
        caption: "Producer gas is the one with nitrogen, because it is made with air.",
      },
      selfCheckExample: {
        prompt: "Which gas is the main part of both CNG and biogas?",
        steps: ["CNG is compressed natural gas, which is mostly methane.", "Biogas from cattle dung is also mostly methane."],
        answer: "Methane",
      },
      practiceSet: [
        { prompt: "What is the main gas in an LPG cylinder?", answer: "Butane" },
        { prompt: "Which two gases make up water gas?", answer: "Carbon monoxide and hydrogen" },
        { prompt: "Why is a strong-smelling compound added to LPG?", answer: "LPG has no smell of its own, so the smell warns people of a leak" },
        { prompt: "How is biogas produced?", answer: "Bacteria break down cattle dung and plant waste in the absence of air" },
      ],
      pyqExampleId: "7ff1a9dc-b3e4-44cd-b8e4-37f928ea62c4",
      traps: [
        {
          title: "Thinking LPG is mainly methane",
          body: "LPG is mainly butane, with propane. Natural gas, CNG, LNG and biogas are the fuels that are mainly methane.",
        },
        {
          title: "Thinking the LPG smell is the gas itself",
          body: "LPG has no smell. The smell comes from ethyl mercaptan, added on purpose so that a leak is noticed.",
        },
        {
          title: "Writing water gas with carbon dioxide",
          body: "Water gas is carbon monoxide and hydrogen, \\(\\mathrm{CO + H_2}\\). Carbon dioxide does not burn, so it is not what makes it a fuel.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ccfu-petroleum",
      name: "Products of petroleum",
      intuition:
        "Crude petroleum is a dark, thick mixture of many hydrocarbons. In a refinery it is heated and the parts are separated by their boiling points: the lightest come off at the top as gas, then petrol, kerosene and diesel, and the heaviest stay at the bottom. Fuels made from coal or from natural gas are a different family.",
      definition:
        "- Petroleum is separated in a **refinery** by **fractional distillation**: its parts boil off at different temperatures.\n" +
        "- Its products include **LPG, petrol, naphtha, kerosene, diesel, lubricating oil, paraffin wax and bitumen**.\n" +
        "- **Not** from petroleum: **CNG** (natural gas), **coal gas, coke and coal tar** (from heating coal without air), **biogas** (from dung and waste).",
      table: {
        columns: ["Petroleum product", "Main use"],
        rows: [
          { cells: ["LPG", "Cooking fuel in homes"] },
          { cells: ["Petrol", "Fuel for cars and motorcycles"] },
          { cells: ["Naphtha", "Raw material for making chemicals and plastics"] },
          { cells: ["Kerosene", "Fuel for stoves, lamps and jet aircraft"] },
          { cells: ["Diesel", "Fuel for trucks, buses and generators"] },
          { cells: ["Lubricating oil", "Reducing friction in machines"] },
          { cells: ["Paraffin wax", "Candles and ointments"] },
          { cells: ["Bitumen", "Surfacing roads"] },
        ],
        caption: "If a choice is made from coal or natural gas, it is not a petroleum product.",
      },
      selfCheckExample: {
        prompt: "Which of these is not obtained from petroleum: kerosene, coke, bitumen?",
        steps: ["Kerosene and bitumen are petroleum products.", "Coke is left when coal is heated without air."],
        answer: "Coke",
      },
      practiceSet: [
        { prompt: "By what process is petroleum separated into its products?", answer: "Fractional distillation" },
        { prompt: "Which petroleum product is used to surface roads?", answer: "Bitumen" },
        { prompt: "Which petroleum product is used to make candles?", answer: "Paraffin wax" },
        { prompt: "From which fuel is coal tar obtained?", answer: "Coal" },
      ],
      pyqExampleId: "6c6f5d96-356d-4fea-8064-d66f2edb0b51",
      traps: [
        {
          title: "Calling CNG a petroleum product",
          body: "CNG is compressed natural gas, a separate fossil fuel. LPG, petrol and diesel are the gases and liquids that come from refining petroleum.",
        },
        {
          title: "Calling coal gas a petroleum product",
          body: "Coal gas, coke and coal tar come from heating coal without air, not from petroleum.",
        },
      ],
    },
  ],
};
