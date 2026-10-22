import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_WO_BIOMES_NOTE: SubtopicNote = {
  subtopicName: "Biomes and Farming",
  title: "Biomes and Farming",
  oneLineDefinition:
    "The tundra and the coniferous forest, the Mediterranean lands and their scrub, the mid-latitude deciduous forest, and shifting cultivation under its local names.",
  whyItMatters:
    "Eight CDS questions from 2019 to 2025: 2 EASY, 3 MODERATE, 3 HARD, and four of them in 2020 alone. Most are which-is-not items: which country has no tundra, which pair of cities has no Mediterranean scrub, which statement about a forest is false.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgewo-cold-forests",
      name: "Tundra and the coniferous forest",
      intuition:
        "Travel north from a warm country and the trees change, then stop. First comes a broad belt of conifers, then a tree line, and beyond it the tundra, where the subsoil stays frozen and only mosses and low shrubs survive. So a country has tundra only if it reaches the Arctic coast.",
      definition:
        "The tundra:\n" +
        "- Lies **beyond the tree line**, along the Arctic coasts of **Russia, Canada and the United States (Alaska)**, and in Greenland and northern Scandinavia.\n" +
        "- The growing season is very short and the subsoil is frozen (permafrost), so trees cannot grow. Plants are **mosses, lichens and low shrubs**, and there is **no timber**.\n" +
        "The coniferous (boreal) forest, or **taiga**:\n" +
        "- Lies in the interiors of the high middle latitudes: Canada, Scandinavia, Siberia.\n" +
        "- Trees are evergreen conifers such as pine, fir and spruce, which give **softwood**. The dense canopy and acid needle litter leave **very little undergrowth**.\n" +
        "- The growing season is short, about **50 to 100 days**. Winters are bitter and summers warm, so the **annual range of temperature is very large**.",
      table: {
        columns: ["Biome", "Where", "Plants and climate"],
        rows: [
          {
            cells: ["Tundra", "Arctic coasts of Russia, Canada, Alaska; Greenland", "Mosses, lichens, low shrubs; no trees, so no timber"],
            noteAmber: "CDS 2020 (II): timber is not found in the tundra.",
            pyqExampleId: "7a58ab5c-822b-447a-8a04-d2230cf90c4b",
          },
          {
            cells: ["Coniferous forest (taiga)", "Canada, Scandinavia, Siberia", "Pine, fir, spruce; little undergrowth; a very large annual range of temperature"],
            noteAmber: "CDS 2019 (II): the false statement was that annual temperature varies little.",
            pyqExampleId: "f548b51c-137a-4ac8-85b1-1aea33a13f32",
          },
          { cells: ["Country with no tundra", "Belarus, between about 51° N and 56° N, far from the Arctic", "Mixed forest and farmland"] },
        ],
      },
      pyqExampleId: "a0d80be1-4d9d-45bc-b701-8823d4e20387",
      selfCheckExample: {
        prompt: "Why is there very little undergrowth on the floor of a coniferous forest?",
        steps: [
          "The evergreen conifers keep their needles all year, so the canopy shades the ground in every season.",
          "Fallen needles make the soil acid, and the growing season is short, so few small plants can grow beneath the trees.",
        ],
        answer: "Year-round shade, acid needle litter and a short growing season.",
      },
      practiceSet: [
        { prompt: "Which plants make up most of the tundra's vegetation?", answer: "Mosses, lichens and low shrubs" },
        { prompt: "What is the coniferous forest belt of Siberia also called?", answer: "The taiga" },
        { prompt: "About how long is the growing season in the coniferous forest?", answer: "About 50 to 100 days a year" },
        { prompt: "Do coniferous trees give hardwood or softwood?", answer: "Softwood" },
      ],
      traps: [
        {
          title: "Tundra needs an Arctic coast",
          body: "A country has tundra only if it reaches the far north beyond the tree line. **Russia, Canada and the United States** (through Alaska) do; a mid-latitude country such as **Belarus** does not, however cold its winters.",
        },
        {
          title: "The coniferous belt has a huge temperature range",
          body: "The **coniferous forest** lies in continental interiors, with very cold winters and warm summers. Its **annual range of temperature is among the largest** on Earth, never small.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-mediterranean",
      name: "Mediterranean lands and their scrub",
      intuition:
        "The Mediterranean climate is found on the western side of continents, roughly between 30° and 45° from the Equator. Its summers are hot and dry and its rain comes in winter, so the plants are built to save water: small, hard, leathery leaves. That vegetation is called sclerophyll, which means hard-leaved. The same sunny, dry summers make these lands the world's orchards.",
      definition:
        "The Mediterranean climate:\n" +
        "- Lies on the **western margins** of continents, about 30° to 45° north and south.\n" +
        "- **Hot, dry summers** and **mild, wet winters**: the rain comes in **winter**.\n" +
        "- Natural vegetation is **sclerophyll**: hard, small, waxy leaves that lose little water in the summer drought.\n" +
        "- It is the leading belt for **citrus fruit** (oranges, lemons), grapes and olives.\n" +
        "Where it is found: lands around the **Mediterranean Sea** (Lisbon), **California** (Los Angeles), **central Chile** (Valparaiso), the **Cape** of South Africa (Cape Town) and **south-west and south Australia** (Perth, Adelaide).",
      table: {
        columns: ["Region", "Mediterranean area", "City"],
        rows: [
          { cells: ["Europe", "Lands around the Mediterranean Sea", "Lisbon"] },
          { cells: ["North America", "California", "Los Angeles"] },
          { cells: ["South America", "Central Chile", "Valparaiso"] },
          { cells: ["Africa", "The Cape, South Africa", "Cape Town"] },
          { cells: ["Australia", "South-west and south", "Perth, Adelaide"] },
          {
            cells: ["Fruit the region is known for", "Citrus, grapes, olives", "The world's orchard belt"],
            noteAmber: "CDS 2019 (II): the Mediterranean region is an important supplier of citrus fruits.",
            pyqExampleId: "d3d47ef2-1c8d-433e-9f45-4335ee0a7695",
          },
        ],
      },
      pyqExampleId: "43316ffd-44e1-49ce-98a7-d38a661621d9",
      selfCheckExample: {
        prompt: "Why do the plants of Mediterranean lands have small, hard, waxy leaves?",
        steps: [
          "In this climate the summer, the warmest time of year, gets almost no rain.",
          "Small, hard, waxy leaves lose very little water, so the plant survives the dry summer.",
        ],
        answer: "To save water through the hot, dry summer.",
      },
      practiceSet: [
        { prompt: "In which season do Mediterranean lands get most of their rain?", answer: "Winter" },
        { prompt: "On which side of a continent is the Mediterranean climate found?", answer: "The western side, about 30° to 45° from the Equator" },
        { prompt: "Which kind of fruit is the Mediterranean region a leading supplier of?", answer: "Citrus fruit (oranges, lemons)" },
      ],
      traps: [
        {
          title: "Sclerophyll means the western margins",
          body: "Sclerophyll scrub grows only where the climate is **Mediterranean**: the western sides of continents. **Las Vegas** is hot desert and **Queensland**, on Australia's east, is humid tropics and subtropics; neither has it.",
        },
        {
          title: "Winter rain, not summer rain",
          body: "Most climates in India get their rain in summer. The **Mediterranean** climate is the opposite: rain in **winter**, drought in summer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-deciduous",
      name: "The mid-latitude deciduous forest",
      intuition:
        "Between the cold conifers and the dry grasslands lies a forest of broad-leaved trees that go bare every winter. Dropping the leaves is how the trees get through the cold months, when frozen ground gives them no water. These are the forests of old Europe and of the eastern United States.",
      definition:
        "Mid-latitude deciduous forest:\n" +
        "- Trees **shed their leaves before winter** (in autumn) and grow new ones in spring. Without leaves they lose no water while the ground is frozen.\n" +
        "- Native to **eastern North America** and **western Europe**.\n" +
        "- In **Asia** it forms a belt between the **boreal (coniferous) forest** to the north and the **steppe** grasslands to the south.\n" +
        "- Trees: **oak, beech, maple, hickory, walnut**. They give **hardwood**.\n" +
        "- Much of it in western Europe and the eastern United States has been cleared for farms and towns.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["When the leaves fall", "Before winter, in autumn"] },
          { cells: ["Native regions", "Eastern North America and western Europe"] },
          { cells: ["Its place in Asia", "Between the boreal forest (north) and the steppe (south)"] },
          { cells: ["Typical trees", "Oak, beech, maple, hickory, walnut"] },
          { cells: ["Kind of wood", "Hardwood"] },
        ],
      },
      pyqExampleId: "88b4add6-1638-4b89-b04b-834762f16bad",
      selfCheckExample: {
        prompt: "A forest in Ohio, in the eastern United States, is bare in January and thick with broad leaves in July. To which biome does it belong?",
        steps: [
          "Bare in winter and leafy in summer means the trees are deciduous.",
          "Ohio is in the middle latitudes of eastern North America, a native home of this forest.",
        ],
        answer: "The mid-latitude deciduous forest.",
      },
      practiceSet: [
        { prompt: "Why do mid-latitude deciduous trees drop their leaves before winter?", answer: "So they lose no water while the ground is frozen" },
        { prompt: "Do mid-latitude deciduous trees give hardwood or softwood?", answer: "Hardwood" },
        { prompt: "What has happened to much of the deciduous forest of western Europe?", answer: "It has been cleared for farms and towns" },
      ],
      traps: [
        {
          title: "Leaves fall before winter, not in summer",
          body: "**Mid-latitude deciduous** trees shed their leaves in **autumn**, ahead of the cold. A statement that they drop them in summer is false. (Tropical deciduous trees, as in India, shed theirs in the dry season.)",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgewo-shifting",
      name: "Shifting cultivation",
      intuition:
        "Shifting cultivation is farming that moves. A family clears a patch of forest by cutting and burning it, grows crops in the ash for a few years, and moves on when the soil is worn out. The same practice has a different name in every region, and CDS gives you the names.",
      definition:
        "Shifting cultivation (slash and burn), from NCERT Class 12:\n" +
        "- Trees and bushes are cut and **burnt**; the **ash** adds to the soil's fertility.\n" +
        "- Crops are grown for about **3 to 5 years**, until the soil loses its fertility. Then the farmer **moves to a new patch**.\n" +
        "- Local names: **Jhum** (or jhuming) in north-east India, **Milpa** in Mexico and Central America, **Ladang** in Indonesia and Malaysia.",
      table: {
        columns: ["Local name", "Region"],
        rows: [
          { cells: ["Jhum", "North-east India"] },
          { cells: ["Milpa", "Mexico and Central America"] },
          { cells: ["Ladang", "Indonesia and Malaysia"] },
        ],
      },
      pyqExampleId: "754d7706-af38-495e-88d3-217fa65e6a26",
      practiceSet: [
        { prompt: "What is shifting cultivation called in north-east India?", answer: "Jhum (jhuming)" },
        { prompt: "Why does a shifting cultivator move to a new patch after a few years?", answer: "The soil loses its fertility" },
        { prompt: "In shifting cultivation, what adds to the fertility of a newly cleared field?", answer: "The ash of the burnt vegetation" },
      ],
      traps: [
        {
          title: "Shifting, not truck or plantation farming",
          body: "**Milpa** and **Ladang** are names for **shifting cultivation**. Truck farming grows vegetables for city markets, and plantation agriculture grows one cash crop on a large estate; neither moves from patch to patch.",
        },
      ],
    },
  ],
};
