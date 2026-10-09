import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_NUR_RATIO_NOTE: SubtopicNote = {
  subtopicName: "Ratio, Proportion and Rates",
  title: "Ratio, Proportion, Speed and Work",
  oneLineDefinition:
    "Share in parts, scale with the unit method, decide whether two quantities grow together or one shrinks as the other grows, and add rates rather than times.",
  whyItMatters:
    "Ratio sharing, best-value comparisons and journeys appear in most Cambridge papers: trains through tunnels, boats meeting on a crossing, average speeds and how many workers a job needs.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-nur-ratio-share",
      name: "Sharing a quantity in a given ratio",
      intuition:
        "A ratio such as 2 : 3 : 7 says how many equal parts each share gets. Add the parts to find how many there are in total, find the size of one part, then multiply. Two ratios that share a quantity can be joined into one by scaling them so the shared quantity has the same number in both.",
      definition:
        "- In the ratio \\(a : b\\), the first share is \\(\\dfrac{a}{a + b}\\) of the total, **not** \\(\\dfrac{a}{b}\\).\n" +
        "- **Method**: total parts, then the value of one part, then each share.\n" +
        "- **Combining ratios**: if \\(a : b = 2 : 3\\) and \\(b : c = 4 : 5\\), scale both so \\(b\\) matches: \\(8 : 12\\) and \\(12 : 15\\), so \\(a : b : c = 8 : 12 : 15\\).\n" +
        "- If you know one share, find one part from it and scale up to the rest.",
      formula: {
        label: "Share in a ratio",
        latex: "\\text{share}_i = \\text{total} \\times \\frac{r_i}{r_1 + r_2 + \\dots}",
        symbols: [{ symbol: "\\(r_i\\)", meaning: "the number of parts for share \\(i\\)" }],
      },
      authoredExample: {
        prompt: "Three partners share a profit of €840 in the ratio 2 : 3 : 7. How much does each receive?",
        steps: [
          "Total parts: \\(2 + 3 + 7 = 12\\).",
          "One part: \\(840 / 12 = 70\\).",
          "Shares: \\(2 \\times 70 = 140\\), \\(3 \\times 70 = 210\\), \\(7 \\times 70 = 490\\). Check: \\(140 + 210 + 490 = 840\\).",
        ],
        answer: "€140, €210 and €490",
      },
      selfCheckExample: {
        prompt:
          "A drink is made by mixing juice and water in the ratio 2 : 5. How much juice is there in 1.4 litres of the drink?",
        options: ["0.56 litres", "0.28 litres", "1.0 litre", "0.7 litres", "0.4 litres"],
        steps: [
          "Total parts: \\(2 + 5 = 7\\), so juice is \\(\\dfrac{2}{7}\\) of the drink.",
          "\\(1.4 \\times \\dfrac{2}{7} = 0.4\\) litres.",
          "Option A treats juice as \\(\\dfrac{2}{5}\\) of the drink. Option C is the water.",
        ],
        answer: "(E) 0.4 litres",
      },
      practiceSet: [
        { prompt: "Split 90 in the ratio 4 : 5.", answer: "40 and 50", method: "9 parts of 10" },
        { prompt: "If \\(a : b = 3 : 4\\) and \\(b : c = 2 : 5\\), find \\(a : c\\).", answer: "3 : 10", method: "Write \\(b : c\\) as \\(4 : 10\\)" },
        { prompt: "Boys and girls in a class are in the ratio 5 : 4, and there are 12 girls. How many students are in the class?", answer: "27", method: "One part is 3 students; 9 parts" },
      ],
      traps: [
        {
          title: "2 : 5 means 2 parts out of 7",
          body: "In a 2 : 5 mixture, the first ingredient is \\(\\dfrac{2}{7}\\) of the total. Using \\(\\dfrac{2}{5}\\) compares one ingredient with the other, not with the whole mixture.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-proportion",
      name: "Direct and inverse proportion, and value for money",
      intuition:
        "Ask one question first: if one quantity doubles, does the other double or halve? Twice as many kilograms cost twice as much (direct). Twice as many workers finish in half the time (inverse). For direct proportion find the value for one unit; for inverse proportion keep the product fixed. Value for money is direct proportion: compare the price of one common unit.",
      definition:
        "- **Direct proportion**: \\(y = kx\\). The ratio \\(y/x\\) stays the same. Use the **unit method**: find the value for 1, then scale.\n" +
        "- **Inverse proportion**: \\(y = k/x\\). The product \\(xy\\) stays the same (for example worker-hours or pump-hours).\n" +
        "- **Best value**: convert every offer to the price of the same amount (per kg, per litre, per wash) before comparing. A bigger pack is not automatically cheaper.",
      formula: {
        label: "Direct and inverse proportion",
        latex: "\\text{direct: } \\frac{y_1}{x_1} = \\frac{y_2}{x_2} \\qquad \\text{inverse: } x_1 y_1 = x_2 y_2",
        symbols: [
          { symbol: "\\(x, y\\)", meaning: "the two related quantities, before (1) and after (2)" },
        ],
      },
      authoredExample: {
        prompt:
          "Six identical pumps empty a pool in 10 hours. How long would four pumps take? In the same town, 5 kg of rice costs €7.50. What do 8 kg cost?",
        steps: [
          "Pumps: fewer pumps take longer, so this is inverse proportion. The job needs \\(6 \\times 10 = 60\\) pump-hours, so four pumps take \\(60 / 4 = 15\\) hours.",
          "Rice: direct proportion. One kilogram costs \\(7.50 / 5 = 1.50\\), so 8 kg cost \\(8 \\times 1.50 = 12\\) euros.",
        ],
        answer: "15 hours; €12.00",
      },
      selfCheckExample: {
        prompt: "Which of these packs of rice is the best value for money?",
        options: ["750 g for €1.35", "500 g for €1.10", "1 kg for €2.00", "2 kg for €3.80", "5 kg for €9.75"],
        steps: [
          "Price per kilogram: 750 g gives \\(1.35 / 0.75 = 1.80\\); 500 g gives 2.20; 1 kg gives 2.00; 2 kg gives 1.90; 5 kg gives 1.95.",
          "The lowest price per kilogram is €1.80, the 750 g pack.",
          "Option E, the largest pack, is tempting but costs more per kilogram than options A and D.",
        ],
        answer: "(A) 750 g for €1.35",
      },
      practiceSet: [
        { prompt: "Four workers build a wall in 9 days. How long would six workers take at the same rate?", answer: "6 days", method: "36 worker-days shared by 6" },
        { prompt: "A car uses 6 litres of fuel per 100 km. How much does it use for 350 km?", answer: "21 litres", method: "\\(6 \\times 3.5\\)" },
        { prompt: "A recipe for 4 people uses 300 g of flour. How much flour is needed for 10 people?", answer: "750 g", method: "75 g per person" },
      ],
      traps: [
        {
          title: "More workers means less time",
          body: "Workers and time are in inverse proportion. Scaling the time up with the number of workers (more workers, longer job) is the wrong kind of proportion. Check by asking what happens if the number of workers doubles.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-speed",
      name: "Speed, distance and time, and average speed",
      intuition:
        "Speed is distance per unit time, so any one of the three follows from the other two. Average speed for a whole journey is the total distance divided by the total time. If you spend longer at the slow speed, the average is pulled towards the slow speed, so it is not the simple mean of the two speeds. When two things move towards each other, the gap closes at the sum of their speeds.",
      definition:
        "- \\(v = \\dfrac{d}{t}\\), \\(d = vt\\), \\(t = \\dfrac{d}{v}\\). Keep units consistent: km with hours, m with seconds.\n" +
        "- \\(1\\ \\text{m/s} = 3.6\\ \\text{km/h}\\).\n" +
        "- **Average speed** = total distance ÷ total time, including stops.\n" +
        "- **Relative speed**: moving towards each other, the gap closes at \\(v_1 + v_2\\); moving the same way, at \\(v_1 - v_2\\).",
      formula: {
        label: "Speed and average speed",
        latex: "v = \\frac{d}{t} \\qquad \\bar{v} = \\frac{d_{\\text{total}}}{t_{\\text{total}}}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance" },
          { symbol: "\\(t\\)", meaning: "time taken" },
          { symbol: "\\(\\bar{v}\\)", meaning: "average speed for the whole journey" },
        ],
      },
      authoredExample: {
        prompt:
          "A cyclist rides 30 km at 20 km/h and then another 30 km at 12 km/h. What is the average speed for the whole ride?",
        steps: [
          "Time for the first part: \\(30 / 20 = 1.5\\) h. Time for the second part: \\(30 / 12 = 2.5\\) h.",
          "Total: 60 km in 4 h, so the average speed is \\(60 / 4 = 15\\) km/h.",
          "The mean of 20 and 12 is 16 km/h, which is wrong: the cyclist spends longer at the slower speed.",
        ],
        answer: "15 km/h",
      },
      selfCheckExample: {
        prompt:
          "Two trains leave at the same moment from towns 210 km apart and travel towards each other at 80 km/h and 60 km/h. How long after leaving do they meet?",
        options: ["1 h 15 min", "1 h 50 min", "3 h 30 min", "1 h 30 min", "10 h 30 min"],
        steps: [
          "The gap closes at \\(80 + 60 = 140\\) km/h.",
          "Time: \\(210 / 140 = 1.5\\) h, which is 1 h 30 min.",
          "Option B reads 1.5 h as 1 h 50 min. Option C uses only the slower train. Option E uses the difference of the speeds, which is for trains moving the same way.",
        ],
        answer: "(D) 1 h 30 min",
      },
      practiceSet: [
        { prompt: "How many minutes does it take to walk 6 km at 4.5 km/h?", answer: "80 minutes", method: "\\(6 / 4.5 = 1.33\\) h" },
        { prompt: "Convert 54 km/h into m/s.", answer: "15 m/s", method: "Divide by 3.6" },
        { prompt: "A runner covers 400 m in 80 s and then another 400 m in 120 s. What is the average speed?", answer: "4 m/s", method: "800 m in 200 s" },
        { prompt: "A car at 90 km/h follows a lorry at 75 km/h on the same road. How long does the car take to gain 500 m?", answer: "2 minutes", method: "Relative speed 15 km/h; \\(0.5 / 15\\) h" },
      ],
      traps: [
        {
          title: "Average speed is not the average of the speeds",
          body: "Equal distances at 20 and 12 km/h give an average of 15 km/h, not 16. Only equal TIMES at each speed give the simple mean. Always divide the total distance by the total time.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-nur-work-rate",
      name: "Work and flow rates: adding rates, not times",
      intuition:
        "If a tap fills a tank in 6 hours, it fills one sixth of the tank each hour. That fraction per hour is its rate. Two taps working together add their rates, and a drain subtracts its rate. Once you have the combined rate, the time is one whole job divided by that rate.",
      definition:
        "- **Rate** of a worker, tap or machine = (one job) ÷ (time it takes alone).\n" +
        "- Working together, **rates add**; something working against the job (a drain, a leak) has a negative rate.\n" +
        "- Time together = \\(\\dfrac{1}{\\text{combined rate}}\\). It is always **shorter** than the fastest worker's time alone.\n" +
        "- Flow problems with volumes work the same way: litres per minute add.",
      formula: {
        label: "Two workers together",
        latex: "\\frac{1}{T} = \\frac{1}{t_1} + \\frac{1}{t_2}",
        symbols: [
          { symbol: "\\(t_1, t_2\\)", meaning: "time each one needs alone" },
          { symbol: "\\(T\\)", meaning: "time needed working together" },
        ],
      },
      authoredExample: {
        prompt:
          "Tap A fills a tank in 6 hours and tap B fills it in 3 hours. How long do they take together? How long if a drain that would empty the full tank in 4 hours is also open?",
        steps: [
          "Rates: A fills \\(\\dfrac{1}{6}\\) of the tank per hour, B fills \\(\\dfrac{1}{3}\\).",
          "Together: \\(\\dfrac{1}{6} + \\dfrac{1}{3} = \\dfrac{1}{2}\\) per hour, so the tank fills in 2 hours.",
          "With the drain: \\(\\dfrac{1}{2} - \\dfrac{1}{4} = \\dfrac{1}{4}\\) per hour, so it takes 4 hours.",
        ],
        answer: "2 hours; 4 hours with the drain open",
      },
      selfCheckExample: {
        prompt:
          "One printer prints a batch of leaflets in 15 minutes. A second printer prints the same batch in 10 minutes. How long do the two printers take working together?",
        options: ["12.5 min", "25 min", "6 min", "5 min", "8 min"],
        steps: [
          "Rates: \\(\\dfrac{1}{15} + \\dfrac{1}{10} = \\dfrac{2}{30} + \\dfrac{3}{30} = \\dfrac{5}{30} = \\dfrac{1}{6}\\) of the batch per minute.",
          "Time: 6 minutes.",
          "Option A averages the two times and option B adds them; both are longer than the faster printer alone, which cannot be right.",
        ],
        answer: "(C) 6 min",
      },
      practiceSet: [
        { prompt: "A pipe delivers 12 litres per minute. How long does it take to fill a 300-litre tank?", answer: "25 minutes", method: "\\(300 / 12\\)" },
        { prompt: "Ann paints a room in 4 hours and Bo paints it in 6 hours. How long do they take together?", answer: "2 h 24 min", method: "\\(\\dfrac{1}{4} + \\dfrac{1}{6} = \\dfrac{5}{12}\\), so \\(\\dfrac{12}{5} = 2.4\\) h" },
        { prompt: "A bath fills in 10 minutes and drains in 15 minutes. With the tap and the plughole both open, how long does it take to fill?", answer: "30 minutes", method: "\\(\\dfrac{1}{10} - \\dfrac{1}{15} = \\dfrac{1}{30}\\)" },
      ],
      traps: [
        {
          title: "Rates add; times do not",
          body: "Two printers taking 15 and 10 minutes do not take 25 minutes, or 12.5 minutes, together. Together they must be faster than the faster one alone. Add the fractions of the job done per minute, then invert.",
        },
      ],
    },
  ],
};
