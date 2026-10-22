import type { SubtopicNote } from "@/app/notes/_types";

export const AF_RP_VARIATION_NOTE: SubtopicNote = {
  subtopicName: "Variation and Work",
  title: "Direct, Inverse and Joint Variation",
  oneLineDefinition:
    "Write the variation as an equation with one constant, find the constant from the values given, and use it for the new values; then spot the same pattern in work, speed and wage problems.",
  whyItMatters:
    "Every computational question here is the same three steps: write the equation with a constant, find the constant, substitute. The HARD ones add a power, a second variable or one more condition, and the word problems (men and days, speed and time) are inverse variation in disguise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afrp-direct-variation",
      name: "Direct variation",
      intuition:
        "\\(x\\) varies directly as \\(y\\) when \\(x = ky\\): double \\(y\\) and \\(x\\) doubles. Every direct-variation question is the same three steps. Write \\(x = ky\\), find \\(k\\) from the pair given, and use it for the new value.",
      definition:
        "- \\(x \\propto y\\) means \\(x = ky\\) for a constant \\(k\\), or equally \\(\\dfrac{x_1}{y_1} = \\dfrac{x_2}{y_2}\\).\n" +
        "- Powers and roots: \\(x \\propto y^2\\) means \\(x = ky^2\\), and \\(x \\propto \\sqrt y\\) means \\(x = k\\sqrt y\\).\n" +
        "- Chains: if \\(x \\propto y^m\\) and \\(y \\propto z^n\\), then \\(x \\propto z^{mn}\\).\n" +
        "- A value that varies as the square of the weight: break the object, and each piece is valued by its own square, so the total value falls.",
      formula: {
        label: "Direct variation",
        latex: "x \\propto y \\;\\text{means}\\; x = ky, \\text{ so } \\dfrac{x_1}{y_1} = \\dfrac{x_2}{y_2}",
      },
      authoredExample: {
        prompt: "\\(x\\) varies as \\(y^2\\), and \\(x = 27\\) when \\(y = 3\\). Find \\(x\\) when \\(y = 5\\).",
        steps: ["\\(27 = k \\times 9\\), so \\(k = 3\\).", "\\(x = 3 \\times 25 = 75\\)."],
        answer: "\\(75\\).",
      },
      selfCheckExample: {
        prompt: "The price of a gold coin varies as the square of its diameter. A 2 cm coin costs ₹8,000. What does a 3 cm coin of the same kind cost?",
        steps: ["The diameter is \\(\\tfrac 32\\) times as large, so the price is \\(\\left(\\tfrac 32\\right)^2 = \\tfrac 94\\) times as large.", "\\(8000 \\times \\tfrac 94 = 18{,}000\\)."],
        answer: "₹18,000.",
      },
      practiceSet: [
        { prompt: "\\(x \\propto y\\), and \\(x = 12\\) when \\(y = 3\\). Find \\(x\\) when \\(y = 7\\).", answer: "\\(28\\)" },
        { prompt: "\\(a \\propto \\sqrt b\\), and \\(a = 10\\) when \\(b = 25\\). Find \\(a\\) when \\(b = 49\\).", answer: "\\(14\\)" },
        { prompt: "\\(p \\propto q^3\\), and \\(p = 16\\) when \\(q = 2\\). Find \\(p\\) when \\(q = 3\\).", answer: "\\(54\\)" },
        { prompt: "8 pens cost ₹96. What do 13 pens cost at the same rate?", answer: "₹156" },
      ],
      pyqExampleId: "92fdf77a-4fff-45e4-910f-c1d48aedcd02",
      traps: [
        {
          title: "A square doubles twice",
          body: "If \\(x \\propto y^2\\) and \\(y\\) doubles, \\(x\\) becomes four times as large, not twice.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-inverse-variation",
      name: "Inverse variation",
      intuition: "\\(x\\) varies inversely as \\(y\\) when their product stays fixed: double \\(y\\) and \\(x\\) halves.",
      definition:
        "- \\(x \\propto \\dfrac 1y\\) means \\(xy = k\\), or equally \\(x_1 y_1 = x_2 y_2\\).\n" +
        "- With a power: \\(x \\propto \\dfrac{1}{y^2}\\) means \\(xy^2 = k\\).",
      formula: {
        label: "Inverse variation",
        latex: "x \\propto \\dfrac 1y \\;\\text{means}\\; xy = k, \\text{ so } x_1 y_1 = x_2 y_2",
      },
      authoredExample: {
        prompt: "\\(a\\) varies inversely as \\(b^2\\), and \\(a = 18\\) when \\(b = 2\\). Find \\(a\\) when \\(b = 3\\).",
        steps: ["\\(k = ab^2 = 18 \\times 4 = 72\\).", "\\(a = \\dfrac{72}{9} = 8\\)."],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "\\(x\\) varies inversely as \\(y\\). If \\(y\\) increases by 25%, by what percentage does \\(x\\) change?",
        steps: ["\\(xy\\) is fixed, so the new \\(x\\) is \\(\\dfrac{x}{1.25} = 0.8x\\)."],
        answer: "It falls by 20%.",
      },
      practiceSet: [
        { prompt: "\\(x \\propto \\dfrac 1y\\), and \\(x = 6\\) when \\(y = 5\\). Find \\(x\\) when \\(y = 10\\).", answer: "\\(3\\)" },
        { prompt: "\\(a \\propto \\dfrac 1b\\), and \\(a = 9\\) when \\(b = 4\\). Find \\(b\\) when \\(a = 12\\).", answer: "\\(3\\)" },
        { prompt: "\\(y \\propto \\dfrac{1}{x^2}\\), and \\(y = 4\\) when \\(x = 3\\). Find \\(y\\) when \\(x = 6\\).", answer: "\\(1\\)" },
      ],
      pyqExampleId: "ab2d2421-1405-4613-8461-54cf9e6cce98",
      traps: [
        {
          title: "Inverse means dividing, not subtracting",
          body: "If \\(y\\) rises from 4 to 8, an inversely varying \\(x\\) halves. It does not fall by 4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-joint-variation",
      name: "Joint and combined variation",
      intuition:
        "Several variations at once multiply into one formula: \\(x\\) varies directly as \\(y\\) and inversely as \\(z^2\\) means \\(x = \\dfrac{ky}{z^2}\\). There is still only one constant to find.",
      definition:
        "- Directly as \\(y\\) and inversely as \\(z\\): \\(x = \\dfrac{ky}{z}\\).\n" +
        "- Jointly as \\(b\\) and \\(c\\): \\(a = kbc\\).\n" +
        "- '\\(y\\) is the sum of two parts, one varying as \\(x\\) and one inversely as \\(x\\)': \\(y = ax + \\dfrac bx\\). That has two constants, so it needs two pairs of values.",
      formula: {
        label: "Combined variation",
        latex: "x \\propto \\dfrac{y}{z^2} \\;\\text{means}\\; x = \\dfrac{ky}{z^2}",
      },
      authoredExample: {
        prompt: "\\(p\\) varies directly as \\(q\\) and inversely as \\(r\\). \\(p = 6\\) when \\(q = 4\\) and \\(r = 2\\). Find \\(p\\) when \\(q = 9\\) and \\(r = 3\\).",
        steps: ["\\(6 = \\dfrac{4k}{2}\\), so \\(k = 3\\).", "\\(p = \\dfrac{3 \\times 9}{3} = 9\\)."],
        answer: "\\(9\\).",
      },
      selfCheckExample: {
        prompt: "\\(z\\) varies jointly as \\(x\\) and \\(y\\). \\(z = 30\\) when \\(x = 2\\) and \\(y = 5\\). Find \\(z\\) when \\(x = 3\\) and \\(y = 4\\).",
        steps: ["\\(30 = 10k\\), so \\(k = 3\\).", "\\(z = 3 \\times 3 \\times 4 = 36\\)."],
        answer: "\\(36\\).",
      },
      practiceSet: [
        { prompt: "\\(a \\propto bc\\), and \\(a = 12\\) when \\(b = 2\\), \\(c = 3\\). Find \\(a\\) when \\(b = 5\\), \\(c = 4\\).", answer: "\\(40\\)" },
        { prompt: "\\(x \\propto \\dfrac yz\\), and \\(x = 10\\) when \\(y = 5\\), \\(z = 2\\). Find \\(x\\) when \\(y = 8\\), \\(z = 4\\).", answer: "\\(8\\)" },
        { prompt: "\\(x \\propto \\dfrac{y^2}{z}\\), and \\(x = 9\\) when \\(y = 3\\), \\(z = 2\\). Find \\(x\\) when \\(y = 6\\), \\(z = 8\\).", answer: "\\(9\\)" },
      ],
      pyqExampleId: "295e79a4-b195-4d58-b0d5-a9e049f4d0fb",
      traps: [
        {
          title: "One relation, one constant",
          body: "'\\(x\\) varies as \\(y\\) and inversely as \\(z\\)' is one relation, \\(x = \\dfrac{ky}{z}\\), with one \\(k\\). Giving \\(y\\) and \\(z\\) a constant each leaves an equation you cannot solve.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afrp-variation-problems",
      name: "Variation in word problems: work, speed and wages",
      intuition:
        "Many word problems are a variation in disguise. For a fixed job, workers and days vary inversely. Over a fixed distance, speed and time vary inversely. Wages go with the work done.",
      definition:
        "- A fixed job: workers × days stays the same (**man-days**).\n" +
        "- A fixed distance: speed × time stays the same, so the times are in the inverse ratio of the speeds.\n" +
        "- Wages are shared in the ratio of the work done. For people working together, that is the ratio of their daily rates \\(\\dfrac 1a : \\dfrac 1b\\).\n" +
        "- A wage bill is workers × wage, so it changes by the compound ratio of the two changes.",
      formula: {
        label: "Man-days",
        latex: "M_1 D_1 = M_2 D_2",
      },
      authoredExample: {
        prompt: "18 workers finish a wall in 10 days. How many days do 12 workers take?",
        steps: ["The wall is \\(18 \\times 10 = 180\\) man-days of work.", "\\(180 \\div 12 = 15\\)."],
        answer: "15 days.",
      },
      selfCheckExample: {
        prompt: "Three trains run at speeds in the ratio \\(2 : 3 : 6\\). Find the ratio of the times they take over the same distance.",
        steps: ["Times go inversely: \\(\\tfrac 12 : \\tfrac 13 : \\tfrac 16\\).", "Multiply by 6."],
        answer: "\\(3 : 2 : 1\\).",
      },
      practiceSet: [
        { prompt: "10 men do a job in 12 days. How many men are needed to do it in 8 days?", answer: "15" },
        { prompt: "A and B can do a job in 10 and 15 days. They do it together. In what ratio should they share the wages?", answer: "\\(3 : 2\\)" },
        { prompt: "Two cars cover the same distance at speeds in the ratio \\(5 : 4\\). Find the ratio of their times.", answer: "\\(4 : 5\\)" },
        {
          prompt: "The number of workers falls in the ratio \\(4 : 3\\) and their wages rise in the ratio \\(5 : 6\\). Find the ratio of the new wage bill to the old.",
          answer: "\\(9 : 10\\)",
          method: "\\(\\tfrac 34 \\times \\tfrac 65\\).",
        },
      ],
      pyqExampleId: "73159679-0ecb-4b02-b23f-58f7d746d68d",
      traps: [
        {
          title: "More workers, fewer days",
          body: "12 workers take 10 days, so 20 workers take 6 days. Setting it up as a direct proportion, \\(12 : 20 = 10 : x\\), gives 16.7 days: longer with more people.",
        },
      ],
    },
  ],
};
