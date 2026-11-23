import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_EE_ENVIRONMENT_NOTE: SubtopicNote = {
  subtopicName: "Waste Management and Conservation",
  title: "Waste Management and Conservation",
  oneLineDefinition:
    "Waste is sorted by its source, from domestic to radioactive; some methods such as pyrolysis and biogas turn waste into energy; and sanctuaries, national parks and tree planting protect living things.",
  whyItMatters:
    "Eleven questions in the bank, nine MODERATE and two HARD. Four sort waste by its source (including arsenic and a radioactive gas from soil), three are about getting energy from waste and the R principles, and four are about conservation: bird sanctuaries, the state with the most national parks and the Harit Sena.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9eeev-waste",
      name: "Kinds of waste by their source",
      intuition:
        "Waste is easiest to handle when you know where it came from. Peels from the kitchen can rot into manure; an old phone needs special recycling; a used syringe can spread disease; waste from an atomic plant gives off radiation for years. Each needs its own handling, so the first step is always to sort it.",
      definition:
        "- **Domestic** waste comes from homes; **industrial** waste from factories; **mining** waste from mines and ore processing; **electronic** waste (e-waste) from old electrical goods; **biomedical** waste from hospitals; **radioactive** waste from atomic research centres and nuclear power plants.\n" +
        "- **Hazardous** waste is any waste dangerous to living things, such as explosives, radioactive materials and poisonous chemicals.\n" +
        "- Mining waste carries harmful elements such as **arsenic, lead and cadmium**.\n" +
        "- **Radon** is a radioactive gas given off naturally by soil and rocks that contain uranium. It can collect inside houses.",
      table: {
        columns: ["Kind of waste", "Examples"],
        rows: [
          { cells: ["Domestic", "Fruit and vegetable peels, paper, plastic bags"] },
          { cells: ["Industrial", "Ash, chemicals, metal scraps"] },
          { cells: ["Mining", "Waste rock and slag carrying arsenic, lead, cadmium"] },
          { cells: ["Electronic (e-waste)", "Old music systems, televisions, computers, mobile phones"] },
          { cells: ["Biomedical", "Used syringes, bandages, saline bottles"] },
          { cells: ["Radioactive", "Waste of atomic research centres and nuclear power plants, radioactive substances such as barium-140"] },
          { cells: ["Hazardous", "Explosives, radioactive materials, poisonous chemicals"], noteAmber: "Hazardous describes the danger, so it overlaps the other kinds." },
        ],
        caption: "Ask first: where did this waste come from?",
      },
      selfCheckExample: {
        prompt: "Sort these into kinds of waste: a broken mobile phone, used bandages from a clinic, potato peels.",
        steps: ["A mobile phone is an electrical good: electronic waste.", "Bandages from a clinic: biomedical waste.", "Potato peels from a kitchen: domestic waste."],
        answer: "Electronic, biomedical, domestic",
      },
      practiceSet: [
        { prompt: "Which radioactive gas is given off naturally by soil and rocks?", answer: "Radon" },
        { prompt: "Arsenic and lead left over from processing ores belong to which kind of waste?", answer: "Mining waste" },
        { prompt: "Is an old computer domestic waste or electronic waste?", answer: "Electronic waste (e-waste)" },
        { prompt: "Why are explosives classed as hazardous waste?", answer: "They are dangerous to living things" },
      ],
      pyqExampleId: "de5a86d1-c782-4c78-81f6-eb8769dffc81",
      traps: [
        {
          title: "Calling arsenic radioactive",
          body: "Arsenic is a poisonous element found in mining waste. It is not radioactive.",
        },
        {
          title: "Putting saline bottles in domestic waste",
          body: "Used saline bottles come from hospitals and clinics, so they are biomedical waste.",
        },
        {
          title: "Thinking atomic research centres give mining waste",
          body: "Atomic research centres and nuclear power plants give radioactive waste. Mining waste comes from mines.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9eeev-energy",
      name: "Energy from waste and the R principles",
      intuition:
        "Kitchen scraps and dry waste still hold energy, the same energy that was in the food and wood they came from. Heat them without air, or let them rot without air, and they give fuel. Better still is to make less waste in the first place: refuse, reduce, reuse and recycle.",
      definition:
        "- **Pyrolysis** heats waste strongly **without oxygen**, breaking it into fuel gas, oil and char that give energy. It is not burning.\n" +
        "- A **biogas plant** lets wet waste and cow dung rot **without air**; it gives **biogas**, mostly **methane**, used as fuel.\n" +
        "- **Incineration** burns dry waste, and the heat can run a power plant.\n" +
        "- **Composting** lets wet waste rot in air into **manure**. It gives no energy.\n" +
        "- The **R principles** (the 7-R principles in school books, such as refuse, reduce, reuse and recycle) cut the amount of solid waste.\n" +
        "- **Tetra packs** are layers of paper, plastic and aluminium stuck together, which makes them hard to recycle; avoiding them reduces solid waste.",
      table: {
        columns: ["Method", "What it does with waste", "Gives energy?"],
        rows: [
          { cells: ["Pyrolysis", "Heats waste without oxygen into fuel gas, oil and char", "Yes"] },
          { cells: ["Biogas plant", "Lets wet waste rot without air into biogas (methane)", "Yes"] },
          { cells: ["Incineration", "Burns dry waste; the heat runs a power plant", "Yes"] },
          { cells: ["Composting", "Lets wet waste rot in air into manure", "No: it gives manure"] },
        ],
        caption: "Without air: fuel. With air: compost.",
      },
      selfCheckExample: {
        prompt: "Which method of waste management turns kitchen waste and cow dung into a fuel gas for cooking?",
        steps: ["Wet waste rotting without air gives biogas, which is mostly methane."],
        answer: "A biogas plant",
      },
      practiceSet: [
        { prompt: "Why is buying tetra packs discouraged when we try to cut solid waste?", answer: "They are made of paper, plastic and aluminium stuck together, so they are hard to recycle" },
        { prompt: "Does composting produce energy?", answer: "No: it turns wet waste into manure" },
        { prompt: "Which gas makes up most of biogas?", answer: "Methane" },
        { prompt: "Name three of the R principles of waste management.", answer: "Any three of refuse, reduce, reuse and recycle" },
      ],
      pyqExampleId: "15648fc4-8d5b-4cca-b60b-a7fe7a22fc0e",
      traps: [
        {
          title: "Thinking composting gives energy",
          body: "Composting gives manure for the soil. Pyrolysis, biogas plants and incineration are the methods that give energy.",
        },
        {
          title: "Calling pyrolysis burning",
          body: "Pyrolysis heats waste without oxygen, so nothing burns. The waste breaks down into fuel gas, oil and char.",
        },
        {
          title: "Treating reuse and recycle as the same",
          body: "Reuse means using a thing again as it is. Recycle means breaking it down into raw material to make new things.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9eeev-conservation",
      name: "Sanctuaries, national parks and tree planting",
      intuition:
        "Wild plants and animals survive only where their homes are safe. India sets aside national parks and sanctuaries for them, and birds that fly in from far countries every winter gather at lakes that are protected as bird sanctuaries. Planting and caring for trees with the help of ordinary people adds to the green cover.",
      definition:
        "- A **national park** is strictly protected: no grazing or other human activity. A **wildlife sanctuary** allows some limited activity.\n" +
        "- **Madhya Pradesh** has the most national parks of any Indian state, such as Kanha, Bandhavgarh, Pench and Kuno.\n" +
        "- **Nandur Madhyameshwar** in Nashik district draws so many migratory birds that it is called the **Bharatpur of Maharashtra**, after the famous bird sanctuary at Bharatpur in Rajasthan.\n" +
        "- **Social forestry** means planting and caring for trees with the help of the people. The **Harit Sena** (green army) of students and citizens does this.",
      table: {
        columns: ["Protected area", "State", "Known for"],
        rows: [
          { cells: ["Keoladeo (Bharatpur)", "Rajasthan", "Migratory birds"] },
          { cells: ["Nandur Madhyameshwar", "Maharashtra (Nashik)", "Migratory birds: the Bharatpur of Maharashtra"] },
          { cells: ["Karnala", "Maharashtra (Raigad)", "Bird sanctuary"] },
          { cells: ["Salim Ali Bird Sanctuary", "Goa", "Birds of the mangroves"] },
          { cells: ["Chilika Lake", "Odisha", "Migratory water birds"] },
          { cells: ["Nal Sarovar", "Gujarat", "Migratory water birds"] },
          { cells: ["Tadoba", "Maharashtra (Chandrapur)", "Tigers (national park)"] },
        ],
        caption: "Odd-one-out pairs usually put a sanctuary in the wrong state.",
      },
      selfCheckExample: {
        prompt: "In which state is the Salim Ali Bird Sanctuary?",
        steps: ["It is on an island of the Mandovi river, among mangroves, in Goa."],
        answer: "Goa",
      },
      practiceSet: [
        { prompt: "What is the main aim of the Harit Sena?", answer: "Social forestry: planting and caring for trees" },
        { prompt: "In which state is Chilika Lake?", answer: "Odisha" },
        { prompt: "Which sanctuary is called the Bharatpur of Maharashtra?", answer: "Nandur Madhyameshwar, in Nashik district" },
        { prompt: "How does a national park differ from a wildlife sanctuary?", answer: "A national park allows no grazing or human activity; a sanctuary allows some" },
      ],
      pyqExampleId: "6fdaa4c8-e1f1-4e75-b232-2360f731f4ae",
      traps: [
        {
          title: "Placing the Salim Ali sanctuary in Madhya Pradesh",
          body: "The Salim Ali Bird Sanctuary is in Goa. Madhya Pradesh is known instead for having the most national parks.",
        },
        {
          title: "Calling Karnala the Bharatpur of Maharashtra",
          body: "Karnala in Raigad is a bird sanctuary too, but the name Bharatpur of Maharashtra belongs to Nandur Madhyameshwar.",
        },
        {
          title: "Taking Harit Sena for a cleanliness drive",
          body: "The Harit Sena's main aim is social forestry, planting trees. Cleanliness drives belong to the Swachh Bharat campaign.",
        },
      ],
    },
  ],
};
