import type { SubtopicNote } from "@/app/notes/_types";

export const ALGEBRA_CX_NOTE: SubtopicNote = {
  subtopicName: "Algebra of Complex Numbers",
  title: "Algebra of Complex Numbers",
  oneLineDefinition:
    "Working with z = x + iy directly: splitting a quotient into real and imaginary parts, solving equations in z and its conjugate, and using the rules for the modulus.",
  whyItMatters:
    "Twenty-eight PYQs, twenty-two of them multiple choice. Seven ask for a real or imaginary part, or when a quotient is purely real or purely imaginary; fourteen solve an equation in z and its conjugate; seven use the modulus rules or bound the size of z. Three ideas cover the page.",
  concepts: [
    // C1 — real and imaginary parts
    {
      kind: "formula" as const,
      slug: "jcx-parts",
      name: "Real and imaginary parts",
      intuition:
        "To split a quotient, multiply top and bottom by the conjugate of the denominator: the denominator becomes the real number \\(c^2+d^2\\). Two complex numbers are equal exactly when their real parts are equal and their imaginary parts are equal, so one complex equation gives two real ones. 'Purely real' sets the imaginary part to 0; 'purely imaginary' sets the real part to 0.",
      definition:
        "- \\(z=x+iy\\): \\(\\mathrm{Re}(z)=x\\), \\(\\mathrm{Im}(z)=y\\); conjugate \\(\\bar z=x-iy\\).\n" +
        "- \\(\\frac{a+ib}{c+id}=\\frac{(a+ib)(c-id)}{c^2+d^2}\\).\n" +
        "- \\(a+ib=c+id\\) exactly when \\(a=c\\) and \\(b=d\\).\n" +
        "- \\(i^2=-1\\), and \\(i^n\\) depends on \\(n\\) mod 4.",
      formula: {
        label: "Dividing complex numbers",
        latex: "\\frac{a+ib}{c+id}=\\frac{(ac+bd)+i(bc-ad)}{c^2+d^2}",
      },
      authoredExample: {
        prompt: "Find real \\(x\\) and \\(y\\) with \\((x+iy)(2-i)=3+4i\\).",
        steps: [
          "\\(x+iy=\\frac{3+4i}{2-i}=\\frac{(3+4i)(2+i)}{5}=\\frac{2+11i}{5}\\).",
        ],
        answer: "\\(x=\\frac25\\), \\(y=\\frac{11}5\\).",
      },
      selfCheckExample: {
        prompt: "For which real \\(a\\) is \\(\\frac{a+2i}{1-i}\\) purely imaginary?",
        steps: [
          "\\(\\frac{(a+2i)(1+i)}{2}=\\frac{(a-2)+i(a+2)}{2}\\). The real part is 0 when \\(a=2\\), and then the imaginary part is \\(2\\neq0\\).",
        ],
        answer: "\\(a=2\\).",
      },
      practiceSet: [
        { prompt: "\\(\\mathrm{Re}\\frac{1+i}{1-i}\\)?", answer: "\\(0\\)" },
        { prompt: "\\(\\mathrm{Im}\\frac{3+4i}{1+2i}\\)?", answer: "\\(-\\frac25\\)" },
        { prompt: "Real \\(x,y\\) with \\((x+2y)+i(x-y)=5+2i\\)?", answer: "\\(x=3,\\ y=1\\)" },
        { prompt: "\\(i^{2023}\\)?", answer: "\\(-i\\)" },
      ],
      pyqExampleId: "04e3445c-2b87-4651-8bc5-4ae8eacfc8c2", // 2024 — sum of theta for which a quotient is purely imaginary
      traps: [
        {
          title: "Count every angle in the interval",
          body: "A condition such as \\(\\cos^2\\theta=\\frac12\\) has several solutions in an interval like \\([-\\pi,2\\pi]\\). List them all before adding, and check that no denominator vanishes at any of them.",
        },
      ],
    },

    // C2 — equations in z and its conjugate
    {
      kind: "formula" as const,
      slug: "jcx-equations",
      name: "Equations in z and its conjugate",
      intuition:
        "Put \\(z=x+iy\\) and compare real and imaginary parts: two real equations in \\(x\\) and \\(y\\). Terms like \\(|z|\\) and \\(z\\bar z\\) are real, so they sit wholly in the real part — often the imaginary part alone fixes \\(y\\) at once. For an equation such as \\(z^2=k\\bar z\\), taking the modulus of both sides first gives \\(|z|\\) directly.",
      definition:
        "- \\(z\\bar z=|z|^2\\), \\(z+\\bar z=2\\,\\mathrm{Re}(z)\\), \\(z-\\bar z=2i\\,\\mathrm{Im}(z)\\).\n" +
        "- Equate real parts and imaginary parts.\n" +
        "- Taking moduli: \\(|z^2|=|z|^2\\), \\(|\\bar z|=|z|\\).\n" +
        "- Keep \\(z=0\\) if the equation allows it, and drop it if the question says non-zero.",
      formula: {
        label: "Conjugate identities",
        latex: "z\\bar z=|z|^2,\\quad z+\\bar z=2\\,\\mathrm{Re}(z),\\quad z-\\bar z=2i\\,\\mathrm{Im}(z)",
      },
      authoredExample: {
        prompt: "Solve \\(|z|+z=2+i\\).",
        steps: [
          "Imaginary parts: \\(y=1\\).",
          "Real parts: \\(\\sqrt{x^2+1}+x=2\\), so \\(x^2+1=(2-x)^2\\), giving \\(x=\\frac34\\).",
        ],
        answer: "\\(z=\\frac34+i\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(z+2\\bar z=6-3i\\).",
        steps: [
          "\\(z+2\\bar z=3x-iy\\), so \\(3x=6\\) and \\(-y=-3\\).",
        ],
        answer: "\\(z=2+3i\\).",
      },
      practiceSet: [
        { prompt: "\\(z+\\bar z=4\\) and \\(z\\bar z=13\\)?", answer: "\\(z=2\\pm3i\\)" },
        { prompt: "\\(|z|-z=1+2i\\)?", answer: "\\(z=\\frac32-2i\\)" },
        { prompt: "\\(\\bar z=-z\\) means \\(z\\) is?", answer: "Purely imaginary (or 0)" },
        { prompt: "All \\(z\\) with \\(z^2=|z|\\)?", answer: "\\(0,1,-1\\)" },
      ],
      pyqExampleId: "6e05f32c-439d-494f-a651-d665f364a57e", // 2026 — sum of |z|^2 over the roots of 4z^2 + conj(z) = 0
      traps: [
        {
          title: "Squaring can add a root",
          body: "In \\(\\sqrt{x^2+y^2}=x+k\\), squaring needs \\(x+k\\ge0\\). Check each answer in the original equation, since a modulus is never negative.",
        },
      ],
    },

    // C3 — modulus rules and bounds
    {
      kind: "formula" as const,
      slug: "jcx-modulus",
      name: "Modulus rules and bounds",
      intuition:
        "The modulus multiplies and divides: \\(|z_1z_2|=|z_1||z_2|\\). To handle a sum, expand \\(|a+b|^2=(a+b)(\\bar a+\\bar b)\\). The triangle inequality bounds a modulus from both sides, with equality when the two numbers point the same way (or opposite ways). When only \\(|z|\\) appears, call it \\(r\\) and solve a real equation or inequality in \\(r\\ge0\\).",
      definition:
        "- \\(|z_1z_2|=|z_1||z_2|\\), \\(\\left|\\frac{z_1}{z_2}\\right|=\\frac{|z_1|}{|z_2|}\\), \\(|\\bar z|=|z|\\).\n" +
        "- \\(|a\\pm b|^2=|a|^2+|b|^2\\pm2\\,\\mathrm{Re}(a\\bar b)\\).\n" +
        "- \\(|a+b|^2+|a-b|^2=2(|a|^2+|b|^2)\\).\n" +
        "- \\(\\big||a|-|b|\\big|\\le|a\\pm b|\\le|a|+|b|\\).",
      formula: {
        label: "Modulus of a sum",
        latex: "|a\\pm b|^2=|a|^2+|b|^2\\pm2\\,\\mathrm{Re}(a\\bar b)",
      },
      authoredExample: {
        prompt: "If \\(|z_1|=3\\), \\(|z_2|=4\\) and \\(|z_1+z_2|=5\\), find \\(|z_1-z_2|\\).",
        steps: [
          "\\(|z_1+z_2|^2+|z_1-z_2|^2=2(9+16)=50\\), so \\(|z_1-z_2|^2=25\\).",
        ],
        answer: "\\(5\\).",
      },
      selfCheckExample: {
        prompt: "For \\(|z|=2\\), find the greatest and least values of \\(|z+3-4i|\\).",
        steps: [
          "\\(|3-4i|=5\\), so \\(5-2\\le|z+(3-4i)|\\le5+2\\).",
        ],
        answer: "Greatest 7, least 3.",
      },
      practiceSet: [
        { prompt: "\\(|z|\\) if \\(|z|^2-5|z|+6=0\\)?", answer: "\\(2\\) or \\(3\\)" },
        { prompt: "\\(\\left|\\frac{3+4i}{1-i}\\right|\\)?", answer: "\\(\\frac{5}{\\sqrt2}\\)" },
        { prompt: "Greatest \\(|z_1+z_2|\\) if \\(|z_1|=2\\), \\(|z_2|=5\\)?", answer: "\\(7\\)" },
        { prompt: "\\(|1+z|^2+|1-z|^2\\) for \\(|z|=3\\)?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "055b5303-319d-4089-bb5c-16c47450a820", // 2022 — greatest |z| when |z - 1/z| = 2
      traps: [
        {
          title: "A bound must be reached",
          body: "The triangle inequality gives a bound, and it is the answer only if some \\(z\\) attains it. Check that the extreme case points the numbers the same way and still satisfies every condition.",
        },
      ],
    },
  ],
};
