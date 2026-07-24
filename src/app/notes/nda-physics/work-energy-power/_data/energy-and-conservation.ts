import type { SubtopicNote } from "@/app/notes/_types";

export const ENERGY_AND_CONSERVATION_NOTE: SubtopicNote = {
  subtopicName: "Energy and Conservation",
  title: "Energy — Kinetic, Potential, and Conservation",
  oneLineDefinition:
    "Energy is the capacity to do work. The two mechanical forms are kinetic energy (½mv², due to motion) and potential energy (mgh, due to position). On a frictionless system the total stays constant — energy only changes form, never disappears.",
  whyItMatters:
    "This is the largest subtopic in the chapter — 10 PYQs from 2017 to 2026, spanning EASY recall (what is potential energy, the conservation statement) to MODERATE numericals (find the landing speed from the drop height) and the chapter's two HARD outliers (potential energy from a force law, and kinetic-energy change across reference frames). " +
    "Master ½mv², mgh, and the PE-to-KE conversion of a falling body and you cover the bulk of the chapter's marks.",
  concepts: [
    // Concept 1 — FOUNDATION: energy is the capacity to do work + its forms
    {
      kind: "formula" as const,
      slug: "wep-kinetic-energy",
      name: "Kinetic energy — energy of motion (½mv²)",
      intuition:
        "Anything that moves can do work on something else when it stops — a moving hammer drives a nail, moving water turns a turbine. " +
        "That stored capacity due to motion is kinetic energy, and it grows with the SQUARE of the speed, so doubling the speed quadruples the kinetic energy.",
      definition:
        "**Kinetic energy** is the energy a body has by virtue of its motion: \\(KE = \\tfrac{1}{2}mv^2\\). " +
        "It is a **scalar**, measured in joules, and is always **positive or zero**. " +
        "Because it depends on \\(v^2\\), the kinetic energy rises steeply with speed.",
      formula: {
        label: "Kinetic energy",
        latex: "KE = \\tfrac{1}{2}mv^2",
        symbols: [
          { symbol: "KE", meaning: "kinetic energy (J)" },
          { symbol: "m", meaning: "mass of the body (kg)" },
          { symbol: "v", meaning: "speed of the body (m/s)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 4 kg ball moves at 3 m/s. Find its kinetic energy.",
        steps: [
          "Use \\(KE = \\tfrac{1}{2}mv^2\\).",
          "Substitute \\(m = 4\\) kg, \\(v = 3\\) m/s.",
          "\\(KE = \\tfrac{1}{2}(4)(3^2) = \\tfrac{1}{2}(4)(9) = 18\\) J.",
        ],
        answer: "\\(KE = 18\\) J.",
      },
      selfCheckExample: {
        prompt:
          "An object of mass 2 kg has 100 J of kinetic energy. Find its speed.",
        steps: [
          "Rearrange \\(KE = \\tfrac{1}{2}mv^2\\) for \\(v\\): \\(v = \\sqrt{2\\,KE/m}\\).",
          "\\(v = \\sqrt{2 \\times 100 / 2} = \\sqrt{100}\\).",
          "\\(v = 10\\) m/s.",
        ],
        answer: "\\(v = 10\\) m/s.",
      },
      practiceSet: [
        { prompt: "A 1 kg body moves at 4 m/s. Find its kinetic energy.", answer: "8 J", method: "\\(\\tfrac{1}{2}(1)(4^2) = \\tfrac{1}{2}(16)\\)" },
        { prompt: "If the speed of a body doubles, its kinetic energy becomes how many times the original?", answer: "4 times", method: "\\(KE \\propto v^2\\)" },
        { prompt: "A 2 kg object has KE 36 J. Find its speed.", answer: "6 m/s", method: "\\(v = \\sqrt{2 \\times 36 / 2} = \\sqrt{36}\\)" },
        { prompt: "Can kinetic energy be negative?", answer: "No", method: "\\(\\tfrac{1}{2}mv^2 \\ge 0\\) always" },
      ],
      pyqExampleId: "207fe56e-82c6-4e2e-8d1d-20dc9fb96973", // 2021 — KE 100 J, m 2 kg, v = 10 m/s
      traps: [
        {
          title: "Kinetic energy grows with the SQUARE of speed",
          body:
            "Doubling the speed multiplies kinetic energy by 4, tripling it by 9. A body at twice the speed of another (same mass) carries four times the kinetic energy — not twice.",
        },
        {
          title: "Convert grams to kilograms before substituting",
          body:
            "The mass in \\(\\tfrac{1}{2}mv^2\\) must be in kilograms. A mass given as 2000 g is 2 kg; forgetting to convert gives an answer 1000 times too large.",
        },
      ],
    },

    // Concept 2 — potential energy (mgh)
    {
      kind: "formula" as const,
      slug: "wep-potential-energy",
      name: "Potential energy — energy of position (mgh)",
      intuition:
        "Lift a body up and you store energy in it — release it and gravity converts that stored energy back into motion. " +
        "This energy of position or configuration is potential energy; for a body raised to a height it equals the work done against gravity to put it there.",
      definition:
        "**Potential energy** is the energy a body possesses by virtue of its **position or shape (configuration)**. " +
        "For a body of mass \\(m\\) raised through a height \\(h\\) near the Earth's surface, the gravitational potential energy is \\(PE = mgh\\). " +
        "It is measured from a chosen reference level (usually the ground), where \\(PE = 0\\).",
      formula: {
        label: "Gravitational potential energy",
        latex: "PE = mgh",
        symbols: [
          { symbol: "PE", meaning: "gravitational potential energy (J)" },
          { symbol: "m", meaning: "mass of the body (kg)" },
          { symbol: "g", meaning: "acceleration due to gravity (\\(\\approx 9.8\\) m/s²)" },
          { symbol: "h", meaning: "height above the reference level (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 3 kg block rests on a shelf 2 m above the floor. Find its gravitational potential energy relative to the floor. Take \\(g = 10\\) m/s².",
        steps: [
          "Use \\(PE = mgh\\).",
          "Substitute \\(m = 3\\) kg, \\(g = 10\\) m/s², \\(h = 2\\) m.",
          "\\(PE = 3 \\times 10 \\times 2 = 60\\) J.",
        ],
        answer: "\\(PE = 60\\) J.",
      },
      selfCheckExample: {
        prompt:
          "How high must a 2 kg ball be raised to store 400 J of gravitational potential energy? Take \\(g = 10\\) m/s².",
        steps: [
          "Rearrange \\(PE = mgh\\) for \\(h\\): \\(h = PE/(mg)\\).",
          "\\(h = 400 / (2 \\times 10) = 400 / 20\\).",
          "\\(h = 20\\) m.",
        ],
        answer: "\\(h = 20\\) m.",
      },
      practiceSet: [
        { prompt: "Energy possessed by a body due to its position or shape is called what?", answer: "Potential energy" },
        { prompt: "A 5 kg body is at height 3 m. Find its PE. (g = 10)", answer: "150 J", method: "\\(PE = mgh = 5 \\times 10 \\times 3\\)" },
        { prompt: "At what height is the gravitational PE usually taken as zero?", answer: "At the chosen reference level (ground)" },
        { prompt: "A stretched spring stores which kind of energy?", answer: "Potential energy", method: "energy of configuration / shape" },
      ],
      pyqExampleId: "37b0ceb1-8fca-4ea8-b096-8bbb6f007407", // 2022 — energy due to position/shape = potential energy
      traps: [
        {
          title: "Potential energy is about POSITION or SHAPE — not motion",
          body:
            "A body raised to a height, a compressed spring, or a stretched bow all store potential energy because of their configuration. Energy due to motion is kinetic energy — keep the two definitions distinct.",
        },
      ],
    },

    // Concept 3 — conservation of energy and the falling body (PE -> KE)
    {
      kind: "formula" as const,
      slug: "wep-conservation-of-energy",
      name: "Conservation of energy — PE converts to KE as a body falls",
      intuition:
        "Drop a ball: at the top it is all potential energy and no motion; at the bottom it is all kinetic energy and no height. " +
        "Energy is not lost — it simply changes form. On a frictionless path the sum PE + KE is the same at every point.",
      definition:
        "The **law of conservation of energy** states that energy can be **neither created nor destroyed — only transformed** from one form to another; the total energy of an **isolated system** is constant. " +
        "For a body falling freely (no friction), mechanical energy is conserved: \\(PE + KE = \\text{constant}\\). " +
        "So a body dropped from rest through height \\(h\\) arrives with \\(\\tfrac{1}{2}mv^2 = mgh\\), giving \\(v = \\sqrt{2gh}\\) — and at that instant its kinetic energy equals the potential energy it started with.",
      formula: {
        label: "Energy conservation for a freely falling body",
        latex: "mgh = \\tfrac{1}{2}mv^2 \\;\\Rightarrow\\; v = \\sqrt{2gh}",
        symbols: [
          { symbol: "mgh", meaning: "potential energy at the top (J)" },
          { symbol: "\\(\\tfrac{1}{2}mv^2\\)", meaning: "kinetic energy at the bottom (J)" },
          { symbol: "v", meaning: "landing speed (m/s)" },
        ],
      },
      visualizationSlug: "wep-energy-conservation-track",
      authoredExample: {
        prompt:
          "A ball of mass 0.32 kg is released from a height where it has 625 J of potential energy. With what speed does it hit the ground (ignore air resistance)?",
        steps: [
          "All the potential energy converts to kinetic energy: \\(\\tfrac{1}{2}mv^2 = 625\\) J.",
          "\\(\\tfrac{1}{2}(0.32)v^2 = 625 \\Rightarrow v^2 = 625 / 0.16 = 3906.25\\).",
          "\\(v = \\sqrt{3906.25} = 62.5\\) m/s.",
        ],
        answer: "\\(v = 62.5\\) m/s.",
      },
      selfCheckExample: {
        prompt:
          "A 2 kg body is dropped from a balloon at rest 50 m above the ground. Find its total mechanical energy when dropped, and its speed just before landing. Take \\(g = 9.8\\) m/s².",
        steps: [
          "At the top the body is at rest, so total energy = PE = \\(mgh = 2 \\times 9.8 \\times 50 = 980\\) J.",
          "At the ground all of it is kinetic: \\(\\tfrac{1}{2}(2)v^2 = 980 \\Rightarrow v^2 = 980\\).",
          "\\(v = \\sqrt{980}\\) m/s.",
        ],
        answer: "Total energy 980 J; landing speed \\(\\sqrt{980}\\) m/s.",
      },
      practiceSet: [
        { prompt: "State the law of conservation of energy in one line.", answer: "Energy can neither be created nor destroyed, only transformed", method: "total energy of an isolated system is constant" },
        { prompt: "A body falls freely from height h from rest. Its landing speed?", answer: "\\(\\sqrt{2gh}\\)", method: "\\(mgh = \\tfrac{1}{2}mv^2\\)" },
        { prompt: "A ball thrown up reaches highest point B from A. Compare KE at A with PE at B.", answer: "Equal", method: "all KE at A converts to PE at B" },
        { prompt: "For which kind of system is total energy always conserved — open, closed, or isolated?", answer: "Isolated", method: "no energy crosses the boundary" },
      ],
      pyqExampleId: "4af38486-56ea-4dd4-ba91-91a1e07f1768", // 2024 — PE 625 J, m 0.32 kg, v = 62.5 m/s
      traps: [
        {
          title: "Energy is conserved for an ISOLATED system",
          body:
            "The total energy stays constant only when no energy crosses the system boundary — that is the isolated case. For real bodies, friction and air resistance carry mechanical energy away as heat and sound, so MECHANICAL energy alone is not conserved, but total energy still is.",
        },
        {
          title: "At the bottom of a free fall, KE equals the starting PE",
          body:
            "For a body dropped from rest, the kinetic energy on landing equals the potential energy it had at the top: \\(\\tfrac{1}{2}mv^2 = mgh\\). Set them equal — do not add them.",
        },
      ],
    },

    // Concept 4 — conservative vs non-conservative forces + energy transformations (REFERENCE)
    {
      kind: "reference" as const,
      slug: "wep-conservative-forces-and-transformations",
      name: "Conservative forces and energy transformations",
      intuition:
        "Some forces store energy you can get back (lift a weight, recover it by lowering) — these are conservative. Others dissipate it irreversibly as heat or sound (friction, air drag) — these are non-conservative. " +
        "The NDA tests this as a recall fact (\"which is NOT a conservative force?\") and as a sequence-of-transformations question (an apple falling).",
      definition:
        "A **conservative force** does work that is path-independent and recoverable (gravity, spring force, electrostatic force). A **non-conservative (dissipative) force** does path-dependent work that turns mechanical energy into heat or sound (friction, air resistance, viscous drag). " +
        "Energy continually transforms between forms; the table below lists the facts and the canonical falling-apple sequence the bank tests.",
      table: {
        columns: ["Item", "Classification / sequence", "Note"],
        rows: [
          { cells: ["Gravitational force", "Conservative", "work depends only on height change"] },
          { cells: ["Spring (elastic) force", "Conservative", "energy fully recovered on release"] },
          { cells: ["Electrostatic force", "Conservative", "path-independent work"] },
          {
            cells: ["**Frictional force**", "**Non-conservative**", "dissipates energy as heat — the bank's answer"],
            noteAmber: "\"Which is NOT a conservative force?\" — the answer is friction.",
          },
          { cells: ["Air resistance / drag", "Non-conservative", "removes mechanical energy as heat"] },
          {
            cells: ["Apple falling to ground", "GPE → KE → Sound → Heat", "PE turns to motion, then a thud, then heat on impact"],
            noteAmber: "The correct transfer sequence: gravitational PE → kinetic → sound → heat.",
          },
        ],
        caption:
          "Friction is the standard \"not conservative\" answer; the falling-apple sequence runs gravitational PE → KE → sound → heat.",
      },
      selfCheckExample: {
        prompt:
          "Give the correct sequence of energy transformations when an apple falls from a tree and lands on the ground.",
        steps: [
          "While hanging the apple has gravitational potential energy.",
          "As it falls, PE converts to kinetic energy (it speeds up).",
          "On impact the KE becomes sound (the thud) and then heat in the apple and ground.",
        ],
        answer: "Gravitational PE → kinetic energy → sound → heat.",
      },
      practiceSet: [
        { prompt: "Which of these is NOT a conservative force: gravity, spring force, electrostatic force, friction?", answer: "Friction", method: "it dissipates energy as heat" },
        { prompt: "Name one conservative force.", answer: "Gravity (or spring / electrostatic force)" },
        { prompt: "When an apple hits the ground, KE converts mainly into which two forms?", answer: "Sound and heat" },
        { prompt: "Is air resistance conservative or non-conservative?", answer: "Non-conservative", method: "it removes mechanical energy as heat" },
      ],
      pyqExampleId: "818e692b-2eef-409d-aef9-88bcaa1ec706", // 2021 — friction is NOT conservative
      traps: [
        {
          title: "Friction is the standard NON-conservative force",
          body:
            "Gravity, spring force, and electrostatic force are conservative (recoverable, path-independent). Friction and air resistance are non-conservative — they turn mechanical energy into heat and cannot give it back.",
        },
        {
          title: "The falling-apple sequence ends in HEAT, not sound",
          body:
            "The order is gravitational PE → kinetic → sound → heat. KE turns to sound (the thud) AND heat on impact — distractors reorder these or put heat before kinetic energy.",
        },
      ],
    },

    // Concept 5 — HARD: kinetic-energy change across reference frames
    {
      kind: "formula" as const,
      slug: "wep-kinetic-energy-frame-dependence",
      name: "Kinetic energy and its change depend on the reference frame",
      intuition:
        "Speed is measured relative to an observer, and kinetic energy depends on speed — so two observers moving differently disagree on a body's kinetic energy AND on how much it changes. " +
        "This is the chapter's hardest idea: even the CHANGE in kinetic energy is frame-dependent, because the work done by a force depends on the displacement seen in each frame.",
      definition:
        "Because \\(KE = \\tfrac{1}{2}mv^2\\) uses the speed relative to the observer, kinetic energy is **not absolute** — it differs from frame to frame. " +
        "The change \\(\\Delta K\\) over a process is likewise frame-dependent: for a body that starts at speed \\(u\\) (in a moving frame) and gains an extra \\(\\sqrt{2gh}\\) by falling, \\(\\Delta K = mgh + mu\\sqrt{2gh}\\) — larger than the rest-frame value \\(mgh\\) by the cross term \\(mu\\sqrt{2gh}\\). " +
        "The deeper reason: work \\(= F \\times\\) displacement, and the displacement of the ground differs between the frames.",
      formula: {
        label: "Frame-dependent change in kinetic energy",
        latex: "\\Delta K_{S'} = mgh + mu\\sqrt{2gh} \\;>\\; \\Delta K_{S} = mgh",
        symbols: [
          { symbol: "\\(\\Delta K_S\\)", meaning: "KE change in the rest frame = mgh" },
          { symbol: "\\(\\Delta K_{S'}\\)", meaning: "KE change in a frame moving with speed u" },
          { symbol: "u", meaning: "relative speed of the two frames (m/s)" },
        ],
      },
      authoredExample: {
        prompt:
          "A ball is dropped from rest through height \\(h\\). In the ground frame, find the change in its kinetic energy. Then state qualitatively how the change compares in a frame moving upward at speed \\(u\\).",
        steps: [
          "Ground frame: starts at rest, lands at \\(v = \\sqrt{2gh}\\), so \\(\\Delta K_S = \\tfrac{1}{2}m(2gh) = mgh\\).",
          "Moving frame \\(S'\\): the ball already has downward speed \\(u\\) at release and reaches \\(u + \\sqrt{2gh}\\).",
          "\\(\\Delta K_{S'} = \\tfrac{1}{2}m[(u+\\sqrt{2gh})^2 - u^2] = mgh + mu\\sqrt{2gh}\\), which is larger by the positive term \\(mu\\sqrt{2gh}\\).",
        ],
        answer: "\\(\\Delta K_S = mgh\\); the change is LARGER in the moving frame \\(S'\\).",
      },
      selfCheckExample: {
        prompt:
          "Two observers — one standing still, one in a train moving at constant velocity — measure the kinetic energy of the same rolling ball. Do they get the same value? Why?",
        steps: [
          "Kinetic energy uses the ball's speed RELATIVE to each observer.",
          "The two observers measure different speeds for the ball, so they compute different \\(\\tfrac{1}{2}mv^2\\).",
          "Therefore kinetic energy is frame-dependent — there is no single absolute value.",
        ],
        answer: "No — kinetic energy depends on the observer's frame because speed does.",
      },
      practiceSet: [
        { prompt: "Is kinetic energy the same in every reference frame?", answer: "No", method: "it depends on the speed measured in that frame" },
        { prompt: "A ball dropped from rest falls height h. Change in KE in the ground frame?", answer: "mgh", method: "\\(\\tfrac{1}{2}m(2gh)\\)" },
        { prompt: "In a frame moving relative to the ground, is the CHANGE in a falling body's KE generally the same as in the ground frame?", answer: "No", method: "it differs by a cross term mu√(2gh)" },
        { prompt: "Why does the change in KE differ between frames?", answer: "Work = force × displacement, and the displacement differs between frames" },
      ],
      pyqExampleId: "10aa9f07-ba25-4a44-bfc0-04ddc061313f", // 2026 — ΔK larger in moving frame S'
      traps: [
        {
          title: "Even the CHANGE in kinetic energy is frame-dependent",
          body:
            "It is tempting to think \\(\\Delta K\\) is the same for all observers since both see the same fall. It is not — the moving frame adds a cross term \\(mu\\sqrt{2gh}\\), because work depends on the displacement seen in that frame.",
        },
      ],
    },
  ],
};
