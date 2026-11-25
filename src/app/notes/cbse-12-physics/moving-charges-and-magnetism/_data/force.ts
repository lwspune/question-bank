import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MC_FORCE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Force and Motion in a Magnetic Field",
  title: "Magnetic Force and Motion in a Magnetic Field",
  oneLineDefinition:
    "The Lorentz force on a moving charge, the circular and helical paths of a charge in a uniform magnetic field, and the force on a straight conductor carrying a current.",
  whyItMatters:
    "51 questions, forty-four of them from board papers. The board asks you to write the Lorentz force and show that it does no work (2023), find the force on a charge moving near a long straight wire (2023, 2024, 2025), find the radius, period and momentum of particles in a field (2024, 2025, 2026), show that a particle moves on a helix and find its pitch (2024), make a particle go undeviated through electric and magnetic fields together (2023, 2025, 2026) and derive the force on a current-carrying conductor (2023, 2024, 2026). The textbook adds numericals on the radius and frequency of an electron's orbit and on the force on a wire.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmc-lorentz",
      name: "The Lorentz force on a moving charge",
      intuition:
        "A magnetic field pushes only on a charge that moves, and it pushes sideways: at right angles to both the velocity and the field. A sideways push can turn a charge but can never speed it up or slow it down.",
      definition:
        "- **Lorentz force:** a charge q moving with velocity \\(\\vec{v}\\) where there are an electric field \\(\\vec{E}\\) and a magnetic field \\(\\vec{B}\\) feels \\(\\vec{F} = q[\\vec{E} + \\vec{v} \\times \\vec{B}]\\). The magnetic part is \\(q(\\vec{v} \\times \\vec{B})\\).\n" +
        "- **Size:** \\(F = qvB\\sin\\theta\\), where θ is the angle between \\(\\vec{v}\\) and \\(\\vec{B}\\). It is largest, \\(qvB\\), when \\(\\vec{v}\\) is at right angles to \\(\\vec{B}\\).\n" +
        "- **Zero force** when the charge is at rest, or moves along or against the field (θ = 0° or 180°).\n" +
        "- **Direction:** at right angles to both \\(\\vec{v}\\) and \\(\\vec{B}\\), given by the right-hand rule for \\(\\vec{v} \\times \\vec{B}\\). For a negative charge such as an electron, the force is the other way.\n" +
        "- **No work:** the force is always at right angles to the velocity, so \\(\\vec{F} \\cdot \\vec{v} = 0\\). The speed and the kinetic energy stay the same; only the direction changes.\n" +
        "- **SI unit of B:** the tesla, 1 T = 1 N s C⁻¹ m⁻¹. A smaller unit is the gauss, 1 G = 10⁻⁴ T.\n" +
        "- **A charge near a long wire:** first find the wire's field at the charge, \\(B = \\dfrac{\\mu_0 I}{2\\pi d}\\), with its direction by the right-hand thumb rule; then use \\(\\vec{F} = q(\\vec{v} \\times \\vec{B})\\). A positive charge moving the same way as the current is pulled towards the wire; moving the opposite way, it is pushed away.\n" +
        "- **Undeviated through both fields:** if \\(\\vec{E}\\), \\(\\vec{B}\\) and \\(\\vec{v}\\) are at right angles to each other and the two forces cancel, \\(qE = qvB\\), so \\(v = E/B\\) whatever the charge or mass. The present NCERT book gives only the combined Lorentz force and does not work out this balance, but the board asked for it in 2023, 2025 and 2026, so learn the one line \\(qE = qvB\\).",
      formula: {
        label: "Lorentz force",
        latex: "\\vec{F} = q\\left[\\vec{E} + \\vec{v} \\times \\vec{B}\\right], \\qquad F_{\\text{magnetic}} = qvB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A proton (charge \\(1.6 \\times 10^{-19}\\) C) moves along the +x direction at \\(2 \\times 10^{6}\\) m/s in a uniform magnetic field of 0.5 T along the +y direction. Find the magnitude and direction of the magnetic force on it. Which way would the force be on an electron moving the same way?",
        steps: [
          "Given: \\(q = 1.6 \\times 10^{-19}\\) C, \\(v = 2 \\times 10^{6}\\) m/s along \\(\\hat{i}\\), \\(B = 0.5\\) T along \\(\\hat{j}\\), so θ = 90°.",
          "Formula: \\(\\vec{F} = q(\\vec{v} \\times \\vec{B})\\), \\(F = qvB\\sin\\theta\\).",
          "\\(F = 1.6 \\times 10^{-19} \\times 2 \\times 10^{6} \\times 0.5 \\times 1 = 1.6 \\times 10^{-13}\\) N.",
          "Direction: \\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), so the force on the proton is along +z.",
          "The electron's charge is negative, so its force is along −z.",
        ],
        answer: "\\(1.6 \\times 10^{-13}\\) N along +z for the proton; along −z for the electron",
      },
      selfCheckExample: {
        prompt:
          "An electron moves at \\(4 \\times 10^{6}\\) m/s at 30° to a uniform magnetic field of 0.25 T. Find the magnitude of the magnetic force on it.",
        steps: [
          "\\(F = evB\\sin\\theta = 1.6 \\times 10^{-19} \\times 4 \\times 10^{6} \\times 0.25 \\times \\sin 30^\\circ\\).",
          "\\(F = 1.6 \\times 10^{-13} \\times 0.5 = 8 \\times 10^{-14}\\) N.",
        ],
        answer: "\\(8 \\times 10^{-14}\\) N",
      },
      practiceSet: [
        {
          prompt: "When is the magnetic force on a moving charge zero?",
          answer: "When the charge moves along or against the field, or is at rest",
        },
        {
          prompt:
            "A charge moves straight through an electric field of 6000 V/m and a magnetic field of 0.02 T. Both fields and the velocity are at right angles to each other. Find its speed.",
          answer: "\\(v = E/B = 3 \\times 10^{5}\\) m/s",
        },
        {
          prompt: "Can a magnetic field change the kinetic energy of a charged particle?",
          answer: "No. The magnetic force is at right angles to the velocity, so it does no work",
        },
      ],
      pyqExampleId: "b0908554-cb66-4b65-a905-f0b314e1bf38",
      traps: [
        {
          title: "Forgetting the sign of the charge",
          body: "\\(\\vec{v} \\times \\vec{B}\\) gives the direction for a positive charge. For an electron, reverse it, and say so in the answer.",
        },
        {
          title: "Swapping the order of the cross product",
          body: "The force is \\(q(\\vec{v} \\times \\vec{B})\\), not \\(q(\\vec{B} \\times \\vec{v})\\). Remember \\(\\hat{j} \\times \\hat{i} = -\\hat{k}\\) and \\(\\hat{i} \\times \\hat{k} = -\\hat{j}\\); a swapped order flips the answer.",
        },
        {
          title: "Saying the field speeds the particle up",
          body: "A magnetic force never changes the speed. A particle that comes out of a field after a semicircle has the same speed it went in with.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-circular",
      name: "Circular motion of a charge in a uniform magnetic field",
      intuition:
        "When the velocity is at right angles to the field, the sideways force is always towards one point, just like the pull of a string on a stone swung round. So the charge goes round a circle at constant speed. A faster charge goes round a bigger circle, but it takes the same time for one turn.",
      definition:
        "- If \\(\\vec{v} \\perp \\vec{B}\\), the force \\(qvB\\) supplies the centripetal force: \\(qvB = \\dfrac{mv^2}{r}\\), so \\(r = \\dfrac{mv}{qB}\\).\n" +
        "- In terms of momentum, \\(r = \\dfrac{p}{qB}\\). With kinetic energy K, \\(p = \\sqrt{2mK}\\); after acceleration from rest through a potential difference V, \\(K = qV\\).\n" +
        "- Angular frequency \\(\\omega = \\dfrac{qB}{m}\\); frequency \\(\\nu = \\dfrac{qB}{2\\pi m}\\); period \\(T = \\dfrac{2\\pi m}{qB}\\). None of these depends on the speed or the radius. This is the cyclotron frequency.\n" +
        "- **Comparing two particles in the same field:** same speed, r ∝ m/q; same momentum, r ∝ 1/q; same kinetic energy, r ∝ √m / q; accelerated through the same V, r ∝ √(m/q).\n" +
        "- The sense of going round comes from the direction of the force at the start: find \\(q(\\vec{v} \\times \\vec{B})\\) and turn the particle that way. Positive and negative charges go round opposite ways.",
      formula: {
        label: "Radius and period in a magnetic field",
        latex: "r = \\frac{mv}{qB} = \\frac{p}{qB}, \\qquad T = \\frac{2\\pi m}{qB}, \\qquad \\nu = \\frac{qB}{2\\pi m}",
      },
      authoredExample: {
        prompt:
          "A proton (mass \\(1.67 \\times 10^{-27}\\) kg, charge \\(1.6 \\times 10^{-19}\\) C) moves at \\(3 \\times 10^{6}\\) m/s at right angles to a uniform magnetic field of 0.2 T. Find the radius of its path and its period of revolution.",
        steps: [
          "Given: \\(m = 1.67 \\times 10^{-27}\\) kg, \\(q = 1.6 \\times 10^{-19}\\) C, \\(v = 3 \\times 10^{6}\\) m/s, \\(B = 0.2\\) T.",
          "Formula: \\(r = \\dfrac{mv}{qB}\\).",
          "\\(r = \\dfrac{1.67 \\times 10^{-27} \\times 3 \\times 10^{6}}{1.6 \\times 10^{-19} \\times 0.2} = \\dfrac{5.01 \\times 10^{-21}}{3.2 \\times 10^{-20}} = 0.157\\) m.",
          "Period: \\(T = \\dfrac{2\\pi m}{qB} = \\dfrac{2 \\times 3.14 \\times 1.67 \\times 10^{-27}}{3.2 \\times 10^{-20}} = 3.3 \\times 10^{-7}\\) s.",
        ],
        answer: "r = 0.157 m (15.7 cm); \\(T = 3.3 \\times 10^{-7}\\) s",
      },
      selfCheckExample: {
        prompt:
          "A proton and an alpha particle (mass 4m, charge 2e) are accelerated from rest through the same potential difference and then enter the same uniform field at right angles. Find the ratio of the radius of the alpha particle's path to that of the proton.",
        steps: [
          "After acceleration, \\(p = \\sqrt{2mqV}\\), so \\(r = \\dfrac{p}{qB} = \\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}\\), that is \\(r \\propto \\sqrt{m/q}\\).",
          "\\(\\dfrac{r_\\alpha}{r_p} = \\sqrt{\\dfrac{4m/2e}{m/e}} = \\sqrt{2}\\).",
        ],
        answer: "\\(\\sqrt{2} : 1\\)",
      },
      practiceSet: [
        {
          prompt: "The speed of an electron moving in a circle in a uniform magnetic field is doubled. What happens to the radius and to the period?",
          answer: "The radius doubles; the period stays the same",
        },
        {
          prompt:
            "Two particles with equal charge move at the same speed at right angles to the same field. One is four times as heavy as the other. Find the ratio of the radius of the heavy one to that of the light one.",
          answer: "4 : 1",
        },
        {
          prompt: "Write the frequency of revolution of a charge q of mass m in a uniform field B.",
          answer: "\\(\\nu = \\dfrac{qB}{2\\pi m}\\)",
        },
      ],
      pyqExampleId: "7660e3dc-0296-43bc-b6ef-170b77ef6bad",
      traps: [
        {
          title: "Comparing by speed when the energy is given",
          body: "When two particles have the same kinetic energy or come through the same potential difference, use \\(p = \\sqrt{2mK}\\). The heavier one moves more slowly but has more momentum, so it takes the bigger circle.",
        },
        {
          title: "Thinking a faster particle takes longer to go round",
          body: "\\(T = 2\\pi m/(qB)\\) has no speed in it. A faster particle goes round a bigger circle in the same time.",
        },
        {
          title: "Energy left in MeV or keV",
          body: "Change electron volts to joules before you substitute: 1 eV = \\(1.6 \\times 10^{-19}\\) J, so 1 MeV = \\(1.6 \\times 10^{-13}\\) J. Write the unit of the radius in the answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-helix",
      name: "Helical path of a charge",
      intuition:
        "Split the velocity into a part along the field and a part across it. The field does nothing to the part along it, and turns the part across it into a circle. A circle that keeps sliding along the field is a spring-shaped path, a helix.",
      definition:
        "- Let \\(\\vec{v}\\) make an angle θ with \\(\\vec{B}\\). Then \\(v_\\parallel = v\\cos\\theta\\) along \\(\\vec{B}\\) and \\(v_\\perp = v\\sin\\theta\\) across it.\n" +
        "- \\(v_\\parallel\\) feels no force, so the charge moves steadily along the field.\n" +
        "- \\(v_\\perp\\) gives a circle of radius \\(r = \\dfrac{m v_\\perp}{qB}\\), with the same frequency \\(\\dfrac{qB}{2\\pi m}\\) as before.\n" +
        "- Together the path is a **helix** whose axis is along \\(\\vec{B}\\).\n" +
        "- **Pitch** (distance moved along the field in one turn): \\(p = v_\\parallel T = \\dfrac{2\\pi m v_\\parallel}{qB}\\).\n" +
        "- θ = 0° or 180°: a straight line along the field. θ = 90°: a circle.\n" +
        "- If an electric field also acts along \\(\\vec{B}\\), the charge speeds up along the axis while the circle stays the same size, so the path is a helix whose pitch keeps increasing (board 2023, 2025).",
      formula: {
        label: "Radius and pitch of the helix",
        latex: "r = \\frac{m v\\sin\\theta}{qB}, \\qquad p = \\frac{2\\pi m\\, v\\cos\\theta}{qB}",
      },
      authoredExample: {
        prompt:
          "A proton (mass \\(1.67 \\times 10^{-27}\\) kg, charge \\(1.6 \\times 10^{-19}\\) C) enters a uniform field of 0.1 T with a speed of \\(4 \\times 10^{5}\\) m/s at 60° to the field. Find the radius and the pitch of its helical path.",
        steps: [
          "Given: \\(v_\\perp = v\\sin 60^\\circ = 4 \\times 10^{5} \\times 0.866 = 3.46 \\times 10^{5}\\) m/s; \\(v_\\parallel = v\\cos 60^\\circ = 2 \\times 10^{5}\\) m/s.",
          "Radius: \\(r = \\dfrac{m v_\\perp}{qB} = \\dfrac{1.67 \\times 10^{-27} \\times 3.46 \\times 10^{5}}{1.6 \\times 10^{-19} \\times 0.1} = 3.6 \\times 10^{-2}\\) m.",
          "Period: \\(T = \\dfrac{2\\pi m}{qB} = \\dfrac{2 \\times 3.14 \\times 1.67 \\times 10^{-27}}{1.6 \\times 10^{-20}} = 6.56 \\times 10^{-7}\\) s.",
          "Pitch: \\(p = v_\\parallel T = 2 \\times 10^{5} \\times 6.56 \\times 10^{-7} = 0.131\\) m.",
        ],
        answer: "Radius 3.6 cm; pitch 13.1 cm",
      },
      selfCheckExample: {
        prompt: "A charged particle moves at 45° to a uniform magnetic field. Show that the pitch of its helix is 2π times its radius.",
        steps: [
          "\\(r = \\dfrac{m v\\sin 45^\\circ}{qB}\\) and \\(p = \\dfrac{2\\pi m v\\cos 45^\\circ}{qB}\\).",
          "\\(\\sin 45^\\circ = \\cos 45^\\circ\\), so \\(\\dfrac{p}{r} = 2\\pi\\).",
        ],
        answer: "p = 2πr",
      },
      practiceSet: [
        { prompt: "What path does a charge follow if it enters a uniform magnetic field at right angles to it?", answer: "A circle" },
        { prompt: "Which part of the velocity decides the pitch of the helix?", answer: "The part along the field, \\(v\\cos\\theta\\)" },
        {
          prompt: "A charge has velocity components along x and y and moves in a uniform field along x. Along which axis is the axis of its helix?",
          answer: "The x-axis, the direction of the field",
        },
      ],
      pyqExampleId: "4f7e5186-2459-462c-9946-65ad4dc3a7fb",
      traps: [
        {
          title: "Using the whole speed in the radius",
          body: "Only the part of the velocity across the field, \\(v\\sin\\theta\\), goes into \\(r = mv_\\perp/(qB)\\). The part along the field goes into the pitch.",
        },
        {
          title: "Putting the axis of the helix along the velocity",
          body: "The axis of the helix is always along the magnetic field, whatever the direction the particle came in. The board set an assertion on exactly this in 2025.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-wire-force",
      name: "Force on a current-carrying conductor",
      intuition:
        "A current is a crowd of charges drifting along a wire. The field pushes sideways on every one of them, and the wire feels the sum of all those small pushes.",
      definition:
        "- **Derivation, step 1:** take a straight conductor of length l and cross-section A, with n free charges per unit volume, each of charge q, drifting with velocity \\(\\vec{v}_d\\). The number of charges is \\(nlA\\).\n" +
        "- **Step 2:** the force on one charge is \\(q(\\vec{v}_d \\times \\vec{B})\\), so the total force is \\(\\vec{F} = (nlA)\\,q(\\vec{v}_d \\times \\vec{B})\\).\n" +
        "- **Step 3:** the current density is \\(\\vec{j} = nq\\vec{v}_d\\) and the current is \\(I = jA\\). So \\(\\vec{F} = [\\vec{j}Al] \\times \\vec{B} = I\\,\\vec{l} \\times \\vec{B}\\), where \\(\\vec{l}\\) has length l and points along the current.\n" +
        "- **Size:** \\(F = IlB\\sin\\theta\\). It is largest, \\(IlB\\), when the wire is at right angles to the field, and zero when the wire lies along the field.\n" +
        "- **Direction:** at right angles to both the wire and the field, by the right-hand rule for \\(\\vec{l} \\times \\vec{B}\\).\n" +
        "- **A wire of any shape:** add the forces on its small straight pieces, \\(\\vec{F} = \\sum I\\,d\\vec{l} \\times \\vec{B}\\). In a uniform field this equals the force on a straight wire joining its two ends, so a zig-zag wire feels the same force as that straight wire, and a closed loop feels no net force.",
      formula: {
        label: "Force on a current-carrying conductor",
        latex: "\\vec{F} = I\\,\\vec{l} \\times \\vec{B}, \\qquad F = IlB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A 25 cm straight wire along the y-axis carries a current of 4 A in the +y direction. The field in the region is \\(\\vec{B} = (0.3\\,\\hat{i} + 0.5\\,\\hat{j})\\) T. Find the force on the wire.",
        steps: [
          "Given: \\(I = 4\\) A, \\(\\vec{l} = 0.25\\,\\hat{j}\\) m, \\(\\vec{B} = (0.3\\,\\hat{i} + 0.5\\,\\hat{j})\\) T.",
          "Formula: \\(\\vec{F} = I\\,\\vec{l} \\times \\vec{B}\\).",
          "\\(\\vec{l} \\times \\vec{B} = 0.25\\,\\hat{j} \\times (0.3\\,\\hat{i} + 0.5\\,\\hat{j}) = 0.25 \\times 0.3\\,(\\hat{j} \\times \\hat{i}) + 0 = -0.075\\,\\hat{k}\\). The part of the field along the wire gives no force.",
          "\\(\\vec{F} = 4 \\times (-0.075\\,\\hat{k}) = -0.3\\,\\hat{k}\\) N.",
        ],
        answer: "0.3 N along −z",
      },
      selfCheckExample: {
        prompt: "A 50 cm wire carrying 2 A lies at 30° to a uniform magnetic field of 0.8 T. Find the force on it.",
        steps: ["\\(F = IlB\\sin\\theta = 2 \\times 0.5 \\times 0.8 \\times \\sin 30^\\circ\\).", "\\(F = 0.8 \\times 0.5 = 0.4\\) N."],
        answer: "0.4 N",
      },
      practiceSet: [
        { prompt: "When is the force on a straight current-carrying wire in a uniform field zero?", answer: "When the wire lies along the field" },
        { prompt: "What is the net force on a closed current loop of any shape in a uniform magnetic field?", answer: "Zero" },
        {
          prompt:
            "A wire bent into an L shape carries a current I in a uniform field B at right angles to the plane of the L. Its two ends are a distance d apart. Find the size of the force on it.",
          answer: "IBd, the same as on a straight wire joining the ends",
        },
      ],
      pyqExampleId: "c4ecdeed-d1c5-483d-9bf8-5e970a0c78e8",
      traps: [
        {
          title: "Writing the derivation with no symbols defined",
          body: "Say what n, A, q and \\(\\vec{v}_d\\) are, and show the step \\(nq\\vec{v}_d A = I\\). The marks are for the steps, not only for \\(\\vec{F} = I\\vec{l} \\times \\vec{B}\\).",
        },
        {
          title: "Leaving the length in centimetres",
          body: "Convert the length to metres before you substitute. A length of 10 cm is 0.1 m; leaving it as 10 makes the force a hundred times too big.",
        },
      ],
    },
  ],
};
