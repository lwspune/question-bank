import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_AVERAGE_NOTE: SubtopicNote = {
  subtopicName: "Average Speed",
  title: "Average Speed",
  oneLineDefinition:
    "Average speed is the whole distance divided by the whole time, which is not the plain average of the speeds unless each speed was kept for the same time.",
  whyItMatters:
    "Seventeen questions in the bank, eleven EASY and six MODERATE, seven of them from the 2025 shifts. Most are a journey in parts at different speeds; the rest have equal distances, where a one-line formula replaces the table of times.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdav-total",
      name: "Average speed of a journey in parts",
      intuition:
        "A car that drives 1 hour at 40 km/h and then 1 hour at 80 km/h covers 120 km in 2 hours, so its average is 60 km/h. A car that drives 40 km at 40 km/h and then 40 km at 80 km/h spends longer on the slow part, 1 hour against half an hour, so its average is lower: 80 km in 1.5 hours is about 53.3 km/h. The time spent at each speed decides the average.",
      definition:
        "- **Average speed = total distance ÷ total time.** Find each part's time, or each part's distance, then add.\n" +
        "- If the parts are given as **times**, the average is the time-weighted mean of the speeds. Equal times give the plain mean.\n" +
        "- If the parts are given as **fractions of the journey**, pick a total distance that every speed divides into, then add the times. The answer does not depend on the distance you pick.\n" +
        "- **Unknown part:** write total distance = average speed × total time as an equation and solve for the missing time or speed.\n" +
        "- A rest or a halt counts in the total time but adds no distance.",
      formula: {
        label: "Average speed",
        latex: "\\bar{s} = \\frac{d_1 + d_2 + d_3}{t_1 + t_2 + t_3} \\qquad \\bar{s} = \\frac{s_1t_1 + s_2t_2}{t_1 + t_2}",
        symbols: [
          { symbol: "\\(\\bar{s}\\)", meaning: "average speed for the whole journey" },
          { symbol: "\\(d_1, t_1\\)", meaning: "distance and time of the first part" },
          { symbol: "\\(s_1\\)", meaning: "speed during the first part" },
        ],
      },
      authoredExample: {
        prompt: "A van covers 90 km at 45 km/h and then 150 km at 60 km/h. What is its average speed for the whole trip?",
        steps: [
          "Times: \\(\\frac{90}{45} = 2\\) hours and \\(\\frac{150}{60} = 2.5\\) hours, so 4.5 hours in all.",
          "Distance: \\(90 + 150 = 240\\) km.",
          "Average speed \\(= \\frac{240}{4.5} = 53\\frac{1}{3}\\) km/h.",
        ],
        answer: "\\(53\\frac{1}{3}\\) km/h",
      },
      selfCheckExample: {
        prompt: "A man drives for 2 hours at 50 km/h and then walks at 5 km/h. How long must he walk so that his average speed for the whole trip is 30 km/h?",
        steps: [
          "Let him walk for \\(t\\) hours. Distance \\(= 100 + 5t\\); time \\(= 2 + t\\).",
          "\\(100 + 5t = 30(2 + t)\\) gives \\(40 = 25t\\), so \\(t = 1.6\\) hours.",
          "Check: 108 km in 3.6 hours is 30 km/h.",
        ],
        answer: "1 hour 36 minutes",
      },
      practiceSet: [
        {
          prompt: "A cyclist rides for 1 hour at 12 km/h and then for 2 hours at 15 km/h. What is his average speed?",
          answer: "14 km/h",
          method: "\\(\\frac{12 + 30}{3} = 14\\).",
        },
        {
          prompt: "A car covers 120 km in 2 hours, rests for 30 minutes, then covers 80 km in 1.5 hours. What is its average speed, including the rest?",
          answer: "50 km/h",
          method: "200 km in 4 hours.",
        },
        {
          prompt: "One third of a 90 km trip is driven at 30 km/h and the rest at 60 km/h. What is the average speed?",
          answer: "45 km/h",
          method: "30 km take 1 hour and 60 km take 1 hour: 90 km in 2 hours.",
        },
        {
          prompt: "A train runs for 3 hours at 80 km/h and then for 1 hour at 40 km/h. What is its average speed?",
          answer: "70 km/h",
          method: "\\(\\frac{240 + 40}{4} = 70\\).",
        },
      ],
      pyqExampleId: "64927d94-a58b-4c9f-8b57-2fdf71a26506",
      traps: [
        {
          title: "Averaging the speeds",
          body:
            "The mean of 40 and 80 is 60, but the average speed is 60 km/h only if equal TIMES were spent at each speed. For equal distances it is lower, because more time goes on the slower part.",
        },
        {
          title: "Leaving a halt out of the time",
          body:
            "A stop adds time and no distance, so it lowers the average speed. Include it in the total time unless the question asks for the speed while moving.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdav-equal",
      name: "Average speed over equal distances",
      intuition:
        "When each speed is kept for the same distance, the total distance and the total time can be written with the speeds alone, and the distance cancels. That is why these questions can be answered without ever knowing the distance.",
      definition:
        "- **Two equal distances** at speeds \\(a\\) and \\(b\\): average \\(= \\frac{2ab}{a + b}\\). A round trip, out at one speed and back at another, is this case.\n" +
        "- **Three equal distances** at \\(a\\), \\(b\\) and \\(c\\): average \\(= \\frac{3abc}{ab + bc + ca}\\).\n" +
        "- The answer always lies below the plain mean of the speeds, nearer the slower one.\n" +
        "- **Round trip with the total time given:** the one-way distance is the total time divided by \\(\\frac{1}{a} + \\frac{1}{b}\\).\n" +
        "- **Fast route:** take each distance as the LCM of the speeds, so every time is a whole number, and divide the total distance by the total time.\n" +
        "- **Limit:** both formulas need equal distances. Unequal distances go back to total distance over total time.",
      formula: {
        label: "Average speed over equal distances",
        latex: "\\bar{s} = \\frac{2ab}{a + b} \\qquad \\bar{s} = \\frac{3abc}{ab + bc + ca}",
        symbols: [{ symbol: "\\(a, b, c\\)", meaning: "the speeds, each kept for the same distance" }],
      },
      authoredExample: {
        prompt: "A courier rides to a depot at 36 km/h and returns along the same road at 54 km/h. What is his average speed for the round trip?",
        steps: [
          "Equal distances, so the average is \\(\\frac{2 \\times 36 \\times 54}{36 + 54} = 43.2\\) km/h.",
          "Check with the LCM: take the road as 108 km. Out takes 3 hours, back 2 hours, so 216 km in 5 hours is 43.2 km/h.",
        ],
        answer: "43.2 km/h",
      },
      selfCheckExample: {
        prompt: "A girl walks to school at 4 km/h and walks back at 6 km/h. The two walks take 1 hour 15 minutes in all. How far is the school?",
        steps: [
          "\\(\\frac{d}{4} + \\frac{d}{6} = 1.25\\), so \\(\\frac{5d}{12} = 1.25\\).",
          "\\(d = 3\\) km. Check: \\(\\frac{3}{4} + \\frac{3}{6} = 1.25\\) hours.",
        ],
        answer: "3 km",
      },
      practiceSet: [
        {
          prompt: "A car covers two equal distances at 28 km/h and 70 km/h. What is its average speed?",
          answer: "40 km/h",
          method: "\\(\\frac{2 \\times 28 \\times 70}{98} = 40\\).",
        },
        {
          prompt: "A bus covers three equal stretches at 15, 20 and 60 km/h. What is its average speed?",
          answer: "22.5 km/h",
          method: "Take each stretch as 60 km: times 4, 3 and 1 hours, so 180 km in 8 hours.",
        },
        {
          prompt: "Is the average speed over equal distances at 50 km/h and 70 km/h more or less than 60 km/h?",
          answer: "Less: about 58.3 km/h",
          method: "\\(\\frac{2 \\times 50 \\times 70}{120} = 58\\frac{1}{3}\\).",
        },
        {
          prompt: "A man cycles to a market at 12 km/h and walks back at 4 km/h, taking 2 hours in all. How far is the market?",
          answer: "6 km",
          method: "\\(\\frac{d}{12} + \\frac{d}{4} = \\frac{d}{3} = 2\\).",
        },
      ],
      pyqExampleId: "6a31677e-c4aa-43f8-ac64-1b211c24a909",
      traps: [
        {
          title: "Using 2ab/(a + b) when the times are equal",
          body:
            "The formula is for equal distances. When equal times are spent at each speed, the average speed is the plain mean (a + b) ÷ 2.",
        },
        {
          title: "Taking the average speed as the one-way distance",
          body:
            "With a total time given, 2ab/(a + b) gives a speed. The whole round trip is that speed times the total time, and the one-way distance is half of it.",
        },
      ],
    },
  ],
};
