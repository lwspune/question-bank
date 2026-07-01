import type { SubtopicNote } from "@/app/notes/_types";

export const RATE_OF_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Rate of Change and Related Rates",
  title: "Rate of Change and Related Rates",
  oneLineDefinition:
    "A derivative is a rate. When two quantities are linked by a geometric or physical relation, differentiate the relation with respect to time (the chain rule) to convert a known rate into an unknown one.",
  whyItMatters:
    "This is one of the most reliably-tested MHT-CET applications: 40 PYQs sit here (8 HARD, 20 MODERATE, 12 EASY). Almost every question is one clean pattern — write the relation between the quantities, differentiate w.r.t. t, substitute the given rate and the instant. " +
    "The recurring traps are unit conversions (cm vs m vs decimetre), the r = h/2 substitution for cones, taking the magnitude when a quantity is decreasing, and remembering that 'rate of A w.r.t. B' is (dA/dt)/(dB/dt), not A/B.",
  concepts: [
    // 1 — FOUNDATION: the chain that links two rates (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetaod-rate-chain-foundation",
      name: "Rate of Change as a Chain of Derivatives",
      intuition:
        "Every related-rates question is the same idea: a quantity Q depends on a variable, and everything moves in time. So dQ/dt = (dQ/d[variable]) times (d[variable]/dt). And the 'rate of Q with respect to another quantity P' is just (dQ/dt) divided by (dP/dt) — the time cancels. Set the relation up, then differentiate w.r.t. t.",
      definition:
        "Two facts drive the whole subtopic:\n" +
        "- **Time rate via the chain rule:** if \\(Q = Q(x)\\) and \\(x = x(t)\\), then \\(\\dfrac{dQ}{dt} = \\dfrac{dQ}{dx}\\cdot\\dfrac{dx}{dt}\\). Differentiate the relation w.r.t. \\(t\\), then substitute the known rate and the given instant.\n" +
        "- **Rate of one quantity w.r.t. another:** \\(\\dfrac{dQ}{dP} = \\dfrac{dQ/dt}{dP/dt} = \\dfrac{dQ/dx}{dP/dx}\\). This is a RATIO of derivatives, never \\(Q/P\\).\n" +
        "The most tested instance is volume vs. surface area of a sphere: with \\(V = \\tfrac43\\pi r^3\\) and \\(S = 4\\pi r^2\\), \\(\\dfrac{dV}{dS} = \\dfrac{dV/dr}{dS/dr} = \\dfrac{4\\pi r^2}{8\\pi r} = \\dfrac{r}{2}\\).",
      formula: {
        label: "The two rate relations",
        latex:
          "\\dfrac{dQ}{dt} = \\dfrac{dQ}{dx}\\cdot\\dfrac{dx}{dt} \\qquad \\dfrac{dQ}{dP} = \\dfrac{dQ/dt}{dP/dt}",
        symbols: [
          { symbol: "Q, P", meaning: "the two quantities being compared" },
          { symbol: "dx/dt", meaning: "the given rate of the driving variable" },
        ],
      },
      authoredExample: {
        prompt:
          "The rate of change of the volume of a sphere w.r.t. its surface area, when the radius is \\(4\\) m, is?",
        steps: [
          "\\(V = \\tfrac43\\pi r^3\\), \\(S = 4\\pi r^2\\).",
          "\\(\\dfrac{dV}{dS} = \\dfrac{dV/dr}{dS/dr} = \\dfrac{4\\pi r^2}{8\\pi r} = \\dfrac{r}{2}\\).",
          "At \\(r = 4\\): \\(\\dfrac{dV}{dS} = \\dfrac{4}{2} = 2\\) m.",
        ],
        answer: "\\(2\\) m",
      },
      selfCheckExample: {
        prompt:
          "A firm's cost \\(C\\) and revenue \\(R\\) both depend on output \\(x\\), with \\(\\dfrac{dC}{dx} = 3\\) and \\(\\dfrac{dR}{dx} = 5\\) at some level. Find the rate of change of revenue with respect to cost there.",
        steps: [
          "\\(\\dfrac{dR}{dC} = \\dfrac{dR/dx}{dC/dx}\\).",
          "\\(= \\dfrac{5}{3}\\).",
        ],
        answer: "\\(\\dfrac{5}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{dV}{dS}\\) for a sphere in terms of \\(r\\)?", answer: "\\(\\dfrac{r}{2}\\)", method: "\\(\\dfrac{4\\pi r^2}{8\\pi r}\\)" },
        { prompt: "Sphere: \\(\\dfrac{dV}{dS}\\) at \\(r = 6\\)?", answer: "\\(3\\)", method: "\\(r/2 = 6/2\\)" },
        { prompt: "\\(y = y(t)\\), \\(x = x(t)\\): rate of \\(y\\) w.r.t. \\(x\\)?", answer: "\\(\\dfrac{dy/dt}{dx/dt}\\)", method: "time cancels" },
        { prompt: "Is 'rate of \\(A\\) w.r.t. \\(B\\)' equal to \\(A/B\\)?", answer: "No", method: "it is \\((dA/dt)/(dB/dt)\\)" },
      ],
      traps: [
        {
          title: "'Rate of \\(A\\) w.r.t. \\(B\\)' is a RATIO of derivatives, not \\(A/B\\)",
          body:
            "For volume w.r.t. surface area, do NOT compute \\(V/S\\). Use \\(\\dfrac{dV}{dS} = \\dfrac{dV/dr}{dS/dr} = \\dfrac{r}{2}\\). The single most common slip here is dividing the quantities instead of their derivatives.",
        },
        {
          title: "Everything moves in time — differentiate w.r.t. \\(t\\)",
          body:
            "A relation like \\(A = \\pi r^2\\) is static. The moment a rate \\(\\tfrac{dr}{dt}\\) is given, differentiate w.r.t. \\(t\\): \\(\\tfrac{dA}{dt} = 2\\pi r\\,\\tfrac{dr}{dt}\\). Forgetting the \\(\\tfrac{dr}{dt}\\) factor leaves you with \\(2\\pi r\\), which is not a rate.",
        },
      ],
    },

    // 2 — sphere / circle / square geometric related rates (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-related-rates-circle-sphere-square",
      name: "Related Rates: Circle, Sphere, and Square",
      intuition:
        "Pick the right geometric formula, differentiate it w.r.t. time, then plug in the given rate and the instant. A growing ripple is a circle (area \\(\\pi r^2\\)); a balloon is a sphere; a contracting plate is a square. The only skill is knowing which formula and differentiating cleanly.",
      definition:
        "Standard formulas to differentiate w.r.t. \\(t\\):\n" +
        "- **Circle:** \\(A = \\pi r^2 \\Rightarrow \\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt}\\).\n" +
        "- **Sphere:** \\(V = \\tfrac43\\pi r^3 \\Rightarrow \\dfrac{dV}{dt} = 4\\pi r^2\\,\\dfrac{dr}{dt}\\); \\(S = 4\\pi r^2 \\Rightarrow \\dfrac{dS}{dt} = 8\\pi r\\,\\dfrac{dr}{dt}\\).\n" +
        "- **Square (side \\(a\\)):** area \\(A = a^2\\), perimeter \\(P = 4a\\), diagonal \\(d = a\\sqrt2\\) so \\(A = \\tfrac{d^2}{2}\\).\n" +
        "When only the AREA rate is given but the perimeter rate is wanted, chain through the side: \\(\\dfrac{dP}{dt} = 4\\dfrac{da}{dt}\\) and \\(\\dfrac{dA}{dt} = 2a\\dfrac{da}{dt}\\).",
      formula: {
        label: "Sphere volume and surface area",
        latex:
          "V = \\tfrac{4}{3}\\pi r^3,\\quad S = 4\\pi r^2,\\qquad A_{\\text{circle}} = \\pi r^2",
        symbols: [
          { symbol: "r", meaning: "radius (the driving variable)" },
        ],
      },
      authoredExample: {
        prompt:
          "A ripple on a pond expands as a circle. The radius grows at \\(2\\) cm/s. How fast is the enclosed area growing when \\(r = 10\\) cm?",
        steps: [
          "\\(A = \\pi r^2\\), so \\(\\dfrac{dA}{dt} = 2\\pi r\\,\\dfrac{dr}{dt}\\).",
          "Substitute \\(r = 10\\), \\(\\dfrac{dr}{dt} = 2\\): \\(\\dfrac{dA}{dt} = 2\\pi(10)(2) = 40\\pi\\).",
        ],
        answer: "\\(40\\pi\\) cm\\(^2\\)/s",
      },
      selfCheckExample: {
        prompt:
          "A square plate contracts at \\(4\\) cm\\(^2\\)/s. Find the rate of decrease of its perimeter when the side is \\(20\\) cm.",
        steps: [
          "Area \\(A = a^2\\Rightarrow \\dfrac{dA}{dt} = 2a\\dfrac{da}{dt}\\). With \\(\\dfrac{dA}{dt} = -4\\), \\(a = 20\\): \\(\\dfrac{da}{dt} = \\dfrac{-4}{40} = -\\dfrac{1}{10}\\).",
          "Perimeter \\(P = 4a\\Rightarrow \\dfrac{dP}{dt} = 4\\dfrac{da}{dt} = 4\\left(-\\dfrac{1}{10}\\right) = -\\dfrac{2}{5}\\).",
        ],
        answer: "Perimeter decreases at \\(\\dfrac{2}{5}\\) cm/s.",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{dA}{dt}\\) for a circle in terms of \\(r\\)?", answer: "\\(2\\pi r\\dfrac{dr}{dt}\\)", method: "differentiate \\(\\pi r^2\\)" },
        { prompt: "\\(\\dfrac{dV}{dt}\\) for a sphere in terms of \\(r\\)?", answer: "\\(4\\pi r^2\\dfrac{dr}{dt}\\)", method: "differentiate \\(\\tfrac43\\pi r^3\\)" },
        { prompt: "Square: perimeter rate if side rate is \\(\\dfrac{da}{dt}\\)?", answer: "\\(4\\dfrac{da}{dt}\\)", method: "\\(P = 4a\\)" },
        { prompt: "Square area in terms of diagonal \\(d\\)?", answer: "\\(\\dfrac{d^2}{2}\\)", method: "\\(d = a\\sqrt2\\)" },
      ],
      pyqExampleId: "af76f3ef-101f-4f8f-90a4-79e71c4cbe84", // circular wave, dr/dt=2.1, pi=22/7
      traps: [
        {
          title: "Sign: a decreasing rate is negative — report the magnitude",
          body:
            "A contracting plate has \\(\\dfrac{dA}{dt} = -4\\) (negative because it shrinks). Carry the minus sign through the algebra, then report the rate of decrease as the magnitude. Dropping the sign mid-way flips the answer.",
        },
        {
          title: "Volume rate vs. surface-area rate — different factors",
          body:
            "For a sphere \\(\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}\\) but \\(\\dfrac{dS}{dt} = 8\\pi r\\dfrac{dr}{dt}\\). When a surface-area rate is GIVEN and a volume rate wanted, first back out \\(\\dfrac{dr}{dt}\\) from the \\(8\\pi r\\) relation, then feed it into the \\(4\\pi r^2\\) one.",
        },
      ],
    },

    // 3 — cone / bowl / cylinder / melting shell (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-related-rates-cone-bowl-cylinder",
      name: "Related Rates: Cone, Hemispherical Bowl, and Cylinder",
      intuition:
        "These are the harder related-rates shapes because a cone and a bowl have TWO changing lengths (radius and height) tied together by geometry. Use that tie — a cone's semi-vertical angle gives \\(r = kh\\) — to reduce the volume to ONE variable before differentiating. A melting spherical shell only changes on its outer radius.",
      definition:
        "Formulas and the key reductions:\n" +
        "- **Cone:** \\(V = \\tfrac13\\pi r^2 h\\); lateral (curved) surface \\(A = \\pi r \\ell = \\pi r\\sqrt{r^2 + h^2}\\). If the semi-vertical angle fixes \\(r = kh\\) (e.g. \\(r = h/2\\)), substitute FIRST so \\(V\\) is a function of \\(h\\) alone: \\(V = \\tfrac{\\pi h^3}{12}\\) when \\(r = h/2\\).\n" +
        "- **Hemispherical bowl of radius \\(R\\), water depth \\(x\\):** \\(V = \\pi\\left(Rx^2 - \\dfrac{x^3}{3}\\right)\\), so \\(\\dfrac{dV}{dt} = \\pi(2Rx - x^2)\\dfrac{dx}{dt}\\).\n" +
        "- **Cylinder (radius \\(R\\) fixed):** \\(V = \\pi R^2 h \\Rightarrow \\dfrac{dV}{dt} = \\pi R^2\\dfrac{dh}{dt}\\).\n" +
        "- **Melting spherical shell (inner radius \\(R\\) fixed, ice out to \\(R + r\\)):** the outer radius is \\(R + r\\), so \\(\\dfrac{dV}{dt} = 4\\pi(R + r)^2\\dfrac{dr}{dt}\\).",
      formula: {
        label: "Cone and hemispherical-bowl volumes",
        latex:
          "V_{\\text{cone}} = \\tfrac{1}{3}\\pi r^2 h,\\qquad V_{\\text{bowl}} = \\pi\\!\\left(Rx^2 - \\tfrac{x^3}{3}\\right),\\qquad V_{\\text{cyl}} = \\pi R^2 h",
        symbols: [
          { symbol: "R", meaning: "fixed radius (bowl / cylinder)" },
          { symbol: "x, h", meaning: "the changing depth / height" },
        ],
      },
      authoredExample: {
        prompt:
          "Sand is poured into an inverted cone whose semi-vertical angle is \\(\\tan^{-1}\\tfrac13\\) (so \\(r = h/3\\)) at \\(9\\) m\\(^3\\)/min. How fast is the height of the pile rising when the depth is \\(6\\) m?",
        steps: [
          "Substitute \\(r = h/3\\) FIRST: \\(V = \\tfrac13\\pi\\left(\\tfrac{h}{3}\\right)^2 h = \\dfrac{\\pi h^3}{27}\\).",
          "Differentiate w.r.t. \\(t\\): \\(\\dfrac{dV}{dt} = \\dfrac{\\pi h^2}{9}\\dfrac{dh}{dt}\\).",
          "At \\(h = 6\\): \\(9 = \\dfrac{36\\pi}{9}\\dfrac{dh}{dt} = 4\\pi\\dfrac{dh}{dt}\\).",
          "So \\(\\dfrac{dh}{dt} = \\dfrac{9}{4\\pi}\\).",
        ],
        answer: "\\(\\dfrac{9}{4\\pi}\\) m/min",
      },
      selfCheckExample: {
        prompt:
          "Water flows into a cylindrical vessel of base radius \\(3\\) m at \\(36\\) m\\(^3\\)/min. How fast is the level rising?",
        steps: [
          "\\(V = \\pi R^2 h = 9\\pi h\\), so \\(\\dfrac{dV}{dt} = 9\\pi\\dfrac{dh}{dt}\\).",
          "\\(36 = 9\\pi\\dfrac{dh}{dt}\\Rightarrow \\dfrac{dh}{dt} = \\dfrac{36}{9\\pi} = \\dfrac{4}{\\pi}\\).",
        ],
        answer: "\\(\\dfrac{4}{\\pi}\\) m/min",
      },
      practiceSet: [
        { prompt: "Cone volume with \\(r = h/2\\) in terms of \\(h\\)?", answer: "\\(\\dfrac{\\pi h^3}{12}\\)", method: "sub \\(r = h/2\\) into \\(\\tfrac13\\pi r^2h\\)" },
        { prompt: "Cone lateral surface area?", answer: "\\(\\pi r\\sqrt{r^2 + h^2}\\)", method: "\\(A = \\pi r\\ell\\)" },
        { prompt: "Cylinder (radius \\(R\\)): \\(\\dfrac{dV}{dt}\\)?", answer: "\\(\\pi R^2\\dfrac{dh}{dt}\\)", method: "only \\(h\\) changes" },
        { prompt: "Melting shell, outer radius \\(R+r\\): \\(\\dfrac{dV}{dt}\\)?", answer: "\\(4\\pi(R+r)^2\\dfrac{dr}{dt}\\)", method: "differentiate outer sphere" },
      ],
      pyqExampleId: "652d5242-7184-47c6-ab84-8c93ccffcf9b", // inverted cone r=h/2, 1/(5pi)
      traps: [
        {
          title: "Substitute \\(r = h/2\\) BEFORE differentiating a cone",
          body:
            "If you keep both \\(r\\) and \\(h\\) in \\(V = \\tfrac13\\pi r^2 h\\) and differentiate, you get a two-rate mess. The semi-vertical angle fixes \\(r = kh\\); substitute first so \\(V\\) has one variable — the algebra collapses.",
        },
        {
          title: "Melting shell: differentiate the OUTER radius, keep the inner fixed",
          body:
            "For an iron ball (radius \\(R\\)) coated with ice of thickness \\(r\\), the ice volume differentiates via the outer radius \\(R + r\\): \\(\\dfrac{dV}{dt} = 4\\pi(R + r)^2\\dfrac{dr}{dt}\\). Using the total radius wrongly (or the inner \\(R\\)) is the classic error — plug the FULL outer radius \\(R + r\\) into \\(4\\pi(\\cdot)^2\\).",
        },
      ],
    },

    // 4 — ladder / sliding rod (Pythagoras) + angle-rate variant (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-ladder-sliding-rod",
      name: "Ladder and Sliding-Rod Problems (Pythagorean Rates)",
      intuition:
        "A ladder against a wall, or a rod with ends on two axes, keeps a fixed length \\(L\\). Its foot-distance \\(x\\) and height \\(y\\) satisfy \\(x^2 + y^2 = L^2\\). Differentiate that constraint w.r.t. time and one rate gives the other. If the question asks for an ANGLE rate, use \\(\\sin\\theta = y/L\\) or \\(\\cos\\theta = x/L\\) instead.",
      definition:
        "For a rod/ladder of fixed length \\(L\\) with ends at distances \\(x\\) (horizontal) and \\(y\\) (vertical):\n" +
        "- **Length constraint:** \\(x^2 + y^2 = L^2\\). Differentiate: \\(2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0\\), so \\(\\dfrac{dy}{dt} = -\\dfrac{x}{y}\\dfrac{dx}{dt}\\).\n" +
        "- **String/kite variant:** if the string length is \\(z\\) and the height \\(h\\) is fixed, \\(x^2 + h^2 = z^2\\) gives \\(\\dfrac{dz}{dt} = \\dfrac{x}{z}\\dfrac{dx}{dt}\\).\n" +
        "- **Angle variant:** with \\(\\sin\\theta = \\dfrac{y}{L}\\), \\(\\cos\\theta\\,\\dfrac{d\\theta}{dt} = \\dfrac{1}{L}\\dfrac{dy}{dt}\\) — solve for \\(\\dfrac{d\\theta}{dt}\\) using \\(\\cos\\theta = x/L\\) at the instant.",
      formula: {
        label: "Pythagorean length constraint",
        latex:
          "x^2 + y^2 = L^2 \\;\\Rightarrow\\; \\dfrac{dy}{dt} = -\\dfrac{x}{y}\\,\\dfrac{dx}{dt}",
        symbols: [
          { symbol: "L", meaning: "fixed ladder/rod length" },
          { symbol: "x, y", meaning: "horizontal and vertical distances of the ends" },
        ],
      },
      authoredExample: {
        prompt:
          "A \\(5\\) m ladder rests against a wall. Its foot is pulled away at \\(2\\) m/s. How fast is the top sliding down when the foot is \\(4\\) m from the wall?",
        steps: [
          "\\(x^2 + y^2 = 25\\). At \\(x = 4\\): \\(y = 3\\).",
          "Differentiate: \\(2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0\\Rightarrow \\dfrac{dy}{dt} = -\\dfrac{x}{y}\\dfrac{dx}{dt}\\).",
          "\\(\\dfrac{dy}{dt} = -\\dfrac{4}{3}(2) = -\\dfrac{8}{3}\\).",
        ],
        answer: "The top descends at \\(\\dfrac{8}{3}\\) m/s.",
      },
      selfCheckExample: {
        prompt:
          "A \\(5\\) m ladder's top slides down at \\(10\\) cm/s. Find the rate at which the angle \\(\\theta\\) with the floor decreases when the foot is \\(4\\) m from the wall.",
        steps: [
          "\\(\\sin\\theta = \\dfrac{y}{5}\\Rightarrow \\cos\\theta\\,\\dfrac{d\\theta}{dt} = \\dfrac{1}{5}\\dfrac{dy}{dt}\\).",
          "Top slides down: \\(\\dfrac{dy}{dt} = -0.1\\) m/s. At foot \\(= 4\\): \\(\\cos\\theta = \\dfrac{4}{5}\\).",
          "\\(\\dfrac45\\dfrac{d\\theta}{dt} = \\dfrac15(-0.1)\\Rightarrow \\dfrac{d\\theta}{dt} = -0.025\\).",
        ],
        answer: "The angle decreases at \\(0.025\\) rad/s.",
      },
      practiceSet: [
        { prompt: "Ladder constraint for length \\(L\\)?", answer: "\\(x^2 + y^2 = L^2\\)", method: "Pythagoras" },
        { prompt: "\\(\\dfrac{dy}{dt}\\) in terms of \\(\\dfrac{dx}{dt}\\)?", answer: "\\(-\\dfrac{x}{y}\\dfrac{dx}{dt}\\)", method: "differentiate the constraint" },
        { prompt: "Ladder foot 3 m, \\(y = 4\\), foot moves \\(1\\) m/s: top rate?", answer: "\\(-\\dfrac{3}{4}\\) m/s", method: "\\(-\\tfrac{x}{y}\\dfrac{dx}{dt}\\)" },
        { prompt: "Angle relation used for \\(\\dfrac{d\\theta}{dt}\\)?", answer: "\\(\\sin\\theta = y/L\\)", method: "then differentiate w.r.t. \\(t\\)" },
      ],
      pyqExampleId: "caffb95a-e108-4eb8-8cf0-d05fc852a9d1", // ladder 5m, foot away 2 m/s, height decreasing 8/3
      traps: [
        {
          title: "Convert units before substituting",
          body:
            "A ladder is \\(5\\) m but the top slides at \\(10\\) cm/s. Work in ONE unit: \\(10\\) cm/s \\(= 0.1\\) m/s, or the length \\(5\\) m \\(= 500\\) cm. Mixing metres and centimetres is the single most common wrong answer in these problems.",
        },
        {
          title: "The sign tells you sliding up vs. down — then take the magnitude",
          body:
            "\\(\\dfrac{dy}{dt} = -\\dfrac{x}{y}\\dfrac{dx}{dt}\\) is negative when the top descends. The magnitude is the 'rate of decrease' the option lists (e.g. \\(\\tfrac85\\) ft/s downwards). Report direction from the sign, value from the magnitude.",
        },
      ],
    },

    // 5 — point moving on a curve: dy/dt = f'(x) dx/dt (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-point-moving-on-curve",
      name: "A Point Moving Along a Curve",
      intuition:
        "When a particle moves along a curve \\(y = f(x)\\), its two coordinate-rates are linked: \\(\\dfrac{dy}{dt} = f'(x)\\dfrac{dx}{dt}\\). From that you can chase any derived quantity — distance from the origin, the area of a triangle with a moving vertex, or where one coordinate changes a fixed multiple of the other.",
      definition:
        "For a point on \\(y = f(x)\\) with \\(x = x(t)\\):\n" +
        "- **Coordinate rates:** \\(\\dfrac{dy}{dt} = f'(x)\\dfrac{dx}{dt}\\). Setting \\(\\dfrac{dy}{dt} = k\\dfrac{dx}{dt}\\) gives \\(f'(x) = k\\) — solve for the points.\n" +
        "- **Distance from origin:** \\(D = \\sqrt{x^2 + y^2}\\), so \\(\\dfrac{dD}{dt} = \\dfrac{x\\,\\dot x + y\\,\\dot y}{\\sqrt{x^2 + y^2}}\\).\n" +
        "- **Area of a triangle** with one moving vertex \\((x, y)\\): write the area by the coordinate formula \\(\\Delta = \\tfrac12|\\cdots|\\) as a function of the moving parameter, then differentiate.\n" +
        "- **Implicit constraint** (e.g. on a circle \\(x^2 + y^2 = 1\\)): differentiate the constraint, \\(2x\\dot x + 2y\\dot y = 0\\), and solve for the wanted rate.",
      formula: {
        label: "Coordinate rate and distance rate on a curve",
        latex:
          "\\dfrac{dy}{dt} = f'(x)\\,\\dfrac{dx}{dt} \\qquad \\dfrac{d}{dt}\\sqrt{x^2 + y^2} = \\dfrac{x\\dot x + y\\dot y}{\\sqrt{x^2 + y^2}}",
        symbols: [
          { symbol: "\\dot x, \\dot y", meaning: "\\(dx/dt\\) and \\(dy/dt\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle moves on \\(y = x^3\\) with the abscissa increasing at \\(3\\) units/s. At \\((1, 1)\\), how fast is its distance from the origin increasing?",
        steps: [
          "\\(\\dot x = 3\\). From \\(y = x^3\\): \\(\\dot y = 3x^2\\dot x = 3(1)(3) = 9\\).",
          "\\(\\dfrac{dD}{dt} = \\dfrac{x\\dot x + y\\dot y}{\\sqrt{x^2 + y^2}}\\).",
          "\\(= \\dfrac{(1)(3) + (1)(9)}{\\sqrt{1 + 1}} = \\dfrac{12}{\\sqrt2} = 6\\sqrt2\\).",
        ],
        answer: "\\(6\\sqrt2\\) units/s",
      },
      selfCheckExample: {
        prompt:
          "A particle moves on \\(y = \\dfrac{2x^3 - 1}{3}\\). At which points does the \\(y\\)-coordinate change \\(18\\) times as fast as the \\(x\\)-coordinate?",
        steps: [
          "\\(\\dfrac{dy}{dt} = 18\\dfrac{dx}{dt}\\) and \\(\\dfrac{dy}{dt} = 2x^2\\dfrac{dx}{dt}\\), so \\(2x^2 = 18\\Rightarrow x = \\pm 3\\).",
          "At \\(x = 3\\): \\(y = \\dfrac{54 - 1}{3} = \\dfrac{53}{3}\\). At \\(x = -3\\): \\(y = \\dfrac{-54 - 1}{3} = -\\dfrac{55}{3}\\).",
        ],
        answer: "\\(\\left(-3, -\\dfrac{55}{3}\\right)\\) and \\(\\left(3, \\dfrac{53}{3}\\right)\\).",
      },
      practiceSet: [
        { prompt: "On \\(y = f(x)\\): \\(\\dfrac{dy}{dt}\\) in terms of \\(\\dfrac{dx}{dt}\\)?", answer: "\\(f'(x)\\dfrac{dx}{dt}\\)", method: "chain rule" },
        { prompt: "Distance-from-origin rate?", answer: "\\(\\dfrac{x\\dot x + y\\dot y}{\\sqrt{x^2+y^2}}\\)", method: "differentiate \\(\\sqrt{x^2+y^2}\\)" },
        { prompt: "On \\(x^2+y^2=1\\): relation between \\(\\dot x, \\dot y\\)?", answer: "\\(x\\dot x + y\\dot y = 0\\)", method: "differentiate the circle" },
        { prompt: "\\(\\dot y = 3\\dot x\\) on \\(y = x^2\\): find \\(x\\).", answer: "\\(x = \\tfrac32\\)", method: "\\(2x = 3\\)" },
      ],
      pyqExampleId: "20725666-150a-4a40-9ccf-b561e58a65a8", // parabola y=2x^2, distance from origin 18/sqrt5
      traps: [
        {
          title: "Find \\(\\dot y\\) from the curve before using it",
          body:
            "In a distance-rate problem you are usually given only \\(\\dot x\\). Get \\(\\dot y = f'(x)\\dot x\\) from the curve first, THEN substitute into \\(\\dfrac{x\\dot x + y\\dot y}{\\sqrt{x^2+y^2}}\\). Using \\(\\dot y = \\dot x\\) by accident is a common slip.",
        },
        {
          title: "'\\(y\\) changes \\(k\\) times \\(x\\)' means \\(f'(x) = k\\)",
          body:
            "The condition \\(\\dfrac{dy}{dt} = k\\dfrac{dx}{dt}\\) cancels the common \\(\\dfrac{dx}{dt}\\) to give \\(f'(x) = k\\). Solve that for \\(x\\), then read off \\(y\\) from the curve for each root — usually a \\(\\pm\\) pair.",
        },
      ],
    },

    // 6 — rectilinear motion s -> v -> a; resultant acceleration (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-rectilinear-motion",
      name: "Rectilinear Motion: Displacement, Velocity, Acceleration",
      intuition:
        "For a particle on a straight line, displacement \\(s(t)\\) differentiates to velocity \\(v = \\dfrac{ds}{dt}\\), and velocity differentiates to acceleration \\(a = \\dfrac{dv}{dt}\\). 'When it comes to rest' means \\(v = 0\\); 'when acceleration is zero' means \\(a = 0\\). For planar motion given by \\(x(t), y(t)\\), the resultant acceleration is \\(\\sqrt{\\ddot x^2 + \\ddot y^2}\\).",
      definition:
        "The differentiation ladder for motion:\n" +
        "- **Velocity:** \\(v = \\dfrac{ds}{dt}\\). The body is momentarily **at rest** where \\(v = 0\\).\n" +
        "- **Acceleration:** \\(a = \\dfrac{dv}{dt} = \\dfrac{d^2s}{dt^2}\\).\n" +
        "- **Read the instant from the condition:** 'stops' / 'at rest' \\(\\Rightarrow v = 0\\); 'acceleration zero' \\(\\Rightarrow a = 0\\); then evaluate the wanted quantity at that \\(t\\).\n" +
        "- **Planar motion** \\(x = x(t),\\, y = y(t)\\): resultant acceleration \\(= \\sqrt{\\left(\\dfrac{d^2x}{dt^2}\\right)^2 + \\left(\\dfrac{d^2y}{dt^2}\\right)^2}\\).\n" +
        "- **Coefficients from data:** for \\(s = at^2 + bt + c\\), \\(v = 2at + b\\), \\(a_{\\text{accel}} = 2a\\); solve the given conditions as simultaneous equations.",
      formula: {
        label: "Velocity, acceleration, resultant acceleration",
        latex:
          "v = \\dfrac{ds}{dt},\\quad a = \\dfrac{d^2s}{dt^2},\\qquad a_{\\text{res}} = \\sqrt{\\ddot x^2 + \\ddot y^2}",
      },
      authoredExample: {
        prompt:
          "A bullet's distance is \\(S = 1200t - 15t^2\\) cm. Find the distance covered when it comes to rest.",
        steps: [
          "\\(v = \\dfrac{dS}{dt} = 1200 - 30t\\). Rest: \\(v = 0\\Rightarrow t = 40\\).",
          "\\(S(40) = 1200(40) - 15(40)^2 = 48000 - 24000 = 24000\\).",
        ],
        answer: "\\(24000\\) cm",
      },
      selfCheckExample: {
        prompt:
          "A point moves with \\(x = a + bt - ct^2,\\; y = at + bt^2\\). Find its resultant acceleration.",
        steps: [
          "\\(\\dfrac{dx}{dt} = b - 2ct\\Rightarrow \\dfrac{d^2x}{dt^2} = -2c\\).",
          "\\(\\dfrac{dy}{dt} = a + 2bt\\Rightarrow \\dfrac{d^2y}{dt^2} = 2b\\).",
          "Resultant \\(= \\sqrt{(-2c)^2 + (2b)^2} = 2\\sqrt{b^2 + c^2}\\).",
        ],
        answer: "\\(2\\sqrt{b^2 + c^2}\\) unit/s\\(^2\\)",
      },
      practiceSet: [
        { prompt: "\\(s = 3t^2 - 8t + 5\\): body stops at \\(t = ?\\)", answer: "\\(\\dfrac{4}{3}\\) s", method: "\\(v = 6t - 8 = 0\\)" },
        { prompt: "\\(S = 5 + 48t - t^3\\): acceleration when \\(v = 0\\)?", answer: "\\(24\\) (magnitude)", method: "\\(v = 48 - 3t^2 = 0\\Rightarrow t = 4\\), \\(a = -6t\\)" },
        { prompt: "For \\(s = at^2 + bt + c\\), the acceleration is?", answer: "\\(2a\\)", method: "\\(\\tfrac{d^2s}{dt^2}\\)" },
        { prompt: "Planar motion: resultant acceleration formula?", answer: "\\(\\sqrt{\\ddot x^2 + \\ddot y^2}\\)", method: "combine components" },
      ],
      pyqExampleId: "170aba89-90a0-474f-bb04-ecc4772c0a81", // S=5+48t-t^3, accel when v=0 -> 24
      traps: [
        {
          title: "'At rest' is \\(v = 0\\); 'acceleration zero' is \\(a = 0\\) — don't swap them",
          body:
            "Read the trigger carefully. 'When the bullet comes to rest' sets \\(v = 0\\) (solve for \\(t\\), then find distance). 'When the acceleration is zero' sets \\(a = 0\\) (then find velocity). Using the wrong condition finds the wrong \\(t\\).",
        },
        {
          title: "Resultant acceleration uses SECOND derivatives of both coordinates",
          body:
            "For parametric \\(x(t), y(t)\\), differentiate each TWICE, then combine: \\(\\sqrt{\\ddot x^2 + \\ddot y^2}\\). Using first derivatives gives speed, not acceleration — a factor-of-\\(t\\) error.",
        },
      ],
    },

    // 7 — rate given => integrate back (anchored)
    {
      kind: "formula" as const,
      slug: "cetaod-integrate-rate-back",
      name: "Recovering a Quantity from Its Rate (Integrate Back)",
      intuition:
        "Sometimes the rate is given and the QUANTITY is wanted — the reverse of differentiation. If \\(\\dfrac{dQ}{dx}\\) or the acceleration is given, integrate it (adding the correct base value) to recover production, velocity, or displacement. Don't forget the initial constant.",
      definition:
        "When a rate is supplied and its accumulated quantity is asked:\n" +
        "- **Marginal rate to total:** if \\(\\dfrac{dP}{dx} = g(x)\\), the extra amount from \\(x = 0\\) to \\(x = n\\) is \\(\\displaystyle\\int_0^{n} g(x)\\,dx\\); add the base level \\(P_0\\): total \\(= P_0 + \\int_0^n g(x)\\,dx\\).\n" +
        "- **Acceleration to velocity:** if \\(a = a(t)\\) starting from rest, \\(v(t) = \\displaystyle\\int_0^t a(\\tau)\\,d\\tau\\); evaluate at the instant the condition fixes (e.g. where \\(a = 0\\)).\n" +
        "Always carry the initial value / lower limit — the most common error is dropping the base amount.",
      formula: {
        label: "Recover a quantity by integrating its rate",
        latex:
          "P = P_0 + \\int_0^{n}\\dfrac{dP}{dx}\\,dx \\qquad v(t) = \\int_0^{t} a(\\tau)\\,d\\tau",
        symbols: [
          { symbol: "P_0", meaning: "the base value that must be added back" },
        ],
      },
      authoredExample: {
        prompt:
          "A firm makes \\(1200\\) items. The rate of change of production w.r.t. extra workers \\(x\\) is \\(\\dfrac{dP}{dx} = 60 - 6\\sqrt{x}\\). Find the new production level after employing \\(25\\) more workers.",
        steps: [
          "Extra output \\(= \\displaystyle\\int_0^{25}(60 - 6\\sqrt x)\\,dx = \\left[60x - 4x^{3/2}\\right]_0^{25}\\).",
          "\\(= 60(25) - 4(125) = 1500 - 500 = 1000\\).",
          "New level \\(= 1200 + 1000 = 2200\\).",
        ],
        answer: "\\(2200\\) items",
      },
      selfCheckExample: {
        prompt:
          "A particle starts from rest with acceleration \\(\\left(8 - \\dfrac{t}{5}\\right)\\) cm/s\\(^2\\). Find its velocity at the instant the acceleration is zero.",
        steps: [
          "Acceleration zero: \\(8 - \\dfrac{t}{5} = 0\\Rightarrow t = 40\\).",
          "\\(v = \\displaystyle\\int_0^{40}\\left(8 - \\dfrac{t}{5}\\right)dt = \\left[8t - \\dfrac{t^2}{10}\\right]_0^{40} = 320 - 160 = 160\\).",
        ],
        answer: "\\(160\\) cm/s",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{dP}{dx} = 100 - 12\\sqrt x\\), extra output over \\([0,25]\\)?", answer: "\\(1500\\)", method: "\\([100x - 8x^{3/2}]_0^{25}\\)" },
        { prompt: "Why add \\(P_0\\)?", answer: "It's the base amount before the change", method: "integral gives only the increment" },
        { prompt: "From rest, \\(v(t)\\) from acceleration \\(a(t)\\)?", answer: "\\(\\int_0^t a\\,d\\tau\\)", method: "integrate acceleration" },
        { prompt: "Recover displacement from velocity \\(v(t)\\)?", answer: "\\(\\int v\\,dt\\)", method: "integrate the rate" },
      ],
      pyqExampleId: "5b87fdaf-77fb-4f91-b7ec-2096acd6d9e6", // firm dP/dx=100-12sqrt(x), new production 3500
      traps: [
        {
          title: "Add the base value back — the integral is only the CHANGE",
          body:
            "\\(\\int_0^{25}(100 - 12\\sqrt x)\\,dx = 1500\\) is the ADDED production, not the total. The new level is \\(2000 + 1500 = 3500\\). Forgetting the initial \\(2000\\) gives \\(1500\\), a listed wrong option.",
        },
        {
          title: "Integrate to go from rate up to quantity",
          body:
            "Given acceleration, integrate ONCE for velocity and TWICE for displacement (from rest, the constants vanish). Differentiating instead — because 'rate' primes you to differentiate — is the reflex to resist here.",
        },
      ],
    },
  ],
  related: [
    { label: "Differentiation notes", href: "/notes/mht-cet-maths/differentiation/cetdiff-foundations-chain" },
    { label: "NDA: Tangents & Rates of Change", href: "/notes/nda-maths/application-of-derivatives/aod-rate-approximation" },
  ],
};
