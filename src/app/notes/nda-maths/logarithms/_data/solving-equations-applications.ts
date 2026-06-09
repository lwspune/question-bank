import type { SubtopicNote } from "@/app/notes/_types";

export const SOLVING_EQUATIONS_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Solving Logarithmic Equations and Applications",
  title: "Solving Logarithmic Equations & Applications",
  oneLineDefinition:
    "Solving a log equation means turning it into an algebraic one — take the log of an exponential equation, substitute t = aˣ to reach a quadratic, then reject any root that breaks a domain.",
  whyItMatters:
    "Eleven PYQs, three of them HARD — this is where the chapter's difficulty concentrates. The recurring moves are few: collapse both sides to a single log and drop the log, substitute t = aˣ to get a quadratic, or take log₁₀ of an exponential equation. The HARD ones add a twist — a GP/chain-rule condition or an AM-GM bound — but the spine is always the same. Domain-checking is what separates a 4-mark answer from a wrong one.",
  concepts: [
    // 1 — Take the log of an exponential equation a^x = b
    {
      kind: "formula" as const,
      slug: "log-solve-exponential",
      name: "Taking the Log of an Exponential Equation",
      pyqExampleId: "96f19014-9e10-4efc-b79a-d54157e0be47",
      intuition:
        "When the unknown sits in an exponent — \\(a^x = b\\) — apply a log to both sides to bring the exponent down: \\(x\\log a = \\log b\\). With a supplied value of \\(\\log_{10} 2\\) you can then compute a decimal, or you can just collapse log expressions of the form \\(k\\,f(\\cdot)\\) until they reduce to \\(\\log 10 = 1\\).",
      definition:
        "**Core move:** \\(a^x = b \\Rightarrow x = \\dfrac{\\log b}{\\log a}\\) (any common base).\n" +
        "Two flavours appear:\n" +
        "- **Numeric:** given \\(\\log_{10} 2\\), evaluate \\(x\\) from \\((0.2)^x = 2\\) by writing \\(\\log_{10} 0.2 = \\log_{10}\\tfrac{2}{10} = \\log_{10} 2 - 1\\).\n" +
        "- **Collapse-to-1:** expressions built from \\(\\log_{10} 2\\) and \\(\\log_{10} 5\\) simplify because \\(\\log_{10} 2 + \\log_{10} 5 = \\log_{10} 10 = 1\\). Group terms to expose a \\(\\log_{10}(\\text{product} = 10^k)\\).",
      formula: {
        label: "Bring the exponent down with a log",
        latex: "a^x = b \\;\\Rightarrow\\; x = \\dfrac{\\log b}{\\log a}",
      },
      authoredExample: {
        prompt: "If \\(3^x = 5\\) and \\(\\log_{10} 3 = 0.477,\\ \\log_{10} 5 = 0.699\\), find \\(x\\) to two decimals.",
        steps: [
          "Take \\(\\log_{10}\\): \\(x\\log_{10} 3 = \\log_{10} 5\\).",
          "\\(x = \\dfrac{0.699}{0.477} \\approx 1.465\\).",
        ],
        answer: "\\(x \\approx 1.47\\).",
      },
      selfCheckExample: {
        prompt: "Simplify \\(2\\log_{10} 5 + \\log_{10} 4\\).",
        steps: [
          "\\(2\\log_{10} 5 = \\log_{10} 25\\).",
          "\\(\\log_{10} 25 + \\log_{10} 4 = \\log_{10} 100 = 2\\).",
        ],
        answer: "\\(2\\).",
      },
      traps: [
        {
          title: "\\(\\log_{10} 0.2 = \\log_{10} 2 - 1\\), which is negative",
          body:
            "Writing \\(0.2 = \\tfrac{2}{10}\\) gives \\(\\log_{10} 0.2 = \\log_{10} 2 - \\log_{10} 10 = 0.3010 - 1 = -0.6990\\). Dropping the \\(-1\\) flips the sign of \\(x\\) — the answer to \\((0.2)^x = 2\\) is negative.",
        },
      ],
    },

    // 2 — Substitute t = a^x to get a quadratic
    {
      kind: "formula" as const,
      slug: "log-substitute-to-quadratic",
      name: "Substitution t = aˣ to a Quadratic",
      pyqExampleId: "041f166d-bf0b-4070-87e8-40d5a59d5e83",
      intuition:
        "When a log equation mixes \\(2^x\\) and \\(2^{2x}\\) (or \\(3^x\\) and \\(9^x\\)), collapse both sides to a single log, drop the log, then let \\(t = 2^x\\). The relation becomes a quadratic in \\(t\\); solve it and discard any non-positive \\(t\\), because \\(2^x\\) is always positive.",
      definition:
        "Recipe:\n" +
        "- **Collapse to one log on each side** using the laws, then equate arguments (since \\(\\log_a M = \\log_a N \\Rightarrow M = N\\)).\n" +
        "- **Substitute** \\(t = a^x\\) (so \\(a^{2x} = t^2\\)). The equation becomes a quadratic \\(t^2 + bt + c = 0\\).\n" +
        "- **Solve and screen:** reject any root \\(t \\le 0\\) — an exponential \\(a^x\\) can never be \\(0\\) or negative. From the surviving \\(t\\), recover \\(x = \\log_a t\\).\n" +
        "An **AP condition** on three logs, \\(2\\log(2^x-1) = \\log 2 + \\log(2^x+3)\\), feeds straight into this: square out to \\((2^x-1)^2 = 2(2^x+3)\\), a quadratic in \\(t = 2^x\\).",
      formula: {
        label: "Let t = aˣ and solve the quadratic (keep t > 0)",
        latex: "t = a^x > 0,\\quad t^2 + bt + c = 0 \\;\\Rightarrow\\; x = \\log_a t",
      },
      authoredExample: {
        prompt: "Solve \\(4^x - 3\\cdot 2^x - 4 = 0\\).",
        steps: [
          "Let \\(t = 2^x\\), so \\(4^x = t^2\\): \\(t^2 - 3t - 4 = 0\\).",
          "Factor: \\((t-4)(t+1) = 0 \\Rightarrow t = 4\\) or \\(t = -1\\).",
          "Reject \\(t = -1\\) (\\(2^x > 0\\)); \\(t = 4 = 2^2\\) gives \\(x = 2\\).",
        ],
        answer: "\\(x = 2\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(9^x - 4\\cdot 3^x + 3 = 0\\).",
        steps: [
          "Let \\(t = 3^x\\): \\(t^2 - 4t + 3 = 0 \\Rightarrow (t-1)(t-3) = 0\\).",
          "\\(t = 1 \\Rightarrow x = 0\\); \\(t = 3 \\Rightarrow x = 1\\). Both positive.",
        ],
        answer: "\\(x = 0\\) or \\(x = 1\\).",
      },
      traps: [
        {
          title: "Throw out the non-positive t",
          body:
            "A quadratic in \\(t = 2^x\\) often hands you a negative root. Because \\(2^x\\) is strictly positive, that root yields no real \\(x\\) — keep only \\(t > 0\\) before solving \\(x = \\log_2 t\\).",
        },
      ],
    },

    // 3 — Domain & number of solutions (log_b vs log_c, inequalities)
    {
      kind: "formula" as const,
      slug: "log-domain-and-count",
      name: "Domain Checks & Counting Solutions",
      pyqExampleId: "e0244426-f13f-4475-a9fa-32198825fe25",
      intuition:
        "A log equation with two different bases (\\(\\log_4\\) and \\(\\log_2\\)) is solved by bringing both to one base, but the algebra can hand you roots that make some argument non-positive. The genuine count of solutions is only the roots that survive the domain — argument \\(>0\\) for every log in the original equation.",
      definition:
        "Procedure for \"how many solutions?\":\n" +
        "- **Unify the base:** \\(\\log_4(x-1) = \\tfrac{1}{2}\\log_2(x-1)\\), so \\(\\log_4(x-1) = \\log_2(x-3)\\) becomes \\(\\tfrac12\\log_2(x-1) = \\log_2(x-3)\\Rightarrow x-1 = (x-3)^2\\).\n" +
        "- **Solve the resulting polynomial**, then **impose the domain**: every original argument must be \\(>0\\) (here \\(x-1>0\\) AND \\(x-3>0\\), so \\(x>3\\)).\n" +
        "- **Inequalities:** for \\(x^{\\log_7 x} > 7\\), take \\(\\log_7\\) of both sides to get \\((\\log_7 x)^2 > 1\\), then \\(|\\log_7 x| > 1\\) gives \\(x > 7\\) or \\(0 < x < \\tfrac17\\).",
      formula: {
        label: "Keep only roots with every argument > 0",
        latex: "\\log_a M = \\log_a N \\Rightarrow M = N,\\ \\text{then require } M,N > 0",
      },
      authoredExample: {
        prompt: "How many solutions does \\(\\log_9(x+6) = \\log_3 x\\) have?",
        steps: [
          "\\(\\log_9(x+6) = \\tfrac12\\log_3(x+6)\\), so \\(\\tfrac12\\log_3(x+6) = \\log_3 x \\Rightarrow x+6 = x^2\\).",
          "\\(x^2 - x - 6 = 0 \\Rightarrow (x-3)(x+2) = 0 \\Rightarrow x = 3\\) or \\(x = -2\\).",
          "Domain needs \\(x > 0\\): reject \\(x = -2\\).",
        ],
        answer: "One solution (\\(x = 3\\)).",
      },
      traps: [
        {
          title: "An algebraic root is not a solution until the domain clears it",
          body:
            "\\(x-1 = (x-3)^2\\) gives \\(x = 2\\) and \\(x = 5\\), but \\(x = 2\\) makes \\(x-3 = -1 < 0\\), so \\(\\log_2(x-3)\\) is undefined. Only \\(x = 5\\) is a genuine solution — always re-substitute into the ORIGINAL equation.",
        },
      ],
    },

    // 4 — GP / chain-rule conditions and AM-GM "can never equal"
    {
      kind: "formula" as const,
      slug: "log-advanced-conditions",
      name: "GP, Chain-Rule & AM-GM Conditions",
      pyqExampleId: "8002f7a6-0f96-4a53-912e-25772003671b",
      intuition:
        "The HARD log questions wrap a sequence or inequality condition around the same tools. A GP condition multiplies the outer terms; the chain rule \\(\\log_x a\\cdot\\log_b x = \\log_b a\\) collapses the product; and a \"\\(k\\) can never equal\" question is usually AM-GM, \\(t + \\tfrac1t \\ge 2\\), in disguise.",
      definition:
        "Two HARD patterns:\n" +
        "- **GP of logs:** \\(\\log_x a,\\ a^x,\\ \\log_b x\\) in GP means \\((a^x)^2 = \\log_x a\\cdot\\log_b x\\). The product collapses by the **chain rule** \\(\\log_x a\\cdot\\log_b x = \\log_b a\\), giving \\(a^{2x} = \\log_b a\\); take \\(\\log_a\\) to solve for \\(x\\).\n" +
        "- **AM-GM bound:** writing \\(\\log_x\\tfrac{x}{y} + \\log_y\\tfrac{y}{x}\\) with \\(t = \\log_x y \\ge 1\\) gives \\(2 - t - \\tfrac1t\\). Since \\(t + \\tfrac1t \\ge 2\\) (AM-GM), the expression is \\(\\le 0\\) — so it can **never** equal any positive value.",
      formula: {
        label: "Chain rule and the AM-GM floor",
        latex: "\\log_x a\\cdot\\log_b x = \\log_b a, \\qquad t + \\tfrac{1}{t} \\ge 2\\ (t>0)",
      },
      authoredExample: {
        prompt: "Find the maximum value of \\(2 - \\Big(t + \\dfrac{1}{t}\\Big)\\) for \\(t > 0\\).",
        steps: [
          "By AM-GM, \\(t + \\dfrac1t \\ge 2\\), with equality at \\(t = 1\\).",
          "So \\(2 - (t + \\tfrac1t) \\le 2 - 2 = 0\\).",
        ],
        answer: "Maximum value \\(0\\) (at \\(t = 1\\)).",
      },
      traps: [
        {
          title: "The GP condition squares the MIDDLE term",
          body:
            "For \\(p, q, r\\) in GP the relation is \\(q^2 = pr\\) — the middle term is squared and set equal to the product of the outer two. Squaring the wrong term derails the whole chain-rule collapse.",
        },
      ],
    },

    // 5 — Applications: trailing zeros of n! (Legendre)
    {
      kind: "formula" as const,
      slug: "log-trailing-zeros",
      name: "Application — Trailing Zeros of a Factorial",
      pyqExampleId: "8d119703-0bb5-42a0-82fb-533d552d3aa6",
      intuition:
        "The number of trailing zeros of \\(n!\\) is set by how many times \\(10 = 2\\times 5\\) divides it — and since factors of \\(5\\) are scarcer than factors of \\(2\\), you just count the \\(5\\)s. This is the chapter's one number-theory application that rides on the same \"count the powers\" instinct logs train.",
      definition:
        "**Legendre's count (for the prime \\(5\\)):**\n" +
        "\\[Z(n) = \\left\\lfloor\\dfrac{n}{5}\\right\\rfloor + \\left\\lfloor\\dfrac{n}{25}\\right\\rfloor + \\left\\lfloor\\dfrac{n}{125}\\right\\rfloor + \\cdots\\]\n" +
        "gives the number of trailing zeros of \\(n!\\) (the power of \\(5\\) in \\(n!\\); the power of \\(2\\) is always larger, so \\(5\\) is the bottleneck).\n" +
        "To find **how many \\(n\\) give exactly \\(z\\) zeros**, note \\(Z(n)\\) is non-decreasing and jumps at multiples of \\(5\\): a run of consecutive integers shares the same \\(Z\\) value until the next multiple of \\(5\\).",
      formula: {
        label: "Legendre — trailing zeros count the 5s",
        latex: "Z(n) = \\sum_{i\\ge 1}\\left\\lfloor \\dfrac{n}{5^i} \\right\\rfloor",
      },
      authoredExample: {
        prompt: "How many trailing zeros does \\(30!\\) have?",
        steps: [
          "\\(\\lfloor 30/5\\rfloor = 6\\).",
          "\\(\\lfloor 30/25\\rfloor = 1\\).",
          "\\(\\lfloor 30/125\\rfloor = 0\\). Total \\(= 6 + 1 = 7\\).",
        ],
        answer: "\\(7\\) trailing zeros.",
      },
      practiceSet: [
        { prompt: "Trailing zeros of \\(10!\\)?", answer: "\\(2\\)", method: "\\(\\lfloor 10/5\\rfloor = 2\\)." },
        { prompt: "Trailing zeros of \\(25!\\)?", answer: "\\(6\\)", method: "\\(\\lfloor 25/5\\rfloor + \\lfloor 25/25\\rfloor = 5+1\\)." },
      ],
      traps: [
        {
          title: "Count the 5s, not the 2s — and don't forget 25, 125…",
          body:
            "Each multiple of \\(25\\) contributes an EXTRA \\(5\\) beyond the one already counted by \\(\\lfloor n/5\\rfloor\\). Stopping at \\(\\lfloor n/5\\rfloor\\) undercounts for \\(n \\ge 25\\).",
        },
      ],
    },
  ],
};
