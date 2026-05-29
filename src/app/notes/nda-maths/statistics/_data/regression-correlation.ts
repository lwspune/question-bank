import type { SubtopicNote } from "@/app/notes/_types";

export const REGRESSION_CORRELATION_NOTE: SubtopicNote = {
  subtopicName: "Regression and Correlation",
  title: "Regression and Correlation",
  oneLineDefinition:
    "How two variables move together — correlation measures the strength of the link, regression draws the best-fit line.",
  whyItMatters:
    "27 PYQs across 2017–2026, with 6 HARD — the highest hard-rate of any Statistics subtopic. " +
    "Almost every recent paper asks one of three shapes: properties of the correlation coefficient r under linear transformation, finding regression lines, identifying which equation is which, or computing the angle between them. " +
    "Five tight concepts cover the entire surface.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "correlation-coefficient-properties",
      name: "Correlation Coefficient and Its Properties",
      visualizationSlug: "correlation-scatter",
      intuition:
        "Correlation coefficient \\(r\\) is a single number between \\(-1\\) and \\(+1\\) that summarises how strongly two variables move together. " +
        "\\(r = +1\\) is perfect positive (one rises, the other rises by the same proportion); \\(r = -1\\) is perfect negative; \\(r = 0\\) means no linear relationship. " +
        "Crucially, \\(r\\) is unaffected by shifts (change of origin) and unaffected in magnitude by positive scale changes — but a negative scale flips its sign.",
      definition:
        "For paired observations, \\(r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y}\\), bounded by \\(-1 \\leq r \\leq 1\\). " +
        "If \\(U = aX + b\\) and \\(V = cY + d\\), then \\(r_{UV} = \\text{sign}(ac)\\,r_{XY}\\) — magnitude is preserved, sign flips when one of \\(a, c\\) is negative.",
      formula: {
        label: "Correlation Coefficient and Invariance Rule",
        latex:
          "r = \\dfrac{\\text{Cov}(X,Y)}{\\sigma_X\\,\\sigma_Y} \\qquad r_{(aX+b,\\,cY+d)} = \\text{sign}(ac)\\,r_{XY}",
        symbols: [
          { symbol: "\\(\\text{Cov}(X,Y)\\)", meaning: "covariance of X and Y" },
          { symbol: "\\(\\sigma_X,\\sigma_Y\\)", meaning: "standard deviations of X and Y" },
          { symbol: "\\(\\text{sign}(ac)\\)", meaning: "\\(+1\\) if \\(a, c\\) have same sign, \\(-1\\) otherwise" },
        ],
      },
      authoredExample: {
        prompt:
          "The correlation between \\(x\\) and \\(y\\) is \\(r = 0.6\\). Find the correlation between \\(U = 2x + 5\\) and \\(V = -3y + 1\\).",
        steps: [
          "Identify \\(a = 2,\\ c = -3\\). Shifts \\(b = 5,\\ d = 1\\) do not affect \\(r\\).",
          "Compute \\(\\text{sign}(ac) = \\text{sign}(2 \\times -3) = \\text{sign}(-6) = -1\\).",
          "Apply the rule: \\(r_{UV} = -1 \\times 0.6\\).",
          "Result: \\(r_{UV} = -0.6\\). Magnitude preserved, sign flipped.",
        ],
        answer: "\\(r_{UV} = -0.6\\)",
      },
      selfCheckExample: {
        prompt:
          "If \\(r\\) between \\(x\\) and \\(y\\) is \\(-0.4\\), find \\(r\\) between " +
          "\\(U = -x + 1\\) and \\(V = 2y - 5\\).",
        steps: [
          "Identify \\(a = -1,\\ c = 2\\). Shifts ignored.",
          "\\(\\text{sign}(ac) = \\text{sign}(-2) = -1\\).",
          "\\(r_{UV} = -1 \\times (-0.4) = +0.4\\).",
        ],
        answer: "\\(r_{UV} = +0.4\\)",
      },
      practiceSet: [
        { prompt: "\\(r\\) between \\(x, y\\) is \\(0.7\\). \\(r\\) between \\(2x\\) and \\(3y\\)?", answer: "\\(0.7\\)", method: "positive scales don't change \\(r\\)" },
        { prompt: "\\(r\\) is \\(0.5\\). \\(r\\) between \\(x\\) and \\(-y\\)?", answer: "\\(-0.5\\)", method: "negative scale flips the sign" },
        { prompt: "\\(r\\) is \\(-0.8\\). \\(r\\) between \\(x+5\\) and \\(y-2\\)?", answer: "\\(-0.8\\)", method: "shifts don't change \\(r\\)" },
        { prompt: "A computation gives \\(r = 1.4\\). Possible?", answer: "No", method: "\\(r\\) must lie in \\([-1, 1]\\)" },
      ],
      pyqExampleId: "8d536492-e15a-4d3f-b9ad-e6d295c95b19",
      traps: [
        {
          title: "\\(r\\) is bounded by \\(-1\\) and \\(+1\\) — always",
          body:
            "If a calculation gives \\(|r| > 1\\), the arithmetic is wrong. Use this as a sanity check at the end of any correlation computation.",
        },
        {
          title: "Shift does not change \\(r\\); only scale-with-negative-sign flips it",
          body:
            "Adding constants to either variable is invisible to \\(r\\). Multiplying by a positive constant is also invisible. " +
            "Only a negative multiplier flips the sign — and even then, the magnitude is preserved.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "lines-of-regression",
      name: "Lines of Regression",
      intuition:
        "For two variables there are TWO regression lines — \\(y\\) on \\(x\\) (used to predict \\(y\\) from \\(x\\)) and \\(x\\) on \\(y\\) (used to predict \\(x\\) from \\(y\\)). " +
        "Both lines always pass through the mean point \\((\\bar{x}, \\bar{y})\\). " +
        "If \\(r = \\pm 1\\) the two lines coincide; otherwise they intersect at \\((\\bar{x}, \\bar{y})\\) at a non-zero angle.",
      definition:
        "The regression line of \\(y\\) on \\(x\\) has slope \\(b_{yx} = r\\,\\dfrac{\\sigma_y}{\\sigma_x}\\) and passes through \\((\\bar{x}, \\bar{y})\\). " +
        "The regression line of \\(x\\) on \\(y\\) has slope \\(b_{xy} = r\\,\\dfrac{\\sigma_x}{\\sigma_y}\\) and also passes through \\((\\bar{x}, \\bar{y})\\).",
      formula: {
        label: "Lines of Regression (point-slope form)",
        latex:
          "y - \\bar{y} = b_{yx}(x - \\bar{x}) \\qquad x - \\bar{x} = b_{xy}(y - \\bar{y})",
        symbols: [
          { symbol: "\\(b_{yx}\\)", meaning: "slope of \\(y\\) on \\(x\\) line \\(= r\\,\\sigma_y/\\sigma_x\\)" },
          { symbol: "\\(b_{xy}\\)", meaning: "slope of \\(x\\) on \\(y\\) line \\(= r\\,\\sigma_x/\\sigma_y\\)" },
          { symbol: "\\((\\bar{x},\\bar{y})\\)", meaning: "the only point on BOTH regression lines" },
        ],
      },
      visualizationSlug: "regression-line-fit",
      authoredExample: {
        prompt:
          "Find the regression line of \\(y\\) on \\(x\\) passing through the only two data points \\((-1, 1)\\) and \\((3, 2)\\).",
        steps: [
          "With only two points, the regression line is the line joining them — correlation is perfect (\\(r = \\pm 1\\)).",
          "Compute slope: \\(b_{yx} = \\dfrac{2 - 1}{3 - (-1)} = \\dfrac{1}{4}\\).",
          "Use point-slope through \\((-1, 1)\\): \\(y - 1 = \\dfrac{1}{4}(x - (-1))\\).",
          "Simplify: \\(y = \\dfrac{x + 1}{4} + 1 = \\dfrac{x + 5}{4}\\).",
        ],
        answer: "\\(y = \\dfrac{x + 5}{4}\\)  or equivalently  \\(4y - x - 5 = 0\\)",
      },
      selfCheckExample: {
        prompt:
          "Find the regression line of \\(y\\) on \\(x\\) passing through " +
          "\\((0, 1)\\) and \\((4, 3)\\).",
        steps: [
          "Slope: \\(b_{yx} = (3 - 1)/(4 - 0) = 1/2\\).",
          "Point-slope through \\((0, 1)\\): \\(y - 1 = \\tfrac{1}{2}(x - 0)\\).",
          "Simplify: \\(y = \\dfrac{x}{2} + 1\\) (or \\(2y - x - 2 = 0\\)).",
        ],
        answer: "\\(y = \\dfrac{x}{2} + 1\\)",
      },
      practiceSet: [
        { prompt: "Both regression lines always pass through which point?", answer: "\\((\\bar{x}, \\bar{y})\\)", method: "the mean point" },
        { prompt: "Regression lines are \\(x = 2\\) and \\(y = 3\\). Find \\((\\bar{x}, \\bar{y})\\).", answer: "\\((2, 3)\\)", method: "intersection \\(=\\) mean point" },
        { prompt: "\\(b_{yx} = r\\,\\sigma_y/\\sigma_x\\). If \\(r = 1\\) and \\(\\sigma_y = \\sigma_x = 2\\), slope?", answer: "\\(1\\)" },
        { prompt: "Slope of the \\(y\\)-on-\\(x\\) line through \\((1,2)\\) and \\((3,6)\\)?", answer: "\\(2\\)", method: "\\((6-2)/(3-1)\\)" },
      ],
      pyqExampleId: "81b73d8a-5776-49fc-9bc6-32e377566d5c",
      traps: [
        {
          title: "Both regression lines always pass through \\((\\bar{x}, \\bar{y})\\)",
          body:
            "If a PYQ gives you two regression lines and asks for the means, solve the two equations simultaneously — " +
            "their intersection is exactly \\((\\bar{x}, \\bar{y})\\). No need to compute anything from raw data.",
        },
        {
          title: "From raw bivariate data, compute \\(b_{yx}\\) via the Pearson form",
          body:
            "When given \\(n\\) raw paired points (e.g. four \\((x_i, y_i)\\) values), use the " +
            "computational formula \\(b_{yx} = \\dfrac{n\\sum x_i y_i - \\sum x_i \\sum y_i}{n\\sum x_i^2 - (\\sum x_i)^2}\\) " +
            "with \\(\\bar{x}, \\bar{y}\\) read straight from the column sums. The regression " +
            "line is then \\(y - \\bar{y} = b_{yx}(x - \\bar{x})\\). Faster than the " +
            "deviation-from-mean form because it works directly off the column totals.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "regression-coefficients-and-r",
      name: "Regression Coefficients and Their Link to r",
      intuition:
        "The two regression slopes \\(b_{yx}\\) and \\(b_{xy}\\) carry the same information as \\(r\\) — their product equals \\(r^2\\), " +
        "and they share the same sign as \\(r\\). This means once you know any two of \\(\\{r, b_{yx}, b_{xy}\\}\\), the third is forced.",
      definition:
        "\\(b_{yx} \\cdot b_{xy} = r^2\\), with \\(0 \\leq r^2 \\leq 1\\). " +
        "Therefore \\(b_{yx} \\cdot b_{xy} \\leq 1\\) always. " +
        "Also \\(\\text{sign}(b_{yx}) = \\text{sign}(b_{xy}) = \\text{sign}(r)\\) — the two slopes can never have opposite signs.",
      formula: {
        label: "Product Identity",
        latex:
          "b_{yx} \\cdot b_{xy} = r^2, \\qquad r = \\pm\\sqrt{b_{yx}\\,b_{xy}}",
        symbols: [
          { symbol: "Sign of \\(r\\)", meaning: "same as the common sign of \\(b_{yx}\\) and \\(b_{xy}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Two lines of regression are \\(x + y + 11 = 0\\) and \\(2x + 3y + 4 = 0\\). Find the correlation coefficient \\(r\\) between \\(x\\) and \\(y\\).",
        steps: [
          "Try assigning the first line as regression of \\(y\\) on \\(x\\): \\(y = -x - 11\\), so \\(b_{yx} = -1\\).",
          "Then the second line is regression of \\(x\\) on \\(y\\): \\(x = \\dfrac{-3y - 4}{2}\\), so \\(b_{xy} = -\\dfrac{3}{2}\\).",
          "Check the product: \\(b_{yx} \\cdot b_{xy} = (-1) \\times \\left(-\\dfrac{3}{2}\\right) = \\dfrac{3}{2} > 1\\). Invalid — swap the assignment.",
          "Now first line is \\(x\\) on \\(y\\): \\(x = -y - 11\\), so \\(b_{xy} = -1\\). Second is \\(y\\) on \\(x\\): \\(y = \\dfrac{-2x - 4}{3}\\), so \\(b_{yx} = -\\dfrac{2}{3}\\).",
          "Product: \\(b_{yx} \\cdot b_{xy} = \\dfrac{2}{3} \\leq 1\\) — valid. So \\(r^2 = \\dfrac{2}{3}\\) and \\(r = -\\sqrt{2/3}\\) (negative because both slopes are negative).",
        ],
        answer: "\\(r = -\\sqrt{\\dfrac{2}{3}}\\)",
      },
      selfCheckExample: {
        prompt:
          "Given \\(b_{yx} = -1.2\\) and \\(b_{xy} = -0.3\\), find \\(r\\).",
        steps: [
          "Product: \\((-1.2)(-0.3) = 0.36 \\leq 1\\) — valid.",
          "\\(|r| = \\sqrt{0.36} = 0.6\\).",
          "Both slopes negative \\(\\Rightarrow r < 0\\); \\(r = -0.6\\).",
        ],
        answer: "\\(r = -0.6\\)",
      },
      practiceSet: [
        { prompt: "\\(b_{yx} = 0.4\\), \\(b_{xy} = 0.9\\). Find \\(r^2\\).", answer: "\\(0.36\\)", method: "product of the slopes" },
        { prompt: "\\(b_{yx} = 0.4\\), \\(b_{xy} = 0.9\\). Find \\(r\\).", answer: "\\(0.6\\)", method: "\\(\\sqrt{0.36}\\), both positive" },
        { prompt: "\\(b_{yx} = -2\\), \\(b_{xy} = -0.5\\). Find \\(r\\).", answer: "\\(-1\\)", method: "\\(\\sqrt{1}\\), both negative" },
        { prompt: "Can \\(b_{yx} = 2\\) and \\(b_{xy} = 0.8\\) hold for one dataset?", answer: "No", method: "product \\(1.6 = r^2 > 1\\)" },
      ],
      pyqExampleId: "c0cb9af2-ecd0-4b1e-9923-352874cbbb49",
      traps: [
        {
          title: "\\(b_{yx} \\cdot b_{xy} \\leq 1\\) is non-negotiable",
          body:
            "If your computed product exceeds 1, you have assigned the wrong line to \\(y\\) on \\(x\\). " +
            "Swap the assignment and recompute — the inequality \\(b_{yx} b_{xy} = r^2 \\leq 1\\) picks the correct pairing every time.",
        },
        {
          title: "Both slopes share the sign of \\(r\\)",
          body:
            "You cannot have \\(b_{yx} > 0\\) and \\(b_{xy} < 0\\) — if a problem seems to suggest this, the lines have been labelled wrong.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "identifying-regression-line",
      name: "Identifying Which Regression Line is Which",
      intuition:
        "When NDA gives you two equations and doesn't label them, you must figure out which is \\(y\\) on \\(x\\) and which is \\(x\\) on \\(y\\). " +
        "Use the inequality \\(b_{yx}\\,b_{xy} \\leq 1\\) as a sieve: there are only two possible pairings; one will satisfy the inequality, the other won't.",
      definition:
        "Two regression lines \\(L_1\\) and \\(L_2\\) can be paired in two ways. The correct pairing is the one for which the product of the slopes (interpreted as \\(b_{yx} \\cdot b_{xy}\\)) is at most 1. " +
        "The wrong pairing always gives a product greater than 1 (provided the lines are distinct).",
      formula: {
        label: "Sieve Inequality",
        latex:
          "\\text{Correct pairing satisfies } b_{yx}\\,b_{xy} \\leq 1; \\text{ wrong pairing gives } > 1.",
      },
      authoredExample: {
        prompt:
          "Two lines of regression are \\(x - 3y + 4 = 0\\) and \\(2x - 7y + 8 = 0\\). Identify which is \\(y\\) on \\(x\\) and find \\(b_{yx}\\) and \\(b_{xy}\\).",
        steps: [
          "Pairing A: first as \\(y\\) on \\(x\\) gives \\(y = \\dfrac{x+4}{3}\\), so \\(b_{yx} = \\dfrac{1}{3}\\). Second as \\(x\\) on \\(y\\) gives \\(x = \\dfrac{7y - 8}{2}\\), so \\(b_{xy} = \\dfrac{7}{2}\\). Product = \\(\\dfrac{7}{6} > 1\\) — rejected.",
          "Pairing B (swap): first as \\(x\\) on \\(y\\) gives \\(x = 3y - 4\\), so \\(b_{xy} = 3\\). Second as \\(y\\) on \\(x\\) gives \\(y = \\dfrac{2x + 8}{7}\\), so \\(b_{yx} = \\dfrac{2}{7}\\). Product = \\(\\dfrac{6}{7} \\leq 1\\) — valid.",
          "Conclusion: the second line is \\(y\\) on \\(x\\) (\\(b_{yx} = 2/7\\)); the first is \\(x\\) on \\(y\\) (\\(b_{xy} = 3\\)).",
        ],
        answer: "\\(b_{yx} = \\dfrac{2}{7},\\ b_{xy} = 3\\)",
      },
      selfCheckExample: {
        prompt:
          "Two lines of regression are \\(x + 4y - 7 = 0\\) and \\(2x + 5y - 9 = 0\\). " +
          "Identify which is \\(y\\) on \\(x\\) and report both slopes.",
        steps: [
          "Pairing A: first as \\(y\\) on \\(x \\Rightarrow b_{yx} = -1/4\\); second as \\(x\\) on \\(y \\Rightarrow b_{xy} = -5/2\\). Product \\(= 5/8 \\leq 1\\) — valid.",
          "(Pairing B would give product \\(= 8/5 > 1\\) — rejected.)",
          "Conclusion: the first line is \\(y\\) on \\(x\\) (\\(b_{yx} = -1/4\\)); the second is \\(x\\) on \\(y\\) (\\(b_{xy} = -5/2\\)).",
        ],
        answer: "\\(b_{yx} = -\\dfrac{1}{4},\\ b_{xy} = -\\dfrac{5}{2}\\)",
      },
      practiceSet: [
        { prompt: "A pairing gives slope product \\(1.5\\). Valid \\(b_{yx}\\cdot b_{xy}\\)?", answer: "No", method: "must be \\(\\leq 1\\)" },
        { prompt: "Pairing A product \\(0.8\\), pairing B product \\(1.25\\). Which is correct?", answer: "A", method: "the \\(\\leq 1\\) pairing wins" },
        { prompt: "The product of the two regression slopes equals?", answer: "\\(r^2\\)" },
        { prompt: "Why can the wrong pairing exceed \\(1\\)?", answer: "It would force \\(r^2 > 1\\), which is impossible" },
      ],
      pyqExampleId: "aec23a99-c901-4c50-a672-211c0d8da55d",
      traps: [
        {
          title: "Try the inequality before doing anything else",
          body:
            "Always compute both candidate pairings of \\(b_{yx} \\cdot b_{xy}\\). The pairing that satisfies the \\(\\leq 1\\) condition is the correct one. " +
            "Don't try to reason geometrically from the slopes — the inequality is mechanical and unambiguous.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      slug: "angle-between-regression-lines",
      name: "Angle Between the Two Regression Lines",
      intuition:
        "The two regression lines coincide when correlation is perfect and stand " +
        "perpendicular when there is no correlation. In between, they make an acute " +
        "angle whose tangent you can read straight off the line equations using the " +
        "ordinary \"angle between two lines\" formula from coordinate geometry — " +
        "no need to compute \\(r\\), \\(\\sigma_x\\), \\(\\sigma_y\\) first.",
      definition:
        "Treat the two regression lines as ordinary straight lines in the \\((x,y)\\) " +
        "plane with slopes \\(m_1\\) and \\(m_2\\) (read directly from each equation " +
        "after solving for \\(y\\)). The acute angle \\(\\theta\\) between them satisfies " +
        "the standard formula below. When \\(r = \\pm 1\\) the slopes coincide and " +
        "\\(\\tan\\theta = 0\\); when \\(r = 0\\), \\(1 + m_1 m_2 = 0\\) and the lines are perpendicular.",
      formula: {
        label: "Angle between two lines (applied to regression)",
        latex: "\\tan\\theta = \\left|\\dfrac{m_1 - m_2}{1 + m_1\\,m_2}\\right|",
        symbols: [
          { symbol: "\\(m_1, m_2\\)", meaning: "slopes of the two regression lines in the \\((x,y)\\) plane" },
          { symbol: "\\(\\theta\\)", meaning: "acute angle between the lines" },
        ],
      },
      authoredExample: {
        prompt:
          "Two lines of regression are \\(x + 2y + 1 = 0\\) and \\(2x + 3y + 4 = 0\\). " +
          "Find the tangent of the acute angle between them.",
        steps: [
          "Solve each line for \\(y\\). Line 1: \\(y = -\\tfrac{1}{2}x - \\tfrac{1}{2}\\), so \\(m_1 = -\\tfrac{1}{2}\\).",
          "Line 2: \\(y = -\\tfrac{2}{3}x - \\tfrac{4}{3}\\), so \\(m_2 = -\\tfrac{2}{3}\\).",
          "Apply the formula: \\(\\tan\\theta = \\left|\\dfrac{-1/2 - (-2/3)}{1 + (-1/2)(-2/3)}\\right| = \\left|\\dfrac{1/6}{4/3}\\right|\\).",
          "Simplify: \\(\\tan\\theta = \\dfrac{1}{6} \\cdot \\dfrac{3}{4} = \\dfrac{1}{8}\\).",
        ],
        answer: "\\(\\tan\\theta = \\dfrac{1}{8}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two regression lines have slopes \\(m_1 = \\dfrac{1}{2}\\) and \\(m_2 = 3\\). " +
          "Find \\(\\tan\\theta\\) of the acute angle between them.",
        steps: [
          "Apply the formula: \\(\\tan\\theta = \\left|\\dfrac{1/2 - 3}{1 + (1/2)(3)}\\right| = \\left|\\dfrac{-5/2}{5/2}\\right|\\).",
          "Simplify: \\(\\tan\\theta = |-1| = 1\\). (So \\(\\theta = 45^\\circ\\).)",
        ],
        answer: "\\(\\tan\\theta = 1\\) (\\(\\theta = 45^\\circ\\))",
      },
      practiceSet: [
        { prompt: "If \\(r = \\pm 1\\), the angle between the two regression lines?", answer: "\\(0^\\circ\\) (they coincide)" },
        { prompt: "If \\(r = 0\\), the angle between the regression lines?", answer: "\\(90^\\circ\\)", method: "\\(1 + m_1 m_2 = 0\\)" },
        { prompt: "Slopes \\(m_1 = 2\\), \\(m_2 = 3\\). Find \\(\\tan\\theta\\).", answer: "\\(\\tfrac{1}{7}\\)", method: "\\(|(2-3)/(1+6)|\\)" },
        { prompt: "Slopes \\(m_1 = 1\\), \\(m_2 = -1\\). The lines are?", answer: "perpendicular", method: "\\(1 + m_1 m_2 = 0\\)" },
      ],
      pyqExampleId: "4557ccee-8cb8-44b9-b085-e6923a9b15b7",
      traps: [
        {
          title: "Slope of the \\(x\\)-on-\\(y\\) line is NOT \\(b_{xy}\\) in the \\((x,y)\\) plane",
          body:
            "The slope of the \\(y\\)-on-\\(x\\) line in the \\((x,y)\\) plane is \\(b_{yx}\\). " +
            "But the slope of the \\(x\\)-on-\\(y\\) line (written \\(x = a + b_{xy} y\\)) in " +
            "the \\((x,y)\\) plane is \\(1/b_{xy}\\), NOT \\(b_{xy}\\). When reading slopes " +
            "off the line equation directly (solve for \\(y\\), take the coefficient of \\(x\\)), " +
            "you sidestep this trap.",
        },
        {
          title: "Acute angle only — take absolute value",
          body:
            "A negative tangent would correspond to the obtuse supplement. The formula's " +
            "absolute value guarantees \\(\\theta \\leq 90^\\circ\\). PYQs always ask the acute angle.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Dispersion — SD and variance feed the regression slopes",
      href: "/notes/nda-maths/statistics/dispersion",
    },
    {
      label: "Measures of Central Tendency — both regression lines pass through \\((\\bar{x}, \\bar{y})\\)",
      href: "/notes/nda-maths/statistics/central-tendency",
    },
  ],
};
