import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_DI_TWOSTEP_NOTE: SubtopicNote = {
  subtopicName: "Two-Step Share Problems",
  title: "Two-Step Share Problems",
  oneLineDefinition:
    "A two-step question first finds a group as a share of a total, then splits that group again by a ratio or a second percentage, or runs the same chain backwards from a known part.",
  whyItMatters:
    "Seventeen questions in the bank, and twelve of them are MODERATE: this is where the chapter's harder marks sit. Each step is one you have met on the earlier pages; the work is keeping the chain in order and multiplying the fractions together before touching the big total.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscdits-inside",
      name: "A ratio or a percentage inside a share",
      intuition:
        "The table gives a share of a population (below the poverty line, opted for Biology, in department D) and then splits that share again (men to women, boys to girls, 30% female). Find the group, then split it. Better still, multiply the two fractions first and apply them to the total once.",
      definition:
        "- **Step 1:** group \\(=\\) share \\(\\times\\) total (or number of zones \\(\\times\\) average per zone).\n" +
        "- **Step 2, a ratio \\(a : b\\):** the \\(b\\) part \\(= \\frac{b}{a + b} \\times\\) group. **Step 2, a percentage \\(q\\%\\):** \\(\\frac{q}{100} \\times\\) group.\n" +
        "- **Fast route:** multiply the fractions first. 30% then \\(\\frac{2}{3}\\) is \\(\\frac{3}{10} \\times \\frac{2}{3} = \\frac{1}{5}\\) of the total. 60% of a 25% share is 15% of the whole.\n" +
        "- **Two groups together:** split each group on its own, add the parts, and only then form the ratio. Ratios from different groups are never added.\n" +
        "- The remaining part comes from the other side of the ratio, or from 100% minus the given percentage.",
      formula: {
        label: "A part inside a share",
        latex: "\\text{Part} = \\text{Total} \\times \\frac{p}{100} \\times \\frac{b}{a + b}",
        symbols: [
          { symbol: "p", meaning: "the group's percentage of the total" },
          { symbol: "a : b", meaning: "the ratio that splits the group; b is the wanted side" },
        ],
      },
      authoredExample: {
        prompt: "A town of 12,000 people has 35% graduates, and the graduates are men and women in the ratio \\(4 : 3\\). How many women graduates are there?",
        steps: [
          "Graduates \\(= 35\\%\\) of 12,000 \\(= 4200\\).",
          "Women \\(= \\frac{3}{7} \\times 4200 = 1800\\).",
          "Fast route: \\(12000 \\times \\frac{35}{100} \\times \\frac{3}{7} = 12000 \\times \\frac{3}{20} = 1800\\).",
        ],
        answer: "1,800",
      },
      selfCheckExample: {
        prompt:
          "The table shows two schools.\n\n| School | Students | Share taking Music | Boys : Girls in Music |\n|---|---|---|---|\n| P | 600 | 40% | 5 : 7 |\n| Q | 750 | 20% | 2 : 3 |\n\nWhat is the ratio of boys to girls taking Music in the two schools together?",
        steps: [
          "P: Music \\(= 240\\), boys \\(= \\frac{5}{12} \\times 240 = 100\\), girls \\(= 140\\).",
          "Q: Music \\(= 150\\), boys \\(= \\frac{2}{5} \\times 150 = 60\\), girls \\(= 90\\).",
          "Together: \\(160 : 230 = 16 : 23\\).",
        ],
        answer: "\\(16 : 23\\)",
      },
      practiceSet: [
        { prompt: "40% of a company's 5,000 workers are in one unit, and 30% of that unit are women. How many women work in the unit?", answer: "600" },
        { prompt: "A group of 840 people has men and women in the ratio \\(4 : 3\\). How many men are there?", answer: "480" },
        { prompt: "A 20% share of 9,000 is split in the ratio \\(2 : 3\\). What is the larger part?", answer: "1,080" },
        { prompt: "60% of a group that is itself 25% of a population is what percentage of the population?", answer: "15%" },
      ],
      pyqExampleId: "b5a6d262-1fd5-4334-b562-c1e45df2fd91",
      traps: [
        {
          title: "Adding ratios from different groups",
          body:
            "\\(5 : 7\\) in one school and \\(2 : 3\\) in another do not combine to \\(7 : 10\\). Work out the boys and girls in each school, add the counts, then form the ratio.",
        },
        {
          title: "Applying the second percentage to the whole total",
          body:
            "\"30% of the employees in department D are women\" means 30% of department D, not 30% of the company. Find the department first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscdits-back",
      name: "Working back to a missing total",
      intuition:
        "Here the chain is the same, but the question hands you the end of it (the number of women who qualified, the literate men, the marked price) and asks for the start. Undo each step in reverse order: a ratio part back to the group, the group back to the total.",
      definition:
        "- **From a ratio part to the group:** if the women are 5 parts of 8 and number 150, one part is 30 and the group is \\(8 \\times 30 = 240\\).\n" +
        "- **From a percentage back to the total:** total \\(=\\) group \\(\\div \\frac{p}{100}\\).\n" +
        "- **Both at once:** total \\(=\\) known part \\(\\div\\) (product of the fractions).\n" +
        "- **A missing entry in a table:** subtract the known entries from the printed total first. \"B is 20% less than M\" means \\(B = 0.8M\\), so \\(B + M = 1.8M\\).\n" +
        "- **A price above cost:** if the marked price is \\(r\\%\\) above cost, cost \\(=\\) marked price \\(\\div (1 + \\frac{r}{100})\\).",
      formula: {
        label: "Back to the total",
        latex: "\\text{Total} = \\frac{\\text{known part}}{\\frac{p}{100} \\times \\frac{b}{a + b}}",
      },
      authoredExample: {
        prompt: "Of the candidates who appeared in a test, 45% qualified. Among those who qualified, men and women were in the ratio \\(4 : 5\\). If 270 women qualified, how many candidates appeared?",
        steps: [
          "Women are 5 of 9 parts: one part \\(= 270 \\div 5 = 54\\), so qualified \\(= 9 \\times 54 = 486\\).",
          "Appeared \\(= 486 \\div 0.45 = 1080\\).",
          "Check: 45% of 1,080 is 486, and \\(\\frac{5}{9}\\) of 486 is 270.",
        ],
        answer: "1,080",
      },
      selfCheckExample: {
        prompt: "Three colleges X, Y and Z have 2,500 students in all, and X has 700. College Y has 25% more students than college Z. How many students does Y have?",
        steps: [
          "Y and Z together \\(= 2500 - 700 = 1800\\).",
          "Y \\(= 1.25Z\\), so \\(2.25Z = 1800\\) and \\(Z = 800\\).",
          "Y \\(= 1.25 \\times 800 = 1000\\).",
        ],
        answer: "1,000",
      },
      practiceSet: [
        { prompt: "30% of a town's population is 4,500. What is the population?", answer: "15,000" },
        { prompt: "Women make up \\(\\frac{3}{8}\\) of a group and number 240. How many people are in the group?", answer: "640" },
        {
          prompt: "Literate people are 60% of a population, and literate men are \\(\\frac{4}{9}\\) of the literate people. What fraction of the whole population are literate men?",
          answer: "\\(\\frac{4}{15}\\)",
          method: "\\(\\frac{3}{5} \\times \\frac{4}{9} = \\frac{4}{15}\\).",
        },
        { prompt: "A book's marked price of ₹360 is 20% above its cost price. What is the cost price?", answer: "₹300" },
      ],
      pyqExampleId: "728f64e5-5428-4574-96f8-9d21b217730f",
      traps: [
        {
          title: "Undoing only one step of the chain",
          body:
            "If 270 women are \\(\\frac{5}{9}\\) of those who qualified, 486 is the number who qualified, not who appeared. Divide by the qualifying rate as well.",
        },
        {
          title: "Reading 20% less as 20% of",
          body:
            "\"B is 20% less than M\" makes B equal to 80% of M. Writing B as 20% of M, or M as 120% of B, gives a wrong pair.",
        },
      ],
    },
  ],
};
