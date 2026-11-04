import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 9 Some Applications of Trigonometry. Statements
 * checked against the NCERT Class 10 text (rationalised); formulas rebuilt;
 * most-asked years and marks from the CBSE board past-paper questions in the
 * bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Some Applications of Trigonometry",
  chapterSlug: "some-applications-of-trigonometry",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 9",
  keyPoints: [
    {
      term: "Line of sight",
      text: "The line of sight is the line drawn from the eye of an observer to the point in the object viewed by the observer.",
    },
    {
      term: "Angle of elevation",
      text: "The angle formed by the line of sight with the horizontal when the object is **above** the horizontal level (we raise our head to look at it).",
    },
    {
      term: "Angle of depression",
      text: "The angle formed by the line of sight with the horizontal when the object is **below** the horizontal level (we lower our head). It is measured from the horizontal at the observer's eye.",
    },
    {
      term: "Use of trigonometric ratios",
      text: "The height or length of an object, or the distance between two objects, can be found with trigonometric ratios, without measuring it directly.",
    },
    {
      term: "Choosing the ratio",
      text: "Pick the ratio that links the side you know and the side you want. Height and ground distance: use \\(\\tan\\). A slant length (string, ladder, wire): use \\(\\sin\\) or \\(\\cos\\).",
    },
    {
      term: "Height of the observer",
      text: "If the observer's eye is above the ground, the angle is at eye level: add the observer's height to the height found.",
    },
    {
      term: "Shadow and the Sun",
      text: "The Sun's altitude is the angle of elevation of the top of the object from the tip of its shadow. A lower Sun gives a longer shadow.",
    },
    {
      term: "Depression equals elevation",
      text: "The angle of depression of B from A equals the angle of elevation of A from B (alternate angles, as the horizontals are parallel). Use this to put the angle inside the triangle.",
    },
  ],
  formulas: [
    { label: "Height from ground distance", latex: "\\tan\\theta = \\frac{\\text{height}}{\\text{ground distance}}" },
    { label: "Slant length", latex: "\\sin\\theta = \\frac{\\text{height}}{\\text{slant length}}, \\qquad \\cos\\theta = \\frac{\\text{ground distance}}{\\text{slant length}}" },
    { label: "Ratios used most", latex: "\\tan 30^\\circ = \\frac{1}{\\sqrt{3}}, \\quad \\tan 45^\\circ = 1, \\quad \\tan 60^\\circ = \\sqrt{3}" },
    { label: "Object moving at height h, angle changes from a to b", latex: "\\text{distance moved} = h\\,|\\cot a - \\cot b|" },
    { label: "Speed", latex: "\\text{speed} = \\frac{\\text{distance}}{\\text{time}}" },
    { label: "Rationalising", latex: "\\frac{1}{\\sqrt{3} - 1} = \\frac{\\sqrt{3} + 1}{2}, \\qquad \\sqrt{3} \\approx 1.73" },
  ],
  derivations: [
    {
      title: "Angles of depression of the top and bottom of a building from a tower: find the tower's height and the distance",
      steps: [
        "Example: from the top of tower PC, the angles of depression of the top A and bottom B of an 8 m building AB are \\(30^\\circ\\) and \\(45^\\circ\\). Let PC = h, the distance = x.",
        "Bottom: \\(\\tan 45^\\circ = \\frac{h}{x}\\), so \\(x = h\\).",
        "Top: \\(\\tan 30^\\circ = \\frac{h - 8}{x}\\), so \\(\\frac{h - 8}{h} = \\frac{1}{\\sqrt{3}}\\).",
        "\\(h(\\sqrt{3} - 1) = 8\\sqrt{3}\\), so \\(h = \\frac{8\\sqrt{3}}{\\sqrt{3} - 1} = 4(3 + \\sqrt{3})\\) m; the distance is the same.",
      ],
    },
    {
      title: "A moving object: the angle of elevation changes from 60° to 30° in t seconds; find the speed",
      steps: [
        "Draw both positions with the same height h. First distance \\(= \\frac{h}{\\tan 60^\\circ} = \\frac{h}{\\sqrt{3}}\\).",
        "Second distance \\(= \\frac{h}{\\tan 30^\\circ} = h\\sqrt{3}\\).",
        "Distance moved \\(= h\\sqrt{3} - \\frac{h}{\\sqrt{3}} = \\frac{2h}{\\sqrt{3}}\\).",
        "Speed \\(= \\frac{2h}{\\sqrt{3}\\, t}\\). Example: \\(h = 1500\\sqrt{3}\\) m, \\(t = 15\\) s gives 3000 m in 15 s, that is 200 m/s or 720 km/h.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Figure for a heights and distances question",
      labels: ["Vertical object with its height", "Horizontal line at the observer's eye", "Line of sight to the top (or bottom)", "Angle of elevation or depression marked", "Right angle at the foot", "Known and unknown lengths named"],
    },
  ],
  mostAsked: [
    { topic: "Case study: kites, lighthouse and ship, statue, stairs, ambulance, wires to a tower", marks: 2, years: [2026, 2025, 2023, 2022] },
    { topic: "Two angles, two objects: building and tower, flagstaff on a tower, two ships or cars, river width, pillars, two observers of a kite", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "One right triangle: height of a tower, shadow, kite string, ladder or wire, sun's altitude", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "A moving object: the angle changes as an aircraft, boat, car or person moves; find the distance or speed", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
  ],
  mistakes: [
    {
      title: "Putting the angle of depression at the wrong place",
      body: "The angle of depression is between the **horizontal** at the observer's eye and the line of sight, not between the tower and the line of sight. Use the alternate angle inside the triangle.",
    },
    {
      title: "No figure, or an unlabelled one",
      body: "Draw a neat figure first: mark the right angle, the given angles and lengths, and name the unknowns. In 5-mark questions the figure carries marks.",
    },
    {
      title: "Forgetting the observer's height",
      body: "A 1.5 m tall girl measures the angle from her eyes. Height of the tower = height found from her eye level + 1.5 m.",
    },
    {
      title: "Using sin where tan is needed",
      body: "Height and ground distance are the two legs: \\(\\tan\\theta = \\frac{\\text{height}}{\\text{distance}}\\). Use \\(\\sin\\) only with the slant side (hypotenuse).",
    },
    {
      title: "Leaving roots in the denominator",
      body: "Rationalise \\(\\frac{8\\sqrt{3}}{\\sqrt{3} - 1}\\) before giving the answer, and use \\(\\sqrt{3} = 1.73\\) only if the question says so.",
    },
  ],
};

export default sheet;
