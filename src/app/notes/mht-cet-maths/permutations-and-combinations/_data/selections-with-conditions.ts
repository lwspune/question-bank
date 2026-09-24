import type { SubtopicNote } from "@/app/notes/_types";

export const SELECTIONS_WITH_CONDITIONS_NOTE: SubtopicNote = {
  subtopicName: "Selections with Conditions — At Least, At Most, Included and Excluded",
  title: "Selections with Conditions — At Least, At Most, Included and Excluded",
  oneLineDefinition:
    "Choose a committee or a question set under a condition: list the cases for 'at least' and 'at most' and add the products of nCr terms, or subtract the forbidden selections from the unrestricted total.",
  whyItMatters:
    "7 PYQs at 43% HARD. These are committee and question-paper stems — a team with at most one boy, at least two from each section, two members who refuse to serve together — and the same linguistic-club question was set in two 2024 shifts. " +
    "There is one method, listing cases, and one shortcut, the complement; the HARD ones just have more cases, or a leader to choose after the team.",
  concepts: [
    // 1 — at least / at most by cases
    {
      kind: "formula" as const,
      slug: "cetpc-at-least-at-most-by-cases",
      name: "At Least and At Most: List the Cases and Add",
      intuition:
        "'At least \\(2\\) girls' in a committee of \\(5\\) means \\(2\\), \\(3\\), \\(4\\) or \\(5\\) girls — separate, mutually exclusive cases. Count each as a product of \\({}^nC_r\\) factors and add.",
      definition:
        "- \\(8\\) boys, \\(5\\) girls, committee of \\(5\\) with at least \\(2\\) girls AND at most \\(2\\) boys: the cases are \\((3G, 2B)\\), \\((4G, 1B)\\), \\((5G, 0B)\\): \\({}^5C_3\\,{}^8C_2 + {}^5C_4\\,{}^8C_1 + {}^5C_5\\,{}^8C_0 = 280 + 40 + 1 = 321\\).\n" +
        "- \\(11\\) questions in sections of \\(6\\) and \\(5\\), choose \\(6\\) with at least \\(2\\) from each: \\((2, 4)\\), \\((3, 3)\\), \\((4, 2)\\): \\(75 + 200 + 150 = 425\\).\n" +
        "- Committee of \\(11\\) from \\(8\\) males + \\(5\\) females with at least \\(6\\) males: \\((6, 5)\\), \\((7, 4)\\), \\((8, 3)\\): \\(28 + 40 + 10 = 78\\). 'At least \\(3\\) females' lists the SAME three cases, so \\(m = n = 78\\).\n" +
        "- Two conditions at once ('at least \\(2\\) girls' and 'at most \\(2\\) boys') intersect the case lists; write both ranges and keep only the pairs that satisfy both.",
      formula: {
        label: "Casework",
        latex:
          "\\sum_{\\text{cases}} {}^{a}C_{i}\\,{}^{b}C_{k-i}",
      },
      authoredExample: {
        prompt: "From \\(6\\) men and \\(4\\) women, a committee of \\(4\\) with at least \\(3\\) women is chosen. How many ways?",
        steps: [
          "Cases \\((3W, 1M)\\) and \\((4W, 0M)\\): \\({}^4C_3\\,{}^6C_1 + {}^4C_4\\,{}^6C_0 = 24 + 1\\).",
        ],
        answer: "\\(25\\)",
      },
      selfCheckExample: {
        prompt: "A paper has \\(4\\) questions in Part A and \\(6\\) in Part B. A student answers \\(5\\), at least \\(1\\) from Part A and at most \\(2\\) from Part A. How many ways?",
        steps: [
          "Part A count is \\(1\\) or \\(2\\): \\((1, 4)\\) and \\((2, 3)\\).",
          "\\({}^4C_1\\,{}^6C_4 + {}^4C_2\\,{}^6C_3 = 4 \\cdot 15 + 6 \\cdot 20 = 60 + 120 = 180\\).",
        ],
        answer: "\\(180\\)",
      },
      practiceSet: [
        {
          prompt: "Committee of \\(3\\) from \\(4\\) boys, \\(3\\) girls with at least \\(1\\) girl?",
          answer: "\\(31\\)",
          method: "\\(35 - {}^4C_3\\).",
        },
        {
          prompt: "Exactly \\(2\\) girls in that committee?",
          answer: "\\(12\\)",
        },
        {
          prompt: "At most \\(1\\) girl?",
          answer: "\\(22\\)",
          method: "\\(4 + 18\\).",
        },
        {
          prompt: "\\({}^5C_3 \\cdot {}^8C_2 = ?\\)",
          answer: "\\(280\\)",
        },
      ],
      pyqExampleId: "99a2533b-c524-471c-bdfe-ae9fb09262a5",
      traps: [
        {
          title: "Dropping a case",
          body:
            "'At least \\(2\\) from each of two sections when choosing \\(6\\)' has THREE cases: \\((2,4)\\), \\((3,3)\\), \\((4,2)\\). Missing \\((4,2)\\) gives \\(275\\), which is option (B).",
        },
      ],
    },

    // 2 — complement
    {
      kind: "formula" as const,
      slug: "cetpc-complement-subtract-the-forbidden",
      name: "The Complement: Unrestricted Total Minus the Forbidden Selections",
      intuition:
        "When the forbidden case is a single, easy count ('\\(A\\) and \\(B\\) both on the team'), count everything and subtract it. The complement of 'at least one' is 'none', which is one case.",
      definition:
        "- \\(2\\) boys of \\(5\\) and \\(3\\) girls of \\(7\\) with girls \\(A\\), \\(B\\) refusing to serve together: total \\({}^5C_2\\,{}^7C_3 = 350\\); both \\(A\\) and \\(B\\) in: \\({}^5C_2 \\cdot {}^5C_1 = 50\\); answer \\(300\\).\n" +
        "- 'At least one from each of \\(3\\) sections, \\(5\\) questions, \\(5\\) per section': list the distributions \\((1,1,3)\\) in \\(3\\) orders and \\((1,2,2)\\) in \\(3\\) orders: \\(3 \\cdot 5 \\cdot 5 \\cdot 10 + 3 \\cdot 5 \\cdot 10 \\cdot 10 = 750 + 1500 = 2250\\). Here the complement (a section left empty) needs inclusion–exclusion, so direct casework is quicker.\n" +
        "- Rule of thumb: complement when the forbidden event is ONE simple case; casework when the allowed event is a short list.",
      formula: {
        label: "Complement",
        latex:
          "\\text{allowed} = \\text{total} - \\text{forbidden}",
      },
      authoredExample: {
        prompt: "From \\(10\\) people a committee of \\(4\\) is chosen. Two particular people refuse to serve together. How many committees?",
        steps: [
          "Total \\({}^{10}C_4 = 210\\). Committees containing both: choose the other \\(2\\) from \\(8\\): \\({}^8C_2 = 28\\).",
          "\\(210 - 28 = 182\\).",
        ],
        answer: "\\(182\\)",
      },
      selfCheckExample: {
        prompt: "From \\(4\\) doctors and \\(5\\) engineers a group of \\(3\\) is chosen with at least one doctor. How many groups?",
        steps: [
          "Total \\({}^9C_3 = 84\\). No doctor: \\({}^5C_3 = 10\\).",
          "\\(84 - 10 = 74\\).",
        ],
        answer: "\\(74\\)",
      },
      practiceSet: [
        {
          prompt: "\\(3\\) of \\(7\\) with a particular one excluded?",
          answer: "\\(20\\)",
          method: "\\({}^6C_3\\).",
        },
        {
          prompt: "\\(3\\) of \\(7\\) with a particular one included?",
          answer: "\\(15\\)",
          method: "\\({}^6C_2\\).",
        },
        {
          prompt: "\\(3\\) of \\(7\\) with \\(A\\), \\(B\\) not both?",
          answer: "\\(30\\)",
          method: "\\(35 - 5\\).",
        },
        {
          prompt: "Subsets of a \\(5\\)-set with at least one element?",
          answer: "\\(31\\)",
        },
      ],
      pyqExampleId: "f3e0ddeb-70f8-42aa-bc70-b3bf8f773b24",
      traps: [
        {
          title: "Subtracting the wrong thing",
          body:
            "For '\\(A\\) and \\(B\\) not together', subtract committees with BOTH — not committees with either. Subtracting 'contains \\(A\\)' and 'contains \\(B\\)' removes too much.",
        },
      ],
    },

    // 3 — team then role
    {
      kind: "formula" as const,
      slug: "cetpc-select-then-assign-a-role",
      name: "Select the Team, Then Choose the Captain: Multiply by the Team Size",
      intuition:
        "A role picked from the selected members is a second stage: teams \\(\\times\\) (ways to pick the role-holder from the team). For a captain among \\(4\\) members that is \\(\\times 4\\), applied to the TOTAL of all cases.",
      definition:
        "- \\(6\\) girls, \\(4\\) boys, team of \\(4\\) with at most one boy, then a captain: teams \\({}^6C_4 + {}^4C_1\\,{}^6C_3 = 15 + 80 = 95\\); captain \\(\\times 4\\): \\(380\\).\n" +
        "- If the role-holder is constrained (the captain must be a girl), the multiplier changes per case; do it case by case.\n" +
        "- Two roles from the team: \\(\\times {}^4P_2\\) if the roles differ, \\(\\times {}^4C_2\\) if they are the same kind.",
      formula: {
        label: "Team then role",
        latex:
          "(\\text{number of teams}) \\times (\\text{team size})",
      },
      authoredExample: {
        prompt: "From \\(7\\) players a team of \\(5\\) is chosen and then a captain and a vice-captain are named from the team. How many ways?",
        steps: [
          "Teams \\({}^7C_5 = 21\\); two different roles from \\(5\\): \\({}^5P_2 = 20\\).",
          "\\(21 \\times 20 = 420\\).",
        ],
        answer: "\\(420\\)",
      },
      selfCheckExample: {
        prompt: "From \\(5\\) girls and \\(3\\) boys a team of \\(3\\) with at least \\(2\\) girls is chosen, and a leader is picked from the team. How many ways?",
        steps: [
          "Teams: \\((2G, 1B)\\) \\(10 \\times 3 = 30\\), \\((3G)\\) \\(10\\): \\(40\\) teams.",
          "Leader \\(\\times 3\\): \\(120\\).",
        ],
        answer: "\\(120\\)",
      },
      practiceSet: [
        {
          prompt: "\\(95\\) teams of \\(4\\), one captain each: ways?",
          answer: "\\(380\\)",
        },
        {
          prompt: "Team of \\(3\\) from \\(6\\), then a captain?",
          answer: "\\(60\\)",
        },
        {
          prompt: "Same, but captain and secretary (different)?",
          answer: "\\(120\\)",
        },
        {
          prompt: "Is 'choose captain first, then \\(3\\) more' the same count?",
          answer: "Yes: \\(6 \\times {}^5C_3 = 60\\).",
        },
      ],
      pyqExampleId: "f829b00f-cc92-421a-84d8-21c0d7219b5c",
      traps: [
        {
          title: "Stopping at the team count",
          body:
            "\\(95\\) is offered as option (A) on the linguistic-club stem. The captain multiplies it by \\(4\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Fundamental Principle, nPr and nCr — the identities behind nCr casework",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-fundamentals",
    },
    {
      label: "Counting Numbers and Geometric Figures — the complement again, for collinear points",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-counting-numbers-and-figures",
    },
  ],
};
