import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RFC_TRIANGLES_NOTE: SubtopicNote = {
  subtopicName: "Counting Triangles",
  title: "Counting Triangles",
  oneLineDefinition:
    "Count every triangle in a drawn figure, small and large, by labelling the points and listing the triangles in order, or by splitting a big figure into blocks.",
  whyItMatters:
    "Twenty-five questions in the bank, all from the 2024 shifts, with 4 EASY, 13 MODERATE and 8 HARD. The options sit one apart, so a single missed or doubled triangle costs the mark; a fixed listing order is the only defence.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrfctr-label",
      name: "Labelling points and listing triangles",
      intuition:
        "Counting by eye misses the large triangles made of several small ones. Give every corner and crossing point a letter, then list triangles as sets of three letters joined by drawn lines. A list cannot skip a triangle or count one twice.",
      definition:
        "1. Label every corner and every point where two lines cross.\n" +
        "2. Count the single small triangles first, then triangles made of two pieces, then three, and so on up to the whole figure.\n" +
        "3. A set of three points is a triangle only if all three sides are drawn lines and the three points are not on one line.\n" +
        "- **Lines from one corner:** if lines from the apex of a triangle cut its base into k parts, the figure has k(k + 1) ÷ 2 triangles. One line (2 parts) gives 3; two lines (3 parts) give 6.\n" +
        "- **Lines across as well:** each line drawn across the triangle, parallel to the base, makes another layer of the same count, so the total is that count times the number of layers.\n" +
        "- **A square with both diagonals** has 8 triangles: 4 small ones and 4 halves.\n" +
        "- **Fast route:** spot a standard block (a fan of lines, a crossed square) and use its count, then list only the triangles that use lines outside the block.",
      formula: {
        label: "Triangles from lines through one corner",
        latex: "\\text{triangles} = \\frac{k(k+1)}{2}",
        symbols: [{ symbol: "k", meaning: "the number of parts the base is cut into" }],
      },
      authoredExample: {
        prompt:
          "In triangle ABC, the points D and E lie on BC in the order B, D, E, C, and both are joined to A. How many triangles are there?",
        steps: [
          "The base is cut into 3 parts: BD, DE and EC.",
          "Single parts: ABD, ADE, AEC. Two parts: ABE, ADC. Three parts: ABC.",
          "That is 6, which matches \\(\\frac{3 \\times 4}{2} = 6\\).",
        ],
        answer: "6",
      },
      selfCheckExample: {
        prompt: "A square ABCD has both diagonals drawn, crossing at O. How many triangles are there?",
        steps: [
          "Small triangles at the centre: OAB, OBC, OCD, ODA, which is 4.",
          "Halves of the square, each cut off by one diagonal: ABC, BCD, CDA, DAB, which is 4 more.",
        ],
        answer: "8",
      },
      practiceSet: [
        { prompt: "A triangle has one line from its apex to its base. How many triangles are there?", answer: "3" },
        { prompt: "Lines from the apex of a triangle cut its base into 5 parts. How many triangles are there?", answer: "15", method: "\\(\\frac{5 \\times 6}{2} = 15\\)." },
        { prompt: "A triangle has one line from its apex to its base and one line across it, parallel to the base. How many triangles are there?", answer: "6", method: "3 triangles in each of the 2 layers." },
        { prompt: "A rectangle has one diagonal drawn. How many triangles are there?", answer: "2" },
      ],
      pyqExampleId: "05a47285-acb2-415b-afd5-ce9049ca005c",
      traps: [
        {
          title: "Counting only the smallest triangles",
          body:
            "In a triangle with two lines from its apex, the three small triangles are easy to see, but three more are made of two or three of them. Count by size, from one piece up to the whole figure.",
        },
        {
          title: "Counting three points that lie on one line",
          body:
            "Three points on the same drawn line make no triangle. Before you list a set of three letters, check that no two of its sides lie along one line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrfctr-regions",
      name: "Counting a large figure block by block",
      intuition:
        "The HARD figures join several small drawings: a square with a diamond inside, a V shape, a crossed square, a row of diagonals. Count each block on its own, add the counts, and then look for triangles that use lines from two blocks.",
      definition:
        "1. Split the figure into blocks you can name: the top-left square, the V at the top, the bottom row.\n" +
        "2. Count the triangles inside each block, using labels where the block is crowded.\n" +
        "3. Add the block counts.\n" +
        "4. Look along each line shared by two blocks for triangles that cross it, and add those.\n" +
        "- A diamond drawn inside a square makes 4 corner triangles; any line that cuts the diamond adds more.\n" +
        "- **Fast route:** when the options differ by one, recount only the block you were least sure of rather than the whole figure.",
      authoredExample: {
        prompt:
          "A figure has two parts side by side that share no lines: a square with both diagonals, and a triangle with two lines from its apex to its base. How many triangles are there?",
        steps: [
          "The square with both diagonals: 8 triangles.",
          "The triangle with two lines from its apex cuts its base into 3 parts: \\(\\frac{3 \\times 4}{2} = 6\\).",
          "The parts share no lines, so no triangle crosses between them: \\(8 + 6 = 14\\).",
        ],
        answer: "14",
      },
      selfCheckExample: {
        prompt:
          "A rectangle is split by a vertical line into two squares. In each square one diagonal runs from its top-left corner to its bottom-right corner. How many triangles are there?",
        steps: [
          "Each square is cut by its diagonal into 2 triangles, so 4 in all.",
          "A triangle across both squares would need a line joining the outer corners, and none is drawn.",
        ],
        answer: "4",
      },
      practiceSet: [
        { prompt: "After counting each block of a figure, what must you check before you add?", answer: "Triangles that use lines from two blocks." },
        { prompt: "Three blocks share no lines and hold 5, 3 and 8 triangles. How many triangles are there in all?", answer: "16" },
        { prompt: "Why label the corners of a crowded block?", answer: "So that no triangle is missed or counted twice." },
        { prompt: "A diamond is drawn inside a square, touching the middle of each side. How many triangles lie outside the diamond?", answer: "4" },
      ],
      pyqExampleId: "fa149f69-7e4b-4eaa-a4ac-b2ed78c9a879",
      traps: [
        {
          title: "Adding the blocks and stopping",
          body:
            "Where two blocks share a line, a triangle can use part of each. After adding the block counts, run along every shared line looking for one more.",
        },
        {
          title: "Counting a shared triangle in both blocks",
          body:
            "A triangle that sits on the border between two blocks belongs to one of them only. Decide which block it goes with before you count either.",
        },
      ],
    },
  ],
};
