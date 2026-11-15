import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RA_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Ratio Basics",
  title: "Ratio Basics",
  oneLineDefinition:
    "A ratio cuts an amount into equal parts: find what one part is worth from whatever the stem gives, and join two ratios only after the person they share has the same number in both.",
  whyItMatters:
    "10 questions in the Tier II bank, every one EASY. They are quick marks, and the 'value of one part' habit they build runs through the rest of the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2raba-parts",
      name: "Shares from a ratio",
      intuition:
        "A ratio of 3 : 4 : 5 says the amount is cut into 12 equal parts. Find what one part is worth from whatever the stem gives you, the total, one share or the gap between two shares, and every share follows.",
      definition:
        "- A ratio \\(a : b : c\\) splits a total T into \\(T \\times \\frac{a}{a + b + c}\\) and so on.\n" +
        "- One part \\(=\\) the given amount \\(\\div\\) its number of parts: a total uses \\(a + b + c\\), one person's share uses that person's parts, a difference uses the difference of the parts.\n" +
        "- Coins in a ratio: multiply each count by the coin's value before adding.\n" +
        "- A ratio is unchanged when every term is multiplied or divided by the same number.",
      formula: {
        label: "One part, and one share",
        latex: "\\text{one part} = \\frac{\\text{given amount}}{\\text{its parts}}, \\quad \\text{share of A} = T \\times \\frac{a}{a + b + c}",
      },
      authoredExample: {
        prompt: "₹7,200 is divided among X, Y and Z in the ratio 2 : 3 : 7. How much more does Z get than X?",
        steps: ["There are 12 parts, so one part is ₹600.", "Z has 5 parts more than X: \\(5 \\times 600 = 3000\\)."],
        answer: "₹3,000",
      },
      selfCheckExample: {
        prompt: "A bag holds ₹1, ₹2 and ₹5 coins in the ratio 6 : 3 : 2, worth ₹440 in all. How many ₹2 coins are there?",
        steps: ["Counts \\(6k, 3k, 2k\\) are worth \\(6k + 6k + 10k = 22k\\) rupees.", "\\(22k = 440\\), so \\(k = 20\\) and there are 60 coins of ₹2."],
        answer: "60",
      },
      practiceSet: [
        { prompt: "Divide ₹2,700 in the ratio 4 : 5.", answer: "₹1,200 and ₹1,500" },
        { prompt: "In shares of 3 : 5 : 7, the third share is ₹420. Find the first.", answer: "₹180" },
        { prompt: "Marks are in the ratio 5 : 6 : 9, and the top mark is 36 more than the lowest. Find the middle mark.", answer: "54", method: "4 parts are 36." },
      ],
      pyqExampleId: "e5fc66c4-3524-48bd-89bd-aeead00742fb",
      traps: [
        {
          title: "Dividing a difference by the total parts",
          body: "In the ratio 3 : 5, if B gets ₹600 more than A, the ₹600 is 2 parts, so one part is ₹300. Dividing ₹600 by 8 parts is the wrong base.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2raba-combine",
      name: "Joining ratios through a common term",
      intuition:
        "Two ratios that share a person, such as a : b and b : c, join into one chain, but only after the shared person has the same number in both.",
      definition:
        "- To join \\(a : b\\) and \\(b : c\\), scale each so that b is the same, using the LCM of its two values.\n" +
        "- From the chain, read any other ratio: \\(c : a\\), or \\((a + b) : (b + c)\\).\n" +
        "- '\\(\\frac{x}{3}\\) of A equals \\(\\frac{y}{5}\\) of B' gives \\(\\frac{A}{B} = \\frac{y/5}{x/3}\\): the smaller fraction goes with the bigger amount.\n" +
        "- A chain of equal costs (8 kg of rice cost as much as 5 kg of pulses, and so on) is worked by carrying the price from one item to the next.",
      formula: {
        label: "Joining two ratios",
        latex: "a : b = p : q,\\; b : c = r : s \\;\\Rightarrow\\; a : b : c = pr : qr : qs",
      },
      authoredExample: {
        prompt: "If A : B = 4 : 5 and B : C = 3 : 4, find A : B : C.",
        steps: ["Make B the same: the LCM of 5 and 3 is 15.", "A : B = 12 : 15 and B : C = 15 : 20, so A : B : C = 12 : 15 : 20."],
        answer: "12 : 15 : 20",
      },
      selfCheckExample: {
        prompt: "Two thirds of P's money equals four fifths of Q's, and together they have ₹3,300. How much does P have?",
        steps: ["\\(\\frac{2}{3}P = \\frac{4}{5}Q\\), so \\(\\frac{P}{Q} = \\frac{4/5}{2/3} = \\frac{6}{5}\\).", "P \\(= 3300 \\times \\frac{6}{11} = 1800\\)."],
        answer: "₹1,800",
      },
      practiceSet: [
        { prompt: "If \\(x : y = 3 : 4\\) and \\(y : z = 6 : 7\\), find \\(x : z\\).", answer: "9 : 14" },
        { prompt: "If \\(a : b : c = 2 : 3 : 5\\), find \\((a + b) : (b + c) : (c + a)\\).", answer: "5 : 8 : 7" },
        { prompt: "4 pens cost as much as 3 notebooks, and one notebook costs ₹40. Find the cost of 10 pens.", answer: "₹300" },
      ],
      pyqExampleId: "83ddc687-174c-4403-91a0-a365ce650879",
      traps: [
        {
          title: "Joining ratios without matching the shared term",
          body: "From A : B = 2 : 3 and B : C = 5 : 7 you cannot write 2 : 3 : 7. Make B equal first: 10 : 15 : 21.",
        },
      ],
    },
  ],
};
