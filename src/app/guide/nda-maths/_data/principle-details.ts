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
};

/** Slugs with detail pages ready. Used by generateStaticParams. */
export const DETAIL_SLUGS = Object.keys(PRINCIPLE_DETAILS);
