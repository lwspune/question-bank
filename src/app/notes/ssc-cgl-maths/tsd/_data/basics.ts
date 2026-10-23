import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_BASICS_NOTE: SubtopicNote = {
  subtopicName: "Speed, Time and Distance Basics",
  title: "Speed, Time and Distance Basics",
  oneLineDefinition:
    "Distance equals speed times time, as long as all three use matching units, and when one of the three is held fixed the other two move in a simple proportion.",
  whyItMatters:
    "Seventeen questions in the bank, all EASY, and twelve of them come from the 2025 shifts: a street crossed in a few minutes, a train's speed asked in metres per second, a car whose speed is a ratio of a bus's. They are quick marks when the units are right, and the units are exactly where the wrong options are set.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdba-formula",
      name: "Distance equals speed times time",
      intuition:
        "Speed is the ground covered in one unit of time. Cover 40 km in each hour for 3 hours and you have covered 120 km. Every question in this chapter starts from that one line, read forwards or backwards.",
      definition:
        "- **Distance = speed × time**, so speed = distance ÷ time and time = distance ÷ speed.\n" +
        "- The three must use matching units: km with hours and km/h, metres with seconds and m/s.\n" +
        "- **Minutes to hours:** divide by 60. 45 minutes is 0.75 hour, 48 minutes is 0.8 hour, 20 minutes is \\(\\frac{1}{3}\\) hour.\n" +
        "- **Clock times:** first count the hours and minutes between them. From 10:30 a.m. to 2:15 p.m. is 1 h 30 min to noon plus 2 h 15 min, so 3 h 45 min.\n" +
        "- **Fast route:** a rate given per minute times the number of minutes needs no hour conversion at all. It is safe only when the rate and the time use the same unit of time.",
      formula: {
        label: "Speed, distance and time",
        latex: "d = s \\times t \\qquad s = \\frac{d}{t} \\qquad t = \\frac{d}{s}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance covered" },
          { symbol: "\\(s\\)", meaning: "speed, kept constant" },
          { symbol: "\\(t\\)", meaning: "time taken" },
        ],
      },
      authoredExample: {
        prompt: "A bus leaves at 7:40 a.m. and arrives at 11:10 a.m. the same morning, running at 48 km/h. How far does it travel?",
        steps: [
          "From 7:40 a.m. to 11:10 a.m. is 3 hours 30 minutes, which is 3.5 hours.",
          "\\(d = 48 \\times 3.5 = 168\\) km.",
        ],
        answer: "168 km",
      },
      selfCheckExample: {
        prompt: "A scooter covers 54 km in 1 hour 12 minutes. What is its speed in km/h?",
        steps: [
          "12 minutes is \\(\\frac{12}{60} = 0.2\\) hour, so the time is 1.2 hours.",
          "\\(s = \\frac{54}{1.2} = 45\\) km/h.",
        ],
        answer: "45 km/h",
      },
      practiceSet: [
        {
          prompt: "A cyclist rides at 18 km/h for 2 hours 20 minutes. How far does he ride?",
          answer: "42 km",
          method: "\\(2\\frac{1}{3}\\) hours, and \\(18 \\times \\frac{7}{3} = 42\\).",
        },
        {
          prompt: "A walker covers 0.08 km every minute. How far does he walk in 1 hour 15 minutes?",
          answer: "6 km",
          method: "75 minutes at 0.08 km a minute: \\(0.08 \\times 75 = 6\\).",
        },
        {
          prompt: "How long does a car at 64 km/h take to cover 240 km?",
          answer: "3 hours 45 minutes",
          method: "\\(\\frac{240}{64} = 3.75\\) hours.",
        },
        {
          prompt: "A runner covers 9.6 km in 40 minutes. What is his speed in km/h?",
          answer: "14.4 km/h",
          method: "40 minutes is \\(\\frac{2}{3}\\) hour, and \\(9.6 \\div \\frac{2}{3} = 14.4\\).",
        },
      ],
      pyqExampleId: "3f4b0049-9991-44e7-9553-c4b45f977c43",
      traps: [
        {
          title: "Reading 2 hours 30 minutes as 2.3 hours",
          body:
            "30 minutes is half an hour, so 2 hours 30 minutes is 2.5 hours. Change minutes to hours by dividing by 60, never by writing them after the decimal point.",
        },
        {
          title: "Counting clock time across noon",
          body:
            "From 9:30 a.m. to 1:00 p.m. is 3 hours 30 minutes. Count up to 12 noon first, then add the afternoon part, instead of subtracting 9 from 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdba-units",
      name: "Changing km/h to m/s and back",
      intuition:
        "1 km/h means 1000 metres in 3600 seconds, which is \\(\\frac{1000}{3600} = \\frac{5}{18}\\) of a metre every second. So a speed in km/h times \\(\\frac{5}{18}\\) gives m/s, and a speed in m/s times \\(\\frac{18}{5}\\) gives km/h.",
      definition:
        "- **km/h to m/s:** multiply by \\(\\frac{5}{18}\\). **m/s to km/h:** multiply by \\(\\frac{18}{5}\\).\n" +
        "- Multiples of 18 km/h give whole m/s: 18 is 5, 36 is 10, 54 is 15, 72 is 20, 90 is 25, 108 is 30. Knowing these saves a step in most train and track questions.\n" +
        "- **Metres per minute to km/h:** multiply by 60 and divide by 1000, which is the same as multiplying by 0.06. 100 m a minute is 6 km/h.\n" +
        "- The same speed is a smaller number in m/s than in km/h. Use that to check the direction of your fraction.\n" +
        "- **Fast route:** change the given data into the unit the answer asks for at the start, then work in that one unit to the end.",
      formula: {
        label: "Changing units of speed",
        latex: "1 \\text{ km/h} = \\frac{5}{18} \\text{ m/s} \\qquad 1 \\text{ m/s} = \\frac{18}{5} \\text{ km/h}",
      },
      authoredExample: {
        prompt: "A cyclist crosses a 450 m bridge in 1 minute 15 seconds. What is his speed in km/h?",
        steps: [
          "1 minute 15 seconds is 75 seconds, so the speed is \\(\\frac{450}{75} = 6\\) m/s.",
          "\\(6 \\times \\frac{18}{5} = 21.6\\) km/h.",
        ],
        answer: "21.6 km/h",
      },
      selfCheckExample: {
        prompt: "A car runs at 81 km/h. How many metres does it cover in 16 seconds?",
        steps: [
          "\\(81 \\times \\frac{5}{18} = 22.5\\) m/s.",
          "\\(22.5 \\times 16 = 360\\) m.",
        ],
        answer: "360 m",
      },
      practiceSet: [
        { prompt: "Change 126 km/h into m/s.", answer: "35 m/s", method: "\\(126 \\times \\frac{5}{18} = 35\\)." },
        { prompt: "Change 12 m/s into km/h.", answer: "43.2 km/h", method: "\\(12 \\times \\frac{18}{5} = 43.2\\)." },
        {
          prompt: "A woman walks 80 m every minute. What is her speed in km/h?",
          answer: "4.8 km/h",
          method: "\\(80 \\times 60 = 4800\\) m an hour.",
        },
        {
          prompt: "How many metres does a scooter at 45 km/h cover in 40 seconds?",
          answer: "500 m",
          method: "\\(45 \\times \\frac{5}{18} = 12.5\\) m/s, and \\(12.5 \\times 40 = 500\\).",
        },
      ],
      pyqExampleId: "9e0fd2d5-5dbd-437a-be82-ab1a0b73a7f6",
      traps: [
        {
          title: "Turning the fraction upside down",
          body:
            "If changing a speed from km/h to m/s gives a bigger number, the fraction is upside down. 72 km/h is 20 m/s, a smaller number, because a metre is much shorter than a kilometre.",
        },
        {
          title: "Mixing seconds and minutes with m/s",
          body:
            "A speed in m/s needs the time in seconds. 3 minutes at 4 m/s is 180 seconds, so 720 m, not 12 m.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdba-ratio",
      name: "Speed ratios when the time or the distance is fixed",
      intuition:
        "If two people move for the same time, the faster one covers more ground in exactly the ratio of their speeds. If they cover the same ground, the faster one needs less time, in that ratio turned upside down.",
      definition:
        "- **Same time:** distance is proportional to speed. Twice the speed, twice the distance.\n" +
        "- **Same distance:** time is inversely proportional to speed. Speeds in the ratio 3 : 4 give times 4 : 3.\n" +
        "- **Neither fixed:** write each speed as distance over time and divide, as in the formula.\n" +
        "- \"k times as fast\" means the speed ratio is k : 1.\n" +
        "- **Fast route:** with ratios you never need the actual distance or time; keep them as letters and they cancel.",
      formula: {
        label: "Ratio of two speeds",
        latex: "\\frac{s_1}{s_2} = \\frac{d_1}{d_2} \\times \\frac{t_2}{t_1}",
        symbols: [
          { symbol: "\\(d_1, t_1\\)", meaning: "distance and time of the first mover" },
          { symbol: "\\(d_2, t_2\\)", meaning: "distance and time of the second mover" },
        ],
      },
      authoredExample: {
        prompt: "A truck covers 150 km in 3 hours. A car is 1.4 times as fast as the truck. How far does the car go in 2 hours 30 minutes?",
        steps: [
          "Truck: \\(\\frac{150}{3} = 50\\) km/h, so the car runs at \\(1.4 \\times 50 = 70\\) km/h.",
          "In 2.5 hours the car covers \\(70 \\times 2.5 = 175\\) km.",
        ],
        answer: "175 km",
      },
      selfCheckExample: {
        prompt: "P covers \\(\\frac{3}{5}\\) of a road in twice the time that Q takes for the whole road. What is the ratio of P's speed to Q's speed?",
        steps: [
          "Let the road be \\(d\\) and Q's time \\(t\\). Q's speed is \\(\\frac{d}{t}\\).",
          "P's speed is \\(\\frac{3d/5}{2t} = \\frac{3d}{10t}\\).",
          "Ratio \\(= \\frac{3}{10} : 1 = 3 : 10\\).",
        ],
        answer: "3 : 10",
      },
      practiceSet: [
        { prompt: "Two cars take 6 hours and 8 hours for the same journey. What is the ratio of their speeds?", answer: "4 : 3" },
        {
          prompt: "A walks at 5 km/h and B at 4 km/h for the same length of time. B covers 12 km. How far does A cover?",
          answer: "15 km",
          method: "Same time, so \\(12 \\times \\frac{5}{4} = 15\\).",
        },
        {
          prompt: "A train is 4 times as fast as a cyclist who rides 15 km in an hour. How far does the train go in 45 minutes?",
          answer: "45 km",
          method: "\\(60 \\times 0.75 = 45\\).",
        },
        {
          prompt: "The speeds of two runners are in the ratio 5 : 6. The slower one takes 36 minutes for a course. How long does the faster one take?",
          answer: "30 minutes",
          method: "Times are 6 : 5, so \\(36 \\times \\frac{5}{6} = 30\\).",
        },
      ],
      pyqExampleId: "57aa367c-05be-4ae1-856f-871592f3940a",
      traps: [
        {
          title: "Using the speed ratio as the time ratio",
          body:
            "For the same distance the times are in the inverse ratio. Speeds 2 : 3 give times 3 : 2, so the faster car takes the smaller share of time.",
        },
        {
          title: "Multiplying the two ratios instead of dividing",
          body:
            "Covering a quarter of the distance in three times the time gives a speed ratio of \\(\\frac{1}{4} \\div 3 = \\frac{1}{12}\\), not \\(\\frac{3}{4}\\). Divide the distance ratio by the time ratio.",
        },
      ],
    },
  ],
};
