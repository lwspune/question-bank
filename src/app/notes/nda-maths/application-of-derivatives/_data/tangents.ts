import type { SubtopicNote } from "@/app/notes/_types";

export const TANGENTS_NOTE: SubtopicNote = {
  subtopicName: "Tangents and Slopes",
  title: "Tangents, Rates of Change & Approximations",
  oneLineDefinition:
    "The derivative read geometrically (slope of the tangent), dynamically (a rate of change), and as a tool for estimating small changes via differentials.",
  whyItMatters:
    "These are the most direct uses of f′(x): the slope of a tangent or normal, how fast one quantity changes with another, and a quick linear estimate of a small change. They are reliably easy marks once you read the derivative the right way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aod-tangents-normals",
      name: "Tangent and normal to a curve",
      intuition:
        "The slope of the tangent at a point is just \\(f'(x_0)\\); the normal is perpendicular, so its slope is \\(-1/f'(x_0)\\). With a point and a slope, the line equations follow immediately.",
      definition:
        "At \\((x_0,y_0)\\) on \\(y=f(x)\\): tangent slope \\(m=f'(x_0)\\), **tangent** \\(y-y_0=m(x-x_0)\\); **normal** slope \\(-1/m\\), \\(y-y_0=-\\tfrac1m(x-x_0)\\). The tangent makes angle \\(\\theta=\\tan^{-1}m\\) with the x-axis. A tangent is horizontal where \\(f'=0\\), vertical where \\(f'\\) is undefined; parallel tangents share the same \\(m\\).",
      authoredExample: {
        prompt: "Find the slope of the tangent to \\(y=x^3-2x\\) at \\(x=1\\).",
        steps: [
          "\\(\\dfrac{dy}{dx}=3x^2-2\\).",
          "At \\(x=1\\): \\(3-2=1\\).",
        ],
        answer: "Slope \\(=1\\).",
      },
      selfCheckExample: {
        prompt: "The tangent to \\(x^2=y\\) at \\((1,1)\\) makes angle \\(\\theta\\) with the x-axis. Find \\(\\tan\\theta\\).",
        steps: [
          "\\(\\dfrac{dy}{dx}=2x\\), at \\(x=1\\) gives slope \\(2\\).",
          "\\(\\tan\\theta=\\) slope \\(=2\\).",
        ],
        answer: "\\(\\tan\\theta=2\\).",
      },
      practiceSet: [
        { prompt: "Tangent slope at \\(x_0\\)?", answer: "\\(f'(x_0)\\)" },
        { prompt: "Normal slope if tangent slope is \\(m\\)?", answer: "\\(-1/m\\)" },
        { prompt: "Tangent is horizontal where?", answer: "\\(f'(x)=0\\)" },
        { prompt: "Angle of tangent with x-axis?", answer: "\\(\\tan^{-1}(f'(x_0))\\)" },
      ],
      pyqExampleId: "a8c9317f-15ed-4d88-aedd-75cbe3143163", // tangent to x^2=y at (1,1)
    },

    {
      kind: "formula" as const,
      slug: "aod-rate-approximation",
      name: "Rates of change and small-change approximation",
      intuition:
        "A derivative is a rate: \\(\\dfrac{dy}{dt}\\) tells how fast \\(y\\) changes in time, and related quantities chain together via \\(\\dfrac{dy}{dt}=\\dfrac{dy}{dx}\\dfrac{dx}{dt}\\). For a small input change, the derivative gives a fast linear estimate of the output change: \\(\\Delta y\\approx f'(x)\\,\\Delta x\\).",
      definition:
        "- **Related rates:** differentiate the relation w.r.t. time and substitute known rates (e.g. radius growing → area's rate \\(\\dfrac{dA}{dt}=2\\pi r\\dfrac{dr}{dt}\\)).\n" +
        "- **Approximation (differentials):** \\(\\Delta y\\approx \\dfrac{dy}{dx}\\,\\Delta x\\); use it to estimate \\(f(x+\\Delta x)\\approx f(x)+f'(x)\\Delta x\\).",
      authoredExample: {
        prompt: "The radius of a circle grows at \\(3\\) cm/s. How fast is the area changing when \\(r=5\\) cm?",
        steps: [
          "\\(A=\\pi r^2\\Rightarrow\\dfrac{dA}{dt}=2\\pi r\\dfrac{dr}{dt}\\).",
          "\\(=2\\pi(5)(3)=30\\pi\\) cm\\(^2\\)/s.",
        ],
        answer: "\\(30\\pi\\) cm²/s.",
      },
      selfCheckExample: {
        prompt: "For \\(y=3x^2+2\\), estimate the change in \\(y\\) as \\(x\\) goes from \\(10\\) to \\(10.1\\).",
        steps: [
          "\\(\\dfrac{dy}{dx}=6x\\), at \\(x=10\\) gives \\(60\\).",
          "\\(\\Delta y\\approx 60\\times 0.1=6\\).",
        ],
        answer: "\\(\\Delta y\\approx 6\\).",
      },
      practiceSet: [
        { prompt: "Small-change formula?", answer: "\\(\\Delta y\\approx f'(x)\\,\\Delta x\\)" },
        { prompt: "\\(\\dfrac{dA}{dt}\\) for \\(A=\\pi r^2\\)?", answer: "\\(2\\pi r\\dfrac{dr}{dt}\\)" },
        { prompt: "\\(y=x^2\\), \\(x:2\\to2.01\\): \\(\\Delta y\\approx\\)?", answer: "\\(0.04\\) (\\(=2x\\,\\Delta x\\))" },
        { prompt: "A derivative w.r.t. time is a?", answer: "Rate of change" },
      ],
      pyqExampleId: "dfd0f189-dc08-43a6-9a76-a4c21461e276", // radius increasing rate
    },
  ],
  related: [
    { label: "Monotonicity & Extrema", href: "/notes/nda-maths/application-of-derivatives/aod-monotonicity-extrema" },
    { label: "Differentiation notes", href: "/notes/nda-maths/differentiation/diff-core-techniques" },
  ],
};
