import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_PH_LAKES_NOTE: SubtopicNote = {
  subtopicName: "Lakes and Waterfalls",
  title: "Lakes and Waterfalls",
  oneLineDefinition:
    "How lakes form and one example of each kind, which state each well-known lake is in, the waterfalls CDS has asked, and the ways of harvesting rain.",
  whyItMatters:
    "Twelve CDS questions from 2017 to 2024: 1 EASY, 8 MODERATE, 3 HARD. Lonar lake alone has come up three times, and most of the rest are match-the-lake-to-its-state items.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeph-lake-types",
      name: "Lakes by how they formed",
      intuition:
        "A lake is water sitting in a hollow, so the question is always what made the hollow. Earth movements, a meteorite, a glacier, a landslide, a sand bar on the coast or an old river bend can each make one. Learn one Indian example for each.",
      definition:
        "The kinds of lake:\n" +
        "- **Tectonic**: a hollow made by earth movements. **Bhimtal** (Kumaon), **Wular** (Kashmir).\n" +
        "- **Crater**: **Lonar** (Maharashtra), made by a meteorite hitting the Deccan basalt.\n" +
        "- **Glacial**: **Gangabal** (Kashmir), held back by a glacier's moraine.\n" +
        "- **Landslide**: **Gohna** (Garhwal), made when a landslide blocked a river in 1893.\n" +
        "- **Lagoon**: water cut off behind a sand bar on the coast. **Chilika** (Odisha), **Ashtamudi** and **Vembanad** (Kerala).\n" +
        "- **Fluvial** (oxbow): an old river bend cut off from the river. **Purbasthali** (West Bengal).\n" +
        "**Wular** is India's largest **freshwater** lake; **Chilika** is its largest **lagoon** and is brackish.",
      table: {
        columns: ["Kind", "Example", "Where"],
        rows: [
          { cells: ["Tectonic", "Bhimtal; Wular", "Uttarakhand; Kashmir"] },
          {
            cells: ["Crater", "Lonar", "Maharashtra"],
            noteAmber: "CDS 2020 (II): Lonar's rocks resemble samples from the Moon.",
            pyqExampleId: "9a89e339-87aa-4b97-a5c1-0cc834276e55",
          },
          { cells: ["Glacial", "Gangabal", "Kashmir"] },
          {
            cells: ["Landslide", "Gohna", "Garhwal, Uttarakhand"],
            noteAmber: "CDS 2017 (II): Bhimtal tectonic, Ashtamudi lagoon, Gohna landslide, Lonar crater.",
            pyqExampleId: "5b2ffba9-d9d6-4740-a2a2-12a2f77b437e",
          },
          { cells: ["Lagoon", "Chilika; Ashtamudi; Vembanad", "Odisha; Kerala; Kerala"] },
          { cells: ["Fluvial (oxbow)", "Purbasthali", "West Bengal"] },
          {
            cells: ["Largest freshwater lake", "Wular", "Kashmir"],
            noteAmber: "CDS 2019 (II): Wular, not Chilika, which is brackish.",
            pyqExampleId: "cff4ee2e-3cda-4a52-beba-48940877d39d",
          },
        ],
      },
      pyqExampleId: "a56b014d-cc52-429e-9c0e-33ead3d3a90a",
      selfCheckExample: {
        prompt: "Why do scientists who study the Moon take an interest in Lonar lake?",
        steps: [
          "Lonar fills a crater made when a meteorite struck the Deccan basalt.",
          "The impact changed the rock in ways that look like the rocks brought back from the Moon.",
        ],
        answer: "It is a meteorite crater in basalt, and its shocked rocks resemble lunar samples.",
      },
      practiceSet: [
        { prompt: "Which lake in Garhwal was formed by a landslide?", answer: "Gohna lake" },
        { prompt: "What is India's largest freshwater lake?", answer: "Wular lake" },
        { prompt: "Name a lagoon lake in Kerala.", answer: "Ashtamudi (or Vembanad)" },
        { prompt: "Is Chilika lake fresh or brackish?", answer: "Brackish" },
      ],
      traps: [
        {
          title: "Chilika is the biggest lagoon, not the biggest freshwater lake",
          body: "**Chilika** is India's largest **lagoon**, and its water is brackish. The largest **freshwater** lake is **Wular** in Kashmir.",
        },
        {
          title: "Lonar is a meteorite crater",
          body: "**Lonar** lies in a crater made by a **meteorite**, not by a volcano, even though it sits in volcanic Deccan basalt.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-lake-states",
      name: "Lakes by state",
      intuition:
        "Most lake questions are a map question in disguise: name the state. Group the lakes by region, Himalaya, north-east, east coast and south, and the options sort themselves.",
      definition:
        "By region:\n" +
        "- **Ladakh**: Pangong Tso, Tso Moriri, Tso Kar.\n" +
        "- **Himachal Pradesh**: Khajjiar (near Dalhousie), Ghepan Ghat glacial lake (Lahaul and Spiti).\n" +
        "- **Sikkim**: Tsomgo (Changu), Khecheopalri.\n" +
        "- **North-east**: Loktak (**Manipur**), Barapani or Umiam (**Meghalaya**).\n" +
        "- **East coast**: Kolleru (**Andhra Pradesh**), Pulicat (**Andhra Pradesh and Tamil Nadu**), Kaliveli (**Tamil Nadu**).\n" +
        "- **Kerala**: Vembanad, Ashtamudi.\n" +
        "- **Gujarat**: Panchmuli, beside the Statue of Unity.",
      table: {
        columns: ["Lake", "State or UT"],
        rows: [
          {
            cells: ["Pangong Tso, Tso Moriri, Tso Kar", "Ladakh"],
            noteAmber: "CDS 2017 (II): Tsomgo was the one lake in the list that is not in Ladakh.",
            pyqExampleId: "7fc408fd-6ae6-4225-99be-6ba5416ddeed",
          },
          {
            cells: ["Tsomgo (Changu)", "Sikkim"],
            pyqExampleId: "861a4a33-3870-49d3-855a-b7dc98780c3f",
          },
          {
            cells: ["Khecheopalri", "Sikkim"],
            noteAmber: "CDS 2022 (I): Kaliveli Tamil Nadu, Khajjiar Himachal, Khecheopalri Sikkim, Vembanad Kerala.",
            pyqExampleId: "17f30fc5-8609-4e0a-b5b5-1125b5d2eaeb",
          },
          { cells: ["Khajjiar", "Himachal Pradesh"] },
          {
            cells: ["Ghepan Ghat glacial lake", "Himachal Pradesh"],
            pyqExampleId: "99db92ff-14db-4246-9dad-96e796227a0f",
          },
          { cells: ["Loktak", "Manipur"] },
          { cells: ["Barapani (Umiam)", "Meghalaya"] },
          { cells: ["Kolleru", "Andhra Pradesh"] },
          { cells: ["Pulicat", "Andhra Pradesh and Tamil Nadu"] },
          { cells: ["Kaliveli", "Tamil Nadu"] },
          { cells: ["Vembanad", "Kerala"] },
          {
            cells: ["Panchmuli", "Gujarat, beside the Statue of Unity"],
            pyqExampleId: "bb34eb27-12f1-4278-9c16-42b52a314b53",
          },
        ],
      },
      pyqExampleId: "7998c0c4-0ced-4f99-8b93-b20a44332e61",
      selfCheckExample: {
        prompt: "Which one of these lakes is NOT in Ladakh: Tso Kar, Pangong Tso, Tsomgo, Tso Moriri? Where is it?",
        steps: [
          "Tso Kar, Pangong Tso and Tso Moriri are high lakes of Ladakh.",
          "Tsomgo, also called Changu, lies on the road from Gangtok to Nathu La.",
        ],
        answer: "Tsomgo, which is in Sikkim.",
      },
      practiceSet: [
        { prompt: "In which state is Khajjiar lake?", answer: "Himachal Pradesh" },
        { prompt: "In which state is Vembanad lake?", answer: "Kerala" },
        { prompt: "Which lake lies beside the Statue of Unity?", answer: "Panchmuli lake" },
        { prompt: "In which state is the Ghepan Ghat glacial lake?", answer: "Himachal Pradesh" },
      ],
      traps: [
        {
          title: "Not every Tso is in Ladakh",
          body: "**Tso** means lake in the Tibetan languages, so it turns up outside Ladakh too. **Tsomgo** is in **Sikkim**.",
        },
        {
          title: "Kolleru is in Andhra Pradesh",
          body: "**Kolleru** is a freshwater lake between the Godavari and Krishna deltas in **Andhra Pradesh**, not in Kerala or Tamil Nadu.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-waterfalls",
      name: "Waterfalls",
      intuition:
        "Most of India's famous waterfalls are in the Western Ghats and the southern hills, where rivers drop off the edge of the plateau. Learn each fall with its state; the river helps you place it.",
      definition:
        "The falls to know:\n" +
        "- **Karnataka**: **Jog** (on the Sharavati), **Barkana**.\n" +
        "- **Goa**: **Dudhsagar**, on the Mandovi.\n" +
        "- **Odisha**: **Duduma**, on the Machkund.\n" +
        "- **Tamil Nadu**: **Kiliyur** (near Yercaud), **Hogenakkal** (on the Kaveri).\n" +
        "- **Kerala**: **Athirappilly**.\n" +
        "- **Meghalaya**: **Nohkalikai**, near Cherrapunji.",
      table: {
        columns: ["Waterfall", "State", "River or place"],
        rows: [
          { cells: ["Jog", "Karnataka", "Sharavati river"] },
          { cells: ["Barkana", "Karnataka", "Western Ghats"] },
          { cells: ["Dudhsagar", "Goa", "Mandovi river"] },
          { cells: ["Duduma", "Odisha", "Machkund river"] },
          { cells: ["Kiliyur", "Tamil Nadu", "Near Yercaud"] },
          { cells: ["Hogenakkal", "Tamil Nadu", "Kaveri river"] },
          { cells: ["Athirappilly", "Kerala", "Chalakudy river"] },
          { cells: ["Nohkalikai", "Meghalaya", "Near Cherrapunji"] },
        ],
      },
      pyqExampleId: "3261e86c-30ce-455b-bde2-855a57b39acd",
      selfCheckExample: {
        prompt: "Two of these falls are in Karnataka: Jog, Hogenakkal, Barkana, Athirappilly. Which two?",
        steps: [
          "Hogenakkal is on the Kaveri in Tamil Nadu.",
          "Athirappilly is in Kerala.",
          "Jog and Barkana are in the Western Ghats of Karnataka.",
        ],
        answer: "Jog and Barkana.",
      },
      practiceSet: [
        { prompt: "On which river is Jog Falls?", answer: "The Sharavati" },
        { prompt: "In which state are the Athirappilly falls?", answer: "Kerala" },
        { prompt: "On which river are the Hogenakkal falls?", answer: "The Kaveri" },
        { prompt: "Near which town in Meghalaya is Nohkalikai falls?", answer: "Cherrapunji" },
      ],
      traps: [
        {
          title: "Dudhsagar is in Goa",
          body: "**Dudhsagar** lies on the Goa side of the Karnataka border, on the Mandovi. In the options it belongs to **Goa**, not Karnataka.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeph-harvesting",
      name: "Rainwater harvesting",
      intuition:
        "In a city the rain falls on roofs and roads, so harvesting means leading roof water underground. In the countryside the aim is to slow water running down slopes and streams. The method tells you where it belongs.",
      definition:
        "City methods:\n" +
        "- **Rooftop harvesting** into a **recharge pit**, **recharge trench** or **recharge well**, which send the water down to refill the groundwater.\n" +
        "Rural and traditional methods:\n" +
        "- **Gully plug** and **check dam**: small walls across gullies and streams on slopes.\n" +
        "- **Guls** or **kuls**: diversion channels of the Western Himalaya.\n" +
        "- **Khadins** and **johads**: field ponds of Rajasthan.\n" +
        "- **Tankas**: underground tanks under the roof in western Rajasthan.\n" +
        "- **Bamboo drip irrigation**: Meghalaya.",
      table: {
        columns: ["Method", "Where it is used"],
        rows: [
          { cells: ["Rooftop recharge pit", "Cities"] },
          { cells: ["Recharge trench", "Cities"] },
          { cells: ["Recharge well", "Cities"] },
          { cells: ["Gully plug", "Hill slopes in the countryside"] },
          { cells: ["Check dam", "Streams in the countryside"] },
          { cells: ["Guls or kuls", "Western Himalaya"] },
          { cells: ["Khadins, johads, tankas", "Rajasthan"] },
          { cells: ["Bamboo drip irrigation", "Meghalaya"] },
        ],
      },
      pyqExampleId: "a13e2c7a-0f47-4788-8bdd-67700ed6d276",
      selfCheckExample: {
        prompt: "A school in a city wants to use the rain that falls on its roof. Name two methods it could use.",
        steps: [
          "Collect the roof water in pipes.",
          "Send it to a structure that lets it soak into the ground.",
        ],
        answer: "Any two of: a rooftop recharge pit, a recharge trench, a recharge well.",
      },
      practiceSet: [
        { prompt: "What are the underground roof-water tanks of western Rajasthan called?", answer: "Tankas" },
        { prompt: "Which state is known for bamboo drip irrigation?", answer: "Meghalaya" },
        { prompt: "What are guls or kuls?", answer: "Water diversion channels of the Western Himalaya" },
      ],
      traps: [
        {
          title: "A gully plug is a rural method",
          body: "A **gully plug** is a small wall across a gully on a hill slope. Cities harvest rain through **rooftop** collection feeding **recharge pits, trenches and wells**.",
        },
      ],
    },
  ],
};
