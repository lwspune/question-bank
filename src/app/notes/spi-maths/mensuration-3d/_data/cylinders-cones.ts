import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M3_CYLINDERS_CONES_NOTE: SubtopicNote = {
  subtopicName: "Cylinders and Cones",
  title: "Cylinders and Cones",
  oneLineDefinition:
    "A cylinder is a circle carried straight up through a height; a cone on the same base and height holds exactly one third of it.",
  whyItMatters:
    "Fifteen questions in the bank, the largest page of the chapter: ten EASY, four MODERATE and one HARD (the canvas for a conical tent). Most are one formula with π as 22/7, or the one-third link between a cone and a cylinder written as a ratio.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim3cy-cylinder",
      name: "Volume and surface of a cylinder",
      intuition:
        "A cylinder is a stack of equal circles. Its volume is one circle's area times the height. Unroll the side and it is a rectangle, the circumference wide and the height tall.",
      definition:
        "- **Volume** \\(= \\pi r^2 h\\). A stack of coins or plates is a cylinder whose height is the thicknesses added up.\n" +
        "- **Curved surface** \\(= 2\\pi rh\\); **total surface** of a closed cylinder adds two circles: \\(2\\pi r(r + h)\\).\n" +
        "- Take \\(\\pi = \\frac{22}{7}\\) when the radius is a multiple of 7, unless the question gives 3.14.\n" +
        "- If \\(r + h\\) is given with the total surface, put it straight into \\(2\\pi r(r + h)\\) and solve for \\(r\\).\n" +
        "- With the height fixed, volume goes as \\(r^2\\): halve the radius and the volume becomes one quarter.",
      formula: {
        label: "Cylinder",
        latex: "V = \\pi r^2 h, \\quad \\text{CSA} = 2\\pi rh, \\quad \\text{TSA} = 2\\pi r(r + h)",
        symbols: [
          { symbol: "r", meaning: "radius of the base" },
          { symbol: "h", meaning: "height" },
        ],
      },
      authoredExample: {
        prompt: "A closed cylinder has radius 7 cm and height 10 cm. Find its volume and its total surface area.",
        steps: [
          "\\(V = \\frac{22}{7} \\times 49 \\times 10 = 154 \\times 10 = 1540\\) cubic cm.",
          "\\(\\text{TSA} = 2 \\times \\frac{22}{7} \\times 7 \\times (7 + 10) = 44 \\times 17 = 748\\) square cm.",
        ],
        answer: "1540 cubic cm and 748 square cm",
      },
      selfCheckExample: {
        prompt: "The total surface area of a closed cylinder is 880 square cm and the sum of its radius and height is 20 cm. Find its radius and its volume.",
        steps: [
          "\\(2 \\times \\frac{22}{7} \\times r \\times 20 = 880\\), so \\(r = \\frac{880 \\times 7}{880} = 7\\) cm.",
          "Height \\(= 20 - 7 = 13\\) cm.",
          "\\(V = \\frac{22}{7} \\times 49 \\times 13 = 154 \\times 13 = 2002\\) cubic cm.",
        ],
        answer: "Radius 7 cm, volume 2002 cubic cm",
      },
      practiceSet: [
        { prompt: "A cylinder has volume 616 cubic cm and radius 7 cm. What is its height?", answer: "\\(616 \\div 154 = 4\\) cm" },
        { prompt: "What is the curved surface area of a cylinder of radius 3.5 cm and height 10 cm?", answer: "\\(2 \\times \\frac{22}{7} \\times 3.5 \\times 10 = 220\\) square cm" },
        { prompt: "The radius of a cylinder is doubled and its height kept the same. How many times does its volume become?", answer: "4 times" },
        { prompt: "Twenty coins, each 0.25 cm thick, are stacked into a cylinder. How tall is it?", answer: "5 cm" },
      ],
      pyqExampleId: "fe33fc08-235a-45b5-9248-009239f7cb65",
      traps: [
        {
          title: "Curved or total surface",
          body:
            "An open pipe or the label on a tin is the curved surface \\(2\\pi rh\\) alone. A closed solid cylinder adds its two circles: \\(2\\pi r(r + h)\\).",
        },
        {
          title: "Halving the radius does not halve the volume",
          body:
            "The radius is squared in \\(\\pi r^2 h\\). Cutting the radius by 50% leaves \\(\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}\\) of the volume, so the ratio is 1 : 4, not 1 : 2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3cy-cone",
      name: "Volume and surface of a cone",
      intuition:
        "Cut a cone straight down its middle and you see a right triangle: the radius along the bottom, the height up the middle, and the slant height as the sloping side. Every cone question uses that triangle.",
      definition:
        "- **Slant height**: \\(l^2 = r^2 + h^2\\). The slant height \\(l\\) is always the longest of the three.\n" +
        "- **Volume** \\(= \\frac{1}{3}\\pi r^2 h\\) uses the vertical height \\(h\\).\n" +
        "- **Curved surface** \\(= \\pi rl\\) uses the slant height; **total surface** adds the base: \\(\\pi r(l + r)\\).\n" +
        "- **A conical tent** needs canvas for the curved surface only. Its floor is the circle \\(\\pi r^2\\), so a given floor area gives \\(r\\). Length of canvas \\(=\\) area \\(\\div\\) width of the canvas.",
      formula: {
        label: "Cone",
        latex: "l^2 = r^2 + h^2, \\quad V = \\frac{1}{3}\\pi r^2 h, \\quad \\text{CSA} = \\pi rl, \\quad \\text{TSA} = \\pi r(l + r)",
        symbols: [
          { symbol: "r", meaning: "radius of the base" },
          { symbol: "h", meaning: "vertical height" },
          { symbol: "l", meaning: "slant height" },
        ],
      },
      authoredExample: {
        prompt: "A cone has radius 6 cm and height 8 cm. Find its slant height, curved surface area and volume. (Use π = 3.14.)",
        steps: [
          "\\(l = \\sqrt{36 + 64} = \\sqrt{100} = 10\\) cm.",
          "\\(\\text{CSA} = 3.14 \\times 6 \\times 10 = 188.4\\) square cm.",
          "\\(V = \\frac{1}{3} \\times 3.14 \\times 36 \\times 8 = 3.14 \\times 96 = 301.44\\) cubic cm.",
        ],
        answer: "10 cm, 188.4 square cm, 301.44 cubic cm",
      },
      selfCheckExample: {
        prompt: "A cone has slant height 25 cm and height 24 cm. Find its curved surface area.",
        steps: [
          "\\(r = \\sqrt{625 - 576} = \\sqrt{49} = 7\\) cm.",
          "\\(\\text{CSA} = \\frac{22}{7} \\times 7 \\times 25 = 550\\) square cm.",
        ],
        answer: "550 square cm",
      },
      practiceSet: [
        { prompt: "A cone has radius 3 cm and slant height 5 cm. What is its height?", answer: "4 cm" },
        { prompt: "A cone has radius 7 cm and height 24 cm. What is its total surface area?", answer: "\\(l = 25\\), \\(\\frac{22}{7} \\times 7 \\times 32 = 704\\) square cm" },
        { prompt: "A cone has radius 3 cm and height 7 cm. What is its volume?", answer: "\\(\\frac{1}{3} \\times \\frac{22}{7} \\times 9 \\times 7 = 66\\) cubic cm" },
        { prompt: "A conical tent needs 220 square m of canvas. The canvas is 2 m wide. What length of canvas is needed?", answer: "110 m" },
      ],
      pyqExampleId: "5948890a-a302-4ad7-8abe-649a63989942",
      traps: [
        {
          title: "Height where the slant height belongs",
          body:
            "Volume uses the vertical height \\(h\\); the curved surface \\(\\pi rl\\) uses the slant height \\(l\\). If only one is given, find the other from \\(l^2 = r^2 + h^2\\) first.",
        },
        {
          title: "Adding a floor to the tent",
          body: "A tent has no canvas floor. Its canvas is the curved surface \\(\\pi rl\\) only, not \\(\\pi r(l + r)\\).",
        },
        {
          title: "Keeping the negative root",
          body:
            "If the total surface gives \\(r^2 + 7r - 60 = 0\\), it factors as \\((r + 12)(r - 5) = 0\\). A radius cannot be negative, so \\(r = 5\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim3cy-ratio",
      name: "One third: comparing cones and cylinders",
      intuition:
        "Fill a cone with water and pour it into a cylinder with the same base and height: it takes three cones to fill it. Ratio questions are this fact, or the same formula written for two solids and divided.",
      definition:
        "- **Same base, same height**: cylinder \\(=\\) 3 cones. The largest cone cut from a cylinder leaves \\(\\frac{2}{3}\\) of the wood, so wood left : cone \\(= 2 : 1\\).\n" +
        "- **Same base, same volume**: the cone must be 3 times as tall as the cylinder.\n" +
        "- **Two cones (or two cylinders)**: \\(V \\propto r^2 h\\). Divide the two formulas and \\(\\pi\\) and \\(\\frac{1}{3}\\) cancel.\n" +
        "- Radii are in the same ratio as diameters.",
      formula: {
        label: "Cone against cylinder",
        latex: "V_{\\text{cone}} = \\frac{1}{3}V_{\\text{cylinder}} \\ (\\text{same } r, h), \\qquad \\frac{V_1}{V_2} = \\frac{r_1^2 h_1}{r_2^2 h_2}",
      },
      authoredExample: {
        prompt: "Two cones have radii in the ratio 3 : 2 and heights in the ratio 2 : 3. Find the ratio of their volumes.",
        steps: [
          "\\(\\frac{V_1}{V_2} = \\frac{r_1^2}{r_2^2} \\times \\frac{h_1}{h_2} = \\frac{9}{4} \\times \\frac{2}{3}\\).",
          "\\(= \\frac{18}{12} = \\frac{3}{2}\\).",
        ],
        answer: "3 : 2",
      },
      selfCheckExample: {
        prompt: "Two cylinders have volumes in the ratio 2 : 1 and radii in the ratio 1 : 2. Find the ratio of their heights.",
        steps: [
          "\\(2 = \\frac{1}{4} \\times \\frac{h_1}{h_2}\\).",
          "\\(\\frac{h_1}{h_2} = 8\\), so the heights are 8 : 1.",
        ],
        answer: "8 : 1",
      },
      practiceSet: [
        { prompt: "A cone and a cylinder have the same radius and height. The cylinder holds 90 cubic cm. How much does the cone hold?", answer: "30 cubic cm" },
        { prompt: "A cone and a cylinder have equal radii and equal volumes. The cylinder is 5 cm tall. How tall is the cone?", answer: "15 cm" },
        { prompt: "Two cones have equal heights and radii in the ratio 3 : 4. What is the ratio of their volumes?", answer: "9 : 16" },
        { prompt: "The largest possible cone is carved from a wooden cylinder of volume 600 cubic cm. How much wood is left?", answer: "400 cubic cm" },
      ],
      pyqExampleId: "cffb14be-6a59-4390-be3c-cfc972cdf46c",
      traps: [
        {
          title: "Ratio of radii is not ratio of volumes",
          body: "With equal heights, radii 2 : 5 give volumes \\(4 : 25\\), because the radius is squared. 2 : 5 is printed as a wrong option.",
        },
        {
          title: "Turning the ratio the wrong way",
          body:
            "Cylinder to cone with the same base and height is 3 : 1. With the same base and the same volume, cone height to cylinder height is also 3 : 1. Write which solid comes first before you answer.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spim3cy-solids",
      name: "Solids made by turning or cutting a shape",
      intuition:
        "Spin a flat shape about a line and it sweeps out a solid. Slice a solid with a flat plane and the cut face is a flat shape. A few of these come up as one-mark questions.",
      definition:
        "- Turning a shape about a line gives a **solid of revolution**.\n" +
        "- A **cross-section** is the flat face where a plane cuts a solid. It is never a solid itself.",
      table: {
        columns: ["Shape and what is done", "What you get"],
        rows: [
          { cells: ["Rectangle turned about one side", "Cylinder"] },
          { cells: ["Right triangle turned about a side that makes the right angle", "Right circular cone"] },
          { cells: ["Right triangle turned about its hypotenuse", "Two cones joined base to base"] },
          { cells: ["Semicircle turned about its diameter", "Sphere"] },
          {
            cells: ["Cone cut by a plane parallel to its base", "A circle"],
            noteAmber: "The solid piece left below the cut is a frustum; the cut face itself is a circle.",
          },
          { cells: ["Cone cut through its vertex, at right angles to the base", "An isosceles triangle"] },
          { cells: ["Cylinder cut parallel to its base", "A circle"] },
          { cells: ["Sphere cut by any plane", "A circle"] },
        ],
        caption: "The side you turn about becomes the height; the other side becomes the radius.",
      },
      selfCheckExample: {
        prompt: "A rectangle 3 cm by 5 cm is turned about its 5 cm side. Name the solid and give its radius and height.",
        steps: ["Turning a rectangle about a side gives a cylinder.", "The side turned about is the height (5 cm); the other side is the radius (3 cm)."],
        answer: "A cylinder of radius 3 cm and height 5 cm",
      },
      practiceSet: [
        { prompt: "What solid is formed when a semicircle is turned about its diameter?", answer: "A sphere" },
        {
          prompt: "A right triangle with legs 3 cm and 4 cm is turned about the 4 cm leg. What is the slant height of the cone formed?",
          answer: "5 cm (radius 3 cm, height 4 cm)",
        },
        { prompt: "What is the shape of the cross-section of a cylinder cut parallel to its base?", answer: "A circle" },
      ],
      pyqExampleId: "7d5bd20e-b976-4288-aea0-1095b4273dad",
      traps: [
        {
          title: "Naming the piece instead of the section",
          body:
            "A cone cut parallel to its base has a circular cross-section. A frustum is the solid piece below the cut, and a cross-section is never a solid.",
        },
        {
          title: "Turning about the hypotenuse",
          body: "A right triangle turned about its hypotenuse gives two cones joined at their bases, not one cone.",
        },
      ],
    },
  ],
};
