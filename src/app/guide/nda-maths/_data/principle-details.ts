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
  /** 3 cross-link slugs to related principles in the TOP_PRINCIPLES. */
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
      "ap-three-term",
      "vieta-symmetric-roots",
      "compound-angle",
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
      "95079d62-efcb-4dea-8eb3-3a0590a6880c", // α²-β²=16 → use (α-β)(α+β) structure (Quad Eq, EASY)
      "47f7748f-de22-4166-bdc0-844666002769", // 2-i√3 is root of x²+ax+b → conjugate-root + Vieta (Complex Numbers, MOD)
      "6531efe3-56e2-457a-a839-9cdcb95b8f4c", // tan α, tan β roots, cos(2α+2β) (Trig Identities cross-chapter, MOD)
      "be61f625-1e50-4385-9512-76bcc21ab01e", // α, β roots of 1+x+x²=0 → matrix product (M&D + ω + Vieta triple compound, HARD)
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
      "ae62e269-8a7d-4c2c-830f-9f0219aaa2df", // p,q,r,s in AP, p+s=8, qr=15 → direct 2b=a+c (S&S, EASY)
      "467b7926-2c25-428a-8ddf-fa4b13877e74", // x², x, -8 in AP → solve 2x = x²-8 (S&S, EASY)
      "f90c8cbb-ab31-4ff6-9be8-c592495b57e3", // angles of triangle in AP, b:c=√3:√2 → 2B = A+C + A+B+C=π (Properties of Triangle, MOD)
      "8181c432-89e0-45cc-b270-cf5275e02596", // C(n,4), C(n,5), C(n,6) in AP → find n (P&C cross-chapter, HARD)
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
      "am-gm-mean-inequalities",
      "binomial-coefficient-identities",
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
      "sine-cosine-rules",
      "vieta-symmetric-roots",
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
      "binomial-coefficient-identities",
      "ap-three-term",
      "vieta-symmetric-roots",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "modulus-absolute-value": {
    trigger:
      "The expression contains |·| — or a square root of something squared, which is |·| in disguise.",
    story: [
      "|x| splits at zero: equals x for x ≥ 0, equals −x for x < 0. That single split drives every modulus question in NDA. Left and right limits diverge at the split point; the function is continuous there but not differentiable.",
      "The principle has been on a tear since 2023 — modulus roughly doubled from about 7 questions per paper-set (2017–22) to about 14 (2023–26), and it has held there for four straight sittings. It now reaches 11 chapters, the widest spread of any principle in the bank: Limits & Continuity, Differentiation, Definite and Indefinite Integration, Apps of Integration, Functions, Quadratic Equations, Sets & Relations, Linear Inequalities, App of Derivatives and Probability. The technique is the same everywhere: split at the zero, handle each piece separately, recombine.",
      "Differentiability is where it is tested hardest. f is differentiable at c only if the left and right derivatives both exist AND agree, and |x| is the canonical counter-example to 'continuous ⇒ differentiable' — at 0 the slopes are −1 and +1. Beware the trap in the other direction: x|x| contains a modulus and IS differentiable at 0, because both one-sided derivatives come out to 0.",
      "Learn to spot the disguise. √(x²) is |x|, not x — so −x/√(x²) is really −x/|x|, a sign function. √(1 − sin 2x) is √((sin x − cos x)²) = |sin x − cos x|, and which branch you take depends entirely on the interval you are given: on (0, π/4) cosine wins, on (π/4, π/2) sine does. The bank sets that same expression twice, once to differentiate and once to integrate, with opposite sign resolutions.",
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
        name: "Hidden modulus: √(f²) = |f|",
        description:
          "A square root of a perfect square is a modulus, never the bare expression. √(x²) = |x|; √(1 − sin 2x) = |sin x − cos x|. The given interval decides the sign.",
      },
      {
        name: "The x|x| trap",
        description:
          "Contains a modulus yet IS differentiable at 0 — both one-sided derivatives are 0. Presence of |·| is not proof of a corner; always test both sides.",
      },
    ],
    relatedSlugs: [
      "greatest-integer-function",
      "piecewise-defined-functions",
      "am-gm-mean-inequalities",
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
      "sine-cosine-rules",
      "vieta-symmetric-roots",
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
      "compound-angle",
      "double-angle",
      "vieta-symmetric-roots",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "greatest-integer-function": {
    trigger:
      "The expression contains [x], ⌊x⌋, or the words 'greatest integer' / 'integral part'.",
    story: [
      "[x] is the largest integer not exceeding x: [2.7] = 2, [3] = 3, and — the one students get wrong — [−2.7] = −3, not −2. It is constant on each interval [n, n+1) and jumps by exactly 1 at every integer. Think of it as the modulus's discrete cousin: also piecewise, but with jumps instead of a corner.",
      "Everything NDA asks lives at the integer boundary. Approaching an integer from the left and the right gives values differing by 1, so the two-sided limit never exists there. The derivative is 0 on every open interval (n, n+1) — the function is flat — and undefined at the integers themselves. A derivative-of-floor question asked strictly between two integers is therefore almost always answered 0, and that is the whole question.",
      "The fractional part {x} = x − [x] is the other half of the same identity, and it is periodic with period 1. That periodicity is what makes ∫ from n to n+1 of (x − [x]) dx the same for every n. For integrals of [x] or [x²] over a range, split the range at each integer where the floor value changes, evaluate a constant on each piece, and add — for [x²] the breakpoints are at √2, √3, 2 and so on, not at the integers.",
    ],
    exampleQuestionIds: [
      "9943643d-bcde-41fd-ba82-b6e87e5b2ba6", // d/dx of [x+1] on (-4,-3) — floor-interior derivative is 0 (EASY, Differentiation)
      "30d02af7-d3fb-4c39-827a-fde62770d669", // ∫ₙ^{n+1}(x-[x])dx — fractional part, period 1 (EASY, Definite Integration)
      "33c569a9-a9b1-4fbb-962d-74086fda3858", // ∫₀^√2 [x²]dx — breakpoint at 1, not at an integer of x (MODERATE, Definite Integration)
      "df5bbe2a-50b6-4a4b-8192-5dae24d84715", // LHD of [x]sin(πx) at integer k (HARD, Limits & Continuity)
    ],
    variants: [
      {
        name: "Negative arguments",
        description:
          "[−2.7] = −3. The floor goes DOWN, away from zero, for negatives. The single most common slip.",
      },
      {
        name: "One-sided limits at an integer",
        description:
          "lim x→n⁻ [x] = n − 1 and lim x→n⁺ [x] = n. They differ by 1, so the two-sided limit never exists at an integer.",
      },
      {
        name: "Derivative: 0 inside, undefined at the ends",
        description:
          "Constant on (n, n+1) ⇒ derivative 0 there. At each integer there is a jump, so no derivative exists.",
      },
      {
        name: "Fractional part {x} = x − [x]",
        description:
          "Periodic with period 1 and always in [0, 1). Turns an awkward floor integral into the same integral on every unit interval.",
      },
      {
        name: "Splitting ∫[f(x)] dx",
        description:
          "Break the range wherever the floor value changes. For [x²] on [0, 2] the breakpoints are √2 and √3, not the integers.",
      },
    ],
    relatedSlugs: [
      "modulus-absolute-value",
      "piecewise-defined-functions",
      "inclusion-exclusion",
    ],
  },

  /* ────────────────────────────────────────────────────────────────────── */
  "piecewise-defined-functions": {
    trigger:
      "f is given by cases, and the question asks about continuity, a limit, or differentiability at a join.",
    story: [
      "A function defined by cases is easy everywhere except at the joins, and the joins are the only place NDA ever asks. Away from a breakpoint the function is just whichever ordinary expression applies, so all the work is at the boundary between two pieces.",
      "Two tests, in strict order. For CONTINUITY at c you need the left limit, the right limit and f(c) itself to be one and the same number — and f(c) is the piece the definition assigns AT c, which is frequently a third, separate line of the definition. For DIFFERENTIABILITY at c you need continuity first, and then the left and right derivatives to agree as well. Differentiability implies continuity; continuity never implies differentiability.",
      "This is how NDA hides simultaneous equations inside a limits question. 'Find a and b such that f is continuous' gives you one equation per join; 'such that f is differentiable' gives you two per join — one matching values, one matching slopes. A three-case definition with two unknowns is a two-equation solve wearing a disguise, and the printed answer is usually a + b rather than either separately.",
    ],
    exampleQuestionIds: [
      "da8ba5f8-54e2-447a-9166-07263f585b8c", // k making (sin x)/x continuous at 0 (EASY, Limits & Continuity)
      "1264ec7b-6334-4a87-8f08-1c5678a0c360", // find k for a two-case definition (EASY, Limits & Continuity)
      "d4c835b2-072c-4451-9efa-0b6a5d7ee46d", // a+bx, 5, b-ax continuous at 1 — the middle case IS f(1) (MODERATE, Limits & Continuity)
      "d41fa32c-cde9-4247-8f76-06da4cf721b0", // differentiable at x=1 ⇒ a+b — LHD=RHD parameter lever (HARD, Differentiation)
    ],
    variants: [
      {
        name: "Continuity at the join",
        description:
          "Left limit = right limit = f(c). Gives one equation per breakpoint. Missing that f(c) is its own case is the usual error.",
      },
      {
        name: "Differentiability at the join",
        description:
          "Continuity first, then left derivative = right derivative. Two conditions, so two equations — enough to pin two unknowns.",
      },
      {
        name: "Solving for parameters",
        description:
          "'Find a and b so that f is continuous/differentiable' is a simultaneous-equation problem. The answer asked for is often a + b.",
      },
      {
        name: "Removable vs jump discontinuity",
        description:
          "If the one-sided limits agree but differ from f(c), redefining f(c) repairs it. If they disagree, nothing can.",
      },
      {
        name: "Definitions given in prose",
        description:
          "Not every piecewise function is typeset with a brace — 'f(x) = ax/(x+1) + b, x < 1 and √(x−1), 1 ≤ x ≤ 2' is the same object.",
      },
    ],
    relatedSlugs: [
      "modulus-absolute-value",
      "greatest-integer-function",
      "am-gm-mean-inequalities",
    ],
  },

};

/** Slugs with detail pages ready. Used by generateStaticParams. */
export const DETAIL_SLUGS = Object.keys(PRINCIPLE_DETAILS);
