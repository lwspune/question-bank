import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_AV_SEQUENCES_NOTE: SubtopicNote = {
  subtopicName: "Averages of Consecutive Numbers",
  title: "Averages of Consecutive Numbers",
  oneLineDefinition:
    "Equally spaced numbers average to their middle term, which is also the average of the first and the last.",
  whyItMatters:
    "Eight PYQs, one of them HARD. Consecutive integers, consecutive evens, 11 to 99, the first hundred odd numbers: each is equally spaced, so the average is the middle term and no adding is needed. The one list that is NOT equally spaced, the composite numbers, has to be written out.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsav-sequence",
      name: "The middle term",
      intuition:
        "In an equally spaced list, the terms pair off from the two ends, each pair averaging to the middle. So the whole list averages to the middle term, or to half of first plus last.",
      definition:
        "- Equally spaced: average \\(= \\dfrac{\\text{first} + \\text{last}}{2} =\\) the middle term.\n" +
        "- \\(n\\) consecutive integers averaging \\(A\\): largest \\(= A + \\dfrac{n - 1}{2}\\).\n" +
        "- Extending \\(n\\) consecutive numbers by \\(k\\) more raises the average by \\(\\dfrac k2\\).\n" +
        "- First \\(n\\) odd numbers: average \\(n\\). First \\(n\\) even numbers: average \\(n + 1\\).\n" +
        "- Lists that are not equally spaced (primes, composites): write them out and add.",
      formula: {
        label: "Equally spaced list",
        latex: "\\text{average} = \\dfrac{\\text{first} + \\text{last}}{2}",
      },
      authoredExample: {
        prompt: "The average of \\(7\\) consecutive integers is \\(40\\). Find the largest.",
        steps: ["The middle (fourth) term is \\(40\\); the largest is three more."],
        answer: "\\(43\\).",
      },
      selfCheckExample: {
        prompt: "The average of \\(20\\) consecutive numbers is \\(y\\). Six more consecutive numbers follow on. Find the new average.",
        steps: ["The list extends by \\(6\\), so the middle moves up by \\(3\\)."],
        answer: "\\(y + 3\\).",
      },
      practiceSet: [
        { prompt: "Average of \\(5, 10, \\ldots, 50\\)?", answer: "\\(27.5\\)" },
        { prompt: "First \\(30\\) odd numbers. Average?", answer: "\\(30\\)" },
        { prompt: "First \\(30\\) even numbers. Average?", answer: "\\(31\\)" },
        { prompt: "\\(x, x + 3, x + 6, x + 9, x + 12\\) average \\(m\\). \\(x\\)?", answer: "\\(m - 6\\)" },
      ],
      pyqExampleId: "a8a4dad2-27a1-4b5c-bcd9-a39b14456a0d", // 2018 (I) — 9 consecutive integers average 55
      traps: [
        {
          title: "Only for equally spaced lists",
          body:
            "The first ten composite numbers \\(4, 6, 8, 9, 10, 12, 14, 15, 16, 18\\) are not equally spaced; first plus last over two gives \\(11\\), but the true average is \\(11.2\\).",
        },
      ],
    },
  ],
};
