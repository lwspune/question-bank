import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GES_LANDFORMS_NOTE: SubtopicNote = {
  subtopicName: "Landforms, Weathering and Mass Movements",
  title: "Landforms, Weathering and Mass Movements",
  oneLineDefinition:
    "How rock breaks up in place, how it slides downhill, and the landforms made by glaciers, rivers, wind and water in limestone caves.",
  whyItMatters:
    "Eleven questions in the bank, and nine of them come from the 2025 shifts. Those papers asked which landform belongs to which agent, and how the cave features differ, so learn each landform with the agent that makes it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgeslf-weathering",
      name: "Weathering and mass movements",
      intuition:
        "Rock first breaks up where it stands (weathering), then gravity carries the pieces downhill (mass movement). The different slides are told apart by how deep they go and how they move.",
      definition:
        "Weathering:\n" +
        "- The breaking down of rock **in place**, by **physical** disintegration or **chemical** decomposition.\n" +
        "- **Exfoliation**, the peeling off of curved sheets of rock as it heats and cools, is **physical** weathering.\n\n" +
        "Mass movements:\n" +
        "- **Slump**: a block slips with a **backward rotation**.\n" +
        "- **Rockslide**: rock slides down a slope, involving material to a **considerable depth**.\n" +
        "- **Rock fall**: pieces fall freely from the **surface** layers of a rock face.",
      table: {
        columns: ["Process", "Mark of it"],
        rows: [
          { cells: ["Exfoliation", "Physical weathering"], pyqExampleId: "4ae08425-7477-40d6-b84b-80dddae6fc40" },
          { cells: ["Slump", "Backward rotation"] },
          { cells: ["Rockslide", "Affects rock to a considerable depth"], pyqExampleId: "ca7ba655-2844-4cd7-84ff-0ce6a4406ba8" },
          { cells: ["Rock fall", "Free fall from surface layers"] },
        ],
      },
      pyqExampleId: "bf621b7e-c023-48d6-98e1-8999ee9aa0d5",
      selfCheckExample: {
        prompt: "How does a rock fall differ from a rockslide?",
        steps: ["A rock fall drops pieces from the surface layers of a rock face.", "A rockslide moves rock that goes to a considerable depth."],
        answer: "A rock fall is shallow and falls freely; a rockslide is deep.",
      },
      practiceSet: [
        { prompt: "What is the breakdown of rock in place called?", answer: "Weathering" },
        { prompt: "Is exfoliation physical or chemical weathering?", answer: "Physical" },
        { prompt: "Which landslide involves a backward rotation?", answer: "A slump" },
      ],
      traps: [
        {
          title: "Rotation means slump",
          body: "Only a **slump** rotates backward. A statement giving rotation to a **rockslide** is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgeslf-landforms",
      name: "Landforms by agent",
      intuition:
        "Ice, rivers, wind and dripping water each carve and build their own shapes. Sort every landform by its agent and the questions become simple.",
      definition:
        "Ice (glaciers):\n" +
        "- A tributary glacier cuts less deep, so its valley is left as a **hanging valley** high above the main valley; the ridges between are cut back into triangular **truncated spurs**.\n" +
        "- **Till** is an **unsorted** mix of clay, sand and boulders dropped straight from ice.\n\n" +
        "Rivers: on flat land a river erodes **sideways** and forms **meanders**. Floods build raised banks, **natural levees**, along large rivers.\n\n" +
        "Wind (deserts): **mushroom rocks**, flat-topped mesas and buttes, and rock **pedestals**.\n\n" +
        "Limestone caves:\n" +
        "- A **stalactite** hangs **down** from the roof.\n" +
        "- A **stalagmite** rises **up** from the floor where water drips.\n" +
        "- When the two meet they form a **pillar**.",
      table: {
        columns: ["Landform", "Agent"],
        rows: [
          { cells: ["Hanging valley", "Glacier"], pyqExampleId: "028169c4-f94b-4ff1-9b43-3e0968022c01" },
          { cells: ["Meander", "River on flat land"], pyqExampleId: "6da2393d-aee5-405a-b539-428ec309101e" },
          { cells: ["Natural levee", "River floods"], pyqExampleId: "fdc970dc-abf2-467b-abeb-db06e03b1247" },
          { cells: ["Mushroom rock", "Wind"], pyqExampleId: "7d7d3f57-7875-4040-95ad-9b71aabad6b2" },
          { cells: ["Stalagmite", "Dripping water, rising from the floor"], pyqExampleId: "d4198ce2-3e5f-48da-993c-ee15d92dfe87" },
        ],
      },
      pyqExampleId: "fb3bac17-ae71-4deb-b315-17d02410ab3e",
      selfCheckExample: {
        prompt: "A stalactite and a stalagmite grow until they meet. Which one hangs, which one rises, and what do they form together?",
        steps: ["The stalactite hangs from the roof; the stalagmite rises from the floor.", "Where they join, they form a pillar."],
        answer: "Stalactite hangs, stalagmite rises; together a pillar.",
      },
      practiceSet: [
        { prompt: "What is till?", answer: "An unsorted mix of material dropped by ice" },
        { prompt: "What makes a river form meanders?", answer: "Sideways erosion on flat land" },
        { prompt: "Where are natural levees found?", answer: "On the floodplains of large rivers" },
      ],
      traps: [
        {
          title: "Stalactite down, stalagmite up",
          body: "A **stalactite** hangs from the **roof**; a **stalagmite** rises from the **floor**. Pairs that swap them are wrong.",
        },
      ],
    },
  ],
};
