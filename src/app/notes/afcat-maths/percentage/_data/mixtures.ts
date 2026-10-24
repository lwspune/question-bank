import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PC_MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Mixtures and Solutions",
  title: "Mixtures and Solutions in Percentages",
  oneLineDefinition:
    "A solution's strength is the percentage of one component: add water or the pure component, change a ratio, mix two strengths, or draw some off and replace it.",
  whyItMatters:
    "These questions all turn on one idea: find the component that does not change, and let the percentage follow the total. Nearly a quarter of the page is HARD, mostly replacements and 'how much must be added', where the slip is to apply the new percentage to the old total.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpc-concentration",
      name: "Strength of a solution when water is added or removed",
      intuition:
        "60 L of a 15% salt solution holds 9 L of salt. Adding water does not change the salt; it only makes the total bigger, so the percentage falls.",
      definition:
        "- Amount of a component \\(=\\) its percentage \\(\\times\\) the total.\n" +
        "- Adding water or letting water evaporate leaves the other component **unchanged**. New percentage \\(= \\dfrac{\\text{unchanged amount}}{\\text{new total}} \\times 100\\).\n" +
        "- 'How much must evaporate to reach a target': the unchanged amount must be the target percentage of the new total.\n" +
        "- A ratio converts to a percentage: copper and zinc in the ratio \\(3 : 5\\) is \\(\\tfrac 38 = 37.5\\%\\) copper.",
      formula: {
        label: "New strength",
        latex: "\\text{new } \\% = \\dfrac{\\text{unchanged amount}}{\\text{new total}} \\times 100",
      },
      authoredExample: {
        prompt: "15 L of water is added to 60 L of a 15% salt solution. What percentage of the new solution is salt?",
        steps: ["Salt: \\(0.15 \\times 60 = 9\\) L, unchanged.", "New total 75 L: \\(\\tfrac{9}{75} = 12\\%\\)."],
        answer: "12%.",
      },
      selfCheckExample: {
        prompt: "How much water must evaporate from 48 L of a 12% sugar solution to make it 18% sugar?",
        steps: ["Sugar: \\(0.12 \\times 48 = 5.76\\) L.", "It must be 18% of the new total: \\(5.76 \\div 0.18 = 32\\) L.", "\\(48 - 32 = 16\\)."],
        answer: "16 L.",
      },
      practiceSet: [
        { prompt: "5 L of water is added to 45 L of a 60% acid solution. Find the new acid percentage.", answer: "54%" },
        { prompt: "1 L of water evaporates from 6 L of a 5% sugar solution. Find the new sugar percentage.", answer: "6%" },
        { prompt: "An alloy has copper and zinc in the ratio \\(3 : 5\\). What percentage is copper?", answer: "37.5%" },
      ],
      pyqExampleId: "0529230d-2312-443d-8d54-7974f9c52d22",
      traps: [
        {
          title: "Keep the right thing fixed",
          body: "Adding water fixes the salt, not the water. Working with the water's percentage gives the right answer only if you remember the water itself changed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-add-pure",
      name: "How much of the pure component to add",
      intuition:
        "Adding pure alcohol to a mixture changes the alcohol and the total, but not the water. So the water is the fixed amount: it must be the right percentage of the new total.",
      definition:
        "- Adding pure A: the **other** component is fixed. New total \\(= \\dfrac{\\text{other}}{100 - \\text{target}\\%} \\times 100\\); subtract the old total.\n" +
        "- Or solve directly: \\(\\dfrac{a + x}{T + x} = \\dfrac{\\text{target}}{100}\\).\n" +
        "- An impurity works the same way: adding pure glycerine leaves the impurity fixed, and it must become the target share.",
      formula: {
        label: "Pure component to add",
        latex: "\\dfrac{a + x}{T + x} = \\dfrac{\\text{target}}{100}",
      },
      authoredExample: {
        prompt: "A 75 L solution is 12% alcohol. How much pure alcohol must be added to make it 34% alcohol?",
        steps: [
          "Water: \\(0.88 \\times 75 = 66\\) L, which stays fixed.",
          "It must be \\(100 - 34 = 66\\%\\) of the new total, so the new total is 100 L.",
          "Add \\(100 - 75 = 25\\) L. Check: \\(\\tfrac{9 + 25}{100} = 34\\%\\).",
        ],
        answer: "25 L.",
      },
      selfCheckExample: {
        prompt: "A 30 kg mix is 10% sand. How much sand must be added to make it 25% sand?",
        steps: ["The other material, 27 kg, is fixed and must be 75% of the new total: \\(27 \\div 0.75 = 36\\) kg.", "\\(36 - 30 = 6\\)."],
        answer: "6 kg.",
      },
      practiceSet: [
        { prompt: "100 L of a solution is 30% acid. How much acid must be added to make it 44% acid?", answer: "25 L" },
        { prompt: "A 57 kg mix is 5% sand. How much sand must be added to make it 43% sand?", answer: "38 kg" },
      ],
      pyqExampleId: "37cfbe68-3e2d-482a-a944-5f517dc3f81c",
      traps: [
        {
          title: "The total grows too",
          body: "To lift 75 L from 12% to 34% alcohol, adding 22% of 75 L is not enough: what you add also enlarges the total. Fix the water and solve.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-ratio-mixtures",
      name: "Changing a ratio by adding one component",
      intuition:
        "72 L of milk and water in the ratio \\(5 : 4\\) is 40 L of milk and 32 L of water. To make the ratio \\(5 : 6\\), only the water changes; the milk's 40 L stays and fixes what one part is.",
      definition:
        "- Split the mixture into its components first.\n" +
        "- The component you do **not** add is fixed. Use the new ratio to find what the other must become, then subtract what is there.\n" +
        "- Equal amounts means simply adding until the two match.",
      formula: {
        label: "Amount to add",
        latex: "\\text{added} = \\text{fixed} \\times \\dfrac{\\text{new term of the other}}{\\text{new term of the fixed}} - \\text{other now}",
      },
      authoredExample: {
        prompt: "72 L of a mixture has milk and water in the ratio \\(5 : 4\\). How much water must be added to make the ratio \\(5 : 6\\)?",
        steps: ["Milk 40 L, water 32 L.", "With milk fixed at 40 L, \\(5 : 6\\) needs 48 L of water.", "Add \\(48 - 32 = 16\\)."],
        answer: "16 L.",
      },
      selfCheckExample: {
        prompt: "50 L of a mixture has alcohol and water in the ratio \\(4 : 1\\). How much alcohol must be added to make it \\(5 : 1\\)?",
        steps: ["Alcohol 40 L, water 10 L.", "With water fixed at 10 L, \\(5 : 1\\) needs 50 L of alcohol.", "Add \\(50 - 40 = 10\\)."],
        answer: "10 L.",
      },
      practiceSet: [
        { prompt: "35 L of milk and water are in the ratio \\(4 : 1\\). How much water makes it \\(2 : 1\\)?", answer: "7 L" },
        { prompt: "54 L of oil and water are in the ratio \\(7 : 2\\). How much water makes it \\(7 : 3\\)?", answer: "6 L" },
      ],
      pyqExampleId: "9f7dca87-cd22-4b2b-93f1-a2973a906eb7",
      traps: [
        {
          title: "Find the parts before adding",
          body: "In 72 L at \\(5 : 4\\), one part is 8 L. Adding the change in ratio terms directly (2 parts) only works if you scale by that 8 L, which gives the 16 L.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-mixing-two",
      name: "Mixing two strengths, and alligation",
      intuition:
        "Mix 6 L of 50% acid with 4 L of 75% acid and the acid adds up: 3 L plus 3 L in 10 L, so 60%. Going the other way, to hit a target strength, the two quantities are in the ratio of their distances from the target.",
      definition:
        "- **Mixing:** strength of the mixture \\(= \\dfrac{q_1 s_1 + q_2 s_2}{q_1 + q_2}\\), a weighted average.\n" +
        "- **Alligation:** to get strength \\(m\\) from \\(s_1 < m < s_2\\), mix them in the ratio \\(q_1 : q_2 = (s_2 - m) : (m - s_1)\\).\n" +
        "- Water counts as 0% (or a price of ₹0): to sell milk worth ₹32 a litre at ₹28, water : milk \\(= (32 - 28) : (28 - 0) = 1 : 7\\).\n" +
        "- Two alloys mixed in equal weights give the plain average of their strengths.",
      formula: {
        label: "Alligation",
        latex: "\\dfrac{q_1}{q_2} = \\dfrac{s_2 - m}{m - s_1}",
      },
      authoredExample: {
        prompt: "6 L of a 50% acid solution is mixed with 4 L of a 75% acid solution. Find the strength of the mixture.",
        steps: ["Acid: \\(0.5 \\times 6 + 0.75 \\times 4 = 3 + 3 = 6\\) L.", "Total 10 L, so 60%."],
        answer: "60%.",
      },
      selfCheckExample: {
        prompt: "How much 60% acid must be added to 12 L of 15% acid to make a 33% solution?",
        steps: ["Alligation: 15% : 60% \\(= (60 - 33) : (33 - 15) = 27 : 18 = 3 : 2\\).", "12 L is the 3 parts, so 2 parts is 8 L.", "Check: \\(1.8 + 4.8 = 6.6\\) L of acid in 20 L is 33%."],
        answer: "8 L.",
      },
      practiceSet: [
        { prompt: "In what ratio should water be mixed with milk costing ₹36 a litre so the mixture is worth ₹27 a litre?", answer: "\\(1 : 3\\) (water : milk)" },
        { prompt: "In what ratio should 20% and 50% acid be mixed to get 32% acid?", answer: "\\(3 : 2\\)" },
        { prompt: "Two alloys have gold and silver in the ratios \\(7 : 3\\) and \\(3 : 7\\). Equal weights are melted together. What percentage is gold?", answer: "50%" },
      ],
      pyqExampleId: "346c9b46-96c9-4282-a03b-62257cfcaa2f",
      traps: [
        {
          title: "The ratio is crossed",
          body: "To get 32% from 20% and 50%, the 20% solution takes the larger share, \\(50 - 32 = 18\\) parts, because the target is nearer to it. Pairing each strength with its own distance reverses the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpc-replacement",
      name: "Drawing off and replacing",
      intuition:
        "Draw 10 L from a 40 L can of milk and the can keeps \\(\\tfrac{30}{40} = 0.75\\) of its milk. Top it up with water and repeat: the milk is multiplied by 0.75 again.",
      definition:
        "- Removing a share of a well-mixed solution removes that share of **each** component.\n" +
        "- Drawn off and replaced with water \\(n\\) times: the original liquid left \\(=\\) volume \\(\\times \\left(1 - \\tfrac{\\text{drawn}}{\\text{volume}}\\right)^n\\).\n" +
        "- Replaced with the pure component instead: subtract that component's share in what was drawn, then add back the full amount poured in.\n" +
        "- Given the strength before and after one replacement with water, the fraction kept is new strength \\(\\div\\) old strength.",
      formula: {
        label: "Repeated replacement with water",
        latex: "\\text{left} = V\\left(1 - \\dfrac{x}{V}\\right)^n",
      },
      authoredExample: {
        prompt: "A can holds 40 L of milk. 10 L is drawn off and replaced with water, and this is done twice. How much milk is left?",
        steps: ["Each round keeps \\(1 - \\tfrac{10}{40} = 0.75\\) of the milk.", "\\(40 \\times 0.75^2 = 22.5\\)."],
        answer: "22.5 L.",
      },
      selfCheckExample: {
        prompt: "A 50 L solution is 60% acid. 10 L is drawn off and replaced with water. Find the new acid percentage.",
        steps: ["Acid at first: 30 L. The 10 L drawn held 6 L of acid.", "\\(30 - 6 = 24\\) L of acid in 50 L."],
        answer: "48%.",
      },
      practiceSet: [
        { prompt: "A quarter of a cask of wine is replaced with water, and this is done twice. What fraction of the cask is now wine?", answer: "\\(\\tfrac{9}{16}\\)" },
        { prompt: "30 L of a 50% acid solution has 6 L drawn off and replaced with pure acid. Find the new acid percentage.", answer: "60%" },
      ],
      pyqExampleId: "2bc717a4-f87f-404e-ae9e-d5159c9d72d5",
      traps: [
        {
          title: "The second draw takes less milk",
          body: "After the first round the can is only 75% milk, so the second 10 L takes out 7.5 L of milk, not 10. That is why the factor is squared rather than doubled.",
        },
      ],
    },
  ],
};
