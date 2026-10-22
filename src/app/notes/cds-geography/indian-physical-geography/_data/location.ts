import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_LOCATION_NOTE: SubtopicNote = {
  subtopicName: "Location, States and Borders",
  title: "Location, States and Borders",
  oneLineDefinition:
    "Where India sits on the globe, the line that sets its clock, the Tropic of Cancer states, the neighbours each state touches, and the clues CDS uses to name a state.",
  whyItMatters:
    "Sixteen CDS questions from 2016 to 2026: 3 EASY, 8 MODERATE and 5 HARD. The hard ones are counting questions (how many states on the Tropic, how many touch three countries), so learn the lists in a fixed order.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-extent",
      name: "Extent, standard meridian and coastline",
      intuition:
        "India is a big country in both directions. From south to north it covers about 29 degrees of latitude, and from west to east about 29 degrees of longitude. Because the Sun rises about two hours earlier in Arunachal Pradesh than in Gujarat, India keeps one clock set on a line near the middle of the country.",
      definition:
        "The numbers to know:\n" +
        "- The mainland lies between **8°4′N and 37°6′N** latitude and **68°7′E and 97°25′E** longitude.\n" +
        "- The **standard meridian** is **82°30′E**. It passes through **Mirzapur** in Uttar Pradesh.\n" +
        "- **Indian Standard Time** is 5 hours 30 minutes ahead of Greenwich Mean Time.\n" +
        "- The mainland coastline is about **6,100 km**; with the islands it is about **7,500 km**.\n" +
        "- **Gujarat** has the longest coastline of any state.",
      table: {
        columns: ["Fact", "Value"],
        rows: [
          { cells: ["Latitude of the mainland", "8°4′N to 37°6′N"] },
          { cells: ["Longitude of the mainland", "68°7′E to 97°25′E"] },
          { cells: ["Standard meridian", "82°30′E, through Mirzapur (Uttar Pradesh)"] },
          { cells: ["Indian Standard Time", "GMT plus 5 hours 30 minutes"] },
          { cells: ["Sunrise gap, Arunachal Pradesh to Gujarat", "About 2 hours"] },
          {
            cells: ["Longest coastline", "Gujarat, about 1,600 km"],
            noteAmber: "CDS 2023 (I): Gujarat, not Tamil Nadu, Maharashtra or Andhra Pradesh.",
            pyqExampleId: "1ebe4337-b01e-4370-b122-8a302d29cd30",
          },
          {
            cells: ["A point at 34°N, 77°E", "Near Leh, in Ladakh"],
            noteAmber: "CDS 2021 (II): the only Union Territory in the options that far north.",
            pyqExampleId: "da1872c1-b557-4dcd-9a13-9a05fcf92d17",
          },
        ],
      },
      pyqExampleId: "f422c4c9-884f-469b-aec8-b10ecaed4bd9",
      selfCheckExample: {
        prompt: "The Earth turns 1 degree of longitude in 4 minutes. Use this to show why Indian Standard Time is 5 hours 30 minutes ahead of Greenwich.",
        steps: [
          "India's standard meridian is 82°30′E, which is 82.5 degrees east of Greenwich.",
          "82.5 × 4 minutes = 330 minutes.",
          "330 minutes = 5 hours 30 minutes, and east of Greenwich means ahead.",
        ],
        answer: "82.5 degrees × 4 minutes = 330 minutes = 5 hours 30 minutes ahead of GMT.",
      },
      practiceSet: [
        { prompt: "Between which latitudes does the Indian mainland lie?", answer: "8°4′N and 37°6′N" },
        { prompt: "Which Indian state has the longest coastline?", answer: "Gujarat" },
        { prompt: "About how much earlier does the Sun rise in Arunachal Pradesh than in Gujarat?", answer: "About 2 hours" },
        { prompt: "Through which town in Uttar Pradesh does India's standard meridian pass?", answer: "Mirzapur" },
      ],
      traps: [
        {
          title: "East, not west",
          body: "India's standard meridian is **82°30′ EAST**. CDS put 82°30′ W in the options; every part of India is east of Greenwich.",
        },
        {
          title: "The longest coastline is on the west",
          body: "Tamil Nadu and Andhra Pradesh have long east coasts, but **Gujarat**, with its two gulfs and the Saurashtra peninsula, has the longest coastline of any state.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-tropic",
      name: "The Tropic of Cancer states",
      intuition:
        "The Tropic of Cancer (23°30′N) cuts India almost in half. Walk along it from the Gulf of Kachchh to the hills of Mizoram and you cross eight states. Learn them west to east as one chain and any counting question becomes easy.",
      definition:
        "The eight states, west to east:\n" +
        "- **Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.**\n" +
        "- Only **Gujarat** and **West Bengal** have a sea coast. The other six are landlocked.\n" +
        "- It does **not** pass through Odisha, Bihar, Uttar Pradesh, Assam or Manipur.",
      table: {
        columns: ["State, west to east", "Sea coast"],
        rows: [
          { cells: ["Gujarat", "Yes"] },
          { cells: ["Rajasthan", "No"] },
          { cells: ["Madhya Pradesh", "No"] },
          { cells: ["Chhattisgarh", "No"] },
          { cells: ["Jharkhand", "No"] },
          { cells: ["West Bengal", "Yes"] },
          { cells: ["Tripura", "No"] },
          {
            cells: ["Mizoram", "No"],
            noteAmber: "CDS 2021 (II): the state on the Tropic that is long north to south and borders both Bangladesh and Myanmar.",
            pyqExampleId: "993c50e8-08ef-4b33-89aa-32f4b943c273",
          },
        ],
      },
      pyqExampleId: "4f5f949c-d15f-4945-85da-b077b9a55149",
      selfCheckExample: {
        prompt: "A north-eastern state lies on the Tropic of Cancer, has no sea coast, and its only foreign neighbour is Bangladesh. Name it.",
        steps: [
          "The north-eastern states on the Tropic are Tripura and Mizoram.",
          "Mizoram touches both Bangladesh and Myanmar.",
          "Tripura is wrapped by Bangladesh on three sides and touches no other country.",
        ],
        answer: "Tripura.",
      },
      practiceSet: [
        { prompt: "At what latitude does the Tropic of Cancer lie?", answer: "23°30′N" },
        { prompt: "Does the Tropic of Cancer pass through Odisha?", answer: "No" },
        { prompt: "Which is the easternmost state that the Tropic of Cancer crosses?", answer: "Mizoram" },
        { prompt: "Which two north-eastern states does the Tropic of Cancer cross?", answer: "Tripura and Mizoram" },
      ],
      traps: [
        {
          title: "Odisha and Bihar are not on the Tropic",
          body: "The Tropic runs through **Jharkhand** and **Chhattisgarh**, between Bihar to the north and Odisha to the south. Neither Odisha nor Bihar is on the list of eight.",
        },
        {
          title: "Two coastal states, not three",
          body: "Of the eight Tropic states only **Gujarat** and **West Bengal** touch the sea. Tripura and Mizoram are landlocked even though they are close to the Bay of Bengal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-borders",
      name: "Neighbouring countries and border states",
      intuition:
        "India touches seven countries on land. Go round the map clockwise from the west and list the Indian states along each border. A state in the middle of the country, such as Chhattisgarh or Madhya Pradesh, touches no country at all.",
      definition:
        "How to use the table:\n" +
        "- Read across to find the states on one country's border.\n" +
        "- Read down to count how many countries one state touches.\n" +
        "- Four units touch **three** countries: **Ladakh**, **Sikkim**, **West Bengal** and **Arunachal Pradesh**.\n" +
        "- Inland states with **no** international border include **Chhattisgarh**, **Madhya Pradesh**, **Jharkhand**, **Haryana** and **Telangana**.",
      table: {
        columns: ["Neighbour", "Indian states and UTs on that border"],
        rows: [
          { cells: ["Pakistan", "Gujarat, Rajasthan, Punjab, Jammu and Kashmir, Ladakh"] },
          { cells: ["Afghanistan", "Ladakh"] },
          { cells: ["China", "Ladakh, Himachal Pradesh, Uttarakhand, Sikkim, Arunachal Pradesh"] },
          { cells: ["Nepal", "Uttarakhand, Uttar Pradesh, Bihar, West Bengal, Sikkim"] },
          { cells: ["Bhutan", "Sikkim, West Bengal, Assam, Arunachal Pradesh"] },
          { cells: ["Bangladesh", "West Bengal, Assam, Meghalaya, Tripura, Mizoram"] },
          { cells: ["Myanmar", "Arunachal Pradesh, Nagaland, Manipur, Mizoram"] },
          {
            cells: ["Three countries", "Ladakh, Sikkim, West Bengal, Arunachal Pradesh"],
            noteAmber: "CDS 2020 (I): four units of the Union touch more than two countries.",
            pyqExampleId: "e17c8515-0ee1-457d-9d93-4f7a78acd1b8",
          },
        ],
      },
      pyqExampleId: "30f4ccd0-9daf-488c-a03f-3f48886811e9",
      selfCheckExample: {
        prompt: "Which three countries does Sikkim touch?",
        steps: [
          "Sikkim sits between Nepal on the west and Bhutan on the east.",
          "Its northern edge is the border with China (Tibet).",
        ],
        answer: "Nepal, China and Bhutan.",
      },
      practiceSet: [
        { prompt: "Which Indian Union Territory borders Afghanistan?", answer: "Ladakh" },
        { prompt: "Which four Indian states border Myanmar?", answer: "Arunachal Pradesh, Nagaland, Manipur and Mizoram" },
        { prompt: "Which three countries does West Bengal touch?", answer: "Nepal, Bhutan and Bangladesh" },
        { prompt: "Does Madhya Pradesh have an international border?", answer: "No" },
      ],
      traps: [
        {
          title: "Uttarakhand touches only two countries",
          body: "Uttarakhand borders **Nepal** and **China**, so it is not one of the states with three neighbours. The four with three are Ladakh, Sikkim, West Bengal and Arunachal Pradesh.",
        },
        {
          title: "Meghalaya has a foreign border",
          body: "Meghalaya is inland in the north-east but its whole southern edge is the border with **Bangladesh**. An inland state with no foreign border is one like Chhattisgarh.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-states",
      name: "Clues that name a state",
      intuition:
        "Many CDS questions give two or three clues and ask you to name the state: a nickname, a place a traveller visited, the states around it, or its shape. Each clue below has been used, so learn the clue with the state.",
      definition:
        "Useful clues:\n" +
        "- **Shape**: Mizoram and Chhattisgarh are long from north to south.\n" +
        "- **Neighbours**: list the states around it in the order N, E, S, W.\n" +
        "- **Places**: a pass, a valley or a monastery names its region at once.\n" +
        "- **People**: a tribe often belongs to one state.",
      table: {
        columns: ["State or UT", "Clue CDS used"],
        rows: [
          {
            cells: ["Telangana", "Its neighbours are Maharashtra, Chhattisgarh, Karnataka and Andhra Pradesh; it does not touch Odisha or Madhya Pradesh"],
            noteAmber: "CDS 2023 (I): pick the set without Odisha and Madhya Pradesh.",
            pyqExampleId: "843cde46-d008-4243-8647-0167606a5790",
          },
          {
            cells: ["Arunachal Pradesh", "Its only Indian neighbours are Assam and Nagaland"],
            noteAmber: "CDS 2026 (II): Mizoram and Tripura lie far to the south.",
            pyqExampleId: "e40851b5-6d08-4855-a089-8b82c07f77b7",
          },
          {
            cells: ["Chhattisgarh", "The longest north-south stretch among Chhattisgarh, Odisha, Telangana and Jharkhand (more than 6 degrees of latitude)"],
            pyqExampleId: "ea3793fb-961e-4c2f-91e0-88440d78d757",
          },
          {
            cells: ["Assam", "The land of the red river and blue hills; about 2.39 per cent of India's area"],
            pyqExampleId: "cae89047-d134-45c8-b064-eab4922a5e59",
          },
          { cells: ["Ladakh", "Khardung La, the Nubra valley and Buddhist monasteries such as Hemis and Diskit"] },
          {
            cells: ["Arunachal Pradesh", "Home of the Nyishi, its largest tribe"],
            pyqExampleId: "f3a1d65e-f92a-4003-9939-d965d8584d3f",
          },
        ],
      },
      pyqExampleId: "c2e1cd48-8708-49b2-b9a6-d10cefdba0f7",
      selfCheckExample: {
        prompt: "A state is called the land of the red river and blue hills. Which state is it, and what is the red river?",
        steps: [
          "The nickname belongs to Assam.",
          "The red river is the Brahmaputra, which flows the length of the Assam valley.",
        ],
        answer: "Assam; the red river is the Brahmaputra.",
      },
      practiceSet: [
        { prompt: "Which two Indian states share a border with Arunachal Pradesh?", answer: "Assam and Nagaland" },
        { prompt: "Does Telangana share a border with Odisha?", answer: "No" },
        { prompt: "In which state do the Nyishi people mainly live?", answer: "Arunachal Pradesh" },
        { prompt: "Which state is longer from north to south: Chhattisgarh or Jharkhand?", answer: "Chhattisgarh" },
      ],
      traps: [
        {
          title: "Telangana is not Odisha's neighbour",
          body: "Telangana touches **Maharashtra, Chhattisgarh, Karnataka and Andhra Pradesh**. Odisha and Madhya Pradesh look close on a small map, but Chhattisgarh and Andhra Pradesh lie in between.",
        },
        {
          title: "Arunachal Pradesh does not touch Mizoram",
          body: "Arunachal Pradesh meets only **Assam** and **Nagaland** among Indian states. Mizoram and Tripura are in the far south of the north-east.",
        },
      ],
    },
  ],
};
