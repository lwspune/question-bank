import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_XMI_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Basic Concepts, Demand and Elasticity",
  title: "Basic Concepts, Demand and Elasticity",
  oneLineDefinition:
    "Scarcity and opportunity cost, the production possibility frontier, kinds of goods and economies, public goods and free riders, indifference curves, and price elasticity of demand.",
  whyItMatters:
    "Ten questions in the bank: two from the 2023 shifts, one from the 2024 shifts and seven from the 2025 shifts, and nine of them EASY. Each one asks a single definition, so the definitions table is all there is to learn.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscxmimi-basics",
      name: "Scarcity, choice and kinds of goods",
      intuition:
        "Economics starts from scarcity: wants are many and resources few, so every choice gives something up. The rest of this page names the tools and the kinds of goods that follow from that.",
      definition:
        "Choice:\n" +
        "- **Lionel Robbins** gave the **scarcity** definition of economics (1932).\n" +
        "- **Opportunity cost**: what the **best option passed up** was worth. It is not money spent.\n" +
        "- The **production possibility frontier** shows the most an economy can make of two goods; its slope shows the trade-off and opportunity cost. It says nothing about the government's budget.\n\n" +
        "Goods and economies:\n" +
        "- **Capital goods**: machines, tools and buildings, used to make other goods over many years.\n" +
        "- **Marketable surplus**: output left after the farmer's own needs. A growing one shows **commercialisation** of farming.\n" +
        "- A **public good** is non-excludable, so a person can use it without paying: that person is a **free rider**.\n" +
        "- A **mixed economy** has the private and public sectors side by side; India chose it after independence.\n" +
        "- In every economy the government frames **laws** and delivers **justice**.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Scarcity definition", "Lionel Robbins"], pyqExampleId: "db3d7594-01cb-4c6f-bcb2-49f8fab4e795" },
          { cells: ["Capital goods", "Machines, tools, buildings"], pyqExampleId: "38bc3dd7-d98b-4ab4-8855-da5d8a77e05f" },
          { cells: ["Mixed economy", "Private and public sectors together"], pyqExampleId: "43f3db80-0999-4514-91ae-2535daaedde6" },
          { cells: ["Free rider", "Uses a public good without paying"], pyqExampleId: "5fc5bc51-326e-4b1c-b594-a1f62a433f0a" },
          { cells: ["Marketable surplus", "Sign of commercial farming"], pyqExampleId: "56acb02c-0638-404d-a42f-fccffe205727" },
        ],
      },
      pyqExampleId: "33026931-5884-4302-b3e2-d791f16e3fbc",
      selfCheckExample: {
        prompt: "A student skips a Rs 500 paid tutoring shift to study for an exam. The next best use of the time was that shift. What is the opportunity cost of studying?",
        steps: ["The cost of a choice is the best option passed up for it.","Here that is the tutoring shift and its Rs 500."],
        answer: "The Rs 500 shift given up.",
      },
      practiceSet: [
        { prompt: "What does the slope of the PPF show?", answer: "The trade-off, or opportunity cost, between the two goods" },
        { prompt: "Is a tractor a consumer good or a capital good?", answer: "A capital good" },
        { prompt: "What kind of economy did India adopt after independence?", answer: "A mixed economy" },
      ],
      traps: [
        {
          title: "Robbins, not Smith or Marshall",
          body: "The **scarcity** definition is **Robbins'**. Adam Smith gave the wealth definition and Alfred Marshall the welfare definition.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscxmimi-demand",
      name: "Indifference curves and price elasticity",
      intuition:
        "Elasticity asks how strongly buyers react to a price change. Compare the two percentage changes: if quantity moves by more than price, demand is elastic.",
      definition:
        "Consumer choice:\n" +
        "- An **indifference curve** joins all bundles of two goods that give **equal satisfaction**.\n" +
        "- A **budget line** shows the bundles a consumer can afford; an **isoquant** is the producer's equal-output curve.\n\n" +
        "Price elasticity of demand:\n" +
        "- Above 1 the demand is **elastic**, below 1 it is **inelastic**, and at exactly 1 it is **unitary**.\n" +
        "- Use the sizes of the changes; the minus sign is dropped.",
      formula: {
        latex: "e_d = \\frac{\\%\\ \\text{change in quantity demanded}}{\\%\\ \\text{change in price}}",
        label: "Price elasticity of demand",
        symbols: [{ symbol: "e_d", meaning: "Price elasticity of demand" }],
      },
      authoredExample: {
        prompt: "The price of tea rises 8% and the quantity bought falls 4%. Find the elasticity and say what kind of demand this is.",
        steps: ["e = 4 / 8 = 0.5.", "0.5 is less than 1, so demand is inelastic."],
        answer: "0.5; inelastic.",
      },
      pyqExampleId: "146c6bae-0879-4c3b-b3e3-68cf1399d5a3",
      selfCheckExample: {
        prompt: "Price falls 5% and quantity demanded rises 5%. What kind of demand is this?",
        steps: ["e = 5 / 5 = 1.", "An elasticity of exactly 1 is unitary."],
        answer: "Unitary elastic.",
      },
      practiceSet: [
        { prompt: "Which curve joins bundles giving equal satisfaction?", answer: "The indifference curve" },
        { prompt: "If the elasticity is 3, is demand elastic or inelastic?", answer: "Elastic" },
        { prompt: "What does a budget line show?", answer: "The bundles a consumer can afford" },
      ],
      traps: [
        {
          title: "An isoquant is for producers",
          body: "An **isoquant** joins input mixes giving equal **output**. Equal **satisfaction** for a consumer is the **indifference curve**.",
        },
      ],
    },
  ],
};
