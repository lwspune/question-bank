import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCB_PAIRS_CORE_NOTE: SubtopicNote = {
  subtopicName: "Sentence Pairs: Confirm, Contrast, Contradict, Qualify",
  title: "Sentence pairs: confirm, contrast, contradict or qualify",
  oneLineDefinition:
    "Two sentences, S1 and S2, are given. You decide how the second relates to the first: it confirms it, contrasts with it, contradicts it, or qualifies it.",
  whyItMatters:
    "Recent CDS papers include a block of these sentence-pair items, with no passage to read. Each takes seconds once you ask the right questions in the right order. " +
    "Without that order, contrast and contradiction blur into 'opposite', and qualify and contradict blur into 'disagrees'.",
  concepts: [
    // C1 — the both-true test: contradict vs contrast
    {
      kind: "formula" as const,
      slug: "cdsenrcb-both-true-test",
      name: "Contradict or contrast: can both be true?",
      intuition:
        "Contradict and contrast both feel like 'opposite'. One question separates them: can both sentences be true at the same time? " +
        "If not, S2 contradicts S1. If yes, and they are about different things set side by side, S2 contrasts with S1.",
      definition:
        "The terms:\n" +
        "- **Contradict / negate**: S2 makes S1 false. Both cannot be true.\n" +
        "- **Contrast**: S2 sets a different case beside S1. Both can be true.\n" +
        "The method for every pair, in this order:\n" +
        "- Name the subject of each sentence. Same person or thing, or different ones?\n" +
        "- Ask: can both be true at the same moment?\n" +
        "- No: S2 **contradicts** S1. Typical signs: never against did; all against some do not; the tallest against a taller one; an expected effect against the opposite result.\n" +
        "- Yes, and different subjects (two people, two places, two approaches): S2 **contrasts** with S1.\n" +
        "- Yes, and the same subject: go on to qualify or confirm (the next two concepts).\n" +
        "- Ignore how strongly the two sentences feel opposite. Only the both-true test decides.",
      authoredExample: {
        prompt:
          "S1: No student in the class passed the swimming test. S2: Anjali, a student in the class, passed the swimming test. The second sentence (a) contradicts the first (b) contrasts with the first (c) confirms the first (d) qualifies the first",
        steps: [
          "Subject: the students of one class, in both sentences.",
          "Can both be true? If Anjali passed, it is false that no student passed. No.",
          "Both cannot be true, so S2 contradicts S1.",
        ],
        answer: "(a) contradicts the first",
      },
      selfCheckExample: {
        prompt:
          "S1: Kerala gets heavy rain in June. S2: Western Rajasthan stays dry in June. The second sentence (a) contradicts the first (b) contrasts with the first (c) confirms the first (d) qualifies the first",
        steps: [
          "Subjects: two different places.",
          "Can both be true? Yes. Rain in one place says nothing about the other.",
          "Both true, different subjects: contrast.",
        ],
        answer: "(b) contrasts with the first",
      },
      practiceSet: [
        { prompt: "S1: Lions hunt mostly at night. S2: Eagles hunt by day.", answer: "contrasts", method: "Different subjects; both can be true." },
        { prompt: "S1: The Ganga is the longest river in India. S2: The Godavari is longer than the Ganga.", answer: "contradicts", method: "If S2 is true, S1 is false." },
        { prompt: "S1: The shop is open every single day of the year. S2: The shop was shut on Diwali.", answer: "contradicts", method: "'every single day' falls to one closed day." },
        { prompt: "S1: The old fort is built of stone. S2: The new barracks are built of steel and glass.", answer: "contrasts", method: "Two buildings side by side; both stand." },
      ],
      pyqExampleId: "46919c0f-ca94-4b63-8b25-a4daca0bae7d", // 2026 (II) Q93
      traps: [
        {
          title: "Feeling opposite is not contradiction",
          body:
            "Hot Delhi and cold Shimla feel opposite, but both can be true, so the answer is **contrast**. Contradiction needs S2 to make S1 false.",
        },
        {
          title: "An expected effect, then the opposite result",
          body:
            "S1: the medicine was supposed to lower the fever. S2: the temperature kept rising. S2 cancels the expected effect, so it **negates** (contradicts) the first. It is not a contrast, because there is only one subject.",
        },
        {
          title: "New names for the same relation",
          body:
            "**Negates** means contradicts; **affirms** means confirms. An option like **quantifies** names something S2 does not do (give a number or amount); cut it.",
        },
      ],
    },

    // C2 — qualify
    {
      kind: "formula" as const,
      slug: "cdsenrcb-qualify",
      name: "Qualify: S2 limits S1 without denying it",
      intuition:
        "To qualify a claim is to narrow it: keep it, but add a limit, an exception or a weak point. S1 is still mostly true after S2. " +
        "Watch for however, but, though, except, only, slightly, could be better.",
      definition:
        "The terms:\n" +
        "- **Qualify**: S2 accepts S1 but limits its reach with an exception, a condition or a shortcoming.\n" +
        "The method:\n" +
        "- Run the both-true test first. If both can be true and S2 is about the SAME subject, ask: does S2 narrow S1?\n" +
        "- Signs: however, but, though, except, only, slightly, in some cases, a drawback, a group for whom S1 does not hold.\n" +
        "- S1 hedged (usually, many, most, generally) plus an exception in S2: **qualifies**. A hedged claim allows exceptions, so it survives.\n" +
        "- S1 absolute (all, every, never, no) plus a counter-case in S2: **contradicts**. An absolute claim does not survive one exception.\n" +
        "- Praise in S1 plus a weak point of the same thing in S2: **qualifies**.",
      authoredExample: {
        prompt:
          "S1: The new rifle is accurate at long range. S2: Its weight, though, tires soldiers on long marches. The second sentence (a) contradicts the first (b) contrasts with the first (c) confirms the first (d) qualifies the first",
        steps: [
          "Subject: the same rifle in both sentences.",
          "Can both be true? Yes. A rifle can be accurate and heavy.",
          "Does S2 narrow S1? Yes: it adds a drawback to the praise, signalled by 'though'.",
          "Same subject, both true, a limit: qualify.",
        ],
        answer: "(d) qualifies the first",
      },
      selfCheckExample: {
        prompt:
          "S1: Exercise strengthens the heart. S2: Too much exercise without rest can strain it. The second sentence (a) contradicts the first (b) contrasts with the first (c) confirms the first (d) qualifies the first",
        steps: [
          "Same subject: exercise and the heart.",
          "Both can be true: exercise helps, too much of it can harm.",
          "S2 adds a condition (too much, without rest), so it limits S1.",
        ],
        answer: "(d) qualifies the first",
      },
      practiceSet: [
        { prompt: "S1: The hotel's rooms are spacious. S2: The rooms facing the road are noisy, though.", answer: "qualifies", method: "Same hotel; a drawback for some rooms." },
        { prompt: "S1: All the trains reached on time today. S2: The Rajdhani was two hours late today.", answer: "contradicts", method: "An absolute claim falls to one counter-case." },
        { prompt: "S1: Solar panels cut electricity bills. S2: But they work poorly on cloudy days.", answer: "qualifies", method: "A condition under which S1 holds less." },
        { prompt: "S1: The river here is usually calm. S2: After heavy rain it can turn violent.", answer: "qualifies", method: "A hedged claim plus an exception." },
      ],
      pyqExampleId: "b22c5de4-09e3-437d-ab6d-c317d34637f8", // 2026 (II) Q91
      traps: [
        {
          title: "'However' does not mean contradict",
          body:
            "Most qualifying sentences start with however or but. That word only signals a turn. Ask whether S1 survives. If it does, the answer is **qualifies**.",
        },
        {
          title: "Hedged claim or absolute claim?",
          body:
            "Read the strength word in S1. 'Usually', 'many', 'most' leave room for an exception, so an exception qualifies. 'All', 'every', 'never' leave no room, so a counter-case contradicts.",
        },
        {
          title: "Qualify or contrast?",
          body:
            "If S2 talks about the same subject and narrows it, it qualifies. If S2 brings in a different subject, it contrasts.",
        },
      ],
    },

    // C3 — confirm
    {
      kind: "formula" as const,
      slug: "cdsenrcb-confirm",
      name: "Confirm: S2 is evidence for S1",
      intuition:
        "S2 confirms S1 when it backs it up: a study, a result, an example, or the same message in other words. " +
        "After reading S2, you believe S1 more.",
      definition:
        "The terms:\n" +
        "- **Confirm / affirm**: S2 supports S1 as evidence, as an example, or by saying the same thing.\n" +
        "The method:\n" +
        "- Both can be true and the subject is the same. Ask: does S2 make S1 more believable?\n" +
        "- Evidence signs: research, a study, figures, a result that follows from the claim (an award after a fine performance).\n" +
        "- Two sayings with the same message confirm each other.\n" +
        "- If S2 only adds a separate fact on the same topic, it does not confirm.\n" +
        "- If S2 supports S1 but also narrows it, it qualifies instead.",
      authoredExample: {
        prompt:
          "S1: The new training plan has improved the battalion's fitness. S2: The battalion's average run time has fallen by two minutes since the plan began. The second sentence (a) contradicts the first (b) contrasts with the first (c) confirms the first (d) qualifies the first",
        steps: [
          "Same subject: the battalion's fitness under the plan.",
          "Both can be true, and nothing is limited.",
          "A faster run time is evidence of better fitness, so S2 makes S1 more believable.",
        ],
        answer: "(c) confirms the first",
      },
      selfCheckExample: {
        prompt:
          "S1: Look before you leap. S2: Better safe than sorry. The second sentence (a) contradicts the first (b) contrasts with the first (c) confirms the first (d) qualifies the first",
        steps: [
          "Both sayings advise care before acting.",
          "Same message in other words, so S2 backs S1.",
        ],
        answer: "(c) confirms the first",
      },
      practiceSet: [
        { prompt: "S1: Neha is a strong swimmer. S2: She won the state 400-metre race.", answer: "confirms", method: "The win is evidence." },
        { prompt: "S1: Green tea is good for health. S2: Green tea is grown in Assam.", answer: "does not confirm", method: "A separate fact on the same topic." },
        { prompt: "S1: Smoking harms the lungs. S2: Doctors find damaged lungs in most heavy smokers.", answer: "confirms", method: "Medical evidence for the claim." },
        { prompt: "S1: The film was a hit. S2: It was a hit in cities but failed in villages.", answer: "qualifies", method: "It supports and narrows at once." },
      ],
      pyqExampleId: "723820a8-e5e4-4d45-b326-31fb2ba41a26", // 2026 (II) Q94
      traps: [
        {
          title: "Same topic is not confirmation",
          body:
            "S2 must make S1 more believable. A fact that is merely about the same thing, such as where a crop is grown, does not confirm a claim about its health value.",
        },
        {
          title: "Support with a limit",
          body:
            "If S2 backs S1 for some cases and not others, it qualifies. Confirm needs support with no 'but'.",
        },
      ],
    },
  ],
};
