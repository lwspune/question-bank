import type { SubtopicNote } from "@/app/notes/_types";

export const SCALAR_TRIPLE_PRODUCT_NOTE: SubtopicNote = {
  subtopicName: "Scalar Triple Product, Coplanarity, and Volume",
  title: "Scalar Triple Product, Coplanarity, and Volume",
  oneLineDefinition:
    "The single number [a b c] = a·(b×c) — the signed volume of the box on three vectors. It is zero exactly when they are coplanar, its modulus is the parallelepiped volume, and it powers the chapter's hardest pool: volumes, coplanarity, and the vector triple product.",
  whyItMatters:
    "At 56 PYQs this is the chapter's BIGGEST subtopic and its hardest — about 77% are rated HARD. " +
    "The scalar triple product [a b c] is the workhorse: it is the signed volume of the parallelepiped, the modulus is the actual volume, one-sixth of it is the tetrahedron volume, and it vanishes precisely when the three vectors are coplanar. " +
    "The same determinant drives parameter-finding (coplanarity), min/max volume problems, and the linearity identities like [a+b  b+c  c+a] = 2[a b c]; the vector triple product (BAC-CAB rule) finishes the set with angle and orthogonal-coplanar problems. " +
    "Master the determinant, the cyclic/sign rules, and BAC-CAB and the chapter's HARD tail collapses.",
  concepts: [
    // 1 — FOUNDATION (no pyqExampleId) ─────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-foundation-determinant",
      name: "The scalar triple product — dot-cross and determinant form",
      intuition:
        "The scalar triple product takes THREE vectors and returns a single NUMBER: dot one vector into the cross product of the other two. " +
        "You almost never compute it from the geometry — you write the three vectors as the rows of a 3x3 determinant and evaluate it. " +
        "Geometrically that number is the signed volume of the box (parallelepiped) built on the three vectors.",
      definition:
        "For \\(\\vec{a} = a_1\\hat{i}+a_2\\hat{j}+a_3\\hat{k}\\), \\(\\vec{b} = b_1\\hat{i}+b_2\\hat{j}+b_3\\hat{k}\\), \\(\\vec{c} = c_1\\hat{i}+c_2\\hat{j}+c_3\\hat{k}\\):\n" +
        "- **Notation:** \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) — a single scalar\n" +
        "- **Determinant form (the workhorse):** \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}\\)\n" +
        "- **Dot-cross interchange:** \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\times\\vec{b})\\cdot\\vec{c}\\) — the dot and cross can swap places without changing the value\n" +
        "- **Geometric meaning:** \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) is the SIGNED volume of the parallelepiped with edge vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\)",
      formula: {
        label: "Scalar triple product as a determinant",
        latex:
          "[\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
        symbols: [
          { symbol: "Rows", meaning: "the components of \\(\\vec{a}, \\vec{b}, \\vec{c}\\) in order" },
          { symbol: "\\((\\vec{a}\\times\\vec{b})\\cdot\\vec{c}\\)", meaning: "equal value — dot and cross interchange" },
          { symbol: "\\([\\hat{i}\\ \\hat{j}\\ \\hat{k}]\\)", meaning: "\\(= 1\\), the unit box" },
        ],
      },
      authoredExample: {
        prompt:
          "Evaluate \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) for \\(\\vec{a} = \\hat{i} + 2\\hat{j} + \\hat{k}\\), \\(\\vec{b} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\) and \\(\\vec{c} = \\hat{i} + \\hat{k}\\).",
        steps: [
          "Stack the components as rows: \\(\\begin{vmatrix} 1 & 2 & 1 \\\\ 2 & -1 & 3 \\\\ 1 & 0 & 1 \\end{vmatrix}\\).",
          "Expand along the first row: \\(1\\cdot[(-1)(1) - (3)(0)] - 2\\cdot[(2)(1) - (3)(1)] + 1\\cdot[(2)(0) - (-1)(1)]\\).",
          "Simplify: \\(1\\cdot(-1) - 2\\cdot(-1) + 1\\cdot(1) = -1 + 2 + 1 = 2\\).",
        ],
        answer: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 2\\)",
      },
      practiceSet: [
        { prompt: "Write \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) as a dot-cross.", answer: "\\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\)" },
        { prompt: "\\([\\hat{i}\\ \\hat{j}\\ \\hat{k}] = ?\\)", answer: "\\(1\\)" },
        { prompt: "\\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) equals which other dot-cross?", answer: "\\((\\vec{a}\\times\\vec{b})\\cdot\\vec{c}\\)" },
        { prompt: "The scalar triple product is a number or a vector?", answer: "a number (scalar)" },
      ],
      traps: [
        {
          title: "The scalar triple product is a SCALAR",
          body:
            "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) is a single number. " +
            "The vector triple product \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) is a VECTOR. Identify which one the question asks for before choosing an identity.",
        },
        {
          title: "Dot and cross can swap, but keep the order of the three vectors",
          body:
            "\\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\times\\vec{b})\\cdot\\vec{c}\\) — moving the dot/cross is free. " +
            "But swapping two of the three vectors themselves flips the sign (see the cyclic-and-sign concept next).",
        },
      ],
    },

    // 2 — FOUNDATION (no pyqExampleId) ─────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-foundation-cyclic-sign",
      name: "Cyclic and sign properties of the scalar triple product",
      intuition:
        "Rotating the three vectors round in a cycle leaves the scalar triple product unchanged; swapping any two of them flips its sign. " +
        "And if any vector repeats, the box is flat — the product is zero. " +
        "These three rules let you simplify almost any [a b c] expression before touching a determinant.",
      definition:
        "For any \\(\\vec{a}, \\vec{b}, \\vec{c}\\):\n" +
        "- **Cyclic (rotation is free):** \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = [\\vec{b}\\ \\vec{c}\\ \\vec{a}] = [\\vec{c}\\ \\vec{a}\\ \\vec{b}]\\)\n" +
        "- **Swap flips the sign:** \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = -[\\vec{b}\\ \\vec{a}\\ \\vec{c}] = -[\\vec{a}\\ \\vec{c}\\ \\vec{b}]\\)\n" +
        "- **Repeated vector ⇒ zero:** \\([\\vec{a}\\ \\vec{a}\\ \\vec{b}] = 0\\) (two equal rows make the determinant vanish)\n" +
        "- **Linearity in each slot:** \\([\\alpha\\vec{u}+\\beta\\vec{v}\\ \\ \\vec{b}\\ \\ \\vec{c}] = \\alpha[\\vec{u}\\ \\vec{b}\\ \\vec{c}] + \\beta[\\vec{v}\\ \\vec{b}\\ \\vec{c}]\\)",
      formula: {
        label: "Cyclic and swap rules",
        latex:
          "[\\vec{a}\\ \\vec{b}\\ \\vec{c}] = [\\vec{b}\\ \\vec{c}\\ \\vec{a}] = [\\vec{c}\\ \\vec{a}\\ \\vec{b}] = -[\\vec{b}\\ \\vec{a}\\ \\vec{c}]",
        symbols: [
          { symbol: "Cyclic rotation", meaning: "\\(\\vec{a}\\to\\vec{b}\\to\\vec{c}\\to\\vec{a}\\): value unchanged" },
          { symbol: "One swap", meaning: "value negated" },
          { symbol: "Repeated row", meaning: "value \\(= 0\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Simplify \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] + [\\vec{b}\\ \\vec{c}\\ \\vec{a}] - [\\vec{b}\\ \\vec{a}\\ \\vec{c}]\\).",
        steps: [
          "Cyclic: \\([\\vec{b}\\ \\vec{c}\\ \\vec{a}] = [\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
          "One swap: \\([\\vec{b}\\ \\vec{a}\\ \\vec{c}] = -[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\), so \\(-[\\vec{b}\\ \\vec{a}\\ \\vec{c}] = +[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
          "Total: \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] + [\\vec{a}\\ \\vec{b}\\ \\vec{c}] + [\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 3[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
        ],
        answer: "\\(3[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)",
      },
      practiceSet: [
        { prompt: "\\([\\vec{b}\\ \\vec{c}\\ \\vec{a}] = ?\\) in terms of \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).", answer: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)", method: "cyclic rotation" },
        { prompt: "\\([\\vec{a}\\ \\vec{c}\\ \\vec{b}] = ?\\)", answer: "\\(-[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)", method: "one swap" },
        { prompt: "\\([\\vec{a}\\ \\vec{a}\\ \\vec{c}] = ?\\)", answer: "\\(0\\)", method: "repeated vector" },
        { prompt: "\\([2\\vec{a}\\ \\vec{b}\\ \\vec{c}] = ?\\)", answer: "\\(2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)", method: "linearity" },
      ],
      traps: [
        {
          title: "Cyclic keeps the value; ANY single swap negates it",
          body:
            "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = [\\vec{b}\\ \\vec{c}\\ \\vec{a}]\\) (cyclic, same value), but \\([\\vec{a}\\ \\vec{c}\\ \\vec{b}] = -[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) (one swap, flipped). " +
            "Lose track of a swap and your final \\(\\lambda\\) comes out with the wrong sign.",
        },
        {
          title: "A repeated vector kills the product — spot it early",
          body:
            "Whenever expanding by linearity, any term that ends up with two identical vectors (like \\([\\vec{a}\\ \\vec{a}\\ \\vec{c}]\\)) is zero. " +
            "Most coplanarity-combo problems are solved entirely by deleting these zero terms.",
        },
      ],
    },

    // 3 — value of the STP / geometric & independence ──────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-value-and-geometric",
      name: "Computing the value of a scalar triple product",
      intuition:
        "Sometimes you compute [a b c] not from raw components but from magnitudes and a perpendicularity setup, or you must decide which variables it depends on. " +
        "When one vector is perpendicular to the plane of the other two, the box is a clean prism and \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = |\\vec{a}|\\,|\\vec{b}\\times\\vec{c}|\\). " +
        "When the determinant simplifies to a constant, the answer is independent of the parameters in the vectors.",
      definition:
        "- **Perpendicular case:** if \\(\\vec{a}\\) is perpendicular to both \\(\\vec{b}\\) and \\(\\vec{c}\\), then \\(\\vec{a}\\) is parallel to \\(\\vec{b}\\times\\vec{c}\\), so \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\pm|\\vec{a}|\\,|\\vec{b}\\times\\vec{c}| = \\pm|\\vec{a}|\\,|\\vec{b}||\\vec{c}|\\sin\\theta\\) where \\(\\theta\\) is the angle between \\(\\vec{b}\\) and \\(\\vec{c}\\).\n" +
        "- **Independence:** if the determinant of the component matrix reduces to a constant, \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) does not depend on the parameters inside the vectors.\n" +
        "- **Magnitude relations:** a datum like \\(|\\vec{b}\\times\\vec{c}|\\) fixes \\(\\sin\\theta\\), and a relation \\(\\vec{b} = 2\\vec{c} + \\lambda\\vec{a}\\) is solved by taking magnitudes: \\(|\\vec{b} - 2\\vec{c}|^2 = \\lambda^2|\\vec{a}|^2\\).",
      formula: {
        label: "STP when one vector is perpendicular to the other two",
        latex:
          "[\\vec{a}\\ \\vec{b}\\ \\vec{c}] = |\\vec{a}|\\,|\\vec{b}\\times\\vec{c}| = |\\vec{a}||\\vec{b}||\\vec{c}|\\sin\\theta",
        symbols: [
          { symbol: "\\(\\vec{a}\\perp\\vec{b}, \\vec{a}\\perp\\vec{c}\\)", meaning: "so \\(\\vec{a}\\,\\|\\,\\vec{b}\\times\\vec{c}\\)" },
          { symbol: "\\(\\theta\\)", meaning: "angle between \\(\\vec{b}\\) and \\(\\vec{c}\\)" },
          { symbol: "\\(\\sin\\theta\\)", meaning: "from \\(|\\vec{b}\\times\\vec{c}| = |\\vec{b}||\\vec{c}|\\sin\\theta\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(\\vec{a}\\) is perpendicular to both \\(\\vec{b}\\) and \\(\\vec{c}\\). If \\(|\\vec{a}| = 3\\), \\(|\\vec{b}| = 2\\), \\(|\\vec{c}| = 5\\) and the angle between \\(\\vec{b}\\) and \\(\\vec{c}\\) is \\(\\frac{\\pi}{6}\\), find \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
        steps: [
          "\\(\\vec{a}\\perp\\vec{b}\\) and \\(\\vec{a}\\perp\\vec{c}\\) means \\(\\vec{a}\\) is parallel to \\(\\vec{b}\\times\\vec{c}\\).",
          "So \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = |\\vec{a}|\\,|\\vec{b}\\times\\vec{c}| = |\\vec{a}||\\vec{b}||\\vec{c}|\\sin\\theta\\).",
          "\\(= 3\\cdot 2\\cdot 5\\cdot\\sin\\frac{\\pi}{6} = 30\\cdot\\tfrac{1}{2} = 15\\).",
        ],
        answer: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 15\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(\\vec{a}, \\vec{b}, \\vec{c}\\) are mutually perpendicular with magnitudes \\(2, 3, 4\\). Find \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) (take it positive).",
        steps: [
          "Mutually perpendicular ⇒ \\(\\theta = 90^\\circ\\) between every pair, so \\(\\sin\\theta = 1\\).",
          "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = |\\vec{a}||\\vec{b}||\\vec{c}| = 2\\cdot 3\\cdot 4 = 24\\).",
        ],
        answer: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 24\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\vec{a}\\perp\\vec{b}\\) and \\(\\vec{a}\\perp\\vec{c}\\), then \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = ?\\)", answer: "\\(|\\vec{a}|\\,|\\vec{b}\\times\\vec{c}|\\)" },
        { prompt: "For mutually perpendicular \\(\\vec{a}, \\vec{b}, \\vec{c}\\), \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = ?\\)", answer: "\\(|\\vec{a}||\\vec{b}||\\vec{c}|\\)" },
        { prompt: "If a determinant reduces to a constant, the STP depends on its parameters?", answer: "No — it is independent" },
        { prompt: "\\(|\\vec{b}\\times\\vec{c}| = |\\vec{b}||\\vec{c}|\\,?\\)", answer: "\\(\\sin\\theta\\)" },
      ],
      pyqExampleId: "e50f1bed-79dd-48b2-a7b0-d33e5a146f7b",
      traps: [
        {
          title: "Perpendicular to BOTH means parallel to the cross product",
          body:
            "If \\(\\vec{a}\\perp\\vec{b}\\) and \\(\\vec{a}\\perp\\vec{c}\\), then \\(\\vec{a}\\) lies along \\(\\vec{b}\\times\\vec{c}\\), so the box is a right prism and \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = |\\vec{a}|\\,|\\vec{b}\\times\\vec{c}|\\). " +
            "Don't try to plug a single \\(\\sin\\) of the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\) — the relevant angle is between \\(\\vec{b}\\) and \\(\\vec{c}\\).",
        },
        {
          title: "\"Depends on x and y\" — expand the determinant first",
          body:
            "When the vectors carry parameters, compute \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) as a determinant and simplify. " +
            "It frequently collapses to a constant, meaning the answer is independent of every parameter — a deliberately surprising option.",
        },
      ],
    },

    // 4 — coplanarity of three vectors (solve a parameter) ─────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-coplanarity-three-vectors",
      name: "Coplanarity of three vectors (and solving for a parameter)",
      intuition:
        "Three vectors lie in a common plane through the origin exactly when the box on them is flat — zero volume. " +
        "So the test is simply \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\): set the determinant to zero and solve for the unknown. " +
        "It also detects how many values of a parameter make them coplanar, and a vector lying in the plane of two others satisfies the same equation.",
      definition:
        "\\(\\vec{a}, \\vec{b}, \\vec{c}\\) are **coplanar** \\(\\iff [\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\), i.e. the determinant of their components is zero. " +
        "If \\(\\vec{c}\\) lies in the plane of \\(\\vec{a}\\) and \\(\\vec{b}\\), then \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\) too. " +
        "To find a parameter \\(\\lambda\\) (or \\(x\\)) that makes them coplanar, set the determinant equal to zero and solve the resulting equation; a parameter that appears squared can give two distinct real values.",
      formula: {
        label: "Coplanarity criterion",
        latex:
          "\\vec{a},\\vec{b},\\vec{c}\\text{ coplanar} \\iff \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = 0",
        symbols: [
          { symbol: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\)", meaning: "zero box volume ⇒ all three lie in one plane" },
          { symbol: "Parameter", meaning: "solve the determinant-equals-zero equation for it" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(\\lambda\\) so that \\(\\vec{a} = \\hat{i} + \\hat{j} - \\hat{k}\\), \\(\\vec{b} = 2\\hat{i} - \\hat{j} + \\hat{k}\\) and \\(\\vec{c} = \\hat{i} + \\lambda\\hat{j} + 3\\hat{k}\\) are coplanar.",
        steps: [
          "Coplanar ⇒ \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\): \\(\\begin{vmatrix} 1 & 1 & -1 \\\\ 2 & -1 & 1 \\\\ 1 & \\lambda & 3 \\end{vmatrix} = 0\\).",
          "Expand along the first row: \\(1\\cdot(-3 - \\lambda) - 1\\cdot(6 - 1) + (-1)\\cdot(2\\lambda + 1)\\).",
          "Simplify: \\((-3 - \\lambda) - 5 - (2\\lambda + 1) = -9 - 3\\lambda = 0\\).",
          "Solve: \\(\\lambda = -3\\).",
        ],
        answer: "\\(\\lambda = -3\\)",
      },
      selfCheckExample: {
        prompt:
          "For how many real values of \\(\\lambda\\) are \\(\\lambda\\hat{i} + \\hat{j}\\), \\(\\hat{i} + \\lambda\\hat{j}\\) and \\(\\hat{i} + \\hat{j} + \\lambda\\hat{k}\\) coplanar?",
        steps: [
          "Coplanar ⇒ \\(\\begin{vmatrix} \\lambda & 1 & 0 \\\\ 1 & \\lambda & 0 \\\\ 1 & 1 & \\lambda \\end{vmatrix} = 0\\).",
          "Expand along the third column: \\(\\lambda\\,(\\lambda^2 - 1) = 0\\).",
          "Roots: \\(\\lambda = 0, 1, -1\\) — three distinct real values.",
        ],
        answer: "Three values",
      },
      practiceSet: [
        { prompt: "Three vectors are coplanar iff \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = ?\\)", answer: "\\(0\\)" },
        { prompt: "If \\(\\vec{c}\\) lies in the plane of \\(\\vec{a}, \\vec{b}\\), then \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = ?\\)", answer: "\\(0\\)" },
        { prompt: "To find a coplanarity parameter, set the determinant equal to?", answer: "zero, then solve" },
        { prompt: "\\([\\hat{i}\\ \\hat{j}\\ (\\hat{i}+\\hat{j})] = ?\\) — coplanar?", answer: "\\(0\\); yes (all in the xy-plane)" },
      ],
      pyqExampleId: "688e7a12-9590-4dd0-88cb-6f4fe16444ae",
      traps: [
        {
          title: "Coplanar ⇒ STP = 0, NOT \"two of them are parallel\"",
          body:
            "Three vectors coplanar means they fit in one plane; they need not be parallel to each other. " +
            "A parallel pair also makes the STP zero, but it is a stronger, separate condition — don't confuse the two.",
        },
        {
          title: "A squared parameter can give TWO coplanarity values",
          body:
            "When the unknown appears as \\(\\lambda^2\\) (e.g. \\(-\\lambda^2\\hat{i}+\\dots\\)), the determinant-equals-zero equation can have two distinct real roots. " +
            "Count carefully — \"number of values of \\(\\lambda\\)\" questions hinge exactly on this.",
        },
      ],
    },

    // 5 — STP of linear combinations (linearity identities) ────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-linear-combinations",
      name: "Scalar triple product of linear combinations",
      intuition:
        "When the three slots of a scalar triple product are themselves sums of \\(\\vec{a}, \\vec{b}, \\vec{c}\\), expand by linearity — every term with a repeated vector vanishes, leaving a clean multiple of \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\). " +
        "The pattern \\([\\vec{a}+\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}] = 2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) is the signature case. " +
        "More generally, the coefficient is a 3x3 determinant of the combination coefficients.",
      definition:
        "Expanding by linearity and deleting repeated-vector terms:\n" +
        "- \\([\\vec{a}+\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}] = 2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)\n" +
        "- \\([m\\vec{a}+\\vec{b}\\ \\ m\\vec{b}+\\vec{c}\\ \\ m\\vec{c}+\\vec{a}] = (m^3 + 1)[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)\n" +
        "- In general the new STP equals \\(\\det(M)\\,[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\), where \\(M\\) is the 3x3 matrix of the combination coefficients.\n" +
        "If \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are coplanar, \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\) so every such combination is also zero.",
      formula: {
        label: "Linear-combination identities",
        latex:
          "[\\vec{a}+\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}] = 2[\\vec{a}\\ \\vec{b}\\ \\vec{c}] \\qquad [m\\vec{a}+\\vec{b}\\ \\ m\\vec{b}+\\vec{c}\\ \\ m\\vec{c}+\\vec{a}] = (m^3+1)[\\vec{a}\\ \\vec{b}\\ \\vec{c}]",
        symbols: [
          { symbol: "Repeated-vector terms", meaning: "all vanish on expansion" },
          { symbol: "Coefficient", meaning: "\\(= \\det\\) of the combination-coefficient matrix" },
        ],
      },
      authoredExample: {
        prompt:
          "Simplify \\([\\vec{a}+\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}]\\) in terms of \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
        steps: [
          "Expand the first slot by linearity: \\([\\vec{a}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}] + [\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}]\\).",
          "Keep expanding and delete every term with a repeated vector (e.g. \\([\\vec{a}\\ \\vec{c}\\ \\vec{c}] = 0\\), \\([\\vec{b}\\ \\vec{b}\\ \\dots] = 0\\)).",
          "The surviving terms are \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) and \\([\\vec{b}\\ \\vec{c}\\ \\vec{a}] = [\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\), giving \\(2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\).",
        ],
        answer: "\\(2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are coplanar unit vectors, find \\([2\\vec{a}-\\vec{b}\\ \\ 2\\vec{b}-\\vec{c}\\ \\ 2\\vec{c}-\\vec{a}]\\).",
        steps: [
          "Coplanar ⇒ \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\).",
          "Any linear combination is a multiple of \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\), so the whole expression is \\(0\\).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        { prompt: "\\([\\vec{a}+\\vec{b}\\ \\ \\vec{b}+\\vec{c}\\ \\ \\vec{c}+\\vec{a}] = ?\\)", answer: "\\(2[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)" },
        { prompt: "\\([3\\vec{a}+\\vec{b}\\ \\ 3\\vec{b}+\\vec{c}\\ \\ 3\\vec{c}+\\vec{a}] = ?\\)", answer: "\\(28[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)", method: "\\(m^3+1\\) with \\(m=3\\)" },
        { prompt: "If \\(\\vec{a},\\vec{b},\\vec{c}\\) coplanar, \\([2\\vec{a}-\\vec{b}\\ \\dots] = ?\\)", answer: "\\(0\\)" },
        { prompt: "A term like \\([\\vec{a}\\ \\vec{a}\\ \\vec{c}]\\) contributes what to the expansion?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "fbdfcab9-1f4c-4b43-a83c-1701dea4a0e5",
      traps: [
        {
          title: "\\([m\\vec{a}+\\vec{b}\\ \\dots] = (m^3+1)[\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\), not \\(m^3\\)",
          body:
            "The cyclic \\(m\\,\\cdot\\) pattern gives \\(m^3 + 1\\) — the extra \\(+1\\) comes from the \\([\\vec{b}\\ \\vec{c}\\ \\vec{a}]\\) cross-term. " +
            "So \\(m = 3\\) gives \\(28\\), not \\(27\\). Dropping the \\(+1\\) is a deliberate distractor.",
        },
        {
          title: "Track every sign through the swaps",
          body:
            "Expansions like \\([\\vec{a}+2\\vec{b}+3\\vec{c}\\ \\dots]\\) generate many cross-terms; a single mis-signed swap throws off the coefficient. " +
            "Use cyclic to standardise every surviving term to \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\) before summing.",
        },
      ],
    },

    // 6 — volume of a parallelepiped ───────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-volume-parallelepiped",
      name: "Volume of a parallelepiped (and min/max problems)",
      visualizationSlug: "triple-product-box",
      intuition:
        "The volume of the box (parallelepiped) on three edge vectors is the MODULUS of their scalar triple product — the sign just tells you the orientation. " +
        "Set the determinant equal to a given volume to find an unknown component, or differentiate the determinant in a parameter to find where the volume is smallest or largest.",
      definition:
        "For edge vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\):\n" +
        "- **Volume** \\(= |[\\vec{a}\\ \\vec{b}\\ \\vec{c}]| = \\left|\\det\\text{(component matrix)}\\right|\\).\n" +
        "- **Find a component:** set \\(|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]| = V\\) (given) and solve.\n" +
        "- **Min/max in a parameter:** write the determinant as a function \\(V(m)\\), set \\(V'(m) = 0\\), and use the sign of \\(V''(m)\\) to classify minimum vs maximum.\n" +
        "- The **dihedral angle** between two faces of a tetrahedron is the angle between the two face normals, each found as a cross product of edge vectors.",
      formula: {
        label: "Parallelepiped volume",
        latex:
          "V = |[\\vec{a}\\ \\vec{b}\\ \\vec{c}]| = \\left|\\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}\\right|",
        symbols: [
          { symbol: "\\(|\\cdot|\\)", meaning: "modulus — volume is always non-negative" },
          { symbol: "\\(V'(m)=0\\)", meaning: "stationary volume; \\(V''\\) sign decides min/max" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the value of \\(m\\) for which the volume of the parallelepiped on \\(\\hat{i}+m\\hat{j}+\\hat{k}\\), \\(\\hat{j}+m\\hat{k}\\) and \\(m\\hat{i}+\\hat{k}\\) is minimum.",
        steps: [
          "Volume function: \\(\\begin{vmatrix} 1 & m & 1 \\\\ 0 & 1 & m \\\\ m & 0 & 1 \\end{vmatrix} = 1(1) - m(0 - m^2) + 1(0 - m) = m^3 - m + 1\\).",
          "Take \\(V(m) = m^3 - m + 1\\); set \\(V'(m) = 3m^2 - 1 = 0 \\Rightarrow m = \\pm\\frac{1}{\\sqrt{3}}\\).",
          "\\(V''(m) = 6m\\): positive at \\(m = \\frac{1}{\\sqrt{3}}\\), so that gives the minimum.",
        ],
        answer: "\\(m = \\dfrac{1}{\\sqrt{3}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the volume of the parallelepiped with edges \\(\\vec{a} = \\hat{i}\\), \\(\\vec{b} = \\hat{j}\\) and \\(\\vec{c} = \\hat{i} + \\hat{j} + 2\\hat{k}\\).",
        steps: [
          "\\(V = \\left|\\begin{vmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 1 & 1 & 2 \\end{vmatrix}\\right|\\).",
          "Expand along the first row: \\(1\\cdot(1\\cdot 2 - 0\\cdot 1) = 2\\).",
        ],
        answer: "Volume \\(= 2\\) cubic units",
      },
      practiceSet: [
        { prompt: "Volume of the parallelepiped on \\(\\vec{a}, \\vec{b}, \\vec{c}\\)?", answer: "\\(|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\)" },
        { prompt: "If \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = -7\\), the volume is?", answer: "\\(7\\)", method: "modulus" },
        { prompt: "To find a min/max volume in \\(m\\), set what to zero?", answer: "\\(\\frac{d}{dm}\\) of the determinant" },
        { prompt: "Dihedral angle between two faces = angle between their?", answer: "face normals (cross products)" },
      ],
      pyqExampleId: "f591593b-6aac-42bc-89c4-a5132aa50872",
      traps: [
        {
          title: "Volume is the MODULUS — never a negative number",
          body:
            "The scalar triple product can be negative (it is a SIGNED volume), but a physical volume is \\(|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\). " +
            "When a volume is given (e.g. 158 cu units), set the modulus equal to it, which may give two parameter values \\(\\pm\\).",
        },
        {
          title: "Min vs max: check the second derivative",
          body:
            "\\(V'(m) = 0\\) at \\(m = \\pm\\frac{1}{\\sqrt{3}}\\), but only one is a minimum. " +
            "\\(V''(m) = 6m > 0\\) at \\(m = +\\frac{1}{\\sqrt{3}}\\) (minimum) and \\(< 0\\) at \\(m = -\\frac{1}{\\sqrt{3}}\\) (maximum). The two questions share roots but want opposite answers.",
        },
      ],
    },

    // 7 — volume of a tetrahedron ──────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-volume-tetrahedron",
      name: "Volume of a tetrahedron",
      intuition:
        "A tetrahedron is one-sixth of the parallelepiped on the same three edge vectors. " +
        "So its volume is one-sixth the modulus of the scalar triple product of the three edges meeting at one vertex. " +
        "Build the edges by subtracting the chosen vertex from the other three, then apply the formula.",
      definition:
        "For a tetrahedron with vertices \\(A, B, C, D\\), form the edge vectors from one vertex: \\(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}\\). " +
        "Then **Volume** \\(= \\dfrac{1}{6}\\,|[\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}]|\\). " +
        "Setting this equal to a given volume yields an equation for an unknown coordinate.",
      formula: {
        label: "Tetrahedron volume",
        latex:
          "V = \\tfrac{1}{6}\\,\\bigl|[\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}]\\bigr|",
        symbols: [
          { symbol: "\\(\\tfrac{1}{6}\\)", meaning: "a tetrahedron is one-sixth of the parallelepiped" },
          { symbol: "\\(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}\\)", meaning: "three edges from the SAME vertex \\(A\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the volume of the tetrahedron with vertices \\(A(0,0,0)\\), \\(B(2,0,0)\\), \\(C(0,3,0)\\) and \\(D(0,0,4)\\).",
        steps: [
          "Edges from \\(A\\): \\(\\overrightarrow{AB} = 2\\hat{i}\\), \\(\\overrightarrow{AC} = 3\\hat{j}\\), \\(\\overrightarrow{AD} = 4\\hat{k}\\).",
          "\\([\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}] = \\begin{vmatrix} 2 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 4 \\end{vmatrix} = 24\\).",
          "Volume \\(= \\tfrac{1}{6}\\cdot 24 = 4\\).",
        ],
        answer: "Volume \\(= 4\\) cubic units",
      },
      selfCheckExample: {
        prompt:
          "The volume of the tetrahedron with vertices \\(A(1,1,1)\\), \\(B(2,1,1)\\), \\(C(1,3,1)\\), \\(D(1,1,5)\\) is?",
        steps: [
          "Edges: \\(\\overrightarrow{AB} = \\hat{i}\\), \\(\\overrightarrow{AC} = 2\\hat{j}\\), \\(\\overrightarrow{AD} = 4\\hat{k}\\).",
          "\\([\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}] = 1\\cdot 2\\cdot 4 = 8\\).",
          "Volume \\(= \\tfrac{1}{6}\\cdot 8 = \\tfrac{4}{3}\\).",
        ],
        answer: "Volume \\(= \\dfrac{4}{3}\\) cubic units",
      },
      practiceSet: [
        { prompt: "Tetrahedron volume from edges \\(\\vec{a}, \\vec{b}, \\vec{c}\\)?", answer: "\\(\\tfrac{1}{6}|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\)" },
        { prompt: "A tetrahedron is what fraction of the parallelepiped on the same edges?", answer: "one-sixth" },
        { prompt: "If \\([\\overrightarrow{AB}\\ \\overrightarrow{AC}\\ \\overrightarrow{AD}] = 30\\), the volume is?", answer: "\\(5\\)" },
        { prompt: "From vertices \\(A,B,C,D\\), which three edges do you use?", answer: "\\(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}\\)" },
      ],
      pyqExampleId: "17c10fd6-2355-4e9f-a4ba-fc422a2fbefe",
      traps: [
        {
          title: "The one-sixth is on the tetrahedron, not the parallelepiped",
          body:
            "Tetrahedron volume \\(= \\tfrac{1}{6}|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\); the parallelepiped is the full \\(|[\\vec{a}\\ \\vec{b}\\ \\vec{c}]|\\). " +
            "Forgetting the \\(\\tfrac{1}{6}\\) over-counts the volume six-fold — a classic distractor when a volume is given.",
        },
        {
          title: "Build all three edges from the SAME vertex",
          body:
            "Use \\(\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}\\) — all starting at \\(A\\). " +
            "Mixing base points (e.g. \\(\\overrightarrow{AB}, \\overrightarrow{BC}, \\dots\\)) gives the wrong determinant and a wrong unknown.",
        },
      ],
    },

    // 8 — reciprocal (dual) basis identities ───────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-reciprocal-basis",
      name: "Reciprocal-basis identities and the STP-squared rule",
      intuition:
        "From a non-coplanar triple \\(\\vec{a}, \\vec{b}, \\vec{c}\\), the vectors \\(\\dfrac{\\vec{b}\\times\\vec{c}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\) and its cyclic partners form a \"reciprocal\" set that dots cleanly with the originals: each matched pair gives \\(1\\), each mismatched pair gives \\(0\\). " +
        "That single fact collapses long-looking sums to small integers. " +
        "A close relative is the identity \\([\\vec{a}\\times\\vec{b}\\ \\ \\vec{b}\\times\\vec{c}\\ \\ \\vec{c}\\times\\vec{a}] = [\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2\\).",
      definition:
        "For non-coplanar \\(\\vec{a}, \\vec{b}, \\vec{c}\\), set \\(\\vec{p} = \\dfrac{\\vec{b}\\times\\vec{c}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\), \\(\\vec{q} = \\dfrac{\\vec{c}\\times\\vec{a}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\), \\(\\vec{r} = \\dfrac{\\vec{a}\\times\\vec{b}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\):\n" +
        "- **Matched pairs:** \\(\\vec{a}\\cdot\\vec{p} = \\vec{b}\\cdot\\vec{q} = \\vec{c}\\cdot\\vec{r} = 1\\)\n" +
        "- **Mismatched pairs:** \\(\\vec{a}\\cdot\\vec{q} = \\vec{a}\\cdot\\vec{r} = \\vec{b}\\cdot\\vec{p} = \\dots = 0\\) (the cross product is perpendicular to its own factors)\n" +
        "- **STP-squared rule:** \\([\\vec{a}\\times\\vec{b}\\ \\ \\vec{b}\\times\\vec{c}\\ \\ \\vec{c}\\times\\vec{a}] = [\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2\\)",
      formula: {
        label: "Reciprocal pairings and STP-squared",
        latex:
          "\\vec{a}\\cdot\\vec{p} = \\vec{b}\\cdot\\vec{q} = \\vec{c}\\cdot\\vec{r} = 1, \\quad \\vec{a}\\cdot\\vec{q} = \\vec{b}\\cdot\\vec{p} = \\dots = 0 \\qquad [\\vec{a}\\times\\vec{b}\\ \\ \\vec{b}\\times\\vec{c}\\ \\ \\vec{c}\\times\\vec{a}] = [\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2",
        symbols: [
          { symbol: "Matched", meaning: "\\(\\vec{a}\\cdot\\vec{p} = 1\\) etc." },
          { symbol: "Mismatched", meaning: "\\(\\vec{a}\\cdot\\vec{q} = 0\\) (perpendicularity)" },
          { symbol: "STP-squared", meaning: "cross-of-pairs box \\(= [\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "With \\(\\vec{p} = \\dfrac{\\vec{b}\\times\\vec{c}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\), \\(\\vec{q} = \\dfrac{\\vec{c}\\times\\vec{a}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\), \\(\\vec{r} = \\dfrac{\\vec{a}\\times\\vec{b}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\), find \\(\\vec{a}\\cdot\\vec{p} + \\vec{b}\\cdot\\vec{q} + \\vec{c}\\cdot\\vec{r}\\).",
        steps: [
          "\\(\\vec{a}\\cdot\\vec{p} = \\dfrac{\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]} = \\dfrac{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]} = 1\\).",
          "By the same cyclic argument, \\(\\vec{b}\\cdot\\vec{q} = 1\\) and \\(\\vec{c}\\cdot\\vec{r} = 1\\).",
          "Sum \\(= 1 + 1 + 1 = 3\\).",
        ],
        answer: "\\(3\\)",
      },
      selfCheckExample: {
        prompt:
          "With the same \\(\\vec{p}, \\vec{q}, \\vec{r}\\), evaluate \\(\\vec{a}\\cdot\\vec{q} + \\vec{b}\\cdot\\vec{r} + \\vec{c}\\cdot\\vec{p}\\).",
        steps: [
          "\\(\\vec{a}\\cdot\\vec{q} = \\dfrac{\\vec{a}\\cdot(\\vec{c}\\times\\vec{a})}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]}\\); but \\(\\vec{c}\\times\\vec{a}\\) is perpendicular to \\(\\vec{a}\\), so the dot is \\(0\\).",
          "Each mismatched pair is similarly \\(0\\): sum \\(= 0\\).",
        ],
        answer: "\\(0\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a}\\cdot\\dfrac{\\vec{b}\\times\\vec{c}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]} = ?\\)", answer: "\\(1\\)" },
        { prompt: "\\(\\vec{b}\\cdot\\dfrac{\\vec{b}\\times\\vec{c}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]} = ?\\)", answer: "\\(0\\)", method: "perpendicular to its factors" },
        { prompt: "\\([\\vec{a}\\times\\vec{b}\\ \\ \\vec{b}\\times\\vec{c}\\ \\ \\vec{c}\\times\\vec{a}] = ?\\)", answer: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2\\)" },
        { prompt: "\\(2\\vec{a}\\cdot\\vec{p} + \\vec{b}\\cdot\\vec{q} + \\vec{c}\\cdot\\vec{r} = ?\\)", answer: "\\(4\\)", method: "\\(2(1) + 1 + 1\\)" },
      ],
      pyqExampleId: "86c8b0de-8df1-445c-b51d-20eda202f043",
      traps: [
        {
          title: "Matched pairs are 1, mismatched pairs are 0",
          body:
            "\\(\\vec{a}\\cdot\\dfrac{\\vec{b}\\times\\vec{c}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]} = 1\\), but \\(\\vec{a}\\cdot\\dfrac{\\vec{c}\\times\\vec{a}}{[\\vec{a}\\ \\vec{b}\\ \\vec{c}]} = 0\\) because \\(\\vec{c}\\times\\vec{a}\\perp\\vec{a}\\). " +
            "Read each dot pair to decide whether it survives — most of the terms in these sums vanish.",
        },
        {
          title: "Cross-of-pairs box is the SQUARE, not the cube",
          body:
            "\\([\\vec{a}\\times\\vec{b}\\ \\ \\vec{b}\\times\\vec{c}\\ \\ \\vec{c}\\times\\vec{a}] = [\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2\\) — so the coefficient \\(\\lambda\\) in \\(\\lambda[\\vec{a}\\ \\vec{b}\\ \\vec{c}]^2\\) is \\(1\\), not \\(3\\) or \\(2\\).",
        },
      ],
    },

    // 9 — vector triple product (BAC-CAB) ──────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-vtp-bac-cab",
      name: "Vector triple product (BAC-CAB rule)",
      intuition:
        "A triple product with TWO crosses returns a VECTOR, expanded by the BAC-CAB rule: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\). " +
        "Read it as \"outer-dot-far times near, minus outer-dot-near times far\". " +
        "The result lies in the plane of the two innermost vectors — a structural fact that powers most of the chapter's angle problems.",
      definition:
        "For any \\(\\vec{a}, \\vec{b}, \\vec{c}\\):\n" +
        "- \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}\\)\n" +
        "- \\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{b}\\cdot\\vec{c})\\,\\vec{a}\\)\n" +
        "- The vector triple product is **NOT associative**: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) \\neq (\\vec{a}\\times\\vec{b})\\times\\vec{c}\\) in general — the two lie in different planes.\n" +
        "Equating a given expansion to a stated multiple of \\(\\vec{b}\\) and \\(\\vec{c}\\) lets you read off \\(\\vec{a}\\cdot\\vec{b}\\) (hence the angle), since \\(\\vec{b}, \\vec{c}\\) are independent.",
      formula: {
        label: "BAC-CAB rule",
        latex:
          "\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\,\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\,\\vec{c}",
        symbols: [
          { symbol: "\\(\\vec{a}\\cdot\\vec{c}, \\vec{a}\\cdot\\vec{b}\\)", meaning: "scalar coefficients" },
          { symbol: "\\(\\vec{b}, \\vec{c}\\)", meaning: "the plane the result lies in" },
          { symbol: "Result", meaning: "perpendicular to \\(\\vec{a}\\), inside the \\(\\vec{b}\\)-\\(\\vec{c}\\) plane" },
        ],
      },
      authoredExample: {
        prompt:
          "Three unit vectors satisfy \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = \\dfrac{1}{2}(\\vec{b} + \\vec{c})\\) with \\(\\vec{b}\\) not parallel to \\(\\vec{c}\\). Find the angle between \\(\\vec{a}\\) and \\(\\vec{b}\\).",
        steps: [
          "BAC-CAB: \\((\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c} = \\tfrac{1}{2}\\vec{b} + \\tfrac{1}{2}\\vec{c}\\).",
          "Since \\(\\vec{b}, \\vec{c}\\) are independent, match coefficients: \\(\\vec{a}\\cdot\\vec{c} = \\tfrac{1}{2}\\) and \\(-(\\vec{a}\\cdot\\vec{b}) = \\tfrac{1}{2}\\), so \\(\\vec{a}\\cdot\\vec{b} = -\\tfrac{1}{2}\\).",
          "Unit vectors: \\(\\cos\\theta = \\vec{a}\\cdot\\vec{b} = -\\tfrac{1}{2}\\), so \\(\\theta = \\dfrac{2\\pi}{3}\\).",
        ],
        answer: "\\(\\theta = \\dfrac{2\\pi}{3}\\)",
      },
      selfCheckExample: {
        prompt:
          "Using BAC-CAB, find \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) for \\(\\vec{a} = \\hat{i}\\), \\(\\vec{b} = \\hat{j}\\), \\(\\vec{c} = \\hat{i} + \\hat{k}\\).",
        steps: [
          "\\(\\vec{a}\\cdot\\vec{c} = \\hat{i}\\cdot(\\hat{i}+\\hat{k}) = 1\\); \\(\\vec{a}\\cdot\\vec{b} = \\hat{i}\\cdot\\hat{j} = 0\\).",
          "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = 1\\cdot\\vec{b} - 0\\cdot\\vec{c} = \\hat{j}\\).",
        ],
        answer: "\\(\\hat{j}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = ?\\) (BAC-CAB)", answer: "\\((\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\)" },
        { prompt: "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) lies in the plane of?", answer: "\\(\\vec{b}\\) and \\(\\vec{c}\\)" },
        { prompt: "Is the vector triple product associative?", answer: "No" },
        { prompt: "If unit \\(\\vec{a}\\) gives \\(\\vec{a}\\cdot\\vec{b} = -\\tfrac{1}{2}\\), the angle between them is?", answer: "\\(\\tfrac{2\\pi}{3}\\)" },
      ],
      pyqExampleId: "2a7f5419-9912-4239-a8c0-46eea9e6d2f7",
      traps: [
        {
          title: "Inner pair sets the plane: \\(\\vec{a}\\times(\\vec{b}\\times\\vec{c})\\) is in the \\(\\vec{b}\\)-\\(\\vec{c}\\) plane",
          body:
            "\\(\\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}\\) lies in the plane of \\(\\vec{b}, \\vec{c}\\); " +
            "\\((\\vec{a}\\times\\vec{b})\\times\\vec{c} = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{b}\\cdot\\vec{c})\\vec{a}\\) lies in the plane of \\(\\vec{a}, \\vec{b}\\). They are DIFFERENT vectors.",
        },
        {
          title: "Match coefficients only when the basis vectors are independent",
          body:
            "Reading off \\(\\vec{a}\\cdot\\vec{b}\\) by comparing coefficients of \\(\\vec{b}\\) and \\(\\vec{c}\\) is valid because \"\\(\\vec{b}\\) not parallel to \\(\\vec{c}\\)\" makes them independent. " +
            "Watch the sign: the coefficient of \\(\\vec{c}\\) is \\(-(\\vec{a}\\cdot\\vec{b})\\), so a positive RHS coefficient gives a NEGATIVE dot product (obtuse angle).",
        },
        {
          title: "Two crosses ⇒ BAC-CAB; one cross + one dot ⇒ scalar triple product",
          body:
            "If the shape is \\(\\vec{a}\\cdot(\\vec{b}\\times\\vec{c})\\) (a number), it is NOT a BAC-CAB case. " +
            "Count the crosses and dots first to pick the right identity.",
        },
      ],
    },

    // 10 — vector triple product: orthogonal-to-c & coplanar-with-a,b ──────────
    {
      kind: "formula" as const,
      slug: "cetvec-vtp-orthogonal-coplanar",
      name: "Vector orthogonal to one vector and coplanar with two others",
      intuition:
        "A standard PYQ shape: find a unit vector that is perpendicular to a given vector AND lies in the plane of two others. " +
        "The vector \\(\\vec{c}\\times(\\vec{a}\\times\\vec{b})\\) is exactly that — it is coplanar with \\(\\vec{a}, \\vec{b}\\) (a BAC-CAB combination of them) and perpendicular to \\(\\vec{c}\\). " +
        "Equivalently, write the unknown as \\(\\vec{v} = \\lambda\\vec{a} + \\mu\\vec{b}\\) (coplanar) and impose the perpendicularity / projection condition.",
      definition:
        "To find a vector **coplanar with \\(\\vec{a}, \\vec{b}\\)** and **perpendicular to \\(\\vec{c}\\)**:\n" +
        "- **Shortcut:** \\(\\vec{c}\\times(\\vec{a}\\times\\vec{b}) = (\\vec{c}\\cdot\\vec{b})\\vec{a} - (\\vec{c}\\cdot\\vec{a})\\vec{b}\\) is coplanar with \\(\\vec{a}, \\vec{b}\\) and perpendicular to \\(\\vec{c}\\); normalise it for a unit vector.\n" +
        "- **Linear-combination method:** set \\(\\vec{v} = \\lambda\\vec{a} + \\mu\\vec{b}\\) (this makes it coplanar with \\(\\vec{a}, \\vec{b}\\)), then impose \\(\\vec{v}\\cdot\\vec{c} = 0\\) (perpendicular) or a given projection \\(\\dfrac{\\vec{v}\\cdot\\vec{c}}{|\\vec{c}|}\\) to fix the ratio \\(\\lambda : \\mu\\).\n" +
        "- For three given POINTS, coplanarity of position-difference vectors is the same \\([\\cdots] = 0\\) test.",
      formula: {
        label: "Orthogonal-and-coplanar vector",
        latex:
          "\\vec{c}\\times(\\vec{a}\\times\\vec{b}) = (\\vec{c}\\cdot\\vec{b})\\,\\vec{a} - (\\vec{c}\\cdot\\vec{a})\\,\\vec{b}",
        symbols: [
          { symbol: "Coplanar with \\(\\vec{a}, \\vec{b}\\)", meaning: "it is a combination \\(\\lambda\\vec{a} + \\mu\\vec{b}\\)" },
          { symbol: "Perpendicular to \\(\\vec{c}\\)", meaning: "by construction of the outer cross" },
          { symbol: "Normalise", meaning: "divide by its magnitude for a UNIT answer" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a unit vector coplanar with \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\) and \\(\\vec{b} = 2\\hat{i} + \\hat{j} + \\hat{k}\\), and perpendicular to \\(\\vec{c} = \\hat{i} + \\hat{j} - \\hat{k}\\).",
        steps: [
          "Write \\(\\vec{v} = \\lambda\\vec{a} + \\mu\\vec{b} = (\\lambda + 2\\mu)\\hat{i} + (\\lambda + \\mu)\\hat{j} + (\\lambda + \\mu)\\hat{k}\\).",
          "Perpendicular to \\(\\vec{c}\\): \\(\\vec{v}\\cdot\\vec{c} = (\\lambda + 2\\mu) + (\\lambda + \\mu) - (\\lambda + \\mu) = \\lambda + 2\\mu = 0\\), so \\(\\lambda = -2\\mu\\).",
          "Take \\(\\mu = 1, \\lambda = -2\\): \\(\\vec{v} = 0\\hat{i} - \\hat{j} - \\hat{k} = -(\\hat{j} + \\hat{k})\\).",
          "Normalise: \\(|\\vec{v}| = \\sqrt{2}\\), so \\(\\hat{v} = \\pm\\dfrac{1}{\\sqrt{2}}(\\hat{j} + \\hat{k})\\).",
        ],
        answer: "\\(\\hat{v} = \\pm\\dfrac{1}{\\sqrt{2}}(-\\hat{j} - \\hat{k})\\)",
      },
      selfCheckExample: {
        prompt:
          "Find a unit vector coplanar with \\(\\hat{i} + \\hat{j}\\) and \\(\\hat{j} + \\hat{k}\\), perpendicular to \\(\\hat{i} + \\hat{k}\\).",
        steps: [
          "\\(\\vec{v} = \\lambda(\\hat{i}+\\hat{j}) + \\mu(\\hat{j}+\\hat{k}) = \\lambda\\hat{i} + (\\lambda+\\mu)\\hat{j} + \\mu\\hat{k}\\).",
          "Perpendicular to \\(\\hat{i}+\\hat{k}\\): \\(\\lambda + \\mu = 0 \\Rightarrow \\mu = -\\lambda\\).",
          "Take \\(\\lambda = 1, \\mu = -1\\): \\(\\vec{v} = \\hat{i} + 0\\hat{j} - \\hat{k}\\); \\(|\\vec{v}| = \\sqrt{2}\\), so \\(\\hat{v} = \\pm\\tfrac{1}{\\sqrt{2}}(\\hat{i} - \\hat{k})\\).",
        ],
        answer: "\\(\\hat{v} = \\pm\\dfrac{1}{\\sqrt{2}}(\\hat{i} - \\hat{k})\\)",
      },
      practiceSet: [
        { prompt: "A vector coplanar with \\(\\vec{a}, \\vec{b}\\) is written as?", answer: "\\(\\lambda\\vec{a} + \\mu\\vec{b}\\)" },
        { prompt: "\\(\\vec{c}\\times(\\vec{a}\\times\\vec{b})\\) is perpendicular to?", answer: "\\(\\vec{c}\\)" },
        { prompt: "\\(\\vec{c}\\times(\\vec{a}\\times\\vec{b})\\) is coplanar with?", answer: "\\(\\vec{a}\\) and \\(\\vec{b}\\)" },
        { prompt: "To impose perpendicular to \\(\\vec{c}\\), set what to zero?", answer: "\\(\\vec{v}\\cdot\\vec{c}\\)" },
      ],
      pyqExampleId: "049b400f-aa2a-43ce-bc4d-c4e7228c4753",
      traps: [
        {
          title: "Coplanar means a COMBINATION, not just \"in the same plane\"",
          body:
            "Encode coplanarity with \\(\\vec{a}, \\vec{b}\\) by writing the unknown as \\(\\lambda\\vec{a} + \\mu\\vec{b}\\) from the start. " +
            "Then the only freedom left is the ratio \\(\\lambda:\\mu\\), which the perpendicularity or projection condition pins down.",
        },
        {
          title: "Both signs of the UNIT answer are valid",
          body:
            "The normalised result is \\(\\pm\\hat{v}\\) — both directions satisfy \"perpendicular and coplanar\" unless the question fixes orientation. " +
            "Pick whichever sign appears in the options.",
        },
        {
          title: "Confirm orthogonality AND coplanarity at the end",
          body:
            "A tempting distractor satisfies one condition but not the other. " +
            "Verify \\(\\vec{v}\\cdot\\vec{c} = 0\\) (perpendicular) and that \\(\\vec{v}\\) is a combination of \\(\\vec{a}, \\vec{b}\\) (coplanar) before selecting.",
        },
      ],
    },

    // 11 — cross-plus-scalar vector equation ───────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-stp-cross-scalar-equation",
      name: "Solving a vector equation: a cross condition plus a magnitude/dot condition",
      intuition:
        "A condition like \\(\\vec{r}\\times\\vec{b} = \\vec{c}\\times\\vec{b}\\) does not pin down \\(\\vec{r}\\) — it only forces \\(\\vec{r} - \\vec{c}\\) to be parallel to \\(\\vec{b}\\). " +
        "Pairing it with a scalar (dot) condition such as \\(\\vec{r}\\cdot\\vec{a} = 0\\) closes the system and gives a unique \\(\\vec{r}\\). " +
        "Problems mixing \\(\\vec{a}\\times\\vec{b}\\), a magnitude, and an angle are solved the same way: peel off the vector identity, then use the scalar data.",
      definition:
        "To solve \\(\\vec{r}\\times\\vec{b} = \\vec{c}\\times\\vec{b}\\) with a scalar condition:\n" +
        "- Rewrite as \\((\\vec{r} - \\vec{c})\\times\\vec{b} = \\vec{0}\\), so \\(\\vec{r} - \\vec{c} = t\\vec{b}\\), i.e. \\(\\vec{r} = \\vec{c} + t\\vec{b}\\).\n" +
        "- Substitute into the scalar condition (e.g. \\(\\vec{r}\\cdot\\vec{a} = 0\\)) to find \\(t\\), then \\(\\vec{r}\\).\n" +
        "- For \\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}|\\) given \\(|\\vec{c}|\\) and an angle: \\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = |\\vec{a}\\times\\vec{b}|\\,|\\vec{c}|\\sin\\phi\\), where \\(\\phi\\) is the angle between \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\), and the auxiliary conditions fix \\(|\\vec{c}|\\).",
      formula: {
        label: "Cross condition reduces to a parallel offset",
        latex:
          "\\vec{r}\\times\\vec{b} = \\vec{c}\\times\\vec{b} \\;\\Longrightarrow\\; \\vec{r} = \\vec{c} + t\\,\\vec{b}, \\quad\\text{then use the scalar condition for } t",
        symbols: [
          { symbol: "\\((\\vec{r} - \\vec{c})\\times\\vec{b} = \\vec{0}\\)", meaning: "so \\(\\vec{r} - \\vec{c}\\,\\|\\,\\vec{b}\\)" },
          { symbol: "\\(t\\)", meaning: "the one free scalar — fixed by the dot/magnitude condition" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{A} = 2\\hat{i} + \\hat{k}\\), \\(\\vec{B} = \\hat{i} + \\hat{j} + \\hat{k}\\), \\(\\vec{C} = 4\\hat{i} - 3\\hat{j} + 7\\hat{k}\\). Find \\(\\vec{R}\\) with \\(\\vec{R}\\times\\vec{B} = \\vec{C}\\times\\vec{B}\\) and \\(\\vec{R}\\cdot\\vec{A} = 0\\).",
        steps: [
          "\\(\\vec{R}\\times\\vec{B} = \\vec{C}\\times\\vec{B}\\) ⇒ \\((\\vec{R} - \\vec{C})\\times\\vec{B} = \\vec{0}\\) ⇒ \\(\\vec{R} = \\vec{C} + t\\vec{B}\\).",
          "So \\(\\vec{R} = (4 + t)\\hat{i} + (-3 + t)\\hat{j} + (7 + t)\\hat{k}\\).",
          "Impose \\(\\vec{R}\\cdot\\vec{A} = 0\\): \\(2(4 + t) + 0(-3 + t) + 1(7 + t) = 0 \\Rightarrow 8 + 2t + 7 + t = 0 \\Rightarrow 3t = -15 \\Rightarrow t = -5\\).",
          "Substitute: \\(\\vec{R} = -\\hat{i} - 8\\hat{j} + 2\\hat{k}\\).",
        ],
        answer: "\\(\\vec{R} = -\\hat{i} - 8\\hat{j} + 2\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find \\(\\vec{r}\\) with \\(\\vec{r}\\times\\vec{b} = \\vec{c}\\times\\vec{b}\\) and \\(\\vec{r}\\cdot\\vec{a} = 4\\), where \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\), \\(\\vec{b} = \\hat{k}\\) and \\(\\vec{c} = 2\\hat{i} + \\hat{j} - \\hat{k}\\).",
        steps: [
          "\\((\\vec{r} - \\vec{c})\\times\\vec{b} = \\vec{0}\\) ⇒ \\(\\vec{r} = \\vec{c} + t\\vec{b} = 2\\hat{i} + \\hat{j} + (-1 + t)\\hat{k}\\).",
          "Impose \\(\\vec{r}\\cdot\\vec{a} = 4\\): \\(2 + 1 + (-1 + t) = 4 \\Rightarrow 2 + t = 4 \\Rightarrow t = 2\\).",
          "Substitute: \\(\\vec{r} = 2\\hat{i} + \\hat{j} + \\hat{k}\\).",
        ],
        answer: "\\(\\vec{r} = 2\\hat{i} + \\hat{j} + \\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{r}\\times\\vec{b} = \\vec{c}\\times\\vec{b}\\) implies \\(\\vec{r} - \\vec{c}\\) is?", answer: "parallel to \\(\\vec{b}\\)" },
        { prompt: "So \\(\\vec{r} = ?\\)", answer: "\\(\\vec{c} + t\\vec{b}\\)" },
        { prompt: "What fixes the scalar \\(t\\)?", answer: "the dot / magnitude condition" },
        { prompt: "\\(|(\\vec{a}\\times\\vec{b})\\times\\vec{c}| = ?\\)", answer: "\\(|\\vec{a}\\times\\vec{b}||\\vec{c}|\\sin\\phi\\)", method: "\\(\\phi\\) = angle between \\(\\vec{a}\\times\\vec{b}\\) and \\(\\vec{c}\\)" },
      ],
      pyqExampleId: "27d52e5d-6d1b-4ca4-b6f6-887117f6539e",
      traps: [
        {
          title: "You cannot cancel the cross product",
          body:
            "\\(\\vec{r}\\times\\vec{b} = \\vec{c}\\times\\vec{b}\\) does NOT give \\(\\vec{r} = \\vec{c}\\). " +
            "The correct deduction is \\((\\vec{r} - \\vec{c})\\times\\vec{b} = \\vec{0}\\), i.e. \\(\\vec{r} = \\vec{c} + t\\vec{b}\\); the scalar condition then fixes \\(t\\).",
        },
        {
          title: "The cross condition alone leaves one free scalar",
          body:
            "A single cross equation can never determine \\(\\vec{r}\\) uniquely — any multiple of \\(\\vec{b}\\) can be added. " +
            "Always use the accompanying scalar (dot or magnitude) condition to close the system.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Cross Product, Angle, and Area",
      href: "/notes/mht-cet-maths/vectors/cross-product",
    },
  ],
};
