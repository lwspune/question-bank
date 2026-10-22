import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SV_COMBINED_NOTE: SubtopicNote = {
  subtopicName: "Combined and Inscribed Solids",
  title: "Combined and Inscribed Solids",
  oneLineDefinition:
    "Comparing a cylinder, cone, sphere and hemisphere that share a radius or a height, the largest solid that fits inside another, and the surface or volume of solids joined together or hollowed out.",
  whyItMatters:
    "These questions put two solids from the earlier pages side by side, and each one comes down to the radius or height they share. The marks are lost on surfaces: counting the face hidden where two solids meet, leaving out the inside of a cavity, or putting a floor under a tent.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsv-same-base",
      name: "Solids on the same base, or with equal volumes",
      intuition:
        "A cone holds a third of the cylinder on the same base and height. When two solids share a radius or a height, write both volumes, cancel \\(\\pi\\) and the shared measure, and what is left is the answer.",
      definition:
        "- Same base and same height: cylinder \\(\\pi r^2 h\\), cone \\(\\tfrac13 \\pi r^2 h\\), so the cylinder holds three cones.\n" +
        "- A cylinder, a hemisphere and a cone all of radius \\(r\\) and height \\(r\\) hold \\(\\pi r^3\\), \\(\\tfrac23 \\pi r^3\\) and \\(\\tfrac13 \\pi r^3\\): in the ratio \\(3 : 2 : 1\\).\n" +
        "- A cone standing in a hemisphere on the same flat face has height \\(r\\), so it holds half the hemisphere.\n" +
        "- Equal volumes: set the two formulas equal and solve for the unknown length. Equal base and equal volume make the cone three times as tall as the cylinder.\n" +
        "- A ratio of radii is squared in every volume; a ratio of heights is not.",
      formula: {
        label: "Same base, same height",
        latex: "V_{\\text{cone}} = \\tfrac13 V_{\\text{cylinder}},\\quad V_{\\text{cylinder}} : V_{\\text{hemisphere}} : V_{\\text{cone}} = 3 : 2 : 1 \\;(h = r)",
      },
      authoredExample: {
        prompt: "A cone's base radius is three times a sphere's radius \\(r\\), and the two hold the same volume. Find the cone's height in terms of \\(r\\).",
        steps: [
          "\\(\\tfrac13 \\pi (3r)^2 h = \\tfrac43 \\pi r^3\\).",
          "\\(3r^2 h = \\tfrac43 r^3\\), so \\(h = \\tfrac{4r}{9}\\).",
        ],
        answer: "\\(\\tfrac{4r}{9}\\).",
      },
      selfCheckExample: {
        prompt: "A cone is cut out of a cylinder of radius 5 cm and height 12 cm, on the same base and with the same height. Find the volume left, in terms of \\(\\pi\\).",
        steps: [
          "Cylinder \\(\\pi \\times 25 \\times 12 = 300\\pi\\); cone a third of it, \\(100\\pi\\).",
          "Left: \\(300\\pi - 100\\pi\\).",
        ],
        answer: "\\(200\\pi\\) cm³.",
      },
      practiceSet: [
        { prompt: "A cone and a cylinder have the same base and the same volume. The cylinder is 8 cm tall. How tall is the cone?", answer: "24 cm" },
        {
          prompt: "A cone stands inside a hemisphere of radius 6 cm, on the hemisphere's flat face, with its tip touching the curved surface. Find the cone's volume in terms of \\(\\pi\\).",
          answer: "\\(72\\pi\\) cm³",
        },
        {
          prompt: "A cone of radius \\(r\\) and height \\(h\\) holds as much as a cylinder of radius \\(\\tfrac r3\\). Find the cylinder's height.",
          answer: "\\(3h\\)",
          method: "\\(\\tfrac13 r^2 h = \\tfrac{r^2}{9} H\\).",
        },
      ],
      pyqExampleId: "8680a28b-836e-448b-9351-d71888be8929",
      traps: [
        {
          title: "Square the ratio of radii",
          body: "A cone with three times a cylinder's radius and the same height holds \\(\\tfrac13 \\times 9 = 3\\) times as much, not as much. The radius enters squared.",
        },
        {
          title: "Equal volumes do not mean equal surfaces",
          body: "A cone and a cylinder on the same base with equal volumes have heights \\(3h\\) and \\(h\\). For curved surfaces you still need the cone's slant height, \\(\\sqrt{r^2 + 9h^2}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-inscribed",
      name: "The largest solid inside another",
      intuition:
        "The biggest sphere that fits in a box touches its faces, so its diameter is the box's smallest measure. Draw the side view in your head and read off the radius; the wood or metal left over is the outer volume less the inner one.",
      definition:
        "- Largest sphere in a cube of edge \\(a\\): diameter \\(a\\), radius \\(\\tfrac a2\\). The smallest cube round a sphere has edge \\(2r\\).\n" +
        "- Largest sphere in a cylinder: radius is the smaller of \\(r\\) and \\(\\tfrac h2\\).\n" +
        "- Largest cone in a cube of edge \\(a\\): radius \\(\\tfrac a2\\), height \\(a\\). Largest cone in a cylinder: the same base and height.\n" +
        "- Left over (wasted) = outer volume − inner volume.",
      formula: {
        label: "Carving one solid out of another",
        latex: "V_{\\text{left}} = V_{\\text{outer}} - V_{\\text{inner}}",
      },
      authoredExample: {
        prompt: "The largest possible sphere is carved from a cube of edge 10 cm. Find the volume of the sphere and of the wood left, in terms of \\(\\pi\\).",
        steps: [
          "The sphere's diameter is 10, so \\(r = 5\\): \\(\\tfrac43 \\pi \\times 125 = \\tfrac{500\\pi}{3}\\).",
          "Wood left: \\(1000 - \\tfrac{500\\pi}{3}\\).",
        ],
        answer: "\\(\\tfrac{500\\pi}{3}\\) cm³ and \\(\\left(1000 - \\tfrac{500\\pi}{3}\\right)\\) cm³.",
      },
      selfCheckExample: {
        prompt: "A cylinder has radius 5 cm and height 8 cm. Find the radius of the largest sphere that can be carved from it.",
        steps: [
          "Across, it is 10 cm wide; up, it is 8 cm tall.",
          "The sphere's diameter is the smaller, 8 cm.",
        ],
        answer: "4 cm.",
      },
      practiceSet: [
        { prompt: "Find the volume of the largest sphere that fits in a cube of edge 14 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "\\(\\tfrac{4312}{3}\\) cm³" },
        { prompt: "Find the volume of the smallest cube that holds a sphere of radius 5 cm.", answer: "1,000 cm³" },
        { prompt: "Find the volume of the largest cone that fits in a cube of edge 12 cm, in terms of \\(\\pi\\).", answer: "\\(144\\pi\\) cm³" },
        {
          prompt: "The largest sphere is carved from a cylinder whose height equals its diameter. What fraction of the wood is used?",
          answer: "\\(\\tfrac 23\\)",
          method: "\\(\\tfrac43 \\pi r^3\\) out of \\(2\\pi r^3\\).",
        },
      ],
      pyqExampleId: "e7063bd2-86ce-4c2e-8cc5-18e79f1f4053",
      traps: [
        {
          title: "The edge is the diameter, not the radius",
          body: "A sphere in a cube of edge 10 cm has radius 5 cm. Taking the radius as 10 makes the sphere eight times too big, and bigger than the cube.",
        },
        {
          title: "In a short cylinder the height decides",
          body: "A cylinder of radius 5 and height 8 holds a sphere of radius 4, not 5. Check both the width and the height.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-composite",
      name: "Solids joined together or hollowed out",
      intuition:
        "Glue two solids together and the faces where they meet disappear inside. Drill a cavity and you lose one flat face but gain the cavity's inner surface. Volumes simply add or subtract.",
      definition:
        "- Volume of a joined solid: add the parts. A cavity: subtract it.\n" +
        "- Surface: add only what you can see. Where a cone sits on a hemisphere, or a cone on a cylinder, the joining circle is hidden on both sides.\n" +
        "- A tent (cylinder with a cone on top) uses canvas for the two curved surfaces only: no floor, no hidden circle.\n" +
        "- A conical cavity drilled into a cylinder on the same base leaves the curved wall, one flat end and the cone's inner surface \\(\\pi rl\\).\n" +
        "- Turning a rectangle about one side makes a cylinder; a right triangle turned about a leg makes a cone.",
      formula: {
        label: "Two solids joined on a face",
        latex: "V = V_1 + V_2,\\quad S = S_1 + S_2 - 2 \\times (\\text{area of the joined face})",
      },
      authoredExample: {
        prompt:
          "A tent is a cylinder of radius 12 m and height 2 m with a cone of height 9 m on top. Find the canvas needed, in terms of \\(\\pi\\).",
        steps: [
          "Cylinder wall: \\(2\\pi \\times 12 \\times 2 = 48\\pi\\).",
          "Cone: slant \\(\\sqrt{144 + 81} = 15\\), curved surface \\(\\pi \\times 12 \\times 15 = 180\\pi\\).",
          "Canvas: \\(48\\pi + 180\\pi\\).",
        ],
        answer: "\\(228\\pi\\) m².",
      },
      selfCheckExample: {
        prompt:
          "A cone of the same base and height is drilled out of a solid cylinder of radius 9 cm and height 12 cm. Find the total surface of what is left, in terms of \\(\\pi\\).",
        steps: [
          "Curved wall \\(2\\pi \\times 9 \\times 12 = 216\\pi\\); one flat end \\(81\\pi\\).",
          "Cavity: slant \\(\\sqrt{81 + 144} = 15\\), inner surface \\(\\pi \\times 9 \\times 15 = 135\\pi\\).",
          "Total \\(216\\pi + 81\\pi + 135\\pi\\).",
        ],
        answer: "\\(432\\pi\\) cm².",
      },
      practiceSet: [
        {
          prompt: "A toy is a hemisphere of radius 7 cm with a cone of the same radius and height 24 cm on it. Find its surface in terms of \\(\\pi\\).",
          answer: "\\(273\\pi\\) cm²",
          method: "\\(98\\pi + 175\\pi\\).",
        },
        {
          prompt: "A container is a cylinder of radius 9 cm and height 20 cm with a hemisphere of the same radius on top. Find its volume in terms of \\(\\pi\\).",
          answer: "\\(2106\\pi\\) cm³",
        },
        { prompt: "A square of side 7 cm is turned about one side. Find the total surface of the solid formed, in terms of \\(\\pi\\).", answer: "\\(196\\pi\\) cm²" },
      ],
      pyqExampleId: "cfc6e6ae-2026-4b42-8955-8c15eab54428",
      traps: [
        {
          title: "No floor under a tent",
          body: "Canvas covers the cylinder's wall and the cone's curved surface. Adding the base circle, or the circle where the cone meets the cylinder, overcounts.",
        },
        {
          title: "A cavity adds a surface",
          body: "Drilling a cone out of a cylinder removes one flat end but opens up the cone's inner surface. Both changes must be made.",
        },
      ],
    },
  ],
};
