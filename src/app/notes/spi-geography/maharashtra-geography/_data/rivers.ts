import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_MG_RIVERS_NOTE: SubtopicNote = {
  subtopicName: "Rivers on District Boundaries",
  title: "Rivers on District Boundaries",
  oneLineDefinition:
    "Many districts of Maharashtra are separated by a river: name the two districts and you should be able to name the river that runs between them.",
  whyItMatters:
    "Five questions in the bank, all from the 2022 paper (Q76 to Q80): one EASY, three MODERATE and one HARD. Each gives a pair of districts and four rivers, and one of them has the answer None of these, so you must know which rivers are not on the boundary as well as which one is.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spimgri-desh",
      name: "Boundary rivers of the Bhima and Godavari basins",
      intuition:
        "Western Maharashtra and Marathwada drain east. The Bhima and its tributary the Nira belong to the Krishna system; the Godavari crosses the state further north. Where these rivers run along a district edge, the district line follows the river.",
      definition:
        "- The **Nira** forms the boundary between **Pune** and **Satara**. It joins the Bhima.\n" +
        "- The **Bhima** forms the boundary between **Pune** and **Ahmednagar**. It is a tributary of the Krishna and never touches Beed.\n" +
        "- The **Godavari** rises at Trimbakeshwar in Nashik district. It runs along the northern edge of Ahmednagar (towards Aurangabad) and of Beed (towards Jalna).\n" +
        "- So **Ahmednagar and Beed** are not separated by the Godavari, the Bhima or the Nira.\n" +
        "- Two of these districts have new names: Aurangabad is now Chhatrapati Sambhajinagar and Ahmednagar is now Ahilyanagar. The 2022 paper uses the old names.",
      table: {
        columns: ["River", "Districts on either side", "River system"],
        rows: [
          { cells: ["Nira", "Pune and Satara", "Bhima, then Krishna"] },
          { cells: ["Bhima", "Pune and Ahmednagar", "Krishna"] },
          { cells: ["Godavari", "Ahmednagar and Aurangabad", "Godavari"] },
          {
            cells: ["Godavari", "Beed and Jalna", "Godavari"],
            noteAmber: "The Godavari passes north of both Ahmednagar and Beed, so it does not separate them from each other.",
          },
        ],
        caption: "The district line follows the river only along the stretch named here.",
      },
      selfCheckExample: {
        prompt: "Which river forms the boundary between Pune district and Ahmednagar district?",
        steps: [
          "Pune lies south and west of Ahmednagar.",
          "The Bhima flows east along the line between them before it enters Solapur district.",
        ],
        answer: "The Bhima.",
      },
      practiceSet: [
        { prompt: "Into which river does the Nira flow?", answer: "The Bhima" },
        { prompt: "The Bhima is a tributary of which large river?", answer: "The Krishna" },
        { prompt: "In which district does the Godavari rise?", answer: "Nashik (at Trimbakeshwar)" },
        { prompt: "Which river forms the boundary between Ahmednagar and Aurangabad districts?", answer: "The Godavari" },
      ],
      pyqExampleId: "30da71f6-433b-4673-9ba1-f29b7637f447",
      traps: [
        {
          title: "Mixing up the Bhima and the Nira",
          body:
            "Both are on Pune's border, but on different sides. The Nira separates Pune from Satara in the south; the Bhima separates Pune from Ahmednagar in the north east.",
        },
        {
          title: "Choosing the Godavari for Ahmednagar and Beed",
          body:
            "The Godavari flows along the northern edge of both districts, so it is the line between each of them and the district to its north. It is not the line between Ahmednagar and Beed, and when it is the only river on offer the answer is None of these.",
        },
        {
          title: "Putting the Bhima in Marathwada",
          body:
            "The Bhima flows from Pune into Solapur and on to Karnataka. It never reaches Beed, so it cannot be a boundary river for any Beed pair.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spimgri-edges",
      name: "Boundary rivers of the Konkan, Khandesh and Vidarbha",
      intuition:
        "Away from the Desh, three more boundary rivers come up. In the Konkan short rivers run west to the sea; in Khandesh the rivers belong to the Tapi; in eastern Vidarbha the Wainganga flows south towards the Godavari.",
      definition:
        "- The **Savitri** rises at Mahabaleshwar, flows west past Mahad and reaches the sea at Bankot. It forms the boundary between **Raigad** and **Ratnagiri**.\n" +
        "- The **Aner** is a tributary of the Tapi. It forms the boundary between **Dhule** and **Jalgaon**.\n" +
        "- The **Wainganga** (also spelt Vainganga) forms the boundary between **Chandrapur** and **Gadchiroli**. It joins the Wardha, and together they form the Pranhita, which flows into the Godavari.",
      table: {
        columns: ["River", "Districts on either side", "Region", "Flows into"],
        rows: [
          { cells: ["Savitri", "Raigad and Ratnagiri", "Konkan", "Arabian Sea"] },
          { cells: ["Aner", "Dhule and Jalgaon", "Khandesh", "Tapi"] },
          {
            cells: ["Wainganga", "Chandrapur and Gadchiroli", "Vidarbha", "Pranhita, then Godavari"],
            noteAmber: "Wainganga and Wardha together form the Pranhita.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which tributary of the Tapi forms the boundary between Dhule and Jalgaon districts?",
        steps: [
          "Dhule and Jalgaon are in Khandesh, the Tapi valley.",
          "The Tapi tributary that runs along the line between them is the Aner.",
        ],
        answer: "The Aner.",
      },
      practiceSet: [
        { prompt: "The Wainganga joins which river to form the Pranhita?", answer: "The Wardha" },
        { prompt: "At which hill station does the Savitri river rise?", answer: "Mahabaleshwar" },
        { prompt: "The Aner river is a tributary of which river?", answer: "The Tapi" },
        { prompt: "At which place does the Savitri river reach the Arabian Sea?", answer: "Bankot" },
      ],
      pyqExampleId: "77c7c380-d768-410a-8636-57ca8ef3e2a0",
      traps: [
        {
          title: "Taking the Amba for the Raigad and Ratnagiri line",
          body:
            "The Amba flows inside Raigad district. The river between Raigad and Ratnagiri is the Savitri, which meets the sea at Bankot.",
        },
        {
          title: "Looking for Desh rivers in Khandesh",
          body:
            "Dhule and Jalgaon lie in the Tapi valley. The Godavari and the Nira do not flow through Khandesh, so the boundary river there is a Tapi tributary, the Aner.",
        },
      ],
    },
  ],
};
