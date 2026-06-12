/**
 * NDA Maths · Complex Numbers · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (pieces are
 * \qquad-joined, so the key index = position in that concept's bundle, 0-based).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell). Techniques (cn-cube-roots-
 * applications) carry no formula.latex → no entries here.
 *   npm run quiz:verify nda-maths__complex-numbers-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── cn-complex-fundamentals: i²=-1 | equality | multiplication ──
  {
    atomKey: "cn-complex-fundamentals:formula:0",
    stem: "What is the defining property of the imaginary unit \\(i\\)?",
    distractors: [f("i^2=1"), f("i^2=i"), f("i^2=-i")],
    theme: "formula",
  },
  {
    atomKey: "cn-complex-fundamentals:formula:1",
    stem: "Which is the correct EQUALITY condition for complex numbers?",
    distractors: [
      f("a+ib=c+id \\iff a=d,\\ b=c"),
      f("a+ib=c+id \\iff a+b=c+d"),
      f("a+ib=c+id \\iff ac=bd"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-complex-fundamentals:formula:2",
    stem: "Which is the correct product \\((a+ib)(c+id)\\)?",
    distractors: [
      f("(ac+bd)+i(ad-bc)"),
      f("(ac-bd)+i(ad-bc)"),
      f("(ac+bd)+i(ad+bc)"),
    ],
    theme: "formula",
  },

  // ── cn-conjugate-and-real-imaginary: conj | zz̄ | Re | Im | conj-of-product ──
  {
    atomKey: "cn-conjugate-and-real-imaginary:formula:0",
    stem: "What is the conjugate \\(\\overline{a+ib}\\)?",
    distractors: [f("\\overline{a+ib}=-a+ib"), f("\\overline{a+ib}=-a-ib"), f("\\overline{a+ib}=b-ia")],
    theme: "formula",
  },
  {
    atomKey: "cn-conjugate-and-real-imaginary:formula:1",
    stem: "What does \\(z\\bar z\\) equal?",
    distractors: [f("z\\bar z=|z|"), f("z\\bar z=z^2"), f("z\\bar z=2\\operatorname{Re}(z)")],
    theme: "formula",
  },
  {
    atomKey: "cn-conjugate-and-real-imaginary:formula:2",
    stem: "Which expresses \\(\\operatorname{Re}(z)\\) via \\(z\\) and \\(\\bar z\\)?",
    distractors: [
      f("\\operatorname{Re}(z)=\\dfrac{z-\\bar z}{2}"),
      f("\\operatorname{Re}(z)=\\dfrac{z+\\bar z}{2i}"),
      f("\\operatorname{Re}(z)=z+\\bar z"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-conjugate-and-real-imaginary:formula:3",
    stem: "Which expresses \\(\\operatorname{Im}(z)\\) via \\(z\\) and \\(\\bar z\\)?",
    distractors: [
      f("\\operatorname{Im}(z)=\\dfrac{z+\\bar z}{2i}"),
      f("\\operatorname{Im}(z)=\\dfrac{z-\\bar z}{2}"),
      f("\\operatorname{Im}(z)=\\dfrac{\\bar z-z}{2i}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-conjugate-and-real-imaginary:formula:4",
    stem: "What is the conjugate of a product, \\(\\overline{z_1z_2}\\)?",
    distractors: [
      f("\\overline{z_1z_2}=\\bar z_1+\\bar z_2"),
      f("\\overline{z_1z_2}=z_1\\bar z_2"),
      f("\\overline{z_1z_2}=\\overline{z_1}\\cdot z_2"),
    ],
    theme: "formula",
  },

  // ── cn-modulus-properties: |z|=√ | |z₁z₂| | |z₁/z₂| | |z|²=zz̄ | triangle ──
  {
    atomKey: "cn-modulus-properties:formula:0",
    stem: "For \\(z=a+ib\\), what is \\(|z|\\)?",
    distractors: [f("|z|=a^2+b^2"), f("|z|=a+b"), f("|z|=\\sqrt{a^2-b^2}")],
    theme: "formula",
  },
  {
    atomKey: "cn-modulus-properties:formula:1",
    stem: "What is \\(|z_1z_2|\\)?",
    distractors: [f("|z_1z_2|=|z_1|+|z_2|"), f("|z_1z_2|=|z_1+z_2|"), f("|z_1z_2|=|z_1|-|z_2|")],
    theme: "formula",
  },
  {
    atomKey: "cn-modulus-properties:formula:2",
    stem: "What is \\(\\left|\\dfrac{z_1}{z_2}\\right|\\)?",
    distractors: [
      f("\\left|\\dfrac{z_1}{z_2}\\right|=\\dfrac{|z_2|}{|z_1|}"),
      f("\\left|\\dfrac{z_1}{z_2}\\right|=|z_1|-|z_2|"),
      f("\\left|\\dfrac{z_1}{z_2}\\right|=\\dfrac{|z_1|}{|z_2|^2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-modulus-properties:formula:3",
    stem: "Which relates \\(|z|^2\\) to the conjugate?",
    distractors: [f("|z|^2=z+\\bar z"), f("|z|^2=z^2"), f("|z|^2=\\dfrac{z}{\\bar z}")],
    theme: "formula",
  },
  {
    atomKey: "cn-modulus-properties:formula:4",
    stem: "Which is the triangle inequality for moduli?",
    distractors: [
      f("|z_1+z_2|\\ge|z_1|+|z_2|"),
      f("|z_1+z_2|=|z_1|+|z_2|"),
      f("|z_1+z_2|\\le|z_1|\\,|z_2|"),
    ],
    theme: "formula",
  },

  // ── cn-argument-polar: polar | arg product | arg quotient ──
  {
    atomKey: "cn-argument-polar:formula:0",
    stem: "Which is the polar form of \\(z\\)?",
    distractors: [
      f("z=r(\\cos\\theta-i\\sin\\theta)"),
      f("z=r(\\sin\\theta+i\\cos\\theta)"),
      f("z=r^2(\\cos\\theta+i\\sin\\theta)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-argument-polar:formula:1",
    stem: "What is \\(\\arg(z_1z_2)\\)?",
    distractors: [
      f("\\arg(z_1z_2)=\\arg z_1-\\arg z_2"),
      f("\\arg(z_1z_2)=\\arg z_1\\cdot\\arg z_2"),
      f("\\arg(z_1z_2)=\\dfrac{\\arg z_1+\\arg z_2}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-argument-polar:formula:2",
    stem: "What is \\(\\arg\\!\\left(\\dfrac{z_1}{z_2}\\right)\\)?",
    distractors: [
      f("\\arg\\!\\left(\\dfrac{z_1}{z_2}\\right)=\\arg z_1+\\arg z_2"),
      f("\\arg\\!\\left(\\dfrac{z_1}{z_2}\\right)=\\arg z_2-\\arg z_1"),
      f("\\arg\\!\\left(\\dfrac{z_1}{z_2}\\right)=\\dfrac{\\arg z_1}{\\arg z_2}"),
    ],
    theme: "formula",
  },

  // ── cn-powers-of-i: i²=-1 | i³=-i | i⁴=1 | i^{4k+r}=i^r | block sum ──
  {
    atomKey: "cn-powers-of-i:formula:0",
    stem: "What is \\(i^2\\)?",
    distractors: [f("i^2=1"), f("i^2=i"), f("i^2=-i")],
    theme: "formula",
  },
  {
    atomKey: "cn-powers-of-i:formula:1",
    stem: "What is \\(i^3\\)?",
    distractors: [f("i^3=i"), f("i^3=1"), f("i^3=-1")],
    theme: "formula",
  },
  {
    atomKey: "cn-powers-of-i:formula:2",
    stem: "What is \\(i^4\\)?",
    distractors: [f("i^4=-1"), f("i^4=i"), f("i^4=-i")],
    theme: "formula",
  },
  {
    atomKey: "cn-powers-of-i:formula:3",
    stem: "Which correctly reduces \\(i^{4k+r}\\)?",
    distractors: [f("i^{4k+r}=i^{4k}"), f("i^{4k+r}=i^{r-1}"), f("i^{4k+r}=r\\,i")],
    theme: "formula",
  },
  {
    atomKey: "cn-powers-of-i:formula:4",
    stem: "What is the sum of four consecutive powers \\(i^k+i^{k+1}+i^{k+2}+i^{k+3}\\)?",
    distractors: [
      f("i^k+i^{k+1}+i^{k+2}+i^{k+3}=1"),
      f("i^k+i^{k+1}+i^{k+2}+i^{k+3}=4i^k"),
      f("i^k+i^{k+1}+i^{k+2}+i^{k+3}=-1"),
    ],
    theme: "formula",
  },

  // ── cn-de-moivre-and-roots: De Moivre | zⁿ=rⁿe^{inθ} | nth roots ──
  {
    atomKey: "cn-de-moivre-and-roots:formula:0",
    stem: "Which is De Moivre's theorem for \\((\\cos\\theta+i\\sin\\theta)^n\\)?",
    distractors: [
      f("(\\cos\\theta+i\\sin\\theta)^n=\\cos n\\theta-i\\sin n\\theta"),
      f("(\\cos\\theta+i\\sin\\theta)^n=\\cos\\theta^n+i\\sin\\theta^n"),
      f("(\\cos\\theta+i\\sin\\theta)^n=n(\\cos\\theta+i\\sin\\theta)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "cn-de-moivre-and-roots:formula:1",
    stem: "For \\(z=re^{i\\theta}\\), what is \\(z^n\\)?",
    distractors: [f("z^n=r\\,e^{in\\theta}"), f("z^n=r^n e^{i\\theta}"), f("z^n=nr\\,e^{i\\theta}")],
    theme: "formula",
  },
  {
    atomKey: "cn-de-moivre-and-roots:formula:2",
    stem: "Which gives the nth roots of \\(z=re^{i\\theta}\\), for \\(k=0,\\ldots,n-1\\)?",
    distractors: [
      f("z^{1/n}=r^{1/n}e^{i\\theta/n}"),
      f("z^{1/n}=r^{n}e^{i(\\theta+2k\\pi)/n}"),
      f("z^{1/n}=r^{1/n}e^{i(\\theta+k\\pi)/n}"),
    ],
    theme: "formula",
  },

  // ── cn-cube-roots-properties: ω³=1 | 1+ω+ω²=0 | ω̄=ω² | ωⁿ=ω^{n mod 3} ──
  {
    atomKey: "cn-cube-roots-properties:formula:0",
    stem: "For a non-real cube root of unity \\(\\omega\\), what is \\(\\omega^3\\)?",
    distractors: [f("\\omega^3=\\omega"), f("\\omega^3=-1"), f("\\omega^3=0")],
    theme: "formula",
  },
  {
    atomKey: "cn-cube-roots-properties:formula:1",
    stem: "What is \\(1+\\omega+\\omega^2\\)?",
    distractors: [f("1+\\omega+\\omega^2=1"), f("1+\\omega+\\omega^2=3"), f("1+\\omega+\\omega^2=\\omega")],
    theme: "formula",
  },
  {
    atomKey: "cn-cube-roots-properties:formula:2",
    stem: "Which other quantity equals the conjugate \\(\\bar\\omega\\)?",
    distractors: [f("\\bar\\omega=\\omega"), f("\\bar\\omega=-\\omega"), f("\\bar\\omega=1")],
    theme: "formula",
  },
  {
    atomKey: "cn-cube-roots-properties:formula:3",
    stem: "How does \\(\\omega^n\\) reduce?",
    distractors: [f("\\omega^n=\\omega^{\\,n\\bmod 4}"), f("\\omega^n=\\omega^{\\,n\\bmod 6}"), f("\\omega^n=n\\,\\omega")],
    theme: "formula",
  },
];
