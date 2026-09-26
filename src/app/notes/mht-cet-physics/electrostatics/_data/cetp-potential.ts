import type { SubtopicNote } from "@/app/notes/_types";

export const POTENTIAL_NOTE: SubtopicNote = {
  subtopicName: "Electric Potential and Potential Energy",
  title: "Electric Potential and Potential Energy",
  oneLineDefinition:
    "Potential is the work per unit charge to bring a charge in from infinity; it is a scalar, so potentials from several charges simply add, and the energy of a group of charges is the sum over every pair.",
  whyItMatters:
    "42 PYQs, the largest page in the chapter, nine of them HARD and spread across all five shapes below. " +
    "Five shapes repeat: the potential of charges at the corners of a shape, the field from a potential function, the energy of a group, the speed a charge gains through a potential difference, and drops or spheres that merge or share charge.",
  concepts: [
    // 1 — potential of point charges
    {
      kind: "formula" as const,
      slug: "cetp-potential-point-charges",
      name: "Potential of Point Charges, and Equipotentials",
      intuition:
        "Potential has no direction, so the potential of several charges is just the sum of kq/r, with the signs of the charges kept. Points at the same distance from a charge share a potential, and moving a charge between points of equal potential costs no work at all.",
      definition:
        "- \\(V = \\dfrac{kq}{r}\\); for many charges \\(V = k\\sum \\dfrac{q_i}{r_i}\\). Negative charges give negative terms.\n" +
        "- Regular polygon with \\(n\\) equal charges \\(q\\) and centre-to-vertex distance \\(r\\): \\(V = \\dfrac{nkq}{r}\\). A regular hexagon's centre-to-vertex distance EQUALS its side.\n" +
        "- Zero potential between unlike charges \\(q_1\\) and \\(-q_2\\) a distance \\(d\\) apart: \\(\\dfrac{q_1}{x} = \\dfrac{q_2}{d - x}\\).\n" +
        "- Equipotential surface: \\(W = q\\Delta V = 0\\) for any move on it — along an arc round a point charge, or between the corners of a square with a charge at its centre.\n" +
        "- Charged conducting sphere: \\(E = 0\\) inside, \\(V = \\dfrac{kQ}{R}\\) everywhere inside. Half ring of density \\(\\lambda\\): \\(V = \\dfrac{\\lambda}{4\\varepsilon_0}\\) at the centre, whatever the radius.",
      formula: {
        label: "Potential of charges",
        latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\sum_i \\frac{q_i}{r_i}",
      },
      authoredExample: {
        prompt: "Charges \\(4\\,\\mu\\)C and \\(-6\\,\\mu\\)C are 50 cm apart. Where between them is the potential zero?",
        steps: [
          "\\(\\dfrac{4}{x} = \\dfrac{6}{0.5 - x}\\), with \\(x\\) from the \\(4\\,\\mu\\)C charge.",
          "\\(4(0.5 - x) = 6x \\Rightarrow 2 = 10x \\Rightarrow x = 0.2\\) m.",
        ],
        answer: "0.2 m from the \\(4\\,\\mu\\)C charge",
      },
      selfCheckExample: {
        prompt: "Five charges of \\(1\\,\\mu\\)C sit at the vertices of a regular pentagon, 0.3 m from its centre. Potential at the centre?",
        steps: ["\\(V = 5 \\times \\dfrac{9 \\times 10^9 \\times 10^{-6}}{0.3} = 1.5 \\times 10^{5}\\) V."],
        answer: "\\(1.5 \\times 10^{5}\\) V",
      },
      practiceSet: [
        { prompt: "A charge sits at the centre of a square. Work to move another charge from one corner to the next?", answer: "Zero" },
        { prompt: "Potential at the centre of a charged conducting sphere of charge \\(Q\\), radius \\(R\\)?", answer: "\\(\\dfrac{Q}{4\\pi\\varepsilon_0 R}\\)" },
        { prompt: "Potential at the common centre of two concentric half rings of the same density \\(\\lambda\\)?", answer: "\\(\\dfrac{\\lambda}{2\\varepsilon_0}\\)" },
        { prompt: "Work done moving a charge on an equipotential surface?", answer: "Zero" },
      ],
      pyqExampleId: "840b18aa-d3ae-4a5e-878d-613c40077b80",
      traps: [
        {
          title: "Dropping the sign of a negative charge",
          body:
            "Potentials add with their signs. Four charges \\(+q, +q, -q, -q\\) on a square give \\(\\frac{2kq}{L}\\left(1 - \\frac{1}{\\sqrt{5}}\\right)\\) at the midpoint of the positive side; the \\(1 + \\frac{1}{\\sqrt{5}}\\) option is what you get by adding magnitudes.",
        },
      ],
    },

    // 2 — field from potential
    {
      kind: "formula" as const,
      slug: "cetp-field-from-potential",
      name: "Field From Potential, and Potential From Field",
      intuition:
        "The field points the way the potential falls fastest, and its size is how steeply it falls. So the field is minus the slope of V, and the potential difference is minus the area under E. In a uniform field that is just V = Ed.",
      definition:
        "- \\(E = -\\dfrac{dV}{dx}\\). \\(V = 4x^2 + 8x - 3\\) gives \\(E = -(8x + 8)\\).\n" +
        "- \\(V_B - V_A = -\\displaystyle\\int_A^B E\\,dx\\). For \\(E = 30x^2\\): \\(V(2) - V(0) = -80\\) V.\n" +
        "- Uniform field: \\(V = Ed\\), and \\(E = \\dfrac{F}{q}\\).\n" +
        "- Work by an outside agent to move \\(q\\) from \\(A\\) to \\(B\\): \\(W = q(V_B - V_A)\\), so \\(V_B = \\dfrac{W}{q} + V_A\\).\n" +
        "- Inside a sphere with \\(V = ar^2 + b\\): \\(E = -2ar\\), and Gauss's law gives \\(\\rho = -6a\\varepsilon_0\\).",
      formula: {
        label: "Field and potential",
        latex: "E = -\\frac{dV}{dx}, \\qquad V_B - V_A = -\\int_A^B E\\,dx",
      },
      authoredExample: {
        prompt: "\\(V = 3x^2 - 2x + 5\\) volt (x in metres). Field at \\(x = 1\\) m?",
        steps: ["\\(\\dfrac{dV}{dx} = 6x - 2 = 4\\) at \\(x = 1\\).", "\\(E = -4\\ \\text{V m}^{-1}\\), pointing along \\(-x\\)."],
        answer: "\\(-4\\ \\text{V m}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A field \\(\\vec E = 6x\\,\\hat i\\) exists. Find \\(V(2) - V(0)\\).",
        steps: ["\\(-\\displaystyle\\int_0^2 6x\\,dx = -3x^2\\Big|_0^2 = -12\\) V."],
        answer: "\\(-12\\) V",
      },
      practiceSet: [
        { prompt: "A 2 C charge feels 200 N in a uniform field. Potential difference across 5 cm along it?", answer: "5 V" },
        { prompt: "Work to move 2 C from a point at \\(-3\\) V to one at 7 V?", answer: "20 J" },
        { prompt: "\\(V = \\dfrac{5}{x}\\). Field at \\(x = 1\\) m?", answer: "\\(5\\ \\text{V m}^{-1}\\), along \\(+x\\)" },
        { prompt: "Which way does the field point: toward higher or lower potential?", answer: "Lower" },
      ],
      pyqExampleId: "0b734fa8-ebe6-4a29-bc07-545258b50704",
      traps: [
        {
          title: "Forgetting the minus sign",
          body:
            "\\(E = -\\frac{dV}{dx}\\). Where \\(V\\) rises with \\(x\\) the field points along \\(-x\\). The paper always offers the same magnitude with both signs or both directions.",
        },
      ],
    },

    // 3 — potential energy of a system
    {
      kind: "formula" as const,
      slug: "cetp-pe-system",
      name: "Potential Energy of a Group of Charges",
      intuition:
        "The energy of a group is the work to assemble it, and that work is the sum of kq_iq_j/r over every PAIR, counted once. Setting the total to zero is the commonest HARD question here: write one term per pair and solve for the unknown charge.",
      definition:
        "- Two charges: \\(U = \\dfrac{kq_1q_2}{r}\\). Three charges: three pair terms; four charges: six.\n" +
        "- Equilateral triangle of side \\(a\\) with \\(q_1, q_2, Q\\): \\(U = 0 \\Rightarrow q_1q_2 + Q(q_1 + q_2) = 0\\).\n" +
        "- Right isosceles triangle: legs \\(a\\), hypotenuse \\(\\sqrt{2}a\\) — read the figure for which pair sits on the hypotenuse.\n" +
        "- Moving \\(q_2\\) a distance \\(x\\) closer to \\(q_1\\) (from \\(d\\)): \\(\\Delta U = kq_1q_2\\left(\\dfrac{1}{d - x} - \\dfrac{1}{d}\\right) = \\dfrac{kq_1q_2x}{d(d - x)}\\).\n" +
        "- A single charge in an external potential: \\(U = qV\\); a positive charge moved to higher potential gains energy.",
      formula: {
        label: "Energy of a system",
        latex: "U = \\sum_{\\text{pairs } i<j} \\frac{kq_iq_j}{r_{ij}}",
      },
      authoredExample: {
        prompt: "Charges of 1, 2 and \\(3\\,\\mu\\)C sit at the corners of an equilateral triangle of side 10 cm. Energy of the system?",
        steps: [
          "Pairs: \\(1 \\times 2 + 2 \\times 3 + 1 \\times 3 = 11\\ (\\mu\\text{C})^2\\), all at 0.1 m.",
          "\\(U = \\dfrac{9 \\times 10^9 \\times 11 \\times 10^{-12}}{0.1} = 0.99\\) J.",
        ],
        answer: "0.99 J",
      },
      selfCheckExample: {
        prompt: "Charges \\(+q\\) and \\(+q\\) are \\(2a\\) apart with \\(Q\\) at the midpoint. What \\(Q\\) makes the energy zero?",
        steps: ["\\(\\dfrac{q^2}{2a} + \\dfrac{qQ}{a} + \\dfrac{qQ}{a} = 0 \\Rightarrow \\dfrac{q}{2} + 2Q = 0\\)."],
        answer: "\\(Q = -\\dfrac{q}{4}\\)",
      },
      practiceSet: [
        { prompt: "Four charges \\(q\\) at the corners of a square of side \\(a\\): energy?", answer: "\\(\\dfrac{kq^2}{a}(4 + \\sqrt{2})\\)" },
        { prompt: "Work to bring \\(3\\,\\mu\\)C and \\(5\\,\\mu\\)C from 20 cm to 10 cm apart?", answer: "0.675 J" },
        { prompt: "Charges \\(q, q, Q\\) on an equilateral triangle; energy zero when \\(Q\\) = ?", answer: "\\(-\\dfrac{q}{2}\\)" },
        { prompt: "A unit positive charge moves to a region of higher potential. Its potential energy?", answer: "Increases" },
      ],
      pyqExampleId: "840a3917-f87b-4f3b-bea6-e70a7b33a147",
      traps: [
        {
          title: "Missing a pair",
          body:
            "Three charges have THREE pairs, including the two outer charges with each other. \\(q, -2q, q\\) on a line of length \\(2r\\) gives \\(-\\frac{7q^2}{8\\pi\\varepsilon_0 r}\\) only with the \\(\\frac{q^2}{2r}\\) end-to-end term.",
        },
      ],
    },

    // 4 — charges accelerated through a potential difference
    {
      kind: "formula" as const,
      slug: "cetp-accelerated-charges",
      name: "Speed Gained Through a Potential Difference",
      intuition:
        "A charge that falls through a potential difference V turns qV of potential energy into kinetic energy. The speed therefore goes as the square root of q/m — twice the charge on the same mass gives √2 times the speed, not twice.",
      definition:
        "- \\(qV = \\dfrac{1}{2}mv^2 \\Rightarrow v = \\sqrt{\\dfrac{2qV}{m}}\\), so \\(v \\propto \\sqrt{\\dfrac{q}{m}}\\).\n" +
        "- In a uniform field over a distance \\(l\\): \\(qEl = \\dfrac{1}{2}mv^2\\), so \\(v = \\sqrt{\\dfrac{2qEl}{m}}\\) and \\(\\dfrac{q}{m} = \\dfrac{v^2}{2El}\\).\n" +
        "- Energy in electron-volts: a charge \\(ne\\) through \\(V\\) volts gains \\(nV\\) eV.\n" +
        "- Two equal charges released together share the change in their mutual energy equally: \\(2 \\cdot \\dfrac{1}{2}mv^2 = |\\Delta U|\\).",
      formula: {
        label: "Energy gained",
        latex: "qV = \\tfrac{1}{2}mv^2, \\qquad v = \\sqrt{\\frac{2qV}{m}}",
      },
      authoredExample: {
        prompt: "An alpha particle (charge \\(2e\\), mass \\(4m\\)) and a proton (\\(e\\), \\(m\\)) fall through the same potential difference. Ratio of their speeds?",
        steps: ["\\(\\dfrac{v_\\alpha}{v_p} = \\sqrt{\\dfrac{2e/4m}{e/m}} = \\sqrt{\\dfrac{1}{2}}\\)."],
        answer: "\\(1 : \\sqrt{2}\\)",
      },
      selfCheckExample: {
        prompt: "An electron is accelerated from rest through 100 V. Its speed? (\\(m = 9.1 \\times 10^{-31}\\) kg)",
        steps: ["\\(v = \\sqrt{\\dfrac{2 \\times 1.6 \\times 10^{-19} \\times 100}{9.1 \\times 10^{-31}}} = \\sqrt{3.5 \\times 10^{13}} \\approx 5.9 \\times 10^{6}\\) m/s."],
        answer: "\\(\\approx 5.9 \\times 10^{6}\\) m/s",
      },
      practiceSet: [
        { prompt: "Kinetic energy gained by a charge \\(3e\\) through 50 V?", answer: "150 eV" },
        { prompt: "Same mass, charges \\(q\\) and \\(9q\\), same potential difference. Speed ratio?", answer: "1 : 3" },
        { prompt: "Speed of a charge \\(q\\), mass \\(m\\), after distance \\(L\\) in field \\(E\\) from rest?", answer: "\\(\\sqrt{\\dfrac{2qEL}{m}}\\)" },
        { prompt: "Doubling the accelerating voltage multiplies the speed by?", answer: "\\(\\sqrt{2}\\)" },
      ],
      pyqExampleId: "db8e600e-4653-470b-ba0c-0e74662ca362",
      traps: [
        {
          title: "Taking the charge ratio as the speed ratio",
          body:
            "\\(+q\\) and \\(+4q\\) of the same mass through the same V: the ENERGIES are 1 : 4, the speeds 1 : 2. The 1 : 4 option is always there.",
        },
      ],
    },

    // 5 — drops and spheres
    {
      kind: "formula" as const,
      slug: "cetp-drops-and-spheres",
      name: "Merging Drops and Connected Spheres",
      intuition:
        "When n charged drops merge, the charge goes up n times but the radius only n^{1/3} times, so the potential kQ/R rises as n^{2/3}. When two spheres are joined by a wire, charge flows until their potentials match — so each ends up with charge in proportion to its radius, and the smaller one has the denser surface charge.",
      definition:
        "- \\(n\\) identical drops, each at potential \\(v\\): \\(R = n^{1/3}r\\), \\(Q = nq\\), \\(V = n^{2/3}v\\). 27 drops give 9 times the potential; 1000 drops, 100 times.\n" +
        "- Spheres in contact or joined: \\(\\dfrac{q_1}{r_1} = \\dfrac{q_2}{r_2}\\), so charge \\(\\propto\\) radius and \\(\\sigma \\propto \\dfrac{1}{r}\\).\n" +
        "- Two spheres at the same potential: \\(\\dfrac{\\sigma_1}{\\sigma_2} = \\dfrac{C_1 R_2^2}{C_2 R_1^2}\\).\n" +
        "- **Van de Graaff generator** rests on corona discharge (spraying charge from sharp points), on charge given to a hollow conductor moving to its outer surface, and on the potential of an isolated conductor rising as charge is added. It does NOT use crossed electric and magnetic fields.",
      formula: {
        label: "Merging drops",
        latex: "V_{\\text{big}} = n^{2/3}\\,v",
      },
      authoredExample: {
        prompt: "Eight identical drops each charged to 10 V merge into one. Potential of the big drop?",
        steps: ["\\(R = 8^{1/3}r = 2r\\) and \\(Q = 8q\\).", "\\(V = \\dfrac{k(8q)}{2r} = 4 \\times 10 = 40\\) V."],
        answer: "40 V",
      },
      selfCheckExample: {
        prompt: "Spheres of radii 3 cm and 1 cm are joined by a wire and share \\(40\\,\\mu\\)C. Charge on each?",
        steps: ["Charge splits as the radii, 3 : 1."],
        answer: "\\(30\\,\\mu\\)C and \\(10\\,\\mu\\)C",
      },
      practiceSet: [
        { prompt: "125 drops, each at 2 V, merge. New potential?", answer: "50 V" },
        { prompt: "Joined spheres of radii in ratio 2 : 1. Ratio of surface charge densities?", answer: "1 : 2" },
        { prompt: "Which principle is NOT behind the Van de Graaff generator?", answer: "Perpendicular electric and magnetic fields" },
        { prompt: "\\(n\\) drops merge. By what factor does the surface charge density change?", answer: "\\(n^{1/3}\\)" },
      ],
      pyqExampleId: "60c9bd5f-7fa7-443e-8841-e935b91938e4",
      traps: [
        {
          title: "Potential rising as n, or as the cube root of n",
          body:
            "Charge rises \\(n\\) times and radius \\(n^{1/3}\\) times; the potential is their ratio, \\(n^{2/3}\\). Both \\(n\\) and \\(n^{1/3}\\) are offered every time.",
        },
      ],
    },
  ],
  related: [
    { label: "Capacitance — storing charge at a potential", href: "/notes/mht-cet-physics/electrostatics/cetp-capacitance" },
    { label: "Electric Dipole — potential and energy of a charge pair", href: "/notes/mht-cet-physics/electrostatics/cetp-dipole" },
  ],
};
