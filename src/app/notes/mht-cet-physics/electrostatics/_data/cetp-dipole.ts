import type { SubtopicNote } from "@/app/notes/_types";

export const DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "Electric Dipole — Field, Potential, Torque",
  title: "Electric Dipole — Field, Potential and Torque",
  oneLineDefinition:
    "Two equal and opposite charges a short distance apart form a dipole of moment p = q × 2a; far away its field falls as 1/r³, and in a uniform field it feels a torque but no net force.",
  whyItMatters:
    "9 PYQs, none HARD. Two things are asked: how the field and potential fall off along the axis and the equator, and the torque or work when a dipole turns in a uniform field. " +
    "Every work question is the same subtraction, pE(cos θ₁ − cos θ₂).",
  concepts: [
    // 1 — field and potential of a dipole
    {
      kind: "formula" as const,
      slug: "cetp-dipole-field",
      name: "Field and Potential on the Axis and the Equator",
      intuition:
        "Far from a dipole its two charges almost cancel, so its field falls faster than a single charge's: as 1/r³, not 1/r². Along the axis the two contributions are in line and the field is twice as big as on the equatorial line at the same distance. On the equator the point is equidistant from +q and −q, so the potential there is exactly zero.",
      definition:
        "- Dipole moment \\(p = q \\times 2a\\), directed from \\(-q\\) to \\(+q\\).\n" +
        "- Axis: \\(E_a = \\dfrac{2kp}{r^3}\\), along \\(\\vec p\\); \\(V_a = \\dfrac{kp}{r^2}\\).\n" +
        "- Equator: \\(E_e = \\dfrac{kp}{r^3}\\), opposite to \\(\\vec p\\); \\(V_e = 0\\).\n" +
        "- So \\(E_a = 2E_e\\) at the same distance, field \\(\\propto \\dfrac{1}{r^3}\\), potential \\(\\propto \\dfrac{1}{r^2}\\).\n" +
        "- Two dipoles on one line: where their axial fields cancel, \\(\\dfrac{p_1}{x^3} = \\dfrac{p_2}{(d - x)^3}\\).",
      formula: {
        label: "Short dipole",
        latex: "E_{\\text{axis}} = \\frac{2kp}{r^3}, \\quad E_{\\text{equator}} = \\frac{kp}{r^3}, \\quad V_{\\text{axis}} = \\frac{kp}{r^2}",
      },
      authoredExample: {
        prompt: "A short dipole has \\(p = 4 \\times 10^{-9}\\) C m. Field 20 cm from it on the axis, and on the equator?",
        steps: [
          "\\(E_a = \\dfrac{2 \\times 9 \\times 10^9 \\times 4 \\times 10^{-9}}{(0.2)^3} = \\dfrac{72}{0.008} = 9000\\ \\text{N C}^{-1}\\).",
          "\\(E_e = \\dfrac{E_a}{2} = 4500\\ \\text{N C}^{-1}\\).",
        ],
        answer: "9000 N/C on the axis; 4500 N/C on the equator",
      },
      selfCheckExample: {
        prompt: "Dipoles of moment \\(p\\) and \\(8p\\) lie on one line, centres 30 cm apart. Where between them is the field zero, measured from \\(p\\)?",
        steps: ["\\(\\dfrac{p}{x^3} = \\dfrac{8p}{(30 - x)^3} \\Rightarrow 30 - x = 2x \\Rightarrow x = 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "Potential at any point on the equatorial line of a dipole?", answer: "Zero" },
        { prompt: "The distance from a short dipole is doubled. Field becomes?", answer: "\\(\\dfrac{1}{8}\\) of its value" },
        { prompt: "Potential on the axis varies as which power of \\(r\\)?", answer: "\\(\\dfrac{1}{r^2}\\)" },
        { prompt: "Direction of the equatorial field relative to \\(\\vec p\\)?", answer: "Opposite to \\(\\vec p\\)" },
      ],
      pyqExampleId: "61b0035b-a53e-489b-95f4-adffe164efa2",
      traps: [
        {
          title: "Field power versus potential power",
          body:
            "Field falls as \\(1/r^3\\), potential as \\(1/r^2\\). A question asking 'the potential on the axis is proportional to' has \\(1/r^3\\) as the planted wrong answer.",
        },
      ],
    },

    // 2 — torque and work in a uniform field
    {
      kind: "formula" as const,
      slug: "cetp-dipole-torque-energy",
      name: "Torque, Energy and Work for a Dipole in a Uniform Field",
      intuition:
        "In a uniform field the forces on +q and −q are equal and opposite, so the dipole does not move off but it turns, trying to line up with the field. Lined up, its energy is lowest (−pE); turned right round it is highest (+pE). The work to turn it is the rise in that energy.",
      definition:
        "- Torque \\(\\tau = pE\\sin\\theta\\), largest (\\(pE\\)) at \\(\\theta = 90^\\circ\\). Net force in a uniform field: zero.\n" +
        "- Energy \\(U = -pE\\cos\\theta\\): minimum \\(-pE\\) at \\(\\theta = 0\\) (stable), maximum \\(+pE\\) at \\(180^\\circ\\) (unstable).\n" +
        "- Work to turn from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = pE(\\cos\\theta_1 - \\cos\\theta_2)\\). From aligned: \\(90^\\circ\\) costs \\(pE\\), \\(60^\\circ\\) costs \\(\\frac{pE}{2}\\), \\(180^\\circ\\) costs \\(2pE\\).\n" +
        "- Length from torque: \\(2a = \\dfrac{\\tau_{\\max}}{qE}\\).",
      formula: {
        label: "Dipole in a uniform field",
        latex: "\\tau = pE\\sin\\theta, \\qquad U = -pE\\cos\\theta, \\qquad W_{\\theta_1 \\to \\theta_2} = pE(\\cos\\theta_1 - \\cos\\theta_2)",
      },
      authoredExample: {
        prompt: "A dipole of charges \\(\\pm 3\\,\\mu\\)C, 2 cm apart, is in a field of \\(5 \\times 10^4\\) N/C. Find the maximum torque and the work to turn it from aligned to reversed.",
        steps: [
          "\\(p = 3 \\times 10^{-6} \\times 0.02 = 6 \\times 10^{-8}\\) C m.",
          "\\(\\tau_{\\max} = pE = 6 \\times 10^{-8} \\times 5 \\times 10^{4} = 3 \\times 10^{-3}\\) N m.",
          "\\(W = pE(\\cos 0^\\circ - \\cos 180^\\circ) = 2pE = 6 \\times 10^{-3}\\) J.",
        ],
        answer: "\\(3 \\times 10^{-3}\\) N m; \\(6 \\times 10^{-3}\\) J",
      },
      selfCheckExample: {
        prompt: "Turning an aligned dipole through \\(90^\\circ\\) takes work \\(W_0\\). How much to turn it through \\(180^\\circ\\)?",
        steps: ["\\(W_{90} = pE(1 - 0) = pE\\); \\(W_{180} = pE(1 + 1) = 2pE\\)."],
        answer: "\\(2W_0\\)",
      },
      practiceSet: [
        { prompt: "Work to turn a dipole from \\(60^\\circ\\) to \\(90^\\circ\\)?", answer: "\\(\\dfrac{pE}{2}\\)" },
        { prompt: "Torque at \\(30^\\circ\\) to the field?", answer: "\\(\\dfrac{pE}{2}\\)" },
        { prompt: "At what angle is the dipole's potential energy least?", answer: "\\(0^\\circ\\) (aligned with the field)" },
        { prompt: "Net force on a dipole in a uniform field?", answer: "Zero" },
      ],
      pyqExampleId: "9d76b3e1-58a5-452d-80e0-fe97aeaec28a",
      traps: [
        {
          title: "Using sin θ for the work",
          body:
            "Torque uses \\(\\sin\\theta\\); work and energy use \\(\\cos\\theta\\). Turning an aligned dipole through \\(60^\\circ\\) costs \\(pE(1 - \\cos 60^\\circ) = \\frac{pE}{2}\\), not \\(pE\\sin 60^\\circ\\).",
        },
      ],
    },
  ],
  related: [
    { label: "Electric Potential — the energy picture behind U = −pE cos θ", href: "/notes/mht-cet-physics/electrostatics/cetp-potential" },
    { label: "Coulomb's Law and Field — the two charges it is made of", href: "/notes/mht-cet-physics/electrostatics/cetp-coulomb-field" },
  ],
};
