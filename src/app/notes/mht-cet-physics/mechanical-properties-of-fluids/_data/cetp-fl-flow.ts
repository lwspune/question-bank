import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/mechanical-properties-of-fluids";

export const FLOW_NOTE: SubtopicNote = {
  subtopicName: "Bernoulli, Continuity, Streamline, and Torricelli",
  title: "Streamline Flow: Continuity, Bernoulli and Torricelli",
  oneLineDefinition:
    "In steady streamline flow the volume passing any section per second is the same, so the fluid speeds up where the pipe narrows (Av constant); Bernoulli's theorem then says the pressure falls where the speed rises, and Torricelli's theorem gives the speed of a jet from a hole at depth h as √(2gh).",
  whyItMatters:
    "17 PYQs, 3 HARD. Six are continuity — speed in a narrower pipe, a nozzle, a sprinkler, how fast a tank empties; seven are Bernoulli — the pressure at the narrow part, the lift on a roof in a wind, the flow rate from a pressure difference, the speed of water from an opened valve; four are Torricelli — jets from holes at different depths, the time to drain, and the recoil of a tank with holes on opposite sides. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-fl-continuity",
      name: "Continuity: Narrow Pipe, Faster Flow",
      intuition:
        "Water cannot pile up in a pipe, so the volume flow rate Q = Av is the same everywhere along it. A pipe of a third the radius has a ninth the area, so the water moves nine times faster. The same rule links a pipe to a nozzle (d√(V/V₁)), a hose to a sprinkler with n holes (v' = R²v/(nr²)), and a tap to the falling water level in a tank (dh/dt = a v/A). Streamline flow means the velocity at any fixed point does not change with time and the layers stay parallel.",
      definition:
        "- \\(A_1v_1 = A_2v_2\\); for a circular pipe \\(r_1^2v_1 = r_2^2v_2\\). Radius R → R/3 ⇒ speed × 9.\n" +
        "- **Flow rate** \\(Q = \\pi r^2 v\\): \\(\\pi \\times 10^{-1}\\) m³/s through radius 0.1 m ⇒ 10 m/s.\n" +
        "- **Nozzle** from diameter d at V to speed \\(V_1\\): \\(d_1 = d\\sqrt{\\dfrac{V}{V_1}}\\). **Sprinkler** with n holes of radius r: \\(v' = \\dfrac{R^2v}{nr^2}\\).\n" +
        "- **Tank draining** through a tap: \\(A\\,\\dfrac{dh}{dt} = a\\,v\\).\n" +
        "- **Streamline flow**: velocity at a point is constant in time, below the critical velocity, layers parallel, no random motion.",
      formula: {
        label: "Continuity",
        latex: "A_1 v_1 = A_2 v_2 = Q",
      },
      authoredExample: {
        prompt: "A hose of radius 1 cm carries water at 2 m/s into a sprinkler with 20 holes of radius 1 mm. Speed from each hole?",
        steps: ["v' = R²v/(nr²) = (10 mm)² × 2/(20 × 1 mm²) = 10 m/s."],
        answer: "10 m/s",
      },
      selfCheckExample: {
        prompt: "Fluid moves at V where the pipe radius is R. Speed where the radius is R/3?",
        steps: ["Area falls to a ninth."],
        answer: "9V",
      },
      practiceSet: [
        { prompt: "Tank of cross-section 750 cm², tap of 500 mm² at 30 cm/s. dh/dt?", answer: "2 × 10⁻³ m/s" },
        { prompt: "WRONG about streamline flow: velocity at a point never constant; below critical velocity; layers parallel; no random motion?", answer: "Velocity at a point is never constant" },
      ],
      pyqExampleId: "55e31f3c-e6a9-4fd9-a197-3b15067c492b",
      traps: [
        {
          title: "Scaling speed with radius, not area",
          body:
            "Q = Av and A ∝ r². A third of the radius means a ninth of the area and nine times the speed, not three.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-bernoulli",
      name: "Bernoulli's Theorem",
      intuition:
        "Along a streamline P + ½ρv² + ρgh is constant. In a horizontal pipe the height term drops out, so wherever the fluid speeds up its pressure falls by ½ρ(v₂² − v₁²) — the narrowest part has the highest speed and the lowest pressure. Pair it with continuity: find the speeds from the areas, then the pressure change from Bernoulli. A wind over a roof is the same idea: fast air above, still air below, and a lift of ½ρv² on every square metre.",
      definition:
        "- \\(P + \\tfrac{1}{2}\\rho v^2 + \\rho g h = \\) constant along a streamline.\n" +
        "- Horizontal pipe: \\(P_1 - P_2 = \\tfrac{1}{2}\\rho\\left(v_2^2 - v_1^2\\right)\\). Speed v → 3v ⇒ pressure falls by \\(4\\rho v^2\\).\n" +
        "- **Narrowest section**: maximum speed, minimum pressure.\n" +
        "- **Roof in a wind** of speed v: force \\(= \\tfrac{1}{2}\\rho v^2 A\\) (50 m/s, 300 m², air 1.2 kg/m³ ⇒ \\(4.5 \\times 10^5\\) N).\n" +
        "- **Valve opened**: gauge reading falls from \\(P_1\\) to \\(P_2\\), so \\(v = \\sqrt{\\dfrac{2(P_1 - P_2)}{\\rho}}\\).\n" +
        "- **Flow rate from a pressure difference** in a tapering pipe: use \\(v_1 = \\dfrac{A_2}{A_1}v_2\\) in Bernoulli, solve for \\(v_2\\), then \\(Q = A_2v_2\\).",
      formula: {
        label: "Bernoulli, horizontal pipe",
        latex: "P_1 + \\tfrac{1}{2}\\rho v_1^2 = P_2 + \\tfrac{1}{2}\\rho v_2^2",
      },
      authoredExample: {
        prompt: "Water flows at 1 m/s where the area is 12 cm² and the pressure 5000 Pa. Pressure where the area is 4 cm²?",
        steps: ["Continuity: v₂ = 3 m/s.", "P₂ = 5000 − ½ × 1000 × (9 − 1) = 5000 − 4000 = 1000 Pa."],
        answer: "1000 Pa",
      },
      selfCheckExample: {
        prompt: "In a horizontal pipe the speed is 0.5 m/s at 6 cm² and the pressure 3000 Pa. Pressure at 2 cm²?",
        steps: ["v₂ = 1.5 m/s; ΔP = ½ × 1000 × (2.25 − 0.25) = 1000 Pa."],
        answer: "2000 Pa",
      },
      practiceSet: [
        { prompt: "Pressure P where the speed is v. Pressure where the speed becomes 3v (horizontal pipe)?", answer: "P − 4ρv²" },
        { prompt: "Glycerine (1250 kg/m³) in a cone from 10 cm² to 5 cm²; ΔP = 3 N/m². Flow rate?", answer: "4 × 10⁻⁵ m³/s" },
      ],
      pyqExampleId: "13dd96f4-7ba9-4484-bf34-48091a3bca3c",
      traps: [
        {
          title: "Putting the high pressure at the narrow part",
          body:
            "Squeezing the pipe speeds the fluid up, and faster flow means LOWER pressure. The narrowest section has maximum speed and minimum pressure.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-fl-torricelli",
      name: "Torricelli: Jets and Draining Tanks",
      intuition:
        "Water leaving a hole at depth h below the open surface comes out as fast as if it had fallen h: v = √(2gh). The deeper the hole, the faster the jet. A full tank's gauge pressure at the bottom does the same job: v = √(2ΔP/ρ). Because v grows as √h, a tank four times as full takes twice as long to drain. Two holes on opposite sides throw jets with momentum ρAv² each; the difference is ρA × 2g × (height difference), so the tank feels a net sideways force proportional to h.",
      definition:
        "- **Efflux speed** at depth h: \\(v = \\sqrt{2gh}\\); lower orifices are faster, \\(V_1 < V_2 < V_3\\) going down.\n" +
        "- **From pressure**: bottom gauge pressure \\(4H - H = 3H\\) ⇒ \\(v = \\sqrt{\\dfrac{6H}{\\rho}}\\).\n" +
        "- **Drain time** \\(\\propto \\sqrt{h}\\): height × 4 ⇒ time × 2.\n" +
        "- **Two holes** on opposite sides, height difference h: net thrust \\(= \\rho A(v_1^2 - v_2^2) = 2\\rho A g h \\propto h\\).",
      formula: {
        label: "Torricelli",
        latex: "v = \\sqrt{2gh}, \\qquad t_{\\text{drain}} \\propto \\sqrt{h}",
      },
      authoredExample: {
        prompt: "A tank drains in 3 minutes when filled to height h. How long from 9h?",
        steps: ["t ∝ √h: √9 = 3."],
        answer: "9 minutes",
      },
      selfCheckExample: {
        prompt: "Total pressure at a tank's bottom is 4H with the atmosphere H. Speed of water from a hole there?",
        steps: ["Gauge pressure 3H = ½ρv²."],
        answer: "√(6H/ρ)",
      },
      practiceSet: [
        { prompt: "A tank empties in t through a bottom hole when filled to h. Filled to 4h?", answer: "2t" },
        { prompt: "Holes on opposite sides a height h apart. Net horizontal force on the tank is proportional to?", answer: "h" },
      ],
      pyqExampleId: "b892afc4-6cb7-43cc-9dc3-76f0c9133fb2",
      traps: [
        {
          title: "Measuring depth from the bottom",
          body:
            "h in √(2gh) is the depth of the hole BELOW THE FREE SURFACE, not its height above the base. The hole nearest the bottom gives the fastest jet.",
        },
      ],
    },
  ],
  related: [
    { label: "Viscosity — when streamline flow breaks down", href: `${BASE}/cetp-fl-viscosity` },
    { label: "Pressure — the ρgh term", href: `${BASE}/cetp-fl-pressure` },
  ],
};
