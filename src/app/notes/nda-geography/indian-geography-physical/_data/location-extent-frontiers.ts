import type { SubtopicNote } from "@/app/notes/_types";

export const LOCATION_EXTENT_FRONTIERS_NOTE: SubtopicNote = {
  subtopicName: "Location, Extent and Frontiers of India",
  title: "Location, Extent and Frontiers of India",
  oneLineDefinition:
    "India stretches about 30 degrees of longitude east to west — enough for a two-hour gap in sunrise — and 30 degrees of latitude north to south, with a long coastline and land frontiers shared with seven neighbours.",
  whyItMatters:
    "5 PYQs, foundational 'where is India' recall. Two ideas earn the marks: the east-west extent (sunrise is earliest in the far east, so order any sunrise/longitude list from east to west), and the coastline-and-border facts (which state has the longest coastline among those listed; which states touch more than one country). Pin the standard meridian and the neighbour list.",
  concepts: [
    // 1. location & extent (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "location-and-extent",
      name: "India's location, extent and the sunrise gap",
      intuition:
        "India lies entirely in the Northern and Eastern hemispheres. It is almost as wide as it is tall: about **30 degrees of longitude east to west** and **30 degrees of latitude north to south**. Because the Earth turns 15 degrees of longitude per hour, that 30-degree width means the sun rises in the far-eastern tip (Arunachal Pradesh) about **two hours before** it rises in the far west (Gujarat). To keep one clock for the whole country, India uses a Standard Meridian.",
      definition:
        "- **Latitudinal extent** — roughly **8 degrees N to 37 degrees N** (mainland to ~37 N). The **Tropic of Cancer (23.5 N)** runs through the middle.\n" +
        "- **Longitudinal extent** — roughly **68 degrees E to 97 degrees E** (~30 degrees wide).\n" +
        "- **Sunrise gap** — 30 degrees of longitude at 15 degrees per hour = **~2 hours**: the sun rises in eastern Arunachal about two hours before western Gujarat.\n" +
        "- **Standard Meridian** — India keeps a single time (IST) on the **82.5 degrees E** meridian (passing near Mirzapur), so the whole country shares one clock despite the 2-hour real gap.\n" +
        "- **Ordering places** — the sun rises in the EAST first, so in any 'order by sunrise' or 'west-to-east' list, sort by longitude (easternmost place sees sunrise first).",
      visualizationSlug: "igp-india-extent",
      authoredExample: {
        prompt:
          "About how many hours before western Gujarat does the sun rise in eastern Arunachal Pradesh?",
        steps: [
          "Arunachal (~97 E) and Gujarat (~68 E) are about 29-30 degrees of longitude apart.",
          "Each 15 degrees of longitude is one hour of solar time.",
          "30 divided by 15 per hour is about 2 hours, with Arunachal ahead (the sun rises in the east first).",
        ],
        answer: "About two hours.",
      },
      selfCheckExample: {
        prompt:
          "Arrange these cities from WEST to EAST: Bilaspur, Jodhpur, Bhopal, Ranchi.",
        steps: [
          "Jodhpur (Rajasthan) is the westernmost.",
          "Bhopal (Madhya Pradesh) is next, then Bilaspur (Chhattisgarh).",
          "Ranchi (Jharkhand) is the easternmost.",
        ],
        answer: "Jodhpur, Bhopal, Bilaspur, Ranchi.",
      },
      practiceSet: [
        { prompt: "India's Standard Meridian is which longitude?", answer: "82.5 degrees E" },
        { prompt: "The sun rises first in the east or the west?", answer: "East" },
        { prompt: "India's east-west extent is about how many hours of sun-time?", answer: "About 2 hours (~30 degrees of longitude)" },
      ],
      pyqExampleId: "f09eb31e-d9ab-4de4-82f9-ef19bb90ce9f", // Arunachal-Gujarat 2 hours
      traps: [
        {
          title: "Order sunrise lists EAST first",
          body:
            "The sun rises first in the east. In any 'chronological order of sunrise' question, the EASTERNMOST place comes first — sort the places by longitude. 15 degrees of longitude equals one hour, so India's ~30-degree spread gives a ~2-hour gap between its eastern and western edges.",
        },
      ],
    },

    // 2. coastline & frontiers (reference)
    {
      kind: "reference" as const,
      slug: "coastline-and-frontiers",
      name: "Coastline and land frontiers",
      intuition:
        "India has a long coastline and shares land borders with seven neighbours. Among the maritime states the bank usually lists, Tamil Nadu has the longest coastline (Gujarat has the longest overall, but it is rarely an option). On the land side, the north-eastern states differ in how many countries they touch — Tripura borders only Bangladesh, while Arunachal Pradesh borders three countries.",
      definition:
        "- **Coastline** — India's total coastline is about **7,500 km**. **Gujarat** has the longest of any state; among the commonly-listed eastern states (Odisha, Tamil Nadu, Karnataka, West Bengal), **Tamil Nadu** is the longest.\n" +
        "- **Land neighbours (7)** — Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar, Bangladesh.\n" +
        "- **Frontier states (north-east)** — **Arunachal Pradesh** borders **3** countries (China, Bhutan, Myanmar); **Mizoram** borders **2** (Bangladesh, Myanmar); **Assam** borders **2** (Bhutan, Bangladesh); **Tripura** borders only **1** (Bangladesh).",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          {
            cells: ["Longest coastline among Odisha/TN/Karnataka/WB", "**Tamil Nadu**"],
            noteAmber: "NDA 2017 — among the listed states; Gujarat is longest overall but was not an option.",
            pyqExampleId: "9f38e87d-c8fb-4f9f-b801-f3be694e882d",
          },
          {
            cells: ["NE state that does NOT border 2+ countries", "**Tripura** (only Bangladesh)"],
            noteAmber: "NDA 2020 — Tripura touches just one country; Arunachal/Mizoram touch two or more.",
            pyqExampleId: "cafefe16-ae7d-4a23-ae7e-be6f721a839f",
          },
          { cells: ["Number of land neighbours of India", "Seven"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which north-eastern state does NOT share an international border with two or more countries: Arunachal Pradesh, Mizoram or Tripura?",
        steps: [
          "Arunachal Pradesh borders China, Bhutan and Myanmar (3 countries).",
          "Mizoram borders Bangladesh and Myanmar (2 countries).",
          "Tripura borders only Bangladesh (1 country).",
        ],
        answer: "Tripura.",
      },
      practiceSet: [
        { prompt: "How many countries does India share a land border with?", answer: "Seven" },
        { prompt: "Which state has the longest coastline in India overall?", answer: "Gujarat" },
        { prompt: "How many countries does Tripura border?", answer: "One (Bangladesh)" },
      ],
      pyqExampleId: "9f38e87d-c8fb-4f9f-b801-f3be694e882d", // longest coastline among listed = TN
      traps: [
        {
          title: "Coastline answer is option-bound",
          body:
            "Gujarat has the longest coastline of any Indian state, but it is often left out of the options. Read the four choices — among Odisha, Tamil Nadu, Karnataka and West Bengal, the answer is Tamil Nadu.",
        },
      ],
    },
  ],
};
