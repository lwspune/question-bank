import type { SubtopicNote } from "@/app/notes/_types";

export const AF_HD_ONE_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "One Angle of Elevation or Depression",
  title: "One Angle: Towers, Shadows, Ladders and Cliffs",
  oneLineDefinition:
    "One right triangle with one known side and one known angle: tangent links a height to a horizontal distance, sine and cosine link either of them to a slanting length.",
  whyItMatters:
    "Most questions on this page are EASY, and they are where the chapter's marks are cheapest: a tower, a shadow, a ladder, a kite or a ship seen from a cliff. Marks are lost by using tangent when the known side is a slanting length, and by putting the angle of depression at the wrong corner of the triangle.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afhd-height-distance",
      name: "Height and horizontal distance: the tangent",
      intuition:
        "The **angle of elevation** is the angle between the horizontal and the line from your eye up to the top of an object. The height and the horizontal distance are the two shorter sides of a right triangle, so tangent connects them: height over distance. A shadow is the same triangle, with the sun's elevation at the tip of the shadow.",
      definition:
        "- \\(\\tan\\theta = \\dfrac{\\text{height}}{\\text{distance}}\\), so height \\(= \\text{distance} \\times \\tan\\theta\\) and distance \\(= \\text{height} \\times \\cot\\theta\\).\n" +
        "- A **shadow** on level ground is the horizontal side; the sun's elevation is the angle at its far end.\n" +
        "- When the angle is given as \\(\\sin^{-1}\\) or \\(\\cos^{-1}\\) of a fraction, draw the triangle for that fraction first and read off the tangent.\n" +
        "- At 45° the height equals the distance; at 60° the height is \\(\\sqrt3\\) times the distance; at 30° it is \\(\\tfrac{1}{\\sqrt3}\\) times.",
      formula: {
        label: "Height from distance",
        latex: "h = d\\tan\\theta, \\qquad d = h\\cot\\theta",
      },
      authoredExample: {
        prompt: "From a point 40 m from the foot of a tower, the angle of elevation of its top is 60°. Find the height of the tower.",
        steps: ["\\(h = 40\\tan 60^\\circ = 40\\sqrt3\\).", "\\(40\\sqrt3 \\approx 40 \\times 1.732 = 69.3\\)."],
        answer: "\\(40\\sqrt3\\) m, about 69.3 m.",
      },
      selfCheckExample: {
        prompt: "A tree 9 m tall casts a shadow when the sun's elevation is 30°. How long is the shadow?",
        steps: ["Shadow \\(= 9\\cot 30^\\circ = 9\\sqrt3\\)."],
        answer: "\\(9\\sqrt3\\) m.",
      },
      practiceSet: [
        { prompt: "A pole casts a shadow \\(7\\sqrt3\\) m long when the sun's elevation is 30°. How tall is the pole?", answer: "7 m" },
        { prompt: "The top of a tower \\(50\\sqrt3\\) m high is seen at an elevation of 60°. How far away is the observer?", answer: "50 m" },
        {
          prompt: "From 24 m away, the top of a tower is seen at an angle whose tangent is \\(\\tfrac{5}{12}\\). How tall is the tower?",
          answer: "10 m",
        },
      ],
      pyqExampleId: "fbfb99b3-f059-45a8-91e2-5c50fc6d615d",
      traps: [
        {
          title: "Tangent uses the horizontal distance",
          body: "Tangent links the height to the ground distance. If the length given is the line of sight or a rope, it is the hypotenuse and needs sine or cosine (next concept).",
        },
        {
          title: "Height over distance, not the reverse",
          body: "At 60°, a point 40 m away sees a tower \\(40\\sqrt3\\) m tall. Writing \\(\\tan 60^\\circ = \\tfrac{40}{h}\\) gives \\(\\tfrac{40}{\\sqrt3}\\), the answer for 30°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-slant-length",
      name: "Ladders, ropes, kites and ramps: sine and cosine",
      intuition:
        "A ladder, a kite string, a rope or a ramp is the slanting side, the hypotenuse. Its height is the length times the sine of its angle with the ground, and its foot is the length times the cosine. A tree or post that snaps forms the same triangle: the part still standing and the broken part that reaches the ground.",
      definition:
        "- Height \\(= L\\sin\\theta\\), horizontal \\(= L\\cos\\theta\\), where \\(L\\) is the slanting length and \\(\\theta\\) its angle with the ground.\n" +
        "- Length from height: \\(L = \\dfrac{h}{\\sin\\theta} = h\\operatorname{cosec}\\theta\\).\n" +
        "- **Broken post:** the standing part is \\(d\\tan\\theta\\), the broken part is \\(\\dfrac{d}{\\cos\\theta}\\), where \\(d\\) is how far from the foot the top lands. The original height is their sum.\n" +
        "- An angle with the wall is the complement of the angle with the ground.",
      formula: {
        label: "A slanting length",
        latex: "h = L\\sin\\theta, \\qquad x = L\\cos\\theta",
      },
      authoredExample: {
        prompt: "A ladder 12 m long rests against a wall, making 60° with the ground. How high up the wall does it reach, and how far is its foot from the wall?",
        steps: ["Height \\(= 12\\sin 60^\\circ = 12 \\times \\tfrac{\\sqrt3}{2} = 6\\sqrt3\\).", "Foot \\(= 12\\cos 60^\\circ = 12 \\times \\tfrac12 = 6\\)."],
        answer: "\\(6\\sqrt3\\) m up the wall, with its foot 6 m out.",
      },
      selfCheckExample: {
        prompt: "A kite flies on a string 80 m long that makes 60° with the ground. How high is the kite?",
        steps: ["\\(80\\sin 60^\\circ = 80 \\times \\tfrac{\\sqrt3}{2} = 40\\sqrt3\\)."],
        answer: "\\(40\\sqrt3\\) m.",
      },
      practiceSet: [
        { prompt: "A ramp rises 4 m and makes 45° with the ground. How long is the ramp?", answer: "\\(4\\sqrt2\\) m" },
        {
          prompt: "A tree snaps and its top touches the ground 10 m from the foot, making 45° with the ground. How tall was the tree?",
          answer: "\\(10(1 + \\sqrt2)\\) m",
        },
        { prompt: "A wire 18 m long runs from the top of a pole to the ground, making 60° with the ground. How tall is the pole?", answer: "\\(9\\sqrt3\\) m" },
      ],
      pyqExampleId: "a1c13852-3083-421b-a91b-c4176ddf2389",
      traps: [
        {
          title: "A length is the hypotenuse",
          body: "The height a 12 m ladder reaches at 60° is \\(12\\sin 60^\\circ = 6\\sqrt3\\) m. Using \\(12\\tan 60^\\circ = 12\\sqrt3\\) treats the ladder as lying on the ground.",
        },
        {
          title: "A broken tree is two pieces",
          body: "The tree's height is the standing part plus the broken part. Giving the broken part alone, or the standing part alone, is an option set to catch you.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-depression",
      visualizationSlug: "af-angle-of-depression",
      name: "The angle of depression",
      intuition:
        "The **angle of depression** is measured at the observer, from the horizontal line through the eye down to the object. The horizontal at the top and the ground are parallel, so this angle equals the angle of elevation of the observer as seen from the object. Put the angle at the object's corner and solve the same triangle as before.",
      definition:
        "- Angle of depression from the top \\(=\\) angle of elevation from the object (alternate angles between parallel lines).\n" +
        "- The height of the observer is the vertical side; the distance to the object is the horizontal side.\n" +
        "- Depression is measured from the **horizontal**. An angle of 20° with the vertical is a depression of 70°.",
      formula: {
        label: "Depression equals elevation",
        latex: "\\tan\\theta = \\dfrac{\\text{height of observer}}{\\text{horizontal distance}}",
      },
      authoredExample: {
        prompt: "From the top of a cliff 75 m high, a boat is seen at an angle of depression of 30°. How far is the boat from the foot of the cliff?",
        steps: [
          "The angle of elevation of the cliff top from the boat is also 30°.",
          "Distance \\(= 75\\cot 30^\\circ = 75\\sqrt3\\).",
          "\\(75\\sqrt3 \\approx 129.9\\).",
        ],
        answer: "\\(75\\sqrt3\\) m, about 130 m.",
      },
      selfCheckExample: {
        prompt: "A bird sitting 40 m above the ground sees a stone at an angle of depression of 45°. How far is the stone, horizontally?",
        steps: ["At 45° the distance equals the height."],
        answer: "40 m.",
      },
      practiceSet: [
        { prompt: "From the top of a tower, a car 90 m from its foot is seen at an angle of depression of 30°. How tall is the tower?", answer: "\\(30\\sqrt3\\) m" },
        { prompt: "From a balcony 12 m up, a dog is seen at an angle of depression of 45°. How far is the dog from the foot of the building?", answer: "12 m" },
        { prompt: "From the top of a hill \\(24\\sqrt3\\) m high, a hut is seen at an angle of depression of 30°. How far is the hut?", answer: "72 m" },
      ],
      pyqExampleId: "b9095a09-d2c1-4eff-a8a2-b1553357b6ef",
      traps: [
        {
          title: "Measure from the horizontal",
          body: "The angle of depression is between the horizontal and the line of sight. If a question gives the angle with the vertical, subtract it from 90° first.",
        },
        {
          title: "Move the angle to the ground",
          body: "Inside the triangle, the angle at the top is the complement of the depression. Using that corner with tangent gives the reciprocal answer. Put the depression at the object instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-finding-angle",
      name: "Finding the angle of elevation",
      intuition:
        "Sometimes the sides are known and the angle is asked. Take the rise and the run of the line of sight, divide, and look the tangent up. The rise is the height above the eye, so from the top of a shorter pole, or from a person's eye, it is the difference in heights.",
      definition:
        "- \\(\\tan\\theta = \\dfrac{\\text{rise}}{\\text{run}}\\). If the value is standard, name the angle; if not, the answer is \\(\\tan^{-1}\\) of the fraction.\n" +
        "- From the top of one pole to the top of another, the rise is the difference of the heights and the run is the gap between them.\n" +
        "- From a person's eye, subtract the eye height from the height of the object.\n" +
        "- The same fraction gives the angle of depression from the higher top down to the lower one.",
      formula: {
        label: "The angle from the sides",
        latex: "\\theta = \\tan^{-1}\\dfrac{\\text{rise}}{\\text{run}}",
      },
      authoredExample: {
        prompt: "Two poles 8 m and 20 m tall stand 12 m apart. Find the angle of elevation of the top of the taller pole from the top of the shorter one.",
        steps: ["Rise \\(= 20 - 8 = 12\\) m, run \\(= 12\\) m.", "\\(\\tan\\theta = \\tfrac{12}{12} = 1\\), so \\(\\theta = 45^\\circ\\)."],
        answer: "45°.",
      },
      selfCheckExample: {
        prompt: "A pole \\(6\\sqrt3\\) m tall casts a shadow 6 m long. What is the sun's elevation?",
        steps: ["\\(\\tan\\theta = \\tfrac{6\\sqrt3}{6} = \\sqrt3\\).", "So \\(\\theta = 60^\\circ\\)."],
        answer: "60°.",
      },
      practiceSet: [
        { prompt: "A girl whose eyes are 1.5 m above the ground looks at the top of a 7.5 m pole from 6 m away. Find the angle of elevation.", answer: "45°" },
        {
          prompt: "Two towers 12 m and 42 m tall stand \\(10\\sqrt3\\) m apart. Find the angle of depression of the shorter top from the taller top.",
          answer: "60°",
        },
        { prompt: "A pole 5 m tall casts a shadow 9 m long. Find the sun's elevation.", answer: "\\(\\tan^{-1}\\tfrac59\\)" },
      ],
      pyqExampleId: "970a5c88-5df3-45d9-997d-3103e65439be",
      traps: [
        {
          title: "Use the difference of the heights",
          body: "From the top of an 8 m pole to the top of a 20 m pole, the rise is 12 m. Using 20 m treats the observer as standing on the ground.",
        },
        {
          title: "Not every angle is standard",
          body: "If \\(\\tan\\theta = \\tfrac27\\), no table angle fits, and the right option reads \\(\\tan^{-1}\\tfrac27\\). Do not round it to the nearest table angle.",
        },
      ],
    },
  ],
};
