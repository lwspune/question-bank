import type { SubtopicNote } from "@/app/notes/_types";

export const AF_HD_TWO_POINTS_NOTE: SubtopicNote = {
  subtopicName: "Two Angles from Two Points",
  title: "Two Sightings of One Height: Same Side, Opposite Sides and Speed",
  oneLineDefinition:
    "One height seen from two points: write each distance as the height times the cotangent of its angle, then subtract the distances for points on the same side or add them for opposite sides.",
  whyItMatters:
    "Most questions here are MODERATE and a quarter are HARD: an observer walks towards a tower, two ships sit on either side of a lighthouse, or a plane moves between two sightings. Marks are lost on the sign (same side subtracts, opposite sides add) and on the last step, where the answer has to be rationalised to match the options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afhd-same-side",
      visualizationSlug: "af-two-sightings",
      name: "Two points on the same side",
      intuition:
        "Walking towards a tower raises the angle of elevation. Each point gives its own triangle, and the two triangles share the tower. Write both distances in terms of the height \\(h\\): the far one is \\(h\\cot\\alpha\\), the near one \\(h\\cot\\beta\\). The distance walked is their difference, which gives one equation in \\(h\\).",
      definition:
        "- Far point: angle \\(\\alpha\\), distance \\(h\\cot\\alpha\\). Near point: angle \\(\\beta\\) (larger), distance \\(h\\cot\\beta\\).\n" +
        "- Distance walked \\(d = h(\\cot\\alpha - \\cot\\beta)\\), so \\(h = \\dfrac{d}{\\cot\\alpha - \\cot\\beta}\\).\n" +
        "- Two shadows of one pole at two sun elevations work the same way: the difference of the shadows is the \\(d\\).\n" +
        "- Rationalise the end: \\(\\dfrac{a}{\\sqrt3 - 1} = \\dfrac{a(\\sqrt3 + 1)}{2}\\).",
      formula: {
        label: "Height from the distance walked",
        latex: "h = \\dfrac{d}{\\cot\\alpha - \\cot\\beta}",
      },
      authoredExample: {
        prompt: "From a point on level ground the top of a tower is at an elevation of 30°. After walking 20 m towards it, the elevation is 60°. Find the height of the tower.",
        steps: [
          "\\(h(\\cot 30^\\circ - \\cot 60^\\circ) = 20\\), that is \\(h\\left(\\sqrt3 - \\tfrac{1}{\\sqrt3}\\right) = 20\\).",
          "\\(\\sqrt3 - \\tfrac{1}{\\sqrt3} = \\tfrac{2}{\\sqrt3}\\), so \\(h = 20 \\times \\tfrac{\\sqrt3}{2} = 10\\sqrt3\\).",
          "Check: the two points are \\(10\\sqrt3 \\times \\sqrt3 = 30\\) m and \\(10\\sqrt3 \\times \\tfrac{1}{\\sqrt3} = 10\\) m from the foot, 20 m apart.",
        ],
        answer: "\\(10\\sqrt3\\) m.",
      },
      selfCheckExample: {
        prompt: "The top of a tower is seen at 45°. After walking 12 m closer, it is seen at 60°. Find the height.",
        steps: [
          "\\(h\\left(1 - \\tfrac{1}{\\sqrt3}\\right) = 12\\), so \\(h = \\dfrac{12\\sqrt3}{\\sqrt3 - 1}\\).",
          "Multiply by \\(\\tfrac{\\sqrt3 + 1}{\\sqrt3 + 1}\\): \\(h = 6\\sqrt3(\\sqrt3 + 1) = 6(3 + \\sqrt3)\\).",
        ],
        answer: "\\(6(3 + \\sqrt3)\\) m, about 28.4 m.",
      },
      practiceSet: [
        { prompt: "A pole's shadow is 30 m longer when the sun's elevation is 30° than when it is 60°. How tall is the pole?", answer: "\\(15\\sqrt3\\) m" },
        {
          prompt: "Two points on the same side of a tower are 40 m apart and see its top at 45° and 60°. How tall is the tower?",
          answer: "\\(20(3 + \\sqrt3)\\) m",
        },
        {
          prompt: "A tower 30 m tall is seen at 30°. The observer walks towards it until it is seen at 60°. How far did the observer walk?",
          answer: "\\(20\\sqrt3\\) m",
        },
      ],
      pyqExampleId: "b0f4293f-22a8-4d89-a891-1f831ee1a043",
      traps: [
        {
          title: "The far point has the smaller angle",
          body: "Walking towards a tower raises the angle. If the angle falls, the observer moved away, and the distance walked is still the difference of the two distances.",
        },
        {
          title: "Do not stop at the first distance",
          body: "Solving for the distance from the near point and giving it as the height is right only at 45°. At any other angle multiply by the tangent.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-cot-difference",
      name: "The same set-up with letters",
      intuition:
        "When the angles are letters, the method does not change. The distances are \\(h\\cot\\alpha\\) and \\(h\\cot\\beta\\), and their difference is the distance walked. So any question that gives the walk in terms of \\(h\\) is asking for \\(\\cot\\alpha - \\cot\\beta\\).",
      definition:
        "- Distance from the foot at elevation \\(\\theta\\): \\(h\\cot\\theta = \\dfrac{h}{\\tan\\theta}\\).\n" +
        "- Walk of \\(d\\): \\(\\cot\\alpha - \\cot\\beta = \\dfrac{d}{h}\\). If \\(d\\) is a fraction of \\(h\\), the answer is that fraction.\n" +
        "- Shadows \\(p\\) and \\(q\\) of a pole \\(s\\) tall: \\(p - q = s(\\cot\\alpha - \\cot\\beta)\\).\n" +
        "- To match options in tangents: \\(\\cot\\alpha - \\cot\\beta = \\dfrac{\\tan\\beta - \\tan\\alpha}{\\tan\\alpha\\tan\\beta}\\).",
      formula: {
        label: "The cotangent difference",
        latex: "\\cot\\alpha - \\cot\\beta = \\dfrac{d}{h}",
      },
      authoredExample: {
        prompt:
          "A tower is \\(h\\) m tall. From a point A its top is at elevation \\(\\alpha\\). After walking \\(\\tfrac{h}{3}\\) towards it, the elevation is \\(\\beta\\). Find \\(\\cot\\alpha - \\cot\\beta\\), and \\(\\cot\\beta\\) when \\(\\alpha = 45^\\circ\\).",
        steps: [
          "\\(h\\cot\\alpha - h\\cot\\beta = \\tfrac{h}{3}\\), so \\(\\cot\\alpha - \\cot\\beta = \\tfrac13\\).",
          "With \\(\\cot 45^\\circ = 1\\): \\(\\cot\\beta = 1 - \\tfrac13 = \\tfrac23\\).",
        ],
        answer: "\\(\\tfrac13\\), and \\(\\cot\\beta = \\tfrac23\\).",
      },
      selfCheckExample: {
        prompt: "The top of a tower \\(h\\) m tall is seen from a point P at an elevation \\(\\theta\\) with \\(\\cot\\theta = \\tfrac52\\). How far is P from the foot?",
        steps: ["Distance \\(= h\\cot\\theta = \\tfrac{5h}{2}\\)."],
        answer: "\\(\\tfrac{5h}{2}\\).",
      },
      practiceSet: [
        { prompt: "Walking \\(a\\) m towards a tower changes the elevation of its top from \\(\\alpha\\) to \\(\\beta\\). Write the height.", answer: "\\(\\dfrac{a}{\\cot\\alpha - \\cot\\beta}\\)" },
        { prompt: "For a tower, \\(\\cot\\alpha - \\cot\\beta = 2\\) between two points 40 m apart on the same side. How tall is it?", answer: "20 m" },
        { prompt: "A tower \\(h\\) m tall is seen at an elevation whose tangent is 3. How far away is the observer?", answer: "\\(\\tfrac{h}{3}\\)" },
      ],
      pyqExampleId: "1255ca0f-7d7f-439e-9fcf-72a3b4c532be",
      traps: [
        {
          title: "Distances use cotangent, not tangent",
          body: "The distance is \\(h\\cot\\theta\\). Subtracting \\(\\tan\\alpha - \\tan\\beta\\) gives a number with no meaning as a length.",
        },
        {
          title: "Convert to the options' form",
          body: "\\(\\tfrac{1}{\\tan\\alpha} - \\tfrac{1}{\\tan 2\\alpha} = \\tfrac{\\tan 2\\alpha - \\tan\\alpha}{\\tan\\alpha\\tan 2\\alpha}\\). The right option often prints this form, with the subtraction in the right order on top.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-opposite-sides",
      name: "Two points on opposite sides",
      intuition:
        "When the two points are on either side of the tower, east and west, or two ships on either side of a lighthouse, the tower stands between them. The distance between the points is the sum of the two distances, not the difference.",
      definition:
        "- Distance between the points \\(= h\\cot\\alpha + h\\cot\\beta = h(\\cot\\alpha + \\cot\\beta)\\).\n" +
        "- Given the distance between them, \\(h = \\dfrac{D}{\\cot\\alpha + \\cot\\beta}\\).\n" +
        "- Angles of depression from the top work the same way, since each equals the elevation from the ship.\n" +
        "- **Complementary angles:** if the two elevations add to 90°, their tangents multiply to 1, because \\(\\tan(90^\\circ - \\theta) = \\cot\\theta\\).",
      formula: {
        label: "Opposite sides add",
        latex: "D = h(\\cot\\alpha + \\cot\\beta)",
      },
      authoredExample: {
        prompt: "A tower 90 m tall is seen from two points on opposite sides of it, at elevations of 45° and 60°. How far apart are the points?",
        steps: [
          "At 45°: \\(90\\cot 45^\\circ = 90\\) m.",
          "At 60°: \\(90\\cot 60^\\circ = \\tfrac{90}{\\sqrt3} = 30\\sqrt3\\) m.",
          "Total \\(= 90 + 30\\sqrt3 = 30(3 + \\sqrt3)\\).",
        ],
        answer: "\\(30(3 + \\sqrt3)\\) m, about 142 m.",
      },
      selfCheckExample: {
        prompt: "From the top of a lighthouse 40 m high, two boats on opposite sides are both seen at an angle of depression of 45°. How far apart are they?",
        steps: ["Each is 40 m from the foot.", "They are on opposite sides, so add."],
        answer: "80 m.",
      },
      practiceSet: [
        { prompt: "A pole 30 m tall is seen from points on opposite sides at elevations of 30° and 45°. How far apart are the points?", answer: "\\(30(\\sqrt3 + 1)\\) m" },
        { prompt: "Two points 100 m apart, on opposite sides of a tower, both see its top at 45°. How tall is the tower?", answer: "50 m" },
        {
          prompt: "Points on opposite sides of a tree, \\(80(\\sqrt3 + 1)\\) m apart, see its top at 30° and 45°. How tall is the tree?",
          answer: "80 m",
        },
      ],
      pyqExampleId: "bb1cbc01-14fd-4089-88c4-9860946dbf7d",
      traps: [
        {
          title: "Opposite sides add, same side subtracts",
          body: "Read for 'opposite sides', 'east and west' or 'on either side' before writing the equation. Subtracting here gives the option for points on the same side.",
        },
        {
          title: "Both depressions are measured from one top",
          body: "Two angles of depression from one lighthouse both use the lighthouse's height. Do not use a different height for each ship.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-speed",
      name: "Speed from two sightings",
      intuition:
        "A plane flying level, or a boat or car moving on the ground, is seen at two angles a known time apart. The height is fixed, so each angle gives a horizontal distance, and the change in that distance is how far the object moved. Distance over time is the speed.",
      definition:
        "- Distance moved \\(= h\\,|\\cot\\alpha - \\cot\\beta|\\) when the object moves along a line through the foot.\n" +
        "- Speed \\(= \\dfrac{\\text{distance moved}}{\\text{time}}\\). To change m/s to km/h multiply by \\(\\tfrac{18}{5} = 3.6\\).\n" +
        "- A car approaching at a steady speed: time is in proportion to distance, so the time still needed is the time taken \\(\\times \\dfrac{\\text{distance left}}{\\text{distance covered}}\\).\n" +
        "- 'Directly overhead' means an elevation of 90°, a horizontal distance of 0.",
      formula: {
        label: "Speed",
        latex: "v = \\dfrac{h(\\cot\\alpha - \\cot\\beta)}{t}",
      },
      authoredExample: {
        prompt: "A plane flies level at a height of 1500 m. Its angle of elevation changes from 45° to 30° in 15 seconds. Find its speed.",
        steps: [
          "Horizontal distances: \\(1500\\cot 45^\\circ = 1500\\) m and \\(1500\\cot 30^\\circ = 1500\\sqrt3\\) m.",
          "It moved \\(1500(\\sqrt3 - 1) \\approx 1500 \\times 0.732 = 1098\\) m.",
          "Speed \\(= \\tfrac{1098}{15} \\approx 73.2\\) m/s, and \\(73.2 \\times 3.6 \\approx 263.5\\) km/h.",
        ],
        answer: "\\(100(\\sqrt3 - 1)\\) m/s, about 73.2 m/s or 263.5 km/h.",
      },
      selfCheckExample: {
        prompt:
          "A car drives straight towards a tower at a steady speed. The angle of depression of the car from the top changes from 45° to 60° in 6 minutes. How much longer will the car take to reach the tower?",
        steps: [
          "With height \\(h\\), the car moves from \\(h\\) to \\(\\tfrac{h}{\\sqrt3}\\) away, covering \\(h\\left(1 - \\tfrac{1}{\\sqrt3}\\right)\\).",
          "The rest is \\(\\tfrac{h}{\\sqrt3}\\), so the time is \\(6 \\times \\dfrac{1/\\sqrt3}{1 - 1/\\sqrt3} = \\dfrac{6}{\\sqrt3 - 1} = 3(\\sqrt3 + 1)\\).",
          "\\(3 \\times 2.732 \\approx 8.2\\) minutes.",
        ],
        answer: "\\(3(\\sqrt3 + 1)\\) minutes, about 8 min 12 s.",
      },
      practiceSet: [
        { prompt: "Change 15 m/s to km/h.", answer: "54 km/h" },
        {
          prompt: "A plane flying level at 600 m passes directly over a point and 4 seconds later is seen from that point at an elevation of 45°. Find its speed in m/s.",
          answer: "150 m/s",
        },
        {
          prompt:
            "From the top of a tower 30 m high, a boat moving away is seen at an angle of depression of 60°, and 8 seconds later at 45°. Find its speed.",
          answer: "about 1.58 m/s (about 5.7 km/h)",
        },
      ],
      pyqExampleId: "dc0eca58-9c26-449d-9fed-729a510c390a",
      traps: [
        {
          title: "Use the change in horizontal distance",
          body: "The object moves along the ground or along a level flight path. The lines of sight are slant distances; their difference is not the distance moved.",
        },
        {
          title: "Check the units of the options",
          body: "A distance in km covered in \\(t\\) seconds is a speed of \\(\\tfrac{3600}{t}\\) times that many km/h. Options in m/s and km/h differ by a factor of 3.6.",
        },
      ],
    },
  ],
};
