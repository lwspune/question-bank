import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RST_ASSUMPTIONS_NOTE: SubtopicNote = {
  subtopicName: "Statement and Assumptions",
  title: "Statement and Assumptions",
  oneLineDefinition:
    "A statement, often a claim or a piece of advice, and two or three assumptions: an assumption is implicit if the statement takes it for granted without saying it.",
  whyItMatters:
    "Eighteen questions in the bank, all from the 2025 shifts, and 17 of them MODERATE, the hardest page of the chapter. Most statements are long and written like a news report, so the skill is finding the one belief each claim depends on.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrstas-implicit",
      name: "What a claim takes for granted",
      intuition:
        "An assumption is the unstated belief a statement rests on. The test is simple: imagine the assumption is false. If the statement then stops making sense, the assumption was implicit. If the statement still stands, it was not.",
      definition:
        "- **Implicit:** the statement needs it. Advice to do X so that Y happens assumes X can bring about Y.\n" +
        "- **Not implicit:** it goes beyond the statement, adds a new idea, or uses a stronger word (all, only, most important) than the statement needs.\n" +
        "- A fact the statement already says outright is part of what it takes for granted; these questions count it as implicit.\n" +
        "- \"May\", \"can\" and \"could\" in the statement do not make anything certain, so an assumption that something \"will\" happen is not implicit.\n" +
        "- **Fast route:** for each assumption, ask \"If this were false, would the statement still make sense?\" Answer yes means not implicit.",
      authoredExample: {
        prompt:
          "Statement: \"Carry an umbrella; it may rain this evening.\" Assumptions: I. An umbrella protects from rain. II. It will certainly rain this evening. Which are implicit?",
        steps: [
          "I: if an umbrella gave no protection, the advice would make no sense. I is implicit.",
          "II: the statement says only that it may rain. II is not implicit.",
        ],
        answer: "Only I",
      },
      selfCheckExample: {
        prompt:
          "Statement: \"Learn some French before your trip to Paris to make your stay easier.\" Assumptions: I. French is spoken in Paris. II. Everyone in Paris speaks only French. Which are implicit?",
        steps: [
          "I: if no one in Paris spoke French, learning it would not help. I is implicit.",
          "II: the advice needs French to be spoken, not to be the only language. II is not implicit.",
        ],
        answer: "Only I",
      },
      practiceSet: [
        { prompt: "What is the quickest test for an assumption?", answer: "Imagine it is false and see whether the statement still makes sense." },
        { prompt: "Statement: \"Buy this phone for its long battery life.\" Is \"Battery life matters to buyers\" implicit?", answer: "Yes" },
        { prompt: "Must an implicit assumption be stated in the passage?", answer: "No: it is taken for granted, not said." },
        { prompt: "Statement: \"The exam may be postponed.\" Is \"The exam will be postponed\" implicit?", answer: "No" },
      ],
      pyqExampleId: "53d63342-be92-4aa8-b0f6-38524a647f4f",
      traps: [
        {
          title: "Accepting an assumption with a stronger word",
          body:
            "If a statement lists biodiversity loss as one effect of deforestation, \"biodiversity loss is the most significant effect\" is not implicit. Words like most, only and all usually claim more than the statement needs.",
        },
        {
          title: "Accepting an assumption that is merely true",
          body:
            "An assumption can be a true fact and still not be implicit. Ask whether the statement depends on it, not whether it is correct.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrstas-decision",
      name: "Assumptions behind a decision or a notice",
      intuition:
        "When an authority makes a decision or puts up a notice, it acts on a belief about what the step will achieve. That belief is implicit. Beliefs about other motives, rivals or side effects are not, unless the statement mentions them.",
      definition:
        "- **Implicit:** the decision will help with the aim it is made for, and the aim matters to the people making it.\n" +
        "- **Not implicit:** a hidden motive, a comparison with others, or a claim that the step is the only one possible.\n" +
        "- **Notices and bans:** a ban assumes the banned thing causes some harm in that place.\n" +
        "- **Fast route:** name the aim of the decision in a few words. An assumption that the step serves that aim is implicit; anything else needs support from the statement.",
      authoredExample: {
        prompt:
          "Statement: The city has opened a new flyover to ease traffic on the main road. Assumptions: I. The flyover will reduce traffic on the main road. II. The city has no other roads. Which are implicit?",
        steps: [
          "I: the flyover is built to ease traffic, so the city must believe it will. I is implicit.",
          "II: nothing in the statement depends on the city having no other roads. II is not implicit.",
        ],
        answer: "Only I",
      },
      selfCheckExample: {
        prompt:
          "Statement: A school asks students to bring water bottles during summer. Assumptions: I. Students may get thirsty in summer. II. The school has no drinking water. Which are implicit?",
        steps: [
          "I: the request makes sense only if students may need water. I is implicit.",
          "II: the school may have drinking water and still want students to carry bottles. II is not implicit.",
        ],
        answer: "Only I",
      },
      practiceSet: [
        { prompt: "Notice: \"Keep your bags with you at all times.\" Is \"Unattended bags may be at risk\" implicit?", answer: "Yes" },
        { prompt: "A hospital extends its visiting hours. Is \"Visits help patients or their families\" implicit?", answer: "Yes" },
        { prompt: "A town bans plastic bags. Is \"Plastic bags cause harm in the town\" implicit?", answer: "Yes" },
        { prompt: "A decision is made to reach an aim. Is a hidden motive the statement never mentions implicit?", answer: "No" },
      ],
      pyqExampleId: "b85e61b0-cde5-4e39-a7b0-51a089679c74",
      traps: [
        {
          title: "Inventing a motive",
          body:
            "Closing a road for repairs assumes the repairs are needed. It does not assume the town wants more people to take the bus unless the statement says so.",
        },
        {
          title: "Reading a request as proof of a shortage",
          body:
            "Asking students to carry water does not assume the school has none. A decision assumes its aim, not the worst possible reason for it.",
        },
      ],
    },
  ],
};
