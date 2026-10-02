import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SYN_HARM_DEGREE_NOTE: SubtopicNote = {
  subtopicName: "Synonyms: Harm, Degree and the Senses",
  title: "Words for harm, degree and the senses",
  oneLineDefinition:
    "The words CDS has tested for harm and decline, for size and degree, and for what we see, hear and taste.",
  whyItMatters:
    "These words describe things rather than people: a debilitating disease, a stellar show, a resonant voice. Many of them have a well-known opposite that the examiner places among the options, so knowing the pair is half the answer.",
  concepts: [
    // C1 — harm, decline and health
    {
      kind: "reference" as const,
      slug: "cdsensyn-harm",
      name: "Harm, decline and health",
      intuition:
        "Most of these words mean harmful or ruined, and they differ in how the harm works. Debilitating weakens; nugatory makes useless; blighted ruins. One word, salubrious, means the opposite: good for health.",
      definition:
        "Group them:\n" +
        "- **Harm**: pernicious, detrimental, debilitating (crippling), contagious (spreading), gratuitous (uncalled for).\n" +
        "- **Ruin and failure**: blighted (ruined), floundered (struggled), nugatory (ineffectual), travesty (mockery), lamentable (deplorable), derisory (inadequate).\n" +
        "- **Health and looks**: salubrious (good for health), pale (sallow), gibbous (hunched), terminal (incurable).",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["debilitating", "making weak", "crippling", "2024 (I)"] },
          { cells: ["pernicious", "harmful, often slowly or in a hidden way", "harmful", "2024 (II)"] },
          { cells: ["detrimental", "causing harm", "disadvantageous", "2018 (II)"] },
          { cells: ["salubrious", "good for health", "pleasant", "2018 (II)"], noteAmber: "Strictly health-giving. Pleasant was the only positive option." },
          { cells: ["contagious", "spreading from one person to another", "transmittable", "2020 (I)"] },
          { cells: ["pale", "light in colour, looking unwell", "sallow", "2021 (II)"], noteAmber: "Ruddy, glowing and radiant are healthy colours, the opposite." },
          { cells: ["gibbous", "humped", "hunched", "2022 (I)"], noteAmber: "Also used of the moon when more than half of it is lit." },
          { cells: ["blighted", "spoiled, ruined", "ruined", "2026 (II)"] },
          { cells: ["lamentable", "deserving regret", "deplorable", "2022 (II)"] },
          { cells: ["nugatory", "of no use or force", "ineffectual", "2023 (II)"] },
          { cells: ["travesty", "a poor, false copy of something", "mockery", "2026 (I)"] },
          { cells: ["terminal", "of an illness, ending in death", "incurable", "2019 (I)"], noteAmber: "Not the terminal of a bus or train here." },
          { cells: ["derisory", "so small that it is laughable", "inadequate", "2023 (II)"], noteAmber: "Not derogatory (insulting in words)." },
          { cells: ["gratuitous", "uncalled for, without good reason", "unjustified", "2026 (II)"], noteAmber: "Not gratifying (pleasing) or grating (harsh)." },
          { cells: ["floundered", "struggled", "faced many problems", "2023 (II)"] },
        ],
      },
      pyqExampleId: "5888be3c-94bc-4ae7-bac6-d9aec86667bf",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: Without funds, the new law was \\(\\underline{\\text{nugatory}}\\). (a) useless (b) strict (c) popular (d) fair",
        steps: [
          "Nugatory means of no use or force.",
          "Strict, popular and fair all describe a law that works in some way.",
          "Without funds the law achieves nothing, so useless keeps the meaning.",
        ],
        answer: "(a) useless",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: salubrious = unhealthy; blighted = ruined; lamentable = deplorable; debilitating = crippling.",
          answer: "salubrious = unhealthy",
          method: "Salubrious means good for health.",
        },
        {
          prompt: "A travesty of justice is: (a) justice done well (b) a poor, false copy of justice (c) a long trial (d) a new law",
          answer: "(b) a poor, false copy of justice",
        },
        {
          prompt: "A business that floundered: (a) did well (b) struggled (c) closed at once (d) moved",
          answer: "(b) struggled",
        },
      ],
      traps: [
        {
          title: "Flounder is not founder",
          body: "To **flounder** is to struggle clumsily. To **founder** is to sink or fail completely. Options such as glided through or succeeded are opposites of flounder.",
        },
        {
          title: "Do not guess the charge from the sound",
          body: "**Salubrious** sounds like a hard, gloomy word, but it means healthy. Learn its charge; do not guess it from how the word sounds.",
        },
        {
          title: "Gratuitous is not grateful",
          body: "**Gratuitous** violence is violence with no good reason: **unjustified**. It has nothing to do with gratitude or with gratifying (pleasing).",
        },
      ],
    },

    // C2 — size, degree and quality
    {
      kind: "reference" as const,
      slug: "cdsensyn-degree",
      name: "Size, degree and quality",
      intuition:
        "These words place something on a scale: at the bottom or the top, beyond the limit, or at the very start. Find where the word sits; the word at the other end of the scale is usually among the options as a trap.",
      definition:
        "Scale pairs:\n" +
        "- **Lowest and highest**: nadir (the lowest point) against zenith (the highest point); stellar (outstanding).\n" +
        "- **Too much and too little**: excessive (inordinate), narrowest (smallest).\n" +
        "- **Simple and complex**: rudimentary (elementary) against complexity (intricacy).\n" +
        "- **Fit and visibility**: conspicuous (noticeable), incongruous (out of place), akin (similar), perpetual (ever lasting).\n" +
        "- **Others**: implications (consequences), asset (advantage), differences (disagreements), mensuration (measurement).",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["excessive", "more than is right", "inordinate", "2021 (II)"] },
          { cells: ["stellar", "outstanding", "extraordinary", "2020 (I)"] },
          { cells: ["nadir", "the lowest point", "all-time low", "2026 (I)"] },
          { cells: ["rudimentary", "basic, at an early stage", "elementary", "2026 (I)"] },
          { cells: ["conspicuous", "easy to see", "noticeable", "2026 (I)"] },
          { cells: ["akin", "similar, related", "similar", "2019 (II)"] },
          { cells: ["implications", "likely results", "consequences", "2020 (I)"] },
          { cells: ["narrowest", "most limited", "smallest", "2019 (II)"] },
          { cells: ["perpetual", "never ending", "ever lasting", "2021 (I)"] },
          { cells: ["complexity", "the state of being complicated", "intricacy", "2021 (II)"], noteAmber: "Not complacency (smugness)." },
          { cells: ["incongruous", "out of place, not fitting", "inappropriate", "2023 (I)"] },
          { cells: ["mensuration", "the measuring of length, area and volume", "measurement", "2022 (I)"] },
          { cells: ["asset", "something useful or valuable", "advantage", "2019 (I)"] },
          { cells: ["differences", "between people, disputes", "disagreements", "2021 (II)"] },
        ],
      },
      pyqExampleId: "0df7031b-da26-4037-8795-1ce1dd2b2f5c",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: Her \\(\\underline{\\text{stellar}}\\) performance won the prize. (a) poor (b) outstanding (c) starry (d) average",
        steps: [
          "Stellar comes from the Latin for star. Of a performance, it means outstanding.",
          "Poor and average are the other end of the scale.",
          "Starry keeps the literal star, not the meaning in this sentence. Outstanding fits.",
        ],
        answer: "(b) outstanding",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: rudimentary = elementary; akin = similar; conspicuous = hidden; excessive = inordinate.",
          answer: "conspicuous = hidden",
          method: "Conspicuous means easy to see.",
        },
        {
          prompt: "Incongruous means: (a) out of place (b) matching (c) quiet (d) large",
          answer: "(a) out of place",
        },
        {
          prompt: "The implications of a decision are its likely ___.",
          answer: "consequences",
        },
      ],
      traps: [
        {
          title: "Excessive is about amount",
          body: "**Excessive** means beyond the proper limit: **inordinate**. **Unreasonable** is close, but it judges a person's thinking, not an amount.",
        },
        {
          title: "Rudimentary is not radical",
          body: "**Rudimentary** means basic, at an early stage: **elementary**. **Radical** means extreme, and **nuanced** is close to the opposite of rudimentary.",
        },
        {
          title: "Akin to means similar to",
          body: "**Akin** comes from kin (family), but 'akin to a contract' means **similar** to a contract. **Unparallel** and **removed** point the other way.",
        },
      ],
    },

    // C3 — sights, sounds, taste and weather
    {
      kind: "reference" as const,
      slug: "cdsensyn-senses",
      name: "Sights, sounds, taste and weather",
      intuition:
        "These words describe what we see, hear and taste, and the weather. Picture the scene: a vista is the whole view, a resonant voice fills the room, a scrumptious meal tastes delicious.",
      definition:
        "Group them:\n" +
        "- **Sight**: vista (landscape), dingy (dark and dirty).\n" +
        "- **Sound**: resonant (deep), tremulous (quivering), commotion (uproar).\n" +
        "- **Taste**: scrumptious (delectable), savoury (salty, not sweet).\n" +
        "- **Weather and travel**: precipitation (rainfall), dry (arid), jaunt (a short trip).",
      table: {
        columns: ["Word", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["vista", "a wide view", "landscape", "2022 (II)"] },
          { cells: ["jaunt", "a short pleasure trip", "expedition", "2022 (II)"], noteAmber: "A jaunt is short. Expedition was the only option about a trip." },
          { cells: ["precipitation", "rain, snow or hail", "rainfall", "2019 (I)"] },
          { cells: ["resonant", "deep and echoing", "deep", "2024 (II)"] },
          { cells: ["tremulous", "shaking", "quivering", "2026 (II)"] },
          { cells: ["scrumptious", "delicious", "delectable", "2026 (II)"] },
          { cells: ["commotion", "noisy disturbance", "uproar", "2021 (I)"] },
          { cells: ["dry", "of a season, with little rain", "arid", "2021 (II)"] },
          { cells: ["savoury", "salty or spicy, not sweet", "salty", "2026 (II)"] },
          { cells: ["dingy", "dark and dirty-looking", "dark and dirty", "2024 (I)"] },
        ],
      },
      pyqExampleId: "3f9731bd-a02e-4279-847c-53e30caee5a2",
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The bell's \\(\\underline{\\text{resonant}}\\) note filled the valley. (a) faint (b) echoing (c) sharp (d) short",
        steps: [
          "Resonant describes a sound that is deep and goes on echoing.",
          "Faint and short are the opposite: they do not fill a valley.",
          "Sharp is a different quality of sound. Echoing keeps the meaning.",
        ],
        answer: "(b) echoing",
      },
      practiceSet: [
        {
          prompt: "Spot the wrong row: vista = landscape; commotion = peace; scrumptious = delectable; precipitation = rainfall.",
          answer: "commotion = peace",
          method: "A commotion is a noisy disturbance.",
        },
        {
          prompt: "Savoury food is: (a) sweet (b) salty or spicy (c) cold (d) stale",
          answer: "(b) salty or spicy",
        },
        {
          prompt: "What is the word for a short trip made for pleasure?",
          answer: "jaunt",
        },
      ],
      traps: [
        {
          title: "Savoury is not sweet",
          body: "**Savoury** food is salty or spicy. **Sugary** is the opposite, and **blanched** (boiled briefly) is about cooking, not taste.",
        },
        {
          title: "Scrumptious is about taste, not size",
          body: "A **scrumptious** meal is delicious: **delectable**. A **lavish** meal is large and costly, which is a different idea.",
        },
        {
          title: "Precipitation is more than rain",
          body: "**Precipitation** covers rain, snow, sleet and hail. When the options give rainfall and snowing, **rainfall** is the general match; **drought** is the opposite.",
        },
      ],
    },
  ],
};
