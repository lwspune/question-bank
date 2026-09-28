import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-fields-due-to-electric-current";

export const FIELD_OF_CURRENT_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Field of Current-Carrying Conductor",
  title: "Magnetic Field of Wires, Coils, Arcs, Solenoids and Toroids",
  oneLineDefinition:
    "Every piece of current makes a field by the Biot–Savart law; added up, a long straight wire gives μ₀I/(2πd) in circles around it, a circular coil gives μ₀NI/(2R) at its centre, an arc gives the same times its fraction of a circle, a half-infinite wire gives half the long-wire value, and a long solenoid or a toroid gives μ₀nI inside.",
  whyItMatters:
    "52 PYQs, 17 HARD — the largest page in the chapter and where most of its HARD questions sit. Twelve are straight wires — two parallel wires at a midpoint or at a point where their fields are perpendicular, inside and outside a thick wire, and where a wire cancels a loop; twenty are circular coils — the field at the centre and on the axis, coils in perpendicular planes, a wire rewound into more turns, and charges going round a circle; thirteen are arcs and bent wires read from a figure; seven are solenoids, toroids and displacement current. " +
    "Four cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mag-straight-wire-field",
      name: "Field of Straight Wires",
      intuition:
        "A long straight wire's field circles it with B = μ₀I/(2πd), falling as 1/d. With two wires, find each field's direction by the right-hand rule and add as vectors. Midway between them, like currents give OPPOSITE fields (they subtract, zero if equal) and opposite currents give fields in the SAME direction (they add). At a point where the lines to the two wires are perpendicular, the fields are perpendicular too, so add them by Pythagoras. Inside a thick wire the field rises linearly from zero, μ₀Ir/(2πR²); outside it falls as 1/r.",
      definition:
        "- \\(B = \\dfrac{\\mu_0 I}{2\\pi d}\\); \\(\\dfrac{x}{3}\\) ⇒ 3B. 12 A giving \\(3 \\times 10^{-5}\\) T ⇒ d = 80 mm.\n" +
        "- **Midpoint**, currents opposite: \\(B = \\dfrac{\\mu_0(I_1 + I_2)}{\\pi d}\\); same direction: \\(\\dfrac{\\mu_0(I_1 - I_2)}{\\pi d}\\) (zero if equal).\n" +
        "- **Perpendicular lines** to wires d apart: each at \\(\\dfrac{d}{\\sqrt{2}}\\), \\(B = \\dfrac{\\mu_0}{2\\pi r}\\sqrt{I_1^2 + I_2^2}\\) (8 A, 15 A, 7 cm ⇒ \\(68 \\times 10^{-6}\\) T).\n" +
        "- **Outside both**, like currents 2r apart, P at r from the nearer: \\(\\dfrac{\\mu_0I}{2\\pi}\\left(\\dfrac{1}{r} + \\dfrac{1}{3r}\\right) = \\dfrac{2\\mu_0I}{3\\pi r}\\).\n" +
        "- **Thick wire** radius R: inside \\(\\dfrac{\\mu_0Ir}{2\\pi R^2}\\), outside \\(\\dfrac{\\mu_0I}{2\\pi r}\\); B(R/2) : B(3R) = 3 : 2.\n" +
        "- **Wire cancels a loop** at its centre: \\(\\dfrac{\\mu_0I_c}{2R} = \\dfrac{\\mu_0I_w}{2\\pi d}\\) ⇒ \\(d = \\dfrac{RI_w}{\\pi I_c}\\).",
      formula: {
        label: "Long straight wire",
        latex: "B = \\frac{\\mu_0 I}{2\\pi d}",
      },
      authoredExample: {
        prompt: "Wires 10 cm apart carry 6 A and 4 A in opposite directions. Field midway?",
        steps: ["Opposite currents: fields add.", "B = 2 × 10⁻⁷ × (6 + 4)/0.05 = 4 × 10⁻⁵ T."],
        answer: "4 × 10⁻⁵ T",
      },
      selfCheckExample: {
        prompt: "Currents 4 A and 3 A in opposite directions, wires 5 cm apart; P equidistant with perpendicular lines to the wires. B at P?",
        steps: ["Each at 5/√2 cm; B = 2 × 10⁻⁷ × 5/(0.05/√2)."],
        answer: "2√2 × 10⁻⁵ T",
      },
      practiceSet: [
        { prompt: "Same-direction midpoint field 8 × 10⁻⁶ T, one reversed 3.2 × 10⁻⁵ T. I₂ : I₁?", answer: "3 : 5" },
        { prompt: "Two wires 2d apart, equal currents, same direction. Field midway?", answer: "Zero" },
      ],
      pyqExampleId: "921e29d6-f7ca-4b53-975c-a9bfd1777cfc",
      traps: [
        {
          title: "Adding the fields of like currents at the midpoint",
          body:
            "Midway between wires with currents in the SAME direction, their fields point opposite ways and subtract. Opposite currents add there.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mag-circular-coil-field",
      name: "Field of a Circular Coil: Centre, Axis, and Rotating Charges",
      intuition:
        "At the centre of a coil of N turns, B = μ₀NI/(2R), along the axis. On the axis at distance x it falls to μ₀NIR²/(2(R² + x²)^(3/2)) — at x = √3R, an eighth of the centre value. Rewinding a fixed wire into n turns shrinks the radius n times, so the centre field grows n². Two coils in perpendicular planes give perpendicular fields: add by Pythagoras. A charge q going round f times a second is a current qf, so it makes a field μ₀qf/(2r) at the centre — the same for a charged rotating ring.",
      definition:
        "- **Centre**: \\(B = \\dfrac{\\mu_0NI}{2R}\\) (n = 100 for 3.14 × 10⁻⁴ T at 0.4 A, 8 cm). **Axis**: \\(\\dfrac{\\mu_0NIR^2}{2(R^2 + x^2)^{3/2}}\\); x = √3R ⇒ \\(\\tfrac{1}{8}\\); x = 2√2R ⇒ \\(\\dfrac{\\mu_0NI}{54R}\\).\n" +
        "- **Rewound** into n turns: \\(B \\times n^2\\) (9 turns → 3 turns ⇒ B/9).\n" +
        "- **Perpendicular coils**: \\(\\sqrt{B_1^2 + B_2^2}\\) (I and 2I ⇒ \\(\\sqrt{5}\\tfrac{\\mu_0I}{2R}\\); I and \\(\\sqrt{8}I\\) ⇒ \\(\\tfrac{3\\mu_0I}{2R}\\)).\n" +
        "- **Concentric coplanar coils**: fields add or subtract with the current sense; to cancel, \\(\\dfrac{I_A}{R_A} = \\dfrac{I_B}{R_B}\\), opposite senses.\n" +
        "- **Rotating charge**: \\(I = qf\\), \\(B = \\dfrac{\\mu_0qf}{2r}\\); ring of charge at N r.p.s. ⇒ \\(q = \\dfrac{2RB}{\\mu_0N}\\); orbiting electron \\(I = \\dfrac{ev}{2\\pi r}\\).\n" +
        "- **Same wire, two coils, equal centre fields**, radii 2 : 1 ⇒ voltages 4 : 1.",
      formula: {
        label: "Circular coil",
        latex: "B_{\\text{centre}} = \\frac{\\mu_0 N I}{2R}, \\qquad B_{\\text{axis}} = \\frac{\\mu_0 N I R^2}{2(R^2 + x^2)^{3/2}}",
      },
      authoredExample: {
        prompt: "A 20-turn coil of radius 10 cm carries 0.5 A. Field at the centre, and on the axis 10√3 cm away?",
        steps: ["Centre: 4π × 10⁻⁷ × 20 × 0.5/0.2 = 2π × 10⁻⁵ T.", "At x = √3R the field is an eighth: 0.25π × 10⁻⁵ T."],
        answer: "2π × 10⁻⁵ T; π/4 × 10⁻⁵ T",
      },
      selfCheckExample: {
        prompt: "A coil of radius R has centre field B_c. Field on the axis at √3R?",
        steps: ["(R² + 3R²)^(3/2) = 8R³."],
        answer: "B_c/8",
      },
      practiceSet: [
        { prompt: "A charge 50e goes round a 0.4 m circle once a second. Field at the centre?", answer: "10⁻¹⁷ μ₀" },
        { prompt: "A wire makes a one-turn coil (B), then n turns. New field?", answer: "n²B" },
        { prompt: "Coils of radii 20 cm and 10 cm, 0.5 A anticlockwise in A. Current in B for zero field?", answer: "0.25 A clockwise" },
      ],
      pyqExampleId: "9b4d58e4-9a8e-48cf-9c59-e55721c4b832",
      traps: [
        {
          title: "Adding fields of perpendicular coils directly",
          body:
            "Coils in perpendicular planes have perpendicular axes, so their fields add as vectors: √(B₁² + B₂²), not B₁ + B₂.",
        },
        {
          title: "Keeping the radius when a wire is rewound",
          body:
            "The same wire wound into n turns has a radius n times smaller. The field μ₀NI/(2R) gains n from the turns AND n from the radius: n², not n.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mag-arcs-composite",
      name: "Arcs and Bent Wires",
      intuition:
        "Break the wire into pieces and add their fields at the point. An arc subtending θ at its centre gives (μ₀I/4πR)·θ — a fraction θ/2π of a full coil. A straight piece whose LINE passes through the point gives nothing. A straight piece that ENDS at the foot of the perpendicular from the point and runs to infinity gives half a long wire, μ₀I/(4πr). Then decide each piece's direction (in or out of the page) by the right-hand rule: pieces going round the point the same way add, opposite ways subtract.",
      definition:
        "- **Arc** of angle θ: \\(B = \\dfrac{\\mu_0I\\theta}{4\\pi R}\\); semicircle \\(\\dfrac{\\mu_0I}{4R}\\), quarter \\(\\dfrac{\\mu_0I}{8R}\\), \\(\\tfrac{3}{4}\\) circle \\(\\dfrac{3\\mu_0I}{8R}\\), \\(\\tfrac{\\pi}{8}\\) ⇒ \\(\\dfrac{\\mu_0I}{32R}\\).\n" +
        "- **Straight piece through the point**: zero. **Half-infinite piece ending at the foot**: \\(\\dfrac{\\mu_0I}{4\\pi r}\\). **Long wire tangent to a loop**: \\(\\dfrac{\\mu_0I}{2\\pi r}\\).\n" +
        "- **Two semicircles** R₁, R₂: \\(\\dfrac{\\mu_0I}{4}\\left(\\dfrac{1}{R_1} \\pm \\dfrac{1}{R_2}\\right)\\) — plus when both go round the centre the same way.\n" +
        "- **Loop in a long wire**: \\(\\dfrac{\\mu_0I}{2\\pi r}(\\pi - 1)\\) when the loop's field opposes the wire's, \\((\\pi + 1)\\) when they agree.\n" +
        "- **Current element** (Biot–Savart): \\(dB = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I\\,dl\\sin\\theta}{r^2}\\).",
      formula: {
        label: "Arc and half-infinite wire",
        latex: "B_{\\text{arc}} = \\frac{\\mu_0 I \\theta}{4\\pi R}, \\qquad B_{\\text{half-infinite}} = \\frac{\\mu_0 I}{4\\pi r}",
      },
      authoredExample: {
        prompt: "A wire runs in from infinity along a line through O, goes round a semicircle of radius R about O, and leaves along the same line. Field at O?",
        steps: ["Both straight parts lie on lines through O: zero.", "The semicircle: μ₀I/(4R)."],
        answer: "μ₀I/(4R)",
      },
      selfCheckExample: {
        prompt: "An arc of radius r subtends π/16 at its centre. Field at the centre?",
        steps: ["μ₀Iθ/(4πr) with θ = π/16."],
        answer: "μ₀I/(64r)",
      },
      practiceSet: [
        { prompt: "Arc of π/2 at radius R. Field at the centre?", answer: "μ₀I/(8R)" },
        { prompt: "Three-quarter circle, current anticlockwise. Field at the centre?", answer: "3μ₀I/(8R), out of the page" },
      ],
      pyqExampleId: "3dc369a5-9d62-48b5-8a36-d0c81f6b6b68",
      traps: [
        {
          title: "Counting a straight piece that points at the centre",
          body:
            "A straight wire whose line passes through the point gives zero field there, however long it is. Only pieces that pass BESIDE the point contribute.",
        },
        {
          title: "Adding every piece without checking its direction",
          body:
            "Two arcs carrying current round the centre in OPPOSITE senses give opposite fields: μ₀I/4 (1/R₂ − 1/R₁), not the sum. Fix each piece's in-or-out direction before adding.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mag-solenoid-toroid",
      name: "Solenoids, Toroids and Displacement Current",
      intuition:
        "Inside a long solenoid the field is uniform, B = μ₀nI, with n the turns per metre; the magnetising field H = nI does not depend on what fills it. So B depends on n and I, not on the wire's thickness or the solenoid's radius. A toroid is a solenoid bent into a ring: B = μ₀NI/(2πr) = μ₀nI. Between capacitor plates a changing electric field acts as a current (the displacement current), spread over the plate area.",
      definition:
        "- **Solenoid**: \\(B = \\mu_0nI\\), \\(H = nI\\); n × 3, I ÷ 4 ⇒ \\(\\tfrac{3B}{4}\\). \\(H = \\dfrac{N}{l}I\\) (2.4 × 10³ A/m, 60 turns, 15 cm ⇒ 6 A).\n" +
        "- Independent of the wire's radius and the solenoid's radius.\n" +
        "- **Toroid**: \\(B = \\dfrac{\\mu_0NI}{2\\pi r}\\) (4000 turns, 5 A, 20 cm ⇒ \\(2 \\times 10^{-2}\\) T).\n" +
        "- **Displacement current** through an area A/2 between plates charged by I: \\(\\tfrac{I}{2}\\).",
      formula: {
        label: "Solenoid and toroid",
        latex: "B = \\mu_0 n I, \\qquad B_{\\text{toroid}} = \\frac{\\mu_0 N I}{2\\pi r}",
      },
      authoredExample: {
        prompt: "A 0.5 m solenoid of 1000 turns carries 2 A. B inside (μ₀ = 4π × 10⁻⁷)?",
        steps: ["n = 2000 per metre; B = 4π × 10⁻⁷ × 2000 × 2 = 1.6π × 10⁻³ T."],
        answer: "1.6π × 10⁻³ T",
      },
      selfCheckExample: {
        prompt: "Turns per cm tripled, current quartered. New solenoid field?",
        steps: ["B ∝ nI."],
        answer: "3B/4",
      },
      practiceSet: [
        { prompt: "H at the centre of a long empty solenoid?", answer: "nI" },
        { prompt: "An ideal solenoid's field is independent of?", answer: "The radius of the wire" },
      ],
      pyqExampleId: "dfd1d460-e8af-4e77-9c5e-24cf2bea705f",
      traps: [
        {
          title: "Confusing B and H in a solenoid",
          body:
            "H = nI (A/m) is set by the winding alone; B = μ₀nI (T) includes the medium. A question asking for H in an empty solenoid wants nI, not μ₀nI.",
        },
      ],
    },
  ],
  related: [
    { label: "Force on a Conductor — how these fields push on other wires", href: `${BASE}/cetp-mag-force-on-conductor` },
    { label: "Magnetic Moment — the field at a coil's centre and its moment", href: `${BASE}/cetp-mag-moment` },
  ],
};
