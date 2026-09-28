import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-fields-due-to-electric-current";

export const FORCE_ON_CONDUCTOR_NOTE: SubtopicNote = {
  subtopicName: "Force on Current-Carrying Conductor and Parallel Wires",
  title: "Force on a Current-Carrying Wire, and Between Parallel Wires",
  oneLineDefinition:
    "A wire of length L carrying current I in a field B feels F = I(L × B); two long parallel wires each sit in the other's field, so they attract when their currents run the same way and repel when opposite, with a force per unit length μ₀I₁I₂/(2πd).",
  whyItMatters:
    "14 PYQs, 6 HARD. Three are the force on a single conductor — a wire in a field given as a vector, one side of a triangular loop, and the net force on a square coil beside a long wire; eleven are parallel wires — how the force changes with currents and distance, attraction or repulsion, three wires side by side, a wire floating above another, and the currents from the fields at the midpoint. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mag-force-on-wire",
      name: "Force on a Straight Conductor",
      intuition:
        "F = I(L × B), of size ILB sin θ where θ is the angle between the wire and the field. For a field given as a vector, work the cross product; only the parts of B across the wire count. A closed loop in a UNIFORM field feels no net force, but near a long straight wire the field is not uniform: the side nearer the wire feels a stronger push than the far side, and the sides perpendicular to the wire cancel.",
      definition:
        "- \\(\\vec F = I\\vec L \\times \\vec B\\), \\(|F| = ILB\\sin\\theta\\).\n" +
        "- Wire along x, \\(\\vec B = B_0(\\hat i - \\hat j - \\hat k)\\): \\(|F| = \\sqrt{2}ILB_0\\).\n" +
        "- 5 cm side of a 5-12-13 triangle with B along the 13 cm side: \\(\\sin\\theta = \\tfrac{12}{13}\\), \\(F = \\tfrac{9}{130}\\) N at 2 A, 0.75 T.\n" +
        "- **Square coil (side L) beside a long wire**, near side at L/3: \\(\\dfrac{\\mu_0I_1I_2}{2\\pi}\\left(\\dfrac{L}{L/3} - \\dfrac{L}{4L/3}\\right) = \\dfrac{9\\mu_0I_1I_2}{8\\pi}\\).",
      formula: {
        label: "Force on a wire",
        latex: "\\vec F = I\\,\\vec L \\times \\vec B",
      },
      authoredExample: {
        prompt: "A 0.5 m wire carries 4 A at 30° to a 0.2 T field. Force on it?",
        steps: ["F = 4 × 0.5 × 0.2 × sin 30° = 0.2 N."],
        answer: "0.2 N",
      },
      selfCheckExample: {
        prompt: "Current I along the x-axis in B = B₀(î − ĵ − k̂). Size of the force on length L?",
        steps: ["î × (î − ĵ − k̂) = −k̂ + ĵ; magnitude √2."],
        answer: "√2 ILB₀",
      },
      practiceSet: [
        { prompt: "Force on the 5 cm side (2 A, 0.75 T along the 13 cm side) is x/130 N. x?", answer: "9" },
      ],
      pyqExampleId: "2ec23e7d-52b0-4f7c-8434-6cdc38298a66",
      traps: [
        {
          title: "Expecting the near and far sides to cancel",
          body:
            "They carry opposite currents but sit at different distances from the wire, where the field differs. Only the perpendicular sides cancel; the net force is the difference of the two parallel sides.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mag-parallel-wires",
      name: "Parallel Wires: Attraction, Repulsion and Balance",
      intuition:
        "Each wire sits in the other's field μ₀I/(2πd), so the force per unit length is μ₀I₁I₂/(2πd): like currents attract, opposite currents repel. It scales with each current and inversely with distance — doubling both currents quadruples it, halving the distance as well makes it eight times. A wire between two others feels no force where the two pulls balance: I₁/x = I₂/(d − x). A light wire above a heavy one with opposite currents floats where the repulsion μ₀I²l/(2πh) equals its weight.",
      definition:
        "- \\(\\dfrac{F}{l} = \\dfrac{\\mu_0I_1I_2}{2\\pi d} = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2I_1I_2}{d}\\); same direction ⇒ attract, opposite ⇒ repel.\n" +
        "- Currents × 2 ⇒ F × 4; also d ÷ 2 ⇒ F × 8. One current × 2 and reversed, d × 3 ⇒ \\(-\\tfrac{2}{3}F\\).\n" +
        "- **Heater leads**: \\(I = P/V\\) (1 kW, 100 V ⇒ 10 A; 2 mm apart ⇒ \\(10^{-2}\\) N/m).\n" +
        "- **Floating wire**: \\(\\dfrac{\\mu_0I^2l}{2\\pi h} = mg\\) (25 A, 1 m, 2.5 g ⇒ 5 mm).\n" +
        "- **No-force position** between wires D (15 A) and B (10 A), 15 cm apart: \\(\\tfrac{15}{x} = \\tfrac{10}{15 - x}\\) ⇒ x = 9 cm.\n" +
        "- **From midpoint fields**: same direction gives \\(B_1 - B_2\\), one reversed gives \\(B_1 + B_2\\); solve for the ratio of currents.",
      formula: {
        label: "Force between parallel wires",
        latex: "\\frac{F}{l} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
      },
      authoredExample: {
        prompt: "Wires 4 cm apart carry 6 A and 8 A in the same direction. Force per metre, and its sense?",
        steps: ["F/l = 2 × 10⁻⁷ × 48/0.04 = 2.4 × 10⁻⁴ N/m.", "Same direction: attraction."],
        answer: "2.4 × 10⁻⁴ N/m, attractive",
      },
      selfCheckExample: {
        prompt: "Two wires attract with 10⁻³ N carrying 10 A each. Both currents doubled?",
        steps: ["F ∝ I₁I₂."],
        answer: "4 × 10⁻³ N",
      },
      practiceSet: [
        { prompt: "Distance halved and both currents doubled. New force?", answer: "8F" },
        { prompt: "At midpoint: 6 × 10⁻⁶ T with like currents, 3 × 10⁻⁵ T with one reversed. I₁ : I₂?", answer: "3 : 2" },
      ],
      pyqExampleId: "79328163-4dcf-4c9a-932a-744619aecb5b",
      traps: [
        {
          title: "Getting attraction and repulsion backwards",
          body:
            "Parallel currents in the SAME direction attract; opposite currents repel. It is the reverse of like charges.",
        },
      ],
    },
  ],
  related: [
    { label: "Field of a Current — the field each wire makes", href: `${BASE}/cetp-mag-field-of-current` },
    { label: "Magnetic Moment — the torque on a whole loop", href: `${BASE}/cetp-mag-moment` },
  ],
};
