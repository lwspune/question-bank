import type { SubtopicNote } from "@/app/notes/_types";

export const ARCS_CX_NOTE: SubtopicNote = {
  subtopicName: "Arcs and Conic Loci",
  title: "Arcs and Conic Loci",
  oneLineDefinition:
    "Loci set by the angle at z — a quotient that is real, purely imaginary or of fixed argument — and loci that are ellipses, hyperbolas or parabolas.",
  whyItMatters:
    "Sixteen PYQs, thirteen of them multiple choice. Twelve fix the argument of a quotient of the form (z − a)/(z − b), which puts z on a line, a circle or an arc; four are conic sections, usually an ellipse from a sum of two distances. Two ideas cover the page.",
  concepts: [
    // C1 — ratio conditions
    {
      kind: "formula" as const,
      slug: "jcx-ratio",
      name: "Real, imaginary or fixed-argument quotients",
      intuition:
        "\\(\\arg\\frac{z-a}{z-b}\\) is the angle at \\(z\\) between the directions to \\(b\\) and to \\(a\\). If the quotient is real, that angle is 0 or \\(\\pi\\): \\(z\\) is on the line through \\(a\\) and \\(b\\). If it is purely imaginary, the angle is a right angle, so \\(z\\) is on the circle with diameter \\(ab\\). If the argument is a fixed \\(\\theta\\), \\(z\\) runs along one arc of a circle through \\(a\\) and \\(b\\) on which the chord \\(ab\\) subtends \\(\\theta\\).",
      definition:
        "- Real: the line through \\(a\\) and \\(b\\), without \\(b\\).\n" +
        "- Purely imaginary: the circle with diameter \\(ab\\), without \\(a\\) and \\(b\\).\n" +
        "- Argument \\(\\theta\\): one arc through \\(a\\) and \\(b\\), radius \\(\\frac{|a-b|}{2\\sin\\theta}\\), centre on the perpendicular bisector.\n" +
        "- Find which arc by testing a point, such as one on the bisector.",
      formula: {
        label: "Radius of the arc",
        latex: "\\arg\\frac{z-a}{z-b}=\\theta\\ \\Rightarrow\\ r=\\frac{|a-b|}{2\\sin\\theta}",
      },
      authoredExample: {
        prompt: "Describe the locus \\(\\arg\\frac{z-3}{z+3}=\\frac\\pi2\\).",
        steps: [
          "A right angle at \\(z\\) puts \\(z\\) on the circle with diameter from \\(-3\\) to \\(3\\): \\(|z|=3\\).",
          "Test \\(z=3i\\): \\(\\frac{3i-3}{3i+3}=i\\), argument \\(\\frac\\pi2\\). So it is the upper half.",
        ],
        answer: "The semicircle \\(|z|=3\\), \\(\\mathrm{Im}(z)>0\\).",
      },
      selfCheckExample: {
        prompt: "Find the locus of \\(z\\) when \\(\\frac{z-i}{z+1}\\) is real.",
        steps: [
          "\\(z\\) is on the line through \\(i\\) and \\(-1\\).",
        ],
        answer: "\\(y=x+1\\), without the point \\(-1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\frac{z-1}{z+1}\\) purely imaginary?", answer: "\\(|z|=1\\), \\(z\\neq\\pm1\\)" },
        { prompt: "Radius for \\(\\arg\\frac{z-1}{z+1}=\\frac\\pi6\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\frac{z-2i}{z-2}\\) real?", answer: "The line \\(x+y=2\\)" },
        { prompt: "Greatest \\(|z|\\) on \\(\\arg\\frac{z-1}{z+1}=\\frac\\pi4\\)?", answer: "\\(1+\\sqrt2\\)" },
      ],
      pyqExampleId: "675f8e9c-ae90-40fb-9c31-f29475d3fda6", // 2024 — Re((z - 2i)/(z + 2i)) = 0, greatest |z - (6 + 8i)|
      traps: [
        {
          title: "A fixed argument gives one arc",
          body: "\\(\\arg\\frac{z-a}{z-b}=\\theta\\) is one arc, not the whole circle; the other arc has the argument \\(\\theta-\\pi\\). Before counting intersections or measuring distances, check that the point found lies on the right arc.",
        },
      ],
    },

    // C2 — conic loci
    {
      kind: "formula" as const,
      slug: "jcx-conic",
      name: "Ellipses, hyperbolas and parabolas",
      intuition:
        "\\(|z-a|+|z-b|=2k\\) is an ellipse with foci \\(a\\) and \\(b\\) when \\(2k>|a-b|\\); it is only the segment \\(ab\\) when \\(2k=|a-b|\\), and empty when \\(2k\\) is smaller. A difference \\(\\big||z-a|-|z-b|\\big|=2k<|a-b|\\) is a hyperbola. \\(|z-a|=\\mathrm{Re}(z)\\) sets a distance to a point equal to a distance to a line: a parabola. The focus facts often answer a question without any equation.",
      definition:
        "- \\(|z-a|+|z-b|=2k>|a-b|\\): ellipse, with \\(c=\\frac{|a-b|}2\\) and semi-minor axis \\(\\sqrt{k^2-c^2}\\).\n" +
        "- \\(2k=|a-b|\\): the segment \\(ab\\).\n" +
        "- \\(\\big||z-a|-|z-b|\\big|=2k<|a-b|\\): hyperbola.\n" +
        "- Distance to a point equal to distance to a line: parabola.\n" +
        "- The least value of \\(|z-a|+|z-b|\\) is \\(|a-b|\\).",
      formula: {
        label: "Ellipse from two foci",
        latex: "|z-z_1|+|z-z_2|=2a>|z_1-z_2|:\\ b^2=a^2-c^2,\\ c=\\tfrac12|z_1-z_2|",
      },
      authoredExample: {
        prompt: "Describe \\(|z-3|+|z+3|=10\\).",
        steps: [
          "Foci \\(\\pm3\\), so \\(c=3\\); \\(a=5\\) and \\(b^2=25-9\\).",
        ],
        answer: "The ellipse \\(\\frac{x^2}{25}+\\frac{y^2}{16}=1\\).",
      },
      selfCheckExample: {
        prompt: "What is \\(|z-1-i|+|z+1+i|=2\\sqrt2\\)?",
        steps: [
          "\\(|(1+i)-(-1-i)|=2\\sqrt2\\), equal to the constant.",
        ],
        answer: "The segment from \\(-1-i\\) to \\(1+i\\).",
      },
      practiceSet: [
        { prompt: "\\(|z-2|+|z+2|=3\\)?", answer: "Empty" },
        { prompt: "\\(|z-1|=\\mathrm{Re}(z)+1\\)?", answer: "The parabola \\(y^2=4x\\)" },
        { prompt: "Semi-minor axis of \\(|z|+|z-6|=10\\)?", answer: "\\(4\\)" },
        { prompt: "Least \\(|z-1|+|z-4i|\\)?", answer: "\\(\\sqrt{17}\\)" },
      ],
      pyqExampleId: "b0b289a7-0a32-4f11-be10-1e9ef1bf364b", // 2026 — points on a circle and an ellipse with the same centre
      traps: [
        {
          title: "Compare the constant with the focal distance",
          body: "A sum of distances is an ellipse only when the constant exceeds the distance between the two points. Check \\(2k\\) against \\(|a-b|\\) before using \\(a\\), \\(b\\) and \\(c\\).",
        },
      ],
    },
  ],
};
