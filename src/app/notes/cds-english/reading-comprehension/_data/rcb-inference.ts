import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCB_INFERENCE_NOTE: SubtopicNote = {
  subtopicName: "Inference: What Must Be True",
  title: "Inference: what the passage must mean",
  oneLineDefinition:
    "An inference question asks for a point the passage does not state in so many words but clearly means. The answer must follow from a line; an option that only could be true is wrong.",
  whyItMatters:
    "Inference is one of the most common kinds of question in CDS reading. It hides behind many stems: 'the passage suggests', 'it can be inferred', 'which is true according to the author', or a plain question about the passage. " +
    "The wrong options are usually sensible statements about the world, and that is why they tempt. The test is always the same: can you point at a line that makes this true?",
  concepts: [
    // C1 — must be true vs could be true
    {
      kind: "formula" as const,
      slug: "cdsenrcb-must-be-true",
      name: "Must be true, not could be true",
      intuition:
        "An inference is one short step from a line in the passage. If the line is true, the inference must be true. " +
        "An option that might be true, or that sounds wise, is not enough. You must be able to point at the line.",
      definition:
        "The terms:\n" +
        "- **Inference**: a point the passage does not state but clearly means.\n" +
        "- **Must be true**: follows from a line in one step.\n" +
        "- **Could be true**: fits the topic, but nothing in the passage proves it.\n" +
        "The method:\n" +
        "- Find the line the question is about. Note its key words.\n" +
        "- For each option ask: if this line is true, must this option also be true?\n" +
        "- Keep the option you can prove with a line. Point at that line.\n" +
        "- Strike options that are only possible, that need outside knowledge, or that need two or more steps.\n" +
        "- Be wary of strong words in an option (all, never, only, always). The passage rarely supports them.",
      authoredExample: {
        prompt:
          "'Every evening the old soldier polished his medals and told the children about his regiment. He never missed a reunion, even when his knees were bad.' Which can be inferred? (a) He was proud of his time in the army. (b) He was the bravest man in his regiment. (c) He disliked children. (d) He won every battle he fought.",
        steps: [
          "The lines: he polished his medals daily, talked about his regiment, and went to every reunion even when it hurt.",
          "Test (a): someone who does all this must value his army years. One step. Keep it.",
          "Test (b): he may have been brave, but nothing says he was the bravest. Could be true only.",
          "Test (c): the lines say the opposite; he talked to the children. (d) is a strong claim with no line behind it.",
        ],
        answer: "(a) He was proud of his time in the army.",
      },
      selfCheckExample: {
        prompt:
          "'The shopkeeper cut his prices twice in one month, but the shelves stayed full.' Which must be true? (a) The goods were not selling well. (b) The shopkeeper was rich. (c) The shop would close soon. (d) The prices were already too low.",
        steps: [
          "Line: prices cut twice, shelves still full.",
          "Full shelves after price cuts mean few people bought the goods. One step: (a).",
          "(c) could happen, but the lines do not prove it. (b) and (d) have no line behind them.",
        ],
        answer: "(a) The goods were not selling well.",
      },
      practiceSet: [
        { prompt: "'Only cadets who passed the swimming test went on the river exercise. Rohan went on the river exercise.' Must be true or could be true: 'Rohan passed the swimming test.'", answer: "Must be true", method: "It follows from the two lines in one step." },
        { prompt: "Same lines. Must or could: 'Rohan is the best swimmer in his batch.'", answer: "Could be true", method: "Passing a test does not make him the best." },
        { prompt: "'The farmer sold his tractor and bought two bullocks.' Must or could: 'He no longer owns the tractor.'", answer: "Must be true", method: "He sold it." },
        { prompt: "'Few people came to the talk, and most of them left early.' Must or could: 'The speaker was boring.'", answer: "Could be true", method: "The lines give no reason for leaving." },
      ],
      pyqExampleId: "0ab2f446-d17c-431e-ae7a-4ebe47d30fff", // 2017 (I) Q110 — why men flocked to a tower
      traps: [
        {
          title: "True in life, but not in the passage",
          body:
            "An option can be a fine statement about the world and still be wrong. The question asks what the passage means. If you cannot point at a line, cut it.",
        },
        {
          title: "Two steps away",
          body:
            "If you need to add your own idea between the line and the option, the option is too far. A real inference is one step: the line, then the point.",
        },
      ],
    },

    // C2 — the three cuts: outside fact, too strong, wrong direction
    {
      kind: "formula" as const,
      slug: "cdsenrcb-beyond-passage",
      name: "Cut the option that goes beyond the passage",
      intuition:
        "Wrong options often use the passage's topic but go further than the passage does: a fact from outside, a bigger claim, or a result the passage never names. " +
        "Cut these first. What survives is usually the answer.",
      definition:
        "The method, three cuts:\n" +
        "- **Outside fact**: the option is about the topic, but the passage never mentions it. Cut it, even if it is true in real life.\n" +
        "- **Too strong**: the option widens the claim: some becomes all, may becomes will, helps becomes cures, one town becomes the world.\n" +
        "- **Wrong direction**: the option reverses the passage, or names something the passage says DID happen when the stem asks what did not.\n" +
        "Then:\n" +
        "- Check the option that survives against a line.\n" +
        "- Read the small words in the stem: not, failed to, except, least. They turn the question upside down.",
      authoredExample: {
        prompt:
          "'A small study in Pune found that office workers who did yoga three times a week slept better than those who did not.' According to the passage, yoga (a) cures all illnesses (b) can help office workers sleep better (c) is practised by everyone in Pune (d) reduces the cost of medicines",
        steps: [
          "Cut (a): too strong. Sleeping better is not curing all illnesses.",
          "Cut (c): too strong. The study was of some office workers, not everyone.",
          "Cut (d): outside fact. The passage says nothing about medicines.",
          "(b) matches the line: the yoga group slept better.",
        ],
        answer: "(b) can help office workers sleep better",
      },
      selfCheckExample: {
        prompt:
          "'The new canal brought water to the dry fields and doubled the wheat crop. But farmers at the far end of the canal still got little water, and quarrels over turns grew.' Which is NOT given as a result of the canal? (a) water for the dry fields (b) a bigger wheat crop (c) better roads to the market (d) quarrels over turns",
        steps: [
          "The stem says NOT, so three options are in the passage and one is not.",
          "(a) and (b): the first sentence gives both.",
          "(d): the second sentence gives it.",
          "(c): roads are never mentioned.",
        ],
        answer: "(c) better roads to the market",
      },
      practiceSet: [
        { prompt: "Line: 'Some birds in the park now nest earlier in spring.' Option: 'All birds now nest earlier.' Which cut?", answer: "Too strong", method: "some has become all." },
        { prompt: "Line: 'Drinking enough water may help students concentrate.' Option: 'Water improves exam results.' Which cut?", answer: "Too strong", method: "may help concentrate has become improves results." },
        { prompt: "Line: 'The mountain road is closed in winter because of snow.' Option: 'The road is closed because of landslides.' Which cut?", answer: "Outside fact", method: "The passage gives snow, not landslides." },
        { prompt: "Stem: 'The town did NOT get...' Line: 'The town got a hospital and a college.' Option: 'a hospital'. Which cut?", answer: "Wrong direction", method: "The town did get one." },
      ],
      pyqExampleId: "eaa526db-f608-4b36-848a-4031cb556861", // 2023 (I) Q112 — what machines failed to bring
      traps: [
        {
          title: "Missing the 'not' in the stem",
          body:
            "Stems with not, failed to or except ask for the one option the passage does NOT give. Under time pressure, students pick the first option that matches a line, which is exactly the wrong one.",
        },
        {
          title: "The softer word quietly changed",
          body:
            "Passages hedge: may, some, often, can help. Options drop the hedge: will, all, always, cures. Compare the strength word in the option with the one in the line.",
        },
      ],
    },

    // C3 — numbered statements, assumptions, true/not-true
    {
      kind: "formula" as const,
      slug: "cdsenrcb-statement-codes",
      name: "Numbered statements and true/not-true: test each one",
      intuition:
        "Some questions give two to four numbered statements and a code: 1 only, 1 and 2, and so on. Others ask which option is true, or NOT true, according to the author. " +
        "Do not judge the set as a whole. Test each statement alone, mark it yes or no, then read the code.",
      definition:
        "The terms:\n" +
        "- **Statement code**: the answer options list which numbered statements are correct (1 only, 2 and 3, neither).\n" +
        "- **Assumption**: in these questions, a point the passage shows or clearly means.\n" +
        "The method:\n" +
        "- Test statement 1 against the passage. Mark yes (a line supports it) or no (no line, or a line says the opposite).\n" +
        "- Test each other statement the same way. Do not let one answer colour the next.\n" +
        "- A statement the passage never touches is a no, even if it sounds likely.\n" +
        "- Every part of a statement must be supported. Half supported is a no.\n" +
        "- If the stem asks why, a true fact that is not the reason is a no.\n" +
        "- Read the codes last, and use them: if statement 1 is no, cut every code that contains 1.\n" +
        "- For 'which is NOT true': mark every option. The answer is the one with no supporting line, or with a line against it.",
      authoredExample: {
        prompt:
          "'The night patrol left the camp at ten. By midnight the rain had turned the track to mud, and the jeep got stuck twice. They reached the post an hour late.' Consider: 1. The patrol travelled by jeep. 2. The patrol was ordered back to camp. 3. The weather slowed the patrol. Which is/are correct? (a) 1 and 3 only (b) 1 and 2 only (c) 2 and 3 only (d) 1, 2 and 3",
        steps: [
          "Statement 1: 'the jeep got stuck twice'. Yes.",
          "Statement 2: no line says they were ordered back; they reached the post. No.",
          "Statement 3: rain made the track muddy, the jeep got stuck, they were late. Yes.",
          "Codes: 2 is no, so cut (b), (c) and (d).",
        ],
        answer: "(a) 1 and 3 only",
      },
      selfCheckExample: {
        prompt:
          "'Good drivers on hill roads keep to their side, sound the horn at sharp bends and use a low gear going downhill. They rarely overtake on a curve.' Which is NOT true according to the passage? (a) Good drivers sound the horn at bends. (b) Good drivers use a low gear downhill. (c) Good drivers often overtake on curves. (d) Good drivers keep to their side.",
        steps: [
          "Mark each: (a) yes, (b) yes, (d) yes. Each has a line.",
          "(c): the line says they RARELY overtake on a curve. The option says often. A line is against it.",
        ],
        answer: "(c) Good drivers often overtake on curves.",
      },
      practiceSet: [
        { prompt: "Statement 1 is no. Codes: (a) 1 only (b) 2 only (c) both 1 and 2 (d) neither. Which codes are left?", answer: "(b) and (d)", method: "Cut every code containing 1." },
        { prompt: "Line: 'The bridge was built in 1890 and still carries traffic.' Statement: 'The bridge was built for trains.' Yes or no?", answer: "No", method: "The passage never says what it was built for." },
        { prompt: "Line: 'The school has a large library.' Statement: 'The school has a large library that students use every day.' Yes or no?", answer: "No", method: "The second half has no line behind it." },
        { prompt: "Stem asks: 'Why did the officer resign?' Statement: 'He had served for twenty years' (true in the passage, but not given as the reason). Yes or no?", answer: "No", method: "A true fact that is not the reason does not answer why." },
      ],
      pyqExampleId: "b2c78952-98b3-41d0-949f-5538e8b864f1", // 2017 (I) Q103 — two assumptions about a short scene
      traps: [
        {
          title: "Judging the statements as a group",
          body:
            "Students read all the statements, get a feeling, and pick a code. Test each statement on its own against a line. A single unsupported statement changes the code.",
        },
        {
          title: "A true fact that is not the reason",
          body:
            "In one passage, crowds really did flock to see a tower, but that was not why a critic scorned it. When the stem asks why, a statement must give the reason, not just any true fact.",
        },
      ],
    },
  ],
};
