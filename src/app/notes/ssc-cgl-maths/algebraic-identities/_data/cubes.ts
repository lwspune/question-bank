import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AI_CUBES_NOTE: SubtopicNote = {
  subtopicName: "Cubes of a Binomial",
  title: "Cubes of a Binomial",
  oneLineDefinition:
    "The cube of a sum or a difference, the sum and difference of two cubes, and the number fractions those factors cancel.",
  whyItMatters:
    "31 questions in the bank, and almost half of them are MODERATE. Three shapes repeat: two numbers given by a sum or difference and a product, an expanded cube to spot, and a fraction whose top is a sum or difference of cubes and whose bottom is the matching quadratic. The fractions look like heavy arithmetic and take five seconds once you see the pattern.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscaicu-sumprod",
      name: "Cubes from a sum or difference and a product",
      intuition:
        "\\((a + b)^3\\) holds \\(a^3 + b^3\\) plus extra terms that are all multiples of \\(ab(a + b)\\). Take those away and the sum of cubes is left, with no need to find a and b.",
      definition:
        "- \\((a + b)^3 = a^3 + b^3 + 3ab(a + b)\\), so **\\(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\\)**.\n" +
        "- \\((a - b)^3 = a^3 - b^3 - 3ab(a - b)\\), so **\\(a^3 - b^3 = (a - b)^3 + 3ab(a - b)\\)**.\n" +
        "- **Backwards:** given \\(a^3 + b^3\\) and \\(a + b\\), the same line gives \\(ab\\). Given \\(a^3 + b^3\\) and \\(ab\\), try each option for \\(a + b\\) in \\(s^3 - 3ab\\,s\\).\n" +
        "- If the question needs the other sign (\\(a - b\\) from \\(a + b\\)), go through the square first: \\((a - b)^2 = (a + b)^2 - 4ab\\).\n" +
        "- A coefficient rides along: for \\(3x + y\\) and \\(xy\\), take \\(a = 3x\\), \\(b = y\\) and \\(ab = 3xy\\).\n" +
        "- **Fast route:** with natural numbers, find the pair. A difference of 2 and a product of 15 are 5 and 3; then cube them. Use the identity when no whole pair fits.",
      formula: {
        label: "Cube identities for two terms",
        latex:
          "(a + b)^3 = a^3 + b^3 + 3ab(a + b) \\qquad (a - b)^3 = a^3 - b^3 - 3ab(a - b) \\qquad a^3 + b^3 = (a + b)^3 - 3ab(a + b) \\qquad a^3 - b^3 = (a - b)^3 + 3ab(a - b)",
      },
      authoredExample: {
        prompt: "If \\(x + y = 9\\) and \\(xy = 14\\), find \\(x^3 + y^3\\).",
        steps: [
          "\\(x^3 + y^3 = (x + y)^3 - 3xy(x + y)\\).",
          "\\(= 729 - 3 \\times 14 \\times 9 = 729 - 378 = 351\\).",
          "Check: the numbers are 7 and 2, and \\(343 + 8 = 351\\).",
        ],
        answer: "351",
      },
      selfCheckExample: {
        prompt:
          "The difference of two natural numbers is 5 and the difference of their cubes is 485. Find their product.",
        steps: [
          "\\(a^3 - b^3 = (a - b)^3 + 3ab(a - b)\\), so \\(485 = 125 + 15ab\\).",
          "\\(15ab = 360\\), so \\(ab = 24\\).",
          "Check: 8 and 3 give \\(512 - 27 = 485\\).",
        ],
        answer: "24",
      },
      practiceSet: [
        {
          prompt: "If \\(a - b = 2\\) and \\(ab = 15\\), find \\(a^3 - b^3\\).",
          answer: "\\(8 + 3 \\times 15 \\times 2 = 98\\)",
        },
        { prompt: "If \\(p + q = 6\\) and \\(pq = 8\\), find \\(p^3 + q^3\\).", answer: "\\(216 - 144 = 72\\)" },
        {
          prompt: "If \\(3x + y = 7\\) and \\(xy = 2\\), find \\(27x^3 + y^3\\).",
          answer: "\\(343 - 3 \\times 6 \\times 7 = 217\\), since \\((3x)(y) = 6\\)",
        },
        {
          prompt: "The sum of two numbers is 10 and the sum of their cubes is 370. Find their product.",
          answer: "\\(370 = 1000 - 30ab\\), so \\(ab = 21\\)",
        },
      ],
      pyqExampleId: "b97cb2c4-3a63-4e1b-bce5-e9a3b89a7ea6",
      traps: [
        {
          title: "The correction carries the sum",
          body:
            "\\(a^3 + b^3 = (a + b)^3 - 3ab(a + b)\\), not \\((a + b)^3 - 3ab\\). Leaving out the factor \\((a + b)\\) is the commonest wrong option.",
        },
        {
          title: "The sign in the difference form",
          body:
            "\\(a^3 - b^3 = (a - b)^3 + 3ab(a - b)\\): plus, because \\((a - b)^3\\) already took \\(3ab(a - b)\\) away. Writing minus gives a number that is too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaicu-spot",
      name: "Spotting an expanded cube",
      intuition:
        "Four terms whose first and last are cubes, with middle coefficients that follow the 1, 3, 3, 1 pattern, are a cube in disguise. Spotting it turns a long substitution into one small number cubed.",
      definition:
        "- \\((a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3\\) and \\((a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3\\).\n" +
        "- **The test:** the first and last terms are \\(a^3\\) and \\(b^3\\). Then the middle terms must be exactly \\(3a^2b\\) and \\(3ab^2\\). For \\(8x^3 + 36x^2y + 54xy^2 + 27y^3\\): \\(a = 2x\\), \\(b = 3y\\), \\(3a^2b = 36x^2y\\) and \\(3ab^2 = 54xy^2\\), so it is \\((2x + 3y)^3\\).\n" +
        "- **Complete the cube:** \\(a^3 + 3a^2 + 3a + 1 = (a + 1)^3\\), so add or take away the missing constant on both sides.\n" +
        "- **A near-cube is not a cube.** If a middle coefficient does not match, write the expression as a cube plus a leftover, or put the numbers in term by term. SSC prints near-cubes on purpose.",
      formula: {
        label: "Expanded cubes",
        latex: "(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 \\qquad (a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3",
      },
      authoredExample: {
        prompt: "Find \\(8x^3 - 36x^2 + 54x - 27\\) when \\(x = 4\\).",
        steps: [
          "The ends are \\((2x)^3\\) and \\(3^3\\). Test the middle: \\(3(2x)^2(3) = 36x^2\\) and \\(3(2x)(3^2) = 54x\\). Both match, with minus on the \\(36x^2\\).",
          "So the expression is \\((2x - 3)^3 = (8 - 3)^3 = 125\\).",
          "Check term by term: \\(512 - 576 + 216 - 27 = 125\\).",
        ],
        answer: "125",
      },
      selfCheckExample: {
        prompt: "If \\(x^3 - 6x^2 + 12x = 9\\), find the real value of \\(x\\).",
        steps: [
          "\\((x - 2)^3 = x^3 - 6x^2 + 12x - 8\\), so take 8 from both sides.",
          "\\((x - 2)^3 = 1\\), so \\(x - 2 = 1\\) and \\(x = 3\\).",
          "Check: \\(27 - 54 + 36 = 9\\).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "Write \\(a^3 + 9a^2 + 27a + 27\\) as a cube.", answer: "\\((a + 3)^3\\)" },
        {
          prompt: "Find \\(p^3 - 3p^2q + 3pq^2 - q^3\\) when \\(p = 12\\) and \\(q = 9\\).",
          answer: "\\((12 - 9)^3 = 27\\)",
        },
        {
          prompt: "Is \\(x^3 + 3x^2 + 4x + 1\\) a perfect cube?",
          answer: "No: \\((x + 1)^3\\) has \\(3x\\), not \\(4x\\). It is \\((x + 1)^3 + x\\)",
        },
        {
          prompt: "Find \\(x^3 + 3x^2y + 3xy^2 + y^3\\) when \\(x = 0.7\\) and \\(y = 0.3\\).",
          answer: "\\((0.7 + 0.3)^3 = 1\\)",
        },
      ],
      pyqExampleId: "9f24ad68-f938-44ff-8d64-431905e75591",
      traps: [
        {
          title: "Cubing a near-cube",
          body:
            "\\(27x^3 + 54x^2y + 36xy^2 + 8y^3\\) is \\((3x + 2y)^3\\), but change one middle coefficient and it is not. Check both middle coefficients before you cube; otherwise substitute term by term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscaicu-factor",
      name: "Sum and difference of cubes as factors",
      intuition:
        "\\(a^3 + b^3\\) always splits into \\(a + b\\) times a quadratic. When a fraction puts that quadratic underneath, it cancels and only \\(a + b\\) is left.",
      definition:
        "- \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\) and \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\).\n" +
        "- So \\(\\frac{a^3 + b^3}{a^2 - ab + b^2} = a + b\\) and \\(\\frac{a^3 - b^3}{a^2 + ab + b^2} = a - b\\). Turned over, they give \\(\\frac{1}{a + b}\\) and \\(\\frac{1}{a - b}\\).\n" +
        "- **Pair by the signs:** a plus between the cubes goes with a **minus** \\(ab\\) in the quadratic; a minus between the cubes goes with a **plus** \\(ab\\).\n" +
        "- The middle product may be printed as one number: 0.24 is \\(0.6 \\times 0.4\\), and 0.16 is \\(0.4^2\\).\n" +
        "- **The same pair on top and bottom.** Check that the numbers in the quadratic are the ones that are cubed before you cancel.\n" +
        "- A product such as \\(\\left(\\frac{2}{x} + 2x\\right)\\left(\\frac{4}{x^2} - 4 + 4x^2\\right)\\) is a sum of cubes: \\(a = \\frac{2}{x}\\), \\(b = 2x\\), \\(ab = 4\\), so it equals \\(\\frac{8}{x^3} + 8x^3\\).",
      formula: {
        label: "Sum and difference of cubes",
        latex: "a^3 + b^3 = (a + b)(a^2 - ab + b^2) \\qquad a^3 - b^3 = (a - b)(a^2 + ab + b^2)",
      },
      authoredExample: {
        prompt: "Simplify \\(\\frac{(0.9)^3 + (0.6)^3}{(0.9)^2 - 0.54 + (0.6)^2}\\).",
        steps: [
          "\\(0.54 = 0.9 \\times 0.6\\), so the bottom is \\(a^2 - ab + b^2\\) with \\(a = 0.9\\), \\(b = 0.6\\).",
          "A plus between the cubes and a minus \\(ab\\) below: the fraction is \\(a + b = 1.5\\).",
          "Check: \\(\\frac{0.729 + 0.216}{0.81 - 0.54 + 0.36} = \\frac{0.945}{0.63} = 1.5\\).",
        ],
        answer: "1.5",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac{65^3 - 35^3}{65^2 + 65 \\times 35 + 35^2}\\).",
        steps: [
          "A minus between the cubes and a plus \\(ab\\) below: this is \\(\\frac{a^3 - b^3}{a^2 + ab + b^2}\\).",
          "So it equals \\(a - b = 65 - 35 = 30\\).",
        ],
        answer: "30",
      },
      practiceSet: [
        { prompt: "Factorise \\(x^3 - 8\\).", answer: "\\((x - 2)(x^2 + 2x + 4)\\)" },
        {
          prompt: "Find \\(\\frac{a^2 - ab + b^2}{a^3 + b^3}\\) when \\(a = 51\\) and \\(b = 49\\).",
          answer: "\\(\\frac{1}{a + b} = \\frac{1}{100}\\)",
        },
        {
          prompt: "Simplify \\(\\left(\\frac{3}{y} + y\\right)\\left(\\frac{9}{y^2} - 3 + y^2\\right)\\).",
          answer: "\\(\\frac{27}{y^3} + y^3\\), since the two terms multiply to 3",
        },
        {
          prompt: "If \\(\\frac{2(9^3 - 4^3)}{9^2 + 4^2 + K} = 10\\), find K.",
          answer: "\\(9^3 - 4^3 = 5 \\times 133\\), so \\(97 + K = 133\\) and \\(K = 36 = 9 \\times 4\\)",
        },
      ],
      pyqExampleId: "e39ed4d7-bc73-4ee5-bd86-91d59274d8c9",
      traps: [
        {
          title: "Pairing the wrong quadratic",
          body:
            "\\(a^3 + b^3\\) cancels with \\(a^2 - ab + b^2\\), not with \\(a^2 + ab + b^2\\). With the wrong pair nothing cancels and the value is not \\(a + b\\).",
        },
        {
          title: "Different numbers on top and below",
          body:
            "The shortcut needs the same pair in both places. If the top cubes 0.2 and 0.3 but the bottom is built from 0.5 and 0.3, nothing cancels: work the arithmetic instead.",
        },
      ],
    },
  ],
};
