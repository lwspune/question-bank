import type { SubtopicNote } from "@/app/notes/_types";

export const LINES_CIRCLES_CX_NOTE: SubtopicNote = {
  subtopicName: "Lines and Circles in the Complex Plane",
  title: "Lines and Circles in the Complex Plane",
  oneLineDefinition:
    "Reading an equation in z as a straight line or a circle: equal distances from two points, linear equations in z and its conjugate, and circles given by a centre or by a ratio of distances.",
  whyItMatters:
    "Seventeen PYQs, twelve of them multiple choice. Seven are straight lines — perpendicular bisectors and linear equations in z and its conjugate; ten are circles, often a ratio of two distances. Most then intersect the line or circle with another curve. Two ideas cover the page.",
  concepts: [
    // C1 — lines
    {
      kind: "formula" as const,
      slug: "jcx-line",
      name: "Straight lines",
      intuition:
        "\\(|z-a|=|z-b|\\) says \\(z\\) is equally far from \\(a\\) and \\(b\\): the perpendicular bisector of the segment \\(ab\\). A linear equation \\(\\bar az+a\\bar z+c=0\\) with \\(c\\) real is a line, because \\(\\bar az+a\\bar z=2\\,\\mathrm{Re}(\\bar az)\\) is linear in \\(x\\) and \\(y\\). So is \\(|z-a|^2-|z-b|^2=k\\), since the \\(x^2+y^2\\) terms cancel. To meet a circle, substitute the line into it.",
      definition:
        "- \\(|z-a|=|z-b|\\): the perpendicular bisector of \\(a\\) and \\(b\\).\n" +
        "- \\(\\bar az+a\\bar z+c=0\\), \\(c\\) real: a line.\n" +
        "- \\(z(p+iq)+\\bar z(p-iq)=2(px-qy)\\).\n" +
        "- \\(|z-a|^2-|z-b|^2=k\\): a line at right angles to \\(ab\\).",
      formula: {
        label: "Line in complex form",
        latex: "\\bar az+a\\bar z+c=0\\quad(c\\in\\mathbb R)",
      },
      authoredExample: {
        prompt: "Write \\(|z-1|=|z+3i|\\) in \\(x\\) and \\(y\\).",
        steps: [
          "\\((x-1)^2+y^2=x^2+(y+3)^2\\) gives \\(-2x+1=6y+9\\).",
        ],
        answer: "\\(x+3y+4=0\\).",
      },
      selfCheckExample: {
        prompt: "Where does \\(|z-2|=|z-2i|\\) meet \\(|z|=2\\)?",
        steps: [
          "The bisector is \\(y=x\\); then \\(2x^2=4\\).",
        ],
        answer: "\\(\\sqrt2(1+i)\\) and \\(-\\sqrt2(1+i)\\).",
      },
      practiceSet: [
        { prompt: "\\(|z+i|=|z-i|\\)?", answer: "The real axis" },
        { prompt: "\\(z+\\bar z=4\\)?", answer: "\\(x=2\\)" },
        { prompt: "\\(\\mathrm{Re}((1+i)z)=1\\)?", answer: "\\(x-y=1\\)" },
        { prompt: "Distance of 0 from \\(z(1-i)+\\bar z(1+i)=4\\)?", answer: "\\(\\sqrt2\\)" },
      ],
      pyqExampleId: "49eb001f-46e6-4b26-81e0-0a8a260a3167", // 2023 — |z - z1|^2 - |z - z2|^2 = |z1 - z2|^2 is a line
      traps: [
        {
          title: "Expand before trusting a sign",
          body: "\\(z(1+i)+\\bar z(1-i)=2(x-y)\\), while \\(z(1-i)+\\bar z(1+i)=2(x+y)\\). Expanding once with \\(z=x+iy\\) avoids picking the wrong half-plane or line.",
        },
      ],
    },

    // C2 — circles
    {
      kind: "formula" as const,
      slug: "jcx-circle",
      name: "Circles",
      intuition:
        "\\(|z-a|=r\\) is the circle with centre \\(a\\) and radius \\(r\\). A ratio of distances, \\(|z-a|=k|z-b|\\) with \\(k\\neq1\\), is also a circle: square, expand, and divide by the coefficient of \\(x^2+y^2\\) before reading off the centre. In complex form, \\(z\\bar z+\\bar\\alpha z+\\alpha\\bar z+d=0\\) is the circle with centre \\(-\\alpha\\) and radius \\(\\sqrt{|\\alpha|^2-d}\\).",
      definition:
        "- \\(|z-a|=r\\): centre \\(a\\), radius \\(r\\).\n" +
        "- \\(|z-a|=k|z-b|\\), \\(k\\neq1\\): a circle (for \\(k=1\\), a line).\n" +
        "- \\(z\\bar z+\\bar\\alpha z+\\alpha\\bar z+d=0\\): centre \\(-\\alpha\\), \\(r^2=|\\alpha|^2-d\\).\n" +
        "- \\(|z-\\alpha|^2+|z-\\beta|^2=2|z-m|^2+\\frac12|\\alpha-\\beta|^2\\), \\(m=\\frac{\\alpha+\\beta}2\\).",
      formula: {
        label: "Circle in complex form",
        latex: "z\\bar z+\\bar\\alpha z+\\alpha\\bar z+d=0:\\ \\text{centre }-\\alpha,\\ r=\\sqrt{|\\alpha|^2-d}",
      },
      authoredExample: {
        prompt: "Find the centre and radius of \\(|z+2|=3|z-2|\\).",
        steps: [
          "\\((x+2)^2+y^2=9\\left((x-2)^2+y^2\\right)\\) gives \\(8x^2+8y^2-40x+32=0\\).",
          "So \\(x^2+y^2-5x+4=0\\): centre \\(\\left(\\frac52,0\\right)\\), \\(r^2=\\frac{25}4-4\\).",
        ],
        answer: "Centre \\(\\frac52\\), radius \\(\\frac32\\).",
      },
      selfCheckExample: {
        prompt: "Find the centre and radius of \\(z\\bar z-(2+i)z-(2-i)\\bar z+1=0\\).",
        steps: [
          "Here \\(\\bar\\alpha=-(2+i)\\), so \\(\\alpha=-(2-i)\\) and the centre is \\(2-i\\); \\(r^2=5-1\\).",
        ],
        answer: "Centre \\(2-i\\), radius 2.",
      },
      practiceSet: [
        { prompt: "\\(|z-3i|=2\\)?", answer: "Centre \\((0,3)\\), radius 2" },
        { prompt: "\\(|z|=2|z-3|\\)?", answer: "Centre \\((4,0)\\), radius 2" },
        { prompt: "Is \\(|z-1|=|z-3|\\) a circle?", answer: "No — the line \\(x=2\\)" },
        { prompt: "\\(z\\bar z=9\\)?", answer: "\\(|z|=3\\)" },
      ],
      pyqExampleId: "1fd16773-a22c-4302-9917-cb528fea3f82", // 2023 — centre and radius of |(z - 2)/(z - 3)| = 2
      traps: [
        {
          title: "Divide before reading the centre",
          body: "After squaring a ratio of distances the \\(x^2+y^2\\) term has a coefficient like 3 or 8. Divide through by it first; reading the centre from the undivided equation gives the wrong point.",
        },
      ],
    },
  ],
};
