import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_RATE_NOTE: SubtopicNote = {
  subtopicName: "Derivative as a Rate Measure",
  title: "Derivative as a Rate Measure",
  oneLineDefinition:
    "dy/dt is the rate at which y changes with time; when a formula links two quantities, differentiating it with respect to t links their rates.",
  whyItMatters:
    "20 questions, three of them from board papers: the volume of a balloon whose surface area grows at a given rate (2020), the rate at which water rises in a cylinder (2025) and the area inside a circular wave on a lake (2026). The textbook rows are Exercise 2.1 Q.7 to Q.16, the four solved examples of section 2.1.3 and three Miscellaneous Exercise questions on ladders, cones and a point on an ellipse.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-growth",
      name: "Rates of change of area and volume",
      intuition:
        "Write the formula that links the quantity you are asked about with the one whose rate is given, then differentiate both sides with respect to time. The chain rule hands you the link between the two rates. Only after that do you put in the value at the given instant.",
      definition:
        "- The average rate of change of \\(y\\) w.r.t. \\(x\\) is \\(\\dfrac{\\Delta y}{\\Delta x}\\); its limit as \\(\\Delta x \\to 0\\) is \\(\\dfrac{dy}{dx}\\), the instantaneous rate of change.\n" +
        "- If \\(y = f(x)\\) and \\(x\\) changes with time, \\(\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt}\\).\n" +
        "- Formulas used most: circle \\(A = \\pi r^2\\); sphere \\(V = \\dfrac{4}{3}\\pi r^3\\), \\(S = 4\\pi r^2\\); cube \\(V = x^3\\); equilateral triangle \\(A = \\dfrac{\\sqrt{3}}{4}a^2\\).\n" +
        "- A positive rate means the quantity is increasing; a negative rate means it is decreasing.\n" +
        "- Board layout: Given (the rate and the instant), Formula, Differentiate w.r.t. \\(t\\), Substitute, Answer in words with its unit.",
      formula: {
        label: "Chain rule for rates",
        latex: "\\frac{dy}{dt} = \\frac{dy}{dx} \\cdot \\frac{dx}{dt}",
      },
      authoredExample: {
        prompt: "The radius of a spherical balloon increases at the rate of 0.5 cm/sec. Find the rate at which its volume increases when the radius is 4 cm.",
        steps: [
          "Given: \\(\\dfrac{dr}{dt} = 0.5\\) cm/sec, \\(r = 4\\) cm.",
          "Volume of a sphere: \\(V = \\dfrac{4}{3}\\pi r^3\\).",
          "Differentiate w.r.t. \\(t\\): \\(\\dfrac{dV}{dt} = 4\\pi r^2 \\dfrac{dr}{dt}\\).",
          "Substitute: \\(\\dfrac{dV}{dt} = 4\\pi (4)^2 (0.5) = 32\\pi\\).",
        ],
        answer: "The volume increases at \\(32\\pi\\) cm\\(^3\\)/sec",
      },
      selfCheckExample: {
        prompt: "The side of a square increases at 3 cm/sec. How fast is its area increasing when the side is 5 cm?",
        steps: ["\\(A = x^2\\), so \\(\\dfrac{dA}{dt} = 2x\\dfrac{dx}{dt}\\).", "\\(\\dfrac{dA}{dt} = 2(5)(3) = 30\\)."],
        answer: "30 cm\\(^2\\)/sec",
      },
      practiceSet: [
        { prompt: "The edge of a cube increases at 2 cm/sec. Find the rate of increase of its volume when the edge is 3 cm.", answer: "54 cm\\(^3\\)/sec" },
        { prompt: "The radius of a sphere decreases at 0.1 cm/sec. Find the rate at which its surface area decreases when the radius is 5 cm.", answer: "\\(4\\pi\\) cm\\(^2\\)/sec" },
      ],
      pyqExampleId: "4937dc2a-31d5-4e7e-8845-a5b4f62eccd8",
      traps: [
        {
          title: "Putting in the value before differentiating",
          body: "If you put the radius into \\(A = \\pi r^2\\) first, \\(A\\) becomes a number and its derivative is 0. Differentiate first, substitute after.",
        },
        {
          title: "An answer without its unit",
          body: "A rate of area is in cm\\(^2\\)/sec and a rate of volume in cm\\(^3\\)/sec. A bare number, or the wrong power of cm, costs the final mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-vessels",
      name: "Water level in a cylinder or a cone",
      intuition:
        "In a cylinder the radius never changes, so the volume depends on the height alone. In a cone the water itself forms a smaller cone of the same shape, so its radius grows with its depth. Use similar triangles to write the radius in terms of the depth before you differentiate.",
      definition:
        "- Cylinder of fixed radius \\(r\\): \\(V = \\pi r^2 h\\), so \\(\\dfrac{dV}{dt} = \\pi r^2 \\dfrac{dh}{dt}\\).\n" +
        "- Water in an inverted cone of height \\(H\\) and base radius \\(R\\): at depth \\(h\\), \\(\\dfrac{r}{h} = \\dfrac{R}{H}\\).\n" +
        "- If the cone's semi-vertical angle is \\(\\alpha\\), then \\(r = h\\tan\\alpha\\).\n" +
        "- Replace \\(r\\) by its value in \\(h\\) first, so that \\(V = \\dfrac{1}{3}\\pi r^2 h\\) depends on \\(h\\) alone; then differentiate.\n" +
        "- A tank being emptied has \\(\\dfrac{dV}{dt}\\) negative, and the level falls.",
      formula: {
        label: "Water in a cone",
        latex: "V = \\frac{1}{3}\\pi r^2 h, \\quad r = h\\tan\\alpha \\;\\Rightarrow\\; V = \\frac{1}{3}\\pi h^3 \\tan^2\\alpha",
      },
      authoredExample: {
        prompt:
          "Water flows at 4 cm\\(^3\\)/sec into an inverted cone of height 12 cm and base radius 4 cm. Find the rate at which the water level rises when the depth is 6 cm.",
        steps: [
          "Given: \\(\\dfrac{dV}{dt} = 4\\) cm\\(^3\\)/sec, \\(h = 6\\) cm.",
          "Similar triangles: \\(\\dfrac{r}{h} = \\dfrac{4}{12}\\), so \\(r = \\dfrac{h}{3}\\).",
          "\\(V = \\dfrac{1}{3}\\pi \\left(\\dfrac{h}{3}\\right)^2 h = \\dfrac{\\pi h^3}{27}\\).",
          "Differentiate w.r.t. \\(t\\): \\(\\dfrac{dV}{dt} = \\dfrac{\\pi h^2}{9} \\dfrac{dh}{dt}\\).",
          "Substitute: \\(4 = \\dfrac{\\pi (36)}{9} \\dfrac{dh}{dt} = 4\\pi \\dfrac{dh}{dt}\\), so \\(\\dfrac{dh}{dt} = \\dfrac{1}{\\pi}\\).",
        ],
        answer: "The level rises at \\(\\dfrac{1}{\\pi}\\) cm/sec, about 0.32 cm/sec",
      },
      selfCheckExample: {
        prompt: "Water stands at depth \\(h\\) in an inverted cone of semi-vertical angle \\(45^\\circ\\). Write the volume of the water in terms of \\(h\\).",
        steps: ["\\(r = h\\tan 45^\\circ = h\\).", "\\(V = \\dfrac{1}{3}\\pi h^2 \\cdot h\\)."],
        answer: "\\(V = \\dfrac{\\pi h^3}{3}\\)",
      },
      practiceSet: [
        { prompt: "An inverted cone has height 9 cm and base radius 3 cm. Write the radius of the water surface when the water is \\(h\\) cm deep.", answer: "\\(r = \\dfrac{h}{3}\\)" },
        {
          prompt: "Water is poured at \\(9\\pi\\) cm\\(^3\\)/sec into an inverted cone of semi-vertical angle \\(45^\\circ\\). How fast does the depth rise when it is 3 cm?",
          answer: "1 cm/sec",
        },
      ],
      pyqExampleId: "31436896-707f-47b2-84ba-e56f24bd1c64",
      traps: [
        {
          title: "Differentiating a cone's volume with r still in it",
          body: "In a cone both \\(r\\) and \\(h\\) change as the water rises. Treating \\(r\\) as a constant gives a wrong rate; replace \\(r\\) by its value in \\(h\\) first.",
        },
        {
          title: "Losing the minus sign of an emptying tank",
          body: "When water is drawn out, \\(\\dfrac{dV}{dt}\\) is negative, so \\(\\dfrac{dh}{dt}\\) comes out negative. Say in words that the level is falling at that rate.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-related",
      name: "Shadows, ladders and points moving on a curve",
      intuition:
        "Draw the figure, name the lengths that change as x and y, and find the equation that links them: similar triangles for a shadow, Pythagoras for a ladder, the curve's own equation for a moving point. Differentiating that equation with respect to t links the two rates.",
      definition:
        "- **Lamp post and man:** similar triangles give the shadow's length in terms of the man's distance from the post. The tip of the shadow moves at the man's speed plus the rate at which the shadow grows.\n" +
        "- **Ladder of length \\(l\\):** with the foot \\(x\\) from the wall and the top \\(y\\) up the wall, \\(x^2 + y^2 = l^2\\), so \\(x\\dfrac{dx}{dt} + y\\dfrac{dy}{dt} = 0\\).\n" +
        "- **Point on a curve:** differentiate the curve's equation w.r.t. \\(t\\). 'y changes \\(k\\) times as fast as x' means \\(\\dfrac{dy}{dt} = k\\dfrac{dx}{dt}\\).\n" +
        "- A negative rate means that length is getting shorter, such as the top of a ladder sliding down.",
      formula: {
        label: "Ladder against a wall",
        latex: "x^2 + y^2 = l^2 \\;\\Rightarrow\\; x\\frac{dx}{dt} + y\\frac{dy}{dt} = 0",
      },
      authoredExample: {
        prompt: "A man 1.6 m tall walks away from a lamp post 4.8 m high at 1.5 m/sec. Find the rate at which his shadow lengthens.",
        steps: [
          "Let \\(x\\) be the man's distance from the post and \\(s\\) the length of his shadow. Given \\(\\dfrac{dx}{dt} = 1.5\\) m/sec.",
          "Similar triangles: \\(\\dfrac{4.8}{x + s} = \\dfrac{1.6}{s}\\), so \\(4.8s = 1.6x + 1.6s\\).",
          "\\(3.2s = 1.6x\\), so \\(s = \\dfrac{x}{2}\\).",
          "Differentiate w.r.t. \\(t\\): \\(\\dfrac{ds}{dt} = \\dfrac{1}{2}\\dfrac{dx}{dt} = \\dfrac{1}{2}(1.5) = 0.75\\).",
        ],
        answer: "The shadow lengthens at 0.75 m/sec",
      },
      selfCheckExample: {
        prompt: "A point moves along the curve \\(y = x^2\\). Find the point where \\(y\\) changes 4 times as fast as \\(x\\).",
        steps: ["\\(\\dfrac{dy}{dt} = 2x\\dfrac{dx}{dt}\\), and this must equal \\(4\\dfrac{dx}{dt}\\).", "So \\(2x = 4\\), \\(x = 2\\) and \\(y = 4\\)."],
        answer: "\\((2, 4)\\)",
      },
      practiceSet: [
        { prompt: "A point moves on the curve \\(y^2 = 8x\\) with \\(x\\) increasing at 2 units/sec. How fast is \\(y\\) changing at the point \\((2, 4)\\)?", answer: "2 units/sec" },
        { prompt: "The tip of a man's shadow moves at 2 m/sec while the shadow lengthens at 0.5 m/sec. How fast is the man walking?", answer: "1.5 m/sec" },
      ],
      pyqExampleId: "99de494d-d64a-4852-8c2e-9f1a5593b576",
      traps: [
        {
          title: "Giving a negative number as the answer",
          body: "A result such as \\(\\dfrac{dy}{dt} = -0.6\\) means \\(y\\) is decreasing. Write 'the top of the ladder slides down at 0.6 m/sec', not 'the speed is \\(-0.6\\)'.",
        },
        {
          title: "Mixing up the shadow and its tip",
          body: "The rate of the shadow's length and the speed of its tip are different answers. The tip is at distance \\(x + s\\) from the post, so its speed is \\(\\dfrac{dx}{dt} + \\dfrac{ds}{dt}\\).",
        },
      ],
    },
  ],
};
