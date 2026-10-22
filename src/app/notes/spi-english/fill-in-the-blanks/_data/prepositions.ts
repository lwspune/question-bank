import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_FB_PREPOSITIONS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions",
  title: "Prepositions",
  oneLineDefinition:
    "A preposition gap is decided by what the small word must show (place, movement, tool, doer or purpose) or by the word before it, which takes a fixed partner.",
  whyItMatters:
    "Ten questions in the bank, the largest group in this chapter: five EASY and five MODERATE. Half of them come from the sample paper's preposition set, and most hang on one fixed pair such as 'jump to' or 'success in'.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spifbpr-place",
      name: "Place and movement: at, in, into, on, above",
      intuition:
        "Prepositions of place answer 'where?'. Each one paints a different picture: at a point, in a space, on a surface, into a space you enter, above a level. " +
        "Picture the scene in the sentence, then pick the word that matches it.",
      definition:
        "The pictures:\n" +
        "- **at**: a point or a position. at the gate, at the front of a line, at the top.\n" +
        "- **in**: inside a space. in the room, in the box.\n" +
        "- **into**: moving from outside to inside. walked into the room, broke into the house.\n" +
        "- **on**: on a surface, and in some fixed phrases. on the table, on holiday, on a trip.\n" +
        "- **above** and **below**: higher or lower than a level. above sea level, below zero.",
      table: {
        columns: ["Preposition", "Shows", "Correct example"],
        rows: [
          { cells: ["at", "a point or position", "He waited at the gate."] },
          { cells: ["in", "inside a space", "The keys are in the drawer."] },
          { cells: ["into", "moving to the inside", "The cat ran into the kitchen."], noteAmber: "Use into, not in, after a verb of entering." },
          { cells: ["on", "a surface, or a fixed phrase", "The book is on the shelf. We went on a trip."] },
          { cells: ["above", "higher than a level", "The plane flew above the clouds."] },
          { cells: ["below", "lower than a level", "The water was below the danger mark."] },
        ],
        caption: "At the front of a queue is a position; in the front of a car is inside a space.",
      },
      pyqExampleId: "47fd48ce-b6b3-4caa-bea0-7c73f0704dae",
      selfCheckExample: {
        prompt: "Fill in the blank: The thief climbed ____ the house through an open window. (a) at (b) on (c) into (d) above",
        steps: [
          "The thief moved from outside to inside the house.",
          "Movement to the inside takes 'into'.",
        ],
        answer: "(c) into",
      },
      practiceSet: [
        { prompt: "Choose: 'The town is 900 metres (above / on) sea level.'", answer: "above" },
        { prompt: "Choose: 'She dived (in / into) the pool.'", answer: "into" },
        { prompt: "Choose: 'Wait for me (at / in) the bus stop.'", answer: "at" },
        { prompt: "Choose: 'They are away (on / in) a school trip.'", answer: "on" },
      ],
      traps: [
        {
          title: "In is a place, into is a movement",
          body:
            "'He is in the room' tells where he is. 'He walked into the room' tells how he got there. A verb of entering needs into.",
        },
        {
          title: "Above a level, not on it",
          body:
            "Temperature, height and marks are measured against a level, so use above or below: 'above zero', 'below the average'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spifbpr-with-by",
      name: "With for the tool, by for the doer, to for the purpose",
      intuition:
        "Three prepositions do jobs that are easy to mix up. 'By' names who did something; 'with' names what it was done with. " +
        "'To' before a verb gives the reason or purpose: why someone came or went.",
      definition:
        "The jobs:\n" +
        "- **by** the doer: 'The letter was written by my sister.'\n" +
        "- **with** the tool: 'She cut the cake with a knife.'\n" +
        "- **to** + verb for a purpose: 'He came to see me.'\n" +
        "- **by** in some fixed phrases: by heart, by mistake, by bus, live by a rule (follow it as the guide of one's life).",
      table: {
        columns: ["Job", "Preposition", "Correct example"],
        rows: [
          { cells: ["who did it", "by", "The wall was painted by Ravi."] },
          { cells: ["what it was done with", "with", "He painted it with a brush."], noteAmber: "Not 'by a brush'." },
          { cells: ["why, before a verb", "to", "She went out to buy milk."] },
          { cells: ["a way of travelling", "by", "We came by train."] },
          { cells: ["the rule a life follows", "live by", "He lives by his principles."] },
        ],
        caption: "A sentence can carry both: 'The tree was cut down by the woodcutter with an axe.'",
      },
      pyqExampleId: "3e5e1a60-893b-40f1-aa06-5e278679ff8b",
      selfCheckExample: {
        prompt: "Fill in the blank: The old door was opened by the guard ____ a rusty key. (a) by (b) with (c) to (d) for",
        steps: [
          "'By the guard' already names the doer.",
          "The key is the tool, and a tool takes 'with'.",
        ],
        answer: "(b) with",
      },
      practiceSet: [
        { prompt: "Choose: 'She wrote the note (by / with) a pencil.'", answer: "with" },
        { prompt: "Choose: 'The poem was written (by / with) Tagore.'", answer: "by" },
        { prompt: "Choose: 'I went to the shop (to / for) buy bread.'", answer: "to", method: "A purpose before a verb takes 'to'." },
        { prompt: "Choose: 'A soldier lives (by / with) his oath.'", answer: "by" },
      ],
      traps: [
        {
          title: "By the person, with the thing",
          body:
            "'The window was broken by a stone' is weak: the stone is the tool. Write 'broken with a stone' or 'broken by a boy with a stone'.",
        },
        {
          title: "For a purpose before a verb is wrong",
          body:
            "'He came for meeting me' and 'He came for meet me' are both wrong. Before a verb, a purpose takes 'to': 'He came to meet me.'",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spifbpr-after-word",
      name: "The preposition a word takes",
      intuition:
        "Many words come with their own preposition, and the meaning cannot tell you which one. You jump to a conclusion, you succeed in a task. " +
        "Learn the word and its partner together, the way you learn a spelling.",
      definition:
        "Pairs to know:\n" +
        "- **jump to** a conclusion: decide too quickly.\n" +
        "- **success in** doing something; **succeed in** doing it.\n" +
        "- **anxious for** someone's safety (wanting it), **anxious about** a result (worried).\n" +
        "- **intrude into** a place, **intrude on** someone's time or privacy.\n" +
        "- **congratulate on** a success, **good at** a subject, **interested in** a hobby.",
      table: {
        columns: ["Word", "Partner", "Correct example"],
        rows: [
          { cells: ["jump", "to (a conclusion)", "Hear both sides before you jump to conclusions."] },
          { cells: ["success, succeed", "in", "She succeeded in passing the test."] },
          { cells: ["anxious (wanting safety)", "for", "We were anxious for news of the climbers."] },
          { cells: ["anxious (worried)", "about", "He is anxious about his marks."] },
          { cells: ["intrude (a place)", "into", "Do not intrude into the office."] },
          { cells: ["intrude (time or privacy)", "on", "I am sorry to intrude on your evening."] },
          { cells: ["congratulate", "on", "We congratulated her on her win."] },
          { cells: ["good", "at", "He is good at chess."] },
          { cells: ["interested", "in", "She is interested in music."] },
        ],
        caption: "If two prepositions look possible, the meaning in the sentence picks between them, as with anxious for and anxious about.",
      },
      pyqExampleId: "d477ec3f-1575-4367-8c7b-a194704487b5",
      selfCheckExample: {
        prompt: "Fill in the blank: The coach congratulated the team ____ their victory. (a) for (b) at (c) on (d) about",
        steps: ["'Congratulate' takes 'on' before the success.", "The team was congratulated on their victory."],
        answer: "(c) on",
      },
      practiceSet: [
        { prompt: "Choose: 'She succeeded (in / at) climbing the hill.'", answer: "in" },
        { prompt: "Choose: 'My brother is good (in / at) drawing.'", answer: "at" },
        { prompt: "Choose: 'Are you interested (in / on) cricket?'", answer: "in" },
        { prompt: "Choose: 'Sorry to intrude (into / on) your free time.'", answer: "on" },
      ],
      traps: [
        {
          title: "Congratulate on, not for",
          body:
            "'Congratulated for their win' is common but wrong in exam English. The partner is 'on': 'congratulated on their win'.",
        },
        {
          title: "Success takes in before an -ing word",
          body:
            "Write 'success in finding the way', not 'success of finding' or 'success on finding'. The same goes for 'succeed in'.",
        },
      ],
    },
  ],
};
