import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GCL_ATMOSPHERE_NOTE: SubtopicNote = {
  subtopicName: "Atmosphere and Temperature",
  title: "Atmosphere and Temperature",
  oneLineDefinition:
    "What the air is made of, the layers of the atmosphere and what happens in each, auroras, and the words used for daily and city temperatures.",
  whyItMatters:
    "Twelve questions in the bank, and nine of them come from the 2025 shifts: the layers of the atmosphere were a new favourite in 2025. Each one pairs a layer with what happens in it, so learn the five layers in order with one fact each.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgclat-layers",
      name: "Layers and composition of the atmosphere",
      intuition:
        "The air is mostly nitrogen and oxygen, and it is stacked in layers. Each layer is known for one thing: weather, ozone, burning meteors, or orbiting satellites. Learn the layers bottom to top with that one thing.",
      definition:
        "Composition of dry air: **nitrogen 78%**, **oxygen 21%**, argon about 0.93%, and a little carbon dioxide.\n\n" +
        "The layers, from the ground up:\n" +
        "- **Troposphere**: almost all **weather and clouds**.\n" +
        "- **Stratosphere**: the **ozone layer**, which absorbs the Sun's **ultraviolet** rays.\n" +
        "- **Mesosphere**: **meteors** burn up here.\n" +
        "- **Thermosphere**: heated by the Sun's ultraviolet and **X-rays**, more so in solar storms; the **International Space Station** orbits here.\n" +
        "- **Exosphere**: the thin outer edge.\n\n" +
        "The **Karman line**, about **100 km** up, is taken as the edge of space. **Auroras** near the poles come from the **solar wind** meeting the Earth's **magnetic field**.",
      table: {
        columns: ["Layer", "Known for"],
        rows: [
          { cells: ["Troposphere", "Weather and clouds"] },
          { cells: ["Stratosphere", "Ozone layer"], pyqExampleId: "5ea817a5-ca7a-464e-b52a-1a61827c5abc" },
          { cells: ["Mesosphere", "Meteors burn up"], pyqExampleId: "4e6d3a3d-8198-46e9-bdf8-cd2671e9446b" },
          { cells: ["Thermosphere", "Heated by UV and X-rays; the ISS"], pyqExampleId: "192ec585-fa16-4e02-9349-f927aa8e4df4" },
          { cells: ["Exosphere", "Outermost layer"] },
        ],
      },
      pyqExampleId: "0ee37c60-f2b8-47d7-b524-343c0cf06bb7",
      selfCheckExample: {
        prompt: "Which two gases make up nearly all of the air near the ground, and in what shares?",
        steps: ["Nitrogen is about 78% of dry air.", "Oxygen is about 21%."],
        answer: "Nitrogen (78%) and oxygen (21%).",
      },
      practiceSet: [
        { prompt: "Which radiation does the ozone layer absorb?", answer: "Ultraviolet" },
        { prompt: "In which layer do meteors burn up?", answer: "The mesosphere" },
        { prompt: "About how high is the Karman line?", answer: "About 100 km" },
        { prompt: "What causes auroras?", answer: "The solar wind meeting the Earth's magnetic field" },
      ],
      traps: [
        {
          title: "Clouds are in the troposphere",
          body: "Clouds and weather belong to the **troposphere**, the lowest layer. A pair matching clouds with the exosphere is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgclat-temperature",
      name: "Temperature words",
      intuition:
        "A few temperature terms come up: the daily swing, why cities are hotter, and why the tropical south keeps an even temperature. Learn each with its cause.",
      definition:
        "The terms:\n" +
        "- **Diurnal range**: the difference between the day's highest and lowest temperature. The **annual range** compares the warmest and coldest months.\n" +
        "- **Urban heat island**: a city is hotter than the land around it because **concrete** and asphalt store heat, there is little **vegetation**, and **vehicles** add heat.\n" +
        "- **Southern India** lies in the tropics with sea on three sides, so its range of temperature is **small**. Coastal places have the smallest ranges.\n" +
        "- **Al Aziziyah** (Libya) recorded **58 °C** in 1922, long quoted as the world's highest shade temperature.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Diurnal range", "Day's highest minus lowest temperature"], pyqExampleId: "70983e7f-8e1a-4df3-8026-2c17b0a7c16a" },
          { cells: ["Annual range", "Warmest month minus coldest month"] },
          { cells: ["Urban heat island", "City warmer than its surroundings"] },
          { cells: ["Al Aziziyah, 1922", "58 °C"], pyqExampleId: "b118883f-dc7f-41f5-a199-418d8ed38a8f" },
        ],
      },
      pyqExampleId: "a86759ca-925f-471c-92a3-780dcc878db6",
      selfCheckExample: {
        prompt: "A town records 34 °C at 2 pm and 22 °C at 5 am. What is its diurnal range?",
        steps: ["The diurnal range is the day's highest minus its lowest temperature.", "34 minus 22 is 12."],
        answer: "12 °C.",
      },
      practiceSet: [
        { prompt: "What is the difference between a day's highest and lowest temperature called?", answer: "The diurnal range" },
        { prompt: "Name two causes of an urban heat island.", answer: "Concrete that stores heat, little vegetation, vehicle heat (any two)" },
        { prompt: "Is the temperature range in southern India large or small?", answer: "Small" },
      ],
      traps: [
        {
          title: "The tropical south has an even temperature",
          body: "Because of the sea and its tropical place, southern India has a **small** range. Statements calling it high are false.",
        },
      ],
    },
  ],
};
