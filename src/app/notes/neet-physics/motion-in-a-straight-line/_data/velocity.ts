import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MS_VELOCITY_NOTE: SubtopicNote = {
  subtopicName: "Speed, Velocity and Relative Motion",
  title: "Speed, Velocity and Relative Motion",
  oneLineDefinition:
    "Distance against displacement, average speed against average velocity, and the velocity of one body as seen from another moving along the same line.",
  whyItMatters:
    "Three NEET questions, from 2023 to 2026. Two ask for an average speed: half a journey at v and half at 2v in 2023, and a particle that turns back, given by its position equation, in Re-NEET 2026. The third, in NEET 2025, finds the speed and timing of buses from how often they pass a moving scooter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphms-average",
      name: "Average speed and average velocity",
      intuition:
        "Distance is the whole length of the path, so it never goes down. Displacement is only the change in position, with a sign that shows the direction. Average speed uses the distance and average velocity uses the displacement, so the two differ as soon as a body turns back. A trip that ends where it started has zero average velocity but a real average speed. To average speeds, always go back to total distance over total time: the plain mean of two speeds is right only when the times are equal.",
      definition:
        "- **Average speed** = total distance ÷ total time. **Average velocity** = displacement ÷ time = \\(\\dfrac{x_2 - x_1}{t_2 - t_1}\\).\n" +
        "- Average speed is never less than the size of the average velocity. They are equal only if the body never turns back.\n" +
        "- Equal distances at \\(v_1\\) and \\(v_2\\): \\(v_{av} = \\dfrac{2v_1v_2}{v_1 + v_2}\\), always below the plain mean.\n" +
        "- Equal times at \\(v_1\\) and \\(v_2\\): \\(v_{av} = \\dfrac{v_1 + v_2}{2}\\).\n" +
        "- Three equal distances: \\(\\dfrac{3}{v_{av}} = \\dfrac{1}{v_1} + \\dfrac{1}{v_2} + \\dfrac{1}{v_3}\\).\n" +
        "- A body with \\(x = pt^{2} + qt + r\\) turns back at \\(t = -\\dfrac{q}{2p}\\). Find the position there and add the distance of each leg.",
      formula: {
        label: "Average speed",
        latex:
          "\\bar{v} = \\frac{\\text{total distance}}{\\text{total time}}, \\qquad v_{av} = \\frac{2v_1v_2}{v_1 + v_2}\\ \\text{(equal distances)}",
        symbols: [
          { symbol: "\\(v_1, v_2\\)", meaning: "speeds on the two equal stretches" },
          { symbol: "\\(\\bar{v}\\)", meaning: "average speed" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle moves 30 m east in 10 s, then 10 m west in the next 10 s. Find its average speed and its average velocity.",
        steps: [
          "Distance \\(= 30 + 10 = 40\\ \\text{m}\\) in 20 s, so average speed \\(= \\dfrac{40}{20} = 2\\ \\text{m/s}\\).",
          "Displacement \\(= 30 - 10 = 20\\ \\text{m}\\) east, so average velocity \\(= \\dfrac{20}{20} = 1\\ \\text{m/s}\\) east.",
        ],
        answer: "2 m/s; 1 m/s east",
      },
      selfCheckExample: {
        prompt:
          "A car covers three equal stretches of a straight road at 10 m/s, 20 m/s and 30 m/s. What is its average speed?",
        steps: [
          "\\(\\dfrac{3}{v_{av}} = \\dfrac{1}{10} + \\dfrac{1}{20} + \\dfrac{1}{30} = \\dfrac{6 + 3 + 2}{60} = \\dfrac{11}{60}\\).",
          "\\(v_{av} = \\dfrac{180}{11} \\approx 16.4\\ \\text{m/s}\\), less than the plain mean of 20 m/s.",
        ],
        answer: "\\(\\dfrac{180}{11} \\approx 16.4\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "A boy walks 4 km to a shop and straight back home in 2 h. Find his average speed and average velocity.", answer: "4 km/h; zero" },
        { prompt: "A car runs for 1 h at 40 km/h and then for 1 h at 60 km/h. What is its average speed?", answer: "50 km/h" },
        { prompt: "Can the size of the average velocity ever be more than the average speed?", answer: "No; it can at most be equal" },
        { prompt: "A particle's position is \\(x = t^{2} - 4t\\) (x in metres, t in seconds). What distance does it travel in the first 4 s?", answer: "8 m", method: "It turns back at \\(t = 2\\ \\text{s}\\), where \\(x = -4\\ \\text{m}\\): 4 m out and 4 m back." },
      ],
      pyqExampleId: "0fd9355a-73a8-425f-8d40-c72ad53439bf",
      traps: [
        {
          title: "Do not take the plain mean of two speeds",
          body: "Over equal distances the average speed is \\(\\dfrac{2v_1v_2}{v_1 + v_2}\\). Speeds of 40 km/h and 60 km/h over equal distances give 48 km/h, not 50 km/h.",
        },
        {
          title: "A round trip has zero average velocity",
          body: "A body that comes back to its start has zero displacement, so its average velocity is zero. Its average speed is the full distance over the full time, which is not zero.",
        },
        {
          title: "Split the path where the body turns back",
          body: "If the velocity changes sign inside the interval, the displacement is smaller than the distance. Find where \\(v = 0\\), then add the distances of the two legs.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphms-relative",
      name: "Relative velocity in one dimension",
      intuition:
        "How fast a body seems to move depends on who is watching. Seen from a car, a car beside it at the same speed looks still, and a car coming the other way looks very fast. Along a straight line, the velocity of B as seen from A is just B's velocity minus A's. Bodies moving the same way close the gap at the difference of their speeds, and bodies moving towards each other close it at the sum.",
      definition:
        "- Velocity of B relative to A: \\(v_{BA} = v_B - v_A\\), and \\(v_{AB} = -v_{BA}\\).\n" +
        "- Same direction: relative speed \\(= |v_B - v_A|\\). Opposite directions: relative speed \\(= v_A + v_B\\).\n" +
        "- Time to meet or overtake \\(=\\) the gap between them \\(\\div\\) the relative speed.\n" +
        "- For one train passing another, the gap to cover is the sum of the two lengths.\n" +
        "- Equal velocities: each sees the other at rest, and the gap between them stays the same.",
      formula: {
        label: "Relative velocity",
        latex: "v_{BA} = v_B - v_A, \\qquad t = \\frac{\\text{gap}}{\\text{relative speed}}",
        symbols: [
          { symbol: "\\(v_{BA}\\)", meaning: "velocity of B as seen from A" },
        ],
      },
      authoredExample: {
        prompt:
          "Two trains, 150 m and 100 m long, run on parallel tracks in opposite directions at 54 km/h and 36 km/h. How long do they take to cross each other completely?",
        steps: [
          "\\(54\\ \\text{km/h} = 15\\ \\text{m/s}\\) and \\(36\\ \\text{km/h} = 10\\ \\text{m/s}\\). Opposite directions, so the relative speed is \\(15 + 10 = 25\\ \\text{m/s}\\).",
          "The gap to cover is \\(150 + 100 = 250\\ \\text{m}\\).",
          "\\(t = \\dfrac{250}{25} = 10\\ \\text{s}\\).",
        ],
        answer: "10 s",
      },
      selfCheckExample: {
        prompt:
          "A car at 72 km/h is 200 m behind a truck at 54 km/h, both moving the same way on a straight road. After how long does the car reach the truck?",
        steps: [
          "\\(72\\ \\text{km/h} = 20\\ \\text{m/s}\\), \\(54\\ \\text{km/h} = 15\\ \\text{m/s}\\). Same direction, so the gap closes at \\(20 - 15 = 5\\ \\text{m/s}\\).",
          "\\(t = \\dfrac{200}{5} = 40\\ \\text{s}\\).",
        ],
        answer: "40 s",
      },
      practiceSet: [
        { prompt: "Two cars move the same way at 60 km/h and 45 km/h. How fast does the faster car move as seen from the slower one?", answer: "15 km/h, forwards" },
        { prompt: "Two cyclists start 400 m apart and ride towards each other at 5 m/s and 3 m/s. When do they meet?", answer: "After 50 s" },
        { prompt: "A moves east at 10 m/s and B moves west at 4 m/s. What is the velocity of B relative to A?", answer: "14 m/s west" },
        { prompt: "Two bodies move along a line with equal velocities. How does the distance between them change?", answer: "It stays the same" },
      ],
      pyqExampleId: "0091d40c-e4cb-4bb7-bd9e-d4a2bb6b68d5",
      traps: [
        {
          title: "Change km/h to m/s first",
          body: "Multiply a speed in km/h by \\(\\dfrac{5}{18}\\) to get m/s before you divide a distance in metres by it.",
        },
        {
          title: "Bodies moving towards each other add speeds",
          body: "Two bodies coming towards each other close the gap at the sum of their speeds. Subtracting gives a time that is far too long.",
        },
        {
          title: "Count both lengths when trains cross",
          body: "A train has fully passed another only when its back has cleared the other's front, so the distance covered is the sum of the two lengths, not one of them.",
        },
      ],
    },
  ],
};
