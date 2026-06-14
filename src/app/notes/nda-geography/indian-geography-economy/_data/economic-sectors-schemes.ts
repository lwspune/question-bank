import type { SubtopicNote } from "@/app/notes/_types";

export const ECONOMIC_SECTORS_SCHEMES_NOTE: SubtopicNote = {
  subtopicName: "Economic Sectors and Government Schemes",
  title: "Economic Sectors and Government Schemes",
  oneLineDefinition:
    "The five tiers of economic activity, India's flagship development schemes, and the census-and-demography facts that recur every year.",
  whyItMatters:
    "Around 15 PYQs once the demography questions misfiled elsewhere are folded in, with a HARD streak in the Census-2011 ranking questions. Three things pay: the primary-to-quinary activity ladder (quaternary = knowledge work, quinary = top decision-making), the named schemes (Bharatmala, classification of resources), and the Census-2011 superlatives (least-populated state, lowest density, negative-growth state). The census rankings are pure memorisation — drill the extremes.",
  concepts: [
    // 1. FOUNDATION — sectors of the economy (formula, reasoning)
    {
      kind: "formula" as const,
      slug: "economic-sectors",
      name: "Primary to quinary — the tiers of economic activity",
      intuition:
        "Economic activity is layered. PRIMARY extracts from nature (farming, mining, fishing). SECONDARY makes things (manufacturing). TERTIARY provides services (trade, transport, banking). QUATERNARY is knowledge work — research, information, the creation and interpretation of ideas. QUINARY is the very top — the high-level decision-makers (CEOs, top officials, senior scientists). The exam's trick is the quaternary/quinary line: 'creation, rearrangement and interpretation of ideas' is quaternary, not tertiary.",
      definition:
        "- **Primary** — extraction from nature: agriculture, mining, fishing, forestry.\n" +
        "- **Secondary** — manufacturing and construction.\n" +
        "- **Tertiary** — services: trade, transport, banking, education.\n" +
        "- **Quaternary** — knowledge/information activities: research, R&D, **creation, rearrangement and interpretation of new and existing ideas**.\n" +
        "- **Quinary** — the highest decision-making: top executives, senior officials, lawmakers.",
      authoredExample: {
        prompt:
          "Activities focussed on the creation, rearrangement and interpretation of new and existing ideas are which type of activity?",
        steps: [
          "Idea-creation and interpretation is knowledge work, not direct service delivery.",
          "Tertiary is ordinary services; quinary is top decision-making.",
          "Knowledge/information work is the quaternary tier.",
        ],
        answer: "Quaternary activities.",
      },
      selfCheckExample: {
        prompt:
          "Mining and fishing belong to which sector of the economy?",
        steps: [
          "Both take resources directly from nature.",
          "That extraction tier is the primary sector.",
        ],
        answer: "The primary sector.",
      },
      practiceSet: [
        { prompt: "Manufacturing belongs to which sector?", answer: "Secondary" },
        { prompt: "R&D and information work is which tier?", answer: "Quaternary" },
        { prompt: "Top CEOs and lawmakers are in which tier?", answer: "Quinary" },
      ],
      pyqExampleId: "ab81e7f9-c1c7-47fe-836b-35a7adc965cf", // creation/interpretation of ideas = quaternary
      traps: [
        {
          title: "Quaternary vs quinary",
          body:
            "Both sit above ordinary services. **Quaternary** = knowledge/information work (research, idea creation). **Quinary** = the small elite of top decision-makers. 'Interpretation of ideas' is quaternary.",
        },
      ],
    },

    // 2. government schemes + resource classification (REFERENCE)
    {
      kind: "reference" as const,
      slug: "schemes-resources",
      name: "Flagship schemes and resource classification",
      intuition:
        "A cluster of named-scheme facts. BHARATMALA is the National Highways network programme (road connectivity), not river-linking. The classification-of-resources match is logical once you sort by renewability: solar (basic inexhaustible), coal (conventional non-renewable), hydel (non-conventional renewable), natural gas. The National Water Academy — a water-resource training centre — is at Pune. Learn what each scheme actually does and the 'related to' questions are easy.",
      definition:
        "- **Bharatmala Pariyojana / Project** — a programme to build and improve **National Highways** (road connectivity), NOT river-linking or rail.\n" +
        "- **Classification of resources** — basic inexhaustible → solar energy; conventional non-renewable → coal; non-conventional renewable → hydel power; non-conventional non-renewable → natural gas.\n" +
        "- **National Water Academy** — water-resource training centre at **Pune**.\n" +
        "- **Indian Academy of Highway Engineers** — a **registered society** (statement 1 correct), but the second claim about it being a Centre+State collaborative body is the wrong clause.",
      table: {
        columns: ["Scheme / item", "What it is"],
        rows: [
          {
            cells: ["**Bharatmala**", "National Highways network programme"],
            noteAmber: "NDA 2021 — Bharatmala = networks of National Highways.",
          },
          { cells: ["Solar energy", "Basic inexhaustible resource"] },
          { cells: ["Coal", "Conventional non-renewable resource"] },
          { cells: ["National Water Academy", "Pune (water-resource training)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Bharatmala Pariyojana is related to which of these?",
        steps: [
          "Bharatmala is a flagship roads programme of the highways ministry.",
          "It builds and upgrades the National Highways network — not rivers or railways.",
        ],
        answer: "Networks of National Highways in India.",
      },
      practiceSet: [
        { prompt: "Bharatmala Project is related to what?", answer: "Road connectivity (National Highways)" },
        { prompt: "Where is the National Water Academy located?", answer: "Pune" },
        { prompt: "Solar energy is which class of resource?", answer: "Basic inexhaustible" },
      ],
      pyqExampleId: "35a0136c-816f-44f7-b3b6-bb01e80eb565", // Bharatmala = National Highways
    },

    // 3. census and demography (REFERENCE)
    {
      kind: "reference" as const,
      slug: "census-demography",
      name: "Census 2011 — population superlatives",
      intuition:
        "The hardest questions in this subtopic are Census-2011 rankings, and they reward rote memory of the extremes. The least-populated big state is Sikkim overall (Punjab is the answer when Sikkim is not an option among the larger states), Sikkim has the lowest population density, and among the major states only Nagaland recorded NEGATIVE population growth in 2001–11. Lock the extremes (highest, lowest, only-negative) rather than the full ordered list.",
      definition:
        "- **Lowest population density (2011)** — **Sikkim** (among small states/UTs listed).\n" +
        "- **Negative population growth (2001–11)** — **Nagaland** (the only major state to record a decline).\n" +
        "- **Sex ratio (NE states, descending)** — Meghalaya > Manipur > Mizoram > Tripura.\n" +
        "- **Highest female literacy among UTs** — **Lakshadweep**.\n" +
        "- Indian languages fall into chiefly **two** major language families (Indo-Aryan and Dravidian).",
      table: {
        columns: ["Superlative", "Answer"],
        rows: [
          {
            cells: ["Lowest population density", "Sikkim"],
            noteAmber: "NDA 2017 — lowest density among the listed states.",
          },
          {
            cells: ["Negative population growth (2001–11)", "Nagaland"],
            noteAmber: "NDA 2018 (Sep) — only Nagaland recorded a decline.",
          },
          { cells: ["Highest female literacy (UT)", "Lakshadweep"] },
          { cells: ["Major language families", "Two (chiefly)"] },
        ],
      },
      selfCheckExample: {
        prompt: "As per Census 2011, which state had the lowest population density: Sikkim, Nagaland, Manipur, Mizoram?",
        steps: [
          "Population density is people per square kilometre.",
          "Among these hilly, sparsely-settled states, Sikkim is the most thinly populated by area.",
        ],
        answer: "Sikkim.",
      },
      practiceSet: [
        { prompt: "Which state had the lowest population density in 2011?", answer: "Sikkim" },
        { prompt: "Which UT has the highest female literacy?", answer: "Lakshadweep" },
        { prompt: "Indian languages belong to how many major families?", answer: "Two (chiefly)" },
      ],
      pyqExampleId: "c99d5160-9c58-4fc0-a5a7-cc29b13bfde5", // negative growth = Nagaland
      traps: [
        {
          title: "Memorise the extremes, not the full order",
          body:
            "The NDA asks ascending/descending rankings of states by population share, sex ratio or density. You can usually answer by knowing only the top and bottom (e.g. Nagaland = only negative growth, Sikkim = lowest density) and eliminating.",
        },
      ],
    },

    // 4. trade, tribes, wildlife geography (REFERENCE)
    {
      kind: "reference" as const,
      slug: "trade-tribes-wildlife",
      name: "Trade partners, tribes and ordered geography",
      intuition:
        "A grab-bag of socio-economic recall. India's largest trading partner in 2015-16 was the USA. Tribe-to-state pairs: Tharu belongs to UP/Uttarakhand (NOT Madhya Pradesh — the wrong pair), Adi to Arunachal, Irula to Tamil Nadu/Kerala. And the 'order from north to south' questions test mental geography: tiger reserves Corbett (north) → Sariska → Simlipal → Periyar (south).",
      definition:
        "- **Largest trading partner (2015-16)** — **USA**.\n" +
        "- **Tribe-state pairs** — Adi = Arunachal Pradesh, Irula = south India, Shaharia = Rajasthan. **Tharu : Madhya Pradesh is WRONG** (Tharu live in the UP/Uttarakhand terai).\n" +
        "- **Tiger reserves, north → south** — Corbett → Sariska → Simlipal → Periyar.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Largest trading partner 2015-16", "USA"] },
          {
            cells: ["**Tharu : Madhya Pradesh**", "WRONG pair (Tharu = UP/Uttarakhand terai)"],
            noteAmber: "NDA 2017 — Tharu : Madhya Pradesh is the incorrectly-matched pair.",
          },
          {
            cells: ["Tiger reserves N→S", "Corbett → Sariska → Simlipal → Periyar"],
            noteAmber: "NDA 2017 — correct north-to-south order.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which Tribe-State pair is NOT correctly matched: Tharu:Madhya Pradesh, Adi:Arunachal Pradesh, Irula:Kerala, Shaharia:Rajasthan?",
        steps: [
          "Adi (Arunachal), Irula (south India) and Shaharia (Rajasthan) are correct.",
          "The Tharu live in the UP/Uttarakhand terai, not Madhya Pradesh.",
        ],
        answer: "Tharu : Madhya Pradesh.",
      },
      practiceSet: [
        { prompt: "India's largest trading partner in 2015-16?", answer: "USA" },
        { prompt: "The Adi tribe belongs to which state?", answer: "Arunachal Pradesh" },
        { prompt: "Northernmost of Corbett/Sariska/Simlipal/Periyar?", answer: "Corbett" },
      ],
      pyqExampleId: "429087e8-dbab-42d9-8193-3bcee73c8425", // Tharu:MP wrong pair
    },
  ],
};
