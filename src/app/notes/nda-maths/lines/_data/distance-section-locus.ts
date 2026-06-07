import type { SubtopicNote } from "@/app/notes/_types";

export const DISTANCE_SECTION_LOCUS_NOTE: SubtopicNote = {
  subtopicName: "Distance, Section, and Locus",
  title: "Distance, Section & Locus",
  oneLineDefinition:
    "Distances between points, from a point to a line, and between parallel lines; the section formula for dividing a segment; and locus equations from a geometric condition.",
  whyItMatters:
    "These three formulas underpin half the chapter. The point-to-line distance and the section formula appear constantly, and 'locus' questions are just a geometric condition translated into an equation.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "lines-distance-formulas",
      name: "Distance: point-point, point-line, parallel lines",
      intuition:
        "Three distances recur: between two points (Pythagoras), from a point to a line (perpendicular distance using the normalised equation), and between two parallel lines (difference of constants over the same normaliser).",
      definition:
        "- **Two points:** \\(\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}\\).\n" +
        "- **Point to line:** distance from \\((x_0,y_0)\\) to \\(ax+by+c=0\\) is \\(\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}\\).\n" +
        "- **Parallel lines** \\(ax+by+c_1=0\\), \\(ax+by+c_2=0\\): \\(\\dfrac{|c_1-c_2|}{\\sqrt{a^2+b^2}}\\) (make the \\(a,b\\) match first).",
      visualizationSlug: "lines-distance-point-line",
      authoredExample: {
        prompt: "Find the distance from \\((1,2)\\) to the line \\(3x+4y-10=0\\).",
        steps: [
          "\\(\\dfrac{|3(1)+4(2)-10|}{\\sqrt{3^2+4^2}}=\\dfrac{|1|}{5}\\).",
        ],
        answer: "\\(\\tfrac15\\).",
      },
      selfCheckExample: {
        prompt: "Find the distance between \\(3x+4y=9\\) and \\(3x+4y=4\\).",
        steps: [
          "Same \\(a,b\\): \\(\\dfrac{|9-4|}{\\sqrt{3^2+4^2}}=\\dfrac{5}{5}\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Distance from \\((x_0,y_0)\\) to \\(ax+by+c=0\\)?", answer: "\\(\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}\\)" },
        { prompt: "Distance between \\(ax+by+c_1=0,\\ ax+by+c_2=0\\)?", answer: "\\(\\dfrac{|c_1-c_2|}{\\sqrt{a^2+b^2}}\\)" },
        { prompt: "Distance from \\((1,2)\\) to \\(3x+4y-10=0\\)?", answer: "\\(\\tfrac15\\)" },
        { prompt: "Before using the parallel-line formula, ensure?", answer: "The \\(a,b\\) coefficients match" },
      ],
      pyqExampleId: "fb63c76c-86d3-4195-87c0-ccbd58581642", // distance between 3x+4y=9 and ...
    },

    {
      kind: "formula" as const,
      slug: "lines-section-formula",
      name: "Section formula and ratios",
      intuition:
        "The point dividing a segment in a given ratio is a weighted average of the endpoints. Run it backwards to find the ratio in which a point (or a line) divides a segment, or forwards to find midpoints and divisions.",
      definition:
        "Point dividing \\(P(x_1,y_1)\\),\\(Q(x_2,y_2)\\) internally in ratio \\(m:n\\): \\(\\left(\\dfrac{mx_2+nx_1}{m+n},\\dfrac{my_2+ny_1}{m+n}\\right)\\). External division uses \\(m:-n\\). Midpoint is the \\(1:1\\) case. Collinearity of \\((x_1,y_1),(x_2,y_2),(x_3,y_3)\\): area \\(=0\\) (equivalently equal slopes).",
      authoredExample: {
        prompt: "Find the point dividing \\((1,2)\\) and \\((4,8)\\) internally in ratio \\(2:1\\).",
        steps: [
          "\\(x=\\dfrac{2(4)+1(1)}{3}=3\\), \\(y=\\dfrac{2(8)+1(2)}{3}=6\\).",
        ],
        answer: "\\((3,6)\\).",
      },
      selfCheckExample: {
        prompt: "In what ratio does \\(x+y=4\\) divide the segment from \\(P(1,1)\\) to \\(Q(5,7)\\)?",
        steps: [
          "Let ratio \\(k:1\\); dividing point \\(\\left(\\tfrac{5k+1}{k+1},\\tfrac{7k+1}{k+1}\\right)\\) lies on \\(x+y=4\\).",
          "\\(\\tfrac{5k+1+7k+1}{k+1}=4\\Rightarrow 12k+2=4k+4\\Rightarrow k=\\tfrac14\\).",
        ],
        answer: "\\(1:4\\).",
      },
      practiceSet: [
        { prompt: "Internal division \\(m:n\\) x-coordinate?", answer: "\\(\\dfrac{mx_2+nx_1}{m+n}\\)" },
        { prompt: "Midpoint is which ratio?", answer: "\\(1:1\\)" },
        { prompt: "External division uses ratio?", answer: "\\(m:-n\\)" },
        { prompt: "Three points collinear ⇒ area?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "86e9b380-545e-4e94-8b32-585ec6f4f630", // ratio in which C divides
    },

    {
      kind: "formula" as const,
      slug: "lines-locus",
      name: "Locus from a condition",
      intuition:
        "A locus is the set of points satisfying a rule. Let the moving point be \\((x,y)\\), write the geometric condition algebraically, and simplify — the equation that survives is the locus. 'Equidistant from two points' always gives the perpendicular bisector.",
      definition:
        "Set \\(P=(x,y)\\), translate the condition (equidistant, fixed ratio, sum/difference of distances), and reduce. **Equidistant from \\(A,B\\):** \\(PA^2=PB^2\\) ⇒ the perpendicular bisector of \\(AB\\) (a line). Equidistant from two lines ⇒ the angle bisectors.",
      authoredExample: {
        prompt: "Find the locus of points equidistant from \\(A(1,2)\\) and \\(B(3,4)\\).",
        steps: [
          "\\((x-1)^2+(y-2)^2=(x-3)^2+(y-4)^2\\).",
          "Expand & cancel: \\(-2x-4y+5=-6x-8y+25\\Rightarrow 4x+4y=20\\Rightarrow x+y=5\\).",
        ],
        answer: "\\(x+y=5\\) (the perpendicular bisector).",
      },
      selfCheckExample: {
        prompt: "Locus of points equidistant from \\((2a,0)\\) and \\((0,3a)\\)?",
        steps: [
          "\\((x-2a)^2+y^2=x^2+(y-3a)^2\\).",
          "\\(-4ax+4a^2=-6ay+9a^2\\Rightarrow 4x-6y+5a=0\\).",
        ],
        answer: "\\(4x-6y+5a=0\\).",
      },
      practiceSet: [
        { prompt: "Locus equidistant from two points is?", answer: "Their perpendicular bisector" },
        { prompt: "First step in a locus problem?", answer: "Let the point be \\((x,y)\\), write the condition" },
        { prompt: "Locus equidistant from two lines?", answer: "The angle bisectors" },
        { prompt: "Condition for \\(P\\) equidistant from \\(A,B\\)?", answer: "\\(PA^2=PB^2\\)" },
      ],
      pyqExampleId: "17378311-370b-4e0b-b994-460377094bf8", // locus of midpoint
    },
  ],
  related: [
    { label: "Equations & Slope", href: "/notes/nda-maths/lines/lines-equation-slope" },
    { label: "Angle, Parallel & Perpendicular", href: "/notes/nda-maths/lines/lines-angle-parallel-perp" },
  ],
};
