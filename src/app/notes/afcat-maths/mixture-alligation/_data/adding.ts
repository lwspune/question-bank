import type { SubtopicNote } from "@/app/notes/_types";

export const AF_MA_ADDING_NOTE: SubtopicNote = {
  subtopicName: "Adding to a Mixture",
  title: "Adding One Liquid to a Mixture",
  oneLineDefinition:
    "Split a mixture into its liquids, add one of them, and find the new ratio, the amount to add for a target ratio, or the amount there was to begin with.",
  whyItMatters:
    "Nearly half the chapter's questions are here, including AFCAT past-year questions from 2015 and 2018. Each one adds a single liquid, so the other liquid never changes. Marks are lost when the working lets it change too, or when the answer given is the new total instead of the litres added.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afma-new-ratio",
      name: "Splitting a mixture, then adding to it",
      intuition:
        "A mixture of milk and water in a ratio is a total cut into equal parts. Find the litres of each liquid first; only then add the new litres to the liquid they belong to.",
      definition:
        "- Milk : water \\(= m : w\\) in a total \\(T\\): the milk is \\(\\dfrac{m}{m + w}T\\) and the water is \\(\\dfrac{w}{m + w}T\\).\n" +
        "- Given one liquid's amount instead of the total, that amount divided by its term is one part.\n" +
        "- Add the new litres to their own liquid, then write the new ratio in its simplest form.",
      formula: {
        label: "Milk in a mixture",
        latex: "\\text{milk} = \\dfrac{m}{m + w} \\times T",
      },
      authoredExample: {
        prompt: "A 48-litre mixture has milk and water in the ratio \\(5 : 3\\). 6 litres of water are added. Find the new ratio of milk to water.",
        steps: [
          "8 parts of 6 litres: milk 30 litres, water 18 litres.",
          "The water becomes \\(18 + 6 = 24\\) litres; the milk stays 30.",
          "\\(30 : 24 = 5 : 4\\).",
        ],
        answer: "\\(5 : 4\\).",
      },
      selfCheckExample: {
        prompt: "A 60-litre mixture has milk and water in the ratio \\(3 : 1\\). 9 litres of milk are added. Find the new ratio of milk to water.",
        steps: ["Milk 45 litres, water 15 litres.", "Milk becomes 54: \\(54 : 15 = 18 : 5\\)."],
        answer: "\\(18 : 5\\).",
      },
      practiceSet: [
        { prompt: "A 56-litre mixture has milk and water in the ratio \\(5 : 2\\). 8 litres of water are added. Find the new ratio.", answer: "\\(5 : 3\\)", method: "Milk 40, water 16 + 8 = 24." },
        { prompt: "A solution has acid and water in the ratio \\(2 : 7\\) and holds 1.2 kg of acid. How much water does it hold?", answer: "4.2 kg" },
        { prompt: "50 litres of pure juice are mixed with 10 litres of water, and then 10 more litres of water are added. Find the ratio of juice to water.", answer: "\\(5 : 2\\)" },
      ],
      pyqExampleId: "5fa37462-837f-4385-b68b-2ee62c61662d",
      traps: [
        {
          title: "Add litres to litres, not to ratio terms",
          body: "A 40-litre mixture with milk and water \\(3 : 1\\) has 30 litres of milk and 10 of water. With 10 more litres of water it is \\(30 : 20 = 3 : 2\\). Adding the 10 to the ratio term gives \\(3 : 11\\), which is meaningless.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-add-water",
      name: "Adding water to reach a ratio: the milk is fixed",
      intuition:
        "Pouring in water does not change the milk. So the milk decides how much water the new ratio needs; the litres to add are what is missing.",
      definition:
        "- Find the milk \\(M\\) and the water \\(W\\) now.\n" +
        "- For the new ratio \\(r : s\\), the water must become \\(\\dfrac{s}{r} \\times M\\).\n" +
        "- The water to add is that amount minus \\(W\\).\n" +
        "- The same works for any pair: alcohol and water, juice and water, two oils. Hold fixed whichever liquid is not poured in.",
      formula: {
        label: "Water to add",
        latex: "\\text{add} = \\dfrac{s}{r} \\times M - W",
      },
      authoredExample: {
        prompt: "A 90-litre mixture has milk and water in the ratio \\(4 : 1\\). How much water must be added to make the ratio \\(3 : 1\\)?",
        steps: [
          "Milk 72 litres, water 18 litres. The milk stays 72.",
          "For \\(3 : 1\\) the water must be \\(72 \\div 3 = 24\\) litres.",
          "Add \\(24 - 18 = 6\\) litres.",
        ],
        answer: "6 litres.",
      },
      selfCheckExample: {
        prompt: "A 60-litre mixture has milk and water in the ratio \\(5 : 1\\). How much water must be added to make the ratio \\(5 : 3\\)?",
        steps: ["Milk 50, water 10.", "For \\(5 : 3\\) the water must be 30 litres, so add 20."],
        answer: "20 litres.",
      },
      practiceSet: [
        { prompt: "A 72-litre mixture has milk and water in the ratio \\(5 : 1\\). How much water must be added to make it \\(3 : 1\\)?", answer: "8 litres" },
        { prompt: "A 50-litre mixture has milk and water in the ratio \\(4 : 1\\). How much water must be added to make it \\(2 : 1\\)?", answer: "10 litres" },
        { prompt: "A 110-litre mixture has alcohol and water in the ratio \\(7 : 4\\). How much water must be added to make the two equal?", answer: "30 litres" },
      ],
      pyqExampleId: "4b070bf5-a7ff-4b88-a1b7-dbbaa0ab15a6",
      traps: [
        {
          title: "Do not split the old total in the new ratio",
          body: "To turn 40 litres of a \\(3 : 1\\) milk and water mixture into \\(1 : 1\\), halving 40 gives 20 litres of water and an answer of 10. But that quietly cuts the milk to 20. The milk stays 30, so the water must reach 30: add 20 litres.",
        },
        {
          title: "Answer with the litres added",
          body: "The question asks how much water to add, not how much water there will be. Subtract the water already in the mixture before you choose an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-add-main",
      name: "Adding milk to reach a ratio: the water is fixed",
      intuition:
        "Now the liquid poured in is the milk (or acid, syrup, the first oil). The water is what stays, so the water decides how much milk the new ratio needs.",
      definition:
        "- Find the milk \\(M\\) and the water \\(W\\) now; the water stays \\(W\\).\n" +
        "- For the new ratio \\(r : s\\), the milk must become \\(\\dfrac{r}{s} \\times W\\).\n" +
        "- The milk to add is that amount minus \\(M\\).\n" +
        "- 'Reverse the ratio' means swap the terms: \\(2 : 5\\) reversed is \\(5 : 2\\).",
      formula: {
        label: "Milk to add",
        latex: "\\text{add} = \\dfrac{r}{s} \\times W - M",
      },
      authoredExample: {
        prompt: "A 60-litre mixture has acid and water in the ratio \\(2 : 3\\). How much acid must be added to make the ratio \\(1 : 1\\)?",
        steps: [
          "Acid 24 litres, water 36 litres. The water stays 36.",
          "For \\(1 : 1\\) the acid must be 36 litres.",
          "Add \\(36 - 24 = 12\\) litres.",
        ],
        answer: "12 litres.",
      },
      selfCheckExample: {
        prompt: "A 30-litre mixture has milk and water in the ratio \\(1 : 2\\). How much milk must be added to reverse the ratio?",
        steps: [
          "Milk 10, water 20. Reversed, the ratio is \\(2 : 1\\).",
          "The milk must be \\(2 \\times 20 = 40\\) litres, so add 30.",
        ],
        answer: "30 litres.",
      },
      practiceSet: [
        { prompt: "A 45-litre mixture has milk and water in the ratio \\(2 : 1\\). How much milk must be added to make it \\(3 : 1\\)?", answer: "15 litres" },
        { prompt: "A 70-litre mixture has syrup and water in the ratio \\(2 : 5\\). How much syrup must be added to make the two equal?", answer: "30 litres" },
        { prompt: "A 33-litre mixture has liquids A and B in the ratio \\(6 : 5\\). How much of A must be added to make the ratio \\(2 : 1\\)?", answer: "12 litres", method: "B stays 15, so A must reach 30." },
      ],
      pyqExampleId: "579d3781-ab3b-4621-bf24-df0bb9dd37f0",
      traps: [
        {
          title: "Adding milk, scale from the water",
          body: "When milk is poured in, the milk is the liquid that changes. Working from the old milk (as if it were fixed) answers a different question. Start from the water.",
        },
        {
          title: "A reversed ratio is a fraction of the water, not of the new total",
          body: "To reverse \\(3 : 5\\) by adding milk, the milk must become \\(\\tfrac 53\\) of the water. It is not \\(\\tfrac 58\\) of anything, because the new total is not yet known.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-same-term",
      name: "Unknown amounts: when the unchanged liquid keeps its term",
      intuition:
        "Milk and water \\(4 : 3\\) become \\(4 : 5\\) after 10 litres of water are added. The milk's term is 4 both times, so the parts are the same size, and the water grew by 2 parts. Those 2 parts are the 10 litres.",
      definition:
        "- Write the amounts as \\(4k\\) and \\(3k\\): \\(k\\) is the size of one part.\n" +
        "- If the liquid that was not added has the same term in both ratios, the other term grew by a number of parts. Litres added divided by those extra parts is \\(k\\).\n" +
        "- The equation route gives the same \\(k\\): \\(\\dfrac{4k}{3k + 10} = \\dfrac 45\\).\n" +
        "- Then answer what is asked: the milk, the water, or the whole mixture, before or after.",
      formula: {
        label: "One part",
        latex: "k = \\dfrac{\\text{litres added}}{\\text{extra parts}}",
      },
      authoredExample: {
        prompt: "A mixture has milk and water in the ratio \\(4 : 3\\). After 10 litres of water are added the ratio is \\(4 : 5\\). How much milk is there?",
        steps: [
          "The milk's term is 4 in both ratios, so the parts are the same size.",
          "The water went from 3 parts to 5: 2 parts are 10 litres, so \\(k = 5\\).",
          "Milk is \\(4 \\times 5 = 20\\) litres. Check: \\(20 : 25 = 4 : 5\\).",
        ],
        answer: "20 litres.",
      },
      selfCheckExample: {
        prompt: "Alcohol and water are in the ratio \\(6 : 5\\). After 9 litres of alcohol are added the ratio is \\(9 : 5\\). How much was the mixture at first?",
        steps: [
          "The water's term is 5 both times. The alcohol grew by 3 parts, which are 9 litres, so \\(k = 3\\).",
          "The mixture was \\(11 \\times 3\\) litres.",
        ],
        answer: "33 litres.",
      },
      practiceSet: [
        { prompt: "Milk and water are in the ratio \\(3 : 2\\). After 6 litres of water are added the ratio is \\(3 : 4\\). How much milk is there?", answer: "9 litres" },
        { prompt: "Acid and water are in the ratio \\(7 : 4\\). After 8 litres of acid are added the ratio is \\(9 : 4\\). How much was the mixture at first?", answer: "44 litres" },
        { prompt: "Juice and water are in the ratio \\(8 : 3\\). After 12 litres of water are added the ratio is \\(8 : 7\\). How much juice is there?", answer: "24 litres" },
      ],
      pyqExampleId: "ec7eb51d-9631-4ea0-9a86-68427dca608d",
      traps: [
        {
          title: "k is not the answer",
          body: "Finding one part is half the work. With \\(k = 6\\) in a \\(2 : 3\\) mixture the milk is 12, the water 18 and the mixture 30 litres; the options usually hold all three. Read which one is asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afma-rescale-term",
      name: "When the unchanged liquid's term differs: rescale first",
      intuition:
        "If milk and water go from \\(2 : 1\\) to \\(4 : 5\\) as water is added, the milk did not change but its term did. Write the old ratio with the same milk term, \\(4 : 2\\), and the parts are the same size again.",
      definition:
        "- Find the liquid that was not added. Multiply each ratio so that liquid has the same term in both (use the LCM of its two terms).\n" +
        "- Now the other term's growth counts the extra parts, and litres added divided by extra parts is one part.\n" +
        "- 'Equal amounts' or \\(1 : 1\\) is a ratio too: write it as \\(5 : 5\\) or \\(3 : 3\\) to match.\n" +
        "- The equation route still works when the rescaling is awkward: \\(\\dfrac{2k}{k + 12} = \\dfrac 45\\).",
      formula: {
        label: "One part after rescaling",
        latex: "k = \\dfrac{\\text{litres added}}{\\text{extra parts after matching the fixed term}}",
      },
      authoredExample: {
        prompt: "Milk and water are in the ratio \\(2 : 1\\). After 12 litres of water are added the ratio is \\(4 : 5\\). How much milk is there?",
        steps: [
          "The milk is fixed. Its terms are 2 and 4, so write \\(2 : 1\\) as \\(4 : 2\\).",
          "The water went from 2 parts to 5: 3 parts are 12 litres, so one part is 4.",
          "Milk is \\(4 \\times 4 = 16\\) litres. Check: \\(16 : 20 = 4 : 5\\).",
        ],
        answer: "16 litres.",
      },
      selfCheckExample: {
        prompt: "Acid and water are in the ratio \\(1 : 3\\). After 6 litres of acid are added the ratio is \\(1 : 2\\). How much was the mixture at first?",
        steps: [
          "The water is fixed, with terms 3 and 2. Using 6: \\(1 : 3 = 2 : 6\\) and \\(1 : 2 = 3 : 6\\).",
          "The acid grew by 1 part, which is 6 litres.",
          "The mixture was 8 parts: \\(8 \\times 6\\) litres.",
        ],
        answer: "48 litres.",
      },
      practiceSet: [
        { prompt: "Milk and water are in the ratio \\(3 : 1\\). After 8 litres of water are added the two are equal. How much milk is there?", answer: "12 litres", method: "\\(1 : 1 = 3 : 3\\)." },
        { prompt: "Alcohol and water are in the ratio \\(4 : 3\\). After 6 litres of alcohol are added the ratio is \\(2 : 1\\). How much was the mixture at first?", answer: "21 litres" },
        { prompt: "Milk and water are in the ratio \\(5 : 4\\). After 18 litres of water are added the ratio is \\(1 : 2\\). How much water was there at first?", answer: "12 litres" },
      ],
      pyqExampleId: "dd45f385-f87e-4968-aa6b-1c077336e007",
      traps: [
        {
          title: "Match the liquid that did not change",
          body: "Milk and water \\(4 : 1\\) become \\(2 : 3\\) after water is added. The milk is fixed, so write \\(2 : 3\\) as \\(4 : 6\\): the water grew by 5 parts. Reading the water's 1 and 3 as 2 extra parts compares parts of different sizes.",
        },
      ],
    },
  ],
};
