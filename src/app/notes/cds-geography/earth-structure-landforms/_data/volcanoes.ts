import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EA_VOLCANOES_NOTE: SubtopicNote = {
  subtopicName: "Volcanoes, Rocks and Minerals",
  title: "Volcanoes, Rocks and Minerals",
  oneLineDefinition:
    "How lava shapes a volcano, where the world's volcanoes stand, the three families of rock and the minerals they are built from.",
  whyItMatters:
    "Eleven questions, three of them from CDS 2026 (I) alone. The paper likes statement questions here, so the facts that decide them (thin lava builds wide shields, basalt is extrusive, ortho means igneous parent) are worth learning exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeea-volcano-types",
      name: "Kinds of volcano and cone",
      intuition:
        "The shape of a volcano depends on how runny its lava is. Runny basic lava spreads far in thin sheets and builds a wide, gentle dome. " +
        "Thick, sticky acid lava hardens close to the vent and builds a tall, steep cone.",
      definition:
        "The main kinds:\n" +
        "- **Shield volcano**: built of **thin, runny basaltic lava flows** piled up over a long time. Broad with **gentle slopes**. NCERT calls shields the **largest** volcanoes on Earth; the **Hawaiian** volcanoes are the classic examples.\n" +
        "- **Acid lava cone**: **viscous**, silica-rich lava moves only a short way, so the cone is **high with steep slopes**.\n" +
        "- **Composite cone** or **stratovolcano**: layers of lava and ash, one on top of another. These are the **highest** volcanic cones. Fuji, Mayon and Vesuvius are examples.\n" +
        "- **Cinder cone**: a small cone of loose ash and cinders.\n" +
        "- The **Volcanic Explosivity Index (VEI)** grades how strong an eruption is.\n" +
        "- Weathered lava gives **deep, fertile soils**, so volcanic slopes are often farmed intensively.",
      table: {
        columns: ["Kind", "Lava", "Shape", "Example"],
        rows: [
          { cells: ["Shield volcano", "Thin, runny basalt", "Broad, gentle slopes", "Mauna Loa, Hawaii"] },
          {
            cells: ["Acid lava cone", "Viscous, silica-rich", "High, steep slopes", "Lava domes such as Lassen Peak, USA"],
            noteAmber: "CDS 2026 (I): 'viscous lava travels long distances' was the false statement.",
            pyqExampleId: "e7be9d3d-06e0-48e3-8817-7f0275b57fea",
          },
          { cells: ["Composite cone (stratovolcano)", "Lava and ash in layers", "The highest cones", "Fuji, Mayon, Vesuvius"] },
          { cells: ["Cinder cone", "Mostly ash and cinders", "Small, steep", "Paricutin, Mexico"] },
          {
            cells: ["Volcanic Explosivity Index", "Not a lava type", "A scale for eruption strength", "Used for any volcano"],
            pyqExampleId: "ba1243c2-c4d0-477d-8248-5c49406d89fa",
          },
        ],
      },
      pyqExampleId: "0a821bcd-b75a-43b6-9b03-e9bb34ba4f35",
      selfCheckExample: {
        prompt: "Two volcanoes erupt. Volcano X pours out silica-rich, sticky lava; volcano Y pours out runny basalt. Which one builds a steep cone, and why?",
        steps: [
          "Sticky (viscous) lava cannot flow far before it cools.",
          "So it piles up close to the vent and makes steep sides.",
        ],
        answer: "Volcano X builds the steep cone, because viscous lava hardens near the vent.",
      },
      practiceSet: [
        { prompt: "Which kind of volcanic cone is the highest?", answer: "The composite cone (stratovolcano)" },
        { prompt: "What does the Volcanic Explosivity Index grade?", answer: "How strong an eruption is" },
        { prompt: "Why are the soils on old lava slopes often farmed intensively?", answer: "Weathered lava gives deep, fertile soils" },
        { prompt: "Is silica-rich acid lava runny or viscous?", answer: "Viscous" },
      ],
      traps: [
        {
          title: "Viscous lava does not travel far",
          body: "High viscosity means **low** mobility. Sticky acid lava stays near the vent and builds steep cones; it is runny basalt that spreads for long distances.",
        },
        {
          title: "Largest and highest are different",
          body: "NCERT calls **shield** volcanoes the largest (they are very broad). The **composite** cones rise highest and steepest.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-volcano-belts",
      name: "Where the volcanoes are",
      intuition:
        "Volcanoes grow where magma can reach the surface: where one plate sinks under another, where plates pull apart, and over hot spots. " +
        "Where two continents simply crash together, as in the Himalayas, no magma is made, so there are no volcanoes.",
      definition:
        "The settings:\n" +
        "- **Arc volcanoes** stand above **subduction zones**, at **convergent** boundaries where one plate sinks under another. Most are steep **stratovolcanoes**: **Fuji** (Japan), **Mayon** (Philippines), and **Ojos del Salado** in the Chilean Andes, the **highest volcano on Earth**.\n" +
        "- The **Pacific Ring of Fire** circles the Pacific: the Andes, Rockies, Alaska, Japan, the Philippines and Indonesia.\n" +
        "- At **divergent** boundaries magma wells up between plates. **Iceland** sits on the **Mid-Atlantic Ridge**.\n" +
        "- **Hot spots** feed volcanoes in the middle of a plate, as in **Hawaii**.\n" +
        "- The **Himalayas** are **fold mountains** from a continent-continent collision, so they have **no extrusive volcanoes**.",
      table: {
        columns: ["Volcano or area", "Country or region", "Setting"],
        rows: [
          { cells: ["Mount Merapi", "Java, Indonesia", "Subduction arc"] },
          { cells: ["Sakurajima", "Kyushu, Japan", "Subduction arc"] },
          { cells: ["Mount Vesuvius", "Bay of Naples, Italy", "Composite volcano"] },
          { cells: ["Mauna Loa", "Hawaii, USA", "Hot-spot shield volcano"] },
          {
            cells: ["Fuji and Mayon", "Japan and the Philippines", "Arc stratovolcanoes"],
            noteAmber: "CDS 2024 (II): arc volcanoes lie at convergent boundaries, not divergent ones.",
            pyqExampleId: "16b6c1a3-56f4-46a5-95e6-fa41be5c71fe",
          },
          {
            cells: ["Himalayas", "India, Nepal, Tibet", "Continent-continent collision, no volcanoes"],
            pyqExampleId: "f0f6bd2a-9cea-4a36-b54a-83ee923f2e41",
          },
          { cells: ["Iceland", "North Atlantic", "Mid-Atlantic Ridge, divergent"] },
        ],
      },
      pyqExampleId: "87381365-523f-4ea6-b6d9-76adad31b440",
      selfCheckExample: {
        prompt: "The Andes have many active volcanoes but the Himalayas have none. Both are young mountains. Why the difference?",
        steps: [
          "In the Andes the oceanic Nazca plate sinks under South America. The sinking plate melts and makes magma.",
          "In the Himalayas two continental plates collide. Neither sinks deep enough to melt, so no magma rises.",
        ],
        answer: "The Andes stand over a subduction zone; the Himalayas come from a collision of two continents, which makes no magma.",
      },
      practiceSet: [
        { prompt: "Which is the highest volcano on Earth?", answer: "Ojos del Salado, in the Chilean Andes" },
        { prompt: "On which ridge does Iceland sit?", answer: "The Mid-Atlantic Ridge" },
        { prompt: "What feeds the volcanoes of Hawaii, far from any plate edge?", answer: "A hot spot" },
        { prompt: "At which kind of plate boundary do arc volcanoes form?", answer: "Convergent (subduction) boundaries" },
      ],
      traps: [
        {
          title: "Not every great range has volcanoes",
          body: "The Andes, Rockies and Alaska ranges lie on the Ring of Fire. The **Himalayas** are fold mountains from a collision and carry **no** extrusive volcanoes.",
        },
        {
          title: "Arc volcanoes are not at divergent edges",
          body: "Arc volcanoes form where plates **converge** and one sinks under the other. Divergent edges give ridges such as the one under Iceland.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-rocks",
      name: "Igneous, sedimentary and metamorphic rocks",
      intuition:
        "Every rock starts as one of three things: cooled magma, settled sediment, or an older rock changed by heat and pressure. " +
        "Ask how a rock was born and you know its family.",
      definition:
        "The three families:\n" +
        "- **Igneous** rocks form from cooling **magma** or lava. Slow cooling deep down gives **coarse** grains (**intrusive**, such as **granite**). Fast cooling at the surface gives **fine** grains (**extrusive**, such as **basalt**). **Most of their minerals are silicates**.\n" +
        "- **Sedimentary** rocks form from layers of sediment pressed and cemented together (**lithification**). **Mechanically** formed ones are made of carried grains: **sandstone**, **conglomerate**, **shale**, **loess**. **Chemically** formed ones are precipitated from water: **geyserite**, **halite**, rock salt. **Organically** formed ones come from living things: coal, chalk.\n" +
        "- **Metamorphic** rocks are older rocks changed by heat or pressure: limestone to **marble**, sandstone to **quartzite**, shale to **slate**, granite to **gneiss**.\n" +
        "- **Ortho**-metamorphic rocks come from **igneous** rocks; **para**-metamorphic rocks come from **sedimentary** rocks.\n" +
        "- Heat from an intruding magma gives **contact (thermal)** metamorphism. Pressure and shearing from moving rock give **dynamic** metamorphism.",
      table: {
        columns: ["Family", "How it forms", "Examples"],
        rows: [
          {
            cells: ["Igneous, intrusive", "Magma cools slowly underground, coarse grains", "Granite, gabbro"],
            noteAmber: "CDS 2021 (I): granite was the igneous rock; marble, halite and shale were not.",
            pyqExampleId: "62d402c1-a992-430f-941e-77681702a90d",
          },
          {
            cells: ["Igneous, extrusive", "Lava cools fast at the surface, fine grains", "Basalt"],
            pyqExampleId: "e63d4015-11e1-4f6b-893b-25b887842bea",
          },
          { cells: ["Sedimentary, mechanical", "Carried grains pressed together", "Sandstone, conglomerate, shale, loess"] },
          {
            cells: ["Sedimentary, chemical", "Precipitated from water", "Geyserite, halite"],
            noteAmber: "CDS 2022 (II): geyserite was the one NOT formed mechanically.",
            pyqExampleId: "b43431f4-74aa-4c9b-9177-4df6f05136e5",
          },
          { cells: ["Sedimentary, organic", "Remains of plants and animals", "Coal, chalk"] },
          { cells: ["Metamorphic", "Older rock changed by heat or pressure", "Marble, quartzite, slate, gneiss"] },
        ],
      },
      pyqExampleId: "2d9bf3ef-6e2d-499e-b5b6-bd03d077aaf1",
      selfCheckExample: {
        prompt: "A rock has large, easily seen crystals of quartz and feldspar. Did it cool quickly at the surface or slowly underground?",
        steps: [
          "Large crystals need time to grow.",
          "Magma cools slowly only when it is deep underground.",
        ],
        answer: "Slowly underground. It is an intrusive igneous rock, such as granite.",
      },
      practiceSet: [
        { prompt: "Limestone changes into which metamorphic rock?", answer: "Marble" },
        { prompt: "Is basalt intrusive or extrusive?", answer: "Extrusive" },
        { prompt: "What is the process that turns loose sediment into sedimentary rock called?", answer: "Lithification" },
        { prompt: "Shale changes into which metamorphic rock?", answer: "Slate" },
      ],
      traps: [
        {
          title: "Deep cooling gives coarse grains, not fine",
          body: "Magma that cools **slowly** deep in the Earth grows **large** crystals. Fine grains come from lava that cools **fast** at the surface.",
        },
        {
          title: "Lithification belongs to sedimentary rocks",
          body: "Lithification is sediment being pressed and cemented into rock. Igneous rocks form by **cooling**, so an option saying extrusive igneous rocks undergo lithification is wrong.",
        },
        {
          title: "Heat from magma is contact metamorphism",
          body: "Rock baked by an intruding magma undergoes **contact** (thermal) metamorphism. **Dynamic** metamorphism comes from pressure and shearing.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-minerals",
      name: "Rock-forming minerals",
      intuition:
        "A rock is a mix of minerals, and a few silicate minerals make up most of the crust. " +
        "CDS gives three clues about one mineral and asks you to name it, so learn each one by its colour, its home rock and its elements.",
      definition:
        "The main ones (NCERT):\n" +
        "- **Feldspar**: silicon, oxygen, sodium, potassium, calcium and aluminium. About **half the crust**. Used in ceramics and glass.\n" +
        "- **Quartz**: silica. Hard, white or colourless. A main part of sand and granite.\n" +
        "- **Pyroxene**: calcium, aluminium, magnesium, iron and silica. Green or black. About **10%** of the crust; common in meteorites.\n" +
        "- **Amphibole**: aluminium, calcium, silica, iron and magnesium. Green or black; used in asbestos.\n" +
        "- **Mica**: potassium, aluminium, magnesium, iron and silica. Splits into thin sheets; used in electrical goods.\n" +
        "- **Olivine**: **magnesium, iron and silica**. **Usually a greenish crystal**, often found in **basaltic rocks**; used in jewellery.",
      table: {
        columns: ["Mineral", "Main elements", "Look and home", "Use"],
        rows: [
          { cells: ["Feldspar", "Si, O, Na, K, Ca, Al", "Light coloured; half the crust", "Ceramics, glass"] },
          { cells: ["Quartz", "Silica", "White or colourless, hard", "Radio and radar parts"] },
          { cells: ["Pyroxene", "Ca, Al, Mg, Fe, silica", "Green or black; in meteorites", "A major rock mineral"] },
          { cells: ["Amphibole", "Al, Ca, silica, Fe, Mg", "Green or black", "Asbestos"] },
          { cells: ["Mica", "K, Al, Mg, Fe, silica", "Thin sheets", "Electrical instruments"] },
          { cells: ["Olivine", "Mg, Fe, silica", "Greenish crystal in basalt", "Jewellery"] },
        ],
      },
      pyqExampleId: "0b1d0260-b648-4862-bbd6-0aa8bc0a4a8e",
      selfCheckExample: {
        prompt: "A mineral splits easily into thin, flat sheets and is used in electrical instruments. Name it.",
        steps: [
          "Splitting into thin sheets is the mark of mica.",
          "Its heat resistance and insulation make it useful in electrical goods.",
        ],
        answer: "Mica.",
      },
      practiceSet: [
        { prompt: "Which mineral makes up about half of the Earth's crust?", answer: "Feldspar" },
        { prompt: "Which mineral is used in asbestos?", answer: "Amphibole" },
        { prompt: "Which hard, white or colourless mineral is mostly silica?", answer: "Quartz" },
      ],
      traps: [
        {
          title: "Pyroxene and olivine are both green",
          body: "Pyroxene is green or black and also holds **calcium and aluminium**. **Olivine** is the greenish crystal of basalt made mainly of **magnesium, iron and silica**.",
        },
      ],
    },
  ],
};
