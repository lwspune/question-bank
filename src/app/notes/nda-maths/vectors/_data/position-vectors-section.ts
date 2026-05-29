import type { SubtopicNote } from "@/app/notes/_types";

export const POSITION_VECTORS_SECTION_NOTE: SubtopicNote = {
  // DB subtopic name — must match live taxonomy. The TS title below reframes
  // it for the student; the DB name stays put so concept-tags resolve.
  subtopicName: "Position Vectors and Section",
  title: "Foundations: Vectors, Operations, and Position",
  oneLineDefinition:
    "What a vector is, how to add and scale them, the standard î-ĵ-k̂ basis that turns vectors into numbers, and how anchoring at an origin turns geometry into algebra.",
  whyItMatters:
    "Start here. The rest of the chapter — magnitude, dot product, cross product, vector geometry — is built on the eight ideas below. " +
    "The first six are pure FOUNDATIONS (what a vector is, addition, scalar multiplication, components, types of vectors); " +
    "the last two are the chapter's first geometric payoff — a collinearity test and the section formula for dividing a segment. " +
    "The PYQ bank has 6 questions tagged on this subtopic (collinearity + section, three of them HARD) — " +
    "but you can't drill those without the foundations underneath them. Read top-to-bottom.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "what-is-a-vector",
      name: "What is a vector? (Scalars vs vectors)",
      intuition:
        "Mathematics splits quantities into two families. A scalar — temperature, mass, speed, electric charge — has only magnitude: one number tells you everything. " +
        "A vector has both magnitude AND direction; one number is not enough. The classical contrast is speed vs velocity: " +
        "\\\"60 km/h\\\" is a scalar (the speed); \\\"60 km/h east\\\" is a vector (the velocity). " +
        "Pictorially we draw a vector as a directed arrow — the length encodes magnitude, the arrowhead encodes direction.",
      definition:
        "A **scalar** is a real number — magnitude only. A **vector** is an entity with both magnitude (a non-negative real number) and direction (a way of pointing in space). " +
        "Two vectors are equal if and only if they have the same magnitude AND the same direction — equality is independent of where the arrow is drawn on the page. " +
        "We write vectors with an over-arrow, like \\(\\vec{v}\\), or in bold, like \\(\\mathbf{v}\\); their magnitude is written \\(|\\vec{v}|\\).",
      authoredExample: {
        prompt:
          "Classify each as scalar or vector: (a) mass of an apple, (b) velocity of a falling stone, (c) temperature of a room, (d) electric current in a wire, (e) force pushing a box, (f) displacement from school to home.",
        steps: [
          "(a) Mass — a single positive number (grams). Direction is meaningless. **Scalar.**",
          "(b) Velocity — specifies both how fast AND in which direction. **Vector.**",
          "(c) Temperature — a single number (degrees). No direction. **Scalar.**",
          "(d) Electric current — a magnitude (amperes) with only a sign convention for flow along the wire, not a spatial direction. **Scalar.** (Current density IS a vector — but plain current is treated as scalar in school physics.)",
          "(e) Force — specified by both how strong and in what direction it pushes. **Vector.**",
          "(f) Displacement — \\\"5 km north-east\\\" needs both magnitude and direction. **Vector.**",
        ],
        answer: "Scalars: (a), (c), (d). Vectors: (b), (e), (f).",
      },
      traps: [
        {
          title: "An arrow drawn anywhere on the page represents the same vector",
          body:
            "Two arrows of the same length and direction, drawn in different places, denote the SAME vector — vectors are not tied to a starting point unless we explicitly anchor them. " +
            "We'll see in concept 6 (Types of Vectors) when that distinction matters and the term \\\"localized vector\\\" applies.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "position-and-displacement-vectors",
      name: "Position vectors and displacement vectors",
      intuition:
        "To do geometry with vectors we need to anchor them. Pick any point in space and call it the **origin** \\(O\\). Every other point \\(P\\) is then represented by its **position vector** \\(\\vec{OP}\\) — the arrow from \\(O\\) to \\(P\\). " +
        "Once points have position vectors, geometry becomes algebra: the arrow from \\(A\\) to \\(B\\) (its **displacement vector**) is just the difference of their position vectors: \\(\\vec{AB} = \\vec{b} - \\vec{a}\\). " +
        "This single idea — point \\(\\leftrightarrow\\) position vector — is the bridge that the entire rest of the chapter walks over.",
      definition:
        "Fix an origin \\(O\\). The **position vector** of a point \\(P\\) (often written \\(\\vec{p}\\)) is the vector \\(\\vec{OP}\\) from \\(O\\) to \\(P\\); its magnitude is the distance \\(OP\\), its direction is from \\(O\\) towards \\(P\\). " +
        "The **displacement vector** from \\(A\\) to \\(B\\) is " +
        "\\(\\vec{AB} = \\vec{OB} - \\vec{OA} = \\vec{b} - \\vec{a}\\) (head minus tail). " +
        "Its magnitude \\(|\\vec{AB}|\\) is the distance from \\(A\\) to \\(B\\).",
      formula: {
        label: "Position vector → displacement",
        latex:
          "\\vec{AB} = \\vec{b} - \\vec{a} \\qquad AB = |\\vec{b} - \\vec{a}|",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of \\(A, B\\) from the chosen origin" },
          { symbol: "\\(\\vec{AB}\\)", meaning: "displacement vector from \\(A\\) to \\(B\\) — head minus tail" },
        ],
      },
      authoredExample: {
        prompt:
          "Points \\(A\\) and \\(B\\) have position vectors \\(\\vec{a} = 2\\hat{i} + \\hat{j}\\) and \\(\\vec{b} = 5\\hat{i} - 3\\hat{j}\\). Find (i) the displacement \\(\\vec{AB}\\), (ii) the displacement \\(\\vec{BA}\\), and (iii) the distance \\(AB\\).",
        steps: [
          "(i) Head minus tail: \\(\\vec{AB} = \\vec{b} - \\vec{a} = (5-2)\\hat{i} + (-3-1)\\hat{j} = 3\\hat{i} - 4\\hat{j}\\).",
          "(ii) Reverse the direction by negating: \\(\\vec{BA} = -\\vec{AB} = -3\\hat{i} + 4\\hat{j}\\). Equivalently \\(\\vec{BA} = \\vec{a} - \\vec{b}\\).",
          "(iii) Distance = magnitude: \\(|\\vec{AB}| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5\\).",
        ],
        answer: "\\(\\vec{AB} = 3\\hat{i} - 4\\hat{j}\\); \\(\\vec{BA} = -3\\hat{i} + 4\\hat{j}\\); \\(AB = 5\\) units.",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a} = \\hat{i} + \\hat{j}\\), \\(\\vec{b} = 4\\hat{i} + 5\\hat{j}\\). Find \\(\\vec{AB}\\).", answer: "\\(3\\hat{i} + 4\\hat{j}\\)", method: "\\(\\vec{b} - \\vec{a}\\)" },
        { prompt: "For the same points, find the distance \\(AB\\).", answer: "\\(5\\)", method: "\\(\\sqrt{3^2 + 4^2}\\)" },
        { prompt: "\\(\\vec{a} = 2\\hat{i}\\), \\(\\vec{b} = 2\\hat{i} + 3\\hat{j}\\). Find \\(\\vec{BA}\\).", answer: "\\(-3\\hat{j}\\)", method: "\\(\\vec{a} - \\vec{b}\\)" },
        { prompt: "Find \\(\\vec{AB}\\) for \\(A(1,2,0)\\), \\(B(1,2,5)\\).", answer: "\\(5\\hat{k}\\)" },
      ],
      traps: [
        {
          title: "Head minus tail — \\(\\vec{AB} = \\vec{b} - \\vec{a}\\), not \\(\\vec{a} - \\vec{b}\\)",
          body:
            "Reverse the subtraction and you compute \\(\\vec{BA}\\) instead. The magnitudes match (\\(|\\vec{AB}| = |\\vec{BA}|\\)), but the directions are opposite. " +
            "Direction matters whenever the result feeds into a dot product, an angle, or a cross product downstream.",
        },
        {
          title: "Position vectors depend on the choice of origin; displacement vectors do NOT",
          body:
            "If you move the origin from \\(O\\) to \\(O'\\), every position vector changes (they all shift by the same fixed amount), " +
            "but the displacement \\(\\vec{AB}\\) is unchanged — that's why displacements are the more \\\"physical\\\" quantity and most theorems are stated in terms of them.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "vector-addition",
      name: "Addition of vectors (triangle, parallelogram, polygon laws)",
      visualizationSlug: "vector-addition",
      intuition:
        "Two vectors add by joining them tip-to-tail. Place the second arrow's tail at the first arrow's head, then draw a new arrow from the very first tail to the very last head — that resultant arrow is the sum. " +
        "Equivalently, if you draw both vectors from a common tail, the sum is the diagonal of the parallelogram they span. " +
        "Subtraction is just addition of the negative: \\(\\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})\\).",
      definition:
        "- **Triangle law:** place \\(\\vec{b}\\) so its tail starts where \\(\\vec{a}\\)'s head ends; then \\(\\vec{a} + \\vec{b}\\) is the arrow from \\(\\vec{a}\\)'s tail to \\(\\vec{b}\\)'s head.\n" +
        "- **Parallelogram law** (equivalent): if \\(\\vec{a}\\) and \\(\\vec{b}\\) share a tail, \\(\\vec{a} + \\vec{b}\\) is the diagonal of the parallelogram on \\(\\vec{a}, \\vec{b}\\) from that shared tail.\n" +
        "- **Polygon law** (generalisation): the sum of any number of vectors placed tip-to-tail is the arrow from the very first tail to the very last head.\n" +
        "- **Properties:** addition is commutative (\\(\\vec{a} + \\vec{b} = \\vec{b} + \\vec{a}\\)), associative, has identity \\(\\vec{a} + \\vec{0} = \\vec{a}\\), and inverse \\(\\vec{a} + (-\\vec{a}) = \\vec{0}\\).",
      formula: {
        label: "Vector addition properties",
        latex:
          "\\vec{a} + \\vec{b} = \\vec{b} + \\vec{a} \\qquad \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})",
        symbols: [
          { symbol: "\\(\\vec{a} + \\vec{b}\\)", meaning: "tip-to-tail sum (a vector, not a number)" },
          { symbol: "\\(\\vec{0}\\)", meaning: "zero vector — the additive identity" },
          { symbol: "\\(-\\vec{a}\\)", meaning: "same length as \\(\\vec{a}\\), opposite direction" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle is displaced first by \\(\\vec{a} = 3\\hat{i} + 2\\hat{j}\\), then by \\(\\vec{b} = -\\hat{i} + 4\\hat{j}\\). Find its total displacement from the starting point and its distance from the start.",
        steps: [
          "Total displacement = sum of the two displacement vectors (tip-to-tail): \\(\\vec{R} = \\vec{a} + \\vec{b}\\).",
          "Add componentwise: \\(\\vec{R} = (3 + (-1))\\hat{i} + (2 + 4)\\hat{j} = 2\\hat{i} + 6\\hat{j}\\).",
          "Distance from start = magnitude of the resultant: \\(|\\vec{R}| = \\sqrt{2^2 + 6^2} = \\sqrt{4 + 36} = \\sqrt{40} = 2\\sqrt{10}\\).",
        ],
        answer: "Total displacement \\(\\vec{R} = 2\\hat{i} + 6\\hat{j}\\); distance from start \\(= 2\\sqrt{10}\\) units.",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a} = 2\\hat{i} + \\hat{j}\\), \\(\\vec{b} = \\hat{i} + 3\\hat{j}\\). Find \\(\\vec{a} + \\vec{b}\\).", answer: "\\(3\\hat{i} + 4\\hat{j}\\)" },
        { prompt: "\\(\\vec{a} = 3\\hat{i} - \\hat{j}\\), \\(\\vec{b} = -3\\hat{i} + \\hat{j}\\). Find \\(\\vec{a} + \\vec{b}\\).", answer: "\\(\\vec{0}\\)", method: "opposite vectors cancel" },
        { prompt: "Find \\(\\vec{a} - \\vec{b}\\) for \\(\\vec{a} = 5\\hat{i} + 2\\hat{j}\\), \\(\\vec{b} = \\hat{i} + 2\\hat{j}\\).", answer: "\\(4\\hat{i}\\)" },
        { prompt: "\\(|\\vec{a}| = 3\\), \\(|\\vec{b}| = 4\\), same direction. Find \\(|\\vec{a} + \\vec{b}|\\).", answer: "\\(7\\)", method: "aligned, so magnitudes add" },
      ],
      traps: [
        {
          title: "Closed-polygon identity: if vectors form a closed loop, they sum to \\(\\vec{0}\\)",
          body:
            "Tip-to-tail vectors that return to the starting point span a closed polygon, so their sum is the zero vector. " +
            "The triangle identity \\(\\vec{AB} + \\vec{BC} + \\vec{CA} = \\vec{0}\\) is exactly this rule for a triangle — used heavily in the Vector Geometry subtopic later.",
        },
        {
          title: "Magnitudes don't add: \\(|\\vec{a} + \\vec{b}| \\neq |\\vec{a}| + |\\vec{b}|\\) in general",
          body:
            "Two arrows of length 3 don't always combine to length 6 — they combine to length 6 only if perfectly aligned, length 0 if perfectly opposed, and anything in between otherwise. " +
            "The triangle inequality \\(|\\vec{a} + \\vec{b}| \\leq |\\vec{a}| + |\\vec{b}|\\) is the correct bound.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "scalar-multiplication",
      name: "Scalar multiplication",
      intuition:
        "Multiplying a vector by a real number scales its length. If \\(k > 0\\), \\(k\\vec{v}\\) points the SAME way as \\(\\vec{v}\\) but is \\(k\\) times as long. " +
        "If \\(k < 0\\), \\(k\\vec{v}\\) points the OPPOSITE way and has length \\(|k|\\) times the original. " +
        "If \\(k = 0\\), you get the zero vector. " +
        "Combined with addition, this single operation is the engine behind every vector expression in the chapter — every formula you'll meet is some combination of \\(\\vec{a} + \\vec{b}\\) and \\(k\\vec{v}\\).",
      definition:
        "For a scalar \\(k \\in \\mathbb{R}\\) and a vector \\(\\vec{v}\\), the product \\(k\\vec{v}\\) is the vector with " +
        "magnitude \\(|k|\\,|\\vec{v}|\\) and direction the same as \\(\\vec{v}\\) when \\(k > 0\\), opposite when \\(k < 0\\), and \\(\\vec{0}\\) when \\(k = 0\\). " +
        "It is distributive over both vector and scalar addition: " +
        "\\(k(\\vec{a} + \\vec{b}) = k\\vec{a} + k\\vec{b}\\) and \\((k + l)\\vec{a} = k\\vec{a} + l\\vec{a}\\). " +
        "It is also associative with ordinary multiplication: \\(k(l\\vec{a}) = (kl)\\vec{a}\\).",
      formula: {
        label: "Scalar multiplication",
        latex:
          "|k\\vec{v}| = |k|\\,|\\vec{v}| \\qquad k(\\vec{a} + \\vec{b}) = k\\vec{a} + k\\vec{b}",
        symbols: [
          { symbol: "\\(k\\)", meaning: "a real number (positive, negative, or zero)" },
          { symbol: "\\(|k|\\)", meaning: "absolute value of \\(k\\) (gives the magnitude-scaling factor)" },
          { symbol: "sign of \\(k\\)", meaning: "controls whether the direction is preserved or flipped" },
        ],
      },
      authoredExample: {
        prompt:
          "Given \\(\\vec{a} = 4\\hat{i} + 3\\hat{j}\\), compute \\(2\\vec{a}\\) and \\(-\\tfrac{1}{2}\\vec{a}\\), and verify both magnitudes satisfy \\(|k\\vec{v}| = |k|\\,|\\vec{v}|\\).",
        steps: [
          "Scale each component: \\(2\\vec{a} = 8\\hat{i} + 6\\hat{j}\\); \\(-\\tfrac{1}{2}\\vec{a} = -2\\hat{i} - \\tfrac{3}{2}\\hat{j}\\).",
          "Original magnitude: \\(|\\vec{a}| = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5\\).",
          "Check \\(|2\\vec{a}| = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10 = 2 \\cdot 5\\). \\(\\checkmark\\)",
          "Check \\(|-\\tfrac{1}{2}\\vec{a}| = \\sqrt{(-2)^2 + (-3/2)^2} = \\sqrt{4 + 9/4} = \\sqrt{25/4} = 5/2 = \\tfrac{1}{2} \\cdot 5\\). \\(\\checkmark\\)",
        ],
        answer: "\\(2\\vec{a} = 8\\hat{i} + 6\\hat{j}\\); \\(-\\tfrac{1}{2}\\vec{a} = -2\\hat{i} - \\tfrac{3}{2}\\hat{j}\\). Both magnitudes confirm the scaling rule.",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a} = 2\\hat{i} - 3\\hat{j}\\). Find \\(3\\vec{a}\\).", answer: "\\(6\\hat{i} - 9\\hat{j}\\)" },
        { prompt: "\\(\\vec{a} = 4\\hat{i} + 2\\hat{j}\\). Find \\(-\\tfrac{1}{2}\\vec{a}\\).", answer: "\\(-2\\hat{i} - \\hat{j}\\)" },
        { prompt: "If \\(|\\vec{a}| = 5\\), find \\(|3\\vec{a}|\\).", answer: "\\(15\\)", method: "\\(|k|\\,|\\vec{a}|\\)" },
        { prompt: "If \\(|\\vec{a}| = 6\\), find \\(|-2\\vec{a}|\\).", answer: "\\(12\\)" },
      ],
      traps: [
        {
          title: "Sign of \\(k\\) controls DIRECTION, not just signs of components",
          body:
            "\\(k = -1\\) does more than negate components arithmetically — geometrically it FLIPS the arrow (\\(180^\\circ\\) rotation). " +
            "That's the same operation as \\(-\\vec{v}\\), which is why subtraction reads as \\(\\vec{a} - \\vec{b} = \\vec{a} + (-1)\\vec{b}\\).",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "component-form-and-basis",
      name: "Component form: the î, ĵ, k̂ basis",
      intuition:
        "Pick three mutually-perpendicular unit vectors \\(\\hat{i}, \\hat{j}, \\hat{k}\\) along the positive \\(x, y, z\\) axes. " +
        "Every 3-D vector can be uniquely written as \\(\\vec{v} = v_1\\hat{i} + v_2\\hat{j} + v_3\\hat{k}\\) — " +
        "the numbers \\(v_1, v_2, v_3\\) are its **components** along those axes. " +
        "In component form, vector addition becomes componentwise addition; scalar multiplication becomes scalar-times-each-component; equality becomes \\\"components match one-by-one\\\". " +
        "This is why component form is so powerful — every operation reduces to elementary arithmetic on three numbers.",
      definition:
        "The **standard basis** of 3-D space is \\(\\hat{i} = (1, 0, 0)\\), \\(\\hat{j} = (0, 1, 0)\\), \\(\\hat{k} = (0, 0, 1)\\) — unit-length, mutually perpendicular, along the positive \\(x, y, z\\) axes. " +
        "Any vector has a unique decomposition \\(\\vec{v} = v_1\\hat{i} + v_2\\hat{j} + v_3\\hat{k}\\); the triple \\((v_1, v_2, v_3)\\) is its **component form**. " +
        "For 2-D vectors just drop the \\(\\hat{k}\\) term. " +
        "Componentwise rules: " +
        "(equality) \\(\\vec{a} = \\vec{b}\\) iff \\(a_i = b_i\\) for every \\(i\\); " +
        "(addition) \\(\\vec{a} + \\vec{b} = (a_1+b_1)\\hat{i} + (a_2+b_2)\\hat{j} + (a_3+b_3)\\hat{k}\\); " +
        "(scalar mult) \\(k\\vec{a} = (ka_1)\\hat{i} + (ka_2)\\hat{j} + (ka_3)\\hat{k}\\).",
      formula: {
        label: "Component form",
        latex:
          "\\vec{v} = v_1\\hat{i} + v_2\\hat{j} + v_3\\hat{k} \\qquad \\vec{a} + \\vec{b} = (a_1+b_1)\\hat{i} + (a_2+b_2)\\hat{j} + (a_3+b_3)\\hat{k}",
        symbols: [
          { symbol: "\\(\\hat{i}, \\hat{j}, \\hat{k}\\)", meaning: "standard basis — unit vectors along positive \\(x, y, z\\) axes" },
          { symbol: "\\(v_1, v_2, v_3\\)", meaning: "components of \\(\\vec{v}\\) — uniquely determined by the basis choice" },
        ],
      },
      authoredExample: {
        prompt:
          "Given \\(\\vec{a} = 2\\hat{i} - \\hat{j} + 3\\hat{k}\\) and \\(\\vec{b} = -\\hat{i} + 4\\hat{j} + 2\\hat{k}\\), compute \\(3\\vec{a} - 2\\vec{b}\\) in component form.",
        steps: [
          "Apply scalar multiplication componentwise: \\(3\\vec{a} = 6\\hat{i} - 3\\hat{j} + 9\\hat{k}\\) and \\(2\\vec{b} = -2\\hat{i} + 8\\hat{j} + 4\\hat{k}\\).",
          "Subtract componentwise: \\(3\\vec{a} - 2\\vec{b} = (6 - (-2))\\hat{i} + (-3 - 8)\\hat{j} + (9 - 4)\\hat{k}\\).",
          "Simplify: \\(8\\hat{i} - 11\\hat{j} + 5\\hat{k}\\).",
        ],
        answer: "\\(3\\vec{a} - 2\\vec{b} = 8\\hat{i} - 11\\hat{j} + 5\\hat{k}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\vec{a} = \\hat{i} + 2\\hat{j} + 3\\hat{k}\\), \\(\\vec{b} = 2\\hat{i} - \\hat{j} + \\hat{k}\\). Find \\(\\vec{a} + \\vec{b}\\).", answer: "\\(3\\hat{i} + \\hat{j} + 4\\hat{k}\\)" },
        { prompt: "Find \\(2\\vec{a}\\) for \\(\\vec{a} = \\hat{i} - \\hat{j} + 2\\hat{k}\\).", answer: "\\(2\\hat{i} - 2\\hat{j} + 4\\hat{k}\\)" },
        { prompt: "If \\(x\\hat{i} + 3\\hat{j} = 5\\hat{i} + y\\hat{j}\\), find \\(x\\) and \\(y\\).", answer: "\\(x = 5,\\ y = 3\\)", method: "components match one-by-one" },
        { prompt: "Find \\(\\vec{a} - \\vec{b}\\) for \\(\\vec{a} = 3\\hat{i} + \\hat{k}\\), \\(\\vec{b} = \\hat{i} + \\hat{j} + \\hat{k}\\).", answer: "\\(2\\hat{i} - \\hat{j}\\)" },
      ],
      traps: [
        {
          title: "Equality of vectors = ALL components match — that's 3 equations, not 1",
          body:
            "A statement \\\"\\(\\vec{a} = \\vec{b}\\)\\\" with unknowns hidden in the components is implicitly giving you a SYSTEM of equations (one per component). " +
            "PYQs use this often: given \\(\\vec{a} = \\vec{b}\\) and unknowns \\(x, y, z\\) in the components, equate \\(a_1 = b_1\\), \\(a_2 = b_2\\), \\(a_3 = b_3\\) and solve.",
        },
        {
          title: "Components depend on the basis; the vector itself does not",
          body:
            "Rotate the coordinate axes and the components \\((v_1, v_2, v_3)\\) change, but the underlying vector (the arrow in space) is the same. " +
            "All NDA questions stick with the standard \\(\\hat{i}, \\hat{j}, \\hat{k}\\) basis, so this is rarely an issue in practice — but it explains why some identities are \\\"basis-free\\\" (magnitudes, dot products, angles).",
        },
      ],
    },

    // 6 ───────────────────────────────────────────────────────────────────────
    {
      slug: "types-of-vectors",
      name: "Types of vectors (zero, unit, equal, parallel, collinear, coplanar)",
      intuition:
        "Before going further, give names to the special kinds of vectors you'll keep meeting. " +
        "The **zero vector** has no length and no defined direction. " +
        "A **unit vector** has length exactly 1. " +
        "Two vectors are **parallel** if their directions agree or are exactly opposite. " +
        "Three or more vectors are **coplanar** if you can draw them all in one flat plane. " +
        "These names are not optional vocabulary — every PYQ uses them as shorthand for an entire concept.",
      definition:
        "- **Zero vector** \\(\\vec{0}\\) — magnitude 0, direction undefined. Acts as the additive identity.\n" +
        "- **Unit vector** \\(\\hat{u}\\) — magnitude exactly 1. Any non-zero \\(\\vec{v}\\) has a unique unit vector along it: \\(\\hat{v} = \\vec{v}/|\\vec{v}|\\).\n" +
        "- **Equal vectors** — same magnitude AND direction; position on the page is irrelevant.\n" +
        "- **Negative of \\(\\vec{v}\\)** — same magnitude, opposite direction, written \\(-\\vec{v}\\).\n" +
        "- **Parallel vectors** \\(\\vec{a} \\parallel \\vec{b}\\) — same OR opposite direction; equivalently, one is a non-zero scalar multiple of the other: \\(\\vec{a} = k\\vec{b}\\) for some \\(k \\neq 0\\).\n" +
        "- **Collinear points** — three or more points lying on one straight line (a stronger condition than just having parallel direction vectors).\n" +
        "- **Coplanar vectors / points** — all lying in one flat plane.\n" +
        "- **Free vs localized vector** — a free vector cares only about magnitude and direction; a localized vector additionally has a fixed application point (e.g. a force at a specific point on a body). Most NDA questions treat vectors as free.",
      formula: {
        label: "Unit vector and parallelism",
        latex:
          "\\hat{v} = \\dfrac{\\vec{v}}{|\\vec{v}|} \\qquad \\vec{a} \\parallel \\vec{b} \\iff \\vec{a} = k\\vec{b} \\text{ for some } k \\neq 0",
        symbols: [
          { symbol: "\\(\\hat{v}\\)", meaning: "unit vector along \\(\\vec{v}\\) — pure direction, magnitude 1" },
          { symbol: "\\(k\\)", meaning: "non-zero scalar; sign of \\(k\\) tells whether the parallel vectors agree or oppose" },
        ],
      },
      authoredExample: {
        prompt:
          "Let \\(\\vec{a} = 2\\hat{i} - \\hat{j}\\) and \\(\\vec{b} = -6\\hat{i} + 3\\hat{j}\\). (i) Are \\(\\vec{a}, \\vec{b}\\) parallel? (ii) Is either a unit vector? (iii) Find the unit vector along \\(\\vec{a}\\).",
        steps: [
          "(i) Test parallelism by looking for a scalar \\(k\\) with \\(\\vec{b} = k\\vec{a}\\). Component 1: \\(-6 = 2k \\Rightarrow k = -3\\). Component 2: \\(3 = -1 \\cdot k = -k\\), so \\(k = -3\\). Both give the same \\(k\\); the vectors are parallel (specifically anti-parallel, since \\(k < 0\\)).",
          "(ii) Magnitudes: \\(|\\vec{a}| = \\sqrt{4 + 1} = \\sqrt{5} \\neq 1\\); \\(|\\vec{b}| = \\sqrt{36 + 9} = \\sqrt{45} \\neq 1\\). Neither is a unit vector.",
          "(iii) Divide \\(\\vec{a}\\) by its magnitude: \\(\\hat{a} = \\vec{a}/|\\vec{a}| = (2\\hat{i} - \\hat{j})/\\sqrt{5}\\). Quick check: \\(|\\hat{a}|^2 = (4 + 1)/5 = 1\\). \\(\\checkmark\\)",
        ],
        answer: "(i) Parallel (anti-parallel, \\(\\vec{b} = -3\\vec{a}\\)). (ii) Neither is a unit vector. (iii) \\(\\hat{a} = (2\\hat{i} - \\hat{j})/\\sqrt{5}\\).",
      },
      practiceSet: [
        { prompt: "Find the unit vector along \\(\\vec{v} = 3\\hat{i} + 4\\hat{j}\\).", answer: "\\(\\tfrac{1}{5}(3\\hat{i} + 4\\hat{j})\\)", method: "\\(\\vec{v}/|\\vec{v}|\\)" },
        { prompt: "Are \\(\\vec{a} = \\hat{i} - 2\\hat{j}\\) and \\(\\vec{b} = -2\\hat{i} + 4\\hat{j}\\) parallel?", answer: "Yes", method: "\\(\\vec{b} = -2\\vec{a}\\)" },
        { prompt: "Is \\(\\vec{v} = \\tfrac{1}{\\sqrt{2}}(\\hat{i} + \\hat{j})\\) a unit vector?", answer: "Yes", method: "\\(|\\vec{v}| = 1\\)" },
        { prompt: "What is the magnitude of the zero vector \\(\\vec{0}\\)?", answer: "\\(0\\)" },
      ],
      traps: [
        {
          title: "Parallel VECTORS vs collinear POINTS — different conditions",
          body:
            "Two vectors are parallel when they share a DIRECTION (regardless of where they start). " +
            "Three or more points are collinear when they all lie on one LINE — a stricter condition that requires them to share a line, not just share a direction. " +
            "Points \\(A, B, C\\) are collinear iff \\(\\vec{AB} \\parallel \\vec{AC}\\) (the next concept turns this into a usable test).",
        },
        {
          title: "Zero vector is parallel to everything and to nothing",
          body:
            "Because \\(\\vec{0} = 0 \\cdot \\vec{v}\\) for any \\(\\vec{v}\\), the zero vector technically satisfies the scalar-multiple definition for every direction. " +
            "PYQs sidestep the ambiguity by implicitly assuming non-zero vectors when talking about parallelism — read the question carefully if the hypothesis is loose.",
        },
      ],
    },

    // 7 ───────────────────────────────────────────────────────────────────────
    // Application 1: collinearity test — built on Concept 6 (parallel vectors)
    // and Concept 2 (position vectors).
    {
      slug: "collinearity-and-vector-relations-in-figures",
      name: "Collinearity of three points (and vector relations in regular figures)",
      intuition:
        "Three points are collinear when the line through two of them passes through the third. " +
        "In vector language that means one displacement vector is a scalar multiple of another, " +
        "or equivalently any third point on the line is a weighted average of the first two where " +
        "the weights add to one. The same coefficient-sum-to-one identity hides in many disguises — " +
        "including the famous \\((\\vec{a}\\times\\vec{b})+(\\vec{b}\\times\\vec{c})+(\\vec{c}\\times\\vec{a})=\\vec{0}\\) " +
        "test. Regular polygons obey similar fixed identities — every diagonal and side can be " +
        "expressed as a known scalar multiple of any other.",
      definition:
        "Points \\(A, B, C\\) with position vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) are collinear " +
        "if and only if there exist scalars \\(\\alpha, \\beta, \\gamma\\) (not all zero) with " +
        "\\(\\alpha + \\beta + \\gamma = 0\\) and \\(\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0}\\). " +
        "Equivalently \\(\\vec{c} = \\lambda\\vec{a} + \\mu\\vec{b}\\) with \\(\\lambda + \\mu = 1\\).",
      formula: {
        label: "Collinearity test",
        latex:
          "\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0} \\;\\text{ with }\\; \\alpha + \\beta + \\gamma = 0",
        symbols: [
          { symbol: "\\(\\vec{a},\\vec{b},\\vec{c}\\)", meaning: "position vectors of the three points" },
          { symbol: "\\(\\alpha,\\beta,\\gamma\\)", meaning: "scalars; both the linear-combo and the sum vanish" },
        ],
      },
      authoredExample: {
        prompt:
          "Three points have position vectors \\(\\vec{a}, \\vec{b}, \\vec{c}\\) with " +
          "\\(2\\vec{a} - 3\\vec{b} + \\vec{c} = \\vec{0}\\). Show they are collinear and find the ratio in which \\(B\\) divides \\(AC\\).",
        steps: [
          "The coefficients are \\(2, -3, 1\\). Check their sum: \\(2 + (-3) + 1 = 0\\). Since both the linear combination and the coefficient sum vanish, the three points are collinear.",
          "Rewrite to isolate \\(\\vec{b}\\): \\(3\\vec{b} = 2\\vec{a} + \\vec{c}\\), so \\(\\vec{b} = \\dfrac{2\\vec{a} + \\vec{c}}{3}\\).",
          "Compare with the internal section formula \\(\\vec{b} = \\dfrac{m\\vec{c} + n\\vec{a}}{m + n}\\). Matching gives \\(m = 1\\), \\(n = 2\\), so \\(B\\) divides \\(AC\\) internally in the ratio \\(AB : BC = m : n = 1 : 2\\).",
        ],
        answer: "Collinear; \\(B\\) divides \\(AC\\) internally in the ratio \\(1 : 2\\).",
      },
      selfCheckExample: {
        prompt:
          "Position vectors satisfy \\(\\vec{a} + 3\\vec{b} - 4\\vec{c} = \\vec{0}\\). Show the points are collinear and find the ratio in which \\(C\\) divides \\(AB\\).",
        steps: [
          "Coefficient sum: \\(1 + 3 + (-4) = 0\\) — collinear.",
          "Isolate \\(\\vec{c}\\): \\(4\\vec{c} = \\vec{a} + 3\\vec{b}\\), so \\(\\vec{c} = \\dfrac{3\\vec{b} + \\vec{a}}{4}\\).",
          "Compare with \\(\\vec{c} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\): \\(m = 3,\\ n = 1\\), so \\(AC : CB = 3 : 1\\).",
        ],
        answer: "Collinear; \\(C\\) divides \\(AB\\) internally in ratio \\(3 : 1\\).",
      },
      practiceSet: [
        { prompt: "Coefficients in \\(\\alpha\\vec{a} + \\beta\\vec{b} + \\gamma\\vec{c} = \\vec{0}\\) are \\(1, -3, 2\\). Collinear?", answer: "Yes", method: "coefficients sum to \\(0\\)" },
        { prompt: "Coefficients \\(2, 1, 1\\). Collinear?", answer: "No", method: "sum \\(= 4 \\neq 0\\)" },
        { prompt: "If \\(\\vec{c} = \\tfrac{1}{2}\\vec{a} + \\tfrac{1}{2}\\vec{b}\\), are \\(A, B, C\\) collinear?", answer: "Yes", method: "the two coefficients sum to \\(1\\)" },
        { prompt: "Three points are collinear when one displacement is a ___ of another.", answer: "scalar multiple" },
      ],
      pyqExampleId: "bf814f0f-d9fe-405d-92de-cc89ec533d10",
      traps: [
        {
          title: "Coefficient sum must be zero — don't skip the check",
          body:
            "If the scalars in \\(\\alpha\\vec{a}+\\beta\\vec{b}+\\gamma\\vec{c}=\\vec{0}\\) do NOT sum to zero, " +
            "the three points are coplanar with the origin (i.e. \\(\\vec{a},\\vec{b},\\vec{c}\\) are linearly dependent) " +
            "but generally NOT collinear. The sum-to-zero condition is what forces them onto one line.",
        },
        {
          title: "\\((\\vec{a}\\times\\vec{b})+(\\vec{b}\\times\\vec{c})+(\\vec{c}\\times\\vec{a})=\\vec{0}\\) means collinear, not coplanar",
          body:
            "A common HARD-paper trap: this cross-product identity vanishes precisely when the three points are collinear. " +
            "If a question gives \\(\\vec{c} = \\cos^2\\theta\\,\\vec{a} + \\sin^2\\theta\\,\\vec{b}\\) the coefficients sum to " +
            "\\(\\cos^2\\theta + \\sin^2\\theta = 1\\), so \\(C\\) lies on line \\(AB\\) and the cross-product sum is forced to zero.",
        },
      ],
    },

    // 8 ───────────────────────────────────────────────────────────────────────
    // Application 2: section formula — the foundational geometric payoff.
    {
      slug: "section-formula-internal-external",
      name: "Section Formula — Internal and External Division",
      visualizationSlug: "section-formula",
      intuition:
        "A point that divides a segment \\(AB\\) in a ratio \\(m : n\\) is a weighted average of the endpoints. " +
        "When the dividing point lies between \\(A\\) and \\(B\\), the division is internal and the weights add normally. " +
        "When it lies on the extension outside, the division is external and one weight gets a negative sign — that single sign-flip is the most-tested trap in this subtopic.",
      definition:
        "If \\(P\\) divides \\(AB\\) internally in ratio \\(m : n\\), then " +
        "\\(\\vec{p} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n}\\). If \\(P\\) divides externally in ratio \\(m : n\\), then " +
        "\\(\\vec{p} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n}\\). Midpoint is the special case \\(m = n\\): " +
        "\\(\\vec{p} = (\\vec{a} + \\vec{b})/2\\).",
      formula: {
        label: "Section formula (internal / external)",
        latex:
          "\\vec{p}_{\\text{int}} = \\dfrac{m\\vec{b} + n\\vec{a}}{m + n} \\qquad \\vec{p}_{\\text{ext}} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n}",
        symbols: [
          { symbol: "\\(\\vec{a}, \\vec{b}\\)", meaning: "position vectors of the endpoints \\(A, B\\)" },
          { symbol: "\\(m : n\\)", meaning: "ratio in which \\(P\\) divides \\(AB\\)" },
          { symbol: "\\(\\vec{p}\\)", meaning: "position vector of the dividing point" },
        ],
      },
      authoredExample: {
        prompt:
          "Points \\(A\\) and \\(B\\) have position vectors \\(\\vec{a} = 2\\hat{i} + \\hat{j}\\) and \\(\\vec{b} = 4\\hat{i} + 5\\hat{j}\\). " +
          "Find the position vector of the point \\(P\\) that divides \\(AB\\) externally in the ratio \\(3 : 1\\).",
        steps: [
          "Identify the ratio: \\(m = 3\\) (towards \\(B\\)), \\(n = 1\\) (towards \\(A\\)). External division so use the minus-sign formula.",
          "Apply \\(\\vec{p} = \\dfrac{m\\vec{b} - n\\vec{a}}{m - n} = \\dfrac{3(4\\hat{i}+5\\hat{j}) - 1(2\\hat{i}+\\hat{j})}{3 - 1}\\).",
          "Numerator: \\(12\\hat{i} + 15\\hat{j} - 2\\hat{i} - \\hat{j} = 10\\hat{i} + 14\\hat{j}\\). Denominator: \\(2\\).",
          "Divide: \\(\\vec{p} = 5\\hat{i} + 7\\hat{j}\\).",
        ],
        answer: "\\(\\vec{p} = 5\\hat{i} + 7\\hat{j}\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the midpoint of the segment joining \\(A(3\\hat{i} - \\hat{j})\\) and \\(B(5\\hat{i} + 3\\hat{j})\\).",
        steps: [
          "Midpoint is the \\(m = n\\) special case: \\(\\vec{p} = \\dfrac{\\vec{a} + \\vec{b}}{2}\\).",
          "\\(\\vec{p} = \\dfrac{(3+5)\\hat{i} + (-1+3)\\hat{j}}{2} = \\dfrac{8\\hat{i} + 2\\hat{j}}{2} = 4\\hat{i} + \\hat{j}\\).",
        ],
        answer: "\\(\\vec{p} = 4\\hat{i} + \\hat{j}\\)",
      },
      practiceSet: [
        { prompt: "Midpoint of \\(A(2\\hat{i})\\) and \\(B(4\\hat{i})\\)?", answer: "\\(3\\hat{i}\\)", method: "\\((\\vec{a} + \\vec{b})/2\\)" },
        { prompt: "\\(P\\) divides \\(A(\\vec{0})\\), \\(B(6\\hat{i})\\) internally \\(1:2\\). Find \\(\\vec{p}\\).", answer: "\\(2\\hat{i}\\)", method: "\\(\\tfrac{1\\cdot 6\\hat{i} + 2\\cdot \\vec{0}}{3}\\)" },
        { prompt: "Internal-division denominator for ratio \\(m:n\\)?", answer: "\\(m + n\\)" },
        { prompt: "External-division denominator for ratio \\(m:n\\)?", answer: "\\(m - n\\)" },
      ],
      pyqExampleId: "5cc5d47f-69ab-4105-ad1b-a547313abb07",
      traps: [
        {
          title: "External division: denominator is \\(m - n\\), not \\(m + n\\)",
          body:
            "The most common bug. The external-section formula reverses one sign in the numerator AND swaps the denominator's plus for a minus. " +
            "If \\(m = n\\), external division is undefined (the point is at infinity) — another way to spot you've mis-set up an internal problem as external.",
        },
        {
          title: "Watch the ratio order — \\(m : n\\) means \\(AP : PB\\), not \\(AP : AB\\)",
          body:
            "PYQs often phrase it as \\\"divides \\(AB\\) in ratio \\(2 : 3\\)\\\" — that is \\(AP : PB = 2 : 3\\), so \\(m = 2\\) (the part nearer \\(B\\)) and \\(n = 3\\) (the part nearer \\(A\\)). Reversing them gives the wrong answer.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Magnitude, components, projection, direction cosines",
      href: "/notes/nda-maths/vectors/magnitude-components-projection",
    },
    {
      label: "Dot product and angle",
      href: "/notes/nda-maths/vectors/dot-product-angle",
    },
  ],
};
