import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_LAND_NOTE: SubtopicNote = {
  subtopicName: "Resources and Land Use",
  title: "Resources and Land Use",
  oneLineDefinition:
    "How resources are classified, the nine categories India uses to record its land, and how irrigation and soil conservation suit the ground they are used on.",
  whyItMatters:
    "Eight CDS questions from 2018 to 2024. Three ask about the land-use categories, two about how resources are classified, and three about irrigation and soil conservation. Most come straight from the NCERT chapters on resources and land use.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-resources",
      name: "Classifying resources",
      intuition:
        "The same resource can be sorted in four different ways, depending on the question you ask about it. Where does it come from? Can it run out? Who owns it? Is it in use yet? " +
        "Each question gives its own pair or set of classes, and CDS checks that you match the class to the right question.",
      definition:
        "The four bases of classification (NCERT Class 10, Resources and Development):\n" +
        "- By **origin**: **biotic** (from living things: forests, fish, livestock, people) and **abiotic** (from non-living things: rocks, metals, water, air).\n" +
        "- By **exhaustibility**: **renewable** (renewed by natural processes: solar and wind energy, water, forests) and **non-renewable** (formed over millions of years: coal, petroleum, minerals).\n" +
        "- By **ownership**: individual, community, national and international.\n" +
        "- By **status of development**: **potential** (found but not yet used), **developed** (surveyed and in use), **stock** (usable, but we lack the technology) and **reserves** (a part of the stock we can use with today's technology).",
      table: {
        columns: ["Basis of classification", "Classes"],
        rows: [
          {
            cells: ["Origin", "Biotic and abiotic"],
            noteAmber: "CDS 2023 (II): classification by origin gives biotic and abiotic.",
            pyqExampleId: "ed4df604-be5d-46b5-9e93-03450cb3bc40",
          },
          { cells: ["Exhaustibility", "Renewable and non-renewable"] },
          { cells: ["Ownership", "Individual, community, national and international"] },
          { cells: ["Status of development", "Potential, developed, stock and reserves"] },
        ],
      },
      pyqExampleId: "ed4df604-be5d-46b5-9e93-03450cb3bc40",
      selfCheckExample: {
        prompt: "Is solar energy a biotic or an abiotic resource, and is it renewable or non-renewable?",
        steps: [
          "Solar energy comes from the Sun, not from a living thing, so by origin it is abiotic.",
          "It does not run out on any human time scale, so by exhaustibility it is renewable.",
        ],
        answer: "Abiotic and renewable",
      },
      practiceSet: [
        { prompt: "On what basis are resources grouped into renewable and non-renewable?", answer: "Exhaustibility: whether natural processes can renew them" },
        { prompt: "Give two examples of biotic resources.", answer: "Any two of forests, fish, livestock and human beings" },
        { prompt: "What is a resource called when it has been found in a region but is not yet used?", answer: "A potential resource" },
        { prompt: "Name the four classes of resources by ownership.", answer: "Individual, community, national and international" },
      ],
      traps: [
        {
          title: "Origin is not renewability",
          body: "Classification by **origin** gives **biotic and abiotic**. Renewable and non-renewable is classification by **exhaustibility**, and potential and reserves is by **status of development**. An option from the wrong basis is the usual distractor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-land-use",
      name: "The nine land-use categories",
      intuition:
        "Every piece of land in a village's revenue records is put in one of nine boxes. Some boxes are about what the land is (forest, barren hill), some about what it is used for (roads, pasture), and four are about farming: how long a field has been left unsown decides which box it goes in.",
      definition:
        "The land-use record in India (NCERT Class 12, India: People and Economy):\n" +
        "- There are **nine** categories. **Marginal land** is not one of them: it describes poor quality, not a use.\n" +
        "- Fallow land is graded by **how long** it has been left unsown: **current fallow** is one agricultural year or less, **fallow other than current fallow** is more than one year but less than five, and **culturable wasteland** is **more than five years**.\n" +
        "- **Trends since Independence:** the area under **forest**, under **non-agricultural uses**, under current fallow and the **net sown area** have **increased**. Land put to **non-agricultural uses** (houses, roads, industry) grew at the **fastest rate**.\n" +
        "- **Barren and wasteland**, **culturable wasteland**, **permanent pastures** and land under **tree crops** have **declined**.",
      table: {
        columns: ["Category", "What it covers"],
        rows: [
          { cells: ["Forests", "Land classified as forest by the government"] },
          { cells: ["Land put to non-agricultural uses", "Settlements, roads, railways, industry and canals"] },
          { cells: ["Barren and wasteland", "Land that cannot be farmed with the technology we have: barren hills, deserts, ravines"] },
          { cells: ["Permanent pastures and grazing land", "Mostly village common land owned by the panchayat or the government"] },
          { cells: ["Miscellaneous tree crops and groves", "Orchards and groves not counted in the net sown area"] },
          {
            cells: ["Culturable wasteland", "Farmable land left unsown for more than five years"],
            noteAmber: "CDS 2024 (I): culturable wasteland is land left fallow for more than five years.",
            pyqExampleId: "839b02ac-3e57-4333-8145-9033c4446bf5",
          },
          { cells: ["Current fallow", "Left unsown for one agricultural year or less"] },
          { cells: ["Fallow other than current fallow", "Left unsown for more than one year but less than five"] },
          { cells: ["Net sown area", "Land actually sown and harvested"] },
        ],
      },
      pyqExampleId: "839b02ac-3e57-4333-8145-9033c4446bf5",
      selfCheckExample: {
        prompt: "A farmer has left one of his fields unsown for three years in a row. In which land-use category is that field recorded?",
        steps: [
          "Current fallow covers only one agricultural year or less, so three years is too long.",
          "Culturable wasteland starts after five years, so three years is too short.",
          "Between one and five years is fallow other than current fallow.",
        ],
        answer: "Fallow other than current fallow",
      },
      practiceSet: [
        { prompt: "Which land-use category in India has grown at the fastest rate since Independence?", answer: "Land put to non-agricultural uses" },
        { prompt: "For how long has current fallow land been left unsown?", answer: "One agricultural year or less" },
        { prompt: "Has the area under forest in India risen or fallen since Independence?", answer: "It has risen slowly" },
        { prompt: "Name two land-use categories whose area has shrunk in India in recent decades.", answer: "Any two of barren and wasteland, culturable wasteland, permanent pastures and land under tree crops" },
      ],
      traps: [
        {
          title: "Five years, not four",
          body: "**Culturable wasteland** is farmable land left unsown for **more than five years**. One to five years is fallow other than current fallow, and up to one year is current fallow.",
        },
        {
          title: "Marginal land is not a category",
          body: "Forest, pasture, and barren and wasteland are all land-use categories. **Marginal land** is a description of poor land, not one of the nine categories.",
        },
        {
          title: "Forest area has gone up",
          body: "A statement that the area under **forest** has fallen sharply in recent years is **false** for the land-use record: it has risen slowly since Independence.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-water-soil",
      name: "Irrigation and soil conservation",
      intuition:
        "Each way of watering crops suits a certain kind of ground. A tank needs hard rock that stops rain from soaking in. A well needs soft ground that holds water underneath. " +
        "On a hill slope the problem is the opposite: water runs off too fast and takes the soil with it, so farmers plough and build banks across the slope.",
      definition:
        "- **Tank irrigation** is common on the **peninsular plateau** (Karnataka, Telangana, Andhra Pradesh, Tamil Nadu), where **hard, impervious rock** keeps rainwater on the surface and there is **little groundwater**.\n" +
        "- **Well and tubewell irrigation** needs **soft, porous ground with plenty of groundwater**, as in the alluvial plains. Wells and tubewells water the **largest share** of India's irrigated land.\n" +
        "- So a map of tanks and a map of wells are **negatively related**: the ground that suits one does not suit the other.\n" +
        "- **Canal irrigation** is common where rivers flow all year, as in the northern plains and the coastal deltas.\n" +
        "- **Contour ploughing** (ploughing along the contour lines of a slope) and **contour bunding** (banks of earth across a slope) slow running water on **hill slopes** and save the soil. **Terrace farming** does the same on steeper hills.",
      table: {
        columns: ["Method", "Where it suits, and why"],
        rows: [
          { cells: ["Tank irrigation", "Peninsular plateau: hard rock holds rain on the surface"] },
          { cells: ["Wells and tubewells", "Alluvial plains: soft ground holds plenty of groundwater"] },
          { cells: ["Canals", "Northern plains and deltas, fed by rivers that flow all year"] },
          {
            cells: ["Contour ploughing and bunding", "Hill slopes, such as those of Himachal Pradesh, where water runs off fast"],
            noteAmber: "CDS 2021 (II): of Punjab, Haryana, Himachal Pradesh and Rajasthan, contour bunding belongs to hilly Himachal Pradesh.",
            pyqExampleId: "e978a2b9-d1c8-4c35-a624-ad8fdadabc0a",
          },
          {
            cells: ["Damanganga Reservoir Project", "Canals from the Damanganga river that irrigate Dadra and Nagar Haveli"],
            noteAmber: "CDS 2019 (I): the project with about 115 km of minor canals is in Dadra and Nagar Haveli.",
            pyqExampleId: "9d12ab4d-864a-4800-9897-c7f4f9d3f88c",
          },
        ],
      },
      pyqExampleId: "485557c8-f912-4672-b981-be9a2db74157",
      selfCheckExample: {
        prompt: "Every monsoon, rain runs straight down a farmer's sloping field in Uttarakhand and carries the topsoil away. Name two practices that would help, and say how they help.",
        steps: [
          "The soil is lost because water runs downhill fast.",
          "Ploughing along the contour lines leaves furrows across the slope, which catch the water.",
          "Banks of earth across the slope (contour bunds) or terraces also slow the water and hold the soil back.",
        ],
        answer: "Contour ploughing and contour bunding (or terracing): they slow the water running down the slope, so less soil is washed away.",
      },
      practiceSet: [
        { prompt: "Which source waters the largest share of India's irrigated land?", answer: "Wells and tubewells (groundwater)" },
        { prompt: "On what kind of land are contour bunds built?", answer: "On sloping, hilly land" },
        { prompt: "Which Union Territory do the canals of the Damanganga Reservoir Project irrigate?", answer: "Dadra and Nagar Haveli" },
        { prompt: "Where in India is canal irrigation most common?", answer: "In the northern plains and the coastal deltas, where rivers flow all year" },
      ],
      traps: [
        {
          title: "Tanks and wells are opposites",
          body: "Tanks suit **hard, impervious** rock with little groundwater; wells need **porous** ground with plenty of groundwater. That is why the two are negatively related on a map. Which came first in history has nothing to do with it.",
        },
        {
          title: "Contour farming needs a slope",
          body: "Contour ploughing and bunding are for **hill slopes**. On the flat plains of Punjab and Haryana, or in the Rajasthan desert, there is no slope to plough across.",
        },
      ],
    },
  ],
};
