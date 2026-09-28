import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_FRUSTUMS_NOTE: SubtopicNote = {
  subtopicName: "Frustums and Combined Solids",
  title: "Frustums & Combined Solids",
  oneLineDefinition:
    "The frustum of a cone (buckets, glasses, lamp shades), a cone cut parallel to its base, and solids built from a cylinder, a cone and a hemisphere.",
  whyItMatters:
    "The largest page of the chapter after the cuboid pair, and almost all MODERATE. Tents and buildings made of joined solids recur every few papers; the only judgement needed is which surfaces are on the outside.",
  concepts: [
    // C1 — the frustum
    {
      kind: "formula" as const,
      slug: "cdsm3-frustum",
      name: "The frustum",
      intuition:
        "A frustum is a cone with its top sliced off. Its volume formula looks like a cone's with the radius replaced by an 'average' of the two radii; its slant height is Pythagoras on the height and the DIFFERENCE of the radii.",
      definition:
        "For end radii \\(R > r\\) and height \\(h\\):\n" +
        "- Volume \\(= \\dfrac13\\pi h\\left(R^2 + Rr + r^2\\right)\\).\n" +
        "- Slant height \\(l = \\sqrt{h^2 + (R - r)^2}\\).\n" +
        "- Curved surface \\(= \\pi(R + r)l\\); add \\(\\pi R^2 + \\pi r^2\\) for the whole surface (an open bucket adds only the bottom).\n" +
        "- Completing the cone: the missing top cone has height \\(H\\) with \\(\\dfrac{H}{H + h} = \\dfrac rR\\).",
      formula: {
        label: "Frustum",
        latex: "V = \\tfrac13\\pi h(R^2 + Rr + r^2), \\qquad l = \\sqrt{h^2 + (R - r)^2}",
      },
      authoredExample: {
        prompt: "A bucket has end radii \\(14\\) cm and \\(7\\) cm and height \\(12\\) cm. Find its capacity. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(R^2 + Rr + r^2 = 196 + 98 + 49 = 343\\).",
          "\\(V = \\dfrac13\\times\\dfrac{22}{7}\\times 12\\times 343 = 4312\\) cm\\(^3\\).",
        ],
        answer: "\\(4312\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "A frustum has end radii \\(20\\) cm and \\(8\\) cm and height \\(5\\) cm. Find its slant height.",
        steps: [
          "\\(R - r = 12\\).",
          "\\(l = \\sqrt{25 + 144} = 13\\) cm.",
        ],
        answer: "\\(13\\) cm.",
      },
      practiceSet: [
        { prompt: "\\(R = 2\\), \\(r = 1\\), \\(h = 3\\): volume?", answer: "\\(7\\pi\\)" },
        { prompt: "\\(R = 7\\), \\(r = 4\\), \\(h = 4\\): slant height?", answer: "\\(5\\)" },
        { prompt: "\\(R = 7\\), \\(r = 4\\), \\(l = 5\\): curved surface?", answer: "\\(55\\pi\\)" },
        { prompt: "Radii \\(3\\) and \\(4\\), frustum \\(2\\) high: height of the missing top cone?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "58c098bd-3fa6-403b-b05a-6e528037199c", // 2019 (I) — bucket, diameters 6 and 12, height 7
      traps: [
        {
          title: "Slant height uses the difference of the radii",
          body:
            "\\(l = \\sqrt{h^2 + (R - r)^2}\\), not \\(\\sqrt{h^2 + R^2}\\). Using the full radius gives the slant of the whole cone, which is longer.",
        },
      ],
    },

    // C2 — a cone cut parallel to its base
    {
      kind: "formula" as const,
      slug: "cdsm3-cut-cone",
      name: "A cone cut parallel to its base",
      intuition:
        "The piece cut off the top is a small cone similar to the whole. Every length scales by the same factor \\(k\\), surfaces by \\(k^2\\) and volumes by \\(k^3\\). The frustum is what is left.",
      definition:
        "If the top cone has \\(k\\) times the height of the whole:\n" +
        "- Its volume is \\(k^3\\) of the whole; the frustum's is \\(1 - k^3\\).\n" +
        "- Its curved surface is \\(k^2\\) of the whole; the frustum's is \\(1 - k^2\\).\n" +
        "- The cut is \\(kH\\) below the apex, i.e. \\((1 - k)H\\) above the base.",
      formula: {
        label: "Similar top cone",
        latex: "\\frac{V_{\\text{top}}}{V} = k^3, \\qquad \\frac{S_{\\text{top}}}{S} = k^2",
      },
      authoredExample: {
        prompt: "A cone \\(40\\) cm high is cut parallel to its base so that the top cone has \\(\\dfrac18\\) of the volume. How far above the base is the cut?",
        steps: [
          "\\(k^3 = \\dfrac18\\), so \\(k = \\dfrac12\\): the top cone is \\(20\\) cm high.",
          "The cut is \\(40 - 20 = 20\\) cm above the base.",
        ],
        answer: "\\(20\\) cm.",
      },
      selfCheckExample: {
        prompt: "A cone is cut into a top cone and a frustum whose volumes are in the ratio \\(8 : 19\\). Find the ratio of their curved surfaces.",
        steps: [
          "The top cone is \\(8\\) parts of \\(27\\), so \\(k = \\dfrac23\\).",
          "Curved surfaces: top \\(4\\) parts of \\(9\\), frustum \\(5\\). Ratio \\(4 : 5\\).",
        ],
        answer: "\\(4 : 5\\).",
      },
      practiceSet: [
        { prompt: "Radii of a frustum \\(3 : 1\\): frustum : whole cone by volume?", answer: "\\(26 : 27\\)" },
        { prompt: "Top cone \\(\\tfrac{1}{27}\\) of the volume, whole height \\(9\\): frustum height?", answer: "\\(6\\)" },
        { prompt: "\\(k = \\tfrac12\\): top cone's share of the curved surface?", answer: "\\(\\tfrac14\\)" },
        { prompt: "Radii \\(2 : 1\\): frustum's share of the volume?", answer: "\\(\\tfrac78\\)" },
      ],
      pyqExampleId: "a8174f0e-9737-40ec-838c-a276a2c9472b", // 2022 (II) — cone 30 cm, top cone 1/27 of the volume
      traps: [
        {
          title: "Height from the base, or from the apex?",
          body:
            "\\(k\\) measures the top cone from the APEX. A question asking for the height of the cut above the base wants \\(1 - k\\) of the height, and the \\(k\\) value is the planted option.",
        },
      ],
    },

    // C3 — combined solids
    {
      kind: "formula" as const,
      slug: "cdsm3-combined-solids",
      name: "Solids joined together",
      intuition:
        "Volumes of joined solids simply add. Surfaces do not: where two solids meet, the joining circle is hidden inside, so count only what the outside air touches.",
      definition:
        "- Tent (cylinder with a cone on top): canvas \\(= 2\\pi rh + \\pi rl\\); no floor, no joining circle.\n" +
        "- Building (cylinder with a hemispherical dome): air \\(= \\pi r^2h + \\dfrac23\\pi r^3\\).\n" +
        "- Cone on a hemisphere: surface \\(= \\pi rl + 2\\pi r^2\\).\n" +
        "- A hemisphere on a cube's face: the cube loses \\(\\pi r^2\\) and gains \\(2\\pi r^2\\), a net \\(+\\pi r^2\\).\n" +
        "- A cone hollowed out of a cylinder: the cavity adds the cone's curved surface.",
      formula: {
        label: "Cylinder-and-cone tent",
        latex: "\\text{canvas} = 2\\pi r h + \\pi r l",
      },
      authoredExample: {
        prompt: "A tent is a cylinder of radius \\(14\\) m and height \\(3\\) m, topped by a cone of the same radius with slant height \\(25\\) m. Find the canvas needed. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "Cylinder wall \\(= 2\\times\\dfrac{22}{7}\\times 14\\times 3 = 264\\) m\\(^2\\).",
          "Cone \\(= \\dfrac{22}{7}\\times 14\\times 25 = 1100\\) m\\(^2\\).",
          "Canvas \\(= 1364\\) m\\(^2\\).",
        ],
        answer: "\\(1364\\) m\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "A solid is a cone of radius \\(3\\) cm and height \\(4\\) cm on a hemisphere of radius \\(3\\) cm. Find its surface area.",
        steps: [
          "Cone's curved surface \\(= \\pi(3)(5) = 15\\pi\\).",
          "Hemisphere's curved surface \\(= 2\\pi(9) = 18\\pi\\).",
          "Total \\(= 33\\pi\\) cm\\(^2\\).",
        ],
        answer: "\\(33\\pi\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Cone of height \\(2r\\) on a hemisphere of radius \\(r\\): volume?", answer: "\\(\\tfrac43\\pi r^3\\)" },
        { prompt: "Hemisphere of radius \\(2\\) on a cube of edge \\(4\\): surface?", answer: "\\(96 + 4\\pi\\)" },
        { prompt: "Cylinder \\(r = 1\\), \\(h = 2\\) with a hemispherical dome: volume?", answer: "\\(\\tfrac83\\pi\\)" },
        { prompt: "Conical cavity \\(r = 3\\), \\(h = 4\\) in a cylinder: surface of the cavity?", answer: "\\(15\\pi\\)" },
      ],
      pyqExampleId: "620dbd8e-8296-45e7-8776-eba021436644", // 2021 (II) — cone 16 high on a hemisphere, diameter 14
      traps: [
        {
          title: "The joining circle is not a surface",
          body:
            "Where the cone meets the hemisphere, or the dome meets the cylinder, the circle is inside the solid. Adding \\(\\pi r^2\\) for it is the commonest overcount.",
        },
      ],
    },
  ],
};
