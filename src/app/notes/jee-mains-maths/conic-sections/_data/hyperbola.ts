import type { SubtopicNote } from "@/app/notes/_types";

export const HYPERBOLA_NOTE: SubtopicNote = {
  subtopicName: "Hyperbola: Axes, Eccentricity and Focal Distances",
  title: "Hyperbola: Axes, Eccentricity and Focal Distances",
  oneLineDefinition:
    "The hyperbola through its numbers a, b and e: axes, foci, directrices, latus rectum and the conjugate hyperbola; problems that pair a hyperbola with an ellipse; focal distances; and the rectangular hyperbola.",
  whyItMatters:
    "Forty-two PYQs, and a third of them also involve an ellipse: shared foci, or eccentricities with a given product. The relation b² = a²(e² − 1) and the constant difference of focal distances do most of the work. Four ideas cover the page.",
  concepts: [
    // C1 — parameters
    {
      kind: "formula" as const,
      slug: "jcon-hyperbola-parameters",
      name: "a, b, e, the latus rectum and the conjugate hyperbola",
      intuition:
        "A hyperbola \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\) has the same list of features as an ellipse, with one sign changed: \\(b^2=a^2(e^2-1)\\), so \\(e>1\\). The foci are still at \\((\\pm ae,0)\\), the directrices at \\(x=\\pm\\frac{a}{e}\\), and the latus rectum is still \\(\\frac{2b^2}{a}\\). Swapping the signs of the two squared terms gives the conjugate hyperbola, which opens up and down.",
      definition:
        "For \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\):\n" +
        "- Transverse axis \\(2a\\), conjugate axis \\(2b\\).\n" +
        "- \\(b^2=a^2(e^2-1)\\), \\(e>1\\).\n" +
        "- Foci \\((\\pm ae,0)\\); directrices \\(x=\\pm\\frac{a}{e}\\); latus rectum \\(\\frac{2b^2}{a}\\).\n" +
        "- **Opening up and down**, \\(\\frac{y^2}{b^2}-\\frac{x^2}{a^2}=1\\): \\(a^2=b^2(e^2-1)\\), foci \\((0,\\pm be)\\), latus rectum \\(\\frac{2a^2}{b}\\).\n" +
        "- **Conjugate hyperbolas** \\(e\\), \\(e'\\): \\(\\frac{1}{e^2}+\\frac{1}{e'^2}=1\\).",
      formula: {
        label: "The linking relation",
        latex: "b^2=a^2(e^2-1),\\qquad \\text{LR}=\\frac{2b^2}{a}",
      },
      authoredExample: {
        prompt: "A hyperbola \\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\) has \\(e=\\frac54\\) and latus rectum \\(\\frac92\\). Find \\(a\\) and \\(b\\).",
        steps: [
          "\\(b^2=a^2\\left(\\frac{25}{16}-1\\right)=\\frac{9a^2}{16}\\).",
          "\\(\\frac{2b^2}{a}=\\frac{9a}{8}=\\frac92\\), so \\(a=4\\).",
        ],
        answer: "\\(a=4\\), \\(b=3\\).",
      },
      selfCheckExample: {
        prompt: "The foci of a hyperbola are \\(10\\) apart and its directrices \\(\\frac{32}{5}\\) apart. Find \\(b^2\\).",
        steps: [
          "\\(2ae=10\\) and \\(\\frac{2a}{e}=\\frac{32}{5}\\).",
          "Multiply: \\(a^2=5\\cdot\\frac{16}{5}=16\\); then \\(e=\\frac54\\).",
          "\\(b^2=16\\left(\\frac{25}{16}-1\\right)\\).",
        ],
        answer: "\\(b^2=9\\).",
      },
      practiceSet: [
        { prompt: "\\(e\\) of \\(\\frac{x^2}{16}-\\frac{y^2}{9}=1\\)?", answer: "\\(\\frac54\\)" },
        { prompt: "Latus rectum of \\(\\frac{x^2}{9}-\\frac{y^2}{16}=1\\)?", answer: "\\(\\frac{32}{3}\\)" },
        { prompt: "Eccentricity of the conjugate of a hyperbola with \\(e=\\frac54\\)?", answer: "\\(\\frac53\\)" },
        { prompt: "Foci of \\(\\frac{y^2}{16}-\\frac{x^2}{9}=1\\)?", answer: "\\((0,\\pm5)\\)" },
      ],
      pyqExampleId: "cc6c841a-ee07-4f60-81ab-496da7453039", // 2026 — 15(e^2 + 1) = 34e, through (6, 4 root 3)
      traps: [
        {
          title: "\\(e^2-1\\), not \\(1-e^2\\)",
          body: "For a hyperbola \\(b^2=a^2(e^2-1)\\) and \\(e>1\\). A root \\(e<1\\) of a given equation belongs to an ellipse, not to this curve.",
        },
      ],
    },

    // C2 — ellipse and hyperbola together
    {
      kind: "formula" as const,
      slug: "jcon-ellipse-hyperbola-together",
      name: "Ellipse and hyperbola together: shared foci and linked eccentricities",
      intuition:
        "Many questions set a hyperbola beside an ellipse: they share foci, or one passes through the other's vertices, or their eccentricities multiply to \\(1\\). The key is that the focal distance \\(c\\) comes from DIFFERENT formulas: \\(c^2=a^2-b^2\\) for the ellipse, \\(c^2=A^2+B^2\\) for the hyperbola. Find \\(c\\) from whichever curve is fully given, then use it on the other.",
      definition:
        "- **Ellipse:** \\(c^2=a^2-b^2\\), \\(c=ae\\).\n" +
        "- **Hyperbola:** \\(c^2=A^2+B^2\\), \\(c=Ae'\\).\n" +
        "- **Same foci:** equal \\(c\\).\n" +
        "- **Through the other's foci or vertices:** that fixes one semi-axis.\n" +
        "- Given \\(ee'=1\\) or a ratio: substitute one eccentricity into the other curve's relation.",
      formula: {
        label: "The focal distance, two ways",
        latex: "c^2=a^2-b^2\\ \\text{(ellipse)},\\qquad c^2=A^2+B^2\\ \\text{(hyperbola)}",
      },
      authoredExample: {
        prompt: "Find the hyperbola with the same foci as \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\) and eccentricity \\(2\\).",
        steps: [
          "Ellipse: \\(c^2=25-9=16\\), \\(c=4\\).",
          "Hyperbola: \\(A=\\frac{c}{e'}=2\\), \\(B^2=c^2-A^2=12\\).",
        ],
        answer: "\\(\\frac{x^2}{4}-\\frac{y^2}{12}=1\\).",
      },
      selfCheckExample: {
        prompt: "A hyperbola has its vertices at the foci of \\(\\frac{x^2}{25}+\\frac{y^2}{9}=1\\) and its foci at that ellipse's vertices. Find it.",
        steps: [
          "The ellipse's foci are \\((\\pm4,0)\\): \\(A=4\\).",
          "Its vertices are \\((\\pm5,0)\\): \\(c=5\\), \\(B^2=25-16\\).",
        ],
        answer: "\\(\\frac{x^2}{16}-\\frac{y^2}{9}=1\\).",
      },
      practiceSet: [
        { prompt: "Foci of \\(\\frac{x^2}{16}+\\frac{y^2}{7}=1\\)?", answer: "\\((\\pm3,0)\\)" },
        { prompt: "Hyperbola with foci \\((\\pm5,0)\\) and \\(A=3\\): \\(e'\\)?", answer: "\\(\\frac53\\)" },
        { prompt: "Ellipse \\(e=\\frac35\\), hyperbola \\(e'\\) with \\(ee'=1\\)?", answer: "\\(e'=\\frac53\\)" },
        { prompt: "Hyperbola confocal with \\(\\frac{x^2}{36}+\\frac{y^2}{11}=1\\), \\(A=3\\): \\(B^2\\)?", answer: "\\(16\\)", method: "\\(c^2=25\\)" },
      ],
      pyqExampleId: "95602844-a96d-4d75-9e19-bb2b330b1b35", // 2024 — hyperbola sharing foci with a shifted ellipse, e reciprocal
      traps: [
        {
          title: "Do not reuse \\(a^2-b^2\\) for the hyperbola",
          body: "The ellipse gives \\(c^2=a^2-b^2\\); the hyperbola needs \\(c^2=A^2+B^2\\). Using the ellipse rule on the hyperbola gives a negative or wrong \\(B^2\\).",
        },
      ],
    },

    // C3 — focal distances
    {
      kind: "formula" as const,
      slug: "jcon-hyperbola-focal",
      name: "Focal distances: the constant difference, and foci anywhere",
      intuition:
        "On a hyperbola the DIFFERENCE of the focal distances is constant: \\(|SP-S'P|=2a\\). As with the ellipse, each is \\(e\\) times the distance to its directrix, giving \\(SP=ex-a\\) and \\(S'P=ex+a\\) on the right branch. When the foci are given as two points off the axes, the centre is their midpoint and \\(c\\) is half the distance between them; the eccentricity then gives the transverse semi-axis.",
      definition:
        "- \\(|SP-S'P|=2a\\).\n" +
        "- Right branch (\\(x>0\\)), \\(S=(ae,0)\\): \\(SP=ex-a\\), \\(S'P=ex+a\\).\n" +
        "- Product: \\(SP\\cdot S'P=e^2x^2-a^2\\).\n" +
        "- Triangle \\(PSS'\\): area \\(\\frac12\\cdot2ae\\cdot|y|\\).\n" +
        "- **Foci given as points:** centre = midpoint, \\(c\\) = half their distance, \\(a=\\frac{c}{e}\\).",
      formula: {
        label: "Focal distances on the right branch",
        latex: "SP=ex-a,\\quad S'P=ex+a,\\quad S'P-SP=2a",
      },
      authoredExample: {
        prompt: "On \\(\\frac{x^2}{16}-\\frac{y^2}{9}=1\\), find the focal distances of the point with \\(x=8\\).",
        steps: [
          "\\(e=\\frac54\\), so \\(ex=10\\).",
          "\\(SP=10-4\\), \\(S'P=10+4\\). Check: the difference is \\(8=2a\\).",
        ],
        answer: "\\(6\\) and \\(14\\).",
      },
      selfCheckExample: {
        prompt: "A hyperbola has foci \\((1,5)\\) and \\((1,-3)\\) and \\(e=2\\). Find its latus rectum.",
        steps: [
          "Centre \\((1,1)\\), \\(c=4\\); the transverse axis is vertical.",
          "Transverse semi-axis \\(=\\frac{c}{e}=2\\); the other semi-axis\\(^2=16-4=12\\).",
          "Latus rectum \\(=\\frac{2\\cdot12}{2}\\).",
        ],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "\\(|SP-S'P|\\) on \\(\\frac{x^2}{9}-\\frac{y^2}{16}=1\\)?", answer: "\\(6\\)" },
        { prompt: "Product of the focal distances of \\(\\left(5,\\frac{16}{3}\\right)\\) on \\(\\frac{x^2}{9}-\\frac{y^2}{16}=1\\)?", answer: "\\(\\frac{544}{9}\\)", method: "\\(\\frac{25}{9}\\cdot25-9\\)" },
        { prompt: "Area of \\(\\triangle PSS'\\) for that point?", answer: "\\(\\frac{80}{3}\\)" },
        { prompt: "Centre of the hyperbola with foci \\((4,2)\\), \\((8,2)\\)?", answer: "\\((6,2)\\)" },
      ],
      pyqExampleId: "47747e7c-37e5-4963-9ee7-f05f488fdef9", // 2026 — P(10, 2 root 15), latus rectum 8, (area PSS')^2
      traps: [
        {
          title: "The DIFFERENCE is \\(2a\\), not the sum",
          body: "For an ellipse \\(SP+S'P=2a\\); for a hyperbola it is \\(|SP-S'P|=2a\\). A question giving the SUM of focal distances on a hyperbola is giving \\(2ex\\), not \\(2a\\).",
        },
      ],
    },

    // C4 — rectangular hyperbola and loci
    {
      kind: "formula" as const,
      slug: "jcon-rectangular-hyperbola",
      name: "The rectangular hyperbola, and hyperbolas that appear as loci",
      intuition:
        "When \\(a=b\\), the asymptotes are perpendicular and \\(e=\\sqrt2\\): this is a rectangular hyperbola. Turned through \\(45^\\circ\\) it becomes \\(xy=c^2\\), whose points are \\(\\left(ct,\\frac{c}{t}\\right)\\). Hyperbolas also turn up as loci: when two lines move with a parameter, multiply or combine their equations to remove it, and read the result.",
      definition:
        "- \\(x^2-y^2=a^2\\): \\(e=\\sqrt2\\), asymptotes \\(y=\\pm x\\).\n" +
        "- \\(xy=c^2\\): points \\(\\left(ct,\\frac{c}{t}\\right)\\), asymptotes the axes, \\(e=\\sqrt2\\).\n" +
        "- \\(x^2y^2=1\\) is the pair \\(xy=1\\) and \\(xy=-1\\).\n" +
        "- **Loci:** remove the parameter; if the result is \\(\\frac{x^2}{A}-\\frac{y^2}{B}=1\\), read \\(e=\\sqrt{1+\\frac{B}{A}}\\).",
      formula: {
        label: "Rectangular hyperbola",
        latex: "xy=c^2:\\ \\left(ct,\\frac{c}{t}\\right),\\qquad e=\\sqrt2",
      },
      authoredExample: {
        prompt: "Find the eccentricity of the locus of \\(\\left(2t,\\frac{2}{t}\\right)\\).",
        steps: [
          "\\(xy=4\\): a rectangular hyperbola.",
        ],
        answer: "\\(\\sqrt2\\).",
      },
      selfCheckExample: {
        prompt: "The lines \\(\\frac{x}{a}-\\frac{y}{b}=t\\) and \\(\\frac{x}{a}+\\frac{y}{b}=\\frac1t\\) meet at \\(P\\). Find the locus of \\(P\\) as \\(t\\) varies.",
        steps: [
          "Multiply the two equations: \\(\\left(\\frac{x}{a}-\\frac{y}{b}\\right)\\left(\\frac{x}{a}+\\frac{y}{b}\\right)=1\\).",
        ],
        answer: "\\(\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1\\), a hyperbola.",
      },
      practiceSet: [
        { prompt: "\\(e\\) of \\(x^2-y^2=9\\)?", answer: "\\(\\sqrt2\\)" },
        { prompt: "Parametric point of \\(xy=9\\)?", answer: "\\(\\left(3t,\\frac3t\\right)\\)" },
        { prompt: "Asymptotes of \\(xy=c^2\\)?", answer: "The coordinate axes" },
        { prompt: "Foci of \\(x^2-y^2=8\\)?", answer: "\\((\\pm4,0)\\)" },
      ],
      pyqExampleId: "43f6a3a1-4043-4f60-97e0-2f56bf036721", // 2021 — intersection of two k-lines traces a conic; its eccentricity
      traps: [
        {
          title: "\\(xy=c^2\\) has its axes along \\(y=\\pm x\\)",
          body: "The vertices of \\(xy=c^2\\) are \\((c,c)\\) and \\((-c,-c)\\), not on the coordinate axes. Its transverse axis is the line \\(y=x\\).",
        },
      ],
    },
  ],
};
