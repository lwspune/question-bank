import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EGR_VOICE_NOTE: SubtopicNote = {
  subtopicName: "Active and Passive Voice",
  title: "Active and Passive Voice",
  oneLineDefinition:
    "Changing a sentence between active and passive: the receiver becomes the subject, the verb becomes be + past participle in the same tense, and the doer moves to by.",
  whyItMatters:
    "Two hundred and twenty-seven questions in the bank, 78 from the 2023 shifts, 72 from the 2024 shifts and 77 from the 2025 shifts, more than half the chapter, and 180 of them EASY. SSC asks the change both ways, so one rule (keep the tense, swap the doer and the receiver) earns marks in every shift.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscegrvo-tense",
      name: "The passive in every tense",
      intuition:
        "To make a sentence passive, the object becomes the subject, the verb turns into be + past participle while keeping its tense, and the doer moves after by. Going from passive to active reverses each step. The tense never changes.",
      definition:
        "- **Simple:** writes becomes is/are written; wrote becomes was/were written; will write becomes will be written.\n" +
        "- **Continuous:** is writing becomes is being written; was writing becomes was being written.\n" +
        "- **Perfect:** has written becomes has been written; had written becomes had been written; will have written becomes will have been written.\n" +
        "- **Negatives:** not stays after the first helping verb: did not write becomes was not written.\n" +
        "- **Agreement:** the new subject decides is or are, was or were: \"Pancakes were made\".\n" +
        "- **By + object form:** by him, by them, by me; the doer may be dropped when it is unknown or people in general.",
      authoredExample: {
        prompt: "Change to the passive: The gardener is watering the plants.",
        steps: [
          "\"Is watering\" is the present continuous, so the passive is is/are being + participle.",
          "The plants (plural) become the subject: \"are being watered\", and the gardener moves after by.",
        ],
        answer: "The plants are being watered by the gardener.",
      },
      selfCheckExample: {
        prompt: "Change to the active: The letters had been posted by the clerk.",
        steps: ["\"Had been posted\" is the past perfect passive, so the active is had + participle.", "The clerk becomes the subject."],
        answer: "The clerk had posted the letters.",
      },
      practiceSet: [
        { prompt: "Make passive: She has finished the work.", answer: "The work has been finished by her." },
        { prompt: "Make passive: They sell fresh fruit here.", answer: "Fresh fruit is sold here (by them)." },
        { prompt: "Make active: The match will be won by our team.", answer: "Our team will win the match." },
        { prompt: "Name the tense of: The road was being repaired.", answer: "Past continuous, in the passive" },
      ],
      pyqExampleId: "6732989e-7ca1-4fbe-90b4-bd7b8f336f87",
      traps: [
        {
          title: "Changing the tense",
          body: "\"She is writing a letter\" becomes \"A letter is being written by her\", not \"was written\". Only the voice changes.",
        },
        {
          title: "Agreeing with the old subject",
          body: "\"He made the cakes\" becomes \"The cakes were made by him\": the new subject, the cakes, is plural, so were.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscegrvo-question",
      name: "Questions and commands",
      intuition:
        "A question stays a question. Who becomes by whom; a do, does or did question becomes is, are, was or were + the new subject + participle; a question word such as why stays in front. A command becomes \"Let ... be + participle\".",
      definition:
        "- **Who?** becomes **By whom?**: \"Who wrote it?\" becomes \"By whom was it written?\"\n" +
        "- **Do, does, did questions:** \"Did you buy it?\" becomes \"Was it bought by you?\"; \"Does she cook rice?\" becomes \"Is rice cooked by her?\"\n" +
        "- **Helping-verb questions** keep the helping verb first: \"Is he driving a car?\" becomes \"Is a car being driven by him?\"\n" +
        "- **Question words stay in front:** \"Why did she open it?\" becomes \"Why was it opened by her?\"\n" +
        "- **Commands:** \"Close the door\" becomes \"Let the door be closed\"; \"Don't touch it\" becomes \"Let it not be touched\".\n" +
        "- **Let me, let us:** \"Let me do it\" becomes \"Let it be done by me\".",
      authoredExample: {
        prompt: "Change to the passive: Did the boy break the window?",
        steps: [
          "\"Did ... break\" is a simple past question, so the passive starts with was or were.",
          "The window (singular) becomes the subject: \"Was the window broken by the boy?\"",
        ],
        answer: "Was the window broken by the boy?",
      },
      selfCheckExample: {
        prompt: "Change to the passive: Open the gate.",
        steps: ["A command becomes Let + object + be + participle.", "\"Let the gate be opened.\""],
        answer: "Let the gate be opened.",
      },
      practiceSet: [
        { prompt: "Make passive: Who cleaned the room?", answer: "By whom was the room cleaned?" },
        { prompt: "Make passive: Does he write letters?", answer: "Are letters written by him?" },
        { prompt: "Make passive: Don't waste time.", answer: "Let time not be wasted." },
        { prompt: "Make active: By whom was the song sung?", answer: "Who sang the song?" },
      ],
      pyqExampleId: "0153a71b-ae6b-4069-9138-9f92c4ec3d03",
      traps: [
        {
          title: "Losing the question",
          body: "\"Did you buy it?\" does not become \"It was bought by you\". The passive is still a question: \"Was it bought by you?\"",
        },
        {
          title: "By who",
          body: "After by, the object form is needed: by whom, never by who.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscegrvo-modal",
      name: "Modals, two objects and verbs with a preposition",
      intuition:
        "A modal keeps its place and takes be + participle: must deliver becomes must be delivered. A verb with two objects (give, teach, send) can make either object the subject. A verb with a preposition keeps it: laugh at becomes be laughed at. And know takes to, not by.",
      definition:
        "- **Modal + be + participle:** can, could, will, would, shall, should, may, might, must + be + participle.\n" +
        "- **Modal + have been + participle:** might have completed becomes might have been completed.\n" +
        "- **Has to, have to:** has to bake becomes has to be baked.\n" +
        "- **Two objects:** \"The teacher gave her a prize\" becomes \"She was given a prize\" or \"A prize was given to her\".\n" +
        "- **Keep the preposition:** laugh at, look after, call up: \"is laughed at\", \"was looked after\".\n" +
        "- **Known to:** \"Everyone knows him\" becomes \"He is known to everyone\".\n" +
        "- **No doer needed:** \"Someone has stolen my bag\" becomes \"My bag has been stolen\".",
      authoredExample: {
        prompt: "Change to the passive: You should finish the report today.",
        steps: [
          "The modal should stays and takes be + participle: should be finished.",
          "The report becomes the subject; \"by you\" may stay or be dropped.",
        ],
        answer: "The report should be finished (by you) today.",
      },
      selfCheckExample: {
        prompt: "Change to the passive: The children laughed at the clown.",
        steps: ["Laugh at keeps its at.", "\"The clown was laughed at by the children.\""],
        answer: "The clown was laughed at by the children.",
      },
      practiceSet: [
        { prompt: "Make passive: We can solve this problem.", answer: "This problem can be solved by us." },
        { prompt: "Make passive: She might have sent the parcel.", answer: "The parcel might have been sent by her." },
        { prompt: "Make passive: Everyone knows the answer.", answer: "The answer is known to everyone." },
        { prompt: "Make passive with I as the subject: He gave me a book.", answer: "I was given a book by him." },
      ],
      pyqExampleId: "183511b3-ff44-47ca-8bd5-11cc2068b06c",
      traps: [
        {
          title: "Dropping the preposition",
          body: "\"The clown was laughed by the children\" loses the at. A verb's preposition stays with it in the passive.",
        },
        {
          title: "Known by",
          body: "SSC's keys use known to: \"He is known to everyone\", not \"known by everyone\".",
        },
      ],
    },
  ],
};
