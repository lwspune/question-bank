import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ERC_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Words and Phrases in Context",
  title: "Words and Phrases in Context",
  oneLineDefinition:
    "Questions on what a word, phrase or image means as the passage uses it, which can differ from its most common meaning.",
  whyItMatters:
    "Thirty-four questions in the bank, 32 of them from the 2025 shifts, with 26 EASY and 8 MODERATE. The 2025 passages use academic words (banality, epistemic, dialectical), but the sentence around each word is always enough to pin its meaning.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscercwo-word",
      name: "A word's meaning in its sentence",
      intuition:
        "The meaning that counts is the one the sentence needs. Put each option in place of the word and read the sentence again: the option that keeps the sentence's sense is the answer, even if another option is a more common meaning of the word.",
      definition:
        "1. Find the word in the passage and read its whole sentence.\n" +
        "2. Ask what the sentence would mean without the word: what idea is missing?\n" +
        "3. Put each option in the word's place. Keep the one that fits the sentence and the tone around it.\n" +
        "- Some questions ask for the opposite of a word, or for the passage's word that means a given thing. Read the question's last words carefully.\n" +
        "- **Fast route:** decide whether the word is positive or negative in the sentence; that often strikes two options at once.",
      authoredExample: {
        prompt:
          "Passage: \"The old bridge was so fragile that the council closed it to all traffic.\" Question: What does \"fragile\" mean as used here? (a) Beautiful (b) Easily broken (c) Narrow (d) Ancient",
        steps: ["The bridge was closed to traffic because of how fragile it was.", "That fits a bridge that could break easily."],
        answer: "(b) Easily broken",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"After the long drought, the farmers greeted the rain with jubilation, dancing in the fields.\" Question: What does \"jubilation\" mean as used here? (a) Fear (b) Great joy (c) Surprise (d) Anger",
        steps: ["The farmers were dancing in the fields after a drought.", "That shows great joy."],
        answer: "(b) Great joy",
      },
      practiceSet: [
        { prompt: "What is the quickest test for a word's meaning in context?", answer: "Put each option in its place and see which keeps the sentence's sense." },
        { prompt: "Is the most common meaning of a word always the answer?", answer: "No: the sentence decides." },
        { prompt: "A question asks for the opposite of a word in the passage. Should you pick its meaning?", answer: "No: pick the option that means the opposite." },
        { prompt: "What does \"banal\" mean?", answer: "Ordinary and dull, lacking originality" },
      ],
      pyqExampleId: "77220d75-48fe-440d-8370-b29a13274e23",
      traps: [
        {
          title: "Choosing a word's dictionary meaning that the sentence does not use",
          body:
            "Many words have several meanings. Pick the one that makes sense in the passage's sentence, not the one you know best.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscercwo-phrase",
      name: "Phrases, images and metaphors",
      intuition:
        "Writers use phrases and images that stand for something else: a treadmill for effort that goes nowhere, a crucible for a hard test. Ask what the thing is like in real life, then what the passage is comparing it to.",
      definition:
        "- **A metaphor** names one thing as another: \"the treadmill of work\" means work that never moves you forward.\n" +
        "- **A phrase** built from known parts often means their combination: \"epistemic humility\" is humility about knowledge, that is, knowing the limits of what you know.\n" +
        "- Read the sentence the phrase sits in; the passage usually explains the image in the next few words.\n" +
        "- **Fast route:** say in plain words what the image is like (a treadmill: running without going anywhere), then match that to an option.",
      authoredExample: {
        prompt:
          "Passage: \"For the young athlete, the national trials were a crucible: only those who could handle the pressure moved on.\" Question: What does \"crucible\" suggest here? (a) A reward (b) A severe test (c) A holiday (d) A celebration",
        steps: ["A crucible is a container that is heated to great temperatures.", "In the passage only those who could handle pressure moved on: the trials were a severe test."],
        answer: "(b) A severe test",
      },
      selfCheckExample: {
        prompt:
          "Passage: \"The city's new library became the beating heart of the neighbourhood, full of people from morning to night.\" Question: What does \"the beating heart\" suggest? (a) A hospital (b) The busy centre of life (c) A quiet place (d) A noisy building",
        steps: ["A heart keeps a body alive and is at its centre.", "The library, full of people all day, is the busy centre of the neighbourhood's life."],
        answer: "(b) The busy centre of life",
      },
      practiceSet: [
        { prompt: "What does \"a treadmill\" suggest when used about work?", answer: "Effort that goes on without getting anywhere" },
        { prompt: "What is \"epistemic humility\"?", answer: "Awareness of the limits of one's own knowledge" },
        { prompt: "Where does the passage usually explain an image?", answer: "In the words just after it" },
        { prompt: "What does it mean to call a problem \"the tip of the iceberg\"?", answer: "Only a small part of a much bigger problem is visible." },
      ],
      pyqExampleId: "440332ca-943e-44cd-94f9-b294c0fbf6e5",
      traps: [
        {
          title: "Reading an image literally",
          body:
            "A passage about work that mentions a treadmill is not about exercise. Ask what the image stands for in the passage.",
        },
      ],
    },
  ],
};
