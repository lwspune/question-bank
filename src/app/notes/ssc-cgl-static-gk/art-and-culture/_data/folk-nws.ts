import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SAC_FOLK_NWS_NOTE: SubtopicNote = {
  subtopicName: "Folk Dances of North, West and South India",
  title: "Folk Dances of North, West and South India",
  oneLineDefinition:
    "The folk dances of Kashmir, Himachal, Uttarakhand and Punjab, of Rajasthan, Gujarat, Maharashtra and Goa, and of Tamil Nadu, Karnataka and Kerala, each with its state, its people and one detail.",
  whyItMatters:
    "38 questions in the bank, and 25 of them come from the 2025 shifts. Those papers moved past \"which state?\" to two statements about one dance: who performs it, what they wear or hold, and when. So each table row below gives the state, the community and the one detail SSC has asked.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscsacfn-region",
      name: "Region first, then the detail",
      intuition:
        "A folk-dance question usually has one right state and three states from other corners of India. Place the dance in its region first and most options fall away before you need the exact fact.",
      definition:
        "- **Step 1:** look for a clue in the dance's name or the stem: a tribe or community (Bhil, Wattal, Irula), a place (Kullu, Kumaon, Saurashtra, Dang) or a festival.\n" +
        "- **Step 2:** put the clue in a region: the Himalaya, the desert west, the Konkan coast, the south.\n" +
        "- **Step 3:** strike every option outside that region; usually one state is left.\n" +
        "- **Step 4:** for a two-statement question, test each statement against three facts: who performs the dance (men, women, which community), what they carry or wear, and when it is danced.\n\n" +
        "The rule breaks when two neighbouring states share a dance (Bhavai is in Rajasthan and Gujarat; Koli in Maharashtra and Goa). Then you need the table, not the region.",
      authoredExample: {
        prompt: "Kullu Nati is danced in which state? (a) Goa (b) Odisha (c) Himachal Pradesh (d) Tamil Nadu",
        steps: [
          "Kullu is a valley in the Himalaya, so the dance is from the north.",
          "Goa is on the west coast, Odisha in the east and Tamil Nadu in the south; only Himachal Pradesh is Himalayan.",
        ],
        answer: "(c) Himachal Pradesh",
      },
      selfCheckExample: {
        prompt: "Tippani was born where women of Saurashtra beat lime floors with long sticks. In which state is it danced?",
        steps: ["Saurashtra is the peninsula of western Gujarat.", "So the dance belongs to Gujarat."],
        answer: "Gujarat",
      },
      practiceSet: [
        { prompt: "Kumaon is a region of which state?", answer: "Uttarakhand" },
        { prompt: "In which state is the Dang district?", answer: "Gujarat" },
        { prompt: "In which state is the Kullu valley?", answer: "Himachal Pradesh" },
        { prompt: "Attappadi, home of the Irula tribe's Elelakkaradi dance, is in which state?", answer: "Kerala" },
      ],
      traps: [
        {
          title: "Do not answer from the sound of the name",
          body: "Dhalo is a dance of Goa and Dhap a dance of Odisha. Names that sound alike can be a whole country apart, so place each dance by its region.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacfn-north",
      name: "Kashmir, Himachal, Uttarakhand and Punjab",
      intuition:
        "The Himalayan dances are tied to a community and a season: Kashmiri women at Eid, Wattal men around a banner, Himachali archers at Baisakhi, Kumaoni villagers at spring fairs.",
      definition:
        "- **Rouf**, Kashmir: women in **two rows facing each other**, arms linked, at Eid and in spring; the rhythmic **footwork** is its heart.\n" +
        "- **Dumhal**, Kashmir: danced **only by men of the Wattal** community in long colourful robes and tall conical caps. They plant a **banner** in the ground and dance around it, singing to drums.\n" +
        "- **Kud**, Jammu: a night-time ritual dance in honour of the local gods (lok devtas).\n" +
        "- **Nati**, Himachal Pradesh: Kullu Nati holds a Guinness record as the largest folk dance.\n" +
        "- **Thoda**, Himachal Pradesh: an **archery** game and dance of **Rajput** teams, played around Baisakhi; the archer aims at the opponent's leg.\n" +
        "- **Jhora**, Kumaon, Uttarakhand: men and women in large circles, **arms linked**, at spring fairs, to the **hurka** drum.\n" +
        "- **Bhangra** (men), **Giddha** (women) and **Luddi** (a men's victory dance with swaying moves): Punjab.",
      table: {
        columns: ["Dance", "Where", "Who and how"],
        rows: [
          { cells: ["Rouf", "Kashmir", "Women in two facing rows; footwork; Eid"], pyqExampleId: "f0a19f34-046d-465d-804e-21273c888337" },
          { cells: ["Dumhal", "Kashmir", "Wattal men only; robes and conical caps; a planted banner"], pyqExampleId: "e17aad12-91d2-4f26-a9d0-7806efd8c4d7" },
          { cells: ["Kud", "Jammu", "Night ritual for local gods"], pyqExampleId: "77905dcc-080e-424c-ae64-d15d2a94021d" },
          { cells: ["Nati", "Himachal Pradesh", "Kullu Nati, a Guinness record"], pyqExampleId: "87c1274f-097e-474a-97dc-4bd23f542a92" },
          { cells: ["Thoda", "Himachal Pradesh", "Archery; Rajput teams; Baisakhi"], pyqExampleId: "196ab557-1a72-49fe-a8b5-2d5f3fb73b38" },
          { cells: ["Jhora", "Kumaon, Uttarakhand", "Arms linked in circles; hurka drum"], pyqExampleId: "2147a423-e199-458c-9d7b-ddc3eb2b13a4" },
          { cells: ["Bhangra and Giddha", "Punjab", "Men's and women's dances"], pyqExampleId: "dada4252-2b6c-4f6a-a4f3-b75cba1614d5" },
          { cells: ["Luddi", "Punjab", "Men's victory dance"], pyqExampleId: "2467ebb4-d4c6-4adc-8b61-4eafb813f02c" },
        ],
      },
      pyqExampleId: "d3dbdb7a-fbd3-41d8-9d34-a44f1c5278c9",
      selfCheckExample: {
        prompt: "Which Kashmiri dance do women perform in two rows facing each other at Eid?",
        steps: ["Dumhal is a men's dance, so it is ruled out.", "The women's dance in facing rows is Rouf."],
        answer: "Rouf",
      },
      practiceSet: [
        { prompt: "Thoda combines dance with which skill?", answer: "Archery" },
        { prompt: "Which drum keeps the beat for Jhora?", answer: "The hurka" },
        { prompt: "Luddi is a folk dance of which state?", answer: "Punjab" },
        { prompt: "Kud is a ritual dance of which region?", answer: "Jammu" },
        { prompt: "Which community plays Thoda?", answer: "The Rajputs" },
      ],
      traps: [
        {
          title: "Rouf is women; Dumhal is men",
          body: "Both are Kashmiri. Rouf is danced by women in facing rows; Dumhal only by Wattal men around a banner. A statement giving Dumhal to women is false.",
        },
        {
          title: "Thoda is archery, not swordplay",
          body: "Thoda is played with bows and arrows. Swordplay, stick-fighting and wrestling are the distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacfn-west",
      name: "Rajasthan, Gujarat, Maharashtra and Goa",
      intuition:
        "The west's dances come with a community and a prop: snake-charmers' swirling skirts, cymbals tied to the body, sticks pounding a floor, a drum keeping a fast beat.",
      definition:
        "- **Kalbelia**, Rajasthan: the dance of the **snake-charmer** Kalbelia community; women in **black, mirror-worked skirts** sway like a serpent. Its songs and steps pass down **orally**. On UNESCO's intangible heritage list since **2010**.\n" +
        "- **Ghoomar**, Rajasthan: women whirl in long skirts. It was first danced by **Bhil** women and later taken up by the **Rajputs**. It is **not** on the UNESCO list.\n" +
        "- **Terah Taali**, Rajasthan: **Kamada** women strike small cymbals (manjiras) tied to their bodies.\n" +
        "- **Bhavai**, Rajasthan and Gujarat: dancers balance a tower of pots on the head.\n" +
        "- **Tippani**, **Saurashtra**, Gujarat: women pound the floor with long **wooden sticks**; it began with women workers beating lime floors.\n" +
        "- **Dangi**, Dang district, Gujarat: a **group** dance of the district's Adivasis.\n" +
        "- **Lavani**, Maharashtra: fast songs and dance to the **dholki** drum. **Tamasha** is Maharashtra's folk theatre built on it.\n" +
        "- **Koli**, Maharashtra and Goa: the **fishing** community's dance; the moves copy rowing and casting nets.\n" +
        "- **Dhalo** (in the month of Pausha) and **Fugdi** (at festivals such as Ganesh Chaturthi): women's dances of Goa.",
      table: {
        columns: ["Dance", "State", "Who and how"],
        rows: [
          { cells: ["Kalbelia", "Rajasthan", "Snake-charmers; serpent moves; UNESCO 2010"], pyqExampleId: "bbcbcb7b-605f-404d-b743-9e7e52eb7d81" },
          { cells: ["Ghoomar", "Rajasthan", "Bhil origin, later Rajput; not on UNESCO's list"], pyqExampleId: "edbc7c03-1541-4523-8dc8-3deac1e265e1" },
          { cells: ["Terah Taali", "Rajasthan", "Kamada women; cymbals tied to the body"], pyqExampleId: "cf42e551-3f7e-4346-b211-2ab48bf64877" },
          { cells: ["Bhavai", "Rajasthan and Gujarat", "Pots balanced on the head"] },
          { cells: ["Tippani", "Gujarat (Saurashtra)", "Women pound the floor with wooden sticks"], pyqExampleId: "e77251fe-ad95-4703-a9b9-3606d8595dc0" },
          { cells: ["Dangi", "Gujarat (Dang district)", "Group dance of the Adivasis"], pyqExampleId: "33dcd27c-3475-458d-a084-3cdf4637aa29" },
          { cells: ["Lavani", "Maharashtra", "Fast songs to the dholki drum"], pyqExampleId: "c0a739bb-5e1c-43f7-b0d9-ed93cd04a2ae" },
          { cells: ["Tamasha", "Maharashtra", "Folk theatre"], pyqExampleId: "b3bff473-0581-41f4-8f38-1fde37cfe1b1" },
          { cells: ["Koli", "Maharashtra and Goa", "Fishing community; rowing moves"], pyqExampleId: "d65e81fd-7750-482c-83d6-0f78f886489a" },
          { cells: ["Dhalo", "Goa", "Women's dance in Pausha"], pyqExampleId: "77bd1e59-ad4a-44eb-a07a-705b7b5d3f1c" },
          { cells: ["Fugdi", "Goa", "Women's festival dance"], pyqExampleId: "d4623486-b15c-463b-9403-a96c774f723a" },
        ],
      },
      pyqExampleId: "dc9cc856-8d00-48bb-b9c6-937faf8014c3",
      selfCheckExample: {
        prompt: "Lavani is danced to the beat of which drum?",
        steps: ["Lavani is Maharashtra's fast song and dance.", "Its beat comes from the dholki, a small two-headed drum."],
        answer: "The dholki",
      },
      practiceSet: [
        { prompt: "What do Terah Taali dancers tie to their bodies?", answer: "Small cymbals (manjiras)" },
        { prompt: "From which region of Gujarat does Tippani come?", answer: "Saurashtra" },
        { prompt: "The Koli dance belongs to which community?", answer: "The fishing community" },
        { prompt: "Fugdi is a dance of which state?", answer: "Goa" },
        { prompt: "Which tribe first danced Ghoomar?", answer: "The Bhils" },
      ],
      traps: [
        {
          title: "Only Kalbelia is on UNESCO's list",
          body: "Of Rajasthan's dances, Kalbelia is on UNESCO's intangible heritage list (2010). A statement putting Ghoomar on it is false.",
        },
        {
          title: "Tamasha is theatre; Lavani is its song and dance",
          body: "Tamasha is Maharashtra's folk theatre and Lavani the song and dance inside it. Both are Maharashtra's, never Kerala's or Karnataka's.",
        },
        {
          title: "Dangi is a group dance",
          body: "Dangi is danced by many dancers in rows and circles. A statement calling it a solo narrative is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscsacfn-south",
      name: "Tamil Nadu, Karnataka and Kerala",
      intuition:
        "The south's folk dances are temple and festival forms: a dummy horse, big drums, painted masks for a goddess, a tribe's drums in the hills.",
      definition:
        "- **Kummi**, Tamil Nadu: women stand in a circle and clap in rhythm as they sing.\n" +
        "- **Poikkal Kuthirai Aattam**, Tamil Nadu: the dummy-horse dance; the dancer wears a horse frame round the waist and walks on stilts at temple festivals.\n" +
        "- **Yakshagana**, coastal Karnataka: a dance-drama of music, dialogue and grand costume; **Chittani Ramachandra Hegde** was one of its great artists.\n" +
        "- **Dollu Kunitha**, Karnataka: men of the **Kuruba** community dance with big drums (dollu) hung from the neck.\n" +
        "- **Padayani**, Kerala: a ritual dance with huge painted masks, to please the goddess **Bhadrakali**.\n" +
        "- **Elelakkaradi**, Kerala: the dance of the **Irula** tribe of Attappadi, Palakkad.",
      table: {
        columns: ["Dance", "State", "Who and how"],
        rows: [
          { cells: ["Kummi", "Tamil Nadu", "Women clap in a circle"], pyqExampleId: "2e2f8c93-39f9-452c-909b-4a9c3adaf825" },
          { cells: ["Poikkal Kuthirai Aattam", "Tamil Nadu", "Dummy horse; stilts"], pyqExampleId: "d113b28f-342f-48f4-84a8-015a1274e875" },
          { cells: ["Yakshagana", "Karnataka (coast)", "Dance-drama; Chittani Ramachandra Hegde"], pyqExampleId: "c6ac3672-85c7-48e8-9bc2-7871624c0acd" },
          { cells: ["Dollu Kunitha", "Karnataka", "Kuruba men with big drums"] },
          { cells: ["Padayani", "Kerala", "Masks; goddess Bhadrakali"], pyqExampleId: "8958742a-d661-4c7d-aeae-5b3a9c8b75e0" },
          { cells: ["Elelakkaradi", "Kerala", "Irula tribe of Attappadi"], pyqExampleId: "c4c9da2a-dec9-4efb-a223-6d3d712402ff" },
        ],
      },
      pyqExampleId: "8c898f26-9bd1-4494-b8d2-3c2fcfe1c509",
      selfCheckExample: {
        prompt: "Padayani is danced to please which goddess?",
        steps: ["Padayani is held in the Bhagavati temples of Kerala.", "The goddess it honours is Bhadrakali."],
        answer: "Bhadrakali",
      },
      practiceSet: [
        { prompt: "Kummi is a folk dance of which state?", answer: "Tamil Nadu" },
        { prompt: "Elelakkaradi is the dance of which tribe?", answer: "The Irula tribe" },
        { prompt: "Which state is Yakshagana from?", answer: "Karnataka" },
        { prompt: "In which dance does the dancer wear a dummy horse and walk on stilts?", answer: "Poikkal Kuthirai Aattam" },
      ],
      traps: [
        {
          title: "Yakshagana is Karnataka's, not Kerala's",
          body: "Yakshagana belongs to coastal Karnataka. Kerala's dance-drama is Kathakali, a classical dance.",
        },
        {
          title: "Elelakkaradi is Irula, not Kurumba",
          body: "Elelakkaradi belongs to the Irula tribe of Attappadi. Mavilan, Kurumba and Adiyan are other Kerala tribes put in as distractors.",
        },
      ],
    },
  ],
};
