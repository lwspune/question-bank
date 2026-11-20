import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TW_PIPES_NOTE: SubtopicNote = {
  subtopicName: "Pipes and Cisterns",
  title: "Pipes and Cisterns",
  oneLineDefinition:
    "A pipe that fills is a worker and a pipe or leak that empties is a worker doing negative work: net the rates, and when pipes take turns, watch for the tank finishing partway through a turn.",
  whyItMatters:
    "8 questions in the Tier II bank, 2 EASY and 6 MODERATE: the hardest page of the chapter. Leaks, pipes shut early and pipes opened in turn are the twists that make them MODERATE.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2twpc-net",
      name: "Inlets and outlets together",
      visualizationSlug: "ssc-t2-pipes-tank",
      intuition:
        "A pipe that fills is a worker; a pipe or leak that empties is a worker doing negative work. Add the filling rates, take away the emptying ones, and the net rate gives the time.",
      definition:
        "- Net rate \\(=\\) filling rates \\(-\\) emptying rates, as parts of the tank per hour (or units per hour).\n" +
        "- A tap that fills in a hours alone and in b hours with a leak: the leak alone empties the full tank in \\(\\frac{ab}{b - a}\\) hours.\n" +
        "- A pipe shut before the end: write each pipe's running time in terms of the total time T.\n" +
        "- When a pipe's share of the tank per minute and its litres per minute are both known, the tank's size follows.\n" +
        "- Flow through round taps goes with the square of the diameter.",
      formula: {
        label: "A leak from two fill times",
        latex: "\\text{leak alone} = \\frac{ab}{b - a}",
        symbols: [{ symbol: "a, b", meaning: "fill time without the leak, and with it" }],
      },
      authoredExample: {
        prompt: "Pipe A fills a tank in 10 hours and pipe B in 15 hours, while pipe C empties it in 20 hours. All three are opened together. When is the tank full?",
        steps: ["Take 60 units: A adds 6 an hour, B 4, and C removes 3.", "Net 7 an hour: \\(60 \\div 7 = 8\\frac{4}{7}\\) hours."],
        answer: "\\(8\\frac{4}{7}\\) hours",
      },
      selfCheckExample: {
        prompt: "A tap fills a tank in 6 hours, but with a leak it takes 8 hours. How long does the leak alone take to empty the full tank?",
        steps: ["\\(\\frac{6 \\times 8}{8 - 6} = 24\\) hours.", "Check: \\(\\frac{1}{6} - \\frac{1}{24} = \\frac{1}{8}\\)."],
        answer: "24 hours",
      },
      practiceSet: [
        { prompt: "Two pipes fill a tank in 12 and 18 minutes. How long do they take together?", answer: "7.2 minutes" },
        { prompt: "A pipe fills a tank in 4 hours and a drain empties it in 6. With both open, how long does the tank take to fill?", answer: "12 hours" },
        { prompt: "Pipes A (20 minutes) and B (30 minutes) are opened together, but B is shut 5 minutes before the tank is full. How long does filling take?", answer: "14 minutes" },
      ],
      pyqExampleId: "d1fe2f58-587e-424c-b1fd-500f185fafc1",
      traps: [
        {
          title: "Adding a leak's rate",
          body: "A leak works AGAINST the inlets. A 6-hour tap with a 24-hour leak fills at \\(\\frac{1}{6} - \\frac{1}{24}\\), not \\(\\frac{1}{6} + \\frac{1}{24}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2twpc-alternate",
      name: "Pipes opened in turn",
      intuition:
        "Pipes opened an hour at a time work like workers taking turns. The difference is that when an emptying pipe is in the cycle, the tank can reach full or empty partway through a turn, so check the end of each turn.",
      definition:
        "- Units per cycle \\(=\\) the sum of each turn's units, with an outlet counted as negative.\n" +
        "- The tank finishes during the turn that crosses the line, which may be before the cycle ends.\n" +
        "- So stop counting whole cycles once the next turn alone could finish the job, and step turn by turn from there.",
      formula: {
        label: "Net change in one cycle",
        latex: "\\text{net per cycle} = \\text{inlet units} - \\text{outlet units}",
      },
      authoredExample: {
        prompt: "Pipe A fills a tank in 6 hours and pipe B in 8 hours. They are opened alternately for an hour each, A first. How long does the tank take to fill?",
        steps: [
          "Take 24 units: A adds 4 an hour, B 3, so each 2-hour cycle adds 7.",
          "3 cycles (6 hours) add 21, leaving 3; in hour 7, A needs \\(\\frac{3}{4}\\) of an hour.",
          "Total \\(6\\frac{3}{4}\\) hours.",
        ],
        answer: "\\(6\\frac{3}{4}\\) hours",
      },
      selfCheckExample: {
        prompt: "A full tank holds 20 units. Pipe X empties 4 units an hour and pipe Y refills 3 units an hour. They run alternately for an hour each, X first. When is the tank first empty?",
        steps: [
          "Each 2-hour cycle removes 1 unit net. X can finish the job in its hour once 4 or fewer units remain.",
          "After 16 cycles (32 hours) 4 units remain, and X empties them in hour 33.",
        ],
        answer: "After 33 hours",
      },
      practiceSet: [
        { prompt: "Inlets A and B add 5 and 4 units an hour to a 45-unit tank, opened alternately, A first. How long does the tank take to fill?", answer: "10 hours" },
        { prompt: "In each 2-hour cycle an inlet adds 6 units and an outlet removes 4. What is the net change per cycle?", answer: "+2 units" },
        { prompt: "4 units remain at the start of an inlet's hour, and the inlet adds 6 units an hour. What part of the hour is needed?", answer: "\\(\\frac{2}{3}\\) of an hour" },
      ],
      pyqExampleId: "d31a3a24-3f5a-4a3d-99d2-9476256aff72",
      traps: [
        {
          title: "Counting whole cycles to the very end",
          body: "Dividing 20 units by a net loss of 1 a cycle suggests 40 hours, but the emptying pipe clears the last 4 units on its own in hour 33. Step through the end turn by turn.",
        },
      ],
    },
  ],
};
