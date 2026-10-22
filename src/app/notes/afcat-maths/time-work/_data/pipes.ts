import type { SubtopicNote } from "@/app/notes/_types";

export const AF_TW_PIPES_NOTE: SubtopicNote = {
  subtopicName: "Pipes and Cisterns",
  title: "Pipes and Cisterns",
  oneLineDefinition:
    "A pipe is a worker whose job is filling a tank: filling pipes add their rates, and emptying pipes and leaks take theirs away.",
  whyItMatters:
    "No AFCAT past-year question is here yet, and most of the page is EASY or MODERATE. The marks go on the sign of a rate: a leak or a waste pipe is taken away, not added, and when the emptying rate is the larger one the tank never fills.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aftw-net-rate",
      name: "Filling and emptying together",
      intuition:
        "A pipe that fills a tank in 5 hours puts in \\(\\tfrac 15\\) of it each hour; one that empties it in 10 hours takes out \\(\\tfrac 1{10}\\). Open both, and the tank gains the difference, \\(\\tfrac 1{10}\\) an hour.",
      definition:
        "- Net rate = sum of the filling rates minus sum of the emptying rates.\n" +
        "- Time to fill an empty tank = 1 ÷ net rate. If the net rate is negative, the tank never fills; a full tank empties instead.\n" +
        "- An unknown waste pipe: its rate is the filling rates minus the net rate.\n" +
        "- One pipe k times as fast as another: give them rates \\(k\\) and 1 units, as on Combined Work.",
      formula: {
        label: "Net rate",
        latex: "\\dfrac 1T = \\dfrac 1a + \\dfrac 1b - \\dfrac 1c",
      },
      authoredExample: {
        prompt:
          "Pipes A and B fill a tank in 10 and 15 hours, and pipe C empties it in 12 hours. If all three are opened together, how long does the empty tank take to fill?",
        steps: [
          "Take the tank as 60 units: A puts in 6 an hour, B 4, and C takes out 5.",
          "The net gain is 5 units an hour, so \\(60 \\div 5 = 12\\) hours.",
        ],
        answer: "12 hours.",
      },
      selfCheckExample: {
        prompt:
          "Two taps fill a tank in 9 and 12 hours. With a waste pipe also open, the tank fills in 12 hours. How long would the waste pipe take to empty a full tank?",
        steps: [
          "The waste pipe's rate is \\(\\tfrac 19 + \\tfrac 1{12} - \\tfrac 1{12} = \\tfrac 19\\).",
          "So it empties a full tank in 9 hours.",
        ],
        answer: "9 hours.",
      },
      practiceSet: [
        { prompt: "A pipe fills a tank in 10 hours and another empties it in 15 hours. Both are opened. How long does the tank take to fill?", answer: "30 hours" },
        {
          prompt: "Taps A and B fill a tank in 12 and 18 hours, and tap C empties it in 9 hours. Does the tank fill if all three are open, and in how long?",
          answer: "Yes, in 36 hours",
        },
        {
          prompt: "One pipe fills a tank four times as fast as another. Together they fill it in 24 minutes. How long does the slower pipe take alone?",
          answer: "2 hours",
        },
      ],
      pyqExampleId: "4dcb8b20-cd56-4eab-99a3-e23d6e01c08d",
      traps: [
        {
          title: "Take the outlet away",
          body: "Taps filling in 20 and 30 hours take 12 hours together. With a drain that empties the tank in 15 hours also open, they take 60 hours, not less than 12.",
        },
        {
          title: "A negative net rate never fills",
          body: "If the emptying pipe is faster than the filling pipes together, an empty tank stays empty. Look for an option that says the tank is never filled.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-leak",
      name: "Finding a leak from the delay",
      intuition:
        "A leak shows itself by slowing the filling. The rate with the leak is less than the rate without it, and the difference is the leak's own rate.",
      definition:
        "- Leak rate = \\(\\tfrac 1a - \\tfrac 1b\\), where \\(a\\) is the time to fill without the leak and \\(b\\) the time with it.\n" +
        "- So the leak alone empties a full tank in \\(\\dfrac{ab}{b - a}\\).\n" +
        "- A delay given in minutes: change both times to the same unit before you subtract.",
      formula: {
        label: "Time for the leak",
        latex: "L = \\dfrac{ab}{b - a}",
      },
      authoredExample: {
        prompt: "A pump fills a tank in 4 hours. Because of a leak it takes 5 hours. How long does the leak take to empty the full tank?",
        steps: ["The leak's rate is \\(\\tfrac 14 - \\tfrac 15 = \\tfrac 1{20}\\).", "So it empties the tank in 20 hours."],
        answer: "20 hours.",
      },
      selfCheckExample: {
        prompt:
          "Two pipes fill a tank in 10 and 15 hours. Because of a leak, they take 1 hour longer than they should. How long does the leak take to empty the full tank?",
        steps: [
          "Without the leak they take \\(\\tfrac{10 \\times 15}{25} = 6\\) hours, so with it they take 7.",
          "The leak's rate is \\(\\tfrac 16 - \\tfrac 17 = \\tfrac 1{42}\\).",
        ],
        answer: "42 hours.",
      },
      practiceSet: [
        { prompt: "A tap fills a cistern in 6 hours, but because of a leak it takes 8 hours. How long does the leak take to empty the full cistern?", answer: "24 hours" },
        { prompt: "A pipe fills a tank in 40 minutes; with a leak it takes 1 hour. How long does the leak take to empty the full tank?", answer: "2 hours" },
      ],
      pyqExampleId: "d59a2051-7353-4536-81fa-bda61a19c940",
      traps: [
        {
          title: "The leak is slower than both times",
          body: "A pump taking 4 hours, and 5 hours with a leak, does not mean the leak empties the tank in 1 hour, or in 9. Its rate is the difference of the two rates, so it takes 20 hours.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-pipes-stages",
      name: "Pipes opened or closed partway",
      intuition:
        "This is the method of Partial Work, Joining and Leaving with pipes in place of people. Work out how full the tank is at the moment a pipe opens or closes, then fill the rest at the new net rate.",
      definition:
        "- Part filled in a stage = net rate of the open pipes × time.\n" +
        "- After a pipe is closed, the rest fills at the rate of the pipes still open.\n" +
        "- An unknown pipe: compare the rate of a stage with it and a stage without it, as with one person from a joint rate.",
      formula: {
        label: "Stages",
        latex: "\\sum (\\text{net rate} \\times \\text{time}) = 1",
      },
      authoredExample: {
        prompt:
          "Pipes A and B fill a tank in 10 and 20 minutes. Both are opened, and after 4 minutes A is closed. How much longer does the tank take to fill?",
        steps: [
          "Together they fill \\(\\tfrac 1{10} + \\tfrac 1{20} = \\tfrac 3{20}\\) a minute, so 4 minutes fill \\(\\tfrac 35\\).",
          "B fills the other \\(\\tfrac 25\\) at \\(\\tfrac 1{20}\\) a minute: \\(\\tfrac 25 \\times 20 = 8\\) minutes.",
        ],
        answer: "8 minutes.",
      },
      selfCheckExample: {
        prompt:
          "A and B fill a tank in 8 and 16 hours, and C empties it in 32 hours. A and B run for 2 hours, then C is opened too. How long does the whole filling take?",
        steps: [
          "A and B fill \\(\\tfrac 3{16}\\) an hour, so 2 hours fill \\(\\tfrac 38\\).",
          "With C open the net rate is \\(\\tfrac 6{32} - \\tfrac 1{32} = \\tfrac 5{32}\\), and the other \\(\\tfrac 58 = \\tfrac{20}{32}\\) takes 4 hours.",
        ],
        answer: "6 hours in all.",
      },
      practiceSet: [
        {
          prompt: "Two pipes fill a tank in 6 and 9 hours. Both run for 2 hours, then the first is turned off. How much longer does the tank take to fill?",
          answer: "4 hours",
        },
        {
          prompt:
            "Three pipes together fill a tank in 8 hours. After 2 hours the third is closed, and the other two fill the rest in 9 hours. How long would the third pipe take alone?",
          answer: "24 hours",
        },
      ],
      pyqExampleId: "8ab6a4a8-5583-41ac-960a-ab69722b915c",
      traps: [
        {
          title: "Leave out the closed pipe",
          body: "After a pipe is shut, only the pipes still open fill the rest. Keeping the closed pipe's rate in the sum makes the answer too short.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aftw-pipe-puzzles",
      name: "Capacity, pipes in turn and mixtures",
      intuition:
        "A few pipe questions add a twist: a capacity in litres, pipes opened in turn, a gap between two pipes' times, or the mix of liquids the pipes bring in. Each is an earlier method in a new setting.",
      definition:
        "- **Capacity**: when a pipe's share of the tank per minute is known and so is its flow in litres per minute, capacity = litres per minute ÷ share per minute.\n" +
        "- **Pipes in turn**: run cycles as on Working on Alternate Days. With a filling and an emptying pipe in turn, the tank can fill during a filling turn, so check the level at the end of each filling turn.\n" +
        "- **Mixture**: while all pipes are open, the liquid from each is in the ratio of their rates.\n" +
        "- **A gap in time with a joint time**: 'A takes 5 hours more than B, and together they take 6 hours' gives a quadratic. Trying the options is often quicker.",
      formula: {
        label: "Capacity",
        latex: "\\text{capacity} = \\dfrac{\\text{litres per minute}}{\\text{share of the tank per minute}}",
      },
      authoredExample: {
        prompt:
          "Pipes A and B fill a tank in 12 and 18 minutes. With a drain also open, which lets out 2 litres a minute, the tank fills in 9 minutes. Find the capacity of the tank.",
        steps: [
          "A and B fill \\(\\tfrac 1{12} + \\tfrac 1{18} = \\tfrac 5{36}\\) a minute; with the drain the net rate is \\(\\tfrac 19 = \\tfrac 4{36}\\).",
          "So the drain lets out \\(\\tfrac 1{36}\\) of the tank a minute, which is 2 litres.",
          "The tank holds \\(2 \\times 36\\) litres.",
        ],
        answer: "72 litres.",
      },
      selfCheckExample: {
        prompt:
          "A pipe fills a tank in 12 minutes and another empties it in 15 minutes. They are opened in turn for one minute each, the filling pipe first. When is the empty tank first full?",
        steps: [
          "Take the tank as 60 units: a filling minute adds 5 and an emptying minute takes out 4, so each 2-minute cycle gains 1.",
          "After 55 cycles, 110 minutes, the tank holds 55 units.",
          "The next filling minute adds the last 5 units: 111 minutes.",
        ],
        answer: "111 minutes, which is 1 h 51 min.",
      },
      practiceSet: [
        {
          prompt:
            "Pipes A, B and C fill a tank in 10, 15 and 30 minutes, and each carries a different chemical. All three are opened together. What fraction of the liquid after 4 minutes came from C?",
          answer: "\\(\\tfrac 16\\)",
        },
        {
          prompt: "Two pipes together fill a tank in 8 hours, and one takes 12 hours more than the other. How long does the faster pipe take alone?",
          answer: "12 hours",
        },
        {
          prompt: "Pipes A and B fill a tank in 4 and 6 hours and are opened in turn for an hour each, A first. How long does the tank take to fill?",
          answer: "\\(4\\tfrac 23\\) hours",
        },
      ],
      pyqExampleId: "c54122e0-7660-4199-9393-26a3aa3ca88e",
      traps: [
        {
          title: "The tank can fill partway through the cycles",
          body: "With a filling pipe and an emptying pipe in turn, the level peaks at the end of each filling turn. Dividing the whole tank by the gain per cycle overshoots, because the last filling turn finishes the job before the emptying turn comes round.",
        },
      ],
    },
  ],
};
