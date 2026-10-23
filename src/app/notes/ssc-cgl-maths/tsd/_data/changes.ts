import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_CHANGES_NOTE: SubtopicNote = {
  subtopicName: "Speed Changes and Equations",
  title: "Speed Changes and Equations",
  oneLineDefinition:
    "On a fixed route, speed and time change in opposite directions by the same ratio, and two speeds over the same route differ in time by a gap that fixes the distance.",
  whyItMatters:
    "Fourteen questions in the bank, nine EASY and five MODERATE, half of them from the 2025 shifts: a speed raised by a percentage, a student late at one speed and early at another, a rider who stops every 10 km. Each has a one-line route once you see which quantity stays fixed.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdsc-inverse",
      name: "Speed and time on the same route",
      intuition:
        "On the same route the distance is fixed, so speed times time stays the same. Go faster and the time shrinks in exactly the same ratio. A speed one quarter higher does not save a quarter of the time: it saves one fifth.",
      definition:
        "- **Same distance:** \\(s_1 t_1 = s_2 t_2\\), so \\(\\frac{t_2}{t_1} = \\frac{s_1}{s_2}\\).\n" +
        "- **Fraction rule:** if the speed becomes \\(\\frac{a}{b}\\) of itself, the time becomes \\(\\frac{b}{a}\\) of itself. A 25% rise in speed (\\(\\times \\frac{5}{4}\\)) makes the time \\(\\frac{4}{5}\\), a saving of 20%.\n" +
        "- **Time up by \\(\\frac{1}{n}\\)** means speed down by \\(\\frac{1}{n + 1}\\). Time up by \\(\\frac{1}{4}\\) means speed down by \\(\\frac{1}{5}\\), which is 20%.\n" +
        "- **Same time:** distance and speed rise by the same ratio. A route 20% longer in the same time needs 20% more speed.\n" +
        "- **New speed for a new time:** find the distance once, old speed × old time, then divide by the new time.\n" +
        "- **Limit:** the fraction rule holds only when the distance is the same both times.",
      formula: {
        label: "Fixed distance",
        latex: "s_1 t_1 = s_2 t_2 \\qquad \\frac{t_2}{t_1} = \\frac{s_1}{s_2}",
        symbols: [
          { symbol: "\\(s_1, t_1\\)", meaning: "the usual speed and time" },
          { symbol: "\\(s_2, t_2\\)", meaning: "the new speed and time" },
        ],
      },
      authoredExample: {
        prompt: "A train takes 5 hours for a journey at 64 km/h. If its speed is raised by 25%, how much time does it save?",
        steps: [
          "Full method: distance \\(= 64 \\times 5 = 320\\) km; new speed \\(= 80\\) km/h; new time \\(= \\frac{320}{80} = 4\\) hours.",
          "Time saved \\(= 5 - 4 = 1\\) hour.",
          "Fast route: speed \\(\\times \\frac{5}{4}\\), so time \\(\\times \\frac{4}{5}\\), a saving of \\(\\frac{1}{5}\\) of 5 hours.",
        ],
        answer: "1 hour",
      },
      selfCheckExample: {
        prompt: "A cyclist rides 36 km in 2 hours. A detour makes the route one sixth longer. What speed does he need to finish the new route in the same 2 hours?",
        steps: [
          "Same time, so the speed rises by the same one sixth: \\(18 \\times \\frac{7}{6} = 21\\) km/h.",
          "Check: the new route is 42 km, and \\(\\frac{42}{2} = 21\\).",
        ],
        answer: "21 km/h",
      },
      practiceSet: [
        {
          prompt: "A car takes 6 hours for a trip at 40 km/h. How long does the same trip take at 48 km/h?",
          answer: "5 hours",
          method: "\\(6 \\times \\frac{40}{48} = 5\\).",
        },
        {
          prompt: "If the speed on a 2 hour trip is cut to \\(\\frac{3}{4}\\) of usual, how much longer does the trip take?",
          answer: "40 minutes",
          method: "Time \\(\\times \\frac{4}{3}\\): 2 hours become 2 hours 40 minutes.",
        },
        {
          prompt: "By what percentage must the speed rise to cut the time of a trip by 20%?",
          answer: "25%",
          method: "Time \\(\\times \\frac{4}{5}\\), so speed \\(\\times \\frac{5}{4}\\).",
        },
        {
          prompt: "A runner covers a course in 40 minutes at 9 km/h. What speed lets him do it in 30 minutes?",
          answer: "12 km/h",
          method: "\\(9 \\times \\frac{40}{30} = 12\\).",
        },
      ],
      pyqExampleId: "5e49a9d8-5ecd-4452-979b-543e2b05f9b0",
      traps: [
        {
          title: "Taking a 25% rise in speed as a 25% cut in time",
          body:
            "On the same route the time falls in the inverse ratio: speed \\(\\times \\frac{5}{4}\\) makes time \\(\\times \\frac{4}{5}\\), so the cut is 20%, not 25%.",
        },
        {
          title: "Giving the new speed when the increase is asked",
          body:
            "When a question asks by how much the speed must rise, find the new speed and then subtract the old one. The new speed itself is usually a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdsc-gap",
      name: "Two speeds over the same distance and the time between them",
      intuition:
        "When the same distance is covered at two speeds, the slower trip takes longer. The difference between the two times is the only extra fact you need: it fixes the distance.",
      definition:
        "- **Equation:** \\(\\frac{d}{s_1} - \\frac{d}{s_2} = \\Delta t\\), with \\(s_1\\) the slower speed and \\(\\Delta t\\) the time gap in hours.\n" +
        "- **Fast route:** \\(d = \\frac{s_1 s_2 \\, \\Delta t}{s_2 - s_1}\\): the product of the speeds times the time gap, over the difference of the speeds.\n" +
        "- **Late and early:** late by \\(x\\) minutes at one speed and early by \\(y\\) minutes at the other gives a time gap of \\(x + y\\). Late by \\(x\\) at one speed and late by \\(y\\) at the other gives \\(x - y\\).\n" +
        "- The usual, on time, journey time is then either trip's time corrected by its lateness or earliness.\n" +
        "- **Limit:** the fast route needs the same distance both times and the gap in the same unit of time as the speeds.",
      formula: {
        label: "Distance from a time gap",
        latex: "d = \\frac{s_1 s_2 \\, \\Delta t}{s_2 - s_1}",
        symbols: [
          { symbol: "\\(s_1\\)", meaning: "the slower speed" },
          { symbol: "\\(s_2\\)", meaning: "the faster speed" },
          { symbol: "\\(\\Delta t\\)", meaning: "how much longer the slower trip takes" },
        ],
      },
      authoredExample: {
        prompt: "Walking at 5 km/h a boy reaches the station 6 minutes late; at 6 km/h he is 4 minutes early. How far is the station?",
        steps: [
          "One trip is late and one is early, so the gap is \\(6 + 4 = 10\\) minutes, which is \\(\\frac{1}{6}\\) hour.",
          "\\(d = \\frac{5 \\times 6 \\times \\frac{1}{6}}{6 - 5} = 5\\) km.",
          "Check: 1 hour at 5 km/h and \\(\\frac{5}{6}\\) hour at 6 km/h, which differ by \\(\\frac{1}{6}\\) hour.",
        ],
        answer: "5 km",
      },
      selfCheckExample: {
        prompt: "A cyclist cuts his speed from 15 km/h to 12 km/h and takes 10 minutes longer for the same ride. How long is the ride?",
        steps: [
          "\\(d = \\frac{12 \\times 15 \\times \\frac{1}{6}}{15 - 12} = 10\\) km.",
          "Check: \\(\\frac{2}{3}\\) hour at 15 km/h and \\(\\frac{5}{6}\\) hour at 12 km/h, which differ by \\(\\frac{1}{6}\\) hour.",
        ],
        answer: "10 km",
      },
      practiceSet: [
        {
          prompt: "At 8 km/h a man takes 15 minutes longer than at 10 km/h for the same walk. How long is the walk?",
          answer: "10 km",
          method: "\\(\\frac{8 \\times 10 \\times \\frac{1}{4}}{2} = 10\\).",
        },
        {
          prompt: "A student is 10 minutes late walking at 3 km/h and 10 minutes early at 4 km/h. How far is the school?",
          answer: "4 km",
          method: "Gap 20 minutes \\(= \\frac{1}{3}\\) hour: \\(\\frac{3 \\times 4 \\times \\frac{1}{3}}{1} = 4\\).",
        },
        {
          prompt: "Two buses run at 40 km/h and 60 km/h on the same route, and the slower one arrives 1 hour after the faster one. How long is the route?",
          answer: "120 km",
          method: "\\(\\frac{40 \\times 60 \\times 1}{20} = 120\\).",
        },
        {
          prompt: "At 36 km/h a rider is 20 minutes late and at 45 km/h he is 10 minutes late. How long is the route?",
          answer: "30 km",
          method: "Gap \\(20 - 10 = 10\\) minutes: \\(\\frac{36 \\times 45 \\times \\frac{1}{6}}{9} = 30\\).",
        },
      ],
      pyqExampleId: "df0bdaef-4228-4364-8a88-7eeaea6caf00",
      traps: [
        {
          title: "Leaving the time gap in minutes",
          body:
            "With speeds in km/h the time gap must be in hours. 20 minutes is \\(\\frac{1}{3}\\) hour; putting 20 into the formula makes the distance 60 times too big.",
        },
        {
          title: "Subtracting a late time from an early time",
          body:
            "Late by 15 minutes at one speed and early by 5 minutes at the other is a gap of 20 minutes, not 10. Add the two when one trip is late and the other is early.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdsc-stops",
      name: "Halts, rests and the speed needed to arrive on time",
      intuition:
        "A stop costs time but covers no ground. Split the trip into moving time, worked out from distance and speed, and stopped time, counted stop by stop.",
      definition:
        "- **Total time = moving time + stopped time.** Moving time is distance ÷ speed; stopped time is the number of stops times the length of each stop.\n" +
        "- **Count the stops with care.** A rest after every \\(k\\) km on a trip of \\(d\\) km, where \\(k\\) divides \\(d\\), happens \\(\\frac{d}{k} - 1\\) times: there is no rest at the finish. If \\(k\\) does not divide \\(d\\), count the whole number of \\(k\\) km stretches done before the end.\n" +
        "- **Same journey, different halts:** subtract the halts from the known total to get the driving time, find the distance, then build the other traveller's time.\n" +
        "- **Arriving on time:** the speed needed for the rest of a trip is the distance left divided by the time left.",
      formula: {
        label: "Rests after every k km",
        latex: "\\text{number of rests} = \\frac{d}{k} - 1 \\quad (k \\text{ divides } d)",
      },
      authoredExample: {
        prompt: "A cyclist rides at 15 km/h and rests for 8 minutes after every 6 km. How long does he take for a 30 km ride?",
        steps: [
          "Moving time \\(= \\frac{30}{15} = 2\\) hours \\(= 120\\) minutes.",
          "Rests after 6, 12, 18 and 24 km: \\(\\frac{30}{6} - 1 = 4\\) rests, so \\(4 \\times 8 = 32\\) minutes.",
          "Total \\(= 120 + 32 = 152\\) minutes.",
        ],
        answer: "2 hours 32 minutes",
      },
      selfCheckExample: {
        prompt: "A driver must cover 150 km in 3 hours. He drives the first 1 hour 30 minutes at 40 km/h. What speed does he need for the rest of the way to arrive on time?",
        steps: [
          "Covered: \\(40 \\times 1.5 = 60\\) km, so 90 km are left.",
          "Time left: \\(3 - 1.5 = 1.5\\) hours, so the speed needed is \\(\\frac{90}{1.5} = 60\\) km/h.",
        ],
        answer: "60 km/h",
      },
      practiceSet: [
        {
          prompt: "A man walks 12 km at 6 km/h and rests for 10 minutes after every 3 km. How long does the walk take?",
          answer: "2 hours 30 minutes",
          method: "2 hours walking, and rests after 3, 6 and 9 km.",
        },
        {
          prompt: "A bus runs at 50 km/h and makes 4 halts of 15 minutes each on a 200 km route. How long does the trip take?",
          answer: "5 hours",
          method: "4 hours moving and 1 hour of halts.",
        },
        {
          prompt: "A car took 6 hours for a trip, including two halts of 30 minutes each, and drove at 60 km/h. How long is the trip?",
          answer: "300 km",
          method: "5 hours of driving.",
        },
        {
          prompt: "A trip of 100 km must take 2 hours. The first 40 km take 1 hour. What speed is needed for the rest?",
          answer: "60 km/h",
          method: "60 km in the hour left.",
        },
      ],
      pyqExampleId: "3a6398a7-8b17-451c-9ee0-29f0c0803111",
      traps: [
        {
          title: "Counting a rest at the finish",
          body:
            "A rest after every 8 km on a 40 km trip happens 4 times, not 5: the trip ends at the 40th kilometre and no rest is taken there.",
        },
        {
          title: "Using the whole trip to find the catching up speed",
          body:
            "To arrive on time after a slow start, divide the distance still left by the time still left. Dividing the whole distance by the whole time gives the planned average, not the speed needed now.",
        },
      ],
    },
  ],
};
