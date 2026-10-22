import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SV_CYLINDER_NOTE: SubtopicNote = {
  subtopicName: "Cylinder",
  title: "Cylinder",
  oneLineDefinition:
    "Volume and curved and total surface of a cylinder, a sheet rolled or a rectangle turned into one, hollow pipes, and how two cylinders compare.",
  whyItMatters:
    "Nearly every question is πr²h or 2πrh with π as 22/7, and the arithmetic is kind when the radius is a multiple of 7 or 3.5. The marks go on a diameter read as a radius, and on which surfaces the story counts: a painted pillar is the curved surface only, a tank's wetted surface adds the floor, a closed drum has both ends.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsv-cyl-volume",
      name: "Volume of a cylinder",
      intuition:
        "A cylinder is a prism on a circle: base area \\(\\pi r^2\\) times height. With \\(\\pi = \\tfrac{22}{7}\\), a radius that is a multiple of 7 (or 3.5) cancels the 7 and leaves whole numbers.",
      definition:
        "- **Volume** \\(\\pi r^2 h\\). Halve a given diameter first.\n" +
        "- Working back: \\(h = \\dfrac{V}{\\pi r^2}\\) and \\(r^2 = \\dfrac{V}{\\pi h}\\).\n" +
        "- Water: 1 cm³ holds 1 g (1 mL), and 1 m³ is 1,000 litres.\n" +
        "- A rectangle turned about one of its sides makes a cylinder: that side is the height, the other side is the radius.",
      formula: {
        label: "Cylinder of radius r and height h",
        latex: "V = \\pi r^2 h",
      },
      authoredExample: {
        prompt: "A drum has diameter 42 cm and height 50 cm. How many litres does it hold? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "Radius 21 cm, so the base is \\(\\tfrac{22}{7} \\times 441 = 1386\\) cm².",
          "Volume \\(1386 \\times 50 = 69{,}300\\) cm³.",
          "1,000 cm³ is a litre.",
        ],
        answer: "69.3 litres.",
      },
      selfCheckExample: {
        prompt: "A cylinder of radius 5 cm holds 2,200 cm³. Find its height. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(\\tfrac{22}{7} \\times 25 \\times h = 2200\\).",
          "\\(h = \\dfrac{2200 \\times 7}{550} = 28\\).",
        ],
        answer: "28 cm.",
      },
      practiceSet: [
        {
          prompt: "A rectangle 14 cm × 5 cm is turned about its 14 cm side. Find the volume of the solid formed. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "1,100 cm³",
          method: "Radius 5, height 14.",
        },
        { prompt: "How many litres does a tank of radius 1.4 m and height 5 m hold? (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "30,800 litres" },
        { prompt: "A cylinder 14 cm tall holds 396 cm³. Find its radius. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "3 cm", method: "\\(44r^2 = 396\\)." },
      ],
      pyqExampleId: "d00b43e7-23ea-4086-b381-8bbdfd2c7a90",
      traps: [
        {
          title: "Which side it turns about",
          body: "A rectangle 10 cm × 3 cm turned about the 10 cm side gives radius 3 and height 10, volume \\(90\\pi\\). Turned about the 3 cm side it gives \\(300\\pi\\). The side it turns on is the height.",
        },
        {
          title: "Halve the diameter",
          body: "A cylinder 10 cm across and 6 cm tall holds \\(150\\pi\\) cm³. Using 10 as the radius gives \\(600\\pi\\), four times too much.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cyl-surface",
      name: "Curved and total surface, and the stories that use them",
      intuition:
        "Unroll the curved surface of a cylinder and it is a rectangle: one side is the circumference \\(2\\pi r\\), the other is the height. So the curved surface is \\(2\\pi rh\\), and the two circular ends add \\(2\\pi r^2\\).",
      definition:
        "- **Curved surface** \\(2\\pi rh\\); **total surface** \\(2\\pi r(r + h)\\).\n" +
        "- A sheet rolled into a cylinder: the side it is rolled along becomes the circumference \\(2\\pi r\\), the other side the height.\n" +
        "- Which surface: a painted pillar or a label is curved only; an open tank or a wetted surface is curved (up to the water) plus one base; a closed drum is total.\n" +
        "- Rolling: one turn moves the cylinder one circumference along the ground and presses one curved surface of area.\n" +
        "- A wire wound side by side to cover the curved surface: wire length × wire thickness = curved surface.\n" +
        "- A flat cut tilted at angle \\(\\theta\\) to the circular cross-section is an ellipse of area \\(\\dfrac{\\pi r^2}{\\cos\\theta}\\).",
      formula: {
        label: "Cylinder surfaces",
        latex: "\\text{CSA} = 2\\pi rh,\\quad \\text{TSA} = 2\\pi r(r + h)",
      },
      authoredExample: {
        prompt: "A closed cylinder has radius 14 cm and height 6 cm. Find its curved and total surface. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "Curved: \\(2 \\times \\tfrac{22}{7} \\times 14 \\times 6 = 528\\) cm².",
          "Total: \\(2 \\times \\tfrac{22}{7} \\times 14 \\times (14 + 6) = 88 \\times 20 = 1760\\) cm².",
        ],
        answer: "528 cm² and 1,760 cm².",
      },
      selfCheckExample: {
        prompt: "A garden roller is 2.8 m across and 3 m long. What area does it level in 25 turns? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "One turn presses the curved surface: \\(2 \\times \\tfrac{22}{7} \\times 1.4 \\times 3 = 26.4\\) m².",
          "25 turns: \\(26.4 \\times 25 = 660\\) m².",
        ],
        answer: "660 m².",
      },
      practiceSet: [
        {
          prompt: "A sheet 66 cm × 20 cm is rolled along its 66 cm side into a cylinder 20 cm tall. Find its radius. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "10.5 cm",
        },
        { prompt: "A cylinder of radius 10 cm has curved surface 880 cm². Find its height. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "14 cm" },
        { prompt: "Find the total surface of a cylinder of radius 7 cm and height 8 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "660 cm²" },
        {
          prompt: "A cylinder of radius 6 cm has its curved surface equal to half its total surface. Find its height.",
          answer: "6 cm",
          method: "\\(2\\pi rh = 2\\pi r^2\\), so \\(h = r\\).",
        },
      ],
      pyqExampleId: "bd3f15a6-479f-4fc5-ab74-f22702113433",
      traps: [
        {
          title: "A wetted surface has one base, not two",
          body: "A tank of radius 7 m with water 5 m deep wets \\(220 + 154 = 374\\) m²: the wall up to the water and the floor. The lid and the dry wall are not wet.",
        },
        {
          title: "Turn centimetres into metres before a rate per m²",
          body: "A pillar 56 cm across has radius 0.28 m. Multiplying 28 by a height in metres gives an area a hundred times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cyl-hollow",
      name: "Hollow cylinders and pipes",
      intuition:
        "A pipe is a big cylinder with a smaller one taken out. Its material is the difference of the two volumes, and its surface has four parts: outside, inside and two rings at the ends.",
      definition:
        "- **Material** \\(\\pi h(R^2 - r^2)\\) for outer radius \\(R\\) and inner radius \\(r\\). The thickness is \\(R - r\\).\n" +
        "- **Total surface** = outer \\(2\\pi Rh\\) + inner \\(2\\pi rh\\) + two end rings \\(2\\pi(R^2 - r^2)\\).\n" +
        "- Diameters given: halve both before squaring.",
      formula: {
        label: "Hollow cylinder",
        latex: "V = \\pi h (R^2 - r^2)",
      },
      authoredExample: {
        prompt: "A pipe 14 cm long has outer radius 9 cm and inner radius 7 cm. Find the volume of material and the total surface, in terms of \\(\\pi\\).",
        steps: [
          "Material: \\(\\pi \\times 14 \\times (81 - 49) = 448\\pi\\) cm³.",
          "Outside \\(2\\pi \\times 9 \\times 14 = 252\\pi\\); inside \\(2\\pi \\times 7 \\times 14 = 196\\pi\\).",
          "Two end rings: \\(2\\pi(81 - 49) = 64\\pi\\). Total \\(512\\pi\\) cm².",
        ],
        answer: "\\(448\\pi\\) cm³ and \\(512\\pi\\) cm².",
      },
      selfCheckExample: {
        prompt: "A hollow cylinder 21 cm tall has outer radius 13 cm and inner radius 12 cm. Find the volume of material. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(169 - 144 = 25\\).",
          "\\(\\tfrac{22}{7} \\times 21 \\times 25 = 1650\\).",
        ],
        answer: "1,650 cm³.",
      },
      practiceSet: [
        {
          prompt: "A thick ring is 5 cm tall with outer radius 9.5 cm and inner radius 2.5 cm. Find its volume. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "1,320 cm³",
          method: "\\(90.25 - 6.25 = 84\\).",
        },
        { prompt: "A hollow cylinder 9 cm tall has outer radius 5 cm and inner radius 2 cm. Find its total surface in terms of \\(\\pi\\).", answer: "\\(168\\pi\\) cm²" },
        { prompt: "A pipe has outer radius 8 cm and inner radius 3 cm. Find the area of one end ring in terms of \\(\\pi\\).", answer: "\\(55\\pi\\) cm²" },
      ],
      pyqExampleId: "ccc3501b-7247-4ad0-b017-de8c960e4177",
      traps: [
        {
          title: "R² − r² is not (R − r)²",
          body: "With radii 9 and 7, \\(81 - 49 = 32\\), but \\((9 - 7)^2 = 4\\). Square each radius first, then subtract.",
        },
        {
          title: "A pipe's total surface has four parts",
          body: "Outside, inside and the two end rings. Leaving out the inner wall or the rings is the usual way to land on a wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cyl-compare",
      name: "Comparing two cylinders, and changing their size",
      intuition:
        "Volume goes as \\(r^2 h\\) and curved surface as \\(rh\\), so a ratio question never needs \\(\\pi\\). Write both ratios, cancel, and the radius counts twice in volume but once in surface.",
      definition:
        "- \\(\\dfrac{V_1}{V_2} = \\dfrac{r_1^2 h_1}{r_2^2 h_2}\\) and \\(\\dfrac{\\text{CSA}_1}{\\text{CSA}_2} = \\dfrac{r_1 h_1}{r_2 h_2}\\).\n" +
        "- Given the radius ratio and the surface ratio: find the height ratio from the surfaces first, then the volumes.\n" +
        "- Equal volumes: \\(r_1^2 h_1 = r_2^2 h_2\\).\n" +
        "- Volume divided by curved surface is \\(\\dfrac{r}{2}\\), a quick way to the radius when both are given.\n" +
        "- A wire (a long thin cylinder) of fixed volume: its length goes as \\(\\dfrac{1}{r^2}\\).",
      formula: {
        label: "Two cylinders",
        latex: "\\dfrac{V_1}{V_2} = \\dfrac{r_1^2 h_1}{r_2^2 h_2},\\quad \\dfrac{V}{\\text{CSA}} = \\dfrac{r}{2}",
      },
      authoredExample: {
        prompt: "Two cylinders have radii in the ratio \\(4 : 7\\) and heights in the ratio \\(7 : 4\\). Compare their volumes and their curved surfaces.",
        steps: [
          "Volumes: \\(4^2 \\times 7 : 7^2 \\times 4 = 112 : 196 = 4 : 7\\).",
          "Curved surfaces: \\(4 \\times 7 : 7 \\times 4 = 1 : 1\\).",
        ],
        answer: "Volumes \\(4 : 7\\); curved surfaces equal.",
      },
      selfCheckExample: {
        prompt: "A cylinder holds 1,540 cm³ and has curved surface 440 cm². Find its radius and height. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(\\dfrac{r}{2} = \\dfrac{1540}{440} = 3.5\\), so \\(r = 7\\).",
          "\\(2 \\times \\tfrac{22}{7} \\times 7 \\times h = 44h = 440\\), so \\(h = 10\\).",
        ],
        answer: "Radius 7 cm, height 10 cm.",
      },
      practiceSet: [
        {
          prompt: "Two cylinders hold the same volume. One has radius 6 cm and height 8 cm; the other has radius 4 cm. Find its height.",
          answer: "18 cm",
        },
        { prompt: "The diameter of a wire is halved and its volume kept. How many times as long does it become?", answer: "4 times" },
        { prompt: "A cylinder's radius is doubled and its height halved. What happens to its volume?", answer: "It doubles." },
        { prompt: "A cylinder's radius grows by 20% and its height falls by 20%. By what percent does its volume change?", answer: "Up 15.2%", method: "\\(1.44 \\times 0.8 = 1.152\\)." },
      ],
      pyqExampleId: "11228810-0291-4a15-bbf6-a4d734f18b9a",
      traps: [
        {
          title: "The radius counts twice in volume, once in surface",
          body: "Cylinders of equal height with radii \\(1 : 4\\) have curved surfaces \\(1 : 4\\) but volumes \\(1 : 16\\).",
        },
        {
          title: "A thinner wire grows by more than the cut",
          body: "Cut the diameter by 20% and the cross-section becomes 0.64 of itself, so the length must grow to \\(\\tfrac{1}{0.64} = 1.5625\\) times: up 56.25%, not 20%.",
        },
      ],
    },
  ],
};
