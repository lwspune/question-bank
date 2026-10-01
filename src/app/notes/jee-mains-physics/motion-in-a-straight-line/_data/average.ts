import type { SubtopicNote } from "@/app/notes/_types";

export const AVERAGE_SL_NOTE: SubtopicNote = {
  subtopicName: "Average Speed, Average Velocity and Relative Velocity",
  title: "Average Speed, Average Velocity and Relative Velocity",
  oneLineDefinition:
    "Average speed is total distance over total time, never the mean of the speeds; relative velocity is one velocity minus the other, so speeds add for bodies moving towards each other and subtract for bodies moving the same way.",
  whyItMatters:
    "Fourteen PYQs, eleven of them multiple choice, and one from 2026. Nine ask for an average speed over a journey in two or three legs, and five for a relative velocity between trains, cars or a walker on an escalator. Each one is a single division once the total distance and the total time are written down.",
  concepts: [
    // C1 — average speed over legs
    {
      kind: "formula" as const,
      slug: "jpsl-avg-speed",
      name: "Average speed over a journey in legs",
      intuition:
        "Average speed is the total distance divided by the total time. When the legs are equal DISTANCES, the slow leg takes longer, so the average sits below the plain mean of the speeds: it is the harmonic mean. When the legs are equal TIMES, each speed counts equally and the plain mean is right. For anything else, find the time of each leg and add.",
      definition:
        "- Average speed \\(= \\dfrac{\\text{total distance}}{\\text{total time}}\\); average velocity \\(= \\dfrac{\\text{displacement}}{\\text{time}}\\).\n" +
        "- Two equal distances at \\(v_1, v_2\\): \\(\\bar v = \\dfrac{2v_1v_2}{v_1 + v_2}\\), so \\(\\dfrac{2}{\\bar v} = \\dfrac{1}{v_1} + \\dfrac{1}{v_2}\\).\n" +
        "- Three equal distances: \\(\\bar v = \\dfrac{3}{1/v_1 + 1/v_2 + 1/v_3}\\).\n" +
        "- Two equal times at \\(v_1, v_2\\): \\(\\bar v = \\dfrac{v_1 + v_2}{2}\\).\n" +
        "- Half the distance at \\(v_1\\), the other half in two equal times at \\(v_2\\) and \\(v_3\\): the second half's speed is \\(\\dfrac{v_2 + v_3}{2}\\); then take the harmonic mean with \\(v_1\\).\n" +
        "- Unequal legs, such as x and then 3x/2: add the leg times \\(x/v_1 + 1.5x/v_2\\) and divide the total distance by them.\n" +
        "- Speeding up uniformly from rest to v covers the distance it would at v/2.",
      formula: {
        label: "Average speed",
        latex: "\\bar v = \\frac{\\text{total distance}}{\\text{total time}} \\qquad \\text{equal distances: } \\bar v = \\frac{2v_1v_2}{v_1 + v_2}",
      },
      authoredExample: {
        prompt:
          "A car covers the first third of a road at \\(20\\ \\text{km/h}\\), the next third at \\(30\\ \\text{km/h}\\) and the last third at \\(60\\ \\text{km/h}\\). Find its average speed.",
        steps: [
          "Let each third be d. The times are \\(\\dfrac{d}{20}\\), \\(\\dfrac{d}{30}\\) and \\(\\dfrac{d}{60}\\) hours.",
          "Total time \\(= d\\left(\\dfrac{3 + 2 + 1}{60}\\right) = \\dfrac{d}{10}\\).",
          "Average speed \\(= \\dfrac{3d}{d/10} = 30\\ \\text{km/h}\\), well below the plain mean of 36.7 km/h.",
        ],
        answer: "\\(30\\ \\text{km/h}\\)",
      },
      selfCheckExample: {
        prompt:
          "A runner covers half a track at \\(4\\ \\text{m/s}\\). The other half is covered in two equal time intervals at \\(6\\ \\text{m/s}\\) and \\(10\\ \\text{m/s}\\). Find the average speed.",
        steps: [
          "Equal times in the second half: its speed is \\(\\dfrac{6 + 10}{2} = 8\\ \\text{m/s}\\).",
          "The two halves are equal distances: \\(\\bar v = \\dfrac{2 \\times 4 \\times 8}{4 + 8} = \\dfrac{64}{12}\\).",
        ],
        answer: "\\(\\dfrac{16}{3} \\approx 5.33\\ \\text{m/s}\\)",
      },
      practiceSet: [
        { prompt: "Equal distances at \\(30\\ \\text{km/h}\\) and \\(60\\ \\text{km/h}\\). Average speed?", answer: "\\(40\\ \\text{km/h}\\)" },
        { prompt: "Equal times at \\(30\\ \\text{km/h}\\) and \\(60\\ \\text{km/h}\\). Average speed?", answer: "\\(45\\ \\text{km/h}\\)" },
        { prompt: "A car goes 10 km east at \\(20\\ \\text{km/h}\\) and comes back at \\(30\\ \\text{km/h}\\). Average speed and average velocity?", answer: "\\(24\\ \\text{km/h}\\) and zero" },
        { prompt: "A bus speeds up uniformly from rest to \\(60\\ \\text{km/h}\\) in time t, then runs at that speed for 2t. Average speed?", answer: "\\(50\\ \\text{km/h}\\)", method: "Distance \\(30t + 120t = 150t\\) in time 3t." },
      ],
      pyqExampleId: "c1d787fa-2b36-493b-be28-9c2772e2f028", // 9 Apr 2024: half the distance, then two equal time halves
      traps: [
        {
          title: "Averaging two speeds over equal distances",
          body: "Equal distances take unequal times, so the plain mean is wrong. At 3 km/h and 5 km/h over equal distances the average is 2·3·5/8 = 3.75 km/h, not 4 km/h.",
        },
        {
          title: "Average velocity on a round trip is zero",
          body: "If the body comes back to its start, the displacement is zero, so the average velocity is zero whatever the speeds. The average speed is not zero.",
        },
        {
          title: "Equal times inside an equal-distance leg",
          body: "When half the distance is split into two equal TIMES, average those two speeds plainly first. Only then take the harmonic mean with the first half.",
        },
      ],
    },

    // C2 — relative velocity in one dimension
    {
      kind: "formula" as const,
      slug: "jpsl-relative",
      name: "Relative velocity in one dimension",
      intuition:
        "The velocity of B as seen from A is B's velocity minus A's. Pick one direction as positive and give every velocity its sign. Two trains moving towards each other then close the gap at the sum of their speeds; two moving the same way close it at the difference. To cross, a train must cover the total length to be passed at that relative speed.",
      definition:
        "- \\(v_{BA} = v_B - v_A\\), with signs. Opposite directions: the speeds add. Same direction: they subtract.\n" +
        "- The ground seen from B moves at \\(-v_B\\).\n" +
        "- Crossing time \\(= \\dfrac{\\text{sum of the lengths to pass}}{\\text{relative speed}}\\): two trains pass each other in \\((L_1 + L_2)/v_{rel}\\); a train clears a tunnel or bridge in \\((L_{train} + L_{tunnel})/v\\).\n" +
        "- A passenger watching another train go by sees only that train's length pass.\n" +
        "- Walking on a moving escalator: the speeds add, so \\(\\dfrac{1}{t} = \\dfrac{1}{t_1} + \\dfrac{1}{t_2}\\), giving \\(t = \\dfrac{t_1t_2}{t_1 + t_2}\\).\n" +
        "- Convert km/h to m/s with \\(\\times \\dfrac{5}{18}\\): 36 km/h is 10 m/s, 72 km/h is 20 m/s.",
      formula: {
        label: "Relative velocity",
        latex: "v_{BA} = v_B - v_A \\qquad t_{cross} = \\frac{L_1 + L_2}{v_{rel}}",
      },
      authoredExample: {
        prompt:
          "A train 150 m long running at \\(72\\ \\text{km/h}\\) overtakes a train 100 m long running at \\(36\\ \\text{km/h}\\) on a parallel track. How long does the overtaking take?",
        steps: [
          "Same direction, so the relative speed is \\(72 - 36 = 36\\ \\text{km/h} = 10\\ \\text{m/s}\\).",
          "To overtake fully, the faster train must gain both lengths: \\(150 + 100 = 250\\ \\text{m}\\).",
          "Time \\(= 250/10 = 25\\ \\text{s}\\).",
        ],
        answer: "\\(25\\ \\text{s}\\)",
      },
      selfCheckExample: {
        prompt:
          "A girl walks up a stopped escalator in 60 s. Standing still on the moving escalator, she is carried up in 40 s. How long does she take walking up the moving escalator?",
        steps: [
          "Her speed is \\(L/60\\) and the escalator's is \\(L/40\\); they add.",
          "\\(\\dfrac{1}{t} = \\dfrac{1}{60} + \\dfrac{1}{40} = \\dfrac{2 + 3}{120} = \\dfrac{1}{24}\\).",
        ],
        answer: "\\(24\\ \\text{s}\\)",
      },
      practiceSet: [
        { prompt: "Car A goes north at \\(54\\ \\text{km/h}\\), car B south at \\(36\\ \\text{km/h}\\). Taking north as positive, the velocity of B relative to A in m/s?", answer: "\\(-25\\ \\text{m/s}\\)" },
        { prompt: "Two trains, each 100 m long, pass each other in opposite directions at \\(36\\ \\text{km/h}\\) and \\(54\\ \\text{km/h}\\). Crossing time?", answer: "\\(8\\ \\text{s}\\)" },
        { prompt: "A 200 m train at \\(72\\ \\text{km/h}\\) crosses a 300 m bridge. Time taken?", answer: "\\(25\\ \\text{s}\\)" },
        { prompt: "Car A at \\(20\\ \\text{m/s}\\) is 100 m behind car B at \\(15\\ \\text{m/s}\\), same direction. When does A catch B?", answer: "\\(20\\ \\text{s}\\)" },
      ],
      pyqExampleId: "d6cec894-4695-40e6-b3e5-bdc4c3084a4c", // 13 Apr 2023: passenger watches a train in the opposite direction
      traps: [
        {
          title: "Forgetting the train's own length",
          body: "A train has cleared a tunnel only when its last coach leaves, so the distance is tunnel length plus train length. Using the tunnel alone gives too short a time.",
        },
        {
          title: "Subtracting speeds for trains approaching each other",
          body: "With one direction taken positive, the other train's velocity is negative. v_B − v_A then has the size of the SUM of the speeds.",
        },
        {
          title: "Leaving speeds in km/h",
          body: "Lengths are in metres and times in seconds, so convert first. 108 km/h is 30 m/s; 18 km/h is 5 m/s.",
        },
      ],
    },
  ],
};
