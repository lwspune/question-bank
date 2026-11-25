import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_AD_RATES_NOTE: SubtopicNote = {
  subtopicName: "Rate of Change of Quantities",
  title: "Rate of Change of Quantities",
  oneLineDefinition:
    "The derivative as a rate of change: one quantity with respect to another, marginal cost and revenue, rates in time linked by the chain rule, shapes held to one variable, and a point moving along a curve.",
  whyItMatters:
    "80 questions, forty-nine of them from board papers in every year from 2023 to 2026. The board asks for a rate in time from a formula: the volume or surface area of a cube, sphere or cylinder (2024 to 2026), the area of a circle or an equilateral triangle (2024, 2025), and a proof that one rate varies as or inversely as the radius (2023, 2026). Case studies put the rate inside a cone (a conical tank 2023, juice cups 2026), a speed camera's angle of elevation (2024), a ladder sliding down a wall (2025) and the fuel used at a given speed (2024); a sand cone (2024) and a perfume bottle (2026) come as short answers. It also asks for the point on a curve where y changes k times as fast as x (2023) and how fast the slope of a curve changes (2024, 2025). The textbook adds Exercise 6.1, its examples, and marginal cost and revenue.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmad-wrt",
      name: "Rate of change with respect to a variable, marginal cost and revenue",
      intuition:
        "The derivative \\(\\dfrac{dy}{dx}\\) says how fast y changes as x changes, at that very value of x. If A is the area of a circle and r its radius, \\(\\dfrac{dA}{dr}\\) is how many square centimetres the area gains per centimetre of radius, at that radius. The same idea in money is marginal cost: how fast the total cost grows per extra unit produced.",
      definition:
        "- If \\(y = f(x)\\), then \\(\\dfrac{dy}{dx}\\) is the **rate of change of \\(y\\) with respect to \\(x\\)**, and \\(\\left.\\dfrac{dy}{dx}\\right|_{x = x_0}\\) is that rate at \\(x = x_0\\).\n" +
        "- Write the formula in the variable the question names, differentiate, and only then substitute the value.\n" +
        "- If the question names the diameter, write the formula in the diameter first: \\(V = \\dfrac{4}{3}\\pi r^3 = \\dfrac{\\pi d^3}{6}\\).\n" +
        "- **Units:** the unit of y per unit of x. The rate of change of an area with respect to the radius is in cm\\(^2\\)/cm, not cm\\(^2\\)/s.\n" +
        "- **Marginal cost** is the rate of change of total cost with respect to the number of units produced, \\(MC = \\dfrac{dC}{dx}\\). **Marginal revenue** is \\(MR = \\dfrac{dR}{dx}\\).\n" +
        "- **Velocity** is the rate of change of distance with respect to time, \\(v = \\dfrac{ds}{dt}\\). A particle is at rest when \\(v = 0\\).",
      formula: {
        label: "Rate of change of y with respect to x at a point",
        latex: "\\left.\\dfrac{dy}{dx}\\right|_{x = x_0} = f'(x_0)",
        symbols: [
          { symbol: "\\(y = f(x)\\)", meaning: "the quantity that changes" },
          { symbol: "\\(x_0\\)", meaning: "the value of x at which the rate is asked" },
        ],
      },
      authoredExample: {
        prompt:
          "The total cost in rupees of producing \\(x\\) units of an item is \\(C(x) = 0.002x^3 - 0.05x^2 + 20x + 800\\). Find the marginal cost when 10 units are produced.",
        steps: [
          "Marginal cost is the rate of change of total cost with respect to the output: \\(MC = \\dfrac{dC}{dx}\\).",
          "\\(\\dfrac{dC}{dx} = 0.006x^2 - 0.1x + 20\\).",
          "At \\(x = 10\\): \\(MC = 0.006(100) - 0.1(10) + 20\\).",
          "\\(= 0.6 - 1 + 20 = 19.6\\).",
          "So the marginal cost when 10 units are produced is ₹ 19.60.",
        ],
        answer: "₹ 19.60",
      },
      selfCheckExample: {
        prompt: "Find the rate of change of the volume of a cube with respect to its edge when the edge is 4 cm.",
        steps: ["\\(V = x^3\\), so \\(\\dfrac{dV}{dx} = 3x^2 = 3(16) = 48\\)."],
        answer: "48 cm\\(^3\\)/cm",
      },
      practiceSet: [
        {
          prompt: "Find the rate of change of the area of a circle with respect to its diameter when the diameter is 6 cm.",
          answer: "\\(A = \\dfrac{\\pi d^2}{4}\\), so \\(\\dfrac{dA}{dd} = \\dfrac{\\pi d}{2} = 3\\pi\\) cm\\(^2\\)/cm",
        },
        {
          prompt: "The revenue in rupees from selling \\(x\\) units is \\(R(x) = 2x^2 + 10x + 7\\). Find the marginal revenue when \\(x = 8\\).",
          answer: "\\(R'(x) = 4x + 10\\), so the marginal revenue is ₹ 42",
        },
        {
          prompt: "The distance in metres moved by a particle in \\(t\\) seconds is \\(s = 48t - t^3\\). After how many seconds does it come to rest?",
          answer: "\\(v = 48 - 3t^2 = 0\\) gives \\(t = 4\\) (the root \\(t = -4\\) is rejected): after 4 seconds",
        },
      ],
      pyqExampleId: "2f54c855-978e-4dd9-8f77-64307856404b",
      traps: [
        {
          title: "Giving the value instead of the rate",
          body: "The surface area of a sphere of radius 4 cm is \\(64\\pi\\) cm\\(^2\\), but its rate of change with respect to r is \\(8\\pi r = 32\\pi\\) cm\\(^2\\)/cm. Differentiate first, then substitute.",
        },
        {
          title: "Differentiating in the wrong variable",
          body: "'With respect to the diameter' means write the volume as \\(\\dfrac{\\pi d^3}{6}\\) and differentiate in d. Differentiating \\(\\dfrac{4}{3}\\pi r^3\\) in r answers a different question and gives twice the right value.",
        },
        {
          title: "Using the given expression as the radius",
          body: "When a question gives the diameter as an expression in x, halve it first to get the radius. Putting the whole expression in for r makes the volume eight times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-time",
      name: "Rates in time: the chain rule",
      intuition:
        "When a balloon is blown up, its radius, surface area and volume all grow with time. You are told how fast one of them changes and asked how fast another changes. A formula links the two quantities; differentiating that formula with respect to time links their rates.",
      definition:
        "- If \\(y = f(x)\\) and both change with time \\(t\\), then \\(\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt}\\) (Chain Rule).\n" +
        "- **Step 1:** name the variables and write each given rate with its sign. A decreasing quantity has a negative rate.\n" +
        "- **Step 2:** write the formula that links the quantities.\n" +
        "- **Step 3:** differentiate both sides with respect to \\(t\\).\n" +
        "- **Step 4:** substitute the values at the instant asked, only after differentiating.\n" +
        "- **Step 5:** answer with the unit, and say whether the quantity is increasing or decreasing.\n" +
        "- When the given rate belongs to a third quantity (surface area given, volume asked), find \\(\\dfrac{dr}{dt}\\) first and carry it across.\n" +
        "- When two lengths change together, differentiate the product: for \\(V = \\pi r^2 h\\), \\(\\dfrac{dV}{dt} = \\pi\\left(2rh\\dfrac{dr}{dt} + r^2\\dfrac{dh}{dt}\\right)\\).\n" +
        "- **A 'varies inversely' proof:** call the constant rate k, find the asked rate in terms of r, and show it equals a constant divided by r.",
      formula: {
        label: "Chain rule for rates in time",
        latex: "\\dfrac{dy}{dt} = \\dfrac{dy}{dx} \\cdot \\dfrac{dx}{dt}",
        symbols: [
          { symbol: "\\(\\dfrac{dx}{dt}\\)", meaning: "the given rate" },
          { symbol: "\\(\\dfrac{dy}{dx}\\)", meaning: "from the formula linking y and x" },
        ],
      },
      authoredExample: {
        prompt:
          "The volume of a spherical balloon is increasing at \\(32\\pi\\) cm\\(^3\\)/s. Find the rate at which its surface area is increasing when the radius is 4 cm.",
        steps: [
          "Let r be the radius at time t. Then \\(V = \\dfrac{4}{3}\\pi r^3\\) and \\(S = 4\\pi r^2\\). Given \\(\\dfrac{dV}{dt} = 32\\pi\\) cm\\(^3\\)/s.",
          "Differentiating V with respect to t: \\(\\dfrac{dV}{dt} = 4\\pi r^2 \\dfrac{dr}{dt}\\).",
          "At \\(r = 4\\): \\(32\\pi = 4\\pi(16)\\dfrac{dr}{dt}\\), so \\(\\dfrac{dr}{dt} = \\dfrac{1}{2}\\) cm/s.",
          "Differentiating S with respect to t: \\(\\dfrac{dS}{dt} = 8\\pi r \\dfrac{dr}{dt}\\).",
          "At \\(r = 4\\): \\(\\dfrac{dS}{dt} = 8\\pi(4)\\left(\\dfrac{1}{2}\\right) = 16\\pi\\).",
          "The surface area is increasing at \\(16\\pi\\) cm\\(^2\\)/s.",
        ],
        answer: "\\(16\\pi\\) cm\\(^2\\)/s, increasing",
      },
      selfCheckExample: {
        prompt: "The radius of a circular plate is decreasing at 0.2 cm/s. At what rate is its area changing when the radius is 10 cm?",
        steps: [
          "\\(A = \\pi r^2\\), so \\(\\dfrac{dA}{dt} = 2\\pi r\\dfrac{dr}{dt}\\), with \\(\\dfrac{dr}{dt} = -0.2\\).",
          "At \\(r = 10\\): \\(\\dfrac{dA}{dt} = 2\\pi(10)(-0.2) = -4\\pi\\).",
        ],
        answer: "The area is decreasing at \\(4\\pi\\) cm\\(^2\\)/s",
      },
      practiceSet: [
        {
          prompt: "The edge of a cube is increasing at 2 cm/s. How fast is its volume increasing when the edge is 5 cm?",
          answer: "\\(\\dfrac{dV}{dt} = 3x^2\\dfrac{dx}{dt} = 3(25)(2) = 150\\) cm\\(^3\\)/s",
        },
        {
          prompt: "Water is poured into a cylindrical tank of radius 5 m at \\(75\\pi\\) m\\(^3\\)/min. How fast is the water level rising?",
          answer: "\\(V = 25\\pi h\\), so \\(\\dfrac{dh}{dt} = \\dfrac{75\\pi}{25\\pi} = 3\\) m/min, whatever the depth",
        },
        {
          prompt: "The volume of a cube increases at a constant rate k. Show that the rate at which its edge increases varies inversely as the square of the edge.",
          answer: "\\(k = 3x^2\\dfrac{dx}{dt}\\), so \\(\\dfrac{dx}{dt} = \\dfrac{k}{3x^2}\\), a constant times \\(\\dfrac{1}{x^2}\\)",
        },
      ],
      pyqExampleId: "e8edca56-25b1-44ca-85d2-a28036df5403",
      traps: [
        {
          title: "Substituting before differentiating",
          body: "Put \\(r = 4\\) into \\(V = \\dfrac{4}{3}\\pi r^3\\) first and V becomes a number, whose derivative is 0. Differentiate the general formula, then put in the values for the instant.",
        },
        {
          title: "Dropping the sign of a decreasing quantity",
          body: "'Leaking at', 'decreasing at' or 'pulled towards the wall' means the rate is negative. Write the minus sign in the working, and turn it back into words in the answer: 'decreasing at ...'.",
        },
        {
          title: "Fixed radius or changing radius",
          body: "Sand poured into a cylindrical tank has a fixed radius, so only h changes in \\(V = \\pi r^2 h\\). A cylinder whose radius and height both change needs the product rule; treating one as fixed loses most of the marks.",
        },
        {
          title: "A proof with no constant in it",
          body: "In a 'varies inversely' proof, name the constant rate (\\(\\dfrac{dV}{dt} = k\\)) and end with the rate equal to a constant divided by r. When a question says the surface area 'varies inversely as the radius', it means the rate of change of the surface area.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-shape",
      name: "Cones, ladders and shadows: fix the shape, then differentiate",
      intuition:
        "Water in a cone, a ladder against a wall or a man's shadow has two lengths changing at once. But the shape ties them together: the cone's angle is fixed, the ladder's length is fixed, two triangles are similar. Use that tie to write the quantity in ONE variable before you differentiate, and the problem becomes the simple kind.",
      definition:
        "- **A cone of fixed semi-vertical angle \\(\\alpha\\):** \\(\\tan\\alpha = \\dfrac{r}{h}\\), so \\(r = h\\tan\\alpha\\) and \\(V = \\dfrac{1}{3}\\pi r^2 h\\) becomes a function of h alone.\n" +
        "- **A given ratio** ('the height is always one-third of the radius'): write \\(r = 3h\\) and put it into the volume.\n" +
        "- **A ladder of fixed length l:** \\(x^2 + y^2 = l^2\\). Differentiating, \\(x\\dfrac{dx}{dt} + y\\dfrac{dy}{dt} = 0\\).\n" +
        "- **A shadow:** similar triangles make the shadow a fixed multiple of the man's distance from the lamp post.\n" +
        "- **An angle of elevation:** \\(\\tan\\theta = \\dfrac{\\text{height}}{x}\\), so \\(\\theta = \\tan^{-1}\\dfrac{\\text{height}}{x}\\), and \\(\\dfrac{d\\theta}{dt} = \\dfrac{d\\theta}{dx}\\cdot\\dfrac{dx}{dt}\\).\n" +
        "- **The wet surface of a cone** is its curved surface \\(\\pi r l\\), with slant height \\(l = \\sqrt{r^2 + h^2}\\).",
      formula: {
        label: "Volume of a cone held to its depth",
        latex: "V = \\dfrac{1}{3}\\pi r^2 h,\\quad r = h\\tan\\alpha \\;\\Rightarrow\\; V = \\dfrac{\\pi}{3}h^3\\tan^2\\alpha",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "the semi-vertical angle, between the axis and the slant side" },
          { symbol: "\\(h\\)", meaning: "the depth of water, measured from the vertex" },
        ],
      },
      authoredExample: {
        prompt:
          "Water runs into a conical dish, vertex down, at 8 cm\\(^3\\)/s. The radius of the water surface is always twice the depth of the water. How fast is the depth rising when the depth is 2 cm?",
        steps: [
          "Let h be the depth and r the radius of the water surface at time t. Given \\(r = 2h\\) and \\(\\dfrac{dV}{dt} = 8\\) cm\\(^3\\)/s.",
          "\\(V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi (2h)^2 h = \\dfrac{4}{3}\\pi h^3\\), a function of h alone.",
          "Differentiating with respect to t: \\(\\dfrac{dV}{dt} = 4\\pi h^2 \\dfrac{dh}{dt}\\).",
          "At \\(h = 2\\): \\(8 = 4\\pi(4)\\dfrac{dh}{dt} = 16\\pi\\dfrac{dh}{dt}\\).",
          "\\(\\dfrac{dh}{dt} = \\dfrac{8}{16\\pi} = \\dfrac{1}{2\\pi}\\) cm/s.",
        ],
        answer: "The depth is rising at \\(\\dfrac{1}{2\\pi}\\) cm/s",
      },
      selfCheckExample: {
        prompt:
          "A ladder 13 m long leans against a wall. Its foot slides away from the wall at 1.5 m/s. How fast is its top sliding down when the foot is 5 m from the wall?",
        steps: [
          "\\(x^2 + y^2 = 169\\); at \\(x = 5\\), \\(y = 12\\).",
          "\\(2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0\\) gives \\(5(1.5) + 12\\dfrac{dy}{dt} = 0\\), so \\(\\dfrac{dy}{dt} = -\\dfrac{5}{8}\\).",
        ],
        answer: "The top slides down at \\(\\dfrac{5}{8}\\) m/s",
      },
      practiceSet: [
        {
          prompt: "A girl 1.5 m tall walks away from a lamp post 4.5 m high at 3 m/s. How fast does her shadow lengthen?",
          answer: "If l is her distance from the post and s her shadow, \\(\\dfrac{s}{1.5} = \\dfrac{l + s}{4.5}\\) gives \\(s = \\dfrac{l}{2}\\), so the shadow lengthens at 1.5 m/s",
        },
        {
          prompt: "A camera on top of a 10 m pole watches a car moving away along the road at 15 m/s. Find the rate of change of the angle of elevation of the camera from the car when the car is 20 m from the pole.",
          answer: "\\(\\theta = \\tan^{-1}\\dfrac{10}{x}\\), \\(\\dfrac{d\\theta}{dx} = \\dfrac{-10}{100 + x^2} = -\\dfrac{1}{50}\\) at \\(x = 20\\), so \\(\\dfrac{d\\theta}{dt} = -\\dfrac{3}{10}\\) rad/s: the angle decreases at 0.3 rad/s",
        },
        {
          prompt: "Write the volume of water in a conical tank, vertex down, with semi-vertical angle \\(30^\\circ\\), in terms of the depth h.",
          answer: "\\(r = h\\tan 30^\\circ = \\dfrac{h}{\\sqrt{3}}\\), so \\(V = \\dfrac{\\pi h^3}{9}\\)",
        },
      ],
      pyqExampleId: "2ec986dc-7b41-4891-950a-9e4e51ce690c",
      traps: [
        {
          title: "Differentiating with two lengths still in the formula",
          body: "If \\(V = \\dfrac{1}{3}\\pi r^2 h\\) still has both r and h, you need \\(\\dfrac{dr}{dt}\\) as well, which you are not given. Use the shape condition to remove one of them BEFORE differentiating.",
        },
        {
          title: "Taking the semi-vertical angle the wrong way",
          body: "The semi-vertical angle is between the axis and the slant side, so \\(\\tan\\alpha = \\dfrac{r}{h}\\), not \\(\\dfrac{h}{r}\\).",
        },
        {
          title: "Adding the top to the wet surface",
          body: "The wet surface of a cone of water is only the curved surface \\(\\pi r l\\). The open water surface at the top is not part of it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-curve",
      name: "A point moving on a curve, and the rate of change of its slope",
      intuition:
        "A particle moving along a curve has both coordinates changing with time. Differentiate the curve's equation with respect to t and you get one relation between \\(\\dfrac{dy}{dt}\\) and \\(\\dfrac{dx}{dt}\\). A phrase such as 'y changes 8 times as fast as x' gives a second relation, and the two together fix the point.",
      definition:
        "- Differentiate the equation of the curve with respect to t, keeping \\(\\dfrac{dx}{dt}\\) and \\(\\dfrac{dy}{dt}\\) in it.\n" +
        "- 'The ordinate changes k times as fast as the abscissa' means \\(\\dfrac{dy}{dt} = k\\dfrac{dx}{dt}\\), that is \\(\\dfrac{dy}{dx} = k\\) at the point.\n" +
        "- 'They change at the same rate' means \\(\\dfrac{dy}{dt} = \\dfrac{dx}{dt}\\). Cancel this common rate: it is not zero, or the point would not be moving.\n" +
        "- Solve for x, keep every root the curve allows, then find y from the curve's equation and write the points.\n" +
        "- **The rate of change of the slope:** the slope is \\(m = \\dfrac{dy}{dx}\\), a function of x. Then \\(\\dfrac{dm}{dt} = \\dfrac{dm}{dx}\\cdot\\dfrac{dx}{dt}\\).",
      formula: {
        label: "y changing k times as fast as x",
        latex: "\\dfrac{dy}{dt} = k\\,\\dfrac{dx}{dt} \\;\\Rightarrow\\; \\dfrac{dy}{dx} = k",
      },
      authoredExample: {
        prompt:
          "A particle moves along the curve \\(4y = x^3\\). Find the points at which its y-coordinate is changing 3 times as fast as its x-coordinate.",
        steps: [
          "Differentiating \\(4y = x^3\\) with respect to t: \\(4\\dfrac{dy}{dt} = 3x^2\\dfrac{dx}{dt}\\).",
          "Given \\(\\dfrac{dy}{dt} = 3\\dfrac{dx}{dt}\\). Substituting: \\(12\\dfrac{dx}{dt} = 3x^2\\dfrac{dx}{dt}\\).",
          "\\(\\dfrac{dx}{dt} \\neq 0\\) (the particle is moving), so \\(3x^2 = 12\\), \\(x^2 = 4\\), \\(x = \\pm 2\\).",
          "From the curve: \\(x = 2\\) gives \\(4y = 8\\), \\(y = 2\\); \\(x = -2\\) gives \\(4y = -8\\), \\(y = -2\\).",
        ],
        answer: "\\((2, 2)\\) and \\((-2, -2)\\)",
      },
      selfCheckExample: {
        prompt: "For the curve \\(y = x^3 - 6x\\), x increases at 3 units/s. How fast is the slope of the curve changing when \\(x = 1\\)?",
        steps: [
          "Slope \\(m = 3x^2 - 6\\), so \\(\\dfrac{dm}{dt} = 6x\\dfrac{dx}{dt} = 18x\\).",
          "At \\(x = 1\\): \\(\\dfrac{dm}{dt} = 18\\).",
        ],
        answer: "The slope is increasing at 18 units/s",
      },
      practiceSet: [
        {
          prompt: "A point moves along \\(y = 2x^2 + 1\\) with x increasing at 0.5 units/s. Find the rate of change of y when \\(x = 3\\).",
          answer: "\\(\\dfrac{dy}{dt} = 4x\\dfrac{dx}{dt} = 4(3)(0.5) = 6\\) units/s",
        },
        {
          prompt: "A particle moves along \\(y = x^3\\). Find the points at which y changes 12 times as fast as x.",
          answer: "\\(3x^2 = 12\\), \\(x = \\pm 2\\): the points \\((2, 8)\\) and \\((-2, -8)\\)",
        },
        {
          prompt: "For \\(y = 5x^2 - x^3\\), find the rate of change of the slope with respect to x at \\(x = 1\\).",
          answer: "\\(m = 10x - 3x^2\\), \\(\\dfrac{dm}{dx} = 10 - 6x = 4\\)",
        },
      ],
      pyqExampleId: "26d4b005-d992-408b-a231-cdab96c78733",
      traps: [
        {
          title: "Keeping only the positive root",
          body: "\\(x^2 = 16\\) gives \\(x = 4\\) AND \\(x = -4\\). On a cubic curve both points exist, so both are answers. Reject a root only when the curve or the question rules it out.",
        },
        {
          title: "Finding the rate of y when the rate of the slope is asked",
          body: "When the question asks how fast the SLOPE changes, write the slope \\(\\dfrac{dy}{dx}\\) as a function of x and differentiate it once more. Finding \\(\\dfrac{dy}{dt}\\) answers a different question.",
        },
        {
          title: "Stopping at x",
          body: "The question asks for points. After finding x, put it into the curve's equation to get y, and write each point in brackets.",
        },
      ],
    },
  ],
};
