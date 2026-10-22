import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PF_PENINSULA_NOTE: SubtopicNote = {
  subtopicName: "The Plateau, Desert, Coasts and Islands",
  title: "The Plateau, Desert, Coasts and Islands",
  oneLineDefinition:
    "South of the plains lies the old Peninsular Plateau, edged by the Western and Eastern Ghats; to its west is the Indian Desert, and around it run the coastal plains and two groups of islands.",
  whyItMatters:
    "Seven questions in the bank, five EASY and two MODERATE, all single facts: the highest peak of the Eastern Ghats, the eastward extensions of the Central Highlands, the main city of Malwa, the river of the desert, where the Sundarbans and other mangroves are, and the headquarters of Lakshadweep.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spipfpe-highlands",
      name: "The Central Highlands and the Deccan Plateau",
      intuition:
        "The Narmada splits the Peninsular Plateau in two. North of it are the Central Highlands, wide in the west and narrow in the east; south of it is the triangle of the Deccan Plateau.",
      definition:
        "- **Central Highlands**: the part of the plateau north of the Narmada, covering most of the **Malwa plateau**. The Aravalis bound it on the north west.\n" +
        "- Its eastward extensions are called **Bundelkhand** and **Baghelkhand**. The **Chotanagpur plateau**, drained by the Damodar, lies further east.\n" +
        "- **Indore** is the largest city and the main business centre of the Malwa region.\n" +
        "- **Deccan Plateau**: a triangle south of the Narmada. The **Satpura** range is its northern edge, and the Mahadev hills, the Kaimur hills and the Maikal range carry it east.\n" +
        "- The Deccan Plateau also reaches into the north east as the **Meghalaya plateau**, with the Garo, Khasi and Jaintia hills.",
      table: {
        columns: ["Part", "Where", "Named pieces"],
        rows: [
          { cells: ["Central Highlands", "North of the Narmada", "Malwa plateau; Bundelkhand and Baghelkhand to the east"] },
          { cells: ["Chotanagpur plateau", "East of Bundelkhand and Baghelkhand", "Drained by the Damodar"] },
          { cells: ["Deccan Plateau", "South of the Narmada", "Satpura range on its north; Mahadev, Kaimur, Maikal to the east"] },
          { cells: ["Meghalaya plateau", "North east", "Garo, Khasi and Jaintia hills"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which range forms the northern edge of the Deccan Plateau?",
        steps: ["The Deccan Plateau lies south of the Narmada.", "The range just south of the Narmada valley is the Satpura."],
        answer: "The Satpura range.",
      },
      practiceSet: [
        { prompt: "Which river divides the Central Highlands from the Deccan Plateau?", answer: "The Narmada" },
        { prompt: "Which river drains the Chotanagpur plateau?", answer: "The Damodar" },
        { prompt: "Which old range bounds the Central Highlands on the north west?", answer: "The Aravalis" },
        { prompt: "Name the three hill ranges of the Meghalaya plateau.", answer: "Garo, Khasi and Jaintia" },
      ],
      pyqExampleId: "9b979d5d-6b21-4bf4-a37e-decdef4372ed",
      traps: [
        {
          title: "Taking the Chotanagpur plateau for the eastward extension",
          body:
            "The eastward extensions of the Central Highlands are Bundelkhand and Baghelkhand. The Chotanagpur plateau lies further east still, beyond them.",
        },
        {
          title: "Putting the Maikal range in the Central Highlands",
          body: "The Mahadev hills and the Maikal range carry the Satpura line east, on the Deccan side of the Narmada.",
        },
        {
          title: "Choosing the capital for the biggest city",
          body: "Bhopal is the capital of Madhya Pradesh, but Indore is the largest city and business centre of Malwa.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipfpe-ghats",
      name: "The Western and Eastern Ghats",
      intuition:
        "The plateau is edged by two lines of hills. On the west the Ghats stand high and unbroken along the coast; on the east they are lower and broken into pieces by rivers flowing to the Bay of Bengal.",
      definition:
        "- **Western Ghats** (Sahyadri): higher and continuous, 900 to 1,600 m on average, crossed only through passes. Highest peak **Anai Mudi** (2,695 m); Doda Betta (2,637 m) in the Nilgiris comes next.\n" +
        "- **Eastern Ghats**: lower (about 600 m on average) and broken, because big rivers cut through them. Highest peak **Mahendragiri** (1,501 m), in Odisha.",
      table: {
        columns: ["Feature", "Western Ghats", "Eastern Ghats"],
        rows: [
          { cells: ["Average height", "900 to 1,600 m", "About 600 m"] },
          { cells: ["Shape", "Continuous; crossed through passes", "Broken by rivers"] },
          { cells: ["Highest peak", "Anai Mudi, 2,695 m", "Mahendragiri, 1,501 m"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is the highest peak of the Western Ghats?",
        steps: ["The Western Ghats are the higher of the two lines.", "Their highest point is in the south, in Kerala."],
        answer: "Anai Mudi (2,695 m).",
      },
      practiceSet: [
        { prompt: "Which Ghats are continuous and can be crossed only through passes?", answer: "The Western Ghats" },
        { prompt: "Why are the Eastern Ghats broken into pieces?", answer: "Big rivers flowing to the Bay of Bengal cut through them." },
        { prompt: "Which are higher on average, the Western or the Eastern Ghats?", answer: "The Western Ghats" },
        { prompt: "In which hills is Doda Betta?", answer: "The Nilgiris" },
      ],
      pyqExampleId: "2a0f6412-07fa-4203-9ca1-8d741e2b604a",
      traps: [
        {
          title: "Giving Anai Mudi for the Eastern Ghats",
          body: "Anai Mudi is the highest peak of the Western Ghats. The Eastern Ghats' highest is Mahendragiri, far lower at 1,501 m.",
        },
        {
          title: "Taking the Khasi for a peak",
          body: "The Khasi hills are a range of the Meghalaya plateau, not a peak of the Ghats.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipfpe-desert",
      name: "The Indian Desert",
      intuition:
        "West of the Aravalis the land is dry and covered with sand. Very little rain falls, so most streams flow only in the rainy season and then vanish into the sand.",
      definition:
        "- The **Indian Desert** (Thar) lies to the west of the Aravali hills.\n" +
        "- It gets very little rain, below 150 mm a year, and has little plant cover.\n" +
        "- Crescent shaped sand dunes, called **barchans**, cover large areas.\n" +
        "- Most streams flow only in the rainy season. The **Luni** is the only large river of the region; it flows south west through Rajasthan and ends in the Rann of Kutch.",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          { cells: ["Location", "West of the Aravali hills, mostly in Rajasthan"] },
          { cells: ["Rainfall", "Below 150 mm a year"] },
          { cells: ["Typical dunes", "Barchans, shaped like a crescent"] },
          { cells: ["Only large river", "Luni, in Rajasthan"] },
        ],
      },
      selfCheckExample: {
        prompt: "What are the crescent shaped sand dunes of the Indian Desert called?",
        steps: ["The desert's dunes are named by their shape.", "The crescent shaped ones are barchans."],
        answer: "Barchans.",
      },
      practiceSet: [
        { prompt: "Which hills form the eastern edge of the Indian Desert?", answer: "The Aravalis" },
        { prompt: "About how much rain does the Indian Desert get in a year?", answer: "Below 150 mm" },
        { prompt: "Do most streams of the Indian Desert flow all year?", answer: "No, only in the rainy season" },
      ],
      pyqExampleId: "13c78b43-ef23-4d4b-b6dc-114f6c214c51",
      traps: [
        {
          title: "Choosing Gujarat for the Luni",
          body: "The Luni ends in the Rann of Kutch in Gujarat, but almost its whole course is in Rajasthan, so it is a river of Rajasthan.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipfpe-coasts",
      name: "Coasts, mangroves and islands",
      intuition:
        "Narrow plains run along both coasts. Where big rivers reach the sea they build deltas, and tides wash the deltas, so mangrove forests grow there. Out at sea India has two groups of islands, one in each sea.",
      definition:
        "- **West coast**: the Konkan (Mumbai to Goa), the Kannad plain in the middle and the Malabar coast in the south.\n" +
        "- **East coast**: the Northern Circar in the north and the Coromandel coast in the south. **Chilika**, in Odisha, is the largest saltwater lake in India.\n" +
        "- **Mangrove** (tidal) forests grow in deltas washed by tides. The largest is the **Sundarbans** in the Ganga and Brahmaputra delta in **West Bengal**, named after its sundari trees. Mangroves also grow in the deltas of the Mahanadi, Godavari and Krishna.\n" +
        "- **Lakshadweep**, in the Arabian Sea, is a group of small coral islands. Its headquarters is **Kavaratti**.\n" +
        "- The **Andaman and Nicobar** islands, in the Bay of Bengal, are bigger. The Ten Degree Channel separates the Andaman islands from the Nicobar islands, and Barren Island there is India's only active volcano.",
      table: {
        columns: ["Place", "Fact"],
        rows: [
          { cells: ["Konkan coast", "West coast from Mumbai to Goa"] },
          { cells: ["Malabar coast", "Southern part of the west coast, in Kerala"] },
          { cells: ["Coromandel coast", "Southern part of the east coast, in Tamil Nadu"] },
          { cells: ["Chilika lake", "Largest saltwater lake in India, in Odisha"] },
          {
            cells: ["Sundarbans", "Largest mangrove forest, Ganga and Brahmaputra delta, West Bengal"],
            noteAmber: "Named after the sundari tree.",
          },
          { cells: ["Lakshadweep", "Coral islands in the Arabian Sea; headquarters Kavaratti"] },
          { cells: ["Andaman and Nicobar", "Islands in the Bay of Bengal; Barren Island volcano"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which channel separates the Andaman islands from the Nicobar islands?",
        steps: ["The two groups lie one above the other in the Bay of Bengal.", "The sea channel between them is named after its line of latitude."],
        answer: "The Ten Degree Channel.",
      },
      practiceSet: [
        { prompt: "Which is the largest saltwater lake in India?", answer: "Chilika, in Odisha" },
        { prompt: "What is the part of the west coast between Mumbai and Goa called?", answer: "The Konkan coast" },
        { prompt: "What kind of islands make up Lakshadweep?", answer: "Small coral islands" },
        { prompt: "Which tree gives the Sundarbans its name?", answer: "The sundari tree" },
        { prompt: "Where is India's only active volcano, Barren Island?", answer: "In the Andaman and Nicobar islands" },
      ],
      pyqExampleId: "cda26809-c796-487a-b13d-f45a0a9affec",
      traps: [
        {
          title: "Looking for mangroves inland",
          body: "Mangroves need tidal sea water, so they grow only on coasts and deltas. An inland state or city has none.",
        },
        {
          title: "Putting Lakshadweep in the Bay of Bengal",
          body: "Lakshadweep is in the Arabian Sea, off Kerala. The Andaman and Nicobar islands are the group in the Bay of Bengal.",
        },
      ],
    },
  ],
};
