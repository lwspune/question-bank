import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_GIE_TRANSPORT_NOTE: SubtopicNote = {
  subtopicName: "Transport and Ports",
  title: "Transport and Ports",
  oneLineDefinition:
    "India's roads, highway corridors and tunnels, its railways and national waterways, and its ports on the two coasts.",
  whyItMatters:
    "Twenty-seven questions in the bank: 13 from the 2023 shifts, 12 from the 2024 shifts and two from the 2025 shifts. They ask a first, a largest or an endpoint: the first train, the corridors' end cities, the satellite port of Mumbai. A list of firsts and endpoints is the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscgietr-roads",
      name: "Roads, corridors and tunnels",
      intuition:
        "Roads carry most of India's people. SSC asks who builds the national highways, where the two great corridors run, which tunnel is newest, and which States have dense or thin road networks.",
      definition:
        "The facts:\n" +
        "- India has the world's **second largest** road network, after the USA. Roads carry about **87%** of passenger traffic.\n" +
        "- **NHAI** (National Highways Authority of India) builds and maintains the national highways. It was set up by an Act of 1988 and began work in **1995**.\n" +
        "- **North-South corridor**: **Srinagar to Kanyakumari**. **East-West corridor**: **Silchar to Porbandar**. They cross at Jhansi.\n" +
        "- **Atal Tunnel** (2020), under the Pir Panjal range near Rohtang at about 3,000 m, is the longest single-tube highway tunnel at that height; it shortens the Manali to Keylong road.\n" +
        "- **Road density** depends on terrain and economic development: it is highest in **Kerala** and low in the hilly North-East.",
      table: {
        columns: ["Fact", "Answer"],
        rows: [
          { cells: ["North-South corridor", "Srinagar to Kanyakumari"], pyqExampleId: "27c15ae7-9e04-47b9-8f50-aeea7842cad5" },
          { cells: ["East-West corridor", "Silchar to Porbandar"], pyqExampleId: "0bc7f640-363a-41e3-971c-b38c83645c6b" },
          { cells: ["NHAI began work", "1995"], pyqExampleId: "cfe3a758-110c-409c-be5b-3be573b41274" },
          { cells: ["Highest road density", "Kerala"], pyqExampleId: "ad4a83cf-dee0-42fd-bf75-471271585dd5" },
          { cells: ["Atal Tunnel", "Pir Panjal range, 2020"], pyqExampleId: "08e31704-2183-4918-8f8a-dc209e5959a4" },
        ],
      },
      pyqExampleId: "00a647fa-753a-4956-a22a-882ce29bf1fb",
      selfCheckExample: {
        prompt: "Name the end cities of India's two great highway corridors and the city where they cross.",
        steps: ["North-South runs from Srinagar to Kanyakumari.", "East-West runs from Silchar to Porbandar; they cross at Jhansi."],
        answer: "Srinagar-Kanyakumari and Silchar-Porbandar, crossing at Jhansi.",
      },
      practiceSet: [
        { prompt: "Which body maintains India's national highways?", answer: "The National Highways Authority of India" },
        { prompt: "What is India's rank in the world by road length?", answer: "Second, after the USA" },
        { prompt: "Which State has the highest road density?", answer: "Kerala" },
        { prompt: "About what share of passenger traffic moves by road in India?", answer: "About 87%" },
      ],
      traps: [
        {
          title: "The North-East has low road density",
          body: "Road density is **high in the south** and **low in the hilly North-East**. A statement reversing them is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgietr-rail",
      name: "Railways, waterways and airports",
      intuition:
        "India's railways began with a short line out of Bombay, and the plains now hold most of the track. Waterways are numbered, and SSC asks which number is which river.",
      definition:
        "Railways:\n" +
        "- The first train ran on **16 April 1853** from **Bombay to Thane** (about 34 km).\n" +
        "- The route length was **67,956 km** in 2020. **Broad gauge** covers most of it.\n" +
        "- **Uttar Pradesh** has the longest network of any State; hilly **Sikkim** has almost none.\n" +
        "- **Eastern Railway** (Kolkata) has the Howrah, Sealdah, Asansol and Malda divisions.\n\n" +
        "Waterways:\n" +
        "- The **National Waterways Act, 2016** declared **111** national waterways.\n" +
        "- **NW 1**: the Ganga. **NW 2**: the Brahmaputra. **NW 3**: the West Coast Canal. **NW 5**: the East Coast Canal with the Brahmani and Mahanadi delta.\n" +
        "- The **India-Bangladesh Protocol route** links NW 1 in the mainland with **NW 2** in the North-East.\n\n" +
        "Airports: **Mizoram** has just one operational airport (Lengpui).",
      table: {
        columns: ["Waterway", "River or canal"],
        rows: [
          { cells: ["NW 1", "Ganga"] },
          { cells: ["NW 2", "Brahmaputra"], pyqExampleId: "541f8cd7-ce24-4535-a3b5-64d263b70b29" },
          { cells: ["NW 3", "West Coast Canal (Kerala)"] },
          { cells: ["NW 5", "East Coast Canal, Brahmani, Mahanadi delta"], pyqExampleId: "ab1f839b-c141-4798-804b-18e41a0689cd" },
        ],
      },
      pyqExampleId: "ede72f53-49e8-4689-b238-b420c8c51c27",
      selfCheckExample: {
        prompt: "Between which two places did India's first train run, and in which year?",
        steps: ["It ran from Bombay (Bori Bunder) to Thane.", "The date was 16 April 1853."],
        answer: "Bombay to Thane, 1853.",
      },
      practiceSet: [
        { prompt: "Which State has the longest railway network?", answer: "Uttar Pradesh" },
        { prompt: "How many national waterways did the 2016 Act declare?", answer: "111" },
        { prompt: "Which gauge covers most of India's railway track?", answer: "Broad gauge" },
        { prompt: "Which railway zone has the Asansol and Malda divisions?", answer: "Eastern Railway" },
      ],
      traps: [
        {
          title: "Thane, not Pune",
          body: "The first train of 1853 ran from Bombay to **Thane**. Pune, Karjat and Palghar are decoys.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscgietr-ports",
      name: "Ports on the two coasts",
      intuition:
        "Port questions ask which coast a port is on, which port is the biggest for containers, and which was built to take the load off an older one.",
      definition:
        "The facts:\n" +
        "- **West coast**: Kandla (Deendayal), Mumbai, **Jawaharlal Nehru (Nhava Sheva)**, Mormugao, New Mangalore, Kochi.\n" +
        "- **East coast**: **Kolkata with Haldia**, Paradip, Visakhapatnam, **Chennai**, Tuticorin.\n" +
        "- **Jawaharlal Nehru Port** is India's largest **container** port, built as a **satellite port** to relieve **Mumbai**. **Haldia** was built as a subsidiary port to Kolkata.\n" +
        "- About **95%** of India's foreign trade by volume goes by **sea**, and most of the rest by **air**.",
      table: {
        columns: ["Port", "Coast", "Fact"],
        rows: [
          { cells: ["Jawaharlal Nehru", "West", "Largest container port; satellite of Mumbai"], pyqExampleId: "9eaa39c2-a56f-4150-9a89-fb71c2a446f0" },
          { cells: ["Haldia", "East", "Subsidiary of Kolkata"], pyqExampleId: "d7ee9f44-fc56-46db-98fe-2c8a88718571" },
          { cells: ["Chennai", "East", "Coromandel coast"], pyqExampleId: "2f1f52f5-c06f-4a09-a89b-5d1edb3583df" },
          { cells: ["Mormugao", "West", "Goa"] },
        ],
      },
      pyqExampleId: "3872c931-9df0-4af7-a1d4-feff2995300f",
      selfCheckExample: {
        prompt: "Which two ports were built to take pressure off an older port, and which ports did they relieve?",
        steps: ["Jawaharlal Nehru Port was built as a satellite port for Mumbai.", "Haldia was built as a subsidiary port for Kolkata."],
        answer: "Jawaharlal Nehru (for Mumbai) and Haldia (for Kolkata).",
      },
      practiceSet: [
        { prompt: "Which is India's largest container port?", answer: "Jawaharlal Nehru Port (Nhava Sheva)" },
        { prompt: "On which coast is Haldia?", answer: "The east coast" },
        { prompt: "By which two routes does most of India's foreign trade move?", answer: "Sea and air" },
      ],
      traps: [
        {
          title: "Haldia is on the east coast",
          body: "In a 'NOT on the west coast' question, **Haldia** (on the Hooghly) is the answer. Kandla, Mangaluru and Mormugao are all west coast ports.",
        },
      ],
    },
  ],
};
