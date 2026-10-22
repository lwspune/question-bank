import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_KI_LINE_NOTE: SubtopicNote = {
  subtopicName: "Motion in a Straight Line",
  title: "Motion in a Straight Line",
  oneLineDefinition:
    "Distance and displacement, average speed, the three equations of uniform acceleration, and what the slope and the area of a motion graph tell you.",
  whyItMatters:
    "Ten CDS questions from 2018 (II) to 2025 (II), nine of them MODERATE. Four are short sums on the equations of motion, three ask for a displacement or an average speed, and three read a motion graph.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphki-displacement",
      name: "Distance, displacement and average speed",
      intuition:
        "Distance is the length of the path you actually walk. Displacement is the straight-line gap from where you started to where you stopped, with a direction. Run once round a track and you have covered a lot of distance, but your displacement is zero, because you are back at the start. Average speed is always total distance divided by total time, never the plain average of two speeds.",
      definition:
        "The rules:\n" +
        "- **Distance** is a scalar and never decreases. **Displacement** is a vector: final position minus starting position.\n" +
        "- On a **circular track**, after any **whole number of laps** the displacement is **zero**; after **half a lap** (or 1.5, 2.5 laps and so on) it equals the **diameter**.\n" +
        "- **Average speed** = total distance ÷ total time.\n" +
        "- Two **equal distances** at speeds \\(v_1\\) and \\(v_2\\): average speed \\(= \\dfrac{2v_1v_2}{v_1 + v_2}\\), which is always less than the plain average.\n" +
        "- Two **equal times** at speeds \\(v_1\\) and \\(v_2\\): average speed \\(= \\dfrac{v_1 + v_2}{2}\\).",
      formula: {
        label: "Average speed",
        latex:
          "\\bar{v} = \\dfrac{\\text{total distance}}{\\text{total time}} \\qquad \\bar{v}_{\\text{equal distances}} = \\dfrac{2v_1v_2}{v_1 + v_2} \\qquad \\bar{v}_{\\text{equal times}} = \\dfrac{v_1 + v_2}{2}",
        symbols: [
          { symbol: "v₁, v₂", meaning: "the speeds on the two parts of the trip" },
        ],
      },
      authoredExample: {
        prompt:
          "A cyclist goes round a circular track of radius 35 m, taking 40 s for each lap. Find the distance covered and the displacement after 100 s. (Take \\(\\pi = 22/7\\).)",
        steps: [
          "Number of laps in 100 s: \\(100 \\div 40 = 2.5\\).",
          "One lap is the circumference, \\(2\\pi r = 2 \\times \\tfrac{22}{7} \\times 35 = 220\\) m, so the distance is \\(2.5 \\times 220 = 550\\) m.",
          "After 2 whole laps the cyclist is back at the start; the extra half lap ends at the point opposite, one diameter away.",
          "Displacement = diameter = \\(2 \\times 35 = 70\\) m.",
        ],
        answer: "Distance 550 m; displacement 70 m.",
      },
      selfCheckExample: {
        prompt: "A car goes from town P to town Q at 30 km/h and comes back by the same road at 60 km/h. Find its average speed for the round trip.",
        steps: [
          "The two legs cover equal distances, so use \\(\\dfrac{2v_1v_2}{v_1 + v_2}\\).",
          "\\(\\dfrac{2 \\times 30 \\times 60}{30 + 60} = \\dfrac{3600}{90} = 40\\) km/h.",
        ],
        answer: "40 km/h (not 45 km/h).",
      },
      pyqExampleId: "e4a6722e-f805-4a38-b1c8-7c0179b39c98",
      practiceSet: [
        { prompt: "A girl walks 300 m east and then 300 m back west. What are her distance and displacement?", answer: "Distance 600 m; displacement 0" },
        { prompt: "A bus travels for one hour at 40 km/h and for the next hour at 60 km/h. What is its average speed?", answer: "50 km/h", method: "Equal times: the plain average" },
        { prompt: "A runner covers a quarter of a circular track of radius 7 m. What is the size of the displacement?", answer: "\\(7\\sqrt{2}\\) m", method: "The two radii are at right angles" },
        { prompt: "Can the displacement of a body be larger than the distance it has covered?", answer: "No. It can only be equal (straight-line motion in one direction) or smaller" },
      ],
      traps: [
        {
          title: "Half a lap gives the diameter, not half the circumference",
          body: "Displacement is the **straight line** between start and finish. After half a lap that line is the **diameter**. Half the circumference is the **distance** walked, which is a different answer.",
        },
        {
          title: "Average speed over equal distances is not the plain average",
          body: "Over **equal distances** the slower part takes longer, so the average is pulled down: \\(\\dfrac{2v_1v_2}{v_1 + v_2}\\). The plain average \\(\\dfrac{v_1 + v_2}{2}\\) is right only for **equal times**.",
        },
        {
          title: "Count whole laps first",
          body: "Divide the time by the time for one lap. A whole number of laps means **zero** displacement; a half lap left over means **one diameter**. Do this before any other working.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphki-equations",
      name: "Equations of motion for uniform acceleration",
      intuition:
        "When a body speeds up or slows down at a steady rate, three short equations link its starting velocity, final velocity, acceleration, time and displacement. Pick the one that leaves out the quantity you were not given. A fourth shortcut is often quickest: with steady acceleration the average velocity is halfway between the start and the end, so displacement is that average times the time.",
      definition:
        "For constant acceleration \\(a\\), starting velocity \\(u\\), final velocity \\(v\\), time \\(t\\) and displacement \\(s\\):\n" +
        "- \\(v = u + at\\) (no \\(s\\))\n" +
        "- \\(s = ut + \\tfrac{1}{2}at^{2}\\) (no \\(v\\))\n" +
        "- \\(v^{2} = u^{2} + 2as\\) (no \\(t\\)); for braking to rest, \\(s = \\dfrac{u^{2}}{2a}\\) with \\(a\\) the retardation.\n" +
        "- \\(s = \\dfrac{u + v}{2}\\,t\\) (no \\(a\\))\n" +
        "- Distance in the **n-th second**: \\(s_n = u + \\tfrac{a}{2}(2n - 1)\\). From rest, the distances in successive seconds go 1 : 3 : 5 : 7 : ...\n" +
        "- Keep units matched: km/h with hours, m/s with seconds.",
      formula: {
        label: "Equations of motion",
        latex:
          "v = u + at \\qquad s = ut + \\tfrac{1}{2}at^{2} \\qquad v^{2} = u^{2} + 2as \\qquad s = \\dfrac{u + v}{2}\\,t \\qquad s_n = u + \\dfrac{a}{2}(2n - 1)",
        symbols: [
          { symbol: "u, v", meaning: "starting and final velocity" },
          { symbol: "a", meaning: "constant acceleration (negative when slowing down)" },
          { symbol: "s", meaning: "displacement in time t" },
          { symbol: "sₙ", meaning: "displacement in the n-th second alone" },
        ],
      },
      authoredExample: {
        prompt: "A train running at 20 m/s brakes with a steady retardation of 4 m/s². How long does it take to stop, and how far does it go in that time?",
        steps: [
          "Time: \\(v = u + at\\) gives \\(0 = 20 - 4t\\), so \\(t = 5\\) s.",
          "Distance: \\(v^{2} = u^{2} + 2as\\) gives \\(0 = 400 - 8s\\), so \\(s = 50\\) m.",
          "Check with the average velocity: \\(\\dfrac{20 + 0}{2} \\times 5 = 50\\) m.",
        ],
        answer: "5 s, and 50 m.",
      },
      selfCheckExample: {
        prompt: "A body starts from rest with uniform acceleration. Find the ratio of the distances it covers in the third second and in the fourth second.",
        steps: [
          "From rest, \\(s_n = \\tfrac{a}{2}(2n - 1)\\), so \\(s_n\\) is proportional to \\(2n - 1\\).",
          "Third second: \\(2 \\times 3 - 1 = 5\\). Fourth second: \\(2 \\times 4 - 1 = 7\\).",
        ],
        answer: "5 : 7",
      },
      pyqExampleId: "dca9342f-7873-40fa-81e5-cf99f0686a85",
      practiceSet: [
        { prompt: "A body starts from rest with an acceleration of 2 m/s². What is its velocity after 5 s?", answer: "10 m/s", method: "\\(v = u + at\\)" },
        { prompt: "A scooter speeds up steadily from 4 m/s to 10 m/s in 2 s. How far does it go in those 2 s?", answer: "14 m", method: "Average velocity 7 m/s × 2 s" },
        { prompt: "A car starts from rest and reaches 36 km/h in 12 minutes at a steady rate. What is its acceleration in km/h²?", answer: "180 km/h²", method: "12 minutes = 0.2 h; 36 ÷ 0.2" },
        { prompt: "A body starts from rest with an acceleration of 4 m/s². How far does it go in the first second?", answer: "2 m", method: "\\(\\tfrac{1}{2} \\times 4 \\times 1^{2}\\)" },
      ],
      traps: [
        {
          title: "Change minutes into hours before dividing",
          body: "If the speed is in km/h, the time must be in **hours**. Ten minutes is \\(\\tfrac{1}{6}\\) h, not 10. Mixing the two gives an answer off by a factor of 60.",
        },
        {
          title: "The n-th second is one second, not n seconds",
          body: "The distance **in** the n-th second is \\(u + \\tfrac{a}{2}(2n - 1)\\), the gap between the distance after n seconds and after (n − 1) seconds. Using \\(\\tfrac{1}{2}an^{2}\\) gives the total from the start instead.",
        },
        {
          title: "Retardation enters with a minus sign",
          body: "When a body slows down, put \\(a\\) in as a **negative** number in \\(v = u + at\\) and \\(v^{2} = u^{2} + 2as\\), or use the stopping form \\(s = \\dfrac{u^{2}}{2a}\\) with the retardation as a positive number. Do not do both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphki-graphs",
      name: "Reading motion graphs",
      intuition:
        "A motion graph puts time along the bottom. On a distance-time graph the steepness of the line is the speed: a flat line means the body is not moving, a steeper line means it is moving faster. On a velocity-time graph the steepness is the acceleration, and the area under the line is the displacement.",
      definition:
        "Two graphs, two readings each:\n" +
        "- **Distance-time (or position-time) graph**: **slope = speed (velocity)**. Horizontal line: at rest. Straight sloping line: uniform speed. Curve getting steeper: speeding up.\n" +
        "- **Velocity-time graph**: **slope = acceleration**; **area under the graph = displacement**. Area below the time axis counts as negative.\n" +
        "- A horizontal velocity-time line means **constant velocity** (zero acceleration), not rest.\n" +
        "- A position-time graph can never be a vertical line: that would mean being in two places at one instant.",
      table: {
        columns: ["Graph and shape", "What it means"],
        rows: [
          {
            cells: ["Distance-time, horizontal line", "The body is at rest"],
            noteAmber: "CDS 2019 (II): for a body at rest, the time-distance graph is horizontal.",
            pyqExampleId: "9b71e7fa-79e2-4c17-8e1d-e4598f0c0280",
          },
          {
            cells: ["Distance-time, steeper part", "Higher speed in that part"],
            noteAmber: "CDS 2023 (II): three parts of one journey are ranked by the slope of each part.",
            pyqExampleId: "5c81dd97-628b-4b2e-b2ac-418e5affb538",
          },
          { cells: ["Velocity-time, horizontal line", "Constant velocity, zero acceleration"] },
          { cells: ["Velocity-time, slope", "Acceleration"] },
          {
            cells: ["Velocity-time, area under the line", "Displacement"],
            noteAmber: "CDS 2023 (I): the area under a velocity-time graph gives the net displacement.",
            pyqExampleId: "4aeb54dc-8aed-43be-b2c9-21ef0338780d",
          },
        ],
      },
      pyqExampleId: "9b71e7fa-79e2-4c17-8e1d-e4598f0c0280",
      selfCheckExample: {
        prompt: "On a velocity-time graph, a straight line rises from 0 to 10 m/s over 5 s. Find the acceleration and the displacement in those 5 s.",
        steps: [
          "Slope = rise ÷ run = \\(10 \\div 5 = 2\\) m/s², the acceleration.",
          "Area under the line is a triangle: \\(\\tfrac{1}{2} \\times 5 \\times 10 = 25\\) m, the displacement.",
        ],
        answer: "Acceleration 2 m/s²; displacement 25 m.",
      },
      practiceSet: [
        { prompt: "What does the slope of a velocity-time graph give?", answer: "The acceleration" },
        { prompt: "A velocity-time graph is a horizontal line above the time axis. Is the body at rest?", answer: "No. It moves with constant velocity" },
        { prompt: "On a distance-time graph, what does a straight line sloping upward show?", answer: "Uniform speed" },
        { prompt: "Why can a position-time graph never be vertical?", answer: "A vertical line would put the body at many places at the same instant" },
      ],
      traps: [
        {
          title: "Flat on one graph is not flat on the other",
          body: "A **horizontal distance-time** line means **rest**. A **horizontal velocity-time** line means **constant velocity**. Check which quantity is on the vertical axis before you read the shape.",
        },
        {
          title: "Area gives displacement, not average velocity",
          body: "The area under a velocity-time graph is the **displacement**. Divide it by the time if you want the average velocity. With part of the graph below the axis, the area gives the net displacement, not the total distance.",
        },
      ],
    },
  ],
};
