import type { SubtopicNote } from "@/app/notes/_types";

export const FIELDS_EMW_NOTE: SubtopicNote = {
  subtopicName: "E and B Fields of a Plane Wave",
  title: "E and B Fields of a Plane Wave",
  oneLineDefinition:
    "In a plane wave E and B are perpendicular to each other and to the direction of travel, oscillate in phase with E = cB, and B = (k × E)/ω fixes which way B points.",
  whyItMatters:
    "Thirty-four PYQs, one of them asking for a number, and six from 2026. Fourteen give one field as a full wave equation and ask for the other. Sixteen give E or B at one point and instant, or ask which components and which direction of travel go together. Four ask for the electric and magnetic forces on a moving charge. All of them use the same two facts: E = cB, and E × B points along the direction of travel.",
  concepts: [
    // C1 — writing B from E (or E from B)
    {
      kind: "formula" as const,
      slug: "jpemw-b-from-e",
      name: "Writing the magnetic field of a wave from its electric field",
      intuition:
        "E and B rise and fall together, at right angles to each other and to the direction of travel. So once one field is known, the other has the same phase, an amplitude divided (or multiplied) by c, and a direction fixed by a cross product. Only the direction needs thought.",
      definition:
        "- The wave travels along \\(\\vec E \\times \\vec B\\). Equivalently \\(\\hat B = \\hat n \\times \\hat E\\) and \\(\\hat E = \\hat B \\times \\hat n\\), where \\(\\hat n\\) is the unit vector along the direction of travel.\n" +
        "- Vector form: \\(\\vec B = \\dfrac{\\vec k \\times \\vec E}{\\omega}\\). Its size is \\(B_0 = kE_0/\\omega = E_0/c\\) in vacuum.\n" +
        "- Same phase: B carries exactly the same argument as E. A sine stays a sine and \\(kx - \\omega t\\) stays \\(kx - \\omega t\\).\n" +
        "- Direction of travel from the phase: \\(kx - \\omega t\\), \\(\\omega t - kx\\) and \\(\\omega(t - x/c)\\) all travel along +x; \\(kx + \\omega t\\) travels along −x.\n" +
        "- Oblique travel: a phase in \\(ax + by\\) travels along \\((a\\hat i + b\\hat j)/\\sqrt{a^{2} + b^{2}}\\). The size of the vector that multiplies E is part of the amplitude.\n" +
        "- Cross products: \\(\\hat i \\times \\hat j = \\hat k\\), \\(\\hat j \\times \\hat k = \\hat i\\), \\(\\hat k \\times \\hat i = \\hat j\\); reversing the order changes the sign.",
      formula: {
        label: "One field from the other",
        latex:
          "\\vec B = \\frac{\\vec k \\times \\vec E}{\\omega}, \\qquad B_0 = \\frac{E_0}{c}, \\qquad \\hat n = \\hat E \\times \\hat B",
      },
      authoredExample: {
        prompt:
          "A wave in vacuum has \\(\\vec E = 45\\sin(2 \\times 10^{6}z - 6 \\times 10^{14}t)\\,\\hat i\\) V/m. Write its magnetic field. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "The phase is \\(kz - \\omega t\\), so the wave travels along +z. (Check: \\(\\omega/k = 3 \\times 10^{8}\\) m/s, so it is in vacuum.)",
          "Direction: \\(\\hat B = \\hat n \\times \\hat E = \\hat k \\times \\hat i = \\hat j\\).",
          "Amplitude: \\(B_0 = E_0/c = 45/(3 \\times 10^{8}) = 1.5 \\times 10^{-7}\\) T, with the same phase.",
        ],
        answer: "\\(\\vec B = 1.5 \\times 10^{-7}\\sin(2 \\times 10^{6}z - 6 \\times 10^{14}t)\\,\\hat j\\) T.",
      },
      selfCheckExample: {
        prompt:
          "A wave in vacuum has \\(\\vec B = 4 \\times 10^{-8}\\sin(kx + \\omega t)\\,\\hat k\\) T. Write its electric field. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "The phase is \\(kx + \\omega t\\), so the wave travels along −x.",
          "\\(\\hat E = \\hat B \\times \\hat n\\), with \\(\\hat n = -\\hat i\\): \\(\\hat k \\times (-\\hat i) = -\\hat j\\).",
          "\\(E_0 = cB_0 = 3 \\times 10^{8} \\times 4 \\times 10^{-8} = 12\\) V/m. Check: \\((-\\hat j) \\times \\hat k = -\\hat i\\), the direction of travel.",
        ],
        answer: "\\(\\vec E = -12\\sin(kx + \\omega t)\\,\\hat j\\) V/m.",
      },
      practiceSet: [
        { prompt: "A wave in vacuum has \\(\\vec E = E_0\\cos(\\omega t - ky)\\,\\hat k\\). Along which axis does its magnetic field point?", answer: "+x", method: "\\(\\hat j \\times \\hat k = \\hat i\\)." },
        { prompt: "A wave in vacuum has \\(\\vec E = 90\\sin(kz - \\omega t)\\,\\hat j\\) V/m. Find the amplitude and direction of its magnetic field.", answer: "\\(3 \\times 10^{-7}\\) T along −x", method: "\\(\\hat k \\times \\hat j = -\\hat i\\)." },
        { prompt: "A 6 mm wave travels along +x in vacuum with its electric field along y, peak 30 V/m. Write \\(B_z\\).", answer: "\\(B_z = 10^{-7}\\sin\\left[\\tfrac{\\pi}{3} \\times 10^{3}(x - 3 \\times 10^{8}t)\\right]\\) T", method: "\\(k = 2\\pi/\\lambda\\), \\(B_0 = E_0/c\\)." },
        { prompt: "The phase of a wave is \\(\\omega(t + x/c)\\). Which way does it travel?", answer: "Along −x" },
      ],
      pyqExampleId: "799e8266-79d1-4d16-8df4-9e83807c47bd", // 2026: E_y = 69 sin(...), find B_z
      traps: [
        {
          title: "The order of the cross product matters",
          body: "The magnetic field is along k × E, not E × k. Reversing the order gives the right axis with the wrong sign, and the options usually offer both.",
        },
        {
          title: "B keeps the phase of E",
          body: "The two fields oscillate together, so B has the same argument as E. An option that changes kx − ωt to kx + ωt describes a wave going the other way.",
        },
        {
          title: "Divide by c, do not multiply",
          body: "In SI units B₀ = E₀/c is tiny, of order 10⁻⁷ T for fields of tens of volts per metre. An option that gives B the same number as E has skipped the division.",
        },
        {
          title: "Travel along −x flips a sign",
          body: "When the phase is kx + ωt, put −î in the cross product. Using +î out of habit reverses the direction of the field you are finding.",
        },
      ],
    },

    // C2 — fields at a single point and instant
    {
      kind: "formula" as const,
      slug: "jpemw-point-fields",
      name: "Electric and magnetic fields at one point of a wave",
      intuition:
        "At one point and one instant, E and B are two perpendicular arrows whose sizes are in the ratio c, arranged so that E × B points along the direction of travel. Nothing else about the wave matters for this: the frequency in the question is a distractor.",
      definition:
        "- At every point and instant \\(|\\vec B| = |\\vec E|/c\\), not only for the amplitudes.\n" +
        "- With \\(\\hat n\\) along the direction of travel: \\(\\hat B = \\hat n \\times \\hat E\\), \\(\\hat E = \\hat B \\times \\hat n\\), and \\(\\hat n\\) is \\(\\hat E \\times \\hat B\\).\n" +
        "- E and B lie along the two axes other than the travel axis, one each. Neither field is ever along the direction of travel.\n" +
        "- The amplitudes satisfy \\(kE_0 = \\omega B_0\\), which is \\(E_0 = cB_0\\) in vacuum.\n" +
        "- With the magnetic intensity \\(H = B/\\mu_0\\): \\(E_0/H_0 = \\sqrt{\\mu_0/\\varepsilon_0} \\approx 377\\ \\Omega\\).\n" +
        "- E, B and the direction of travel are mutually perpendicular; the energy is shared equally between the two fields; and the wave carries no charge, so electric and magnetic fields do not deflect it.",
      formula: {
        label: "Fields at a point",
        latex:
          "|\\vec B| = \\frac{|\\vec E|}{c}, \\qquad \\hat B = \\hat n \\times \\hat E, \\qquad \\frac{E_0}{H_0} = \\sqrt{\\frac{\\mu_0}{\\varepsilon_0}} \\approx 377\\ \\Omega",
      },
      authoredExample: {
        prompt:
          "A 50 MHz wave travels along +z in vacuum. At one point and instant, \\(\\vec E = 7.5\\,\\hat i\\) V/m. Find \\(\\vec B\\) there. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "The frequency does not enter. Size: \\(B = E/c = 7.5/(3 \\times 10^{8}) = 2.5 \\times 10^{-8}\\) T.",
          "Direction: \\(\\hat B = \\hat n \\times \\hat E = \\hat k \\times \\hat i = \\hat j\\).",
          "Check: \\(\\hat i \\times \\hat j = \\hat k\\), the direction of travel.",
        ],
        answer: "\\(\\vec B = 2.5 \\times 10^{-8}\\,\\hat j\\) T.",
      },
      selfCheckExample: {
        prompt:
          "At a point in an electromagnetic wave, the electric field is along −y and the magnetic field is along +z. In which direction is the wave travelling?",
        steps: [
          "The travel direction is \\(\\hat E \\times \\hat B = (-\\hat j) \\times \\hat k\\).",
          "\\(\\hat j \\times \\hat k = \\hat i\\), so the product is \\(-\\hat i\\).",
        ],
        answer: "Along −x.",
      },
      practiceSet: [
        { prompt: "A wave travels along +y in vacuum. At a point \\(\\vec B = 3 \\times 10^{-8}\\,\\hat i\\) T. Find \\(\\vec E\\) there.", answer: "\\(9\\,\\hat k\\) V/m", method: "\\(\\hat E = \\hat B \\times \\hat n = \\hat i \\times \\hat j\\)." },
        { prompt: "The magnetic field of a wave in vacuum has amplitude \\(4 \\times 10^{-7}\\) T. Find the amplitude of its electric field.", answer: "120 V/m" },
        { prompt: "A wave travels along −z. At a point its electric field is along +x. Along which direction is its magnetic field?", answer: "−y", method: "\\((-\\hat k) \\times \\hat i = -\\hat j\\)." },
        { prompt: "A wave in vacuum has \\(E_0 = 150.8\\) V/m. Find the amplitude of its magnetic intensity H.", answer: "0.4 A/m", method: "\\(H_0 = E_0/377\\)." },
      ],
      pyqExampleId: "2531ca0a-3c68-4237-af4f-2fe0c8b0b432", // 2023: E = 6.6 j V/m, wave along x, find B
      traps: [
        {
          title: "The frequency is a distractor",
          body: "At a point and an instant, B = E/c. The frequency given in the question changes nothing in this calculation.",
        },
        {
          title: "B over E is 1/c, not c",
          body: "The magnetic amplitude is the electric amplitude divided by c. A statement that B₀/E₀ equals the speed of light has the ratio upside down.",
        },
        {
          title: "E₀/B₀ is c, but E₀/H₀ is 377 Ω",
          body: "The factor √(μ₀/ε₀) links E with the magnetic intensity H = B/μ₀, not with B. Writing E₀ = √(μ₀/ε₀)B₀ mixes the two.",
        },
        {
          title: "Neither field lies along the travel direction",
          body: "A wave along y can have E and B only along x and z, one each. Any pair that puts a field along y, or both fields on the same axis, is not a plane electromagnetic wave.",
        },
      ],
    },

    // C3 — forces on a moving charge
    {
      kind: "formula" as const,
      slug: "jpemw-forces",
      name: "Electric and magnetic forces on a charge in a wave",
      intuition:
        "A charge in the wave feels qE from the electric field and qvB from the magnetic field. Since B is E/c, the magnetic force is only v/c of the electric force. It matters only when the charge moves fast.",
      definition:
        "- Electric force \\(F_e = qE\\); magnetic force \\(F_m = qvB\\sin\\theta\\).\n" +
        "- A charge moving along E moves at right angles to B, so \\(F_m = qvB = qvE/c\\).\n" +
        "- The ratio is \\(F_e/F_m = c/v\\), which is always more than 1.\n" +
        "- The largest forces use the amplitudes: \\(F_{e,\\max} = qE_0\\) and \\(F_{m,\\max} = qvB_0 = qvE_0/c\\).\n" +
        "- At a given point the total force is the Lorentz force \\(\\vec F = q(\\vec E + \\vec v \\times \\vec B)\\). A charge at rest feels no magnetic force.",
      formula: {
        label: "Forces on a moving charge",
        latex:
          "F_e = qE_0, \\qquad F_m = qvB_0 = \\frac{qvE_0}{c}, \\qquad \\frac{F_e}{F_m} = \\frac{c}{v}",
      },
      authoredExample: {
        prompt:
          "A wave in vacuum has \\(E_z = 600\\sin\\omega(t - y/c)\\) V/m. A proton moves along z at \\(6 \\times 10^{6}\\) m/s. Find the largest electric force, the largest magnetic force and their ratio. (\\(e = 1.6 \\times 10^{-19}\\) C, \\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "\\(F_e = eE_0 = 1.6 \\times 10^{-19} \\times 600 = 9.6 \\times 10^{-17}\\) N.",
          "\\(B_0 = E_0/c = 2 \\times 10^{-6}\\) T, along x. The proton moves along z, at right angles to B.",
          "\\(F_m = evB_0 = 1.6 \\times 10^{-19} \\times 6 \\times 10^{6} \\times 2 \\times 10^{-6} = 1.92 \\times 10^{-18}\\) N.",
          "Ratio \\(= 9.6 \\times 10^{-17}/1.92 \\times 10^{-18} = 50\\), which is \\(c/v\\).",
        ],
        answer: "\\(9.6 \\times 10^{-17}\\) N, \\(1.92 \\times 10^{-18}\\) N; ratio 50 : 1.",
      },
      selfCheckExample: {
        prompt:
          "A charge moves at \\(1.2 \\times 10^{7}\\) m/s along the electric field of a light wave in vacuum. Find the ratio of the electric force to the magnetic force on it. (\\(c = 3 \\times 10^{8}\\) m/s)",
        steps: [
          "Moving along E, the charge moves at right angles to B, so \\(F_e/F_m = c/v\\).",
          "\\(c/v = 3 \\times 10^{8}/(1.2 \\times 10^{7}) = 25\\).",
        ],
        answer: "25 : 1",
      },
      practiceSet: [
        { prompt: "A wave in vacuum has \\(E_0 = 360\\) V/m. Find the largest magnetic force on an electron moving at \\(2.5 \\times 10^{7}\\) m/s at right angles to its magnetic field. (\\(e = 1.6 \\times 10^{-19}\\) C)", answer: "\\(4.8 \\times 10^{-18}\\) N", method: "\\(B_0 = 1.2 \\times 10^{-6}\\) T." },
        { prompt: "For a charge moving along the electric field of a wave in vacuum, the electric force is 100 times the magnetic force. Find its speed.", answer: "\\(3 \\times 10^{6}\\) m/s" },
        { prompt: "A charge sits at rest in the path of an electromagnetic wave. What magnetic force acts on it?", answer: "None; the magnetic force needs a velocity." },
        { prompt: "Can the magnetic force on a charge moving along E in a light wave exceed the electric force?", answer: "No; their ratio is v/c, less than 1." },
      ],
      pyqExampleId: "8ba74260-316e-4351-84aa-a5a4b86804f4", // 2022: E_y = 900 sin ω(t − x/c), charge along y at 3 × 10⁷ m/s
      traps: [
        {
          title: "Use B₀ = E₀/c in the magnetic force",
          body: "The magnetic force is qvB₀, and B₀ is the electric amplitude divided by c. Putting E₀ in place of B₀ makes the magnetic force c times too large.",
        },
        {
          title: "The electric force is the larger one",
          body: "The ratio of electric to magnetic force is c/v. Inverting it gives a ratio less than 1, which would mean the magnetic force wins; it never does for a charge slower than light.",
        },
      ],
    },
  ],
};
