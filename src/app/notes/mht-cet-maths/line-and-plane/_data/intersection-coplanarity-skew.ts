import type { SubtopicNote } from "@/app/notes/_types";

export const INTERSECTION_COPLANARITY_SKEW_NOTE: SubtopicNote = {
  subtopicName: "Intersection, Coplanarity, and Skew Lines",
  title: "Intersection, Coplanarity, and Skew Lines",
  oneLineDefinition:
    "When do two 3-D lines meet, lie in one plane, or fly past each other? The single tool is the scalar-triple-product determinant of the joining vector and the two direction vectors — zero means coplanar (they intersect or are parallel), non-zero means skew, and dividing by the cross-product magnitude gives the shortest distance.",
  whyItMatters:
    "This is the HARDEST subtopic in the chapter — about two-thirds of its PYQs are HARD — and the most repeated single stem across the whole Line and Plane chapter is 'these two lines intersect (are coplanar), find k'. " +
    "That stem hides a signature trap: the coplanarity determinant is QUADRATIC in the unknown, so it has TWO answers (the bank's correct option lists both, e.g. k = 1, 2 or k = 0, -3) and a single-value distractor is the planted wrong answer. " +
    "Master one determinant — the scalar triple product [joining vector, direction-1, direction-2] = 0 — and you own coplanarity, the intersect-find-k template, four-point coplanarity, and (divided by the cross-product magnitude) the shortest distance between skew lines. The shortest-distance questions reverse the same machinery: 'SD given, find the parameter' is again quadratic.",
  concepts: [
    // ── FOUNDATION ───────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-parametric-point",
      name: "A general point on a line",
      intuition:
        "Every point on a line is its fixed point plus some multiple of its direction. Set the symmetric ratios equal to a single parameter \\(t\\) (or \\(\\lambda\\)) and you can slide along the whole line by changing \\(t\\). This one move — turning a line into a moving point — unlocks every intersection and coplanarity question.",
      definition:
        "A line through \\(A(x_1,y_1,z_1)\\) with direction ratios \\((a,b,c)\\) is written symmetrically as \\(\\dfrac{x-x_1}{a}=\\dfrac{y-y_1}{b}=\\dfrac{z-z_1}{c}=t\\). " +
        "Setting that common ratio to a parameter \\(t\\) gives the **general point**:\n" +
        "- \\(x = x_1 + at,\\quad y = y_1 + bt,\\quad z = z_1 + ct\\).\n\n" +
        "In vector form, \\(\\vec{r} = \\vec{a} + t\\,\\vec{d}\\): a fixed position vector \\(\\vec{a}\\) plus a scalar \\(t\\) times the direction \\(\\vec{d}\\). Every later technique starts here — substitute this moving point into whatever condition the question gives.",
      formula: {
        label: "General point on a line",
        latex: "P = (x_1 + at,\\; y_1 + bt,\\; z_1 + ct) \\qquad \\vec{r} = \\vec{a} + t\\,\\vec{d}",
        symbols: [
          { symbol: "\\((x_1,y_1,z_1)\\)", meaning: "a fixed point on the line" },
          { symbol: "\\((a,b,c)\\)", meaning: "direction ratios of the line" },
          { symbol: "\\(t\\)", meaning: "parameter — sweeps out every point on the line" },
        ],
      },
      authoredExample: {
        prompt:
          "Write the general point on the line \\(\\dfrac{x-2}{3}=\\dfrac{y+1}{-1}=\\dfrac{z-4}{2}\\), then find the point at which it leaves the fixed point (\\(t = 0\\)) and the point at \\(t = 2\\).",
        steps: [
          "Set each ratio equal to \\(t\\): \\(x = 2 + 3t,\\; y = -1 - t,\\; z = 4 + 2t\\).",
          "At \\(t = 0\\): the fixed point \\((2, -1, 4)\\).",
          "At \\(t = 2\\): \\((2 + 6,\\; -1 - 2,\\; 4 + 4) = (8, -3, 8)\\).",
        ],
        answer: "General point \\((2+3t,\\,-1-t,\\,4+2t)\\); at \\(t=2\\) it is \\((8,-3,8)\\)",
      },
      practiceSet: [
        { prompt: "General point on \\(\\dfrac{x-1}{2}=\\dfrac{y}{3}=\\dfrac{z+1}{4}\\)?", answer: "\\((1+2t,\\,3t,\\,-1+4t)\\)" },
        { prompt: "On the line through \\((0,0,0)\\) with direction \\((1,2,3)\\), the point at \\(t=2\\)?", answer: "\\((2,4,6)\\)" },
        { prompt: "If a line's general point is \\((3+t,\\,1-2t,\\,5t)\\), its direction ratios are?", answer: "\\((1,-2,5)\\)" },
        { prompt: "A line in vector form \\(\\vec{r}=\\vec{a}+t\\vec{d}\\): which part is the direction?", answer: "\\(\\vec{d}\\)" },
      ],
      traps: [
        {
          title: "A NEGATIVE denominator is a negative direction ratio",
          body:
            "In \\(\\dfrac{y+1}{-1}\\) the direction component is \\(-1\\), so \\(y = -1 - t\\), NOT \\(-1 + t\\). Carry the sign from the denominator straight into the general point — flipping it is the most common silent error.",
        },
        {
          title: "Use DIFFERENT parameters for two different lines",
          body:
            "When you parametrise two lines and look for an intersection, call them \\(t\\) and \\(s\\) (not both \\(t\\)). A single parameter forces them to move in lock-step and gives a wrong system — the lines meet at a point each reaches at its OWN parameter value.",
        },
      ],
    },

    // ── LINE MEETS A PLANE ───────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-meets-plane-pt",
      name: "Point where a line meets a plane",
      visualizationSlug: "line-plane-intersection",
      intuition:
        "A line pierces a plane at exactly one point (unless it is parallel). Write the line's general point, plug it into the plane equation, and you get ONE linear equation in the parameter \\(t\\). Solve for \\(t\\), put it back, and you have the piercing point. The coordinate planes are just special planes: the XZ-plane is \\(y = 0\\), the XY-plane is \\(z = 0\\), the YZ-plane is \\(x = 0\\).",
      definition:
        "To find where the line \\(\\vec{r} = \\vec{a} + t\\,\\vec{d}\\) meets the plane:\n" +
        "- **Substitute** the general point \\((x_1+at,\\,y_1+bt,\\,z_1+ct)\\) into the plane equation \\(Ax + By + Cz = D\\).\n" +
        "- **Solve** the resulting linear equation for \\(t\\).\n" +
        "- **Back-substitute** \\(t\\) into the general point to get the coordinates.\n\n" +
        "For a **coordinate plane**, set the relevant coordinate to 0: XZ-plane \\(\\Rightarrow y = 0\\), XY-plane \\(\\Rightarrow z = 0\\), YZ-plane \\(\\Rightarrow x = 0\\). Solve for \\(t\\) from that single equation. A **variable plane in intercept form** \\(\\frac{x}{a}+\\frac{y}{b}+\\frac{z}{c}=1\\) meets the axes at \\((a,0,0),(0,b,0),(0,0,c)\\).",
      formula: {
        label: "Line meets plane",
        latex: "A(x_1+at)+B(y_1+bt)+C(z_1+ct)=D \\;\\Rightarrow\\; t \\;\\Rightarrow\\; P",
        symbols: [
          { symbol: "\\((x_1{+}at,\\,\\ldots)\\)", meaning: "general point on the line" },
          { symbol: "\\(Ax+By+Cz=D\\)", meaning: "the plane (set a coordinate \\(=0\\) for a coordinate plane)" },
          { symbol: "\\(t\\)", meaning: "the single parameter value at the piercing point" },
        ],
      },
      authoredExample: {
        prompt:
          "Find where the line \\(\\dfrac{x-1}{2}=\\dfrac{y-2}{-3}=\\dfrac{z+5}{4}\\) meets the plane \\(2x + 4y - z = 3\\).",
        steps: [
          "General point: \\((1+2t,\\;2-3t,\\;-5+4t)\\).",
          "Substitute into the plane: \\(2(1+2t)+4(2-3t)-(-5+4t)=3\\).",
          "Simplify: \\(2+4t+8-12t+5-4t = 3 \\Rightarrow 15 - 12t = 3 \\Rightarrow t = 1\\).",
          "Back-substitute \\(t = 1\\): \\((3,\\,-1,\\,-1)\\).",
        ],
        answer: "The line meets the plane at \\((3, -1, -1)\\)",
      },
      selfCheckExample: {
        prompt:
          "The line through \\(A(3,4,1)\\) and \\(B(5,1,6)\\) crosses the XZ-plane at which point?",
        steps: [
          "Direction \\(B - A = (2,-3,5)\\); general point \\((3+2t,\\;4-3t,\\;1+5t)\\).",
          "XZ-plane means \\(y = 0\\): \\(4 - 3t = 0 \\Rightarrow t = \\tfrac{4}{3}\\).",
          "Then \\(x = 3 + 2\\cdot\\tfrac{4}{3} = \\tfrac{17}{3}\\), \\(z = 1 + 5\\cdot\\tfrac{4}{3} = \\tfrac{23}{3}\\).",
        ],
        answer: "\\(\\left(\\tfrac{17}{3},\\,0,\\,\\tfrac{23}{3}\\right)\\)",
      },
      practiceSet: [
        { prompt: "The XY-plane is which equation?", answer: "\\(z = 0\\)" },
        { prompt: "Line \\((t,\\,1+t,\\,2t)\\) meets \\(z = 0\\) at?", answer: "\\((0,1,0)\\)", method: "\\(2t=0\\Rightarrow t=0\\)" },
        { prompt: "An intercept-form plane meets the X-axis at?", answer: "\\((a,0,0)\\)" },
        { prompt: "After solving for \\(t\\), what is the last step?", answer: "back-substitute \\(t\\) into the general point" },
      ],
      pyqExampleId: "d9b14d49-c423-4f0a-b425-e5226778f711",
      traps: [
        {
          title: "XZ-plane is \\(y = 0\\), not \\(z = 0\\)",
          body:
            "The plane is named by the two axes it CONTAINS, so the MISSING axis is the one set to zero. XZ-plane omits \\(y\\) \\(\\Rightarrow y = 0\\); YZ-plane omits \\(x\\) \\(\\Rightarrow x = 0\\). Mixing these up sends you to the wrong coordinate every time.",
        },
        {
          title: "The question may want a derived quantity, not the point itself",
          body:
            "Many stems ask for the DISTANCE of the piercing point from the origin, or its reflection in a plane. Find the point first, then do the extra step — \\(\\sqrt{x^2+y^2+z^2}\\) for distance, or negate one coordinate for a reflection. Stopping at the point is a half-finished answer.",
        },
      ],
    },

    // ── INTERSECTION POINT OF TWO LINES ──────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-two-lines-intersection-point",
      name: "Point of intersection of two lines",
      intuition:
        "Two lines meet where their general points coincide. Parametrise each with its OWN parameter (\\(t\\) and \\(s\\)), set the three coordinates equal, and you get three equations in two unknowns. Solve any two for \\(t, s\\), then the THIRD equation must hold automatically — if it does, the lines truly intersect; substitute back for the point.",
      definition:
        "To find the intersection of \\(\\vec{r}_1 = \\vec{a}_1 + t\\,\\vec{d}_1\\) and \\(\\vec{r}_2 = \\vec{a}_2 + s\\,\\vec{d}_2\\):\n" +
        "- Write both general points and **equate coordinate-by-coordinate** \\(\\Rightarrow\\) three equations in \\(t, s\\).\n" +
        "- **Solve two** of them for \\(t\\) and \\(s\\).\n" +
        "- **Check** the third equation is satisfied (consistency = they really intersect).\n" +
        "- **Substitute** \\(t\\) (or \\(s\\)) into its line to get the point.",
      formula: {
        label: "Intersection by equating",
        latex: "x_1+a_1t = x_2+a_2s,\\quad y_1+b_1t = y_2+b_2s,\\quad z_1+c_1t = z_2+c_2s",
        symbols: [
          { symbol: "\\(t,\\,s\\)", meaning: "the two SEPARATE parameters (one per line)" },
          { symbol: "3 equations, 2 unknowns", meaning: "solve 2, the 3rd must check out for a real intersection" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the distance of \\((2,4,0)\\) from the intersection of \\(\\dfrac{x+6}{3}=\\dfrac{y}{2}=\\dfrac{z+1}{1}\\) and \\(\\dfrac{x-7}{4}=\\dfrac{y-9}{3}=\\dfrac{z-4}{2}\\).",
        steps: [
          "Line 1: \\((3t-6,\\;2t,\\;t-1)\\); Line 2: \\((4s+7,\\;3s+9,\\;2s+4)\\).",
          "Equate: \\(3t-4s = 13,\\;\\; 2t-3s = 9,\\;\\; t-2s = 5\\). Solving the first two gives \\(t = 3,\\; s = -1\\).",
          "Check the third: \\(3 - 2(-1) = 5\\) ✓. Intersection point \\((3,6,2)\\).",
          "Distance from \\((2,4,0)\\): \\(\\sqrt{1^2+2^2+2^2} = \\sqrt{9} = 3\\).",
        ],
        answer: "Distance \\(= 3\\) units",
      },
      selfCheckExample: {
        prompt:
          "Find the point of intersection of \\(\\dfrac{x-1}{2}=\\dfrac{y+1}{3}=\\dfrac{z}{1}\\) and \\(\\dfrac{x-4}{1}=\\dfrac{y-5}{2}=\\dfrac{z-3}{3}\\).",
        steps: [
          "Line 1: \\((1+2t,\\,-1+3t,\\,t)\\); Line 2: \\((4+s,\\,5+2s,\\,3+3s)\\).",
          "From \\(x\\) and \\(z\\): \\(1+2t = 4+s\\) and \\(t = 3+3s\\). Substituting the second into the first: \\(1+2(3+3s)=4+s\\Rightarrow 7+6s = 4+s\\Rightarrow s = -1,\\; t = 0\\).",
          "Check \\(y\\): Line 1 gives \\(-1+0 = -1\\); Line 2 gives \\(5+2(-1) = 3\\). These DON'T match — so the lines are skew.",
        ],
        answer: "No intersection — the \\(y\\)-equation fails, so the lines are skew (the third-coordinate check is what reveals it)",
      },
      practiceSet: [
        { prompt: "Two lines giving 3 equations in 2 unknowns — how many must you solve, how many must check?", answer: "solve 2, the 3rd must check" },
        { prompt: "If the third equation FAILS, the lines are?", answer: "skew (non-coplanar)" },
        { prompt: "Reflection of \\((2,-4,7)\\) in the XY-plane?", answer: "\\((2,-4,-7)\\)" },
        { prompt: "Why use \\(t\\) and \\(s\\), not \\(t\\) for both lines?", answer: "they meet at independent parameter values" },
      ],
      pyqExampleId: "eb620138-0e1d-4574-976a-12ee2e5f735c",
      traps: [
        {
          title: "Always verify the THIRD equation",
          body:
            "Solving two of the three coordinate equations ALWAYS gives some \\(t, s\\) — even for skew lines. The lines only truly intersect if those values also satisfy the third equation. Skipping the check can hand you a phantom 'intersection point' for lines that never meet.",
        },
        {
          title: "Read the FINAL ask",
          body:
            "Most of these stems don't want the intersection point — they want the distance from it to another point, or its reflection. Find the point, then finish the requested operation. The intersection is the midpoint of the work, not the answer.",
        },
      ],
    },

    // ── WORKHORSE: COPLANARITY / INTERSECT ⇒ FIND k (quadratic) ───────────────
    {
      kind: "formula" as const,
      slug: "cetlp-coplanarity-condition-k",
      name: "Coplanarity and intersect-find-k by the scalar triple product",
      visualizationSlug: "triple-product-box",
      intuition:
        "Two lines lie in one plane (are coplanar) exactly when the vector joining a point of one to a point of the other lies in the plane spanned by their two directions — i.e. the three vectors are flat (zero box volume). That flatness is the scalar triple product = 0. This is THE most-tested template in the chapter: 'these lines intersect / are coplanar, find the unknown'. Crucially, when the unknown sits in BOTH direction vectors, the determinant comes out QUADRATIC — so there are usually TWO values.",
      definition:
        "Two lines with points \\(A_1, A_2\\) and directions \\(\\vec{d}_1=(a_1,b_1,c_1)\\), \\(\\vec{d}_2=(a_2,b_2,c_2)\\) are **coplanar** (they intersect or are parallel) iff:\n" +
        "\\[\\big[\\,\\vec{A_1A_2},\\;\\vec{d_1},\\;\\vec{d_2}\\,\\big]=\\begin{vmatrix} x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}=0\\]\n" +
        "- For NON-parallel lines, coplanar **\\(\\Leftrightarrow\\) they intersect**. So 'find \\(k\\) for which the lines intersect' uses the SAME determinant \\(=0\\).\n" +
        "- If the unknown appears in both direction rows, expanding gives a **quadratic** \\(\\Rightarrow\\) TWO answers.\n" +
        "- A non-zero value \\(\\Rightarrow\\) the lines are **skew** (do not intersect).",
      formula: {
        label: "Coplanarity / intersection determinant = 0",
        latex:
          "\\begin{vmatrix} x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}=0",
        symbols: [
          { symbol: "Row 1", meaning: "joining vector \\(\\vec{A_1A_2}=A_2-A_1\\)" },
          { symbol: "Row 2", meaning: "direction ratios of line 1" },
          { symbol: "Row 3", meaning: "direction ratios of line 2" },
        ],
      },
      authoredExample: {
        prompt:
          "The lines \\(\\dfrac{x-3}{1}=\\dfrac{y-2}{1}=\\dfrac{z-5}{-k}\\) and \\(\\dfrac{x-4}{k}=\\dfrac{y-3}{1}=\\dfrac{z-3}{2}\\) are coplanar. Find \\(k\\).",
        steps: [
          "Points \\((3,2,5)\\), \\((4,3,3)\\) \\(\\Rightarrow\\) joining vector \\((1,1,-2)\\). Directions \\((1,1,-k)\\) and \\((k,1,2)\\).",
          "Set the determinant to zero: \\(\\begin{vmatrix} 1 & 1 & -2 \\\\ 1 & 1 & -k \\\\ k & 1 & 2 \\end{vmatrix}=0\\).",
          "Expand along row 1: \\(1(2+k) - 1(2+k^2) - 2(1-k) = 0\\).",
          "Simplify: \\(2+k-2-k^2-2+2k = -k^2+3k-2 = 0 \\Rightarrow k^2-3k+2 = 0\\).",
          "Factor: \\((k-1)(k-2)=0 \\Rightarrow k = 1\\) or \\(k = 2\\).",
        ],
        answer: "\\(k = 1\\) or \\(k = 2\\) — BOTH values (the determinant is quadratic)",
      },
      selfCheckExample: {
        prompt:
          "For what \\(k\\) are \\(\\dfrac{x-2}{1}=\\dfrac{y-3}{1}=\\dfrac{z-4}{-k}\\) and \\(\\dfrac{x-1}{k}=\\dfrac{y-4}{2}=\\dfrac{z-5}{1}\\) coplanar?",
        steps: [
          "Joining vector \\((1,4,5)-(2,3,4) = (-1,1,1)\\). Directions \\((1,1,-k)\\), \\((k,2,1)\\).",
          "\\(\\begin{vmatrix} -1 & 1 & 1 \\\\ 1 & 1 & -k \\\\ k & 2 & 1 \\end{vmatrix} = 0\\).",
          "Expand: \\(-1(1+2k) - 1(1+k^2) + 1(2-k) = -k^2 - 3k = 0\\).",
          "\\(-k(k+3)=0 \\Rightarrow k = 0\\) or \\(k = -3\\).",
        ],
        answer: "\\(k = 0\\) or \\(k = -3\\)",
      },
      practiceSet: [
        { prompt: "Coplanarity condition for two lines, in one phrase?", answer: "scalar triple product \\([\\vec{A_1A_2},\\vec{d_1},\\vec{d_2}]=0\\)" },
        { prompt: "For non-parallel lines, coplanar is equivalent to?", answer: "they intersect" },
        { prompt: "If the determinant is NON-zero, the lines are?", answer: "skew" },
        { prompt: "\\(k^2-3k+2=0\\) factors to?", answer: "\\((k-1)(k-2)=0\\), so \\(k=1,2\\)" },
        { prompt: "Why does intersect-find-k often give two answers?", answer: "the unknown is in both rows \\(\\Rightarrow\\) quadratic" },
      ],
      pyqExampleId: "36f6f355-6b89-4af6-8125-36f64200ce77",
      traps: [
        {
          title: "The QUADRATIC trap — there are usually TWO values of k",
          body:
            "When the unknown sits in both direction rows, expanding the determinant gives \\(k^2 + \\ldots = 0\\), which has TWO roots. The bank's correct option lists both (e.g. '1, 2' or '0, -3'); the planted distractor gives only ONE root. If your working produces a single \\(k\\), you almost certainly dropped a term — re-expand and look for the squared term.",
        },
        {
          title: "Joining vector is \\(A_2 - A_1\\), and it is ROW 1",
          body:
            "The determinant's first row is the vector between the two fixed points (head minus tail), NOT a direction. Putting a direction vector in row 1, or subtracting the points the wrong way, flips signs and corrupts the whole expansion. Layout: joining vector on top, then the two directions.",
        },
        {
          title: "'Intersect' uses the SAME determinant as 'coplanar'",
          body:
            "For non-parallel lines, intersecting and being coplanar are the same condition. So whether the stem says 'intersect' or 'coplanar', set the same scalar-triple-product determinant to zero — don't hunt for a different formula.",
        },
      ],
    },

    // ── FOUR POINTS COPLANAR ─────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-four-points-coplanar",
      name: "Four points coplanar",
      visualizationSlug: "triple-product-box",
      intuition:
        "Four points lie in one plane when the three edge-vectors drawn from one of them are flat — zero box volume again. Pick a base point \\(A\\), build \\(\\vec{AB}, \\vec{AC}, \\vec{AD}\\), and set their scalar triple product to zero. Same engine as line coplanarity, just with point-to-point vectors instead of directions.",
      definition:
        "Points \\(A, B, C, D\\) are **coplanar** iff the three vectors from \\(A\\) have zero scalar triple product:\n" +
        "\\[[\\,\\vec{AB},\\;\\vec{AC},\\;\\vec{AD}\\,]=\\begin{vmatrix} \\vec{AB} \\\\ \\vec{AC} \\\\ \\vec{AD} \\end{vmatrix}=0\\]\n" +
        "where each row holds the components of that edge vector (\\(\\vec{AB}=B-A\\), etc.). If an unknown sits in one coordinate, this gives a LINEAR equation for it (one answer), unlike the line-coplanarity case which is usually quadratic.",
      formula: {
        label: "Four points coplanar",
        latex: "[\\,\\vec{AB},\\;\\vec{AC},\\;\\vec{AD}\\,]=0",
        symbols: [
          { symbol: "\\(\\vec{AB}=B-A\\)", meaning: "edge vector from base point \\(A\\) to \\(B\\)" },
          { symbol: "scalar triple product", meaning: "determinant of the three edge vectors as rows" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(p\\) so that the points \\(A(2,1,3),\\,B(3,2,5),\\,C(1,0,2),\\,D(4,p,1)\\) are coplanar.",
        steps: [
          "\\(\\vec{AB} = (1,1,2)\\), \\(\\vec{AC} = (-1,-1,-1)\\), \\(\\vec{AD} = (2,\\,p-1,\\,-2)\\).",
          "Set \\([\\vec{AB},\\vec{AC},\\vec{AD}] = \\begin{vmatrix} 1 & 1 & 2 \\\\ -1 & -1 & -1 \\\\ 2 & p-1 & -2 \\end{vmatrix} = 0\\).",
          "Expand along row 1: \\(1\\big[(-1)(-2)-(-1)(p-1)\\big] - 1\\big[(-1)(-2)-(-1)(2)\\big] + 2\\big[(-1)(p-1)-(-1)(2)\\big]\\).",
          "\\(= 1(2+p-1) - 1(2+2) + 2(-(p-1)+2) = (p+1) - 4 + 2(3-p)\\).",
          "\\(= p + 1 - 4 + 6 - 2p = -p + 3 = 0 \\Rightarrow p = 3\\).",
        ],
        answer: "\\(p = 3\\)",
      },
      selfCheckExample: {
        prompt:
          "Show that the points \\(A(2,1,4),\\,B(5,3,6),\\,C(4,7,8),\\,D(7,9,10)\\) are coplanar.",
        steps: [
          "\\(\\vec{AB}=(3,2,2)\\), \\(\\vec{AC}=(2,6,4)\\), \\(\\vec{AD}=(5,8,6)\\).",
          "\\([\\vec{AB},\\vec{AC},\\vec{AD}] = \\begin{vmatrix} 3 & 2 & 2 \\\\ 2 & 6 & 4 \\\\ 5 & 8 & 6 \\end{vmatrix}\\).",
          "Expand along row 1: \\(3\\big[(6)(6)-(4)(8)\\big] - 2\\big[(2)(6)-(4)(5)\\big] + 2\\big[(2)(8)-(6)(5)\\big]\\).",
          "\\(= 3(36-32) - 2(12-20) + 2(16-30) = 3(4) - 2(-8) + 2(-14) = 12 + 16 - 28 = 0\\).",
        ],
        answer: "Coplanar — the scalar triple product is \\(0\\), so all four points lie in one plane",
      },
      practiceSet: [
        { prompt: "Condition for 4 points to be coplanar?", answer: "\\([\\vec{AB},\\vec{AC},\\vec{AD}]=0\\)" },
        { prompt: "Edge vector \\(\\vec{AB}\\) equals?", answer: "\\(B-A\\)" },
        { prompt: "If two of the edge-vector rows are proportional, the determinant is?", answer: "\\(0\\)" },
        { prompt: "An unknown in ONE coordinate gives a ___ equation here?", answer: "linear (one answer)" },
      ],
      pyqExampleId: "7ecb3008-99c9-4c33-b552-6413f57a2d24",
      traps: [
        {
          title: "All edge vectors must start from the SAME base point",
          body:
            "Use \\(\\vec{AB}, \\vec{AC}, \\vec{AD}\\) — all from \\(A\\). Mixing in \\(\\vec{BC}\\) or \\(\\vec{CD}\\) breaks the 'three edges of a box from one corner' picture and the determinant no longer tests coplanarity.",
        },
        {
          title: "Four-point coplanarity is usually LINEAR in the unknown",
          body:
            "Here the unknown sits in only one edge vector, so the expansion is linear — ONE value. Don't expect the two-root quadratic of the line-coplanarity template; if you get a quadratic, you probably put the unknown in two rows by mistake.",
        },
      ],
    },

    // ── SHORTEST DISTANCE BETWEEN SKEW LINES ─────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-shortest-distance-skew",
      name: "Shortest distance between skew lines",
      visualizationSlug: "lines-distance-point-line",
      intuition:
        "Skew lines never meet, but there is a unique shortest segment between them — and it is perpendicular to BOTH. Its direction is \\(\\vec{d_1}\\times\\vec{d_2}\\). Project the joining vector onto that common perpendicular: the shortest distance is the scalar triple product of (joining vector, \\(\\vec{d_1}\\), \\(\\vec{d_2}\\)) divided by \\(|\\vec{d_1}\\times\\vec{d_2}|\\). The numerator is the SAME coplanarity determinant — so SD \\(= 0\\) exactly when the lines are coplanar.",
      definition:
        "For lines \\(\\vec{r}_1=\\vec{a_1}+\\lambda\\vec{d_1}\\) and \\(\\vec{r}_2=\\vec{a_2}+\\mu\\vec{d_2}\\), the **shortest distance** is\n" +
        "\\[d = \\frac{\\big|\\,(\\vec{a_2}-\\vec{a_1})\\cdot(\\vec{d_1}\\times\\vec{d_2})\\,\\big|}{|\\vec{d_1}\\times\\vec{d_2}|}\\]\n" +
        "- The numerator is \\(\\big|[\\,\\vec{a_2}-\\vec{a_1},\\,\\vec{d_1},\\,\\vec{d_2}\\,]\\big|\\) — the coplanarity determinant in absolute value.\n" +
        "- **\\(d = 0 \\Leftrightarrow\\) coplanar** (intersecting or parallel).\n" +
        "- 'SD given, find a parameter' reverses it: set \\(d\\) equal to the given value and solve — often a **quadratic**, giving two values whose SUM the question may ask for.",
      formula: {
        label: "Shortest distance (skew lines)",
        latex:
          "d = \\frac{|(\\vec{a_2}-\\vec{a_1})\\cdot(\\vec{d_1}\\times\\vec{d_2})|}{|\\vec{d_1}\\times\\vec{d_2}|}",
        symbols: [
          { symbol: "\\(\\vec{a_2}-\\vec{a_1}\\)", meaning: "vector joining the two fixed points" },
          { symbol: "\\(\\vec{d_1}\\times\\vec{d_2}\\)", meaning: "common perpendicular direction" },
          { symbol: "numerator", meaning: "absolute scalar triple product = coplanarity determinant" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the shortest distance between \\(\\dfrac{x-1}{2}=\\dfrac{y-2}{3}=\\dfrac{z-3}{4}\\) and \\(\\dfrac{x-2}{3}=\\dfrac{y-4}{4}=\\dfrac{z-5}{5}\\).",
        steps: [
          "\\(\\vec{a_2}-\\vec{a_1} = (2-1,\\,4-2,\\,5-3) = (1,2,2)\\). Directions \\(\\vec{d_1}=(2,3,4)\\), \\(\\vec{d_2}=(3,4,5)\\).",
          "\\(\\vec{d_1}\\times\\vec{d_2} = (3\\cdot5-4\\cdot4,\\;4\\cdot3-2\\cdot5,\\;2\\cdot4-3\\cdot3) = (-1,2,-1)\\); magnitude \\(\\sqrt{1+4+1} = \\sqrt{6}\\).",
          "Numerator: \\(|(1)(-1)+(2)(2)+(2)(-1)| = |-1+4-2| = 1\\).",
          "\\(d = \\dfrac{1}{\\sqrt{6}}\\).",
        ],
        answer: "\\(d = \\dfrac{1}{\\sqrt{6}}\\) units",
      },
      selfCheckExample: {
        prompt:
          "If the shortest distance between \\(\\dfrac{x-1}{2}=\\dfrac{y-2}{3}=\\dfrac{z-3}{\\lambda}\\) and \\(\\dfrac{x-2}{1}=\\dfrac{y-4}{4}=\\dfrac{z-5}{5}\\) is \\(\\dfrac{1}{\\sqrt{3}}\\), find the SUM of possible \\(\\lambda\\).",
        steps: [
          "The SD condition with \\(\\lambda\\) in \\(\\vec{d_1}\\) makes the numerator and \\(|\\vec{d_1}\\times\\vec{d_2}|\\) both depend on \\(\\lambda\\); setting \\(d=\\tfrac{1}{\\sqrt3}\\) and squaring clears the root.",
          "The resulting equation is quadratic: \\(\\lambda^2 - 16\\lambda + 55 = 0\\Rightarrow\\lambda = 5\\) or \\(11\\).",
          "Sum of roots \\(= 16\\) (read directly off \\(-(-16)/1\\)).",
        ],
        answer: "Sum \\(= 16\\)",
      },
      practiceSet: [
        { prompt: "Common perpendicular direction of two skew lines?", answer: "\\(\\vec{d_1}\\times\\vec{d_2}\\)" },
        { prompt: "Shortest distance \\(= 0\\) means the lines are?", answer: "coplanar (intersect or parallel)" },
        { prompt: "Numerator of the SD formula equals which determinant?", answer: "the coplanarity scalar triple product" },
        { prompt: "If SD given and \\(\\lambda\\) is in a direction, the equation in \\(\\lambda\\) is usually?", answer: "quadratic (two values)" },
        { prompt: "\\(\\vec{d_1}\\times\\vec{d_2}=(8,8,4)\\): its magnitude?", answer: "\\(12\\)" },
      ],
      pyqExampleId: "04e7b6a4-ade9-449b-b608-46bbf7653eb3",
      traps: [
        {
          title: "Divide by \\(|\\vec{d_1}\\times\\vec{d_2}|\\), and take the ABSOLUTE value on top",
          body:
            "The shortest distance is a length, so the numerator is in modulus and you divide by the cross-product's magnitude — NOT by \\(|\\vec{a_2}-\\vec{a_1}|\\). Forgetting the absolute value can give a negative 'distance'; dividing by the wrong magnitude gives a plausible-looking but wrong fraction.",
        },
        {
          title: "'SD given, find the parameter' is a QUADRATIC — expect two values",
          body:
            "Reversing the formula (set \\(d\\) to a number, solve for the unknown) almost always squares into a quadratic. The question often asks for the SUM of the two values — read it off as \\(-b/a\\) without even finding the roots separately.",
        },
      ],
    },

    // ── DIRECTION OF LINE OF INTERSECTION OF TWO PLANES ──────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-plane-intersection-direction",
      name: "Direction of the line of intersection of two planes",
      intuition:
        "Two non-parallel planes meet along a line. That line lies inside BOTH planes, so it is perpendicular to BOTH normals — which means its direction is the cross product of the two normals \\(\\vec{n_1}\\times\\vec{n_2}\\). You don't need a point on the line to answer 'a vector parallel to the line of intersection'.",
      definition:
        "Planes \\(\\vec{r}\\cdot\\vec{n_1}=d_1\\) and \\(\\vec{r}\\cdot\\vec{n_2}=d_2\\) intersect in a line whose **direction** is\n" +
        "\\[\\vec{d}=\\vec{n_1}\\times\\vec{n_2}\\]\n" +
        "because the line lies in both planes and is therefore perpendicular to each normal. Any non-zero scalar multiple of \\(\\vec{n_1}\\times\\vec{n_2}\\) is an equally valid direction.",
      formula: {
        label: "Direction of line of intersection of two planes",
        latex: "\\vec{d}=\\vec{n_1}\\times\\vec{n_2}",
        symbols: [
          { symbol: "\\(\\vec{n_1},\\,\\vec{n_2}\\)", meaning: "normals of the two planes" },
          { symbol: "\\(\\vec{n_1}\\times\\vec{n_2}\\)", meaning: "direction of their line of intersection" },
        ],
      },
      authoredExample: {
        prompt:
          "Find a vector parallel to the line of intersection of the planes \\(\\vec{r}\\cdot(2\\hat{i}+\\hat{j}-\\hat{k})=3\\) and \\(\\vec{r}\\cdot(\\hat{i}-\\hat{j}+2\\hat{k})=1\\).",
        steps: [
          "Normals: \\(\\vec{n_1}=(2,1,-1)\\), \\(\\vec{n_2}=(1,-1,2)\\).",
          "\\(\\vec{n_1}\\times\\vec{n_2}=\\begin{vmatrix}\\hat{i}&\\hat{j}&\\hat{k}\\\\2&1&-1\\\\1&-1&2\\end{vmatrix}\\).",
          "\\(= \\hat{i}(2-1) - \\hat{j}(4+1) + \\hat{k}(-2-1) = \\hat{i}-5\\hat{j}-3\\hat{k}\\).",
        ],
        answer: "\\(\\hat{i}-5\\hat{j}-3\\hat{k}\\)",
      },
      selfCheckExample: {
        prompt:
          "A vector parallel to the line of intersection of the planes \\(x+y+z=1\\) and \\(x-y+z=2\\)?",
        steps: [
          "Normals \\((1,1,1)\\) and \\((1,-1,1)\\).",
          "Cross product \\(=\\hat{i}(1+1)-\\hat{j}(1-1)+\\hat{k}(-1-1)=(2,0,-2)\\).",
        ],
        answer: "\\((2,0,-2)\\) (or simplified \\((1,0,-1)\\))",
      },
      practiceSet: [
        { prompt: "Direction of the line where two planes meet?", answer: "\\(\\vec{n_1}\\times\\vec{n_2}\\)" },
        { prompt: "Why is the line perpendicular to each normal?", answer: "it lies in each plane" },
        { prompt: "Cross product of \\((1,0,0)\\) and \\((0,1,0)\\)?", answer: "\\((0,0,1)\\)" },
        { prompt: "Is \\(2(\\vec{n_1}\\times\\vec{n_2})\\) also a valid direction?", answer: "Yes — any non-zero multiple works" },
      ],
      pyqExampleId: "0e34828c-ebe7-4f42-bdaf-0db709caa654",
      traps: [
        {
          title: "Use the NORMALS, not the planes' constants",
          body:
            "The direction depends only on \\(\\vec{n_1}\\times\\vec{n_2}\\) — the right-hand-side constants \\(d_1, d_2\\) play no part. They would only matter if you wanted an actual POINT on the line.",
        },
        {
          title: "Cross-product sign — keep the middle term's minus",
          body:
            "Expanding \\(\\vec{n_1}\\times\\vec{n_2}\\), the \\(\\hat{j}\\) component carries a leading minus sign in the cofactor expansion. Dropping it flips that component and you'll match the wrong option (the distractors are often the sign-flipped vector).",
        },
      ],
    },

    // ── TRANSVERSAL INTERSECTING TWO LINES ───────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-transversal-two-lines",
      name: "Transversal intersecting two given lines",
      intuition:
        "A transversal is a third line that crosses two given lines, with its OWN fixed direction. Take a general point \\(A\\) on line 1 and \\(B\\) on line 2 (each with its own parameter); the segment \\(\\vec{AB}\\) must be PARALLEL to the transversal's given direction ratios. That parallel condition pins down both parameters, hence both points A and B.",
      definition:
        "To find where a line of given direction \\((l,m,n)\\) meets two lines at \\(A\\) and \\(B\\):\n" +
        "- Write \\(A\\) as a general point of line 1 (parameter \\(\\lambda\\)) and \\(B\\) of line 2 (parameter \\(\\mu\\)).\n" +
        "- **Force \\(\\vec{AB}\\parallel (l,m,n)\\)**: the components of \\(\\vec{AB}\\) are proportional to \\((l,m,n)\\), giving \\(\\dfrac{(\\vec{AB})_x}{l}=\\dfrac{(\\vec{AB})_y}{m}=\\dfrac{(\\vec{AB})_z}{n}\\).\n" +
        "- Solve the two independent proportion equations for \\(\\lambda, \\mu\\); substitute back for \\(A\\) and \\(B\\).",
      formula: {
        label: "Transversal condition",
        latex: "\\vec{AB}\\parallel (l,m,n) \\;\\Rightarrow\\; \\frac{(\\vec{AB})_x}{l}=\\frac{(\\vec{AB})_y}{m}=\\frac{(\\vec{AB})_z}{n}",
        symbols: [
          { symbol: "\\(A,\\,B\\)", meaning: "general points on line 1 (param \\(\\lambda\\)) and line 2 (param \\(\\mu\\))" },
          { symbol: "\\((l,m,n)\\)", meaning: "direction ratios of the transversal" },
        ],
      },
      authoredExample: {
        prompt:
          "A line with direction ratios \\((1,1,1)\\) meets \\(\\dfrac{x}{1}=\\dfrac{y}{2}=\\dfrac{z}{3}\\) at A and \\(\\dfrac{x-1}{2}=\\dfrac{y-1}{1}=\\dfrac{z-1}{1}\\) at B. Find A and B.",
        steps: [
          "\\(A = (\\lambda,\\;2\\lambda,\\;3\\lambda)\\); \\(B = (1+2\\mu,\\;1+\\mu,\\;1+\\mu)\\).",
          "\\(\\vec{AB} = (1+2\\mu-\\lambda,\\;1+\\mu-2\\lambda,\\;1+\\mu-3\\lambda)\\) must be proportional to \\((1,1,1)\\) — so all three components are EQUAL.",
          "Equate \\(x\\)- and \\(y\\)-components: \\(1+2\\mu-\\lambda = 1+\\mu-2\\lambda \\Rightarrow \\mu+\\lambda = 0\\). Equate \\(y\\)- and \\(z\\)-components: \\(1+\\mu-2\\lambda = 1+\\mu-3\\lambda \\Rightarrow \\lambda = 0\\), hence \\(\\mu = 0\\).",
          "Substitute: \\(A = (0,0,0)\\), \\(B = (1,1,1)\\); indeed \\(\\vec{AB} = (1,1,1)\\) ✓.",
        ],
        answer: "\\(A(0,0,0),\\; B(1,1,1)\\)",
      },
      selfCheckExample: {
        prompt:
          "After finding the parameters in a transversal problem, what MUST you verify before trusting your A and B?",
        steps: [
          "Recompute \\(\\vec{AB}=B-A\\) with the found parameters.",
          "Check it is genuinely proportional to the transversal's direction \\((l,m,n)\\) — i.e. \\(\\vec{AB}=t(l,m,n)\\) for one scalar \\(t\\).",
        ],
        answer: "Verify \\(\\vec{AB}\\) is parallel to the given direction \\((l,m,n)\\)",
      },
      practiceSet: [
        { prompt: "The segment joining the two intersection points must be ___ to the transversal?", answer: "parallel" },
        { prompt: "How many parameters do you introduce for a transversal meeting two lines?", answer: "two (\\(\\lambda\\) and \\(\\mu\\))" },
        { prompt: "\\(\\vec{AB}\\parallel(l,m,n)\\) gives how many independent equations?", answer: "two proportions" },
        { prompt: "\\(\\vec{AB}=(2,-8,4)\\) — is it parallel to \\((1,-4,2)\\)?", answer: "Yes", method: "\\(\\vec{AB}=2(1,-4,2)\\)" },
      ],
      pyqExampleId: "89d3652d-c455-412c-a1c7-d66ae545084d",
      traps: [
        {
          title: "VERIFY the parallel condition after solving",
          body:
            "It is easy to solve two of the proportion equations and stop, but the found \\(\\lambda, \\mu\\) must make \\(\\vec{AB}\\) genuinely proportional to \\((l,m,n)\\). Skip this and you can land on the sign-flipped distractor (e.g. \\((8,6,7)\\) instead of \\((-8,6,-7)\\)).",
        },
        {
          title: "Two SEPARATE parameters, one per line",
          body:
            "Point A uses line 1's parameter \\(\\lambda\\); point B uses line 2's parameter \\(\\mu\\). Re-using one symbol collapses the system and gives no valid transversal.",
        },
      ],
    },

    // ── LINE LIES IN A PLANE ─────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "cetlp-line-in-plane-condition",
      name: "Condition for a line to lie in a plane",
      intuition:
        "A line lies entirely in a plane when TWO things hold at once: the line's direction is perpendicular to the plane's normal (so the line is parallel to the plane), AND one point of the line actually sits on the plane (so it is not just parallel-but-off). Both conditions together force every point of the line onto the plane.",
      definition:
        "The line through \\(P_0\\) with direction \\(\\vec{d}\\) lies in the plane \\(Ax+By+Cz+D=0\\) (normal \\(\\vec{n}=(A,B,C)\\)) iff BOTH:\n" +
        "- **Direction perpendicular to normal:** \\(\\vec{d}\\cdot\\vec{n}=0\\) (line is parallel to the plane), AND\n" +
        "- **Point on plane:** \\(P_0\\) satisfies the plane equation.\n\n" +
        "Either condition alone is not enough — \\(\\vec{d}\\cdot\\vec{n}=0\\) without the point gives a line parallel to but OUTSIDE the plane.",
      formula: {
        label: "Line lies in plane (both conditions)",
        latex: "\\vec{d}\\cdot\\vec{n}=0 \\quad\\text{and}\\quad P_0 \\in \\text{plane}",
        symbols: [
          { symbol: "\\(\\vec{d}\\cdot\\vec{n}=0\\)", meaning: "direction ⟂ normal ⇒ line parallel to plane" },
          { symbol: "\\(P_0 \\in\\) plane", meaning: "a point of the line satisfies the plane equation" },
        ],
      },
      authoredExample: {
        prompt:
          "Find \\(a\\) and \\(b\\) so that the line \\(\\dfrac{x-1}{2}=\\dfrac{y+1}{1}=\\dfrac{z-2}{a}\\) lies in the plane \\(x - 2y + z = b\\).",
        steps: [
          "Direction \\((2,1,a)\\) ⟂ normal \\((1,-2,1)\\): \\(2(1)+1(-2)+a(1)=0 \\Rightarrow a = 0\\).",
          "Point \\((1,-1,2)\\) on the plane: \\(1 - 2(-1) + 2 = b \\Rightarrow b = 5\\).",
          "So the line \\(\\dfrac{x-1}{2}=\\dfrac{y+1}{1}=\\dfrac{z-2}{0}\\) lies in \\(x - 2y + z = 5\\).",
        ],
        answer: "\\(a = 0,\\; b = 5\\)",
      },
      selfCheckExample: {
        prompt:
          "Does the line through \\((1,0,0)\\) with direction \\((1,1,1)\\) lie in the plane \\(x+y-2z=1\\)?",
        steps: [
          "Direction ⟂ normal? \\((1,1,1)\\cdot(1,1,-2)=1+1-2=0\\) ✓ (parallel to plane).",
          "Point on plane? \\(1+0-0=1\\) ✓.",
          "Both hold, so the line lies in the plane.",
        ],
        answer: "Yes — both conditions are satisfied",
      },
      practiceSet: [
        { prompt: "Two conditions for a line to lie in a plane?", answer: "\\(\\vec{d}\\cdot\\vec{n}=0\\) AND a point of the line on the plane" },
        { prompt: "\\(\\vec{d}\\cdot\\vec{n}=0\\) alone means the line is?", answer: "parallel to the plane (possibly outside it)" },
        { prompt: "Direction \\((2,1,1)\\), normal \\((1,-1,-1)\\): is \\(\\vec{d}\\cdot\\vec{n}=0\\)?", answer: "Yes", method: "\\(2-1-1=0\\)" },
        { prompt: "Which condition do you use to find the constant term \\(\\beta\\)?", answer: "point-on-plane" },
      ],
      pyqExampleId: "86d4aae3-7567-4062-bf48-61765166d382",
      traps: [
        {
          title: "BOTH conditions are required",
          body:
            "Solving only \\(\\vec{d}\\cdot\\vec{n}=0\\) gives \\(\\alpha\\), but you still need the point-on-plane condition to get \\(\\beta\\) (and to confirm the line is actually IN, not merely parallel to, the plane). One condition gives one unknown — you need both for problems with two unknowns.",
        },
        {
          title: "Perpendicular DIRECTIONS, parallel LINE",
          body:
            "It's the line's direction that is perpendicular to the normal, which makes the LINE parallel to the plane. Don't confuse 'direction ⟂ normal' with 'line ⟂ plane' — those are opposite situations.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Distances in 3-D (point-to-plane, point-to-line)",
      href: "/notes/mht-cet-maths/line-and-plane/distances-3d",
    },
    {
      label: "Angles and parallel/perpendicular conditions",
      href: "/notes/mht-cet-maths/line-and-plane/angles-conditions",
    },
  ],
};
