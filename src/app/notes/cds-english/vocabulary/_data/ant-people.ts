import type { SubtopicNote } from "@/app/notes/_types";

const COLUMNS = ["Word", "Meaning", "Opposite", "Other options", "Sitting"];

export const CDSEN_ANT_PEOPLE_NOTE: SubtopicNote = {
  subtopicName: "Antonyms: People and Character",
  title: "Antonyms: words for people and character",
  oneLineDefinition:
    "Words that describe what a person is like, kind or cruel, humble or proud, quiet or talkative, loyal or rebellious, with the opposites CDS has asked for.",
  whyItMatters:
    "Words for character are the largest family among CDS antonyms. Almost all of them carry a strong charge, so the first check of the method, good or bad, already removes most options. " +
    "Learn them as pairs of opposites, not one word at a time.",
  concepts: [
    // C1 — goodwill and ill-will
    {
      kind: "reference" as const,
      slug: "cdsenant-goodwill",
      name: "Goodwill and ill-will",
      intuition:
        "Two camps: words for wishing others well, and words for wishing them harm. Each tested word sits firmly in one camp, and its opposite is in the other. " +
        "The wrong options are usually more words from the same camp as the tested word.",
      definition:
        "- **Goodwill:** benevolent (wishing good), charitable (generous to the needy), compassionate (feeling others' pain), philanthropic (helping mankind), virtuous (morally good), admirable.\n" +
        "- **Ill will:** malicious and malevolent (wanting to harm), spiteful, vindictive (wanting revenge), nefarious and iniquitous (wicked), abominable (hateful), repulsive (disgusting).\n" +
        "- **Roots help:** bene- 'well' against mal- 'badly' (benevolent, malevolent).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["philanthropy", "love of mankind, giving to good causes", "nastiness", "charity, benevolence (synonyms), likeliness", "2020 (I)"], pyqExampleId: "7901d742-c664-43a5-839c-334b4d5bde46" },
          { cells: ["compassion", "pity and concern for others' suffering", "indifference", "empathy (synonym), carefulness, hardship", "2020 (I)"], pyqExampleId: "21937b8d-dd00-456b-aea5-ee89b066e12f" },
          { cells: ["charitable", "kind and generous to those in need", "malevolent", "gracious, lenient (near-synonyms), unforeseen", "2020 (I)"], pyqExampleId: "54fea499-63f9-4599-ac2a-c6560eb3388c" },
          { cells: ["malicious", "meaning to do harm", "benevolent", "pernicious, spiteful, vindictive (synonyms)", "2023 (I)"], pyqExampleId: "939e3061-4613-4177-a712-e2725b877acc" },
          { cells: ["nefarious", "wicked, criminal", "admirable", "flagitious, execrable, abominable (synonyms)", "2024 (I)"], pyqExampleId: "2b092ee8-abcc-41d5-ab23-e8e1a1d7b379" },
          { cells: ["iniquitous", "grossly unfair, wicked", "virtuous", "execrable, revolting (near-synonyms), preposterous", "2024 (II)"], pyqExampleId: "7cff4948-711e-4fd8-a56c-aed20b4f21b5" },
          { cells: ["abominable", "hateful, disgusting", "attractive", "abhorrent, repugnant (synonyms), reputable", "2018 (I)"], noteAmber: "Reputable (well thought of) also runs against abominable; attractive is the fuller opposite of a repellent figure.", pyqExampleId: "0af1d477-9c4a-4596-8598-126598a150c4" },
          { cells: ["abomination", "something hateful; intense hatred", "adoration", "abhorrence, detestation (synonyms), termination", "2023 (II)"], pyqExampleId: "c9cd5aef-a4ae-4707-bc15-6e919193039b" },
          { cells: ["charming", "delightful, pleasing", "repulsive", "enchanting, hypnotic, fascinating (synonyms)", "2018 (I)"], pyqExampleId: "2ce6807c-1f43-428a-a018-8de32c554ce9" },
        ],
        caption: "Every opposite here crosses from one camp to the other; every struck option stays in the tested word's camp.",
      },
      pyqExampleId: "939e3061-4613-4177-a712-e2725b877acc",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The king was \\(\\underline{\\text{magnanimous}}\\) towards his defeated enemies. (a) generous (b) noble (c) petty (d) forgiving",
        steps: [
          "Meaning: 'magnanimous' means generous and forgiving, above small-minded revenge.",
          "Charge: positive, goodwill camp.",
          "Generous, noble and forgiving are in the same camp: strike them.",
          "Petty (small-minded, mean) is in the other camp.",
        ],
        answer: "(c) petty",
      },
      practiceSet: [
        { prompt: "Opposite of 'nefarious' (wicked)?", answer: "admirable" },
        { prompt: "Opposite of 'compassion'?", answer: "indifference", method: "Feeling for others against not caring." },
        { prompt: "Spot the pair that is NOT an opposite: charitable / malevolent · philanthropy / charity · charming / repulsive", answer: "philanthropy / charity", method: "Both are goodwill words: synonyms." },
        { prompt: "Opposite of the noun 'abomination' (something hateful)?", answer: "adoration", method: "A noun for a noun." },
      ],
      traps: [
        {
          title: "Two bad words are not opposites",
          body:
            "For a wicked word like 'nefarious', the options 'flagitious', 'execrable' and 'abominable' are all wicked words too. A strong word is not an opposite just because it is unfamiliar. Look for the one option in the other camp.",
        },
      ],
    },

    // C2 — respect and scorn, modesty and pride
    {
      kind: "reference" as const,
      slug: "cdsenant-respect",
      name: "Respect and scorn, modesty and pride",
      intuition:
        "These words describe how a person treats others and how they see themselves. Looking up to others (respect) is the opposite of looking down on them (scorn). " +
        "Thinking little of yourself (humility, modesty) is the opposite of pushing yourself forward (pride, boldness).",
      definition:
        "- **Respect:** respectful, reverential (showing deep respect).\n" +
        "- **Scorn:** disdainful, contemptuous, scornful, sneering, insolent (rude to those above you), condescending and patronising (talking down).\n" +
        "- **Modesty:** humility, demure (quiet and modest), unimpressive.\n" +
        "- **Pride and boldness:** self-aggrandisement (making yourself bigger), brazen (shamelessly bold), redoubtable (formidable).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["disdainful", "showing scorn, looking down on others", "respectful", "sneering, mocking (synonyms), cheerful", "2018 (II)"], pyqExampleId: "c8359443-2027-4b6e-abbd-36073cff2394" },
          { cells: ["disdainful", "showing scorn, looking down on others", "respectful", "contemptuous, dismissive, scornful (synonyms)", "2023 (I)"], pyqExampleId: "4726972c-c0ef-478a-863a-a5cd6077b48b" },
          { cells: ["insolent", "rude and disrespectful", "respectful", "impudent (synonym), autocratic, thought provoking", "2019 (II)"], pyqExampleId: "817f4d62-1225-49ee-b9fb-26b7fed65a9e" },
          { cells: ["contemptuous", "showing scorn", "reverential", "condescending, patronising, arrogant (synonyms)", "2026 (I)"], pyqExampleId: "16e24c0e-c05b-4dd4-9aef-dbc391a38bac" },
          { cells: ["self-aggrandisement", "making oneself more powerful or important", "humility", "elevation, upliftment (near-synonyms), exaggeration", "2023 (II)"], pyqExampleId: "d201c95d-db0d-461c-a059-fb948bc0984d" },
          { cells: ["redoubtable", "formidable, worthy of fear or respect", "unimpressive", "formidable, fearsome, awe inspiring (synonyms)", "2023 (I)"], pyqExampleId: "ce27ae42-b3b2-4c79-9f4d-7e1a906cf9ad" },
          { cells: ["demure", "shy, quiet and modest", "brazen", "sedate, modest, solemn (synonyms)", "2026 (I)"], pyqExampleId: "9bdbfff0-0d8a-4954-98fa-45888099ba74" },
        ],
        caption: "Disdainful is the one word in this family set twice, and respectful was the opposite both times.",
      },
      pyqExampleId: "4726972c-c0ef-478a-863a-a5cd6077b48b",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The new recruit was \\(\\underline{\\text{arrogant}}\\) towards the senior officers. (a) haughty (b) humble (c) proud (d) conceited",
        steps: [
          "Meaning: 'arrogant' means proud and looking down on others.",
          "Haughty, proud and conceited all mean the same: strike them.",
          "Humble (modest, not thinking yourself above others) is the opposite.",
        ],
        answer: "(b) humble",
      },
      practiceSet: [
        { prompt: "Opposite of 'insolent' (rude to those above you)?", answer: "respectful" },
        { prompt: "Opposite of 'demure' (quiet and modest)?", answer: "brazen", method: "Shamelessly bold." },
        { prompt: "Opposite of 'self-aggrandisement'?", answer: "humility" },
        { prompt: "Spot the wrong row: contemptuous / reverential · redoubtable / formidable · insolent / respectful", answer: "redoubtable / formidable", method: "Formidable is a synonym; the opposite is unimpressive." },
      ],
      traps: [
        {
          title: "Talking down is still scorn",
          body:
            "'Condescending' and 'patronising' sound polite, but they mean treating someone as lower than you. They are synonyms of 'contemptuous', not opposites. The opposite is a respect word such as 'reverential'.",
        },
      ],
    },

    // C3 — temperament and habits
    {
      kind: "reference" as const,
      slug: "cdsenant-temper",
      name: "Temperament and habits",
      intuition:
        "These words describe how a person behaves: how much they talk, how strongly they feel, how they spend, how firm or how odd they are. Most come in clean pairs: quiet against talkative, extreme against moderate, mean with money against wasteful.",
      definition:
        "- **Talk:** reticent, taciturn, reserved (say little) against garrulous, voluble, effusive (say a lot, pour out feeling).\n" +
        "- **Strength of feeling:** fanatical, vehement, ardent (extreme, forceful) against moderate, subdued.\n" +
        "- **Money:** frugal, parsimonious, sparing (spend little) against extravagant (spend too much).\n" +
        "- **Experience and judgment:** naive, childish (innocent, immature) against wise, seasoned.\n" +
        "- **Firmness and oddness:** steadfast (firm, loyal) against unreliable; eccentric (odd) against normal.",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["naive", "innocent, lacking experience", "wise", "credulous, childlike, innocent (synonyms)", "2018 (I)"], pyqExampleId: "85a9985d-b580-4410-9b1b-499073766bbb" },
          { cells: ["fanatical", "extreme and intolerant in belief", "moderate", "bigoted, rabid, militant (synonyms)", "2019 (I)"], pyqExampleId: "5b57b926-15e9-4d35-adfa-9fd93eccc99f" },
          { cells: ["steadfast", "firm and loyal", "unreliable", "committed, unwavering, unfaltering (synonyms)", "2019 (I)"], pyqExampleId: "09848378-2d59-44bc-8757-840564585b15" },
          { cells: ["reticent", "unwilling to talk, reserved", "garrulous", "taciturn, reserved, quiet (synonyms)", "2022 (I)"], pyqExampleId: "82b50d15-0127-42d1-bbdf-7fec626acfb4" },
          { cells: ["effusive", "pouring out feeling, gushing", "reticent", "exuberant, profuse, voluble (synonyms)", "2024 (II)"], pyqExampleId: "b49179ba-3d28-4677-b8e8-3bc2a3c90149" },
          { cells: ["childish", "silly and immature", "seasoned", "infantile (synonym), harmonious, exquisite", "2022 (I)"], pyqExampleId: "e40a9dd3-01f0-471a-bc14-1c9ffead33d5" },
          { cells: ["an eccentric", "odd, unconventional", "a normal", "an odd, a peculiar, an idiosyncratic (synonyms)", "2021 (II)"], pyqExampleId: "a0eb6472-3919-46a4-aeb1-165578a81c39" },
          { cells: ["vehement", "forceful and passionate", "subdued", "ardent, fervent, impassioned (synonyms)", "2024 (I)"], pyqExampleId: "b33db036-49e0-4e48-bf80-791a286791dd" },
          { cells: ["frugal", "simple and cheap, sparing", "extravagant", "sparing, meagre (synonyms), delicious", "2023 (I)"], pyqExampleId: "1baeb6d7-8f6a-42f0-96d8-18c6d67704cc" },
          { cells: ["parsimonious", "very unwilling to spend money", "extravagant", "frugal, sparing (synonyms), partisan", "2026 (I)"], pyqExampleId: "5f70bbb4-8239-4dc0-900d-d2540318d4e0" },
        ],
        caption: "Reticent was once the word tested and once the answer (for effusive): learn a pair, and both directions are covered.",
      },
      pyqExampleId: "82b50d15-0127-42d1-bbdf-7fec626acfb4",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The commander was known for his \\(\\underline{\\text{impetuous}}\\) decisions. (a) rash (b) hasty (c) cautious (d) impulsive",
        steps: [
          "Meaning: 'impetuous' means acting quickly without thinking.",
          "Rash, hasty and impulsive mean the same: strike them.",
          "Cautious (careful, thinking before acting) reverses it.",
        ],
        answer: "(c) cautious",
      },
      practiceSet: [
        { prompt: "Opposite of 'naive' (innocent, lacking experience)?", answer: "wise" },
        { prompt: "Opposite of 'vehement'?", answer: "subdued" },
        { prompt: "Both 'frugal' and 'parsimonious' have the same opposite. What is it?", answer: "extravagant" },
        { prompt: "Opposite of 'steadfast'?", answer: "unreliable" },
      ],
      traps: [
        {
          title: "A synonym of a synonym is still a synonym",
          body:
            "'Frugal' was an option when 'parsimonious' was tested. Both mean spending little, so 'frugal' is a synonym, not the answer. Two of the options for 'parsimonious' were 'frugal' and 'sparing': strike both and find 'extravagant'.",
        },
        {
          title: "Keep the article with the word",
          body:
            "When the underline covers 'an eccentric', the options carry their own articles: 'an odd', 'a normal'. The answer is 'a normal'; the article only has to fit the next word, so do not reject an option for its 'a' or 'an'.",
        },
      ],
    },

    // C4 — loyalty and rebellion
    {
      kind: "reference" as const,
      slug: "cdsenant-loyalty",
      name: "Loyalty and rebellion",
      intuition:
        "Words for standing with a group or a belief, and words for turning against it. A friend or believer stands with you; a foe, a rebel or a heretic stands against you.",
      definition:
        "- **Against:** mutinous (rebelling against officers or rulers), heretic (one who rejects the accepted belief), foe (enemy), opponent, renegade and apostate (one who deserts a cause or faith).\n" +
        "- **With:** obedient, believer, friend, confidant (a trusted friend you share secrets with).",
      table: {
        columns: COLUMNS,
        rows: [
          { cells: ["mutinous", "rebelling against authority", "obedient", "arrogant, lucky, sincere (unrelated)", "2018 (II)"], pyqExampleId: "2282fec6-656a-49ab-b425-4effa84a7ddf" },
          { cells: ["heretics", "people who reject the accepted belief", "believer", "dissenter, renegade, apostate (synonyms)", "2019 (I)"], pyqExampleId: "22f44748-6e77-4125-b45f-908f3922f73c" },
          { cells: ["foes", "enemies", "friends", "opponents (synonym), protagonists, soul mates", "2018 (II)"], pyqExampleId: "129acdc0-fff2-4dd3-a622-b8b9bfdd6b54" },
          { cells: ["confidants", "trusted close friends", "opponents", "intimate, close friend (synonyms), colleague", "2020 (II)"], pyqExampleId: "646098af-d3f9-4fc4-b474-3adde1912a73" },
        ],
        caption: "Mutinous has been set twice, and obedient was the opposite both times.",
      },
      pyqExampleId: "22f44748-6e77-4125-b45f-908f3922f73c",
      selfCheckExample: {
        prompt:
          "Choose the word opposite in meaning to the underlined word. The soldier remained \\(\\underline{\\text{loyal}}\\) to his regiment. (a) faithful (b) devoted (c) treacherous (d) staunch",
        steps: [
          "Meaning: 'loyal' means faithful, standing by someone.",
          "Faithful, devoted and staunch mean the same: strike them.",
          "Treacherous (betraying trust) is the opposite.",
        ],
        answer: "(c) treacherous",
      },
      practiceSet: [
        { prompt: "Opposite of 'foes'?", answer: "friends" },
        { prompt: "Opposite of 'confidants' (trusted friends)?", answer: "opponents" },
        { prompt: "Opposite of 'mutinous'?", answer: "obedient" },
      ],
      traps: [
        {
          title: "Confidant is not 'confident'",
          body:
            "A **confidant** is a person you trust with secrets. 'Confident' is an adjective meaning sure of yourself. Read the spelling: the tested word is a person, so its opposite is a person too, such as 'opponents'.",
        },
      ],
    },
  ],
};
