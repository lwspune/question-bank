import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_BD_BERNOULLI_NOTE: SubtopicNote = {
  subtopicName: "Bernoulli Trials",
  title: "Bernoulli Trials: Success, Failure, p and q",
  oneLineDefinition:
    "Repeated trials of an experiment are Bernoulli trials when each trial has exactly two outcomes, success or failure, and the probability of success stays the same in every trial.",
  whyItMatters:
    "One question, the textbook's solved example on drawing balls with and without replacement. No board paper from 2015 to 2026 asked about Bernoulli trials on its own, but every binomial answer on the next two pages starts here: say what a success is, write p and q, and check that p does not change from trial to trial.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmbd-success",
      name: "Success, failure, p and q",
      intuition:
        "Many experiments have two results that matter: a head or a tail, pass or fail, defective or not. Call the result you are counting a success and the other a failure. The probability of a success is p and of a failure is q. Since one of the two must happen, p and q always add up to 1.",
      definition:
        "- A **trial** is one performance of the experiment: one toss, one throw, one draw.\n" +
        "- The result being counted is called a **success**; the other result is a **failure**.\n" +
        "- \\(p\\) = probability of success in one trial, \\(q\\) = probability of failure in one trial.\n" +
        "- \\(p + q = 1\\), so \\(q = 1 - p\\).\n" +
        "- 'Success' is only a label. In a question about faulty items, getting a faulty item is the success.",
      formula: {
        label: "Probability of failure",
        latex: "q = 1 - p",
        symbols: [
          { symbol: "\\(p\\)", meaning: "probability of success in one trial" },
          { symbol: "\\(q\\)", meaning: "probability of failure in one trial" },
        ],
      },
      authoredExample: {
        prompt:
          "A card is drawn from a well-shuffled pack of 52 cards and put back, and this is done 5 times. Getting a face card (king, queen or jack) is a success. Find \\(p\\) and \\(q\\).",
        steps: [
          "A pack has 4 kings, 4 queens and 4 jacks, so there are 12 face cards.",
          "\\(p = \\dfrac{12}{52} = \\dfrac{3}{13}\\).",
          "\\(q = 1 - p = 1 - \\dfrac{3}{13} = \\dfrac{10}{13}\\).",
          "The card is put back every time, so \\(p\\) is the same for all 5 draws.",
        ],
        answer: "\\(p = \\dfrac{3}{13}\\) and \\(q = \\dfrac{10}{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "A fair die is thrown 20 times. Getting a multiple of 3 is a success. Find \\(p\\) and \\(q\\).",
        steps: [
          "The multiples of 3 among 1 to 6 are 3 and 6, so 2 of the 6 outcomes are successes.",
          "\\(p = \\dfrac{2}{6} = \\dfrac{1}{3}\\) and \\(q = 1 - \\dfrac{1}{3} = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(p = \\dfrac{1}{3}\\), \\(q = \\dfrac{2}{3}\\)",
      },
      practiceSet: [
        { prompt: "If the probability of success in a trial is 0.35, what is the probability of failure?", answer: "\\(q = 1 - 0.35 = 0.65\\)" },
        { prompt: "4% of the bulbs made by a factory are defective and a defective bulb is called a success. Write \\(p\\) and \\(q\\).", answer: "\\(p = 0.04\\), \\(q = 0.96\\)" },
      ],
      traps: [
        {
          title: "Taking the wrong outcome as the success",
          body: "If a question asks how many items are faulty, the faulty item is the success, even though it is the bad result. Write 'Let X be the number of ...' first; the thing X counts is the success, and \\(p\\) is its probability.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscmbd-trials",
      name: "When are the trials Bernoulli trials?",
      intuition:
        "Before using any binomial formula, check the trials. Each trial must have just two outcomes, and the chance of success must not change from one trial to the next. The usual way it fails is drawing without replacement: every draw changes what is left, so p changes.",
      definition:
        "Trials of a random experiment are called **Bernoulli trials** if they satisfy the following conditions:\n" +
        "- Each trial has exactly two outcomes: success or failure.\n" +
        "- The probability of success remains the same in each trial.\n" +
        "Also note: the number of trials should be fixed, and the trials should be independent.\n" +
        "- **With replacement**, the urn or pack is the same before every draw, so \\(p\\) stays the same: Bernoulli trials.\n" +
        "- **Without replacement**, \\(p\\) for the second draw depends on what came out first: not Bernoulli trials.",
      table: {
        columns: ["Experiment", "Two outcomes in each trial", "Same p in every trial", "Bernoulli trials?"],
        rows: [
          {
            cells: [
              "A coin tossed 10 times, a head is a success",
              "Yes, head or tail",
              "Yes, \\(p = \\dfrac{1}{2}\\) every time",
              "Yes",
            ],
          },
          {
            cells: [
              "Balls drawn one by one from an urn and replaced after each draw, a red ball is a success",
              "Yes, red or not red",
              "Yes, the urn is the same before every draw",
              "Yes",
            ],
            pyqExampleId: "1f0d6bb7-280c-48a6-ae3e-3465854653b6",
            noteAmber: "The textbook's solved example asks this for an urn of red and black balls, first with replacement and then without.",
          },
          {
            cells: [
              "Balls drawn one by one from an urn and not replaced, a red ball is a success",
              "Yes, red or not red",
              "No, the chance of red on each draw depends on the balls already taken out",
              "No",
            ],
          },
          {
            cells: [
              "A die thrown 50 times, an even number is a success",
              "Yes, even or odd",
              "Yes, \\(p = \\dfrac{1}{2}\\) every time",
              "Yes",
            ],
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A student guesses the answers to 8 true or false questions. Getting an answer right is a success. Are these Bernoulli trials? If so, write \\(p\\).",
        steps: [
          "Each guess is right or wrong: exactly two outcomes.",
          "Each guess is right with the same probability \\(\\dfrac{1}{2}\\), whatever happened before.",
          "Both conditions hold, so these are Bernoulli trials.",
        ],
        answer: "Yes, 8 Bernoulli trials with \\(p = \\dfrac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "A die is thrown and the number shown (1 to 6) is written down. Is one throw, recorded this way, a Bernoulli trial?", answer: "No. It has six outcomes. It becomes one once a success is defined, for example 'a six'." },
        { prompt: "Name the two conditions for trials to be Bernoulli trials.", answer: "Each trial has exactly two outcomes (success or failure), and the probability of success is the same in every trial." },
      ],
      pyqExampleId: "1f0d6bb7-280c-48a6-ae3e-3465854653b6",
      traps: [
        {
          title: "Checking only the two outcomes",
          body: "Two outcomes is only half of the test. Drawing without replacement still gives 'red or not red', but \\(p\\) changes after each draw, so the trials are not Bernoulli trials. State both conditions and check both.",
        },
        {
          title: "Saying 'not Bernoulli' without the reason",
          body: "For 'without replacement', write the chance of success on the first draw and on the second draw for both possible first results. Showing that \\(p\\) changes is what earns the mark.",
        },
      ],
    },
  ],
};
