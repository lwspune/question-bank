import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_LE_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Problems and Applications",
  title: "Word Problems and Applications",
  oneLineDefinition:
    "Name the unknowns, turn each sentence into one equation, and solve; heads-and-legs and age questions are the same move with a ready-made shortcut.",
  whyItMatters:
    "10 questions in the Tier II bank, 8 EASY and 2 MODERATE. The work is in writing the equations correctly; once written, each is a two-line solve.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2lewp-words",
      name: "Setting up equations from words",
      intuition:
        "Give each unknown a letter, then turn every sentence that states a fact into one equation. Two unknowns need two facts; after that it is the same solving as any other pair.",
      definition:
        "- Name each unknown clearly: 'let a pen cost p and a pencil q'.\n" +
        "- 'Two of A and one of B cost 31' becomes \\(2A + B = 31\\).\n" +
        "- A fraction with numerator 3 more than its denominator: \\(\\frac{d + 3}{d}\\).\n" +
        "- Parts of a group by fractions: take the total as N and write each part as a fraction of N.",
      formula: {
        label: "Two items, two prices",
        latex: "aA + bB = P_1, \\quad cA + dB = P_2",
      },
      authoredExample: {
        prompt: "3 notebooks and 2 pens cost ₹130, and 2 notebooks and 3 pens cost ₹120. Find the price of one notebook and one pen together.",
        steps: ["Adding the two: \\(5N + 5P = 250\\).", "So \\(N + P = 50\\)."],
        answer: "₹50",
      },
      selfCheckExample: {
        prompt: "The denominator of a fraction is 4 more than its numerator. Adding 2 to both makes it \\(\\frac{2}{3}\\). Find the fraction.",
        steps: ["\\(\\frac{n + 2}{n + 6} = \\frac{2}{3}\\), so \\(3n + 6 = 2n + 12\\) and \\(n = 6\\).", "The fraction is \\(\\frac{6}{10}\\)."],
        answer: "\\(\\frac{6}{10}\\)",
      },
      practiceSet: [
        { prompt: "Two numbers add up to 50 and differ by 14. Find them.", answer: "32 and 18" },
        { prompt: "2 chairs and 1 table cost ₹2,800; 1 chair and 2 tables cost ₹3,800. Find the price of a table.", answer: "₹1,600" },
        { prompt: "Three fifths of a school's 600 students are boys. Half the boys and a third of the girls play cricket. How many play cricket?", answer: "260" },
      ],
      pyqExampleId: "470c7e97-f0e3-4d8a-a7e0-7c5fe15567f3",
      traps: [
        {
          title: "Solving for one item when the question asks for a sum",
          body: "When a question asks for one pen plus one pencil, adding or subtracting the two equations may give the sum directly. Look at what is asked before solving fully.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2lewp-heads",
      name: "Heads and legs",
      intuition:
        "Suppose every head belonged to the two-legged kind. The extra legs counted must then come from the four-legged ones, two extra each, so dividing the extra legs by 2 gives the four-legged count.",
      definition:
        "- With H heads and L legs, four-legged ones \\(= \\frac{L - 2H}{2}\\).\n" +
        "- Two-legged ones \\(= H -\\) four-legged ones.\n" +
        "- The same move works for any two kinds with different counts per head.",
      formula: {
        label: "Heads and legs",
        latex: "\\text{four-legged} = \\frac{L - 2H}{2}",
      },
      authoredExample: {
        prompt: "A farm has cows and ducks: 60 heads and 170 legs in all. How many cows are there?",
        steps: ["If all 60 were ducks: 120 legs.", "The extra 50 legs come 2 per cow, so 25 cows."],
        answer: "25",
      },
      selfCheckExample: {
        prompt: "A parking lot holds cars and motorbikes: 45 vehicles and 130 wheels. How many motorbikes are there?",
        steps: ["Cars \\(= \\frac{130 - 90}{2} = 20\\).", "Motorbikes \\(= 45 - 20 = 25\\)."],
        answer: "25",
      },
      practiceSet: [
        { prompt: "40 heads and 100 legs among hens and goats. How many goats?", answer: "10" },
        { prompt: "30 heads and 84 legs among people and dogs. How many people?", answer: "18" },
        { prompt: "50 heads and 140 legs among chickens and rabbits. How many chickens?", answer: "30" },
      ],
      pyqExampleId: "d7e49697-efc9-42ca-997c-f0a2d010b9de",
      traps: [
        {
          title: "Dividing the extra legs by 4",
          body: "Each four-legged animal has 2 legs MORE than a two-legged one, so the extra legs are divided by 2, not by 4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2lewp-ages",
      name: "Age problems",
      intuition:
        "A year passes for both people at once, so write the ages at one time as parts of a single letter, then move every age forward or back by the same amount and set up the condition the stem gives.",
      definition:
        "- Write the ages at the time the ratio is given as parts of k (or as a and b with one link).\n" +
        "- n years later or earlier, add or subtract n from EVERY age.\n" +
        "- A sum of present ages and a later ratio: let one age be x and the other the sum minus x.",
      formula: {
        label: "Ages n years later",
        latex: "\\frac{ak + n}{bk + n} = \\frac{p}{q}",
      },
      authoredExample: {
        prompt: "A mother and daughter's ages add to 50 now. In 5 years the mother will be three times as old as the daughter. Find their present ages.",
        steps: ["Daughter d, mother \\(50 - d\\): \\(55 - d = 3(d + 5)\\).", "\\(4d = 40\\), so \\(d = 10\\) and the mother is 40."],
        answer: "10 and 40 years",
      },
      selfCheckExample: {
        prompt: "Five years ago, two brothers' ages were in the ratio 3 : 2. Five years from now they will be 5 : 4. Find their present ages.",
        steps: [
          "Five years ago: 3k and 2k. Five years on: \\(\\frac{3k + 10}{2k + 10} = \\frac{5}{4}\\), so \\(12k + 40 = 10k + 50\\) and \\(k = 5\\).",
          "Present ages: 20 and 15.",
        ],
        answer: "20 and 15 years",
      },
      practiceSet: [
        { prompt: "A is twice as old as B. Ten years ago A was three times as old as B. Find A's age now.", answer: "40" },
        { prompt: "The ages of two people are in the ratio 4 : 5, and in 6 years they will be 6 : 7. Find the younger's age now.", answer: "12" },
        { prompt: "A father is 30 years older than his son. In 5 years he will be three times as old as the son. Find the son's age now.", answer: "10" },
      ],
      pyqExampleId: "4c407a6e-fb74-4527-acea-48e8866ae72b",
      traps: [
        {
          title: "Shifting the ratio numbers by the years",
          body: "Five years later the ages are \\(3k + 5\\) and \\(2k + 5\\), not 8 and 7. The years add to the ages, never to the ratio.",
        },
      ],
    },
  ],
};
