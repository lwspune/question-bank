import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DED_SYLLOGISMS_NOTE: SubtopicNote = {
  subtopicName: "Syllogisms and Venn Diagrams",
  title: "Syllogisms: Reasoning with All, Some and No",
  oneLineDefinition:
    "Two statements about groups can force a third; a Venn diagram drawn in every allowed way shows whether a conclusion must, could or cannot be true.",
  whyItMatters:
    "A 2026 ministry question joined a \"some\" statement to an \"all\" statement and asked what follows; a 2012 question asked which statement about three overlapping groups is definitely not true.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-ded-venn",
      name: "Drawing all, some and no statements as Venn diagrams",
      intuition:
        "Each group is a circle, and each statement tells you something about one region of the picture. \"All A are B\" says the part of A outside B is empty. \"Some A are B\" says the overlap has at least one member. Once every statement is drawn, you read conclusions from the regions, not from the words.",
      definition:
        "In a **Venn diagram** each set is a circle; overlapping circles share members.\n" +
        "- **All A are B**: circle A sits inside circle B (the region \"A but not B\" is empty).\n" +
        "- **No A are B**: the circles do not overlap.\n" +
        "- **Some A are B**: the overlap contains at least one member (mark it with a cross).\n" +
        "- **Some A are not B**: the part of A outside B contains at least one member.\n" +
        "- \"All A are B\" says nothing about whether every B is an A: B may be larger.",
      table: {
        columns: ["Statement", "How to draw it", "Region you know about"],
        rows: [
          { cells: ["All A are B", "A drawn inside B", "A outside B is empty"] },
          { cells: ["No A are B", "A and B drawn apart", "The overlap of A and B is empty"] },
          { cells: ["Some A are B", "A and B overlapping, cross in the overlap", "The overlap has a member"] },
          { cells: ["Some A are not B", "Cross in A, outside B", "A outside B has a member"] },
          { cells: ["Only As are Bs", "B drawn inside A", "B outside A is empty"] },
        ],
        caption: "Draw empty regions first, then place the crosses where they are forced to go.",
      },
      selfCheckExample: {
        prompt:
          "In an orchestra, all violinists can read music, and some drummers cannot read music. Which statement must be true?",
        options: [
          "No drummers are violinists.",
          "Some drummers are not violinists.",
          "Some violinists are drummers.",
          "Everyone who can read music is a violinist.",
          "Some drummers can read music.",
        ],
        steps: [
          "Violinists sit inside the circle of music readers. Some drummer stands outside that circle.",
          "That drummer cannot be a violinist, because every violinist is inside the circle. So at least one drummer is not a violinist: B.",
          "A and C are about other drummers, who may or may not play the violin. D reverses the \"all\" statement. E may be true but nothing forces it.",
        ],
        answer: "(B) Some drummers are not violinists.",
      },
      practiceSet: [
        { prompt: "All roses are flowers. Does it follow that all flowers are roses?", answer: "No", method: "A inside B says nothing about the rest of B" },
        { prompt: "How do you draw \"No fish are mammals\"?", answer: "Two circles that do not touch" },
        { prompt: "\"Only nurses wear the blue badge.\" Which circle goes inside which?", answer: "Blue-badge wearers inside nurses", method: "Only As are Bs means all Bs are As" },
      ],
      traps: [
        {
          title: "\"All A are B\" does not reverse",
          body: "All cats are mammals, yet many mammals are not cats. An option that swaps the two groups of an \"all\" statement is the converse and does not follow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ded-syllogism-test",
      name: "Testing a conclusion: must be true, could be true, cannot be true",
      intuition:
        "A conclusion follows only if it holds in every diagram that fits the premises. So try to break it: draw the premises in the least helpful way you can. If one allowed drawing makes the conclusion false, it does not follow. If no allowed drawing makes it true, it cannot be true.",
      definition:
        "For each option, ask which of three kinds it is:\n" +
        "- **Must be true**: true in every diagram that fits the premises.\n" +
        "- **Could be true**: true in some fitting diagrams, false in others.\n" +
        "- **Cannot be true**: false in every fitting diagram.\n" +
        "Useful patterns:\n" +
        "- All A are B, all B are C: all A are C.\n" +
        "- Some A are B, all B are C: some A are C.\n" +
        "- All A are B, no B are C: no A are C.\n" +
        "- Two \"some\" premises never force a conclusion.",
      authoredExample: {
        prompt:
          "Premises: \"Some cyclists are teachers. All teachers are graduates.\" Classify: (i) Some cyclists are graduates. (ii) All cyclists are graduates. (iii) Some graduates are not cyclists.",
        steps: [
          "Draw teachers inside graduates, and put a cross where cyclists overlap teachers.",
          "That cross is inside the graduates circle too, so at least one cyclist is a graduate in every drawing: (i) must be true.",
          "The cyclists circle may stick out beyond the graduates circle or stay inside it, so (ii) could be true but need not be.",
          "The graduates circle may or may not reach outside the cyclists circle, so (iii) could be true but need not be.",
        ],
        answer: "(i) must be true; (ii) and (iii) could be true",
      },
      selfCheckExample: {
        prompt:
          "In a garden, all herbs are green, and no green plant is poisonous. Which statement cannot be true?",
        options: [
          "No herbs in the garden are poisonous.",
          "Some green plants in the garden are herbs.",
          "Some poisonous plants in the garden are not green.",
          "Some herbs in the garden are poisonous.",
          "All green plants in the garden are herbs.",
        ],
        steps: [
          "Herbs sit inside green plants, and the poisonous circle lies apart from green plants. So the poisonous circle cannot touch the herbs.",
          "D needs a herb inside the poisonous circle, which no drawing allows. D cannot be true.",
          "A must be true. B must be true if the garden has herbs. C and E are possible: nothing rules them out.",
        ],
        answer: "(D) Some herbs in the garden are poisonous.",
      },
      practiceSet: [
        { prompt: "All X are Y. All Y are Z. Must all X be Z?", answer: "Yes" },
        { prompt: "Some X are Y. Some Y are Z. Must some X be Z?", answer: "No", method: "Two \"some\" premises force nothing" },
        { prompt: "No X are Y. All Z are Y. What follows about Z and X?", answer: "No Z are X", method: "Z sits inside Y, which is apart from X" },
        { prompt: "All P are Q. Some R are not Q. Must some R be not P?", answer: "Yes", method: "An R outside Q is outside P too" },
      ],
      traps: [
        {
          title: "Two \"some\" statements prove nothing",
          body: "\"Some A are B\" and \"some B are C\" can be drawn with the A members and the C members in different parts of B. So \"some A are C\" is only a could-be. Options built from two \"some\" premises are never \"must be true\".",
        },
        {
          title: "Some does not mean not all",
          body: "\"Some students passed\" is still true if every student passed. An option that reads \"some\" as \"some but not all\" adds a claim that was never made.",
        },
      ],
    },
  ],
};
