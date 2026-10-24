import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_DF_EQUIPMENT_NOTE: SubtopicNote = {
  subtopicName: "Aircraft, Ships and Missiles",
  title: "Aircraft, Ships and Missiles",
  oneLineDefinition:
    "The aircraft, aircraft carriers and missiles the bank asks about: what kind of machine each is, which country made it, and what makes the Indian-made ones special.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE, and the MODERATE one is from the 2022 paper. Two ask which aircraft is combat or Indian-made (Tejas both times), one asks India's first indigenous aircraft carrier, and two are about BrahMos: what kind of missile it is, and the fastest cruise missile as asked in the paper. Each answer turns on one word: combat, transport, helicopter, ballistic or cruise.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spidfeq-platforms",
      name: "Aircraft and aircraft carriers",
      intuition:
        "An aircraft question usually hides one combat aircraft among helicopters and transport planes, or one Indian design among foreign ones. Sort each name by its job and by its maker.",
      definition:
        "- **Tejas** is India's own **Light Combat Aircraft**, designed by the Aeronautical Development Agency and built by **HAL** (Hindustan Aeronautics Limited).\n" +
        "- **Rafale** (France) and the **Su-30MKI** and **MiG-21** (Russian designs) are combat aircraft made abroad.\n" +
        "- **Chetak** and **Dhruv** are **helicopters** built by HAL. The **C-17 Globemaster** and the **C-130J Super Hercules** are American **transport** aircraft.\n" +
        "- **INS Vikrant**, built at **Cochin Shipyard** and commissioned on **2 September 2022**, is India's **first indigenous aircraft carrier**.\n" +
        "- India's earlier carriers came from abroad: the first INS Vikrant and **INS Virat** from Britain, and **INS Vikramaditya** from Russia.",
      table: {
        columns: ["Name", "Kind", "Made by"],
        rows: [
          { cells: ["**Tejas**", "Light combat aircraft", "India (HAL)"] },
          { cells: ["Rafale", "Combat aircraft", "France (Dassault)"] },
          { cells: ["Su-30MKI", "Combat aircraft", "Russian design, built in India by HAL"] },
          { cells: ["MiG-21", "Combat aircraft", "Soviet Union"] },
          { cells: ["Chetak, Dhruv", "Helicopters", "India (HAL)"] },
          { cells: ["C-17 Globemaster", "Heavy transport aircraft", "United States"] },
          { cells: ["**INS Vikrant** (2022)", "First **indigenous** aircraft carrier", "India (Cochin Shipyard)"] },
          { cells: ["INS Vikramaditya", "Aircraft carrier", "Bought from Russia"] },
          { cells: ["INS Virat", "Aircraft carrier, now retired", "Bought from Britain"] },
        ],
      },
      selfCheckExample: {
        prompt: "From which country did India buy the aircraft carrier INS Vikramaditya?",
        steps: ["India's only indigenous carrier is the new INS Vikrant.", "INS Vikramaditya was bought from Russia."],
        answer: "Russia",
      },
      practiceSet: [
        { prompt: "Which company builds the Tejas, Chetak and Dhruv?", answer: "Hindustan Aeronautics Limited (HAL)" },
        { prompt: "What kind of aircraft is the C-17 Globemaster?", answer: "A heavy transport aircraft" },
        { prompt: "Which country makes the Rafale?", answer: "France" },
        { prompt: "At which shipyard was the indigenous aircraft carrier INS Vikrant built?", answer: "Cochin Shipyard" },
        { prompt: "Are Chetak and Dhruv fighters, transport planes or helicopters?", answer: "Helicopters" },
      ],
      pyqExampleId: "c4d50c5d-ab41-4cca-a7d1-41c1e71c2004",
      traps: [
        {
          title: "Indian-made is not Indian-used",
          body:
            "The Air Force flies Rafale, Su-30 and MiG-21 aircraft, but they are French and Russian designs. Among combat aircraft, the one designed in India is Tejas.",
        },
        {
          title: "Virat was bought, Vikrant was built",
          body:
            "INS Virat came from Britain. The INS Vikrant commissioned in 2022 was built at Cochin Shipyard and is India's first indigenous aircraft carrier.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spidfeq-missiles",
      name: "Ballistic and cruise missiles",
      intuition:
        "A ballistic missile is fired high into the sky and falls on its target like a thrown stone. A cruise missile flies low and level all the way, like a small plane without a pilot. Learn each Indian missile by which kind it is and what it is fired at.",
      definition:
        "- **BrahMos** is a **supersonic cruise missile** built jointly by **India and Russia**. Its name joins two rivers, the **Brahmaputra** and the **Moskva**. It can be fired from land, ships and aircraft. It is not ballistic and not an anti-aircraft missile.\n" +
        "- **Agni** and **Prithvi** are **surface-to-surface ballistic missiles**; **Dhanush** is the ship-launched form of Prithvi.\n" +
        "- **Akash** is a **surface-to-air** missile; **Nag** is an **anti-tank** missile.\n" +
        "- Agni, Prithvi, Akash, Nag and Trishul came from the **Integrated Guided Missile Development Programme**, begun in **1983** under **Dr A.P.J. Abdul Kalam**.",
      table: {
        columns: ["Missile", "Kind"],
        rows: [
          { cells: ["**BrahMos**", "**Supersonic cruise missile**, India and Russia"] },
          { cells: ["Agni", "Surface-to-surface ballistic, long range"] },
          { cells: ["Prithvi", "Surface-to-surface ballistic, short range"] },
          { cells: ["Dhanush", "Ship-launched form of Prithvi, ballistic"] },
          { cells: ["Akash", "Surface-to-air"] },
          { cells: ["Nag", "Anti-tank"] },
        ],
        caption: "A mock question calls BrahMos the fastest supersonic cruise missile in the world: give that answer as asked in the paper, not as a record of today.",
      },
      selfCheckExample: {
        prompt: "What kind of missile is Akash?",
        steps: ["It is fired from the ground at aircraft in the sky.", "So it is a surface-to-air missile."],
        answer: "A surface-to-air missile",
      },
      practiceSet: [
        { prompt: "Which two countries built BrahMos together?", answer: "India and Russia" },
        { prompt: "Which two rivers give BrahMos its name?", answer: "The Brahmaputra and the Moskva" },
        { prompt: "What kind of missile is Nag?", answer: "An anti-tank missile" },
        { prompt: "Is Agni a cruise missile or a ballistic missile?", answer: "A ballistic missile" },
        { prompt: "Under whom did the Integrated Guided Missile Development Programme begin in 1983?", answer: "Dr A.P.J. Abdul Kalam" },
      ],
      pyqExampleId: "967422ee-ef10-4556-b9ae-4cb1b44f3e9e",
      traps: [
        {
          title: "BrahMos is cruise, not ballistic",
          body:
            "BrahMos flies level like a plane, so it is a cruise missile. When the options offer only ICBM, anti-aircraft and surface-to-air, the answer is None of these.",
        },
        {
          title: "Agni and Prithvi are ballistic",
          body:
            "In a list asking for a cruise missile, Agni, Prithvi and Dhanush are the ballistic ones to strike out, which leaves BrahMos.",
        },
      ],
    },
  ],
};
