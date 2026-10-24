import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RVD_COUNTING_NOTE: SubtopicNote = {
  subtopicName: "Counting from a Venn Diagram",
  title: "Counting from a Venn Diagram",
  oneLineDefinition:
    "A drawn diagram puts a number in each region of overlapping circles, and the question asks how many belong to a described part: only one class, both of two, exactly two, or one class but not another.",
  whyItMatters:
    "Fourteen questions in the bank, all from the 2024 shifts, and 13 of them EASY. The arithmetic is a sum of two or three numbers; the marks are lost by reading the wrong regions, so naming each region before adding is the whole skill.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrvdco-regions",
      name: "Reading one region at a time",
      intuition:
        "Three overlapping circles make seven regions: three where a circle stands alone, three where two circles overlap without the third, and one middle region inside all three. Every question names some of these regions, so name them first and only then add.",
      definition:
        "- **Only A:** the part of circle A outside both other circles.\n" +
        "- **A and B only (but not C):** the overlap of A and B outside C.\n" +
        "- **All three:** the middle region.\n" +
        "- **Exactly one:** the three \"only\" regions added. **Exactly two:** the three \"two only\" regions added.\n" +
        "- **More than one:** exactly two plus all three.\n" +
        "- **Fast route:** point at each region the question names before you write any number; most wrong options add one region too many.",
      authoredExample: {
        prompt:
          "In a diagram of three circles, Tea only holds 20, Coffee only 15, Juice only 10, Tea and Coffee only 6, Coffee and Juice only 4, Tea and Juice only 5, and all three 3. How many people like only tea or only juice?",
        steps: ["Only tea is 20. Only juice is 10.", "Add the two \"only\" regions: 20 + 10 = 30."],
        answer: "30",
      },
      selfCheckExample: {
        prompt:
          "In a diagram of three circles, the regions for exactly two circles hold 8, 7 and 12, and the middle region holds 6. How many people are in more than one circle?",
        steps: ["Exactly two: 8 + 7 + 12 = 27.", "More than one adds the middle: 27 + 6 = 33."],
        answer: "33",
      },
      practiceSet: [
        { prompt: "In a two-circle diagram, A only is 12, B only is 9 and the overlap is 5. How many are in A only or B only?", answer: "21" },
        { prompt: "In a three-circle diagram the only-regions hold 30, 20 and 15. How many people are in exactly one circle?", answer: "65" },
        { prompt: "How many regions does a diagram of three overlapping circles have?", answer: "7" },
        { prompt: "Which single region belongs to all three circles?", answer: "The middle region" },
      ],
      pyqExampleId: "c86af310-6517-4090-9b51-70195add456f",
      traps: [
        {
          title: "Adding an overlap when the question says only",
          body:
            "\"Only tea\" excludes every region shared with another circle. Use the part of the Tea circle that touches no other circle.",
        },
        {
          title: "Counting the middle region as exactly two",
          body:
            "The middle region is in all three circles, so it is not part of \"exactly two\". Add it only when the question asks for two or more.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrvdco-sums",
      name: "Adding the regions of a described group",
      intuition:
        "\"People who like tea\" means every region inside the Tea circle, whatever else they like. \"Tea and coffee both\" means every region inside both circles, including the middle. Build the group region by region and add.",
      definition:
        "- **All of A:** only A + each two-circle region inside A + the middle.\n" +
        "- **A and B both:** the A and B only region + the middle.\n" +
        "- **A but not C:** the regions inside A that are outside C: only A and the A and B only region.\n" +
        "- **A and B but not C:** the A and B only region alone.\n" +
        "- **Difference questions:** work out each group first, then subtract.\n" +
        "- **Fast route:** for \"both\" questions, the answer is always one two-circle region plus the middle region.",
      formula: {
        label: "The whole of one circle in a three-circle diagram",
        latex: "n(A) = \\text{only } A + (A \\cap B \\text{ only}) + (A \\cap C \\text{ only}) + (A \\cap B \\cap C)",
      },
      authoredExample: {
        prompt:
          "In a diagram of three circles, Tea only holds 20, Coffee only 15, Juice only 10, Tea and Coffee only 6, Coffee and Juice only 4, Tea and Juice only 5, and all three 3. How many people like tea?",
        steps: ["Inside the Tea circle: Tea only 20, Tea and Coffee only 6, Tea and Juice only 5, all three 3.", "Add them: 20 + 6 + 5 + 3 = 34."],
        answer: "34",
      },
      selfCheckExample: {
        prompt:
          "In a diagram of three circles, Coffee only holds 15, Tea and Coffee only 6, Coffee and Juice only 4, and all three 3. How many people like coffee but not juice?",
        steps: ["Inside Coffee and outside Juice: Coffee only 15 and Tea and Coffee only 6.", "Add them: 15 + 6 = 21."],
        answer: "21",
      },
      practiceSet: [
        { prompt: "In a two-circle diagram, A only is 12, the overlap is 5 and B only is 9. How many are in A?", answer: "17" },
        { prompt: "In the same kind of diagram, with A only 12, overlap 5 and B only 9, how many are in A or B or both?", answer: "26" },
        { prompt: "In a three-circle diagram, the Tea and Coffee only region holds 11 and the middle region holds 4. How many like tea and coffee both?", answer: "15" },
        { prompt: "Which regions make up \"A but not C\" in a three-circle diagram?", answer: "Only A, and the A and B only region" },
      ],
      pyqExampleId: "afa64778-297a-454b-bbcc-327ffa714889",
      traps: [
        {
          title: "Leaving out the middle region from \"both\"",
          body:
            "People who like tea and coffee include those who like all three. Add the Tea and Coffee only region and the middle region.",
        },
        {
          title: "Keeping regions inside the excluded circle",
          body:
            "\"Women entrepreneurs who are not Indian\" must leave out every region inside the Indian circle, including the middle one. Strike those regions before you add.",
        },
      ],
    },
  ],
};
