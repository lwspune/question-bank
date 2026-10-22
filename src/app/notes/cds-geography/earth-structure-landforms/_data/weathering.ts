import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EA_WEATHERING_NOTE: SubtopicNote = {
  subtopicName: "Weathering, Mass Movement and Soils",
  title: "Weathering, Mass Movement and Soils",
  oneLineDefinition:
    "How rock breaks down where it stands, how loose material slides downhill, and the soil orders that form from what is left.",
  whyItMatters:
    "Thirteen questions, six of them on soils. Histosols, entisols and vertisols have each been named in three different questions, so the soil orders table pays off more than any other here.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeea-physical",
      name: "Physical weathering",
      intuition:
        "Physical weathering breaks a rock into pieces without changing what it is made of. " +
        "Something pushes the rock apart from inside: ice in a crack, salt crystals in a pore, or the rock's own swelling and shrinking as it heats and cools.",
      definition:
        "The main kinds:\n" +
        "- **Frost weathering** (freeze-thaw): water in cracks freezes, expands by about 9% and wedges the rock apart. It needs pores and joints, so **compact, well consolidated rocks are least affected**.\n" +
        "- **Thermal stress**: hot days and cold nights make the outer layer expand and shrink. In **hot deserts** this **shatters** rocks into blocks.\n" +
        "- **Exfoliation**: curved sheets peel off the surface like onion skins. **Crystalline rocks** such as granite are prone to it.\n" +
        "- **Salt weathering**: salts in pores grow, swell or take up water. **Salt crystallisation** is the **most effective** of these, and it attacks **porous sedimentary rocks** (sandstone, limestone) more than dense **igneous** rocks.",
      table: {
        columns: ["Process", "What pushes the rock apart", "Where it is strongest"],
        rows: [
          { cells: ["Frost weathering", "Water freezing in cracks", "Cold regions with many freeze-thaw days"] },
          { cells: ["Thermal stress and shattering", "Daily heating and cooling", "Hot deserts"] },
          { cells: ["Exfoliation", "Outer layers expanding and peeling", "Crystalline rocks such as granite"] },
          {
            cells: ["Salt crystallisation", "Salt crystals growing in pores", "Porous sedimentary rocks, dry climates"],
            noteAmber: "CDS 2025 (I): both statements, most effective process and stronger on sedimentary rock, were correct.",
            pyqExampleId: "db9eab5e-c194-4aa5-8b46-c20c4893d07b",
          },
        ],
      },
      pyqExampleId: "49f823e2-baa5-4543-bdb5-59c16363b8e8",
      selfCheckExample: {
        prompt: "Why does growing salt break up sandstone faster than granite?",
        steps: [
          "Salt crystals do their damage by pressing on the walls of the pores they grow in.",
          "Sandstone is porous, so salt water soaks deep into it.",
          "Granite is dense and has few pores, so there is little room for crystals to grow.",
        ],
        answer: "Sandstone is porous; granite is dense, so salt crystals have far less space to grow in it.",
      },
      practiceSet: [
        { prompt: "By roughly how much does water expand when it freezes?", answer: "About 9%" },
        { prompt: "Which salt weathering process is the most effective?", answer: "Salt crystallisation" },
        { prompt: "Does physical weathering change the minerals of a rock?", answer: "No, it only breaks the rock into pieces" },
      ],
      traps: [
        {
          title: "Salt crystal growth is physical, not chemical",
          body: "Growing salt crystals **prise rock apart by pressure** without changing its minerals, so salt crystal growth is **physical** weathering.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-chemical",
      name: "Chemical weathering",
      intuition:
        "Chemical weathering changes the minerals themselves. Water, oxygen and weak acids react with the rock and turn its minerals into new, softer ones. " +
        "It works fastest where it is warm and wet.",
      definition:
        "The processes NCERT names:\n" +
        "- **Solution**: a mineral dissolves in water, as rock salt does.\n" +
        "- **Carbonation**: carbonic acid (carbon dioxide in rainwater) attacks **limestone** and dissolves it. This is how caves form.\n" +
        "- **Hydration**: a mineral **takes up water** and **expands**. Anhydrite becomes **gypsum**. The swelling sets up **stress** in the rock and helps break it.\n" +
        "- **Oxidation**: oxygen combines with iron in the rock, as in **rusting**. The rock turns red or brown and crumbles.\n" +
        "- **Hydrolysis**: a mineral reacts chemically with water and breaks down into new substances.\n" +
        "- **Acid action** of all kinds is chemical. **Salt crystal growth** is not.",
      table: {
        columns: ["Process", "What happens", "Example"],
        rows: [
          { cells: ["Solution", "Mineral dissolves in water", "Rock salt"] },
          { cells: ["Carbonation", "Carbonic acid dissolves calcium carbonate", "Limestone caves"] },
          { cells: ["Hydration", "Mineral takes up water and swells", "Anhydrite to gypsum"] },
          { cells: ["Oxidation", "Oxygen joins iron, like rusting", "Red, crumbly iron-rich rock"] },
          {
            cells: ["Salt crystal growth", "Physical pressure, no new mineral", "Not chemical at all"],
            noteAmber: "CDS 2024 (II): it was the odd one out among acid action, hydrolysis and oxidation.",
            pyqExampleId: "686c53fa-7941-40a6-bc8f-187f14d10c97",
          },
        ],
      },
      pyqExampleId: "aed44e9d-b79b-4ba6-b14f-bb52ecbd2f3d",
      selfCheckExample: {
        prompt: "Limestone hills in a rainy region are full of caves and hollows. Which chemical process made them?",
        steps: [
          "Rainwater takes in carbon dioxide and becomes weak carbonic acid.",
          "Carbonic acid dissolves the calcium carbonate of limestone.",
        ],
        answer: "Carbonation.",
      },
      practiceSet: [
        { prompt: "Which process turns iron-bearing rock red and crumbly, as in rusting?", answer: "Oxidation" },
        { prompt: "Which rock is most attacked by carbonation?", answer: "Limestone" },
        { prompt: "In which kind of climate is chemical weathering fastest?", answer: "Warm and wet" },
      ],
      traps: [
        {
          title: "Hydration is not hydrolysis",
          body: "In **hydration** a mineral **takes water into itself and swells**, as anhydrite does when it becomes gypsum. Hydrolysis is a different reaction in which the mineral breaks down. The swelling and stress belong to hydration.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-mass-erosion",
      name: "Mass movement and soil erosion",
      intuition:
        "Once rock is weathered, gravity pulls the loose material downhill. Some of it slides in seconds, some creeps so slowly you only see it in tilted posts. " +
        "Running water then carries soil away, and on soft ground it cuts deep gullies.",
      definition:
        "From slow to fast:\n" +
        "- **Creep**: **very slow** movement of **soil** and loose rock down a gentle slope. Seen in **tilted poles, bent tree trunks** and leaning walls.\n" +
        "- **Solifluction**: slow flow of water-soaked soil, common where the ground is frozen below.\n" +
        "- **Earthflow** and **mudflow**: faster flows of wet soil and mud.\n" +
        "- **Landslides**: rapid falls or slides of rock and debris: **slump**, **debris slide**, **rockslide**, **rockfall**.\n" +
        "- **Gully erosion**: running water cuts deep channels in soft soil. The **Chambal** valley (Madhya Pradesh, Rajasthan, Uttar Pradesh) is India's best known example, with its **ravines** or badlands.",
      table: {
        columns: ["Movement", "Speed", "Material"],
        rows: [
          { cells: ["Creep", "Very slow", "Soil and loose rock"] },
          { cells: ["Solifluction", "Slow", "Water-soaked soil over frozen ground"] },
          { cells: ["Mudflow", "Fast", "Wet mud"] },
          { cells: ["Rockfall", "Very fast", "Rock falling free from a cliff"] },
          {
            cells: ["Gully erosion", "Grows over years", "Soft alluvial soil"],
            noteAmber: "CDS 2019 (I): the Chambal valley was the one under intensive gully erosion.",
            pyqExampleId: "9d80267a-d6cc-41ce-a0e5-088d16cdd70b",
          },
        ],
      },
      pyqExampleId: "f5f2a241-c940-43ba-8253-0543bd9197c1",
      selfCheckExample: {
        prompt: "Rock suddenly drops free from a steep cliff face. Is that creep or a landslide, and which kind?",
        steps: [
          "Creep is slow and moves soil, not a falling mass of rock.",
          "A rapid fall of rock from a cliff is a landslide of the rockfall kind.",
        ],
        answer: "A landslide: a rockfall.",
      },
      practiceSet: [
        { prompt: "Which river valley of India is famous for its ravines cut by gully erosion?", answer: "The Chambal valley" },
        { prompt: "What is the slow flow of water-soaked soil over frozen ground called?", answer: "Solifluction" },
        { prompt: "Name two kinds of landslide.", answer: "Any two of slump, debris slide, rockslide and rockfall" },
      ],
      traps: [
        {
          title: "The Chambal, not the Kosi or Damodar, is the gully river",
          body: "The Kosi and Damodar are known for **floods**. The **Chambal** valley is known for its deep **ravines** cut by gully erosion.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeea-soils",
      name: "Soil orders and humus",
      intuition:
        "Soil scientists sort soils into orders by how far they have developed and what they are rich in. " +
        "A brand new soil has no layers at all; a very old tropical soil has been weathered almost to the bone. Learn each order by its one stand-out feature.",
      definition:
        "Key orders (the USDA system, also used by ICAR for Indian soils):\n" +
        "- **Entisols**: the **youngest**; **no horizons** (layers).\n" +
        "- **Inceptisols**: a step older; **weakly developed** horizons.\n" +
        "- **Histosols**: **very rich in organic matter**; the peaty soils of bogs and marshes.\n" +
        "- **Oxisols**: **very old and highly weathered**; humid tropics.\n" +
        "- **Vertisols**: **rich in clay**, highly **basic**; swell when wet and crack when dry (India's black soil).\n" +
        "- **Mollisols**: dark, fertile grassland soils. **Aridisols**: desert soils. **Gelisols**: soils with permafrost. **Spodosols**: acid forest soils of cool regions.\n" +
        "- **Humus** is the **dark, amorphous** remains of decayed plants and animals. Being **colloidal**, it holds nutrients and acts as their store.\n" +
        "- **Soil impoverishment** means the soil has become **very deficient in plant nutrients**.",
      table: {
        columns: ["Order", "Stand-out feature"],
        rows: [
          { cells: ["Entisols", "Youngest, no horizons"] },
          {
            cells: ["Inceptisols", "Weakly developed horizons"],
            pyqExampleId: "324b4577-16bf-4bcd-9595-a5a9d89b11c3",
          },
          {
            cells: ["Histosols", "Very high organic matter, peat and bogs"],
            noteAmber: "CDS 2020 (I): the soil with very high organic matter was the histosol.",
            pyqExampleId: "1754255a-d493-4065-aeec-56d1a087fab5",
          },
          { cells: ["Oxisols", "Very old, highly weathered, tropical"] },
          { cells: ["Vertisols", "Clay-rich, basic, swell and crack"] },
          {
            cells: ["Mollisols", "Dark, fertile grassland soils"],
            noteAmber: "CDS 2021 (II): inceptisols, entisols, vertisols and mollisols were named as orders of soil.",
            pyqExampleId: "83b124e8-3ea8-4c43-8460-ed30a24810da",
          },
          { cells: ["Gelisols", "Permafrost within the soil"] },
          {
            cells: ["Humus", "Dark, amorphous, colloidal store of nutrients"],
            pyqExampleId: "5cc9991f-26f9-42b3-b75e-4c9e939a4dfa",
          },
        ],
      },
      pyqExampleId: "1ec9e47d-3302-40dd-ac93-75666a4a795f",
      selfCheckExample: {
        prompt: "A soil under prairie grass has a thick, dark, very fertile top layer. Which soil order is it?",
        steps: [
          "Grasses add a lot of organic matter to the top layer every year.",
          "That gives the dark, fertile surface typical of grassland soils.",
        ],
        answer: "Mollisols.",
      },
      practiceSet: [
        { prompt: "Which soil order has permafrost in it?", answer: "Gelisols" },
        { prompt: "What does soil impoverishment mean?", answer: "The soil has become very deficient in plant nutrients" },
        { prompt: "Why is humus called a store of nutrients?", answer: "It is colloidal, so it holds nutrients on its surface" },
        { prompt: "Which soil order is found in deserts?", answer: "Aridisols" },
      ],
      traps: [
        {
          title: "Entisols and inceptisols are easy to swap",
          body: "**Entisols** have **no** horizons at all. **Inceptisols** have **weakly developed** horizons. The 'in' of inceptisols is the beginning of layers.",
        },
        {
          title: "Impoverished soil has lost nutrients",
          body: "Soil impoverishment is the loss of plant nutrients, not erosion of the soil itself and not enrichment.",
        },
      ],
    },
  ],
};
