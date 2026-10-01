import type { SubtopicNote } from "@/app/notes/_types";

export const DIPOLES_MM_NOTE: SubtopicNote = {
  subtopicName: "Bar Magnets and Magnetic Dipoles",
  title: "Bar Magnets and Magnetic Dipoles",
  oneLineDefinition:
    "A bar magnet, a current loop and an orbiting electron are all magnetic dipoles: each has a moment M, makes a field that falls as 1/r³, and in a uniform field feels a torque MB sin θ with potential energy −MB cos θ.",
  whyItMatters:
    "Fourteen PYQs, six of them asking for a number, and two from 2026. Eight put a magnet or a coil in a uniform field and ask for the torque, the potential energy or the work to turn it; six are about the dipole itself: its moment, its field and potential, or the absence of single poles. The arithmetic is short, so the marks go on the angle and the sign.",
  concepts: [
    // C1 — the moment and the field it makes
    {
      kind: "formula" as const,
      slug: "jpmm-dipole-field",
      name: "Magnetic dipole moment and the field of a bar magnet",
      intuition:
        "A bar magnet behaves like two poles of strength m a distance 2l apart, so its moment is m × 2l, pointing from S to N. A coil of current is the same kind of object with moment NIA. Far away, the field on the axis is twice the field on the equator at the same distance, and both fall as 1/r³. There are no single magnetic poles, so every field line closes on itself.",
      definition:
        "- Bar magnet: \\(M = m(2l)\\), directed from S to N; unit \\(A\\,m^{2}\\), the same as \\(J\\,T^{-1}\\).\n" +
        "- Current loop: \\(M = NIA\\), along the normal to its plane (right-hand rule). An orbiting electron: \\(\\vec{\\mu} = -\\dfrac{e}{2m_e}\\vec{L}\\), opposite to \\(\\vec{L}\\) because its charge is negative.\n" +
        "- No monopoles: field lines are closed loops, and the net magnetic flux through any closed surface is zero.\n" +
        "- On the axis: \\(B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2Mr}{(r^{2} - l^{2})^{2}}\\), which becomes \\(\\dfrac{\\mu_0}{4\\pi}\\dfrac{2M}{r^{3}}\\) for a short magnet; it points along M.\n" +
        "- On the equator: \\(B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{M}{(r^{2} + l^{2})^{3/2}}\\), which becomes \\(\\dfrac{\\mu_0}{4\\pi}\\dfrac{M}{r^{3}}\\); it points opposite to M.\n" +
        "- Magnetic potential on the axis: \\(V = \\dfrac{\\mu_0}{4\\pi}\\dfrac{M}{r^{2}}\\); it is zero on the equator.\n" +
        "- Fields of two magnets add as vectors; two fields at right angles combine as \\(\\sqrt{B_1^{2} + B_2^{2}}\\).\n" +
        "- Bending a magnet keeps its pole strength but brings the poles closer. Bent into a semicircle: \\(M' = 2M/\\pi\\). Bent at its middle into an L: \\(M' = M/\\sqrt{2}\\).\n" +
        "- Error in a field: add the relative errors, each times its power; \\((r^{2} + l^{2})^{3/2}\\) contributes \\(\\tfrac{3}{2}\\) times the relative error of \\(r^{2} + l^{2}\\).",
      formula: {
        label: "Short magnet: axial field, equatorial field, axial potential",
        latex:
          "B_{axial} = \\frac{\\mu_0}{4\\pi}\\frac{2M}{r^{3}} \\qquad B_{eq} = \\frac{\\mu_0}{4\\pi}\\frac{M}{r^{3}} \\qquad V_{axis} = \\frac{\\mu_0}{4\\pi}\\frac{M}{r^{2}}",
      },
      authoredExample: {
        prompt:
          "A short bar magnet has pole strength \\(10\\ A\\,m\\) and magnetic length 4 cm. Find its moment, then the field at 20 cm from its centre on the axis and on the equator, and the magnetic potential at the axial point. \\((\\mu_0/4\\pi = 10^{-7}\\ T\\,m\\,A^{-1})\\)",
        steps: [
          "\\(M = m(2l) = 10 \\times 0.04 = 0.4\\ A\\,m^{2}\\). The point is 10 times the half-length away, so treat the magnet as short.",
          "Axis: \\(B = 10^{-7} \\times \\dfrac{2 \\times 0.4}{(0.2)^{3}} = 10^{-7} \\times \\dfrac{0.8}{8 \\times 10^{-3}} = 10^{-5}\\ T\\), along M.",
          "Equator: half of that, \\(5 \\times 10^{-6}\\ T\\), pointing opposite to M.",
          "Potential on the axis: \\(V = 10^{-7} \\times \\dfrac{0.4}{(0.2)^{2}} = 10^{-6}\\ T\\,m\\).",
        ],
        answer:
          "\\(0.4\\ A\\,m^{2}\\); \\(10^{-5}\\ T\\) on the axis, \\(5 \\times 10^{-6}\\ T\\) on the equator; \\(10^{-6}\\ T\\,m\\)",
      },
      selfCheckExample: {
        prompt:
          "A thin straight magnet of moment \\(6\\ A\\,m^{2}\\) is bent at its midpoint so that the two halves are at right angles. What is its new magnetic moment?",
        steps: [
          "The pole strength stays the same; only the distance between the poles changes.",
          "Each half has length L/2, so the ends are \\(\\sqrt{(L/2)^{2} + (L/2)^{2}} = L/\\sqrt{2}\\) apart.",
          "\\(M' = m \\times \\dfrac{L}{\\sqrt{2}} = \\dfrac{M}{\\sqrt{2}} = \\dfrac{6}{\\sqrt{2}} = 3\\sqrt{2}\\ A\\,m^{2}\\).",
        ],
        answer: "\\(3\\sqrt{2} \\approx 4.24\\ A\\,m^{2}\\)",
      },
      practiceSet: [
        { prompt: "A coil of 20 turns and area \\(0.01\\ m^{2}\\) carries 0.5 A. Its magnetic moment?", answer: "\\(0.1\\ A\\,m^{2}\\)" },
        { prompt: "A straight magnetised strip of moment \\(3\\pi\\ A\\,m^{2}\\) is bent into a semicircle. Its new moment?", answer: "\\(6\\ A\\,m^{2}\\)", method: "\\(M' = 2M/\\pi\\)." },
        { prompt: "At the same large distance from a short magnet, what is the ratio of the axial field to the equatorial field?", answer: "2 : 1" },
        { prompt: "An electron orbits a nucleus with orbital angular momentum L. In which direction does its orbital magnetic moment point?", answer: "Opposite to L, with magnitude \\(\\dfrac{e}{2m_e}L\\)" },
      ],
      pyqExampleId: "9be500a9-2187-4957-9bfb-38c2b555f621", // 9 Apr 2024: straight strip bent into a semicircle
      traps: [
        {
          title: "Bending keeps the pole strength, not the moment",
          body: "A bent magnet has the same pole strength but its poles are closer together, so its moment falls. A semicircle gives 2M/π, not M.",
        },
        {
          title: "The equatorial field points opposite to the moment",
          body: "On the axis the field of a short magnet points along M; on the equator it points opposite to M. The direction matters when this field is added to another.",
        },
        {
          title: "Using the axial formula at an equatorial point",
          body: "The factor 2 belongs to the axis only. Check where the point lies before choosing the formula: a point on the perpendicular bisector is equatorial.",
        },
      ],
    },

    // C2 — torque, energy and work in a uniform field
    {
      kind: "formula" as const,
      slug: "jpmm-torque-energy",
      name: "Torque and potential energy of a dipole in a uniform field",
      intuition:
        "A uniform field pulls the two poles of a magnet equally and oppositely, so there is no net force, only a torque that turns M towards B. The energy is lowest when M lies along B and highest when it points against B. The work needed to turn the dipole is the rise in this energy, so every work question is two values of −MB cos θ subtracted.",
      definition:
        "- Torque: \\(\\vec{\\tau} = \\vec{M} \\times \\vec{B}\\), size \\(MB\\sin\\theta\\), where θ is the angle between M and B.\n" +
        "- Potential energy: \\(U = -\\vec{M} \\cdot \\vec{B} = -MB\\cos\\theta\\). Stable at θ = 0 (U = −MB), unstable at θ = 180° (U = +MB).\n" +
        "- Work to turn from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = MB(\\cos\\theta_1 - \\cos\\theta_2)\\).\n" +
        "- Stable to unstable: 2MB. Stable to 90°: MB. Stable to 60°: MB/2.\n" +
        "- A torque at a known angle fixes the product MB: \\(MB = \\tau/\\sin\\theta\\). Use it to find U or W without M or B separately.\n" +
        "- A coil whose plane is perpendicular to B has its moment along B (θ = 0). A coil whose plane is parallel to B has θ = 90° and feels the largest torque.\n" +
        "- Two dipoles at right angles to each other in one field: if one makes θ with B, the other makes 90° + θ, so equal torques mean \\(p_1\\sin\\theta = p_2\\cos\\theta\\).",
      formula: {
        label: "Dipole in a uniform field",
        latex:
          "\\tau = MB\\sin\\theta \\qquad U = -MB\\cos\\theta \\qquad W = MB(\\cos\\theta_1 - \\cos\\theta_2)",
      },
      authoredExample: {
        prompt:
          "A magnet of moment \\(3\\ A\\,m^{2}\\) lies at 30° to a uniform field of 0.2 T. Find the torque on it, its potential energy, and the work needed to turn it from the stable position to the most unstable one.",
        steps: [
          "\\(MB = 3 \\times 0.2 = 0.6\\ J\\).",
          "Torque: \\(\\tau = 0.6 \\sin 30^{\\circ} = 0.3\\ N\\,m\\).",
          "Energy: \\(U = -0.6 \\cos 30^{\\circ} = -0.3\\sqrt{3} \\approx -0.52\\ J\\).",
          "Stable (θ = 0) to unstable (θ = 180°): \\(W = 0.6(\\cos 0^{\\circ} - \\cos 180^{\\circ}) = 1.2\\ J\\).",
        ],
        answer: "\\(0.3\\ N\\,m\\); \\(-0.3\\sqrt{3}\\ J\\); 1.2 J",
      },
      selfCheckExample: {
        prompt:
          "A coil of 50 turns and area \\(4 \\times 10^{-3}\\ m^{2}\\) carries 2 A in a uniform field of 0.5 T, with the plane of the coil parallel to the field. Find the torque on it, and the work needed to turn it until its moment points directly against the field.",
        steps: [
          "\\(M = NIA = 50 \\times 2 \\times 4 \\times 10^{-3} = 0.4\\ A\\,m^{2}\\), so \\(MB = 0.2\\ J\\).",
          "The plane is parallel to B, so the moment (the normal) is at 90° to B: \\(\\tau = MB = 0.2\\ N\\,m\\).",
          "From 90° to 180°: \\(W = MB(\\cos 90^{\\circ} - \\cos 180^{\\circ}) = 0.2\\ J\\).",
        ],
        answer: "\\(0.2\\ N\\,m\\); 0.2 J",
      },
      practiceSet: [
        { prompt: "A dipole of moment \\(2\\ A\\,m^{2}\\) in a field of 0.25 T is turned from along the field to 90°. Work needed?", answer: "0.5 J" },
        { prompt: "What is the potential energy of a dipole pointing directly against a uniform field B?", answer: "+MB" },
        { prompt: "Two dipoles at right angles to each other sit in one uniform field; the first makes 30° with the field, and both feel the same torque. Find \\(p_1/p_2\\).", answer: "\\(\\sqrt{3}\\)", method: "\\(p_1\\sin 30^{\\circ} = p_2\\cos 30^{\\circ}\\)." },
        { prompt: "The plane of a current loop is perpendicular to a uniform field. What angle does its moment make with the field?", answer: "0°, so the torque on it is zero" },
      ],
      pyqExampleId: "7e565bf1-9cf3-4c58-8cc9-57fe34734ce0", // 3 Apr 2025: torque at 60° gives the potential energy
      traps: [
        {
          title: "Dropping the minus sign in the energy",
          body: "The potential energy is −MB cos θ. At angles below 90° it is negative, and an option with the right size but a positive sign is a deliberate trap.",
        },
        {
          title: "Reading the plane of a coil as its moment",
          body: "A coil's moment is along the normal to its plane. A plane perpendicular to B means the moment is along B, which is the stable position, not the position of largest torque.",
        },
        {
          title: "Work is a difference of cosines, not of angles",
          body: "Turning from 0° to 60° needs MB(1 − ½) = MB/2, not a third of the work for 0° to 180°. Always subtract the two values of cos θ.",
        },
      ],
    },
  ],
};
