import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_PORTS_NOTE: SubtopicNote = {
  subtopicName: "Waterways and Ports",
  title: "Waterways and Ports",
  oneLineDefinition:
    "The national waterways and the bodies that run them, India's major ports from west to east, and what makes a port tidal, landlocked, artificial or deep-water.",
  whyItMatters:
    "Nine CDS questions from 2016 to 2026, and four of them are HARD. Four are statement sets: is this port tidal, is that one at the head of an estuary. Deendayal (Kandla) as a tidal port was asked in 2023 (I) and again in 2026 (I).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-waterways",
      name: "National waterways",
      intuition:
        "Big rivers and coastal canals can carry heavy cargo cheaply, and the government has declared the best stretches national waterways. " +
        "The first five are the ones to know, each a named river or canal between two named towns.",
      definition:
        "- **NW-1**, the **first to be declared** (1986), runs on the **Ganga, Bhagirathi and Hooghly** from **Haldia to Prayagraj** (Allahabad), about 1,620 km.\n" +
        "- **NW-2** is the **Brahmaputra** from **Sadiya to Dhubri**, 891 km.\n" +
        "- **NW-3** is the **West Coast Canal** in Kerala, **Kottapuram to Kollam**.\n" +
        "- **NW-4** joins the **Godavari and Krishna** with the Kakinada to Puducherry canals; **NW-5** links the Brahmani, the East Coast Canal and the Mahanadi delta.\n" +
        "- The **National Waterways Act, 2016** raised the total to **111** national waterways.\n" +
        "- The **Inland Waterways Authority of India** is headquartered at **Noida**, the **Central Inland Water Transport Corporation** at **Kolkata**, and the **National Inland Navigation Institute** is at **Patna**.",
      table: {
        columns: ["Waterway or body", "Stretch or location"],
        rows: [
          {
            cells: ["NW-1", "Ganga, Bhagirathi and Hooghly, Haldia to Prayagraj; the first declared"],
            noteAmber: "CDS 2016 (II): NW-1 ran between Haldia and Allahabad, and IWAI sits at Noida.",
            pyqExampleId: "558dedd4-0d88-4bd0-ade6-602e4d129591",
          },
          { cells: ["NW-2", "Brahmaputra, Sadiya to Dhubri"] },
          { cells: ["NW-3", "West Coast Canal, Kottapuram to Kollam (Kerala)"] },
          { cells: ["NW-4", "Godavari and Krishna, with the Kakinada to Puducherry canals"] },
          { cells: ["Inland Waterways Authority of India", "Noida"] },
          { cells: ["Central Inland Water Transport Corporation", "Kolkata"] },
          { cells: ["National Inland Navigation Institute", "Patna"] },
        ],
      },
      pyqExampleId: "d8af3f5f-fded-4c6d-a836-12c77cce6ac4",
      selfCheckExample: {
        prompt: "A cargo boat leaves Haldia and sails up the Ganga to Patna. Which national waterway is it using, and has it reached that waterway's far end?",
        steps: [
          "The Ganga from Haldia upstream is NW-1.",
          "NW-1 runs from Haldia all the way to Prayagraj, which lies upstream of Patna.",
        ],
        answer: "NW-1; no, the waterway continues past Patna to Prayagraj.",
      },
      practiceSet: [
        { prompt: "Where is the National Inland Navigation Institute?", answer: "Patna" },
        { prompt: "In which State does National Waterway 3 run?", answer: "Kerala" },
        { prompt: "How many national waterways were there after the National Waterways Act, 2016?", answer: "111" },
        { prompt: "Where is the Central Inland Water Transport Corporation headquartered?", answer: "Kolkata" },
      ],
      traps: [
        {
          title: "Three bodies, three cities",
          body: "The **Inland Waterways Authority** is at **Noida**, the **Central Inland Water Transport Corporation** at **Kolkata** (not Delhi), and the **National Inland Navigation Institute** at **Patna** (not Kolkata).",
        },
        {
          title: "NW-2 is the Brahmaputra",
          body: "**NW-1** is the Ganga (Haldia to Prayagraj); **NW-2** is the **Brahmaputra** (Sadiya to Dhubri); **NW-3** is the West Coast Canal. The options swap the numbers.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-major-ports",
      name: "Major ports from west to east",
      intuition:
        "Walk down the west coast and up the east coast, and each major port has one fact CDS keeps asking: where exactly it sits (the head of a gulf, the mouth of an estuary, a delta) or what it is famous for shipping. " +
        "Learn them in that order, west to east.",
      definition:
        "- In 2018 India had **12 major ports** and about **200 non-major ports**, and about **95 per cent** of its trade by volume (about 68 per cent by value) went by sea.\n" +
        "- The coastline was long given as **about 7,500 km**. A fresh measurement in 2024 gave about 11,100 km, so check which figure a question uses.\n" +
        "- **Tamil Nadu** has **three** major ports (Chennai, Kamarajar at Ennore, V. O. Chidambaranar at Thoothukudi). Maharashtra had two (Mumbai and Jawaharlal Nehru Port); **Vadhavan**, approved in 2024, will be its third.\n" +
        "- The **Maritime Agenda 2010 to 2020** set a port capacity target of about **3,130 million tonnes** for 2020.\n" +
        "- The **Integrated Coastal Zone Management (ICZM) Project** began its pilot work in **Gujarat, Odisha and West Bengal**.",
      table: {
        columns: ["Port", "Where it sits and what it is known for"],
        rows: [
          { cells: ["Deendayal (Kandla)", "Head of the Gulf of Kachchh, Gujarat"] },
          { cells: ["Mumbai", "Natural, sheltered harbour; long the biggest port in India"] },
          { cells: ["Jawaharlal Nehru (Nhava Sheva)", "Built to relieve Mumbai; India's largest container port"] },
          {
            cells: ["Mormugao", "Entrance of the Zuari estuary, Goa; iron-ore exports to Japan"],
            noteAmber: "CDS 2021 (I): the port that gained importance for iron-ore exports to Japan.",
            pyqExampleId: "f7b92121-fa06-4500-8834-a27f300cdb14",
          },
          { cells: ["Kochi", "Head of the Vembanad Kayal, Kerala; called the Queen of the Arabian Sea"] },
          { cells: ["V. O. Chidambaranar (Tuticorin)", "South-east Tamil Nadu"] },
          { cells: ["Chennai", "One of the oldest artificial harbours on the east coast"] },
          { cells: ["Visakhapatnam", "Andhra Pradesh; the deepest landlocked harbour"] },
          { cells: ["Paradip", "Mahanadi delta, Odisha; deep water for very large ships"] },
          { cells: ["Kolkata and Haldia", "On the Hooghly; Kolkata is a river port, Haldia its downstream outlet"] },
        ],
      },
      pyqExampleId: "42924e35-2415-444a-a37a-ef468a7cf919",
      selfCheckExample: {
        prompt: "India moves about 95 per cent of its foreign trade by volume through its ports, but only about 68 per cent by value. What does the gap tell you about the goods that travel by air?",
        steps: [
          "Sea carries almost all the weight but only about two-thirds of the value.",
          "So the remaining third of the value must travel by air with very little weight.",
        ],
        answer: "Air cargo is light but very valuable for its weight (for example, gems, electronics and medicines).",
      },
      practiceSet: [
        { prompt: "How many major ports did India have in 2018?", answer: "Twelve" },
        { prompt: "Which State has three major ports?", answer: "Tamil Nadu" },
        { prompt: "Which is India's largest container port?", answer: "Jawaharlal Nehru Port (Nhava Sheva)" },
        { prompt: "In which three States did the ICZM project begin its pilot work?", answer: "Gujarat, Odisha and West Bengal" },
      ],
      traps: [
        {
          title: "Kachchh, not Khambhat",
          body: "**Deendayal (Kandla)** is at the head of the **Gulf of Kachchh**. The Gulf of Khambhat is further south and has no major port at its head.",
        },
        {
          title: "Paradip is in the Mahanadi delta",
          body: "**Paradip** in Odisha stands in the **Mahanadi** delta. The Godavari delta is in Andhra Pradesh, where Kakinada is the port.",
        },
        {
          title: "3,130, not 300",
          body: "The Maritime Agenda 2010 to 2020 aimed at a port capacity of about **3,130 million tonnes**. A target of 300 million tonnes is far too small: the major ports already handled more than that.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-port-types",
      name: "Kinds of port",
      intuition:
        "Ports differ in how ships reach them. Some are guarded by land on all sides, some can only be used at high tide, some sit up a river, and some had to be built out into the open sea with breakwaters. " +
        "CDS gives a port and a label and asks if they match.",
      definition:
        "- A **landlocked harbour** is enclosed by land and reached by a channel: **Visakhapatnam**, the deepest, entered through a channel cut across rock and sand.\n" +
        "- A **tidal port** can be used by large ships only with the tide: **Deendayal (Kandla)**, on the Gulf of Kachchh, which has a large tidal range.\n" +
        "- An **artificial harbour** is built with breakwaters on an open coast: **Chennai**, and **V. O. Chidambaranar**, which the port itself describes as an artificial deep-sea harbour.\n" +
        "- A **river port** sits up a river and must be dredged all the time: **Kolkata**, about 128 km up the Hooghly.\n" +
        "- **Paradip** is a **deep-water** port, built for very large bulk carriers. **Jawaharlal Nehru Port** was built as a **satellite** to relieve Mumbai.",
      table: {
        columns: ["Port", "Kind of port"],
        rows: [
          { cells: ["Visakhapatnam", "Landlocked harbour, the deepest in India"] },
          {
            cells: ["Deendayal (Kandla)", "Tidal port"],
            noteAmber: "Asked twice: CDS 2023 (I) and 2026 (I).",
            pyqExampleId: "8ba3d05a-8a31-4dc3-9e63-7111dabbefc9",
          },
          { cells: ["V. O. Chidambaranar", "Artificial deep-sea harbour"] },
          { cells: ["Chennai", "Artificial harbour"] },
          { cells: ["Kolkata", "River port on the Hooghly"] },
          { cells: ["Paradip", "Deep-water port for very large ships"] },
          { cells: ["Jawaharlal Nehru", "Satellite port built to relieve Mumbai"] },
        ],
      },
      pyqExampleId: "ac2d6c0a-ea2b-4243-828c-801fe6a457a7",
      selfCheckExample: {
        prompt: "Why must Kolkata port be dredged all the time?",
        steps: [
          "Kolkata lies about 128 km up the Hooghly river, not on the open sea.",
          "The river brings down silt, which settles in the channel and makes it too shallow for ships.",
        ],
        answer: "Because the Hooghly keeps silting up the river channel that ships use to reach it.",
      },
      practiceSet: [
        { prompt: "Which port was built as a satellite to relieve the pressure on Mumbai?", answer: "Jawaharlal Nehru Port (Nhava Sheva)" },
        { prompt: "What kind of harbour is the port of V. O. Chidambaranar?", answer: "An artificial deep-sea harbour" },
        { prompt: "What is a tidal port?", answer: "A port that large ships can use only with the high tide" },
        { prompt: "Which east-coast port is a river port on the Hooghly?", answer: "Kolkata" },
      ],
      traps: [
        {
          title: "Jawaharlal Nehru Port is not landlocked",
          body: "The **landlocked** harbour is **Visakhapatnam**. Jawaharlal Nehru Port is a **satellite** of Mumbai. A pair calling it landlocked is wrong.",
        },
        {
          title: "Paradip is deep, not shallow",
          body: "**Paradip** was developed for its **deep water**, to take very large ships. A pair calling it a natural shallow-water port is wrong.",
        },
        {
          title: "Tuticorin's harbour",
          body: "The NCERT Class 10 book says Tuticorin port 'has a natural harbour', but the port describes its harbour as **artificial deep-sea**, made with breakwaters. CDS 2026 (I) used **artificial deep-sea harbour**.",
        },
      ],
    },
  ],
};
