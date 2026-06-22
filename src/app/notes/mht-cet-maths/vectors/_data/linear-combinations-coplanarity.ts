import type { SubtopicNote } from "@/app/notes/_types";

export const LINEAR_COMBINATIONS_COPLANARITY_NOTE: SubtopicNote = {
  // DB subtopic name — must match live taxonomy exactly.
  subtopicName: "Linear Combinations, Collinearity, and Coplanarity",
  title: "Linear Combinations, Collinearity, and Coplanarity",
  oneLineDefinition:
    "Building one vector out of others as m·a + n·b, and the structural conditions hiding inside that idea — collinear vectors need ONE scalar, coplanar vectors need TWO, and a dependent set is exactly a coplanar one.",
  whyItMatters:
    "This is the most-tested cluster in MHT-CET Vectors — 13 PYQs sit here, spread evenly across EASY, MODERATE and HARD. " +
    "Two recurring shapes dominate: the collinearity / coplanarity conditions (one-scalar vs two-scalar, and the 'no two collinear' chain systems), " +
    "and the linear-system shapes — express a vector as m·b + n·c, find components against a transformed basis, or test linear dependence by a determinant. " +
    "Get the counting right (collinear ⇒ 1 scalar, coplanar / dependent ⇒ 2 scalars) and almost every question here reduces to a small system you can solve by equating components.",
  concepts: [
    // 1 ── FOUNDATION ──────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-linear-combination",
      name: "Linear combination of vectors",
      visualizationSlug: "component-form-basis",
      intuition:
        "A linear combination is just \\\"scale each vector by a number, then add them up.\\\" " +
        "If you have vectors \\(\\vec{a}\\) and \\(\\vec{b}\\), then \\(m\\vec{a} + n\\vec{b}\\) — for any real numbers \\(m, n\\) — is a linear combination of them. " +
        "Every expression you'll meet in this subtopic (\\(2\\vec{a} - \\vec{b} + 3\\vec{c}\\), \\(3\\vec{a} + \\vec{b} - 2\\vec{c}\\), …) is one of these. " +
        "The whole topic is about what happens when ONE vector turns out to BE a linear combination of others.",
      definition:
        "A vector \\(\\vec{r}\\) is a **linear combination** of vectors \\(\\vec{a}_1, \\vec{a}_2, \\dots, \\vec{a}_k\\) if there exist scalars \\(c_1, c_2, \\dots, c_k\\) such that " +
        "\\(\\vec{r} = c_1\\vec{a}_1 + c_2\\vec{a}_2 + \\dots + c_k\\vec{a}_k\\). " +
        "In the standard basis you build a combination componentwise: " +
        "\\(m\\vec{a} + n\\vec{b}\\) has \\(\\hat{i}\\)-component \\(ma_1 + nb_1\\), \\(\\hat{j}\\)-component \\(ma_2 + nb_2\\), and so on. " +
        "The scalars are called the **coefficients** of the combination.",
      formula: {
        label: "Linear combination",
        latex:
          "\\vec{r} = m\\vec{a} + n\\vec{b} + p\\vec{c} \\qquad r_i = ma_i + nb_i + pc_i",
        symbols: [
          { symbol: "\\(m, n, p\\)", meaning: "real scalar coefficients (any sign, including zero)" },
          { symbol: "\\(\\vec{r}\\)", meaning: "the combined vector — built componentwise" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(\\vec{a} = \\hat{i} + \\hat{k}\\), \\(\\vec{b} = 2\\hat{i} - \\hat{j}\\) and \\(\\vec{c} = \\hat{j} + 3\\hat{k}\\), compute the linear combination \\(2\\vec{a} - \\vec{b} + \\vec{c}\\) in component form.",
        steps: [
          "Scale each: \\(2\\vec{a} = 2\\hat{i} + 2\\hat{k}\\); \\(-\\vec{b} = -2\\hat{i} + \\hat{j}\\); \\(\\vec{c} = \\hat{j} + 3\\hat{k}\\).",
          "Add the \\(\\hat{i}\\)-parts: \\(2 - 2 + 0 = 0\\). The \\(\\hat{j}\\)-parts: \\(0 + 1 + 1 = 2\\). The \\(\\hat{k}\\)-parts: \\(2 + 0 + 3 = 5\\).",
          "So the combination is \\(0\\hat{i} + 2\\hat{j} + 5\\hat{k} = 2\\hat{j} + 5\\hat{k}\\).",
        ],
        answer: "\\(2\\vec{a} - \\vec{b} + \\vec{c} = 2\\hat{j} + 5\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a} = \\hat{i} + \\hat{j}\\), \\(\\vec{b} = \\hat{i} - \\hat{j}\\). Find \\(3\\vec{a} + \\vec{b}\\).", answer: "\\(4\\hat{i} + 2\\hat{j}\\)" },
        { prompt: "\\(\\vec{a} = 2\\hat{i}\\), \\(\\vec{b} = \\hat{j}\\), \\(\\vec{c} = \\hat{k}\\). Find \\(\\vec{a} - 2\\vec{b} + 3\\vec{c}\\).", answer: "\\(2\\hat{i} - 2\\hat{j} + 3\\hat{k}\\)" },
        { prompt: "What is the \\(\\hat{i}\\)-component of \\(m\\vec{a} + n\\vec{b}\\)?", answer: "\\(ma_1 + nb_1\\)", method: "componentwise" },
        { prompt: "Is \\(\\vec{0}\\) a linear combination of any \\(\\vec{a}, \\vec{b}\\)?", answer: "Yes", method: "take \\(m = n = 0\\)" },
      ],
      traps: [
        {
          title: "A linear combination is built componentwise — three sums, not one",
          body:
            "When you form \\(m\\vec{a} + n\\vec{b} + p\\vec{c}\\) in 3-D you are doing three independent scalar sums: " +
            "one for \\(\\hat{i}\\), one for \\(\\hat{j}\\), one for \\(\\hat{k}\\). " +
            "Combine the wrong components and the answer is silently wrong — keep the three columns separated.",
        },
      ],
    },

    // 2 ── FOUNDATION ──────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-collinear-condition",
      name: "Collinear vectors and collinear points (one scalar)",
      intuition:
        "Two vectors are collinear (parallel) when they point along the SAME line of direction — same way or exactly opposite. " +
        "That happens exactly when one is a scalar multiple of the other: \\(\\vec{a} = k\\vec{b}\\). ONE scalar settles it. " +
        "For three POINTS, collinearity is the point-version: \\(A, B, C\\) lie on one line when the displacement \\(\\vec{AC}\\) is a scalar multiple of \\(\\vec{AB}\\).",
      definition:
        "- **Collinear vectors:** \\(\\vec{a}\\) and \\(\\vec{b}\\) (\\(\\vec{b} \\neq \\vec{0}\\)) are collinear iff \\(\\vec{a} = k\\vec{b}\\) for some scalar \\(k\\). " +
        "In components, this means the components are proportional: \\(\\dfrac{a_1}{b_1} = \\dfrac{a_2}{b_2} = \\dfrac{a_3}{b_3}\\).\n" +
        "- **Collinear points:** \\(A, B, C\\) (position vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\)) are collinear iff \\(\\vec{AB} \\parallel \\vec{AC}\\), i.e. \\(\\vec{b} - \\vec{a} = k(\\vec{c} - \\vec{a})\\) for some scalar \\(k\\).\n" +
        "- **\\\"is collinear with\\\":** the phrase \\(\\vec{u}\\) is collinear with \\(\\vec{v}\\) means \\(\\vec{u} = t\\vec{v}\\) — introduce ONE unknown scalar and solve.",
      formula: {
        label: "Collinearity (one scalar)",
        latex:
          "\\vec{a} = k\\vec{b} \\qquad \\dfrac{a_1}{b_1} = \\dfrac{a_2}{b_2} = \\dfrac{a_3}{b_3}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "the single scalar; \\(k > 0\\) same direction, \\(k < 0\\) opposite" },
        ],
      },
      authoredExample: {
        prompt:
          "Are \\(\\vec{a} = 2\\hat{i} - 3\\hat{j} + 4\\hat{k}\\) and \\(\\vec{b} = -4\\hat{i} + 6\\hat{j} - 8\\hat{k}\\) collinear? If so, find \\(k\\) with \\(\\vec{b} = k\\vec{a}\\).",
        steps: [
          "Look for one scalar \\(k\\) with \\(\\vec{b} = k\\vec{a}\\). From \\(\\hat{i}\\): \\(-4 = 2k \\Rightarrow k = -2\\).",
          "Check the other components with \\(k = -2\\): \\(\\hat{j}\\): \\(-2(-3) = 6\\) \\(\\checkmark\\); \\(\\hat{k}\\): \\(-2(4) = -8\\) \\(\\checkmark\\).",
          "All three components agree on the SAME \\(k\\), so the vectors are collinear (anti-parallel, \\(k < 0\\)).",
        ],
        answer: "Collinear; \\(\\vec{b} = -2\\vec{a}\\), so \\(k = -2\\).",
      },
      selfCheckExample: {
        prompt:
          "For what value of \\(\\lambda\\) is \\(\\vec{a} = \\lambda\\hat{i} + 2\\hat{j}\\) collinear with \\(\\vec{b} = 3\\hat{i} + 6\\hat{j}\\)?",
        steps: [
          "Collinear ⇒ components proportional: \\(\\dfrac{\\lambda}{3} = \\dfrac{2}{6}\\).",
          "\\(\\dfrac{2}{6} = \\dfrac{1}{3}\\), so \\(\\dfrac{\\lambda}{3} = \\dfrac{1}{3} \\Rightarrow \\lambda = 1\\).",
        ],
        answer: "\\(\\lambda = 1\\).",
      },
      practiceSet: [
        { prompt: "Are \\(\\hat{i} + \\hat{j}\\) and \\(3\\hat{i} + 3\\hat{j}\\) collinear?", answer: "Yes", method: "second \\(= 3 \\times\\) first" },
        { prompt: "How many scalars settle whether two vectors are collinear?", answer: "One", method: "\\(\\vec{a} = k\\vec{b}\\)" },
        { prompt: "Find \\(k\\) if \\(6\\hat{i} - 9\\hat{j} = k(2\\hat{i} - 3\\hat{j})\\).", answer: "\\(k = 3\\)" },
        { prompt: "Points \\(A, B, C\\) collinear means \\(\\vec{AB}\\) is a ___ of \\(\\vec{AC}\\).", answer: "scalar multiple" },
      ],
      traps: [
        {
          title: "Collinear needs ONE scalar; coplanar needs TWO — keep the count straight",
          body:
            "Whenever a question says \\\"collinear / parallel,\\\" introduce ONE unknown scalar (\\(\\vec{u} = t\\vec{v}\\)). " +
            "If it says \\\"coplanar / lies in the plane of,\\\" introduce TWO (\\(\\vec{u} = m\\vec{v} + n\\vec{w}\\)). " +
            "Mixing up the count is the single biggest source of wrong setups in this subtopic.",
        },
        {
          title: "Parallel VECTORS vs collinear POINTS",
          body:
            "Vectors are parallel when they share a direction; points are collinear when they share a LINE. " +
            "Test points by displacements: \\(A, B, C\\) collinear iff \\(\\vec{AB} \\parallel \\vec{AC}\\) (they share point \\(A\\)), not merely \\\"some pair of vectors is parallel.\\\"",
        },
      ],
    },

    // 3 ── FOUNDATION ──────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-coplanar-condition",
      name: "Coplanar vectors (two scalars)",
      visualizationSlug: "orthonormal-triple",
      intuition:
        "Three vectors are coplanar when you can draw all three flat in one plane. " +
        "If \\(\\vec{b}\\) and \\(\\vec{c}\\) are not collinear, they span a plane; a third vector \\(\\vec{a}\\) lies in that plane exactly when it's a linear combination of them: \\(\\vec{a} = m\\vec{b} + n\\vec{c}\\). " +
        "TWO scalars, because the plane is 2-dimensional. " +
        "A vector that lies in / bisects / is perpendicular within the plane of \\(\\vec{b}, \\vec{c}\\) is always of this form.",
      definition:
        "Three vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are **coplanar** iff one is a linear combination of the other two: " +
        "\\(\\vec{a} = m\\vec{b} + n\\vec{c}\\) for some scalars \\(m, n\\) (assuming \\(\\vec{b}, \\vec{c}\\) non-collinear). " +
        "Equivalently, their **scalar triple product vanishes**: \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\), i.e. the determinant of their components is zero. " +
        "\\\"Lies in the plane of \\(\\vec{b}\\) and \\(\\vec{c}\\)\\\" is the phrase that signals this: write the unknown vector as \\(m\\vec{b} + n\\vec{c}\\) and solve for \\(m, n\\).",
      formula: {
        label: "Coplanarity (two scalars)",
        latex:
          "\\vec{a} = m\\vec{b} + n\\vec{c} \\qquad [\\vec{a}\\ \\vec{b}\\ \\vec{c}] = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = 0",
        symbols: [
          { symbol: "\\(m, n\\)", meaning: "the two scalars — one per spanning vector" },
          { symbol: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}]\\)", meaning: "scalar triple product; zero ⟺ coplanar" },
        ],
      },
      authoredExample: {
        prompt:
          "Show that \\(\\vec{a} = 3\\hat{i} + \\hat{j}\\) is coplanar with \\(\\vec{b} = \\hat{i} + \\hat{j}\\) and \\(\\vec{c} = \\hat{i} - \\hat{j}\\) by writing \\(\\vec{a} = m\\vec{b} + n\\vec{c}\\).",
        steps: [
          "Set \\(3\\hat{i} + \\hat{j} = m(\\hat{i} + \\hat{j}) + n(\\hat{i} - \\hat{j})\\) and equate components.",
          "\\(\\hat{i}\\): \\(m + n = 3\\). \\(\\hat{j}\\): \\(m - n = 1\\).",
          "Add: \\(2m = 4 \\Rightarrow m = 2\\); then \\(n = 1\\). A solution exists, so \\(\\vec{a}\\) is coplanar with \\(\\vec{b}, \\vec{c}\\).",
        ],
        answer: "\\(\\vec{a} = 2\\vec{b} + \\vec{c}\\) (so \\(m = 2,\\ n = 1\\)); the three are coplanar.",
      },
      practiceSet: [
        { prompt: "How many scalars express a vector in the plane of two others?", answer: "Two", method: "\\(m\\vec{b} + n\\vec{c}\\)" },
        { prompt: "Coplanar ⟺ scalar triple product equals ___.", answer: "\\(0\\)" },
        { prompt: "Write \\(2\\hat{i}\\) as \\(m(\\hat{i}+\\hat{j}) + n(\\hat{i}-\\hat{j})\\). Find \\(m, n\\).", answer: "\\(m = 1,\\ n = 1\\)" },
        { prompt: "If \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] \\neq 0\\), are they coplanar?", answer: "No", method: "non-zero ⇒ non-coplanar" },
      ],
      traps: [
        {
          title: "Coplanar / dependent ⇒ TWO scalars and a vanishing determinant",
          body:
            "For coplanarity you have two equivalent tests: express the vector as \\(m\\vec{b} + n\\vec{c}\\) (good when you need \\(m, n\\)), " +
            "or set the \\(3\\times 3\\) determinant of the components to zero (good for a yes/no or for finding an unknown component). " +
            "Pick the test that matches what the question asks for.",
        },
      ],
    },

    // 4 ── ANCHORED ────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-forming-combinations",
      name: "Forming a combination, then normalising / measuring it",
      intuition:
        "The most common EASY-to-MODERATE shape: you're handed \\(\\vec{a}, \\vec{b}, \\vec{c}\\) and asked about a combination like \\(2\\vec{a} - \\vec{b} + 3\\vec{c}\\) — " +
        "find a unit vector along it, a parallel vector of given magnitude, or the angle it makes with another combination. " +
        "The skill is the same every time: BUILD the combination componentwise first, then apply magnitude / unit-vector / angle as a second step.",
      definition:
        "Once a linear combination \\(\\vec{r} = m\\vec{a} + n\\vec{b} + p\\vec{c}\\) is built componentwise, the follow-up is routine:\n" +
        "- **Unit vector along \\(\\vec{r}\\):** \\(\\hat{r} = \\vec{r}/|\\vec{r}|\\).\n" +
        "- **Vector of magnitude \\(M\\) parallel to \\(\\vec{r}\\):** \\(M\\,\\hat{r} = \\dfrac{M}{|\\vec{r}|}\\vec{r}\\).\n" +
        "- **Angle between two combinations \\(\\vec{u}, \\vec{v}\\):** \\(\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}\\).",
      formula: {
        label: "Scale a combination to a target magnitude",
        latex:
          "M\\,\\hat{r} = \\dfrac{M}{|\\vec{r}|}\\,\\vec{r} \\qquad \\hat{r} = \\dfrac{\\vec{r}}{|\\vec{r}|}",
        symbols: [
          { symbol: "\\(\\vec{r}\\)", meaning: "the linear combination, built first" },
          { symbol: "\\(M\\)", meaning: "the required magnitude of the parallel vector" },
        ],
      },
      authoredExample: {
        prompt:
          "Given \\(\\vec{a} = \\hat{i} + 2\\hat{j}\\), \\(\\vec{b} = 3\\hat{i} - \\hat{j}\\), find a vector of magnitude \\(10\\) parallel to \\(\\vec{a} + \\vec{b}\\).",
        steps: [
          "Build the combination: \\(\\vec{r} = \\vec{a} + \\vec{b} = (1+3)\\hat{i} + (2-1)\\hat{j} = 4\\hat{i} + 3\\hat{j}\\).",
          "Magnitude: \\(|\\vec{r}| = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5\\).",
          "Scale to magnitude \\(10\\): \\(\\dfrac{10}{5}\\vec{r} = 2(4\\hat{i} + 3\\hat{j}) = 8\\hat{i} + 6\\hat{j}\\).",
        ],
        answer: "\\(8\\hat{i} + 6\\hat{j}\\) (the negative \\(-8\\hat{i} - 6\\hat{j}\\) is also parallel).",
      },
      practiceSet: [
        { prompt: "\\(\\vec{r} = 3\\hat{i} + 4\\hat{j}\\). Find the unit vector along \\(\\vec{r}\\).", answer: "\\(\\tfrac{1}{5}(3\\hat{i} + 4\\hat{j})\\)", method: "\\(\\vec{r}/|\\vec{r}|\\)" },
        { prompt: "A vector of magnitude \\(6\\) parallel to \\(\\vec{r} = \\hat{i} - 2\\hat{j} + 2\\hat{k}\\)?", answer: "\\(2(\\hat{i} - 2\\hat{j} + 2\\hat{k})\\)", method: "\\(|\\vec{r}| = 3\\); scale by 2" },
        { prompt: "First step before normalising \\(2\\vec{a} - \\vec{b}\\)?", answer: "Build it componentwise" },
        { prompt: "\\(\\cos\\theta\\) between \\(\\vec{u}, \\vec{v}\\)?", answer: "\\(\\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}||\\vec{v}|}\\)" },
      ],
      pyqExampleId: "9fa4714c-0082-43d1-be05-2b2cb0965996",
      traps: [
        {
          title: "Build the combination BEFORE you normalise — don't normalise the parts",
          body:
            "To find a unit vector along \\(3\\vec{a} + \\vec{b} - 2\\vec{c}\\) you must combine first, get one vector, THEN divide by its magnitude. " +
            "Normalising \\(\\vec{a}, \\vec{b}, \\vec{c}\\) separately and combining the unit vectors gives a different (wrong) direction.",
        },
        {
          title: "\\\"Parallel of magnitude \\(M\\)\\\" has TWO answers — \\(\\pm M\\hat{r}\\)",
          body:
            "A vector parallel to \\(\\vec{r}\\) can point the same way OR the opposite way, so both \\(+M\\hat{r}\\) and \\(-M\\hat{r}\\) qualify. " +
            "MCQs usually list only one; if your computed direction isn't an option, check its negative before assuming an error.",
        },
      ],
    },

    // 5 ── ANCHORED ────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-three-point-collinearity",
      name: "Collinearity of three points (and who lies between)",
      intuition:
        "Three points \\(P, Q, R\\) are collinear when the segments between them lie on one straight line. " +
        "Test it by displacements: compute \\(\\vec{PQ}\\) and \\(\\vec{QR}\\) (or \\(\\vec{PR}\\)); if one is a scalar multiple of the other AND they share a common point, the points are collinear. " +
        "The sign and size of the multiplier even tells you the ORDER — who sits between whom.",
      definition:
        "Points \\(P, Q, R\\) with position vectors \\(\\vec{p}, \\vec{q}, \\vec{r}\\) are collinear iff " +
        "\\(\\vec{QR} = k\\,\\vec{PQ}\\) (or any two displacements are proportional), where \\(\\vec{PQ} = \\vec{q} - \\vec{p}\\), \\(\\vec{QR} = \\vec{r} - \\vec{q}\\). " +
        "Reading the multiplier: if \\(\\vec{QR} = k\\,\\vec{PQ}\\) with \\(k > 0\\), the line goes \\(P \\to Q \\to R\\) so **\\(Q\\) lies between \\(P\\) and \\(R\\)**; " +
        "a negative \\(k\\) means \\(R\\) doubles back, putting a different point in the middle.",
      formula: {
        label: "Three-point collinearity",
        latex:
          "\\vec{QR} = k\\,\\vec{PQ} \\quad\\text{where}\\quad \\vec{PQ} = \\vec{q} - \\vec{p},\\ \\ \\vec{QR} = \\vec{r} - \\vec{q}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "the scalar; its sign/size fixes the order of the points" },
        ],
      },
      authoredExample: {
        prompt:
          "Are \\(P(\\hat{i} + \\hat{j})\\), \\(Q(3\\hat{i} + 3\\hat{j})\\), \\(R(6\\hat{i} + 6\\hat{j})\\) collinear? Who lies between?",
        steps: [
          "Displacements: \\(\\vec{PQ} = \\vec{q} - \\vec{p} = 2\\hat{i} + 2\\hat{j}\\); \\(\\vec{QR} = \\vec{r} - \\vec{q} = 3\\hat{i} + 3\\hat{j}\\).",
          "Test proportionality: \\(\\vec{QR} = \\tfrac{3}{2}\\vec{PQ}\\) — yes, a scalar multiple, and they share point \\(Q\\). So collinear.",
          "The multiplier \\(\\tfrac{3}{2} > 0\\), so the order along the line is \\(P \\to Q \\to R\\): \\(Q\\) lies between \\(P\\) and \\(R\\).",
        ],
        answer: "Collinear; \\(Q\\) lies between \\(P\\) and \\(R\\).",
      },
      practiceSet: [
        { prompt: "\\(\\vec{PQ} = \\hat{i} + \\hat{j}\\), \\(\\vec{QR} = 2\\hat{i} + 2\\hat{j}\\). Collinear?", answer: "Yes", method: "\\(\\vec{QR} = 2\\vec{PQ}\\)" },
        { prompt: "Displacement \\(\\vec{PQ}\\) for \\(P(2\\hat{i})\\), \\(Q(5\\hat{i})\\)?", answer: "\\(3\\hat{i}\\)", method: "\\(\\vec{q} - \\vec{p}\\)" },
        { prompt: "If \\(\\vec{QR} = 3\\vec{PQ}\\), who is between \\(P\\) and \\(R\\)?", answer: "\\(Q\\)", method: "positive multiplier ⇒ \\(P\\to Q\\to R\\)" },
        { prompt: "Are \\(\\vec{PQ}\\) and \\(\\vec{QR}\\) non-proportional ⇒ points are?", answer: "Non-collinear" },
      ],
      pyqExampleId: "7aae1254-8849-476d-b75b-8d43c352a737",
      traps: [
        {
          title: "Use displacements that SHARE a point",
          body:
            "To conclude collinearity from \\(\\vec{QR} = k\\vec{PQ}\\) the two displacements must share a common point (here \\(Q\\)). " +
            "Two parallel displacements that don't share a point only say the segments are parallel — not that all the points lie on ONE line.",
        },
      ],
    },

    // 6 ── ANCHORED ────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-express-as-combination",
      name: "Express a vector as a combination of two others",
      intuition:
        "Given \\(\\vec{a} = m\\vec{b} + n\\vec{c}\\), the question hands you \\(\\vec{a}, \\vec{b}, \\vec{c}\\) and asks for the scalars \\(m, n\\). " +
        "Equate components and you get a small linear system — usually two equations from two of the three components are enough; the third is a free consistency check. " +
        "Solve, then read off whatever the question wants (often \\(m + n\\) or \\(mn\\)).",
      definition:
        "To write \\(\\vec{a} = m\\vec{b} + n\\vec{c}\\): equate each component to get the system " +
        "\\(a_1 = mb_1 + nc_1\\), \\(a_2 = mb_2 + nc_2\\), \\(a_3 = mb_3 + nc_3\\). " +
        "Pick the two simplest equations, solve for \\(m\\) and \\(n\\), then verify with the remaining one. " +
        "If the third equation also holds, the representation is valid (the three vectors are coplanar); if it fails, no such \\(m, n\\) exist.",
      formula: {
        label: "Two-equation linear system",
        latex:
          "\\begin{cases} a_1 = mb_1 + nc_1 \\\\ a_2 = mb_2 + nc_2 \\end{cases}\\ \\Rightarrow\\ m,\\ n",
        symbols: [
          { symbol: "\\(m, n\\)", meaning: "coefficients to solve for; the 3rd component is the check" },
        ],
      },
      authoredExample: {
        prompt:
          "Write \\(\\vec{a} = 5\\hat{i} + \\hat{j}\\) as \\(m\\vec{b} + n\\vec{c}\\) with \\(\\vec{b} = \\hat{i} + \\hat{j}\\), \\(\\vec{c} = \\hat{i} - \\hat{j}\\). Find \\(m + n\\).",
        steps: [
          "Equate components: \\(\\hat{i}\\): \\(m + n = 5\\); \\(\\hat{j}\\): \\(m - n = 1\\).",
          "Add: \\(2m = 6 \\Rightarrow m = 3\\); subtract: \\(2n = 4 \\Rightarrow n = 2\\).",
          "So \\(m + n = 3 + 2 = 5\\). (Check: \\(3\\vec{b} + 2\\vec{c} = 3\\hat{i}+3\\hat{j} + 2\\hat{i}-2\\hat{j} = 5\\hat{i} + \\hat{j}\\) \\(\\checkmark\\).)",
        ],
        answer: "\\(m = 3,\\ n = 2\\), so \\(m + n = 5\\).",
      },
      practiceSet: [
        { prompt: "\\(2\\hat{i} = m(\\hat{i}+\\hat{j}) + n(\\hat{i}-\\hat{j})\\). Find \\(m, n\\).", answer: "\\(m = 1,\\ n = 1\\)" },
        { prompt: "How many equations does equating components in 3-D give?", answer: "Three", method: "one per axis" },
        { prompt: "What does the third component equation provide?", answer: "A consistency check" },
        { prompt: "If the check fails, the representation ___.", answer: "does not exist", method: "vectors non-coplanar" },
      ],
      pyqExampleId: "3a41f933-0c43-4c48-80ca-cfb289d4c386",
      traps: [
        {
          title: "Solve from two equations, but ALWAYS verify with the third",
          body:
            "Two component-equations pin down \\(m, n\\) — but in 3-D there's a third equation. " +
            "If it doesn't hold, no valid \\(m, n\\) exist (the vectors aren't coplanar). Skipping the check can hand you scalars that don't actually reproduce \\(\\vec{a}\\).",
        },
      ],
    },

    // 7 ── ANCHORED ────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-linear-dependence",
      name: "Linear dependence vs independence (the determinant test)",
      intuition:
        "A set of vectors is **dependent** when one of them is \\\"redundant\\\" — expressible from the others, so they don't truly fill the space. " +
        "In 3-D, three vectors are dependent exactly when they're coplanar (one lies in the plane of the other two), and that shows up as a ZERO determinant. " +
        "Three vectors are **independent** when only the all-zero combination gives the zero vector — nothing is redundant.",
      definition:
        "Vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are **linearly dependent** if there exist scalars \\(x, y, z\\), not all zero, with " +
        "\\(x\\vec{a} + y\\vec{b} + z\\vec{c} = \\vec{0}\\). They are **independent** if \\(x\\vec{a} + y\\vec{b} + z\\vec{c} = \\vec{0}\\) forces \\(x = y = z = 0\\). " +
        "**Test in 3-D:** dependent ⟺ coplanar ⟺ the determinant of their components is zero:\n" +
        "- \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\) ⇒ dependent / coplanar.\n" +
        "- \\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] \\neq 0\\) ⇒ independent / non-coplanar (they form a basis).",
      formula: {
        label: "Dependence ⟺ vanishing determinant",
        latex:
          "x\\vec{a} + y\\vec{b} + z\\vec{c} = \\vec{0}\\ (\\text{not all }0) \\iff \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = 0",
        symbols: [
          { symbol: "\\(x, y, z\\)", meaning: "scalars; a non-trivial solution means dependent" },
        ],
      },
      authoredExample: {
        prompt:
          "For what value of \\(\\lambda\\) are \\(\\vec{a} = \\hat{i} + \\hat{j} + \\hat{k}\\), \\(\\vec{b} = 2\\hat{i} + 3\\hat{j} + 4\\hat{k}\\), \\(\\vec{c} = \\hat{i} + \\hat{j} + \\lambda\\hat{k}\\) linearly dependent?",
        steps: [
          "Dependent ⟺ determinant zero. Write the components as rows: \\(\\begin{vmatrix} 1 & 1 & 1 \\\\ 2 & 3 & 4 \\\\ 1 & 1 & \\lambda \\end{vmatrix} = 0\\).",
          "Rows 1 and 3 differ only in the last entry, so expand: \\(1(3\\lambda - 4) - 1(2\\lambda - 4) + 1(2 - 3) = 0\\).",
          "Simplify: \\((3\\lambda - 4) - (2\\lambda - 4) - 1 = \\lambda - 1 = 0 \\Rightarrow \\lambda = 1\\).",
        ],
        answer: "\\(\\lambda = 1\\) (then \\(\\vec{c} = \\vec{a}\\), trivially dependent).",
      },
      practiceSet: [
        { prompt: "Three coplanar vectors are linearly ___.", answer: "dependent" },
        { prompt: "\\([\\vec{a}\\ \\vec{b}\\ \\vec{c}] = 0\\) means the vectors are?", answer: "Dependent / coplanar" },
        { prompt: "If \\(x\\vec{a}+y\\vec{b}+z\\vec{c}=\\vec{0}\\) only when \\(x=y=z=0\\), they are?", answer: "Independent" },
        { prompt: "Three independent 3-D vectors form a ___.", answer: "basis" },
      ],
      pyqExampleId: "59510167-20e7-48d9-99a4-06e7c449c126",
      traps: [
        {
          title: "Linearly dependent = coplanar = zero determinant — three names, one idea",
          body:
            "In 3-D these are the SAME condition. A question may phrase it as \\\"linearly dependent,\\\" \\\"coplanar,\\\" or \\\"scalar triple product is zero\\\" — " +
            "all three send you to the same \\(3\\times 3\\) determinant set to zero.",
        },
        {
          title: "A second condition (like \\(|\\vec{c}| = \\sqrt{3}\\)) is part of the same problem",
          body:
            "Dependence often fixes only ONE unknown (e.g. \\(\\beta = 1\\)). " +
            "A magnitude condition supplies the OTHER (e.g. \\(1 + \\alpha^2 + 1 = 3 \\Rightarrow \\alpha = \\pm 1\\)). " +
            "Use both givens — don't stop after the determinant.",
        },
      ],
    },

    // 8 ── ANCHORED ────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-collinear-pair-system",
      name: "Chained-collinearity systems (\\\"no two collinear\\\")",
      intuition:
        "The signature HARD shape: \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are three vectors, no two collinear, and you're told two collinearity facts — " +
        "\\\"\\(\\vec{a} + 2\\vec{b}\\) is collinear with \\(\\vec{c}\\)\\\" and \\\"\\(\\vec{b} + 3\\vec{c}\\) is collinear with \\(\\vec{a}\\).\\\" " +
        "Each fact gives ONE scalar equation; equate coefficients of the (independent) \\(\\vec{a}, \\vec{b}, \\vec{c}\\) on both sides, solve the little system, and the result is forced.",
      definition:
        "Turn each \\\"collinear with\\\" into a scalar multiple, then use independence to match coefficients:\n" +
        "- \\(\\vec{a} + 2\\vec{b} = t\\vec{c}\\) (one scalar \\(t\\)).\n" +
        "- \\(\\vec{b} + 3\\vec{c} = \\lambda\\vec{a}\\) (one scalar \\(\\lambda\\)).\n" +
        "Substitute one into the other and compare coefficients of the linearly-independent \\(\\vec{a}, \\vec{b}, \\vec{c}\\) (each side's coefficient of a given basis vector must match). " +
        "This pins down \\(t, \\lambda\\) — typically \\(t = -6,\\ \\lambda = -\\tfrac{1}{2}\\) — and yields the target, e.g. \\(\\vec{a} + 2\\vec{b} = -6\\vec{c}\\), so \\(\\vec{a} + 2\\vec{b} + 6\\vec{c} = \\vec{0}\\).",
      formula: {
        label: "Chained collinearity",
        latex:
          "\\vec{a} + 2\\vec{b} = t\\vec{c}, \\quad \\vec{b} + 3\\vec{c} = \\lambda\\vec{a} \\;\\Rightarrow\\; t = -6,\\ \\lambda = -\\tfrac{1}{2}",
        symbols: [
          { symbol: "\\(t, \\lambda\\)", meaning: "one scalar per collinearity fact; matched via coefficient comparison" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(\\vec{a}, \\vec{b}, \\vec{c}\\): no two collinear. \\(\\vec{a} + 2\\vec{b}\\) is collinear with \\(\\vec{c}\\), and \\(\\vec{b} + 3\\vec{c}\\) is collinear with \\(\\vec{a}\\). Find \\(\\vec{a} + 2\\vec{b}\\) in terms of \\(\\vec{c}\\).",
        steps: [
          "Write the two facts: \\(\\vec{a} + 2\\vec{b} = t\\vec{c}\\) and \\(\\vec{b} + 3\\vec{c} = \\lambda\\vec{a}\\).",
          "From the first, \\(\\vec{a} = t\\vec{c} - 2\\vec{b}\\). Substitute into the second: \\(\\vec{b} + 3\\vec{c} = \\lambda(t\\vec{c} - 2\\vec{b}) = -2\\lambda\\vec{b} + \\lambda t\\,\\vec{c}\\).",
          "Match coefficients (\\(\\vec{b}, \\vec{c}\\) independent): \\(\\vec{b}\\): \\(1 = -2\\lambda \\Rightarrow \\lambda = -\\tfrac{1}{2}\\). \\(\\vec{c}\\): \\(3 = \\lambda t = -\\tfrac{1}{2}t \\Rightarrow t = -6\\).",
          "So \\(\\vec{a} + 2\\vec{b} = t\\vec{c} = -6\\vec{c}\\).",
        ],
        answer: "\\(\\vec{a} + 2\\vec{b} = -6\\vec{c}\\) (equivalently \\(\\vec{a} + 2\\vec{b} + 6\\vec{c} = \\vec{0}\\)).",
      },
      practiceSet: [
        { prompt: "\\\"\\(\\vec{u}\\) is collinear with \\(\\vec{v}\\)\\\" becomes which equation?", answer: "\\(\\vec{u} = t\\vec{v}\\)", method: "one scalar" },
        { prompt: "From \\(\\vec{a}+2\\vec{b} = -6\\vec{c}\\), find \\(\\vec{a}+2\\vec{b}+6\\vec{c}\\).", answer: "\\(\\vec{0}\\)" },
        { prompt: "How many unknown scalars do two collinearity facts give?", answer: "Two", method: "one per fact" },
        { prompt: "Why can you match coefficients of \\(\\vec{a}, \\vec{b}, \\vec{c}\\)?", answer: "They are linearly independent (no two collinear)" },
      ],
      pyqExampleId: "fed7ae87-de94-42ed-8f11-8fceb51ccda7",
      traps: [
        {
          title: "Match coefficients only because the vectors are independent",
          body:
            "\\\"No two collinear\\\" (in fact, all three independent) is the hypothesis that LETS you equate coefficients of \\(\\vec{a}, \\vec{b}, \\vec{c}\\) on both sides. " +
            "Without independence you couldn't conclude that equal vector-expressions force equal coefficients.",
        },
        {
          title: "Read the target carefully: \\(\\vec{a}+2\\vec{b}\\) vs \\(\\vec{a}+2\\vec{b}+6\\vec{c}\\)",
          body:
            "The same setup answers two different MCQ targets. If \\(\\vec{a}+2\\vec{b} = -6\\vec{c}\\), then the value of \\(\\vec{a}+2\\vec{b}\\) is \\(-6\\vec{c}\\), " +
            "but the value of \\(\\vec{a}+2\\vec{b}+6\\vec{c}\\) is \\(\\vec{0}\\). Answer the one actually asked.",
        },
      ],
    },

    // 9 ── ANCHORED ────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-vector-in-plane",
      name: "A vector lying in the plane of two others",
      visualizationSlug: "orthonormal-triple",
      intuition:
        "When a question says a vector \\\"lies in the plane of \\(\\vec{b}\\) and \\(\\vec{c}\\)\\\" (or is coplanar with them), write it as \\(\\vec{v} = \\vec{b} + \\lambda\\vec{c}\\) (or \\(m\\vec{b} + n\\vec{c}\\)) — TWO scalars. " +
        "Then a SECOND condition (it bisects the angle, is perpendicular to one of them, has a given projection or magnitude) pins down the scalar(s). " +
        "Coplanarity supplies the FORM; the extra condition supplies the NUMBERS.",
      definition:
        "A vector \\(\\vec{v}\\) coplanar with non-collinear \\(\\vec{b}, \\vec{c}\\) has the form \\(\\vec{v} = m\\vec{b} + n\\vec{c}\\). " +
        "Common second conditions and how to use them:\n" +
        "- **Bisects the angle between \\(\\vec{b}, \\vec{c}\\):** \\(\\vec{v}\\) is parallel to \\(\\hat{b} + \\hat{c}\\) (sum of the UNIT vectors).\n" +
        "- **Perpendicular to \\(\\vec{q}\\):** impose \\(\\vec{v}\\cdot\\vec{q} = 0\\).\n" +
        "- **Projection on \\(\\vec{c}\\) equals \\(k\\):** impose \\(\\dfrac{\\vec{v}\\cdot\\vec{c}}{|\\vec{c}|} = k\\).\n" +
        "- **Magnitude \\(M\\):** scale the resulting direction to length \\(M\\).",
      formula: {
        label: "Coplanar form + a second condition",
        latex:
          "\\vec{v} = m\\vec{b} + n\\vec{c} \\quad\\text{with}\\quad \\vec{v}\\cdot\\vec{q} = 0 \\ \\text{ or }\\ \\dfrac{\\vec{v}\\cdot\\vec{c}}{|\\vec{c}|} = k",
        symbols: [
          { symbol: "\\(m, n\\)", meaning: "two scalars from coplanarity" },
          { symbol: "second condition", meaning: "bisector / perpendicular / projection / magnitude — fixes the scalars" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a vector \\(\\vec{v}\\) in the plane of \\(\\vec{b} = \\hat{i} + \\hat{j}\\) and \\(\\vec{c} = \\hat{j} + \\hat{k}\\) that is perpendicular to \\(\\vec{c}\\).",
        steps: [
          "Coplanar form: \\(\\vec{v} = \\vec{b} + \\lambda\\vec{c} = \\hat{i} + (1+\\lambda)\\hat{j} + \\lambda\\hat{k}\\).",
          "Perpendicular to \\(\\vec{c}\\): \\(\\vec{v}\\cdot\\vec{c} = 0\\). Here \\(\\vec{v}\\cdot\\vec{c} = (1+\\lambda)\\cdot 1 + \\lambda\\cdot 1 = 1 + 2\\lambda\\).",
          "Set \\(1 + 2\\lambda = 0 \\Rightarrow \\lambda = -\\tfrac{1}{2}\\). Then \\(\\vec{v} = \\hat{i} + \\tfrac{1}{2}\\hat{j} - \\tfrac{1}{2}\\hat{k}\\), or scaling by 2, \\(2\\hat{i} + \\hat{j} - \\hat{k}\\).",
        ],
        answer: "\\(\\vec{v} = 2\\hat{i} + \\hat{j} - \\hat{k}\\) (any non-zero multiple works).",
      },
      selfCheckExample: {
        prompt:
          "Find a vector in the plane of \\(\\vec{b} = \\hat{i} + \\hat{j}\\) and \\(\\vec{c} = \\hat{i} - \\hat{j}\\) perpendicular to \\(\\vec{b}\\).",
        steps: [
          "Coplanar form: \\(\\vec{v} = \\vec{b} + \\lambda\\vec{c} = (1+\\lambda)\\hat{i} + (1-\\lambda)\\hat{j}\\).",
          "Perpendicular to \\(\\vec{b}\\): \\(\\vec{v}\\cdot\\vec{b} = (1+\\lambda) + (1-\\lambda) = 2 \\neq 0\\) — never zero this way, so use \\(\\vec{v} = m\\vec{b} + n\\vec{c}\\). Impose \\(\\vec{v}\\cdot\\vec{b} = 0\\): \\((m+n)\\cdot 1 + (m-n)\\cdot 1 = 2m = 0 \\Rightarrow m = 0\\).",
          "So \\(\\vec{v} = n\\vec{c} = n(\\hat{i} - \\hat{j})\\); take \\(n = 1\\): \\(\\vec{v} = \\hat{i} - \\hat{j}\\). Check \\(\\vec{v}\\cdot\\vec{b} = 1 - 1 = 0\\) \\(\\checkmark\\).",
        ],
        answer: "\\(\\vec{v} = \\hat{i} - \\hat{j}\\) (any multiple of \\(\\vec{c}\\), which is already \\(\\perp\\vec{b}\\)).",
      },
      practiceSet: [
        { prompt: "Form of a vector coplanar with \\(\\vec{b}, \\vec{c}\\)?", answer: "\\(m\\vec{b} + n\\vec{c}\\)", method: "two scalars" },
        { prompt: "Angle-bisector of \\(\\vec{b}, \\vec{c}\\) is parallel to?", answer: "\\(\\hat{b} + \\hat{c}\\)", method: "sum of UNIT vectors" },
        { prompt: "\\\"Perpendicular to \\(\\vec{q}\\)\\\" gives which equation?", answer: "\\(\\vec{v}\\cdot\\vec{q} = 0\\)" },
        { prompt: "Coplanarity fixes the ___; the second condition fixes the ___.", answer: "form; numbers" },
      ],
      pyqExampleId: "e51f36ca-a2e9-478c-b481-aa2173c168b2",
      traps: [
        {
          title: "Angle bisector uses UNIT vectors, not the raw vectors",
          body:
            "The internal bisector of \\(\\vec{b}\\) and \\(\\vec{c}\\) is along \\(\\hat{b} + \\hat{c} = \\dfrac{\\vec{b}}{|\\vec{b}|} + \\dfrac{\\vec{c}}{|\\vec{c}|}\\). " +
            "Adding \\(\\vec{b} + \\vec{c}\\) directly only bisects when \\(|\\vec{b}| = |\\vec{c}|\\) — otherwise you get the wrong direction.",
        },
        {
          title: "Coplanar form first, condition second",
          body:
            "Always WRITE the coplanar form \\(m\\vec{b} + n\\vec{c}\\) before imposing the perpendicular / projection / magnitude condition. " +
            "Trying to satisfy the condition without restricting to the plane gives a vector that doesn't actually lie where the question requires.",
        },
      ],
    },

    // 10 ── ANCHORED ───────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetvec-lc-components-non-coplanar-basis",
      name: "Components of a vector against a transformed basis",
      intuition:
        "Three non-coplanar vectors form a basis, so any vector \\(\\vec{s}\\) has UNIQUE components along them. " +
        "The HARD twist: you're given \\(\\vec{s}\\)'s components along \\(\\vec{p}, \\vec{q}, \\vec{r}\\), and asked for its components along COMBINATIONS of them (like \\(-\\vec{p}+\\vec{q}+\\vec{r}\\)). " +
        "Write \\(\\vec{s}\\) the new way, substitute, and match coefficients of \\(\\vec{p}, \\vec{q}, \\vec{r}\\) — a clean linear system.",
      definition:
        "If \\(\\vec{p}, \\vec{q}, \\vec{r}\\) are non-coplanar and \\(\\vec{s} = 4\\vec{p} + 3\\vec{q} + 5\\vec{r}\\) (the given components), " +
        "then writing \\(\\vec{s} = x(-\\vec{p}+\\vec{q}+\\vec{r}) + y(\\vec{p}-\\vec{q}+\\vec{r}) + z(-\\vec{p}-\\vec{q}+\\vec{r})\\) and collecting like terms gives a system: " +
        "the coefficient of \\(\\vec{p}\\) must equal \\(4\\), of \\(\\vec{q}\\) equal \\(3\\), of \\(\\vec{r}\\) equal \\(5\\). " +
        "Solve the \\(3\\times 3\\) system for \\(x, y, z\\); independence of \\(\\vec{p}, \\vec{q}, \\vec{r}\\) is what makes the coefficient-matching valid.",
      formula: {
        label: "Match coefficients of a basis",
        latex:
          "\\begin{cases} -x + y - z = 4 \\\\ \\ \\ x - y - z = 3 \\\\ \\ \\ x + y + z = 5 \\end{cases}",
        symbols: [
          { symbol: "rows", meaning: "coefficients of \\(\\vec{p}, \\vec{q}, \\vec{r}\\) equated to the given components" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(\\vec{p}, \\vec{q}, \\vec{r}\\) non-coplanar; \\(\\vec{s} = 4\\vec{p} + 3\\vec{q} + 5\\vec{r}\\). Find \\(x, y, z\\) so \\(\\vec{s} = x(-\\vec{p}+\\vec{q}+\\vec{r}) + y(\\vec{p}-\\vec{q}+\\vec{r}) + z(-\\vec{p}-\\vec{q}+\\vec{r})\\), and evaluate \\(2x + y + z\\).",
        steps: [
          "Collect coefficients. \\(\\vec{p}\\): \\(-x + y - z = 4\\). \\(\\vec{q}\\): \\(x - y - z = 3\\). \\(\\vec{r}\\): \\(x + y + z = 5\\).",
          "Add the \\(\\vec{q}\\)- and \\(\\vec{r}\\)-equations: \\((x-y-z) + (x+y+z) = 3 + 5 \\Rightarrow 2x = 8 \\Rightarrow x = 4\\).",
          "Add the \\(\\vec{p}\\)- and \\(\\vec{r}\\)-equations: \\((-x+y-z) + (x+y+z) = 4 + 5 \\Rightarrow 2y = 9 \\Rightarrow y = \\tfrac{9}{2}\\).",
          "Add the \\(\\vec{p}\\)- and \\(\\vec{q}\\)-equations: \\((-x+y-z) + (x-y-z) = 4 + 3 \\Rightarrow -2z = 7 \\Rightarrow z = -\\tfrac{7}{2}\\).",
          "Now \\(2x + y + z = 8 + \\tfrac{9}{2} - \\tfrac{7}{2} = 8 + 1 = 9\\).",
        ],
        answer: "\\(x = 4,\\ y = \\tfrac{9}{2},\\ z = -\\tfrac{7}{2}\\); \\(2x + y + z = 9\\).",
      },
      practiceSet: [
        { prompt: "Three non-coplanar vectors form a ___.", answer: "basis" },
        { prompt: "Are the components of \\(\\vec{s}\\) along a basis unique?", answer: "Yes" },
        { prompt: "Why may we equate coefficients of \\(\\vec{p}, \\vec{q}, \\vec{r}\\)?", answer: "They are linearly independent" },
        { prompt: "Solve \\(x - y - z = 3,\\ x + y + z = 5\\) for \\(x\\).", answer: "\\(x = 4\\)", method: "add the two equations" },
      ],
      pyqExampleId: "307a80f1-dbf6-4707-b025-ec918a29c3bb",
      traps: [
        {
          title: "Equating components needs an INDEPENDENT basis",
          body:
            "Matching coefficients of \\(\\vec{p}, \\vec{q}, \\vec{r}\\) on both sides is valid ONLY because they are non-coplanar (independent), giving a unique representation. " +
            "If they were coplanar the components wouldn't be unique and the method collapses.",
        },
        {
          title: "Answer the asked combination, not the raw \\(x, y, z\\)",
          body:
            "Many of these end by asking for a combination like \\(2x + y + z\\), not the individual scalars. " +
            "Solve the system fully, then plug into the requested expression — a fraction in \\(y\\) and \\(z\\) often cancels cleanly there.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Magnitude, Components, and Unit Vectors",
      href: "/notes/mht-cet-maths/vectors/magnitude-unit-vectors",
    },
    {
      label: "Dot Product, Angle, and Perpendicularity",
      href: "/notes/mht-cet-maths/vectors/dot-product",
    },
  ],
};
