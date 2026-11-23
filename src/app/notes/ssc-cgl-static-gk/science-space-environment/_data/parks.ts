import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSE_PARKS_NOTE: SubtopicNote = {
  subtopicName: "National Parks, Wildlife and Environment",
  title: "National Parks, Wildlife and Environment",
  oneLineDefinition:
    "National parks and reserves with their states and best-known animals, Project Tiger, the bands of India's Air Quality Index and the two kinds of climate response.",
  whyItMatters:
    "10 questions in the bank: 6 on a park, a reserve or Project Tiger, and 4 on air quality and climate. Three of the four from the 2025 shifts were Assertion and Reason items, so learn the step-by-step check as well as the facts.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscssepa-parks",
      name: "Parks, reserves and their states",
      intuition:
        "A park question gives a name and asks the state, or gives an animal and asks the park. The options are usually parks from other corners of India, so knowing the region of each name settles most of them.",
      definition:
        "The facts:\n" +
        "- **Project Tiger** was launched on **1 April 1973** with **nine** tiger reserves, Jim Corbett among them. The **Wildlife (Protection) Act** came a year earlier, in **1972**.\n" +
        "- **Jim Corbett** (Uttarakhand), set up in 1936 as Hailey National Park, is **India's first national park**.\n" +
        "- **Tadoba**, in Chandrapur district, is the **oldest national park of Maharashtra**; it is part of the Tadoba-Andhari Tiger Reserve.\n" +
        "- **Gorumara** and **Jaldapara** are in the **Dooars** of northern **West Bengal**, and both have the **one-horned rhinoceros**, the animal Kaziranga in Assam is famous for.\n" +
        "- **Campbell Bay National Park** is on **Great Nicobar**: Nicobar megapode, Nicobar pigeon, crab-eating macaque, giant robber crab.\n" +
        "- The **Gulf of Mannar Biosphere Reserve** (Tamil Nadu) is a **marine** reserve: home of the **dugong** (sea cow) and sea turtles. Khangchendzonga (Sikkim), Pachmarhi (Madhya Pradesh) and Seshachalam (Andhra Pradesh) are inland.\n" +
        "- The **Rajgir Zoo Safari** is at Rajgir in Nalanda district, **Bihar**.",
      table: {
        columns: ["Park or reserve", "State or UT", "Known for"],
        rows: [
          { cells: ["Jim Corbett National Park", "Uttarakhand", "India's first national park, 1936"] },
          { cells: ["Kaziranga National Park", "Assam", "One-horned rhinoceros"] },
          { cells: ["Gorumara National Park", "West Bengal", "Dooars, Jalpaiguri; one-horned rhinoceros"] },
          { cells: ["Jaldapara National Park", "West Bengal", "Dooars; one-horned rhinoceros"] },
          { cells: ["Gir National Park", "Gujarat", "Asiatic lion"] },
          { cells: ["Tadoba National Park", "Maharashtra", "Oldest national park of Maharashtra; tigers"] },
          { cells: ["Campbell Bay National Park", "Andaman and Nicobar Islands", "Great Nicobar; megapode, robber crab"] },
          { cells: ["Gulf of Mannar Biosphere Reserve", "Tamil Nadu", "Marine reserve; dugong and sea turtles"] },
          { cells: ["Raimona National Park", "Assam", "Kokrajhar district"] },
          { cells: ["Mouling National Park", "Arunachal Pradesh", "Siang region"] },
          { cells: ["Papikonda National Park", "Andhra Pradesh", "Papi Hills on the Godavari"] },
          { cells: ["Rajgir Zoo Safari", "Bihar", "Nalanda district"] },
        ],
      },
      pyqExampleId: "74271db7-1266-4165-b21a-78d2e8219187",
      selfCheckExample: {
        prompt: "Which national park in Gujarat is the home of the Asiatic lion?",
        steps: ["The Asiatic lion survives in the wild only in one part of India, the Saurashtra region of Gujarat.", "Its park there is Gir."],
        answer: "Gir National Park",
      },
      practiceSet: [
        { prompt: "In which year was Project Tiger launched?", answer: "1973" },
        { prompt: "Which was India's first national park?", answer: "Jim Corbett National Park (set up as Hailey National Park in 1936)" },
        { prompt: "In which state is Gorumara National Park?", answer: "West Bengal" },
        { prompt: "Which biosphere reserve in Tamil Nadu shelters the dugong?", answer: "Gulf of Mannar Biosphere Reserve" },
        { prompt: "In which state is the Rajgir Zoo Safari?", answer: "Bihar" },
        { prompt: "Which law, passed in 1972, came a year before Project Tiger?", answer: "The Wildlife (Protection) Act" },
      ],
      traps: [
        {
          title: "1972 is the Act, 1973 is Project Tiger",
          body: "The **Wildlife (Protection) Act** is of **1972**. **Project Tiger** began on 1 April **1973**. SSC puts both years in the options.",
        },
        {
          title: "The rhino is not only in Assam",
          body: "Kaziranga is the famous rhino park, but **Gorumara** and **Jaldapara** in **West Bengal** also have the one-horned rhinoceros. Read the park's name, not the animal.",
        },
        {
          title: "A sea animal needs a marine reserve",
          body: "The **dugong** lives in shallow sea, so its reserve must be on the coast: **Gulf of Mannar**. An inland reserve like Pachmarhi or Khangchendzonga cannot be the answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssepa-air",
      name: "Air Quality Index bands and climate responses",
      intuition:
        "India's AQI turns pollution into one number from 0 to 500 and six named bands. Learn the six bands in order and you can place any reading; learn the two kinds of climate response and you can sort any action.",
      definition:
        "The facts:\n" +
        "- India's **National Air Quality Index** is published by the **Central Pollution Control Board (CPCB)**. It counts **eight** pollutants: PM10, PM2.5, nitrogen dioxide, sulphur dioxide, carbon monoxide, ozone, ammonia and lead.\n" +
        "- **PM2.5** means particles 2.5 micrometres across or smaller. They are **more harmful than PM10** because they go **deep into the lungs and into the blood**.\n" +
        "- Each band is defined by its **health effect**: the top band, **Severe (401 to 500)**, affects even **healthy people**.\n" +
        "- **Mitigation** cuts the cause: fewer greenhouse gases (renewable energy, planting forests, **carbon sequestration**).\n" +
        "- **Adaptation** reduces the harm from effects already here: **sea walls**, raised buildings, drought-resistant crops.\n" +
        "- **Geoengineering** is a deliberate, large-scale change to the climate system itself.",
      table: {
        columns: ["AQI value", "Band", "Health effect"],
        rows: [
          { cells: ["0 to 50", "Good", "Minimal impact"] },
          { cells: ["51 to 100", "Satisfactory", "Minor breathing discomfort to sensitive people"] },
          { cells: ["101 to 200", "Moderate", "Discomfort to people with lung or heart disease, and to children and older adults"] },
          { cells: ["201 to 300", "Poor", "Breathing discomfort to most people on long exposure"] },
          { cells: ["301 to 400", "Very Poor", "Respiratory illness on long exposure"] },
          { cells: ["401 to 500", "Severe", "Affects healthy people; serious for those already ill"] },
        ],
        caption: "The National Air Quality Index bands of the Central Pollution Control Board.",
      },
      pyqExampleId: "6bfd28dc-a3b5-43e2-9c83-acd01f81506b",
      selfCheckExample: {
        prompt: "A city replaces its coal power plant with a solar park to cut emissions. Is this mitigation or adaptation?",
        steps: ["The action reduces greenhouse gases, the cause of warming.", "Cutting the cause is mitigation."],
        answer: "Mitigation",
      },
      practiceSet: [
        { prompt: "Which AQI band covers readings from 301 to 400?", answer: "Very Poor" },
        { prompt: "What is the lowest AQI value in the 'Severe' band?", answer: "401" },
        { prompt: "Which body publishes India's National Air Quality Index?", answer: "The Central Pollution Control Board (CPCB)" },
        { prompt: "How many pollutants does India's National AQI count?", answer: "Eight" },
        { prompt: "Raising homes on stilts in a flood zone is which kind of climate response?", answer: "Adaptation" },
        { prompt: "Carbon sequestration is which kind of climate response?", answer: "Mitigation" },
      ],
      traps: [
        {
          title: "Smaller particles are the more harmful",
          body: "**PM2.5** is more harmful than **PM10**, not less: the smaller the particle, the deeper it reaches into the lungs and the blood.",
        },
        {
          title: "Poor and Very Poor are different bands",
          body: "**Poor** is 201 to 300; **Very Poor** is 301 to 400. Above 400 is **Severe**.",
        },
        {
          title: "Protection is adaptation, not mitigation",
          body: "An action that **shields people from a climate effect** (a sea wall, a raised road) is **adaptation**. **Mitigation** cuts emissions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscssepa-reason",
      name: "Assertion and Reason, step by step",
      intuition:
        "An Assertion and Reason item is two true-or-false questions and one link question. Answer them in that order and the four options sort themselves.",
      definition:
        "- **Step 1:** is the Assertion (A) true? If not, only \"A is false, but R is true\" (or a both-false option, when printed) can be right.\n" +
        "- **Step 2:** is the Reason (R) true? If A is true and R is false, the answer is \"A is true, but R is false\".\n" +
        "- **Step 3:** only when both are true, ask the link: put \"because\" between them. If \"A, because R\" is the real cause, R explains A; if R is a true fact on another point, it does not.\n\n" +
        "The common mistake is to judge the link first. A reason that sounds like an explanation is still wrong if it is false.",
      authoredExample: {
        prompt:
          "Assertion (A): An AQI reading of 250 falls in the 'Poor' band. Reason (R): The 'Poor' band of India's AQI runs from 301 to 400. Choose: (a) both true, R explains A (b) both true, R does not explain A (c) A true, R false (d) A false, R true",
        steps: [
          "Step 1: 'Poor' is 201 to 300, and 250 lies in it, so A is true.",
          "Step 2: 301 to 400 is 'Very Poor', not 'Poor', so R is false.",
          "A true and R false: no need to test the link.",
        ],
        answer: "(c) A is true, but R is false",
      },
      selfCheckExample: {
        prompt:
          "Assertion (A): Building sea walls is climate change adaptation. Reason (R): Adaptation means reducing the harm from climate effects that are already happening. Which option is right?",
        steps: [
          "A is true: a sea wall protects against rising seas, an effect already under way.",
          "R is true: that is the meaning of adaptation.",
          "\"Sea walls are adaptation, because adaptation means reducing the harm\" reads as a real cause, so R explains A.",
        ],
        answer: "Both A and R are true, and R is the correct explanation of A.",
      },
      practiceSet: [
        { prompt: "In an Assertion and Reason item, which is checked last: A, R, or the link between them?", answer: "The link, and only when both A and R are true" },
        { prompt: "If the Assertion is true and the Reason is false, which option is right?", answer: "A is true, but R is false" },
        { prompt: "If both statements are true, what word do you place between them to test the link?", answer: "Because" },
      ],
      traps: [
        {
          title: "A good-sounding reason can still be false",
          body: "Test whether R is **true** before you ask whether it **explains** A. A false R cannot explain anything, however well it reads.",
        },
      ],
    },
  ],
};
