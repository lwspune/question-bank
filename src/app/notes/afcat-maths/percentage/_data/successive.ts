import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_SUCCESSIVE_NOTE: SubtopicNote = {
  subtopicName: "Successive Change, Price and Consumption",
  title: "Successive Changes, Price and Consumption",
  oneLineDefinition:
    "Each percentage change multiplies by a factor: chain the factors, undo one, and use price times quantity to keep a budget fixed or to see how much more a cheaper price buys.",
  whyItMatters:
    "This is where AFCAT asks most: eight of the chapter's fourteen past-year questions are on this page, from 2015, 2018 and 2019. They are a price cut that must be restored, a budget kept fixed when the price moves, a cheaper price that buys a few kilograms more, and a school roll that rises and falls. Every one is a product of factors, and the usual slip is to add percentages instead.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-net-effect",
      name: "The net effect of successive changes",
      intuition:
        "A 30% rise multiplies by 1.3 and a 20% fall multiplies by 0.8. One after the other they multiply by \\(1.3 \\times 0.8 = 1.04\\), a net rise of 4%, less than the plain difference of the two percentages.",
      definition:
        "- Write each change as a factor: a rise of \\(r\\%\\) is \\(1 + \\tfrac{r}{100}\\), a fall is \\(1 - \\tfrac{r}{100}\\). Multiply all the factors.\n" +
        "- For two changes \\(a\\%\\) and \\(b\\%\\) (a fall is negative) the net change is \\(a + b + \\dfrac{ab}{100}\\) per cent.\n" +
        "- The order does not matter: up 30% then down 20% equals down 20% then up 30%.\n" +
        "- Up \\(x\\%\\) then down \\(x\\%\\) is always a loss of \\(\\dfrac{x^2}{100}\\%\\), never zero.\n" +
        "- Given the final value, divide by the product of the factors to get the start.",
      formula: {
        label: "Two successive changes",
        latex: "\\text{net } \\% = a + b + \\dfrac{ab}{100}",
      },
      authoredExample: {
        prompt: "A price rises by 30% and then falls by 20%. Find the net change.",
        steps: [
          "Factors: \\(1.3 \\times 0.8 = 1.04\\).",
          "Check with the formula: \\(30 + (-20) + \\tfrac{30 \\times (-20)}{100} = 30 - 20 - 6 = 4\\).",
        ],
        answer: "A 4% increase.",
      },
      selfCheckExample: {
        prompt: "A number is increased by 25%, then decreased by 20%, then increased by 15%. Find the net change.",
        steps: ["\\(1.25 \\times 0.8 = 1\\): the first two cancel exactly.", "Then \\(1 \\times 1.15 = 1.15\\)."],
        answer: "A 15% increase.",
      },
      practiceSet: [
        { prompt: "Up 50% and then down 30%. Net change?", answer: "5% increase" },
        { prompt: "Down 20% and then down 20% again. Net change?", answer: "36% decrease" },
        { prompt: "Up 15% and then down 15%. Net change?", answer: "2.25% decrease" },
        {
          prompt: "A salary is raised by 20% and then cut by 5%, and is now ₹22,800. Find the original salary.",
          answer: "₹20,000",
          method: "\\(1.2 \\times 0.95 = 1.14\\).",
        },
      ],
      pyqExampleId: "ca6b2b4e-daae-47e2-b31d-dfd54aef7f8a",
      traps: [
        {
          title: "Up and down by the same percentage is a loss",
          body: "Up 30% then down 30% is \\(1.3 \\times 0.7 = 0.91\\), a 9% fall. The fall is taken on the larger number, so it removes more than the rise added.",
        },
        {
          title: "Do not add the percentages",
          body: "Up 30% then down 20% is not the difference of the two. The second change acts on the new value, which is why the formula has the extra \\(\\tfrac{ab}{100}\\) term.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-undo-change",
      name: "Undoing a change: the percentage needed to get back",
      intuition:
        "Cut a price of 100 by 40% and it becomes 60. To get back to 100 it must rise by 40 on 60, which is 66⅔%. The way back is a bigger percentage because it starts from a smaller number.",
      definition:
        "- After a fall of \\(r\\%\\), the rise that restores it is \\(\\dfrac{r}{100 - r} \\times 100\\%\\).\n" +
        "- After a rise of \\(r\\%\\), the fall that restores it is \\(\\dfrac{r}{100 + r} \\times 100\\%\\).\n" +
        "- Both are the 'swap the base' rule from the comparison page: the same gap, measured on the new value.",
      formula: {
        label: "The change that undoes another",
        latex: "\\text{after a fall of } r\\%: \\; \\dfrac{100r}{100 - r}\\% \\text{ rise}, \\qquad \\text{after a rise of } r\\%: \\; \\dfrac{100r}{100 + r}\\% \\text{ fall}",
      },
      authoredExample: {
        prompt: "A price is cut by 40%. By what percent must the new price be raised to restore the original?",
        steps: ["Take the price as 100; after the cut it is 60.", "It must rise by 40 on 60: \\(\\tfrac{40}{60} = 66\\tfrac 23\\%\\)."],
        answer: "\\(66\\tfrac 23\\%\\).",
      },
      selfCheckExample: {
        prompt: "A price rises by 75%. By what percent must it fall to return to the original?",
        steps: ["100 becomes 175.", "It must fall by 75 on 175: \\(\\tfrac{75}{175} = \\tfrac 37 = 42\\tfrac 67\\%\\)."],
        answer: "\\(42\\tfrac 67\\%\\).",
      },
      practiceSet: [
        { prompt: "A price is cut by 30%. What rise restores it?", answer: "\\(42\\tfrac 67\\%\\)" },
        { prompt: "A price rises by 20%. What fall restores it?", answer: "\\(16\\tfrac 23\\%\\)" },
        { prompt: "A number is decreased by 15%. What rise restores it?", answer: "about 17.65%", method: "\\(\\tfrac{15}{85}\\)." },
        { prompt: "A price doubles. What fall brings it back?", answer: "50%" },
      ],
      pyqExampleId: "9db79dc2-ac07-4622-8b2a-ad59398eac6a",
      traps: [
        {
          title: "The same percentage does not undo it",
          body: "A 40% cut followed by a 40% rise ends at \\(0.6 \\times 1.4 = 0.84\\), still 16% short. The rise has to be measured on the smaller, cut price.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-product-change",
      visualizationSlug: "af-area-change",
      name: "When a quantity is a product: area, volume, takings",
      intuition:
        "Area is length times breadth, so if both grow the area grows by the product of their factors. The same holds for any product: takings are price times sales, pay is rate times hours, a fraction is a numerator over a denominator.",
      definition:
        "- If \\(Q = X \\times Y\\) and X, Y change by \\(a\\%\\), \\(b\\%\\), then Q changes by \\(a + b + \\tfrac{ab}{100}\\) per cent, the successive-change formula again.\n" +
        "- A square or a circle: the area changes by the factor **squared**, so a radius 10% longer gives \\(1.1^2 = 1.21\\), a 21% larger area.\n" +
        "- A cube or a sphere: the volume changes by the factor **cubed**. A cylinder: radius squared times height.\n" +
        "- A perimeter or a circumference changes by the factor itself, once.\n" +
        "- A fraction whose numerator rises by \\(a\\%\\) and denominator falls by \\(b\\%\\) is multiplied by \\(\\dfrac{1 + a/100}{1 - b/100}\\).",
      formula: {
        label: "Change in a product",
        latex: "Q = XY \\;\\Rightarrow\\; \\text{factor}_Q = \\left(1 + \\tfrac{a}{100}\\right)\\left(1 + \\tfrac{b}{100}\\right)",
      },
      authoredExample: {
        prompt: "The length of a rectangle is increased by 30% and its breadth by 10%. Find the percentage increase in its area.",
        steps: [
          "Factor: \\(1.3 \\times 1.1 = 1.43\\).",
          "On a 100-unit rectangle the extra is a 30-unit strip, a 10-unit strip and a 3-unit corner where they overlap: \\(30 + 10 + 3 = 43\\).",
        ],
        answer: "43%.",
      },
      selfCheckExample: {
        prompt: "The radius of a circle is increased by 10%. By what percent does its area increase?",
        steps: ["Area goes with the square of the radius: \\(1.1^2 = 1.21\\)."],
        answer: "21%.",
      },
      practiceSet: [
        { prompt: "The side of a cube is increased by 10%. Find the percentage increase in volume.", answer: "33.1%" },
        { prompt: "A price rises by 15% and the number sold falls by 15%. Find the change in takings.", answer: "2.25% fall" },
        {
          prompt: "A fraction's numerator is increased by 25% and its denominator decreased by 10%. The new value is \\(\\tfrac 56\\). Find the fraction.",
          answer: "\\(\\tfrac 35\\)",
          method: "The fraction was multiplied by \\(\\tfrac{1.25}{0.9} = \\tfrac{25}{18}\\).",
        },
        { prompt: "The side of a square is increased by 35%. Find the percentage increase in its perimeter.", answer: "35%" },
      ],
      pyqExampleId: "442c37a0-c98c-4f0d-9426-a19632d20f28",
      traps: [
        {
          title: "Area squares the change",
          body: "A side 10% longer gives an area 21% larger, not 10%. A perimeter, though, grows by the same 10%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-fixed-spend",
      name: "Keeping expenditure fixed when the price changes",
      intuition:
        "Expenditure is price times consumption. If the price rises by 60%, consumption must fall so that the two factors multiply back to 1. That is the undo-a-change rule from earlier on this page.",
      definition:
        "- **Expenditure = price × consumption.** For the bill to stay the same, the consumption factor must cancel the price factor.\n" +
        "- Price up \\(r\\%\\): cut consumption by \\(\\dfrac{r}{100 + r} \\times 100\\%\\).\n" +
        "- Price down \\(r\\%\\): consumption can rise by \\(\\dfrac{r}{100 - r} \\times 100\\%\\).\n" +
        "- If both move by given amounts, the change in spending is the product of the two factors: price up 12% and consumption down 10% gives \\(1.12 \\times 0.9 = 1.008\\), 0.8% more spent.",
      formula: {
        label: "Consumption cut for a fixed budget",
        latex: "\\text{cut} = \\dfrac{r}{100 + r} \\times 100\\%",
      },
      authoredExample: {
        prompt: "The price of oil rises by 60%. By what percent must a family cut its use so that it spends the same?",
        steps: ["The price factor is 1.6, so consumption must become \\(\\tfrac{1}{1.6} = 0.625\\) of itself.", "That is a cut of \\(\\tfrac{60}{160} = 37.5\\%\\)."],
        answer: "37.5%.",
      },
      selfCheckExample: {
        prompt: "The price of rice falls by 37.5%. By what percent can a family increase its consumption without spending more?",
        steps: ["Price factor 0.625, so consumption can be \\(\\tfrac{1}{0.625} = 1.6\\) times.", "Check: \\(\\tfrac{37.5}{62.5} = 60\\%\\)."],
        answer: "60%.",
      },
      practiceSet: [
        { prompt: "Price up 50%. Cut in consumption for the same spending?", answer: "\\(33\\tfrac 13\\%\\)" },
        { prompt: "Price up 10%. Cut in consumption for the same spending?", answer: "\\(9\\tfrac 1{11}\\%\\)" },
        { prompt: "Price halves. By what percent can consumption rise for the same spending?", answer: "100%" },
        { prompt: "Price up 12% and consumption down 10%. Change in spending?", answer: "0.8% increase" },
      ],
      pyqExampleId: "3f3eef71-5849-4d95-a7c4-38de72661aef",
      traps: [
        {
          title: "The cut is smaller than the rise",
          body: "A 60% price rise needs only a 37.5% cut in use, because the cut is taken on the old consumption while the rise was on the old price.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-cheaper-buys-more",
      name: "A cheaper price buys more for the same money",
      intuition:
        "When the price of rice falls by 25%, the same ₹540 saves 25% of ₹540, which is ₹135, compared with the old price. That ₹135 is what pays for the extra kilograms, at the new price.",
      definition:
        "- **The saving method:** a price cut of \\(r\\%\\) on a fixed sum \\(M\\) saves \\(\\tfrac{r}{100} M\\). That buys the extra quantity at the **reduced** price, so reduced price \\(= \\dfrac{rM/100}{\\text{extra quantity}}\\).\n" +
        "- The original price is then the reduced price divided by \\(1 - \\tfrac{r}{100}\\).\n" +
        "- A price **rise** means fewer kilograms. With the price up a quarter, the money buys \\(\\tfrac{1}{1.25} = \\tfrac 45\\) of the old quantity, so the shortfall is a fifth of the old quantity.",
      formula: {
        label: "Reduced price from the extra quantity",
        latex: "\\text{reduced price} = \\dfrac{\\tfrac{r}{100} \\times M}{\\text{extra quantity}}",
      },
      authoredExample: {
        prompt: "A 25% fall in the price of rice lets a man buy 6 kg more for ₹540. Find the reduced price per kg.",
        steps: [
          "The cut saves \\(0.25 \\times 540 = 135\\) rupees, and that buys the extra 6 kg.",
          "Reduced price \\(= 135 \\div 6 = 22.5\\) rupees a kg.",
          "Check: the old price was \\(22.5 \\div 0.75 = 30\\). ₹540 bought 18 kg before and buys 24 kg now.",
        ],
        answer: "₹22.50 per kg.",
      },
      selfCheckExample: {
        prompt: "A 25% rise in the price of dal means a buyer gets 2 kg less for ₹300. Find the original price per kg.",
        steps: [
          "At 1.25 times the price, ₹300 buys four fifths of the old quantity, so 2 kg is a fifth of the old quantity.",
          "The old quantity was 10 kg, so the old price was \\(300 \\div 10 = 30\\) rupees. Check: at ₹37.50 a kg, ₹300 buys 8 kg.",
        ],
        answer: "₹30 per kg.",
      },
      practiceSet: [
        { prompt: "A 10% cut in the price of pens gives 5 more pens for ₹180. Find the reduced price of a pen.", answer: "₹3.60" },
        { prompt: "A 30% cut in price gives 9 more notebooks for ₹180. Find the reduced price of a notebook.", answer: "₹6" },
      ],
      pyqExampleId: "f4c9498a-8aef-4255-a4d2-b070dbba965e",
      traps: [
        {
          title: "The saving method gives the reduced price",
          body: "The money saved buys the extra kilograms at the new price. If the question asks for the original price, divide by \\(1 - \\tfrac{r}{100}\\) at the end.",
        },
        {
          title: "Per dozen, per kg, per item",
          body: "Read the unit asked. A reduced price of ₹1.10 an apple is ₹13.20 a dozen, and both are usually among the options.",
        },
      ],
    },
  ],
};
