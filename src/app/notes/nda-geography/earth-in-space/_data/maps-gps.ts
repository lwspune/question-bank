import type { SubtopicNote } from "@/app/notes/_types";

export const MAPS_GPS_NOTE: SubtopicNote = {
  subtopicName: "Maps and GPS",
  title: "Maps and GPS",
  oneLineDefinition:
    "A map needs a place's latitude and longitude to pin it down, while the Global Positioning System uses a network of orbiting satellites and triangulation to give your latitude, longitude and altitude.",
  whyItMatters:
    "2 PYQs, both EASY. Two facts cover them: to LOCATE a place on a map you need both its latitude and its longitude (altitude is extra, not required), and GPS is a satellite-triangulation system that gives 3-D position for civilian AND military use — it is NOT military-only.",
  concepts: [
    // 1. Locating a place on a map (formula, no box)
    {
      kind: "formula" as const,
      slug: "locating-on-map",
      name: "What you need to locate a place on a map",
      intuition:
        "To pin a single point on a flat map you need TWO coordinates: how far north or south (**latitude**) and how far east or west (**longitude**). One alone is not enough — latitude alone gives you a whole east-west line, longitude alone a whole north-south line. Altitude (height) tells you nothing about WHERE on the map a place is, only how high it stands.",
      definition:
        "- To **locate a place on a map you need BOTH its latitude and its longitude** — the pair fixes the point where the two lines cross.\n" +
        "- **Latitude alone** is insufficient (it names a full east-west parallel); **longitude alone** is insufficient (it names a full north-south meridian).\n" +
        "- **Altitude is NOT required** to locate a place on a map — altitude is the height above sea level, a vertical measure, not a horizontal position.",
      authoredExample: {
        prompt:
          "You hear of an unfamiliar town on the news and want to find it on a map. What is the minimum information you need?",
        steps: [
          "A map position is a horizontal point, fixed by two coordinates.",
          "Those are latitude (north-south) and longitude (east-west).",
          "Altitude would tell you the height, not the map position.",
        ],
        answer: "Both the latitude and the longitude of the place.",
      },
      selfCheckExample: {
        prompt: "Is knowing only a place's latitude enough to locate it on a map?",
        steps: [
          "Latitude alone fixes an entire east-west parallel, not a single point.",
          "You also need the longitude to find where on that parallel the place sits.",
        ],
        answer: "No — you also need the longitude.",
      },
      practiceSet: [
        { prompt: "Minimum coordinates to locate a place on a map?", answer: "Latitude and longitude" },
        { prompt: "Is altitude needed to locate a place on a map?", answer: "No" },
        { prompt: "Latitude alone fixes what?", answer: "A whole east-west parallel (not a point)" },
      ],
      pyqExampleId: "c9b51702-115e-4544-a0b1-4793c1eebd25", // need both longitude and latitude
      traps: [
        {
          title: "Altitude is not needed to LOCATE a place",
          body:
            "A choice offers 'latitude, longitude AND altitude'. Altitude is a vertical height — it does not help fix the horizontal map position. The correct minimum is just **latitude and longitude**.",
        },
      ],
    },

    // 2. GPS facts (reference)
    {
      kind: "reference" as const,
      slug: "gps-facts",
      name: "What GPS is and what it does",
      intuition:
        "The Global Positioning System is a ring of satellites that lets a receiver work out exactly where it is. The receiver listens to several satellites and uses **triangulation** to compute its **latitude, longitude AND altitude**. Crucially, although GPS began as a military system, it is now used by everyone — phones, cars, ships, surveyors — so it is NOT for the military only.",
      definition:
        "GPS in four facts. The NDA tests the ONE statement that is NOT correct (it is military-only):",
      table: {
        columns: ["GPS feature", "Correct?", "Detail"],
        rows: [
          { cells: ["Based on a network of orbiting satellites", "TRUE", "A constellation of satellites circling above the Earth"] },
          { cells: ["Uses the system of triangulation", "TRUE", "Distances from several satellites are combined to fix the position"] },
          { cells: ["Gives latitude, longitude and altitude", "TRUE", "GPS receivers report full 3-D position"] },
          {
            cells: ["For military operations ONLY", "FALSE", "Widely civilian — navigation, mapping, surveying, phones"],
            noteAmber: "NDA 2022 — this is the 'NOT correct' statement: GPS is NOT exclusively military.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which statement about GPS is NOT correct: (a) based on satellites, (b) uses triangulation, (c) gives latitude/longitude/altitude, (d) for military use only?",
        steps: [
          "(a), (b) and (c) are all true features of GPS.",
          "(d) is false — GPS is used widely by civilians too, not exclusively by the military.",
        ],
        answer: "(d) — 'for military operations only' is the incorrect statement.",
      },
      practiceSet: [
        { prompt: "GPS relies on a network of what?", answer: "Orbiting satellites" },
        { prompt: "What technique does GPS use to fix position?", answer: "Triangulation" },
        { prompt: "Which three values does a GPS receiver give?", answer: "Latitude, longitude and altitude" },
        { prompt: "Is GPS for military use only?", answer: "No — it is widely civilian too" },
      ],
      pyqExampleId: "cbd856b6-f1b7-4240-a491-f8f4fd8d00cb", // GPS 'not correct' = military-only
      traps: [
        {
          title: "GPS is not military-only",
          body:
            "The 'which statement is NOT correct' twist hides the falsehood that GPS serves the military **exclusively**. GPS is everywhere in civilian life — that statement is the wrong one to pick as the answer.",
        },
      ],
    },
  ],
};
