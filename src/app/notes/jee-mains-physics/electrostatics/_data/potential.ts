import type { SubtopicNote } from "@/app/notes/_types";

export const POTENTIAL_ES_NOTE: SubtopicNote = {
  subtopicName: "Electric Potential, Conductors and Work",
  title: "Electric Potential, Conductors and Work",
  oneLineDefinition:
    "Potential is work per unit charge and a scalar, so potentials add with signs and no directions; the field is minus its slope, and the work to move a charge is q times the potential difference.",
  whyItMatters:
    "Thirty-six PYQs, twenty-nine of them multiple choice, and eleven from 2026, more than any other page in the chapter. Fourteen add potentials: point charges, rings and half rings, concentric shells and potential graphs. Ten are about conductors: charged drops that merge, and spheres joined by a wire. Twelve find the field from a potential, or the work done in moving a charge and the energy of a group of charges.",
  concepts: [
    // C1 — potential of charges, rings and shells
    {
      kind: "formula" as const,
      slug: "jpes-potential",
      name: "Potential of charges, rings and shells",
      intuition:
        "Potential is a number at each point, not an arrow, so adding potentials needs only signs. Every piece of a ring is the same distance from its centre, so the ring's potential there is simply kQ/R, even though the field there is zero. A charged shell has no field inside, so the potential inside does not change: it stays at the surface value.",
      definition:
        "- \\(V = \\dfrac{kq}{r}\\), sign included. Several charges: \\(V = \\sum \\dfrac{kq_i}{r_i}\\).\n" +
        "- Ring or arc of total charge Q at its centre: \\(V = \\dfrac{kQ}{R}\\). A half ring of density λ: \\(V = k\\lambda\\pi\\), the same for any radius.\n" +
        "- Ring on its axis at distance z: \\(V = \\dfrac{kQ}{\\sqrt{R^{2} + z^{2}}}\\).\n" +
        "- Shell of charge Q: \\(V = \\dfrac{kQ}{R}\\) everywhere inside, \\(\\dfrac{kQ}{r}\\) outside. The graph is flat, then falls as 1/r.\n" +
        "- Concentric shells, at radius r: a shell inside r adds \\(\\dfrac{kq_i}{r}\\); a shell outside r adds \\(\\dfrac{kq_i}{R_i}\\), using its own radius.\n" +
        "- With only positive charges, V is positive at every point, though E can be zero somewhere. Only potential differences can be measured.",
      formula: {
        label: "Point charges and a shell",
        latex: "V = \\sum_i \\frac{kq_i}{r_i}, \\qquad V_{\\text{shell}}(r) = \\begin{cases} kQ/R, & r \\le R \\\\ kQ/r, & r \\ge R \\end{cases}",
      },
      authoredExample: {
        prompt:
          "Two concentric thin shells have radii 10 cm and 20 cm and carry \\(+4\\) nC and \\(-2\\) nC. Find the potential at 5 cm, 15 cm and 30 cm from the centre.",
        steps: [
          "\\(k \\times 1\\ \\text{nC} = 9\\ \\text{V m}\\).",
          "At 5 cm (inside both): \\(9\\left(\\dfrac{4}{0.1} - \\dfrac{2}{0.2}\\right) = 9 \\times 30 = 270\\) V.",
          "At 15 cm (outside the inner, inside the outer): \\(9\\left(\\dfrac{4}{0.15} - \\dfrac{2}{0.2}\\right) = 9 \\times 16.7 = 150\\) V.",
          "At 30 cm (outside both): \\(9 \\times \\dfrac{2}{0.3} = 60\\) V.",
        ],
        answer: "270 V, 150 V and 60 V.",
      },
      selfCheckExample: {
        prompt:
          "A ring of radius 3 cm carries 2 nC. Find the potential at its centre and on its axis 4 cm from the centre.",
        steps: [
          "\\(kQ = 18\\ \\text{V m}\\).",
          "Centre: \\(\\dfrac{18}{0.03} = 600\\) V.",
          "On the axis: \\(\\dfrac{18}{\\sqrt{0.03^{2} + 0.04^{2}}} = \\dfrac{18}{0.05} = 360\\) V.",
        ],
        answer: "600 V at the centre, 360 V on the axis.",
      },
      practiceSet: [
        { prompt: "A shell of radius 10 cm is at 90 V. Potential at 5 cm and at 30 cm from its centre?", answer: "90 V and 30 V" },
        { prompt: "A half ring has \\(\\lambda = 1\\) nC/m. Potential at its centre?", answer: "\\(9\\pi \\approx 28.3\\) V" },
        { prompt: "Charges +q, +q, −q, −q sit at the corners of a square. Potential at the centre?", answer: "Zero" },
        { prompt: "Can the potential be zero at a point near a group of only positive charges?", answer: "No: every term kq/r is positive." },
      ],
      pyqExampleId: "10e83681-6105-420f-a530-728fc2ce0650", // 2023: shells σ, −σ, σ with X and Z at equal potential, c = 5 cm
      traps: [
        {
          title: "Potential has no direction",
          body: "Add the potentials of the charges as signed numbers. Resolving them into components, as for fields, is an error.",
        },
        {
          title: "Inside a charged shell V is not zero",
          body: "The field inside is zero, so the potential is constant there, equal to its value at the surface.",
        },
        {
          title: "Outer shells use their own radius",
          body: "At a point inside a shell, that shell contributes kq/R, not kq/r. Using r for every shell overcounts the outer ones.",
        },
      ],
    },

    // C2 — drops and joined conductors
    {
      kind: "formula" as const,
      slug: "jpes-conductors",
      name: "Drops that merge and spheres joined by a wire",
      intuition:
        "A conductor's whole body is at one potential. When charged drops merge, the charge adds but the radius grows only as the cube root of the number of drops, so the potential rises. When two spheres are joined by a long wire, charge flows until their potentials are equal: the larger sphere takes more charge, but the smaller one ends with the higher surface density and the stronger field.",
      definition:
        "- n identical drops (radius r, potential V) merge: volume is conserved, so \\(R = n^{1/3}r\\). Charge × n, potential × \\(n^{2/3}\\), surface density × \\(n^{1/3}\\), capacitance × \\(n^{1/3}\\), stored energy × \\(n^{5/3}\\).\n" +
        "- Spheres joined by a long wire: equal potentials, so \\(q \\propto R\\), while σ and the surface field go as \\(1/R\\).\n" +
        "- Common potential after joining: \\(V = \\dfrac{q_1 + q_2}{4\\pi\\varepsilon_0(R_1 + R_2)}\\). Total charge is conserved.\n" +
        "- A conductor is an equipotential. The field just outside is normal to its surface, of size σ/ε₀, and charge crowds at sharp points.",
      formula: {
        label: "Drops and joined spheres",
        latex: "V_{\\text{big}} = n^{2/3}V, \\qquad \\frac{q_1}{q_2} = \\frac{R_1}{R_2}, \\qquad \\frac{\\sigma_1}{\\sigma_2} = \\frac{E_1}{E_2} = \\frac{R_2}{R_1}",
      },
      authoredExample: {
        prompt:
          "125 identical charged drops, each at 2 V, merge into one drop. Find its potential, and the factor by which the surface charge density changes.",
        steps: [
          "\\(n^{1/3} = 5\\), so \\(R = 5r\\) and the charge is \\(125q\\).",
          "\\(V = \\dfrac{k(125q)}{5r} = 25 \\times \\dfrac{kq}{r} = 25 \\times 2 = 50\\) V.",
          "\\(\\sigma \\propto \\dfrac{Q}{R^{2}}\\): \\(\\dfrac{125}{25} = 5\\) times larger.",
        ],
        answer: "50 V; the surface density is 5 times larger.",
      },
      selfCheckExample: {
        prompt:
          "Spheres of radii 2 cm and 6 cm carry 3 nC and 5 nC, far apart. They are joined by a thin wire. Find the final charges and the common potential.",
        steps: [
          "Total 8 nC, shared as 2 : 6, so 2 nC and 6 nC.",
          "\\(V = \\dfrac{9 \\times 10^{9} \\times 2 \\times 10^{-9}}{0.02} = 900\\) V (check: \\(\\dfrac{54}{0.06} = 900\\) V).",
        ],
        answer: "2 nC and 6 nC, at 900 V.",
      },
      practiceSet: [
        { prompt: "8 identical drops, each at potential V, merge. Potential of the big drop?", answer: "4V" },
        { prompt: "Spheres of radii 3 cm and 12 cm are joined by a wire. Ratio of surface fields, small to large?", answer: "4 : 1" },
        { prompt: "1000 identical charged drops merge. By what factor does the stored energy grow?", answer: "\\(10^{5}\\)" },
        { prompt: "Why does charge crowd at the sharp tip of a conductor?", answer: "The whole conductor has one potential, and σ goes as 1/R, so a small radius of curvature carries a large density." },
      ],
      pyqExampleId: "7a094a30-09c7-475a-9ca5-1badf5946530", // 2026: spheres of 8 cm and 18 cm joined, E₁/E₂ = 9/4
      traps: [
        {
          title: "Volume is conserved, not radius",
          body: "n drops make a drop of radius n^(1/3) r, not n r. Using nr makes the potential stay the same.",
        },
        {
          title: "Joined spheres share potential, not charge",
          body: "Charge splits in proportion to radius. Splitting it equally is right only for identical spheres.",
        },
        {
          title: "Less charge, stronger field",
          body: "The smaller of two joined spheres holds less charge but has the larger surface density and surface field.",
        },
      ],
    },

    // C3 — field from potential, work and energy
    {
      kind: "formula" as const,
      slug: "jpes-gradient-work",
      name: "Field from potential, work and potential energy",
      intuition:
        "The field points the way the potential falls fastest, and its size is how fast it falls: E is minus the slope of V. Going the other way, the potential difference is the field added up along a path. Since the electrostatic force is conservative, the work between two points depends only on their potentials, never on the path, and it is zero along an equipotential.",
      definition:
        "- \\(\\vec E = -\\nabla V\\): \\(E_x = -\\dfrac{\\partial V}{\\partial x}\\), and so on. In a uniform field, \\(E = \\dfrac{\\Delta V}{d}\\) along the field.\n" +
        "- \\(V_B - V_A = -\\displaystyle\\int_A^B \\vec E \\cdot d\\vec r\\).\n" +
        "- Work by an external agent, moving q slowly: \\(W = q(V_B - V_A)\\). Work by the field: \\(q\\displaystyle\\int_A^B \\vec E \\cdot d\\vec r = -q(V_B - V_A)\\).\n" +
        "- Equipotential surfaces are perpendicular to the field lines; no work is done moving along one.\n" +
        "- Potential energy of a group: \\(U = \\sum_{\\text{pairs}} \\dfrac{kq_iq_j}{r_{ij}}\\), each pair once. In an external field, add \\(\\sum q_iV(\\vec r_i)\\).",
      formula: {
        label: "Gradient, work and energy",
        latex: "\\vec E = -\\nabla V, \\qquad W_{\\text{ext}} = q(V_B - V_A), \\qquad U = \\sum_{i<j} \\frac{kq_iq_j}{r_{ij}}",
      },
      authoredExample: {
        prompt:
          "The potential in a region is \\(V = 4x^{2}y - 3z\\) volts, with x, y, z in metres. Find the field at (1, 2, 0) m.",
        steps: [
          "\\(\\dfrac{\\partial V}{\\partial x} = 8xy = 16\\), \\(\\dfrac{\\partial V}{\\partial y} = 4x^{2} = 4\\), \\(\\dfrac{\\partial V}{\\partial z} = -3\\).",
          "\\(\\vec E = -16\\hat i - 4\\hat j + 3\\hat k\\) V/m.",
          "Size: \\(\\sqrt{256 + 16 + 9} = \\sqrt{281} \\approx 16.8\\) V/m.",
        ],
        answer: "\\(-16\\hat i - 4\\hat j + 3\\hat k\\) V/m, about 16.8 V/m.",
      },
      selfCheckExample: {
        prompt:
          "Three charges of \\(1\\ \\mu\\text{C}\\) each sit at the corners of an equilateral triangle of side 10 cm. How much work was needed to assemble them from far away?",
        steps: [
          "Three pairs, each \\(\\dfrac{9 \\times 10^{9} \\times 10^{-12}}{0.1} = 0.09\\) J.",
          "\\(U = 3 \\times 0.09 = 0.27\\) J.",
        ],
        answer: "0.27 J",
      },
      practiceSet: [
        { prompt: "A uniform 200 V/m field points along +x. A is at x = 0 and B at x = 0.3 m. \\(V_A - V_B\\)?", answer: "60 V" },
        { prompt: "Work to move \\(2\\ \\mu\\text{C}\\) between two points of one equipotential surface?", answer: "Zero" },
        { prompt: "A uniform field \\(\\vec E = 3\\hat i\\) N/C. Work done by the field on \\(5\\ \\mu\\text{C}\\) moved from (0, 0) to (2, 4) m?", answer: "\\(3 \\times 10^{-5}\\) J" },
        { prompt: "Work by an agent to bring \\(1\\ \\mu\\text{C}\\) from infinity to a point at 300 V?", answer: "\\(3 \\times 10^{-4}\\) J" },
      ],
      pyqExampleId: "7d6cf846-f034-4b18-8852-e2e6e3e2b8cf", // 2026: 3 C moved in E = 2x î + 3y² ĵ + 4 k̂, W = 186 J
      traps: [
        {
          title: "Work by the field or by an agent",
          body: "The two differ by a sign. The agent's work is q(V_B − V_A); the field's work is the negative of that. Read which one is asked.",
        },
        {
          title: "Keep the minus sign in E = −∇V",
          body: "The field points towards falling potential. Dropping the sign reverses every component.",
        },
        {
          title: "Count each pair once",
          body: "For three charges there are three pairs, not six. Summing over i and j without care doubles the energy.",
        },
      ],
    },
  ],
};
