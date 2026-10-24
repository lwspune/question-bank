import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SV_CONE_NOTE: SubtopicNote = {
  subtopicName: "Cone and Frustum",
  title: "Cone and Frustum",
  oneLineDefinition:
    "Slant height, curved and total surface and volume of a cone, a cone cut parallel to its base, and the frustum that is left.",
  whyItMatters:
    "Nearly every cone question needs the slant height first, from l² = r² + h², and the common slip is using the height where the slant belongs. The cut-cone and frustum questions look heavy but rest on one fact: the small cone on top is a scaled copy of the whole, so its lengths, areas and volumes follow k, k² and k³.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsv-cone-slant",
      name: "Slant height and the surface of a cone",
      intuition:
        "Cut a cone straight down through its tip and you see a triangle. Half of it is a right triangle with the radius and the height as its legs and the slant height as its long side. The curved surface is the slant height times half the base's circumference.",
      definition:
        "- **Slant height** \\(l = \\sqrt{r^2 + h^2}\\). Useful triples: 3, 4, 5; 5, 12, 13; 8, 15, 17; 9, 40, 41.\n" +
        "- **Curved surface** \\(\\pi rl\\); **total surface** \\(\\pi r(l + r)\\), which adds the base circle.\n" +
        "- A conical tent or a funnel is the curved surface only. Cloth of a given width: length = area ÷ width.",
      formula: {
        label: "Cone of radius r, height h, slant l",
        latex: "l = \\sqrt{r^2 + h^2},\\quad \\text{CSA} = \\pi r l,\\quad \\text{TSA} = \\pi r (l + r)",
      },
      authoredExample: {
        prompt: "A cone has radius 9 cm and height 12 cm. Find its slant height, curved surface and total surface, in terms of \\(\\pi\\).",
        steps: [
          "\\(l = \\sqrt{81 + 144} = 15\\) cm.",
          "Curved surface \\(\\pi \\times 9 \\times 15 = 135\\pi\\) cm².",
          "Total surface \\(135\\pi + 81\\pi = 216\\pi\\) cm².",
        ],
        answer: "15 cm, \\(135\\pi\\) cm², \\(216\\pi\\) cm².",
      },
      selfCheckExample: {
        prompt: "A cone has curved surface 4,070 cm² and slant height 37 cm. Find its radius and height. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(\\tfrac{22}{7} \\times r \\times 37 = 4070\\), so \\(r = \\dfrac{4070 \\times 7}{814} = 35\\).",
          "\\(h = \\sqrt{37^2 - 35^2} = \\sqrt{144} = 12\\).",
        ],
        answer: "Radius 35 cm, height 12 cm.",
      },
      practiceSet: [
        { prompt: "Find the slant height of a cone of radius 8 cm and height 15 cm.", answer: "17 cm" },
        { prompt: "A cone 40 cm tall has slant height 41 cm. Find its radius.", answer: "9 cm" },
        {
          prompt: "How much canvas makes a conical tent of base radius 3.5 m and slant height 12 m? (Use \\(\\pi = \\tfrac{22}{7}\\).)",
          answer: "132 m²",
        },
        { prompt: "A cone's slant height equals its diameter. Find the ratio of its curved surface to its base area.", answer: "\\(2 : 1\\)" },
      ],
      pyqExampleId: "596d36d8-52b4-4926-8838-f429b508c1e6",
      traps: [
        {
          title: "Curved surface uses the slant height",
          body: "For radius 9 and height 12, \\(\\pi rh = 108\\pi\\) is not a surface of anything. The curved surface is \\(\\pi rl = 135\\pi\\).",
        },
        {
          title: "Cloth length is area divided by width",
          body: "600 m² of canvas from cloth 3 m wide needs 200 m of cloth. Stopping at the area answers a different question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cone-volume",
      name: "Volume of a cone",
      intuition:
        "A cone holds a third of the cylinder on the same base and height, just as a pyramid holds a third of its prism. When radius and height come as a ratio, write them as multiples of one number k.",
      definition:
        "- **Volume** \\(\\tfrac 13 \\pi r^2 h\\).\n" +
        "- Radius and height in the ratio \\(p : q\\): take \\(r = pk\\), \\(h = qk\\). The volume gives \\(k^3\\); the slant height is then \\(k\\sqrt{p^2 + q^2}\\).\n" +
        "- Volume goes as \\(r^2 h\\): height doubled doubles it, radius doubled makes it 4 times, both doubled 8 times.",
      formula: {
        label: "Cone",
        latex: "V = \\tfrac13 \\pi r^2 h",
      },
      authoredExample: {
        prompt: "Find the volume of a cone of radius 21 cm and height 10 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)",
        steps: [
          "\\(\\tfrac{22}{7} \\times 441 = 1386\\).",
          "\\(\\tfrac 13 \\times 1386 \\times 10 = 4620\\).",
        ],
        answer: "4,620 cm³.",
      },
      selfCheckExample: {
        prompt: "The radius and height of a cone are in the ratio \\(7 : 24\\) and its volume is \\(10584\\pi\\) cm³. Find its slant height.",
        steps: [
          "\\(r = 7k\\), \\(h = 24k\\): \\(\\tfrac 13 \\pi \\times 49k^2 \\times 24k = 392\\pi k^3\\).",
          "\\(392k^3 = 10584\\), so \\(k^3 = 27\\) and \\(k = 3\\).",
          "The slant is \\(25k\\).",
        ],
        answer: "75 cm.",
      },
      practiceSet: [
        { prompt: "Find the volume of a cone of radius 3 cm and height 7 cm. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "66 cm³" },
        { prompt: "A cone of radius 14 cm holds 1,232 cm³. Find its height. (Use \\(\\pi = \\tfrac{22}{7}\\).)", answer: "6 cm" },
        { prompt: "The radius of a cone is tripled and its height kept. How many times as much does it hold?", answer: "9 times" },
        { prompt: "A cone's radius is doubled and its height halved. What happens to its volume?", answer: "It doubles." },
      ],
      pyqExampleId: "a511fa1c-b824-489f-bcac-f9905ab4588c",
      traps: [
        {
          title: "Doubling the height is a 100% rise",
          body: "Volume is proportional to height, so twice the height is twice the volume: an increase of 100%, not 200%.",
        },
        {
          title: "The radius counts squared",
          body: "Doubling only the radius makes the cone hold 4 times as much. Treating the radius like the height gives 2 times.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-cone-cut",
      visualizationSlug: "af-cone-cut",
      name: "A cone cut parallel to its base",
      intuition:
        "A cut parallel to the base takes a small cone off the top, and that small cone is the same shape as the whole. If its height is a fraction k of the full height, so are its radius and slant height; its surface is k² of the whole and its volume k³.",
      definition:
        "- Scale \\(k = \\dfrac{\\text{small cone's height}}{\\text{whole height}}\\), the same for radius and slant height.\n" +
        "- Small cone: curved surface \\(k^2\\) and volume \\(k^3\\) of the whole cone.\n" +
        "- The piece left below (the **frustum**) has volume \\(1 - k^3\\) and curved surface \\(1 - k^2\\) of the whole.\n" +
        "- Heights 'above the base' are measured from the base; the small cone's height is measured down from the tip.",
      formula: {
        label: "Small cone cut off the top",
        latex: "\\dfrac{V_{\\text{top}}}{V} = k^3,\\quad \\dfrac{\\text{CSA}_{\\text{top}}}{\\text{CSA}} = k^2",
      },
      authoredExample: {
        prompt:
          "A cone 16 cm tall with base radius 8 cm is cut parallel to its base 4 cm below the tip. Find the radius of the cut, and what fraction of the volume and of the curved surface the frustum keeps.",
        steps: [
          "\\(k = \\tfrac{4}{16} = \\tfrac 14\\), so the cut circle has radius \\(\\tfrac 14 \\times 8 = 2\\) cm.",
          "The small cone has \\(\\left(\\tfrac 14\\right)^3 = \\tfrac{1}{64}\\) of the volume, so the frustum keeps \\(\\tfrac{63}{64}\\).",
          "The small cone has \\(\\tfrac{1}{16}\\) of the curved surface, so the frustum keeps \\(\\tfrac{15}{16}\\).",
        ],
        answer: "2 cm; \\(\\tfrac{63}{64}\\) of the volume; \\(\\tfrac{15}{16}\\) of the curved surface.",
      },
      selfCheckExample: {
        prompt: "A cone 45 cm tall is cut parallel to its base so that the small cone on top has \\(\\tfrac{1}{125}\\) of the volume. How high above the base is the cut?",
        steps: [
          "\\(k^3 = \\tfrac{1}{125}\\), so \\(k = \\tfrac 15\\) and the small cone is 9 cm tall.",
          "The cut is \\(45 - 9 = 36\\) cm above the base.",
        ],
        answer: "36 cm.",
      },
      practiceSet: [
        { prompt: "A cone is cut parallel to its base through the mid-point of its height. What fraction of the volume is in the top cone?", answer: "\\(\\tfrac 18\\)" },
        { prompt: "For the same cut through the mid-point, what fraction of the curved surface is on the top cone?", answer: "\\(\\tfrac 14\\)" },
        {
          prompt: "A cone of base radius 12 cm is cut parallel to its base a quarter of the way down from the tip. Find the radius of the cut circle.",
          answer: "3 cm",
        },
      ],
      pyqExampleId: "57f7dfc3-7744-4516-990a-182d668fba4a",
      traps: [
        {
          title: "Measure from the right end",
          body: "If the small cone is 9 cm of a 45 cm cone, the cut is 36 cm above the base. The question may ask for either number.",
        },
        {
          title: "Halving the height does not halve the volume",
          body: "A cut through the mid-point leaves a top cone with \\(\\tfrac 18\\) of the volume and a frustum with \\(\\tfrac 78\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsv-frustum",
      name: "The frustum: a bucket shape",
      intuition:
        "A frustum is what is left of a cone when the top is cut off: two circles of radii R and r, a height h between them. A bucket is one. Its slant height comes from a right triangle whose legs are the height and the difference of the radii.",
      definition:
        "- **Slant height** \\(l = \\sqrt{h^2 + (R - r)^2}\\).\n" +
        "- **Curved surface** \\(\\pi(R + r)l\\); **total surface** adds both circles, \\(\\pi R^2 + \\pi r^2\\). An open bucket adds only its bottom.\n" +
        "- **Volume** \\(\\dfrac{\\pi h}{3}(R^2 + r^2 + Rr)\\).\n" +
        "- The cone it came from: the cut-off cone of height \\(t\\) satisfies \\(\\dfrac{t + h}{t} = \\dfrac{R}{r}\\).",
      formula: {
        label: "Frustum of radii R and r, height h",
        latex: "V = \\dfrac{\\pi h}{3}(R^2 + r^2 + Rr),\\quad l = \\sqrt{h^2 + (R - r)^2},\\quad \\text{CSA} = \\pi (R + r) l",
      },
      authoredExample: {
        prompt: "A frustum has end radii 11 cm and 5 cm and height 8 cm. Find its slant height, total surface and volume, in terms of \\(\\pi\\).",
        steps: [
          "\\(l = \\sqrt{64 + 6^2} = 10\\) cm.",
          "Curved surface \\(\\pi \\times 16 \\times 10 = 160\\pi\\); add \\(121\\pi + 25\\pi\\): total \\(306\\pi\\) cm².",
          "Volume \\(\\dfrac{8\\pi}{3}(121 + 25 + 55) = \\dfrac{8\\pi \\times 201}{3} = 536\\pi\\) cm³.",
        ],
        answer: "10 cm, \\(306\\pi\\) cm², \\(536\\pi\\) cm³.",
      },
      selfCheckExample: {
        prompt: "A frustum has end radii 9 cm and 6 cm and height 5 cm. Find the height of the cone it was cut from.",
        steps: [
          "\\(\\dfrac{t + 5}{t} = \\dfrac 96\\), so \\(6t + 30 = 9t\\) and \\(t = 10\\).",
          "The whole cone is \\(10 + 5\\) cm tall.",
        ],
        answer: "15 cm.",
      },
      practiceSet: [
        { prompt: "Find the slant height of a frustum with end radii 8 cm and 2 cm and height 8 cm.", answer: "10 cm" },
        { prompt: "Find the volume of a frustum with end radii 2 cm and 1 cm and height 3 cm, in terms of \\(\\pi\\).", answer: "\\(7\\pi\\) cm³" },
        { prompt: "A frustum has end radii 5 cm and 2 cm and slant height 5 cm. Find its curved surface in terms of \\(\\pi\\).", answer: "\\(35\\pi\\) cm²" },
      ],
      pyqExampleId: "86629ba1-3505-43d1-b494-7cc2a64db8b0",
      traps: [
        {
          title: "The slant uses R − r, not R + r",
          body: "Radii 11 and 5 with height 8 give slant \\(\\sqrt{64 + 36} = 10\\). Using \\(R + r = 16\\) gives \\(\\sqrt{320}\\), which is wrong.",
        },
        {
          title: "An open bucket has one circle",
          body: "The metal in a bucket with no lid is its curved surface plus the small bottom circle only.",
        },
      ],
    },
  ],
};
