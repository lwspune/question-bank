import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_QE_WORD_NOTE: SubtopicNote = {
  subtopicName: "Word Problems on Quadratics",
  title: "Word Problems on Quadratics",
  oneLineDefinition:
    "A word problem becomes a quadratic equation when two unknown amounts are tied together; solve it and keep only the root the story allows.",
  whyItMatters:
    "Six questions in the bank, all MODERATE and all from the 2026 paper, which asked six of its eight quadratic questions this way. Each one is three steps: name the unknown, write the one fact as a quadratic equation, and keep only the root that makes sense. The wrong options are usually the root you should have thrown away, or the other number in the story.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiqewp-numbers",
      name: "Numbers, squares and the sides of squares",
      intuition:
        "Call the smallest unknown x and write every other number using x. The one fact in the question then becomes an equation. A quadratic gives two roots, but only the one that fits the story is the answer.",
      definition:
        "- **Consecutive numbers:** x, x + 1, x + 2. **Consecutive odd or even numbers:** x, x + 2, x + 4.\n" +
        "- **Two squares** with sides a and b have areas \\(a^2\\) and \\(b^2\\) and perimeters 4a and 4b, so a difference of perimeters gives the difference of the sides.\n" +
        "- Expand, bring every term to one side, divide by any common factor, then factorise.\n" +
        "- Keep only the root that fits: a length, a count or a natural number cannot be negative.",
      formula: {
        label: "Squares of three consecutive numbers",
        latex: "x^2 + (x+1)^2 + (x+2)^2 = 3x^2 + 6x + 5",
      },
      authoredExample: {
        prompt: "The product of two consecutive positive integers is 182. Find them.",
        steps: [
          "Let the integers be x and x + 1. Then \\(x(x + 1) = 182\\), so \\(x^2 + x - 182 = 0\\).",
          "Two numbers with product \\(-182\\) and sum 1: 14 and \\(-13\\). So \\((x + 14)(x - 13) = 0\\).",
          "x = 13 or x = \\(-14\\). The integers are positive, so x = 13.",
          "Check: \\(13 \\times 14 = 182\\).",
        ],
        answer: "13 and 14",
      },
      selfCheckExample: {
        prompt: "The squares of two consecutive positive odd numbers add up to 290. Find the numbers.",
        steps: [
          "Let them be x and x + 2: \\(x^2 + (x + 2)^2 = 290\\), so \\(2x^2 + 4x - 286 = 0\\), that is \\(x^2 + 2x - 143 = 0\\).",
          "\\((x + 13)(x - 11) = 0\\), so x = 11 (the root \\(-13\\) is not positive).",
          "Check: \\(121 + 169 = 290\\).",
        ],
        answer: "11 and 13",
      },
      practiceSet: [
        { prompt: "A positive number added to its own square gives 72. Find the number.", answer: "\\(x^2 + x - 72 = 0\\), so \\((x + 9)(x - 8) = 0\\) and the number is 8" },
        {
          prompt: "The sides of two squares differ by 4 cm and their areas add up to 208 square cm. Find the two sides.",
          answer: "\\(a^2 + (a + 4)^2 = 208\\) gives \\(a^2 + 4a - 96 = 0\\), so a = 8: the sides are 8 cm and 12 cm",
        },
        {
          prompt: "A rectangle is 3 m longer than it is wide, and its area is 88 square m. Find its width.",
          answer: "\\(w(w + 3) = 88\\) gives \\((w + 11)(w - 8) = 0\\), so the width is 8 m",
        },
      ],
      pyqExampleId: "ce845c1c-c756-449a-bb70-8169ae08a6a0",
      traps: [
        {
          title: "Keeping the negative root",
          body: "\\(x^2 + x - 182 = 0\\) gives x = 13 or x = \\(-14\\). A question about positive or natural numbers, a length or a count throws the negative root away.",
        },
        {
          title: "Dropping the middle term when squaring",
          body: "\\((x + 1)^2 = x^2 + 2x + 1\\), not \\(x^2 + 1\\). Missing the 2x term changes every root that follows.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqewp-ages",
      name: "Ages and two linked counts",
      intuition:
        "Two ages, or two players' scores, are tied together by the question. Let one of them be x, write the other in terms of x, and the condition on them becomes a quadratic equation.",
      definition:
        "- k years ago an age x was \\(x - k\\); k years from now it will be \\(x + k\\).\n" +
        "- 'Three less than twice x' is \\(2x - 3\\), but 'twice (x minus 3)' is \\(2x - 6\\). Read where the brackets go.\n" +
        "- A product of the two amounts gives the quadratic: x times the other amount equals the given number.\n" +
        "- Check the answer in the words of the question: an age in the past must still be positive.",
      authoredExample: {
        prompt: "Asha is 4 years older than her brother. The product of their ages is 96. How old is Asha?",
        steps: [
          "Let the brother be x years old, so Asha is x + 4.",
          "\\(x(x + 4) = 96\\), so \\(x^2 + 4x - 96 = 0\\) and \\((x + 12)(x - 8) = 0\\).",
          "An age cannot be negative, so x = 8 and Asha is 12.",
          "Check: \\(8 \\times 12 = 96\\).",
        ],
        answer: "12 years",
      },
      selfCheckExample: {
        prompt: "The square of Neha's age three years ago equals her present age plus 9. How old is she now?",
        steps: [
          "\\((x - 3)^2 = x + 9\\), so \\(x^2 - 6x + 9 = x + 9\\) and \\(x^2 - 7x = 0\\).",
          "\\(x(x - 7) = 0\\) gives x = 0 or x = 7. At 0 she could not have had an age three years ago, so x = 7.",
          "Check: \\(4^2 = 16 = 7 + 9\\).",
        ],
        answer: "7 years",
      },
      practiceSet: [
        {
          prompt: "Ravi took 2 more catches than three times the number Sunil took. The product of their catches is 33. How many did Ravi take?",
          answer: "\\(x(3x + 2) = 33\\) gives \\((3x + 11)(x - 3) = 0\\), so Sunil took 3 and Ravi took 11",
        },
        {
          prompt: "A mother is 25 years older than her daughter, and the product of their ages is 150. How old is the daughter?",
          answer: "\\(x(x + 25) = 150\\) gives \\((x + 30)(x - 5) = 0\\), so she is 5",
        },
      ],
      pyqExampleId: "be3344b3-82fc-49a3-a1ac-0bb153a29644",
      traps: [
        {
          title: "Writing 'three less than twice x' as 3 minus 2x",
          body: "'Less than' turns the order round: three less than twice x is \\(2x - 3\\). Read the sentence from the end: start with twice x, then take 3 away.",
        },
        {
          title: "Keeping a root that makes a past age negative",
          body: "If an age equation gives 2 and 9 and the question looks back 4 years, age 2 would be \\(-2\\) four years ago. Only 9 works.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiqewp-sharing",
      name: "Sharing a fixed sum among more people",
      intuition:
        "When a fixed sum is shared equally, each share is the sum divided by the number of people. More people means a smaller share, and the difference between the two shares is the fact that gives the equation.",
      definition:
        "- With n people each gets \\(\\frac{S}{n}\\); with n + k people each gets \\(\\frac{S}{n + k}\\).\n" +
        "- 'Each would get d less' gives \\(\\frac{S}{n} - \\frac{S}{n + k} = d\\).\n" +
        "- Multiply both sides by \\(n(n + k)\\): \\(Sk = d \\, n(n + k)\\). Divide by d, then solve.\n" +
        "- The same pattern fits a journey: time is distance divided by speed, and 'one hour less' is the difference of two times.",
      formula: {
        label: "Equal sharing among more people",
        latex: "\\frac{S}{n} - \\frac{S}{n + k} = d \\;\\Rightarrow\\; Sk = d\\,n(n + k)",
        symbols: [
          { symbol: "S", meaning: "the sum shared" },
          { symbol: "n", meaning: "the number of people at first" },
          { symbol: "k", meaning: "how many more people join" },
          { symbol: "d", meaning: "how much smaller each share becomes" },
        ],
      },
      authoredExample: {
        prompt: "Rs 360 is shared equally among some children. If there were 3 more children, each would get Rs 6 less. How many children are there?",
        steps: [
          "\\(\\frac{360}{n} - \\frac{360}{n + 3} = 6\\), so \\(360 \\times 3 = 6n(n + 3)\\) and \\(n(n + 3) = 180\\).",
          "\\(n^2 + 3n - 180 = 0\\), so \\((n + 15)(n - 12) = 0\\) and n = 12.",
          "Check: \\(\\frac{360}{12} = 30\\) and \\(\\frac{360}{15} = 24\\), a difference of Rs 6.",
        ],
        answer: "12 children",
      },
      selfCheckExample: {
        prompt: "Rs 1200 is shared equally among some workers. With 10 more workers, each would get Rs 20 less. How many workers are there?",
        steps: [
          "\\(1200 \\times 10 = 20n(n + 10)\\), so \\(n(n + 10) = 600\\) and \\(n^2 + 10n - 600 = 0\\).",
          "\\((n + 30)(n - 20) = 0\\), so n = 20. Check: 60 and 40 differ by 20.",
        ],
        answer: "20 workers",
      },
      practiceSet: [
        {
          prompt: "A car covers 120 km at a steady speed. If it went 10 km/h faster, the trip would take 1 hour less. Find its speed.",
          answer: "\\(\\frac{120}{v} - \\frac{120}{v + 10} = 1\\) gives \\(v(v + 10) = 1200\\), so v = 30 km/h",
        },
        {
          prompt: "240 sweets are shared equally among some children. If there were 4 fewer children, each would get 5 more sweets. How many children are there?",
          answer: "\\(\\frac{240}{n - 4} - \\frac{240}{n} = 5\\) gives \\(n(n - 4) = 192\\), so n = 16",
        },
      ],
      pyqExampleId: "93d291a7-c1dd-44c6-911c-7cc4890663bb",
      traps: [
        {
          title: "Subtracting the shares the wrong way round",
          body: "Fewer people get the larger share, so it comes first: \\(\\frac{S}{n} - \\frac{S}{n + k} = d\\). Written the other way round, d comes out negative.",
        },
        {
          title: "Not multiplying the right side too",
          body: "Clearing the fractions means multiplying both sides by \\(n(n + k)\\), so d becomes \\(d \\, n(n + k)\\), not just d.",
        },
      ],
    },
  ],
};
