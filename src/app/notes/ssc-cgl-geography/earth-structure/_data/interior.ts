import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GES_INTERIOR_NOTE: SubtopicNote = {
  subtopicName: "Earth's Interior, Rocks and Earthquakes",
  title: "Earth's Interior, Rocks and Earthquakes",
  oneLineDefinition:
    "The Earth's layers from crust to core, the plates and their boundaries, the three kinds of rock with their examples, and the words for recording an earthquake.",
  whyItMatters:
    "Fifteen questions in the bank: nine from the 2023 shifts, five from the 2024 shifts and one from the 2025 shifts, 12 of them EASY. They ask an order (crust, mantle, core), a name (asthenosphere, seismogram) or a rock type, so learn the layers and the three rock types first.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgesin-layers",
      name: "Layers and plates",
      intuition:
        "The Earth is layered like an egg: a thin shell, a thick middle and a hot centre. The outer shell is broken into plates that move on a soft layer beneath them, and what happens at their edges depends on which way they move.",
      definition:
        "Layers, from the outside in:\n" +
        "- **Crust**: the thin outer layer. **Mantle**: between crust and core. **Core**: outer (liquid) and inner (solid).\n" +
        "- The **lithosphere** is the rigid outer part: the crust and the top of the mantle.\n" +
        "- The **asthenosphere** is the weak, partly molten upper mantle below it, on which the plates move.\n" +
        "- The Earth's inner heat comes from **radioactive decay** (radiogenic heat) and heat left from its **formation** (primordial heat).\n\n" +
        "Plates:\n" +
        "- The **Pacific plate** is the largest.\n" +
        "- Plates **move apart** at **divergent** boundaries (mid-ocean ridges), **collide** at **convergent** ones (the Mariana Trench) and **slide past** at **transform** ones (the San Andreas Fault).",
      table: {
        columns: ["Feature", "Plate boundary"],
        rows: [
          { cells: ["Mid-ocean ridge", "Divergent"] },
          { cells: ["Mariana Trench", "Convergent"] },
          { cells: ["San Andreas Fault", "Transform"] },
        ],
      },
      pyqExampleId: "db52f251-b7ec-451b-ad31-1d01022c1482",
      selfCheckExample: {
        prompt: "Name the Earth's three main layers from the outside in, and the soft layer the plates move on.",
        steps: ["From the outside in: crust, mantle, core.", "The plates move on the asthenosphere, the partly molten upper mantle."],
        answer: "Crust, mantle, core; the asthenosphere.",
      },
      practiceSet: [
        { prompt: "Which layer separates the crust from the core?", answer: "The mantle" },
        { prompt: "Which is the largest tectonic plate?", answer: "The Pacific plate" },
        { prompt: "What are the two main sources of the Earth's internal heat?", answer: "Radiogenic heat and primordial heat" },
        { prompt: "What is the rigid outer part of the Earth called?", answer: "The lithosphere" },
      ],
      traps: [
        {
          title: "Stratosphere and mesosphere are in the air",
          body: "Options such as **stratosphere** or **mesosphere** for a layer of the solid Earth are wrong: those are layers of the atmosphere.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgesin-rocks",
      name: "Rocks and earthquake records",
      intuition:
        "Every rock forms in one of three ways: from cooled melt, from laid-down sediment, or from older rock changed by heat and pressure. Earthquake words differ by one syllable, so learn which is the machine and which is the record.",
      definition:
        "The three rock types:\n" +
        "- **Igneous**: from cooled magma or lava. **Granite** is igneous (quartz, feldspar, a little mica) and the commonest rock of the continental crust.\n" +
        "- **Sedimentary**: from laid-down and cemented material. Some form from salts that **precipitate** out of water, such as **halite** (rock salt), left when sea water evaporates.\n" +
        "- **Metamorphic**: older rock changed by deep heat and pressure.\n" +
        "- **Hornblende**, an amphibole mineral, is crushed for **roads and railway ballast**.\n\n" +
        "Earthquakes: a **seismograph** is the instrument; the record it makes is a **seismogram**; **seismology** is the science.",
      table: {
        columns: ["Rock or word", "What it is"],
        rows: [
          { cells: ["Granite", "Igneous rock"], pyqExampleId: "692ad2c0-9988-484f-9a70-c65fba1b6ff7" },
          { cells: ["Halite", "Rock salt, an evaporite"], pyqExampleId: "41850a22-ef9b-4138-88a2-332a84321289" },
          { cells: ["Hornblende", "Mineral for road and rail ballast"], pyqExampleId: "5b968902-da4a-40a8-968c-bc07577c2af6" },
          { cells: ["Seismograph", "Instrument that records earthquakes"], pyqExampleId: "76eff3c4-6aa3-4d57-9f48-941a00ee5f97" },
          { cells: ["Seismogram", "The record it makes"] },
        ],
      },
      pyqExampleId: "632467d2-fb2d-4a5a-9ddf-013fefa81f54",
      selfCheckExample: {
        prompt: "Which of these is NOT a type of rock: igneous, trace, metamorphic, sedimentary?",
        steps: ["Rocks are of three types: igneous, sedimentary and metamorphic.", "There is no such type as trace rock."],
        answer: "Trace rock.",
      },
      practiceSet: [
        { prompt: "Is granite igneous or sedimentary?", answer: "Igneous" },
        { prompt: "What is halite better known as?", answer: "Rock salt" },
        { prompt: "What does a seismograph measure?", answer: "Earthquakes" },
      ],
      traps: [
        {
          title: "Seismograph makes, seismogram is made",
          body: "The **seismograph** is the machine; the **seismogram** is its record. SSC asks for the record and offers the machine.",
        },
      ],
    },
  ],
};
