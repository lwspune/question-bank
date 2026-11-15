import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TD_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Speed, Time and Distance Basics",
  title: "Speed, Time and Distance Basics",
  oneLineDefinition:
    "Distance is speed times time; change units with 5/18, set up an equation when a speed changes, take average speed as total distance over total time, and add or subtract a stream's speed for a boat.",
  whyItMatters:
    "12 questions in the Tier II bank, 7 EASY and 5 MODERATE. The MODERATE ones compare two journeys at different speeds, which means one equation in times.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tdba-basics",
      name: "Speed, time, distance and units",
      intuition:
        "Distance is speed times time, so any one of the three follows from the other two. Most slips come from mixed units, so change everything to km and hours, or to metres and seconds, before you start.",
      definition:
        "- Distance \\(=\\) speed \\(\\times\\) time.\n" +
        "- km/h to m/s: multiply by \\(\\frac{5}{18}\\). m/s to km/h: multiply by \\(\\frac{18}{5}\\).\n" +
        "- A speed change that saves or costs a fixed time: \\(\\frac{d}{v - x} - \\frac{d}{v} = t\\); try the options rather than solving the quadratic.\n" +
        "- Two travellers compared twice (A takes 2 hours more than B, then A doubles speed): write two time equations and subtract.",
      formula: {
        label: "Distance and units",
        latex: "d = v \\times t, \\quad 1\\ \\text{km/h} = \\frac{5}{18}\\ \\text{m/s}",
      },
      authoredExample: {
        prompt: "A car covers 300 km at a steady speed. Had it gone 10 km/h faster, it would have taken 1 hour less. Find its speed.",
        steps: ["\\(\\frac{300}{v} - \\frac{300}{v + 10} = 1\\), so \\(v(v + 10) = 3000\\).", "\\(v = 50\\): at 50 km/h the trip takes 6 h, at 60 km/h 5 h."],
        answer: "50 km/h",
      },
      selfCheckExample: {
        prompt: "A cyclist must ride 120 km in 8 hours. After covering half the distance in two thirds of the time, what speed does she need for the rest?",
        steps: ["She has 60 km left and \\(\\frac{8}{3}\\) hours left.", "Speed \\(= 60 \\div \\frac{8}{3} = 22.5\\) km/h."],
        answer: "22.5 km/h",
      },
      practiceSet: [
        { prompt: "Change 90 km/h into metres per second.", answer: "25 m/s" },
        { prompt: "A runner goes at 6 m/s. How far does he go in 20 minutes, in km?", answer: "7.2 km" },
        { prompt: "How long does a bus at 54 km/h take to cover 36 km?", answer: "40 minutes" },
      ],
      pyqExampleId: "d084dfde-1c8a-434d-bf0f-89d753c8998c",
      traps: [
        {
          title: "Mixing kilometres per hour with metres and seconds",
          body: "Before dividing metres by a speed, change the speed to m/s. 72 km/h is 20 m/s; using 72 against metres gives a time 3.6 times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tdba-average",
      name: "Average speed",
      intuition:
        "Average speed is all the distance travelled over all the time taken. A slow stretch takes longer, so it pulls the average down more than a fast stretch pushes it up, and the average is never the plain mean of the speeds.",
      definition:
        "- Average speed \\(= \\frac{\\text{total distance}}{\\text{total time}}\\).\n" +
        "- Equal distances at speeds a and b: \\(\\frac{2ab}{a + b}\\).\n" +
        "- Parts of a journey in a ratio: take the distances as that many units, find each time, then add.\n" +
        "- Two people over the same distance with a known sum of speeds and total time: \\(\\frac{d}{x} + \\frac{d}{y} = T\\) gives the product xy.",
      formula: {
        label: "Average speed",
        latex: "\\bar{v} = \\frac{\\text{total distance}}{\\text{total time}}, \\quad \\bar{v} = \\frac{2ab}{a + b} \\text{ for equal distances}",
      },
      authoredExample: {
        prompt: "A man drives 60 km at 30 km/h and then 90 km at 45 km/h. Find his average speed.",
        steps: ["Times: 2 hours and 2 hours.", "Average \\(= \\frac{150}{4} = 37.5\\) km/h."],
        answer: "37.5 km/h",
      },
      selfCheckExample: {
        prompt: "A boy walks to school at 4 km/h and cycles back at 12 km/h along the same road. Find his average speed for the round trip.",
        steps: ["Equal distances: \\(\\frac{2 \\times 4 \\times 12}{4 + 12}\\).", "\\(= 6\\) km/h."],
        answer: "6 km/h",
      },
      practiceSet: [
        { prompt: "A train runs at 60 km/h for 2 hours and at 80 km/h for 3 hours. Find its average speed.", answer: "72 km/h" },
        { prompt: "Half of a journey is made at 20 km/h and half at 30 km/h. Find the average speed.", answer: "24 km/h" },
        { prompt: "A trip of 240 km takes 5 hours. The first 100 km take 2 hours. Find the speed for the rest.", answer: "\\(46\\frac{2}{3}\\) km/h" },
      ],
      pyqExampleId: "d07c826b-3cf1-43c8-89ba-45166367ab01",
      traps: [
        {
          title: "Averaging the two speeds",
          body: "Equal distances at 4 and 12 km/h average 6 km/h, not 8. The slow half takes three times as long, so it counts for more.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tdba-boats",
      name: "Boats, streams and races",
      intuition:
        "A stream adds its speed to a boat going with it and takes it away from a boat going against it. In a race with a head start, compare the distance and time each runner actually covers.",
      definition:
        "- Downstream speed \\(= b + s\\); upstream speed \\(= b - s\\).\n" +
        "- So \\(b = \\frac{\\text{down} + \\text{up}}{2}\\) and \\(s = \\frac{\\text{down} - \\text{up}}{2}\\).\n" +
        "- A round trip of d each way: \\(\\frac{d}{b + s} + \\frac{d}{b - s} = T\\).\n" +
        "- A start of m metres: the other runner covers m metres less; 'beats by t seconds' means the loser takes t seconds more.",
      formula: {
        label: "Boat and stream",
        latex: "b = \\frac{\\text{downstream} + \\text{upstream}}{2}, \\quad s = \\frac{\\text{downstream} - \\text{upstream}}{2}",
      },
      authoredExample: {
        prompt: "A boat goes 48 km downstream in 3 hours and comes back in 6 hours. What are the boat's own speed and the current's speed?",
        steps: ["Downstream 16 km/h, upstream 8 km/h.", "Boat \\(= 12\\) km/h, stream \\(= 4\\) km/h."],
        answer: "12 km/h and 4 km/h",
      },
      selfCheckExample: {
        prompt: "A rower moves at 8 km/h in still water. The river flows at 2 km/h, and a round trip takes 4 hours. How far away is the turning point?",
        steps: ["\\(\\frac{d}{10} + \\frac{d}{6} = 4\\), so \\(\\frac{8d}{30} = 4\\).", "\\(d = 15\\) km."],
        answer: "15 km",
      },
      practiceSet: [
        { prompt: "Downstream speed 18 km/h and upstream speed 12 km/h: find the stream's speed.", answer: "3 km/h" },
        { prompt: "A boat at 10 km/h in still water goes upstream against a 4 km/h current. How long does 30 km take?", answer: "5 hours" },
        { prompt: "In a 100 m race, A runs 100 m in 20 s while B, given a 10 m start, runs 90 m in 22.5 s. Who wins, and by how many seconds?", answer: "A, by 2.5 s" },
      ],
      pyqExampleId: "9a1971a9-dc0d-4fb6-bb44-de54696e61ba",
      traps: [
        {
          title: "Averaging the round-trip speeds for a boat",
          body: "Going 15 km down at 10 km/h and back at 6 km/h averages 7.5 km/h, not 8. Work out each leg's time separately.",
        },
      ],
    },
  ],
};
