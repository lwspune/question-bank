import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TD_RELATIVE_NOTE: SubtopicNote = {
  subtopicName: "Relative Speed: Chasing and Meeting",
  title: "Relative Speed: Chasing and Meeting",
  oneLineDefinition:
    "When two things move at once, add their speeds if they approach each other and subtract them if one chases the other; a train must cover its own length plus whatever it passes.",
  whyItMatters:
    "9 questions in the Tier II bank, 8 EASY and 1 MODERATE. Nearly every one is a single relative-speed division once the gap and the right sum or difference of speeds are set up.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tdrs-meeting",
      name: "Meeting and chasing",
      visualizationSlug: "af-circular-track",
      intuition:
        "Two people walking towards each other close the gap by both their speeds together; a chaser closes it only by the difference. Treat one of them as standing still and give the other the relative speed.",
      definition:
        "- Towards each other (or opposite ways round a track): relative speed \\(= a + b\\).\n" +
        "- Same direction: relative speed \\(= a - b\\).\n" +
        "- Time to meet or catch up \\(=\\) gap \\(\\div\\) relative speed.\n" +
        "- If two start together towards each other and take \\(t_1\\) and \\(t_2\\) after meeting to finish, \\(\\frac{v_1}{v_2} = \\sqrt{\\frac{t_2}{t_1}}\\).",
      formula: {
        label: "Relative speed",
        latex: "\\text{time} = \\frac{\\text{gap}}{a \\pm b}",
      },
      authoredExample: {
        prompt: "Two towns are 180 km apart. Cars leave both at the same moment. Driving towards each other they meet in 2 hours; driving in the same direction the faster catches the slower in 9 hours. Find the two speeds.",
        steps: ["Towards each other: \\(a + b = 90\\). Same direction: \\(a - b = 20\\).", "So \\(a = 55\\) and \\(b = 35\\) km/h."],
        answer: "55 km/h and 35 km/h",
      },
      selfCheckExample: {
        prompt: "A thief runs at 8 km/h. A policeman 150 m behind starts chasing at 11 km/h. How long does he take to catch the thief?",
        steps: ["Relative speed 3 km/h \\(= \\frac{5}{6}\\) m/s.", "Time \\(= 150 \\div \\frac{5}{6} = 180\\) s, or 3 minutes."],
        answer: "3 minutes",
      },
      practiceSet: [
        { prompt: "Two people 1.2 km apart walk towards each other at 4 km/h and 5 km/h. When do they meet?", answer: "8 minutes" },
        { prompt: "On a 900 m circular track, two riders set off from the same spot in opposite directions at 5 m/s and 4 m/s. When do they first meet?", answer: "100 seconds" },
        { prompt: "A car at 60 km/h is 2 km behind a lorry at 45 km/h. How long does it take to catch up?", answer: "8 minutes" },
      ],
      pyqExampleId: "97db71a4-bc67-49a1-881a-63be894445eb",
      traps: [
        {
          title: "Adding speeds for a chase",
          body: "A chaser gains only by the DIFFERENCE of the speeds: 11 km/h after 8 km/h closes the gap at 3 km/h, not 19.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tdrs-trains",
      name: "Trains crossing",
      visualizationSlug: "af-train-platform",
      intuition:
        "A train has passed something only when its tail has gone by, so it has to travel its own length and then the length of whatever it passes. Two trains crossing cover both their lengths at their relative speed.",
      definition:
        "- Passing a pole or a person: distance \\(=\\) the train's own length.\n" +
        "- Passing a platform, bridge or tunnel: train \\(+\\) platform.\n" +
        "- Two trains crossing: the sum of their lengths (plus any gap between them), at the sum of the speeds if they approach each other, the difference if one overtakes.\n" +
        "- Change km/h to m/s with \\(\\frac{5}{18}\\) before dividing metres.",
      formula: {
        label: "Time for a train to pass",
        latex: "t = \\frac{L_1 + L_2}{v_1 \\pm v_2}",
      },
      authoredExample: {
        prompt: "A train 240 m long runs at 90 km/h. How long does it take to cross a bridge 360 m long?",
        steps: ["90 km/h \\(= 25\\) m/s; distance \\(= 240 + 360 = 600\\) m.", "Time \\(= 600 \\div 25 = 24\\) s."],
        answer: "24 seconds",
      },
      selfCheckExample: {
        prompt: "Trains of 200 m and 160 m run towards each other at 50 km/h and 58 km/h. How long do they take to pass each other completely?",
        steps: ["Relative speed \\(= 108\\) km/h \\(= 30\\) m/s.", "Time \\(= \\frac{360}{30} = 12\\) s."],
        answer: "12 seconds",
      },
      practiceSet: [
        { prompt: "A 150 m train passes a pole in 10 s. Find its speed in km/h.", answer: "54 km/h" },
        { prompt: "A 300 m train at 72 km/h crosses a platform in 25 s. How long is the platform?", answer: "200 m" },
        { prompt: "A 200 m train at 60 km/h overtakes a 100 m train at 42 km/h on a parallel track. How long does overtaking take?", answer: "60 seconds" },
      ],
      pyqExampleId: "0cc8ebac-6da6-4702-b8d3-c2ecd6a2c649",
      traps: [
        {
          title: "Leaving out the train's own length",
          body: "To cross a 360 m bridge, a 240 m train travels 600 m, not 360 m: the tail must clear the far end.",
        },
      ],
    },
  ],
};
