import type { SubtopicNote } from "@/app/notes/_types";

export const REGRESSION_CORRELATION_NOTE: SubtopicNote = {
  subtopicName: "Regression and Correlation",
  title: "Regression and Correlation",
  oneLineDefinition:
    "How two variables move together — correlation measures the strength of the link, regression draws the best-fit line.",
  whyItMatters:
    "9 PYQs in Regression and Correlation plus 2 more in Properties of Correlation Coefficient — 11 total, with the HARDest dispersion-of-points questions in NDA Statistics. " +
    "Almost every recent paper asks one of three shapes: properties of \\(r\\) under linear transformation, finding regression lines, or identifying which equation is which. " +
    "Four tight concepts cover the entire surface.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "correlation-coefficient-properties",
      name: "Correlation Coefficient and Its Properties",
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
      pyqExampleId: "8d536492-e15a-4d3f-b9ad-e6d295c95b19",
      drillQuestionIds: [
        "03263559-0466-4062-b7fb-03d288734b57", // r=0.7 husband-wife at marriage → silver jubilee
        "4d378f28-d1a6-4a6e-879b-23b9ad50c29c", // r is independent of …
      ],
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
      pyqExampleId: "81b73d8a-5776-49fc-9bc6-32e377566d5c",
      drillQuestionIds: [
        "a6fa2083-7fa7-498e-9eef-01ca57031e07", // 4-point regression y on x
        "ba9a07ff-0ba2-4dfb-8401-c77c79999c9d", // two reg lines, find x when y=-3
        "6698f48f-0d4b-4bf4-a416-dc8cbb0c4174", // r=3/4, means 3,4 — statements
      ],
      traps: [
        {
          title: "Both regression lines always pass through \\((\\bar{x}, \\bar{y})\\)",
          body:
            "If a PYQ gives you two regression lines and asks for the means, solve the two equations simultaneously — " +
            "their intersection is exactly \\((\\bar{x}, \\bar{y})\\). No need to compute anything from raw data.",
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
          "Product: \\(b_{yx} \\cdot b_{xy} = \\dfrac{2}{3} \\leq 1\\) ✓. So \\(r^2 = \\dfrac{2}{3}\\) and \\(r = -\\sqrt{2/3}\\) (negative because both slopes are negative).",
        ],
        answer: "\\(r = -\\sqrt{\\dfrac{2}{3}}\\)",
      },
      pyqExampleId: "c0cb9af2-ecd0-4b1e-9923-352874cbbb49",
      drillQuestionIds: [
        "1dcaff01-a367-432f-b63f-40e0dc491d02", // two lines y=3/4 x+2 and x=3/4 y+1/4
      ],
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
          "Pairing A: first as \\(y\\) on \\(x\\) gives \\(y = \\dfrac{x+4}{3}\\), so \\(b_{yx} = \\dfrac{1}{3}\\). Second as \\(x\\) on \\(y\\) gives \\(x = \\dfrac{7y - 8}{2}\\), so \\(b_{xy} = \\dfrac{7}{2}\\). Product = \\(\\dfrac{7}{6} > 1\\) ✗.",
          "Pairing B (swap): first as \\(x\\) on \\(y\\) gives \\(x = 3y - 4\\), so \\(b_{xy} = 3\\). Second as \\(y\\) on \\(x\\) gives \\(y = \\dfrac{2x + 8}{7}\\), so \\(b_{yx} = \\dfrac{2}{7}\\). Product = \\(\\dfrac{6}{7} \\leq 1\\) ✓.",
          "Conclusion: the second line is \\(y\\) on \\(x\\) (\\(b_{yx} = 2/7\\)); the first is \\(x\\) on \\(y\\) (\\(b_{xy} = 3\\)).",
        ],
        answer: "\\(b_{yx} = \\dfrac{2}{7},\\ b_{xy} = 3\\)",
      },
      pyqExampleId: "aec23a99-c901-4c50-a672-211c0d8da55d",
      drillQuestionIds: [
        "4557ccee-8cb8-44b9-b085-e6923a9b15b7", // angle between regression lines
      ],
      traps: [
        {
          title: "Try the inequality before doing anything else",
          body:
            "Always compute both candidate pairings of \\(b_{yx} \\cdot b_{xy}\\). The pairing that satisfies the \\(\\leq 1\\) condition is the correct one. " +
            "Don't try to reason geometrically from the slopes — the inequality is mechanical and unambiguous.",
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
