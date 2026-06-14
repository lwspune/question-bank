import type { SubtopicNote } from "@/app/notes/_types";

export const MARINE_ECOSYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Marine Ecosystems — Coral Reefs",
  title: "Marine Ecosystems — Coral Reefs",
  oneLineDefinition:
    "Coral reefs are living limestone structures built by tiny coral animals in warm, shallow, clear, sunlit tropical seas — and the most fragile marine ecosystem, vulnerable to bleaching and predators.",
  whyItMatters:
    "1 PYQ, but a high-yield idea: the three coral-reef types (fringing, barrier, atoll) and the conditions corals need — warm, shallow, clear, salty tropical water — plus what bleaches them (the crown-of-thorns starfish, rising sea temperatures).",
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
  ],
};
