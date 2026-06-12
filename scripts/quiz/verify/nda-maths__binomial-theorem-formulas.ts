/**
 * NDA Maths · Binomial Theorem · FORMULA-recall MCQs.
 * One entry per `formula.latex` piece authored into the notes _data (bundled
 * pieces are \qquad/\quad-joined, so the key index = position in that concept's
 * bundle, 0-based). Concrete stems replace the generic "which is the formula for
 * <name>?" placeholder; distractors are full-equation permutations — wrong
 * versions of the SAME identity, same shape (no length/format tell).
 *   npm run quiz:verify nda-maths__binomial-theorem-formulas
 */
import type { VerifiedEntry } from "./nda-maths__probability";

const f = (s: string) => `\\(${s}\\)`;

export const VERIFIED: VerifiedEntry[] = [
  // ── bt-theorem-general-term: T_{r+1} ──
  {
    atomKey: "bt-theorem-general-term:formula:0",
    stem: "What is the general term \\(T_{r+1}\\) in the expansion of \\((a+b)^n\\)?",
    distractors: [
      f("T_{r+1} = \\binom{n}{r}\\, a^{\\,r} b^{\\,n-r}"),
      f("T_{r+1} = \\binom{n}{r-1}\\, a^{\\,n-r} b^{\\,r}"),
      f("T_{r} = \\binom{n}{r}\\, a^{\\,n-r} b^{\\,r}"),
    ],
    theme: "formula",
  },

  // ── bt-binomial-coefficients: C(n,r) ──
  {
    atomKey: "bt-binomial-coefficients:formula:0",
    stem: "What is the value of the binomial coefficient \\(\\binom{n}{r}\\)?",
    distractors: [
      f("\\binom{n}{r} = \\dfrac{n!}{(n-r)!}"),
      f("\\binom{n}{r} = \\dfrac{n!}{r!\\,(n+r)!}"),
      f("\\binom{n}{r} = \\dfrac{r!\\,(n-r)!}{n!}"),
    ],
    theme: "formula",
  },

  // ── bt-specific-term-coefficient: method (exponent = k ⇒ r) ──
  {
    atomKey: "bt-specific-term-coefficient:formula:0",
    stem: "To find the coefficient of \\(x^k\\) in an expansion, what do you do with the exponent of \\(x\\) in \\(T_{r+1}\\)?",
    distractors: [
      f("\\text{set exponent of } x \\text{ in } T_{r+1} = 0 \\ \\Rightarrow\\ r"),
      f("\\text{set exponent of } x \\text{ in } T_{r+1} = n \\ \\Rightarrow\\ r"),
      f("\\text{set exponent of } x \\text{ in } T_{r} = k \\ \\Rightarrow\\ r"),
    ],
    theme: "formula",
  },

  // ── bt-middle-term: T_{n/2+1} (n even) ──
  {
    atomKey: "bt-middle-term:formula:0",
    stem: "For even \\(n\\), what is the single middle term of \\((a+b)^n\\)?",
    distractors: [
      f("T_{\\frac{n}{2}} = \\binom{n}{n/2}\\, a^{\\,n/2} b^{\\,n/2}"),
      f("T_{\\frac{n}{2}+1} = \\binom{n}{n/2}\\, a^{\\,n} b^{\\,n}"),
      f("T_{\\frac{n+1}{2}} = \\binom{n}{n/2}\\, a^{\\,n/2} b^{\\,n/2}"),
    ],
    theme: "formula",
  },

  // ── bt-term-independent-of-x: method (exponent = 0 ⇒ r) ──
  {
    atomKey: "bt-term-independent-of-x:formula:0",
    stem: "To find the term independent of \\(x\\) (the constant term), what condition gives \\(r\\)?",
    distractors: [
      f("\\text{set exponent of } x \\text{ in } T_{r+1} = 1 \\ \\Rightarrow\\ r"),
      f("\\text{set exponent of } x \\text{ in } T_{r+1} = n \\ \\Rightarrow\\ r"),
      f("\\text{set coefficient of } T_{r+1} = 0 \\ \\Rightarrow\\ r"),
    ],
    theme: "formula",
  },

  // ── bt-coefficient-conditions: first-three-terms shape (2 pieces) ──
  {
    atomKey: "bt-coefficient-conditions:formula:0",
    stem: "Reading off the first three terms of \\((1+ax)^n\\), which equation gives the SECOND term's coefficient?",
    distractors: [
      f("\\binom{n}{1}a = (\\text{1st})"),
      f("\\binom{n}{2}a = (\\text{2nd})"),
      f("\\binom{n}{0}a = (\\text{2nd})"),
    ],
    theme: "formula",
  },
  {
    atomKey: "bt-coefficient-conditions:formula:1",
    stem: "From the first three terms of \\((1+ax)^n\\), which equation gives the THIRD term, ready to divide and solve for \\(n\\)?",
    distractors: [
      f("\\binom{n}{2}a^2 = (\\text{2nd}) \\ \\Rightarrow\\ \\text{divide, solve } n"),
      f("\\binom{n}{3}a^2 = (\\text{3rd}) \\ \\Rightarrow\\ \\text{divide, solve } n"),
      f("\\binom{n}{2}a = (\\text{3rd}) \\ \\Rightarrow\\ \\text{divide, solve } n"),
    ],
    theme: "formula",
  },

  // ── bt-counting-terms-products: trinomial distinct-term count ──
  {
    atomKey: "bt-counting-terms-products:formula:0",
    stem: "How many distinct terms does the trinomial expansion \\((a+b+c)^n\\) have?",
    distractors: [
      f("(a+b+c)^n \\ \\longrightarrow\\ \\binom{n+1}{2}\\ \\text{distinct terms}"),
      f("(a+b+c)^n \\ \\longrightarrow\\ (n+1)\\ \\text{distinct terms}"),
      f("(a+b+c)^n \\ \\longrightarrow\\ \\binom{n+2}{n}\\,n\\ \\text{distinct terms}"),
    ],
    theme: "formula",
  },

  // ── bt-rational-and-general-index: rational-term test ──
  {
    atomKey: "bt-rational-and-general-index:formula:0",
    stem: "In \\((p^{1/j}+q^{1/k})^n\\), when is the \\((r+1)\\)-th term rational?",
    distractors: [
      f("\\tfrac{n-r}{j} \\in \\mathbb{Z}\\ \\text{ or }\\ \\tfrac{r}{k} \\in \\mathbb{Z}"),
      f("\\tfrac{r}{j} \\in \\mathbb{Z}\\ \\text{ and }\\ \\tfrac{n-r}{k} \\in \\mathbb{Z}"),
      f("\\tfrac{n-r}{j} \\in \\mathbb{Z}\\ \\text{ and }\\ \\tfrac{r}{k} \\notin \\mathbb{Z}"),
    ],
    theme: "formula",
  },

  // ── bt-sum-of-all-coefficients: 2 pieces (total | weighted base) ──
  {
    atomKey: "bt-sum-of-all-coefficients:formula:0",
    stem: "What is the sum of all binomial coefficients \\(\\sum_{r=0}^{n}\\binom{n}{r}\\)?",
    distractors: [
      f("\\sum_{r=0}^{n}\\binom{n}{r} = 2^{\\,n-1}"),
      f("\\sum_{r=0}^{n}\\binom{n}{r} = n^2"),
      f("\\sum_{r=0}^{n}\\binom{n}{r} = 2^n - 1"),
    ],
    theme: "formula",
  },
  {
    atomKey: "bt-sum-of-all-coefficients:formula:1",
    stem: "What is the weighted coefficient sum \\(\\sum_{r=0}^{n}\\binom{n}{r}c^{r}\\)?",
    distractors: [
      f("\\sum_{r=0}^{n}\\binom{n}{r}c^{r} = (1-c)^n"),
      f("\\sum_{r=0}^{n}\\binom{n}{r}c^{r} = c\\,2^n"),
      f("\\sum_{r=0}^{n}\\binom{n}{r}c^{r} = (1+c)^{n-1}"),
    ],
    theme: "formula",
  },

  // ── bt-odd-even-alternating-sums: 2 pieces (alternating | split) ──
  {
    atomKey: "bt-odd-even-alternating-sums:formula:0",
    stem: "What is the alternating sum \\(\\sum_{r}(-1)^r\\binom{n}{r}\\) for \\(n\\ge 1\\)?",
    distractors: [
      f("\\sum_r (-1)^r \\binom{n}{r} = 1"),
      f("\\sum_r (-1)^r \\binom{n}{r} = 2^{\\,n-1}"),
      f("\\sum_r (-1)^r \\binom{n}{r} = (-1)^n"),
    ],
    theme: "formula",
  },
  {
    atomKey: "bt-odd-even-alternating-sums:formula:1",
    stem: "Splitting the coefficients by parity, what do the even-index and odd-index sums equal?",
    distractors: [
      f("\\text{even-sum} = \\text{odd-sum} = 2^{\\,n}"),
      f("\\text{even-sum} = \\text{odd-sum} = 2^{\\,n+1}"),
      f("\\text{even-sum} = \\text{odd-sum} = n\\,2^{\\,n-1}"),
    ],
    theme: "formula",
  },

  // ── bt-weighted-sums-differentiation: index-weighted sum ──
  {
    atomKey: "bt-weighted-sums-differentiation:formula:0",
    stem: "What is the index-weighted sum \\(\\sum_{r=1}^{n} r\\binom{n}{r}\\)?",
    distractors: [
      f("\\sum_{r=1}^{n} r\\binom{n}{r} = n\\,2^{\\,n}"),
      f("\\sum_{r=1}^{n} r\\binom{n}{r} = (n-1)\\,2^{\\,n-1}"),
      f("\\sum_{r=1}^{n} r\\binom{n}{r} = 2^{\\,n-1}"),
    ],
    theme: "formula",
  },

  // ── bt-coefficient-identities-pascal: Pascal applied twice ──
  {
    atomKey: "bt-coefficient-identities-pascal:formula:0",
    stem: "Applying Pascal's rule twice, what does \\(\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2}\\) collapse to?",
    distractors: [
      f("\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2} = \\binom{n+1}{r}"),
      f("\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2} = \\binom{n+2}{r-1}"),
      f("\\binom{n}{r} + 2\\binom{n}{r-1} + \\binom{n}{r-2} = 2\\binom{n+1}{r}"),
    ],
    theme: "formula",
  },

  // ── bt-conjugate-integer-trick: 2 pieces (sum | product) ──
  {
    atomKey: "bt-conjugate-integer-trick:formula:0",
    stem: "What can you say about the conjugate SUM \\((a+\\sqrt{b})^n + (a-\\sqrt{b})^n\\)?",
    distractors: [
      f("(a+\\sqrt{b})^n - (a-\\sqrt{b})^n \\in \\mathbb{Z}"),
      f("(a+\\sqrt{b})^n + (a-\\sqrt{b})^n = (a^2-b)^n"),
      f("(a+\\sqrt{b})^n + (a-\\sqrt{b})^n = 2(a+\\sqrt{b})^n"),
    ],
    theme: "formula",
  },
  {
    atomKey: "bt-conjugate-integer-trick:formula:1",
    stem: "What is the conjugate PRODUCT \\((a+\\sqrt{b})^n(a-\\sqrt{b})^n\\)?",
    distractors: [
      f("(a+\\sqrt{b})^n(a-\\sqrt{b})^n = (a^2+b)^n"),
      f("(a+\\sqrt{b})^n(a-\\sqrt{b})^n = a^2-b"),
      f("(a+\\sqrt{b})^n(a-\\sqrt{b})^n = (a-b)^n"),
    ],
    theme: "formula",
  },

  // ── bt-fractional-part: 2 pieces (f+f'=1 | f') ──
  {
    atomKey: "bt-fractional-part:formula:0",
    stem: "If \\(f\\) is the fractional part of \\((a+\\sqrt{b})^n\\) and \\(f' = (a-\\sqrt{b})^n\\) (with \\(a^2-b=1\\)), what is \\(f+f'\\)?",
    distractors: [f("f + f' = 0"), f("f + f' = 2"), f("f - f' = 1")],
    theme: "formula",
  },
  {
    atomKey: "bt-fractional-part:formula:1",
    stem: "In the integer-plus-fractional-part setup for \\((a+\\sqrt{b})^n\\), what does the small quantity \\(f'\\) equal?",
    distractors: [
      f("f' = (a+\\sqrt{b})^{-n}"),
      f("f' = (\\sqrt{b}-a)^n"),
      f("f' = 1 - (a-\\sqrt{b})^n"),
    ],
    theme: "formula",
  },

  // ── bt-remainders-via-binomial: base near multiple of m ──
  {
    atomKey: "bt-remainders-via-binomial:formula:0",
    stem: "Writing a base as \\(km \\pm 1\\), what is \\((km \\pm 1)^n \\pmod{m}\\)?",
    distractors: [
      f("(km \\pm 1)^n \\equiv (\\mp 1)^n \\pmod{m}"),
      f("(km \\pm 1)^n \\equiv (\\pm 1) \\pmod{m}"),
      f("(km \\pm 1)^n \\equiv n(\\pm 1) \\pmod{m}"),
    ],
    theme: "formula",
  },

  // ── bt-legendre-power-in-factorial: Legendre's formula ──
  {
    atomKey: "bt-legendre-power-in-factorial:formula:0",
    stem: "What is the exponent \\(E_p(n!)\\) of a prime \\(p\\) in \\(n!\\) (Legendre's formula)?",
    distractors: [
      f("E_p(n!) = \\sum_{i\\ge 1} \\left\\lceil \\dfrac{n}{p^{\\,i}} \\right\\rceil"),
      f("E_p(n!) = \\sum_{i\\ge 1} \\left\\lfloor \\dfrac{n}{p\\,i} \\right\\rfloor"),
      f("E_p(n!) = \\left\\lfloor \\dfrac{n}{p} \\right\\rfloor"),
    ],
    theme: "formula",
  },
];
