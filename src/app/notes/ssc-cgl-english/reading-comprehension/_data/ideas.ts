import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ERC_IDEAS_NOTE: SubtopicNote = {
  subtopicName: "Main Idea and Inference",
  title: "Main Idea and Inference",
  oneLineDefinition:
    "Questions about the passage as a whole: its central idea, the author's view and tone, what must be true from it, and the options built to look right while saying something else.",
  whyItMatters:
    "Fifty questions in the bank, all from the 2025 shifts, with 35 EASY, 14 MODERATE and 1 HARD. These carry the hardest options of a passage, because every wrong one is close to the passage; checking each against the passage's own claim is what keeps the mark.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscercid-main",
      name: "The central idea and the author's view",
      intuition:
        "Most passages state their main point once, near the start or at the end. The central idea covers the whole passage, not one paragraph of it, and it matches the author's tone: approving, critical, cautious or neutral.",
      definition:
        "- Read the first and last sentences of the passage closely; the thesis is usually in one of them.\n" +
        "- **Too narrow:** an option that covers only one example or one paragraph.\n" +
        "- **Too broad:** an option that goes beyond what the passage discusses.\n" +
        "- **Tone:** look at the words that judge (\"must\", \"dangerous\", \"promising\", \"however\") to see whether the author approves, warns or weighs both sides.\n" +
        "- **Fast route:** for a title or main-idea question, pick the option that every paragraph supports.",
      authoredExample: {
        prompt:
          "Passage: \"Cycling to work cuts traffic and pollution. It also keeps riders fit and saves money on fuel. Cities that build safe cycle lanes see more people choose this way of travel.\" Question: What is the main idea? (a) Fuel is expensive (b) Cycling to work brings many benefits, and safe lanes encourage it (c) Cities have too much traffic (d) Riders should wear helmets",
        steps: [
          "Each sentence adds a benefit of cycling, and the last says safe lanes increase it.",
          "(a) and (c) are single details; (d) is not in the passage. (b) covers all of it.",
        ],
        answer: "(b)",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"Social media lets people stay in touch across the world. Yet the same apps can spread rumours faster than facts can follow, and users must learn to check before they share.\" Question: What is the author's attitude to social media? (a) Wholly approving (b) Wholly hostile (c) Balanced, seeing both use and risk (d) Indifferent",
        steps: ["The passage praises staying in touch, then warns about rumours with \"Yet\".", "It weighs both sides and asks for care."],
        answer: "(c) Balanced, seeing both use and risk",
      },
      practiceSet: [
        { prompt: "Where is a passage's main point most often stated?", answer: "In its first or last sentences" },
        { prompt: "An option describes only the passage's second example. Is it the main idea?", answer: "No: it is too narrow." },
        { prompt: "Which word in a passage often signals a turn in the author's view?", answer: "However, yet or but" },
        { prompt: "An option goes beyond anything the passage discusses. Is it the main idea?", answer: "No: it is too broad." },
      ],
      pyqExampleId: "691964e3-2c6d-4255-a901-091015c3e717",
      traps: [
        {
          title: "Picking the most striking detail",
          body:
            "A vivid example in the middle of the passage is not its main idea. Check that the option is supported by every paragraph, not just the one you remember best.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscercid-infer",
      name: "What must be true from the passage",
      intuition:
        "An inference is not written in the passage but follows from what is. The right option must be true if the passage is true; an option that could be true, or needs facts the passage never gives, is not an inference.",
      definition:
        "- **Must be true:** it follows from one or two sentences of the passage put together.\n" +
        "- **Could be true:** it fits the topic but the passage does not force it. Reject it.\n" +
        "- **Author's caution or suggestion:** questions on what the author warns or recommends are answered from the sentences that warn or recommend.\n" +
        "- **Fast route:** for each option, find the sentence that proves it. No proving sentence, no answer.",
      authoredExample: {
        prompt:
          "Passage: \"The museum is open only on weekends, and entry is free for children under twelve.\" Question: Which of these can be inferred? (a) The museum is closed on a Wednesday (b) Adults pay a high fee (c) The museum is popular (d) Children cannot visit",
        steps: [
          "Open only on weekends means it is closed every weekday, including Wednesday.",
          "Nothing says how much adults pay or how popular it is, and children can visit free.",
        ],
        answer: "(a)",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"All the trains on this line stop at Central Station. The 8:15 train runs on this line.\" Question: Which must be true? (a) The 8:15 train is late (b) The 8:15 train stops at Central Station (c) Central Station is the last stop (d) The line is new",
        steps: ["Every train on the line stops at Central, and the 8:15 is on the line.", "So the 8:15 must stop at Central. The others are not given."],
        answer: "(b)",
      },
      practiceSet: [
        { prompt: "Is an option that could be true, but is not forced by the passage, an inference?", answer: "No" },
        { prompt: "What should you find for each option in an inference question?", answer: "The sentence that proves it" },
        { prompt: "Must an inference be stated word for word in the passage?", answer: "No: it follows from what is stated." },
        { prompt: "An option needs a fact the passage never gives. Can it be the answer?", answer: "No" },
      ],
      pyqExampleId: "9b621f2f-2139-4065-aa75-785ab9b50575",
      traps: [
        {
          title: "Accepting a reasonable guess",
          body:
            "An option can sound sensible and still not follow. If no sentence of the passage proves it, it is a guess, not an inference.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscercid-traps",
      name: "Options that look right",
      intuition:
        "Wrong options in a passage are built to look familiar: they reuse the passage's words, mix up two details, or make a claim stronger than the passage does. Knowing the usual shapes of a trap makes them easy to strike.",
      definition:
        "- **Word match, meaning changed:** the option copies a phrase but attaches it to the wrong subject or reverses it.\n" +
        "- **Too strong:** the passage says \"some\" or \"may\"; the option says \"all\" or \"always\".\n" +
        "- **Mixed details:** two facts from different parts of the passage joined into one false claim.\n" +
        "- **True but off-topic:** a fact you know that the passage never discusses.\n" +
        "- **Fast route:** when two options look right, compare each with the exact sentence; the trap differs in one word.",
      authoredExample: {
        prompt:
          "Passage: \"Some doctors now prescribe walking to patients with mild back pain.\" Question: According to the passage, what is true? (a) All doctors prescribe walking for back pain (b) Some doctors prescribe walking for mild back pain (c) Walking cures every illness (d) Back pain is rare",
        steps: [
          "(a) turns \"some\" into \"all\". (c) and (d) go beyond the passage.",
          "(b) says what the passage says.",
        ],
        answer: "(b)",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"The river floods in spring, when snow melts in the hills; in autumn it runs low.\" Question: According to the passage, when does the river run low? (a) In spring (b) In autumn (c) When snow melts (d) In winter",
        steps: ["(a) and (c) belong to the flooding, not the low water: a mixed-detail trap.", "The passage says it runs low in autumn."],
        answer: "(b) In autumn",
      },
      practiceSet: [
        { prompt: "The passage says \"may\". An option says \"always\". Is that option likely to be right?", answer: "No: it is too strong." },
        { prompt: "An option states a true fact the passage never mentions. Should you choose it?", answer: "No" },
        { prompt: "Two options look right. What should you compare them with?", answer: "The exact sentence in the passage" },
        { prompt: "What is a mixed-detail trap?", answer: "An option that joins two facts from different parts of the passage into one false claim." },
      ],
      pyqExampleId: "eec45d6c-2368-41f6-948e-8f1c6bb3dad7",
      traps: [
        {
          title: "Trusting an option because it uses the passage's words",
          body:
            "Copied words are what makes a trap look right. Check that the option says what the passage says about the same thing, not just that the words appear.",
        },
        {
          title: "Overlooking a strong word",
          body:
            "All, only, never, always and must turn a partly true option false. Read every option for these words before you accept it.",
        },
      ],
    },
  ],
};
