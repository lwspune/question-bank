import type { SubtopicNote } from "@/app/notes/_types";

export const MODULUS_ARGUMENT_NOTE: SubtopicNote = {
  subtopicName: "Modulus, Argument, and Conjugate",
  title: "Modulus, Argument & Conjugate",
  oneLineDefinition:
    "The core toolkit of a complex number: its conjugate, its modulus (distance from the origin), and its argument (angle on the Argand plane) — plus the conditions that make it purely real or purely imaginary.",
  whyItMatters:
    "This is the largest subtopic and the foundation for the rest. Modulus + conjugate properties and the principal-argument quadrant rule answer most questions directly, and the triangle inequality cracks the max/min ones.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cn-complex-fundamentals",
      name: "What a complex number is",
      intuition:
        "A complex number \\(z=a+ib\\) bundles a real part and an imaginary part, with \\(i^2=-1\\). Add and multiply like binomials, replacing \\(i^2\\) by \\(-1\\). Two complex numbers are equal only when both their real and imaginary parts match.",
      definition:
        "\\(z=a+ib\\), \\(a=\\operatorname{Re}(z)\\), \\(b=\\operatorname{Im}(z)\\), \\(i^2=-1\\). **Equality:** \\(a+ib=c+id\\iff a=c\\) and \\(b=d\\). **Arithmetic:** add/subtract componentwise; multiply as binomials (\\((a+ib)(c+id)=(ac-bd)+i(ad+bc)\\)). Divide by multiplying top and bottom by the denominator's conjugate.",
      formula: {
        label: "Fundamentals of a complex number",
        latex:
          "i^2=-1 \\qquad a+ib=c+id \\iff a=c,\\ b=d \\qquad (a+ib)(c+id)=(ac-bd)+i(ad+bc)",
      },
      authoredExample: {
        prompt: "Express \\((2+3i)(1-i)\\) in the form \\(a+ib\\).",
        steps: [
          "Expand: \\(2-2i+3i-3i^2\\).",
          "\\(i^2=-1\\): \\(2+i+3=5+i\\).",
        ],
        answer: "\\(5+i\\).",
      },
      selfCheckExample: {
        prompt: "If \\(z=x+iy\\) and \\(z=\\overline{z}\\), what can you say about \\(z\\)?",
        steps: [
          "\\(x+iy=x-iy\\Rightarrow 2iy=0\\Rightarrow y=0\\).",
          "So \\(z\\) is real.",
        ],
        answer: "\\(z\\) is purely real.",
      },
      practiceSet: [
        { prompt: "\\(i^2=\\)?", answer: "\\(-1\\)" },
        { prompt: "\\((a+ib)=(c+id)\\) requires?", answer: "\\(a=c\\) and \\(b=d\\)" },
        { prompt: "Divide complex numbers by multiplying by?", answer: "The denominator's conjugate" },
        { prompt: "\\(\\operatorname{Re}(3-5i)\\)?", answer: "\\(3\\)" },
      ],
    },

    {
      kind: "formula" as const,
      slug: "cn-conjugate-and-real-imaginary",
      name: "Conjugate; purely real / purely imaginary",
      intuition:
        "The conjugate \\(\\bar z\\) flips the sign of the imaginary part — a reflection across the real axis. It's the lever for 'purely real' (\\(z=\\bar z\\)) and 'purely imaginary' (\\(z=-\\bar z\\)) conditions, and \\(z\\bar z=|z|^2\\) turns a modulus into an algebra problem.",
      definition:
        "\\(\\overline{a+ib}=a-ib\\). Key facts:\n" +
        "- \\(z\\bar z=|z|^2=a^2+b^2\\); \\(z+\\bar z=2\\operatorname{Re}(z)\\); \\(z-\\bar z=2i\\operatorname{Im}(z)\\).\n" +
        "- **Purely real** \\(\\iff z=\\bar z\\) (imaginary part 0). **Purely imaginary** \\(\\iff z=-\\bar z\\) (real part 0).\n" +
        "- \\(\\overline{z_1z_2}=\\bar z_1\\bar z_2\\), \\(\\overline{z_1/z_2}=\\bar z_1/\\bar z_2\\). A real-coefficient equation has complex roots in **conjugate pairs**.",
      formula: {
        label: "Conjugate identities",
        latex:
          "\\overline{a+ib}=a-ib \\qquad z\\bar z=|z|^2 \\qquad \\operatorname{Re}(z)=\\dfrac{z+\\bar z}{2} \\qquad \\operatorname{Im}(z)=\\dfrac{z-\\bar z}{2i} \\qquad \\overline{z_1z_2}=\\bar z_1\\,\\bar z_2",
      },
      authoredExample: {
        prompt: "For what real \\(x\\) is \\(z=(x-2)+3i\\) purely imaginary?",
        steps: [
          "Purely imaginary ⇒ real part \\(=0\\): \\(x-2=0\\).",
          "\\(x=2\\).",
        ],
        answer: "\\(x=2\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\dfrac{z-1}{z+1}\\) is purely imaginary, what is \\(|z|\\)?",
        steps: [
          "Purely imaginary ⇒ real part 0. Writing \\(z=x+iy\\), the real part of \\(\\frac{z-1}{z+1}\\) is \\(\\frac{x^2+y^2-1}{(x+1)^2+y^2}\\).",
          "Set numerator \\(=0\\): \\(x^2+y^2=1\\), i.e. \\(|z|=1\\).",
        ],
        answer: "\\(|z|=1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\overline{a+ib}=\\)?", answer: "\\(a-ib\\)" },
        { prompt: "\\(z\\bar z=\\)?", answer: "\\(|z|^2\\)" },
        { prompt: "Purely imaginary condition?", answer: "\\(z=-\\bar z\\) (real part 0)" },
        { prompt: "Real-coefficient equation: complex roots come as?", answer: "Conjugate pairs" },
      ],
      pyqExampleId: "0cf5be92-2e68-4666-90a5-2d4109ec575d", // (z-1)/(z+1) purely imaginary
      traps: [
        {
          title: "**Purely imaginary** is the real-part-zero condition, not the imaginary-part-zero one",
          body:
            "A number is **purely imaginary** when \\(z=-\\bar z\\) (its **real** part is 0), and **purely real** when \\(z=\\bar z\\) (its **imaginary** part is 0). Students routinely swap these. For \\(z=(x-2)+3i\\) to be purely imaginary you set the **real** part \\(x-2=0\\), not the imaginary part.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "cn-modulus-properties",
      name: "Modulus and the triangle inequality",
      intuition:
        "The modulus \\(|z|\\) is the distance from the origin, so it multiplies and divides cleanly across products and quotients. For sums and differences it doesn't — there you reach for the triangle inequality, which is exactly what 'maximum/minimum of \\(|z\\pm c|\\)' questions want.",
      definition:
        "\\(|z|=\\sqrt{a^2+b^2}\\). Properties: \\(|z_1z_2|=|z_1||z_2|\\), \\(\\left|\\dfrac{z_1}{z_2}\\right|=\\dfrac{|z_1|}{|z_2|}\\), \\(|z^n|=|z|^n\\), \\(|\\bar z|=|z|\\). **Triangle inequality:** \\(\\big||z_1|-|z_2|\\big|\\le|z_1\\pm z_2|\\le|z_1|+|z_2|\\) — gives the max/min of \\(|z\\pm c|\\) on a disc \\(|z-a|\\le r\\).",
      formula: {
        label: "Modulus properties",
        latex:
          "|z|=\\sqrt{a^2+b^2} \\qquad |z_1z_2|=|z_1|\\,|z_2| \\qquad \\left|\\dfrac{z_1}{z_2}\\right|=\\dfrac{|z_1|}{|z_2|} \\qquad |z|^2=z\\bar z \\qquad |z_1+z_2|\\le|z_1|+|z_2|",
      },
      authoredExample: {
        prompt: "Find \\(|(3+4i)(1-2i)|\\).",
        steps: [
          "\\(|z_1z_2|=|z_1||z_2|=\\sqrt{9+16}\\cdot\\sqrt{1+4}=5\\cdot\\sqrt5\\).",
        ],
        answer: "\\(5\\sqrt5\\).",
      },
      selfCheckExample: {
        prompt: "If \\(|z+4|\\le 3\\), find the maximum of \\(|z+1|\\).",
        steps: [
          "\\(|z+1|=|(z+4)-3|\\le|z+4|+3\\le 3+3\\).",
        ],
        answer: "Maximum \\(=6\\).",
      },
      practiceSet: [
        { prompt: "\\(|z|=\\)?", answer: "\\(\\sqrt{a^2+b^2}\\)" },
        { prompt: "\\(|z_1 z_2|=\\)?", answer: "\\(|z_1||z_2|\\)" },
        { prompt: "Tool for max/min of \\(|z\\pm c|\\)?", answer: "Triangle inequality" },
        { prompt: "\\(|3+4i|\\)?", answer: "\\(5\\)" },
      ],
      pyqExampleId: "85cb2a07-6e8a-4c07-b3de-5707dfbd4266", // |12+5i|+|12-5i|
      traps: [
        {
          title: "\\(z\\bar z=|z|^2\\), **not** \\(|z|\\)",
          body:
            "The product \\(z\\bar z\\) equals the modulus **squared**: \\(z\\bar z=a^2+b^2=|z|^2\\). Forgetting the square (writing \\(z\\bar z=|z|\\)) is the single most common modulus slip. So for \\(z=3+4i\\), \\(z\\bar z=25\\), while \\(|z|=5\\).",
        },
        {
          title: "Modulus does **not** distribute over a sum",
          body:
            "\\(|z_1+z_2|\\ne|z_1|+|z_2|\\) in general — that's only an **inequality** (\\(|z_1+z_2|\\le|z_1|+|z_2|\\)), with equality only when \\(z_1,z_2\\) point the same way. Modulus DOES distribute over products and quotients: \\(|z_1z_2|=|z_1||z_2|\\). For maxima/minima of \\(|z\\pm c|\\), reach for the triangle inequality, never term-by-term addition.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "cn-argument-polar",
      name: "Argument and polar form",
      intuition:
        "Plot \\(z\\) on the Argand plane: its modulus is the distance from the origin, its argument the angle from the positive real axis. The catch is the **principal argument** — you must use the quadrant of \\((a,b)\\), not just \\(\\tan^{-1}(b/a)\\), to land it in \\((-\\pi,\\pi]\\).",
      definition:
        "**Polar form:** \\(z=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta}\\), \\(r=|z|\\), \\(\\theta=\\arg z\\). The **principal argument** lies in \\((-\\pi,\\pi]\\); compute \\(\\tan^{-1}\\big|\\tfrac{b}{a}\\big|\\) then adjust for the quadrant of \\((a,b)\\). Arguments add under multiplication: \\(\\arg(z_1z_2)=\\arg z_1+\\arg z_2\\), \\(\\arg(z_1/z_2)=\\arg z_1-\\arg z_2\\).",
      formula: {
        label: "Polar form and argument",
        latex:
          "z=r(\\cos\\theta+i\\sin\\theta)=re^{i\\theta} \\qquad \\arg(z_1z_2)=\\arg z_1+\\arg z_2 \\qquad \\arg\\!\\left(\\dfrac{z_1}{z_2}\\right)=\\arg z_1-\\arg z_2",
      },
      visualizationSlug: "cn-argand-plane",
      authoredExample: {
        prompt: "Find the modulus and principal argument of \\(z=1+i\\).",
        steps: [
          "\\(r=\\sqrt{1+1}=\\sqrt2\\); \\((1,1)\\) is in the first quadrant.",
          "\\(\\theta=\\tan^{-1}(1/1)=\\tfrac\\pi4\\).",
        ],
        answer: "\\(|z|=\\sqrt2\\), \\(\\arg z=\\tfrac\\pi4\\).",
      },
      selfCheckExample: {
        prompt: "What is the principal argument of \\(-1+i\\)?",
        steps: [
          "\\((-1,1)\\) is in the second quadrant; reference angle \\(\\tan^{-1}(1/1)=\\tfrac\\pi4\\).",
          "Second quadrant: \\(\\theta=\\pi-\\tfrac\\pi4=\\tfrac{3\\pi}4\\).",
        ],
        answer: "\\(\\tfrac{3\\pi}4\\).",
      },
      practiceSet: [
        { prompt: "Polar form of \\(z\\)?", answer: "\\(r(\\cos\\theta+i\\sin\\theta)\\)" },
        { prompt: "Principal argument range?", answer: "\\((-\\pi,\\pi]\\)" },
        { prompt: "\\(\\arg(z_1 z_2)=\\)?", answer: "\\(\\arg z_1+\\arg z_2\\)" },
        { prompt: "Principal arg of \\(1+i\\)?", answer: "\\(\\tfrac\\pi4\\)" },
      ],
      pyqExampleId: "f1db1a64-6269-425d-b811-5f3629d04070", // modulus and principal argument
      traps: [
        {
          title: "The principal argument depends on the **quadrant**, not just \\(\\tan^{-1}(b/a)\\)",
          body:
            "\\(\\tan^{-1}(b/a)\\) alone can't tell apart \\(a+ib\\) from \\(-a-ib\\) (same ratio, opposite quadrants). Find the reference angle \\(\\tan^{-1}\\big|\\tfrac{b}{a}\\big|\\), then place it by the signs of \\((a,b)\\) so the result lands in \\((-\\pi,\\pi]\\). For \\(-1+i\\) (2nd quadrant) the argument is \\(\\tfrac{3\\pi}4\\), **not** \\(\\tan^{-1}(-1)=-\\tfrac\\pi4\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Powers & Roots", href: "/notes/nda-maths/complex-numbers/cn-powers-roots" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
