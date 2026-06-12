/**
 * NDA Maths · Definite Integration · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (pieces are
 * \qquad-joined, so the key index = position in that concept's bundle, 0-based).
 * Distractors are full-equation permutations — wrong versions of the SAME
 * identity, same shape (no length/format tell).
 *
 * TRIAGE — concepts WITH genuine recallable definite-integral identities are
 * enriched + listed here; technique-only concepts carry NO formula.latex and have
 * no entries:
 *   SKIPPED (technique / criterion, not a recallable equation):
 *     direct-evaluation        — "simplify then apply FTC" is a method
 *     integrating-absolute-value — "split at the zeros" is a method
 *     integral-function-conditions — "match #equations to #unknowns" is a criterion
 *
 *   npm run quiz:verify nda-maths__definite-integration-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── fundamental-theorem: FTC | ∫f'=f(b)-f(a) | ∫f'/f=ln|f| ──
  {
    atomKey: "fundamental-theorem:formula:0",
    stem: "Which is the Fundamental Theorem of Calculus (with \\(F'=f\\))?",
    distractors: [
      f("\\int_a^b f(x)\\,dx = F(a)-F(b)"),
      f("\\int_a^b f(x)\\,dx = F'(b)-F'(a)"),
      f("\\int_a^b f(x)\\,dx = \\frac{F(b)-F(a)}{b-a}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "fundamental-theorem:formula:1",
    stem: "What does \\(\\displaystyle\\int_a^b f'(x)\\,dx\\) equal?",
    distractors: [
      f("\\int_a^b f'(x)\\,dx = f'(b)-f'(a)"),
      f("\\int_a^b f'(x)\\,dx = f(a)-f(b)"),
      f("\\int_a^b f'(x)\\,dx = f(b)+f(a)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "fundamental-theorem:formula:2",
    stem: "Which is the standard result for \\(\\displaystyle\\int \\frac{f'(x)}{f(x)}\\,dx\\)?",
    distractors: [
      f("\\int \\frac{f'(x)}{f(x)}\\,dx = \\frac{1}{f(x)}"),
      f("\\int \\frac{f'(x)}{f(x)}\\,dx = f(x)\\ln|f(x)|"),
      f("\\int \\frac{f'(x)}{f(x)}\\,dx = \\frac{f(x)^2}{2}"),
    ],
    theme: "formula",
  },

  // ── periodic-integrals: ∫₀^{nT}f=n∫₀^T | ∫_a^{a+nT}f=n∫₀^T ──
  {
    atomKey: "periodic-integrals:formula:0",
    stem: "For a function of period \\(T\\), which gives \\(\\displaystyle\\int_0^{nT} f(x)\\,dx\\)?",
    distractors: [
      f("\\int_0^{nT} f(x)\\,dx = \\frac1n\\int_0^{T} f(x)\\,dx"),
      f("\\int_0^{nT} f(x)\\,dx = \\int_0^{T} f(x)\\,dx"),
      f("\\int_0^{nT} f(x)\\,dx = nT\\int_0^{T} f(x)\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "periodic-integrals:formula:1",
    stem: "For a function of period \\(T\\), what is \\(\\displaystyle\\int_{a}^{a+nT} f(x)\\,dx\\)?",
    distractors: [
      f("\\int_{a}^{a+nT} f(x)\\,dx = n\\int_a^{a+T} f(x)\\,dx + a"),
      f("\\int_{a}^{a+nT} f(x)\\,dx = \\int_0^{T} f(x)\\,dx"),
      f("\\int_{a}^{a+nT} f(x)\\,dx = nT"),
    ],
    theme: "formula",
  },

  // ── leibniz-rule: variable-upper-limit derivative ──
  {
    atomKey: "leibniz-rule:formula:0",
    stem: "Which is the Leibniz rule for \\(\\displaystyle\\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt\\)?",
    distractors: [
      f("\\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt = f(g(x))"),
      f("\\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt = f'(g(x))\\,g'(x)"),
      f("\\frac{d}{dx}\\int_{a}^{g(x)} f(t)\\,dt = f(g(x))\\,g'(x) - f(a)"),
    ],
    theme: "formula",
  },

  // ── kings-property: King's | a+b-x | 0→2a | f/(f+f(a-x))=a/2 ──
  {
    atomKey: "kings-property:formula:0",
    stem: "Which is King's property for \\(\\displaystyle\\int_0^a f(x)\\,dx\\)?",
    distractors: [
      f("\\int_0^a f(x)\\,dx = \\int_0^a f(x-a)\\,dx"),
      f("\\int_0^a f(x)\\,dx = \\int_0^a f(a+x)\\,dx"),
      f("\\int_0^a f(x)\\,dx = \\int_{-a}^0 f(a-x)\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "kings-property:formula:1",
    stem: "Which is King's property on a general interval \\([a,b]\\)?",
    distractors: [
      f("\\int_a^b f(x)\\,dx = \\int_a^b f(b-a-x)\\,dx"),
      f("\\int_a^b f(x)\\,dx = \\int_a^b f(a-b+x)\\,dx"),
      f("\\int_a^b f(x)\\,dx = \\int_a^b f(ab-x)\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "kings-property:formula:2",
    stem: "Which correctly rewrites \\(\\displaystyle\\int_0^{2a} f(x)\\,dx\\)?",
    distractors: [
      f("\\int_0^{2a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx"),
      f("\\int_0^{2a} f(x)\\,dx = \\int_0^a \\big[f(x)+f(a-x)\\big]\\,dx"),
      f("\\int_0^{2a} f(x)\\,dx = \\int_0^a \\big[f(x)-f(2a-x)\\big]\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "kings-property:formula:3",
    stem: "What is \\(\\displaystyle\\int_0^a \\frac{f(x)}{f(x)+f(a-x)}\\,dx\\)?",
    distractors: [
      f("\\int_0^a \\frac{f(x)}{f(x)+f(a-x)}\\,dx = a"),
      f("\\int_0^a \\frac{f(x)}{f(x)+f(a-x)}\\,dx = \\frac{1}{2}"),
      f("\\int_0^a \\frac{f(x)}{f(x)+f(a-x)}\\,dx = 0"),
    ],
    theme: "formula",
  },

  // ── symmetry-odd-even: odd=0 | even=2∫ | 1+c^x property ──
  {
    atomKey: "symmetry-odd-even:formula:0",
    stem: "For an ODD function \\(f\\), what is \\(\\displaystyle\\int_{-a}^{a} f(x)\\,dx\\)?",
    distractors: [
      f("\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(x)\\,dx"),
      f("\\int_{-a}^{a} f(x)\\,dx = \\int_0^a f(x)\\,dx"),
      f("\\int_{-a}^{a} f(x)\\,dx = 2f(a)"),
    ],
    theme: "formula",
  },
  {
    atomKey: "symmetry-odd-even:formula:1",
    stem: "For an EVEN function \\(f\\), what is \\(\\displaystyle\\int_{-a}^{a} f(x)\\,dx\\)?",
    distractors: [
      f("\\int_{-a}^{a} f(x)\\,dx = 0"),
      f("\\int_{-a}^{a} f(x)\\,dx = \\int_0^a f(x)\\,dx"),
      f("\\int_{-a}^{a} f(x)\\,dx = 2\\int_0^a f(-x)\\,dx - \\int_0^a f(x)\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "symmetry-odd-even:formula:2",
    stem: "For an EVEN function \\(f\\), which is the \\(1+c^x\\) property?",
    distractors: [
      f("\\int_{-a}^{a} \\frac{f(x)}{1+c^{x}}\\,dx = \\frac12\\int_0^a f(x)\\,dx"),
      f("\\int_{-a}^{a} \\frac{f(x)}{1+c^{x}}\\,dx = 0"),
      f("\\int_{-a}^{a} \\frac{f(x)}{1+c^{x}}\\,dx = 2\\int_0^a f(x)\\,dx"),
    ],
    theme: "formula",
  },

  // ── standard-results-and-reductions: ∫dx/(1+sin²x) | Beta | ∫sin²=∫cos²=π/4 ──
  {
    atomKey: "standard-results-and-reductions:formula:0",
    stem: "What is \\(\\displaystyle\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x}\\)?",
    distractors: [
      f("\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x} = \\frac{\\pi}{2}"),
      f("\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x} = \\pi\\sqrt2"),
      f("\\int_0^{\\pi}\\frac{dx}{1+\\sin^2x} = \\frac{\\pi}{2\\sqrt2}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "standard-results-and-reductions:formula:1",
    stem: "Which is the Beta-function value of \\(\\displaystyle\\int_0^1 x^{m}(1-x)^{n}\\,dx\\)?",
    distractors: [
      f("\\int_0^1 x^{m}(1-x)^{n}\\,dx = \\frac{m!\\,n!}{(m+n)!}"),
      f("\\int_0^1 x^{m}(1-x)^{n}\\,dx = \\frac{(m+n+1)!}{m!\\,n!}"),
      f("\\int_0^1 x^{m}(1-x)^{n}\\,dx = \\frac{m!+n!}{(m+n+1)!}"),
    ],
    theme: "formula",
  },
  {
    atomKey: "standard-results-and-reductions:formula:2",
    stem: "What is \\(\\displaystyle\\int_0^{\\pi/2}\\sin^{2}x\\,dx\\) (\\(=\\int_0^{\\pi/2}\\cos^{2}x\\,dx\\))?",
    distractors: [
      f("\\int_0^{\\pi/2}\\sin^{2}x\\,dx = \\frac{\\pi}{2}"),
      f("\\int_0^{\\pi/2}\\sin^{2}x\\,dx = \\frac{1}{2}"),
      f("\\int_0^{\\pi/2}\\sin^{2}x\\,dx = 1"),
    ],
    theme: "formula",
  },

  // ── integrating-greatest-integer: frac=1/2 | ⌊x⌋+⌊-x⌋=-1 | ∫₀^n⌊x⌋=n(n-1)/2 ──
  {
    atomKey: "integrating-greatest-integer:formula:0",
    stem: "What is \\(\\displaystyle\\int_n^{n+1}\\big(x-\\lfloor x\\rfloor\\big)\\,dx\\)?",
    distractors: [
      f("\\int_n^{n+1}\\big(x-\\lfloor x\\rfloor\\big)\\,dx = 1"),
      f("\\int_n^{n+1}\\big(x-\\lfloor x\\rfloor\\big)\\,dx = n+\\tfrac12"),
      f("\\int_n^{n+1}\\big(x-\\lfloor x\\rfloor\\big)\\,dx = 0"),
    ],
    theme: "formula",
  },
  {
    atomKey: "integrating-greatest-integer:formula:1",
    stem: "For a non-integer \\(x\\), what is \\(\\lfloor x\\rfloor + \\lfloor -x\\rfloor\\)?",
    distractors: [
      f("\\lfloor x\\rfloor + \\lfloor -x\\rfloor = 0"),
      f("\\lfloor x\\rfloor + \\lfloor -x\\rfloor = 1"),
      f("\\lfloor x\\rfloor + \\lfloor -x\\rfloor = -2\\lfloor x\\rfloor"),
    ],
    theme: "formula",
  },
  {
    atomKey: "integrating-greatest-integer:formula:2",
    stem: "For a positive integer \\(n\\), what is \\(\\displaystyle\\int_0^{n}\\lfloor x\\rfloor\\,dx\\)?",
    distractors: [
      f("\\int_0^{n}\\lfloor x\\rfloor\\,dx = \\frac{n(n+1)}{2}"),
      f("\\int_0^{n}\\lfloor x\\rfloor\\,dx = \\frac{n^2}{2}"),
      f("\\int_0^{n}\\lfloor x\\rfloor\\,dx = n-1"),
    ],
    theme: "formula",
  },

  // ── area-under-curves: A=∫|f| | A=∫|f-g| ──
  {
    atomKey: "area-under-curves:formula:0",
    stem: "Which gives the area between \\(y=f(x)\\) and the x-axis on \\([a,b]\\)?",
    distractors: [
      f("A = \\int_a^b f(x)\\,dx"),
      f("A = \\left|\\int_a^b f(x)\\,dx\\right|"),
      f("A = \\int_a^b f(x)^2\\,dx"),
    ],
    theme: "formula",
  },
  {
    atomKey: "area-under-curves:formula:1",
    stem: "Which gives the area between the curves \\(y=f(x)\\) and \\(y=g(x)\\) on \\([a,b]\\)?",
    distractors: [
      f("A = \\int_a^b \\big(f(x)-g(x)\\big)\\,dx"),
      f("A = \\left|\\int_a^b \\big(f(x)-g(x)\\big)\\,dx\\right|"),
      f("A = \\int_a^b \\big|f(x)\\big|-\\big|g(x)\\big|\\,dx"),
    ],
    theme: "formula",
  },
];
