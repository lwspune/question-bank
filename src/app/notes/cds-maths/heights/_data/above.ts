import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HD_ABOVE_NOTE: SubtopicNote = {
  subtopicName: "Observer Above the Ground",
  title: "Observer Above the Ground",
  oneLineDefinition:
    "An observer above the ground sees the top of a taller object by elevation and its foot by depression; the level line through the eye splits the object in two.",
  whyItMatters:
    "Nine PYQs, four of them HARD. Draw the horizontal line through the observer's eye. The depression of the foot fixes the ground distance from the observer's own height; the elevation of the top then gives the part ABOVE eye level. Add the two parts.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdshd-above",
      name: "Elevation and depression together",
      intuition:
        "From a deck \\(h\\) above the water, the foot of a tower is \\(h\\) below eye level and its top is some height above. Both share the same ground distance, so one angle fixes the distance and the other gives the rest of the height.",
      definition:
        "- Observer at height \\(h\\), depression \\(\\beta\\) of the foot: ground distance \\(d = h\\cot\\beta\\).\n" +
        "- Elevation \\(\\alpha\\) of the top: height above eye level \\(= d\\tan\\alpha\\). Total \\(= h + d\\tan\\alpha\\).\n" +
        "- A shorter object below eye level: its top is \\(d\\tan(\\text{depression of top})\\) below the eye.\n" +
        "- A cloud and its reflection: the reflection is as far BELOW the water as the cloud is above.\n" +
        "- A line of sight that just touches a dome is tangent to it: distance from the centre \\(= \\dfrac{r}{\\sin\\theta}\\).",
      formula: {
        label: "Height of the object",
        latex: "H = h + h\\cot\\beta\\tan\\alpha",
      },
      authoredExample: {
        prompt: "From a window \\(10\\) m up, the elevation of a tower's top is \\(45^\\circ\\) and the depression of its foot is \\(30^\\circ\\). Find the tower's height.",
        steps: ["\\(d = 10\\sqrt3\\).", "Above the window: \\(10\\sqrt3 \\tan 45^\\circ = 10\\sqrt3\\)."],
        answer: "\\(10(1 + \\sqrt3)\\) m.",
      },
      selfCheckExample: {
        prompt: "From the top of a \\(60\\) m cliff, the depressions of the top and foot of a tree are \\(30^\\circ\\) and \\(60^\\circ\\). Find the tree's height.",
        steps: ["\\(d = 60\\cot 60^\\circ = 20\\sqrt3\\).", "The tree's top is \\(20\\sqrt3\\tan 30^\\circ = 20\\) below the cliff top."],
        answer: "\\(40\\) m.",
      },
      practiceSet: [
        { prompt: "Eye \\(h\\), depression \\(45^\\circ\\), elevation \\(45^\\circ\\). Height?", answer: "\\(2h\\)" },
        { prompt: "Eye \\(h\\), depression \\(30^\\circ\\), elevation \\(60^\\circ\\). Height?", answer: "\\(4h\\)" },
        { prompt: "Cloud \\(H\\) above a lake. Its reflection is how far below?", answer: "\\(H\\)" },
        { prompt: "Depression \\(\\beta\\) from \\(h\\). Ground distance?", answer: "\\(h\\cot\\beta\\)" },
      ],
      pyqExampleId: "d007d2f0-399a-4119-8337-6a7d89ea3e09", // 2023 (I) — ship's deck h above water, 60° and 30°
      traps: [
        {
          title: "Add the part below eye level",
          body:
            "The elevation gives only the part of the tower ABOVE the observer's eye. The observer's own height \\(h\\) must be added to get the whole tower.",
        },
      ],
    },
  ],
};
