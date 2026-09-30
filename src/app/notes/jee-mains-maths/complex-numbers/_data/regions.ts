import type { SubtopicNote } from "@/app/notes/_types";

export const REGIONS_CX_NOTE: SubtopicNote = {
  subtopicName: "Regions and Extreme Distances",
  title: "Regions and Extreme Distances",
  oneLineDefinition:
    "Sets of complex numbers given by inequalities — disks, half-planes, annuli — and the greatest or least distance from a point to such a set.",
  whyItMatters:
    "Twenty-six PYQs, nineteen of them multiple choice, and four from 2026. Seventeen ask for the greatest or least value of a distance such as |z − c| over a circle, a disk or a disk cut by a line; nine describe a region itself — its area, its corners or the lattice points in it. Two ideas cover the page.",
  concepts: [
    // C1 — extreme distances
    {
      kind: "formula" as const,
      slug: "jcx-extreme",
      name: "Greatest and least distances",
      intuition:
        "\\(|z-c|\\) is the distance from \\(z\\) to the point \\(c\\). Over a circle with centre \\(a\\) and radius \\(r\\) it ranges from \\(\\big||c-a|-r\\big|\\) to \\(|c-a|+r\\), both reached on the line through \\(c\\) and \\(a\\). Between two circles whose centres are \\(d\\) apart, the greatest distance is \\(d+r_1+r_2\\) and, if they are apart, the least is \\(d-r_1-r_2\\). When a line cuts the disk, check whether the extreme point of the whole disk survives the cut; if not, the extreme is at an end of the chord or on the line.",
      definition:
        "- On \\(|z-a|=r\\): greatest \\(|z-c|\\) is \\(|c-a|+r\\), least is \\(\\big||c-a|-r\\big|\\).\n" +
        "- Over the disk \\(|z-a|\\le r\\): the least is 0 if \\(c\\) is inside.\n" +
        "- Two disks with centres \\(d\\) apart: least \\(\\max(0,d-r_1-r_2)\\), greatest \\(d+r_1+r_2\\).\n" +
        "- \\(|pz+q|=|p|\\left|z+\\frac qp\\right|\\).\n" +
        "- Greatest argument on a disk away from 0: the point where a tangent from 0 touches it.",
      formula: {
        label: "Distance from a point to a circle",
        latex: "\\big||c-a|-r\\big|\\le|z-c|\\le|c-a|+r\\quad(|z-a|=r)",
      },
      authoredExample: {
        prompt: "Find the least and greatest \\(|z-5-12i|\\) for \\(|z|=2\\).",
        steps: [
          "The centre is 0 and \\(|5+12i|=13\\).",
        ],
        answer: "Least 11, greatest 15.",
      },
      selfCheckExample: {
        prompt: "Find the greatest \\(|z_1-z_2|\\) if \\(|z_1-1|\\le2\\) and \\(|z_2+4i|\\le1\\).",
        steps: [
          "The centres \\(1\\) and \\(-4i\\) are \\(\\sqrt{17}\\) apart.",
        ],
        answer: "\\(\\sqrt{17}+3\\).",
      },
      practiceSet: [
        { prompt: "Least \\(|z-3-4i|\\) for \\(|z|\\le1\\)?", answer: "\\(4\\)" },
        { prompt: "Least \\(|z|\\) on \\(|z-3i|=1\\)?", answer: "\\(2\\)" },
        { prompt: "Greatest \\(|2z+4i|\\) for \\(|z|=1\\)?", answer: "\\(6\\)" },
        { prompt: "Least \\(|z_1-z_2|\\) for \\(|z_1|=1\\), \\(|z_2-5|=2\\)?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "2943791a-c267-426a-9e3f-ce14196d2989", // 2025 — least distance between two disks
      traps: [
        {
          title: "Is the extreme point still in the region?",
          body: "For a disk cut by a line, the farthest or nearest point of the whole disk may lie on the removed side. Then the answer sits at an end of the chord or at the foot of a perpendicular on the line.",
        },
      ],
    },

    // C2 — regions
    {
      kind: "formula" as const,
      slug: "jcx-region",
      name: "Regions, areas and lattice points",
      intuition:
        "Translate each condition and draw them together. \\(|z-a|\\le r\\) is a disk and \\(r_1\\le|z-a|\\le r_2\\) an annulus; \\(|z-a|\\le|z-b|\\) is the half-plane on \\(a\\)'s side of the bisector; conditions on \\(\\mathrm{Re}\\), \\(\\mathrm{Im}\\) or a linear expression are half-planes. When the boundary lines pass through the centre of a disk, the region is a sector; a line at distance \\(p\\) from the centre cuts off a segment. Counting points with integer coordinates is counting pairs \\((u,v)\\) with \\(u^2+v^2\\) in a range.",
      definition:
        "- \\(|z-a|\\le r\\): disk; \\(r_1\\le|z-a|\\le r_2\\): annulus.\n" +
        "- \\(|z-a|\\le|z-b|\\): the half-plane containing \\(a\\).\n" +
        "- Sector of angle \\(\\varphi\\): area \\(\\frac12r^2\\varphi\\).\n" +
        "- Segment cut by a chord subtending \\(\\varphi\\): area \\(\\frac12r^2(\\varphi-\\sin\\varphi)\\).",
      formula: {
        label: "Sector and segment",
        latex: "\\text{sector}=\\tfrac12r^2\\varphi,\\qquad\\text{segment}=\\tfrac12r^2(\\varphi-\\sin\\varphi)",
      },
      authoredExample: {
        prompt: "Find the area of \\(\\{z:|z|\\le4,\\ \\mathrm{Re}(z)\\ge0,\\ \\mathrm{Im}(z)\\ge0\\}\\).",
        steps: [
          "A quarter of the disk of radius 4.",
        ],
        answer: "\\(4\\pi\\).",
      },
      selfCheckExample: {
        prompt: "How many \\(z=a+ib\\) with \\(a,b\\) integers have \\(|z|<2\\)?",
        steps: [
          "\\(a^2+b^2<4\\): \\((0,0)\\), four points with one coordinate \\(\\pm1\\), four with both \\(\\pm1\\).",
        ],
        answer: "\\(9\\).",
      },
      practiceSet: [
        { prompt: "Area of \\(1\\le|z|\\le2\\)?", answer: "\\(3\\pi\\)" },
        { prompt: "\\(|z-1|\\le|z+1|\\)?", answer: "\\(\\mathrm{Re}(z)\\ge0\\)" },
        { prompt: "Segment of the unit disk cut by a chord subtending \\(\\frac\\pi2\\)?", answer: "\\(\\frac\\pi4-\\frac12\\)" },
        { prompt: "Area of \\(|z|\\le2\\) with \\(\\mathrm{Im}(z)\\ge\\mathrm{Re}(z)\\)?", answer: "\\(2\\pi\\)" },
      ],
      pyqExampleId: "76bf74ec-24a8-407c-866b-9b6609ed6150", // 2024 — area of a disk cut by two lines through its centre
      traps: [
        {
          title: "Which side of the bisector",
          body: "\\(|z-a|<|z-b|\\) is the side that contains \\(a\\). Test one point, such as \\(a\\) itself, rather than guessing from the sign of an expanded inequality.",
        },
      ],
    },
  ],
};
