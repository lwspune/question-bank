import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HI_AN_ART_NOTE: SubtopicNote = {
  subtopicName: "Art and Architecture",
  title: "Art and Architecture",
  oneLineDefinition:
    "Stupas, the Sarnath capital and Buddhist sites, the Gandhara and Mathura schools and the Ajanta paintings, and the early temples and rock-cut caves.",
  whyItMatters:
    "Thirteen questions, eight of them HARD and nine from 2023 or later. Most give a monument and ask where it is, what it is made of or which faith it belongs to. The Deogarh temple was asked in 2023 (II) and again in 2026 (II).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdshian-stupas",
      name: "Stupas, pillars and Buddhist sites",
      intuition:
        "A stupa is a mound built over relics of the Buddha or a great monk. Ashoka spread the cult, merchants paid for the carvings, " +
        "and the carvings borrowed freely from older popular beliefs.",
      definition:
        "- **Stupas** held **relics** of the Buddha and other monks. **Ashoka** did much to popularise them.\n" +
        "- They were built **near towns and trade routes**, where merchants and lay followers could visit and give money, not in remote countryside.\n" +
        "- At **Sanchi** (Madhya Pradesh) the gateways show the **shalabhanjika**, a woman holding the branch of a tree, a motif from **popular tree-spirit beliefs**, not from Buddhist teaching. A woman with **lotuses and elephants** is **Gajalakshmi**.\n" +
        "- The **Sarnath Lion Capital**: a tall polished **shaft**, a bell of **inverted lotus petals**, a **round abacus carved** with four animals and four wheels, and four lions back to back.\n" +
        "- **Kanaganahalli** in Kalaburagi district, Karnataka, on the **Bhima** river, has a stupa of the first to third centuries CE and a carved portrait labelled with **Ashoka's** name.\n" +
        "- The **Guntupalle** rock-cut Buddhist caves are in Eluru district, **Andhra Pradesh**.",
      table: {
        columns: ["Site or object", "Where", "Key fact"],
        rows: [
          {
            cells: ["Sanchi", "Madhya Pradesh", "Gateways carved with the shalabhanjika and Gajalakshmi"],
            noteAmber: "CDS 2022 (I): the woman with lotuses and elephants is Gajalakshmi, not the shalabhanjika.",
            pyqExampleId: "f93f54d1-ac39-4f77-aaf8-b8ae1a0f758b",
          },
          {
            cells: ["Sarnath Lion Capital", "Uttar Pradesh", "Inverted lotus below a round abacus carved with animals and wheels"],
            pyqExampleId: "845ab415-01dc-4eae-9325-1b964f930a2e",
          },
          { cells: ["Kanaganahalli", "Kalaburagi district, Karnataka, on the Bhima", "Stupa of the 1st to 3rd centuries CE; a portrait of Ashoka"] },
          {
            cells: ["Guntupalle", "Eluru district, Andhra Pradesh", "Rock-cut Buddhist caves"],
            pyqExampleId: "b36674e4-17bc-436b-a013-608073550081",
          },
        ],
      },
      pyqExampleId: "57bfabd8-b3dd-4168-baa9-c4837e59e28d",
      selfCheckExample: {
        prompt: "Where were stupas usually built, and why there?",
        steps: [
          "Stupas grew rich on gifts from merchants and lay followers.",
          "So they were placed where those people passed by.",
        ],
        answer: "Near towns and along trade routes, so that merchants and lay followers could visit and give.",
      },
      practiceSet: [
        { prompt: "What is a stupa built to hold?", answer: "Relics of the Buddha or of revered monks" },
        { prompt: "What does the shalabhanjika figure at Sanchi show?", answer: "A woman holding the branch of a tree" },
        { prompt: "Which four animals are carved on the abacus of the Sarnath capital?", answer: "Elephant, horse, bull and lion" },
        { prompt: "In which state are the Guntupalle Buddhist caves?", answer: "Andhra Pradesh" },
      ],
      traps: [
        {
          title: "The Sarnath abacus is carved",
          body: "The abacus of the Sarnath capital is round and carved with four animals and four wheels. A statement calling it plain is false.",
        },
        {
          title: "Stupas were not in remote villages",
          body: "Stupas stood near towns and trade routes, where patrons could reach them. 'They were located in rural areas' is the wrong statement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-sculpture",
      name: "Gandhara, Mathura and Ajanta",
      intuition:
        "Two schools carved the first images of the Buddha: Gandhara in the north-west with a Greek look, Mathura with an Indian one. " +
        "Later, at Ajanta, painters filled cave walls with crowded stories.",
      definition:
        "- **Gandhara** (the north-west) carved the Buddha with **Greek features**. Its sculptors worked first in **blue-grey schist** and **green phyllite**, and later in **stucco**.\n" +
        "- **Mathura** carved in **red sandstone**, in a local Indian style.\n" +
        "- The **Ajanta** caves in **Maharashtra** are painted with **Jataka** stories and with **yakshas, gandharvas and apsaras**. The painters used **multiple perspectives**, showing figures and buildings from several angles in one scene.",
      table: {
        columns: ["School or site", "Material", "Key fact"],
        rows: [
          { cells: ["Gandhara", "Blue-grey schist and green phyllite, later stucco", "The Buddha with Greek features"] },
          { cells: ["Mathura", "Red sandstone", "Images in an Indian style"] },
          { cells: ["Ajanta", "Paint on cave walls", "Jataka stories; yakshas, gandharvas and apsaras; several viewpoints in one scene"] },
        ],
      },
      pyqExampleId: "f5fc079e-913b-4be5-91f6-9ab56c02dd87",
      selfCheckExample: {
        prompt: "Which stone did Mathura sculptors use, and which stones did Gandhara sculptors use first?",
        steps: [
          "Mathura's stone is known by its colour.",
          "Gandhara used two greyish-green stones before turning to stucco.",
        ],
        answer: "Mathura: red sandstone. Gandhara: blue-grey schist and green phyllite.",
      },
      practiceSet: [
        { prompt: "Which material did Gandhara sculptors turn to after stone?", answer: "Stucco" },
        { prompt: "In which state are the Ajanta caves?", answer: "Maharashtra" },
        { prompt: "What kind of stories fill many of the Ajanta paintings?", answer: "Jataka stories of the Buddha's earlier births" },
      ],
      traps: [
        {
          title: "Grey schist for Gandhara, red sandstone for Mathura",
          body: "Gandhara sculpture is in grey schist, phyllite and stucco; Mathura's is in red sandstone. CDS uses the material to tell the two schools apart.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdshian-temples",
      name: "Temples and rock-cut caves",
      intuition:
        "The first free-standing temples came in the Gupta age, some in stone and some in brick. " +
        "Before and beside them, whole temples were cut out of hillsides: Jain caves in Odisha, Shiva's caves at Elephanta, and the giant Kailasa at Ellora.",
      definition:
        "- The **Dashavatara temple** at **Deogarh**, in Lalitpur district of **Uttar Pradesh**, is a **Gupta** temple of **stone**.\n" +
        "- The **Bhitargaon** temple near Kanpur, Uttar Pradesh, is a Gupta temple of **brick** with terracotta panels.\n" +
        "- The **Elephanta** caves near Mumbai are **Shaiva** caves linked with the **Pashupata** sect. The **Portuguese** named the island after a stone elephant, it has a **group of caves**, and its famous carving is the **three-headed Shiva**.\n" +
        "- **Ellora** in Maharashtra has **Buddhist, Hindu and Jain** caves. Its **Kailasa** temple was **cut from a single rock**, downward from the top.\n" +
        "- **Rani Gumpha** at **Udayagiri**, Odisha, is a **two-storeyed** Jain cave covered in **carved friezes**.",
      table: {
        columns: ["Monument", "Where", "Key fact"],
        rows: [
          {
            cells: ["Dashavatara temple, Deogarh", "Lalitpur district, Uttar Pradesh", "Gupta temple of stone"],
            noteAmber: "CDS 2023 (II): asked for its state, Uttar Pradesh.",
            pyqExampleId: "8e42a842-8c34-4a1c-90f9-c1ca26863496",
          },
          { cells: ["Bhitargaon temple", "Near Kanpur, Uttar Pradesh", "Gupta temple of brick with terracotta panels"] },
          {
            cells: ["Elephanta caves", "Near Mumbai, Maharashtra", "Shaiva caves linked with the Pashupata sect; three-headed Shiva"],
            pyqExampleId: "6fdb81c3-dc34-40f6-abb2-5ba8254106fd",
          },
          {
            cells: ["Ellora caves", "Maharashtra", "Buddhist, Hindu and Jain caves; Kailasa cut from one rock"],
            pyqExampleId: "cc76141c-6276-4dc8-8753-4046ebdde741",
          },
          { cells: ["Rani Gumpha", "Udayagiri, Odisha", "Two-storeyed Jain cave with carved friezes"] },
        ],
      },
      pyqExampleId: "b29fb7c6-278e-4f99-a653-9195d19b79d7",
      selfCheckExample: {
        prompt: "What is unusual about how the Kailasa temple at Ellora was made?",
        steps: [
          "It was not built up from cut blocks or bricks.",
          "The builders carved it downward out of one mass of rock.",
        ],
        answer: "It was cut out of a single rock, from the top down.",
      },
      practiceSet: [
        { prompt: "Who named Elephanta island, and after what?", answer: "The Portuguese, after a stone elephant found there" },
        { prompt: "Which cave at Udayagiri in Odisha is two-storeyed and covered in carved friezes?", answer: "Rani Gumpha" },
        { prompt: "Which three religions have caves at Ellora?", answer: "Buddhism, Hinduism and Jainism" },
      ],
      traps: [
        {
          title: "Ellora is not only Buddhist",
          body: "Ellora has Buddhist, Hindu and Jain caves side by side. A statement that it is linked only with Buddhism is false.",
        },
        {
          title: "Elephanta is Shaiva, not Vishnu",
          body: "Elephanta's great carving is the three-headed Shiva, and the caves are linked with the Pashupata sect. It was named by the Portuguese, not the British.",
        },
      ],
    },
  ],
};
