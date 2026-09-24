import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCULAR_ARRANGEMENTS_NOTE: SubtopicNote = {
  subtopicName: "Circular Arrangements",
  title: "Circular Arrangements",
  oneLineDefinition:
    "n distinct people around a round table sit in (n − 1)! ways because rotations are the same seating — and every row move (block, gap, complement) carries over with that one change.",
  whyItMatters:
    "6 PYQs at 83% HARD — the densest HARD page in the chapter, and all six are 2023–2025. " +
    "The stems are a special pair or trio that must not sit together, girls kept apart around a table, two tables of different sizes, alternating genders with a couple kept together, and a hat-colouring of a five-seat circle. " +
    "Each is a row problem with (n − 1)! in place of n!, plus the gap method, which is where most of the marks are lost.",
  concepts: [
    // 1 — (n-1)! and the gap method
    {
      kind: "formula" as const,
      slug: "cetpc-round-table-and-gaps",
      name: "(n − 1)! Around a Table, and Girls Apart via the Gaps Between Boys",
      intuition:
        "Fix one person to kill the rotations; the other \\(n - 1\\) arrange in \\((n-1)!\\) ways. To keep girls apart, seat the boys first — \\(n\\) boys around a table make \\(n\\) gaps (not \\(n + 1\\)) — and drop the girls into different gaps.",
      definition:
        "- \\(n\\) distinct people, round table: \\((n - 1)!\\). If clockwise and anticlockwise count as the same (a necklace), \\(\\dfrac{(n-1)!}{2}\\).\n" +
        "- \\(6\\) boys and \\(5\\) girls, no two girls together: boys \\(5! = 120\\); \\(6\\) gaps; girls \\({}^6P_5 = 720\\); total \\(86{,}400\\).\n" +
        "- Feasibility: \\(g\\) girls need \\(g \\le b\\) gaps around a circle (against \\(g \\le b + 1\\) in a row).\n" +
        "- **Two tables** of \\(12\\) and \\(9\\) for \\(21\\) friends: choose the first table's people \\({}^{21}C_{12}\\), then seat both tables \\(11!\\) and \\(8!\\): \\(\\dfrac{21!}{12!\\,9!}\\cdot 11!\\cdot 8! = \\dfrac{21!}{12 \\cdot 9} = \\dfrac{35}{9}\\cdot 19!\\).",
      formula: {
        label: "Circular permutations",
        latex:
          "(n - 1)! \\qquad \\text{girls apart: } (b - 1)! \\times {}^{b}P_{g}",
      },
      authoredExample: {
        prompt: "In how many ways can \\(4\\) boys and \\(3\\) girls sit around a round table so that no two girls are adjacent?",
        steps: [
          "Boys around the table: \\(3! = 6\\), making \\(4\\) gaps.",
          "Girls into \\(3\\) of the \\(4\\) gaps: \\({}^4P_3 = 24\\). Total \\(144\\).",
        ],
        answer: "\\(144\\)",
      },
      selfCheckExample: {
        prompt: "Ten guests are split between two round tables seating \\(6\\) and \\(4\\). In how many ways can they be seated?",
        steps: [
          "Choose the six: \\({}^{10}C_6 = 210\\). Seat: \\(5! \\times 3! = 720\\).",
          "\\(210 \\times 720 = 151{,}200\\).",
        ],
        answer: "\\(151{,}200\\)",
      },
      practiceSet: [
        {
          prompt: "\\(6\\) people round a table?",
          answer: "\\(120\\)",
        },
        {
          prompt: "\\(6\\) beads on a necklace?",
          answer: "\\(60\\)",
        },
        {
          prompt: "Gaps made by \\(5\\) people round a table?",
          answer: "\\(5\\)",
        },
        {
          prompt: "\\(5\\) boys, \\(5\\) girls alternate round a table?",
          answer: "\\(4! \\times 5! = 2880\\)",
        },
      ],
      pyqExampleId: "a18d6538-13c8-434a-90df-35a85e2df9e5",
      traps: [
        {
          title: "Using n + 1 gaps on a circle",
          body:
            "Six boys in a ROW make \\(7\\) gaps; around a TABLE they make \\(6\\). \\({}^7P_5\\) instead of \\({}^6P_5\\) is how the wrong options are built.",
        },
      ],
    },

    // 2 — never together on a circle
    {
      kind: "formula" as const,
      slug: "cetpc-never-together-around-a-table",
      name: "Never Together Around a Table: Total Minus the Glued Block",
      intuition:
        "A group that must not sit together is counted by complement: all seatings \\((n-1)!\\) minus the seatings with the group glued, which is \\((n - k)!\\) for the blocks times \\(k!\\) inside. For just two people, the gap method is equally quick.",
      definition:
        "- \\(6\\) boys + \\(4\\) girls, two special boys and a special girl never all together: total \\(9!\\); glued trio: \\((10 - 3 + 1 - 1)! \\times 3! = 7! \\times 6 = 30{,}240\\); answer \\(362{,}880 - 30{,}240 = 332{,}640\\).\n" +
        "- Blocks around a circle: \\(m\\) units seat in \\((m - 1)!\\) ways, so a block of \\(k\\) among \\(n\\) people gives \\((n - k)!\\cdot k!\\) glued seatings.\n" +
        "- \\(5\\) boys + \\(3\\) girls, \\(B_1\\) and \\(G_1\\) never adjacent, by gaps: seat the other \\(6\\) in \\(5!\\); \\(6\\) gaps; \\(B_1, G_1\\) into two different gaps \\({}^6P_2 = 30\\): \\(120 \\times 30 = 3600 = 5 \\times 6!\\).\n" +
        "- 'Never all three together' (trio) differs from 'no two of the three adjacent'; the PYQ wording is the trio, so only the fully-glued case is subtracted.",
      formula: {
        label: "Glued block on a circle",
        latex:
          "(n - 1)! - (n - k)!\\,k!",
      },
      authoredExample: {
        prompt: "Seven people sit around a round table. In how many ways can they sit if two particular people are not adjacent?",
        steps: [
          "Total \\(6! = 720\\). Glued pair: \\(5! \\times 2! = 240\\).",
          "\\(720 - 240 = 480\\).",
        ],
        answer: "\\(480\\)",
      },
      selfCheckExample: {
        prompt: "Eight people sit around a round table. Three particular friends must not sit all together. How many seatings?",
        steps: [
          "Total \\(7! = 5040\\). Trio glued: \\(5! \\times 3! = 720\\).",
          "\\(5040 - 720 = 4320\\).",
        ],
        answer: "\\(4320\\)",
      },
      practiceSet: [
        {
          prompt: "\\(5\\) round a table, \\(A\\) and \\(B\\) adjacent?",
          answer: "\\(12\\)",
          method: "\\(3! \\times 2\\).",
        },
        {
          prompt: "\\(5\\) round a table, \\(A\\) and \\(B\\) apart?",
          answer: "\\(12\\)",
          method: "\\(24 - 12\\).",
        },
        {
          prompt: "\\(6\\) round a table, a trio together?",
          answer: "\\(36\\)",
          method: "\\(3! \\times 3!\\).",
        },
        {
          prompt: "\\(5 \\times 6! = ?\\)",
          answer: "\\(3600\\)",
        },
      ],
      pyqExampleId: "b4a6adc1-be5a-4d7b-98d7-e03835cf3878",
      traps: [
        {
          title: "Gluing on a circle with row arithmetic",
          body:
            "A block among \\(10\\) people on a circle leaves \\(8\\) units, seated in \\(7!\\) ways, not \\(8!\\). Using \\(8! \\times 3!\\) subtracts too much and lands on a non-option.",
        },
      ],
    },

    // 3 — alternating with a couple together; colourings
    {
      kind: "formula" as const,
      slug: "cetpc-alternating-seats-and-adjacent-colourings",
      name: "Alternating Seats With a Couple Together, and Colouring a Circle",
      intuition:
        "Two 2025 stems that look exotic are ordinary once the frame is fixed. Alternating genders fixes which seats are male and which female, so the count is \\(\\text{(boys)}! \\times \\text{(girls)}!\\) once the couple's block is placed. Colouring seats so neighbours differ is a small recurrence.",
      definition:
        "- **Mother, father and \\(4\\) boys + \\(4\\) girls, alternating, parents together**: the parents form the one male–female adjacent pair; fixing that block fixes the alternation around the table. Remaining boys \\(4!\\) and girls \\(4!\\): \\(576\\), the official answer. (Counting the block's two orientations separately would double it; the key keeps one.)\n" +
        "- **Proper colourings of a cycle** of \\(n\\) seats with \\(k\\) colours, neighbours different: \\((k-1)^n + (-1)^n(k-1)\\). Five seats, three colours: \\(2^5 - 2 = 30\\).\n" +
        "- Why: a PATH of \\(n\\) seats has \\(k(k-1)^{n-1}\\) colourings; closing the path into a cycle subtracts those where the two ends match, which gives the recurrence above.",
      formula: {
        label: "Cycle colourings",
        latex:
          "P(C_n, k) = (k-1)^n + (-1)^n (k-1) \\qquad P(C_5, 3) = 32 - 2 = 30",
      },
      authoredExample: {
        prompt: "Four chairs are placed around a round table. Each chair is painted one of \\(3\\) colours so that no two adjacent chairs share a colour. How many colourings?",
        steps: [
          "\\(n = 4\\), \\(k = 3\\): \\((3-1)^4 + (-1)^4(3-1) = 16 + 2 = 18\\).",
        ],
        answer: "\\(18\\)",
      },
      selfCheckExample: {
        prompt: "Four boys and four girls sit around a round table with boys and girls alternating. A particular boy \(B_1\) and a particular girl \(G_1\) must be adjacent. How many seatings?",
        steps: [
          "Fix \(B_1\) to kill rotations; the alternation then fixes which seats are girls'. \(G_1\) takes one of the \(2\) girl-seats next to him.",
          "Other boys \(3!\), other girls \(3!\): \(2 \times 6 \times 6 = 72\).",
        ],
        answer: "\(72\)",
      },
      practiceSet: [
        {
          prompt: "Six seats in a cycle, \\(2\\) colours, neighbours different?",
          answer: "\\(2\\)",
        },
        {
          prompt: "Five seats in a cycle, \\(2\\) colours, neighbours different?",
          answer: "\\(0\\)",
        },
        {
          prompt: "A row of \\(5\\) seats, \\(3\\) colours, neighbours different?",
          answer: "\\(48\\)",
          method: "\\(3 \\cdot 2^4\\).",
        },
        {
          prompt: "\\(4\\) boys and \\(4\\) girls alternate round a table?",
          answer: "\\(3! \\times 4! = 144\\)",
        },
      ],
      pyqExampleId: "9a6ec3bd-084a-4376-81ff-a5fe2cc3361d",
      traps: [
        {
          title: "Treating the parents' block as a row block",
          body:
            "In the alternating stem the parents' block has no free \\(2!\\) — the alternation decides which side the father sits. The official answer is \\(4! \\times 4! = 576\\); \\(1152\\) is the doubled count.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Arrangements with Constraints — the row versions of block, gap and complement",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-arrangements-with-constraints",
    },
  ],
};
