import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_CIRCULAR_NOTE: SubtopicNote = {
  subtopicName: "Circular Tracks",
  title: "Circular Tracks: Meetings, Laps and the Starting Point",
  oneLineDefinition:
    "On a closed track, two runners meet whenever the distance one has gained on the other reaches a full lap, and all of them are back at the start together after the LCM of their lap times.",
  whyItMatters:
    "A quarter of this page is HARD, the largest share in the chapter, though no AFCAT paper has set one here. The trap is treating the track as a straight road: runners going the same way meet only when the faster has gained a whole lap, and meeting somewhere is not meeting at the start.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-circ-first-meet",
      visualizationSlug: "af-circular-track",
      name: "The first meeting: opposite ways or the same way",
      intuition:
        "Running opposite ways, the two together cover one lap before they meet. Running the same way, the faster must gain one whole lap on the slower.",
      definition:
        "- Opposite directions: first meeting after \\(\\dfrac{L}{a + b}\\).\n" +
        "- Same direction: first meeting after \\(\\dfrac{L}{a - b}\\).\n" +
        "- Starting from diametrically opposite points, the gap to close is half a lap.\n" +
        "- 'Half a lap ahead' means a gain of \\(\\tfrac L2\\).\n" +
        "- 'The faster laps the slower every \\(T\\)' means \\(a - b = \\tfrac LT\\).",
      formula: {
        label: "First meeting on a track",
        latex: "t_{\\text{opp}} = \\dfrac{L}{a + b}, \\qquad t_{\\text{same}} = \\dfrac{L}{a - b}",
      },
      authoredExample: {
        prompt: "On a 600 m track two runners start together from one point at 5 m/s and 3 m/s. When do they first meet if they run (a) opposite ways, (b) the same way?",
        steps: [
          "(a) Together they cover 8 m every second, so one lap takes \\(600 \\div 8 = 75\\) s.",
          "(b) The faster gains 2 m every second, so a lap's gain takes \\(600 \\div 2 = 300\\) s.",
        ],
        answer: "75 s; 300 s.",
      },
      selfCheckExample: {
        prompt: "Two cyclists start from diametrically opposite points of a 900 m track and ride the same way at 9 m/s and 6 m/s. When does the faster first catch the slower?",
        steps: ["The gap is half a lap, 450 m.", "It closes at 3 m/s: \\(450 \\div 3 = 150\\) s."],
        answer: "150 s.",
      },
      practiceSet: [
        { prompt: "On a 500 m track two runners start together and run opposite ways at 6 m/s and 4 m/s. When do they first meet?", answer: "50 s" },
        { prompt: "On an 800 m track two runners start together the same way at 10 m/s and 6 m/s. When is the faster 200 m ahead?", answer: "50 s" },
        { prompt: "On a 1,200 m track the faster runner, at 9 m/s, laps the slower every 400 s. Find the slower speed.", answer: "6 m/s" },
        {
          prompt: "On a 300 m track two runners meet every 30 s going opposite ways and every 150 s going the same way. Find their speeds.",
          answer: "6 m/s and 4 m/s",
          method: "\\(a + b = 10\\), \\(a - b = 2\\).",
        },
      ],
      pyqExampleId: "2dace3c0-c137-43f9-bd8d-be3cdccc5f64",
      traps: [
        {
          title: "The same way needs a whole lap",
          body: "Two runners going the same way from one point next meet when the faster has gained a full lap, not half a lap. Half a lap ahead is the moment they are furthest apart.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-circ-count",
      name: "Counting meetings and laps",
      intuition:
        "After the first meeting the pattern repeats: the runners meet again each time the distance gained, or covered together, grows by another lap.",
      definition:
        "- Time between meetings \\(=\\) the first-meeting time. In a time \\(T\\), count only complete meetings: the whole number part of \\(T\\) divided by that time.\n" +
        "- The \\(n\\)th meeting comes at \\(n\\) times the first.\n" +
        "- Laps a runner has run at a meeting: its distance \\(\\div L\\).\n" +
        "- Lap times instead of speeds: work in laps per second, \\(\\tfrac{1}{t_1}\\) and \\(\\tfrac{1}{t_2}\\).\n" +
        "- Speeds in the ratio \\(p : q\\), same way: the faster has run \\(\\tfrac{p}{p - q}\\) laps when it first laps the slower.",
      formula: {
        label: "Meetings in a time T",
        latex: "n = \\dfrac{T\\,v_{\\text{rel}}}{L} \\;\\;(\\text{whole meetings only})",
      },
      authoredExample: {
        prompt: "On a 300 m track two joggers start together and run opposite ways at 4 m/s and 6 m/s. How many times do they meet in 2 minutes?",
        steps: [
          "They meet every \\(300 \\div 10 = 30\\) s.",
          "In 120 s: at 30, 60, 90 and 120 s.",
        ],
        answer: "4 times.",
      },
      selfCheckExample: {
        prompt: "On a 1,000 m track A runs at 9 m/s and B at 5 m/s, the same way. How many times does A lap B in 15 minutes?",
        steps: ["A gains a lap every \\(1000 \\div 4 = 250\\) s.", "\\(900 \\div 250 = 3.6\\), so 3 complete laps."],
        answer: "3 times.",
      },
      practiceSet: [
        { prompt: "On a 400 m track two runners go the same way at 7 m/s and 3 m/s. When does the faster lap the slower for the third time?", answer: "300 s" },
        { prompt: "A laps a track in 30 s and B in 50 s, the same way. When does A first gain a lap on B?", answer: "75 s", method: "\\(\\tfrac{1}{30} - \\tfrac{1}{50} = \\tfrac{1}{75}\\) lap per second." },
        { prompt: "Two runners' speeds are in the ratio \\(4 : 3\\), the same way. How many laps has the faster run when it first laps the slower?", answer: "4 laps" },
      ],
      pyqExampleId: "7b4d0c9c-d97d-406b-942c-95fffa03b191",
      traps: [
        {
          title: "Whole meetings only",
          body: "If the time allows 3.6 laps of gain, A has lapped B 3 times. The fourth lapping has not happened yet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-circ-start-point",
      name: "Back at the start together",
      intuition:
        "A runner is back at the start after every whole lap. All the runners are there together at a common multiple of their lap times, and the first such moment is the LCM.",
      definition:
        "- Lap time \\(= \\dfrac{L}{\\text{speed}}\\). Together at the start after the LCM of the lap times.\n" +
        "- A fractional lap time such as \\(\\tfrac{400}{3}\\) s: the LCM of fractions is the LCM of the numerators over the HCF of the denominators.\n" +
        "- Meeting anywhere on the track (the first concept) is different from meeting at the start.\n" +
        "- Positions after a time: the distance run, less whole laps. The gap between two runners is the shorter way round.",
      formula: {
        label: "Together at the start",
        latex: "T_{\\text{start}} = \\text{LCM}(t_1, t_2, t_3)",
      },
      authoredExample: {
        prompt: "Three runners lap a track in 40 s, 50 s and 75 s. When are they next together at the start?",
        steps: [
          "\\(40 = 2^3 \\cdot 5\\), \\(50 = 2 \\cdot 5^2\\), \\(75 = 3 \\cdot 5^2\\).",
          "LCM \\(= 2^3 \\cdot 3 \\cdot 5^2 = 600\\) s.",
        ],
        answer: "After 600 s, that is 10 minutes.",
      },
      selfCheckExample: {
        prompt: "On a 1,000 m track A runs at 5 m/s and B at 4 m/s. When are they first together at the starting point?",
        steps: ["Lap times 200 s and 250 s.", "LCM(200, 250) \\(= 1000\\) s."],
        answer: "After 1,000 s.",
      },
      practiceSet: [
        { prompt: "Two runners lap a track in 36 s and 48 s. When are they next together at the start?", answer: "144 s" },
        { prompt: "On a 1,200 m track three runners run at 8, 12 and 15 m/s. When are they all together at the start?", answer: "1,200 s" },
        {
          prompt: "On a 500 m track A laps in 100 s and B in 125 s, the same way. How far apart are they on the track after 5 minutes?",
          answer: "200 m",
          method: "A is at the start; B has run 2.4 laps.",
        },
      ],
      pyqExampleId: "b4560c60-1924-40d6-ade6-ea9833e3c474",
      traps: [
        {
          title: "Meeting is not meeting at the start",
          body: "At 6 m/s and 4 m/s on a 300 m track, opposite runners first meet after 30 s, but they are both at the start only after the LCM of their lap times, 50 s and 75 s, which is 150 s.",
        },
      ],
    },
  ],
};
