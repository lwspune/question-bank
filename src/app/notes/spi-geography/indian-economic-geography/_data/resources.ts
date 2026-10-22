import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_IG_RESOURCES_NOTE: SubtopicNote = {
  subtopicName: "Resources, Conservation and Soils",
  title: "Resources, Conservation and Soils",
  oneLineDefinition:
    "Resources are sorted by where they come from, whether they run out and how far they are developed; using them without waste is conservation; soil is the resource that every crop grows in.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE: the name for resources taken straight from nature, the meaning of sustainable development, the best way to conserve, the state with the most black soil and the nutrient that laterite soil holds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiigre-types",
      name: "Kinds of resources",
      intuition:
        "A resource is anything in our surroundings that we can use and that has value to us. The same resource can be described in several ways at once, so every label below answers a different question about it.",
      definition:
        "- **Natural** resources are drawn from nature and used without much change: air, water, soil, minerals. **Human made** resources are things people build, such as roads and machines. **Human** resources are people themselves.\n" +
        "- **Biotic** resources come from living things (plants, animals, fish); **abiotic** resources from non-living things (rocks, metals).\n" +
        "- **Renewable** resources can be renewed or replenished (water, forests, wind); **non renewable** ones take millions of years to form and run out (coal, petroleum, minerals).\n" +
        "- By development: **potential** (found but not yet used, such as the wind and sun of Rajasthan and Gujarat), **developed** (surveyed and in use), **stock** (needs a technology we do not yet have, such as hydrogen from water) and **reserves** (usable with today's know how but kept for the future, such as water in dams).",
      table: {
        columns: ["Basis", "Kinds", "Example"],
        rows: [
          { cells: ["Origin", "Biotic, abiotic", "Fish is biotic; iron is abiotic"] },
          { cells: ["Running out", "Renewable, non renewable", "Forests are renewable; coal is not"] },
          { cells: ["Ownership", "Individual, community, national, international", "Village grazing ground is a community resource"] },
          { cells: ["Development", "Potential, developed, stock, reserves", "Water in a dam is a reserve"] },
          { cells: ["Who made it", "Natural, human made", "Soil is natural; a bridge is human made"] },
        ],
      },
      selfCheckExample: {
        prompt: "What are resources called that are found in a region but have not been used yet, such as the strong winds of Rajasthan?",
        steps: ["The question sorts resources by how far they are developed.", "Found but not yet used is the first stage."],
        answer: "Potential resources.",
      },
      practiceSet: [
        { prompt: "Are fish biotic or abiotic resources?", answer: "Biotic" },
        { prompt: "Water stored in a dam, usable with today's technology but kept for the future, is what kind of resource?", answer: "A reserve" },
        { prompt: "Is coal a renewable or a non renewable resource?", answer: "Non renewable" },
        { prompt: "What kind of resource is a road or a machine?", answer: "Human made" },
      ],
      pyqExampleId: "12000e00-897e-4ee8-9496-3e3f1d8621d4",
      traps: [
        {
          title: "Mixing up stock and reserves",
          body:
            "Stock needs a technology we do not have yet (hydrogen from water). Reserves can be used with the technology we already have but are kept for later (water in dams, forests).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigre-conserve",
      name: "Conservation and sustainable development",
      intuition:
        "If we use resources greedily, they run out and the land is spoilt for those who come after us. Conservation means using them carefully, so that there is enough now and later.",
      definition:
        "- **Conservation** is the careful, optimal use of resources without waste: reduce, reuse and recycle.\n" +
        "- **Sustainable development** is development that does not damage the environment, and does not take away what future generations will need.\n" +
        "- The idea of sustainable development was brought in by the **Brundtland Commission Report** (1987), called Our Common Future.\n" +
        "- The **Earth Summit** at Rio de Janeiro in 1992 adopted **Agenda 21**, a plan for sustainable development.\n" +
        "- Gandhiji said: \"There is enough for everybody's need and not for anybody's greed.\"",
      table: {
        columns: ["Name", "What it is"],
        rows: [
          { cells: ["Sustainable development", "Meeting today's needs without harming the environment or the needs of the future"] },
          { cells: ["Brundtland Commission Report, 1987", "Brought in the idea of sustainable development"] },
          { cells: ["Rio de Janeiro Earth Summit, 1992", "Adopted Agenda 21"] },
          { cells: ["Agenda 21", "A world plan for sustainable development"] },
        ],
      },
      selfCheckExample: {
        prompt: "At which meeting, held at Rio de Janeiro in 1992, was Agenda 21 adopted?",
        steps: ["Agenda 21 is the plan for sustainable development.", "It came out of the 1992 meeting of world leaders in Brazil."],
        answer: "The Earth Summit.",
      },
      practiceSet: [
        { prompt: "Which report of 1987 brought in the idea of sustainable development?", answer: "The Brundtland Commission Report (Our Common Future)" },
        { prompt: "What does conservation of resources mean?", answer: "Using resources carefully, without waste, so they last" },
        { prompt: "Complete Gandhiji's words: There is enough for everybody's need and not for anybody's ...", answer: "greed" },
      ],
      pyqExampleId: "953760cc-18eb-4ddd-a2ff-e7b6b4d8e68a",
      traps: [
        {
          title: "Thinking conservation means not using resources",
          body:
            "Conservation is optimal use, not no use. Resources still serve today's needs; they are only used without waste so that they last.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiigre-soils",
      name: "Soils of India",
      intuition:
        "Soil forms from the rock beneath it, shaped by the rain and heat of the place. So each kind of soil sits in a region you can name, and each has a mix of nutrients that suits certain crops.",
      definition:
        "- **Alluvial** soil is the most widespread. Rivers laid it down across the Northern Plains. It is rich in potash, phosphoric acid and lime.\n" +
        "- **Black** soil (regur) formed from the basalt of the Deccan trap. It covers the plateaus of Maharashtra, Saurashtra, Malwa, Madhya Pradesh and Chhattisgarh, and Maharashtra has the most. It holds moisture well, cracks deeply in hot weather, and is ideal for cotton. It is poor in phosphorus.\n" +
        "- **Red and yellow** soil forms on old crystalline rocks in the drier east and south of the Deccan. Iron gives it the red colour; it turns yellow when hydrated.\n" +
        "- **Laterite** soil forms under heavy rain and high heat, which wash away lime and silica. It is poor in organic matter, nitrogen, phosphate and calcium but holds iron oxide and potash. Its name comes from the Latin later, meaning brick.\n" +
        "- **Arid** soil of the dry west is sandy and salty.",
      table: {
        columns: ["Soil", "Where", "Mark of it"],
        rows: [
          { cells: ["Alluvial", "Northern Plains", "Most widespread; rich in potash, phosphoric acid, lime"] },
          { cells: ["Black (regur)", "Deccan trap: Maharashtra most, also Malwa, Saurashtra", "Holds moisture; cracks; best for cotton"] },
          { cells: ["Red and yellow", "Eastern and southern Deccan", "Red from iron"] },
          {
            cells: ["Laterite", "Areas of heavy rain and high heat", "Has iron oxide and potash; poor in nitrogen, phosphate, calcium"],
            noteAmber: "Heavy rain washes the other nutrients out.",
          },
          { cells: ["Arid", "Dry west, Rajasthan", "Sandy and salty"] },
        ],
      },
      selfCheckExample: {
        prompt: "What gives red soil its red colour?",
        steps: ["Red soil forms on crystalline rocks.", "Iron spread through those rocks colours the soil."],
        answer: "Iron.",
      },
      practiceSet: [
        { prompt: "Which is the most widespread soil of India?", answer: "Alluvial soil" },
        { prompt: "Black soil formed from the basalt of which region?", answer: "The Deccan trap" },
        { prompt: "Which crop grows best on black soil?", answer: "Cotton" },
        { prompt: "The name laterite comes from a Latin word meaning what?", answer: "Brick" },
      ],
      pyqExampleId: "cdb731ec-df74-4824-aa69-b4e2e406c795",
      traps: [
        {
          title: "Thinking laterite is rich in nitrogen",
          body:
            "Heavy rain washes nitrogen, phosphate and calcium out of laterite. What stays behind in good amount is iron oxide and potash.",
        },
        {
          title: "Looking for black soil in the plains",
          body:
            "Uttar Pradesh is mainly alluvial soil. Black soil belongs to the Deccan trap, and Maharashtra has the largest area of it.",
        },
      ],
    },
  ],
};
