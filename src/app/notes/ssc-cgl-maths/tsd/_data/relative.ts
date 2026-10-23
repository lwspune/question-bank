import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_RELATIVE_NOTE: SubtopicNote = {
  subtopicName: "Relative Speed: Chasing and Meeting",
  title: "Relative Speed: Chasing and Meeting",
  oneLineDefinition:
    "Two movers on one road close or open the gap between them at the difference of their speeds when they go the same way, and at the sum of their speeds when they come towards each other.",
  whyItMatters:
    "Forty-two questions in the bank, the largest page of the chapter, and twenty-nine of them EASY. Most are a policeman chasing a thief, asked in one of four forms: how long, how far, what gap is left, or what speed. One idea, the gap closed at the relative speed, answers all four.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdrs-gap",
      name: "Closing a gap at the relative speed",
      intuition:
        "Ride along with the thief and he seems to stand still, while the policeman comes on at only the extra speed he has. A policeman at 10 km/h behind a thief at 8 km/h gains 2 km every hour, so a gap of 1 km is gone in half an hour.",
      definition:
        "- **Same direction:** the gap changes at the **relative speed** \\(s_1 - s_2\\), the faster speed minus the slower.\n" +
        "- **Time to catch** \\(= \\frac{\\text{gap}}{s_1 - s_2}\\).\n" +
        "- **Gap left after a time** \\(t\\): starting gap \\(- (s_1 - s_2) \\times t\\).\n" +
        "- **Unknown speed or gap:** read the same line backwards. Gap ÷ catch time gives the relative speed; add the slower speed to get the faster.\n" +
        "- **Units:** with a gap in metres and speeds in km/h, work in metres per minute (1 km/h is \\(\\frac{1000}{60}\\) m a minute) or change to m/s with \\(\\frac{5}{18}\\).\n" +
        "- Two people who start together and walk the same way move apart at the same relative speed.",
      formula: {
        label: "Catching up",
        latex: "t = \\frac{\\text{gap}}{s_1 - s_2}",
        symbols: [
          { symbol: "\\(s_1\\)", meaning: "speed of the chaser" },
          { symbol: "\\(s_2\\)", meaning: "speed of the one ahead" },
        ],
      },
      authoredExample: {
        prompt: "A constable is 450 m behind a thief. The constable runs at 15 km/h and the thief at 12 km/h. How many minutes does the constable take to catch him?",
        steps: [
          "Relative speed \\(= 15 - 12 = 3\\) km/h \\(= \\frac{3000}{60} = 50\\) m a minute.",
          "Time \\(= \\frac{450}{50} = 9\\) minutes.",
        ],
        answer: "9 minutes",
      },
      selfCheckExample: {
        prompt: "A policeman is 600 m behind a thief. Both start running together, the policeman at 14 km/h and the thief at 11 km/h. How far apart are they after 6 minutes?",
        steps: [
          "Relative speed \\(= 3\\) km/h \\(= 50\\) m a minute.",
          "In 6 minutes the gap closes by 300 m, leaving \\(600 - 300 = 300\\) m.",
        ],
        answer: "300 m",
      },
      practiceSet: [
        {
          prompt: "Two friends start from the same gate and walk the same way at 3 km/h and 4.5 km/h. How far apart are they after 40 minutes?",
          answer: "1 km",
          method: "\\(1.5 \\times \\frac{2}{3} = 1\\).",
        },
        {
          prompt: "A thief 300 m ahead runs at 9 km/h, and a guard chasing at 12 km/h catches him. How long does the chase last?",
          answer: "6 minutes",
          method: "\\(\\frac{0.3}{3} = 0.1\\) hour.",
        },
        {
          prompt: "A guard catches a thief who was 0.6 km ahead in 12 minutes. The thief ran at 10 km/h. What was the guard's speed?",
          answer: "13 km/h",
          method: "Relative speed \\(= \\frac{0.6}{0.2} = 3\\), so \\(10 + 3\\).",
        },
        {
          prompt: "A guard running at 15 km/h catches a thief running at 12 km/h after 20 minutes. What was the gap between them at the start?",
          answer: "1 km",
          method: "\\(3 \\times \\frac{1}{3} = 1\\).",
        },
      ],
      pyqExampleId: "072dd585-b853-4824-81ef-64f6a026961c",
      traps: [
        {
          title: "Adding the speeds in a chase",
          body:
            "When both run the same way, the gap closes at the difference of the speeds. The sum is only for movers coming towards each other.",
        },
        {
          title: "Dividing metres by km/h",
          body:
            "A 450 m gap closed at 3 km/h does not take 150 of anything. Change the gap to km (0.45) or the speed to metres a minute (50) before you divide.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdrs-distance",
      name: "How far each one runs before the catch",
      intuition:
        "Once you know how long the chase lasts, each runner's distance is his own speed times that time. The chaser runs further than the one ahead by exactly the starting gap.",
      definition:
        "- **Distance of the one ahead** \\(= s_2 \\times \\frac{\\text{gap}}{s_1 - s_2}\\); **chaser's distance** \\(= s_1 \\times \\frac{\\text{gap}}{s_1 - s_2}\\).\n" +
        "- Chaser's distance minus the other's distance equals the starting gap: a quick check on any answer.\n" +
        "- **Fast route by ratio:** in the same time the distances are in the ratio of the speeds. With speeds 5 : 4 the gap is 1 part, so the one ahead runs 4 gaps and the chaser 5 gaps. This is safe only when both run for the whole chase.\n" +
        "- \"Caught at a distance of\" means from the chaser's starting point, unless the question names another point. Read whose start it names.\n" +
        "- Speeds given only as a ratio are enough for the distances. You need the actual speeds only for the time.",
      formula: {
        label: "Distance run before the catch",
        latex: "d_{\\text{ahead}} = \\frac{s_2 \\times \\text{gap}}{s_1 - s_2} \\qquad d_{\\text{chaser}} = \\frac{s_1 \\times \\text{gap}}{s_1 - s_2}",
        symbols: [
          { symbol: "\\(s_1\\)", meaning: "speed of the chaser" },
          { symbol: "\\(s_2\\)", meaning: "speed of the one ahead" },
        ],
      },
      authoredExample: {
        prompt: "A thief is 250 m ahead of a policeman. The thief runs at 14 km/h and the policeman at 16 km/h. How far does the thief run before he is caught?",
        steps: [
          "Full method: the chase lasts \\(\\frac{0.25}{16 - 14} = 0.125\\) hour, and the thief runs \\(14 \\times 0.125 = 1.75\\) km.",
          "Fast route: the gap is 2 parts of speed, so the thief runs \\(\\frac{14}{2} \\times 250 = 1750\\) m.",
          "Check: the policeman runs \\(16 \\times 0.125 = 2\\) km, which is 250 m more.",
        ],
        answer: "1750 m",
      },
      selfCheckExample: {
        prompt: "A dog chases a cat that is 40 m ahead. The dog's speed is to the cat's speed as 7 : 5. How far does the dog run to catch the cat?",
        steps: [
          "In the same time the dog runs 7 parts and the cat 5 parts, so the 40 m gap is 2 parts and 1 part is 20 m.",
          "The dog runs \\(7 \\times 20 = 140\\) m. Check: the cat runs 100 m, and \\(140 - 100 = 40\\).",
        ],
        answer: "140 m",
      },
      practiceSet: [
        {
          prompt: "A policeman at 9 km/h chases a thief at 7 km/h who is 400 m ahead. How far does the thief run before the catch?",
          answer: "1400 m",
          method: "\\(\\frac{7}{2} \\times 400\\).",
        },
        {
          prompt: "A chaser's and a runner's speeds are in the ratio 6 : 5, and the runner starts 300 m ahead. How far does the chaser run?",
          answer: "1800 m",
          method: "The gap is 1 part, so the chaser runs 6 gaps.",
        },
        {
          prompt: "A thief runs 2 km before a police car that started 500 m behind him catches him. The police car runs at 60 km/h. What is the thief's speed?",
          answer: "48 km/h",
          method: "In the same time the car runs 2.5 km and the thief 2 km: \\(60 \\times \\frac{2}{2.5}\\).",
        },
        {
          prompt: "A chaser runs 1.2 km to catch a runner who started 200 m ahead. How far did the runner run?",
          answer: "1 km",
          method: "The chaser runs the gap more than the runner.",
        },
      ],
      pyqExampleId: "03468e97-b826-44da-b410-e3e9184ce888",
      traps: [
        {
          title: "Giving the chaser's distance when the other's is asked",
          body:
            "The two distances differ by the starting gap, and both are usually among the options. Underline whose distance the question wants before you pick.",
        },
        {
          title: "Measuring the catch point from the wrong start",
          body:
            "When a question asks at what distance the thief is caught, the distance is counted from the chaser's starting point, which is the gap behind the thief's starting point.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdrs-late",
      name: "A chase where the chaser starts later",
      intuition:
        "When the chaser sets off late, the gap is not given: the one ahead builds it during the delay. Work out that lead first, and the rest is an ordinary chase.",
      definition:
        "- **Lead built during a delay** \\(=\\) the speed of the one ahead \\(\\times\\) the delay.\n" +
        "- The catch takes \\(\\frac{\\text{lead}}{s_1 - s_2}\\) after the chaser starts. For a clock answer, add it to the chaser's start time.\n" +
        "- Both are at the same place at the catch, so measured from the common start their distances are equal.\n" +
        "- The one ahead has been moving for the delay plus the chase time.\n" +
        "- **Unknown chaser speed:** find where the one ahead is at a known later moment and how far the chaser has got by then; the chaser's distance over his own time is his speed.",
      formula: {
        label: "Chase after a late start",
        latex: "t = \\frac{s_2 \\times \\text{delay}}{s_1 - s_2}",
        symbols: [
          { symbol: "\\(s_1\\)", meaning: "speed of the chaser" },
          { symbol: "\\(s_2\\)", meaning: "speed of the one ahead" },
          { symbol: "\\(t\\)", meaning: "time from the chaser's start to the catch" },
        ],
      },
      authoredExample: {
        prompt: "A cyclist leaves a town at 9:15 a.m. at 12 km/h. A motorcyclist leaves the same town at 10:45 a.m. along the same road at 30 km/h. When does the motorcyclist catch the cyclist?",
        steps: [
          "Lead at 10:45 a.m.: \\(12 \\times 1.5 = 18\\) km.",
          "Relative speed \\(= 30 - 12 = 18\\) km/h, so the catch takes 1 hour: 11:45 a.m.",
          "Check: the cyclist has ridden 2.5 hours, 30 km, and the motorcyclist 1 hour, 30 km.",
        ],
        answer: "11:45 a.m.",
      },
      selfCheckExample: {
        prompt: "A girl starts walking at 5 km/h. Her brother sets off after her 24 minutes later and catches her 40 minutes after he starts. What is his speed?",
        steps: [
          "Her lead: \\(5 \\times 0.4 = 2\\) km.",
          "He closes 2 km in \\(\\frac{2}{3}\\) hour, so the relative speed is 3 km/h and his speed is 8 km/h.",
          "Check: he walks \\(8 \\times \\frac{2}{3} = 5\\frac{1}{3}\\) km; she walks \\(5 \\times \\frac{16}{15} = 5\\frac{1}{3}\\) km in 64 minutes.",
        ],
        answer: "8 km/h",
      },
      practiceSet: [
        {
          prompt: "A man walks at 6 km/h. His friend follows 30 minutes later at 9 km/h. How far from the start does the friend catch him?",
          answer: "9 km",
          method: "Lead 3 km closed at 3 km/h: 1 hour at 9 km/h.",
        },
        {
          prompt: "A van leaves at noon at 40 km/h, and a car follows on the same road at 2:00 p.m. at 60 km/h. At what time does the car catch the van?",
          answer: "6:00 p.m.",
          method: "Lead 80 km closed at 20 km/h takes 4 hours.",
        },
        {
          prompt: "A thief runs at 10 km/h, and a guard starts after him 6 minutes later. How big is the thief's lead when the guard starts?",
          answer: "1 km",
          method: "\\(10 \\times \\frac{1}{10}\\).",
        },
        {
          prompt: "A runner has a 15 minute start at 8 km/h. A chaser at 12 km/h catches him. How long does the chaser run?",
          answer: "30 minutes",
          method: "Lead 2 km closed at 4 km/h.",
        },
      ],
      pyqExampleId: "03641ddd-0e2f-4fef-a513-ca387865d355",
      traps: [
        {
          title: "Using the delay as the chase time",
          body:
            "The delay only builds the lead. The chase itself lasts the lead divided by the relative speed, counted from the moment the chaser starts.",
        },
        {
          title: "Adding the chase time to the wrong start",
          body:
            "For a clock answer, add the chase time to the time the chaser set off, not to the time the one ahead set off.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdrs-towards",
      name: "Moving towards each other",
      intuition:
        "Two cars driving at each other both eat into the same gap, so the gap shrinks at the sum of their speeds. Two cars 300 km apart at 70 km/h and 80 km/h close 150 km every hour and meet in 2 hours.",
      definition:
        "- **Towards each other:** time to meet \\(= \\frac{\\text{distance apart}}{s_1 + s_2}\\).\n" +
        "- **One starts later:** move the early starter on by its speed × the delay, close what is left at the sum of the speeds, and add the result to the later start time.\n" +
        "- **Sum and difference:** two movers a distance \\(d\\) apart who meet in \\(t_1\\) going towards each other and in \\(t_2\\) going the same way have \\(s_1 + s_2 = \\frac{d}{t_1}\\) and \\(s_1 - s_2 = \\frac{d}{t_2}\\). Half the sum of these and half the difference give the two speeds.\n" +
        "- **Out and back:** when one reaches the far end and turns back, by the time they meet the two together have covered twice the distance between the ends.\n" +
        "- **Fast route:** starting together, the meeting point splits the distance in the ratio of the speeds.",
      formula: {
        label: "Meeting head on",
        latex: "t = \\frac{d}{s_1 + s_2} \\qquad s_1 + s_2 = \\frac{d}{t_1} \\qquad s_1 - s_2 = \\frac{d}{t_2}",
        symbols: [
          { symbol: "\\(d\\)", meaning: "distance between the two at the start" },
          { symbol: "\\(t_1\\)", meaning: "time to meet moving towards each other" },
          { symbol: "\\(t_2\\)", meaning: "time for the faster to catch the slower moving the same way" },
        ],
      },
      authoredExample: {
        prompt: "Two towns are 335 km apart. A bus leaves the first at 1:15 p.m. at 50 km/h towards the second. A car leaves the second at 2:45 p.m. at 80 km/h towards the first. When do they meet?",
        steps: [
          "By 2:45 p.m. the bus has gone \\(50 \\times 1.5 = 75\\) km, leaving 260 km.",
          "They close at \\(50 + 80 = 130\\) km/h, so they meet 2 hours later, at 4:45 p.m.",
          "Check: the bus covers \\(50 \\times 3.5 = 175\\) km and the car \\(80 \\times 2 = 160\\) km, and \\(175 + 160 = 335\\).",
        ],
        answer: "4:45 p.m.",
      },
      selfCheckExample: {
        prompt: "Two cyclists are 36 km apart. Riding towards each other they meet in 1 hour 30 minutes; riding the same way, the faster catches the slower in 6 hours. Find their speeds.",
        steps: [
          "Sum \\(= \\frac{36}{1.5} = 24\\) km/h; difference \\(= \\frac{36}{6} = 6\\) km/h.",
          "Speeds: \\(\\frac{24 + 6}{2} = 15\\) and \\(\\frac{24 - 6}{2} = 9\\) km/h.",
        ],
        answer: "15 km/h and 9 km/h",
      },
      practiceSet: [
        {
          prompt: "Two trains 450 km apart run towards each other at 70 km/h and 80 km/h. After how long do they meet?",
          answer: "3 hours",
        },
        {
          prompt: "A and B walk from P towards Q, 30 km away, at 4 km/h and 6 km/h. B reaches Q, turns back at once and meets A. How far from P do they meet?",
          answer: "24 km",
          method: "Together they cover 60 km at 10 km/h, which takes 6 hours; A walks 24 km.",
        },
        {
          prompt: "Two people 12 km apart walk towards each other at speeds in the ratio 1 : 2. How far does the slower one walk before they meet?",
          answer: "4 km",
        },
        {
          prompt: "Two cars 240 km apart drive towards each other and meet in 2 hours. What is the sum of their speeds?",
          answer: "120 km/h",
        },
      ],
      pyqExampleId: "7380041c-52ba-45f1-ac5c-9bf96ea45e89",
      traps: [
        {
          title: "Subtracting the speeds for movers coming towards each other",
          body:
            "Head on, both close the gap, so the speeds add. The difference is only for one catching up with another going the same way.",
        },
        {
          title: "Forgetting the early starter's lead",
          body:
            "When one sets off an hour earlier, the distance still to close when the second starts is the full distance minus what the first covered in that hour.",
        },
        {
          title: "Out and back: closing only the one-way distance",
          body:
            "When one mover reaches the far end and turns back to meet the other, together they have covered twice the distance between the ends, not once.",
        },
      ],
    },
  ],
};
