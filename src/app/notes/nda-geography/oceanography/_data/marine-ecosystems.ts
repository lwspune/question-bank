import type { SubtopicNote } from "@/app/notes/_types";

export const MARINE_ECOSYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Marine Ecosystems — Coral Reefs",
  title: "Marine Ecosystems — Coral Reefs",
  oneLineDefinition:
    "Coral reefs are living limestone structures built by tiny coral animals in warm, shallow, clear, sunlit tropical seas — and the most fragile marine ecosystem, vulnerable to bleaching and predators.",
  whyItMatters:
    "3 PYQs, spanning EASY to HARD. The marks come from two things: the three reef types and the conditions corals need (warm, shallow, clear, salty tropical water), and a couple of named-feature facts (the Mariana Trench's ocean; reef bleaching by the crown-of-thorns starfish). This subtopic also catches a stray ocean-feature question, so the warm/cold-current lists stay relevant here too.",
  concepts: [
    // 1. coral reef types + conditions (reference + diagram)
    {
      kind: "reference" as const,
      slug: "coral-reef-types",
      name: "Coral reefs — types and growing conditions",
      intuition:
        "Coral reefs are built by colonies of tiny animals (coral polyps) that secrete limestone. They are picky: they need WARM, SHALLOW, CLEAR, salty water in the sunlit tropics. As a volcanic island slowly sinks, its reef passes through three stages — a fringing reef against the shore, then a barrier reef offset by a lagoon, and finally an atoll: a ring of reef around a lagoon where the island has vanished.",
      definition:
        "Conditions corals need: **warm** (about 20–30°C), **shallow + clear** (sunlit, sediment-free), **normal-salinity tropical** sea water. Cold, deep, muddy or fresh water kills them.\n" +
        "The three reef types (a developmental sequence around a subsiding island):\n" +
        "- **Fringing reef** — grows directly against the island's shore, with little or no lagoon.\n" +
        "- **Barrier reef** — separated from the coast by a wide lagoon (e.g. the Great Barrier Reef).\n" +
        "- **Atoll** — a ring of coral enclosing a central lagoon, left after the volcanic island sinks below the sea.\n" +
        "Reefs are fragile: **bleaching** (corals expelling their algae) follows warming or predator outbreaks — the **crown-of-thorns starfish** is a major reef destroyer (e.g. Keppel Island, Great Barrier Reef).",
      table: {
        columns: ["Reef type", "Form"],
        rows: [
          { cells: ["**Fringing reef**", "Hugs the island shore (no real lagoon)"] },
          { cells: ["**Barrier reef**", "Offset from shore by a wide lagoon"] },
          {
            cells: ["**Atoll**", "Ring of reef around a lagoon (island sunk)"],
            noteAmber: "An atoll marks where a volcanic island has subsided entirely.",
          },
        ],
        caption: "Fringing → Barrier → Atoll: the stages of reef growth as a volcanic island slowly sinks.",
      },
      selfCheckExample: {
        prompt:
          "Keppel Island on the Great Barrier Reef was badly bleached. Which expanding organism is mainly blamed?",
        steps: [
          "Reef damage from a predator outbreak points to the crown-of-thorns starfish.",
          "Blue whales, octopus and sea horses do not destroy coral on this scale.",
        ],
        answer: "The (crown-of-thorns) starfish.",
      },
      practiceSet: [
        { prompt: "Name the three coral-reef types in order of development.", answer: "Fringing → Barrier → Atoll" },
        { prompt: "What kind of water do corals need?", answer: "Warm, shallow, clear, salty tropical water" },
        { prompt: "A ring of reef enclosing a lagoon (island gone) is called?", answer: "An atoll" },
        { prompt: "Which predator is a major reef destroyer?", answer: "The crown-of-thorns starfish" },
      ],
      visualizationSlug: "ocn-coral-reef-types",
      pyqExampleId: "825acba3-4b0b-4a16-8861-ac2832fd0b13", // Keppel Island bleached by starfish
      traps: [
        {
          title: "The reef destroyer is a STARFISH",
          body:
            "Reef bleaching at Keppel Island is blamed on the expanding **crown-of-thorns starfish**, not on whales, octopus or sea horses. The starfish eats the living coral.",
        },
        {
          title: "Atoll = island gone, barrier = lagoon between",
          body:
            "Don't mix the stages: a **barrier reef** still has an island inside its lagoon; an **atoll** is the ring left AFTER the island has sunk completely.",
        },
      ],
    },

    // 2. named ocean features (reference) — catches Mariana Trench + Pacific current
    {
      kind: "reference" as const,
      slug: "named-ocean-features",
      name: "Named ocean features and currents to place",
      intuition:
        "The NDA likes single-fact 'which ocean / which is the odd one out' questions about named marine features. Two recur here: the Mariana Trench (the deepest point, in the WESTERN Pacific) and identifying which current belongs to a given ocean. Tie these to the sea-floor and current lists you already learned.",
      definition:
        "- **Mariana Trench** — the deepest point on Earth, in the **Western Pacific Ocean** (NOT the Atlantic, NOT the eastern Pacific).\n" +
        "- **Pacific Ocean currents** include **Oyashio**, **Alaska**, and **California** currents.\n" +
        "- The **Agulhas Current** belongs to the **Indian Ocean**, so it is NOT a Pacific current — the classic odd-one-out.",
      table: {
        columns: ["Feature", "Where it belongs"],
        rows: [
          {
            cells: ["**Mariana Trench**", "Western Pacific Ocean (deepest point)"],
            noteAmber: "NDA 2017 — Mariana Trench is in the Western Pacific, not the Atlantic.",
          },
          { cells: ["Oyashio, Alaska, California currents", "Pacific Ocean"] },
          {
            cells: ["**Agulhas Current**", "Indian Ocean (NOT Pacific)"],
            noteAmber: "NDA 2020 — Agulhas is the non-Pacific current in the list.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these is NOT a current of the Pacific Ocean: Oyashio, Alaska, Agulhas, California?",
        steps: [
          "Oyashio, Alaska and California are all Pacific currents.",
          "The Agulhas Current flows in the Indian Ocean, off south-east Africa.",
        ],
        answer: "Agulhas current (it is an Indian Ocean current).",
      },
      practiceSet: [
        { prompt: "In which ocean is the Mariana Trench?", answer: "Western Pacific Ocean" },
        { prompt: "Which ocean does the Agulhas current belong to?", answer: "The Indian Ocean" },
        { prompt: "Name one Pacific Ocean current.", answer: "Oyashio / Alaska / California (any)" },
      ],
      pyqExampleId: "c18ce16c-cd9b-4458-acae-ccfe75ec87dc", // Mariana Trench = Western Pacific
      traps: [
        {
          title: "Mariana Trench is in the WESTERN Pacific",
          body:
            "Not the Atlantic and not the EASTERN Pacific — the Mariana Trench (deepest point on Earth) lies in the **Western Pacific Ocean**, near Guam.",
        },
        {
          title: "Agulhas is the non-Pacific current",
          body:
            "In a 'which is NOT a Pacific current' list, **Agulhas** is the trap answer — it is an **Indian Ocean** current. Oyashio, Alaska and California are the genuine Pacific ones.",
        },
      ],
    },
  ],
};
