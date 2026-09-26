import type { SubtopicNote } from "@/app/notes/_types";

export const COULOMB_FIELD_NOTE: SubtopicNote = {
  subtopicName: "Coulomb's Law and Electric Field",
  title: "Coulomb's Law and Electric Field",
  oneLineDefinition:
    "Two point charges push or pull along the line joining them with F = kq₁q₂/r², weakened K times in a medium; the electric field is that force per unit positive charge, and fields from several charges add as vectors.",
  whyItMatters:
    "27 PYQs, eight of them HARD, and every HARD one adds the fields or forces of two or more charges. Four shapes repeat: a force ratio after the charges or the distance change, the point on a line where the field or force vanishes, " +
    "a symmetric arrangement (square, triangle, hexagon) where most charges cancel, and a charge accelerated or held still by a field.",
  concepts: [
    // 1 — Coulomb's law and ratio changes
    {
      kind: "formula" as const,
      slug: "cetp-coulomb-law",
      name: "Coulomb's Law and Force Ratios",
      intuition:
        "Force grows with each charge and falls with the square of the distance. Almost every question here changes one of those three things and asks for the new force, so the working is a ratio: write the new force over the old one and let k cancel.",
      definition:
        "- \\(F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1 q_2}{r^2} = \\dfrac{k q_1 q_2}{r^2}\\), with \\(k = 9 \\times 10^9\\ \\text{N m}^2\\text{C}^{-2}\\). Like charges repel, unlike attract.\n" +
        "- In a medium of dielectric constant \\(K\\): \\(F_{\\text{medium}} = \\dfrac{F_{\\text{air}}}{K}\\). The same force at distance \\(y\\) in the medium as at \\(x\\) in air needs \\(\\dfrac{y}{x} = \\dfrac{1}{\\sqrt{K}}\\).\n" +
        "- Moving charge from \\(+Q\\) to \\(-Q\\) shrinks BOTH magnitudes: \\(+4q, -4q\\) with 25% moved become \\(+3q, -3q\\).\n" +
        "- Touching a neutral identical ball to a charged one halves that charge; two identical conductors touched share the total equally.\n" +
        "- Square of side \\(a\\): adjacent corners are \\(a\\) apart, diagonal corners \\(\\sqrt{2}a\\), so \\(F_{\\text{adjacent}} : F_{\\text{diagonal}} = 2 : 1\\).",
      formula: {
        label: "Coulomb's law",
        latex: "F = \\frac{1}{4\\pi\\varepsilon_0 K}\\,\\frac{q_1 q_2}{r^2}",
      },
      authoredExample: {
        prompt: "Charges of \\(2\\,\\mu\\)C and \\(8\\,\\mu\\)C are 30 cm apart in air. Find the force, and the force when both are placed in a liquid of \\(K = 4\\) at the same separation.",
        steps: [
          "\\(F = \\dfrac{9 \\times 10^9 \\times 2 \\times 10^{-6} \\times 8 \\times 10^{-6}}{(0.3)^2} = \\dfrac{0.144}{0.09} = 1.6\\ \\text{N}\\).",
          "In the liquid the force is divided by \\(K\\): \\(1.6/4 = 0.4\\ \\text{N}\\).",
        ],
        answer: "1.6 N in air; 0.4 N in the liquid",
      },
      selfCheckExample: {
        prompt: "Charges \\(+5q\\) and \\(-5q\\) attract with force \\(F\\). If 20% of the positive charge is moved to the negative one, what is the new force?",
        steps: [
          "20% of \\(5q\\) is \\(q\\): the charges become \\(+4q\\) and \\(-4q\\).",
          "\\(\\dfrac{F'}{F} = \\dfrac{4 \\times 4}{5 \\times 5} = \\dfrac{16}{25}\\).",
        ],
        answer: "\\(\\dfrac{16}{25}F\\)",
      },
      practiceSet: [
        { prompt: "Both charges are doubled and the distance is doubled. New force?", answer: "Unchanged, \\(F\\)" },
        { prompt: "One charge is halved and the distance is halved. New force?", answer: "\\(2F\\)" },
        { prompt: "At what distance in a medium of \\(K = 2\\) is the force the same as at \\(r\\) in air?", answer: "\\(\\dfrac{r}{\\sqrt{2}}\\)" },
        { prompt: "Charge \\(q_1\\) up 20%, \\(q_2\\) down 20%. Percentage change in force?", answer: "4% decrease (\\(1.2 \\times 0.8 = 0.96\\))" },
      ],
      pyqExampleId: "dbe4a1d3-6734-466b-85e5-a402af6047ce",
      traps: [
        {
          title: "Adding the moved charge to one side only",
          body:
            "When charge moves from the positive body to the negative one, the positive loses it AND the negative's magnitude drops by the same amount. \\(+4q, -4q\\) with \\(q\\) moved is \\(+3q, -3q\\), so the force is \\(\\frac{9}{16}F\\), not \\(\\frac{12}{16}F\\).",
        },
      ],
    },

    // 2 — null points and equilibrium on a line
    {
      kind: "formula" as const,
      slug: "cetp-null-point",
      name: "Where the Field or Force Is Zero on a Line",
      intuition:
        "Two fields cancel only where they point opposite ways AND are equally strong. For like charges that happens between them, nearer the smaller charge. For unlike charges the fields point the same way everywhere between them, so the cancelling point is outside, beyond the SMALLER charge, where its nearness makes up for its size.",
      definition:
        "- Like charges \\(q_1, q_2\\) a distance \\(L\\) apart: null point between them at \\(x = \\dfrac{L\\sqrt{q_1}}{\\sqrt{q_1} + \\sqrt{q_2}}\\) from \\(q_1\\).\n" +
        "- Unlike charges with \\(|q_1| > |q_2|\\): null point beyond \\(q_2\\), at distance \\(x\\) from it where \\(\\dfrac{|q_1|}{(L + x)^2} = \\dfrac{|q_2|}{x^2}\\), i.e. \\(x = \\dfrac{L}{\\sqrt{|q_1|/|q_2|} - 1}\\).\n" +
        "- A third charge placed there feels no force, whatever its sign — the same condition gives the proton-equilibrium questions.\n" +
        "- Force on an END charge zero (\\(Q\\), \\(q\\), \\(Q'\\) on a line): set the two forces on it equal and opposite; the middle charge comes out with the opposite sign.\n" +
        "- Read the question: 'from the origin' adds \\(L\\) to the distance measured from the second charge.",
      formula: {
        label: "Unlike charges: distance beyond the smaller one",
        latex: "\\frac{|q_1|}{(L+x)^2} = \\frac{|q_2|}{x^2} \\;\\Rightarrow\\; x = \\frac{L}{\\sqrt{|q_1|/|q_2|} - 1}",
      },
      authoredExample: {
        prompt: "\\(+9q\\) is at \\(x = 0\\) and \\(-4q\\) at \\(x = L\\). Where on the x-axis is the field zero?",
        steps: [
          "Unlike charges, so the point is beyond the smaller one, \\(-4q\\). Let it be \\(x\\) beyond \\(L\\).",
          "\\(\\dfrac{9}{(L + x)^2} = \\dfrac{4}{x^2} \\Rightarrow 3x = 2(L + x) \\Rightarrow x = 2L\\).",
          "From the origin that is \\(L + 2L = 3L\\).",
        ],
        answer: "\\(x = 3L\\)",
      },
      selfCheckExample: {
        prompt: "\\(+q\\) and \\(+4q\\) are 30 cm apart. Where is the field zero?",
        steps: [
          "Like charges: between them. \\(\\dfrac{1}{x^2} = \\dfrac{4}{(30 - x)^2} \\Rightarrow 30 - x = 2x\\).",
        ],
        answer: "10 cm from \\(+q\\)",
      },
      practiceSet: [
        { prompt: "\\(+16q\\) at 0, \\(-q\\) at \\(L\\): null point from the origin?", answer: "\\(\\dfrac{4L}{3}\\)" },
        { prompt: "\\(4Q\\) and \\(Q\\) (both positive) 3 cm apart: null point from \\(4Q\\)?", answer: "2 cm" },
        { prompt: "For unlike charges, can the null point lie between them?", answer: "No — both fields point the same way there" },
        { prompt: "Does the sign of a test charge placed at a null point change whether it is in equilibrium?", answer: "No — the field is zero, so the force is zero for any charge" },
      ],
      pyqExampleId: "35d1cae2-9bc5-44e4-9e35-417a105ac5da",
      traps: [
        {
          title: "Looking between two unlike charges",
          body:
            "Between \\(+8q\\) and \\(-2q\\) both fields point toward \\(-2q\\) and can only add. The answer \\(\\frac{L}{4}\\) sits in the options for students who looked there; the real point is \\(2L\\), beyond the smaller charge.",
        },
      ],
    },

    // 3 — superposition in symmetric arrangements
    {
      kind: "formula" as const,
      slug: "cetp-field-superposition",
      name: "Superposition: Symmetric Arrangements and Field Lines",
      intuition:
        "At the centre of a regular shape, equal charges on opposite vertices cancel each other's fields. Strip out every cancelling pair and only one or two charges are left to compute. Potential does not cancel this way — it is a plain sum — so a point can have zero field and non-zero potential, or the reverse.",
      definition:
        "- Opposite vertices of a hexagon (or square) with EQUAL charges cancel at the centre; with opposite charges they ADD.\n" +
        "- Equal charges at every vertex of a regular polygon: \\(E = 0\\) at the centre, but \\(V = \\dfrac{nkq}{a}\\ne 0\\).\n" +
        "- \\(2q, -q, -q\\) on an equilateral triangle: \\(V = 0\\) at the centre (charges sum to zero), \\(E \\ne 0\\).\n" +
        "- Uniform semicircular arc of charge density \\(\\lambda\\), radius \\(r\\): \\(E = \\dfrac{2k\\lambda}{r} = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\) at the centre, and \\(V = \\dfrac{\\lambda}{4\\varepsilon_0}\\).\n" +
        "- **Field lines:** start on + and end on − charges; never intersect (one direction per point); crowded where the field is strong; meet a conductor at right angles and do not pass through it.",
      formula: {
        label: "Field of a point charge",
        latex: "\\vec E = \\frac{kq}{r^2}\\,\\hat r, \\qquad \\vec E_{\\text{net}} = \\sum_i \\vec E_i",
      },
      authoredExample: {
        prompt: "Equal charges \\(+q\\) sit at the four corners of a square of side \\(a\\). Find the field and the potential at the centre.",
        steps: [
          "Each corner is \\(\\dfrac{a}{\\sqrt{2}}\\) from the centre. Opposite corners carry equal charges, so their fields cancel pair by pair: \\(E = 0\\).",
          "Potentials add as numbers: \\(V = 4 \\times \\dfrac{kq}{a/\\sqrt{2}} = \\dfrac{4\\sqrt{2}\\,kq}{a}\\).",
        ],
        answer: "\\(E = 0\\), \\(V = \\dfrac{4\\sqrt{2}\\,kq}{a}\\)",
      },
      selfCheckExample: {
        prompt: "Three equal charges \\(+q\\) sit at the vertices of an equilateral triangle, at distance \\(r\\) from its centre. One is removed. Field at the centre?",
        steps: [
          "With all three the field was zero, so the two left must give exactly the negative of the removed charge's field.",
          "That field had size \\(\\dfrac{kq}{r^2}\\) pointing away from the empty vertex; the remaining two give the same size pointing toward it.",
        ],
        answer: "\\(\\dfrac{kq}{r^2}\\), directed toward the empty vertex",
      },
      practiceSet: [
        { prompt: "Can two electric field lines cross?", answer: "No — the field would have two directions at one point" },
        { prompt: "Do field lines pass through a conductor in equilibrium?", answer: "No — the field inside is zero" },
        { prompt: "\\(+q\\) and \\(-q\\) at opposite vertices of a hexagon: do their fields at the centre cancel?", answer: "No — they add (both point toward \\(-q\\))" },
        { prompt: "Field at the centre of a semicircular arc of density \\(\\lambda\\) and radius \\(r\\)?", answer: "\\(\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}\\)" },
      ],
      pyqExampleId: "5a272475-5846-46f6-b227-1c8225bbbc1a",
      traps: [
        {
          title: "Zero field does not mean zero potential",
          body:
            "At the centre of \\(2q, -q, -q\\) the potential is zero because the charges sum to zero, but the fields do not cancel. The paper offers all four combinations; decide field and potential separately.",
        },
      ],
    },

    // 4 — a charge in a uniform field
    {
      kind: "formula" as const,
      slug: "cetp-charge-in-field",
      name: "A Charge Moving in, or Held by, a Uniform Field",
      intuition:
        "A uniform field puts a constant force \\(qE\\) on a charge, so it moves like a body under constant gravity: uniform acceleration \\(qE/m\\). Balance that force against the weight and the charge floats; add it to or subtract it from gravity and a pendulum swings faster or slower.",
      definition:
        "- \\(F = qE\\), \\(a = \\dfrac{qE}{m}\\). From rest: \\(v = \\dfrac{qEt}{m}\\), \\(\\text{KE} = \\dfrac{q^2E^2t^2}{2m}\\); after a distance \\(d\\): \\(\\text{KE} = qEd\\).\n" +
        "- Held still between plates: \\(qE = mg\\) with \\(E = \\dfrac{V}{d}\\), so \\(m = \\dfrac{qV}{gd}\\).\n" +
        "- Charged pendulum bob in a vertical field: \\(T = 2\\pi\\sqrt{\\dfrac{L}{g \\pm qE/m}}\\) — plus when the electric force is downward, minus when upward.",
      formula: {
        label: "Motion in a uniform field",
        latex: "a = \\frac{qE}{m}, \\qquad \\text{KE} = \\frac{q^2E^2t^2}{2m}, \\qquad qE = mg \\text{ (balance)}",
      },
      authoredExample: {
        prompt: "An oil drop carrying \\(3.2 \\times 10^{-19}\\) C floats between horizontal plates 5 mm apart with 400 V across them. Find its mass (\\(g = 10\\ \\text{m s}^{-2}\\)).",
        steps: [
          "\\(E = \\dfrac{400}{5 \\times 10^{-3}} = 8 \\times 10^{4}\\ \\text{V m}^{-1}\\).",
          "\\(m = \\dfrac{qE}{g} = \\dfrac{3.2 \\times 10^{-19} \\times 8 \\times 10^{4}}{10} = 2.56 \\times 10^{-15}\\ \\text{kg}\\).",
        ],
        answer: "\\(2.56 \\times 10^{-15}\\) kg",
      },
      selfCheckExample: {
        prompt: "A proton (\\(1.67 \\times 10^{-27}\\) kg) is in a field of \\(10^3\\ \\text{N C}^{-1}\\). Its acceleration?",
        steps: [
          "\\(a = \\dfrac{1.6 \\times 10^{-19} \\times 10^3}{1.67 \\times 10^{-27}} \\approx 9.6 \\times 10^{10}\\ \\text{m s}^{-2}\\).",
        ],
        answer: "\\(\\approx 9.6 \\times 10^{10}\\ \\text{m s}^{-2}\\)",
      },
      practiceSet: [
        { prompt: "The time in the field is doubled. By what factor does the kinetic energy change?", answer: "4" },
        { prompt: "Acceleration of a particle of charge \\(2e\\) and mass \\(4m\\) in field \\(E\\)?", answer: "\\(\\dfrac{eE}{2m}\\)" },
        { prompt: "The electric force on a pendulum bob is upward. Does the period rise or fall?", answer: "Rises — \\(g_{\\text{eff}} = g - qE/m\\)" },
        { prompt: "Kinetic energy of a charge \\(q\\) after moving distance \\(d\\) along a field \\(E\\) from rest?", answer: "\\(qEd\\)" },
      ],
      pyqExampleId: "874a590b-80fa-4a61-96c9-444c72fe09a0",
      traps: [
        {
          title: "Using the electron's mass for a heavier particle",
          body:
            "'Charge \\(3e\\), mass \\(2m\\)' gives \\(a = \\frac{3eE}{2m}\\). The options include the same expression with the charge and mass swapped; divide the particle's own charge by its own mass.",
        },
      ],
    },
  ],
  related: [
    { label: "Gauss's Law — fields of spheres, sheets and cylinders", href: "/notes/mht-cet-physics/electrostatics/cetp-gauss" },
    { label: "Electric Potential — the scalar that sums without directions", href: "/notes/mht-cet-physics/electrostatics/cetp-potential" },
  ],
};
