import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_RELATIVE_NOTE: SubtopicNote = {
  subtopicName: "Relative Speed and Meeting",
  title: "Relative Speed: Meeting, Separating and Chasing",
  oneLineDefinition:
    "Two moving things close or open the gap between them at the sum of their speeds when they go opposite ways, and at the difference when they go the same way.",
  whyItMatters:
    "AFCAT set this in 2018 and 2019, both EASY. Most of the page is one decision, add or subtract, but the HARD questions hide it behind a late start, a head start, or speeds worked out from the times after meeting.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-relative-speed",
      name: "Adding or subtracting the speeds",
      intuition:
        "Sit on one of the two movers. The other seems to move at the sum of the speeds if you are going opposite ways, and at the difference if you are going the same way.",
      definition:
        "- **Opposite directions** (towards each other or apart): relative speed \\(= a + b\\).\n" +
        "- **Same direction:** relative speed \\(= a - b\\).\n" +
        "- Gap after \\(t\\) hours \\(=\\) relative speed \\(\\times t\\). Time to reach a gap \\(=\\) gap \\(\\div\\) relative speed.\n" +
        "- 'One is 8 km/h faster' or 'one is \\(\\tfrac35\\) of the other': write both speeds with one unknown, then use the sum or difference.",
      formula: {
        label: "Relative speed",
        latex: "v_{\\text{rel}} = a + b \\;(\\text{opposite}), \\qquad v_{\\text{rel}} = a - b \\;(\\text{same way})",
      },
      authoredExample: {
        prompt: "Two cyclists leave the same point at 15 km/h and 12 km/h. How far apart are they after 2 h if they ride (a) the same way, (b) opposite ways?",
        steps: [
          "(a) The gap grows at \\(15 - 12 = 3\\) km/h: \\(3 \\times 2 = 6\\) km.",
          "(b) The gap grows at \\(15 + 12 = 27\\) km/h: \\(27 \\times 2 = 54\\) km.",
        ],
        answer: "6 km; 54 km.",
      },
      selfCheckExample: {
        prompt: "Two buses leave a depot in opposite directions, one 8 km/h faster than the other. After 2.5 h they are 270 km apart. Find the slower bus's speed.",
        steps: [
          "Together they open the gap at \\(270 \\div 2.5 = 108\\) km/h.",
          "\\(v + (v + 8) = 108\\), so \\(v = 50\\).",
        ],
        answer: "50 km/h.",
      },
      practiceSet: [
        { prompt: "Two cars go the same way at 70 km/h and 55 km/h from one point. How far apart are they after 40 minutes?", answer: "10 km" },
        { prompt: "Two cars leave one point in opposite directions at 30 km/h and 50 km/h. When are they 200 km apart?", answer: "2.5 h" },
        { prompt: "A walker at 5 km/h and a cyclist at 15 km/h pass each other going opposite ways. What is their relative speed?", answer: "20 km/h" },
        {
          prompt: "Two cars leave one point in opposite directions, one at \\(\\tfrac23\\) of the other's speed. After 3 h they are 300 km apart. Find the faster speed.",
          answer: "60 km/h",
        },
      ],
      pyqExampleId: "d096e67a-b913-46ea-ae89-478f97ec5668",
      traps: [
        {
          title: "Moving apart still adds",
          body: "Cars driving away from each other open the gap at the sum of their speeds, just as cars driving towards each other close it at the sum. Only the same direction subtracts.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-meeting",
      name: "Meeting head on: when and where",
      intuition:
        "Two movers coming towards each other close the gap at the sum of their speeds. In the time it takes, each covers a share of the gap in proportion to its own speed.",
      definition:
        "- Time to meet \\(= \\dfrac{D}{a + b}\\).\n" +
        "- Meeting point: distance from A's end \\(= a \\times \\text{time} = \\dfrac{a}{a + b} D\\).\n" +
        "- 'One had gone \\(k\\) km more when they met': time \\(= \\dfrac{k}{a - b}\\), then \\(D = (a + b) \\times \\text{time}\\).\n" +
        "- If they carry on after meeting, the gap opens again at \\(a + b\\).\n" +
        "- Given the meeting time and \\(D\\), the sum of the speeds is \\(\\tfrac{D}{t}\\).",
      formula: {
        label: "Time and place of meeting",
        latex: "t = \\dfrac{D}{a + b}, \\qquad d_A = \\dfrac{a}{a + b} D",
      },
      authoredExample: {
        prompt: "Two towns are 360 km apart. Trains leave them at the same time towards each other at 50 km/h and 70 km/h. When and where do they meet?",
        steps: [
          "They close at 120 km/h, so they meet after \\(360 \\div 120 = 3\\) h.",
          "The first has gone \\(50 \\times 3 = 150\\) km; the second \\(70 \\times 3 = 210\\) km.",
        ],
        answer: "After 3 h, 150 km from the first town.",
      },
      selfCheckExample: {
        prompt: "Two trains run towards each other at 45 km/h and 60 km/h. When they meet, the faster has gone 60 km more than the slower. How far apart did they start?",
        steps: [
          "The faster gains 15 km every hour, so they met after \\(60 \\div 15 = 4\\) h.",
          "Together they covered \\(105 \\times 4 = 420\\) km.",
        ],
        answer: "420 km.",
      },
      practiceSet: [
        { prompt: "Two people 36 km apart walk towards each other at 5 km/h and 7 km/h. When do they meet?", answer: "After 3 h" },
        { prompt: "On a 210 km road, cyclists start from each end towards each other at 30 km/h and 40 km/h. How far from the first cyclist's start do they meet?", answer: "90 km" },
        { prompt: "Two walkers start 30 km apart and walk towards each other at 4 km/h and 6 km/h, carrying on after they meet. How far apart are they after 4 h?", answer: "10 km" },
        { prompt: "Two trains 400 km apart run towards each other and meet after 4 h; one is 10 km/h faster. Find their speeds.", answer: "45 and 55 km/h" },
      ],
      pyqExampleId: "d80d0711-c8b3-47aa-981a-d0a28d4f4b87",
      traps: [
        {
          title: "The faster one covers more of the gap",
          body: "At 50 km/h and 70 km/h the 360 km is shared as 150 and 210, in the ratio of the speeds, not 180 each.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-late-start",
      name: "Meeting when one starts later",
      intuition:
        "If one mover starts later, let the first run alone until the second sets off. Then the gap that is left closes at the sum of the speeds.",
      definition:
        "- Distance run alone \\(=\\) first speed \\(\\times\\) head time. Gap left \\(= D -\\) that.\n" +
        "- Time after the second starts \\(= \\dfrac{\\text{gap left}}{a + b}\\). Add the head time if the answer is counted from the first start.\n" +
        "- Timetable questions: each speed is \\(D\\) divided by that train's journey time. \\(D\\) is unknown but cancels.",
      formula: {
        label: "A late second start",
        latex: "t' = \\dfrac{D - a\\,t_0}{a + b}",
      },
      authoredExample: {
        prompt: "Towns P and Q are 400 km apart. A car leaves P at 7 am at 40 km/h; another leaves Q at 8 am at 50 km/h towards P. When do they meet?",
        steps: [
          "By 8 am the first car has gone 40 km, leaving 360 km.",
          "From 8 am they close at 90 km/h: \\(360 \\div 90 = 4\\) h.",
          "8 am plus 4 h.",
        ],
        answer: "12 noon.",
      },
      selfCheckExample: {
        prompt: "A train leaves A at 6 am and reaches B at 10 am. Another leaves B at 8 am and reaches A at 12 noon. When do they cross?",
        steps: [
          "Both take 4 h, so each runs at \\(\\tfrac D4\\) per hour.",
          "By 8 am the first has covered \\(\\tfrac D2\\), leaving \\(\\tfrac D2\\).",
          "They close at \\(\\tfrac D2\\) per hour, so it takes 1 h.",
        ],
        answer: "9 am.",
      },
      practiceSet: [
        { prompt: "Two cities are 290 km apart. A train leaves the first at 9 am at 40 km/h; another leaves the second at 10 am at 85 km/h towards it. When do they meet?", answer: "12 noon" },
        { prompt: "A starts from P towards Q, 260 km away, at 30 km/h. Two hours later B starts from Q towards P at 50 km/h. How long after A's start do they meet?", answer: "4.5 h" },
        { prompt: "A starts from P towards Q, 260 km away, at 30 km/h. Two hours later B starts from Q towards P at 50 km/h. How far from P do they meet?", answer: "135 km" },
      ],
      pyqExampleId: "c69ce317-b65a-4acc-9c50-7177cc20aecf",
      traps: [
        {
          title: "Count from the right start",
          body: "The 4 h after 8 am is from the second car's start. If the question counts from the first start, add the hour it ran alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-chase",
      name: "Chasing: catching up from behind",
      intuition:
        "A chaser gains on the one ahead at the difference of their speeds. The head start is the gap that this gain has to close.",
      definition:
        "- Catch-up time \\(= \\dfrac{\\text{head start}}{v_{\\text{chaser}} - v_{\\text{leader}}}\\).\n" +
        "- A head start in time becomes a gap: leader's speed \\(\\times\\) that time.\n" +
        "- 'How far does the thief run before he is caught': thief's speed \\(\\times\\) catch-up time. The chaser runs that plus the head start.\n" +
        "- Speeds in the ratio \\(6 : 5\\): the chaser gains 1 part while the leader runs 5, so the leader runs \\(5 \\times\\) the head start.\n" +
        "- A head start in metres and speeds in km/h: change the gain into m/s (2 km/h is \\(\\tfrac59\\) m/s).",
      formula: {
        label: "Catch-up time",
        latex: "t = \\dfrac{\\text{head start}}{v_{\\text{chaser}} - v_{\\text{leader}}}",
      },
      authoredExample: {
        prompt: "A lorry leaves a town at 40 km/h. A car follows from the same place 1 h 30 min later at 60 km/h. When and where does it catch the lorry?",
        steps: [
          "Head start: \\(40 \\times 1.5 = 60\\) km.",
          "The car gains 20 km/h, so it takes \\(60 \\div 20 = 3\\) h.",
          "In 3 h the car goes \\(60 \\times 3 = 180\\) km.",
        ],
        answer: "3 h after the car starts, 180 km from the town.",
      },
      selfCheckExample: {
        prompt: "A thief is 150 m ahead of a policeman. The thief runs at 9 km/h and the policeman at 12 km/h. How far does the policeman run to catch him?",
        steps: [
          "The gain is 3 km/h, which is \\(\\tfrac56\\) m/s, so the catch takes \\(150 \\div \\tfrac56 = 180\\) s.",
          "12 km/h is \\(\\tfrac{10}{3}\\) m/s; in 180 s that is 600 m.",
          "Check: the thief runs \\(2.5 \\times 180 = 450\\) m, and \\(450 + 150 = 600\\).",
        ],
        answer: "600 m.",
      },
      practiceSet: [
        { prompt: "A goods train leaves at 30 km/h; an express leaves the same station 1 h later at 70 km/h. How long after it starts does the express catch it?", answer: "45 minutes" },
        { prompt: "A policeman is 2 km behind a thief; they run at 10 km/h and 8 km/h. How long until he catches him?", answer: "1 h" },
        { prompt: "The speeds of a policeman and a thief are in the ratio \\(6 : 5\\), and the thief is 120 m ahead. How far does the thief run before he is caught?", answer: "600 m" },
      ],
      pyqExampleId: "18ec94b1-ed2f-4192-9f9c-e8fc4028eb17",
      traps: [
        {
          title: "The two runners cover different distances",
          body: "The thief runs 450 m and the policeman 600 m: they differ by the head start. Read which one the question asks about.",
        },
        {
          title: "A head start in time is not a distance",
          body: "'Starts 1 h 30 min later' must be turned into a gap, \\(40 \\times 1.5 = 60\\) km, before dividing by the gain.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-to-and-fro",
      name: "A bird flying to and fro",
      intuition:
        "A bird flying back and forth between two trains never stops until the trains meet. So its distance is its speed times the time the trains take to meet; the zigzags do not matter.",
      definition:
        "- Time for the two to meet \\(= \\dfrac{D}{a + b}\\).\n" +
        "- Bird's distance \\(=\\) bird's speed \\(\\times\\) that time.\n" +
        "- Where the bird starts, and which way it turns, makes no difference.",
      formula: {
        label: "The bird's distance",
        latex: "\\text{bird's distance} = v_{\\text{bird}} \\times \\dfrac{D}{a + b}",
      },
      authoredExample: {
        prompt: "Two trains 150 km apart run towards each other at 40 km/h and 35 km/h. A bird flies between them at 60 km/h until they meet. How far does it fly?",
        steps: [
          "The trains meet after \\(150 \\div 75 = 2\\) h.",
          "The bird flies for 2 h at 60 km/h.",
        ],
        answer: "120 km.",
      },
      selfCheckExample: {
        prompt: "Two cyclists 45 km apart ride towards each other at 12 km/h and 18 km/h. A fly goes back and forth between them at 40 km/h. How far does it fly?",
        steps: ["They meet after \\(45 \\div 30 = 1.5\\) h.", "\\(40 \\times 1.5 = 60\\) km."],
        answer: "60 km.",
      },
      practiceSet: [
        { prompt: "Walkers 24 km apart walk towards each other at 5 km/h and 7 km/h; a dog runs between them at 18 km/h. How far does the dog run?", answer: "36 km" },
        { prompt: "Trains 300 km apart run towards each other at 70 km/h and 80 km/h; a bird flies between them at 100 km/h. How far does it fly?", answer: "200 km" },
        { prompt: "Cyclists 50 km apart ride towards each other at 12 km/h and 13 km/h; a bird flies between them at 35 km/h. How far does it fly?", answer: "70 km" },
      ],
      pyqExampleId: "39c5edae-bd67-448c-bf57-13139156197a",
      traps: [
        {
          title: "Do not follow the zigzags",
          body: "Adding up each leg of the bird's flight is an endless sum. One multiplication, its speed times the meeting time, gives the total.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-meeting-puzzles",
      name: "Speed ratios from meeting and passing times",
      intuition:
        "After two movers meet, each still has to cover the stretch the other covered before the meeting. So the times they take after meeting reveal the ratio of their speeds.",
      definition:
        "- Two movers start together from A and B. After meeting, the one from A takes \\(t_1\\) to reach B and the one from B takes \\(t_2\\) to reach A. Then \\(\\dfrac{v_A}{v_B} = \\sqrt{\\dfrac{t_2}{t_1}}\\).\n" +
        "- They met \\(\\sqrt{t_1 t_2}\\) after starting.\n" +
        "- The same gap closed in \\(t_{\\text{opp}}\\) going opposite ways and \\(t_{\\text{same}}\\) the same way: \\(\\dfrac{a + b}{a - b} = \\dfrac{t_{\\text{same}}}{t_{\\text{opp}}}\\).\n" +
        "- One starts earlier and they meet at a new time: write both distances and equate them to the same total.",
      formula: {
        label: "Times after meeting",
        latex: "\\dfrac{v_A}{v_B} = \\sqrt{\\dfrac{t_2}{t_1}}, \\qquad t_{\\text{meet}} = \\sqrt{t_1 t_2}",
      },
      authoredExample: {
        prompt: "Two trains start at the same time from X and Y towards each other. After meeting, the one from X takes 16 h to reach Y and the one from Y takes 25 h to reach X. Find the ratio of their speeds and when they met.",
        steps: [
          "\\(\\dfrac{v_X}{v_Y} = \\sqrt{\\dfrac{25}{16}} = \\dfrac54\\).",
          "They met after \\(\\sqrt{16 \\times 25} = 20\\) h.",
          "Check: the train from Y covers in 25 h what the train from X covered in 20 h, and \\(\\tfrac{20}{25} = \\tfrac45\\) is the speed ratio Y : X.",
        ],
        answer: "\\(5 : 4\\); after 20 h.",
      },
      selfCheckExample: {
        prompt: "Going opposite ways, two runners close a gap in 1 minute; going the same way, the faster closes the same gap in 3 minutes. Find the ratio of their speeds.",
        steps: [
          "\\(\\dfrac{a + b}{a - b} = 3\\), so \\(a + b = 3a - 3b\\).",
          "\\(4b = 2a\\), so \\(a : b = 2 : 1\\).",
        ],
        answer: "\\(2 : 1\\).",
      },
      practiceSet: [
        { prompt: "After meeting, the train from A takes 8 h to reach B and the train from B takes 2 h to reach A. Find the ratio of the speeds of the train from A to the train from B.", answer: "\\(1 : 2\\)" },
        { prompt: "After meeting, two cars take 5 h and 20 h to finish. How long after starting did they meet?", answer: "10 h" },
        {
          prompt: "Two cars from P and Q drive towards each other and meet after 3 h. Had the car from P started 1 h earlier, they would have met 2.4 h after the car from Q started. Find the ratio of the speeds of P's car to Q's car.",
          answer: "\\(3 : 2\\)",
          method: "\\(3a + 3b = 3.4a + 2.4b\\).",
        },
      ],
      pyqExampleId: "a961e67b-3f4f-4a09-b5fd-03b6f70f0fd5",
      traps: [
        {
          title: "The quicker finish belongs to the faster train",
          body: "With 16 h and 25 h after meeting, the train taking 16 h is the faster one, so the ratio is \\(5 : 4\\) and not \\(4 : 5\\).",
        },
      ],
    },
  ],
};
