/**
 * Per-principle deep-dive content for /guide/nda-maths/principles/{slug}.
 * Only the top-20 cross-chapter principles get an entry here; this file
 * grows as detail pages are published (phases 5-6).
 *
 * `exampleQuestionIds` is an ordered list of question UUIDs from the bank
 * — the [slug] page resolves them at request time via loadWorkedExamples.
 * Each picked example demonstrates the principle clearly and ideally spans
 * different chapters / difficulties.
 */

export type PrincipleDetail = {
  /** A 2-3 paragraph teacherly explanation: when to reach for this
   *  principle and why it beats the alternatives. */
  story: string[];
  /** One-line "when to use" cue students can memorise. */
  trigger: string;
  /** Ordered example question UUIDs (3-5 ideal). Pre-curated for clarity. */
  exampleQuestionIds: string[];
  /** Common shapes/variants to recognise — bullet list. */
  variants: { name: string; description: string }[];
  /** 3 cross-link slugs to related principles in the TOP_20. */
  relatedSlugs: string[];
};

export const PRINCIPLE_DETAILS: Record<string, PrincipleDetail> = {
  /* ────────────────────────────────────────────────────────────────────── */
  "am-gm-mean-inequalities": {
    trigger:
      "You need a minimum of a sum or a maximum of a product, given a constraint on the other.",
    story: [
      "AM-GM is the lever most students reach for last. They start with calculus, set f'(x) = 0, lose to messy algebra, and then realise the answer was a one-line bound. The principle is simple: for positive reals, the arithmetic mean is at least the geometric mean, with equality when all values are equal.",
      "The bank disguises this across 10 chapters. Sequence & Series asks for AP/GP relations. Application of Derivatives wraps it in 'find the minimum'. Trigonometric Identities asks for the max of sin·cos. Probability frames it as 'find x such that x + 1/x > 2'. The chapter changes; the inequality doesn't.",
      "Internalise three patterns: (1) for positive x, x + 1/x ≥ 2 with equality at x = 1, (2) for fixed product xy, the sum x + y is minimised when x = y, (3) for fixed sum x + y, the product xy is maximised when x = y. From these you can derive most of the bank's AM-GM questions in under 60 seconds each.",
    ],
    exampleQuestionIds: [
      "8c800fb8-a2e3-453b-95a4-44e54284e63a", // xy=4225, min(x+y)
      "125bcb87-d1b4-439a-a3af-a266a11f1396", // x+y=20, max(xy)
      "ac6d5e75-bc98-4331-9d75-cb7ee6e3c4d9", // 2A+2B=π, max sin A sin B (cross-chapter)
      "cf847dea-1d4e-465c-94e0-b9332d91e4a3", // (p sec x)² + (q csc x)² min (HARD)
    ],
    variants: [
      {
        name: "x + 1/x ≥ 2",
        description:
          "For positive x. Generalises to xⁿ + 1/xⁿ ≥ 2 for any positive n.",
      },
      {
        name: "Cauchy-Schwarz / power mean inequality",
        description:
          "Generalisation: AM of pᵗʰ powers ≥ AM of qᵗʰ powers for p > q. NDA rarely needs this; AM-GM suffices.",
      },
      {
        name: "Three-variable AM-GM",
        description:
          "If abc = k, then a + b + c ≥ 3·k^(1/3). Equality at a = b = c = k^(1/3).",
      },
      {
        name: "AM ≥ GM ≥ HM chain",
        description:
          "For positive reals, AM ≥ GM ≥ HM with all three equal iff all values equal. Two more inequalities for free.",
      },
    ],
    relatedSlugs: [
      "gp-three-term",
      "extrema-derivatives",
      "ap-three-term",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "vieta-symmetric-roots": {
    trigger:
      "The question asks for a symmetric function of roots — α + β, αβ, α² + β², (α − β)² — without naming them individually.",
    story: [
      "If α, β are roots of ax² + bx + c = 0, then α + β = −b/a and αβ = c/a. That's the whole principle. The skill is recognising that any symmetric function of the roots can be written in terms of these two — and that you should NEVER solve for α, β if you're only asked about a symmetric combination.",
      "Vieta is the highest-disguise principle in the bank. NDA dresses it as: 'tan α, tan β are roots of x² − 6x + 8 = 0, find cos(2α + 2β)'. The cosine throws students off; they want to solve the quadratic. But α + β is right there in front of them — that's all they need.",
      "The recipe: extract α + β and αβ from coefficients. Convert the target expression into those. Compute. Three steps, every time.",
    ],
    exampleQuestionIds: [
      "e8f3d0c4-265c-4871-a8bd-24d6e38e4b4a", // x²+mx+n integer (Quad Eq, EASY)
      "95079d62-efcb-4dea-8eb3-3a0590a6880c", // α²-β²=16 (Quad Eq, EASY)
      "6531efe3-56e2-457a-a839-9cdcb95b8f4c", // tan α, tan β roots, cos(2α+2β) (Trig Identities cross-chapter)
      "c17aae4f-8cf1-4131-8a10-1fc5aa699003", // α, β roots — AM and GM (compound with AM-GM, MODERATE)
    ],
    variants: [
      {
        name: "Three roots: α + β + γ = −b/a, αβ + βγ + γα = c/a, αβγ = −d/a",
        description:
          "Cubic case. ax³ + bx² + cx + d = 0. Useful for Roots-of-unity questions.",
      },
      {
        name: "α² + β² = (α + β)² − 2αβ",
        description:
          "Standard substitution. Memorise: also (α − β)² = (α + β)² − 4αβ.",
      },
      {
        name: "sin θ and cos θ as roots",
        description:
          "Use sin²θ + cos²θ = 1 to get b² = a² + 2ac (a classic NDA trick).",
      },
      {
        name: "Reciprocal roots / 1/α + 1/β",
        description:
          "(1/α) + (1/β) = (α + β)/(αβ). Simplifies many cross-chapter questions.",
      },
    ],
    relatedSlugs: [
      "cube-roots-of-unity",
      "ap-three-term",
      "compound-angle",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "ap-three-term": {
    trigger:
      "Three terms are in AP — or you can rewrite them to be in AP — and you can use 2b = a + c to close the system.",
    story: [
      "The AP three-term identity is the simplest unifying relation in the bank: if a, b, c are in AP, then 2b = a + c. That's all. But the principle's leverage comes from how NDA disguises the three terms.",
      "Sometimes a, b, c are explicit numbers in an AP question. Sometimes they're logarithms (log p, log q, log r in AP). Sometimes they're binomial coefficients (C(n, 4), C(n, 5), C(n, 6) in AP). Sometimes they're sides of a triangle. Whatever the surface, the relation is the same — and combined with one other equation, you can solve.",
      "Don't conflate this with the AP sum formulas (Sₙ = n/2 · [2a + (n−1)d]) — those are a separate skill. The three-term identity is the algebraic core; the sum formulas are computational. NDA tests both, often in the same question.",
    ],
    exampleQuestionIds: [
      "ae62e269-8a7d-4c2c-830f-9f0219aaa2df", // p,q,r,s in AP, p+s=8, qr=15 (EASY)
      "e8d94bc5-da0b-47e5-8536-959fa7deac61", // AM of 50-term AP (EASY)
      "29ad76f9-a219-4a6b-a2a9-e6783ba5d55a", // p × p-th term = q × q-th term (MODERATE)
      "e4a7c388-d352-4166-8978-3ef0c319b424", // first term x, sum n terms = 0, sum next m terms (HARD)
    ],
    variants: [
      {
        name: "2b = a + c (basic)",
        description:
          "For any three terms a, b, c in AP. The single equation that closes most AP questions.",
      },
      {
        name: "Sₙ = n/2 · [2a + (n − 1)d]",
        description:
          "Sum of first n terms. Pairs with the three-term identity in compound questions.",
      },
      {
        name: "log a, log b, log c in AP ⇔ b² = ac (i.e. a, b, c in GP)",
        description:
          "The log-AP-to-GP bridge. Recognise this when you see log appear inside an AP statement.",
      },
      {
        name: "AP within an AP",
        description:
          "If the kᵗʰ terms of two APs are in AP, the original APs share a relationship. Tested in P&C and Logs.",
      },
    ],
    relatedSlugs: [
      "gp-three-term",
      "am-gm-mean-inequalities",
      "binomial-coefficient-identities",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "gp-three-term": {
    trigger:
      "Three terms a, b, c satisfy b² = ac (or can be rewritten to). Multiplicative cousin of AP.",
    story: [
      "If a, b, c are in GP, then b² = ac. That's the multiplicative version of the AP three-term identity. The leverage is the same: one equation closes the system.",
      "GP three-term combines with AM-GM in the bank's highest-yield compound recipe. Whenever you see 'three terms in GP and a constraint on their sum or product', AM-GM is almost always faster than calculus. The relation b² = ac handles the GP side; AM-GM handles the bound.",
      "Watch for the AP→GP bridge: log a, log b, log c in AP is equivalent to a, b, c in GP. Statisticians' AM-GM-HM chain compounds with this when the same triple is in AP / GP / HP simultaneously — that's a 5-q NDA staple.",
    ],
    exampleQuestionIds: [
      "00d27cc3-2c95-4fc5-82fd-6b8efccf4252", // a,b,c in GP — a²,b²,c²; 1/a,1/b,1/c; √a,√b,√c (EASY)
      "aaae67b4-5489-40a9-bfb4-8ad369a03f48", // 2^(1/c), 2^(b/ac), 2^(1/a) in GP (MODERATE)
      "f4a26e0a-30d4-452a-b5f2-43da315efa4b", // AP terms in GP (MODERATE)
      "194e8849-9fb4-4ff5-a7c1-bc360354cf09", // p^x = q^y = r^z, x,y,z in GP (HARD)
    ],
    variants: [
      {
        name: "b² = ac (basic)",
        description:
          "The three-term GP identity. Closes any GP question with one extra equation.",
      },
      {
        name: "Sₙ = a(rⁿ − 1) / (r − 1)",
        description:
          "Sum of n terms. For |r| < 1, infinite sum = a/(1 − r).",
      },
      {
        name: "Reciprocal GP",
        description:
          "If a, b, c are in GP, so are 1/a, 1/b, 1/c (with reciprocal common ratio).",
      },
      {
        name: "Powers of GP",
        description:
          "aⁿ, bⁿ, cⁿ are in GP for any integer n. √a, √b, √c are also in GP (if positive).",
      },
    ],
    relatedSlugs: [
      "ap-three-term",
      "am-gm-mean-inequalities",
      "vieta-symmetric-roots",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "compound-angle": {
    trigger:
      "Two angles α, β appear and you need a trig function of α ± β.",
    story: [
      "Compound angle formulas — sin(A ± B), cos(A ± B), tan(A ± B) — are the substrate of every non-trivial trig identity. NDA tests them directly (Trigonometric Identities chapter) and indirectly (Trig Equations, Properties of Triangle, Inverse Trig).",
      "The leverage isn't in memorising the formulas — it's in spotting WHEN to apply them. NDA hides compound angle behind expressions like sin²(π/4 + θ) − sin²(π/4 − θ), or (cos 17° − sin 17°)/(cos 17° + sin 17°), or m tan α = n tan β with α and β complementary. Each of these reduces to one application of a compound-angle formula.",
      "Three formulas to memorise: sin(A + B) = sin A cos B + cos A sin B; cos(A + B) = cos A cos B − sin A sin B; tan(A + B) = (tan A + tan B)/(1 − tan A tan B). The minus versions follow by sign flip. From these, double angle (set B = A) and half angle (set A = θ/2) fall out for free.",
    ],
    exampleQuestionIds: [
      "9e8f98bb-ba79-4482-80a4-2476c86510ef", // 3 cos θ = 4 sin θ, tan(45+θ) (EASY)
      "71bd3a26-d9b8-4195-8e94-4eb81b22fd5d", // (cos17 - sin17)/(cos17 + sin17) (EASY)
      "4e52447f-8084-4f61-984d-a5144a8bc4f4", // sin²(π/4+θ) - sin²(π/4-θ) (MODERATE)
      "2461e050-67e1-4037-ae22-9108a000b300", // tan α=1/7, sin β=1/√10, cos(α+2β) (HARD)
    ],
    variants: [
      {
        name: "sin(A + B) and sin(A − B)",
        description:
          "The base. Add to get the product-to-sum identity; subtract to isolate sin A cos B.",
      },
      {
        name: "cos(A ± B)",
        description:
          "Negative inside flips the sin·sin sign — a common source of sign errors. Verify carefully.",
      },
      {
        name: "tan(A ± B) and tan(45° + θ)",
        description:
          "tan(45° + θ) = (1 + tan θ)/(1 − tan θ). Recognising this saves time on NDA's favourite trick.",
      },
      {
        name: "Double angle (B = A)",
        description:
          "sin 2A = 2 sin A cos A; cos 2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1; tan 2A = 2 tan A / (1 − tan²A).",
      },
    ],
    relatedSlugs: [
      "double-angle",
      "triangle-a-plus-b-plus-c-pi",
      "sine-cosine-rules",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "cube-roots-of-unity": {
    trigger:
      "ω appears, or any expression that can be re-cast as 'cube roots of unity'.",
    story: [
      "Three identities define the toolkit: 1 + ω + ω² = 0, ω³ = 1, and |ω| = 1. Combined, they reduce almost every cube-roots-of-unity question to small-case arithmetic — even when the question hides them behind powers like ω^100 or expressions like (1 + ω − ω²)^100.",
      "The cycle is the secret: ω, ω², 1, ω, ω², 1, ... — every third power returns to 1. So any high power of ω reduces mod 3. ω^100 = ω^(99+1) = ω^1 = ω. The pattern means NDA can write any power and you compute in one step.",
      "Watch for the disguised form: x² − x + 1 = 0 has roots ω, ω² (NOT 1 ± ω). x² + x + 1 = 0 also has cube-root-of-unity roots. Recognising 'this is a cube-roots-of-unity quadratic' is half the work; the rest is applying the three identities.",
    ],
    exampleQuestionIds: [
      "36a94720-0758-4364-b03b-cd1d96d6f4f7", // x,y,z cube roots of unity, xy+yz+zx (EASY)
      "01e7eb5e-c984-42d6-af65-801aaa181ea5", // |(1-ω)/(ω+ω²)| (MODERATE)
      "e6475545-0b56-451f-8a30-1a1765cb0ad1", // x³-8=0 roots non-collinear/unit-circle (MODERATE)
      "76e5070f-987e-4585-97f0-be13d0549afb", // (1+ω-ω²)^100 + (1-ω+ω²)^100 (HARD)
    ],
    variants: [
      {
        name: "1 + ω + ω² = 0",
        description:
          "The single most useful identity. Lets you rewrite 1 + ω = −ω², ω + ω² = −1, 1 + ω² = −ω.",
      },
      {
        name: "ω³ = 1 (cycling)",
        description:
          "Powers cycle mod 3: ω^(3k) = 1, ω^(3k+1) = ω, ω^(3k+2) = ω². Any high power reduces in one step.",
      },
      {
        name: "ω, ω² as roots of x² + x + 1 = 0",
        description:
          "Vieta gives ω + ω² = −1 and ω · ω² = 1. Bridges directly to the Vieta principle.",
      },
      {
        name: "Geometric placement on the unit circle",
        description:
          "The three cube roots of unity are equally spaced at angles 0, 2π/3, 4π/3 on |z| = 1. Forms an equilateral triangle.",
      },
    ],
    relatedSlugs: [
      "vieta-symmetric-roots",
      "compound-angle",
      "binomial-coefficient-identities",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "inclusion-exclusion": {
    trigger:
      "Count or probability of \"at least one\", \"exactly two\", or a union of overlapping events / sets.",
    story: [
      "Two formulas cover ~95% of NDA's inclusion-exclusion questions. For two sets: n(A ∪ B) = n(A) + n(B) − n(A ∩ B). For three: n(A ∪ B ∪ C) = sum of singles − sum of pairs + n(A ∩ B ∩ C). The probability versions are identical with n → P.",
      "The challenge isn't the formula — it's parsing the question. 'Exactly two' means double-counted in the union but subtracted in the triple intersection. 'At least one' is the easier flip side: P(at least one) = 1 − P(none) — almost always faster than the inclusion-exclusion expansion.",
      "Set and probability framings are the same principle. A 'class of 45 students, cricket and football' question is identical to 'two events, classical probability' — only the words change. Recognising this saves you re-learning the trick per chapter.",
    ],
    exampleQuestionIds: [
      "f195de0d-31dc-43dd-b724-3ced0c0e821a", // 45 students cricket/football (EASY, Sets)
      "ee27ec67-5d65-459a-8af4-20c810ec38d7", // 250 multiples of 3 + 200 even, |A∪B| (MODERATE, Sets)
      "a76d34e2-307e-46ff-98e2-e543fb97acb9", // Physics/English test passes (MODERATE, Probability)
      "91aae553-31cf-4e55-bea4-e4f5574d6783", // 3-subject 240 students (HARD, Sets cross-counting)
    ],
    variants: [
      {
        name: "Two-set: |A ∪ B| = |A| + |B| − |A ∩ B|",
        description:
          "The base. The −|A∩B| corrects the double count. Identical for probabilities.",
      },
      {
        name: "Three-set: + singles − pairs + triple",
        description:
          "|A ∪ B ∪ C| = ΣAᵢ − Σ(Aᵢ ∩ Aⱼ) + |A ∩ B ∩ C|. Sign alternates by subset size.",
      },
      {
        name: "\"Exactly one\" / \"exactly two\"",
        description:
          "Exactly-k counts: sum over k-fold intersections with alternating signs. Easier to draw the Venn and read off regions.",
      },
      {
        name: "P(at least one) = 1 − P(none)",
        description:
          "Complement trick. Whenever the question says 'at least one X', compute P(none of them) and subtract. Saves an inclusion-exclusion expansion.",
      },
    ],
    relatedSlugs: [
      "conditional-probability-bayes",
      "binomial-coefficient-identities",
      "central-tendency-statistics",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "modulus-absolute-value": {
    trigger:
      "The expression contains |x|, [x], or a function defined piecewise at zero or an integer.",
    story: [
      "|x| splits at zero: equals x for x ≥ 0, equals −x for x < 0. That single piecewise split drives every modulus question in NDA. Left and right limits diverge at the split point; the function is continuous there but not differentiable.",
      "The principle has been on a tear since 2023 — modulus jumped from 4 q/paper-set to 15. It now appears across 8 chapters: Limits, Continuity, Differentiation, Definite Integration, Apps of Integration, Differential Equations, Functions, and Sets. The technique is the same everywhere: split at the discontinuity, handle each piece separately, recombine.",
      "The greatest-integer function [x] is the modulus's discrete cousin. It's also piecewise — constant on each [n, n+1) interval, jumping by 1 at each integer. Most NDA traps around [x] live at the integer boundaries (limits, derivatives, integrals).",
    ],
    exampleQuestionIds: [
      "59be1069-725d-4bd3-9cd3-35ed74a627a1", // lim |x-3|/(x-3) (EASY, Limits)
      "6f6a1ee1-869e-4c41-b606-783a12efff57", // e^|x| differentiable (EASY, Diff)
      "eda7b7cb-8460-45bb-b7c1-65852afd70db", // (x²+x+|x|)/x lim (MODERATE, Limits)
      "13579642-a081-446d-a30d-234c0bc227d9", // |x|+1 and [x]-1 product, two-sided limits (HARD, Limits)
    ],
    variants: [
      {
        name: "Piecewise definition of |x|",
        description:
          "|x| = x for x ≥ 0, −x for x < 0. The split point matters; everything else is algebra.",
      },
      {
        name: "Left vs right limit at the split",
        description:
          "lim x→0⁻ |x|/x = −1; lim x→0⁺ |x|/x = +1. Two-sided limit doesn't exist. NDA exploits this.",
      },
      {
        name: "|x| is continuous, not differentiable at 0",
        description:
          "The graph has a corner. Left derivative = −1, right derivative = +1, so f' undefined at x = 0.",
      },
      {
        name: "Greatest integer [x]",
        description:
          "[x] = n for x ∈ [n, n+1). Discontinuous at integers, with jump size 1. {x} = x − [x] is the fractional part.",
      },
    ],
    relatedSlugs: [
      "continuity-conditions",
      "differentiability-conditions",
      "standard-limits-lhopital",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "conditional-probability-bayes": {
    trigger:
      "The question says \"given that\", \"if it is known that\", or asks for a probability that depends on partial information.",
    story: [
      "Conditional probability is P(A | B) = P(A ∩ B) / P(B). That's all. Bayes' theorem is just this formula rearranged: P(A | B) = P(B | A) · P(A) / P(B). The arithmetic is trivial; the difficulty is parsing the question.",
      "Watch for the framing. \"What is the probability that...\" usually means classical. \"Given that X happened, what is the probability...\" means conditional. \"If the answer was correct, what is the probability the student knew it?\" is pure Bayes — reverse the direction of inference.",
      "Total probability theorem is the bridge: P(A) = Σ P(A | Bᵢ) · P(Bᵢ) over a partition. NDA uses this in ball-transfer problems (\"transfer a ball from urn A to urn B, then draw\") — the colour transferred is the partition Bᵢ.",
    ],
    exampleQuestionIds: [
      "849ae393-e763-4251-9028-923c883a9c85", // P(A)=0.3, P(B)=0.4, P(A|B)=0.5 → P(B|A) (EASY, direct Bayes)
      "f7fbf435-c86e-47f7-b4d4-8e300c0ae97c", // P(B|A^c) (MODERATE, complement framing)
      "06ff5d77-2531-4fdd-a390-847af5cc13c7", // Building collapse Bayes (MODERATE, classic)
      "00e8e6ff-8b6f-41b7-8260-f512190c7337", // Bag transfer total probability (HARD)
    ],
    variants: [
      {
        name: "P(A | B) = P(A ∩ B) / P(B)",
        description:
          "Definition. The numerator is the joint; the denominator is the conditioning event.",
      },
      {
        name: "Bayes' theorem",
        description:
          "P(A | B) = P(B | A) · P(A) / P(B). Used when you know P(B | A) and want P(A | B) — \"reverse the direction\".",
      },
      {
        name: "Total probability theorem",
        description:
          "P(A) = Σᵢ P(A | Bᵢ) · P(Bᵢ) over a partition {Bᵢ}. Solves the denominator P(B) in Bayes.",
      },
      {
        name: "Independence test: P(A | B) = P(A)",
        description:
          "If P(A | B) = P(A), then A and B are independent. Equivalently P(A ∩ B) = P(A) · P(B).",
      },
    ],
    relatedSlugs: [
      "inclusion-exclusion",
      "binomial-coefficient-identities",
      "central-tendency-statistics",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "binomial-coefficient-identities": {
    trigger:
      "The question involves C(n, r) — a sum, a coefficient in an expansion, a relation in AP/GP, or a selection problem.",
    story: [
      "Four identities cover ~80% of NDA's binomial-coefficient questions. ΣC(n, r) = 2ⁿ (sum of all binomial coefficients). C(n, r) = C(n, n − r) (symmetry). C(n, r) + C(n, r − 1) = C(n + 1, r) (Pascal's rule). And the alternating sum: ΣC(n, r) · (−1)ʳ = 0 — which is the secret to the trickiest Binomial Theorem problems.",
      "The principle reaches into P&C (\"how many ways to choose 5 from 8?\"), Binomial Distribution (P(X = k) = C(n, k) · pᵏqⁿ⁻ᵏ), Statistics (combinatorial summations), Matrices & Determinants (matrices of binomial coefficients), and Sequence & Series (C(n, r) in AP, etc.). Same identity, different chapter dress.",
      "For 'coefficient of xᵏ' questions, the general term Tᵣ₊₁ = C(n, r) · xⁿ⁻ʳ · yʳ in (x + y)ⁿ is the workhorse. Find which r gives the desired power, plug in. For coefficient relations across two expansions (1 + x)ᵖ(1 + x)ᵠ, combine them into (1 + x)ᵖ⁺ᵠ first — saves time.",
    ],
    exampleQuestionIds: [
      "7ed91931-9ea9-4958-b25a-e63cd64acf2f", // ΣC(n,r) = 2ⁿ minus C₀ (EASY)
      "940b78b6-8658-487f-a988-b1e678487093", // (1+x)^p(1+x)^q combine, find p+q (EASY)
      "2906ac99-772e-4d03-b1b4-d562a39173af", // (x+y)^10 coefficient statements (EASY)
      "ceac86fd-b1e8-4406-9a73-2d82d95a02eb", // C(51,21)-C(51,22)+... alternating sum (HARD)
    ],
    variants: [
      {
        name: "Σ C(n, r) = 2ⁿ",
        description:
          "Set x = 1 in (1 + x)ⁿ. Variants: Σ even-r = Σ odd-r = 2ⁿ⁻¹ (set x = ±1).",
      },
      {
        name: "Symmetry: C(n, r) = C(n, n − r)",
        description:
          "Symmetric around the middle. Combined with the binomial expansion: 'r-th from end' = 'r-th from start' (with shifted index).",
      },
      {
        name: "Pascal's rule: C(n, r) = C(n − 1, r − 1) + C(n − 1, r)",
        description:
          "Adjacent entries in Pascal's triangle. Used in recursive identities and the rule for C(n+1, r).",
      },
      {
        name: "General term Tᵣ₊₁ = C(n, r) · xⁿ⁻ʳ · yʳ",
        description:
          "The expansion's machinery. Find r so xⁿ⁻ʳyʳ matches the desired power, then evaluate the coefficient.",
      },
    ],
    relatedSlugs: [
      "ap-three-term",
      "vieta-symmetric-roots",
      "inclusion-exclusion",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "double-angle": {
    trigger:
      "The question contains sin 2θ, cos 2θ, tan 2θ — or an expression that reduces to one of them after simplification.",
    story: [
      "Three formulas, three sign conventions, the whole chapter: sin 2A = 2 sin A cos A; cos 2A = cos²A − sin²A = 1 − 2sin²A = 2cos²A − 1; tan 2A = 2 tan A / (1 − tan²A). The three forms of cos 2A matter: each is the right tool for a different shape of input.",
      "Double angle is the bank's hardest principle by HARD-rate (50%). The difficulty isn't the formula — it's recognising when an expression is secretly a double angle in disguise. (1 − tan²θ) / (1 + tan²θ) is cos 2θ. 2 sin θ cos θ is sin 2θ. cos²θ − sin²θ is cos 2θ. Recognising 'this is double angle' is half the work.",
      "Half-angle is the same principle in reverse. cos A = 1 − 2sin²(A/2) gives sin(A/2) = √[(1 − cos A) / 2]. Useful for problems where you have cos A and need sin(A/2) or vice versa. NDA's chord-length-from-central-angle question is a half-angle in disguise.",
    ],
    exampleQuestionIds: [
      "11a4e572-7237-4f86-ba79-0553538f0b11", // tan A = 1/7, cos 2A (EASY)
      "66231e5f-2ae9-4eaf-90b4-aaf0dd22f882", // x + 1/x = 2cos θ → x³ + 1/x³ (EASY)
      "b61b079d-706e-4533-a0bb-bd2b01605a82", // α + β = π/4, 2 tan α = 1, find tan 2β (MODERATE)
      "81a6e392-1bf7-4a17-a456-c7cd25c05949", // cos⁴(7π/8) + cos⁴(5π/8) (HARD)
    ],
    variants: [
      {
        name: "sin 2A = 2 sin A cos A",
        description:
          "Use the reverse direction when you see 2 sin A cos B — it collapses to sin(A + B) − sin(A − B) products.",
      },
      {
        name: "cos 2A — three forms",
        description:
          "cos²A − sin²A (works with both); 1 − 2 sin²A (use when you know sin A); 2 cos²A − 1 (use when you know cos A).",
      },
      {
        name: "tan 2A = 2 tan A / (1 − tan²A)",
        description:
          "Solve for tan A given tan 2A → quadratic in tan A. Sign of tan A by quadrant determines the root.",
      },
      {
        name: "Half-angle from cos A",
        description:
          "sin(A/2) = √[(1 − cos A) / 2], cos(A/2) = √[(1 + cos A) / 2]. Sign depends on which quadrant A/2 lives in.",
      },
    ],
    relatedSlugs: [
      "compound-angle",
      "triangle-a-plus-b-plus-c-pi",
      "vieta-symmetric-roots",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "triangle-a-plus-b-plus-c-pi": {
    trigger:
      "The question is set inside a triangle ABC and asks for a relation between the three angles or their trig functions.",
    story: [
      "In any triangle, A + B + C = π. From this single fact, an entire family of identities falls out: tan A + tan B + tan C = tan A · tan B · tan C; cos A + cos B + cos C = 1 + 4 sin(A/2) sin(B/2) sin(C/2); cos 2A + cos 2B + cos 2C = −1 − 4 cos A cos B cos C. NDA tests all of them, in different disguises.",
      "The trick: when you see 'in a triangle ABC', the third angle is always determined by the other two. So any expression in A, B, C that's symmetric under permutation reduces — often elegantly. cot A · cot B · cot C is the reciprocal of (tan A + tan B + tan C) divided by their product, both of which equal the same thing.",
      "Quadrant analysis pairs with this identity. If tan A · tan B · tan C > 0 in a triangle, all three tangents are positive (acute triangle) — the only way to have an odd-number-positive product with the sum-of-arguments equal to π. NDA's 'is this triangle acute / obtuse / right?' questions are quadrant questions, not geometry questions.",
    ],
    exampleQuestionIds: [
      "971d53bc-014b-44c1-ba4a-69665e9bc294", // tan A+tan B+tan C = k, find cot A cot B cot C (MODERATE)
      "71080148-6ac4-4a33-9219-8c63260ad810", // cot·cot·cot > 0 acute, tan·tan·tan > 0 obtuse (MODERATE)
      "473cfe1f-696d-44f0-a46c-95362d6e9798", // Sides 16/63/65, cos 2A+cos 2B+cos 2C (MODERATE)
      "ebdff27e-1d77-4b18-beaf-91e96aab40a5", // cos 2A+cos 2B+cos 2C = -1 (HARD)
    ],
    variants: [
      {
        name: "tan A + tan B + tan C = tan A · tan B · tan C",
        description:
          "Derived from tan(A + B) = tan(π − C) = −tan C, then rearrange. The cot version: cot A cot B + cot B cot C + cot C cot A = 1.",
      },
      {
        name: "cos 2A + cos 2B + cos 2C = −1 − 4 cos A cos B cos C",
        description:
          "Less famous but tested. Useful when the question involves double angles in a triangle.",
      },
      {
        name: "sin 2A + sin 2B + sin 2C = 4 sin A sin B sin C",
        description:
          "Sister identity to the cos 2 version. Always positive for any triangle.",
      },
      {
        name: "Half-angle identities (s = semi-perimeter)",
        description:
          "tan(A/2) = √[(s − b)(s − c) / (s(s − a))]. Bridges A+B+C=π to side-based formulas (Heron's, in-radius).",
      },
    ],
    relatedSlugs: [
      "sine-cosine-rules",
      "compound-angle",
      "double-angle",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "sine-cosine-rules": {
    trigger:
      "Triangle with some sides and angles known; solve for the rest, or find area / inradius / circumradius.",
    story: [
      "Sine rule: a / sin A = b / sin B = c / sin C = 2R, where R is the circumradius. Cosine rule: c² = a² + b² − 2ab cos C (and cyclic permutations). Between them, every 'solve the triangle' problem in NDA is one or two substitutions.",
      "Which rule to reach for? Sine rule works when you have a side opposite a known angle (SAS, AAS). Cosine rule works when you have all three sides (SSS) or two sides and the included angle (SAS-with-the-angle-between). The 2R version of sine rule is also the bridge to the circumradius — useful for in-radius / circumradius compound questions.",
      "Area: (1/2)·a·b·sin C — derived directly from sine rule. Heron's formula s(s − a)(s − b)(s − c) where s = (a+b+c)/2 is the SSS-only alternative, useful when you don't want to compute an angle first.",
    ],
    exampleQuestionIds: [
      "a13b4307-c04e-485d-a135-a3ab450c5b05", // a=10, c=4, B=30°, area (EASY)
      "793b1627-e00a-49c5-b378-6cfd49077659", // angles 1:1:4, longest side 3, perimeter (MODERATE)
      "f9ef6447-c075-440c-8599-e7b7392e8911", // sin(A-B)/sin(A+B) using sine rule (MODERATE)
      "b9667d22-b6da-4750-a156-60efe1bf34e1", // a=4, b=3, c=2, cos 3C (HARD: cosine rule + triple angle)
    ],
    variants: [
      {
        name: "Sine rule: a / sin A = 2R",
        description:
          "R is the circumradius. Diameter of the circumscribed circle = 2R.",
      },
      {
        name: "Cosine rule: c² = a² + b² − 2ab cos C",
        description:
          "Pythagorean theorem generalised — when C = π/2, cos C = 0 and you recover c² = a² + b².",
      },
      {
        name: "Area = (1/2) · a · b · sin C",
        description:
          "Most common area formula. Variants: (1/2)·base·height (when height is given), or Heron's for SSS.",
      },
      {
        name: "Projection formula: a = b cos C + c cos B",
        description:
          "Often used to eliminate cos terms when the cosine rule produces unpleasant algebra.",
      },
    ],
    relatedSlugs: [
      "triangle-a-plus-b-plus-c-pi",
      "compound-angle",
      "double-angle",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "standard-limits-lhopital": {
    trigger:
      "The expression is an indeterminate form (0/0, ∞/∞, ∞ − ∞) at the limit point.",
    story: [
      "Three standard limits cover ~70% of NDA's evaluable cases. lim x→0 sin x / x = 1 (extends to sin kx / x = k). lim x→0 (1 + x)^(1/x) = e (and lim x→∞ (1 + 1/x)ˣ = e). lim x→0 (aˣ − 1) / x = ln a. Recognise the shape; substitute; done.",
      "When the form is 0/0 or ∞/∞ and not a standard limit, L'Hôpital's rule applies: differentiate numerator and denominator separately. Iterate if you're still in indeterminate territory. NDA's HARD limit questions are usually L'Hôpital with a trick — rationalisation or factoring first.",
      "Rationalisation handles square-root indeterminates: multiply numerator and denominator by the conjugate to flip 0/0 to a computable form. The 1 − cos kx family in disguise — '√(1 − cos 4x)' is √(2 sin² 2x) = √2 · |sin 2x|, which becomes 2 sin 2x near 0. Recognising 'this is 1 − cos in disguise' is the trick.",
    ],
    exampleQuestionIds: [
      "0f10e789-7f80-4f47-bf55-85c3acdbac7e", // (x³+x²)/(x²+3x+2) at -1 (EASY, factor)
      "296fc09e-b94c-4af1-a963-69e2e90b05b3", // (x^(n²-1)-1)/(x^(n+1)-1) at 1 (EASY, standard form)
      "8595742b-2269-49aa-a5a9-6e615a2b8261", // x/√(1-cos 4x) at 0 (MODERATE, rationalise)
      "7095622e-4014-4bad-9b67-e8f4a9476d25", // (a^x-x^a)/(x^a-a^a)=-1 find a (HARD, L'Hôpital)
    ],
    variants: [
      {
        name: "lim x→0 sin x / x = 1",
        description:
          "The base trig limit. Extends to lim sin(kx) / x = k and lim tan(kx) / x = k.",
      },
      {
        name: "lim x→∞ (1 + 1/x)ˣ = e",
        description:
          "And lim x→0 (1 + x)^(1/x) = e. Used in compound-interest and growth-rate questions.",
      },
      {
        name: "lim x→0 (aˣ − 1) / x = ln a",
        description:
          "For any positive a ≠ 1. When a = e, ln a = 1.",
      },
      {
        name: "L'Hôpital's rule: differentiate top and bottom",
        description:
          "For 0/0 or ∞/∞. lim f(x)/g(x) = lim f'(x)/g'(x) under indeterminacy. Iterate if needed.",
      },
    ],
    relatedSlugs: [
      "modulus-absolute-value",
      "continuity-conditions",
      "differentiability-conditions",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "continuity-conditions": {
    trigger:
      "The function is piecewise, or you need to check continuity at a specific point.",
    story: [
      "f is continuous at x = c iff three things hold: f(c) exists, lim x→c f(x) exists, and the two are equal. Equivalently: left limit = right limit = f(c). NDA tests this directly (\"is f continuous at x = 0?\") and indirectly (\"find a, b so that f is continuous\" — a system of equations).",
      "The standard trap setup: piecewise function with three pieces — value below the split, value at the split (often a single number), value above the split. Equate left limit with f(c), then equate right limit with f(c). Two equations, often two unknowns.",
      "Composed and oscillatory functions add subtlety. f(x) = sin(1/x²) for x ≠ 0 — does redefining f(0) = 0 give a continuous function? No: oscillation continues with no limit as x → 0. NDA loves this trap. Recognise 'sin of 1/x' or 'cos of 1/x' as the oscillation signature.",
    ],
    exampleQuestionIds: [
      "b9120137-4bbf-4294-96e8-ad42aff914f7", // |x|-1 statements (EASY)
      "6f4eb4a1-ec23-4550-9701-2ae0e01fec8e", // differentiable ⇒ continuous (EASY)
      "d4c835b2-072c-4451-9efa-0b6a5d7ee46d", // piecewise find a+b (MODERATE)
      "6e2c62e9-1510-4d59-8b19-e14e749516cc", // f(x) = [x]² - x² at 0 / at 1 (HARD)
    ],
    variants: [
      {
        name: "Left limit = right limit = f(c)",
        description:
          "All three must be equal AND finite. If any of the three fails, f is discontinuous at c.",
      },
      {
        name: "Piecewise continuity",
        description:
          "At the split, set f(left limit) = f(value at split) = f(right limit). Solves for unknown coefficients.",
      },
      {
        name: "Differentiable ⇒ continuous",
        description:
          "But not the converse. f(x) = |x| is continuous everywhere but not differentiable at 0.",
      },
      {
        name: "Oscillatory non-continuity",
        description:
          "sin(1/x) or cos(1/x) at x = 0: no limit exists, so no continuous extension is possible.",
      },
    ],
    relatedSlugs: [
      "differentiability-conditions",
      "modulus-absolute-value",
      "standard-limits-lhopital",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "differentiability-conditions": {
    trigger:
      "Asked whether a function (often piecewise, |x|, or [x]) is differentiable at a point.",
    story: [
      "f is differentiable at x = c iff the left and right derivatives exist AND are equal. The left derivative is lim h→0⁻ [f(c + h) − f(c)] / h, the right is lim h→0⁺ [f(c + h) − f(c)] / h.",
      "|x| is the canonical counter-example to 'continuous ⇒ differentiable'. At x = 0, the left derivative is −1, the right derivative is +1. Continuous (left limit = right limit = f(0) = 0), but not differentiable (slopes differ).",
      "[x] (greatest integer function) is worse: at every integer, [x] jumps by 1. The derivative is 0 on every open interval (n, n+1), but undefined at integers. NDA tests this in derivative-of-floor questions — the answer is almost always 0 on the interior, undefined at the endpoint.",
    ],
    exampleQuestionIds: [
      "f10d98eb-e52c-47a0-87e4-78b61ca192e0", // d/dx (x/|x|) for x<0 (EASY)
      "6f6a1ee1-869e-4c41-b606-783a12efff57", // e^|x| (EASY)
      "9943643d-bcde-41fd-ba82-b6e87e5b2ba6", // y = [x+1] at x=-3.5 (EASY)
      "2c705cb2-aa60-4819-9419-545295fcbd9a", // |x|+1 * [x]-1 product, multiple statements (MODERATE)
    ],
    variants: [
      {
        name: "Left derivative = Right derivative",
        description:
          "Test both sides separately. If left and right slopes differ, f is not differentiable at the point.",
      },
      {
        name: "Non-differentiability of |x| at 0",
        description:
          "Sharpest corner — slopes are −1 and +1. f(x) = |x − a| is non-differentiable at x = a.",
      },
      {
        name: "[x] derivative on (n, n+1)",
        description:
          "Equals 0 on the open interval (constant in between). Undefined at integers (jump discontinuity).",
      },
      {
        name: "Composition: e^|x|, ln |x|, etc.",
        description:
          "Often differentiable everywhere EXCEPT at the modulus's split point. Chain rule confirms.",
      },
    ],
    relatedSlugs: [
      "continuity-conditions",
      "modulus-absolute-value",
      "extrema-derivatives",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "extrema-derivatives": {
    trigger:
      "Find a maximum, minimum, or critical point of a differentiable function — or check whether a function is increasing / decreasing.",
    story: [
      "At a local extremum of a differentiable function, f'(x) = 0. That's the first-derivative test. The second-derivative test then classifies: f''(x) < 0 → local max; f''(x) > 0 → local min; f''(x) = 0 → inconclusive (need higher derivatives or a sign-change check).",
      "Monotonicity is a related, lighter check: f'(x) > 0 throughout an interval ⇒ f is increasing there. NDA tests this with conditions on parameters — 'for what range of k is f(x) = x² − kx increasing on (1, ∞)?' — solve f'(x) > 0 for the appropriate constraint on k.",
      "For functions where calculus is hard but AM-GM is easy, the answer often falls out of the inequality. f(x) = x + 1/x has its minimum at x = 1 by AM-GM (or by f'(x) = 1 − 1/x² = 0). Both methods give x = 1 and f(1) = 2. The skill is recognising when each is faster.",
    ],
    exampleQuestionIds: [
      "1ae142a5-88c8-49fb-9138-f48c3da99fc3", // local max at 0 properties (EASY)
      "61249d42-a525-40fe-98ce-ea3bfeb8c12f", // x + 1/x local max < local min (MODERATE)
      "25b913ec-a83a-461e-85bd-7f106631359d", // x³+x²+kx no local extremum (MODERATE)
      "07f7c2f3-3c84-478e-827e-32aaf1eb3b2a", // x/ln x — full extrema analysis (HARD)
    ],
    variants: [
      {
        name: "First-derivative test: f'(x) = 0 at extrema",
        description:
          "Solve f'(x) = 0 to find critical points. Then classify by sign change of f' or by f''.",
      },
      {
        name: "Second-derivative test for classification",
        description:
          "f''(c) > 0 ⇒ local min at c; f''(c) < 0 ⇒ local max at c. If f''(c) = 0, inconclusive.",
      },
      {
        name: "Increasing / decreasing intervals",
        description:
          "f'(x) > 0 on I ⇒ f increasing on I; f'(x) < 0 ⇒ decreasing. Used for parametric monotonicity questions.",
      },
      {
        name: "No-extremum condition: f' never zero",
        description:
          "For cubic f(x) = ax³ + bx² + cx + d, no real extremum iff discriminant of f'(x) is negative.",
      },
    ],
    relatedSlugs: [
      "am-gm-mean-inequalities",
      "differentiability-conditions",
      "continuity-conditions",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "kings-property-integrals": {
    trigger:
      "A definite integral that looks unevaluable, but the integrand splits into pieces that telescope under x → (a − x) or x → (a + b − x).",
    story: [
      "King's property: ∫₀^a f(x)dx = ∫₀^a f(a − x)dx. Adding the two and dividing by 2 turns the integrand into [f(x) + f(a − x)] / 2 — which often simplifies dramatically. The classic NDA shape: ∫₀^a f(a − x) / [f(x) + f(a − x)] dx = a/2. The numerator and denominator telescope after substitution.",
      "Sister properties: odd / even function integrals over symmetric intervals. ∫₋ₐ^a (odd) dx = 0; ∫₋ₐ^a (even) dx = 2 ∫₀^a. Always check parity before computing — many NDA integrals collapse to 0 instantly.",
      "Combined version: integrand = odd + even. The odd part vanishes; only the even part survives. Question stems with sums of trig × exponentials almost always have this structure (one term odd, one term even).",
    ],
    exampleQuestionIds: [
      "31cc7adc-00ca-437e-8724-bf8ae44695d8", // ∫₀ᵃ f(a-x)/(f(x)+f(a-x)) dx (EASY)
      "55cdc03f-3be6-4b3b-909d-4e93c1e85778", // ∫₋₁¹ odd integrand → 0 (EASY)
      "0886bac8-80a0-4464-ad51-5f0b1382d20b", // ∫₋π/2^π/2 odd+even split (MODERATE)
      "1488d4f1-a80c-4351-bdc3-545e9cfb41fd", // ∫₀^π ln(tan x/2) using King's (MODERATE)
    ],
    variants: [
      {
        name: "King's property: ∫₀^a f(x) = ∫₀^a f(a − x)",
        description:
          "Substitute u = a − x. The integral is unchanged in value but the integrand is now f(a − x).",
      },
      {
        name: "Odd function: ∫₋ₐ^a (odd) = 0",
        description:
          "If f(−x) = −f(x), the integral over a symmetric interval is zero. Check parity first.",
      },
      {
        name: "Even function: ∫₋ₐ^a (even) = 2 ∫₀^a",
        description:
          "If f(−x) = f(x), the integral over a symmetric interval doubles the half-range integral.",
      },
      {
        name: "f(x) + f(a − x) simplifying",
        description:
          "Adding King's variants: 2I = ∫₀^a [f(x) + f(a − x)]dx. The sum often telescopes to a constant.",
      },
    ],
    relatedSlugs: [
      "compound-angle",
      "double-angle",
      "modulus-absolute-value",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "determinant-properties": {
    trigger:
      "A determinant with symbolic entries — evaluate, find a value of a parameter, or check when it vanishes.",
    story: [
      "Six properties cover ~90% of NDA's determinant questions. (1) Swapping two rows / columns flips the sign. (2) Two equal rows / columns make det = 0. (3) Multiplying one row / column by k multiplies the det by k. (4) det(A^T) = det(A). (5) det(AB) = det(A) det(B). (6) Adding a multiple of one row to another leaves the det unchanged — the workhorse for row reduction.",
      "The strategy for symbolic determinants is almost always row / column operations until two columns become equal (giving zero) or a column becomes all-zero. Specifically: R₁ → R₁ + R₂ + R₃ often turns the first column into a sum, which can be factored out — the symmetric-matrix trick.",
      "When the determinant equals zero, the matrix is singular. NDA's 'find k such that det = 0' questions are eigenvalue questions in disguise. The 'when does det vanish' family covers a + b + c = 0 (sum-row trick) and pairwise equality (row equality).",
    ],
    exampleQuestionIds: [
      "8e591b11-6dc1-4817-bbe2-c9197e52911c", // det(AB) = det(BA) for 2x2 (EASY)
      "ca983083-fa6c-4a8e-ada8-a7353e9cd668", // det = 0, find x (MODERATE)
      "3bcc15b0-00ff-498c-944c-b86746150eb1", // Σ |M_k| pattern (MODERATE)
      "9f108e52-3784-404f-8aac-cf4d201a1862", // When does det(a,b,c;b,c,a;c,a,b) vanish (HARD)
    ],
    variants: [
      {
        name: "Row / column swap flips sign",
        description:
          "Each swap multiplies det by −1. Even swaps preserve sign; odd swaps invert.",
      },
      {
        name: "R_i → R_i + k·R_j (invariant)",
        description:
          "Adding a multiple of one row to another doesn't change the determinant. The primary tool for row-reduction to upper triangular.",
      },
      {
        name: "Singular matrix: det = 0",
        description:
          "Equivalent to: rows / columns linearly dependent; inverse doesn't exist; homogeneous system has non-trivial solution.",
      },
      {
        name: "Cyclic / symmetric matrix trick",
        description:
          "For (a, b, c; b, c, a; c, a, b), R₁ → R₁ + R₂ + R₃ gives (a+b+c) in every column of row 1, factoring out as (a+b+c) · det of simpler matrix.",
      },
    ],
    relatedSlugs: [
      "vieta-symmetric-roots",
      "binomial-coefficient-identities",
      "cube-roots-of-unity",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "central-tendency-statistics": {
    trigger:
      "Compute mean, median, or mode of a data set — direct, transformed, or for a frequency distribution.",
    story: [
      "Mean is the arithmetic average: x̄ = (Σ xᵢ · fᵢ) / N. Median is the middle value when sorted (interpolate for even N or grouped data). Mode is the most frequent value. For symmetric distributions all three agree; for skewed distributions, the empirical relation Mode = 3·Median − 2·Mean usually holds.",
      "Most NDA central-tendency questions are pure substitution. The traps come in three flavours: (1) which mean (arithmetic, geometric, harmonic)? — match to the type of data, (2) grouped vs ungrouped — grouped data uses class boundaries and interpolation, (3) effect of transformation — if y = ax + b, then ȳ = a·x̄ + b but the variance is a²·σ².",
      "Geometric and harmonic means appear when the data has multiplicative or rate-of-change structure. Average speed over equal distances uses HM, not AM. Compound growth rate uses GM. Memorise: AM ≥ GM ≥ HM, with equality iff all values equal.",
    ],
    exampleQuestionIds: [
      "4bd4c8d9-c625-4b44-b09e-da16e52b7b49", // AM of 8², ..., 15² (MODERATE)
      "b76c9357-8996-452e-8c32-7ed039ec57f5", // Find median (MODERATE)
      "599b1022-193e-44f0-9c08-3d0774b8b0c1", // Mean of squares = 130, find n (MODERATE)
      "2ed4b11a-5141-42fd-b721-9f8e4c1460c0", // 5P=4Q=R/2 empirical relation (HARD)
    ],
    variants: [
      {
        name: "Mean: x̄ = Σ fᵢ xᵢ / Σ fᵢ",
        description:
          "Weighted average for frequency distributions. For ungrouped data, x̄ = Σ xᵢ / n.",
      },
      {
        name: "Median by position / interpolation",
        description:
          "Position = (N+1)/2 for ungrouped. For grouped data, find median class then interpolate within.",
      },
      {
        name: "Mode: most frequent observation",
        description:
          "For grouped data, mode = L + h · (f₁ − f₀) / (2f₁ − f₀ − f₂), where L is the modal class lower bound.",
      },
      {
        name: "Empirical relation: Mode = 3·Median − 2·Mean",
        description:
          "Holds approximately for moderately skewed distributions. Convert between any two if the third is given.",
      },
    ],
    relatedSlugs: [
      "am-gm-mean-inequalities",
      "inclusion-exclusion",
      "binomial-coefficient-identities",
    ],
  }
};

/** Slugs with detail pages ready. Used by generateStaticParams. */
export const DETAIL_SLUGS = Object.keys(PRINCIPLE_DETAILS);
