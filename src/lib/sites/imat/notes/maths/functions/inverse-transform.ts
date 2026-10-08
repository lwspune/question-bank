import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_MAT_FUN_INVERSE_TRANSFORM_NOTE: SubtopicNote = {
  subtopicName: "Inverses and Transformations",
  title: "Inverse Functions and Transforming Graphs",
  oneLineDefinition:
    "An inverse function undoes a function and swaps its domain and range; shifts, stretches and reflections move a known graph without changing its basic shape.",
  whyItMatters:
    "The 2023 paper asked for the inverse of a logarithmic function together with the set of values on which that inverse is defined. Transformations have not been asked yet, but they are on the syllabus and let you sketch any of the standard graphs after a shift or stretch.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-fun-inverse",
      name: "Inverse functions: undoing a function",
      intuition:
        "If \\(f\\) turns 4 into 9, the inverse turns 9 back into 4. To find it, write \\(y = f(x)\\) and solve for \\(x\\): you get the input from the output. Inputs and outputs swap roles, so the domain of the inverse is the range of the original.",
      definition:
        "The **inverse** \\(f^{-1}\\) of a function \\(f\\) satisfies \\(f^{-1}(f(x)) = x\\) and \\(f(f^{-1}(y)) = y\\).\n" +
        "- It exists only when \\(f\\) is **one-to-one**: no two inputs give the same output (so \\(x^2\\) on all real numbers has no inverse, but on \\(x \\ge 0\\) it does).\n" +
        "- **Method**: write \\(y = f(x)\\), solve for \\(x\\) in terms of \\(y\\). That expression is \\(f^{-1}(y)\\).\n" +
        "- The **domain of** \\(f^{-1}\\) is the **range of** \\(f\\), and the other way round.\n" +
        "- The graph of \\(f^{-1}\\) is the reflection of the graph of \\(f\\) in the line \\(y = x\\).\n" +
        "- \\(e^x\\) and \\(\\ln x\\) are inverses: \\(\\ln(e^x) = x\\) and \\(e^{\\ln x} = x\\) for \\(x > 0\\).",
      formula: {
        label: "Inverse function",
        latex: "y = f(x) \\quad\\Rightarrow\\quad x = f^{-1}(y)",
      },
      authoredExample: {
        prompt: "Let \\(f(x) = 3\\ln x + 2\\) for \\(x > 0\\). Find \\(f^{-1}\\) and state where it is defined.",
        steps: [
          "Write \\(y = 3\\ln x + 2\\), so \\(\\ln x = \\dfrac{y - 2}{3}\\).",
          "Undo the logarithm: \\(x = e^{(y - 2)/3}\\). So \\(f^{-1}(y) = e^{(y - 2)/3}\\).",
          "The range of \\(f\\) is all real numbers (a logarithm takes every real value), so \\(f^{-1}\\) is defined for every real \\(y\\).",
          "Check: \\(f(e) = 3 + 2 = 5\\) and \\(f^{-1}(5) = e^{1} = e\\).",
        ],
        answer: "\\(f^{-1}(y) = e^{(y - 2)/3}\\), for all real \\(y\\)",
      },
      selfCheckExample: {
        prompt: "Let \\(f(x) = 4 + e^{2x}\\), defined for every real \\(x\\). Which is its inverse function?",
        options: [
          "\\(f^{-1}(y) = 2\\ln(y - 4),\\ y > 4\\)",
          "\\(f^{-1}(y) = \\tfrac{1}{2}\\ln(y - 4),\\ y > 0\\)",
          "\\(f^{-1}(y) = \\tfrac{1}{2}\\ln y - 4,\\ y > 0\\)",
          "\\(f^{-1}(y) = \\tfrac{1}{2}\\ln(y - 4),\\ y > 4\\)",
          "\\(f^{-1}(y) = \\tfrac{1}{2}e^{y - 4},\\ y > 4\\)",
        ],
        steps: [
          "\\(y = 4 + e^{2x}\\) gives \\(e^{2x} = y - 4\\), so \\(2x = \\ln(y - 4)\\) and \\(x = \\tfrac{1}{2}\\ln(y - 4)\\).",
          "\\(e^{2x} > 0\\), so the range of \\(f\\) is \\(y > 4\\); that is the domain of the inverse.",
          "B has the right formula but the wrong domain: for \\(0 < y \\le 4\\), \\(\\ln(y - 4)\\) does not exist. A multiplies by 2 instead of dividing; C subtracts 4 after the logarithm instead of before.",
        ],
        answer: "(D) \\(\\tfrac{1}{2}\\ln(y - 4),\\ y > 4\\)",
      },
      practiceSet: [
        { prompt: "Find the inverse of \\(f(x) = 5x - 2\\).", answer: "\\(f^{-1}(x) = \\dfrac{x + 2}{5}\\)" },
        { prompt: "Find the inverse of \\(f(x) = x^3\\).", answer: "\\(f^{-1}(x) = \\sqrt[3]{x}\\)" },
        { prompt: "What is the inverse of \\(f(x) = 10^x\\)?", answer: "\\(f^{-1}(x) = \\log_{10} x\\), for \\(x > 0\\)" },
        { prompt: "If \\(f(4) = 9\\), what is \\(f^{-1}(9)\\)?", answer: "4" },
      ],
      traps: [
        {
          title: "The inverse function is not the reciprocal",
          body: "\\(f^{-1}(x)\\) means the function that undoes \\(f\\); \\(\\dfrac{1}{f(x)}\\) is the reciprocal, a different thing. For \\(f(x) = 2x\\), \\(f^{-1}(x) = x/2\\) but \\(1/f(x) = 1/(2x)\\).",
        },
        {
          title: "Give the inverse with its domain",
          body: "An option can have the right formula and the wrong domain. The domain of \\(f^{-1}\\) is the range of \\(f\\): work out which outputs \\(f\\) really produces before choosing.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-fun-transformations",
      name: "Transformations of graphs: shifts, stretches and reflections",
      intuition:
        "Changes outside the function act on the output, so they move the graph up or down or stretch it vertically, exactly as written. Changes inside the bracket act on the input, so they work backwards: \\(f(x - 3)\\) reaches each value 3 units later, which moves the graph right, not left.",
      definition:
        "Starting from the graph of \\(y = f(x)\\):\n" +
        "- \\(y = f(x) + k\\): **shift up** by \\(k\\) (down if \\(k < 0\\)).\n" +
        "- \\(y = f(x - h)\\): **shift right** by \\(h\\) (left if \\(h < 0\\)).\n" +
        "- \\(y = a f(x)\\): **vertical stretch** by factor \\(a\\).\n" +
        "- \\(y = f(bx)\\): **horizontal stretch** by factor \\(1/b\\) (squeezed towards the y-axis if \\(b > 1\\)).\n" +
        "- \\(y = -f(x)\\): **reflection in the x-axis**; \\(y = f(-x)\\): **reflection in the y-axis**.\n" +
        "- Shifts move asymptotes and key points with them, so they change domains and ranges.",
      formula: {
        label: "Stretch, then shift",
        latex: "y = a\\, f(x - h) + k",
        symbols: [
          { symbol: "\\(a\\)", meaning: "vertical stretch factor (a reflection in the x-axis if negative)" },
          { symbol: "\\(h\\)", meaning: "shift to the right" },
          { symbol: "\\(k\\)", meaning: "shift upwards" },
        ],
      },
      authoredExample: {
        prompt:
          "Describe how to obtain \\(y = 2(x - 3)^2 + 1\\) from \\(y = x^2\\) and give its vertex. Then find the domain of \\(y = \\ln(x + 2)\\) and where it crosses the x-axis.",
        steps: [
          "\\(x^2\\) has its vertex at \\((0, 0)\\). Stretching vertically by 2 keeps the vertex there.",
          "\\(x - 3\\) inside shifts the graph 3 right; \\(+1\\) outside shifts it 1 up. The vertex moves to \\((3, 1)\\).",
          "\\(\\ln(x + 2)\\) is \\(\\ln x\\) shifted 2 units left, so its asymptote moves to \\(x = -2\\) and the domain is \\(x > -2\\).",
          "It crosses the x-axis where \\(x + 2 = 1\\), so at \\((-1, 0)\\).",
        ],
        answer: "Vertex \\((3, 1)\\); domain \\(x > -2\\), crossing at \\((-1, 0)\\)",
      },
      selfCheckExample: {
        prompt: "The graph of \\(y = 2^x\\) is moved 3 units down. Which statement about the new graph is true?",
        options: [
          "It passes through \\((0, -3)\\) and its range is \\(y > -3\\)",
          "It passes through \\((0, -2)\\) and its range is \\(y > -3\\)",
          "It passes through \\((3, 1)\\) and its range is \\(y > 0\\)",
          "It passes through \\((0, -2)\\) and its range is \\(y > 0\\)",
          "It passes through \\((0, 4)\\) and its range is \\(y > 3\\)",
        ],
        steps: [
          "The new graph is \\(y = 2^x - 3\\). At \\(x = 0\\): \\(1 - 3 = -2\\).",
          "\\(2^x > 0\\), so \\(2^x - 3 > -3\\): the asymptote moves down to \\(y = -3\\).",
          "A forgets that \\(2^0 = 1\\); C shifts right instead of down; D moves the point but not the range; E shifts up.",
        ],
        answer: "(B) Through \\((0, -2)\\), range \\(y > -3\\)",
      },
      practiceSet: [
        { prompt: "Give the vertex of \\(y = (x + 4)^2\\).", answer: "\\((-4, 0)\\)", method: "\\(x + 4 = x - (-4)\\): shift 4 left" },
        { prompt: "How is \\(y = -x^2\\) related to \\(y = x^2\\)?", answer: "Reflected in the x-axis: it opens downwards" },
        { prompt: "How do you get \\(y = f(x) - 5\\) from \\(y = f(x)\\)?", answer: "Shift down by 5" },
        { prompt: "Where does the graph of \\(y = \\sqrt{x - 1}\\) start?", answer: "At \\((1, 0)\\)", method: "\\(\\sqrt{x}\\) shifted 1 right" },
      ],
      traps: [
        {
          title: "f(x minus 3) moves the graph right, not left",
          body: "A change inside the bracket works against its sign: \\(f(x - 3)\\) is the graph moved 3 units right, \\(f(x + 3)\\) is it moved 3 units left. Outside the bracket the sign means what it says: \\(f(x) - 3\\) is 3 units down.",
        },
      ],
    },
  ],
};
