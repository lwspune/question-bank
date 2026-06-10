import type { SubtopicNote } from "@/app/notes/_types";

export const NEWTONS_LAWS_NOTE: SubtopicNote = {
  subtopicName: "Newton's Laws of Motion",
  title: "Newton's Three Laws of Motion",
  oneLineDefinition:
    "Newton's three laws: a body keeps its state of motion unless a net force acts (inertia), force equals rate of change of momentum (F = ma), and every action has an equal and opposite reaction.",
  whyItMatters:
    "This is the heart of the chapter and its largest subtopic — roughly 18 PYQs across 2018–2026. " +
    "Most are one-line recall (inertia, mass vs weight, what stays constant at uniform velocity) or a single F = ma substitution; the only HARD pocket is combining two forces into a resultant via the parallelogram law. " +
    "Drill F = ma, the parallelogram formula, and the mass-vs-weight distinction and you clear almost the whole subtopic.",
  concepts: [
    // First law / inertia
    {
      kind: "formula" as const,
      slug: "first-law-inertia",
      name: "First law — inertia",
      intuition:
        "Left alone, things keep doing what they are doing: a body at rest stays at rest, and a body in motion keeps moving in a straight line at constant speed, UNLESS a net external force acts. " +
        "This reluctance to change motion is inertia, and it is measured by mass — the heavier the body, the more inertia it has and the harder it is to start, stop, or turn.",
      definition:
        "**Newton's first law (law of inertia):** a body continues in its state of rest or of uniform motion in a straight line unless acted on by a net external force. " +
        "**Inertia** is the tendency of a body to resist any change in its state of motion; it is measured by **mass**. More mass = more inertia. " +
        "A direct consequence: at **uniform velocity the acceleration is zero**, so the net force is zero.",
      formula: {
        label: "Condition for the first law (equilibrium of motion)",
        latex: "\\vec{F}_{\\text{net}} = 0 \\iff \\vec{a} = 0",
        symbols: [
          { symbol: "F_net", meaning: "net (resultant) external force on the body" },
          { symbol: "a", meaning: "acceleration; zero means rest or constant velocity" },
        ],
      },
      authoredExample: {
        prompt:
          "A car cruises down a straight road at a steady 60 km/h. What is its acceleration, and what is the net force on it?",
        steps: [
          "Steady speed in a straight line means the velocity is constant.",
          "Constant velocity means the acceleration is zero.",
          "By the first law (and F = ma), zero acceleration means the net force is zero — the engine's driving force exactly balances drag and friction.",
        ],
        answer: "Acceleration = 0; net force = 0.",
      },
      selfCheckExample: {
        prompt:
          "A cricket ball and a tennis ball are thrown at the same speed. Which is harder to stop, and why?",
        steps: [
          "The harder a body is to stop, the more inertia it has.",
          "Inertia is measured by mass — more mass means more inertia.",
          "A cricket ball is heavier (more massive) than a tennis ball.",
        ],
        answer: "The cricket ball — it has more mass, so more inertia, so it is harder to stop.",
      },
      practiceSet: [
        { prompt: "What physical quantity measures inertia?", answer: "Mass" },
        { prompt: "At uniform velocity, what is a body's acceleration?", answer: "Zero" },
        { prompt: "Of a cricket ball and a feather, which has more inertia?", answer: "The cricket ball", method: "more mass = more inertia" },
        { prompt: "A body moves at constant velocity. What is the net force on it?", answer: "Zero" },
      ],
      pyqExampleId: "cbbad648-851d-4175-a66a-833e9045ff0d", // 2025 — uniform speed, acceleration zero
      traps: [
        {
          title: "Constant velocity does NOT mean changing speed",
          body:
            "NDA 2018 asked which statement is NOT correct for a body moving at constant velocity. " +
            "The wrong statement is \"its speed changes with time\" — at constant velocity the speed is fixed, acceleration is zero, and the net force is zero. Don't confuse constant velocity (vector) with merely constant speed; here both are fixed.",
        },
      ],
    },

    // Second law / F = ma
    {
      kind: "formula" as const,
      slug: "second-law-f-ma",
      name: "Second law — F = ma",
      intuition:
        "Push a body and it accelerates: the harder you push, the faster it speeds up, and the heavier it is, the less it speeds up for the same push. The precise statement is that force equals the rate of change of momentum, which for constant mass reduces to the familiar F = ma. " +
        "Mass is the constant of proportionality between force and acceleration.",
      definition:
        "**Newton's second law:** the net force on a body equals the rate of change of its momentum, \\(\\vec{F} = \\dfrac{d\\vec{p}}{dt}\\). " +
        "For **constant mass** this reduces to \\(\\vec{F} = m\\vec{a}\\). " +
        "Here **mass is the constant of proportionality** between the applied force and the resulting acceleration; force and acceleration always point in the same direction. " +
        "To apply it, draw a free-body diagram (every force ON the body as an arrow), take the vector sum, and set it equal to \\(m\\vec{a}\\).",
      visualizationSlug: "lmf-free-body-diagram",
      formula: {
        label: "Newton's second law",
        latex: "\\vec{F} = \\frac{d\\vec{p}}{dt} = m\\vec{a} \\quad (\\text{constant } m)",
        symbols: [
          { symbol: "F", meaning: "net force (N)" },
          { symbol: "p = mv", meaning: "linear momentum (kg m/s)" },
          { symbol: "m", meaning: "mass (kg) — the constant of proportionality" },
          { symbol: "a", meaning: "acceleration (m/s²)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 1500 kg car travelling at 20 m/s is brought to rest by braking in 4 s. What is the magnitude of the braking force?",
        steps: [
          "Find the acceleration: \\(a = \\dfrac{v - u}{t} = \\dfrac{0 - 20}{4} = -5\\,\\text{m/s}^2\\).",
          "The magnitude of the deceleration is \\(5\\,\\text{m/s}^2\\).",
          "Apply \\(F = ma = 1500 \\times 5 = 7500\\,\\text{N}\\).",
        ],
        answer: "7500 N (7.5 kN).",
      },
      selfCheckExample: {
        prompt:
          "A net force of 5 N acts on a 10 kg mass. What acceleration does it produce?",
        steps: [
          "Rearrange the second law: \\(a = F/m\\).",
          "Substitute: \\(a = 5 / 10 = 0.5\\,\\text{m/s}^2\\).",
        ],
        answer: "0.5 m/s².",
      },
      practiceSet: [
        { prompt: "State Newton's second law in its momentum form.", answer: "F = dp/dt (force equals rate of change of momentum)" },
        { prompt: "What acceleration does a 4 N force give a 2 kg body?", answer: "2 m/s²", method: "a = F/m = 4/2" },
        { prompt: "In F = ma, which quantity is the constant of proportionality?", answer: "Mass (m)" },
        { prompt: "A 0.5 m/s² acceleration on a 10 kg mass needs what force?", answer: "5 N", method: "F = ma = 10 × 0.5" },
      ],
      pyqExampleId: "30170535-1970-452a-874b-12afbd44eabc", // 2024 — car braking, F = ma
      traps: [
        {
          title: "Force is proportional to rate of change of momentum, NOT to momentum itself",
          body:
            "NDA 2025 asked which second-law statement is NOT correct. The wrong one says \"net force is proportional to the body's momentum\" — it should be proportional to the RATE OF CHANGE of momentum (dp/dt). A body can have huge momentum yet zero net force (constant velocity).",
        },
        {
          title: "Watch the units when computing F = ma",
          body:
            "Convert km/h to m/s before using F = ma (divide by 3.6: 72 km/h = 20 m/s). NDA 2024 gave 72 km/h and a 0.2 s stop, yielding a = 100 m/s² and F = 100 kN — the large answer is a sign you converted correctly, not an error.",
        },
      ],
    },

    // Third law
    {
      kind: "formula" as const,
      slug: "third-law-action-reaction",
      name: "Third law — action and reaction",
      intuition:
        "Forces always come in pairs. When you push on a wall, the wall pushes back on you with an equal force in the opposite direction. A rocket pushes gas backward and the gas pushes the rocket forward. The two forces are equal in size, opposite in direction, and crucially act on DIFFERENT bodies.",
      definition:
        "**Newton's third law:** to every action there is an equal and opposite reaction. " +
        "The action and reaction forces are **equal in magnitude, opposite in direction, and act on two different bodies**. " +
        "Because they act on different bodies, they never cancel each other — cancellation would require both forces on the SAME body.",
      visualizationSlug: "lmf-action-reaction-pair",
      formula: {
        label: "Newton's third law (force pair)",
        latex: "\\vec{F}_{AB} = -\\vec{F}_{BA}",
        symbols: [
          { symbol: "F_AB", meaning: "force exerted by A on B (action)" },
          { symbol: "F_BA", meaning: "force exerted by B on A (reaction)" },
        ],
      },
      authoredExample: {
        prompt:
          "A swimmer pushes the water backward with a force of 200 N. With what force, and in which direction, does the water push the swimmer?",
        steps: [
          "By the third law, the reaction is equal in magnitude and opposite in direction to the action.",
          "The swimmer's push on the water (action) is 200 N backward.",
          "The water's push on the swimmer (reaction) is therefore 200 N forward.",
        ],
        answer: "200 N, directed forward — which is what propels the swimmer.",
      },
      selfCheckExample: {
        prompt:
          "A book of weight 12 N rests on a table. State the action-reaction pair between the book and the table, and explain why they do not cancel.",
        steps: [
          "Action: the book pushes down on the table with 12 N.",
          "Reaction: the table pushes up on the book with 12 N.",
          "These are equal and opposite, but they act on different bodies (one on the table, one on the book), so they do not cancel.",
        ],
        answer:
          "Book pushes table down (12 N); table pushes book up (12 N). They act on different bodies, so they never cancel.",
      },
      practiceSet: [
        { prompt: "Action and reaction forces act on the same body or different bodies?", answer: "Different bodies" },
        { prompt: "How do the magnitudes of an action-reaction pair compare?", answer: "Equal" },
        { prompt: "How do their directions compare?", answer: "Opposite" },
        { prompt: "Why don't action and reaction cancel out?", answer: "They act on two different bodies" },
      ],
      traps: [
        {
          title: "Action-reaction pairs act on DIFFERENT bodies",
          body:
            "The classic error is to think action and reaction cancel and so nothing moves. They never cancel because they act on two separate bodies. When analysing one body's motion, only the forces ON THAT body matter — its reaction on something else is irrelevant to its own free-body diagram.",
        },
      ],
    },

    // Resultant of forces (HARD)
    {
      kind: "formula" as const,
      slug: "resultant-of-forces",
      name: "Combining forces — the parallelogram law",
      intuition:
        "When several forces act at a point, only their VECTOR sum — the resultant — matters for the motion. For two forces the resultant is the diagonal of the parallelogram they span, and its size depends on the angle between them: largest when they are aligned, smallest when they oppose. " +
        "This is the chapter's main source of HARD questions.",
      definition:
        "Two forces \\(P\\) and \\(Q\\) acting at a point with angle \\(\\theta\\) between them combine into a **resultant** \\(R\\) given by the parallelogram law. " +
        "The resultant is **maximum** \\((P + Q)\\) when \\(\\theta = 0^\\circ\\) and **minimum** \\(\\lvert P - Q\\rvert\\) when \\(\\theta = 180^\\circ\\). " +
        "A body is in equilibrium only when the resultant of all forces acting on it is zero.",
      visualizationSlug: "lmf-resultant-parallelogram",
      formula: {
        label: "Magnitude of the resultant of two forces",
        latex: "R = \\sqrt{P^2 + Q^2 + 2PQ\\cos\\theta}",
        symbols: [
          { symbol: "R", meaning: "magnitude of the resultant force" },
          { symbol: "P, Q", meaning: "magnitudes of the two forces" },
          { symbol: "θ", meaning: "angle between the two forces" },
        ],
      },
      authoredExample: {
        prompt:
          "Two forces of 6 N and 8 N act at a point with a 90° angle between them. Find the magnitude of their resultant.",
        steps: [
          "Use \\(R = \\sqrt{P^2 + Q^2 + 2PQ\\cos\\theta}\\) with \\(P = 6\\), \\(Q = 8\\), \\(\\theta = 90^\\circ\\).",
          "Since \\(\\cos 90^\\circ = 0\\), the cross term vanishes: \\(R = \\sqrt{6^2 + 8^2}\\).",
          "\\(R = \\sqrt{36 + 64} = \\sqrt{100} = 10\\,\\text{N}\\).",
        ],
        answer: "10 N.",
      },
      selfCheckExample: {
        prompt:
          "Two equal forces F act at a point and their resultant also has magnitude F. Find the angle between the two forces.",
        steps: [
          "Set \\(R = F\\), \\(P = Q = F\\) in \\(R^2 = P^2 + Q^2 + 2PQ\\cos\\theta\\).",
          "\\(F^2 = F^2 + F^2 + 2F^2\\cos\\theta = 2F^2(1 + \\cos\\theta)\\).",
          "So \\(1 + \\cos\\theta = 1/2\\), giving \\(\\cos\\theta = -1/2\\).",
          "Therefore \\(\\theta = 120^\\circ\\) (i.e. \\(2\\pi/3\\)). By symmetry each force makes \\(60^\\circ\\) with the resultant.",
        ],
        answer: "120° (2π/3) between the forces; each makes 60° (π/3) with the resultant.",
      },
      practiceSet: [
        { prompt: "Resultant of two forces P and Q is maximum at what angle?", answer: "0° (P + Q)" },
        { prompt: "Resultant of two forces is minimum at what angle?", answer: "180° (|P - Q|)" },
        { prompt: "Two perpendicular forces 3 N and 4 N have what resultant?", answer: "5 N", method: "√(3² + 4²)" },
        { prompt: "Two equal 10 N forces at 60° give what resultant (to 1 d.p.)?", answer: "17.3 N", method: "√(100 + 100 + 200·0.5) = √300" },
      ],
      pyqExampleId: "e4c2aa76-90d7-4d25-9448-d43681c83b6a", // 2023 — two 5 N forces at 60°
      traps: [
        {
          title: "Two equal forces with a resultant equal to each: θ = 120°",
          body:
            "NDA 2026 tested two equal forces whose resultant equals one of them. Solving gives cos θ = -1/2, so θ = 120° between them, and each force makes 60° with the resultant. Both statements (60° to resultant, 120° between forces) are correct.",
        },
        {
          title: "Don't add force magnitudes arithmetically",
          body:
            "5 N and 5 N do NOT give 10 N unless they are parallel. At 60° the resultant is √75 ≈ 8.66 N. Always use the parallelogram formula with the angle; only at θ = 0° is the answer the simple sum.",
        },
      ],
    },

    // mass vs weight
    {
      kind: "reference" as const,
      slug: "mass-vs-weight",
      name: "Mass vs weight",
      intuition:
        "Mass is how much matter a body contains — it is the same on Earth, the Moon, or in deep space. Weight is the gravitational force on that mass, W = mg, so it changes with location because g changes. A 60 kg person has the same mass everywhere but weighs about a sixth as much on the Moon.",
      definition:
        "**Mass** is the amount of matter in a body and a measure of its inertia; it is a **scalar**, measured in kg, and is the same everywhere. " +
        "**Weight** is the gravitational force on the body, \\(W = mg\\); it is a **vector** (points down), measured in newtons, and varies with \\(g\\) (location). " +
        "From \\(F = ma\\), mass is the constant of proportionality between force and acceleration — weight is not.",
      table: {
        columns: ["Property", "Mass", "Weight"],
        rows: [
          { cells: ["What it is", "Amount of matter / inertia", "Gravitational force on the body"] },
          { cells: ["Formula", "—", "W = mg"] },
          { cells: ["SI unit", "kilogram (kg)", "newton (N)"] },
          { cells: ["Scalar or vector", "Scalar", "Vector (downward)"] },
          {
            cells: ["Varies with location?", "No — same everywhere", "Yes — changes with g"],
            noteAmber: "NDA 2018 — mass is \"the same everywhere\"; NDA 2021 — mass is the constant of proportionality in F = ma.",
          },
        ],
        caption:
          "Mass is constant and is the proportionality constant in F = ma; weight = mg varies with g. NDA tests both halves of this distinction.",
      },
      selfCheckExample: {
        prompt:
          "An object has a mass of 60 kg on Earth. What is its mass on the Moon (g_moon ≈ 1.6 m/s²), and what is its weight there?",
        steps: [
          "Mass is the amount of matter — it does not depend on location, so it is still 60 kg on the Moon.",
          "Weight is the gravitational force: \\(W = mg = 60 \\times 1.6 = 96\\,\\text{N}\\).",
          "On Earth it would weigh \\(60 \\times 9.8 \\approx 588\\,\\text{N}\\) — much more, though the mass is unchanged.",
        ],
        answer: "Mass = 60 kg (unchanged); weight on the Moon ≈ 96 N.",
      },
      practiceSet: [
        { prompt: "Does mass change when you go to the Moon?", answer: "No — it is the same everywhere" },
        { prompt: "What is the formula for weight?", answer: "W = mg" },
        { prompt: "Is weight a scalar or a vector?", answer: "Vector (it points downward)" },
        { prompt: "What is the weight of a 60 kg person on Earth (g = 9.8)?", answer: "588 N", method: "W = mg = 60 × 9.8" },
      ],
      pyqExampleId: "faff12cf-8d46-458a-aa31-bfe29784bac2", // 2018 — mass is same everywhere
      traps: [
        {
          title: "Mass is the constant of proportionality, NOT weight",
          body:
            "NDA 2021 asked which is the constant of proportionality between force and acceleration in F = ma. It is MASS, not weight. Weight = mg varies with g; mass is invariant and is what makes a body resist acceleration.",
        },
      ],
    },

    // moment of inertia (rotational questions filed here)
    {
      kind: "formula" as const,
      slug: "rotational-inertia",
      name: "Rotational inertia — moment of inertia of common bodies",
      intuition:
        "Just as mass resists changes in straight-line motion, moment of inertia resists changes in rotation. For the same mass and radius, how that mass is distributed matters: a ring (all mass at the rim) resists spinning more than a disc (mass spread inward), which resists more than a solid sphere. NDA tests this as a direct comparison.",
      definition:
        "The **moment of inertia** \\(I\\) is the rotational analogue of mass — it measures resistance to angular acceleration and depends on how mass is distributed about the axis. " +
        "For the same mass \\(M\\) and radius \\(R\\) about the central axis: ring \\(I = MR^2\\), disc \\(I = \\tfrac{1}{2}MR^2\\), solid sphere \\(I = \\tfrac{2}{5}MR^2\\). " +
        "Rotational kinetic energy is \\(\\tfrac{1}{2}I\\omega^2\\), so at the same \\(\\omega\\) a larger \\(I\\) means more energy.",
      formula: {
        label: "Moment of inertia of common bodies (mass M, radius R)",
        latex: "I_{\\text{ring}} = MR^2, \\quad I_{\\text{disc}} = \\tfrac{1}{2}MR^2, \\quad I_{\\text{sphere}} = \\tfrac{2}{5}MR^2",
        symbols: [
          { symbol: "I", meaning: "moment of inertia (kg m²)" },
          { symbol: "M", meaning: "mass of the body" },
          { symbol: "R", meaning: "radius about the central axis" },
        ],
      },
      authoredExample: {
        prompt:
          "A solid disc and a solid sphere have the same mass M and the same radius R. Which has the greater moment of inertia about its centre?",
        steps: [
          "Disc: \\(I_{\\text{disc}} = \\tfrac{1}{2}MR^2 = 0.5\\,MR^2\\).",
          "Sphere: \\(I_{\\text{sphere}} = \\tfrac{2}{5}MR^2 = 0.4\\,MR^2\\).",
          "Compare the coefficients: \\(0.5 > 0.4\\).",
        ],
        answer: "The disc — its moment of inertia (0.5 MR²) exceeds the sphere's (0.4 MR²).",
      },
      selfCheckExample: {
        prompt:
          "A thin ring and a thin disc have the same mass and radius and spin at the same angular speed ω. Which has the greater rotational kinetic energy?",
        steps: [
          "Rotational KE \\(= \\tfrac{1}{2}I\\omega^2\\); at equal ω, larger I wins.",
          "\\(I_{\\text{ring}} = MR^2\\) while \\(I_{\\text{disc}} = \\tfrac{1}{2}MR^2\\), so the ring has the larger I.",
          "Therefore the ring has the greater rotational kinetic energy.",
        ],
        answer: "The ring — its larger moment of inertia gives it more kinetic energy at the same ω.",
      },
      practiceSet: [
        { prompt: "Moment of inertia of a ring of mass M, radius R about its centre?", answer: "MR²" },
        { prompt: "Moment of inertia of a solid disc (mass M, radius R) about its centre?", answer: "½MR²" },
        { prompt: "Moment of inertia of a solid sphere (mass M, radius R)?", answer: "⅖MR²" },
        { prompt: "What is the rotational analogue of mass?", answer: "Moment of inertia" },
      ],
      pyqExampleId: "b893b121-2ee3-43fd-9c21-434f874fc3a8", // 2019 — disc vs sphere MOI
      traps: [
        {
          title: "Same mass + radius, different I — distribution decides",
          body:
            "Ring > disc > solid sphere for moment of inertia at equal M and R, because the ring keeps all its mass at the rim while the sphere packs mass near the axis. The body with mass concentrated farther from the axis always has the larger I.",
        },
      ],
    },
  ],
};
