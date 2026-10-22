import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_AVERAGE_NOTE: SubtopicNote = {
  subtopicName: "Average Speed",
  title: "Average Speed: Total Distance over Total Time",
  oneLineDefinition:
    "Average speed is the whole distance divided by the whole time, with quick forms for equal distances and equal times, fractions of a journey, and stoppages.",
  whyItMatters:
    "This is one of the biggest pages in the chapter and most of it is EASY, so marks are lost to one habit: taking the mean of the speeds. That is right only when the times are equal. Over equal distances the true average is lower, and the options are built on that gap.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-total-over-total",
      name: "Total distance over total time",
      intuition:
        "Average speed is not the average of the speeds. It is the one steady speed that would cover the whole distance in the whole time.",
      definition:
        "- \\(\\text{average speed} = \\dfrac{\\text{total distance}}{\\text{total time}}\\).\n" +
        "- Given each part's distance and speed: work out each part's time first, then add.\n" +
        "- Given each part's distance and time: add the distances, add the times, divide.\n" +
        "- Times in minutes: add the minutes, then change the total to hours.",
      formula: {
        label: "Average speed",
        latex: "\\bar v = \\dfrac{d_1 + d_2 + \\dots}{t_1 + t_2 + \\dots}",
      },
      authoredExample: {
        prompt: "A car goes 120 km at 60 km/h and then 60 km at 20 km/h. Find its average speed.",
        steps: [
          "Times: \\(120 \\div 60 = 2\\) h and \\(60 \\div 20 = 3\\) h, so 5 h in all.",
          "Distance: \\(120 + 60 = 180\\) km.",
          "\\(\\bar v = 180 \\div 5 = 36\\) km/h. The mean of 60 and 20 would be 40, which is wrong.",
        ],
        answer: "36 km/h.",
      },
      selfCheckExample: {
        prompt: "A runner covers 4 km in 20 minutes and then 6 km in 40 minutes. Find his average speed in km/h.",
        steps: ["10 km in 60 minutes, that is 1 hour."],
        answer: "10 km/h.",
      },
      practiceSet: [
        { prompt: "A bus goes 90 km at 30 km/h and then 120 km at 60 km/h. Find its average speed.", answer: "42 km/h" },
        {
          prompt: "A ship sails 100 nautical miles in 5 h and then 140 nautical miles in 7 h. Find its average speed in nautical miles per hour.",
          answer: "20",
        },
        { prompt: "A cyclist rides 12 km in 40 minutes and then 8 km in 20 minutes. Find his average speed in km/h.", answer: "20 km/h" },
        {
          prompt: "A walker covers 2 km at 4 km/h and then 6 km at 6 km/h. Find the average speed.",
          answer: "\\(5\\tfrac13\\) km/h",
          method: "\\(8 \\div 1.5\\).",
        },
      ],
      pyqExampleId: "a53cad2a-fa47-4e33-bdd9-1f4b9d3dd546",
      traps: [
        {
          title: "Do not average the speeds",
          body: "120 km at 60 km/h and 60 km at 20 km/h is 180 km in 5 h, 36 km/h. The mean of the two speeds, 40, counts the slow part as if it lasted no longer than the fast one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-given-times",
      name: "Speeds held for given times",
      intuition:
        "When each speed is kept up for a stated time, each part's distance is speed times time. With equal times, the average is simply the mean of the speeds.",
      definition:
        "- Each part: \\(d = v \\times t\\). Then \\(\\bar v = \\dfrac{v_1 t_1 + v_2 t_2 + \\dots}{t_1 + t_2 + \\dots}\\), a mean weighted by time.\n" +
        "- Equal times: \\(\\bar v = \\dfrac{v_1 + v_2 + \\dots + v_n}{n}\\).\n" +
        "- Minutes to hours first: 45 min is 0.75 h.",
      formula: {
        label: "Average over given times",
        latex: "\\bar v = \\dfrac{v_1 t_1 + v_2 t_2}{t_1 + t_2}",
      },
      authoredExample: {
        prompt: "A truck runs for 1 h at 35 km/h and then for 3 h at 55 km/h. Find its average speed.",
        steps: [
          "Distances: \\(35 \\times 1 = 35\\) km and \\(55 \\times 3 = 165\\) km, so 200 km.",
          "Time: 4 h.",
          "\\(\\bar v = 200 \\div 4 = 50\\) km/h.",
        ],
        answer: "50 km/h.",
      },
      selfCheckExample: {
        prompt: "A man walks for 40 minutes at 6 km/h and then runs for 20 minutes at 12 km/h. Find his average speed.",
        steps: [
          "Distances: \\(6 \\times \\tfrac23 = 4\\) km and \\(12 \\times \\tfrac13 = 4\\) km.",
          "8 km in 1 h.",
        ],
        answer: "8 km/h.",
      },
      practiceSet: [
        { prompt: "A car runs for equal times at 36, 48 and 72 km/h. Find its average speed.", answer: "52 km/h" },
        { prompt: "A train runs 2 h at 70 km/h and 1 h at 25 km/h. Find its average speed.", answer: "55 km/h" },
        { prompt: "A bus runs 30 minutes at 64 km/h and 90 minutes at 24 km/h. Find its average speed.", answer: "34 km/h" },
      ],
      pyqExampleId: "58fd3ba2-eda8-41ec-a5e7-1a9bcdbdb4ea",
      traps: [
        {
          title: "Weight by time",
          body: "The plain mean of the speeds is right only when the times are equal. 1 h at 35 km/h and 3 h at 55 km/h gives 50 km/h, not the mean 45, because the faster speed lasted three times as long.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-equal-distances",
      name: "Equal distances: there and back, or equal stretches",
      intuition:
        "Over equal distances the slower speed lasts longer, so it pulls the average below the mean of the speeds. The distance itself cancels and need not be known.",
      definition:
        "- Two equal distances at \\(a\\) and \\(b\\), such as there and back: \\(\\bar v = \\dfrac{2ab}{a + b}\\).\n" +
        "- Three equal distances: \\(\\bar v = \\dfrac{3}{\\tfrac1a + \\tfrac1b + \\tfrac1c}\\).\n" +
        "- If the distance is given anyway, total distance over total time gives the same answer.\n" +
        "- The average always lies between the speeds and below their mean.",
      formula: {
        label: "Average over two equal distances",
        latex: "\\bar v = \\dfrac{2ab}{a + b}",
      },
      authoredExample: {
        prompt: "A man drives to a town at 30 km/h and back at 70 km/h. Find his average speed.",
        steps: [
          "\\(\\bar v = \\dfrac{2 \\times 30 \\times 70}{30 + 70} = \\dfrac{4200}{100} = 42\\) km/h.",
          "Check with 210 km each way: 7 h out and 3 h back, so 420 km in 10 h, 42 km/h.",
        ],
        answer: "42 km/h.",
      },
      selfCheckExample: {
        prompt: "A walker covers three equal stretches at 2 km/h, 3 km/h and 6 km/h. Find the average speed.",
        steps: ["\\(\\tfrac12 + \\tfrac13 + \\tfrac16 = 1\\), so \\(\\bar v = \\dfrac{3}{1} = 3\\) km/h."],
        answer: "3 km/h.",
      },
      practiceSet: [
        { prompt: "To school at 4 km/h and back at 12 km/h. Find the average speed.", answer: "6 km/h" },
        { prompt: "A journey in two equal halves at 20 km/h and 30 km/h. Find the average speed.", answer: "24 km/h" },
        { prompt: "Up a hill at 10 km/h and down the same road at 15 km/h. Find the average speed.", answer: "12 km/h" },
        { prompt: "A car goes 240 km out at 80 km/h and 240 km back at 48 km/h. Find the average speed.", answer: "60 km/h" },
      ],
      pyqExampleId: "f93923bd-1801-478d-8a6b-ce977752a5be",
      traps: [
        {
          title: "The mean is too high",
          body: "Out at 30 km/h and back at 70 km/h averages 42 km/h, not 50. The return is quick, so the slow leg fills most of the time.",
        },
        {
          title: "Work out a changed speed first",
          body: "'Out at 24 km/h and back 50% faster' means 36 km/h back. Find the second speed before using \\(\\tfrac{2ab}{a + b}\\): here 28.8 km/h.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-fractions-working-back",
      name: "Fractions of the journey, and working back from an average",
      intuition:
        "When a journey is split by fractions, pick a total distance that every fraction divides. When the average is given instead, run the same equation backwards for the missing speed.",
      definition:
        "- A fraction \\(p\\) of the way at \\(a\\) and the rest, \\(q = 1 - p\\), at \\(b\\): \\(\\bar v = \\dfrac{1}{\\tfrac pa + \\tfrac qb}\\).\n" +
        "- In practice, take a convenient total (a multiple of every denominator), find each part's time and divide.\n" +
        "- Given the average of two equal halves and one speed: solve \\(\\dfrac{2ab}{a + b} = \\bar v\\) for the other.\n" +
        "- Speeds such as \\(x\\) and \\(3x\\) for equal halves: the formula gives a multiple of \\(x\\), set it equal to the average.",
      formula: {
        label: "Average over fractions of the way",
        latex: "\\bar v = \\dfrac{1}{\\tfrac pa + \\tfrac qb} \\quad (p + q = 1)",
      },
      authoredExample: {
        prompt: "A cyclist rides a third of the way at 10 km/h and the rest at 20 km/h. Find his average speed.",
        steps: [
          "Take the whole way as 30 km: 10 km at 10 km/h is 1 h, and 20 km at 20 km/h is 1 h.",
          "\\(\\bar v = 30 \\div 2 = 15\\) km/h.",
          "Check: \\(\\dfrac{1}{\\tfrac{1}{30} + \\tfrac{2}{60}} = \\dfrac{1}{\\tfrac{1}{15}} = 15\\).",
        ],
        answer: "15 km/h.",
      },
      selfCheckExample: {
        prompt: "A car goes to a town at 30 km/h. At what speed must it return to average 36 km/h for the round trip?",
        steps: [
          "\\(\\dfrac{2 \\times 30 \\times b}{30 + b} = 36\\), so \\(60b = 1080 + 36b\\).",
          "\\(24b = 1080\\), so \\(b = 45\\).",
        ],
        answer: "45 km/h.",
      },
      practiceSet: [
        { prompt: "Half the way at 15 km/h and half at 30 km/h. Find the average speed.", answer: "20 km/h" },
        { prompt: "A quarter of the way at 12 km/h and the rest at 36 km/h. Find the average speed.", answer: "24 km/h", method: "Take 48 km." },
        { prompt: "Two equal halves at \\(v\\) and \\(3v\\) average 30 km/h. Find \\(v\\).", answer: "20 km/h", method: "\\(\\tfrac{6v^2}{4v} = 1.5v\\)." },
      ],
      pyqExampleId: "669d4e0b-00b7-4a02-950b-175b21c6f140",
      traps: [
        {
          title: "Fractions of distance weight the times, not the speeds",
          body: "A third of the way at 10 km/h and two thirds at 20 km/h is not \\(\\tfrac13 \\times 10 + \\tfrac23 \\times 20 \\approx 16.7\\) km/h. Each part took 1 h, so the answer is 15 km/h.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-stoppages",
      name: "Stoppages and breaks",
      intuition:
        "A stop adds time but no distance. Counting its stops, a bus covers less in an hour than its running speed; the shortfall is the distance it would have run while standing still.",
      definition:
        "- Average including a break \\(= \\dfrac{\\text{distance}}{\\text{moving time} + \\text{break}}\\). Speed while moving \\(= \\dfrac{\\text{distance}}{\\text{moving time}}\\).\n" +
        "- Minutes stopped per hour: the distance lost each hour, \\(v_1 - v_2\\), at the running speed \\(v_1\\).\n" +
        "- 'Without stops it would take 4 h, with stops 5 h' means 1 h of stops.",
      formula: {
        label: "Minutes stopped per hour",
        latex: "\\text{stop per hour} = \\dfrac{v_1 - v_2}{v_1} \\times 60 \\text{ min}",
      },
      authoredExample: {
        prompt: "Without stops a train runs at 60 km/h; with stops it averages 48 km/h. How many minutes does it stop each hour?",
        steps: [
          "Each hour it loses \\(60 - 48 = 12\\) km of running.",
          "12 km at 60 km/h takes \\(\\tfrac{12}{60} \\times 60 = 12\\) minutes.",
        ],
        answer: "12 minutes.",
      },
      selfCheckExample: {
        prompt: "A van drives 30 km at 36 km/h, stops for 20 minutes, then drives 40 km at 48 km/h. Find its average speed including the stop.",
        steps: [
          "Times: \\(\\tfrac{30}{36} = \\tfrac56\\) h, the stop \\(\\tfrac13\\) h, and \\(\\tfrac{40}{48} = \\tfrac56\\) h. In all 2 h.",
          "\\(70 \\div 2 = 35\\) km/h.",
        ],
        answer: "35 km/h.",
      },
      practiceSet: [
        { prompt: "Without stops 80 km/h, with stops 60 km/h. How many minutes are stopped per hour?", answer: "15 minutes" },
        { prompt: "A bus covers 240 km in 5 h, of which 1 h is spent at stops. Find its speed while moving.", answer: "60 km/h" },
        { prompt: "Without stops 90 km/h, with stops 60 km/h. How many minutes are stopped per hour?", answer: "20 minutes" },
      ],
      pyqExampleId: "878c8cf7-1685-4158-a1b0-db4fc9a59c5f",
      traps: [
        {
          title: "Divide by the running speed",
          body: "The 12 km lost each hour would have been run at 60 km/h, so it is 12 minutes. Dividing by the 48 km/h average gives 15 minutes, which is wrong.",
        },
        {
          title: "Include the break, or leave it out, as asked",
          body: "'Average speed including the break' puts the break in the time. 'Speed while driving' leaves it out. The options usually carry both.",
        },
      ],
    },
  ],
};
