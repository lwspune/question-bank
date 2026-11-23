import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MN_COMPOSITION_NOTE: SubtopicNote = {
  subtopicName: "Elements, Compounds and Mixtures",
  title: "Elements, Compounds and Mixtures",
  oneLineDefinition:
    "An element has one kind of atom, a compound joins elements in a fixed ratio with new properties, and a mixture keeps the properties of its parts; mixtures range from true solutions through colloids to suspensions.",
  whyItMatters:
    "Six questions in the bank, one EASY and five MODERATE. Three ask what makes a compound, a complex compound or a heterogeneous mixture; three are about solutions and colloids: dental amalgam as a solution, the Tyndall effect, and matching smoke, soap froth and milk to their type of colloid.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mnco-kinds",
      name: "Elements, compounds and mixtures",
      intuition:
        "Iron filings and sulphur powder stirred together are a mixture: a magnet still pulls out the iron, and you can see yellow and grey bits. Heat them and they react to form iron sulphide, a compound: it is neither magnetic nor yellow, and its iron and sulphur are always in the same ratio. A compound is a new substance; a mixture is just its parts side by side.",
      definition:
        "- **Element**: made of only **one kind of atom**, such as iron, oxygen or carbon.\n" +
        "- **Compound**: two or more elements **chemically combined** in a **fixed ratio** by mass. Its properties are **different** from those of its elements, and it can be broken up only by a chemical reaction. Water, salt and \\(\\mathrm{A_2B}\\) formed from A and B are compounds.\n" +
        "- **Mixture**: two or more substances mixed in **any proportion**, each keeping its **own properties**. It can be separated by physical methods.\n" +
        "- **Homogeneous mixture**: the same throughout, such as salt solution, air and alloys (brass, stainless steel). **Heterogeneous mixture**: not the same throughout, such as sand in water or oil and water.\n" +
        "- **Complex compound**: a **metal atom** at the centre bonded to a group of other atoms or ions around it. Chlorophyll has **magnesium**, haemoglobin and potassium ferrocyanide have **iron**, and vitamin B-12 has **cobalt**.",
      table: {
        columns: ["Property", "Compound", "Mixture"],
        rows: [
          { cells: ["Composition", "Fixed ratio", "Any proportion"] },
          { cells: ["Properties", "New, different from its elements", "Those of its parts"] },
          { cells: ["Separated by", "Chemical reactions only", "Physical methods"] },
          { cells: ["Energy when formed", "Usually given out or taken in", "Usually none"] },
          { cells: ["Example", "Iron sulphide, water, common salt", "Iron with sulphur, air, brass"] },
        ],
        caption: "A product that is formed by a reaction and has a fixed composition is a compound, never an element or a mixture.",
      },
      selfCheckExample: {
        prompt: "Iron filings and sulphur powder are mixed, then heated strongly. A magnet no longer pulls anything out of the black product. Is the product a mixture or a compound, and why?",
        steps: [
          "Before heating, the magnet pulled out the iron: the parts kept their properties, so it was a mixture.",
          "After heating, the iron is no longer magnetic: a new substance with new properties has formed.",
        ],
        answer: "A compound (iron sulphide), because its properties differ from those of iron and sulphur.",
      },
      practiceSet: [
        { prompt: "Is a mixture of sand and water homogeneous or heterogeneous?", answer: "Heterogeneous: the sand is not spread evenly and settles down" },
        { prompt: "Which metal is at the centre of a chlorophyll molecule?", answer: "Magnesium" },
        { prompt: "Can water be broken into hydrogen and oxygen by boiling or filtering it?", answer: "No: water is a compound and can be broken up only by a chemical method, such as passing electricity through it" },
        { prompt: "Is brass an element, a compound or a mixture?", answer: "A homogeneous mixture (an alloy of copper and zinc)" },
      ],
      pyqExampleId: "9e701f53-41b6-407d-86bb-01d6123fc925",
      traps: [
        {
          title: "Thinking a compound keeps the properties of its elements",
          body: "A compound is a new substance. Sodium is a reactive metal and chlorine a poisonous gas, but common salt is neither.",
        },
        {
          title: "Calling an alloy a compound",
          body: "Brass and stainless steel are mixtures of metals. They are the same throughout, so they are homogeneous mixtures, not compounds.",
        },
        {
          title: "Thinking every compound with carbon is a complex compound",
          body: "A complex compound has a metal atom at its centre. Carbohydrates, proteins and urea have none, so they are not complex compounds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mnco-colloids",
      name: "Solutions, colloids and suspensions",
      intuition:
        "Stir sugar into water and it vanishes completely: a true solution. Stir in milk powder or starch and the liquid looks even but a torch beam shows up inside it: a colloid. Stir in sand and it soon settles at the bottom: a suspension. The difference is only how big the particles are.",
      definition:
        "- **Solution**: a homogeneous mixture with the smallest particles. A solution can be of any state in any state: chlorine or carbon dioxide gas in water (gas in liquid), salt in water (solid in liquid), liquid mercury in solid silver and tin as **dental amalgam** (liquid in solid), zinc in copper as brass (solid in solid).\n" +
        "- **Colloid**: medium-sized particles that look evenly spread, do not settle and pass through filter paper, but **scatter light**.\n" +
        "- **Suspension**: large particles that **settle** on standing and can be filtered out, such as muddy water or chalk in water.\n" +
        "- **Tyndall effect**: the scattering of a beam of light, which makes its path visible. Colloids show it; true solutions do not. A sunbeam through dusty air or a car headlight in fog shows it.\n" +
        "- A colloid is named by what is spread in what: see the table.",
      table: {
        columns: ["Type of colloid", "What is spread in what", "Examples"],
        rows: [
          { cells: ["Aerosol", "Liquid or solid in a gas", "Fog, clouds, mist (liquid); smoke, vehicle exhaust (solid)"] },
          { cells: ["Foam", "Gas in a liquid", "Shaving cream, soap froth"] },
          { cells: ["Emulsion", "Liquid in a liquid", "Milk, face cream"] },
          { cells: ["Sol", "Solid in a liquid", "Milk of magnesia, mud"] },
          { cells: ["Gel", "Liquid in a solid", "Jelly, cheese, butter"] },
          { cells: ["Solid foam", "Gas in a solid", "Sponge, foam rubber, pumice"] },
          { cells: ["Solid sol", "Solid in a solid", "Coloured gemstone, milky glass"] },
        ],
        caption: "Read the name from the two states: the first is what is spread, the second is what it is spread in.",
      },
      selfCheckExample: {
        prompt: "Brass is formed when zinc dissolves in copper. What kind of solution is brass?",
        steps: ["Zinc, the part dissolved, is a solid.", "Copper, the part it dissolves in, is also a solid."],
        answer: "A solid in a solid",
      },
      practiceSet: [
        { prompt: "A torch beam shows up clearly in diluted milk but not in salt water. Why?", answer: "Milk is a colloid and scatters light (the Tyndall effect); salt water is a true solution and does not" },
        { prompt: "What type of colloid is fog?", answer: "An aerosol: liquid droplets spread in a gas" },
        { prompt: "In which kind of mixture do the particles settle down when it is left to stand?", answer: "A suspension" },
        { prompt: "What type of colloid is shaving cream?", answer: "A foam: gas spread in a liquid" },
      ],
      pyqExampleId: "0c8d0e46-8ede-423c-b45d-93831701d379",
      traps: [
        {
          title: "Expecting a true solution to show the Tyndall effect",
          body: "The particles of a true solution are too small to scatter light, so a beam passing through it cannot be seen. Colloids scatter it.",
        },
        {
          title: "Calling smoke a sol",
          body: "Smoke is solid particles spread in a gas, so it is an aerosol. A sol is a solid spread in a liquid.",
        },
        {
          title: "Thinking only solids dissolve in liquids",
          body: "Solutions come in every pairing: a gas in a liquid (soda water), a liquid in a solid (amalgam), a solid in a solid (alloys).",
        },
      ],
    },
  ],
};
