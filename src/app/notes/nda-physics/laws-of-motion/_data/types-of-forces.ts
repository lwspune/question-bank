import type { SubtopicNote } from "@/app/notes/_types";

export const TYPES_OF_FORCES_NOTE: SubtopicNote = {
  subtopicName: "Types of Forces",
  title: "Types of Forces — the Vocabulary of the Chapter",
  oneLineDefinition:
    "A force is a push or pull that can change a body's state of motion; forces are classified as fundamental vs contact, central vs non-central, and conservative vs non-conservative.",
  whyItMatters:
    "Start here — every later concept assumes this vocabulary. NDA tests it directly as one-line recall: " +
    "the four fundamental forces, what a contact force is and the laws it obeys, which force is non-conservative (friction), and the three types of mechanical equilibrium. " +
    "Roughly 7 PYQs across 2018–2024, all EASY or MODERATE; pure memorisation marks.",
  concepts: [
    // FOUNDATION — what a force is (no PYQ)
    {
      kind: "formula" as const,
      slug: "what-is-a-force",
      name: "What a force is — the foundation",
      intuition:
        "A force is simply a push or a pull. You cannot see a force, only its effects: it can start a body moving, stop it, speed it up, slow it down, or change its direction. " +
        "Force is a vector — it has both a size and a direction — and its SI unit is the newton (N).",
      definition:
        "A **force** is an interaction that, when unopposed, changes the motion of a body. Its effects are:\n" +
        "- **Changing speed** — speeding up or slowing down (acceleration along the motion).\n" +
        "- **Changing direction** — turning the motion without changing speed (as in circular motion).\n" +
        "- **Changing shape** — deforming a body.\n" +
        "Force is a **vector quantity** measured in **newtons (N)**, where \\(1\\,\\text{N} = 1\\,\\text{kg m s}^{-2}\\).",
      formula: {
        label: "Definition of the newton (from Newton's second law)",
        latex: "1\\,\\text{N} = 1\\,\\text{kg} \\cdot 1\\,\\text{m s}^{-2}",
        symbols: [
          { symbol: "N", meaning: "newton, the SI unit of force" },
          { symbol: "kg", meaning: "kilogram, the SI unit of mass" },
          { symbol: "m s⁻²", meaning: "metre per second squared, the SI unit of acceleration" },
        ],
      },
      authoredExample: {
        prompt:
          "A constant force gives a 2 kg body an acceleration of 3 m/s². What is the size of the force, in newtons?",
        steps: [
          "A newton is defined so that \\(F = ma\\) holds with these SI units.",
          "Substitute: \\(F = 2\\,\\text{kg} \\times 3\\,\\text{m s}^{-2}\\).",
          "\\(F = 6\\,\\text{kg m s}^{-2} = 6\\,\\text{N}\\).",
        ],
        answer: "6 N.",
      },
      practiceSet: [
        { prompt: "What is the SI unit of force?", answer: "Newton (N)" },
        { prompt: "Is force a scalar or a vector?", answer: "Vector", method: "it has both magnitude and direction" },
        { prompt: "1 N equals how many kg m/s²?", answer: "1", method: "by definition, 1 N = 1 kg m s⁻²" },
        { prompt: "Name three effects a force can have on a body.", answer: "Change its speed, change its direction, change its shape" },
      ],
      traps: [
        {
          title: "Force is a vector — direction matters",
          body:
            "Two forces of the same magnitude can produce very different results depending on their directions. " +
            "When combining forces you must use vector addition (the parallelogram law), never simple arithmetic — adding 3 N and 4 N gives anything from 1 N to 7 N depending on the angle between them.",
        },
      ],
    },

    // fundamental forces
    {
      kind: "reference" as const,
      slug: "fundamental-and-contact-forces",
      name: "Fundamental forces vs contact forces",
      intuition:
        "Every force in the universe is built from just FOUR fundamental forces. Everyday forces like friction, tension, and the normal force are not separate fundamentals — they are large-scale manifestations of the electromagnetic force between atoms. " +
        "A useful everyday split is contact forces (the bodies touch) vs non-contact / action-at-a-distance forces (gravity, magnetism — they act across a gap).",
      definition:
        "There are exactly **four fundamental forces** in nature: gravitational, electromagnetic, and the strong and weak nuclear forces. " +
        "A **contact force** appears only when two bodies are in physical contact (friction, normal force, tension, drag); it obeys Newton's third law and can act between a solid and a fluid. " +
        "A **non-contact (field) force** acts across a distance without touching (gravity, electrostatic, magnetic).",
      table: {
        columns: ["Force", "Type", "Range / note"],
        rows: [
          { cells: ["Gravitational", "Fundamental, non-contact", "Always attractive; infinite range; weakest of the four"] },
          { cells: ["Electromagnetic", "Fundamental, non-contact", "Source of friction, tension, normal, contact forces at large scale"] },
          { cells: ["Strong nuclear", "Fundamental", "Binds protons and neutrons in the nucleus; very short range"] },
          { cells: ["Weak nuclear", "Fundamental", "Responsible for radioactive (beta) decay; very short range"] },
          {
            cells: ["Friction / Normal / Tension", "Contact (derived)", "Need physical contact; obey Newton's third law; can act solid-fluid"],
            noteAmber: "NDA 2024 — contact forces (1) need contact, (2) obey the third law, (3) can act between a solid and a fluid: all three statements are correct.",
          },
        ],
        caption:
          "The four fundamentals are the only true forces; everyday contact forces are electromagnetic in origin. NDA tests \"which are fundamental?\" (answer: all of gravity, EM, and the two nuclear forces).",
      },
      selfCheckExample: {
        prompt:
          "Classify each as contact or non-contact: (a) the pull of the Earth on a falling apple, (b) friction between your shoe and the floor, (c) the force a magnet exerts on a nearby nail.",
        steps: [
          "(a) Gravity acts across empty space without touching — non-contact.",
          "(b) Friction needs the two surfaces to be touching — contact.",
          "(c) Magnetic force reaches across a gap — non-contact.",
        ],
        answer: "(a) non-contact, (b) contact, (c) non-contact.",
      },
      practiceSet: [
        { prompt: "How many fundamental forces are there in nature?", answer: "Four", method: "gravitational, electromagnetic, strong nuclear, weak nuclear" },
        { prompt: "Which fundamental force is responsible for radioactive beta decay?", answer: "The weak nuclear force" },
        { prompt: "Is friction a contact force or a non-contact force?", answer: "Contact force" },
        { prompt: "Is the magnetic force a contact or non-contact force?", answer: "Non-contact (field) force" },
      ],
      pyqExampleId: "056681ee-c096-4d4d-af3c-d8df676f948a", // 2024 — which forces are fundamental
      traps: [
        {
          title: "Friction is a contact force; magnetism is non-contact — ALWAYS",
          body:
            "NDA 2021 asked whether \"friction is a contact force while magnetic force is a non-contact force\" is true. " +
            "It is ALWAYS true: friction requires touching surfaces, while magnetism reaches across a gap. The distractors hedge with \"sometimes\" or \"never\" — reject them.",
        },
      ],
    },

    // conservative vs non-conservative
    {
      kind: "reference" as const,
      slug: "conservative-vs-non-conservative",
      name: "Conservative vs non-conservative forces; central forces",
      intuition:
        "A conservative force gives back all the work you do against it — lift a book then lower it, and gravity returns the energy. A non-conservative force dissipates energy (usually as heat) so you never get it all back; friction is the classic example. " +
        "A central force acts along the line joining two bodies (gravity, electrostatic); a non-central force does not (friction acts tangentially along a surface).",
      definition:
        "A **conservative force** does work that depends only on the start and end points, not the path; the work it does around any closed loop is zero (gravitational, electrostatic, spring forces). " +
        "A **non-conservative force** dissipates mechanical energy (friction, air drag, viscous force) — its work depends on the path. " +
        "A **central force** points along the line joining the two interacting bodies; friction is **non-central** (tangential) **and non-conservative**.",
      table: {
        columns: ["Force", "Conservative?", "Central?"],
        rows: [
          { cells: ["Gravitational", "Conservative", "Central"] },
          { cells: ["Electrostatic", "Conservative", "Central"] },
          { cells: ["Spring (elastic restoring)", "Conservative", "Central (along the spring)"] },
          {
            cells: ["Friction", "Non-conservative", "Non-central"],
            noteAmber: "NDA 2019 — the force that is BOTH non-central AND non-conservative is friction (electric and gravitational are central and conservative).",
          },
          { cells: ["Air resistance / viscous drag", "Non-conservative", "Non-central"] },
        ],
        caption:
          "Friction is the only common force that is simultaneously non-central and non-conservative — a frequent NDA distractor target.",
      },
      selfCheckExample: {
        prompt:
          "You push a box in a complete loop around a room and bring it back to the start. Gravity did zero net work over the loop, but you still got tired. Which force took your energy, and what kind of force is it?",
        steps: [
          "Gravity is conservative: over a closed loop its net work is zero, so it is not where your energy went.",
          "The energy you spent went into overcoming friction between the box and the floor.",
          "Friction dissipates that energy as heat — it is a non-conservative force.",
        ],
        answer: "Friction — a non-conservative (and non-central) force; it converted your work into heat.",
      },
      practiceSet: [
        { prompt: "Name a force that is both non-central and non-conservative.", answer: "Friction" },
        { prompt: "Is gravitational force conservative or non-conservative?", answer: "Conservative" },
        { prompt: "What is the work done by a conservative force around a closed loop?", answer: "Zero" },
        { prompt: "Where does the energy go when a non-conservative force acts?", answer: "It is dissipated, usually as heat" },
      ],
      pyqExampleId: "8c29bbc5-e4ae-4694-afb8-6660c73e8b9a", // 2019 — non-central + non-conservative
    },

    // equilibrium types
    {
      kind: "reference" as const,
      slug: "types-of-equilibrium",
      name: "Equilibrium and restoring forces",
      intuition:
        "A body is in equilibrium when the net force on it is zero. But not all equilibria are alike — nudge the body and watch what happens. If it returns, the equilibrium is stable; if it keeps moving away, it is unstable; if it stays put in the new spot, it is neutral. The force that pulls a displaced body back is a restoring force.",
      definition:
        "A body is in **equilibrium** when the net (resultant) force on it is zero. Three types based on the response to a small displacement:\n" +
        "- **Stable** — a restoring force returns it to the original position (a ball in a valley; a pendulum bob).\n" +
        "- **Unstable** — a small push drives it further away (a ball balanced on top of a dome or rod).\n" +
        "- **Neutral** — it stays wherever you leave it (a ball on a flat table).\n" +
        "A **restoring force** always points back toward the equilibrium position; gravity provides the restoring force for a swinging pendulum.",
      table: {
        columns: ["Type", "Response to small push", "Example"],
        rows: [
          { cells: ["Stable", "Returns to original position", "Ball at the bottom of a bowl; pendulum bob"] },
          {
            cells: ["Unstable", "Moves further away", "Ball balanced on top of a vertical rod"],
            noteAmber: "NDA 2018 — a ball balanced on a vertical rod is in UNSTABLE equilibrium.",
          },
          { cells: ["Neutral", "Stays in the new position", "Ball resting on a flat horizontal table"] },
        ],
        caption:
          "Restoring force is the signature of stable equilibrium; for a pendulum, gravity supplies it (NDA 2018).",
      },
      selfCheckExample: {
        prompt:
          "For a pendulum bob displaced to one side, gravity pulls it back toward the lowest point. What is this an example of, and what type of equilibrium is the lowest point?",
        steps: [
          "The component of gravity along the arc points back toward the mean (lowest) position.",
          "A force that pushes a displaced body back toward equilibrium is a restoring force.",
          "Because the bob returns to the lowest point, that point is a position of stable equilibrium.",
        ],
        answer: "It is a restoring force; the lowest point is stable equilibrium.",
      },
      practiceSet: [
        { prompt: "What is the net force on a body in equilibrium?", answer: "Zero" },
        { prompt: "A ball balanced on top of a vertical rod is in which type of equilibrium?", answer: "Unstable equilibrium" },
        { prompt: "A ball on a flat table is in which type of equilibrium?", answer: "Neutral equilibrium" },
        { prompt: "What type of force brings a displaced body back to equilibrium?", answer: "A restoring force" },
      ],
      pyqExampleId: "176fed50-ffc3-426d-b11e-b673721e0203", // 2018 — ball on rod, unstable
      traps: [
        {
          title: "Gravity acts as the RESTORING force for a pendulum",
          body:
            "NDA 2018 asked what kind of force gravity provides for a vibrating pendulum bob. " +
            "The answer is restoring force — not \"applied\" (no external push) and not \"frictional\". The component of weight along the swing always points back to the mean position.",
        },
      ],
    },
  ],
};
