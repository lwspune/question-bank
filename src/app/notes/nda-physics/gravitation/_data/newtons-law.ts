import type { SubtopicNote } from "@/app/notes/_types";

export const GRAVITATION_NEWTONS_LAW_NOTE: SubtopicNote = {
  subtopicName: "Newton's Law of Gravitation",
  title: "Newton's Law of Gravitation",
  oneLineDefinition:
    "Every two point masses attract each other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them — F = Gm₁m₂/r² — where G is the same universal constant everywhere in the universe.",
  whyItMatters:
    "This is the chapter's foundation and a reliable source of EASY marks. " +
    "Six PYQs sit here: the inverse-square scaling problem (change both mass and distance — the classic 16F item), the units of G, two action-reaction statements (the force on each body is equal and opposite), and two 'is G a universal constant?' statements. " +
    "Get the inverse-square law and the action-reaction idea watertight and you collect these almost for free.",
  concepts: [
    // 1 — FOUNDATION: the inverse-square law (no PYQ)
    {
      kind: "formula" as const,
      slug: "grav-law-foundation",
      name: "Newton's law of gravitation — the inverse-square law",
      intuition:
        "Any two masses pull on each other along the line joining them. Make either mass bigger and the pull grows in proportion; move them apart and the pull falls off as the square of the distance — double the separation and the force drops to a quarter. This single rule governs falling apples and orbiting planets alike.",
      definition:
        "**Newton's law of gravitation:** the attractive force between two point masses \\(m_1\\) and \\(m_2\\) separated by a distance \\(r\\) is\n" +
        "- directly proportional to the **product of the masses** \\(m_1 m_2\\),\n" +
        "- inversely proportional to the **square of the distance** \\(r^2\\),\n" +
        "- directed along the line joining them (always attractive).\n" +
        "The constant of proportionality is \\(G\\), the universal gravitational constant.",
      formula: {
        label: "Newton's law of gravitation",
        latex: "F = \\dfrac{G\\,m_1 m_2}{r^2}",
        symbols: [
          { symbol: "F", meaning: "gravitational force between the masses" },
          { symbol: "m_1, m_2", meaning: "the two point masses" },
          { symbol: "r", meaning: "distance between their centres" },
          { symbol: "G", meaning: "universal gravitational constant" },
        ],
      },
      authoredExample: {
        prompt:
          "Two point masses of 5 kg and 8 kg are placed 2 m apart. Write the expression for the gravitational force between them, and state what happens to the force if the separation is doubled to 4 m.",
        steps: [
          "Apply \\(F = \\dfrac{G m_1 m_2}{r^2} = \\dfrac{G(5)(8)}{2^2} = \\dfrac{40G}{4} = 10G\\).",
          "Doubling the separation makes \\(r^2\\) four times larger, so the force becomes one quarter of its original value.",
          "New force \\(= \\dfrac{G(5)(8)}{4^2} = \\dfrac{40G}{16} = 2.5G = \\dfrac{1}{4}(10G)\\).",
        ],
        answer: "\\(F = 10G\\) N; doubling the distance reduces the force to one quarter (\\(2.5G\\) N).",
      },
      practiceSet: [
        { prompt: "Gravitational force varies with distance as which power?", answer: "Inverse square, 1/r²" },
        { prompt: "Double both masses, keep r fixed. Force becomes?", answer: "4 times", method: "F ∝ m₁m₂" },
        { prompt: "Triple the distance, masses fixed. Force becomes?", answer: "1/9 of original", method: "F ∝ 1/r²" },
        { prompt: "Is the gravitational force attractive or repulsive?", answer: "Always attractive" },
      ],
      traps: [
        {
          title: "Distance enters as a square, masses do not",
          body:
            "The force is linear in each mass but inverse-SQUARE in the distance. Doubling a mass doubles the force; doubling the distance quarters it. Confusing the two powers is the most common scaling error in this chapter.",
        },
      ],
    },

    // 2 — REFERENCE: the universal constant G (units, value, properties)
    {
      kind: "reference" as const,
      slug: "grav-universal-constant-g",
      name: "The universal gravitational constant G",
      intuition:
        "G is the fixed number that turns the proportionality F ∝ m₁m₂/r² into an equation. It is genuinely universal — the same value on Earth, on the Moon, between two galaxies, or between two atoms. It does not depend on the masses, the distance, the location, or the local value of g.",
      definition:
        "The **universal gravitational constant** \\(G \\approx 6.674 \\times 10^{-11}\\) in SI units. " +
        "Rearranging \\(F = \\dfrac{G m_1 m_2}{r^2}\\) gives \\(G = \\dfrac{F r^2}{m_1 m_2}\\), so its unit is \\((\\text{N}\\cdot\\text{m}^2)/\\text{kg}^2\\) and its dimensional formula is \\(M^{-1}L^{3}T^{-2}\\). " +
        "Crucially, \\(G\\) is a true constant of nature — it is the **same for every pair of bodies, everywhere**.",
      table: {
        columns: ["Property", "Value / Statement"],
        rows: [
          {
            cells: ["SI unit", "N·m²/kg² (newton metre-squared per kilogram-squared)"],
            noteAmber: "NDA 2025 — the unit of G is N-m²/kg², derived from G = Fr²/(m₁m₂).",
            pyqExampleId: "cb1a2d0a-f278-4a54-89d5-20dc6c10cf85",
          },
          { cells: ["Dimensional formula", "M⁻¹L³T⁻²"] },
          { cells: ["Approximate value", "6.674 × 10⁻¹¹ N·m²/kg²"] },
          {
            cells: ["Universality", "Same for ALL pairs of bodies, everywhere; independent of mass, distance, location, or local g"],
            noteAmber: "NDA 2017 — G is a universal constant; it does NOT depend on the local value of g.",
            pyqExampleId: "b2a3f543-e489-4b1a-b619-9fab9b6e1bf9",
          },
          {
            cells: ["Force, in contrast, is NOT universal", "F itself depends on the masses and separation, so it differs for every pair of bodies"],
            noteAmber: "NDA 2018 — the false statement is 'gravitational force is the same for all pairs of bodies'. The force varies; only G is constant.",
            pyqExampleId: "08ef9a45-dfcd-49f5-aae7-4f26fdcb83c5",
          },
        ],
        caption:
          "G is the constant; the FORCE is not. Don't confuse 'G is universal' with 'the gravitational force is the same for all bodies' — the latter is false.",
      },
      selfCheckExample: {
        prompt:
          "A student claims the value of G is larger on the surface of the Earth than far out in space. Is this correct, and why?",
        steps: [
          "G is the universal gravitational constant — it has the same value everywhere in the universe.",
          "The quantity that varies with location is g (acceleration due to gravity), not G.",
        ],
        answer: "Incorrect — G is the same everywhere; only g changes with location.",
      },
      practiceSet: [
        { prompt: "SI unit of G?", answer: "N·m²/kg²" },
        { prompt: "Dimensional formula of G?", answer: "M⁻¹L³T⁻²" },
        { prompt: "Does G depend on the local value of g?", answer: "No — G is a universal constant" },
        { prompt: "Approximate value of G in SI units?", answer: "6.674 × 10⁻¹¹" },
      ],
      pyqExampleId: "cb1a2d0a-f278-4a54-89d5-20dc6c10cf85", // 2025 — unit of G
      traps: [
        {
          title: "G is universal, but the FORCE is not",
          body:
            "A favourite distractor states 'gravitational force is the same for all pairs of bodies in the universe' — this is FALSE. The constant G is universal; the force F = Gm₁m₂/r² depends on the specific masses and their separation, so it differs for every pair.",
        },
        {
          title: "Don't confuse G with g",
          body:
            "G (capital) is the universal constant 6.674 × 10⁻¹¹ N·m²/kg², the same everywhere. g (small) is the acceleration due to gravity ≈ 9.8 m/s² at Earth's surface, and it changes with planet, altitude and location.",
        },
      ],
    },

    // 3 — force scaling (the 16F problem)
    {
      kind: "formula" as const,
      slug: "grav-force-scaling",
      name: "Scaling the force — changing masses and distance together",
      intuition:
        "When a question changes BOTH the masses and the separation, handle each factor separately. Each mass multiplies the force by its own factor; the distance multiplies it by the inverse square of its factor. Multiply the three contributions together and you have the new force in one line.",
      definition:
        "Because \\(F = \\dfrac{G m_1 m_2}{r^2}\\), scaling the inputs scales the force multiplicatively:\n" +
        "- multiply \\(m_1\\) by a factor \\(a\\) → force \\(\\times a\\),\n" +
        "- multiply \\(m_2\\) by a factor \\(b\\) → force \\(\\times b\\),\n" +
        "- multiply \\(r\\) by a factor \\(c\\) → force \\(\\times \\dfrac{1}{c^2}\\).\n" +
        "So the overall scaling factor is \\(\\dfrac{ab}{c^2}\\).",
      formula: {
        label: "Force scaling factor",
        latex: "\\dfrac{F'}{F} = \\dfrac{a \\cdot b}{c^2}",
        symbols: [
          { symbol: "a, b", meaning: "factors by which the two masses change" },
          { symbol: "c", meaning: "factor by which the distance changes" },
          { symbol: "F'/F", meaning: "ratio of new force to original force" },
        ],
      },
      authoredExample: {
        prompt:
          "The force between two masses is F. If one mass is tripled and the distance is halved (the other mass unchanged), find the new force.",
        steps: [
          "One mass tripled: factor \\(a = 3\\). Other mass unchanged: \\(b = 1\\). Distance halved: \\(c = \\tfrac{1}{2}\\).",
          "Scaling factor \\(= \\dfrac{ab}{c^2} = \\dfrac{3 \\times 1}{(1/2)^2} = \\dfrac{3}{1/4} = 12\\).",
          "New force \\(= 12F\\).",
        ],
        answer: "\\(12F\\).",
      },
      selfCheckExample: {
        prompt:
          "Two bodies of mass M each are R apart, with force F between them. In a second system two bodies of mass 2M each are placed R/2 apart. Find the new force in terms of F.",
        steps: [
          "Both masses doubled: \\(a = 2\\), \\(b = 2\\). Distance halved: \\(c = \\tfrac{1}{2}\\).",
          "Scaling factor \\(= \\dfrac{ab}{c^2} = \\dfrac{2 \\times 2}{(1/2)^2} = \\dfrac{4}{1/4} = 16\\).",
          "New force \\(= 16F\\).",
        ],
        answer: "\\(16F\\).",
      },
      practiceSet: [
        { prompt: "Both masses doubled, distance unchanged. Force?", answer: "4F", method: "2 × 2 / 1" },
        { prompt: "One mass doubled, distance doubled. Force?", answer: "F/2", method: "2 / 2²" },
        { prompt: "Both masses tripled, distance tripled. Force?", answer: "F", method: "3 × 3 / 3² = 1" },
        { prompt: "Both masses halved, distance halved. Force?", answer: "F", method: "(½ × ½) / (½)² = 1" },
      ],
      pyqExampleId: "67c67c0e-d0cc-40a1-9067-bdf71b2c2da5", // 2019 — 16F
      traps: [
        {
          title: "Square only the distance factor",
          body:
            "When the distance changes by a factor c, the force changes by 1/c² — but the mass factors are NOT squared. For masses 2M each at R/2: the masses give 2 × 2 = 4, the distance gives 1/(½)² = 4, so the force is 16F, not 4F.",
        },
      ],
    },

    // 4 — Newton's third law: equal and opposite
    {
      kind: "formula" as const,
      slug: "grav-third-law",
      name: "Gravitational force is action-reaction — equal and opposite",
      intuition:
        "Gravitation is a mutual force: when the Earth pulls the Moon, the Moon pulls the Earth back with exactly the same strength. They form a Newton's-third-law action-reaction pair — equal in magnitude, opposite in direction — no matter how different the two masses are.",
      definition:
        "By **Newton's third law**, the gravitational force that body 1 exerts on body 2 is equal in magnitude and opposite in direction to the force body 2 exerts on body 1. " +
        "The shared formula \\(F = \\dfrac{G m_1 m_2}{r^2}\\) makes this explicit — it is symmetric in \\(m_1\\) and \\(m_2\\), so **both bodies feel the same magnitude of force**, regardless of how unequal their masses are.",
      formula: {
        label: "Action-reaction pair",
        latex: "\\vec{F}_{12} = -\\,\\vec{F}_{21}, \\qquad |\\vec{F}_{12}| = |\\vec{F}_{21}| = \\dfrac{G m_1 m_2}{r^2}",
        symbols: [
          { symbol: "\\(\\vec{F}_{12}\\)", meaning: "force on body 1 due to body 2" },
          { symbol: "\\(\\vec{F}_{21}\\)", meaning: "force on body 2 due to body 1" },
        ],
      },
      authoredExample: {
        prompt:
          "The Sun is roughly 330,000 times more massive than the Earth. Compare the magnitude of the gravitational force the Sun exerts on the Earth with the force the Earth exerts on the Sun.",
        steps: [
          "The two forces are a Newton's-third-law action-reaction pair.",
          "The single formula \\(F = G m_{\\text{Sun}} m_{\\text{Earth}} / r^2\\) gives the magnitude felt by BOTH bodies.",
          "So despite the enormous mass difference, the magnitudes are identical (directions opposite).",
        ],
        answer: "They are equal in magnitude and opposite in direction, despite the mass difference.",
      },
      selfCheckExample: {
        prompt:
          "Two planets have masses in the ratio 1 : 7 and diameters in the ratio 2 : 1. Find the ratio of the gravitational forces they exert on each other.",
        steps: [
          "The force each planet exerts on the other is a single action-reaction pair.",
          "The magnitude is the SAME for both (the formula is symmetric in the two masses), so the mass and size details are distractors.",
        ],
        answer: "1 : 1 — the two forces are always equal in magnitude.",
      },
      practiceSet: [
        { prompt: "Earth pulls a falling ball with force F. The ball pulls Earth with force?", answer: "F (equal, opposite direction)" },
        { prompt: "Force of Earth on Moon vs Moon on Earth — magnitudes?", answer: "Equal" },
        { prompt: "Do the two action-reaction gravity forces act on the same body?", answer: "No — one on each body" },
        { prompt: "Masses 1:100, do they exert equal forces on each other?", answer: "Yes — equal magnitudes" },
      ],
      pyqExampleId: "e59c2c3f-b628-4b17-b552-a1195a53641f", // 2023 — equal magnitude, opposite direction
      traps: [
        {
          title: "The bigger mass does NOT exert the bigger force",
          body:
            "Students often assume the more massive body pulls harder. It does not: the gravitational force is a single action-reaction pair, so the Earth pulls the Moon with exactly the magnitude the Moon pulls the Earth. Unequal masses, equal forces.",
        },
      ],
    },
  ],
};
