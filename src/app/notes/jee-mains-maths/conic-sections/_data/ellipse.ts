import type { SubtopicNote } from "@/app/notes/_types";

export const ELLIPSE_NOTE: SubtopicNote = {
  subtopicName: "Ellipse: Axes, Eccentricity and Focal Distances",
  title: "Ellipse: Axes, Eccentricity and Focal Distances",
  oneLineDefinition:
    "The ellipse through its numbers a, b and e: axis lengths, foci, directrices and latus rectum; ellipses with a vertical axis or a moved centre; the constant sum of focal distances; and the parametric point with the auxiliary circle.",
  whyItMatters:
    "Forty-three PYQs. Most give two facts, such as an eccentricity and a latus rectum, and ask for a third. The relation b² = a²(1 − e²) links them all. Four ideas cover the page.",
  concepts: [
    // C1 — parameters
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-parameters",
      name: "a, b, e and the latus rectum",
      intuition:
        "An ellipse \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\) with \\(a>b\\) is fixed by two numbers. The eccentricity \\(e\\) measures how stretched it is: the foci sit at \\((\\pm ae,0)\\), and \\(b^2=a^2(1-e^2)\\) ties the three together. Almost every question gives two of \\(a\\), \\(b\\), \\(e\\), the focal distance \\(2ae\\), or the latus rectum \\(\\frac{2b^2}{a}\\), and asks for another.",
      definition:
        "For \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\), \\(a>b\\):\n" +
        "- Major axis \\(2a\\) along \\(x\\), minor axis \\(2b\\).\n" +
        "- \\(b^2=a^2(1-e^2)\\), with \\(0<e<1\\).\n" +
        "- Foci \\((\\pm ae,0)\\), distance between them \\(2ae\\).\n" +
        "- Directrices \\(x=\\pm\\frac{a}{e}\\).\n" +
        "- Latus rectum \\(\\frac{2b^2}{a}\\).",
      formula: {
        label: "The linking relation and the latus rectum",
        latex: "b^2=a^2(1-e^2),\\qquad \\text{LR}=\\frac{2b^2}{a}",
      },
      authoredExample: {
        prompt: "An ellipse \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\) (\\(a>b\\)) has \\(e=\\frac35\\) and latus rectum \\(\\frac{32}{5}\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "\\(b^2=a^2\\left(1-\\frac{9}{25}\\right)=\\frac{16a^2}{25}\\).",
          "\\(\\frac{2b^2}{a}=\\frac{32a}{25}=\\frac{32}{5}\\), so \\(a=5\\).",
          "\\(b^2=16\\).",
        ],
        answer: "\\(a=5\\), \\(b=4\\).",
      },
      selfCheckExample: {
        prompt: "The minor axis of an ellipse equals the distance between its foci. Find \\(e\\).",
        steps: [
          "\\(2b=2ae\\), so \\(b^2=a^2e^2\\).",
          "Also \\(b^2=a^2(1-e^2)\\): \\(e^2=1-e^2\\).",
        ],
        answer: "\\(e=\\frac{1}{\\sqrt2}\\).",
      },
      practiceSet: [
        { prompt: "\\(e\\) of \\(\\frac{x^2}{25}+\\frac{y^2}{16}=1\\)?", answer: "\\(\\frac35\\)" },
        { prompt: "Latus rectum of \\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\)?", answer: "\\(\\frac83\\)" },
        { prompt: "Foci of \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\)?", answer: "\\((\\pm4,0)\\)" },
        { prompt: "Directrices of \\(\\frac{x^2}{25}+\\frac{y^2}{16}=1\\)?", answer: "\\(x=\\pm\\frac{25}{3}\\)" },
      ],
      pyqExampleId: "f56b588a-826d-4957-9ceb-af205c398517", // 2026 — latus rectum 30, e = max of a quadratic
      traps: [
        {
          title: "\\(1-e^2\\) for an ellipse, \\(e^2-1\\) for a hyperbola",
          body: "For an ellipse \\(b^2=a^2(1-e^2)\\) and \\(e<1\\). Writing \\(a^2(e^2-1)\\), the hyperbola rule, makes \\(b^2\\) negative.",
        },
      ],
    },

    // C2 — vertical axis, shifted centre
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-orientation",
      name: "A vertical major axis, or a moved centre",
      intuition:
        "Nothing forces the major axis onto the \\(x\\)-axis. If the bigger denominator is under \\(y^2\\), the ellipse is tall: the foci, directrices and latus rectum all turn by \\(90^\\circ\\), and the roles of \\(a\\) and \\(b\\) swap in every formula. If the centre is at \\((h,k)\\), complete the squares and measure every feature from that centre.",
      definition:
        "- \\(\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1\\) with \\(b>a\\): major axis on \\(y\\), \\(a^2=b^2(1-e^2)\\), foci \\((0,\\pm be)\\), latus rectum \\(\\frac{2a^2}{b}\\).\n" +
        "- \\(\\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}=1\\): centre \\((h,k)\\); foci, vertices and directrices shift with it.\n" +
        "- Given the centre, a focus and a vertex on one line: \\(ae\\) = centre to focus, semi-major = centre to vertex.",
      formula: {
        label: "Tall ellipse (b > a)",
        latex: "a^2=b^2(1-e^2),\\quad S=(0,\\pm be),\\quad \\text{LR}=\\frac{2a^2}{b}",
      },
      authoredExample: {
        prompt: "Find \\(e\\), the foci and the latus rectum of \\(\\frac{x^2}{9}+\\frac{y^2}{25}=1\\).",
        steps: [
          "\\(25>9\\), so the major axis is along \\(y\\): semi-major \\(5\\), semi-minor \\(3\\).",
          "\\(9=25(1-e^2)\\) gives \\(e=\\frac45\\); foci \\((0,\\pm4)\\).",
          "Latus rectum \\(=\\frac{2\\cdot9}{5}\\).",
        ],
        answer: "\\(e=\\frac45\\), foci \\((0,\\pm4)\\), latus rectum \\(\\frac{18}{5}\\).",
      },
      selfCheckExample: {
        prompt: "An ellipse has centre \\((2,1)\\), a focus at \\((2,4)\\) and a vertex at \\((2,6)\\). Find its latus rectum.",
        steps: [
          "Centre to focus \\(=3\\), centre to vertex \\(=5\\): semi-major \\(5\\).",
          "Semi-minor\\(^2=25-9=16\\).",
          "Latus rectum \\(=\\frac{2\\cdot16}{5}\\).",
        ],
        answer: "\\(\\frac{32}{5}\\).",
      },
      practiceSet: [
        { prompt: "Centre of \\(x^2+4y^2-2x=3\\)?", answer: "\\((1,0)\\)", method: "\\(\\frac{(x-1)^2}{4}+y^2=1\\)" },
        { prompt: "Foci of \\(\\frac{(x-1)^2}{16}+\\frac{y^2}{7}=1\\)?", answer: "\\((4,0)\\), \\((-2,0)\\)" },
        { prompt: "\\(e\\) of \\(4x^2+y^2=4\\)?", answer: "\\(\\frac{\\sqrt3}{2}\\)" },
        { prompt: "Latus rectum of \\(\\frac{x^2}{4}+\\frac{y^2}{16}=1\\)?", answer: "\\(2\\)", method: "\\(\\frac{2\\cdot4}{4}\\)" },
      ],
      pyqExampleId: "a96ad058-e90b-46c5-98af-b0b50c24f33a", // 2025 — foci (2,5) and (2,-3), e = 4/5, latus rectum
      traps: [
        {
          title: "Check which denominator is bigger",
          body: "For \\(\\frac{x^2}{9}+\\frac{y^2}{25}=1\\), using \\(b^2=a^2(1-e^2)\\) with \\(a^2=9\\) gives \\(1-e^2>1\\), which is impossible. The larger denominator always plays the semi-major role.",
        },
      ],
    },

    // C3 — foci and focal distances
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-focal",
      name: "Focal distances: the constant sum",
      intuition:
        "For any point \\(P\\) on the ellipse, \\(SP+S'P=2a\\). That is the ellipse's defining property, and it works backwards too: points whose distances from two fixed points add to a constant form an ellipse. Each focal distance is also \\(e\\) times the distance to the matching directrix, which gives \\(SP=a-ex\\) and \\(S'P=a+ex\\) without square roots.",
      definition:
        "- \\(SP=a-ex_1\\), \\(S'P=a+ex_1\\) for \\(P(x_1,y_1)\\), \\(S=(ae,0)\\).\n" +
        "- \\(SP+S'P=2a\\).\n" +
        "- \\(SP\\cdot S'P=a^2-e^2x_1^2\\), between \\(b^2\\) and \\(a^2\\).\n" +
        "- **Directrix property:** \\(SP=e\\cdot PM\\), \\(PM\\) the distance to the directrix \\(x=\\frac{a}{e}\\).\n" +
        "- If \\(\\angle SPS'=90^\\circ\\): \\(SP^2+S'P^2=(2ae)^2\\).",
      formula: {
        label: "Focal distances",
        latex: "SP=a-ex_1,\\quad S'P=a+ex_1,\\quad SP+S'P=2a",
      },
      authoredExample: {
        prompt: "On \\(\\frac{x^2}{25}+\\frac{y^2}{16}=1\\), find the focal distances of the point with \\(x=3\\).",
        steps: [
          "\\(e=\\frac35\\), so \\(ex_1=\\frac95\\).",
          "\\(SP=5-\\frac95\\), \\(S'P=5+\\frac95\\).",
        ],
        answer: "\\(\\frac{16}{5}\\) and \\(\\frac{34}{5}\\).",
      },
      selfCheckExample: {
        prompt: "Find the locus of \\(P\\) with \\(PA+PB=10\\), where \\(A=(-3,0)\\) and \\(B=(3,0)\\).",
        steps: [
          "An ellipse with foci \\(A\\), \\(B\\): \\(2a=10\\), \\(ae=3\\).",
          "\\(b^2=a^2-(ae)^2=25-9\\).",
        ],
        answer: "\\(\\frac{x^2}{25}+\\frac{y^2}{16}=1\\).",
      },
      practiceSet: [
        { prompt: "\\(SP+S'P\\) on \\(\\frac{x^2}{36}+\\frac{y^2}{20}=1\\)?", answer: "\\(12\\)" },
        { prompt: "Smallest value of \\(SP\\cdot S'P\\) on \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\)?", answer: "\\(9\\)", method: "\\(b^2\\), at \\(x=0\\)" },
        { prompt: "Largest value of the same product?", answer: "\\(25\\)", method: "\\(a^2\\), at the ends of the major axis" },
        { prompt: "Focal distance of \\((5,0)\\) from \\((4,0)\\) on \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\)?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "fa5c2ade-3051-4107-a9a5-31855f68617a", // 2026 — SP^2 + S'P^2 - SP.S'P = 37 on x^2/25 + y^2/9 = 1
      traps: [
        {
          title: "\\(a-ex\\) is the distance to the focus on the SAME side",
          body: "For \\(S=(ae,0)\\), \\(SP=a-ex_1\\). The focus at \\((-ae,0)\\) gives \\(a+ex_1\\). Swapping them matters when only one focal distance is asked.",
        },
      ],
    },

    // C4 — parametric point, auxiliary circle, loci
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-parametric",
      name: "The parametric point, the auxiliary circle and loci",
      intuition:
        "Every point of the ellipse is \\((a\\cos\\theta,\\ b\\sin\\theta)\\). Directly above it, on the circle \\(x^2+y^2=a^2\\) (the auxiliary circle), is \\((a\\cos\\theta,\\ a\\sin\\theta)\\): the ellipse is that circle squashed vertically by \\(\\frac{b}{a}\\). That is why its area is \\(\\pi ab\\), and why midpoints and dividing points built from it trace smaller ellipses.",
      definition:
        "- **Parametric point:** \\((a\\cos\\theta,\\ b\\sin\\theta)\\), \\(\\theta\\) the eccentric angle.\n" +
        "- **Auxiliary circle:** \\(x^2+y^2=a^2\\); the ellipse point is the circle point scaled by \\(\\frac{b}{a}\\) vertically.\n" +
        "- **Area:** \\(\\pi ab\\).\n" +
        "- **Loci:** write the new point in \\(\\theta\\), isolate \\(\\cos\\theta\\) and \\(\\sin\\theta\\), square and add.\n" +
        "- \\(p\\cos\\theta+q\\sin\\theta\\) is at most \\(\\sqrt{p^2+q^2}\\).",
      formula: {
        label: "Parametric point and area",
        latex: "(a\\cos\\theta,\\ b\\sin\\theta),\\qquad \\text{Area}=\\pi ab",
      },
      authoredExample: {
        prompt: "Find the locus of the midpoint of the segment joining \\((2,0)\\) to a point of \\(\\frac{x^2}{16}+\\frac{y^2}{9}=1\\).",
        steps: [
          "The point is \\((4\\cos\\theta,3\\sin\\theta)\\); the midpoint is \\(\\left(2\\cos\\theta+1,\\ \\frac32\\sin\\theta\\right)\\).",
          "\\(\\cos\\theta=\\frac{x-1}{2}\\), \\(\\sin\\theta=\\frac{2y}{3}\\); square and add.",
        ],
        answer: "\\(\\frac{(x-1)^2}{4}+\\frac{4y^2}{9}=1\\).",
      },
      selfCheckExample: {
        prompt: "Find the area of the ellipse \\(4x^2+9y^2=36\\).",
        steps: [
          "\\(\\frac{x^2}{9}+\\frac{y^2}{4}=1\\): \\(a=3\\), \\(b=2\\).",
        ],
        answer: "\\(6\\pi\\).",
      },
      practiceSet: [
        { prompt: "Parametric point of \\(\\frac{x^2}{4}+y^2=1\\)?", answer: "\\((2\\cos\\theta,\\ \\sin\\theta)\\)" },
        { prompt: "Point on the auxiliary circle above \\(\\left(\\sqrt3,\\frac12\\right)\\) of \\(\\frac{x^2}{4}+y^2=1\\)?", answer: "\\((\\sqrt3,1)\\)" },
        { prompt: "Area of \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\)?", answer: "\\(15\\pi\\)" },
        { prompt: "Largest \\(x+y\\) on \\(\\frac{x^2}{9}+\\frac{y^2}{16}=1\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "f67c035c-6199-4795-93fe-10c143ee2214", // 2024 — R on PQ (ellipse to auxiliary circle) in ratio 4:3, eccentricity of the locus
      traps: [
        {
          title: "The auxiliary circle has radius \\(a\\), the SEMI-MAJOR axis",
          body: "For a tall ellipse (\\(b>a\\)) the auxiliary circle is \\(x^2+y^2=b^2\\). Always use the larger semi-axis.",
        },
      ],
    },
  ],
};
