import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_RACES_NOTE: SubtopicNote = {
  subtopicName: "Races",
  title: "Races: Beating, Head Starts and Dead Heats",
  oneLineDefinition:
    "Turn a result such as 'A beats B by 20 m' into a ratio of speeds, then use that ratio for a new race length, a head start, or a third runner.",
  whyItMatters:
    "No AFCAT paper has set a race question here, but a fifth of the page is HARD. Every question rests on one fact: in the same time, distances run are in the ratio of the speeds. Marks go on mixing up 'beats by 20 m' with 'beats by 20 s', and on adding the margins of a three runner race.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-beat-by",
      name: "Beating by a distance or by a time",
      intuition:
        "When A finishes, B is still some way short. In that same time A ran the whole race and B ran the race less the gap, so their speeds are in that ratio.",
      definition:
        "- A beats B by \\(x\\) m in a \\(D\\) m race: \\(v_A : v_B = D : (D - x)\\).\n" +
        "- A beats B by \\(t\\) s: B's time is A's time plus \\(t\\).\n" +
        "- 'Beats by \\(x\\) m or by \\(t\\) s': B runs those last \\(x\\) m in \\(t\\) s, so \\(v_B = \\tfrac xt\\).\n" +
        "- A race of another length: B runs \\(\\tfrac{D - x}{D}\\) of the new distance while A runs all of it.",
      formula: {
        label: "Speed ratio from a margin",
        latex: "\\dfrac{v_A}{v_B} = \\dfrac{D}{D - x}",
      },
      authoredExample: {
        prompt: "In a 400 m race A beats B by 40 m. By how much does A beat B in a 1,000 m race?",
        steps: [
          "\\(v_A : v_B = 400 : 360 = 10 : 9\\).",
          "While A runs 1,000 m, B runs \\(\\tfrac{9}{10} \\times 1000 = 900\\) m.",
        ],
        answer: "100 m.",
      },
      selfCheckExample: {
        prompt: "In a 1,000 m race A beats B by 50 m or by 10 s. Find A's time.",
        steps: [
          "B runs the last 50 m in 10 s, so B's speed is 5 m/s and B takes 200 s.",
          "A finishes 10 s sooner.",
        ],
        answer: "190 s.",
      },
      practiceSet: [
        { prompt: "A runs at 6 m/s and B at 5 m/s. By how much does A win a 600 m race?", answer: "100 m" },
        { prompt: "In a 500 m race A takes 100 s and beats B by 25 s. Find B's speed.", answer: "4 m/s" },
        { prompt: "In a 200 m race A beats B by 20 m. By how much does A beat B in a 300 m race?", answer: "30 m" },
      ],
      pyqExampleId: "21c920b6-1b0e-4e3c-be25-409434ea4d7e",
      traps: [
        {
          title: "Beaten by a distance, or by a time",
          body: "'Beats by 10 s' is a gap in time: B's time is 10 s more. It is not 10 m to subtract from the race.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-head-start",
      name: "Head starts and dead heats",
      intuition:
        "A head start shortens the slower runner's race. Work out where each runner is at the moment the first one finishes.",
      definition:
        "- B starts \\(x\\) m ahead: B has only \\(D - x\\) to run.\n" +
        "- While A runs \\(D\\), B runs \\(D \\times \\tfrac{v_B}{v_A}\\). Compare that with \\(D - x\\).\n" +
        "- **Dead heat** (both finish together): B's start \\(= D - D \\times \\tfrac{v_B}{v_A}\\).\n" +
        "- 'Gives B a start of \\(x\\) m and still beats him by \\(y\\) m': B ran \\(D - x - y\\) while A ran \\(D\\).\n" +
        "- A race on a circular track with a head start works the same way.",
      formula: {
        label: "Start for a dead heat",
        latex: "\\text{start} = D\\left(1 - \\dfrac{v_B}{v_A}\\right)",
      },
      authoredExample: {
        prompt: "In a 600 m race A runs at 6 m/s and B at 5 m/s. How much start should A give B for a dead heat?",
        steps: [
          "A finishes in \\(600 \\div 6 = 100\\) s.",
          "In 100 s B runs 500 m, so B needs 100 m less to run.",
        ],
        answer: "100 m.",
      },
      selfCheckExample: {
        prompt: "In a 600 m race A gives B a 60 m start and still wins by 20 m. Find the ratio of their speeds.",
        steps: ["While A ran 600 m, B ran \\(600 - 60 - 20 = 520\\) m.", "\\(600 : 520 = 15 : 13\\)."],
        answer: "\\(15 : 13\\).",
      },
      practiceSet: [
        { prompt: "A runs at 10 m/s and B at 8 m/s. In a 1,000 m race A gives B a 150 m start. Who wins, and by how much?", answer: "A, by 50 m" },
        { prompt: "A is 20% faster than B. In a 900 m race, what start should A give B for a dead heat?", answer: "150 m" },
        { prompt: "In a 500 m race A gives B a 50 m start; A runs 10 m/s and B 8 m/s. By how many seconds does A win?", answer: "6.25 s" },
      ],
      pyqExampleId: "cf650065-597b-4ae6-b01f-6843c8d1154b",
      traps: [
        {
          title: "Count the start once",
          body: "With an 80 m start in an 800 m race, B has 720 m to run. When A wins by 30 m, B has run 690 m, not 770.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-three-runners",
      name: "Three runners: chaining the results",
      intuition:
        "Turn each result into a ratio of speeds and chain them, the way two ratios are compounded. The margins themselves do not add.",
      definition:
        "- A beats B by \\(x\\) and B beats C by \\(y\\) in \\(D\\) m: when A finishes, C has run \\(\\dfrac{(D - x)(D - y)}{D}\\).\n" +
        "- A beats B by \\(x\\) and C by \\(z\\) in the same race: \\(A : B : C = D : (D - x) : (D - z)\\). Over \\(D\\) m, B beats C by \\(D - \\dfrac{D(D - z)}{D - x}\\).\n" +
        "- Margins in time do add: A beats B by 2 s and B beats C by 3 s, so A beats C by 5 s.",
      formula: {
        label: "C's distance when A finishes",
        latex: "\\dfrac{(D - x)(D - y)}{D}",
      },
      authoredExample: {
        prompt: "In a 250 m race A beats B by 25 m and B beats C by 50 m. By how much does A beat C?",
        steps: [
          "When A finishes, B has run 225 m.",
          "C runs \\(\\tfrac{200}{250}\\) of what B runs: \\(\\tfrac{200}{250} \\times 225 = 180\\) m.",
          "\\(250 - 180 = 70\\).",
        ],
        answer: "70 m.",
      },
      selfCheckExample: {
        prompt: "In a 500 m race A beats B by 50 m and C by 100 m. By how much does B beat C over 500 m?",
        steps: [
          "\\(B : C = 450 : 400 = 9 : 8\\).",
          "While B runs 500 m, C runs \\(\\tfrac89 \\times 500 = 444\\tfrac49\\) m.",
        ],
        answer: "\\(55\\tfrac59\\) m.",
      },
      practiceSet: [
        { prompt: "In a 1,000 m race A beats B by 100 m and B beats C by 100 m. By how much does A beat C?", answer: "190 m" },
        { prompt: "A beats B by 4 s and B beats C by 6 s over the same distance. By how much does A beat C?", answer: "10 s" },
        { prompt: "In a 600 m race A beats B by 60 m and C by 120 m. By how much does B beat C over 600 m?", answer: "\\(66\\tfrac23\\) m" },
      ],
      pyqExampleId: "1287a4d9-79c5-4257-a5c8-b17db34150a9",
      traps: [
        {
          title: "Distance margins do not add",
          body: "Beating B by 25 m and B beating C by 50 m does not make 75 m: while A runs the race, B runs only 225 m, so C falls behind B by less than 50 m. The answer is 70 m.",
        },
      ],
    },
  ],
};
