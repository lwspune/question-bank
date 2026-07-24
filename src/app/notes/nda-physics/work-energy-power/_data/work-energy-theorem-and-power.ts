import type { SubtopicNote } from "@/app/notes/_types";

export const WORK_ENERGY_THEOREM_AND_POWER_NOTE: SubtopicNote = {
  subtopicName: "Work-Energy Theorem and Power",
  title: "Work-Energy Theorem and Power",
  oneLineDefinition:
    "The work-energy theorem says the net work done on a body equals its change in kinetic energy. Power is the rate of doing work, P = W/t = Fv, measured in watts — and its commercial unit is the kilowatt-hour.",
  whyItMatters:
    "6 PYQs from 2017 to 2026, mostly MODERATE with one HARD (deriving potential energy from a force law). " +
    "Two ideas dominate: the work-energy theorem (net work = ΔKE, used to find stopping forces and distances) and power (P = W/t = Fv, plus the watt-vs-joule and kilowatt-hour unit facts). " +
    "The recurring trap is confusing power (rate) with energy (amount).",
  concepts: [
    // Concept 1 — work-energy theorem
    {
      kind: "formula" as const,
      slug: "wep-work-energy-theorem",
      name: "Work-energy theorem — net work equals change in kinetic energy",
      intuition:
        "Whenever a net force acts on a moving body, it speeds it up or slows it down — and the total work that net force does is exactly the kinetic energy gained or lost. " +
        "This holds for any force, conservative or not, along any path — which makes it the quickest route to stopping forces and braking distances.",
      definition:
        "The **work-energy theorem** states that the **net work** done by all forces on a body equals its **change in kinetic energy**: \\(W_\\text{net} = \\Delta KE = \\tfrac{1}{2}mv_f^2 - \\tfrac{1}{2}mv_i^2\\). " +
        "It applies to **any** net force (conservative or non-conservative) over any path. " +
        "A body slowing to rest loses kinetic energy \\(\\tfrac{1}{2}mv^2\\), so the work done against it (e.g. by friction) equals that amount.",
      formula: {
        label: "Work-energy theorem",
        latex: "W_\\text{net} = \\Delta KE = \\tfrac{1}{2}mv_f^2 - \\tfrac{1}{2}mv_i^2",
        symbols: [
          { symbol: "\\(W_\\text{net}\\)", meaning: "net work done by all forces (J)" },
          { symbol: "v_i", meaning: "initial speed (m/s)" },
          { symbol: "v_f", meaning: "final speed (m/s)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 3 kg block moving at 6 m/s is brought to rest by friction over a distance of 9 m. Find the magnitude of the frictional force.",
        steps: [
          "By the work-energy theorem, the work done by friction equals the kinetic energy lost: \\(f\\,d = \\tfrac{1}{2}mv^2\\).",
          "\\(\\tfrac{1}{2}mv^2 = \\tfrac{1}{2}(3)(6^2) = \\tfrac{1}{2}(3)(36) = 54\\) J.",
          "\\(f \\times 9 = 54 \\Rightarrow f = 54/9 = 6\\) N.",
        ],
        answer: "Frictional force = 6 N.",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg block sliding at 10 m/s on a rough surface comes to rest after 20 m. Find the frictional force using the work-energy theorem.",
        steps: [
          "Kinetic energy lost: \\(\\tfrac{1}{2}mv^2 = \\tfrac{1}{2}(2)(10^2) = 100\\) J.",
          "Friction does this much negative work over 20 m: \\(f \\times 20 = 100\\).",
          "\\(f = 100/20 = 5\\) N.",
        ],
        answer: "Frictional force = 5 N.",
      },
      practiceSet: [
        { prompt: "State the work-energy theorem.", answer: "Net work done on a body equals its change in kinetic energy" },
        { prompt: "A 1 kg body slows from 4 m/s to rest over 2 m. Find the retarding force.", answer: "4 N", method: "\\(\\tfrac{1}{2}(1)(16) = 8\\) J; \\(f = 8/2\\)" },
        { prompt: "Does the work-energy theorem apply only to conservative forces?", answer: "No", method: "it holds for any net force, conservative or not" },
        { prompt: "A 2 kg block has its speed raised from 0 to 5 m/s. Net work done on it?", answer: "25 J", method: "\\(\\tfrac{1}{2}(2)(25)\\)" },
      ],
      pyqExampleId: "2a35cdfb-e89a-444e-804d-6ef1ab65ee23", // 2026 — net work equals change in KE
      traps: [
        {
          title: "The theorem uses NET work — not the work of one force",
          body:
            "\\(W_\\text{net} = \\Delta KE\\) sums the work of every force acting. If only friction acts on a sliding block, then friction's work equals the KE change; but when several forces act, add them all before equating to \\(\\Delta KE\\).",
        },
      ],
    },

    // Concept 2 — power (P = W/t = Fv)
    {
      kind: "formula" as const,
      slug: "wep-power",
      name: "Power — the rate of doing work (P = W/t = Fv)",
      intuition:
        "Two cranes lift the same load to the same height and do the same work — but the faster one is more powerful. " +
        "Power is how QUICKLY work is done, not how much. A 100 W bulb and a 100 J of energy are different ideas — one is a rate, the other an amount.",
      definition:
        "**Power** is the rate of doing work (or of transferring energy): \\(P = \\dfrac{W}{t}\\). " +
        "For a constant force moving a body at speed \\(v\\), \\(P = Fv\\). " +
        "The SI unit is the **watt (W)**, where 1 W = 1 J/s. A constant-power machine on a smooth surface gives \\(v \\propto \\sqrt{t}\\), because \\(P = mav = \\text{const}\\) integrates to \\(v^2 \\propto t\\).",
      formula: {
        label: "Power",
        latex: "P = \\dfrac{W}{t} = Fv",
        symbols: [
          { symbol: "P", meaning: "power (watts, W)" },
          { symbol: "W", meaning: "work done (J)" },
          { symbol: "t", meaning: "time taken (s)" },
          { symbol: "F", meaning: "applied force (N)" },
          { symbol: "v", meaning: "speed (m/s)" },
        ],
      },
      authoredExample: {
        prompt:
          "A motor lifts an 8 kg mass through a vertical distance of 4 m in 2 s. Find the power. Take \\(g = 10\\) m/s².",
        steps: [
          "Work done against gravity: \\(W = mgh = 8 \\times 10 \\times 4 = 320\\) J.",
          "Power = work / time: \\(P = 320 / 2\\).",
          "\\(P = 160\\) W.",
        ],
        answer: "\\(P = 160\\) W.",
      },
      selfCheckExample: {
        prompt:
          "A constant-power engine pulls a block along a smooth horizontal surface from rest. How does the block's speed depend on time?",
        steps: [
          "Constant power: \\(P = Fv = mav = mv\\,(dv/dt)\\) is constant.",
          "So \\(v\\,dv = (P/m)\\,dt\\); integrating gives \\(v^2/2 = (P/m)t\\).",
          "Hence \\(v^2 \\propto t\\), i.e. \\(v \\propto \\sqrt{t}\\).",
        ],
        answer: "\\(v \\propto \\sqrt{t}\\).",
      },
      practiceSet: [
        { prompt: "What is the SI unit of power?", answer: "watt (W)", method: "1 W = 1 J/s" },
        { prompt: "A machine does 600 J of work in 3 s. Find its power.", answer: "200 W", method: "\\(P = W/t = 600/3\\)" },
        { prompt: "A 50 N force moves a body at 4 m/s. Find the power delivered.", answer: "200 W", method: "\\(P = Fv = 50 \\times 4\\)" },
        { prompt: "Under constant power on a smooth surface, the speed is proportional to which function of time?", answer: "\\(\\sqrt{t}\\)", method: "\\(v^2 \\propto t\\)" },
      ],
      pyqExampleId: "3ec30a08-df1e-47ad-ac38-793b5c9cd92e", // 2023 — lift 8 kg, 4 m, 2 s -> 160 W
      traps: [
        {
          title: "Power is a RATE — do not confuse it with energy",
          body:
            "Power (watt) is energy per unit time; energy (joule) is the total amount. Two machines that do the same work have the same energy output but different power if they take different times. \"How much\" is energy; \"how fast\" is power.",
        },
        {
          title: "P = Fv uses the speed at that instant",
          body:
            "When a force moves a body, the instantaneous power is \\(P = Fv\\). At higher speed the same force delivers more power — which is why a constant-power engine cannot keep accelerating at the same rate.",
        },
      ],
    },

    // Concept 3 — energy units (REFERENCE: joule, kWh, conversions)
    {
      kind: "reference" as const,
      slug: "wep-energy-and-power-units",
      name: "Units of work, energy, and power",
      intuition:
        "The NDA tests unit facts directly — what is one joule, what is a kilowatt-hour in joules, watt vs joule. " +
        "These are pure recall marks: memorise the table and never lose them.",
      definition:
        "Work and energy share the unit **joule (J)**; power uses the **watt (W) = J/s**. " +
        "The **kilowatt-hour (kWh)** is the commercial unit of electrical energy — the energy used by a 1 kW device in 1 hour. Memorise the conversions below.",
      table: {
        columns: ["Quantity / unit", "Definition", "In SI base"],
        rows: [
          { cells: ["Joule (J)", "1 N acting through 1 m", "work / energy unit"] },
          { cells: ["1 joule of work", "force of 4 N over 0.25 m", "\\(4 \\times 0.25 = 1\\) J"] },
          { cells: ["Watt (W)", "1 joule per second", "power unit, J/s"] },
          {
            cells: ["Kilowatt-hour (kWh)", "energy of a 1 kW device in 1 hour", "\\(3.6 \\times 10^{6}\\) J"],
            noteAmber: "1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J — the commercial unit of electrical energy.",
          },
          { cells: ["Kilowatt (kW)", "1000 watts", "power unit"] },
        ],
        caption:
          "The two recall favourites: 1 J = 4 N over 0.25 m, and 1 kWh = 3.6 × 10⁶ J.",
      },
      selfCheckExample: {
        prompt:
          "Express one kilowatt-hour in joules.",
        steps: [
          "1 kWh = power × time = 1 kW × 1 hour.",
          "Convert: \\(1\\,\\text{kW} = 1000\\) W and \\(1\\,\\text{hour} = 3600\\) s.",
          "\\(1\\,\\text{kWh} = 1000 \\times 3600 = 3.6 \\times 10^{6}\\) J.",
        ],
        answer: "1 kWh = \\(3.6 \\times 10^{6}\\) J.",
      },
      practiceSet: [
        { prompt: "What is the commercial unit of electrical energy?", answer: "Kilowatt-hour (kWh)" },
        { prompt: "1 kWh equals how many joules?", answer: "\\(3.6 \\times 10^{6}\\) J", method: "1000 W × 3600 s" },
        { prompt: "Work is one joule when a force of 4 N moves an object through what distance?", answer: "25 cm (0.25 m)", method: "\\(W = Fd = 4 \\times 0.25 = 1\\) J" },
        { prompt: "What is the SI unit shared by work and energy?", answer: "Joule (J)" },
      ],
      pyqExampleId: "efe3ef7e-0ff0-4f26-ab85-c6b623cfbb58", // 2022 — kWh = 3.6 × 10^6 J
      traps: [
        {
          title: "1 kWh is 3.6 × 10⁶ J — not 1000 or 3600",
          body:
            "A kilowatt-hour combines 1000 W with 3600 s: \\(1000 \\times 3600 = 3.6 \\times 10^{6}\\) J. Multiplying only one of the two factors is the standard wrong answer.",
        },
      ],
    },

    // Concept 4 — HARD: potential energy from a force law (U = -integral F dx)
    {
      kind: "formula" as const,
      slug: "wep-potential-energy-from-force",
      name: "Potential energy from a force — U = − ∫ F dx",
      intuition:
        "For a conservative force, the force is the negative slope of the potential energy curve — so going the other way, the potential energy is the negative integral of the force over distance. " +
        "Given a force law \\(F(x)\\), you recover the potential energy by integrating and flipping the sign.",
      definition:
        "For a conservative one-dimensional force \\(F(x)\\), the potential energy is \\(U(x) = -\\displaystyle\\int F(x)\\,dx\\) (up to a constant). " +
        "Equivalently \\(F(x) = -\\dfrac{dU}{dx}\\): the force points in the direction of decreasing potential energy. " +
        "So to get \\(U\\) from a given force law, integrate \\(F\\) with respect to \\(x\\) and negate.",
      formula: {
        label: "Potential energy from a conservative force",
        latex: "U(x) = -\\int F(x)\\,dx \\quad\\Longleftrightarrow\\quad F(x) = -\\dfrac{dU}{dx}",
        symbols: [
          { symbol: "U(x)", meaning: "potential energy as a function of position (J)" },
          { symbol: "F(x)", meaning: "conservative force along x (N)" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle on the x-axis feels a force \\(F(x) = -kx\\) (a spring). Find its potential energy \\(U(x)\\), taking \\(U(0) = 0\\).",
        steps: [
          "Use \\(U = -\\int F\\,dx = -\\int(-kx)\\,dx\\).",
          "\\(U = \\int kx\\,dx = \\tfrac{1}{2}kx^2 + C\\).",
          "With \\(U(0) = 0\\), the constant \\(C = 0\\), so \\(U = \\tfrac{1}{2}kx^2\\).",
        ],
        answer: "\\(U(x) = \\tfrac{1}{2}kx^2\\) (the familiar spring potential energy).",
      },
      selfCheckExample: {
        prompt:
          "A particle of mass m moves along the x-axis under a force \\(F(x) = Ax^2 - Bx\\). Find its potential energy \\(U(x)\\).",
        steps: [
          "\\(U = -\\int F\\,dx = -\\int (Ax^2 - Bx)\\,dx\\).",
          "\\(U = -\\left(\\dfrac{Ax^3}{3} - \\dfrac{Bx^2}{2}\\right) = -\\dfrac{Ax^3}{3} + \\dfrac{Bx^2}{2}\\).",
          "Factor: \\(U = -\\dfrac{x^2}{6}(2Ax - 3B)\\).",
        ],
        answer: "\\(U(x) = -\\dfrac{x^2}{6}(2Ax - 3B)\\).",
      },
      practiceSet: [
        { prompt: "How is potential energy obtained from a conservative force F(x)?", answer: "\\(U = -\\int F\\,dx\\)", method: "integrate and negate" },
        { prompt: "If \\(U = \\tfrac{1}{2}kx^2\\), what is the force?", answer: "\\(F = -kx\\)", method: "\\(F = -dU/dx\\)" },
        { prompt: "For \\(F = -mg\\) (constant), find U(x) with U(0)=0.", answer: "\\(U = mgx\\)", method: "\\(-\\int(-mg)\\,dx = mgx\\)" },
        { prompt: "The force is the negative of which derivative of the potential energy?", answer: "\\(dU/dx\\)", method: "\\(F = -dU/dx\\)" },
      ],
      pyqExampleId: "ea0a5fd3-dd19-443a-a2ed-193023e421eb", // 2017 — U from F = Ax^2 - Bx
      traps: [
        {
          title: "Do not forget the MINUS sign when integrating",
          body:
            "\\(U = -\\int F\\,dx\\) — the negative sign is essential. Dropping it (writing \\(U = +\\int F\\,dx\\)) flips the sign of the whole potential energy and gives the wrong option.",
        },
      ],
    },
  ],
};
