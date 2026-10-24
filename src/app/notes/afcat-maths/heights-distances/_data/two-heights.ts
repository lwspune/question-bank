import type { SubtopicNote } from "@/app/notes/_types";

export const AF_HD_TWO_HEIGHTS_NOTE: SubtopicNote = {
  subtopicName: "Two Buildings, Flagstaffs and Reflections",
  title: "Two Heights from One Point: Flagstaffs, Two Buildings and Reflections",
  oneLineDefinition:
    "Two triangles share one horizontal distance: find that shared side first from the triangle you know, then use it in the other.",
  whyItMatters:
    "This is the chapter's hardest page: more than half its questions are HARD. A flagstaff stands on a tower, one building is seen from the top or a window of another, or a cloud is seen together with its reflection in a lake. Marks go when the shared distance is not found first, or when the observer's own height is left out at the end.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afhd-flagstaff",
      name: "A flagstaff on a tower, seen from one point",
      intuition:
        "From one point on the ground you see the foot of a flagstaff (the top of the tower) at one angle and the top of the flagstaff at a larger angle. Both triangles have the same horizontal side, the distance to the tower. Write both heights with that distance and subtract: the difference is the flagstaff.",
      definition:
        "- Tower \\(H\\), flagstaff \\(h\\), distance \\(d\\): \\(H = d\\tan\\alpha\\) and \\(H + h = d\\tan\\beta\\).\n" +
        "- Subtract to get \\(d\\), then \\(H\\). In letters, \\(H = \\dfrac{h\\tan\\alpha}{\\tan\\beta - \\tan\\alpha}\\).\n" +
        "- A statue on a pedestal, an antenna on a building or a pillar to be raised are the same picture.\n" +
        "- If the flagstaff and the tower are said to **subtend equal angles** at a point, the whole height subtends twice the angle: use \\(\\tan 2\\theta = \\dfrac{2\\tan\\theta}{1 - \\tan^2\\theta}\\).",
      formula: {
        label: "Two elevations, one distance",
        latex: "H = d\\tan\\alpha, \\qquad H + h = d\\tan\\beta",
      },
      authoredExample: {
        prompt:
          "A statue 8 m tall stands on a pedestal. From a point on the ground, the elevation of the top of the statue is 60° and of its feet is 30°. How tall is the pedestal?",
        steps: [
          "Pedestal \\(H = d\\tan 30^\\circ = \\tfrac{d}{\\sqrt3}\\); statue top \\(H + 8 = d\\sqrt3\\).",
          "Subtract: \\(d\\left(\\sqrt3 - \\tfrac{1}{\\sqrt3}\\right) = 8\\), so \\(\\tfrac{2d}{\\sqrt3} = 8\\) and \\(d = 4\\sqrt3\\).",
          "\\(H = \\tfrac{4\\sqrt3}{\\sqrt3} = 4\\).",
        ],
        answer: "4 m.",
      },
      selfCheckExample: {
        prompt:
          "From a point 30 m from the foot of an unfinished pillar, its top is at an elevation of 30°. By how much must it be raised so that its top is seen at 60° from the same point?",
        steps: ["Now: \\(30\\tan 30^\\circ = 10\\sqrt3\\) m.", "Needed: \\(30\\tan 60^\\circ = 30\\sqrt3\\) m.", "Raise by \\(30\\sqrt3 - 10\\sqrt3 = 20\\sqrt3\\)."],
        answer: "\\(20\\sqrt3\\) m.",
      },
      practiceSet: [
        {
          prompt: "A flagstaff stands on a building 20 m tall. From a point on the ground, the foot of the flagstaff is at 30° and its top at 45°. How long is the flagstaff?",
          answer: "\\(20(\\sqrt3 - 1)\\) m",
        },
        { prompt: "A pillar 10 m tall is seen from \\(10\\sqrt3\\) m away. How much taller must it be for its top to be seen at 60°?", answer: "20 m" },
        {
          prompt: "A pole 12 m tall stands on a wall. From a point on the ground, the foot of the pole is at 30° and its top at 60°. How tall is the wall?",
          answer: "6 m",
        },
      ],
      pyqExampleId: "730f2719-dd7f-43fa-89b3-55ca2a3c16c7",
      traps: [
        {
          title: "The flagstaff is a difference",
          body: "The top angle gives the tower plus the flagstaff, not the flagstaff alone. Subtract the tower's height before answering.",
        },
        {
          title: "One distance for both angles",
          body: "Both elevations are taken from the same point, so they share \\(d\\). Giving each angle its own unknown distance leaves too many unknowns.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-two-buildings",
      name: "Two buildings across a gap",
      intuition:
        "An observer in one building looks across at another. The gap between them is the horizontal side of both triangles. If the observer sees the foot of the other building (depression) and its top (elevation), the depression fixes the gap from the observer's height, and the elevation then gives the part above the observer. If two observers stand at the foot and the top of one building, both look at one top across the same gap.",
      definition:
        "- From a window \\(w\\) high: the depression \\(\\phi\\) of the foot gives the gap \\(g = w\\cot\\phi\\); the elevation \\(\\theta\\) of the top gives \\(g\\tan\\theta\\) above the window.\n" +
        "- Height of the other building \\(= w + g\\tan\\theta\\).\n" +
        "- From the foot (elevation \\(\\beta\\)) and the top (elevation \\(\\alpha\\)) of a building \\(b\\) tall: \\(H = g\\tan\\beta\\) and \\(H - b = g\\tan\\alpha\\).\n" +
        "- Find the gap first from whichever triangle has two known parts.",
      formula: {
        label: "Height seen from a window",
        latex: "H = w + w\\cot\\phi\\tan\\theta",
      },
      authoredExample: {
        prompt:
          "From a window 15 m above the street, the top of the house opposite is at an elevation of 60° and its foot at a depression of 45°. How tall is the house opposite?",
        steps: [
          "Depression 45°: the street is \\(15\\cot 45^\\circ = 15\\) m wide.",
          "Above the window: \\(15\\tan 60^\\circ = 15\\sqrt3\\) m.",
          "Height \\(= 15 + 15\\sqrt3 = 15(1 + \\sqrt3)\\).",
        ],
        answer: "\\(15(1 + \\sqrt3)\\) m, about 41 m.",
      },
      selfCheckExample: {
        prompt:
          "From the top of a building 20 m tall, the top of a taller building is at an elevation of 45° and its foot at a depression of 60°. How tall is the taller building?",
        steps: [
          "Gap \\(= 20\\cot 60^\\circ = \\tfrac{20}{\\sqrt3}\\).",
          "Above the observer: \\(\\tfrac{20}{\\sqrt3}\\tan 45^\\circ = \\tfrac{20}{\\sqrt3}\\).",
          "Height \\(= 20 + \\tfrac{20}{\\sqrt3} = 20 + \\tfrac{20\\sqrt3}{3}\\).",
        ],
        answer: "\\(20 + \\tfrac{20\\sqrt3}{3}\\) m, about 31.5 m.",
      },
      practiceSet: [
        {
          prompt:
            "From the foot of a tower 20 m tall, the top of a building is at an elevation of 60°. From the top of the tower it is at 45°. How tall is the building?",
          answer: "\\(10(3 + \\sqrt3)\\) m",
        },
        {
          prompt: "From the top of a building 12 m tall, the top of a tower is at an elevation of 45° and its foot at a depression of 30°. How tall is the tower?",
          answer: "\\(12(1 + \\sqrt3)\\) m",
        },
        {
          prompt: "From a window 8 m above the street, the top of the house opposite is at an elevation of 45° and its foot at a depression of 45°. How tall is the house?",
          answer: "16 m",
        },
      ],
      pyqExampleId: "3aa48f96-b408-48b4-b668-fd0c41ba7399",
      traps: [
        {
          title: "Add the observer's height back",
          body: "The elevation gives only the part of the other building above the observer's eye. The building's height is that part plus the height of the window or roof.",
        },
        {
          title: "The depression finds the gap",
          body: "Start with the angle of depression of the foot, which has two known parts (the observer's height and the angle). Starting with the elevation leaves two unknowns.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-reflection-round",
      name: "A cloud and its reflection, a balloon and its size",
      intuition:
        "Two set-ups need one extra fact each. A still lake works as a mirror: the reflection of a cloud \\(H\\) above the water appears \\(H\\) below it. A round balloon has width: the two lines from the eye that just touch it make an angle, and the line to its centre cuts that angle in half.",
      definition:
        "- **Reflection:** from a point \\(h\\) above the water, the cloud is \\(H - h\\) above the eye and its reflection \\(H + h\\) below it, both at the same horizontal distance \\(x\\).\n" +
        "- So \\(H - h = x\\tan(\\text{elevation})\\) and \\(H + h = x\\tan(\\text{depression})\\); divide to remove \\(x\\).\n" +
        "- **Balloon:** if a balloon of radius \\(r\\) subtends an angle \\(\\alpha\\) at the eye, the radius to a touching point is perpendicular to the line of sight, so the distance from the eye to the centre is \\(\\dfrac{r}{\\sin(\\alpha/2)}\\).\n" +
        "- The height of the centre is that distance times the sine of the centre's elevation.",
      formula: {
        label: "Cloud and reflection",
        latex: "\\dfrac{H + h}{H - h} = \\dfrac{\\tan(\\text{depression})}{\\tan(\\text{elevation})}",
      },
      authoredExample: {
        prompt:
          "A balloon of radius 5 m subtends an angle of 60° at an observer's eye, and the elevation of its centre is 60°. How high is the centre above the eye?",
        steps: [
          "Half the angle is 30°, so the distance to the centre is \\(\\tfrac{5}{\\sin 30^\\circ} = 10\\) m.",
          "Height \\(= 10\\sin 60^\\circ = 5\\sqrt3\\).",
        ],
        answer: "\\(5\\sqrt3\\) m, about 8.7 m.",
      },
      selfCheckExample: {
        prompt:
          "From a point 10 m above a lake, the elevation of a cloud is 30° and the depression of its reflection is 60°. How high is the cloud above the lake?",
        steps: [
          "\\(H - 10 = \\tfrac{x}{\\sqrt3}\\) and \\(H + 10 = x\\sqrt3\\).",
          "Divide: \\(\\tfrac{H + 10}{H - 10} = 3\\), so \\(H + 10 = 3H - 30\\).",
          "\\(H = 20\\).",
        ],
        answer: "20 m.",
      },
      practiceSet: [
        {
          prompt: "From a point 5 m above a lake, the elevation of a cloud is 45° and the depression of its reflection is 60°. How high is the cloud above the lake?",
          answer: "\\(5(2 + \\sqrt3)\\) m",
        },
        { prompt: "A ball of radius 2 m subtends an angle of 60° at the eye. How far is its centre from the eye?", answer: "4 m" },
      ],
      pyqExampleId: "bca37c27-872e-4986-8684-97579fbd390d",
      traps: [
        {
          title: "The reflection is below the water, not the eye",
          body: "The reflection is \\(H\\) below the surface, so it is \\(H + h\\) below an eye \\(h\\) above the water. Using \\(H - h\\) for both makes the two angles equal.",
        },
        {
          title: "Halve the subtended angle",
          body: "A balloon subtending 60° puts the centre at \\(\\tfrac{r}{\\sin 30^\\circ}\\), not \\(\\tfrac{r}{\\sin 60^\\circ}\\). The line to the centre splits the angle in two.",
        },
      ],
    },
  ],
};
