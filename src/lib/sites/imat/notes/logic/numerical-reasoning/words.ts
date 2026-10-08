import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Equations from Word Problems",
  title: "Turning a Story into Arithmetic",
  oneLineDefinition:
    "Name the unknown, turn each sentence into a relation, solve, and check the answer against the story; when that is slow, work backwards or test the options.",
  whyItMatters:
    "Setting up an equation from a story is the commonest skill in this chapter: ages, shared money, tickets and coins in the Cambridge papers, and in 2026 a chain of two relations to rearrange.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-nur-equations",
      name: "Setting up and solving an equation from a word problem",
      intuition:
        "A word problem is an equation written in sentences. Give the unknown a letter, then each fact in the story becomes one line of algebra. Once it is written down, the solving is routine; the real work is the translation. Always check your answer in the original story, not in your equation, because a slip in translation gives an equation that is solved correctly and still wrong.",
      definition:
        "The method in four steps:\n" +
        "- **Name** the unknown with a letter, and write what it stands for (\"\\(d\\) = daughter's age now\").\n" +
        "- **Translate** each sentence: \"is\" becomes \\(=\\), \"3 times as many\" becomes \\(3\\times\\), \"5 less than \\(x\\)\" becomes \\(x - 5\\), \"in 4 years\" adds 4 to every age.\n" +
        "- **Solve**: one unknown needs one equation; two unknowns need two independent facts.\n" +
        "- **Answer the question asked** and check it in the story. The letter you solved for is often not the quantity the question wants.",
      authoredExample: {
        prompt:
          "A mother is three times as old as her daughter. In 12 years she will be twice as old as her daughter. How old are they now?",
        steps: [
          "Let \\(d\\) be the daughter's age now. The mother is \\(3d\\).",
          "In 12 years: mother \\(3d + 12\\), daughter \\(d + 12\\). The story says \\(3d + 12 = 2(d + 12)\\).",
          "Expand: \\(3d + 12 = 2d + 24\\), so \\(d = 12\\) and the mother is 36.",
          "Check in the story: in 12 years they are 48 and 24, and 48 is twice 24.",
        ],
        answer: "Daughter 12, mother 36",
      },
      selfCheckExample: {
        prompt:
          "A school buys 40 concert tickets. Student tickets cost €15 and teacher tickets cost €25. The school pays €680 in total. How many teacher tickets did it buy?",
        options: ["32", "27", "8", "12", "10"],
        steps: [
          "Let \\(t\\) be the number of teacher tickets, so there are \\(40 - t\\) student tickets.",
          "Cost: \\(15(40 - t) + 25t = 680\\), so \\(600 + 10t = 680\\) and \\(t = 8\\).",
          "Check: 32 student tickets cost €480, 8 teacher tickets cost €200, total €680.",
          "Option A is the number of student tickets, the right answer to the wrong question. Option B divides €680 by €25 as if every ticket were a teacher ticket.",
        ],
        answer: "(C) 8",
      },
      practiceSet: [
        { prompt: "Three consecutive whole numbers add up to 72. What is the largest of them?", answer: "25", method: "\\(n + (n+1) + (n+2) = 72\\) gives \\(n = 23\\)" },
        { prompt: "A number is doubled and then 7 is subtracted. The result is 29. What is the number?", answer: "18", method: "\\(2x - 7 = 29\\)" },
        { prompt: "A pen costs €1.20 more than a pencil. Together they cost €2.00. What does the pencil cost?", answer: "€0.40", method: "\\(p + (p + 1.20) = 2.00\\)" },
      ],
      traps: [
        {
          title: "Solving for the wrong quantity",
          body: "If the question asks for the teacher tickets and your letter stands for the student tickets, the number you find is a correct answer to a different question. IMAT puts that number among the options. Re-read the last line of the question before choosing.",
        },
        {
          title: "\"5 less than x\" is x − 5",
          body: "The order in the sentence is the reverse of the order in the algebra: \"5 less than \\(x\\)\" is \\(x - 5\\), not \\(5 - x\\). In the same way, \"A has 3 more than B\" is \\(A = B + 3\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-substitution",
      name: "Linked relations: substituting one into another",
      intuition:
        "When two relations share a letter, you can replace that letter in one relation by what the other says it equals. The shared letter disappears, and you are left with a direct link between the other two. The same idea solves two equations with two unknowns: make one letter the subject, then put it into the other equation.",
      definition:
        "**Substitution**: if \\(a = 4b\\) and \\(b = 5c\\), replace \\(b\\) in the first relation to get \\(a = 4 \\times 5c = 20c\\).\n" +
        "- Multipliers along a chain **multiply**, they do not add.\n" +
        "- To **invert** a relation, divide both sides: \\(a = 20c\\) gives \\(c = a/20\\).\n" +
        "- **Two unknowns**: two facts such as a sum and a difference. Make one letter the subject of one equation and substitute it into the other.",
      formula: {
        label: "Chaining two relations",
        latex: "a = kb \\ \\text{and}\\ b = mc \\;\\Rightarrow\\; a = kmc, \\quad c = \\frac{a}{km}",
        symbols: [
          { symbol: "\\(k, m\\)", meaning: "the multipliers in each relation" },
          { symbol: "\\(a, b, c\\)", meaning: "the linked quantities; \\(b\\) is the shared letter that disappears" },
        ],
      },
      authoredExample: {
        prompt:
          "Given \\(p = 4q\\) and \\(q = \\dfrac{r}{6}\\), write \\(p\\) in terms of \\(r\\), and then \\(r\\) in terms of \\(p\\).",
        steps: [
          "Replace \\(q\\) in the first relation: \\(p = 4 \\times \\dfrac{r}{6} = \\dfrac{4r}{6} = \\dfrac{2r}{3}\\).",
          "Invert: multiply both sides by 3 to get \\(3p = 2r\\), then divide by 2: \\(r = \\dfrac{3p}{2}\\).",
          "Check with a number: take \\(r = 6\\). Then \\(q = 1\\), \\(p = 4\\), and \\(\\dfrac{3 \\times 4}{2} = 6\\). Correct.",
        ],
        answer: "\\(p = \\dfrac{2r}{3}\\) and \\(r = \\dfrac{3p}{2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(a = 5b\\) and \\(c = 2a\\), which of the following is correct?",
        options: [
          "\\(c = 7b\\)",
          "\\(b = \\dfrac{c}{10}\\)",
          "\\(b = 10c\\)",
          "\\(c = \\dfrac{5b}{2}\\)",
          "\\(a = 2c\\)",
        ],
        steps: [
          "Substitute \\(a = 5b\\) into \\(c = 2a\\): \\(c = 2 \\times 5b = 10b\\).",
          "Invert: \\(b = \\dfrac{c}{10}\\).",
          "Option A adds the multipliers instead of multiplying them. Option C inverts the wrong way. Option E reverses \\(c = 2a\\). A quick test with \\(b = 1\\) (so \\(a = 5\\), \\(c = 10\\)) rules them all out.",
        ],
        answer: "(B) \\(b = \\dfrac{c}{10}\\)",
      },
      practiceSet: [
        { prompt: "If \\(x = 2y\\) and \\(y = 3z\\), write \\(x\\) in terms of \\(z\\).", answer: "\\(x = 6z\\)", method: "Multipliers multiply along the chain" },
        { prompt: "If \\(m = \\dfrac{n}{4}\\) and \\(n = 8k\\), write \\(m\\) in terms of \\(k\\).", answer: "\\(m = 2k\\)", method: "\\(m = \\dfrac{8k}{4}\\)" },
        { prompt: "Two numbers add up to 50 and differ by 14. What are they?", answer: "32 and 18", method: "Add the equations: \\(2x = 64\\)" },
      ],
      traps: [
        {
          title: "Chained multipliers multiply",
          body: "If \\(a = 4b\\) and \\(b = 5c\\), then \\(a = 20c\\), not \\(9c\\). Adding the two multipliers is the most common wrong option. Test any answer with a small number before you choose it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-backwards",
      name: "Working backwards and testing the options",
      intuition:
        "When a story tells you the end result of a series of steps, start at the end and undo each step in reverse order. Each operation has an opposite: undo adding with subtracting, doubling with halving. When the equation is awkward, remember that IMAT gives you five answers: putting each one into the story is a legitimate method, and usually only one survives.",
      definition:
        "Two methods that avoid heavy algebra:\n" +
        "- **Working backwards**: begin with the final value and undo the steps **in reverse order**. \"Half of what is left, plus 2\" is undone by adding 2 and then doubling.\n" +
        "- **Testing the options**: put each option into the story and keep the one that fits every condition. Start with an option in the middle of the range; if it is too big, the answer is smaller.\n" +
        "- Either way, finish by running the answer forwards through the story once.",
      authoredExample: {
        prompt:
          "A farmer sells half of his eggs plus 2 more to the first customer. He then sells half of the remaining eggs plus 2 more to the second customer. He has 5 eggs left. How many did he start with?",
        steps: [
          "Before the second sale: undo \"minus 2\" then undo \"half\": \\((5 + 2) \\times 2 = 14\\).",
          "Before the first sale: \\((14 + 2) \\times 2 = 32\\).",
          "Run it forwards: 32, sell 16 + 2 = 18, leaving 14; sell 7 + 2 = 9, leaving 5. Correct.",
        ],
        answer: "32 eggs",
      },
      selfCheckExample: {
        prompt:
          "Ana spends one third of her money on a book and then €12 on lunch. She now has exactly half of the money she started with. How much did she start with?",
        options: ["€36", "€48", "€60", "€72", "€24"],
        steps: [
          "Test each option. €72: the book costs €24, leaving €48; lunch leaves €36, which is half of €72. It fits.",
          "€60 leaves €28, not €30. €48 leaves €20, not €24. €36 leaves €12, not €18. €24 leaves €4, not €12.",
          "By algebra: \\(x - \\dfrac{x}{3} - 12 = \\dfrac{x}{2}\\), so \\(\\dfrac{x}{6} = 12\\) and \\(x = 72\\).",
        ],
        answer: "(D) €72",
      },
      practiceSet: [
        { prompt: "I think of a number, subtract 4, then multiply by 5. The result is 35. What was my number?", answer: "11", method: "Backwards: \\(35 \\div 5 + 4\\)" },
        { prompt: "Ben takes 10 sweets from a box. Ciara then takes half of what is left, leaving 14. How many sweets were in the box?", answer: "38", method: "\\(14 \\times 2 + 10\\)" },
        { prompt: "Which of 6, 7, 8, 9 or 10 satisfies \\(n^2 - 5n = 24\\)?", answer: "8", method: "\\(64 - 40 = 24\\)" },
      ],
      traps: [
        {
          title: "Undo the steps in reverse order",
          body: "If the story says \"take half, then subtract 2\", going backwards you add 2 first and double second. Doubling first and then adding 2 gives a different, wrong starting value, and that value is often one of the options.",
        },
      ],
    },
  ],
};
