import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_TS_SPEED_NOTE: SubtopicNote = {
  subtopicName: "Average Speed, Trains and Streams",
  title: "Average Speed, Trains and Streams",
  oneLineDefinition:
    "Speed is distance divided by time; a whole journey's average speed, two trains crossing and a boat in a stream each use that one rule in a different way.",
  whyItMatters:
    "Five questions in the bank, and all five are from the past papers: three from 2022 (two about trains and one average speed) and two from 2026 (an average speed and a boat in a stream). One is EASY, two are MODERATE and two are HARD. Every one is settled by writing the time for each part of the journey and adding, never by averaging speeds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spitssp-average",
      name: "Average speed over a whole journey",
      intuition:
        "A journey's average speed is the one steady speed that would cover the same distance in the same time. So find the total distance and the total time, then divide. A slow part takes longer, so it pulls the average down more than a fast part pulls it up.",
      definition:
        "- **Average speed** \\(=\\) total distance \\(\\div\\) total time.\n" +
        "- Find the time of each part first: time \\(=\\) distance \\(\\div\\) speed.\n" +
        "- For **two equal distances** at speeds u and v, the average is \\(\\frac{2uv}{u + v}\\), which is always less than the plain mean \\(\\frac{u + v}{2}\\).\n" +
        "- Only when the **times** are equal is the average speed the plain mean of the two speeds.",
      formula: {
        label: "Average speed",
        latex: "\\text{Average speed} = \\frac{\\text{total distance}}{\\text{total time}}, \\qquad \\text{equal distances: } \\frac{2uv}{u + v}",
        symbols: [{ symbol: "u, v", meaning: "the speeds over the two equal distances" }],
      },
      authoredExample: {
        prompt: "A cyclist rides 24 km to a lake at 12 km/h and the same 24 km back at 8 km/h. Find the average speed for the whole trip.",
        steps: [
          "Time out \\(= \\frac{24}{12} = 2\\) h. Time back \\(= \\frac{24}{8} = 3\\) h.",
          "Total distance 48 km in 5 h, so the average speed is \\(\\frac{48}{5} = 9.6\\) km/h.",
          "Check with the shortcut: \\(\\frac{2 \\times 12 \\times 8}{12 + 8} = \\frac{192}{20} = 9.6\\).",
        ],
        answer: "9.6 km/h",
      },
      selfCheckExample: {
        prompt: "A bus goes 120 km at 40 km/h and then 60 km at 30 km/h. Find its average speed for the whole trip.",
        steps: ["Times: \\(\\frac{120}{40} = 3\\) h and \\(\\frac{60}{30} = 2\\) h.", "Average \\(= \\frac{180}{5} = 36\\) km/h."],
        answer: "36 km/h",
      },
      practiceSet: [
        { prompt: "A man walks to a shop at 4 km/h and back home along the same road at 6 km/h. What is his average speed?", answer: "\\(\\frac{2 \\times 4 \\times 6}{4 + 6} = 4.8\\) km/h" },
        { prompt: "A car runs for 2 hours at 60 km/h and then for 3 hours at 40 km/h. Find its average speed.", answer: "\\(\\frac{120 + 120}{5} = 48\\) km/h" },
        { prompt: "Is the average speed for 20 km at 10 km/h followed by 20 km at 30 km/h equal to 20 km/h?", answer: "No: the times are 2 h and \\(\\frac{2}{3}\\) h, so it is \\(\\frac{40}{8/3} = 15\\) km/h" },
      ],
      pyqExampleId: "fcd4f04b-c072-416f-8492-b187c89d6cef",
      traps: [
        {
          title: "Averaging the two speeds",
          body: "24 km at 12 km/h and 24 km at 8 km/h does not average 10 km/h. The slow half takes longer, so the true average is 9.6 km/h. Add the times first.",
        },
        {
          title: "Using the shortcut when the distances differ",
          body: "\\(\\frac{2uv}{u + v}\\) is only for two equal distances. For 120 km and 60 km, work out each time and divide the total distance by the total time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitssp-trains",
      name: "Relative speed: trains passing and crossing",
      intuition:
        "When two things move, what matters is how fast the gap between them closes. Moving the same way, the faster one gains only the difference of the speeds; moving towards each other, they close the gap at the sum of the speeds.",
      definition:
        "- **Same direction:** relative speed \\(= v_1 - v_2\\). **Opposite directions:** relative speed \\(= v_1 + v_2\\).\n" +
        "- A train passing a pole or a man covers **its own length**. Passing a platform or another train, it covers the **sum of the two lengths**.\n" +
        "- Change km/h into m/s by multiplying by \\(\\frac{5}{18}\\), and m/s into km/h by multiplying by \\(\\frac{18}{5}\\).",
      formula: {
        label: "Time to cross",
        latex: "t = \\frac{L_1 + L_2}{v_1 \\pm v_2}, \\qquad 1 \\text{ km/h} = \\frac{5}{18} \\text{ m/s}",
        symbols: [
          { symbol: "L₁, L₂", meaning: "the two lengths (0 for a pole or a man)" },
          { symbol: "v₁ ± v₂", meaning: "minus for the same direction, plus for opposite directions" },
        ],
      },
      authoredExample: {
        prompt: "A train 150 m long runs at 54 km/h. How long does it take to pass a platform 210 m long?",
        steps: [
          "Speed \\(= 54 \\times \\frac{5}{18} = 15\\) m/s.",
          "Distance \\(= 150 + 210 = 360\\) m, the train's length plus the platform's.",
          "Time \\(= \\frac{360}{15} = 24\\) s.",
        ],
        answer: "24 seconds",
      },
      selfCheckExample: {
        prompt: "Two trains 120 m and 80 m long run towards each other at 40 km/h and 32 km/h. How long do they take to cross each other?",
        steps: ["Relative speed \\(= 72\\) km/h \\(= 20\\) m/s.", "Time \\(= \\frac{120 + 80}{20} = 10\\) s."],
        answer: "10 seconds",
      },
      practiceSet: [
        { prompt: "Change 90 km/h into metres per second.", answer: "\\(90 \\times \\frac{5}{18} = 25\\) m/s" },
        { prompt: "A train 200 m long passes a pole in 10 seconds. Find its speed in km/h.", answer: "20 m/s, which is \\(20 \\times \\frac{18}{5} = 72\\) km/h" },
        {
          prompt: "A train at 60 km/h overtakes a man walking the same way at 6 km/h in 10 seconds. How long is the train?",
          answer: "Relative speed 54 km/h \\(= 15\\) m/s, so the length is \\(15 \\times 10 = 150\\) m",
        },
      ],
      pyqExampleId: "96774587-0e5b-42b9-9737-aa4c654556a7",
      traps: [
        {
          title: "Adding the speeds when both go the same way",
          body: "A train at 60 km/h overtaking one at 40 km/h gains only 20 km/h on it. Add the speeds only when the two move towards each other.",
        },
        {
          title: "Forgetting the second length",
          body: "Crossing another train or a platform means covering both lengths. Only a pole, a post or a man counts as length 0.",
        },
        {
          title: "Mixing km/h with metres and seconds",
          body: "Lengths in metres and times in seconds need the speed in m/s. Change km/h with \\(\\frac{5}{18}\\) before you divide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spitssp-streams",
      name: "Boats and streams",
      intuition:
        "A stream carries a boat along when it goes downstream and holds it back when it goes upstream. So the same boat has two speeds, and the stream's speed is half the gap between them.",
      definition:
        "- **Downstream** speed \\(= b + s\\); **upstream** speed \\(= b - s\\), where b is the boat's speed in still water and s the stream's.\n" +
        "- So \\(b = \\frac{\\text{down} + \\text{up}}{2}\\) and \\(s = \\frac{\\text{down} - \\text{up}}{2}\\).\n" +
        "- 'It takes 1 hour more upstream' gives \\(\\frac{d}{b - s} - \\frac{d}{b + s} = 1\\), a quadratic equation in s.",
      formula: {
        label: "Speeds with a stream",
        latex: "\\text{down} = b + s, \\quad \\text{up} = b - s, \\quad s = \\frac{\\text{down} - \\text{up}}{2}",
      },
      authoredExample: {
        prompt: "A boat goes 30 km downstream in 2 hours and comes back in 3 hours. Find its speed in still water and the speed of the stream.",
        steps: [
          "Downstream speed \\(= \\frac{30}{2} = 15\\) km/h; upstream speed \\(= \\frac{30}{3} = 10\\) km/h.",
          "\\(b = \\frac{15 + 10}{2} = 12.5\\) km/h and \\(s = \\frac{15 - 10}{2} = 2.5\\) km/h.",
        ],
        answer: "Boat 12.5 km/h, stream 2.5 km/h",
      },
      selfCheckExample: {
        prompt: "A boat's speed in still water is 10 km/h and the stream flows at 2 km/h. How long does the boat take to go 24 km upstream?",
        steps: ["Upstream speed \\(= 10 - 2 = 8\\) km/h.", "Time \\(= \\frac{24}{8} = 3\\) h."],
        answer: "3 hours",
      },
      practiceSet: [
        { prompt: "A boat makes 14 km/h downstream and 8 km/h upstream. Find the speed of the stream.", answer: "\\(\\frac{14 - 8}{2} = 3\\) km/h" },
        { prompt: "A swimmer swims at 4 km/h in still water and the river flows at 1 km/h. How far does she go downstream in 2 hours?", answer: "\\(5 \\times 2 = 10\\) km" },
      ],
      pyqExampleId: "cad2ced7-d8f0-4b9d-b23a-a2c7bfa6359a",
      traps: [
        {
          title: "Taking the stream as the slower speed",
          body: "Upstream is the slower trip, \\(b - s\\). If you write \\(b + s\\) for upstream, the time difference comes out negative.",
        },
      ],
    },
  ],
};
