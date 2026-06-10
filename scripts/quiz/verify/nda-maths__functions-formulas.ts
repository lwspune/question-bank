/**
 * NDA Maths · Functions · per-FORMULA recall MCQs (bundle-split pass).
 * Each formula piece gets a specific stem + 3 TEMPTING PERMUTATION distractors —
 * wrong versions of the SAME formula, in the SAME full-equation format as the
 * answer (no length/format tell). The `correct` is the harvested formula.latex
 * piece itself (not overridden). Run:
 *   npm run quiz:verify nda-maths__functions-formulas
 *
 * formula.latex was enriched 2026-06-10 so every recallable Functions formula
 * harvests as an atom (was only 3 concepts). Covers: composition + its inverse,
 * the linear-inverse rule, the commuting-linear condition, the four counting
 * formulas (functions/injections/bijections/relations), even/odd tests, the
 * three period rules, and the three signature functional-equation solutions.
 * No piece is a bare condition/annotation — all 16 are genuine formulas.
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── Composition and its inverse (funcs-composition) ──
  {
    atomKey: "funcs-composition:formula:0",
    stem: "Which is the correct definition of the composition \\((f\\circ g)(x)\\)?",
    distractors: [
      f("(f\\circ g)(x)=g(f(x))"),
      f("(f\\circ g)(x)=f(x)\\,g(x)"),
      f("(f\\circ g)(x)=f(x)+g(x)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-composition:formula:1",
    stem: "Which is the correct inverse of a composition?",
    distractors: [
      f("(f\\circ g)^{-1}=f^{-1}\\circ g^{-1}"),
      f("(f\\circ g)^{-1}=g\\circ f"),
      f("(f\\circ g)^{-1}=\\dfrac{1}{f\\circ g}"),
    ],
    theme: "formula",
  },

  // ── Inverse of a linear function (funcs-inverse) ──
  {
    atomKey: "funcs-inverse:formula:0",
    stem: "Which is the inverse of the linear function \\(f(x)=ax+b\\)?",
    distractors: [
      f("f(x)=ax+b\\ (a\\neq0)\\ \\Rightarrow\\ f^{-1}(x)=\\dfrac{x+b}{a}"),
      f("f(x)=ax+b\\ (a\\neq0)\\ \\Rightarrow\\ f^{-1}(x)=\\dfrac{1}{ax+b}"),
      f("f(x)=ax+b\\ (a\\neq0)\\ \\Rightarrow\\ f^{-1}(x)=a x-b"),
    ],
    theme: "formula",
  },

  // ── Commuting condition for linear f, g (funcs-commuting-linear) ──
  {
    atomKey: "funcs-commuting-linear:formula:0",
    stem: "For \\(f=ax+b\\) and \\(g=cx+d\\), which condition makes \\(f\\circ g=g\\circ f\\)?",
    distractors: [
      f("f\\circ g=g\\circ f\\iff b(a-1)=d(c-1)\\ \\ [f=ax+b,\\ g=cx+d]"),
      f("f\\circ g=g\\circ f\\iff b(c-1)=d(a+1)\\ \\ [f=ax+b,\\ g=cx+d]"),
      f("f\\circ g=g\\circ f\\iff a(d-1)=c(b-1)\\ \\ [f=ax+b,\\ g=cx+d]"),
    ],
    theme: "formula",
  },

  // ── Counting functions A → B (funcs-counting-functions) ──
  {
    atomKey: "funcs-counting-functions:formula:0",
    stem: "If \\(|A|=m,\\ |B|=n\\), which counts ALL functions \\(A\\to B\\)?",
    distractors: [
      f("\\text{functions }A\\to B=m^{n}"),
      f("\\text{functions }A\\to B=n\\cdot m"),
      f("\\text{functions }A\\to B=2^{mn}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-counting-functions:formula:1",
    stem: "If \\(|A|=m,\\ |B|=n\\ (n\\ge m)\\), which counts the one-one (injective) functions \\(A\\to B\\)?",
    distractors: [
      f("\\text{injections}={}^{n}P_{m}=\\dfrac{n!}{m!}"),
      f("\\text{injections}={}^{n}C_{m}=\\dfrac{n!}{m!\\,(n-m)!}"),
      f("\\text{injections}={}^{m}P_{n}=\\dfrac{m!}{(m-n)!}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-counting-functions:formula:2",
    stem: "If \\(|A|=|B|=n\\), which counts the bijections \\(A\\to B\\)?",
    distractors: [
      f("\\text{bijections }(m=n)=n^{n}"),
      f("\\text{bijections }(m=n)=2^{n}"),
      f("\\text{bijections }(m=n)=\\dfrac{n!}{2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-counting-functions:formula:3",
    stem: "If \\(|A|=m,\\ |B|=n\\), which counts the relations from \\(A\\) to \\(B\\)?",
    distractors: [
      f("\\text{relations}=2^{m+n}"),
      f("\\text{relations}=n^{m}"),
      f("\\text{relations}=m\\cdot n"),
    ],
    theme: "formula",
  },

  // ── Even / odd tests (funcs-even-and-odd) ──
  {
    atomKey: "funcs-even-and-odd:formula:0",
    stem: "Which is the defining test for an EVEN function?",
    distractors: [
      f("f\\text{ even}\\iff f(-x)=-f(x)"),
      f("f\\text{ even}\\iff f(x)=-f(x)"),
      f("f\\text{ even}\\iff f(-x)=\\dfrac{1}{f(x)}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-even-and-odd:formula:1",
    stem: "Which is the defining test for an ODD function?",
    distractors: [
      f("f\\text{ odd}\\iff f(-x)=f(x)"),
      f("f\\text{ odd}\\iff f(-x)+f(x)=1"),
      f("f\\text{ odd}\\iff f(x)=-x\\,f(-x)"),
    ],
    theme: "formula",
  },

  // ── Period after scaling the argument (funcs-periodicity) ──
  {
    atomKey: "funcs-periodicity:formula:0",
    stem: "What is the period of \\(\\sin(kx)\\)?",
    distractors: [
      f("\\text{period of }\\sin(kx)=\\dfrac{\\pi}{|k|}"),
      f("\\text{period of }\\sin(kx)=2\\pi|k|"),
      f("\\text{period of }\\sin(kx)=\\dfrac{2\\pi}{k^{2}}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-periodicity:formula:1",
    stem: "What is the period of \\(\\tan(kx)\\)?",
    distractors: [
      f("\\text{period of }\\tan(kx)=\\dfrac{2\\pi}{|k|}"),
      f("\\text{period of }\\tan(kx)=\\pi|k|"),
      f("\\text{period of }\\tan(kx)=\\dfrac{\\pi}{k^{2}}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-periodicity:formula:2",
    stem: "If \\(f\\) has period \\(T\\), what is the period of \\(f(ax+b)\\)?",
    distractors: [
      f("\\text{period of }f(ax+b)=\\dfrac{T}{|b|}"),
      f("\\text{period of }f(ax+b)=|a|\\,T"),
      f("\\text{period of }f(ax+b)=\\dfrac{T}{|a|}+b"),
    ],
    theme: "formula",
  },

  // ── Signature functional-equation solutions (funcs-fe-multiplicative-additive) ──
  {
    atomKey: "funcs-fe-multiplicative-additive:formula:0",
    stem: "If \\(f(xy)=f(x)f(y)\\) for all \\(x,y\\), what is the signature form of \\(f\\)?",
    distractors: [
      f("f(xy)=f(x)f(y)\\Rightarrow f(x)=a^{x}"),
      f("f(xy)=f(x)f(y)\\Rightarrow f(x)=kx"),
      f("f(xy)=f(x)f(y)\\Rightarrow f(x)=\\log_a x"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-fe-multiplicative-additive:formula:1",
    stem: "If \\(f(x+y)=f(x)f(y)\\) for all \\(x,y\\), what is the signature form of \\(f\\)?",
    distractors: [
      f("f(x+y)=f(x)f(y)\\Rightarrow f(x)=x^{k}"),
      f("f(x+y)=f(x)f(y)\\Rightarrow f(x)=cx"),
      f("f(x+y)=f(x)f(y)\\Rightarrow f(x)=\\log_a x"),
    ],
    theme: "formula",
  },
  {
    atomKey: "funcs-fe-multiplicative-additive:formula:2",
    stem: "If \\(f(x+y)=f(x)+f(y)\\) for all \\(x,y\\) (Cauchy), what is the signature form of \\(f\\)?",
    distractors: [
      f("f(x+y)=f(x)+f(y)\\Rightarrow f(x)=a^{x}"),
      f("f(x+y)=f(x)+f(y)\\Rightarrow f(x)=x^{k}"),
      f("f(x+y)=f(x)+f(y)\\Rightarrow f(x)=x+c"),
    ],
    theme: "formula",
  },
];
