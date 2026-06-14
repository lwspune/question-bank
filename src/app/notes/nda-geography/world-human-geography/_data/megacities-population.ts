import type { SubtopicNote } from "@/app/notes/_types";

export const MEGACITIES_POPULATION_NOTE: SubtopicNote = {
  subtopicName: "Human Geography — Megacities and Population",
  title: "Human Geography — Megacities, Population and World Places",
  oneLineDefinition:
    "Megacities and the three population-density measures, plus the world-places gazetteer the NDA draws on — deserts, mountains, island groups, landlocked countries and the headquarters of global organisations.",
  whyItMatters:
    "15 PYQs — the largest cluster in the chapter and the broadest. Two themes are conceptual: what makes a megacity (New York was the first) and the three density measures (population, physiological, agricultural). The rest is a world gazetteer of named facts — driest desert (Atacama), the Caucasus between the Caspian and Black Seas, New Zealand in Polynesia, Armenia is landlocked, the WMO is in Geneva. Drill the tables; coverage is the whole game here.",
  concepts: [
    // 1. megacities + density measures (formula, no box)
    {
      kind: "formula" as const,
      slug: "megacities-and-density",
      name: "Megacities and population density",
      intuition:
        "A megacity is a very large urban agglomeration — by the common cut-off, a population of over 10 million. New York was the first city to reach megacity status. 'Density' is not one number but three, depending on what you divide the population by: spread it over the TOTAL area (population density), over the NET CULTIVABLE area (physiological density), or count only the FARMING population over cultivable land (agricultural density).",
      definition:
        "- **Megacity** — a metropolitan area with a very large population (commonly defined as **over 10 million**). **New York** was the **first** city to attain megacity status.\n" +
        "- **Population density** = total population ÷ **total area**.\n" +
        "- **Physiological density** = total population ÷ **net cultivable area**.\n" +
        "- **Agricultural density** = total **agricultural** population ÷ net cultivable area.\n" +
        "(All three definitions above are correct as stated in the PYQ.)",
      authoredExample: {
        prompt:
          "Which density measure divides the total population by the net cultivable area (not the total area)?",
        steps: [
          "Population density uses the total area.",
          "Agricultural density uses only the farming population.",
          "The measure that uses total population over cultivable land is physiological density.",
        ],
        answer: "Physiological density.",
      },
      selfCheckExample: {
        prompt: "Which city was the first to become a megacity: London, Paris, New York or Washington?",
        steps: [
          "A megacity is an urban area exceeding ~10 million people.",
          "New York reached that scale first among the options.",
        ],
        answer: "New York.",
      },
      practiceSet: [
        { prompt: "What is the common population cut-off for a megacity?", answer: "Over 10 million" },
        { prompt: "Which city was the first megacity?", answer: "New York" },
        { prompt: "Population density divides total population by what?", answer: "Total area" },
        { prompt: "Agricultural density uses which population?", answer: "The agricultural (farming) population" },
      ],
      pyqExampleId: "cc6708e3-354a-4632-9364-d1fcfdd0d0d3", // first megacity = New York
    },

    // 2. world deserts + nicknames (reference)
    {
      kind: "reference" as const,
      slug: "world-deserts-nicknames",
      name: "World deserts and country nicknames",
      intuition:
        "The NDA returns to a small set of named deserts and country nicknames. The Atacama (in Chile/South America) is the world's DRIEST desert; the Taklamakan is a cold desert of Central Asia (in western China). Among nicknames, Denmark is called the 'country of winds' for its strong, persistent westerlies and wind-power use.",
      definition:
        "- **Atacama** — the world's **driest** desert (Chile, South America).\n" +
        "- **Taklamakan** — a cold desert of **Central Asia** (Xinjiang, China).\n" +
        "- **Sahara** (Africa) and **Gobi** (Mongolia/China) and **Kalahari** (southern Africa) are large but NOT the driest.\n" +
        "- **Denmark** — the **'country of winds'** (strong westerlies; a wind-energy leader).",
      table: {
        columns: ["Place", "Fact"],
        rows: [
          {
            cells: ["**Atacama**", "World's driest desert (South America)"],
            noteAmber: "NDA 2018 — Atacama is the driest desert, not the Sahara or Gobi.",
          },
          {
            cells: ["**Taklamakan**", "Cold desert of Central Asia (China)"],
            noteAmber: "NDA 2017 — Taklamakan is in Central Asia.",
          },
          {
            cells: ["**Denmark**", "Called the 'country of winds'"],
            noteAmber: "NDA 2020 — Denmark is the 'country of winds'.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which is the driest desert in the world: Atacama, Gobi, Sahara or Kalahari?",
        steps: [
          "The Gobi and Sahara are vast but receive more moisture than the Atacama.",
          "The Atacama in Chile is famously the driest.",
        ],
        answer: "Atacama.",
      },
      practiceSet: [
        { prompt: "Name the world's driest desert.", answer: "Atacama" },
        { prompt: "In which region is the Taklamakan Desert?", answer: "Central Asia" },
        { prompt: "Which country is the 'country of winds'?", answer: "Denmark" },
      ],
      pyqExampleId: "e6257954-f00b-40e7-8335-f77c8e3a3d1a", // driest desert = Atacama
      traps: [
        {
          title: "Driest is not the same as biggest",
          body:
            "The **Sahara** is the largest hot desert and the **Gobi** is huge, but the **driest** desert is the **Atacama**. Don't pick on size.",
        },
      ],
    },

    // 3. world physical places (reference)
    {
      kind: "reference" as const,
      slug: "world-physical-places",
      name: "Rivers, mountains, oceans and island groups",
      intuition:
        "A grab-bag of physical-geography place facts the NDA likes: where a famous delta is, which mountain range separates two seas, what two oceans a canal links, which Pacific island group a country belongs to, and which city is linked to a particular activity. These are pure map memory.",
      definition:
        "- **Mekong Delta** — located in **Vietnam** (the Mekong's mouth on the South China Sea).\n" +
        "- **Caucasus** — the mountain range lying **between the Caspian Sea and the Black Sea** (Carpathians, Apennines and Elburz do not).\n" +
        "- **Panama Canal** — links the **Atlantic Ocean and the Pacific Ocean**.\n" +
        "- **New Zealand** — part of the **Polynesia** island group of the Pacific.\n" +
        "- **Adelaide** (Australia) — associated with **viticulture** (grape/wine growing).",
      table: {
        columns: ["Place", "Fact"],
        rows: [
          { cells: ["Mekong Delta", "**Vietnam**"] },
          {
            cells: ["**Caucasus** Mountains", "Lie between the Caspian Sea and the Black Sea"],
            noteAmber: "NDA 2020 — the Caucasus separates the Caspian and Black Seas.",
          },
          {
            cells: ["**Panama Canal**", "Links the Atlantic and Pacific Oceans"],
            noteAmber: "NDA 2020 — Panama joins the Atlantic to the Pacific.",
          },
          { cells: ["New Zealand", "Part of **Polynesia**"] },
          { cells: ["Adelaide", "Known for viticulture (wine)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which mountain range lies between the Caspian Sea and the Black Sea?",
        steps: [
          "The Carpathians and Apennines are in Europe, away from these seas.",
          "The range running between the Caspian and the Black Sea is the Caucasus.",
        ],
        answer: "The Caucasus.",
      },
      practiceSet: [
        { prompt: "In which country is the Mekong Delta?", answer: "Vietnam" },
        { prompt: "New Zealand belongs to which Pacific island group?", answer: "Polynesia" },
        { prompt: "The Panama Canal links which two oceans?", answer: "Atlantic and Pacific" },
        { prompt: "Which Australian city is known for viticulture?", answer: "Adelaide" },
      ],
      pyqExampleId: "3698ba33-e63b-4197-ab58-16b12f11c950", // Caucasus between Caspian & Black Sea
    },

    // 4. landlocked countries (formula, no box)
    {
      kind: "formula" as const,
      slug: "landlocked-countries",
      name: "Landlocked countries",
      intuition:
        "A landlocked country has no coastline — no direct access to the sea or ocean. To pick the landlocked one from a list, ask which country is fully surrounded by other countries' land. Among Syria, Jordan, Azerbaijan and Armenia, only Armenia is landlocked (Syria has a Mediterranean coast, Jordan touches the Red Sea at Aqaba, and Azerbaijan borders the Caspian Sea — which counts as sea access in the PYQ).",
      definition:
        "- A **landlocked** country has **no direct access to the sea or ocean** — it is enclosed by land.\n" +
        "- Among Syria, Jordan, Azerbaijan and Armenia, only **Armenia** is landlocked.\n" +
        "- Note the borderline cases: **Syria** (Mediterranean coast), **Jordan** (Red Sea at Aqaba) and **Azerbaijan** (Caspian Sea coast) all have water access.",
      authoredExample: {
        prompt:
          "Of Syria, Jordan, Azerbaijan and Armenia, which has NO direct access to the sea or ocean?",
        steps: [
          "Syria has a Mediterranean coastline.",
          "Jordan reaches the Red Sea at Aqaba; Azerbaijan borders the Caspian Sea.",
          "Armenia is surrounded entirely by land.",
        ],
        answer: "Armenia.",
      },
      selfCheckExample: {
        prompt: "What does 'landlocked' mean?",
        steps: [
          "Locked in by land on all sides.",
          "It means having no coastline / no direct sea access.",
        ],
        answer: "Having no direct access to the sea or ocean.",
      },
      practiceSet: [
        { prompt: "Which of Syria, Jordan, Azerbaijan, Armenia is landlocked?", answer: "Armenia" },
        { prompt: "Does a landlocked country have a coastline?", answer: "No" },
        { prompt: "Which sea does Azerbaijan border?", answer: "The Caspian Sea" },
      ],
      pyqExampleId: "6c357024-e6f2-4ca5-a65e-a222b867c399", // no direct sea access = Armenia
    },

    // 5. organisations + environment conventions (reference)
    {
      kind: "reference" as const,
      slug: "organisations-environment",
      name: "Global organisations and environmental conventions",
      intuition:
        "The NDA tests the seats of global organisations and the cities/years tied to environmental conventions. The World Meteorological Organization is headquartered in Geneva; the Cartagena Protocol on Biosafety (2000) takes its name from Cartagena; acid precipitation is the big environmental issue in eastern Canada; and the Biosphere Reserve idea was launched by UNESCO in 1973–74.",
      definition:
        "- **World Meteorological Organization (WMO)** — headquarters in **Geneva**, Switzerland.\n" +
        "- **Cartagena Protocol on Biosafety (2000)** — under the Convention on Biological Diversity; named after **Cartagena**.\n" +
        "- **Acid precipitation (acid rain)** — a major environmental issue in **eastern Canada**.\n" +
        "- **Biosphere Reserves** — the concept was initiated by **UNESCO in 1973–74**; India has many, but NOT all are in the UNESCO world network (so 'all are included' is the false statement).",
      table: {
        columns: ["Topic", "Fact"],
        rows: [
          {
            cells: ["WMO headquarters", "**Geneva**"],
            noteAmber: "NDA 2017 — the World Meteorological Organization is in Geneva.",
          },
          {
            cells: ["**Cartagena** Protocol (2000)", "Biosafety, under the Convention on Biological Diversity"],
            noteAmber: "NDA 2020 — the Biosafety Protocol is the Cartagena Protocol.",
          },
          { cells: ["Eastern Canada issue", "**Acid precipitation**"] },
          {
            cells: ["Biosphere Reserve idea", "UNESCO, **1973–74**"],
            noteAmber: "NDA 2020 — true: UNESCO 1973–74; false: 'all Indian reserves are in the UNESCO network'.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Where is the headquarters of the World Meteorological Organization?",
        steps: [
          "Many UN/global scientific bodies cluster in Geneva.",
          "The WMO is one of them.",
        ],
        answer: "Geneva.",
      },
      practiceSet: [
        { prompt: "Where is the WMO headquartered?", answer: "Geneva" },
        { prompt: "The 2000 Biosafety Protocol is named after which city?", answer: "Cartagena" },
        { prompt: "Which body initiated the Biosphere Reserve concept (1973–74)?", answer: "UNESCO" },
        { prompt: "Name the major environmental issue in eastern Canada.", answer: "Acid precipitation" },
      ],
      pyqExampleId: "5b10d5cc-8330-42b3-8ae6-05822b75372d", // WMO HQ = Geneva
      traps: [
        {
          title: "'All Indian Biosphere Reserves are in the UNESCO network' is FALSE",
          body:
            "The UNESCO 1973–74 origin is true, but the claim that **every** Indian Biosphere Reserve is in the UNESCO world network is false — only some are. That is the statement to reject.",
        },
      ],
    },
  ],
};
