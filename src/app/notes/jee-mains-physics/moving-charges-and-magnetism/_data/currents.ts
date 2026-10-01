import type { SubtopicNote } from "@/app/notes/_types";

export const CURRENTS_MAG_NOTE: SubtopicNote = {
  subtopicName: "Forces and Torques on Current-Carrying Wires",
  title: "Forces and Torques on Current-Carrying Wires",
  oneLineDefinition:
    "A wire in a field feels F = I L × B; two parallel currents attract or repel with μ₀I₁I₂/2πd per metre; and a coil of moment NIA feels a torque NIAB sin θ that turns its axis towards the field.",
  whyItMatters:
    "Twenty-six PYQs, fourteen of them multiple choice, and four from 2026; nearly half ask for a number. Twelve find the force on a wire in a field: four on a straight piece, four on a wire held up or balanced against its weight, two on a loop in a field that grows along x, one on a bent wire and one on a flexible loop. Six are forces between parallel wires. Eight are a coil's magnetic moment or the torque on it.",
  concepts: [
    // C1 — force on a wire
    {
      kind: "formula" as const,
      slug: "jpmag-wire-force",
      name: "Force on a current-carrying wire in a magnetic field",
      intuition:
        "A current is moving charge, so a wire carrying it in a field feels the sum of q v × B on all its charges: I L × B. The force is across both the wire and the field. For a bent wire in a uniform field, only the straight line from one end to the other matters, so a closed loop in a uniform field feels no net force at all.",
      definition:
        "- \\(\\vec F = I\\,\\vec L \\times \\vec B\\), size \\(ILB\\sin\\theta\\), with \\(\\theta\\) the angle between the wire and B. Only the length inside the field counts.\n" +
        "- Bent wire in a uniform field: use the straight vector from start to end. A semicircle of radius R acts like a straight wire of length 2R.\n" +
        "- Closed loop in a uniform field: net force zero (it may still feel a torque).\n" +
        "- Field that varies, \\(\\vec B = B_0(1 + kx)\\hat k\\), on a square loop of side L with sides along the axes: the two sides along y feel opposite forces of different size; the net force is \\(I L \\times B_0 k L = I L^{2} B_0 k\\), along x. The sides along x cancel.\n" +
        "- Wire held up by the field: \\(BIL = mg\\). Rod on a smooth incline of angle \\(\\theta\\) with a vertical field: the horizontal force balances when \\(BIL = mg\\tan\\theta\\).\n" +
        "- A flexible loop carrying current in a field pulls itself into a circle, the shape of largest area, with its plane normal to the field.",
      formula: {
        label: "Force on a wire",
        latex: "\\vec F = I\\,\\vec L \\times \\vec B, \\qquad F = ILB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A wire bent into a semicircle of radius 10 cm carries 4 A. It lies in a plane perpendicular to a uniform field of 0.5 T. Find the force on it.",
        steps: [
          "In a uniform field, a bent wire acts like the straight line joining its ends. For a semicircle that is the diameter, 2R = 0.2 m.",
          "The field is perpendicular to the wire's plane, so \\(\\sin\\theta = 1\\).",
          "\\(F = I(2R)B = 4 \\times 0.2 \\times 0.5 = 0.4\\) N, perpendicular to the diameter, in the plane of the wire.",
        ],
        answer: "0.4 N",
      },
      selfCheckExample: {
        prompt:
          "A horizontal rod of mass 48 g and length 30 cm lies at right angles to a horizontal field of 0.4 T. What current makes it float? (g = 10 m/s²)",
        steps: [
          "The magnetic force must be upward and equal to the weight: \\(BIL = mg\\).",
          "\\(I = \\dfrac{mg}{BL} = \\dfrac{0.048 \\times 10}{0.4 \\times 0.3} = \\dfrac{0.48}{0.12} = 4\\) A.",
        ],
        answer: "4 A",
      },
      practiceSet: [
        { prompt: "A 50 cm wire carrying 3 A lies at right angles to a 0.2 T field. Force on it?", answer: "0.3 N" },
        { prompt: "What is the net force on a closed current loop of any shape in a uniform magnetic field?", answer: "Zero" },
        { prompt: "A square loop of side 1 m, sides along the axes, carries 2 A in the field \\(\\vec B = 0.1(1 + 3x)\\hat k\\) T. Size of the net force?", answer: "0.6 N" },
        { prompt: "A rod of 0.1 kg per metre rests on a smooth \\(30^{\\circ}\\) incline in a vertical field of 0.5 T. Current that holds it still? (g = 10 m/s²)", answer: "\\(2/\\sqrt3 \\approx 1.15\\) A" },
      ],
      pyqExampleId: "9c5fc916-df5a-4d05-81f2-0e3baea14bde", // 5 Apr 2024: 2 A wire of 500 g held in mid-air, length from R = ρl/A, B = 5 × 10⁻¹ T
      traps: [
        {
          title: "Only the part in the field counts",
          body: "When a wire runs partly through a field region, L in ILB is the length inside the region. Using the whole wire overstates the force.",
        },
        {
          title: "A bent wire's force uses the chord",
          body: "In a uniform field, a semicircle of radius R feels the same force as a straight wire of length 2R joining its ends, not πR.",
        },
        {
          title: "θ is the angle between the wire and the field",
          body: "F = ILB sin θ is largest when the wire is perpendicular to B and zero when the wire lies along B. A wire at 30° to the field feels half the largest force.",
        },
      ],
    },

    // C2 — parallel wires
    {
      kind: "formula" as const,
      slug: "jpmag-parallel-force",
      name: "Force between two parallel currents",
      intuition:
        "Each wire sits in the field of the other, so each feels I L × B. The result is a force per metre of μ₀I₁I₂/2πd. Unlike electric charges, like currents attract and opposite currents repel. By Newton's third law the two wires feel equal and opposite forces, even when the currents are different.",
      definition:
        "- Force per unit length: \\(\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}\\). For a length L, multiply by L.\n" +
        "- Currents in the same direction attract; in opposite directions they repel.\n" +
        "- The forces on the two wires are equal and opposite, over the length they share.\n" +
        "- \\(F \\propto \\dfrac{I_1 I_2}{d}\\): with equal currents, \\(F \\propto \\dfrac{I^{2}}{d}\\).\n" +
        "- Several wires: find the force from each neighbour on the wire in question, with its direction, and add.\n" +
        "- The ampere was defined from this: two wires 1 m apart, each with 1 A, feel \\(2 \\times 10^{-7}\\) N per metre.",
      formula: {
        label: "Force per metre between parallel wires",
        latex: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
      },
      authoredExample: {
        prompt:
          "Two long parallel wires 4 cm apart carry 6 A and 8 A in opposite directions. Find the force per metre and the force on a 50 cm length of either wire. Do they attract or repel? (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)",
        steps: [
          "\\(\\dfrac{F}{L} = \\dfrac{2 \\times 10^{-7} \\times 6 \\times 8}{0.04} = \\dfrac{9.6 \\times 10^{-6}}{0.04} = 2.4 \\times 10^{-4}\\) N/m.",
          "On 0.5 m: \\(F = 1.2 \\times 10^{-4}\\) N, the same on each wire.",
          "Opposite currents repel.",
        ],
        answer: "\\(2.4 \\times 10^{-4}\\) N/m; \\(1.2 \\times 10^{-4}\\) N on 50 cm; they repel.",
      },
      selfCheckExample: {
        prompt:
          "Two long parallel wires carry 4 A and 9 A. The force between them is \\(1.2 \\times 10^{-4}\\) N per metre. How far apart are they? (\\(\\mu_0/2\\pi = 2 \\times 10^{-7}\\) T m/A)",
        steps: [
          "\\(d = \\dfrac{2 \\times 10^{-7} \\times I_1 I_2}{F/L} = \\dfrac{2 \\times 10^{-7} \\times 36}{1.2 \\times 10^{-4}}\\).",
          "\\(d = \\dfrac{7.2 \\times 10^{-6}}{1.2 \\times 10^{-4}} = 0.06\\) m.",
        ],
        answer: "6 cm",
      },
      practiceSet: [
        { prompt: "Two parallel wires carry currents in the same direction. Do they attract or repel?", answer: "Attract" },
        { prompt: "Both currents in two parallel wires are doubled and their separation is tripled. By what factor does the force change?", answer: "\\(4/3\\)" },
        { prompt: "Two long wires 1 m apart each carry 1 A. Force per metre between them? (\\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A)", answer: "\\(2 \\times 10^{-7}\\) N/m" },
        { prompt: "Three equally spaced parallel wires carry equal currents in the same direction. Net force on the middle wire?", answer: "Zero" },
      ],
      pyqExampleId: "f065cc93-3848-4543-8a13-0306a8384d9e", // 24 Jan 2023: 10 A each at 5 cm; currents doubled and distance halved, 8F₁
      traps: [
        {
          title: "Like currents attract",
          body: "This is the opposite of charges: two wires with current in the same direction pull together. Opposite currents push apart.",
        },
        {
          title: "The two forces are equal even if the currents differ",
          body: "A 2 A wire beside a 10 A wire feels the same size of force as the 10 A wire does, over the same length. The force depends on the product I₁I₂, which is the same for both.",
        },
        {
          title: "The force goes as the product, not the sum",
          body: "F/L = μ₀I₁I₂/2πd. Doubling both currents multiplies the force by four, and halving the distance doubles it again.",
        },
      ],
    },

    // C3 — magnetic moment and torque
    {
      kind: "formula" as const,
      slug: "jpmag-moment-torque",
      name: "Magnetic moment of a coil and the torque on it",
      intuition:
        "A current loop behaves like a small magnet. Its strength is the magnetic moment m = NIA, pointing along the loop's axis by the right-hand rule. In a uniform field the forces on its sides cancel, but they form a couple that turns the axis towards the field. The turning effect is largest when the coil's plane lies along the field and zero when its axis lies along the field.",
      definition:
        "- Magnetic moment \\(\\vec m = N I \\vec A\\), size NIA, along the coil's axis (curl the right-hand fingers along the current; the thumb gives \\(\\vec m\\)).\n" +
        "- Torque \\(\\vec \\tau = \\vec m \\times \\vec B\\), size \\(NIAB\\sin\\theta\\), where \\(\\theta\\) is the angle between the AXIS (the normal) and B, not the plane.\n" +
        "- Plane of the coil parallel to B: \\(\\theta = 90^{\\circ}\\), largest torque NIAB. Plane perpendicular to B: zero torque.\n" +
        "- Concentric loops with currents in opposite senses: their moments point opposite ways and subtract.\n" +
        "- A given length of wire made into a coil: more turns means smaller area per turn. For a circle of N turns from a length L, \\(A = \\pi\\left(\\dfrac{L}{2\\pi N}\\right)^{2}\\).\n" +
        "- Vector form: with \\(\\vec m\\) and \\(\\vec B\\) in components, find \\(\\vec \\tau\\) by the cross product.",
      formula: {
        label: "Moment and torque",
        latex: "\\vec m = NI\\vec A, \\qquad \\vec \\tau = \\vec m \\times \\vec B, \\qquad \\tau = NIAB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A rectangular coil of 50 turns, 4 cm by 5 cm, carries 2 A in a uniform field of 0.3 T. The plane of the coil makes \\(30^{\\circ}\\) with the field. Find the magnetic moment and the torque.",
        steps: [
          "\\(A = 0.04 \\times 0.05 = 2 \\times 10^{-3}\\ \\text{m}^{2}\\); \\(m = NIA = 50 \\times 2 \\times 2 \\times 10^{-3} = 0.2\\ \\text{A m}^{2}\\).",
          "The plane is at \\(30^{\\circ}\\) to B, so the axis is at \\(60^{\\circ}\\) to B.",
          "\\(\\tau = mB\\sin 60^{\\circ} = 0.2 \\times 0.3 \\times 0.866 \\approx 0.052\\) N m.",
        ],
        answer: "\\(0.2\\ \\text{A m}^{2}\\); about 0.052 N m.",
      },
      selfCheckExample: {
        prompt:
          "Two concentric circular loops of radii 10 cm and 20 cm lie in the same plane. Each carries 5 A, in opposite senses. Find the net magnetic moment.",
        steps: [
          "The moments point opposite ways, so subtract: \\(m = I\\pi(r_2^{2} - r_1^{2})\\).",
          "\\(m = 5\\pi(0.04 - 0.01) = 0.15\\pi \\approx 0.47\\ \\text{A m}^{2}\\), along the larger loop's moment.",
        ],
        answer: "\\(0.15\\pi \\approx 0.47\\ \\text{A m}^{2}\\)",
      },
      practiceSet: [
        { prompt: "For a coil in a uniform field, at what orientation is the torque largest?", answer: "When the plane of the coil is parallel to the field" },
        { prompt: "A square coil of side 10 cm with 20 turns carries 1 A. Its magnetic moment?", answer: "\\(0.2\\ \\text{A m}^{2}\\)" },
        { prompt: "A coil of moment \\(0.5\\ \\text{A m}^{2}\\) has its axis perpendicular to a 0.2 T field. Torque?", answer: "0.1 N m" },
        { prompt: "A coil's axis lies along a uniform field. What torque acts on it?", answer: "Zero" },
      ],
      pyqExampleId: "6e52dcd5-9c7d-4224-a2f8-21e827fe88a1", // 4 Apr 2026 S2: radius 2 cm, 125 turns, 1 A, 0.4 T, axis at 30° to B, 314 × 10⁻⁴ N m
      traps: [
        {
          title: "θ is measured from the axis, not the plane",
          body: "In τ = NIAB sin θ, θ is between the coil's normal and B. If a question gives the angle between the plane and the field, use 90° minus it.",
        },
        {
          title: "Opposite currents give opposite moments",
          body: "Two concentric loops with currents in opposite senses have moments pointing opposite ways. The net moment is the difference, not the sum.",
        },
        {
          title: "Do not forget N",
          body: "A coil of N turns has N times the moment of one turn. The torque, NIAB sin θ, carries the same factor N.",
        },
      ],
    },
  ],
};
