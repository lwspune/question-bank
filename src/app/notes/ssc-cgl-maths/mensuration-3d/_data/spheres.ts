import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_SPHERES_NOTE: SubtopicNote = {
  subtopicName: "Spheres, Hemispheres and Shells",
  title: "Spheres, Hemispheres and Shells",
  oneLineDefinition:
    "A sphere holds four thirds of π r³ and its surface is 4πr². A hemisphere is half of each, plus a flat circle when it is solid, and a hollow ball is the difference of two balls.",
  whyItMatters:
    "Twenty-one questions in the bank, seventeen EASY and four MODERATE, fourteen of them from the 2025 shifts. Six of them fit a sphere inside a cube, a box or a cone. Learn the five formulas in the first box by heart: every row on this page starts from them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3sp-formulas",
      name: "Volume and surface area of a sphere and a hemisphere",
      intuition:
        "A ball's skin is exactly four of the circles you get by cutting it through the centre. A hemisphere is half the ball: half the volume and half the curved skin, plus a flat circle if it is solid.",
      definition:
        "- **Sphere**: volume \\(\\frac{4}{3}\\pi r^3\\), surface \\(4\\pi r^2\\). In terms of the diameter the surface is \\(\\pi d^2\\).\n" +
        "- **Hemisphere**: half the sphere's volume, \\(\\frac{2}{3}\\pi r^3\\), and half its skin, \\(2\\pi r^2\\). Being **solid** adds the flat circle \\(\\pi r^2\\), which brings the total to \\(3\\pi r^2\\).\n" +
        "- A thin **bowl** painted inside and outside: \\(2 \\times 2\\pi r^2 = 4\\pi r^2\\).\n" +
        "- A **dome** over a circle of radius \\(r\\) has curved surface \\(2\\pi r^2\\), twice the circle it covers.\n" +
        "- Working back: from the surface, \\(r^2 = \\frac{S}{4\\pi}\\); from the volume, \\(r^3 = \\frac{3V}{4\\pi}\\).",
      formula: {
        label: "Sphere and hemisphere",
        latex:
          "V_{\\text{sphere}} = \\frac{4}{3}\\pi r^3 \\qquad S_{\\text{sphere}} = 4\\pi r^2 \\qquad V_{\\text{hemi}} = \\frac{2}{3}\\pi r^3 \\qquad \\text{CSA}_{\\text{hemi}} = 2\\pi r^2 \\qquad \\text{TSA}_{\\text{hemi}} = 3\\pi r^2",
      },
      authoredExample: {
        prompt: "A solid hemisphere has radius 21 cm. Find its volume, its curved surface area and its total surface area. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Volume \\(= \\frac{2}{3} \\times \\frac{22}{7} \\times 21^3 = \\frac{44}{21} \\times 9261 = 44 \\times 441 = 19404\\ \\text{cm}^3\\).",
          "One circle through the centre has area \\(\\frac{22}{7} \\times 441 = 1386\\ \\text{cm}^2\\).",
          "Curved surface \\(= 2 \\times 1386 = 2772\\ \\text{cm}^2\\); total surface \\(= 3 \\times 1386 = 4158\\ \\text{cm}^2\\).",
        ],
        answer: "\\(19404\\ \\text{cm}^3\\), \\(2772\\ \\text{cm}^2\\) and \\(4158\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "The surface area of a sphere is \\(616\\ \\text{cm}^2\\). Find its radius and its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(4 \\times \\frac{22}{7} \\times r^2 = 616\\), so \\(r^2 = \\frac{616 \\times 7}{88} = 49\\) and \\(r = 7\\) cm.",
          "Volume \\(= \\frac{4}{3} \\times \\frac{22}{7} \\times 343 = \\frac{4312}{3} \\approx 1437.33\\ \\text{cm}^3\\).",
        ],
        answer: "7 cm and about \\(1437.33\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the surface area of a sphere of radius 10.5 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(1386\\ \\text{cm}^2\\)" },
        { prompt: "Find the volume of a hemisphere of radius 3 cm in terms of \\(\\pi\\).", answer: "\\(18\\pi\\ \\text{cm}^3\\)" },
        { prompt: "A sphere has diameter 10 cm. Find its surface area in terms of \\(\\pi\\).", answer: "\\(100\\pi\\ \\text{cm}^2\\)" },
        {
          prompt: "A bowl of radius 14 cm and negligible thickness is painted inside and outside. Find the painted area. (Take \\(\\pi = \\frac{22}{7}\\).)",
          answer: "\\(2464\\ \\text{cm}^2\\)",
          method: "\\(4\\pi r^2 = 4 \\times 616\\).",
        },
      ],
      pyqExampleId: "757ba653-1ee1-4bba-ae1f-f72028f747e7",
      traps: [
        {
          title: "Curved or total surface of a hemisphere",
          body:
            "A solid hemisphere has a flat face too, so its total surface is \\(3\\pi r^2\\). The curved part alone is \\(2\\pi r^2\\). Read which one the question names.",
        },
        {
          title: "Diameter put in as the radius",
          body:
            "A ball 7 cm across has radius 3.5 cm. Putting 7 into \\(\\frac{4}{3}\\pi r^3\\) gives eight times the true volume.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3sp-shells",
      name: "Hollow spheres and hemispherical shells",
      intuition:
        "A hollow ball is a big ball with a smaller ball taken out of its centre. The metal is the difference of the two volumes, never the volume of a ball whose radius is the thickness.",
      definition:
        "- **Spherical shell**, outer radius \\(R\\), inner radius \\(r\\): metal \\(= \\frac{4}{3}\\pi(R^3 - r^3)\\).\n" +
        "- **Hemispherical shell** (a bowl with thickness): metal \\(= \\frac{2}{3}\\pi(R^3 - r^3)\\).\n" +
        "- With thickness \\(t\\): \\(R = r + t\\). If the outer diameter is given, halve it first, then \\(r = R - t\\).\n" +
        "- The outer and inner curved surfaces compare as \\(R^2 : r^2\\).",
      formula: {
        label: "Metal in a shell",
        latex: "V_{\\text{shell}} = \\frac{4}{3}\\pi(R^3 - r^3) \\qquad V_{\\text{hemi shell}} = \\frac{2}{3}\\pi(R^3 - r^3)",
        symbols: [
          { symbol: "\\(R\\)", meaning: "outer radius" },
          { symbol: "\\(r\\)", meaning: "inner radius" },
        ],
      },
      authoredExample: {
        prompt: "A hollow ball has outer radius 6 cm and inner radius 5 cm. Find the volume of material in terms of \\(\\pi\\).",
        steps: [
          "\\(R^3 - r^3 = 216 - 125 = 91\\).",
          "Material \\(= \\frac{4}{3}\\pi \\times 91 = \\frac{364\\pi}{3}\\ \\text{cm}^3\\), about \\(381.2\\ \\text{cm}^3\\).",
        ],
        answer: "\\(\\frac{364\\pi}{3}\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A hemispherical bowl has inner radius 6 cm and is 1 cm thick. Find the volume of the material in terms of \\(\\pi\\).",
        steps: [
          "Outer radius \\(= 6 + 1 = 7\\) cm, so \\(R^3 - r^3 = 343 - 216 = 127\\).",
          "Material \\(= \\frac{2}{3}\\pi \\times 127 = \\frac{254\\pi}{3}\\ \\text{cm}^3\\).",
        ],
        answer: "\\(\\frac{254\\pi}{3}\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        {
          prompt: "A hollow sphere has outer radius 3 cm and inner radius 1 cm. Find the volume of metal in terms of \\(\\pi\\).",
          answer: "\\(\\frac{104\\pi}{3}\\ \\text{cm}^3\\)",
        },
        { prompt: "A spherical shell has outer diameter 12 cm and is 1 cm thick. What is its inner radius?", answer: "5 cm" },
        {
          prompt: "The outer radius of a hemispherical shell is three times its inner radius. Find the ratio of its outer curved surface to its inner curved surface.",
          answer: "\\(9 : 1\\)",
        },
      ],
      pyqExampleId: "b9c5800c-361e-41ce-9d90-4bcf5afa960e",
      traps: [
        {
          title: "Cubing the thickness",
          body:
            "The metal is \\(\\frac{4}{3}\\pi(R^3 - r^3)\\), not \\(\\frac{4}{3}\\pi(R - r)^3\\). For radii 3 and 2 the bracket is 19 in the first and only 1 in the second.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3sp-volume-surface",
      name: "When the volume is a multiple of the surface area",
      intuition:
        "Divide a sphere's volume by its surface and nearly everything cancels: four thirds of π r³ over 4πr² leaves r over 3. A hemisphere's volume over its curved surface leaves the same r over 3.",
      definition:
        "- Sphere: \\(\\frac{V}{S} = \\frac{\\frac{4}{3}\\pi r^3}{4\\pi r^2} = \\frac{r}{3}\\).\n" +
        "- Hemisphere, volume over **curved** surface: \\(\\frac{\\frac{2}{3}\\pi r^3}{2\\pi r^2} = \\frac{r}{3}\\).\n" +
        "- So \"the volume is numerically \\(k\\) times the surface\" means \\(\\frac{r}{3} = k\\), that is \\(r = 3k\\).\n" +
        "- The shortcut holds only for the surface named. Against the total surface \\(3\\pi r^2\\) of a solid hemisphere the ratio is \\(\\frac{2r}{9}\\).",
      formula: {
        label: "Volume over surface for a sphere",
        latex: "\\frac{V}{S} = \\frac{r}{3}",
      },
      authoredExample: {
        prompt: "The volume of a sphere is numerically equal to twice its surface area. Find its radius.",
        steps: [
          "\\(\\frac{V}{S} = \\frac{r}{3} = 2\\), so \\(r = 6\\).",
          "Check: \\(V = \\frac{4}{3}\\pi \\times 216 = 288\\pi\\) and \\(S = 4\\pi \\times 36 = 144\\pi\\), and \\(288 = 2 \\times 144\\).",
        ],
        answer: "6 units",
      },
      selfCheckExample: {
        prompt: "The volume of a solid hemisphere is numerically equal to its total surface area. Find its radius.",
        steps: [
          "\\(\\frac{2}{3}\\pi r^3 = 3\\pi r^2\\) gives \\(\\frac{2r}{9} = 1\\), so \\(r = 4.5\\).",
          "Check: both sides equal \\(60.75\\pi\\).",
        ],
        answer: "4.5 units",
      },
      practiceSet: [
        { prompt: "For a sphere of radius 12 cm, what number do you get when you divide its volume by its surface area?", answer: "4" },
        { prompt: "A hemisphere's volume is numerically 5 times its curved surface area. Find its radius.", answer: "15 units" },
      ],
      pyqExampleId: "693aa6f3-5314-4dc5-92ec-a5c3e9bcad6f",
      traps: [
        {
          title: "The wrong surface for a hemisphere",
          body:
            "The \\(\\frac{r}{3}\\) shortcut for a hemisphere uses its curved surface \\(2\\pi r^2\\). With the total surface \\(3\\pi r^2\\) the ratio is \\(\\frac{2r}{9}\\), so check which surface the question means.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3sp-inside",
      name: "The largest sphere inside a cube, a box or a cone",
      intuition:
        "A ball inside a box is stopped by the closest pair of walls. So the largest ball that fits has a diameter equal to the box's smallest edge.",
      definition:
        "- **In a cube** of edge \\(a\\): the largest ball has diameter \\(a\\), radius \\(\\frac{a}{2}\\). It fills \\(\\frac{\\pi}{6}\\) of the cube, about 52%, and leaves about 48% empty.\n" +
        "- **In a cuboid** \\(l \\times b \\times h\\): the diameter is the smallest of \\(l\\), \\(b\\) and \\(h\\).\n" +
        "- **Empty space** \\(=\\) volume of the box \\(-\\) volume of the ball.\n" +
        "- **In a cone** of base radius \\(r\\), height \\(h\\) and slant height \\(l\\): the ball resting on the base and touching the curved side has radius \\(\\frac{rh}{r + l}\\). Cut the cone through its tip and this is the circle inside the triangle you see: its radius is the triangle's area \\(rh\\) over half its perimeter \\(r + l\\).",
      formula: {
        label: "Radius of the largest ball",
        latex: "\\rho_{\\text{cube}} = \\frac{a}{2} \\qquad \\rho_{\\text{cuboid}} = \\frac{\\text{smallest edge}}{2} \\qquad \\rho_{\\text{cone}} = \\frac{rh}{r + l}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "radius of the ball" },
          { symbol: "\\(r, h, l\\)", meaning: "base radius, height and slant height of the cone" },
        ],
      },
      authoredExample: {
        prompt: "A box is 20 cm long, 15 cm wide and 10 cm high. The largest ball that fits is put inside it. Find the space left empty.",
        steps: [
          "The smallest edge is 10 cm, so the ball's diameter is 10 cm and its radius 5 cm.",
          "Ball \\(= \\frac{4}{3}\\pi \\times 125 = \\frac{500\\pi}{3}\\ \\text{cm}^3\\); box \\(= 20 \\times 15 \\times 10 = 3000\\ \\text{cm}^3\\).",
          "Empty space \\(= 3000 - \\frac{500\\pi}{3}\\ \\text{cm}^3\\), about \\(2476\\ \\text{cm}^3\\).",
        ],
        answer: "\\(\\left(3000 - \\frac{500\\pi}{3}\\right)\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A cone has base radius 12 cm and height 16 cm. Find the radius of the largest ball that rests on its base and touches its curved surface.",
        steps: [
          "Slant height \\(= \\sqrt{144 + 256} = 20\\) cm.",
          "Radius \\(= \\frac{12 \\times 16}{12 + 20} = \\frac{192}{32} = 6\\) cm.",
        ],
        answer: "6 cm",
      },
      practiceSet: [
        { prompt: "What is the radius of the largest ball that fits in a cube of edge 10 cm?", answer: "5 cm" },
        { prompt: "What fraction of a cube's volume does the largest ball inside it fill, in terms of \\(\\pi\\)?", answer: "\\(\\frac{\\pi}{6}\\)" },
        {
          prompt: "A ball just fits inside a cube of volume \\(216\\ \\text{cm}^3\\). What is the ball's radius?",
          answer: "3 cm",
          method: "The cube's edge is 6 cm.",
        },
      ],
      pyqExampleId: "09b4ef11-1883-4748-a0c2-5293811ac040",
      traps: [
        {
          title: "The longest edge limits the ball",
          body:
            "A ball is stopped by the smallest edge of the box. In a box 9 cm by 8 cm by 4 cm the largest ball has diameter 4 cm, not 9 cm.",
        },
        {
          title: "Edge of the cube used as the radius",
          body:
            "A ball that just fits a cube of edge 14 cm has radius 7 cm. Using 14 as the radius gives eight times the true volume.",
        },
      ],
    },
  ],
};
