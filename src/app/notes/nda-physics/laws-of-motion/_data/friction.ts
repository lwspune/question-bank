import type { SubtopicNote } from "@/app/notes/_types";

export const FRICTION_NOTE: SubtopicNote = {
  subtopicName: "Friction",
  title: "Friction",
  oneLineDefinition:
    "Friction is the contact force that opposes relative sliding between surfaces; its limiting value is f = μN, where μ is the coefficient of friction and N is the normal force.",
  whyItMatters:
    "A small but reliable subtopic — roughly 3 PYQs across 2023–2024. " +
    "Two ideas cover it: the limiting-friction formula f = μN, and the ordering static > kinetic > rolling friction. " +
    "Computations are direct substitutions; the only subtlety is using the correct normal force (which equals the weight only on flat ground).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "limiting-friction",
      name: "Limiting (maximum) friction, f = μN",
      intuition:
        "Friction adjusts itself to oppose whatever push you apply — up to a maximum. That maximum, the limiting friction, is proportional to how hard the surfaces are pressed together (the normal force), with the constant of proportionality being the coefficient of friction. Heavier or more strongly pressed surfaces grip harder; smoother surfaces (smaller μ) grip less.",
      definition:
        "**Limiting (maximum static) friction** is \\(f_{\\max} = \\mu N\\), where \\(\\mu\\) is the coefficient of friction and \\(N\\) is the normal force pressing the surfaces together. " +
        "On a **horizontal** surface with no vertical applied force, \\(N = mg\\), so \\(f_{\\max} = \\mu m g\\). " +
        "Friction is independent of the apparent contact area; it depends only on \\(\\mu\\) and \\(N\\).",
      visualizationSlug: "lmf-friction-incline",
      formula: {
        label: "Limiting friction",
        latex: "f_{\\max} = \\mu N",
        symbols: [
          { symbol: "f_max", meaning: "maximum (limiting) friction force" },
          { symbol: "μ", meaning: "coefficient of friction (dimensionless)" },
          { symbol: "N", meaning: "normal force (= mg on flat ground)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 5 kg block rests on a horizontal floor with coefficient of friction 0.3 (take g = 10 m/s²). What horizontal force is just enough to start it moving?",
        steps: [
          "On flat ground the normal force equals the weight: \\(N = mg = 5 \\times 10 = 50\\,\\text{N}\\).",
          "Limiting friction: \\(f_{\\max} = \\mu N = 0.3 \\times 50 = 15\\,\\text{N}\\).",
          "The block starts to move once the applied force just exceeds 15 N.",
        ],
        answer: "15 N (the applied force must just exceed the limiting friction).",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg block sits on top of a 3 kg block; the coefficient of static friction between them is 0.2 (g = 10 m/s²). The bottom block is pulled so both move together. What is the maximum friction force available on the top block?",
        steps: [
          "The friction that drives the TOP block is limited by the normal force between the two blocks.",
          "That normal force is the top block's weight: \\(N = m_{\\text{top}} g = 2 \\times 10 = 20\\,\\text{N}\\).",
          "Maximum friction: \\(f_{\\max} = \\mu N = 0.2 \\times 20 = 4\\,\\text{N}\\).",
        ],
        answer: "4 N.",
      },
      practiceSet: [
        { prompt: "What is the formula for limiting friction?", answer: "f = μN" },
        { prompt: "On flat ground with no vertical push, the normal force equals what?", answer: "The weight, mg" },
        { prompt: "Block of 4 kg, μ = 0.25, g = 10: limiting friction?", answer: "10 N", method: "f = μmg = 0.25 × 4 × 10" },
        { prompt: "Does friction depend on the apparent area of contact?", answer: "No — only on μ and the normal force N" },
      ],
      pyqExampleId: "3412b519-ba35-4029-a696-91f654836bb4", // 2023 — stacked blocks, max friction 4 N
      traps: [
        {
          title: "Use the correct normal force, not always mg",
          body:
            "f = μN uses the NORMAL force, which equals mg only on flat ground with no vertical applied force. On an incline N = mg cos θ; for a block on top of another, N is the upper block's weight. Plugging the full weight when the geometry says otherwise is the most common friction error.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "friction-stopping-distance",
      name: "Friction as the only horizontal force — stopping a block",
      intuition:
        "When a block slides to a stop on a rough surface, friction is the only horizontal force, so it provides the full deceleration. You can find the friction either from the energy it dissipates over the stopping distance, or from F = ma using the deceleration. Both routes give the same answer.",
      definition:
        "For a block decelerating on a rough horizontal surface, friction is the net horizontal force: \\(f = ma\\). " +
        "Using kinematics \\(v^2 = u^2 - 2as\\) (final \\(v = 0\\)) gives the deceleration, or use work-energy: the friction work \\(f\\,s\\) equals the lost kinetic energy \\(\\tfrac12 m u^2\\).",
      formula: {
        label: "Friction from stopping (work-energy form)",
        latex: "f \\, s = \\tfrac{1}{2} m u^2 \\;\\Rightarrow\\; f = \\frac{m u^2}{2s}",
        symbols: [
          { symbol: "f", meaning: "frictional force" },
          { symbol: "s", meaning: "stopping distance" },
          { symbol: "u", meaning: "initial speed" },
          { symbol: "m", meaning: "mass of the block" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2 kg block moving at 3 m/s comes to rest on a rough horizontal surface after sliding 3 m. Find the frictional force.",
        steps: [
          "Friction work over the distance equals the kinetic energy lost: \\(f\\,s = \\tfrac12 m u^2\\).",
          "\\(\\tfrac12 m u^2 = \\tfrac12 \\times 2 \\times 3^2 = 9\\,\\text{J}\\).",
          "So \\(f \\times 3 = 9\\), giving \\(f = 3\\,\\text{N}\\).",
        ],
        answer: "3 N.",
      },
      selfCheckExample: {
        prompt:
          "A 4 kg block sliding at 4 m/s stops in 2 m on a rough floor. Find the friction force using kinematics and F = ma.",
        steps: [
          "Find the deceleration from \\(v^2 = u^2 - 2as\\) with \\(v = 0\\): \\(0 = 16 - 2a(2)\\), so \\(a = 4\\,\\text{m/s}^2\\).",
          "Friction is the only horizontal force: \\(f = ma = 4 \\times 4 = 16\\,\\text{N}\\).",
          "(Check via energy: \\(\\tfrac12(4)(16) = 32\\,\\text{J}\\); \\(f = 32/2 = 16\\,\\text{N}\\). Agrees.)",
        ],
        answer: "16 N.",
      },
      practiceSet: [
        { prompt: "A block stops on a rough floor. What is the only horizontal force on it?", answer: "Friction" },
        { prompt: "2 kg block at 3 m/s stops in 3 m. Friction force?", answer: "3 N", method: "f = mu²/2s = 2·9/6" },
        { prompt: "Friction work over distance s equals what?", answer: "The kinetic energy lost, ½mu²" },
        { prompt: "1 kg block at 2 m/s stops in 1 m. Friction?", answer: "2 N", method: "f = mu²/2s = 1·4/2" },
      ],
      pyqExampleId: "6e19c087-fcaf-4b27-b2e8-4c5d060284b0", // 2024 — block stops, friction 3 N
    },

    {
      kind: "reference" as const,
      slug: "types-of-friction",
      name: "Static, kinetic, and rolling friction",
      intuition:
        "Friction comes in three flavours that decrease in strength as motion gets easier. Static friction (before sliding starts) is the strongest — it's why it takes a big shove to get something moving. Kinetic friction (while sliding) is a bit less. Rolling friction (a wheel rolling) is the smallest — which is exactly why wheels and ball bearings are used.",
      definition:
        "Three regimes, in decreasing order of strength:\n" +
        "- **Static friction** — acts before sliding begins; self-adjusts up to a maximum \\(\\mu_s N\\). The largest of the three.\n" +
        "- **Kinetic (sliding) friction** — acts during sliding, \\(\\mu_k N\\); roughly constant and slightly less than the limiting static value.\n" +
        "- **Rolling friction** — acts when a body rolls; the smallest, which is why rolling beats dragging.\n" +
        "Ordering: **static > kinetic > rolling**.",
      table: {
        columns: ["Type", "When it acts", "Relative size"],
        rows: [
          { cells: ["Static", "Before sliding starts", "Largest (up to μ_s N)"] },
          { cells: ["Kinetic / sliding", "While the body slides", "Intermediate (μ_k N)"] },
          {
            cells: ["Rolling", "While the body rolls", "Smallest"],
            noteAmber: "NDA 2024 — the correct ordering is Static friction > Kinetic friction > Rolling friction.",
          },
        ],
        caption:
          "Rolling friction is the smallest, which is why wheels and ball bearings reduce resistance. NDA tests the ordering directly.",
      },
      selfCheckExample: {
        prompt:
          "Why is it harder to START pushing a heavy crate than to KEEP it moving once it slides?",
        steps: [
          "Before motion, static friction opposes you and can rise to its maximum value μ_s N.",
          "Once sliding begins, kinetic friction takes over, and μ_k is slightly less than the limiting μ_s.",
          "So the force needed to start exceeds the force needed to keep it going.",
        ],
        answer: "Because static (limiting) friction is greater than kinetic friction.",
      },
      practiceSet: [
        { prompt: "Order static, kinetic, and rolling friction from largest to smallest.", answer: "Static > Kinetic > Rolling" },
        { prompt: "Which friction acts before a body starts to slide?", answer: "Static friction" },
        { prompt: "Why do we use wheels and ball bearings?", answer: "Rolling friction is the smallest of the three" },
        { prompt: "Is kinetic friction larger or smaller than limiting static friction?", answer: "Smaller" },
      ],
      pyqExampleId: "da83d36e-896f-442c-b766-61614a3b986c", // 2024 — static > kinetic > rolling
    },
  ],
};
