import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LE_AGES_NOTE: SubtopicNote = {
  subtopicName: "Age Problems",
  title: "Age Problems",
  oneLineDefinition:
    "Write every age as a present age plus or minus the years that have passed; each 'was' or 'will be' sentence is then one linear equation.",
  whyItMatters:
    "Twelve PYQs, two of them HARD. Everyone ages at the same rate: n years ago each person was n younger, so a family of k people was kn years younger in total. Keep all ages in the present and the equations stay simple.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsle-ages",
      name: "Past, present and future ages",
      intuition:
        "Let the present ages be the unknowns. 'Five years ago' subtracts \\(5\\) from each; 'in four years' adds \\(4\\). The difference between two people's ages never changes.",
      definition:
        "- \\(n\\) years ago: each age minus \\(n\\); a group of \\(k\\) people is \\(kn\\) years younger in total.\n" +
        "- The difference between two ages is the same at every time.\n" +
        "- 'Was three times as old' becomes \\(R - 5 = 3(S - 5)\\), not \\(R = 3S - 5\\).\n" +
        "- The year the youngest was born, the others were younger by the youngest's present age.",
      formula: {
        label: "n years ago",
        latex: "R - n = k(S - n)",
      },
      authoredExample: {
        prompt: "Four years ago \\(A\\) was four times as old as \\(B\\). In six years \\(A\\) will be twice as old as \\(B\\). Find \\(A\\)'s present age.",
        steps: ["\\(A - 4 = 4(B - 4)\\) gives \\(A = 4B - 12\\).", "\\(A + 6 = 2(B + 6)\\) gives \\(A = 2B + 6\\).", "\\(B = 9\\)."],
        answer: "\\(24\\) years.",
      },
      selfCheckExample: {
        prompt: "A family of four has ages totalling \\(80\\). The year the youngest was born, their ages totalled \\(56\\) (the youngest not yet counted). How old is the youngest?",
        steps: ["The three others were each \\(y\\) years younger: \\(80 - y - 3y = 56\\)."],
        answer: "\\(6\\) years.",
      },
      practiceSet: [
        { prompt: "\\(A\\) is \\(8\\) years older than \\(B\\). In \\(10\\) years, the difference?", answer: "\\(8\\)" },
        { prompt: "Father \\(= 4 \\times\\) son; in \\(20\\) years \\(2 \\times\\). Son now?", answer: "\\(10\\)" },
        { prompt: "Married \\(5\\) years ago; now \\(1.2 \\times\\) her age then. Now?", answer: "\\(30\\)" },
        { prompt: "\\(5\\) people, \\(3\\) years ago total \\(100\\). Now?", answer: "\\(115\\)" },
      ],
      pyqExampleId: "56593e57-0597-48bc-956a-9695f1d04363", // 2017 (II) — Ram three times Shyam five years ago
      traps: [
        {
          title: "Subtract from both ages",
          body:
            "'Five years ago Ram was three times as old as Shyam' is \\(R - 5 = 3(S - 5)\\). Subtracting only from Ram's side gives the wrong equation.",
        },
      ],
    },
  ],
};
