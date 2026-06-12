import type { SubtopicNote } from "@/app/notes/_types";

export const MONOTONICITY_EXTREMA_NOTE: SubtopicNote = {
  subtopicName: "Monotonicity, Extrema, and Critical Points",
  title: "Monotonicity, Maxima & Minima",
  oneLineDefinition:
    "The sign of f′ says where a function rises or falls; the zeros of f′ are the candidates for peaks and valleys, sorted by the first- or second-derivative test, with endpoints checked for the absolute extremum.",
  whyItMatters:
    "This is the densest subtopic in the chapter. Almost every question is one of four moves: read intervals from the sign of f′, classify a critical point, find the greatest/least value on an interval, or impose a condition (no extremum / monotonic) on a parameter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aod-increasing-decreasing",
      name: "Increasing and decreasing intervals",
      intuition:
        "Where the tangent slopes up the function rises, where it slopes down it falls. So the sign of \\(f'(x)\\) on an interval decides monotonicity — find where \\(f'=0\\) or is undefined, then test the sign of \\(f'\\) in each resulting interval.",
      definition:
        "On an interval: \\(f'(x)>0\\Rightarrow f\\) **increasing**; \\(f'(x)<0\\Rightarrow f\\) **decreasing**. Method: solve \\(f'(x)=0\\) for the critical \\(x\\), split the line at those points, and test the sign of \\(f'\\) in each piece (a product like \\((x-a)(x-b)(x-c)\\) flips sign at each root). 'Monotonic on an interval' or 'no turning' imposes a one-sided sign condition that may fix a parameter.",
      visualizationSlug: "aod-sign-of-derivative",
      authoredExample: {
        prompt: "On which intervals is \\(f(x)=x^3-3x\\) increasing?",
        steps: [
          "\\(f'(x)=3x^2-3=3(x-1)(x+1)\\).",
          "\\(f'>0\\) for \\(x<-1\\) and \\(x>1\\); \\(f'<0\\) on \\((-1,1)\\).",
        ],
        answer: "Increasing on \\((-\\infty,-1)\\) and \\((1,\\infty)\\).",
      },
      selfCheckExample: {
        prompt: "Find where \\(f(x)=2x^3-9x^2+12x\\) is increasing.",
        steps: [
          "\\(f'(x)=6x^2-18x+12=6(x-1)(x-2)\\).",
          "\\(f'>0\\) for \\(x<1\\) and \\(x>2\\).",
        ],
        answer: "Increasing on \\((-\\infty,1)\\) and \\((2,\\infty)\\).",
      },
      practiceSet: [
        { prompt: "\\(f'(x)>0\\) means \\(f\\) is?", answer: "Increasing" },
        { prompt: "First step to find monotonic intervals?", answer: "Solve \\(f'(x)=0\\), then sign-test" },
        { prompt: "\\(f(x)=x^3-3x\\) decreasing on?", answer: "\\((-1,1)\\)" },
        { prompt: "\\(x^2-kx\\) monotonic increasing on \\(x>1\\) needs?", answer: "\\(k\\le 2\\)" },
      ],
      traps: [
        {
          title: "Monotonicity is decided by the sign of \\(f'\\), not \\(f\\)",
          body: "\\(f\\) increasing \\(\\iff f'(x)\\ge 0\\) on the interval (and \\(f'(x)\\le 0\\) for decreasing). A large or positive VALUE of \\(f\\) says nothing — read the sign of the DERIVATIVE. Sign-test \\(f'\\) on each piece between its zeros.",
        },
      ],
      pyqExampleId: "0ef63ae6-e18d-45e1-84ac-f2909b277b42", // x^3/3 - 5x^2/2 + 6x intervals
    },

    {
      kind: "formula" as const,
      slug: "aod-maxima-minima",
      name: "Critical points and the derivative tests",
      intuition:
        "Local peaks and valleys occur where the tangent is flat (\\(f'=0\\)). To tell which is which, either watch the sign of \\(f'\\) flip (first-derivative test) or check the bend \\(f''\\) (second-derivative test): \\(f''>0\\) is a valley, \\(f''<0\\) a peak.",
      definition:
        "**Critical points:** where \\(f'(x)=0\\) (or undefined). **First-derivative test:** \\(f'\\) changes \\(+\\to-\\) ⇒ local max; \\(-\\to+\\) ⇒ local min. **Second-derivative test:** at a critical point, \\(f''>0\\) ⇒ local min, \\(f''<0\\) ⇒ local max, \\(f''=0\\) ⇒ inconclusive. A function can attain the same extreme value at two points (e.g. \\(\\pm 3\\)).",
      visualizationSlug: "aod-extrema-curve",
      authoredExample: {
        prompt: "Find and classify the extrema of \\(f(x)=x^2+\\dfrac{128}{x}\\) (\\(x>0\\)).",
        steps: [
          "\\(f'(x)=2x-\\dfrac{128}{x^2}=0\\Rightarrow x^3=64\\Rightarrow x=4\\).",
          "\\(f''(x)=2+\\dfrac{256}{x^3}>0\\), so \\(x=4\\) is a local min; \\(f(4)=16+32=48\\).",
        ],
        answer: "Local minimum \\(48\\) at \\(x=4\\).",
      },
      selfCheckExample: {
        prompt: "\\(f(x)=x+\\dfrac1x\\). Classify its critical points.",
        steps: [
          "\\(f'(x)=1-\\dfrac{1}{x^2}=0\\Rightarrow x=\\pm 1\\).",
          "\\(f''(x)=\\dfrac{2}{x^3}\\): \\(f''(1)>0\\) (min, value 2), \\(f''(-1)<0\\) (max, value \\(-2\\)).",
        ],
        answer: "Local min \\(2\\) at \\(x=1\\); local max \\(-2\\) at \\(x=-1\\).",
      },
      practiceSet: [
        { prompt: "Critical points are where?", answer: "\\(f'(x)=0\\) (or undefined)" },
        { prompt: "Second-derivative test: \\(f''>0\\) ⇒?", answer: "Local minimum" },
        { prompt: "First-derivative test: \\(+\\to-\\) ⇒?", answer: "Local maximum" },
        { prompt: "\\(f''=0\\) at a critical point means?", answer: "Test is inconclusive" },
      ],
      traps: [
        {
          title: "\\(f''>0\\) is a MINIMUM, not a maximum",
          body: "Second-derivative test: at a critical point \\(f''>0\\) means the curve is concave up ⇒ a local **minimum**; \\(f''<0\\) ⇒ a local **maximum**. The sign is the opposite of what students often guess. (\\(f''=0\\) is inconclusive — fall back to the first-derivative test.)",
        },
        {
          title: "\\(f'=0\\) is NECESSARY, not sufficient, for an extremum",
          body: "A critical point is only a CANDIDATE. \\(f'=0\\) can be a point of inflection with no extremum (e.g. \\(f(x)=x^3\\) at \\(x=0\\)). You must still confirm a genuine sign change of \\(f'\\) (or check \\(f''\\)).",
        },
      ],
      pyqExampleId: "1ae142a5-88c8-49fb-9138-f48c3da99fc3", // local max, find a
    },

    {
      kind: "formula" as const,
      slug: "aod-absolute-extrema",
      name: "Greatest and least value on an interval",
      intuition:
        "The absolute (global) maximum or minimum on a closed interval is the largest/smallest among the critical-point values **and the endpoint values**. Forgetting the endpoints is the classic mistake. On an open interval the extreme may not be attained at all.",
      definition:
        "On \\([a,b]\\): compute \\(f\\) at every critical point inside, plus \\(f(a)\\) and \\(f(b)\\); the greatest is the absolute max, the least the absolute min. On an **open** interval the sup/inf may be approached but never reached (so 'attains its maximum' can be false even when bounded).",
      authoredExample: {
        prompt: "Find the greatest and least value of \\(f(x)=2\\sin x+1\\) on \\([0,\\pi]\\).",
        steps: [
          "\\(f'(x)=2\\cos x=0\\Rightarrow x=\\tfrac\\pi2\\); \\(f(\\tfrac\\pi2)=3\\).",
          "Endpoints: \\(f(0)=1\\), \\(f(\\pi)=1\\).",
        ],
        answer: "Greatest \\(3\\) (at \\(\\pi/2\\)), least \\(1\\) (at the endpoints).",
      },
      selfCheckExample: {
        prompt: "Does \\(f(x)=x\\) attain a maximum on the open interval \\((1,2)\\)?",
        steps: [
          "\\(f\\) is increasing; values approach \\(2\\) but \\(2\\) is excluded.",
          "The supremum \\(2\\) is never attained.",
        ],
        answer: "No — bounded above by 2, but the maximum is not attained.",
      },
      practiceSet: [
        { prompt: "Absolute extremum on \\([a,b]\\): check critical points and?", answer: "The endpoints" },
        { prompt: "Most common mistake in these problems?", answer: "Forgetting the endpoints" },
        { prompt: "On an open interval, is the sup always attained?", answer: "No" },
        { prompt: "Greatest of \\(2\\sin x+1\\) on \\([0,\\pi]\\)?", answer: "\\(3\\)" },
      ],
      traps: [
        {
          title: "On a closed interval, ALWAYS test the endpoints",
          body: "The absolute max/min on \\([a,b]\\) is the largest/smallest among the critical-point values AND \\(f(a),f(b)\\). The extreme value frequently sits at an endpoint, not at a turning point — comparing only critical points is the classic error.",
        },
      ],
      pyqExampleId: "b4262de7-21bc-4a3b-b6de-ee58efa1133c", // greatest value of f
    },

    {
      kind: "formula" as const,
      slug: "aod-extrema-conditions",
      name: "Conditions for no extremum / counting extrema",
      intuition:
        "To force a polynomial to have **no turning points**, make its derivative keep one sign — for a cubic, that means the quadratic \\(f'\\) has no real roots (discriminant < 0). To **count** extrema, count the sign-changes of \\(f'\\), i.e. how many times \\(f'=0\\) with a genuine sign flip.",
      definition:
        "- **No extremum (cubic):** \\(f'\\) is a quadratic; require discriminant \\(<0\\) so \\(f'\\) never changes sign (monotonic).\n" +
        "- **Counting extrema:** solve \\(f'(x)=0\\) on the given domain and count the roots where \\(f'\\) actually changes sign (e.g. \\(\\cos 4x=-\\tfrac12\\) has several solutions in \\((0,\\pi)\\)).",
      authoredExample: {
        prompt: "For what \\(k\\) does \\(f(x)=x^3+x^2+kx\\) have no local extremum?",
        steps: [
          "\\(f'(x)=3x^2+2x+k\\). No sign change ⇒ no real roots ⇒ discriminant \\(<0\\).",
          "\\(4-12k<0\\Rightarrow k>\\tfrac13\\).",
        ],
        answer: "\\(k>\\tfrac13\\).",
      },
      selfCheckExample: {
        prompt: "How many extreme values does \\(f(x)=\\sin 4x+2x\\) have on \\((0,\\pi)\\)?",
        steps: [
          "\\(f'(x)=4\\cos 4x+2=0\\Rightarrow\\cos 4x=-\\tfrac12\\).",
          "For \\(4x\\in(0,4\\pi)\\), \\(\\cos=-\\tfrac12\\) at \\(4\\) points, each a genuine sign change.",
        ],
        answer: "\\(4\\) extreme values.",
      },
      practiceSet: [
        { prompt: "Cubic has no extremum when its \\(f'\\) (a quadratic) has?", answer: "No real roots (discriminant < 0)" },
        { prompt: "Discriminant of \\(3x^2+2x+k\\)?", answer: "\\(4-12k\\)" },
        { prompt: "To count extrema, count sign-changes of?", answer: "\\(f'\\)" },
        { prompt: "\\(x^3+x^2+kx\\) monotonic for \\(k\\)?", answer: "\\(k>\\tfrac13\\)" },
      ],
      traps: [
        {
          title: "Count genuine SIGN-CHANGES of \\(f'\\), not just roots of \\(f'\\)",
          body: "A root of \\(f'\\) is an extremum only if \\(f'\\) actually flips sign there. A repeated root (e.g. \\(f'=(x-2)^2\\)) touches zero without changing sign — no extremum. For a cubic to have NO extremum, force \\(f'\\) (a quadratic) to have discriminant \\(<0\\) so it never changes sign.",
        },
      ],
      pyqExampleId: "25b913ec-a83a-461e-85bd-7f106631359d", // no extremum condition
    },
  ],
  related: [
    { label: "Tangents & Rates", href: "/notes/nda-maths/application-of-derivatives/aod-tangents" },
    { label: "Optimisation", href: "/notes/nda-maths/application-of-derivatives/aod-optimisation" },
  ],
};
