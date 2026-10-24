import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESR_PARAGRAPH_NOTE: SubtopicNote = {
  subtopicName: "Ordering Sentences in a Paragraph",
  title: "Ordering Sentences in a Paragraph",
  oneLineDefinition:
    "Putting four jumbled sentences in order by finding the opener and the closer, and by following time when the sentences tell a story or a process.",
  whyItMatters:
    "Eighty-eight questions in the bank, 49 from the 2023 shifts, 9 from the 2024 shifts and 30 from the 2025 shifts. Most are settled by finding the sentence that opens and the one that closes, and when the sentences tell a story or a process, the time words fix the middle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesrpa-shape",
      name: "The opener, the closer and the shape between",
      intuition:
        "A paragraph has a shape. It opens by naming its topic in full, develops it with detail, causes or examples, and closes with a conclusion, a balancing remark or a call to act. Find the opener first, then test only the options that start with it.",
      definition:
        "1. Find the opener: the sentence that names or defines the topic and leans on nothing before it.\n" +
        "2. Rule out as openers any sentence that starts with a pronoun, \"This\", \"However\", \"Also\" or \"For example\".\n" +
        "3. Find the closer: a conclusion (\"must\", \"needs to\", \"therefore\"), a summing up, or a turn to what should be done.\n" +
        "4. Fix one pair that must sit together, then keep the option that has the opener, the pair and the closer.\n" +
        "- **S1 and S6 questions:** the first and last sentences are given; the middle sentences must lead from S1 to S6.\n" +
        "- **Fast route:** the opener and one fixed pair usually leave a single option.",
      authoredExample: {
        prompt:
          "Arrange the sentences: A. Today they also lend e-books and offer free internet. B. Public libraries began as places to borrow printed books. C. Libraries must therefore keep changing to stay useful. D. As reading moved online, many of them added digital services. (a) BDAC (b) DBAC (c) BADC (d) ACBD",
        steps: [
          "B names the topic and leans on nothing before it, so it opens. Only (a) and (c) start with B.",
          "C draws a conclusion with \"must therefore\", so it closes. Both (a) and (c) end with C.",
          "A's \"also\" adds to the digital services D first mentions, so D comes before A: BDAC.",
        ],
        answer: "(a) BDAC",
      },
      selfCheckExample: {
        prompt:
          "Arrange the sentences: A. Regular exercise strengthens the heart and lungs. B. Exercise brings many benefits to health. C. It also improves mood. D. Everyone should therefore make time for some activity each day. (a) BACD (b) ABCD (c) BCAD (d) CABD",
        steps: [
          "B is the general claim and opens.",
          "A gives the first benefit, and C's \"It also\" adds a second, so A comes before C.",
          "D concludes with \"should therefore\" and closes: BACD.",
        ],
        answer: "(a) BACD",
      },
      practiceSet: [
        { prompt: "A sentence begins with \"For example\". Can it open the paragraph?", answer: "No: it illustrates a point that must come before it." },
        { prompt: "Which sentence usually opens: the one that names the topic in full, or one that refers to it by a pronoun?", answer: "The one that names it in full." },
        { prompt: "In an S1 and S6 question, which sentences are already in place?", answer: "The first and the last." },
        { prompt: "A sentence says what must be done about the problem. Where does it usually go?", answer: "At the end, as the conclusion." },
      ],
      pyqExampleId: "2718ed99-7fc0-4d6f-a351-b6d345db708f",
      traps: [
        {
          title: "Opening with the most striking sentence",
          body:
            "The opener is the sentence that needs nothing before it, not the most interesting fact. A vivid detail or a figure usually develops a topic some other sentence introduces.",
        },
        {
          title: "Leaving the balancing remark in the middle",
          body:
            "A sentence that weighs up the other side (\"its harmful effects must also be addressed\") or says what should be done usually closes the paragraph.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesrpa-time",
      name: "Time order and the steps of a process",
      intuition:
        "When the sentences tell a story, a history or the steps of a process, time decides the order. Dates, time words (initially, later, over the years) and step words (first, next, then, finally) put the events where they happened, and a summary such as \"This process\" comes after them.",
      definition:
        "- **Dates:** the earlier year comes first; \"The next year\" or \"Two years later\" follows a sentence that names a year.\n" +
        "- **Time words:** initially, at first, then, later, over the years, eventually, today.\n" +
        "- **Steps:** begins with, the first step, next, then, after that, finally.\n" +
        "- **Natural stages:** cause before effect, the earlier stage before the later one.\n" +
        "- **Summary after the steps:** \"This process\" or \"The whole cycle\" sums up steps already given, so it comes after them.\n" +
        "- **Stories:** the sentence that introduces the person or the thing comes before what happened to it.",
      authoredExample: {
        prompt:
          "Arrange the sentences: A. After kneading, the dough is left to rise for an hour. B. Bread making begins with mixing flour, water and yeast. C. Finally, the loaf is baked until golden. D. Next, the dough is kneaded until smooth. (a) BDAC (b) BADC (c) DBAC (d) BCDA",
        steps: [
          "B says what bread making \"begins with\", so it opens.",
          "D (\"Next ... kneaded\") comes before A, which starts \"After kneading\".",
          "C begins \"Finally\" and closes: BDAC.",
        ],
        answer: "(a) BDAC",
      },
      selfCheckExample: {
        prompt:
          "Arrange the sentences: A. In 1971 it moved to a bigger campus. B. The school opened in 1965 with forty students. C. Today it teaches over two thousand. D. Six years after opening, it had outgrown its first building. (a) BDAC (b) BADC (c) DBAC (d) ABDC",
        steps: [
          "B has the earliest date and names the school, so it opens.",
          "Six years after 1965 is 1971: the school outgrew its building (D) and then moved (A).",
          "C (\"Today\") closes: BDAC.",
        ],
        answer: "(a) BDAC",
      },
      practiceSet: [
        { prompt: "The other sentences are steps. Where does a sentence that begins \"This process\" usually go?", answer: "After the steps, usually last." },
        { prompt: "One sentence begins \"The next year\" and another names the year 1990. Which comes first?", answer: "The one that names 1990." },
        { prompt: "Put these step words in order: then, finally, first.", answer: "First, then, finally." },
        { prompt: "Seeds sprout; seeds are sown. Which sentence comes first?", answer: "Seeds are sown." },
      ],
      pyqExampleId: "932bbf41-adb9-4baa-8810-912c7a6c2396",
      traps: [
        {
          title: "Putting the summary before the steps",
          body:
            "\"This process ensures ...\" names steps already described. Placed first, its \"This\" points at nothing.",
        },
        {
          title: "Ignoring a time phrase that points back",
          body:
            "\"The next year\" and \"Two years later\" count from a year in the sentence just before. Put another sentence between them and the date no longer works.",
        },
      ],
    },
  ],
};
