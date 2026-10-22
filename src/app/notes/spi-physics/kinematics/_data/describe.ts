import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_KM_DESCRIBE_NOTE: SubtopicNote = {
  subtopicName: "Distance, Displacement and Speed",
  title: "Distance, Displacement and Speed",
  oneLineDefinition:
    "Motion is always measured against something; distance is the length of the path, displacement is the straight line from start to finish, and average speed is total distance over total time.",
  whyItMatters:
    "Three questions in the bank, two EASY and one MODERATE: a passenger in a train, the displacement on a circular path, and the speed needed to reach a target average. The circle and the average are where marks go, because the tempting answers (the arc length, the mean of two speeds) are printed as options.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spikmde-relative",
      name: "Rest and motion depend on what you compare with",
      intuition:
        "A book on a seat in a bus does not move compared with the seat, but it does move compared with the road. So 'at rest' or 'in motion' only means something once you say compared with what.",
      definition:
        "- A body is **at rest** if its position does not change compared with its surroundings, and **in motion** if it does.\n" +
        "- The thing you compare with is the **reference point** (or frame of reference).\n" +
        "- So **rest and motion are relative**: the same body can be at rest compared with one thing and in motion compared with another, **at the same time**.",
      table: {
        columns: ["Body", "At rest compared with", "In motion compared with"],
        rows: [
          { cells: ["A passenger sitting in a moving bus", "The bus and the other passengers", "The road and the trees outside"] },
          { cells: ["A tree by the road", "The ground", "A passenger in a passing bus"] },
          { cells: ["A pilot flying a plane", "The plane", "The ground"] },
        ],
        caption: "Answer 'rest or motion?' with both, once you name the two reference points.",
      },
      selfCheckExample: {
        prompt: "A girl sits still in a moving lift. Is she at rest or in motion?",
        steps: [
          "Compared with the lift, her position does not change: she is at rest.",
          "Compared with the building, her position changes: she is in motion.",
        ],
        answer: "Both: at rest relative to the lift and in motion relative to the building.",
      },
      practiceSet: [
        { prompt: "What is the thing you compare a body's position with, to decide whether it moves, called?", answer: "The reference point (frame of reference)" },
        { prompt: "A bag lies on the rack of a moving bus. Is it at rest compared with the bus?", answer: "Yes" },
        { prompt: "To a passenger in a moving bus, do the trees outside seem at rest or in motion?", answer: "In motion" },
      ],
      pyqExampleId: "d2bceaf6-a55b-46f1-ace7-697d8e5d8692",
      traps: [
        {
          title: "Picking only one of rest and motion",
          body:
            "A body can be at rest and in motion at the same time, compared with two different things. When the options include 'both', that is the answer for a passenger in a moving vehicle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spikmde-displacement",
      name: "Distance and displacement",
      intuition:
        "Distance is what the odometer counts: every metre of the path. Displacement only cares where you started and where you stopped, and measures the straight line between them with a direction.",
      definition:
        "- **Distance** is the length of the actual path. It has size only, and it can never be zero once the body has moved.\n" +
        "- **Displacement** is the straight-line length from the start to the end, in a given direction.\n" +
        "- Displacement is never more than distance. They are equal only when the body moves in a straight line without turning back.\n" +
        "- Back at the start, displacement is **zero**, however long the path.\n" +
        "- On a circle of radius r, one full round is a distance of \\(2\\pi r\\) and a displacement of 0.",
      formula: {
        label: "Distance and displacement",
        latex:
          "\\text{displacement} \\le \\text{distance} \\qquad \\text{circumference of a circle} = 2\\pi r",
      },
      authoredExample: {
        prompt: "A boy walks 3 km east and then 4 km north. Find the distance he walks and his displacement.",
        steps: [
          "Distance is the whole path: \\(3 + 4 = 7\\) km.",
          "East and north are at right angles, so the start, the turn and the end make a right triangle.",
          "Displacement is its hypotenuse: \\(\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5\\) km.",
        ],
        answer: "Distance 7 km, displacement 5 km.",
      },
      selfCheckExample: {
        prompt: "A runner goes a quarter of the way round a circular track of radius 7 m. Find the distance covered and the displacement. Take \\(\\pi = \\frac{22}{7}\\).",
        steps: [
          "Distance: a quarter of the circumference, \\(\\frac{1}{4} \\times 2 \\times \\frac{22}{7} \\times 7 = 11\\) m.",
          "The start and the end are two radii at right angles, so the displacement is \\(\\sqrt{7^2 + 7^2} = 7\\sqrt{2} \\approx 9.9\\) m.",
        ],
        answer: "Distance 11 m, displacement \\(7\\sqrt{2} \\approx 9.9\\) m.",
      },
      practiceSet: [
        { prompt: "A man walks 10 m forward and then 10 m back along the same line. What is his displacement?", answer: "0" },
        { prompt: "An athlete runs one full lap of a 400 m track. What are the distance and the displacement?", answer: "Distance 400 m, displacement 0" },
        { prompt: "A car moves 5 km straight north without turning. Compare its distance and displacement.", answer: "Both are 5 km." },
        { prompt: "A cyclist goes 6 km south and then 8 km west. What is the displacement?", answer: "\\(\\sqrt{36 + 64} = 10\\) km" },
      ],
      pyqExampleId: "01881cf2-096e-4e8e-9149-26c8b766b3b9",
      traps: [
        {
          title: "Giving the arc length as the displacement",
          body:
            "On a circular path the arc is the distance. The displacement is the straight chord from start to end: across the full width of the circle, it is the diameter, 2r.",
        },
        {
          title: "Thinking a full round is far away",
          body: "After one complete round the body is back where it began, so the displacement is zero, even though the distance is \\(2\\pi r\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spikmde-speed",
      name: "Average speed over two or more parts of a journey",
      intuition:
        "Average speed is not the average of the speeds. It is one total divided by another: how far you went altogether, over how long it took altogether.",
      definition:
        "- **Speed** \\(=\\) distance \\(\\div\\) time. Its SI unit is m/s.\n" +
        "- **Average speed** \\(=\\) total distance \\(\\div\\) total time, adding up every part of the journey.\n" +
        "- Change minutes into hours before using km/h: 20 minutes is \\(\\frac{1}{3}\\) h.\n" +
        "- To change km/h into m/s, multiply by \\(\\frac{5}{18}\\); to go back, multiply by \\(\\frac{18}{5}\\).\n" +
        "- To find the speed needed for a target average: total distance needed \\(=\\) target average \\(\\times\\) total time; subtract what is already covered; divide by the time left.",
      formula: {
        label: "Average speed",
        latex:
          "\\text{average speed} = \\frac{\\text{total distance}}{\\text{total time}} \\qquad 1\\ \\text{km/h} = \\frac{5}{18}\\ \\text{m/s}",
      },
      authoredExample: {
        prompt: "A car goes 60 km to a town at 30 km/h and comes back the same 60 km at 60 km/h. Find its average speed for the whole trip.",
        steps: [
          "Time going: \\(\\frac{60}{30} = 2\\) h. Time coming back: \\(\\frac{60}{60} = 1\\) h.",
          "Total distance \\(= 120\\) km, total time \\(= 3\\) h.",
          "Average speed \\(= \\frac{120}{3} = 40\\) km/h, not the 45 km/h you get by averaging 30 and 60.",
        ],
        answer: "40 km/h",
      },
      selfCheckExample: {
        prompt: "A cyclist rides for 15 minutes at 12 km/h and then for 45 minutes at 16 km/h. Find the average speed.",
        steps: [
          "First part: \\(12 \\times \\frac{1}{4} = 3\\) km. Second part: \\(16 \\times \\frac{3}{4} = 12\\) km.",
          "Total 15 km in 1 hour, so the average speed is 15 km/h.",
        ],
        answer: "15 km/h",
      },
      practiceSet: [
        { prompt: "A train covers 120 km in 2 hours and then 180 km in 3 hours. What is its average speed?", answer: "\\(\\frac{300}{5} = 60\\) km/h" },
        { prompt: "Change 72 km/h into m/s.", answer: "\\(72 \\times \\frac{5}{18} = 20\\) m/s" },
        { prompt: "A runner covers 4 km in the first 30 minutes. How fast must she run for the next 30 minutes to average 10 km/h over the hour?", answer: "She needs 10 km in all, so 6 km in half an hour: 12 km/h." },
        { prompt: "A girl walks 100 m in 20 s. What is her speed?", answer: "5 m/s" },
      ],
      pyqExampleId: "04cf8503-60c6-4f79-9531-968b3e8da559",
      traps: [
        {
          title: "Averaging the two speeds",
          body:
            "When the times are different, the mean of the two speeds is wrong. Find the total distance and the total time first; only equal TIMES make the simple mean right.",
        },
        {
          title: "Using minutes with km/h",
          body: "15 minutes at 8 km/h is \\(8 \\times \\frac{1}{4} = 2\\) km, not 120 km. Turn minutes into hours (divide by 60) before multiplying.",
        },
      ],
    },
  ],
};
