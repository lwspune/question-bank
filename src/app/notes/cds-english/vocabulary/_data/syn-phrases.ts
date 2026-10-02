import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SYN_PHRASES_NOTE: SubtopicNote = {
  subtopicName: "Synonyms: Phrases and Idioms",
  title: "Underlined phrases, idioms and definition-style options",
  oneLineDefinition:
    "What to do when the underlined part is a whole phrase or an idiom, and when the options are short definitions instead of single words.",
  whyItMatters:
    "Some CDS synonym questions underline a whole phrase, such as an idiom, and some give definitions as options instead of single words. The same method works, but you read the phrase as one unit and define the word yourself before you look at the options.",
  concepts: [
    // C1 — prepositional phrases and phrasal verbs
    {
      kind: "reference" as const,
      slug: "cdsensyn-phrases",
      name: "Prepositional phrases and phrasal verbs",
      intuition:
        "A phrase such as 'in consonance with' or 'dispense with' works as one unit. Its meaning is not the sum of its words, so learn it whole and swap it whole.",
      definition:
        "- A **prepositional phrase** starts with a preposition: in consonance with, for want of.\n" +
        "- A **phrasal verb** is a verb plus a small word that changes its meaning: dispense with (do without), keep pace with (move at the same rate).\n" +
        "- Replace the whole underlined phrase with each option, and read the sentence again.",
      table: {
        columns: ["Phrase", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["in consonance with", "in agreement with", "in harmony with", "2017 (II)"] },
          { cells: ["for want of", "because something is missing", "for lack of", "2017 (II)"] },
          { cells: ["dispense with", "do without; end", "terminate", "2017 (II)"] },
          { cells: ["keep pace with", "move forward at the same rate as", "to move at the same speed as", "2017 (II)"] },
        ],
      },
      pyqExampleId: "7449aac6-e86b-4ce2-a1e8-169ba26af516",
      selfCheckExample: {
        prompt:
          "Choose the phrase nearest in meaning: The new principal will \\(\\underline{\\text{do away with}}\\) the old rules. (a) keep (b) abolish (c) write down (d) hide",
        steps: [
          "Do away with is a phrasal verb: it means get rid of.",
          "Keep is the opposite. Write down and hide leave the rules in place.",
          "Abolish keeps the meaning.",
        ],
        answer: "(b) abolish",
      },
      practiceSet: [
        {
          prompt: "Her work is \\(\\underline{\\text{in keeping with}}\\) the rules. (a) against (b) in line with (c) ahead of (d) apart from",
          answer: "(b) in line with",
        },
        {
          prompt: "Spot the wrong row: in consonance with = in harmony with; dispense with = keep; keep pace with = move at the same speed as.",
          answer: "dispense with = keep",
          method: "Dispense with means do without.",
        },
        {
          prompt: "He \\(\\underline{\\text{called off}}\\) the meeting. (a) postponed (b) cancelled (c) announced (d) led",
          answer: "(b) cancelled",
          method: "To call off is to cancel. Postponed means moved to a later time.",
        },
      ],
      traps: [
        {
          title: "The small word changes the meaning",
          body: "To **dispense** medicine is to give it out. To **dispense with** something is to do without it. Read the verb and its small word together.",
        },
        {
          title: "Close is not nearest",
          body: "**In consonance with** means **in harmony with**. In accordance with and in tune with are close, but harmony is what consonance means, so it is the nearest.",
        },
      ],
    },

    // C2 — idioms
    {
      kind: "reference" as const,
      slug: "cdsensyn-idioms",
      name: "Idioms: read the picture, not the words",
      intuition:
        "An idiom paints a picture. Read the picture, then ask what it means in a person's life. An option that takes the words literally is almost always the trap.",
      definition:
        "- **Die in harness**: a working horse wears a harness, so dying in harness means dying while still at work, before retirement.\n" +
        "- **Scapegoat**: in an old ritual a goat was sent away carrying the people's sins, so a scapegoat is blamed for others' faults.\n" +
        "- **Harbinger**: a messenger sent ahead to announce someone's coming; now, a sign of what is coming.",
      table: {
        columns: ["Idiom", "Meaning", "Nearest option", "Sitting"],
        rows: [
          { cells: ["died in harness", "died while still at work", "died before retirement", "2017 (II)"] },
          { cells: ["made a scapegoat for", "blamed for the faults of others", "blamed without reason for", "2017 (II)"] },
          { cells: ["harbinger", "a sign of what is coming", "advance messenger", "2022 (II)"] },
        ],
      },
      pyqExampleId: "3c1ec174-2e73-4a95-bd98-44986da50173",
      selfCheckExample: {
        prompt:
          "Choose the phrase nearest in meaning: Ravi was \\(\\underline{\\text{the black sheep}}\\) of his family. (a) the favourite (b) the one who brought shame (c) the eldest (d) the poorest",
        steps: [
          "Picture it: one black sheep in a white flock stands out for the wrong reason.",
          "So the black sheep of a family is the member the others are ashamed of.",
          "The favourite is the opposite; the eldest and the poorest take the words too far from the picture.",
        ],
        answer: "(b) the one who brought shame",
      },
      practiceSet: [
        {
          prompt: "The first cuckoo's song is a harbinger of spring. Harbinger means: (a) an enemy (b) a sign of what is coming (c) the end (d) a song",
          answer: "(b) a sign of what is coming",
        },
        {
          prompt: "To \\(\\underline{\\text{bury the hatchet}}\\) means: (a) to hide a weapon (b) to make peace (c) to dig a garden (d) to start a fight",
          answer: "(b) to make peace",
        },
        {
          prompt: "To make someone a scapegoat is to: (a) reward them (b) blame them for others' faults (c) send them on holiday (d) punish the guilty",
          answer: "(b) blame them for others' faults",
        },
      ],
      traps: [
        {
          title: "Blamed is not suspected",
          body: "A **scapegoat** is blamed without reason for what others did. **Suspected of causing** and **severely punished for** are near-misses: the idiom is about unfair blame, not suspicion or punishment.",
        },
        {
          title: "A harbinger comes before",
          body: "A **harbinger** is an **advance** messenger: it arrives before the thing it announces. An option about looking back (regressive) or an ancestor gets the direction wrong.",
        },
      ],
    },

    // C3 — when the options are definitions
    {
      kind: "formula" as const,
      slug: "cdsensyn-definitions",
      name: "When the options are definitions",
      intuition:
        "Sometimes the options are short definitions, not single words. Long options feel harder, but they give you more to check. Define the word yourself first, then look for the option that says the same thing.",
      definition:
        "The method:\n" +
        "- **Cover the options** and define the word in your own words.\n" +
        "- Find the option that matches your definition. Check **every part** of it, not just one word.\n" +
        "- Strike options that match only part of the meaning (too narrow) or add an idea the word does not have.\n" +
        "- Watch the **direction**: a long option can describe the opposite in many words.",
      authoredExample: {
        prompt:
          "Choose the option nearest in meaning: The speech was full of \\(\\underline{\\text{hyperbole}}\\). (a) exaggeration for effect (b) quiet humour (c) careful facts (d) repeated questions",
        steps: [
          "Define it first: hyperbole is saying more than the truth to make a point.",
          "Careful facts points the opposite way. Quiet humour and repeated questions are other styles of speech.",
          "Exaggeration for effect matches both parts of the definition: more than the truth, and to make a point.",
        ],
        answer: "(a) exaggeration for effect",
      },
      selfCheckExample: {
        prompt:
          "Choose the option nearest in meaning: The old man was known for his \\(\\underline{\\text{taciturn}}\\) nature. (a) talking a great deal (b) saying very little (c) losing his temper often (d) laughing at others",
        steps: [
          "Define it first: taciturn describes a person who seldom speaks.",
          "Talking a great deal is the opposite. Losing his temper and laughing at others are other habits.",
          "Saying very little matches the definition.",
        ],
        answer: "(b) saying very little",
      },
      practiceSet: [
        {
          prompt: "A \\(\\underline{\\text{philanthropist}}\\) is: (a) one who collects stamps (b) one who gives money to help others (c) one who studies plants (d) one who hates people",
          answer: "(b) one who gives money to help others",
          method: "phil (love) + anthrop (human being).",
        },
        {
          prompt: "An \\(\\underline{\\text{ambiguous}}\\) reply is one that: (a) has more than one possible meaning (b) is very short (c) is rude (d) comes late",
          answer: "(a) has more than one possible meaning",
        },
        {
          prompt: "\\(\\underline{\\text{Ostentatious}}\\) means: (a) showing off wealth to impress (b) quietly rich (c) poor but proud (d) generous in secret",
          answer: "(a) showing off wealth to impress",
          method: "Options (b) and (d) describe the opposite: wealth kept quiet.",
        },
      ],
      pyqExampleId: "044d078d-0012-445a-b8af-0dffe5615da0",
      traps: [
        {
          title: "Too narrow is still wrong",
          body: "An option can be true of the word but cover only part of it. Greed for money is part of **pleonexia**; greed to grab everything for oneself is the whole of it. Choose the option that covers the full meaning.",
        },
        {
          title: "Every part of the option must fit",
          body: "**Effusive** praise is warm **and** strong. An option that keeps the approval but makes it calm (dispassionate, tranquil) gets only half right, and half right is wrong.",
        },
        {
          title: "Do not pick the opposite in long words",
          body: "A business that **floundered** struggled. 'Glided through' and 'floated through' sound gentle and sensible, but they describe the opposite. Check the direction of a long option as you would a short one.",
        },
      ],
    },
  ],
};
