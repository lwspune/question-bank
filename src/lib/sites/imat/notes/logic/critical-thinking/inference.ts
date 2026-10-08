import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_INFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Drawing Conclusions",
  title: "Drawing a Conclusion That Follows",
  oneLineDefinition:
    "A conclusion follows from a passage when the passage alone supports it, at exactly the strength the passage allows.",
  whyItMatters:
    "Which statement can be drawn as a conclusion is the most common question in the chapter, asked 27 times from 2011 to 2023, and it is one of the two ministry questions (2023). The right option is usually modest; the wrong ones go one step beyond the passage.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-crt-quantifiers",
      name: "Quantifiers and the strength of a claim: all, most, some, may",
      intuition:
        "Many wrong options state the right idea with one word too strong: 'most' becomes 'all', 'may' becomes 'will', 'is linked to' becomes 'causes'. Before judging what a claim says, judge how much it says. A claim that is stronger than its evidence does not follow, even when it points the right way.",
      definition:
        "Read the size of every claim:\n" +
        "- **All, every, none, always, never**: no exceptions. One counter-case is enough to break them.\n" +
        "- **Most**: more than half. If most of a group are A and most are B, then **some** are both.\n" +
        "- **Some**: at least one. 'Some are' does not tell you that some are not.\n" +
        "- **May, can, could**: a possibility, not a certainty. 'Will' and 'must' are much stronger.\n" +
        "- The opposite of 'all A are B' is 'some A are not B', not 'no A are B'.\n" +
        "- From 'most A are B' you cannot conclude anything certain about one particular A.\n" +
        "- With percentages: if a% of a group are A and b% are B, at least \\(a + b - 100\\) percent are both (when that is positive).",
      authoredExample: {
        prompt:
          "In a survey of a chess club, 70% of members said they also play an online strategy game, and 60% said they read books about chess. Which of these must be true? (1) Some members do both. (2) Most members who play online also read chess books. (3) At least 30% of all members do both.",
        steps: [
          "The two groups together make \\(70 + 60 = 130\\) percent, which is more than 100%. So at least \\(130 - 100 = 30\\) percent of members must be in both groups. Statements (1) and (3) must be true.",
          "For (2): the smallest possible overlap is 30% of the club. As a share of the online players that is \\(30/70 \\approx 43\\%\\), which is not 'most'.",
          "The overlap could be as large as 60% (\\(60/70 \\approx 86\\%\\) of online players), so (2) may be true. But 'must be true' needs it in every possible case, and it fails in one.",
        ],
        answer: "(1) and (3) must be true; (2) may be true but need not be.",
      },
      selfCheckExample: {
        prompt:
          "All the volunteers at an animal shelter have completed a safety course. Most of the volunteers also take the dogs for walks. Some of the people who walk the dogs are not volunteers but paid staff.\n\nIf the statements above are true, which one of the following must also be true?",
        options: [
          "Some people who have completed the safety course walk the dogs.",
          "All the people who walk the dogs have completed the safety course.",
          "Most of the people who walk the dogs are volunteers.",
          "None of the paid staff have completed the safety course.",
          "Some volunteers have not completed the safety course.",
        ],
        steps: [
          "Most volunteers walk the dogs, so at least one volunteer does. Every volunteer has done the course. So at least one dog-walker has done the course: A must be true.",
          "B fails: some walkers are paid staff, and we are told nothing about whether staff did the course. D fails for the same reason: it may or may not be true.",
          "C needs numbers we do not have: there could be more paid walkers than volunteer walkers. E contradicts 'all the volunteers have completed a safety course'.",
        ],
        answer: "(A) Some people who have completed the safety course walk the dogs.",
      },
      practiceSet: [
        {
          prompt: "A report says 'most patients improved'. Can you conclude that a particular patient, Mr Rossi, improved?",
          answer: "No.",
          method: "'Most' says nothing certain about one member of the group",
        },
        {
          prompt: "Which statement contradicts 'All the samples were tested'?",
          answer: "At least one sample was not tested.",
          method: "The opposite of 'all' is 'not all'",
        },
        {
          prompt: "In a class, 65% study Latin and 55% study Greek. What is the smallest share that must study both?",
          answer: "20%",
          method: "\\(65 + 55 - 100\\)",
        },
      ],
      traps: [
        {
          title: "'Some' does not mean 'not all'",
          body: "In logic, 'some birds can fly' is true even though all of them might. An option that turns 'some A are B' into 'some A are not B' adds information the passage never gave.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-draw-conclusion",
      name: "Drawing a conclusion that follows from a passage",
      intuition:
        "Here the passage gives facts and stops before stating a conclusion. The right option is the one the passage supports without adding anything, and it is often modest and a little dull. The wrong options go further than the evidence, change the subject, or rely on things you happen to know.",
      definition:
        "A conclusion **follows** if the passage alone gives enough support for it.\n" +
        "- **Step 1**: sum up in one sentence what the passage shows.\n" +
        "- **Step 2**: for each option ask: does the passage state or clearly imply this?\n" +
        "- Reject options that **go beyond** the passage (all, always, will, must), **change the topic** (another group, another time, a moral judgement the passage never makes), **reverse** the finding, or need **outside knowledge**, even true outside knowledge.\n" +
        "- The right answer often joins two facts from different sentences.\n" +
        "- 'Best supported' still means supported by the passage, not by common sense.",
      authoredExample: {
        prompt:
          "Researchers put potted plants in twenty offices and left twenty similar offices without plants. Over three months they measured the air and asked the staff how they felt. One common indoor pollutant was slightly lower in the offices with plants, but the difference was far too small to affect health. Yet staff in the offices with plants said they felt calmer and rated their workplace as more pleasant. Which conclusion follows: (a) plants are an effective way to clean office air; (b) every office worker would be happier with plants; (c) offices should be required to have plants; (d) the benefit staff felt from the plants was probably not due to cleaner air; (e) plants have no effect on indoor air?",
        steps: [
          "Sum up: plants hardly changed the air, but staff felt better with them.",
          "(a) contradicts the passage: the air change was far too small to matter.",
          "(b) goes beyond: the study shows a difference between groups, not that every worker benefits. (c) is a recommendation the passage never makes.",
          "(e) overstates in the other direction: the pollutant was slightly lower, so the effect was small, not zero.",
          "(d) joins two facts: the air hardly changed, yet staff felt better. So the improvement probably came from something else, such as how the plants looked.",
        ],
        answer: "(d) The benefit staff felt from the plants was probably not due to cleaner air.",
      },
      selfCheckExample: {
        prompt:
          "A hospital introduced 'quiet hours' on two of its wards. From 10 pm to 6 am the lights were dimmed, phones were set to silent and routine checks were grouped together. On these wards, patients reported sleeping better than before, and fewer of them asked for sleeping pills. On the wards without quiet hours, neither measure changed over the same period. Staff on the quiet wards said the new routine took some getting used to but did not add to their workload.\n\nWhich one of the following can be drawn as a conclusion from the above passage?",
        options: [
          "Quiet hours cure sleeping problems in hospital patients.",
          "Sleeping pills are no longer needed on hospital wards.",
          "Hospital staff prefer working on quiet wards.",
          "Changing the night routine on a ward can improve patients' sleep without overloading staff.",
          "Patients on the other wards slept badly because of noise.",
        ],
        steps: [
          "Sum up: on the quiet wards sleep improved and pill requests fell, while nothing changed on the other wards, and staff workload did not rise.",
          "D says exactly this, with a modest 'can'. It follows.",
          "A ('cure') and B ('no longer needed') are far stronger than 'slept better' and 'fewer asked'. C is never stated: staff said it took getting used to, not that they preferred it. E gives a cause for the other wards' sleep that the passage never examines.",
        ],
        answer: "(D) Changing the night routine on a ward can improve patients' sleep without overloading staff.",
      },
      practiceSet: [
        {
          prompt:
            "'Every flight from this airport on Sunday was delayed. Flight 214 left this airport on Sunday.' What follows?",
          answer: "Flight 214 was delayed.",
        },
        {
          prompt:
            "A trial found that a new medicine reduced pain in most patients. Does 'the medicine will reduce pain in every patient' follow?",
          answer: "No.",
          method: "'Most' in one trial does not support 'every' patient",
        },
        {
          prompt:
            "An option is true in real life, but the passage never mentions it. Can it be the answer to 'which can be drawn as a conclusion'?",
          answer: "No. The conclusion must follow from the passage alone.",
        },
      ],
      traps: [
        {
          title: "A true statement is not the same as a conclusion",
          body: "IMAT often includes an option that is a well-known fact. If the passage does not give you that fact, it cannot be drawn as a conclusion from the passage, however true it is.",
        },
        {
          title: "The dull option is often the right one",
          body: "Options with 'always', 'proves', 'all' or 'should' sound decisive and attract students in a hurry. Passages rarely support them. The modest option ('can', 'may', 'is not guaranteed') is usually the one that follows.",
        },
      ],
    },
  ],
};
