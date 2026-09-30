import type { SubtopicNote } from "@/app/notes/_types";

export const POLAR_CX_NOTE: SubtopicNote = {
  subtopicName: "Polar Form, Argument and De Moivre",
  title: "Polar Form, Argument and De Moivre",
  oneLineDefinition:
    "Writing a complex number by its length and angle, so that products add angles, powers multiply them, and multiplying by a unit complex number rotates the plane.",
  whyItMatters:
    "Twenty-four PYQs, nineteen of them multiple choice. Eight find a modulus or a principal argument, eight raise a number to a high power, and eight use rotation to settle a triangle or a square. Each one is quicker in polar form than in x and y. Three ideas cover the page.",
  concepts: [
    // C1 — polar form and principal argument
    {
      kind: "formula" as const,
      slug: "jcx-arg",
      name: "Polar form and the principal argument",
      intuition:
        "Any \\(z\\neq0\\) is \\(r(\\cos\\theta+i\\sin\\theta)\\), written \\(re^{i\\theta}\\), with \\(r=|z|\\) and \\(\\theta=\\arg z\\). The principal argument lies in \\((-\\pi,\\pi]\\): find the reference angle \\(\\alpha=\\tan^{-1}\\left|\\frac yx\\right|\\), then place it by the quadrant of \\(z\\). Multiplying multiplies moduli and adds arguments, dividing subtracts them, and conjugating negates the argument.",
      definition:
        "- \\(z=re^{i\\theta}\\) with \\(r=|z|\\), \\(\\theta=\\arg z\\in(-\\pi,\\pi]\\).\n" +
        "- By quadrant: \\(\\alpha\\), \\(\\pi-\\alpha\\), \\(-\\pi+\\alpha\\), \\(-\\alpha\\).\n" +
        "- \\(\\arg(z_1z_2)=\\arg z_1+\\arg z_2\\) and \\(\\arg\\frac{z_1}{z_2}=\\arg z_1-\\arg z_2\\), up to a multiple of \\(2\\pi\\).\n" +
        "- \\(\\arg\\bar z=-\\arg z\\); for \\(|z|=1\\), \\(\\frac1z=\\bar z\\).",
      formula: {
        label: "Polar form",
        latex: "z=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta}",
      },
      authoredExample: {
        prompt: "Find the modulus and principal argument of \\(-1-\\sqrt3i\\).",
        steps: [
          "\\(r=2\\). The point is in the third quadrant with reference angle \\(\\frac\\pi3\\), so \\(\\theta=-\\pi+\\frac\\pi3\\).",
        ],
        answer: "\\(r=2\\), \\(\\theta=-\\frac{2\\pi}3\\).",
      },
      selfCheckExample: {
        prompt: "Find the principal argument of \\((-1+i)^2\\).",
        steps: [
          "\\((-1+i)^2=1-2i-1=-2i\\).",
        ],
        answer: "\\(-\\frac\\pi2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\arg(-2)\\)?", answer: "\\(\\pi\\)" },
        { prompt: "\\(\\arg\\bar z\\) if \\(\\arg z=\\frac\\pi3\\)?", answer: "\\(-\\frac\\pi3\\)" },
        { prompt: "\\(|\\cos\\theta+i\\sin\\theta|\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\arg(z_1z_2)\\) if \\(\\arg z_1=\\frac{3\\pi}4\\), \\(\\arg z_2=\\frac\\pi2\\)?", answer: "\\(-\\frac{3\\pi}4\\)" },
      ],
      pyqExampleId: "1501ecbd-65ff-4b85-9c10-4531cab7e7fd", // 2024 — modulus and amplitude of 2 - 2i tan(5pi/8)
      traps: [
        {
          title: "The inverse tangent is not the argument",
          body: "\\(\\tan^{-1}\\frac yx\\) lands in \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\). For a point with \\(x<0\\), add or subtract \\(\\pi\\) to reach the right quadrant.",
        },
      ],
    },

    // C2 — De Moivre
    {
      kind: "formula" as const,
      slug: "jcx-demoivre",
      name: "Powers by De Moivre's theorem",
      intuition:
        "Raising \\(re^{i\\theta}\\) to the power \\(n\\) raises the modulus to \\(r^n\\) and multiplies the angle by \\(n\\). So write the base in polar form, multiply the angle, then take away multiples of \\(2\\pi\\). A sum like \\(z^n+\\bar z^n\\) is \\(2\\,\\mathrm{Re}(z^n)=2r^n\\cos n\\theta\\), and \\(w^n\\) is real exactly when \\(n\\theta\\) is a multiple of \\(\\pi\\).",
      definition:
        "- \\((\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta+i\\sin n\\theta\\).\n" +
        "- \\(1+i=\\sqrt2e^{i\\pi/4}\\), \\(1+\\sqrt3i=2e^{i\\pi/3}\\), \\(\\sqrt3+i=2e^{i\\pi/6}\\).\n" +
        "- \\(z^n+\\bar z^n=2r^n\\cos n\\theta\\).\n" +
        "- \\(1+\\cos\\theta+i\\sin\\theta=2\\cos\\frac\\theta2\\,e^{i\\theta/2}\\).",
      formula: {
        label: "De Moivre's theorem",
        latex: "(re^{i\\theta})^n=r^ne^{in\\theta}",
      },
      authoredExample: {
        prompt: "Find \\((1+i)^{10}\\).",
        steps: [
          "\\((\\sqrt2)^{10}e^{i10\\pi/4}=32e^{i5\\pi/2}=32e^{i\\pi/2}\\).",
        ],
        answer: "\\(32i\\).",
      },
      selfCheckExample: {
        prompt: "Find the least natural \\(n\\) for which \\((1+\\sqrt3i)^n\\) is real.",
        steps: [
          "The angle is \\(\\frac{n\\pi}3\\), a multiple of \\(\\pi\\) first at \\(n=3\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\((-i)^7\\)?", answer: "\\(i\\)" },
        { prompt: "\\(\\left(\\cos\\frac\\pi9+i\\sin\\frac\\pi9\\right)^9\\)?", answer: "\\(-1\\)" },
        { prompt: "\\(|(1+i)^8|\\)?", answer: "\\(16\\)" },
        { prompt: "\\((\\sqrt3+i)^6\\)?", answer: "\\(-64\\)" },
      ],
      pyqExampleId: "ac491016-3f1c-40de-b292-078f9a72b577", // 2026 — (z^201 - i)^8 for z = sqrt(3)/2 + i/2
      traps: [
        {
          title: "Reduce the angle, and raise the modulus",
          body: "\\(\\frac{201\\pi}6\\) is not a principal argument: take away \\(32\\pi\\) first. And a base of modulus 2 raised to the 21st power carries a factor \\(2^{21}\\) that is easy to drop.",
        },
      ],
    },

    // C3 — rotation and triangles
    {
      kind: "formula" as const,
      slug: "jcx-rotation",
      name: "Rotation and triangles",
      intuition:
        "Multiplying by \\(e^{i\\alpha}\\) turns the plane about the origin through \\(\\alpha\\): \\(i\\) is a quarter turn anticlockwise, \\(-i\\) a quarter turn clockwise. To turn about a point \\(a\\), shift first: \\(w-a=(z-a)e^{i\\alpha}\\). In a triangle, \\(\\frac{z_3-z_1}{z_2-z_1}\\) has modulus equal to the ratio of the two sides at \\(z_1\\) and argument equal to the angle between them.",
      definition:
        "- About the origin: \\(w=ze^{i\\alpha}\\); a quarter turn is \\(iz\\).\n" +
        "- About \\(a\\): \\(w=a+(z-a)e^{i\\alpha}\\).\n" +
        "- \\(\\frac{z_3-z_1}{z_2-z_1}=\\frac{|z_3-z_1|}{|z_2-z_1|}e^{i\\theta}\\), \\(\\theta\\) the angle at \\(z_1\\).\n" +
        "- Area of the triangle \\(0,z_1,z_2\\): \\(\\frac12\\left|\\mathrm{Im}(\\bar z_1z_2)\\right|\\).",
      formula: {
        label: "Angle at a vertex",
        latex: "\\frac{z_3-z_1}{z_2-z_1}=\\frac{|z_3-z_1|}{|z_2-z_1|}\\,e^{i\\theta}",
      },
      authoredExample: {
        prompt: "A square has adjacent vertices \\(0\\) and \\(3+i\\), taken anticlockwise. Find the other two.",
        steps: [
          "A quarter turn of \\(3+i\\) about 0 gives \\(i(3+i)=-1+3i\\).",
          "The fourth vertex is \\((3+i)+(-1+3i)\\).",
        ],
        answer: "\\(-1+3i\\) and \\(2+4i\\).",
      },
      selfCheckExample: {
        prompt: "Find the area of the triangle with vertices \\(0\\), \\(2+i\\) and \\(1+3i\\).",
        steps: [
          "\\((2-i)(1+3i)=5+5i\\), whose imaginary part is 5.",
        ],
        answer: "\\(\\frac52\\).",
      },
      practiceSet: [
        { prompt: "\\(2+i\\) turned a quarter turn clockwise about 0?", answer: "\\(1-2i\\)" },
        { prompt: "\\(1\\) turned a quarter turn anticlockwise about \\(1+i\\)?", answer: "\\(2+i\\)" },
        { prompt: "Angle at 0 of the triangle \\(0,z,iz\\)?", answer: "\\(\\frac\\pi2\\)" },
        { prompt: "Third vertex of an equilateral triangle on \\(0,1\\), anticlockwise?", answer: "\\(e^{i\\pi/3}\\)" },
      ],
      pyqExampleId: "67778e85-3668-453d-8e97-fcdf1c89201f", // 2023 — argument of the difference of two rotated points
      traps: [
        {
          title: "Turn about the right point",
          body: "\\(ze^{i\\alpha}\\) turns about the origin only. For a turn about \\(a\\), subtract \\(a\\), rotate, then add \\(a\\) back; clockwise uses \\(e^{-i\\alpha}\\).",
        },
      ],
    },
  ],
};
