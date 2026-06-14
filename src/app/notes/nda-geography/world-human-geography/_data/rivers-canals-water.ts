import type { SubtopicNote } from "@/app/notes/_types";

export const RIVERS_CANALS_WATER_NOTE: SubtopicNote = {
  subtopicName: "World — Rivers, Canals and Water Bodies",
  title: "World Rivers, Canals and Water Bodies",
  oneLineDefinition:
    "The world's two great ship canals (Suez and Panama), the seas they link, the landlocked water bodies, and a few named river/wetland facts the NDA returns to.",
  whyItMatters:
    "6 PYQs, and the densest single cluster is the Suez Canal — it has appeared as both a 'which is NOT correct' and a 'which is/are correct' statement question. Learn the Suez vs Panama contrast (which seas, locks or no locks, year) and you bank two questions; the rest is named-fact recall (Caspian Sea is landlocked, Helmand drains into the Hamoun wetlands, India has 27 Ramsar sites).",
  concepts: [
    // 1. canals (reference + diagram) — Suez x2 + Panama
    {
      kind: "reference" as const,
      slug: "great-ship-canals",
      name: "The Suez and Panama Canals",
      intuition:
        "Two man-made canals shortened the world's sea routes by cutting through narrow necks of land (isthmuses). The Suez Canal cuts the Isthmus of Suez to join the Mediterranean Sea to the Red Sea — a flat, sea-level canal with NO locks. The Panama Canal cuts the Isthmus of Panama to join the Atlantic to the Pacific — and because the land in between is higher, it DOES need a lock system to lift ships up and down. The exam loves the Suez 'lock' trap: Suez has no locks, so any statement claiming a Suez lock system is false.",
      definition:
        "- **Suez Canal** — links the **Mediterranean Sea** and the **Red Sea**; opened **1869**; a sea-level canal with **NO locks**; gave Europe a shorter gateway to the Indian Ocean.\n" +
        "- **Panama Canal** — links the **Atlantic Ocean** and the **Pacific Ocean**; opened **1914**; **uses a lock system** to raise/lower ships across higher ground.\n" +
        "- Both are man-made navigation canals; the Suez is generally taken to be of greater economic significance than the Panama.",
      visualizationSlug: "whg-canals-map",
      table: {
        columns: ["Canal", "Links", "Locks?", "Opened"],
        rows: [
          {
            cells: ["**Suez**", "Mediterranean Sea ↔ Red Sea", "NO locks", "1869"],
            noteAmber: "NDA 2019 — the 'six lock system' claim about Suez is the FALSE statement (Suez is sea-level, no locks).",
          },
          {
            cells: ["**Panama**", "Atlantic Ocean ↔ Pacific Ocean", "Has locks", "1914"],
          },
        ],
      },
      selfCheckExample: {
        prompt: "The Panama Canal links which two oceans, and does it use locks?",
        steps: [
          "Panama cuts the narrow Isthmus of Panama in Central America.",
          "It joins the Atlantic Ocean to the Pacific Ocean.",
          "The land in between is higher than sea level, so it needs locks.",
        ],
        answer: "Atlantic Ocean and Pacific Ocean — yes, it uses a lock system.",
      },
      practiceSet: [
        { prompt: "Which two seas does the Suez Canal link?", answer: "Mediterranean Sea and Red Sea" },
        { prompt: "Does the Suez Canal have locks?", answer: "No — it is a sea-level canal" },
        { prompt: "In which year did the Panama Canal open?", answer: "1914" },
        { prompt: "The Panama Canal joins which two oceans?", answer: "Atlantic and Pacific" },
      ],
      pyqExampleId: "765ec01f-db4a-4375-a43c-0308200f4c2a", // Suez NOT correct = six lock system
      traps: [
        {
          title: "Suez has no locks; Panama does",
          body:
            "The classic trap: a statement that the **Suez Canal** uses a lock system is FALSE — Suez is sea-level with no locks. It is the **Panama Canal** that uses locks. Don't swap them.",
        },
      ],
    },

    // 2. the second Suez statement question (formula variant — multi-statement reasoning, no table needed)
    {
      kind: "formula" as const,
      slug: "suez-statement-evaluation",
      name: "Reading a Suez Canal statement set",
      intuition:
        "Several NDA questions present three statements about the Suez Canal and ask which are correct. The safe statements are the basics — it is a man-made canal, and it links the Mediterranean and the Red Sea. The risky statement is usually a COMPARISON (e.g. 'Suez is less significant than Panama'), which is the one to challenge: the Suez is generally regarded as MORE significant economically, so a 'Suez < Panama' claim is false.",
      definition:
        "When evaluating a Suez statement set, anchor on three facts:\n" +
        "- **TRUE** — Suez is a man-made navigation canal.\n" +
        "- **TRUE** — Suez links the Mediterranean Sea and the Red Sea.\n" +
        "- **Challenge** any claim that Suez's economic significance is LESS than Panama's — Suez is usually taken as the more significant of the two.",
      authoredExample: {
        prompt:
          "Three statements: (1) Suez is man-made; (2) Suez links the Mediterranean and Red Seas; (3) Suez is economically less significant than Panama. Which are correct?",
        steps: [
          "Statement 1 — Suez is a man-made navigation canal: correct.",
          "Statement 2 — Suez links the Mediterranean Sea and the Red Sea: correct.",
          "Statement 3 — claims Suez < Panama; Suez is generally the MORE significant canal, so this is incorrect.",
        ],
        answer: "Statements 1 and 2 only.",
      },
      selfCheckExample: {
        prompt: "True or false: 'The Suez Canal links the Atlantic and Pacific Oceans.'",
        steps: [
          "The Atlantic–Pacific link is the Panama Canal.",
          "Suez links the Mediterranean Sea and the Red Sea.",
        ],
        answer: "False — that describes the Panama Canal.",
      },
      practiceSet: [
        { prompt: "Is the Suez Canal man-made or natural?", answer: "Man-made" },
        { prompt: "Suez vs Panama: which is usually the more economically significant?", answer: "Suez" },
      ],
      pyqExampleId: "3b9e8e0e-e41c-4670-862f-5e53d53924cb", // Suez is/are correct = 1 and 2 only
    },

    // 3. water bodies + rivers + wetlands (reference)
    {
      kind: "reference" as const,
      slug: "water-bodies-rivers-wetlands",
      name: "Landlocked seas, rivers and wetlands",
      intuition:
        "A landlocked water body has no natural connection to an open ocean — the Caspian Sea is the world's classic example (it is technically the largest lake). Beyond that, the NDA picks named river/wetland facts: the Helmand River runs from the Hindu Kush into Afghanistan's Hamoun wetlands, the Great Artesian Basin's groundwater lies mostly under Queensland in Australia, and India has 27 Ramsar (internationally important) wetland sites.",
      definition:
        "- **Caspian Sea** — landlocked (largest enclosed inland water body / lake on Earth); the Mediterranean, Black and Red Seas all connect to oceans.\n" +
        "- **Helmand River** — rises in the **Hindu Kush**, flows ~1,100 km and drains into the **Hamoun wetlands**; its water is disputed between Afghanistan and Iran.\n" +
        "- **Great Artesian Basin** — Australia's huge groundwater basin; its major portion lies under **Queensland**.\n" +
        "- **Ramsar sites** — wetlands of international importance; India had **27** enlisted (as tested by the NDA at the time).",
      table: {
        columns: ["Feature", "Key fact"],
        rows: [
          {
            cells: ["Landlocked water body", "**Caspian Sea**"],
            noteAmber: "NDA 2024 — the Caspian Sea is landlocked; the Mediterranean, Black and Red Seas are not.",
          },
          {
            cells: ["**Helmand** River", "Hindu Kush → Hamoun wetlands; Afghanistan–Iran water dispute"],
            noteAmber: "NDA 2023 — identify the river by the Hindu Kush origin + Hamoun destination.",
          },
          { cells: ["Great Artesian Basin", "Mostly under **Queensland**, Australia"] },
          { cells: ["India's Ramsar sites", "**27** (as tested)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these is a landlocked water body: Mediterranean Sea, Black Sea, Red Sea, Caspian Sea?",
        steps: [
          "The Mediterranean, Black and Red Seas all connect to oceans through straits and other seas.",
          "The Caspian Sea is fully enclosed by land.",
        ],
        answer: "Caspian Sea.",
      },
      practiceSet: [
        { prompt: "Name the world's classic landlocked water body.", answer: "Caspian Sea" },
        { prompt: "The Helmand River drains into which wetlands?", answer: "Hamoun wetlands" },
        { prompt: "The Great Artesian Basin lies mostly under which Australian state?", answer: "Queensland" },
        { prompt: "How many Ramsar sites had India enlisted (as tested)?", answer: "27" },
      ],
      pyqExampleId: "6b6626a4-ef0f-4f31-a98b-ad2682098412", // landlocked = Caspian Sea
      traps: [
        {
          title: "The Caspian is a 'Sea' in name but landlocked in fact",
          body:
            "Don't be fooled by names: the Black Sea and Red Sea connect to the ocean, but the **Caspian Sea** does not — it is the landlocked one (the largest lake on Earth).",
        },
      ],
    },
  ],
};
