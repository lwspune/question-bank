import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_GROWTH_NOTE: SubtopicNote = {
  subtopicName: "Population and Growth",
  title: "Population Growth and Depreciation",
  oneLineDefinition:
    "A population or a value that changes by a percentage each year is multiplied by the same factor every year: go forward, go back, change the rate year by year, or find the rate.",
  whyItMatters:
    "About a quarter of this page is HARD, more than any page before it, because the numbers are large and the factor is raised to a power. Two things decide the marks: dividing (not subtracting) when going back in time, and spotting that 1.44 or 1.728 is a familiar square or cube.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-compound-growth",
      name: "Growth and depreciation year after year",
      intuition:
        "A town that grows 12.5% a year is multiplied by 1.125 every year, and each year's growth is on the new, larger figure. Three years multiply by \\(1.125^3\\).",
      definition:
        "- After \\(n\\) years at \\(r\\%\\) growth: \\(P_n = P \\left(1 + \\tfrac{r}{100}\\right)^n\\).\n" +
        "- Depreciation (a machine, a car, a falling population) uses \\(1 - \\tfrac{r}{100}\\).\n" +
        "- Births and deaths, or arrivals and departures, in the same year: use the **net** rate, births minus deaths.\n" +
        "- The period need not be a year. 'Rises 20% every 5 years' over 10 years is two periods.",
      formula: {
        label: "Compound growth",
        latex: "P_n = P\\left(1 + \\dfrac{r}{100}\\right)^n",
      },
      authoredExample: {
        prompt: "A town of 64,000 grows by 12.5% a year. Find its population after 3 years.",
        steps: [
          "12.5% is one eighth, so each year adds an eighth.",
          "\\(64000 \\to 72000 \\to 81000 \\to 91125\\).",
        ],
        answer: "91,125.",
      },
      selfCheckExample: {
        prompt: "A machine worth ₹1,25,000 depreciates by 20% a year. Find its value after 2 years.",
        steps: ["\\(125000 \\times 0.8 = 100000\\).", "\\(100000 \\times 0.8 = 80000\\)."],
        answer: "₹80,000.",
      },
      practiceSet: [
        { prompt: "₹40,000 grows at 10% a year. Find the value after 2 years.", answer: "₹48,400" },
        { prompt: "A population of 10,000 falls by 4% a year. Find it after 2 years.", answer: "9,216" },
        { prompt: "A town of 1,00,000 has a birth rate of 4.5% and a death rate of 2.5% a year. Find its population after 1 year.", answer: "1,02,000" },
      ],
      pyqExampleId: "a6166858-0820-4be9-af26-b5451800e4f4",
      traps: [
        {
          title: "Compound, not simple",
          body: "12.5% a year for 3 years is not 37.5% in all. Each year's growth is on the new figure, so 64,000 becomes 91,125, not 88,000.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-going-back",
      name: "Going back in time",
      intuition:
        "To find a population two years ago, undo two years of growth: divide by the factor twice. Subtracting the percentage from today's figure gives the wrong base.",
      definition:
        "- \\(n\\) years ago: \\(P = \\dfrac{P_n}{\\left(1 + \\tfrac{r}{100}\\right)^n}\\). For depreciation, divide by \\(\\left(1 - \\tfrac{r}{100}\\right)^n\\).\n" +
        "- Friendly divisors: \\(0.9^2 = 0.81\\), \\(0.8^2 = 0.64\\), \\(0.85^2 = 0.7225\\), \\(1.2^2 = 1.44\\), \\(1.15^2 = 1.3225\\).\n" +
        "- If an option is a round number, check it forward: multiply the option by the factors and see if you reach the given figure.",
      formula: {
        label: "The starting value",
        latex: "P = \\dfrac{P_n}{\\left(1 \\pm \\tfrac{r}{100}\\right)^n}",
      },
      authoredExample: {
        prompt: "After 2 years of 10% growth, a population is 60,500. What was it 2 years ago?",
        steps: ["\\(1.1^2\\) multiplied the population, so divide by it.", "\\(60500 \\div 1.1 = 55000\\), and \\(55000 \\div 1.1 = 50000\\)."],
        answer: "50,000.",
      },
      selfCheckExample: {
        prompt: "A car loses 20% of its value every year and is worth ₹3,20,000 now. What was it worth 2 years ago?",
        steps: ["\\(0.8^2 = 0.64\\).", "\\(320000 \\div 0.64 = 500000\\)."],
        answer: "₹5,00,000.",
      },
      practiceSet: [
        { prompt: "After a year of 15% growth a population is 23,000. What was it a year ago?", answer: "20,000" },
        { prompt: "After two years of 20% growth a population is 43,200. What was it at the start?", answer: "30,000" },
        { prompt: "A price falls by 10% each month and is now ₹810. What was it two months ago?", answer: "₹1,000" },
      ],
      pyqExampleId: "ef0a89b3-76fd-48a6-b420-b1c5a726ff49",
      traps: [
        {
          title: "Divide, do not subtract",
          body: "For 60,500 after two years of 10% growth, taking 10% off twice gives 49,005. The answer is 50,000: the growth was on the smaller, earlier figure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-yearly-rates",
      name: "A different rate each year",
      intuition:
        "When the rate changes from year to year, multiply by each year's own factor. A rise, a fall and a rise is three different factors in a row, the successive-change idea again.",
      definition:
        "- \\(P_{\\text{final}} = P \\times \\left(1 + \\tfrac{r_1}{100}\\right)\\left(1 + \\tfrac{r_2}{100}\\right)\\cdots\\), with a minus sign for each fall.\n" +
        "- Losses stack the same way: 10% die, then 20% of the survivors leave, keeps \\(0.9 \\times 0.8 = 0.72\\).\n" +
        "- Up \\(x\\%\\) and then down \\(x\\%\\) leaves \\(1 - \\tfrac{x^2}{10000}\\), so a final drop of 9% means \\(x^2 = 900\\).\n" +
        "- Given the final figure, divide by the product of the factors.",
      formula: {
        label: "Changing rates",
        latex: "P_{\\text{final}} = P\\left(1 + \\tfrac{r_1}{100}\\right)\\left(1 + \\tfrac{r_2}{100}\\right)\\left(1 + \\tfrac{r_3}{100}\\right)",
      },
      authoredExample: {
        prompt: "A population of 50,000 grows by 10%, then falls by 20%, then grows by 25%. Find the final population.",
        steps: ["\\(50000 \\times 1.1 = 55000\\).", "\\(55000 \\times 0.8 = 44000\\).", "\\(44000 \\times 1.25 = 55000\\)."],
        answer: "55,000 (a net rise of 10%).",
      },
      selfCheckExample: {
        prompt: "An epidemic kills 10% of a village, and then 20% of the survivors leave. 7,200 people remain. What was the original population?",
        steps: ["\\(0.9 \\times 0.8 = 0.72\\) of the village remains.", "\\(7200 \\div 0.72 = 10000\\)."],
        answer: "10,000.",
      },
      practiceSet: [
        { prompt: "A population of 25,000 rises by 20% and then falls by 20%. Find it now.", answer: "24,000" },
        { prompt: "A population rises by x% and then falls by x%, ending 9% lower. Find x.", answer: "\\(30\\)" },
        { prompt: "A population grows by 10% and then by 20% to reach 33,000. Find the starting population.", answer: "25,000", method: "\\(1.1 \\times 1.2 = 1.32\\)." },
      ],
      pyqExampleId: "cd44e4a6-c145-4ce1-89cc-68d9a139c6be",
      traps: [
        {
          title: "The second loss is on the survivors",
          body: "10% die and then 20% of the rest leave is a loss of 28%, not 30%. The 20% is of the 90% left.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-growth-rate",
      name: "Finding the rate of growth",
      intuition:
        "If a town grows from 40,000 to 57,600 in two years, the two-year factor is 1.44. The yearly factor is its square root, 1.2, so the rate is 20%.",
      definition:
        "- Factor over \\(n\\) years \\(=\\) final \\(\\div\\) start. The yearly factor is its \\(n\\)th root.\n" +
        "- Recognise the common powers: \\(1.2^2 = 1.44\\), \\(1.25^2 = 1.5625\\), \\(1.06^2 = 1.1236\\), \\(1.2^3 = 1.728\\), \\(1.05^3 = 1.157625\\).\n" +
        "- When the factor is not a neat power, test the options forward: raise each \\(1 + \\tfrac{r}{100}\\) to the power and compare.",
      formula: {
        label: "Rate from two figures",
        latex: "1 + \\dfrac{r}{100} = \\left(\\dfrac{P_n}{P}\\right)^{1/n}",
      },
      authoredExample: {
        prompt: "A town grows from 40,000 to 57,600 in 2 years. Find the yearly rate of growth.",
        steps: ["\\(57600 \\div 40000 = 1.44\\).", "\\(\\sqrt{1.44} = 1.2\\)."],
        answer: "20% a year.",
      },
      selfCheckExample: {
        prompt: "A population grows from 64,000 to 1,00,000 in 2 years. Find the yearly rate.",
        steps: ["\\(100000 \\div 64000 = 1.5625\\).", "\\(\\sqrt{1.5625} = 1.25\\)."],
        answer: "25% a year.",
      },
      practiceSet: [
        { prompt: "A population grows from 10,000 to 11,236 in 2 years. Find the yearly rate.", answer: "6%" },
        { prompt: "A town grows from 8,000 to 9,261 in 3 years. Find the yearly rate.", answer: "5%", method: "\\(9261 \\div 8000 = 1.157625 = 1.05^3\\)." },
      ],
      pyqExampleId: "266c963b-cd1f-46bf-9a6f-df149a870595",
      traps: [
        {
          title: "Do not divide the total growth by the years",
          body: "44% growth in two years is 20% a year, not 22%. The yearly rate is a root, not an average.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-population-parts",
      name: "The make-up of a population",
      intuition:
        "Men, women and children are shares of one total. Any one share given as a number fixes the total, and every other share follows from it.",
      definition:
        "- Shares add to 100%: if men are 37.5% and women 40%, children are 22.5%.\n" +
        "- A difference of two shares is a share too: men 55% and women 45% differ by 10% of the total.\n" +
        "- When parts change by different percentages (urban up 10%, rural down 10%), weight each change by its share: \\(0.7 \\times 1.1 + 0.3 \\times 0.9 = 1.04\\).\n" +
        "- A sex ratio of 900 per 1,000 males means females are 90% of males.",
      formula: {
        label: "A share of the whole",
        latex: "\\text{total} = \\dfrac{\\text{size of a part} \\times 100}{\\text{its percentage}}",
      },
      authoredExample: {
        prompt: "A town has only men and women. Men are 55% of it and outnumber women by 4,500. Find the population.",
        steps: ["Women are 45%, so the gap is 10% of the population.", "\\(4500 \\div 0.1 = 45000\\)."],
        answer: "45,000.",
      },
      selfCheckExample: {
        prompt: "In a town of 72,000, 40% are men and 35% are women. How many are children?",
        steps: ["Children are \\(100 - 40 - 35 = 25\\%\\).", "\\(0.25 \\times 72000 = 18000\\)."],
        answer: "18,000.",
      },
      practiceSet: [
        { prompt: "A district is 70% urban and 30% rural. The urban part grows by 10% and the rural part falls by 10%. Find the overall change.", answer: "4% rise" },
        { prompt: "There are 900 females per 1,000 males, and 4,00,000 males. How many females are there?", answer: "3,60,000" },
        { prompt: "Children are 20% of a town and number 30,000. Find the population.", answer: "1,50,000" },
      ],
      pyqExampleId: "42e677bb-bbda-4def-b630-1e0fc80efe56",
      traps: [
        {
          title: "Weight each part's change",
          body: "Urban up 10% and rural down 10% is not 'no change' when the parts are 70% and 30%. The larger part pulls the total its way, here to a 4% rise.",
        },
      ],
    },
  ],
};
