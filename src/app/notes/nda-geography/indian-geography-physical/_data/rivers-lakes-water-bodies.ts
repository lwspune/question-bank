import type { SubtopicNote } from "@/app/notes/_types";

export const RIVERS_LAKES_WATER_BODIES_NOTE: SubtopicNote = {
  subtopicName: "Indian Rivers, Lakes and Water Bodies",
  title: "Indian Rivers, Lakes and Water Bodies",
  oneLineDefinition:
    "India's drainage splits into the snow-fed, perennial Himalayan rivers (Indus, Ganga, Brahmaputra systems) and the rain-fed Peninsular rivers (Godavari, Krishna, Narmada, Tapti), with a scatter of famous lakes and a growing inland-waterway network.",
  whyItMatters:
    "27 PYQs — by far the most-tested topic in the chapter. The marks come from (1) river origins and which system a river belongs to, (2) tributary matching, (3) east- vs west-flowing rivers, (4) named lakes and their states, and (5) river-feature recall — alternative names, confluences, dams and river islands. The HARD items are the 'how many statements are correct' river questions. Build the river family trees and the feature tables cold.",
  concepts: [
    // 1. Himalayan vs Peninsular rivers + origins (formula)
    {
      kind: "formula" as const,
      slug: "himalayan-peninsular-systems",
      name: "Himalayan vs Peninsular river systems and their origins",
      intuition:
        "Two great families. **Himalayan rivers** (Indus, Ganga, Brahmaputra) are snow- and glacier-fed, perennial, and several rise BEYOND the main Himalayas in Tibet — the Indus, Satluj and Brahmaputra are 'antecedent' rivers (older than the mountains they cut through). The **Ganga** is the exception: it rises ON THIS SIDE of the Himalayas (Gangotri), not across them. **Peninsular rivers** are rain-fed and seasonal.",
      definition:
        "- **Himalayan rivers** — perennial, snow-fed. **Indus, Satluj and Brahmaputra rise across the Himalayas in Tibet**; the **Ganga rises on the Indian side** (Gangotri glacier) — so it does NOT originate from across the Himalayas.\n" +
        "- **Antecedent rivers** — existed BEFORE the Himalayas rose and kept cutting down as the range lifted: **Indus, Satluj, Brahmaputra**.\n" +
        "- **Brahmaputra** — rises in Tibet near **Lake Mansarovar** (as the Tsangpo), takes a sharp 'U' turn near **Namcha Barwa**, and enters India through a gorge (called the **Dihang/Siang**).\n" +
        "- **Peninsular rivers** — rain-fed, seasonal; flow on the old plateau (Godavari, Krishna, Narmada, Tapti, Mahanadi).",
      authoredExample: {
        prompt:
          "Which Himalayan river does NOT originate from across the Himalayas — Indus, Satluj, Ganga or Brahmaputra?",
        steps: [
          "Indus, Satluj and Brahmaputra all rise in Tibet, beyond the main range.",
          "The Ganga rises from the Gangotri glacier on the Indian side.",
          "So the Ganga is the one not coming from across the Himalayas.",
        ],
        answer: "The Ganga.",
      },
      selfCheckExample: {
        prompt:
          "Two statements: (1) the Brahmaputra rises in Tibet near Lake Mansarovar; (2) it takes a 'U' turn near Namcha Barwa and enters India through a gorge. Which are correct?",
        steps: [
          "The Tsangpo/Brahmaputra does rise near Mansarovar in Tibet — (1) correct.",
          "It swings around Namcha Barwa and enters India as the Dihang through a gorge — (2) correct.",
        ],
        answer: "Both 1 and 2.",
      },
      practiceSet: [
        { prompt: "Which of Indus/Satluj/Ganga/Brahmaputra rises on the Indian side?", answer: "Ganga (Gangotri glacier)" },
        { prompt: "Name the three antecedent Himalayan rivers.", answer: "Indus, Satluj, Brahmaputra" },
        { prompt: "Near which peak does the Brahmaputra take its 'U' turn?", answer: "Namcha Barwa" },
      ],
      pyqExampleId: "4a36b6dd-a8a0-4435-be35-0481a941501e", // Ganga not across Himalayas
      traps: [
        {
          title: "The Ganga is the odd one out",
          body:
            "In 'which Himalayan river does NOT rise across the Himalayas', the answer is the **Ganga** — it begins at Gangotri on the Indian side. Indus, Satluj and Brahmaputra all come from Tibet.",
        },
      ],
    },

    // 2. Indus system facts (formula)
    {
      kind: "formula" as const,
      slug: "indus-system",
      name: "The Indus system and its rivers",
      intuition:
        "The Indus is the western Himalayan giant. Its big tributaries are the five 'Punjab' rivers — Jhelum, Chenab, Ravi, Beas, Satluj. The exam tests their Tibetan names and confluences: the Satluj is the Langchen Khambab in Tibet and is antecedent; the Jhelum was once called Vitasta; and the Beas joins the Satluj.",
      definition:
        "- **Tributaries of the Indus** — Jhelum, Chenab, Ravi, **Beas**, Satluj (the Punjab rivers). The **Tawi** is NOT an Indus tributary in the 'five rivers' sense the bank tests.\n" +
        "- **Satluj** — rises in Tibet as the **Langchen Khambab**; it is a classic **antecedent** river. (The **Indus** itself is the largest river of the system, not the Jhelum.)\n" +
        "- **Beas** — flows through Himachal and Punjab and **joins the Satluj**.\n" +
        "- **Jhelum** — was earlier known as **Vitasta**; hydro projects **Bagalihar, Dulhasti and Salal** are on the **Chenab**.",
      authoredExample: {
        prompt:
          "Two facts about the Indus system: the Satluj rises in Tibet as the Langchen Khambab, and the Satluj is a classic antecedent river. Are these correct?",
        steps: [
          "The Satluj's Tibetan name is indeed Langchen Khambab — correct.",
          "It cut its valley as the Himalayas rose, so it is antecedent — correct.",
        ],
        answer: "Both are correct.",
      },
      selfCheckExample: {
        prompt: "Which one is NOT a tributary of the Indus: Beas, Ravi, Chenab, Tawi?",
        steps: [
          "Beas, Ravi and Chenab are all Punjab rivers feeding the Indus.",
          "The Tawi is a small river of the Jammu region, not one of the five Indus tributaries tested.",
        ],
        answer: "Tawi.",
      },
      practiceSet: [
        { prompt: "Beas joins which river?", answer: "Satluj" },
        { prompt: "The Jhelum was earlier known as?", answer: "Vitasta" },
        { prompt: "Bagalihar, Dulhasti and Salal projects are on which river?", answer: "Chenab" },
      ],
      pyqExampleId: "61e05d6b-add7-4e99-9004-d51a67e85422", // Indus system facts
    },

    // 3. tributaries (reference)
    {
      kind: "reference" as const,
      slug: "river-tributaries",
      name: "Rivers and their tributaries",
      intuition:
        "Tributary-matching is a recall staple. Learn the family trees: the Godavari takes the Indravati and Manjra; the Kaveri takes the Hemavati, Kabini, Arkavati and Amravati (but NOT the Indravati); the Brahmaputra takes the Manas, Kameng and Subansiri (but NOT the Mahananda).",
      definition:
        "- **Kaveri (Cauvery)** tributaries: Hemavati, Kabini, Arkavati, Amravati. The **Indravati is NOT a Kaveri tributary** — it belongs to the Godavari.\n" +
        "- **Godavari** tributaries: Indravati, Manjra, Penganga.\n" +
        "- **Krishna** tributaries: Bhima, Tungabhadra.\n" +
        "- **Brahmaputra** tributaries: Manas, Kameng, Subansiri. The **Mahananda is NOT a Brahmaputra tributary**.",
      table: {
        columns: ["River", "Tributaries", "Watch-out"],
        rows: [
          {
            cells: ["Kaveri", "Hemavati, Kabini, Arkavati, Amravati", "**Indravati** is NOT a Kaveri tributary (it is Godavari's)"],
            noteAmber: "Indravati is the impostor in a Kaveri-tributary list.",
          },
          { cells: ["Godavari", "Indravati, Manjra, Penganga", "Penganga is Godavari's, NOT Ganga's"] },
          { cells: ["Krishna", "Bhima, Tungabhadra", "—"] },
          {
            cells: ["Brahmaputra", "Manas, Kameng, Subansiri", "**Mahananda** is NOT a tributary"],
            noteAmber: "NDA 2021 — Mahananda is the odd one out in a Brahmaputra-tributary list.",
            pyqExampleId: "ea75e31d-fb5a-45bf-ab43-7eb943719e37",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which is NOT a tributary of the Kaveri: Hemavati, Arkavati, Indravati, Amravati?",
        steps: [
          "Hemavati, Arkavati and Amravati all join the Kaveri.",
          "Indravati is a Godavari tributary.",
        ],
        answer: "Indravati.",
      },
      practiceSet: [
        { prompt: "Indravati is a tributary of which river?", answer: "Godavari" },
        { prompt: "Is Penganga a tributary of the Ganga?", answer: "No — of the Godavari" },
        { prompt: "Which is NOT a Brahmaputra tributary: Manas, Kameng, Mahananda, Subansiri?", answer: "Mahananda" },
      ],
      pyqExampleId: "498697ee-b2b8-46d8-9479-05cef1d45fe8", // Deccan tributaries matched
      traps: [
        {
          title: "Penganga ≠ Ganga; Indravati ≠ Kaveri",
          body:
            "Two recurring swaps: the **Penganga** sounds like the Ganga but is a **Godavari** tributary; the **Indravati** is a **Godavari** tributary, never the Kaveri's. Match by the river family tree, not by the name's sound.",
        },
      ],
    },

    // 4. east vs west flowing (formula)
    {
      kind: "formula" as const,
      slug: "east-west-flowing",
      name: "East-flowing vs west-flowing peninsular rivers",
      intuition:
        "On the Peninsula, most big rivers flow EAST into the Bay of Bengal and build deltas (Godavari, Krishna, Kaveri, Mahanadi, Palar, Pennar). Two large rivers flow WEST into the Arabian Sea WITHOUT deltas — the Narmada and Tapti — because they run through rift valleys. The small Kerala rivers (Periyar, Bharatpuzha, Pamba) also flow west; the Tamraparni flows east.",
      definition:
        "- **East-flowing** (into the Bay of Bengal, with deltas): Godavari, Krishna, Kaveri, Mahanadi, **Palar, Pennar, Tamraparni**.\n" +
        "- **West-flowing** (into the Arabian Sea, no deltas — they run in rift valleys / steep coast): **Narmada, Tapti**, and the Kerala rivers **Periyar, Bharatpuzha, Pamba**.\n" +
        "- The **Kalinadi** of Karnataka flows west; the **Periyar** flows west too — so in an east-flowing list, those are the impostors.",
      authoredExample: {
        prompt:
          "From Palar, Periyar, Pennar and Kalinadi, which are EAST-flowing rivers?",
        steps: [
          "Palar and Pennar drain east into the Bay of Bengal.",
          "Periyar (Kerala) and Kalinadi (Karnataka) drain west into the Arabian Sea.",
          "So the east-flowing ones are Palar and Pennar.",
        ],
        answer: "Palar and Pennar.",
      },
      selfCheckExample: {
        prompt: "Which one is NOT a west-flowing river: Periyar, Bharatpuzha, Pamba, Tamraparni?",
        steps: [
          "Periyar, Bharatpuzha and Pamba are Kerala rivers draining west.",
          "The Tamraparni of Tamil Nadu drains east into the Bay of Bengal.",
        ],
        answer: "Tamraparni.",
      },
      practiceSet: [
        { prompt: "Name the two large west-flowing peninsular rivers (no deltas).", answer: "Narmada and Tapti" },
        { prompt: "Why do Narmada and Tapti form estuaries, not deltas?", answer: "They flow west through rift valleys" },
        { prompt: "Does the Tamraparni flow east or west?", answer: "East" },
      ],
      pyqExampleId: "6bf85584-bb19-4b0d-9a33-fbf141f2beda", // east-flowing rivers
    },

    // 5. famous lakes (reference)
    {
      kind: "reference" as const,
      slug: "indian-lakes",
      name: "Famous lakes of India and their states",
      intuition:
        "Lakes are pure recall — pin each one to its state and type. The crater (meteorite-impact) lake is **Lonar** in Maharashtra; **Loktak** (the floating-island lake) is in Manipur; **Roopkund** (the skeleton lake) is in Uttarakhand; Sambhar (salt) in Rajasthan; Chilika (lagoon) in Odisha; Vembanad (backwater) in Kerala.",
      definition:
        "- **Lonar** — a **crater lake** (meteorite impact), Maharashtra.\n" +
        "- **Loktak** — Manipur (famous for its floating phumdis).\n" +
        "- **Roopkund** — Uttarakhand (the 'skeleton lake').\n" +
        "- Others: **Sambhar** (salt, Rajasthan), **Chilika** (lagoon, Odisha), **Vembanad** (backwater, Kerala).",
      table: {
        columns: ["Lake", "State", "Type / note"],
        rows: [
          {
            cells: ["**Lonar**", "Maharashtra", "Crater (impact) lake"],
            noteAmber: "NDA 2021 — Lonar is the crater lake; the others listed are salt/lagoon/backwater.",
            pyqExampleId: "73e8d2bc-ab4f-4853-b069-b8df9cba4796",
          },
          {
            cells: ["**Loktak**", "Manipur", "Floating-island (phumdi) lake"],
            noteAmber: "NDA 2019 — Loktak is in Manipur.",
            pyqExampleId: "5500fa49-8c17-44f8-89c5-1a72a42c8aa5",
          },
          {
            cells: ["**Roopkund**", "Uttarakhand", "Glacial 'skeleton lake'"],
            noteAmber: "NDA 2023 — Roopkund is in Uttarakhand.",
            pyqExampleId: "b9c743db-6e97-4664-9573-495fa756bced",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which is a crater lake in India: Lonar, Sambhar, Chilika or Vembanad?",
        steps: [
          "Sambhar is a salt lake, Chilika a lagoon, Vembanad a backwater.",
          "Lonar, in Maharashtra, sits in a meteorite-impact crater.",
        ],
        answer: "Lonar Lake.",
      },
      practiceSet: [
        { prompt: "Which Indian lake is a meteorite crater lake?", answer: "Lonar (Maharashtra)" },
        { prompt: "Loktak lake is in which state?", answer: "Manipur" },
        { prompt: "Roopkund lake is in which state?", answer: "Uttarakhand" },
      ],
      pyqExampleId: "5500fa49-8c17-44f8-89c5-1a72a42c8aa5", // Loktak = Manipur
    },

    // 6. peninsular basins + drainage patterns + waterways (formula)
    {
      kind: "formula" as const,
      slug: "basins-patterns-waterways",
      name: "River basins, drainage patterns and inland waterways",
      intuition:
        "A few extra recall items round out the topic. Among the west-flowing Deccan-edge rivers, the **Narmada** is the NORTHERNMOST basin of the Deccan Plateau. Drainage shapes have names — the trellis pattern (right-angle joins along folded rock) is typical of NW Europe. And the inland-waterway facts (longest navigable network; 111 National Waterways under the 2016 Act) are factual recall.",
      definition:
        "- **Northernmost Deccan-Plateau river basin** — the **Narmada** (north of the Tapti).\n" +
        "- **Drainage patterns** — **trellis** (tributaries join at right angles along folded ridges) is shown by the rivers of NW Europe; radial pattern spreads off a dome; parallel pattern runs down a uniform slope.\n" +
        "- **Inland waterways** — India has one of the longest navigable inland networks; **111 inland waterways** are declared **National Waterways** under the National Waterways Act, **2016**. (It does NOT yet carry ~25% of cargo — that statement is false.)\n" +
        "- **Jog Falls** is created by the **Sharavati** river; the **Tamraparni** is a river of Tirunelveli district, Tamil Nadu.",
      authoredExample: {
        prompt:
          "Which is the northernmost river basin of the Deccan Plateau — Chambal, Mahi, Narmada or Tapti?",
        steps: [
          "Chambal and Mahi drain the plateau's northern edge but are not counted as the Deccan-Plateau river-basin proper.",
          "Of the Deccan rift rivers, the Narmada lies north of the Tapti.",
          "So the Narmada is the northernmost basin.",
        ],
        answer: "Narmada.",
      },
      selfCheckExample: {
        prompt: "The rivers of North-West Europe are good examples of which drainage pattern?",
        steps: [
          "Their tributaries meet the main streams at right angles along folded ridges.",
          "That right-angled, ridge-controlled shape is the trellis pattern.",
        ],
        answer: "Trellis pattern.",
      },
      practiceSet: [
        { prompt: "Northernmost Deccan-Plateau river basin?", answer: "Narmada" },
        { prompt: "How many National Waterways under the 2016 Act?", answer: "111" },
        { prompt: "Jog Falls is created by which river?", answer: "Sharavati" },
      ],
      pyqExampleId: "ad8db601-9256-4000-8f8e-3439834911df", // northernmost Deccan basin = Narmada
    },

    // 7. river names, confluences, dams and islands (reference)
    {
      kind: "reference" as const,
      slug: "river-names-features",
      name: "Alternative names, confluences, dams and river islands",
      intuition:
        "A cluster of single-fact river recall. Several Himalayan rivers carry a second, older name (the Sarda is the Kali before it reaches the plains); the holy 'prayag' towns mark confluences (Rudraprayag = Alaknanda + Mandakini); Majuli, the world's largest river island, sits on the Brahmaputra; the Krishna Raja Sagara dam is on the Kaveri; and the Garhwal-Himalaya towns each sit on a named river basin.",
      definition:
        "- **Alternative names** — the **Sarda (Sharda)** is known as the **Kali** before it enters the Uttar Pradesh plains.\n" +
        "- **Confluences (Panch Prayag)** — **Rudraprayag** = Alaknanda + **Mandakini** (Devprayag = Alaknanda + Bhagirathi forms the Ganga).\n" +
        "- **River island** — **Majuli**, the world's largest river island, lies on the **Brahmaputra**.\n" +
        "- **Dam on river** — the **Krishna Raja Sagara (KRS)** dam/reservoir is on the **Kaveri**.\n" +
        "- **Garhwal river-basin towns** — Bhagirathi to **Uttarkashi**; Alaknanda to **Pauri**; Nayar to **Lansdowne**; Ganga to **Narendra Nagar**.",
      table: {
        columns: ["Feature", "Answer"],
        rows: [
          {
            cells: ["Sarda's name before the plains", "**Kali**"],
            noteAmber: "NDA 2019 — the Sarda is the Kali in the hills.",
            pyqExampleId: "9cdc1a4d-4fd4-4e51-889e-efb7ae733bae",
          },
          {
            cells: ["Rudraprayag confluence", "Alaknanda + **Mandakini**"],
            noteAmber: "NDA 2017 — Rudraprayag is where the Mandakini meets the Alaknanda.",
            pyqExampleId: "2b109229-51e9-4793-b2e1-cef22b24f10f",
          },
          {
            cells: ["River island Majuli", "On the **Brahmaputra**"],
            noteAmber: "NDA 2018 — Majuli is on the Brahmaputra.",
            pyqExampleId: "f9ebec88-02e5-4933-b930-54bdf48368ff",
          },
          {
            cells: ["Krishna Raja Sagara dam", "On the **Kaveri**"],
            noteAmber: "NDA 2020 — KRS is on the Kavery.",
            pyqExampleId: "047cbf0f-53c6-47ca-b82d-d5c46c32d368",
          },
          {
            cells: ["Garhwal basin towns", "Bhagirathi-Uttarkashi, Alaknanda-Pauri, Nayar-Lansdowne, Ganga-Narendra Nagar"],
            noteAmber: "NDA 2018 — match the Garhwal town to its river basin.",
            pyqExampleId: "7695c15c-ba6a-4dcc-91b4-b6856a7015e4",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "On which river is Majuli, the largest river island in the world, located?",
        steps: [
          "Majuli is a vast inhabited island in Assam.",
          "It is built up by the braided channels of the Brahmaputra.",
        ],
        answer: "The Brahmaputra.",
      },
      practiceSet: [
        { prompt: "The Sarda is known as which river in the hills?", answer: "Kali" },
        { prompt: "Rudraprayag is the confluence of the Alaknanda and?", answer: "Mandakini" },
        { prompt: "The Krishna Raja Sagara dam is on which river?", answer: "Kaveri" },
        { prompt: "Majuli island sits on which river?", answer: "Brahmaputra" },
      ],
      pyqExampleId: "9cdc1a4d-4fd4-4e51-889e-efb7ae733bae", // Sarda = Kali
    },
  ],
};
