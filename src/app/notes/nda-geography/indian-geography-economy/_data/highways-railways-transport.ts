import type { SubtopicNote } from "@/app/notes/_types";

export const HIGHWAYS_RAILWAYS_TRANSPORT_NOTE: SubtopicNote = {
  subtopicName: "Highways, Railways and Transport Corridors",
  title: "Highways, Railways and Transport Corridors",
  oneLineDefinition:
    "India's road network programmes, the Golden Quadrilateral and N-S/E-W corridors, and the railway zones with their headquarters.",
  whyItMatters:
    "About 10 PYQs, with a HARD core because the railway-zone-to-headquarters match-lists are pure memorisation. The marks split between (1) the railway zones and their HQ cities, (2) the highway corridors (Golden Quadrilateral's longest leg, where the N-S and E-W corridors cross), and (3) a few road-body facts. The railway-zone table is the single highest-yield thing to drill here.",
  concepts: [
    // 1. FOUNDATION — railway zones and HQ (reference)
    {
      kind: "reference" as const,
      slug: "railway-zones-hq",
      name: "Railway zones and their headquarters",
      intuition:
        "The railway-zone-to-headquarters pairs are the chapter's most-repeated match-list, so commit the table to memory. The trickiest are the look-alikes: East Central → Hajipur (Bihar), North Eastern → Gorakhpur, Northeast Frontier → Maligaon (Guwahati), North Western → Jaipur, West Central → Jabalpur, South East Central → Bilaspur, Eastern → Kolkata, South Eastern → Kolkata. A useful elimination fact: Jharkhand has NO railway-zone headquarters.",
      definition:
        "- **Eastern → Kolkata**; **South Eastern → Kolkata**; **East Central → Hajipur (Bihar)**.\n" +
        "- **North Eastern → Gorakhpur**; **Northeast Frontier → Maligaon (Guwahati)**; **North Western → Jaipur**.\n" +
        "- **West Central → Jabalpur**; **South East Central → Bilaspur**.\n" +
        "- **Jharkhand has NO railway-zone HQ** (the impostor in a 'which state has no zone HQ' list). Hajipur is in Bihar, not Jharkhand.",
      table: {
        columns: ["Railway zone", "Headquarters"],
        rows: [
          {
            cells: ["East Central", "Hajipur (Bihar)"],
            noteAmber: "NDA 2022 (Sep) — East Central HQ is Hajipur.",
          },
          { cells: ["North Eastern", "Gorakhpur"] },
          { cells: ["Northeast Frontier", "Maligaon (Guwahati)"] },
          { cells: ["North Western", "Jaipur"] },
          {
            cells: ["**Eastern / South Eastern**", "Kolkata (both)"],
            noteAmber: "NDA 2017 / 2021 — Eastern HQ and South-Eastern HQ are both at Kolkata.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which state does NOT have the headquarters of any Railway Zone: Jharkhand, Chhattisgarh, Odisha, Bihar?",
        steps: [
          "Chhattisgarh has Bilaspur (SEC), Bihar has Hajipur (East Central), Odisha has Bhubaneswar (East Coast).",
          "Jharkhand hosts no railway-zone headquarters.",
        ],
        answer: "Jharkhand.",
      },
      practiceSet: [
        { prompt: "Headquarters of Eastern Railway?", answer: "Kolkata" },
        { prompt: "East Central Railway is headquartered at?", answer: "Hajipur" },
        { prompt: "North Eastern Railway HQ?", answer: "Gorakhpur" },
      ],
      pyqExampleId: "2318b8c5-d3a3-4e6b-9b65-7ccaf83691ce", // Eastern Railway HQ = Kolkata
      traps: [
        {
          title: "Hajipur is Bihar, not Jharkhand",
          body:
            "In 'which state has no railway-zone HQ' questions, the trap is to confuse Hajipur (East Central, in **Bihar**) with Jharkhand. **Jharkhand** is the state with no zone HQ.",
        },
      ],
    },

    // 2. highway corridors (REFERENCE)
    {
      kind: "reference" as const,
      slug: "highway-corridors",
      name: "Golden Quadrilateral and the N-S / E-W corridors",
      intuition:
        "Two flagship highway projects anchor the corridor questions. The GOLDEN QUADRILATERAL links Delhi-Mumbai-Chennai-Kolkata; its longest single leg is Delhi-Kolkata. The NORTH-SOUTH and EAST-WEST corridors cross each other at JHANSI (in Uttar Pradesh) — not Bhopal or Itarsi. Know the four metros of the GQ, its longest arm, and the crossing city.",
      definition:
        "- **Golden Quadrilateral** — connects Delhi, Mumbai, Chennai, Kolkata. Its **longest section is Delhi–Kolkata**.\n" +
        "- **North-South corridor** runs Srinagar–Kanyakumari; **East-West corridor** runs Silchar–Porbandar. They **cross at Jhansi**.\n" +
        "- Bharatmala continues this road-building thrust (see Economic Sectors).",
      table: {
        columns: ["Project", "Key fact"],
        rows: [
          {
            cells: ["Golden Quadrilateral", "Longest leg = Delhi–Kolkata"],
            noteAmber: "NDA 2017 — Delhi–Kolkata is the longest GQ section.",
          },
          {
            cells: ["N-S & E-W corridors", "Cross at Jhansi"],
            noteAmber: "NDA 2023 (Sep) — the corridors intersect at Jhansi.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which leg of the Golden Quadrilateral is the longest by route distance?",
        steps: [
          "The GQ joins Delhi, Mumbai, Chennai and Kolkata in a loop.",
          "The longest single arm runs Delhi to Kolkata across the Gangetic plain.",
        ],
        answer: "Delhi–Kolkata.",
      },
      practiceSet: [
        { prompt: "Longest section of the Golden Quadrilateral?", answer: "Delhi–Kolkata" },
        { prompt: "Where do the N-S and E-W corridors cross?", answer: "Jhansi" },
        { prompt: "Name the four metros joined by the GQ.", answer: "Delhi, Mumbai, Chennai, Kolkata" },
      ],
      pyqExampleId: "3c522246-a77c-4bd2-ada0-4645d8eaecf4", // corridors cross at Jhansi
    },

    // 3. road bodies + NH share (REFERENCE)
    {
      kind: "reference" as const,
      slug: "road-bodies-nh",
      name: "Highway bodies and National-Highway shares",
      intuition:
        "A few road-administration facts round out the subtopic. The Indian Academy of Highway Engineers is a registered society (its claim to be a joint Centre-State body is the wrong clause). And on National-Highway length by state, the catch is that Maharashtra does NOT hold the maximum share — so a statement crediting Maharashtra with the longest NH network is false, and the 'reason' built on it falls with it.",
      definition:
        "- **Indian Academy of Highway Engineers** — a **registered society** (statement 1 true). The claim that it is a collaborative Centre + State Government body is treated as not correct.\n" +
        "- **Maharashtra does NOT have the maximum share of National Highway length** — so both the claim and the terrain-based 'reason' are incorrect.\n" +
        "- (Uttar Pradesh and Rajasthan typically lead in NH length.)",
      table: {
        columns: ["Statement", "Verdict"],
        rows: [
          {
            cells: ["Indian Academy of Highway Engineers is a registered society", "Correct"],
            noteAmber: "NDA 2018 — only statement 1 holds.",
          },
          {
            cells: ["Maharashtra has the maximum NH length", "Incorrect"],
            noteAmber: "NDA 2022 (Sep) — neither statement is correct.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Is the Indian Academy of Highway Engineers a registered society?",
        steps: [
          "The body is indeed registered as a society — statement 1 is true.",
          "The second claim (a Centre+State collaborative body) is the wrong part.",
        ],
        answer: "Yes — it is a registered society (statement 1 only).",
      },
      practiceSet: [
        { prompt: "Is the Indian Academy of Highway Engineers registered?", answer: "Yes (a registered society)" },
        { prompt: "Does Maharashtra have the maximum NH length?", answer: "No" },
        { prompt: "Which states usually lead in NH length?", answer: "Uttar Pradesh and Rajasthan" },
      ],
      pyqExampleId: "fc9dcdb1-b364-4027-b645-8586efb0f388", // Maharashtra max NH -- neither correct
    },
  ],
};
