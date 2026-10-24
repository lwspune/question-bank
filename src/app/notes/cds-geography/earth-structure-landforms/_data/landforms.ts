import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EA_LANDFORMS_NOTE: SubtopicNote = {
  subtopicName: "Landforms of Rivers, Ice, Wind and Sea",
  title: "Landforms of Rivers, Ice, Wind and Sea",
  oneLineDefinition:
    "The shapes that running water, glaciers, frost, wind, waves and groundwater carve and build, sorted by the agent that makes them.",
  whyItMatters:
    "Fifteen questions, and seven of them are HARD, more than on any other page of this chapter. Most hand you a landform and ask which agent made it, so learn every landform with its agent beside it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeea-drainage",
      name: "Drainage patterns and kinds of stream",
      intuition:
        "Seen from above, a river and its tributaries make a pattern, and the pattern tells you about the rock and the slope underneath. " +
        "Uniform rock lets streams branch freely like a tree; folded rock lines them up; a dome sends them outward and a basin pulls them inward.",
      definition:
        "Patterns:\n" +
        "- **Dendritic**: like the **veins of a leaf**, tributaries joining at **acute angles**. Forms on **uniform rock** and a **regular slope**. The **most common** pattern.\n" +
        "- **Trellis**: main streams parallel, short tributaries joining at **right angles**. Forms on **folded** rock.\n" +
        "- **Rectangular**: streams bend at right angles along **joints and faults**.\n" +
        "- **Radial**: streams flow **outward** from a central high point, such as a volcano or dome (Amarkantak).\n" +
        "- **Centripetal**: streams flow **inward from all sides** into a **lake or depression** (Loktak Lake).\n" +
        "Kinds of stream:\n" +
        "- **Consequent**: follows the **original slope** of the land.\n" +
        "- **Subsequent**: follows lines of **weak rock structure**.\n" +
        "- **Resequent**: flows the **same way as the consequent** stream but at a **lower level**.\n" +
        "- **Obsequent**: flows **opposite** to the consequent stream.\n" +
        "- **Insequent**: has **no clear reason** for the path it takes.",
      table: {
        columns: ["Pattern or stream", "What it looks like or follows"],
        rows: [
          {
            cells: ["Dendritic", "Leaf veins; uniform rock; the most common pattern"],
            pyqExampleId: "f7a7227b-bdc7-4970-8db2-a6826b3f39bc",
          },
          { cells: ["Trellis", "Parallel main streams, tributaries at right angles; folded rock"] },
          { cells: ["Radial", "Outward from a dome or volcano"] },
          {
            cells: ["Centripetal", "Inward from all sides into a lake or basin"],
            noteAmber: "CDS 2021 (I): rivers draining from all directions into a lake make a centripetal pattern.",
            pyqExampleId: "73c3ee4a-9f50-4c97-8f9c-ce911023d788",
          },
          { cells: ["Consequent stream", "The original slope of the land"] },
          { cells: ["Subsequent stream", "Lines of weak rock structure"] },
          { cells: ["Resequent stream", "Same direction as the consequent, at a lower level"] },
          { cells: ["Insequent stream", "No apparent reason for its path"] },
        ],
      },
      pyqExampleId: "8cf18fcd-8597-4c09-8d28-31dbc0308b4d",
      selfCheckExample: {
        prompt: "Streams flow outward in every direction from the top of a volcanic cone. What drainage pattern is this, and what is its opposite?",
        steps: [
          "Streams running outward from a central high point form a radial pattern.",
          "The reverse, streams running inward from all sides into a low basin, is centripetal.",
        ],
        answer: "Radial; its opposite is centripetal.",
      },
      practiceSet: [
        { prompt: "Which drainage pattern forms on folded rock, with tributaries meeting at right angles?", answer: "Trellis" },
        { prompt: "Which pattern is the most common of all drainage patterns?", answer: "Dendritic" },
        { prompt: "Streams bend at sharp right angles along joints and faults. Which pattern is this?", answer: "Rectangular" },
      ],
      traps: [
        {
          title: "Radial goes out, centripetal comes in",
          body: "**Radial** streams flow **outward** from a high centre. **Centripetal** streams flow **inward** from all sides into a lake or depression.",
        },
        {
          title: "Resequent is not the same as obsequent",
          body: "A **resequent** stream flows the **same** way as the consequent stream, only lower down. An **obsequent** stream flows the **opposite** way.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-river",
      name: "River landforms and rejuvenation",
      intuition:
        "A young river cuts down hard and makes deep, narrow valleys. A mature river swings from side to side across a wide floodplain. " +
        "If the land is lifted, the river gets new energy and starts cutting down again; geographers call that rejuvenation, and it leaves its own landforms.",
      definition:
        "Landforms by stage:\n" +
        "- **Youth**: **V-shaped valleys**, **gorges** (deep, steep-sided) and **canyons** (deep, with step-like sides), waterfalls and rapids.\n" +
        "- **Maturity**: **meanders** (looping bends), a wide **floodplain**, **braided** channels where the river splits around bars.\n" +
        "- **Old age**: **oxbow lakes**, natural **levees**, **deltas**.\n" +
        "- A **meander** is a loop-shaped bend. The outer bank is eroded and the inner bank built up. A very tight meander is a **gooseneck**; a flood can cut through its neck and leave an **oxbow lake**.\n" +
        "- **Rejuvenation**: uplift of the land (or a fall in sea level) makes the river cut down again. It gives **incised** or **entrenched meanders**, **knick points** and **river terraces**.\n" +
        "- **River terraces** are flat steps marking **old valley floors or floodplain levels**. They may be bare **bedrock** or covered with **alluvium**, and they are made by the river **cutting down** (erosion).\n" +
        "- A **wind gap** is a dry notch in a ridge where a river once flowed before it was captured. Despite its name it is made by a **river**, not by wind.",
      table: {
        columns: ["Landform", "Made by", "Stage or cause"],
        rows: [
          { cells: ["Gorge and canyon", "River cutting down", "Youth"] },
          {
            cells: ["Meander and gooseneck", "River swinging sideways", "Maturity"],
            noteAmber: "CDS 2024 (I): all three statements about meanders, goosenecks and entrenched meanders were correct.",
            pyqExampleId: "363e7ace-1d31-4566-8441-c1b8c166b4c3",
          },
          { cells: ["Braided channel", "River splitting around sand bars", "Heavy load, gentle slope"] },
          { cells: ["Oxbow lake", "A meander cut off", "Old age"] },
          {
            cells: ["Incised meander", "River cutting down along old loops", "Rejuvenation after uplift"],
            noteAmber: "CDS 2018 (I): incised meanders belong to rejuvenation, not to the mature stage.",
            pyqExampleId: "f48483d1-957f-4232-a15e-976f8f5cd24c",
          },
          { cells: ["River terrace", "River cutting into its old floodplain", "Rejuvenation"] },
          { cells: ["Wind gap", "A river, later captured", "River capture"] },
        ],
      },
      pyqExampleId: "a25243d2-ffb5-4b57-965c-c2147f044fa3",
      selfCheckExample: {
        prompt: "A river that has been winding across a wide plain for ages suddenly starts cutting deep into its own loops. What has probably happened to the land?",
        steps: [
          "A river cuts down hard only when it gains energy.",
          "Uplift of the land, or a fall in sea level, gives it that energy.",
          "The loops it already had get cut deep into the rock.",
        ],
        answer: "The land has been uplifted (rejuvenation), giving incised or entrenched meanders.",
      },
      practiceSet: [
        { prompt: "What is a very tight meander called?", answer: "A gooseneck" },
        { prompt: "What kind of lake is left when a river cuts through the neck of a meander?", answer: "An oxbow lake" },
        { prompt: "What is the name for a river splitting into many channels around sand bars?", answer: "A braided channel" },
        { prompt: "Is a wind gap made by wind or by a river?", answer: "By a river" },
      ],
      traps: [
        {
          title: "Incised meanders mean rejuvenation",
          body: "Ordinary meanders belong to the mature stage. **Incised** meanders form only when uplift **rejuvenates** the river and it cuts down along its old loops.",
        },
        {
          title: "A wind gap is a river feature",
          body: "A wind gap is a dry gap in a ridge left by a river that was captured. Zeugen and dreikanter are the wind landforms.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-glacial",
      name: "Glacial and periglacial landforms",
      intuition:
        "A glacier is a river of ice. It scrapes its valley wide and deep, carves hollows at its head and drops heaps of rock where it melts. " +
        "Around the ice, in the frozen ground beyond it, frost makes a different set of landforms; geographers call that zone periglacial.",
      definition:
        "Glacial landforms:\n" +
        "- **Cirque**: an **armchair-shaped hollow** at the head of a glacial valley. A lake in it is a **tarn**.\n" +
        "- **Glacial trough**: a **U-shaped valley**. Alpine glaciers **strip the valley of its soil, regolith and sediment** to make it. Parts of its floor can be **flat**, where lake and outwash deposits **filled it in** after the ice left.\n" +
        "- **Fiord**: a glacial trough whose floor lies **below sea level**, so the sea **floods in** as the ice retreats (Norway).\n" +
        "- **Moraines**: ridges of rock debris dropped by the ice. **Eskers**: winding ridges of sand and gravel laid by meltwater. **Drumlins**: egg-shaped mounds.\n" +
        "Periglacial landforms (frozen ground near ice sheets):\n" +
        "- **Pingo**: an **ice-cored mound** pushed up through **permafrost**.\n" +
        "- **Patterned ground** and **solifluction lobes** also form here.",
      table: {
        columns: ["Landform", "Agent", "What it is"],
        rows: [
          {
            cells: ["Cirque", "Glacier", "Armchair-shaped hollow at the valley head"],
            noteAmber: "CDS 2020 (II): the cirque was the one that is not a fluvial landform.",
            pyqExampleId: "dc2098c0-12eb-4dc6-b1ce-44d59ae4d4e5",
          },
          {
            cells: ["Glacial trough", "Glacier", "U-shaped valley; flat parts come from later infilling"],
            pyqExampleId: "6888c937-cc92-4ea7-b6fa-01d207c9a700",
          },
          { cells: ["Fiord", "Glacier, then the sea", "Trough with its floor below sea level, flooded by the sea"] },
          { cells: ["Moraine", "Glacier", "Ridge of debris dropped by the ice"] },
          { cells: ["Esker", "Glacial meltwater", "Winding ridge of sand and gravel"] },
          { cells: ["Pingo", "Frost (periglacial)", "Ice-cored mound in permafrost"] },
        ],
      },
      pyqExampleId: "d90eed92-fa8a-402c-91ad-1442c9752e71",
      selfCheckExample: {
        prompt: "Why does a fiord form only where the floor of a glacial trough is below sea level?",
        steps: [
          "When the glacier melts back, the trough is left open at its seaward end.",
          "Water can flow in only if the trough floor is lower than the sea.",
        ],
        answer: "Only then can the sea flood the trough as the ice retreats, making a long, deep inlet.",
      },
      practiceSet: [
        { prompt: "What shape is a valley carved by a glacier?", answer: "U-shaped" },
        { prompt: "What is a lake in a cirque called?", answer: "A tarn" },
        { prompt: "What are the winding ridges of sand and gravel laid down by glacial meltwater called?", answer: "Eskers" },
      ],
      traps: [
        {
          title: "Flat trough floors are filled in, not ground flat",
          body: "A glacial trough can have flat stretches, but they come from **sediment filling it later**, not from the ice eroding evenly.",
        },
        {
          title: "A cirque is glacial, not fluvial",
          body: "Gorges, canyons and braided channels are made by rivers. A **cirque** is carved by a **glacier**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-wind-coast",
      name: "Wind, coastal and limestone landforms",
      intuition:
        "In deserts the wind throws sand at rock and sculpts it from the bottom up, because the sand stays low. " +
        "On coasts the waves cut cliffs and arches and lay down sand bars. In limestone country, water dissolves the rock and the land sinks into holes.",
      definition:
        "Wind (aeolian) and desert landforms:\n" +
        "- **Zeugen**: a **table of hard rock** standing on a softer base, left after wind cut away the soft layers.\n" +
        "- **Yardang**: a long ridge of rock cut by wind, lying along the wind's direction.\n" +
        "- **Mushroom rock** or **demoiselle**: a rock with a narrow stem, worn at the base by blown sand.\n" +
        "- **Dreikanter**: a stone with **three faces** polished by wind.\n" +
        "- **Inselberg**: a lone **residual hill** on a desert plain. **Playa**: a flat, dry lake bed in a basin. **Bajada**: a gentle apron of joined **alluvial fans** at the foot of a desert mountain.\n" +
        "Coastal landforms:\n" +
        "- Wave erosion makes **cliffs**, **arches** and **stacks** (a pillar of rock left standing in the sea).\n" +
        "- **Barrier islands** are long, narrow ridges of **sand** lying **close to and along the shore**, cut off from the mainland by **lagoons** or marshes. Storms and hurricanes easily wash over them, so they are risky places to build.\n" +
        "Limestone (karst) landforms:\n" +
        "- The **sinkhole** (doline) is the **most common** karst landform: a hollow from under a metre to a few hundred metres deep, made by limestone dissolving.\n" +
        "- Also caves, **stalactites** (hanging) and **stalagmites** (rising).",
      table: {
        columns: ["Landform", "Agent", "What it is"],
        rows: [
          { cells: ["Zeugen", "Wind", "Table of hard rock on a softer base"] },
          {
            cells: ["Dreikanter and demoiselle", "Wind", "Three-faced stone; rock pillar worn at the base"],
            noteAmber: "CDS 2016 (II): the wind gap was the one NOT related to wind erosion.",
            pyqExampleId: "7eadbe23-535b-4b85-911c-844a510cde2b",
          },
          { cells: ["Inselberg", "Weathering and wind in deserts", "Lone residual hill"] },
          { cells: ["Bajada", "Desert streams", "Apron of joined alluvial fans"] },
          { cells: ["Stack", "Sea waves", "Rock pillar left standing off a cliff"] },
          { cells: ["Barrier island", "Waves and currents", "Narrow sand island along the shore, behind it a lagoon"] },
          {
            cells: ["Sinkhole", "Groundwater dissolving limestone", "The commonest karst hollow"],
            pyqExampleId: "4e7d2d48-dfe1-436c-bd18-a5d1754c336f",
          },
        ],
      },
      pyqExampleId: "e1559864-9d26-4216-baa7-d061f78b79ae",
      selfCheckExample: {
        prompt: "Why are wind-cut desert rocks often narrow at the bottom and wide at the top?",
        steps: [
          "Wind can lift sand only a metre or two above the ground.",
          "So the blowing sand wears away the base of a rock far more than its top.",
        ],
        answer: "Wind-blown sand stays low, so it cuts the base most, leaving mushroom rocks and pillars.",
      },
      practiceSet: [
        { prompt: "What is a stone with three faces polished by wind called?", answer: "A dreikanter" },
        { prompt: "Which is the most common landform of limestone (karst) country?", answer: "The sinkhole" },
        { prompt: "What separates a barrier island from the mainland?", answer: "A lagoon or marsh" },
        { prompt: "What is a lone residual hill rising from a desert plain called?", answer: "An inselberg" },
      ],
      traps: [
        {
          title: "Barrier islands lie close to the shore",
          body: "Barrier islands are long, narrow sand ridges lying **close to and parallel with** the coast, not far out to sea.",
        },
        {
          title: "Stalactites hang, stalagmites rise",
          body: "Stalac**t**ites hang from the **t**op of a cave. Stalag**m**ites grow up from the floor (the **m** is for mound).",
        },
      ],
    },
  ],
};
