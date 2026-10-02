import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_PHRASAL_NOTE: SubtopicNote = {
  subtopicName: "Phrasal Verbs with Prepositions and Particles",
  title: "Phrasal verbs",
  oneLineDefinition:
    "A phrasal verb is a verb plus one or two small words (put out, get over, fall out with) that together have a new meaning. Change the small word and the meaning changes.",
  whyItMatters:
    "CDS papers often give four options built on the same verb (put in, put out, put on, put off) and ask which one fits. " +
    "You cannot guess these from the verb alone. Learn the meanings below, and use the particle as a clue when you meet a new one.",
  concepts: [
    // C1 — people phrasal verbs
    {
      kind: "reference" as const,
      slug: "cdsenprep-phrasal-people",
      name: "Phrasal verbs for meeting, getting on and enduring",
      intuition:
        "Many phrasal verbs describe how we deal with people: we **call on** them, **run into** them, **get along with** them, **fall out with** them, and sometimes we just **put up with** them. Learn them as a small story of a friendship.",
      definition:
        "The terms:\n" +
        "- **Phrasal verb**: a verb + a particle, sometimes + a preposition, with one meaning (get over = recover from).\n" +
        "- **Particle**: the small word after the verb (up, out, off, on, in). It looks like a preposition but works with the verb.\n" +
        "The method:\n" +
        "- Read the sentence and say its meaning in plain words (they quarrelled, he recovered, I met him by chance).\n" +
        "- Match that plain meaning to the phrasal verb from the table.\n" +
        "- Check the full form: some need a third word (put up **with**, keep up **with**, fall out **with**).",
      table: {
        columns: ["Phrasal verb", "Meaning", "Sitting"],
        rows: [
          {
            cells: ["**call on** a person", "visit someone, often formally", "2018 (II), 2020 (I)"],
            noteAmber: "call at a place (call at the office); call on a person.",
          },
          { cells: ["**run into** someone", "meet by chance", "2020 (I)"] },
          { cells: ["**fall out with** someone", "quarrel and stop being friends", "2026 (I)"] },
          { cells: ["**get along with** someone", "have a friendly relationship", "2018 (II)"] },
          { cells: ["**put up with** something", "tolerate, bear", "2017 (II)"] },
          { cells: ["**get over** a shock", "recover from", "2018 (I)"] },
          { cells: ["**keep up with** someone", "move or progress at the same speed", "2021 (I)"] },
        ],
        caption: "The third word (with) is part of the phrasal verb: do not leave it out.",
      },
      pyqExampleId: "e367077b-67ba-4d25-98cf-4e321daa240e",
      selfCheckExample: {
        prompt:
          "I have to ______ my little brother while my parents are away. (a) look into (b) look after (c) look up (d) look over",
        steps: [
          "Plain meaning: take care of him.",
          "look into = investigate; look up = search for information; look over = examine quickly.",
          "look after = take care of.",
        ],
        answer: "(b) look after.",
      },
      practiceSet: [
        { prompt: "Which phrasal verb means 'resemble an older relative'? (take after / take over)", answer: "take after", method: "She takes after her mother." },
        { prompt: "Which phrasal verb means 'find by chance'? (come across / come over)", answer: "come across" },
        { prompt: "Which phrasal verb means 'admire and respect'? (look up to / look down on)", answer: "look up to" },
        { prompt: "Which phrasal verb means 'raise a child'? (bring up / bring about)", answer: "bring up" },
      ],
      traps: [
        {
          title: "Call on a person, call at a place",
          body:
            "**call on** the Prime Minister (visit a person). **call at** the office (stop at a place). **call off** = cancel. **call in** = ask someone to come. **call up** = phone.",
        },
        {
          title: "Get over, not get through, for a shock",
          body:
            "**get over** = recover from (a shock, an illness, a loss). **get through** = finish or survive a difficult time. **get by** = manage with little. **get off** = leave a bus or train.",
        },
        {
          title: "Keep up with, not keep up to",
          body:
            "**keep up with** someone = move at their speed. 'Keep up to' is not this phrasal verb. Check that the option and the printed with join to make the full phrase.",
        },
      ],
    },

    // C2 — read the particle
    {
      kind: "formula" as const,
      slug: "cdsenprep-phrasal-particle",
      name: "Read the particle: on, off, out, about",
      intuition:
        "When all four options share one verb (went on, went off, went about, went around), the particle decides. Each particle has a usual sense. Fit that sense to the sentence and the right option often stands out.",
      definition:
        "The usual sense of each particle:\n" +
        "- **on** = start, connect, continue: turn on the light, carry on.\n" +
        "- **off** = stop, leave, go away, explode: call off, take off, the gun went off, the rain kept off.\n" +
        "- **out** = finish, end, remove, until nothing is left: put out a fire, run out of time.\n" +
        "- **about** = happen, come into being: how did it come about?\n" +
        "- **away** = disappear, scatter: the clouds clear away.\n" +
        "- **up** = finish completely or increase: use up, speed up.\n" +
        "The method:\n" +
        "- Say what the sentence needs in plain words (stop the fire, switch on the light, it happened).\n" +
        "- Pick the particle whose usual sense matches.\n" +
        "- Check the context: a dark room needs light on, not off.\n" +
        "Phrasal verbs tested this way:\n" +
        "- **put out** the fire = extinguish (2020 I)\n" +
        "- **turn on** the light = switch on (2021 I)\n" +
        "- the gun **went off** = fired (2021 II)\n" +
        "- the clouds of suspicion will **clear away** = disappear (2017 II)\n" +
        "- the rain will **keep off** = stay away, not fall (2018 I)\n" +
        "- how the accident **came about** = happened (2020 I)\n" +
        "- **running out of** time = having little left (2020 I)",
      authoredExample: {
        prompt:
          "The meeting was ______ because the chairman fell ill. (a) called on (b) called off (c) called up (d) called in",
        steps: [
          "Plain meaning: the meeting did not take place; it was cancelled.",
          "off = stop, cancel. on = start or visit; up = phone; in = ask someone to come.",
          "Called off = cancelled.",
        ],
        answer: "(b) called off.",
      },
      selfCheckExample: {
        prompt:
          "The plane ______ on time in spite of the bad weather. (a) took on (b) took off (c) took out (d) took up",
        steps: [
          "Plain meaning: the plane left the ground.",
          "off = leave, go away from a surface.",
          "took on = accepted (work); took out = removed; took up = started (a hobby).",
        ],
        answer: "(b) took off.",
      },
      practiceSet: [
        { prompt: "Don't stop. ______ with your work. (Carry on / Carry off)", answer: "Carry on", method: "on = continue" },
        { prompt: "We ______ for Shimla early in the morning. (set off / set up)", answer: "set off", method: "off = leave, start a journey" },
        { prompt: "The secret soon ______ and everyone knew. (got out / got off)", answer: "got out", method: "out = became known" },
        { prompt: "The bomb ______ in the empty market. (went off / went out)", answer: "went off", method: "off = explode; go out is used for a light or a fire" },
      ],
      pyqExampleId: "4d8774f7-ff0f-4979-814e-c0a61ed132c1",
      traps: [
        {
          title: "Check the context before choosing on or off",
          body:
            "'The room is a bit dark. Could you turn ___ the light?' The answer is **on**. Students who see 'turn off the light' every night pick off by habit. Ask what the sentence needs.",
        },
        {
          title: "Keep off is not put off",
          body:
            "**The rain keeps off** = it does not fall. **put off** = postpone (put off the picnic); it needs an object. If the subject is the rain itself, put off cannot fit.",
        },
        {
          title: "Come about, come off, come out",
          body:
            "**come about** = happen (how did it come about?). **come off** = succeed, or become detached. **come out** = appear, become known. 'How the accident ___' asks how it happened: came about.",
        },
        {
          title: "Running out of needs the -ing and the of",
          body:
            "'The group was ___ of time' needs **running out**: was + -ing for the continuous, and the printed of completes run out of. 'Run out' alone breaks the tense.",
        },
      ],
    },

    // C3 — effort, duty, avoidance
    {
      kind: "reference" as const,
      slug: "cdsenprep-phrasal-effort",
      name: "Phrasal verbs for effort, duty and avoidance",
      intuition:
        "A second family of phrasal verbs is about work and duty: you **put in** effort, **carry through on** a promise, **make up for** a loss, **fall back on** help. Others describe avoiding something: you **keep off** a topic or **shy away from** a task.",
      definition:
        "The rules:\n" +
        "- Learn each verb with all its words: make up **for**, fall back **on**, shy away **from**, carry through **on**.\n" +
        "- Many look alike but mean different things: carry out (do a task) vs carry through on (keep a promise); keep off (avoid) vs keep out (stay outside).\n" +
        "- Check the word after the blank: if the sentence already prints for, on or from, the option must join it to make the full verb.",
      table: {
        columns: ["Phrasal verb", "Meaning", "Sitting"],
        rows: [
          {
            cells: ["**carry through on** a promise", "keep a promise, do what you said", "2020 (I)"],
            noteAmber: "carry out a task, a plan or an order. When the printed word after the blank is on, carry through is the one that joins it.",
          },
          { cells: ["**put in** years of service", "spend time or effort on work", "2020 (I)"] },
          { cells: ["**keep off** a subject", "avoid talking about it", "2020 (I)"] },
          { cells: ["**shy away from**", "avoid because of fear or doubt", "2021 (II)"] },
          { cells: ["**make up for** lost time", "compensate for", "2022 (I)"] },
          { cells: ["**fall back on**", "rely on in a time of difficulty", "2025 (I)"] },
        ],
        caption: "Each verb is learnt with its full set of words.",
      },
      pyqExampleId: "efeef0c0-a52b-4467-b995-6116cd1c9336",
      selfCheckExample: {
        prompt: "She decided to ______ smoking for good. (a) give in (b) give out (c) give up (d) give away",
        steps: [
          "Plain meaning: stop doing a habit.",
          "give in = surrender; give out = distribute or stop working; give away = give free or reveal.",
          "give up = stop a habit.",
        ],
        answer: "(c) give up.",
      },
      practiceSet: [
        { prompt: "Don't ______ your homework till tomorrow. (put off / put out)", answer: "put off", method: "postpone" },
        { prompt: "A good officer ______ his orders without delay. (carries out / carries off)", answer: "carries out", method: "perform a task or order" },
        { prompt: "The enemy finally ______ and surrendered. (gave in / gave off)", answer: "gave in" },
        { prompt: "The police will ______ the complaint. (look into / look after)", answer: "look into", method: "investigate" },
      ],
      traps: [
        {
          title: "Carry out a task, carry through on a promise",
          body:
            "**carry out** = do or perform (carry out an order, a plan). **carry through on** = keep a promise to the end. **carry off** = win or manage something hard. Let the printed on decide.",
        },
        {
          title: "Keep off, not keep out, for a topic",
          body:
            "**keep off** politics = avoid the subject. **keep out** = stay outside (keep out of the room). **keep on** = continue.",
        },
        {
          title: "Shy away from needs both words",
          body:
            "The full verb is **shy away from**. An option with only 'in', 'with' or 'upon' cannot make it.",
        },
      ],
    },
  ],
};
