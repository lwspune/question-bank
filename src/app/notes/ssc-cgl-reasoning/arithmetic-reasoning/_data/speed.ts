import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAR_SPEED_NOTE: SubtopicNote = {
  subtopicName: "Speed, Time and Work",
  title: "Speed, Time and Work",
  oneLineDefinition:
    "Speed is distance over time in matching units, a stream adds to or takes from a boat's speed, and a job's total work (workers times time) stays the same however it is shared.",
  whyItMatters:
    "Eleven questions in the bank, all EASY and all from the 2025 shifts. Five are about speed, trains or an average speed, two about a boat in a stream, and four about machines, taps, pipes or cats sharing one job.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrarsp-trains",
      name: "Speed, trains and average speed",
      intuition:
        "Every question here is speed equals distance over time, once the units match. A train is the one twist: to pass something it must cover its own length, plus the length of whatever it passes.",
      definition:
        "- **Speed \\(=\\) distance \\(\\div\\) time.** Put distance and time in matching units first: 45 minutes is \\(\\frac{3}{4}\\) hour.\n" +
        "- **Units:** km/h to m/s, multiply by \\(\\frac{5}{18}\\); m/s to km/h, multiply by \\(\\frac{18}{5}\\).\n" +
        "- **A train passing a pole, a man or a point** covers its own length. **Passing a platform or a bridge,** it covers its length plus the platform's.\n" +
        "- **Average speed \\(=\\) total distance \\(\\div\\) total time.** Never the average of the two speeds unless the two times are equal.\n" +
        "- **Shortcut for two equal distances** at speeds a and b: \\(\\frac{2ab}{a + b}\\). It is only for equal distances; for equal times the average speed is \\(\\frac{a + b}{2}\\).",
      formula: {
        label: "Speed, units and average speed",
        latex: "v = \\frac{d}{t} \\qquad 1\\ \\text{km/h} = \\frac{5}{18}\\ \\text{m/s} \\qquad \\bar{v} = \\frac{2ab}{a + b}",
        symbols: [
          { symbol: "d, t", meaning: "distance and time" },
          { symbol: "a, b", meaning: "the speeds over two equal distances" },
        ],
      },
      authoredExample: {
        prompt: "A train 240 m long runs at 54 km/h. How long does it take to cross a platform 210 m long?",
        steps: [
          "Speed: \\(54 \\times \\frac{5}{18} = 15\\) m/s.",
          "Distance: train plus platform \\(= 240 + 210 = 450\\) m.",
          "Time \\(= 450 \\div 15 = 30\\) seconds.",
        ],
        answer: "30 seconds",
      },
      selfCheckExample: {
        prompt: "A cyclist rides to a shop at 15 km/h and back the same way at 10 km/h. What is the average speed for the whole trip?",
        steps: [
          "Equal distances, so \\(\\frac{2 \\times 15 \\times 10}{15 + 10} = \\frac{300}{25} = 12\\) km/h.",
          "Check with a 30 km road: 2 hours there, 3 hours back, 60 km in 5 hours is 12 km/h.",
        ],
        answer: "12 km/h",
      },
      practiceSet: [
        { prompt: "Convert 108 km/h to m/s.", answer: "30 m/s" },
        { prompt: "A train 200 m long passes a pole in 8 seconds. What is its speed in km/h?", answer: "90 km/h", method: "25 m/s." },
        { prompt: "A car covers 50 km in 40 minutes. What is its speed in km/h?", answer: "75 km/h" },
        { prompt: "A bus covers 60 km in the first hour and 40 km in the second hour. What is its average speed?", answer: "50 km/h" },
      ],
      pyqExampleId: "d113ba7e-fa1f-472e-bca4-6e8bebf137a3",
      traps: [
        {
          title: "Using the equal-distance shortcut for equal times",
          body:
            "\\(\\frac{2ab}{a + b}\\) is for two equal distances. If the two parts take equal times, the average speed is the simple average \\(\\frac{a + b}{2}\\).",
        },
        {
          title: "Forgetting the platform's length",
          body:
            "A train crossing a platform has crossed it only when its last coach leaves the far end, so the distance is the train's length plus the platform's.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarsp-boats",
      name: "Boats and streams",
      intuition:
        "Going with the stream, the water carries the boat along; going against it, the water holds it back. The two speeds sit an equal distance above and below the boat's own speed.",
      definition:
        "- **Downstream speed \\(=\\) boat \\(+\\) stream. Upstream speed \\(=\\) boat \\(-\\) stream.**\n" +
        "- So the boat's speed in still water is half the sum of the two, and the stream's speed is half their difference.\n" +
        "- First turn each trip into a speed (distance \\(\\div\\) time), then use the half-sum and half-difference.",
      formula: {
        label: "Boat and stream from the two speeds",
        latex: "b = \\frac{d + u}{2} \\qquad s = \\frac{d - u}{2}",
        symbols: [
          { symbol: "d", meaning: "the downstream speed" },
          { symbol: "u", meaning: "the upstream speed" },
          { symbol: "b, s", meaning: "the speeds of the boat in still water and of the stream" },
        ],
      },
      authoredExample: {
        prompt: "A boat goes 75 km downstream in 5 hours and 28 km upstream in 4 hours. Find its speed in still water and the speed of the stream.",
        steps: [
          "Downstream speed \\(= 75 \\div 5 = 15\\) km/h; upstream speed \\(= 28 \\div 4 = 7\\) km/h.",
          "Boat \\(= \\frac{15 + 7}{2} = 11\\) km/h; stream \\(= \\frac{15 - 7}{2} = 4\\) km/h.",
          "Check: \\(11 + 4 = 15\\) and \\(11 - 4 = 7\\).",
        ],
        answer: "Boat 11 km/h, stream 4 km/h",
      },
      selfCheckExample: {
        prompt: "A man rows at 9 km/h in still water and the stream flows at 2 km/h. How long does he take to row 28 km upstream?",
        steps: ["Upstream speed \\(= 9 - 2 = 7\\) km/h.", "Time \\(= 28 \\div 7 = 4\\) hours."],
        answer: "4 hours",
      },
      practiceSet: [
        { prompt: "A boat's downstream speed is 14 km/h and its upstream speed is 10 km/h. What is the speed of the stream?", answer: "2 km/h" },
        { prompt: "A boat moves at 15 km/h in still water and the stream flows at 3 km/h. What is its downstream speed?", answer: "18 km/h" },
        { prompt: "A boat's downstream speed is 22 km/h and its upstream speed is 14 km/h. What is its speed in still water?", answer: "18 km/h" },
        {
          prompt: "A boat covers 48 km downstream in 4 hours. The stream flows at 5 km/h. What is the boat's speed in still water?",
          answer: "7 km/h",
          method: "Downstream 12 km/h, minus 5.",
        },
      ],
      pyqExampleId: "96d29f05-abee-47a2-9c07-b0d71ec36ec5",
      traps: [
        {
          title: "Swapping the boat and the stream",
          body:
            "Half the sum of the two speeds is the boat's speed in still water; half the difference is the stream's. The stream is almost always the smaller number.",
        },
        {
          title: "Averaging distances instead of speeds",
          body:
            "When the two trips have different distances, first divide each distance by its time. The half-sum rule works on speeds only.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarsp-work",
      name: "Work, taps and pipes",
      intuition:
        "A job needs a fixed amount of work, counted as workers times time (machine-days, tap-minutes). More workers share it and finish sooner. A pipe that empties the tank works against the ones that fill it.",
      definition:
        "- **Total work \\(=\\) workers \\(\\times\\) time.** For the same job at the same rate, \\(W_1 T_1 = W_2 T_2\\): double the workers, half the time.\n" +
        "- **A bigger or smaller job:** first find what one worker does in one unit of time, then scale. This is how \"5 cats catch 5 mice in 5 minutes\" works: one cat catches one mouse in 5 minutes.\n" +
        "- **Pipes (fast route):** call the tank the LCM of the times, in units. Each pipe fills (or empties) a whole number of units an hour. Add the fillers, subtract the emptiers, divide the tank by the net rate.\n" +
        "- The workers-times-time rule assumes everyone works at the same rate. If the rates differ, use units per hour for each.",
      formula: {
        label: "Same job, and pipes working together",
        latex: "W_1 T_1 = W_2 T_2 \\qquad \\frac{1}{T} = \\frac{1}{a} - \\frac{1}{b}",
        symbols: [
          { symbol: "W, T", meaning: "number of workers and time taken" },
          { symbol: "a", meaning: "time for the filling pipe alone" },
          { symbol: "b", meaning: "time for the emptying pipe alone" },
        ],
      },
      authoredExample: {
        prompt: "A pipe fills a tank in 9 hours and a drain empties it in 12 hours. If both are open, how long does the empty tank take to fill?",
        steps: [
          "Fast route: call the tank 36 units (the LCM of 9 and 12). The pipe adds 4 units an hour and the drain takes away 3.",
          "Net: \\(4 - 3 = 1\\) unit an hour, so \\(36 \\div 1 = 36\\) hours.",
          "Check with fractions: \\(\\frac{1}{9} - \\frac{1}{12} = \\frac{4 - 3}{36} = \\frac{1}{36}\\) of the tank an hour.",
        ],
        answer: "36 hours",
      },
      selfCheckExample: {
        prompt: "8 workers build a wall in 9 days. How many days would 12 workers take?",
        steps: ["Total work \\(= 8 \\times 9 = 72\\) worker-days.", "\\(72 \\div 12 = 6\\) days."],
        answer: "6 days",
      },
      practiceSet: [
        { prompt: "5 pumps empty a pool in 12 hours. How long do 3 pumps take?", answer: "20 hours" },
        { prompt: "Two taps fill a tank in 12 minutes and 24 minutes. How long do they take together?", answer: "8 minutes", method: "Tank 24 units: 2 + 1 a minute." },
        {
          prompt: "3 printers print 300 pages in 3 minutes. How many pages do 6 printers print in 6 minutes?",
          answer: "1200",
          method: "One printer prints 100 pages in 3 minutes.",
        },
        { prompt: "12 men finish a job in 20 days. How many men are needed to finish it in 16 days?", answer: "15" },
      ],
      pyqExampleId: "1aa7fc63-839f-40ef-8ff6-50f80da7fa8e",
      traps: [
        {
          title: "Treating workers and time as direct",
          body:
            "More workers means fewer days, not more. If 4 machines take 12 days, 8 machines take 6 days.",
        },
        {
          title: "Adding the emptying pipe",
          body:
            "An outlet takes water away, so its rate is subtracted from the inlet's. Adding it gives a time that is far too short.",
        },
      ],
    },
  ],
};
