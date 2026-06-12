/**
 * NDA Maths · Logarithms · FORMULA-recall MCQs.
 * One entry per `formula.latex` PIECE authored into the notes _data (pieces are
 * \quad/\qquad-joined, so the key index = position in that concept's bundle,
 * 0-based, after trailing-comma strip). Distractors are full-equation
 * permutations — wrong versions of the SAME log law, same shape (no length tell).
 * The notes already carried all 15 genuine log-law pieces (no enrichment needed);
 * every piece here is a real recallable identity, not a derivation step.
 *   npm run quiz:verify nda-maths__logarithms-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── log-foundations: defining equivalence | product+power laws ──
  {
    atomKey: "log-foundations:formula:0",
    stem: "Which is the defining equivalence of \\(\\log_a N = x\\)?",
    distractors: [f("\\log_a N = x \\iff x^a = N"), f("\\log_a N = x \\iff N^x = a"), f("\\log_a N = x \\iff a^N = x")],
    theme: "formula",
  },
  {
    atomKey: "log-foundations:formula:1",
    stem: "Which correctly states the product and power laws of logarithms?",
    distractors: [
      f("\\log_a(M+N)=\\log_a M+\\log_a N,\\ \\ \\log_a M^k = k\\log_a M"),
      f("\\log_a(MN)=\\log_a M\\cdot\\log_a N,\\ \\ \\log_a M^k = (\\log_a M)^k"),
      f("\\log_a(MN)=\\log_a M+\\log_a N,\\ \\ \\log_a M^k = \\log_a(kM)"),
    ],
    theme: "formula",
  },

  // ── log-laws-evaluate-combine: pull exponents of a product ──
  {
    atomKey: "log-laws-evaluate-combine:formula:0",
    stem: "What is \\(\\log_a(b^m \\cdot c^n)\\) in expanded form?",
    distractors: [
      f("\\log_a(b^m \\cdot c^n) = m\\log_a b \\cdot n\\log_a c"),
      f("\\log_a(b^m \\cdot c^n) = (m+n)\\log_a(bc)"),
      f("\\log_a(b^m \\cdot c^n) = \\log_a b^m + \\log_a c^n - \\log_a a"),
    ],
    theme: "formula",
  },

  // ── log-change-of-base: change of base | reciprocal identity ──
  {
    atomKey: "log-change-of-base:formula:0",
    stem: "Which is the change-of-base formula for \\(\\log_b a\\)?",
    distractors: [
      f("\\log_b a = \\dfrac{\\log b}{\\log a}"),
      f("\\log_b a = \\log a - \\log b"),
      f("\\log_b a = \\dfrac{\\log a}{\\log b}\\cdot\\log b"),
    ],
    theme: "formula",
  },
  {
    atomKey: "log-change-of-base:formula:1",
    stem: "Which is the reciprocal identity for \\(\\dfrac{1}{\\log_a b}\\)?",
    distractors: [
      f("\\dfrac{1}{\\log_a b} = \\log_a\\dfrac{1}{b}"),
      f("\\dfrac{1}{\\log_a b} = -\\log_a b"),
      f("\\dfrac{1}{\\log_a b} = \\log_b\\dfrac{1}{a}"),
    ],
    theme: "formula",
  },

  // ── log-sign-and-bounds: sign of a log (base > 1) ──
  {
    atomKey: "log-sign-and-bounds:formula:0",
    stem: "For base \\(a>1\\), how does the sign of \\(\\log_a N\\) depend on \\(N\\)?",
    distractors: [
      f("\\log_a N \\;\\begin{cases}>0 & 0<N<1\\\\ =0 & N=1\\\\ <0 & N>1\\end{cases}"),
      f("\\log_a N \\;\\begin{cases}>0 & N>0\\\\ =0 & N=1\\\\ <0 & N<0\\end{cases}"),
      f("\\log_a N \\;\\begin{cases}>0 & N>1\\\\ =0 & N=0\\\\ <0 & 0<N<1\\end{cases}"),
    ],
    theme: "formula",
  },

  // ── log-in-sequences: AP condition | GP condition ──
  {
    atomKey: "log-in-sequences:formula:0",
    stem: "What is the condition for three terms \\(p, q, r\\) to be in AP?",
    distractors: [f("\\text{AP}: q^2 = p+r"), f("\\text{AP}: 2q = pr"), f("\\text{AP}: q = p+r")],
    theme: "formula",
  },
  {
    atomKey: "log-in-sequences:formula:1",
    stem: "What is the condition for three terms \\(p, q, r\\) to be in GP?",
    distractors: [f("\\text{GP}: 2q = pr"), f("\\text{GP}: q^2 = p+r"), f("\\text{GP}: q = \\sqrt{p+r}")],
    theme: "formula",
  },

  // ── log-solve-exponential: bring the exponent down ──
  {
    atomKey: "log-solve-exponential:formula:0",
    stem: "Solving \\(a^x = b\\), which gives \\(x\\)?",
    distractors: [
      f("a^x = b \\;\\Rightarrow\\; x = \\dfrac{\\log a}{\\log b}"),
      f("a^x = b \\;\\Rightarrow\\; x = \\log a \\cdot \\log b"),
      f("a^x = b \\;\\Rightarrow\\; x = \\log b - \\log a"),
    ],
    theme: "formula",
  },

  // ── log-substitute-to-quadratic: t = a^x > 0 | quadratic → x = log_a t ──
  {
    atomKey: "log-substitute-to-quadratic:formula:0",
    stem: "In the substitution for an exponential equation, what constraint does \\(t = a^x\\) carry?",
    distractors: [f("t = a^x \\ge 0"), f("t = a^x < 0"), f("t = a^x \\in \\mathbb{R}")],
    theme: "formula",
  },
  {
    atomKey: "log-substitute-to-quadratic:formula:1",
    stem: "After \\(t^2 + bt + c = 0\\) with \\(t = a^x\\), how is \\(x\\) recovered?",
    distractors: [
      f("t^2 + bt + c = 0 \\;\\Rightarrow\\; x = \\log_t a"),
      f("t^2 + bt + c = 0 \\;\\Rightarrow\\; x = a^t"),
      f("t^2 + bt + c = 0 \\;\\Rightarrow\\; x = t^a"),
    ],
    theme: "formula",
  },

  // ── log-domain-and-count: drop the log, then impose domain ──
  {
    atomKey: "log-domain-and-count:formula:0",
    stem: "From \\(\\log_a M = \\log_a N\\), what may you conclude and what must you check?",
    distractors: [
      f("\\log_a M = \\log_a N \\Rightarrow M = N,\\ \\text{no domain check needed}"),
      f("\\log_a M = \\log_a N \\Rightarrow M = -N,\\ \\text{then require } M,N > 0"),
      f("\\log_a M = \\log_a N \\Rightarrow M = N,\\ \\text{then require } M,N < 0"),
    ],
    theme: "formula",
  },

  // ── log-advanced-conditions: chain rule | AM-GM floor ──
  {
    atomKey: "log-advanced-conditions:formula:0",
    stem: "Which is the chain rule that collapses \\(\\log_x a\\cdot\\log_b x\\)?",
    distractors: [
      f("\\log_x a\\cdot\\log_b x = \\log_a b"),
      f("\\log_x a\\cdot\\log_b x = \\log_b a\\cdot\\log_x b"),
      f("\\log_x a\\cdot\\log_b x = \\log_{ab} x"),
    ],
    theme: "formula",
  },
  {
    atomKey: "log-advanced-conditions:formula:1",
    stem: "What is the AM-GM lower bound for \\(t + \\tfrac{1}{t}\\) with \\(t>0\\)?",
    distractors: [
      f("t + \\tfrac{1}{t} \\le 2\\ (t>0)"),
      f("t + \\tfrac{1}{t} \\ge 1\\ (t>0)"),
      f("t + \\tfrac{1}{t} = 2\\ (t>0)"),
    ],
    theme: "formula",
  },

  // ── log-trailing-zeros: Legendre count of 5s ──
  {
    atomKey: "log-trailing-zeros:formula:0",
    stem: "Which gives the number of trailing zeros of \\(n!\\) (Legendre, prime 5)?",
    distractors: [
      f("Z(n) = \\sum_{i\\ge 1}\\left\\lfloor \\dfrac{n}{2^i} \\right\\rfloor"),
      f("Z(n) = \\left\\lfloor \\dfrac{n}{5} \\right\\rfloor"),
      f("Z(n) = \\sum_{i\\ge 1} \\dfrac{n}{5^i}"),
    ],
    theme: "formula",
  },
];
