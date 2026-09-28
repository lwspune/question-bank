import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/mechanical-properties-of-fluids";

export const PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Pressure, Buoyancy, and Archimedes",
  title: "Pressure with Depth and Buoyancy",
  oneLineDefinition:
    "Pressure in a liquid rises by ρgh with depth, so a gas bubble grows as it rises (Boyle's law at constant temperature), and a body in a liquid feels an upthrust equal to the weight of liquid it displaces — which can decelerate a light body that falls in until it stops and floats back up.",
  whyItMatters:
    "6 PYQs, five of them HARD — a small page with the chapter's hardest questions. Two are a bubble rising from a lake bed whose radius or diameter doubles, one the pressure rise at the centre of a spinning drum, one the force on the bottom of a vessel holding a suspended body, and two how deep a light body sinks when dropped into a denser liquid. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-fl-pressure-depth-bubble",
      name: "Pressure with Depth, and the Rising Bubble",
      intuition:
        "Every metre of water adds ρg of pressure. A bubble at the bottom of a lake carries the atmosphere plus the water above it; at the surface, only the atmosphere. At constant temperature PV stays fixed, so if the volume grows eight times (radius or diameter doubles) the pressure at the bottom was eight times the surface pressure — the water supplied seven of those eight parts. Write the atmosphere as a column of water H (or of mercury h, relative density ρ, which is hρ of water), and the depth is 7H.",
      definition:
        "- **Pressure at depth** \\(d\\): \\(P = P_0 + \\rho g d\\).\n" +
        "- **Rising bubble**, constant temperature: \\((P_0 + \\rho g d)V = P_0 \\cdot kV\\). Radius (or diameter) doubled \\(\\Rightarrow k = 8 \\Rightarrow \\rho g d = 7P_0\\): depth \\(= 7H\\) with \\(P_0\\) as H of water, or \\(7h\\rho\\) with \\(P_0\\) as h of mercury of relative density ρ.\n" +
        "- **Spinning drum** of radius R at ω: the liquid at the rim moves at ωR, so the pressure difference between rim and centre is \\(\\tfrac{1}{2}d\\,\\omega^2R^2\\).\n" +
        "- **A body hanging in the liquid** pushes down on the liquid with the same force the liquid pushes up on it. For the cylinder with a hemisphere cut from its base, top face at depth h, the paper keys \\(\\rho g(V + \\pi R^2 h)\\): the weight of liquid filling the body's volume V plus the column of height h standing on its top face.",
      formula: {
        label: "Rising bubble",
        latex: "(P_0 + \\rho g d)\\,V_1 = P_0\\,V_2 \\;\\Rightarrow\\; \\rho g d = P_0\\left(\\frac{V_2}{V_1} - 1\\right)",
      },
      authoredExample: {
        prompt: "A bubble's radius triples as it rises to the surface at constant temperature. The atmosphere is 10 m of water. How deep is the lake?",
        steps: [
          "Volume grows 27 times, so the bottom pressure is 27 atmospheres.",
          "The water supplies 26 of them: depth = 26 × 10 = 260 m.",
        ],
        answer: "260 m",
      },
      selfCheckExample: {
        prompt: "A bubble's radius doubles as it rises. The atmosphere equals a water column H. Depth of the lake?",
        steps: ["Volume × 8, so the water adds 7 atmospheres."],
        answer: "7H",
      },
      practiceSet: [
        { prompt: "Diameter doubles; the surface pressure is h metres of mercury of relative density ρ. Depth?", answer: "7hρ" },
        { prompt: "Pressure rise at the centre of a drum of radius R spun at ω, liquid density d?", answer: "½ω²R²d" },
      ],
      pyqExampleId: "b4c3d2d5-7b55-4c97-8f47-44046aeb2458",
      traps: [
        {
          title: "Using 8H instead of 7H",
          body:
            "The bottom pressure is 8 atmospheres, but one of them is the atmosphere itself. The water column is the other seven: depth 7H.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-buoyancy-sinking",
      name: "Upthrust, and How Deep a Light Body Sinks",
      intuition:
        "A body dropped from height h enters the liquid at √(2gh). Inside, the upthrust σVg beats its weight ρVg, so the net upward force (σ − ρ)Vg decelerates it at (σ − ρ)g/ρ. It sinks until that deceleration has used up its speed: depth = v²/2a = hρ/(σ − ρ). Then it rises and floats. The body only goes deep when its density is close to the liquid's.",
      definition:
        "- **Upthrust** = weight of liquid displaced = \\(\\sigma V g\\).\n" +
        "- In the liquid, deceleration \\(a = \\dfrac{(\\sigma - \\rho)g}{\\rho}\\) for \\(\\sigma > \\rho\\).\n" +
        "- **Maximum depth** after a drop from height h (no damping): \\(\\dfrac{v^2}{2a} = \\dfrac{h\\rho}{\\sigma - \\rho}\\).",
      formula: {
        label: "Maximum depth",
        latex: "d_{\\max} = \\frac{2gh}{2\\,(\\sigma - \\rho)g/\\rho} = \\frac{h\\rho}{\\sigma - \\rho}",
      },
      authoredExample: {
        prompt: "A ball of density 800 kg/m³ is dropped from 1 m into water. How deep does it go?",
        steps: ["d = hρ/(σ − ρ) = 1 × 800/200 = 4 m."],
        answer: "4 m",
      },
      selfCheckExample: {
        prompt: "A body of density ρ falls from height h into a lake of density σ > ρ. Maximum depth?",
        steps: ["Entry speed √(2gh); deceleration (σ − ρ)g/ρ."],
        answer: "hρ/(σ − ρ)",
      },
      practiceSet: [
        { prompt: "Same ball, density 900 kg/m³, dropped from 0.5 m into water. Depth?", answer: "4.5 m" },
      ],
      pyqExampleId: "57b5b433-777b-4b90-a886-de05ff0fa69d",
      traps: [
        {
          title: "Writing the deceleration as (σ − ρ)g",
          body:
            "The net force (σ − ρ)Vg acts on the body's own mass ρV, so the deceleration is (σ − ρ)g/ρ. Dropping the ρ loses the h ρ in the answer.",
        },
      ],
    },
  ],
  related: [
    { label: "Bernoulli — the same ½ρv² term in moving fluids", href: `${BASE}/cetp-fl-flow` },
    { label: "Viscosity — upthrust and weight in terminal velocity", href: `${BASE}/cetp-fl-viscosity` },
  ],
};
