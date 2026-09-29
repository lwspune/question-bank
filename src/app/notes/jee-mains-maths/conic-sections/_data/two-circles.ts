import type { SubtopicNote } from "@/app/notes/_types";

export const TWO_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Two Circles and Families of Circles",
  title: "Two Circles and Families of Circles",
  oneLineDefinition:
    "How two circles sit relative to each other and how many common tangents they have, their common chord, the circles through the points where two curves meet, and the image of a circle in a line.",
  whyItMatters:
    "Twenty-six PYQs. More than half are one comparison: the distance between the centres against the sum and the difference of the radii. The rest subtract one equation from the other, or reflect a centre. Four ideas cover them.",
  concepts: [
    // C1 — relative position
    {
      kind: "formula" as const,
      slug: "jcon-two-circle-position",
      name: "Relative position and the number of common tangents",
      intuition:
        "Everything depends on \\(d\\), the distance between the centres, set against \\(r_1+r_2\\) and \\(|r_1-r_2|\\). Far apart, the circles have four common tangents. As they come closer, they touch from outside (three), cross (two), touch from inside (one), and finally one sits inside the other (none). When two circles touch, the point of contact lies on the line of centres and splits it in the ratio of the radii.",
      definition:
        "- \\(d>r_1+r_2\\): separate, \\(4\\) common tangents.\n" +
        "- \\(d=r_1+r_2\\): touch externally, \\(3\\).\n" +
        "- \\(|r_1-r_2|<d<r_1+r_2\\): meet at two points, \\(2\\).\n" +
        "- \\(d=|r_1-r_2|\\): touch internally, \\(1\\).\n" +
        "- \\(d<|r_1-r_2|\\): one inside the other, \\(0\\).\n" +
        "- **Point of contact:** divides \\(C_1C_2\\) as \\(r_1:r_2\\), internally for an outside touch, externally for an inside touch.\n" +
        "- **Least distance between separate circles:** \\(d-r_1-r_2\\).",
      formula: {
        label: "Two circles meet in two points when",
        latex: "|r_1-r_2|<C_1C_2<r_1+r_2",
      },
      authoredExample: {
        prompt: "How many common tangents do \\(x^2+y^2=4\\) and \\(x^2+y^2-6x-8y+16=0\\) have?",
        steps: [
          "First circle: centre \\((0,0)\\), \\(r_1=2\\). Second: centre \\((3,4)\\), \\(r_2=\\sqrt{9+16-16}=3\\).",
          "\\(d=5=r_1+r_2\\): they touch externally.",
        ],
        answer: "\\(3\\).",
      },
      selfCheckExample: {
        prompt: "For which \\(r\\) does \\((x-5)^2+y^2=r^2\\) meet \\(x^2+y^2=4\\) in two points?",
        steps: [
          "\\(d=5\\), \\(r_1=2\\).",
          "Need \\(|r-2|<5<r+2\\): \\(r>3\\) and \\(r<7\\).",
        ],
        answer: "\\(3<r<7\\).",
      },
      practiceSet: [
        { prompt: "Common tangents of \\(x^2+y^2=1\\) and \\(x^2+y^2=9\\)?", answer: "\\(0\\)", method: "Same centre, one inside" },
        { prompt: "Least distance between \\(x^2+y^2=1\\) and \\((x-5)^2+y^2=1\\)?", answer: "\\(3\\)" },
        { prompt: "Circles of radii \\(2\\) and \\(3\\) touch externally, centres \\((0,0)\\) and \\((5,0)\\). Point of contact?", answer: "\\((2,0)\\)" },
        { prompt: "\\(d=4\\), \\(r_1=5\\), \\(r_2=1\\): position?", answer: "Touch internally" },
      ],
      pyqExampleId: "3f4f7419-ae58-42d7-8dcb-515842bdb166", // 2023 — number of common tangents, touch externally
      traps: [
        {
          title: "Two points needs BOTH inequalities",
          body: "\\(d<r_1+r_2\\) alone allows one circle to sit inside the other. Two intersection points needs \\(|r_1-r_2|<d\\) as well.",
        },
      ],
    },

    // C2 — common chord
    {
      kind: "formula" as const,
      slug: "jcon-common-chord",
      name: "The common chord, and a diameter that is a chord of another circle",
      intuition:
        "Subtract the two circle equations (both with \\(x^2+y^2\\) coefficient \\(1\\)). The squared terms cancel and a line is left. Its points satisfy both equations, so it passes through both intersection points: it is the common chord. For its length, find its distance from either centre. A related picture: when a diameter of one circle is a chord of another, the first centre is the chord's midpoint, so a right triangle links the two radii and the distance between the centres.",
      definition:
        "- **Common chord:** \\(S_1-S_2=0\\).\n" +
        "- **Its length:** \\(2\\sqrt{r_1^2-p_1^2}\\), where \\(p_1\\) is its distance from \\(C_1\\).\n" +
        "- The common chord is perpendicular to the line of centres.\n" +
        "- **A diameter of circle 1 is a chord of circle 2:** \\(r_2^2=r_1^2+C_1C_2^2\\).",
      formula: {
        label: "Common chord",
        latex: "S_1-S_2=0",
      },
      authoredExample: {
        prompt: "Find the common chord of \\(x^2+y^2=25\\) and \\(x^2+y^2-8x+7=0\\), and its length.",
        steps: [
          "Subtract: \\(-25-(-8x+7)=0\\), so \\(8x=32\\), \\(x=4\\).",
          "Its distance from \\((0,0)\\) is \\(4\\): length \\(2\\sqrt{25-16}\\).",
        ],
        answer: "\\(x=4\\), length \\(6\\).",
      },
      selfCheckExample: {
        prompt: "A diameter of \\(x^2+y^2-2x-4y+1=0\\) is a chord of a circle centred at \\((4,6)\\). Find that circle's radius.",
        steps: [
          "First circle: centre \\((1,2)\\), \\(r_1^2=1+4-1=4\\).",
          "\\(C_1C_2^2=9+16=25\\).",
          "\\(r_2^2=4+25\\).",
        ],
        answer: "\\(\\sqrt{29}\\).",
      },
      practiceSet: [
        { prompt: "Common chord of \\(x^2+y^2=4\\) and \\(x^2+y^2-2x=0\\)?", answer: "\\(x=2\\)" },
        { prompt: "Common chord of \\(x^2+y^2-4x=0\\) and \\(x^2+y^2-4y=0\\)?", answer: "\\(y=x\\)" },
        { prompt: "Direction of the common chord relative to the line of centres?", answer: "Perpendicular" },
        { prompt: "Diameter of a radius-\\(3\\) circle is a chord of a circle whose centre is \\(4\\) away. Its radius?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "a2d9f335-d718-4392-a4f2-f468d4a6f33c", // 2024 — common chord meets the y-axis at P
      traps: [
        {
          title: "Make the \\(x^2\\) coefficients equal before subtracting",
          body: "\\(S_1-S_2\\) gives a line only when both equations have \\(x^2+y^2\\) with coefficient \\(1\\). Divide out first, or the squared terms survive.",
        },
      ],
    },

    // C3 — families
    {
      kind: "formula" as const,
      slug: "jcon-circle-family",
      name: "Circles through the meeting points of two curves",
      intuition:
        "If \\(S=0\\) and \\(L=0\\) both hold at a point, so does \\(S+\\lambda L=0\\) for every \\(\\lambda\\). So \\(S+\\lambda L=0\\) is a whole family of circles through the points where the circle and line meet. One more condition fixes \\(\\lambda\\). The same idea works for two circles, \\(S_1+\\lambda S_2=0\\), and for two conics: choose \\(\\lambda\\) so that the \\(x^2\\) and \\(y^2\\) coefficients match, and the combination is a circle through their four meeting points.",
      definition:
        "- **Circle and line:** \\(S+\\lambda L=0\\).\n" +
        "- **Two circles:** \\(S_1+\\lambda S_2=0\\), \\(\\lambda\\neq-1\\) (\\(\\lambda=-1\\) gives the common chord).\n" +
        "- **Two conics:** pick \\(\\lambda\\) so the combination has equal \\(x^2\\), \\(y^2\\) coefficients and no \\(xy\\) term; it is then a circle through all their common points.\n" +
        "- A circle touching \\(L\\) at \\(P\\): \\((x-x_1)^2+(y-y_1)^2+\\lambda L=0\\).",
      formula: {
        label: "Family through a circle and a line",
        latex: "S+\\lambda L=0",
      },
      authoredExample: {
        prompt: "Find the circle through the points where \\(x+y=1\\) meets \\(x^2+y^2=4\\) that also passes through \\((1,1)\\).",
        steps: [
          "Family: \\(x^2+y^2-4+\\lambda(x+y-1)=0\\).",
          "At \\((1,1)\\): \\(2-4+\\lambda=0\\), so \\(\\lambda=2\\).",
        ],
        answer: "\\(x^2+y^2+2x+2y-6=0\\).",
      },
      selfCheckExample: {
        prompt: "Find the circle through the meeting points of \\(x^2+y^2-4=0\\) and \\(x^2+y^2-2x-4y+4=0\\) that passes through the origin.",
        steps: [
          "Family: \\((x^2+y^2-4)+\\lambda(x^2+y^2-2x-4y+4)=0\\).",
          "At \\((0,0)\\): \\(-4+4\\lambda=0\\), \\(\\lambda=1\\).",
          "\\(2x^2+2y^2-2x-4y=0\\).",
        ],
        answer: "\\(x^2+y^2-x-2y=0\\).",
      },
      practiceSet: [
        { prompt: "\\(\\lambda\\) in \\(S_1+\\lambda S_2\\) that gives the common chord?", answer: "\\(-1\\)" },
        { prompt: "Circle touching \\(x=0\\) at the origin, family form?", answer: "\\(x^2+y^2+\\lambda x=0\\)" },
        { prompt: "Through the meeting points of \\(x^2+y^2=9\\) and \\(y=0\\), through \\((0,3)\\)?", answer: "\\(x^2+y^2=9\\) itself (\\(\\lambda=0\\))" },
        { prompt: "Circle through the meeting points of \\(x^2+2y^2=3\\) and \\(3x^2+2y^2=5\\)?", answer: "\\(x^2+y^2=2\\)", method: "\\(1+3\\lambda=2+2\\lambda\\) gives \\(\\lambda=1\\): \\(4x^2+4y^2=8\\)" },
      ],
      pyqExampleId: "b6ab8997-5f37-4622-888b-452b4c1edb52", // 2021 — circle touching x = 2y at (2,1), common chord a diameter of C1
      traps: [
        {
          title: "\\(\\lambda=-1\\) is not a circle",
          body: "In \\(S_1+\\lambda S_2=0\\) the \\(x^2+y^2\\) terms cancel at \\(\\lambda=-1\\), leaving the common chord. Exclude it when a circle is wanted.",
        },
      ],
    },

    // C4 — images
    {
      kind: "formula" as const,
      slug: "jcon-circle-image",
      name: "The image of a circle in a line",
      intuition:
        "A reflection moves every point but keeps distances. So the image of a circle is a circle with the same radius, centred at the image of the centre. Only one point, the centre, has to be reflected.",
      definition:
        "- Image radius = original radius.\n" +
        "- Image centre = reflection of the original centre.\n" +
        "- Reflection of \\((x_0,y_0)\\) in \\(ax+by+c=0\\): \\((x_0,y_0)-\\frac{2(ax_0+by_0+c)}{a^2+b^2}(a,b)\\).\n" +
        "- In \\(y=x\\): swap the coordinates.",
      formula: {
        label: "Reflection of a point in a line",
        latex: "(x',y')=(x_0,y_0)-\\frac{2(ax_0+by_0+c)}{a^2+b^2}\\,(a,b)",
      },
      authoredExample: {
        prompt: "Find the image of \\(x^2+y^2-2x=0\\) in \\(y=x\\).",
        steps: [
          "Centre \\((1,0)\\), radius \\(1\\).",
          "Reflect in \\(y=x\\): the centre goes to \\((0,1)\\).",
        ],
        answer: "\\(x^2+y^2-2y=0\\).",
      },
      selfCheckExample: {
        prompt: "Find the image of \\((x-1)^2+(y-2)^2=4\\) in \\(x+y=1\\).",
        steps: [
          "\\(a=b=1\\), \\(c=-1\\); at \\((1,2)\\): \\(ax_0+by_0+c=2\\).",
          "Image centre: \\((1,2)-\\frac{4}{2}(1,1)=(-1,0)\\).",
        ],
        answer: "\\((x+1)^2+y^2=4\\).",
      },
      practiceSet: [
        { prompt: "Image of \\((x-2)^2+y^2=1\\) in the \\(y\\)-axis?", answer: "\\((x+2)^2+y^2=1\\)" },
        { prompt: "Image of the centre \\((3,1)\\) in \\(y=x\\)?", answer: "\\((1,3)\\)" },
        { prompt: "Does reflection change the radius?", answer: "No" },
        { prompt: "Image of \\((0,0)\\) in \\(x+y=2\\)?", answer: "\\((2,2)\\)" },
      ],
      pyqExampleId: "068d60e0-e4c5-46a5-ae89-3d604519d8ba", // 2022 — mirror image of c1 in y = x + 1, alpha + 6r^2
      traps: [
        {
          title: "Equal radii give a second equation",
          body: "When the image circle is given with unknown coefficients, the equal radii are a condition too: \\(r_1^2=r_2^2\\) often fixes the last constant. Reflecting only the centre and stopping leaves it unused.",
        },
      ],
    },
  ],
};
