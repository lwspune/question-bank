import type { SubtopicNote } from "@/app/notes/_types";

export const GRAVITATION_FIELD_AND_POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Gravitational Field and Potential",
  title: "Gravitational Field and Potential",
  oneLineDefinition:
    "The acceleration due to gravity at a planet's surface is g = GM/R² (equivalently g = (4/3)πGρR); gravitational potential measures energy per unit mass, and a region of equal potential does no work on a body moved through it.",
  whyItMatters:
    "This is the chapter's busiest subtopic — seven PYQs, including its hardest item. " +
    "The recurring engine is g = GM/R² and its density form g = (4/3)πGρR: scale a planet's mass, radius or density and read off the new g. The bank also tests the deeper ideas — that equal potential means zero work, that weightlessness in orbit means zero normal reaction (not zero gravity), and that in vacuum every body falls with the same g. " +
    "Master the two forms of g and the field-versus-potential distinction and the marks fall out.",
  concepts: [
    // 1 — FOUNDATION-ish: surface gravity g = GM/R² (PYQ: 3696291d M=2,R=2 → g/2)
    {
      kind: "formula" as const,
      slug: "grav-surface-gravity",
      name: "Surface gravity — g = GM/R²",
      intuition:
        "Drop a small mass near a planet's surface and Newton's law of gravitation gives it an acceleration GM/R². This is g — it grows with the planet's mass and shrinks with the square of its radius. To compare two planets, scale M linearly and R as an inverse square.",
      definition:
        "The **acceleration due to gravity** at the surface of a planet of mass \\(M\\) and radius \\(R\\) is \\(g = \\dfrac{GM}{R^2}\\). " +
        "It follows from equating the weight \\(mg\\) of a surface mass with the gravitational force \\(\\dfrac{GMm}{R^2}\\); the test mass \\(m\\) cancels, so g is the same for all bodies at that surface. " +
        "To compare planets, multiply by the mass factor and divide by the **square** of the radius factor.",
      formula: {
        label: "Surface gravity",
        latex: "g = \\dfrac{GM}{R^2}",
        symbols: [
          { symbol: "g", meaning: "acceleration due to gravity at the surface" },
          { symbol: "M", meaning: "mass of the planet" },
          { symbol: "R", meaning: "radius of the planet" },
        ],
      },
      authoredExample: {
        prompt:
          "Planet X has the same mass as Earth but half its radius. How does the surface gravity on X compare with Earth's g?",
        steps: [
          "Use \\(g = \\dfrac{GM}{R^2}\\). Mass unchanged (factor 1); radius halved (factor \\(\\tfrac{1}{2}\\)).",
          "Radius enters as \\(R^2\\), so \\(g\\) scales by \\(\\dfrac{1}{(1/2)^2} = 4\\).",
          "Surface gravity on X is \\(4g\\).",
        ],
        answer: "Four times Earth's surface gravity (4g).",
      },
      selfCheckExample: {
        prompt:
          "Planet 2 has both its mass and its radius twice those of planet 1 (whose surface gravity is g₁). Find the surface gravity g₂ of planet 2.",
        steps: [
          "\\(g = \\dfrac{GM}{R^2}\\). Mass factor \\(= 2\\); radius factor \\(= 2\\) so \\(R^2\\) factor \\(= 4\\).",
          "\\(g_2 = g_1 \\cdot \\dfrac{2}{4} = \\dfrac{g_1}{2}\\).",
        ],
        answer: "\\(g_2 = g_1/2\\).",
      },
      practiceSet: [
        { prompt: "Same mass, radius doubled. g becomes?", answer: "g/4", method: "1/2² " },
        { prompt: "Mass quadrupled, radius doubled. g becomes?", answer: "g (unchanged)", method: "4 / 2² = 1" },
        { prompt: "Mass doubled, radius unchanged. g becomes?", answer: "2g", method: "g ∝ M" },
        { prompt: "Which radius power appears in g = GM/R²?", answer: "Inverse square, 1/R²" },
      ],
      pyqExampleId: "3696291d-89f7-4673-9e74-c82b12f6b6b6", // 2018 — M=2, R=2 → g/2
      traps: [
        {
          title: "Radius enters as a square in g, just like in F",
          body:
            "g = GM/R². When both mass and radius double, g does NOT stay the same — the mass factor 2 is divided by the radius factor squared (2² = 4), giving g/2. Always square the radius factor.",
        },
      ],
    },

    // 2 — g from density (PYQ: 428af3ac same density g ∝ R)
    {
      kind: "formula" as const,
      slug: "grav-g-from-density",
      name: "Surface gravity from density — g = (4/3)πGρR",
      intuition:
        "If a problem gives a planet's density instead of its mass, rewrite M as density × volume. The R³ from the volume cancels two of the three R's in the radius-squared denominator, leaving g proportional to ρ and to R. So for two planets of the SAME density, the bigger one has the stronger surface gravity.",
      definition:
        "Writing the mass as \\(M = \\rho \\cdot \\dfrac{4}{3}\\pi R^3\\) and substituting into \\(g = \\dfrac{GM}{R^2}\\) gives\n" +
        "\\[ g = \\dfrac{4}{3}\\pi G \\rho R. \\]\n" +
        "So at fixed density, \\(g \\propto R\\): a larger planet of the same material has a **larger** surface gravity. More generally \\(g \\propto \\rho R\\).",
      formula: {
        label: "Surface gravity from density",
        latex: "g = \\dfrac{4}{3}\\pi G \\rho R",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "mean density of the planet" },
          { symbol: "R", meaning: "radius of the planet" },
          { symbol: "g", meaning: "surface gravity (∝ ρR)" },
        ],
      },
      authoredExample: {
        prompt:
          "Two planets are made of the same material (same density). One has twice the radius of the other. Compare their surface gravities.",
        steps: [
          "At fixed density, \\(g = \\dfrac{4}{3}\\pi G \\rho R \\propto R\\).",
          "The larger planet has twice the radius, so twice the surface gravity.",
        ],
        answer: "The larger planet has twice the surface gravity (g ∝ R at fixed density).",
      },
      selfCheckExample: {
        prompt:
          "Two planets have the SAME density but radii R₁ and R₂ with R₁ > R₂. How are their surface gravities g₁ and g₂ related?",
        steps: [
          "At fixed density, \\(g = \\dfrac{4}{3}\\pi G \\rho R\\), so \\(g \\propto R\\).",
          "Since \\(R_1 > R_2\\), it follows that \\(g_1 > g_2\\).",
        ],
        answer: "\\(g_1 > g_2\\).",
      },
      practiceSet: [
        { prompt: "Same density, radius tripled. g becomes?", answer: "3g", method: "g ∝ R" },
        { prompt: "g = (4/3)πGρR shows g is proportional to which two quantities?", answer: "Density ρ and radius R" },
        { prompt: "Same radius, density doubled. g becomes?", answer: "2g", method: "g ∝ ρ" },
        { prompt: "Why does R³ from volume not survive in g?", answer: "It cancels two of the R's against R² in the denominator" },
      ],
      pyqExampleId: "428af3ac-795b-44e3-a6a0-4797c185886e", // 2019 — same density g ∝ R
      traps: [
        {
          title: "Same density does NOT mean same gravity",
          body:
            "When two planets share a density, g = (4/3)πGρR makes g proportional to R, so the larger planet has the stronger surface gravity. Don't assume equal density gives equal g — only same density AND same radius would.",
        },
      ],
    },

    // 3 — HARD: composite average density (PYQ: 182e13e2 9ρ/16) + diagram
    {
      kind: "formula" as const,
      slug: "grav-composite-density",
      name: "Average density of a composite body",
      intuition:
        "When a body is built from parts of different densities — a solid core wrapped in a shell — its average density is the total mass divided by the total volume, not the average of the two densities. Find each part's mass (density × volume), add them, and divide by the whole volume.",
      definition:
        "The **average (mean) density** of a composite body is\n" +
        "\\[ \\bar{\\rho} = \\dfrac{\\text{total mass}}{\\text{total volume}} = \\dfrac{\\sum_i \\rho_i V_i}{\\sum_i V_i}. \\]\n" +
        "It is a **volume-weighted** average of the part densities — never a simple arithmetic mean of \\(\\rho_1\\) and \\(\\rho_2\\). Compute each part's mass separately, sum, then divide by the total volume.",
      formula: {
        label: "Average density of a composite body",
        latex: "\\bar{\\rho} = \\dfrac{m_1 + m_2}{V_{\\text{total}}} = \\dfrac{\\rho_1 V_1 + \\rho_2 V_2}{V_1 + V_2}",
        symbols: [
          { symbol: "\\(\\rho_i, V_i\\)", meaning: "density and volume of part i" },
          { symbol: "\\(\\bar{\\rho}\\)", meaning: "average density of the whole body" },
        ],
      },
      visualizationSlug: "grav-composite-sphere",
      authoredExample: {
        prompt:
          "A solid sphere of radius R and density ρ is surrounded by a thin coating that doubles its volume, the coating having density 2ρ. Find the average density of the combined body.",
        steps: [
          "Core: volume \\(V\\), mass \\(\\rho V\\). Coating: volume \\(V\\) (doubles the total), mass \\((2\\rho)V = 2\\rho V\\).",
          "Total mass \\(= \\rho V + 2\\rho V = 3\\rho V\\). Total volume \\(= V + V = 2V\\).",
          "Average density \\(= \\dfrac{3\\rho V}{2V} = \\dfrac{3\\rho}{2}\\).",
        ],
        answer: "\\(\\bar{\\rho} = \\dfrac{3\\rho}{2}\\).",
      },
      selfCheckExample: {
        prompt:
          "A spherical shell of outer radius R and inner radius R/2 (density ρ/2) contains a solid sphere of radius R/2 (density ρ). Find the average density of the whole sphere of radius R.",
        steps: [
          "Inner solid sphere: volume \\(\\tfrac{4}{3}\\pi(R/2)^3 = \\tfrac{4}{3}\\pi \\tfrac{R^3}{8}\\), mass \\(m_1 = \\rho \\cdot \\tfrac{4}{3}\\pi \\tfrac{R^3}{8} = \\dfrac{\\rho \\pi R^3}{6}\\).",
          "Shell: volume \\(\\tfrac{4}{3}\\pi\\left(R^3 - \\tfrac{R^3}{8}\\right) = \\tfrac{4}{3}\\pi \\cdot \\tfrac{7R^3}{8}\\), mass \\(m_2 = \\tfrac{\\rho}{2}\\cdot\\tfrac{4}{3}\\pi\\tfrac{7R^3}{8} = \\dfrac{7\\rho \\pi R^3}{12}\\).",
          "Total mass \\(= \\dfrac{\\rho \\pi R^3}{6} + \\dfrac{7\\rho \\pi R^3}{12} = \\dfrac{2\\rho\\pi R^3 + 7\\rho\\pi R^3}{12} = \\dfrac{9\\rho\\pi R^3}{12}\\).",
          "Total volume \\(= \\tfrac{4}{3}\\pi R^3\\). Average density \\(= \\dfrac{9\\rho\\pi R^3/12}{\\tfrac{4}{3}\\pi R^3} = \\dfrac{9\\rho}{16}\\).",
        ],
        answer: "\\(\\bar{\\rho} = \\dfrac{9\\rho}{16}\\).",
      },
      practiceSet: [
        { prompt: "Equal volumes of densities ρ and 3ρ combined. Average density?", answer: "2ρ", method: "(ρV + 3ρV)/2V" },
        { prompt: "Is the average density the arithmetic mean of the part densities?", answer: "Only if the parts have equal volume" },
        { prompt: "Average density formula in one line?", answer: "Total mass ÷ total volume" },
      ],
      pyqExampleId: "182e13e2-d233-4a0f-8794-3a0874173caa", // 2024 HARD — 9ρ/16
      traps: [
        {
          title: "Average density is volume-weighted, not the mean of densities",
          body:
            "For the shell-and-core sphere, averaging ρ and ρ/2 to get 3ρ/4 is wrong — that ignores that the denser core is the smaller part. The correct answer 9ρ/16 comes from total mass ÷ total volume, where the shell (the larger volume) pulls the average down.",
        },
      ],
    },

    // 4 — field vs potential (PYQ: 4d93f43a equal potential → no work) + diagram
    {
      kind: "formula" as const,
      slug: "grav-field-vs-potential",
      name: "Gravitational field versus potential",
      intuition:
        "The gravitational field is the force per unit mass (a vector, the local 'pull'); the potential is the potential energy per unit mass (a scalar, the 'height' in the energy landscape). Two points can sit at the same potential — the same energy height — while the field (the slope) differs between them. Moving a mass between two equal-potential points does no work.",
      definition:
        "The **gravitational field** \\(\\vec{E} = \\vec{F}/m\\) is the force per unit mass (a vector). " +
        "The **gravitational potential** \\(V\\) is the potential energy per unit mass (a scalar). " +
        "The work done by gravity moving a mass \\(m\\) from A to B is \\(W = -\\Delta U = -m(V_B - V_A)\\). " +
        "If the **potential is equal at A and B**, then \\(V_B - V_A = 0\\), so \\(W = 0\\) — even though the **field** may differ at the two points. Gravity is conservative, so this holds regardless of the path.",
      formula: {
        label: "Work and equal potential",
        latex: "W = -\\,m\\,(V_B - V_A); \\qquad V_A = V_B \\Rightarrow W = 0",
        symbols: [
          { symbol: "W", meaning: "work done by gravity, A → B" },
          { symbol: "V_A, V_B", meaning: "gravitational potential at A and B" },
          { symbol: "m", meaning: "mass moved" },
        ],
      },
      visualizationSlug: "grav-field-vs-potential",
      authoredExample: {
        prompt:
          "A mass is carried from one point to another along an equipotential surface (potential the same everywhere on it). How much work does gravity do?",
        steps: [
          "Work by gravity \\(W = -m(V_B - V_A)\\).",
          "On an equipotential surface \\(V_A = V_B\\), so \\(V_B - V_A = 0\\).",
          "Therefore \\(W = 0\\).",
        ],
        answer: "Zero work — movement along an equipotential surface does no work against (or by) gravity.",
      },
      selfCheckExample: {
        prompt:
          "At two points A and B the gravitational potential is the same, but the gravitational field is different. How much work does gravity do in moving an object from A to B?",
        steps: [
          "Work by gravity depends only on the potential difference: \\(W = -m(V_B - V_A)\\).",
          "Equal potential ⟹ \\(V_B - V_A = 0\\) ⟹ \\(W = 0\\). The differing field is a distractor.",
          "Gravity is conservative, so the unequal field does not make it non-conservative.",
        ],
        answer: "No work is done by gravity (W = 0).",
      },
      practiceSet: [
        { prompt: "Work moving a mass along an equipotential surface?", answer: "0" },
        { prompt: "Gravitational field is a scalar or vector?", answer: "Vector (force per unit mass)" },
        { prompt: "Gravitational potential is a scalar or vector?", answer: "Scalar (energy per unit mass)" },
        { prompt: "Can two points have equal potential but unequal field?", answer: "Yes" },
      ],
      pyqExampleId: "4d93f43a-a8e7-4e18-b343-f858ca2a8fad", // 2026 — equal potential, no work
      traps: [
        {
          title: "Equal potential, not equal field, decides the work",
          body:
            "Work by gravity depends on the potential DIFFERENCE, not on the field. If A and B are at the same potential, the work is zero even when the field strength differs between them. A different field never makes gravity non-conservative.",
        },
      ],
    },

    // 5 — weightlessness (PYQ: 250a1a58 normal reaction zero)
    {
      kind: "formula" as const,
      slug: "grav-weightlessness",
      name: "Weightlessness in orbit — zero normal reaction",
      intuition:
        "An astronaut on the space station feels weightless not because gravity has switched off, but because the station and the astronaut are both falling freely around the Earth together. With nothing pushing up on them, the floor exerts zero normal reaction — and 'apparent weight' is exactly that contact force.",
      definition:
        "**Weightlessness** in orbit means the **normal (contact) reaction is zero**, not that gravity is absent. " +
        "The astronaut and station are in **free fall** — both accelerating toward the Earth at the local g — so there is no contact force between the astronaut and the floor. " +
        "Gravity is very much still acting (it is the centripetal force keeping the orbit); the astronaut's acceleration is not zero; and there is no real 'centrifugal' push.",
      formula: {
        label: "Apparent weight = normal reaction",
        latex: "W_{\\text{apparent}} = N = 0 \\quad (\\text{free fall}); \\qquad F_{\\text{gravity}} \\neq 0",
        symbols: [
          { symbol: "N", meaning: "normal (contact) reaction from the floor" },
          { symbol: "\\(W_{\\text{apparent}}\\)", meaning: "apparent weight (= N)" },
          { symbol: "\\(F_{\\text{gravity}}\\)", meaning: "actual gravitational pull (non-zero)" },
        ],
      },
      authoredExample: {
        prompt:
          "Why does a person standing inside a lift whose cable has snapped (free fall) feel weightless, even on Earth?",
        steps: [
          "In free fall the person and the lift floor accelerate downward together at g.",
          "The floor therefore exerts no upward push: the normal reaction N = 0.",
          "Apparent weight equals the normal reaction, so it reads zero — gravity is still acting at full g.",
        ],
        answer: "Because the normal reaction is zero in free fall; gravity itself is unchanged.",
      },
      selfCheckExample: {
        prompt:
          "An astronaut whose weight on Earth is 600 N experiences weightlessness on the orbiting space station. What does this 'weightlessness' actually mean?",
        steps: [
          "It does NOT mean the Earth's gravitational pull is zero — gravity provides the centripetal force for the orbit.",
          "Both astronaut and station are in free fall, so the station's floor exerts no contact force.",
          "Hence the normal reaction of the floor on the astronaut is zero.",
        ],
        answer: "The normal reaction of the space-station floor on the astronaut is zero (gravity is not zero).",
      },
      practiceSet: [
        { prompt: "In orbital weightlessness, is the gravitational pull zero?", answer: "No — gravity provides the centripetal force" },
        { prompt: "What is zero during weightlessness?", answer: "The normal (contact) reaction" },
        { prompt: "Apparent weight equals which force?", answer: "The normal reaction" },
        { prompt: "Is the astronaut's acceleration zero in orbit?", answer: "No — it is centripetal, toward Earth" },
      ],
      pyqExampleId: "250a1a58-b21f-41bf-afe5-5b0d2d36449e", // 2024 — normal reaction zero
      traps: [
        {
          title: "Weightless does NOT mean gravity-free",
          body:
            "The common wrong choice says the gravitational pull on the astronaut is zero. It isn't — that pull is precisely what keeps the station in orbit. Weightlessness means the NORMAL REACTION is zero because everything is in free fall together.",
        },
      ],
    },

    // 6 — g is independent of the falling body's mass (PYQ: 45071326 vacuum equal time, 49dc003f spring on Moon)
    {
      kind: "formula" as const,
      slug: "grav-g-independent-of-mass",
      name: "g is the same for all bodies — free fall and weight",
      intuition:
        "Because the test mass cancels in g = GM/R², every object near a planet's surface falls with the same acceleration g, regardless of its own mass or shape — in a vacuum a feather and a coin land together. The same g sets an object's weight mg, so on a body with smaller g (the Moon) the weight, and any spring stretch it causes, shrinks in the same proportion.",
      definition:
        "The acceleration due to gravity \\(g\\) is **independent of the falling body's mass**: in equating \\(mg = \\dfrac{GMm}{R^2}\\), the test mass \\(m\\) cancels. " +
        "So in a vacuum all bodies fall with the same \\(g\\) and take **equal time** to fall a given height. " +
        "Weight is \\(W = mg\\); a spring's extension \\(x = \\dfrac{mg}{k} \\propto g\\), so on a world with smaller \\(g\\) the same hanging mass produces a proportionally smaller extension.",
      formula: {
        label: "Weight and spring extension scale with g",
        latex: "W = mg, \\qquad x = \\dfrac{mg}{k} \\propto g",
        symbols: [
          { symbol: "g", meaning: "acceleration due to gravity (independent of the body's mass)" },
          { symbol: "W", meaning: "weight of the body" },
          { symbol: "x", meaning: "spring extension; k = spring constant" },
        ],
      },
      authoredExample: {
        prompt:
          "A spring stretches 12 cm when a mass hangs from it on Earth. If the same mass hangs from the same spring on a planet where g is half of Earth's, find the new extension.",
        steps: [
          "Extension \\(x = \\dfrac{mg}{k}\\), so \\(x \\propto g\\) (m and k unchanged).",
          "On the new planet \\(g\\) is halved, so the extension halves.",
          "New extension \\(= \\dfrac{12}{2} = 6\\) cm.",
        ],
        answer: "6 cm.",
      },
      selfCheckExample: {
        prompt:
          "A mass on a spring stretches it 6 cm on Earth. On the Moon, where g is one-sixth of Earth's, what is the extension?",
        steps: [
          "\\(x = \\dfrac{mg}{k} \\propto g\\).",
          "Moon's \\(g\\) is \\(g/6\\), so the extension is \\(6 \\times \\tfrac{1}{6} = 1\\) cm.",
        ],
        answer: "1 cm.",
      },
      practiceSet: [
        { prompt: "In vacuum, a coin and a feather are dropped together. Which lands first?", answer: "Together — same g" },
        { prompt: "Spring extension on a planet with g/3 vs Earth?", answer: "One third of Earth's", method: "x ∝ g" },
        { prompt: "Does a heavier object fall faster in vacuum?", answer: "No — g is independent of mass" },
        { prompt: "Weight of a 2 kg mass where g = 5 m/s²?", answer: "10 N", method: "W = mg" },
      ],
      pyqExampleId: "45071326-29eb-4565-b750-60a9306ddea8", // 2017 — vacuum equal fall time
      traps: [
        {
          title: "In vacuum, mass and shape don't change the fall time",
          body:
            "Without air resistance a coin, a feather and a mango fall with the SAME g and reach the bottom together (t₁ = t₂ = t₃). The 'heavier falls faster' intuition only holds when air drag is present.",
        },
        {
          title: "Spring extension follows g, not just the mass",
          body:
            "Extension x = mg/k is proportional to g. The same hanging mass stretches the spring less on the Moon (g/6 → extension/6). Don't leave the extension unchanged just because the mass is unchanged.",
        },
      ],
    },
  ],
};
