import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ERC_IDEAS_NOTE: SubtopicNote = {
  subtopicName: "RC: Main Idea, Tone and Inference",
  title: "RC: Main Idea, Tone and Inference",
  oneLineDefinition:
    "Questions about the passage as a whole: its title or central theme, its tone or type, and what it implies without saying directly.",
  whyItMatters:
    "33 of the 97 Tier II RC questions, 21 EASY and 12 MODERATE. Title and theme questions alone number 15, and nearly every passage carries one.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ercid-main",
      name: "Title and central theme",
      intuition:
        "The right title covers the whole passage, not just one paragraph, and is not wider than the passage. Options that are too narrow (one detail) or too broad (a whole field) are the usual traps.",
      definition:
        "- **Find the subject** that every paragraph talks about.\n" +
        "- **Too narrow:** names one example or one paragraph's point.\n" +
        "- **Too broad:** names a whole field the passage only touches.\n" +
        "- **'Highlights all except':** the answer is the point the passage does not make.",
      authoredExample: {
        prompt:
          "Passage: three paragraphs on why sleep matters: memory, mood, and the body's repair. Best title? (a) Sleep and Memory (b) Why Sleep Matters (c) The Human Body (d) Dreams",
        steps: ["(a) covers one paragraph: too narrow. (c) is too broad. (d) is not discussed.", "(b) covers all three paragraphs."],
        answer: "(b) Why Sleep Matters",
      },
      selfCheckExample: {
        prompt:
          "A passage describes how a village built a check dam, how the water table rose, and how farming improved. Its central theme is: (a) dams in India (b) how one village saved its water (c) the rainy season (d) farming tools",
        steps: ["Every part is about the village's water project and its results.", "(a) is too broad; (c) and (d) are side details."],
        answer: "(b) how one village saved its water",
      },
      practiceSet: [
        { prompt: "An option names only the example in the second paragraph. Is it likely the title?", answer: "No: it is too narrow" },
        { prompt: "An option names the whole subject area (for example 'Science'). Is it likely the title?", answer: "No: it is too broad" },
        { prompt: "Where should you look first for the main idea?", answer: "The first and last sentences of the passage" },
      ],
      pyqExampleId: "c3d2811f-4b2e-4887-b53c-0b2fa3ae29ea",
      traps: [
        {
          title: "Choosing the most interesting detail",
          body: "A vivid fact (a balloon's size, an exact number) can be tempting as a title, but a title must cover what the whole passage is about.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ercid-tone",
      name: "Tone, type and the author's purpose",
      intuition:
        "Tone is how the writer sounds; type is what the passage does. A passage of facts and figures is informative; one that paints a scene is descriptive; one that weighs good and bad points with doubt is critical.",
      definition:
        "- **Informative:** gives facts (steel, algae, exercise).\n" +
        "- **Descriptive:** paints a scene or a process in detail.\n" +
        "- **Instructional:** explains how to do something, step by step.\n" +
        "- **Critical:** points out faults; 'cautiously critical' grants some benefits too.\n" +
        "- **Serene, nostalgic:** a story's mood, from its descriptions.\n" +
        "- **A news item:** reports a recent event with names, dates and quotes.",
      authoredExample: {
        prompt:
          "Passage: 'The new rules mean fewer forms for small shops, which is welcome. Yet the extra online checks may shut out traders without smartphones.' The author's tone is: (a) Joyful (b) Cautiously critical (c) Angry (d) Neutral",
        steps: ["The author welcomes one part and worries about another.", "Praise with a reservation is cautiously critical."],
        answer: "(b) Cautiously critical",
      },
      selfCheckExample: {
        prompt:
          "Passage: a list of the steps for making paper by hand, from soaking the pulp to drying the sheets. Its type is best described as: (a) Narrative (b) Informative and instructional (c) Humorous (d) Persuasive",
        steps: ["It explains a process step by step.", "That is informative and instructional."],
        answer: "(b) Informative and instructional",
      },
      practiceSet: [
        { prompt: "A passage gives statistics and facts about a metal. What is its tone?", answer: "Informative" },
        { prompt: "A passage reports that a rocket was launched yesterday, with quotes from officials. What kind of writing is it?", answer: "A news item" },
        { prompt: "A story describes a calm lake at dawn. What is its mood?", answer: "Serene (calm, peaceful)" },
      ],
      pyqExampleId: "c2c819da-5c3d-4868-82b7-0b20b64e8310",
      traps: [
        {
          title: "Choosing an extreme tone",
          body: "SSC passages are rarely angry or joyful. When an author weighs good and bad, the answer is the measured option (critical, cautious, balanced).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ercid-infer",
      name: "Inference: what must be true",
      intuition:
        "An inference is not written in the passage but follows from it. The right option is the one the passage forces you to accept; an option that needs extra facts or goes further than the passage is wrong.",
      definition:
        "- **Must be true,** not 'could be true'.\n" +
        "- **Small step:** the passage says rice exports rose to many new countries, so India's rice trade is widening.\n" +
        "- **Reject** options that add facts, numbers or opinions the passage does not support.",
      authoredExample: {
        prompt:
          "Passage: 'Every student who passed the test had attended the extra classes.' Which must be true? (a) The extra classes were free. (b) A student who missed the extra classes did not pass. (c) All students attended the extra classes. (d) The test was easy.",
        steps: ["If every passer attended, nobody who missed them passed.", "(a), (c) and (d) need facts the passage does not give."],
        answer: "(b)",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'Sales of woollen clothes in the town doubled this December, the coldest in twenty years.' What can be inferred? (a) The cold raised the demand for woollens. (b) Shops cut their prices. (c) Next December will be colder. (d) The town has many shops.",
        steps: ["The passage links the record cold to the sales jump.", "The other options need facts the passage does not give."],
        answer: "(a)",
      },
      practiceSet: [
        { prompt: "Is an inference stated word for word in the passage?", answer: "No: it follows from what is stated" },
        { prompt: "An option is possible but the passage does not force it. Is it the inference?", answer: "No: an inference must be true from the passage" },
        { prompt: "An option adds a number that is not in the passage. Keep or reject?", answer: "Reject" },
      ],
      pyqExampleId: "3516f31a-8164-479b-bad7-5015815c4af4",
      traps: [
        {
          title: "Going a step too far",
          body: "'The passage shows women joined in large numbers' supports 'their involvement helped'. It does not support 'they ran the whole scheme'. Stop where the passage stops.",
        },
      ],
    },
  ],
};
