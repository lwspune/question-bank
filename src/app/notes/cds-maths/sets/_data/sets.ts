import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SE_SETS_NOTE: SubtopicNote = {
  subtopicName: "Sets and Set Operations",
  title: "Sets and Set Operations",
  oneLineDefinition:
    "A set is decided by its members alone; union, intersection, difference and complement build new sets from old.",
  whyItMatters:
    "Eight PYQs, one of them HARD. Most test a definition precisely: {0} is not the empty set, {a} is not the element a, the complement of the universal set is empty, and the set of birds on Earth is finite. Work out each set's members before comparing them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsse-sets",
      name: "Members, operations and special sets",
      intuition:
        "Two sets are equal exactly when they have the same members. So list the members first — then union, intersection and difference are just counting which members survive.",
      definition:
        "- \\(A - B\\): members of \\(A\\) not in \\(B\\). \\(A \\cap B\\): in both. \\(A \\cup B\\): in either.\n" +
        "- The null set \\(\\phi\\) has no members; \\(\\{0\\}\\) and \\(\\{\\phi\\}\\) each have ONE member, so neither is empty.\n" +
        "- An element that is itself a set is different from its member: \\(\\{a\\} \\ne a\\).\n" +
        "- Finite: a definite (possibly huge) count. The real numbers between two values are infinite.\n" +
        "- The complement of the universal set is \\(\\phi\\).\n" +
        "- Multiples of \\(7\\) and of \\(5\\) intersect in the multiples of \\(35\\).",
      formula: {
        label: "Difference",
        latex: "A - B = \\{x : x \\in A,\\ x \\notin B\\}",
      },
      authoredExample: {
        prompt: "\\(A = \\{2, 4, 6, 8\\}\\) and \\(B = \\{4, 8, 12\\}\\). Find \\(A - B\\) and \\(B - A\\).",
        steps: ["Remove \\(4\\) and \\(8\\) from \\(A\\); remove \\(4\\) and \\(8\\) from \\(B\\)."],
        answer: "\\(\\{2, 6\\}\\) and \\(\\{12\\}\\).",
      },
      selfCheckExample: {
        prompt: "Is \\(\\{x \\in \\mathbb{Z} : x^2 = 4\\}\\) the null set, a singleton, or neither?",
        steps: ["\\(x = 2\\) or \\(x = -2\\)."],
        answer: "Neither: it has two members.",
      },
      practiceSet: [
        { prompt: "Members of \\(\\{\\phi\\}\\)?", answer: "One" },
        { prompt: "Multiples of \\(4\\) \\(\\cap\\) multiples of \\(6\\)?", answer: "Multiples of \\(12\\)" },
        { prompt: "Is the set of stars in the galaxy finite?", answer: "Yes" },
        { prompt: "\\(\\{a, \\{b\\}\\} \\cap \\{\\{a\\}, b\\}\\)?", answer: "\\(\\phi\\)" },
      ],
      pyqExampleId: "723ae557-a27e-4151-be2b-91bc6ae2259d", // 2016 (II) — A − B and B − A
      traps: [
        {
          title: "{0} is not empty",
          body:
            "The solution set of \\(x + 5 = 5\\) is \\(\\{0\\}\\), a set with one member. The empty set has none, and \\(\\{\\phi\\}\\) has one member, the empty set.",
        },
        {
          title: "Large is not infinite",
          body:
            "However many birds there are, their number is a whole number, so the set is finite. 'Infinite' means no count exists at all.",
        },
      ],
    },
  ],
};
