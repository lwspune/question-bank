import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_LINKERS_NOTE: SubtopicNote = {
  subtopicName: "Linkers in Paragraphs",
  title: "Linkers: but and however turn; also, so and therefore carry on",
  oneLineDefinition:
    "A linker at the start of a sentence says how it relates to the sentence before: a turn (but, however) or a carry-on (also, moreover, so, therefore). Find the sentence it relates to.",
  whyItMatters:
    "A linker is a signpost the examiner leaves in the sentence. Once you know what kind of sentence it needs before it, many options fall away at once. " +
    "The commonest mistake is to treat all linkers alike: a turn word needs the opposite idea before it, a result word needs the cause, and 'also' needs a first point of the same kind.",
  concepts: [
    // C1 — turn linkers
    {
      kind: "formula" as const,
      slug: "cdsenps-turn-linkers",
      name: "A turn word needs the opposite idea just before it",
      intuition:
        "'But the bridge held.' You expect, just before, something that made you think it would not hold. A turn word changes direction, so the sentence before it must point the other way.",
      definition:
        "The terms:\n" +
        "- **Linker**: a word or phrase that joins a sentence to the one before and shows how they relate.\n" +
        "- **Turn linker**: a linker that sets a sentence against the one before: but, however, yet, still, nevertheless, even so, on the other hand, in spite of that.\n" +
        "The method:\n" +
        "- When P, Q, R or S starts with a turn linker, say in your own words what it turns **from**.\n" +
        "- Find the sentence that gives that opposite idea. Put it just before.\n" +
        "- 'On the other hand' needs a first side stated just before; 'Still' and 'Nevertheless' need a difficulty or a reason to stop.\n" +
        "- A turn sentence cannot come straight after S1 unless S1 itself gives the idea it turns from.",
      authoredExample: {
        prompt:
          "S1: Rahul had trained for the 10 km race for six months.\n" +
          "P: However, on the morning of the race he woke with a fever.\n" +
          "Q: He was confident of finishing in the top ten.\n" +
          "R: Still, he decided to run.\n" +
          "S: He finished twenty-third, well behind his usual time.\n" +
          "S6: Even so, his coach called it the bravest run of the day.\n" +
          "(a) QPRS (b) PQRS (c) QRPS (d) PRSQ",
        steps: [
          "R starts with 'Still': it needs a difficulty just before it. The difficulty is the fever in P. So P comes just before R. (c) fails.",
          "P starts with 'However': it turns from a hopeful point. The hopeful point is Q (he was confident). So Q comes before P.",
          "(b) and (d) put P before Q. In both, the confident sentence comes after the fever, or after the result, where it no longer fits. Both fail.",
          "Read (a): Q (confident), P (however, fever), R (still, he ran), S (the result), S6.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: The new bridge was meant to cut the journey to town by an hour.\n" +
          "P: Yet for the first year, traffic jams at its far end wiped out most of the time saved.\n" +
          "Q: It was opened in May, three months ahead of schedule.\n" +
          "R: The town then widened the road at that end.\n" +
          "S: Now the journey really does take an hour less.\n" +
          "S6: The bridge has finally done what it was built for.\n" +
          "(a) PQRS (b) QPRS (c) QRPS (d) RQPS",
        steps: [
          "P starts with 'Yet': it needs a good point just before. Q (opened three months early) is that good point. So Q comes just before P.",
          "(a) puts P first and the opening (Q) after the traffic jams. A bridge cannot jam before it opens, so (a) fails.",
          "R says 'that end'. It needs P's far end, and R's road widening is the answer to P's jams. So P comes before R. (c) and (d) fail.",
          "Read (b): Q, P, R, S, S6.",
        ],
        answer: "(b) QPRS",
      },
      practiceSet: [
        {
          prompt: "'But the rescue team reached them in time.' What kind of sentence must come before it?",
          answer: "Bad news: the people were in danger.",
          method: "'But' turns from danger to rescue.",
        },
        {
          prompt: "Fill in: 'The plan was cheap. ___, it was slow.' (Moreover / However)",
          answer: "However",
          method: "Cheap is good, slow is bad: the second sentence turns.",
        },
        {
          prompt:
            "Spot the wrong order: 'Nevertheless, the match went ahead. The ground was dry and the sky was clear.'",
          answer: "Wrong. 'Nevertheless' needs a problem before it, such as a storm warning.",
          method: "A dry ground and a clear sky give it nothing to turn from.",
        },
        {
          prompt: "A sentence begins 'On the other hand, city schools...'. What must the sentence before it be about?",
          answer: "Schools somewhere else, such as village schools.",
          method: "'On the other hand' sets a second side against a first side just stated.",
        },
      ],
      pyqExampleId: "faee56d9-0cb7-4444-93d8-170f3d8e5713",
      traps: [
        {
          title: "A turn word in first place",
          body:
            "A sentence starting with 'But' or 'However' cannot sit right after S1 unless S1 gives the idea it turns from. Options that open with such a sentence are often the first to strike.",
        },
        {
          title: "Turning from the wrong sentence",
          body:
            "'Still, he decided to run' turns from a reason **not** to run. If the sentence before it gives a reason to run, the turn makes no sense, however smooth it sounds.",
        },
        {
          title: "Reading 'still' as 'even now'",
          body:
            "At the start of a sentence, followed by a comma, 'Still' means 'in spite of that'. It is a turn word and needs a difficulty before it. Inside a sentence ('he is still there') it means 'even now' and points at nothing.",
        },
      ],
    },

    // C2 — carry-on linkers (reference)
    {
      kind: "reference" as const,
      slug: "cdsenps-carry-on-linkers",
      name: "Linkers that add, conclude or sum up",
      intuition:
        "Carry-on linkers keep the passage moving in the same direction. Some add a second point (also, moreover, in addition, besides, as well). Some draw a result (so, therefore, thus, hence, as a result). " +
        "Some say the same thing again (in other words). Each one tells you what must come before it.",
      definition:
        "The terms:\n" +
        "- **Adding linker**: brings in a second point of the same kind. It needs the first point before it.\n" +
        "- **Result linker**: draws a result or a conclusion. It needs the cause or the facts before it.\n" +
        "- **Restating linker**: says an idea again in other words. It needs that idea just before it.\n" +
        "How to use them:\n" +
        "- 'also' and 'as well' often sit inside the sentence ('They also...', '...as well'). They still mark a second point.\n" +
        "- A result sentence comes **after** its cause, never before it.\n" +
        "- When S6 starts with a carry-on linker, the fourth sentence must give what it needs.",
      table: {
        columns: ["Linker", "Job", "Needs just before it", "In the passage", "Sitting"],
        rows: [
          { cells: ["also", "Adds", "A first fact about the same subject", "They also provide a sense of order and predictability.", "2019 (II)"] },
          { cells: ["also", "Adds", "The first point of disagreement, and the questions 'such matters' refers to", "They also disagree about how such matters should be resolved ...", "2020 (II)"] },
          { cells: ["also", "Adds", "A first step taken by the same companies", "They have also adopted new management approaches ...", "2023 (I)"] },
          { cells: ["also", "Adds", "The scheme's main aim", "It also aims to spread insurance awareness among the rural population.", "2024 (I)"] },
          { cells: ["also", "Adds", "The biggest influence, named first", "Circadian rhythms are also affected by food intake, stress ...", "2026 (II)"] },
          { cells: ["as well", "Adds", "A first loss (the pond shrinking)", "... led to a rapid drop in the groundwater table as well.", "2026 (II)"] },
          { cells: ["In addition", "Adds", "Earlier points about idioms", "In addition, idioms often have a stronger meaning than non-idiomatic phrases.", "2019 (II)"] },
          { cells: ["Moreover", "Adds", "A first protection the law gives", "Moreover, the law protects me from robbery and violence.", "2018 (I)"] },
          { cells: ["Moreover", "Adds", "A first reason for his dislike", "Moreover, with his profound pedagogic sensitivity he could see the damaging effect of colonial education.", "2022 (II)"] },
          { cells: ["moreover", "Adds, and goes further", "A short-term harm named first", "Prolonged disruption, moreover, can cause long-term damages ...", "2026 (II)"] },
          { cells: ["Besides", "Adds one more", "Objections already listed", "Besides, with this kind of education, one could not appreciate the dignity of manual labour.", "2022 (II)"] },
          { cells: ["At the same time", "Adds a second point running alongside", "A first change in the same period", "At the same time there has been a significant reduction in product life cycles ...", "2023 (I)"] },
          { cells: ["At the same time", "Adds the reverse direction", "What institutions do to people", "At the same time, institutions themselves can be transformed by the politics they produce ...", "2019 (II)"] },
          { cells: ["In other words", "Restates", "The idea it says again", "In other words, you have to be the perfect teacher to create a new society ...", "2018 (II)"] },
          { cells: ["So", "Result", "The reason: he was in a hurry", "So he forgot to look to the left or right as he always did.", "2017 (I)"] },
          { cells: ["As a result of this", "Result", "The cause it names: his carelessness", "As a result of this carelessness, he met with an accident.", "2017 (I)"] },
          { cells: ["therefore", "Result: an action", "The problem that led to the action", "He therefore decided to go on a pilgrimage to India to collect further material.", "2017 (II)"] },
          { cells: ["Therefore", "Conclusion", "The general truth it draws a duty from", "Therefore you, who are the seeker of truth, have to be both the pupil and the teacher.", "2018 (II)"] },
          { cells: ["Thus", "Sums up", "The example it sums up", "Thus in disputes between man and man, right has taken the place of might.", "2018 (I)"] },
          { cells: ["Therefore", "Conclusion (in S6)", "The fact it concludes from", "Therefore, various schemes of PLI and RPLI are very popular amongst eligible clients.", "2024 (I)"] },
          { cells: ["Hence", "Conclusion", "The facts that lead to it", "Hence, land is of great significance for all nations.", "2025 (I)"] },
          { cells: ["therefore", "A further result", "The conclusion just drawn", "It is therefore an important asset that needs to be used with care ...", "2025 (I)"] },
          { cells: ["In consequence", "Sums up all the results", "All the points before it", "In consequence to all of these, careful planning of land use assumes the utmost significance.", "2025 (I)"] },
        ],
        caption: "Adding linkers need a first point; result linkers need the cause; restating linkers need the idea they repeat.",
      },
      pyqExampleId: "2aed8465-5866-4477-b053-6a99f545723b",
      selfCheckExample: {
        prompt:
          "S1: For two years, our village school had no science teacher.\n" +
          "P: As a result of both, not one student chose science in Class 11.\n" +
          "Q: Moreover, the laboratory had stayed locked all that time.\n" +
          "R: Last June, the district finally sent a teacher.\n" +
          "S6: Already, twelve students have chosen science for next year.\n" +
          "Order P, Q and R: (a) QPR (b) PQR (c) RPQ (d) PRQ",
        steps: [
          "Q's 'Moreover' adds a second problem. The first problem is in S1 (no teacher), so Q can follow S1.",
          "P's 'As a result of both' needs two causes before it: no teacher (S1) and the locked laboratory (Q). So Q comes before P. (b) and (d) fail.",
          "R (a teacher arrives) turns things round and leads into S6. (c) puts it first, before the problems are told, and fails.",
        ],
        answer: "(a) QPR",
      },
      practiceSet: [
        {
          prompt: "'In other words' needs what just before it?",
          answer: "An idea that the next sentence says again, more simply.",
        },
        {
          prompt: "Fill in: 'The road was narrow. ___, it had no street lights.' (Moreover / However)",
          answer: "Moreover",
          method: "A second problem of the same kind: an adding linker.",
        },
        {
          prompt: "Spot the wrong row: 'Thus' brings in a new point unrelated to what came before.",
          answer: "Wrong. 'Thus' draws a result or sums up what came before.",
        },
        {
          prompt: "S6 begins 'Besides, ...'. What must the fourth sentence give?",
          answer: "A point of the same kind (a reason or an objection) that S6 adds to.",
        },
      ],
      traps: [
        {
          title: "'Also' in the first point",
          body:
            "A sentence with 'also' or 'as well' adds a **second** point. It cannot be the first thing said about its subject. Find the first point and put it earlier.",
        },
        {
          title: "Result before cause",
          body:
            "'So', 'therefore', 'hence' and 'as a result' come after the cause. An option that puts the result sentence before the sentence that causes it fails, even if every other link is fine.",
        },
        {
          title: "Moreover is not however",
          body:
            "The two look alike but do opposite jobs. 'Moreover' adds a point that pulls the same way; 'however' turns. Read the sentence before and check which way it pulls.",
        },
      ],
    },
  ],
};
