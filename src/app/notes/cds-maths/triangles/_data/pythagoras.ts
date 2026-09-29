import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_PYTHAGORAS_NOTE: SubtopicNote = {
  subtopicName: "Pythagoras Theorem and its Converse",
  title: "Pythagoras Theorem",
  oneLineDefinition:
    "In a right triangle the square on the hypotenuse equals the sum of the squares on the other two sides, and any triangle whose sides satisfy that is right-angled.",
  whyItMatters:
    "Twenty-two PYQs, four of them HARD. They come in three kinds: integer triples, the perimeter-and-area pair (always solved by squaring a + b), and word problems — ladders, poles, walks — where the work is drawing the right triangle. Knowing six triples by sight saves most of the arithmetic.",
  concepts: [
    // C1 — triples and integer sides
    {
      kind: "formula" as const,
      slug: "cdstg-triples",
      name: "Pythagorean triples",
      intuition:
        "Most exam triangles have whole-number sides, and there are only a few small triples. Recognise \\(3, 4, 5\\) or \\(5, 12, 13\\) inside a question — scaled or not — and the arithmetic disappears.",
      definition:
        "- **Know by sight:** \\(3, 4, 5\\) · \\(5, 12, 13\\) · \\(8, 15, 17\\) · \\(7, 24, 25\\) · \\(20, 21, 29\\) · \\(9, 40, 41\\), and their multiples (\\(6, 8, 10\\); \\(9, 12, 15\\); \\(15, 20, 25\\)).\n" +
        "- **Generator:** \\(m^2 - n^2\\), \\(2mn\\), \\(m^2 + n^2\\) is a triple for any \\(m > n\\).\n" +
        "- **Odd leg \\(n\\):** \\(n, \\dfrac{n^2 - 1}{2}, \\dfrac{n^2 + 1}{2}\\) is a triple (so \\(11, 60, 61\\)).\n" +
        "- The hypotenuse is always the largest side, so put the largest expression on the right.",
      formula: {
        label: "Triple generator",
        latex: "(m^2 - n^2)^2 + (2mn)^2 = (m^2 + n^2)^2",
      },
      authoredExample: {
        prompt: "The sides of a right triangle are three consecutive whole numbers. Find them.",
        steps: [
          "Call them \\(x - 1\\), \\(x\\), \\(x + 1\\); the largest is the hypotenuse.",
          "\\((x - 1)^2 + x^2 = (x + 1)^2\\) gives \\(x^2 - 4x = 0\\), so \\(x = 4\\).",
        ],
        answer: "\\(3, 4, 5\\) — the only such set.",
      },
      selfCheckExample: {
        prompt: "A right triangle with whole-number sides has one leg \\(11\\). Find the other two sides.",
        steps: [
          "\\(c^2 - b^2 = 121\\), so \\((c - b)(c + b) = 121\\); with \\(c - b = 1\\), \\(c + b = 121\\).",
          "\\(c = 61\\), \\(b = 60\\).",
        ],
        answer: "\\(60\\) and \\(61\\).",
      },
      practiceSet: [
        { prompt: "\\(5, 12, ?\\)", answer: "\\(13\\)" },
        { prompt: "\\(8, 15, ?\\)", answer: "\\(17\\)" },
        { prompt: "\\(7, ?, 25\\)", answer: "\\(24\\)" },
        { prompt: "Is \\(6, 8, 11\\) right-angled?", answer: "No (\\(36 + 64 \\ne 121\\))" },
      ],
      pyqExampleId: "864cef07-0cc3-49f3-afa4-b3252ed76ab7", // 2019 (I) — one side 15, maximum perimeter
      traps: [
        {
          title: "A ratio fixes only the shape",
          body:
            "'Sides in the ratio \\(x : (x - 1) : (x - 18)\\)' strictly allows any multiple. The paper means the sides ARE those expressions; solve for \\(x\\) and reject any root that makes a side negative.",
        },
      ],
    },

    // C2 — perimeter and area together
    {
      kind: "formula" as const,
      slug: "cdstg-sum-product-legs",
      name: "Perimeter and area together",
      intuition:
        "Two facts about the legs — their sum and their product — are all you need, because squaring the sum gives the hypotenuse's square plus twice the product. The area gives the product; the perimeter gives the sum once the hypotenuse is taken out.",
      definition:
        "With legs \\(a, b\\), hypotenuse \\(c\\), area \\(\\Delta = \\dfrac{ab}{2}\\) and perimeter \\(P\\):\n" +
        "- \\((a + b)^2 = c^2 + 2ab = c^2 + 4\\Delta\\);\n" +
        "- \\((a - b)^2 = c^2 - 4\\Delta\\);\n" +
        "- since \\(a + b = P - c\\): \\((P - c)^2 = c^2 + 4\\Delta\\), which gives \\(c = \\dfrac{P^2 - 4\\Delta}{2P}\\).",
      formula: {
        label: "Hypotenuse from perimeter and area",
        latex: "(a + b)^2 = c^2 + 4\\Delta, \\qquad c = \\dfrac{P^2 - 4\\Delta}{2P}",
      },
      authoredExample: {
        prompt: "A right triangle has perimeter \\(30\\) and area \\(30\\). Find its hypotenuse.",
        steps: [
          "\\(c = \\dfrac{30^2 - 4\\times 30}{2\\times 30} = \\dfrac{900 - 120}{60}\\).",
          "\\(c = 13\\) (the triangle is \\(5, 12, 13\\)).",
        ],
        answer: "\\(13\\).",
      },
      selfCheckExample: {
        prompt: "A right triangle has hypotenuse \\(13\\) and area \\(30\\). Find the sum of its legs.",
        steps: ["\\((a + b)^2 = 169 + 4\\times 30 = 289\\)."],
        answer: "\\(17\\).",
      },
      practiceSet: [
        { prompt: "Hypotenuse \\(10\\), area \\(24\\). Sum of the legs?", answer: "\\(14\\)" },
        { prompt: "Legs add to \\(7\\), hypotenuse \\(5\\). Area?", answer: "\\(6\\)" },
        { prompt: "The squares of all three sides add to \\(200\\). Hypotenuse?", answer: "\\(10\\)" },
        { prompt: "Perimeter \\(12\\), area \\(6\\). Hypotenuse?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "c835739c-d328-4f97-9767-d7b4fb4dc9b5", // 2025 (II) — legs exceed hypotenuse by 10, perimeter 60
      traps: [
        {
          title: "The squares of ALL three sides",
          body:
            "\\(a^2 + b^2 + c^2 = 2c^2\\), not \\(c^2\\). A question giving 'the sum of the squares of the sides' wants \\(c = \\sqrt{\\text{sum} \\div 2}\\).",
        },
      ],
    },

    // C3 — ladders, poles and walks
    {
      kind: "formula" as const,
      slug: "cdstg-pythagoras-in-the-field",
      name: "Ladders, poles and walks",
      intuition:
        "Every word problem hides one right triangle. Find it: the ladder is the hypotenuse against a wall; two poles give a horizontal gap and a height difference; a walk gives a net east and a net north.",
      definition:
        "- **Ladder:** length \\(L\\), foot \\(x\\) from the wall, top at height \\(h\\): \\(L^2 = x^2 + h^2\\). Sliding changes \\(x\\) and \\(h\\) but not \\(L\\).\n" +
        "- **Two poles:** tips are \\(\\sqrt{d^2 + (h_1 - h_2)^2}\\) apart, where \\(d\\) is the gap between them.\n" +
        "- **Walks:** add the east–west moves and the north–south moves separately, then combine.\n" +
        "- **Equilateral triangle** of side \\(a\\): height \\(\\dfrac{\\sqrt3}{2}a\\), so \\(h^2 = 3\\left(\\dfrac a2\\right)^2\\).",
      formula: {
        label: "Pythagoras",
        latex: "c^2 = a^2 + b^2",
      },
      authoredExample: {
        prompt: "A \\(10\\) m ladder reaches \\(8\\) m up a wall. Its foot slides \\(2\\) m further from the wall. How far does the top slide down?",
        steps: [
          "At first the foot is \\(\\sqrt{100 - 64} = 6\\) m out.",
          "After sliding it is \\(8\\) m out, so the top is \\(\\sqrt{100 - 64} = 6\\) m up.",
          "The top has slid \\(8 - 6\\) m.",
        ],
        answer: "\\(2\\) m.",
      },
      selfCheckExample: {
        prompt: "Poles of \\(9\\) m and \\(14\\) m stand \\(12\\) m apart. How far apart are their tips?",
        steps: ["The height difference is \\(5\\), so the distance is \\(\\sqrt{12^2 + 5^2}\\)."],
        answer: "\\(13\\) m.",
      },
      practiceSet: [
        { prompt: "\\(6\\) km east, then \\(8\\) km north. Distance from start?", answer: "\\(10\\) km" },
        { prompt: "Height of an equilateral triangle of side \\(6\\)?", answer: "\\(3\\sqrt3\\)" },
        { prompt: "A \\(5\\) m ladder reaches \\(4\\) m up. Foot from the wall?", answer: "\\(3\\) m" },
        { prompt: "Diagonal of a square of side \\(7\\)?", answer: "\\(7\\sqrt2\\)" },
      ],
      pyqExampleId: "8651b5d4-3ba7-422b-8b2d-23f220a2e33b", // 2019 (II) — ladder slips 0.8 m, bottom moves 1.4 m
      traps: [
        {
          title: "Poles use the DIFFERENCE of heights",
          body:
            "The vertical leg between two pole tips is \\(h_1 - h_2\\), not either height. That is also why 'heights differ by \\(10\\) m' is enough information on its own.",
        },
      ],
    },
  ],
};
