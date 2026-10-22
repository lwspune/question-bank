import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Fractions and Simplification",
  title: "Fraction Arithmetic, Fraction Word Problems and Simplification",
  oneLineDefinition:
    "Work with fractions and mixed numbers, find a whole from a fraction of it, and simplify long expressions in the right order or with an algebraic shortcut.",
  whyItMatters:
    "Five of the chapter's AFCAT past-year questions are here, from 2016, 2017 and 2019: two fraction word problems and three simplifications. The marks go on the order of operations ('of' first, then division and multiplication from left to right) and on dividing by the wrong fraction in a word problem.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afdf-fraction-operations",
      name: "Operations on fractions and mixed numbers",
      intuition:
        "Mixed numbers are awkward to multiply or divide, so turn them into improper fractions first. Then multiply straight across, and divide by multiplying by the flipped fraction.",
      definition:
        "- Mixed to improper: \\(2\\tfrac13 = \\tfrac{2 \\times 3 + 1}{3} = \\tfrac73\\).\n" +
        "- Add or subtract over the LCM of the denominators. With mixed numbers, the whole parts can be added separately.\n" +
        "- Multiply: tops together, bottoms together, cancelling first.\n" +
        "- Divide: multiply by the **reciprocal** of the divisor.\n" +
        "- '**Of**' means multiply: \\(\\tfrac23\\) of 60 is 40.",
      formula: {
        label: "Dividing by a fraction",
        latex: "\\dfrac ab \\div \\dfrac cd = \\dfrac ab \\times \\dfrac dc",
      },
      authoredExample: {
        prompt: "Find \\(2\\tfrac13 \\times 1\\tfrac27 \\div 1\\tfrac12\\).",
        steps: [
          "As improper fractions: \\(\\tfrac73 \\times \\tfrac97 \\div \\tfrac32\\).",
          "\\(\\tfrac73 \\times \\tfrac97 = 3\\).",
          "\\(3 \\div \\tfrac32 = 3 \\times \\tfrac23 = 2\\).",
        ],
        answer: "\\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tfrac34\\) of \\(\\tfrac29\\) of 1,080.",
        steps: ["\\(\\tfrac34 \\times \\tfrac29 = \\tfrac16\\).", "\\(\\tfrac16 \\times 1080 = 180\\)."],
        answer: "\\(180\\).",
      },
      practiceSet: [
        { prompt: "Find \\(1\\tfrac12 + 2\\tfrac34\\).", answer: "\\(4\\tfrac14\\)" },
        { prompt: "Find \\(\\tfrac56 \\div \\tfrac{10}{9}\\).", answer: "\\(\\tfrac34\\)" },
        { prompt: "Find \\(2\\tfrac12 + 12\\tfrac12 + 122\\tfrac12\\).", answer: "\\(137\\tfrac12\\)", method: "Wholes 136, halves \\(1\\tfrac12\\)." },
        {
          prompt: "\\(\\tfrac23\\) of the pupils in a school are boys, and \\(\\tfrac34\\) of the boys play football. What fraction of all the pupils are boys who play football?",
          answer: "\\(\\tfrac12\\)",
        },
      ],
      pyqExampleId: "c5cb2d0d-5bc9-4544-b77c-e157772279f5",
      traps: [
        {
          title: "Mixed numbers multiply only as improper fractions",
          body: "\\(2\\tfrac12 \\times 2\\tfrac12 = \\tfrac52 \\times \\tfrac52 = 6\\tfrac14\\). Multiplying the wholes and the halves apart gives \\(4\\tfrac14\\).",
        },
        {
          title: "Of means times",
          body: "\\(\\tfrac35\\) of \\(\\tfrac23\\) is \\(\\tfrac35 \\times \\tfrac23 = \\tfrac25\\), never \\(\\tfrac35 - \\tfrac23\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-part-to-whole",
      name: "Finding the whole from a fraction of it",
      intuition:
        "If a known amount is a fraction of something, the whole is the amount divided by that fraction. When a tank goes from one fraction full to another, the amount poured in is the difference of the two fractions.",
      definition:
        "- 'A fraction \\(f\\) of the whole is \\(A\\)' gives whole \\(= A \\div f\\).\n" +
        "- A level that changes from \\(f_1\\) to \\(f_2\\) because \\(A\\) litres went in or out: \\(A\\) is \\((f_2 - f_1)\\) of the capacity.\n" +
        "- 'One fraction of a number is \\(A\\) more than another fraction of it': \\(A\\) is the difference of the fractions.\n" +
        "- Once the whole is known, any other fraction of it follows.",
      formula: {
        label: "Whole from a part",
        latex: "\\text{whole} = \\dfrac{\\text{amount}}{\\text{the fraction it is (or the difference of two fractions)}}",
      },
      authoredExample: {
        prompt: "A drum is \\(\\tfrac25\\) full. After 36 L is poured in, it is \\(\\tfrac{7}{10}\\) full. Find its capacity.",
        steps: [
          "The 36 L raised the level by \\(\\tfrac{7}{10} - \\tfrac25 = \\tfrac{3}{10}\\) of the drum.",
          "Capacity \\(= 36 \\div \\tfrac{3}{10} = 120\\).",
        ],
        answer: "\\(120\\) L.",
      },
      selfCheckExample: {
        prompt: "A quarter of a number is 45 more than a sixth of it. Find the number.",
        steps: ["\\(\\tfrac14 - \\tfrac16 = \\tfrac{1}{12}\\), and that is 45.", "The number is \\(45 \\times 12\\)."],
        answer: "\\(540\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tfrac35\\) of a sum is ₹1,200. What is \\(\\tfrac14\\) of the sum?", answer: "₹500" },
        { prompt: "A tank is \\(\\tfrac56\\) full. After 30 L are drawn off it is half full. Find its capacity.", answer: "\\(90\\) L" },
        { prompt: "\\(\\tfrac29\\) of a number is 28. Find \\(\\tfrac57\\) of the number.", answer: "\\(90\\)", method: "The number is 126." },
      ],
      pyqExampleId: "7fa696cd-596e-48e5-9e12-ad1f9cbcdc8e",
      traps: [
        {
          title: "Divide by the difference, not by either fraction",
          body: "In the drum above, \\(36 \\div \\tfrac{7}{10}\\) is about 51 L and is wrong: the 36 L filled only the gap between the two levels.",
        },
        {
          title: "Remains means the new level",
          body: "'After 30 L is drawn, half remains' puts the level at \\(\\tfrac12\\). The fraction drawn out is the old level minus \\(\\tfrac12\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-wrong-operation",
      name: "The wrong-operation problem",
      intuition:
        "Someone was told to do one thing to a number and did another. Both results are fractions of the same unknown number, so their difference is a fraction of it too, and that difference is given.",
      definition:
        "- Write both results as multiples of \\(x\\). Dividing by \\(\\tfrac pq\\) is multiplying by \\(\\tfrac qp\\).\n" +
        "- Subtract the smaller multiple from the larger and set it equal to the given difference.\n" +
        "- Solve for \\(x\\), then read the question again: it may want the number, or the correct result.",
      formula: {
        label: "Wrong result against right result",
        latex: "\\left(\\dfrac{q}{p} - \\dfrac{p}{q}\\right) x = d \\quad (\\text{divided by } \\tfrac pq \\text{ instead of multiplying})",
      },
      authoredExample: {
        prompt: "A student was to multiply a number by \\(\\tfrac45\\) but divided it by \\(\\tfrac45\\), and got 36 more than the right answer. Find the number.",
        steps: [
          "Wrong result \\(\\tfrac54 x\\), right result \\(\\tfrac45 x\\).",
          "Difference: \\(\\tfrac{25 - 16}{20}x = \\tfrac{9}{20}x = 36\\).",
          "\\(x = 36 \\times \\tfrac{20}{9} = 80\\).",
        ],
        answer: "\\(80\\).",
      },
      selfCheckExample: {
        prompt: "Asked to find \\(\\tfrac58\\) of a number, a boy found \\(\\tfrac56\\) of it, and his answer was 40 too big. Find the number.",
        steps: ["\\(\\tfrac56 - \\tfrac58 = \\tfrac{20 - 15}{24} = \\tfrac{5}{24}\\).", "\\(x = 40 \\times \\tfrac{24}{5} = 192\\)."],
        answer: "\\(192\\).",
      },
      practiceSet: [
        { prompt: "A number was to be divided by 5 but was multiplied by 5, giving 125. What is the correct answer?", answer: "\\(5\\)", method: "The number is 25." },
        { prompt: "Asked for \\(\\tfrac23\\) of a number, a girl found \\(\\tfrac32\\) of it and got 50 more. Find the number.", answer: "\\(60\\)" },
        { prompt: "Dividing a number by \\(\\tfrac37\\) instead of multiplying by \\(\\tfrac37\\) gives 80 more. Find the number.", answer: "\\(42\\)", method: "\\(\\tfrac73 - \\tfrac37 = \\tfrac{40}{21}\\)." },
      ],
      pyqExampleId: "8895f575-0287-4c5b-a06e-644644b72b99",
      traps: [
        {
          title: "Dividing by a fraction flips it",
          body: "Dividing by \\(\\tfrac45\\) multiplies by \\(\\tfrac54\\), so the wrong result is the larger one. Writing it as \\(\\tfrac45 x\\) again makes the difference zero.",
        },
        {
          title: "Answer what is asked",
          body: "In 'multiplied by 5 instead of dividing, and got 125', the number is 25 but the correct answer is \\(25 \\div 5 = 5\\). Both are usually among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-bodmas",
      name: "Order of operations (BODMAS)",
      intuition:
        "A long expression has one value only because everyone follows the same order: brackets from the inside out, then 'of', then division and multiplication, then addition and subtraction.",
      definition:
        "- **Brackets**, innermost first: \\(( \\; )\\), then \\(\\{ \\; \\}\\), then \\([ \\; ]\\).\n" +
        "- **Of** next: \\(8 \\div \\tfrac12\\) of \\(4 = 8 \\div 2 = 4\\), while \\(8 \\div \\tfrac12 \\times 4 = 64\\).\n" +
        "- **Division and multiplication** as they come, left to right.\n" +
        "- **Addition and subtraction** as they come, left to right.\n" +
        "- A minus sign in front of a bracket changes the sign of everything inside when the bracket is removed.\n" +
        "- Decimals follow the same order: multiply and divide before you add.",
      formula: {
        label: "Order of operations",
        latex: "\\text{brackets} \\to \\text{of} \\to \\div \\text{ and } \\times \\to + \\text{ and } -",
      },
      authoredExample: {
        prompt: "Simplify \\(60 - [14 - \\{9 - (3 + 2)\\}] + 18 \\div 2 \\times 3\\).",
        steps: [
          "Innermost: \\(3 + 2 = 5\\), then \\(9 - 5 = 4\\), then \\(14 - 4 = 10\\).",
          "Left to right: \\(18 \\div 2 \\times 3 = 9 \\times 3 = 27\\).",
          "\\(60 - 10 + 27 = 77\\).",
        ],
        answer: "\\(77\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(2.4 - 0.6 \\times 2 + 1.8 \\div 0.6\\).",
        steps: ["\\(0.6 \\times 2 = 1.2\\) and \\(1.8 \\div 0.6 = 3\\).", "\\(2.4 - 1.2 + 3 = 4.2\\)."],
        answer: "\\(4.2\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(11 + 8 \\div 4 \\times 3\\).", answer: "\\(17\\)" },
        { prompt: "Simplify \\((1.5 + 0.5) \\div 0.4\\).", answer: "\\(5\\)" },
        { prompt: "Find \\(x\\) if \\(30 - [12 - \\{8 + x\\}] = 34\\).", answer: "\\(8\\)", method: "The left side is \\(26 + x\\)." },
        { prompt: "Simplify \\(\\tfrac35\\) of \\(40 - 18 \\div 6\\).", answer: "\\(21\\)" },
      ],
      pyqExampleId: "d97ae1da-32c9-46f1-8e05-a3d2b160d4b2",
      traps: [
        {
          title: "Division and multiplication go left to right",
          body: "\\(36 \\div 6 \\times 3 = 6 \\times 3 = 18\\). Doing the multiplication first gives \\(36 \\div 18 = 2\\).",
        },
        {
          title: "A minus before a bracket flips the signs inside",
          body: "\\(20 - (8 - x) = 12 + x\\), not \\(12 - x\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-complex-fractions",
      name: "Complex and continued fractions",
      intuition:
        "A fraction with fractions above and below its line is two separate sums. Finish the top, finish the bottom, then divide. A continued fraction is the same idea stacked, so start at the bottom and climb.",
      definition:
        "- Simplify the numerator to one fraction and the denominator to one fraction.\n" +
        "- Then divide: multiply the top by the reciprocal of the bottom.\n" +
        "- Inside either part, BODMAS applies, and 'of' means multiply.\n" +
        "- Continued fraction: work out the lowest level first, flip it, add the level above, and repeat.",
      formula: {
        label: "A fraction over a fraction",
        latex: "\\dfrac{a / b}{c / d} = \\dfrac ab \\times \\dfrac dc",
      },
      authoredExample: {
        prompt: "Simplify \\(\\dfrac{\\tfrac12 + \\tfrac34}{2\\tfrac13 - \\tfrac12}\\).",
        steps: [
          "Top: \\(\\tfrac24 + \\tfrac34 = \\tfrac54\\).",
          "Bottom: \\(\\tfrac73 - \\tfrac12 = \\tfrac{14 - 3}{6} = \\tfrac{11}{6}\\).",
          "\\(\\tfrac54 \\times \\tfrac{6}{11} = \\tfrac{30}{44} = \\tfrac{15}{22}\\).",
        ],
        answer: "\\(\\tfrac{15}{22}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(2 + \\cfrac{1}{1 + \\cfrac{1}{2 + \\cfrac12}}\\).",
        steps: [
          "Bottom: \\(2 + \\tfrac12 = \\tfrac52\\), so the next level is \\(1 + \\tfrac25 = \\tfrac75\\).",
          "\\(2 + \\tfrac57 = \\tfrac{19}{7}\\).",
        ],
        answer: "\\(\\tfrac{19}{7}\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\dfrac{\\tfrac13 + \\tfrac14}{\\tfrac13 - \\tfrac14}\\).", answer: "\\(7\\)" },
        { prompt: "Find \\(1 + \\cfrac{1}{1 + \\cfrac13}\\).", answer: "\\(\\tfrac74\\)" },
        { prompt: "Simplify \\(\\dfrac{\\tfrac34 \\text{ of } \\tfrac89}{\\tfrac23}\\).", answer: "\\(1\\)" },
        { prompt: "Simplify \\(\\dfrac{1 - \\tfrac15}{1 + \\tfrac35}\\).", answer: "\\(\\tfrac12\\)" },
      ],
      pyqExampleId: "474f5c72-b6c9-49ab-8a71-59b9ad96dc99",
      traps: [
        {
          title: "Never cancel across a plus sign",
          body: "\\(\\dfrac{6 + 8}{2} = 7\\). Cancelling the 2 into the 6 alone, to get \\(3 + 8\\), treats a sum as if it were a product.",
        },
        {
          title: "A continued fraction is read from the bottom",
          body: "In \\(1 + \\cfrac{1}{1 + \\cfrac13}\\), the \\(1 + \\tfrac13\\) at the bottom must be found first. Starting at the top adds the wrong things together.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-identities",
      name: "Algebraic shortcuts in simplification",
      intuition:
        "When an expression has the shape of an identity, the arithmetic collapses. \\(a^2 - b^2\\) with awkward decimals becomes \\((a - b)(a + b)\\), usually two round numbers.",
      definition:
        "- \\(a^2 - b^2 = (a - b)(a + b)\\).\n" +
        "- \\(a^2 + 2ab + b^2 = (a + b)^2\\) and \\(a^2 - 2ab + b^2 = (a - b)^2\\).\n" +
        "- \\(\\dfrac{a^3 - b^3}{a^2 + ab + b^2} = a - b\\) and \\(\\dfrac{a^3 + b^3}{a^2 - ab + b^2} = a + b\\).\n" +
        "- If \\(a + b + c = 0\\), then \\(a^3 + b^3 + c^3 - 3abc = 0\\).\n" +
        "- A common factor comes out: \\(ab - ac = a(b - c)\\).",
      formula: {
        label: "Difference of squares",
        latex: "a^2 - b^2 = (a - b)(a + b)",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{5.5 \\times 5.5 - 2.5 \\times 2.5}{0.3}\\).",
        steps: [
          "The top is \\(a^2 - b^2\\) with \\(a = 5.5\\), \\(b = 2.5\\): \\((5.5 - 2.5)(5.5 + 2.5) = 3 \\times 8 = 24\\).",
          "\\(24 \\div 0.3 = 80\\).",
        ],
        answer: "\\(80\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(2.6 \\times 2.6 + 2 \\times 2.6 \\times 0.4 + 0.4 \\times 0.4\\).",
        steps: ["This is \\((a + b)^2\\) with \\(a = 2.6\\) and \\(b = 0.4\\).", "\\((2.6 + 0.4)^2 = 3^2\\)."],
        answer: "\\(9\\).",
      },
      practiceSet: [
        {
          prompt: "Find \\(\\dfrac{(1.35)^3 - (0.65)^3}{(1.35)^2 + 1.35 \\times 0.65 + (0.65)^2}\\).",
          answer: "\\(0.7\\)",
        },
        { prompt: "If \\(a = 101\\), \\(b = 102\\) and \\(c = -203\\), find \\(a^3 + b^3 + c^3 - 3abc\\).", answer: "\\(0\\)" },
        { prompt: "Find \\(\\dfrac{2.4 \\times 1.7 + 2.4 \\times 0.3}{0.08}\\).", answer: "\\(60\\)", method: "Take 2.4 out." },
        { prompt: "Find \\(\\dfrac{128 \\times 128 - 72 \\times 72}{56}\\).", answer: "\\(200\\)" },
      ],
      pyqExampleId: "efac6e3d-6851-4c79-8fb9-7e6df8493662",
      traps: [
        {
          title: "The zero needs a + b + c = 0",
          body: "For \\(a = 1\\), \\(b = 2\\), \\(c = 3\\), \\(a^3 + b^3 + c^3 - 3abc = 1 + 8 + 27 - 18 = 18\\), not 0. Check the sum before using the shortcut.",
        },
        {
          title: "Look for the shape before multiplying",
          body: "Squaring \\(5.5\\) and \\(2.5\\) by hand works but costs time and invites a slip. A difference of two squares, or a repeated factor in two products, is the signal to factor first.",
        },
      ],
    },
  ],
};
