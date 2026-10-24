import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_FORESTS_NOTE: SubtopicNote = {
  subtopicName: "Forests and Protected Areas",
  title: "Forests and Protected Areas",
  oneLineDefinition:
    "India's forest types and their trees, the forest cover figures of the 2021 forest report, the biosphere reserves, parks and sanctuaries CDS asks about, and the forest research institutes.",
  whyItMatters:
    "Fifteen CDS questions from 2016 to 2026: 1 EASY, 8 MODERATE, 6 HARD. Ten of them came in 2023 or later, more than on any other page of this chapter, so this is where the paper is moving.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-forest-types",
      name: "Forest types and their trees",
      intuition:
        "Rain and height decide the forest. Heavy rain gives evergreen forest, medium rain gives deciduous forest that sheds its leaves in the dry season, and low rain gives thorny scrub. Climbing a Himalayan slope does the same thing as travelling north: deciduous, then temperate, then alpine. Learn one or two trees for each type.",
      definition:
        "The types:\n" +
        "- **Tropical evergreen**: very wet areas (Western Ghats, the north-east, the Andamans); rosewood, ebony, mahogany.\n" +
        "- **Tropical moist deciduous**: about 100 to 200 cm of rain; **sal**, teak, bamboo.\n" +
        "- **Tropical thorn**: under about 70 cm of rain (Rajasthan, Gujarat, the dry Deccan); **khair** (acacia), babool, cactus-like euphorbia.\n" +
        "- **Montane temperate** (about 1,500 to 3,000 m in the Himalaya): **oak, maple, birch, laurel, rhododendron**, and conifers such as **deodar** and pine.\n" +
        "- **Alpine** (above about 3,000 m): **kail** (blue pine), silver fir, juniper, birch.\n" +
        "- **Littoral and swamp** (mangrove): deltas and tidal coasts; sundari, **Sonneratia**, rhizophora. **Casuarina** is planted along the Tamil Nadu coast.\n" +
        "- **Shola**: patches of stunted evergreen forest in grassland on the high hills of the **Nilgiris**, Anaimalai and Palani hills, not the Himalaya.",
      table: {
        columns: ["Forest type", "Trees", "Where"],
        rows: [
          { cells: ["Tropical evergreen", "Rosewood, ebony, mahogany", "Western Ghats, north-east, Andamans"] },
          { cells: ["Tropical moist deciduous", "Sal, teak, bamboo", "Eastern and central India, Himalayan foothills"] },
          { cells: ["Tropical thorn", "Khair, babool, euphorbia", "Rajasthan, Gujarat, dry Deccan"] },
          {
            cells: ["Montane temperate", "Oak, maple, birch, laurel, rhododendron, deodar", "Himalaya, about 1,500 to 3,000 m"],
            noteAmber: "CDS 2023 (II): the cashew is a tropical coastal tree, not a temperate Himalayan one.",
            pyqExampleId: "b439f231-fe58-4266-b816-d0a01c369fb7",
          },
          { cells: ["Alpine", "Kail, silver fir, juniper", "Himalaya above about 3,000 m"] },
          {
            cells: ["Littoral and swamp", "Sundari, Sonneratia, rhizophora", "Sundarbans and the eastern deltas"],
            noteAmber: "CDS 2022 (II): from Bikaner to Konark the order is desert, thorn, moist deciduous, mangrove.",
            pyqExampleId: "6fb6e647-e2b9-4595-9a33-cdda58cb571b",
          },
          {
            cells: ["Shola", "Stunted evergreen trees in grassland", "Nilgiris and nearby high hills of the Western Ghats"],
            noteAmber: "CDS 2016 (II) and 2022 (II): sholas are in the Nilgiris, not the Himalaya.",
            pyqExampleId: "b555c842-783e-4feb-9eee-7f45bd798113",
          },
        ],
      },
      pyqExampleId: "b782ae9b-8d19-4806-a619-0336bc1e4917",
      selfCheckExample: {
        prompt: "Climbing a Himalayan slope from 1,000 m to 4,000 m, in what order do you pass the alpine, the temperate and the tropical deciduous forests?",
        steps: [
          "The warm foothills carry tropical deciduous forest such as sal.",
          "From about 1,500 to 3,000 m come the temperate forests of oak, maple and deodar.",
          "Above about 3,000 m come the alpine forests.",
        ],
        answer: "Tropical deciduous, then temperate, then alpine.",
      },
      practiceSet: [
        { prompt: "In which hills are shola forests found?", answer: "The Nilgiris and nearby high hills of the Western Ghats" },
        { prompt: "Name a coniferous tree of the Himalaya.", answer: "Deodar (or pine, or kail)" },
        { prompt: "Which tree is typical of moist deciduous forests?", answer: "Sal" },
        { prompt: "Along which state's coast is casuarina widely planted?", answer: "Tamil Nadu" },
      ],
      traps: [
        {
          title: "Sholas are not Himalayan",
          body: "**Shola** forests grow on the high hills of the **Nilgiris** and the Western Ghats. CDS has twice placed them on the upper Himalaya as the wrong statement.",
        },
        {
          title: "A tropical tree in a temperate list",
          body: "The **cashew** is a tropical coastal tree. Oak, maple, birch, laurel and rhododendron are the trees of the **temperate** Himalaya.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-forest-cover",
      name: "Forest cover (India State of Forest Report 2021)",
      intuition:
        "Two different questions hide here: which state has the most forest by area, and which has the most forest as a share of its land. A big state like Madhya Pradesh wins the first; a small hilly one like Mizoram wins the second.",
      definition:
        "From the India State of Forest Report 2021:\n" +
        "- Forest cover is about **21.7%** of India's area.\n" +
        "- Largest forest cover by **area**: **Madhya Pradesh**, then **Arunachal Pradesh**, **Chhattisgarh**, Odisha, Maharashtra.\n" +
        "- Highest **percentage** among states: **Mizoram**. Among all states and UTs: **Lakshadweep** (about 90%).\n" +
        "- Canopy classes: **very dense** 70% or more; **moderately dense** 40 to 70%; **open** 10 to 40%.",
      table: {
        columns: ["Measure", "Answer"],
        rows: [
          { cells: ["Forest cover of India", "About 21.7% of its area"] },
          { cells: ["Largest by area", "Madhya Pradesh, Arunachal Pradesh, Chhattisgarh"] },
          { cells: ["Highest share, states", "Mizoram"] },
          {
            cells: ["Highest share, all states and UTs", "Lakshadweep, about 90%"],
            noteAmber: "CDS 2022 (I): Lakshadweep, ahead of Mizoram, Arunachal Pradesh and Nagaland.",
            pyqExampleId: "9d2aaeb5-cf73-480f-84f2-72184e07ada8",
          },
          { cells: ["Very dense forest", "Canopy density 70% or more"] },
          { cells: ["Moderately dense forest", "Canopy density 40 to 70%"] },
          { cells: ["Open forest", "Canopy density 10 to 40%"] },
        ],
      },
      pyqExampleId: "31c250ab-a038-41d1-a8d4-76ecaceea161",
      selfCheckExample: {
        prompt: "Give the canopy density that defines very dense, moderately dense and open forest.",
        steps: [
          "Very dense: 70% or more of the ground is under the tree crowns.",
          "Moderately dense: 40 to 70%.",
          "Open: 10 to 40%.",
        ],
        answer: "Very dense 70% or more; moderately dense 40 to 70%; open 10 to 40%.",
      },
      practiceSet: [
        { prompt: "Which state has the highest percentage of its area under forest (ISFR 2021)?", answer: "Mizoram" },
        { prompt: "Which state or UT has the highest share of forest cover of all?", answer: "Lakshadweep" },
        { prompt: "About what share of India's area is under forest cover (ISFR 2021)?", answer: "About 21.7%" },
      ],
      traps: [
        {
          title: "Area is not percentage",
          body: "**Madhya Pradesh** has the most forest by **area**. **Mizoram** (among states) and **Lakshadweep** (among all units) have the highest **percentage**. Read which one the question asks for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-protected",
      name: "Biosphere reserves, parks and sanctuaries",
      intuition:
        "These are pure name-to-state facts. Most reserves sit inside one state; a few spread across a border, and those are the ones CDS asks about. Keep a short list and the state for each.",
      definition:
        "Biosphere reserves:\n" +
        "- **Nilgiri**, India's first, spreads over **three** states: Tamil Nadu, Kerala, Karnataka.\n" +
        "- **Agasthyamalai** (Kerala and Tamil Nadu) and **Achanakmar-Amarkantak** (Madhya Pradesh and Chhattisgarh) spread over two.\n" +
        "- One state each: **Seshachalam** (Andhra Pradesh), **Similipal** (Odisha), **Manas** (Assam), **Panna** (Madhya Pradesh), **Nokrek** (Meghalaya), **Dehang-Debang** (Arunachal Pradesh).\n" +
        "Parks and sanctuaries:\n" +
        "- **Keibul Lamjao** (Manipur): the only **floating** national park, on Loktak lake; home of the sangai deer.\n" +
        "- Ranthambore (Rajasthan), Gir (Gujarat), Nandankanan (Odisha).\n" +
        "- Chakrashila (Assam, golden langur), Nahar (Haryana), Kane (Arunachal Pradesh).\n" +
        "- Tiger reserves north to south: **Dudhwa** (Uttar Pradesh), **Panna** (Madhya Pradesh), **Pench** (Madhya Pradesh and Maharashtra), **Indravati** (Chhattisgarh).",
      table: {
        columns: ["Name", "Kind", "State"],
        rows: [
          {
            cells: ["Nilgiri", "Biosphere reserve", "Tamil Nadu, Kerala, Karnataka"],
            noteAmber: "CDS 2024 (I) and 2025 (I): the reserve spread over three states.",
            pyqExampleId: "32974046-8dbb-4c56-95ea-2339fa9b5cc9",
          },
          { cells: ["Agasthyamalai", "Biosphere reserve", "Kerala, Tamil Nadu"] },
          { cells: ["Achanakmar-Amarkantak", "Biosphere reserve", "Madhya Pradesh, Chhattisgarh"] },
          {
            cells: ["Seshachalam", "Biosphere reserve", "Andhra Pradesh"],
            noteAmber: "CDS 2026 (II): Seshachalam, Manas, Similipal and Panna paired in the order listed.",
            pyqExampleId: "6bc898e3-4bb9-4088-bcae-1d0e56536388",
          },
          { cells: ["Similipal", "Biosphere reserve", "Odisha"] },
          { cells: ["Manas", "Biosphere reserve", "Assam"] },
          { cells: ["Keibul Lamjao", "Floating national park", "Manipur"] },
          { cells: ["Chakrashila", "Wildlife sanctuary (golden langur)", "Assam"] },
          {
            cells: ["Dudhwa, Panna, Pench, Indravati", "Tiger reserves, north to south", "UP, MP, MP and Maharashtra, Chhattisgarh"],
            pyqExampleId: "be15dd64-e901-4819-be08-ae70203a3b8e",
          },
        ],
      },
      pyqExampleId: "95de6101-e455-488c-a2be-ed9160cab81d",
      selfCheckExample: {
        prompt: "Which two states share the Achanakmar-Amarkantak biosphere reserve?",
        steps: [
          "Amarkantak is the plateau where the Narmada and the Son rise, on the edge of Madhya Pradesh.",
          "Achanakmar lies across the border in Chhattisgarh.",
        ],
        answer: "Madhya Pradesh and Chhattisgarh.",
      },
      practiceSet: [
        { prompt: "Which biosphere reserve spreads over three states?", answer: "Nilgiri" },
        { prompt: "Which animal is Chakrashila sanctuary in Assam known for?", answer: "The golden langur" },
        { prompt: "In which state is the Similipal biosphere reserve?", answer: "Odisha" },
        { prompt: "Which is farthest north: Panna, Dudhwa or Pench tiger reserve?", answer: "Dudhwa" },
      ],
      traps: [
        {
          title: "Keibul Lamjao is in Manipur",
          body: "**Keibul Lamjao**, the floating park, lies on **Loktak lake in Manipur**. It is not in Arunachal Pradesh.",
        },
        {
          title: "Agasthyamalai spans two states, not three",
          body: "**Agasthyamalai** covers Kerala and Tamil Nadu only. The reserve spread over **three** states is **Nilgiri**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-forest-institutes",
      name: "Forest research institutes",
      intuition:
        "The forest research institutes are placed where their forests are: the rain forest institute in Assam, the Himalayan one in the hills, the arid one in the Thar. Ask what the institute studies and its city follows.",
      definition:
        "Institutes of the Indian Council of Forestry Research and Education:\n" +
        "- **Forest Research Institute**: Dehradun.\n" +
        "- **Tropical Forest Research Institute**: Jabalpur.\n" +
        "- **Rain Forest Research Institute**: Jorhat.\n" +
        "- **Himalayan Forest Research Institute**: Shimla.\n" +
        "- **Arid Forest Research Institute**: Jodhpur.\n" +
        "- **Institute of Wood Science and Technology**: Bengaluru.\n" +
        "- **Institute of Forest Genetics and Tree Breeding**: Coimbatore.\n" +
        "- **Forest Research Centre for Eco-Rehabilitation**: Prayagraj.",
      table: {
        columns: ["Institute", "City"],
        rows: [
          { cells: ["Forest Research Institute", "Dehradun"] },
          { cells: ["Tropical Forest Research Institute", "Jabalpur"] },
          { cells: ["Rain Forest Research Institute", "Jorhat"] },
          { cells: ["Himalayan Forest Research Institute", "Shimla"] },
          { cells: ["Arid Forest Research Institute", "Jodhpur"] },
          { cells: ["Institute of Wood Science and Technology", "Bengaluru"] },
          { cells: ["Institute of Forest Genetics and Tree Breeding", "Coimbatore"] },
          { cells: ["Forest Research Centre for Eco-Rehabilitation", "Prayagraj"] },
        ],
      },
      pyqExampleId: "edb70c3e-dfb9-4264-a5ff-e79478eb431a",
      selfCheckExample: {
        prompt: "Why does it make sense for the Arid Forest Research Institute to be in Jodhpur?",
        steps: [
          "The institute studies forests of dry, desert lands.",
          "Jodhpur is on the edge of the Thar desert.",
        ],
        answer: "Jodhpur is in the Thar, so the dry-zone forests it studies are close by.",
      },
      practiceSet: [
        { prompt: "In which city is the Forest Research Institute?", answer: "Dehradun" },
        { prompt: "In which city is the Institute of Wood Science and Technology?", answer: "Bengaluru" },
        { prompt: "In which city is the Institute of Forest Genetics and Tree Breeding?", answer: "Coimbatore" },
      ],
      traps: [
        {
          title: "Jabalpur and Jorhat are easy to swap",
          body: "The **Tropical** Forest Research Institute is in **Jabalpur** (central India). The **Rain** Forest Research Institute is in **Jorhat** (Assam).",
        },
      ],
    },
  ],
};
