import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PP_SUCCESSIVE_NOTE: SubtopicNote = {
  subtopicName: "Successive Percentage Change",
  title: "Successive Percentage Change",
  oneLineDefinition:
    "Two percentage changes combine by multiplying their factors, never by adding the percentages.",
  whyItMatters:
    "Twelve PYQs, none HARD. Each is a product: area from length and breadth, collection from rent and rooms, a salary raised then cut, price times consumption. Turn each change into a factor such as 1.2 or 0.9, multiply, and read the answer off the product.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspp-successive",
      name: "Multiplying the factors",
      intuition:
        "A \\(20\\%\\) rise multiplies by \\(1.2\\); a \\(10\\%\\) fall multiplies by \\(0.9\\). When a quantity is a product of two things, or changes twice in a row, the factors multiply.",
      definition:
        "- Change of \\(r\\%\\) \\(\\to\\) factor \\(1 + \\dfrac{r}{100}\\) (negative \\(r\\) for a fall).\n" +
        "- Two changes \\(a\\%\\) and \\(b\\%\\): net \\(a + b + \\dfrac{ab}{100}\\) per cent.\n" +
        "- Up \\(x\\%\\) then down \\(x\\%\\): always a net FALL of \\(\\dfrac{x^2}{100}\\%\\).\n" +
        "- Both sides of a rectangle up \\(200\\%\\): each tripled, area \\(\\times 9\\), an increase of \\(800\\%\\).\n" +
        "- Yearly growth for \\(n\\) years: factor \\(\\left(1 + \\dfrac{r}{100}\\right)^n\\).",
      formula: {
        label: "Net change",
        latex: "a + b + \\dfrac{ab}{100}",
      },
      authoredExample: {
        prompt: "The length of a rectangle rises by \\(25\\%\\) and its breadth by \\(20\\%\\). By what per cent does the area rise?",
        steps: ["\\(1.25 \\times 1.2 = 1.5\\)."],
        answer: "\\(50\\%\\).",
      },
      selfCheckExample: {
        prompt: "A price rises \\(15\\%\\) and then falls \\(15\\%\\). What is the net change?",
        steps: ["\\(1.15 \\times 0.85 = 0.9775\\)."],
        answer: "A fall of \\(2.25\\%\\).",
      },
      practiceSet: [
        { prompt: "Up \\(10\\%\\), up \\(10\\%\\). Net?", answer: "\\(+21\\%\\)" },
        { prompt: "Up \\(30\\%\\), down \\(30\\%\\). Net?", answer: "\\(-9\\%\\)" },
        { prompt: "Each side of a square up \\(100\\%\\). Area?", answer: "\\(+300\\%\\)" },
        { prompt: "Up \\(20\\%\\), down \\(10\\%\\). Net?", answer: "\\(+8\\%\\)" },
      ],
      pyqExampleId: "26433c05-b0c8-4ca7-a5ed-ffcb480e88d9", // 2019 (II) — rent and rooms both up 20%
      traps: [
        {
          title: "Percentages do not add",
          body:
            "Rent up \\(20\\%\\) and rooms up \\(20\\%\\) raise the collection by \\(44\\%\\), not \\(40\\%\\). The second change acts on the already-raised amount.",
        },
        {
          title: "Increased BY versus increased TO",
          body:
            "A side 'increased by \\(200\\%\\)' is three times as long. The area becomes nine times as big, which is an increase of \\(800\\%\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspp-consumption",
      name: "Price against consumption",
      intuition:
        "Expenditure is price times quantity. If the price factor is \\(1.25\\), the quantity factor must be \\(\\dfrac{1}{1.25} = 0.8\\) to keep the spend the same. The same holds for length and width at a fixed area.",
      definition:
        "- Price up \\(r\\%\\), same spend: consumption down \\(\\dfrac{r}{100 + r} \\times 100\\%\\).\n" +
        "- Price down \\(r\\%\\), same spend: consumption up \\(\\dfrac{r}{100 - r} \\times 100\\%\\).\n" +
        "- Fixed area: one side up \\(r\\%\\) means the other down \\(\\dfrac{r}{100 + r} \\times 100\\%\\).\n" +
        "- 'A cut of \\(r\\%\\) buys \\(q\\) kg more for Rs. \\(M\\)': the saving \\(\\dfrac{r}{100}M\\) buys \\(q\\) kg at the NEW price.",
      formula: {
        label: "Keeping the spend fixed",
        latex: "\\dfrac{r}{100 + r} \\times 100",
      },
      authoredExample: {
        prompt: "The price of rice rises by \\(20\\%\\). By what per cent must a family cut its consumption to spend the same?",
        steps: ["\\(\\dfrac{20}{120} \\times 100\\)."],
        answer: "\\(16\\tfrac23\\%\\).",
      },
      selfCheckExample: {
        prompt: "A \\(20\\%\\) cut in the price of oil lets a buyer get \\(5\\) litres more for Rs. \\(1000\\). Find the new price per litre.",
        steps: ["The saving is \\(20\\%\\) of \\(1000 =\\) Rs. \\(200\\), which buys \\(5\\) litres at the new price."],
        answer: "Rs. \\(40\\).",
      },
      practiceSet: [
        { prompt: "Price up \\(25\\%\\). Cut in consumption?", answer: "\\(20\\%\\)" },
        { prompt: "Price down \\(20\\%\\). Rise in consumption?", answer: "\\(25\\%\\)" },
        { prompt: "Length up \\(50\\%\\), same area. Width change?", answer: "\\(-33\\tfrac13\\%\\)" },
        { prompt: "Price up \\(12\\%\\). Cut in consumption?", answer: "\\(10\\tfrac57\\%\\)" },
      ],
      pyqExampleId: "93045fe4-6bf8-49a5-a5eb-8bb2a48020bd", // 2018 (I) — wheat price up 25%, same budget
      traps: [
        {
          title: "Not the same percentage back",
          body:
            "A \\(25\\%\\) price rise needs only a \\(20\\%\\) cut in consumption, because the cut is measured on the old, larger consumption.",
        },
      ],
    },
  ],
};
