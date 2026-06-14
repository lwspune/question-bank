import type { SubtopicNote } from "@/app/notes/_types";

export const STATES_AND_ISLANDS_NOTE: SubtopicNote = {
  subtopicName: "Indian States and Islands",
  title: "Indian States and Islands",
  oneLineDefinition:
    "India's states differ in size, borders and economy, and its island groups — the Andaman & Nicobar in the Bay of Bengal and Lakshadweep in the Arabian Sea — carry their own distinct geography and coral reefs.",
  whyItMatters:
    "4 PYQs, all MODERATE 'which statement is NOT correct' items. The marks come from precise state facts (Assam's borders, state-size and GDP claims) and island facts (the Andaman & Nicobar climate, the Ten Degree Channel, coral-reef areas). Recall the exact figures — the trap is always one wrong number in an otherwise-true list.",
  concepts: [
    // 1. states facts (reference)
    {
      kind: "reference" as const,
      slug: "states-facts",
      name: "State borders, size and economy facts",
      intuition:
        "These come as multi-statement 'which is NOT correct' questions, so you need the exact figures. **Assam** borders **2 countries (Bhutan and Bangladesh) and 7 Indian states**. Watch the size ranking: **Rajasthan is the LARGEST state by area and Madhya Pradesh the SECOND** — the claim 'MP is the fourth largest' is a common false statement. The Hornbill festival is in Nagaland; Telangana sits on the Deccan Plateau.",
      definition:
        "- **Assam** — shares international borders with **2 countries (Bhutan and Bangladesh)** and adjoins **7 Indian states** (Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, West Bengal). Assam does NOT touch China — that is Arunachal Pradesh.\n" +
        "- **State size** — **Rajasthan** is the largest state by area, followed by **Madhya Pradesh** (second); the claim 'Madhya Pradesh is the FOURTH largest' is FALSE.\n" +
        "- **Festivals & regions** — **Hornbill festival** → Nagaland; **Telangana** sits in the Deccan Plateau in the central peninsula.",
      table: {
        columns: ["Fact", "Value"],
        rows: [
          {
            cells: ["Assam's borders", "**2 countries (Bhutan, Bangladesh), 7 Indian states**"],
            noteAmber: "NDA 2025 NDA-2 keyed this as '3 countries, 7 states' (option C). Geographically Assam borders only 2 countries — it does NOT touch China (that is Arunachal). Treat the official answer as a paper quirk; the correct count is 2.",
            pyqExampleId: "8f34b21d-43f1-4912-9925-8ce36db572d8",
          },
          {
            cells: ["FALSE statement trap", "'MP is the 4th largest state' is wrong"],
            noteAmber: "NDA 2023 — Madhya Pradesh is NOT the fourth largest by area (it is the second).",
            pyqExampleId: "fd7fe711-65fe-4a52-acba-f272588d6499",
          },
          { cells: ["Hornbill festival", "Nagaland"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Area-wise, which is the largest Indian state, and where does Madhya Pradesh rank?",
        steps: [
          "Rajasthan is the largest state by area.",
          "Madhya Pradesh is the second largest (a common trap calls it the fourth).",
        ],
        answer: "Rajasthan is largest; Madhya Pradesh is second.",
      },
      practiceSet: [
        { prompt: "Assam borders how many countries and states?", answer: "2 countries (Bhutan, Bangladesh), 7 states" },
        { prompt: "Which is the largest Indian state by area?", answer: "Rajasthan" },
        { prompt: "The Hornbill festival is held in which state?", answer: "Nagaland" },
      ],
      pyqExampleId: "fd7fe711-65fe-4a52-acba-f272588d6499", // MP not 4th-largest (clean key)
      traps: [
        {
          title: "Madhya Pradesh is SECOND, not fourth, largest",
          body:
            "A 'which statement is NOT correct' question slips in 'area-wise Madhya Pradesh is the fourth largest state'. That is FALSE — Rajasthan is first and Madhya Pradesh is second by area.",
        },
        {
          title: "Assam borders 2 countries, not 3",
          body:
            "Assam shares international borders with **Bhutan and Bangladesh** only (2 countries) plus 7 Indian states. A 2025 paper keyed the answer as '3 countries', apparently miscounting China — but **China borders Arunachal Pradesh, not Assam**. Know the correct count is 2.",
        },
      ],
    },

    // 2. islands and coral reefs (reference)
    {
      kind: "reference" as const,
      slug: "islands-coral-reefs",
      name: "Andaman & Nicobar, Lakshadweep and coral reefs",
      intuition:
        "Two island groups. The **Andaman & Nicobar Islands** (Bay of Bengal) have a humid tropical coastal climate, are split by the **10° Channel**, and are home to Negrito tribes — but their **maximum rainfall is in the south-west monsoon (May–November), NOT March–April**. **Coral reefs** fringe the Gulf of Kachchh, Gulf of Mannar, Lakshadweep and the Andaman & Nicobar Islands.",
      definition:
        "- **Andaman & Nicobar Islands** — humid tropical coastal climate; **Negrito** tribes; the **10° Channel** (~150 km wide) separates the Andaman group from the Nicobar group. Their **maximum rainfall is NOT in March–April** (it comes with the monsoon, roughly May–November) — that is the false statement the bank tests.\n" +
        "- **Coral-reef areas of India** — **Gulf of Kachchh, Gulf of Mannar, Lakshadweep, Andaman & Nicobar Islands** (all four are major reef areas).",
      table: {
        columns: ["Fact", "Detail"],
        rows: [
          {
            cells: ["Major coral-reef areas", "Gulf of Kachchh, Gulf of Mannar, Lakshadweep, A&N Islands"],
            noteAmber: "NDA 2017 — all four (1, 2, 3 and 4) are major coral-reef areas.",
            pyqExampleId: "478e270c-5e53-4c1b-baf4-72144904fca9",
          },
          {
            cells: ["A&N false-statement trap", "'Max rainfall March–April' is WRONG"],
            noteAmber: "NDA 2024 — A&N rainfall is monsoon-driven, NOT March–April.",
            pyqExampleId: "f32cb7f7-0145-4683-8d51-efc4e8aad85a",
          },
          { cells: ["10° Channel", "Separates Andaman from Nicobar (~150 km)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statement is NOT correct about the Andaman & Nicobar Islands: humid tropical climate / max rainfall March–April / separated by the 10° Channel / inhabited by Negrito tribes?",
        steps: [
          "Humid tropical climate, the 10° Channel and Negrito tribes are all true.",
          "Their heaviest rain comes with the monsoon (≈ May–November), not in March–April.",
        ],
        answer: "Maximum rainfall occurs between March and April (false).",
      },
      practiceSet: [
        { prompt: "Name India's four major coral-reef areas.", answer: "Gulf of Kachchh, Gulf of Mannar, Lakshadweep, Andaman & Nicobar" },
        { prompt: "Which channel separates the Andaman from the Nicobar group?", answer: "The 10° Channel" },
        { prompt: "When does A&N get most of its rain?", answer: "With the monsoon (≈ May–November), not March–April" },
      ],
      pyqExampleId: "478e270c-5e53-4c1b-baf4-72144904fca9", // coral reef areas
      traps: [
        {
          title: "A&N rainfall is monsoon-driven, not March–April",
          body:
            "The false statement in the Andaman & Nicobar question is 'maximum rainfall occurs between March and April'. The islands get their heaviest rain from the south-west monsoon (roughly May–November). The climate, the 10° Channel and the Negrito-tribe facts are all true.",
        },
      ],
    },
  ],
};
