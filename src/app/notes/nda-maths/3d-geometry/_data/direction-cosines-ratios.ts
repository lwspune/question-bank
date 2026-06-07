import type { SubtopicNote } from "@/app/notes/_types";

export const DIRECTION_COSINES_RATIOS_NOTE: SubtopicNote = {
  subtopicName: "Direction Cosines and Ratios",
  title: "Direction Cosines & Direction Ratios",
  oneLineDefinition:
    "The numbers that capture a line's direction in space — direction cosines are the unit version (squaring to 1), direction ratios are any proportional set.",
  whyItMatters:
    "Twenty-four PYQs across 2017–2026 — the engine room of the chapter. Almost every line, " +
    "plane, and angle question reduces to direction cosines and ratios. The identity " +
    "l² + m² + n² = 1 and the angle-between-lines formula together unlock the bulk of the " +
    "bank. Difficulty here runs a touch higher (25% HARD), so the seven concepts below earn " +
    "their keep.",
  concepts: [
    // C1 — DR/DC fundamentals
    {
      kind: "formula" as const,
      slug: "dr-dc-fundamentals",
      name: "Direction ratios, direction cosines, and the unit identity",
      intuition:
        "A line's direction can be described by any vector along it — those components are its " +
        "DIRECTION RATIOS, and there are infinitely many proportional sets. Normalise that vector " +
        "to unit length and the components become the DIRECTION COSINES \\(\\langle l, m, n\\rangle\\) — " +
        "the cosines of the angles the line makes with the three axes. Because they're a unit " +
        "vector's components, they always satisfy \\(l^2 + m^2 + n^2 = 1\\).",
      definition:
        "If a line has direction ratios \\(\\langle a, b, c\\rangle\\), its direction cosines are " +
        "obtained by dividing by the magnitude: \\(l = a/\\sqrt{a^2+b^2+c^2}\\), and similarly for " +
        "\\(m, n\\). They are the cosines of the angles \\(\\alpha, \\beta, \\gamma\\) the line makes " +
        "with the positive \\(x\\)-, \\(y\\)-, \\(z\\)-axes. The defining identity is below.",
      formula: {
        label: "Direction cosines square-sum to 1",
        latex: "l^2 + m^2 + n^2 = 1, \\quad l = \\cos\\alpha,\\ m = \\cos\\beta,\\ n = \\cos\\gamma",
        symbols: [
          { symbol: "\\(l,m,n\\)", meaning: "direction cosines" },
          { symbol: "\\(\\alpha,\\beta,\\gamma\\)", meaning: "angles with the x, y, z axes" },
        ],
      },
      visualizationSlug: "direction-cosines",
      authoredExample: {
        prompt: "Find the direction cosines of the line with direction ratios \\(\\langle 2, -1, 2\\rangle\\).",
        steps: [
          "Magnitude: \\(\\sqrt{2^2 + (-1)^2 + 2^2} = \\sqrt{4+1+4} = \\sqrt{9} = 3\\).",
          "Divide each ratio by 3: \\(l = \\tfrac{2}{3},\\ m = -\\tfrac{1}{3},\\ n = \\tfrac{2}{3}\\).",
          "Check: \\(\\tfrac{4}{9} + \\tfrac{1}{9} + \\tfrac{4}{9} = \\tfrac{9}{9} = 1\\). ✓",
        ],
        answer: "\\(\\left\\langle \\tfrac{2}{3}, -\\tfrac{1}{3}, \\tfrac{2}{3} \\right\\rangle\\).",
      },
      selfCheckExample: {
        prompt:
          "A line has direction ratios \\(\\langle a+b,\\ b+c,\\ c+a\\rangle\\). What is the sum of the squares of its direction cosines?",
        steps: [
          "Direction cosines are the normalised direction ratios of ANY line.",
          "The sum of the squares of direction cosines is always 1 — by definition of a unit vector.",
          "The specific ratios don't matter; the identity holds for every line.",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Sum of squares of any line's direction cosines?", answer: "\\(1\\)" },
        { prompt: "Direction cosines of DRs \\(\\langle 1, 2, 2\\rangle\\)?", answer: "\\(\\langle \\tfrac13, \\tfrac23, \\tfrac23 \\rangle\\)", method: "magnitude 3" },
        { prompt: "Can \\(\\langle 0, 4, 0\\rangle\\) be direction ratios of the y-axis?", answer: "Yes", method: "any non-zero multiple of \\(\\langle0,1,0\\rangle\\)" },
        { prompt: "If \\(l = m = n\\), find \\(l\\) (positive).", answer: "\\(\\tfrac{1}{\\sqrt3}\\)", method: "\\(3l^2 = 1\\)" },
      ],
      pyqExampleId: "56587865-53d7-4690-8f35-934343068287", // 2020 — sum of squares of DCs = 1
      traps: [
        {
          title: "Direction RATIOS are not unique; direction COSINES (almost) are",
          body:
            "\\(\\langle 2,-1,2\\rangle\\) and \\(\\langle 4,-2,4\\rangle\\) are the same direction. " +
            "Only after normalising do you get direction cosines — and even then a line has TWO sets " +
            "(\\(\\pm\\)) for its two orientations. Sum of squares of ratios is NOT 1; only the cosines satisfy that.",
        },
      ],
    },

    // C2 — DCs of axes (REFERENCE)
    {
      kind: "reference" as const,
      slug: "dcs-of-axes-and-special-lines",
      name: "Direction cosines of the axes and special lines",
      intuition:
        "The axes themselves are the simplest directions. The x-axis points purely along \\(x\\), so " +
        "its direction cosines are \\(\\langle 1, 0, 0\\rangle\\) — and a line perpendicular to an axis " +
        "has a 0 in that slot. Memorise this tiny table and the recall questions become instant.",
      definition:
        "A line **parallel** to an axis has that axis's direction cosines; a line **perpendicular** " +
        "to an axis has a **zero** in the corresponding component. A line in (or parallel to) the " +
        "XY-plane is perpendicular to the z-axis, so \\(n = 0\\).",
      table: {
        columns: ["Line", "Direction cosines", "Note"],
        rows: [
          { cells: ["x-axis", "\\(\\langle 1, 0, 0 \\rangle\\)", "makes 0° with x, 90° with y and z"] },
          { cells: ["y-axis", "\\(\\langle 0, 1, 0 \\rangle\\)", "DCs \\(\\langle 0,1,0\\rangle\\); DRs e.g. \\(\\langle 0,4,0\\rangle\\)"] },
          { cells: ["z-axis", "\\(\\langle 0, 0, 1 \\rangle\\)", "perpendicular to the whole XY-plane"] },
          {
            cells: ["⊥ to z-axis", "\\(n = 0\\), e.g. \\(\\langle 5, 6, 0\\rangle\\)", "lies in / parallel to the XY-plane"],
            noteAmber:
              "A line perpendicular to the z-axis just needs its z-component zero — the x, y parts are free.",
          },
        ],
        caption:
          "Parallel to an axis → that axis's DCs. Perpendicular to an axis → a zero in that slot.",
      },
      selfCheckExample: {
        prompt: "What are the direction cosines of the z-axis, and what angle does it make with the x-axis?",
        steps: [
          "The z-axis points purely in the z-direction.",
          "Direction cosines: \\(\\langle 0, 0, 1\\rangle\\).",
          "Angle with x-axis: \\(\\cos\\alpha = 0 \\Rightarrow \\alpha = 90°\\).",
        ],
        answer: "\\(\\langle 0, 0, 1\\rangle\\); it makes 90° with the x-axis.",
      },
      practiceSet: [
        { prompt: "Direction cosines of the x-axis?", answer: "\\(\\langle 1,0,0\\rangle\\)" },
        { prompt: "A line with DCs \\(\\langle 0,1,0\\rangle\\) is which axis?", answer: "y-axis" },
        { prompt: "DRs of a line perpendicular to the z-axis must have which component zero?", answer: "the z-component (n = 0)" },
        { prompt: "Angle the y-axis makes with the z-axis?", answer: "\\(90°\\)" },
      ],
      pyqExampleId: "9ac4cbd0-152b-4cc3-b43b-5312111992a5", // 2019 — DCs of z-axis
    },

    // C3 — DCs from a line equation
    {
      kind: "formula" as const,
      slug: "dcs-from-a-line",
      name: "Reading direction ratios off a line",
      intuition:
        "When a line is given in symmetric form \\(\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c}\\), " +
        "the denominators \\(\\langle a, b, c\\rangle\\) ARE the direction ratios. The catch: the form " +
        "must have coefficient 1 on each variable in the numerator — rewrite things like \\(2(y+3)\\) or " +
        "\\(1 - z\\) first, watching the sign.",
      definition:
        "Put the line into true symmetric form (each numerator \\(x - x_0\\), coefficient 1). The " +
        "denominators are the direction ratios. A coordinates-of-a-point form \\((x_0 + at,\\ y_0 + bt,\\ " +
        "z_0 + ct)\\) gives direction ratios \\(\\langle a, b, c\\rangle\\) directly (the coefficients of " +
        "the parameter). Normalise to get direction cosines.",
      authoredExample: {
        prompt: "Find the direction cosines of the line \\(x - 1 = 2(y+3) = 1 - z\\).",
        steps: [
          "Rewrite each piece as \\(\\frac{\\text{var} - \\text{const}}{\\text{coeff}}\\): set each equal to \\(t\\).",
          "\\(x - 1 = t\\); \\(2(y+3) = t \\Rightarrow \\frac{y+3}{1/2} = t\\); \\(1 - z = t \\Rightarrow \\frac{z-1}{-1} = t\\).",
          "Direction ratios: \\(\\left\\langle 1,\\ \\tfrac12,\\ -1 \\right\\rangle\\), or clearing fractions \\(\\langle 2, 1, -2\\rangle\\).",
          "Magnitude \\(\\sqrt{4+1+4} = 3\\) → direction cosines \\(\\left\\langle \\tfrac23, \\tfrac13, -\\tfrac23\\right\\rangle\\).",
        ],
        answer: "\\(\\left\\langle \\tfrac23, \\tfrac13, -\\tfrac23 \\right\\rangle\\).",
      },
      selfCheckExample: {
        prompt:
          "A line is given in parametric form as \\((2 + t,\\ 1 - 2t,\\ 3 + 2t)\\). Find its direction cosines.",
        steps: [
          "The coefficients of the parameter \\(t\\) give the direction ratios: \\(\\langle 1, -2, 2\\rangle\\).",
          "Magnitude: \\(\\sqrt{1 + 4 + 4} = 3\\).",
          "Direction cosines: \\(\\left\\langle \\tfrac13, -\\tfrac23, \\tfrac23\\right\\rangle\\).",
        ],
        answer: "\\(\\left\\langle \\tfrac13, -\\tfrac23, \\tfrac23\\right\\rangle\\).",
      },
      practiceSet: [
        { prompt: "DRs of \\(\\frac{x-1}{3} = \\frac{y}{4} = \\frac{z+2}{5}\\)?", answer: "\\(\\langle 3,4,5\\rangle\\)" },
        { prompt: "DRs from point \\((2+3t, 1-t, 4t)\\)?", answer: "\\(\\langle 3,-1,4\\rangle\\)", method: "coefficients of t" },
        { prompt: "Rewrite \\(1 - z = t\\) as a denominator form: coefficient of z?", answer: "\\(-1\\)" },
        { prompt: "DCs of DRs \\(\\langle 0, 3, 4\\rangle\\)?", answer: "\\(\\langle 0, \\tfrac35, \\tfrac45\\rangle\\)", method: "magnitude 5" },
      ],
      pyqExampleId: "ed0781c2-23a5-4b09-b45c-cdf047b3a4b1", // 2019 — point coords → DCs
      traps: [
        {
          title: "Mind the coefficient and the sign before reading denominators",
          body:
            "\\(2(y+3)\\) is NOT denominator 2 — it's \\(\\frac{y+3}{1/2}\\), so the ratio component is \\(\\tfrac12\\). " +
            "And \\(1 - z\\) flips the sign: \\(\\frac{z-1}{-1}\\). Read symmetric form only after each variable has coefficient \\(+1\\).",
        },
      ],
    },

    // C4 — angle between two lines
    {
      kind: "formula" as const,
      slug: "angle-between-two-lines",
      name: "Angle between two lines",
      intuition:
        "Two lines' directions are vectors; the angle between them comes straight from the dot " +
        "product. Use direction ratios in the numerator and the product of magnitudes below — the " +
        "same \\(\\cos\\theta = \\frac{\\vec a \\cdot \\vec b}{|\\vec a||\\vec b|}\\) you know from vectors.",
      definition:
        "For lines with direction ratios \\(\\langle a_1,b_1,c_1\\rangle\\) and \\(\\langle a_2,b_2,c_2\\rangle\\), " +
        "the acute angle \\(\\theta\\) between them satisfies the formula below. With direction cosines the " +
        "denominator is 1, so \\(\\cos\\theta = l_1l_2 + m_1m_2 + n_1n_2\\).",
      formula: {
        label: "Angle between two lines (direction ratios)",
        latex:
          "\\cos\\theta = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\,\\sqrt{a_2^2+b_2^2+c_2^2}}",
      },
      visualizationSlug: "angle-between-lines-3d",
      authoredExample: {
        prompt:
          "Find the angle between the two lines with direction ratios \\(\\langle 1, 1, 0\\rangle\\) and \\(\\langle 0, 1, 1\\rangle\\).",
        steps: [
          "Dot product: \\(1(0) + 1(1) + 0(1) = 1\\).",
          "Magnitudes: \\(\\sqrt{1+1+0} = \\sqrt2\\) and \\(\\sqrt{0+1+1} = \\sqrt2\\).",
          "\\(\\cos\\theta = \\dfrac{1}{\\sqrt2 \\cdot \\sqrt2} = \\dfrac{1}{2}\\).",
          "So \\(\\theta = 60°\\).",
        ],
        answer: "\\(\\theta = 60°\\) (i.e. \\(\\tfrac{\\pi}{3}\\)).",
      },
      selfCheckExample: {
        prompt: "Find the angle between the lines \\(2x = 3y = -z\\) and \\(6x = -y = -4z\\).",
        steps: [
          "Write \\(2x=3y=-z\\) as DRs: from \\(\\frac{x}{1/2} = \\frac{y}{1/3} = \\frac{z}{-1}\\), clear to \\(\\langle 3, 2, -6\\rangle\\).",
          "Write \\(6x=-y=-4z\\) as \\(\\frac{x}{1/6}=\\frac{y}{-1}=\\frac{z}{-1/4}\\), clear to \\(\\langle 2, -12, -3\\rangle\\).",
          "Dot product: \\(3(2) + 2(-12) + (-6)(-3) = 6 - 24 + 18 = 0\\).",
          "Zero dot product → the lines are perpendicular.",
        ],
        answer: "\\(90°\\) — the lines are perpendicular.",
      },
      practiceSet: [
        { prompt: "\\(\\cos\\theta\\) for \\(\\langle 1,0,0\\rangle\\) and \\(\\langle 0,1,0\\rangle\\)?", answer: "\\(0\\) (90°)" },
        { prompt: "Angle between identical direction ratios?", answer: "\\(0°\\)" },
        { prompt: "Lines are perpendicular when the dot product of DRs is?", answer: "\\(0\\)" },
        { prompt: "\\(\\cos\\theta\\) for \\(\\langle1,1,0\\rangle\\),\\(\\langle1,0,0\\rangle\\)?", answer: "\\(\\tfrac{1}{\\sqrt2}\\) (45°)", method: "\\(1/(\\sqrt2\\cdot1)\\)" },
      ],
      pyqExampleId: "19746fec-a6af-467b-b021-bade60caccdf", // 2021 — angle between DRs
    },

    // C5 — perpendicular / parallel conditions
    {
      kind: "formula" as const,
      slug: "perpendicular-parallel-lines",
      name: "Perpendicular and parallel conditions",
      intuition:
        "Two lines are parallel when their direction ratios are proportional, and perpendicular when " +
        "their dot product is zero. These two one-line tests answer a surprising share of the bank — " +
        "and a line perpendicular to two given lines has direction ratios given by their cross product.",
      definition:
        "Lines \\(\\langle a_1,b_1,c_1\\rangle\\) and \\(\\langle a_2,b_2,c_2\\rangle\\) are:\n" +
        "- **Parallel** iff \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\).\n" +
        "- **Perpendicular** iff \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\).\n" +
        "A line **perpendicular to both** has direction ratios equal to their **cross product** " +
        "\\(\\langle a_1,b_1,c_1\\rangle \\times \\langle a_2,b_2,c_2\\rangle\\).\n" +
        "- **Line of intersection of two planes:** it lies in both planes, so it is perpendicular to " +
        "BOTH normals — its direction ratios are \\(\\vec{n_1} \\times \\vec{n_2}\\) (cross product of the plane normals).",
      formula: {
        label: "Perpendicularity condition",
        latex: "a_1 a_2 + b_1 b_2 + c_1 c_2 = 0",
      },
      authoredExample: {
        prompt:
          "Find the direction ratios of a line perpendicular to both \\(\\langle 1, 2, 1\\rangle\\) and \\(\\langle 2, -1, 1\\rangle\\).",
        steps: [
          "Take the cross product \\(\\langle 1,2,1\\rangle \\times \\langle 2,-1,1\\rangle\\).",
          "\\(i: (2)(1) - (1)(-1) = 3;\\quad j: -[(1)(1) - (1)(2)] = -(-1) = 1;\\quad k: (1)(-1) - (2)(2) = -5\\).",
          "Direction ratios: \\(\\langle 3, 1, -5\\rangle\\).",
          "Check perpendicular to the first: \\(3 + 2 - 5 = 0\\) ✓.",
        ],
        answer: "\\(\\langle 3, 1, -5\\rangle\\).",
      },
      selfCheckExample: {
        prompt:
          "For what value of \\(x\\) is the line \\(\\langle 2, -1, 2\\rangle\\) perpendicular to \\(\\langle x, 3, 5\\rangle\\)?",
        steps: [
          "Perpendicular → dot product zero: \\(2x + (-1)(3) + 2(5) = 0\\).",
          "\\(2x - 3 + 10 = 0 \\Rightarrow 2x + 7 = 0\\).",
          "\\(x = -\\tfrac72\\).",
        ],
        answer: "\\(x = -\\tfrac{7}{2}\\).",
      },
      practiceSet: [
        { prompt: "Are \\(\\langle 1,2,3\\rangle\\) and \\(\\langle 2,4,6\\rangle\\) parallel?", answer: "Yes", method: "proportional" },
        { prompt: "Are \\(\\langle 1,0,0\\rangle\\) and \\(\\langle 0,2,0\\rangle\\) perpendicular?", answer: "Yes", method: "dot product 0" },
        { prompt: "Perpendicular-to-both is found via which operation?", answer: "Cross product" },
        { prompt: "Find k if \\(\\langle 1,k,2\\rangle \\perp \\langle 2,3,-1\\rangle\\).", answer: "\\(0\\)", method: "\\(2+3k-2=0\\)" },
        { prompt: "Direction ratios of the line where two planes with normals \\(\\vec{n_1},\\vec{n_2}\\) intersect?", answer: "\\(\\vec{n_1}\\times\\vec{n_2}\\)" },
      ],
      pyqExampleId: "c442ea69-837d-4d85-bd73-0ec661e68193", // 2017 — perpendicular condition
    },

    // C6 — projection
    {
      kind: "formula" as const,
      slug: "projection-on-axis",
      name: "Projection of a segment on an axis or line",
      intuition:
        "The projection of a segment onto an axis is simply how far it reaches along that axis — the " +
        "difference of the relevant coordinates. Onto a general line, it's the segment's length times " +
        "the cosine of the angle, which equals the dot product of the segment vector with the line's " +
        "direction cosines.",
      definition:
        "Projection of \\(\\overrightarrow{AB}\\) on the **x-axis** is \\(x_2 - x_1\\) (and similarly " +
        "for y, z). Projection on a line with direction cosines \\(\\langle l, m, n\\rangle\\) is " +
        "\\((x_2-x_1)l + (y_2-y_1)m + (z_2-z_1)n\\).",
      formula: {
        label: "Projection of AB on a line of direction cosines ⟨l, m, n⟩",
        latex: "\\text{proj} = (x_2-x_1)\\,l + (y_2-y_1)\\,m + (z_2-z_1)\\,n",
      },
      authoredExample: {
        prompt: "Find the projection of the segment joining \\(A(2, -1, 4)\\) and \\(B(7, 3, 1)\\) on the x-axis.",
        steps: [
          "Projection on the x-axis = difference of x-coordinates.",
          "\\(x_2 - x_1 = 7 - 2 = 5\\).",
        ],
        answer: "\\(5\\) (length \\(5\\) along the x-axis).",
      },
      selfCheckExample: {
        prompt:
          "Project \\(\\overrightarrow{AB}\\) with \\(A(0,0,0), B(2,3,6)\\) onto the line with direction cosines \\(\\langle \\tfrac13, \\tfrac23, \\tfrac23\\rangle\\).",
        steps: [
          "\\(\\overrightarrow{AB} = \\langle 2, 3, 6\\rangle\\).",
          "Dot with the direction cosines: \\(2(\\tfrac13) + 3(\\tfrac23) + 6(\\tfrac23)\\).",
          "\\(= \\tfrac23 + 2 + 4 = \\tfrac{2 + 6 + 12}{3} = \\tfrac{20}{3}\\).",
        ],
        answer: "\\(\\tfrac{20}{3}\\).",
      },
      practiceSet: [
        { prompt: "Projection of segment \\((1,2,3)\\)–\\((4,2,3)\\) on the x-axis?", answer: "\\(3\\)" },
        { prompt: "Projection on the z-axis of \\((0,0,1)\\)–\\((0,0,9)\\)?", answer: "\\(8\\)" },
        { prompt: "Projection on the y-axis equals which coordinate difference?", answer: "\\(y_2 - y_1\\)" },
        { prompt: "If a segment is perpendicular to a line, its projection on the line is?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "07f885e0-5233-4009-a565-ad6087e370d8", // 2021 — projection on y-axis
    },

    // C7 — direction angle identities
    {
      kind: "formula" as const,
      slug: "direction-angle-identities",
      name: "Direction-angle identities",
      intuition:
        "Because \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\), a chain of useful identities " +
        "follows for the angles a line makes with the axes — for example the sines square-sum to 2, and " +
        "\\(\\cos2\\alpha + \\cos2\\beta + \\cos2\\gamma = -1\\). These power the chapter's hardest one-liners.",
      definition:
        "From \\(l^2+m^2+n^2 = 1\\) with \\(l=\\cos\\alpha\\) etc.:\n" +
        "- \\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2\\) (subtract the cosine identity from 3).\n" +
        "- \\(\\cos2\\alpha + \\cos2\\beta + \\cos2\\gamma = -1\\) (use \\(\\cos2\\theta = 2\\cos^2\\theta - 1\\)).\n" +
        "- Product form: \\(\\cos(\\alpha+\\beta)\\cos(\\alpha-\\beta) = \\cos^2\\alpha - \\sin^2\\beta\\).",
      formula: {
        label: "Core identities",
        latex:
          "\\sum \\cos^2\\!\\theta = 1, \\quad \\sum \\sin^2\\!\\theta = 2, \\quad \\sum \\cos 2\\theta = -1",
      },
      authoredExample: {
        prompt:
          "A line makes angles \\(\\alpha, \\beta, \\gamma\\) with the axes. Show \\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2\\).",
        steps: [
          "Each \\(\\sin^2\\theta = 1 - \\cos^2\\theta\\).",
          "Sum: \\((1-\\cos^2\\alpha) + (1-\\cos^2\\beta) + (1-\\cos^2\\gamma) = 3 - (\\cos^2\\alpha+\\cos^2\\beta+\\cos^2\\gamma)\\).",
          "The bracket is the direction-cosine identity \\(= 1\\).",
          "So the sum \\(= 3 - 1 = 2\\).",
        ],
        answer: "\\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = 2\\).",
      },
      selfCheckExample: {
        prompt:
          "A line makes \\(60°\\) with the x-axis and \\(60°\\) with the y-axis. What acute angle does it make with the z-axis?",
        steps: [
          "Use \\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1\\) with \\(\\alpha = \\beta = 60°\\).",
          "\\(\\cos^2 60° + \\cos^2 60° + \\cos^2\\gamma = 1 \\Rightarrow \\tfrac14 + \\tfrac14 + \\cos^2\\gamma = 1\\).",
          "\\(\\cos^2\\gamma = \\tfrac12 \\Rightarrow \\cos\\gamma = \\tfrac{1}{\\sqrt2} \\Rightarrow \\gamma = 45°\\).",
        ],
        answer: "\\(45°\\).",
      },
      practiceSet: [
        { prompt: "\\(\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = ?\\)", answer: "\\(1\\)" },
        { prompt: "\\(\\sin^2\\alpha + \\sin^2\\beta + \\sin^2\\gamma = ?\\)", answer: "\\(2\\)" },
        { prompt: "\\(\\cos2\\alpha + \\cos2\\beta + \\cos2\\gamma = ?\\)", answer: "\\(-1\\)" },
        { prompt: "Can a line make \\(45°\\) with all three axes?", answer: "No", method: "\\(3(\\tfrac12) = \\tfrac32 \\neq 1\\)" },
      ],
      pyqExampleId: "c525d444-10ac-417c-a055-380360066b81", // 2025 — cos(α+β)cos(α−β)
      traps: [
        {
          title: "A line cannot make equal acute angles with all three axes unless it's the diagonal",
          body:
            "If \\(\\alpha=\\beta=\\gamma\\), then \\(3\\cos^2\\alpha = 1\\), so \\(\\cos\\alpha = \\tfrac{1}{\\sqrt3}\\) " +
            "(\\(\\approx 54.7°\\)), NOT \\(45°\\) or \\(60°\\). Options offering 45°/60° for the equal-angle case are distractors.",
        },
      ],
    },
  ],
};
