import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M2_SECTORS_NOTE: SubtopicNote = {
  subtopicName: "Sector Area",
  title: "Sector Area",
  oneLineDefinition:
    "A sector's area is the same fraction of πr² as its angle is of 360°, or half its arc times its radius.",
  whyItMatters:
    "Thirty-two questions in the bank, thirty EASY and two MODERATE, fourteen of them from the 2025 shifts: the largest single page in this chapter. Three routes reach the same area (the angle fraction, half arc times radius, half r squared times the angle in radians), and the fast mark comes from picking the one that matches what the stem gives.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm2se-fraction",
      name: "Sector area as a fraction of the circle's area",
      intuition:
        "A sector takes the same share of the circle's area as its angle takes of 360°, exactly as the arc took that share of the circumference. A 90° sector is a quarter of the disc.",
      definition:
        "- Sector area \\(A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2\\).\n" +
        "- **Working back for the angle:** \\(\\frac{\\theta}{360^\\circ} = \\frac{A}{\\pi r^2}\\). Divide the sector by the whole circle, then multiply by \\(360^\\circ\\).\n" +
        "- **Working back for the radius:** \\(r^2 = \\frac{360^\\circ}{\\theta} \\times \\frac{A}{\\pi}\\), then take the square root.\n" +
        "- A circle cut into \\(n\\) **equal sectors**: each one is \\(\\frac{\\pi r^2}{n}\\).\n" +
        "- **Fast route:** find the circle's area once, then take the fraction. With \\(r = 21\\) and \\(\\pi = \\frac{22}{7}\\), the circle is 1386, and a \\(60^\\circ\\) sector is \\(\\frac{1386}{6} = 231\\). Always safe.",
      formula: {
        label: "Area of a sector from its angle",
        latex: "A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2",
        symbols: [{ symbol: "\\(\\theta\\)", meaning: "central angle in degrees" }],
      },
      authoredExample: {
        prompt: "Find the area of a sector of radius 21 cm and angle 80°. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Area of the whole circle \\(= \\frac{22}{7} \\times 441 = 1386\\ \\text{cm}^2\\).",
          "Fraction \\(= \\frac{80}{360} = \\frac{2}{9}\\).",
          "Sector \\(= \\frac{2}{9} \\times 1386 = 308\\ \\text{cm}^2\\).",
        ],
        answer: "\\(308\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A sector of a circle of radius 6 cm has an area of \\(15\\pi\\) cm². Find its angle.",
        steps: ["Whole circle \\(= 36\\pi\\).", "\\(\\frac{15\\pi}{36\\pi} = \\frac{5}{12}\\), so \\(\\theta = \\frac{5}{12} \\times 360^\\circ = 150^\\circ\\)."],
        answer: "150°",
      },
      practiceSet: [
        { prompt: "A sector has radius 7 cm and angle 72°. What is its area? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(30.8\\ \\text{cm}^2\\)", method: "\\(\\frac{1}{5} \\times 154\\)." },
        { prompt: "A circle is cut into 12 equal sectors, each of area \\(3\\pi\\) cm². What is the radius of the circle?", answer: "6 cm", method: "Whole circle \\(= 36\\pi\\)." },
        { prompt: "A sector of angle 120° has an area of \\(75\\pi\\) cm². What is its radius?", answer: "15 cm", method: "Whole circle \\(= 225\\pi\\)." },
        { prompt: "A sector of radius 10 cm has an area of \\(20\\pi\\) cm². What is its angle?", answer: "72°", method: "\\(\\frac{20}{100} \\times 360^\\circ\\)." },
      ],
      pyqExampleId: "2b6fb593-e18c-45b3-8588-a15a9040e3d4",
      traps: [
        {
          title: "Using 2πr for an area",
          body: "\\(2\\pi r\\) is the circumference, a length. A sector's AREA takes its fraction of \\(\\pi r^2\\).",
        },
        {
          title: "Stopping at r squared",
          body: "Working back from an area gives \\(r^2\\). Take the square root before choosing an option: \\(r^2 = 225\\) means \\(r = 15\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2se-arcradius",
      name: "Sector area from its arc: half the arc times the radius",
      intuition:
        "Cut a sector into many thin slices and each one is nearly a triangle with its tip at the centre, its height the radius and its base a tiny bit of the arc. Add them up and the sector is a triangle with base equal to the arc and height equal to the radius.",
      definition:
        "- Sector area \\(= \\frac{1}{2} \\times\\) arc \\(\\times\\) radius. No angle is needed.\n" +
        "- With the angle \\(\\theta\\) in **radians**, the arc is \\(r\\theta\\), so the area is \\(\\frac{1}{2}r^2\\theta\\).\n" +
        "- **Working back for the arc:** \\(l = \\frac{2A}{r}\\).\n" +
        "- An arc given as a multiple of the radius (\\(l = kr\\)) gives area \\(\\frac{1}{2}kr^2\\).\n" +
        "- **Fast route:** when the stem gives the arc and the radius, use \\(\\frac{1}{2}lr\\) and never find the angle. When it gives an angle in radians, use \\(\\frac{1}{2}r^2\\theta\\). Both are safe; the angle must be in radians in the second.",
      formula: {
        label: "Area of a sector from its arc",
        latex: "A = \\frac{1}{2}lr \\qquad A = \\frac{1}{2}r^2\\theta",
        symbols: [
          { symbol: "l", meaning: "arc length" },
          { symbol: "\\(\\theta\\)", meaning: "central angle in radians" },
        ],
      },
      authoredExample: {
        prompt: "A sector of radius 9 cm has an arc 10 cm long. Find its area and its angle in radians.",
        steps: [
          "Area \\(= \\frac{1}{2} \\times 10 \\times 9 = 45\\ \\text{cm}^2\\).",
          "Angle \\(= \\frac{l}{r} = \\frac{10}{9}\\) radian.",
          "Check: \\(\\frac{1}{2} \\times 81 \\times \\frac{10}{9} = 45\\).",
        ],
        answer: "\\(45\\ \\text{cm}^2\\), \\(\\frac{10}{9}\\) radian",
      },
      selfCheckExample: {
        prompt: "A sector of radius 16 cm has an area of \\(40\\pi\\) cm². Find the length of its arc.",
        steps: ["\\(l = \\frac{2A}{r} = \\frac{80\\pi}{16} = 5\\pi\\) cm."],
        answer: "\\(5\\pi\\) cm",
      },
      practiceSet: [
        { prompt: "A sector has radius 10 cm and an arc 6 cm long. What is its area?", answer: "\\(30\\ \\text{cm}^2\\)" },
        { prompt: "A sector of radius 6 cm has a central angle of 2 radians. What is its area?", answer: "\\(36\\ \\text{cm}^2\\)" },
        { prompt: "A sector has an area of 50 cm² and a radius of 10 cm. What is the length of its arc?", answer: "10 cm" },
        { prompt: "The arc of a sector is four times its radius r. What is the area of the sector in terms of r?", answer: "\\(2r^2\\)" },
      ],
      pyqExampleId: "f2dba50e-5aed-4c92-ab5f-fe77b24cf14d",
      traps: [
        {
          title: "Putting degrees into half r squared theta",
          body: "\\(\\frac{1}{2}r^2\\theta\\) needs \\(\\theta\\) in radians. For a \\(45^\\circ\\) sector use \\(\\frac{\\pi}{4}\\), or use the 360 fraction instead.",
        },
        {
          title: "Dropping the half",
          body: "Arc times radius is TWICE the sector's area, just as base times height is twice a triangle's area.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2se-compare",
      name: "Comparing two sectors given in degrees and in radians",
      intuition:
        "Two sectors can only be compared once their angles are in the same unit. After that, the area depends on just two things, the angle and the square of the radius.",
      definition:
        "- Change both angles to degrees (or both to radians) first. \\(\\frac{\\pi}{3}\\) and \\(60^\\circ\\) are the same angle.\n" +
        "- **Same circle, same angle:** equal areas, ratio \\(1 : 1\\).\n" +
        "- **Same radius:** areas are in the ratio of the angles.\n" +
        "- **Same angle:** areas are in the ratio of the squares of the radii.\n" +
        "- **In general:** \\(A_1 : A_2 = \\theta_1 r_1^2 : \\theta_2 r_2^2\\).\n" +
        "- **When it breaks:** comparing by angle alone is safe only when the stem says the radii are equal (or the sectors are in the same circle). Without that, the ratio is not fixed.",
      formula: {
        label: "Ratio of two sector areas",
        latex: "\\frac{A_1}{A_2} = \\frac{\\theta_1 r_1^2}{\\theta_2 r_2^2}",
        symbols: [{ symbol: "\\(\\theta_1, \\theta_2\\)", meaning: "the two angles, in the same unit" }],
      },
      authoredExample: {
        prompt: "Sector P has radius 6 cm and angle 100°. Sector Q has radius 9 cm and angle \\(\\frac{\\pi}{3}\\) radians. Find the ratio of their areas.",
        steps: [
          "\\(\\frac{\\pi}{3}\\) radians \\(= 60^\\circ\\).",
          "\\(A_P : A_Q = 100 \\times 36 : 60 \\times 81 = 3600 : 4860\\).",
          "Divide by 180: \\(20 : 27\\).",
        ],
        answer: "20 : 27",
      },
      selfCheckExample: {
        prompt: "Two sectors of the same circle have angles of 150° and \\(\\frac{\\pi}{2}\\) radians. Find the ratio of their areas.",
        steps: ["\\(\\frac{\\pi}{2}\\) radians \\(= 90^\\circ\\).", "Same radius, so the ratio is \\(150 : 90 = 5 : 3\\)."],
        answer: "5 : 3",
      },
      practiceSet: [
        { prompt: "Two sectors of one circle have angles of 40° and \\(\\frac{2\\pi}{9}\\) radians. What is the ratio of their areas?", answer: "1 : 1" },
        { prompt: "Two sectors have the same angle and radii of 4 cm and 6 cm. What is the ratio of their areas?", answer: "4 : 9" },
        { prompt: "Two sectors of one circle have angles of \\(\\frac{\\pi}{6}\\) radians and 90°. What is the ratio of their areas?", answer: "1 : 3" },
        {
          prompt: "Sector X has radius 2 cm and angle 90°. Sector Y has radius 4 cm and angle 45°. What is the ratio of their areas?",
          answer: "1 : 2",
          method: "\\(90 \\times 4 : 45 \\times 16 = 360 : 720\\).",
        },
      ],
      pyqExampleId: "0174b750-6bf1-4fe4-be87-4dd5727bda64",
      traps: [
        {
          title: "Comparing a degree number with a radian number",
          body: "\\(60\\) and \\(\\frac{\\pi}{3} \\approx 1.05\\) look very different but are the same angle. Convert before comparing, or a \\(1 : 1\\) ratio looks like \\(57 : 1\\).",
        },
        {
          title: "Comparing by angle when the radii are unknown",
          body: "Equal angles give equal areas only in circles of equal radius. If the stem does not say the radii are equal, the angles alone do not fix the ratio.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm2se-perimeter",
      name: "Finding a sector from its perimeter",
      intuition:
        "The perimeter ties the arc to the radius: arc plus two radii. Give one more fact (the angle, or the area) and the radius is pinned down.",
      definition:
        "- Perimeter \\(P = 2r + l\\).\n" +
        "- **Angle known:** the arc is a fixed multiple of \\(r\\) (for \\(90^\\circ\\) with \\(\\pi = \\frac{22}{7}\\), \\(l = \\frac{11}{7}r\\)), so \\(P = r \\times (2 + \\text{that multiple})\\). Solve for \\(r\\).\n" +
        "- **Area known:** \\(l = P - 2r\\) and \\(\\frac{1}{2}lr = A\\) give \\(r(P - 2r) = 2A\\), a quadratic in \\(r\\). It has two roots; keep the one the stem allows (a whole number, or one that matches an option).\n" +
        "- **Fast route:** put each option's radius into \\(r(P - 2r) = 2A\\) and keep the one that fits. Safe in a multiple-choice question; it does not tell you the second root.",
      formula: {
        label: "Sector perimeter and area together",
        latex: "P = 2r + l \\qquad r(P - 2r) = 2A",
      },
      authoredExample: {
        prompt: "A sector of angle 90° has a perimeter of 50 cm. Find its radius. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Arc \\(= \\frac{1}{4} \\times 2 \\times \\frac{22}{7} \\times r = \\frac{11r}{7}\\).",
          "\\(P = 2r + \\frac{11r}{7} = \\frac{25r}{7} = 50\\), so \\(r = 14\\) cm.",
          "Check: arc \\(= 22\\), and \\(22 + 28 = 50\\).",
        ],
        answer: "14 cm",
      },
      selfCheckExample: {
        prompt: "A sector has a perimeter of 33 cm and an area of 65 cm², and its radius is a whole number of centimetres. Find the radius and the arc.",
        steps: [
          "\\(r(33 - 2r) = 130\\), so \\(2r^2 - 33r + 130 = 0\\).",
          "\\(r = \\frac{33 \\pm \\sqrt{1089 - 1040}}{4} = \\frac{33 \\pm 7}{4}\\), so \\(r = 10\\) or \\(6.5\\).",
          "The whole number is \\(r = 10\\), and the arc is \\(33 - 20 = 13\\) cm.",
          "Check: \\(\\frac{1}{2} \\times 13 \\times 10 = 65\\).",
        ],
        answer: "Radius 10 cm, arc 13 cm",
      },
      practiceSet: [
        { prompt: "A sector has radius 5 cm and perimeter 22 cm. What is its area?", answer: "\\(30\\ \\text{cm}^2\\)", method: "Arc \\(= 12\\), area \\(= \\frac{1}{2} \\times 12 \\times 5\\)." },
        { prompt: "A semicircle has a perimeter of 36 cm. What is its radius? (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "7 cm", method: "\\(r\\left(2 + \\frac{22}{7}\\right) = \\frac{36r}{7} = 36\\)." },
        { prompt: "A sector has a central angle of 2 radians and a perimeter of 24 cm. What is its radius?", answer: "6 cm", method: "Arc \\(= 2r\\), so \\(4r = 24\\)." },
        { prompt: "A sector has radius 8 cm and perimeter 28 cm. What is its area?", answer: "\\(48\\ \\text{cm}^2\\)" },
      ],
      pyqExampleId: "82b70998-d8c5-434a-9a17-5fe9f3181bc7",
      traps: [
        {
          title: "Keeping the wrong root",
          body: "The perimeter-and-area equation is a quadratic with two positive roots. Both make a real sector; the stem's condition (a whole number, or the options) picks one.",
        },
      ],
    },
  ],
};
