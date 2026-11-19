import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CC_ALLOTROPES_NOTE: SubtopicNote = {
  subtopicName: "Occurrence and Allotropes of Carbon",
  title: "Occurrence and Allotropes of Carbon",
  oneLineDefinition:
    "Carbon is found free as diamond, graphite and fullerene, its allotropes, and combined in carbonates, fuels and the compounds of living things; each allotrope's structure explains its properties and uses.",
  whyItMatters:
    "Ten questions in the bank, one EASY and nine MODERATE. Three ask where carbon is free and where it is combined, or which element shows allotropy; three are about diamond and graphite; two about fullerene; and the same three-way match of structure and solubility was asked in 2023 and again in 2024.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ccal-occurrence",
      name: "Free and combined carbon, and allotropy",
      intuition:
        "Carbon is free when it is on its own, not joined to any other element: diamond and graphite are nothing but carbon. Most carbon on Earth is combined: in limestone it is joined to calcium and oxygen, in sugar and proteins to hydrogen and oxygen. When one element exists in several forms, each a different arrangement of the same atoms, the forms are its allotropes.",
      definition:
        "- **Free state**: the element alone. Carbon is free in **diamond, graphite and fullerene**.\n" +
        "- **Combined state**: joined to other elements in a compound: carbon dioxide in air, carbonates such as **marble, limestone and chalk** (calcium carbonate), fuels such as **natural gas, coal and petroleum**, and the **carbohydrates, proteins and fats** of living things (wool, silk, cotton, wood, sugar).\n" +
        "- **Allotropy**: one element existing in different physical forms with the **same chemical properties**. The forms are **allotropes**.\n" +
        "- Elements that show allotropy: **carbon** (diamond, graphite, fullerene), **sulphur** (rhombic, monoclinic), **phosphorus** (white, red), **oxygen** (oxygen \\(\\mathrm{O_2}\\) and ozone \\(\\mathrm{O_3}\\)).",
      table: {
        columns: ["Substance", "State of carbon", "What the carbon is joined to"],
        rows: [
          { cells: ["Diamond", "Free", "Only other carbon atoms"] },
          { cells: ["Graphite", "Free", "Only other carbon atoms"] },
          { cells: ["Fullerene", "Free", "Only other carbon atoms"] },
          { cells: ["Marble, limestone, chalk", "Combined", "Calcium and oxygen (calcium carbonate)"] },
          { cells: ["Natural gas", "Combined", "Hydrogen (mostly methane)"] },
          { cells: ["Proteins (wool, silk)", "Combined", "Hydrogen, oxygen and nitrogen"] },
          { cells: ["Sugar, cotton, wood", "Combined", "Hydrogen and oxygen (carbohydrates)"] },
        ],
        caption: "An odd-one-out on occurrence usually hides one free form among compounds, or one compound among free forms.",
      },
      selfCheckExample: {
        prompt: "In which of these is carbon in the free state: chalk, graphite, cane sugar?",
        steps: [
          "Chalk is calcium carbonate and cane sugar is a carbohydrate: both are compounds.",
          "Graphite is pure carbon.",
        ],
        answer: "Graphite",
      },
      practiceSet: [
        { prompt: "Name the two allotropes of sulphur.", answer: "Rhombic sulphur and monoclinic sulphur" },
        { prompt: "In what state is carbon present in limestone?", answer: "Combined, as calcium carbonate" },
        { prompt: "Which form of oxygen is an allotrope of ordinary oxygen gas?", answer: "Ozone, \\(\\mathrm{O_3}\\)" },
        { prompt: "Name the two common allotropes of phosphorus.", answer: "White phosphorus and red phosphorus" },
      ],
      pyqExampleId: "14ac6a21-1ad5-486b-a411-0c9fe723ce50",
      traps: [
        {
          title: "Calling marble free carbon",
          body: "Marble is calcium carbonate, a compound, so its carbon is combined. Only diamond, graphite and fullerene are free carbon.",
        },
        {
          title: "Thinking only carbon has allotropes",
          body: "Sulphur, phosphorus and oxygen also have allotropes. Chlorine does not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ccal-diamond",
      name: "Diamond and graphite: structure, properties and uses",
      intuition:
        "Both are pure carbon, so the difference lies only in how the atoms are joined. In diamond each carbon holds four neighbours tightly in every direction, so the whole crystal is one rigid network: very hard. In graphite each carbon holds only three neighbours in a flat sheet, and the sheets are stacked loosely, so they slide over each other. The spare electron of each carbon in graphite is free to move, so graphite conducts electricity.",
      definition:
        "- **Diamond**: each carbon is bonded to **4** others at the corners of a **tetrahedron**, forming a rigid **three-dimensional** network. It is the **hardest** natural substance, does **not conduct** electricity, and dissolves in **no solvent**. Used to **cut glass**, drill rock and in jewellery.\n" +
        "- **Graphite**: each carbon is bonded to **3** others in flat layers of **hexagonal** rings. The layers **slide** over each other, so it is soft and **slippery**. It **conducts electricity**, has a high melting point and does not dissolve in most solvents. Used as a **lubricant**, in **pencil leads** and as **electrodes** (arc lamps, dry cells).\n" +
        "- All bonds in both are **covalent**.",
      table: {
        columns: ["Property", "Diamond", "Graphite"],
        rows: [
          { cells: ["Bonds from each carbon", "4", "3"] },
          { cells: ["Structure", "Tetrahedral, three-dimensional network", "Flat layers of hexagonal rings"] },
          { cells: ["Hardness", "Hardest natural substance", "Soft and slippery"] },
          { cells: ["Electricity", "Does not conduct", "Good conductor"] },
          { cells: ["Density", "About 3.5 \\(\\mathrm{g/cm^3}\\)", "About 1.9 to 2.3 \\(\\mathrm{g/cm^3}\\)"] },
          { cells: ["Uses", "Cutting glass, drilling rock, jewellery", "Lubricant, pencil lead, electrodes"] },
        ],
        caption: "Every use follows from a property: hard for cutting, slippery for lubricating, conducting for electrodes.",
      },
      selfCheckExample: {
        prompt: "Why are the electrodes of a dry cell made of graphite and not of diamond?",
        steps: [
          "An electrode must carry electric current.",
          "Graphite conducts electricity; diamond does not.",
        ],
        answer: "Graphite is a good conductor of electricity and diamond is not.",
      },
      practiceSet: [
        { prompt: "To how many other carbon atoms is each carbon atom bonded in diamond?", answer: "Four" },
        { prompt: "Why is diamond used to drill through hard rock?", answer: "It is the hardest natural substance" },
        { prompt: "What is the shape of the rings in each layer of graphite?", answer: "Hexagonal (six carbon atoms in each ring)" },
        { prompt: "Why does a pencil made of graphite leave a mark on paper?", answer: "Its soft layers slide off one another and stick to the paper" },
      ],
      pyqExampleId: "e6697575-e6f6-48f6-bbca-fd42d22503fa",
      traps: [
        {
          title: "Giving diamond the hexagonal structure",
          body: "Diamond is tetrahedral and three-dimensional. Hexagonal rings in flat layers belong to graphite.",
        },
        {
          title: "Picking a true fact that is not the reason",
          body: "Graphite works as a lubricant because its layers are slippery and its melting point is high. That it conducts electricity is true, but it explains its use in electrodes, not as a lubricant.",
        },
        {
          title: "Thinking all forms of carbon conduct electricity",
          body: "Graphite conducts, but diamond does not: all four outer electrons of each carbon in diamond are used in bonds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ccal-fullerene",
      name: "Fullerene and the three allotropes compared",
      intuition:
        "Fullerene is the newest form of carbon, found in 1985. Instead of a network or sheets, its carbon atoms close up into hollow balls. The best known, \\(\\mathrm{C_{60}}\\), looks like a football stitched from pentagons and hexagons. Because it is made of separate molecules, it can dissolve in some liquids, which diamond and graphite cannot.",
      definition:
        "- **Buckminsterfullerene**, \\(\\mathrm{C_{60}}\\): 60 carbon atoms arranged in **12 pentagons and 20 hexagons**, shaped like a football. It is also called a **buckyball**.\n" +
        "- It is named after the architect **Buckminster Fuller**, whose domes have this shape.\n" +
        "- Each carbon is bonded to **3** others.\n" +
        "- It **dissolves in carbon disulphide**. Diamond dissolves in no solvent, graphite in hardly any.\n" +
        "- **Uses**: as an **insulator**, as a **catalyst in water purification**, and as a **superconductor** at certain temperatures.",
      table: {
        columns: ["Allotrope", "Structure", "Solubility", "Typical use"],
        rows: [
          { cells: ["Diamond", "Tetrahedral network", "Dissolves in no solvent", "Cutting glass"] },
          { cells: ["Graphite", "Hexagonal layers", "Does not dissolve in most solvents", "Lubricant, electrodes"] },
          { cells: ["Fullerene (\\(\\mathrm{C_{60}}\\))", "Hollow ball (buckyball) of pentagons and hexagons", "Dissolves in carbon disulphide", "Insulator, catalyst in water purification"] },
        ],
        caption: "Match questions pair each allotrope with one structure, one solubility and one use.",
      },
      selfCheckExample: {
        prompt: "A form of carbon is made of separate ball-shaped molecules, each of 60 carbon atoms. Name it and give its formula.",
        steps: ["Separate ball-shaped molecules of carbon are fullerenes.", "The one with 60 atoms is buckminsterfullerene."],
        answer: "Buckminsterfullerene, \\(\\mathrm{C_{60}}\\)",
      },
      practiceSet: [
        { prompt: "How many pentagons are there in one molecule of buckminsterfullerene?", answer: "12" },
        { prompt: "Give one use of fullerene.", answer: "As an insulator, as a catalyst in water purification, or as a superconductor at certain temperatures" },
        { prompt: "After whom is buckminsterfullerene named?", answer: "The architect Buckminster Fuller, whose domes have the same shape" },
        { prompt: "To how many other carbon atoms is each carbon bonded in a molecule of \\(\\mathrm{C_{60}}\\)?", answer: "Three" },
      ],
      pyqExampleId: "dae15d15-e28b-4bfd-a094-807cbbf87b77",
      traps: [
        {
          title: "Swapping the counts of pentagons and hexagons",
          body: "A \\(\\mathrm{C_{60}}\\) molecule has 12 pentagons and 20 hexagons, like the patches of a football: fewer pentagons than hexagons.",
        },
        {
          title: "Saying no form of carbon dissolves",
          body: "Diamond and graphite do not dissolve, but fullerene, made of separate molecules, dissolves in carbon disulphide.",
        },
      ],
    },
  ],
};
