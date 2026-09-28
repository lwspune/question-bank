import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M2_SECTORS_NOTE: SubtopicNote = {
  subtopicName: "Arcs, Sectors and Segments",
  title: "Arcs, Sectors & Segments",
  oneLineDefinition:
    "Arc length and sector area as a fraction of the whole circle, and the segment cut off by a chord as the sector minus a triangle.",
  whyItMatters:
    "A steady source of easy marks: pendulums, clock hands and pie charts are all sectors in disguise. The one idea that costs marks is the segment, where the triangle has to be subtracted from the sector.",
  concepts: [
    // C1 — arc length
    {
      kind: "formula" as const,
      slug: "cdsm2-arc-length",
      name: "Arc length — radius times angle in radians",
      intuition:
        "An arc is a fraction of the circumference: the fraction \\(\\dfrac{\\theta}{360^\\circ}\\). In radians that becomes simply \\(r\\theta\\), which is why a pendulum or a road curve asks you to convert the angle first.",
      definition:
        "- Arc \\(= \\dfrac{\\theta}{360^\\circ}\\times 2\\pi r = r\\theta\\) with \\(\\theta\\) in radians.\n" +
        "- Degrees to radians: multiply by \\(\\dfrac{\\pi}{180}\\).\n" +
        "- A pendulum swinging through \\(\\theta\\): its bob traces an arc whose radius is the pendulum's length.\n" +
        "- A road that turns through \\(\\theta\\) over a distance \\(s\\): \\(r = \\dfrac{s}{\\theta}\\).\n" +
        "- Equal arcs in two circles: \\(r_1\\theta_1 = r_2\\theta_2\\), so the radii are in the inverse ratio of the angles.",
      formula: {
        label: "Arc length",
        latex: "l = r\\theta = \\frac{\\theta^\\circ}{360^\\circ}\\times 2\\pi r",
      },
      authoredExample: {
        prompt: "A pendulum \\(63\\) cm long swings through \\(40^\\circ\\). How long is the arc its bob traces? \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(40^\\circ = \\dfrac{40\\pi}{180} = \\dfrac{2\\pi}{9}\\) radians.",
          "\\(l = 63\\times\\dfrac{2}{9}\\times\\dfrac{22}{7} = 44\\) cm.",
        ],
        answer: "\\(44\\) cm.",
      },
      selfCheckExample: {
        prompt: "A wire \\(22\\) cm long is bent into an arc of a circle of radius \\(35\\) cm. What angle does it subtend at the centre? \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(\\theta = \\dfrac{l}{r} = \\dfrac{22}{35}\\) radians.",
          "In degrees: \\(\\dfrac{22}{35}\\times\\dfrac{180\\times 7}{22} = 36^\\circ\\).",
        ],
        answer: "\\(36^\\circ\\).",
      },
      practiceSet: [
        { prompt: "\\(r = 12\\), \\(\\theta = 60^\\circ\\): arc?", answer: "\\(4\\pi\\)" },
        { prompt: "\\(r = 5\\), \\(\\theta = 2\\) rad: arc?", answer: "\\(10\\)" },
        { prompt: "Equal arcs at \\(45^\\circ\\) and \\(60^\\circ\\): radii in ratio?", answer: "\\(4 : 3\\)" },
        { prompt: "\\(135^\\circ\\) in radians?", answer: "\\(\\dfrac{3\\pi}{4}\\)" },
      ],
      pyqExampleId: "e2a30842-7c23-4150-8e0c-45a5605babaa", // 2023 (II) — pendulum through 9°, arc 14.3 cm
      traps: [
        {
          title: "Never put degrees into rθ",
          body:
            "\\(l = r\\theta\\) needs radians. Multiplying the radius by \\(30\\) instead of \\(\\dfrac{\\pi}{6}\\) is the commonest slip, and the options rarely include anything that wild, so a strange result is the warning.",
        },
      ],
    },

    // C2 — sector area
    {
      kind: "formula" as const,
      slug: "cdsm2-sector-area",
      name: "Sector area — a slice of the disc",
      intuition:
        "A sector is the same fraction of the disc's area as its angle is of \\(360^\\circ\\). If the arc length is known, there is a shortcut: the sector is half the radius times the arc, like a triangle with the arc as its base.",
      definition:
        "- Sector \\(= \\dfrac{\\theta}{360^\\circ}\\times\\pi r^2 = \\dfrac12 r^2\\theta\\) (radians) \\(= \\dfrac12 r\\,l\\).\n" +
        "- Perimeter of a sector \\(= 2r + l\\).\n" +
        "- A minute hand sweeps \\(6^\\circ\\) a minute; an hour hand \\(\\dfrac12^\\circ\\) a minute.\n" +
        "- A pie chart with angles in the ratio \\(a : b : \\ldots\\): each sector's angle is its share of \\(360^\\circ\\).",
      formula: {
        label: "Sector",
        latex: "A = \\frac{\\theta}{360^\\circ}\\,\\pi r^2 = \\tfrac12 r l",
      },
      authoredExample: {
        prompt: "The minute hand of a clock is \\(14\\) cm long. What area does it sweep in \\(15\\) minutes? \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "In \\(15\\) minutes it turns \\(15\\times 6^\\circ = 90^\\circ\\), a quarter of a turn.",
          "Area \\(= \\dfrac14\\times\\dfrac{22}{7}\\times 14^2 = 154\\) cm\\(^2\\).",
        ],
        answer: "\\(154\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A sector of a circle of radius \\(8\\) cm has perimeter \\(26\\) cm. Find its area.",
        steps: [
          "The arc is \\(26 - 2\\times 8 = 10\\) cm.",
          "Area \\(= \\dfrac12 r l = \\dfrac12\\times 8\\times 10 = 40\\) cm\\(^2\\).",
        ],
        answer: "\\(40\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "\\(r = 6\\), \\(\\theta = 120^\\circ\\): sector area?", answer: "\\(12\\pi\\)" },
        { prompt: "\\(r = 10\\), arc \\(7\\): sector area?", answer: "\\(35\\)" },
        { prompt: "\\(r = 3\\), sector area \\(9\\): angle in radians?", answer: "\\(2\\)" },
        { prompt: "A \\(40^\\circ\\) sector removed from a disc of area \\(900\\pi\\): what is left?", answer: "\\(800\\pi\\)" },
      ],
      pyqExampleId: "69ce5148-68cd-4a3d-9247-659f0fd9d92f", // 2021 (II) — minute hand 21 cm, 10.10 to 10.30
    },

    // C3 — segment
    {
      kind: "formula" as const,
      slug: "cdsm2-segment",
      name: "The segment — sector minus triangle",
      intuition:
        "A chord cuts the disc into a minor and a major segment. The minor segment is the sector with the triangle formed by the two radii taken out; the major segment is the rest of the disc.",
      definition:
        "- Minor segment \\(= \\dfrac{\\theta}{360^\\circ}\\pi r^2 - \\dfrac12 r^2\\sin\\theta = \\dfrac12 r^2(\\theta - \\sin\\theta)\\) (radians).\n" +
        "- Major segment \\(= \\pi r^2 - \\text{minor segment}\\).\n" +
        "- A chord at \\(90^\\circ\\): minor segment \\(= r^2\\left(\\dfrac{\\pi}{4} - \\dfrac12\\right)\\), and the chord is \\(r\\sqrt2\\).\n" +
        "- A chord at \\(120^\\circ\\): minor segment \\(= r^2\\left(\\dfrac{\\pi}{3} - \\dfrac{\\sqrt3}{4}\\right)\\), and the chord is \\(r\\sqrt3\\).\n" +
        "- A chord at \\(60^\\circ\\): the triangle is equilateral, area \\(\\dfrac{\\sqrt3}{4}r^2\\).",
      formula: {
        label: "Minor segment",
        latex: "\\text{Segment} = \\tfrac12 r^2(\\theta - \\sin\\theta)",
      },
      authoredExample: {
        prompt: "A chord subtends \\(60^\\circ\\) at the centre of a circle of radius \\(6\\) cm. Find the area of the minor segment.",
        steps: [
          "Sector \\(= \\dfrac{60}{360}\\times\\pi\\times 36 = 6\\pi\\).",
          "The triangle of two radii and the chord is equilateral with side \\(6\\): \\(\\dfrac{\\sqrt3}{4}\\times 36 = 9\\sqrt3\\).",
          "Segment \\(= 6\\pi - 9\\sqrt3 \\approx 3.26\\) cm\\(^2\\).",
        ],
        answer: "\\(6\\pi - 9\\sqrt3\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A chord of a circle of radius \\(14\\) cm subtends a right angle at the centre. Find the major segment. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Minor segment \\(= \\dfrac14\\times\\dfrac{22}{7}\\times 196 - \\dfrac12\\times 14\\times 14 = 154 - 98 = 56\\).",
          "Disc \\(= \\dfrac{22}{7}\\times 196 = 616\\).",
          "Major segment \\(= 616 - 56 = 560\\) cm\\(^2\\).",
        ],
        answer: "\\(560\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Right-angle chord, \\(r = 2\\): minor segment?", answer: "\\(\\pi - 2\\)" },
        { prompt: "Right-angle chord, \\(\\pi = \\tfrac{22}{7}\\): major ÷ minor?", answer: "\\(10\\)" },
        { prompt: "\\(120^\\circ\\) chord in a circle of radius \\(r\\): chord length?", answer: "\\(r\\sqrt3\\)" },
        { prompt: "Segment formula with \\(\\sin\\theta = 2\\sin\\tfrac\\theta2\\cos\\tfrac\\theta2\\)?", answer: "\\(\\tfrac12 r^2\\left(\\theta - 2\\sin\\tfrac\\theta2\\cos\\tfrac\\theta2\\right)\\)" },
      ],
      pyqExampleId: "10c3ae9e-1fb4-4664-8399-853df15ee2ae", // 2022 (II) — chord l at 90°, minor segment
      traps: [
        {
          title: "Sector is not segment",
          body:
            "The sector includes the triangle; the segment does not. The sector's value is almost always among the options for a segment question.",
        },
      ],
    },
  ],
};
