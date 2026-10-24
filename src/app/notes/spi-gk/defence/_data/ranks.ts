import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_DF_RANKS_NOTE: SubtopicNote = {
  subtopicName: "Ranks and Equivalent Ranks",
  title: "Ranks and Equivalent Ranks",
  oneLineDefinition:
    "The officer ranks of the Army, the Navy and the Air Force set side by side, so that any rank can be matched across the services or placed above and below its neighbours.",
  whyItMatters:
    "Eight questions in the bank, all EASY, and two of them are from the 2022 paper. Every one is read off a single table: match a rank across the services, find the next rank up, find the lowest rank in a list, or name the rank of a chief. Learn the table row by row and these are the surest marks in the paper.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spidfra-equivalent",
      name: "Matching a rank across the three services",
      intuition:
        "The three services use different names for officers of the same level. A Colonel in the Army, a Captain in the Navy and a Group Captain in the Air Force hold the same rank and salute the same way. " +
        "Learn the ranks as rows of a table: each row is one level in all three services.",
      definition:
        "- Read across a row to find the **equivalent rank**; read down a column to go **up** in one service.\n" +
        "- The word **Captain** means two different levels: an Army Captain is a junior officer, a Navy Captain equals an Army **Colonel**.\n" +
        "- The Air Force names grow from **Flying Officer** through **Squadron Leader**, **Wing Commander** and **Group Captain** to the **Air Marshal** ranks.\n" +
        "- **Commodore** is a Navy rank (equal to Brigadier); the Air Force rank at that level is **Air Commodore**.",
      table: {
        columns: ["Army", "Navy", "Air Force"],
        rows: [
          { cells: ["Lieutenant", "Sub Lieutenant", "Flying Officer"] },
          { cells: ["Captain", "Lieutenant", "Flight Lieutenant"] },
          { cells: ["Major", "Lieutenant Commander", "Squadron Leader"] },
          { cells: ["Lieutenant Colonel", "Commander", "Wing Commander"] },
          { cells: ["**Colonel**", "**Captain**", "**Group Captain**"] },
          { cells: ["Brigadier", "Commodore", "Air Commodore"] },
          { cells: ["Major General", "Rear Admiral", "Air Vice Marshal"] },
          { cells: ["Lieutenant General", "Vice Admiral", "Air Marshal"] },
          { cells: ["General", "Admiral", "Air Chief Marshal"] },
          { cells: ["Field Marshal", "Admiral of the Fleet", "Marshal of the Indian Air Force"] },
        ],
        caption: "Each row is one level. The last row is the honorary five-star rank.",
      },
      selfCheckExample: {
        prompt: "What is the Air Force rank equal to a Lieutenant Colonel of the Army?",
        steps: ["Find Lieutenant Colonel in the Army column.", "Read across the same row to the Air Force column."],
        answer: "Wing Commander",
      },
      practiceSet: [
        { prompt: "What is the Navy rank equal to an Army Brigadier?", answer: "Commodore" },
        { prompt: "What is the Army rank equal to a Flight Lieutenant of the Air Force?", answer: "Captain" },
        { prompt: "What is the Air Force rank equal to a Navy Vice Admiral?", answer: "Air Marshal" },
        { prompt: "What is the Navy rank equal to an Army Major General?", answer: "Rear Admiral" },
        { prompt: "What is the Army rank equal to a Navy Captain?", answer: "Colonel" },
        { prompt: "What is the Navy rank equal to an Army Lieutenant Colonel?", answer: "Commander" },
      ],
      pyqExampleId: "0ccb4b23-6ef4-44f1-88e1-b81288da98ea",
      traps: [
        {
          title: "Two Captains",
          body:
            "An Army Captain equals a Navy Lieutenant. A Navy Captain equals an Army Colonel. Check the service before you match the word.",
        },
        {
          title: "Group Captain is not Captain",
          body:
            "Group Captain is an Air Force rank, equal to a Colonel. When a question asks for the Navy equivalent of a Colonel, Group Captain is the wrong-service option and Captain is right.",
        },
        {
          title: "Commodore and Air Commodore",
          body:
            "Commodore is the Navy's rank at Brigadier level; the Air Force calls it Air Commodore. Neither equals a Major or a Colonel.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spidfra-order",
      name: "Rank order, the chiefs and the five-star ranks",
      intuition:
        "Down one column of the table is the ladder of one service. The top working rung is the four-star rank held by the service chief; above it sits an honorary five-star rank given only for special service.",
      definition:
        "- **Navy ladder**: Sub Lieutenant, Lieutenant, Lieutenant Commander, Commander, Captain, Commodore, Rear Admiral, Vice Admiral, Admiral.\n" +
        "- **Air Force ladder**: Flying Officer, Flight Lieutenant, Squadron Leader, Wing Commander, Group Captain, Air Commodore, Air Vice Marshal, Air Marshal, Air Chief Marshal.\n" +
        "- The head of the Army is the **Chief of the Army Staff**, a four-star **General**. The head of the Navy, the **Chief of the Naval Staff**, is an **Admiral**. The head of the Air Force, the **Chief of the Air Staff**, is an **Air Chief Marshal**.\n" +
        "- **Five-star** ranks are honorary. **Sam Manekshaw** (1973) and **K.M. Cariappa** (1986) were made **Field Marshal**. **Arjan Singh** was made **Marshal of the Indian Air Force** in 2002, the only officer to hold it. No one in India has been made Admiral of the Fleet.",
      table: {
        columns: ["Service", "Head's title", "Head's rank", "Five-star rank"],
        rows: [
          { cells: ["Army", "Chief of the Army Staff", "General", "Field Marshal: Manekshaw, Cariappa"] },
          { cells: ["Navy", "Chief of the Naval Staff", "**Admiral**", "Admiral of the Fleet: never given"] },
          { cells: ["Air Force", "Chief of the Air Staff", "Air Chief Marshal", "Marshal of the IAF: **Arjan Singh** only"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which Air Force rank comes immediately above Squadron Leader?",
        steps: ["Go down the Air Force column: Flying Officer, Flight Lieutenant, Squadron Leader.", "The next rung is Wing Commander."],
        answer: "Wing Commander",
      },
      practiceSet: [
        { prompt: "Which Navy rank comes immediately below Rear Admiral?", answer: "Commodore" },
        { prompt: "What is the rank of the Chief of the Air Staff?", answer: "Air Chief Marshal" },
        { prompt: "Which two Army officers have been made Field Marshal?", answer: "Sam Manekshaw and K.M. Cariappa" },
        { prompt: "Which is the lowest commissioned rank of the Navy?", answer: "Sub Lieutenant" },
        { prompt: "Which Air Force rank is just above Group Captain?", answer: "Air Commodore" },
        { prompt: "What is the head of the Indian Army called?", answer: "The Chief of the Army Staff" },
      ],
      pyqExampleId: "fbc13ef4-b1b9-4438-84dd-83b444b23769",
      traps: [
        {
          title: "Five stars are honorary",
          body:
            "A service chief holds four stars: General, Admiral or Air Chief Marshal. Field Marshal, Admiral of the Fleet and Marshal of the Indian Air Force are honorary five-star ranks, so they are never the answer for a serving chief's rank.",
        },
        {
          title: "Flying Officer is below Flight Lieutenant",
          body:
            "The two names look alike. Flying Officer is the lowest Air Force officer rank, and Flight Lieutenant is the next one up.",
        },
      ],
    },
  ],
};
