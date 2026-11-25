import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_DT_AREA_NOTE: SubtopicNote = {
  subtopicName: "Area of a Triangle",
  title: "Area of a Triangle",
  oneLineDefinition:
    "The area of a triangle with vertices (x₁, y₁), (x₂, y₂), (x₃, y₃) is half the absolute value of the determinant with rows x, y, 1; it is zero exactly when the three points are collinear.",
  whyItMatters:
    "17 questions, six of them from board papers. In 2023 the board asked which statement links the determinant to the area (the determinant is ±2 times the area), the value of k when the area is 35 square units, the square of a transposed area determinant, and the area of a triangle together with the equation of one side by determinants. In 2026 it asked for the two values of k that give an area of 5 square units and for the value that makes three points collinear. The textbook adds Exercise 4.2 and Examples 6 and 7.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmdt-area-formula",
      name: "Area from the determinant of the vertices",
      intuition:
        "The old formula \\(\\dfrac{1}{2}[x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)]\\) is exactly the expansion of a 3 by 3 determinant whose rows are \\(x\\), \\(y\\) and 1 for each vertex. The determinant may come out negative, depending on the order in which you list the vertices, so the area is half of its absolute value.",
      definition:
        "- Area \\(\\Delta = \\dfrac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right|\\).\n" +
        "- Area is positive, so always take the absolute value of the determinant.\n" +
        "- **If the area is given**, use both the positive and the negative value of the determinant. This gives two values of the unknown, and both are answers.\n" +
        "- Without the modulus, the determinant equals \\(\\pm 2\\Delta\\); its square is \\(4\\Delta^2\\).\n" +
        "- Write the answer in square units.",
      formula: {
        label: "Area of a triangle",
        latex: "\\Delta = \\dfrac{1}{2}\\left|\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix}\\right|",
        symbols: [
          { symbol: "\\((x_1, y_1), (x_2, y_2), (x_3, y_3)\\)", meaning: "the three vertices" },
        ],
      },
      authoredExample: {
        prompt: "Using determinants, find the area of the triangle with vertices \\((1, 2)\\), \\((4, -1)\\) and \\((-2, 3)\\).",
        steps: [
          "\\(\\Delta = \\dfrac{1}{2}\\left|\\begin{vmatrix} 1 & 2 & 1 \\\\ 4 & -1 & 1 \\\\ -2 & 3 & 1 \\end{vmatrix}\\right|\\).",
          "Expand along \\(R_1\\): \\(1(-1 - 3) - 2(4 + 2) + 1(12 - 2)\\).",
          "\\(= -4 - 12 + 10 = -6\\).",
          "\\(\\Delta = \\dfrac{1}{2}|-6| = 3\\).",
          "The area is 3 square units.",
        ],
        answer: "3 square units",
      },
      selfCheckExample: {
        prompt: "Find the values of \\(k\\) if the area of the triangle with vertices \\((1, -1)\\), \\((4, 2)\\) and \\((k, 3)\\) is 6 square units.",
        steps: [
          "\\(\\begin{vmatrix} 1 & -1 & 1 \\\\ 4 & 2 & 1 \\\\ k & 3 & 1 \\end{vmatrix} = 1(2 - 3) + 1(4 - k) + 1(12 - 2k) = 15 - 3k\\).",
          "\\(\\dfrac{1}{2}|15 - 3k| = 6\\), so \\(15 - 3k = 12\\) or \\(15 - 3k = -12\\).",
          "\\(\\therefore k = 1\\) or \\(k = 9\\).",
        ],
        answer: "\\(k = 1\\) or \\(k = 9\\)",
      },
      practiceSet: [
        { prompt: "Find the area of the triangle with vertices \\((0, 0)\\), \\((6, 0)\\) and \\((4, 5)\\).", answer: "15 square units" },
        { prompt: "Find the area of the triangle with vertices \\((-1, 2)\\), \\((3, 4)\\) and \\((1, -2)\\).", answer: "10 square units", method: "The determinant is \\(-20\\)." },
        { prompt: "The determinant formed from the vertices of a triangle is \\(-18\\). Find the area.", answer: "9 square units" },
      ],
      pyqExampleId: "5f577fd2-e1cd-4c81-89fc-fe1f45766dbc",
      traps: [
        {
          title: "Forgetting the half",
          body: "The determinant is twice the area. Writing the area as \\(|-6| = 6\\) in place of \\(\\dfrac{1}{2}|-6| = 3\\) loses the answer mark.",
        },
        {
          title: "Keeping one value of k",
          body: "When the area is given, set the determinant equal to \\(+2\\Delta\\) and to \\(-2\\Delta\\). Using only the positive sign gives one of the two answers.",
        },
        {
          title: "A negative area",
          body: "An area of \\(-3\\) square units is never an answer. Take the absolute value of the determinant before you halve it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmdt-collinear",
      name: "Collinear points and the equation of a line",
      intuition:
        "Three points on one line make a triangle of zero area. So the area determinant is zero exactly when the points are collinear. Put a general point \\((x, y)\\) in the first row and two known points below it: setting the determinant to zero says \\((x, y)\\) lies on the line through them, which is the equation of that line.",
      definition:
        "- Points \\((x_1, y_1)\\), \\((x_2, y_2)\\), \\((x_3, y_3)\\) are collinear when \\(\\begin{vmatrix} x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\\\ x_3 & y_3 & 1 \\end{vmatrix} = 0\\).\n" +
        "- **Line through two points:** \\(\\begin{vmatrix} x & y & 1 \\\\ x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\end{vmatrix} = 0\\). Expand along \\(R_1\\) and simplify.\n" +
        "- Check the line by putting each given point into it.",
      formula: {
        label: "Equation of the line through two points",
        latex: "\\begin{vmatrix} x & y & 1 \\\\ x_1 & y_1 & 1 \\\\ x_2 & y_2 & 1 \\end{vmatrix} = 0",
      },
      authoredExample: {
        prompt: "Using determinants, find the equation of the line joining \\((2, 5)\\) and \\((-1, 2)\\).",
        steps: [
          "Let \\((x, y)\\) be any point on the line. The three points are collinear, so \\(\\begin{vmatrix} x & y & 1 \\\\ 2 & 5 & 1 \\\\ -1 & 2 & 1 \\end{vmatrix} = 0\\).",
          "Expand along \\(R_1\\): \\(x(5 - 2) - y(2 + 1) + 1(4 + 5) = 0\\).",
          "\\(3x - 3y + 9 = 0\\).",
          "Divide by 3: \\(x - y + 3 = 0\\).",
          "Check: \\(2 - 5 + 3 = 0\\) and \\(-1 - 2 + 3 = 0\\).",
        ],
        answer: "\\(x - y + 3 = 0\\)",
      },
      selfCheckExample: {
        prompt: "Show that the points \\((1, 4)\\), \\((3, -2)\\) and \\((-3, 16)\\) are collinear.",
        steps: [
          "\\(\\begin{vmatrix} 1 & 4 & 1 \\\\ 3 & -2 & 1 \\\\ -3 & 16 & 1 \\end{vmatrix} = 1(-2 - 16) - 4(3 + 3) + 1(48 - 6)\\).",
          "\\(= -18 - 24 + 42 = 0\\).",
          "The area of the triangle is zero, so the points are collinear.",
        ],
        answer: "The determinant is 0, so the points are collinear.",
      },
      practiceSet: [
        { prompt: "Find \\(k\\) if \\((2, k)\\), \\((1, 1)\\) and \\((5, 3)\\) are collinear.", answer: "\\(k = \\dfrac{3}{2}\\)", method: "The determinant is \\(4k - 6\\)." },
        { prompt: "Using determinants, find the equation of the line through \\((0, 3)\\) and \\((2, 7)\\).", answer: "\\(y = 2x + 3\\)", method: "\\(-4x + 2y - 6 = 0\\)" },
        { prompt: "Find the area of the triangle with vertices \\((1, 1)\\), \\((2, 2)\\) and \\((3, 3)\\).", answer: "0: the points lie on \\(y = x\\)." },
      ],
      pyqExampleId: "325bbaad-7526-4cdd-b6b2-1c9524480cf6",
      traps: [
        {
          title: "Leaving out the = 0",
          body: "The equation of the line is the determinant set equal to zero. A determinant written alone, with no \\(= 0\\), is not an equation.",
        },
        {
          title: "Halving to zero",
          body: "For collinear points you may drop the \\(\\dfrac{1}{2}\\): the determinant itself must be zero. Do not set the determinant equal to 2 or to any area.",
        },
      ],
    },
  ],
};
