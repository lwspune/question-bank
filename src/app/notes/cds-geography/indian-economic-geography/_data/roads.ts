import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_EC_ROADS_NOTE: SubtopicNote = {
  subtopicName: "Roads, Railways and Airports",
  title: "Roads, Railways and Airports",
  oneLineDefinition:
    "The great highway corridors and the old national highway numbers, India's major road tunnels and a new mountain airport, and the headquarters of the railway zones.",
  whyItMatters:
    "Eleven CDS questions from 2016 to 2025. Four are on railway zone headquarters, three of them four-way matches. The highway questions use the OLD numbers (NH-2, NH-7) that were replaced in 2010, so learn the old routes as well as the new.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeec-highways",
      name: "Highway corridors and old highway numbers",
      intuition:
        "Think of India's road network as a box with a cross inside it. The box is the Golden Quadrilateral, joining the four metros. The cross is the North-South and East-West corridors. " +
        "Older questions still use the highway numbers from before 2010, so a few old routes are worth knowing.",
      definition:
        "- The **Golden Quadrilateral** (about 5,846 km) joins **Delhi, Mumbai, Chennai and Kolkata**. Its arms run through Jaipur and Ahmedabad (Delhi to Mumbai), Pune and Bengaluru (Mumbai to Chennai), Visakhapatnam and Bhubaneswar (Chennai to Kolkata), and Agra, Kanpur, Prayagraj and Varanasi (Kolkata to Delhi).\n" +
        "- The **North-South Corridor** runs from **Srinagar to Kanyakumari**; the **East-West Corridor** from **Silchar to Porbandar**.\n" +
        "- In **2010** the highways were **renumbered**: north-south highways now take **even** numbers and east-west highways **odd** numbers. **NH-44** (Srinagar to Kanyakumari, about 4,100 km) is now the longest.\n" +
        "- Under the **old numbers**, **NH-7** (Varanasi to Kanyakumari) was the longest. It ran through **Rewa, Katni and Jabalpur**, then Nagpur, Hyderabad, Bengaluru and Madurai.",
      table: {
        columns: ["Old number", "Route"],
        rows: [
          {
            cells: ["NH-2", "Delhi, Agra, Allahabad (Prayagraj), Kolkata"],
            noteAmber: "CDS 2017 (II): a match of old NH-2, NH-4, NH-7 and NH-8 with their routes.",
            pyqExampleId: "2154ef26-6487-4936-8a6a-e8dcbeb0901a",
          },
          { cells: ["NH-4", "Thane, Pune, Bengaluru, Chennai"] },
          { cells: ["NH-7", "Varanasi, Jabalpur, Nagpur, Hyderabad, Bengaluru, Madurai, Kanyakumari"] },
          { cells: ["NH-8", "Delhi, Jaipur, Ahmedabad, Mumbai"] },
        ],
      },
      pyqExampleId: "b4e1f188-2b2a-4a25-9104-629b1c7866ad",
      selfCheckExample: {
        prompt: "Under the 2010 numbering, north-south highways take even numbers and east-west highways odd numbers. Would a new highway running from Gujarat in the west to Assam in the east get an even or an odd number?",
        steps: [
          "Gujarat to Assam runs from west to east.",
          "East-west highways take odd numbers.",
        ],
        answer: "An odd number",
      },
      practiceSet: [
        { prompt: "Which is the longest national highway under the present numbering?", answer: "NH-44, from Srinagar to Kanyakumari" },
        { prompt: "Which route did old NH-8 follow?", answer: "Delhi, Jaipur, Ahmedabad, Mumbai" },
        { prompt: "Name the two ends of the East-West Corridor.", answer: "Silchar and Porbandar" },
        { prompt: "Which was the longest national highway under the old numbering?", answer: "NH-7, from Varanasi to Kanyakumari" },
      ],
      traps: [
        {
          title: "Old numbers in old papers",
          body: "Questions set from older books use the **pre-2010** numbers: NH-2 Delhi to Kolkata, NH-7 Varanasi to Kanyakumari, NH-8 Delhi to Mumbai. Do not answer them with the new numbers.",
        },
        {
          title: "The quadrilateral skips Lucknow",
          body: "The Delhi to Kolkata arm of the Golden Quadrilateral runs through **Kanpur, Prayagraj and Varanasi**, not Lucknow. The Delhi to Mumbai arm runs through **Jaipur and Ahmedabad**, nowhere near Indore.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-tunnels-air",
      name: "Road tunnels and a mountain airport",
      intuition:
        "Mountain roads close in winter when the passes fill with snow. A tunnel under the pass keeps the road open all year and cuts the distance too. " +
        "Two tunnels get confused in CDS: one is the longest road tunnel, the other the longest tunnel at a great height.",
      definition:
        "- The **Atal Tunnel** (about 9 km, opened 2020) runs under the **Rohtang pass** on the **Manali to Leh** road. It cuts about 46 km from the journey and keeps the Lahaul valley open in winter. It is the **longest highway tunnel above 10,000 feet**.\n" +
        "- The **Dr Syama Prasad Mookerjee Tunnel** (Chenani-Nashri, about 9.3 km, opened 2017) is on the **Jammu to Srinagar** highway. It was **India's longest road tunnel** when CDS asked in 2023.\n" +
        "- The **Zojila Tunnel** on the Srinagar to Leh road, longer than both, was still being built in the mid-2020s.\n" +
        "- **Pakyong Airport** (opened 2018), near Gangtok, is **Sikkim's first airport**.",
      table: {
        columns: ["Project", "Key fact"],
        rows: [
          { cells: ["Atal Tunnel", "Under the Rohtang pass, Manali to Leh road; longest highway tunnel above 10,000 feet"] },
          {
            cells: ["Dr Syama Prasad Mookerjee (Chenani-Nashri) Tunnel", "About 9.3 km, Jammu to Srinagar highway; longest road tunnel in 2023"],
            noteAmber: "CDS 2023 (II): India's longest road tunnel, ahead of the Atal Tunnel.",
            pyqExampleId: "0d387dc5-1b44-4664-8b62-458865b38a5c",
          },
          { cells: ["Banihal-Qazigund Tunnel", "About 8.5 km under the Pir Panjal, Jammu to Srinagar highway"] },
          {
            cells: ["Pakyong Airport", "Sikkim's first airport (2018), near Gangtok"],
            noteAmber: "CDS 2019 (I): Pakyong is in Sikkim.",
            pyqExampleId: "7be99234-aa09-4013-be47-01fa2d763415",
          },
        ],
      },
      pyqExampleId: "ecd3c6b7-5828-439a-8ef6-0af1919c39dc",
      selfCheckExample: {
        prompt: "The Lahaul valley used to be cut off for about six months every year. Why, and what changed in 2020?",
        steps: [
          "The road into Lahaul crossed the Rohtang pass, which snow closes every winter.",
          "In 2020 the Atal Tunnel opened beneath the pass, so the road no longer has to go over it.",
        ],
        answer: "Snow closed the Rohtang pass each winter; the Atal Tunnel under the pass now keeps the valley connected all year.",
      },
      practiceSet: [
        { prompt: "On which highway is the Chenani-Nashri (Dr Syama Prasad Mookerjee) tunnel?", answer: "The Jammu to Srinagar highway" },
        { prompt: "Under which pass does the Atal Tunnel run?", answer: "The Rohtang pass" },
        { prompt: "Which State's first airport opened at Pakyong in 2018?", answer: "Sikkim's" },
        { prompt: "Which tunnel is the longest highway tunnel above 10,000 feet?", answer: "The Atal Tunnel" },
      ],
      traps: [
        {
          title: "Longest is not highest",
          body: "The **Chenani-Nashri** tunnel was the **longest road tunnel** (about 9.3 km). The **Atal Tunnel** (about 9 km) is the longest highway tunnel **above 10,000 feet**. Check which record the stem asks about, and note that the Zojila tunnel will beat both when it opens.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeec-railways",
      name: "Railway zones and their headquarters",
      intuition:
        "Indian Railways is split into zones, each run from a headquarters city. The zone's name usually gives the direction but not the city, and several zones sit in unexpected towns such as Hajipur or Bilaspur. " +
        "These have to be learnt as a list.",
      definition:
        "- Three zones are run from **Kolkata**: **Eastern**, **South Eastern** (at Garden Reach) and **Metro Railway**. The Kolkata Metro is the **only metro that is itself a railway zone**.\n" +
        "- Two zones are run from **Mumbai**: **Central** and **Western**.\n" +
        "- The newer zones of 2002 to 2003 sit in smaller cities: **East Central (Hajipur)**, **North Central (Prayagraj)**, **West Central (Jabalpur)**, **South East Central (Bilaspur)**, **South Western (Hubballi)**, North Western (Jaipur), East Coast (Bhubaneswar).",
      table: {
        columns: ["Zone", "Headquarters"],
        rows: [
          {
            cells: ["North Eastern", "Gorakhpur"],
            noteAmber: "Asked twice: CDS 2016 (II) and 2018 (I).",
            pyqExampleId: "cdabd9d9-5d57-448d-b5b4-3b8ebf9b72d6",
          },
          { cells: ["North Central", "Prayagraj (Allahabad)"] },
          {
            cells: ["East Central", "Hajipur (Bihar)"],
            pyqExampleId: "c48a3577-1dc9-43a6-be63-2f9d442312c0",
          },
          { cells: ["West Central", "Jabalpur"] },
          { cells: ["South Central", "Secunderabad"] },
          { cells: ["South Eastern", "Kolkata"] },
          { cells: ["South East Central", "Bilaspur (Chhattisgarh)"] },
          { cells: ["South Western", "Hubballi (Hubli)"] },
          {
            cells: ["Metro Railway", "Kolkata"],
            noteAmber: "CDS 2018 (II): the Metro Railway zone is headquartered in Kolkata.",
            pyqExampleId: "d33508c9-a889-4c1b-b4a0-fa6707c269a7",
          },
          { cells: ["Northeast Frontier", "Maligaon (Guwahati)"] },
        ],
      },
      pyqExampleId: "f6b3c1ca-49c6-4c93-b566-c0e9c6cd8a84",
      selfCheckExample: {
        prompt: "Three railway zones are run from Kolkata. Name them.",
        steps: [
          "The old Eastern Railway has always been run from Kolkata.",
          "South Eastern Railway is run from Garden Reach in Kolkata.",
          "The Kolkata Metro is a zone of its own.",
        ],
        answer: "Eastern, South Eastern and Metro Railway",
      },
      practiceSet: [
        { prompt: "Where is the headquarters of West Central Railway?", answer: "Jabalpur" },
        { prompt: "Where is the headquarters of North Central Railway?", answer: "Prayagraj (Allahabad)" },
        { prompt: "Where is the headquarters of Northeast Frontier Railway?", answer: "Maligaon, Guwahati" },
        { prompt: "Which two railway zones are run from Mumbai?", answer: "Central and Western" },
      ],
      traps: [
        {
          title: "Two railways in Bihar and Chhattisgarh towns",
          body: "**East Central** is at **Hajipur**, not Patna. **South East Central** is at **Bilaspur in Chhattisgarh**, not Bilaspur in Himachal Pradesh.",
        },
        {
          title: "South Central or South Western",
          body: "**South Central** is run from **Secunderabad**; **South Western** from **Hubballi**. The options often swap these two.",
        },
        {
          title: "Gorakhpur, not Guwahati",
          body: "**North Eastern** Railway is run from **Gorakhpur** in Uttar Pradesh. The railway of the north-east States is **Northeast Frontier**, run from Maligaon in Guwahati.",
        },
      ],
    },
  ],
};
