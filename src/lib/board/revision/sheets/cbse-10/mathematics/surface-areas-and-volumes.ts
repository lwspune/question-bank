import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 10 Mathematics, Ch. 12 Surface Areas and Volumes. Statements checked
 * against the NCERT Class 10 text (rationalised); formulas rebuilt; most-asked
 * years and marks from the CBSE board past-paper questions in the bank,
 * 2022-2026. Melting and recasting (conversion of solids) is no longer a
 * section of the rationalised book but was set in 2025 and 2026, so it stays
 * as a standard result.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Surface Areas and Volumes",
  chapterSlug: "surface-areas-and-volumes",
  source: "NCERT Mathematics (CBSE Class 10), Chapter 12",
  keyPoints: [
    {
      term: "Basic solids",
      text: "The chapter combines any two of the basic solids: cuboid, cone, cylinder, sphere and hemisphere. Learn each one's curved surface area (CSA), total surface area (TSA) and volume.",
    },
    {
      term: "Surface area of a combination",
      text: "The total surface area of the new solid is the sum of the curved surface areas of the parts you can **see**, plus any flat faces still showing.",
    },
    {
      term: "Hidden faces",
      text: "When two solids are joined, the faces that touch disappear. So do not add the two TSAs: leave out the joined faces.",
    },
    {
      term: "Volume of a combination",
      text: "The volume of a solid formed by joining two basic solids is the **sum** of their volumes. If one is scooped out of the other, **subtract** it.",
    },
    {
      term: "Matching radii",
      text: "When a cone or cylinder sits on a hemisphere, its base radius equals the hemisphere's radius (so the surface is smooth).",
    },
    {
      term: "Toy: cone on a hemisphere",
      text: "TSA of the toy = CSA of hemisphere + CSA of cone \\(= 2\\pi r^2 + \\pi r l\\). Volume \\(= \\frac{2}{3}\\pi r^3 + \\frac{1}{3}\\pi r^2 h\\).",
    },
    {
      term: "Bird-bath: cylinder with a hollow hemisphere",
      text: "TSA = CSA of cylinder + CSA of hemisphere \\(= 2\\pi r h + 2\\pi r^2 = 2\\pi r(h + r)\\).",
    },
  ],
  formulas: [
    { label: "Cuboid and cube", latex: "\\text{TSA} = 2(lb + bh + hl),\\ V = lbh; \\qquad \\text{cube: TSA} = 6a^2,\\ V = a^3" },
    { label: "Cylinder", latex: "\\text{CSA} = 2\\pi r h, \\quad \\text{TSA} = 2\\pi r(r + h), \\quad V = \\pi r^2 h" },
    { label: "Cone", latex: "l = \\sqrt{r^2 + h^2}, \\quad \\text{CSA} = \\pi r l, \\quad \\text{TSA} = \\pi r(l + r), \\quad V = \\frac{1}{3}\\pi r^2 h" },
    { label: "Sphere", latex: "\\text{SA} = 4\\pi r^2, \\qquad V = \\frac{4}{3}\\pi r^3" },
    { label: "Hemisphere (solid)", latex: "\\text{CSA} = 2\\pi r^2, \\quad \\text{TSA} = 3\\pi r^2, \\quad V = \\frac{2}{3}\\pi r^3" },
    { label: "Recasting (volume stays the same)", latex: "\\text{number of small solids} = \\frac{\\text{volume of the big solid}}{\\text{volume of one small solid}}" },
    { label: "Water flowing in a canal", latex: "\\text{volume per hour} = \\text{width} \\times \\text{depth} \\times \\text{speed (distance per hour)}" },
    { label: "Diagonal of a cube", latex: "d = \\sqrt{3}\\,a" },
  ],
  derivations: [
    {
      title: "Toy: a cone of radius 3.5 cm on a hemisphere of the same radius, total height 15.5 cm. Find its total surface area",
      steps: [
        "Height of the cone \\(= 15.5 - 3.5 = 12\\) cm. Slant height \\(l = \\sqrt{12^2 + 3.5^2} = \\sqrt{156.25} = 12.5\\) cm.",
        "TSA = CSA of hemisphere + CSA of cone \\(= 2\\pi r^2 + \\pi r l = \\pi r(2r + l)\\).",
        "\\(= \\frac{22}{7} \\times 3.5 \\times (7 + 12.5) = 11 \\times 19.5 = 214.5\\ \\text{cm}^2\\).",
      ],
    },
    {
      title: "Wooden article: a hemisphere scooped out of each end of a cylinder (h = 10 cm, r = 3.5 cm). Find its total surface area",
      steps: [
        "The flat ends are gone; the inside of each hemisphere now shows. TSA = CSA of cylinder + 2 × CSA of hemisphere.",
        "CSA of cylinder \\(= 2\\pi r h = 2 \\times \\frac{22}{7} \\times 3.5 \\times 10 = 220\\ \\text{cm}^2\\).",
        "Two hemispheres \\(= 2 \\times 2\\pi r^2 = 4 \\times \\frac{22}{7} \\times 12.25 = 154\\ \\text{cm}^2\\).",
        "TSA \\(= 220 + 154 = 374\\ \\text{cm}^2\\).",
      ],
    },
    {
      title: "Lead shots (r = 0.5 cm) dropped into a full conical vessel (h = 8 cm, r = 5 cm) spill one-fourth of the water. Find their number",
      steps: [
        "Volume of the cone \\(= \\frac{1}{3}\\pi \\times 5^2 \\times 8 = \\frac{200\\pi}{3}\\ \\text{cm}^3\\). Water out \\(= \\frac{1}{4}\\) of it \\(= \\frac{50\\pi}{3}\\).",
        "Volume of one shot \\(= \\frac{4}{3}\\pi (0.5)^3 = \\frac{\\pi}{6}\\ \\text{cm}^3\\).",
        "Number of shots \\(= \\frac{50\\pi}{3} \\div \\frac{\\pi}{6} = 100\\).",
      ],
    },
  ],
  diagrams: [],
  mostAsked: [
    { topic: "Case study: lamps and bulbs, milk packets and cups, golf ball dimples, fountain, tent, caps", marks: 2, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Solid made of two shapes (cone on a hemisphere, cylinder with hemispheres or cones, tent, room with a dome): surface area or volume", marks: 5, years: [2026, 2025, 2024, 2023] },
    { topic: "A shape scooped or carved out of another (hemispheres from a cylinder, cone from a cube, die with depressions)", marks: 5, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Cubes joined end to end; surface area or volume of one basic solid (MCQ)", marks: 1, years: [2026, 2025, 2024, 2023, 2022] },
    { topic: "Melting and recasting, lead shots or marbles in water, water flowing in a canal", marks: 2, years: [2026, 2025, 2023, 2022] },
    { topic: "Ratio of volumes or surface areas of a cylinder, a cone and a sphere", years: [2026, 2025, 2022] },
  ],
  mistakes: [
    {
      title: "Adding the TSA of both parts",
      body: "For a cone on a hemisphere, use the **curved** surfaces only. The flat circle where they join is hidden and must not be counted.",
    },
    {
      title: "Using height for slant height",
      body: "CSA of a cone is \\(\\pi r l\\) with \\(l = \\sqrt{r^2 + h^2}\\). Find \\(l\\) first if only \\(h\\) is given.",
    },
    {
      title: "Hemisphere: 2πr² or 3πr²?",
      body: "Curved surface \\(2\\pi r^2\\) (a bowl, or a dome on a room). Total surface \\(3\\pi r^2\\) only for a **solid** hemisphere with its flat face showing.",
    },
    {
      title: "Scooping out: area and volume behave differently",
      body: "Scooping a hemisphere out of a cylinder **reduces** the volume but can **increase** the surface area (the inside of the bowl now shows).",
    },
    {
      title: "Mixed units",
      body: "Change all lengths to one unit first (m or cm). For a canal, change km/h to m per hour; \\(1\\ \\text{m}^3 = 1000\\) litres.",
    },
  ],
};

export default sheet;
